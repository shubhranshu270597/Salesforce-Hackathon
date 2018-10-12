({
	getAccountList : function(component, event, helper) {
		helper.fetchAccounts(component,event, helper);
	},
   
   /*  newAccount: function(component, event, helper) {
        var createAccount = $A.get("e.force:createRecord");
        createAccount.setParams({
            "entityApiName": "Account" 
           // "defaultFieldValues": {
             //   "AccountId": component.get("v.recordId")
           // 
           // }
        });
        createAccount.fire();
    }, */
    
    editAccount:function (component, event, helper){
    
      var btn=event.getSource();
      var name= btn.get('v.name');
      var recordViewForm = component.find('recordViewForm');
      var recordEditForm = component.find('recordEditForm');
      if(name=='edit'){
        
    	$A.util.addClass(recordViewForm,'formHide');
        $A.util.removeClass(recordEditForm,'formHide');
        btn.set('v.name','save');
        btn.set('v.label','Save');
          
       }else if(name=='save'){
    		
    		helper.saveAccounts(component, event, helper);
        }
    },
    
    deleteAccounts : function(component, event, helper){
        
        helper.removeAccounts(component, event, helper);
    },
    
    openModal: function(component, event, helper) {
        var modal = component.find("accountModal");
        var modalBackdrop = component.find("accountModalBackdrop");
        $A.util.addClass(modal,"slds-fade-in-open");
        $A.util.addClass(modalBackdrop,"slds-backdrop_open");
    },
    
    closeModal: function(component, event, helper) {
        var modal = component.find("accountModal");
        var modalBackdrop = component.find("accountModalBackdrop");
        $A.util.removeClass(modal,"slds-fade-in-open");
        $A.util.removeClass(modalBackdrop,"slds-backdrop_open");
    },
    
     createAccount: function(component, event, helper) {
        helper.insertAccount(component, event, helper);
    }
    
})