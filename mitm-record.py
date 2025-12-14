from mitmproxy import http
import os
import re
import time
import logging
import json
from ruamel.yaml import YAML

SCRIPT_PATH = os.path.dirname(os.path.abspath(__file__))
CONFIG_FILE = SCRIPT_PATH + '/record-request.yaml'


def readFile(file):
    """Read file and return json data or dict

    Read file and return all its content as json format or dict

    Arg:
        file: File name, including its path
    """

    if not os.path.isfile(file):
        logging.error("File: " + file + ' not found!')
        return None

    fname, fext = os.path.splitext(file)

    with open(file) as data:
        if fext == ".yaml":
            yaml = YAML(typ='safe')
            return yaml.load(data)
        else:
            return json.load(data)


def response(flow: http.HTTPFlow) -> None:
    matches = readFile(CONFIG_FILE)
    url = flow.request.url

    if matches is not None:
        for patternURL, dumpFolder in matches.items():
            if re.match(patternURL, url) is not None:
                dumpFile = SCRIPT_PATH + '/' + dumpFolder + '/' + str(int(round(time.time() * 1000)))

                logging.info('>>> Save ' + url + ' request details to ' + dumpFile)
                with open(dumpFile, 'a') as f:
                    f.write(str(flow.response.content.decode('utf-8')))
