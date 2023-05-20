'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/shadcn-ui/navigation-menu';
import Link from 'next/link';
import { UserButton, useAuth } from '@clerk/nextjs';

const Navbar = () => {
  const { userId } = useAuth();
  const signedIn = Boolean(userId);
  return (
    <nav className='flex-start flex items-center p-0 px-4 py-1 shadow-md'>
      <Link href='/'>
        <h4 className='text-md font-bold'>Collec</h4>
      </Link>
      <NavigationMenu
        className='flex-start flex
      justify-end'>
        <NavigationMenuList>
          {signedIn && (
            <NavigationMenuItem>
              <Link href='/collections' legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Collections
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
          {!signedIn && (
            <NavigationMenuItem>
              <Link href='/login' legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Login
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      {signedIn && (
        <div className='mx-2 flex items-center'>
          <UserButton afterSignOutUrl='/' />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
