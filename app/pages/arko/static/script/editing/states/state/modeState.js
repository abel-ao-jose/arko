import { elementFactory } from "../../../essencials/attributes.js"
import workTree from "../../../essencials/htmlTree.js"
import { doc } from "../../ws.js"
import { Mode } from "../mode.js"

class AbstractState {

    elements = workTree.topElements

    // abstract Methods
    actions() { throw new Error('abstract Method') }
    remove() { throw new Error('abstract Method') }
}

function getHtmlTopElementsInPage() {
    let elements = []
    let length
    console.log(
        (length = workTree.topElements.length)
        + ' .. is length of html elements')
    if (length)
        workTree.topElements.forEach(element => {
            elements.push(doc.getElementById(element.attributes.id))
        });

    console.log('working elements', elements)
    return elements
}

export class SelectModeState extends AbstractState {
    selectedElement

    constructor() { super() }

    actions() {
        /* set events to elements */
        if ((getHtmlTopElementsInPage().length))
            console.log('\n\n.. select mode add actions ..\n\n',
                getHtmlTopElementsInPage().forEach(element => {
                    element.addEventListener('click',
                        this.selectModeEvents(this).onClickEvent)
                }))
    }

    remove() {
        /* remove added events */
        if ((getHtmlTopElementsInPage().length))
            console.log('\n\n.. select mode remove actions ..\n\n',
                getHtmlTopElementsInPage().forEach(element => {
                    element.removeEventListener('click',
                        this.selectModeEvents(this).onClickEvent)
                }))

    }

    /* essectials */

    setTopElement(htmlElement) {
        console.log('\n\n\tadd new top element..')
        Mode.instance.removeActions()
        workTree.topElement = htmlElement
        Mode.instance.updateActions()
    }

    selectModeEvents(instance) {
        function onClickEvent(ev) {
            console.log('in click select mode event')
            instance.selectedElement = this
        }

        return {
            onClickEvent: onClickEvent
        }
    }
}

export class AddElementModeState extends AbstractState {
    constructor(elementTagName = new String()) {
        super()
        this.element = elementFactory(elementTagName)
    }

    actions() {
        /* set events to elements */

        if (!getHtmlTopElementsInPage().length) {
            console.log('\n\n.. Add element ..\n\n',
                'Top element',
                workTree.topElement,
                'Top Elements',
                workTree.topElements,
                '\n',
                this.addElement())
        }
        else
            console.log('\n\n.. Add mode add actions ..\n\n',
                getHtmlTopElementsInPage().forEach(el => {
                    if (el) el.addEventListener('click',
                        this.addElementModeEvents(this).onClickEnent)
                }))
    }

    remove() {
        /* remove added events */

        if (!getHtmlTopElementsInPage().length) {
        } else
            console.log('\n\n.. Add mode remove actions ..\n\n',
                getHtmlTopElementsInPage().forEach(el => {
                    if (el) el.removeEventListener('click',
                        this.addElementModeEvents(this).onClickEnent)
                }))
    }

    /* essectials */


    addElement(adjEl = null) {
        let old
        if (adjEl) {
            console.clear()
            console.log('add element to clicked element .. ',
                adjEl,
                '\nwith parent .. ',
                old = adjEl.parentElement,
                '\n\n')

            adjEl = adjEl.insertAdjacentElement('afterEnd', this.element)
            console.log('parent now is ..',
                adjEl.parentElement,
                '\nelement inserted .. ',
                this.element)
            workTree.storage.update(old, adjEl.parentElement)

        } else {
            if (workTree.topElement) {
                console.log(
                    'add element to top element .. ',
                    workTree.topElement
                )
                old = workTree.topElement
                workTree.topElement.appendChild(this.elements)
                workTree.storage.update(old, workTree.topElement)
            }
            else {
                console.log(
                    'add element to body .. '
                )
                workTree.storage.addElement(this.element)
            }
        }

        Mode.instance.state = new SelectModeState()

        Mode.instance.state.selectedElement = this.element
    }

    addElementModeEvents(instance) {

        function onClickEvent(ev) {
            console.log('in add mode click event', instance.element)

            instance.addElement(this)
        }

        return {
            onClickEnent: onClickEvent
        }
    }
}