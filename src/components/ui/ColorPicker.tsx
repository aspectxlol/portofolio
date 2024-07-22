export default function ColorPicker({ colors, setFontColor }: { colors: string[][], setFontColor: (fontColor: string) => void}) {
  return (
    <div className={`flex flex-col`}>
      {
        colors
          .map((color1, i) =>
            <div key={i} className="flex flex-row">
               {color1
                 .map(color =>
                   <button
                     key={color}
                     style={{ backgroundColor: `${color}` }}
                     onClick={() => setFontColor(`${color}`)}
                     className="flex flex-auto rounded-full w-8 h-8 transition-all m-1 hover:rounded-xl duration-0 ease-in">&nbsp;
                   </button>
               )}
            </div>
        )
      }
    </div>
  )
}