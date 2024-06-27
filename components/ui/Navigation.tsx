'use client'
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Navigation = () => {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col gap-4">
            <Link className="flex cursor-pointer items-center gap-1 px-4" href="/">
                <Image 
                    src="/icons/logo.svg" 
                    width={34} 
                    height={34} 
                    alt="BMTH" 
                />
                <h1 className="text-26 font-ibm-flex-serif font-bold text-black-1">
                    Horizon
                </h1>
            </Link>
            {sidebarLinks.map((link, index) => {
            const isActive = pathname === link.route ||
                pathname.startsWith(`${link.route}/`);

                return (
                    <Link 
                        key={index + '-Link'} 
                        href={link.route}
                        className={
                            cn('sidebar-link',
                                { 'bg-bank-gradient': isActive }
                            )
                        } 
                    >
                        <div className="relative size-6">
                            <Image 
                                src={link.imgURL} 
                                alt={link.label}
                                fill
                                className={cn({ 'brightness-[3] invert-0': isActive })}
                            />
                        </div>
                            <p className={
                                    cn('sidebar-label', 
                                        { '!text-white': isActive }
                                    )
                                }
                            >
                            {link.label}
                        </p>
                    </Link>
                )
            })}
            user
        </nav>
    )
}

export default Navigation