namespace ContactSomething {
    const Page = <Form.contact.Main.Information>Xrm.Page;

    export function onLoad() {
        var name: string = Page.getAttribute("firstname").getValue();
        alert(name);        
    }

}