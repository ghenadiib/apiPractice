import { useState, useEffect, createContext } from "react";
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

const defaultValue: ProductContextType = {
  products: [],
  setProducts: () => {},
};

export const ProductsContext = createContext<ProductContextType>(defaultValue);

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get<{ products: Product[] }>(URL).then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  console.log(products);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
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
                <TableCell align="right">
                <DeleteProduct productId ={product.id}/> 
                <EditProduct productId={product.id}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddProduct/>
      </ProductsContext.Provider>
    
  );
};

export default ProductList;
