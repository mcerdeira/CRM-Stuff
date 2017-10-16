declare namespace Form.account.Main {
  namespace AccountMoCa {
    namespace Tabs {
      interface fstab_address extends Xrm.SectionCollectionBase {
        get(name: "fstab_address_section_address"): Xrm.PageSection;
        get(name: "tab_5_section_2"): Xrm.PageSection;
        get(name: "tab_5_section_3"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface fstab_other extends Xrm.SectionCollectionBase {
        get(name: "fstab_other_section"): Xrm.PageSection;
        get(name: "tab_4_section_5"): Xrm.PageSection;
        get(name: "tab_4_section_6"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface fstab_sub_grids extends Xrm.SectionCollectionBase {
        get(name: "tab_4_section_1"): Xrm.PageSection;
        get(name: "tab_4_section_2"): Xrm.PageSection;
        get(name: "tab_4_section_3"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface fstab_summary extends Xrm.SectionCollectionBase {
        get(name: "fstab_summary_section_account_information"): Xrm.PageSection;
        get(name: "fstab_summary_section_description"): Xrm.PageSection;
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
      get(name: "address1_line1"): Xrm.Attribute<string>;
      get(name: "address1_line2"): Xrm.Attribute<string>;
      get(name: "address1_line3"): Xrm.Attribute<string>;
      get(name: "address1_postalcode"): Xrm.Attribute<string>;
      get(name: "address1_stateorprovince"): Xrm.Attribute<string>;
      get(name: "defaultpricelevelid"): Xrm.LookupAttribute;
      get(name: "description"): Xrm.Attribute<string>;
      get(name: "emailaddress1"): Xrm.Attribute<string>;
      get(name: "fax"): Xrm.Attribute<string>;
      get(name: "msdyn_billingaccount"): Xrm.LookupAttribute;
      get(name: "msdyn_serviceterritory"): Xrm.LookupAttribute;
      get(name: "msdyn_workorderinstructions"): Xrm.Attribute<string>;
      get(name: "name"): Xrm.Attribute<string>;
      get(name: "ownerid"): Xrm.LookupAttribute;
      get(name: "parentaccountid"): Xrm.LookupAttribute;
      get(name: "telephone1"): Xrm.Attribute<string>;
      get(name: "transactioncurrencyid"): Xrm.LookupAttribute;
      get(name: "websiteurl"): Xrm.Attribute<any>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "AGREEMENTS"): Xrm.SubGridControl;
      get(name: "ChildAccounts"): Xrm.SubGridControl;
      get(name: "Contacts"): Xrm.SubGridControl;
      get(name: "INVOICES"): Xrm.SubGridControl;
      get(name: "WORKORDERS"): Xrm.SubGridControl;
      get(name: "address1_composite"): Xrm.StringControl;
      get(name: "address1_composite_compositionLinkControl_address1_city"): Xrm.StringControl;
      get(name: "address1_composite_compositionLinkControl_address1_country"): Xrm.StringControl;
      get(name: "address1_composite_compositionLinkControl_address1_line1"): Xrm.StringControl;
      get(name: "address1_composite_compositionLinkControl_address1_line2"): Xrm.StringControl;
      get(name: "address1_composite_compositionLinkControl_address1_line3"): Xrm.StringControl;
      get(name: "address1_composite_compositionLinkControl_address1_postalcode"): Xrm.StringControl;
      get(name: "address1_composite_compositionLinkControl_address1_stateorprovince"): Xrm.StringControl;
      get(name: "defaultpricelevelid"): Xrm.LookupControl;
      get(name: "description"): Xrm.StringControl;
      get(name: "emailaddress1"): Xrm.StringControl;
      get(name: "fax"): Xrm.StringControl;
      get(name: "msdyn_billingaccount"): Xrm.LookupControl;
      get(name: "msdyn_serviceterritory"): Xrm.LookupControl;
      get(name: "msdyn_workorderinstructions"): Xrm.StringControl;
      get(name: "name"): Xrm.StringControl;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ownerid"): Xrm.LookupControl;
      get(name: "parentaccountid"): Xrm.LookupControl;
      get(name: "telephone1"): Xrm.StringControl;
      get(name: "transactioncurrencyid"): Xrm.LookupControl;
      get(name: "websiteurl"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "fstab_address"): Xrm.PageTab<Tabs.fstab_address>;
      get(name: "fstab_other"): Xrm.PageTab<Tabs.fstab_other>;
      get(name: "fstab_sub_grids"): Xrm.PageTab<Tabs.fstab_sub_grids>;
      get(name: "fstab_summary"): Xrm.PageTab<Tabs.fstab_summary>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface AccountMoCa extends Xrm.PageBase<AccountMoCa.Attributes,AccountMoCa.Tabs,AccountMoCa.Controls> {
    getAttribute(attributeName: "address1_city"): Xrm.Attribute<string>;
    getAttribute(attributeName: "address1_composite"): Xrm.Attribute<string>;
    getAttribute(attributeName: "address1_country"): Xrm.Attribute<string>;
    getAttribute(attributeName: "address1_line1"): Xrm.Attribute<string>;
    getAttribute(attributeName: "address1_line2"): Xrm.Attribute<string>;
    getAttribute(attributeName: "address1_line3"): Xrm.Attribute<string>;
    getAttribute(attributeName: "address1_postalcode"): Xrm.Attribute<string>;
    getAttribute(attributeName: "address1_stateorprovince"): Xrm.Attribute<string>;
    getAttribute(attributeName: "defaultpricelevelid"): Xrm.LookupAttribute;
    getAttribute(attributeName: "description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "emailaddress1"): Xrm.Attribute<string>;
    getAttribute(attributeName: "fax"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_billingaccount"): Xrm.LookupAttribute;
    getAttribute(attributeName: "msdyn_serviceterritory"): Xrm.LookupAttribute;
    getAttribute(attributeName: "msdyn_workorderinstructions"): Xrm.Attribute<string>;
    getAttribute(attributeName: "name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute;
    getAttribute(attributeName: "parentaccountid"): Xrm.LookupAttribute;
    getAttribute(attributeName: "telephone1"): Xrm.Attribute<string>;
    getAttribute(attributeName: "transactioncurrencyid"): Xrm.LookupAttribute;
    getAttribute(attributeName: "websiteurl"): Xrm.Attribute<any>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "AGREEMENTS"): Xrm.SubGridControl;
    getControl(controlName: "ChildAccounts"): Xrm.SubGridControl;
    getControl(controlName: "Contacts"): Xrm.SubGridControl;
    getControl(controlName: "INVOICES"): Xrm.SubGridControl;
    getControl(controlName: "WORKORDERS"): Xrm.SubGridControl;
    getControl(controlName: "address1_composite"): Xrm.StringControl;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_city"): Xrm.StringControl;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_country"): Xrm.StringControl;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_line1"): Xrm.StringControl;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_line2"): Xrm.StringControl;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_line3"): Xrm.StringControl;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_postalcode"): Xrm.StringControl;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_stateorprovince"): Xrm.StringControl;
    getControl(controlName: "defaultpricelevelid"): Xrm.LookupControl;
    getControl(controlName: "description"): Xrm.StringControl;
    getControl(controlName: "emailaddress1"): Xrm.StringControl;
    getControl(controlName: "fax"): Xrm.StringControl;
    getControl(controlName: "msdyn_billingaccount"): Xrm.LookupControl;
    getControl(controlName: "msdyn_serviceterritory"): Xrm.LookupControl;
    getControl(controlName: "msdyn_workorderinstructions"): Xrm.StringControl;
    getControl(controlName: "name"): Xrm.StringControl;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl;
    getControl(controlName: "parentaccountid"): Xrm.LookupControl;
    getControl(controlName: "telephone1"): Xrm.StringControl;
    getControl(controlName: "transactioncurrencyid"): Xrm.LookupControl;
    getControl(controlName: "websiteurl"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: string): undefined;
  }
}
