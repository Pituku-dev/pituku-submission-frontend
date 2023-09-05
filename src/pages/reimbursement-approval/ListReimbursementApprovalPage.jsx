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
} from "@chakra-ui/react";
import Wrapper from "../../components/Wrapper";
import { CheckIcon, ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import { FiTrash2 } from "react-icons/fi";

export default function ListReimbursementApprovalPage() {
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
                      Approve
                    </MenuItem>
                    <MenuItem
                      color="red.700"
                      _hover={{
                        bg: "red.600",
                        color: "white",
                      }}
                      icon={<CloseIcon />}
                    >
                      Decline
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
                      Approve
                    </MenuItem>
                    <MenuItem
                      color="red.700"
                      _hover={{
                        bg: "red.600",
                        color: "white",
                      }}
                      icon={<CloseIcon />}
                    >
                      Decline
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
                      Approve
                    </MenuItem>
                    <MenuItem
                      color="red.700"
                      _hover={{
                        bg: "red.600",
                        color: "white",
                      }}
                      icon={<CloseIcon />}
                    >
                      Decline
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
                      Approve
                    </MenuItem>
                    <MenuItem
                      color="red.700"
                      _hover={{
                        bg: "red.600",
                        color: "white",
                      }}
                      icon={<CloseIcon />}
                    >
                      Decline
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
                      Approve
                    </MenuItem>
                    <MenuItem
                      color="red.700"
                      _hover={{
                        bg: "red.600",
                        color: "white",
                      }}
                      icon={<CloseIcon />}
                    >
                      Decline
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
