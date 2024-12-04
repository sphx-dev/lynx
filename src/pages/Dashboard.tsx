import { Stack } from "../components";
import styled from "styled-components";
import { Sidebar } from "./DashboardSections/Sidebar";
import { Link, useOutlet } from "react-router-dom";
import { Container, RightWrapper, Title } from "./DashboardSections/styled";
import { ROUTES } from "@/routes";

const Dashboard = () => {
  const outlet = useOutlet();
  return (
    <Wrapper>
      <Sidebar />

      <Stack
        fullHeight
        justify="center"
        align="center"
        style={{ minHeight: "calc(100vh - 98px - 25px)" }}
      >
        <RightWrapper>
          <Container>{outlet || <DefaultDashboardContent />}</Container>
          {/* <Container>
            <Funding />
          </Container> */}
        </RightWrapper>
      </Stack>
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: calc(100vh - 28px - 100px);
  gap: 16px;
`;

const DefaultDashboardContent = () => {
  return (
    <>
      <Title>Overview</Title>
      <DefaultContainer>
        <BlockWrapper>
          <SectionBlock to={ROUTES.dashboardFunding}>Funding</SectionBlock>
          <SectionBlock to={ROUTES.dashboardOrders}>Orders</SectionBlock>
        </BlockWrapper>
      </DefaultContainer>
    </>
  );
};

const DefaultContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const BlockWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const SectionBlock = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 18px;
  padding: 16px;
  min-width: 200px;
  background: ${({ theme }) => theme.colors.common.palette.alpha.white5};
  color: ${({ theme }) => theme.colors.common.palette.neutral.n100};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.common.palette.alpha.white10};
  }
  border: 1px solid ${({ theme }) => theme.colors.common.palette.alpha.white10};
`;
