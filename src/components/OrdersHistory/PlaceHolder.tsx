import React, { PropsWithChildren } from "react";
import Stack from "../Stack";
import Icon from "../Icon";
import Common from "../../theme/colors/common";
import Text from "../Text";

const PlaceHolder = ({ children }: PropsWithChildren) => {
  return (
    <Stack fullHeight align="center" justify="center">
      <Icon icon="SearchOrderIcon" size="extraLarge" color={Common.tertiary} />
      <Text align="center" color="tertiary">
        {children}
      </Text>
    </Stack>
  );
};

export default PlaceHolder;
