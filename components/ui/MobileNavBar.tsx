import Image from "next/image"
import Navigation from "@/components/ui/Navigation";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose
  } from "@/components/ui/sheet"

const MobileNavBar = (props: MobileNavProps) => {
  return (
    <section className="w-full max-w-[264px]">
        <Sheet>
            <SheetTrigger>
                <Image
                    className="cursor-pointer"
                    alt="Menu"
                    width={30}
                    height={30}
                    src="/icons/hamburger.svg"
                />
            </SheetTrigger>
            <SheetContent className="boder-none bg-white" side="left">
            <div className="mobilenav-sheet">
                <SheetClose asChild>
                    <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                        <Navigation />    
                    </nav>
                </SheetClose>
            </div>
            </SheetContent>
        </Sheet>
    </section>
  )
}

export default MobileNavBar
