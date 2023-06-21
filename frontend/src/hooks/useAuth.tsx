import { axios } from "@/config/axios";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const registerUser = async (values) => {
    try {
      await axios.post("http://localhost:9000/api/v1/sign-up", values);
      notifications.show({
        icon: <IconCheck size="1.1rem" />,
        title: "Вы успешно зарегистрировались!",
        message: "",
      });
      await loginUser({
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addUser = async (values) => {
    try {
      await axios.post("http://localhost:9000/api/v1/sign-up", values).then(()=>{
        modals.closeAll();
        navigate("/user/main");
      });
      notifications.show({
        icon: <IconCheck size="1.1rem" />,
        title: "Успешно добавлено!",
        message: "",
      });
    } catch (error) {
      console.log(error);
    }
  }
  const loginUser = async (values) => {
    try {
      await axios
        .post("http://localhost:9000/api/v1/sign-in", values)
        .then(async (data) => {
          const token = data?.data.token;
          const res = await axios.get("http://localhost:9000/api/v1/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (
            signIn({
              token: token,
              expiresIn: 1000,
              tokenType: "Bearer",
              authState: {
                first_name: res.data.surname,
                last_name: res.data.name,
              },
            })
          ) {
            modals.closeAll();
            navigate("/user/main");
          } else {
            console.log("error");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return { registerUser, addUser, loginUser };
};
