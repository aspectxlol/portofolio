import { IconSVG } from "@/components/icons/logo";
import Navbar from "@/components/Navbar";
import type { SVGProps } from "react";
// import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  // const session = useSession()

  return (
    <main>
      <Navbar />
      <section className="w-full h-dvh flex flex-col justify-center">
        <div className="grid grid-rows-2 sm:grid-cols-2 sm:grid-rows-1">
          <div className="flex flex-col justify-center items-center sm:hidden">
            <IconSVG className="w-[16rem] h-[16rem] md:w-[24rem] md:h-[24rem] xl:w-[32rem] xl:h-[32rem] 2xl:w-[48rem] 2xl:h-[48rem]"/>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold text-center md:text-7xl xl:text-9xl 2xl:text-[10rem]">Louie Hansen</h1>
            <p className="text-xl md:text-xl xl:text-3xl 2xl:text-5xl text-center">Programmer, Developer, Student.</p>
          </div>
          <div className="hidden flex-col justify-center items-center sm:flex">
            <IconSVG className="w-[16rem] h-[16rem] md:w-[24rem] md:h-[24rem] xl:w-[32rem] xl:h-[32rem] 2xl:w-[48rem] 2xl:h-[48rem]"/>
          </div>
        </div>
      </section>
    </main>
  );
}
