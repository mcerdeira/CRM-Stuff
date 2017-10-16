var ContactSomething;
(function (ContactSomething) {
    var Page = Xrm.Page;
    function onLoad() {
        var name = Page.getAttribute("firstname").getValue();
        alert(name);
    }
    ContactSomething.onLoad = onLoad;
})(ContactSomething || (ContactSomething = {}));
//# sourceMappingURL=app.js.map