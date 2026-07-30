"use client";

import { sidebarLinks } from "@/constants/sidebarLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";
import React from "react";

export default function NavigationLinks({ isMobileNav = false }: { isMobileNav?: boolean }) {
  const pathname = usePathname();
  //TODO: REMOVE Dummy ID below and replace with actual user ID.
  const userId = "123";

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;
        if (item.route === "/profile") {
          if (userId) item.route = `${item.route}/${userId}`;
          else return null;
        }

        const LinkComponent = (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              isActive ? "primary-gradient text-light-900 rounded-lg" : "text-dark300_light900",
              "flex items-center gap-4 bg-transparent p-4"
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn({ "invert-colors": !isActive })}
            />
            <p className={cn(isActive ? "base-bold" : "base-medium", !isMobileNav && "max-lg:hidden")}>{item.label}</p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose key={item.route} nativeButton={false} render={LinkComponent} />
        ) : (
          <React.Fragment key={item.route}>{LinkComponent} </React.Fragment>
        );
      })}
    </>
  );
}
