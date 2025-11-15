import { Check } from 'lucide-react';
import { Link as WaspRouterLink, routes } from 'wasp/client/router';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

export default function PricingCards() {
  const pricingTiers = [
    {
      name: 'Tier 1',
      subtitle: 'Perfect for Solo Entrepreneurs',
      price: '$69',
      originalPrice: '$99',
      period: 'lifetime',
      badge: 'MOST POPULAR',
      badgeColor: 'bg-primary text-primary-foreground',
      credits: 30,
      features: [
        '30 video credits per month',
        'Up to 30 videos/month (15 sec)',
        '1 brand profile',
        'All 5 video formats (1:1, 9:16, 16:9)',
        '4 variations per generation',
        'Simple video editor',
        'Brand asset storage',
        'HD quality (1080p)',
        'Royalty-free music library',
        'Download without watermarks',
      ],
      cta: 'Get Started',
      highlighted: true,
    },
    {
      name: 'Tier 2',
      subtitle: 'For Agencies & Growing Businesses',
      price: '$199',
      originalPrice: '$299',
      period: 'lifetime',
      badge: 'BEST VALUE',
      badgeColor: 'bg-amber-500 text-white',
      credits: 100,
      features: [
        '100 video credits per month',
        'Up to 100 videos/month (15 sec)',
        'Unlimited brand profiles',
        'Up to 5 team members',
        'All Tier 1 features',
        'Priority rendering',
        '4K quality option',
        'Advanced brand learning',
        'API access (coming soon)',
        'Priority support',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
  ];

  return (
    <div className='py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center mb-16'>
          <h2 className='text-base font-semibold leading-7 text-primary'>Pricing</h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Simple, Lifetime Pricing
          </p>
          <p className='mt-6 text-lg leading-8 text-muted-foreground'>
            Pay once, create videos forever. No monthly subscriptions. 30-day money-back guarantee.
          </p>
          <div className='mt-4 inline-flex items-center gap-2 rounded-full bg-amber-100 dark:bg-amber-950 px-4 py-2 text-sm font-medium text-amber-900 dark:text-amber-100'>
            🎉 Beta Launch Special: Save up to 30% off
          </div>
        </div>

        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2'>
          {pricingTiers.map((tier, idx) => (
            <Card
              key={idx}
              className={`relative flex flex-col ${
                tier.highlighted
                  ? 'border-2 border-primary shadow-xl scale-105'
                  : 'border border-border'
              }`}
            >
              {tier.badge && (
                <div className='absolute -top-4 left-1/2 -translate-x-1/2'>
                  <span
                    className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-bold ${tier.badgeColor}`}
                  >
                    {tier.badge}
                  </span>
                </div>
              )}

              <CardHeader className='text-center pb-8 pt-8'>
                <CardTitle className='text-2xl font-bold'>{tier.name}</CardTitle>
                <CardDescription className='text-base mt-2'>{tier.subtitle}</CardDescription>
                <div className='mt-6'>
                  <span className='text-sm text-muted-foreground line-through'>
                    {tier.originalPrice}
                  </span>
                  <div className='mt-2 flex items-baseline justify-center gap-x-2'>
                    <span className='text-5xl font-bold tracking-tight text-foreground'>
                      {tier.price}
                    </span>
                    <span className='text-sm font-semibold leading-6 tracking-wide text-muted-foreground'>
                      {tier.period}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className='flex-1 flex flex-col'>
                <ul className='space-y-3 flex-1 mb-8'>
                  {tier.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className='flex items-start gap-3'>
                      <Check className='h-5 w-5 text-primary flex-shrink-0 mt-0.5' />
                      <span className='text-sm text-muted-foreground'>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size='lg'
                  variant={tier.highlighted ? 'default' : 'outline'}
                  className='w-full'
                  asChild
                >
                  <WaspRouterLink to={routes.SignupRoute.to}>
                    {tier.cta} <span aria-hidden='true'>→</span>
                  </WaspRouterLink>
                </Button>

                <p className='mt-4 text-xs text-center text-muted-foreground'>
                  {tier.credits} credits/month ≈ {tier.credits} videos of 15 sec
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ROI Calculator */}
        <div className='mt-16 mx-auto max-w-3xl'>
          <div className='rounded-lg bg-muted/30 p-8 text-center'>
            <h3 className='text-xl font-semibold text-foreground mb-4'>
              💰 ROI in Your First Month
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
              <div>
                <p className='text-sm text-muted-foreground mb-1'>Freelancer</p>
                <p className='text-2xl font-bold text-foreground'>$50-100</p>
                <p className='text-xs text-muted-foreground mt-1'>per video</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground mb-1'>Agency Retainer</p>
                <p className='text-2xl font-bold text-foreground'>$2,000-5,000</p>
                <p className='text-xs text-muted-foreground mt-1'>per month</p>
              </div>
              <div className='md:col-span-1'>
                <p className='text-sm text-primary mb-1'>Anim Ads</p>
                <p className='text-2xl font-bold text-primary'>$69</p>
                <p className='text-xs text-primary mt-1'>one-time payment</p>
              </div>
            </div>
            <p className='mt-6 text-sm text-muted-foreground'>
              Generate 10 videos in Month 1 and save <span className='font-semibold text-foreground'>$430-930</span> compared to hiring freelancers
            </p>
          </div>
        </div>

        {/* FAQ link */}
        <div className='mt-12 text-center'>
          <p className='text-sm text-muted-foreground'>
            Have questions?{' '}
            <a href='#faq' className='font-medium text-primary hover:underline'>
              Check our FAQ
            </a>{' '}
            or{' '}
            <a href='mailto:support@animads.app' className='font-medium text-primary hover:underline'>
              contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
