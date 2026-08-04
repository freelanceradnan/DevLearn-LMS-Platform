import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const AuthModal = ({ setModal, state: initialState = 'login' }) => {
  const [currentState, setCurrentState] = useState(initialState);
  const isLogin = currentState === 'login';

  return (
   
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={() => setModal(false)}
    >
      
      <div
        className="bg-white w-full max-w-md p-6 sm:p-8 flex flex-col gap-6 rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Part */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isLogin
                ? 'Login to start your journey'
                : 'Sign up to access all features'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setModal(false)}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2.5 px-4 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition shadow-sm"
          >
            <FcGoogle size={20} />
            <span>{isLogin ? 'Login with Google' : 'Sign up with Google'}</span>
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition shadow-sm"
          >
            <FaGithub size={20} />
            <span>{isLogin ? 'Login with GitHub' : 'Sign up with GitHub'}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-1">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="px-3 text-xs text-gray-400 uppercase">or</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Form Part */}
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#4266c7] hover:bg-[#3553a7] text-white py-2.5 rounded-lg text-sm font-semibold transition mt-2 shadow-md"
          >
            {isLogin ? 'Login Now' : 'Register Now'}
          </button>
        </form>

        {/* Footer Toggle (Login <-> Signup Switch) */}
        <div className="text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setCurrentState(isLogin ? 'signup' : 'login')}
            className="text-[#4266c7] font-semibold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;