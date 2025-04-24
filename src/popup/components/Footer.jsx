import { useState } from "react";

function Footer() {
  const [version, setVersion] = useState(() => {
    async function fetchVersion() {
      const response = await chrome.runtime.sendMessage({ type: "GET_VERSION" })
      setVersion(response.version)
    };

    fetchVersion();
  });

  return (
    <footer className="bg-teal-400 px-4 py-1 mt-auto">
      <div className="flex items-center justify-between text-xs text-white">
        <span>Bager v{version}</span>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Pujan-khunt/Bager"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-100 transition-colors cursor-pointer"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc3_FFf2_llbPoQH8GZYBMisAhOPvx4QarwTVA8ymIHg73Jog/viewform?usp=header"
            className="hover:text-teal-100 transition-colors cursor-pointer"
            target="_blank"
          >
            Feedback
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
