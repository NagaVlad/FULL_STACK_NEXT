'use client'
import useSWRImmutable from 'swr/immutable'
import storageLocal from './storageLocal'
import axiosApi from './axios'

export function useCheckAuth() {
  const { data, error, mutate } = useSWRImmutable<any>(
    'refreshTest',
    async (url) => axiosApi.get(`${process.env.SERVER_URL}/refresh`),
    {
      onErrorRetry(err, key, config, revalidate, revalidateOpts) {
        return false
      },
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
