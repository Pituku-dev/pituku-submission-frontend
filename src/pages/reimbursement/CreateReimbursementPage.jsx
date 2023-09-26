import { AddIcon } from "@chakra-ui/icons";
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
  useToast,
} from "@chakra-ui/react";
import Wrapper from "../../components/Wrapper";
import { useEffect, useRef, useState } from "react";
import http from "../../utils/http";
import angkaTerbilang from "@develoka/angka-terbilang-js";
import WithAuth from "../../components/WithAuth";
import dayjs from "dayjs";
import { rupiah } from "../../utils/currency";
import { useNavigate } from "react-router-dom";

const CreateReimbursementPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const uploadFileRef = useRef();
  const [isLoadingUploadFile, setIsLoadingUploadFile] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [reimbursementItems, setReimbursementItems] = useState([]);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [total, setTotal] = useState(0);

  const onUploadFile = (event) => {
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

  const addReimbursementItem = () => {
    setReimbursementItems((prev) => [
      ...prev,
      {
        description,
        price: parseInt(price),
        quantity: parseInt(quantity),
        evidence: photo,
        subtotal: price * quantity,
      },
    ]);

    setPrice(0);
    setQuantity(0);
    setDescription("");
    setPhoto("");
    setSelectedFile(null);
    onClose();
  };

  useEffect(() => {
    console.log(reimbursementItems);
  }, [reimbursementItems]);

  const createReimbursement = () => {
    setIsLoadingCreate(true);

    let total = 0;
    reimbursementItems.forEach((item) => {
      total += item.price * item.quantity;
    });

    console.log(total);
    console.log(angkaTerbilang(total));

    console.log(title);

    http
      .post("/reimbursements", {
        title,
        total,
        notes,
        totalInWords: angkaTerbilang(total),
        submissionDate: new Date(),
        submissionItems: reimbursementItems,
      })
      .then((res) => {
        toast({
          title: "Reimbursement Dibuat!",
          description: "Reimbursement berhasil dibuat.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/reimbursement");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingCreate(true);
      });
  };

  useEffect(() => {
    let total = 0;
    if (reimbursementItems.length > 1) {
      total = reimbursementItems.reduce((a, b) => a.subtotal + b.subtotal);
    } else if (reimbursementItems.length === 1) {
      total = reimbursementItems[0].subtotal;
    }
    console.log(total)
    setTotal(total);
  }, [reimbursementItems]);


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
      <Card mb="4">
        <CardBody>
          <Grid
            mt="8"
            templateColumns={{ md: "repeat(2, 1fr)", sm: "repeat(1, 1fr)" }}
            gap={6}
            sm
          >
            <GridItem>
              <Flex>
                <Heading size="md">Buat Pengajuan</Heading>
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="teal"
                  ml="auto"
                  onClick={() => createReimbursement()}
                  isLoading={isLoadingCreate}
                >
                  Simpan
                </Button>
              </Flex>
              <FormControl mt="8">
                <FormLabel>Tanggal Pengajuan</FormLabel>
                <Input
                  type="text"
                  value={dayjs(new Date()).locale("id").format("DD MMM YYYY")}
                  disabled
                />
                <FormHelperText color="orange">*auto generated</FormHelperText>
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Hal / Perihal</FormLabel>
                <Textarea
                  placeholder="Hal / Perihal"
                  onChange={(event) => setTitle(event.target.value)}
                />
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Catatan</FormLabel>
                <Textarea
                  placeholder="Catatan"
                  onChange={(event) => setNotes(event.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <Flex>
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
              {reimbursementItems.map((item, index) => (
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
                    <Text mt="2" fontSize={"sm"} color="gray">
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
                      {rupiah(total)}
                    </Text>
                  </Box>
                </Flex>
              </Box>
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
              <FormLabel>Deskripsi</FormLabel>
              <Textarea
                placeholder="Hal / Perihal"
                onChange={(event) => setDescription(event.target.value)}
              />
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Bukti Pengajuan</FormLabel>
              <Input
                ref={uploadFileRef}
                type="file"
                onChange={onUploadFile}
                hidden
              />
              {selectedFile ? (
                <Text>{selectedFile.name}</Text>
              ) : (
                <Button
                  isLoading={isLoadingUploadFile}
                  colorScheme="teal"
                  variant="outline"
                  width="100%"
                  onClick={() => uploadFileRef.current.click()}
                >
                  Upload File
                </Button>
              )}
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Harga</FormLabel>
              <NumberInput>
                <NumberInputField
                  placeholder="Rp. xxxx"
                  onChange={(event) => setPrice(event.target.value)}
                />
              </NumberInput>
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Jumlah</FormLabel>
              <NumberInput>
                <NumberInputField
                  placeholder="0"
                  onChange={(event) => setQuantity(event.target.value)}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" colorScheme="gray" mr={3} onClick={onClose}>
              Tutup
            </Button>
            <Button colorScheme="teal" onClick={() => addReimbursementItem()}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
};

export default WithAuth(CreateReimbursementPage);
