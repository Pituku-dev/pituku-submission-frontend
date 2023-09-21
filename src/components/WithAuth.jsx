import { Center, Flex, Spinner } from '@chakra-ui/react';
import CookieCutter from 'cookie-cutter';
import React, { useEffect, useState } from 'react';
import http from '../utils/http';
import { useUserStore } from '../stores/useUserStore';

const WithAuth = (WrappedComponent) => {
  const HOC = (props) => {
    const { setUser } = useUserStore();
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = async () => {
      const accessToken = await CookieCutter.get("access_token");
      if (!accessToken) {
        return false;
      }

      http.defaults.headers.common["Authorization"] = `${accessToken}`;

      const user = await http.get("/profiles/me");
      if (user.data.status !== "success") {
        return false;
      }

      setUser(user.data.data);

      return true;
    };

    useEffect(() => {
      const fetchData = async () => {
        const isAuthenticatedResult = await isAuthenticated();
        if (!isAuthenticatedResult) {
          window.location.href = "/login";
        } else {
          setIsLoading(false);
        }
      };

      fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        {isLoading ? (
          <Flex w="100vw" h="100vh">
            <Center m="auto">
              <Spinner />
            </Center>
          </Flex>
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };

  return HOC;
};

export default WithAuth;
