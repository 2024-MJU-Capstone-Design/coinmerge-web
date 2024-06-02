import { getExchanges, getTokenPrices, getTokens } from "@/modules/apis";
import { GET_PRICE_TOKENS } from "@/modules/constants";
import { Binance24hrTickerPrice, Exchange, Token } from "@/types/api";
import { create } from "zustand";

interface AppState {
  exchanges: Exchange[];
  tokenPrices: Binance24hrTickerPrice[];
  loadingAppState: boolean;
}

interface AppAction {
  loadAppState(): Promise<void>;
}

export const useAppStore = create<AppState & AppAction>((set) => ({
  exchanges: [],
  loadingAppState: false,
  tokenPrices: [],
  loadAppState: async () => {
    set({
      loadingAppState: true,
    });

    const exchanges = await getExchanges();
    const tokenPrices = (await getTokenPrices(GET_PRICE_TOKENS)).map(
      (price) => {
        return {
          lastPrice: price.lastPrice,
          symbol: price.symbol.replace("USDT", ""),
        };
      }
    );

    set({
      exchanges,
      loadingAppState: false,
      tokenPrices: tokenPrices.concat({
        symbol: "USDT",
        lastPrice: "1",
      }),
    });
  },
}));
