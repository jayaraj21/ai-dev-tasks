export default function ProcessSteps() {
  const steps = [
    {
      number: '1',
      emoji: '🎨',
      title: 'Set up your brand',
      description: 'Upload your logo, colors, and product images. Or paste your website URL to auto-extract.',
    },
    {
      number: '2',
      emoji: '📝',
      title: 'Describe your product',
      description: 'Fill in simple details: product name, offer, and call-to-action. No design skills needed.',
    },
    {
      number: '3',
      emoji: '⚡',
      title: 'Generate & download',
      description: 'Get 4 video variations in under 60 seconds. Pick your favorite, customize, and download.',
    },
  ];

  return (
    <div className='py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-base font-semibold leading-7 text-primary'>Simple Process</h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Create Professional Videos in 3 Easy Steps
          </p>
          <p className='mt-6 text-lg leading-8 text-muted-foreground'>
            No design experience required. From idea to video in under 5 minutes.
          </p>
        </div>

        <div className='mx-auto mt-16 max-w-5xl'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            {steps.map((step, index) => (
              <div key={step.number} className='relative'>
                {/* Connector line (hidden on mobile, visible on md and up, except for last item) */}
                {index < steps.length - 1 && (
                  <div className='hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-1/2' />
                )}

                <div className='flex flex-col items-center text-center'>
                  {/* Step number badge */}
                  <div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-8 ring-background relative z-10'>
                    <span className='text-2xl font-bold text-primary'>{step.number}</span>
                  </div>

                  {/* Emoji */}
                  <div className='mt-4 text-5xl'>{step.emoji}</div>

                  {/* Title */}
                  <h3 className='mt-4 text-xl font-semibold text-foreground'>{step.title}</h3>

                  {/* Description */}
                  <p className='mt-2 text-sm text-muted-foreground'>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className='mt-16 flex justify-center'>
          <div className='inline-flex rounded-lg bg-primary/5 p-1'>
            <p className='text-sm text-muted-foreground px-4 py-2'>
              ⏱️ Average time from signup to first video: <span className='font-semibold text-foreground'>4 minutes</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
