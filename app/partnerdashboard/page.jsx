"use client"
import React from 'react'
import ProtectedRoute from '@/Components/ProtectedRoute'
import PartnerDashboard from '@/PageComponents/PartnerDashboardComponents/PartnerDashboard'

const page = () => {
    return (
        <ProtectedRoute>
            <PartnerDashboard />
        </ProtectedRoute>
    )
}

export default page