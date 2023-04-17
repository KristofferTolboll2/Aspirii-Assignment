import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, Router, Routes } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import Dragons from "./dragons/Dragons";
import Arena from "./arena/Arena";
import BattleLog from "./battle-log/BattleLog";
import { ThemeProvider } from "@emotion/react";
import {
  AppBar,
  Button,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <IconButton style={{ color: "white" }} component={Link} to="/">
            <CasinoIcon sx={{ mr: 2 }} />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            Dungeons and Dragons
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<App />} index />
        <Route path="dragons" element={<Dragons />} />
        <Route path="arena" element={<Arena />} />
        <Route path="battle-log" element={<BattleLog />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
