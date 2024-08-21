import React, { useState } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, Box } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

// Define las props que acepta el formulario
interface ProductFormProps {
  product: {
    brand: string;
    category: string;
    name: string;
    description: string;
    quantity: number;
  };
  categories: any[];
  brands: any[];
  onSubmit: (product: any) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, categories, brands, onSubmit }) => {
  const [formState, setFormState] = useState(product);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <TextField
        label="Product Name"
        name="name"
        value={formState.name}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={formState.description}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Quantity"
        name="quantity"
        type="number"
        value={formState.quantity}
        onChange={handleInputChange}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>Brand</InputLabel>
        <Select
          name="brand"
          value={formState.brand}
          onChange={handleSelectChange}
          label="Brand"
        >
          {brands.map((brand) => (
            <MenuItem key={brand.id} value={brand.id}>
              {brand.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={formState.category}
          onChange={handleSelectChange}
          label="Category"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Create Product
      </Button>
    </Box>
  );
};

export default ProductForm;