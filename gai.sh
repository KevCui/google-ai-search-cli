#!/bin/env bash
#
# Google Search with [AI mode](https://google.com/search?udm=50) in terminal
#
#/ Usage:
#/   ./gai.sh <text>

set_var() {
    _MITMDUMP="$(command -v mitmdump)"
    _MARKDOWN="$(command -v markdownify)"
    _XVFB="$(command -v Xvfb)"
    _XVFB_RUN="$(command -v xvfb-run)"

    _SCRIPT_PATH=$(dirname "$(realpath "$0")")
    _MITM_SCRIPT="$_SCRIPT_PATH/mitm-record.py"
    _REQUEST_FOLDER="response"
    _CHROMIUM_PATH="/usr/bin/chromium"
    _SEARCH_URL="https://www.google.com/search?udm=50&q="
}

check_file() {
    local n
    while true; do
        n="$(grep -ri 'data-container-id="main-col"' "$_SCRIPT_PATH/$_REQUEST_FOLDER" -l | wc -l)"
        if [[ "$n" -ge 1 ]]; then
            break
        fi
        sleep 1
    done
}

main() {
    set_var

    rm -rf "$_SCRIPT_PATH/$_REQUEST_FOLDER"
    mkdir -p "$_SCRIPT_PATH/$_REQUEST_FOLDER"

    "$_MITMDUMP" -q -s "$_MITM_SCRIPT" -p 1337 2> /dev/null &
    mpid="$!"

    "$_XVFB" :99 -screen 0 1920x1080x24 2> /dev/null &
    xpid="$!"

    http_proxy="localhost:1337" https_proxy="localhost:1337" \
        "$_XVFB_RUN" "$_CHROMIUM_PATH" --new-window --password-store=basic "$_SEARCH_URL${1}" 2> /dev/null &
    cpid="$!"

    check_file

    kill "$mpid" "$cpid" "$xpid"
    "$_MARKDOWN" "$(grep -ril 'data-container-id="main-col"' "$_SCRIPT_PATH/$_REQUEST_FOLDER")" | grep -v '](data:image'
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
