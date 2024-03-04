import * as React from "react";
import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import ProductList, { ProductsContext, URL } from "./ProductList";

const AddProduct = ({onProductAdded}) => {
  const [open, setOpen] = useState(false);

  const {products} = useContext(ProductsContext);

  const {setProducts} = useContext(ProductsContext);


  const handleClickOpen = () => {
    setOpen(true);
  };  

  const handleClose = () => {
    setOpen(false);
  };

  const [description, setDescription] = useState("");

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    console.log(event.target.value);
  };

  const [title, setTitle] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    console.log(event.target.value);
  };


  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${URL}/add`, {
        title: title,
        description: description,
      });
      console.log(response.data);
      setProducts([...products, response.data])
      handleClose();
    } catch (error) {
      console.error("Error sending email:", error);
    }


  };


  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Product
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Product</DialogTitle>
        <DialogContent>
          <DialogContentText>Add Product</DialogContentText>

          <TextField
            onChange={handleDescriptionChange}
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="description"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={handleTitleChange}
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="title"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddProduct;
