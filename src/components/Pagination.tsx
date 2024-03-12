import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ProductsContext, URL } from "./ProductList";
import { Product, ProductContextType } from "../models/product";
import axios from "axios";

export default function PaginationControlled() {
  const { setProducts } = React.useContext<ProductContextType>(ProductsContext);

  const [page, setPage] = React.useState<number>(1);

  const [skipCount, setSkipCount] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ products: Product[] }>(
          `${URL}?limit=20&skip=${skipCount}`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [skipCount, setProducts]);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setSkipCount((value - 1) * 20);

    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination size="large" count={5} page={page} onChange={handleChange} />
    </Stack>
  );
}
