"use client"
import AdminProtectedRoute from '@/Components/AdminProtectedRoute'
import ManageHotelBooking from '@/PageComponents/AdminComponents/ManageHotelBooking'
import React from 'react'

const page = () => {
  return (
    // <div>page</div>
    <AdminProtectedRoute>
        <ManageHotelBooking />
    </AdminProtectedRoute>
  )
}

export default page