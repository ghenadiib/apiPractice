import React, { useContext, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ProductsContext, URL } from "./ProductList";
import { Product, ProductContextType } from "../models/product";
import axios from "axios";

export default function Filter({ categories } : {categories : string}) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { setProducts } = useContext<ProductContextType>(ProductsContext);


  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    const category = event.target.value; // Get the selected category
    setSelectedCategory(category); // Update the state with the selected category
    console.log(category);
    axios.get<{ products: Product[] }>(
      category !== "" ? `${URL}/category/${category}` : `${URL}?limit=20`
    ).then((res) => {
      setProducts(res.data.products);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const categoriesList = Object.values(categories);

  return (
    <div>
      <FormControl sx={{ m: 3, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">Filter</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selectedCategory}
          label="Categories"
          onChange={handleChange}
        >
          <MenuItem value="">All</MenuItem> {/* Option for displaying all categories */}
          {categoriesList.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}