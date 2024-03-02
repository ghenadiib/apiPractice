import { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";


export const URL = "https://dummyjson.com/products";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(URL).then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const addNewProduct = (newProduct) =>{
    setProducts([...products, newProduct])
  };

  
  console.log(products);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="right">{product.description}</TableCell>
                <TableCell  align="right">{product.title}</TableCell>
                <TableCell className="flex" align="right"><DeleteProduct /> <EditProduct /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddProduct onProductAdded={addNewProduct}/>
      
    </>
  );
};
export default ProductList;
