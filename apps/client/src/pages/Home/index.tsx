import getCommits from '@/api/getCommits'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['commits'],
    queryFn: getCommits
  })
  console.log(isLoading, error, data, isFetching)
  return (
    <div>Home</div>
  )
}
