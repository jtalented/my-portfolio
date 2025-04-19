import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Macbook/Hero';
import TerminalIntro from './components/TerminalIntro';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Resume from './components/Resume';
import Contact from './components/Contact';

const App = () => {
  return (
    <Layout>
      <Hero />

      {/* Everything else starts after scroll */}
      <section id="main-content" className="relative z-20">
        <TerminalIntro />
        <About />
        <TechStack />
        {/*<Projects />*/}
        <Timeline />

        <Resume />
        <Contact />
      </section>
    </Layout>
  );
};

export default App;
