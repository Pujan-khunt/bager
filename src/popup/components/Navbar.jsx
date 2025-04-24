import { SettingsIcon, Sun } from "lucide-react"

function Navbar() {
  return (
    <div className="flex w-full h-10 bg-[#ED254E] items-center px-2">
      <div className="grow font-extrabold text-2xl text-[#000]">Bager</div>
      <div className="flex gap-x-3">
        <Sun className="cursor-pointer hover:-translate-y-0.5 transition duration-200 hover:rotate-90" />
        <SettingsIcon className="cursor-pointer hover:-translate-y-0.5 transition duration-200 hover:rotate-90" />
      </div>
    </div>
  )
}

export default Navbar
