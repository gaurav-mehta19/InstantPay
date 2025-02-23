"use client";
import React, { useState } from "react";
import { Lock, Info, Shield } from "lucide-react";
import { addMoney } from "@/lib/actions/addmoney";
import { useSearchParams } from "next/navigation";
import { checkCredentials } from "@/lib/actions/check_credentials";
import {toast } from "sonner";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState({
    customerId: "",
    password: "",
  });
  const searchParams = useSearchParams();

  const token = searchParams.get("token") || "";
  

  async function handleAddMoney() {

    const user = await addMoney(token);

  
    if (user.transaction) {
      const credentialsCheck = await checkCredentials(data.customerId, data.password, user.transaction.amount);
      if (credentialsCheck.message === "Success") {

        await axios.post("https://instantpay-ughi.onrender.com/hdfcWebhook", {
          token: token,
          user_identifier: user.transaction.userId,
          amount: user.transaction.amount
        })

        toast.success("Transaction successful");

        window.location.href = "http://localhost:3000/dashboard";

      } else {
        toast.warning(credentialsCheck.message);
      }
      
    } else {
      console.error("Transaction data is undefined");
    }
  
    }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome to SecureBank NetBanking
          </h1>
        </div>
      </header>

      {/* Vibrant Banner */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
  text-white text-center py-4 text-2xl md:text-3xl font-extrabold 
  animate-pulse shadow-lg sticky top-0 z-50">
  🚀 Use <span className="underline">Customer ID:</span> <span className="text-yellow-300">Test_User</span> 
  & <span className="underline">Password:</span> <span className="text-yellow-300">123456789</span> for testing! 🚀
</div>
      <main className="max-w-5xl min-h-[600px] mt-10 mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[2fr,1fr] gap-8">
          {/* Login Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Login to NetBanking</h2>

            <div className="space-y-4 max-w-md">
              <div>
                <label
                  htmlFor="customerId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Customer ID/ User ID
                </label>
                <input
                  type="text"
                  id="customerId"
                  value={data.customerId}
                  onChange={(e)=> setData({...data, customerId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Customer ID"
                />
                <label
                  htmlFor="password"
                  className="block text-sm mt-3.5 font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={data.password}
                  onChange={(e)=> setData({...data, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Password"
                />
              </div>

              <button onClick={handleAddMoney} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Continue
              </button>

              <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mt-6">
                <p className="text-sm text-gray-800 font-medium">
                  Dear Customer,
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Welcome to the new login page of SecureBank NetBanking. Its
                  lighter look and feel is designed to give you the best
                  possible user experience. Please continue to login using your
                  customer ID and password.
                </p>
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                First Time User?
              </h3>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Register Now
              </a>
              <p className="text-sm text-gray-600 mt-2">
                for a host of convenient features
              </p>

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
      <footer className="bg-gray-800 text-white mt-8 pb-5">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-between text-sm">
            <p>© Copyright SecureBank Ltd.</p>
            <div className="space-x-4">
              <a href="#" className="hover:text-gray-300">
                Terms and Conditions
              </a>
              <a href="#" className="hover:text-gray-300">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
