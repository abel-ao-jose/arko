// add tool

import { addElementToolEvent } from "./tool-event.js"
import Tool from "../toolsClass.js"

let addTool = new Tool(
    'button#add-element-tool',
    'div#add-element-content',
    addElementToolEvent
)

export default addTool