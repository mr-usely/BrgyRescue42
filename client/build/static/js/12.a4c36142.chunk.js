(this.webpackJsonpemergency_admin=this.webpackJsonpemergency_admin||[]).push([[12],{255:function(e,t,n){"use strict";var r=n(0);t.a=function(){var e=Object(r.useRef)(!0);return Object(r.useEffect)((function(){return function(){e.current=!1}}),[]),e}},267:function(e,t,n){"use strict";var r=n(15),a=n(0),i=n(526),c=n(518),s=n(1),o=Object(a.forwardRef)((function(e,t){var n,a,o,l,d=e.children,j=e.type,u=e.direction,b=e.offset,h=e.scale;switch(u){case"up":case"left":o=b,l=0;break;default:o=0,l=b}var m=Object(i.a)(o,l),x=Object(r.a)(m,2),O=x[0],p=x[1],f=Object(i.a)(o,l),g=Object(r.a)(f,2),v=g[0],w=g[1];switch(j){case"rotate":return Object(s.jsx)(c.a.div,{ref:t,animate:{rotate:360},transition:{repeat:1/0,repeatType:"loop",duration:2,repeatDelay:0},children:d});case"slide":return"up"===u||"down"===u?Object(s.jsx)(c.a.div,{ref:t,animate:{y:void 0!==v?v:""},onHoverEnd:function(){return w()},onHoverStart:function(){return w()},children:d}):Object(s.jsx)(c.a.div,{ref:t,animate:{x:void 0!==O?O:""},onHoverEnd:function(){return p()},onHoverStart:function(){return p()},children:d});default:return"number"===typeof h&&(h={hover:h,tap:h}),Object(s.jsx)(c.a.div,{ref:t,whileHover:{scale:null===(n=h)||void 0===n?void 0:n.hover},whileTap:{scale:null===(a=h)||void 0===a?void 0:a.tap},children:d})}}));o.defaultProps={type:"scale",offset:10,direction:"right",scale:{hover:1,tap:.9}},t.a=o},316:function(e,t,n){"use strict";var r=n(7),a=Object(r.a)("div")((function(e){return{backgroundColor:e.theme.palette.primary.light,minHeight:"100vh"}}));t.a=a},317:function(e,t,n){"use strict";var r=n(5),a=n(53),i=n(235),c=n(101),s=n(1),o=["children"];t.a=function(e){var t=e.children,n=Object(a.a)(e,o);return Object(s.jsx)(c.a,Object(r.a)(Object(r.a)({sx:{maxWidth:{xs:400,lg:475},margin:{xs:2.5,md:3},"& > *":{flexGrow:1,flexBasis:"50%"}},content:!1},n),{},{children:Object(s.jsx)(i.a,{sx:{p:{xs:2,sm:3,xl:5}},children:t})}))}},318:function(e,t,n){"use strict";var r=n(218),a=n(69),i=n(320),c=n(1);t.a=function(){return Object(c.jsxs)(r.a,{direction:"row",justifyContent:"space-between",children:[Object(c.jsx)(a.a,{variant:"subtitle2",component:i.a,href:"https://berrydashboard.io",target:"_blank",underline:"hover",children:"rescue42-emergency-hotline.com"}),Object(c.jsx)(a.a,{variant:"subtitle2",component:i.a,href:"https://codedthemes.com",target:"_blank",underline:"hover",children:"\xa9 2022"})]})}},561:function(e,t,n){"use strict";n.r(t);var r=n(31),a=n(28),i=n(222),c=n(230),s=n(218),o=n(69),l=n(183),d=n(316),j=n(317),u=n(5),b=n(14),h=n.n(b),m=n(19),x=n(15),O=n(0),p=n(27),f=n(16),g=n(555),v=n(542),w=n(545),y=n(556),S=n(557),C=n(558),k=n(559),E=n(540),H=n(235),B=n(550),I=n(283),P=n(282),W=n(255),q=n(267),A=n(280),D=n.n(A),F=n(281),_=n.n(F),z=n(49),R=n(1),J=function(e){var t=Object.assign({},e),n=Object(a.a)(),r=Object(f.f)(),i=Object(p.c)((function(e){return e.admin})),c=Object(p.b)(),l=Object(W.a)(),d=Object(O.useState)(!0),j=Object(x.a)(d,2),b=j[0],A=j[1],F=Object(O.useState)(!1),J=Object(x.a)(F,2),M=J[0],T=(J[1],Object(O.useState)("")),U=Object(x.a)(T,2),V=U[0],G=U[1],L=Object(O.useState)(""),K=Object(x.a)(L,2),N=K[0],Q=K[1],X=Object(O.useState)(!1),Y=Object(x.a)(X,2),Z=Y[0],$=Y[1],ee=function(){$(!Z)},te=function(e){e.preventDefault()};return Object(O.useEffect)((function(){i.isLog?(console.log("log true"),r("/dashboard")):console.log("log false")}),[i,r]),Object(R.jsx)(R.Fragment,{children:Object(R.jsx)(P.a,{initialValues:{email:V,password:N,submit:null},validationSchema:I.a().shape({email:I.b().email("Must be a valid email").max(255).required("Email is required"),password:I.b().max(255).required("Password is required")}),onSubmit:function(){var e=Object(m.a)(h.a.mark((function e(t,n){var r,a,i;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=n.setErrors,a=n.setStatus,i=n.setSubmitting;try{l.current&&(a({success:M}),i(!1),c({type:z.a,info:t}))}catch(s){console.error(s),l.current&&(a({success:M}),r({submit:s.message}),i(!1))}case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),children:function(e){var r=e.errors,a=e.handleBlur,i=e.handleChange,c=e.handleSubmit,l=e.isSubmitting,d=e.touched,j=e.values;return Object(R.jsxs)("form",Object(u.a)(Object(u.a)({noValidate:!0,onSubmit:c},t),{},{children:[Object(R.jsxs)(g.a,{fullWidth:!0,error:Boolean(d.email&&r.email),sx:Object(u.a)({},n.typography.customInput),children:[Object(R.jsx)(v.a,{htmlFor:"outlined-adornment-email-login",children:"Email Address / Username"}),Object(R.jsx)(w.a,{id:"outlined-adornment-email-login",type:"email",value:j.email,name:"email",onBlur:a,onChange:function(e){i(e),G(e.target.value)},label:"Email Address / Username",inputProps:{}}),d.email&&r.email&&Object(R.jsx)(y.a,{error:!0,id:"standard-weight-helper-text-email-login",children:r.email})]}),Object(R.jsxs)(g.a,{fullWidth:!0,error:Boolean(d.password&&r.password),sx:Object(u.a)({},n.typography.customInput),children:[Object(R.jsx)(v.a,{htmlFor:"outlined-adornment-password-login",children:"Password"}),Object(R.jsx)(w.a,{id:"outlined-adornment-password-login",type:Z?"text":"password",value:j.password,name:"password",onBlur:a,onChange:function(e){i(e),Q(e.target.value)},endAdornment:Object(R.jsx)(S.a,{position:"end",children:Object(R.jsx)(C.a,{"aria-label":"toggle password visibility",onClick:ee,onMouseDown:te,edge:"end",size:"large",children:Z?Object(R.jsx)(D.a,{}):Object(R.jsx)(_.a,{})})}),label:"Password",inputProps:{}}),d.password&&r.password&&Object(R.jsx)(y.a,{error:!0,id:"standard-weight-helper-text-password-login",children:r.password})]}),Object(R.jsxs)(s.a,{direction:"row",alignItems:"center",justifyContent:"space-between",spacing:1,children:[Object(R.jsx)(k.a,{control:Object(R.jsx)(E.a,{checked:b,onChange:function(e){return A(e.target.checked)},name:"checked",color:"primary"}),label:"Remember me"}),Object(R.jsx)(o.a,{variant:"subtitle1",color:"secondary",sx:{textDecoration:"none",cursor:"pointer"},children:"Forgot Password?"})]}),r.submit&&Object(R.jsx)(H.a,{sx:{mt:3},children:Object(R.jsx)(y.a,{error:!0,children:r.submit})}),Object(R.jsx)(H.a,{sx:{mt:2},children:Object(R.jsx)(q.a,{children:Object(R.jsx)(B.a,{disableElevation:!0,disabled:l,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"secondary",children:"Sign in"})})})]}))}})})},M=n(114),T=n(318);t.default=function(){var e=Object(a.a)(),t=Object(i.a)(e.breakpoints.down("md"));return Object(R.jsx)(d.a,{children:Object(R.jsxs)(c.a,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:[Object(R.jsx)(c.a,{item:!0,xs:12,children:Object(R.jsx)(c.a,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:Object(R.jsx)(c.a,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:Object(R.jsx)(j.a,{children:Object(R.jsxs)(c.a,{container:!0,spacing:1,alignItems:"center",justifyContent:"center",children:[Object(R.jsx)(c.a,{item:!0,sx:{mb:1},children:Object(R.jsx)(r.b,{to:"#",children:Object(R.jsx)(M.a,{})})}),Object(R.jsx)(c.a,{item:!0,xs:12,children:Object(R.jsx)(c.a,{container:!0,direction:t?"column-reverse":"row",alignItems:"center",justifyContent:"center",children:Object(R.jsx)(c.a,{item:!0,children:Object(R.jsxs)(s.a,{alignItems:"center",justifyContent:"center",spacing:1,children:[Object(R.jsx)(o.a,{color:e.palette.secondary.main,gutterBottom:!0,variant:t?"h3":"h2",children:"Hello, Welcome!"}),Object(R.jsx)(o.a,{variant:"caption",fontSize:"16px",textAlign:t?"center":"inherit",children:"Enter your credentials to continue"})]})})})}),Object(R.jsx)(c.a,{item:!0,xs:12,children:Object(R.jsx)(J,{})}),Object(R.jsx)(c.a,{item:!0,xs:12,children:Object(R.jsx)(l.a,{})})]})})})})}),Object(R.jsx)(c.a,{item:!0,xs:12,sx:{m:3,mt:1},children:Object(R.jsx)(T.a,{})})]})})}}}]);
//# sourceMappingURL=12.a4c36142.chunk.js.map