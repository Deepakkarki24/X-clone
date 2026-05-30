const trimTrailingSlash = (url: string) => url.replace(/\/$/, "");

export const getApiBaseUrl = (): string =>
  trimTrailingSlash(import.meta.env.VITE_API_URL ?? "");

export const getPublicImageUrl = (filename: string): string =>
  `${getApiBaseUrl()}/public/images/${filename}`;
