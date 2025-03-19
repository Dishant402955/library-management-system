import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/dark-toggle";
import Link from "next/link";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title: "LMS",
  description: "Library Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,

        layout: {
          shimmer: true,
          animations: true,
        },

        variables: {
          colorBackground: "#020618",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning={true}>
        <body cz-shortcut-listen="true">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <section className="flex items-center justify-between">
              <section className="mx-6 my-5">
                <ModeToggle />
              </section>
              <SignedOut>
                <section className="flex gap-x-3 mx-4 my-3">
                  <Link href={"/sign-in"}>
                    <Button size={"lg"}>Sign In</Button>
                  </Link>

                  <Link href={"/sign-up"}>
                    <Button size={"lg"}>Sign Up</Button>
                  </Link>
                </section>
              </SignedOut>
              <SignedIn>
                <section className="mx-6 my-4">
                  <UserButton />
                </section>
              </SignedIn>
            </section>

            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
