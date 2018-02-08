"""
Python script to convert Coptic in documents from standard ASCII to Unicode
"""

from glob import iglob
import json
import argparse

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
    ap = argparse.ArgumentParser()
    ap.add_argument("-string", required=False)
    args = vars(ap.parse_args())

    # make sure character mappings are equal in length
    assert(len(ascii_coptic) == len(unicode_coptic))

    # create lookup dictionary
    mapping = {}
    for (a,b) in zip(ascii_coptic, unicode_coptic):
        mapping[a] = chr(b)


    if args["string"]:
        text = args["string"]
        print("".join(replace(mapping, list(text))))
        return

    ROOT_DIR = "../docs/"
    for filename in iglob(ROOT_DIR + '**/*.json', recursive=True):
        if filename in ["../docs/helpers/common.json", "../docs/helpers/users.json"]:
            continue
        with open(ROOT_DIR + filename, 'r') as src:
            try:
                text = json.load(src)
            except json.decoder.JSONDecodeError as identifier:
                print("ERROR decoding file: " + filename)
                continue

            if "title" not in text:
                print(filename)
            if "cop" in text["title"]:
                text["title"]["cop"] = "".join(replace(mapping, list(text["title"]["cop"])))

            for item in text["items"]:
                if "user" in item:
                    str_replace = item["user"]
                    if "cop" in str_replace:
                        str_replace["cop"] = "".join(replace(mapping, list(str_replace["cop"])))

                if "text" not in item:
                    print(filename)

                str_replace = item["text"]
                if "cop" in str_replace:
                    for i in range(len(str_replace["cop"])):
                        str_replace["cop"][i] = "".join(replace(mapping, list(str_replace["cop"][i])))

        with open(ROOT_DIR + filename, 'w') as src:
            print(json.dumps(text, ensure_ascii=False), file=src)

if __name__ == "__main__":
    main()
