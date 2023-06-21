import Layout from "@/components/Layout";
import { UserOrdersList } from "@/components/UserOrdersList";
import { axios } from "@/config/axios";
import { UserContext } from "@/context/UserContext";
import { User } from "@/models/User";
import { Button, Container, Group, Loader, Title } from "@mantine/core";
import { useContext } from "react";
import { useQuery } from "react-query";
import { modals } from "@mantine/modals";
import { AddUserForm } from "../../components/AddUserForm";
import { useDisclosure } from "@mantine/hooks";

const UserMain = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { user } = useContext(UserContext);
  const openRegister = () => {
    closeDrawer();
    modals.open({
      title: "Регистрация",
      overlayProps: {
        opacity: 0.55,
        blur: 3,
      },
      centered: true,
      children: <AddUserForm />,
    });
  };
  const { data: users, isLoading } = useQuery(
    "ordersList",
    async (): Promise<User> => {
      const res = await axios.get("/user/all");
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  return (
    <Layout>
      <Container size="lg" py="lg">
        <Group position="apart" mb="lg">
          <Title order={1}>Пользователи</Title>
            <Button onClick={openRegister}>Добавить пользователя</Button>
        </Group>
        {isLoading && <Loader />}
        {users && <UserOrdersList data={users} />}
      </Container>
    </Layout>
  );
};

export default UserMain;
