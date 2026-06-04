import React from "react";
import IngredientTable from "./IngredientTable";
import Grid from "@mui/material/Grid";
import IngredientCategoryTable from "./IngredientCategoryTable";

const Ingredient = () => {
  return (
    <div className='px-2'>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <IngredientTable />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <IngredientCategoryTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default Ingredient;
