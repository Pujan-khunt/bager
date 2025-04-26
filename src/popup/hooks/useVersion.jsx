import { useState, useEffect } from "react";
import { sendMessage } from "../utils/chromeAPI";

export function useVersion() {
  const [version, setVersion] = useState("0.0.0");

  useEffect(() => {
    const fetchVersion = async () => {
      const responseObj = await sendMessage({ type: "GET_VERSION" });
      setVersion(responseObj.version)
    }

    fetchVersion();
  })

  return version;
}
