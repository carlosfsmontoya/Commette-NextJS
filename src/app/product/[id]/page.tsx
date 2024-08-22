'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProductForm from '@/component/ProductForm';
import NavBar from '@/component/Navbar';
import { GetCategories, GetBrands, GetProductById, UpdateProduct, DeleteProduct } from '@/services/products';
import { useProtectRoute } from '@/utils/protectedRoute'; 
import { GetUserInfo } from '@/services/users'; 
import ConfirmDeleteModal from '@/component/ModalAccept'; 

export default function EditProductPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  const params = useParams();
  const { id } = params; // Obtener el parámetro id de la ruta

  const router = useRouter();

  useProtectRoute('/product', ['Seller']); 

  useEffect(() => {
    console.log("Product ID:", id); 

    const fetchData = async () => {
      try {
        const categoriesData = await GetCategories();
        const brandsData = await GetBrands();
        const productData = await GetProductById(id as string);
        const userInfo = await GetUserInfo();

        setCategories(categoriesData);
        setBrands(brandsData);
        setProduct(productData);
        setUserId(userInfo.id);
        console.log(productData)
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    } else {
      setError('Product ID is missing');
      setLoading(false);
    }
  }, [id]);

  const handleUpdate = async (updatedProduct: any) => {
    try {
      // Crear una copia del objeto y eliminar el campo id_seller
      const { id_seller, product_image, ...productToUpdate } = updatedProduct;
  
      console.log(productToUpdate);
      console.log(id);
  
      // Llamar a la función UpdateProduct con el producto actualizado sin id_seller
      await UpdateProduct(productToUpdate, id as string);
      router.push('/panel');
    } catch (err) {
      setError('Failed to update product.');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await DeleteProduct(id as string);
      router.push('/panel');
    } catch (err) {
      setError('Failed to delete product.');
      console.error(err);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <NavBar />
      {product && (
        <ProductForm
          product={product}
          categories={categories}
          brands={brands}
          id_seller={userId ?? 0}
          onSubmit={handleUpdate}
          onDelete={openModal} 
          isEdit={true} 
        />
      )}
      <ConfirmDeleteModal
        open={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete} 
      />
    </>
  );
}