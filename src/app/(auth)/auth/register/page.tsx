"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Criar conta</CardTitle>
          <CardDescription>
            Preencha os campos para registrar um novo usuário.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm isLoading={loading} onLoadingChange={setLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
