'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '@/component/ProductForm';
import NavBar from '@/component/Navbar';
import { GetCategories, GetBrands } from '@/services/products';
import { useProtectRoute } from '@/utils/protectedRoute'; 

export default function CreateProductPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useProtectRoute('/product', ['Seller']); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await GetCategories();
        const brandsData = await GetBrands();
        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (err) {
        setError('Failed to fetch categories or brands.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const router = useRouter();
  
  const handleCreate = (product: any) => {
      // Simulate API call
      console.log('Product created:', product);
      router.push('/products');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <NavBar />
      <ProductForm
        product={{ brand: '', category: '', name: '', description: '', quantity: 0 }}
        categories={categories}
        brands={brands}
        onSubmit={handleCreate}
      />
    </>
  );
}
