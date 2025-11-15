import { Link as WaspRouterLink, routes } from 'wasp/client/router';
import { Button } from '../../components/ui/button';

export default function Hero() {
  return (
    <div className='relative pt-14 w-full'>
      <TopGradient />
      <BottomGradient />
      <div className='md:p-24'>
        <div className='mx-auto max-w-8xl px-6 lg:px-8'>
          <div className='lg:mb-18 mx-auto max-w-3xl text-center'>
            <h1 className='text-5xl font-bold text-foreground sm:text-6xl'>
              Create <span className='text-gradient-primary'>Scroll-Stopping</span> Ad Videos in{' '}
              <span className='italic'>60 Seconds</span>
            </h1>
            <p className='mt-6 mx-auto max-w-2xl text-lg leading-8 text-muted-foreground'>
              Generate professional promotional videos for your products without design skills, expensive agencies, or complex software. Just fill in your details and let AI create eye-catching ads optimized for social media.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Button size='lg' variant='default' asChild>
                <WaspRouterLink to={routes.SignupRoute.to}>
                  Start Creating Free <span aria-hidden='true'>→</span>
                </WaspRouterLink>
              </Button>
              <Button size='lg' variant='outline' asChild>
                <WaspRouterLink to={routes.PricingPageRoute.to}>View Pricing</WaspRouterLink>
              </Button>
            </div>
          </div>
          <div className='mt-14 flow-root sm:mt-14'>
            <div className='flex m-2 justify-center rounded-xl lg:-m-4 lg:rounded-2xl lg:p-4'>
              {/* Placeholder for 30s demo video */}
              <div className='w-full max-w-4xl aspect-video rounded-xl shadow-2xl ring-1 ring-gray-900/10 bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-950 dark:to-amber-950 flex items-center justify-center'>
                <div className='text-center p-8'>
                  <div className='w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center'>
                    <svg
                      className='w-10 h-10 text-purple-600 dark:text-purple-400'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M8 5v14l11-7z' />
                    </svg>
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2'>
                    Watch Demo Video
                  </h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    See how Anim Ads creates professional videos in under 60 seconds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopGradient() {
  return (
    <div
      className='absolute top-0 right-0 -z-10 transform-gpu overflow-hidden w-full blur-3xl sm:top-0'
      aria-hidden='true'
    >
      <div
        className='aspect-[1020/880] w-[70rem] flex-none sm:right-1/4 sm:translate-x-1/2 dark:hidden bg-gradient-to-tr from-amber-400 to-purple-300 opacity-10'
        style={{
          clipPath: 'polygon(80% 20%, 90% 55%, 50% 100%, 70% 30%, 20% 50%, 50% 0)',
        }}
      />
    </div>
  );
}

function BottomGradient() {
  return (
    <div
      className='absolute inset-x-0 top-[calc(100%-40rem)] sm:top-[calc(100%-65rem)] -z-10 transform-gpu overflow-hidden blur-3xl'
      aria-hidden='true'
    >
      <div
        className='relative aspect-[1020/880] sm:-left-3/4 sm:translate-x-1/4 dark:hidden bg-gradient-to-br from-amber-400 to-purple-300 opacity-10 w-[90rem]'
        style={{
          clipPath: 'ellipse(80% 30% at 80% 50%)',
        }}
      />
    </div>
  );
}
