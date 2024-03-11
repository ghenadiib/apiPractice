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
import SignIn from "./SignIn";
import { IsSignedInType, ProductContextType, Product } from "../models/product";
import { Alert } from "@mui/material";
import PaginationControlled from "./Pagination";

export const URL = "https://dummyjson.com/products";

export const ProductsContext = createContext<ProductContextType>({
  products: [],
  setProducts: () => {},
});

export const SignedInContext = createContext<IsSignedInType>({
  isSignedIn: false,
  setIsSignedIn: () => {},
})

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(true); // CHANGE TO FALSE TO MAKE THE SIGN IN APPEAR

  useEffect(() => {
    if (isSignedIn) {
      axios.get<{ products: Product[] }>(`${URL}?limit=20`).then((res) => {
        setProducts(res.data.products);
      });
    }
  }, [isSignedIn]);


  console.log(products);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      <SignedInContext.Provider value = {{isSignedIn, setIsSignedIn}}>
      {isSignedIn ? (
        <div>
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
                    <TableCell align="right">{product.title}</TableCell>
                    <TableCell align="right">
                      <DeleteProduct productId={product.id} />
                      <EditProduct productId={product.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <AddProduct />{" "}
          <div className="flex justify-center">
          <PaginationControlled />
          </div>
        </div>
      ) : (
        <>
        <SignIn />
        <Alert severity="error">Wrong credentials.</Alert>
        </>
      )}
      </SignedInContext.Provider>
    </ProductsContext.Provider>
  );
};

export default ProductList;
