import { Exchange, ExchangeType, Token, TokenType } from "./types";

import BinanceLogo from "../assets/images/binance.png";
import BithumbLogo from "../assets/images/bithumb.png";
import USDCLogo from "../assets/images/logos/USD Coin (USDC).png";
import BTCLogo from "../assets/images/logos/Bitcoin (BTC).png";
import ETHLogo from "../assets/images/logos/Ethereum (ETH).png";
import USDTLogo from "../assets/images/logos/Tether (USDT).png";


export const EXCHANGES: {[key in ExchangeType]: Exchange} = {
  binance: {
    name: "Binance",
    logo: BinanceLogo,
  },
  bithumb: {
    name: "Bithumb",
    logo: BithumbLogo,
  },
};

export const TOKENS: {[key in TokenType]: Token} = {
  BTC: {
    symbol: "BTC",
    name: "Bitcoin",
    logo: BTCLogo,
    price: 69100.24,
  },
  ETH: {
    symbol: "ETH",
    name: "Ethereum",
    logo: ETHLogo,
    price: 3300.12,
  },
  USDC: {
    symbol: "USDC",
    name: "USD Coin",
    logo: USDCLogo,
    price: 1.00,
  },
  USDT: {
    symbol: "USDT",
    name: "Tether",
    logo: USDTLogo,
    price: 1.00,
  }
}
