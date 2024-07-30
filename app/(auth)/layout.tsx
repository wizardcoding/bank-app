import Image from "next/image";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="columns-2 min-h-screen w-full justify-between font-inter">
          {children}
          <div className="auth-asset">
            <div>
              <Image src="/icons/auth-image.svg" alt="auth" width={500} height={500}/>
            </div>
          </div>
      </main>
    );
  }
  