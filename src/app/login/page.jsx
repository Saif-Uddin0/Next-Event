"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm text-center">

        <h2 className="text-2xl font-bold mb-2 text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Sign in to continue to your account
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center justify-center gap-3 w-full py-3 
          border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
        >
          <FcGoogle size={24} />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        <p className="text-xs text-gray-400 mt-6">
          By signing in, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
