import { useState } from "react";
import { sendMessage } from "../utils/chromeAPI";

export function useVersion() {
  const [version, setVersion] = useState(() => {
    async function fetchVersion() {
      const response = await sendMessage({ type: "GET_VERSION" })
      setVersion(response.version)
    };

    fetchVersion();
  });

  return version;
}
