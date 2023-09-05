import {
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  useColorMode,
} from "@chakra-ui/react";
import { FiMenu, FiMoon, FiSun, FiUser } from "react-icons/fi";

export default function Navbar(props) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Container minW="80vw" w="100%" mb="5">
        <Flex p="4">
          <Heading size="lg">Pituku - Reimbursement</Heading>
          <Show above="sm">
            <HStack ml="5">
              <Button colorScheme="teal" variant="ghost">
                Pricing
              </Button>
              <Button colorScheme="teal" variant="ghost">
                Features
              </Button>
              <Button colorScheme="teal" variant="ghost">
                Tutorial
              </Button>
              <Button colorScheme="teal" variant="ghost">
                Docs
              </Button>
            </HStack>
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
              <Button colorScheme="gray" borderRadius="full">
                <Icon as={FiUser} />
              </Button>
            </HStack>
          </Show>
          <Show below="md">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                variant="outline"
                icon={<Icon as={FiMenu} />}
                ml="auto"
                textColor="teal.500"
                backgroundColor="teal.50"
              />
              <MenuList>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>Features</MenuItem>
                <MenuItem>Tutorial</MenuItem>
                <MenuItem>Docs</MenuItem>
                <MenuItem
                  icon={<Icon as={colorMode === "light" ? FiMoon : FiSun} />}
                  onClick={toggleColorMode}
                >
                  {colorMode === "light" ? "Dark" : "Light"} Mode
                </MenuItem>
              </MenuList>
            </Menu>
          </Show>
        </Flex>
      </Container>
    </>
  );
}
