import Wrapper from "../components/Wrapper";

export default function DashboardPage(props) {
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
