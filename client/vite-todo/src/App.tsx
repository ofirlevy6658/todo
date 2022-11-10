import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Todo } from "./pages/Todo";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todo />
    </QueryClientProvider>
  );
}

export default App;
