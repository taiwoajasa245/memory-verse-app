
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { FavoriteVerseResponse } from "@/lib/api/models";
import { getFavouriteVerses } from "@/lib/api/dashboard";
import { formatIsoToLongDate } from "@/utils/to_date_format";
import FavoritesList from "@/(components)/dashbord_component/favorites_list";

export default async function FavoritesPage() {

  const favorites = await getFavouriteVerses();
  
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2">
            <Heart className="text-pink-500" />
            My Favorite Verses
          </h2>
        </div>

        <FavoritesList initialFavorites={favorites} />
      </div>
    </main>
  );
}