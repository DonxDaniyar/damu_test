import { useAuth } from "@/hooks/useAuth";
import {
  Anchor,
  Button,
  Group,
  Input,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useId } from "react";
import { IMaskInput } from "react-imask";
import { RegisterForm } from "./RegisterForm";

export function AuthForm(props: PaperProps) {
  const { loginUser } = useAuth();
  const theme = useMantineTheme();
  const email = useId();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      email: (val) => (val.length === 0 ? "Required" : null),
    },
  });

  return (
    <Paper radius="md" {...props}>
      <form
        onSubmit={form.onSubmit((values) => {
          loginUser(values);
        })}
      >
        <Stack>
          <Input.Wrapper
            id={email}
            label="Email"
            required
            autoFocus
            data-autofocus
            error={
              form.errors.phone &&
              "Password should include at least 6 characters"
            }
          >
            <TextInput
              required
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />
          </Input.Wrapper>
          <PasswordInput
            required
            label="Пароль"
            placeholder="*********"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => {
              modals.closeAll();
              modals.open({
                title: "Регистрация",
                centered: true,
                overlayProps: {
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[9]
                      : theme.colors.gray[2],
                  opacity: 0.55,
                  blur: 3,
                },
                children: <RegisterForm />,
              });
            }}
            size="xs"
          >
            Нет аккаунта? Зарегистрируйтесь
          </Anchor>
          <Button type="submit">Войти</Button>
        </Group>
      </form>
    </Paper>
  );
}
