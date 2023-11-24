
    export const bundleTs = "import{createContext as He,Fragment as H,h as e,hydrate as Ae}from\"https://esm.sh/preact@10.5.15\";import{useCallback as D,useContext as Ve,useEffect as h,useMemo as je,useReducer as he,useRef as J,useState as N}from\"https://esm.sh/preact@10.5.15/hooks\";var A=()=>Date.now().toString(36)+Math.random().toString(36).substr(2);var ct={tabsData:[{service:\"\",schema:\"\",act:\"\",postFields:{},getFields:{},formData:{},response:null}],activeTab:0,setActiveTab:()=>({}),addTab:()=>({}),closeTab:()=>({}),setTabsData:()=>({})},lt={schemasObj:{},actsObj:{},setService:()=>({}),setMethod:()=>({}),setSchema:()=>({}),setAct:()=>({}),setActsObj:()=>({}),setSchemasObj:()=>({}),setPostFields:()=>({}),resetPostFields:()=>({}),setGetFields:()=>({}),resetGetFields:()=>({}),setFormData:()=>({}),setResponse:()=>({})},dt={history:[],deleteItemHistory:()=>({}),setHistory:()=>({})},pt={headers:{Authorization:\"\"},setHeader:()=>({})},me=()=>({id:A(),bodyHeaders:`\n{\n  \"headers\": {\n    \"Content-Type\": \"application/json\",\n    \"Authorization\": \"\"\n  },\n  \"body\": {\n    \"service\": \"main\",\n    \"contents\": \"dynamic\",\n    \"model\": \"\",\n    \"act\": \"\",\n    \"details\": {\n      \"get\": {\n      },\n    \"set\": {\n    }\n  }\n}\n}\n            `,repeat:1,captures:[]}),mt={e2eForms:[me()],setE2eForms:()=>({}),addE2eForm:()=>({})},ut={modal:null,setModal:()=>({})},ue={...ct,...lt,...dt,...pt,...mt,...ut};function Be(a,t){let{type:s,payload:n}=t;switch(s){case\"SET_SELECTED_SERVICE\":{let o=[...a.tabsData];return o[n.index]={...o[n.index],service:n.data},{...a,tabsData:[...o]}}case\"SET_SCHEMA\":{let o=[...a.tabsData];return o[n.index]={...o[n.index],schema:n.data},{...a,tabsData:[...o]}}case\"SET_ACT\":{let o=[...a.tabsData];return o[n.index]={...o[n.index],act:n.data},{...a,tabsData:[...o]}}case\"SET_POST_FIELDS\":{let o=[...a.tabsData];return o[n.index]={...o[n.index],postFields:n.data},{...a,tabsData:[...o]}}case\"RESET_POST_FIELDS\":{let o=[...a.tabsData];return o[n]={...o[n],postFields:{}},{...a,tabsData:[...o]}}case\"SET_GET_FIELDS\":{let o=[...a.tabsData];return o[n.index]={...o[n.index],getFields:n.data},{...a,tabsData:[...o]}}case\"RESET_GET_FIELDS\":{let o=[...a.tabsData];return o[n]={...o[n],getFields:{}},{...a,tabsData:[...o]}}case\"SET_FORM_DATA\":{let o=[...a.tabsData];return o[n.index]={...o[n.index],formData:n.data},{...a,tabsData:[...o]}}case\"SET_HEADER\":return{...a,headers:n};case\"ADD_HISTORY\":return{...a,history:n};case\"SET_TABS_DATA\":return{...a,tabsData:n};case\"SET_RESPONSE\":{let o=[...a.tabsData];return o[n.index]={...o[n.index],response:n.data},{...a,tabsData:[...o]}}case\"ADD_TAB\":return{...a,tabsData:[...a.tabsData,{service:\"\",schema:\"\",act:\"\",postFields:{},getFields:{},formData:{},response:null}],activeTab:a.tabsData.length};case\"SET_ACTIVE_TAB\":return{...a,activeTab:n};case\"CLOSE_TAB\":{let o=[...a.tabsData];return o.length>1&&o.splice(n,1),{...a,tabsData:[...o],activeTab:o.length>=1&&a.activeTab>=n&&a.activeTab!==0?a.activeTab-1:a.activeTab}}case\"DELETE_ITEM_HISTORY\":return{...a,history:a.history.slice(0,n).concat(a.history.slice(n+1))};case\"SET_ACTS_OBJ\":return{...a,actsObj:n};case\"SET_SCHEMAS_OBJ\":return{...a,schemasObj:n};case\"SET_E2E_FORMS\":return{...a,e2eForms:n};case\"ADD_E2E_FORM\":return{...a,e2eForms:[...a.e2eForms,n]};case\"OPEN_MODAL\":return{...a,modal:n};default:throw new Error(\"Unhandled action type\")}}var ve=He(ue),$e=a=>{let[t,s]=he(Be,ue),n=D(c=>s({type:\"SET_SELECTED_SERVICE\",payload:c}),[s]),o=D(c=>s({type:\"SET_SCHEMA\",payload:c}),[s]),f=D(c=>s({type:\"SET_ACT\",payload:c}),[s]),i=D(c=>s({type:\"SET_POST_FIELDS\",payload:c}),[s]),p=D(c=>s({type:\"RESET_POST_FIELDS\",payload:c}),[s]),l=D(c=>s({type:\"SET_GET_FIELDS\",payload:c}),[s]),g=D(c=>s({type:\"RESET_GET_FIELDS\",payload:c}),[s]),F=D(c=>s({type:\"SET_FORM_DATA\",payload:c}),[s]),b=D(c=>s({type:\"SET_ACTIVE_TAB\",payload:c}),[s]),S=D(c=>s({type:\"ADD_TAB\",payload:c}),[s]),C=D(c=>s({type:\"CLOSE_TAB\",payload:c}),[s]),I=D(c=>s({type:\"DELETE_ITEM_HISTORY\",payload:c}),[s]),Z=D(c=>s({type:\"SET_HEADER\",payload:c}),[s]),G=D(c=>s({type:\"ADD_HISTORY\",payload:c}),[s]),W=D(c=>s({type:\"SET_TABS_DATA\",payload:c}),[s]),Q=D(c=>s({type:\"SET_RESPONSE\",payload:c}),[s]),O=D(c=>s({type:\"SET_SCHEMAS_OBJ\",payload:c}),[s]),q=D(c=>s({type:\"SET_ACTS_OBJ\",payload:c}),[s]),$=D(c=>s({type:\"SET_E2E_FORMS\",payload:c}),[s]),u=D(c=>s({type:\"ADD_E2E_FORM\",payload:c}),[s]),m=D(c=>s({type:\"OPEN_MODAL\",payload:c}),[s]),T=je(()=>({...t,setService:n,setSchema:o,setAct:f,setPostFields:i,resetPostFields:p,setGetFields:l,resetGetFields:g,setFormData:F,setHeader:Z,setHistory:G,setTabsData:W,setResponse:Q,setActsObj:q,setSchemasObj:O,setActiveTab:b,addTab:S,closeTab:C,deleteItemHistory:I,setE2eForms:$,addE2eForm:u,setModal:m}),[t]);return e(ve.Provider,{value:T,...a})};var B=()=>{let a=Ve(ve);return a},Ge=a=>{let{children:t}=a;return e($e,null,t)};var ce=a=>{let t={get:{},set:{}};for(let s in a)if(a[s]||a[s]===0||a[s]===!1){let n=s.split(\".\"),o=t;for(;n.length>1;){let f=n.shift();o[f]=o[f]||{},o=o[f]}o[n[0]]=a[s]}return t};var le=(a,t,s)=>{for(let n in a)typeof a[n]==\"object\"?le(a[n],t,s?`${s}.${n}`:n):t[`${s}.${n}`]=a[n];return t};function X(){return e(\"svg\",{width:\"25px\",height:\"25px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M11.2501 7.06066L8.03039 10.2803L6.96973 9.21967L12.0001 4.18934L17.0304 9.21967L15.9697 10.2803L12.7501 7.06066L12.7501 16.5L11.2501 16.5L11.2501 7.06066Z\",fill:\"lightcoral\"}),e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z\",fill:\"bisque\"}))}function Pe(){let{actsObj:a}=B(),t=()=>{let f=`data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(a))}`,i=document.createElement(\"a\");i.href=f,i.download=\"acts.json\",i.click()},s=[\"color-1\",\"color-2\",\"color-3\",\"color-4\",\"color-5\",\"color-6\",\"color-7\"],n=f=>Object.keys(f).map((i,p)=>{let l=A();return e(\"div\",{className:\"schema\"},e(\"div\",{className:\"schema-name\",onClick:()=>{document.getElementById(l)?.classList.toggle(\"open\")}},e(\"p\",{className:\"schema-title\"},i),e(\"span\",null,\"...\")),e(\"div\",{className:\"proceed-child-container\",id:l},o(a[i])))}),o=f=>Object.keys(f).map((i,p)=>{let l=A();if(f[i]||f[i]===0)return e(\"div\",{className:`inside-schema ${s[Math.floor(Math.random()*s.length)]}`},e(\"div\",{className:`inside ${typeof f[i]==\"object\"&&f[i].schema!==null&&\"schema-pointer\"}`,onClick:()=>{document.getElementById(l)?.classList.toggle(\"open\")}},e(\"p\",{className:\"schema-title\"},i),f[i].type&&e(\"p\",{className:\"schema-title schema-type\"},f[i].type),e(\"div\",null,\" \",typeof f[i]==\"object\"&&f[i].schema!==null&&e(\"span\",null,\"...\"))),e(\"div\",{id:l,className:\"proceed-child\"},typeof f[i]==\"object\"&&f[i]!==null&&f[i].schema!==null&&o(f[i].validator?f[i].validator.schema:f[i].schema?f[i].schema:f[i])))});return e(\"div\",{className:\"schema-modal\"},\" \",e(\"div\",{className:\"results-buttons\"},e(\"button\",{className:\" schema-export-button btn e2e-back-button e2e-export_results-button\",onClick:t},e(X,null),e(\"span\",null,\"Export\"))),e(\"div\",{className:\"schema-list\"},n(a)))}import{faker as St}from\"https://cdn.skypack.dev/@faker-js/faker\";function te(){return e(\"svg\",{width:\"25px\",height:\"28px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44771 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8Z\",fill:\"lightcoral\"}),e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z\",fill:\"bisque\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}))}function fe(){return e(\"svg\",{width:\"25px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-miterlimit\":\"10\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"path\",{d:\"M8.57 10.7701L7 9.19012L8.57 7.62012\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z\",fill:\"bisque\"}))}var ft=()=>e(\"svg\",{width:\"25px\",viewBox:\"-0.5 0 25 25\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z\",stroke:\"bisque\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"path\",{id:\"Vector\",d:\"M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"})),Y=ft;function ge(){return e(\"svg\",{width:\"25px\",viewBox:\"-0.5 0 25 25\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z\",stroke:\"bisque\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"path\",{d:\"M16 10.99L13.13 14.05C12.9858 14.2058 12.811 14.3298 12.6166 14.4148C12.4221 14.4998 12.2122 14.5437 12 14.5437C11.7878 14.5437 11.5779 14.4998 11.3834 14.4148C11.189 14.3298 11.0142 14.2058 10.87 14.05L8 10.99\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}))}function ae(){return e(\"svg\",{width:\"25px\",height:\"25px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M12 17V16.9929M12 14.8571C12 11.6429 15 12.3571 15 9.85714C15 8.27919 13.6568 7 12 7C10.6567 7 9.51961 7.84083 9.13733 9\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z\",fill:\"bisque\"}))}function be(){return e(\"svg\",{width:\"25px\",height:\"25px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M12.75 13.9393L15.9697 10.7197L17.0303 11.7803L12 16.8107L6.96967 11.7803L8.03033 10.7197L11.25 13.9393L11.25 4.5L12.75 4.5L12.75 13.9393Z\",fill:\"lightcoral\"}),e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z\",fill:\"bisque\"}))}function ye(){return e(\"svg\",{width:\"25px\",height:\"25px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M13.8876 9.9348C14.9625 10.8117 15.5 11.2501 15.5 12C15.5 12.7499 14.9625 13.1883 13.8876 14.0652C13.5909 14.3073 13.2966 14.5352 13.0261 14.7251C12.7888 14.8917 12.5201 15.064 12.2419 15.2332C11.1695 15.8853 10.6333 16.2114 10.1524 15.8504C9.6715 15.4894 9.62779 14.7336 9.54038 13.2222C9.51566 12.7947 9.5 12.3757 9.5 12C9.5 11.6243 9.51566 11.2053 9.54038 10.7778C9.62779 9.26636 9.6715 8.51061 10.1524 8.1496C10.6333 7.78859 11.1695 8.11466 12.2419 8.76679C12.5201 8.93597 12.7888 9.10831 13.0261 9.27492C13.2966 9.46483 13.5909 9.69274 13.8876 9.9348Z\",stroke:\"lightcoral\",\"stroke-width\":\"2\"}),e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z\",fill:\"bisque\"}))}function Ce(){return e(\"svg\",{width:\"25px\",viewBox:\"-0.5 0 25 25\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z\",stroke:\"bisque\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"path\",{d:\"M8 13.8599L10.87 10.8C11.0125 10.6416 11.1868 10.5149 11.3815 10.4282C11.5761 10.3415 11.7869 10.2966 12 10.2966C12.2131 10.2966 12.4239 10.3415 12.6185 10.4282C12.8132 10.5149 12.9875 10.6416 13.13 10.8L16 13.8599\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}))}var ze={fontFamily:'-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial',display:\"inline-block\",borderRadius:3,padding:\"10px 10px\",color:\"#f8f8f2\",textShadow:\"1px 1px black\",whiteSpace:\"pre-wrap\"};var bt=/(\"(\\\\u[a-zA-Z0-9]{4}|\\\\[^u]|[^\\\\\"])*\"(\\s*:)?|\\b(true|false|null)\\b|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?)/g,yt=a=>JSON.stringify(a,Ct,2).replace(/&/g,\"&amp;\").replace(/</g,\"&lt;\").replace(/>/g,\"&gt;\").replace(bt,s=>{let n=\"cute-number\",o=s;return/^\"/.test(s)?/:$/.test(s)?(n=\"cute-key\",o=o.replace(\":\",'<span class=\"cute-colon\">:</span>')):s==='\"undefined\"'?n=\"cute-undefined\":s==='\"[Function]\"'?n=\"cute-function\":n=\"cute-string\":/true|false/.test(s)?n=\"cute-boolean\":/null/.test(s)&&(n=\"cute-null\"),`<span class=\"${n}\">${o}</span>`}),Ct=(a,t)=>typeof t==\"function\"?\"[Function]\":typeof t>\"u\"?\"undefined\":t,Ze=a=>yt(a).replace(/\"/g,\"\");var j=({jsonData:a})=>{let t=Ze(a);return e(H,null,e(\"pre\",{style:ze,dangerouslySetInnerHTML:{__html:t}}))};function Se(){return e(\"svg\",{width:\"20px\",height:\"20px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},\" \",e(\"path\",{d:\"M18 17L13 12L18 7M11 17L6 12L11 7\",stroke:\"#000000\",\"stroke-width\":\"2\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),\" \"))}function Te(){return e(\"svg\",{width:\"20px\",height:\"20px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},\" \",e(\"path\",{d:\"M15 6L9 12L15 18\",stroke:\"#000000\",\"stroke-width\":\"2\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),\" \"))}function Ne(){return e(\"svg\",{width:\"20px\",height:\"20px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},\" \",e(\"path\",{d:\"M6 17L11 12L6 7M13 17L18 12L13 7\",stroke:\"#000000\",\"stroke-width\":\"2\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),\" \"))}function Ee(){return e(\"svg\",{width:\"20px\",height:\"20px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},\" \",e(\"path\",{d:\"M9 6L15 12L9 18\",stroke:\"#000000\",\"stroke-width\":\"2\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),\" \"))}function Je({pageCountNumber:a,activePage:t,setActivePage:s}){let[n,o]=N([]),[f,i]=N(1),p=C=>{i(C.target.value),s(C.target.value-1)},l=()=>{s(f-1)},g=a,F=D(()=>{let C=0,I=g>5?5:g;t>3&&t<g-3&&(C=t-1,I=t-1+3),g>5&&t>g-5&&(C=g-5,I=g-1),g<=5&&(C=0,I=g);let Z=[];for(let G=C;G<I;G++)Z.push(G);o(Z)},[t]),b=C=>s(C),S=C=>t===C?\"active\":\"\";return h(()=>F(),[t]),e(\"div\",{className:\"pagination\"},g>1&&e(\"button\",{onClick:()=>{s(0)}},\" \",e(Se,null)),g>1&&e(\"button\",{onClick:()=>{s(t===0?g-1:t-1)}},e(Te,null)),(t>=4||t>g-5)&&g>5&&e(\"button\",{onClick:()=>b(0)},1),(t>=4||t>g-5)&&g>5&&e(\"span\",null,\"...\"),n.map(C=>e(\"button\",{key:C,className:S(C),onClick:()=>b(C)},C+1)),t<g-4&&g>5&&e(\"span\",null,\"...\"),g>5&&e(\"button\",{className:S(g-1),onClick:()=>b(g-1)},g),g>1&&e(\"button\",{onClick:()=>s(t===g-1?0:t+1)},e(Ee,null)),g>1&&e(\"button\",{onClick:()=>{s(g-1)}},\" \",e(Ne,null),\" \"),g>1&&e(\"div\",{className:\"pagination--go-to\"},\" \",e(\"input\",{className:\"pagination--go-to--input\",min:1,max:g,for:\"1\",type:\"number\",onChange:p,placeholder:\"number\",value:t+1}),e(\"button\",{className:\"pagination--go-to--button\",id:\"1\",onClick:()=>{l()}},\"Go\")))}function we(){return e(\"svg\",{fill:\"#fff\",height:\"20px\",width:\"20px\",version:\"1.1\",id:\"Capa_1\",xmlns:\"http://www.w3.org/2000/svg\",viewBox:\"0 0 452.025 452.025\"},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},\" \",e(\"g\",null,\" \",e(\"g\",null,\" \",e(\"path\",{d:\"M147.912,363.325c-4.7-4.7-12.3-4.7-17,0c-4.7,4.7-4.7,12.3,0,17l13.6,13.6h-55.2c-35.9,0-65-29.2-65-65v-40.3 c0-6.6-5.4-12-12-12s-12,5.4-12,12v40.3c0,49.1,39.9,89,89,89h55.2l-13.6,13.6c-4.7,4.7-4.7,12.3,0,17c2.3,2.3,5.4,3.5,8.5,3.5 s6.1-1.2,8.5-3.5l34.1-34.1c4.7-4.7,4.7-12.3,0-17L147.912,363.325z\"}),\" \",e(\"path\",{d:\"M210.312,0.025h-197.1c-6.6,0-12,5.4-12,12v197.1c0,6.6,5.4,12,12,12h197.1c6.6,0,12-5.4,12-12v-197.1 C222.312,5.425,217.012,0.025,210.312,0.025z M198.312,197.125h-173.1v-173.1h173.1V197.125z\"}),\" \",e(\"path\",{d:\"M362.612,34.125h-55.2l13.6-13.6c4.7-4.7,4.7-12.3,0-17s-12.3-4.7-17,0l-34,34.1c-4.7,4.7-4.7,12.3,0,17l34.1,34.1 c2.3,2.3,5.4,3.5,8.5,3.5s6.1-1.2,8.5-3.5c4.7-4.7,4.7-12.3,0-17l-13.6-13.6h55.2c35.9,0,65,29.2,65,65v40.3c0,6.6,5.4,12,12,12 s12-5.4,12-12v-40.3C451.712,74.025,411.712,34.125,362.612,34.125z\"}),\" \",e(\"path\",{d:\"M438.812,428.025c-3.2,0-6.3,1.3-8.5,3.5s-3.5,5.3-3.5,8.5c0,3.1,1.3,6.3,3.5,8.5s5.3,3.5,8.5,3.5s6.3-1.3,8.5-3.5 s3.5-5.3,3.5-8.5s-1.3-6.3-3.5-8.5C445.012,429.325,441.912,428.025,438.812,428.025z\"}),\" \",e(\"path\",{d:\"M389.512,428.025c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S396.112,428.025,389.512,428.025z\"}),\" \",e(\"path\",{d:\"M290.912,428.025c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S297.612,428.025,290.912,428.025z\"}),\" \",e(\"path\",{d:\"M340.212,428.025c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S346.812,428.025,340.212,428.025z\"}),\" \",e(\"path\",{d:\"M241.713,428.025c-3.2,0-6.3,1.3-8.5,3.5s-3.5,5.3-3.5,8.5c0,3.1,1.3,6.3,3.5,8.5s5.3,3.5,8.5,3.5c3.1,0,6.3-1.3,8.5-3.5 s3.5-5.3,3.5-8.5s-1.3-6.3-3.5-8.5S244.812,428.025,241.713,428.025z\"}),\" \",e(\"path\",{d:\"M241.713,378.725c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S248.312,378.725,241.713,378.725z\"}),\" \",e(\"path\",{d:\"M241.713,329.425c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S248.312,329.425,241.713,329.425z\"}),\" \",e(\"path\",{d:\"M241.713,280.125c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S248.312,280.125,241.713,280.125z\"}),\" \",e(\"path\",{d:\"M241.713,230.925c-3.2,0-6.3,1.3-8.5,3.5s-3.5,5.3-3.5,8.5s1.3,6.3,3.5,8.5s5.3,3.5,8.5,3.5c3.1,0,6.3-1.3,8.5-3.5 s3.5-5.3,3.5-8.5c0-3.1-1.3-6.3-3.5-8.5C247.912,232.125,244.812,230.925,241.713,230.925z\"}),\" \",e(\"path\",{d:\"M389.512,230.925c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S396.112,230.925,389.512,230.925z\"}),\" \",e(\"path\",{d:\"M340.212,230.925c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S346.812,230.925,340.212,230.925z\"}),\" \",e(\"path\",{d:\"M290.912,230.925c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S297.612,230.925,290.912,230.925z\"}),\" \",e(\"path\",{d:\"M438.812,230.925c-3.2,0-6.3,1.3-8.5,3.5s-3.5,5.3-3.5,8.5s1.3,6.3,3.5,8.5s5.3,3.5,8.5,3.5s6.3-1.3,8.5-3.5 s3.5-5.3,3.5-8.5c0-3.1-1.3-6.3-3.5-8.5C445.012,232.225,441.912,230.925,438.812,230.925z\"}),\" \",e(\"path\",{d:\"M438.812,280.125c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S445.412,280.125,438.812,280.125z\"}),\" \",e(\"path\",{d:\"M438.812,378.725c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S445.412,378.725,438.812,378.725z\"}),\" \",e(\"path\",{d:\"M438.812,329.425c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S445.412,329.425,438.812,329.425z\"}),\" \"),\" \"),\" \"))}function ne(){return e(\"svg\",{width:25,height:25,viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},\" \",e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M17 3.25C17.4142 3.25 17.75 3.58579 17.75 4V17.75L19.4 15.55C19.6485 15.2186 20.1186 15.1515 20.45 15.4C20.7814 15.6485 20.8485 16.1186 20.6 16.45L17.6 20.45C17.4063 20.7083 17.0691 20.8136 16.7628 20.7115C16.4566 20.6094 16.25 20.3228 16.25 20V4C16.25 3.58579 16.5858 3.25 17 3.25ZM7.25 6C7.25 5.58579 7.58579 5.25 8 5.25H13C13.4142 5.25 13.75 5.58579 13.75 6C13.75 6.41421 13.4142 6.75 13 6.75H8C7.58579 6.75 7.25 6.41421 7.25 6ZM5.25 11C5.25 10.5858 5.58579 10.25 6 10.25H13C13.4142 10.25 13.75 10.5858 13.75 11C13.75 11.4142 13.4142 11.75 13 11.75H6C5.58579 11.75 5.25 11.4142 5.25 11ZM3.25 16C3.25 15.5858 3.58579 15.25 4 15.25H13C13.4142 15.25 13.75 15.5858 13.75 16C13.75 16.4142 13.4142 16.75 13 16.75H4C3.58579 16.75 3.25 16.4142 3.25 16Z\",fill:\"gainsboro\"}),\" \"))}var Ue=({results:a,setIsShowE2eResponse:t,index:s})=>{let[n,o]=N(0);return e(\"div\",{className:\"result-slider-container\"},e(\"div\",{className:\"result-slider-wrapper\",id:a[n].id},e(\"section\",{className:\"container-re\"},e(\"div\",{className:\"container-re--header\"},e(\"span\",{className:\"container-re--header--icon\",onClick:()=>t(!0)},e(we,null)),e(\"div\",{className:\"container--re--header--icon-number\"},\" \",e(ne,null),e(\"span\",null,s+1)),e(\"span\",{className:\"container-re-title\"},\"REQUEST\")),e(\"div\",{style:{maxHeight:\"27rem\",overflowY:\"scroll\"}},e(j,{jsonData:a[n].request}))),e(\"section\",{className:\"container-re container-response\"},e(\"div\",{className:\"container-re--header\"},e(\"span\",{className:\"container-re-title\"},\"RESPONSE\"),e(\"span\",{className:\"e2e-re-timeNumber-request\"},a[n].responseTime,\"ms\")),e(\"div\",{style:{maxHeight:\"27rem\",overflowY:\"scroll\"}},e(j,{jsonData:a[n].response})))),e(\"div\",{className:\"pagination-container\"},\" \",e(Je,{pageCountNumber:a.length,activePage:n,setActivePage:o}),\" \",e(\"div\",{className:\"pagination-u1024\"},\" \",a.map((f,i)=>e(\"span\",{className:\"pagination-u1024--item\",onClick:()=>o(i),\"data-show\":n===i},i+1)))))};function _e(){return e(\"svg\",{fill:\"#fff\",height:\"20px\",width:\"20px\",version:\"1.1\",id:\"Capa_1\",xmlns:\"http://www.w3.org/2000/svg\",viewBox:\"0 0 452.025 452.025\"},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},\" \",e(\"g\",null,\" \",e(\"g\",null,\" \",e(\"path\",{d:\"M362.612,34.125h-55.2l13.6-13.6c4.7-4.7,4.7-12.3,0-17s-12.3-4.7-17,0l-34,34.1c-2.3,2.3-3.5,5.3-3.5,8.5 s1.3,6.2,3.5,8.5l34.1,34.1c2.3,2.3,5.4,3.5,8.5,3.5s6.1-1.2,8.5-3.5c4.7-4.7,4.7-12.3,0-17l-13.6-13.6h55.2c35.9,0,65,29.2,65,65 v40.3c0,6.6,5.4,12,12,12s12-5.4,12-12v-40.3C451.712,74.025,411.712,34.125,362.612,34.125z\"}),\" \",e(\"path\",{d:\"M438.812,230.925h-197.1c-6.6,0-12,5.4-12,12v197.1c0,6.6,5.4,12,12,12h197.1c6.6,0,12-5.4,12-12v-197.1 C450.812,236.225,445.412,230.925,438.812,230.925z M426.812,428.025h-173.1v-173.1h173.1L426.812,428.025L426.812,428.025z\"}),\" \",e(\"path\",{d:\"M147.912,363.325c-4.7-4.7-12.3-4.7-17,0c-4.7,4.7-4.7,12.3,0,17l13.6,13.6h-55.2c-35.9,0-65-29.2-65-65v-40.3 c0-6.6-5.4-12-12-12s-12,5.4-12,12v40.3c0,49.1,39.9,89,89,89h55.2l-13.6,13.6c-4.7,4.7-4.7,12.3,0,17c2.3,2.3,5.4,3.5,8.5,3.5 s6.1-1.2,8.5-3.5l34.1-34.1c4.7-4.7,4.7-12.3,0-17L147.912,363.325z\"}),\" \",e(\"path\",{d:\"M13.212,24.025c3.2,0,6.3-1.3,8.5-3.5s3.5-5.3,3.5-8.5c0-3.1-1.3-6.3-3.5-8.5s-5.3-3.5-8.5-3.5s-6.3,1.3-8.5,3.5 s-3.5,5.3-3.5,8.5s1.3,6.3,3.5,8.5C7.012,22.725,10.012,24.025,13.212,24.025z\"}),\" \",e(\"path\",{d:\"M111.812,24.025c6.6,0,12-5.4,12-12s-5.4-12-12-12s-12,5.4-12,12S105.112,24.025,111.812,24.025z\"}),\" \",e(\"path\",{d:\"M62.512,24.025c6.6,0,12-5.4,12-12s-5.4-12-12-12s-12,5.4-12,12S55.912,24.025,62.512,24.025z\"}),\" \",e(\"path\",{d:\"M161.012,24.025c6.6,0,12-5.4,12-12s-5.4-12-12-12s-12,5.4-12,12S154.412,24.025,161.012,24.025z\"}),\" \",e(\"path\",{d:\"M210.312,0.025c-3.1,0-6.3,1.3-8.5,3.5s-3.5,5.3-3.5,8.5s1.3,6.3,3.5,8.5s5.3,3.5,8.5,3.5s6.3-1.3,8.5-3.5 s3.5-5.3,3.5-8.5s-1.3-6.3-3.5-8.5S213.512,0.025,210.312,0.025z\"}),\" \",e(\"path\",{d:\"M210.312,147.925c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12C222.312,153.225,217.012,147.925,210.312,147.925z\"}),\" \",e(\"path\",{d:\"M210.312,98.625c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12C222.312,103.925,217.012,98.625,210.312,98.625z\"}),\" \",e(\"path\",{d:\"M210.312,49.325c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12C222.312,54.725,217.012,49.325,210.312,49.325z\"}),\" \",e(\"path\",{d:\"M210.312,197.125c-3.2,0-6.3,1.3-8.5,3.5s-3.5,5.3-3.5,8.5c0,3.1,1.3,6.3,3.5,8.5s5.3,3.5,8.5,3.5s6.3-1.3,8.5-3.5 s3.5-5.3,3.5-8.5s-1.3-6.3-3.5-8.5C216.613,198.425,213.512,197.125,210.312,197.125z\"}),\" \",e(\"path\",{d:\"M161.012,221.125c6.6,0,12-5.4,12-12s-5.4-12-12-12s-12,5.4-12,12C149.012,215.825,154.412,221.125,161.012,221.125z\"}),\" \",e(\"path\",{d:\"M111.812,221.125c6.6,0,12-5.4,12-12s-5.4-12-12-12s-12,5.4-12,12C99.812,215.825,105.112,221.125,111.812,221.125z\"}),\" \",e(\"path\",{d:\"M62.512,221.125c6.6,0,12-5.4,12-12s-5.4-12-12-12s-12,5.4-12,12C50.512,215.825,55.912,221.125,62.512,221.125z\"}),\" \",e(\"path\",{d:\"M13.212,221.125c3.2,0,6.3-1.3,8.5-3.5s3.5-5.3,3.5-8.5s-1.3-6.3-3.5-8.5s-5.3-3.5-8.5-3.5s-6.3,1.3-8.5,3.5 s-3.5,5.3-3.5,8.5c0,3.1,1.3,6.3,3.5,8.5C7.012,219.825,10.012,221.125,13.212,221.125z\"}),\" \",e(\"path\",{d:\"M13.212,171.925c6.6,0,12-5.4,12-12s-5.4-12-12-12s-12,5.4-12,12S6.612,171.925,13.212,171.925z\"}),\" \",e(\"path\",{d:\"M13.212,122.625c6.6,0,12-5.4,12-12s-5.4-12-12-12s-12,5.4-12,12C1.212,117.225,6.612,122.625,13.212,122.625z\"}),\" \",e(\"path\",{d:\"M13.212,73.325c6.6,0,12-5.4,12-12s-5.4-12-12-12s-12,5.4-12,12S6.612,73.325,13.212,73.325z\"}),\" \"),\" \"),\" \"))}function Ye({sequence:a,index:t}){let[s,n]=N(!0);return e(\"div\",{id:t.toString(),key:a.id,className:\"container-detail\"},s?e(H,null,e(\"section\",{className:\"sequence-re\"},e(\"div\",{className:\"container-re--header\"},e(\"span\",{className:\"container-re--header--icon\",onClick:()=>n(!1)},e(_e,null)),e(\"div\",{className:\"container--re--header--icon-number\"},\" \",e(ne,null),e(\"span\",null,t+1)),e(\"span\",{className:\"container-re-title\"},\"Body Header\")),e(\"div\",{style:{maxHeight:\"27rem\",overflowY:\"scroll\"}},e(j,{jsonData:JSON.parse(a.bodyHeader)}))),e(\"section\",{className:\"sequence-re sequence-response \"},e(\"div\",{className:\"container-re--header\"},e(\"span\",{className:\"container-re-title\"},\"Description\")),e(\"div\",{className:\"detail-sequence\",style:{maxHeight:\"27rem\",overflowY:\"scroll\"}},e(\"div\",{className:\"detail-sequence--sections\"},e(\"span\",{className:\"sequnce-description-label\"},\"Requests\"),\" \",e(\"span\",{className:\"detail-sequence--sections--first-item\"},\"All Request Count: \",e(\"span\",null,a.repeat),\" \"),e(\"span\",{className:\"e2e-success\"},\"Success:\",e(\"span\",null,\" \",a.success)),e(\"span\",{className:\"e2e-fail\"},\"Fails: \",e(\"span\",null,a.fails)),e(\"span\",null,\"All Request Time: \",e(\"span\",null,a.time,\" ms\")),e(\"span\",null,\"Avrage Time For Each Request:\",\" \",e(\"span\",null,(a.time/a.repeat).toFixed(1),\" ms\"))),e(\"div\",{className:\"detail-sequence--sections\"},e(\"span\",{className:\"sequnce-description-label\"},\"Best\"),\" \",e(\"span\",{className:\"detail-sequence--sections--first-item\"},\"Best Time: \",e(\"span\",null,a.bestTime.time,\" ms\")),e(\"span\",null,\"Request Number: \",e(\"span\",null,a.bestTime.resultIdx))),e(\"div\",{className:\"detail-sequence--sections\"},e(\"span\",{className:\"sequnce-description-label\"},\"Worst\"),e(\"span\",{className:\"detail-sequence--sections--first-item\"},\"Worst Time: \",e(\"span\",null,a.worstTime.time,\" ms\"),\" \"),e(\"span\",null,\" \",\"Request Number: \",e(\"span\",null,a.worstTime.resultIdx))),a.captures.length>0&&e(\"div\",{className:\"detail-sequence--sections\"},e(\"span\",{className:\"sequnce-description-label\"},\"Capture Items\"),\" \",a.captures.map(o=>e(\"ul\",{className:\"detail-sequence--sections--capture-items\"},e(\"li\",null,\"key:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},o.key)),e(\"li\",null,\"value :\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},o.value)),e(\"li\",null,\"model :\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},o.model)),e(\"li\",null,\"act :\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},o.act)),e(\"li\",null,\"sequnce number:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},\" \",o.sequenceIdx))))),a.usedCaptures.length>0&&e(\"div\",{className:\"detail-sequence--sections\"},e(\"span\",{className:\"sequnce-description-label\"},\"Using Capture Items\"),\" \",a.usedCaptures.map(o=>e(\"ul\",{className:\"detail-sequence--sections--capture-items\"},e(\"li\",null,\"key:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},\" \",o.key)),e(\"li\",null,\"captured from:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},\" \",o.captured)),e(\"li\",null,\"value:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},\" \",o.value)),e(\"li\",null,\" \",\"model :\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},\" \",o.model)),e(\"li\",null,\" \",\"act :\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},o.act)),e(\"li\",null,\"sequnce number:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},o.sequenceIdx)))))))):e(Ue,{results:a.results,setIsShowE2eResponse:n,index:t}))}function We({baseUrl:a}){let{e2eForms:t,setE2eForms:s}=B(),n={allReqPerformance:0,numberRequest:0,success:0,fails:0,bestTime:{sequenceIdx:0,resultIdx:0,time:Number.MAX_SAFE_INTEGER,act:\"\",model:\"\"},worstTime:{sequenceIdx:0,resultIdx:0,act:\"\",model:\"\",time:0},sequenceDetail:[],allCaptureItems:[]},[o,f]=N(!1),[i,p]=N(n),l=(u,m)=>{if(!(u===0&&m<=0)){let T=t[u];t.splice(u,1),t.splice(m,0,T),s([...t])}},g=u=>{t[u],t.splice(u,1),s([...t])},F=u=>{let m={...t[u],id:A()};s([...t.slice(0,u),m,...t.slice(u,t.length)])},[b,S]=N(\"e2e\"),C=()=>{let u=`data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(t))}`,m=document.createElement(\"a\");m.href=u,m.download=\"Configdata.json\",m.click()},I=u=>{let m=new FileReader;m.readAsText(u.target.files[0],\"UTF-8\"),m.onload=T=>{let c=JSON.parse(T.target.result);s(c)}},Z=()=>{let u=`data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(i))}`,m=document.createElement(\"a\");m.href=u,m.download=\"data.json\",m.click()},G=async({baseUrl:u,options:m})=>await(await fetch(`${u}lesan`,m)).json(),W=(u,m,T)=>{for(let c in u){typeof u[c]==\"object\"&&W(u[c],m,T);let L=u[c],K=[];if(typeof L==\"string\"&&L.includes(\"{\")){if(L.startsWith(\"{faker\"))K.push(L.slice(1,L.lastIndexOf(\"}\")));else{let V=[];for(let E=0;E<L.length;E++)L[E]===\"{\"&&V.push(E);let k=[];for(let E=0;E<L.length;E++)L[E]===\"}\"&&k.push(E);V.forEach((E,R)=>{K.push(L.slice(E+1,k[R]))})}K.forEach(V=>{if(V.startsWith(\"faker\")){let k=V.split(\".\"),E=k[2],R=null;E.endsWith(\")\")&&(R=E.slice(E.indexOf(\"(\")+1,E.indexOf(\")\")).replaceAll(\"'\",'\"'),E=E.slice(0,E.indexOf(\"(\")));let P=St[k[1]][E](R&&JSON.parse(R));T.push({key:V,value:P}),u[c]=u[c].replace(`{${V}}`,P)}for(let k of m)k.key===V&&(T.push({key:u[c],value:u[c].replace(`{${V}}`,k.value)}),u[c]=u[c].replace(`{${V}}`,k.value));/^-?\\d+$/.test(u[c])&&(u[c]=Number(u[c]))})}}return T},Q=async()=>{let u=new Set;for await(let m of t){let T,c=JSON.parse(m.bodyHeaders).body,L=A();for(let k=0;k<m.repeat;k++){let E=performance.now(),R=JSON.parse(m.bodyHeaders),P=W(R,u,[]),x={method:\"POST\",headers:{\"Content-Type\":\"application/json\",...R.headers},body:JSON.stringify(R.body)},r=(w,d)=>{for(let _ of d)if(_.value===w)return _};T=await G({baseUrl:a,options:x});let v=performance.now()-E,y={id:A(),request:{...x,body:R.body},response:T,responseTime:v};p(w=>{let d=w.sequenceDetail,_=d.findIndex(z=>z.id===L),U=1;return _!==-1?(d[_].results.push(y),U=d[_].results.length,d[_].bestTime=d[_].bestTime.time<v?d[_].bestTime:{resultIdx:U,time:v},d[_].worstTime=d[_].worstTime.time>v?d[_].worstTime:{resultIdx:U,time:v},T.success?d[_].success=d[_].success+1:d[_].fails=d[_].fails+1,d[_].time=d[_].time+v,d[_].repeat=d[_].repeat+1):d.push({id:L,bodyHeader:m.bodyHeaders,time:v,repeat:1,success:T.success?1:0,fails:T.success?0:1,bestTime:{resultIdx:U,time:v},worstTime:{resultIdx:U,time:v},captures:m.captures.map(({key:z,value:ie})=>({key:z,value:ie,sequenceIdx:d.length+1,model:R.body.model,act:R.body.act})),usedCaptures:P.map(({key:z,value:ie})=>{let ee=r(ie,u);return{key:z,value:ie,captured:ee?.captured,sequenceIdx:ee?.sequenceIdx||ee?.sequenceIdx===0?ee?.sequenceIdx+1:void 0,model:ee?.model,act:ee?.act}}),results:[y]}),{allReqPerformance:w.allReqPerformance+v,numberRequest:w.numberRequest+1,success:T.success?w.success+1:w.success,fails:T.success?w.fails:w.fails+1,bestTime:w.bestTime.time<v?w.bestTime:{resultIdx:U,sequenceIdx:d.length,act:R.body.act,model:R.body.model,time:v},worstTime:w.worstTime.time>v?w.worstTime:{resultIdx:U,sequenceIdx:d.length,act:R.body.act,model:R.body.model,time:v},sequenceDetail:d,allCaptureItems:Array.from(u)}})}[...m.captures].filter(k=>k.key&&k.value).map(k=>{let E=k.value.split(\"[\"),R=[];return E.forEach(P=>{let x=P.slice(0,P.indexOf(\"]\"));isNaN(Number(x))||(x=Number(x)),R.push(x)}),R.shift(),{key:k.key,parsedValue:R,value:k.value}}).forEach(k=>{if(k.parsedValue.length>0){let E=T;k.parsedValue.forEach(R=>{E=E[R]}),u.add({key:k.key,value:E,captured:k.value,act:c.act,model:c.model,sequenceIdx:i.sequenceDetail.length-1})}})}},O=(u,m,T)=>{let c=[...t];c[u][m]=T,s([...c])},q=J(),$=u=>q.current.childNodes[u-1].scrollIntoView({behavior:\"smooth\",block:\"start\"});return e(\"div\",{className:\"e2e-container\"},b===\"result\"?e(\"div\",{className:\"e2e-container--sequence-container\"},e(\"div\",{className:\"results-buttons--back-export\"},e(\"button\",{className:\"btn  e2e-back-button\",onClick:()=>{document.getElementById(\"modal\")?.scroll({top:0,behavior:\"smooth\"}),p(n),S(\"e2e\")}},e(fe,null),e(\"span\",null,\"Back\")),e(\"button\",{className:\"btn  e2e-back-button e2e-export_results-button\",onClick:Z},e(X,null),e(\"span\",null,\"Export\"))),e(\"div\",{className:\"e2e-container--sequence-container--information-container\"},e(\"span\",{className:\"information-container-label\"},\"Information\"),e(\"div\",{className:\"information-container--request\"},e(\"span\",{className:\"information-container-label\"},\"Requests\"),\" \",e(\"div\",{className:\"information-container--request--sections\"},e(\"p\",{className:\"information-container--request--sections--item\"},\"All Request Count:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},i.numberRequest),\" \",\"times\"),\" \",e(\"p\",{className:\"information-container--request--sections--item\"},\" \",\"All Request Time:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},i.allReqPerformance),\" \",\"ms\")),e(\"div\",{className:\"information-container--request--sections\"},e(\"p\",{className:\"information-container--request--sections--item\"},\"All \",e(\"span\",{className:\"e2e-success\"},\"Success\"),\" Request:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},i.success,\" \"),\" \",\"times\"),e(\"p\",{className:\"information-container--request--sections--item\"},\"All \",e(\"span\",{className:\"e2e-fail\"},\"Fails\"),\" Request :\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},i.fails,\" \"),\"times\"))),e(\"div\",{className:\"information-container--times\"},e(\"span\",{className:\"information-container-label\"},\"Times\"),\" \",e(\"ul\",{className:\"information-container--times--sections\"},e(\"li\",null,\" \",e(\"span\",{className:\"e2e-best\"},\"Best\"),\" Request Time:\",\" \",e(\"span\",{className:\"e2e-best\"},i.bestTime.time,\" \"),\"ms\",\" \"),e(\"li\",null,\" \",\"Seqeunce Number:\",\" \",e(\"span\",{onClick:()=>{$(i.bestTime.sequenceIdx)},className:\"information-container--request--sections--item--content e2e-sequensce-number\"},i.bestTime.sequenceIdx,\" \")),e(\"li\",null,\" \",\"Request Number:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},i.bestTime.resultIdx),\" \"),e(\"li\",null,\"Model:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},i.bestTime.model,\" \"),\" \"),e(\"li\",null,\"Act:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},i.bestTime.act,\" \"))),e(\"ul\",{className:\"information-container--times--sections\"},e(\"li\",null,\"Worst Request Time:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},i.worstTime.time),\" \",\"ms\",\" \"),e(\"li\",null,\" \",\"Seqeunce Number:\",\" \",e(\"span\",{onClick:()=>{$(i.worstTime.sequenceIdx)},className:\"information-container--request--sections--item--content e2e-sequensce-number\"},i.worstTime.sequenceIdx,\" \")),e(\"li\",null,\" \",\"Request Number:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},i.worstTime.resultIdx,\" \")),e(\"li\",null,\"Model:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},i.worstTime.model)),e(\"li\",null,\"act:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},i.worstTime.act)))),i.allCaptureItems.length>0&&e(\"div\",{className:\"information-container--captures\"},e(\"span\",{className:\"information-container-label\"},\"Captures Information\"),\" \",i.allCaptureItems.map(u=>e(\"ul\",{className:\"information-container--captures--sections\",key:A()},e(\"span\",{className:\"information-container-label\"},u.key),e(\"li\",null,\"Captured From:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},u.captured)),e(\"li\",null,\"Value Of\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},\": \",u.value)),e(\"li\",null,\"Model :\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},u.model)),e(\"li\",null,\"Act :\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},u.act)),e(\"li\",null,\"Captured Inside Sequnce Number:\",\" \",e(\"span\",{className:\"information-container--request--sections--item--content\"},u.sequenceIdx)))))),e(\"div\",{className:\"e2e-sequesnce-wrapper\",ref:q},i.sequenceDetail.map((u,m)=>e(Ye,{sequence:u,index:m})))):b===\"e2e\"?e(H,null,e(\"div\",{className:\"sidebar__section sidebar__section--headers\"},t.map((u,m)=>e(H,{key:u.id},e(\"div\",{className:\"sidebar__input-double\",key:u.id},e(\"div\",{className:\"e2e-move-buttons\"},e(\"div\",{className:\"e2e-move-div\",onClick:()=>F(m)},e(te,null)),t.length>1&&e(H,null,e(\"div\",{className:\"e2e-move-div\",onClick:()=>l(m,m-1)},e(Ce,null)),e(\"div\",{className:\"e2e-move-div\",onClick:()=>l(m,m+1)},e(ge,null)),e(\"div\",{className:\"e2e-move-div e2e-move-close\",onClick:()=>g(m)},e(Y,null)))),e(\"div\",{className:\"sidebar__section-body-heading\"},e(\"div\",{className:\"sidebar__section-heading\"},\"set test body and headers\"),e(\"textarea\",{placeholder:\"please paste a request body here\",value:u.bodyHeaders,name:`${u.id}-body`,rows:18,onChange:T=>O(m,\"bodyHeaders\",T.target.value)})),e(\"div\",{className:\"sidebar__section-capture\"},e(\"div\",{className:\"e2e_sidebar__section-heading\"},\"set repeat time\"),e(\"div\",{className:\"repeat__number\"},e(\"input\",{className:\"input\",min:1,placeholder:\"set repeat number\",value:u.repeat,name:`${u.id}-repeat`,type:\"number\",onChange:T=>O(m,\"repeat\",Math.abs(T.target.value))}),e(\"button\",{className:\"e2e-back-button e2e-export_results-button\",onClick:()=>O(m,\"repeat\",t[m].repeat+1)},\"+\"),e(\"button\",{className:\"e2e-back-button e2e-export_results-button\",onClick:()=>O(m,\"repeat\",t[m].repeat>2?t[m].repeat-1:1)},\"-\")),e(\"div\",{className:\"e2e_sidebar__section-heading\"},\"capture variables\"),e(\"button\",{className:\"btn btn--add e2e-back-button e2e-export_results-button e2e-add-capture \",onClick:()=>O(m,\"captures\",[...t[m].captures,{key:\"\",value:\"\"}])},\"add capture\"),u.captures.map((T,c)=>e(H,{key:`${u.id}-${c}`},e(\"div\",{className:\"sidebar__section-add-capture\",style:{position:\"relative\"}},e(\"span\",{className:\"section-add-capture__delete-button\",onClick:()=>O(m,\"captures\",[...t[m].captures.slice(0,c),...t[m].captures.slice(c+1,t[m].captures.length)]),style:{position:\"absolute\",zIndex:\"2\"}},e(Y,null)),e(\"input\",{className:\"input\",placeholder:\"set a variable name\",value:T.key,onChange:L=>O(m,\"captures\",[...t[m].captures.slice(0,c),{key:L.target.value,value:t[m].captures[c].value},...t[m].captures.slice(c+1,t[m].captures.length)])}),e(\"input\",{className:\"input\",placeholder:\"set a value for variable\",value:T.value,onChange:L=>O(m,\"captures\",[...t[m].captures.slice(0,c),{key:t[m].captures[c].key,value:L.target.value},...t[m].captures.slice(c+1,t[m].captures.length)])}))))))))),e(\"button\",{className:\"btn btn-show-results-buttons \",onClick:()=>f(!o)},\"show btn\"),e(\"div\",{className:\"results-buttons\",\"data-show\":o===!0},e(\"button\",{className:\"btn btn-e2e-action e2e-back-button e2e-export_results-button\",onClick:()=>{s([...t,me()])}},e(te,null),e(\"span\",null,\"Add\")),e(\"button\",{className:\"btn btn-e2e-action e2e-back-button e2e-run-botton e2e-export_results-button\",onClick:async()=>{S(\"result\"),await Q()}},e(ye,null),e(\"span\",null,\"Run E2E Test\")),e(\"input\",{id:\"actual-btn\",type:\"file\",onChange:I,hidden:!0}),e(\"label\",{htmlFor:\"actual-btn\",className:\"btn btn-e2e-action e2e-back-button e2e-export_results-button\"},e(be,null),e(\"span\",null,\"Import\")),e(\"button\",{className:\"btn btn-e2e-action e2e-back-button e2e-export_results-button\",onClick:C},e(X,null),e(\"span\",null,\"Export\")),e(\"a\",{href:\"https://miaadteam.github.io/lesan/playground.html\",target:\"_blank\",className:\"btn btn-e2e-action e2e-back-button e2e-export_results-button\"},e(ae,null),e(\"span\",null,\"Help\")))):\"\")}function Ke(a){let t=Math.floor(a/36e5),s=Math.floor(a%36e5/6e4),n=Math.floor(a%36e4%6e4/1e3);return t>0?`${t}h ${s}m ${n}s`:s>0?`${s}m ${n}s`:n>0?`${n}s`:`${a}ms`}var Xe=(a,t)=>{let s=J(!0);h(()=>{let n=()=>{};if(s.current?s.current=!1:n=a(),n&&typeof n==\"function\")return n},t)};function ke(){return e(\"svg\",{id:\"Layer_1\",\"data-name\":\"Layer 1\",xmlns:\"http://www.w3.org/2000/svg\",viewBox:\"0 0 105.7 122.88\",width:20},e(\"path\",{fill:\"white\",d:\"M30.46,14.57V5.22A5.18,5.18,0,0,1,32,1.55v0A5.19,5.19,0,0,1,35.68,0H70a5.22,5.22,0,0,1,3.67,1.53l0,0a5.22,5.22,0,0,1,1.53,3.67v9.35h27.08a3.36,3.36,0,0,1,3.38,3.37V29.58A3.38,3.38,0,0,1,102.32,33H98.51l-8.3,87.22a3,3,0,0,1-2.95,2.69H18.43a3,3,0,0,1-3-2.95L7.19,33H3.37A3.38,3.38,0,0,1,0,29.58V17.94a3.36,3.36,0,0,1,3.37-3.37Zm36.27,0V8.51H39v6.06ZM49.48,49.25a3.4,3.4,0,0,1,6.8,0v51.81a3.4,3.4,0,1,1-6.8,0V49.25ZM69.59,49a3.4,3.4,0,1,1,6.78.42L73,101.27a3.4,3.4,0,0,1-6.78-.43L69.59,49Zm-40.26.42A3.39,3.39,0,1,1,36.1,49l3.41,51.8a3.39,3.39,0,1,1-6.77.43L29.33,49.46ZM92.51,33.38H13.19l7.94,83.55H84.56l8-83.55Z\"}))}function Qe({setFormFromHistory:a}){let{history:t,setHistory:s,deleteItemHistory:n}=B(),[o,f]=N(\"\");return Xe(()=>{localStorage.setItem(\"localHistory\",JSON.stringify(t))},[t]),e(H,null,t&&t?.length>0?e(\"div\",null,e(\"br\",null),t.map((i,p)=>e(\"div\",{className:\"container-detail\",id:i.id},e(\"section\",{className:\"container-re\"},e(\"div\",{style:{position:\"relative\",borderBottom:\"1px solid gainsboro\"}},e(\"span\",{className:\"container-re-title\"},\"REQUEST\"),e(\"span\",{className:\"history-re-detail-date\"},i.reqDate)),e(\"div\",{className:\"container-re-detail\"},e(\"div\",{className:\"container-re-detail-title\"},\" \",e(j,{jsonData:i.request.body.model}),e(\"span\",null,\"|\"),e(\"div\",null,e(j,{jsonData:i.request.body.act}))),o===i.id?e(\"button\",{onClick:()=>f(\"\"),className:\"history-re-detail-button\"},\"Hide\",e(\"span\",{className:\"history-re-detail-button-icon\"},\"\\u2013\")):e(\"button\",{onClick:()=>{f(i.id),document.getElementById(i.id)?.scrollIntoView()},className:\"history-re-detail-button\"},\"Show\",\" \",e(\"span\",{className:\"history-re-detail-button-icon\"},\"+\"))),e(\"div\",{className:\"history-re-detail-complete\",\"data-show\":o===i.id},\" \",e(j,{jsonData:i.request}))),e(\"section\",{className:\"container-re container-response\"},e(\"div\",{className:\"history-re-title_delete\",style:{position:\"relative\",borderBottom:\"1px solid gainsboro\"}},e(\"span\",{className:\"history-re-delete\",onClick:l=>{l.stopPropagation(),n(p)}},e(Y,null)),e(\"span\",{className:\"container-re-title history-response-title\"},\"RESPONSE\"),e(\"span\",{className:\"history-re-detail-date history-response-took\"},Ke(i.response.tookTime))),e(\"div\",{className:\"container-re-detail\"},e(\"div\",{className:\"history-re-detail-title\"},e(\"div\",{className:\"history-re-response-title\"},\" \",e(\"span\",{className:\"history-re-response-title-status\"},\"success:\"),e(\"div\",{className:\"history-re-response-info\"},e(j,{jsonData:i.response.success})))),e(\"button\",{onClick:()=>a(i.request),className:\"history-re-detail-button\"},\"Use\",\" \",e(\"span\",{className:\"history-re-detail-button-icon\"},\"\\u279C\",\" \"))),e(\"div\",{className:\"history-re-detail-complete\",\"data-show\":o===i.id},\" \",e(j,{jsonData:i.response})))))):e(\"span\",{className:\"no-history\"},'\"There is no history to display\"'),t&&t.length>0?e(\"div\",{className:\"clear-history\"},e(\"button\",{className:\"btn clear-history-button tooltip\",onClick:()=>{confirm(\"Clear All History?\")==!0&&s([])}},e(ke,null),e(\"span\",{className:\"tooltip-text\"},\"Clear History\"))):\"\")}function xe(){return e(\"svg\",{width:\"25px\",viewBox:\"0 0 26 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},\" \",e(\"path\",{d:\"M4 6V19C4 20.6569 5.34315 22 7 22H17C18.6569 22 20 20.6569 20 19V9C20 7.34315 18.6569 6 17 6H4ZM4 6V5\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\"}),\" \",e(\"path\",{d:\"M18 6.00002V6.75002H18.75V6.00002H18ZM15.7172 2.32614L15.6111 1.58368L15.7172 2.32614ZM4.91959 3.86865L4.81353 3.12619H4.81353L4.91959 3.86865ZM5.07107 6.75002H18V5.25002H5.07107V6.75002ZM18.75 6.00002V4.30604H17.25V6.00002H18.75ZM15.6111 1.58368L4.81353 3.12619L5.02566 4.61111L15.8232 3.0686L15.6111 1.58368ZM4.81353 3.12619C3.91638 3.25435 3.25 4.0227 3.25 4.92895H4.75C4.75 4.76917 4.86749 4.63371 5.02566 4.61111L4.81353 3.12619ZM18.75 4.30604C18.75 2.63253 17.2678 1.34701 15.6111 1.58368L15.8232 3.0686C16.5763 2.96103 17.25 3.54535 17.25 4.30604H18.75ZM5.07107 5.25002C4.89375 5.25002 4.75 5.10627 4.75 4.92895H3.25C3.25 5.9347 4.06532 6.75002 5.07107 6.75002V5.25002Z\",fill:\"lightcoral\"}),\" \",e(\"path\",{opacity:\"0.5\",d:\"M8 12H16\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\"}),\" \",e(\"path\",{opacity:\"0.5\",d:\"M8 15.5H13.5\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\"}),\" \"))}function Re(){return e(\"svg\",{width:\"25px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{\"fill-rule\":\"evenodd\",opacity:\"0.5\",\"clip-rule\":\"evenodd\",d:\"M5.07868 5.06891C8.87402 1.27893 15.0437 1.31923 18.8622 5.13778C22.6824 8.95797 22.7211 15.1313 18.9262 18.9262C15.1312 22.7211 8.95793 22.6824 5.13774 18.8622C2.87389 16.5984 1.93904 13.5099 2.34047 10.5812C2.39672 10.1708 2.775 9.88377 3.18537 9.94002C3.59575 9.99627 3.88282 10.3745 3.82658 10.7849C3.4866 13.2652 4.27782 15.881 6.1984 17.8016C9.44288 21.0461 14.6664 21.0646 17.8655 17.8655C21.0646 14.6664 21.046 9.44292 17.8015 6.19844C14.5587 2.95561 9.33889 2.93539 6.13935 6.12957L6.88705 6.13333C7.30126 6.13541 7.63535 6.47288 7.63327 6.88709C7.63119 7.3013 7.29372 7.63539 6.87951 7.63331L4.33396 7.62052C3.92269 7.61845 3.58981 7.28556 3.58774 6.8743L3.57495 4.32874C3.57286 3.91454 3.90696 3.57707 4.32117 3.57498C4.73538 3.5729 5.07285 3.907 5.07493 4.32121L5.07868 5.06891Z\",fill:\"lightcoral\"}),e(\"path\",{d:\"M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.5429 12.6036C11.3554 12.416 11.25 12.1617 11.25 11.8964V8C11.25 7.58579 11.5858 7.25 12 7.25Z\",fill:\"lightcoral\"}))}function Me(){return e(\"svg\",{height:\"25px\",width:\"25px\",version:\"1.1\",id:\"Layer_1\",xmlns:\"http://www.w3.org/2000/svg\",viewBox:\"0 0 512 512\",fill:\"#000000\"},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},\" \",e(\"circle\",{opacity:.34,style:\"fill:lightcoral;\",cx:\"256.602\",cy:\"226.267\",r:\"171.059\"}),\" \",e(\"path\",{style:\"fill:lightcoral\",d:\"M482.195,226.196C482.195,101.471,380.725,0,256.001,0S29.804,101.471,29.804,226.196 c0,7.409,6.007,13.416,13.416,13.416s13.416-6.008,13.416-13.416c0-109.93,89.434-199.363,199.363-199.363 s199.363,89.434,199.363,199.363c0,109.928-89.434,199.362-199.363,199.362h-23.276l33.282-37.255 c4.937-5.525,4.458-14.007-1.067-18.944c-5.525-4.937-14.008-4.457-18.944,1.068l-47.576,53.255c-7.788,8.718-7.788,21.866,0,30.584 l47.576,53.255c2.651,2.968,6.322,4.478,10.01,4.478c3.181,0,6.375-1.126,8.934-3.41c5.526-4.937,6.004-13.419,1.067-18.944 l-33.282-37.255h23.276C380.725,452.39,482.195,350.919,482.195,226.196z\"}),\" \"))}function Ie(){return e(\"svg\",{fill:\"lightcoral\",height:\"25px\",width:\"25px\",viewBox:\"0 0 436.668 436.668\"},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},\" \",e(\"g\",null,\" \",e(\"path\",{opacity:.34,d:\"M203.334,85.818v59.141c4.884-0.8,9.893-1.223,15-1.223s10.116,0.423,15,1.223V85.818c14.657-5.935,25-20.296,25-37.081 c0-22.092-17.909-40-40-40s-40,17.908-40,40C178.334,65.522,188.677,79.883,203.334,85.818z\"}),\" \",e(\"path\",{opacity:.34,d:\"M70.642,204.021l56.242,18.274c1.539-10.139,4.732-19.74,9.292-28.525L79.912,175.49 c-1.115-15.774-11.577-30.049-27.541-35.236c-21.01-6.827-43.576,4.672-50.403,25.682c-6.827,21.01,4.672,43.576,25.682,50.403 C43.614,221.525,60.468,216.126,70.642,204.021z\"}),\" \",e(\"path\",{opacity:.34,d:\"M152.577,301.224l-34.792,47.887c-15.346-3.813-32.156,1.725-42.022,15.305c-12.985,17.872-9.023,42.887,8.849,55.872 s42.887,9.023,55.872-8.849c9.866-13.579,9.939-31.277,1.571-44.694l34.772-47.86C167.8,314.333,159.616,308.347,152.577,301.224z\"}),\" \",e(\"path\",{opacity:.34,d:\"M318.883,349.112l-34.792-47.887c-7.039,7.122-15.223,13.109-24.25,17.661l34.772,47.86 c-8.369,13.417-8.296,31.115,1.571,44.694c12.985,17.872,38,21.834,55.872,8.849s21.834-38,8.849-55.872 C351.038,350.837,334.229,345.298,318.883,349.112z\"}),\" \",e(\"path\",{opacity:.34,d:\"M434.699,165.936c-6.827-21.01-29.393-32.508-50.403-25.682c-15.964,5.187-26.426,19.462-27.541,35.236l-56.263,18.281 c4.559,8.784,7.752,18.386,9.292,28.525l56.242-18.274c10.174,12.105,27.028,17.504,42.992,12.318 C430.028,209.512,441.526,186.946,434.699,165.936z\"}),\" \",e(\"path\",{d:\"M280.834,236.237c0-34.462-28.037-62.5-62.5-62.5s-62.5,28.038-62.5,62.5s28.037,62.5,62.5,62.5 S280.834,270.7,280.834,236.237z\"}),\" \"),\" \"))}function De(){return e(\"svg\",{width:\"25px\",height:25,viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M3 9.10986V14.8799C3 16.9999 3 16.9999 5 18.3499L10.5 21.5299C11.33 22.0099 12.68 22.0099 13.5 21.5299L19 18.3499C21 16.9999 21 16.9999 21 14.8899V9.10986C21 6.99986 21 6.99986 19 5.64986L13.5 2.46986C12.68 1.98986 11.33 1.98986 10.5 2.46986L5 5.64986C3 6.99986 3 6.99986 3 9.10986Z\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\",opacity:.34}),e(\"path\",{d:\"M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}))}function Le(){return e(\"svg\",{width:\"25px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{opacity:.5,d:\"M9.74872 2.49415L18.1594 7.31987M9.74872 2.49415L2.65093 14.7455C1.31093 17.0584 2.10615 20.0159 4.42709 21.3513C6.74803 22.6867 9.7158 21.8942 11.0558 19.5813L12.5511 17.0003L14.1886 14.1738L15.902 11.2163L18.1594 7.31987M9.74872 2.49415L8.91283 2M18.1594 7.31987L19 7.80374\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\"}),e(\"path\",{d:\"M15.9021 11.2164L13.3441 9.74463M14.1887 14.1739L9.98577 11.7557M12.5512 17.0004L9.93848 15.4972\",stroke:\"lightcpral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\"}),e(\"path\",{d:\"M22 14.9166C22 16.0672 21.1046 16.9999 20 16.9999C18.8954 16.9999 18 16.0672 18 14.9166C18 14.1967 18.783 13.2358 19.3691 12.6174C19.7161 12.2512 20.2839 12.2512 20.6309 12.6174C21.217 13.2358 22 14.1967 22 14.9166Z\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\"}))}function de(){return e(\"svg\",{width:\"28px\",fill:\"white\",viewBox:\"0 0 32 32\",style:\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\",version:\"1.1\"},e(\"path\",{d:\"M9.101,7l8.899,0c1.857,-0 3.637,0.737 4.95,2.05c1.313,1.313 2.05,3.093 2.05,4.95l0,8.899c0.953,-0.195 1.837,-0.665 2.536,-1.363c0.937,-0.938 1.464,-2.21 1.464,-3.536c0,-2.977 0,-7.023 0,-10c0,-1.326 -0.527,-2.598 -1.464,-3.536c-0.938,-0.937 -2.21,-1.464 -3.536,-1.464c-2.977,0 -7.023,0 -10,0c-1.326,-0 -2.598,0.527 -3.536,1.464c-0.698,0.699 -1.168,1.583 -1.363,2.536Z\"}),e(\"path\",{d:\"M23,14c0,-1.326 -0.527,-2.598 -1.464,-3.536c-0.938,-0.937 -2.21,-1.464 -3.536,-1.464c-2.977,0 -7.023,0 -10,0c-1.326,-0 -2.598,0.527 -3.536,1.464c-0.937,0.938 -1.464,2.21 -1.464,3.536c0,2.977 0,7.023 0,10c-0,1.326 0.527,2.598 1.464,3.536c0.938,0.937 2.21,1.464 3.536,1.464c2.977,-0 7.023,-0 10,-0c1.326,0 2.598,-0.527 3.536,-1.464c0.937,-0.938 1.464,-2.21 1.464,-3.536l0,-10Zm-15,10l10,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-10,0c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1Zm0,-4l10,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-10,0c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1Zm0,-4l10,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-10,0c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1Z\"}),e(\"g\",{id:\"Icon\"}))}function Fe(){return e(\"svg\",{width:25,height:25,fill:\"#ffffff\",version:\"1.1\",id:\"Capa_1\",xmlns:\"http://www.w3.org/2000/svg\",viewBox:\"0 0 104.778 104.778\"},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},\" \",e(\"g\",null,\" \",e(\"path\",{d:\"M96.832,88.406l-23.02-39.908V21.959c4.385-1.595,7.447-5.797,7.447-10.618C81.26,5.089,76.176,0,69.928,0H42.6 c-6.251,0-11.334,5.089-11.334,11.341c0,4.815,3.07,9.017,7.457,10.618v26.55l-2.083,3.685V30.359c0-1.546-1.257-2.802-2.803-2.802 H8.723c-1.546,0-2.801,1.256-2.801,2.802v59.557c0,7.475,5.742,13.614,13.174,14.648c0.331,0.126,0.683,0.214,1.059,0.214h67.227 c4.79,0,8.433-1.762,10.282-4.979C99.503,96.598,99.208,92.543,96.832,88.406z M11.513,89.916v-6.079h8.254 c1.546,0,2.802-1.26,2.802-2.802c0-1.549-1.256-2.802-2.802-2.802h-8.254v-9.09h8.254c1.546,0,2.802-1.263,2.802-2.801 c0-1.555-1.256-2.802-2.802-2.802h-8.254v-9.097h8.254c1.546,0,2.802-1.256,2.802-2.801c0-1.55-1.256-2.803-2.802-2.803h-8.254 V33.149h19.512v56.767c0,5.095-4.375,9.248-9.756,9.248C15.883,99.17,11.513,95.011,11.513,89.916z M92.794,96.997 c-0.799,1.379-2.779,2.178-5.432,2.178H33.189c2.118-2.55,3.439-5.734,3.439-9.259V63.19c0.245-0.207,0.476-0.443,0.645-0.743 l6.679-11.82c0.236-0.422,0.364-0.898,0.364-1.379V19.776c0-1.415-1.048-2.603-2.449-2.78c-2.859-0.364-5.015-2.796-5.015-5.655 c0-3.161,2.571-5.738,5.731-5.738H69.91c3.165,0,5.734,2.577,5.734,5.738c0,2.859-2.155,5.286-5.017,5.655 c-1.401,0.178-2.446,1.365-2.446,2.78v29.472c0,0.493,0.122,0.977,0.374,1.401l23.396,40.559 C93.292,93.506,93.593,95.617,92.794,96.997z M76.466,79.53c0,5.412-4.377,9.794-9.801,9.794c-5.411,0-9.795-4.382-9.795-9.794 c0-5.406,4.384-9.795,9.795-9.795C72.089,69.735,76.466,74.124,76.466,79.53z M54.609,68.877c0,2.665-2.146,4.799-4.802,4.799 c-2.657,0-4.802-2.156-4.802-4.799c0-2.644,2.15-4.8,4.802-4.8C52.468,64.077,54.609,66.233,54.609,68.877z M58.195,58.048 c-1.672,0-3.015-1.341-3.015-3.01c0-1.667,1.343-3.009,3.015-3.009c1.663,0,3.015,1.343,3.015,3.009 C61.21,56.707,59.853,58.048,58.195,58.048z M49.534,86.315c0,1.669-1.352,3.009-3.016,3.009c-1.665,0-3.014-1.34-3.014-3.009 c0-1.663,1.349-3.016,3.014-3.016C48.182,83.3,49.534,84.652,49.534,86.315z M54.805,46.184c-2.185,0-3.956-1.771-3.956-3.957 c0-2.186,1.771-3.957,3.956-3.957c2.183,0,3.957,1.771,3.957,3.957C58.762,44.414,56.983,46.184,54.805,46.184z\"}),\" \"),\" \"))}function Oe(){return e(\"svg\",{version:\"1.1\",viewBox:\"0 0 29.756 29.756\",style:\"enable-background:new 0 0 29.756 29.756;\"},e(\"path\",{d:\"M29.049,5.009L28.19,4.151c-0.943-0.945-2.488-0.945-3.434,0L10.172,18.737l-5.175-5.173   c-0.943-0.944-2.489-0.944-3.432,0.001l-0.858,0.857c-0.943,0.944-0.943,2.489,0,3.433l7.744,7.752   c0.944,0.943,2.489,0.943,3.433,0L29.049,8.442C29.991,7.498,29.991,5.953,29.049,5.009z\"}))}function se(a){let t=J(null);return h(()=>{let s=n=>{t.current&&!t.current.contains(n?.target)&&a()};return document.addEventListener(\"click\",s),()=>{document.removeEventListener(\"click\",s)}},[t]),t}function oe({className:a=\"\"}){return e(\"svg\",{width:25,height:25,viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\",className:a},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},\" \",e(\"path\",{d:\"M6 9L12 15L18 9M12 9H12.01\",stroke:\"lightcoral\",\"stroke-width\":\"2\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),\" \"))}function re({items:a,onClickItem:t,incomeActiveItem:s,canShow:n}){let[o,f]=N(!1),[i,p]=N(\"\");h(()=>{p(s||\"\")},[s]);let g=se(()=>{f(!1)});return e(\"div\",null,e(\"div\",{className:\"select\",disabled:n},e(\"div\",{className:`select--empty ${o===!0?\"active-select--empty\":\"\"}`,ref:g,onClick:()=>f(!o)},e(\"div\",{className:\"select--empty--left-side\"},\" \",e(\"span\",{className:`${i?\"select-empty--left-side--clear\":\"select-empty--left-side--clear--inactive\"}`,onClick:F=>{p(\"\"),t(\"\"),f(!1),F.stopPropagation()}},\"x\"),e(\"span\",null,i)),e(oe,null)),o&&e(\"div\",{className:\"select--sub-buttons\",\"data-show\":o},a?.map((F,b)=>e(\"div\",{className:`option ${F===i?\"active-option\":\"\"}`,onClick:()=>{p(F),t(F),f(!1)}},F)))))}var Tt=({options:a,onChange:t})=>{let[s,n]=N([]),[o,f]=N(a),[i,p]=N(!1),l=S=>{if(s.includes(S)){let C=s.filter(I=>I.value!==S.value);n(C),f([...o,S]),t(C)}else{let C=o.filter(I=>I.value!==S.value);n([...s,S]),f(C),t([...s,S])}},g=()=>{n([]),t([]),f(a)},F=()=>{p(!i)},b=se(()=>{p(!1)});return e(\"div\",{ref:b,className:\"multi-select__wrapper\"},e(\"div\",{className:\"multi-select__field\",onClick:F},e(\"div\",{className:\"multi-select__selected-item-wrapper\"},s.map(S=>e(\"div\",{className:\"multi-select__selected-item\",key:S},e(\"div\",{className:\"multi-select__selected-item-text\"},S.label),e(\"div\",{className:\"multi-select__selected-item-btn\",role:\"button\",onClick:C=>{C.stopPropagation(),l(S)}},\"x\")))),e(\"div\",{className:\"multi-select__icons-wrapper\"},s.length?e(\"div\",{className:\"multi-select__close-icon-wrapper\",role:\"button\",onClick:S=>{S.stopPropagation(),g()}},e(\"span\",{className:\"multi-select__close-icon\"},\"x\")):null,e(\"div\",{className:\"multi-select__arrow-icon-wrapper\",role:\"button\"},e(oe,{className:\"multi-select__arrow-icon\"})))),i?e(\"div\",{className:\"multi-select__options\"},o.length?o.map(S=>e(\"div\",{key:S.value,onClick:C=>{C.stopPropagation(),l(S)},className:\"multi-select__option\"},e(\"div\",{className:\"multi-select__option-label\"},S.label))):e(\"div\",{className:\"multi-select__option--no-option\"},\"No Options!\")):null)},et=Tt;var Et=({baseUrl:a,options:t})=>fetch(`${a}lesan`,t).then(s=>s.json()),tt=({urlAddress:a})=>{let{activeTab:t,tabsData:s,actsObj:n,headers:o,history:f,setService:i,setSchema:p,setAct:l,setPostFields:g,setGetFields:F,setFormData:b,setHistory:S,setResponse:C,resetGetFields:I,resetPostFields:Z,addE2eForm:G,setModal:W}=B(),[Q,O]=N(!1),q=(r,v,M,y)=>{for(let w in M)M[w].type===\"enums\"?y[`${v}.${w}`]=r:q(r,`${v}.${w}`,M[w].schema,y);return y},$=J(null),u=r=>{let{name:v,value:M,type:y,alt:w}=r.target,d;y===\"number\"?d=Number(M):w===\"array\"||w===\"boolean\"?d=JSON.parse(M):d=M,b({data:{...s[t].formData,[v]:d},index:t})},m=({key:r,field:v,isMultiEnum:M=!1,formData:y})=>v.type===\"array\"?m({key:r,formData:y,field:v.schema,isMultiEnum:!0}):v.type===\"enums\"&&M?e(et,{options:Object.keys(v.schema).map(w=>({label:w,value:v.schema[w]})),onChange:w=>{let d=w.map(_=>_.value);b({data:{...y,[`set.${r}`]:d},index:t}),localStorage.setItem(\"localTabsData\",JSON.stringify(s))}}):v.type===\"enums\"?e(re,{onClickItem:w=>{b({data:{...y,[`set.${r}`]:w},index:t}),localStorage.setItem(\"localTabsData\",JSON.stringify(s))},incomeActiveItem:y[`set.${r}`],items:Object.keys(v.schema)}):e(\"input\",{className:\"input\",placeholder:r,id:r,value:y[`set.${r}`],name:`set.${r}`,type:v.type===\"number\"?\"number\":\"string\",alt:M?\"array\":v.type,onChange:u}),T=({getField:r,keyName:v,margin:M})=>e(\"div\",{style:{marginLeft:`${M+1}px`},className:\"sidebar__section_container\",key:`${t}.${v}`},e(\"div\",{className:\"sidebar__section-heading--subfields\"},v),Object.keys(r.schema).map((y,w)=>r.schema[y].type===\"enums\"?e(\"div\",{className:\"input-cnt get-items\",key:`${t}.${y}-${w}`},e(\"label\",{htmlFor:y},v,\".\",y,\":\"),e(\"div\",{className:\"get-values\"},e(\"span\",{onClick:()=>{let d={...s[t].formData};delete d[`get.${v}.${y}`],b({data:d,index:t})}}),e(\"span\",{className:s[t].formData[`get.${v}.${y}`]===0?\"active\":\"\",onClick:()=>{b({index:t,data:{...s[t].formData,[`get.${v}.${y}`]:0}})}},\"0\"),e(\"span\",{className:s[t].formData[`get.${v}.${y}`]===1?\"active\":\"\",onClick:()=>{b({data:{...s[t].formData,[`get.${v}.${y}`]:1},index:t})}},\"1\"))):T({getField:r.schema[y],keyName:`${v}.${y}`,margin:M+1}))),c=()=>{let r=ce(s[t].formData);return{body:{method:\"POST\",headers:{\"Content-Type\":\"application/json\",...o},body:JSON.stringify({service:s[t].service,model:s[t].schema,act:s[t].act,details:r})}}},L=async r=>{r.preventDefault();let v=new Date().toLocaleDateString();O(!0),setTimeout(()=>{O(!1)},450);let M=performance.now(),y=await Et({baseUrl:a,options:c().body}),d=(performance.now()-M).toFixed(1);C({data:{...y,tookTime:d},index:t});let _=[{request:{...c().body,body:JSON.parse(c().body.body)},response:{...y,tookTime:d},id:A(),reqDate:v},...f];S(_),localStorage.setItem(\"localHistory\",JSON.stringify(_)),localStorage.setItem(\"localTabsData\",JSON.stringify(s))},K=s[t].service&&s[t].schema&&s[t].postFields&&s[t].getFields&&s[t].act,V=s[t].service,k=s[t].service&&s[t].schema,E=()=>{let r=JSON.stringify(s[t].response);navigator.clipboard.writeText(r)},R=()=>{let r=c();r.body.body=JSON.parse(r.body.body),navigator.clipboard.writeText(JSON.stringify(r))},P=()=>{let r=c();r.body.body=JSON.parse(r.body.body);let{method:v,...M}=r.body,y={id:A(),bodyHeaders:JSON.stringify({...M},null,2),repeat:1,captures:[]};G(y),W(\"E2E TEST\")},x=(r,v)=>{if(v===\"service\"&&(i({data:r,index:t}),p({data:\"\",index:t})),v===\"method\"&&p({data:\"\",index:t}),v===\"schema\"&&p({data:r,index:t}),l({data:\"\",index:t}),I(t),Z(t),v===\"action\"){let M=n[s[t].service][s[t].schema][r].validator.schema;$&&$.current&&$.current.reset(),l({data:r,index:t}),F({data:M.get.schema,index:t}),g({data:M.set.schema,index:t})}b({data:{},index:t}),localStorage.setItem(\"localTabsData\",JSON.stringify(s))};return e(H,null,e(\"div\",{className:\"sidebar\"},e(\"div\",{className:\"sidebar__sections-wrapper\"},e(\"div\",{className:\"sidebar__section sidebar__section--services\"},e(\"div\",{className:\"sidebar__section-heading\"},\"select services\"),e(re,{onClickItem:r=>x(r,\"service\"),items:Object.keys(n),incomeActiveItem:s[t].service?s[t].service:null})),e(\"div\",{className:\"sidebar__section sidebar__section--schema\"},e(\"div\",{onClick:()=>{},className:\"sidebar__section-heading\"},\"select schema\"),e(re,{canShow:!V,onClickItem:r=>x(r,\"schema\"),items:V?Object.keys(n[s[t].service]):[],incomeActiveItem:s[t].schema?s[t].schema:null})),e(\"div\",{className:\"sidebar__section sidebar__section--act\"},e(\"div\",{className:\"sidebar__section-heading\"},\"select action\"),e(re,{canShow:!k,onClickItem:r=>x(r,\"action\"),items:k?Object.keys(n[s[t].service][s[t].schema]):[],incomeActiveItem:s[t].act?s[t].act:null})))),K&&e(\"div\",{className:\"sidebar sidebar--fields\"},e(\"form\",{ref:$,onSubmit:L,className:\"form--fields\"},e(\"div\",{className:\"sidebar__section-heading sidebar__section-heading--fields\"},\"SET fields\"),Object.keys(s[t].postFields).map(r=>e(\"div\",{className:\"input-cnt\",key:`${t}.${r}-----`},e(\"label\",{htmlFor:r},r,\" :\"),m({key:r,field:s[t].postFields[r],formData:s[t].formData}))),e(\"div\",{className:\"sidebar__section-heading sidebar__section-heading--fields\"},\"GET fields\"),e(\"div\",{className:\"input-cnt get-items border-bottom\"},e(\"label\",null,\"All Items :\"),e(\"div\",{className:\"get-values\"},e(\"span\",{onClick:()=>{let r=q(null,\"get\",s[t].getFields,{});b({data:{...s[t].formData,...r},index:t})}}),e(\"span\",{onClick:()=>{let r=q(0,\"get\",s[t].getFields,{});b({data:{...s[t].formData,...r},index:t})}},\"0\"),e(\"span\",{onClick:()=>{let r=q(1,\"get\",s[t].getFields,{});b({data:{...s[t].formData,...r},index:t})}},\"1\"))),Object.keys(s[t].getFields).map(r=>s[t].getFields[r].type===\"enums\"?e(\"div\",{className:\"input-cnt get-items\",key:`${t}.${r}-------`},e(\"label\",{htmlFor:r},r,\":\"),e(\"div\",{className:\"get-values\"},e(\"span\",{onClick:()=>{b({data:{...s[t].formData,[`get.${r}`]:null},index:t})}}),e(\"span\",{className:s[t].formData[`get.${r}`]===0?\"active\":\"\",onClick:()=>{b({data:{...s[t].formData,[`get.${r}`]:0},index:t})}},\"0\"),e(\"span\",{className:s[t].formData[`get.${r}`]===1?\"active\":\"\",onClick:()=>{b({data:{...s[t].formData,[`get.${r}`]:1},index:t})}},\"1\"))):T({getField:s[t].getFields[r],keyName:r,margin:0})),e(\"div\",{class:\"wrapper\"},e(\"button\",{class:\"send-button\",\"data-active\":Q},e(\"span\",null,\"Send\"),e(\"div\",{class:\"successe\"},e(Oe,null)))))),e(\"div\",{className:\"response\"},s[t].response&&e(\"div\",{class:\"response-detail\"},e(\"div\",{className:\"response-detail-button_title\"},e(\"p\",{className:\"response-detail-title\"},\"Response\"),e(\"div\",{className:\"response-detail-buttons\"},e(\"div\",{className:\"btn response-detail-button \",onClick:()=>R()},e(de,null),e(\"span\",{className:\"tooltip-text\"},\"Copy Request\")),e(\"div\",{className:\"btn response-detail-button \",onClick:()=>{E()}},e(de,null),e(\"span\",{className:\"tooltip-text\"},\"Copy Response\")),e(\"div\",{className:\"btn response-detail-button \",onClick:()=>{P()}},e(Fe,null),e(\"span\",{className:\"tooltip-text\"},\"Run E2E Test\")))),e(\"div\",{className:\"response-detail-info\"},e(\"div\",{style:{display:\"flex\",flexDirection:\"column\"}},\" \",e(j,{jsonData:{body:s[t].response?.body,success:s[t].response?.success}})),e(\"span\",{className:\"response-took\"},\"took:\",s[t].response?.tookTime,\" ms\"),s[t].response&&s[t].response?.success===!0?e(\"div\",{className:\"success\"}):e(\"div\",{className:\"fail\"})))))};var wt=()=>e(\"svg\",{width:\"15px\",height:\"15px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M20.04 10.1109L18.0252 8.09612L21.7071 4.41421C22.0976 4.02369 22.0976 3.39052 21.7071 3L21 2.29289C20.6095 1.90237 19.9763 1.90237 19.5858 2.29289L15.9039 5.9748L14.04 4.11089C13.754 3.82489 13.3239 3.73933 12.9502 3.89411C12.5765 4.04889 12.3329 4.41353 12.3329 4.81799V10.818C12.3329 11.3703 12.7806 11.818 13.3329 11.818H19.3329C19.7373 11.818 20.102 11.5744 20.2568 11.2007C20.4115 10.827 20.326 10.3969 20.04 10.1109Z\",fill:\"bisque\"}),e(\"path\",{d:\"M3.96 13.8891L5.97478 15.9039L2.29289 19.5858C1.90237 19.9763 1.90237 20.6095 2.29289 21L3 21.7071C3.39052 22.0976 4.02369 22.0976 4.41421 21.7071L8.0961 18.0252L9.96 19.8891C10.246 20.1751 10.6761 20.2607 11.0498 20.1059C11.4235 19.9511 11.6671 19.5865 11.6671 19.182V13.182C11.6671 12.6297 11.2194 12.182 10.6671 12.182H4.66711C4.26265 12.182 3.89801 12.4256 3.74323 12.7993C3.58845 13.173 3.674 13.6031 3.96 13.8891Z\",fill:\"bisque\"})),st=wt;var _t=()=>e(\"svg\",{width:\"15px\",height:\"15px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M7.69233 18.2781L9.70711 20.2929C9.9931 20.5789 10.0787 21.009 9.92388 21.3827C9.7691 21.7564 9.40446 22 9 22H3C2.44772 22 2 21.5523 2 21V15C2 14.5955 2.24364 14.2309 2.61732 14.0761C2.99099 13.9213 3.42111 14.0069 3.70711 14.2929L5.571 16.1568L9.25289 12.4749C9.64342 12.0844 10.2766 12.0844 10.6671 12.4749L11.3742 13.182C11.7647 13.5725 11.7647 14.2057 11.3742 14.5962L7.69233 18.2781Z\",fill:\"bisque\"}),e(\"path\",{d:\"M16.3077 5.72187L14.2929 3.70711C14.0069 3.42111 13.9213 2.99099 14.0761 2.61732C14.2309 2.24364 14.5955 2 15 2H21C21.5523 2 22 2.44772 22 3V9C22 9.40446 21.7564 9.7691 21.3827 9.92388C21.009 10.0787 20.5789 9.9931 20.2929 9.70711L18.429 7.84319L14.7471 11.5251C14.3566 11.9156 13.7234 11.9156 13.3329 11.5251L12.6258 10.818C12.2352 10.4275 12.2352 9.7943 12.6258 9.40378L16.3077 5.72187Z\",fill:\"bisque\"})),at=_t;function qe(){return e(\"svg\",{width:25,height:25,fill:\"#000000\",viewBox:\"0 0 24 24\",id:\"up-direction\",\"data-name\":\"Line Color\",xmlns:\"http://www.w3.org/2000/svg\",class:\"icon line-color\"},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},e(\"path\",{id:\"secondary\",d:\"M10,9.66V20a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V9.66\",style:\"fill: none; stroke: darkred; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"}),e(\"path\",{id:\"primary\",d:\"M14,9.66l3.4,2.92,2.6-3-7.35-6.3a1,1,0,0,0-1.3,0L4,9.54l2.6,3L10,9.66\",style:\"fill: none; stroke: darkred; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"})))}var kt=a=>{let[t,s]=N(\"myBtn none\"),[n,o]=N(!1),f=J(null),i=()=>{f.current.scroll,document.getElementById(\"modal\")?.scroll({top:0,behavior:\"smooth\"})},p=l=>{l.currentTarget.scrollTop>20?s(\"myBtn\"):s(\"none\")};return e(\"div\",{className:\"modal-overlay\",onClick:a.toggle},e(\"div\",{className:n?\"modal-box-fullscreen\":\"modal-box\",onClick:l=>l.stopPropagation()},e(\"div\",{className:\"action-modal\"},e(\"span\",{className:\"modal-close\",onClick:a.toggle},e(Y,null)),e(\"span\",{className:\"modal-fullscreen\",onClick:()=>o(!n)},n?e(st,null):e(at,null)),e(\"span\",{className:\"modal-title\"},a.title)),e(\"div\",{className:\"modal-content\",id:\"modal\",ref:f,onScroll:p},a.children,e(\"div\",{className:t},e(\"button\",{className:\"myBtn-active tooltip\",onClick:()=>i()},e(qe,null),e(\"span\",{className:\"tooltip-text\"},\"Go To Top\"))))))},nt=kt;var ot=()=>{let{schemasObj:a}=B(),[t,s]=N({});h(()=>{let p={};for(let l in a){p[l]={...p[l],pure:a[l].pure};for(let g in a[l].mainRelations)p[l]={...p[l],mainRelations:{...p[l].mainRelations,[g]:{type:\"relation\",extraDetails:a[l].mainRelations[g],schema:{...a[a[l].mainRelations[g].schemaName].pure}}}};for(let g in a[l].relatedRelations)p[l]={...p[l],relatedRelations:{...p[l].relatedRelations,[g]:{type:\"relation\",extraDetails:a[l].relatedRelations[g],schema:{...a[a[l].relatedRelations[g].schemaName].pure}}}}}s(p)},[]);let n=()=>{let p=`data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(a))}`,l=document.createElement(\"a\");l.href=p,l.download=\"schemas.json\",l.click()},o=[\"color-1\",\"color-2\",\"color-3\",\"color-4\",\"color-5\",\"color-6\",\"color-7\"],f=p=>Object.keys(p).map(l=>{let g=A();return e(\"div\",{className:\"schema\"},e(\"div\",{className:\"schema-name\",onClick:()=>{document.getElementById(g)?.classList.toggle(\"open\")}},e(\"p\",{className:\"schema-title\"},l),e(\"span\",null,\"...\")),e(\"div\",{className:\"proceed-child-container\",id:g},i(p[l])))}),i=p=>Object.keys(p).map(l=>{let g=A();return e(\"div\",{className:`inside-schema ${o[Math.floor(Math.random()*o.length)]}`},e(\"div\",{className:`inside ${typeof p[l]==\"object\"&&p[l].schema!==null&&\"schema-pointer\"}`,onClick:()=>{document.getElementById(g)?.classList.toggle(\"open\")}},e(\"p\",{className:\"schema-title\"},l),e(\"div\",{className:\"schema-info\"},\" \",e(\"p\",{className:\"schema-title schema-type\"},\" \",p[l].type),e(\"div\",{className:\"schema-help\"},p[l].extraDetails&&e(ae,null),p[l].extraDetails&&e(\"div\",{className:\" tooltip-text\"},e(j,{jsonData:p[l].extraDetails}))),typeof p[l]==\"object\"&&p[l].schema!==null&&e(\"span\",null,\"...\"))),e(\"div\",{id:g,className:\"proceed-child\"},typeof p[l]==\"object\"&&p[l]!==null&&p[l].schema!==null&&i(p[l].pure?p[l].pure:p[l].relatedRelations?p[l].relatedRelations:p[l].mainRelation?p[l].mainRelation:p[l].type===\"relation\"?p[l].schema:p[l])))});return e(\"div\",{className:\"schema-modal\"},e(\"div\",{className:\"results-buttons\"},e(\"button\",{className:\" schema-export-button btn e2e-back-button e2e-export_results-button\",onClick:n},e(X,null),e(\"span\",null,\"Export\"))),e(\"div\",{className:\"schema-list\"},f(t)))};function pe(){return e(\"svg\",{width:25,height:25,viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M7.75 11.9999L10.58 14.8299L16.25 9.16992\",stroke:\"lightcoral\",\"stroke-width\":\"2\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),\" \",e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z\",fill:\"bisque\"}))}function rt({configUrl:a}){let[t,s]=N(\"no\"),n=()=>{setTimeout(()=>{s(\"no\")},1e3)},o=b=>{p[b],p.splice(b,1),l([...p])},{headers:f,setHeader:i}=B(),[p,l]=N([{key:\"\",value:\"\"}]),[g,F]=N(\"\");return h(()=>{let b=[];for(let S in f)b.push({key:S,value:f[S]});l(b)},[]),e(\"div\",{className:\"setting modal-content\"},e(\"div\",{className:\"url\"},e(\"p\",{className:\"url-title\"},\"Fetch Config\"),e(\"div\",{className:\"url-detail\"},\" \",e(\"input\",{className:\"input url-input \",placeholder:\"Set URL\",onChange:b=>F(b.target.value)}),e(\"button\",{className:\"setting_fetch-config--apply-button e2e-back-button e2e-add-capture \",onClick:()=>{a(g),s(\"yes\"),n()}},e(pe,null),e(\"span\",null,t===\"yes\"?\"Applyed!\":\"Apply\")))),e(\"div\",{className:\"sidebar__section sidebar__section--headers\"},e(\"div\",{className:\"sidebar__section-heading setting_heading\"},\" \",e(\"span\",{className:\"setting_heading--title\"},\"Set Headers\"),e(\"button\",{className:\"setting_add-header--button e2e-back-button e2e-export_results-button e2e-add-capture \",onClick:()=>{l([...p,{key:\"\",value:\"\"}])}},e(te,null),e(\"span\",null,\"Add Header\"))),e(\"div\",{className:\"setting_container--setheaders\"},e(\"div\",{className:\"setting_set-headers\"},p?.map((b,S)=>e(\"div\",{key:`${S}____`,className:\"setting_set-headers--inputs\"},e(\"div\",{className:\"setting__set-headers--key-value setting__set-headers--key\"},e(\"span\",null,\"Key:\"),e(\"input\",{className:\"setting_set-headers--inputs--key input\",placeholder:\"Authotization\",value:b.key,onChange:C=>{l(I=>(I[S].key=C.target.value,I))}})),e(\"div\",{className:\"setting__set-headers--key-value setting__set-headers--value\"},e(\"span\",null,\"Value:\"),e(\"input\",{className:\"setting_set-headers--inputs--value input\",placeholder:\"some string ...\",value:b.value,onChange:C=>{l(I=>(I[S].value=C.target.value,I))}})),p.length>1&&e(\"div\",{className:\"setting_set-headers--delete-button e2e-move-div e2e-move-close\",onClick:()=>o(S)},e(Y,null))))),e(\"button\",{className:\"setting_set-headers--apply-button e2e-back-button e2e-add-capture \",onClick:()=>{let b={};for(let S of p){let{key:C,value:I}=S;b[C]=I}i(b),s(\"yess\"),n()}},e(pe,null),e(\"span\",null,t===\"yess\"?\"Applyed!\":\"Apply\")))))}var xt=({baseUrl:a})=>fetch(`${a}playground/static/get/schemas`).then(t=>t.json()),it=()=>{let{tabsData:a,setTabsData:t,activeTab:s,actsObj:n,addTab:o,setActiveTab:f,setService:i,setSchema:p,setAct:l,setPostFields:g,setGetFields:F,setFormData:b,setHistory:S,setResponse:C,resetGetFields:I,closeTab:Z,resetPostFields:G,setSchemasObj:W,setActsObj:Q,setModal:O,modal:q}=B(),[$,u]=N(\"\"),[m,T]=N(!1),c=()=>window&&window.location?`${new URL(window.location.href).origin}/`:\"http://localhost:1366/\",[L,K]=N(\"\"),k=se(()=>{T(!1)});h(()=>{E(c());let x=JSON.parse(localStorage.getItem(\"localHistory\"));x&&S(x)},[]);let E=x=>{x&&K(x),i({data:\"\",index:s}),p({data:\"\",index:s}),I(s),G(s),b({data:{},index:s}),xt({baseUrl:x||L}).then(({schemas:r,acts:v})=>{Q(v),W(r);let M=localStorage.getItem(\"localTabsData\");if(M){M=JSON.parse(M);let y=[],w=d=>{y.pop();let _=ce(d.formData);for(let z in _.set)v[d.service][d.schema][d.act].validator.schema.set.schema[z]===void 0&&delete _.set[z];for(let z in _.get)v[d.service][d.schema][d.act].validator.schema.get.schema[z]===void 0&&delete _.get[z];let U=le(_,{},\"\");d.postFields=v[d.service][d.schema][d.act].validator.schema.set.schema,d.getFields=v[d.service][d.schema][d.act].validator.schema.get.schema,y.push({...d,formData:U})};for(let d of M)d.service&&d.service in v&&y.push(d),d.schema&&!(d.schema in v[d.service])&&y.pop(),d.act&&!(d.act in v[d.service][d.schema])&&y.pop(),d.service&&d.schema&&d.act&&d.act in v[d.service][d.schema]&&w(d);y.length<1&&y.push({service:\"\",schema:\"\",act:\"\",postFields:{},getFields:{},formData:{},response:null}),t(y)}})},R=()=>{O(null)},P=x=>{i({data:x.body.service,index:s}),p({data:x.body.model,index:s}),l({data:x.body.act,index:s});let r=n[x.body.service][x.body.model][x.body.act].validator.schema;F({data:r.get.schema,index:s}),g({data:r.set.schema,index:s}),C({data:null,index:s});let v=le(x.body.details,{},\"\");b({data:v,index:s}),R()};return e(\"div\",{className:\"cnt\"},e(\"div\",{className:\"tabs-container\",style:{display:\"flex\"}},a.map((x,r)=>e(H,null,e(\"div\",{className:\"tab-name\",\"data-tab\":s===r,onClick:()=>{f(r)}},\" \",e(\"span\",{title:a[r].act?`${a[r].schema} | ${a[r].act}`:a[r].schema?`${a[r].service} | ${a[r].schema}`:a[r].service?a[r].service:`Tab ${r}`},\" \",a[r].act?`${a[r].schema} | ${a[r].act}`:a[r].schema?`${a[r].service} | ${a[r].schema}`:a[r].service?a[r].service:`Tab ${r}`),e(\"span\",{className:` tab-close ${s===r?\"active-tab-close\":\"\"}`,onClick:v=>{v.stopPropagation(),Z(r)},title:\"Close tab\"},\"x\")))),e(\"span\",{className:\"add-tab\",title:\"Open a new tab\",onClick:()=>{o(null),localStorage.setItem(\"localTabsData\",JSON.stringify(a))}},\"+\")),e(tt,{urlAddress:L}),e(\"button\",{ref:k,className:\"media--main-btn-wrapper \",onClick:()=>{T(!m)}},\"menu\"),e(\"div\",{className:\"main-btn-wrapper\",\"data-show\":m===!0},e(\"span\",{className:\"btn btn-modal \",onClick:()=>E()},e(\"span\",{className:\"btn-modal-title\"},\"Refetch\"),e(Me,null)),e(\"span\",{className:\"btn btn-modal \",onClick:()=>O(\"SETTING\")},e(\"span\",{className:\"btn-modal-title\"},\"Setting\"),e(De,null)),e(\"span\",{className:\"btn btn-modal\",onClick:()=>O(\"HISTORY\")},e(\"span\",{className:\"btn-modal-title\"},\"History\"),e(Re,null)),e(\"span\",{className:\"btn btn-modal\",onClick:()=>O(\"E2E TEST\")},e(\"span\",{className:\"btn-modal-title\"},\"E2E Test\"),e(Le,null)),e(\"span\",{className:\"  btn-modal-document\",\"data-show\":$===\"document\"},e(\"span\",{className:\"btn-modal-document--title\",\"data-show\":$===\"document\"},\"Document\")),e(\"span\",{className:\"btn btn-modal btn-doc\",onClick:()=>O(\"SCHEMA\"),onMouseEnter:()=>u(\"document\"),onMouseLeave:()=>u(\"\")},e(\"span\",{className:\"btn-modal-title\"},\"Schema\"),e(Ie,null)),e(\"span\",{className:\"btn btn-modal btn-doc \",onClick:()=>O(\"ACT\"),onMouseEnter:()=>u(\"document\"),onMouseLeave:()=>u(\"\")},e(\"span\",{className:\"btn-modal-title\"},\"Act\"),e(xe,null))),q!==null&&e(nt,{toggle:R,title:q},q===\"HISTORY\"?e(Qe,{setFormFromHistory:P}):q===\"SETTING\"?e(rt,{configUrl:E}):q===\"E2E TEST\"?e(We,{baseUrl:L}):q===\"SCHEMA\"?e(ot,null):q===\"ACT\"?e(Pe,null):e(H,null)))};Ae(e(Ge,null,e(it,null)),document.getElementById(\"root\"));\n//# sourceMappingURL=bundle-es.js.map\n";

    export const bundleCss = `/* css/index.css */
:root {
  --color-bg-base: var(--color-colonial-1);
  --color-bg-primary: var(--color-blue-1);
  --color-bg-primary-hover: var(--color-blue-1-hover);
  --color-bg-secondary: var(--color-blue-2);
  --color-text-base: var(--color-gray-4);
  --color-success: #2a7e2e;
  --color-error: #d92525;
  --color-warning: #d92525;
  --color-colonial-1: #fdf0d5;
  --color-colonial-2: #e07016;
  --color-green-1: #06d6a0;
  --color-green-2: #a5dc86;
  --color-blue-1: #003049;
  --color-blue-2: #2b3b4e;
  --color-blue-3: #669bbc;
  --color-blue-4: #03a9f4;
  --color-blue-1-hover: #a2978a;
  --color-gray-1: #d1d5db;
  --color-gray-2: #9e9e9e;
  --color-gray-3: #1f2937;
  --color-gray-4: #030712;
  --base-font-family: sans-serif;
  --headers-font-family: serif;
  --base-font-lineheight: 1.5em;
  --height-cnt--btn-send: 55px;
}
html,
body {
  color: var(--color-text-base);
  font-family: var(--base-font-family);
  background-color: var(--color-bg-base);
  font-weight: 300;
  line-height: var(--base-font-lineheight);
  -webkit-font-smoothing: antialiased;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 3px;
}
::-webkit-scrollbar-thumb {
  background-color: #737d7a;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(196, 194, 194, 0.83);
  width: 15px;
}
*,
*::after,
*::before {
  box-sizing: border-box;
}
h1 {
  font-size: 24px;
  color: gray;
  margin-left: 2rem;
}
label {
  color: #eeeeee;
}
input,
select {
  padding: 5px 10px;
  border-radius: 5px;
  border: 2px solid white;
  margin: 10px 0;
  font-size: 1rem;
  box-sizing: border-box;
}
input[type=number] {
  -moz-appearance: textfield;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
textarea {
  resize: none;
}
.input {
  height: 35px;
  border: 1px solid gainsboro;
  background-color: rgba(70, 70, 70, 0.5);
  border-radius: 10px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  color: gainsboro;
}
.input:hover {
  border-color: bisque;
}
.input:focus {
  outline: none;
  background-color: rgba(220, 220, 220, 0.2);
  color: bisque;
}
.input:focus::placeholder {
  color: gainsboro;
}
.input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
.cnt {
  display: flex;
}
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  background-color: var(--color-gray-3);
  width: 20%;
  padding: 0.5% 1.5%;
  box-sizing: border-box;
  border-right: 1px solid slategrey;
  padding-top: 53px;
}
@media (min-width: 760px) and (max-width: 1023px) {
  .sidebar {
    width: 33%;
  }
}
@media (min-width: 1023px) {
  .sidebar {
    width: 25%;
  }
}
.sidebar__sections-wrapper {
  width: 100%;
}
.sidebar__section {
  margin-bottom: 10px;
}
.sidebar__section-heading {
  color: gainsboro;
  text-transform: capitalize;
  align-self: flex-start;
  padding: 10px 0;
  position: relative;
}
.sidebar__section-heading::after {
  position: absolute;
  right: 0;
  bottom: 7px;
  content: "";
  height: 1px;
  width: 100%;
  background-color: gainsboro;
  border-radius: 10px;
}
.sidebar__input-double {
  display: flex;
  margin-bottom: 25px;
  gap: 1rem;
  border-radius: 10px;
  border: 1px solid #808080;
  padding-bottom: 1.5rem;
  position: relative;
}
.sidebar__section-body-heading,
.sidebar__section-capture {
  padding: 0.5rem 2rem;
}
.sidebar__section-capture {
  width: 40%;
}
.sidebar__section-body-heading {
  position: relative;
  width: 70%;
  min-height: 50%;
}
.sidebar__section-body-heading::after {
  content: "";
  position: absolute;
  height: 95%;
  right: 0;
  top: 5%;
  border-right: 1px solid #808080;
}
.sidebar__section-body-heading textarea {
  width: 99%;
  border-radius: 5px;
  min-height: calc(100% - 3.6rem);
}
.repeat__number {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
}
.repeat__number input {
  width: 80%;
}
.repeat__number button {
  background-color: rgba(70, 70, 70, 0.5);
  color: lightcoral;
  margin: 10px 0;
  padding: 5px 15px;
  font-size: 1.5rem;
  cursor: pointer;
  border-top: 1px solid bisque;
  border-radius: 5px;
}
.sidebar__section-add-capture {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  border: 1px solid bisque;
  border-radius: 7px;
  padding: 5px 10px 0 10px;
  position: relative;
  margin-top: 15px;
}
.sidebar__section-add-capture input {
  width: 50%;
  border: none;
  border-radius: 5px;
  cursor: text;
}
.section-add-capture__delete-button {
  position: absolute;
  z-index: 2;
  top: -12px;
  right: 5px;
  cursor: pointer;
}
.section-add-capture__delete-button svg {
  border-radius: 50%;
  backdrop-filter: blur(10px);
}
.btn {
  border: none;
  padding: 8px;
  border-radius: 5px;
  text-transform: capitalize;
}
.btn--add {
  background-color: var(--color-colonial-2);
  color: white;
  width: 100%;
  margin: 10px 0;
  cursor: pointer;
  white-space: nowrap;
}
.btn__action {
  position: fixed;
  top: 0;
  background-color: #2c2c2b;
  width: 97%;
  display: flex;
  gap: 2rem;
  height: 46px;
}
.btn__action button {
  width: 25%;
  height: 30px;
}
.select {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 10px 0;
}
.select[disabled=true] {
  opacity: 0.6;
  pointer-events: none;
}
.select--sub-buttons {
  display: none;
}
.select--sub-buttons[data-show=true] {
  display: flex;
  flex-direction: column;
  border: 1px solid gainsboro;
  border-radius: 0 0 10px 10px;
  background-color: rgba(70, 70, 70, 0.5);
  backdrop-filter: blur(3px);
  width: 100%;
  margin-top: 35px;
  position: absolute;
  z-index: 5;
  border-top: none;
  box-sizing: border-box;
}
.select--empty {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px 0 10px;
  height: 35px;
  border: 1px solid gainsboro;
  background-color: rgba(70, 70, 70, 0.5);
  border-radius: 10px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  color: gainsboro;
  box-sizing: border-box;
}
.select--empty:hover {
  border-color: bisque;
}
.active-select--empty {
  border-radius: 10px 10px 0 0;
}
.select--empty--left-side {
  display: flex;
  align-items: center;
  gap: 10px;
}
.select-empty--left-side--clear {
  color: lightcoral;
  visibility: visible;
}
.select-empty--left-side--clear--inactive {
  visibility: hidden;
}
.option {
  width: 100%;
  height: 35px;
  cursor: pointer;
  color: gainsboro;
  border-bottom: 1px solid rgba(220, 220, 220, 0.4);
  padding-left: 10px;
  box-sizing: border-box;
  line-height: 2.125rem;
}
.option:last-child {
  border: none;
}
.option:hover {
  background-color: rgba(255, 228, 196, 0.5);
  color: black;
}
.active-option {
  background-color: rgba(220, 220, 220, 0.5);
  color: #021307;
}
.select--empty:hover .option {
  opacity: 100;
  background-color: #24123b;
}
.sidebar__select {
  padding: 5px 10px;
  font-size: 1rem;
  border: none;
  background-color: white;
  border-radius: 5px;
  width: 100%;
}
.url {
  margin-bottom: 15px;
}
.url-title {
  color: white;
  border-bottom: 1px solid white;
}
.url-detail {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}
.url-input {
  width: 75%;
  padding: 10px;
  height: 43px;
}
.url-button {
  width: 20%;
  height: 31px;
  margin-left: 15px;
  background-color: var(--color-colonial-2);
  color: white;
}
@media (min-width: 768px) and (max-width: 1440px) {
  .sidebar__section-add-capture {
    flex-direction: column;
    padding: 15px 8px 8px 8px;
  }
  .sidebar__section-add-capture input {
    margin: 0;
    width: 100%;
  }
}
.main-btn-wrapper {
  position: absolute;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.btn-modal {
  display: flex;
  align-items: center;
  left: 0;
  cursor: pointer;
  background-color: rgba(70, 70, 70, 0.5);
  border: 1px solid bisque;
  backdrop-filter: blur(10px);
  border-radius: 0 7px 7px 0;
  border-left: none;
  transition: all 0.4s;
  width: 3.125rem;
  color: bisque;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 50px;
}
.media--main-btn-wrapper {
  display: none;
}
.btn-modal > svg {
  position: absolute;
  right: 0.5rem;
  transition: all 0.8s;
}
.btn-modal > span {
  opacity: 0;
  margin-right: 0;
  transition: all 0.4s;
  white-space: nowrap;
}
.btn-modal:hover {
  background-color: dimgray;
  width: 8rem;
}
.btn-modal:hover > span {
  opacity: 100;
  margin-right: 1.6rem;
}
.btn-modal:hover > svg {
  right: 0.4rem;
}
.btn-modal-document {
  border-bottom: 1px solid bisque;
  width: 5rem;
  height: 0;
  padding: 0;
  backdrop-filter: blur(10px);
  transition: all 0.4s;
  color: bisque;
  position: relative;
}
.btn-modal-document[data-show=true] {
  width: 8rem;
  transition: all 0.4s;
}
.btn-modal-document--title {
  opacity: 0;
}
.btn-modal-document--title[data-show=true] {
  position: absolute;
  bottom: -10px;
  left: 123px;
  margin-right: 0;
  margin-left: 10px;
  transition: all 0.4s;
  white-space: nowrap;
  opacity: 100;
}
@media (max-height: 768px) {
  .btn-modal {
    height: 35px;
    width: 100%;
    border-radius: 5px;
    border: none;
  }
  .btn-modal span {
    opacity: 100;
    margin-right: 0;
    transition: all 0.4s;
    white-space: nowrap;
  }
  .btn-modal > svg {
    position: absolute;
    right: 8px;
    transition: all 0.8s;
  }
  .btn-modal:hover {
    background-color: dimgray;
    width: 100%;
  }
  .btn-modal:hover > svg {
    right: 8px;
  }
  .main-btn-wrapper {
    display: none;
  }
  .main-btn-wrapper[data-show=true] {
    display: flex;
    gap: 5px;
    width: 28%;
    left: 7px;
    border: 1px solid bisque;
    border-radius: 7px 7px 0 0;
    border-bottom: none;
    bottom: 0;
    padding: 10px 10px 39px 10px;
    backdrop-filter: blur(40px);
  }
  .media--main-btn-wrapper {
    display: block;
    position: absolute;
    bottom: 0;
    left: 33px;
    width: 23%;
    border: 1px solid gainsboro;
    border-radius: 10px 10px 0 0;
    background-color: rgba(70, 70, 70, 0.5);
    color: bisque;
    height: 28px;
    font-size: medium;
    border-bottom: none;
    z-index: 5;
    cursor: pointer;
  }
  .media--main-btn-wrapper:hover {
    background-color: dimgray;
  }
  .btn-modal-document {
    display: none;
  }
}
@media (min-width: 1023px) {
  .media--main-btn-wrapper {
    width: 15%;
    left: 2.5%;
  }
}
.sidebar--fields {
  width: 23%;
  background-color: var(--color-bg-secondary);
  position: relative;
  padding-top: 53px;
}
@media (min-width: 760px) and (max-width: 1023px) {
  .sidebar--fields {
    width: 30%;
  }
}
@media (min-width: 1023px) {
  .sidebar--fields {
    width: 30%;
  }
}
.sidebar__section-heading--fields {
  color: var(--color-gray-1);
}
.sidebar__section-heading--fields::after {
  background-color: var(--color-gray-1);
}
.sidebar__section-heading--subfields {
  padding: 0.2rem 0.2rem 0.2rem 1rem;
  margin-bottom: 0.5rem;
  color: var(--color-colonial-1);
  font-weight: 400;
  text-transform: capitalize;
  align-self: flex-start;
  border-bottom: 1px solid slategray;
}
.sidebar__section_container {
  border: 1px solid slategray;
  border-radius: 0.5rem;
  margin-bottom: 0.3rem;
  padding: 0.5rem;
}
.border-bottom {
  border-bottom: 1px solid slategray;
  margin-bottom: 0.5rem;
}
.form--fields {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: var(--height-cnt--btn-send);
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.form--fields::-webkit-scrollbar {
  display: none;
}
.input-cnt {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.label--big {
  font-size: 1.2rem;
}
.cnt--btn-send {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  bottom: 0;
  right: 0;
  background-color: var(--color-bg-secondary);
  height: var(--height-cnt--btn-send);
  box-shadow: 0px -5px 12px 0px var(--color-bg-secondary);
  overflow: hidden;
}
.btn--send {
  background-color: var(--color-blue-4);
  width: 80%;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 1.1rem;
}
.wrapper {
  position: absolute;
  right: 0;
  top: 93%;
  background-color: var(--color-bg-secondary);
  width: 100%;
  height: 7%;
}
.send-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  height: 40px;
  line-height: 1;
  font-size: 18px;
  letter-spacing: 1px;
  border: 2px solid gainsboro;
  background-color: rgba(70, 70, 70, 0.5);
  color: bisque;
  border-radius: 15px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.35s;
}
.send-button:hover {
  background-color: gainsboro;
  color: #021307;
  border: 2px solid rgba(70, 70, 70, 0.5);
}
.send-button span {
  opacity: 1;
  visibility: visible;
  transition: all 0.35s;
}
.successe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  transition: all 0.35s;
}
.successe svg {
  width: 20px;
  height: 20px;
  fill: yellowgreen;
  transform-origin: 50% 50%;
  transform: translateY(-50%) rotate(0deg) scale(0);
  transition: all 0.35s;
}
.send-button[data-active=true] {
  width: 40px;
  height: 40px;
}
.send-button[data-active=true] .successe {
  opacity: 1;
  visibility: visible;
}
.send-button[data-active=true] .successe svg {
  margin-top: 50%;
  transform: translateY(-50%) rotate(720deg) scale(1);
}
.send-button[data-active=true] span {
  opacity: 0;
  visibility: hidden;
}
.response {
  display: flex;
  flex-direction: column;
  height: 100vh;
  flex-grow: 1;
  background-color: #272822;
}
@media (min-width: 760px) {
  .response {
    width: 40%;
  }
}
.response-detail {
  background-color: #272822;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
  margin: 30px;
  border: 1px solid white;
  border-radius: 10px;
  height: 90%;
  position: relative;
  margin-top: 80px;
}
.response-detail-button_title {
  background-color: #105a86;
  color: white;
  position: relative;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  display: flex;
}
.response-detail-buttons {
  display: flex;
  gap: 10px;
  position: absolute;
  right: 80px;
  top: 7px;
}
.response-detail-button {
  cursor: pointer;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 0;
  position: relative;
}
.response-detail-button .tooltip-text {
  background-color: cornflowerblue;
  white-space: nowrap;
  width: 130px;
  margin-left: -65px;
  padding: 5px 5px;
  transition: none;
  top: 100%;
  margin-top: 5px;
  height: fit-content;
}
.response-detail-button:hover svg {
  fill: bisque;
}
.response-detail-button .tooltip-text::after {
  top: -10px;
  border-color: transparent transparent rgb(255, 255, 255) transparent;
}
.response-detail-button:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
.response-detail-title {
  margin: 0;
  font-size: 20px;
}
.response-detail-info {
  padding: 0 10px;
  overflow-wrap: anywhere;
  overflow-y: scroll;
}
.response-took {
  position: absolute;
  top: 50px;
  right: 15px;
  color: #ffe4c496;
}
.success {
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  width: 15px;
  height: 15px;
  position: absolute;
  right: 30px;
  top: 15px;
  animation-name: success;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.45, 0.05, 0.55, 0.95);
}
@keyframes success {
  0% {
    background-color: rgb(255, 255, 255);
  }
  50% {
    background-color: green;
  }
}
.fail {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  width: 15px;
  height: 15px;
  position: absolute;
  right: 30px;
  top: 15px;
  animation-name: fail;
  animation-duration: 800ms;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.45, 0.05, 0.55, 0.95);
}
@keyframes fail {
  0% {
    background-color: rgb(255, 255, 255);
  }
  50% {
    background-color: red;
  }
  70% {
    background-color: rgb(255, 255, 255);
  }
  100% {
    background-color: rgb(255, 255, 255);
  }
}
@media (min-width: 760px) and (max-width: 1024px) {
  .response-detail-buttons {
    right: 33px;
  }
  .fail {
    right: 10px;
  }
  .success {
    right: 10px;
  }
}
.modal-overlay {
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.79);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(1px);
}
.modal-box-fullscreen {
  display: block;
  background: rgb(80, 80, 80, 0.5);
  width: 100%;
  height: calc(100% - 3rem);
  padding: 1rem;
  border-radius: 0.8rem;
  overflow: visible;
  backdrop-filter: blur(10px);
  border: 1px solid white;
  box-sizing: border-box;
  position: relative;
}
.modal-box {
  display: block;
  background: rgb(80, 80, 80, 0.5);
  width: 80%;
  height: 80%;
  padding: 1rem;
  border-radius: 0.8rem;
  overflow: visible;
  backdrop-filter: blur(10px);
  border: 1px solid white;
  box-sizing: border-box;
  position: relative;
}
.modal-content {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.e2e {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.sidebar__section--headers {
  margin-top: 50px;
}
.e2e_sidebar__section-heading {
  color: gainsboro;
  text-transform: capitalize;
  align-self: flex-start;
  padding: 10px 0;
  position: relative;
}
.e2e_sidebar__section-heading::after {
  position: absolute;
  right: 0;
  bottom: 7px;
  content: "";
  height: 2px;
  width: 100%;
  background-color: bisque;
  border-radius: 10px;
}
.e2e-move-buttons {
  display: flex;
  gap: 5px;
  margin-top: -1.3rem;
  position: absolute;
  right: 1.5rem;
}
.e2e-move-div {
  display: flex;
  gap: 7px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: none;
  padding: 6px;
  color: bisque;
}
.e2e-move-div svg:hover {
  background-color: dimgray;
}
.e2e-move-div.e2e-move-close svg:hover {
  background-color: brown;
}
.e2e-move-div svg {
  border-radius: 50%;
  backdrop-filter: blur(10px);
  width: 30px;
}
.e2e-back-button {
  display: flex;
  gap: 7px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: rgba(70, 70, 70, 0.5);
  border-radius: 0 0 10px 10px;
  padding: 6px;
  font-size: 15px;
  color: bisque;
  border: 1px solid bisque;
  backdrop-filter: blur(10px);
  border-top: none;
  text-decoration-line: none;
}
.e2e-back-button.e2e-run-botton {
  background-color: darkslategray;
}
.e2e-back-button:hover {
  background-color: dimgray;
}
.e2e-add-capture {
  border-top: 1px solid bisque;
  border-radius: 5px;
  padding: 8px;
  width: 100%;
  margin: 10px 0;
  white-space: nowrap;
}
.btn-e2e-action {
  left: 150px;
  display: flex;
  justify-content: space-around;
  transition: all 0.8s;
}
.e2e-export_results-button-hide {
  display: none;
}
.btn-show-results-buttons {
  display: none;
}
.actionShow-btn {
  display: none;
}
.e2e-export-form-button {
  color: black;
  font-size: 14px;
}
.results-buttons {
  position: absolute;
  top: 0;
  display: flex;
  width: 70%;
  gap: 20px;
  z-index: 1;
}
.results-buttons--back-export {
  position: absolute;
  top: 0;
  display: flex;
  width: 70%;
  gap: 20px;
  z-index: 1;
}
.help .e2e-back-button {
  position: absolute;
  top: 0;
}
.e2e-re-timeNumber-request {
  position: absolute;
  right: 1rem;
  color: bisque;
  font-size: 12px;
}
.e2e_help-content {
  color: gainsboro;
  padding: 1rem;
  border: 1px solid gainsboro;
  margin-top: 2rem;
  border-radius: 0.5rem;
}
.e2e_help--fullscreen-img {
  width: 95%;
  margin-left: 2.5%;
  border: 1px solid gainsboro;
  border-radius: 0.5rem;
}
.e2e_help--section---right-side {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}
.e2e_help--section---right-side > img {
  flex: 1;
}
.e2e_help--section---right-side > p {
  flex: 1;
}
.myBtn {
  display: block;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  border: none;
  outline: none;
  background: none;
  color: white;
}
.myBtn .tooltip-text {
  background-color: rgb(236 237 215 / 1);
  color: darkred;
  border: 1px solid darkred;
}
.myBtn .tooltip-text::after {
  border-color: darkred transparent transparent transparent;
}
.myBtn-active {
  border: 1px solid darkred;
  outline: none;
  color: white;
  cursor: pointer;
  border-radius: 50%;
  background-color: rgb(236 237 215 / 0.9);
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid whiItesmoke;
  cursor: pointer;
  border-radius: 50%;
}
.none {
  display: none;
}
.myBtn-active:hover {
  background-color: rgb(236 237 215 / 1);
}
.detail-requests {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  margin: 0 2rem;
}
.sequence-re {
  overflow-wrap: anywhere;
  width: 50%;
  background-color: rgba(147, 147, 147, 0.1);
  border-radius: 10px 0 0 10px;
  position: relative;
}
.sequence-response {
  background-color: #2b3b4e;
  border-radius: 0 10px 10px 0;
  border-left: 1px solid gainsboro;
}
.detail-sequence {
  padding: 1rem;
  color: bisque;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.detail-sequence span span {
  color: #f1fa8c;
}
.e2e-success {
  color: #00b800;
}
.e2e-fail {
  color: #c00;
}
.detail-sequence--sections {
  display: flex;
  flex-direction: column;
  gap: 5px;
  border: 1px solid gainsboro;
  border-radius: 7px;
  padding: 5px 10px;
  position: relative;
}
@media (max-width: 1023px) {
  .detail-sequence--sections--first-item {
    margin-top: 25px;
  }
}
.sequnce-description-label {
  position: absolute;
  top: 0;
  right: 10px;
  border: 1px solid gainsboro;
  border-top: none;
  border-radius: 0 0 7px 7px;
  color: burlywood;
  padding: 2px 6px;
}
.detail-sequence--sections--capture-items {
  list-style: none;
  padding: 0 0 0 10px;
  margin-top: 0;
}
@media (max-width: 1300px) {
  .detail-sequence--sections--capture-items {
    margin-top: 25px;
  }
}
.schema-modal {
  width: 97%;
  margin: 2rem auto 0 auto;
  display: flex;
  align-items: center;
}
.schema-modal .search-box {
  display: flex;
  align-items: center;
  background-color: #eeeeee54;
  padding: 0 2px 0 10px;
  border-radius: 5px;
  width: 80%;
  margin: 0 auto;
}
.schema-modal .search-box input {
  width: 100%;
}
.schema-modal .search-box .search-icon {
  padding: 7px;
}
.schema-modal .schema-list {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
.schema {
  background: rgba(79, 79, 79, 0.79);
  border-left: 2px dotted #f8f8f2;
  border-radius: 0 7px 7px 0;
}
.schema-list .schema .schema-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  color: #fff;
  padding: 5px 30px;
  cursor: pointer;
}
.schema-title {
  margin: 5px 0 2px 0;
  color: bisque;
}
.schema-type {
  position: absolute;
  top: 0;
  right: 60px;
  color: #dcdcdc75;
}
.schema-help {
  cursor: pointer;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 0;
  position: relative;
}
.schema-help .tooltip-text {
  background-color: rgba(70, 70, 70, 0.5);
  white-space: nowrap;
  width: 300px;
  margin-left: -150px;
  padding: 5px 5px;
  transition: none;
  bottom: 130%;
  margin-top: 5px;
  height: fit-content;
  text-align: unset;
  border: 1px solid gainsboro;
  backdrop-filter: blur(10px);
}
.schema-help .tooltip-text::after {
  top: 100%;
  border-color: bisque transparent transparent transparent;
}
.schema-help:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
.schema-info {
  display: flex;
  gap: 135px;
}
.schema-pointer {
  cursor: pointer;
}
.schema-list .schema .inside-schema {
  margin: 0 0 0 15px;
  padding: 10px;
  color: #fff;
}
.proceed-child-container {
  display: none;
  margin: 0 10px 10px 0;
}
.proceed-child {
  display: none;
}
.open {
  display: block;
}
.schema .inside-schema .inside {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.color-1 {
  border-left: 2px dotted rgb(109, 18, 13);
  background-color: rgba(109, 18, 13, 0.1);
}
.color-2 {
  border-left: 2px dotted rgb(194, 173, 67);
  background-color: rgba(194, 173, 67, 0.1);
}
.color-3 {
  border-left: 2px dotted rgb(20, 189, 43);
  background-color: rgba(20, 189, 43, 0.1);
}
.color-4 {
  border-left: 2px dotted rgb(21, 66, 189);
  background-color: rgba(21, 66, 189, 0.1);
}
.color-5 {
  border-left: 2px dotted rgb(94, 21, 189);
  background-color: rgba(94, 21, 189, 0.1);
}
.color-6 {
  border-left: 2px dotted rgb(189, 21, 116);
  background-color: rgba(189, 21, 116, 0.1);
}
.color-7 {
  border-left: 2px dotted rgb(8, 168, 217);
  background-color: rgb(8, 168, 217, 0.1);
}
.setting {
  overflow: hidden;
}
@media (max-width: 1023px) {
  .results-buttons {
    display: none;
  }
  .results-buttons[data-show=true] {
    display: flex;
    flex-direction: column;
    width: 20%;
    background-color: rgba(29, 32, 30, 0.8);
    padding: 1rem;
    border: 1px solid bisque;
    backdrop-filter: blur(10px);
    border-radius: 0 0 10px 10px;
    padding-top: 3rem;
  }
  .btn-e2e-action {
    border: none;
    border-radius: 10px;
    width: 100%;
    height: 35px;
    background-color: rgb(61, 61, 61);
    white-space: nowrap;
    font-size: 12px;
    transform: background 200ms ease;
    justify-content: space-between;
    padding: 2px 8px;
  }
  .btn-e2e-action span {
    transition: all 0.5s;
  }
  .btn-e2e-action:hover span {
    margin-right: 15px;
  }
  .btn-e2e-action svg {
    width: 18px;
  }
  .e2e-run-botton span {
    font-size: 10px;
  }
  .btn-show-results-buttons {
    display: flex;
    cursor: pointer;
    background-color: rgba(70, 70, 70, 0.3);
    border-radius: 0 0 10px 10px;
    padding: 6px;
    font-size: 15px;
    color: bisque;
    border: 1px solid bisque;
    position: absolute;
    left: 2rem;
    top: 0;
    width: 16%;
    justify-content: center;
    z-index: 100;
  }
  .actionShow-btn {
    display: flex;
  }
  .e2e-add-capture {
    font-size: 11px;
  }
  .setting {
    overflow-y: scroll;
  }
}
.setting_fetch-config--apply-button {
  display: flex;
  justify-content: space-between;
  width: 7rem;
  border-radius: 7px;
}
.setting_heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
}
.setting_heading--title {
  flex-grow: 1;
}
.setting_add-header--button {
  border-bottom: none;
  margin-bottom: 0;
  border-radius: 7px 7px 0 0;
  margin-right: 19px;
  width: unset;
}
.setting_container--setheaders {
  position: relative;
  display: flex;
  flex-direction: column;
}
.setting_set-headers {
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  gap: 1rem;
  border-radius: 10px;
  border: 1px solid #808080;
  padding-bottom: 1.5rem;
  position: relative;
  overflow-y: scroll;
  height: 40vh;
  margin-top: 5px;
  padding-bottom: 65px;
  padding-top: 5px;
}
.setting_set-headers--inputs {
  display: flex;
  padding: 0 10px;
  gap: 10px;
  border: 1px solid bisque;
  margin: 20px 20px 5px 20px;
  border-radius: 7px;
  position: relative;
}
.setting__set-headers--key-value {
  display: flex;
  gap: 10px;
  align-items: center;
  color: white;
  padding: 5px;
}
.setting__set-headers--key {
  width: 25%;
}
.setting__set-headers--value {
  flex-grow: 1;
}
.setting_set-headers--inputs--key {
  width: 75%;
  cursor: text;
}
.setting_set-headers--inputs--value {
  flex-grow: 1;
  cursor: text;
}
.setting_set-headers--delete-button {
  position: absolute;
  right: 0;
  top: -25px;
}
.setting_set-headers--apply-button {
  display: flex;
  justify-content: space-between;
  width: 7rem;
  margin-right: 31px;
  border-radius: 7px;
  position: absolute;
  bottom: 0;
  right: -10px;
  margin-bottom: 40px;
}
.container-e2e {
  border-radius: 7px;
  border: 1px solid bisque;
  padding: 0.1rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0 0.5rem 0;
  cursor: pointer;
  font-size: 12px;
}
.container-e2e span {
  color: bisque;
  height: 20px;
}
.e2e-container--sequence-container {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: 50px;
}
.information-container-label {
  position: absolute;
  top: -17px;
  border: 1px solid gainsboro;
  border-radius: 10px;
  background-color: #002929;
  padding: 2px 6px;
}
.e2e-container--sequence-container--information-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
  position: relative;
  border: 1px solid gainsboro;
  border-radius: 10px;
  background-color: #273f3f;
  color: gainsboro;
  padding: 50px 30px;
  padding: "50px 30px";
  overflow-wrap: anywhere;
}
.information-container--request {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 1px solid gainsboro;
  border-radius: 7px;
  padding: 15px 15px 0 15px;
  position: relative;
}
.information-container--request--sections {
  display: flex;
  flex-direction: column;
  padding: 5px;
}
.information-container--request--sections--item {
  margin: 0;
}
.information-container--request--sections--item--content {
  color: #f1fa8c;
}
.e2e-sequensce-number {
  cursor: pointer;
}
.information-container--times {
  display: flex;
  gap: 10px;
  padding: 10px 15px 0 15px;
  border: 1px solid gainsboro;
  border-radius: 7px;
  width: 100%;
  position: relative;
}
.information-container--times--sections {
  flex-grow: 1;
  border: 1px solid gainsboro;
  border-radius: 7px;
  padding: 5px 10px;
  list-style: none;
}
.e2e-best {
  color: gold;
}
.information-container--captures {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  border: 1px solid gainsboro;
  border-radius: 7px;
  padding: 40px 15px 0 15px;
  position: relative;
  width: 100%;
}
.information-container--captures--sections {
  flex-grow: 1;
  border: 1px solid gainsboro;
  border-radius: 7px;
  padding: 20px 10px 5px 10px;
  list-style: none;
  margin-top: 0;
  position: relative;
}
.result-slider-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.result-slider-wrapper {
  display: flex;
  min-width: 100%;
  position: relative;
}
.container-detail {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 17px;
  border: 1px solid gainsboro;
  border-radius: 10px;
  margin-top: 5px;
}
.container-re {
  overflow-wrap: anywhere;
  width: 50%;
  background-color: rgba(147, 147, 147, 0.1);
  border-radius: 10px 0 0 10px;
  position: relative;
}
.container-re-detail {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  color: white;
}
.container-re--header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid gainsboro;
  padding: 5px;
  background-color: rgba(20, 20, 20, 0.1);
}
.container-re--header--icon {
  display: flex;
  position: absolute;
  left: 10px;
  cursor: pointer;
}
.container--re--header--icon-number {
  display: flex;
  align-items: center;
  position: absolute;
  right: 10px;
  color: gainsboro;
  display: "flex";
}
.history-re-delete {
  position: absolute;
  right: 25px;
  bottom: 13px;
  cursor: pointer;
  z-index: 5;
  height: 100%;
}
.history-re-delete svg {
  backdrop-filter: blur(10px);
  border-radius: 50%;
}
.container-re-detail-title {
  display: flex;
  color: white;
  align-items: baseline;
}
.history-re-detail-date {
  font-size: 11px;
  position: absolute;
  right: 12px;
  top: 0;
  color: white;
}
.history-response-took {
  left: 12px;
}
.history-response-title {
  border-radius: 0 10px 0 0;
}
.history-re-detail-collapse {
  padding-right: 2.5rem;
}
.history-re-detail-button {
  margin-right: 2.5rem;
  background-color: gainsboro;
  border: none;
  border-radius: 5px;
  color: #141414;
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  width: 78px;
  white-space: nowrap;
}
.history-re-detail-button-icon {
  width: 10px;
  display: inline-block;
  font-size: 20px;
  margin-right: 5px;
}
.history-re-response-title {
  display: flex;
  align-items: center;
  padding-left: 15px;
}
.history-re-response-title-status {
  position: relative;
  bottom: 2px;
}
.history-re-detail-complete {
  display: none;
}
.history-re-detail-complete[data-show=true] {
  display: block;
}
.container-response {
  background-color: rgba(7, 148, 191, 0.1);
  border-radius: 0 10px 10px 0;
  border-left: 1px solid gainsboro;
}
.container-re-title {
  text-align: center;
  width: 100%;
  display: inline-block;
  color: bisque;
}
.history-re-title_date {
  position: relative;
  border-right: 1px solid bisque;
}
.clear-history {
  position: absolute;
  bottom: 20px;
  left: 27px;
  display: flex;
  justify-content: end;
  z-index: 5;
}
.clear-history-button {
  border-radius: 50%;
  background-color: rgba(139, 0, 0, 0.9);
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid whiItesmoke;
  cursor: pointer;
  border: 1px solid white;
}
.clear-history-button:hover {
  background-color: rgba(139, 0, 0, 1);
}
.tooltip {
  position: relative;
  display: inline;
}
.tooltip-text {
  visibility: hidden;
  width: 100px;
  background-color: darkred;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 110%;
  left: 50%;
  margin-left: -50px;
  opacity: 0;
  transition: opacity 1s;
}
.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
.tooltip-text::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: rgb(255, 255, 255) transparent transparent transparent;
}
.action-modal {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: absolute;
  top: -1.35rem;
  right: 1.5rem;
}
.modal-title {
  margin: 0 1rem;
  display: inline-block;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.79);
  color: white;
  border: 1px solid white;
  box-sizing: border-box;
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  z-index: 7;
}
.modal-fullscreen {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: red;
  transition: visibility 200ms ease;
}
.modal-close,
.modal-fullscreen {
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(245, 35, 35, 0.5);
  transition: visibility 200ms ease;
  border: 1px solid gainsboro;
  cursor: pointer;
  color: #fff;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.modal-fullscreen {
  background-color: rgba(66, 196, 66, 0.5);
}
.modal-close svg,
.modal-fullscreen svg {
  opacity: 0;
  width: 20px;
  height: 20px;
}
.modal-fullscreen svg {
  width: 13px;
  display: flex;
  margin: auto;
}
.modal-close svg path:first-child {
  display: none;
}
.modal-close svg path {
  stroke: #fff;
}
.modal-close:hover,
.modal-fullscreen:hover {
  opacity: 1;
}
.modal-close:hover svg,
.modal-fullscreen:hover svg {
  opacity: 1;
}
.no-history {
  background-color: lightslategrey;
  font-size: 1.5rem;
  margin: 250px 10px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 10px;
}
.tabs-container {
  display: flex;
  gap: 10px;
  width: 100%;
  position: fixed;
  background-color: #232724;
  z-index: 5;
  padding: 8px 8px 8px 8px;
  border-bottom: 1px solid gainsboro;
  overflow-y: scroll;
}
.tab-name {
  color: gainsboro;
  padding: 5px;
  border-radius: 5px;
  cursor: default;
  max-width: 200px;
  min-width: 55px;
  flex-grow: 1;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.tab-name:hover {
  background-color: #303632;
}
.tab-name[data-tab=true] {
  background-color: #1d201e;
  border: 1px solid gainsboro;
}
.add-tab {
  color: gainsboro;
  align-self: center;
  font-size: 1.4rem;
  width: 1.8rem;
  text-align: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
}
.add-tab:hover {
  background-color: #56615a;
}
.tab-close {
  font-size: 1rem;
  line-height: 0.8rem;
  position: absolute;
  right: 0.5rem;
  color: gainsboro;
  align-self: center;
  width: 1.8rem;
  text-align: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
}
.tab-name[data-tab=true]:hover .tab-close {
  background-color: #1d201e;
}
.tab-name[data-tab=true]:hover .tab-close:hover {
  background-color: #434c46;
}
.tab-name:hover .tab-close {
  background-color: #303632;
}
.tab-name:hover .tab-close:hover {
  background-color: #262b28;
}
.tab-name[data-tab=true] .tab-close {
  background-color: #1d201e;
}
.tab-name .tab-close {
  background-color: #232724;
}
.pagination-container {
  position: absolute;
  z-index: 1;
  bottom: 10px;
}
.pagination {
  list-style: none;
  padding: 5px;
  border-radius: 7px;
  display: flex;
  gap: 2px;
  background-color: gainsboro;
  position: relative;
}
.pagination > :is(button, span) {
  display: grid;
  place-items: center;
  height: 30px;
  padding: 1px;
  border: 0;
  background: none;
  color: black;
  font-size: 12px;
  cursor: pointer;
  border-radius: 7px;
  min-width: 30px;
  max-width: 45px;
}
.pagination > button:not(span) {
  cursor: pointer;
}
.pagination > button.active {
  background-color: teal;
  color: #f9f9f9;
}
.pagination > button:disabled {
  opacity: 0.25;
  cursor: pointer;
}
.pagination--go-to {
  display: flex;
  gap: 10px;
  position: absolute;
  left: 102%;
  bottom: 0;
  height: 40px;
  background-color: gainsboro;
  padding: 5px 10px;
  border-radius: 7px;
}
.pagination--go-to--input {
  margin: 0;
  width: 60px;
  border: 1px solid teal;
  outline: none;
  font-size: 13px;
}
.pagination--go-to--button {
  width: 45px;
  background: none;
  border-radius: 7px;
  cursor: pointer;
  border: 1px solid teal;
}
@media (max-width: 1023px) {
  .pagination {
    display: none;
  }
}
.pagination-u1024 {
  display: flex;
  gap: 5px;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow-y: scroll;
  overflow-wrap: anywhere;
  width: 175px;
  max-width: 175px;
  height: 42px;
  padding: 9px 5px 5px 5px;
  background-color: #2c2e2c;
  color: gainsboro;
  border: 1px solid bisque;
  border-radius: 7px;
  white-space: nowrap;
  z-index: 1;
}
.pagination-u1024--item {
  cursor: pointer;
  flex: 1;
}
.pagination-u1024--item[data-show=true] {
  color: gold;
}
@media (min-width: 1024px) {
  .pagination-u1024 {
    display: none;
  }
  .pagination-u1024--item {
    display: none;
  }
}
.cute-string {
  color: #f1fa8c;
}
.cute-number {
  color: #50fa7b;
}
.cute-boolean {
  color: #ff79c6;
}
.cute-function {
  color: #bd93f9;
}
.cute-null {
  color: #bd93f9;
}
.cute-undefined {
  color: #bd93f9;
}
.cute-key {
  color: #66d9ef;
  margin-right: 5px;
}
.cute-colon {
  color: #f8f8f2;
  margin-left: 1px;
}
.get-items {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 0.3rem 0;
  flex-flow: row wrap;
}
.get-values {
  display: flex;
  border: 1px solid gainsboro;
  border-radius: 10px;
  margin-bottom: 5px;
}
.get-values span {
  width: 1.5rem;
  cursor: pointer;
  padding: 0.2rem;
  text-align: center;
  color: bisque;
}
.get-values span:first-child {
  background-color: rgba(129, 123, 123, 0.5);
  border-left: none;
  border-radius: 10px 0 0 10px;
}
.get-values span:first-child:hover {
  background-color: #666666;
}
.get-values span:nth-child(2) {
  background-color: #464646;
  border-left: 1px solid gainsboro;
}
.get-values span:nth-child(2):hover {
  background-color: #666666;
}
.get-values span:nth-child(3) {
  background-color: #333;
  border-left: 1px solid gainsboro;
  border-radius: 0 10px 10px 0;
}
.get-values span:nth-child(3):hover {
  background-color: #666666;
}
.get-values span.active {
  background-color: gainsboro;
  color: #021307;
}
.multi-select__wrapper {
  position: relative;
}
.multi-select__field {
  background-color: rgba(70, 70, 70, 0.5);
  min-height: 35px;
  padding: 5px 5px 5px 10px;
  border-radius: 10px;
  border: 1px solid #dcdcdc;
  margin: 10px 0;
  font-size: 16px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.multi-select__selected-item-wrapper {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex: 1 1 0%;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}
.multi-select__icons-wrapper {
  -webkit-box-align: center;
  align-items: center;
  align-self: stretch;
  display: flex;
  flex-shrink: 0;
  box-sizing: border-box;
}
.multi-select__arrow-icon-wrapper {
  display: flex;
  position: relative;
  transition: color 150ms ease 0s;
  color: #dcdcdc;
  padding-left: 4px;
  box-sizing: border-box;
}
.multi-select__arrow-icon-wrapper::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  background-color: var(--color-bg-primary-hover);
  height: 100%;
}
.multi-select__arrow-icon {
  stroke-width: 0;
}
.multi-select__close-icon-wrapper {
  display: flex;
  transition: color 150ms ease 0s;
  color: #dcdcdc;
  padding-left: 4px;
  padding-right: 4px;
  box-sizing: border-box;
}
.multi-select__close-icon {
  stroke-width: 0;
}
.multi-select__selected-item {
  color: black;
  display: flex;
  min-width: 0rem;
  background-color: var(--color-bg-primary-hover);
  border-radius: 5px;
  margin: 0.125rem;
  box-sizing: border-box;
}
.multi-select__selected-item-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 5px;
  font-size: 85%;
  padding: 0 3px 0 6px;
  box-sizing: border-box;
  cursor: default;
}
.multi-select__selected-item-btn {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  border-radius: 5px;
  padding-left: 4px;
  padding-right: 4px;
  box-sizing: border-box;
  cursor: pointer;
}
.multi-select__selected-item-btn:hover {
  background-color: var(--color-bg-primary-hover);
  color: var(--color-error);
}
.multi-select__options {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  background-color: rgba(70, 70, 70, 0.5);
  backdrop-filter: blur(3px);
  max-height: 175px;
  overflow-y: auto;
  box-shadow: -10px 10px 15px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px 0;
  border: 1.2px solid #dcdcdc;
  z-index: 1;
}
.multi-select__option {
  position: relative;
  cursor: pointer;
}
.multi-select__option-label {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  color: #dcdcdc;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  text-overflow: ellipsis;
  display: block;
  white-space: nowrap;
}
.multi-select__option--no-option {
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  color: #dcdcdc;
  font-weight: bold;
}
.multi-select__option::after {
  content: "";
  position: absolute;
  bottom: 0;
  height: 1px;
  width: 100%;
  background-color: rgba(220, 220, 220, 0.4);
}
.multi-select__option:first-child::before {
  content: "";
  position: absolute;
  top: 0;
  height: 1px;
  width: 100%;
  background-color: rgba(220, 220, 220, 0.4);
}
.multi-select__option:hover {
  background-color: rgba(255, 228, 196, 0.5);
}
.multi-select__option:hover .multi-select__option-label {
  color: black;
}
.multi-select__option > input {
  cursor: pointer;
}
`;
    