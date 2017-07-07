/**
 * Created by lcfevr on 16/7/18.
 */
import Config from '../config/config'

export function setPageTitle(title) {
    document.title = title;

    if (Config.isIphone && Config.isWechat) {
        let body = document.getElementsByTagName('body')[0];
        let iframe = document.createElement('iframe');
        iframe.setAttribute('src', '/favicon.ico');

        iframe.addEventListener('load', function () {
            setTimeout(function () {
                iframe.removeEventListener('load');
                document.body.removeChild(iframe);
            }, 0);
        });
        document.body.appendChild(iframe);
    }

}


export function camelcaseToHyphen(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}


export function findComponentUpward (content, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName];
    } else {
        componentNames = componentName;
    }

    let parent = content.$parent;
    let name = parent.$options.name;
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}

export function findComponentDownward (content, componentName) {
    const childrens = content.$children;
    let children = null;

    if (childrens.length) {
        childrens.forEach(child => {
            const name = child.$options.name;
            if (name === componentName) {
                children = child;
            }
        });

        for (let i = 0; i < childrens.length; i++) {
            const child = childrens[i];
            const name = child.$options.name;
            if (name === componentName) {
                children = child;
                break;
            } else {
                children = findComponentDownward(child, componentName);
                if (children) break;
            }
        }
    }
    return children;
}

export function findComponentsDownward (content, componentName, components = []) {
    const childrens = content.$children;

    if (childrens.length) {
        childrens.forEach(child => {
            const name = child.$options.name;
            const childs = child.$children;

            if (name === componentName) components.push(child);
            if (childs.length) {
                const findChilds = findComponentsDownward(child, componentName, components);
                if (findChilds) components.concat(findChilds);
            }
        });
    }
    return components;
}

export function random_str() {
    let len = 32;
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let max = chars.length;

    let str = '';
    for (let i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * max));
    }
    return str;
}
