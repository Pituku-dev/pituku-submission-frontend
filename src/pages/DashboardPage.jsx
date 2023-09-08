import WithAuth from "../components/WithAuth";
import Wrapper from "../components/Wrapper";

const DashboardPage = (props) => {
  return (
    <Wrapper currentMenu="dashboard" breadcrumbs={[
      {
        title: 'Dashboard',
        url: '#',
        isCurrentPage: true
      }
    ]}>
      
    </Wrapper>
  );
}

export default WithAuth(DashboardPage);