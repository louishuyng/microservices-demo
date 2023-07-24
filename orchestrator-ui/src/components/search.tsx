"use client";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

export function Search({ onChange }: { onChange?: (value: string) => void }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    onChange && onChange(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="w-[500px]"
        onChange={(value) => setSearch(value.target.value)}
      />
    </div>
  );
}
