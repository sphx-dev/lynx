// TODO: move to i18n
export const MESSAGE = {
  required: "Required field",
  number: "Should be a number",
  lessThan: "Should be less than mark price",
  moreThan: "Should be more than mark price",
  moreThanMin: (min: string | number) => `Size should be greater than ${min}`,
  lessThanPositionSize: (positionSize: string | number) =>
    `Size should be less than available in position (${positionSize})`,
};
