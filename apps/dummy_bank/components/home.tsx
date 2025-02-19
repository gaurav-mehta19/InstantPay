"use client"
import React, { useState } from 'react';
import { Lock, Info, ChevronRight, Shield } from 'lucide-react';


export default function Home() {

  const [customerId, setCustomerId] = useState('');

return (
  <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome to SecureBank NetBanking</h1>
      </div>
    </header>

    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-[2fr,1fr] gap-8">
        {/* Login Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Login to NetBanking</h2>
          
          <div className="space-y-4 max-w-md">
            <div>
              <label htmlFor="customerId" className="block text-sm font-medium text-gray-700 mb-1">
                Customer ID/ User ID
              </label>
              <input
                type="text"
                id="customerId"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Customer ID"
              />
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 mt-1 inline-block">
                Forgot Customer ID?
              </a>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Continue
            </button>

            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mt-6">
              <p className="text-sm text-gray-800 font-medium">Dear Customer,</p>
              <p className="text-sm text-gray-600 mt-1">
                Welcome to the new login page of SecureBank NetBanking.
                Its lighter look and feel is designed to give you the best possible
                user experience. Please continue to login using your customer ID
                and password.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Don&apos;t have a SecureBank Account?</h3>
            <div className="space-y-2">
              <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center">
                <ChevronRight className="w-4 h-4 mr-1" />
                Credit Card only? Login here
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center">
                <ChevronRight className="w-4 h-4 mr-1" />
                Prepaid Card only? Login here
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center">
                <ChevronRight className="w-4 h-4 mr-1" />
                Personal Loan only? Login here
              </a>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-green-600" />
            </div>
            <p className="text-center text-gray-600 text-sm">
              Your security is of utmost importance.
              <a href="#" className="text-blue-600 hover:text-blue-700 block">
                Know More...
              </a>
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">First Time User?</h3>
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Register Now
            </a>
            <p className="text-sm text-gray-600 mt-2">for a host of convenient features</p>
            
            <h4 className="text-lg font-medium text-gray-900 mt-6 mb-3">
              We have added a host of new features!
            </h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <Info className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                Anywhere access through Desktop or mobile
              </li>
              <li className="flex items-start">
                <Lock className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                Enhanced security measures
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>

    {/* Footer */}
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex justify-between text-sm">
          <p>© Copyright SecureBank Ltd.</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-gray-300">Terms and Conditions</a>
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
  );
}