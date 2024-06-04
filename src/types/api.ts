import { long } from "aws-sdk/clients/cloudfront";

export type SignUpRequest = {
  email: string;
  password: string;
  nickname: string;
  profileImageUri: string;
  description: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  id: string;
}

export type ProfileUpdateRequest = {
  password: string;
  nickname: string;
  description?: string;
  profileImageUri?: string;
};

export type Profile = {
  id: string;
  email: string;
  nickname: string;
  profileImage?: string;
  description?: string;
};

export type Exchange = {
  id: number;
  nameKor: string;
  nameEng: string;
  logo: string;
};

export type Token = {
  id: string;
  nameKo: string;
  nameEng: string;
  logo: string;
};

export type ExchangeConnection = {
  id: long;
  exchange: Exchange;
  accessKey: string;
  secretKey: string;
};

export type ConnectExchangeRequest = {
  exchangeId: number;
  accessKey: string;
  secretKey: string;
};

export type DisconnectExchangeRequest = {
  exchangeConnectionId: number;
};

export type AIResult = {
  generation: string;
};

export type Asset = {
  id: number;
  token: Token;
  amount: number;
  exchange: Exchange;
};

export type AssetSnapshot = {
  id: number;
  amount: string;
  timestamp: string;
};

export type Transaction = {
  id: number;
  exchange: Exchange;
  status: number;
  fromTokenId: string;
  toTokenId: string;
  fromAmount: string;
  toAmount: string;
  timeStamp: number;
};

export type DepositAndWithdraw = {
  id: number;
  exchange: Exchange;
  tokenId: string;
  timeStamp: number;
  amount: string;
  type: number;
};

export type TotalAssetHistoryResponse = {
  assets: Asset[];
  snapshots: AssetSnapshot[];
  transactions: Transaction[];
  depositAndWithdraws: DepositAndWithdraw[];
};

export type Binance24hrTickerPrice = {
  symbol: string;
  lastPrice: string;
};
