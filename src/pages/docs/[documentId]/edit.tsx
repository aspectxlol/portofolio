import React, { useCallback, useState } from 'react'
import { createEditor, Editor, Transforms, Element } from 'slate'
import { Slate, Editable, withReact, type RenderElementProps, RenderLeafProps } from 'slate-react'

const initialValue: Element[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
  {
    type: 'code',
    children: [{ text: 'console.log(\'Hello World\')' }]
  }
]

export default function Edit() {
  const [editor] = useState(() => withReact(createEditor()))

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
      <Editable
        renderElement={props => renderElement(props)}
        renderLeaf={props => renderLeaf(props)}
        onKeyDown={event => {
          if (event.key === '&') {
            event.preventDefault()
            editor.insertText('and ')
          }
          if (event.key === '`' && event.ctrlKey) {
            const [match] = Editor.nodes(editor, {
              match: n => Element.isElement(n) && n.type === 'code',
            })
          
            Transforms.setNodes(
              editor,
              { type: match ? 'paragraph' : 'code' },
              { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
            )
          }
          if (event.key === 'b' && event.ctrlKey) {
            Editor.addMark(editor, 'bold', true)
          }
        }}
      />
    </Slate>
  )
}

const CodeElement = (props: {
  attributes: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLPreElement> & React.HTMLAttributes<HTMLPreElement>;
  children: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined
}) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = (props: { attributes: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLParagraphElement> & React.HTMLAttributes<HTMLParagraphElement>; children: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }) => {
  return <p {...props.attributes}>{props.children}</p>
}

const Leaf = (props: RenderLeafProps) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}