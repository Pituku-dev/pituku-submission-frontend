import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
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
import {
  AddIcon,
  CheckIcon,
  ChevronDownIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import http from "../../utils/http";
import { useEffect, useState } from "react";
import WithAuth from "../../components/WithAuth";

const ListReimbursementPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getReimbursements()
  }, [])

  const getReimbursements = () => {
    setIsLoading(true);
    http
      .get("/reimbursements")
      .then((res) => {
        console.log(res);
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
        </Box>
        <Button colorScheme="teal" ml="auto" leftIcon={<AddIcon />} onClick={() => navigate('/reimbursement/create')}>
          Buat Pengajuan Baru
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped">
          <TableCaption>Data reimburesement</TableCaption>
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
            <Tr>
              <Td>1 Aug 2023</Td>
              <Td>2023/08/0001/HO</Td>
              <Td>4 PAX COFFEE - MANAGEMENT MEET</Td>
              <Td>Rp. 143.200</Td>
              <Td>HO</Td>
              <Td>
                <Tooltip label="David Abraham">
                  <Avatar
                    name="David Abraham"
                    src="https://bit.ly/dan-abramov"
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
            <Tr>
              <Td>1 Aug 2023</Td>
              <Td>2023/08/0001/HO</Td>
              <Td>4 PAX COFFEE - MANAGEMENT MEET</Td>
              <Td>Rp. 143.200</Td>
              <Td>HO</Td>
              <Td>
                <Tooltip label="David Abraham">
                  <Avatar
                    name="David Abraham"
                    src="https://bit.ly/dan-abramov"
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
            <Tr>
              <Td>1 Aug 2023</Td>
              <Td>2023/08/0001/HO</Td>
              <Td>4 PAX COFFEE - MANAGEMENT MEET</Td>
              <Td>Rp. 143.200</Td>
              <Td>HO</Td>
              <Td>
                <Tooltip label="David Abraham">
                  <Avatar
                    name="David Abraham"
                    src="https://bit.ly/dan-abramov"
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

export default WithAuth(ListReimbursementPage);