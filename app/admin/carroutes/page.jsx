"use client"
import AdminProtectedRoute from '@/Components/AdminProtectedRoute'
import CarRoutes from '@/PageComponents/AdminComponents/CarRoutes'
import React from 'react'

const page = () => {
  return (
    // <div>page</div>
    <AdminProtectedRoute >
        <CarRoutes />
    </AdminProtectedRoute>
  )
}

export default page