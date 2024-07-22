import React, { useCallback, useState } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact, type RenderElementProps, type RenderLeafProps } from 'slate-react'
import { toggleCodeBlock, toggleBoldMark, toggleItalicMark, toggleUnderlineMark } from './editorCommands'
import { initialValue } from '@/constants'
import { HistoryEditor, withHistory } from 'slate-history'
import Toolbar from './Toolbar'

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