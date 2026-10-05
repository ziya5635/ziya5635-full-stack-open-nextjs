import MakeAsRead from "./makeAsRead";

type ReadingListItemProps = {
  alreadyRead?: boolean;
  item: {
    id: number;
    blog: {
      id: number;
      title: string;
      url: string;
      author: string;
      likes: number | null;
    };
  };
};

function ReadingListItem({ item, alreadyRead = true }: ReadingListItemProps) {
  let { blog } = item;
  return (
    <li className="flex items-center justify-between gap-4 rounded-lg border border-gray-100 px-4 py-3">
      <div className="min-w-0 flex-1">
        <a
          href={blog.url}
          target="_blank"
          rel="noreferrer"
          className="block truncate text-sm font-medium text-gray-900 hover:text-blue-600"
        >
          {blog.title}
        </a>
        <p className="truncate text-xs text-gray-500">
          {blog.author} · {blog.likes ?? 0} likes
        </p>
      </div>
      {!alreadyRead && (
        <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs">
          <MakeAsRead blogId={blog.id} />
        </span>
      )}
    </li>
  );
}

export default ReadingListItem;
