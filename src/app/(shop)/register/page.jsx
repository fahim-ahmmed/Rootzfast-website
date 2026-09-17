"use client";

import { useState } from "react";
import { Input, Button, Card, CardBody } from "@heroui/react";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    await signUp.email({
      email,
      password,
      name,
      callbackURL: "/",
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          alert(ctx.error.message || "Registration failed");
          setLoading(false);
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border border-beige p-4 shadow-sm">
        <CardBody className="space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-serif font-bold text-forest">Create Account</h1>
            <p className="text-xs text-charcoal/70">Join ROOTZ for exclusive modest fashion collections</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              required
              value={name}
              onValueChange={setName}
            />
            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onValueChange={setEmail}
            />
            <Input
              label="Password"
              type="password"
              required
              value={password}
              onValueChange={setPassword}
            />

            <Button
              type="submit"
              isLoading={loading}
              className="w-full bg-forest text-white font-semibold py-6"
            >
              Register Now
            </Button>
          </form>

          <p className="text-center text-xs text-charcoal/70">
            Already have an account?{" "}
            <Link href="/login" className="text-forest font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}