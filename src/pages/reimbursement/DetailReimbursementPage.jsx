import {
  CalendarIcon,
  CheckIcon,
  ExternalLinkIcon,
  MinusIcon,
  SmallCloseIcon,
  TimeIcon
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
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import html2pdf from "html2pdf.js/dist/html2pdf.min";
import { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Link, useParams } from "react-router-dom";
import pdf from "../../components/Pdf";
import WithAuth from "../../components/WithAuth";
import Wrapper from "../../components/Wrapper";
import { useUserStore } from "../../stores/useUserStore";
import { rupiah } from "../../utils/currency";
import http from "../../utils/http";
import { headDivisionList } from "../../utils/roles";

const DetailReimbursementPage = () => {
  const toast = useToast();
  let { id } = useParams();
  const { user } = useUserStore();
  const uploadFileRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUploadFile, setIsLoadingUploadFile] = useState(false);
  const [isLoadingReject, setIsLoadingReject] =
    useState(false);
  const [reason, setReason] = useState("");

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

  const {
    isOpen: isOpenReject,
    onOpen: onOpenReject,
    onClose: onCloseReject,
  } = useDisclosure();

  const [steps, setSteps] = useState([]);

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
      { title: "Pembayaran", description: "Menunggu" },
    ];

    logs.forEach((item) => {
      if (
        item.role === "Chief Technology & Marketing Officer" ||
        item.role === "Corporate Secretary" ||
        item.role === "Chief Strategy Officer"
      ) {
        stepper[0].description = item.status;
      } else if (item.role === "Finance Manager") {
        stepper[1].description = item.status;
      } else if (item.role === "Chief Operations Officer") {
        stepper[2].description = item.status;
      } else if (item.role === "Chief Finance Officer") {
        stepper[3].description = item.status;
      } else if (item.role === "Chief Executive Officer") {
        stepper[4].description = item.status;
      }
    });

    if (data.transferProof) {
      stepper[5].description = "Ditransfer";
    }

    setSteps(stepper);
  }, [data]);

  const approve = () => {
    http
      .post(`/reimbursements/${id}/approve`)
      .then((res) => {
        toast({
          title: "Approve Berhasil!",
          description: "Sukses! Reimbursement berhasil diapprove.",
          status: "success",
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
      })
      .finally(() => {
        getReimbursement();
      });
  };

  const reject = () => {
    setIsLoadingReject(true);
    http
      .post(`/reimbursements/${id}/reject`, {
        description: reason,
      })
      .then((res) => {
        toast({
          title: "Reject Berhasil!",
          description: "Sukses! Reimbursement berhasil direject.",
          status: "success",
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
      })
      .finally(() => {
        onCloseReject();
        getReimbursement();
        setIsLoadingReject(false);
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
        pic: data.personInCharge,
        cp: user.phoneNumber,
        totalInWords: data.totalInWords,
        notes: data.notes,
        bank: user.bank,
        bankAccountNumber: user.bankAccountNumber,
        bankAccountName: user.bankAccountName,
        department: data.department,
        departmentHead: data.departmentHead,
        items: data.submissionItems,
        approvalLogs: data.approvalLogs
      })
    );

    html2pdf().from(printElement).save();
  };

  const onUploadEvidence = (event) => {
    setIsLoadingUploadFile(true);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    http
      .post(`/reimbursements/${id}/upload-transaction-proof`, formData)
      .then((res) => {
        // setPhoto(res.data.data.url);
        toast({
          title: "Upload Berhasil!",
          description: "Bukti transfer berhasil diupload",
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
            {headDivisionList.includes(user.role) && !data.isReviewed ? (
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
                  onClick={() => onOpenReject()}
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
            {user.role === "Finance Staff" && !data.transferProof ? (
              <Button
                ml="2"
                onClick={() => uploadFileRef.current.click()}
                leftIcon={<CheckIcon />}
                colorScheme="teal"
                isLoading={isLoadingUploadFile}
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
                    step.description === "Disetujui" ||
                    step.description === "Ditransfer"
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
                            step.description === "Ditransfer" ||
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
                            step.description === "Ditransfer" ||
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
                        {step.description === "Disetujui" ||
                        step.description === "Ditransfer" ? (
                          <Flex
                            borderRadius="full"
                            borderColor="white"
                            borderWidth="2px"
                            width="30px"
                            height="30px"
                          >
                            <Center m="auto">
                              <CheckIcon color="white" />
                            </Center>
                          </Flex>
                        ) : step.description === "Ditolak" ? (
                          <Flex
                            borderRadius="full"
                            borderColor="white"
                            borderWidth="2px"
                            width="30px"
                            height="30px"
                          >
                            <Center m="auto">
                              <SmallCloseIcon
                                color="white"
                                width="20px"
                                height="20px"
                              />
                            </Center>
                          </Flex>
                        ) : (
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
                  <FormLabel>PIC</FormLabel>
                  <Input type="text" value={data.personInCharge} disabled />
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

                <Flex mt="8">
                  <Heading size="md">Bukti Transfer</Heading>
                </Flex>
                <Image
                  mt="4"
                  src={data.transferProof}
                  width="100%"
                  rounded="lg"
                />
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
                      <Link href="#" isExternal>
                        Lihat Bukti <ExternalLinkIcon mx="2px" />
                      </Link>
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

      <Input
        ref={uploadFileRef}
        type="file"
        onChange={onUploadEvidence}
        hidden
      />

      <Modal onClose={onCloseReject} isOpen={isOpenReject} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reject Reimbursement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Apakah anda yakin ingin reject reimbursement ini?</Text>
            <FormControl isRequired mt="4">
              <FormLabel>Alasan</FormLabel>
              <Textarea
                placeholder="Tulis alasan anda"
                onChange={(event) => setReason(event.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseReject}>Tutup</Button>
            <Button
              onClick={() => reject()}
              colorScheme="red"
              ml="2"
              isLoading={isLoadingReject}
            >
              Tolak
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
};

export default WithAuth(DetailReimbursementPage);
