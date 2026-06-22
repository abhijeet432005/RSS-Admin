import { useCallback, useEffect, useState } from 'react';

/**
 * Wraps an async fetcher(signal) function with loading/error/data state.
 *
 * `depsKey` should be a primitive (string/number) that changes whenever the
 * fetch should re-run — e.g. a record id, or a static key for a list page.
 * `fetcher` should be a stable function reference (wrap it in `useCallback`
 * at the call site) since it's used directly inside this hook's effect.
 *
 * Loading is derived (not set synchronously in the effect body) by
 * comparing the request key the current result belongs to against the
 * request key that's currently "wanted" — this keeps the effect itself
 * free of direct setState calls outside of async callbacks.
 */
export default function useApiData(fetcher, depsKey) {
  const [result, setResult] = useState({ data: null, error: null, key: null });
  const [reloadToken, setReloadToken] = useState(0);
  const requestKey = `${depsKey}::${reloadToken}`;

  useEffect(() => {
    const controller = new AbortController();

    fetcher(controller.signal).then(
      (data) => setResult({ data, error: null, key: requestKey }),
      (error) => {
        if (error.name !== 'AbortError') {
          setResult({ data: null, error, key: requestKey });
        }
      }
    );

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey]);

  const loading = result.key !== requestKey;
  const refetch = useCallback(() => setReloadToken((t) => t + 1), []);

  return {
    data: result.data,
    error: loading ? null : result.error,
    loading,
    refetch,
  };
}
