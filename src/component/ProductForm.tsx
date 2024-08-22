import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, MenuItem, Grid } from '@mui/material';

interface ProductFormProps {
  product: {
    BrandName: string;
    CategoryName: string;
    ProductName: string;
    ProductDescription: string;
    image: string;
    Price: number;
    QuantityAvailable: number;
  }[];
  categories: { id: number; name: string; description: string }[];
  brands: { id: number; name: string; description: string }[];
  id_seller: number;
  onSubmit: (product: any) => void;
  onDelete?: () => void; 
  isEdit: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, categories, brands, id_seller, onSubmit, onDelete, isEdit }) => {
  const [formData, setFormData] = useState({
    brand: '',
    category: '',
    name: '',
    description: '',
    image: '',
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    console.log('Product:', product);
    if (isEdit && product && product.length > 0) {
      const productData = product[0];
      const brandId = brands.find(brand => brand.name === productData.BrandName)?.id.toString() || '';
      const categoryId = categories.find(category => category.name === productData.CategoryName)?.id.toString() || '';
      setFormData({
        brand: brandId,
        category: categoryId,
        name: productData.ProductName || '',
        description: productData.ProductDescription || '',
        image: productData.image || '',
        price: productData.Price || 0,
        quantity: productData.QuantityAvailable || 0,
      });
    }
  }, [product, isEdit, brands, categories]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const productData = {
      id_brand: parseInt(formData.brand, 10),
      id_category: parseInt(formData.category, 10),
      product_name: formData.name,
      product_image: formData.image || undefined,
      product_description: formData.description || undefined,
      id_seller: id_seller,
      price: parseFloat(formData.price.toString()),  
      stock: parseInt(formData.quantity.toString(), 10)  
    };
    onSubmit(productData);
  };

  if (!product || product.length === 0) return <p>Loading product data...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} mt={5}>
      <Grid item xs={12} sm={6} >
      <TextField
            select
            name="brand"
            label="Brand"
            value={formData.brand}
            onChange={handleSelectChange}
            fullWidth
            required

          >
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleSelectChange}
            fullWidth
            required

          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="name"
            label="Product Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            required

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="image"
            label="Image URL"
            value={formData.image}
            onChange={handleChange}
            fullWidth
            required

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="price"
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="quantity"
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {isEdit ? 'Update Product' : 'Create Product'}
          </Button>
          {isEdit && (
            <Button
              variant="contained"
              color="secondary"
              onClick={onDelete}
              style={{ marginLeft: '10px' }}
            >
              Delete Product
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;