const fs = require('fs');
const path = require('path');

const files = [
    "c:\\Users\\LENOVO\\Documents\\Harestech\\Tchedes\\tchedes-dashboard\\app\\(dashboard)\\kyb\\[id]\\page.tsx",
    "c:\\Users\\LENOVO\\Documents\\Harestech\\Tchedes\\tchedes-dashboard\\app\\(dashboard)\\kyb\\create\\page.tsx",
    "c:\\Users\\LENOVO\\Documents\\Harestech\\Tchedes\\tchedes-dashboard\\app\\(dashboard)\\kyb\\page.tsx"
];

for (const f of files) {
    if (fs.existsSync(f)) {
        let content = fs.readFileSync(f, 'utf8');
        content = content.replace(/\\`/g, '`');
        content = content.replace(/\\\$/g, '$');
        fs.writeFileSync(f, content, 'utf8');
        console.log(`Fixed: ${f}`);
    } else {
        console.log(`Not found: ${f}`);
    }
}
