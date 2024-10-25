import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import logo from "../images/what.png";
import { FcSearch } from "react-icons/fc";
import { FaUserAstronaut } from "react-icons/fa";
import {
  filterMovies,
  setCurrentuser,
  setdrawer,
  setloading,
  setMovies,
} from "../redux/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import { MovieType } from "../types/Types";
import movieService from "../services/MovieService";
import { IoMdHome } from "react-icons/io";

function Navbar() {
  const [anchorElacc, setanchorElacc] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.app);
  const [searchValue, setSearchValue] = useState<string>("");
  const openControl = anchorElacc ? true : false;

  const openAccount = (e: any) => {
    setanchorElacc(e.currentTarget);
  };

  const closeAccount = () => {
    setanchorElacc(null);
  };

  const handleFilter = async () => {
    try {
      dispatch(setloading(true));
      if (searchValue) {
        dispatch(filterMovies(searchValue));
      } else {
        const response: MovieType[] = await movieService.getMovies();
        dispatch(setMovies(response));
      }
    } catch (error) {
      toast.error("Hata oluştu.");
    } finally {
      dispatch(setloading(false));
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#0e3057" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 70,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          />
          <Typography
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button onClick={() => navigate("/")}>
              <img
                className="navbar-logo"
                src={logo}
                style={{ width: 190, height: 90, marginRight: 10 }}
              />
            </Button>
            <div className="search-box">
              <InputBase
                sx={{
                  ml: 3,
                  flex: 1,
                  minWidth: "15px",
                  marginLeft: "5px",
                  color: "#fff",
                }}
                placeholder="Ne arıyorsunuz?"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setSearchValue(e.target.value)
                }
              />
              <Tooltip title="ARA" placement="top">
                <Button color="error" onClick={handleFilter}>
                  <FcSearch style={{ fontSize: "26px", cursor: "pointer" }} />
                </Button>
              </Tooltip>
            </div>
          </Typography>

          <Stack direction="row" spacing={2}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => navigate("/")}
                size="large"
                sx={{
                  color: "#fff",
                  fontSize: "18px",
                  fontFamily:
                    "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                }}
              >
                <IoMdHome style={{ fontSize: "25px" }} />
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => navigate("/movies")}
                size="large"
                sx={{
                  color: "#fff",
                  fontSize: "18px",
                  fontFamily:
                    "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                }}
              >
                TÜM FİLMLER
              </Button>
            </div>

            <div className="user-account">
              <FaUserAstronaut
                onClick={openAccount}
                className="user-account"
                style={{ fontSize: "33px", color: "#b0cde3" }}
              />
            </div>
          </Stack>
          <Menu
            anchorEl={anchorElacc}
            open={openControl}
            onClose={closeAccount}
          >
            <MenuItem
              onClick={() => dispatch(setdrawer())}
              sx={{ backgroundColor: "#b0cde3" }}
            >
              Hesabım
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
