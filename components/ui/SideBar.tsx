'use client'
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const SideBar = (props: SiderbarProps) => {
    const{ user } = props;
    const pathname = usePathname();
    //const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-4">
                <Link className="mb-12 cursor-pointer items-center gap-2" href="/">
                    <Image 
                        src="/icons/logo.svg" 
                        width={34} 
                        height={34} 
                        alt="BMTH" 
                        className="size-[24px]
                            max-xl:size-14"
                    />
                    <h1 className="sidebar-logo">
                        Horizon
                    </h1>
                </Link>
                {sidebarLinks.map((link, index) => {
                    const isActive = pathname === link.route ||
                        pathname.startsWith(`${link.route}/`);

                    return (
                        <Link 
                            key={index + '-Link'} 
                            className={
                                cn('sidebar-link',
                                    { 'bg-bank-gradient': isActive }
                                )
                            } 
                            href={link.route}
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
            </nav>
        </section>
    )
}

export default SideBar