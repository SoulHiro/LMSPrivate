import { NavUser } from "@/components/header/nav-user";

const user = {
  name: "Vitor",
  email: "vitor@example.com",
  avatar: "https://avatar.vercel.sh/vitor@example.com",
};

const PerfilPage = () => {
  return (
    <div className="min-h-svh">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-end px-4">
          <NavUser user={user} />
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1>Bem-vindo</h1>
        <p className="text-muted mt-2">Conteúdo da sua aplicação aqui.</p>
      </main>
    </div>
  );
};

export default PerfilPage;
