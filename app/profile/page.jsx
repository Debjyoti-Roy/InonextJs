"use client"
import React from 'react'
import { AuthProtectedRoute } from "@/Components/ProtectedRoute";
import Profile from "@/PageComponents/ProfileComponents/Profile"

const page = () => {
  return (
    // <div>page</div>
    <AuthProtectedRoute>
      <Profile />
    </AuthProtectedRoute>
  )
}

export default page