import { useQuery } from "@tanstack/react-query";
import { getAllBoards } from "../services/apiFeatures";
import BoardCard from "../components/BoardCard";

function Homepage() {
  const { data, isLoading } = useQuery({
    queryKey: ["allBoards"],
    queryFn: getAllBoards,
  });

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="flex items-center flex-wrap gap-4">
      {data.map((board) => (
        <BoardCard key={board._id} data={board} />
      ))}
    </div>
  );
}

export default Homepage;
