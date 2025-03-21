import * as yup from "yup";
import { MESSAGE } from "../../constants/validation";
import { OrderType } from "proto-codecs/codegen/sphx/order/order";
import { PositionSide } from "proto-codecs/codegen/sphx/order/perpetual_position";
import { PRECISION } from "@/constants";

export const schema = (
  minimumVolume: number,
  positionSide: PositionSide | undefined,
  positionSize: number,
  pricePerContract: number
) =>
  yup.object().shape({
    volume: yup
      .number()
      .typeError(MESSAGE.number)
      .test(
        "isGreaterOrEqualThan",
        MESSAGE.moreThanMin(minimumVolume),
        value => {
          return value! >= minimumVolume;
        }
      )
      .test(
        "isLessOrEqualThanPositionSize",
        MESSAGE.lessThanPositionSize(positionSize / PRECISION),
        function (value) {
          const { isBuy } = this.parent;

          if (value === undefined) {
            return true;
          }
          if (
            (isBuy === false &&
              positionSide === PositionSide.POSITION_SIDE_LONG) ||
            (isBuy === true &&
              positionSide === PositionSide.POSITION_SIDE_SHORT)
          ) {
            return value * pricePerContract * PRECISION <= positionSize;
          }
          // true if not applicable
          return true;
        }
      )
      .required(MESSAGE.required),
    price: yup
      .number()
      .transform(value => {
        return value || null;
      })
      .when("orderType", {
        is: (ordertype: OrderType) => ordertype === OrderType.ORDER_TYPE_LIMIT,
        then: schema1 =>
          schema1
            .typeError(MESSAGE.required)
            .moreThan(0)
            .required(MESSAGE.required),
        otherwise: schema1 => schema1.nullable(),
      }),
    hasTPSL: yup.boolean(),
    takeProfit: yup
      .number()
      .required(MESSAGE.required)
      .transform(value => {
        return value || null;
      })
      .when(
        ["hasTPSL", "isBuy", "price"],
        ([hasTPSL, isBuy, price], schema) => {
          if (!hasTPSL) {
            return schema.nullable();
          }
          return isBuy
            ? schema.moreThan(price, MESSAGE.moreThan)
            : schema.lessThan(price, MESSAGE.lessThan);
        }
      ),
    stopLoss: yup
      .number()
      .required(MESSAGE.required)
      .transform(value => {
        return value || null;
      })
      .when(
        ["hasTPSL", "isBuy", "price"],
        ([hasTPSL, isBuy, price], schema) => {
          if (!hasTPSL) {
            return schema.nullable();
          }
          return isBuy
            ? schema.lessThan(price, MESSAGE.lessThan)
            : schema.moreThan(price, MESSAGE.moreThan);
        }
      ),
  });
