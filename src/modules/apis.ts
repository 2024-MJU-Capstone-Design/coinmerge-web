import {
  AIResult,
  Asset,
  Binance24hrTickerPrice,
  ConnectExchangeRequest,
  DisconnectExchangeRequest,
  Exchange,
  ExchangeConnection,
  Profile,
  ProfileUpdateRequest,
  SignInRequest,
  SignUpRequest,
  Token,
  TotalAssetHistoryResponse,
} from "@/types/api";
import { API_BASE_URL } from "./constants";
import { IError, globalErrorHandler } from "./globalErrorHandler";

async function baseFetch<T>(path: string, request?: RequestInit): Promise<T> {
  try {
    const result = await fetch(`${API_BASE_URL}/${path}`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...request?.headers,
      },
      ...request,
    });

    const resultJson = await result.json();

    if (!result.ok) {
      throw {
        statusCode: result.status,
        ...resultJson,
      };
    }

    return resultJson;
  } catch (error: unknown) {
    globalErrorHandler(error as IError);
    throw error;
  }
}

export async function signUp(data: SignUpRequest) {
  try {
    const result = await baseFetch("member", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return result;
  } catch (error) {
    throw error;
  }
}

export async function signIn(data: SignInRequest) {
  try {
    const result = await baseFetch<Profile>("login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getProfile() {
  try {
    const result = await baseFetch<Profile>("profile", {
      method: "GET",
    });

    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateProfile(newProfile: ProfileUpdateRequest) {
  try {
    const result = await baseFetch<Profile>("member", {
      method: "PUT",
      body: JSON.stringify(newProfile),
    });

    return result;
  } catch (error) {
    throw error;
  }
}

export async function checkAuth(cookie: string) {
  try {
    const result = await baseFetch<CheckAuthResponse>("session", {
      method: "GET",
      headers: {
        Cookie: cookie,
      },
      credentials: "include",
    });

    return result;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const result = await baseFetch<boolean>("logout", {
      method: "GET",
    });

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getExchangeConnections() {
  try {
    const result = await baseFetch<ExchangeConnection[]>(
      "exchangeConnections",
      {
        method: "GET",
      }
    );

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getExchanges() {
  try {
    const result = await baseFetch<Exchange[]>("exchanges", {
      method: "GET",
    });

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getTokens() {
  try {
    const result = await baseFetch<Token[]>("tokens", {
      method: "GET",
    });

    return result;
  } catch (error) {
    throw error;
  }
}

export async function connectExchange(request: ConnectExchangeRequest) {
  try {
    const result = await baseFetch<ExchangeConnection[]>("exchangeConnection", {
      method: "POST",
      body: JSON.stringify(request),
    });

    return result;
  } catch (error) {
    throw error;
  }
}

export async function disconnectExchange(request: DisconnectExchangeRequest) {
  try {
    const result = await baseFetch<ExchangeConnection[]>(
      `exchangeConnection?id=${request.exchangeConnectionId}`,
      {
        method: "DELETE",
      }
    );

    return result;
  } catch (error) {
    throw error;
  }
}

export async function promptAI(message: string) {
  try {
    const result = await baseFetch<AIResult>(`ai/prompt?message=${message}`, {
      method: "GET",
    });

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getAssets() {
  try {
    const result = await baseFetch<TotalAssetHistoryResponse>("assets", {
      method: "GET",
    });

    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateAssets() {
  try {
    const result = await baseFetch<TotalAssetHistoryResponse>("assets", {
      method: "POST",
    });

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getTokenPrices(
  tokens: string[]
): Promise<Binance24hrTickerPrice[]> {
  try {
    const url = `https://api.binance.com/api/v3/ticker/24hr`;

    const prameters = `%5B${tokens.reduce(
      (accumulator, currentValue, index) => {
        if(index == tokens.length - 1) {
          return accumulator + `"${currentValue}"`
        }else {
          return accumulator + `"${currentValue}",`;
        }
      },
      ""
    )}%5D`;
    const result = await fetch(url + `?symbols=${prameters}`, {
      method: "GET",
    });

    const resultJson = result.json();

    return resultJson;
  } catch (error) {
    throw error;
  }
}
