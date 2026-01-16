import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { mockProducts } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { CreditCard, Banknote, ShieldCheck } from 'lucide-react';

type BuyerType = 'GENERAL_PUBLIC' | 'WHOLESALE_BUYER';
type PaymentMethod = 'ONLINE' | 'TRANSFER';

const WHOLESALE_DISCOUNT_PERCENTAGE = 15; // 15% discount
const SHIPPING_FEE = 1500; // Mock shipping fee

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [buyerType, setBuyerType] = useState<BuyerType>('GENERAL_PUBLIC');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('ONLINE');

  const cartItemsWithDetails = cart.map(item => {
    const product = mockProducts.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  const subtotal = cartItemsWithDetails.reduce((acc, item) => {
    return acc + (item.product!.price * item.quantity);
  }, 0);

  const discount = buyerType === 'WHOLESALE_BUYER' ? (subtotal * WHOLESALE_DISCOUNT_PERCENTAGE) / 100 : 0;
  const total = subtotal - discount + SHIPPING_FEE;
  
  const handlePlaceOrder = () => {
    // In a real app, this would submit the order to a backend
    console.log('Placing order with:', { buyerType, paymentMethod, total });
    clearCart();
    navigate('/checkout/confirmation');
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart is Empty</h1>
        <p className="mt-2 text-gray-600">You can't proceed to checkout with an empty cart.</p>
        <Link to="/products">
          <Button className="mt-6" size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Buyer Type */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Account Type</h2>
                <div className="flex items-center space-x-4">
                  <div onClick={() => setBuyerType('GENERAL_PUBLIC')} className={`flex-1 p-4 border rounded-lg cursor-pointer transition-all ${buyerType === 'GENERAL_PUBLIC' ? 'border-brand-blue-700 bg-brand-blue-50 ring-2 ring-brand-blue-300' : 'border-gray-300 hover:border-gray-400'}`}>
                    <input type="radio" name="buyer-type" id="general" checked={buyerType === 'GENERAL_PUBLIC'} className="hidden" readOnly />
                    <label htmlFor="general" className="font-medium text-gray-800 cursor-pointer">General Public</label>
                  </div>
                  <div onClick={() => setBuyerType('WHOLESALE_BUYER')} className={`flex-1 p-4 border rounded-lg cursor-pointer transition-all ${buyerType === 'WHOLESALE_BUYER' ? 'border-brand-blue-700 bg-brand-blue-50 ring-2 ring-brand-blue-300' : 'border-gray-300 hover:border-gray-400'}`}>
                    <input type="radio" name="buyer-type" id="wholesale" checked={buyerType === 'WHOLESALE_BUYER'} className="hidden" readOnly />
                    <label htmlFor="wholesale" className="font-medium text-gray-800 cursor-pointer">Wholesale Buyer</label>
                  </div>
                </div>
              </Card>

              {/* Delivery Information */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Input id="fullName" label="Full Name" type="text" placeholder="John Doe" required />
                  </div>
                  <div className="sm:col-span-2">
                    <Input id="address" label="Street Address" type="text" placeholder="123 Health St." required />
                  </div>
                  <Input id="city" label="City" type="text" placeholder="Ikeja" required />
                  <Input id="state" label="State" type="text" placeholder="Lagos" required />
                  <div className="sm:col-span-2">
                    <Input id="phone" label="Phone Number" type="tel" placeholder="+234 801 234 5678" required />
                  </div>
                </form>
              </Card>

              {/* Payment Method */}
              <Card className="p-6">
                 <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                 <div className="space-y-4">
                    <div onClick={() => setPaymentMethod('ONLINE')} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'ONLINE' ? 'border-brand-blue-700 bg-brand-blue-50 ring-2 ring-brand-blue-300' : 'border-gray-300 hover:border-gray-400'}`}>
                        <CreditCard className="mr-3 text-brand-blue-700"/>
                        <div>
                            <label className="font-medium cursor-pointer">Online Payment</label>
                            <p className="text-sm text-gray-500">Secure payment with your card.</p>
                        </div>
                    </div>
                     <div onClick={() => setPaymentMethod('TRANSFER')} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'TRANSFER' ? 'border-brand-blue-700 bg-brand-blue-50 ring-2 ring-brand-blue-300' : 'border-gray-300 hover:border-gray-400'}`}>
                        <Banknote className="mr-3 text-brand-blue-700"/>
                         <div>
                            <label className="font-medium cursor-pointer">Bank Transfer</label>
                            <p className="text-sm text-gray-500">Pay via direct bank transfer.</p>
                        </div>
                    </div>
                 </div>
              </Card>
            </div>
          </div>
          
          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-28">
              <h2 className="text-xl font-semibold border-b pb-4 mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                {cartItemsWithDetails.map(item => (
                  <div key={item.productId} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 truncate pr-2">{item.product!.name} x{item.quantity}</span>
                    <span className="font-medium whitespace-nowrap">{formatCurrency(item.product!.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                 <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                 </div>
                 {buyerType === 'WHOLESALE_BUYER' && (
                    <div className="flex justify-between items-center text-green-600">
                        <span>Wholesale Discount ({WHOLESALE_DISCOUNT_PERCENTAGE}%)</span>
                        <span>-{formatCurrency(discount)}</span>
                    </div>
                 )}
                 <div className="flex justify-between items-center">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{formatCurrency(SHIPPING_FEE)}</span>
                 </div>
                 <div className="flex justify-between items-center text-lg font-bold border-t pt-2 mt-2">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                 </div>
              </div>
              <Button size="lg" className="w-full mt-6" onClick={handlePlaceOrder}>
                Place Order
              </Button>
               <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                    <ShieldCheck size={16} className="mr-2"/> Secure Checkout
               </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
