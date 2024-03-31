
import { convertHtmlElement } from "../../convertHtml.js"
import { doc } from "../../../editing/ws.js"
import { isEqualObjects } from "../../is_igual.js"



let info = {
    userid: '12312',
    username: 'Abel josé',
    site: 'arko-prooject',
    project_name: 'test_project'
}


const project = {
    info: info,
    projects: {
        [info.project_name]: {
            htmlTree: {
                head: [],
                body: [],
            },
            csstree: {},
        }
    }
}


class ClientStorage {
    #storage = localStorage
    constructor() {
        console.log('creating', this, 'object')
        this.init()
    }

    /* initstorage */

    init() {
        let update
        if (!this.get()) {
            this.clean()
            update = this.add(project)
        } else {
            update = this.get()
            if (update.projects.hasOwnProperty(info.project_name)) {
                console.log('local storage have project_name .. ')
                if (!isEqualObjects(update.projects[info.project_name], project.projects[info.project_name])) {
                    console.log('local storage is different .. put .. ')
                    console.log('.. project to local storage\n\n', update.projects[info.project_name] = project.projects[info.project_name])
                    this.add(update)
                }
            } else {
                console.log('\n\nlocal storage not have local storage .. ')
                update.projects[info.project_name] = projectproject.projects[info.project_name]
                this.add(update)
                console.log(' .. Updating local storage .. \n\n')
            }
        }
    }

    /* manipulatestorage */

    add(value) {
        this.clean()
        value = JSON.stringify(value)
        this.#storage.setItem(info.site, value)
        console.log('.. adding ..\n', value)
        console.log('---------- in storage\n\n')
        return value
    }
    get(store = this.#storage.getItem(info.site)) {
        store = JSON.parse(store)
        console.log('.. getting ..', store)
        console.log('---------- from storage\n\n')
        return store
    }
    clean() {
        console.log('.. cleaning ..')
        console.log('----------  storage\n\n')
        this.#storage.clear()
    }
}

class HtmlTreeStorage extends ClientStorage {
    #bodyOrHeadTree

    constructor(bodyOrHead = 'body') {
        ~
            super()
        console.log('HtmlTreeStorage working with .. '
            , bodyOrHead, '\n\n')
        this.bodyOrHead = bodyOrHead
        this.#bodyOrHeadTree =
            super.get().projects[info.project_name]
                .htmlTree[this.bodyOrHead]
    }

    get tree() {
        console.log(this.bodyOrHead + ' get tree',
            this.#bodyOrHeadTree, '\n\n')
        return this.#bodyOrHeadTree
    }

    get #htmlTree() {
        let tree = super.get()

        tree.projects[info.project_name]
            .htmlTree[this.bodyOrHead] = this.#bodyOrHeadTree
        console.log(' get html tree',
            tree, '\n\n')

        return tree
    }

    addElement(element) {

        this.#bodyOrHeadTree.push(
            convertHtmlElement.toObject(element))
        super.add(this.#htmlTree)
        this.#upgradeHtmlTree()

        return element
    }

    removeElement(element) {

        console.log(
            this.#search(this.#bodyOrHeadTree, element,
                (list, el) => {
                    list.splice(list.indexOf(el), 1)
                    return list
                })
        )

        super.add(this.#htmlTree)
        this.#upgradeHtmlTree()
    }

    update(old, newElement) {

        console.log(
            this.#search(this.#bodyOrHeadTree, old,
                (el) => { list[list.indexOf(el)] = newElement })
        )

        super.add(this.#htmlTree)
        this.#upgradeHtmlTree()
    }

    #upgradeHtmlTree() {
        let tree = []

        this.#bodyOrHeadTree.forEach(element => {
            tree.push(convertHtmlElement.fromObject(element))
        });

        console.log('upgrade html tree to .. ', tree)

        if (this.bodyOrHead === 'body') {
            doc.body.replaceChildren(...tree)

            console.log('body ..', doc.body.childNodes)
        }
        else {
            doc.head.replaceChildren(tree)
            console.log('head ..', doc.head.childNodes)
        }
    }

    #search(list, element, todo) {

        let ev = 'this.#bodyOrHeadTree'
        let upElement

        function deep(itenList, evl = '') {
            upElement = itenList.find(function (el) {
                if (el.attributes.id === element.attributes.id) {
                    itenList = todo(itenList, el)
                    itenList = itenList.forEach(elem => {
                        itenList[itenList.indexOf(elem)] =
                            convertHtmlElement.fromObject(elem)
                    });
                    ev += ` = [${itenList}]`

                    eval(ev)

                    return el
                }
                else {
                    ev += evl
                    deep(el.childNodes || [], `[${itenList.indexOf(el)}].childNodes`)
                }

                return false
            })
        }

        deep(list)

        return upElement
    }
}

let clientStorage = new ClientStorage()

export { clientStorage, HtmlTreeStorage }