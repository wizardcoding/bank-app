import Navigation from "@/components/ui/Navigation";

const SideBar = (props: SiderbarProps) => {
    const{ user } = props;
    return (
        <section className="sidebar">
            <Navigation/>
                Footer
        </section>
    )
}

export default SideBar