"use client"
import AdminProtectedRoute from '@/Components/AdminProtectedRoute'
import ManageCarBookings from '@/PageComponents/AdminComponents/ManageCarBookings'
import React from 'react'

const page = () => {
  return (
    // <div>page</div>
    <AdminProtectedRoute>
        <ManageCarBookings/>
    </AdminProtectedRoute>
  )
}

export default page