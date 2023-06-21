import { Illustration } from "@/components/Illustration";
import Layout from "@/components/Layout";
import {
  Button,
  Container,
  Group,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  inner: {
    position: "relative",
  },

  image: {
    ...theme.fn.cover(),
    opacity: 0.75,
  },

  content: {
    paddingTop: rem(220),
    position: "relative",
    zIndex: 1,

    [theme.fn.smallerThan("sm")]: {
      paddingTop: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(540),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

export default function NotFound() {
  const { classes } = useStyles();

  return (
    <Layout>
      <Container className={classes.root}>
        <div className={classes.inner}>
          <Illustration className={classes.image} />
          <div className={classes.content}>
            <Title className={classes.title}>Ничего не найдено</Title>
            <Text
              color="dimmed"
              size="lg"
              align="center"
              className={classes.description}
            >
              Страница, которую вы пытаетесь открыть, не существует. Возможно,
              вы опечатались, или страница была перемещена на другой URL.
            </Text>
            <Group position="center">
              <Link to="/">
                <Button size="md">Вернуться на главную</Button>
              </Link>
            </Group>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
