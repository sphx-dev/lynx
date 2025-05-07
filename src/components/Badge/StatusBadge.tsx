import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiForbidFill,
} from "@remixicon/react";
import styled, { css } from "styled-components";

type Status = "completed" | "pending" | "failed" | "disabled";
type Style = "stroke" | "light";

const completedStyle = css`
  --icon-color: var(--verified-base);

  --stroke-text-color: var(--text-sub-600);
  --stroke-bg-color: var(--bg-strong-950);
  --stroke-border-color: var(--stroke-soft-200);

  --light-text-color: var(--verified-base);
  --light-bg-color: var(--verified-lighter);
  --light-border-color: var(--verified-lighter);
`;

const warningStyle = css`
  --icon-color: var(--warning-base);

  --stroke-text-color: var(--text-sub-600);
  --stroke-bg-color: var(--bg-strong-950);
  --stroke-border-color: var(--stroke-soft-200);

  --light-text-color: var(--warning-base);
  --light-bg-color: var(--warning-lighter);
  --light-border-color: var(--warning-lighter);
`;

const errorStyle = css`
  --icon-color: var(--error-base);

  --stroke-text-color: var(--text-sub-600);
  --stroke-bg-color: var(--bg-strong-950);
  --stroke-border-color: var(--stroke-soft-200);

  --light-text-color: var(--error-base);
  --light-bg-color: var(--error-lighter);
  --light-border-color: var(--error-lighter);
`;

const disabledStyle = css`
  --icon-color: var(--faded-base);

  --stroke-text-color: var(--text-sub-600);
  --stroke-bg-color: var(--bg-strong-950);
  --stroke-border-color: var(--stroke-soft-200);

  --light-text-color: var(--faded-base);
  --light-bg-color: var(--faded-lighter);
  --light-border-color: var(--faded-lighter);
`;

export const StatusBadge = ({
  status,
  styleType,
  dot,
  children,
}: {
  status: Status;
  styleType: Style;
  dot?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <StatusWrapper $style={styleType} $status={status}>
      {dot && <Dot $status={status} />}
      {!dot && status === "completed" && (
        <RiCheckboxCircleFill style={{ width: "16px", height: "16px" }} />
      )}
      {!dot && status === "pending" && (
        <RiAlertFill style={{ width: "16px", height: "16px" }} />
      )}
      {!dot && status === "failed" && (
        <RiErrorWarningFill style={{ width: "16px", height: "16px" }} />
      )}
      {!dot && status === "disabled" && (
        <RiForbidFill style={{ width: "16px", height: "16px" }} />
      )}
      {children}
    </StatusWrapper>
  );
};

const StatusWrapper = styled.div<{
  $status: Status;
  $style: Style;
}>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  font-family: var(--text-x-small-font-family);
  font-size: var(--text-x-small-font-size);
  font-weight: var(--text-x-small-font-weight);
  line-height: var(--text-x-small-line-height);

  ${({ $status }) => $status === "completed" && completedStyle}
  ${({ $status }) => $status === "pending" && warningStyle}
  ${({ $status }) => $status === "failed" && errorStyle}
  ${({ $status }) => $status === "disabled" && disabledStyle}

  outline-width: 1px;
  outline-style: solid;
  border-radius: 6px;

  outline-color: ${({ $style }) =>
    $style === "stroke"
      ? "var(--stroke-border-color)"
      : "var(--light-border-color)"};

  background-color: ${({ $style }) =>
    $style === "stroke" ? "var(--stroke-bg-color)" : "var(--light-bg-color)"};

  color: ${({ $style }) =>
    $style === "stroke"
      ? "var(--stroke-text-color)"
      : "var(--light-text-color)"};
`;

const Dot = styled.span<{
  $status: Status;
}>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  ${({ $status }) => $status === "completed" && completedStyle}
  ${({ $status }) => $status === "pending" && warningStyle}
  ${({ $status }) => $status === "failed" && errorStyle}
  ${({ $status }) => $status === "disabled" && disabledStyle}
  background-color: var(--icon-color);
`;
