import Navbar from "@/components/navbar";
import SignupContainer from "@/components/signup/signup-container";

export const metadata = {
  title: "Sign Up - Artisyn.io",
  description:
    "Create your Artisyn.io account - Choose between Curator or Finder roles",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex items-center justify-center py-16 px-4">
        <SignupContainer />
      </main>
    </div>
  );
}
