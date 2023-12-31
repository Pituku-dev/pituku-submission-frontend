import { CheckIcon, ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import dayjs from "dayjs";
import html2pdf from "html2pdf.js/dist/html2pdf.min";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useNavigate } from "react-router-dom";
import pdf from "../../components/Pdf";
import WithAuth from "../../components/WithAuth";
import Wrapper from "../../components/Wrapper";
import { useUserStore } from "../../stores/useUserStore";
import { rupiah } from "../../utils/currency";
import http from "../../utils/http";
import { headDivisionList } from "../../utils/roles";

const ListReimbursementApprovalPage = () => {
  const toast = useToast();
  const { user } = useUserStore();
  const [reimbursements, setReimbursements] = useState([]);
  const [reason, setReason] = useState("");
  const [currentReimbursement, setCurrentReimbursement] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const {
    isOpen: isOpenApprove,
    onOpen: onOpenApprove,
    onClose: onCloseApprove,
  } = useDisclosure();

  const {
    isOpen: isOpenReject,
    onOpen: onOpenReject,
    onClose: onCloseReject,
  } = useDisclosure();

  const getReimbursements = () => {
    setIsLoading(true);

    let url = "/reimbursements/approval-queue";
    if (user.role === "Finance Staff") {
      url = "/reimbursements";
    } else if (user.role === "Chief Technology & Marketing Officer" || user.role === "Corporate Secretary" || user.role === "Chief Strategy Officer") {
      url = "/reimbursements/my-department";
    }

    if (status) {
      url += `?status=${status}`
    }

    http
      .get(url)
      .then((res) => {
        setReimbursements(res.data.data);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          toast({
            title: "Error getting data reimbursement",
            description: err.response.data.message,
            status: "error",
            isClosable: true,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getReimbursements();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const download = (id) => {
    http
      .get(`/reimbursements/${id}`)
      .then((res) => {
        const data = res.data.data;
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
            total: data.total,
            notes: data.notes,
            bank: user.bank,
            bankAccountNumber: user.bankAccountNumber,
            bankAccountName: user.bankAccountName,
            department: data.department,
            departmentHead: data.departmentHead,
            items: data.submissionItems,
            approvalLogs: data.approvalLogs,
          })
        );

        html2pdf().from(printElement).save();
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data) {
          toast({
            title: "Error download data reimbursement",
            description: err.response.data.message,
            status: "error",
            isClosable: true,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const approve = () => {
    http
      .post(`/reimbursements/${currentReimbursement}/approve`)
      .then((res) => {
        toast({
          title: "Sukses!",
          description: "Pengajuan ini berhasil di approve.",
          status: "success",
          isClosable: true,
        });
        onCloseApprove();
        getReimbursements();
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
      .post(`/reimbursements/${currentReimbursement}/reject`, {
        description: reason,
      })
      .then((res) => {
        toast({
          title: "Sukses!",
          description: "Pengajuan ini berhasil di tolak.",
          status: "success",
          isClosable: true,
        });
        onCloseReject();
        getReimbursements();
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

  return (
    <Wrapper
      currentMenu="reimbursement-approval"
      breadcrumbs={[
        {
          title: "Riwayat Pengajuan",
          url: "#",
          isCurrentPage: false,
        },
        {
          title: "List",
          url: "#",
          isCurrentPage: true,
        },
      ]}
    >
      <Flex my="6">
        <Box>
          <Flex>
            <Select ml="4" onChange={(event) => setStatus(event.target.value)}>
              <option value="">Semua</option>
              <option value="Selesai">Selesai</option>
              <option value="Diproses">Di Proses</option>
              <option value="Ditolak">Di Tolak</option>
              <option value="Disetujui">Di Setujui</option>
            </Select>
          </Flex>
        </Box>
      </Flex>
      {isLoading ? (
        <Box>
          <Flex justifyContent="center" alignItems="center" height="60vh">
            <Spinner />
          </Flex>
        </Box>
      ) : (
        <TableContainer>
          <Table variant="striped">
            <TableCaption>
              Data reimbursement yang belum di approve
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Tanggal Aju</Th>
                <Th>No. Pangajuan</Th>
                <Th>Detail</Th>
                <Th>Nominal</Th>
                <Th>DEP</Th>
                <Th>PIC</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reimbursements.map((item, index) => (
                <Tr key={index}>
                  <Td>
                    {dayjs(item.submissionDate)
                      .locale("id")
                      .format("DD MMM YYYY")}
                  </Td>
                  <Td>{item.submissionNumber}</Td>
                  <Td>{item.title}</Td>
                  <Td>{rupiah(item.total)}</Td>
                  <Td>{item.department}</Td>
                  <Td>
                    <Tooltip label={item.personInCharge}>
                      <Avatar name={item.personInCharge} />
                    </Tooltip>
                  </Td>
                  <Td>
                    {item.status.toLowerCase() === "diproses" ? (
                      <Badge colorScheme="yellow">{item.status}</Badge>
                    ) : item.status.toLowerCase() === "disetujui" ? (
                      <Badge colorScheme="teal">{item.status}</Badge>
                    ) : item.status.toLowerCase() === "selesai" ? (
                      <Badge colorScheme="teal">{item.status}</Badge>
                    ) : item.status.toLowerCase() === "ditolak" ? (
                      <Badge colorScheme="red">{item.status}</Badge>
                    ): null}
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        size="sm"
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                      >
                        Actions
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          onClick={() =>
                            navigate(`/reimbursement/d/${item.id}`)
                          }
                        >
                          Detail
                        </MenuItem>
                        <MenuItem onClick={() => download()}>Download</MenuItem>
                        {headDivisionList.includes(user.role) && !item.isReviewed ? (
                          <>
                            <MenuItem
                              color="green.700"
                              _hover={{
                                bg: "green.600",
                                color: "white",
                              }}
                              icon={<CheckIcon />}
                              onClick={() => {
                                setCurrentReimbursement(item.id);
                                onOpenApprove();
                              }}
                            >
                              Tandai Approve
                            </MenuItem>
                            <MenuItem
                              color="red.700"
                              _hover={{
                                bg: "red.600",
                                color: "white",
                              }}
                              icon={<CloseIcon />}
                              onClick={() => {
                                setCurrentReimbursement(item.id);
                                onOpenReject();
                              }}
                            >
                              Tandai Tolak
                            </MenuItem>
                          </>
                        ) : null}
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Tanggal Aju</Th>
                <Th>No. Pangajuan</Th>
                <Th>Detail</Th>
                <Th>Nominal</Th>
                <Th>DEP</Th>
                <Th>PIC</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}

      <Modal onClose={onCloseApprove} isOpen={isOpenApprove} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Approve Reimbursement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Apakah anda yakin ingin approve reimbursement ini?</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseApprove}>Close</Button>
            <Button onClick={() => approve()} colorScheme="teal" ml="2">
              Approve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
            <Button onClick={() => reject()} colorScheme="red" ml="2">
              Tolak
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
};

export default WithAuth(ListReimbursementApprovalPage);
