"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormValues } from "@/lib/signup-schemas";
import { AccountRole } from "@/types/sigup.types";
import { countries } from "countries-list";

const COUNTRIES = Object.values(countries)
  .map((country) => country.name)
  .sort();

interface ProfileFormProps {
  role: AccountRole;
  onSubmit: (data: ProfileFormValues) => void;
  isLoading?: boolean;
}

export default function ProfileForm({
  role,
  onSubmit,
  isLoading = false,
}: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  const title = role === "curator" ? "Curator Profile" : "Finder Profile";
  const subtitle =
    role === "curator"
      ? "Update your profile to start listing Artisans"
      : "Update profile to gain access to our advanced recommendation engine and personalization.";

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">{title}</h1>
        <p className="text-gray-600 text-sm mb-6">{subtitle}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              {...register("firstName")}
              className={`
                w-full px-4 py-2.5 rounded-lg border transition-all text-gray-900 placeholder:text-gray-400
                ${
                  errors.firstName
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-gray-400 focus:border-blue-600"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-600/20
              `}
              aria-invalid={errors.firstName ? "true" : "false"}
            />
            {errors.firstName && (
              <p className="text-red-600 text-xs mt-1" role="alert">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
              className={`
                w-full px-4 py-2.5 rounded-lg border transition-all text-gray-900 placeholder:text-gray-400
                ${
                  errors.lastName
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-gray-400 focus:border-blue-600"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-600/20
              `}
              aria-invalid={errors.lastName ? "true" : "false"}
            />
            {errors.lastName && (
              <p className="text-red-600 text-xs mt-1" role="alert">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              {...register("email")}
              className={`
                w-full px-4 py-2.5 rounded-lg border transition-all text-gray-900 placeholder:text-gray-400
                ${
                  errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-gray-400 focus:border-blue-600"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-600/20
              `}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Country of Residence */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Country of Residence
            </label>
            <select
              id="country"
              {...register("country")}
              className={`
                w-full px-4 py-2.5 rounded-lg border transition-all appearance-none bg-white text-gray-900
                ${
                  errors.country
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-gray-400 focus:border-blue-600"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-600/20
              `}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
              }}
              aria-invalid={errors.country ? "true" : "false"}
            >
              <option value="">Choose Country of Residence</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-600 text-xs mt-1" role="alert">
                {errors.country.message}
              </p>
            )}
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className={`
              w-full py-3 rounded-full font-semibold transition-all text-base
              ${
                isSubmitting || isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }
            `}
          >
            {isSubmitting || isLoading ? "Loading..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
