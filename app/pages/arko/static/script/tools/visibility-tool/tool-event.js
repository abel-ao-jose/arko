/* file to editor styling */

import { doc } from "../../editing/ws.js"

// take element


// code

export function visibilityElementToolEvent(visibilityElement) {
    let tools = document.querySelector('#tools')

    function onClickEvent(ev) {
        console.log('\n\n.. click element event ..\n\n')

        !tools.classList.contains('hide-all') ?
            tools.classList.add('hide-all')
            : tools.classList.remove('hide-all')

        visibilityElement.removeEventListener(
            'click',
            onClickEvent
        )

        function escKeyWord(ev) {
            if (ev.key === 'f') {
                !tools.classList.contains('hide-all') ?
                    tools.classList.add('hide-all')
                    : tools.classList.remove('hide-all')
                visibilityElement.addEventListener(
                    'click',
                    onClickEvent
                )
                document.removeEventListener(
                    'keypress', escKeyWord)
                doc.removeEventListener(
                    'keypress', escKeyWord)
            }
        }

        document.addEventListener(
            'keypress', escKeyWord)
        doc.addEventListener(
            'keypress', escKeyWord)
    }

    visibilityElement.addEventListener(
        'click',
        onClickEvent
    )
}
