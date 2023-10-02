import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import ListReimbursementHistoryPage from "./pages/ reimbursement-history/ListReimbursementHistoryPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ListReimbursementApprovalPage from "./pages/reimbursement-approval/ListReimbursementApprovalPage";
import CreateReimbursementPage from "./pages/reimbursement/CreateReimbursementPage";
import DetailReimbursementPage from "./pages/reimbursement/DetailReimbursementPage";
import ListReimbursementPage from "./pages/reimbursement/ListReimbursementPage";
import ProfilePage from "./pages/settings/ProfilePage";
import theme from './theme';
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/reimbursement" element={<ListReimbursementPage />} />
        <Route path="/reimbursement/d/:id" element={<DetailReimbursementPage />} />
        <Route path="/reimbursement/create" element={<CreateReimbursementPage />} />
        <Route path="/reimbursement-history" element={<ListReimbursementHistoryPage />} />
        <Route path="/reimbursement-approval" element={<ListReimbursementApprovalPage />} />
        <Route path="/settings/profile" element={<ProfilePage />} />
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
