interface VerseHistoryItemProps {
  reference: string;
  date: string;
  verse: string;
}

export default function VerseHistoryItem({
  reference,
  date,
  verse,
}: VerseHistoryItemProps) {
  return (
    <div className="rounded-lg bg-white dark:bg-gray-800 shadow p-4">
      <div className="flex justify-between items-center mb-2">
        <p className="font-serif font-bold text-lg">{reference}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <p className="font-serif text-gray-700 dark:text-gray-300">{verse}</p>
    </div>
  );
}
