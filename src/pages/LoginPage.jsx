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
  InputRightAddon,
  InputRightElement,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  let navigate = useNavigate();
  const toast = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
  }, []);

  const signIn = async () => {
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
                forgot password? <Link href="/reset-password">reset now</Link>
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
            <Text fontSize="sm" mt="3">
              Don't have account? <Link href="/register">register now</Link>
            </Text>
          </Box>
        </Center>
      </Flex>
    </>
  );
};

export default LoginPage;
