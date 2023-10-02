import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import CookieCutter from "cookie-cutter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import http from "../utils/http";

const LoginPage = () => {
  let navigate = useNavigate();
  const toast = useToast();
  const { setRole, setUser } = useUserStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [show, setShow] = useState(false);

  const signIn = async () => {
    setIsloading(true);
    http
      .post("/login", {
        email: username,
        password,
      })
      .then((res) => {
        http.defaults.headers.common[
          "Authorization"
        ] = `${res.data.data.accessToken}`;
        CookieCutter.set("access_token", res.data.data.accessToken);
        setRole(res.data.data.role);
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          toast({
            title: "Sign in error",
            description: err.response.data.message,
            status: "error",
            isClosable: true,
          });
        }
      })
      .finally(() => {
        setIsloading(false);
        getProfile();
      });
  };

  const getProfile = () => {
    http.get("/profiles/me").then((res) => {
      console.log(res.data.data);
      setUser(res.data.data);
    });
  };

  return (
    <>
      <Flex h="85vh" w="100vw">
        <Center m="auto">
          <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            minW="300px"
            maxW="350px"
            rounded="md"
          >
            <Heading fontSize="xl" mb="5">
              Pituku - Reimbursement
            </Heading>
            <FormControl>
              <FormLabel htmlFor="username">Email</FormLabel>
              <InputGroup>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="your-mail@pituku.id"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl mt="4">
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>
                forgot password? <a href="/reset-password">reset now</a>
              </FormHelperText>
            </FormControl>
            <Button
              colorScheme="teal"
              mt="5"
              mx="auto"
              borderRadius="lg"
              width="100%"
              onClick={() => signIn()}
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </Box>
        </Center>
      </Flex>
    </>
  );
};

export default LoginPage;
