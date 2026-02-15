import { useState, useEffect } from "react";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    callback?.();
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
          { signal: controller.signal },
        );

        const data = await res.json();

        if (data.Response === "False") throw new Error(data.Error);

        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();

    return () => controller.abort();
  }, [query, apiKey]);

  return { movies, isLoading, error };
}
