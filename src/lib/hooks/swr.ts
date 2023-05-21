import swr from 'swr';

export const useSWR = <T>(
  url: string,
  init?: RequestInit | undefined,
  customFetcher?: (url: string) => Promise<T>
) => {
  const fetcher = (url: string) => {
    return fetch(url, init).then((r) => r.json());
  };

  return swr<T, Error>(url, customFetcher || fetcher);
};
