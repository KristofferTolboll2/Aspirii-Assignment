import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  Typography,
} from "@mui/material";
import React from "react";
import { Dragon } from "../data/dragon";

type Props = {
  dragon: Dragon;
};

export default function DragonCard({
  dragon: { name, hitpoints, attack, speed, intelligence, charisma },
}: Props) {
  const dragonInitials =
    name.split(" ")[1].charAt(0) + name.split(" ")[2].charAt(0);
  return (
    <Card sx={{ maxWidth: 345, p: 2, m: 3 }}>
      <CardMedia
        component="img"
        sx={{
          // 16:9
          height: 260,
        }}
        image={`https://ui-avatars.com/api/?name=${dragonInitials}`}
        alt="random"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography>
          <List>
            <li>Hit Points: {hitpoints}</li>
            <li>Attack: {attack}</li>
            <li>Charisma: {charisma}</li>
            <li>Intelligence: {intelligence}</li>
          </List>
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">Pick</Button>
        <Button size="small">Battle</Button>
      </CardActions>
    </Card>
  );
}
