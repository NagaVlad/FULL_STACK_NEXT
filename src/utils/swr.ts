import type { User } from '@prisma/client'
import useSWRImmutable from 'swr/immutable'
import storageLocal from './storageLocal'
import axiosApi from './axios'

async function fetcher<T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<T> {
  return fetch(input, init).then((res) => res.json())
}

export function usecheckAuth() {
  const { data, error, mutate } = useSWRImmutable<any>(
    'refreshTest',
    async (url) => axiosApi.get('http://localhost:5000/api/refresh'),
    // (url) => fetcher('http://localhost:5000/api/refresh', {
    //   credentials: 'include',
    //   headers: new Headers({ 'content-type': 'application/json', 'withCredentials': 'true' }),
    // }),
    {
      onErrorRetry(err, key, config, revalidate, revalidateOpts) {
        return false
      },
      // refreshInterval: 9000, //? Такое же время и что и время жизни ACCESS Токена
    },
  )

  if (error || data?.message) {

    console.log('error || data?.message', error)

    return {
      userData: undefined,
      accessToken: undefined,
      refreshUserData: mutate
    }
  }

  if (typeof window !== "undefined") {
    storageLocal.set('token', data?.data.accessToken ?? null)
  }

  return {
    userData: data?.data?.user,
    accessToken: data?.data?.accessToken,
    refreshUserData: mutate
  }
}

export function useUser() {
  const { data, error, mutate } = useSWRImmutable<any>(
    '/api/auth/user',
    (url) => fetcher(url, { credentials: 'include' }),
    {
      onErrorRetry(err, key, config, revalidate, revalidateOpts) {
        return false
      },
    }
  )

  if (error || data?.message) {
    // console.log(error || data?.message)

    return {
      user: undefined,
      accessToken: undefined,
      mutate
    }
  }

  return {
    user: data?.user as User,
    accessToken: data?.accessToken as string,
    mutate
  }
}