import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { MdAdd, MdOutlineRemove } from "react-icons/md"

export default function FontInput() {
  const [ fontSize, setFontSize ] = useState(12)

  return (
    <div className="flex flex-row justify-between items-center transition-all">
      <button className="flex flex-col justify-center items-center w-8 h-8" onClick={() => setFontSize(fontSize + 1)}>
        <MdAdd />
      </button>
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div onClick={(e) => e.stopPropagation()}>
          <Input 
            type="number" 
            id="font-size" 
            value={fontSize} 
            className="flex-1 w-10 h-10 text-center font-bold" 
            onChange={e => setFontSize(parseInt(e.target.value))}
          />
        </div>
      </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-10 text-center ">
          <DropdownMenuGroup className="">
            {
              [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60]
                .map(v =>
                  <DropdownMenuItem key={v} className="font-bold text-center flex flex-col justify-center" onClick={() => setFontSize(v)}>{v}</DropdownMenuItem>
                )
            }
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <button className="flex flex-col justify-center items-center w-8 h-8 " onClick={() => setFontSize(fontSize - 1)}>
        <MdOutlineRemove />
      </button>
    </div>
  )
}