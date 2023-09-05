import Wrapper from "../components/Wrapper";

export default function SettingPage(props) {
  return (
    <Wrapper
      currentMenu="settings"
      breadcrumbs={[
        {
          title: "Settings",
          url: "#",
          isCurrentPage: true,
        },
      ]}
    ></Wrapper>
  );
}
