export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="w-full font-inter">
          {children}
      </main>
    );
  }
  