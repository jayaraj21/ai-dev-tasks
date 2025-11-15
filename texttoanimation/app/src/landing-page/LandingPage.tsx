import ExamplesCarousel from './components/ExamplesCarousel';
import FAQ from './components/FAQ';
import FeaturesGrid from './components/FeaturesGrid';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import PricingCards from './components/PricingCards';
import PricingComparison from './components/PricingComparison';
import ProcessSteps from './components/ProcessSteps';
import Testimonials from './components/Testimonials';
import AIReady from './ExampleHighlightedFeature';
import { examples, faqs, features, footerNavigation, testimonials } from './contentSections';

export default function LandingPage() {
  return (
    <div className='bg-background text-foreground'>
      <Navigation />
      <main className='isolate'>
        <Hero />
        <ProcessSteps />
        <PricingComparison />
        <div id='features'>
          <FeaturesGrid features={features} />
        </div>
        <div id='pricing'>
          <PricingCards />
        </div>
        <Testimonials testimonials={testimonials} />
        <div id='faq'>
          <FAQ faqs={faqs} />
        </div>
      </main>
      <Footer footerNavigation={footerNavigation} />
    </div>
  );
}

