import { Center, Flex, Spinner } from '@chakra-ui/react';
import CookieCutter from 'cookie-cutter';
import React from 'react';
import http from '../utils/http';

const WithAuth = WrappedComponent => {
  // And return another component
  const HOC = class extends React.Component {
    state = {
      isLoading: true,
    };
    componentDidMount = async () => {
      const isAuthenticated = await this.isAuthenticated();
      if (!isAuthenticated) {
        return (window.location.href = '/login');
      }
      this.setState({
        isLoading: false,
      });
    };
    isAuthenticated = async () => {
      const accessToken = await CookieCutter.get('access_token');
      if (!accessToken) {
        return false;
      }

      console.log(accessToken);

      http.defaults.headers.common[
        'Authorization'
      ] = `${accessToken}`;

      // check access token is valid & update state loged in

      return true;
    };
    render() {
      return (
        <>
          {this.state.isLoading ? (
            <Flex w="100vw" h="100vh">
              <Center m="auto">
                  <Spinner />
                </Center>
            </Flex>
          ) : (
            <WrappedComponent {...this.props} />
          )}
        </>
      );
    }
  };
  return (HOC);
};

export default WithAuth;