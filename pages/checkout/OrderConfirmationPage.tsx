import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Download } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const OrderConfirmationPage: React.FC = () => {
    // Mock data for display
    const mockOrderId = `KP-${Date.now().toString().slice(-6)}`;

    return (
        <div className="bg-gray-50 flex items-center justify-center py-20 min-h-full">
            <div className="container mx-auto px-4 text-center max-w-2xl">
                <Card className="p-8 md:p-12 shadow-xl">
                    <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
                    <h1 className="text-3xl font-extrabold text-gray-900">Thank you for your order!</h1>
                    <p className="mt-2 text-gray-600">Your order has been placed successfully.</p>
                    <p className="mt-1 text-gray-600">Your Order ID is: <span className="font-semibold text-brand-blue-800">{mockOrderId}</span></p>

                    <div className="my-8 border-t border-b py-6">
                        <h2 className="text-lg font-semibold mb-4">Download Documents</h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Documents will be generated after payment confirmation.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button variant="secondary" disabled className="w-full sm:w-auto">
                                <Download className="mr-2" size={18} /> Download Invoice
                            </Button>
                             <Button variant="secondary" disabled className="w-full sm:w-auto">
                                <Download className="mr-2" size={18} /> Download Receipt
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link to="/products">
                            <Button size="lg">Continue Shopping</Button>
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
