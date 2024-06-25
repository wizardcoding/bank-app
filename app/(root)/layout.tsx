import SideBar from "@/components/ui/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = {
    fistName: 'Faron',
    lastName: 'Daliance'
  };
  return (
    <main className="flex h-screen w-full font inter">
        <SideBar user={loggedIn} />
        {children}
    </main>
  );
}
