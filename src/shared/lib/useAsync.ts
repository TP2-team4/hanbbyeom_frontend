import { useEffect, useState } from "react";

export function useAsync<T>(
	fetchFn: () => Promise<T>,
	initialValue: T,
	deps: unknown[],
	errorMessage: string,
) {
	const [data, setData] = useState<T>(initialValue);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isActive = true;

		const load = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await fetchFn();
				if (isActive) setData(response);
			} catch {
				if (isActive) setError(errorMessage);
			} finally {
				if (isActive) setIsLoading(false);
			}
		};

		void load();

		return () => {
			isActive = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

	return { data, setData, isLoading, error };
}
