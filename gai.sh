#!/bin/env bash
#
# Google Search with [AI mode](https://google.com/search?udm=50) in terminal
#
#/ Usage:
#/   ./gai.sh <text>

set_var() {
    _HTMLQ="$(command -v htmlq)"
    _MARKDOWN="$(command -v markdownify)"
    _SCRIPT_PATH=$(dirname "$(realpath "$0")")
    _PYTHON_SCRIPT="${_SCRIPT_PATH}/generateCurlCmd.py"
}

main() {
    set_var

    eval "$("$_PYTHON_SCRIPT" "$1")" \
        | "$_HTMLQ" 'div[data-target-container-id="5"]' \
            --remove-nodes '[data-xid="Gd7Hsc"]' \
            --remove-nodes '.P8PNlb' \
            --remove-nodes 'img' \
        | "$_MARKDOWN"
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
