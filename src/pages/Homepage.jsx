import { useQuery } from "@tanstack/react-query";
import { getAllBoards } from "../services/apiFeatures";
import BoardCard from "../components/BoardCard";
import Loader from "../components/Loader";

function Homepage() {
  const { data, isLoading } = useQuery({
    queryKey: ["allBoards"],
    queryFn: getAllBoards,
  });

  if (isLoading) return <Loader />;
  return (
    <div className="flex items-center flex-wrap gap-4">
      {data.map((board) => (
        <BoardCard key={board._id} data={board} />
      ))}
    </div>
  );
}

export default Homepage;
