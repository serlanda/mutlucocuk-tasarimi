import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import TopBar from "./topBar";

export default async function Navbar() {
  const user = auth();
  const { sessionClaims } = auth();

  const cartItems = await db.query.cartItems.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
  });

  return (
    <>
      <TopBar />
      <header className="sticky -top-1 z-10 w-[100%] bg-[#FFFF] px-8 lg:py-[42px] xl:py-9">
        <div className="container relative mx-auto flex flex-grow-0 flex-row items-center justify-center lg:justify-between">
          <ul className="mr-auto flex gap-12">
            <li className="nav relative">
              <Link href="/" className="text-xl tracking-wide">
                Ana Sayfa
              </Link>
            </li>
            <li className="nav relative">
              <Link href="/products" className="text-xl tracking-wide">
                Tüm Ürünler
              </Link>
            </li>
            {sessionClaims?.metadata.role === "admin" && (
              <li className="nav relative">
                <Link href="/admin" className="text-xl tracking-wide">
                  Admin Paneli
                </Link>
              </li>
            )}
          </ul>
          <Link
            href="/"
            className="absolute left-[50%] translate-x-[-50%] transform"
          >
            <Image
              src="https://utfs.io/f/45734ede-2888-4590-9b27-aedd1929e016-2hrqaw.jpg"
              className="rounded-full"
              width={85}
              height={85}
              alt="mutlucocuk tarasimi"
            ></Image>
          </Link>
          <div className="ml-auto flex items-center gap-6 text-xl font-semibold">
            <Link href="/cart" className="relative">
              {cartItems.length > 0 && (
                <span className="absolute bottom-5 left-5 flex h-4 w-4 items-center justify-center rounded-full bg-[#000] text-sm text-[#fff]">
                  {cartItems.length}
                </span>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </Link>
            <SignedOut>
              <SignInButton>Giriş Yap</SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
    </>
  );
}
