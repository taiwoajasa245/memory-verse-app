"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import VerseHistoryItem from "@/(components)/dashbord_component/verse_history_item";
import { useGetUserDasboard } from "@/hooks/useGetUserDashboard";
import { formatIsoToLongDate } from "@/utils/to_date_format";

export default function VerseHistory() {
    const { dashboardData, isPending, error, refetch } = useGetUserDasboard();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [query]);

  const history = dashboardData?.verse_history || [];

  const filtered = useMemo(() => {
    if (!debouncedQuery) return history;
    return history.filter((item: any) => {
      const ref = String(item?.verse?.reference || "").toLowerCase();
      const verseText = String(item?.verse?.verse || "").toLowerCase();
      const dateText = String(formatIsoToLongDate(item?.delivered_at || "")).toLowerCase();
      return ref.includes(debouncedQuery) || verseText.includes(debouncedQuery) || dateText.includes(debouncedQuery);
    });
  }, [history, debouncedQuery]);



  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Verse History</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Browse through verses you’ve previously generated.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input
              placeholder="Search by keyword, reference or date"
              className="pl-10 h-11 text-base"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
            {isPending && (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm text-gray-500">Loading…</span>
              </div>
            )}
          </div>
        </div>

        {/* Verse History */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-gray-600 dark:text-gray-400">No results found.</div>
          ) : (
            filtered.map((item: any) => (
              <VerseHistoryItem
                key={item.verse.id}
                verse={item.verse.verse}
                reference={item.verse.reference}
                date={formatIsoToLongDate(item.delivered_at)}
              />
            ))
          )}
        </div>


        {/* Load More */}
        <div className="flex justify-center py-6">
          <Button variant="outline" className="h-11 px-6 text-sm sm:text-base">
            Load More
          </Button>
        </div>
      </div>
    </main>
  );
}