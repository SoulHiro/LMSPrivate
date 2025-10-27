"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { LogOutIcon, ShieldIcon } from "lucide-react";
import { Button } from "../ui/button";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};
function getInitials(name?: string | null, email?: string | null) {
  const source = (name?.trim() || email?.trim() || "").trim();
  if (!source) return "?";
  const parts = source.replace(/\s+/g, " ").split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts[parts.length - 1]?.charAt(0) ?? "";
  return `${first}${last}`.toUpperCase();
}

export function UserMenu() {
  const { data } = authClient.useSession();
  const user = (data as { user?: SessionUser } | undefined)?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      window.location.href = "/auth/login";
    } catch {
      // ignore
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          aria-label="Abrir perfil"
          className="cursor-pointer hover:bg-accent/60 focus-visible:ring-ring/50 relative inline-flex size-10 items-center justify-center overflow-hidden rounded-full border transition-colors focus-visible:ring-[3px]"
        >
          <Avatar className="size-10">
            {user?.image ? (
              <AvatarImage src={user.image} alt={user?.name || "Avatar"} />
            ) : (
              <AvatarFallback className="text-sm font-semibold">
                {getInitials(user?.name, user?.email)}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Perfil</DialogTitle>
          <DialogDescription>Informações da conta</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4">
          <Avatar className="size-12">
            {user?.image ? (
              <AvatarImage src={user.image} alt={user?.name || "Avatar"} />
            ) : (
              <AvatarFallback className="text-base font-semibold">
                {getInitials(user?.name, user?.email)}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="min-w-0">
            <div className="truncate text-lg font-medium">
              {user?.name || "Usuário"}
            </div>
            <div className="text-muted-foreground truncate text-sm">
              {user?.email || "sem email"}
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid gap-2">
          <a
            href="/auth/reset"
            className="hover:bg-accent/60 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors"
          >
            <ShieldIcon className="size-4" /> Trocar senha
          </a>
          <Button
            type="button"
            onClick={handleLogout}
            className="cursor-pointer hover:bg-destructive/20 text-destructive inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors"
          >
            <LogOutIcon className="size-4" /> Sair
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
