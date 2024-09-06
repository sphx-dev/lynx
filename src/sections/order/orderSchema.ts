import * as yup from "yup";
import { MESSAGE } from "../../constants/validation";
import { OrderType } from "../../types/order";

export const schema = (markPrice: number) =>
  yup.object().shape({
    volume: yup
      .number()
      .typeError(MESSAGE.number)
      .moreThan(0)
      .required(MESSAGE.required),
    price: yup.number().when("orderType", {
      is: OrderType.LIMIT,
      then: schema1 =>
        schema1
          .typeError(MESSAGE.required)
          .moreThan(0)
          .required(MESSAGE.required),
      otherwise: schema1 => schema1.nullable(),
    }),
    takeProfit: yup
      .number()
      .nullable()
      .transform(value => {
        return value || null;
      })
      .when("isBuy", {
        is: true,
        then: schema => schema.moreThan(markPrice, MESSAGE.moreThan),
        otherwise: schema => schema.lessThan(markPrice, MESSAGE.lessThan),
      }),
    stopLoss: yup
      .number()
      .nullable()
      .transform(value => {
        return value || null;
      })
      .when("isBuy", {
        is: true,
        then: schema => schema.lessThan(markPrice, MESSAGE.lessThan),
        otherwise: schema => schema.moreThan(markPrice, MESSAGE.moreThan),
      }),
  });
