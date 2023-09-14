import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Show,
  Text,
  useColorMode,
  useDisclosure
} from "@chakra-ui/react";
import CookieCutter from "cookie-cutter";
import React from "react";
import { FiLogOut, FiMenu, FiMoon, FiSun, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PitukuLogo from "../assets/images/pituku_logo.webp";
import { useUserStore } from "../stores/useUserStore";
import Sidebar from "./Sidebar";

export default function Wrapper(props) {
  const navigate = useNavigate();
  const { role, user } = useUserStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const btnRef = React.useRef();
  const signOut = async () => {
    CookieCutter.set('access_token', '');
    return navigate("/login");
  };

  return (
    <Container
      width="100%"
      maxW={{ sm: "640px", md: "1920px", lg: "1920px", xl: "1920px" }}
      position="relative"
    >
      <Box
        w="100%"
        top={0}
        zIndex="99"
        mb={5}
        bg={colorMode === "light" ? "white" : "gray.800"}
        // shadow="md"
        // rounded="md"
      >
        <Flex p="4">
          <Image objectFit="cover" src={PitukuLogo} alt="Dan Abramov" />

          <Show above="sm" my="auto">
            {/* <Heading size="lg" my="auto" ml="4" color="teal">
              Reimbursement
            </Heading> */}
            <HStack ml="auto" spacing="4">
              <Button
                colorScheme="gray"
                onClick={toggleColorMode}
                borderRadius="full"
              >
                {colorMode === "light" ? (
                  <Icon as={FiSun} />
                ) : (
                  <Icon as={FiMoon} />
                )}
              </Button>
              <Menu direction="ltr">
                <MenuButton>
                  <Flex>
                    <Avatar size="md" name={props.username} src={props.avatar}>
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                    <Box ml={4}>
                      <Text fontSize="lg">{user.fullName}</Text>
                      <Text fontSize="sm">{role}</Text>
                    </Box>
                  </Flex>
                </MenuButton>
                <Portal>
                  <MenuList>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem
                      color="red"
                      _hover={{
                        bg: "red.600",
                        color: "white",
                      }}
                      icon={<Icon as={FiLogOut} />}
                      onClick={() => signOut()}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </HStack>
          </Show>
          <Show below="md" my="auto">
            <Button
              bg="teal.50"
              color="teal.500"
              ml="auto"
              ref={btnRef}
              onClick={onOpen}
            >
              <Icon as={FiMenu} />
            </Button>
          </Show>
        </Flex>
      </Box>
      <Grid
        id="main-grid"
        templateColumns={{
          base: "1fr",
          md: "250px repeat(4, 1fr)",
          lg: "290px repeat(4, 1fr)",
        }}
        gap={4}
      >
        <Show above="md">
          <GridItem rowSpan={2} colSpan={1} w="100%">
            <Box
              py="4"
              // shadow="md"
              // borderWidth="1px"
              minW="300px"
              maxW="350px"
              borderRadius="lg"
              display="unset"
            >
              <Sidebar currentMenu={props.currentMenu} />
            </Box>
          </GridItem>
        </Show>
        {/* content for mobile */}
        <Show below="md" width="100%">
          <GridItem colSpan="2" w="100%">
            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}
              mb="5"
            >
              {props.breadcrumbs.map((item, index) => (
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink
                    isCurrentPage={item.isCurrentPage}
                    href={item.url}
                  >
                    {item.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
            {props.children}
          </GridItem>
        </Show>
        {/* content for desktop */}
        <Show above="md">
          <GridItem colSpan={4} w="100%">
            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}
              mb="5"
            >
              {props.breadcrumbs.map((item, index) => (
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink
                    isCurrentPage={item.isCurrentPage}
                    href={item.url}
                  >
                    {item.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
            {props.children}
          </GridItem>
        </Show>
      </Grid>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu.</DrawerHeader>

          <DrawerBody p="0">
            <Sidebar currentMenu={props.currentMenu} />
          </DrawerBody>

          <DrawerFooter>
            <HStack spacing="2">
              <Button colorScheme="gray" borderRadius="full">
                <Icon as={FiUser} />
              </Button>
              <Button
                colorScheme="gray"
                onClick={toggleColorMode}
                borderRadius="full"
              >
                {colorMode === "light" ? (
                  <Icon as={FiSun} />
                ) : (
                  <Icon as={FiMoon} />
                )}
              </Button>
              <Button colorScheme="red" borderRadius="full">
                <Icon as={FiLogOut} />
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}
