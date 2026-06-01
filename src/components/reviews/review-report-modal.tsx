"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ReviewReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewId: string;
}

const REPORT_REASONS = [
  { value: "", label: "Select a reason..." },
  { value: "spam", label: "Spam or misleading" },
  { value: "abuse", label: "Abusive or harmful content" },
  { value: "fake", label: "Fake review" },
  { value: "other", label: "Other" },
];

export function ReviewReportModal({ isOpen, onClose, reviewId }: ReviewReportModalProps) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) {
      setError("Please select a reason for reporting.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call to integrate review report endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setReason("");
        setDetails("");
        onClose();
      }, 2000);
    } catch (err) {
      setError("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-0">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold text-slate-900 mb-2">Report Review</h2>
        
        {success ? (
          <div className="py-8 text-center">
            <div className="mb-4 text-green-600 font-medium text-lg">Report submitted successfully.</div>
            <p className="text-slate-600 text-sm">Thank you for helping keep our community safe.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-sm text-slate-600 mb-4">
              Please let us know why you are reporting this review. Our moderation team will investigate.
            </p>

            <div className="mb-4">
              <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-1">
                Reason *
              </label>
              <select
                id="reason"
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  setError("");
                }}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                {REPORT_REASONS.map((r) => (
                  <option key={r.value} value={r.value} disabled={r.value === ""}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="details" className="block text-sm font-medium text-slate-700 mb-1">
                Additional Details (Optional)
              </label>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Provide more context..."
              />
            </div>

            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

            <div className="flex justify-end gap-3 mt-6">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !reason}>
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
