import { useAuth } from "@/hooks/useAuth";
import {
  Anchor,
  Box,
  Button,
  Group,
  Input,
  Paper,
  PaperProps,
  PasswordInput,
  Popover,
  Progress,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useId, useState } from "react";
import { IMaskInput } from "react-imask";
import { AuthForm } from "./LoginForm";

export function AddUserForm(props: PaperProps) {
  const { addUser } = useAuth();
  const form = useForm({
    initialValues: {
      email: "",
      surname: "",
      name: "",
      phone: "",
      password: "",
      confirm_password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      confirm_password: (val) =>
        val !== form.values.password ? "Пароли не совпадают" : null,
      phone: (val) => (val.length === 0 ? "Required" : null),
    },
  });
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.password)}
    />
  ));
  const strength = getStrength(form.values.password);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
  const [popoverOpened, setPopoverOpened] = useState(false);

  const id = useId();
  const theme = useMantineTheme();
  const phone = useId();

  return (
    <Paper radius="md" {...props}>
      <form
        onSubmit={form.onSubmit((v) => {
          addUser(v);
        })}
      >
        <Stack>
          <Group grow>
            <TextInput
              label="Имя"
              required
              placeholder="Имя"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
            <TextInput
              required
              label="Фамилия"
              placeholder="Фамилия"
              value={form.values.surname}
              onChange={(event) =>
                form.setFieldValue("surname", event.currentTarget.value)
              }
              radius="md"
            />
          </Group>
          <Group grow>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />
            <Input.Wrapper
              id={phone}
              label="Номер телефона"
              required
              error={form.errors.phone}
            >
              <Input<any>
                component={IMaskInput}
                mask="+7 (000) 000-00-00"
                id={phone}
                onChange={(event) =>
                  form.setFieldValue("phone", event.currentTarget.value)
                }
                placeholder="Номер телефона"
              />
            </Input.Wrapper>
          </Group>

          <Popover
            opened={popoverOpened}
            position="bottom"
            width="target"
            transitionProps={{ transition: "pop" }}
          >
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}
              >
                <PasswordInput
                  withAsterisk
                  label="Пароль"
                  placeholder="Пароль"
                  value={form.values.password}
                  error={
                    form.errors.password &&
                    "Password should include at least 6 characters"
                  }
                  onChange={(event) =>
                    form.setFieldValue("password", event.currentTarget.value)
                  }
                />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Progress color={color} value={strength} size={5} mb="xs" />
              <PasswordRequirement
                label="Включает не менее 6 символов"
                meets={form.values.password.length > 5}
              />
              {checks}
            </Popover.Dropdown>
          </Popover>
          <PasswordInput
            required
            label="Повторите пароль"
            placeholder="Your password"
            value={form.values.confirm_password}
            onChange={(event) =>
              form.setFieldValue("confirm_password", event.currentTarget.value)
            }
            error={form.errors.confirm_password}
            radius="md"
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Button type="submit">Регистрация</Button>
        </Group>
      </form>
    </Paper>
  );
}

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size="0.9rem" /> : <IconX size="0.9rem" />}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}
const requirements = [
  { re: /[0-9]/, label: "Содержит цифру" },
  { re: /[a-z]/, label: "Содержит строчную букву" },
  { re: /[A-Z]/, label: "Содержит заглавную букву" },
];
function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}
