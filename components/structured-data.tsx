const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abdulrasheed Olabanji",
  jobTitle: "Software Engineer",
  url: "https://www.abdulrasheedolabanji.com",
  sameAs: [
    "https://www.linkedin.com",
    "https://github.com/abdul1013",
  ],
  knowsAbout: [
    "Software Engineering",
    "Full-Stack Development",
    "Artificial Intelligence",
    "Cybersecurity",
    "Next.js",
    "React Native",
  ],
};

export default function HomeStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
