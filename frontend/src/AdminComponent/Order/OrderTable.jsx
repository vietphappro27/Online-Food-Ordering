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

const orders = [1, 1, 1, 1, 1, 1, 1, 1];

const OrderTable = () => {
  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader title='All Orders' sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align='right'>image</TableCell>
                <TableCell align='right'>Customer</TableCell>
                <TableCell align='right'>price</TableCell>
                <TableCell align='right'>name</TableCell>
                <TableCell align='right'>ingredient</TableCell>
                <TableCell align='right'>status</TableCell>
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
                  <TableCell align='right'>{"image"}</TableCell>
                  <TableCell align='right'>{"Viet Phap"}</TableCell>
                  <TableCell align='right'>{"50000"}</TableCell>
                  <TableCell align='right'>{"mi tom"}</TableCell>
                  <TableCell align='right'>{"ingredient"}</TableCell>
                  <TableCell align='right'>{"pending"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default OrderTable;
