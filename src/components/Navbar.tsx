import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import NavbarStyles from './Navbar.module.css'
import type { SVGProps } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "./ui/dropdown-menu";
import { HamburgerIcon } from "./icons/Hamburger";
import { IconSVG } from "./icons/logo";

export default function Navbar() {
  const session = useSession()
  return (
    <nav className="flex justify-between items-center h-24 text-gray-50 p-8 sticky top-0">
      <div>
        <IconSVG className={`${NavbarStyles['nav-icons']}`}/>
      </div>
      <div className="hidden justify-between gap-8 md:flex">
        <Link href={"#"} className={`${NavbarStyles["nav-links"]}`}>Blog</Link>
        <Link href={"#"} className={`${NavbarStyles["nav-links"]}`}>Games</Link>
        <Link href={"#"} className={`${NavbarStyles["nav-links"]}`}>Docs</Link>
      </div>
      <div className="hidden sm:flex">
        {!session.data && <button className="p-2 px-4 rounded-lg hover:bg-blue-300 hover:bg-opacity-20" onClick={() => signIn()}>Log In</button>}
        {session.data && <DropdownMenu>
          <DropdownMenuTrigger><span className="p-2 px-4 rounded-lg hover:bg-blue-300 hover:bg-opacity-20">{session.data?.user.name}</span></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{session.data.user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => signOut()} className="text-center justify-center">Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>}
      </div>
      <div className="flex sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger><HamburgerIcon /></DropdownMenuTrigger>
            {session.data && <DropdownMenuContent>
              <DropdownMenuLabel>{session.data.user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Blogs</DropdownMenuItem>
              <DropdownMenuItem>Games</DropdownMenuItem>
              <DropdownMenuItem>Docs</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => signOut()}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>}
            {!session.data && <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => signIn()}>Log In</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Blogs</DropdownMenuItem>
              <DropdownMenuItem>Games</DropdownMenuItem>
              <DropdownMenuItem>Docs</DropdownMenuItem>
            </DropdownMenuContent>}
          </DropdownMenu>
      </div>
    </nav>
  )
}
