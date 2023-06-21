import {
  Button,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
  Text,
  rem,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

import { ContextModalProps, ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import RoutesList from "./components/RoutesList";
import UserProvider from "./context/UserContext";
const TestModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => (
  <>
    <Text size="sm">{innerProps.modalBody}</Text>
    <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
      Close modal
    </Button>
  </>
);

const modals = {
  demonstration: TestModal,
};

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });
  const myTheme: MantineThemeOverride = {
    colorScheme: colorScheme,
    primaryColor: "green",
    globalStyles: (theme) => ({
      body: {
        ...theme.fn.fontStyles(),
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        lineHeight: theme.lineHeight,
      },
    }),
    components: {
      Header: {
        styles: (theme) => ({
          root: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 0.0625rem 0.1875rem, rgba(0, 0, 0, 0.05) 0px 0.625rem 0.9375rem -0.3125rem, rgba(0, 0, 0, 0.04) 0px 0.4375rem 0.4375rem -0.3125rem",
          },
        }),
      },

      Modal: {
        styles: () => ({
          title: {
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
          },
        }),
      },
    },
    // defaultRadius: "md",
  };
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
          <UserProvider>
            <ModalsProvider modals={modals}>
              <Notifications
                position="top-center"
                zIndex={2077}
                containerWidth={rem(300)}
              />
              <RoutesList />
            </ModalsProvider>
          </UserProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
}

export default App;
