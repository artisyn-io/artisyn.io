export type PublicArtisanProfile = {
  id: string;
  name: string;
  category: string;
  location: string;
  image: string;
  bio: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  responseTime: string;
  hourlyRate: number;
  yearsOfExperience: number;
  skills: string[];
  verified: boolean;
  availability: string;
};

type ProfileSectionProps = {
  artisan: PublicArtisanProfile;
};

export function PublicProfileStatsSection({ artisan }: ProfileSectionProps) {
  const stats = [
    { label: "Hourly rate", value: `$${artisan.hourlyRate}/hr` },
    { label: "Experience", value: `${artisan.yearsOfExperience}+ years` },
    { label: "Response time", value: artisan.responseTime },
    { label: "Availability", value: artisan.availability },
  ];

  return (
    <section className="border-y border-[#E2E8F0] bg-[#F8FAFC]">
      <div className="mx-auto grid max-w-6xl gap-3 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div className="bg-white p-5" key={stat.label}>
            <p className="text-sm text-[#64748B]">{stat.label}</p>
            <p className="mt-2 text-xl font-semibold text-[#262626]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PublicProfileAboutSection({ artisan }: ProfileSectionProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold text-[#262626]">About the artisan</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#475569]">
          {artisan.bio}
        </p>

        <div className="mt-8">
          <h3 className="text-base font-semibold text-[#262626]">Skills</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {artisan.skills.map((skill) => (
              <span
                className="rounded-full bg-[#F1F5F9] px-3 py-1.5 text-sm text-[#475569]"
                key={skill}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
