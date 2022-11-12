import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Todo } from "./pages/Todo";
import { LoginPage } from "./pages/LoginPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginPage />
      {/* <Todo /> */}
    </QueryClientProvider>
  );
}

export default App;
