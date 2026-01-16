import React from 'react';
import { mockProducts } from '@/lib/mockData';
import ProductCard from '@/components/products/ProductCard';

const ProductListPage: React.FC = () => {
  return (
    <div className="bg-white">
        <div className="container mx-auto px-4 lg:px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Our Products</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                    Browse our extensive catalog of high-quality pharmaceutical products.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {mockProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default ProductListPage;
