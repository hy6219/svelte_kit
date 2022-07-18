import {writable} from "svelte/store";

//로그인여부, 로그인 아이디
export let connectAdmin =  writable({
    isLogin : localStorage.getItem('isLogin') === 'Y' || sessionStorage.getItem('isLogin') === 'Y',
    loginId : localStorage.getItem('loginId') ? localStorage.getItem('loginId') : sessionStorage.getItem('loginId')
});

//알럿모달
export let alertModal = writable({
    open: false,
    callback(){

    },
    message : ''
});

//confirm 모달
export let confirmModal = writable({
    open: false,
    yesText : '',
    noText: '',
    yesFunc(){

    },
    noFunc(){

    },
    message: ''
});

//로그인 모달
export let loginModal = writable({
    open : false
});

//로딩바
export let loadingStatus = writable(false);