import Image from "next/image";

let columns = 'columns-2';
// const updateClassColumn = () => {
//   if(window.innerWidth < 1024) {
//     columns = ''
//   } else {
//     columns = 'columns-2';
//   }
// }
// window.addEventListener("resize", updateClassColumn, true);

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    return (
      <main className={`${columns} min-h-screen w-full justify-between font-inter`}>
          {children}
          <div className="auth-asset">
            <div>
              <Image src="/icons/auth-image.svg" alt="auth" width={500} height={500}/>
            </div>
          </div>
      </main>
    );
  }
  