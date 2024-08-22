import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    ProductID: number;
    ProductName: string;
    BrandName: string;
    CategoryName: string;
    ProductDescription: string;
    QuantityAvailable: number;
    SellerCompany: string;
    Price: number;
  };
  isMy: boolean;
}

export default function ProductCard({ product, isMy }: ProductCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{product.ProductName}</Typography>
        <Typography color="textSecondary">{product.BrandName}</Typography>
        <Typography variant="body2" color="textSecondary">
          {product.CategoryName}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {product.ProductDescription}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Quantity Available: {product.QuantityAvailable}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Price: ${product.Price.toFixed(2)}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Seller: {product.SellerCompany}
        </Typography>
      </CardContent>
      <CardActions>
        {isMy ? (
          <Link href={`/product/${product.ProductID}`} passHref>
            <Button size="small" color="primary">
              Edit
            </Button>
          </Link>
        ) : (
          <Button size="small" color="primary">
            Buy
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
