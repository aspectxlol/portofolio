import React, { useCallback, useState } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact, type RenderElementProps, type RenderLeafProps, useSlate } from 'slate-react'
import { Button } from '../ui/button'
import { toggleCodeBlock, toggleBoldMark, toggleItalicMark, toggleUnderlineMark } from './editorCommands'
import { initialValue } from '@/constants'
import { HistoryEditor, withHistory } from 'slate-history'

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
      <Toolbar />
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
      />
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
      style={
        {
          fontWeight: props.leaf.bold ? 'bold' : 'normal', 
          fontStyle: props.leaf.italic ? 'italic' : 'normal',
          textDecoration: props.leaf.underline ? 'underline' : ''
        }
      }
    >
      {props.children}
    </span>
  )
}

const Toolbar = () => {
  const editor = useSlate()

  return (
    <div>
      <Button onClick={() => toggleBoldMark(editor)}>B</Button>
      <Button onClick={() => toggleItalicMark(editor)}>I</Button>
      <Button onClick={() => toggleUnderlineMark(editor)}>U</Button>
    </div>
  )
}