import styled from "styled-components";
import { Text } from "../../components";
import { formatNumber } from "../../utils/format";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border: 1px solid var(--border-default);
  border-radius: var(--border-radius-md);
  padding: 5px 10px;
`;

const Divider = ({
  spread,
  percentage,
}: {
  spread: number;
  percentage: number;
}) => {
  // const { spread, percentage } = useAppSelector(orderBook);
  return (
    <Container>
      <Text variant="textNumMdBold" color="secondaryActive">
        {formatNumber({ value: spread, before: "$" })}
      </Text>
      <Text variant="textNumMdBold" color="secondaryActive">
        {formatNumber({ value: percentage, after: "%" })}
      </Text>
    </Container>
  );
};

export default Divider;
