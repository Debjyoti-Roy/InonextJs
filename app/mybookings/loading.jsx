"use client"

import Lottie from "lottie-react"
import loading from "@/assets/Lottie/InfinityLoader.json"

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="w-64 h-64">
        <Lottie animationData={loading} loop={true} />
      </div>
    </div>
  )
}