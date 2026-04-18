#!/bin/env python3
import sys
from camoufox.sync_api import Camoufox

stop_requested = False


def request_to_curl(request):
    url = request.url
    headers = request.headers
    curl_cmd = ['curl', '-sS', '-N', '--compressed', f"'{url}'"]
    for k, v in headers.items():
        curl_cmd.extend(['-H', f"'{k}: {v}'"])
    return ' '.join(curl_cmd)


def handle_request(request):
    global stop_requested
    uri = request.url
    if "folwr" in uri.lower():
        print(request_to_curl(request))
        stop_requested = True


def main():
    search_text = " ".join(sys.argv[1:])
    url = "https://www.google.com/search?udm=50&hl=en&q=" + search_text
    with Camoufox(
            headless=True,
            humanize=True,
            i_know_what_im_doing=True,
            config={
                "navigator.userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0"
            }) as browser:

        page = browser.new_page()
        page.on("request", handle_request)
        page.goto(url, wait_until="domcontentloaded")
        while not stop_requested:
            page.wait_for_timeout(100)
        browser.close()


if __name__ == "__main__":
    main()
