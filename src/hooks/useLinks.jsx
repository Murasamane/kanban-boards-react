import { useQuery } from "@tanstack/react-query";
import { getBoardLinks } from "../services/apiFeatures";

function useLinks() {
  const { data, isLoading } = useQuery({
    queryKey: ["boardLinks"],
    queryFn: () => getBoardLinks(),
  });

  return { data, isLoading };
}

export default useLinks;
