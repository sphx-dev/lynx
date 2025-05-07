import {
  ToastContainer as ToastContainerToastify,
  ToastContentProps,
  toast,
} from "react-toastify";
import "./Toast.css";
import styled, { css } from "styled-components";
import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiCloseLine,
  RiErrorWarningFill,
  RiInformationFill,
  RiLoader4Line,
} from "@remixicon/react";

type Size = "xsmall" | "small" | "large";
type Type = "filled" | "light" | "lighter" | "stroke";

const ToastContainer = () => {
  return (
    <ToastContainerToastify
      autoClose={3000}
      position="top-left"
      hideProgressBar
      newestOnTop
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      closeButton={false}
    />
  );
};

export { ToastContainer };

export const successAlert = (message: string) =>
  toast(MessageContainer, {
    theme: "colored",
    data: {
      body: message,
      size: "xsmall",
      status: "success",
      type: "filled",
    },
  });

export const warningAlert = (message: string) =>
  toast(MessageContainer, {
    theme: "colored",
    data: {
      body: message,
      size: "xsmall",
      status: "warning",
      type: "filled",
    },
  });

export const errorAlert = (message: string) =>
  toast(MessageContainer, {
    theme: "colored",
    data: {
      body: message,
      size: "xsmall",
      status: "error",
      type: "filled",
    },
  });

export const infoAlert = (message: string) =>
  toast(MessageContainer, {
    theme: "colored",
    data: {
      body: message,
      size: "xsmall",
      status: "info",
      type: "filled",
    },
  });

export const promiseAlert = (
  promise: Promise<any>,
  options: { pending: string; success: string; error: string }
) => {
  console.log("OPTIONS", options);
  return toast.promise(promise, {
    pending: {
      render: props => (
        <MessageContainer
          {...props}
          // @ts-ignore
          closeToast
          data={{
            body: options.pending,
            status: "loading",
            size: "xsmall",
            type: "filled",
          }}
        ></MessageContainer>
      ),
      icon: false,
    },
    success: {
      render: props => (
        <MessageContainer
          {...props}
          data={{
            body: options.success,
            status: "success",
            size: "xsmall",
            type: "filled",
          }}
        ></MessageContainer>
      ),
      icon: false,
    },
    error: {
      render: props => {
        console.log("ERROR", props);
        return (
          <MessageContainer
            {...props}
            data={{
              body: options.error,
              status: "error",
              size: "xsmall",
              type: "filled",
            }}
          ></MessageContainer>
        );
      },
      icon: false,
    },
  });
};

const xsmallIconStyle = { width: "18px", height: "18px" };
const defaultIconStyle = { width: "20px", height: "20px" };

type ToastData = {
  title?: string;
  body: string;
  status?: string;
  size?: Size;
  type?: Type;
};

const MessageContainer = (props: ToastContentProps<ToastData>) => {
  const { closeToast, data /*, isPaused, toastProps*/ } = props;
  const title = data?.title;
  const body = data?.body;
  const status = data?.status || "default";
  const size = data?.size || "xsmall";
  const type = data?.type || "filled";

  return (
    <Message
      status={status}
      size={size}
      title={title}
      body={body}
      type={type}
      onClose={closeToast}
    />
  );
};

export const Message = ({
  status = "default",
  size = "xsmall",
  title,
  body,
  type = "filled",
  onClose,
}: {
  status: string;
  size: Size;
  title?: string;
  body: string;
  type?: Type;
  onClose?: () => void;
}) => {
  return (
    <Wrapper $status={status} $size={size} data-size={size} $type={type}>
      {status === "loading" && (
        <div
          style={{
            ...(size === "xsmall" ? xsmallIconStyle : defaultIconStyle),
            position: "relative",
          }}
        >
          <RiLoader4Line
            style={{
              ...(size === "xsmall" ? xsmallIconStyle : defaultIconStyle),
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className="spin"
          />
        </div>
      )}
      {status === "success" && (
        <RiCheckboxCircleFill
          style={size === "xsmall" ? xsmallIconStyle : defaultIconStyle}
        />
      )}
      {status === "error" && (
        <RiErrorWarningFill
          style={size === "xsmall" ? xsmallIconStyle : defaultIconStyle}
        />
      )}
      {status === "warning" && (
        <RiAlertFill
          style={size === "xsmall" ? xsmallIconStyle : defaultIconStyle}
        />
      )}
      {status === "info" && (
        <RiInformationFill
          style={size === "xsmall" ? xsmallIconStyle : defaultIconStyle}
        />
      )}
      <MainBlock $size={size}>
        {title && size === "large" && <Title $status={status}>{title}</Title>}
        <Text>{body}</Text>
      </MainBlock>
      {onClose && typeof onClose === "function" && (
        <CloseButton onClick={onClose}>
          <RiCloseLine
            style={
              size === "xsmall"
                ? { width: "16px", height: "16px" }
                : { width: "18px", height: "18px" }
            }
          />
        </CloseButton>
      )}
    </Wrapper>
  );
};

// SIZE
const xsmallCss = css`
  font-family: var(--text-x-small-font-family);
  font-size: var(--text-x-small-font-size);
  font-weight: var(--text-x-small-font-weight);
  line-height: var(--text-x-small-line-height);
  padding: 8px 8px;
  align-items: center;
`;

const smallCss = css`
  font-family: var(--text-small-font-family);
  font-size: var(--text-small-font-size);
  font-weight: var(--text-small-font-weight);
  line-height: var(--text-small-line-height);
  padding: 8px 8px 10px 8px;
  align-items: center;
`;

const largeCss = css`
  font-family: var(--text-small-font-family);
  font-size: var(--text-small-font-size);
  font-weight: var(--text-small-font-weight);
  line-height: var(--text-small-line-height);
  padding: 14px 14px 16px 14px;
  align-items: start;
`;

// STATUS
const successBackground = css`
  background-color: var(--success-base);
  color: var(--text-strong-950);
  font-weight: 400;
`;
const successTitle = css`
  color: var(--text-strong-950);
`;

const warningBackground = css`
  background-color: var(--warning-base);
  color: var(--text-strong-950);
  font-weight: 400;
`;

const warningTitle = css`
  color: var(--text-strong-950);
`;

const errorBackground = css`
  background-color: var(--error-base);
  color: var(--text-strong-950);
  font-weight: 400;
`;

const errorTitle = css`
  color: var(--text-strong-950);
`;

const infoBackground = css`
  background-color: var(--information-base);
  color: black;
  font-weight: 400;
`;

const infoTitle = css`
  color: black;
`;

const defaultBackground = css`
  background-color: var(--faded-base);
  color: var(--text-strong-950);
  font-weight: 400;
`;

const defaultTitle = css`
  color: var(--text-strong-950);
`;

const Wrapper = styled.div<{ $status: string; $size: Size; $type: Type }>`
  ${({ $size }) => $size === "xsmall" && `${xsmallCss}`}
  ${({ $size }) => $size === "small" && `${smallCss}`}
  ${({ $size }) => $size === "large" && `${largeCss}`}

  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 8px;
  gap: 8px;

  transition: all 0.5s ease-in-out;

  ${({ $status }) => $status === "success" && successBackground}

  ${({ $status }) => $status === "warning" && warningBackground}

  ${({ $status }) => $status === "error" && errorBackground}

  ${({ $status }) => $status === "info" && infoBackground}

  ${({ $status }) =>
    ($status === "default" || $status === "loading") && defaultBackground}
`;

const mainBlockLargeCss = css`
  flex-direction: column;
  align-items: flex-start;
`;

const MainBlock = styled.div<{ $size: Size }>`
  flex: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  ${({ $size }) =>
    $size === "large" &&
    `
      ${mainBlockLargeCss}
    `}
`;

const Title = styled.h3<{ $status: string }>`
  font-family: var(--text-small-font-family);
  font-size: var(--text-small-font-size);
  font-weight: var(--text-small-font-weight);
  line-height: var(--text-small-line-height);
  margin: 0;
  padding: 0;

  ${({ $status }) => $status === "success" && successTitle}
  ${({ $status }) => $status === "warning" && warningTitle}
  ${({ $status }) => $status === "error" && errorTitle}
  ${({ $status }) => $status === "info" && infoTitle}
  ${({ $status }) => $status === "default" && defaultTitle}
  ${({ $status }) => $status === "loading" && defaultTitle}
`;

const Text = styled.span`
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 8px;
  margin-left: auto;
`;
