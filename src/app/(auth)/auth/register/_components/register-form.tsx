"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const MASTER_PASSWORD = process.env.NEXT_PUBLIC_MASTER_PASSWORD || "admin123";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Informe seu nome completo" }),
  email: z.email({ message: "Informe um e-mail válido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
  masterPassword: z.string().min(1, { message: "Informe a senha master" }),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showMasterPassword, setShowMasterPassword] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", masterPassword: "" },
  });

  const onSubmit = async (values: RegisterSchema) => {
    try {
      if (values.masterPassword !== MASTER_PASSWORD) {
        toast.error("Senha master incorreta");
        return;
      }

      const result = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
        callbackURL: "/perfil",
      });

      if (result.error) {
        console.error(result.error.message || "Erro ao criar usuário");
      } else {
        toast.success("Usuário criado com sucesso!");
        setTimeout(() => {
          router.push("/perfil");
        }, 1000);
      }
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="João Silva"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="admin@exemplo.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite uma senha segura"
                    {...field}
                    className="pr-10"
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="masterPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha Master</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    id="register-master-password"
                    type={showMasterPassword ? "text" : "password"}
                    placeholder="Digite a senha master"
                    {...field}
                    className="pr-10"
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowMasterPassword(!showMasterPassword)}
                  disabled={isLoading}
                >
                  {showMasterPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Apenas administradores autorizados podem criar novos usuários
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Criando...
            </>
          ) : (
            "Criar Usuário"
          )}
        </Button>
      </form>
    </Form>
  );
}
