import { Button } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react";
import { ProductsContext, URL } from "./ProductList";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export const UpdateProduct = ({productId}) => {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const {setProducts} = useContext(ProductsContext)
  const products = useContext(ProductsContext)

  const productList = [...products.products]

  const titles = []
  const descriptions = []

  productList.forEach(product => {
    titles.push(product.title)
  });

  productList.forEach(product => {
    descriptions.push(product.description)
  });

  const handleUpdate = async (id) => {
    try {
        const updatedTitle = title.trim() === "" ? titles[productId - 1] : title;
        const updatedDescription =
          description.trim() === ""
            ? descriptions[productId - 1]
            : description;
    
        await axios.put(`${URL}/${id}`, {
          title: updatedTitle,
          description: updatedDescription,
        });
    
        setProducts((prevProducts) => {
          const newProducts = [...prevProducts];
          newProducts[id - 1].title = updatedTitle;
          newProducts[id - 1].description = updatedDescription;
          return newProducts;
        });
        handleClose();
      } catch (error) {
        console.error(error);
      }
    };

  return(
    <>
    {" "}
    <Button variant="outlined" onClick={handleClickOpen}>
      <EditIcon />
    </Button>{" "}
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleUpdate,
      }}
    >
      <DialogTitle>Fill Out</DialogTitle>{" "}
      <DialogContent>
        {" "}
        <DialogContentText>
          Please fill in the fields before adding{" "}
        </DialogContentText>{" "}
        <TextField
          onChange={handleTitleChange}
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="Title"
          fullWidth
          variant="standard"
          defaultValue={titles[productId-1]}
        />{" "}
        <TextField
          onChange={handleDescriptionChange}
          autoFocus
          required
          margin="dense"
          id="description"
          name="description"
          label="Description"
          fullWidth
          variant="standard"
          defaultValue={descriptions[productId-1]}
        />{" "}
      </DialogContent>{" "}
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Abort</Button>
        <Button onClick = {() => handleUpdate(productId)} variant="outlined" > Update
  </Button>
      </DialogActions>{" "}
    </Dialog>{" "}
  </>

  )
}

export default UpdateProduct;