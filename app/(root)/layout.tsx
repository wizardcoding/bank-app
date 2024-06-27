import SideBar from "@/components/ui/SideBar";
import MobileNavBar from "@/components/ui/MobileNavBar";
import Image from "next/image";

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
        <div className="flex size-ful flex-col">
          <div className="root-layout">
            <Image alt="Menu Icon" src="/icons/logo.svg" width={30} height={30}/>
            <div>
              <MobileNavBar user={loggedIn}/>
            </div>
          </div>
          {children}
        </div>
    </main>
  );
}
