import { StaticImageData } from "next/image";

export interface Exchange {
  name: string;
  logo: StaticImageData;
}

export interface Token {
  symbol: string;
  name: string;
  logo: StaticImageData;
  price: number;
}

export type ExchangeType = "binance" | "bithumb";
export type TokenType = "BTC" | "ETH" | "USDT" | "USDC" | "KLAY" | "ARB" | "SOL" | "XRP" | "AVAX";
export type TransactionType = "deposit" | "withdraw" | "swap";
