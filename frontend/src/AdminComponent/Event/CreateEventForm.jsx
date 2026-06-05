// import { Button, TextField } from "@mui/material";
// import React, { useState } from "react";

// const CreateEventForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     ingredientCategoryId: "",
//   });
//   const handleSubmit = () => {
//     const data = {
//       name: formData.name,

//       restaurantId: {
//         id: 1,
//       },
//     };
//     console.log("data --- ", data);
//   };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
//     <div className=''>
//       <div className='p-5'>
//         <h1 className='text-gray-400 text-center text-xl pb-10'>
//           Create Event
//         </h1>
//         <form className='space-y-5' onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             id='image'
//             name='image'
//             label='Image'
//             variant='outlined'
//             value={formData.image}
//             onChange={handleInputChange}
//           ></TextField>
//           <TextField
//             fullWidth
//             id='location'
//             name='location'
//             label='Location'
//             variant='outlined'
//             value={formData.location}
//             onChange={handleInputChange}
//           ></TextField>
//           <TextField
//             fullWidth
//             id='eventName'
//             name='eventName'
//             label='Event Name'
//             variant='outlined'
//             value={formData.eventName}
//             onChange={handleInputChange}
//           ></TextField>

//           <Button variant='contained' type='submit'>
//             Submit
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateEventForm;
