import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Spinner,
} from "@chakra-ui/react";
import Wrapper from "../../components/Wrapper";
import { useEffect, useState } from "react";
import WithAuth from "../../components/WithAuth";
import { useUserStore } from "../../stores/useUserStore";

const ProfilePage = () => {
  const { user } = useUserStore();
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProfile(user);
    setIsLoading(false);
  }, [user]);

  return (
    <Wrapper
      currentMenu="settings"
      breadcrumbs={[
        {
          title: "Pengaturan",
          url: "#",
          isCurrentPage: false,
        },
        {
          title: "Profile",
          url: "#",
          isCurrentPage: true,
        },
      ]}
    >
      <Card  width="50%">
        <CardBody>
          {isLoading ? (
            <Box>
              <Flex justifyContent="center" alignItems="center" height="60vh">
                <Spinner />
              </Flex>
            </Box>
          ) : (
            <Box>
              <Flex>
                <Heading size="md">Profil Saya</Heading>
                <Button colorScheme="teal" size="sm" ml="auto">
                  Simpan Perubahan
                </Button>
              </Flex>
              <FormControl mt="6">
                <FormLabel>Nama Lengkap</FormLabel>
                <Input type="text" value={profile.fullName} />
              </FormControl>
              <FormControl mt="2">
                <FormLabel>Email</FormLabel>
                <Input type="email" value={profile.email} />
              </FormControl>
              <FormControl mt="2">
                <FormLabel>No Telpon</FormLabel>
                <Input type="number" value={profile.phoneNumber} />
              </FormControl>
              <Grid mt="2" templateColumns="repeat(2, 1fr)" gap="4">
                <GridItem>
                  <FormControl>
                    <FormLabel>Departemen</FormLabel>
                    <Select variant="filled" placeholder={profile.department} />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Select variant="filled" placeholder={profile.role} />
                  </FormControl>
                </GridItem>
              </Grid>
              <FormControl mt="2">
                <FormLabel>Nama Pemilik Bank</FormLabel>
                <Input type="text" value={profile.bankAccountName} />
              </FormControl>
              <Grid mt="2" templateColumns="repeat(2, 1fr)" gap="4">
                <GridItem>
                  <FormControl>
                    <FormLabel>Bank</FormLabel>
                    <Select variant="filled" placeholder={profile.bank} />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>No Rekening</FormLabel>
                    <Input type="text" value={profile.bankAccountNumber} />
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>
          )}
        </CardBody>
      </Card>
    </Wrapper>
  );
};

export default WithAuth(ProfilePage);
