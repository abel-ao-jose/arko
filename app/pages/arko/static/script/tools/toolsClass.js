export default class Tool {
    elementTool = {
        button: HTMLButtonElement,
        content: HTMLDivElement
    }

    constructor(buttonSelector, constentSelector, onElEvent) {
        this.elementTool.button = document.querySelector(buttonSelector)
        this.elementTool.content = document.querySelector(constentSelector)
        this.onElEvent = onElEvent
    }


    #verifications() {

        /* take elements */

        Object.values(this.elementTool).forEach(value => {
            console.assert(value,
                `A elemento was not founded .. ${value}`,
                this.elementTool)
        })

        /* new verification */

        /* log */

        console.log('\n\n.. Verificações completas ..\n\n')
    }

    init() {

        /* verifications */

        this.#verifications()

        /* info */

        console.info('\n\ninitializing '
            + this.elementTool.button.querySelector('span').textContent
            + ' tool ..\n\n')

        /* client code */

        try {
            this.onElEvent(this.elementTool.button)
            /* sucesso */

            console.info('\n\n'
            + this.elementTool.button.querySelector('span').textContent 
            +' tool initializing .. success\n\n')

        } catch (error) {

            /* error code */

            console.log('\n\n'
            + this.elementTool.button.querySelector('span').textContent 
            +' tool initializing .. error\n\n')
            console.warn(error)
        }
    }
}