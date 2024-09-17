import React, { useState, useRef, ReactNode, useEffect } from "react";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";
import styled from "styled-components";
import { getThemeColors } from "../../../theme";
import useClickOutside from "../../../hooks/useClickOutside";

interface CustomPopoverProps {
  children: ReactNode;
  content: ((fn: Function) => ReactNode) | ReactNode;
  placement?: Placement;
}

const Content = styled.div`
  background-color: ${({ theme }) => getThemeColors(theme).background.dropdown};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 20px 0;
`;

const Trigger = styled.button`
  background: none;
  border: none;
  outline: none;
  display: block;
  width: 100%;
`;

const Popup: React.FC<CustomPopoverProps> = ({
  children,
  content,
  placement = "bottom",
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
  });
  const popperRef = useRef(popperElement);
  const referenceRef = useRef(referenceElement);

  useEffect(() => {
    popperRef.current = popperElement;
  }, [popperElement]);

  useEffect(() => {
    referenceRef.current = referenceElement;
  }, [referenceElement]);

  const handleTogglePopover = () => {
    setShowPopover(!showPopover);
  };

  const closePopover = () => setShowPopover(false);

  useClickOutside([popperRef, referenceRef], handleTogglePopover);

  return (
    <div>
      {/*@ts-ignore*/}
      <Trigger ref={setReferenceElement} onClick={handleTogglePopover}>
        {children}
      </Trigger>
      {showPopover && (
        <div
          // @ts-ignore
          ref={setPopperElement}
          style={{ ...styles.popper, zIndex: "100", marginTop: "5px" }}
          {...attributes.popper}
        >
          <Content>
            {content instanceof Function ? content(closePopover) : content}
          </Content>
        </div>
      )}
    </div>
  );
};

export default Popup;
