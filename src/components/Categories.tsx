import React, { useEffect, useState } from "react";
import movieService from "../services/MovieService";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { baseApi } from "../services/MovieService";
import { toast } from "react-toastify";
import { MovieType } from "../types/Types";
import { useDispatch, useSelector } from "react-redux";
import { setfilteredMovies, setMovies } from "../redux/appSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

function Categories() {
  const [categories, setCategories] = useState<string[]>();
  const [filter, setFilter] = useState<string>("");
  const { filteredmovies } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getCategories = () => {
    const genreValues = Object.values(movieService.genres);
    setCategories(genreValues);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getMoviesByCategory = async (key: string) => {
    try {
      const response = await baseApi(`/3/movie/${key}?language=en-US&page=1`);
      dispatch(setfilteredMovies(response.data.results))
      console.log(filteredmovies)
    } catch (error) {
      toast.error("Error fetching movies");
    }
  };

  useEffect(() => {
    if (filter) {
      const categoryKey = Object.entries(movieService.genres).find(
        ([key, value]) => value === filter
      )?.[0];

      if (categoryKey) {
        getMoviesByCategory(categoryKey);
      }
      console.log(categoryKey)
    }
  }, [filter]);

  const handleCategoryClick = async (category: string) => {
    setFilter(category);

    const categoryKey = Object.entries(movieService.genres).find(
      ([key, value]) => value === category
    )?.[0];

    if (categoryKey) {
      await getMoviesByCategory(categoryKey);
    }
    if (filteredmovies.length > 5) {
      navigate(`filtered/${category}`);
    }
  };


  return (
    <div className="categories">
      <h3 className="category-title">Filtrele</h3>
      <FormGroup sx={{ display: "flex" }}>
        {categories &&
          categories.map((category: string, index: number) => (
            <button
              style={{ margin: "10px" }}
              className="category-button"
              key={index}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
      </FormGroup>
    </div>
  );
}

export default Categories;
