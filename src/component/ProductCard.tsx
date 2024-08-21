import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import Link from 'next/link';


interface ProductCardProps {
  product: {
    name: string;
    brand: string;
    category: string;
    description: string;
    quantity: number;
    id: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography color="textSecondary">{product.brand}</Typography>
        <Typography variant="body2" color="textSecondary">
          {product.category}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {product.description}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Quantity: {product.quantity}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/products/${product.id}`} passHref>
          <Button size="small" color="primary">Edit</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
