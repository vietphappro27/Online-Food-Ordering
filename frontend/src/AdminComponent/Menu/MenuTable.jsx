import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
const orders = [1, 1, 1, 1, 1, 1, 1, 1];

const MenuTable = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          action={
            <IconButton onClick={() => navigate("../add-menu")} aria-label='settings'>
              <CreateIcon />
            </IconButton>
          }
          title='Menu'
          sx={{ pt: 2, alignItems: "center" }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Image</TableCell>
                <TableCell align='right'>Title</TableCell>
                <TableCell align='right'>Ingredient</TableCell>
                <TableCell align='right'>Price</TableCell>
                <TableCell align='right'>Available</TableCell>
                <TableCell align='right'>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {1}
                  </TableCell>
                  <TableCell align='right'>{"title"}</TableCell>
                  <TableCell align='right'>{"ingredient"}</TableCell>
                  <TableCell align='right'>{"50000"}</TableCell>
                  <TableCell align='right'>{"in stock"}</TableCell>
                  <TableCell align='right'>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default MenuTable;
