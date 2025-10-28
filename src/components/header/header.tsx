import { NavUser } from "@/components/header/nav-user";

const user = {
  name: "Vitor",
  email: "vitor@example.com",
  avatar: "https://avatar.vercel.sh/vitor@example.com",
};

const HeaderUser = () => {
  return (
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-end px-4">
          <NavUser user={user} />
        </div>
      </header>
  );
};

export default HeaderUser;
