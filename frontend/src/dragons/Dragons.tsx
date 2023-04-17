import React from "react";
import { useAxios } from "../hooks/useAxios";
import { Container, Typography } from "@mui/material";
import DragonTable from "./table/DragonTable";
import { Dragon } from "../data/dragon";

type Props = {};

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "calories";
const DEFAULT_ROWS_PER_PAGE = 5;
export default function Dragons({}: Props) {
  const { data, errorMessage, isLoading, refetch } = useAxios(
    "http://localhost:3001/dragon"
  );

  return (
    <Container maxWidth="md">
      <Typography
        component="h3"
        variant="h3"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Dragons
      </Typography>
      <DragonTable />
    </Container>
  );
}
