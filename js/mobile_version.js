function checkInternet() {
    var networkState = navigator.connection.type;
    if (networkState == "none") {
        $.mobile.changePage("no_internet.html");
        return;
    }
}
