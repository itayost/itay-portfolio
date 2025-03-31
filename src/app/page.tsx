import AboutSection from "@/components/sections/About";
import ResumeSection from "@/components/sections/Resume";
import ProjectsSection from "@/components/sections/Projects";
import ContactSection from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <main>
        <AboutSection />
        <ResumeSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}