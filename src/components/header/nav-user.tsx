"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";

export function NavUser() {
  return (
    <div className="flex gap-4">
      <div className="flex gap-2">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage
            src="https://avatar.vercel.sh/vitor@example.com"
            alt="Nome de Usuário"
          />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">Nome de Usuário</span>
          <span className="truncate text-xs">email@example.com</span>
        </div>
      </div>
      <Button onClick={() => authClient.signOut()}>Sair</Button>
    </div>
  );
}

