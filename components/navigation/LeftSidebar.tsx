import ROUTES from "@/constants/routes";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import NavigationLinks from "./navbar/NavigationLinks";
import { auth, signOut } from "@/auth";

export default async function LeftSidebar() {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border shadow-light-300 sticky top-0 left-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 max-sm:hidden lg:w-[266px] dark:shadow-none">
      <div className="flex flex-1 flex-col gap-6">
        <NavigationLinks />
      </div>

      {userId ? (
        <div className="flex flex-col gap-3">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: ROUTES.SIGN_IN });
            }}
          >
            <Button
              type="submit"
              className="small-medium btn-secondary min-h-[48px] w-full rounded-lg px-4 py-3 shadow-none"
            >
              <Image
                src="/icons/logout.png"
                alt="Logout Icon"
                width={20}
                height={20}
                className="lg:hidden dark:invert"
              />
              <span className="primary-text-gradient max-lg:hidden">Log Out</span>
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <Button
            nativeButton={false}
            className="small-medium btn-secondary min-h-[48px] w-full rounded-lg px-4 py-3 shadow-none"
            render={
              <Link href={ROUTES.SIGN_IN}>
                <Image
                  src="/icons/account.svg"
                  alt="Account Icon"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="primary-text-gradient max-lg:hidden">Log In</span>
              </Link>
            }
          />
          <Button
            nativeButton={false}
            className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[48px] w-full rounded-lg border px-4 py-3 shadow-none"
            render={
              <Link href={ROUTES.SIGN_UP}>
                <Image
                  src="/icons/sign-up.svg"
                  alt="Sign Up Icon"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="max-lg:hidden">Sign Up</span>
              </Link>
            }
          />
        </div>
      )}
    </section>
  );
}
