import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../hooks"
import { getOrderBook, orderBook } from "./orderBookSlice"
import styles from "../features-old/counter/Counter.module.css"

export default function OrderBook() {
  const book = useAppSelector(orderBook)
  const dispatch = useAppDispatch()
  const [orderbook, setOrderBook] = useState([])

  console.log(book)

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
