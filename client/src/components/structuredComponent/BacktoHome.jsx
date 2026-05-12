import React from 'react'
import { ArrowLeft, Home } from "lucide-react";
import { Link } from 'react-router-dom';

const BacktoHome = () => {
  return (
    <>
     <div className="absolute top-6 left-6">
          <Link
            to="/"
            className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition text-gray-700 hover:text-red-500"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
    </>
  )
}

export default BacktoHome
