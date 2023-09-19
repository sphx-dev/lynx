import { useState, FunctionComponent } from "react"
import { useAppSelector, useAppDispatch } from "../hooks"
import { getOrderBook, orderBook } from "./orderBookSlice"
import DepthVisualizer from "./DepthVisualizer"
import PriceLevelRow from "./PriceLevelRow"
import styles from "../features-old/counter/Counter.module.css"
import { PriceLevelRowContainer } from "./PriceLevelRowStyle"
import { MOBILE_WIDTH } from "../constants"

export enum OrderType {
  BIDS,
  ASKS,
}

interface OrderBookProps {
  windowWidth: number
}

const OrderBook: FunctionComponent<OrderBookProps> = ({ windowWidth }) => {
  const book = useAppSelector(orderBook)
  const dispatch = useAppDispatch()
  const [orderbook, setOrderBook] = useState([])

  console.log(book)

  const buildPriceLevels = (
    levels: number[][],
    orderType: OrderType = OrderType.BIDS,
  ): React.ReactNode => {
    const sortedLevelsByPrice: number[][] = [...levels].sort(
      (currentLevel: number[], nextLevel: number[]): number => {
        let result: number = 0
        if (orderType === OrderType.BIDS || windowWidth < MOBILE_WIDTH) {
          result = nextLevel[0] - currentLevel[0]
        } else {
          result = currentLevel[0] - nextLevel[0]
        }
        return result
      },
    )

    return sortedLevelsByPrice.map((level, idx) => {
      const calculatedTotal: number = level[2]
      const total: string = formatNumber(calculatedTotal)
      const depth = level[3]
      const size: string = formatNumber(level[1])
      const price: string = formatPrice(level[0])

      return (
        <PriceLevelRowContainer key={idx + depth}>
          <DepthVisualizer
            key={depth}
            windowWidth={windowWidth}
            depth={depth}
            orderType={orderType}
          />
          <PriceLevelRow
            key={size + total}
            total={total}
            size={size}
            price={price}
            reversedFieldsOrder={orderType === OrderType.ASKS}
            windowWidth={windowWidth}
          />
        </PriceLevelRowContainer>
      )
    })
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <div className={styles.row}>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(getOrderBook())}
        >
          Fetch order book
        </button>
      </div>
    </div>
  )
}

export default OrderBook
