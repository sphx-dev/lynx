import React, { PropsWithChildren } from "react";
import { Stack, Icon, Text } from "../../components";
import Common from "../../theme/colors/common";

const PlaceHolder = ({ children, ...props }: PropsWithChildren) => {
  return (
    <Stack fullHeight align="center" justify="center" {...props}>
      <Icon icon="SearchOrderIcon" size="extraLarge" color={Common.tertiary} />
      <Text align="center" color="tertiary">
        {children}
      </Text>
    </Stack>
  );
};

export default PlaceHolder;
