import { Slider } from "radix-ui";
import "./SizeSlider.css";
import sliderPyramid from "@/assets/icons/slider-pyramid.svg";
import styled from "styled-components";
import { useState } from "react";

export const SizeSlider = ({
  onChange,
  disabled,
  defaultValue = 0,
}: {
  onChange: (value: number) => void;
  disabled?: boolean;
  defaultValue?: number;
}) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <>
      <Slider.Root
        disabled={disabled}
        className="SliderRoot"
        max={100}
        step={1}
        defaultValue={[defaultValue]}
        aria-label="Size"
        onChange={(ev) => {
          setValue(Number((ev.target as HTMLInputElement).value) || 0);
          onChange(Number((ev.target as HTMLInputElement).value) || 0);
        }}
      >
        <Slider.Track className="SliderTrack">
          <Slider.Range className="SliderRange" />
        </Slider.Track>
        <span
          className={"point" + (value >= 25 ? " active" : "")}
          style={{ left: "25%" }}
        ></span>
        <span
          className={"point" + (value >= 50 ? " active" : "")}
          style={{ left: "50%" }}
        ></span>
        <span
          className={"point" + (value >= 75 ? " active" : "")}
          style={{ left: "75%" }}
        ></span>
        <Slider.Thumb className="SliderThumb">
          <div className="tooltip">{value}%</div>
          <ThumbIcon src={sliderPyramid} />
        </Slider.Thumb>
      </Slider.Root>
    </>
  );
};

const ThumbIcon = styled.img`
  width: 14px;
  height: 14px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
