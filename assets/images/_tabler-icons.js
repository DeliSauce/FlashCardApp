// import { IconBrandJavascript } from '@tabler/icons-react';

const url = (str) => `https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/${str}.svg`;

let tablerIconUrls = {
    'TypeScript': 'brand-typescript',
    'JavaScript': 'brand-javascript',
    'alert circle': 'alert-circle',
}

Object.keys(tablerIconUrls)
    .forEach( key => tablerIconUrls[key] = url(tablerIconUrls[key]));

export default tablerIconUrls