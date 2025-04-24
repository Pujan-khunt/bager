import BookmarkTree from "./components/BookmarkTree";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="w-[380px] bg-sky-700 border-2 border-[#121a27] shadow-lg no-scrollbar">
      <Navbar />
      <BookmarkTree />
      <Footer />
    </div>
  );
}

export default App;
