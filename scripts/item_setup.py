from selenium import webdriver
import requests
import json

driver = webdriver.PhantomJS()
driver.get("http://www.heroesofnewerth.com/items/")
all_items = driver.execute_script('return items;')
result = {}
for i in all_items:
    all_items[i]['cost'] = int(all_items[i]['cost'])
    request = requests.get('http://www.heroesofnewerth.com' + all_items[i]['icon'], stream=True)
    if request.status_code == 200:
        handle = open('items/' + i + '.jpg', 'wb')
        for block in request.iter_content(1024):
            if not block:
                break
            handle.write(block)
    result[int(i)] = all_items[i]
    del result[int(i)]['icon']


result[20] = {'name': 'Halberd', 'description': '15\% chance to deal 40 Physical Damage to target.', 'cost': 1500}
result[93] = {'name': 'Token Of Life', 'description': 'Said to be an icon of the Gatekeeper of Hell, the Token of Life will bring its possessor back to life when he dies.<br><br><span style="color: rgb(255,0,0);">Obtained by slaying Kongor.</span><span style="color: rgb(255,255,255);"></span>', 'cost': 0}
result[62] = {'name': 'Bananas', 'description': 'These magic bananas instantly restore massive amounts of Health and Mana.<br><br><span style="color: rgb(255,0,0);">Obtained by slaying Kongor (or a few other bosses).</span><span style="color: rgb(255,255,255);"></span>', 'cost': 0}
with open('items.txt', 'w') as outfile:
    json.dump(result, outfile)
