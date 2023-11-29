import getCommits from '@/api/getCommits'
import { useQuery } from '@tanstack/react-query'
import { CommitList } from 'types'

export default function Home() {
  const commitQuery = useQuery<CommitList>({
    queryKey: ['commits'],
    queryFn: getCommits
  })

  return (
    <div>Home {commitQuery.isSuccess ? commitQuery.data[0].url : ''}</div>
  )
}
