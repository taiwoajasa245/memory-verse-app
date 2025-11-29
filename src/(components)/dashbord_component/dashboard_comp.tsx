"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import clsx from "clsx";
import VerseCard from "./verse_card";
import { saveNote } from "@/lib/api/dashboard";
import { useGetUserDasboard } from "@/hooks/useGetUserDashboard";

type Note = {
  id: number;
  verse_reference: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export default function DashboardComp() {
  const [subscription, setSubscription] = useState("Daily");
  const [notes, setNotes] = useState("");
  const [notesList, setNotesList] = useState<Note[]>([]);
  // const [loadingNotes, setLoadingNotes] = useState(false);
  const [savingNote, setSavingNote] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { dashboardData, isPending, error, refetch } = useGetUserDasboard();
  
  
  useEffect(() => {
    if (dashboardData?.notes) {
      setNotesList(dashboardData.notes);
    }
  }, [dashboardData]);




  return (
    <div className="min-h-screen w-full flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
    

      {/* Main Section */}
      <main className="flex-1 px-4 sm:px-8 lg:px-32 xl:px-56 py-8 flex flex-col gap-10">

        {/* Verse Card */}
        <VerseCard />

        {/* Notes Section */}
        <section className="w-full">
          <h3 className="text-xl sm:text-2xl font-bold font-serif mb-3">My Notes</h3>

          {/* existing notes list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {isPending ? (
              <div>Loading notes...</div>
            ) : notesList.length === 0 ? (
              <div className="text-sm text-gray-500">No notes yet</div>
            ) : (
              notesList.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    setActiveNote(n);
                    setIsModalOpen(true);
                  }}
                  className="text-left p-3 rounded-lg border hover:shadow-sm bg-white dark:bg-[#071014]"
                >
                  <div className="text-sm text-gray-500 mb-1">{n.verse_reference || 'General'}</div>
                  <div className="text-sm line-clamp-3 text-gray-800 dark:text-gray-100">{n.content}</div>
                  <div className="text-xs text-gray-400 mt-2">{new Date(n.created_at).toLocaleString()}</div>
                </button>
              ))
            )}
          </div>

          <Textarea
            placeholder="Write your thoughts and reflections here..."
            className="min-h-48 bg-white dark:bg-[#1a2830] border-none focus:ring-2 focus:ring-primary/50 rounded-xl text-base font-normal"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div className="flex justify-end mt-4">
            <Button
              className={clsx("bg-primary text-[#003366] font-bold hover:bg-opacity-80", savingNote && "opacity-60 cursor-not-allowed")}
              onClick={async () => {
                // Save note to API
                if (!notes.trim()) return;
                setSavingNote(true);
                // setError(null);
                try {
                  const saved = await saveNote(notes, dashboardData?.verse?.reference??'');
                  // setNotesList((prev) => [saved, ...prev]);
                  refetch();
                  setNotes('');
                } catch (e: any) {
                  // setError(e?.message || 'Failed to save note');
                } finally {
                  setSavingNote(false);
                }
              }}
              disabled={savingNote}
            >
              {savingNote ? 'Saving...' : 'Save Notes'}
            </Button>
          </div>

          {error && <div className="text-sm text-red-500 mt-2">{error.message}</div>}
        </section>

        {/* Note modal */}
        {isModalOpen && activeNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsModalOpen(false)} />
            <div className="relative max-w-2xl w-full bg-white dark:bg-background-dark rounded-lg p-6 z-10 shadow-lg overflow-auto max-h-[80vh]">
              <h4 className="font-semibold text-lg mb-2">{activeNote.verse_reference || 'Note'}</h4>
              <div className="prose max-w-none text-sm text-gray-800 dark:text-gray-100 whitespace-pre-wrap">{activeNote.content}</div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" className="mr-2" onClick={() => { setIsModalOpen(false); setActiveNote(null); }}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
