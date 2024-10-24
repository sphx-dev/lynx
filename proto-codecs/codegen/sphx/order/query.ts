//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Market, MarketAmino, MarketSDKType } from "./market";
import { ValidatedOrder, ValidatedOrderAmino, ValidatedOrderSDKType } from "./validated_order";
import { PerpetualPosition, PerpetualPositionAmino, PerpetualPositionSDKType } from "./perpetual_position";
import { BinaryReader, BinaryWriter } from "../../binary";
export enum QueryPerpPositionsRequest_OrderStatus {
  ORDER_STATUS_UNSPECIFIED = 0,
  ORDER_STATUS_OPEN = 1,
  ORDER_STATUS_PARTIALLY_FILLED = 2,
  ORDER_STATUS_FILLED = 3,
  ORDER_STATUS_CANCELED = 4,
  ORDER_STATUS_EXPIRED = 5,
  UNRECOGNIZED = -1,
}
export const QueryPerpPositionsRequest_OrderStatusSDKType = QueryPerpPositionsRequest_OrderStatus;
export const QueryPerpPositionsRequest_OrderStatusAmino = QueryPerpPositionsRequest_OrderStatus;
export function queryPerpPositionsRequest_OrderStatusFromJSON(object: any): QueryPerpPositionsRequest_OrderStatus {
  switch (object) {
    case 0:
    case "ORDER_STATUS_UNSPECIFIED":
      return QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_UNSPECIFIED;
    case 1:
    case "ORDER_STATUS_OPEN":
      return QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_OPEN;
    case 2:
    case "ORDER_STATUS_PARTIALLY_FILLED":
      return QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_PARTIALLY_FILLED;
    case 3:
    case "ORDER_STATUS_FILLED":
      return QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_FILLED;
    case 4:
    case "ORDER_STATUS_CANCELED":
      return QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_CANCELED;
    case 5:
    case "ORDER_STATUS_EXPIRED":
      return QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_EXPIRED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return QueryPerpPositionsRequest_OrderStatus.UNRECOGNIZED;
  }
}
export function queryPerpPositionsRequest_OrderStatusToJSON(object: QueryPerpPositionsRequest_OrderStatus): string {
  switch (object) {
    case QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_UNSPECIFIED:
      return "ORDER_STATUS_UNSPECIFIED";
    case QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_OPEN:
      return "ORDER_STATUS_OPEN";
    case QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_PARTIALLY_FILLED:
      return "ORDER_STATUS_PARTIALLY_FILLED";
    case QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_FILLED:
      return "ORDER_STATUS_FILLED";
    case QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_CANCELED:
      return "ORDER_STATUS_CANCELED";
    case QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_EXPIRED:
      return "ORDER_STATUS_EXPIRED";
    case QueryPerpPositionsRequest_OrderStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/sphx.order.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/sphx.order.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/sphx.order.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/sphx.order.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
export interface QueryExecutionAuthorityRequest {}
export interface QueryExecutionAuthorityRequestProtoMsg {
  typeUrl: "/sphx.order.QueryExecutionAuthorityRequest";
  value: Uint8Array;
}
export interface QueryExecutionAuthorityRequestAmino {}
export interface QueryExecutionAuthorityRequestAminoMsg {
  type: "/sphx.order.QueryExecutionAuthorityRequest";
  value: QueryExecutionAuthorityRequestAmino;
}
export interface QueryExecutionAuthorityRequestSDKType {}
export interface QueryExecutionAuthorityResponse {
  executionAuthority: string;
}
export interface QueryExecutionAuthorityResponseProtoMsg {
  typeUrl: "/sphx.order.QueryExecutionAuthorityResponse";
  value: Uint8Array;
}
export interface QueryExecutionAuthorityResponseAmino {
  executionAuthority?: string;
}
export interface QueryExecutionAuthorityResponseAminoMsg {
  type: "/sphx.order.QueryExecutionAuthorityResponse";
  value: QueryExecutionAuthorityResponseAmino;
}
export interface QueryExecutionAuthorityResponseSDKType {
  executionAuthority: string;
}
export interface QueryMarketsRequest {
  pagination?: PageRequest;
}
export interface QueryMarketsRequestProtoMsg {
  typeUrl: "/sphx.order.QueryMarketsRequest";
  value: Uint8Array;
}
export interface QueryMarketsRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryMarketsRequestAminoMsg {
  type: "/sphx.order.QueryMarketsRequest";
  value: QueryMarketsRequestAmino;
}
export interface QueryMarketsRequestSDKType {
  pagination?: PageRequestSDKType;
}
export interface QueryMarketsResponse {
  markets: Market[];
  pagination?: PageResponse;
}
export interface QueryMarketsResponseProtoMsg {
  typeUrl: "/sphx.order.QueryMarketsResponse";
  value: Uint8Array;
}
export interface QueryMarketsResponseAmino {
  markets: MarketAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryMarketsResponseAminoMsg {
  type: "/sphx.order.QueryMarketsResponse";
  value: QueryMarketsResponseAmino;
}
export interface QueryMarketsResponseSDKType {
  markets: MarketSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QueryMarketRequest {
  id: bigint;
}
export interface QueryMarketRequestProtoMsg {
  typeUrl: "/sphx.order.QueryMarketRequest";
  value: Uint8Array;
}
export interface QueryMarketRequestAmino {
  id?: string;
}
export interface QueryMarketRequestAminoMsg {
  type: "/sphx.order.QueryMarketRequest";
  value: QueryMarketRequestAmino;
}
export interface QueryMarketRequestSDKType {
  id: bigint;
}
export interface QueryMarketResponse {
  market: Market;
}
export interface QueryMarketResponseProtoMsg {
  typeUrl: "/sphx.order.QueryMarketResponse";
  value: Uint8Array;
}
export interface QueryMarketResponseAmino {
  market: MarketAmino;
}
export interface QueryMarketResponseAminoMsg {
  type: "/sphx.order.QueryMarketResponse";
  value: QueryMarketResponseAmino;
}
export interface QueryMarketResponseSDKType {
  market: MarketSDKType;
}
export interface QueryOrdersRequest {
  pagination?: PageRequest;
}
export interface QueryOrdersRequestProtoMsg {
  typeUrl: "/sphx.order.QueryOrdersRequest";
  value: Uint8Array;
}
export interface QueryOrdersRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryOrdersRequestAminoMsg {
  type: "/sphx.order.QueryOrdersRequest";
  value: QueryOrdersRequestAmino;
}
export interface QueryOrdersRequestSDKType {
  pagination?: PageRequestSDKType;
}
export interface QueryOrdersResponse {
  orders: ValidatedOrder[];
  pagination?: PageResponse;
}
export interface QueryOrdersResponseProtoMsg {
  typeUrl: "/sphx.order.QueryOrdersResponse";
  value: Uint8Array;
}
export interface QueryOrdersResponseAmino {
  orders?: ValidatedOrderAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryOrdersResponseAminoMsg {
  type: "/sphx.order.QueryOrdersResponse";
  value: QueryOrdersResponseAmino;
}
export interface QueryOrdersResponseSDKType {
  orders: ValidatedOrderSDKType[];
  pagination?: PageResponseSDKType;
}
/** If order status is omitted, then get all */
export interface QueryOrdersForAccountRequest {
  address: string;
  /** status is an array of OrderStatus or null */
  status?: QueryPerpPositionsRequest_OrderStatus[];
  pagination?: PageRequest;
}
export interface QueryOrdersForAccountRequestProtoMsg {
  typeUrl: "/sphx.order.QueryOrdersForAccountRequest";
  value: Uint8Array;
}
/** If order status is omitted, then get all */
export interface QueryOrdersForAccountRequestAmino {
  address?: string;
  /** status is an array of OrderStatus or null */
  status?: QueryPerpPositionsRequest_OrderStatus[];
  pagination?: PageRequestAmino;
}
export interface QueryOrdersForAccountRequestAminoMsg {
  type: "/sphx.order.QueryOrdersForAccountRequest";
  value: QueryOrdersForAccountRequestAmino;
}
/** If order status is omitted, then get all */
export interface QueryOrdersForAccountRequestSDKType {
  address: string;
  status?: QueryPerpPositionsRequest_OrderStatus[];
  pagination?: PageRequestSDKType;
}
export interface QueryOrdersForAccountResponse {
  orders: ValidatedOrder[];
  pagination?: PageResponse;
}
export interface QueryOrdersForAccountResponseProtoMsg {
  typeUrl: "/sphx.order.QueryOrdersForAccountResponse";
  value: Uint8Array;
}
export interface QueryOrdersForAccountResponseAmino {
  orders?: ValidatedOrderAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryOrdersForAccountResponseAminoMsg {
  type: "/sphx.order.QueryOrdersForAccountResponse";
  value: QueryOrdersForAccountResponseAmino;
}
export interface QueryOrdersForAccountResponseSDKType {
  orders: ValidatedOrderSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QueryOrderInfoRequest {
  /** order_id is `marginAccAddr:orderNumber` */
  orderId: string;
}
export interface QueryOrderInfoRequestProtoMsg {
  typeUrl: "/sphx.order.QueryOrderInfoRequest";
  value: Uint8Array;
}
export interface QueryOrderInfoRequestAmino {
  /** order_id is `marginAccAddr:orderNumber` */
  order_id?: string;
}
export interface QueryOrderInfoRequestAminoMsg {
  type: "/sphx.order.QueryOrderInfoRequest";
  value: QueryOrderInfoRequestAmino;
}
export interface QueryOrderInfoRequestSDKType {
  order_id: string;
}
export interface QueryOrderInfoResponse {
  order: ValidatedOrder;
}
export interface QueryOrderInfoResponseProtoMsg {
  typeUrl: "/sphx.order.QueryOrderInfoResponse";
  value: Uint8Array;
}
export interface QueryOrderInfoResponseAmino {
  order?: ValidatedOrderAmino;
}
export interface QueryOrderInfoResponseAminoMsg {
  type: "/sphx.order.QueryOrderInfoResponse";
  value: QueryOrderInfoResponseAmino;
}
export interface QueryOrderInfoResponseSDKType {
  order: ValidatedOrderSDKType;
}
export interface QueryPerpPositionsRequest {
  pagination?: PageRequest;
}
export interface QueryPerpPositionsRequestProtoMsg {
  typeUrl: "/sphx.order.QueryPerpPositionsRequest";
  value: Uint8Array;
}
export interface QueryPerpPositionsRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryPerpPositionsRequestAminoMsg {
  type: "/sphx.order.QueryPerpPositionsRequest";
  value: QueryPerpPositionsRequestAmino;
}
export interface QueryPerpPositionsRequestSDKType {
  pagination?: PageRequestSDKType;
}
export interface QueryPerpPositionsResponse {
  positions: PerpetualPosition[];
  pagination?: PageResponse;
}
export interface QueryPerpPositionsResponseProtoMsg {
  typeUrl: "/sphx.order.QueryPerpPositionsResponse";
  value: Uint8Array;
}
export interface QueryPerpPositionsResponseAmino {
  positions?: PerpetualPositionAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryPerpPositionsResponseAminoMsg {
  type: "/sphx.order.QueryPerpPositionsResponse";
  value: QueryPerpPositionsResponseAmino;
}
export interface QueryPerpPositionsResponseSDKType {
  positions: PerpetualPositionSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QueryPerpPositionForAccountRequest {
  address: string;
  pagination?: PageRequest;
}
export interface QueryPerpPositionForAccountRequestProtoMsg {
  typeUrl: "/sphx.order.QueryPerpPositionForAccountRequest";
  value: Uint8Array;
}
export interface QueryPerpPositionForAccountRequestAmino {
  address?: string;
  pagination?: PageRequestAmino;
}
export interface QueryPerpPositionForAccountRequestAminoMsg {
  type: "/sphx.order.QueryPerpPositionForAccountRequest";
  value: QueryPerpPositionForAccountRequestAmino;
}
export interface QueryPerpPositionForAccountRequestSDKType {
  address: string;
  pagination?: PageRequestSDKType;
}
export interface QueryPerpPositionForAccountResponse {
  positions: PerpetualPosition[];
  pagination?: PageResponse;
}
export interface QueryPerpPositionForAccountResponseProtoMsg {
  typeUrl: "/sphx.order.QueryPerpPositionForAccountResponse";
  value: Uint8Array;
}
export interface QueryPerpPositionForAccountResponseAmino {
  positions?: PerpetualPositionAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryPerpPositionForAccountResponseAminoMsg {
  type: "/sphx.order.QueryPerpPositionForAccountResponse";
  value: QueryPerpPositionForAccountResponseAmino;
}
export interface QueryPerpPositionForAccountResponseSDKType {
  positions: PerpetualPositionSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QueryPerpPositionRequest {
  positionId: string;
}
export interface QueryPerpPositionRequestProtoMsg {
  typeUrl: "/sphx.order.QueryPerpPositionRequest";
  value: Uint8Array;
}
export interface QueryPerpPositionRequestAmino {
  position_id?: string;
}
export interface QueryPerpPositionRequestAminoMsg {
  type: "/sphx.order.QueryPerpPositionRequest";
  value: QueryPerpPositionRequestAmino;
}
export interface QueryPerpPositionRequestSDKType {
  position_id: string;
}
export interface QueryPerpPositionResponse {
  position: PerpetualPosition;
}
export interface QueryPerpPositionResponseProtoMsg {
  typeUrl: "/sphx.order.QueryPerpPositionResponse";
  value: Uint8Array;
}
export interface QueryPerpPositionResponseAmino {
  position?: PerpetualPositionAmino;
}
export interface QueryPerpPositionResponseAminoMsg {
  type: "/sphx.order.QueryPerpPositionResponse";
  value: QueryPerpPositionResponseAmino;
}
export interface QueryPerpPositionResponseSDKType {
  position: PerpetualPositionSDKType;
}
export interface QuerySpendableBalanceRequest {
  address: string;
}
export interface QuerySpendableBalanceRequestProtoMsg {
  typeUrl: "/sphx.order.QuerySpendableBalanceRequest";
  value: Uint8Array;
}
export interface QuerySpendableBalanceRequestAmino {
  address?: string;
}
export interface QuerySpendableBalanceRequestAminoMsg {
  type: "/sphx.order.QuerySpendableBalanceRequest";
  value: QuerySpendableBalanceRequestAmino;
}
export interface QuerySpendableBalanceRequestSDKType {
  address: string;
}
export interface QuerySpendableBalanceResponse {
  spendableBalance: string;
}
export interface QuerySpendableBalanceResponseProtoMsg {
  typeUrl: "/sphx.order.QuerySpendableBalanceResponse";
  value: Uint8Array;
}
export interface QuerySpendableBalanceResponseAmino {
  spendable_balance: string;
}
export interface QuerySpendableBalanceResponseAminoMsg {
  type: "/sphx.order.QuerySpendableBalanceResponse";
  value: QuerySpendableBalanceResponseAmino;
}
export interface QuerySpendableBalanceResponseSDKType {
  spendable_balance: string;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/sphx.order.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/sphx.order.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryExecutionAuthorityRequest(): QueryExecutionAuthorityRequest {
  return {};
}
export const QueryExecutionAuthorityRequest = {
  typeUrl: "/sphx.order.QueryExecutionAuthorityRequest",
  encode(_: QueryExecutionAuthorityRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryExecutionAuthorityRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryExecutionAuthorityRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryExecutionAuthorityRequest>): QueryExecutionAuthorityRequest {
    const message = createBaseQueryExecutionAuthorityRequest();
    return message;
  },
  fromAmino(_: QueryExecutionAuthorityRequestAmino): QueryExecutionAuthorityRequest {
    const message = createBaseQueryExecutionAuthorityRequest();
    return message;
  },
  toAmino(_: QueryExecutionAuthorityRequest): QueryExecutionAuthorityRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryExecutionAuthorityRequestAminoMsg): QueryExecutionAuthorityRequest {
    return QueryExecutionAuthorityRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryExecutionAuthorityRequestProtoMsg): QueryExecutionAuthorityRequest {
    return QueryExecutionAuthorityRequest.decode(message.value);
  },
  toProto(message: QueryExecutionAuthorityRequest): Uint8Array {
    return QueryExecutionAuthorityRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryExecutionAuthorityRequest): QueryExecutionAuthorityRequestProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryExecutionAuthorityRequest",
      value: QueryExecutionAuthorityRequest.encode(message).finish()
    };
  }
};
function createBaseQueryExecutionAuthorityResponse(): QueryExecutionAuthorityResponse {
  return {
    executionAuthority: ""
  };
}
export const QueryExecutionAuthorityResponse = {
  typeUrl: "/sphx.order.QueryExecutionAuthorityResponse",
  encode(message: QueryExecutionAuthorityResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.executionAuthority !== "") {
      writer.uint32(10).string(message.executionAuthority);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryExecutionAuthorityResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryExecutionAuthorityResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.executionAuthority = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryExecutionAuthorityResponse>): QueryExecutionAuthorityResponse {
    const message = createBaseQueryExecutionAuthorityResponse();
    message.executionAuthority = object.executionAuthority ?? "";
    return message;
  },
  fromAmino(object: QueryExecutionAuthorityResponseAmino): QueryExecutionAuthorityResponse {
    const message = createBaseQueryExecutionAuthorityResponse();
    if (object.executionAuthority !== undefined && object.executionAuthority !== null) {
      message.executionAuthority = object.executionAuthority;
    }
    return message;
  },
  toAmino(message: QueryExecutionAuthorityResponse): QueryExecutionAuthorityResponseAmino {
    const obj: any = {};
    obj.executionAuthority = message.executionAuthority === "" ? undefined : message.executionAuthority;
    return obj;
  },
  fromAminoMsg(object: QueryExecutionAuthorityResponseAminoMsg): QueryExecutionAuthorityResponse {
    return QueryExecutionAuthorityResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryExecutionAuthorityResponseProtoMsg): QueryExecutionAuthorityResponse {
    return QueryExecutionAuthorityResponse.decode(message.value);
  },
  toProto(message: QueryExecutionAuthorityResponse): Uint8Array {
    return QueryExecutionAuthorityResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryExecutionAuthorityResponse): QueryExecutionAuthorityResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryExecutionAuthorityResponse",
      value: QueryExecutionAuthorityResponse.encode(message).finish()
    };
  }
};
function createBaseQueryMarketsRequest(): QueryMarketsRequest {
  return {
    pagination: undefined
  };
}
export const QueryMarketsRequest = {
  typeUrl: "/sphx.order.QueryMarketsRequest",
  encode(message: QueryMarketsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryMarketsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMarketsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryMarketsRequest>): QueryMarketsRequest {
    const message = createBaseQueryMarketsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryMarketsRequestAmino): QueryMarketsRequest {
    const message = createBaseQueryMarketsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryMarketsRequest): QueryMarketsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryMarketsRequestAminoMsg): QueryMarketsRequest {
    return QueryMarketsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryMarketsRequestProtoMsg): QueryMarketsRequest {
    return QueryMarketsRequest.decode(message.value);
  },
  toProto(message: QueryMarketsRequest): Uint8Array {
    return QueryMarketsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryMarketsRequest): QueryMarketsRequestProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryMarketsRequest",
      value: QueryMarketsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryMarketsResponse(): QueryMarketsResponse {
  return {
    markets: [],
    pagination: undefined
  };
}
export const QueryMarketsResponse = {
  typeUrl: "/sphx.order.QueryMarketsResponse",
  encode(message: QueryMarketsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.markets) {
      Market.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryMarketsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMarketsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.markets.push(Market.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryMarketsResponse>): QueryMarketsResponse {
    const message = createBaseQueryMarketsResponse();
    message.markets = object.markets?.map(e => Market.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryMarketsResponseAmino): QueryMarketsResponse {
    const message = createBaseQueryMarketsResponse();
    message.markets = object.markets?.map(e => Market.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryMarketsResponse): QueryMarketsResponseAmino {
    const obj: any = {};
    if (message.markets) {
      obj.markets = message.markets.map(e => e ? Market.toAmino(e) : undefined);
    } else {
      obj.markets = message.markets;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryMarketsResponseAminoMsg): QueryMarketsResponse {
    return QueryMarketsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryMarketsResponseProtoMsg): QueryMarketsResponse {
    return QueryMarketsResponse.decode(message.value);
  },
  toProto(message: QueryMarketsResponse): Uint8Array {
    return QueryMarketsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryMarketsResponse): QueryMarketsResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryMarketsResponse",
      value: QueryMarketsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryMarketRequest(): QueryMarketRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryMarketRequest = {
  typeUrl: "/sphx.order.QueryMarketRequest",
  encode(message: QueryMarketRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).int64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryMarketRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMarketRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryMarketRequest>): QueryMarketRequest {
    const message = createBaseQueryMarketRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryMarketRequestAmino): QueryMarketRequest {
    const message = createBaseQueryMarketRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryMarketRequest): QueryMarketRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryMarketRequestAminoMsg): QueryMarketRequest {
    return QueryMarketRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryMarketRequestProtoMsg): QueryMarketRequest {
    return QueryMarketRequest.decode(message.value);
  },
  toProto(message: QueryMarketRequest): Uint8Array {
    return QueryMarketRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryMarketRequest): QueryMarketRequestProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryMarketRequest",
      value: QueryMarketRequest.encode(message).finish()
    };
  }
};
function createBaseQueryMarketResponse(): QueryMarketResponse {
  return {
    market: Market.fromPartial({})
  };
}
export const QueryMarketResponse = {
  typeUrl: "/sphx.order.QueryMarketResponse",
  encode(message: QueryMarketResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.market !== undefined) {
      Market.encode(message.market, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryMarketResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMarketResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.market = Market.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryMarketResponse>): QueryMarketResponse {
    const message = createBaseQueryMarketResponse();
    message.market = object.market !== undefined && object.market !== null ? Market.fromPartial(object.market) : undefined;
    return message;
  },
  fromAmino(object: QueryMarketResponseAmino): QueryMarketResponse {
    const message = createBaseQueryMarketResponse();
    if (object.market !== undefined && object.market !== null) {
      message.market = Market.fromAmino(object.market);
    }
    return message;
  },
  toAmino(message: QueryMarketResponse): QueryMarketResponseAmino {
    const obj: any = {};
    obj.market = message.market ? Market.toAmino(message.market) : Market.toAmino(Market.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: QueryMarketResponseAminoMsg): QueryMarketResponse {
    return QueryMarketResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryMarketResponseProtoMsg): QueryMarketResponse {
    return QueryMarketResponse.decode(message.value);
  },
  toProto(message: QueryMarketResponse): Uint8Array {
    return QueryMarketResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryMarketResponse): QueryMarketResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryMarketResponse",
      value: QueryMarketResponse.encode(message).finish()
    };
  }
};
function createBaseQueryOrdersRequest(): QueryOrdersRequest {
  return {
    pagination: undefined
  };
}
export const QueryOrdersRequest = {
  typeUrl: "/sphx.order.QueryOrdersRequest",
  encode(message: QueryOrdersRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOrdersRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOrdersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOrdersRequest>): QueryOrdersRequest {
    const message = createBaseQueryOrdersRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryOrdersRequestAmino): QueryOrdersRequest {
    const message = createBaseQueryOrdersRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryOrdersRequest): QueryOrdersRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryOrdersRequestAminoMsg): QueryOrdersRequest {
    return QueryOrdersRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOrdersRequestProtoMsg): QueryOrdersRequest {
    return QueryOrdersRequest.decode(message.value);
  },
  toProto(message: QueryOrdersRequest): Uint8Array {
    return QueryOrdersRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryOrdersRequest): QueryOrdersRequestProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryOrdersRequest",
      value: QueryOrdersRequest.encode(message).finish()
    };
  }
};
function createBaseQueryOrdersResponse(): QueryOrdersResponse {
  return {
    orders: [],
    pagination: undefined
  };
}
export const QueryOrdersResponse = {
  typeUrl: "/sphx.order.QueryOrdersResponse",
  encode(message: QueryOrdersResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.orders) {
      ValidatedOrder.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOrdersResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOrdersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orders.push(ValidatedOrder.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOrdersResponse>): QueryOrdersResponse {
    const message = createBaseQueryOrdersResponse();
    message.orders = object.orders?.map(e => ValidatedOrder.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryOrdersResponseAmino): QueryOrdersResponse {
    const message = createBaseQueryOrdersResponse();
    message.orders = object.orders?.map(e => ValidatedOrder.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryOrdersResponse): QueryOrdersResponseAmino {
    const obj: any = {};
    if (message.orders) {
      obj.orders = message.orders.map(e => e ? ValidatedOrder.toAmino(e) : undefined);
    } else {
      obj.orders = message.orders;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryOrdersResponseAminoMsg): QueryOrdersResponse {
    return QueryOrdersResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOrdersResponseProtoMsg): QueryOrdersResponse {
    return QueryOrdersResponse.decode(message.value);
  },
  toProto(message: QueryOrdersResponse): Uint8Array {
    return QueryOrdersResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryOrdersResponse): QueryOrdersResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryOrdersResponse",
      value: QueryOrdersResponse.encode(message).finish()
    };
  }
};
function createBaseQueryOrdersForAccountRequest(): QueryOrdersForAccountRequest {
  return {
    address: "",
    status: [],
    pagination: undefined
  };
}
export const QueryOrdersForAccountRequest = {
  typeUrl: "/sphx.order.QueryOrdersForAccountRequest",
  encode(message: QueryOrdersForAccountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    writer.uint32(18).fork();
    for (const v of message.status) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOrdersForAccountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOrdersForAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.status.push(reader.int32() as any);
            }
          } else {
            message.status.push(reader.int32() as any);
          }
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOrdersForAccountRequest>): QueryOrdersForAccountRequest {
    const message = createBaseQueryOrdersForAccountRequest();
    message.address = object.address ?? "";
    message.status = object.status?.map(e => e) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryOrdersForAccountRequestAmino): QueryOrdersForAccountRequest {
    const message = createBaseQueryOrdersForAccountRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    message.status = object.status?.map(e => e) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryOrdersForAccountRequest): QueryOrdersForAccountRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    if (message.status) {
      obj.status = message.status.map(e => e);
    } else {
      obj.status = message.status;
    }
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryOrdersForAccountRequestAminoMsg): QueryOrdersForAccountRequest {
    return QueryOrdersForAccountRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOrdersForAccountRequestProtoMsg): QueryOrdersForAccountRequest {
    return QueryOrdersForAccountRequest.decode(message.value);
  },
  toProto(message: QueryOrdersForAccountRequest): Uint8Array {
    return QueryOrdersForAccountRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryOrdersForAccountRequest): QueryOrdersForAccountRequestProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryOrdersForAccountRequest",
      value: QueryOrdersForAccountRequest.encode(message).finish()
    };
  }
};
function createBaseQueryOrdersForAccountResponse(): QueryOrdersForAccountResponse {
  return {
    orders: [],
    pagination: undefined
  };
}
export const QueryOrdersForAccountResponse = {
  typeUrl: "/sphx.order.QueryOrdersForAccountResponse",
  encode(message: QueryOrdersForAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.orders) {
      ValidatedOrder.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOrdersForAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOrdersForAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orders.push(ValidatedOrder.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOrdersForAccountResponse>): QueryOrdersForAccountResponse {
    const message = createBaseQueryOrdersForAccountResponse();
    message.orders = object.orders?.map(e => ValidatedOrder.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryOrdersForAccountResponseAmino): QueryOrdersForAccountResponse {
    const message = createBaseQueryOrdersForAccountResponse();
    message.orders = object.orders?.map(e => ValidatedOrder.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryOrdersForAccountResponse): QueryOrdersForAccountResponseAmino {
    const obj: any = {};
    if (message.orders) {
      obj.orders = message.orders.map(e => e ? ValidatedOrder.toAmino(e) : undefined);
    } else {
      obj.orders = message.orders;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryOrdersForAccountResponseAminoMsg): QueryOrdersForAccountResponse {
    return QueryOrdersForAccountResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOrdersForAccountResponseProtoMsg): QueryOrdersForAccountResponse {
    return QueryOrdersForAccountResponse.decode(message.value);
  },
  toProto(message: QueryOrdersForAccountResponse): Uint8Array {
    return QueryOrdersForAccountResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryOrdersForAccountResponse): QueryOrdersForAccountResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryOrdersForAccountResponse",
      value: QueryOrdersForAccountResponse.encode(message).finish()
    };
  }
};
function createBaseQueryOrderInfoRequest(): QueryOrderInfoRequest {
  return {
    orderId: ""
  };
}
export const QueryOrderInfoRequest = {
  typeUrl: "/sphx.order.QueryOrderInfoRequest",
  encode(message: QueryOrderInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.orderId !== "") {
      writer.uint32(10).string(message.orderId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOrderInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOrderInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOrderInfoRequest>): QueryOrderInfoRequest {
    const message = createBaseQueryOrderInfoRequest();
    message.orderId = object.orderId ?? "";
    return message;
  },
  fromAmino(object: QueryOrderInfoRequestAmino): QueryOrderInfoRequest {
    const message = createBaseQueryOrderInfoRequest();
    if (object.order_id !== undefined && object.order_id !== null) {
      message.orderId = object.order_id;
    }
    return message;
  },
  toAmino(message: QueryOrderInfoRequest): QueryOrderInfoRequestAmino {
    const obj: any = {};
    obj.order_id = message.orderId === "" ? undefined : message.orderId;
    return obj;
  },
  fromAminoMsg(object: QueryOrderInfoRequestAminoMsg): QueryOrderInfoRequest {
    return QueryOrderInfoRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOrderInfoRequestProtoMsg): QueryOrderInfoRequest {
    return QueryOrderInfoRequest.decode(message.value);
  },
  toProto(message: QueryOrderInfoRequest): Uint8Array {
    return QueryOrderInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryOrderInfoRequest): QueryOrderInfoRequestProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryOrderInfoRequest",
      value: QueryOrderInfoRequest.encode(message).finish()
    };
  }
};
function createBaseQueryOrderInfoResponse(): QueryOrderInfoResponse {
  return {
    order: ValidatedOrder.fromPartial({})
  };
}
export const QueryOrderInfoResponse = {
  typeUrl: "/sphx.order.QueryOrderInfoResponse",
  encode(message: QueryOrderInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.order !== undefined) {
      ValidatedOrder.encode(message.order, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOrderInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOrderInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.order = ValidatedOrder.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOrderInfoResponse>): QueryOrderInfoResponse {
    const message = createBaseQueryOrderInfoResponse();
    message.order = object.order !== undefined && object.order !== null ? ValidatedOrder.fromPartial(object.order) : undefined;
    return message;
  },
  fromAmino(object: QueryOrderInfoResponseAmino): QueryOrderInfoResponse {
    const message = createBaseQueryOrderInfoResponse();
    if (object.order !== undefined && object.order !== null) {
      message.order = ValidatedOrder.fromAmino(object.order);
    }
    return message;
  },
  toAmino(message: QueryOrderInfoResponse): QueryOrderInfoResponseAmino {
    const obj: any = {};
    obj.order = message.order ? ValidatedOrder.toAmino(message.order) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryOrderInfoResponseAminoMsg): QueryOrderInfoResponse {
    return QueryOrderInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOrderInfoResponseProtoMsg): QueryOrderInfoResponse {
    return QueryOrderInfoResponse.decode(message.value);
  },
  toProto(message: QueryOrderInfoResponse): Uint8Array {
    return QueryOrderInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryOrderInfoResponse): QueryOrderInfoResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryOrderInfoResponse",
      value: QueryOrderInfoResponse.encode(message).finish()
    };
  }
};
function createBaseQueryPerpPositionsRequest(): QueryPerpPositionsRequest {
  return {
    pagination: undefined
  };
}
export const QueryPerpPositionsRequest = {
  typeUrl: "/sphx.order.QueryPerpPositionsRequest",
  encode(message: QueryPerpPositionsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPerpPositionsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPerpPositionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPerpPositionsRequest>): QueryPerpPositionsRequest {
    const message = createBaseQueryPerpPositionsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryPerpPositionsRequestAmino): QueryPerpPositionsRequest {
    const message = createBaseQueryPerpPositionsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryPerpPositionsRequest): QueryPerpPositionsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPerpPositionsRequestAminoMsg): QueryPerpPositionsRequest {
    return QueryPerpPositionsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPerpPositionsRequestProtoMsg): QueryPerpPositionsRequest {
    return QueryPerpPositionsRequest.decode(message.value);
  },
  toProto(message: QueryPerpPositionsRequest): Uint8Array {
    return QueryPerpPositionsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPerpPositionsRequest): QueryPerpPositionsRequestProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryPerpPositionsRequest",
      value: QueryPerpPositionsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryPerpPositionsResponse(): QueryPerpPositionsResponse {
  return {
    positions: [],
    pagination: undefined
  };
}
export const QueryPerpPositionsResponse = {
  typeUrl: "/sphx.order.QueryPerpPositionsResponse",
  encode(message: QueryPerpPositionsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.positions) {
      PerpetualPosition.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPerpPositionsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPerpPositionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.positions.push(PerpetualPosition.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPerpPositionsResponse>): QueryPerpPositionsResponse {
    const message = createBaseQueryPerpPositionsResponse();
    message.positions = object.positions?.map(e => PerpetualPosition.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryPerpPositionsResponseAmino): QueryPerpPositionsResponse {
    const message = createBaseQueryPerpPositionsResponse();
    message.positions = object.positions?.map(e => PerpetualPosition.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryPerpPositionsResponse): QueryPerpPositionsResponseAmino {
    const obj: any = {};
    if (message.positions) {
      obj.positions = message.positions.map(e => e ? PerpetualPosition.toAmino(e) : undefined);
    } else {
      obj.positions = message.positions;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPerpPositionsResponseAminoMsg): QueryPerpPositionsResponse {
    return QueryPerpPositionsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPerpPositionsResponseProtoMsg): QueryPerpPositionsResponse {
    return QueryPerpPositionsResponse.decode(message.value);
  },
  toProto(message: QueryPerpPositionsResponse): Uint8Array {
    return QueryPerpPositionsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPerpPositionsResponse): QueryPerpPositionsResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryPerpPositionsResponse",
      value: QueryPerpPositionsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryPerpPositionForAccountRequest(): QueryPerpPositionForAccountRequest {
  return {
    address: "",
    pagination: undefined
  };
}
export const QueryPerpPositionForAccountRequest = {
  typeUrl: "/sphx.order.QueryPerpPositionForAccountRequest",
  encode(message: QueryPerpPositionForAccountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPerpPositionForAccountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPerpPositionForAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPerpPositionForAccountRequest>): QueryPerpPositionForAccountRequest {
    const message = createBaseQueryPerpPositionForAccountRequest();
    message.address = object.address ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryPerpPositionForAccountRequestAmino): QueryPerpPositionForAccountRequest {
    const message = createBaseQueryPerpPositionForAccountRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryPerpPositionForAccountRequest): QueryPerpPositionForAccountRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPerpPositionForAccountRequestAminoMsg): QueryPerpPositionForAccountRequest {
    return QueryPerpPositionForAccountRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPerpPositionForAccountRequestProtoMsg): QueryPerpPositionForAccountRequest {
    return QueryPerpPositionForAccountRequest.decode(message.value);
  },
  toProto(message: QueryPerpPositionForAccountRequest): Uint8Array {
    return QueryPerpPositionForAccountRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPerpPositionForAccountRequest): QueryPerpPositionForAccountRequestProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryPerpPositionForAccountRequest",
      value: QueryPerpPositionForAccountRequest.encode(message).finish()
    };
  }
};
function createBaseQueryPerpPositionForAccountResponse(): QueryPerpPositionForAccountResponse {
  return {
    positions: [],
    pagination: undefined
  };
}
export const QueryPerpPositionForAccountResponse = {
  typeUrl: "/sphx.order.QueryPerpPositionForAccountResponse",
  encode(message: QueryPerpPositionForAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.positions) {
      PerpetualPosition.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPerpPositionForAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPerpPositionForAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.positions.push(PerpetualPosition.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPerpPositionForAccountResponse>): QueryPerpPositionForAccountResponse {
    const message = createBaseQueryPerpPositionForAccountResponse();
    message.positions = object.positions?.map(e => PerpetualPosition.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryPerpPositionForAccountResponseAmino): QueryPerpPositionForAccountResponse {
    const message = createBaseQueryPerpPositionForAccountResponse();
    message.positions = object.positions?.map(e => PerpetualPosition.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryPerpPositionForAccountResponse): QueryPerpPositionForAccountResponseAmino {
    const obj: any = {};
    if (message.positions) {
      obj.positions = message.positions.map(e => e ? PerpetualPosition.toAmino(e) : undefined);
    } else {
      obj.positions = message.positions;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPerpPositionForAccountResponseAminoMsg): QueryPerpPositionForAccountResponse {
    return QueryPerpPositionForAccountResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPerpPositionForAccountResponseProtoMsg): QueryPerpPositionForAccountResponse {
    return QueryPerpPositionForAccountResponse.decode(message.value);
  },
  toProto(message: QueryPerpPositionForAccountResponse): Uint8Array {
    return QueryPerpPositionForAccountResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPerpPositionForAccountResponse): QueryPerpPositionForAccountResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryPerpPositionForAccountResponse",
      value: QueryPerpPositionForAccountResponse.encode(message).finish()
    };
  }
};
function createBaseQueryPerpPositionRequest(): QueryPerpPositionRequest {
  return {
    positionId: ""
  };
}
export const QueryPerpPositionRequest = {
  typeUrl: "/sphx.order.QueryPerpPositionRequest",
  encode(message: QueryPerpPositionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.positionId !== "") {
      writer.uint32(10).string(message.positionId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPerpPositionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPerpPositionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.positionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPerpPositionRequest>): QueryPerpPositionRequest {
    const message = createBaseQueryPerpPositionRequest();
    message.positionId = object.positionId ?? "";
    return message;
  },
  fromAmino(object: QueryPerpPositionRequestAmino): QueryPerpPositionRequest {
    const message = createBaseQueryPerpPositionRequest();
    if (object.position_id !== undefined && object.position_id !== null) {
      message.positionId = object.position_id;
    }
    return message;
  },
  toAmino(message: QueryPerpPositionRequest): QueryPerpPositionRequestAmino {
    const obj: any = {};
    obj.position_id = message.positionId === "" ? undefined : message.positionId;
    return obj;
  },
  fromAminoMsg(object: QueryPerpPositionRequestAminoMsg): QueryPerpPositionRequest {
    return QueryPerpPositionRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPerpPositionRequestProtoMsg): QueryPerpPositionRequest {
    return QueryPerpPositionRequest.decode(message.value);
  },
  toProto(message: QueryPerpPositionRequest): Uint8Array {
    return QueryPerpPositionRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPerpPositionRequest): QueryPerpPositionRequestProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryPerpPositionRequest",
      value: QueryPerpPositionRequest.encode(message).finish()
    };
  }
};
function createBaseQueryPerpPositionResponse(): QueryPerpPositionResponse {
  return {
    position: PerpetualPosition.fromPartial({})
  };
}
export const QueryPerpPositionResponse = {
  typeUrl: "/sphx.order.QueryPerpPositionResponse",
  encode(message: QueryPerpPositionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.position !== undefined) {
      PerpetualPosition.encode(message.position, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPerpPositionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPerpPositionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.position = PerpetualPosition.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPerpPositionResponse>): QueryPerpPositionResponse {
    const message = createBaseQueryPerpPositionResponse();
    message.position = object.position !== undefined && object.position !== null ? PerpetualPosition.fromPartial(object.position) : undefined;
    return message;
  },
  fromAmino(object: QueryPerpPositionResponseAmino): QueryPerpPositionResponse {
    const message = createBaseQueryPerpPositionResponse();
    if (object.position !== undefined && object.position !== null) {
      message.position = PerpetualPosition.fromAmino(object.position);
    }
    return message;
  },
  toAmino(message: QueryPerpPositionResponse): QueryPerpPositionResponseAmino {
    const obj: any = {};
    obj.position = message.position ? PerpetualPosition.toAmino(message.position) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPerpPositionResponseAminoMsg): QueryPerpPositionResponse {
    return QueryPerpPositionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPerpPositionResponseProtoMsg): QueryPerpPositionResponse {
    return QueryPerpPositionResponse.decode(message.value);
  },
  toProto(message: QueryPerpPositionResponse): Uint8Array {
    return QueryPerpPositionResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPerpPositionResponse): QueryPerpPositionResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryPerpPositionResponse",
      value: QueryPerpPositionResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySpendableBalanceRequest(): QuerySpendableBalanceRequest {
  return {
    address: ""
  };
}
export const QuerySpendableBalanceRequest = {
  typeUrl: "/sphx.order.QuerySpendableBalanceRequest",
  encode(message: QuerySpendableBalanceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySpendableBalanceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpendableBalanceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySpendableBalanceRequest>): QuerySpendableBalanceRequest {
    const message = createBaseQuerySpendableBalanceRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QuerySpendableBalanceRequestAmino): QuerySpendableBalanceRequest {
    const message = createBaseQuerySpendableBalanceRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QuerySpendableBalanceRequest): QuerySpendableBalanceRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QuerySpendableBalanceRequestAminoMsg): QuerySpendableBalanceRequest {
    return QuerySpendableBalanceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySpendableBalanceRequestProtoMsg): QuerySpendableBalanceRequest {
    return QuerySpendableBalanceRequest.decode(message.value);
  },
  toProto(message: QuerySpendableBalanceRequest): Uint8Array {
    return QuerySpendableBalanceRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySpendableBalanceRequest): QuerySpendableBalanceRequestProtoMsg {
    return {
      typeUrl: "/sphx.order.QuerySpendableBalanceRequest",
      value: QuerySpendableBalanceRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySpendableBalanceResponse(): QuerySpendableBalanceResponse {
  return {
    spendableBalance: ""
  };
}
export const QuerySpendableBalanceResponse = {
  typeUrl: "/sphx.order.QuerySpendableBalanceResponse",
  encode(message: QuerySpendableBalanceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.spendableBalance !== "") {
      writer.uint32(10).string(message.spendableBalance);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySpendableBalanceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpendableBalanceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.spendableBalance = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySpendableBalanceResponse>): QuerySpendableBalanceResponse {
    const message = createBaseQuerySpendableBalanceResponse();
    message.spendableBalance = object.spendableBalance ?? "";
    return message;
  },
  fromAmino(object: QuerySpendableBalanceResponseAmino): QuerySpendableBalanceResponse {
    const message = createBaseQuerySpendableBalanceResponse();
    if (object.spendable_balance !== undefined && object.spendable_balance !== null) {
      message.spendableBalance = object.spendable_balance;
    }
    return message;
  },
  toAmino(message: QuerySpendableBalanceResponse): QuerySpendableBalanceResponseAmino {
    const obj: any = {};
    obj.spendable_balance = message.spendableBalance ?? "";
    return obj;
  },
  fromAminoMsg(object: QuerySpendableBalanceResponseAminoMsg): QuerySpendableBalanceResponse {
    return QuerySpendableBalanceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySpendableBalanceResponseProtoMsg): QuerySpendableBalanceResponse {
    return QuerySpendableBalanceResponse.decode(message.value);
  },
  toProto(message: QuerySpendableBalanceResponse): Uint8Array {
    return QuerySpendableBalanceResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySpendableBalanceResponse): QuerySpendableBalanceResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.QuerySpendableBalanceResponse",
      value: QuerySpendableBalanceResponse.encode(message).finish()
    };
  }
};