import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import type { GetServerSidePropsContext } from "next"
import { authOptions } from "@/server/auth"
import IconSVG from "@/components/icons/logo"
import DiscordIcon from "@/components/icons/Discord"

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