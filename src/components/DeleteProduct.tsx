import { useContext, useState} from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { URL, ProductsContext } from './ProductList';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";



const DeleteProduct = ({ productId } : { productId : number}) => {

  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { setProducts } = useContext<ProductContextType>(ProductsContext)

  const handleDelete = async (id : number) => {
    try{
      await axios.delete(`${URL}/${id}`);
      setProducts((prevProducts : Product[]) => prevProducts.filter(product => product.id !== id));
      console.log(`Deleted post with ID ${id}`);
    }catch (error) {
      console.error(error);
    }
  }


  return(
    <>
    {" "}
    <Button variant="outlined" onClick={handleClickOpen}>
      <DeleteIcon />
    </Button>{" "}
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleDelete,
      }}
    >
      <DialogTitle>Delete</DialogTitle>{" "}
      <DialogContent>
        {" "}
        <DialogContentText>
        Please confirm delete{" "}
        </DialogContentText>{" "}

      </DialogContent>{" "}
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Abort</Button>
        <Button onClick = {() => handleDelete(productId)} variant="outlined" > Delete
  </Button>
      </DialogActions>{" "}
    </Dialog>{" "}
  </>

  )
}

export default DeleteProduct;