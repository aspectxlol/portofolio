import React, { useCallback, useState } from 'react'
import { createEditor, Editor } from 'slate'
import { Slate, Editable, withReact, type RenderElementProps, type RenderLeafProps } from 'slate-react'
import { initialValue } from '@/constants'
import { withHistory } from 'slate-history'
import Toolbar from './Toolbar'
import { currentActiveColor, currentFontSize } from './editorCommands'

export default function DocsEditor() {
  const [editor] = useState(() => withReact(withHistory(createEditor())))
  // const [editorValues, setEditorValues] = useState<Element[][]>([1].map(() => initialValue));
  // const [editors, setEditors] = useState(() => editorValues.map(() => withReact(withHistory(createEditor()))))
  // const [Index, setActiveIndex] = useState(0)

  const [isBoldStatus, setBoldStatus] = useState(false)
  const [isItalicStatus, setItalicStatus] = useState(false)
  const [isUnderlineStatus, setUnderlineStatus] = useState(false)
  const [isStrikeThroughStatus, setStrikeThroughStatus] = useState(false)
  const [FontColor, setFontColor] = useState('#000000')
  const [FontSize, setFontSize] = useState(11)

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
  
  const { onChange } = editor

  editor.onChange = () => {
    if (editor.operations.every(op => op.type === 'set_selection')) {
      const marks = Editor.marks(editor)
      if (marks?.bold) {setBoldStatus(true)} else { setBoldStatus(false) }
      if (marks?.italic) {setItalicStatus(true)} else { setItalicStatus(false) }
      if (marks?.underline) {setUnderlineStatus(true)} else { setUnderlineStatus(false) }
      if (marks?.strikeThrough) {setStrikeThroughStatus(true)} else { setStrikeThroughStatus(false) }

      setFontColor(currentActiveColor(editor)!)
      setFontSize(currentFontSize(editor)!)
    }
    return onChange()
  }

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
        style={{
          color: `${props.leaf.textColor}`,
          fontSize: `${props.leaf.fontSize}pt`
        }}
      >
        {props.children}
      </span>
    )
  }, [])
  
  return (
    <Slate
      // editor={withReact(withHistory(createEditor()))}
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
        FontColor={FontColor}
        FontSize={FontSize}
        setFontColor={setFontColor}
        setFontSize={setFontSize}
      />
      <div className='w-full h-screen flex flex-col items-center align-top overflow-y-scroll print:h-full'>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className='
            max-w-[8.27in] max-h-[11.69in] 
            min-w-[8.3in] min-h-[13in] p-[1in] 
            bg-white text-black focus:outline-none 
            border-2 drop-shadow-lg my-4 
            print:m-0 print:outline-none
            overflow-x-auto overflow-y-hidden
            rounded-sm'
        />
      </div>
    </Slate>
  )
}