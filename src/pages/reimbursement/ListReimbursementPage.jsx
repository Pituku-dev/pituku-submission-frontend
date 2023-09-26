import {
  AddIcon,
  CheckIcon,
  ChevronDownIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Spinner,
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WithAuth from "../../components/WithAuth";
import Wrapper from "../../components/Wrapper";
import http from "../../utils/http";
import dayjs from "dayjs";
import { rupiah } from "../../utils/currency";
import pdf from "../../components/Pdf";
import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js/dist/html2pdf.min";

const ListReimbursementPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [reimbursements, setReimbursements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getReimbursements = () => {
      setIsLoading(true);
      http
        .get("/reimbursements/me")
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
    getReimbursements();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Wrapper
      currentMenu="reimbursement"
      breadcrumbs={[
        {
          title: "Pengajuan",
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
        {/* <Box>
          <Flex>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Search2Icon color="gray.300" />
              </InputLeftElement>
              <Input type="tel" placeholder="search" />
            </InputGroup>
            <Select ml="4">
              <option value="option1">Selesai</option>
              <option value="option2">Di Proses</option>
              <option value="option3">Di Tolak</option>
              <option value="option3">Di Setujui</option>
            </Select>
          </Flex>
        </Box> */}
        <Button
          colorScheme="teal"
          ml="auto"
          leftIcon={<AddIcon />}
          onClick={() => navigate("/reimbursement/create")}
        >
          Buat Pengajuan Baru
        </Button>
      </Flex>
      {isLoading ? (
        <Box>
          <Flex justifyContent="center" alignItems="center" height="60vh">
            <Spinner />
          </Flex>
        </Box>
      ) : (
        <TableContainer>
          <Table variant="striped" overflowX='scroll'>
            <TableCaption>Data reimburesement</TableCaption>
            <Thead>
              <Tr>
                <Th>Tanggal Aju</Th>
                <Th>No. Pangajuan</Th>
                <Th>Detail</Th>
                <Th>Nominal</Th>
                <Th>DEP</Th>
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
                          onClick={() =>
                            navigate(`/reimbursement/d/${item.id}`)
                          }
                        >
                          Detail
                        </MenuItem>
                        <MenuItem onClick={() => download(item.id)}>
                          Download
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
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </Wrapper>
  );
};

export default WithAuth(ListReimbursementPage);
