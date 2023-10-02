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
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import http from "../utils/http";

const ResetPasswordPage = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const requestResetPassword = () => {
    setIsloading(true);
    http
      .post("/forgot-password", {
        email,
      })
      .then((res) => {
        toast({
          title: "Reset Password Sukses",
          description: res.data.message,
          status: "success",
          isClosable: true,
        });
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          toast({
            title: "Reset Password Error!",
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
              Reset Password
            </Heading>
            <FormControl>
              <FormLabel htmlFor="username">Email</FormLabel>
              <InputGroup>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="your-mail@pituku.id"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <Button
              colorScheme="teal"
              mt="5"
              mx="auto"
              borderRadius="lg"
              width="100%"
              onClick={() => requestResetPassword()}
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

export default ResetPasswordPage;
