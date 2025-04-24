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
    <ul>
      {Array.isArray(bookmarks?.children) && bookmarks.children.map((bookmark) => (
        <BookmarkNode key={bookmark.id} bookmark={bookmark} />
      ))}
    </ul>
  );
}

function BookmarkNode({ bookmark }) {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = !bookmark.url;
  const hasChildren = Array.isArray(bookmark.children) && bookmark.children.length > 0;

  const toggleFolder = () => {
    setIsOpen(folderState => !folderState);
  }

  const openLink = (url) => {
    chrome.runtime.sendMessage({
      type: "CREATE_TAB",
      url
    });
  }

  return (
    // Render the bookmark whether a folder or a link
    <li className="mx-2 my-1">
      {/* Render a single folder/link */}
      <div onClick={toggleFolder} className="flex items-center gap-2 hover:bg-gray-100 rounded px-1 py-0.5 cursor-pointer">
        <span>
          {
            isFolder ? (isOpen ? "📂" : "📁") : "🔗"
          }
        </span>

        {
          !isFolder ? (
            <div
              onClick={() => openLink(bookmark.url)}
              rel="noopener noreferrer"
              className="text-white hover:underline text-sm"
            >
              {bookmark.title}
            </div>
          ) : (
            < span className="font-medium text-gray-800 text-sm">{bookmark.title}</span>
          )
        }
      </div>

      {/* Recursively render the children */}
      {
        hasChildren && isOpen && (
          <ul className="pl-4 border-l border-gray-200 hover:text-gray-800 mt-1 space-y-1">
            {bookmark.children.map((child) => (
              <BookmarkNode key={child.id} bookmark={child} />
            ))}
          </ul>
        )
      }
    </li >
  );
}

export default BookmarkTree;
