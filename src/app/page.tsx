import { UserMenu } from "@/components/header/user-menu";

export default function Home() {
  return (
    <div className="min-h-svh">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-end px-4">
          <UserMenu />
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1>Bem-vindo</h1>
        <p className="text-muted mt-2">Conteúdo da sua aplicação aqui.</p>
      </main>
    </div>
  );
}

