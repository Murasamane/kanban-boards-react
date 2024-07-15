import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./layouts/AppLayout";
import Board from "./pages/Board";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });


  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="*" element={<NotFound />} />
            <Route index element={<Homepage />} />
            <Route path="/:boardId" element={<Board />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
