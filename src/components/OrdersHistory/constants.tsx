//TODO: change <span> to components when data & designs will be clearer
export const mockColumns = [
  {
    accessorKey: "market",
    header: "Market",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "slide",
    header: "Slide",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "avgEntry",
    header: "Avg Entry",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "liqPrice",
    header: "Liq Price",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "marketMargin",
    header: "Market Margin",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "u&pl",
    header: "U&PL",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
]

export const mockData = [
  {
    market: "BTC/USDT",
    size: "0.001",
    slide: "0.001",
    avgEntry: "0.001",
    liqPrice: "0.001",
    marketMargin: "0.001",
    "u&pl": "0.001",
  },
]
