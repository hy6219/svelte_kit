import {loginModal, alertModal, confirmModal} from "$lib/store";

export const modal = {
    alert: (message, callback)=>{
        alertModal.set({
            message,
            callback(){
                //callback 메서드가 truthy할 경우에만 호출될 것
                callback && callback();
                alertModal.update(s=>{s.open=false; return s;})
            },
            open: true 
        });
    },
    confirm: (message,  yesText, noText, yesFunc, noFunc = ()=>{confirmModal.update((s)=>{s.open = false; return s;})}) =>{
        confirmModal.set({
            open:true,
            yesText,
            noText,
            yesFunc(){
                yesFunc();
                confirmModal.update(s=>{s.open = false; return s;});
            },
            noFunc,
            message
        })
    },
    login:{
        open(){
            loginModal.set({open: true});
        },
        close(){
            loginModal.set({open:false});
        }
    }
};