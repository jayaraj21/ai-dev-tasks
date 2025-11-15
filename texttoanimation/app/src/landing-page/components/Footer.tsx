interface NavigationItem {
  name: string;
  href: string;
}

export default function Footer({
  footerNavigation,
}: {
  footerNavigation: {
    app: NavigationItem[];
    company: NavigationItem[];
  };
}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-muted/30 border-t border-border' aria-labelledby='footer-heading'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8'>
        <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
          {/* Brand section */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <div className='h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center'>
                <span className='text-white font-bold text-lg'>A</span>
              </div>
              <span className='text-xl font-bold text-foreground'>Anim Ads</span>
            </div>
            <p className='text-sm leading-6 text-muted-foreground max-w-xs'>
              Create scroll-stopping promotional videos in 60 seconds. No design skills required.
            </p>
            <div className='flex space-x-4'>
              {/* Social media links */}
              <a
                href='https://twitter.com/animads'
                className='text-muted-foreground hover:text-foreground transition-colors'
                target='_blank'
                rel='noopener noreferrer'
              >
                <span className='sr-only'>Twitter</span>
                <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                  <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                </svg>
              </a>
              <a
                href='https://linkedin.com/company/animads'
                className='text-muted-foreground hover:text-foreground transition-colors'
                target='_blank'
                rel='noopener noreferrer'
              >
                <span className='sr-only'>LinkedIn</span>
                <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                  <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                </svg>
              </a>
              <a
                href='https://youtube.com/@animads'
                className='text-muted-foreground hover:text-foreground transition-colors'
                target='_blank'
                rel='noopener noreferrer'
              >
                <span className='sr-only'>YouTube</span>
                <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                  <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation sections */}
          <div className='mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0'>
            <div className='md:grid md:grid-cols-2 md:gap-8'>
              <div>
                <h3 className='text-sm font-semibold leading-6 text-foreground'>Product</h3>
                <ul role='list' className='mt-6 space-y-4'>
                  {footerNavigation.app.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className='text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors'
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href='#features'
                      className='text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href='#pricing'
                      className='text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              <div className='mt-10 md:mt-0'>
                <h3 className='text-sm font-semibold leading-6 text-foreground'>Company</h3>
                <ul role='list' className='mt-6 space-y-4'>
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className='text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors'
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='md:grid md:grid-cols-2 md:gap-8'>
              <div>
                <h3 className='text-sm font-semibold leading-6 text-foreground'>Resources</h3>
                <ul role='list' className='mt-6 space-y-4'>
                  <li>
                    <a
                      href='#faq'
                      className='text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors'
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href='mailto:support@animads.app'
                      className='text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Contact Support
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Video Tutorials
                    </a>
                  </li>
                </ul>
              </div>
              <div className='mt-10 md:mt-0'>
                <h3 className='text-sm font-semibold leading-6 text-foreground'>Legal</h3>
                <ul role='list' className='mt-6 space-y-4'>
                  <li>
                    <a
                      href='#'
                      className='text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Refund Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className='mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24'>
          <p className='text-xs leading-5 text-muted-foreground text-center'>
            &copy; {currentYear} Anim Ads. All rights reserved. Made with love for entrepreneurs and marketers.
          </p>
        </div>
      </div>
    </footer>
  );
}
