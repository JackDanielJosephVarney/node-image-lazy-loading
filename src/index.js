const fs = require('fs');
const path = require('path');
const gm = require('gm').subClass({ imageMagick: true });
const JSDOM = require('jsdom').JSDOM;
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'public', 'html', 'index.html'), (err, buffer) => {

        const document = new JSDOM(buffer).window.document;
        const imgTags = [...document.getElementsByTagName('img')];

        Promise.all(
            imgTags.map(el =>
                new Promise(res => {
                    const src = el.getAttribute('data-src');
                    const splitSrc = src.split('/');
                    const imgName = splitSrc[splitSrc.length - 1];
                    const imgPath = path.join(__dirname, '..', 'public', 'images', imgName);
                    
                    const img = gm(imgPath).size((err, size) => {
                        const { width, height } = size;

                        img.resize(3, 3).toBuffer((err, buffer) => {
                            const imgEl = document.querySelector(`[data-src="${src}"]`)
                            
                            imgEl.setAttribute('src', `data:image/jpg;base64,${buffer.toString('base64')}`);
                            imgEl.setAttribute('height', `${height}px`);
                            imgEl.setAttribute('width', `${width}px`);
                            
                            res();
                        });
                    });

                })
            )
        ).then(() => {
            res.send(document.documentElement.outerHTML);
        });
    });
})

app.listen(3005, () => console.log('listening'));
