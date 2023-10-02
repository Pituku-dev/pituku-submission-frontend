import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import http from "../utils/http";

const ChangePasswordPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [isShowNewPassword, setIsNewPassword] = useState(false);
  const [isShowRetypePassword, setIsShowRetypePassword] = useState(false);

  const changePassword = () => {
    const token = searchParams.get("token");
    
    if (retypePassword !== password) {
      return toast({
        title: "Ganti Password Error!",
        description: 'Password tidak sama',
        status: "error",
        isClosable: true,
      });
    }
    setIsloading(true);
    http
      .post("/change-password", {
        newPassword: password,
        token,
      })
      .then((res) => {
        toast({
          title: "Ganti Password Sukses",
          description: res.data.message,
          status: "success",
          isClosable: true,
        });
        navigate('/login');
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          toast({
            title: "Ganti Password Error!",
            description: err.response.data.message,
            status: "error",
            isClosable: true,
          });
        }
      })
      .finally(() => {
        setIsloading(false);
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
              Ganti Password
            </Heading>
            <FormControl>
              <FormLabel htmlFor="password">Password Baru</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={isShowNewPassword ? "text" : "password"}
                  placeholder="******"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setIsNewPassword(!isShowNewPassword)}
                  >
                    {isShowNewPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl mt="4">
              <FormLabel htmlFor="password">
                Ketik Ulang Password Baru
              </FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={isShowRetypePassword ? "text" : "password"}
                  placeholder="*******"
                  name="password"
                  onChange={(e) => setRetypePassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() =>
                      setIsShowRetypePassword(!isShowRetypePassword)
                    }
                  >
                    {isShowRetypePassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              colorScheme="teal"
              mt="5"
              mx="auto"
              borderRadius="lg"
              width="100%"
              onClick={() => changePassword()}
              isLoading={isLoading}
            >
              Submit
            </Button>
          </Box>
        </Center>
      </Flex>
    </>
  );
};

export default ChangePasswordPage;
