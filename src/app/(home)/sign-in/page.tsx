import { SignInButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <>
      <SignInButton forceRedirectUrl={"/drive"} />
      <footer className="mt-16 text-sm text-neutral-500">
        © {new Date().getFullYear()} ashish2508. All rights reserved. 
      </footer>
    </>
  );
}
