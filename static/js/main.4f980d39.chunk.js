(this["webpackJsonpawesome-bill-recorder-2"]=this["webpackJsonpawesome-bill-recorder-2"]||[]).push([[0],{110:function(e,t,a){e.exports={addBillForm:"AddBillForm_addBillForm__2mxAH"}},111:function(e,t,a){e.exports={billsContainer:"BillDisplay_billsContainer__2DV9o"}},121:function(e,t,a){e.exports=a(227)},126:function(e,t,a){},127:function(e,t,a){},227:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(11),c=a.n(l),o=(a(126),a(127),a(17)),i=a(267),u=r.a.memo((function(e){return r.a.createElement(i.a,{elevation:3,style:Object(o.a)({margin:"10px",padding:"10px"},e.style),"data-testid":"layoutContainerItem"},e.children)})),m=a(8),s=a(12),d=a(46),p=Object(d.b)({name:"userSlice",initialState:{allUsers:[{id:"userId1",name:"TEST_NAME1"},{id:"userId2",name:"TEST_NAME2"},{id:"userId3",name:"TEST_NAME3"},{id:"userId4",name:"TEST_NAME4"},{id:"userId5",name:"TEST_NAME5"},{id:"userId6",name:"TEST_NAME6"}]},reducers:{addUser:function(e,t){return Object(o.a)(Object(o.a)({},e),{},{allUsers:[].concat(Object(s.a)(e.allUsers),[t.payload])})},removeUser:function(e,t){return Object(o.a)(Object(o.a)({},e),{},{allUsers:e.allUsers.filter((function(e){return e.id!==t.payload}))})}}}),f=p.actions,b=f.addUser,E=f.removeUser,y=p.reducer,v=a(16),g=a(283),h=a(42),O=a(271),j=a(272),k=a(232),C=r.a.memo((function(e){return r.a.createElement(i.a,{elevation:3,style:Object(o.a)({display:"flex",justifyContent:"space-around",margin:"10px",alignItems:"center",height:"50px"},e.style),"data-testid":"containerItem"},e.children)})),S=a(273),B=a(274),I=a(71),w=a.n(I);var x=r.a.memo((function(){var e=Object(n.useState)(!1),t=Object(m.a)(e,2),a=t[0],l=t[1],c=Object(v.c)((function(e){return e.Users})).allUsers,o=Object(v.b)(),i=Object(h.b)(),u=i.register,s=i.handleSubmit,d=i.errors;return r.a.createElement("div",null,r.a.createElement("h2",null,"Users"),a?r.a.createElement("form",{className:w.a.addUserForm,onSubmit:s((function(e){o(b({id:Object(g.a)(),name:e.newName.toUpperCase()})),l(!1)}))},r.a.createElement(j.a,{type:"text",name:"newName",placeholder:"Enter a new name",inputRef:u({required:!0}),error:!!d.newName,helperText:d.newName?"Name is required":""}),r.a.createElement("div",{className:w.a.formBtnGroup},r.a.createElement(O.a,{type:"submit",variant:"contained",color:"primary",endIcon:r.a.createElement(S.a,null)},"Confirm"),r.a.createElement(O.a,{variant:"contained",color:"primary",onClick:function(){return l(!1)}},"cancel"))):r.a.createElement(O.a,{variant:"contained",color:"primary",onClick:function(){l(!0)}},"New User"),r.a.createElement("ul",{className:w.a.unordered_list},c.map((function(e){var t=e.id,a=e.name;return r.a.createElement("li",{key:t},r.a.createElement(C,{style:{alignItems:"center",margin:"10px"}},r.a.createElement("div",null,a),r.a.createElement(k.a,{color:"secondary",onClick:function(){window.confirm("Do you want to delete ".concat(a))&&o(E(t))}},r.a.createElement(B.a,null))))}))))}));function U(){return r.a.createElement(u,{style:{height:"100vh"}},r.a.createElement(x,null))}var _=Object(d.b)({name:"billSlice",initialState:{allBills:[{id:"bill1",payer:"userId1",amount:{amount:1e4,currency:"USD",precision:2},participants:["userId1","userId2"],date:"2020-04-20"},{id:"bill2",payer:"userId2",amount:{amount:4e4,currency:"USD",precision:2},participants:["userId1","userId2","userId3"],date:"2020-01-01"},{id:"bill3",payer:"userId3",amount:{amount:50030,currency:"USD",precision:2},participants:["userId3","userId2"],date:"2020-02-05"},{id:"bill4",payer:"userId4",amount:{amount:20045,currency:"USD",precision:2},participants:["userId1","userId5"],date:"2020-02-09"},{id:"bill5",payer:"userId2",amount:{amount:10072,currency:"USD",precision:2},participants:["userId5"],date:"2019-12-05"},{id:"bill6",payer:"userId3",amount:{amount:7063,currency:"USD",precision:2},participants:["userId1","userId2","userId3","userId4","userId5"],date:"2019-12-05"}]},reducers:{addBill:function(e,t){return Object(o.a)(Object(o.a)({},e),{},{allBills:[t.payload].concat(Object(s.a)(e.allBills))})},removeBill:function(e,t){return Object(o.a)(Object(o.a)({},e),{},{allBills:e.allBills.filter((function(e){return e.id!==t.payload}))})}}}),A=_.actions,N=A.addBill,D=A.removeBill,M=_.reducer,T=a(53),P=a.n(T),F=a(230),G=a(236),L=a(234),J=a(286),Y=a(231),q=a(278),R=a(279),W=a(276),V=a(277),z=a(110),$=a.n(z),H=a(275),K=a(285),Q=a(228),X=function(){var e=Object(v.c)((function(e){return e.Users})).allUsers,t=Object(n.useMemo)((function(){return e.reduce((function(e,t){return e[t.id]=t.name,e}),{})}),[e]);return function(e){return t[e]}},Z=a(26),ee=function(e,t){var a=null;return function(){for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];null===a&&(clearTimeout(a),a=setTimeout((function(){e.apply(void 0,r)}),t))}};var te=r.a.memo((function(e){var t=e.formParticipants,a=e.totalAmount,l=e.outGoingRes,c=X(),o=Object(Z.a)({amount:100*+a,currency:"USD",precision:2}),i=Object(n.useState)(0),u=Object(m.a)(i,2),s=u[0],d=u[1],p=Object(n.useState)(-10),f=Object(m.a)(p,2),b=f[0],E=f[1],y=Object(n.useState)(o.allocate(new Array(t.length).fill(1)).map((function(e){return e.toJSON().amount/Math.pow(10,o.getPrecision())}))),v=Object(m.a)(y,2),g=v[0],h=v[1];s===t.length&&b===a||(h(o.allocate(new Array(t.length).fill(1)).map((function(e){return e.toJSON().amount/Math.pow(10,o.getPrecision())}))),d(t.length),E(a)),Object(n.useEffect)((function(){l(g)}));var O=function(e,t){var n=g.reduce((function(a,n,r){return r===e?a+t:a+n}),0)-a;h(n<=0?g.map((function(a,n){return n===e?t:a})):g.map((function(a,r){if(r!==e){if(a>=n){var l=a-n;return n=0,l}return n-=a,0}return t})))};return r.a.createElement(H.a,{container:!0,direction:"column",style:{alignItems:"center"}},t.map((function(e,t){return r.a.createElement(H.a,{key:t,container:!0,item:!0,xs:!0,spacing:2},r.a.createElement(H.a,{item:!0},c(e)),r.a.createElement(H.a,{item:!0,xs:!0},r.a.createElement(K.a,{value:g[t],onChange:ee((function(e,a){return O(t,+a)}),50),min:0,max:+a,valueLabelDisplay:"auto"})),r.a.createElement(H.a,{item:!0},r.a.createElement(Q.a,{value:g[t],onChange:function(e){""===e.target.value?O(t,0):O(t,+e.target.value)},onBlur:function(e){+e.target.value<0&&O(t,0),+e.target.value>a&&O(t,a)},inputProps:{min:0,max:a,type:"number"}})))})))})),ae={background:{position:"fixed",width:"100%",height:"100%",top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",zIndex:"10",overflow:"auto"},contentWrapper:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",padding:"10px",width:"40%",backgroundColor:"rgb(255, 255, 255)"}},ne=function(e){return r.a.createElement("div",{id:"modalBox-background",style:ae.background,onClick:function(t){"modalBox-background"===t.target.id&&e.onClickBackground()}},r.a.createElement(i.a,{style:Object(o.a)(Object(o.a)({},ae.contentWrapper),e.style)},e.children))},re=function(){var e=Object(v.c)((function(e){return e.Users})).allUsers,t=Object(v.b)(),a=Object(h.b)(),l=a.handleSubmit,c=a.register,o=a.watch,i=a.errors,u=a.control,s=Object(n.useState)(!1),d=Object(m.a)(s,2),p=d[0],f=d[1],b=o("unevenly"),E=o("participants",[]),y=o("amount",0),C=Object(n.useState)([]),S=Object(m.a)(C,2),B=S[0],I=S[1];return r.a.createElement("div",null,r.a.createElement(O.a,{color:"primary",onClick:function(){return f(!0)},"data-testid":"add-new-bill-btn",startIcon:r.a.createElement(W.a,null)},"Add New Bills"),p&&r.a.createElement(ne,{onClickBackground:function(){f(!1)}},r.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},r.a.createElement("h2",null,"ADD NEW BILL"),r.a.createElement(k.a,{onClick:function(){f(!1)}},r.a.createElement(V.a,null))),r.a.createElement("form",{"data-testid":"add-new-bill-form",className:$.a.addBillForm,onSubmit:l((function(e){e.unevenly?e.participants.forEach((function(a,n){t(N({id:Object(g.a)(),payer:e.payer,amount:{amount:100*+B[n],currency:"USD",precision:2},participants:[a],date:e.date}))})):t(N({id:Object(g.a)(),payer:e.payer,amount:{amount:100*+e.amount,currency:"USD",precision:2},participants:e.participants,date:e.date})),f(!1)}))},r.a.createElement(F.a,{error:!!i.payer},r.a.createElement(G.a,{id:"Payer_label"}," Payer "),r.a.createElement(h.a,{as:r.a.createElement(L.a,{labelId:"Payer_label",value:""},e.map((function(e){return r.a.createElement(J.a,{key:e.id,value:e.id},e.name)}))),name:"payer",defaultValue:"",control:u,rules:{required:"Select one payer"}}),r.a.createElement(Y.a,null,!!i.payer&&i.payer.message)),r.a.createElement(j.a,{"data-testid":"add-bill-amount",label:"Amount",name:"amount",type:"number",inputProps:{step:"0.01"},inputRef:c({required:"Need amount",pattern:{value:/^(\d{1,15}|\d{0,15}\.\d{1,2}|.)$/,message:"amount number not valid"}}),error:!!i.amount,helperText:!!i.amount&&i.amount.message}),r.a.createElement(F.a,{error:!!i.participants},r.a.createElement(G.a,{id:"test"}," Participant(s) "),r.a.createElement(h.a,{as:r.a.createElement(L.a,{multiple:!0,labelId:"test"},e.map((function(e){return r.a.createElement(J.a,{key:e.id,value:e.id},e.name)}))),name:"participants",defaultValue:[],control:u,rules:{required:!0,validate:function(e){return e.length>0||"At least one participant"}}}),r.a.createElement(Y.a,null,!!i.participants&&i.participants.message)),r.a.createElement(j.a,{label:"date",type:"date",inputRef:c({required:"date required"}),name:"date",defaultValue:P()().format("YYYY-MM-DD"),error:!!i.date,helperText:!!i.date&&i.date.message}),r.a.createElement(q.a,{labelPlacement:"start",label:"Unevenly split",control:r.a.createElement(h.a,{render:function(e){return r.a.createElement(R.a,{checked:e.value,onChange:function(t){return e.onChange(t.target.checked)},color:"primary","aria-labelledby":"open-unevenly"})},name:"unevenly",defaultValue:!1,control:u})}),b&&!!E.length&&!!y&&r.a.createElement(te,{formParticipants:E,totalAmount:+y,outGoingRes:I}),r.a.createElement(O.a,{variant:"contained",color:"primary",type:"submit","data-testid":"submit-btn"},"Confirm"),r.a.createElement(O.a,{variant:"contained",color:"primary",onClick:function(e){e.preventDefault(),f(!1)},"data-testid":"cancel-btn"},"Cancel"))))},le=a(111),ce=a.n(le),oe=a(233),ie=a(235),ue=function(e){var t=e.confirmMessage,a=e.onClickDeleteButton,l=Object(n.useState)(""),c=Object(m.a)(l,2),o=c[0],i=c[1],u=Object(n.useState)(!1),s=Object(m.a)(u,2),d=s[0],p=s[1],f=function(){i(""),p(!1)};return r.a.createElement("div",null,r.a.createElement(k.a,{color:"secondary",onClick:function(){p(!0)}},r.a.createElement(B.a,null)),d&&r.a.createElement(ne,{onClickBackground:function(){return f()},style:{display:"flex",flexDirection:"column"}},r.a.createElement(k.a,{onClick:function(){return f()},style:{alignSelf:"flex-end"}},r.a.createElement(V.a,null)),r.a.createElement(oe.a,null,"Please type",r.a.createElement("span",null," ",t," "),"to confirm."),r.a.createElement(ie.a,{id:"component-outlined",placeholder:"Confirm",value:o,onChange:function(e){i(e.target.value)}}),r.a.createElement(O.a,{variant:"contained",color:"secondary",disabled:t!==o,onClick:function(){a(),p(!1)}},"Delete")))},me=function(){var e=Object(v.c)((function(e){return e.Bills})).allBills,t=Object(v.b)(),a=X();return r.a.createElement("div",null,r.a.createElement("div",{className:ce.a.billsContainer},e.map((function(e){return r.a.createElement(C,{key:e.id,style:{height:"none"}},r.a.createElement("div",null,a(e.payer)),r.a.createElement("div",null,Object(Z.a)(e.amount).toFormat()),r.a.createElement("div",null,e.participants.map((function(e,t){return r.a.createElement("div",{key:t},a(e))}))),r.a.createElement("div",null,e.date),r.a.createElement(ue,{confirmMessage:"123",onClickDeleteButton:function(){t(D(e.id))}}))}))))},se=a(5),de=a.n(se),pe=a(280),fe=function(e){var t=e.summary,a=e.merged,n=X(),l=Object(v.b)();return r.a.createElement("div",null,t.map((function(e,t){return r.a.createElement(C,{key:t,style:{marginTop:"10px"}},r.a.createElement("div",null,r.a.createElement("span",null,n(e.from)),r.a.createElement("span",null," ----\x3e "),r.a.createElement("span",null,n(e.to))),r.a.createElement("div",null,e.amount.toFormat()),!a&&r.a.createElement(k.a,{color:"primary",onClick:function(){l(N({id:Object(g.a)(),payer:e.from,amount:e.amount.toJSON(),participants:[e.to],date:P()().format("YYYY-MM-DD")}))}},r.a.createElement(pe.a,null)))})))};fe.prototype={summary:de.a.array,merged:de.a.bool};var be=r.a.memo(fe),Ee=a(284),ye=a(84),ve=a.n(ye),ge=a(20),he=function(){var e=Object(v.c)((function(e){return e.Bills})).allBills,t=Object(n.useMemo)((function(){var t,a=new Map,n=Object(ge.a)(e);try{for(n.s();!(t=n.n()).done;)for(var r=t.value,l=Object(Z.a)(r.amount).allocate(Array(r.participants.length).fill(1)),c=0,o=r.participants.length;c<o;++c)if(r.participants[c]!==r.payer){var i=r.participants[c],u=r.payer,s=l[c],d="";i<u?d=JSON.stringify([i,u]):(d=JSON.stringify([u,i]),s=Object(Z.a)({amount:0}).subtract(s)),a.has(d)?a.set(d,a.get(d).add(s)):a.set(d,s)}}catch(f){n.e(f)}finally{n.f()}var p=[];return a.forEach((function(e,t){var a=JSON.parse(t),n=Object(m.a)(a,2),r=n[0],l=n[1];if(e.getAmount()>0)p.push({from:r,to:l,amount:e});else{if(0===e.getAmount())return;p.push({from:l,to:r,amount:Object(Z.a)({amount:0}).subtract(e)})}})),p}),[e]),a=Object(n.useMemo)((function(){var e,a={},n=Object(ge.a)(t);try{for(n.s();!(e=n.n()).done;){var r=e.value;a[r.from]=0,a[r.to]=0}}catch(s){n.e(s)}finally{n.f()}var l,c=Object(ge.a)(t);try{for(c.s();!(l=c.n()).done;){var o=l.value;o.amount.getAmount()>0?(a[o.from]-=o.amount.getAmount(),a[o.to]+=o.amount.getAmount()):(a[o.from]+=o.amount.getAmount(),a[o.to]-=o.amount.getAmount())}}catch(s){c.e(s)}finally{c.f()}var i=[],u=[];for(var m in a)if(a[m]<0)i.push([m,a[m]]);else{if(!(a[m]>0))continue;u.push([m,a[m]])}return i.sort((function(e,t){return e[1]-t[1]})),u.sort((function(e,t){return t[1]-e[1]})),[i,u]}),[t]),r=Object(m.a)(a,2),l=r[0],c=r[1];return[t,l,c]},Oe=function(){var e=he(),t=Object(m.a)(e,3),a=t[0],l=t[1],c=t[2],o=Object(n.useState)(!1),i=Object(m.a)(o,2),u=i[0],d=i[1],p=Object(n.useState)(0),f=Object(m.a)(p,2),b=f[0],E=f[1],y=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return t.reduce((function(e,t){return function(){return t(e.apply(void 0,arguments))}}),(function(e){return e}))}((function(e){if(!u)return e;for(var t=[],a=l.map((function(e){return Object(s.a)(e)})),n=c.map((function(e){return Object(s.a)(e)}));0!==a.length;)for(var r=a.pop();0!==r[1];){var o=n.pop();o[1]<=Math.abs(r[1])?(t.push({from:r[0],to:o[0],amount:Object(Z.a)({amount:o[1]})}),r[1]+=o[1]):(t.push({from:r[0],to:o[0],amount:Object(Z.a)({amount:0-r[1]})}),o[1]-=Math.abs(r[1]),r[1]=0,n.push(o))}return t}),(function(e){return 0===b&&e.sort((function(e,t){return e.from<t.from?-1:1})),1===b&&e.sort((function(e,t){return e.to<t.to?-1:1})),2===b&&e.sort((function(e,t){return e.amount.getAmount()-t.amount.getAmount()})),3===b&&e.sort((function(e,t){return t.amount.getAmount()-e.amount.getAmount()})),Object(s.a)(e)}));return r.a.createElement("div",null,r.a.createElement("div",{className:ve.a.tools},r.a.createElement(j.a,{select:!0,value:b,onChange:function(e){E(e.target.value)},label:"Arrangement"},r.a.createElement(J.a,{value:0},"Group By Payer"),r.a.createElement(J.a,{value:1},"Group By Receiver"),r.a.createElement(J.a,{value:2},"Amount Increasing"),r.a.createElement(J.a,{value:3},"Amount Decreasing")),r.a.createElement("div",{className:ve.a.switchGroup},r.a.createElement(Ee.a,{checked:u,onChange:function(e){d(e.target.checked)},color:"primary",name:"Merge"}),r.a.createElement("span",null,"Merged Bills Summary"))),r.a.createElement(be,{summary:y(a),merged:u}))},je=a(282),ke=a(281),Ce=a(112),Se=function(){var e=["#efb4c1","#c8707e","#5aa08d","#e28fad","#e48e58","#f0c7ab","#edaa7d","#a8c879","#678fae","#ac99c1","#96b1d0","#ada759","#c08863","#4c92b1","#c8c2bd"],t=0;return function(){var a=e[t];return t=(t+1)%e.length,a}}(),Be={legend:{position:"left",labels:{fontSize:20,generateLabels:function(e){var t=e.data.datasets,a=[];return t.forEach((function(e){a=a.concat(e.labels.map((function(t,a){return{text:t,fillStyle:e.backgroundColor[a]}})))})),a}}},tooltips:{bodyFontSize:20,callbacks:{label:function(e,t){var a=t.datasets[e.datasetIndex].labels[e.index],n=t.datasets[e.datasetIndex].data[e.index];return n<0?"".concat(a," need spend $").concat(-n):"".concat(a," will receive $").concat(n)}}}},Ie=r.a.memo((function(e){var t=e.payerList,a=e.receiverList,l=X(),c=Object(n.useMemo)((function(){return{datasets:[{label:"will receive",data:a.map((function(e){return e[1]/100})),labels:a.map((function(e){return l(e[0])})),backgroundColor:a.map((function(){return Se()})),borderColor:"#fff",borderWidth:8,hoverBackgroundColor:"rgba(54, 162, 235, 0.6)"},{label:"need spend",data:t.map((function(e){return e[1]/100})),labels:t.map((function(e){return l(e[0])})),backgroundColor:t.map((function(){return Se()})),borderColor:"#fff",borderWidth:4,hoverBackgroundColor:"rgba(54, 162, 235, 0.6)"}]}}),[t,a,l]);return 0===t.length||0===a.length?r.a.createElement("div",null):r.a.createElement("div",{"data-testid":"pieChart"},r.a.createElement(Ce.Pie,{data:c,options:Be}))}));function we(){var e=Object(n.useState)(!1),t=Object(m.a)(e,2),a=t[0],l=t[1],c=he(),o=Object(m.a)(c,3),i=o[1],s=o[2],d=Object(n.useState)(0),p=Object(m.a)(d,2),f=p[0],b=p[1];return r.a.createElement(u,{style:{height:"100vh"}},r.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},r.a.createElement(je.a,{value:f,onChange:function(e,t){return b(t)},indicatorColor:"primary","aria-label":"tabs"},r.a.createElement(ke.a,{label:"bill Record"}),r.a.createElement(ke.a,{label:"transition"}),r.a.createElement(ke.a,{label:"summary"})),r.a.createElement(re,null)),r.a.createElement("div",{style:{display:0===f?"block":"none"}},r.a.createElement(me,null)),r.a.createElement("div",{style:{display:1===f?"block":"none"}},r.a.createElement(Oe,null)),2===f&&r.a.createElement("div",null,r.a.createElement(R.a,{checked:a,onChange:function(e){l(e.target.checked)},color:"primary",name:"show-chart"}),a&&r.a.createElement(Ie,{payerList:i,receiverList:s})))}function xe(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(H.a,{container:!0},r.a.createElement(H.a,{item:!0,sm:10},r.a.createElement(we,null)),r.a.createElement(H.a,{item:!0,sm:2},r.a.createElement(U,null))))}var Ue=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(xe,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var _e=Object(d.a)({reducer:{Users:y,Bills:M}});c.a.render(r.a.createElement(v.a,{store:_e},r.a.createElement(Ue,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},71:function(e,t,a){e.exports={item:"UserBoard_item__37cEp",unordered_list:"UserBoard_unordered_list__38CV5",addUserForm:"UserBoard_addUserForm__3Lc7h",formBtnGroup:"UserBoard_formBtnGroup__3pHvk"}},84:function(e,t,a){e.exports={tools:"SummaryBoard_tools__18hv4",switchGroup:"SummaryBoard_switchGroup__3tzj3"}}},[[121,1,2]]]);
//# sourceMappingURL=main.4f980d39.chunk.js.map