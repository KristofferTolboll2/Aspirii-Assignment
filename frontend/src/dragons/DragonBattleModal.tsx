import {
  Accordion,
  AccordionSummary,
  CircularProgress,
  Container,
  Dialog,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Dragon } from "../data/dragon";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
type Props = {
  selectedDragons: [string, string];
  isOpen: boolean;
  onClose: () => void;
};

export interface BattleResponse {
  winner: Dragon;
  attacks: [
    {
      diceRolls: number;
      modifier: number;
      total: number;
    }
  ];
}

export default function DragonBattleModal({
  onClose,
  isOpen,
  selectedDragons,
}: Props) {
  const [response, setResponse] = useState<BattleResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dragonBattle = async () => {
    setIsLoading(true);
    const attackResponse = await axios.post(
      "http://localhost:3001/dragon/battle",
      {
        dragon1: selectedDragons[0],
        dragon2: selectedDragons[1],
      }
    );
    setIsLoading(false);
    if (attackResponse.data) {
      setResponse(attackResponse.data);
    }
  };
  useEffect(() => {
    if (isOpen) {
      dragonBattle();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth={"xl"} fullWidth>
      <DialogTitle>Dragon battleground</DialogTitle>
      {isLoading && <CircularProgress />}
      {response !== null && (
        <div>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Divider sx={{ p: 2, m: 1 }} />
            <Typography variant="h5">
              The winner is: <b>{response.winner.name} </b>
            </Typography>
          </Container>
          <Container sx={{ display: "flex", flexDirection: "column" }}>
            The battle lasted {response.attacks.length} rounds.
            <br />
            See the summary of the battle below
            <Divider sx={{ p: 2, m: 1 }} />
            <Accordion sx={{ m: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Battle Summary</Typography>
              </AccordionSummary>
              {response.attacks.map((attack, index) => (
                <div key={index}>
                  <Divider sx={{ p: 2, m: 1 }} />
                  <Typography variant="h6" sx={{ p: 1 }}>
                    Round {index + 1}
                  </Typography>
                  <Typography sx={{ p: 1 }} variant="body1">
                    Dice roll: {attack.diceRolls}
                  </Typography>
                  <Typography sx={{ p: 1 }} variant="body1">
                    Modifier: {attack.modifier}
                  </Typography>
                  <Typography variant="body1" sx={{ p: 1 }}>
                    Total: {attack.total}
                  </Typography>
                </div>
              ))}
            </Accordion>
          </Container>
        </div>
      )}
    </Dialog>
  );
}
