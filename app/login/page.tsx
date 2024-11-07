import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogInIcon } from "lucide-react";

import { Button } from "../_components/ui/button";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  // Hooks
  const { userId } = await auth();

  // Renders
  if (userId) {
    redirect("/");
  }
  return (
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <Image
          className="mb-8"
          src="/images/logo.svg"
          alt="Finan Control"
          width={173}
          height={39}
        />
        <h1 className="mb-3 text-4xl font-bold">Welcome</h1>
        <p className="mb-8 text-muted-foreground">
          Finance AI is a financial management platform that uses AI to monitor
          your transactions and offer personalized insights, making it easier to
          control your budget.
        </p>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2" />
            Login or create account
          </Button>
        </SignInButton>
      </div>

      <div className="relative h-full w-full">
        <Image
          src="/images/login.png"
          alt="login page image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}