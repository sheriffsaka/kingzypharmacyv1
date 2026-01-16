import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, StockStatus } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

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

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // Visual feedback for 2s
  };

  return (
    <Card className="flex flex-col h-full transition-shadow hover:shadow-xl">
      <Link to={`/products/${product.id}`} className="block">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover bg-gray-100" />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full self-start ${getStockBadgeColor(product.stockStatus)}`}>
          {product.stockStatus}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-gray-800">
          <Link to={`/products/${product.id}`} className="hover:text-brand-blue-700">{product.name}</Link>
        </h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="mt-auto pt-4">
          <p className="text-xl font-bold text-gray-900">{formatCurrency(product.price)}</p>
          <Button 
            className="w-full mt-2" 
            disabled={product.stockStatus === StockStatus.OUT_OF_STOCK || added}
            onClick={handleAddToCart}
          >
            {added ? <><CheckCircle size={20} className="mr-2"/>Added</> : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
