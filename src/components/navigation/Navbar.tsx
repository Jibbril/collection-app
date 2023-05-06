'use client';

// import './Navbar.css';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/shadcn-ui/navigation-menu';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='flex gap-6 py-1 shadow-md md:gap-10'>
      <NavigationMenu className='flex-start  flex'>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href='/' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/collections' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Collections
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/login' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Login
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className='mr-2 flex items-center'>
        <UserButton afterSignOutUrl='/' />
      </div>
    </nav>
  );
};

export default Navbar;
