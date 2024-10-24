import { describe, it, expect } from "vitest";
import {
  getSideColor,
  getColorByPl,
  getOrderStatusText,
  getOrderTypeText,
} from "./helpers";
import { Side } from "../../types/order";
import Colors from "../../theme/colors";
import { OrderStatus } from "proto-codecs/codegen/sphx/order/validated_order";
import { OrderType } from "proto-codecs/codegen/sphx/order/order";

describe("helpers", () => {
  describe("getSideColor", () => {
    it("should return positive color for Side.Buy", () => {
      expect(getSideColor(Side.Buy)).toBe(Colors.common.positive1);
    });

    it("should return negative color for Side.Sell", () => {
      expect(getSideColor(Side.Sell)).toBe(Colors.common.negative3);
    });
  });

  describe("getColorByPl", () => {
    it("should return positive color for positive PL", () => {
      expect(getColorByPl("10")).toBe(getSideColor(Side.Buy));
    });

    it("should return negative color for negative PL", () => {
      expect(getColorByPl("-10")).toBe(getSideColor(Side.Sell));
    });
  });

  describe("getOrderStatusText", () => {
    const t = (key: string) => key;

    it("should return correct text for ORDER_STATUS_UNSPECIFIED", () => {
      expect(getOrderStatusText(OrderStatus.ORDER_STATUS_UNSPECIFIED, t)).toBe(
        "ORDER_STATUS_UNSPECIFIED"
      );
    });

    it("should return correct text for ORDER_STATUS_OPEN", () => {
      expect(getOrderStatusText(OrderStatus.ORDER_STATUS_OPEN, t)).toBe(
        "ORDER_STATUS_OPEN"
      );
    });

    it("should return correct text for ORDER_STATUS_PARTIALLY_FILLED", () => {
      expect(
        getOrderStatusText(OrderStatus.ORDER_STATUS_PARTIALLY_FILLED, t)
      ).toBe("ORDER_STATUS_PARTIALLY_FILLED");
    });

    it("should return correct text for ORDER_STATUS_FILLED", () => {
      expect(getOrderStatusText(OrderStatus.ORDER_STATUS_FILLED, t)).toBe(
        "ORDER_STATUS_FILLED"
      );
    });

    it("should return correct text for ORDER_STATUS_CANCELED", () => {
      expect(getOrderStatusText(OrderStatus.ORDER_STATUS_CANCELED, t)).toBe(
        "ORDER_STATUS_CANCELED"
      );
    });

    it("should return correct text for ORDER_STATUS_EXPIRED", () => {
      expect(getOrderStatusText(OrderStatus.ORDER_STATUS_EXPIRED, t)).toBe(
        "ORDER_STATUS_EXPIRED"
      );
    });

    it("should return correct text for UNRECOGNIZED", () => {
      expect(getOrderStatusText(OrderStatus.UNRECOGNIZED, t)).toBe(
        "ORDER_STATUS_UNRECOGNIZED"
      );
    });

    it("should return correct text for unknown status", () => {
      expect(getOrderStatusText(-999 as OrderStatus, t)).toBe(
        "ORDER_STATUS_UNKNOWN"
      );
    });
  });

  describe("getOrderTypeText", () => {
    const t = (key: string) => key;

    it("should return correct text for ORDER_TYPE_LIMIT", () => {
      expect(getOrderTypeText(OrderType.ORDER_TYPE_LIMIT, t)).toBe(
        "ORDER_TYPE_LIMIT"
      );
    });

    it("should return correct text for ORDER_TYPE_MARKET", () => {
      expect(getOrderTypeText(OrderType.ORDER_TYPE_MARKET, t)).toBe(
        "ORDER_TYPE_MARKET"
      );
    });

    it("should return correct text for ORDER_TYPE_STOP_LOSS_MARKET", () => {
      expect(getOrderTypeText(OrderType.ORDER_TYPE_STOP_LOSS_MARKET, t)).toBe(
        "ORDER_TYPE_STOP_LOSS_MARKET"
      );
    });

    it("should return correct text for ORDER_TYPE_STOP_LOSS_LIMIT", () => {
      expect(getOrderTypeText(OrderType.ORDER_TYPE_STOP_LOSS_LIMIT, t)).toBe(
        "ORDER_TYPE_STOP_LOSS_LIMIT"
      );
    });

    it("should return correct text for ORDER_TYPE_TAKE_PROFIT_MARKET", () => {
      expect(getOrderTypeText(OrderType.ORDER_TYPE_TAKE_PROFIT_MARKET, t)).toBe(
        "ORDER_TYPE_TAKE_PROFIT_MARKET"
      );
    });

    it("should return correct text for ORDER_TYPE_TAKE_PROFIT_LIMIT", () => {
      expect(getOrderTypeText(OrderType.ORDER_TYPE_TAKE_PROFIT_LIMIT, t)).toBe(
        "ORDER_TYPE_TAKE_PROFIT_LIMIT"
      );
    });

    it("should return correct text for UNRECOGNIZED", () => {
      expect(getOrderTypeText(OrderType.UNRECOGNIZED, t)).toBe(
        "ORDER_TYPE_UNRECOGNIZED"
      );
    });

    it("should return correct text for unknown type", () => {
      expect(getOrderTypeText(-999 as OrderType, t)).toBe("ORDER_TYPE_UNKNOWN");
    });
  });
});
