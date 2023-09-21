import { Box, Flex, Icon, Text, useColorMode } from "@chakra-ui/react";
import {
  FiActivity,
  FiLayout,
  FiSettings
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { headDivisionList } from "../utils/roles";

export default function Sidebar(props) {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { role } = useUserStore();

  return (
    <Box position="relative" display="unset">
      <Box
        position="sticky"
        w="100%"
        maxW="350px"
        top="30px"
        shadow="xl"
        borderRadius="12"
        height="85vh"
      >
        <Box
          as="button"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          px="5"
          py="3"
          width="100%"
          color={colorMode === "light" ? "teal.500" : "teal.200"}
          textAlign="start"
          alignItems="baseline"
          bg={
            props.currentMenu === "dashboard"
              ? colorMode === "light"
                ? "teal.50"
                : "teal.900"
              : ""
          }
          _hover={{ bg: colorMode === "light" ? "teal.50" : "teal.900" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <Flex>
            <Icon as={FiActivity} mt="2px" mr="3" w="18px" h="18px" />
            <Text
              fontSize="md"
              fontWeight={props.currentMenu === "dashboard" ? "bold" : "medium"}
            >
              Dashboard
            </Text>
          </Flex>
        </Box>
        <Box
          as="button"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          px="5"
          py="3"
          width="100%"
          color={colorMode === "light" ? "teal.500" : "teal.200"}
          textAlign="start"
          alignItems="baseline"
          bg={
            props.currentMenu === "reimbursement"
              ? colorMode === "light"
                ? "teal.50"
                : "teal.900"
              : ""
          }
          _hover={{ bg: colorMode === "light" ? "teal.50" : "teal.900" }}
          onClick={() => {
            navigate("/reimbursement");
          }}
        >
          <Flex>
            <Icon as={FiLayout} mt="2px" mr="3" w="18px" h="18px" />
            <Text
              fontSize="md"
              fontWeight={
                props.currentMenu === "reimbursement" ? "bold" : "medium"
              }
            >
              Pengajuan Saya
            </Text>
          </Flex>
        </Box>
        {headDivisionList.includes(role) || role === 'Finance Staff' ? (
          <Box
            as="button"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            px="5"
            py="3"
            width="100%"
            color={colorMode === "light" ? "teal.500" : "teal.200"}
            textAlign="start"
            alignItems="baseline"
            bg={
              props.currentMenu === "reimbursement-approval"
                ? colorMode === "light"
                  ? "teal.50"
                  : "teal.900"
                : ""
            }
            _hover={{ bg: colorMode === "light" ? "teal.50" : "teal.900" }}
            onClick={() => {
              navigate("/reimbursement-approval");
            }}
          >
            <Flex>
              <Icon as={FiLayout} mt="2px" mr="3" w="18px" h="18px" />
              <Text
                fontSize="md"
                fontWeight={
                  props.currentMenu === "reimbursement-approval"
                    ? "bold"
                    : "medium"
                }
              >
                Approval Pengajuan
              </Text>
            </Flex>
          </Box>
        ) : null}
        <Box
          as="button"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          px="5"
          py="3"
          width="100%"
          color={colorMode === "light" ? "teal.500" : "teal.200"}
          textAlign="start"
          alignItems="baseline"
          bg={
            props.currentMenu === "reimbursement-history"
              ? colorMode === "light"
                ? "teal.50"
                : "teal.900"
              : ""
          }
          _hover={{ bg: colorMode === "light" ? "teal.50" : "teal.900" }}
          onClick={() => {
            navigate("/reimbursement-history");
          }}
        >
          <Flex>
            <Icon as={FiLayout} mt="2px" mr="3" w="18px" h="18px" />
            <Text
              fontSize="md"
              fontWeight={
                props.currentMenu === "reimbursement-history"
                  ? "bold"
                  : "medium"
              }
            >
              Riwayat Pengajuan
            </Text>
          </Flex>
        </Box>
        <Box
          as="button"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          px="5"
          py="3"
          width="100%"
          color={colorMode === "light" ? "orange.500" : "orange.200"}
          textAlign="start"
          alignItems="baseline"
          bg={
            props.currentMenu === "settings"
              ? colorMode === "light"
                ? "orange.50"
                : "orange.900"
              : ""
          }
          _hover={{ bg: colorMode === "light" ? "orange.50" : "orange.900" }}
          onClick={() => {
            navigate("/settings/profile");
          }}
        >
          <Flex>
            <Icon as={FiSettings} mt="2px" mr="3" w="18px" h="18px" />
            <Text
              fontSize="md"
              fontWeight={props.currentMenu === "settings" ? "bold" : "medium"}
            >
              Pengaturan
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
