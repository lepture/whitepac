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


def generate(proxy, output=None):
    text = 'var DIRECT_DOMAIN = '
    text += json.dumps(domains(), indent=2)
    text += ';\n'
    text += '\nvar PROXY = "%s";\n' % proxy

    with open('template.pac', 'r') as f:
        text += f.read()

    if output is None:
        sys.stdout.write(text)
    else:
        with open(output, 'w') as f:
            f.write(text)


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(
        description='Generate whitelist proxy pac'
    )
    parser.add_argument(
        '-p', dest='proxy', required=True,
        help='your proxy parameter'
    )
    parser.add_argument(
        '-o', dest='output',
        help='write content to this file'
    )
    args = parser.parse_args()
    generate(args.proxy, args.output)
