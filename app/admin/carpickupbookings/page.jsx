"use client";
import AdminProtectedRoute from '@/Components/AdminProtectedRoute'
import CarPickupBookings from '@/PageComponents/AdminComponents/CarPickupBookings'
import React from 'react'

const page = () => {
  return (
    // <div>page</div>
    <AdminProtectedRoute>
        <CarPickupBookings />
    </AdminProtectedRoute>
  )
}

export default page