'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '@/component/ProductForm';
import NavBar from '@/component/Navbar';
import { GetCategories, GetBrands, CreateProduct } from '@/services/products';
import { useProtectRoute } from '@/utils/protectedRoute';
import { GetUserInfo } from '@/services/users';

export default function CreateProductPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useProtectRoute('/product', ['Seller']);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await GetCategories();
        const brandsData = await GetBrands();
        const userInfo = await GetUserInfo();
        setCategories(categoriesData);
        setBrands(brandsData);
        setUserId(userInfo.id_user);
        console.log(userInfo.id_user);
      } catch (err) {
        setError('Failed to fetch categories, brands, or user information.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleCreate = async (product: any) => {
    if (userId === null) {
      setError('User ID is not available.');
      return;
    }

    console.log(product);
    try {
      await CreateProduct({
        ...product
      });
      router.push('/product');
    } catch (err) {
      setError('Failed to create product.');
      router.push('/product');

      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <NavBar />
      <ProductForm
        product={[{ BrandName: '', CategoryName: '', ProductName: '', ProductDescription: '', image: '', Price: 0, QuantityAvailable: 0 }]}
        categories={categories}
        brands={brands}
        id_seller={userId ?? 0}
        onSubmit={handleCreate}
        isEdit={false}
      />
    </>
  );
}
