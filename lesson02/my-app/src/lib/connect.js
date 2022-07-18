import {loadingStatus, connectAdmin} from "$lib/store";

export const connect = {
    loading:{
        start: ()=>{
            loadingStatus.set(true);
        },
        end: ()=>{
            loadingStatus.set(false);
        }
    },
    file:{
        isInvalidUploadFildSize : (size)=>{
            return size > 1 * 1024 * 1024;
        },
        async readFileAsDataURL(file){
            let result_base64 = await new Promise((resolve)=>{
                if(connect.file.isInvalidUploadFildSize(file.size)){
                    resolve(null);
                }

                let fileReader = new FileReader();
                fileReader.onload = (e)=> resolve(e.target.result);
                fileReader.readAsDataURL(file);
            });

            return result_base64;
        }
    }
};