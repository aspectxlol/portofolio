import { authOptions } from "@/server/auth"
import { type GetServerSidePropsContext } from "next"
import { getServerSession } from "next-auth"

export default function Index() {
  return (
    <h1>Hello</h1>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  if (!session) return {
    redirect: {
      destination: '/auth/signin',
      permanent: false
    }
  }

  return {
    props: {}
  }
}