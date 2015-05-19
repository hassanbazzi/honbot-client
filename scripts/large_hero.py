from bs4 import BeautifulSoup
import requests
import json

url = 'https://www.heroesofnewerth.com/heroes/'
r = requests.get(url)

soup = BeautifulSoup(r.text)
heroes = []
for a in soup.find_all("div", attrs={"class": "filterObjectGrid"}):
    try:
        heroes.append(a.select("a")[0].get('href'))
    except:
        pass

result = []
hero_names = {}
for hero in heroes:
    url = 'https://www.heroesofnewerth.com' + hero
    r = requests.get(url)
    soup = BeautifulSoup(r.text)
    alts = int(soup.find("p", class_="subTitle fontM").text[-1])
    hid = hero.split('/heroes/view/')[1].split('#')[0]
    hero_names[int(hid)] = hero.split('#')[1].replace('+', ' ')
    # download hero icons
    req = requests.get('https://www.heroesofnewerth.com/images/heroes/' + hid + '/icon_128.jpg', stream=True)
    if req.status_code == 200:
        handle = open('heroes/' + hid + '.jpg', 'wb')
        for block in req.iter_content(1024):
            if not block:
                break
            handle.write(block)
    for x in xrange(alts):
        url = 'https://www.heroesofnewerth.com/images/heroes/'
        filename = str(hero.split('#')[1])
        if x == 0:
            url += str(hero.split('/')[-1].split("#")[0]) + "/store_hero.png"
            filename += '_store_hero'
        elif x == 1:
            url += str(hero.split('/')[-1].split("#")[0]) + "/store_alt.png"
            filename += '_store_alt'
        else:
            url += str(hero.split('/')[-1].split("#")[0]) + "/store_alt" + str(x) + ".png"
            filename += '_store_alt' + str(x)
        print url
        print filename
        # this would download the files
        request = requests.get(url, stream=True)
        if request.status_code == 200:
            handle = open('largehero/' + filename + '.png', 'wb')
            result.append(filename)
            for block in request.iter_content(1024):
                if not block:
                    break
                handle.write(block)


with open('largehero.txt', 'w') as outfile:
    json.dump(result, outfile)

with open('heronames.txt', 'w') as outfile:
    json.dump(hero_names, outfile)