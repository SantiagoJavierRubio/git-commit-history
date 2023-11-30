import getCommits from '@/api/getCommits'
import { useQuery } from '@tanstack/react-query'
import { CommitListElement } from 'types'
import CommitTable from './CommitTable/CommitTable'
import Container from '@/common/Container'

export default function Home() {
  const commitQuery = useQuery<CommitListElement[]>({
    queryKey: ['commits'],
    queryFn: getCommits
  })

  return (
    <Container>{commitQuery.isSuccess ? <CommitTable commits={commitQuery.data} /> : <h1>loadin</h1>}</Container>
  )
}
