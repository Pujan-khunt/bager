import { useState, useEffect } from "react";

function BookmarkTree() {
  const [bookmarks, setBookmarks] = useState([]);

  // Fetch bookmarks from Chrome API
  useEffect(() => {
    const message = {
      type: "GET_BOOKMARK_TREE"
    }

    chrome.runtime.sendMessage(message, (response) => {
      if (response?.bookmarks) {
        setBookmarks(response.bookmarks[0]);
        console.log("Response recieved from background.js:", response.bookmarks[0])
      }
    });
  }, []);

  return (
    <ul className="">
      {Array.isArray(bookmarks?.children) && bookmarks.children.map((bookmark) => (
        <BookmarkNode key={bookmark.id} bookmark={bookmark} />
      ))}
    </ul>
  );
}

function BookmarkNode({ bookmark }) {
  const isFolder = !bookmark.url;
  const hasChildren = Array.isArray(bookmark.children) && bookmark.children.length > 0;

  return (
    <li className="ml-2 mt-1">
      <div className="flex items-center gap-2 hover:bg-gray-100 rounded px-1 py-0.5 cursor-pointer">
        <span className="text-gray-600">
          {isFolder ? "📁" : "🔗"}
        </span>
        {bookmark.url ? (
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            {bookmark.title || bookmark.url}
          </a>
        ) : (
          <span className="font-medium text-gray-800 text-sm">{bookmark.title}</span>
        )}
      </div>

      {hasChildren && (
        <ul className="pl-4 border-l border-gray-200 mt-1 space-y-1">
          {bookmark.children.map((child) => (
            <BookmarkNode key={child.id} bookmark={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

// function BookmarkNode({ bookmark }) {
//   return (
//     <li>
//       {bookmark.url ? (
//         <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
//           {bookmark.title}
//         </a>
//       ) : (
//         <span>{bookmark.title}</span>
//       )}
//       {bookmark.children && (
//         <ul>
//           {Array.isArray(bookmark?.children) && bookmark.children.length > 0 && bookmark.children.map((child) => (
//             <BookmarkNode key={child.id} bookmark={child} />
//           ))}
//         </ul>
//       )}
//     </li>
//   );
// }

export default BookmarkTree;
