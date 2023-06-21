import { User } from "@/models/User";
import { axios } from "@/config/axios";
import { Button } from "@mantine/core";
import DeleteModal from "./modals/DeleteModal";
import {
  ActionIcon,
  ScrollArea,
  Table,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

export function UserOrdersList({ data }: { data: User }) {
  const rows = data.map((row) => (
    <tr key={row.ID}>
      <td>{row.surname}</td>
      <td>{row.name}</td>
      <td>{row.email}</td>
      <td>{row.phone}</td>
      <td>
          <ActionIcon variant="filled" size="md" color="red">
            <IconTrash onClick={() => {DeleteModal(row)}} size={16} />
          </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table
        horizontalSpacing="xs"
        verticalSpacing="md"
        striped
        highlightOnHover
        miw={700}
        fontSize={14}
      >
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Почта</th>
            <th>Телефон</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data.data[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
