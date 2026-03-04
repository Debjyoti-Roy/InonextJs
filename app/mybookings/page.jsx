"use client"
import { AuthProtectedRoute } from '@/Components/ProtectedRoute'
import MyBookings from '@/PageComponents/MyBookings'
import React from 'react'

const page = () => {
  return (
    // <div>app</div>
    <AuthProtectedRoute>
        <MyBookings />
    </AuthProtectedRoute>
  )
}

export default page