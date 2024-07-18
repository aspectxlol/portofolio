import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import type { SVGProps } from "react"
import { getServerSession } from "next-auth"
import type { GetServerSidePropsContext } from "next"
import { authOptions } from "@/server/auth"

export default function SignIn() {
  return (
    <main className="flex flex-col justify-center items-center w-full h-dvh">
      <div className="flex flex-col justify-center">
        <div className="flex flex-col justify-center items-center">
          <IconSVG className="w-[16rem] h-[16rem] md:w-[24rem] md:h-[24rem] xl:w-[32rem] xl:h-[32rem] 2xl:w-[48rem] 2xl:h-[48rem]"/>
        </div>
        <div className="flex flex-col justify-center border-white border-2 rounded-lg p-4">
          <h1 className="flex flex-col justify-center text-3xl md:text-5xl text-center font-bold mb-5">Log in</h1>
          <div className="flex flex-col justify-center">
            <Button className="text-center " onClick={() => signIn("discord")}>
              <DiscordIcon />
              Discord
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  if (session) return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }

  return {
    props: {}
  }
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

function DiscordIcon() {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={32} height={32} className="w-8 h-8 mx-5">
      <title>Discord</title>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  )
}