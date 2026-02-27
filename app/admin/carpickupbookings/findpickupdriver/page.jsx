import AdminProtectedRoute from '@/Components/AdminProtectedRoute'
import FindPickupDriver from '@/PageComponents/AdminComponents/FindPickupDriver'
import React from 'react'

const page = () => {
  return (
    // <div>page</div>
    <AdminProtectedRoute>
        <FindPickupDriver />
    </AdminProtectedRoute>
  )
}

export default page