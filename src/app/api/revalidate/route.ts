
import type { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
   const tag = request.nextUrl.searchParams.get('tag')
   //@ts-ignore
   revalidateTag(tag)
   return Response.json({ revalidated: true, now: Date.now() })
}