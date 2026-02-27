"use client"
import AdminProtectedRoute from '@/Components/AdminProtectedRoute'
import ManageTourBookings from '@/PageComponents/AdminComponents/ManageTourBookings'
import React from 'react'

const page = () => {
    return (
        // <div>page</div>
        <AdminProtectedRoute>
            <ManageTourBookings />
        </AdminProtectedRoute>
    )
}

export default page