"use client";

import NavigationBar from "../dashboard/_components/navigationBar";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function NavigationWrapper() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("search") || "";
  const [query, setQuery] = useState(initialQuery);

  const fetchData = (q: string) => {
    router.push(`/dashboard?search=${encodeURIComponent(q)}`);
  };

  return (
    <NavigationBar
      query={query}
      setQuery={setQuery}
      fetchData={fetchData}
    />
  );
}
