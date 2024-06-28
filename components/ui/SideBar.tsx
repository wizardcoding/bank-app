import Navigation from "@/components/ui/Navigation";
import Link from "next/link";
import Image from "next/image";
import HomeLink from "@/components/ui/HomeLink";

const SideBar = (props: SiderbarProps) => {
    const{ user } = props;
    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-4">
                <HomeLink/>
                <Navigation/>
            </nav>
                Footer
        </section>
    )
}

export default SideBar