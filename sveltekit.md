# SvelteKit

** SEO : **

- SPA : Single Page Application
> 하나의 비어있는 html 페이지 내에서 컨텐츠를 렌더링하는 것
> 스벨트킷은 SSR과 client side rendering 모두를 지원

- 스벨트 킷은 `vite`라는 것에 의해 빌드됨

## 1. 스벨트킷 준비

https://kit.svelte.dev/docs/introduction#getting-started

```
npm create svelte my-app
cd my-app
npm install
npm run dev
```
↔ 
```
npm create svelte 생성할_프로젝트명
cd 생성할_프로젝트명
npm install
npm run dev
```

그리고 그 전에!! node.js를 설치해주어야 한다!

➕ `cmd에서 code라고 치면, vs code가 나타난다`

- `package.json` : 프로젝트에서 사용하게 될 라이브러리들이 존재

처음에는 아래처럼 `devDependencies 아래에 @sveltejs/kit : next` 로 되어있을 텐데

```json
{

...

"devDependencies": {

...

"@sveltejs/kit": "next",

...

},

"type": "module"

}
```

을 수강한 강의에서는 pre-fetching (구동에 필요한 데이터들을 메모리에 먼저 올려두는 것)문제로 아래와 같은 버전으로 명시해주는 것을 언급하고 있었다


```json
"devDependencies": {

...

"@sveltejs/adapter-auto": "1.0.0-next.198",
...

},

"type": "module"

}
```

✅ 폴더 구조 설명 ✅

- src : 소스코드는 99.9% 이 위치에 존재하게 될것
- src > routes : 페이지 컴포넌트들이 위치하게 될 것
- app.html : 브라우저에 올라가게 될 하나의 html
- static 폴더 : 리소스들이 위치하게 될 공간(assets)

### Svelte Components

- 웹 페이지의 standalone 섹션
- navbar, article, banner,... 등등이 모두 component가 될 수 있음
- 스벨트킷에서 전체 페이지는 component들에 의해서 표현됨
- routes> index.svelte: 인덱스 페이지에 연결됨
- 스벨트킷에서 component는 `<script>` 부분(html부분에 동적으로 값들을 주입시키기 위한 js 코드)과 `html 태그로 구성된 부분`으로 나뉘어짐

+vs code 에서 lorem60을 입력하고 엔터를 누르면 lorem ipsum이 자동완성됨

#### 1. script 태그 내에서 사용된 변수의 값을 html 내에 적용하기 `{}`

```html
<script>
    let title = "Ninja Gaming Guides";
</script>

<div class="index">
    <h2>{title}</h2>
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Nostrum ut neque assumenda eos molestias vitae, 
        nisi voluptatem quisquam voluptates fugiat quia sed quod animi tempora, 
        placeat non doloribus accusamus quasi odio! Doloremque, 
        ratione commodi hic quisquam illo dicta ex nemo, 
        nulla voluptatem architecto omnis accusamus qui facilis praesentium tenetur 
        voluptate aperiam voluptates recusandae corrupti corporis veritatis. Accusamus nostrum nobis optio?
    </p>


</div>

<style>
    .index{
        text-align: center;
        display:block;
        margin: 20px auto;
    }
</style>
```

script 부분에서 `title`이라는 변수에 값을 지정해두거나 외부에서 넣어주게 되서 변경이 되면, 앞으로 bracelet 내부에 반영되어서 title 변수값이 변경될때마다 바뀌는 모습을 확인해볼 수 있을 것이다

#### 2. `spring과 svelte 연결하기`

- CORS 설정을 해주어야 함

✅ FE

- 프로젝트 경로에 `.env` 파일을 만들어주자
- `.env.local/.env.dev/.env.production 등등...`
(VITE_MODE값은 local, dev, production 이 올 수 있음)
VITE_API_SERVER 값은 서버측 주소
```
VITE_MODE=local
VITE_API_SERVER=http://localhost:9091
```

🟡 axios 관련 🟡

https://freeseamew.gitbook.io/svelte/9.-ajax/axios
- `npm install axios`
- VITE_MODE, VITE_API_SERVER 값 관리

경로: src> lib - variables.js

```javascript
export  const  variables ={

mode:  import.meta.env.VITE_MODE,

basePath:import.meta.env.VITE_API_SERVER

};
```

필요에 따라서, store.js(모달 등 writable 상태객체 관리) | modal.js(store.js를 이용해서 모달 틀 만들기) | connect.js(로딩 상태 변경)을 만들고

store.js
```javascript
import { writable } from "svelte/store";

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
```

modal.js
```javascript
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
```

connect.js
```javascript
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
```

그리고 axios를 활용해서 ajax 를 진행하기 위한 ajax.js를 만들자

```javascript
import axios from 'axios';
import {variables} from "$lib/variables";
import {goto} from "$app/navigation";
import {connect} from "$lib/connect";
import {modal} from "$lib/modal";

axios.defaults.baseURL = variables.basePath;//서버 기본 도메인, 포트번호, 프로토콜 설정
export const _axios = axios.create({
    baseURL: variables.basePath,
    timeout: 10000
});

//getmapping
export async function get(url, callback){
    let promise = _axios.get(url);

    if(callback){
        promise.then(response => callback(response.data))
        .catch(()=> connect.loading.end());
    }

    return promise;
}

//예외처리
function processErr(e, callback){
    console.log("error: "+e);

    /*
    ResponseEntity  : (T body, header = null,HttpStatus status) 로  보낼 예정

     */

    if(e.response.status  === 500){
        const data = e.response.data;
        if(data && data.code && data.code === '9999' && data.message){
            modal.alert(data.message);
        }
    }

    connect.loading.end();
    callback({code:'9999'});
}


//post mapping
export async function post(url, data, callback){
    connect.loading.start();

    return _axios.post(url,data)
    .then(response =>{
        connect.loading.end();
        callback(response.data)
    })
    .catch((e)=> processErr(e,callback));
}


//put mapping
export async function put(url, data, callback){
    connect.loading.start();

    return _axios.put(url,data)
    .then(response =>{
        connect.loading.end();
        callback(response.data)
    })
    .catch((e)=> processErr(e,callback));

}

//delete mapping
export async function del(url, data, callback){
    connect.loading.start();

    return _axios.delete(url,{data})
    .then(response =>{
        connect.loading.end();
        callback(response.data)
    })
    .catch((e)=> processErr(e,callback));

}
```
`ReferenceError: localStorage is not defined` 문제가 발생!
> https://github.com/sveltejs/kit/issues/2678 참고해서 `@sveltejs/adapter-static: ^1.0.0-next.21 => 1.0.0-next.21` 추가
> 
```
/*

src\app.html is missing %svelte.head% ==> "@sveltejs/adapter-netlify": "next"추가

*/

```
==> https://ux.stories.pe.kr/58
npm install -g npm-check-updates, ncu -u 로 최신 버전으로 라이브러리 업데이트

> packages are looking for funding  run `npm fund` for details
⇒ https://stackoverflow.com/questions/58972251/what-does-x-packages-are-looking-for-funding-mean-when-running-npm-install

> > svelte-kit dev is no longer available — use vite dev instead
  1. Install vite as a devDependency with npm/pnpm/etc
  2. Create a vite.config.js with the @sveltejs/kit/vite plugin (see below)
  3. Update your package.json scripts to reference `vite dev` instead of `svelte-kit dev`
```javascript
// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
        plugins: [sveltekit()]
};

export default config;
```

⇒ 그대로~
https://npmmirror.com/package/vite-plugin-svelte

npm install --save-dev vite
위의 내용으로 vite.config.js 작성
package.json에서 `dev:svelte-kit` 를 `dev: vite`로 변경

> `the server responded with a status of 404 ()`
https://github.com/sveltejs/kit/issues/3159
serviceWorker를 svelte.config.js 에 추가
```javascript
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	serviceWorker: {
		register: false,
	}
};

export default config;

```

> (index):6773 crbug/1173575, non-JS module files deprecated.[상세: No resource with given URL found]

⇒ 리소스 경로 검토

> (에러 쏟아진다..)  localSotrage is not defined
https://github.com/sveltejs/kit/issues/2678 참고해서 @sveltejs/adapter-static 모듈이 필요함을 파악
->npm install @sveltejs/adapter-static --save

✅ BE

- application.yaml

```yaml
server:  
  port: 9091 
  
svelte-connect:  
  server: http://localhost:9091  
  origins: http://localhost:5173
```

- SecurityConfig.java(로그인 , cors 설정 관련 configuration 모음)

```java
package com.example.connect.common.system;  
  
import com.example.connect.common.auth.service.CustomUserDetailService;  
import lombok.RequiredArgsConstructor;  
import org.springframework.beans.factory.annotation.Value;  
import org.springframework.context.annotation.Bean;  
import org.springframework.context.annotation.Configuration;  
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;  
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;  
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;  
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;  
import org.springframework.security.crypto.password.PasswordEncoder;  
import org.springframework.web.cors.CorsConfiguration;  
import org.springframework.web.cors.CorsConfigurationSource;  
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;  
  
@Configuration  
@EnableWebSecurity  
@RequiredArgsConstructor  
public class SecurityConfig extends WebSecurityConfigurerAdapter {  
    //cors  
  @Value("${svelte-connect.origins}")  
    private String origins;  
  
    private final CustomUserDetailService customUserDetailService;  
  
    @Bean  
  public PasswordEncoder passwordEncoder() {  
        return new BCryptPasswordEncoder();  
    }  
  
    //AuthenticationException 세분화  
  @Bean  
  public DaoAuthenticationProvider daoAuthenticationProvider() {  
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();  
        authenticationProvider.setPasswordEncoder(passwordEncoder());  
        authenticationProvider.setUserDetailsService(customUserDetailService);  
        authenticationProvider.setHideUserNotFoundExceptions(false);  
        return authenticationProvider;  
    }  
  
    //cors 설정  
  @Bean  
  public CorsConfigurationSource corsConfigurationSource() {  
        CorsConfiguration config = new CorsConfiguration();  
        config.addAllowedHeader("*");  
        config.addAllowedMethod("*");  
        config.addAllowedOrigin(origins);  
        config.setAllowCredentials(true);  
  
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();  
        source.registerCorsConfiguration("/**", config);  
  
        return source;  
    }  
}
```


