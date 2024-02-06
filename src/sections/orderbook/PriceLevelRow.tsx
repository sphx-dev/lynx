import React, { FunctionComponent } from "react"
import { PriceLevelContainer } from "./PriceLevelRowStyle"
import { MOBILE_WIDTH } from "../../constants"

interface PriceLevelRowProps {
  total: string
  size: string
  price: string
  reversedFieldsOrder: boolean
  windowWidth: number
}

const PriceLevelRow: FunctionComponent<PriceLevelRowProps> = ({
  total,
  size,
  price,
  reversedFieldsOrder = false,
  windowWidth,
}) => {
  return (
    <PriceLevelContainer
      data-testid="price-level-row"
      $isRight={!reversedFieldsOrder}
      $windowWidth={windowWidth}
    >
      {reversedFieldsOrder || windowWidth < MOBILE_WIDTH ? (
        <>
          <span className="price">{price}</span>
          <span>{size}</span>
          {/* <span>{total}</span> */}
        </>
      ) : (
        <>
          {/* <span>{total}</span> */}
          <span>{size}</span>
          <span className="price">{price}</span>
        </>
      )}
    </PriceLevelContainer>
  )
}

export default PriceLevelRow
