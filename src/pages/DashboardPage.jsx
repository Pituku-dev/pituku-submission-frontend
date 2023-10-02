import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text
} from "@chakra-ui/react";
import FlowPNG from "../assets/images/flow.png";
import WithAuth from "../components/WithAuth";
import Wrapper from "../components/Wrapper";

const DashboardPage = (props) => {
  return (
    <Wrapper
      currentMenu="dashboard"
      breadcrumbs={[
        {
          title: "Dashboard",
          url: "#",
          isCurrentPage: true,
        },
      ]}
    >
      <Grid
        templateColumns={{ md: "repeat(2, 1fr)", sm: "repeat(1, 1fr)" }}
        gap={4}
      >
        <GridItem>
          <Heading size="lg" mb="6">
            Alur Pengajuan
          </Heading>
          <Image src={FlowPNG} alt="Big Image" mb={4} rounded="lg" />
        </GridItem>
        <GridItem>
          <Heading size="lg" mb="6">
            Video Tutorial
          </Heading>
          <Flex
            mt="4"
            p="4"
            rounded="xl"
            cursor="pointer"
            _hover={{
              bg: "gray.50",
            }}
            border="1px"
            borderColor="gray.200"
            onClick={() => window.open('https://drive.google.com/file/d/1mSX7tQDKzr1GX1D9ptE-aqkiuzJBfAP1/view?usp=drive_link')}
          >
            <Box>
              <Text fontSize={"lg"}>Buat & Cek Pengajuan</Text>
            </Box>
          </Flex>
          <Flex
            mt="4"
            p="4"
            rounded="xl"
            cursor="pointer"
            _hover={{
              bg: "gray.50",
            }}
            border="1px"
            borderColor="gray.200"
            onClick={() => window.open('https://drive.google.com/file/d/1BwLW684MwY7eI-goC3H7YhYfYCSZdpsn/view?usp=drive_link')}
          >
            <Box>
              <Text fontSize={"lg"}>Download Invoice & Upload Bukti Transfer (Staff Finance)</Text>
            </Box>
          </Flex>
          <Flex
            mt="4"
            p="4"
            rounded="xl"
            cursor="pointer"
            _hover={{
              bg: "gray.50",
            }}
            border="1px"
            borderColor="gray.200"
            onClick={() => window.open('https://drive.google.com/file/d/18psLkYpH4sTa6lO3iCdPkUPm5e2XTvZE/view?usp=drive_link')}
          >
            <Box>
              <Text fontSize={"lg"}>Edit Rekening</Text>
            </Box>
          </Flex>
          <Flex
            mt="4"
            p="4"
            rounded="xl"
            cursor="pointer"
            _hover={{
              bg: "gray.50",
            }}
            border="1px"
            borderColor="gray.200"
            onClick={() => window.open('https://drive.google.com/file/d/1AUgfeKttFBqu6sG9fKcZExGjCai0r1QK/view?usp=drive_link')}
          >
            <Box>
              <Text fontSize={"lg"}>Review & Approve Pengajuan (Atasan)</Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Wrapper>
  );
};

export default WithAuth(DashboardPage);
