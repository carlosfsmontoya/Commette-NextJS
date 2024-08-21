'use client';

import { useRouter } from 'next/router';
import ProductForm from '@/component/ProductForm';
import NavBar from '@/component/Navbar';
import { useState, useEffect } from 'react';
import { useProtectRoute } from '@/utils/protectedRoute'; 

export default function EditProductPage() {
    useProtectRoute('/login');

  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<{ id: string; brand: string; category: string; name: string; description: string; quantity: number } | null>(null);

  useEffect(() => {
    if (id) {
      // Simulate fetching product by ID from API
      setProduct({
        id: id?.toString() || '',
        brand: 'Brand A',
        category: 'Category 1',
        name: 'Product A',
        description: 'Description A',
        quantity: 10,
      });
    }
  }, [id]);

  const handleUpdate = (updatedProduct: any) => {
    // Simulate API call to update product
    console.log('Product updated:', updatedProduct);
    router.push('/products');
  };

  return (
    <>
      <NavBar />
      {product && <ProductForm product={product} onSubmit={handleUpdate} categories={[]} brands={[]} />}
    </>
  );
}
