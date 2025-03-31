import AboutSection from "@/components/sections/About";
import ResumeSection from "@/components/sections/Resume";
import ProjectsSection from "@/components/sections/Projects";
import ContactSection from "@/components/sections/Contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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