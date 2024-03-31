import { Mode } from "../editing/states/mode.js"
import { SelectModeState } from "../editing/states/state/modeState.js"

/* init base datas */
const info = {
    userid: '12312',
    username: 'Abel josé',
    site: 'arko-prooject',
    project_name: 'test_project'
}

/* initialise project */
export function initProject() {

    /* storage and work storage init */

    /* init state */

    Mode.instance.state = new SelectModeState()
}