import { Exchange, ExchangeType, Token, TokenType } from "../types/domain";

import BinanceLogo from "../assets/images/binance.png";
import BithumbLogo from "../assets/images/bithumb.png";
import USDCLogo from "../assets/images/logos/USD Coin (USDC).png";
import BTCLogo from "../assets/images/logos/Bitcoin (BTC).png";
import ETHLogo from "../assets/images/logos/Ethereum (ETH).png";
import USDTLogo from "../assets/images/logos/Tether (USDT).png";
import KLAYLogo from "../assets/images/logos/KLAY.png";
import ARBLogo from "../assets/images/logos/ARB.png";
import XRPLogo from "../assets/images/logos/XRP.png";
import SOLLogo from "../assets/images/logos/SOL.png";
import AVAXLogo from "../assets/images/logos/avax.png";


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
  },
  KLAY: {
    symbol: "KLAY",
    name: "Klaytn",
    logo: KLAYLogo,
    price: 1.00,
  },
  ARB: {
    symbol: "ARB",
    name: "Arbitrum",
    logo: ARBLogo,
    price: 1.00,
  },
  XRP: {
    symbol: "XRP",
    name: "Ripple",
    logo: XRPLogo,
    price: 1.00,
  },
  SOL: {
    symbol: "SOL",
    name: "Solana",
    logo: SOLLogo,
    price: 1.00,
  },
  AVAX: {
    symbol: "AVAX",
    name: "Avalanche",
    logo: AVAXLogo,
    price: 1.00,
  }
}

export const GLOBAL_ERROR_MESSAGE = {
  FAIL_REQUEST_API: "요청에 실패하였습니다.",
  NO_AUTHORIZATION: "권한이 없습니다.",
  SESSION_EXPIRE: "세션이 만료되었습니다. 다시 로그인 해주세요.",
}

export const DEFAULT_USER_PROFILE_URI = "https://coinmerge.s3.ap-northeast-2.amazonaws.com/default-avatar.png";
export const API_BASE_URL = "http://ec2-13-124-254-8.ap-northeast-2.compute.amazonaws.com";
export const APP_BASE_URL = "http://localhost:3000";

export const GET_PRICE_TOKENS = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "KLAYUSDT", "AVAXUSDT", "ARBUSDT"];