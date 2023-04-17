import "./App.css";
import CasinoIcon from "@mui/icons-material/Casino";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import StadiumIcon from "@mui/icons-material/Stadium";
import MoneyIcon from "@mui/icons-material/Money";
import { useAxios } from "./hooks/useAxios";
import { Dragon } from "./data/dragon";
import DragonCard from "./components/DragonCard";
import { useMemo } from "react";
import { Link } from "react-router-dom";
function App() {
  const { data, isLoading, errorMessage, refetch } = useAxios<Dragon[]>(
    "http://localhost:3001/dragon",
    {
      params: {
        limit: 3,
        hitPoints: "desc",
      },
    }
  );


  return (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Dungeons and Dragons
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            This is a dungoes and dragons game created for the Spirii challenge.
            Here you can:
            <List>
              <ListItem disablePadding component={Link} to="/dragons">
                <ListItemButton>
                  <ListItemIcon>
                    <TravelExploreIcon />
                  </ListItemIcon>
                  <ListItemText primary="Find and pick your favorite dragon" />
                </ListItemButton>
              </ListItem>
            </List>
          </Typography>
        </Container>
      </Box>
      <Typography variant="h4" sx={{ textAlign: "center", m: 5 }}>
        Current strongest dragons
      </Typography>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        maxWidth="lg"
      >
        {/* Center the grid */}
        <Grid container sx={{ textAlign: "center" }}>
          {!isLoading && data.length > 0 ? (
            data.map((dragon) => (
              <DragonCard key={dragon.name} dragon={dragon} />
            ))
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Container>
    </main>
  );
}

export default App;
