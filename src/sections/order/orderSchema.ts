import * as yup from "yup";
import { MESSAGE } from "../../constants/validation";
import { OrderType } from "proto-codecs/codegen/sphx/order/order";

export const schema = () =>
  yup.object().shape({
    volume: yup
      .number()
      .typeError(MESSAGE.number)
      .moreThan(0)
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
          console.log(
            "SCHEMA takeProfit",
            hasTPSL,
            isBuy,
            price,
            schema.moreThan(price, MESSAGE.moreThan)
          );
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
          console.log("SCHEMA stopLoss", hasTPSL, isBuy, price);
          if (!hasTPSL) {
            return schema.nullable();
          }
          return isBuy
            ? schema.lessThan(price, MESSAGE.lessThan)
            : schema.moreThan(price, MESSAGE.moreThan);
        }
      ),
  });
