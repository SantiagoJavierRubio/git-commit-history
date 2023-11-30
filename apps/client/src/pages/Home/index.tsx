import getCommits from '@/api/getCommits'
import { useQuery } from '@tanstack/react-query'
import { CommitListElement } from 'types'
import CommitTable from './CommitTable/CommitTable'
import Container from '@/common/Container'
import Loader from '@/common/Loader'

export default function Home() {
  const commitQuery = useQuery<CommitListElement[]>({
    queryKey: ['commits'],
    queryFn: getCommits
  })

  return (
    <Container>{commitQuery.isSuccess ? <CommitTable commits={commitQuery.data} /> : <Loader />}</Container>
  )
}
