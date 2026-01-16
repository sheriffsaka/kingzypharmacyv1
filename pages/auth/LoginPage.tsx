import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
            <Logo />
        </div>
        <Card className="p-8 shadow-2xl">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
            </h2>
            <form className="mt-8 space-y-6" action="#" method="POST">
                <Input id="email" label="Email address" type="email" autoComplete="email" required placeholder="john.doe@example.com" />
                <Input id="password" label="Password" type="password" autoComplete="current-password" required placeholder="••••••••" />
                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        <a href="#" className="font-medium text-brand-blue-700 hover:text-brand-blue-600">
                            Forgot your password?
                        </a>
                    </div>
                </div>
                <div>
                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                </div>
            </form>
             <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/auth/register" className="font-medium text-brand-blue-700 hover:text-brand-blue-600">
                    Sign up
                </Link>
            </p>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
