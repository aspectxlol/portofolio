import type { Element } from "slate";

export const initialValue: Element[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
  {
    type: 'code',
    children: [{ text: 'console.log(\'Hello World\')' }]
  }
]