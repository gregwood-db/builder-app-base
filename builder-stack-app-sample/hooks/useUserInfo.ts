// Hook to fetch user information from backend
import useSWR from 'swr'

interface UserInfo {
  email: string | null
  username: string | null
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useUserInfo() {
  const { data, error, isLoading } = useSWR<UserInfo>('/api/user-info', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return { user: data, isLoading, isError: error }
}
