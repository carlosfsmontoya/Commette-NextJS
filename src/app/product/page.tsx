'use client';

import { useState, useEffect } from 'react';
import { useProtectRoute } from '@/utils/protectedRoute'; 
import ProductList from '@/component/ProductList';
import NavBar from '@/component/Navbar';

export default function ProductsPage() {
  const [products, setProducts] = useState<{ id: number; brand: string; category: string; name: string; description: string; quantity: number; }[]>([]);

  // Protege la ruta, redirigiendo a /login si el usuario no está autenticado
  useProtectRoute('/login');

  useEffect(() => {
    // Simulate fetching data from API
    setProducts([
      { id: 1, brand: 'Brand A', category: 'Category 1', name: 'Product A', description: 'Description A', quantity: 10 },
      { id: 2, brand: 'Brand B', category: 'Category 2', name: 'Product B', description: 'Description B', quantity: 20 },
    ]);
  }, []);

  return (
    <>
      <NavBar />
      <ProductList products={products} />
    </>
  );
}
