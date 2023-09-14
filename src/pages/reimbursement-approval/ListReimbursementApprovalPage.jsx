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
  useToast,
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

const ListReimbursementApprovalPage = () => {
  const toast = useToast();
  const [reimbursements, setReimbursements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
                  <Badge colorScheme="green">DONE</Badge>
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
                      <MenuItem>Download</MenuItem>
                      <MenuItem>Create a Copy</MenuItem>
                      <MenuItem>Mark as Draft</MenuItem>
                      <MenuItem
                        color="green.700"
                        _hover={{
                          bg: "green.600",
                          color: "white",
                        }}
                        icon={<CheckIcon />}
                      >
                        Tandai Selesai
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
    </Wrapper>
  );
}

export default WithAuth(ListReimbursementApprovalPage);