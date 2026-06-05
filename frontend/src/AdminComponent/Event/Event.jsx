import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CreateEventForm from "./CreateEventForm";
import { Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  image: "",
  location: "",
  name: "",
  startAt: null,
  endAt: null,
};

const Event = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formValues ---- ", formValues);
    setFormValues(initialValues);
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleDateChange = (date, dateType) => {
    setFormValues({ ...formValues, [dateType]: date });
  };
  return (
    <div>
      <div className='p-5'>
        <Button onClick={handleOpen} variant='contained'>
          Create new Event
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    id='image'
                    name='image'
                    label='Image URL'
                    variant='outlined'
                    value={formValues.image}
                    onChange={handleFormChange}
                  ></TextField>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    id='location'
                    name='location'
                    label='Location'
                    variant='outlined'
                    value={formValues.location}
                    onChange={handleFormChange}
                  ></TextField>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    id='name'
                    name='name'
                    label='Event Name'
                    variant='outlined'
                    value={formValues.name}
                    onChange={handleFormChange}
                  ></TextField>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label='Start At'
                      value={formValues.startAt}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "startAt")
                      }
                      inputFormat='MM/dd/yyyy hh:mm a'
                      className='w-full'
                      sx={{ width: "100%" }}
                    ></DateTimePicker>
                  </LocalizationProvider>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label='End At'
                      value={formValues.endAt}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "endAt")
                      }
                      inputFormat='MM/dd/yyyy hh:mm a'
                      className='w-full'
                      sx={{ width: "100%" }}
                    ></DateTimePicker>
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button variant='contained' color='primary' type='submit'>
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Event;
