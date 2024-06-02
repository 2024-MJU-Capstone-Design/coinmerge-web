import { getAssets, getExchangeConnections, getProfile } from "@/modules/apis";
import {
  ExchangeConnection,
  Profile,
  TotalAssetHistoryResponse,
} from "@/types/api";
import { create } from "zustand";
import BTCLogo from "../assets/images/logos/Bitcoin (BTC).png";
import ETHLogo from "../assets/images/logos/Ethereum (ETH).png";

interface UserState {
  isAuthenticated: boolean;
  profile: Profile | null;
  profileLoading: boolean;
  exchangeConnections: ExchangeConnection[];
  exchangeConnectionsLoading: boolean;
  assets: TotalAssetHistoryResponse | null;
}

interface UserAction {
  setProfile(profile: Profile | null): void;
  setProfileLoading(profileLoading: boolean): void;
  setExchangeConnections(exchangeConnections: ExchangeConnection[]): void;
  setIsAuthenticated(validUser: boolean): void;
  setAssets(assets: TotalAssetHistoryResponse): void;
  loadProfile(): Promise<void>;
  loadExchangeConnections(): Promise<void>;
  loadAssets(): Promise<void>;
}

export const useUserStore = create<UserState & UserAction>((set) => ({
  isAuthenticated: false,
  profile: null,
  profileLoading: false,
  exchangeConnections: [],
  exchangeConnectionsLoading: false,
  assets: null,
  setIsAuthenticated: (validUser: boolean) => {
    set({
      isAuthenticated: validUser,
    });
  },
  setProfile: (profile: Profile | null) => {
    set({
      profile,
    });
  },
  setProfileLoading: (profileLoading: boolean) => {
    set({
      profileLoading,
    });
  },
  loadProfile: async () => {
    set({
      profileLoading: true,
    });
    const profile = await getProfile();

    set({
      profile,
      profileLoading: false,
    });
  },
  loadExchangeConnections: async () => {
    set({
      exchangeConnectionsLoading: true,
    });
    const exchangeConnections = await getExchangeConnections();

    set({
      exchangeConnections,
      exchangeConnectionsLoading: false,
    });
  },
  setExchangeConnections: (exchangeConnections: ExchangeConnection[]) => {
    set({
      exchangeConnections,
    });
  },
  setAssets: async (assets: TotalAssetHistoryResponse) => {
    set({
      assets,
    });
  },
  loadAssets: async () => {
    const result = await getAssets();

    set({
      assets: result,
    });
  },
}));
