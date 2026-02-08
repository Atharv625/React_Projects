import { title } from "framer-motion/client";
import { useEffect, useState } from "react";

import StarRating from "./Component/StarRating";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.length === 0 ? 0 : arr.reduce((acc, cur) => acc + cur, 0) / arr.length;

const apiKey = import.meta.env.VITE_OMDB_API_KEY;

export default function App() {
  const [movies, setMovies] = useState([]);
   const [watched, setWatched] = useState(() => {
     const stored = localStorage.getItem("watched");
     return stored ? JSON.parse(stored) : tempWatchedData;
   });
  const [isOpen1, setIsOpen1] = useState(true);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState();
    function handleAddWatched(movie) {
      setWatched((watched) => [...watched, movie]);
      setSelectedId(null); // close details view
    }
    useEffect(() => {
      localStorage.setItem("watched", JSON.stringify(watched));
    }, [watched]);

  useEffect(() => {
    async function fetchMovies() {
      if (query.length < 3) {
        setMovies([]);
        setIsLoading(false);
        setError("");
        return;
      }

      try {
        setError("");
        setIsLoading(true);
        // ✅ START loader

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
        );
        const data = await res.json();

        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError("Something went wrong");
        }
      } catch (err) {
        console.error(err);
        setMovies([]);
      } finally {
        setIsLoading(false); // ✅ ALWAYS stop loader
      }
    }

    fetchMovies();
  }, [query]);

  // console.log(apiKey);

  const avgImdbRating = average(watched.map((m) => m.imdbRating));
  const avgUserRating = average(watched.map((m) => m.userRating));
  const avgRuntime = average(watched.map((m) => m.runtime));

  return (
    <>
      <Nav movies={movies} query={query} setQuery={setQuery} />
      <Main
        movies={movies}
        watched={watched}
        isOpen1={isOpen1}
        setIsOpen1={setIsOpen1}
        avgImdbRating={avgImdbRating}
        avgUserRating={avgUserRating}
        avgRuntime={avgRuntime}
        isLoading={isLoading}
        isError={error}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        onAddWatched={handleAddWatched}
      />
    </>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Nav({ movies, query, setQuery }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      <NumResults movies={movies} />
    </nav>
  );
}

function NumResults({ movies }) {
  return (
    <>
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </>
  );
}
function Logo() {
  return (
    <div className="logo mr-2">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Main({
  movies,
  watched,
  isOpen1,
  setIsOpen1,
  avgImdbRating,
  avgUserRating,
  avgRuntime,
  isLoading,
  isError,
  selectedId,
  setSelectedId,
  onAddWatched,
}) {
  return (
    <main className="main">
      <ListBox
        movies={movies}
        isOpen={isOpen1}
        onToggle={() => setIsOpen1((open) => !open)}
        isLoading={isLoading}
        isError={isError}
        onSelectMovie={setSelectedId}
      />

      {selectedId ? (
        <SelectedMovie
          selectedId={selectedId}
          onClose={() => setSelectedId(null)}
          onAddWatched={onAddWatched}
        />
      ) : (
        <WatchBox
          watched={watched}
          avgImdbRating={avgImdbRating}
          avgUserRating={avgUserRating}
          avgRuntime={avgRuntime}
          setSelectedId={setSelectedId}
        />
      )}
    </main>
  );
}


function ListBox({
  movies,
  isOpen,
  onToggle,
  isLoading,
  isError,
  onSelectMovie,
}) {
  return (
    <div className="box">
      <button className="btn-toggle" onClick={onToggle}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        <>
          {isLoading && <Loader />}
          {!isLoading && isError && <Error />}
          {!isLoading && !isError && (
            <MovieList movies={movies} onSelectMovie={onSelectMovie} />
          )}
        </>
      )}
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list">
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <p>
        <span>🗓</span> {movie.Year}
      </p>
    </li>
  );
}

function WatchBox({
  watched,
  avgImdbRating,
  avgUserRating,
  avgRuntime,
  setSelectedId,
}) {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => {
          setIsOpen2((open) => !open);
        }}
      >
        {isOpen2 ? "–" : "+"}
      </button>

      {isOpen2 && (
        <>
          <div className="summary">
            <h2>Movies you watched</h2>
            <div>
              <p>
                <span>#️⃣</span>
                <span>{watched.length} movies</span>
              </p>
              <p>
                <span>⭐️</span>
                <span>{avgImdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{avgUserRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
              </p>
            </div>
          </div>
          <ul className="list">
            {watched.map((movie) => (
              <li key={movie.imdbID}>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                <h3>{movie.Title}</h3>
                <div>
                  <p>⭐️ {movie.imdbRating}</p>
                  <p>🌟 {movie.userRating}</p>
                  <p>⏳ {movie.runtime} min</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
function Loader() {
  return <p className="loader">Loading...</p>;
}

function Error() {
  return (
    <p className="text-4xl flex justify-center items-center">
      {" "}
      ⚔️ Movie Not Found🚩
    </p>
  );
}
function SelectedMovie({ selectedId, onClose, onAddWatched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);

  const {
    Title: title,
    Poster: poster,
    Runtime: runTime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  function handleAdd() {
    const newMovie = {
      imdbID: selectedId,
      Title: title,
      Year: released?.split(" ").at(-1),
      Poster: poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runTime.split(" ").at(0)),
      userRating,
    };

    onAddWatched(newMovie);
  }
  useEffect(() => {
    const controller = new AbortController();

    async function getMovieDetails() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`,
          { signal: controller.signal },
        );
        const data = await res.json();

        if (data.Response === "False") throw new Error(data.Error);

        setMovie(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();
    return () => controller.abort();
  }, [selectedId]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (isLoading) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <div className="box details">
      <header className="details-header flex gap-6">
        <button className="btn-toggle" onClick={onClose} aria-label="Go back">
          &larr;
        </button>

        <img
          src={poster}
          alt={`Poster of ${title}`}
          className="w-1/3 rounded-lg object-cover"
        />

        <div className="details-overview space-y-2">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-sm text-gray-300">
            {released} • {runTime}
          </p>
          <p className="text-sm text-gray-300">{genre}</p>
          <p className="font-semibold">⭐ {imdbRating}</p>
        </div>
      </header>

      <section className="p-6 space-y-4">
        <div className="rating">
          <StarRating
            maxRating={10}
            value={userRating}
            onChange={setUserRating}
          />
          {userRating > 0 && (
            <button className="btn-add" onClick={handleAdd}>
              + Add to list{" "}
            </button>
          )}
        </div>

        <p className="text-sm leading-relaxed">
          <em>{plot}</em>
        </p>

        <p className="text-sm">
          <span className="text-gray-400">Starring:</span> {actors}
        </p>

        <p className="text-sm">
          <span className="text-gray-400">Directed by:</span> {director}
        </p>
      </section>
    </div>
  );
}

