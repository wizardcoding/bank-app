import SideBar from "@/components/ui/SideBar";
import MobileNavBar from "@/components/ui/MobileNavBar";
import Image from "next/image";
import { isLogged } from "@/lib/auth/actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedUser = await isLogged();
  
  return (
    <main className="flex h-screen w-full font-inter">
        <SideBar user={loggedUser} />
        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image alt="Menu Icon" src="/icons/logo.svg" width={30} height={30}/>
            <div>
              <MobileNavBar user={loggedUser}/>
            </div>
          </div>
          {children}
        </div>
    </main>
  );
}
