import Layout from './components/Layout';
import Hero from './components/Macbook/Hero';
import TerminalIntro from './components/TerminalIntro';
import About from './components/About';
import TechStack from './components/TechStack';
import MobileProjectList from './components/MobileProjectList';
import Timeline from './components/Timeline';
import Resume from './components/Resume';
import Contact from './components/Contact';
import useIsMobile from './hooks/useIsMobile';

const App = () => {
  const isMobile = useIsMobile();

  return (
    <Layout>
      <Hero />



      {/* Everything else starts after scroll */}
      <section id="main-content" className="relative z-20">
        <TerminalIntro />
        <About />
        <TechStack />



        {/* Only show mobile-friendly project list */}
        {isMobile && <MobileProjectList />}

        <Resume />
        <Timeline />
        <Contact />
      </section>
    </Layout>
  );
};

export default App;
