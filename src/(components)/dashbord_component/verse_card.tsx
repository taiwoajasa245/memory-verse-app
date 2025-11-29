"use client"; 
import { Button } from "@/components/ui/button";
import { useGetUserDasboard } from "@/hooks/useGetUserDashboard";
import { toggleFavVerse } from "@/lib/api/dashboard";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";


export default function VerseCard() {
  const { dashboardData, isPending, error, refetch } = useGetUserDasboard();
  const [verseId, setVerseId] = useState(0); 
  const [isError, setIsError] = useState("")
  const [isSaved, setIsSAved] = useState(false)



  useEffect(() => {
    if (dashboardData?.verse?.id) {
      setVerseId(dashboardData.verse.id);
    }
  }, [dashboardData]);


  function versePaceString(versePace: String){
    if (versePace == "daily"){
      return "Day"
    } else if (versePace == "weekly"){
      return "Week"
    } else {
      return "N/A"
    }
  }

  const toggleFavMutation = useMutation({
    mutationFn: () => toggleFavVerse(verseId),
    onSuccess: (data) => {
      setIsSAved(data.is_saved || false)
    },
    
    onError: (error: Error) => {
      setIsError(error.message || "Verse not saved");
    },
  });



  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 w-full mx-auto">
      {/* Loading skeleton */}
      {isPending? (
        <div className="p-4 sm:p-6 md:p-8 animate-pulse">
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-3" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-3" />
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
          </div>
          <div className="mt-4 h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      ) : error ? (
        <div className="p-6 text-center">
          <p className="text-sm text-red-600 dark:text-red-400 mb-3">Failed to load verse.</p>
          <div className="flex justify-center">
    
            <Button onClick={() => refetch()}>Retry</Button>
          </div>
        </div>
      ) : (
        <>
          {/* Top Image Section */}
          <div className="relative w-full aspect-[3/2] sm:aspect-[3/1]">
            <img
              src={"https://images.unsplash.com/photo-1522205408450-add114ad53fe?auto=format&fit=crop&w=1600&q=80"}
              alt={dashboardData?.verse?.reference || "Verse background"}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6 md:p-8">
            <p className="text-gray-500 text-xs sm:text-sm font-medium">Verse of the {versePaceString(dashboardData?.user?.verse_pace || "N/A")}</p>
            <p className="text-xl sm:text-2xl md:text-3xl font-serif font-bold">
              {dashboardData?.verse?.reference || "—"}
            </p>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 font-serif mt-2 leading-relaxed">
              {dashboardData?.verse?.verse || "No verse available."}
            </p>

            <div className="mt-4">
              
            <Button
              className="w-full sm:w-auto"
              disabled={toggleFavMutation.isPending}
              onClick={()=>{ toggleFavMutation.mutate()}}
            >
              {toggleFavMutation.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                
                isSaved ? "Unsave Verse" : "Save Verse"

              )}
            </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}