import { colors } from "@/constants";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel } from "./dropdown-menu";
import { TextColorIcon } from "../icons/Docs";
import ColorPicker from "./ColorPicker";

export default function FontColorInput({ FontColor, setFontColor, FontColorCSS }: { FontColor: string, setFontColor: (fontColor: string) => void, FontColorCSS: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* <button className={`${EditorCSS.cmdButton}`}><TextColorIcon className='w-6 h-6' rectangleColor='black' /></button> */}
          <div className={`${FontColorCSS} p-2`}>
          <TextColorIcon className={`w-6 h-6`} rectangleColor={FontColor} />
          </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-fit'>
        <DropdownMenuLabel>Pick Color</DropdownMenuLabel>
        <ColorPicker colors={colors.map(i => i.map(j => `#${j}`))} setFontColor={setFontColor}/>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}