import { useQuery } from "@tanstack/react-query";
import { api } from "../libs/api";

function App() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["version"],
    queryFn: () => api.message.get(),
  });

  return (
    <>
      <img src="/images/maddelena-2.webp" className="max-w-40" />
      <h1 className="text-3xl">API call!</h1>
      <h2 className="text-6xl">{isLoading ? "Loading..." : response?.data?.message}</h2>
    </>
  );
}

export default App;
