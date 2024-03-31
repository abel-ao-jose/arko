import { convertHtmlElement } from "./convertHtml.js"
import { HtmlTreeStorage, clientStorage } from "./storage/local/localStorage.js"
console.log('mensagem')

class WorkTree {
    storage = new HtmlTreeStorage()

    topElement // elemento html normal ** HTMLElement

    /* init html  tree */
    init() {

        /* set tree local storage */

        clientStorage.init()

        /* */
    }
    /* get elements tree in local storage */
    get tree() {
        return this.storage.tree
    }

    /* set elements to tree in local storage */
    upgradeElement(oldElement, newElement) {
        this.storage.update(oldElement, newElement)
    }

    /* get element in top */
    get topElements() {
        console.log('top element Child Nodes .. ',
            this.topElement?.childNodes)
        
        return this.topElement ? convertHtmlElement.toObject(this.topElement).childNodes : this.storage.tree
    }
}

const workTree = new WorkTree()

export default workTree