import {
  ActionIcon,
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  Header,
  Image,
  ScrollArea,
  createStyles,
  rem,
} from "@mantine/core";

import logo from "@/assets/img/logo.png";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconLogout } from "@tabler/icons-react";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { Link } from "react-router-dom";
import DarkToggle from "../DarkToggle";
import { LanguagePicker } from "../Languages";
import { AuthForm } from "../LoginForm";
import { RegisterForm } from "../RegisterForm";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function TopHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  const isLoggedIn = isAuthenticated();
  const signOut = useSignOut();

  const openRegister = () => {
    closeDrawer();
    modals.open({
      title: "Регистрация",
      overlayProps: {
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      },
      centered: true,
      children: <RegisterForm />,
    });
  };
  const openLogin = () => {
    closeDrawer();
    modals.open({
      title: "Вход",
      centered: true,
      overlayProps: {
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      },
      children: <AuthForm />,
    });
  };
  return (
    <>
      <Header height={70} px="md" pos="sticky" zIndex={22} top={0}>
        <Container size="lg" sx={{ height: "100%" }}>
          <Group position="apart" sx={{ height: "100%" }}>
            <Group sx={{ height: "100%" }} spacing={0}>
              <Link to="/">
                <Image src={logo} width={60} mr={40} />
              </Link>
              <Group
                sx={{ height: "100%" }}
                spacing={0}
                className={classes.hiddenMobile}
              >
                <Link to="/" className={classes.link}>
                  Главная
                </Link>

                <Link to="/faq" className={classes.link}>
                  FAQ
                </Link>
              </Group>
            </Group>

            <Group className={classes.hiddenMobile}>
              <DarkToggle />
              <LanguagePicker />
              {!isLoggedIn && (
                <>
                  <Button variant="default" onClick={openLogin}>
                    Войти
                  </Button>
                  <Button onClick={openRegister}>Регистрация</Button>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Link to="/user/main">
                    <Button variant="default">
                      {auth()?.last_name + " " + auth()?.first_name}
                    </Button>
                  </Link>
                  <ActionIcon variant="outline" onClick={() => signOut()}>
                    <IconLogout size="1rem" />
                  </ActionIcon>
                </>
              )}
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          </Group>
        </Container>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Меню"
        className={classes.hiddenDesktop}
        zIndex={100}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Link to="/" className={classes.link}>
            Главная
          </Link>
          <Link to="/faq" className={classes.link}>
            FAQ
          </Link>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          <Group position="center" pb="xl" px="md">
            <DarkToggle />
            <LanguagePicker />
          </Group>
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          <Group position="center" grow pb="xl" px="md">
            <Button onClick={openLogin} variant="default">
              {auth() ? auth()?.last_name + " " + auth()?.first_name : "Войти"}
            </Button>
            <Button onClick={openRegister}>Регистрация</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
}
