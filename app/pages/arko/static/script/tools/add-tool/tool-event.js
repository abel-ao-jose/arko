/* file to editor styling */

import { Mode } from "../../editing/States/mode.js"
import { AddElementModeState } from "../../editing/States/state/modeState.js"

// declare vars

let elementsToAddList = HTMLDivElement

// init vars

elementsToAddList = document.importNode(
    document.querySelector('template#add-temp').content, true
).firstElementChild

// code

export function addElementToolEvent(addtoolElement) {

    function liElementEvent(ev) {
        console.log(`choused ${this.textContent}`)

        Mode.instance.state = new AddElementModeState(this.textContent)

        addtoolElement.parentElement.removeChild(elementsToAddList)
        this.removeEventListener('click', liElementEvent)
        addtoolElement.addEventListener('click', onClickEvent)
    }

    function onClickEvent(ev) {
        this.removeEventListener('click', onClickEvent)

        console.clear()

        elementsToAddList.style.margin = `0 0 0 ${this.offsetWidth + 5}px`;
        this.insertAdjacentElement('afterend', elementsToAddList)

        let elementsList = this.nextElementSibling.children
        Array.from(elementsList).forEach(function (value, number, parent) {
            value?.addEventListener('click', liElementEvent)
        })
    }

    addtoolElement.addEventListener(
        'click',
        onClickEvent
    ) 
}


