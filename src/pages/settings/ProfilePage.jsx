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
  useToast,
} from "@chakra-ui/react";
import Wrapper from "../../components/Wrapper";
import { useEffect, useState } from "react";
import WithAuth from "../../components/WithAuth";
import { useUserStore } from "../../stores/useUserStore";
import http from "../../utils/http";

const ProfilePage = () => {
  const toast = useToast();
  const { user } = useUserStore();
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [bank, setBank] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");

  useEffect(() => {
    setProfile(user);
    setBank(user.bank);
    setPhoneNumber(user.phoneNumber);
    setBankAccountName(user.bankAccountName);
    setBankAccountNumber(user.bankAccountNumber);
    setIsLoading(false);
  }, [user]);

  const updateProfile = () => {
    setIsLoading(true);
    http
      .put("/profiles/me", {
        bank,
        phoneNumber,
        bankAccountName,
        bankAccountNumber,
      })
      .then((res) => {
        toast({
          title: "Update berhasil!",
          description: "Update profile berhasil",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Ooops!",
          description: "Terjadi masalah pada sisi server.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
      <Card width={{ md: "50%", sm: "100%" }}>
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
                <Button
                  colorScheme="teal"
                  size="sm"
                  ml="auto"
                  onClick={() => updateProfile()}
                >
                  Simpan Perubahan
                </Button>
              </Flex>
              <FormControl mt="6">
                <FormLabel>Nama Lengkap</FormLabel>
                <Input type="text" value={profile.fullName} disabled />
              </FormControl>
              <FormControl mt="2">
                <FormLabel>Email</FormLabel>
                <Input type="email" value={profile.email} disabled />
              </FormControl>
              <FormControl mt="2">
                <FormLabel>No Telpon</FormLabel>
                <Input
                  type="number"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </FormControl>
              <Grid mt="2" templateColumns="repeat(2, 1fr)" gap="4">
                <GridItem>
                  <FormControl>
                    <FormLabel>Departemen</FormLabel>
                    <Select
                      variant="filled"
                      placeholder={profile.department}
                      disabled
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Select
                      variant="filled"
                      placeholder={profile.role}
                      disabled
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              <FormControl mt="2">
                <FormLabel>Nama Pemilik Bank</FormLabel>
                <Input
                  type="text"
                  value={bankAccountName}
                  onChange={(event) => setBankAccountName(event.target.value)}
                />
              </FormControl>
              <Grid mt="2" templateColumns="repeat(2, 1fr)" gap="4">
                <GridItem>
                  <FormControl>
                    <FormLabel>Bank</FormLabel>
                    <Select
                      variant="filled"
                      onChange={(event) => setBank(event.target.value)}
                    >
                      <option value="BCA" selected={bank === "BCA"}>
                        BCA
                      </option>
                      <option value="BRI" selected={bank === "BRI"}>
                        BRI
                      </option>
                      <option value="BSI" selected={bank === "BSI"}>
                        BSI
                      </option>
                      <option value="Mandiri" selected={bank === "Mandiri"}>
                        Mandiri
                      </option>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>No Rekening</FormLabel>
                    <Input
                      type="number"
                      value={bankAccountNumber}
                      onChange={(event) =>
                        setBankAccountNumber(event.target.value)
                      }
                    />
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
