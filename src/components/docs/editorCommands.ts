import { type BaseEditor, Editor, Element, Transforms } from "slate"
import type { HistoryEditor } from "slate-history"
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

function isStrikeThroughMarkActive(editor: BaseEditor & ReactEditor) {
  const marks = Editor.marks(editor)
  return marks ? marks.strikeThrough === true : false
}

function isCodeBlockActive(editor: BaseEditor & ReactEditor) {
  const [match] = Editor.nodes(editor, {
    match: n => Element.isElement(n) && n.type === 'code',
  })

  return !!match
}





function undo(editor: HistoryEditor) {
  editor.undo()
}

function redo(editor: HistoryEditor) {
  editor.redo()
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
  if (isActive) {
    Editor.removeMark(editor, 'italic')
  } else {
    Editor.addMark(editor, 'italic', true)
  }
}

function toggleUnderlineMark(editor: BaseEditor & ReactEditor) {
  const isActive = isUnderlineMarkActive(editor)
  Editor.removeMark(editor, 'strikeThrough')
  if (isActive) {
    Editor.removeMark(editor, 'underline')
  } else {
    Editor.addMark(editor, 'underline', true)
  }
  }

function toggleStrikeThrough(editor: BaseEditor & ReactEditor) {
  const isActive = isStrikeThroughMarkActive(editor)
  Editor.removeMark(editor, 'underline')
  if (isActive) {
    Editor.removeMark(editor, 'strikeThrough')
  } else {
    Editor.addMark(editor, 'strikeThrough', true)
  }
}

function toggleCodeBlock(editor: BaseEditor & ReactEditor) {
  const isActive = isCodeBlockActive(editor)
  Transforms.setNodes(
    editor,
    { type: isActive ? 'paragraph' : 'code' },
    { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
  )
}

function currentActiveColor(editor: BaseEditor & ReactEditor) {
  return Editor.marks(editor)?.textColor
}

function currentFontSize(editor: BaseEditor & ReactEditor) {
  return Editor.marks(editor)?.fontSize
}

function setTextFontColor(editor: BaseEditor & ReactEditor, color: string) {
  Editor.removeMark(editor, 'textColor')
  Editor.addMark(editor, 'textColor', color)
}

function setTextFontSize(editor: BaseEditor & ReactEditor, fontSize: number) {
  Editor.removeMark(editor, 'fontSize')
  Editor.addMark(editor, 'fontSize', fontSize)
}

export {
  isBoldMarkActive,
  isItalicMarkActive,
  isUnderlineMarkActive,
  isStrikeThroughMarkActive,

  undo,
  redo,

  toggleStrikeThrough,
  toggleBoldMark,
  toggleItalicMark,
  toggleUnderlineMark,
  toggleCodeBlock,

  currentActiveColor,
  currentFontSize,
  
  setTextFontColor,
  setTextFontSize
}