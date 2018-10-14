({
	fetchAccounts : function(component,event, helper) {
	  var action = 	component.get("c.findAll");
        action.setCallback(this, function(a) {
            
            var state= a.getState();
            if(state==='SUCCESS'){
            //component.set("v.accounts", a.getReturnValue());
             var accountList = a.getReturnValue(); 
             console.log('accountList-->'+accountList);
             component.set("v.accounts", accountList);
            }else{
                
                alert ('Error in getting data...');
            }
        });
          $A.enqueueAction(action);
	},
    
    saveAccounts: function(component, event, helper){
        
        var accountList = component.get('v.accounts');
        var recordViewForm = component.find('recordViewForm');
        var recordEditForm = component.find('recordEditForm');
        var saveAction = component.get('c.saveAccountList');
        var toastEvent = $A.get('e.force:showToast');
        saveAction.setParams({
            lstAccount : accountList
        });   
        saveAction.setCallback(this, function(a){
            
            var state=a.getState();
            var btn=event.getSource();
            
            if(state==='SUCCESS'){
                 
                var dataMap = a.getReturnValue(); 
                if(dataMap.status=='success'){
                    $A.util.addClass(recordEditForm,'formHide');
                    $A.util.removeClass(recordViewForm,'formHide');
                    btn.set('v.name','edit');
                    btn.set('v.label','Edit');
                    toastEvent.setParams({
                        'title': 'Success!',
                        'type': 'success',
                        'mode': 'dismissable',
                        'message': dataMap.message
                    });
                    toastEvent.fire();
                }else if(dataMap.status=='error'){
                    toastEvent.setParams({
                        'title': 'Error!',
                        'type': 'error',
                        'mode': 'dismissable',
                        'message': dataMap.message
                    });
                    toastEvent.fire();
                }
                
            }else{
                alert('Error in updating data...');
            }
            
        });
        
        $A.enqueueAction(saveAction);
    },
    
    removeAccounts: function(component, event, helper) {
        console.log('enter');
        
        var delId = [];
        var getAllId = component.find("deleteAccount");
        
        if(! Array.isArray(getAllId)){
             console.log('one check');
          if (getAllId.get("v.value") == true) {
             delId.push(getAllId.get("v.text"));
               console.log('delId-->'+delId);
           }
        }
        /*else{
            console.log('many click');
          for (var i = 0; i < getAllId.length; i++) {
             if (getAllId[i].get("v.value") == true) {
                delId.push(getAllId[i].get("v.text"));
                console.log('delId-->'+delId);
               }
          }
        } */
        
        var toastEvent = $A.get('e.force:showToast');
        var deleteAction = component.get('c.deleteAccounts');
        deleteAction.setParams({
            lstAccountIds: delId
        });
        deleteAction.setCallback(this, function(a) {
            var state = a.getState();
            if(state === 'SUCCESS') {
                var dataMap = a.getReturnValue();
                if(dataMap.status=='success') {
                    toastEvent.setParams({
                        'title': 'Success!',
                        'type': 'success',
                        'mode': 'dismissable',
                        'message': dataMap.message
                    });
                    toastEvent.fire();            
                        window.location.reload();
                }
                else if(dataMap.status=='error') {
                    toastEvent.setParams({
                        'title': 'Error!',
                        'type': 'error',
                        'mode': 'dismissable',
                        'message': dataMap.message
                    });
                    toastEvent.fire();                
                }
            }
            else {
                alert('Error in getting data');
            }            
        });
        $A.enqueueAction(deleteAction);
    },
  /*  
   // Previous Code
    insertAccount: function(component, event, helper) {
        var account = component.get("v.account");
        account.Id = component.get('v.recordId');
        // Initializing the toast event to show toast
        var toastEvent = $A.get('e.force:showToast');
        var createAction = component.get('c.createAccount');
        createAction.setParams({
            account: account
        });
        createAction.setCallback(this, function(a) {           
            var state = a.getState();
            if(state === 'SUCCESS') {
                var dataMap = a.getReturnValue();
                if(dataMap.status=='success') {
                    toastEvent.setParams({
                        'title': 'Success!',
                        'type': 'success',
                        'mode': 'dismissable',
                        'message': dataMap.message
                    });
                    toastEvent.fire();            
                    window.location.reload();
                }
                else if(dataMap.status=='error') {
                    toastEvent.setParams({
                        'title': 'Error!',
                        'type': 'error',
                        'mode': 'dismissable',
                        'message': dataMap.message
                    });
                    toastEvent.fire();                
                }
            } else {
                alert('Error in getting data');
            }
        });
        $A.enqueueAction(createAction);
    }
    */
    
    // New code
     insertAccount : function(component, event, helper) {     
     var action = component.get("c.creatAccountRecord");
            action.setParams({"account":component.get("v.account")});
            action.setCallback(this,function(result){
            component.set("v.isShow",false);
            var accId = result.getReturnValue();
            console.log('success');
            alert('accId'+accId); 
        });
         $A.enqueueAction(action);
 }
})
