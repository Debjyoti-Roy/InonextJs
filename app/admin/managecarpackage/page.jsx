"use client"
import AdminProtectedRoute from '@/Components/AdminProtectedRoute'
import ManageCarPackage from '@/PageComponents/AdminComponents/ManageCarPackage'
import React from 'react'

const page = () => {
  return (
    // <div>page</div>
    <AdminProtectedRoute>
        <ManageCarPackage />
    </AdminProtectedRoute>
  )
}

export default page