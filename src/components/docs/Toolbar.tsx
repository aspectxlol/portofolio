import { Link } from "lucide-react"
import { useState } from "react"
import { MdFileCopy, MdFileOpen, MdOutlineShare, MdFileDownload, MdLocalPrintshop, MdOutlineUndo, MdOutlineRedo, MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdOutlineStrikethroughS } from "react-icons/md"
import { type BaseEditor } from "slate"
import { type HistoryEditor } from "slate-history"
import { type ReactEditor } from "slate-react"
import IconSVG from "../icons/logo"
import FontColorInput from "../ui/FontColorInput"
import FontInput from "../ui/FontSizeInput"
import { undo, redo, toggleBoldMark, toggleItalicMark, toggleUnderlineMark, toggleStrikeThrough } from "./editorCommands"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import EditorCSS from './Editor.module.css'


export default function Toolbar({ editor }: { editor: HistoryEditor & BaseEditor & ReactEditor }) {
  const [FontColor, setFontColor] = useState('#000000')
  return (
    <div className='p-5 sticky top-0 w-full border-b-2 print:hidden transition-all'>
      <div className='flex flex-row'>
        <Link href={"/docs"} className='m-3'><IconSVG /></Link>
        <div className='flex flex-col'>
          <Input placeholder='Untitled Document' />
          <div className='justify-start flex gap-5 m-2'>
            <DropdownMenu>
              <DropdownMenuTrigger className='outline-none'>File</DropdownMenuTrigger>
              <DropdownMenuContent className='bg-gray-600 p-2 rounded-lg'>
                <DropdownMenuItem className='flex flex-row justify-start items-center outline-none text-xl cursor-pointer'><MdFileCopy className='mr-2'/>New</DropdownMenuItem>
                <DropdownMenuItem className='flex flex-row justify-start items-center outline-none text-xl cursor-pointer'><MdFileOpen className='mr-2'/>Open</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='flex flex-row justify-start items-center outline-none text-xl cursor-pointer'><MdOutlineShare  className='mr-2'/>Share</DropdownMenuItem>
                <DropdownMenuItem className='flex flex-row justify-start items-center outline-none text-xl cursor-pointer'><MdFileDownload  className='mr-2'/>Download</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className='outline-none'>View</DropdownMenuTrigger>
              <DropdownMenuContent className='bg-gray-600 p-2 rounded-lg'>
                <DropdownMenuItem>Ruler</DropdownMenuItem>
                <DropdownMenuItem>GridLines</DropdownMenuItem>
                <DropdownMenuItem>blah</DropdownMenuItem>
                <DropdownMenuItem>blah</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className='outline-none'>Insert</DropdownMenuTrigger>
              <DropdownMenuContent className='bg-gray-600 p-2 rounded-lg'>
                <DropdownMenuItem>Image</DropdownMenuItem>
                <DropdownMenuItem>Chart</DropdownMenuItem>
                <DropdownMenuItem>blah</DropdownMenuItem>
                <DropdownMenuItem>blah</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className='flex flex-row items-center'>
        <div className={`${EditorCSS.cmdContainer}`}>
          <button className={`${EditorCSS.cmdButton}`} onClick={() => window.print()}><MdLocalPrintshop className='w-6 h-6'/></button>
        </div>
        <div className={`${EditorCSS.cmdContainer}`}>
          <button className={`${EditorCSS.cmdButton}`} onClick={() => undo(editor)}><MdOutlineUndo  className='w-6 h-6'/></button>
          <button className={`${EditorCSS.cmdButton}`} onClick={() => redo(editor)}><MdOutlineRedo  className='w-6 h-6'/></button>
        </div>
        <div className={`${EditorCSS.cmdContainer}`}>
          <FontInput />
        </div>
        <div className={`${EditorCSS.cmdContainer}`}>
          <button className={``} onClick={() => toggleBoldMark(editor)}><MdFormatBold className='w-6 h-6'/></button>
          <button className={`${EditorCSS.cmdButton}`} onClick={() => toggleItalicMark(editor)}><MdFormatItalic className='w-6 h-6'/></button>
          <button className={`${EditorCSS.cmdButton}`} onClick={() => toggleUnderlineMark(editor)}><MdFormatUnderlined className='w-6 h-6'/></button>
          <button className={`${EditorCSS.cmdButton}`} onClick={() => toggleStrikeThrough(editor)}><MdOutlineStrikethroughS className='w-6 h-6' /></button>
          <FontColorInput FontColor={FontColor} setFontColor={(color) => setFontColor(color)} FontColorCSS={EditorCSS.cmdButton!}/>
        
        </div>
        <div>
          <button></button>
        </div>
      </div>
    </div>
  )
}