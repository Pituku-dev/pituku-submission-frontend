import {
  Avatar,
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  useDisclosure
} from "@chakra-ui/react";
import Wrapper from "../../components/Wrapper";
import { CheckIcon, ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import { FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import http from "../../utils/http";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { rupiah } from "../../utils/currency";
import WithAuth from "../../components/WithAuth";
import pdf from "../../components/Pdf";
import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js/dist/html2pdf.min";

const ListReimbursementApprovalPage = () => {
  const toast = useToast();
  const [reimbursements, setReimbursements] = useState([]);
  const [currentReimbursement, setCurrentReimbursement] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    getReimbursements();
  }, []);

  const getReimbursements = () => {
    setIsLoading(true);
    http
      .get("/reimbursements")
      .then((res) => {
        console.log(res);
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
            pic: "dia",
            cp: "saya",
            items: data.submissionItems,
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
  }

  const approve = () => {
    http
      .post(`/reimbursements/${currentReimbursement}/approve`)
      .then((res) => {
        console.log(res);
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
      <TableContainer>
        <Table variant="striped">
          <TableCaption>Data reimbursement yang belum di approve</TableCaption>
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
                <Td>HO</Td>
                <Td>
                  <Tooltip label={item.personInCharge}>
                    <Avatar
                      name={item.personInCharge}
                    />
                  </Tooltip>
                </Td>
                <Td>
                  {item.status.toLowerCase() === 'diproses' ? (
                    <Badge colorScheme="yellow">{item.status}</Badge>
                  ):null}
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
                        onClick={() => navigate(`/reimbursement/d/${item.id}`)}
                      >
                        Detail
                      </MenuItem>
                      <MenuItem onClick={() => download()}>Download</MenuItem>
                      <MenuItem
                        color="green.700"
                        _hover={{
                          bg: "green.600",
                          color: "white",
                        }}
                        icon={<CheckIcon />}
                        onClick={() => {
                          setCurrentReimbursement(item.id);
                          onOpen();
                        }}
                      >
                        Tandai Approve
                      </MenuItem>
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

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Approve Reimbursement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Apakah anda yakin ingin approve reimbursement ini?</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={() => approve()} colorScheme="teal" ml="2">Approve</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
}

export default WithAuth(ListReimbursementApprovalPage);