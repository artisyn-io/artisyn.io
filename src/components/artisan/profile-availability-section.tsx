"use client"

import { Clock } from "lucide-react"
import AvailabilityEditor from "@/components/artisan/availability-editor"

export function ProfileAvailabilitySection() {
  return (
    <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 p-6 border-b border-gray-200">
        <div className="p-2 rounded-lg bg-[#F4F3FE]">
          <Clock className="w-5 h-5 text-[#605DEC]" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Availability &amp; Working Hours
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Set the days and times you&apos;re available to take new jobs.
          </p>
        </div>
      </div>

      <div className="p-6">
        <AvailabilityEditor />
      </div>
    </section>
  )
}
