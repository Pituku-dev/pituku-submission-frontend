import {
  Box,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WithAuth from "../../components/WithAuth";
import Wrapper from "../../components/Wrapper";
import http from "../../utils/http";
import dayjs from "dayjs";
import { rupiah } from "../../utils/currency";

const DetailReimbursementPage = () => {
  const toast = useToast();
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    id: "",
    submissionNumber: "",
    submissionDate: "",
    title: "",
    submissionItems: [],
    total: 0,
    totalInWords: "",
    status: "",
    personInCharge: "",
    department: "",
  });

  const getReimbursement = () => {
    http
      .get(`/reimbursements/${id}`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getReimbursement();
  }, []);

  return (
    <Wrapper
      currentMenu="reimbursement"
      breadcrumbs={[
        {
          title: "Riwayat Pengajuan",
          url: "#",
          isCurrentPage: false,
        },
        {
          title: "List",
          url: "/reimbursement",
          isCurrentPage: true,
        },
        {
          title: "Create",
          url: "#",
          isCurrentPage: true,
        },
      ]}
    >
      <Card>
        <CardBody>
          <Grid mt="8" templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem>
              <Flex>
                <Heading size="md">Buat Pengajuan</Heading>
              </Flex>
              <FormControl mt="8">
                <FormLabel>Tanggal Pengajuan</FormLabel>
                <Input
                  type="text"
                  value={dayjs(data.submissionDate)
                    .locale("id")
                    .format("DD MMM YYYY")}
                  disabled
                />
                <FormHelperText color="orange">*auto generated</FormHelperText>
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Departemen</FormLabel>
                <Input type="text" value={data.department} disabled />
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Hal / Perihal</FormLabel>
                <Textarea
                  placeholder="Here is a sample placeholder"
                  value={data.title}
                  disabled
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <Flex>
                <Heading my="auto" size="md">
                  Detail Pengajuan
                </Heading>
              </Flex>

              {data.submissionItems.map((item, index) => (
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
                  key={index}
                >
                  <Box>
                    <Text fontSize={"lg"}>{item.description}</Text>
                    <Text fontSize={"sm"} color="gray">Harga: {rupiah(item.price)}</Text>
                    <Text fontSize={"sm"} color="gray">Kuantitas: {item.quantity}</Text>
                  </Box>
                  <Text ml="auto" color="teal">
                    {rupiah(item.subtotal)}
                  </Text>
                </Flex>
              ))}
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </Wrapper>
  );
};

export default WithAuth(DetailReimbursementPage);