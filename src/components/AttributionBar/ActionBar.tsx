// Import React and styled-components
import React from "react";
import styled from "styled-components";
// import heart from "../../assets/icons/heart.svg";
import graph from "../../assets/icons/graph.svg";
import settings from "../../assets/icons/setting.svg";
import Group from "../Group";
import { useTranslation } from "react-i18next";

// Define styled components for the action bar and icons
export const ActionBarContainer = styled(Group)`
  --height: 52px;
  border-radius: calc(var(--height) / 2); /* Rounded corners */
  padding: 0 24px; /* Spacing around the icons */
  background: linear-gradient(#0a2839, #0a2839) padding-box,
    linear-gradient(to bottom, #071c27, #2f4655) border-box;
  border: 2px solid transparent;
  color: #416075;
  font-size: 10px;
  font-weight: 600;
  height: var(--height);
  justify-content: space-around;
`;
const Divider = styled.div`
  border-left: 1px solid #071c27;
  height: 100%;
  box-shadow: 1px 0px 0px 0px rgba(13, 47, 69, 0.99);
`;
const Icon = styled.img`
  width: 16px; /* Icon size */
  height: 16px;
  margin: 0 10px; /* Spacing between icons */
  &:hover {
    opacity: 0.7; /* Slight transparency on hover */
  }
`;
const Button = styled.div`
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 45px;
`;
// The React component that uses the styled components
const ActionBar = () => {
  const { t } = useTranslation();
  return (
    <ActionBarContainer spacing={10}>
      {/* You can replace these with the actual icons you need */}
      <Button>
        {t("makeWithHonor")}
        {/* <Icon src={heart} alt="Heart Icon" /> */}
      </Button>
      <Divider />
      <Button>
        <Icon src={graph} alt="Message Icon" />
      </Button>
      <Divider />
      <Button>
        <Icon src={settings} alt="Settings Icon" />
      </Button>
    </ActionBarContainer>
  );
};

export default ActionBar;
