# coding: utf-8

import sys
import json


def domains(filepath='whitelist.txt'):
    data = {}
    with open(filepath, 'r') as f:
        for line in f:
            line = line.strip()
            # this is a comment
            if not line or line.startswith('#'):
                continue
            data[line] = 1
    return data


def generate(proxy, output='-'):
    text = 'var DIRECT_DOMAIN = '
    text += json.dumps(domains(), indent=2)
    text += ';\n\n'
    with open('template.pac', 'r') as f:
        text += f.read()

    text += '\n\nvar PROXY = "%s";\n\n' % proxy
    if output == '-':
        sys.stdout.write(text)
    else:
        with open(output, 'w') as f:
            f.write(text)
