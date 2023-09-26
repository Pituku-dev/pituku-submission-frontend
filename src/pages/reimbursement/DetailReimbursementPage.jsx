import {
  CalendarIcon,
  CheckIcon,
  CloseIcon,
  MinusIcon,
  SmallCloseIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Spinner,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import html2pdf from "html2pdf.js/dist/html2pdf.min";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useNavigate, useParams } from "react-router-dom";
import pdf from "../../components/Pdf";
import WithAuth from "../../components/WithAuth";
import Wrapper from "../../components/Wrapper";
import { rupiah } from "../../utils/currency";
import http from "../../utils/http";
import { useUserStore } from "../../stores/useUserStore";
import { headDivisionList } from "../../utils/roles";

const DetailReimbursementPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  let { id } = useParams();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUploadFile, setIsLoadingUploadFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photo, setPhoto] = useState("");

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

  const [steps, setSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const getReimbursement = () => {
    http
      .get(`/reimbursements/${id}`)
      .then(async (res) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const logs = data.approvalLogs || [];
    const stepper = [
      { title: "Division Head", description: "Diproses" },
      { title: "Finance Manager", description: "Diproses" },
      { title: "COO", description: "Diproses" },
      { title: "CFO", description: "Diproses" },
      { title: "CEO", description: "Diproses" },
      { title: "Finance Staff", description: "Diproses" },
    ];

    logs.forEach((item) => {
      if (item.role === "Division Head") {
        stepper[0].description = item.status;
        setActiveStep(1);
      } else if (item.role === "Finance Manager") {
        stepper[1].description = item.status;
        setActiveStep(2);
      } else if (item.role === "Chief Operations Officer") {
        stepper[2].description = item.status;
        setActiveStep(3);
      } else if (item.role === "Chief Finance Officer") {
        stepper[3].description = item.status;
        setActiveStep(4);
      } else if (item.role === "Chief Executive Officer") {
        stepper[4].description = item.status;
        setActiveStep(5);
      } else if (item.role === "Finance Staff") {
        stepper[5].description = item.status;
        setActiveStep(6);
      }
    });

    stepper[5].description = "Ditolak";

    setSteps(stepper);
  }, [data]);

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
        navigate("/reimbursement-history");
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
        navigate("/reimbursement-history");
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
        pic: user.fullName,
        cp: user.phoneNumber,
        totalInWords: data.totalInWords,
        notes: data.notes,
        bank: user.bank,
        bankAccountNumber: user.bankAccountNumber,
        bankAccountName: user.bankAccountName,
        department: data.department,
        departmentHead: data.departmentHead,
        items: data.submissionItems,
      })
    );
    console.log(printElement);

    html2pdf().from(printElement).save();
  };

  const onUploadEvidence = (event) => {
    setIsLoadingUploadFile(true);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    http
      .post("/reimbursements/upload-evidence", formData)
      .then((res) => {
        setSelectedFile(event.target.files[0]);
        setPhoto(res.data.data.url);
        toast({
          title: "Upload Berhasil!",
          description: "File berhasil diupload",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      })
      .finally(() => {
        setIsLoadingUploadFile(false);
      });
  };

  return (
    <Wrapper
      currentMenu="reimbursement"
      breadcrumbs={[
        {
          title: "Perihal Pengajuan",
          url: "#",
          isCurrentPage: false,
        },
        {
          title: "List",
          url: "/reimbursement",
          isCurrentPage: true,
        },
        {
          title: "Detail",
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
              ml="auto"
              onClick={() => printHandler()}
              leftIcon={<CalendarIcon />}
            >
              Print
            </Button>
            {user.role === "Finance Staff" ? (
              <Button
                ml="2"
                // onClick={() => approve()}
                leftIcon={<CheckIcon />}
                colorScheme="teal"
              >
                Upload Bukti Transfer
              </Button>
            ) : null}
          </Flex>
          <Grid templateColumns="repeat(6, 1fr)" gap={2} mt="10">
            {steps.map((step, index) => (
              <GridItem key={index}>
                <Card
                  shadow="lg"
                  backgroundColor={
                    step.description === "Disetujui"
                      ? "teal"
                      : step.description === "Ditolak"
                      ? "red"
                      : ""
                  }
                >
                  <CardBody>
                    <Flex>
                      <Box>
                        <Text
                          color={
                            step.description === "Disetujui" ||
                            step.description === "Ditolak"
                              ? "white"
                              : ""
                          }
                          fontWeight="bold"
                        >
                          {step.title}
                        </Text>
                        <Text
                          color={
                            step.description === "Disetujui" ||
                            step.description === "Ditolak"
                              ? "white"
                              : ""
                          }
                          fontSize="sm"
                        >
                          {step.description}
                        </Text>
                      </Box>
                      <Box ml="auto" my="auto">
                        {step.description === "Disetujui" ? (
                          <Flex borderRadius="full" borderColor="white" borderWidth="2px" width="30px" height="30px">
                            <Center m="auto">
                              <CheckIcon color="white" />
                            </Center>
                          </Flex>
                        ) : step.description === "Ditolak" ? (
                          <Flex borderRadius="full" borderColor="white" borderWidth="2px" width="30px" height="30px">
                            <Center m="auto">
                              <SmallCloseIcon color="white" width="20px" height="20px" />
                            </Center>
                          </Flex>
                        ): (
                          <TimeIcon width="27px" height="27px" />
                        )}
                      </Box>
                    </Flex>
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </Grid>
          {isLoading ? (
            <Box>
              <Flex justifyContent="center" alignItems="center" height="60vh">
                <Spinner />
              </Flex>
            </Box>
          ) : (
            <Grid
              mt="8"
              templateColumns={{ md: "repeat(2, 1fr)", sm: "repeat(1, 1fr)" }}
              gap={6}
            >
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

                <Box mt="4">
                  <Flex>
                    <Box>
                      <Text fontSize="xl" fontWeight="bold">
                        Total
                      </Text>
                    </Box>
                    <Box ml="auto">
                      <Text fontSize="xl" fontWeight="bold" color="teal">
                        {rupiah(data.total)}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </GridItem>
            </Grid>
          )}
        </CardBody>
      </Card>
    </Wrapper>
  );
};

export default WithAuth(DetailReimbursementPage);
