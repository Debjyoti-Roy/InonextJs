"use client"
import AdminProtectedRoute from '@/Components/AdminProtectedRoute'
import Admin from '@/PageComponents/Admin'
import React from 'react'

const page = () => {
  return (
    // <div>page</div>
    <AdminProtectedRoute>
        <Admin />
    </AdminProtectedRoute>
  )
}

export default page