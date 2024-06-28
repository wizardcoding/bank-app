import Link from "next/link";
import Image from "next/image";

function HomeLink() {
  return (
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
  )
}

export default HomeLink