import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { mockProducts } from '@/lib/mockData';
import Button from '@/components/ui/Button';
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const CartPage: React.FC = () => {
  const { cart, updateItemQuantity, removeFromCart } = useCart();

  const cartItemsWithDetails = cart.map(item => {
    const product = mockProducts.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product); // Filter out any items that might not have product details

  const subtotal = cartItemsWithDetails.reduce((acc, item) => {
    return acc + (item.product!.price * item.quantity);
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart is Empty</h1>
        <p className="mt-2 text-gray-600">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products">
          <Button className="mt-6" size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6 py-12">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <div className="space-y-6">
                        {cartItemsWithDetails.map(item => (
                            <div key={item.productId} className="flex items-center gap-4 border-b pb-4 last:border-b-0">
                                <img src={item.product!.imageUrl} alt={item.product!.name} className="w-24 h-24 object-cover rounded-md bg-gray-100" />
                                <div className="flex-grow">
                                    <h2 className="font-semibold text-lg">{item.product!.name}</h2>
                                    <p className="text-sm text-gray-500">{item.product!.category}</p>
                                    <p className="text-md font-bold mt-1">{formatCurrency(item.product!.price)}</p>
                                </div>
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <button onClick={() => updateItemQuantity(item.productId, item.quantity - 1)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-md">
                                        <Minus size={16} />
                                    </button>
                                    <input type="text" value={item.quantity} readOnly className="w-12 text-center border-l border-r focus:outline-none" />
                                     <button onClick={() => updateItemQuantity(item.productId, item.quantity + 1)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-md">
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <div>
                                    <button onClick={() => removeFromCart(item.productId)} className="text-red-500 hover:text-red-700 p-2">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
                         <h2 className="text-xl font-semibold border-b pb-4">Order Summary</h2>
                         <div className="flex justify-between items-center my-4">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-bold text-xl">{formatCurrency(subtotal)}</span>
                         </div>
                         <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                         <Link to="/checkout">
                            <Button size="lg" className="w-full mt-6">Proceed to Checkout</Button>
                         </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CartPage;
