// add tool

import { visibilityElementToolEvent } from "./tool-event.js"
import Tool from "../toolsClass.js"

let visibilityTool = new Tool(
    '#visibility',
    '#visibilityDiv',
    visibilityElementToolEvent
)

export default visibilityTool