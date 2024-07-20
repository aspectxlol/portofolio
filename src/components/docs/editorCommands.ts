import { type BaseEditor, Editor, Element, Transforms } from "slate"
import { type ReactEditor } from "slate-react"

function isBoldMarkActive(editor: BaseEditor & ReactEditor) {
  const marks = Editor.marks(editor)
  return marks ? marks.bold === true : false
}

function isItalicMarkActive(editor: BaseEditor & ReactEditor) {
  const marks = Editor.marks(editor)
  return marks ? marks.italic === true : false
}

function isUnderlineMarkActive(editor: BaseEditor & ReactEditor) {
  const marks = Editor.marks(editor)
  return marks ? marks.underline === true : false
}

function isCodeBlockActive(editor: BaseEditor & ReactEditor) {
  const [match] = Editor.nodes(editor, {
    match: n => Element.isElement(n) && n.type === 'code',
  })

  return !!match
}

function toggleBoldMark(editor: BaseEditor & ReactEditor) {
  const isActive = isBoldMarkActive(editor)
  if (isActive) {
    Editor.removeMark(editor, 'bold')
  } else {
    Editor.addMark(editor, 'bold', true)
  }
}

function toggleItalicMark(editor: BaseEditor & ReactEditor) {
  const isActive = isItalicMarkActive(editor)
  console.log(isActive)
  if (isActive) {
    Editor.removeMark(editor, 'italic')
  } else {
    Editor.addMark(editor, 'italic', true)
  }
  console.log(isActive)
}

function toggleUnderlineMark(editor: BaseEditor & ReactEditor) {
  const isActive = isUnderlineMarkActive(editor)
  console.log(isActive)
  if (isActive) {
    Editor.removeMark(editor, 'underline')
  } else {
    Editor.addMark(editor, 'underline', true)
  }
  console.log(isActive)
}

function toggleCodeBlock(editor: BaseEditor & ReactEditor) {
  const isActive = isCodeBlockActive(editor)
  Transforms.setNodes(
    editor,
    { type: isActive ? 'paragraph' : 'code' },
    { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
  )
}



export {
  toggleBoldMark,
  toggleItalicMark,
  toggleUnderlineMark,
  toggleCodeBlock
}