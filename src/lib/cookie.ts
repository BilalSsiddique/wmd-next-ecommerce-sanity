import Cookies from "js-cookie";

const USER_ID_KEY = "dineMarketUserId";

export function setUser(identifier: string) {
  Cookies.set(USER_ID_KEY, identifier, { expires: 365 });
}

export function getUser(): string | undefined {
  return Cookies.get(USER_ID_KEY);
}
