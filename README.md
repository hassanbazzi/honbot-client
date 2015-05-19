HonBot-Client [![devDependency Status](https://david-dm.org/scttcper/honbot-client/dev-status.svg)](https://david-dm.org/scttcper/honbot-client#info=devDependencies)
=============
HonBot is a [Heroes of Newerth (HoN)](http://www.heroesofnewerth.com/) statistics website for the [HoN API](http://api.heroesofnewerth.com/).

This repo contains the frontend for honbot.com

##Installation
```bash
npm install gulp -g
npm install bower -g
npm install
bower install
gulp serve
```

##Scripts
#### large_hero
Run this to download all large image cutouts for the homepage. Will output a txt file with paths to images. Place this in largeHero.js.
```
python large_hero
```

#### item_setup
downloads icon images and creates json object in items.txt. Place in itemlist.js
```
python item_setup
```