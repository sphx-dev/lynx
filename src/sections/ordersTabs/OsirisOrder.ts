export type OsirisOrder = {
  order: MessageOrder;
  partials: OsirisOrderPartial[];
};

export type MessageOrder = {
  /*
Go implementation:
type Message struct {
	ID                    int64     `gorm:"primaryKey" json:"id"`
	Height                int64     `gorm:"column:height" json:"height"`
	Hash                  string    `gorm:"column:hash" json:"hash"`
	User                  string    `gorm:"column:user" json:"user"`
	Type                  string    `gorm:"column:type" json:"type"`
	OrderIDChain          string    `gorm:"column:order_id_chain" json:"order_id_chain"`
	OrderIDOrderBook      string    `gorm:"column:order_id_ob" json:"order_id_ob"`
	MarginAccountAddress  string    `gorm:"column:margin_account_address" json:"margin_account_address"`
	Side                  string    `gorm:"column:side" json:"side"`
	Price                 string    `gorm:"column:price" json:"price"`
	MarketID              string    `gorm:"column:market_id" json:"market_id"`
	Leverage              string    `gorm:"column:leverage" json:"leverage"`
	Quantity              string    `gorm:"column:quantity" json:"quantity"`
	AccountID             string    `gorm:"column:account_id" json:"account_id"`
	OrderType             string    `gorm:"column:order_type" json:"order_type"`
	TriggerPrice          string    `gorm:"column:trigger_price" json:"trigger_price"`
	Timestamp             time.Time `gorm:"column:timestamp" json:"timestamp"`
	IsFinal               bool      `gorm:"column:is_final" json:"is_final"`
	IsFinalOnChain        bool      `gorm:"column:is_final_onchain" json:"is_final_onchain"`
	FinalTxHash           *string   `gorm:"column:final_tx_hash" json:"final_tx_hash"`
	FinalOrderID          string    `gorm:"column:final_order_id" json:"final_order_id"`
	IsCanceled            bool      `gorm:"column:is_canceled" json:"is_canceled"`
	CanceledTxHash        *string   `gorm:"column:canceled_tx_hash" json:"canceled_tx_hash"`
	IsConfirmed           bool      `gorm:"column:is_confirmed" json:"is_confirmed"`
	IsConfirmedRetryCount int       `gorm:"column:is_confirmed_retry_count" json:"is_confirmed_retry_count"`
	IsInvalid             bool      `gorm:"column:is_invalid" json:"is_invalid"`
	IsInvalidErr          *string   `gorm:"column:is_invalid_err" json:"is_invalid_err"`
}
*/
  id: number;
  height: number;
  hash: string;
  user: string;
  type: string;
  orderIdChain: string;
  orderIdOrderBook: string;
  marginAccountAddress: string;
  side: string;
  price: string;
  marketId: string;
  leverage: string;
  quantity: string;
  accountId: string;
  orderType: string;
  triggerPrice: string;
  timestamp: string;
  isFinal: boolean;
  isFinalOnChain: boolean;
  finalTxHash: string | null;
  finalOrderId: string;
  isCanceled: boolean;
  canceledTxHash: string | null;
  isConfirmed: boolean;
  isConfirmedRetryCount: number;
  isInvalid: boolean;
  isInvalidErr: string | null;
};

export type OsirisOrderPartial = {
  /*
Go implementation:
type MessageExecuteOrder struct {
	ID                 int64     `gorm:"primaryKey" json:"id"`
	Hash               string    `gorm:"column:hash" json:"hash"`
	Height             int64     `gorm:"column:height" json:"height"`
	ExecurionAuthority string    `gorm:"column:execution_authority" json:"execution_authority"`
	PositionID         string    `gorm:"column:position_id" json:"position_id"`
	OrderID            string    `gorm:"column:order_id" json:"order_id"`
	FillType           string    `gorm:"column:fill_type" json:"fill_type"`
	Quantity           string    `gorm:"column:quantity" json:"quantity"`
	Price              string    `gorm:"column:price" json:"price"`
	Leverage           string    `gorm:"column:leverage" json:"leverage"`
	Timestamp          time.Time `gorm:"column:timestamp" json:"timestamp"`
	OrderType          string    `gorm:"column:order_type" json:"order_type"`
}
*/
  id: number;
  hash: string;
  height: number;
  executionAuthority: string;
  positionId: string;
  orderId: string;
  fillType: string;
  quantity: string;
  price: string;
  leverage: string;
  timestamp: string;
  orderType: string;
};
