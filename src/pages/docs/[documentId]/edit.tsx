import DocsEditor from '@/components/docs/Editor'
import { authOptions } from '@/server/auth'
import { type GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import React, {  } from 'react'

export default function Edit() {
  return (
    <>
      <DocsEditor />
    </>
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