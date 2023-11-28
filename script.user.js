// ==UserScript==
// @name         UchiDone
// @namespace    https://cdn.jsdelivr.net/gh/igroshka/UchiDone
// @version      2.4.5
// @description  Injects UchiDone v2.4.5
// @author       YUFI
// @match        *://*/*
// @icon         https://cdn.jsdelivr.net/gh/igroshka/hackpack/uchihack/icons/192.png
// @grant        none
// ==/UserScript==

(async() => {
    'use strict';
    
    function wildcard(str, rule) {
        var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
    }

    var root = "https://cdn.jsdelivr.net/gh/igroshka/UchiDone";
    var rawConfig = await fetch(root + "injector/config.json");
    var config = await rawConfig.json();

    // Проверка ссылки
    var glFound = false;
    var js = [];

    for (const item of config.injector) {
        var found = false;
        for (const url of item.urls) {
            if (wildcard(location.href, url)) {
                found = true;
                break;
            }
        }
        if (found) {
            js = item.scripts;
            glFound = true;
            break;
        }
    }

    // Запускаем нужные скрипты
    if (glFound)
        for (const item of js) {
            var el = document.createElement('script');
            el.setAttribute('type', 'text/javascript');
            el.src = root + item;
            document.head.append(el);
        }
})();
