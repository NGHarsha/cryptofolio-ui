import { Coin } from './Coin';

export interface Transaction extends Coin {
  value: number;
  volume: number;
  name: string;
  symbol: string;
  image: string;
  portfolio: string;
  investment: number;
  atprice: number;
  pandl: number;
}
