import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppNavigator } from "./navigation/AppNavigator";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
}

export default App;