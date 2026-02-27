"use client"
import AdminProtectedRoute from '@/Components/AdminProtectedRoute'
import ManageTourPackage from '@/PageComponents/AdminComponents/ManageTourPackage'
import React from 'react'

const page = () => {
  return (
    // <div>page</div>
    <AdminProtectedRoute>
        <ManageTourPackage />
    </AdminProtectedRoute>
  )
}

export default page