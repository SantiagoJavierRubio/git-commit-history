import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="h-screen flex items-center justify-center overflow-hidden">
        <Home />
      </main>
    </QueryClientProvider>
  );
}

export default App;
