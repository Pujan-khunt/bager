import { useState } from "react";
import { sendMessage } from "../utils/chromeAPI";


export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  // Fetch bookmarks from Chrome API
  useEffect(() => {
    async function communicate() {
      const response = await sendMessage({ type: "GET_BOOKMARK_TREE" });

      if (response?.bookmarks) {
        setBookmarks(response.bookmarks[0]);
        console.log("Response recieved from background.js:", response.bookmarks[0])
      }
    }

    communicate()
  }, []);

  return bookmarks;
}
