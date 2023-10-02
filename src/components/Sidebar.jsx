import { Box, Flex, Icon, Text, useColorMode } from "@chakra-ui/react";
import {
  FiActivity,
  FiLayout,
  FiSettings
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { headDivisionList } from "../utils/roles";
import { useAppStore } from "../stores/useAppStore";

export default function Sidebar(props) {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { role } = useUserStore();
  const { currentMenu, setCurrentMenu } = useAppStore();

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
            currentMenu === "dashboard"
              ? colorMode === "light"
                ? "teal.50"
                : "teal.900"
              : ""
          }
          _hover={{ bg: colorMode === "light" ? "teal.50" : "teal.900" }}
          onClick={() => {
            setCurrentMenu("dashboard");
            navigate("/");
          }}
        >
          <Flex>
            <Icon as={FiActivity} mt="2px" mr="3" w="18px" h="18px" />
            <Text
              fontSize="md"
              fontWeight={currentMenu === "dashboard" ? "bold" : "medium"}
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
            currentMenu === "reimbursement"
              ? colorMode === "light"
                ? "teal.50"
                : "teal.900"
              : ""
          }
          _hover={{ bg: colorMode === "light" ? "teal.50" : "teal.900" }}
          onClick={() => {
            setCurrentMenu("reimbursement");
            navigate("/reimbursement");
          }}
        >
          <Flex>
            <Icon as={FiLayout} mt="2px" mr="3" w="18px" h="18px" />
            <Text
              fontSize="md"
              fontWeight={
                currentMenu === "reimbursement" ? "bold" : "medium"
              }
            >
              Pengajuan Saya
            </Text>
          </Flex>
        </Box>
        {headDivisionList.includes(role) || role === "Finance Staff" ? (
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
              currentMenu === "reimbursement-approval"
                ? colorMode === "light"
                  ? "teal.50"
                  : "teal.900"
                : ""
            }
            _hover={{ bg: colorMode === "light" ? "teal.50" : "teal.900" }}
            onClick={() => {
              setCurrentMenu('reimbursement-approval');
              navigate("/reimbursement-approval");
            }}
          >
            <Flex>
              <Icon as={FiLayout} mt="2px" mr="3" w="18px" h="18px" />
              <Text
                fontSize="md"
                fontWeight={
                  currentMenu === "reimbursement-approval"
                    ? "bold"
                    : "medium"
                }
              >
                {role === "Finance Staff" ? "Bukti Pembayaran" : "Approval Pengajuan"}
              </Text>
            </Flex>
          </Box>
        ) : null}
        {headDivisionList.includes(role) ? (
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
              currentMenu === "reimbursement-history"
                ? colorMode === "light"
                  ? "teal.50"
                  : "teal.900"
                : ""
            }
            _hover={{ bg: colorMode === "light" ? "teal.50" : "teal.900" }}
            onClick={() => {
              setCurrentMenu('reimbursement-history');
              navigate("/reimbursement-history");
            }}
          >
            <Flex>
              <Icon as={FiLayout} mt="2px" mr="3" w="18px" h="18px" />
              <Text
                fontSize="md"
                fontWeight={
                  currentMenu === "reimbursement-history"
                    ? "bold"
                    : "medium"
                }
              >
                Riwayat Pengajuan
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
          color={colorMode === "light" ? "orange.500" : "orange.200"}
          textAlign="start"
          alignItems="baseline"
          bg={
            currentMenu === "settings"
              ? colorMode === "light"
                ? "orange.50"
                : "orange.900"
              : ""
          }
          _hover={{ bg: colorMode === "light" ? "orange.50" : "orange.900" }}
          onClick={() => {
            setCurrentMenu('settings');
            navigate("/settings/profile");
          }}
        >
          <Flex>
            <Icon as={FiSettings} mt="2px" mr="3" w="18px" h="18px" />
            <Text
              fontSize="md"
              fontWeight={currentMenu === "settings" ? "bold" : "medium"}
            >
              Pengaturan
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
