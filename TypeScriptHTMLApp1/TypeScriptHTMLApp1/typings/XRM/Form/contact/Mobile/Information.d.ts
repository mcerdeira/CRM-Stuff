declare namespace Form.contact.Mobile {
  namespace Information {
    namespace Tabs {
      interface general extends Xrm.SectionCollectionBase {
        get(name: "account information"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "emailaddress1"): Xrm.Attribute<string>;
      get(name: "firstname"): Xrm.Attribute<string>;
      get(name: "jobtitle"): Xrm.Attribute<string>;
      get(name: "lastname"): Xrm.Attribute<string>;
      get(name: "mobilephone"): Xrm.Attribute<string>;
      get(name: "ownerid"): Xrm.LookupAttribute;
      get(name: "parentcustomerid"): Xrm.LookupAttribute;
      get(name: "statecode"): Xrm.OptionSetAttribute<contact_statecode>;
      get(name: "telephone1"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "emailaddress1"): Xrm.StringControl;
      get(name: "firstname"): Xrm.StringControl;
      get(name: "jobtitle"): Xrm.StringControl;
      get(name: "lastname"): Xrm.StringControl;
      get(name: "mobilephone"): Xrm.StringControl;
      get(name: "ownerid"): Xrm.LookupControl;
      get(name: "parentcustomerid"): Xrm.LookupControl;
      get(name: "statecode"): Xrm.OptionSetControl<contact_statecode>;
      get(name: "telephone1"): Xrm.StringControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "general"): Xrm.PageTab<Tabs.general>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "emailaddress1"): Xrm.Attribute<string>;
    getAttribute(attributeName: "firstname"): Xrm.Attribute<string>;
    getAttribute(attributeName: "jobtitle"): Xrm.Attribute<string>;
    getAttribute(attributeName: "lastname"): Xrm.Attribute<string>;
    getAttribute(attributeName: "mobilephone"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute;
    getAttribute(attributeName: "parentcustomerid"): Xrm.LookupAttribute;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<contact_statecode>;
    getAttribute(attributeName: "telephone1"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "emailaddress1"): Xrm.StringControl;
    getControl(controlName: "firstname"): Xrm.StringControl;
    getControl(controlName: "jobtitle"): Xrm.StringControl;
    getControl(controlName: "lastname"): Xrm.StringControl;
    getControl(controlName: "mobilephone"): Xrm.StringControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl;
    getControl(controlName: "parentcustomerid"): Xrm.LookupControl;
    getControl(controlName: "statecode"): Xrm.OptionSetControl<contact_statecode>;
    getControl(controlName: "telephone1"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
