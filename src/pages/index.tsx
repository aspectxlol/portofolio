import Navbar from "@/components/Navbar";
import { SVGProps } from "react";
// import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  // const session = useSession()

  return (
    <main>
      <Navbar />
      <section className="w-full h-dvh flex flex-col justify-center">
        <div className="grid grid-cols-2">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-7xl font-bold">Louie Hansen</h1>
            <p className="">Programmer, Developer, Student.</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <IconSVG className="w-[32rem] h-[32rem]"/>
          </div>
        </div>
      </section>
    </main>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function IconSVG({ ref, ...svgProps }: SVGProps<SVGElement>) {
  return (
    <svg width="64" height="64" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <g filter="url(#filter0_d_109_4)">
      <path d="M97.8733 273.32C60.3879 205.695 84.8213 120.485 152.447 83L238.258 237.808C275.743 305.433 251.31 390.642 183.685 428.128L97.8733 273.32Z" fill="url(#paint0_linear_109_4)"/>
      <path d="M274.005 273.32C236.519 205.695 260.953 120.485 328.578 83L414.389 237.808C451.875 305.433 427.442 390.642 359.816 428.128L274.005 273.32Z" fill="url(#paint1_linear_109_4)"/>
      </g>
      <defs>
      <filter id="filter0_d_109_4" x="-4" y="0" width="520" height="520" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_109_4"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_109_4" result="shape"/>
      </filter>
      <linearGradient id="paint0_linear_109_4" x1="151" y1="83" x2="187" y2="428" gradientUnits="userSpaceOnUse">
      <stop stopColor="#00C2FF"/>
      <stop offset="1" stopColor="#007499"/>
      </linearGradient>
      <linearGradient id="paint1_linear_109_4" x1="359" y1="419.5" x2="327" y2="83" gradientUnits="userSpaceOnUse">
      <stop stopColor="#00C2FF"/>
      <stop offset="1" stopColor="#007499"/>
      </linearGradient>
      </defs>
    </svg>
  )
}