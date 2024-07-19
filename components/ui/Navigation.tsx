'use client'
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Navigation = () => {
    const pathname = usePathname();

    return (
        <>
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
                            <Image 
                                src={link.imgURL} 
                                alt={link.label}
                                width={20}
                                height={20}
                                className={cn({ 'brightness-[3] invert-0': isActive })}
                            />
                            <p className={
                                    cn('text-16 font-semibold text-black-2 sidebar-label', 
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
        </>
    )
}

export default Navigation