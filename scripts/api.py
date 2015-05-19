from __future__ import print_function

from requests import get, exceptions
from time import sleep


baseurl = 'http://api.heroesofnewerth.com'


def get_json(endpoint, token):
    url = ''.join([baseurl, endpoint, '?token=', token])
    count = 0
    print(url)
    while True:
        try:
            raw = get(url)
        except exceptions.Timeout:
            count += 1
        if raw.status_code == 429 and count < 10:
            count += 1
            sleep(1)
        elif raw.status_code == 200:
            return raw.json()
        else:
            return None
