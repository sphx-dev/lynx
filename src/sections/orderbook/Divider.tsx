import styled from "styled-components";
import { Text } from "../../components";
import { formatNumber } from "../../utils/format";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  padding: 5px 0px;
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
      <Text variant="textMedium" color="">
        {formatNumber({ value: spread })}
      </Text>
      <Text variant="textMedium" color="">
        {formatNumber({ value: percentage, after: "%" })}
      </Text>
    </Container>
  );
};

export default Divider;
