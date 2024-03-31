import { initProject } from "../essencials/project.js";
import addTool from "./add-tool/tool.js";
import visibilityTool from "./visibility-tool/tool.js";

console.clear()

/* init project */

initProject()

/*  .. Inint Tools ..   */

addTool.init()
visibilityTool.init()

