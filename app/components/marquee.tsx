"use client";

const items = [
  "React", "Next.js", "TypeScript", "NestJS", "Express",
  "FastAPI", "Docker", "Jenkins", "AWS", "PostgreSQL",
  "Tailwind CSS", "React Native", "Prisma", "Python",
  "Node.js", "Git", "CI/CD", "REST APIs",
];

export default function Marquee() {
  const content = items.map((item) => (
    <span key={item} className="flex items-center gap-6">
      <span className="font-display text-xl tracking-widest text-foreground/60 transition-colors hover:text-accent sm:text-2xl md:text-3xl">
        {item.toUpperCase()}
      </span>
      <span className="text-accent/40">&#x2022;</span>
    </span>
  ));

  return (
    <div className="overflow-hidden border-y border-card-border py-6">
      <div className="animate-marquee flex w-max items-center gap-6">
        {content}
        {content}
      </div>
    </div>
  );
}
