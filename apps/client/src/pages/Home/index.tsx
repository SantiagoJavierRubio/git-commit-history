import getCommits from "@/api/getCommits";
import { useQuery } from "@tanstack/react-query";
import { CommitListElement } from "types";
import CommitTable from "./CommitTable/CommitTable";
import Container from "@/common/Container";
import Loader from "@/common/Loader";

export default function Home() {
  const commitQuery = useQuery<CommitListElement[]>({
    queryKey: ["commits"],
    queryFn: getCommits,
    retry: 3,
  });

  const renderData = () => {
    if (commitQuery.isError) {
      return (
        <div className="w-full h-full flex items-center justify-center text-2xl text-red-500">
          <h1>{commitQuery.error.message}</h1>
        </div>
      );
    } else if (commitQuery.isSuccess)
      return <CommitTable commits={commitQuery.data} />;
    else return <Loader />;
  };
  return <Container>{renderData()}</Container>;
}
