export default function EmptyCard({ loading, text }: { loading?: boolean; text?: string }) {
  return (
    <div className="w-full h-full">
      <div className="flex justify-center items-center h-full border border-gray-700 bg-gray-900 rounded-lg">
        {loading && <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>}
        {text && <p className="text-center text-gray-500">{text}</p>}
      </div>
    </div>
  );
}
