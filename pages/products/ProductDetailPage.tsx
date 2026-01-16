import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '@/lib/mockData';
import { StockStatus } from '@/types';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const getStockBadgeColor = (status: StockStatus) => {
  switch (status) {
    case StockStatus.IN_STOCK:
      return 'bg-green-100 text-green-800';
    case StockStatus.LOW_STOCK:
      return 'bg-yellow-100 text-yellow-800';
    case StockStatus.OUT_OF_STOCK:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/products">
          <Button className="mt-4">Back to Products</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000); // Reset after 2 seconds
  };
  
  const isOutOfStock = product.stockStatus === StockStatus.OUT_OF_STOCK;

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 lg:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div>
            <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg shadow-lg bg-gray-100" />
          </div>
          
          {/* Product Details */}
          <div>
            <span className={`text-sm font-semibold px-2.5 py-1 rounded-full ${getStockBadgeColor(product.stockStatus)}`}>
              {product.stockStatus}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-4">{product.name}</h1>
            <p className="text-lg text-gray-500 mt-2">{product.category}</p>
            <p className="text-3xl font-bold text-gray-800 mt-6">{formatCurrency(product.price)}</p>
            {product.wholesalePrice && <p className="text-md text-gray-600">Wholesale: {formatCurrency(product.wholesalePrice)}</p>}

            <p className="mt-6 text-gray-700 leading-relaxed">{product.description}</p>
            
            <div className="mt-6 text-sm text-gray-600 space-y-2">
                <p><strong>Dosage:</strong> {product.dosage}</p>
                <p><strong>Pack Size:</strong> {product.packSize}</p>
                {product.minOrderQuantity && <p><strong>Min. Wholesale Order:</strong> {product.minOrderQuantity} units</p>}
            </div>

            {/* Add to Cart Section */}
            <div className="mt-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                   <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 text-gray-600 hover:bg-gray-100 rounded-l-md" disabled={isOutOfStock}>
                      <Minus size={16} />
                   </button>
                   <input type="number" value={quantity} readOnly className="w-16 text-center border-l border-r focus:outline-none" />
                   <button onClick={() => setQuantity(q => q + 1)} className="p-3 text-gray-600 hover:bg-gray-100 rounded-r-md" disabled={isOutOfStock}>
                      <Plus size={16} />
                   </button>
                </div>
                <Button 
                    size="lg" 
                    className="flex-1"
                    onClick={handleAddToCart} 
                    disabled={isOutOfStock}
                >
                  {addedToCart ? <><CheckCircle className="mr-2"/> Added!</> : 'Add to Cart'}
                </Button>
              </div>
               {isOutOfStock && <p className="text-red-600 text-sm mt-2">This item is currently out of stock.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
