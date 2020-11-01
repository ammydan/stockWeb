export interface Market {
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
  timestamp: string;
  color: string;
  up: boolean;
  down: boolean;
  change: number;
  changePercent: number;
}
