import React, { useCallback, useState } from 'react'
import { type BaseEditor, createEditor } from 'slate'
import { Slate, Editable, withReact, type RenderElementProps, type RenderLeafProps, type ReactEditor } from 'slate-react'
import { toggleCodeBlock, toggleBoldMark, toggleItalicMark, toggleUnderlineMark, undo, redo, toggleStrikeThrough } from './editorCommands'
import { initialValue } from '@/constants'
import { HistoryEditor, withHistory } from 'slate-history'
import Link from 'next/link'
import IconSVG from '../icons/logo'
import { Input } from '../ui/input'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { Bold, Italic, Redo, StrikeThrough, Underline, Undo } from '../icons/Docs'

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


  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
    >
      <Toolbar editor={editor}/>
      <div className='w-full h-dvh overflow-auto flex flex-col justify-center items-center z-0 my-4'>
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
          className='w-[8.3in] h-[13in] p-[1in] bg-white focus:outline-none text-black drop-shadow-lg z-10'
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
  return (
    <div className='p-5 z-10 sticky top-0 bg-gray-500 w-full'>
      <div className='flex flex-row'>
        <Link href={"/docs"}><IconSVG /></Link>
        <div className='flex flex-col '>
          <Input placeholder='Untitled Document' />
          <div className='justify-between flex'>
            <DropdownMenu>
              <DropdownMenuTrigger>File</DropdownMenuTrigger>
              <DropdownMenuContent className='bg-gray-600 p-2 rounded-lg'>
                <DropdownMenuItem>New</DropdownMenuItem>
                <DropdownMenuItem>Open</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem>Download</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>View</DropdownMenuTrigger>
              <DropdownMenuContent className='bg-gray-600 p-2 rounded-lg'>
                <DropdownMenuItem>Ruler</DropdownMenuItem>
                <DropdownMenuItem>GridLines</DropdownMenuItem>
                <DropdownMenuItem>blah</DropdownMenuItem>
                <DropdownMenuItem>blah</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>Insert</DropdownMenuTrigger>
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
        <div className='flex flex-row items-center'>
          <button className='hover:bg-slate-50 hover:bg-opacity-40 rounded-lg p-2 ' onClick={() => undo(editor)}><Undo className=''/></button>
          <button className='hover:bg-slate-50 hover:bg-opacity-40 rounded-lg p-2 ' onClick={() => redo(editor)}><Redo className=''/></button>
        </div>
        <div className='flex flex-row justify-between border-x-2'>
          <button className={`hover:bg-slate-50 hover:bg-opacity-40 rounded-lg p-2`} onClick={() => toggleBoldMark(editor)}><Bold /></button>
          <button className={`hover:bg-slate-50 hover:bg-opacity-40 rounded-lg p-2`} onClick={() => toggleItalicMark(editor)}><Italic /></button>
          <button className={`hover:bg-slate-50 hover:bg-opacity-40 rounded-lg p-2`} onClick={() => toggleUnderlineMark(editor)}><Underline /></button>
          <button className={`hover:bg-slate-50 hover:bg-opacity-40 rounded-lg p-2`} onClick={() => toggleStrikeThrough(editor)}><StrikeThrough /></button>  
        </div>
      </div>
    </div>
  )
}