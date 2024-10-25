import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setloading, setMovies } from "../redux/appSlice";
import { Genre, MovieType } from "../types/Types";
import movieService from "../services/MovieService";
import { toast } from "react-toastify";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";

function RecommendMovie() {
  const { currentMovie, movies } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const [randomMovies, setRandomMovies] = useState<MovieType[]>();
  const navigate = useNavigate();

  const getRandomMovies = async () => {
    try {
      dispatch(setloading(true));
      const response: MovieType[] = await movieService.getMovies();

      if (response) {
        dispatch(setMovies(response));

        if (
          currentMovie &&
          currentMovie.genres &&
          Array.isArray(currentMovie.genres)
        ) {
          const currentMovieGenreIds = currentMovie.genres.map(
            (genre) => genre.id
          );

          const filteredMovies = response.filter(
            (movie) =>
              movie.genre_ids &&
              Array.isArray(movie.genre_ids) &&
              movie.genre_ids.some((id) => currentMovieGenreIds.includes(id))
          );

          const randomMovies: MovieType[] = [];
          const filteredMoviesCopy = [...filteredMovies];

          while (randomMovies.length < 4 && filteredMoviesCopy.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * filteredMoviesCopy.length
            );
            const randomMovie = filteredMoviesCopy[randomIndex];

            // Eğer seçilen rastgele film, detay sayfasındaki filmlerden biriyle aynı değilse randomMovies'e ekle
            if (!randomMovies.some((movie) => movie.id === randomMovie.id)) {
              randomMovies.push(randomMovie);
            }

            filteredMoviesCopy.splice(randomIndex, 1);
          }

          setRandomMovies(randomMovies);
          localStorage.setItem("randomMovies", JSON.stringify(randomMovies));
        }
      }
    } catch (error) {
      toast.error(error + "Hata oluştu");
    } finally {
      dispatch(setloading(false));
    }
  };

  useEffect(() => {
    getRandomMovies();
  }, []);

  const handleMovieClick = (movieId: number) => {
    navigate(`/details/${movieId}`);
  };
  return (
    <div style={{ marginTop: "30px" }}>
      <h2
        className="recommend-movie"
        style={{
          alignItems: "center",
          width: "600px",
          textAlign: "center",
          justifyContent: "center",
          height: "2px",
          color: "#eaf4ffe4",
        }}
      >
        Bunları da beğenebilirsin!
      </h2>

      <div className="recommends">
        {randomMovies &&
          randomMovies.map((movie: MovieType, index: number) => (
            <div
              onClick={() => handleMovieClick(movie.id)}
              className="detail-recommend"
            >
              <MovieCard key={index} movie={movie} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecommendMovie;
