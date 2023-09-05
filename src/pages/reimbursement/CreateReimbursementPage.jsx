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
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import Wrapper from "../../components/Wrapper";
import { List } from "dom";
import { AddIcon } from "@chakra-ui/icons";

export default function CreateReimbursementPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem>
              <FormControl>
                <FormLabel>Tanggal Pengajuan</FormLabel>
                <Input type="text" value="5/08/2023" disabled />
                <FormHelperText color="orange">*auto generated</FormHelperText>
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Ke Departemen</FormLabel>
                <Input type="text" value="FINANCE" disabled />
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Departemen</FormLabel>
                <Input type="text" value="IT" disabled />
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Dept. Head</FormLabel>
                <Input type="text" value="Ian Rahmandana" disabled />
              </FormControl>
              <FormControl mt="4">
                <FormLabel>PIC</FormLabel>
                <Input type="text" value="Fahri" disabled />
              </FormControl>
              <FormControl>
                <FormLabel mt="4">CP</FormLabel>
                <Input type="text" value="081327432435" disabled />
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Hal / Perihal</FormLabel>
                <Textarea placeholder="Here is a sample placeholder" />
              </FormControl>
            </GridItem>
            <GridItem>
              <Flex mt="8">
                <Heading my="auto" size="md">
                  Detail Pengajuan
                </Heading>
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="teal"
                  variant="ghost"
                  ml="auto"
                  onClick={onOpen}
                >
                  Tambah
                </Button>
              </Flex>
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
                onClick={onOpen}
              >
                <Box>
                  <Text fontSize={"lg"}>Printer HP Omen</Text>
                  <Text color="gray.400">Pembelian Printer untuk HC</Text>
                </Box>
                <Text ml="auto" color="teal">
                  Rp. 2.000.000
                </Text>
              </Flex>
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
                onClick={onOpen}
              >
                <Box>
                  <Text fontSize={"lg"}>Printer HP Omen</Text>
                  <Text color="gray.400">Pembelian Printer untuk HC</Text>
                </Box>
                <Text ml="auto" color="teal">
                  Rp. 2.000.000
                </Text>
              </Flex>
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
                onClick={onOpen}
              >
                <Box>
                  <Text fontSize={"lg"}>Printer HP Omen</Text>
                  <Text color="gray.400">Pembelian Printer untuk HC</Text>
                </Box>
                <Text ml="auto" color="teal">
                  Rp. 2.000.000
                </Text>
              </Flex>
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
                onClick={onOpen}
              >
                <Box>
                  <Text fontSize={"lg"}>Printer HP Omen</Text>
                  <Text color="gray.400">Pembelian Printer untuk HC</Text>
                </Box>
                <Text ml="auto" color="teal">
                  Rp. 2.000.000
                </Text>
              </Flex>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detail Pengajuan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="Here is a sample placeholder" />
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Detail</FormLabel>
              <Textarea placeholder="Here is a sample placeholder" />
            </FormControl>
            <FormControl>
              <FormLabel>Foto</FormLabel>
              <Input type="file" />
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Harga</FormLabel>
              <NumberInput>
                <NumberInputField placeholder="Rp. xxxx" />
              </NumberInput>
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Jumlah</FormLabel>
              <NumberInput>
                <NumberInputField placeholder="0" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Sub Total</FormLabel>
              <NumberInput disabled>
                <NumberInputField placeholder="Rp. xxxx" value="10000000" />
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" colorScheme="gray" mr={3} onClick={onClose}>
              Tutup
            </Button>
            <Button colorScheme="teal">Simpan</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
}
