
    export const bundleTs = "import{createContext as Re,Fragment as q,h as e,hydrate as Me}from\"https://esm.sh/preact@10.5.15\";import{useCallback as x,useContext as Oe,useEffect as $,useMemo as Le,useReducer as Fe,useRef as W,useState as C}from\"https://esm.sh/preact@10.5.15/hooks\";var A=()=>Date.now().toString(36)+Math.random().toString(36).substr(2);var et={tabsData:[{service:\"\",schema:\"\",act:\"\",postFields:{},getFields:{},formData:{},response:null}],activeTab:0,setActiveTab:()=>({}),addTab:()=>({}),closeTab:()=>({}),setTabsData:()=>({})},tt={schemasObj:{},actsObj:{},setService:()=>({}),setMethod:()=>({}),setSchema:()=>({}),setAct:()=>({}),setActsObj:()=>({}),setSchemasObj:()=>({}),setPostFields:()=>({}),resetPostFields:()=>({}),setGetFields:()=>({}),resetGetFields:()=>({}),setFormData:()=>({}),setResponse:()=>({})},st={history:[],deleteItemHistory:()=>({}),setHistory:()=>({})},at={headers:{Authorization:\"\"},setHeader:()=>({})},ue=()=>({id:A(),bodyHeaders:`\n{\n  \"headers\": {\n    \"Content-Type\": \"application/json\",\n    \"Authorization\": \"\"\n  },\n  \"body\": {\n    \"service\": \"main\",\n    \"contents\": \"dynamic\",\n    \"model\": \"\",\n    \"act\": \"\"\n    \"details\": {\n      \"get\": {\n      },\n    \"set\": {\n    }\n  }\n}\n}\n            `,repeat:1,captures:[]}),ot={e2eForms:[ue()],setE2eForms:()=>({}),addE2eForm:()=>({})},nt={modal:null,setModal:()=>({})},ge={...et,...tt,...st,...at,...ot,...nt};function Ie(a,s){let{type:t,payload:o}=s;switch(t){case\"SET_SELECTED_SERVICE\":{let i=[...a.tabsData];return i[o.index]={...i[o.index],service:o.data},{...a,tabsData:[...i]}}case\"SET_SCHEMA\":{let i=[...a.tabsData];return i[o.index]={...i[o.index],schema:o.data},{...a,tabsData:[...i]}}case\"SET_ACT\":{let i=[...a.tabsData];return i[o.index]={...i[o.index],act:o.data},{...a,tabsData:[...i]}}case\"SET_POST_FIELDS\":{let i=[...a.tabsData];return i[o.index]={...i[o.index],postFields:o.data},{...a,tabsData:[...i]}}case\"RESET_POST_FIELDS\":{let i=[...a.tabsData];return i[o]={...i[o],postFields:{}},{...a,tabsData:[...i]}}case\"SET_GET_FIELDS\":{let i=[...a.tabsData];return i[o.index]={...i[o.index],getFields:o.data},{...a,tabsData:[...i]}}case\"RESET_GET_FIELDS\":{let i=[...a.tabsData];return i[o]={...i[o],getFields:{}},{...a,tabsData:[...i]}}case\"SET_FORM_DATA\":{let i=[...a.tabsData];return i[o.index]={...i[o.index],formData:o.data},{...a,tabsData:[...i]}}case\"SET_HEADER\":return{...a,headers:o};case\"ADD_HISTORY\":return{...a,history:o};case\"SET_TABS_DATA\":return{...a,tabsData:o};case\"SET_RESPONSE\":{let i=[...a.tabsData];return i[o.index]={...i[o.index],response:o.data},{...a,tabsData:[...i]}}case\"ADD_TAB\":return{...a,tabsData:[...a.tabsData,{service:\"\",schema:\"\",act:\"\",postFields:{},getFields:{},formData:{},response:null}],activeTab:a.tabsData.length};case\"SET_ACTIVE_TAB\":return{...a,activeTab:o};case\"CLOSE_TAB\":{let i=[...a.tabsData];return i.length>1&&i.splice(o,1),{...a,tabsData:[...i],activeTab:i.length>=1&&a.activeTab>=o&&a.activeTab!==0?a.activeTab-1:a.activeTab}}case\"DELETE_ITEM_HISTORY\":return{...a,history:a.history.slice(0,o).concat(a.history.slice(o+1))};case\"SET_ACTS_OBJ\":return{...a,actsObj:o};case\"SET_SCHEMAS_OBJ\":return{...a,schemasObj:o};case\"SET_E2E_FORMS\":return{...a,e2eForms:o};case\"ADD_E2E_FORM\":return{...a,e2eForms:[...a.e2eForms,o]};case\"OPEN_MODAL\":return{...a,modal:o};default:throw new Error(\"Unhandled action type\")}}var fe=Re(ge),He=a=>{let[s,t]=Fe(Ie,ge),o=x(c=>t({type:\"SET_SELECTED_SERVICE\",payload:c}),[t]),i=x(c=>t({type:\"SET_SCHEMA\",payload:c}),[t]),u=x(c=>t({type:\"SET_ACT\",payload:c}),[t]),p=x(c=>t({type:\"SET_POST_FIELDS\",payload:c}),[t]),l=x(c=>t({type:\"RESET_POST_FIELDS\",payload:c}),[t]),r=x(c=>t({type:\"SET_GET_FIELDS\",payload:c}),[t]),b=x(c=>t({type:\"RESET_GET_FIELDS\",payload:c}),[t]),N=x(c=>t({type:\"SET_FORM_DATA\",payload:c}),[t]),y=x(c=>t({type:\"SET_ACTIVE_TAB\",payload:c}),[t]),S=x(c=>t({type:\"ADD_TAB\",payload:c}),[t]),R=x(c=>t({type:\"CLOSE_TAB\",payload:c}),[t]),h=x(c=>t({type:\"DELETE_ITEM_HISTORY\",payload:c}),[t]),z=x(c=>t({type:\"SET_HEADER\",payload:c}),[t]),Y=x(c=>t({type:\"ADD_HISTORY\",payload:c}),[t]),K=x(c=>t({type:\"SET_TABS_DATA\",payload:c}),[t]),Q=x(c=>t({type:\"SET_RESPONSE\",payload:c}),[t]),L=x(c=>t({type:\"SET_SCHEMAS_OBJ\",payload:c}),[t]),O=x(c=>t({type:\"SET_ACTS_OBJ\",payload:c}),[t]),V=x(c=>t({type:\"SET_E2E_FORMS\",payload:c}),[t]),P=x(c=>t({type:\"ADD_E2E_FORM\",payload:c}),[t]),m=x(c=>t({type:\"OPEN_MODAL\",payload:c}),[t]),g=Le(()=>({...s,setService:o,setSchema:i,setAct:u,setPostFields:p,resetPostFields:l,setGetFields:r,resetGetFields:b,setFormData:N,setHeader:z,setHistory:Y,setTabsData:K,setResponse:Q,setActsObj:O,setSchemasObj:L,setActiveTab:y,addTab:S,closeTab:R,deleteItemHistory:h,setE2eForms:V,addE2eForm:P,setModal:m}),[s]);return e(fe.Provider,{value:g,...a})};var I=()=>{let a=Oe(fe);return a},Ae=a=>{let{children:s}=a;return e(He,null,s)};var ce=a=>{let s={get:{},set:{}};for(let t in a)if(a[t]||a[t]===0){let o=t.split(\".\"),i=s;for(;o.length>1;){let u=o.shift();i[u]=i[u]||{},i=i[u]}i[o[0]]=a[t]}return s};var le=(a,s,t)=>{for(let o in a)typeof a[o]==\"object\"?le(a[o],s,t?`${t}.${o}`:o):s[`${t}.${o}`]=a[o];return s};function te(){return e(\"svg\",{width:\"30px\",height:\"35px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z\",stroke:\"#000000\",\"stroke-width\":\"2\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}))}function G(){return e(\"svg\",{width:\"25px\",height:\"25px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M11.2501 7.06066L8.03039 10.2803L6.96973 9.21967L12.0001 4.18934L17.0304 9.21967L15.9697 10.2803L12.7501 7.06066L12.7501 16.5L11.2501 16.5L11.2501 7.06066Z\",fill:\"lightcoral\"}),e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z\",fill:\"bisque\"}))}function he(){let{actsObj:a}=I(),s=()=>{let u=`data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(a))}`,p=document.createElement(\"a\");p.href=u,p.download=\"acts.json\",p.click()},t=[\"color-1\",\"color-2\",\"color-3\",\"color-4\",\"color-5\",\"color-6\",\"color-7\"],o=u=>Object.keys(u).map((p,l)=>{let r=A();return e(\"div\",{className:\"schema\"},e(\"div\",{className:\"schema-name\",onClick:()=>{document.getElementById(r)?.classList.toggle(\"open\")}},e(\"p\",{className:\"schema-title\"},p),e(\"span\",null,\"...\")),e(\"div\",{className:\"proceed-child-container\",id:r},i(a[p])))}),i=u=>Object.keys(u).map((p,l)=>{let r=A();return e(\"div\",{className:`inside-schema ${t[Math.floor(Math.random()*t.length)]}`},e(\"div\",{className:`inside ${typeof u[p]==\"object\"&&u[p].schema!==null&&\"schema-pointer\"}`,onClick:()=>{document.getElementById(r)?.classList.toggle(\"open\")}},e(\"p\",{className:\"schema-title\"},p),u[p].type&&e(\"p\",{className:\"schema-title schema-type\"},u[p].type),e(\"div\",null,\" \",typeof u[p]==\"object\"&&u[p].schema!==null&&e(\"span\",null,\"...\"))),e(\"div\",{id:r,className:\"proceed-child\"},typeof u[p]==\"object\"&&u[p]!==null&&u[p].schema!==null&&i(u[p].validator?u[p].validator.schema:u[p].schema?u[p].schema:u[p])))});return e(\"div\",{className:\"schema-modal\"},\" \",e(\"div\",{className:\"results-buttons\"},e(\"button\",{className:\" schema-export-button btn e2e-back-button e2e-export_results-button\",onClick:s},e(G,null),e(\"span\",null,\"Export\"))),e(\"div\",{className:\"search-box\"},e(\"input\",{className:\"input\",type:\"text\",placeholder:\"search...\"}),e(\"span\",{className:\"search-icon\"},e(te,null))),e(\"div\",{className:\"schema-list\"},o(a)))}function se(){return e(\"svg\",{width:\"25px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-miterlimit\":\"10\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"path\",{d:\"M8.57 10.7701L7 9.19012L8.57 7.62012\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z\",fill:\"bisque\"}))}var je=({setView:a})=>e(\"div\",{className:\"help\"},\" \",e(\"button\",{className:\"btn  e2e-back-button\",onClick:()=>{a(\"e2e\")}},e(se,null),e(\"span\",null,\"Back\")),e(\"section\",{className:\"e2e_help-content\"},e(\"p\",null,\"With E2E Test, you can test the whole application by sending a sequence of HTTP requests.\"),e(\"p\",null,\"In the image below, you can see the first view of the E2E test modal page, which contains a button bar at the top and two separate requests.\"),e(\"img\",{src:\"https://github.com/MiaadTeam/lesan/assets/6236123/829b3288-3d69-4fd0-a1fc-22d011b8d079\",alt:\"full screen e2e\",className:\"e2e_help--fullscreen-img\"}),e(\"hr\",null),e(\"p\",null,\"In the button bar, you have these buttons:\",e(\"img\",{src:\"https://github.com/MiaadTeam/lesan/assets/6236123/4edd6034-d6b2-4de9-8c43-8f2fe511aa14\",alt:\"full screen e2e\",className:\"e2e_help--fullscreen-img\"}),e(\"ul\",null,e(\"li\",null,\"Add: This button adds one request section.\"),e(\"li\",null,\"Run E2E Test: This button runs all requests and shows their results.\"),e(\"li\",null,\"Import: This button stands for importing an E2E config in JSON format.\"),e(\"li\",null,\"Export: This button stands for exporting an existing E2E config in JSON format.\"),e(\"li\",null,\"Help: This button switches to the help of the E2E modal page.\"))),e(\"hr\",null),e(\"div\",null,e(\"p\",null,\"Each request section have 2 side\"),e(\"img\",{src:\"https://github.com/MiaadTeam/lesan/assets/6236123/fa9ceb35-21dd-493a-82cc-cd7391f5fc79\",alt:\"full screen e2e\",className:\"e2e_help--fullscreen-img\"}),e(\"hr\",null),e(\"section\",{className:\"e2e_help--section---right-side\"},e(\"p\",null,\"The right side is a set of configurations for the repeat time of each request and capturing variables of the request response. In the Capture Variables section, you can add a pair of tuple inputs for the key name of the capture variable and its value. You can capture the value of a capture variable with braces syntax. For example, if you get back this response from a request:\",e(\"pre\",null,`{\n`,`  body: [\n`,`    {\n`,`      _id: 64c6839c50adc3cb65726934,\n`,`      name: \\u0647\\u0645\\u062F\\u0627\\u0646,\n`,`      enName: Hamedan,\n`,`      abb: HM\n`,`    }\n`,`  ],\n`,`  success: true\n`,`  }\n`,`}\n`),\"You can capture _id with [body][0][_id] or for name: [body][0][name].\"),e(\"img\",{src:\"https://github.com/MiaadTeam/lesan/assets/6236123/1cea1db3-44c2-49b5-8739-a9afa8a6e1fa\",alt:\"full screen e2e\",className:\"e2e_help--fullscreen-img\"})),e(\"hr\",null),e(\"section\",{className:\"e2e_help--section---right-side\"},e(\"img\",{src:\"https://github.com/MiaadTeam/lesan/assets/6236123/5c9899fa-8be6-42d1-8f4f-8fd965264645\",alt:\"full screen e2e\",className:\"e2e_help--fullscreen-img\"}),e(\"p\",null,\"The left side is a text area for writing headers and the body of the request in JSON format. In this text area, you can use a text parser to implement the captured value you captured before inside these symbols \",\"{}\",\".\")),e(\"hr\",null),e(\"p\",null,\"Also, we have some buttons on the top right side of each request section. With these buttons, you can move up and down and delete requests.\",e(\"img\",{src:\"https://github.com/MiaadTeam/lesan/assets/6236123/900a5b98-3e7f-460a-a756-403ecaedcf86\",alt:\"full screen e2e\",className:\"e2e_help--fullscreen-img\"}))),e(\"hr\",null),e(\"div\",null,e(\"p\",null,\"After clicking on the Run E2E Test button, you can see the result of each test. Also, in the result view, you can export the results in JSON format.\"),e(\"img\",{src:\"https://github.com/MiaadTeam/lesan/assets/6236123/8c367965-a1b7-40b8-8638-60d2d0ea2609\",alt:\"full screen e2e\",className:\"e2e_help--fullscreen-img\"})),e(\"hr\",null),e(\"div\",null,e(\"p\",null,\"Additionally, you can go to the E2E Test modal page from the main page by clicking on the Test icon inside the response header section. This way, you can add a new test section and prepopulate the Header and Body text areas with the sent request from the main page.\",e(\"img\",{src:\"https://github.com/MiaadTeam/lesan/assets/6236123/74dc9e93-2b41-4840-afc1-f4e8e83c9889\",alt:\"full screen e2e\",className:\"e2e_help--fullscreen-img\"})))));function ae(){return e(\"svg\",{width:\"25px\",height:\"25px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44771 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8Z\",fill:\"lightcoral\"}),e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z\",fill:\"bisque\"}))}var rt=()=>e(\"svg\",{width:\"25px\",viewBox:\"-0.5 0 25 25\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z\",stroke:\"bisque\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"path\",{id:\"Vector\",d:\"M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"})),U=rt;function ve(){return e(\"svg\",{width:\"25px\",viewBox:\"-0.5 0 25 25\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z\",stroke:\"bisque\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"path\",{d:\"M16 10.99L13.13 14.05C12.9858 14.2058 12.811 14.3298 12.6166 14.4148C12.4221 14.4998 12.2122 14.5437 12 14.5437C11.7878 14.5437 11.5779 14.4998 11.3834 14.4148C11.189 14.3298 11.0142 14.2058 10.87 14.05L8 10.99\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}))}function oe(){return e(\"svg\",{width:\"25px\",height:\"25px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M12 17V16.9929M12 14.8571C12 11.6429 15 12.3571 15 9.85714C15 8.27919 13.6568 7 12 7C10.6567 7 9.51961 7.84083 9.13733 9\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z\",fill:\"bisque\"}))}var ct=()=>e(\"svg\",{fill:\"bisque\",width:\"20px\",height:\"20px\",viewBox:\"0 0 64 64\",version:\"1.1\",xmlns:\"http://www.w3.org/2000/svg\",style:\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\"},e(\"rect\",{id:\"Icons\",x:\"-960\",y:\"-256\",width:\"1280\",height:\"800\",style:\"fill:none;\"}),e(\"g\",{id:\"Icons1\"},e(\"g\",{id:\"Strike\"}),e(\"g\",{id:\"H1\"}),e(\"g\",{id:\"H2\"}),e(\"g\",{id:\"H3\"}),e(\"g\",{id:\"list-ul\"}),e(\"g\",{id:\"hamburger-1\"}),e(\"g\",{id:\"hamburger-2\"}),e(\"g\",{id:\"list-ol\"}),e(\"g\",{id:\"list-task\"}),e(\"g\",{id:\"trash\"}),e(\"g\",{id:\"vertical-menu\"}),e(\"g\",{id:\"horizontal-menu\"}),e(\"g\",{id:\"sidebar-2\"}),e(\"g\",{id:\"Pen\"}),e(\"g\",{id:\"Pen1\"}),e(\"g\",{id:\"clock\"}),e(\"g\",{id:\"external-link\"}),e(\"g\",{id:\"hr\"}),e(\"g\",{id:\"info\"}),e(\"g\",{id:\"warning\"}),e(\"g\",{id:\"plus-circle\"}),e(\"g\",{id:\"minus-circle\"}),e(\"g\",{id:\"vue\"}),e(\"g\",{id:\"cog\"}),e(\"g\",{id:\"logo\"}),e(\"g\",{id:\"radio-check\"}),e(\"g\",{id:\"eye-slash\"},e(\"path\",{d:\"M13.673,10.345l-3.097,3.096l39.853,39.854l3.097,-3.097l-39.853,-39.853Z\"}),e(\"path\",{d:\"M17.119,19.984l2.915,2.915c-3.191,2.717 -5.732,6.099 -7.374,9.058l-0.005,0.01c4.573,7.646 11.829,14.872 20.987,13.776c2.472,-0.296 4.778,-1.141 6.885,-2.35l2.951,2.95c-4.107,2.636 -8.815,4.032 -13.916,3.342c-9.198,-1.244 -16.719,-8.788 -21.46,-17.648c2.226,-4.479 5.271,-8.764 9.017,-12.053Zm6.63,-4.32c2.572,-1.146 5.355,-1.82 8.327,-1.868c0.165,-0.001 2.124,0.092 3.012,0.238c0.557,0.092 1.112,0.207 1.659,0.35c8.725,2.273 15.189,10.054 19.253,17.653c-1.705,3.443 -3.938,6.398 -6.601,9.277l-2.827,-2.827c1.967,-2.12 3.622,-4.161 4.885,-6.45c0,0 -1.285,-2.361 -2.248,-3.643c-0.619,-0.824 -1.27,-1.624 -1.954,-2.395c-0.54,-0.608 -2.637,-2.673 -3.136,-3.103c-3.348,-2.879 -7.279,-5.138 -11.994,-5.1c-1.826,0.029 -3.582,0.389 -5.249,0.995l-3.127,-3.127Z\",style:\"fill-rule:nonzero;\"}),e(\"path\",{d:\"M25.054,27.92l2.399,2.398c-0.157,0.477 -0.243,0.987 -0.243,1.516c0,2.672 2.169,4.841 4.841,4.841c0.529,0 1.039,-0.085 1.516,-0.243l2.399,2.399c-1.158,0.65 -2.494,1.02 -3.915,1.02c-4.425,0 -8.017,-3.592 -8.017,-8.017c0,-1.421 0.371,-2.756 1.02,-3.914Zm6.849,-4.101c0.049,-0.001 0.099,-0.002 0.148,-0.002c4.425,0 8.017,3.593 8.017,8.017c0,0.05 0,0.099 -0.001,0.148l-8.164,-8.163Z\"})),e(\"g\",{id:\"eye\"}),e(\"g\",{id:\"toggle-off\"}),e(\"g\",{id:\"shredder\"}),e(\"g\",{id:\"spinner--loading--dots-\"}),e(\"g\",{id:\"react\"}),e(\"g\",{id:\"check-selected\"}),e(\"g\",{id:\"turn-off\"}),e(\"g\",{id:\"code-block\"}),e(\"g\",{id:\"user\"}),e(\"g\",{id:\"coffee-bean\"}),e(\"g\",{id:\"coffee-beans\"},e(\"g\",{id:\"coffee-bean1\"})),e(\"g\",{id:\"coffee-bean-filled\"}),e(\"g\",{id:\"coffee-beans-filled\"},e(\"g\",{id:\"coffee-bean2\"})),e(\"g\",{id:\"clipboard\"}),e(\"g\",{id:\"clipboard-paste\"}),e(\"g\",{id:\"clipboard-copy\"}),e(\"g\",{id:\"Layer1\"}))),qe=ct;function be(){return e(\"svg\",{width:\"25px\",height:\"25px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M12.75 13.9393L15.9697 10.7197L17.0303 11.7803L12 16.8107L6.96967 11.7803L8.03033 10.7197L11.25 13.9393L11.25 4.5L12.75 4.5L12.75 13.9393Z\",fill:\"lightcoral\"}),e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z\",fill:\"bisque\"}))}function ye(){return e(\"svg\",{width:\"25px\",height:\"25px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M13.8876 9.9348C14.9625 10.8117 15.5 11.2501 15.5 12C15.5 12.7499 14.9625 13.1883 13.8876 14.0652C13.5909 14.3073 13.2966 14.5352 13.0261 14.7251C12.7888 14.8917 12.5201 15.064 12.2419 15.2332C11.1695 15.8853 10.6333 16.2114 10.1524 15.8504C9.6715 15.4894 9.62779 14.7336 9.54038 13.2222C9.51566 12.7947 9.5 12.3757 9.5 12C9.5 11.6243 9.51566 11.2053 9.54038 10.7778C9.62779 9.26636 9.6715 8.51061 10.1524 8.1496C10.6333 7.78859 11.1695 8.11466 12.2419 8.76679C12.5201 8.93597 12.7888 9.10831 13.0261 9.27492C13.2966 9.46483 13.5909 9.69274 13.8876 9.9348Z\",stroke:\"lightcoral\",\"stroke-width\":\"2\"}),e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z\",fill:\"bisque\"}))}var $e=()=>e(\"svg\",{fill:\"bisque\",width:\"20px\",height:\"20px\",viewBox:\"0 0 64 64\",version:\"1.1\",xmlns:\"http://www.w3.org/2000/svg\",style:\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\"},e(\"rect\",{id:\"Icons\",x:\"-896\",y:\"-256\",width:\"1280\",height:\"800\",style:\"fill:none;\"}),e(\"g\",{id:\"Icons1\"},e(\"g\",{id:\"Strike\"}),e(\"g\",{id:\"H1\"}),e(\"g\",{id:\"H2\"}),e(\"g\",{id:\"H3\"}),e(\"g\",{id:\"list-ul\"}),e(\"g\",{id:\"hamburger-1\"}),e(\"g\",{id:\"hamburger-2\"}),e(\"g\",{id:\"list-ol\"}),e(\"g\",{id:\"list-task\"}),e(\"g\",{id:\"trash\"}),e(\"g\",{id:\"vertical-menu\"}),e(\"g\",{id:\"horizontal-menu\"}),e(\"g\",{id:\"sidebar-2\"}),e(\"g\",{id:\"Pen\"}),e(\"g\",{id:\"Pen1\"}),e(\"g\",{id:\"clock\"}),e(\"g\",{id:\"external-link\"}),e(\"g\",{id:\"hr\"}),e(\"g\",{id:\"info\"}),e(\"g\",{id:\"warning\"}),e(\"g\",{id:\"plus-circle\"}),e(\"g\",{id:\"minus-circle\"}),e(\"g\",{id:\"vue\"}),e(\"g\",{id:\"cog\"}),e(\"g\",{id:\"logo\"}),e(\"g\",{id:\"radio-check\"}),e(\"g\",{id:\"eye-slash\"}),e(\"g\",{id:\"eye\"},e(\"path\",{d:\"M32.513,13.926c10.574,0.15 19.141,9.894 23.487,18.074c0,0 -1.422,2.892 -2.856,4.895c-0.694,0.969 -1.424,1.913 -2.191,2.826c-0.547,0.65 -1.112,1.283 -1.698,1.898c-5.237,5.5 -12.758,9.603 -20.7,8.01c-8.823,-1.77 -15.732,-9.498 -20.058,-17.629c0,0 1.248,-2.964 2.69,-4.964c0.646,-0.897 1.324,-1.77 2.034,-2.617c0.544,-0.649 1.108,-1.282 1.691,-1.897c4.627,-4.876 10.564,-8.63 17.601,-8.596Zm-0.037,4c-5.89,-0.022 -10.788,3.267 -14.663,7.35c-0.527,0.555 -1.035,1.127 -1.527,1.713c-0.647,0.772 -1.265,1.569 -1.854,2.386c-0.544,0.755 -1.057,1.805 -1.451,2.59c3.773,6.468 9.286,12.323 16.361,13.742c6.563,1.317 12.688,-2.301 17.016,-6.846c0.529,-0.555 1.04,-1.128 1.534,-1.715c0.7,-0.833 1.366,-1.694 1.999,-2.579c0.557,-0.778 1.144,-1.767 1.588,-2.567c-3.943,-6.657 -10.651,-13.944 -19.003,-14.074Z\"}),e(\"path\",{d:\"M32.158,23.948c4.425,0 8.018,3.593 8.018,8.017c0,4.425 -3.593,8.017 -8.018,8.017c-4.424,0 -8.017,-3.592 -8.017,-8.017c0,-4.424 3.593,-8.017 8.017,-8.017Zm0,4.009c2.213,0 4.009,1.796 4.009,4.008c0,2.213 -1.796,4.009 -4.009,4.009c-2.212,0 -4.008,-1.796 -4.008,-4.009c0,-2.212 1.796,-4.008 4.008,-4.008Z\"})),e(\"g\",{id:\"toggle-off\"}),e(\"g\",{id:\"shredder\"}),e(\"g\",{id:\"spinner--loading--dots-\"}),e(\"g\",{id:\"react\"}),e(\"g\",{id:\"check-selected\"}),e(\"g\",{id:\"turn-off\"}),e(\"g\",{id:\"code-block\"}),e(\"g\",{id:\"user\"}),e(\"g\",{id:\"coffee-bean\"}),e(\"g\",{id:\"coffee-beans\"},e(\"g\",{id:\"coffee-bean1\"})),e(\"g\",{id:\"coffee-bean-filled\"}),e(\"g\",{id:\"coffee-beans-filled\"},e(\"g\",{id:\"coffee-bean2\"})),e(\"g\",{id:\"clipboard\"}),e(\"g\",{id:\"clipboard-paste\"}),e(\"g\",{id:\"clipboard-copy\"}),e(\"g\",{id:\"Layer1\"})));function Ce(){return e(\"svg\",{width:\"25px\",viewBox:\"-0.5 0 25 25\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z\",stroke:\"bisque\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"path\",{d:\"M8 13.8599L10.87 10.8C11.0125 10.6416 11.1868 10.5149 11.3815 10.4282C11.5761 10.3415 11.7869 10.2966 12 10.2966C12.2131 10.2966 12.4239 10.3415 12.6185 10.4282C12.8132 10.5149 12.9875 10.6416 13.13 10.8L16 13.8599\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}))}var Ve={fontFamily:'-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial',display:\"inline-block\",borderRadius:3,padding:\"10px 10px\",color:\"#f8f8f2\",textShadow:\"1px 1px black\",whiteSpace:\"pre-wrap\"};var dt=/(\"(\\\\u[a-zA-Z0-9]{4}|\\\\[^u]|[^\\\\\"])*\"(\\s*:)?|\\b(true|false|null)\\b|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?)/g,pt=a=>JSON.stringify(a,mt,2).replace(/&/g,\"&amp;\").replace(/</g,\"&lt;\").replace(/>/g,\"&gt;\").replace(dt,t=>{let o=\"cute-number\",i=t;return/^\"/.test(t)?/:$/.test(t)?(o=\"cute-key\",i=i.replace(\":\",'<span class=\"cute-colon\">:</span>')):t==='\"undefined\"'?o=\"cute-undefined\":t==='\"[Function]\"'?o=\"cute-function\":o=\"cute-string\":/true|false/.test(t)?o=\"cute-boolean\":/null/.test(t)&&(o=\"cute-null\"),`<span class=\"${o}\">${i}</span>`}),mt=(a,s)=>typeof s==\"function\"?\"[Function]\":typeof s>\"u\"?\"undefined\":s,Pe=a=>pt(a).replace(/\"/g,\"\");var H=({jsonData:a})=>{let s=Pe(a);return e(q,null,e(\"pre\",{style:Ve,dangerouslySetInnerHTML:{__html:s}}))};function Be({baseUrl:a}){let{e2eForms:s,setE2eForms:t}=I(),[o,i]=C(!0),[u,p]=C(!1),[l,r]=C({allReqPerformance:0,numberRequest:0,sequenceDetail:[]}),b=(m,g)=>{if(!(m===0&&g<=0)){let c=s[m];s.splice(m,1),s.splice(g,0,c),t([...s])}},N=m=>{s[m],s.splice(m,1),t([...s])},[y,S]=C(\"e2e\"),[R,h]=C([]),z=()=>{let m=`data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(s))}`,g=document.createElement(\"a\");g.href=m,g.download=\"Configdata.json\",g.click()},Y=m=>{let g=new FileReader;g.readAsText(m.target.files[0],\"UTF-8\"),g.onload=c=>{let E=JSON.parse(c.target.result);t(E)}},K=()=>{let m=`data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(R))}`,g=document.createElement(\"a\");g.href=m,g.download=\"data.json\",g.click()},Q=async({baseUrl:m,options:g})=>await(await fetch(`${m}lesan`,g)).json(),L=(m,g)=>{for(let c in m){typeof m[c]==\"object\"&&L(m[c],g);let E=m[c];if(typeof E==\"string\"&&E.includes(\"{\")){let j=[];for(let _=0;_<E.length;_++)E[_]===\"{\"&&j.push(_);let M=[];for(let _=0;_<E.length;_++)E[_]===\"}\"&&M.push(_);j.map((_,F)=>E.slice(_+1,M[F])).forEach(_=>{for(let F of g)F.key===_&&(m[c]=m[c].replace(`{${_}}`,F.value))})}}},O=async()=>{let m=new Set,g=performance.now(),c={allReqPerformance:0,numberRequest:0,sequenceDetail:[]},E=0;for await(let M of s){let B=JSON.parse(M.bodyHeaders);L(B,m);let _={method:\"POST\",headers:{\"Content-Type\":\"application/json\",...B.headers},body:JSON.stringify(B.body)},F,ee=performance.now(),w=0,n=0,f=0;for(let d=0;d<M.repeat;d++){let D=performance.now();F=await Q({baseUrl:a,options:_});let J=performance.now();w+=1,E+=1,F.success?n+=1:f+=1,h(Z=>[...Z,{id:A(),request:{..._,body:B.body},response:F,responseTime:J-D}])}let T=performance.now();[...M.captures].filter(d=>d.key&&d.value).map(d=>{let D=d.value.split(\"[\"),J=[];return D.forEach(Z=>{let re=Z.slice(0,Z.indexOf(\"]\"));isNaN(Number(re))||(re=Number(re)),J.push(re)}),J.shift(),{key:d.key,value:J}}).forEach(d=>{if(d.value.length>0){let D=F;d.value.forEach(J=>{D=D[J]}),m.add({key:d.key,value:D})}}),c.sequenceDetail.push({bodyHeader:M.bodyHeaders,repeat:w,time:T-ee,success:n,fails:f})}let j=performance.now();r({...c,numberRequest:E,allReqPerformance:j-g})},V=m=>{let g=[...s];g[m].repeat+=1,t([...g])},P=m=>{let g=[...s];g[m].repeat>0&&(g[m].repeat-=1),t([...g])};return e(\"div\",{className:\"e2e modal-content\"},y===\"result\"?e(q,null,e(\"br\",null),e(\"div\",{className:\"results\"},e(\"div\",{className:\"results-buttons\"},e(\"button\",{className:\"btn  e2e-back-button\",onClick:()=>{h([]),S(\"e2e\")}},e(se,null),e(\"span\",null,\"Back\")),e(\"button\",{className:\"btn  e2e-back-button e2e-export_results-button\",onClick:K},e(G,null),e(\"span\",null,\"Export\"))),e(\"div\",{className:\"container-e2e\",onClick:()=>i(!o)},e(\"span\",{className:\"container-header\"},\"REQUESTS\"),e(\"span\",{className:\"container-header\"},o?e(qe,null):e($e,null))),o&&R.map(m=>e(\"div\",{key:m.id,className:\"container-detail\"},e(\"section\",{className:\"container-re\"},e(\"span\",{className:\"container-re-title\"},\"REQUEST\"),e(H,{jsonData:m.request})),e(\"section\",{className:\"container-re container-response\"},e(\"span\",{className:\"container-re-title\"},\"RESPONSE\"),e(\"span\",{className:\"e2e-re-timeNumber-request\"},m.responseTime,\"ms\"),e(H,{jsonData:m.response}))))),l.sequenceDetail.map((m,g)=>e(\"div\",{key:g,className:\"container-detail\"},e(\"section\",{className:\"sequence-re\"},e(\"span\",{className:\"container-re-title\"},\"Body Header\"),e(H,{jsonData:JSON.parse(m.bodyHeader)})),e(\"section\",{className:\"sequence-re sequence-response \"},e(\"span\",{className:\"container-re-title\"},\"Description\"),e(\"div\",{className:\"detail-sequence\"},e(\"p\",null,\"you send \",e(\"span\",null,m.repeat),\" times of this request\"),e(\"p\",null,\"the avrage time for each request is\",e(\"span\",null,\" \",m.time/m.repeat,\"ms\")),e(\"p\",null,\"and whole time is\",e(\"span\",null,\" \",m.time,\"ms \")),e(\"p\",null,\"this sequence sends\",e(\"span\",null,\" \",m.success,\" \"),\" success request and\",\" \",e(\"span\",null,m.fails),\" it be fails\")))))):y===\"e2e\"?e(q,null,e(\"div\",{className:\"sidebar__section sidebar__section--headers\"},s.map((m,g)=>e(q,null,e(\"div\",{className:\"sidebar__input-double\",key:m.id},s.length>1&&e(\"div\",{className:\"e2e-move-buttons\"},e(\"div\",{className:\"e2e-move-div\",onClick:()=>b(g,g-1)},e(Ce,null)),e(\"div\",{className:\"e2e-move-div\",onClick:()=>b(g,g+1)},e(ve,null)),e(\"div\",{className:\"e2e-move-div e2e-move-close\",onClick:()=>N(g)},e(U,null))),e(\"div\",{className:\"sidebar__section-body-heading\"},e(\"div\",{className:\"sidebar__section-heading\"},\"set test body and headers\"),e(\"textarea\",{placeholder:\"please paste a request body here\",value:m.bodyHeaders,name:`${m.id}-body`,rows:18,onChange:c=>{let E=[...s];E[g].bodyHeaders=c.target.value,t([...E])}})),e(\"div\",{className:\"sidebar__section-capture\"},e(\"div\",{className:\"e2e_sidebar__section-heading\"},\"set repeat time\"),e(\"div\",{className:\"repeat__number\"},e(\"input\",{className:\"input\",placeholder:\"set repeat number\",value:m.repeat,name:`${m.id}-repeat`,type:\"number\",onChange:c=>{let E=[...s];E[g].repeat=c.target.value,t([...E])}}),e(\"button\",{className:\"e2e-back-button e2e-export_results-button\",onClick:()=>V(g)},\"+\"),e(\"button\",{className:\"e2e-back-button e2e-export_results-button\",onClick:()=>P(g)},\"-\")),e(\"div\",{className:\"e2e_sidebar__section-heading\"},\"capture variables\"),e(\"button\",{className:\"btn btn--add e2e-back-button e2e-export_results-button e2e-add-capture \",onClick:()=>{let c=[...s];c[g].captures.push({key:\"\",value:\"\"}),t([...c])}},\"add capture\"),m.captures.map((c,E)=>e(q,null,e(\"div\",{className:\"sidebar__section-add-capture\"},e(\"input\",{className:\"input\",placeholder:\"set a variable name\",value:c.key,onChange:j=>{let M=[...s];M[g].captures[E].key=j.target.value,t([...M])}}),e(\"input\",{className:\"input\",placeholder:\"set a value for variable\",value:c.value,onChange:j=>{let M=[...s];M[g].captures[E].value=j.target.value,t([...M])}})),e(\"hr\",null)))))))),e(\"button\",{className:\"btn btn-show-results-buttons \",onClick:()=>p(!u)},\"show btn\"),e(\"div\",{className:\"results-buttons\",\"data-show\":u===!0},e(\"button\",{className:\"btn btn-e2e-action e2e-back-button e2e-export_results-button\",onClick:()=>{t([...s,ue()])}},e(ae,null),e(\"span\",null,\"Add\")),e(\"button\",{className:\"btn btn-e2e-action e2e-back-button e2e-run-botton e2e-export_results-button\",onClick:async()=>{S(\"result\"),await O()}},e(ye,null),e(\"span\",null,\"Run E2E Test\")),e(\"input\",{id:\"actual-btn\",type:\"file\",onChange:Y,hidden:!0}),e(\"label\",{htmlFor:\"actual-btn\",className:\"btn btn-e2e-action e2e-back-button e2e-export_results-button\"},e(be,null),e(\"span\",null,\"Import\")),e(\"button\",{className:\"btn btn-e2e-action e2e-back-button e2e-export_results-button\",onClick:z},e(G,null),e(\"span\",null,\"Export\")),e(\"button\",{onClick:()=>S(\"help\"),className:\"btn btn-e2e-action e2e-back-button e2e-export_results-button\"},e(oe,null),e(\"span\",null,\"Help\")))):y===\"help\"?e(je,{setView:S}):\"\")}function de(a){let s=Math.floor(a/36e5),t=Math.floor(a%36e5/6e4),o=Math.floor(a%36e4%6e4/1e3);return s>0?`${s}h ${t}m ${o}s`:t>0?`${t}m ${o}s`:o>0?`${o}s`:`${a}ms`}var Ze=(a,s)=>{let t=W(!0);$(()=>{let o=()=>{};if(t.current?t.current=!1:o=a(),o&&typeof o==\"function\")return o},s)};function Se(){return e(\"svg\",{id:\"Layer_1\",\"data-name\":\"Layer 1\",xmlns:\"http://www.w3.org/2000/svg\",viewBox:\"0 0 105.7 122.88\",width:20},e(\"path\",{fill:\"white\",d:\"M30.46,14.57V5.22A5.18,5.18,0,0,1,32,1.55v0A5.19,5.19,0,0,1,35.68,0H70a5.22,5.22,0,0,1,3.67,1.53l0,0a5.22,5.22,0,0,1,1.53,3.67v9.35h27.08a3.36,3.36,0,0,1,3.38,3.37V29.58A3.38,3.38,0,0,1,102.32,33H98.51l-8.3,87.22a3,3,0,0,1-2.95,2.69H18.43a3,3,0,0,1-3-2.95L7.19,33H3.37A3.38,3.38,0,0,1,0,29.58V17.94a3.36,3.36,0,0,1,3.37-3.37Zm36.27,0V8.51H39v6.06ZM49.48,49.25a3.4,3.4,0,0,1,6.8,0v51.81a3.4,3.4,0,1,1-6.8,0V49.25ZM69.59,49a3.4,3.4,0,1,1,6.78.42L73,101.27a3.4,3.4,0,0,1-6.78-.43L69.59,49Zm-40.26.42A3.39,3.39,0,1,1,36.1,49l3.41,51.8a3.39,3.39,0,1,1-6.77.43L29.33,49.46ZM92.51,33.38H13.19l7.94,83.55H84.56l8-83.55Z\"}))}function Je({setFormFromHistory:a}){let{history:s,setHistory:t,deleteItemHistory:o}=I(),[i,u]=C(\"\");return Ze(()=>{localStorage.setItem(\"localHistory\",JSON.stringify(s))},[s]),e(\"div\",{className:\"history modal-content\"},s&&s?.length>0?e(\"div\",{className:\"\"},e(\"br\",null),s.map((p,l)=>e(\"div\",{className:\"container-detail\",id:p.id},e(\"section\",{className:\"container-re\"},e(\"div\",{style:{position:\"relative\"}},e(\"span\",{className:\"container-re-title\"},\"REQUEST\"),e(\"span\",{className:\"history-re-detail-date\"},p.reqDate)),e(\"div\",{className:\"container-re-detail\"},e(\"div\",{className:\"container-re-detail-title\"},\" \",e(H,{jsonData:p.request.body.model}),e(\"span\",null,\"|\"),e(\"div\",null,e(H,{jsonData:p.request.body.act}))),i===p.id?e(\"button\",{onClick:()=>u(\"\"),className:\"history-re-detail-button\"},\"Hide\",e(\"span\",{className:\"history-re-detail-button-icon\"},\"\\u2013\")):e(\"button\",{onClick:()=>{u(p.id),document.getElementById(p.id)?.scrollIntoView()},className:\"history-re-detail-button\"},\"Show\",\" \",e(\"span\",{className:\"history-re-detail-button-icon\"},\"+\"))),e(\"div\",{className:\"history-re-detail-complete\",\"data-show\":i===p.id},\" \",e(H,{jsonData:p.request}))),e(\"section\",{className:\"container-re container-response\"},e(\"div\",{className:\"history-re-title_delete\",style:{position:\"relative\"},onClick:r=>{r.stopPropagation(),o(l)}},e(\"span\",{className:\"history-re-delete\"},e(U,null)),e(\"span\",{className:\"container-re-title history-response-title\"},\"RESPONSE\"),e(\"span\",{className:\"history-re-detail-date history-response-took\"},de(p.response.tookTime))),e(\"div\",{className:\"container-re-detail\"},e(\"div\",{className:\"history-re-detail-title\"},e(\"div\",{className:\"history-re-response-title\"},\" \",e(\"span\",{className:\"history-re-response-title-status\"},\"success:\"),e(\"div\",{className:\"history-re-response-info\"},e(H,{jsonData:p.response.success})))),e(\"button\",{onClick:()=>a(p.request),className:\"history-re-detail-button\"},\"Use\",\" \",e(\"span\",{className:\"history-re-detail-button-icon\"},\"\\u279C\",\" \"))),e(\"div\",{className:\"history-re-detail-complete\",\"data-show\":i===p.id},\" \",e(H,{jsonData:p.response})))))):e(\"span\",{className:\"no-history\"},'\"There is no history to display\"'),s&&s.length>0?e(\"div\",{className:\"clear-history\"},e(\"button\",{className:\"btn clear-history-button tooltip\",onClick:()=>{confirm(\"Clear All History?\")==!0&&t([])}},\" \",e(Se,null),e(\"span\",{className:\"tooltip-text\"},\"Clear History\"))):\"\")}function Ee(){return e(\"svg\",{width:\"25px\",viewBox:\"0 0 26 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},\" \",e(\"path\",{d:\"M4 6V19C4 20.6569 5.34315 22 7 22H17C18.6569 22 20 20.6569 20 19V9C20 7.34315 18.6569 6 17 6H4ZM4 6V5\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\"}),\" \",e(\"path\",{d:\"M18 6.00002V6.75002H18.75V6.00002H18ZM15.7172 2.32614L15.6111 1.58368L15.7172 2.32614ZM4.91959 3.86865L4.81353 3.12619H4.81353L4.91959 3.86865ZM5.07107 6.75002H18V5.25002H5.07107V6.75002ZM18.75 6.00002V4.30604H17.25V6.00002H18.75ZM15.6111 1.58368L4.81353 3.12619L5.02566 4.61111L15.8232 3.0686L15.6111 1.58368ZM4.81353 3.12619C3.91638 3.25435 3.25 4.0227 3.25 4.92895H4.75C4.75 4.76917 4.86749 4.63371 5.02566 4.61111L4.81353 3.12619ZM18.75 4.30604C18.75 2.63253 17.2678 1.34701 15.6111 1.58368L15.8232 3.0686C16.5763 2.96103 17.25 3.54535 17.25 4.30604H18.75ZM5.07107 5.25002C4.89375 5.25002 4.75 5.10627 4.75 4.92895H3.25C3.25 5.9347 4.06532 6.75002 5.07107 6.75002V5.25002Z\",fill:\"lightcoral\"}),\" \",e(\"path\",{opacity:\"0.5\",d:\"M8 12H16\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\"}),\" \",e(\"path\",{opacity:\"0.5\",d:\"M8 15.5H13.5\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\"}),\" \"))}function Te(){return e(\"svg\",{width:\"25px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{\"fill-rule\":\"evenodd\",opacity:\"0.5\",\"clip-rule\":\"evenodd\",d:\"M5.07868 5.06891C8.87402 1.27893 15.0437 1.31923 18.8622 5.13778C22.6824 8.95797 22.7211 15.1313 18.9262 18.9262C15.1312 22.7211 8.95793 22.6824 5.13774 18.8622C2.87389 16.5984 1.93904 13.5099 2.34047 10.5812C2.39672 10.1708 2.775 9.88377 3.18537 9.94002C3.59575 9.99627 3.88282 10.3745 3.82658 10.7849C3.4866 13.2652 4.27782 15.881 6.1984 17.8016C9.44288 21.0461 14.6664 21.0646 17.8655 17.8655C21.0646 14.6664 21.046 9.44292 17.8015 6.19844C14.5587 2.95561 9.33889 2.93539 6.13935 6.12957L6.88705 6.13333C7.30126 6.13541 7.63535 6.47288 7.63327 6.88709C7.63119 7.3013 7.29372 7.63539 6.87951 7.63331L4.33396 7.62052C3.92269 7.61845 3.58981 7.28556 3.58774 6.8743L3.57495 4.32874C3.57286 3.91454 3.90696 3.57707 4.32117 3.57498C4.73538 3.5729 5.07285 3.907 5.07493 4.32121L5.07868 5.06891Z\",fill:\"lightcoral\"}),e(\"path\",{d:\"M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.5429 12.6036C11.3554 12.416 11.25 12.1617 11.25 11.8964V8C11.25 7.58579 11.5858 7.25 12 7.25Z\",fill:\"lightcoral\"}))}function _e(){return e(\"svg\",{height:\"25px\",width:\"25px\",version:\"1.1\",id:\"Layer_1\",xmlns:\"http://www.w3.org/2000/svg\",viewBox:\"0 0 512 512\",fill:\"#000000\"},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},\" \",e(\"circle\",{opacity:.34,style:\"fill:lightcoral;\",cx:\"256.602\",cy:\"226.267\",r:\"171.059\"}),\" \",e(\"path\",{style:\"fill:lightcoral\",d:\"M482.195,226.196C482.195,101.471,380.725,0,256.001,0S29.804,101.471,29.804,226.196 c0,7.409,6.007,13.416,13.416,13.416s13.416-6.008,13.416-13.416c0-109.93,89.434-199.363,199.363-199.363 s199.363,89.434,199.363,199.363c0,109.928-89.434,199.362-199.363,199.362h-23.276l33.282-37.255 c4.937-5.525,4.458-14.007-1.067-18.944c-5.525-4.937-14.008-4.457-18.944,1.068l-47.576,53.255c-7.788,8.718-7.788,21.866,0,30.584 l47.576,53.255c2.651,2.968,6.322,4.478,10.01,4.478c3.181,0,6.375-1.126,8.934-3.41c5.526-4.937,6.004-13.419,1.067-18.944 l-33.282-37.255h23.276C380.725,452.39,482.195,350.919,482.195,226.196z\"}),\" \"))}function we(){return e(\"svg\",{fill:\"lightcoral\",height:\"25px\",width:\"25px\",viewBox:\"0 0 436.668 436.668\"},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},\" \",e(\"g\",null,\" \",e(\"path\",{opacity:.34,d:\"M203.334,85.818v59.141c4.884-0.8,9.893-1.223,15-1.223s10.116,0.423,15,1.223V85.818c14.657-5.935,25-20.296,25-37.081 c0-22.092-17.909-40-40-40s-40,17.908-40,40C178.334,65.522,188.677,79.883,203.334,85.818z\"}),\" \",e(\"path\",{opacity:.34,d:\"M70.642,204.021l56.242,18.274c1.539-10.139,4.732-19.74,9.292-28.525L79.912,175.49 c-1.115-15.774-11.577-30.049-27.541-35.236c-21.01-6.827-43.576,4.672-50.403,25.682c-6.827,21.01,4.672,43.576,25.682,50.403 C43.614,221.525,60.468,216.126,70.642,204.021z\"}),\" \",e(\"path\",{opacity:.34,d:\"M152.577,301.224l-34.792,47.887c-15.346-3.813-32.156,1.725-42.022,15.305c-12.985,17.872-9.023,42.887,8.849,55.872 s42.887,9.023,55.872-8.849c9.866-13.579,9.939-31.277,1.571-44.694l34.772-47.86C167.8,314.333,159.616,308.347,152.577,301.224z\"}),\" \",e(\"path\",{opacity:.34,d:\"M318.883,349.112l-34.792-47.887c-7.039,7.122-15.223,13.109-24.25,17.661l34.772,47.86 c-8.369,13.417-8.296,31.115,1.571,44.694c12.985,17.872,38,21.834,55.872,8.849s21.834-38,8.849-55.872 C351.038,350.837,334.229,345.298,318.883,349.112z\"}),\" \",e(\"path\",{opacity:.34,d:\"M434.699,165.936c-6.827-21.01-29.393-32.508-50.403-25.682c-15.964,5.187-26.426,19.462-27.541,35.236l-56.263,18.281 c4.559,8.784,7.752,18.386,9.292,28.525l56.242-18.274c10.174,12.105,27.028,17.504,42.992,12.318 C430.028,209.512,441.526,186.946,434.699,165.936z\"}),\" \",e(\"path\",{d:\"M280.834,236.237c0-34.462-28.037-62.5-62.5-62.5s-62.5,28.038-62.5,62.5s28.037,62.5,62.5,62.5 S280.834,270.7,280.834,236.237z\"}),\" \"),\" \"))}function Ne(){return e(\"svg\",{width:\"25px\",height:25,viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M3 9.10986V14.8799C3 16.9999 3 16.9999 5 18.3499L10.5 21.5299C11.33 22.0099 12.68 22.0099 13.5 21.5299L19 18.3499C21 16.9999 21 16.9999 21 14.8899V9.10986C21 6.99986 21 6.99986 19 5.64986L13.5 2.46986C12.68 1.98986 11.33 1.98986 10.5 2.46986L5 5.64986C3 6.99986 3 6.99986 3 9.10986Z\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\",opacity:.34}),e(\"path\",{d:\"M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}))}function xe(){return e(\"svg\",{width:\"25px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{opacity:.5,d:\"M9.74872 2.49415L18.1594 7.31987M9.74872 2.49415L2.65093 14.7455C1.31093 17.0584 2.10615 20.0159 4.42709 21.3513C6.74803 22.6867 9.7158 21.8942 11.0558 19.5813L12.5511 17.0003L14.1886 14.1738L15.902 11.2163L18.1594 7.31987M9.74872 2.49415L8.91283 2M18.1594 7.31987L19 7.80374\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\"}),e(\"path\",{d:\"M15.9021 11.2164L13.3441 9.74463M14.1887 14.1739L9.98577 11.7557M12.5512 17.0004L9.93848 15.4972\",stroke:\"lightcpral\",\"stroke-width\":\"1.5\",\"stroke-linecap\":\"round\"}),e(\"path\",{d:\"M22 14.9166C22 16.0672 21.1046 16.9999 20 16.9999C18.8954 16.9999 18 16.0672 18 14.9166C18 14.1967 18.783 13.2358 19.3691 12.6174C19.7161 12.2512 20.2839 12.2512 20.6309 12.6174C21.217 13.2358 22 14.1967 22 14.9166Z\",stroke:\"lightcoral\",\"stroke-width\":\"1.5\"}))}function pe(){return e(\"svg\",{width:\"28px\",fill:\"white\",viewBox:\"0 0 32 32\",style:\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\",version:\"1.1\"},e(\"path\",{d:\"M9.101,7l8.899,0c1.857,-0 3.637,0.737 4.95,2.05c1.313,1.313 2.05,3.093 2.05,4.95l0,8.899c0.953,-0.195 1.837,-0.665 2.536,-1.363c0.937,-0.938 1.464,-2.21 1.464,-3.536c0,-2.977 0,-7.023 0,-10c0,-1.326 -0.527,-2.598 -1.464,-3.536c-0.938,-0.937 -2.21,-1.464 -3.536,-1.464c-2.977,0 -7.023,0 -10,0c-1.326,-0 -2.598,0.527 -3.536,1.464c-0.698,0.699 -1.168,1.583 -1.363,2.536Z\"}),e(\"path\",{d:\"M23,14c0,-1.326 -0.527,-2.598 -1.464,-3.536c-0.938,-0.937 -2.21,-1.464 -3.536,-1.464c-2.977,0 -7.023,0 -10,0c-1.326,-0 -2.598,0.527 -3.536,1.464c-0.937,0.938 -1.464,2.21 -1.464,3.536c0,2.977 0,7.023 0,10c-0,1.326 0.527,2.598 1.464,3.536c0.938,0.937 2.21,1.464 3.536,1.464c2.977,-0 7.023,-0 10,-0c1.326,0 2.598,-0.527 3.536,-1.464c0.937,-0.938 1.464,-2.21 1.464,-3.536l0,-10Zm-15,10l10,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-10,0c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1Zm0,-4l10,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-10,0c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1Zm0,-4l10,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-10,0c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1Z\"}),e(\"g\",{id:\"Icon\"}))}function ke(){return e(\"svg\",{width:25,height:25,fill:\"#ffffff\",version:\"1.1\",id:\"Capa_1\",xmlns:\"http://www.w3.org/2000/svg\",viewBox:\"0 0 104.778 104.778\"},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},\" \",e(\"g\",null,\" \",e(\"path\",{d:\"M96.832,88.406l-23.02-39.908V21.959c4.385-1.595,7.447-5.797,7.447-10.618C81.26,5.089,76.176,0,69.928,0H42.6 c-6.251,0-11.334,5.089-11.334,11.341c0,4.815,3.07,9.017,7.457,10.618v26.55l-2.083,3.685V30.359c0-1.546-1.257-2.802-2.803-2.802 H8.723c-1.546,0-2.801,1.256-2.801,2.802v59.557c0,7.475,5.742,13.614,13.174,14.648c0.331,0.126,0.683,0.214,1.059,0.214h67.227 c4.79,0,8.433-1.762,10.282-4.979C99.503,96.598,99.208,92.543,96.832,88.406z M11.513,89.916v-6.079h8.254 c1.546,0,2.802-1.26,2.802-2.802c0-1.549-1.256-2.802-2.802-2.802h-8.254v-9.09h8.254c1.546,0,2.802-1.263,2.802-2.801 c0-1.555-1.256-2.802-2.802-2.802h-8.254v-9.097h8.254c1.546,0,2.802-1.256,2.802-2.801c0-1.55-1.256-2.803-2.802-2.803h-8.254 V33.149h19.512v56.767c0,5.095-4.375,9.248-9.756,9.248C15.883,99.17,11.513,95.011,11.513,89.916z M92.794,96.997 c-0.799,1.379-2.779,2.178-5.432,2.178H33.189c2.118-2.55,3.439-5.734,3.439-9.259V63.19c0.245-0.207,0.476-0.443,0.645-0.743 l6.679-11.82c0.236-0.422,0.364-0.898,0.364-1.379V19.776c0-1.415-1.048-2.603-2.449-2.78c-2.859-0.364-5.015-2.796-5.015-5.655 c0-3.161,2.571-5.738,5.731-5.738H69.91c3.165,0,5.734,2.577,5.734,5.738c0,2.859-2.155,5.286-5.017,5.655 c-1.401,0.178-2.446,1.365-2.446,2.78v29.472c0,0.493,0.122,0.977,0.374,1.401l23.396,40.559 C93.292,93.506,93.593,95.617,92.794,96.997z M76.466,79.53c0,5.412-4.377,9.794-9.801,9.794c-5.411,0-9.795-4.382-9.795-9.794 c0-5.406,4.384-9.795,9.795-9.795C72.089,69.735,76.466,74.124,76.466,79.53z M54.609,68.877c0,2.665-2.146,4.799-4.802,4.799 c-2.657,0-4.802-2.156-4.802-4.799c0-2.644,2.15-4.8,4.802-4.8C52.468,64.077,54.609,66.233,54.609,68.877z M58.195,58.048 c-1.672,0-3.015-1.341-3.015-3.01c0-1.667,1.343-3.009,3.015-3.009c1.663,0,3.015,1.343,3.015,3.009 C61.21,56.707,59.853,58.048,58.195,58.048z M49.534,86.315c0,1.669-1.352,3.009-3.016,3.009c-1.665,0-3.014-1.34-3.014-3.009 c0-1.663,1.349-3.016,3.014-3.016C48.182,83.3,49.534,84.652,49.534,86.315z M54.805,46.184c-2.185,0-3.956-1.771-3.956-3.957 c0-2.186,1.771-3.957,3.956-3.957c2.183,0,3.957,1.771,3.957,3.957C58.762,44.414,56.983,46.184,54.805,46.184z\"}),\" \"),\" \"))}function De(){return e(\"svg\",{version:\"1.1\",viewBox:\"0 0 29.756 29.756\",style:\"enable-background:new 0 0 29.756 29.756;\"},e(\"path\",{d:\"M29.049,5.009L28.19,4.151c-0.943-0.945-2.488-0.945-3.434,0L10.172,18.737l-5.175-5.173   c-0.943-0.944-2.489-0.944-3.432,0.001l-0.858,0.857c-0.943,0.944-0.943,2.489,0,3.433l7.744,7.752   c0.944,0.943,2.489,0.943,3.433,0L29.049,8.442C29.991,7.498,29.991,5.953,29.049,5.009z\"}))}function X(a){let s=W(null);return $(()=>{let t=o=>{s.current&&!s.current.contains(o?.target)&&a()};return document.addEventListener(\"click\",t),()=>{document.removeEventListener(\"click\",t)}},[s]),s}function ne({className:a=\"\"}){return e(\"svg\",{width:25,height:25,viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\",className:a},e(\"g\",{id:\"SVGRepo_bgCarrier\",\"stroke-width\":\"0\"}),e(\"g\",{id:\"SVGRepo_tracerCarrier\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),e(\"g\",{id:\"SVGRepo_iconCarrier\"},\" \",e(\"path\",{d:\"M6 9L12 15L18 9M12 9H12.01\",stroke:\"lightcoral\",\"stroke-width\":\"2\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),\" \"))}function ie({items:a,onClickItem:s,incomeActiveItem:t,canShow:o}){let[i,u]=C(!1),[p,l]=C(\"\");$(()=>{l(t||\"\")},[t]);let b=X(()=>{u(!1)});return e(\"div\",null,e(\"div\",{className:\"select\",disabled:o},e(\"div\",{className:`select--empty ${i===!0?\"active-select--empty\":\"\"}`,ref:b,onClick:()=>u(!i)},e(\"div\",{className:\"select--empty--left-side\"},\" \",e(\"span\",{className:`${p?\"select-empty--left-side--clear\":\"select-empty--left-side--clear--inactive\"}`,onClick:N=>{l(\"\"),s(\"\"),u(!1),N.stopPropagation()}},\"x\"),e(\"span\",null,p)),e(ne,null)),i&&e(\"div\",{className:\"select--sub-buttons\",\"data-show\":i},a?.map((N,y)=>e(\"div\",{className:`option ${N===p?\"active-option\":\"\"}`,onClick:()=>{l(N),s(N),u(!1)}},N)))))}var ut=({options:a,onChange:s})=>{let[t,o]=C([]),[i,u]=C(a),[p,l]=C(!1),r=S=>{if(t.includes(S)){let R=t.filter(h=>h.value!==S.value);o(R),u([...i,S]),s(R)}else{let R=i.filter(h=>h.value!==S.value);o([...t,S]),u(R),s([...t,S])}},b=()=>{o([]),s([]),u(a)},N=()=>{l(!p)},y=X(()=>{l(!1)});return e(\"div\",{ref:y,className:\"multi-select__wrapper\"},e(\"div\",{className:\"multi-select__field\",onClick:N},e(\"div\",{className:\"multi-select__selected-item-wrapper\"},t.map(S=>e(\"div\",{className:\"multi-select__selected-item\",key:S},e(\"div\",{className:\"multi-select__selected-item-text\"},S.label),e(\"div\",{className:\"multi-select__selected-item-btn\",role:\"button\",onClick:R=>{R.stopPropagation(),r(S)}},\"x\")))),e(\"div\",{className:\"multi-select__icons-wrapper\"},t.length?e(\"div\",{className:\"multi-select__close-icon-wrapper\",role:\"button\",onClick:S=>{S.stopPropagation(),b()}},e(\"span\",{className:\"multi-select__close-icon\"},\"x\")):null,e(\"div\",{className:\"multi-select__arrow-icon-wrapper\",role:\"button\"},e(ne,{className:\"multi-select__arrow-icon\"})))),p?e(\"div\",{className:\"multi-select__options\"},i.length?i.map(S=>e(\"div\",{key:S.value,onClick:R=>{R.stopPropagation(),r(S)},className:\"multi-select__option\"},e(\"div\",{className:\"multi-select__option-label\"},S.label))):e(\"div\",{className:\"multi-select__option--no-option\"},\"No Options!\")):null)},Ge=ut;var ft=({baseUrl:a,options:s})=>fetch(`${a}lesan`,s).then(t=>t.json()),Ue=({urlAddress:a})=>{let{activeTab:s,tabsData:t,actsObj:o,headers:i,history:u,setService:p,setSchema:l,setAct:r,setPostFields:b,setGetFields:N,setFormData:y,setHistory:S,setResponse:R,resetGetFields:h,resetPostFields:z,addE2eForm:Y,setModal:K}=I(),[Q,L]=C(!1),O=(n,f,T,v)=>{for(let k in T)T[k].type===\"enums\"?v[`${f}.${k}`]=n:O(n,`${f}.${k}`,T[k].schema,v);return v},V=W(null),P=n=>{let{name:f,value:T,type:v,alt:k}=n.target,d;v===\"number\"?d=Number(T):k===\"array\"||k===\"boolean\"?d=JSON.parse(T):d=T,y({data:{...t[s].formData,[f]:d},index:s})},m=({key:n,field:f,isMultiEnum:T=!1,formData:v})=>f.type===\"array\"?m({key:n,formData:v,field:f.schema,isMultiEnum:!0}):f.type===\"enums\"&&T?e(Ge,{options:Object.keys(f.schema).map(k=>({label:k,value:f.schema[k]})),onChange:k=>{let d=k.map(D=>D.value);y({data:{...v,[`set.${n}`]:d},index:s}),localStorage.setItem(\"localTabsData\",JSON.stringify(t))}}):f.type===\"enums\"?e(ie,{onClickItem:k=>{y({data:{...v,[`set.${n}`]:k},index:s}),localStorage.setItem(\"localTabsData\",JSON.stringify(t))},incomeActiveItem:v[`set.${n}`],items:Object.keys(f.schema)}):e(\"input\",{className:\"input\",placeholder:n,id:n,value:v[`set.${n}`],name:`set.${n}`,type:f.type===\"number\"?\"number\":\"string\",alt:f.type,onChange:P}),g=({getField:n,keyName:f,margin:T})=>e(\"div\",{style:{marginLeft:`${T+1}px`},className:\"sidebar__section_container\",key:`${s}.${f}`},e(\"div\",{className:\"sidebar__section-heading--subfields\"},f),Object.keys(n.schema).map((v,k)=>n.schema[v].type===\"enums\"?e(\"div\",{className:\"input-cnt get-items\",key:`${s}.${v}-${k}`},e(\"label\",{htmlFor:v},f,\".\",v,\":\"),e(\"div\",{className:\"get-values\"},e(\"span\",{onClick:()=>{let d={...t[s].formData};delete d[`get.${f}.${v}`],y({data:d,index:s})}}),e(\"span\",{className:t[s].formData[`get.${f}.${v}`]===0?\"active\":\"\",onClick:()=>{y({index:s,data:{...t[s].formData,[`get.${f}.${v}`]:0}})}},\"0\"),e(\"span\",{className:t[s].formData[`get.${f}.${v}`]===1?\"active\":\"\",onClick:()=>{y({data:{...t[s].formData,[`get.${f}.${v}`]:1},index:s})}},\"1\"))):g({getField:n.schema[v],keyName:`${f}.${v}`,margin:T+1}))),c=()=>{let n=ce(t[s].formData);return{body:{method:\"POST\",headers:{\"Content-Type\":\"application/json\",...i},body:JSON.stringify({service:t[s].service,model:t[s].schema,act:t[s].act,details:n})}}},E=async n=>{n.preventDefault();let f=new Date().toLocaleDateString();L(!0),setTimeout(()=>{L(!1)},450);let T=performance.now(),v=await ft({baseUrl:a,options:c().body}),d=performance.now()-T;R({data:{...v,tookTime:d},index:s});let D=[{request:{...c().body,body:JSON.parse(c().body.body)},response:{...v,tookTime:d},id:A(),reqDate:f},...u];S(D),localStorage.setItem(\"localHistory\",JSON.stringify(D)),localStorage.setItem(\"localTabsData\",JSON.stringify(t))},j=t[s].service&&t[s].schema&&t[s].postFields&&t[s].getFields&&t[s].act,M=t[s].service,B=t[s].service&&t[s].schema,_=()=>{let n=JSON.stringify(t[s].response);navigator.clipboard.writeText(n)},F=()=>{let n=c();n.body.body=JSON.parse(n.body.body),navigator.clipboard.writeText(JSON.stringify(n))},ee=()=>{let n=c();n.body.body=JSON.parse(n.body.body);let{method:f,...T}=n.body,v={id:A(),bodyHeaders:JSON.stringify({...T},null,2),repeat:1,captures:[]};Y(v),K(\"E2E TEST\")},w=(n,f)=>{if(f===\"service\"&&(p({data:n,index:s}),l({data:\"\",index:s})),f===\"method\"&&l({data:\"\",index:s}),f===\"schema\"&&l({data:n,index:s}),r({data:\"\",index:s}),h(s),z(s),f===\"action\"){let T=o[t[s].service][t[s].schema][n].validator.schema;V&&V.current&&V.current.reset(),r({data:n,index:s}),N({data:T.get.schema,index:s}),b({data:T.set.schema,index:s})}y({data:{},index:s}),localStorage.setItem(\"localTabsData\",JSON.stringify(t))};return e(q,null,e(\"div\",{className:\"sidebar\"},e(\"div\",{className:\"sidebar__sections-wrapper\"},e(\"div\",{className:\"sidebar__section sidebar__section--services\"},e(\"div\",{className:\"sidebar__section-heading\"},\"select services\"),e(ie,{onClickItem:n=>w(n,\"service\"),items:Object.keys(o),incomeActiveItem:t[s].service?t[s].service:null})),e(\"div\",{className:\"sidebar__section sidebar__section--schema\"},e(\"div\",{onClick:()=>{},className:\"sidebar__section-heading\"},\"select schema\"),e(ie,{canShow:!M,onClickItem:n=>w(n,\"schema\"),items:M?Object.keys(o[t[s].service]):[],incomeActiveItem:t[s].schema?t[s].schema:null})),e(\"div\",{className:\"sidebar__section sidebar__section--act\"},e(\"div\",{className:\"sidebar__section-heading\"},\"select action\"),e(ie,{canShow:!B,onClickItem:n=>w(n,\"action\"),items:B?Object.keys(o[t[s].service][t[s].schema]):[],incomeActiveItem:t[s].act?t[s].act:null})))),j&&e(\"div\",{className:\"sidebar sidebar--fields\"},e(\"form\",{ref:V,onSubmit:E,className:\"form--fields\"},e(\"div\",{className:\"sidebar__section-heading sidebar__section-heading--fields\"},\"SET fields\"),Object.keys(t[s].postFields).map(n=>e(\"div\",{className:\"input-cnt\",key:`${s}.${n}-----`},e(\"label\",{htmlFor:n},n,\" :\"),m({key:n,field:t[s].postFields[n],formData:t[s].formData}))),e(\"div\",{className:\"sidebar__section-heading sidebar__section-heading--fields\"},\"GET fields\"),e(\"div\",{className:\"input-cnt get-items border-bottom\"},e(\"label\",null,\"All Items :\"),e(\"div\",{className:\"get-values\"},e(\"span\",{onClick:()=>{let n=O(null,\"get\",t[s].getFields,{});y({data:{...t[s].formData,...n},index:s})}}),e(\"span\",{onClick:()=>{let n=O(0,\"get\",t[s].getFields,{});y({data:{...t[s].formData,...n},index:s})}},\"0\"),e(\"span\",{onClick:()=>{let n=O(1,\"get\",t[s].getFields,{});y({data:{...t[s].formData,...n},index:s})}},\"1\"))),Object.keys(t[s].getFields).map(n=>t[s].getFields[n].type===\"enums\"?e(\"div\",{className:\"input-cnt get-items\",key:`${s}.${n}-------`},e(\"label\",{htmlFor:n},n,\":\"),e(\"div\",{className:\"get-values\"},e(\"span\",{onClick:()=>{y({data:{...t[s].formData,[`get.${n}`]:null},index:s})}}),e(\"span\",{className:t[s].formData[`get.${n}`]===0?\"active\":\"\",onClick:()=>{y({data:{...t[s].formData,[`get.${n}`]:0},index:s})}},\"0\"),e(\"span\",{className:t[s].formData[`get.${n}`]===1?\"active\":\"\",onClick:()=>{y({data:{...t[s].formData,[`get.${n}`]:1},index:s})}},\"1\"))):g({getField:t[s].getFields[n],keyName:n,margin:0})),e(\"div\",{class:\"wrapper\"},e(\"button\",{class:\"send-button\",\"data-active\":Q},e(\"span\",null,\"Send\"),e(\"div\",{class:\"successe\"},e(De,null)))))),e(\"div\",{className:\"response\"},t[s].response&&e(\"div\",{class:\"response-detail\"},e(\"div\",{className:\"response-detail-button_title\"},e(\"p\",{className:\"response-detail-title\"},\"Response\"),e(\"div\",{className:\"response-detail-buttons\"},e(\"div\",{className:\"btn response-detail-button \",onClick:()=>F()},e(pe,null),e(\"span\",{className:\"tooltip-text\"},\"Copy Request\")),e(\"div\",{className:\"btn response-detail-button \",onClick:()=>{_()}},e(pe,null),e(\"span\",{className:\"tooltip-text\"},\"Copy Response\")),e(\"div\",{className:\"btn response-detail-button \",onClick:()=>{ee()}},e(ke,null),e(\"span\",{className:\"tooltip-text\"},\"Run E2E Test\")))),e(\"div\",{className:\"response-detail-info\"},e(\"div\",{style:{display:\"flex\",flexDirection:\"column\"}},\" \",e(H,{jsonData:{body:t[s].response?.body,success:t[s].response?.success}})),e(\"span\",{className:\"response-took\"},\"took:\",de(t[s].response?.tookTime)),t[s].response&&t[s].response?.success===!0?e(\"div\",{className:\"success\"}):e(\"div\",{className:\"fail\"})))))};var vt=()=>e(\"svg\",{width:\"15px\",height:\"15px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M20.04 10.1109L18.0252 8.09612L21.7071 4.41421C22.0976 4.02369 22.0976 3.39052 21.7071 3L21 2.29289C20.6095 1.90237 19.9763 1.90237 19.5858 2.29289L15.9039 5.9748L14.04 4.11089C13.754 3.82489 13.3239 3.73933 12.9502 3.89411C12.5765 4.04889 12.3329 4.41353 12.3329 4.81799V10.818C12.3329 11.3703 12.7806 11.818 13.3329 11.818H19.3329C19.7373 11.818 20.102 11.5744 20.2568 11.2007C20.4115 10.827 20.326 10.3969 20.04 10.1109Z\",fill:\"bisque\"}),e(\"path\",{d:\"M3.96 13.8891L5.97478 15.9039L2.29289 19.5858C1.90237 19.9763 1.90237 20.6095 2.29289 21L3 21.7071C3.39052 22.0976 4.02369 22.0976 4.41421 21.7071L8.0961 18.0252L9.96 19.8891C10.246 20.1751 10.6761 20.2607 11.0498 20.1059C11.4235 19.9511 11.6671 19.5865 11.6671 19.182V13.182C11.6671 12.6297 11.2194 12.182 10.6671 12.182H4.66711C4.26265 12.182 3.89801 12.4256 3.74323 12.7993C3.58845 13.173 3.674 13.6031 3.96 13.8891Z\",fill:\"bisque\"})),ze=vt;var bt=()=>e(\"svg\",{width:\"15px\",height:\"15px\",viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M7.69233 18.2781L9.70711 20.2929C9.9931 20.5789 10.0787 21.009 9.92388 21.3827C9.7691 21.7564 9.40446 22 9 22H3C2.44772 22 2 21.5523 2 21V15C2 14.5955 2.24364 14.2309 2.61732 14.0761C2.99099 13.9213 3.42111 14.0069 3.70711 14.2929L5.571 16.1568L9.25289 12.4749C9.64342 12.0844 10.2766 12.0844 10.6671 12.4749L11.3742 13.182C11.7647 13.5725 11.7647 14.2057 11.3742 14.5962L7.69233 18.2781Z\",fill:\"bisque\"}),e(\"path\",{d:\"M16.3077 5.72187L14.2929 3.70711C14.0069 3.42111 13.9213 2.99099 14.0761 2.61732C14.2309 2.24364 14.5955 2 15 2H21C21.5523 2 22 2.44772 22 3V9C22 9.40446 21.7564 9.7691 21.3827 9.92388C21.009 10.0787 20.5789 9.9931 20.2929 9.70711L18.429 7.84319L14.7471 11.5251C14.3566 11.9156 13.7234 11.9156 13.3329 11.5251L12.6258 10.818C12.2352 10.4275 12.2352 9.7943 12.6258 9.40378L16.3077 5.72187Z\",fill:\"bisque\"})),Ye=bt;var yt=a=>{let[s,t]=C(!1);return e(\"div\",{className:\"modal-overlay\",onClick:a.toggle},e(\"div\",{className:s?\"modal-box-fullscreen\":\"modal-box\",onClick:o=>o.stopPropagation()},e(\"div\",{className:\"action-modal\"},e(\"span\",{className:\"modal-close\",onClick:a.toggle},e(U,null)),e(\"span\",{className:\"modal-fullscreen\",onClick:()=>t(!s)},s?e(ze,null):e(Ye,null)),e(\"span\",{className:\"modal-title\"},a.title)),e(\"div\",{className:\"modal-content\"},a.children)))},Ke=yt;var Qe=()=>{let{schemasObj:a}=I(),[s,t]=C({});$(()=>{let l={};for(let r in a){l[r]={...l[r],pure:a[r].pure};for(let b in a[r].mainRelations)l[r]={...l[r],mainRelations:{...l[r].mainRelations,[b]:{type:\"relation\",extraDetails:a[r].mainRelations[b],schema:{...a[a[r].mainRelations[b].schemaName].pure}}}};for(let b in a[r].relatedRelations)l[r]={...l[r],relatedRelations:{...l[r].relatedRelations,[b]:{type:\"relation\",extraDetails:a[r].relatedRelations[b],schema:{...a[a[r].relatedRelations[b].schemaName].pure}}}}}t(l)},[]);let o=()=>{let l=`data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(a))}`,r=document.createElement(\"a\");r.href=l,r.download=\"schemas.json\",r.click()},i=[\"color-1\",\"color-2\",\"color-3\",\"color-4\",\"color-5\",\"color-6\",\"color-7\"],u=l=>Object.keys(l).map(r=>{let b=A();return e(\"div\",{className:\"schema\"},e(\"div\",{className:\"schema-name\",onClick:()=>{document.getElementById(b)?.classList.toggle(\"open\")}},e(\"p\",{className:\"schema-title\"},r),e(\"span\",null,\"...\")),e(\"div\",{className:\"proceed-child-container\",id:b},p(l[r])))}),p=l=>Object.keys(l).map(r=>{let b=A();return e(\"div\",{className:`inside-schema ${i[Math.floor(Math.random()*i.length)]}`},e(\"div\",{className:`inside ${typeof l[r]==\"object\"&&l[r].schema!==null&&\"schema-pointer\"}`,onClick:()=>{document.getElementById(b)?.classList.toggle(\"open\")}},e(\"p\",{className:\"schema-title\"},r),e(\"div\",{className:\"schema-info\"},\" \",e(\"p\",{className:\"schema-title schema-type\"},\" \",l[r].type),e(\"div\",{className:\"schema-help\"},l[r].extraDetails&&e(oe,null),l[r].extraDetails&&e(\"div\",{className:\" tooltip-text\"},e(H,{jsonData:l[r].extraDetails}))),typeof l[r]==\"object\"&&l[r].schema!==null&&e(\"span\",null,\"...\"))),e(\"div\",{id:b,className:\"proceed-child\"},typeof l[r]==\"object\"&&l[r]!==null&&l[r].schema!==null&&p(l[r].pure?l[r].pure:l[r].relatedRelations?l[r].relatedRelations:l[r].mainRelation?l[r].mainRelation:l[r].type===\"relation\"?l[r].schema:l[r])))});return e(\"div\",{className:\"schema-modal\"},e(\"div\",{className:\"results-buttons\"},e(\"button\",{className:\" schema-export-button btn e2e-back-button e2e-export_results-button\",onClick:o},e(G,null),e(\"span\",null,\"Export\"))),e(\"div\",{className:\"search-box\"},e(\"input\",{className:\"input\",type:\"text\",placeholder:\"search...\"}),e(\"span\",{className:\"search-icon\"},e(te,null))),e(\"div\",{className:\"schema-list\"},u(s)))};function me(){return e(\"svg\",{width:25,height:25,viewBox:\"0 0 24 24\",fill:\"none\",xmlns:\"http://www.w3.org/2000/svg\"},e(\"path\",{d:\"M7.75 11.9999L10.58 14.8299L16.25 9.16992\",stroke:\"lightcoral\",\"stroke-width\":\"2\",\"stroke-linecap\":\"round\",\"stroke-linejoin\":\"round\"}),\" \",e(\"path\",{\"fill-rule\":\"evenodd\",\"clip-rule\":\"evenodd\",d:\"M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z\",fill:\"bisque\"}))}function We({configUrl:a}){let s=r=>{i[r],i.splice(r,1),u([...i])},{headers:t,setHeader:o}=I(),[i,u]=C([{key:\"\",value:\"\"}]),[p,l]=C(\"\");return $(()=>{let r=[];for(let b in t)r.push({key:b,value:t[b]});u(r)},[]),e(\"div\",{className:\"setting modal-content\"},e(\"div\",{className:\"url\"},e(\"p\",{className:\"url-title\"},\"Fetch Config\"),e(\"div\",{className:\"url-detail\"},\" \",e(\"input\",{className:\"input url-input \",placeholder:\"Set URL\",onChange:r=>l(r.target.value)}),e(\"button\",{className:\"setting_fetch-config--apply-button e2e-back-button e2e-add-capture \",onClick:()=>a(p)},e(me,null),e(\"span\",null,\"Apply\"),\" \"))),e(\"div\",{className:\"sidebar__section sidebar__section--headers\"},e(\"div\",{className:\"sidebar__section-heading setting_heading\"},\" \",e(\"span\",{className:\"setting_heading--title\"},\"Set Headers\"),e(\"button\",{className:\"setting_add-header--button e2e-back-button e2e-export_results-button e2e-add-capture \",onClick:()=>{u([...i,{key:\"\",value:\"\"}])}},e(ae,null),e(\"span\",null,\"Add Header\"))),e(\"div\",{className:\"setting_container--setheaders\"},e(\"div\",{className:\"setting_set-headers\"},i?.map((r,b)=>e(\"div\",{key:`${b}____`,className:\"setting_set-headers--inputs\"},e(\"div\",{className:\"setting__set-headers--key-value setting__set-headers--key\"},e(\"span\",null,\"Key:\"),e(\"input\",{className:\"setting_set-headers--inputs--key input\",placeholder:\"Authotization\",value:r.key,onChange:N=>{u(y=>(y[b].key=N.target.value,y))}})),e(\"div\",{className:\"setting__set-headers--key-value setting__set-headers--value\"},e(\"span\",null,\"Value:\"),e(\"input\",{className:\"setting_set-headers--inputs--value input\",placeholder:\"some string ...\",value:r.value,onChange:N=>{u(y=>(y[b].value=N.target.value,y))}})),i.length>1&&e(\"div\",{className:\"setting_set-headers--delete-button e2e-move-div e2e-move-close\",onClick:()=>s(b)},e(U,null))))),e(\"button\",{className:\"setting_set-headers--apply-button e2e-back-button e2e-add-capture \",onClick:()=>{let r={};for(let b of i){let{key:N,value:y}=b;r[N]=y}o(r)}},e(me,null),e(\"span\",null,\"Apply\")))))}var Ct=({baseUrl:a})=>fetch(`${a}playground/static/get/schemas`).then(s=>s.json()),Xe=()=>{let{tabsData:a,setTabsData:s,activeTab:t,actsObj:o,addTab:i,setActiveTab:u,setService:p,setSchema:l,setAct:r,setPostFields:b,setGetFields:N,setFormData:y,setHistory:S,setResponse:R,resetGetFields:h,closeTab:z,resetPostFields:Y,setSchemasObj:K,setActsObj:Q,setModal:L,modal:O}=I(),[V,P]=C(\"\"),[m,g]=C(!1),c=()=>window&&window.location?`${new URL(window.location.href).origin}/`:\"http://localhost:1366/\",[E,j]=C(\"\"),B=X(()=>{g(!1)});$(()=>{_(c());let w=JSON.parse(localStorage.getItem(\"localHistory\"));w&&S(w)},[]);let _=w=>{w&&j(w),p({data:\"\",index:t}),l({data:\"\",index:t}),h(t),Y(t),y({data:{},index:t}),Ct({baseUrl:w||E}).then(({schemas:n,acts:f})=>{Q(f),K(n);let T=localStorage.getItem(\"localTabsData\");if(T){T=JSON.parse(T);let v=[],k=d=>{v.pop();let D=ce(d.formData);for(let Z in D.set)f[d.service][d.schema][d.act].validator.schema.set.schema[Z]===void 0&&delete D.set[Z];for(let Z in D.get)f[d.service][d.schema][d.act].validator.schema.get.schema[Z]===void 0&&delete D.get[Z];let J=le(D,{},\"\");d.postFields=f[d.service][d.schema][d.act].validator.schema.set.schema,d.getFields=f[d.service][d.schema][d.act].validator.schema.get.schema,v.push({...d,formData:J})};for(let d of T)d.service&&d.service in f&&v.push(d),d.schema&&!(d.schema in f[d.service])&&v.pop(),d.act&&!(d.act in f[d.service][d.schema])&&v.pop(),d.service&&d.schema&&d.act&&d.act in f[d.service][d.schema]&&k(d);v.length<1&&v.push({service:\"\",schema:\"\",act:\"\",postFields:{},getFields:{},formData:{},response:null}),s(v)}})},F=()=>{L(null)},ee=w=>{p({data:w.body.service,index:t}),l({data:w.body.model,index:t}),r({data:w.body.act,index:t});let n=o[w.body.service][w.body.model][w.body.act].validator.schema;N({data:n.get.schema,index:t}),b({data:n.set.schema,index:t}),R({data:null,index:t});let f=le(w.body.details,{},\"\");y({data:f,index:t}),F()};return e(\"div\",{className:\"cnt\"},e(\"div\",{className:\"tabs-container\",style:{display:\"flex\"}},a.map((w,n)=>e(q,null,e(\"div\",{className:\"tab-name\",\"data-tab\":t===n,onClick:()=>{u(n)}},\" \",e(\"span\",{title:a[n].act?`${a[n].schema} | ${a[n].act}`:a[n].schema?`${a[n].service} | ${a[n].schema}`:a[n].service?a[n].service:`Tab ${n}`},\" \",a[n].act?`${a[n].schema} | ${a[n].act}`:a[n].schema?`${a[n].service} | ${a[n].schema}`:a[n].service?a[n].service:`Tab ${n}`),e(\"span\",{className:` tab-close ${t===n?\"active-tab-close\":\"\"}`,onClick:f=>{f.stopPropagation(),z(n)},title:\"Close tab\"},\"x\")))),e(\"span\",{className:\"add-tab\",title:\"Open a new tab\",onClick:()=>{i(null),localStorage.setItem(\"localTabsData\",JSON.stringify(a))}},\"+\")),e(Ue,{urlAddress:E}),e(\"button\",{ref:B,className:\"media--main-btn-wrapper \",onClick:()=>{g(!m)}},\"menu\"),e(\"div\",{className:\"main-btn-wrapper\",\"data-show\":m===!0},e(\"span\",{className:\"btn btn-modal \",onClick:()=>_()},e(\"span\",{className:\"btn-modal-title\"},\"Refetch\"),e(_e,null)),e(\"span\",{className:\"btn btn-modal \",onClick:()=>L(\"SETTING\")},e(\"span\",{className:\"btn-modal-title\"},\"Setting\"),e(Ne,null)),e(\"span\",{className:\"btn btn-modal\",onClick:()=>L(\"HISTORY\")},e(\"span\",{className:\"btn-modal-title\"},\"History\"),e(Te,null)),e(\"span\",{className:\"btn btn-modal\",onClick:()=>L(\"E2E TEST\")},e(\"span\",{className:\"btn-modal-title\"},\"E2E Test\"),e(xe,null)),e(\"span\",{className:\"  btn-modal-document\",\"data-show\":V===\"document\"},e(\"span\",{className:\"btn-modal-document--title\",\"data-show\":V===\"document\"},\"Document\")),e(\"span\",{className:\"btn btn-modal btn-doc\",onClick:()=>L(\"SCHEMA\"),onMouseEnter:()=>P(\"document\"),onMouseLeave:()=>P(\"\")},e(\"span\",{className:\"btn-modal-title\"},\"Schema\"),e(we,null)),e(\"span\",{className:\"btn btn-modal btn-doc \",onClick:()=>L(\"ACT\"),onMouseEnter:()=>P(\"document\"),onMouseLeave:()=>P(\"\")},e(\"span\",{className:\"btn-modal-title\"},\"Act\"),e(Ee,null))),O!==null&&e(Ke,{toggle:F,title:O},O===\"HISTORY\"?e(Je,{setFormFromHistory:ee}):O===\"SETTING\"?e(We,{configUrl:_}):O===\"E2E TEST\"?e(Be,{baseUrl:E}):O===\"SCHEMA\"?e(Qe,null):O===\"ACT\"?e(he,null):e(q,null)))};Me(e(Ae,null,e(Xe,null)),document.getElementById(\"root\"));\n//# sourceMappingURL=bundle-es.js.map\n";

    export const bundleCss = `:root {
  /* ------------------------------------------------------------------------ */
  /*                               Configuration                              */
  /* ------------------------------------------------------------------------ */

  /* -------------------------------- Colors -------------------------------- */
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

  /* --------------------------------- Fonts -------------------------------- */
  --base-font-family: sans-serif;
  --headers-font-family: serif;
  --base-font-lineheight: 1.5em;

  /* ------------------------------- Constants ------------------------------ */
  --height-cnt--btn-send: 55px;
}

/* NORMALIZING HTML AND BODY */
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

input[type="number"] {
  -moz-appearance: textfield;
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

@media (min-width: 760px) and (max-width: 1025px) {
  .sidebar {
    width: 30%;
  }
}

@media (min-width: 1025px) {
  .sidebar {
    width: 20%;
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
}

.sidebar__section-add-capture input {
  width: 50%;
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

.select[disabled="true"] {
  opacity: 0.6;
  pointer-events: none;
}

.select--sub-buttons {
  display: none;
}
.select--sub-buttons[data-show="true"] {
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

@media (min-width: 1024px) and (max-width: 1440px) {
  .sidebar__section-add-capture {
    flex-direction: column;
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

.btn-modal-document[data-show="true"] {
  width: 8rem;
  transition: all 0.4s;
}

.btn-modal-document--title {
  opacity: 0;
}

.btn-modal-document--title[data-show="true"] {
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

  .main-btn-wrapper[data-show="true"] {
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

@media (min-width: 1025px) {
  .media--main-btn-wrapper {
    width: 15%;
    left: 2.5%;
  }
}

/* -------------------------------------------------------------------------- */

.sidebar--fields {
  width: 23%;
  background-color: var(--color-bg-secondary);
  position: relative;
  padding-top: 53px;
}

@media (min-width: 760px) and (max-width: 1025px) {
  .sidebar--fields {
    width: 30%;
  }
}

@media (min-width: 1025px) {
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
  /* background-color: var(--color-gray-2); */
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

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
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

/* btn */

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
  /* font-weight: bold; */
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
  /* border-radius: 50%; */
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

.send-button[data-active="true"] {
  width: 40px;
  height: 40px;
}

.send-button[data-active="true"] .successe {
  opacity: 1;
  visibility: visible;
}

.send-button[data-active="true"] .successe svg {
  margin-top: 50%;
  transform: translateY(-50%) rotate(720deg) scale(1);
}

.send-button[data-active="true"] span {
  opacity: 0;
  visibility: hidden;
}

.response {
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* overflow-y: scroll; */
  /* width: min-content; */
  flex-grow: 1;
  /* padding: 0 20px; */
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
  /* justify-content: flex-start; */
  /* align-items: center; */
  /* gap: 210px; */
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
  overflow: scroll;
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
  /* background-color: rgb(51, 169, 77); */
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
  overflow: scroll;
  width: 100%;
  height: 100%;
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

.results {
  margin-top: 5px;
}

.results-buttons {
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
  font-size: 18px;
  border: none;
  outline: none;
  background-color: red;
  color: white;
  cursor: pointer;
  padding: 15px;
  border-radius: 4px;
}

.none {
  display: none;
}

.myBtn:hover {
  background-color: #555;
}

.detail-requests {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  margin: 0 2rem;
  /* width: 100%; */
}

.sequence-re {
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
  color: red;
}

.detail-sequence p {
  color: bisque;
}

.detail-sequence p span {
  color: #f1fa8c;
}

.schema-modal {
  width: 97%;
  margin: 2rem auto 0 auto;
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

@media (max-width: 1025px) {
  .results-buttons {
    display: none;
  }

  .results-buttons[data-show="true"] {
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
    overflow: scroll;
  }
}

.setting_fetch-config--apply-button {
  width: 6rem;
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
  overflow: scroll;
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
  width: 6rem;
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

.history-re-detail-complete[data-show="true"] {
  display: block;
}

.container-response {
  background-color: rgba(7, 148, 191, 0.1);
  border-radius: 0 10px 10px 0;
  border-left: 1px solid gainsboro;
}

.container-re-title {
  text-align: center;
  background-color: rgba(20, 20, 20, 0.1);
  width: 100%;
  border-bottom: 1px solid gainsboro;
  display: inline-block;
  color: bisque;
}

.history-re-title_date {
  position: relative;
  border-right: 1px solid bisque;
}

.clear-history {
  position: absolute;
  bottom: 0;
  right: 27px;
  display: flex;
  justify-content: end;
  margin: 0 auto 5px auto;
  padding: 10px 2px 10px 0;
  z-index: 5;
}

.clear-history-button {
  border-radius: 50%;
  background-color: darkred;
  width: 3.5rem;
  height: 3.5rem;
  border: 1px solid whiItesmoke;
  cursor: pointer;
}

.clear-history-button:hover {
  background-color: rgb(190, 6, 6);
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

  /* bottom: 0; */
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
  /* At the bottom of the tooltip */
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
  backdrop-filter: blur(10px);
  color: #fff;
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

.tab-name[data-tab="true"] {
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

.tab-name[data-tab="true"]:hover .tab-close {
  background-color: #1d201e;
}

.tab-name[data-tab="true"]:hover .tab-close:hover {
  background-color: #434c46;
}

.tab-name:hover .tab-close {
  background-color: #303632;
}

.tab-name:hover .tab-close:hover {
  background-color: #262b28;
}

.tab-name[data-tab="true"] .tab-close {
  background-color: #1d201e;
}

.tab-name .tab-close {
  background-color: #232724;
}

/* ------------------------------- JSON Viewer ------------------------------ */
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
  /* height: 1.5rem; */
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

/* ------------------------ MultiSelect Component CSS ----------------------- */

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
    