import { Transaction } from './Transaction';

export interface Portfolio {
  investment: number;
  name: string;
  transactions: Transaction[];
  id: string;
  isPrimary: boolean;
  balance: number;
  bestPerformer: Transaction;
  worstPerformer: Transaction;
}
