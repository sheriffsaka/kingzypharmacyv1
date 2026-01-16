import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
            <Logo />
        </div>
        <Card className="p-8 shadow-2xl">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Create your account
            </h2>
            <form className="mt-8 space-y-6" action="#" method="POST">
                <Input id="fullName" label="Full Name" type="text" autoComplete="name" required placeholder="John Doe" />
                <Input id="email" label="Email address" type="email" autoComplete="email" required placeholder="john.doe@example.com" />
                <Input id="password" label="Password" type="password" autoComplete="new-password" required placeholder="••••••••" />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input id="general-public" name="account-type" type="radio" className="focus:ring-brand-blue-500 h-4 w-4 text-brand-blue-600 border-gray-300" defaultChecked/>
                      <label htmlFor="general-public" className="ml-2 block text-sm text-gray-900">General Public</label>
                    </div>
                    <div className="flex items-center">
                      <input id="wholesale-buyer" name="account-type" type="radio" className="focus:ring-brand-blue-500 h-4 w-4 text-brand-blue-600 border-gray-300"/>
                      <label htmlFor="wholesale-buyer" className="ml-2 block text-sm text-gray-900">Wholesale Buyer</label>
                    </div>
                  </div>
                </div>

                <div>
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </div>
            </form>
             <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/auth/login" className="font-medium text-brand-blue-700 hover:text-brand-blue-600">
                    Sign in
                </Link>
            </p>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
