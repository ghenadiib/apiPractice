import { useContext } from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { URL, ProductsContext } from './ProductList';

const DeleteProduct = ({ productId }) => {
  const { setProducts } = useContext(ProductsContext);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      console.log(`Deleted post with ID ${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button onClick={() => handleDelete(productId)} variant="outlined" startIcon={<DeleteIcon />}>

    </Button>
  );
}

export default DeleteProduct;