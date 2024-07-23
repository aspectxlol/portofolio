import React, { useCallback, useEffect, useState } from 'react'
import { createEditor, Editor } from 'slate'
import { Slate, Editable, withReact, type RenderElementProps, type RenderLeafProps } from 'slate-react'
import { toggleCodeBlock, toggleBoldMark, toggleItalicMark, toggleUnderlineMark } from './editorCommands'
import { initialValue } from '@/constants'
import { HistoryEditor, withHistory } from 'slate-history'
import Toolbar from './Toolbar'
import { Underline } from 'lucide-react'

export default function DocsEditor() {
  const [editor] = useState(() => withReact(withHistory(createEditor())))
  const [isBoldStatus, setBoldStatus] = useState(false)
  const [isItalicStatus, setItalicStatus] = useState(false)
  const [isUnderlineStatus, setUnderlineStatus] = useState(false)
  const [isStrikeThroughStatus, setStrikeThroughStatus] = useState(false)


  const { onChange } = editor
  editor.onChange = () => {
    if (editor.operations.every(op => op.type === 'set_selection')) {
      const marks = Editor.marks(editor)
      if (marks?.bold) {setBoldStatus(true)} else { setBoldStatus(false) }
      if (marks?.italic) {setItalicStatus(true)} else { setItalicStatus(false) }
      if (marks?.underline) {setUnderlineStatus(true)} else { setUnderlineStatus(false) }
      if (marks?.strikeThrough) {setStrikeThroughStatus(true)} else { setStrikeThroughStatus(false) }
    }

    return onChange()
  }

  // useEffect(() => {
  //   console.log("Bold", isBoldStatus, isBoldStatus && "Y")
  // }, [isBoldStatus])

  // useEffect(() => {
  //   console.log("Underline", isUnderlineStatus, isUnderlineStatus && "Y")
  // }, [isUnderlineStatus])

  // useEffect(() => {
  //   console.log("Italic", isItalicStatus, isItalicStatus && "Y")
  // }, [isItalicStatus])
  
  // useEffect(() => {
  //   console.log("StrikeThrough", isStrikeThroughStatus, isStrikeThroughStatus && "Y")
  // }, [isStrikeThroughStatus])

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "code":
        return (
          <pre {...props.attributes}>
            <code>{props.children}</code>
          </pre>
        )
      default:
        return <p {...props.attributes}>{props.children}</p>
    }
  }, [])

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return (
      <span
        {...props.attributes}
        className={`
          ${props.leaf.bold ? 'font-bold' : ''} 
          ${props.leaf.italic ? 'italic' : ''} 
          ${props.leaf.underline ? 'underline' : ''} 
          ${props.leaf.strikeThrough ? 'line-through' : ''}
        `}
      >
        {props.children}
      </span>
    )
  }, [])
  
  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
    >
      <Toolbar
        editor={editor}
        status={{
          bold: isBoldStatus,
          italic: isItalicStatus,
          underline: isUnderlineStatus,
          strikeThrough: isStrikeThroughStatus
        }}
        setStatus={{
          bold: setBoldStatus,
          italic: setItalicStatus,
          underline: setUnderlineStatus,
          strikeThrough: setStrikeThroughStatus
        }}
      />
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