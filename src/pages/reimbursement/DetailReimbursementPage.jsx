import { CalendarIcon, CheckIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
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
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import html2pdf from "html2pdf.js/dist/html2pdf.min";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useParams } from "react-router-dom";
import pdf from "../../components/Pdf";
import WithAuth from "../../components/WithAuth";
import Wrapper from "../../components/Wrapper";
import { rupiah } from "../../utils/currency";
import http from "../../utils/http";
import { useUserStore } from "../../stores/useUserStore";
import { headDivisionList } from "../../utils/roles";

const DetailReimbursementPage = () => {
  const toast = useToast();
  let { id } = useParams();
  const { user } = useUserStore();
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
    console.log(user);
  }, []);

  const approve = () => {
    http
      .post(`/reimbursements/${id}/approve`)
      .then((res) => {
        toast({
          title: "Approve Berhasil!",
          description: "Sukses! Reimbursement berhasil diapprove.",
          status: "error",
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data) {
          toast({
            title: "Error approving data reimbursement",
            description: err.response.data.message,
            status: "error",
            isClosable: true,
          });
        }
      });
  };

  const reject = () => {
    http
      .post(`/reimbursements/${id}/reject`)
      .then((res) => {
        toast({
          title: "Reject Berhasil!",
          description: "Sukses! Reimbursement berhasil direject.",
          status: "error",
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data) {
          toast({
            title: "Error approving data reimbursement",
            description: err.response.data.message,
            status: "error",
            isClosable: true,
          });
        }
      });
  };

  const printHandler = () => {
    const printElement = ReactDOMServer.renderToString(
      pdf({
        submissionDate: dayjs(data.submissionDate)
          .locale("id")
          .format("DD MMM YYYY"),
        submissionNumber: data.submissionNumber,
        title: data.title,
        pic: "dia",
        cp: "saya",
        items: data.submissionItems,
      })
    );
    console.log(printElement);

    html2pdf().from(printElement).save();
  };

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
          <Flex>
            {headDivisionList.includes(user.role) ? (
              <>
                <Button
                  ml="auto"
                  onClick={() => approve()}
                  leftIcon={<CheckIcon />}
                  colorScheme="teal"
                >
                  Approve
                </Button>
                <Button
                  ml="2"
                  onClick={() => reject()}
                  leftIcon={<MinusIcon />}
                  colorScheme="red"
                >
                  Reject
                </Button>
              </>
            ) : null}
            <Button
              ml={headDivisionList.includes(user.role) ? 4 : "auto"}
              onClick={() => printHandler()}
              leftIcon={<CalendarIcon />}
            >
              Print
            </Button>
          </Flex>
          {isLoading ? (
            <Box>
              <Flex justifyContent="center" alignItems="center" height="60vh">
                <Spinner />
              </Flex>
            </Box>
          ) : (
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
                  <FormHelperText color="orange">
                    *auto generated
                  </FormHelperText>
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
                      <Text fontSize={"sm"} color="gray">
                        Harga: {rupiah(item.price)}
                      </Text>
                      <Text fontSize={"sm"} color="gray">
                        Kuantitas: {item.quantity}
                      </Text>
                    </Box>
                    <Text ml="auto" color="teal">
                      {rupiah(item.subtotal)}
                    </Text>
                  </Flex>
                ))}
              </GridItem>
            </Grid>
          )}
        </CardBody>
      </Card>
    </Wrapper>
  );
};

export default WithAuth(DetailReimbursementPage);
