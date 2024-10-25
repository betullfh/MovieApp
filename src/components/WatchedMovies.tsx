import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { setCurrentuser, setWatchedMovies } from "../redux/appSlice";
import { MovieDetailType, UserType } from "../types/Types";
import { Container } from "@mui/material";
import LikedMovieCard from "./LikedMovieCard";

function WatchedMovies() {
  const { watchedMovies } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMovieClick = (movieId: number) => {
    navigate(`/details/${movieId}`);
  };

  useEffect(() => {
    dispatch(setWatchedMovies(watchedMovies));
  }, []);

  useEffect(() => {
    const result = localStorage.getItem("currentUser");
    if (result) {
      const currentUser: UserType = JSON.parse(result) as UserType;
      dispatch(setCurrentuser(currentUser));
    }
  }, [dispatch]);
  return (
    <Container maxWidth="xl">
      <div style={{ border: "3px solid gray", width: "300px", padding:"10px", borderTop:"0px", borderRight:"0px", borderLeft:"0px"}}>
        <h2
          className="recommend-movie"
          style={{
            alignItems: "center",
            width: "500px",
            textAlign: "center",
            justifyContent: "start",
            height: "1px",
            color: "#eaf4ffe4",
            margin: "30px",
          }}
        >
          İzlediklerim
        </h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }} className="all-movies">
        {watchedMovies &&
          watchedMovies.map((movie: MovieDetailType, index: number) => (
            <div
              onClick={() => handleMovieClick(movie.id)}
              key={index}
              style={{ margin: "0px 30px" }}
            >
              <LikedMovieCard likedmovie={movie} />
            </div>
          ))}
      </div>
    </Container>
  );
}

export default WatchedMovies;
