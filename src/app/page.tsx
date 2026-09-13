'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

import Navbar              from '@/components/ui/Navbar';
import HeroSection         from '@/components/sections/HeroSection';
import AboutSection        from '@/components/sections/AboutSection';
import ExperienceSection   from '@/components/sections/ExperienceSection';
import ProjectsSection     from '@/components/sections/ProjectsSection';
import SkillsSection       from '@/components/sections/SkillsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ContactSection      from '@/components/sections/ContactSection';
import GlobalBackground    from '@/components/ui/GlobalBackground';
import Footer              from '@/components/ui/Footer';

const LoadingScreen = dynamic(() => import('@/components/ui/LoadingScreen'), { ssr: false });

const PHOTO = '/images/headshot.jpg';

const NAV_DIVIDER = (
  <div style={{ height:1, background:'linear-gradient(90deg, transparent, rgba(255,255,255,.04), transparent)' }} />
);

export default function Page() {
  const [done, setDone]       = useState(false);
  const [show, setShow]       = useState(false);

  const handleDone = () => {
    setDone(true);
    setTimeout(() => setShow(true), 150);
  };

  return (
    <>

      <AnimatePresence>
        {!done && <LoadingScreen onDone={handleDone} />}
      </AnimatePresence>

      {show && (
        <div style={{ background:'var(--bg)', minHeight:'100vh', position: 'relative' }}>
          <GlobalBackground />
          <Navbar />

          <HeroSection />
          {NAV_DIVIDER}
          <AboutSection        photo={PHOTO} />
          {NAV_DIVIDER}
          <ExperienceSection />
          {NAV_DIVIDER}
          <ProjectsSection />
          {NAV_DIVIDER}
          <SkillsSection />
          {NAV_DIVIDER}
          <CertificationsSection />
          {NAV_DIVIDER}
          <ContactSection />

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
}
