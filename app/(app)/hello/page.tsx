"use client";
import { client } from "@/utils/hono";
import { useQuery } from "@tanstack/react-query";
export default function Hello() {
  const query = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const res = await client.api.hello.$get();
      if (!res.ok) throw new Error("Failed to fetch chats");
      const data = await res.json();
      return data;
    },
  });
  const { data, isLoading } = query;
  if (isLoading) return <div>Loading...</div>;

  return <div>{data?.hello}</div>;
}
