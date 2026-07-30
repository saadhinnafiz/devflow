import Image from "next/image";
import Link from "next/link";

import {
  Sheet,
  SheetClose,
  SheetContent,
  //   SheetDescription,
  //   SheetFooter,
  //   SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/routes";
import { Button } from "@/components/ui/button";
import NavigationLinks from "./NavigationLinks";

export default function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger
        nativeButton={false}
        render={
          <Image src="/icons/hamburger.svg" width={36} height={36} alt="Menu" className="invert-colors sm:hidden" />
        }
      />
      <SheetContent side="left" className="background-light900_dark200 border-none">
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href="/" className="flex items-center gap-1 px-6 py-6">
          <Image src="/images/site-logo.svg" width={23} height={23} alt="DevFlow Logo" />

          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
            Dev<span className="text-primary-500">Flow</span>
          </p>
        </Link>

        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          <SheetClose
            className="px-6"
            nativeButton={false}
            render={
              <section className="flex h-full flex-col gap-6 pt-16">
                <NavigationLinks isMobileNav />
              </section>
            }
          />

          <div className="flex flex-col gap-3 px-6 pb-6">
            <SheetClose
              nativeButton={false}
              render={
                <Link href={ROUTES.SIGN_IN}>
                  <Button className="small-medium btn-secondary min-h-[48px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              }
            />
            <SheetClose
              nativeButton={false}
              render={
                <Link href={ROUTES.SIGN_UP}>
                  <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[48px] w-full rounded-lg border px-4 py-3 shadow-none">
                    Sign Up
                  </Button>
                </Link>
              }
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
