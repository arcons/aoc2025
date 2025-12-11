const fs = require('fs');
const path = require('path');
const htmlPath = 'src/2018/day15/viewer.html';
const jsonPath = 'src/2018/day15/animation.json';
let html = fs.readFileSync(htmlPath, 'utf8');
const json = fs.readFileSync(jsonPath, 'utf8');
const scriptReplacement = `
        // Load JSON
        data = ${json};
        init();
`;
const regex = /\/\/ Load JSON[\s\S]*?\.catch\(.*\);/;
html = html.replace(regex, scriptReplacement);
fs.writeFileSync(htmlPath, html);
console.log('Combined HTML and JSON');
