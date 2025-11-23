const CommentSkeleton = () => (
    <div className="animate-pulse space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="w-10 h-10 bg-gray-700 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-gray-700 rounded w-1/3 mb-2" />
            <div className="h-3 bg-gray-700 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );

  export default CommentSkeleton