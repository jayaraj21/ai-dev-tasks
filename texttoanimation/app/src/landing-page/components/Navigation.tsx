import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link as WaspRouterLink, routes } from 'wasp/client/router';
import { Button } from '../../components/ui/button';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border'>
      <nav className='mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8' aria-label='Global'>
        {/* Logo */}
        <div className='flex lg:flex-1'>
          <a href='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Anim Ads</span>
            <div className='flex items-center gap-2'>
              <div className='h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center'>
                <span className='text-white font-bold text-lg'>A</span>
              </div>
              <span className='text-xl font-bold text-foreground'>Anim Ads</span>
            </div>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Menu className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className='hidden lg:flex lg:gap-x-8'>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-sm font-semibold leading-6 text-muted-foreground hover:text-foreground transition-colors'
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4'>
          <Button variant='ghost' asChild>
            <WaspRouterLink to={routes.LoginRoute.to}>Log in</WaspRouterLink>
          </Button>
          <Button variant='default' asChild>
            <WaspRouterLink to={routes.SignupRoute.to}>
              Get Started <span aria-hidden='true'>→</span>
            </WaspRouterLink>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className='lg:hidden'>
          <div className='fixed inset-0 z-50' />
          <div className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border'>
            <div className='flex items-center justify-between'>
              <a href='/' className='-m-1.5 p-1.5'>
                <span className='sr-only'>Anim Ads</span>
                <div className='flex items-center gap-2'>
                  <div className='h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center'>
                    <span className='text-white font-bold text-lg'>A</span>
                  </div>
                  <span className='text-xl font-bold text-foreground'>Anim Ads</span>
                </div>
              </a>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-foreground'
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className='sr-only'>Close menu</span>
                <X className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-border'>
                <div className='space-y-2 py-6'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-muted'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className='py-6 space-y-2'>
                  <Button variant='ghost' className='w-full' asChild>
                    <WaspRouterLink to={routes.LoginRoute.to}>Log in</WaspRouterLink>
                  </Button>
                  <Button variant='default' className='w-full' asChild>
                    <WaspRouterLink to={routes.SignupRoute.to}>
                      Get Started <span aria-hidden='true'>→</span>
                    </WaspRouterLink>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
