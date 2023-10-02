import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Flex,
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
  Tr,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import html2pdf from "html2pdf.js/dist/html2pdf.min";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useNavigate } from "react-router-dom";
import pdf from "../../components/Pdf";
import WithAuth from "../../components/WithAuth";
import Wrapper from "../../components/Wrapper";
import { rupiah } from "../../utils/currency";
import http from "../../utils/http";

const ListReimbursementPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [reimbursements, setReimbursements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const getReimbursements = () => {
      setIsLoading(true);

      let url = "/reimbursements/me";

      if (status) {
        url += `?status=${status}`
      }

      http
        .get(url)
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
          <Table variant="striped" overflowX="scroll">
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
                  <Td>{item.department}</Td>
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
                        <MenuItem onClick={() => download(item.id)}>
                          Download
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Wrapper>
  );
};

export default WithAuth(ListReimbursementPage);
