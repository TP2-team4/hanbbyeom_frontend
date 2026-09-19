import {useCallback, useEffect, useRef, useState} from "react";

export function useAsync<T>(
    fetchFn: () => Promise<T>,
    initialValue: T,
    deps: unknown[],
    errorMessage: string,
) {
    const [data, setData] = useState<T>(initialValue);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const requestId = useRef(0);

	const load = useCallback(async () => {

		const currentRequest = ++requestId.current;
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetchFn();
			if(currentRequest === requestId.current){
				setData(response);
			}
		} catch (e) {
			if(currentRequest === requestId.current){
				setError(e instanceof  Error ? e.message : errorMessage);
			}
		} finally {
			if(currentRequest === requestId.current) setIsLoading(false);
		}
	},deps)

    useEffect(() => {
		void load();
        return () => {
            requestId.current += 1;
        };
    }, [load]);

    return {data, setData, isLoading, error , refetch : load};
}
