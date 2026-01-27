"use client";
import Link from "next/link";
import { useState } from "react";

type Props = {};
const accountTypeContent = [
  {
    icon: "/account-type/user-circle.png",
    title: "I want to hire artisians",
    description:
      "Find skilled, curated artisans and hire with confidence for your projects.",
  },
  {
    icon: "/account-type/briefcase-icon.png",
    title: "I'm an artisian ",
    description:
      "Showcase your skills, get discovered, and work with clients who value quality.",
  },
];

const AccountType = (props: Props) => {
  const [selectedAccountType, setSelectedAccountType] = useState<string | null>(
    null,
  );
  return (
    // Added 'min-h-screen' to ensure full height on mobile
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col lg:flex-row justify-center items-start gap-10 lg:gap-32 w-full">
        <div className="flex flex-col justify-normal items-start w-full lg:w-1/2 px-6 lg:pl-56 lg:px-0 h-auto lg:h-screen py-8">
          
          {/* LOGO */}
          <img
            src="/account-type/artisyn-logo.svg"
            alt="Artisyn Logo"
            className="w-24 h-24 lg:w-32 lg:h-32 mb-6" // Slightly smaller logo on mobile
          />
          
          <div className="w-full">
            <h1 className="text-2xl font-semibold py-3 text-black">
              Choose your account type
            </h1>
            <p className="text-sm text-[#6B6878] ">
              Select how you want to use Artisyn. You can change this later.
            </p>
            <div className="pt-6 flex flex-col gap-5">
              {accountTypeContent.map((item) => (
                <div
                  className={`${
                    selectedAccountType === item.title
                      ? "ring-1 ring-[#605DEC] border-[#605DEC]"
                      : ""
                  } flex flex-col gap-2 border border-gray-300 rounded-2xl p-3 cursor-pointer hover:border-[#605DEC] transition-all duration-200`}
                  key={item.title}
                  onClick={() => setSelectedAccountType(item.title)}
                >
                  <div className="flex justify-normal items-center gap-2">
                    <img src={item.icon} className="size-6" />
                    <h3 className="text-black text-xl font-medium">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[#6B6878] text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full lg:w-auto bg-[#605DEC] py-3 px-8 rounded-lg mt-10 cursor-pointer hover:bg-[#605DEC]/80 text-white disabled:cursor-not-allowed disabled:bg-[#605DEC]/80 transition-colors"
            disabled={!selectedAccountType}
          >
           <Link href="/setup-profile"> Continue as {selectedAccountType === "I'm an artisian " ? "Artisan" : "Client"}</Link>
          </button>
        </div>
        <div className="hidden lg:block w-1/2 h-screen sticky top-0">
          <img
            src={"/account-type/man-working-with-wood.png"}
            className="w-full h-full object-cover"
            alt="Man working"
          />
        </div>

      </div>
    </div>
  );
};

export default AccountType;