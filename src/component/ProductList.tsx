import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

interface Product {
  ProductID: number;
  ProductName: string;
  BrandName: string;
  CategoryName: string;
  Price: number;
  QuantityAvailable: number;
  SellerCompany: string;
  ProductDescription: string;
}

interface ProductListProps {
  products: Product[];
  isMy: boolean; 
}

export default function ProductList({ products, isMy }: ProductListProps) {
  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      {products.map((product, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <ProductCard product={product} isMy={isMy} />
          </Grid>
      ))}
    </Grid>
  );
}
