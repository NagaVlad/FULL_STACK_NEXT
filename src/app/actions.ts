'use server';

import { revalidateTag } from 'next/cache'

export async function revalidateAllPosts() {
   revalidateTag('allPosts')
}
export async function revalidateOnePosts() {
   revalidateTag('onePosts')
}