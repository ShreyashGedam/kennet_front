import {
  Button,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import styles from "./Auth.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signup } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [name, setName] = useState("");
  const [register, setRegister] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const handleRegister = () => {
    if (!register) return;
    dispatch(signup({ name: register }));
  };

  const handleLogin = () => {
    if (!name) return;
    dispatch(loginUser({ name }));
  };

  return (
    <div className={styles.container}>
      <Tabs variant="soft-rounded" colorScheme="green" p={3}>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Login</p>
            <Input
              placeholder="Enter name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <Button colorScheme="blue" onClick={handleLogin}>
              Submit
            </Button>
          </TabPanel>
          <TabPanel>
            <p>Sign Up</p>
            <Input
              placeholder="Enter name"
              onChange={(e) => setRegister(e.target.value)}
              autoFocus
            />
            <Button colorScheme="blue" onClick={handleRegister}>
              Submit
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
