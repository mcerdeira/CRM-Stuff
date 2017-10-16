declare namespace Form.contact.MainInteractionCentric {
  namespace ContactforInteractiveexperience {
    namespace Tabs {
      interface DETAILS_TAB extends Xrm.SectionCollectionBase {
        get(name: "CONTACT_PREFERENCES"): Xrm.PageSection;
        get(name: "PERSONAL INFORMATION"): Xrm.PageSection;
        get(name: "PERSONAL_NOTES_SECTION"): Xrm.PageSection;
        get(name: "billing information"): Xrm.PageSection;
        get(name: "marketing information"): Xrm.PageSection;
        get(name: "shipping information"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface SUMMARY_TAB extends Xrm.SectionCollectionBase {
        get(name: "CONTACT_INFORMATION"): Xrm.PageSection;
        get(name: "Timeline"): Xrm.PageSection;
        get(name: "ref_pan_CUSTOMER_DETAILS_TAB"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "address1_city"): Xrm.Attribute<string>;
      get(name: "address1_composite"): Xrm.Attribute<string>;
      get(name: "address1_country"): Xrm.Attribute<string>;
      get(name: "address1_freighttermscode"): Xrm.OptionSetAttribute<contact_address1_freighttermscode>;
      get(name: "address1_line1"): Xrm.Attribute<string>;
      get(name: "address1_line2"): Xrm.Attribute<string>;
      get(name: "address1_line3"): Xrm.Attribute<string>;
      get(name: "address1_postalcode"): Xrm.Attribute<string>;
      get(name: "address1_shippingmethodcode"): Xrm.OptionSetAttribute<contact_address1_shippingmethodcode>;
      get(name: "address1_stateorprovince"): Xrm.Attribute<string>;
      get(name: "anniversary"): Xrm.DateAttribute;
      get(name: "birthdate"): Xrm.DateAttribute;
      get(name: "creditlimit"): Xrm.NumberAttribute;
      get(name: "creditonhold"): Xrm.OptionSetAttribute<boolean>;
      get(name: "description"): Xrm.Attribute<string>;
      get(name: "donotbulkemail"): Xrm.OptionSetAttribute<boolean>;
      get(name: "donotemail"): Xrm.OptionSetAttribute<boolean>;
      get(name: "donotfax"): Xrm.OptionSetAttribute<boolean>;
      get(name: "donotphone"): Xrm.OptionSetAttribute<boolean>;
      get(name: "donotpostalmail"): Xrm.OptionSetAttribute<boolean>;
      get(name: "donotsendmm"): Xrm.OptionSetAttribute<boolean>;
      get(name: "emailaddress1"): Xrm.Attribute<string>;
      get(name: "familystatuscode"): Xrm.OptionSetAttribute<contact_familystatuscode>;
      get(name: "fax"): Xrm.Attribute<string>;
      get(name: "firstname"): Xrm.Attribute<string>;
      get(name: "followemail"): Xrm.OptionSetAttribute<boolean>;
      get(name: "gendercode"): Xrm.OptionSetAttribute<contact_gendercode>;
      get(name: "jobtitle"): Xrm.Attribute<string>;
      get(name: "lastname"): Xrm.Attribute<string>;
      get(name: "lastusedincampaign"): Xrm.DateAttribute;
      get(name: "mobilephone"): Xrm.Attribute<string>;
      get(name: "originatingleadid"): Xrm.LookupAttribute;
      get(name: "ownerid"): Xrm.LookupAttribute;
      get(name: "parentcustomerid"): Xrm.Attribute<any>;
      get(name: "paymenttermscode"): Xrm.OptionSetAttribute<contact_paymenttermscode>;
      get(name: "preferredcontactmethodcode"): Xrm.OptionSetAttribute<contact_preferredcontactmethodcode>;
      get(name: "spousesname"): Xrm.Attribute<string>;
      get(name: "telephone1"): Xrm.Attribute<string>;
      get(name: "transactioncurrencyid"): Xrm.LookupAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "address1_composite"): Xrm.StringControl;
      get(name: "address1_composite_compositionLinkControl_address1_city"): Xrm.StringControl;
      get(name: "address1_composite_compositionLinkControl_address1_country"): Xrm.StringControl;
      get(name: "address1_composite_compositionLinkControl_address1_line1"): Xrm.StringControl;
      get(name: "address1_composite_compositionLinkControl_address1_line2"): Xrm.StringControl;
      get(name: "address1_composite_compositionLinkControl_address1_line3"): Xrm.StringControl;
      get(name: "address1_composite_compositionLinkControl_address1_postalcode"): Xrm.StringControl;
      get(name: "address1_composite_compositionLinkControl_address1_stateorprovince"): Xrm.StringControl;
      get(name: "address1_freighttermscode"): Xrm.OptionSetControl<contact_address1_freighttermscode>;
      get(name: "address1_shippingmethodcode"): Xrm.OptionSetControl<contact_address1_shippingmethodcode>;
      get(name: "anniversary"): Xrm.DateControl;
      get(name: "birthdate"): Xrm.DateControl;
      get(name: "contactcasessgrid"): Xrm.BaseControl;
      get(name: "contactopportunitiesgrid"): Xrm.BaseControl;
      get(name: "creditlimit"): Xrm.NumberControl;
      get(name: "creditonhold"): Xrm.OptionSetControl<boolean>;
      get(name: "description"): Xrm.StringControl;
      get(name: "donotbulkemail"): Xrm.OptionSetControl<boolean>;
      get(name: "donotemail"): Xrm.OptionSetControl<boolean>;
      get(name: "donotfax"): Xrm.OptionSetControl<boolean>;
      get(name: "donotphone"): Xrm.OptionSetControl<boolean>;
      get(name: "donotpostalmail"): Xrm.OptionSetControl<boolean>;
      get(name: "donotsendmm"): Xrm.OptionSetControl<boolean>;
      get(name: "emailaddress1"): Xrm.StringControl;
      get(name: "familystatuscode"): Xrm.OptionSetControl<contact_familystatuscode>;
      get(name: "fax"): Xrm.StringControl;
      get(name: "firstname"): Xrm.StringControl;
      get(name: "followemail"): Xrm.OptionSetControl<boolean>;
      get(name: "gendercode"): Xrm.OptionSetControl<contact_gendercode>;
      get(name: "header_ownerid"): Xrm.LookupControl;
      get(name: "interactionwallcontrol"): Xrm.BaseControl;
      get(name: "jobtitle"): Xrm.StringControl;
      get(name: "lastname"): Xrm.StringControl;
      get(name: "lastusedincampaign"): Xrm.DateControl;
      get(name: "mobilephone"): Xrm.StringControl;
      get(name: "originatingleadid"): Xrm.LookupControl;
      get(name: "parentcustomerid"): Xrm.LookupControl;
      get(name: "paymenttermscode"): Xrm.OptionSetControl<contact_paymenttermscode>;
      get(name: "preferredcontactmethodcode"): Xrm.OptionSetControl<contact_preferredcontactmethodcode>;
      get(name: "preferredcontactmethodcode1"): Xrm.OptionSetControl<contact_preferredcontactmethodcode>;
      get(name: "spousesname"): Xrm.StringControl;
      get(name: "subgrid_Entitlement"): Xrm.BaseControl;
      get(name: "telephone1"): Xrm.StringControl;
      get(name: "transactioncurrencyid"): Xrm.LookupControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "DETAILS_TAB"): Xrm.PageTab<Tabs.DETAILS_TAB>;
      get(name: "SUMMARY_TAB"): Xrm.PageTab<Tabs.SUMMARY_TAB>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface ContactforInteractiveexperience extends Xrm.PageBase<ContactforInteractiveexperience.Attributes,ContactforInteractiveexperience.Tabs,ContactforInteractiveexperience.Controls> {
    getAttribute(attributeName: "address1_city"): Xrm.Attribute<string>;
    getAttribute(attributeName: "address1_composite"): Xrm.Attribute<string>;
    getAttribute(attributeName: "address1_country"): Xrm.Attribute<string>;
    getAttribute(attributeName: "address1_freighttermscode"): Xrm.OptionSetAttribute<contact_address1_freighttermscode>;
    getAttribute(attributeName: "address1_line1"): Xrm.Attribute<string>;
    getAttribute(attributeName: "address1_line2"): Xrm.Attribute<string>;
    getAttribute(attributeName: "address1_line3"): Xrm.Attribute<string>;
    getAttribute(attributeName: "address1_postalcode"): Xrm.Attribute<string>;
    getAttribute(attributeName: "address1_shippingmethodcode"): Xrm.OptionSetAttribute<contact_address1_shippingmethodcode>;
    getAttribute(attributeName: "address1_stateorprovince"): Xrm.Attribute<string>;
    getAttribute(attributeName: "anniversary"): Xrm.DateAttribute;
    getAttribute(attributeName: "birthdate"): Xrm.DateAttribute;
    getAttribute(attributeName: "creditlimit"): Xrm.NumberAttribute;
    getAttribute(attributeName: "creditonhold"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "donotbulkemail"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "donotemail"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "donotfax"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "donotphone"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "donotpostalmail"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "donotsendmm"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "emailaddress1"): Xrm.Attribute<string>;
    getAttribute(attributeName: "familystatuscode"): Xrm.OptionSetAttribute<contact_familystatuscode>;
    getAttribute(attributeName: "fax"): Xrm.Attribute<string>;
    getAttribute(attributeName: "firstname"): Xrm.Attribute<string>;
    getAttribute(attributeName: "followemail"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "gendercode"): Xrm.OptionSetAttribute<contact_gendercode>;
    getAttribute(attributeName: "jobtitle"): Xrm.Attribute<string>;
    getAttribute(attributeName: "lastname"): Xrm.Attribute<string>;
    getAttribute(attributeName: "lastusedincampaign"): Xrm.DateAttribute;
    getAttribute(attributeName: "mobilephone"): Xrm.Attribute<string>;
    getAttribute(attributeName: "originatingleadid"): Xrm.LookupAttribute;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute;
    getAttribute(attributeName: "parentcustomerid"): Xrm.Attribute<any>;
    getAttribute(attributeName: "paymenttermscode"): Xrm.OptionSetAttribute<contact_paymenttermscode>;
    getAttribute(attributeName: "preferredcontactmethodcode"): Xrm.OptionSetAttribute<contact_preferredcontactmethodcode>;
    getAttribute(attributeName: "spousesname"): Xrm.Attribute<string>;
    getAttribute(attributeName: "telephone1"): Xrm.Attribute<string>;
    getAttribute(attributeName: "transactioncurrencyid"): Xrm.LookupAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "address1_composite"): Xrm.StringControl;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_city"): Xrm.StringControl;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_country"): Xrm.StringControl;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_line1"): Xrm.StringControl;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_line2"): Xrm.StringControl;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_line3"): Xrm.StringControl;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_postalcode"): Xrm.StringControl;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_stateorprovince"): Xrm.StringControl;
    getControl(controlName: "address1_freighttermscode"): Xrm.OptionSetControl<contact_address1_freighttermscode>;
    getControl(controlName: "address1_shippingmethodcode"): Xrm.OptionSetControl<contact_address1_shippingmethodcode>;
    getControl(controlName: "anniversary"): Xrm.DateControl;
    getControl(controlName: "birthdate"): Xrm.DateControl;
    getControl(controlName: "contactcasessgrid"): Xrm.BaseControl;
    getControl(controlName: "contactopportunitiesgrid"): Xrm.BaseControl;
    getControl(controlName: "creditlimit"): Xrm.NumberControl;
    getControl(controlName: "creditonhold"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "description"): Xrm.StringControl;
    getControl(controlName: "donotbulkemail"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "donotemail"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "donotfax"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "donotphone"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "donotpostalmail"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "donotsendmm"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "emailaddress1"): Xrm.StringControl;
    getControl(controlName: "familystatuscode"): Xrm.OptionSetControl<contact_familystatuscode>;
    getControl(controlName: "fax"): Xrm.StringControl;
    getControl(controlName: "firstname"): Xrm.StringControl;
    getControl(controlName: "followemail"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "gendercode"): Xrm.OptionSetControl<contact_gendercode>;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl;
    getControl(controlName: "interactionwallcontrol"): Xrm.BaseControl;
    getControl(controlName: "jobtitle"): Xrm.StringControl;
    getControl(controlName: "lastname"): Xrm.StringControl;
    getControl(controlName: "lastusedincampaign"): Xrm.DateControl;
    getControl(controlName: "mobilephone"): Xrm.StringControl;
    getControl(controlName: "originatingleadid"): Xrm.LookupControl;
    getControl(controlName: "parentcustomerid"): Xrm.LookupControl;
    getControl(controlName: "paymenttermscode"): Xrm.OptionSetControl<contact_paymenttermscode>;
    getControl(controlName: "preferredcontactmethodcode"): Xrm.OptionSetControl<contact_preferredcontactmethodcode>;
    getControl(controlName: "preferredcontactmethodcode1"): Xrm.OptionSetControl<contact_preferredcontactmethodcode>;
    getControl(controlName: "spousesname"): Xrm.StringControl;
    getControl(controlName: "subgrid_Entitlement"): Xrm.BaseControl;
    getControl(controlName: "telephone1"): Xrm.StringControl;
    getControl(controlName: "transactioncurrencyid"): Xrm.LookupControl;
    getControl(controlName: string): undefined;
  }
}