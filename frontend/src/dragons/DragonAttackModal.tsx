import {
  CircularProgress,
  Container,
  Dialog,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {
  selectedDragon: string;
  isOpen: boolean;
  onClose: () => void;
};

const getDiceImage = (diceRoll: number) => {
  switch (diceRoll) {
    case 1:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Dice-1-b.svg/1024px-Dice-1-b.svg.png";
    case 2:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Dice-2-b.svg/1024px-Dice-2-b.svg.png";
    case 3:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Dice-3-b.svg/1024px-Dice-3-b.svg.png";
    case 4:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Dice-4-b.svg/1024px-Dice-4-b.svg.png";
    case 5:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Dice-5-b.svg/1024px-Dice-5-b.svg.png";
    case 6:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Dice-6-b.svg/1024px-Dice-6-b.svg.png";
  }
};

interface AttackResponse {
  diceRolls: [number, number];
  modifier: number;
  total: number;
}

export default function DragonAttackModal({
  onClose,
  isOpen,
  selectedDragon,
}: Props) {
  const [response, setResponse] = useState<AttackResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dragonAttack = async () => {
    setIsLoading(true);
    const attackResponse = await axios.post("http://localhost:3001/dragon", {
      dragon: selectedDragon,
    });
    setIsLoading(false);
    if (attackResponse.data) {
      setResponse(attackResponse.data);
    }
  };
  useEffect(() => {
    if (isOpen) {
      dragonAttack();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Attack for {selectedDragon}</DialogTitle>
      {isLoading && <CircularProgress />}
      {response !== null && (
        <div>
          You rolled
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <p>{response.diceRolls[0]} of dice</p>
            <p>{response.diceRolls[1]} of dice</p>
          </Container>
          <Container sx={{ display: "flex", flexDirection: "column" }}>
            <p>
              <b>Your dragon scored {response.total}</b> in total. With a modier
              of {response.modifier}
            </p>
          </Container>
        </div>
      )}
    </Dialog>
  );
}
