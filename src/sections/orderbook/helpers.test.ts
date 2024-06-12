import { getPercentage, getSpread } from "./helpers";

const mockOrderBookWithIntPrice = {
  asks: [
    {
      quantity: 527262,
      price: 91,
      leverage: 0,
      totalSum: 527262,
      depth: 5.293079870933105,
    },
  ],
  bids: [
    {
      quantity: 79,
      price: 81,
      leverage: 0,
      totalSum: 79,
      depth: 0.0009724814822291935,
    },
  ],
};

const mockOrderBookWithDecimalsPrice = {
  asks: [
    {
      quantity: 527262,
      price: 0.000005,
      leverage: 0,
      totalSum: 527262,
      depth: 5.293079870933105,
    },
  ],
  bids: [
    {
      quantity: 79,
      price: 0.0000045,
      leverage: 0,
      totalSum: 79,
      depth: 0.0009724814822291935,
    },
  ],
};
const SPREAD_FOR_INTEGERS = 91 - 81;
const SPREAD_FOR_DECIMALS = 0.0000005;
const PERCENTAGE_FOR_INTEGERS = 11.628;
const PERCENTAGE_FOR_DECIMALS = 10.526;

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
});
