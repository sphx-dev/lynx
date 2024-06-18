import {
  addDepths,
  addTotalSums,
  asksToState,
  getPercentage,
  getSpread,
  orderToState,
} from "./helpers";
import {
  ASKS,
  BIDS,
  mockOrderBookWithDecimalsPrice,
  mockOrderBookWithIntPrice,
  ORDERS,
  ORDERS_WITH_DEPTH,
  ORDERS_WITH_TOTAL,
  PERCENTAGE_FOR_DECIMALS,
  PERCENTAGE_FOR_INTEGERS,
  SPREAD_FOR_DECIMALS,
  SPREAD_FOR_INTEGERS,
  STATE_ASKS,
  STATE_BIDS,
} from "./mocks";

describe("Order book helpers", () => {
  describe("getSpread", () => {
    it("Should return correct spread for integer price", () => {
      expect(
        getSpread(
          mockOrderBookWithIntPrice.bids,
          mockOrderBookWithIntPrice.asks
        )
      ).toBe(SPREAD_FOR_INTEGERS);
    });
    it("Should return correct spread for decimal price", () => {
      expect(
        getSpread(
          mockOrderBookWithDecimalsPrice.bids,
          mockOrderBookWithDecimalsPrice.asks
        )
      ).toBe(SPREAD_FOR_DECIMALS);
    });
  });

  describe("getPercentage", () => {
    it("Should return correct spread for integer price", () => {
      const spread = getSpread(
        mockOrderBookWithIntPrice.bids,
        mockOrderBookWithIntPrice.asks
      );
      expect(
        getPercentage(
          mockOrderBookWithIntPrice.bids,
          mockOrderBookWithIntPrice.asks,
          spread
        )
      ).toBe(PERCENTAGE_FOR_INTEGERS);
    });
    it("Should return correct spread for decimal price", () => {
      const spread = getSpread(
        mockOrderBookWithDecimalsPrice.bids,
        mockOrderBookWithDecimalsPrice.asks
      );
      expect(
        getPercentage(
          mockOrderBookWithDecimalsPrice.bids,
          mockOrderBookWithDecimalsPrice.asks,
          spread
        )
      ).toBe(PERCENTAGE_FOR_DECIMALS);
    });
  });

  describe("addTotalSums", () => {
    it("Should add correct sums", () => {
      expect(addTotalSums(ORDERS)).toEqual(ORDERS_WITH_TOTAL);
    });
  });

  describe("addDepth", () => {
    it("Should add correct depth", () => {
      expect(addDepths(ORDERS_WITH_TOTAL)).toEqual(ORDERS_WITH_DEPTH);
    });
  });

  describe("orderToState", () => {
    it("Should correctly format bids response to state", () => {
      expect(orderToState(BIDS)).toEqual(STATE_BIDS);
    });
  });

  describe("aksToState", () => {
    it("Should correctly format asks response to state", () => {
      expect(asksToState(ASKS)).toEqual(STATE_ASKS);
    });
  });
});
