"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import type { FavoriteVerseResponse } from "@/lib/api/models";
import { toggleFavVerse } from "@/lib/api/dashboard";
import { formatIsoToLongDate } from "@/utils/to_date_format";

interface Props {
  initialFavorites: FavoriteVerseResponse[];
}

export default function FavoritesList({ initialFavorites }: Props) {
  const [favorites, setFavorites] = useState<FavoriteVerseResponse[]>(initialFavorites || []);

  const removeMutation = useMutation({
    mutationFn: (id: number) => toggleFavVerse(id),
    onSuccess: (_data, id) => {
        console.log("Data is ", _data)
      setFavorites((prev) => prev.filter((f) => f.verse_id !== id ));
    },
    onError: (err: any) => {
      console.error("Failed to remove favorite:", err);
    },
  });

  const handleRemove = (id: number) => {
    if (!confirm("Remove this verse from favorites?")) return;
    removeMutation.mutate(id);
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        <p className="text-lg sm:text-xl font-medium">You haven’t added any favorite verses yet.</p>
        <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500 mt-1">Mark verses as favorites to see them here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((fav) => (
        <div
          key={fav.id}
          className="relative p-5 rounded-xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="absolute top-3 left-3">
            {/* placeholder checkbox space */}
          </div>

          <div className="pl-8 pr-10">
            <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm">{formatIsoToLongDate(fav?.created_at)}</p>
            <p className="text-lg sm:text-xl font-semibold font-serif mt-1">{fav.verse.reference}</p>
            <p className="text-gray-700 dark:text-gray-300 mt-2 font-serif text-sm sm:text-base leading-relaxed">“{fav.verse.verse}”</p>
          </div>

          <Button
            variant="ghost"
            className="absolute top-3 right-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
            onClick={() => handleRemove(fav.verse_id)}
            disabled={removeMutation.isPending}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
