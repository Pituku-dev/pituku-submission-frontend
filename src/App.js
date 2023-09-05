import { Route, Routes } from "react-router";
import DashboardPage from "./pages/DashboardPage";
import { ChakraProvider } from "@chakra-ui/react";
import theme from './theme';
import ListReimbursementHistoryPage from "./pages/ reimbursement-history/ListReimbursementHistoryPage";
import SettingPage from "./pages/SettingPage";
import ListReimbursementApprovalPage from "./pages/reimbursement-approval/ListReimbursementApprovalPage";
import LoginPage from "./pages/LoginPage";
import CreateReimbursementPage from "./pages/reimbursement/CreateReimbursementPage";
import ListReimbursementPage from "./pages/reimbursement/ListReimbursementPage";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reimbursement" element={<ListReimbursementPage />} />
        <Route path="/reimbursement/create" element={<CreateReimbursementPage />} />
        <Route path="/reimbursement-history" element={<ListReimbursementHistoryPage />} />
        <Route path="/reimbursement-approval" element={<ListReimbursementApprovalPage />} />
        <Route path="/settings  " element={<SettingPage />} />
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
