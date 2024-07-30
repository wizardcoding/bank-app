"use client";

import Image from "next/image";
import { logOut } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
    const { email, name = '', firstName } = user;
    const cssNameStyle = type === 'desktop' ? 'footer_name' : 'footer_name-mobile';
    const cssEmailStyle = type === 'desktop' ? 'footer_email' : 'footer_email-mobile';

    const router = useRouter();

    const handleLogOut = async () => {
      const loggedOut = await logOut();
      if(loggedOut) {
        router.push("/sign-in");
      }
    }

  return (
    <footer className="footer">
      <div className={cssNameStyle}>
        <p className="text-xl font-bold text-gray-700">
          {name[0]}
        </p>
      </div>
      <div className={cssEmailStyle}>
        <h1 className="text-14 truncate font-semibold text-gray-700">{name}</h1>
        <p className="text-14 truncate font-normail text-gray-600">
          {email}
        </p>
      </div>
      <div className="footer-image" onClick={handleLogOut}>
        <Image 
          src="icons/logout.svg"
          width={17}
          height={17}
          alt="logo_footer"
        />
      </div>
    </footer>
  )
}

export default Footer