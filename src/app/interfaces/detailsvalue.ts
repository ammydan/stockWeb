export interface Detailsvalue {
    name: string;
    ticker: string;
    exchangeCode: string;
    description: string;
    volume: number;
    prevClose: number;
    open: number | null;
    last: number | null;
    high: number | null;
    low: number | null;
    mid: number | null;
    askSize: number | null;
    askPrice: number | null;
    bidSize: number | null;
    bidPrice: number | null;
    startDate: string;
    endDate: string;
    timestamp: string;
    change: number;
    changePercent: number;
}
