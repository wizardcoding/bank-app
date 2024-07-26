'use client';

import Navigation from "@/components/ui/Navigation";
import Link from "next/link";
import Image from "next/image";
import HomeLink from "@/components/ui/HomeLink";
import Footer from "@/components/ui/Footer";
import { useEffect, useState } from "react";

const SideBar = (props: SiderbarProps) => {
    const { user } = props;
    const [type, setType] = useState('desktop');
    //1280
    const updateType = () => {
        if(window.innerWidth < 1280) {
            setType('mobile');
        } else {
            setType('desktop');
        }
    }
    useEffect(() => {
        window.addEventListener("resize", updateType, true);

        return () => {
            window.removeEventListener('resize', updateType, true);
        }
    }, [])

    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-4">
                <HomeLink/>
                <Navigation/>
            </nav>
                <Footer user={user} type={type} />
        </section>
    )
}

export default SideBar