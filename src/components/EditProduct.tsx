import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { ProductsContext, URL } from "./ProductList";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { ProductContextType } from "../models/product";

export const UpdateProduct = ({ productId }: { productId: number }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { setProducts, products } =
    useContext<ProductContextType>(ProductsContext);
  const product = products.find((product) => product.id === productId);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
    }
  }, [product]);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async (id: number) => {
    try {
      await axios.put(`${URL}/${id}`, {
        title: title,
        description: description,
      });

      setProducts((prevProducts) => {
        return prevProducts.map((prod) => {
          if (prod.id === id) {
            return {
              ...prod,
              title: title === "" ? prod.title : title,
              description: description === "" ? prod.description : description,
            };
          }
          return prod;
        });
      });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
            defaultValue={product?.title}
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
            defaultValue={product?.description}
          />{" "}
        </DialogContent>{" "}
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Abort</Button>
          <Button onClick={() => handleUpdate(productId)} variant="outlined">
            {" "}
            Update
          </Button>
        </DialogActions>{" "}
      </Dialog>{" "}
    </>
  );
};

export default UpdateProduct;
