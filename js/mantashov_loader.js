function isMyScriptLoaded(url) {
    if (!url) url = "js/mantashov.js";
    scripts = document.getElementsByTagName('script');
    for (var i = scripts.length; i--;) {
        if (scripts[i].src == url) return true;
    }
    return false;
}

if(!isMyScriptLoaded("js/mantashov.js")){
    $.getScript("js/mantashov.js");
}