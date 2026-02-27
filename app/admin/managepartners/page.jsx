"use client"
import AdminProtectedRoute from '@/Components/AdminProtectedRoute'
import ManagePartners from '@/PageComponents/AdminComponents/ManagePartners'
import React from 'react'

const page = () => {
    return (
        // <div>page</div>
        <AdminProtectedRoute>
            <ManagePartners />
        </AdminProtectedRoute>
    )
}

export default page