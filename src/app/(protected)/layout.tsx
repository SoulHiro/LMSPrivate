import HeaderUser from "@/components/header/header"

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderUser />
      {children}
    </>
  );
}
