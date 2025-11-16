import { Check, X } from 'lucide-react';

export default function PricingComparison() {
  const comparisonData = [
    {
      feature: 'Speed',
      animAds: '<60 seconds',
      googleVeo: '2-5 minutes',
      traditional: 'Hours/Days',
      animAdsWins: true,
    },
    {
      feature: 'Purpose',
      animAds: 'Ad-specific',
      googleVeo: 'General video',
      traditional: 'General editing',
      animAdsWins: true,
    },
    {
      feature: 'Ease of Use',
      animAds: 'No skills needed',
      googleVeo: 'Moderate',
      traditional: 'Expert required',
      animAdsWins: true,
    },
    {
      feature: 'Cost',
      animAds: '$69-199 lifetime',
      googleVeo: 'Usage-based',
      traditional: '$50-500/month',
      animAdsWins: true,
    },
    {
      feature: 'Output',
      animAds: 'CTA-optimized ads',
      googleVeo: 'Generic videos',
      traditional: 'Custom',
      animAdsWins: false,
    },
  ];

  return (
    <div className='py-24 sm:py-32 bg-muted/30'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center mb-16'>
          <h2 className='text-base font-semibold leading-7 text-primary'>Comparison</h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Why Choose AdEasy?
          </p>
          <p className='mt-6 text-lg leading-8 text-muted-foreground'>
            See how we stack up against AI video generators and traditional tools.
          </p>
        </div>

        <div className='mx-auto max-w-5xl'>
          {/* Desktop table */}
          <div className='hidden md:block overflow-hidden rounded-lg border border-border bg-card shadow-sm'>
            <table className='min-w-full divide-y divide-border'>
              <thead className='bg-muted/50'>
                <tr>
                  <th
                    scope='col'
                    className='py-4 px-6 text-left text-sm font-semibold text-foreground'
                  >
                    Feature
                  </th>
                  <th
                    scope='col'
                    className='py-4 px-6 text-center text-sm font-semibold text-primary bg-primary/5'
                  >
                    AdEasy
                  </th>
                  <th
                    scope='col'
                    className='py-4 px-6 text-center text-sm font-semibold text-muted-foreground'
                  >
                    Google Veo 3
                  </th>
                  <th
                    scope='col'
                    className='py-4 px-6 text-center text-sm font-semibold text-muted-foreground'
                  >
                    Traditional Tools
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border bg-card'>
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-muted/20' : ''}>
                    <td className='py-4 px-6 text-sm font-medium text-foreground'>{row.feature}</td>
                    <td className='py-4 px-6 text-sm text-center bg-primary/5'>
                      <span className='font-semibold text-primary'>{row.animAds}</span>
                      {row.animAdsWins && (
                        <Check className='inline-block ml-2 h-4 w-4 text-green-600' />
                      )}
                    </td>
                    <td className='py-4 px-6 text-sm text-center text-muted-foreground'>
                      {row.googleVeo}
                    </td>
                    <td className='py-4 px-6 text-sm text-center text-muted-foreground'>
                      {row.traditional}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className='md:hidden space-y-6'>
            {comparisonData.map((row, idx) => (
              <div key={idx} className='rounded-lg border border-border bg-card p-6 shadow-sm'>
                <h3 className='text-lg font-semibold text-foreground mb-4'>{row.feature}</h3>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between p-3 rounded-md bg-primary/5'>
                    <span className='text-sm font-medium text-muted-foreground'>AdEasy</span>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-semibold text-primary'>{row.animAds}</span>
                      {row.animAdsWins && <Check className='h-4 w-4 text-green-600' />}
                    </div>
                  </div>
                  <div className='flex items-center justify-between p-3'>
                    <span className='text-sm font-medium text-muted-foreground'>Google Veo 3</span>
                    <span className='text-sm text-muted-foreground'>{row.googleVeo}</span>
                  </div>
                  <div className='flex items-center justify-between p-3'>
                    <span className='text-sm font-medium text-muted-foreground'>
                      Traditional Tools
                    </span>
                    <span className='text-sm text-muted-foreground'>{row.traditional}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className='mt-12 text-center'>
          <p className='text-sm text-muted-foreground'>
            Join <span className='font-semibold text-foreground'>hundreds of businesses</span>{' '}
            creating professional videos without the hassle
          </p>
        </div>
      </div>
    </div>
  );
}
