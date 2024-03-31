import { SelectModeState } from "./state/modeState.js"

export class Mode {

    /* Singleton */

    static instance = this.instance ? this.instance : new this();

    /* state */
    #state

    /* constructor */


    constructor() { this.#state }

    /* edit about methods */

    updateActions() { if (this.#state) this.#state.actions() }

    removeActions() { if (this.#state) this.#state.remove() }

    /* state method */

    set state(state) {
        /* remove events */

        this.removeActions()

        /* setting state */

        this.#state = state

        /* upgrade events */

        this.updateActions()

        /* log */

        console.log('\n\nchange state to ..', this.#state)
    }

    get state() { return this.#state }
}