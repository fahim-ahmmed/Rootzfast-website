"use client";

import { useState } from "react";
import { Input, Button, Card, CardBody } from "@heroui/react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    await signIn.email({
      email,
      password,
      callbackURL: "/",
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          alert(ctx.error.message || "Login failed");
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
            <h1 className="text-2xl font-serif font-bold text-forest">Welcome Back</h1>
            <p className="text-xs text-charcoal/70">Login to access your ROOTZ account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
              Sign In
            </Button>
          </form>

          <p className="text-center text-xs text-charcoal/70">
            Don't have an account?{" "}
            <Link href="/register" className="text-forest font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}