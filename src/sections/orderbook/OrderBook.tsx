import { useState, useEffect, FunctionComponent } from "react"
import { useAppSelector, useAppDispatch } from "../../hooks"
import { getOrderBook, orderBook } from "../../state/orderBookSlice"
import TitleRow from "./TitleRow"
import DepthVisualizer from "./DepthVisualizer"
import PriceLevelRow from "./PriceLevelRow"
import { Container, TableContainer } from "./OrderBookStyle"
import { PriceLevelRowContainer } from "./PriceLevelRowStyle"
import { MOBILE_WIDTH } from "../../constants"
import { Stack } from "../../components"
import Divider from "./Divider"

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

  useEffect(() => {
    setInterval(() => {
      dispatch(getOrderBook())
    }, 1000)
  }, [])

  const buildPriceLevels = (
    levels: number[][],
    orderType: OrderType = OrderType.BIDS,
  ): React.ReactNode => {
    const sortedLevelsByPrice: number[][] = levels
      .slice(0, 12)
      .sort((currentLevel: number[], nextLevel: number[]): number => {
        let result: number = 0
        if (orderType === OrderType.BIDS || windowWidth < MOBILE_WIDTH) {
          result = nextLevel[0] - currentLevel[0]
        } else {
          result = currentLevel[0] - nextLevel[0]
        }
        return result
      })

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
    <Container>
      {book.bids.length && book.asks.length ? (
        <Stack style={{ width: "100%" }}>
          <TableContainer>
            {windowWidth > MOBILE_WIDTH && (
              <TitleRow windowWidth={windowWidth} reversedFieldsOrder={false} />
            )}
            <div>{buildPriceLevels(book.bids, OrderType.BIDS)}</div>
          </TableContainer>
          <Divider />
          {/*<Spread bids={book.bids} asks={book.asks} />*/}
          <TableContainer>
            {/*<TitleRow windowWidth={windowWidth} reversedFieldsOrder={true} />*/}
            <div>{buildPriceLevels(book.asks, OrderType.ASKS)}</div>
          </TableContainer>
        </Stack>
      ) : (
        <div>
          <h1>NO DATA</h1>
        </div>
      )}
    </Container>
  )
}

const formatPrice = (arg: number): string => {
  return arg.toLocaleString("en", {
    useGrouping: true,
    minimumFractionDigits: 2,
  })
}

const formatNumber = (arg: number): string => {
  return new Intl.NumberFormat("en-US").format(arg)
}

export default OrderBook
