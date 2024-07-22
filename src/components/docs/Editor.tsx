import React, { useCallback, useState } from 'react'
import { type BaseEditor, createEditor } from 'slate'
import { Slate, Editable, withReact, type RenderElementProps, type RenderLeafProps, type ReactEditor } from 'slate-react'
import { toggleCodeBlock, toggleBoldMark, toggleItalicMark, toggleUnderlineMark, undo, redo, toggleStrikeThrough } from './editorCommands'
import { initialValue } from '@/constants'
import { HistoryEditor, withHistory } from 'slate-history'
import Link from 'next/link'
import IconSVG from '../icons/logo'
import { Input } from '../ui/input'
import { MdFileCopy, MdFileDownload, MdFileOpen, MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdLocalPrintshop, MdOutlineRedo, MdOutlineShare, MdOutlineStrikethroughS, MdOutlineUndo } from "react-icons/md";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import EditorCSS from './Editor.module.css'
import FontInput from '../ui/FontSizeInput'
import FontColorInput from '../ui/FontColorInput'

export default function DocsEditor() {
  const [editor] = useState(() => withReact(withHistory(createEditor())))

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />
  }, [])

  
  // const pages = [1, 2, 3]

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
    >
      <Toolbar editor={editor}/>
      <div className='w-full h-screen flex flex-col items-center align-top overflow-y-scroll print:h-full'>
        <Editable
          renderElement={props => renderElement(props)}
          renderLeaf={props => renderLeaf(props)}
          onKeyDown={event => {
            if (!event.ctrlKey) {
              return
            }

            // Replace the `onKeyDown` logic with our new commands.
            switch (event.key) {
              case '`': {
                event.preventDefault()
                toggleCodeBlock(editor)
                break
              }

              case 'b': {
                event.preventDefault()
                toggleBoldMark(editor)
                break
              }
                
              case 'i': {
                event.preventDefault()
                toggleItalicMark(editor)
                break
              }
                
              case 'u': {
                event.preventDefault()
                toggleUnderlineMark(editor)
                break
              }
                
              case 'z': {
                event.preventDefault()
                HistoryEditor.undo(editor)
                break
              }
                
              case 'y': {
                event.preventDefault()
                HistoryEditor.redo(editor)
                break
              }
            }
          }}
          className='max-w-[8.27in] max-h-[11.69in] min-w-[8.3in] min-h-[13in] p-[1in] bg-white focus:outline-none print:outline-none border-2 text-black drop-shadow-lg my-4 print:m-0 overflow-x-auto rounded-sm'
        />
      </div>
    </Slate>
  )
}

const CodeElement = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>
}

const Leaf = (props: RenderLeafProps) => {
  return (
    <span
      {...props.attributes}
      className={`${props.leaf.bold ? 'font-bold' : ''} ${props.leaf.italic ? 'italic' : ''} ${props.leaf.underline ? 'underline' : ''} ${props.leaf.strikeThrough ? 'line-through' : ''}`}
    >
      {props.children}
    </span>
  )
}

const Toolbar = ({ editor }: { editor: HistoryEditor & BaseEditor & ReactEditor }) => {
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