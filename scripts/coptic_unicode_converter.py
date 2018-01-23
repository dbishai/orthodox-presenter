"""
Python script to convert Coptic in documents from standard ASCII to Unicode
"""

from glob import iglob
import json

# standard defined by Coptic Fonts Standard
ascii_coptic = list("AaBbGgDdEe^^ZzYy:;IiKkLlMmNnXxOoPpRrCcTtUuVv<,\"'WwSsFfQqHhJj{[}]`@=")

# Unicode with separate Greek and Coptic blocks, followed by jinkim, standard colon, and overline
unicode_coptic = list(range(0x2c80, 0x2cb2)) + list(range(0x03e2, 0x03f0)) + [0x0300, 0x003a, 0x0305]

def replace(mapping, text):
    swap = 0
    for i in range(len(text)):
        if text[i] in ['`', '='] and i < len(text) - 1 and i - swap > 1:
            # swap since unicode combining characters suchs as jinkims and overlines come after character
            text[i], text[i+1] = text[i+1], text[i]

            # don't swap unless at least 2 characters from last swap
            swap = i

        # ignore whitespace
        if text[i] not in [' ' , '.'] and text[i] in mapping:
            text[i] = mapping[text[i]]
    return text

def main():
    # make sure character mappings are equal in length
    assert(len(ascii_coptic) == len(unicode_coptic))

    # create lookup dictionary
    mapping = {}
    for (a,b) in zip(ascii_coptic, unicode_coptic):
        mapping[a] = chr(b)

    ROOT_DIR = "../docs/"
    for filename in iglob(ROOT_DIR + '**/*.json', recursive=True):
        with open(filename, 'w+') as src:
            print(src.read())
            #text = "".join(replace(mapping, list(src)))

if __name__ == "__main__":
    main()
