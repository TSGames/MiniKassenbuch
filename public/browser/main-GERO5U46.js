var Mk=Object.defineProperty,Ik=Object.defineProperties;var Tk=Object.getOwnPropertyDescriptors;var Sd=Object.getOwnPropertySymbols;var T0=Object.prototype.hasOwnProperty,k0=Object.prototype.propertyIsEnumerable;var I0=(t,n,e)=>n in t?Mk(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,S=(t,n)=>{for(var e in n||={})T0.call(n,e)&&I0(t,e,n[e]);if(Sd)for(var e of Sd(n))k0.call(n,e)&&I0(t,e,n[e]);return t},de=(t,n)=>Ik(t,Tk(n));var Eh=(t,n)=>{var e={};for(var i in t)T0.call(t,i)&&n.indexOf(i)<0&&(e[i]=t[i]);if(t!=null&&Sd)for(var i of Sd(t))n.indexOf(i)<0&&k0.call(t,i)&&(e[i]=t[i]);return e};var rn=null,xd=!1,Sh=1,kk=null,mt=Symbol("SIGNAL");function ne(t){let n=rn;return rn=t,n}function Md(){return rn}var Vr={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function jr(t){if(xd)throw new Error("");if(rn===null)return;rn.consumerOnSignalRead(t);let n=rn.producersTail;if(n!==void 0&&n.producer===t)return;let e,i=rn.recomputing;if(i&&(e=n!==void 0?n.nextProducer:rn.producers,e!==void 0&&e.producer===t)){rn.producersTail=e,e.lastReadVersion=t.version;return}let r=t.consumersTail;if(r!==void 0&&r.consumer===rn&&(!i||Ak(r,rn)))return;let o=Us(rn),s={producer:t,consumer:rn,nextProducer:e,prevConsumer:r,lastReadVersion:t.version,nextConsumer:void 0};rn.producersTail=s,n!==void 0?n.nextProducer=s:rn.producers=s,o&&N0(t,s)}function R0(){Sh++}function Fo(t){if(!(Us(t)&&!t.dirty)&&!(!t.dirty&&t.lastCleanEpoch===Sh)){if(!t.producerMustRecompute(t)&&!zs(t)){Hs(t);return}t.producerRecomputeValue(t),Hs(t)}}function xh(t){if(t.consumers===void 0)return;let n=xd;xd=!0;try{for(let e=t.consumers;e!==void 0;e=e.nextConsumer){let i=e.consumer;i.dirty||Rk(i)}}finally{xd=n}}function Mh(){return rn?.consumerAllowSignalWrites!==!1}function Rk(t){t.dirty=!0,xh(t),t.consumerMarkedDirty?.(t)}function Hs(t){t.dirty=!1,t.lastCleanEpoch=Sh}function cr(t){return t&&A0(t),ne(t)}function A0(t){t.producersTail=void 0,t.recomputing=!0}function Hr(t,n){ne(n),t&&O0(t)}function O0(t){t.recomputing=!1;let n=t.producersTail,e=n!==void 0?n.nextProducer:t.producers;if(e!==void 0){if(Us(t))do e=Ih(e);while(e!==void 0);n!==void 0?n.nextProducer=void 0:t.producers=void 0}}function zs(t){for(let n=t.producers;n!==void 0;n=n.nextProducer){let e=n.producer,i=n.lastReadVersion;if(i!==e.version||(Fo(e),i!==e.version))return!0}return!1}function zr(t){if(Us(t)){let n=t.producers;for(;n!==void 0;)n=Ih(n)}t.producers=void 0,t.producersTail=void 0,t.consumers=void 0,t.consumersTail=void 0}function N0(t,n){let e=t.consumersTail,i=Us(t);if(e!==void 0?(n.nextConsumer=e.nextConsumer,e.nextConsumer=n):(n.nextConsumer=void 0,t.consumers=n),n.prevConsumer=e,t.consumersTail=n,!i)for(let r=t.producers;r!==void 0;r=r.nextProducer)N0(r.producer,r)}function Ih(t){let n=t.producer,e=t.nextProducer,i=t.nextConsumer,r=t.prevConsumer;if(t.nextConsumer=void 0,t.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:n.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(n.consumers=i,!Us(n)){let o=n.producers;for(;o!==void 0;)o=Ih(o)}return e}function Us(t){return t.consumerIsAlwaysLive||t.consumers!==void 0}function sl(t){kk?.(t)}function Ak(t,n){let e=n.producersTail;if(e!==void 0){let i=n.producers;do{if(i===t)return!0;if(i===e)break;i=i.nextProducer}while(i!==void 0)}return!1}function al(t,n){return Object.is(t,n)}function ll(t,n){let e=Object.create(Ok);e.computation=t,n!==void 0&&(e.equal=n);let i=()=>{if(Fo(e),jr(e),e.value===Ni)throw e.error;return e.value};return i[mt]=e,sl(e),i}var No=Symbol("UNSET"),Po=Symbol("COMPUTING"),Ni=Symbol("ERRORED"),Ok=de(S({},Vr),{value:No,dirty:!0,error:null,equal:al,kind:"computed",producerMustRecompute(t){return t.value===No||t.value===Po},producerRecomputeValue(t){if(t.value===Po)throw new Error("");let n=t.value;t.value=Po;let e=cr(t),i,r=!1;try{i=t.computation(),ne(null),r=n!==No&&n!==Ni&&i!==Ni&&t.equal(n,i)}catch(o){i=Ni,t.error=o}finally{Hr(t,e)}if(r){t.value=n;return}t.value=i,t.version++}});function Nk(){throw new Error}var P0=Nk;function F0(t){P0(t)}function Th(t){P0=t}var Pk=null;function kh(t,n){let e=Object.create(cl);e.value=t,n!==void 0&&(e.equal=n);let i=()=>L0(e);return i[mt]=e,sl(e),[i,s=>Lo(e,s),s=>Id(e,s)]}function L0(t){return jr(t),t.value}function Lo(t,n){Mh()||F0(t),t.equal(t.value,n)||(t.value=n,Fk(t))}function Id(t,n){Mh()||F0(t),Lo(t,n(t.value))}var cl=de(S({},Vr),{equal:al,value:void 0,kind:"signal"});function Fk(t){t.version++,R0(),xh(t),Pk?.(t)}var Rh=de(S({},Vr),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function Ah(t){if(t.dirty=!1,t.version>0&&!zs(t))return;t.version++;let n=cr(t);try{t.cleanup(),t.fn()}finally{Hr(t,n)}}function _e(t){return typeof t=="function"}function $s(t){let e=t(i=>{Error.call(i),i.stack=new Error().stack});return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}var Td=$s(t=>function(e){t(this),this.message=e?`${e.length} errors occurred during unsubscription:
${e.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=e});function Bo(t,n){if(t){let e=t.indexOf(n);0<=e&&t.splice(e,1)}}var ke=class t{constructor(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let n;if(!this.closed){this.closed=!0;let{_parentage:e}=this;if(e)if(this._parentage=null,Array.isArray(e))for(let o of e)o.remove(this);else e.remove(this);let{initialTeardown:i}=this;if(_e(i))try{i()}catch(o){n=o instanceof Td?o.errors:[o]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let o of r)try{B0(o)}catch(s){n=n??[],s instanceof Td?n=[...n,...s.errors]:n.push(s)}}if(n)throw new Td(n)}}add(n){var e;if(n&&n!==this)if(this.closed)B0(n);else{if(n instanceof t){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._finalizers=(e=this._finalizers)!==null&&e!==void 0?e:[]).push(n)}}_hasParent(n){let{_parentage:e}=this;return e===n||Array.isArray(e)&&e.includes(n)}_addParent(n){let{_parentage:e}=this;this._parentage=Array.isArray(e)?(e.push(n),e):e?[e,n]:n}_removeParent(n){let{_parentage:e}=this;e===n?this._parentage=null:Array.isArray(e)&&Bo(e,n)}remove(n){let{_finalizers:e}=this;e&&Bo(e,n),n instanceof t&&n._removeParent(this)}};ke.EMPTY=(()=>{let t=new ke;return t.closed=!0,t})();var Oh=ke.EMPTY;function kd(t){return t instanceof ke||t&&"closed"in t&&_e(t.remove)&&_e(t.add)&&_e(t.unsubscribe)}function B0(t){_e(t)?t():t.unsubscribe()}var fi={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Gs={setTimeout(t,n,...e){let{delegate:i}=Gs;return i?.setTimeout?i.setTimeout(t,n,...e):setTimeout(t,n,...e)},clearTimeout(t){let{delegate:n}=Gs;return(n?.clearTimeout||clearTimeout)(t)},delegate:void 0};function Rd(t){Gs.setTimeout(()=>{let{onUnhandledError:n}=fi;if(n)n(t);else throw t})}function dl(){}var V0=Nh("C",void 0,void 0);function j0(t){return Nh("E",void 0,t)}function H0(t){return Nh("N",t,void 0)}function Nh(t,n,e){return{kind:t,value:n,error:e}}var Vo=null;function Ws(t){if(fi.useDeprecatedSynchronousErrorHandling){let n=!Vo;if(n&&(Vo={errorThrown:!1,error:null}),t(),n){let{errorThrown:e,error:i}=Vo;if(Vo=null,e)throw i}}else t()}function z0(t){fi.useDeprecatedSynchronousErrorHandling&&Vo&&(Vo.errorThrown=!0,Vo.error=t)}var jo=class extends ke{constructor(n){super(),this.isStopped=!1,n?(this.destination=n,kd(n)&&n.add(this)):this.destination=Vk}static create(n,e,i){return new dr(n,e,i)}next(n){this.isStopped?Fh(H0(n),this):this._next(n)}error(n){this.isStopped?Fh(j0(n),this):(this.isStopped=!0,this._error(n))}complete(){this.isStopped?Fh(V0,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(n){this.destination.next(n)}_error(n){try{this.destination.error(n)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},Lk=Function.prototype.bind;function Ph(t,n){return Lk.call(t,n)}var Lh=class{constructor(n){this.partialObserver=n}next(n){let{partialObserver:e}=this;if(e.next)try{e.next(n)}catch(i){Ad(i)}}error(n){let{partialObserver:e}=this;if(e.error)try{e.error(n)}catch(i){Ad(i)}else Ad(n)}complete(){let{partialObserver:n}=this;if(n.complete)try{n.complete()}catch(e){Ad(e)}}},dr=class extends jo{constructor(n,e,i){super();let r;if(_e(n)||!n)r={next:n??void 0,error:e??void 0,complete:i??void 0};else{let o;this&&fi.useDeprecatedNextContext?(o=Object.create(n),o.unsubscribe=()=>this.unsubscribe(),r={next:n.next&&Ph(n.next,o),error:n.error&&Ph(n.error,o),complete:n.complete&&Ph(n.complete,o)}):r=n}this.destination=new Lh(r)}};function Ad(t){fi.useDeprecatedSynchronousErrorHandling?z0(t):Rd(t)}function Bk(t){throw t}function Fh(t,n){let{onStoppedNotification:e}=fi;e&&Gs.setTimeout(()=>e(t,n))}var Vk={closed:!0,next:dl,error:Bk,complete:dl};var qs=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Pn(t){return t}function Bh(...t){return Vh(t)}function Vh(t){return t.length===0?Pn:t.length===1?t[0]:function(e){return t.reduce((i,r)=>r(i),e)}}var ye=(()=>{class t{constructor(e){e&&(this._subscribe=e)}lift(e){let i=new t;return i.source=this,i.operator=e,i}subscribe(e,i,r){let o=Hk(e)?e:new dr(e,i,r);return Ws(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(e){try{return this._subscribe(e)}catch(i){e.error(i)}}forEach(e,i){return i=U0(i),new i((r,o)=>{let s=new dr({next:a=>{try{e(a)}catch(l){o(l),s.unsubscribe()}},error:o,complete:r});this.subscribe(s)})}_subscribe(e){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(e)}[qs](){return this}pipe(...e){return Vh(e)(this)}toPromise(e){return e=U0(e),new e((i,r)=>{let o;this.subscribe(s=>o=s,s=>r(s),()=>i(o))})}}return t.create=n=>new t(n),t})();function U0(t){var n;return(n=t??fi.Promise)!==null&&n!==void 0?n:Promise}function jk(t){return t&&_e(t.next)&&_e(t.error)&&_e(t.complete)}function Hk(t){return t&&t instanceof jo||jk(t)&&kd(t)}function zk(t){return _e(t?.lift)}function be(t){return n=>{if(zk(n))return n.lift(function(e){try{return t(e,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function we(t,n,e,i,r){return new jh(t,n,e,i,r)}var jh=class extends jo{constructor(n,e,i,r,o,s){super(n),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=e?function(a){try{e(a)}catch(l){n.error(l)}}:super._next,this._error=r?function(a){try{r(a)}catch(l){n.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){n.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:e}=this;super.unsubscribe(),!e&&((n=this.onFinalize)===null||n===void 0||n.call(this))}}};var $0=$s(t=>function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var F=(()=>{class t extends ye{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(e){let i=new Od(this,this);return i.operator=e,i}_throwIfClosed(){if(this.closed)throw new $0}next(e){Ws(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(e)}})}error(e){Ws(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=e;let{observers:i}=this;for(;i.length;)i.shift().error(e)}})}complete(){Ws(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:e}=this;for(;e.length;)e.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var e;return((e=this.observers)===null||e===void 0?void 0:e.length)>0}_trySubscribe(e){return this._throwIfClosed(),super._trySubscribe(e)}_subscribe(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)}_innerSubscribe(e){let{hasError:i,isStopped:r,observers:o}=this;return i||r?Oh:(this.currentObservers=null,o.push(e),new ke(()=>{this.currentObservers=null,Bo(o,e)}))}_checkFinalizedStatuses(e){let{hasError:i,thrownError:r,isStopped:o}=this;i?e.error(r):o&&e.complete()}asObservable(){let e=new ye;return e.source=this,e}}return t.create=(n,e)=>new Od(n,e),t})(),Od=class extends F{constructor(n,e){super(),this.destination=n,this.source=e}next(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.next)===null||i===void 0||i.call(e,n)}error(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.error)===null||i===void 0||i.call(e,n)}complete(){var n,e;(e=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||e===void 0||e.call(n)}_subscribe(n){var e,i;return(i=(e=this.source)===null||e===void 0?void 0:e.subscribe(n))!==null&&i!==void 0?i:Oh}};var It=class extends F{constructor(n){super(),this._value=n}get value(){return this.getValue()}_subscribe(n){let e=super._subscribe(n);return!e.closed&&n.next(this._value),e}getValue(){let{hasError:n,thrownError:e,_value:i}=this;if(n)throw e;return this._throwIfClosed(),i}next(n){super.next(this._value=n)}};var ul={now(){return(ul.delegate||Date).now()},delegate:void 0};var Nd=class extends F{constructor(n=1/0,e=1/0,i=ul){super(),this._bufferSize=n,this._windowTime=e,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=e===1/0,this._bufferSize=Math.max(1,n),this._windowTime=Math.max(1,e)}next(n){let{isStopped:e,_buffer:i,_infiniteTimeWindow:r,_timestampProvider:o,_windowTime:s}=this;e||(i.push(n),!r&&i.push(o.now()+s)),this._trimBuffer(),super.next(n)}_subscribe(n){this._throwIfClosed(),this._trimBuffer();let e=this._innerSubscribe(n),{_infiniteTimeWindow:i,_buffer:r}=this,o=r.slice();for(let s=0;s<o.length&&!n.closed;s+=i?1:2)n.next(o[s]);return this._checkFinalizedStatuses(n),e}_trimBuffer(){let{_bufferSize:n,_timestampProvider:e,_buffer:i,_infiniteTimeWindow:r}=this,o=(r?1:2)*n;if(n<1/0&&o<i.length&&i.splice(0,i.length-o),!r){let s=e.now(),a=0;for(let l=1;l<i.length&&i[l]<=s;l+=2)a=l;a&&i.splice(0,a+1)}}};var Pd=class extends ke{constructor(n,e){super()}schedule(n,e=0){return this}};var fl={setInterval(t,n,...e){let{delegate:i}=fl;return i?.setInterval?i.setInterval(t,n,...e):setInterval(t,n,...e)},clearInterval(t){let{delegate:n}=fl;return(n?.clearInterval||clearInterval)(t)},delegate:void 0};var Fd=class extends Pd{constructor(n,e){super(n,e),this.scheduler=n,this.work=e,this.pending=!1}schedule(n,e=0){var i;if(this.closed)return this;this.state=n;let r=this.id,o=this.scheduler;return r!=null&&(this.id=this.recycleAsyncId(o,r,e)),this.pending=!0,this.delay=e,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(o,this.id,e),this}requestAsyncId(n,e,i=0){return fl.setInterval(n.flush.bind(n,this),i)}recycleAsyncId(n,e,i=0){if(i!=null&&this.delay===i&&this.pending===!1)return e;e!=null&&fl.clearInterval(e)}execute(n,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let i=this._execute(n,e);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(n,e){let i=!1,r;try{this.work(n)}catch(o){i=!0,r=o||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),r}unsubscribe(){if(!this.closed){let{id:n,scheduler:e}=this,{actions:i}=e;this.work=this.state=this.scheduler=null,this.pending=!1,Bo(i,this),n!=null&&(this.id=this.recycleAsyncId(e,n,null)),this.delay=null,super.unsubscribe()}}};var Ks=class t{constructor(n,e=t.now){this.schedulerActionCtor=n,this.now=e}schedule(n,e=0,i){return new this.schedulerActionCtor(this,n).schedule(i,e)}};Ks.now=ul.now;var Ld=class extends Ks{constructor(n,e=Ks.now){super(n,e),this.actions=[],this._active=!1}flush(n){let{actions:e}=this;if(this._active){e.push(n);return}let i;this._active=!0;do if(i=n.execute(n.state,n.delay))break;while(n=e.shift());if(this._active=!1,i){for(;n=e.shift();)n.unsubscribe();throw i}}};var ml=new Ld(Fd),G0=ml;var pt=new ye(t=>t.complete());function Bd(t){return t&&_e(t.schedule)}function Hh(t){return t[t.length-1]}function Vd(t){return _e(Hh(t))?t.pop():void 0}function Pi(t){return Bd(Hh(t))?t.pop():void 0}function W0(t,n){return typeof Hh(t)=="number"?t.pop():n}function K0(t,n,e,i){function r(o){return o instanceof e?o:new e(function(s){s(o)})}return new(e||(e=Promise))(function(o,s){function a(d){try{c(i.next(d))}catch(p){s(p)}}function l(d){try{c(i.throw(d))}catch(p){s(p)}}function c(d){d.done?o(d.value):r(d.value).then(a,l)}c((i=i.apply(t,n||[])).next())})}function q0(t){var n=typeof Symbol=="function"&&Symbol.iterator,e=n&&t[n],i=0;if(e)return e.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function Ho(t){return this instanceof Ho?(this.v=t,this):new Ho(t)}function Y0(t,n,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=e.apply(t,n||[]),r,o=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),r[Symbol.asyncIterator]=function(){return this},r;function s(v){return function(y){return Promise.resolve(y).then(v,p)}}function a(v,y){i[v]&&(r[v]=function(D){return new Promise(function(M,R){o.push([v,D,M,R])>1||l(v,D)})},y&&(r[v]=y(r[v])))}function l(v,y){try{c(i[v](y))}catch(D){_(o[0][3],D)}}function c(v){v.value instanceof Ho?Promise.resolve(v.value.v).then(d,p):_(o[0][2],v)}function d(v){l("next",v)}function p(v){l("throw",v)}function _(v,y){v(y),o.shift(),o.length&&l(o[0][0],o[0][1])}}function Q0(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=t[Symbol.asyncIterator],e;return n?n.call(t):(t=typeof q0=="function"?q0(t):t[Symbol.iterator](),e={},i("next"),i("throw"),i("return"),e[Symbol.asyncIterator]=function(){return this},e);function i(o){e[o]=t[o]&&function(s){return new Promise(function(a,l){s=t[o](s),r(a,l,s.done,s.value)})}}function r(o,s,a,l){Promise.resolve(l).then(function(c){o({value:c,done:a})},s)}}var jd=t=>t&&typeof t.length=="number"&&typeof t!="function";function Hd(t){return _e(t?.then)}function zd(t){return _e(t[qs])}function Ud(t){return Symbol.asyncIterator&&_e(t?.[Symbol.asyncIterator])}function $d(t){return new TypeError(`You provided ${t!==null&&typeof t=="object"?"an invalid object":`'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function Uk(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Gd=Uk();function Wd(t){return _e(t?.[Gd])}function qd(t){return Y0(this,arguments,function*(){let e=t.getReader();try{for(;;){let{value:i,done:r}=yield Ho(e.read());if(r)return yield Ho(void 0);yield yield Ho(i)}}finally{e.releaseLock()}})}function Kd(t){return _e(t?.getReader)}function Ye(t){if(t instanceof ye)return t;if(t!=null){if(zd(t))return $k(t);if(jd(t))return Gk(t);if(Hd(t))return Wk(t);if(Ud(t))return Z0(t);if(Wd(t))return qk(t);if(Kd(t))return Kk(t)}throw $d(t)}function $k(t){return new ye(n=>{let e=t[qs]();if(_e(e.subscribe))return e.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Gk(t){return new ye(n=>{for(let e=0;e<t.length&&!n.closed;e++)n.next(t[e]);n.complete()})}function Wk(t){return new ye(n=>{t.then(e=>{n.closed||(n.next(e),n.complete())},e=>n.error(e)).then(null,Rd)})}function qk(t){return new ye(n=>{for(let e of t)if(n.next(e),n.closed)return;n.complete()})}function Z0(t){return new ye(n=>{Yk(t,n).catch(e=>n.error(e))})}function Kk(t){return Z0(qd(t))}function Yk(t,n){var e,i,r,o;return K0(this,void 0,void 0,function*(){try{for(e=Q0(t);i=yield e.next(),!i.done;){let s=i.value;if(n.next(s),n.closed)return}}catch(s){r={error:s}}finally{try{i&&!i.done&&(o=e.return)&&(yield o.call(e))}finally{if(r)throw r.error}}n.complete()})}function Dn(t,n,e,i=0,r=!1){let o=n.schedule(function(){e(),r?t.add(this.schedule(null,i)):this.unsubscribe()},i);if(t.add(o),!r)return o}function Yd(t,n=0){return be((e,i)=>{e.subscribe(we(i,r=>Dn(i,t,()=>i.next(r),n),()=>Dn(i,t,()=>i.complete(),n),r=>Dn(i,t,()=>i.error(r),n)))})}function Qd(t,n=0){return be((e,i)=>{i.add(t.schedule(()=>e.subscribe(i),n))})}function X0(t,n){return Ye(t).pipe(Qd(n),Yd(n))}function J0(t,n){return Ye(t).pipe(Qd(n),Yd(n))}function eC(t,n){return new ye(e=>{let i=0;return n.schedule(function(){i===t.length?e.complete():(e.next(t[i++]),e.closed||this.schedule())})})}function tC(t,n){return new ye(e=>{let i;return Dn(e,n,()=>{i=t[Gd](),Dn(e,n,()=>{let r,o;try{({value:r,done:o}=i.next())}catch(s){e.error(s);return}o?e.complete():e.next(r)},0,!0)}),()=>_e(i?.return)&&i.return()})}function Zd(t,n){if(!t)throw new Error("Iterable cannot be null");return new ye(e=>{Dn(e,n,()=>{let i=t[Symbol.asyncIterator]();Dn(e,n,()=>{i.next().then(r=>{r.done?e.complete():e.next(r.value)})},0,!0)})})}function nC(t,n){return Zd(qd(t),n)}function iC(t,n){if(t!=null){if(zd(t))return X0(t,n);if(jd(t))return eC(t,n);if(Hd(t))return J0(t,n);if(Ud(t))return Zd(t,n);if(Wd(t))return tC(t,n);if(Kd(t))return nC(t,n)}throw $d(t)}function Qe(t,n){return n?iC(t,n):Ye(t)}function Q(...t){let n=Pi(t);return Qe(t,n)}function zo(t,n){let e=_e(t)?t:()=>t,i=r=>r.error(e());return new ye(n?r=>n.schedule(i,0,r):i)}function pl(t){return!!t&&(t instanceof ye||_e(t.lift)&&_e(t.subscribe))}var Uo=$s(t=>function(){t(this),this.name="EmptyError",this.message="no elements in sequence"});function rC(t){return t instanceof Date&&!isNaN(t)}function ue(t,n){return be((e,i)=>{let r=0;e.subscribe(we(i,o=>{i.next(t.call(n,o,r++))}))})}var{isArray:Qk}=Array;function Zk(t,n){return Qk(n)?t(...n):t(n)}function Xd(t){return ue(n=>Zk(t,n))}var{isArray:Xk}=Array,{getPrototypeOf:Jk,prototype:eR,keys:tR}=Object;function Jd(t){if(t.length===1){let n=t[0];if(Xk(n))return{args:n,keys:null};if(nR(n)){let e=tR(n);return{args:e.map(i=>n[i]),keys:e}}}return{args:t,keys:null}}function nR(t){return t&&typeof t=="object"&&Jk(t)===eR}function eu(t,n){return t.reduce((e,i,r)=>(e[i]=n[r],e),{})}function Ys(...t){let n=Pi(t),e=Vd(t),{args:i,keys:r}=Jd(t);if(i.length===0)return Qe([],n);let o=new ye(iR(i,n,r?s=>eu(r,s):Pn));return e?o.pipe(Xd(e)):o}function iR(t,n,e=Pn){return i=>{oC(n,()=>{let{length:r}=t,o=new Array(r),s=r,a=r;for(let l=0;l<r;l++)oC(n,()=>{let c=Qe(t[l],n),d=!1;c.subscribe(we(i,p=>{o[l]=p,d||(d=!0,a--),a||i.next(e(o.slice()))},()=>{--s||i.complete()}))},i)},i)}}function oC(t,n,e){t?Dn(e,t,n):n()}function sC(t,n,e,i,r,o,s,a){let l=[],c=0,d=0,p=!1,_=()=>{p&&!l.length&&!c&&n.complete()},v=D=>c<i?y(D):l.push(D),y=D=>{o&&n.next(D),c++;let M=!1;Ye(e(D,d++)).subscribe(we(n,R=>{r?.(R),o?v(R):n.next(R)},()=>{M=!0},void 0,()=>{if(M)try{for(c--;l.length&&c<i;){let R=l.shift();s?Dn(n,s,()=>y(R)):y(R)}_()}catch(R){n.error(R)}}))};return t.subscribe(we(n,v,()=>{p=!0,_()})),()=>{a?.()}}function Xt(t,n,e=1/0){return _e(n)?Xt((i,r)=>ue((o,s)=>n(i,o,r,s))(Ye(t(i,r))),e):(typeof n=="number"&&(e=n),be((i,r)=>sC(i,r,t,e)))}function Ur(t=1/0){return Xt(Pn,t)}function aC(){return Ur(1)}function $r(...t){return aC()(Qe(t,Pi(t)))}function $o(t){return new ye(n=>{Ye(t()).subscribe(n)})}function hl(...t){let n=Vd(t),{args:e,keys:i}=Jd(t),r=new ye(o=>{let{length:s}=e;if(!s){o.complete();return}let a=new Array(s),l=s,c=s;for(let d=0;d<s;d++){let p=!1;Ye(e[d]).subscribe(we(o,_=>{p||(p=!0,c--),a[d]=_},()=>l--,void 0,()=>{(!l||!p)&&(c||o.next(i?eu(i,a):a),o.complete())}))}});return n?r.pipe(Xd(n)):r}function lC(t=0,n,e=G0){let i=-1;return n!=null&&(Bd(n)?e=n:i=n),new ye(r=>{let o=rC(t)?+t-e.now():t;o<0&&(o=0);let s=0;return e.schedule(function(){r.closed||(r.next(s++),0<=i?this.schedule(void 0,i):r.complete())},o)})}function Go(...t){let n=Pi(t),e=W0(t,1/0),i=t;return i.length?i.length===1?Ye(i[0]):Ur(e)(Qe(i,n)):pt}function We(t,n){return be((e,i)=>{let r=0;e.subscribe(we(i,o=>t.call(n,o,r++)&&i.next(o)))})}function cC(t){return be((n,e)=>{let i=!1,r=null,o=null,s=!1,a=()=>{if(o?.unsubscribe(),o=null,i){i=!1;let c=r;r=null,e.next(c)}s&&e.complete()},l=()=>{o=null,s&&e.complete()};n.subscribe(we(e,c=>{i=!0,r=c,o||Ye(t(c)).subscribe(o=we(e,a,l))},()=>{s=!0,(!i||!o||o.closed)&&e.complete()}))})}function tu(t,n=ml){return cC(()=>lC(t,n))}function mi(t){return be((n,e)=>{let i=null,r=!1,o;i=n.subscribe(we(e,void 0,void 0,s=>{o=Ye(t(s,mi(t)(n))),i?(i.unsubscribe(),i=null,o.subscribe(e)):r=!0})),r&&(i.unsubscribe(),i=null,o.subscribe(e))})}function Gr(t,n){return _e(n)?Xt(t,n,1):Xt(t,1)}function gl(t,n=ml){return be((e,i)=>{let r=null,o=null,s=null,a=()=>{if(r){r.unsubscribe(),r=null;let c=o;o=null,i.next(c)}};function l(){let c=s+t,d=n.now();if(d<c){r=this.schedule(void 0,c-d),i.add(r);return}a()}e.subscribe(we(i,c=>{o=c,s=n.now(),r||(r=n.schedule(l,t),i.add(r))},()=>{a(),i.complete()},void 0,()=>{o=r=null}))})}function dC(t){return be((n,e)=>{let i=!1;n.subscribe(we(e,r=>{i=!0,e.next(r)},()=>{i||e.next(t),e.complete()}))})}function hn(t){return t<=0?()=>pt:be((n,e)=>{let i=0;n.subscribe(we(e,r=>{++i<=t&&(e.next(r),t<=i&&e.complete())}))})}function nu(t,n=Pn){return t=t??rR,be((e,i)=>{let r,o=!0;e.subscribe(we(i,s=>{let a=n(s);(o||!t(r,a))&&(o=!1,r=a,i.next(s))}))})}function rR(t,n){return t===n}function uC(t=oR){return be((n,e)=>{let i=!1;n.subscribe(we(e,r=>{i=!0,e.next(r)},()=>i?e.complete():e.error(t())))})}function oR(){return new Uo}function Wr(t){return be((n,e)=>{try{n.subscribe(e)}finally{e.add(t)}})}function ur(t,n){let e=arguments.length>=2;return i=>i.pipe(t?We((r,o)=>t(r,o,i)):Pn,hn(1),e?dC(n):uC(()=>new Uo))}function iu(t){return t<=0?()=>pt:be((n,e)=>{let i=[];n.subscribe(we(e,r=>{i.push(r),t<i.length&&i.shift()},()=>{for(let r of i)e.next(r);e.complete()},void 0,()=>{i=null}))})}function ru(){return be((t,n)=>{let e,i=!1;t.subscribe(we(n,r=>{let o=e;e=r,i&&n.next([o,r]),i=!0}))})}function vl(t={}){let{connector:n=()=>new F,resetOnError:e=!0,resetOnComplete:i=!0,resetOnRefCountZero:r=!0}=t;return o=>{let s,a,l,c=0,d=!1,p=!1,_=()=>{a?.unsubscribe(),a=void 0},v=()=>{_(),s=l=void 0,d=p=!1},y=()=>{let D=s;v(),D?.unsubscribe()};return be((D,M)=>{c++,!p&&!d&&_();let R=l=l??n();M.add(()=>{c--,c===0&&!p&&!d&&(a=zh(y,r))}),R.subscribe(M),!s&&c>0&&(s=new dr({next:$=>R.next($),error:$=>{p=!0,_(),a=zh(v,e,$),R.error($)},complete:()=>{d=!0,_(),a=zh(v,i),R.complete()}}),Ye(D).subscribe(s))})(o)}}function zh(t,n,...e){if(n===!0){t();return}if(n===!1)return;let i=new dr({next:()=>{i.unsubscribe(),t()}});return Ye(n(...e)).subscribe(i)}function ou(t,n,e){let i,r=!1;return t&&typeof t=="object"?{bufferSize:i=1/0,windowTime:n=1/0,refCount:r=!1,scheduler:e}=t:i=t??1/0,vl({connector:()=>new Nd(i,n,e),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:r})}function _l(t){return We((n,e)=>t<=e)}function zt(...t){let n=Pi(t);return be((e,i)=>{(n?$r(t,e,n):$r(t,e)).subscribe(i)})}function Ct(t,n){return be((e,i)=>{let r=null,o=0,s=!1,a=()=>s&&!r&&i.complete();e.subscribe(we(i,l=>{r?.unsubscribe();let c=0,d=o++;Ye(t(l,d)).subscribe(r=we(i,p=>i.next(n?n(l,p,d,c++):p),()=>{r=null,a()}))},()=>{s=!0,a()}))})}function xe(t){return be((n,e)=>{Ye(t).subscribe(we(e,()=>e.complete(),dl)),!e.closed&&n.subscribe(e)})}function Uh(t,n=!1){return be((e,i)=>{let r=0;e.subscribe(we(i,o=>{let s=t(o,r++);(s||n)&&i.next(o),!s&&i.complete()}))})}function it(t,n,e){let i=_e(t)||n||e?{next:t,error:n,complete:e}:t;return i?be((r,o)=>{var s;(s=i.subscribe)===null||s===void 0||s.call(i);let a=!0;r.subscribe(we(o,l=>{var c;(c=i.next)===null||c===void 0||c.call(i,l),o.next(l)},()=>{var l;a=!1,(l=i.complete)===null||l===void 0||l.call(i),o.complete()},l=>{var c;a=!1,(c=i.error)===null||c===void 0||c.call(i,l),o.error(l)},()=>{var l,c;a&&((l=i.unsubscribe)===null||l===void 0||l.call(i)),(c=i.finalize)===null||c===void 0||c.call(i)}))}):Pn}var $h;function su(){return $h}function Fi(t){let n=$h;return $h=t,n}var fC=Symbol("NotFound");function Qs(t){return t===fC||t?.name==="\u0275NotFound"}function Gh(t,n,e){let i=Object.create(sR);i.source=t,i.computation=n,e!=null&&(i.equal=e);let o=()=>{if(Fo(i),jr(i),i.value===Ni)throw i.error;return i.value};return o[mt]=i,sl(i),o}function mC(t,n){Fo(t),Lo(t,n),Hs(t)}function pC(t,n){if(Fo(t),t.value===Ni)throw t.error;Id(t,n),Hs(t)}var sR=de(S({},Vr),{value:No,dirty:!0,error:null,equal:al,kind:"linkedSignal",producerMustRecompute(t){return t.value===No||t.value===Po},producerRecomputeValue(t){if(t.value===Po)throw new Error("");let n=t.value;t.value=Po;let e=cr(t),i,r=!1;try{let o=t.source(),s=n!==No&&n!==Ni,a=s?{source:t.sourceValue,value:n}:void 0;i=t.computation(o,a),t.sourceValue=o,ne(null),r=s&&i!==Ni&&t.equal(n,i)}catch(o){i=Ni,t.error=o}finally{Hr(t,e)}if(r){t.value=n;return}t.value=i,t.version++}});function hC(t){let n=ne(null);try{return t()}finally{ne(n)}}var mu="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",x=class extends Error{code;constructor(n,e){super(pi(n,e)),this.code=n}};function aR(t){return`NG0${Math.abs(t)}`}function pi(t,n){return`${aR(t)}${n?": "+n:""}`}var kt=globalThis;function Be(t){for(let n in t)if(t[n]===Be)return n;throw Error("")}function bC(t,n){for(let e in n)n.hasOwnProperty(e)&&!t.hasOwnProperty(e)&&(t[e]=n[e])}function Sl(t){if(typeof t=="string")return t;if(Array.isArray(t))return`[${t.map(Sl).join(", ")}]`;if(t==null)return""+t;let n=t.overriddenName||t.name;if(n)return`${n}`;let e=t.toString();if(e==null)return""+e;let i=e.indexOf(`
`);return i>=0?e.slice(0,i):e}function pu(t,n){return t?n?`${t} ${n}`:t:n||""}var lR=Be({__forward_ref__:Be});function Ut(t){return t.__forward_ref__=Ut,t}function Jt(t){return rg(t)?t():t}function rg(t){return typeof t=="function"&&t.hasOwnProperty(lR)&&t.__forward_ref__===Ut}function C(t){return{token:t.token,providedIn:t.providedIn||null,factory:t.factory,value:void 0}}function L(t){return{providers:t.providers||[],imports:t.imports||[]}}function xl(t){return cR(t,hu)}function og(t){return xl(t)!==null}function cR(t,n){return t.hasOwnProperty(n)&&t[n]||null}function dR(t){let n=t?.[hu]??null;return n||null}function qh(t){return t&&t.hasOwnProperty(lu)?t[lu]:null}var hu=Be({\u0275prov:Be}),lu=Be({\u0275inj:Be}),w=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(n,e){this._desc=n,this.\u0275prov=void 0,typeof e=="number"?this.__NG_ELEMENT_ID__=e:e!==void 0&&(this.\u0275prov=C({token:this,providedIn:e.providedIn||"root",factory:e.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function sg(t){return t&&!!t.\u0275providers}var ag=Be({\u0275cmp:Be}),lg=Be({\u0275dir:Be}),cg=Be({\u0275pipe:Be}),dg=Be({\u0275mod:Be}),bl=Be({\u0275fac:Be}),Qo=Be({__NG_ELEMENT_ID__:Be}),gC=Be({__NG_ENV_ID__:Be});function ug(t){return gu(t,"@NgModule"),t[dg]||null}function Bi(t){return gu(t,"@Component"),t[ag]||null}function fg(t){return gu(t,"@Directive"),t[lg]||null}function CC(t){return gu(t,"@Pipe"),t[cg]||null}function gu(t,n){if(t==null)throw new x(-919,!1)}function Xs(t){return typeof t=="string"?t:t==null?"":String(t)}var wC=Be({ngErrorCode:Be}),uR=Be({ngErrorMessage:Be}),fR=Be({ngTokenPath:Be});function mg(t,n){return DC("",-200,n)}function vu(t,n){throw new x(-201,!1)}function DC(t,n,e){let i=new x(n,t);return i[wC]=n,i[uR]=t,e&&(i[fR]=e),i}function mR(t){return t[wC]}var Kh;function EC(){return Kh}function gn(t){let n=Kh;return Kh=t,n}function pg(t,n,e){let i=xl(t);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(e&8)return null;if(n!==void 0)return n;vu(t,"")}var pR={},Wo=pR,hR="__NG_DI_FLAG__",Yh=class{injector;constructor(n){this.injector=n}retrieve(n,e){let i=qo(e)||0;try{return this.injector.get(n,i&8?null:Wo,i)}catch(r){if(Qs(r))return r;throw r}}};function gR(t,n=0){let e=su();if(e===void 0)throw new x(-203,!1);if(e===null)return pg(t,void 0,n);{let i=vR(n),r=e.retrieve(t,i);if(Qs(r)){if(i.optional)return null;throw r}return r}}function A(t,n=0){return(EC()||gR)(Jt(t),n)}function u(t,n){return A(t,qo(n))}function qo(t){return typeof t>"u"||typeof t=="number"?t:0|(t.optional&&8)|(t.host&&1)|(t.self&&2)|(t.skipSelf&&4)}function vR(t){return{optional:!!(t&8),host:!!(t&1),self:!!(t&2),skipSelf:!!(t&4)}}function Qh(t){let n=[];for(let e=0;e<t.length;e++){let i=Jt(t[e]);if(Array.isArray(i)){if(i.length===0)throw new x(900,!1);let r,o=0;for(let s=0;s<i.length;s++){let a=i[s],l=_R(a);typeof l=="number"?l===-1?r=a.token:o|=l:r=a}n.push(A(r,o))}else n.push(A(i))}return n}function _R(t){return t[hR]}function qr(t,n){let e=t.hasOwnProperty(bl);return e?t[bl]:null}function SC(t,n,e){if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++){let r=t[i],o=n[i];if(e&&(r=e(r),o=e(o)),o!==r)return!1}return!0}function xC(t){return t.flat(Number.POSITIVE_INFINITY)}function _u(t,n){t.forEach(e=>Array.isArray(e)?_u(e,n):n(e))}function hg(t,n,e){n>=t.length?t.push(e):t.splice(n,0,e)}function Ml(t,n){return n>=t.length-1?t.pop():t.splice(n,1)[0]}function MC(t,n){let e=[];for(let i=0;i<t;i++)e.push(n);return e}function IC(t,n,e,i){let r=t.length;if(r==n)t.push(e,i);else if(r===1)t.push(i,t[0]),t[0]=e;else{for(r--,t.push(t[r-1],t[r]);r>n;){let o=r-2;t[r]=t[o],r--}t[n]=e,t[n+1]=i}}function yu(t,n,e){let i=Js(t,n);return i>=0?t[i|1]=e:(i=~i,IC(t,i,n,e)),i}function bu(t,n){let e=Js(t,n);if(e>=0)return t[e|1]}function Js(t,n){return yR(t,n,1)}function yR(t,n,e){let i=0,r=t.length>>e;for(;r!==i;){let o=i+(r-i>>1),s=t[o<<e];if(n===s)return o<<e;s>n?r=o:i=o+1}return~(r<<e)}var Qr={},on=[],Zo=new w(""),gg=new w("",-1),vg=new w(""),Cl=class{get(n,e=Wo){if(e===Wo){let r=DC("",-201);throw r.name="\u0275NotFound",r}return e}};function Zr(t){return{\u0275providers:t}}function Cu(...t){return{\u0275providers:_g(!0,t),\u0275fromNgModule:!0}}function _g(t,...n){let e=[],i=new Set,r,o=s=>{e.push(s)};return _u(n,s=>{let a=s;cu(a,o,[],i)&&(r||=[],r.push(a))}),r!==void 0&&TC(r,o),e}function TC(t,n){for(let e=0;e<t.length;e++){let{ngModule:i,providers:r}=t[e];yg(r,o=>{n(o,i)})}}function cu(t,n,e,i){if(t=Jt(t),!t)return!1;let r=null,o=qh(t),s=!o&&Bi(t);if(!o&&!s){let l=t.ngModule;if(o=qh(l),o)r=l;else return!1}else{if(s&&!s.standalone)return!1;r=t}let a=i.has(r);if(s){if(a)return!1;if(i.add(r),s.dependencies){let l=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let c of l)cu(c,n,e,i)}}else if(o){if(o.imports!=null&&!a){i.add(r);let c;_u(o.imports,d=>{cu(d,n,e,i)&&(c||=[],c.push(d))}),c!==void 0&&TC(c,n)}if(!a){let c=qr(r)||(()=>new r);n({provide:r,useFactory:c,deps:on},r),n({provide:vg,useValue:r,multi:!0},r),n({provide:Zo,useValue:()=>A(r),multi:!0},r)}let l=o.providers;if(l!=null&&!a){let c=t;yg(l,d=>{n(d,c)})}}else return!1;return r!==t&&t.providers!==void 0}function yg(t,n){for(let e of t)sg(e)&&(e=e.\u0275providers),Array.isArray(e)?yg(e,n):n(e)}var bR=Be({provide:String,useValue:Be});function kC(t){return t!==null&&typeof t=="object"&&bR in t}function CR(t){return!!(t&&t.useExisting)}function wR(t){return!!(t&&t.useFactory)}function Ko(t){return typeof t=="function"}function RC(t){return!!t.useClass}var Il=new w(""),au={},vC={},Wh;function ea(){return Wh===void 0&&(Wh=new Cl),Wh}var Ve=class{},Yo=class extends Ve{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(n,e,i,r){super(),this.parent=e,this.source=i,this.scopes=r,Xh(n,s=>this.processProvider(s)),this.records.set(gg,Zs(void 0,this)),r.has("environment")&&this.records.set(Ve,Zs(void 0,this));let o=this.records.get(Il);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(vg,on,{self:!0}))}retrieve(n,e){let i=qo(e)||0;try{return this.get(n,Wo,i)}catch(r){if(Qs(r))return r;throw r}}destroy(){yl(this),this._destroyed=!0;let n=ne(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let e=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of e)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),ne(n)}}onDestroy(n){return yl(this),this._onDestroyHooks.push(n),()=>this.removeOnDestroy(n)}runInContext(n){yl(this);let e=Fi(this),i=gn(void 0),r;try{return n()}finally{Fi(e),gn(i)}}get(n,e=Wo,i){if(yl(this),n.hasOwnProperty(gC))return n[gC](this);let r=qo(i),o,s=Fi(this),a=gn(void 0);try{if(!(r&4)){let c=this.records.get(n);if(c===void 0){let d=MR(n)&&xl(n);d&&this.injectableDefInScope(d)?c=Zs(Zh(n),au):c=null,this.records.set(n,c)}if(c!=null)return this.hydrate(n,c,r)}let l=r&2?ea():this.parent;return e=r&8&&e===Wo?null:e,l.get(n,e)}catch(l){let c=mR(l);throw c===-200||c===-201?new x(c,null):l}finally{gn(a),Fi(s)}}resolveInjectorInitializers(){let n=ne(null),e=Fi(this),i=gn(void 0),r;try{let o=this.get(Zo,on,{self:!0});for(let s of o)s()}finally{Fi(e),gn(i),ne(n)}}toString(){return"R3Injector[...]"}processProvider(n){n=Jt(n);let e=Ko(n)?n:Jt(n&&n.provide),i=ER(n);if(!Ko(n)&&n.multi===!0){let r=this.records.get(e);r||(r=Zs(void 0,au,!0),r.factory=()=>Qh(r.multi),this.records.set(e,r)),e=n,r.multi.push(n)}this.records.set(e,i)}hydrate(n,e,i){let r=ne(null);try{if(e.value===vC)throw mg("");return e.value===au&&(e.value=vC,e.value=e.factory(void 0,i)),typeof e.value=="object"&&e.value&&xR(e.value)&&this._ngOnDestroyHooks.add(e.value),e.value}finally{ne(r)}}injectableDefInScope(n){if(!n.providedIn)return!1;let e=Jt(n.providedIn);return typeof e=="string"?e==="any"||this.scopes.has(e):this.injectorDefTypes.has(e)}removeOnDestroy(n){let e=this._onDestroyHooks.indexOf(n);e!==-1&&this._onDestroyHooks.splice(e,1)}};function Zh(t){let n=xl(t),e=n!==null?n.factory:qr(t);if(e!==null)return e;if(t instanceof w)throw new x(-204,!1);if(t instanceof Function)return DR(t);throw new x(-204,!1)}function DR(t){if(t.length>0)throw new x(-204,!1);let e=dR(t);return e!==null?()=>e.factory(t):()=>new t}function ER(t){if(kC(t))return Zs(void 0,t.useValue);{let n=bg(t);return Zs(n,au)}}function bg(t,n,e){let i;if(Ko(t)){let r=Jt(t);return qr(r)||Zh(r)}else if(kC(t))i=()=>Jt(t.useValue);else if(wR(t))i=()=>t.useFactory(...Qh(t.deps||[]));else if(CR(t))i=(r,o)=>A(Jt(t.useExisting),o!==void 0&&o&8?8:void 0);else{let r=Jt(t&&(t.useClass||t.provide));if(SR(t))i=()=>new r(...Qh(t.deps));else return qr(r)||Zh(r)}return i}function yl(t){if(t.destroyed)throw new x(-205,!1)}function Zs(t,n,e=!1){return{factory:t,value:n,multi:e?[]:void 0}}function SR(t){return!!t.deps}function xR(t){return t!==null&&typeof t=="object"&&typeof t.ngOnDestroy=="function"}function MR(t){return typeof t=="function"||typeof t=="object"&&t.ngMetadataName==="InjectionToken"}function Xh(t,n){for(let e of t)Array.isArray(e)?Xh(e,n):e&&sg(e)?Xh(e.\u0275providers,n):n(e)}function Rt(t,n){let e;t instanceof Yo?(yl(t),e=t):e=new Yh(t);let i,r=Fi(e),o=gn(void 0);try{return n()}finally{Fi(r),gn(o)}}function Cg(){return EC()!==void 0||su()!=null}var hi=0,ie=1,fe=2,Tt=3,Yn=4,_n=5,Xo=6,ta=7,ht=8,mr=9,gi=10,qe=11,na=12,wg=13,Jo=14,yn=15,Xr=16,es=17,Vi=18,pr=19,Dg=20,fr=21,wu=22,Kr=23,Fn=24,ts=25,Jr=26,rt=27,AC=1,Eg=6,eo=7,Tl=8,ns=9,lt=10;function hr(t){return Array.isArray(t)&&typeof t[AC]=="object"}function vi(t){return Array.isArray(t)&&t[AC]===!0}function Sg(t){return(t.flags&4)!==0}function gr(t){return t.componentOffset>-1}function ia(t){return(t.flags&1)===1}function ji(t){return!!t.template}function ra(t){return(t[fe]&512)!==0}function is(t){return(t[fe]&256)===256}var xg="svg",OC="math";function Qn(t){for(;Array.isArray(t);)t=t[hi];return t}function Mg(t,n){return Qn(n[t])}function _i(t,n){return Qn(n[t.index])}function Du(t,n){return t.data[n]}function Eu(t,n){return t[n]}function Ig(t,n,e,i){e>=t.data.length&&(t.data[e]=null,t.blueprint[e]=null),n[e]=i}function Zn(t,n){let e=n[t];return hr(e)?e:e[hi]}function NC(t){return(t[fe]&4)===4}function Su(t){return(t[fe]&128)===128}function PC(t){return vi(t[Tt])}function Ln(t,n){return n==null?null:t[n]}function Tg(t){t[es]=0}function kg(t){t[fe]&1024||(t[fe]|=1024,Su(t)&&rs(t))}function FC(t,n){for(;t>0;)n=n[Jo],t--;return n}function kl(t){return!!(t[fe]&9216||t[Fn]?.dirty)}function xu(t){t[gi].changeDetectionScheduler?.notify(8),t[fe]&64&&(t[fe]|=1024),kl(t)&&rs(t)}function rs(t){t[gi].changeDetectionScheduler?.notify(0);let n=Yr(t);for(;n!==null&&!(n[fe]&8192||(n[fe]|=8192,!Su(n)));)n=Yr(n)}function Rg(t,n){if(is(t))throw new x(911,!1);t[fr]===null&&(t[fr]=[]),t[fr].push(n)}function LC(t,n){if(t[fr]===null)return;let e=t[fr].indexOf(n);e!==-1&&t[fr].splice(e,1)}function Yr(t){let n=t[Tt];return vi(n)?n[Tt]:n}function Ag(t){return t[ta]??=[]}function Og(t){return t.cleanup??=[]}function BC(t,n,e,i){let r=Ag(n);r.push(e),t.firstCreatePass&&Og(t).push(i,r.length-1)}var Ce={lFrame:QC(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Jh=!1;function VC(){return Ce.lFrame.elementDepthCount}function jC(){Ce.lFrame.elementDepthCount++}function Ng(){Ce.lFrame.elementDepthCount--}function Mu(){return Ce.bindingsEnabled}function Pg(){return Ce.skipHydrationRootTNode!==null}function Fg(t){return Ce.skipHydrationRootTNode===t}function Lg(){Ce.skipHydrationRootTNode=null}function J(){return Ce.lFrame.lView}function Je(){return Ce.lFrame.tView}function oe(t){return Ce.lFrame.contextLView=t,t[ht]}function se(t){return Ce.lFrame.contextLView=null,t}function At(){let t=Bg();for(;t!==null&&t.type===64;)t=t.parent;return t}function Bg(){return Ce.lFrame.currentTNode}function HC(){let t=Ce.lFrame,n=t.currentTNode;return t.isParent?n:n.parent}function oa(t,n){let e=Ce.lFrame;e.currentTNode=t,e.isParent=n}function Vg(){return Ce.lFrame.isParent}function jg(){Ce.lFrame.isParent=!1}function zC(){return Ce.lFrame.contextLView}function Hg(){return Jh}function wl(t){let n=Jh;return Jh=t,n}function os(){let t=Ce.lFrame,n=t.bindingRootIndex;return n===-1&&(n=t.bindingRootIndex=t.tView.bindingStartIndex),n}function UC(){return Ce.lFrame.bindingIndex}function $C(t){return Ce.lFrame.bindingIndex=t}function to(){return Ce.lFrame.bindingIndex++}function Iu(t){let n=Ce.lFrame,e=n.bindingIndex;return n.bindingIndex=n.bindingIndex+t,e}function GC(){return Ce.lFrame.inI18n}function WC(t,n){let e=Ce.lFrame;e.bindingIndex=e.bindingRootIndex=t,Tu(n)}function qC(){return Ce.lFrame.currentDirectiveIndex}function Tu(t){Ce.lFrame.currentDirectiveIndex=t}function KC(t){let n=Ce.lFrame.currentDirectiveIndex;return n===-1?null:t[n]}function ku(){return Ce.lFrame.currentQueryIndex}function Rl(t){Ce.lFrame.currentQueryIndex=t}function IR(t){let n=t[ie];return n.type===2?n.declTNode:n.type===1?t[_n]:null}function zg(t,n,e){if(e&4){let r=n,o=t;for(;r=r.parent,r===null&&!(e&1);)if(r=IR(o),r===null||(o=o[Jo],r.type&10))break;if(r===null)return!1;n=r,t=o}let i=Ce.lFrame=YC();return i.currentTNode=n,i.lView=t,!0}function Ru(t){let n=YC(),e=t[ie];Ce.lFrame=n,n.currentTNode=e.firstChild,n.lView=t,n.tView=e,n.contextLView=t,n.bindingIndex=e.bindingStartIndex,n.inI18n=!1}function YC(){let t=Ce.lFrame,n=t===null?null:t.child;return n===null?QC(t):n}function QC(t){let n={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:t,child:null,inI18n:!1};return t!==null&&(t.child=n),n}function ZC(){let t=Ce.lFrame;return Ce.lFrame=t.parent,t.currentTNode=null,t.lView=null,t}var Ug=ZC;function Au(){let t=ZC();t.isParent=!0,t.tView=null,t.selectedIndex=-1,t.contextLView=null,t.elementDepthCount=0,t.currentDirectiveIndex=-1,t.currentNamespace=null,t.bindingRootIndex=-1,t.bindingIndex=-1,t.currentQueryIndex=0}function XC(t){return(Ce.lFrame.contextLView=FC(t,Ce.lFrame.contextLView))[ht]}function Hi(){return Ce.lFrame.selectedIndex}function no(t){Ce.lFrame.selectedIndex=t}function Al(){let t=Ce.lFrame;return Du(t.tView,t.selectedIndex)}function vr(){Ce.lFrame.currentNamespace=xg}function Ou(){TR()}function TR(){Ce.lFrame.currentNamespace=null}function JC(){return Ce.lFrame.currentNamespace}var ew=!0;function Nu(){return ew}function Ol(t){ew=t}function eg(t,n=null,e=null,i){let r=$g(t,n,e,i);return r.resolveInjectorInitializers(),r}function $g(t,n=null,e=null,i,r=new Set){let o=[e||on,Cu(t)],s;return new Yo(o,n||ea(),s||null,r)}var ce=class t{static THROW_IF_NOT_FOUND=Wo;static NULL=new Cl;static create(n,e){if(Array.isArray(n))return eg({name:""},e,n,"");{let i=n.name??"";return eg({name:i},n.parent,n.providers,i)}}static \u0275prov=C({token:t,providedIn:"any",factory:()=>A(gg)});static __NG_ELEMENT_ID__=-1},Y=new w(""),sn=(()=>{class t{static __NG_ELEMENT_ID__=kR;static __NG_ENV_ID__=e=>e}return t})(),du=class extends sn{_lView;constructor(n){super(),this._lView=n}get destroyed(){return is(this._lView)}onDestroy(n){let e=this._lView;return Rg(e,n),()=>LC(e,n)}};function kR(){return new du(J())}var tw=!1,nw=new w(""),_r=(()=>{class t{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new It(!1);debugTaskTracker=u(nw,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new ye(e=>{e.next(!1),e.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let e=this.taskId++;return this.pendingTasks.add(e),this.debugTaskTracker?.add(e),e}has(e){return this.pendingTasks.has(e)}remove(e){this.pendingTasks.delete(e),this.debugTaskTracker?.remove(e),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=C({token:t,providedIn:"root",factory:()=>new t})}return t})(),tg=class extends F{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(n=!1){super(),this.__isAsync=n,Cg()&&(this.destroyRef=u(sn,{optional:!0})??void 0,this.pendingTasks=u(_r,{optional:!0})??void 0)}emit(n){let e=ne(null);try{super.next(n)}finally{ne(e)}}subscribe(n,e,i){let r=n,o=e||(()=>null),s=i;if(n&&typeof n=="object"){let l=n;r=l.next?.bind(l),o=l.error?.bind(l),s=l.complete?.bind(l)}this.__isAsync&&(o=this.wrapInTimeout(o),r&&(r=this.wrapInTimeout(r)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:r,error:o,complete:s});return n instanceof ke&&n.add(a),a}wrapInTimeout(n){return e=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{n(e)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},Z=tg;function uu(...t){}function Gg(t){let n,e;function i(){t=uu;try{e!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(e),n!==void 0&&clearTimeout(n)}catch{}}return n=setTimeout(()=>{t(),i()}),typeof requestAnimationFrame=="function"&&(e=requestAnimationFrame(()=>{t(),i()})),()=>i()}function iw(t){return queueMicrotask(()=>t()),()=>{t=uu}}var Wg="isAngularZone",Dl=Wg+"_ID",RR=0,U=class t{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new Z(!1);onMicrotaskEmpty=new Z(!1);onStable=new Z(!1);onError=new Z(!1);constructor(n){let{enableLongStackTrace:e=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:o=tw}=n;if(typeof Zone>"u")throw new x(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),e&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!r&&i,s.shouldCoalesceRunChangeDetection=r,s.callbackScheduled=!1,s.scheduleInRootZone=o,NR(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Wg)===!0}static assertInAngularZone(){if(!t.isInAngularZone())throw new x(909,!1)}static assertNotInAngularZone(){if(t.isInAngularZone())throw new x(909,!1)}run(n,e,i){return this._inner.run(n,e,i)}runTask(n,e,i,r){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+r,n,AR,uu,uu);try{return o.runTask(s,e,i)}finally{o.cancelTask(s)}}runGuarded(n,e,i){return this._inner.runGuarded(n,e,i)}runOutsideAngular(n){return this._outer.run(n)}},AR={};function qg(t){if(t._nesting==0&&!t.hasPendingMicrotasks&&!t.isStable)try{t._nesting++,t.onMicrotaskEmpty.emit(null)}finally{if(t._nesting--,!t.hasPendingMicrotasks)try{t.runOutsideAngular(()=>t.onStable.emit(null))}finally{t.isStable=!0}}}function OR(t){if(t.isCheckStableRunning||t.callbackScheduled)return;t.callbackScheduled=!0;function n(){Gg(()=>{t.callbackScheduled=!1,ng(t),t.isCheckStableRunning=!0,qg(t),t.isCheckStableRunning=!1})}t.scheduleInRootZone?Zone.root.run(()=>{n()}):t._outer.run(()=>{n()}),ng(t)}function NR(t){let n=()=>{OR(t)},e=RR++;t._inner=t._inner.fork({name:"angular",properties:{[Wg]:!0,[Dl]:e,[Dl+e]:!0},onInvokeTask:(i,r,o,s,a,l)=>{if(PR(l))return i.invokeTask(o,s,a,l);try{return _C(t),i.invokeTask(o,s,a,l)}finally{(t.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||t.shouldCoalesceRunChangeDetection)&&n(),yC(t)}},onInvoke:(i,r,o,s,a,l,c)=>{try{return _C(t),i.invoke(o,s,a,l,c)}finally{t.shouldCoalesceRunChangeDetection&&!t.callbackScheduled&&!FR(l)&&n(),yC(t)}},onHasTask:(i,r,o,s)=>{i.hasTask(o,s),r===o&&(s.change=="microTask"?(t._hasPendingMicrotasks=s.microTask,ng(t),qg(t)):s.change=="macroTask"&&(t.hasPendingMacrotasks=s.macroTask))},onHandleError:(i,r,o,s)=>(i.handleError(o,s),t.runOutsideAngular(()=>t.onError.emit(s)),!1)})}function ng(t){t._hasPendingMicrotasks||(t.shouldCoalesceEventChangeDetection||t.shouldCoalesceRunChangeDetection)&&t.callbackScheduled===!0?t.hasPendingMicrotasks=!0:t.hasPendingMicrotasks=!1}function _C(t){t._nesting++,t.isStable&&(t.isStable=!1,t.onUnstable.emit(null))}function yC(t){t._nesting--,qg(t)}var El=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new Z;onMicrotaskEmpty=new Z;onStable=new Z;onError=new Z;run(n,e,i){return n.apply(e,i)}runGuarded(n,e,i){return n.apply(e,i)}runOutsideAngular(n){return n()}runTask(n,e,i,r){return n.apply(e,i)}};function PR(t){return rw(t,"__ignore_ng_zone__")}function FR(t){return rw(t,"__scheduler_tick__")}function rw(t,n){return!Array.isArray(t)||t.length!==1?!1:t[0]?.data?.[n]===!0}var vn=class{_console=console;handleError(n){this._console.error("ERROR",n)}},Xn=new w("",{factory:()=>{let t=u(U),n=u(Ve),e;return i=>{t.runOutsideAngular(()=>{n.destroyed&&!e?setTimeout(()=>{throw i}):(e??=n.get(vn),e.handleError(i))})}}}),ow={provide:Zo,useValue:()=>{let t=u(vn,{optional:!0})},multi:!0};function T(t,n){let[e,i,r]=kh(t,n?.equal),o=e,s=o[mt];return o.set=i,o.update=r,o.asReadonly=Pu.bind(o),o}function Pu(){let t=this[mt];if(t.readonlyFn===void 0){let n=()=>this();n[mt]=t,t.readonlyFn=n}return t.readonlyFn}var sa=(()=>{class t{view;node;constructor(e,i){this.view=e,this.node=i}static __NG_ELEMENT_ID__=LR}return t})();function LR(){return new sa(J(),At())}var Li=class{},Nl=new w("",{factory:()=>!0});var Kg=new w(""),aa=(()=>{class t{internalPendingTasks=u(_r);scheduler=u(Li);errorHandler=u(Xn);add(){let e=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(e)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(e))}}run(e){let i=this.add();e().catch(this.errorHandler).finally(i)}static \u0275prov=C({token:t,providedIn:"root",factory:()=>new t})}return t})(),Fu=(()=>{class t{static \u0275prov=C({token:t,providedIn:"root",factory:()=>new ig})}return t})(),ig=class{dirtyEffectCount=0;queues=new Map;add(n){this.enqueue(n),this.schedule(n)}schedule(n){n.dirty&&this.dirtyEffectCount++}remove(n){let e=n.zone,i=this.queues.get(e);i.has(n)&&(i.delete(n),n.dirty&&this.dirtyEffectCount--)}enqueue(n){let e=n.zone;this.queues.has(e)||this.queues.set(e,new Set);let i=this.queues.get(e);i.has(n)||i.add(n)}flush(){for(;this.dirtyEffectCount>0;){let n=!1;for(let[e,i]of this.queues)e===null?n||=this.flushQueue(i):n||=e.run(()=>this.flushQueue(i));n||(this.dirtyEffectCount=0)}}flushQueue(n){let e=!1;for(let i of n)i.dirty&&(this.dirtyEffectCount--,e=!0,i.run());return e}},fu=class{[mt];constructor(n){this[mt]=n}destroy(){this[mt].destroy()}};function bn(t,n){let e=n?.injector??u(ce),i=n?.manualCleanup!==!0?e.get(sn):null,r,o=e.get(sa,null,{optional:!0}),s=e.get(Li);return o!==null?(r=jR(o.view,s,t),i instanceof du&&i._lView===o.view&&(i=null)):r=HR(t,e.get(Fu),s),r.injector=e,i!==null&&(r.onDestroyFns=[i.onDestroy(()=>r.destroy())]),new fu(r)}var sw=de(S({},Rh),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let t=wl(!1);try{Ah(this)}finally{wl(t)}},cleanup(){if(!this.cleanupFns?.length)return;let t=ne(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],ne(t)}}}),BR=de(S({},sw),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(zr(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.scheduler.remove(this)}}),VR=de(S({},sw),{consumerMarkedDirty(){this.view[fe]|=8192,rs(this.view),this.notifier.notify(13)},destroy(){if(zr(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.view[Kr]?.delete(this)}});function jR(t,n,e){let i=Object.create(VR);return i.view=t,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=n,i.fn=aw(i,e),t[Kr]??=new Set,t[Kr].add(i),i.consumerMarkedDirty(i),i}function HR(t,n,e){let i=Object.create(BR);return i.fn=aw(i,t),i.scheduler=n,i.notifier=e,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.add(i),i.notifier.notify(12),i}function aw(t,n){return()=>{n(e=>(t.cleanupFns??=[]).push(e))}}function Gl(t){return{toString:t}.toString()}function KR(t){return typeof t=="function"}function Hw(t,n,e,i){n!==null?n.applyValueToInputSignal(n,i):t[e]=i}var Wu=class{previousValue;currentValue;firstChange;constructor(n,e,i){this.previousValue=n,this.currentValue=e,this.firstChange=i}isFirstChange(){return this.firstChange}},et=(()=>{let t=()=>zw;return t.ngInherit=!0,t})();function zw(t){return t.type.prototype.ngOnChanges&&(t.setInput=QR),YR}function YR(){let t=$w(this),n=t?.current;if(n){let e=t.previous;if(e===Qr)t.previous=n;else for(let i in n)e[i]=n[i];t.current=null,this.ngOnChanges(n)}}function QR(t,n,e,i,r){let o=this.declaredInputs[i],s=$w(t)||ZR(t,{previous:Qr,current:null}),a=s.current||(s.current={}),l=s.previous,c=l[o];a[o]=new Wu(c&&c.currentValue,e,l===Qr),Hw(t,n,r,e)}var Uw="__ngSimpleChanges__";function $w(t){return t[Uw]||null}function ZR(t,n){return t[Uw]=n}var lw=[];var je=function(t,n=null,e){for(let i=0;i<lw.length;i++){let r=lw[i];r(t,n,e)}},Ne=(function(t){return t[t.TemplateCreateStart=0]="TemplateCreateStart",t[t.TemplateCreateEnd=1]="TemplateCreateEnd",t[t.TemplateUpdateStart=2]="TemplateUpdateStart",t[t.TemplateUpdateEnd=3]="TemplateUpdateEnd",t[t.LifecycleHookStart=4]="LifecycleHookStart",t[t.LifecycleHookEnd=5]="LifecycleHookEnd",t[t.OutputStart=6]="OutputStart",t[t.OutputEnd=7]="OutputEnd",t[t.BootstrapApplicationStart=8]="BootstrapApplicationStart",t[t.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",t[t.BootstrapComponentStart=10]="BootstrapComponentStart",t[t.BootstrapComponentEnd=11]="BootstrapComponentEnd",t[t.ChangeDetectionStart=12]="ChangeDetectionStart",t[t.ChangeDetectionEnd=13]="ChangeDetectionEnd",t[t.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",t[t.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",t[t.AfterRenderHooksStart=16]="AfterRenderHooksStart",t[t.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",t[t.ComponentStart=18]="ComponentStart",t[t.ComponentEnd=19]="ComponentEnd",t[t.DeferBlockStateStart=20]="DeferBlockStateStart",t[t.DeferBlockStateEnd=21]="DeferBlockStateEnd",t[t.DynamicComponentStart=22]="DynamicComponentStart",t[t.DynamicComponentEnd=23]="DynamicComponentEnd",t[t.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",t[t.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",t})(Ne||{});function XR(t,n,e){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:o}=n.type.prototype;if(i){let s=zw(n);(e.preOrderHooks??=[]).push(t,s),(e.preOrderCheckHooks??=[]).push(t,s)}r&&(e.preOrderHooks??=[]).push(0-t,r),o&&((e.preOrderHooks??=[]).push(t,o),(e.preOrderCheckHooks??=[]).push(t,o))}function Gw(t,n){for(let e=n.directiveStart,i=n.directiveEnd;e<i;e++){let o=t.data[e].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:d}=o;s&&(t.contentHooks??=[]).push(-e,s),a&&((t.contentHooks??=[]).push(e,a),(t.contentCheckHooks??=[]).push(e,a)),l&&(t.viewHooks??=[]).push(-e,l),c&&((t.viewHooks??=[]).push(e,c),(t.viewCheckHooks??=[]).push(e,c)),d!=null&&(t.destroyHooks??=[]).push(e,d)}}function Hu(t,n,e){Ww(t,n,3,e)}function zu(t,n,e,i){(t[fe]&3)===e&&Ww(t,n,e,i)}function Yg(t,n){let e=t[fe];(e&3)===n&&(e&=16383,e+=1,t[fe]=e)}function Ww(t,n,e,i){let r=i!==void 0?t[es]&65535:0,o=i??-1,s=n.length-1,a=0;for(let l=r;l<s;l++)if(typeof n[l+1]=="number"){if(a=n[l],i!=null&&a>=i)break}else n[l]<0&&(t[es]+=65536),(a<o||o==-1)&&(JR(t,e,n,l),t[es]=(t[es]&4294901760)+l+2),l++}function cw(t,n){je(Ne.LifecycleHookStart,t,n);let e=ne(null);try{n.call(t)}finally{ne(e),je(Ne.LifecycleHookEnd,t,n)}}function JR(t,n,e,i){let r=e[i]<0,o=e[i+1],s=r?-e[i]:e[i],a=t[s];r?t[fe]>>14<t[es]>>16&&(t[fe]&3)===n&&(t[fe]+=16384,cw(a,o)):cw(a,o)}var ca=-1,as=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(n,e,i,r){this.factory=n,this.name=r,this.canSeeViewProviders=e,this.injectImpl=i}};function eA(t){return(t.flags&8)!==0}function tA(t){return(t.flags&16)!==0}function nA(t,n,e){let i=0;for(;i<e.length;){let r=e[i];if(typeof r=="number"){if(r!==0)break;i++;let o=e[i++],s=e[i++],a=e[i++];t.setAttribute(n,s,a,o)}else{let o=r,s=e[++i];iA(o)?t.setProperty(n,o,s):t.setAttribute(n,o,s),i++}}return i}function qw(t){return t===3||t===4||t===6}function iA(t){return t.charCodeAt(0)===64}function da(t,n){if(!(n===null||n.length===0))if(t===null||t.length===0)t=n.slice();else{let e=-1;for(let i=0;i<n.length;i++){let r=n[i];typeof r=="number"?e=r:e===0||(e===-1||e===2?dw(t,e,r,null,n[++i]):dw(t,e,r,null,null))}}return t}function dw(t,n,e,i,r){let o=0,s=t.length;if(n===-1)s=-1;else for(;o<t.length;){let a=t[o++];if(typeof a=="number"){if(a===n){s=-1;break}else if(a>n){s=o-1;break}}}for(;o<t.length;){let a=t[o];if(typeof a=="number")break;if(a===e){r!==null&&(t[o+1]=r);return}o++,r!==null&&o++}s!==-1&&(t.splice(s,0,n),o=s+1),t.splice(o++,0,e),r!==null&&t.splice(o++,0,r)}function Kw(t){return t!==ca}function qu(t){return t&32767}function rA(t){return t>>16}function Ku(t,n){let e=rA(t),i=n;for(;e>0;)i=i[Jo],e--;return i}var sv=!0;function Yu(t){let n=sv;return sv=t,n}var oA=256,Yw=oA-1,Qw=5,sA=0,zi={};function aA(t,n,e){let i;typeof e=="string"?i=e.charCodeAt(0)||0:e.hasOwnProperty(Qo)&&(i=e[Qo]),i==null&&(i=e[Qo]=sA++);let r=i&Yw,o=1<<r;n.data[t+(r>>Qw)]|=o}function Qu(t,n){let e=Zw(t,n);if(e!==-1)return e;let i=n[ie];i.firstCreatePass&&(t.injectorIndex=n.length,Qg(i.data,t),Qg(n,null),Qg(i.blueprint,null));let r=zv(t,n),o=t.injectorIndex;if(Kw(r)){let s=qu(r),a=Ku(r,n),l=a[ie].data;for(let c=0;c<8;c++)n[o+c]=a[s+c]|l[s+c]}return n[o+8]=r,o}function Qg(t,n){t.push(0,0,0,0,0,0,0,0,n)}function Zw(t,n){return t.injectorIndex===-1||t.parent&&t.parent.injectorIndex===t.injectorIndex||n[t.injectorIndex+8]===null?-1:t.injectorIndex}function zv(t,n){if(t.parent&&t.parent.injectorIndex!==-1)return t.parent.injectorIndex;let e=0,i=null,r=n;for(;r!==null;){if(i=nD(r),i===null)return ca;if(e++,r=r[Jo],i.injectorIndex!==-1)return i.injectorIndex|e<<16}return ca}function av(t,n,e){aA(t,n,e)}function lA(t,n){if(n==="class")return t.classes;if(n==="style")return t.styles;let e=t.attrs;if(e){let i=e.length,r=0;for(;r<i;){let o=e[r];if(qw(o))break;if(o===0)r=r+2;else if(typeof o=="number")for(r++;r<i&&typeof e[r]=="string";)r++;else{if(o===n)return e[r+1];r=r+2}}}return null}function Xw(t,n,e){if(e&8||t!==void 0)return t;vu(n,"NodeInjector")}function Jw(t,n,e,i){if(e&8&&i===void 0&&(i=null),(e&3)===0){let r=t[mr],o=gn(void 0);try{return r?r.get(n,i,e&8):pg(n,i,e&8)}finally{gn(o)}}return Xw(i,n,e)}function eD(t,n,e,i=0,r){if(t!==null){if(n[fe]&2048&&!(i&2)){let s=fA(t,n,e,i,zi);if(s!==zi)return s}let o=tD(t,n,e,i,zi);if(o!==zi)return o}return Jw(n,e,i,r)}function tD(t,n,e,i,r){let o=dA(e);if(typeof o=="function"){if(!zg(n,t,i))return i&1?Xw(r,e,i):Jw(n,e,i,r);try{let s;if(s=o(i),s==null&&!(i&8))vu(e);else return s}finally{Ug()}}else if(typeof o=="number"){let s=null,a=Zw(t,n),l=ca,c=i&1?n[yn][_n]:null;for((a===-1||i&4)&&(l=a===-1?zv(t,n):n[a+8],l===ca||!fw(i,!1)?a=-1:(s=n[ie],a=qu(l),n=Ku(l,n)));a!==-1;){let d=n[ie];if(uw(o,a,d.data)){let p=cA(a,n,e,s,i,c);if(p!==zi)return p}l=n[a+8],l!==ca&&fw(i,n[ie].data[a+8]===c)&&uw(o,a,n)?(s=d,a=qu(l),n=Ku(l,n)):a=-1}}return r}function cA(t,n,e,i,r,o){let s=n[ie],a=s.data[t+8],l=i==null?gr(a)&&sv:i!=s&&(a.type&3)!==0,c=r&1&&o===a,d=Uu(a,s,e,l,c);return d!==null?Vl(n,s,d,a,r):zi}function Uu(t,n,e,i,r){let o=t.providerIndexes,s=n.data,a=o&1048575,l=t.directiveStart,c=t.directiveEnd,d=o>>20,p=i?a:a+d,_=r?a+d:c;for(let v=p;v<_;v++){let y=s[v];if(v<l&&e===y||v>=l&&y.type===e)return v}if(r){let v=s[l];if(v&&ji(v)&&v.type===e)return l}return null}function Vl(t,n,e,i,r){let o=t[e],s=n.data;if(o instanceof as){let a=o;if(a.resolving)throw mg("");let l=Yu(a.canSeeViewProviders);a.resolving=!0;let c=s[e].type||s[e],d,p=a.injectImpl?gn(a.injectImpl):null,_=zg(t,i,0);try{o=t[e]=a.factory(void 0,r,s,t,i),n.firstCreatePass&&e>=i.directiveStart&&XR(e,s[e],n)}finally{p!==null&&gn(p),Yu(l),a.resolving=!1,Ug()}}return o}function dA(t){if(typeof t=="string")return t.charCodeAt(0)||0;let n=t.hasOwnProperty(Qo)?t[Qo]:void 0;return typeof n=="number"?n>=0?n&Yw:uA:n}function uw(t,n,e){let i=1<<t;return!!(e[n+(t>>Qw)]&i)}function fw(t,n){return!(t&2)&&!(t&1&&n)}var ss=class{_tNode;_lView;constructor(n,e){this._tNode=n,this._lView=e}get(n,e,i){return eD(this._tNode,this._lView,n,qo(i),e)}};function uA(){return new ss(At(),J())}function en(t){return Gl(()=>{let n=t.prototype.constructor,e=n[bl]||lv(n),i=Object.prototype,r=Object.getPrototypeOf(t.prototype).constructor;for(;r&&r!==i;){let o=r[bl]||lv(r);if(o&&o!==e)return o;r=Object.getPrototypeOf(r)}return o=>new o})}function lv(t){return rg(t)?()=>{let n=lv(Jt(t));return n&&n()}:qr(t)}function fA(t,n,e,i,r){let o=t,s=n;for(;o!==null&&s!==null&&s[fe]&2048&&!ra(s);){let a=tD(o,s,e,i|2,zi);if(a!==zi)return a;let l=o.parent;if(!l){let c=s[Dg];if(c){let d=c.get(e,zi,i&-5);if(d!==zi)return d}l=nD(s),s=s[Jo]}o=l}return r}function nD(t){let n=t[ie],e=n.type;return e===2?n.declTNode:e===1?t[_n]:null}function Wl(t){return lA(At(),t)}function mA(){return ha(At(),J())}function ha(t,n){return new z(_i(t,n))}var z=(()=>{class t{nativeElement;constructor(e){this.nativeElement=e}static __NG_ELEMENT_ID__=mA}return t})();function iD(t){return t instanceof z?t.nativeElement:t}function pA(){return this._results[Symbol.iterator]()}var Jn=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new F}constructor(n=!1){this._emitDistinctChangesOnly=n}get(n){return this._results[n]}map(n){return this._results.map(n)}filter(n){return this._results.filter(n)}find(n){return this._results.find(n)}reduce(n,e){return this._results.reduce(n,e)}forEach(n){this._results.forEach(n)}some(n){return this._results.some(n)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(n,e){this.dirty=!1;let i=xC(n);(this._changesDetected=!SC(this._results,i,e))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(n){this._onDirty=n}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=pA};function rD(t){return(t.flags&128)===128}var Uv=(function(t){return t[t.OnPush=0]="OnPush",t[t.Eager=1]="Eager",t[t.Default=1]="Default",t})(Uv||{}),oD=new Map,hA=0;function gA(){return hA++}function vA(t){oD.set(t[pr],t)}function cv(t){oD.delete(t[pr])}var mw="__ngContext__";function ua(t,n){hr(n)?(t[mw]=n[pr],vA(n)):t[mw]=n}function sD(t){return lD(t[na])}function aD(t){return lD(t[Yn])}function lD(t){for(;t!==null&&!vi(t);)t=t[Yn];return t}var _A;function $v(t){_A=t}var oo=new w("",{factory:()=>yA}),yA="ng";var df=new w(""),ds=new w("",{providedIn:"platform",factory:()=>"unknown"}),so=new w(""),us=new w("",{factory:()=>u(Y).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var cD="r";var dD="di";var uD=!1,fD=new w("",{factory:()=>uD});var uf=new w("");var bA=(t,n,e,i)=>{};function CA(t,n,e,i){bA(t,n,e,i)}function ff(t){return(t.flags&32)===32}var wA=()=>null;function mD(t,n,e=!1){return wA(t,n,e)}function pD(t,n){let e=t.contentQueries;if(e!==null){let i=ne(null);try{for(let r=0;r<e.length;r+=2){let o=e[r],s=e[r+1];if(s!==-1){let a=t.data[s];Rl(o),a.contentQueries(2,n[s],s)}}}finally{ne(i)}}}function dv(t,n,e){Rl(0);let i=ne(null);try{n(t,e)}finally{ne(i)}}function Gv(t,n,e){if(Sg(n)){let i=ne(null);try{let r=n.directiveStart,o=n.directiveEnd;for(let s=r;s<o;s++){let a=t.data[s];if(a.contentQueries){let l=e[s];a.contentQueries(1,l,s)}}}finally{ne(i)}}}var Ci=(function(t){return t[t.Emulated=0]="Emulated",t[t.None=2]="None",t[t.ShadowDom=3]="ShadowDom",t[t.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",t})(Ci||{});var Lu;function DA(){if(Lu===void 0&&(Lu=null,kt.trustedTypes))try{Lu=kt.trustedTypes.createPolicy("angular",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return Lu}function mf(t){return DA()?.createHTML(t)||t}var Bu;function EA(){if(Bu===void 0&&(Bu=null,kt.trustedTypes))try{Bu=kt.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return Bu}function pw(t){return EA()?.createScriptURL(t)||t}var yr=class{changingThisBreaksApplicationSecurity;constructor(n){this.changingThisBreaksApplicationSecurity=n}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${mu})`}},uv=class extends yr{getTypeName(){return"HTML"}},fv=class extends yr{getTypeName(){return"Style"}},mv=class extends yr{getTypeName(){return"Script"}},pv=class extends yr{getTypeName(){return"URL"}},hv=class extends yr{getTypeName(){return"ResourceURL"}};function ei(t){return t instanceof yr?t.changingThisBreaksApplicationSecurity:t}function br(t,n){let e=hD(t);if(e!=null&&e!==n){if(e==="ResourceURL"&&n==="URL")return!0;throw new Error(`Required a safe ${n}, got a ${e} (see ${mu})`)}return e===n}function hD(t){return t instanceof yr&&t.getTypeName()||null}function Wv(t){return new uv(t)}function qv(t){return new fv(t)}function Kv(t){return new mv(t)}function Yv(t){return new pv(t)}function Qv(t){return new hv(t)}function SA(t){let n=new vv(t);return xA()?new gv(n):n}var gv=class{inertDocumentHelper;constructor(n){this.inertDocumentHelper=n}getInertBodyElement(n){n="<body><remove></remove>"+n;try{let e=new window.DOMParser().parseFromString(mf(n),"text/html").body;return e===null?this.inertDocumentHelper.getInertBodyElement(n):(e.firstChild?.remove(),e)}catch{return null}}},vv=class{defaultDoc;inertDocument;constructor(n){this.defaultDoc=n,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(n){let e=this.inertDocument.createElement("template");return e.innerHTML=mf(n),e}};function xA(){try{return!!new window.DOMParser().parseFromString(mf(""),"text/html")}catch{return!1}}var MA=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function ql(t){return t=String(t),t.match(MA)?t:"unsafe:"+t}function Cr(t){let n={};for(let e of t.split(","))n[e]=!0;return n}function Kl(...t){let n={};for(let e of t)for(let i in e)e.hasOwnProperty(i)&&(n[i]=!0);return n}var gD=Cr("area,br,col,hr,img,wbr"),vD=Cr("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),_D=Cr("rp,rt"),IA=Kl(_D,vD),TA=Kl(vD,Cr("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),kA=Kl(_D,Cr("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),hw=Kl(gD,TA,kA,IA),yD=Cr("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),RA=Cr("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),AA=Cr("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),OA=Kl(yD,RA,AA),NA=Cr("script,style,template");var _v=class{sanitizedSomething=!1;buf=[];sanitizeChildren(n){let e=n.firstChild,i=!0,r=[];for(;e;){if(e.nodeType===Node.ELEMENT_NODE?i=this.startElement(e):e.nodeType===Node.TEXT_NODE?this.chars(e.nodeValue):this.sanitizedSomething=!0,i&&e.firstChild){r.push(e),e=LA(e);continue}for(;e;){e.nodeType===Node.ELEMENT_NODE&&this.endElement(e);let o=FA(e);if(o){e=o;break}e=r.pop()}}return this.buf.join("")}startElement(n){let e=gw(n).toLowerCase();if(!hw.hasOwnProperty(e))return this.sanitizedSomething=!0,!NA.hasOwnProperty(e);this.buf.push("<"),this.buf.push(e);let i=n.attributes;for(let r=0;r<i.length;r++){let o=i.item(r),s=o.name,a=s.toLowerCase();if(!OA.hasOwnProperty(a)){this.sanitizedSomething=!0;continue}let l=o.value;yD[a]&&(l=ql(l)),this.buf.push(" ",s,'="',vw(l),'"')}return this.buf.push(">"),!0}endElement(n){let e=gw(n).toLowerCase();hw.hasOwnProperty(e)&&!gD.hasOwnProperty(e)&&(this.buf.push("</"),this.buf.push(e),this.buf.push(">"))}chars(n){this.buf.push(vw(n))}};function PA(t,n){return(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function FA(t){let n=t.nextSibling;if(n&&t!==n.previousSibling)throw bD(n);return n}function LA(t){let n=t.firstChild;if(n&&PA(t,n))throw bD(n);return n}function gw(t){let n=t.nodeName;return typeof n=="string"?n:"FORM"}function bD(t){return new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`)}var BA=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,VA=/([^\#-~ |!])/g;function vw(t){return t.replace(/&/g,"&amp;").replace(BA,function(n){let e=n.charCodeAt(0),i=n.charCodeAt(1);return"&#"+((e-55296)*1024+(i-56320)+65536)+";"}).replace(VA,function(n){return"&#"+n.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var Vu;function Zv(t,n){let e=null;try{Vu=Vu||SA(t);let i=n?String(n):"";e=Vu.getInertBodyElement(i);let r=5,o=i;do{if(r===0)throw new Error("Failed to sanitize html because the input is unstable");r--,i=o,o=e.innerHTML,e=Vu.getInertBodyElement(i)}while(i!==o);let a=new _v().sanitizeChildren(_w(e)||e);return mf(a)}finally{if(e){let i=_w(e)||e;for(;i.firstChild;)i.firstChild.remove()}}}function _w(t){return"content"in t&&jA(t)?t.content:null}function jA(t){return t.nodeType===Node.ELEMENT_NODE&&t.nodeName==="TEMPLATE"}var HA=/^>|^->|<!--|-->|--!>|<!-$/g,zA=/(<|>)/g,UA="\u200B$1\u200B";function $A(t){return t.replace(HA,n=>n.replace(zA,UA))}function GA(t,n){return t.createText(n)}function WA(t,n,e){t.setValue(n,e)}function qA(t,n){return t.createComment($A(n))}function CD(t,n,e){return t.createElement(n,e)}function Zu(t,n,e,i,r){t.insertBefore(n,e,i,r)}function wD(t,n,e){t.appendChild(n,e)}function yw(t,n,e,i,r){i!==null?Zu(t,n,e,i,r):wD(t,n,e)}function DD(t,n,e,i){t.removeChild(null,n,e,i)}function KA(t,n,e){t.setAttribute(n,"style",e)}function YA(t,n,e){e===""?t.removeAttribute(n,"class"):t.setAttribute(n,"class",e)}function ED(t,n,e){let{mergedAttrs:i,classes:r,styles:o}=e;i!==null&&nA(t,n,i),r!==null&&YA(t,n,r),o!==null&&KA(t,n,o)}var Ot=(function(t){return t[t.NONE=0]="NONE",t[t.HTML=1]="HTML",t[t.STYLE=2]="STYLE",t[t.SCRIPT=3]="SCRIPT",t[t.URL=4]="URL",t[t.RESOURCE_URL=5]="RESOURCE_URL",t})(Ot||{});function pf(t){let n=xD();return n?n.sanitize(Ot.URL,t)||"":br(t,"URL")?ei(t):ql(Xs(t))}function SD(t){let n=xD();if(n)return pw(n.sanitize(Ot.RESOURCE_URL,t)||"");if(br(t,"ResourceURL"))return pw(ei(t));throw new x(904,!1)}var QA={embed:{src:!0},frame:{src:!0},iframe:{src:!0},media:{src:!0},script:{src:!0,href:!0,"xlink:href":!0},base:{href:!0},link:{href:!0},object:{data:!0,codebase:!0}};function ZA(t,n){return QA[t]?.[n]===!0?SD:pf}function Xv(t,n,e){return ZA(n,e)(t)}function xD(){let t=J();return t&&t[gi].sanitizer}function MD(t){return t instanceof Function?t():t}function XA(t,n,e){let i=t.length;for(;;){let r=t.indexOf(n,e);if(r===-1)return r;if(r===0||t.charCodeAt(r-1)<=32){let o=n.length;if(r+o===i||t.charCodeAt(r+o)<=32)return r}e=r+1}}var ID="ng-template";function JA(t,n,e,i){let r=0;if(i){for(;r<n.length&&typeof n[r]=="string";r+=2)if(n[r]==="class"&&XA(n[r+1].toLowerCase(),e,0)!==-1)return!0}else if(Jv(t))return!1;if(r=n.indexOf(1,r),r>-1){let o;for(;++r<n.length&&typeof(o=n[r])=="string";)if(o.toLowerCase()===e)return!0}return!1}function Jv(t){return t.type===4&&t.value!==ID}function eO(t,n,e){let i=t.type===4&&!e?ID:t.value;return n===i}function tO(t,n,e){let i=4,r=t.attrs,o=r!==null?rO(r):0,s=!1;for(let a=0;a<n.length;a++){let l=n[a];if(typeof l=="number"){if(!s&&!yi(i)&&!yi(l))return!1;if(s&&yi(l))continue;s=!1,i=l|i&1;continue}if(!s)if(i&4){if(i=2|i&1,l!==""&&!eO(t,l,e)||l===""&&n.length===1){if(yi(i))return!1;s=!0}}else if(i&8){if(r===null||!JA(t,r,l,e)){if(yi(i))return!1;s=!0}}else{let c=n[++a],d=nO(l,r,Jv(t),e);if(d===-1){if(yi(i))return!1;s=!0;continue}if(c!==""){let p;if(d>o?p="":p=r[d+1].toLowerCase(),i&2&&c!==p){if(yi(i))return!1;s=!0}}}}return yi(i)||s}function yi(t){return(t&1)===0}function nO(t,n,e,i){if(n===null)return-1;let r=0;if(i||!e){let o=!1;for(;r<n.length;){let s=n[r];if(s===t)return r;if(s===3||s===6)o=!0;else if(s===1||s===2){let a=n[++r];for(;typeof a=="string";)a=n[++r];continue}else{if(s===4)break;if(s===0){r+=4;continue}}r+=o?1:2}return-1}else return oO(n,t)}function TD(t,n,e=!1){for(let i=0;i<n.length;i++)if(tO(t,n[i],e))return!0;return!1}function iO(t){let n=t.attrs;if(n!=null){let e=n.indexOf(5);if((e&1)===0)return n[e+1]}return null}function rO(t){for(let n=0;n<t.length;n++){let e=t[n];if(qw(e))return n}return t.length}function oO(t,n){let e=t.indexOf(4);if(e>-1)for(e++;e<t.length;){let i=t[e];if(typeof i=="number")return-1;if(i===n)return e;e++}return-1}function sO(t,n){e:for(let e=0;e<n.length;e++){let i=n[e];if(t.length===i.length){for(let r=0;r<t.length;r++)if(t[r]!==i[r])continue e;return!0}}return!1}function bw(t,n){return t?":not("+n.trim()+")":n}function aO(t){let n=t[0],e=1,i=2,r="",o=!1;for(;e<t.length;){let s=t[e];if(typeof s=="string")if(i&2){let a=t[++e];r+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+s:i&4&&(r+=" "+s);else r!==""&&!yi(s)&&(n+=bw(o,r),r=""),i=s,o=o||!yi(i);e++}return r!==""&&(n+=bw(o,r)),n}function lO(t){return t.map(aO).join(",")}function cO(t){let n=[],e=[],i=1,r=2;for(;i<t.length;){let o=t[i];if(typeof o=="string")r===2?o!==""&&n.push(o,t[++i]):r===8&&e.push(o);else{if(!yi(r))break;r=o}i++}return e.length&&n.push(1,...e),n}var Cn={};function e_(t,n,e,i,r,o,s,a,l,c,d){let p=rt+i,_=p+r,v=dO(p,_),y=typeof c=="function"?c():c;return v[ie]={type:t,blueprint:v,template:e,queries:null,viewQuery:a,declTNode:n,data:v.slice().fill(null,p),bindingStartIndex:p,expandoStartIndex:_,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:l,consts:y,incompleteFirstPass:!1,ssrId:d}}function dO(t,n){let e=[];for(let i=0;i<n;i++)e.push(i<t?null:Cn);return e}function uO(t){let n=t.tView;return n===null||n.incompleteFirstPass?t.tView=e_(1,null,t.template,t.decls,t.vars,t.directiveDefs,t.pipeDefs,t.viewQuery,t.schemas,t.consts,t.id):n}function t_(t,n,e,i,r,o,s,a,l,c,d){let p=n.blueprint.slice();return p[hi]=r,p[fe]=i|4|128|8|64|1024,(c!==null||t&&t[fe]&2048)&&(p[fe]|=2048),Tg(p),p[Tt]=p[Jo]=t,p[ht]=e,p[gi]=s||t&&t[gi],p[qe]=a||t&&t[qe],p[mr]=l||t&&t[mr]||null,p[_n]=o,p[pr]=gA(),p[Xo]=d,p[Dg]=c,p[yn]=n.type==2?t[yn]:p,p}function fO(t,n,e){let i=_i(n,t),r=uO(e),o=t[gi].rendererFactory,s=n_(t,t_(t,r,null,kD(e),i,n,null,o.createRenderer(i,e),null,null,null));return t[n.index]=s}function kD(t){let n=16;return t.signals?n=4096:t.onPush&&(n=64),n}function RD(t,n,e,i){if(e===0)return-1;let r=n.length;for(let o=0;o<e;o++)n.push(i),t.blueprint.push(i),t.data.push(null);return r}function n_(t,n){return t[na]?t[wg][Yn]=n:t[na]=n,t[wg]=n,n}function h(t=1){AD(Je(),J(),Hi()+t,!1)}function AD(t,n,e,i){if(!i)if((n[fe]&3)===3){let o=t.preOrderCheckHooks;o!==null&&Hu(n,o,e)}else{let o=t.preOrderHooks;o!==null&&zu(n,o,0,e)}no(e)}var hf=(function(t){return t[t.None=0]="None",t[t.SignalBased=1]="SignalBased",t[t.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",t})(hf||{});function yv(t,n,e,i){let r=ne(null);try{let[o,s,a]=t.inputs[e],l=null;(s&hf.SignalBased)!==0&&(l=n[o][mt]),l!==null&&l.transformFn!==void 0?i=l.transformFn(i):a!==null&&(i=a.call(n,i)),t.setInput!==null?t.setInput(n,l,i,e,o):Hw(n,l,o,i)}finally{ne(r)}}var Ui=(function(t){return t[t.Important=1]="Important",t[t.DashCase=2]="DashCase",t})(Ui||{}),mO;function i_(t,n){return mO(t,n)}var kW=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var bv=new WeakMap,Fl=new WeakSet;function pO(t,n){let e=bv.get(t);if(!e||e.length===0)return;let i=n.parentNode,r=n.previousSibling;for(let o=e.length-1;o>=0;o--){let s=e[o],a=s.parentNode;s===n?(e.splice(o,1),Fl.add(s),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(r&&s===r||a&&i&&a!==i)&&(e.splice(o,1),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),s.parentNode?.removeChild(s))}}function hO(t,n){let e=bv.get(t);e?e.includes(n)||e.push(n):bv.set(t,[n])}var ls=new Set,gf=(function(t){return t[t.CHANGE_DETECTION=0]="CHANGE_DETECTION",t[t.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",t})(gf||{}),wi=new w(""),Cw=new Set;function Di(t){Cw.has(t)||(Cw.add(t),performance?.mark?.("mark_feature_usage",{detail:{feature:t}}))}var vf=(()=>{class t{impl=null;execute(){this.impl?.execute()}static \u0275prov=C({token:t,providedIn:"root",factory:()=>new t})}return t})(),r_=[0,1,2,3],o_=(()=>{class t{ngZone=u(U);scheduler=u(Li);errorHandler=u(vn,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){u(wi,{optional:!0})}execute(){let e=this.sequences.size>0;e&&je(Ne.AfterRenderHooksStart),this.executing=!0;for(let i of r_)for(let r of this.sequences)if(!(r.erroredOrDestroyed||!r.hooks[i]))try{r.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=r.hooks[i];return o(r.pipelinedValue)},r.snapshot))}catch(o){r.erroredOrDestroyed=!0,this.errorHandler?.handleError(o)}this.executing=!1;for(let i of this.sequences)i.afterRun(),i.once&&(this.sequences.delete(i),i.destroy());for(let i of this.deferredRegistrations)this.sequences.add(i);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),e&&je(Ne.AfterRenderHooksEnd)}register(e){let{view:i}=e;i!==void 0?((i[ts]??=[]).push(e),rs(i),i[fe]|=8192):this.executing?this.deferredRegistrations.add(e):this.addSequence(e)}addSequence(e){this.sequences.add(e),this.scheduler.notify(7)}unregister(e){this.executing&&this.sequences.has(e)?(e.erroredOrDestroyed=!0,e.pipelinedValue=void 0,e.once=!0):(this.sequences.delete(e),this.deferredRegistrations.delete(e))}maybeTrace(e,i){return i?i.run(gf.AFTER_NEXT_RENDER,e):e()}static \u0275prov=C({token:t,providedIn:"root",factory:()=>new t})}return t})(),jl=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(n,e,i,r,o,s=null){this.impl=n,this.hooks=e,this.view=i,this.once=r,this.snapshot=s,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let n=this.view?.[ts];n&&(this.view[ts]=n.filter(e=>e!==this))}};function $t(t,n){let e=n?.injector??u(ce);return Di("NgAfterNextRender"),vO(t,e,n,!0)}function gO(t){return t instanceof Function?[void 0,void 0,t,void 0]:[t.earlyRead,t.write,t.mixedReadWrite,t.read]}function vO(t,n,e,i){let r=n.get(vf);r.impl??=n.get(o_);let o=n.get(wi,null,{optional:!0}),s=e?.manualCleanup!==!0?n.get(sn):null,a=n.get(sa,null,{optional:!0}),l=new jl(r.impl,gO(t),a?.view,i,s,o?.snapshot(null));return r.impl.register(l),l}var OD=new w("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:u(Ve)})});function ND(t,n,e){let i=t.get(OD);if(Array.isArray(n))for(let r of n)i.queue.add(r),e?.detachedLeaveAnimationFns?.push(r);else i.queue.add(n),e?.detachedLeaveAnimationFns?.push(n);i.scheduler&&i.scheduler(t)}function _O(t,n){let e=t.get(OD);if(n.detachedLeaveAnimationFns){for(let i of n.detachedLeaveAnimationFns)e.queue.delete(i);n.detachedLeaveAnimationFns=void 0}}function yO(t,n){for(let[e,i]of n)ND(t,i.animateFns)}function ww(t,n,e,i){let r=t?.[Jr]?.enter;n!==null&&r&&r.has(e.index)&&yO(i,r)}function la(t,n,e,i,r,o,s,a){if(r!=null){let l,c=!1;vi(r)?l=r:hr(r)&&(c=!0,r=r[hi]);let d=Qn(r);t===0&&i!==null?(ww(a,i,o,e),s==null?wD(n,i,d):Zu(n,i,d,s||null,!0)):t===1&&i!==null?(ww(a,i,o,e),Zu(n,i,d,s||null,!0),pO(o,d)):t===2?(a?.[Jr]?.leave?.has(o.index)&&hO(o,d),Fl.delete(d),Dw(a,o,e,p=>{if(Fl.has(d)){Fl.delete(d);return}DD(n,d,c,p)})):t===3&&(Fl.delete(d),Dw(a,o,e,()=>{n.destroyNode(d)})),l!=null&&kO(n,t,e,l,o,i,s)}}function bO(t,n){PD(t,n),n[hi]=null,n[_n]=null}function CO(t,n,e,i,r,o){i[hi]=r,i[_n]=n,yf(t,i,e,1,r,o)}function PD(t,n){n[gi].changeDetectionScheduler?.notify(9),yf(t,n,n[qe],2,null,null)}function wO(t){let n=t[na];if(!n)return Zg(t[ie],t);for(;n;){let e=null;if(hr(n))e=n[na];else{let i=n[lt];i&&(e=i)}if(!e){for(;n&&!n[Yn]&&n!==t;)hr(n)&&Zg(n[ie],n),n=n[Tt];n===null&&(n=t),hr(n)&&Zg(n[ie],n),e=n&&n[Yn]}n=e}}function s_(t,n){let e=t[ns],i=e.indexOf(n);e.splice(i,1)}function _f(t,n){if(is(n))return;let e=n[qe];e.destroyNode&&yf(t,n,e,3,null,null),wO(n)}function Zg(t,n){if(is(n))return;let e=ne(null);try{n[fe]&=-129,n[fe]|=256,n[Fn]&&zr(n[Fn]),SO(t,n),EO(t,n),n[ie].type===1&&n[qe].destroy();let i=n[Xr];if(i!==null&&vi(n[Tt])){i!==n[Tt]&&s_(i,n);let r=n[Vi];r!==null&&r.detachView(t)}cv(n)}finally{ne(e)}}function Dw(t,n,e,i){let r=t?.[Jr];if(r==null||r.leave==null||!r.leave.has(n.index))return i(!1);t&&ls.add(t[pr]),ND(e,()=>{if(r.leave&&r.leave.has(n.index)){let s=r.leave.get(n.index),a=[];if(s){for(let l=0;l<s.animateFns.length;l++){let c=s.animateFns[l],{promise:d}=c();a.push(d)}r.detachedLeaveAnimationFns=void 0}r.running=Promise.allSettled(a),DO(t,i)}else t&&ls.delete(t[pr]),i(!1)},r)}function DO(t,n){let e=t[Jr]?.running;if(e){e.then(()=>{t[Jr].running=void 0,ls.delete(t[pr]),n(!0)});return}n(!1)}function EO(t,n){let e=t.cleanup,i=n[ta];if(e!==null)for(let s=0;s<e.length-1;s+=2)if(typeof e[s]=="string"){let a=e[s+3];a>=0?i[a]():i[-a].unsubscribe(),s+=2}else{let a=i[e[s+1]];e[s].call(a)}i!==null&&(n[ta]=null);let r=n[fr];if(r!==null){n[fr]=null;for(let s=0;s<r.length;s++){let a=r[s];a()}}let o=n[Kr];if(o!==null){n[Kr]=null;for(let s of o)s.destroy()}}function SO(t,n){let e;if(t!=null&&(e=t.destroyHooks)!=null)for(let i=0;i<e.length;i+=2){let r=n[e[i]];if(!(r instanceof as)){let o=e[i+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=r[o[s]],l=o[s+1];je(Ne.LifecycleHookStart,a,l);try{l.call(a)}finally{je(Ne.LifecycleHookEnd,a,l)}}else{je(Ne.LifecycleHookStart,r,o);try{o.call(r)}finally{je(Ne.LifecycleHookEnd,r,o)}}}}}function FD(t,n,e){return xO(t,n.parent,e)}function xO(t,n,e){let i=n;for(;i!==null&&i.type&168;)n=i,i=n.parent;if(i===null)return e[hi];if(gr(i)){let{encapsulation:r}=t.data[i.directiveStart+i.componentOffset];if(r===Ci.None||r===Ci.Emulated)return null}return _i(i,e)}function LD(t,n,e){return IO(t,n,e)}function MO(t,n,e){return t.type&40?_i(t,e):null}var IO=MO,Ew;function a_(t,n,e,i){let r=FD(t,i,n),o=n[qe],s=i.parent||n[_n],a=LD(s,i,n);if(r!=null)if(Array.isArray(e))for(let l=0;l<e.length;l++)yw(o,r,e[l],a,!1);else yw(o,r,e,a,!1);Ew!==void 0&&Ew(o,i,n,e,r)}function Ll(t,n){if(n!==null){let e=n.type;if(e&3)return _i(n,t);if(e&4)return Cv(-1,t[n.index]);if(e&8){let i=n.child;if(i!==null)return Ll(t,i);{let r=t[n.index];return vi(r)?Cv(-1,r):Qn(r)}}else{if(e&128)return Ll(t,n.next);if(e&32)return i_(n,t)()||Qn(t[n.index]);{let i=BD(t,n);if(i!==null){if(Array.isArray(i))return i[0];let r=Yr(t[yn]);return Ll(r,i)}else return Ll(t,n.next)}}}return null}function BD(t,n){if(n!==null){let i=t[yn][_n],r=n.projection;return i.projection[r]}return null}function Cv(t,n){let e=lt+t+1;if(e<n.length){let i=n[e],r=i[ie].firstChild;if(r!==null)return Ll(i,r)}return n[eo]}function l_(t,n,e,i,r,o,s){for(;e!=null;){let a=i[mr];if(e.type===128){e=e.next;continue}let l=i[e.index],c=e.type;if(s&&n===0&&(l&&ua(Qn(l),i),e.flags|=2),!ff(e))if(c&8)l_(t,n,e.child,i,r,o,!1),la(n,t,a,r,l,e,o,i);else if(c&32){let d=i_(e,i),p;for(;p=d();)la(n,t,a,r,p,e,o,i);la(n,t,a,r,l,e,o,i)}else c&16?VD(t,n,i,e,r,o):la(n,t,a,r,l,e,o,i);e=s?e.projectionNext:e.next}}function yf(t,n,e,i,r,o){l_(e,i,t.firstChild,n,r,o,!1)}function TO(t,n,e){let i=n[qe],r=FD(t,e,n),o=e.parent||n[_n],s=LD(o,e,n);VD(i,0,n,e,r,s)}function VD(t,n,e,i,r,o){let s=e[yn],l=s[_n].projection[i.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let d=l[c];la(n,t,e[mr],r,d,i,o,e)}else{let c=l,d=s[Tt];rD(i)&&(c.flags|=128),l_(t,n,c,d,r,o,!0)}}function kO(t,n,e,i,r,o,s){let a=i[eo],l=Qn(i);a!==l&&la(n,t,e,o,a,r,s);for(let c=lt;c<i.length;c++){let d=i[c];yf(d[ie],d,t,n,o,a)}}function RO(t,n,e,i,r){if(n)r?t.addClass(e,i):t.removeClass(e,i);else{let o=i.indexOf("-")===-1?void 0:Ui.DashCase;r==null?t.removeStyle(e,i,o):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),o|=Ui.Important),t.setStyle(e,i,r,o))}}function jD(t,n,e,i,r){let o=Hi(),s=i&2;try{no(-1),s&&n.length>rt&&AD(t,n,rt,!1);let a=s?Ne.TemplateUpdateStart:Ne.TemplateCreateStart;je(a,r,e),e(i,r)}finally{no(o);let a=s?Ne.TemplateUpdateEnd:Ne.TemplateCreateEnd;je(a,r,e)}}function bf(t,n,e){LO(t,n,e),(e.flags&64)===64&&BO(t,n,e)}function Yl(t,n,e=_i){let i=n.localNames;if(i!==null){let r=n.index+1;for(let o=0;o<i.length;o+=2){let s=i[o+1],a=s===-1?e(n,t):t[s];t[r++]=a}}}function AO(t,n,e,i){let o=i.get(fD,uD)||e===Ci.ShadowDom||e===Ci.ExperimentalIsolatedShadowDom,s=t.selectRootElement(n,o);return OO(s),s}function OO(t){NO(t)}var NO=()=>null;function PO(t){return t==="class"?"className":t==="for"?"htmlFor":t==="formaction"?"formAction":t==="innerHtml"?"innerHTML":t==="readonly"?"readOnly":t==="tabindex"?"tabIndex":t}function HD(t,n,e,i,r,o){let s=n[ie];if(f_(t,s,n,e,i)){gr(t)&&FO(n,t.index);return}t.type&3&&(e=PO(e)),zD(t,n,e,i,r,o)}function zD(t,n,e,i,r,o){if(t.type&3){let s=_i(t,n);i=o!=null?o(i,t.value||"",e):i,r.setProperty(s,e,i)}else t.type&12}function FO(t,n){let e=Zn(n,t);e[fe]&16||(e[fe]|=64)}function LO(t,n,e){let i=e.directiveStart,r=e.directiveEnd;gr(e)&&fO(n,e,t.data[i+e.componentOffset]),t.firstCreatePass||Qu(e,n);let o=e.initialInputs;for(let s=i;s<r;s++){let a=t.data[s],l=Vl(n,t,s,e);if(ua(l,n),o!==null&&zO(n,s-i,l,a,e,o),ji(a)){let c=Zn(e.index,n);c[ht]=Vl(n,t,s,e)}}}function BO(t,n,e){let i=e.directiveStart,r=e.directiveEnd,o=e.index,s=qC();try{no(o);for(let a=i;a<r;a++){let l=t.data[a],c=n[a];Tu(a),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&VO(l,c)}}finally{no(-1),Tu(s)}}function VO(t,n){t.hostBindings!==null&&t.hostBindings(1,n)}function c_(t,n){let e=t.directiveRegistry,i=null;if(e)for(let r=0;r<e.length;r++){let o=e[r];TD(n,o.selectors,!1)&&(i??=[],ji(o)?i.unshift(o):i.push(o))}return i}function jO(t,n,e,i,r,o){let s=_i(t,n);HO(n[qe],s,o,t.value,e,i,r)}function HO(t,n,e,i,r,o,s){if(o==null)t.removeAttribute(n,r,e);else{let a=s==null?Xs(o):s(o,i||"",r);t.setAttribute(n,r,a,e)}}function zO(t,n,e,i,r,o){let s=o[n];if(s!==null)for(let a=0;a<s.length;a+=2){let l=s[a],c=s[a+1];yv(i,e,l,c)}}function d_(t,n,e,i,r){let o=rt+e,s=n[ie],a=r(s,n,t,i,e);n[o]=a,oa(t,!0);let l=t.type===2;return l?(ED(n[qe],a,t),(VC()===0||ia(t))&&ua(a,n),jC()):ua(a,n),Nu()&&(!l||!ff(t))&&a_(s,n,a,t),t}function u_(t){let n=t;return Vg()?jg():(n=n.parent,oa(n,!1)),n}function UO(t,n){let e=t[mr];if(!e)return;let i;try{i=e.get(Xn,null)}catch{i=null}i?.(n)}function f_(t,n,e,i,r){let o=t.inputs?.[i],s=t.hostDirectiveInputs?.[i],a=!1;if(s)for(let l=0;l<s.length;l+=2){let c=s[l],d=s[l+1],p=n.data[c];yv(p,e[c],d,r),a=!0}if(o)for(let l of o){let c=e[l],d=n.data[l];yv(d,c,i,r),a=!0}return a}function $O(t,n){let e=Zn(n,t),i=e[ie];GO(i,e);let r=e[hi];r!==null&&e[Xo]===null&&(e[Xo]=mD(r,e[mr])),je(Ne.ComponentStart);try{m_(i,e,e[ht])}finally{je(Ne.ComponentEnd,e[ht])}}function GO(t,n){for(let e=n.length;e<t.blueprint.length;e++)n.push(t.blueprint[e])}function m_(t,n,e){Ru(n);try{let i=t.viewQuery;i!==null&&dv(1,i,e);let r=t.template;r!==null&&jD(t,n,r,1,e),t.firstCreatePass&&(t.firstCreatePass=!1),n[Vi]?.finishViewCreation(t),t.staticContentQueries&&pD(t,n),t.staticViewQueries&&dv(2,t.viewQuery,e);let o=t.components;o!==null&&WO(n,o)}catch(i){throw t.firstCreatePass&&(t.incompleteFirstPass=!0,t.firstCreatePass=!1),i}finally{n[fe]&=-5,Au()}}function WO(t,n){for(let e=0;e<n.length;e++)$O(t,n[e])}function Ql(t,n,e,i){let r=ne(null);try{let o=n.tView,a=t[fe]&4096?4096:16,l=t_(t,o,e,a,null,n,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),c=t[n.index];l[Xr]=c;let d=t[Vi];return d!==null&&(l[Vi]=d.createEmbeddedView(o)),m_(o,l,e),l}finally{ne(r)}}function fa(t,n){return!n||n.firstChild===null||rD(t)}function Hl(t,n,e,i,r=!1){for(;e!==null;){if(e.type===128){e=r?e.projectionNext:e.next;continue}let o=n[e.index];o!==null&&i.push(Qn(o)),vi(o)&&UD(o,i);let s=e.type;if(s&8)Hl(t,n,e.child,i);else if(s&32){let a=i_(e,n),l;for(;l=a();)i.push(l)}else if(s&16){let a=BD(n,e);if(Array.isArray(a))i.push(...a);else{let l=Yr(n[yn]);Hl(l[ie],l,a,i,!0)}}e=r?e.projectionNext:e.next}return i}function UD(t,n){for(let e=lt;e<t.length;e++){let i=t[e],r=i[ie].firstChild;r!==null&&Hl(i[ie],i,r,n)}t[eo]!==t[hi]&&n.push(t[eo])}function $D(t){if(t[ts]!==null){for(let n of t[ts])n.impl.addSequence(n);t[ts].length=0}}var GD=[];function qO(t){return t[Fn]??KO(t)}function KO(t){let n=GD.pop()??Object.create(QO);return n.lView=t,n}function YO(t){t.lView[Fn]!==t&&(t.lView=null,GD.push(t))}var QO=de(S({},Vr),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{rs(t.lView)},consumerOnSignalRead(){this.lView[Fn]=this}});function ZO(t){let n=t[Fn]??Object.create(XO);return n.lView=t,n}var XO=de(S({},Vr),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{let n=Yr(t.lView);for(;n&&!WD(n[ie]);)n=Yr(n);n&&kg(n)},consumerOnSignalRead(){this.lView[Fn]=this}});function WD(t){return t.type!==2}function qD(t){if(t[Kr]===null)return;let n=!0;for(;n;){let e=!1;for(let i of t[Kr])i.dirty&&(e=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));n=e&&!!(t[fe]&8192)}}var JO=100;function KD(t,n=0){let i=t[gi].rendererFactory,r=!1;r||i.begin?.();try{e1(t,n)}finally{r||i.end?.()}}function e1(t,n){let e=Hg();try{wl(!0),wv(t,n);let i=0;for(;kl(t);){if(i===JO)throw new x(103,!1);i++,wv(t,1)}}finally{wl(e)}}function t1(t,n,e,i){if(is(n))return;let r=n[fe],o=!1,s=!1;Ru(n);let a=!0,l=null,c=null;o||(WD(t)?(c=qO(n),l=cr(c)):Md()===null?(a=!1,c=ZO(n),l=cr(c)):n[Fn]&&(zr(n[Fn]),n[Fn]=null));try{Tg(n),$C(t.bindingStartIndex),e!==null&&jD(t,n,e,2,i);let d=(r&3)===3;if(!o)if(d){let v=t.preOrderCheckHooks;v!==null&&Hu(n,v,null)}else{let v=t.preOrderHooks;v!==null&&zu(n,v,0,null),Yg(n,0)}if(s||n1(n),qD(n),YD(n,0),t.contentQueries!==null&&pD(t,n),!o)if(d){let v=t.contentCheckHooks;v!==null&&Hu(n,v)}else{let v=t.contentHooks;v!==null&&zu(n,v,1),Yg(n,1)}r1(t,n);let p=t.components;p!==null&&ZD(n,p,0);let _=t.viewQuery;if(_!==null&&dv(2,_,i),!o)if(d){let v=t.viewCheckHooks;v!==null&&Hu(n,v)}else{let v=t.viewHooks;v!==null&&zu(n,v,2),Yg(n,2)}if(t.firstUpdatePass===!0&&(t.firstUpdatePass=!1),n[wu]){for(let v of n[wu])v();n[wu]=null}o||($D(n),n[fe]&=-73)}catch(d){throw o||rs(n),d}finally{c!==null&&(Hr(c,l),a&&YO(c)),Au()}}function YD(t,n){for(let e=sD(t);e!==null;e=aD(e))for(let i=lt;i<e.length;i++){let r=e[i];QD(r,n)}}function n1(t){for(let n=sD(t);n!==null;n=aD(n)){if(!(n[fe]&2))continue;let e=n[ns];for(let i=0;i<e.length;i++){let r=e[i];kg(r)}}}function i1(t,n,e){je(Ne.ComponentStart);let i=Zn(n,t);try{QD(i,e)}finally{je(Ne.ComponentEnd,i[ht])}}function QD(t,n){Su(t)&&wv(t,n)}function wv(t,n){let i=t[ie],r=t[fe],o=t[Fn],s=!!(n===0&&r&16);if(s||=!!(r&64&&n===0),s||=!!(r&1024),s||=!!(o?.dirty&&zs(o)),s||=!1,o&&(o.dirty=!1),t[fe]&=-9217,s)t1(i,t,i.template,t[ht]);else if(r&8192){let a=ne(null);try{qD(t),YD(t,1);let l=i.components;l!==null&&ZD(t,l,1),$D(t)}finally{ne(a)}}}function ZD(t,n,e){for(let i=0;i<n.length;i++)i1(t,n[i],e)}function r1(t,n){let e=t.hostBindingOpCodes;if(e!==null)try{for(let i=0;i<e.length;i++){let r=e[i];if(r<0)no(~r);else{let o=r,s=e[++i],a=e[++i];WC(s,o);let l=n[o];je(Ne.HostBindingsUpdateStart,l);try{a(2,l)}finally{je(Ne.HostBindingsUpdateEnd,l)}}}}finally{no(-1)}}function p_(t,n){let e=Hg()?64:1088;for(t[gi].changeDetectionScheduler?.notify(n);t;){t[fe]|=e;let i=Yr(t);if(ra(t)&&!i)return t;t=i}return null}function XD(t,n,e,i){return[t,!0,0,n,null,i,null,e,null,null]}function JD(t,n){let e=lt+n;if(e<t.length)return t[e]}function Zl(t,n,e,i=!0){let r=n[ie];if(o1(r,n,t,e),i){let s=Cv(e,t),a=n[qe],l=a.parentNode(t[eo]);l!==null&&CO(r,t[_n],a,n,l,s)}let o=n[Xo];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function eE(t,n){let e=zl(t,n);return e!==void 0&&_f(e[ie],e),e}function zl(t,n){if(t.length<=lt)return;let e=lt+n,i=t[e];if(i){let r=i[Xr];r!==null&&r!==t&&s_(r,i),n>0&&(t[e-1][Yn]=i[Yn]);let o=Ml(t,lt+n);bO(i[ie],i);let s=o[Vi];s!==null&&s.detachView(o[ie]),i[Tt]=null,i[Yn]=null,i[fe]&=-129}return i}function o1(t,n,e,i){let r=lt+i,o=e.length;i>0&&(e[r-1][Yn]=n),i<o-lt?(n[Yn]=e[r],hg(e,lt+i,n)):(e.push(n),n[Yn]=null),n[Tt]=e;let s=n[Xr];s!==null&&e!==s&&tE(s,n);let a=n[Vi];a!==null&&a.insertView(t),xu(n),n[fe]|=128}function tE(t,n){let e=t[ns],i=n[Tt];if(hr(i))t[fe]|=2;else{let r=i[Tt][yn];n[yn]!==r&&(t[fe]|=2)}e===null?t[ns]=[n]:e.push(n)}var io=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let n=this._lView,e=n[ie];return Hl(e,n,e.firstChild,[])}constructor(n,e){this._lView=n,this._cdRefInjectingView=e}get context(){return this._lView[ht]}set context(n){this._lView[ht]=n}get destroyed(){return is(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let n=this._lView[Tt];if(vi(n)){let e=n[Tl],i=e?e.indexOf(this):-1;i>-1&&(zl(n,i),Ml(e,i))}this._attachedToViewContainer=!1}_f(this._lView[ie],this._lView)}onDestroy(n){Rg(this._lView,n)}markForCheck(){p_(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[fe]&=-129}reattach(){xu(this._lView),this._lView[fe]|=128}detectChanges(){this._lView[fe]|=1024,KD(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new x(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let n=ra(this._lView),e=this._lView[Xr];e!==null&&!n&&s_(e,this._lView),PD(this._lView[ie],this._lView)}attachToAppRef(n){if(this._attachedToViewContainer)throw new x(902,!1);this._appRef=n;let e=ra(this._lView),i=this._lView[Xr];i!==null&&!e&&tE(i,this._lView),xu(this._lView)}};var wt=(()=>{class t{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=s1;constructor(e,i,r){this._declarationLView=e,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,i){return this.createEmbeddedViewImpl(e,i)}createEmbeddedViewImpl(e,i,r){let o=Ql(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:i,dehydratedView:r});return new io(o)}}return t})();function s1(){return Cf(At(),J())}function Cf(t,n){return t.type&4?new wt(n,t,ha(t,n)):null}function ga(t,n,e,i,r){let o=t.data[n];if(o===null)o=a1(t,n,e,i,r),GC()&&(o.flags|=32);else if(o.type&64){o.type=e,o.value=i,o.attrs=r;let s=HC();o.injectorIndex=s===null?-1:s.injectorIndex}return oa(o,!0),o}function a1(t,n,e,i,r){let o=Bg(),s=Vg(),a=s?o:o&&o.parent,l=t.data[n]=c1(t,a,e,n,i,r);return l1(t,l,o,s),l}function l1(t,n,e,i){t.firstChild===null&&(t.firstChild=n),e!==null&&(i?e.child==null&&n.parent!==null&&(e.child=n):e.next===null&&(e.next=n,n.prev=e))}function c1(t,n,e,i,r,o){let s=n?n.injectorIndex:-1,a=0;return Pg()&&(a|=128),{type:e,index:i,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:n,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function d1(t){let n=t[Eg]??[],i=t[Tt][qe],r=[];for(let o of n)o.data[dD]!==void 0?r.push(o):u1(o,i);t[Eg]=r}function u1(t,n){let e=0,i=t.firstChild;if(i){let r=t.data[cD];for(;e<r;){let o=i.nextSibling;DD(n,i,!1),i=o,e++}}}var f1=()=>null,m1=()=>null;function Xu(t,n){return f1(t,n)}function nE(t,n,e){return m1(t,n,e)}var iE=class{},wf=class{},Dv=class{resolveComponentFactory(n){throw new x(917,!1)}},Xl=class{static NULL=new Dv},ct=class{},Ue=(()=>{class t{destroyNode=null;static __NG_ELEMENT_ID__=()=>p1()}return t})();function p1(){let t=J(),n=At(),e=Zn(n.index,t);return(hr(e)?e:t)[qe]}var rE=(()=>{class t{static \u0275prov=C({token:t,providedIn:"root",factory:()=>null})}return t})();var $u={},Ev=class{injector;parentInjector;constructor(n,e){this.injector=n,this.parentInjector=e}get(n,e,i){let r=this.injector.get(n,$u,i);return r!==$u||e===$u?r:this.parentInjector.get(n,e,i)}};function Ju(t,n,e){let i=e?t.styles:null,r=e?t.classes:null,o=0;if(n!==null)for(let s=0;s<n.length;s++){let a=n[s];if(typeof a=="number")o=a;else if(o==1)r=pu(r,a);else if(o==2){let l=a,c=n[++s];i=pu(i,l+": "+c+";")}}e?t.styles=i:t.stylesWithoutHost=i,e?t.classes=r:t.classesWithoutHost=r}function I(t,n=0){let e=J();if(e===null)return A(t,n);let i=At();return eD(i,e,Jt(t),n)}function h_(){let t="invalid";throw new Error(t)}function oE(t,n,e,i,r){let o=i===null?null:{"":-1},s=r(t,e);if(s!==null){let a=s,l=null,c=null;for(let d of s)if(d.resolveHostDirectives!==null){[a,l,c]=d.resolveHostDirectives(s);break}v1(t,n,e,a,o,l,c)}o!==null&&i!==null&&h1(e,i,o)}function h1(t,n,e){let i=t.localNames=[];for(let r=0;r<n.length;r+=2){let o=e[n[r+1]];if(o==null)throw new x(-301,!1);i.push(n[r],o)}}function g1(t,n,e){n.componentOffset=e,(t.components??=[]).push(n.index)}function v1(t,n,e,i,r,o,s){let a=i.length,l=null;for(let _=0;_<a;_++){let v=i[_];l===null&&ji(v)&&(l=v,g1(t,e,_)),av(Qu(e,n),t,v.type)}D1(e,t.data.length,a),l?.viewProvidersResolver&&l.viewProvidersResolver(l);for(let _=0;_<a;_++){let v=i[_];v.providersResolver&&v.providersResolver(v)}let c=!1,d=!1,p=RD(t,n,a,null);a>0&&(e.directiveToIndex=new Map);for(let _=0;_<a;_++){let v=i[_];if(e.mergedAttrs=da(e.mergedAttrs,v.hostAttrs),y1(t,e,n,p,v),w1(p,v,r),s!==null&&s.has(v)){let[D,M]=s.get(v);e.directiveToIndex.set(v.type,[p,D+e.directiveStart,M+e.directiveStart])}else(o===null||!o.has(v))&&e.directiveToIndex.set(v.type,p);v.contentQueries!==null&&(e.flags|=4),(v.hostBindings!==null||v.hostAttrs!==null||v.hostVars!==0)&&(e.flags|=64);let y=v.type.prototype;!c&&(y.ngOnChanges||y.ngOnInit||y.ngDoCheck)&&((t.preOrderHooks??=[]).push(e.index),c=!0),!d&&(y.ngOnChanges||y.ngDoCheck)&&((t.preOrderCheckHooks??=[]).push(e.index),d=!0),p++}_1(t,e,o)}function _1(t,n,e){for(let i=n.directiveStart;i<n.directiveEnd;i++){let r=t.data[i];if(e===null||!e.has(r))Sw(0,n,r,i),Sw(1,n,r,i),Mw(n,i,!1);else{let o=e.get(r);xw(0,n,o,i),xw(1,n,o,i),Mw(n,i,!0)}}}function Sw(t,n,e,i){let r=t===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s;t===0?s=n.inputs??={}:s=n.outputs??={},s[o]??=[],s[o].push(i),sE(n,o)}}function xw(t,n,e,i){let r=t===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s=r[o],a;t===0?a=n.hostDirectiveInputs??={}:a=n.hostDirectiveOutputs??={},a[s]??=[],a[s].push(i,o),sE(n,s)}}function sE(t,n){n==="class"?t.flags|=8:n==="style"&&(t.flags|=16)}function Mw(t,n,e){let{attrs:i,inputs:r,hostDirectiveInputs:o}=t;if(i===null||!e&&r===null||e&&o===null||Jv(t)){t.initialInputs??=[],t.initialInputs.push(null);return}let s=null,a=0;for(;a<i.length;){let l=i[a];if(l===0){a+=4;continue}else if(l===5){a+=2;continue}else if(typeof l=="number")break;if(!e&&r.hasOwnProperty(l)){let c=r[l];for(let d of c)if(d===n){s??=[],s.push(l,i[a+1]);break}}else if(e&&o.hasOwnProperty(l)){let c=o[l];for(let d=0;d<c.length;d+=2)if(c[d]===n){s??=[],s.push(c[d+1],i[a+1]);break}}a+=2}t.initialInputs??=[],t.initialInputs.push(s)}function y1(t,n,e,i,r){t.data[i]=r;let o=r.factory||(r.factory=qr(r.type,!0)),s=new as(o,ji(r),I,null);t.blueprint[i]=s,e[i]=s,b1(t,n,i,RD(t,e,r.hostVars,Cn),r)}function b1(t,n,e,i,r){let o=r.hostBindings;if(o){let s=t.hostBindingOpCodes;s===null&&(s=t.hostBindingOpCodes=[]);let a=~n.index;C1(s)!=a&&s.push(a),s.push(e,i,o)}}function C1(t){let n=t.length;for(;n>0;){let e=t[--n];if(typeof e=="number"&&e<0)return e}return 0}function w1(t,n,e){if(e){if(n.exportAs)for(let i=0;i<n.exportAs.length;i++)e[n.exportAs[i]]=t;ji(n)&&(e[""]=t)}}function D1(t,n,e){t.flags|=1,t.directiveStart=n,t.directiveEnd=n+e,t.providerIndexes=n}function g_(t,n,e,i,r,o,s,a){let l=n[ie],c=l.consts,d=Ln(c,s),p=ga(l,t,e,i,d);return o&&oE(l,n,p,Ln(c,a),r),p.mergedAttrs=da(p.mergedAttrs,p.attrs),p.attrs!==null&&Ju(p,p.attrs,!1),p.mergedAttrs!==null&&Ju(p,p.mergedAttrs,!0),l.queries!==null&&l.queries.elementStart(l,p),p}function v_(t,n){Gw(t,n),Sg(n)&&t.queries.elementEnd(n)}function E1(t,n,e,i,r,o){let s=n.consts,a=Ln(s,r),l=ga(n,t,e,i,a);if(l.mergedAttrs=da(l.mergedAttrs,l.attrs),o!=null){let c=Ln(s,o);l.localNames=[];for(let d=0;d<c.length;d+=2)l.localNames.push(c[d],-1)}return l.attrs!==null&&Ju(l,l.attrs,!1),l.mergedAttrs!==null&&Ju(l,l.mergedAttrs,!0),n.queries!==null&&n.queries.elementStart(n,l),l}function __(t){return Df(t)?Array.isArray(t)||!(t instanceof Map)&&Symbol.iterator in t:!1}function aE(t,n){if(Array.isArray(t))for(let e=0;e<t.length;e++)n(t[e]);else{let e=t[Symbol.iterator](),i;for(;!(i=e.next()).done;)n(i.value)}}function Df(t){return t!==null&&(typeof t=="function"||typeof t=="object")}function Ef(t,n,e){return t[n]=e}function S1(t,n){return t[n]}function Bn(t,n,e){if(e===Cn)return!1;let i=t[n];return Object.is(i,e)?!1:(t[n]=e,!0)}function y_(t,n,e,i){let r=Bn(t,n,e);return Bn(t,n+1,i)||r}function x1(t,n,e,i,r){let o=y_(t,n,e,i);return Bn(t,n+2,r)||o}function Gu(t,n,e){return function i(r){let o=gr(t)?Zn(t.index,n):n;p_(o,5);let s=n[ht],a=Iw(n,s,e,r),l=i.__ngNextListenerFn__;for(;l;)a=Iw(n,s,l,r)&&a,l=l.__ngNextListenerFn__;return a}}function Iw(t,n,e,i){let r=ne(null);try{return je(Ne.OutputStart,n,e),e(i)!==!1}catch(o){return UO(t,o),!1}finally{je(Ne.OutputEnd,n,e),ne(r)}}function lE(t,n,e,i,r,o,s,a){let l=ia(t),c=!1,d=null;if(!i&&l&&(d=I1(n,e,o,t.index)),d!==null){let p=d.__ngLastListenerFn__||d;p.__ngNextListenerFn__=s,d.__ngLastListenerFn__=s,c=!0}else{let p=_i(t,e),_=i?i(p):p;CA(e,_,o,a);let v=r.listen(_,o,a);if(!M1(o)){let y=i?D=>i(Qn(D[t.index])):t.index;cE(y,n,e,o,a,v,!1)}}return c}function M1(t){return t.startsWith("animation")||t.startsWith("transition")}function I1(t,n,e,i){let r=t.cleanup;if(r!=null)for(let o=0;o<r.length-1;o+=2){let s=r[o];if(s===e&&r[o+1]===i){let a=n[ta],l=r[o+2];return a&&a.length>l?a[l]:null}typeof s=="string"&&(o+=2)}return null}function cE(t,n,e,i,r,o,s){let a=n.firstCreatePass?Og(n):null,l=Ag(e),c=l.length;l.push(r,o),a&&a.push(i,t,c,(c+1)*(s?-1:1))}function Tw(t,n,e,i,r,o){let s=n[e],a=n[ie],c=a.data[e].outputs[i],p=s[c].subscribe(o);cE(t.index,a,n,r,o,p,!0)}var Sv=Symbol("BINDING");function dE(t){return t.debugInfo?.className||t.type.name||null}var ef=class extends Xl{ngModule;constructor(n){super(),this.ngModule=n}resolveComponentFactory(n){let e=Bi(n);return new ro(e,this.ngModule)}};function T1(t){return Object.keys(t).map(n=>{let[e,i,r]=t[n],o={propName:e,templateName:n,isSignal:(i&hf.SignalBased)!==0};return r&&(o.transform=r),o})}function k1(t){return Object.keys(t).map(n=>({propName:t[n],templateName:n}))}function R1(t,n,e){let i=n instanceof Ve?n:n?.injector;return i&&t.getStandaloneInjector!==null&&(i=t.getStandaloneInjector(i)||i),i?new Ev(e,i):e}function A1(t){let n=t.get(ct,null);if(n===null)throw new x(407,!1);let e=t.get(rE,null),i=t.get(Li,null),r=t.get(wi,null,{optional:!0});return{rendererFactory:n,sanitizer:e,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function O1(t,n){let e=uE(t);return CD(n,e,e==="svg"?xg:e==="math"?OC:null)}function uE(t){return(t.selectors[0][0]||"div").toLowerCase()}var ro=class extends wf{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=T1(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=k1(this.componentDef.outputs),this.cachedOutputs}constructor(n,e){super(),this.componentDef=n,this.ngModule=e,this.componentType=n.type,this.selector=lO(n.selectors),this.ngContentSelectors=n.ngContentSelectors??[],this.isBoundToModule=!!e}create(n,e,i,r,o,s){je(Ne.DynamicComponentStart);let a=ne(null);try{let l=this.componentDef,c=R1(l,r||this.ngModule,n),d=A1(c),p=d.tracingService;return p&&p.componentCreate?p.componentCreate(dE(l),()=>this.createComponentRef(d,c,e,i,o,s)):this.createComponentRef(d,c,e,i,o,s)}finally{ne(a)}}createComponentRef(n,e,i,r,o,s){let a=this.componentDef,l=N1(r,a,s,o),c=n.rendererFactory.createRenderer(null,a),d=r?AO(c,r,a.encapsulation,e):O1(a,c),p=s?.some(kw)||o?.some(y=>typeof y!="function"&&y.bindings.some(kw)),_=t_(null,l,null,512|kD(a),null,null,n,c,e,null,mD(d,e,!0));_[rt]=d,Ru(_);let v=null;try{let y=g_(rt,_,2,"#host",()=>l.directiveRegistry,!0,0);ED(c,d,y),ua(d,_),bf(l,_,y),Gv(l,y,_),v_(l,y),i!==void 0&&F1(y,this.ngContentSelectors,i),v=Zn(y.index,_),_[ht]=v[ht],m_(l,_,null)}catch(y){throw v!==null&&cv(v),cv(_),y}finally{je(Ne.DynamicComponentEnd),Au()}return new tf(this.componentType,_,!!p)}};function N1(t,n,e,i){let r=t?["ng-version","21.2.10"]:cO(n.selectors[0]),o=null,s=null,a=0;if(e)for(let d of e)a+=d[Sv].requiredVars,d.create&&(d.targetIdx=0,(o??=[]).push(d)),d.update&&(d.targetIdx=0,(s??=[]).push(d));if(i)for(let d=0;d<i.length;d++){let p=i[d];if(typeof p!="function")for(let _ of p.bindings){a+=_[Sv].requiredVars;let v=d+1;_.create&&(_.targetIdx=v,(o??=[]).push(_)),_.update&&(_.targetIdx=v,(s??=[]).push(_))}}let l=[n];if(i)for(let d of i){let p=typeof d=="function"?d:d.type,_=fg(p);l.push(_)}return e_(0,null,P1(o,s),1,a,l,null,null,null,[r],null)}function P1(t,n){return!t&&!n?null:e=>{if(e&1&&t)for(let i of t)i.create();if(e&2&&n)for(let i of n)i.update()}}function kw(t){let n=t[Sv].kind;return n==="input"||n==="twoWay"}var tf=class extends iE{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(n,e,i){super(),this._rootLView=e,this._hasInputBindings=i,this._tNode=Du(e[ie],rt),this.location=ha(this._tNode,e),this.instance=Zn(this._tNode.index,e)[ht],this.hostView=this.changeDetectorRef=new io(e,void 0),this.componentType=n}setInput(n,e){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(n)&&Object.is(this.previousInputValues.get(n),e))return;let r=this._rootLView,o=f_(i,r[ie],r,n,e);this.previousInputValues.set(n,e);let s=Zn(i.index,r);p_(s,1)}get injector(){return new ss(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(n){this.hostView.onDestroy(n)}};function F1(t,n,e){let i=t.projection=[];for(let r=0;r<n.length;r++){let o=e[r];i.push(o!=null&&o.length?Array.from(o):null)}}var Nt=(()=>{class t{static __NG_ELEMENT_ID__=L1}return t})();function L1(){let t=At();return fE(t,J())}var xv=class t extends Nt{_lContainer;_hostTNode;_hostLView;constructor(n,e,i){super(),this._lContainer=n,this._hostTNode=e,this._hostLView=i}get element(){return ha(this._hostTNode,this._hostLView)}get injector(){return new ss(this._hostTNode,this._hostLView)}get parentInjector(){let n=zv(this._hostTNode,this._hostLView);if(Kw(n)){let e=Ku(n,this._hostLView),i=qu(n),r=e[ie].data[i+8];return new ss(r,e)}else return new ss(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(n){let e=Rw(this._lContainer);return e!==null&&e[n]||null}get length(){return this._lContainer.length-lt}createEmbeddedView(n,e,i){let r,o;typeof i=="number"?r=i:i!=null&&(r=i.index,o=i.injector);let s=Xu(this._lContainer,n.ssrId),a=n.createEmbeddedViewImpl(e||{},o,s);return this.insertImpl(a,r,fa(this._hostTNode,s)),a}createComponent(n,e,i,r,o,s,a){let l=n&&!KR(n),c;if(l)c=e;else{let M=e||{};c=M.index,i=M.injector,r=M.projectableNodes,o=M.environmentInjector||M.ngModuleRef,s=M.directives,a=M.bindings}let d=l?n:new ro(Bi(n)),p=i||this.parentInjector;if(!o&&d.ngModule==null){let R=(l?p:this.parentInjector).get(Ve,null);R&&(o=R)}let _=Bi(d.componentType??{}),v=Xu(this._lContainer,_?.id??null),y=v?.firstChild??null,D=d.create(p,r,y,o,s,a);return this.insertImpl(D.hostView,c,fa(this._hostTNode,v)),D}insert(n,e){return this.insertImpl(n,e,!0)}insertImpl(n,e,i){let r=n._lView;if(PC(r)){let a=this.indexOf(n);if(a!==-1)this.detach(a);else{let l=r[Tt],c=new t(l,l[_n],l[Tt]);c.detach(c.indexOf(n))}}let o=this._adjustIndex(e),s=this._lContainer;return Zl(s,r,o,i),n.attachToViewContainerRef(),hg(Xg(s),o,n),n}move(n,e){return this.insert(n,e)}indexOf(n){let e=Rw(this._lContainer);return e!==null?e.indexOf(n):-1}remove(n){let e=this._adjustIndex(n,-1),i=zl(this._lContainer,e);i&&(Ml(Xg(this._lContainer),e),_f(i[ie],i))}detach(n){let e=this._adjustIndex(n,-1),i=zl(this._lContainer,e);return i&&Ml(Xg(this._lContainer),e)!=null?new io(i):null}_adjustIndex(n,e=0){return n??this.length+e}};function Rw(t){return t[Tl]}function Xg(t){return t[Tl]||(t[Tl]=[])}function fE(t,n){let e,i=n[t.index];return vi(i)?e=i:(e=XD(i,n,null,t),n[t.index]=e,n_(n,e)),V1(e,n,t,i),new xv(e,t,n)}function B1(t,n){let e=t[qe],i=e.createComment(""),r=_i(n,t),o=e.parentNode(r);return Zu(e,o,i,e.nextSibling(r),!1),i}var V1=z1,j1=()=>!1;function H1(t,n,e){return j1(t,n,e)}function z1(t,n,e,i){if(t[eo])return;let r;e.type&8?r=Qn(i):r=B1(n,e),t[eo]=r}var Mv=class t{queryList;matches=null;constructor(n){this.queryList=n}clone(){return new t(this.queryList)}setDirty(){this.queryList.setDirty()}},Iv=class t{queries;constructor(n=[]){this.queries=n}createEmbeddedView(n){let e=n.queries;if(e!==null){let i=n.contentQueries!==null?n.contentQueries[0]:e.length,r=[];for(let o=0;o<i;o++){let s=e.getByIndex(o),a=this.queries[s.indexInDeclarationView];r.push(a.clone())}return new t(r)}return null}insertView(n){this.dirtyQueriesWithMatches(n)}detachView(n){this.dirtyQueriesWithMatches(n)}finishViewCreation(n){this.dirtyQueriesWithMatches(n)}dirtyQueriesWithMatches(n){for(let e=0;e<this.queries.length;e++)C_(n,e).matches!==null&&this.queries[e].setDirty()}},nf=class{flags;read;predicate;constructor(n,e,i=null){this.flags=e,this.read=i,typeof n=="string"?this.predicate=q1(n):this.predicate=n}},Tv=class t{queries;constructor(n=[]){this.queries=n}elementStart(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(n,e)}elementEnd(n){for(let e=0;e<this.queries.length;e++)this.queries[e].elementEnd(n)}embeddedTView(n){let e=null;for(let i=0;i<this.length;i++){let r=e!==null?e.length:0,o=this.getByIndex(i).embeddedTView(n,r);o&&(o.indexInDeclarationView=i,e!==null?e.push(o):e=[o])}return e!==null?new t(e):null}template(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].template(n,e)}getByIndex(n){return this.queries[n]}get length(){return this.queries.length}track(n){this.queries.push(n)}},kv=class t{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(n,e=-1){this.metadata=n,this._declarationNodeIndex=e}elementStart(n,e){this.isApplyingToNode(e)&&this.matchTNode(n,e)}elementEnd(n){this._declarationNodeIndex===n.index&&(this._appliesToNextNode=!1)}template(n,e){this.elementStart(n,e)}embeddedTView(n,e){return this.isApplyingToNode(n)?(this.crossesNgTemplate=!0,this.addMatch(-n.index,e),new t(this.metadata)):null}isApplyingToNode(n){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let e=this._declarationNodeIndex,i=n.parent;for(;i!==null&&i.type&8&&i.index!==e;)i=i.parent;return e===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(n,e){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let o=i[r];this.matchTNodeWithReadOption(n,e,U1(e,o)),this.matchTNodeWithReadOption(n,e,Uu(e,n,o,!1,!1))}else i===wt?e.type&4&&this.matchTNodeWithReadOption(n,e,-1):this.matchTNodeWithReadOption(n,e,Uu(e,n,i,!1,!1))}matchTNodeWithReadOption(n,e,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===z||r===Nt||r===wt&&e.type&4)this.addMatch(e.index,-2);else{let o=Uu(e,n,r,!1,!1);o!==null&&this.addMatch(e.index,o)}else this.addMatch(e.index,i)}}addMatch(n,e){this.matches===null?this.matches=[n,e]:this.matches.push(n,e)}};function U1(t,n){let e=t.localNames;if(e!==null){for(let i=0;i<e.length;i+=2)if(e[i]===n)return e[i+1]}return null}function $1(t,n){return t.type&11?ha(t,n):t.type&4?Cf(t,n):null}function G1(t,n,e,i){return e===-1?$1(n,t):e===-2?W1(t,n,i):Vl(t,t[ie],e,n)}function W1(t,n,e){if(e===z)return ha(n,t);if(e===wt)return Cf(n,t);if(e===Nt)return fE(n,t)}function mE(t,n,e,i){let r=n[Vi].queries[i];if(r.matches===null){let o=t.data,s=e.matches,a=[];for(let l=0;s!==null&&l<s.length;l+=2){let c=s[l];if(c<0)a.push(null);else{let d=o[c];a.push(G1(n,d,s[l+1],e.metadata.read))}}r.matches=a}return r.matches}function Rv(t,n,e,i){let r=t.queries.getByIndex(e),o=r.matches;if(o!==null){let s=mE(t,n,r,e);for(let a=0;a<o.length;a+=2){let l=o[a];if(l>0)i.push(s[a/2]);else{let c=o[a+1],d=n[-l];for(let p=lt;p<d.length;p++){let _=d[p];_[Xr]===_[Tt]&&Rv(_[ie],_,c,i)}if(d[ns]!==null){let p=d[ns];for(let _=0;_<p.length;_++){let v=p[_];Rv(v[ie],v,c,i)}}}}}return i}function b_(t,n){return t[Vi].queries[n].queryList}function pE(t,n,e){let i=new Jn((e&4)===4);return BC(t,n,i,i.destroy),(n[Vi]??=new Iv).queries.push(new Mv(i))-1}function hE(t,n,e){let i=Je();return i.firstCreatePass&&(vE(i,new nf(t,n,e),-1),(n&2)===2&&(i.staticViewQueries=!0)),pE(i,J(),n)}function gE(t,n,e,i){let r=Je();if(r.firstCreatePass){let o=At();vE(r,new nf(n,e,i),o.index),K1(r,t),(e&2)===2&&(r.staticContentQueries=!0)}return pE(r,J(),e)}function q1(t){return t.split(",").map(n=>n.trim())}function vE(t,n,e){t.queries===null&&(t.queries=new Tv),t.queries.track(new kv(n,e))}function K1(t,n){let e=t.contentQueries||(t.contentQueries=[]),i=e.length?e[e.length-1]:-1;n!==i&&e.push(t.queries.length-1,n)}function C_(t,n){return t.queries.getByIndex(n)}function _E(t,n){let e=t[ie],i=C_(e,n);return i.crossesNgTemplate?Rv(e,t,n,[]):mE(e,t,i,n)}function yE(t,n,e){let i,r=ll(()=>{i._dirtyCounter();let o=Y1(i,t);if(n&&o===void 0)throw new x(-951,!1);return o});return i=r[mt],i._dirtyCounter=T(0),i._flatValue=void 0,r}function w_(t){return yE(!0,!1,t)}function D_(t){return yE(!0,!0,t)}function bE(t,n){let e=t[mt];e._lView=J(),e._queryIndex=n,e._queryList=b_(e._lView,n),e._queryList.onDirty(()=>e._dirtyCounter.update(i=>i+1))}function Y1(t,n){let e=t._lView,i=t._queryIndex;if(e===void 0||i===void 0||e[fe]&4)return n?void 0:on;let r=b_(e,i),o=_E(e,i);return r.reset(o,iD),n?r.first:r._changesDetected||t._flatValue===void 0?t._flatValue=r.toArray():t._flatValue}var $i=class{},Sf=class{};var rf=class extends $i{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new ef(this);constructor(n,e,i,r=!0){super(),this.ngModuleType=n,this._parent=e;let o=ug(n);this._bootstrapComponents=MD(o.bootstrap),this._r3Injector=$g(n,e,[{provide:$i,useValue:this},{provide:Xl,useValue:this.componentFactoryResolver},...i],Sl(n),new Set(["environment"])),r&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let n=this._r3Injector;!n.destroyed&&n.destroy(),this.destroyCbs.forEach(e=>e()),this.destroyCbs=null}onDestroy(n){this.destroyCbs.push(n)}},of=class extends Sf{moduleType;constructor(n){super(),this.moduleType=n}create(n){return new rf(this.moduleType,n,[])}};var Ul=class extends $i{injector;componentFactoryResolver=new ef(this);instance=null;constructor(n){super();let e=new Yo([...n.providers,{provide:$i,useValue:this},{provide:Xl,useValue:this.componentFactoryResolver}],n.parent||ea(),n.debugName,new Set(["environment"]));this.injector=e,n.runEnvironmentInitializers&&e.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(n){this.injector.onDestroy(n)}};function va(t,n,e=null){return new Ul({providers:t,parent:n,debugName:e,runEnvironmentInitializers:!0}).injector}var Q1=(()=>{class t{_injector;cachedInjectors=new Map;constructor(e){this._injector=e}getOrCreateStandaloneInjector(e){if(!e.standalone)return null;if(!this.cachedInjectors.has(e)){let i=_g(!1,e.type),r=i.length>0?va([i],this._injector,""):null;this.cachedInjectors.set(e,r)}return this.cachedInjectors.get(e)}ngOnDestroy(){try{for(let e of this.cachedInjectors.values())e!==null&&e.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=C({token:t,providedIn:"environment",factory:()=>new t(A(Ve))})}return t})();function O(t){return Gl(()=>{let n=CE(t),e=de(S({},n),{decls:t.decls,vars:t.vars,template:t.template,consts:t.consts||null,ngContentSelectors:t.ngContentSelectors,onPush:t.changeDetection===Uv.OnPush,directiveDefs:null,pipeDefs:null,dependencies:n.standalone&&t.dependencies||null,getStandaloneInjector:n.standalone?r=>r.get(Q1).getOrCreateStandaloneInjector(e):null,getExternalStyles:null,signals:t.signals??!1,data:t.data||{},encapsulation:t.encapsulation||Ci.Emulated,styles:t.styles||on,_:null,schemas:t.schemas||null,tView:null,id:""});n.standalone&&Di("NgStandalone"),wE(e);let i=t.dependencies;return e.directiveDefs=Aw(i,Z1),e.pipeDefs=Aw(i,CC),e.id=eN(e),e})}function Z1(t){return Bi(t)||fg(t)}function B(t){return Gl(()=>({type:t.type,bootstrap:t.bootstrap||on,declarations:t.declarations||on,imports:t.imports||on,exports:t.exports||on,transitiveCompileScopes:null,schemas:t.schemas||null,id:t.id||null}))}function X1(t,n){if(t==null)return Qr;let e={};for(let i in t)if(t.hasOwnProperty(i)){let r=t[i],o,s,a,l;Array.isArray(r)?(a=r[0],o=r[1],s=r[2]??o,l=r[3]||null):(o=r,s=r,a=hf.None,l=null),e[o]=[i,a,l],n[o]=s}return e}function J1(t){if(t==null)return Qr;let n={};for(let e in t)t.hasOwnProperty(e)&&(n[t[e]]=e);return n}function V(t){return Gl(()=>{let n=CE(t);return wE(n),n})}function xf(t){return{type:t.type,name:t.name,factory:null,pure:t.pure!==!1,standalone:t.standalone??!0,onDestroy:t.type.prototype.ngOnDestroy||null}}function CE(t){let n={};return{type:t.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:t.hostBindings||null,hostVars:t.hostVars||0,hostAttrs:t.hostAttrs||null,contentQueries:t.contentQueries||null,declaredInputs:n,inputConfig:t.inputs||Qr,exportAs:t.exportAs||null,standalone:t.standalone??!0,signals:t.signals===!0,selectors:t.selectors||on,viewQuery:t.viewQuery||null,features:t.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:X1(t.inputs,n),outputs:J1(t.outputs),debugInfo:null}}function wE(t){t.features?.forEach(n=>n(t))}function Aw(t,n){return t?()=>{let e=typeof t=="function"?t():t,i=[];for(let r of e){let o=n(r);o!==null&&i.push(o)}return i}:null}function eN(t){let n=0,e=typeof t.consts=="function"?"":t.consts,i=[t.selectors,t.ngContentSelectors,t.hostVars,t.hostAttrs,e,t.vars,t.decls,t.encapsulation,t.standalone,t.signals,t.exportAs,JSON.stringify(t.inputs),JSON.stringify(t.outputs),Object.getOwnPropertyNames(t.type.prototype),!!t.contentQueries,!!t.viewQuery];for(let o of i.join("|"))n=Math.imul(31,n)+o.charCodeAt(0)<<0;return n+=2147483648,"c"+n}function tN(t){return Object.getPrototypeOf(t.prototype).constructor}function He(t){let n=tN(t.type),e=!0,i=[t];for(;n;){let r;if(ji(t))r=n.\u0275cmp||n.\u0275dir;else{if(n.\u0275cmp)throw new x(903,!1);r=n.\u0275dir}if(r){if(e){i.push(r);let s=t;s.inputs=Jg(t.inputs),s.declaredInputs=Jg(t.declaredInputs),s.outputs=Jg(t.outputs);let a=r.hostBindings;a&&sN(t,a);let l=r.viewQuery,c=r.contentQueries;if(l&&rN(t,l),c&&oN(t,c),nN(t,r),bC(t.outputs,r.outputs),ji(r)&&r.data.animation){let d=t.data;d.animation=(d.animation||[]).concat(r.data.animation)}}let o=r.features;if(o)for(let s=0;s<o.length;s++){let a=o[s];a&&a.ngInherit&&a(t),a===He&&(e=!1)}}n=Object.getPrototypeOf(n)}iN(i)}function nN(t,n){for(let e in n.inputs){if(!n.inputs.hasOwnProperty(e)||t.inputs.hasOwnProperty(e))continue;let i=n.inputs[e];i!==void 0&&(t.inputs[e]=i,t.declaredInputs[e]=n.declaredInputs[e])}}function iN(t){let n=0,e=null;for(let i=t.length-1;i>=0;i--){let r=t[i];r.hostVars=n+=r.hostVars,r.hostAttrs=da(r.hostAttrs,e=da(e,r.hostAttrs))}}function Jg(t){return t===Qr?{}:t===on?[]:t}function rN(t,n){let e=t.viewQuery;e?t.viewQuery=(i,r)=>{n(i,r),e(i,r)}:t.viewQuery=n}function oN(t,n){let e=t.contentQueries;e?t.contentQueries=(i,r,o)=>{n(i,r,o),e(i,r,o)}:t.contentQueries=n}function sN(t,n){let e=t.hostBindings;e?t.hostBindings=(i,r)=>{n(i,r),e(i,r)}:t.hostBindings=n}function DE(t,n,e,i,r,o,s,a){if(e.firstCreatePass){t.mergedAttrs=da(t.mergedAttrs,t.attrs);let d=t.tView=e_(2,t,r,o,s,e.directiveRegistry,e.pipeRegistry,null,e.schemas,e.consts,null);e.queries!==null&&(e.queries.template(e,t),d.queries=e.queries.embeddedTView(t))}a&&(t.flags|=a),oa(t,!1);let l=lN(e,n,t,i);Nu()&&a_(e,n,l,t),ua(l,n);let c=XD(l,n,l,t);n[i+rt]=c,n_(n,c),H1(c,t,n)}function aN(t,n,e,i,r,o,s,a,l,c,d){let p=e+rt,_;return n.firstCreatePass?(_=ga(n,p,4,s||null,a||null),Mu()&&oE(n,t,_,Ln(n.consts,c),c_),Gw(n,_)):_=n.data[p],DE(_,t,n,e,i,r,o,l),ia(_)&&bf(n,t,_),c!=null&&Yl(t,_,d),_}function ma(t,n,e,i,r,o,s,a,l,c,d){let p=e+rt,_;if(n.firstCreatePass){if(_=ga(n,p,4,s||null,a||null),c!=null){let v=Ln(n.consts,c);_.localNames=[];for(let y=0;y<v.length;y+=2)_.localNames.push(v[y],-1)}}else _=n.data[p];return DE(_,t,n,e,i,r,o,l),c!=null&&Yl(t,_,d),_}function j(t,n,e,i,r,o,s,a){let l=J(),c=Je(),d=Ln(c.consts,o);return aN(l,c,t,n,e,i,r,d,void 0,s,a),j}function Mf(t,n,e,i,r,o,s,a){let l=J(),c=Je(),d=Ln(c.consts,o);return ma(l,c,t,n,e,i,r,d,void 0,s,a),Mf}var lN=cN;function cN(t,n,e,i){return Ol(!0),n[qe].createComment("")}var If=(()=>{class t{log(e){console.log(e)}warn(e){console.warn(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"platform"})}return t})();function Gi(t){return typeof t=="function"&&t[mt]!==void 0}function E_(t){return Gi(t)&&typeof t.set=="function"}var Tf=new w(""),kf=new w(""),Jl=(()=>{class t{_ngZone;registry;_isZoneStable=!0;_callbacks=[];_taskTrackingZone=null;_destroyRef;constructor(e,i,r){this._ngZone=e,this.registry=i,Cg()&&(this._destroyRef=u(sn,{optional:!0})??void 0),S_||(SE(r),r.addToWindow(i)),this._watchAngularEvents(),e.run(()=>{this._taskTrackingZone=typeof Zone>"u"?null:Zone.current.get("TaskTrackingZone")})}_watchAngularEvents(){let e=this._ngZone.onUnstable.subscribe({next:()=>{this._isZoneStable=!1}}),i=this._ngZone.runOutsideAngular(()=>this._ngZone.onStable.subscribe({next:()=>{U.assertNotInAngularZone(),queueMicrotask(()=>{this._isZoneStable=!0,this._runCallbacksIfReady()})}}));this._destroyRef?.onDestroy(()=>{e.unsubscribe(),i.unsubscribe()})}isStable(){return this._isZoneStable&&!this._ngZone.hasPendingMacrotasks}_runCallbacksIfReady(){if(this.isStable())queueMicrotask(()=>{for(;this._callbacks.length!==0;){let e=this._callbacks.pop();clearTimeout(e.timeoutId),e.doneCb()}});else{let e=this.getPendingTasks();this._callbacks=this._callbacks.filter(i=>i.updateCb&&i.updateCb(e)?(clearTimeout(i.timeoutId),!1):!0)}}getPendingTasks(){return this._taskTrackingZone?this._taskTrackingZone.macroTasks.map(e=>({source:e.source,creationLocation:e.creationLocation,data:e.data})):[]}addCallback(e,i,r){let o=-1;i&&i>0&&(o=setTimeout(()=>{this._callbacks=this._callbacks.filter(s=>s.timeoutId!==o),e()},i)),this._callbacks.push({doneCb:e,timeoutId:o,updateCb:r})}whenStable(e,i,r){if(r&&!this._taskTrackingZone)throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');this.addCallback(e,i,r),this._runCallbacksIfReady()}registerApplication(e){this.registry.registerApplication(e,this)}unregisterApplication(e){this.registry.unregisterApplication(e)}findProviders(e,i,r){return[]}static \u0275fac=function(i){return new(i||t)(A(U),A(EE),A(kf))};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})(),EE=(()=>{class t{_applications=new Map;registerApplication(e,i){this._applications.set(e,i)}unregisterApplication(e){this._applications.delete(e)}unregisterAllApplications(){this._applications.clear()}getTestability(e){return this._applications.get(e)||null}getAllTestabilities(){return Array.from(this._applications.values())}getAllRootElements(){return Array.from(this._applications.keys())}findTestabilityInTree(e,i=!0){return S_?.findTestabilityInTree(this,e,i)??null}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"platform"})}return t})();function SE(t){S_=t}var S_;function ao(t){return!!t&&typeof t.then=="function"}function x_(t){return!!t&&typeof t.subscribe=="function"}var M_=new w("");function Rf(t){return Zr([{provide:M_,multi:!0,useValue:t}])}var I_=(()=>{class t{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((e,i)=>{this.resolve=e,this.reject=i});appInits=u(M_,{optional:!0})??[];injector=u(ce);constructor(){}runInitializers(){if(this.initialized)return;let e=[];for(let r of this.appInits){let o=Rt(this.injector,r);if(ao(o))e.push(o);else if(x_(o)){let s=new Promise((a,l)=>{o.subscribe({complete:a,error:l})});e.push(s)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(e).then(()=>{i()}).catch(r=>{this.reject(r)}),e.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),ec=new w("");function xE(){Th(()=>{let t="";throw new x(600,t)})}function ME(t){return t.isBoundToModule}var dN=10;var En=(()=>{class t{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=u(Xn);afterRenderManager=u(vf);zonelessEnabled=u(Nl);rootEffectScheduler=u(Fu);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new F;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=u(_r);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(ue(e=>!e))}constructor(){u(wi,{optional:!0})}whenStable(){let e;return new Promise(i=>{e=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{e.unsubscribe()})}_injector=u(Ve);_rendererFactory=null;get injector(){return this._injector}bootstrap(e,i){return this.bootstrapImpl(e,i)}bootstrapImpl(e,i,r=ce.NULL){return this._injector.get(U).run(()=>{je(Ne.BootstrapComponentStart);let s=e instanceof wf;if(!this._injector.get(I_).done){let y="";throw new x(405,y)}let l;s?l=e:l=this._injector.get(Xl).resolveComponentFactory(e),this.componentTypes.push(l.componentType);let c=ME(l)?void 0:this._injector.get($i),d=i||l.selector,p=l.create(r,[],d,c),_=p.location.nativeElement,v=p.injector.get(Tf,null);return v?.registerApplication(_),p.onDestroy(()=>{this.detachView(p.hostView),Bl(this.components,p),v?.unregisterApplication(_)}),this._loadComponent(p),je(Ne.BootstrapComponentEnd,p),p})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){je(Ne.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(gf.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw je(Ne.ChangeDetectionEnd),new x(101,!1);let e=ne(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,ne(e),this.afterTick.next(),je(Ne.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(ct,null,{optional:!0}));let e=0;for(;this.dirtyFlags!==0&&e++<dN;){je(Ne.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{je(Ne.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let e=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!kl(r))continue;let o=i&&!this.zonelessEnabled?0:1;KD(r,o),e=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}e||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:e})=>kl(e))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(e){let i=e;this._views.push(i),i.attachToAppRef(this)}detachView(e){let i=e;Bl(this._views,i),i.detachFromAppRef()}_loadComponent(e){this.attachView(e.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(e),this._injector.get(ec,[]).forEach(r=>r(e))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(e=>e()),this._views.slice().forEach(e=>e.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(e){return this._destroyListeners.push(e),()=>Bl(this._destroyListeners,e)}destroy(){if(this._destroyed)throw new x(406,!1);let e=this._injector;e.destroy&&!e.destroyed&&e.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Bl(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function ae(t,n,e,i){let r=J(),o=to();if(Bn(r,o,n)){let s=Je(),a=Al();jO(a,r,t,n,e,i)}return ae}var Av=class{destroy(n){}updateValue(n,e){}swap(n,e){let i=Math.min(n,e),r=Math.max(n,e),o=this.detach(r);if(r-i>1){let s=this.detach(i);this.attach(i,o),this.attach(r,s)}else this.attach(i,o)}move(n,e){this.attach(e,this.detach(n))}};function ev(t,n,e,i,r){return t===e&&Object.is(n,i)?1:Object.is(r(t,n),r(e,i))?-1:0}function uN(t,n,e,i){let r,o,s=0,a=t.length-1,l=void 0;if(Array.isArray(n)){ne(i);let c=n.length-1;for(ne(null);s<=a&&s<=c;){let d=t.at(s),p=n[s],_=ev(s,d,s,p,e);if(_!==0){_<0&&t.updateValue(s,p),s++;continue}let v=t.at(a),y=n[c],D=ev(a,v,c,y,e);if(D!==0){D<0&&t.updateValue(a,y),a--,c--;continue}let M=e(s,d),R=e(a,v),$=e(s,p);if(Object.is($,R)){let Ee=e(c,y);Object.is(Ee,M)?(t.swap(s,a),t.updateValue(a,y),c--,a--):t.move(a,s),t.updateValue(s,p),s++;continue}if(r??=new sf,o??=Nw(t,s,a,e),Ov(t,r,s,$))t.updateValue(s,p),s++,a++;else if(o.has($))r.set(M,t.detach(s)),a--;else{let Ee=t.create(s,n[s]);t.attach(s,Ee),s++,a++}}for(;s<=c;)Ow(t,r,e,s,n[s]),s++}else if(n!=null){ne(i);let c=n[Symbol.iterator]();ne(null);let d=c.next();for(;!d.done&&s<=a;){let p=t.at(s),_=d.value,v=ev(s,p,s,_,e);if(v!==0)v<0&&t.updateValue(s,_),s++,d=c.next();else{r??=new sf,o??=Nw(t,s,a,e);let y=e(s,_);if(Ov(t,r,s,y))t.updateValue(s,_),s++,a++,d=c.next();else if(!o.has(y))t.attach(s,t.create(s,_)),s++,a++,d=c.next();else{let D=e(s,p);r.set(D,t.detach(s)),a--}}}for(;!d.done;)Ow(t,r,e,t.length,d.value),d=c.next()}for(;s<=a;)t.destroy(t.detach(a--));r?.forEach(c=>{t.destroy(c)})}function Ov(t,n,e,i){return n!==void 0&&n.has(i)?(t.attach(e,n.get(i)),n.delete(i),!0):!1}function Ow(t,n,e,i,r){if(Ov(t,n,i,e(i,r)))t.updateValue(i,r);else{let o=t.create(i,r);t.attach(i,o)}}function Nw(t,n,e,i){let r=new Set;for(let o=n;o<=e;o++)r.add(i(o,t.at(o)));return r}var sf=class{kvMap=new Map;_vMap=void 0;has(n){return this.kvMap.has(n)}delete(n){if(!this.has(n))return!1;let e=this.kvMap.get(n);return this._vMap!==void 0&&this._vMap.has(e)?(this.kvMap.set(n,this._vMap.get(e)),this._vMap.delete(e)):this.kvMap.delete(n),!0}get(n){return this.kvMap.get(n)}set(n,e){if(this.kvMap.has(n)){let i=this.kvMap.get(n);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,e)}else this.kvMap.set(n,e)}forEach(n){for(let[e,i]of this.kvMap)if(n(i,e),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),n(i,e)}}};function he(t,n,e,i,r,o,s,a){Di("NgControlFlow");let l=J(),c=Je(),d=Ln(c.consts,o);return ma(l,c,t,n,e,i,r,d,256,s,a),T_}function T_(t,n,e,i,r,o,s,a){Di("NgControlFlow");let l=J(),c=Je(),d=Ln(c.consts,o);return ma(l,c,t,n,e,i,r,d,512,s,a),T_}function ge(t,n){Di("NgControlFlow");let e=J(),i=to(),r=e[i]!==Cn?e[i]:-1,o=r!==-1?af(e,rt+r):void 0,s=0;if(Bn(e,i,t)){let a=ne(null);try{if(o!==void 0&&eE(o,s),t!==-1){let l=rt+t,c=af(e,l),d=Lv(e[ie],l),p=nE(c,d,e),_=Ql(e,d,n,{dehydratedView:p});Zl(c,_,s,fa(d,p))}}finally{ne(a)}}else if(o!==void 0){let a=JD(o,s);a!==void 0&&(a[ht]=n)}}var Nv=class{lContainer;$implicit;$index;constructor(n,e,i){this.lContainer=n,this.$implicit=e,this.$index=i}get $count(){return this.lContainer.length-lt}};function tc(t,n){return n}var Pv=class{hasEmptyBlock;trackByFn;liveCollection;constructor(n,e,i){this.hasEmptyBlock=n,this.trackByFn=e,this.liveCollection=i}};function nc(t,n,e,i,r,o,s,a,l,c,d,p,_){Di("NgControlFlow");let v=J(),y=Je(),D=l!==void 0,M=J(),R=a?s.bind(M[yn][ht]):s,$=new Pv(D,R);M[rt+t]=$,ma(v,y,t+1,n,e,i,r,Ln(y.consts,o),256),D&&ma(v,y,t+2,l,c,d,p,Ln(y.consts,_),512)}var Fv=class extends Av{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(n,e,i){super(),this.lContainer=n,this.hostLView=e,this.templateTNode=i}get length(){return this.lContainer.length-lt}at(n){return this.getLView(n)[ht].$implicit}attach(n,e){let i=e[Xo];this.needsIndexUpdate||=n!==this.length,Zl(this.lContainer,e,n,fa(this.templateTNode,i)),fN(this.lContainer,n)}detach(n){return this.needsIndexUpdate||=n!==this.length-1,mN(this.lContainer,n),pN(this.lContainer,n)}create(n,e){let i=Xu(this.lContainer,this.templateTNode.tView.ssrId);return Ql(this.hostLView,this.templateTNode,new Nv(this.lContainer,e,n),{dehydratedView:i})}destroy(n){_f(n[ie],n)}updateValue(n,e){this.getLView(n)[ht].$implicit=e}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let n=0;n<this.length;n++)this.getLView(n)[ht].$index=n}getLView(n){return hN(this.lContainer,n)}};function ic(t){let n=ne(null),e=Hi();try{let i=J(),r=i[ie],o=i[e],s=e+1,a=af(i,s);if(o.liveCollection===void 0){let c=Lv(r,s);o.liveCollection=new Fv(a,i,c)}else o.liveCollection.reset();let l=o.liveCollection;if(uN(l,t,o.trackByFn,n),l.updateIndexes(),o.hasEmptyBlock){let c=to(),d=l.length===0;if(Bn(i,c,d)){let p=e+2,_=af(i,p);if(d){let v=Lv(r,p),y=nE(_,v,i),D=Ql(i,v,void 0,{dehydratedView:y});Zl(_,D,0,fa(v,y))}else r.firstUpdatePass&&d1(_),eE(_,0)}}}finally{ne(n)}}function af(t,n){return t[n]}function fN(t,n){if(t.length<=lt)return;let e=lt+n,i=t[e],r=i?i[Jr]:void 0;if(i&&r&&r.detachedLeaveAnimationFns&&r.detachedLeaveAnimationFns.length>0){let o=i[mr];_O(o,r),ls.delete(i[pr]),r.detachedLeaveAnimationFns=void 0}}function mN(t,n){if(t.length<=lt)return;let e=lt+n,i=t[e],r=i?i[Jr]:void 0;r&&r.leave&&r.leave.size>0&&(r.detachedLeaveAnimationFns=[])}function pN(t,n){return zl(t,n)}function hN(t,n){return JD(t,n)}function Lv(t,n){return Du(t,n)}function b(t,n,e){let i=J(),r=to();if(Bn(i,r,n)){let o=Je(),s=Al();HD(s,i,t,n,i[qe],e)}return b}function Bv(t,n,e,i,r){f_(n,t,e,r?"class":"style",i)}function f(t,n,e,i){let r=J(),o=r[ie],s=t+rt,a=o.firstCreatePass?g_(s,r,2,n,c_,Mu(),e,i):o.data[s];if(gr(a)){let l=r[gi].tracingService;if(l&&l.componentCreate){let c=o.data[a.directiveStart+a.componentOffset];return l.componentCreate(dE(c),()=>(Pw(t,n,r,a,i),f))}}return Pw(t,n,r,a,i),f}function Pw(t,n,e,i,r){if(d_(i,e,t,n,IE),ia(i)){let o=e[ie];bf(o,e,i),Gv(o,i,e)}r!=null&&Yl(e,i)}function m(){let t=Je(),n=At(),e=u_(n);return t.firstCreatePass&&v_(t,e),Fg(e)&&Lg(),Ng(),e.classesWithoutHost!=null&&eA(e)&&Bv(t,e,J(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&tA(e)&&Bv(t,e,J(),e.stylesWithoutHost,!1),m}function W(t,n,e,i){return f(t,n,e,i),m(),W}function gt(t,n,e,i){let r=J(),o=r[ie],s=t+rt,a=o.firstCreatePass?E1(s,o,2,n,e,i):o.data[s];return d_(a,r,t,n,IE),i!=null&&Yl(r,a),gt}function Dt(){let t=At(),n=u_(t);return Fg(n)&&Lg(),Ng(),Dt}function vt(t,n,e,i){return gt(t,n,e,i),Dt(),vt}var IE=(t,n,e,i,r)=>(Ol(!0),CD(n[qe],i,JC()));function rc(t,n,e){let i=J(),r=i[ie],o=t+rt,s=r.firstCreatePass?g_(o,i,8,"ng-container",c_,Mu(),n,e):r.data[o];if(d_(s,i,t,"ng-container",gN),ia(s)){let a=i[ie];bf(a,i,s),Gv(a,s,i)}return e!=null&&Yl(i,s),rc}function oc(){let t=Je(),n=At(),e=u_(n);return t.firstCreatePass&&v_(t,e),oc}function Gt(t,n,e){return rc(t,n,e),oc(),Gt}var gN=(t,n,e,i,r)=>(Ol(!0),qA(n[qe],""));function Ke(){return J()}function Vn(t,n,e){let i=J(),r=to();if(Bn(i,r,n)){let o=Je(),s=Al();zD(s,i,t,n,i[qe],e)}return Vn}var Pl=void 0;function vN(t){let n=Math.floor(Math.abs(t)),e=t.toString().replace(/^[^.]*\.?/,"").length;return n===1&&e===0?1:5}var _N=["en",[["a","p"],["AM","PM"]],[["AM","PM"]],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],Pl,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],Pl,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm\u202Fa","h:mm:ss\u202Fa","h:mm:ss\u202Fa z","h:mm:ss\u202Fa zzzz"],["{1}, {0}",Pl,Pl,Pl],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",vN],tv={};function Af(t){let n=yN(t),e=Fw(n);if(e)return e;let i=n.split("-")[0];if(e=Fw(i),e)return e;if(i==="en")return _N;throw new x(701,!1)}function Fw(t){return t in tv||(tv[t]=kt.ng&&kt.ng.common&&kt.ng.common.locales&&kt.ng.common.locales[t]),tv[t]}var fs=(function(t){return t[t.LocaleId=0]="LocaleId",t[t.DayPeriodsFormat=1]="DayPeriodsFormat",t[t.DayPeriodsStandalone=2]="DayPeriodsStandalone",t[t.DaysFormat=3]="DaysFormat",t[t.DaysStandalone=4]="DaysStandalone",t[t.MonthsFormat=5]="MonthsFormat",t[t.MonthsStandalone=6]="MonthsStandalone",t[t.Eras=7]="Eras",t[t.FirstDayOfWeek=8]="FirstDayOfWeek",t[t.WeekendRange=9]="WeekendRange",t[t.DateFormat=10]="DateFormat",t[t.TimeFormat=11]="TimeFormat",t[t.DateTimeFormat=12]="DateTimeFormat",t[t.NumberSymbols=13]="NumberSymbols",t[t.NumberFormats=14]="NumberFormats",t[t.CurrencyCode=15]="CurrencyCode",t[t.CurrencySymbol=16]="CurrencySymbol",t[t.CurrencyName=17]="CurrencyName",t[t.Currencies=18]="Currencies",t[t.Directionality=19]="Directionality",t[t.PluralCase=20]="PluralCase",t[t.ExtraData=21]="ExtraData",t})(fs||{});function yN(t){return t.toLowerCase().replace(/_/g,"-")}var sc="en-US";var bN=sc;function TE(t){typeof t=="string"&&(bN=t.toLowerCase().replace(/_/g,"-"))}function k(t,n,e){let i=J(),r=Je(),o=At();return kE(r,i,i[qe],o,t,n,e),k}function Of(t,n,e){let i=J(),r=Je(),o=At();return(o.type&3||e)&&lE(o,r,i,e,i[qe],t,n,Gu(o,i,n)),Of}function kE(t,n,e,i,r,o,s){let a=!0,l=null;if((i.type&3||s)&&(l??=Gu(i,n,o),lE(i,t,n,s,e,r,o,l)&&(a=!1)),a){let c=i.outputs?.[r],d=i.hostDirectiveOutputs?.[r];if(d&&d.length)for(let p=0;p<d.length;p+=2){let _=d[p],v=d[p+1];l??=Gu(i,n,o),Tw(i,n,_,v,r,l)}if(c&&c.length)for(let p of c)l??=Gu(i,n,o),Tw(i,n,p,r,r,l)}}function E(t=1){return XC(t)}function CN(t,n){let e=null,i=iO(t);for(let r=0;r<n.length;r++){let o=n[r];if(o==="*"){e=r;continue}if(i===null?TD(t,o,!0):sO(i,o))return r}return e}function Ie(t){let n=J()[yn][_n];if(!n.projection){let e=t?t.length:1,i=n.projection=MC(e,null),r=i.slice(),o=n.child;for(;o!==null;){if(o.type!==128){let s=t?CN(o,t):0;s!==null&&(r[s]?r[s].projectionNext=o:i[s]=o,r[s]=o)}o=o.next}}}function re(t,n=0,e,i,r,o){let s=J(),a=Je(),l=i?t+1:null;l!==null&&ma(s,a,l,i,r,o,null,e);let c=ga(a,rt+t,16,null,e||null);c.projection===null&&(c.projection=n),jg();let p=!s[Xo]||Pg();s[yn][_n].projection[c.projection]===null&&l!==null?wN(s,a,l):p&&!ff(c)&&TO(a,s,c)}function wN(t,n,e){let i=rt+e,r=n.data[i],o=t[i],s=Xu(o,r.tView.ssrId),a=Ql(t,r,void 0,{dehydratedView:s});Zl(o,a,0,fa(r,s))}function Et(t,n,e,i){return gE(t,n,e,i),Et}function $e(t,n,e){return hE(t,n,e),$e}function q(t){let n=J(),e=Je(),i=ku();Rl(i+1);let r=C_(e,i);if(t.dirty&&NC(n)===((r.metadata.flags&2)===2)){if(r.matches===null)t.reset([]);else{let o=_E(n,i);t.reset(o,iD),t.notifyOnChanges()}return!0}return!1}function K(){return b_(J(),ku())}function Nf(t,n,e,i,r){return bE(n,gE(t,e,i,r)),Nf}function Pf(t,n,e,i){return bE(t,hE(n,e,i)),Pf}function Ff(t=1){Rl(ku()+t)}function at(t){let n=zC();return Eu(n,rt+t)}function ju(t,n){return t<<17|n<<2}function cs(t){return t>>17&32767}function DN(t){return(t&2)==2}function EN(t,n){return t&131071|n<<17}function Vv(t){return t|2}function pa(t){return(t&131068)>>2}function nv(t,n){return t&-131069|n<<2}function SN(t){return(t&1)===1}function jv(t){return t|1}function xN(t,n,e,i,r,o){let s=o?n.classBindings:n.styleBindings,a=cs(s),l=pa(s);t[i]=e;let c=!1,d;if(Array.isArray(e)){let p=e;d=p[1],(d===null||Js(p,d)>0)&&(c=!0)}else d=e;if(r)if(l!==0){let _=cs(t[a+1]);t[i+1]=ju(_,a),_!==0&&(t[_+1]=nv(t[_+1],i)),t[a+1]=EN(t[a+1],i)}else t[i+1]=ju(a,0),a!==0&&(t[a+1]=nv(t[a+1],i)),a=i;else t[i+1]=ju(l,0),a===0?a=i:t[l+1]=nv(t[l+1],i),l=i;c&&(t[i+1]=Vv(t[i+1])),Lw(t,d,i,!0),Lw(t,d,i,!1),MN(n,d,t,i,o),s=ju(a,l),o?n.classBindings=s:n.styleBindings=s}function MN(t,n,e,i,r){let o=r?t.residualClasses:t.residualStyles;o!=null&&typeof n=="string"&&Js(o,n)>=0&&(e[i+1]=jv(e[i+1]))}function Lw(t,n,e,i){let r=t[e+1],o=n===null,s=i?cs(r):pa(r),a=!1;for(;s!==0&&(a===!1||o);){let l=t[s],c=t[s+1];IN(l,n)&&(a=!0,t[s+1]=i?jv(c):Vv(c)),s=i?cs(c):pa(c)}a&&(t[e+1]=i?Vv(r):jv(r))}function IN(t,n){return t===null||n==null||(Array.isArray(t)?t[1]:t)===n?!0:Array.isArray(t)&&typeof n=="string"?Js(t,n)>=0:!1}var bi={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function TN(t){return t.substring(bi.key,bi.keyEnd)}function kN(t){return RN(t),RE(t,AE(t,0,bi.textEnd))}function RE(t,n){let e=bi.textEnd;return e===n?-1:(n=bi.keyEnd=AN(t,bi.key=n,e),AE(t,n,e))}function RN(t){bi.key=0,bi.keyEnd=0,bi.value=0,bi.valueEnd=0,bi.textEnd=t.length}function AE(t,n,e){for(;n<e&&t.charCodeAt(n)<=32;)n++;return n}function AN(t,n,e){for(;n<e&&t.charCodeAt(n)>32;)n++;return n}function an(t,n,e){return OE(t,n,e,!1),an}function P(t,n){return OE(t,n,null,!0),P}function _t(t){NN(jN,ON,t,!0)}function ON(t,n){for(let e=kN(n);e>=0;e=RE(n,e))yu(t,TN(n),!0)}function OE(t,n,e,i){let r=J(),o=Je(),s=Iu(2);if(o.firstUpdatePass&&PE(o,t,s,i),n!==Cn&&Bn(r,s,n)){let a=o.data[Hi()];FE(o,a,r,r[qe],t,r[s+1]=zN(n,e),i,s)}}function NN(t,n,e,i){let r=Je(),o=Iu(2);r.firstUpdatePass&&PE(r,null,o,i);let s=J();if(e!==Cn&&Bn(s,o,e)){let a=r.data[Hi()];if(LE(a,i)&&!NE(r,o)){let l=i?a.classesWithoutHost:a.stylesWithoutHost;l!==null&&(e=pu(l,e||"")),Bv(r,a,s,e,i)}else HN(r,a,s,s[qe],s[o+1],s[o+1]=VN(t,n,e),i,o)}}function NE(t,n){return n>=t.expandoStartIndex}function PE(t,n,e,i){let r=t.data;if(r[e+1]===null){let o=r[Hi()],s=NE(t,e);LE(o,i)&&n===null&&!s&&(n=!1),n=PN(r,o,n,i),xN(r,o,n,e,s,i)}}function PN(t,n,e,i){let r=KC(t),o=i?n.residualClasses:n.residualStyles;if(r===null)(i?n.classBindings:n.styleBindings)===0&&(e=iv(null,t,n,e,i),e=$l(e,n.attrs,i),o=null);else{let s=n.directiveStylingLast;if(s===-1||t[s]!==r)if(e=iv(r,t,n,e,i),o===null){let l=FN(t,n,i);l!==void 0&&Array.isArray(l)&&(l=iv(null,t,n,l[1],i),l=$l(l,n.attrs,i),LN(t,n,i,l))}else o=BN(t,n,i)}return o!==void 0&&(i?n.residualClasses=o:n.residualStyles=o),e}function FN(t,n,e){let i=e?n.classBindings:n.styleBindings;if(pa(i)!==0)return t[cs(i)]}function LN(t,n,e,i){let r=e?n.classBindings:n.styleBindings;t[cs(r)]=i}function BN(t,n,e){let i,r=n.directiveEnd;for(let o=1+n.directiveStylingLast;o<r;o++){let s=t[o].hostAttrs;i=$l(i,s,e)}return $l(i,n.attrs,e)}function iv(t,n,e,i,r){let o=null,s=e.directiveEnd,a=e.directiveStylingLast;for(a===-1?a=e.directiveStart:a++;a<s&&(o=n[a],i=$l(i,o.hostAttrs,r),o!==t);)a++;return t!==null&&(e.directiveStylingLast=a),i}function $l(t,n,e){let i=e?1:2,r=-1;if(n!==null)for(let o=0;o<n.length;o++){let s=n[o];typeof s=="number"?r=s:r===i&&(Array.isArray(t)||(t=t===void 0?[]:["",t]),yu(t,s,e?!0:n[++o]))}return t===void 0?null:t}function VN(t,n,e){if(e==null||e==="")return on;let i=[],r=ei(e);if(Array.isArray(r))for(let o=0;o<r.length;o++)t(i,r[o],!0);else if(r instanceof Set)for(let o of r)t(i,o,!0);else if(typeof r=="object")for(let o in r)r.hasOwnProperty(o)&&t(i,o,r[o]);else typeof r=="string"&&n(i,r);return i}function jN(t,n,e){let i=String(n);i!==""&&!i.includes(" ")&&yu(t,i,e)}function HN(t,n,e,i,r,o,s,a){r===Cn&&(r=on);let l=0,c=0,d=0<r.length?r[0]:null,p=0<o.length?o[0]:null;for(;d!==null||p!==null;){let _=l<r.length?r[l+1]:void 0,v=c<o.length?o[c+1]:void 0,y=null,D;d===p?(l+=2,c+=2,_!==v&&(y=p,D=v)):p===null||d!==null&&d<p?(l+=2,y=d):(c+=2,y=p,D=v),y!==null&&FE(t,n,e,i,y,D,s,a),d=l<r.length?r[l]:null,p=c<o.length?o[c]:null}}function FE(t,n,e,i,r,o,s,a){if(!(n.type&3))return;let l=t.data,c=l[a+1],d=SN(c)?Bw(l,n,e,r,pa(c),s):void 0;if(!lf(d)){lf(o)||DN(c)&&(o=Bw(l,null,e,r,a,s));let p=Mg(Hi(),e);RO(i,s,p,r,o)}}function Bw(t,n,e,i,r,o){let s=n===null,a;for(;r>0;){let l=t[r],c=Array.isArray(l),d=c?l[1]:l,p=d===null,_=e[r+1];_===Cn&&(_=p?on:void 0);let v=p?bu(_,i):d===i?_:void 0;if(c&&!lf(v)&&(v=bu(l,i)),lf(v)&&(a=v,s))return a;let y=t[r+1];r=s?cs(y):pa(y)}if(n!==null){let l=o?n.residualClasses:n.residualStyles;l!=null&&(a=bu(l,i))}return a}function lf(t){return t!==void 0}function zN(t,n){return t==null||t===""||(typeof n=="string"?t=t+n:typeof t=="object"&&(t=Sl(ei(t)))),t}function LE(t,n){return(t.flags&(n?8:16))!==0}function g(t,n=""){let e=J(),i=Je(),r=t+rt,o=i.firstCreatePass?ga(i,r,1,n,null):i.data[r],s=UN(i,e,o,n);e[r]=s,Nu()&&a_(i,e,s,o),oa(o,!1)}var UN=(t,n,e,i)=>(Ol(!0),GA(n[qe],i));function BE(t,n,e,i=""){return Bn(t,to(),e)?n+Xs(e)+i:Cn}function $N(t,n,e,i,r,o=""){let s=UC(),a=y_(t,s,e,r);return Iu(2),a?n+Xs(e)+i+Xs(r)+o:Cn}function ee(t){return X("",t),ee}function X(t,n,e){let i=J(),r=BE(i,t,n,e);return r!==Cn&&VE(i,Hi(),r),X}function ot(t,n,e,i,r){let o=J(),s=$N(o,t,n,e,i,r);return s!==Cn&&VE(o,Hi(),s),ot}function VE(t,n,e){let i=Mg(n,t);WA(t[qe],i,e)}function Pt(t,n,e){E_(n)&&(n=n());let i=J(),r=to();if(Bn(i,r,n)){let o=Je(),s=Al();HD(s,i,t,n,i[qe],e)}return Pt}function Wt(t,n){let e=E_(t);return e&&t.set(n),e}function Ft(t,n){let e=J(),i=Je(),r=At();return kE(i,e,e[qe],r,t,n),Ft}function k_(t,n,e=""){return BE(J(),t,n,e)}function Vw(t,n,e){let i=Je();i.firstCreatePass&&jE(n,i.data,i.blueprint,ji(t),e)}function jE(t,n,e,i,r){if(t=Jt(t),Array.isArray(t))for(let o=0;o<t.length;o++)jE(t[o],n,e,i,r);else{let o=Je(),s=J(),a=At(),l=Ko(t)?t:Jt(t.provide),c=bg(t),d=a.providerIndexes&1048575,p=a.directiveStart,_=a.providerIndexes>>20;if(Ko(t)||!t.multi){let v=new as(c,r,I,null),y=ov(l,n,r?d:d+_,p);y===-1?(av(Qu(a,s),o,l),rv(o,t,n.length),n.push(l),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),e.push(v),s.push(v)):(e[y]=v,s[y]=v)}else{let v=ov(l,n,d+_,p),y=ov(l,n,d,d+_),D=v>=0&&e[v],M=y>=0&&e[y];if(r&&!M||!r&&!D){av(Qu(a,s),o,l);let R=qN(r?WN:GN,e.length,r,i,c,t);!r&&M&&(e[y].providerFactory=R),rv(o,t,n.length,0),n.push(l),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),e.push(R),s.push(R)}else{let R=HE(e[r?y:v],c,!r&&i);rv(o,t,v>-1?v:y,R)}!r&&i&&M&&e[y].componentProviders++}}}function rv(t,n,e,i){let r=Ko(n),o=RC(n);if(r||o){let l=(o?Jt(n.useClass):n).prototype.ngOnDestroy;if(l){let c=t.destroyHooks||(t.destroyHooks=[]);if(!r&&n.multi){let d=c.indexOf(e);d===-1?c.push(e,[i,l]):c[d+1].push(i,l)}else c.push(e,l)}}}function HE(t,n,e){return e&&t.componentProviders++,t.multi.push(n)-1}function ov(t,n,e,i){for(let r=e;r<i;r++)if(n[r]===t)return r;return-1}function GN(t,n,e,i,r){return Hv(this.multi,[])}function WN(t,n,e,i,r){let o=this.multi,s;if(this.providerFactory){let a=this.providerFactory.componentProviders,l=Vl(i,i[ie],this.providerFactory.index,r);s=l.slice(0,a),Hv(o,s);for(let c=a;c<l.length;c++)s.push(l[c])}else s=[],Hv(o,s);return s}function Hv(t,n){for(let e=0;e<t.length;e++){let i=t[e];n.push(i())}return n}function qN(t,n,e,i,r,o){let s=new as(t,e,I,null);return s.multi=[],s.index=n,s.componentProviders=0,HE(s,r,i&&!e),s}function ze(t,n){return e=>{e.providersResolver=(i,r)=>Vw(i,r?r(t):t,!1),n&&(e.viewProvidersResolver=(i,r)=>Vw(i,r?r(n):n,!0))}}function Wi(t,n){let e=os()+t,i=J();return i[e]===Cn?Ef(i,e,n()):S1(i,e)}function ln(t,n,e){return zE(J(),os(),t,n,e)}function ac(t,n,e,i){return UE(J(),os(),t,n,e,i)}function R_(t,n,e,i,r){return KN(J(),os(),t,n,e,i,r)}function A_(t,n){let e=t[n];return e===Cn?void 0:e}function zE(t,n,e,i,r,o){let s=n+e;return Bn(t,s,r)?Ef(t,s+1,o?i.call(o,r):i(r)):A_(t,s+1)}function UE(t,n,e,i,r,o,s){let a=n+e;return y_(t,a,r,o)?Ef(t,a+2,s?i.call(s,r,o):i(r,o)):A_(t,a+2)}function KN(t,n,e,i,r,o,s,a){let l=n+e;return x1(t,l,r,o,s)?Ef(t,l+3,a?i.call(a,r,o,s):i(r,o,s)):A_(t,l+3)}function qi(t,n){let e=Je(),i,r=t+rt;e.firstCreatePass?(i=YN(n,e.pipeRegistry),e.data[r]=i,i.onDestroy&&(e.destroyHooks??=[]).push(r,i.onDestroy)):i=e.data[r];let o=i.factory||(i.factory=qr(i.type,!0)),s,a=gn(I);try{let l=Yu(!1),c=o();return Yu(l),Ig(e,J(),r,c),c}finally{gn(a)}}function YN(t,n){if(n)for(let e=n.length-1;e>=0;e--){let i=n[e];if(t===i.name)return i}}function O_(t,n,e){let i=t+rt,r=J(),o=Eu(r,i);return $E(r,i)?zE(r,os(),n,o.transform,e,o):o.transform(e)}function wr(t,n,e,i){let r=t+rt,o=J(),s=Eu(o,r);return $E(o,r)?UE(o,os(),n,s.transform,e,i,s):s.transform(e,i)}function $E(t,n){return t[ie].data[n].pure}function lo(t,n){return Cf(t,n)}var cf=class{ngModuleFactory;componentFactories;constructor(n,e){this.ngModuleFactory=n,this.componentFactories=e}},N_=(()=>{class t{compileModuleSync(e){return new of(e)}compileModuleAsync(e){return Promise.resolve(this.compileModuleSync(e))}compileModuleAndAllComponentsSync(e){let i=this.compileModuleSync(e),r=ug(e),o=MD(r.declarations).reduce((s,a)=>{let l=Bi(a);return l&&s.push(new ro(l)),s},[]);return new cf(i,o)}compileModuleAndAllComponentsAsync(e){return Promise.resolve(this.compileModuleAndAllComponentsSync(e))}clearCache(){}clearCacheFor(e){}getModuleId(e){}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var GE=(()=>{class t{applicationErrorHandler=u(Xn);appRef=u(En);taskService=u(_r);ngZone=u(U);zonelessEnabled=u(Nl);tracing=u(wi,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new ke;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Dl):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(u(Kg,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let e=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(e);return}this.switchToMicrotaskScheduler(),this.taskService.remove(e)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let e=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(e)})})}notify(e){if(!this.zonelessEnabled&&e===5)return;switch(e){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?iw:Gg;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Dl+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let e=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(e),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let e=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(e)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function WE(){return[{provide:Li,useExisting:GE},{provide:U,useClass:El},{provide:Nl,useValue:!0}]}function QN(){return typeof $localize<"u"&&$localize.locale||sc}var lc=new w("",{factory:()=>u(lc,{optional:!0,skipSelf:!0})||QN()});function Pe(t){return hC(t)}function dt(t,n){return ll(t,n?.equal)}var ZN=t=>t;function P_(t,n){if(typeof t=="function"){let e=Gh(t,ZN,n?.equal);return qE(e,n?.debugName)}else{let e=Gh(t.source,t.computation,t.equal);return qE(e,t.debugName)}}function qE(t,n){let e=t[mt],i=t;return i.set=r=>mC(e,r),i.update=r=>pC(e,r),i.asReadonly=Pu.bind(t),i}var tS=Symbol("InputSignalNode#UNSET"),lP=de(S({},cl),{transformFn:void 0,applyValueToInputSignal(t,n){Lo(t,n)}});function nS(t,n){let e=Object.create(lP);e.value=t,e.transformFn=n?.transform;function i(){if(jr(e),e.value===tS){let r=null;throw new x(-950,r)}return e.value}return i[mt]=e,i}var Sn=class{attributeName;constructor(n){this.attributeName=n}__NG_ELEMENT_ID__=()=>Wl(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}};function KE(t,n){return nS(t,n)}function cP(t){return nS(tS,t)}var Vf=(KE.required=cP,KE);function YE(t,n){return w_(n)}function dP(t,n){return D_(n)}var dc=(YE.required=dP,YE);function QE(t,n){return w_(n)}function uP(t,n){return D_(n)}var iS=(QE.required=uP,QE);var L_=new w(""),fP=new w("");function cc(t){return!t.moduleRef}function mP(t){let n=cc(t)?t.r3Injector:t.moduleRef.injector,e=n.get(U);return e.run(()=>{cc(t)?t.r3Injector.resolveInjectorInitializers():t.moduleRef.resolveInjectorInitializers();let i=n.get(Xn),r;if(e.runOutsideAngular(()=>{r=e.onError.subscribe({next:i})}),cc(t)){let o=()=>n.destroy(),s=t.platformInjector.get(L_);s.add(o),n.onDestroy(()=>{r.unsubscribe(),s.delete(o)})}else{let o=()=>t.moduleRef.destroy(),s=t.platformInjector.get(L_);s.add(o),t.moduleRef.onDestroy(()=>{Bl(t.allPlatformModules,t.moduleRef),r.unsubscribe(),s.delete(o)})}return hP(i,e,()=>{let o=n.get(_r),s=o.add(),a=n.get(I_);return a.runInitializers(),a.donePromise.then(()=>{let l=n.get(lc,sc);if(TE(l||sc),!n.get(fP,!0))return cc(t)?n.get(En):(t.allPlatformModules.push(t.moduleRef),t.moduleRef);if(cc(t)){let d=n.get(En);return t.rootComponent!==void 0&&d.bootstrap(t.rootComponent),d}else return pP?.(t.moduleRef,t.allPlatformModules),t.moduleRef}).finally(()=>{o.remove(s)})})})}var pP;function hP(t,n,e){try{let i=e();return ao(i)?i.catch(r=>{throw n.runOutsideAngular(()=>t(r)),r}):i}catch(i){throw n.runOutsideAngular(()=>t(i)),i}}var Lf=null;function gP(t=[],n){return ce.create({name:n,providers:[{provide:Il,useValue:"platform"},{provide:L_,useValue:new Set([()=>Lf=null])},...t]})}function vP(t=[]){if(Lf)return Lf;let n=gP(t);return Lf=n,xE(),_P(n),n}function _P(t){let n=t.get(df,null);Rt(t,()=>{n?.forEach(e=>e())})}var yP=1e4;var vQ=yP-1e3;var De=(()=>{class t{static __NG_ELEMENT_ID__=bP}return t})();function bP(t){return CP(At(),J(),(t&16)===16)}function CP(t,n,e){if(gr(t)&&!e){let i=Zn(t.index,n);return new io(i,i)}else if(t.type&175){let i=n[yn];return new io(i,n)}return null}var B_=class{supports(n){return __(n)}create(n){return new V_(n)}},wP=(t,n)=>n,V_=class{length=0;collection;_linkedRecords=null;_unlinkedRecords=null;_previousItHead=null;_itHead=null;_itTail=null;_additionsHead=null;_additionsTail=null;_movesHead=null;_movesTail=null;_removalsHead=null;_removalsTail=null;_identityChangesHead=null;_identityChangesTail=null;_trackByFn;constructor(n){this._trackByFn=n||wP}forEachItem(n){let e;for(e=this._itHead;e!==null;e=e._next)n(e)}forEachOperation(n){let e=this._itHead,i=this._removalsHead,r=0,o=null;for(;e||i;){let s=!i||e&&e.currentIndex<ZE(i,r,o)?e:i,a=ZE(s,r,o),l=s.currentIndex;if(s===i)r--,i=i._nextRemoved;else if(e=e._next,s.previousIndex==null)r++;else{o||(o=[]);let c=a-r,d=l-r;if(c!=d){for(let _=0;_<c;_++){let v=_<o.length?o[_]:o[_]=0,y=v+_;d<=y&&y<c&&(o[_]=v+1)}let p=s.previousIndex;o[p]=d-c}}a!==l&&n(s,a,l)}}forEachPreviousItem(n){let e;for(e=this._previousItHead;e!==null;e=e._nextPrevious)n(e)}forEachAddedItem(n){let e;for(e=this._additionsHead;e!==null;e=e._nextAdded)n(e)}forEachMovedItem(n){let e;for(e=this._movesHead;e!==null;e=e._nextMoved)n(e)}forEachRemovedItem(n){let e;for(e=this._removalsHead;e!==null;e=e._nextRemoved)n(e)}forEachIdentityChange(n){let e;for(e=this._identityChangesHead;e!==null;e=e._nextIdentityChange)n(e)}diff(n){if(n==null&&(n=[]),!__(n))throw new x(900,!1);return this.check(n)?this:null}onDestroy(){}check(n){this._reset();let e=this._itHead,i=!1,r,o,s;if(Array.isArray(n)){this.length=n.length;for(let a=0;a<this.length;a++)o=n[a],s=this._trackByFn(a,o),e===null||!Object.is(e.trackById,s)?(e=this._mismatch(e,o,s,a),i=!0):(i&&(e=this._verifyReinsertion(e,o,s,a)),Object.is(e.item,o)||this._addIdentityChange(e,o)),e=e._next}else r=0,aE(n,a=>{s=this._trackByFn(r,a),e===null||!Object.is(e.trackById,s)?(e=this._mismatch(e,a,s,r),i=!0):(i&&(e=this._verifyReinsertion(e,a,s,r)),Object.is(e.item,a)||this._addIdentityChange(e,a)),e=e._next,r++}),this.length=r;return this._truncate(e),this.collection=n,this.isDirty}get isDirty(){return this._additionsHead!==null||this._movesHead!==null||this._removalsHead!==null||this._identityChangesHead!==null}_reset(){if(this.isDirty){let n;for(n=this._previousItHead=this._itHead;n!==null;n=n._next)n._nextPrevious=n._next;for(n=this._additionsHead;n!==null;n=n._nextAdded)n.previousIndex=n.currentIndex;for(this._additionsHead=this._additionsTail=null,n=this._movesHead;n!==null;n=n._nextMoved)n.previousIndex=n.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(n,e,i,r){let o;return n===null?o=this._itTail:(o=n._prev,this._remove(n)),n=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null),n!==null?(Object.is(n.item,e)||this._addIdentityChange(n,e),this._reinsertAfter(n,o,r)):(n=this._linkedRecords===null?null:this._linkedRecords.get(i,r),n!==null?(Object.is(n.item,e)||this._addIdentityChange(n,e),this._moveAfter(n,o,r)):n=this._addAfter(new j_(e,i),o,r)),n}_verifyReinsertion(n,e,i,r){let o=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null);return o!==null?n=this._reinsertAfter(o,n._prev,r):n.currentIndex!=r&&(n.currentIndex=r,this._addToMoves(n,r)),n}_truncate(n){for(;n!==null;){let e=n._next;this._addToRemovals(this._unlink(n)),n=e}this._unlinkedRecords!==null&&this._unlinkedRecords.clear(),this._additionsTail!==null&&(this._additionsTail._nextAdded=null),this._movesTail!==null&&(this._movesTail._nextMoved=null),this._itTail!==null&&(this._itTail._next=null),this._removalsTail!==null&&(this._removalsTail._nextRemoved=null),this._identityChangesTail!==null&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(n,e,i){this._unlinkedRecords!==null&&this._unlinkedRecords.remove(n);let r=n._prevRemoved,o=n._nextRemoved;return r===null?this._removalsHead=o:r._nextRemoved=o,o===null?this._removalsTail=r:o._prevRemoved=r,this._insertAfter(n,e,i),this._addToMoves(n,i),n}_moveAfter(n,e,i){return this._unlink(n),this._insertAfter(n,e,i),this._addToMoves(n,i),n}_addAfter(n,e,i){return this._insertAfter(n,e,i),this._additionsTail===null?this._additionsTail=this._additionsHead=n:this._additionsTail=this._additionsTail._nextAdded=n,n}_insertAfter(n,e,i){let r=e===null?this._itHead:e._next;return n._next=r,n._prev=e,r===null?this._itTail=n:r._prev=n,e===null?this._itHead=n:e._next=n,this._linkedRecords===null&&(this._linkedRecords=new Bf),this._linkedRecords.put(n),n.currentIndex=i,n}_remove(n){return this._addToRemovals(this._unlink(n))}_unlink(n){this._linkedRecords!==null&&this._linkedRecords.remove(n);let e=n._prev,i=n._next;return e===null?this._itHead=i:e._next=i,i===null?this._itTail=e:i._prev=e,n}_addToMoves(n,e){return n.previousIndex===e||(this._movesTail===null?this._movesTail=this._movesHead=n:this._movesTail=this._movesTail._nextMoved=n),n}_addToRemovals(n){return this._unlinkedRecords===null&&(this._unlinkedRecords=new Bf),this._unlinkedRecords.put(n),n.currentIndex=null,n._nextRemoved=null,this._removalsTail===null?(this._removalsTail=this._removalsHead=n,n._prevRemoved=null):(n._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=n),n}_addIdentityChange(n,e){return n.item=e,this._identityChangesTail===null?this._identityChangesTail=this._identityChangesHead=n:this._identityChangesTail=this._identityChangesTail._nextIdentityChange=n,n}},j_=class{item;trackById;currentIndex=null;previousIndex=null;_nextPrevious=null;_prev=null;_next=null;_prevDup=null;_nextDup=null;_prevRemoved=null;_nextRemoved=null;_nextAdded=null;_nextMoved=null;_nextIdentityChange=null;constructor(n,e){this.item=n,this.trackById=e}},H_=class{_head=null;_tail=null;add(n){this._head===null?(this._head=this._tail=n,n._nextDup=null,n._prevDup=null):(this._tail._nextDup=n,n._prevDup=this._tail,n._nextDup=null,this._tail=n)}get(n,e){let i;for(i=this._head;i!==null;i=i._nextDup)if((e===null||e<=i.currentIndex)&&Object.is(i.trackById,n))return i;return null}remove(n){let e=n._prevDup,i=n._nextDup;return e===null?this._head=i:e._nextDup=i,i===null?this._tail=e:i._prevDup=e,this._head===null}},Bf=class{map=new Map;put(n){let e=n.trackById,i=this.map.get(e);i||(i=new H_,this.map.set(e,i)),i.add(n)}get(n,e){let i=n,r=this.map.get(i);return r?r.get(n,e):null}remove(n){let e=n.trackById;return this.map.get(e).remove(n)&&this.map.delete(e),n}get isEmpty(){return this.map.size===0}clear(){this.map.clear()}};function ZE(t,n,e){let i=t.previousIndex;if(i===null)return i;let r=0;return e&&i<e.length&&(r=e[i]),i+n+r}var z_=class{supports(n){return n instanceof Map||Df(n)}create(){return new U_}},U_=class{_records=new Map;_mapHead=null;_appendAfter=null;_previousMapHead=null;_changesHead=null;_changesTail=null;_additionsHead=null;_additionsTail=null;_removalsHead=null;get isDirty(){return this._additionsHead!==null||this._changesHead!==null||this._removalsHead!==null}forEachItem(n){let e;for(e=this._mapHead;e!==null;e=e._next)n(e)}forEachPreviousItem(n){let e;for(e=this._previousMapHead;e!==null;e=e._nextPrevious)n(e)}forEachChangedItem(n){let e;for(e=this._changesHead;e!==null;e=e._nextChanged)n(e)}forEachAddedItem(n){let e;for(e=this._additionsHead;e!==null;e=e._nextAdded)n(e)}forEachRemovedItem(n){let e;for(e=this._removalsHead;e!==null;e=e._nextRemoved)n(e)}diff(n){if(!n)n=new Map;else if(!(n instanceof Map||Df(n)))throw new x(900,!1);return this.check(n)?this:null}check(n){this._reset();let e=this._mapHead;if(this._appendAfter=null,this._forEach(n,(i,r)=>{if(e&&e.key===r)this._maybeAddToChanges(e,i),this._appendAfter=e,e=e._next;else{let o=this._getOrCreateRecordForKey(r,i);e=this._insertBeforeOrAppend(e,o)}}),e){e._prev&&(e._prev._next=null),this._removalsHead=e;for(let i=e;i!==null;i=i._nextRemoved)i===this._mapHead&&(this._mapHead=null),this._records.delete(i.key),i._nextRemoved=i._next,i.previousValue=i.currentValue,i.currentValue=null,i._prev=null,i._next=null}return this._changesTail&&(this._changesTail._nextChanged=null),this._additionsTail&&(this._additionsTail._nextAdded=null),this.isDirty}_insertBeforeOrAppend(n,e){if(n){let i=n._prev;return e._next=n,e._prev=i,n._prev=e,i&&(i._next=e),n===this._mapHead&&(this._mapHead=e),this._appendAfter=n,n}return this._appendAfter?(this._appendAfter._next=e,e._prev=this._appendAfter):this._mapHead=e,this._appendAfter=e,null}_getOrCreateRecordForKey(n,e){if(this._records.has(n)){let r=this._records.get(n);this._maybeAddToChanges(r,e);let o=r._prev,s=r._next;return o&&(o._next=s),s&&(s._prev=o),r._next=null,r._prev=null,r}let i=new $_(n);return this._records.set(n,i),i.currentValue=e,this._addToAdditions(i),i}_reset(){if(this.isDirty){let n;for(this._previousMapHead=this._mapHead,n=this._previousMapHead;n!==null;n=n._next)n._nextPrevious=n._next;for(n=this._changesHead;n!==null;n=n._nextChanged)n.previousValue=n.currentValue;for(n=this._additionsHead;n!=null;n=n._nextAdded)n.previousValue=n.currentValue;this._changesHead=this._changesTail=null,this._additionsHead=this._additionsTail=null,this._removalsHead=null}}_maybeAddToChanges(n,e){Object.is(e,n.currentValue)||(n.previousValue=n.currentValue,n.currentValue=e,this._addToChanges(n))}_addToAdditions(n){this._additionsHead===null?this._additionsHead=this._additionsTail=n:(this._additionsTail._nextAdded=n,this._additionsTail=n)}_addToChanges(n){this._changesHead===null?this._changesHead=this._changesTail=n:(this._changesTail._nextChanged=n,this._changesTail=n)}_forEach(n,e){n instanceof Map?n.forEach(e):Object.keys(n).forEach(i=>e(n[i],i))}},$_=class{key;previousValue=null;currentValue=null;_nextPrevious=null;_next=null;_prev=null;_nextAdded=null;_nextRemoved=null;_nextChanged=null;constructor(n){this.key=n}};function XE(){return new jf([new B_])}var jf=(()=>{class t{factories;static \u0275prov=C({token:t,providedIn:"root",factory:XE});constructor(e){this.factories=e}static create(e,i){if(i!=null){let r=i.factories.slice();e=e.concat(r)}return new t(e)}static extend(e){return{provide:t,useFactory:()=>{let i=u(t,{optional:!0,skipSelf:!0});return t.create(e,i||XE())}}}find(e){let i=this.factories.find(r=>r.supports(e));if(i!=null)return i;throw new x(901,!1)}}return t})();function JE(){return new q_([new z_])}var q_=(()=>{class t{static \u0275prov=C({token:t,providedIn:"root",factory:JE});factories;constructor(e){this.factories=e}static create(e,i){if(i){let r=i.factories.slice();e=e.concat(r)}return new t(e)}static extend(e){return{provide:t,useFactory:()=>{let i=u(t,{optional:!0,skipSelf:!0});return t.create(e,i||JE())}}}find(e){let i=this.factories.find(r=>r.supports(e));if(i)return i;throw new x(901,!1)}}return t})();var rS=(()=>{class t{constructor(e){}static \u0275fac=function(i){return new(i||t)(A(En))};static \u0275mod=B({type:t});static \u0275inj=L({})}return t})();function oS(t){let{rootComponent:n,appProviders:e,platformProviders:i,platformRef:r}=t;je(Ne.BootstrapApplicationStart);try{let o=r?.injector??vP(i),s=[WE(),ow,...e||[]],a=new Ul({providers:s,parent:o,debugName:"",runEnvironmentInitializers:!1});return mP({r3Injector:a.injector,platformInjector:o,rootComponent:n})}catch(o){return Promise.reject(o)}finally{je(Ne.BootstrapApplicationEnd)}}function H(t){return typeof t=="boolean"?t:t!=null&&t!=="false"}function St(t,n=NaN){return!isNaN(parseFloat(t))&&!isNaN(Number(t))?Number(t):n}var F_=Symbol("NOT_SET"),sS=new Set,DP=de(S({},cl),{kind:"afterRenderEffectPhase",consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,value:F_,cleanup:null,consumerMarkedDirty(){if(this.sequence.impl.executing){if(this.sequence.lastPhase===null||this.sequence.lastPhase<this.phase)return;this.sequence.erroredOrDestroyed=!0}this.sequence.scheduler.notify(7)},phaseFn(t){if(this.sequence.lastPhase=this.phase,!this.dirty)return this.signal;if(this.dirty=!1,this.value!==F_&&!zs(this))return this.signal;try{for(let r of this.cleanup??sS)r()}finally{this.cleanup?.clear()}let n=[];t!==void 0&&n.push(t),n.push(this.registerCleanupFn);let e=cr(this),i;try{i=this.userFn.apply(null,n)}finally{Hr(this,e)}return(this.value===F_||!this.equal(this.value,i))&&(this.value=i,this.version++),this.signal}}),G_=class extends jl{scheduler;lastPhase=null;nodes=[void 0,void 0,void 0,void 0];onDestroyFns=null;constructor(n,e,i,r,o,s=null){super(n,[void 0,void 0,void 0,void 0],i,!1,o.get(sn),s),this.scheduler=r;for(let a of r_){let l=e[a];if(l===void 0)continue;let c=Object.create(DP);c.sequence=this,c.phase=a,c.userFn=l,c.dirty=!0,c.signal=()=>(jr(c),c.value),c.signal[mt]=c,c.registerCleanupFn=d=>(c.cleanup??=new Set).add(d),this.nodes[a]=c,this.hooks[a]=d=>c.phaseFn(d)}}afterRun(){super.afterRun(),this.lastPhase=null}destroy(){if(this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();super.destroy();for(let n of this.nodes)if(n)try{for(let e of n.cleanup??sS)e()}finally{zr(n)}}};function aS(t,n){let e=n?.injector??u(ce),i=e.get(Li),r=e.get(vf),o=e.get(wi,null,{optional:!0});r.impl??=e.get(o_);let s=t;typeof s=="function"&&(s={mixedReadWrite:t});let a=e.get(sa,null,{optional:!0}),l=new G_(r.impl,[s.earlyRead,s.write,s.mixedReadWrite,s.read],a?.view,i,e,o?.snapshot(null));return r.impl.register(l),l}function Hf(t,n){let e=Bi(t),i=n.elementInjector||ea();return new ro(e).create(i,n.projectableNodes,n.hostElement,n.environmentInjector,n.directives,n.bindings)}function lS(t){let n=Bi(t);if(!n)return null;let e=new ro(n);return{get selector(){return e.selector},get type(){return e.componentType},get inputs(){return e.inputs},get outputs(){return e.outputs},get ngContentSelectors(){return e.ngContentSelectors},get isStandalone(){return n.standalone},get isSignal(){return n.signals}}}var cS=null;function jn(){return cS}function K_(t){cS??=t}var uc=class{},Dr=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:()=>u(dS),providedIn:"platform"})}return t})(),Y_=new w(""),dS=(()=>{class t extends Dr{_location;_history;_doc=u(Y);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return jn().getBaseHref(this._doc)}onPopState(e){let i=jn().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",e,!1),()=>i.removeEventListener("popstate",e)}onHashChange(e){let i=jn().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",e,!1),()=>i.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,i,r){this._history.pushState(e,i,r)}replaceState(e,i,r){this._history.replaceState(e,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:()=>new t,providedIn:"platform"})}return t})();function zf(t,n){return t?n?t.endsWith("/")?n.startsWith("/")?t+n.slice(1):t+n:n.startsWith("/")?t+n:`${t}/${n}`:t:n}function uS(t){let n=t.search(/#|\?|$/);return t[n-1]==="/"?t.slice(0,n-1)+t.slice(n):t}function Ei(t){return t&&t[0]!=="?"?`?${t}`:t}var Si=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:()=>u($f),providedIn:"root"})}return t})(),Uf=new w(""),$f=(()=>{class t extends Si{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,i){super(),this._platformLocation=e,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??u(Y).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return zf(this._baseHref,e)}path(e=!1){let i=this._platformLocation.pathname+Ei(this._platformLocation.search),r=this._platformLocation.hash;return r&&e?`${i}${r}`:i}pushState(e,i,r,o){let s=this.prepareExternalUrl(r+Ei(o));this._platformLocation.pushState(e,i,s)}replaceState(e,i,r,o){let s=this.prepareExternalUrl(r+Ei(o));this._platformLocation.replaceState(e,i,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(i){return new(i||t)(A(Dr),A(Uf,8))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ki=(()=>{class t{_subject=new F;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let i=this._locationStrategy.getBaseHref();this._basePath=xP(uS(fS(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,i=""){return this.path()==this.normalize(e+Ei(i))}normalize(e){return t.stripTrailingSlash(SP(this._basePath,fS(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,i="",r=null){this._locationStrategy.pushState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Ei(i)),r)}replaceState(e,i="",r=null){this._locationStrategy.replaceState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Ei(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){this._locationStrategy.historyGo?.(e)}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",i){this._urlChangeListeners.forEach(r=>r(e,i))}subscribe(e,i,r){return this._subject.subscribe({next:e,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=Ei;static joinWithSlash=zf;static stripTrailingSlash=uS;static \u0275fac=function(i){return new(i||t)(A(Si))};static \u0275prov=C({token:t,factory:()=>EP(),providedIn:"root"})}return t})();function EP(){return new Ki(A(Si))}function SP(t,n){if(!t||!n.startsWith(t))return n;let e=n.substring(t.length);return e===""||["/",";","?","#"].includes(e[0])?e:n}function fS(t){return t.replace(/\/index.html$/,"")}function xP(t){if(new RegExp("^(https?:)?//").test(t)){let[,e]=t.split(/\/\/[^\/]+/);return e}return t}var J_=(()=>{class t extends Si{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(e,i){super(),this._platformLocation=e,i!=null&&(this._baseHref=i)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}path(e=!1){let i=this._platformLocation.hash??"#";return i.length>0?i.substring(1):i}prepareExternalUrl(e){let i=zf(this._baseHref,e);return i.length>0?"#"+i:i}pushState(e,i,r,o){let s=this.prepareExternalUrl(r+Ei(o))||this._platformLocation.pathname;this._platformLocation.pushState(e,i,s)}replaceState(e,i,r,o){let s=this.prepareExternalUrl(r+Ei(o))||this._platformLocation.pathname;this._platformLocation.replaceState(e,i,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(i){return new(i||t)(A(Dr),A(Uf,8))};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})();var ey=(function(t){return t[t.Decimal=0]="Decimal",t[t.Percent=1]="Percent",t[t.Currency=2]="Currency",t[t.Scientific=3]="Scientific",t})(ey||{});var Yi={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function _a(t,n){let e=Af(t),i=e[fs.NumberSymbols][n];if(typeof i>"u"){if(n===Yi.CurrencyDecimal)return e[fs.NumberSymbols][Yi.Decimal];if(n===Yi.CurrencyGroup)return e[fs.NumberSymbols][Yi.Group]}return i}function _S(t,n){return Af(t)[fs.NumberFormats][n]}var MP=/^(\d+)?\.((\d+)(-(\d+))?)?$/,mS=22,Gf=".",fc="0",IP=";",TP=",",Q_="#";function kP(t,n,e,i,r,o,s=!1){let a="",l=!1;if(!isFinite(t))a=_a(e,Yi.Infinity);else{let c=OP(t);s&&(c=AP(c));let d=n.minInt,p=n.minFrac,_=n.maxFrac;if(o){let $=o.match(MP);if($===null)throw new x(2306,!1);let Ee=$[1],pe=$[3],Te=$[5];Ee!=null&&(d=Z_(Ee)),pe!=null&&(p=Z_(pe)),Te!=null?_=Z_(Te):pe!=null&&p>_&&(_=p)}NP(c,p,_);let v=c.digits,y=c.integerLen,D=c.exponent,M=[];for(l=v.every($=>!$);y<d;y++)v.unshift(0);for(;y<0;y++)v.unshift(0);y>0?M=v.splice(y,v.length):(M=v,v=[0]);let R=[];for(v.length>=n.lgSize&&R.unshift(v.splice(-n.lgSize,v.length).join(""));v.length>n.gSize;)R.unshift(v.splice(-n.gSize,v.length).join(""));v.length&&R.unshift(v.join("")),a=R.join(_a(e,i)),M.length&&(a+=_a(e,r)+M.join("")),D&&(a+=_a(e,Yi.Exponential)+"+"+D)}return t<0&&!l?a=n.negPre+a+n.negSuf:a=n.posPre+a+n.posSuf,a}function yS(t,n,e){let i=_S(n,ey.Decimal),r=RP(i,_a(n,Yi.MinusSign));return kP(t,r,n,Yi.Group,Yi.Decimal,e)}function RP(t,n="-"){let e={minInt:1,minFrac:0,maxFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"",gSize:0,lgSize:0},i=t.split(IP),r=i[0],o=i[1],s=r.indexOf(Gf)!==-1?r.split(Gf):[r.substring(0,r.lastIndexOf(fc)+1),r.substring(r.lastIndexOf(fc)+1)],a=s[0],l=s[1]||"";e.posPre=a.substring(0,a.indexOf(Q_));for(let d=0;d<l.length;d++){let p=l.charAt(d);p===fc?e.minFrac=e.maxFrac=d+1:p===Q_?e.maxFrac=d+1:e.posSuf+=p}let c=a.split(TP);if(e.gSize=c[1]?c[1].length:0,e.lgSize=c[2]||c[1]?(c[2]||c[1]).length:0,o){let d=r.length-e.posPre.length-e.posSuf.length,p=o.indexOf(Q_);e.negPre=o.substring(0,p).replace(/'/g,""),e.negSuf=o.slice(p+d).replace(/'/g,"")}else e.negPre=n+e.posPre,e.negSuf=e.posSuf;return e}function AP(t){if(t.digits[0]===0)return t;let n=t.digits.length-t.integerLen;return t.exponent?t.exponent+=2:(n===0?t.digits.push(0,0):n===1&&t.digits.push(0),t.integerLen+=2),t}function OP(t){let n=Math.abs(t)+"",e=0,i,r,o,s,a;for((r=n.indexOf(Gf))>-1&&(n=n.replace(Gf,"")),(o=n.search(/e/i))>0?(r<0&&(r=o),r+=+n.slice(o+1),n=n.substring(0,o)):r<0&&(r=n.length),o=0;n.charAt(o)===fc;o++);if(o===(a=n.length))i=[0],r=1;else{for(a--;n.charAt(a)===fc;)a--;for(r-=o,i=[],s=0;o<=a;o++,s++)i[s]=Number(n.charAt(o))}return r>mS&&(i=i.splice(0,mS-1),e=r-1,r=1),{digits:i,exponent:e,integerLen:r}}function NP(t,n,e){if(n>e)throw new x(2307,!1);let i=t.digits,r=i.length-t.integerLen,o=Math.min(Math.max(n,r),e),s=o+t.integerLen,a=i[s];if(s>0){i.splice(Math.max(t.integerLen,s));for(let p=s;p<i.length;p++)i[p]=0}else{r=Math.max(0,r),t.integerLen=1,i.length=Math.max(1,s=o+1),i[0]=0;for(let p=1;p<s;p++)i[p]=0}if(a>=5)if(s-1<0){for(let p=0;p>s;p--)i.unshift(0),t.integerLen++;i.unshift(1),t.integerLen++}else i[s-1]++;for(;r<Math.max(0,o);r++)i.push(0);let l=o!==0,c=n+t.integerLen,d=i.reduceRight(function(p,_,v,y){return _=_+p,y[v]=_<10?_:_-10,l&&(y[v]===0&&v>=c?y.pop():l=!1),_>=10?1:0},0);d&&(i.unshift(d),t.integerLen++)}function Z_(t){let n=parseInt(t);if(isNaN(n))throw new x(2305,!1);return n}var X_=/\s+/,pS=[],Er=(()=>{class t{_ngEl;_renderer;initialClasses=pS;rawClass;stateMap=new Map;constructor(e,i){this._ngEl=e,this._renderer=i}set klass(e){this.initialClasses=e!=null?e.trim().split(X_):pS}set ngClass(e){this.rawClass=typeof e=="string"?e.trim().split(X_):e}ngDoCheck(){for(let i of this.initialClasses)this._updateState(i,!0);let e=this.rawClass;if(Array.isArray(e)||e instanceof Set)for(let i of e)this._updateState(i,!0);else if(e!=null)for(let i of Object.keys(e))this._updateState(i,!!e[i]);this._applyStateDiff()}_updateState(e,i){let r=this.stateMap.get(e);r!==void 0?(r.enabled!==i&&(r.changed=!0,r.enabled=i),r.touched=!0):this.stateMap.set(e,{enabled:i,changed:!0,touched:!0})}_applyStateDiff(){for(let e of this.stateMap){let i=e[0],r=e[1];r.changed?(this._toggleClass(i,r.enabled),r.changed=!1):r.touched||(r.enabled&&this._toggleClass(i,!1),this.stateMap.delete(i)),r.touched=!1}}_toggleClass(e,i){e=e.trim(),e.length>0&&e.split(X_).forEach(r=>{i?this._renderer.addClass(this._ngEl.nativeElement,r):this._renderer.removeClass(this._ngEl.nativeElement,r)})}static \u0275fac=function(i){return new(i||t)(I(z),I(Ue))};static \u0275dir=V({type:t,selectors:[["","ngClass",""]],inputs:{klass:[0,"class","klass"],ngClass:"ngClass"}})}return t})();var Wf=class{$implicit;ngForOf;index;count;constructor(n,e,i,r){this.$implicit=n,this.ngForOf=e,this.index=i,this.count=r}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},Mn=(()=>{class t{_viewContainer;_template;_differs;set ngForOf(e){this._ngForOf=e,this._ngForOfDirty=!0}set ngForTrackBy(e){this._trackByFn=e}get ngForTrackBy(){return this._trackByFn}_ngForOf=null;_ngForOfDirty=!0;_differ=null;_trackByFn;constructor(e,i,r){this._viewContainer=e,this._template=i,this._differs=r}set ngForTemplate(e){e&&(this._template=e)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let e=this._ngForOf;!this._differ&&e&&(this._differ=this._differs.find(e).create(this.ngForTrackBy))}if(this._differ){let e=this._differ.diff(this._ngForOf);e&&this._applyChanges(e)}}_applyChanges(e){let i=this._viewContainer;e.forEachOperation((r,o,s)=>{if(r.previousIndex==null)i.createEmbeddedView(this._template,new Wf(r.item,this._ngForOf,-1,-1),s===null?void 0:s);else if(s==null)i.remove(o===null?void 0:o);else if(o!==null){let a=i.get(o);i.move(a,s),hS(a,r)}});for(let r=0,o=i.length;r<o;r++){let a=i.get(r).context;a.index=r,a.count=o,a.ngForOf=this._ngForOf}e.forEachIdentityChange(r=>{let o=i.get(r.currentIndex);hS(o,r)})}static ngTemplateContextGuard(e,i){return!0}static \u0275fac=function(i){return new(i||t)(I(Nt),I(wt),I(jf))};static \u0275dir=V({type:t,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"}})}return t})();function hS(t,n){t.context.$implicit=n.item}var Lt=(()=>{class t{_viewContainer;_context=new qf;_thenTemplateRef=null;_elseTemplateRef=null;_thenViewRef=null;_elseViewRef=null;constructor(e,i){this._viewContainer=e,this._thenTemplateRef=i}set ngIf(e){this._context.$implicit=this._context.ngIf=e,this._updateView()}set ngIfThen(e){gS(e,!1),this._thenTemplateRef=e,this._thenViewRef=null,this._updateView()}set ngIfElse(e){gS(e,!1),this._elseTemplateRef=e,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngIfUseIfTypeGuard;static ngTemplateGuard_ngIf;static ngTemplateContextGuard(e,i){return!0}static \u0275fac=function(i){return new(i||t)(I(Nt),I(wt))};static \u0275dir=V({type:t,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"}})}return t})(),qf=class{$implicit=null;ngIf=null};function gS(t,n){if(t&&!t.createEmbeddedView)throw new x(2020,!1)}var co=(()=>{class t{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=u(ce);constructor(e){this._viewContainerRef=e}ngOnChanges(e){if(this._shouldRecreateView(e)){let i=this._viewContainerRef;if(this._viewRef&&i.remove(i.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let r=this._createContextForwardProxy();this._viewRef=i.createEmbeddedView(this.ngTemplateOutlet,r,{injector:this._getInjector()})}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(e){return!!e.ngTemplateOutlet||!!e.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(e,i,r)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,i,r):!1,get:(e,i,r)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,i,r)}})}static \u0275fac=function(i){return new(i||t)(I(Nt))};static \u0275dir=V({type:t,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[et]})}return t})();function PP(t,n){return new x(2100,!1)}function FP(t,n){return{key:t,value:n}}var ty=(()=>{class t{differs;constructor(e){this.differs=e}differ;keyValues=[];compareFn=vS;transform(e,i=vS){if(!e||!(e instanceof Map)&&typeof e!="object")return null;this.differ??=this.differs.find(e).create();let r=this.differ.diff(e),o=i!==this.compareFn;return r&&(this.keyValues=[],r.forEachItem(s=>{this.keyValues.push(FP(s.key,s.currentValue))})),(r||o)&&(i&&this.keyValues.sort(i),this.compareFn=i),this.keyValues}static \u0275fac=function(i){return new(i||t)(I(q_,16))};static \u0275pipe=xf({name:"keyvalue",type:t,pure:!1})}return t})();function vS(t,n){let e=t.key,i=n.key;if(e===i)return 0;if(e==null)return 1;if(i==null)return-1;if(typeof e=="string"&&typeof i=="string")return e<i?-1:1;if(typeof e=="number"&&typeof i=="number")return e-i;if(typeof e=="boolean"&&typeof i=="boolean")return e<i?-1:1;let r=String(e),o=String(i);return r==o?0:r<o?-1:1}var mc=(()=>{class t{_locale;constructor(e){this._locale=e}transform(e,i,r){if(!LP(e))return null;r||=this._locale;try{let o=BP(e);return yS(o,r,i)}catch(o){throw PP(t,o.message)}}static \u0275fac=function(i){return new(i||t)(I(lc,16))};static \u0275pipe=xf({name:"number",type:t,pure:!0})}return t})();function LP(t){return!(t==null||t===""||t!==t)}function BP(t){if(typeof t=="string"&&!isNaN(Number(t)-parseFloat(t)))return Number(t);if(typeof t!="number")throw new x(2309,!1);return t}var Ge=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({})}return t})();function pc(t,n){n=encodeURIComponent(n);for(let e of t.split(";")){let i=e.indexOf("="),[r,o]=i==-1?[e,""]:[e.slice(0,i),e.slice(i+1)];if(r.trim()===n)return decodeURIComponent(o)}return null}var ms=class{};var iy="browser";function bS(t){return t===iy}var ry=(()=>{class t{static \u0275prov=C({token:t,providedIn:"root",factory:()=>new ny(u(Y),window)})}return t})(),ny=class{document;window;offset=()=>[0,0];constructor(n,e){this.document=n,this.window=e}setOffset(n){Array.isArray(n)?this.offset=()=>n:this.offset=n}getScrollPosition(){return[this.window.scrollX,this.window.scrollY]}scrollToPosition(n,e){this.window.scrollTo(de(S({},e),{left:n[0],top:n[1]}))}scrollToAnchor(n,e){let i=VP(this.document,n);i&&(this.scrollToElement(i,e),i.focus())}setHistoryScrollRestoration(n){try{this.window.history.scrollRestoration=n}catch{console.warn(pi(2400,!1))}}scrollToElement(n,e){let i=n.getBoundingClientRect(),r=i.left+this.window.pageXOffset,o=i.top+this.window.pageYOffset,s=this.offset();this.window.scrollTo(de(S({},e),{left:r-s[0],top:o-s[1]}))}};function VP(t,n){let e=t.getElementById(n)||t.getElementsByName(n)[0];if(e)return e;if(typeof t.createTreeWalker=="function"&&t.body&&typeof t.body.attachShadow=="function"){let i=t.createTreeWalker(t.body,NodeFilter.SHOW_ELEMENT),r=i.currentNode;for(;r;){let o=r.shadowRoot;if(o){let s=o.getElementById(n)||o.querySelector(`[name="${n}"]`);if(s)return s}r=i.nextNode()}}return null}var hc=class{_doc;constructor(n){this._doc=n}manager},Kf=(()=>{class t extends hc{constructor(e){super(e)}supports(e){return!0}addEventListener(e,i,r,o){return e.addEventListener(i,r,o),()=>this.removeEventListener(e,i,r,o)}removeEventListener(e,i,r,o){return e.removeEventListener(i,r,o)}static \u0275fac=function(i){return new(i||t)(A(Y))};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})(),Zf=new w(""),ly=(()=>{class t{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,i){this._zone=i,e.forEach(s=>{s.manager=this});let r=e.filter(s=>!(s instanceof Kf));this._plugins=r.slice().reverse();let o=e.find(s=>s instanceof Kf);o&&this._plugins.push(o)}addEventListener(e,i,r,o){return this._findPluginFor(i).addEventListener(e,i,r,o)}getZone(){return this._zone}_findPluginFor(e){let i=this._eventNameToPlugin.get(e);if(i)return i;if(i=this._plugins.find(o=>o.supports(e)),!i)throw new x(5101,!1);return this._eventNameToPlugin.set(e,i),i}static \u0275fac=function(i){return new(i||t)(A(Zf),A(U))};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})(),oy="ng-app-id";function CS(t){for(let n of t)n.remove()}function wS(t,n){let e=n.createElement("style");return e.textContent=t,e}function jP(t,n,e,i){let r=t.head?.querySelectorAll(`style[${oy}="${n}"],link[${oy}="${n}"]`);if(r)for(let o of r)o.removeAttribute(oy),o instanceof HTMLLinkElement?i.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&e.set(o.textContent,{usage:0,elements:[o]})}function ay(t,n){let e=n.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",t),e}var cy=(()=>{class t{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,i,r,o={}){this.doc=e,this.appId=i,this.nonce=r,jP(e,i,this.inline,this.external),this.hosts.add(e.head)}addStyles(e,i){for(let r of e)this.addUsage(r,this.inline,wS);i?.forEach(r=>this.addUsage(r,this.external,ay))}removeStyles(e,i){for(let r of e)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(e,i,r){let o=i.get(e);o?o.usage++:i.set(e,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,r(e,this.doc)))})}removeUsage(e,i){let r=i.get(e);r&&(r.usage--,r.usage<=0&&(CS(r.elements),i.delete(e)))}ngOnDestroy(){for(let[,{elements:e}]of[...this.inline,...this.external])CS(e);this.hosts.clear()}addHost(e){this.hosts.add(e);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(e,wS(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(e,ay(i,this.doc)))}removeHost(e){this.hosts.delete(e)}addElement(e,i){return this.nonce&&i.setAttribute("nonce",this.nonce),e.appendChild(i)}static \u0275fac=function(i){return new(i||t)(A(Y),A(oo),A(us,8),A(ds))};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})(),sy={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},dy=/%COMP%/g;var ES="%COMP%",HP=`_nghost-${ES}`,zP=`_ngcontent-${ES}`,UP=!0,$P=new w("",{factory:()=>UP});function GP(t){return zP.replace(dy,t)}function WP(t){return HP.replace(dy,t)}function SS(t,n){return n.map(e=>e.replace(dy,t))}var _c=(()=>{class t{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,i,r,o,s,a,l=null,c=null){this.eventManager=e,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=o,this.doc=s,this.ngZone=a,this.nonce=l,this.tracingService=c,this.defaultRenderer=new gc(e,s,a,this.tracingService)}createRenderer(e,i){if(!e||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(e,i);return r instanceof Qf?r.applyToHost(e):r instanceof vc&&r.applyStyles(),r}getOrCreateRenderer(e,i){let r=this.rendererByCompId,o=r.get(i.id);if(!o){let s=this.doc,a=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,p=this.tracingService;switch(i.encapsulation){case Ci.Emulated:o=new Qf(l,c,i,this.appId,d,s,a,p);break;case Ci.ShadowDom:return new Yf(l,e,i,s,a,this.nonce,p,c);case Ci.ExperimentalIsolatedShadowDom:return new Yf(l,e,i,s,a,this.nonce,p);default:o=new vc(l,c,i,d,s,a,p);break}r.set(i.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(e){this.rendererByCompId.delete(e)}static \u0275fac=function(i){return new(i||t)(A(ly),A(cy),A(oo),A($P),A(Y),A(U),A(us),A(wi,8))};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})(),gc=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(n,e,i,r){this.eventManager=n,this.doc=e,this.ngZone=i,this.tracingService=r}destroy(){}destroyNode=null;createElement(n,e){return e?this.doc.createElementNS(sy[e]||e,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,e){(DS(n)?n.content:n).appendChild(e)}insertBefore(n,e,i){n&&(DS(n)?n.content:n).insertBefore(e,i)}removeChild(n,e){e.remove()}selectRootElement(n,e){let i=typeof n=="string"?this.doc.querySelector(n):n;if(!i)throw new x(-5104,!1);return e||(i.textContent=""),i}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,e,i,r){if(r){e=r+":"+e;let o=sy[r];o?n.setAttributeNS(o,e,i):n.setAttribute(e,i)}else n.setAttribute(e,i)}removeAttribute(n,e,i){if(i){let r=sy[i];r?n.removeAttributeNS(r,e):n.removeAttribute(`${i}:${e}`)}else n.removeAttribute(e)}addClass(n,e){n.classList.add(e)}removeClass(n,e){n.classList.remove(e)}setStyle(n,e,i,r){r&(Ui.DashCase|Ui.Important)?n.style.setProperty(e,i,r&Ui.Important?"important":""):n.style[e]=i}removeStyle(n,e,i){i&Ui.DashCase?n.style.removeProperty(e):n.style[e]=""}setProperty(n,e,i){n!=null&&(n[e]=i)}setValue(n,e){n.nodeValue=e}listen(n,e,i,r){if(typeof n=="string"&&(n=jn().getGlobalEventTarget(this.doc,n),!n))throw new x(5102,!1);let o=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(n,e,o)),this.eventManager.addEventListener(n,e,o,r)}decoratePreventDefault(n){return e=>{if(e==="__ngUnwrap__")return n;n(e)===!1&&e.preventDefault()}}};function DS(t){return t.tagName==="TEMPLATE"&&t.content!==void 0}var Yf=class extends gc{hostEl;sharedStylesHost;shadowRoot;constructor(n,e,i,r,o,s,a,l){super(n,r,o,a),this.hostEl=e,this.sharedStylesHost=l,this.shadowRoot=e.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let c=i.styles;c=SS(i.id,c);for(let p of c){let _=document.createElement("style");s&&_.setAttribute("nonce",s),_.textContent=p,this.shadowRoot.appendChild(_)}let d=i.getExternalStyles?.();if(d)for(let p of d){let _=ay(p,r);s&&_.setAttribute("nonce",s),this.shadowRoot.appendChild(_)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,e){return super.appendChild(this.nodeOrShadowRoot(n),e)}insertBefore(n,e,i){return super.insertBefore(this.nodeOrShadowRoot(n),e,i)}removeChild(n,e){return super.removeChild(null,e)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},vc=class extends gc{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(n,e,i,r,o,s,a,l){super(n,o,s,a),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=r;let c=i.styles;this.styles=l?SS(l,c):c,this.styleUrls=i.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&ls.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Qf=class extends vc{contentAttr;hostAttr;constructor(n,e,i,r,o,s,a,l){let c=r+"-"+i.id;super(n,e,i,o,s,a,l,c),this.contentAttr=GP(c),this.hostAttr=WP(c)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,e){let i=super.createElement(n,e);return super.setAttribute(i,this.contentAttr,""),i}};var Xf=class t extends uc{supportsDOMEvents=!0;static makeCurrent(){K_(new t)}onAndCancel(n,e,i,r){return n.addEventListener(e,i,r),()=>{n.removeEventListener(e,i,r)}}dispatchEvent(n,e){n.dispatchEvent(e)}remove(n){n.remove()}createElement(n,e){return e=e||this.getDefaultDocument(),e.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,e){return e==="window"?window:e==="document"?n:e==="body"?n.body:null}getBaseHref(n){let e=qP();return e==null?null:KP(e)}resetBaseElement(){yc=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return pc(document.cookie,n)}},yc=null;function qP(){return yc=yc||document.head.querySelector("base"),yc?yc.getAttribute("href"):null}function KP(t){return new URL(t,document.baseURI).pathname}var Jf=class{addToWindow(n){kt.getAngularTestability=(i,r=!0)=>{let o=n.findTestabilityInTree(i,r);if(o==null)throw new x(5103,!1);return o},kt.getAllAngularTestabilities=()=>n.getAllTestabilities(),kt.getAllAngularRootElements=()=>n.getAllRootElements();let e=i=>{let r=kt.getAllAngularTestabilities(),o=r.length,s=function(){o--,o==0&&i()};r.forEach(a=>{a.whenStable(s)})};kt.frameworkStabilizers||(kt.frameworkStabilizers=[]),kt.frameworkStabilizers.push(e)}findTestabilityInTree(n,e,i){if(e==null)return null;let r=n.getTestability(e);return r??(i?jn().isShadowRoot(e)?this.findTestabilityInTree(n,e.host,!0):this.findTestabilityInTree(n,e.parentElement,!0):null)}},YP=(()=>{class t{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})(),xS=["alt","control","meta","shift"],QP={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},ZP={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey},MS=(()=>{class t extends hc{constructor(e){super(e)}supports(e){return t.parseEventName(e)!=null}addEventListener(e,i,r,o){let s=t.parseEventName(i),a=t.eventCallback(s.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>jn().onAndCancel(e,s.domEventName,a,o))}static parseEventName(e){let i=e.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let o=t._normalizeKey(i.pop()),s="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),s="code."),xS.forEach(c=>{let d=i.indexOf(c);d>-1&&(i.splice(d,1),s+=c+".")}),s+=o,i.length!=0||o.length===0)return null;let l={};return l.domEventName=r,l.fullKey=s,l}static matchEventFullKeyCode(e,i){let r=QP[e.key]||e.key,o="";return i.indexOf("code.")>-1&&(r=e.code,o="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),xS.forEach(s=>{if(s!==r){let a=ZP[s];a(e)&&(o+=s+".")}}),o+=r,o===i)}static eventCallback(e,i,r){return o=>{t.matchEventFullKeyCode(o,e)&&r.runGuarded(()=>i(o))}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(i){return new(i||t)(A(Y))};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})();async function uy(t,n,e){let i=S({rootComponent:t},XP(n,e));return oS(i)}function XP(t,n){return{platformRef:n?.platformRef,appProviders:[...IS,...t?.providers??[]],platformProviders:nF}}function JP(){Xf.makeCurrent()}function eF(){return new vn}function tF(){return $v(document),document}var nF=[{provide:ds,useValue:iy},{provide:df,useValue:JP,multi:!0},{provide:Y,useFactory:tF}];var iF=[{provide:kf,useClass:Jf},{provide:Tf,useClass:Jl},{provide:Jl,useClass:Jl}],IS=[{provide:Il,useValue:"root"},{provide:vn,useFactory:eF},{provide:Zf,useClass:Kf,multi:!0},{provide:Zf,useClass:MS,multi:!0},_c,cy,ly,{provide:ct,useExisting:_c},{provide:ms,useClass:YP},[]],fy=(()=>{class t{constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({providers:[...IS,...iF],imports:[Ge,rS]})}return t})();var uo=class t{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(n){n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(e=>{let i=e.indexOf(":");if(i>0){let r=e.slice(0,i),o=e.slice(i+1).trim();this.addHeaderEntry(r,o)}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((e,i)=>{this.addHeaderEntry(i,e)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([e,i])=>{this.setHeaderEntries(e,i)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let e=this.headers.get(n.toLowerCase());return e&&e.length>0?e[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,e){return this.clone({name:n,value:e,op:"a"})}set(n,e){return this.clone({name:n,value:e,op:"s"})}delete(n,e){return this.clone({name:n,value:e,op:"d"})}maybeSetNormalizedName(n,e){this.normalizedNames.has(e)||this.normalizedNames.set(e,n)}init(){this.lazyInit&&(this.lazyInit instanceof t?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init(),Array.from(n.headers.keys()).forEach(e=>{this.headers.set(e,n.headers.get(e)),this.normalizedNames.set(e,n.normalizedNames.get(e))})}clone(n){let e=new t;return e.lazyInit=this.lazyInit&&this.lazyInit instanceof t?this.lazyInit:this,e.lazyUpdate=(this.lazyUpdate||[]).concat([n]),e}applyUpdate(n){let e=n.name.toLowerCase();switch(n.op){case"a":case"s":let i=n.value;if(typeof i=="string"&&(i=[i]),i.length===0)return;this.maybeSetNormalizedName(n.name,e);let r=(n.op==="a"?this.headers.get(e):void 0)||[];r.push(...i),this.headers.set(e,r);break;case"d":let o=n.value;if(!o)this.headers.delete(e),this.normalizedNames.delete(e);else{let s=this.headers.get(e);if(!s)return;s=s.filter(a=>o.indexOf(a)===-1),s.length===0?(this.headers.delete(e),this.normalizedNames.delete(e)):this.headers.set(e,s)}break}}addHeaderEntry(n,e){let i=n.toLowerCase();this.maybeSetNormalizedName(n,i),this.headers.has(i)?this.headers.get(i).push(e):this.headers.set(i,[e])}setHeaderEntries(n,e){let i=(Array.isArray(e)?e:[e]).map(o=>o.toString()),r=n.toLowerCase();this.headers.set(r,i),this.maybeSetNormalizedName(n,r)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(e=>n(this.normalizedNames.get(e),this.headers.get(e)))}};var tm=class{map=new Map;set(n,e){return this.map.set(n,e),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}},nm=class{encodeKey(n){return TS(n)}encodeValue(n){return TS(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function rF(t,n){let e=new Map;return t.length>0&&t.replace(/^\?/,"").split("&").forEach(r=>{let o=r.indexOf("="),[s,a]=o==-1?[n.decodeKey(r),""]:[n.decodeKey(r.slice(0,o)),n.decodeValue(r.slice(o+1))],l=e.get(s)||[];l.push(a),e.set(s,l)}),e}var oF=/%(\d[a-f0-9])/gi,sF={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function TS(t){return encodeURIComponent(t).replace(oF,(n,e)=>sF[e]??n)}function em(t){return`${t}`}var Sr=class t{map;encoder;updates=null;cloneFrom=null;constructor(n={}){if(this.encoder=n.encoder||new nm,n.fromString){if(n.fromObject)throw new x(2805,!1);this.map=rF(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(e=>{let i=n.fromObject[e],r=Array.isArray(i)?i.map(em):[em(i)];this.map.set(e,r)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();let e=this.map.get(n);return e?e[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,e){return this.clone({param:n,value:e,op:"a"})}appendAll(n){let e=[];return Object.keys(n).forEach(i=>{let r=n[i];Array.isArray(r)?r.forEach(o=>{e.push({param:i,value:o,op:"a"})}):e.push({param:i,value:r,op:"a"})}),this.clone(e)}set(n,e){return this.clone({param:n,value:e,op:"s"})}delete(n,e){return this.clone({param:n,value:e,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let e=this.encoder.encodeKey(n);return this.map.get(n).map(i=>e+"="+this.encoder.encodeValue(i)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let e=new t({encoder:this.encoder});return e.cloneFrom=this.cloneFrom||this,e.updates=(this.updates||[]).concat(n),e}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(n=>this.map.set(n,this.cloneFrom.map.get(n))),this.updates.forEach(n=>{switch(n.op){case"a":case"s":let e=(n.op==="a"?this.map.get(n.param):void 0)||[];e.push(em(n.value)),this.map.set(n.param,e);break;case"d":if(n.value!==void 0){let i=this.map.get(n.param)||[],r=i.indexOf(em(n.value));r!==-1&&i.splice(r,1),i.length>0?this.map.set(n.param,i):this.map.delete(n.param)}else{this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null)}};function aF(t){switch(t){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function kS(t){return typeof ArrayBuffer<"u"&&t instanceof ArrayBuffer}function RS(t){return typeof Blob<"u"&&t instanceof Blob}function AS(t){return typeof FormData<"u"&&t instanceof FormData}function lF(t){return typeof URLSearchParams<"u"&&t instanceof URLSearchParams}var OS="Content-Type",NS="Accept",FS="text/plain",LS="application/json",cF=`${LS}, ${FS}, */*`,ya=class t{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(n,e,i,r){this.url=e,this.method=n.toUpperCase();let o;if(aF(this.method)||r?(this.body=i!==void 0?i:null,o=r):o=i,o){if(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,this.keepalive=!!o.keepalive,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),o.priority&&(this.priority=o.priority),o.cache&&(this.cache=o.cache),o.credentials&&(this.credentials=o.credentials),typeof o.timeout=="number"){if(o.timeout<1||!Number.isInteger(o.timeout))throw new x(2822,"");this.timeout=o.timeout}o.mode&&(this.mode=o.mode),o.redirect&&(this.redirect=o.redirect),o.integrity&&(this.integrity=o.integrity),o.referrer&&(this.referrer=o.referrer),o.referrerPolicy&&(this.referrerPolicy=o.referrerPolicy),this.transferCache=o.transferCache}if(this.headers??=new uo,this.context??=new tm,!this.params)this.params=new Sr,this.urlWithParams=e;else{let s=this.params.toString();if(s.length===0)this.urlWithParams=e;else{let a=e.indexOf("?"),l=a===-1?"?":a<e.length-1?"&":"";this.urlWithParams=e+l+s}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||kS(this.body)||RS(this.body)||AS(this.body)||lF(this.body)?this.body:this.body instanceof Sr?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||AS(this.body)?null:RS(this.body)?this.body.type||null:kS(this.body)?null:typeof this.body=="string"?FS:this.body instanceof Sr?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?LS:null}clone(n={}){let e=n.method||this.method,i=n.url||this.url,r=n.responseType||this.responseType,o=n.keepalive??this.keepalive,s=n.priority||this.priority,a=n.cache||this.cache,l=n.mode||this.mode,c=n.redirect||this.redirect,d=n.credentials||this.credentials,p=n.referrer||this.referrer,_=n.integrity||this.integrity,v=n.referrerPolicy||this.referrerPolicy,y=n.transferCache??this.transferCache,D=n.timeout??this.timeout,M=n.body!==void 0?n.body:this.body,R=n.withCredentials??this.withCredentials,$=n.reportProgress??this.reportProgress,Ee=n.headers||this.headers,pe=n.params||this.params,Te=n.context??this.context;return n.setHeaders!==void 0&&(Ee=Object.keys(n.setHeaders).reduce((Xe,Me)=>Xe.set(Me,n.setHeaders[Me]),Ee)),n.setParams&&(pe=Object.keys(n.setParams).reduce((Xe,Me)=>Xe.set(Me,n.setParams[Me]),pe)),new t(e,i,M,{params:pe,headers:Ee,context:Te,reportProgress:$,responseType:r,withCredentials:R,transferCache:y,keepalive:o,cache:a,priority:s,timeout:D,mode:l,redirect:c,credentials:d,referrer:p,integrity:_,referrerPolicy:v})}},ps=(function(t){return t[t.Sent=0]="Sent",t[t.UploadProgress=1]="UploadProgress",t[t.ResponseHeader=2]="ResponseHeader",t[t.DownloadProgress=3]="DownloadProgress",t[t.Response=4]="Response",t[t.User=5]="User",t})(ps||{}),Ca=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(n,e=200,i="OK"){this.headers=n.headers||new uo,this.status=n.status!==void 0?n.status:e,this.statusText=n.statusText||i,this.url=n.url||null,this.redirected=n.redirected,this.responseType=n.responseType,this.ok=this.status>=200&&this.status<300}},im=class t extends Ca{constructor(n={}){super(n)}type=ps.ResponseHeader;clone(n={}){return new t({headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},bc=class t extends Ca{body;constructor(n={}){super(n),this.body=n.body!==void 0?n.body:null}type=ps.Response;clone(n={}){return new t({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0,redirected:n.redirected??this.redirected,responseType:n.responseType??this.responseType})}},ba=class extends Ca{name="HttpErrorResponse";message;error;ok=!1;constructor(n){super(n,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${n.url||"(unknown url)"}`:this.message=`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null}},dF=200,uF=204;var fF=new w("");var mF=/^\)\]\}',?\n/;var py=(()=>{class t{xhrFactory;tracingService=u(wi,{optional:!0});constructor(e){this.xhrFactory=e}maybePropagateTrace(e){return this.tracingService?.propagate?this.tracingService.propagate(e):e}handle(e){if(e.method==="JSONP")throw new x(-2800,!1);let i=this.xhrFactory;return Q(null).pipe(Ct(()=>new ye(o=>{let s=i.build();if(s.open(e.method,e.urlWithParams),e.withCredentials&&(s.withCredentials=!0),e.headers.forEach((M,R)=>s.setRequestHeader(M,R.join(","))),e.headers.has(NS)||s.setRequestHeader(NS,cF),!e.headers.has(OS)){let M=e.detectContentTypeHeader();M!==null&&s.setRequestHeader(OS,M)}if(e.timeout&&(s.timeout=e.timeout),e.responseType){let M=e.responseType.toLowerCase();s.responseType=M!=="json"?M:"text"}let a=e.serializeBody(),l=null,c=()=>{if(l!==null)return l;let M=s.statusText||"OK",R=new uo(s.getAllResponseHeaders()),$=s.responseURL||e.url;return l=new im({headers:R,status:s.status,statusText:M,url:$}),l},d=this.maybePropagateTrace(()=>{let{headers:M,status:R,statusText:$,url:Ee}=c(),pe=null;R!==uF&&(pe=typeof s.response>"u"?s.responseText:s.response),R===0&&(R=pe?dF:0);let Te=R>=200&&R<300;if(e.responseType==="json"&&typeof pe=="string"){let Xe=pe;pe=pe.replace(mF,"");try{pe=pe!==""?JSON.parse(pe):null}catch(Me){pe=Xe,Te&&(Te=!1,pe={error:Me,text:pe})}}Te?(o.next(new bc({body:pe,headers:M,status:R,statusText:$,url:Ee||void 0})),o.complete()):o.error(new ba({error:pe,headers:M,status:R,statusText:$,url:Ee||void 0}))}),p=this.maybePropagateTrace(M=>{let{url:R}=c(),$=new ba({error:M,status:s.status||0,statusText:s.statusText||"Unknown Error",url:R||void 0});o.error($)}),_=p;e.timeout&&(_=this.maybePropagateTrace(M=>{let{url:R}=c(),$=new ba({error:new DOMException("Request timed out","TimeoutError"),status:s.status||0,statusText:s.statusText||"Request timeout",url:R||void 0});o.error($)}));let v=!1,y=this.maybePropagateTrace(M=>{v||(o.next(c()),v=!0);let R={type:ps.DownloadProgress,loaded:M.loaded};M.lengthComputable&&(R.total=M.total),e.responseType==="text"&&s.responseText&&(R.partialText=s.responseText),o.next(R)}),D=this.maybePropagateTrace(M=>{let R={type:ps.UploadProgress,loaded:M.loaded};M.lengthComputable&&(R.total=M.total),o.next(R)});return s.addEventListener("load",d),s.addEventListener("error",p),s.addEventListener("timeout",_),s.addEventListener("abort",p),e.reportProgress&&(s.addEventListener("progress",y),a!==null&&s.upload&&s.upload.addEventListener("progress",D)),s.send(a),o.next({type:ps.Sent}),()=>{s.removeEventListener("error",p),s.removeEventListener("abort",p),s.removeEventListener("load",d),s.removeEventListener("timeout",_),e.reportProgress&&(s.removeEventListener("progress",y),a!==null&&s.upload&&s.upload.removeEventListener("progress",D)),s.readyState!==s.DONE&&s.abort()}})))}static \u0275fac=function(i){return new(i||t)(A(ms))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function BS(t,n){return n(t)}function pF(t,n){return(e,i)=>n.intercept(e,{handle:r=>t(r,i)})}function hF(t,n,e){return(i,r)=>Rt(e,()=>n(i,o=>t(o,r)))}var om=new w(""),hy=new w("",{factory:()=>[]}),VS=new w(""),gy=new w("",{factory:()=>!0});function gF(){let t=null;return(n,e)=>{t===null&&(t=(u(om,{optional:!0})??[]).reduceRight(pF,BS));let i=u(aa);if(u(gy)){let o=i.add();return t(n,e).pipe(Wr(o))}else return t(n,e)}}var vy=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=A(py),r},providedIn:"root"})}return t})();var rm=(()=>{class t{backend;injector;chain=null;pendingTasks=u(aa);contributeToStability=u(gy);constructor(e,i){this.backend=e,this.injector=i}handle(e){if(this.chain===null){let i=Array.from(new Set([...this.injector.get(hy),...this.injector.get(VS,[])]));this.chain=i.reduceRight((r,o)=>hF(r,o,this.injector),BS)}if(this.contributeToStability){let i=this.pendingTasks.add();return this.chain(e,r=>this.backend.handle(r)).pipe(Wr(i))}else return this.chain(e,i=>this.backend.handle(i))}static \u0275fac=function(i){return new(i||t)(A(vy),A(Ve))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),_y=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=A(rm),r},providedIn:"root"})}return t})();function my(t,n){return{body:n,headers:t.headers,context:t.context,observe:t.observe,params:t.params,reportProgress:t.reportProgress,responseType:t.responseType,withCredentials:t.withCredentials,credentials:t.credentials,transferCache:t.transferCache,timeout:t.timeout,keepalive:t.keepalive,priority:t.priority,cache:t.cache,mode:t.mode,redirect:t.redirect,integrity:t.integrity,referrer:t.referrer,referrerPolicy:t.referrerPolicy}}var ut=(()=>{class t{handler;constructor(e){this.handler=e}request(e,i,r={}){let o;if(e instanceof ya)o=e;else{let l;r.headers instanceof uo?l=r.headers:l=new uo(r.headers);let c;r.params&&(r.params instanceof Sr?c=r.params:c=new Sr({fromObject:r.params})),o=new ya(e,i,r.body!==void 0?r.body:null,{headers:l,context:r.context,params:c,reportProgress:r.reportProgress,responseType:r.responseType||"json",withCredentials:r.withCredentials,transferCache:r.transferCache,keepalive:r.keepalive,priority:r.priority,cache:r.cache,mode:r.mode,redirect:r.redirect,credentials:r.credentials,referrer:r.referrer,referrerPolicy:r.referrerPolicy,integrity:r.integrity,timeout:r.timeout})}let s=Q(o).pipe(Gr(l=>this.handler.handle(l)));if(e instanceof ya||r.observe==="events")return s;let a=s.pipe(We(l=>l instanceof bc));switch(r.observe||"body"){case"body":switch(o.responseType){case"arraybuffer":return a.pipe(ue(l=>{if(l.body!==null&&!(l.body instanceof ArrayBuffer))throw new x(2806,!1);return l.body}));case"blob":return a.pipe(ue(l=>{if(l.body!==null&&!(l.body instanceof Blob))throw new x(2807,!1);return l.body}));case"text":return a.pipe(ue(l=>{if(l.body!==null&&typeof l.body!="string")throw new x(2808,!1);return l.body}));default:return a.pipe(ue(l=>l.body))}case"response":return a;default:throw new x(2809,!1)}}delete(e,i={}){return this.request("DELETE",e,i)}get(e,i={}){return this.request("GET",e,i)}head(e,i={}){return this.request("HEAD",e,i)}jsonp(e,i){return this.request("JSONP",e,{params:new Sr().append(i,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(e,i={}){return this.request("OPTIONS",e,i)}patch(e,i,r={}){return this.request("PATCH",e,my(r,i))}post(e,i,r={}){return this.request("POST",e,my(r,i))}put(e,i,r={}){return this.request("PUT",e,my(r,i))}static \u0275fac=function(i){return new(i||t)(A(_y))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var vF=new w("",{factory:()=>!0}),_F="XSRF-TOKEN",yF=new w("",{factory:()=>_F}),bF="X-XSRF-TOKEN",CF=new w("",{factory:()=>bF}),wF=(()=>{class t{cookieName=u(yF);doc=u(Y);lastCookieString="";lastToken=null;parseCount=0;getToken(){let e=this.doc.cookie||"";return e!==this.lastCookieString&&(this.parseCount++,this.lastToken=pc(e,this.cookieName),this.lastCookieString=e),this.lastToken}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),jS=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=A(wF),r},providedIn:"root"})}return t})();function DF(t,n){if(!u(vF)||t.method==="GET"||t.method==="HEAD")return n(t);try{let r=u(Dr).href,{origin:o}=new URL(r),{origin:s}=new URL(t.url,o);if(o!==s)return n(t)}catch{return n(t)}let e=u(jS).getToken(),i=u(CF);return e!=null&&!t.headers.has(i)&&(t=t.clone({headers:t.headers.set(i,e)})),n(t)}var yy=(function(t){return t[t.Interceptors=0]="Interceptors",t[t.LegacyInterceptors=1]="LegacyInterceptors",t[t.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",t[t.NoXsrfProtection=3]="NoXsrfProtection",t[t.JsonpSupport=4]="JsonpSupport",t[t.RequestsMadeViaParent=5]="RequestsMadeViaParent",t[t.Fetch=6]="Fetch",t})(yy||{});function EF(t,n){return{\u0275kind:t,\u0275providers:n}}function HS(...t){let n=[ut,rm,{provide:_y,useExisting:rm},{provide:vy,useFactory:()=>u(fF,{optional:!0})??u(py)},{provide:hy,useValue:DF,multi:!0}];for(let e of t)n.push(...e.\u0275providers);return Zr(n)}var PS=new w("");function zS(){return EF(yy.LegacyInterceptors,[{provide:PS,useFactory:gF},{provide:hy,useExisting:PS,multi:!0}])}var by=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({providers:[HS(zS())]})}return t})();var US=(()=>{class t{_doc;constructor(e){this._doc=e}getTitle(){return this._doc.title}setTitle(e){this._doc.title=e||""}static \u0275fac=function(i){return new(i||t)(A(Y))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Cc=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=A(SF),r},providedIn:"root"})}return t})(),SF=(()=>{class t extends Cc{_doc;constructor(e){super(),this._doc=e}sanitize(e,i){if(i==null)return null;switch(e){case Ot.NONE:return i;case Ot.HTML:return br(i,"HTML")?ei(i):Zv(this._doc,String(i)).toString();case Ot.STYLE:return br(i,"Style")?ei(i):i;case Ot.SCRIPT:if(br(i,"Script"))return ei(i);throw new x(5200,!1);case Ot.URL:return br(i,"URL")?ei(i):ql(String(i));case Ot.RESOURCE_URL:if(br(i,"ResourceURL"))return ei(i);throw new x(5201,!1);default:throw new x(5202,!1)}}bypassSecurityTrustHtml(e){return Wv(e)}bypassSecurityTrustStyle(e){return qv(e)}bypassSecurityTrustScript(e){return Kv(e)}bypassSecurityTrustUrl(e){return Yv(e)}bypassSecurityTrustResourceUrl(e){return Qv(e)}static \u0275fac=function(i){return new(i||t)(A(Y))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ve="primary",Oc=Symbol("RouteTitle"),Sy=class{params;constructor(n){this.params=n||{}}has(n){return Object.prototype.hasOwnProperty.call(this.params,n)}get(n){if(this.has(n)){let e=this.params[n];return Array.isArray(e)?e[0]:e}return null}getAll(n){if(this.has(n)){let e=this.params[n];return Array.isArray(e)?e:[e]}return[]}get keys(){return Object.keys(this.params)}};function gs(t){return new Sy(t)}function Cy(t,n,e){for(let i=0;i<t.length;i++){let r=t[i],o=n[i];if(r[0]===":")e[r.substring(1)]=o;else if(r!==o.path)return!1}return!0}function XS(t,n,e){let i=e.path.split("/"),r=i.indexOf("**");if(r===-1){if(i.length>t.length||e.pathMatch==="full"&&(n.hasChildren()||i.length<t.length))return null;let l={},c=t.slice(0,i.length);return Cy(i,c,l)?{consumed:c,posParams:l}:null}if(r!==i.lastIndexOf("**"))return null;let o=i.slice(0,r),s=i.slice(r+1);if(o.length+s.length>t.length||e.pathMatch==="full"&&n.hasChildren()&&e.path!=="**")return null;let a={};return!Cy(o,t.slice(0,o.length),a)||!Cy(s,t.slice(t.length-s.length),a)?null:{consumed:t,posParams:a}}function um(t){return new Promise((n,e)=>{t.pipe(ur()).subscribe({next:i=>n(i),error:i=>e(i)})})}function xF(t,n){if(t.length!==n.length)return!1;for(let e=0;e<t.length;++e)if(!Xi(t[e],n[e]))return!1;return!0}function Xi(t,n){let e=t?xy(t):void 0,i=n?xy(n):void 0;if(!e||!i||e.length!=i.length)return!1;let r;for(let o=0;o<e.length;o++)if(r=e[o],!JS(t[r],n[r]))return!1;return!0}function xy(t){return[...Object.keys(t),...Object.getOwnPropertySymbols(t)]}function JS(t,n){if(Array.isArray(t)&&Array.isArray(n)){if(t.length!==n.length)return!1;let e=[...t].sort(),i=[...n].sort();return e.every((r,o)=>i[o]===r)}else return t===n}function MF(t){return t.length>0?t[t.length-1]:null}function _s(t){return pl(t)?t:ao(t)?Qe(Promise.resolve(t)):Q(t)}function ex(t){return pl(t)?um(t):Promise.resolve(t)}var IF={exact:ix,subset:rx},tx={exact:TF,subset:kF,ignored:()=>!0},nx={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},My={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function GS(t,n,e){return IF[e.paths](t.root,n.root,e.matrixParams)&&tx[e.queryParams](t.queryParams,n.queryParams)&&!(e.fragment==="exact"&&t.fragment!==n.fragment)}function TF(t,n){return Xi(t,n)}function ix(t,n,e){if(!hs(t.segments,n.segments)||!lm(t.segments,n.segments,e)||t.numberOfChildren!==n.numberOfChildren)return!1;for(let i in n.children)if(!t.children[i]||!ix(t.children[i],n.children[i],e))return!1;return!0}function kF(t,n){return Object.keys(n).length<=Object.keys(t).length&&Object.keys(n).every(e=>JS(t[e],n[e]))}function rx(t,n,e){return ox(t,n,n.segments,e)}function ox(t,n,e,i){if(t.segments.length>e.length){let r=t.segments.slice(0,e.length);return!(!hs(r,e)||n.hasChildren()||!lm(r,e,i))}else if(t.segments.length===e.length){if(!hs(t.segments,e)||!lm(t.segments,e,i))return!1;for(let r in n.children)if(!t.children[r]||!rx(t.children[r],n.children[r],i))return!1;return!0}else{let r=e.slice(0,t.segments.length),o=e.slice(t.segments.length);return!hs(t.segments,r)||!lm(t.segments,r,i)||!t.children[ve]?!1:ox(t.children[ve],n,o,i)}}function lm(t,n,e){return n.every((i,r)=>tx[e](t[r].parameters,i.parameters))}var zn=class{root;queryParams;fragment;_queryParamMap;constructor(n=new Le([],{}),e={},i=null){this.root=n,this.queryParams=e,this.fragment=i}get queryParamMap(){return this._queryParamMap??=gs(this.queryParams),this._queryParamMap}toString(){return OF.serialize(this)}},Le=class{segments;children;parent=null;constructor(n,e){this.segments=n,this.children=e,Object.values(e).forEach(i=>i.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return cm(this)}},fo=class{path;parameters;_parameterMap;constructor(n,e){this.path=n,this.parameters=e}get parameterMap(){return this._parameterMap??=gs(this.parameters),this._parameterMap}toString(){return ax(this)}};function RF(t,n){return hs(t,n)&&t.every((e,i)=>Xi(e.parameters,n[i].parameters))}function hs(t,n){return t.length!==n.length?!1:t.every((e,i)=>e.path===n[i].path)}function AF(t,n){let e=[];return Object.entries(t.children).forEach(([i,r])=>{i===ve&&(e=e.concat(n(r,i)))}),Object.entries(t.children).forEach(([i,r])=>{i!==ve&&(e=e.concat(n(r,i)))}),e}var ho=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:()=>new Mr,providedIn:"root"})}return t})(),Mr=class{parse(n){let e=new Ty(n);return new zn(e.parseRootSegment(),e.parseQueryParams(),e.parseFragment())}serialize(n){let e=`/${wc(n.root,!0)}`,i=FF(n.queryParams),r=typeof n.fragment=="string"?`#${NF(n.fragment)}`:"";return`${e}${i}${r}`}},OF=new Mr;function cm(t){return t.segments.map(n=>ax(n)).join("/")}function wc(t,n){if(!t.hasChildren())return cm(t);if(n){let e=t.children[ve]?wc(t.children[ve],!1):"",i=[];return Object.entries(t.children).forEach(([r,o])=>{r!==ve&&i.push(`${r}:${wc(o,!1)}`)}),i.length>0?`${e}(${i.join("//")})`:e}else{let e=AF(t,(i,r)=>r===ve?[wc(t.children[ve],!1)]:[`${r}:${wc(i,!1)}`]);return Object.keys(t.children).length===1&&t.children[ve]!=null?`${cm(t)}/${e[0]}`:`${cm(t)}/(${e.join("//")})`}}function sx(t){return encodeURIComponent(t).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function sm(t){return sx(t).replace(/%3B/gi,";")}function NF(t){return encodeURI(t)}function Iy(t){return sx(t).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function dm(t){return decodeURIComponent(t)}function WS(t){return dm(t.replace(/\+/g,"%20"))}function ax(t){return`${Iy(t.path)}${PF(t.parameters)}`}function PF(t){return Object.entries(t).map(([n,e])=>`;${Iy(n)}=${Iy(e)}`).join("")}function FF(t){let n=Object.entries(t).map(([e,i])=>Array.isArray(i)?i.map(r=>`${sm(e)}=${sm(r)}`).join("&"):`${sm(e)}=${sm(i)}`).filter(e=>e);return n.length?`?${n.join("&")}`:""}var LF=/^[^\/()?;#]+/;function wy(t){let n=t.match(LF);return n?n[0]:""}var BF=/^[^\/()?;=#]+/;function VF(t){let n=t.match(BF);return n?n[0]:""}var jF=/^[^=?&#]+/;function HF(t){let n=t.match(jF);return n?n[0]:""}var zF=/^[^&#]+/;function UF(t){let n=t.match(zF);return n?n[0]:""}var Ty=class{url;remaining;constructor(n){this.url=n,this.remaining=n}parseRootSegment(){for(;this.consumeOptional("/"););return this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new Le([],{}):new Le([],this.parseChildren())}parseQueryParams(){let n={};if(this.consumeOptional("?"))do this.parseQueryParam(n);while(this.consumeOptional("&"));return n}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(n=0){if(n>50)throw new x(4010,!1);if(this.remaining==="")return{};this.consumeOptional("/");let e=[];for(this.peekStartsWith("(")||e.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),e.push(this.parseSegment());let i={};this.peekStartsWith("/(")&&(this.capture("/"),i=this.parseParens(!0,n));let r={};return this.peekStartsWith("(")&&(r=this.parseParens(!1,n)),(e.length>0||Object.keys(i).length>0)&&(r[ve]=new Le(e,i)),r}parseSegment(){let n=wy(this.remaining);if(n===""&&this.peekStartsWith(";"))throw new x(4009,!1);return this.capture(n),new fo(dm(n),this.parseMatrixParams())}parseMatrixParams(){let n={};for(;this.consumeOptional(";");)this.parseParam(n);return n}parseParam(n){let e=VF(this.remaining);if(!e)return;this.capture(e);let i="";if(this.consumeOptional("=")){let r=wy(this.remaining);r&&(i=r,this.capture(i))}n[dm(e)]=dm(i)}parseQueryParam(n){let e=HF(this.remaining);if(!e)return;this.capture(e);let i="";if(this.consumeOptional("=")){let s=UF(this.remaining);s&&(i=s,this.capture(i))}let r=WS(e),o=WS(i);if(n.hasOwnProperty(r)){let s=n[r];Array.isArray(s)||(s=[s],n[r]=s),s.push(o)}else n[r]=o}parseParens(n,e){let i={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let r=wy(this.remaining),o=this.remaining[r.length];if(o!=="/"&&o!==")"&&o!==";")throw new x(4010,!1);let s;r.indexOf(":")>-1?(s=r.slice(0,r.indexOf(":")),this.capture(s),this.capture(":")):n&&(s=ve);let a=this.parseChildren(e+1);i[s??ve]=Object.keys(a).length===1&&a[ve]?a[ve]:new Le([],a),this.consumeOptional("//")}return i}peekStartsWith(n){return this.remaining.startsWith(n)}consumeOptional(n){return this.peekStartsWith(n)?(this.remaining=this.remaining.substring(n.length),!0):!1}capture(n){if(!this.consumeOptional(n))throw new x(4011,!1)}};function lx(t){return t.segments.length>0?new Le([],{[ve]:t}):t}function cx(t){let n={};for(let[i,r]of Object.entries(t.children)){let o=cx(r);if(i===ve&&o.segments.length===0&&o.hasChildren())for(let[s,a]of Object.entries(o.children))n[s]=a;else(o.segments.length>0||o.hasChildren())&&(n[i]=o)}let e=new Le(t.segments,n);return $F(e)}function $F(t){if(t.numberOfChildren===1&&t.children[ve]){let n=t.children[ve];return new Le(t.segments.concat(n.segments),n.children)}return t}function mo(t){return t instanceof zn}function dx(t,n,e=null,i=null,r=new Mr){let o=ux(t);return fx(o,n,e,i,r)}function ux(t){let n;function e(o){let s={};for(let l of o.children){let c=e(l);s[l.outlet]=c}let a=new Le(o.url,s);return o===t&&(n=a),a}let i=e(t.root),r=lx(i);return n??r}function fx(t,n,e,i,r){let o=t;for(;o.parent;)o=o.parent;if(n.length===0)return Dy(o,o,o,e,i,r);let s=GF(n);if(s.toRoot())return Dy(o,o,new Le([],{}),e,i,r);let a=WF(s,o,t),l=a.processChildren?Ec(a.segmentGroup,a.index,s.commands):px(a.segmentGroup,a.index,s.commands);return Dy(o,a.segmentGroup,l,e,i,r)}function fm(t){return typeof t=="object"&&t!=null&&!t.outlets&&!t.segmentPath}function xc(t){return typeof t=="object"&&t!=null&&t.outlets}function qS(t,n,e){t||="\u0275";let i=new zn;return i.queryParams={[t]:n},e.parse(e.serialize(i)).queryParams[t]}function Dy(t,n,e,i,r,o){let s={};for(let[c,d]of Object.entries(i??{}))s[c]=Array.isArray(d)?d.map(p=>qS(c,p,o)):qS(c,d,o);let a;t===n?a=e:a=mx(t,n,e);let l=lx(cx(a));return new zn(l,s,r)}function mx(t,n,e){let i={};return Object.entries(t.children).forEach(([r,o])=>{o===n?i[r]=e:i[r]=mx(o,n,e)}),new Le(t.segments,i)}var mm=class{isAbsolute;numberOfDoubleDots;commands;constructor(n,e,i){if(this.isAbsolute=n,this.numberOfDoubleDots=e,this.commands=i,n&&i.length>0&&fm(i[0]))throw new x(4003,!1);let r=i.find(xc);if(r&&r!==MF(i))throw new x(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function GF(t){if(typeof t[0]=="string"&&t.length===1&&t[0]==="/")return new mm(!0,0,t);let n=0,e=!1,i=t.reduce((r,o,s)=>{if(typeof o=="object"&&o!=null){if(o.outlets){let a={};return Object.entries(o.outlets).forEach(([l,c])=>{a[l]=typeof c=="string"?c.split("/"):c}),[...r,{outlets:a}]}if(o.segmentPath)return[...r,o.segmentPath]}return typeof o!="string"?[...r,o]:s===0?(o.split("/").forEach((a,l)=>{l==0&&a==="."||(l==0&&a===""?e=!0:a===".."?n++:a!=""&&r.push(a))}),r):[...r,o]},[]);return new mm(e,n,i)}var Da=class{segmentGroup;processChildren;index;constructor(n,e,i){this.segmentGroup=n,this.processChildren=e,this.index=i}};function WF(t,n,e){if(t.isAbsolute)return new Da(n,!0,0);if(!e)return new Da(n,!1,NaN);if(e.parent===null)return new Da(e,!0,0);let i=fm(t.commands[0])?0:1,r=e.segments.length-1+i;return qF(e,r,t.numberOfDoubleDots)}function qF(t,n,e){let i=t,r=n,o=e;for(;o>r;){if(o-=r,i=i.parent,!i)throw new x(4005,!1);r=i.segments.length}return new Da(i,!1,r-o)}function KF(t){return xc(t[0])?t[0].outlets:{[ve]:t}}function px(t,n,e){if(t??=new Le([],{}),t.segments.length===0&&t.hasChildren())return Ec(t,n,e);let i=YF(t,n,e),r=e.slice(i.commandIndex);if(i.match&&i.pathIndex<t.segments.length){let o=new Le(t.segments.slice(0,i.pathIndex),{});return o.children[ve]=new Le(t.segments.slice(i.pathIndex),t.children),Ec(o,0,r)}else return i.match&&r.length===0?new Le(t.segments,{}):i.match&&!t.hasChildren()?ky(t,n,e):i.match?Ec(t,0,r):ky(t,n,e)}function Ec(t,n,e){if(e.length===0)return new Le(t.segments,{});{let i=KF(e),r={};if(Object.keys(i).some(o=>o!==ve)&&t.children[ve]&&t.numberOfChildren===1&&t.children[ve].segments.length===0){let o=Ec(t.children[ve],n,e);return new Le(t.segments,o.children)}return Object.entries(i).forEach(([o,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(r[o]=px(t.children[o],n,s))}),Object.entries(t.children).forEach(([o,s])=>{i[o]===void 0&&(r[o]=s)}),new Le(t.segments,r)}}function YF(t,n,e){let i=0,r=n,o={match:!1,pathIndex:0,commandIndex:0};for(;r<t.segments.length;){if(i>=e.length)return o;let s=t.segments[r],a=e[i];if(xc(a))break;let l=`${a}`,c=i<e.length-1?e[i+1]:null;if(r>0&&l===void 0)break;if(l&&c&&typeof c=="object"&&c.outlets===void 0){if(!YS(l,c,s))return o;i+=2}else{if(!YS(l,{},s))return o;i++}r++}return{match:!0,pathIndex:r,commandIndex:i}}function ky(t,n,e){let i=t.segments.slice(0,n),r=0;for(;r<e.length;){let o=e[r];if(xc(o)){let l=QF(o.outlets);return new Le(i,l)}if(r===0&&fm(e[0])){let l=t.segments[n];i.push(new fo(l.path,KS(e[0]))),r++;continue}let s=xc(o)?o.outlets[ve]:`${o}`,a=r<e.length-1?e[r+1]:null;s&&a&&fm(a)?(i.push(new fo(s,KS(a))),r+=2):(i.push(new fo(s,{})),r++)}return new Le(i,{})}function QF(t){let n={};return Object.entries(t).forEach(([e,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(n[e]=ky(new Le([],{}),0,i))}),n}function KS(t){let n={};return Object.entries(t).forEach(([e,i])=>n[e]=`${i}`),n}function YS(t,n,e){return t==e.path&&Xi(n,e.parameters)}var Ea="imperative",Bt=(function(t){return t[t.NavigationStart=0]="NavigationStart",t[t.NavigationEnd=1]="NavigationEnd",t[t.NavigationCancel=2]="NavigationCancel",t[t.NavigationError=3]="NavigationError",t[t.RoutesRecognized=4]="RoutesRecognized",t[t.ResolveStart=5]="ResolveStart",t[t.ResolveEnd=6]="ResolveEnd",t[t.GuardsCheckStart=7]="GuardsCheckStart",t[t.GuardsCheckEnd=8]="GuardsCheckEnd",t[t.RouteConfigLoadStart=9]="RouteConfigLoadStart",t[t.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",t[t.ChildActivationStart=11]="ChildActivationStart",t[t.ChildActivationEnd=12]="ChildActivationEnd",t[t.ActivationStart=13]="ActivationStart",t[t.ActivationEnd=14]="ActivationEnd",t[t.Scroll=15]="Scroll",t[t.NavigationSkipped=16]="NavigationSkipped",t})(Bt||{}),Un=class{id;url;constructor(n,e){this.id=n,this.url=e}},po=class extends Un{type=Bt.NavigationStart;navigationTrigger;restoredState;constructor(n,e,i="imperative",r=null){super(n,e),this.navigationTrigger=i,this.restoredState=r}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},In=class extends Un{urlAfterRedirects;type=Bt.NavigationEnd;constructor(n,e,i){super(n,e),this.urlAfterRedirects=i}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},cn=(function(t){return t[t.Redirect=0]="Redirect",t[t.SupersededByNewNavigation=1]="SupersededByNewNavigation",t[t.NoDataFromResolver=2]="NoDataFromResolver",t[t.GuardRejected=3]="GuardRejected",t[t.Aborted=4]="Aborted",t})(cn||{}),xa=(function(t){return t[t.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",t[t.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",t})(xa||{}),ti=class extends Un{reason;code;type=Bt.NavigationCancel;constructor(n,e,i,r){super(n,e),this.reason=i,this.code=r}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function hx(t){return t instanceof ti&&(t.code===cn.Redirect||t.code===cn.SupersededByNewNavigation)}var Ji=class extends Un{reason;code;type=Bt.NavigationSkipped;constructor(n,e,i,r){super(n,e),this.reason=i,this.code=r}},vs=class extends Un{error;target;type=Bt.NavigationError;constructor(n,e,i,r){super(n,e),this.error=i,this.target=r}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},Mc=class extends Un{urlAfterRedirects;state;type=Bt.RoutesRecognized;constructor(n,e,i,r){super(n,e),this.urlAfterRedirects=i,this.state=r}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},pm=class extends Un{urlAfterRedirects;state;type=Bt.GuardsCheckStart;constructor(n,e,i,r){super(n,e),this.urlAfterRedirects=i,this.state=r}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},hm=class extends Un{urlAfterRedirects;state;shouldActivate;type=Bt.GuardsCheckEnd;constructor(n,e,i,r,o){super(n,e),this.urlAfterRedirects=i,this.state=r,this.shouldActivate=o}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},gm=class extends Un{urlAfterRedirects;state;type=Bt.ResolveStart;constructor(n,e,i,r){super(n,e),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},vm=class extends Un{urlAfterRedirects;state;type=Bt.ResolveEnd;constructor(n,e,i,r){super(n,e),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},_m=class{route;type=Bt.RouteConfigLoadStart;constructor(n){this.route=n}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},ym=class{route;type=Bt.RouteConfigLoadEnd;constructor(n){this.route=n}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},bm=class{snapshot;type=Bt.ChildActivationStart;constructor(n){this.snapshot=n}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Cm=class{snapshot;type=Bt.ChildActivationEnd;constructor(n){this.snapshot=n}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},wm=class{snapshot;type=Bt.ActivationStart;constructor(n){this.snapshot=n}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Dm=class{snapshot;type=Bt.ActivationEnd;constructor(n){this.snapshot=n}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Ma=class{routerEvent;position;anchor;scrollBehavior;type=Bt.Scroll;constructor(n,e,i,r){this.routerEvent=n,this.position=e,this.anchor=i,this.scrollBehavior=r}toString(){let n=this.position?`${this.position[0]}, ${this.position[1]}`:null;return`Scroll(anchor: '${this.anchor}', position: '${n}')`}},Ia=class{},Ic=class{},Ta=class{url;navigationBehaviorOptions;constructor(n,e){this.url=n,this.navigationBehaviorOptions=e}};function ZF(t){return!(t instanceof Ia)&&!(t instanceof Ta)&&!(t instanceof Ic)}var Em=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(n){this.rootInjector=n,this.children=new ys(this.rootInjector)}},ys=(()=>{class t{rootInjector;contexts=new Map;constructor(e){this.rootInjector=e}onChildOutletCreated(e,i){let r=this.getOrCreateContext(e);r.outlet=i,this.contexts.set(e,r)}onChildOutletDestroyed(e){let i=this.getContext(e);i&&(i.outlet=null,i.attachRef=null)}onOutletDeactivated(){let e=this.contexts;return this.contexts=new Map,e}onOutletReAttached(e){this.contexts=e}getOrCreateContext(e){let i=this.getContext(e);return i||(i=new Em(this.rootInjector),this.contexts.set(e,i)),i}getContext(e){return this.contexts.get(e)||null}static \u0275fac=function(i){return new(i||t)(A(Ve))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Sm=class{_root;constructor(n){this._root=n}get root(){return this._root.value}parent(n){let e=this.pathFromRoot(n);return e.length>1?e[e.length-2]:null}children(n){let e=Ry(n,this._root);return e?e.children.map(i=>i.value):[]}firstChild(n){let e=Ry(n,this._root);return e&&e.children.length>0?e.children[0].value:null}siblings(n){let e=Ay(n,this._root);return e.length<2?[]:e[e.length-2].children.map(r=>r.value).filter(r=>r!==n)}pathFromRoot(n){return Ay(n,this._root).map(e=>e.value)}};function Ry(t,n){if(t===n.value)return n;for(let e of n.children){let i=Ry(t,e);if(i)return i}return null}function Ay(t,n){if(t===n.value)return[n];for(let e of n.children){let i=Ay(t,e);if(i.length)return i.unshift(n),i}return[]}var Hn=class{value;children;constructor(n,e){this.value=n,this.children=e}toString(){return`TreeNode(${this.value})`}};function wa(t){let n={};return t&&t.children.forEach(e=>n[e.value.outlet]=e),n}var Tc=class extends Sm{snapshot;constructor(n,e){super(n),this.snapshot=e,Hy(this,n)}toString(){return this.snapshot.toString()}};function gx(t,n){let e=XF(t,n),i=new It([new fo("",{})]),r=new It({}),o=new It({}),s=new It({}),a=new It(""),l=new xt(i,r,s,a,o,ve,t,e.root);return l.snapshot=e.root,new Tc(new Hn(l,[]),e)}function XF(t,n){let e={},i={},r={},s=new ka([],e,r,"",i,ve,t,null,{},n);return new kc("",new Hn(s,[]))}var xt=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(n,e,i,r,o,s,a,l){this.urlSubject=n,this.paramsSubject=e,this.queryParamsSubject=i,this.fragmentSubject=r,this.dataSubject=o,this.outlet=s,this.component=a,this._futureSnapshot=l,this.title=this.dataSubject?.pipe(ue(c=>c[Oc]))??Q(void 0),this.url=n,this.params=e,this.queryParams=i,this.fragment=r,this.data=o}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(ue(n=>gs(n))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(ue(n=>gs(n))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function jy(t,n,e="emptyOnly"){let i,{routeConfig:r}=t;return n!==null&&(e==="always"||r?.path===""||!n.component&&!n.routeConfig?.loadComponent)?i={params:S(S({},n.params),t.params),data:S(S({},n.data),t.data),resolve:S(S(S(S({},t.data),n.data),r?.data),t._resolvedData)}:i={params:S({},t.params),data:S({},t.data),resolve:S(S({},t.data),t._resolvedData??{})},r&&_x(r)&&(i.resolve[Oc]=r.title),i}var ka=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[Oc]}constructor(n,e,i,r,o,s,a,l,c,d){this.url=n,this.params=e,this.queryParams=i,this.fragment=r,this.data=o,this.outlet=s,this.component=a,this.routeConfig=l,this._resolve=c,this._environmentInjector=d}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=gs(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=gs(this.queryParams),this._queryParamMap}toString(){let n=this.url.map(i=>i.toString()).join("/"),e=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${n}', path:'${e}')`}},kc=class extends Sm{url;constructor(n,e){super(e),this.url=n,Hy(this,e)}toString(){return vx(this._root)}};function Hy(t,n){n.value._routerState=t,n.children.forEach(e=>Hy(t,e))}function vx(t){let n=t.children.length>0?` { ${t.children.map(vx).join(", ")} } `:"";return`${t.value}${n}`}function Ey(t){if(t.snapshot){let n=t.snapshot,e=t._futureSnapshot;t.snapshot=e,Xi(n.queryParams,e.queryParams)||t.queryParamsSubject.next(e.queryParams),n.fragment!==e.fragment&&t.fragmentSubject.next(e.fragment),Xi(n.params,e.params)||t.paramsSubject.next(e.params),xF(n.url,e.url)||t.urlSubject.next(e.url),Xi(n.data,e.data)||t.dataSubject.next(e.data)}else t.snapshot=t._futureSnapshot,t.dataSubject.next(t._futureSnapshot.data)}function Oy(t,n){let e=Xi(t.params,n.params)&&RF(t.url,n.url),i=!t.parent!=!n.parent;return e&&!i&&(!t.parent||Oy(t.parent,n.parent))}function _x(t){return typeof t.title=="string"||t.title===null}var yx=new w(""),Nc=(()=>{class t{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=ve;activateEvents=new Z;deactivateEvents=new Z;attachEvents=new Z;detachEvents=new Z;routerOutletData=Vf();parentContexts=u(ys);location=u(Nt);changeDetector=u(De);inputBinder=u(Pc,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(e){if(e.name){let{firstChange:i,previousValue:r}=e.name;if(i)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(e){return this.parentContexts.getContext(e)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let e=this.parentContexts.getContext(this.name);e?.route&&(e.attachRef?this.attach(e.attachRef,e.route):this.activateWith(e.route,e.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new x(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new x(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new x(4012,!1);this.location.detach();let e=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(e.instance),e}attach(e,i){this.activated=e,this._activatedRoute=i,this.location.insert(e.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(e.instance)}deactivate(){if(this.activated){let e=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(e)}}activateWith(e,i){if(this.isActivated)throw new x(4013,!1);this._activatedRoute=e;let r=this.location,s=e.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,l=new Ny(e,a,r.injector,this.routerOutletData);this.activated=r.createComponent(s,{index:r.length,injector:l,environmentInjector:i}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[et]})}return t})(),Ny=class{route;childContexts;parent;outletData;constructor(n,e,i,r){this.route=n,this.childContexts=e,this.parent=i,this.outletData=r}get(n,e){return n===xt?this.route:n===ys?this.childContexts:n===yx?this.outletData:this.parent.get(n,e)}},Pc=new w(""),zy=(()=>{class t{outletDataSubscriptions=new Map;bindActivatedRouteToOutletComponent(e){this.unsubscribeFromRouteData(e),this.subscribeToRouteData(e)}unsubscribeFromRouteData(e){this.outletDataSubscriptions.get(e)?.unsubscribe(),this.outletDataSubscriptions.delete(e)}subscribeToRouteData(e){let{activatedRoute:i}=e,r=Ys([i.queryParams,i.params,i.data]).pipe(Ct(([o,s,a],l)=>(a=S(S(S({},o),s),a),l===0?Q(a):Promise.resolve(a)))).subscribe(o=>{if(!e.isActivated||!e.activatedComponentRef||e.activatedRoute!==i||i.component===null){this.unsubscribeFromRouteData(e);return}let s=lS(i.component);if(!s){this.unsubscribeFromRouteData(e);return}for(let{templateName:a}of s.inputs)e.activatedComponentRef.setInput(a,o[a])});this.outletDataSubscriptions.set(e,r)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})(),Uy=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(i,r){i&1&&W(0,"router-outlet")},dependencies:[Nc],encapsulation:2})}return t})();function $y(t){let n=t.children&&t.children.map($y),e=n?de(S({},t),{children:n}):S({},t);return!e.component&&!e.loadComponent&&(n||e.loadChildren)&&e.outlet&&e.outlet!==ve&&(e.component=Uy),e}function JF(t,n,e){let i=Rc(t,n._root,e?e._root:void 0);return new Tc(i,n)}function Rc(t,n,e){if(e&&t.shouldReuseRoute(n.value,e.value.snapshot)){let i=e.value;i._futureSnapshot=n.value;let r=eL(t,n,e);return new Hn(i,r)}else{if(t.shouldAttach(n.value)){let o=t.retrieve(n.value);if(o!==null){let s=o.route;return s.value._futureSnapshot=n.value,s.children=n.children.map(a=>Rc(t,a)),s}}let i=tL(n.value),r=n.children.map(o=>Rc(t,o));return new Hn(i,r)}}function eL(t,n,e){return n.children.map(i=>{for(let r of e.children)if(t.shouldReuseRoute(i.value,r.value.snapshot))return Rc(t,i,r);return Rc(t,i)})}function tL(t){return new xt(new It(t.url),new It(t.params),new It(t.queryParams),new It(t.fragment),new It(t.data),t.outlet,t.component,t)}var Ra=class{redirectTo;navigationBehaviorOptions;constructor(n,e){this.redirectTo=n,this.navigationBehaviorOptions=e}},bx="ngNavigationCancelingError";function xm(t,n){let{redirectTo:e,navigationBehaviorOptions:i}=mo(n)?{redirectTo:n,navigationBehaviorOptions:void 0}:n,r=Cx(!1,cn.Redirect);return r.url=e,r.navigationBehaviorOptions=i,r}function Cx(t,n){let e=new Error(`NavigationCancelingError: ${t||""}`);return e[bx]=!0,e.cancellationCode=n,e}function nL(t){return wx(t)&&mo(t.url)}function wx(t){return!!t&&t[bx]}var Py=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(n,e,i,r,o){this.routeReuseStrategy=n,this.futureState=e,this.currState=i,this.forwardEvent=r,this.inputBindingEnabled=o}activate(n){let e=this.futureState._root,i=this.currState?this.currState._root:null;this.deactivateChildRoutes(e,i,n),Ey(this.futureState.root),this.activateChildRoutes(e,i,n)}deactivateChildRoutes(n,e,i){let r=wa(e);n.children.forEach(o=>{let s=o.value.outlet;this.deactivateRoutes(o,r[s],i),delete r[s]}),Object.values(r).forEach(o=>{this.deactivateRouteAndItsChildren(o,i)})}deactivateRoutes(n,e,i){let r=n.value,o=e?e.value:null;if(r===o)if(r.component){let s=i.getContext(r.outlet);s&&this.deactivateChildRoutes(n,e,s.children)}else this.deactivateChildRoutes(n,e,i);else o&&this.deactivateRouteAndItsChildren(e,i)}deactivateRouteAndItsChildren(n,e){n.value.component&&this.routeReuseStrategy.shouldDetach(n.value.snapshot)?this.detachAndStoreRouteSubtree(n,e):this.deactivateRouteAndOutlet(n,e)}detachAndStoreRouteSubtree(n,e){let i=e.getContext(n.value.outlet),r=i&&n.value.component?i.children:e,o=wa(n);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);if(i&&i.outlet){let s=i.outlet.detach(),a=i.children.onOutletDeactivated();this.routeReuseStrategy.store(n.value.snapshot,{componentRef:s,route:n,contexts:a})}}deactivateRouteAndOutlet(n,e){let i=e.getContext(n.value.outlet),r=i&&n.value.component?i.children:e,o=wa(n);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);i&&(i.outlet&&(i.outlet.deactivate(),i.children.onOutletDeactivated()),i.attachRef=null,i.route=null)}activateChildRoutes(n,e,i){let r=wa(e);n.children.forEach(o=>{this.activateRoutes(o,r[o.value.outlet],i),this.forwardEvent(new Dm(o.value.snapshot))}),n.children.length&&this.forwardEvent(new Cm(n.value.snapshot))}activateRoutes(n,e,i){let r=n.value,o=e?e.value:null;if(Ey(r),r===o)if(r.component){let s=i.getOrCreateContext(r.outlet);this.activateChildRoutes(n,e,s.children)}else this.activateChildRoutes(n,e,i);else if(r.component){let s=i.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let a=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),Ey(a.route.value),this.activateChildRoutes(n,null,s.children)}else s.attachRef=null,s.route=r,s.outlet&&s.outlet.activateWith(r,s.injector),this.activateChildRoutes(n,null,s.children)}else this.activateChildRoutes(n,null,i)}},Mm=class{path;route;constructor(n){this.path=n,this.route=this.path[this.path.length-1]}},Sa=class{component;route;constructor(n,e){this.component=n,this.route=e}};function iL(t,n,e){let i=t._root,r=n?n._root:null;return Dc(i,r,e,[i.value])}function rL(t){let n=t.routeConfig?t.routeConfig.canActivateChild:null;return!n||n.length===0?null:{node:t,guards:n}}function Oa(t,n){let e=Symbol(),i=n.get(t,e);return i===e?typeof t=="function"&&!og(t)?t:n.get(t):i}function Dc(t,n,e,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=wa(n);return t.children.forEach(s=>{oL(s,o[s.value.outlet],e,i.concat([s.value]),r),delete o[s.value.outlet]}),Object.entries(o).forEach(([s,a])=>Sc(a,e.getContext(s),r)),r}function oL(t,n,e,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=t.value,s=n?n.value:null,a=e?e.getContext(t.value.outlet):null;if(s&&o.routeConfig===s.routeConfig){let l=sL(s,o,o.routeConfig.runGuardsAndResolvers);l?r.canActivateChecks.push(new Mm(i)):(o.data=s.data,o._resolvedData=s._resolvedData),o.component?Dc(t,n,a?a.children:null,i,r):Dc(t,n,e,i,r),l&&a&&a.outlet&&a.outlet.isActivated&&r.canDeactivateChecks.push(new Sa(a.outlet.component,s))}else s&&Sc(n,a,r),r.canActivateChecks.push(new Mm(i)),o.component?Dc(t,null,a?a.children:null,i,r):Dc(t,null,e,i,r);return r}function sL(t,n,e){if(typeof e=="function")return Rt(n._environmentInjector,()=>e(t,n));switch(e){case"pathParamsChange":return!hs(t.url,n.url);case"pathParamsOrQueryParamsChange":return!hs(t.url,n.url)||!Xi(t.queryParams,n.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!Oy(t,n)||!Xi(t.queryParams,n.queryParams);default:return!Oy(t,n)}}function Sc(t,n,e){let i=wa(t),r=t.value;Object.entries(i).forEach(([o,s])=>{r.component?n?Sc(s,n.children.getContext(o),e):Sc(s,null,e):Sc(s,n,e)}),r.component?n&&n.outlet&&n.outlet.isActivated?e.canDeactivateChecks.push(new Sa(n.outlet.component,r)):e.canDeactivateChecks.push(new Sa(null,r)):e.canDeactivateChecks.push(new Sa(null,r))}function Fc(t){return typeof t=="function"}function aL(t){return typeof t=="boolean"}function lL(t){return t&&Fc(t.canLoad)}function cL(t){return t&&Fc(t.canActivate)}function dL(t){return t&&Fc(t.canActivateChild)}function uL(t){return t&&Fc(t.canDeactivate)}function fL(t){return t&&Fc(t.canMatch)}function Dx(t){return t instanceof Uo||t?.name==="EmptyError"}var am=Symbol("INITIAL_VALUE");function Aa(){return Ct(t=>Ys(t.map(n=>n.pipe(hn(1),zt(am)))).pipe(ue(n=>{for(let e of n)if(e!==!0){if(e===am)return am;if(e===!1||mL(e))return e}return!0}),We(n=>n!==am),hn(1)))}function mL(t){return mo(t)||t instanceof Ra}function Ex(t){return t.aborted?Q(void 0).pipe(hn(1)):new ye(n=>{let e=()=>{n.next(),n.complete()};return t.addEventListener("abort",e),()=>t.removeEventListener("abort",e)})}function Sx(t){return xe(Ex(t))}function pL(t){return Xt(n=>{let{targetSnapshot:e,currentSnapshot:i,guards:{canActivateChecks:r,canDeactivateChecks:o}}=n;return o.length===0&&r.length===0?Q(de(S({},n),{guardsResult:!0})):hL(o,e,i).pipe(Xt(s=>s&&aL(s)?gL(e,r,t):Q(s)),ue(s=>de(S({},n),{guardsResult:s})))})}function hL(t,n,e){return Qe(t).pipe(Xt(i=>CL(i.component,i.route,e,n)),ur(i=>i!==!0,!0))}function gL(t,n,e){return Qe(n).pipe(Gr(i=>$r(_L(i.route.parent,e),vL(i.route,e),bL(t,i.path),yL(t,i.route))),ur(i=>i!==!0,!0))}function vL(t,n){return t!==null&&n&&n(new wm(t)),Q(!0)}function _L(t,n){return t!==null&&n&&n(new bm(t)),Q(!0)}function yL(t,n){let e=n.routeConfig?n.routeConfig.canActivate:null;if(!e||e.length===0)return Q(!0);let i=e.map(r=>$o(()=>{let o=n._environmentInjector,s=Oa(r,o),a=cL(s)?s.canActivate(n,t):Rt(o,()=>s(n,t));return _s(a).pipe(ur())}));return Q(i).pipe(Aa())}function bL(t,n){let e=n[n.length-1],r=n.slice(0,n.length-1).reverse().map(o=>rL(o)).filter(o=>o!==null).map(o=>$o(()=>{let s=o.guards.map(a=>{let l=o.node._environmentInjector,c=Oa(a,l),d=dL(c)?c.canActivateChild(e,t):Rt(l,()=>c(e,t));return _s(d).pipe(ur())});return Q(s).pipe(Aa())}));return Q(r).pipe(Aa())}function CL(t,n,e,i){let r=n&&n.routeConfig?n.routeConfig.canDeactivate:null;if(!r||r.length===0)return Q(!0);let o=r.map(s=>{let a=n._environmentInjector,l=Oa(s,a),c=uL(l)?l.canDeactivate(t,n,e,i):Rt(a,()=>l(t,n,e,i));return _s(c).pipe(ur())});return Q(o).pipe(Aa())}function wL(t,n,e,i,r){let o=n.canLoad;if(o===void 0||o.length===0)return Q(!0);let s=o.map(a=>{let l=Oa(a,t),c=lL(l)?l.canLoad(n,e):Rt(t,()=>l(n,e)),d=_s(c);return r?d.pipe(Sx(r)):d});return Q(s).pipe(Aa(),xx(i))}function xx(t){return Bh(it(n=>{if(typeof n!="boolean")throw xm(t,n)}),ue(n=>n===!0))}function DL(t,n,e,i,r,o){let s=n.canMatch;if(!s||s.length===0)return Q(!0);let a=s.map(l=>{let c=Oa(l,t),d=fL(c)?c.canMatch(n,e,r):Rt(t,()=>c(n,e,r));return _s(d).pipe(Sx(o))});return Q(a).pipe(Aa(),xx(i))}var xr=class t extends Error{segmentGroup;constructor(n){super(),this.segmentGroup=n||null,Object.setPrototypeOf(this,t.prototype)}},Ac=class t extends Error{urlTree;constructor(n){super(),this.urlTree=n,Object.setPrototypeOf(this,t.prototype)}};function EL(t){throw new x(4e3,!1)}function SL(t){throw Cx(!1,cn.GuardRejected)}var Fy=class{urlSerializer;urlTree;constructor(n,e){this.urlSerializer=n,this.urlTree=e}async lineralizeSegments(n,e){let i=[],r=e.root;for(;;){if(i=i.concat(r.segments),r.numberOfChildren===0)return i;if(r.numberOfChildren>1||!r.children[ve])throw EL(`${n.redirectTo}`);r=r.children[ve]}}async applyRedirectCommands(n,e,i,r,o){let s=await xL(e,r,o);if(s instanceof zn)throw new Ac(s);let a=this.applyRedirectCreateUrlTree(s,this.urlSerializer.parse(s),n,i);if(s[0]==="/")throw new Ac(a);return a}applyRedirectCreateUrlTree(n,e,i,r){let o=this.createSegmentGroup(n,e.root,i,r);return new zn(o,this.createQueryParams(e.queryParams,this.urlTree.queryParams),e.fragment)}createQueryParams(n,e){let i={};return Object.entries(n).forEach(([r,o])=>{if(typeof o=="string"&&o[0]===":"){let a=o.substring(1);i[r]=e[a]}else i[r]=o}),i}createSegmentGroup(n,e,i,r){let o=this.createSegments(n,e.segments,i,r),s={};return Object.entries(e.children).forEach(([a,l])=>{s[a]=this.createSegmentGroup(n,l,i,r)}),new Le(o,s)}createSegments(n,e,i,r){return e.map(o=>o.path[0]===":"?this.findPosParam(n,o,r):this.findOrReturn(o,i))}findPosParam(n,e,i){let r=i[e.path.substring(1)];if(!r)throw new x(4001,!1);return r}findOrReturn(n,e){let i=0;for(let r of e){if(r.path===n.path)return e.splice(i),r;i++}return n}};function xL(t,n,e){if(typeof t=="string")return Promise.resolve(t);let i=t;return um(_s(Rt(e,()=>i(n))))}function ML(t,n){return t.providers&&!t._injector&&(t._injector=va(t.providers,n,`Route: ${t.path}`)),t._injector??n}function xi(t){return t.outlet||ve}function IL(t,n){let e=t.filter(i=>xi(i)===n);return e.push(...t.filter(i=>xi(i)!==n)),e}var Ly={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function Mx(t){return{routeConfig:t.routeConfig,url:t.url,params:t.params,queryParams:t.queryParams,fragment:t.fragment,data:t.data,outlet:t.outlet,title:t.title,paramMap:t.paramMap,queryParamMap:t.queryParamMap}}function TL(t,n,e,i,r,o,s){let a=Ix(t,n,e);if(!a.matched)return Q(a);let l=Mx(o(a));return i=ML(n,i),DL(i,n,e,r,l,s).pipe(ue(c=>c===!0?a:S({},Ly)))}function Ix(t,n,e){if(n.path==="")return n.pathMatch==="full"&&(t.hasChildren()||e.length>0)?S({},Ly):{matched:!0,consumedSegments:[],remainingSegments:e,parameters:{},positionalParamSegments:{}};let r=(n.matcher||XS)(e,t,n);if(!r)return S({},Ly);let o={};Object.entries(r.posParams??{}).forEach(([a,l])=>{o[a]=l.path});let s=r.consumed.length>0?S(S({},o),r.consumed[r.consumed.length-1].parameters):o;return{matched:!0,consumedSegments:r.consumed,remainingSegments:e.slice(r.consumed.length),parameters:s,positionalParamSegments:r.posParams??{}}}function QS(t,n,e,i,r){return e.length>0&&AL(t,e,i,r)?{segmentGroup:new Le(n,RL(i,new Le(e,t.children))),slicedSegments:[]}:e.length===0&&OL(t,e,i)?{segmentGroup:new Le(t.segments,kL(t,e,i,t.children)),slicedSegments:e}:{segmentGroup:new Le(t.segments,t.children),slicedSegments:e}}function kL(t,n,e,i){let r={};for(let o of e)if(Tm(t,n,o)&&!i[xi(o)]){let s=new Le([],{});r[xi(o)]=s}return S(S({},i),r)}function RL(t,n){let e={};e[ve]=n;for(let i of t)if(i.path===""&&xi(i)!==ve){let r=new Le([],{});e[xi(i)]=r}return e}function AL(t,n,e,i){return e.some(r=>!Tm(t,n,r)||!(xi(r)!==ve)?!1:!(i!==void 0&&xi(r)===i))}function OL(t,n,e){return e.some(i=>Tm(t,n,i))}function Tm(t,n,e){return(t.hasChildren()||n.length>0)&&e.pathMatch==="full"?!1:e.path===""}function NL(t,n,e){return n.length===0&&!t.children[e]}var By=class{};async function PL(t,n,e,i,r,o,s="emptyOnly",a){return new Vy(t,n,e,i,r,s,o,a).recognize()}var FL=31,Vy=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(n,e,i,r,o,s,a,l){this.injector=n,this.configLoader=e,this.rootComponentType=i,this.config=r,this.urlTree=o,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.abortSignal=l,this.applyRedirects=new Fy(this.urlSerializer,this.urlTree)}noMatchError(n){return new x(4002,`'${n.segmentGroup}'`)}async recognize(){let n=QS(this.urlTree.root,[],[],this.config).segmentGroup,{children:e,rootSnapshot:i}=await this.match(n),r=new Hn(i,e),o=new kc("",r),s=dx(i,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(s),{state:o,tree:s}}async match(n){let e=new ka([],Object.freeze({}),Object.freeze(S({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),ve,this.rootComponentType,null,{},this.injector);try{return{children:await this.processSegmentGroup(this.injector,this.config,n,ve,e),rootSnapshot:e}}catch(i){if(i instanceof Ac)return this.urlTree=i.urlTree,this.match(i.urlTree.root);throw i instanceof xr?this.noMatchError(i):i}}async processSegmentGroup(n,e,i,r,o){if(i.segments.length===0&&i.hasChildren())return this.processChildren(n,e,i,o);let s=await this.processSegment(n,e,i,i.segments,r,!0,o);return s instanceof Hn?[s]:[]}async processChildren(n,e,i,r){let o=[];for(let l of Object.keys(i.children))l==="primary"?o.unshift(l):o.push(l);let s=[];for(let l of o){let c=i.children[l],d=IL(e,l),p=await this.processSegmentGroup(n,d,c,l,r);s.push(...p)}let a=Tx(s);return LL(a),a}async processSegment(n,e,i,r,o,s,a){for(let l of e)try{return await this.processSegmentAgainstRoute(l._injector??n,e,l,i,r,o,s,a)}catch(c){if(c instanceof xr||Dx(c))continue;throw c}if(NL(i,r,o))return new By;throw new xr(i)}async processSegmentAgainstRoute(n,e,i,r,o,s,a,l){if(xi(i)!==s&&(s===ve||!Tm(r,o,i)))throw new xr(r);if(i.redirectTo===void 0)return this.matchSegmentAgainstRoute(n,r,i,o,s,l);if(this.allowRedirects&&a)return this.expandSegmentAgainstRouteUsingRedirect(n,r,e,i,o,s,l);throw new xr(r)}async expandSegmentAgainstRouteUsingRedirect(n,e,i,r,o,s,a){let{matched:l,parameters:c,consumedSegments:d,positionalParamSegments:p,remainingSegments:_}=Ix(e,r,o);if(!l)throw new xr(e);typeof r.redirectTo=="string"&&r.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>FL&&(this.allowRedirects=!1));let v=this.createSnapshot(n,r,o,c,a);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let y=await this.applyRedirects.applyRedirectCommands(d,r.redirectTo,p,Mx(v),n),D=await this.applyRedirects.lineralizeSegments(r,y);return this.processSegment(n,i,e,D.concat(_),s,!1,a)}createSnapshot(n,e,i,r,o){let s=new ka(i,r,Object.freeze(S({},this.urlTree.queryParams)),this.urlTree.fragment,VL(e),xi(e),e.component??e._loadedComponent??null,e,jL(e),n),a=jy(s,o,this.paramsInheritanceStrategy);return s.params=Object.freeze(a.params),s.data=Object.freeze(a.data),s}async matchSegmentAgainstRoute(n,e,i,r,o,s){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let a=Ee=>this.createSnapshot(n,i,Ee.consumedSegments,Ee.parameters,s),l=await um(TL(e,i,r,n,this.urlSerializer,a,this.abortSignal));if(i.path==="**"&&(e.children={}),!l?.matched)throw new xr(e);n=i._injector??n;let{routes:c}=await this.getChildConfig(n,i,r),d=i._loadedInjector??n,{parameters:p,consumedSegments:_,remainingSegments:v}=l,y=this.createSnapshot(n,i,_,p,s),{segmentGroup:D,slicedSegments:M}=QS(e,_,v,c,o);if(M.length===0&&D.hasChildren()){let Ee=await this.processChildren(d,c,D,y);return new Hn(y,Ee)}if(c.length===0&&M.length===0)return new Hn(y,[]);let R=xi(i)===o,$=await this.processSegment(d,c,D,M,R?ve:o,!0,y);return new Hn(y,$ instanceof Hn?[$]:[])}async getChildConfig(n,e,i){if(e.children)return{routes:e.children,injector:n};if(e.loadChildren){if(e._loadedRoutes!==void 0){let o=e._loadedNgModuleFactory;return o&&!e._loadedInjector&&(e._loadedInjector=o.create(n).injector),{routes:e._loadedRoutes,injector:e._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(await um(wL(n,e,i,this.urlSerializer,this.abortSignal))){let o=await this.configLoader.loadChildren(n,e);return e._loadedRoutes=o.routes,e._loadedInjector=o.injector,e._loadedNgModuleFactory=o.factory,o}throw SL(e)}return{routes:[],injector:n}}};function LL(t){t.sort((n,e)=>n.value.outlet===ve?-1:e.value.outlet===ve?1:n.value.outlet.localeCompare(e.value.outlet))}function BL(t){let n=t.value.routeConfig;return n&&n.path===""}function Tx(t){let n=[],e=new Set;for(let i of t){if(!BL(i)){n.push(i);continue}let r=n.find(o=>i.value.routeConfig===o.value.routeConfig);r!==void 0?(r.children.push(...i.children),e.add(r)):n.push(i)}for(let i of e){let r=Tx(i.children);n.push(new Hn(i.value,r))}return n.filter(i=>!e.has(i))}function VL(t){return t.data||{}}function jL(t){return t.resolve||{}}function HL(t,n,e,i,r,o,s){return Xt(async a=>{let{state:l,tree:c}=await PL(t,n,e,i,a.extractedUrl,r,o,s);return de(S({},a),{targetSnapshot:l,urlAfterRedirects:c})})}function zL(t){return Xt(n=>{let{targetSnapshot:e,guards:{canActivateChecks:i}}=n;if(!i.length)return Q(n);let r=new Set(i.map(a=>a.route)),o=new Set;for(let a of r)if(!o.has(a))for(let l of kx(a))o.add(l);let s=0;return Qe(o).pipe(Gr(a=>r.has(a)?UL(a,e,t):(a.data=jy(a,a.parent,t).resolve,Q(void 0))),it(()=>s++),iu(1),Xt(a=>s===o.size?Q(n):pt))})}function kx(t){let n=t.children.map(e=>kx(e)).flat();return[t,...n]}function UL(t,n,e){let i=t.routeConfig,r=t._resolve;return i?.title!==void 0&&!_x(i)&&(r[Oc]=i.title),$o(()=>(t.data=jy(t,t.parent,e).resolve,$L(r,t,n).pipe(ue(o=>(t._resolvedData=o,t.data=S(S({},t.data),o),null)))))}function $L(t,n,e){let i=xy(t);if(i.length===0)return Q({});let r={};return Qe(i).pipe(Xt(o=>GL(t[o],n,e).pipe(ur(),it(s=>{if(s instanceof Ra)throw xm(new Mr,s);r[o]=s}))),iu(1),ue(()=>r),mi(o=>Dx(o)?pt:zo(o)))}function GL(t,n,e){let i=n._environmentInjector,r=Oa(t,i),o=r.resolve?r.resolve(n,e):Rt(i,()=>r(n,e));return _s(o)}function ZS(t){return Ct(n=>{let e=t(n);return e?Qe(e).pipe(ue(()=>n)):Q(n)})}var Gy=(()=>{class t{buildTitle(e){let i,r=e.root;for(;r!==void 0;)i=this.getResolvedTitleForRoute(r)??i,r=r.children.find(o=>o.outlet===ve);return i}getResolvedTitleForRoute(e){return e.data[Oc]}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:()=>u(Rx),providedIn:"root"})}return t})(),Rx=(()=>{class t extends Gy{title;constructor(e){super(),this.title=e}updateTitle(e){let i=this.buildTitle(e);i!==void 0&&this.title.setTitle(i)}static \u0275fac=function(i){return new(i||t)(A(US))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),go=new w("",{factory:()=>({})}),bs=new w(""),km=(()=>{class t{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=u(N_);async loadComponent(e,i){if(this.componentLoaders.get(i))return this.componentLoaders.get(i);if(i._loadedComponent)return Promise.resolve(i._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let o=await ex(Rt(e,()=>i.loadComponent())),s=await Nx(Ox(o));return this.onLoadEndListener&&this.onLoadEndListener(i),i._loadedComponent=s,s}finally{this.componentLoaders.delete(i)}})();return this.componentLoaders.set(i,r),r}loadChildren(e,i){if(this.childrenLoaders.get(i))return this.childrenLoaders.get(i);if(i._loadedRoutes)return Promise.resolve({routes:i._loadedRoutes,injector:i._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let o=await Ax(i,this.compiler,e,this.onLoadEndListener);return i._loadedRoutes=o.routes,i._loadedInjector=o.injector,i._loadedNgModuleFactory=o.factory,o}finally{this.childrenLoaders.delete(i)}})();return this.childrenLoaders.set(i,r),r}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();async function Ax(t,n,e,i){let r=await ex(Rt(e,()=>t.loadChildren())),o=await Nx(Ox(r)),s;o instanceof Sf||Array.isArray(o)?s=o:s=await n.compileModuleAsync(o),i&&i(t);let a,l,c=!1,d;return Array.isArray(s)?(l=s,c=!0):(a=s.create(e).injector,d=s,l=a.get(bs,[],{optional:!0,self:!0}).flat()),{routes:l.map($y),injector:a,factory:d}}function WL(t){return t&&typeof t=="object"&&"default"in t}function Ox(t){return WL(t)?t.default:t}async function Nx(t){return t}var Rm=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:()=>u(qL),providedIn:"root"})}return t})(),qL=(()=>{class t{shouldProcessUrl(e){return!0}extract(e){return e}merge(e,i){return e}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Wy=new w(""),qy=new w("");function Px(t,n,e){let i=t.get(qy),r=t.get(Y);if(!r.startViewTransition||i.skipNextTransition)return i.skipNextTransition=!1,new Promise(c=>setTimeout(c));let o,s=new Promise(c=>{o=c}),a=r.startViewTransition(()=>(o(),KL(t)));a.updateCallbackDone.catch(c=>{}),a.ready.catch(c=>{}),a.finished.catch(c=>{});let{onViewTransitionCreated:l}=i;return l&&Rt(t,()=>l({transition:a,from:n,to:e})),s}function KL(t){return new Promise(n=>{$t({read:()=>setTimeout(n)},{injector:t})})}var YL=()=>{},Ky=new w(""),Am=(()=>{class t{currentNavigation=T(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=T(null);events=new F;transitionAbortWithErrorSubject=new F;configLoader=u(km);environmentInjector=u(Ve);destroyRef=u(sn);urlSerializer=u(ho);rootContexts=u(ys);location=u(Ki);inputBindingEnabled=u(Pc,{optional:!0})!==null;titleStrategy=u(Gy);options=u(go,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=u(Rm);createViewTransition=u(Wy,{optional:!0});navigationErrorHandler=u(Ky,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>Q(void 0);rootComponentType=null;destroyed=!1;constructor(){let e=r=>this.events.next(new _m(r)),i=r=>this.events.next(new ym(r));this.configLoader.onLoadEndListener=i,this.configLoader.onLoadStartListener=e,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(e){let i=++this.navigationId;Pe(()=>{this.transitions?.next(de(S({},e),{extractedUrl:this.urlHandlingStrategy.extract(e.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:i,routesRecognizeHandler:{},beforeActivateHandler:{}}))})}setupNavigations(e){return this.transitions=new It(null),this.transitions.pipe(We(i=>i!==null),Ct(i=>{let r=!1,o=new AbortController,s=()=>!r&&this.currentTransition?.id===i.id;return Q(i).pipe(Ct(a=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",cn.SupersededByNewNavigation),pt;this.currentTransition=i;let l=this.lastSuccessfulNavigation();this.currentNavigation.set({id:a.id,initialUrl:a.rawUrl,extractedUrl:a.extractedUrl,targetBrowserUrl:typeof a.extras.browserUrl=="string"?this.urlSerializer.parse(a.extras.browserUrl):a.extras.browserUrl,trigger:a.source,extras:a.extras,previousNavigation:l?de(S({},l),{previousNavigation:null}):null,abort:()=>o.abort(),routesRecognizeHandler:a.routesRecognizeHandler,beforeActivateHandler:a.beforeActivateHandler});let c=!e.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),d=a.extras.onSameUrlNavigation??e.onSameUrlNavigation;if(!c&&d!=="reload")return this.events.next(new Ji(a.id,this.urlSerializer.serialize(a.rawUrl),"",xa.IgnoredSameUrlNavigation)),a.resolve(!1),pt;if(this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))return Q(a).pipe(Ct(p=>(this.events.next(new po(p.id,this.urlSerializer.serialize(p.extractedUrl),p.source,p.restoredState)),p.id!==this.navigationId?pt:Promise.resolve(p))),HL(this.environmentInjector,this.configLoader,this.rootComponentType,e.config,this.urlSerializer,this.paramsInheritanceStrategy,o.signal),it(p=>{i.targetSnapshot=p.targetSnapshot,i.urlAfterRedirects=p.urlAfterRedirects,this.currentNavigation.update(_=>(_.finalUrl=p.urlAfterRedirects,_)),this.events.next(new Ic)}),Ct(p=>Qe(i.routesRecognizeHandler.deferredHandle??Q(void 0)).pipe(ue(()=>p))),it(()=>{let p=new Mc(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(p)}));if(c&&this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)){let{id:p,extractedUrl:_,source:v,restoredState:y,extras:D}=a,M=new po(p,this.urlSerializer.serialize(_),v,y);this.events.next(M);let R=gx(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=i=de(S({},a),{targetSnapshot:R,urlAfterRedirects:_,extras:de(S({},D),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update($=>($.finalUrl=_,$)),Q(i)}else return this.events.next(new Ji(a.id,this.urlSerializer.serialize(a.extractedUrl),"",xa.IgnoredByUrlHandlingStrategy)),a.resolve(!1),pt}),ue(a=>{let l=new pm(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);return this.events.next(l),this.currentTransition=i=de(S({},a),{guards:iL(a.targetSnapshot,a.currentSnapshot,this.rootContexts)}),i}),pL(a=>this.events.next(a)),Ct(a=>{if(i.guardsResult=a.guardsResult,a.guardsResult&&typeof a.guardsResult!="boolean")throw xm(this.urlSerializer,a.guardsResult);let l=new hm(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot,!!a.guardsResult);if(this.events.next(l),!s())return pt;if(!a.guardsResult)return this.cancelNavigationTransition(a,"",cn.GuardRejected),pt;if(a.guards.canActivateChecks.length===0)return Q(a);let c=new gm(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);if(this.events.next(c),!s())return pt;let d=!1;return Q(a).pipe(zL(this.paramsInheritanceStrategy),it({next:()=>{d=!0;let p=new vm(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(p)},complete:()=>{d||this.cancelNavigationTransition(a,"",cn.NoDataFromResolver)}}))}),ZS(a=>{let l=d=>{let p=[];if(d.routeConfig?._loadedComponent)d.component=d.routeConfig?._loadedComponent;else if(d.routeConfig?.loadComponent){let _=d._environmentInjector;p.push(this.configLoader.loadComponent(_,d.routeConfig).then(v=>{d.component=v}))}for(let _ of d.children)p.push(...l(_));return p},c=l(a.targetSnapshot.root);return c.length===0?Q(a):Qe(Promise.all(c).then(()=>a))}),ZS(()=>this.afterPreactivation()),Ct(()=>{let{currentSnapshot:a,targetSnapshot:l}=i,c=this.createViewTransition?.(this.environmentInjector,a.root,l.root);return c?Qe(c).pipe(ue(()=>i)):Q(i)}),hn(1),Ct(a=>{let l=JF(e.routeReuseStrategy,a.targetSnapshot,a.currentRouterState);this.currentTransition=i=a=de(S({},a),{targetRouterState:l}),this.currentNavigation.update(d=>(d.targetRouterState=l,d)),this.events.next(new Ia);let c=i.beforeActivateHandler.deferredHandle;return c?Qe(c.then(()=>a)):Q(a)}),it(a=>{new Py(e.routeReuseStrategy,i.targetRouterState,i.currentRouterState,l=>this.events.next(l),this.inputBindingEnabled).activate(this.rootContexts),s()&&(r=!0,this.currentNavigation.update(l=>(l.abort=YL,l)),this.lastSuccessfulNavigation.set(Pe(this.currentNavigation)),this.events.next(new In(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects))),this.titleStrategy?.updateTitle(a.targetRouterState.snapshot),a.resolve(!0))}),xe(Ex(o.signal).pipe(We(()=>!r&&!i.targetRouterState),it(()=>{this.cancelNavigationTransition(i,o.signal.reason+"",cn.Aborted)}))),it({complete:()=>{r=!0}}),xe(this.transitionAbortWithErrorSubject.pipe(it(a=>{throw a}))),Wr(()=>{o.abort(),r||this.cancelNavigationTransition(i,"",cn.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),mi(a=>{if(r=!0,this.destroyed)return i.resolve(!1),pt;if(wx(a))this.events.next(new ti(i.id,this.urlSerializer.serialize(i.extractedUrl),a.message,a.cancellationCode)),nL(a)?this.events.next(new Ta(a.url,a.navigationBehaviorOptions)):i.resolve(!1);else{let l=new vs(i.id,this.urlSerializer.serialize(i.extractedUrl),a,i.targetSnapshot??void 0);try{let c=Rt(this.environmentInjector,()=>this.navigationErrorHandler?.(l));if(c instanceof Ra){let{message:d,cancellationCode:p}=xm(this.urlSerializer,c);this.events.next(new ti(i.id,this.urlSerializer.serialize(i.extractedUrl),d,p)),this.events.next(new Ta(c.redirectTo,c.navigationBehaviorOptions))}else throw this.events.next(l),a}catch(c){this.options.resolveNavigationPromiseOnError?i.resolve(!1):i.reject(c)}}return pt}))}))}cancelNavigationTransition(e,i,r){let o=new ti(e.id,this.urlSerializer.serialize(e.extractedUrl),i,r);this.events.next(o),e.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let e=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),i=Pe(this.currentNavigation),r=i?.targetBrowserUrl??i?.extractedUrl;return e.toString()!==r?.toString()&&!i?.extras.skipLocationChange}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function QL(t){return t!==Ea}var Fx=new w("");var Lx=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:()=>u(ZL),providedIn:"root"})}return t})(),Im=class{shouldDetach(n){return!1}store(n,e){}shouldAttach(n){return!1}retrieve(n){return null}shouldReuseRoute(n,e){return n.routeConfig===e.routeConfig}shouldDestroyInjector(n){return!0}},ZL=(()=>{class t extends Im{static \u0275fac=(()=>{let e;return function(r){return(e||(e=en(t)))(r||t)}})();static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Om=(()=>{class t{urlSerializer=u(ho);options=u(go,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=u(Ki);urlHandlingStrategy=u(Rm);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new zn;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:e,initialUrl:i,targetBrowserUrl:r}){let o=e!==void 0?this.urlHandlingStrategy.merge(e,i):i,s=r??o;return s instanceof zn?this.urlSerializer.serialize(s):s}routerUrlState(e){return e?.targetBrowserUrl===void 0||e?.finalUrl===void 0?{}:{\u0275routerUrl:this.urlSerializer.serialize(e.finalUrl)}}commitTransition({targetRouterState:e,finalUrl:i,initialUrl:r}){i&&e?(this.currentUrlTree=i,this.rawUrlTree=this.urlHandlingStrategy.merge(i,r),this.routerState=e):this.rawUrlTree=r}routerState=gx(null,u(Ve));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:()=>u(XL),providedIn:"root"})}return t})(),XL=(()=>{class t extends Om{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(e){return this.location.subscribe(i=>{i.type==="popstate"&&setTimeout(()=>{e(i.url,i.state,"popstate",{replaceUrl:!0})})})}handleRouterEvent(e,i){e instanceof po?this.updateStateMemento():e instanceof Ji?this.commitTransition(i):e instanceof Mc?this.urlUpdateStrategy==="eager"&&(i.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(i),i)):e instanceof Ia?(this.commitTransition(i),this.urlUpdateStrategy==="deferred"&&!i.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(i),i)):e instanceof ti&&!hx(e)?this.restoreHistory(i):e instanceof vs?this.restoreHistory(i,!0):e instanceof In&&(this.lastSuccessfulId=e.id,this.currentPageId=this.browserPageId)}setBrowserUrl(e,i){let{extras:r,id:o}=i,{replaceUrl:s,state:a}=r;if(this.location.isCurrentPathEqualTo(e)||s){let l=this.browserPageId,c=S(S({},a),this.generateNgRouterState(o,l,i));this.location.replaceState(e,"",c)}else{let l=S(S({},a),this.generateNgRouterState(o,this.browserPageId+1,i));this.location.go(e,"",l)}}restoreHistory(e,i=!1){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,o=this.currentPageId-r;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===e.finalUrl&&o===0&&(this.resetInternalState(e),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(i&&this.resetInternalState(e),this.resetUrlToCurrentUrlTree())}resetInternalState({finalUrl:e}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,e??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(e,i,r){return this.canceledNavigationResolution==="computed"?S({navigationId:e,\u0275routerPageId:i},this.routerUrlState(r)):S({navigationId:e},this.routerUrlState(r))}static \u0275fac=(()=>{let e;return function(r){return(e||(e=en(t)))(r||t)}})();static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Nm(t,n){t.events.pipe(We(e=>e instanceof In||e instanceof ti||e instanceof vs||e instanceof Ji),ue(e=>e instanceof In||e instanceof Ji?0:(e instanceof ti?e.code===cn.Redirect||e.code===cn.SupersededByNewNavigation:!1)?2:1),We(e=>e!==2),hn(1)).subscribe(()=>{n()})}var Ae=(()=>{class t{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=u(If);stateManager=u(Om);options=u(go,{optional:!0})||{};pendingTasks=u(_r);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=u(Am);urlSerializer=u(ho);location=u(Ki);urlHandlingStrategy=u(Rm);injector=u(Ve);_events=new F;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=u(Lx);injectorCleanup=u(Fx,{optional:!0});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=u(bs,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!u(Pc,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:e=>{}}),this.subscribeToNavigationEvents()}eventsSubscription=new ke;subscribeToNavigationEvents(){let e=this.navigationTransitions.events.subscribe(i=>{try{let r=this.navigationTransitions.currentTransition,o=Pe(this.navigationTransitions.currentNavigation);if(r!==null&&o!==null){if(this.stateManager.handleRouterEvent(i,o),i instanceof ti&&i.code!==cn.Redirect&&i.code!==cn.SupersededByNewNavigation)this.navigated=!0;else if(i instanceof In)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(i instanceof Ta){let s=i.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(i.url,r.currentRawUrl),l=S({scroll:r.extras.scroll,browserUrl:r.extras.browserUrl,info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:r.extras.replaceUrl||this.urlUpdateStrategy==="eager"||QL(r.source)},s);this.scheduleNavigation(a,Ea,null,l,{resolve:r.resolve,reject:r.reject,promise:r.promise})}}ZF(i)&&this._events.next(i)}catch(r){this.navigationTransitions.transitionAbortWithErrorSubject.next(r)}});this.eventsSubscription.add(e)}resetRootComponentType(e){this.routerState.root.component=e,this.navigationTransitions.rootComponentType=e}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),Ea,this.stateManager.restoredState(),{replaceUrl:!0})}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((e,i,r,o)=>{this.navigateToSyncWithBrowser(e,r,i,o)})}navigateToSyncWithBrowser(e,i,r,o){let s=r?.navigationId?r:null,a=r?.\u0275routerUrl??e;if(r?.\u0275routerUrl&&(o=de(S({},o),{browserUrl:e})),r){let c=S({},r);delete c.navigationId,delete c.\u0275routerPageId,delete c.\u0275routerUrl,Object.keys(c).length!==0&&(o.state=c)}let l=this.parseUrl(a);this.scheduleNavigation(l,i,s,o).catch(c=>{this.disposed||this.injector.get(Xn)(c)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return Pe(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(e){this.config=e.map($y),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(e,i={}){let{relativeTo:r,queryParams:o,fragment:s,queryParamsHandling:a,preserveFragment:l}=i,c=l?this.currentUrlTree.fragment:s,d=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":d=S(S({},this.currentUrlTree.queryParams),o);break;case"preserve":d=this.currentUrlTree.queryParams;break;default:d=o||null}d!==null&&(d=this.removeEmptyProps(d));let p;try{let _=r?r.snapshot:this.routerState.snapshot.root;p=ux(_)}catch{(typeof e[0]!="string"||e[0][0]!=="/")&&(e=[]),p=this.currentUrlTree.root}return fx(p,e,d,c??null,this.urlSerializer)}navigateByUrl(e,i={skipLocationChange:!1}){let r=mo(e)?e:this.parseUrl(e),o=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(o,Ea,null,i)}navigate(e,i={skipLocationChange:!1}){return JL(e),this.navigateByUrl(this.createUrlTree(e,i),i)}serializeUrl(e){return this.urlSerializer.serialize(e)}parseUrl(e){try{return this.urlSerializer.parse(e)}catch{return this.console.warn(pi(4018,!1)),this.urlSerializer.parse("/")}}isActive(e,i){let r;if(i===!0?r=S({},nx):i===!1?r=S({},My):r=S(S({},My),i),mo(e))return GS(this.currentUrlTree,e,r);let o=this.parseUrl(e);return GS(this.currentUrlTree,o,r)}removeEmptyProps(e){return Object.entries(e).reduce((i,[r,o])=>(o!=null&&(i[r]=o),i),{})}scheduleNavigation(e,i,r,o,s){if(this.disposed)return Promise.resolve(!1);let a,l,c;s?(a=s.resolve,l=s.reject,c=s.promise):c=new Promise((p,_)=>{a=p,l=_});let d=this.pendingTasks.add();return Nm(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(d))}),this.navigationTransitions.handleNavigationRequest({source:i,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:e,extras:o,resolve:a,reject:l,promise:c,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),c.catch(Promise.reject.bind(Promise))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function JL(t){for(let n=0;n<t.length;n++)if(t[n]==null)throw new x(4008,!1)}var t2=(()=>{class t{router=u(Ae);stateManager=u(Om);fragment=T("");queryParams=T({});path=T("");serializer=u(ho);constructor(){this.updateState(),this.router.events?.subscribe(e=>{e instanceof In&&this.updateState()})}updateState(){let{fragment:e,root:i,queryParams:r}=this.stateManager.getCurrentUrlTree();this.fragment.set(e),this.queryParams.set(r),this.path.set(this.serializer.serialize(new zn(i)))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),er=(()=>{class t{router;route;tabIndexAttribute;renderer;el;locationStrategy;hrefAttributeValue=u(new Sn("href"),{optional:!0});reactiveHref=P_(()=>this.isAnchorElement?this.computeHref(this._urlTree()):this.hrefAttributeValue);get href(){return Pe(this.reactiveHref)}set href(e){this.reactiveHref.set(e)}set target(e){this._target.set(e)}get target(){return Pe(this._target)}_target=T(void 0);set queryParams(e){this._queryParams.set(e)}get queryParams(){return Pe(this._queryParams)}_queryParams=T(void 0,{equal:()=>!1});set fragment(e){this._fragment.set(e)}get fragment(){return Pe(this._fragment)}_fragment=T(void 0);set queryParamsHandling(e){this._queryParamsHandling.set(e)}get queryParamsHandling(){return Pe(this._queryParamsHandling)}_queryParamsHandling=T(void 0);set state(e){this._state.set(e)}get state(){return Pe(this._state)}_state=T(void 0,{equal:()=>!1});set info(e){this._info.set(e)}get info(){return Pe(this._info)}_info=T(void 0,{equal:()=>!1});set relativeTo(e){this._relativeTo.set(e)}get relativeTo(){return Pe(this._relativeTo)}_relativeTo=T(void 0);set preserveFragment(e){this._preserveFragment.set(e)}get preserveFragment(){return Pe(this._preserveFragment)}_preserveFragment=T(!1);set skipLocationChange(e){this._skipLocationChange.set(e)}get skipLocationChange(){return Pe(this._skipLocationChange)}_skipLocationChange=T(!1);set replaceUrl(e){this._replaceUrl.set(e)}get replaceUrl(){return Pe(this._replaceUrl)}_replaceUrl=T(!1);isAnchorElement;onChanges=new F;applicationErrorHandler=u(Xn);options=u(go,{optional:!0});reactiveRouterState=u(t2);constructor(e,i,r,o,s,a){this.router=e,this.route=i,this.tabIndexAttribute=r,this.renderer=o,this.el=s,this.locationStrategy=a;let l=s.nativeElement.tagName?.toLowerCase();this.isAnchorElement=l==="a"||l==="area"||!!(typeof customElements=="object"&&customElements.get(l)?.observedAttributes?.includes?.("href"))}setTabIndexIfNotOnNativeEl(e){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",e)}ngOnChanges(e){this.onChanges.next(this)}routerLinkInput=T(null);set routerLink(e){e==null?(this.routerLinkInput.set(null),this.setTabIndexIfNotOnNativeEl(null)):(mo(e)?this.routerLinkInput.set(e):this.routerLinkInput.set(Array.isArray(e)?e:[e]),this.setTabIndexIfNotOnNativeEl("0"))}onClick(e,i,r,o,s){let a=this._urlTree();if(a===null||this.isAnchorElement&&(e!==0||i||r||o||s||typeof this.target=="string"&&this.target!="_self"))return!0;let l={skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info};return this.router.navigateByUrl(a,l)?.catch(c=>{this.applicationErrorHandler(c)}),!this.isAnchorElement}ngOnDestroy(){}applyAttributeValue(e,i){let r=this.renderer,o=this.el.nativeElement;i!==null?r.setAttribute(o,e,i):r.removeAttribute(o,e)}_urlTree=dt(()=>{this.reactiveRouterState.path(),this._preserveFragment()&&this.reactiveRouterState.fragment();let e=r=>r==="preserve"||r==="merge";(e(this._queryParamsHandling())||e(this.options?.defaultQueryParamsHandling))&&this.reactiveRouterState.queryParams();let i=this.routerLinkInput();return i===null||!this.router.createUrlTree?null:mo(i)?i:this.router.createUrlTree(i,{relativeTo:this._relativeTo()!==void 0?this._relativeTo():this.route,queryParams:this._queryParams(),fragment:this._fragment(),queryParamsHandling:this._queryParamsHandling(),preserveFragment:this._preserveFragment()})},{equal:(e,i)=>this.computeHref(e)===this.computeHref(i)});get urlTree(){return Pe(this._urlTree)}computeHref(e){return e!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(e))??"":null}static \u0275fac=function(i){return new(i||t)(I(Ae),I(xt),Wl("tabindex"),I(Ue),I(z),I(Si))};static \u0275dir=V({type:t,selectors:[["","routerLink",""]],hostVars:2,hostBindings:function(i,r){i&1&&k("click",function(s){return r.onClick(s.button,s.ctrlKey,s.shiftKey,s.altKey,s.metaKey)}),i&2&&ae("href",r.reactiveHref(),Xv)("target",r._target())},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",H],skipLocationChange:[2,"skipLocationChange","skipLocationChange",H],replaceUrl:[2,"replaceUrl","replaceUrl",H],routerLink:"routerLink"},features:[et]})}return t})();var Lc=class{};var Bx=(()=>{class t{router;injector;preloadingStrategy;loader;subscription;constructor(e,i,r,o){this.router=e,this.injector=i,this.preloadingStrategy=r,this.loader=o}setUpPreloading(){this.subscription=this.router.events.pipe(We(e=>e instanceof In),Gr(()=>this.preload())).subscribe(()=>{})}preload(){return this.processRoutes(this.injector,this.router.config)}ngOnDestroy(){this.subscription?.unsubscribe()}processRoutes(e,i){let r=[];for(let o of i){o.providers&&!o._injector&&(o._injector=va(o.providers,e,""));let s=o._injector??e;o._loadedNgModuleFactory&&!o._loadedInjector&&(o._loadedInjector=o._loadedNgModuleFactory.create(s).injector);let a=o._loadedInjector??s;(o.loadChildren&&!o._loadedRoutes&&o.canLoad===void 0||o.loadComponent&&!o._loadedComponent)&&r.push(this.preloadConfig(s,o)),(o.children||o._loadedRoutes)&&r.push(this.processRoutes(a,o.children??o._loadedRoutes))}return Qe(r).pipe(Ur())}preloadConfig(e,i){return this.preloadingStrategy.preload(i,()=>{if(e.destroyed)return Q(null);let r;i.loadChildren&&i.canLoad===void 0?r=Qe(this.loader.loadChildren(e,i)):r=Q(null);let o=r.pipe(Xt(s=>s===null?Q(void 0):(i._loadedRoutes=s.routes,i._loadedInjector=s.injector,i._loadedNgModuleFactory=s.factory,this.processRoutes(s.injector??e,s.routes))));if(i.loadComponent&&!i._loadedComponent){let s=this.loader.loadComponent(e,i);return Qe([o,s]).pipe(Ur())}else return o})}static \u0275fac=function(i){return new(i||t)(A(Ae),A(Ve),A(Lc),A(km))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Vx=new w(""),n2=(()=>{class t{options;routerEventsSubscription;scrollEventsSubscription;lastId=0;lastSource=Ea;restoredId=0;store={};urlSerializer=u(ho);zone=u(U);viewportScroller=u(ry);transitions=u(Am);constructor(e){this.options=e,this.options.scrollPositionRestoration||="disabled",this.options.anchorScrolling||="disabled"}init(){this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.setHistoryScrollRestoration("manual"),this.routerEventsSubscription=this.createScrollEvents(),this.scrollEventsSubscription=this.consumeScrollEvents()}createScrollEvents(){return this.transitions.events.subscribe(e=>{e instanceof po?(this.store[this.lastId]=this.viewportScroller.getScrollPosition(),this.lastSource=e.navigationTrigger,this.restoredId=e.restoredState?e.restoredState.navigationId:0):e instanceof In?(this.lastId=e.id,this.scheduleScrollEvent(e,this.urlSerializer.parse(e.urlAfterRedirects).fragment)):e instanceof Ji&&e.code===xa.IgnoredSameUrlNavigation&&(this.lastSource=void 0,this.restoredId=0,this.scheduleScrollEvent(e,this.urlSerializer.parse(e.url).fragment))})}consumeScrollEvents(){return this.transitions.events.subscribe(e=>{if(!(e instanceof Ma)||e.scrollBehavior==="manual")return;let i={behavior:"instant"};e.position?this.options.scrollPositionRestoration==="top"?this.viewportScroller.scrollToPosition([0,0],i):this.options.scrollPositionRestoration==="enabled"&&this.viewportScroller.scrollToPosition(e.position,i):e.anchor&&this.options.anchorScrolling==="enabled"?this.viewportScroller.scrollToAnchor(e.anchor):this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.scrollToPosition([0,0])})}scheduleScrollEvent(e,i){let r=Pe(this.transitions.currentNavigation)?.extras.scroll;this.zone.runOutsideAngular(async()=>{await new Promise(o=>{setTimeout(o),typeof requestAnimationFrame<"u"&&requestAnimationFrame(o)}),this.zone.run(()=>{this.transitions.events.next(new Ma(e,this.lastSource==="popstate"?this.store[this.restoredId]:null,i,r))})})}ngOnDestroy(){this.routerEventsSubscription?.unsubscribe(),this.scrollEventsSubscription?.unsubscribe()}static \u0275fac=function(i){h_()};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})();function Qy(t,...n){return Zr([{provide:bs,multi:!0,useValue:t},[],{provide:xt,useFactory:jx},{provide:ec,multi:!0,useFactory:Hx},n.map(e=>e.\u0275providers)])}function jx(){return u(Ae).routerState.root}function Bc(t,n){return{\u0275kind:t,\u0275providers:n}}function Hx(){let t=u(ce);return n=>{let e=t.get(En);if(n!==e.components[0])return;let i=t.get(Ae),r=t.get(zx);t.get(Zy)===1&&i.initialNavigation(),t.get(Gx,null,{optional:!0})?.setUpPreloading(),t.get(Vx,null,{optional:!0})?.init(),i.resetRootComponentType(e.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe())}}var zx=new w("",{factory:()=>new F}),Zy=new w("",{factory:()=>1});function Ux(){let t=[{provide:uf,useValue:!0},{provide:Zy,useValue:0},Rf(()=>{let n=u(ce);return n.get(Y_,Promise.resolve()).then(()=>new Promise(i=>{let r=n.get(Ae),o=n.get(zx);Nm(r,()=>{i(!0)}),n.get(Am).afterPreactivation=()=>(i(!0),o.closed?Q(void 0):o),r.initialNavigation()}))})];return Bc(2,t)}function $x(){let t=[Rf(()=>{u(Ae).setUpLocationChangeListener()}),{provide:Zy,useValue:2}];return Bc(3,t)}var Gx=new w("");function Wx(t){return Bc(0,[{provide:Gx,useExisting:Bx},{provide:Lc,useExisting:t}])}function qx(){return Bc(8,[zy,{provide:Pc,useExisting:zy}])}function Kx(t){Di("NgRouterViewTransitions");let n=[{provide:Wy,useValue:Px},{provide:qy,useValue:S({skipNextTransition:!!t?.skipInitialTransition},t)}];return Bc(9,n)}var Yx=[Ki,{provide:ho,useClass:Mr},Ae,ys,{provide:xt,useFactory:jx},km,[]],wn=(()=>{class t{constructor(){}static forRoot(e,i){return{ngModule:t,providers:[Yx,[],{provide:bs,multi:!0,useValue:e},[],i?.errorHandler?{provide:Ky,useValue:i.errorHandler}:[],{provide:go,useValue:i||{}},i?.useHash?r2():o2(),i2(),i?.preloadingStrategy?Wx(i.preloadingStrategy).\u0275providers:[],i?.initialNavigation?s2(i):[],i?.bindToComponentInputs?qx().\u0275providers:[],i?.enableViewTransitions?Kx().\u0275providers:[],a2()]}}static forChild(e){return{ngModule:t,providers:[{provide:bs,multi:!0,useValue:e}]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({})}return t})();function i2(){return{provide:Vx,useFactory:()=>{let t=u(ry),n=u(go);return n.scrollOffset&&t.setOffset(n.scrollOffset),new n2(n)}}}function r2(){return{provide:Si,useClass:J_}}function o2(){return{provide:Si,useClass:$f}}function s2(t){return[t.initialNavigation==="disabled"?$x().\u0275providers:[],t.initialNavigation==="enabledBlocking"?Ux().\u0275providers:[]]}var Yy=new w("");function a2(){return[{provide:Yy,useFactory:Hx},{provide:ec,multi:!0,useExisting:Yy}]}var iM=(()=>{class t{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,i){this._renderer=e,this._elementRef=i}setProperty(e,i){this._renderer.setProperty(this._elementRef.nativeElement,e,i)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty("disabled",e)}static \u0275fac=function(i){return new(i||t)(I(Ue),I(z))};static \u0275dir=V({type:t})}return t})(),rM=(()=>{class t extends iM{static \u0275fac=(()=>{let e;return function(r){return(e||(e=en(t)))(r||t)}})();static \u0275dir=V({type:t,features:[He]})}return t})(),Tr=new w("");var l2={provide:Tr,useExisting:Ut(()=>ni),multi:!0};function c2(){let t=jn()?jn().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}var d2=new w(""),ni=(()=>{class t extends iM{_compositionMode;_composing=!1;constructor(e,i,r){super(e,i),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!c2())}writeValue(e){let i=e??"";this.setProperty("value",i)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static \u0275fac=function(i){return new(i||t)(I(Ue),I(z),I(d2,8))};static \u0275dir=V({type:t,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(i,r){i&1&&k("input",function(s){return r._handleInput(s.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(s){return r._compositionEnd(s.target.value)})},standalone:!1,features:[ze([l2]),He]})}return t})();function Jy(t){return t==null||eb(t)===0}function eb(t){return t==null?null:Array.isArray(t)||typeof t=="string"?t.length:t instanceof Set?t.size:null}var La=new w(""),tb=new w(""),u2=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,Fa=class{static min(n){return f2(n)}static max(n){return m2(n)}static required(n){return oM(n)}static requiredTrue(n){return p2(n)}static email(n){return h2(n)}static minLength(n){return g2(n)}static maxLength(n){return v2(n)}static pattern(n){return _2(n)}static nullValidator(n){return Fm()}static compose(n){return uM(n)}static composeAsync(n){return fM(n)}};function f2(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e<t?{min:{min:t,actual:n.value}}:null}}function m2(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e>t?{max:{max:t,actual:n.value}}:null}}function oM(t){return Jy(t.value)?{required:!0}:null}function p2(t){return t.value===!0?null:{required:!0}}function h2(t){return Jy(t.value)||u2.test(t.value)?null:{email:!0}}function g2(t){return n=>{let e=n.value?.length??eb(n.value);return e===null||e===0?null:e<t?{minlength:{requiredLength:t,actualLength:e}}:null}}function v2(t){return n=>{let e=n.value?.length??eb(n.value);return e!==null&&e>t?{maxlength:{requiredLength:t,actualLength:e}}:null}}function _2(t){if(!t)return Fm;let n,e;return typeof t=="string"?(e="",t.charAt(0)!=="^"&&(e+="^"),e+=t,t.charAt(t.length-1)!=="$"&&(e+="$"),n=new RegExp(e)):(e=t.toString(),n=t),i=>{if(Jy(i.value))return null;let r=i.value;return n.test(r)?null:{pattern:{requiredPattern:e,actualValue:r}}}}function Fm(t){return null}function sM(t){return t!=null}function aM(t){return ao(t)?Qe(t):t}function lM(t){let n={};return t.forEach(e=>{n=e!=null?S(S({},n),e):n}),Object.keys(n).length===0?null:n}function cM(t,n){return n.map(e=>e(t))}function y2(t){return!t.validate}function dM(t){return t.map(n=>y2(n)?n:e=>n.validate(e))}function uM(t){if(!t)return null;let n=t.filter(sM);return n.length==0?null:function(e){return lM(cM(e,n))}}function nb(t){return t!=null?uM(dM(t)):null}function fM(t){if(!t)return null;let n=t.filter(sM);return n.length==0?null:function(e){let i=cM(e,n).map(aM);return hl(i).pipe(ue(lM))}}function ib(t){return t!=null?fM(dM(t)):null}function Qx(t,n){return t===null?[n]:Array.isArray(t)?[...t,n]:[t,n]}function mM(t){return t._rawValidators}function pM(t){return t._rawAsyncValidators}function Xy(t){return t?Array.isArray(t)?t:[t]:[]}function Lm(t,n){return Array.isArray(t)?t.includes(n):t===n}function Zx(t,n){let e=Xy(n);return Xy(t).forEach(r=>{Lm(e,r)||e.push(r)}),e}function Xx(t,n){return Xy(n).filter(e=>!Lm(t,e))}var Bm=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(n){this._rawValidators=n||[],this._composedValidatorFn=nb(this._rawValidators)}_setAsyncValidators(n){this._rawAsyncValidators=n||[],this._composedAsyncValidatorFn=ib(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(n){this._onDestroyCallbacks.push(n)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(n=>n()),this._onDestroyCallbacks=[]}reset(n=void 0){this.control?.reset(n)}hasError(n,e){return this.control?this.control.hasError(n,e):!1}getError(n,e){return this.control?this.control.getError(n,e):null}},tr=class extends Bm{name;get formDirective(){return null}get path(){return null}},Ir=class extends Bm{_parent=null;name=null;valueAccessor=null},Vm=class{_cd;constructor(n){this._cd=n}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var ii=(()=>{class t extends Vm{constructor(e){super(e)}static \u0275fac=function(i){return new(i||t)(I(Ir,2))};static \u0275dir=V({type:t,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(i,r){i&2&&P("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)},standalone:!1,features:[He]})}return t})(),Tn=(()=>{class t extends Vm{constructor(e){super(e)}static \u0275fac=function(i){return new(i||t)(I(tr,10))};static \u0275dir=V({type:t,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["","formArray",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(i,r){i&2&&P("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)("ng-submitted",r.isSubmitted)},standalone:!1,features:[He]})}return t})();var Vc="VALID",Pm="INVALID",Na="PENDING",jc="DISABLED",vo=class{},jm=class extends vo{value;source;constructor(n,e){super(),this.value=n,this.source=e}},zc=class extends vo{pristine;source;constructor(n,e){super(),this.pristine=n,this.source=e}},Uc=class extends vo{touched;source;constructor(n,e){super(),this.touched=n,this.source=e}},Pa=class extends vo{status;source;constructor(n,e){super(),this.status=n,this.source=e}},Hm=class extends vo{source;constructor(n){super(),this.source=n}},zm=class extends vo{source;constructor(n){super(),this.source=n}};function hM(t){return(Km(t)?t.validators:t)||null}function b2(t){return Array.isArray(t)?nb(t):t||null}function gM(t,n){return(Km(n)?n.asyncValidators:t)||null}function C2(t){return Array.isArray(t)?ib(t):t||null}function Km(t){return t!=null&&!Array.isArray(t)&&typeof t=="object"}function w2(t,n,e){let i=t.controls;if(!(n?Object.keys(i):i).length)throw new x(1e3,"");if(!i[e])throw new x(1001,"")}function D2(t,n,e){t._forEachChild((i,r)=>{if(e[r]===void 0)throw new x(-1002,"")})}var Um=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(n,e){this._assignValidators(n),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(n){this._rawValidators=this._composedValidatorFn=n}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(n){this._rawAsyncValidators=this._composedAsyncValidatorFn=n}get parent(){return this._parent}get status(){return Pe(this.statusReactive)}set status(n){Pe(()=>this.statusReactive.set(n))}_status=dt(()=>this.statusReactive());statusReactive=T(void 0);get valid(){return this.status===Vc}get invalid(){return this.status===Pm}get pending(){return this.status===Na}get disabled(){return this.status===jc}get enabled(){return this.status!==jc}errors;get pristine(){return Pe(this.pristineReactive)}set pristine(n){Pe(()=>this.pristineReactive.set(n))}_pristine=dt(()=>this.pristineReactive());pristineReactive=T(!0);get dirty(){return!this.pristine}get touched(){return Pe(this.touchedReactive)}set touched(n){Pe(()=>this.touchedReactive.set(n))}_touched=dt(()=>this.touchedReactive());touchedReactive=T(!1);get untouched(){return!this.touched}_events=new F;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(n){this._assignValidators(n)}setAsyncValidators(n){this._assignAsyncValidators(n)}addValidators(n){this.setValidators(Zx(n,this._rawValidators))}addAsyncValidators(n){this.setAsyncValidators(Zx(n,this._rawAsyncValidators))}removeValidators(n){this.setValidators(Xx(n,this._rawValidators))}removeAsyncValidators(n){this.setAsyncValidators(Xx(n,this._rawAsyncValidators))}hasValidator(n){return Lm(this._rawValidators,n)}hasAsyncValidator(n){return Lm(this._rawAsyncValidators,n)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(n={}){let e=this.touched===!1;this.touched=!0;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsTouched(de(S({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new Uc(!0,i))}markAllAsDirty(n={}){this.markAsDirty({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(n))}markAllAsTouched(n={}){this.markAsTouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(n))}markAsUntouched(n={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=n.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:i})}),n.onlySelf||this._parent?._updateTouched(n,i),e&&n.emitEvent!==!1&&this._events.next(new Uc(!1,i))}markAsDirty(n={}){let e=this.pristine===!0;this.pristine=!1;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsDirty(de(S({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new zc(!1,i))}markAsPristine(n={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=n.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:n.emitEvent})}),n.onlySelf||this._parent?._updatePristine(n,i),e&&n.emitEvent!==!1&&this._events.next(new zc(!0,i))}markAsPending(n={}){this.status=Na;let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new Pa(this.status,e)),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.markAsPending(de(S({},n),{sourceControl:e}))}disable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=jc,this.errors=null,this._forEachChild(r=>{r.disable(de(S({},n),{onlySelf:!0}))}),this._updateValue();let i=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new jm(this.value,i)),this._events.next(new Pa(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(de(S({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=Vc,this._forEachChild(i=>{i.enable(de(S({},n),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent}),this._updateAncestors(de(S({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(n,e){n.onlySelf||(this._parent?.updateValueAndValidity(n),n.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(n){this._parent=n}getRawValue(){return this.value}updateValueAndValidity(n={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Vc||this.status===Na)&&this._runAsyncValidator(i,n.emitEvent)}let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new jm(this.value,e)),this._events.next(new Pa(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.updateValueAndValidity(de(S({},n),{sourceControl:e}))}_updateTreeValidity(n={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(n)),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?jc:Vc}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(n,e){if(this.asyncValidator){this.status=Na,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:n!==!1};let i=aM(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:n})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let n=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,n}return!1}setErrors(n,e={}){this.errors=n,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(n){let e=n;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((i,r)=>i&&i._find(r),this)}getError(n,e){let i=e?this.get(e):this;return i?.errors?i.errors[n]:null}hasError(n,e){return!!this.getError(n,e)}get root(){let n=this;for(;n._parent;)n=n._parent;return n}_updateControlsErrors(n,e,i){this.status=this._calculateStatus(),n&&this.statusChanges.emit(this.status),(n||i)&&this._events.next(new Pa(this.status,e)),this._parent&&this._parent._updateControlsErrors(n,e,i)}_initObservables(){this.valueChanges=new Z,this.statusChanges=new Z}_calculateStatus(){return this._allControlsDisabled()?jc:this.errors?Pm:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(Na)?Na:this._anyControlsHaveStatus(Pm)?Pm:Vc}_anyControlsHaveStatus(n){return this._anyControls(e=>e.status===n)}_anyControlsDirty(){return this._anyControls(n=>n.dirty)}_anyControlsTouched(){return this._anyControls(n=>n.touched)}_updatePristine(n,e){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,n.onlySelf||this._parent?._updatePristine(n,e),r&&this._events.next(new zc(this.pristine,e))}_updateTouched(n={},e){this.touched=this._anyControlsTouched(),this._events.next(new Uc(this.touched,e)),n.onlySelf||this._parent?._updateTouched(n,e)}_onDisabledChange=[];_registerOnCollectionChange(n){this._onCollectionChange=n}_setUpdateStrategy(n){Km(n)&&n.updateOn!=null&&(this._updateOn=n.updateOn)}_parentMarkedDirty(n){return!n&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(n){return null}_assignValidators(n){this._rawValidators=Array.isArray(n)?n.slice():n,this._composedValidatorFn=b2(this._rawValidators)}_assignAsyncValidators(n){this._rawAsyncValidators=Array.isArray(n)?n.slice():n,this._composedAsyncValidatorFn=C2(this._rawAsyncValidators)}},$m=class extends Um{constructor(n,e,i){super(hM(e),gM(i,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(n,e){return this.controls[n]?this.controls[n]:(this.controls[n]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(n,e,i={}){this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}removeControl(n,e={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(n,e,i={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],e&&this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}contains(n){return this.controls.hasOwnProperty(n)&&this.controls[n].enabled}setValue(n,e={}){D2(this,!0,n),Object.keys(n).forEach(i=>{w2(this,!0,i),this.controls[i].setValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(n,e={}){n!=null&&(Object.keys(n).forEach(i=>{let r=this.controls[i];r&&r.patchValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(n={},e={}){this._forEachChild((i,r)=>{i.reset(n?n[r]:null,de(S({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new zm(this))}getRawValue(){return this._reduceChildren({},(n,e,i)=>(n[i]=e.getRawValue(),n))}_syncPendingControls(){let n=this._reduceChildren(!1,(e,i)=>i._syncPendingControls()?!0:e);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){Object.keys(this.controls).forEach(e=>{let i=this.controls[e];i&&n(i,e)})}_setUpControls(){this._forEachChild(n=>{n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(n){for(let[e,i]of Object.entries(this.controls))if(this.contains(e)&&n(i))return!0;return!1}_reduceValue(){let n={};return this._reduceChildren(n,(e,i,r)=>((i.enabled||this.disabled)&&(e[r]=i.value),e))}_reduceChildren(n,e){let i=n;return this._forEachChild((r,o)=>{i=e(i,r,o)}),i}_allControlsDisabled(){for(let n of Object.keys(this.controls))if(this.controls[n].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(n){return this.controls.hasOwnProperty(n)?this.controls[n]:null}};var Ym=new w("",{factory:()=>rb}),rb="always";function E2(t,n){return[...n.path,t]}function Gm(t,n,e=rb){ob(t,n),n.valueAccessor.writeValue(t.value),(t.disabled||e==="always")&&n.valueAccessor.setDisabledState?.(t.disabled),x2(t,n),I2(t,n),M2(t,n),S2(t,n)}function Jx(t,n,e=!0){let i=()=>{};n?.valueAccessor?.registerOnChange(i),n?.valueAccessor?.registerOnTouched(i),qm(t,n),t&&(n._invokeOnDestroyCallbacks(),t._registerOnCollectionChange(()=>{}))}function Wm(t,n){t.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(n)})}function S2(t,n){if(n.valueAccessor.setDisabledState){let e=i=>{n.valueAccessor.setDisabledState(i)};t.registerOnDisabledChange(e),n._registerOnDestroy(()=>{t._unregisterOnDisabledChange(e)})}}function ob(t,n){let e=mM(t);n.validator!==null?t.setValidators(Qx(e,n.validator)):typeof e=="function"&&t.setValidators([e]);let i=pM(t);n.asyncValidator!==null?t.setAsyncValidators(Qx(i,n.asyncValidator)):typeof i=="function"&&t.setAsyncValidators([i]);let r=()=>t.updateValueAndValidity();Wm(n._rawValidators,r),Wm(n._rawAsyncValidators,r)}function qm(t,n){let e=!1;if(t!==null){if(n.validator!==null){let r=mM(t);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==n.validator);o.length!==r.length&&(e=!0,t.setValidators(o))}}if(n.asyncValidator!==null){let r=pM(t);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==n.asyncValidator);o.length!==r.length&&(e=!0,t.setAsyncValidators(o))}}}let i=()=>{};return Wm(n._rawValidators,i),Wm(n._rawAsyncValidators,i),e}function x2(t,n){n.valueAccessor.registerOnChange(e=>{t._pendingValue=e,t._pendingChange=!0,t._pendingDirty=!0,t.updateOn==="change"&&vM(t,n)})}function M2(t,n){n.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,t.updateOn==="blur"&&t._pendingChange&&vM(t,n),t.updateOn!=="submit"&&t.markAsTouched()})}function vM(t,n){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),n.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function I2(t,n){let e=(i,r)=>{n.valueAccessor.writeValue(i),r&&n.viewToModelUpdate(i)};t.registerOnChange(e),n._registerOnDestroy(()=>{t._unregisterOnChange(e)})}function _M(t,n){t==null,ob(t,n)}function T2(t,n){return qm(t,n)}function k2(t,n){if(!t.hasOwnProperty("model"))return!1;let e=t.model;return e.isFirstChange()?!0:!Object.is(n,e.currentValue)}function R2(t){return Object.getPrototypeOf(t.constructor)===rM}function yM(t,n){t._syncPendingControls(),n.forEach(e=>{let i=e.control;i.updateOn==="submit"&&i._pendingChange&&(e.viewToModelUpdate(i._pendingValue),i._pendingChange=!1)})}function A2(t,n){if(!n)return null;Array.isArray(n);let e,i,r;return n.forEach(o=>{o.constructor===ni?e=o:R2(o)?i=o:r=o}),r||i||e||null}function O2(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}var N2={provide:tr,useExisting:Ut(()=>Vt)},Hc=Promise.resolve(),Vt=(()=>{class t extends tr{callSetDisabledState;get submitted(){return Pe(this.submittedReactive)}_submitted=dt(()=>this.submittedReactive());submittedReactive=T(!1);_directives=new Set;form;ngSubmit=new Z;options;constructor(e,i,r){super(),this.callSetDisabledState=r,this.form=new $m({},nb(e),ib(i))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){Hc.then(()=>{let i=this._findContainer(e.path);e.control=i.registerControl(e.name,e.control),Gm(e.control,e,this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){Hc.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){Hc.then(()=>{let i=this._findContainer(e.path),r=new $m({});_M(r,e),i.registerControl(e.name,r),r.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){Hc.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,i){Hc.then(()=>{this.form.get(e.path).setValue(i)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),yM(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new Hm(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(i){return new(i||t)(I(La,10),I(tb,10),I(Ym,8))};static \u0275dir=V({type:t,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(i,r){i&1&&k("submit",function(s){return r.onSubmit(s)})("reset",function(){return r.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[ze([N2]),He]})}return t})();function eM(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function tM(t){return typeof t=="object"&&t!==null&&Object.keys(t).length===2&&"value"in t&&"disabled"in t}var bM=class extends Um{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(n=null,e,i){super(hM(e),gM(i,e)),this._applyFormState(n),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),Km(e)&&(e.nonNullable||e.initialValueIsDefault)&&(tM(n)?this.defaultValue=n.value:this.defaultValue=n)}setValue(n,e={}){this.value=this._pendingValue=n,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)}patchValue(n,e={}){this.setValue(n,e)}reset(n=this.defaultValue,e={}){this._applyFormState(n),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new zm(this))}_updateValue(){}_anyControls(n){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(n){this._onChange.push(n)}_unregisterOnChange(n){eM(this._onChange,n)}registerOnDisabledChange(n){this._onDisabledChange.push(n)}_unregisterOnDisabledChange(n){eM(this._onDisabledChange,n)}_forEachChild(n){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(n){tM(n)?(this.value=this._pendingValue=n.value,n.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=n}};var P2=t=>t instanceof bM;var F2={provide:Ir,useExisting:Ut(()=>Gn)},nM=Promise.resolve(),Gn=(()=>{class t extends Ir{_changeDetectorRef;callSetDisabledState;control=new bM;static ngAcceptInputType_isDisabled;_registered=!1;viewModel;name="";isDisabled;model;options;update=new Z;constructor(e,i,r,o,s,a){super(),this._changeDetectorRef=s,this.callSetDisabledState=a,this._parent=e,this._setValidators(i),this._setAsyncValidators(r),this.valueAccessor=A2(this,o)}ngOnChanges(e){if(this._checkForErrors(),!this._registered||"name"in e){if(this._registered&&(this._checkName(),this.formDirective)){let i=e.name.previousValue;this.formDirective.removeControl({name:i,path:this._getPath(i)})}this._setUpControl()}"isDisabled"in e&&this._updateDisabled(e),k2(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective?.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){Gm(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(e){nM.then(()=>{this.control.setValue(e,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(e){let i=e.isDisabled.currentValue,r=i!==0&&H(i);nM.then(()=>{r&&!this.control.disabled?this.control.disable():!r&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(e){return this._parent?E2(e,this._parent):[e]}static \u0275fac=function(i){return new(i||t)(I(tr,9),I(La,10),I(tb,10),I(Tr,10),I(De,8),I(Ym,8))};static \u0275dir=V({type:t,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:!1,features:[ze([F2]),He,et]})}return t})();var kn=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:!1})}return t})(),L2={provide:Tr,useExisting:Ut(()=>$c),multi:!0},$c=(()=>{class t extends rM{writeValue(e){let i=e??"";this.setProperty("value",i)}registerOnChange(e){this.onChange=i=>{e(i==""?null:parseFloat(i))}}static \u0275fac=(()=>{let e;return function(r){return(e||(e=en(t)))(r||t)}})();static \u0275dir=V({type:t,selectors:[["input","type","number","formControlName",""],["input","type","number","formControl",""],["input","type","number","ngModel",""]],hostBindings:function(i,r){i&1&&k("input",function(s){return r.onChange(s.target.value)})("blur",function(){return r.onTouched()})},standalone:!1,features:[ze([L2]),He]})}return t})();var B2=(()=>{class t extends tr{callSetDisabledState;get submitted(){return Pe(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=dt(()=>this._submittedReactive());_submittedReactive=T(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,i,r){super(),this.callSetDisabledState=r,this._setValidators(e),this._setAsyncValidators(i)}ngOnChanges(e){this.onChanges(e)}ngOnDestroy(){this.onDestroy()}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(qm(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(e){let i=this.form.get(e.path);return Gm(i,e,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),i}getControl(e){return this.form.get(e.path)}removeControl(e){Jx(e.control||null,e,!1),O2(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}updateModel(e,i){this.form.get(e.path).setValue(i)}onReset(){this.resetForm()}resetForm(e=void 0,i={}){this.form.reset(e,i),this._submittedReactive.set(!1)}onSubmit(e){return this.submitted=!0,yM(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new Hm(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let i=e.control,r=this.form.get(e.path);i!==r&&(Jx(i||null,e),P2(r)&&(Gm(r,e,this.callSetDisabledState),e.control=r))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let i=this.form.get(e.path);_M(i,e),i.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){let i=this.form?.get(e.path);i&&T2(i,e)&&i.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){ob(this.form,this),this._oldForm&&qm(this._oldForm,this)}_checkFormPresent(){this.form}static \u0275fac=function(i){return new(i||t)(I(La,10),I(tb,10),I(Ym,8))};static \u0275dir=V({type:t,features:[He,et]})}return t})();var V2={provide:tr,useExisting:Ut(()=>Gc)},Gc=(()=>{class t extends B2{form=null;ngSubmit=new Z;get control(){return this.form}static \u0275fac=(()=>{let e;return function(r){return(e||(e=en(t)))(r||t)}})();static \u0275dir=V({type:t,selectors:[["","formGroup",""]],hostBindings:function(i,r){i&1&&k("submit",function(s){return r.onSubmit(s)})("reset",function(){return r.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[ze([V2]),He]})}return t})();var j2=(()=>{class t{_validator=Fm;_onChange;_enabled;ngOnChanges(e){if(this.inputName in e){let i=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(i),this._validator=this._enabled?this.createValidator(i):Fm,this._onChange?.()}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e}enabled(e){return e!=null}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,features:[et]})}return t})();var H2={provide:La,useExisting:Ut(()=>kr),multi:!0};var kr=(()=>{class t extends j2{required;inputName="required";normalizeInput=H;createValidator=e=>oM;enabled(e){return e}static \u0275fac=(()=>{let e;return function(r){return(e||(e=en(t)))(r||t)}})();static \u0275dir=V({type:t,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(i,r){i&2&&ae("required",r._enabled?"":null)},inputs:{required:"required"},standalone:!1,features:[ze([H2]),He]})}return t})();var z2=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({})}return t})();var Mt=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:Ym,useValue:e.callSetDisabledState??rb}]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[z2]})}return t})();var U2=new w("cdk-dir-doc",{providedIn:"root",factory:()=>u(Y)}),$2=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function CM(t){let n=t?.toLowerCase()||"";return n==="auto"&&typeof navigator<"u"&&navigator?.language?$2.test(navigator.language)?"rtl":"ltr":n==="rtl"?"rtl":"ltr"}var Rn=(()=>{class t{get value(){return this.valueSignal()}valueSignal=T("ltr");change=new Z;constructor(){let e=u(U2,{optional:!0});if(e){let i=e.body?e.body.dir:null,r=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(CM(i||r||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var me=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({})}return t})();var G2=["*"];var W2=[[["","mat-card-avatar",""],["","matCardAvatar",""]],[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],"*"],q2=["[mat-card-avatar], [matCardAvatar]",`mat-card-title, mat-card-subtitle,
      [mat-card-title], [mat-card-subtitle],
      [matCardTitle], [matCardSubtitle]`,"*"],K2=new w("MAT_CARD_CONFIG"),dn=(()=>{class t{appearance;constructor(){let e=u(K2,{optional:!0});this.appearance=e?.appearance||"raised"}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(i,r){i&2&&P("mat-mdc-card-outlined",r.appearance==="outlined")("mdc-card--outlined",r.appearance==="outlined")("mat-mdc-card-filled",r.appearance==="filled")("mdc-card--filled",r.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:G2,decls:1,vars:0,template:function(i,r){i&1&&(Ie(),re(0))},styles:[`.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-elevated-container-elevation, var(--mat-sys-level1));
}
.mat-mdc-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px transparent;
  content: "";
  display: block;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--mat-card-outlined-container-color, var(--mat-sys-surface));
  border-radius: var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));
  border-width: var(--mat-card-outlined-outline-width, 1px);
  border-color: var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));
  box-shadow: var(--mat-card-outlined-container-elevation, var(--mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));
  border-radius: var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-filled-container-elevation, var(--mat-sys-level0));
}

.mdc-card__media {
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mdc-card__media::before {
  display: block;
  content: "";
}
.mdc-card__media:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.mdc-card__media:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.mat-mdc-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px;
}

.mat-mdc-card-title {
  font-family: var(--mat-card-title-text-font, var(--mat-sys-title-large-font));
  line-height: var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-size: var(--mat-card-title-text-size, var(--mat-sys-title-large-size));
  letter-spacing: var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));
  font-weight: var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));
  line-height: var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));
  font-size: var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));
  letter-spacing: var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));
  font-weight: var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight));
}

.mat-mdc-card-title,
.mat-mdc-card-subtitle {
  display: block;
  margin: 0;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle {
  padding: 16px 16px 0;
}

.mat-mdc-card-header {
  display: flex;
  padding: 16px 16px 0;
}

.mat-mdc-card-content {
  display: block;
  padding: 0 16px;
}
.mat-mdc-card-content:first-child {
  padding-top: 16px;
}
.mat-mdc-card-content:last-child {
  padding-bottom: 16px;
}

.mat-mdc-card-title-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mat-mdc-card-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-fit: cover;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title {
  line-height: normal;
}

.mat-mdc-card-sm-image {
  width: 80px;
  height: 80px;
}

.mat-mdc-card-md-image {
  width: 112px;
  height: 112px;
}

.mat-mdc-card-lg-image {
  width: 152px;
  height: 152px;
}

.mat-mdc-card-xl-image {
  width: 240px;
  height: 240px;
}

.mat-mdc-card-subtitle ~ .mat-mdc-card-title,
.mat-mdc-card-title ~ .mat-mdc-card-subtitle,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-title-group .mat-mdc-card-title,
.mat-mdc-card-title-group .mat-mdc-card-subtitle {
  padding-top: 0;
}

.mat-mdc-card-content > :last-child:not(.mat-mdc-card-footer) {
  margin-bottom: 0;
}

.mat-mdc-card-actions-align-end {
  justify-content: flex-end;
}
`],encapsulation:2,changeDetection:0})}return t})(),ri=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["mat-card-title"],["","mat-card-title",""],["","matCardTitle",""]],hostAttrs:[1,"mat-mdc-card-title"]})}return t})();var un=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["mat-card-content"]],hostAttrs:[1,"mat-mdc-card-content"]})}return t})();var nr=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-card-header"]],hostAttrs:[1,"mat-mdc-card-header"],ngContentSelectors:q2,decls:4,vars:0,consts:[[1,"mat-mdc-card-header-text"]],template:function(i,r){i&1&&(Ie(W2),re(0),gt(1,"div",0),re(2,1),Dt(),re(3,2))},encapsulation:2,changeDetection:0})}return t})();var fn=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[me]})}return t})();function Wc(t){return t.buttons===0||t.detail===0}function qc(t){let n=t.touches&&t.touches[0]||t.changedTouches&&t.changedTouches[0];return!!n&&n.identifier===-1&&(n.radiusX==null||n.radiusX===1)&&(n.radiusY==null||n.radiusY===1)}var sb;function wM(){if(sb==null){let t=typeof document<"u"?document.head:null;sb=!!(t&&(t.createShadowRoot||t.attachShadow))}return sb}function ab(t){if(wM()){let n=t.getRootNode?t.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function lb(){let t=typeof document<"u"&&document?document.activeElement:null;for(;t&&t.shadowRoot;){let n=t.shadowRoot.activeElement;if(n===t)break;t=n}return t}function tn(t){return t.composedPath?t.composedPath()[0]:t.target}var cb;try{cb=typeof Intl<"u"&&Intl.v8BreakIterator}catch{cb=!1}var Re=(()=>{class t{_platformId=u(ds);isBrowser=this._platformId?bS(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||cb)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Kc;function DM(){if(Kc==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>Kc=!0}))}finally{Kc=Kc||!1}return Kc}function Ba(t){return DM()?t:!!t.capture}function Va(t,n=0){return EM(t)?Number(t):arguments.length===2?n:0}function EM(t){return!isNaN(parseFloat(t))&&!isNaN(Number(t))}function Wn(t){return t instanceof z?t.nativeElement:t}var SM=new w("cdk-input-modality-detector-options"),xM={ignoreKeys:[18,17,224,91,16]},MM=650,db={passive:!0,capture:!0},IM=(()=>{class t{_platform=u(Re);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new It(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(i=>i===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=tn(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<MM||(this._modality.next(Wc(e)?"keyboard":"mouse"),this._mostRecentTarget=tn(e))};_onTouchstart=e=>{if(qc(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=tn(e)};constructor(){let e=u(U),i=u(Y),r=u(SM,{optional:!0});if(this._options=S(S({},xM),r),this.modalityDetected=this._modality.pipe(_l(1)),this.modalityChanged=this.modalityDetected.pipe(nu()),this._platform.isBrowser){let o=u(ct).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[o.listen(i,"keydown",this._onKeydown,db),o.listen(i,"mousedown",this._onMousedown,db),o.listen(i,"touchstart",this._onTouchstart,db)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Yc=(function(t){return t[t.IMMEDIATE=0]="IMMEDIATE",t[t.EVENTUAL=1]="EVENTUAL",t})(Yc||{}),TM=new w("cdk-focus-monitor-default-options"),Qm=Ba({passive:!0,capture:!0}),qn=(()=>{class t{_ngZone=u(U);_platform=u(Re);_inputModalityDetector=u(IM);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=u(Y);_stopInputModalityDetector=new F;constructor(){let e=u(TM,{optional:!0});this._detectionMode=e?.detectionMode||Yc.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let i=tn(e);for(let r=i;r;r=r.parentElement)e.type==="focus"?this._onFocus(e,r):this._onBlur(e,r)};monitor(e,i=!1){let r=Wn(e);if(!this._platform.isBrowser||r.nodeType!==1)return Q();let o=ab(r)||this._document,s=this._elementInfo.get(r);if(s)return i&&(s.checkChildren=!0),s.subject;let a={checkChildren:i,subject:new F,rootNode:o};return this._elementInfo.set(r,a),this._registerGlobalListeners(a),a.subject}stopMonitoring(e){let i=Wn(e),r=this._elementInfo.get(i);r&&(r.subject.complete(),this._setClasses(i),this._elementInfo.delete(i),this._removeGlobalListeners(r))}focusVia(e,i,r){let o=Wn(e),s=this._document.activeElement;o===s?this._getClosestElementsInfo(o).forEach(([a,l])=>this._originChanged(a,i,l)):(this._setOrigin(i),typeof o.focus=="function"&&o.focus(r))}ngOnDestroy(){this._elementInfo.forEach((e,i)=>this.stopMonitoring(i))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===Yc.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,i){e.classList.toggle("cdk-focused",!!i),e.classList.toggle("cdk-touch-focused",i==="touch"),e.classList.toggle("cdk-keyboard-focused",i==="keyboard"),e.classList.toggle("cdk-mouse-focused",i==="mouse"),e.classList.toggle("cdk-program-focused",i==="program")}_setOrigin(e,i=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&i,this._detectionMode===Yc.IMMEDIATE){clearTimeout(this._originTimeoutId);let r=this._originFromTouchInteraction?MM:1;this._originTimeoutId=setTimeout(()=>this._origin=null,r)}})}_onFocus(e,i){let r=this._elementInfo.get(i),o=tn(e);!r||!r.checkChildren&&i!==o||this._originChanged(i,this._getFocusOrigin(o),r)}_onBlur(e,i){let r=this._elementInfo.get(i);!r||r.checkChildren&&e.relatedTarget instanceof Node&&i.contains(e.relatedTarget)||(this._setClasses(i),this._emitOrigin(r,null))}_emitOrigin(e,i){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(i))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let i=e.rootNode,r=this._rootNodeFocusListenerCount.get(i)||0;r||this._ngZone.runOutsideAngular(()=>{i.addEventListener("focus",this._rootNodeFocusAndBlurListener,Qm),i.addEventListener("blur",this._rootNodeFocusAndBlurListener,Qm)}),this._rootNodeFocusListenerCount.set(i,r+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(xe(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(e){let i=e.rootNode;if(this._rootNodeFocusListenerCount.has(i)){let r=this._rootNodeFocusListenerCount.get(i);r>1?this._rootNodeFocusListenerCount.set(i,r-1):(i.removeEventListener("focus",this._rootNodeFocusAndBlurListener,Qm),i.removeEventListener("blur",this._rootNodeFocusAndBlurListener,Qm),this._rootNodeFocusListenerCount.delete(i))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,i,r){this._setClasses(e,i),this._emitOrigin(r,i),this._lastFocusOrigin=i}_getClosestElementsInfo(e){let i=[];return this._elementInfo.forEach((r,o)=>{(o===e||r.checkChildren&&o.contains(e))&&i.push([o,r])}),i}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:i,mostRecentModality:r}=this._inputModalityDetector;if(r!=="mouse"||!i||i===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return!1;let o=e.labels;if(o){for(let s=0;s<o.length;s++)if(o[s].contains(i))return!0}return!1}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Zm=new WeakMap,ft=(()=>{class t{_appRef;_injector=u(ce);_environmentInjector=u(Ve);load(e){let i=this._appRef=this._appRef||this._injector.get(En),r=Zm.get(i);r||(r={loaders:new Set,refs:[]},Zm.set(i,r),i.onDestroy(()=>{Zm.get(i)?.refs.forEach(o=>o.destroy()),Zm.delete(i)})),r.loaders.has(e)||(r.loaders.add(e),r.refs.push(Hf(e,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Cs=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  left: 0;
}
[dir=rtl] .cdk-visually-hidden {
  left: auto;
  right: 0;
}
`],encapsulation:2,changeDetection:0})}return t})(),Xm;function Y2(){if(Xm===void 0&&(Xm=null,typeof window<"u")){let t=window;t.trustedTypes!==void 0&&(Xm=t.trustedTypes.createPolicy("angular#components",{createHTML:n=>n}))}return Xm}function ws(t){return Y2()?.createHTML(t)||t}function kM(t,n,e){let i=e.sanitize(Ot.HTML,n);t.innerHTML=ws(i||"")}function ja(t){return Array.isArray(t)?t:[t]}var RM=new Set,Ds,Ha=(()=>{class t{_platform=u(Re);_nonce=u(us,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):Z2}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&Q2(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Q2(t,n){if(!RM.has(t))try{Ds||(Ds=document.createElement("style"),n&&Ds.setAttribute("nonce",n),Ds.setAttribute("type","text/css"),document.head.appendChild(Ds)),Ds.sheet&&(Ds.sheet.insertRule(`@media ${t} {body{ }}`,0),RM.add(t))}catch(e){console.error(e)}}function Z2(t){return{matches:t==="all"||t==="",media:t,addListener:()=>{},removeListener:()=>{}}}var Qc=(()=>{class t{_mediaMatcher=u(Ha);_zone=u(U);_queries=new Map;_destroySubject=new F;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return AM(ja(e)).some(r=>this._registerQuery(r).mql.matches)}observe(e){let r=AM(ja(e)).map(s=>this._registerQuery(s).observable),o=Ys(r);return o=$r(o.pipe(hn(1)),o.pipe(_l(1),gl(0))),o.pipe(ue(s=>{let a={matches:!1,breakpoints:{}};return s.forEach(({matches:l,query:c})=>{a.matches=a.matches||l,a.breakpoints[c]=l}),a}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let i=this._mediaMatcher.matchMedia(e),o={observable:new ye(s=>{let a=l=>this._zone.run(()=>s.next(l));return i.addListener(a),()=>{i.removeListener(a)}}).pipe(zt(i),ue(({matches:s})=>({query:e,matches:s})),xe(this._destroySubject)),mql:i};return this._queries.set(e,o),o}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function AM(t){return t.map(n=>n.split(",")).reduce((n,e)=>n.concat(e)).map(n=>n.trim())}var X2=(()=>{class t{create(e){return typeof MutationObserver>"u"?null:new MutationObserver(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Jm=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({providers:[X2]})}return t})();var PM=new w("liveAnnouncerElement",{providedIn:"root",factory:()=>null}),FM=new w("LIVE_ANNOUNCER_DEFAULT_OPTIONS"),J2=0,Zc=(()=>{class t{_ngZone=u(U);_defaultOptions=u(FM,{optional:!0});_liveElement;_document=u(Y);_sanitizer=u(Cc);_previousTimeout;_currentPromise;_currentResolve;constructor(){let e=u(PM,{optional:!0});this._liveElement=e||this._createLiveElement()}announce(e,...i){let r=this._defaultOptions,o,s;return i.length===1&&typeof i[0]=="number"?s=i[0]:[o,s]=i,this.clear(),clearTimeout(this._previousTimeout),o||(o=r&&r.politeness?r.politeness:"polite"),s==null&&r&&(s=r.duration),this._liveElement.setAttribute("aria-live",o),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(a=>this._currentResolve=a)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!e||typeof e=="string"?this._liveElement.textContent=e:kM(this._liveElement,e,this._sanitizer),typeof s=="number"&&(this._previousTimeout=setTimeout(()=>this.clear(),s)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent="")}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){let e="cdk-live-announcer-element",i=this._document.getElementsByClassName(e),r=this._document.createElement("div");for(let o=0;o<i.length;o++)i[o].remove();return r.classList.add(e),r.classList.add("cdk-visually-hidden"),r.setAttribute("aria-atomic","true"),r.setAttribute("aria-live","polite"),r.id=`cdk-live-announcer-${J2++}`,this._document.body.appendChild(r),r}_exposeAnnouncerToModals(e){let i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<i.length;r++){let o=i[r],s=o.getAttribute("aria-owns");s?s.indexOf(e)===-1&&o.setAttribute("aria-owns",s+" "+e):o.setAttribute("aria-owns",e)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var bo=(function(t){return t[t.NONE=0]="NONE",t[t.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",t[t.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",t})(bo||{}),OM="cdk-high-contrast-black-on-white",NM="cdk-high-contrast-white-on-black",ub="cdk-high-contrast-active",LM=(()=>{class t{_platform=u(Re);_hasCheckedHighContrastMode=!1;_document=u(Y);_breakpointSubscription;constructor(){this._breakpointSubscription=u(Qc).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return bo.NONE;let e=this._document.createElement("div");e.style.backgroundColor="rgb(1,2,3)",e.style.position="absolute",this._document.body.appendChild(e);let i=this._document.defaultView||window,r=i&&i.getComputedStyle?i.getComputedStyle(e):null,o=(r&&r.backgroundColor||"").replace(/ /g,"");switch(e.remove(),o){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return bo.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return bo.BLACK_ON_WHITE}return bo.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let e=this._document.body.classList;e.remove(ub,OM,NM),this._hasCheckedHighContrastMode=!0;let i=this.getHighContrastMode();i===bo.BLACK_ON_WHITE?e.add(ub,OM):i===bo.WHITE_ON_BLACK&&e.add(ub,NM)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),fb=(()=>{class t{constructor(){u(LM)._applyBodyHighContrastModeCssClasses()}static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[Jm]})}return t})();var eB=200,ep=class{_letterKeyStream=new F;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new F;selectedItem=this._selectedItem;constructor(n,e){let i=typeof e?.debounceInterval=="number"?e.debounceInterval:eB;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(n),this._setupKeyHandler(i)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(n){this._selectedItemIndex=n}setItems(n){this._items=n}handleKey(n){let e=n.keyCode;n.key&&n.key.length===1?this._letterKeyStream.next(n.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(n){this._letterKeyStream.pipe(it(e=>this._pressedLetters.push(e)),gl(n),We(()=>this._pressedLetters.length>0),ue(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{for(let i=1;i<this._items.length+1;i++){let r=(this._selectedItemIndex+i)%this._items.length,o=this._items[r];if(!this._skipPredicateFn?.(o)&&o.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(o);break}}this._pressedLetters=[]})}};function mn(t,...n){return n.length?n.some(e=>t[e]):t.altKey||t.shiftKey||t.ctrlKey||t.metaKey}var za=class{_items;_activeItemIndex=T(-1);_activeItem=T(null);_wrap=!1;_typeaheadSubscription=ke.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=n=>n.disabled;constructor(n,e){this._items=n,n instanceof Jn?this._itemChangesSubscription=n.changes.subscribe(i=>this._itemsChanged(i.toArray())):Gi(n)&&(this._effectRef=bn(()=>this._itemsChanged(n()),{injector:e}))}tabOut=new F;change=new F;skipPredicate(n){return this._skipPredicateFn=n,this}withWrap(n=!0){return this._wrap=n,this}withVerticalOrientation(n=!0){return this._vertical=n,this}withHorizontalOrientation(n){return this._horizontal=n,this}withAllowedModifierKeys(n){return this._allowedModifierKeys=n,this}withTypeAhead(n=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new ep(e,{debounceInterval:typeof n=="number"?n:void 0,skipPredicate:i=>this._skipPredicateFn(i)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(i=>{this.setActiveItem(i)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(n=!0){return this._homeAndEnd=n,this}withPageUpDown(n=!0,e=10){return this._pageUpAndDown={enabled:n,delta:e},this}setActiveItem(n){let e=this._activeItem();this.updateActiveItem(n),this._activeItem()!==e&&this.change.next(this._activeItemIndex())}onKeydown(n){let e=n.keyCode,r=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!n[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&r){this.setNextItemActive();break}else return;case 38:if(this._vertical&&r){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&r){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&r){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&r){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&r){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()+this._pageUpAndDown.delta,s=this._getItemsArray().length;this._setActiveItemByIndex(o<s?o:s-1,-1);break}else return;default:(r||mn(n,"shiftKey"))&&this._typeahead?.handleKey(n);return}this._typeahead?.reset(),n.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(n){let e=this._getItemsArray(),i=typeof n=="number"?n:e.indexOf(n),r=e[i];this._activeItem.set(r??null),this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(n){this._wrap?this._setActiveInWrapMode(n):this._setActiveInDefaultMode(n)}_setActiveInWrapMode(n){let e=this._getItemsArray();for(let i=1;i<=e.length;i++){let r=(this._activeItemIndex()+n*i+e.length)%e.length,o=e[r];if(!this._skipPredicateFn(o)){this.setActiveItem(r);return}}}_setActiveInDefaultMode(n){this._setActiveItemByIndex(this._activeItemIndex()+n,n)}_setActiveItemByIndex(n,e){let i=this._getItemsArray();if(i[n]){for(;this._skipPredicateFn(i[n]);)if(n+=e,!i[n])return;this.setActiveItem(n)}}_getItemsArray(){return Gi(this._items)?this._items():this._items instanceof Jn?this._items.toArray():this._items}_itemsChanged(n){this._typeahead?.setItems(n);let e=this._activeItem();if(e){let i=n.indexOf(e);i>-1&&i!==this._activeItemIndex()&&(this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i))}}};var ed=class extends za{setActiveItem(n){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(n),this.activeItem&&this.activeItem.setActiveStyles()}};var ip=class extends za{_origin="program";setFocusOrigin(n){return this._origin=n,this}setActiveItem(n){super.setActiveItem(n),this.activeItem&&this.activeItem.focus(this._origin)}};var mb={},Ze=class t{_appId=u(oo);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(n,e=!1){return this._appId!=="ng"&&(n+=this._appId),mb.hasOwnProperty(n)||(mb[n]=0),`${n}${e?t._infix+"-":""}${mb[n]++}`}static \u0275fac=function(e){return new(e||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})};var jM=" ";function gb(t,n,e){let i=op(t,n);e=e.trim(),!i.some(r=>r.trim()===e)&&(i.push(e),t.setAttribute(n,i.join(jM)))}function sp(t,n,e){let i=op(t,n);e=e.trim();let r=i.filter(o=>o!==e);r.length?t.setAttribute(n,r.join(jM)):t.removeAttribute(n)}function op(t,n){return t.getAttribute(n)?.match(/\S+/g)??[]}var HM="cdk-describedby-message",rp="cdk-describedby-host",hb=0,zM=(()=>{class t{_platform=u(Re);_document=u(Y);_messageRegistry=new Map;_messagesContainer=null;_id=`${hb++}`;constructor(){u(ft).load(Cs),this._id=u(oo)+"-"+hb++}describe(e,i,r){if(!this._canBeDescribed(e,i))return;let o=pb(i,r);typeof i!="string"?(VM(i,this._id),this._messageRegistry.set(o,{messageElement:i,referenceCount:0})):this._messageRegistry.has(o)||this._createMessageElement(i,r),this._isElementDescribedByMessage(e,o)||this._addMessageReference(e,o)}removeDescription(e,i,r){if(!i||!this._isElementNode(e))return;let o=pb(i,r);if(this._isElementDescribedByMessage(e,o)&&this._removeMessageReference(e,o),typeof i=="string"){let s=this._messageRegistry.get(o);s&&s.referenceCount===0&&this._deleteMessageElement(o)}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null)}ngOnDestroy(){let e=this._document.querySelectorAll(`[${rp}="${this._id}"]`);for(let i=0;i<e.length;i++)this._removeCdkDescribedByReferenceIds(e[i]),e[i].removeAttribute(rp);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear()}_createMessageElement(e,i){let r=this._document.createElement("div");VM(r,this._id),r.textContent=e,i&&r.setAttribute("role",i),this._createMessagesContainer(),this._messagesContainer.appendChild(r),this._messageRegistry.set(pb(e,i),{messageElement:r,referenceCount:0})}_deleteMessageElement(e){this._messageRegistry.get(e)?.messageElement?.remove(),this._messageRegistry.delete(e)}_createMessagesContainer(){if(this._messagesContainer)return;let e="cdk-describedby-message-container",i=this._document.querySelectorAll(`.${e}[platform="server"]`);for(let o=0;o<i.length;o++)i[o].remove();let r=this._document.createElement("div");r.style.visibility="hidden",r.classList.add(e),r.classList.add("cdk-visually-hidden"),this._platform.isBrowser||r.setAttribute("platform","server"),this._document.body.appendChild(r),this._messagesContainer=r}_removeCdkDescribedByReferenceIds(e){let i=op(e,"aria-describedby").filter(r=>r.indexOf(HM)!=0);e.setAttribute("aria-describedby",i.join(" "))}_addMessageReference(e,i){let r=this._messageRegistry.get(i);gb(e,"aria-describedby",r.messageElement.id),e.setAttribute(rp,this._id),r.referenceCount++}_removeMessageReference(e,i){let r=this._messageRegistry.get(i);r.referenceCount--,sp(e,"aria-describedby",r.messageElement.id),e.removeAttribute(rp)}_isElementDescribedByMessage(e,i){let r=op(e,"aria-describedby"),o=this._messageRegistry.get(i),s=o&&o.messageElement.id;return!!s&&r.indexOf(s)!=-1}_canBeDescribed(e,i){if(!this._isElementNode(e))return!1;if(i&&typeof i=="object")return!0;let r=i==null?"":`${i}`.trim(),o=e.getAttribute("aria-label");return r?!o||o.trim()!==r:!1}_isElementNode(e){return e.nodeType===this._document.ELEMENT_NODE}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function pb(t,n){return typeof t=="string"?`${n||""}/${t}`:t}function VM(t,n){t.id||(t.id=`${HM}-${n}-${hb++}`)}function yt(t){return t==null?"":typeof t=="string"?t:`${t}px`}function oi(t){return t!=null&&`${t}`!="false"}var Es;function UM(){if(Es==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return Es=!1,Es;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)Es=!0;else{let t=Element.prototype.scrollTo;t?Es=!/\{\s*\[native code\]\s*\}/.test(t.toString()):Es=!1}}return Es}function vb(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var Ua,$M=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function _b(){if(Ua)return Ua;if(typeof document!="object"||!document)return Ua=new Set($M),Ua;let t=document.createElement("input");return Ua=new Set($M.filter(n=>(t.setAttribute("type",n),t.type===n))),Ua}var yb=class{_box;_destroyed=new F;_resizeSubject=new F;_resizeObserver;_elementObservables=new Map;constructor(n){this._box=n,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(n){return this._elementObservables.has(n)||this._elementObservables.set(n,new ye(e=>{let i=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(n,{box:this._box}),()=>{this._resizeObserver?.unobserve(n),i.unsubscribe(),this._elementObservables.delete(n)}}).pipe(We(e=>e.some(i=>i.target===n)),ou({bufferSize:1,refCount:!0}),xe(this._destroyed))),this._elementObservables.get(n)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},GM=(()=>{class t{_cleanupErrorListener;_observers=new Map;_ngZone=u(U);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,i){let r=i?.box||"content-box";return this._observers.has(r)||this._observers.set(r,new yb(r)),this._observers.get(r).observe(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var WM={XSmall:"(max-width: 599.98px)",Small:"(min-width: 600px) and (max-width: 959.98px)",Medium:"(min-width: 960px) and (max-width: 1279.98px)",Large:"(min-width: 1280px) and (max-width: 1919.98px)",XLarge:"(min-width: 1920px)",Handset:"(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",Tablet:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",Web:"(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)",TabletPortrait:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",WebPortrait:"(min-width: 840px) and (orientation: portrait)",HandsetLandscape:"(max-width: 959.98px) and (orientation: landscape)",TabletLandscape:"(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",WebLandscape:"(min-width: 1280px) and (orientation: landscape)"};var tB=new w("MATERIAL_ANIMATIONS"),qM=null;function td(){return u(tB,{optional:!0})?.animationsDisabled||u(so,{optional:!0})==="NoopAnimations"?"di-disabled":(qM??=u(Ha).matchMedia("(prefers-reduced-motion)").matches,qM?"reduced-motion":"enabled")}function tt(){return td()!=="enabled"}var nB=["notch"],iB=["matFormFieldNotchedOutline",""],rB=["*"],KM=["iconPrefixContainer"],YM=["textPrefixContainer"],QM=["iconSuffixContainer"],ZM=["textSuffixContainer"],oB=["textField"],sB=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],aB=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function lB(t,n){t&1&&W(0,"span",21)}function cB(t,n){if(t&1&&(f(0,"label",20),re(1,1),he(2,lB,1,0,"span",21),m()),t&2){let e=E(2);b("floating",e._shouldLabelFloat())("monitorResize",e._hasOutline())("id",e._labelId),ae("for",e._control.disableAutomaticLabeling?null:e._control.id),h(2),ge(!e.hideRequiredMarker&&e._control.required?2:-1)}}function dB(t,n){if(t&1&&he(0,cB,3,5,"label",20),t&2){let e=E();ge(e._hasFloatingLabel()?0:-1)}}function uB(t,n){t&1&&W(0,"div",7)}function fB(t,n){}function mB(t,n){if(t&1&&j(0,fB,0,0,"ng-template",13),t&2){E(2);let e=at(1);b("ngTemplateOutlet",e)}}function pB(t,n){if(t&1&&(f(0,"div",9),he(1,mB,1,1,null,13),m()),t&2){let e=E();b("matFormFieldNotchedOutlineOpen",e._shouldLabelFloat()),h(),ge(e._forceDisplayInfixLabel()?-1:1)}}function hB(t,n){t&1&&(f(0,"div",10,2),re(2,2),m())}function gB(t,n){t&1&&(f(0,"div",11,3),re(2,3),m())}function vB(t,n){}function _B(t,n){if(t&1&&j(0,vB,0,0,"ng-template",13),t&2){E();let e=at(1);b("ngTemplateOutlet",e)}}function yB(t,n){t&1&&(f(0,"div",14,4),re(2,4),m())}function bB(t,n){t&1&&(f(0,"div",15,5),re(2,5),m())}function CB(t,n){t&1&&W(0,"div",16)}function wB(t,n){t&1&&(f(0,"div",18),re(1,6),m())}function DB(t,n){if(t&1&&(f(0,"mat-hint",22),g(1),m()),t&2){let e=E(2);b("id",e._hintLabelId),h(),ee(e.hintLabel)}}function EB(t,n){if(t&1&&(f(0,"div",19),he(1,DB,2,2,"mat-hint",22),re(2,7),W(3,"div",23),re(4,8),m()),t&2){let e=E();h(),ge(e.hintLabel?1:-1)}}var jt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["mat-label"]]})}return t})(),bb=new w("MatError"),Cb=(()=>{class t{id=u(Ze).getId("mat-mdc-error-");constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["mat-error"],["","matError",""]],hostAttrs:[1,"mat-mdc-form-field-error","mat-mdc-form-field-bottom-align"],hostVars:1,hostBindings:function(i,r){i&2&&Vn("id",r.id)},inputs:{id:"id"},features:[ze([{provide:bb,useExisting:t}])]})}return t})(),nd=(()=>{class t{align="start";id=u(Ze).getId("mat-mdc-hint-");static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(i,r){i&2&&(Vn("id",r.id),ae("align",null),P("mat-mdc-form-field-hint-end",r.align==="end"))},inputs:{align:"align",id:"id"}})}return t})(),rI=new w("MatPrefix");var wb=new w("MatSuffix"),id=(()=>{class t{set _isTextSelector(e){this._isText=!0}_isText=!1;static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["","matSuffix",""],["","matIconSuffix",""],["","matTextSuffix",""]],inputs:{_isTextSelector:[0,"matTextSuffix","_isTextSelector"]},features:[ze([{provide:wb,useExisting:t}])]})}return t})(),oI=new w("FloatingLabelParent"),XM=(()=>{class t{_elementRef=u(z);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=u(GM);_ngZone=u(U);_parent=u(oI);_resizeSubscription=new ke;constructor(){}ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return SB(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize())})}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(i,r){i&2&&P("mdc-floating-label--float-above",r.floating)},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return t})();function SB(t){let n=t;if(n.offsetParent!==null)return n.scrollWidth;let e=n.cloneNode(!0);e.style.setProperty("position","absolute"),e.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(e);let i=e.scrollWidth;return e.remove(),i}var JM="mdc-line-ripple--active",ap="mdc-line-ripple--deactivating",eI=(()=>{class t{_elementRef=u(z);_cleanupTransitionEnd;constructor(){let e=u(U),i=u(Ue);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=i.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd)})}activate(){let e=this._elementRef.nativeElement.classList;e.remove(ap),e.add(JM)}deactivate(){this._elementRef.nativeElement.classList.add(ap)}_handleTransitionEnd=e=>{let i=this._elementRef.nativeElement.classList,r=i.contains(ap);e.propertyName==="opacity"&&r&&i.remove(JM,ap)};ngOnDestroy(){this._cleanupTransitionEnd()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return t})(),tI=(()=>{class t{_elementRef=u(z);_ngZone=u(U);open=!1;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,i=e.querySelector(".mdc-floating-label");i?(e.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(i.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>i.style.transitionDuration="")}))):e.classList.add("mdc-notched-outline--no-label")}_setNotchWidth(e){let i=this._notch.nativeElement;!this.open||!e?i.style.width="":i.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(e){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${e}px)`)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(i,r){if(i&1&&$e(nB,5),i&2){let o;q(o=K())&&(r._notch=o.first)}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(i,r){i&2&&P("mdc-notched-outline--notched",r.open)},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},attrs:iB,ngContentSelectors:rB,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(i,r){i&1&&(Ie(),vt(0,"div",1),gt(1,"div",2,0),re(3),Dt(),vt(4,"div",3))},encapsulation:2,changeDetection:0})}return t})(),$a=(()=>{class t{value=null;stateChanges;id;placeholder;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t})}return t})();var Ga=new w("MatFormField"),lp=new w("MAT_FORM_FIELD_DEFAULT_OPTIONS"),nI="fill",xB="auto",iI="fixed",MB="translateY(-50%)",qt=(()=>{class t{_elementRef=u(z);_changeDetectorRef=u(De);_platform=u(Re);_idGenerator=u(Ze);_ngZone=u(U);_defaults=u(lp,{optional:!0});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=dc("iconPrefixContainer");_textPrefixContainerSignal=dc("textPrefixContainer");_iconSuffixContainerSignal=dc("iconSuffixContainer");_textSuffixContainerSignal=dc("textSuffixContainer");_prefixSuffixContainers=dt(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=iS(jt);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=oi(e)}_hideRequiredMarker=!1;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||xB}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let i=e||this._defaults?.appearance||nI;this._appearanceSignal.set(i)}_appearanceSignal=T(nI);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||iI}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||iI}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints()}_hintLabel="";_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e}_destroyed=new F;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=tt();constructor(){let e=this._defaults,i=u(Rn);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),bn(()=>this._currentDirection=i.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled")},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=dt(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always")}_initializeControl(e){let i=this._control,r="mat-mdc-form-field-type-";e&&this._elementRef.nativeElement.classList.remove(r+e.controlType),i.controlType&&this._elementRef.nativeElement.classList.add(r+i.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=i.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=i.stateChanges.pipe(zt([void 0,void 0]),ue(()=>[i.errorState,i.userAriaDescribedBy]),ru(),We(([[o,s],[a,l]])=>o!==a||s!==l)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),i.ngControl&&i.ngControl.valueChanges&&(this._valueChanges=i.ngControl.valueChanges.pipe(xe(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),Go(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let e=this._control.focused;e&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",e),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",e)}_syncOutlineLabelOffset(){aS({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:"border-box"})}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())})}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=dt(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():!1}_shouldForward(e){let i=this._control?this._control.ngControl:null;return i&&i[e]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&e.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let o=this._hintChildren?this._hintChildren.find(a=>a.align==="start"):null,s=this._hintChildren?this._hintChildren.find(a=>a.align==="end"):null;o?e.push(o.id):this._hintLabel&&e.push(this._hintLabelId),s&&e.push(s.id)}else this._errorChildren&&e.push(...this._errorChildren.map(o=>o.id));let i=this._control.describedByIds,r;if(i){let o=this._describedByIds||e;r=e.concat(i.filter(s=>s&&!o.includes(s)))}else r=e;this._control.setDescribedByIds(r),this._describedByIds=e}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return["",null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,i=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,s=e?.getBoundingClientRect().width??0,a=i?.getBoundingClientRect().width??0,l=r?.getBoundingClientRect().width??0,c=o?.getBoundingClientRect().width??0,d=this._currentDirection==="rtl"?"-1":"1",p=`${s+a}px`,v=`calc(${d} * (${p} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,y=`var(--mat-mdc-form-field-label-transform, ${MB} translateX(${v}))`,D=s+a+l+c;return[y,D]}_writeOutlinedLabelStyles(e){if(e!==null){let[i,r]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=i),r!==null&&this._notchedOutline?._setMaxWidth(r)}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let i=e.getRootNode();return i&&i!==e}return document.documentElement.contains(e)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-form-field"]],contentQueries:function(i,r,o){if(i&1&&(Nf(o,r._labelChild,jt,5),Et(o,$a,5)(o,rI,5)(o,wb,5)(o,bb,5)(o,nd,5)),i&2){Ff();let s;q(s=K())&&(r._formFieldControl=s.first),q(s=K())&&(r._prefixChildren=s),q(s=K())&&(r._suffixChildren=s),q(s=K())&&(r._errorChildren=s),q(s=K())&&(r._hintChildren=s)}},viewQuery:function(i,r){if(i&1&&(Pf(r._iconPrefixContainerSignal,KM,5)(r._textPrefixContainerSignal,YM,5)(r._iconSuffixContainerSignal,QM,5)(r._textSuffixContainerSignal,ZM,5),$e(oB,5)(KM,5)(YM,5)(QM,5)(ZM,5)(XM,5)(tI,5)(eI,5)),i&2){Ff(4);let o;q(o=K())&&(r._textField=o.first),q(o=K())&&(r._iconPrefixContainer=o.first),q(o=K())&&(r._textPrefixContainer=o.first),q(o=K())&&(r._iconSuffixContainer=o.first),q(o=K())&&(r._textSuffixContainer=o.first),q(o=K())&&(r._floatingLabel=o.first),q(o=K())&&(r._notchedOutline=o.first),q(o=K())&&(r._lineRipple=o.first)}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(i,r){i&2&&P("mat-mdc-form-field-label-always-float",r._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",r._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",r._hasIconSuffix)("mat-form-field-invalid",r._control.errorState)("mat-form-field-disabled",r._control.disabled)("mat-form-field-autofilled",r._control.autofilled)("mat-form-field-appearance-fill",r.appearance=="fill")("mat-form-field-appearance-outline",r.appearance=="outline")("mat-form-field-hide-placeholder",r._hasFloatingLabel()&&!r._shouldLabelFloat())("mat-primary",r.color!=="accent"&&r.color!=="warn")("mat-accent",r.color==="accent")("mat-warn",r.color==="warn")("ng-untouched",r._shouldForward("untouched"))("ng-touched",r._shouldForward("touched"))("ng-pristine",r._shouldForward("pristine"))("ng-dirty",r._shouldForward("dirty"))("ng-valid",r._shouldForward("valid"))("ng-invalid",r._shouldForward("invalid"))("ng-pending",r._shouldForward("pending"))},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[ze([{provide:Ga,useExisting:t},{provide:oI,useExisting:t}])],ngContentSelectors:aB,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(i,r){if(i&1&&(Ie(sB),j(0,dB,1,1,"ng-template",null,0,lo),f(2,"div",6,1),k("click",function(s){return r._control.onContainerClick(s)}),he(4,uB,1,0,"div",7),f(5,"div",8),he(6,pB,2,2,"div",9),he(7,hB,3,0,"div",10),he(8,gB,3,0,"div",11),f(9,"div",12),he(10,_B,1,1,null,13),re(11),m(),he(12,yB,3,0,"div",14),he(13,bB,3,0,"div",15),m(),he(14,CB,1,0,"div",16),m(),f(15,"div",17),he(16,wB,2,0,"div",18)(17,EB,5,1,"div",19),m()),i&2){let o;h(2),P("mdc-text-field--filled",!r._hasOutline())("mdc-text-field--outlined",r._hasOutline())("mdc-text-field--no-label",!r._hasFloatingLabel())("mdc-text-field--disabled",r._control.disabled)("mdc-text-field--invalid",r._control.errorState),h(2),ge(!r._hasOutline()&&!r._control.disabled?4:-1),h(2),ge(r._hasOutline()?6:-1),h(),ge(r._hasIconPrefix?7:-1),h(),ge(r._hasTextPrefix?8:-1),h(2),ge(!r._hasOutline()||r._forceDisplayInfixLabel()?10:-1),h(2),ge(r._hasTextSuffix?12:-1),h(),ge(r._hasIconSuffix?13:-1),h(),ge(r._hasOutline()?-1:14),h(),P("mat-mdc-form-field-subscript-dynamic-size",r.subscriptSizing==="dynamic");let s=r._getSubscriptMessageType();h(),ge((o=s)==="error"?16:o==="hint"?17:-1)}},dependencies:[XM,tI,co,eI,nd],styles:[`.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-filled-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
  border-top-right-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) {
  background-color: var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));
  border-width: var(--mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error));
}

.mdc-line-ripple--active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--mat-form-field-container-height, 56px);
  padding-top: var(--mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--mat-form-field-error-text-color, var(--mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));
  line-height: var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));
  font-size: var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));
  letter-spacing: var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));
  font-weight: var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));
  font-weight: var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
`],encapsulation:2,changeDetection:0})}return t})();var bt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[Jm,qt,me]})}return t})();var IB=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`textarea.cdk-textarea-autosize {
  resize: none;
}

textarea.cdk-textarea-autosize-measuring {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: auto !important;
  overflow: hidden !important;
}

textarea.cdk-textarea-autosize-measuring-firefox {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: 0 !important;
}

@keyframes cdk-text-field-autofill-start { /*!*/ }
@keyframes cdk-text-field-autofill-end { /*!*/ }
.cdk-text-field-autofill-monitored:-webkit-autofill {
  animation: cdk-text-field-autofill-start 0s 1ms;
}

.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {
  animation: cdk-text-field-autofill-end 0s 1ms;
}
`],encapsulation:2,changeDetection:0})}return t})(),TB={passive:!0},sI=(()=>{class t{_platform=u(Re);_ngZone=u(U);_renderer=u(ct).createRenderer(null,null);_styleLoader=u(ft);_monitoredElements=new Map;constructor(){}monitor(e){if(!this._platform.isBrowser)return pt;this._styleLoader.load(IB);let i=Wn(e),r=this._monitoredElements.get(i);if(r)return r.subject;let o=new F,s="cdk-text-field-autofilled",a=c=>{c.animationName==="cdk-text-field-autofill-start"&&!i.classList.contains(s)?(i.classList.add(s),this._ngZone.run(()=>o.next({target:c.target,isAutofilled:!0}))):c.animationName==="cdk-text-field-autofill-end"&&i.classList.contains(s)&&(i.classList.remove(s),this._ngZone.run(()=>o.next({target:c.target,isAutofilled:!1})))},l=this._ngZone.runOutsideAngular(()=>(i.classList.add("cdk-text-field-autofill-monitored"),this._renderer.listen(i,"animationstart",a,TB)));return this._monitoredElements.set(i,{subject:o,unlisten:l}),o}stopMonitoring(e){let i=Wn(e),r=this._monitoredElements.get(i);r&&(r.unlisten(),r.subject.complete(),i.classList.remove("cdk-text-field-autofill-monitored"),i.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(i))}ngOnDestroy(){this._monitoredElements.forEach((e,i)=>this.stopMonitoring(i))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var aI=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({})}return t})();var lI=new w("MAT_INPUT_VALUE_ACCESSOR");var wo=(()=>{class t{isErrorState(e,i){return!!(e&&e.invalid&&(e.touched||i&&i.submitted))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Wa=class{_defaultMatcher;ngControl;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;constructor(n,e,i,r,o){this._defaultMatcher=n,this.ngControl=e,this._parentFormGroup=i,this._parentForm=r,this._stateChanges=o}updateErrorState(){let n=this.errorState,e=this._parentFormGroup||this._parentForm,i=this.matcher||this._defaultMatcher,r=this.ngControl?this.ngControl.control:null,o=i?.isErrorState(r,e)??!1;o!==n&&(this.errorState=o,this._stateChanges.next())}};var kB=["button","checkbox","file","hidden","image","radio","range","reset","submit"],RB=new w("MAT_INPUT_CONFIG"),si=(()=>{class t{_elementRef=u(z);_platform=u(Re);ngControl=u(Ir,{optional:!0,self:!0});_autofillMonitor=u(sI);_ngZone=u(U);_formField=u(Ga,{optional:!0});_renderer=u(Ue);_uid=u(Ze).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=u(RB,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=!1;_isNativeSelect=!1;_isTextarea=!1;_isInFormField=!1;focused=!1;stateChanges=new F;controlType="mat-input";autofilled=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=oi(e),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(e){this._id=e||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(Fa.required)??!1}set required(e){this._required=oi(e)}_required;get type(){return this._type}set type(e){this._type=e||"text",this._validateType(),!this._isTextarea&&_b().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=oi(e)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(e=>_b().has(e));constructor(){let e=u(Vt,{optional:!0}),i=u(Gc,{optional:!0}),r=u(wo),o=u(lI,{optional:!0,self:!0}),s=this._elementRef.nativeElement,a=s.nodeName.toLowerCase();o?Gi(o.value)?this._signalBasedValueAccessor=o:this._inputValueAccessor=o:this._inputValueAccessor=s,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(s,"keyup",this._iOSKeyupListener)}),this._errorStateTracker=new Wa(r,this.ngControl,i,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=a==="select",this._isTextarea=a==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=s.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&bn(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let i=this._elementRef.nativeElement;i.type==="number"?(i.type="text",i.setSelectionRange(0,0),i.type="number"):i.setSelectionRange(0,0)}this.focused=e,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let i=this._elementRef.nativeElement;this._previousPlaceholder=e,e?i.setAttribute("placeholder",e):i.removeAttribute("placeholder")}}_getPlaceholder(){return this.placeholder||null}_validateType(){kB.indexOf(this._type)>-1}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,i=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&i&&i.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let i=this._elementRef.nativeElement;e.length?i.setAttribute("aria-describedby",e.join(" ")):i.removeAttribute("aria-describedby")}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let i=e.target;!i.value&&i.selectionStart===0&&i.selectionEnd===0&&(i.setSelectionRange(1,1),i.setSelectionRange(0,0))};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(i,r){i&1&&k("focus",function(){return r._focusChanged(!0)})("blur",function(){return r._focusChanged(!1)})("input",function(){return r._onInput()}),i&2&&(Vn("id",r.id)("disabled",r.disabled&&!r.disabledInteractive)("required",r.required),ae("name",r.name||null)("readonly",r._getReadonlyAttribute())("aria-disabled",r.disabled&&r.disabledInteractive?"true":null)("aria-invalid",r.empty&&r.required?null:r.errorState)("aria-required",r.required)("id",r.id),P("mat-input-server",r._isServer)("mat-mdc-form-field-textarea-control",r._isInFormField&&r._isTextarea)("mat-mdc-form-field-input-control",r._isInFormField)("mat-mdc-input-disabled-interactive",r.disabledInteractive)("mdc-text-field__input",r._isInFormField)("mat-mdc-native-select-inline",r._isInlineSelect()))},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",H]},exportAs:["matInput"],features:[ze([{provide:$a,useExisting:t}]),et]})}return t})(),ai=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[bt,bt,aI,me]})}return t})();var li=(function(t){return t[t.FADING_IN=0]="FADING_IN",t[t.VISIBLE=1]="VISIBLE",t[t.FADING_OUT=2]="FADING_OUT",t[t.HIDDEN=3]="HIDDEN",t})(li||{}),Db=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=li.HIDDEN;constructor(n,e,i,r=!1){this._renderer=n,this.element=e,this.config=i,this._animationForciblyDisabledThroughCss=r}fadeOut(){this._renderer.fadeOutRipple(this)}},cI=Ba({passive:!0,capture:!0}),Eb=class{_events=new Map;addHandler(n,e,i,r){let o=this._events.get(e);if(o){let s=o.get(i);s?s.add(r):o.set(i,new Set([r]))}else this._events.set(e,new Map([[i,new Set([r])]])),n.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,cI)})}removeHandler(n,e,i){let r=this._events.get(n);if(!r)return;let o=r.get(e);o&&(o.delete(i),o.size===0&&r.delete(e),r.size===0&&(this._events.delete(n),document.removeEventListener(n,this._delegateEventHandler,cI)))}_delegateEventHandler=n=>{let e=tn(n);e&&this._events.get(n.type)?.forEach((i,r)=>{(r===e||r.contains(e))&&i.forEach(o=>o.handleEvent(n))})}},rd={enterDuration:225,exitDuration:150},AB=800,dI=Ba({passive:!0,capture:!0}),uI=["mousedown","touchstart"],fI=["mouseup","mouseleave","touchend","touchcancel"],OB=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2,changeDetection:0})}return t})(),od=class t{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new Eb;constructor(n,e,i,r,o){this._target=n,this._ngZone=e,this._platform=r,r.isBrowser&&(this._containerElement=Wn(i)),o&&o.get(ft).load(OB)}fadeInRipple(n,e,i={}){let r=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=S(S({},rd),i.animation);i.centered&&(n=r.left+r.width/2,e=r.top+r.height/2);let s=i.radius||NB(n,e,r),a=n-r.left,l=e-r.top,c=o.enterDuration,d=document.createElement("div");d.classList.add("mat-ripple-element"),d.style.left=`${a-s}px`,d.style.top=`${l-s}px`,d.style.height=`${s*2}px`,d.style.width=`${s*2}px`,i.color!=null&&(d.style.backgroundColor=i.color),d.style.transitionDuration=`${c}ms`,this._containerElement.appendChild(d);let p=window.getComputedStyle(d),_=p.transitionProperty,v=p.transitionDuration,y=_==="none"||v==="0s"||v==="0s, 0s"||r.width===0&&r.height===0,D=new Db(this,d,i,y);d.style.transform="scale3d(1, 1, 1)",D.state=li.FADING_IN,i.persistent||(this._mostRecentTransientRipple=D);let M=null;return!y&&(c||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let R=()=>{M&&(M.fallbackTimer=null),clearTimeout(Ee),this._finishRippleTransition(D)},$=()=>this._destroyRipple(D),Ee=setTimeout($,c+100);d.addEventListener("transitionend",R),d.addEventListener("transitioncancel",$),M={onTransitionEnd:R,onTransitionCancel:$,fallbackTimer:Ee}}),this._activeRipples.set(D,M),(y||!c)&&this._finishRippleTransition(D),D}fadeOutRipple(n){if(n.state===li.FADING_OUT||n.state===li.HIDDEN)return;let e=n.element,i=S(S({},rd),n.config.animation);e.style.transitionDuration=`${i.exitDuration}ms`,e.style.opacity="0",n.state=li.FADING_OUT,(n._animationForciblyDisabledThroughCss||!i.exitDuration)&&this._finishRippleTransition(n)}fadeOutAll(){this._getActiveRipples().forEach(n=>n.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(n=>{n.config.persistent||n.fadeOut()})}setupTriggerEvents(n){let e=Wn(n);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,uI.forEach(i=>{t._eventManager.addHandler(this._ngZone,i,e,this)}))}handleEvent(n){n.type==="mousedown"?this._onMousedown(n):n.type==="touchstart"?this._onTouchStart(n):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{fI.forEach(e=>{this._triggerElement.addEventListener(e,this,dI)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(n){n.state===li.FADING_IN?this._startFadeOutTransition(n):n.state===li.FADING_OUT&&this._destroyRipple(n)}_startFadeOutTransition(n){let e=n===this._mostRecentTransientRipple,{persistent:i}=n.config;n.state=li.VISIBLE,!i&&(!e||!this._isPointerDown)&&n.fadeOut()}_destroyRipple(n){let e=this._activeRipples.get(n)??null;this._activeRipples.delete(n),this._activeRipples.size||(this._containerRect=null),n===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),n.state=li.HIDDEN,e!==null&&(n.element.removeEventListener("transitionend",e.onTransitionEnd),n.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),n.element.remove()}_onMousedown(n){let e=Wc(n),i=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+AB;!this._target.rippleDisabled&&!e&&!i&&(this._isPointerDown=!0,this.fadeInRipple(n.clientX,n.clientY,this._target.rippleConfig))}_onTouchStart(n){if(!this._target.rippleDisabled&&!qc(n)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=n.changedTouches;if(e)for(let i=0;i<e.length;i++)this.fadeInRipple(e[i].clientX,e[i].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(n=>{let e=n.state===li.VISIBLE||n.config.terminateOnPointerUp&&n.state===li.FADING_IN;!n.config.persistent&&e&&n.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let n=this._triggerElement;n&&(uI.forEach(e=>t._eventManager.removeHandler(e,n,this)),this._pointerUpEventsRegistered&&(fI.forEach(e=>n.removeEventListener(e,this,dI)),this._pointerUpEventsRegistered=!1))}};function NB(t,n,e){let i=Math.max(Math.abs(t-e.left),Math.abs(t-e.right)),r=Math.max(Math.abs(n-e.top),Math.abs(n-e.bottom));return Math.sqrt(i*i+r*r)}var Sb=new w("mat-ripple-global-options"),ir=(()=>{class t{_elementRef=u(z);_animationsDisabled=tt();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=u(U),i=u(Re),r=u(Sb,{optional:!0}),o=u(ce);this._globalOptions=r||{},this._rippleRenderer=new od(this,e,this._elementRef,i,o)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:S(S(S({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,i=0,r){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,i,S(S({},this.rippleConfig),r)):this._rippleRenderer.fadeInRipple(0,0,S(S({},this.rippleConfig),e))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(i,r){i&2&&P("mat-ripple-unbounded",r.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return t})();var PB={capture:!0},FB=["focus","mousedown","mouseenter","touchstart"],xb="mat-ripple-loader-uninitialized",Mb="mat-ripple-loader-class-name",mI="mat-ripple-loader-centered",cp="mat-ripple-loader-disabled",pI=(()=>{class t{_document=u(Y);_animationsDisabled=tt();_globalRippleOptions=u(Sb,{optional:!0});_platform=u(Re);_ngZone=u(U);_injector=u(ce);_eventCleanups;_hosts=new Map;constructor(){let e=u(ct).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>FB.map(i=>e.listen(this._document,i,this._onInteraction,PB)))}ngOnDestroy(){let e=this._hosts.keys();for(let i of e)this.destroyRipple(i);this._eventCleanups.forEach(i=>i())}configureRipple(e,i){e.setAttribute(xb,this._globalRippleOptions?.namespace??""),(i.className||!e.hasAttribute(Mb))&&e.setAttribute(Mb,i.className||""),i.centered&&e.setAttribute(mI,""),i.disabled&&e.setAttribute(cp,"")}setDisabled(e,i){let r=this._hosts.get(e);r?(r.target.rippleDisabled=i,!i&&!r.hasSetUpEvents&&(r.hasSetUpEvents=!0,r.renderer.setupTriggerEvents(e))):i?e.setAttribute(cp,""):e.removeAttribute(cp)}_onInteraction=e=>{let i=tn(e);if(i instanceof HTMLElement){let r=i.closest(`[${xb}="${this._globalRippleOptions?.namespace??""}"]`);r&&this._createRipple(r)}};_createRipple(e){if(!this._document||this._hosts.has(e))return;e.querySelector(".mat-ripple")?.remove();let i=this._document.createElement("span");i.classList.add("mat-ripple",e.getAttribute(Mb)),e.append(i);let r=this._globalRippleOptions,o=this._animationsDisabled?0:r?.animation?.enterDuration??rd.enterDuration,s=this._animationsDisabled?0:r?.animation?.exitDuration??rd.exitDuration,a={rippleDisabled:this._animationsDisabled||r?.disabled||e.hasAttribute(cp),rippleConfig:{centered:e.hasAttribute(mI),terminateOnPointerUp:r?.terminateOnPointerUp,animation:{enterDuration:o,exitDuration:s}}},l=new od(a,this._ngZone,i,this._platform,this._injector),c=!a.rippleDisabled;c&&l.setupTriggerEvents(e),this._hosts.set(e,{target:a,renderer:l,hasSetUpEvents:c}),e.removeAttribute(xb)}destroyRipple(e){let i=this._hosts.get(e);i&&(i.renderer._removeTriggerEvents(),this._hosts.delete(e))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ci=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["structural-styles"]],decls:0,vars:0,template:function(i,r){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--mat-focus-indicator-display, none);
  border-width: var(--mat-focus-indicator-border-width, 3px);
  border-style: var(--mat-focus-indicator-border-style, solid);
  border-color: var(--mat-focus-indicator-border-color, transparent);
  border-radius: var(--mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --mat-focus-indicator-display: block;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();var LB=["mat-icon-button",""],BB=["*"],VB=new w("MAT_BUTTON_CONFIG");function hI(t){return t==null?void 0:St(t)}var dp=(()=>{class t{_elementRef=u(z);_ngZone=u(U);_animationsDisabled=tt();_config=u(VB,{optional:!0});_focusMonitor=u(qn);_cleanupClick;_renderer=u(Ue);_rippleLoader=u(pI);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=e,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(e){this.tabIndex=e}constructor(){u(ft).load(ci);let e=this._elementRef.nativeElement;this._isAnchor=e.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(e,{className:"mat-mdc-button-ripple"})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(e="program",i){e?this._focusMonitor.focusVia(this._elementRef.nativeElement,e,i):this._elementRef.nativeElement.focus(i)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,hostAttrs:[1,"mat-mdc-button-base"],hostVars:13,hostBindings:function(i,r){i&2&&(ae("disabled",r._getDisabledAttribute())("aria-disabled",r._getAriaDisabled())("tabindex",r._getTabIndex()),_t(r.color?"mat-"+r.color:""),P("mat-mdc-button-disabled",r.disabled)("mat-mdc-button-disabled-interactive",r.disabledInteractive)("mat-unthemed",!r.color)("_mat-animation-noopable",r._animationsDisabled))},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",H],disabled:[2,"disabled","disabled",H],ariaDisabled:[2,"aria-disabled","ariaDisabled",H],disabledInteractive:[2,"disabledInteractive","disabledInteractive",H],tabIndex:[2,"tabIndex","tabIndex",hI],_tabindex:[2,"tabindex","_tabindex",hI]}})}return t})(),Rr=(()=>{class t extends dp{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[He],attrs:LB,ngContentSelectors:BB,decls:4,vars:0,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(Ie(),vt(0,"span",0),re(1),vt(2,"span",1)(3,"span",2))},styles:[`.mat-mdc-icon-button {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  z-index: 0;
  overflow: visible;
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
  flex-shrink: 0;
  text-align: center;
  width: var(--mat-icon-button-state-layer-size, 40px);
  height: var(--mat-icon-button-state-layer-size, 40px);
  padding: calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);
  font-size: var(--mat-icon-button-icon-size, 24px);
  color: var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-icon-button .mat-mdc-button-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-icon-button .mdc-button__label,
.mat-mdc-icon-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-icon-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-ripple-element {
  background-color: var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-icon-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-icon-button-touch-target-size, 48px);
  display: var(--mat-icon-button-touch-target-display, block);
  left: 50%;
  width: var(--mat-icon-button-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-icon-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-icon-button img,
.mat-mdc-icon-button svg {
  width: var(--mat-icon-button-icon-size, 24px);
  height: var(--mat-icon-button-icon-size, 24px);
  vertical-align: baseline;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
}
.mat-mdc-icon-button[hidden] {
  display: none;
}
.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {
  background: transparent;
  opacity: 1;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();var rr=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[me]})}return t})();var jB=["matButton",""],vI=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]]],_I=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]"],HB=["mat-fab",""];var gI=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),Kt=(()=>{class t extends dp{get appearance(){return this._appearance}set appearance(e){this.setAppearance(e||this._config?.defaultAppearance||"text")}_appearance=null;constructor(){super();let e=zB(this._elementRef.nativeElement);e&&this.setAppearance(e)}setAppearance(e){if(e===this._appearance)return;let i=this._elementRef.nativeElement.classList,r=this._appearance?gI.get(this._appearance):null,o=gI.get(e);r&&i.remove(...r),i.add(...o),this._appearance=e}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[He],attrs:jB,ngContentSelectors:_I,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(Ie(vI),vt(0,"span",0),re(1),gt(2,"span",1),re(3,1),Dt(),re(4,2),vt(5,"span",2)(6,"span",3)),i&2&&P("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab)},styles:[`.mat-mdc-button-base {
  text-decoration: none;
}
.mat-mdc-button-base .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
@media (hover: none) {
  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {
    opacity: 0;
  }
}

.mdc-button {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  border: none;
  outline: none;
  line-height: inherit;
  -webkit-appearance: none;
  overflow: visible;
  vertical-align: middle;
  background: transparent;
  padding: 0 8px;
}
.mdc-button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mdc-button:active {
  outline: none;
}
.mdc-button:hover {
  cursor: pointer;
}
.mdc-button:disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-button[hidden] {
  display: none;
}
.mdc-button .mdc-button__label {
  position: relative;
}

.mat-mdc-button {
  padding: 0 var(--mat-button-text-horizontal-padding, 12px);
  height: var(--mat-button-text-container-height, 40px);
  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-text-label-text-transform);
  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-text-touch-target-size, 48px);
  display: var(--mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-filled-container-height, 40px);
  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-filled-label-text-transform);
  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-filled-touch-target-size, 48px);
  display: var(--mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));
  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));
  height: var(--mat-button-protected-container-height, 40px);
  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-protected-label-text-transform);
  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-protected-touch-target-size, 48px);
  display: var(--mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));
  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-outlined-container-height, 40px);
  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-outlined-label-text-transform);
  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));
  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));
  border-width: var(--mat-button-outlined-outline-width, 1px);
  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-outlined-touch-target-size, 48px);
  display: var(--mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));
  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-tonal-container-height, 40px);
  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-tonal-label-text-transform);
  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-tonal-touch-target-size, 48px);
  display: var(--mat-button-tonal-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-button,
.mat-mdc-unelevated-button,
.mat-mdc-raised-button,
.mat-mdc-outlined-button,
.mat-tonal-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-button .mdc-button__label,
.mat-mdc-button .mat-icon,
.mat-mdc-unelevated-button .mdc-button__label,
.mat-mdc-unelevated-button .mat-icon,
.mat-mdc-raised-button .mdc-button__label,
.mat-mdc-raised-button .mat-icon,
.mat-mdc-outlined-button .mdc-button__label,
.mat-mdc-outlined-button .mat-icon,
.mat-tonal-button .mdc-button__label,
.mat-tonal-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-button .mat-focus-indicator,
.mat-mdc-unelevated-button .mat-focus-indicator,
.mat-mdc-raised-button .mat-focus-indicator,
.mat-mdc-outlined-button .mat-focus-indicator,
.mat-tonal-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,
.mat-tonal-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-button._mat-animation-noopable,
.mat-mdc-unelevated-button._mat-animation-noopable,
.mat-mdc-raised-button._mat-animation-noopable,
.mat-mdc-outlined-button._mat-animation-noopable,
.mat-tonal-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-button > .mat-icon,
.mat-mdc-unelevated-button > .mat-icon,
.mat-mdc-raised-button > .mat-icon,
.mat-mdc-outlined-button > .mat-icon,
.mat-tonal-button > .mat-icon {
  display: inline-block;
  position: relative;
  vertical-align: top;
  font-size: 1.125rem;
  height: 1.125rem;
  width: 1.125rem;
}

.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mdc-button__ripple {
  top: -1px;
  left: -1px;
  bottom: -1px;
  right: -1px;
}

.mat-mdc-unelevated-button .mat-focus-indicator::before,
.mat-tonal-button .mat-focus-indicator::before,
.mat-mdc-raised-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();function zB(t){return t.hasAttribute("mat-raised-button")?"elevated":t.hasAttribute("mat-stroked-button")?"outlined":t.hasAttribute("mat-flat-button")?"filled":t.hasAttribute("mat-button")?"text":null}var UB=new w("mat-mdc-fab-default-options",{providedIn:"root",factory:()=>Ib}),Ib={color:"accent"},yI=(()=>{class t extends dp{_options=u(UB,{optional:!0});_isFab=!0;extended=!1;constructor(){super(),this._options=this._options||Ib,this.color=this._options.color||Ib.color}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["button","mat-fab",""],["a","mat-fab",""],["button","matFab",""],["a","matFab",""]],hostAttrs:[1,"mdc-fab","mat-mdc-fab-base","mat-mdc-fab"],hostVars:4,hostBindings:function(i,r){i&2&&P("mdc-fab--extended",r.extended)("mat-mdc-extended-fab",r.extended)},inputs:{extended:[2,"extended","extended",H]},exportAs:["matButton","matAnchor"],features:[He],attrs:HB,ngContentSelectors:_I,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(Ie(vI),vt(0,"span",0),re(1),gt(2,"span",1),re(3,1),Dt(),re(4,2),vt(5,"span",2)(6,"span",3)),i&2&&P("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab)},styles:[`.mat-mdc-fab-base {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 56px;
  height: 56px;
  padding: 0;
  border: none;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  -moz-appearance: none;
  -webkit-appearance: none;
  overflow: visible;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-fab-base .mat-mdc-button-ripple,
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-fab-base .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-fab-base .mdc-button__label,
.mat-mdc-fab-base .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-fab-base .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-fab-base._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-fab-base::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
.mat-mdc-fab-base[hidden] {
  display: none;
}
.mat-mdc-fab-base::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {
  outline: none;
}
.mat-mdc-fab-base:hover {
  cursor: pointer;
}
.mat-mdc-fab-base > svg {
  width: 100%;
}
.mat-mdc-fab-base .mat-icon, .mat-mdc-fab-base .material-icons {
  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);
  fill: currentColor;
  will-change: transform;
}
.mat-mdc-fab-base .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}
.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {
  box-shadow: none;
}
.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-fab {
  background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));
  border-radius: var(--mat-fab-container-shape, var(--mat-sys-corner-large));
  color: var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));
  box-shadow: var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3));
}
@media (hover: hover) {
  .mat-mdc-fab:hover {
    box-shadow: var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-fab:focus {
  box-shadow: var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-fab:active, .mat-mdc-fab:focus:active {
  box-shadow: var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-fab .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-fab-touch-target-size, 48px);
  display: var(--mat-fab-touch-target-display, block);
  left: 50%;
  width: var(--mat-fab-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-fab .mat-ripple-element {
  background-color: var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container));
}
.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-disabled-state-layer-color);
}
.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}

.mat-mdc-mini-fab {
  width: 40px;
  height: 40px;
  background-color: var(--mat-fab-small-container-color, var(--mat-sys-primary-container));
  border-radius: var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));
  color: var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));
  box-shadow: var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3));
}
@media (hover: hover) {
  .mat-mdc-mini-fab:hover {
    box-shadow: var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-mini-fab:focus {
  box-shadow: var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {
  box-shadow: var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-mini-fab .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-fab-small-touch-target-size, 48px);
  display: var(--mat-fab-small-touch-target-display);
  left: 50%;
  width: var(--mat-fab-small-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-mini-fab .mat-ripple-element {
  background-color: var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container));
}
.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-small-disabled-state-layer-color);
}
.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}

.mat-mdc-extended-fab {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  padding-left: 20px;
  padding-right: 20px;
  width: auto;
  max-width: 100%;
  line-height: normal;
  box-shadow: var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));
  height: var(--mat-fab-extended-container-height, 56px);
  border-radius: var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));
  font-family: var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));
  font-weight: var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking));
}
@media (hover: hover) {
  .mat-mdc-extended-fab:hover {
    box-shadow: var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-extended-fab:focus {
  box-shadow: var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {
  box-shadow: var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {
  box-shadow: none;
}
.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons,
.mat-mdc-extended-fab > .mat-icon,
.mat-mdc-extended-fab > .material-icons {
  margin-left: -8px;
  margin-right: 12px;
}
.mat-mdc-extended-fab .mdc-button__label + .mat-icon,
.mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons {
  margin-left: 12px;
  margin-right: -8px;
}
.mat-mdc-extended-fab .mat-mdc-button-touch-target {
  width: 100%;
}
`],encapsulation:2,changeDetection:0})}return t})();var Yt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[rr,me]})}return t})();var Tb="mkb-user",kb="mkb-readonly",di=class t{constructor(n,e){this.http=n;this.router=e}apiUrl="/api";login(n){return this.http.post(`${this.apiUrl}/login`,n).pipe(it({next:e=>{e.success&&e.user?this.setAuthStorage(e.user,!!e.readonly):this.clearAuthStorage()},error:()=>this.clearAuthStorage()}))}getLoginStatus(){return this.http.get(`${this.apiUrl}/login`)}logout(){return this.http.post(`${this.apiUrl}/logout`,{}).pipe(it(()=>this.clearAuthStorage()))}isAuthenticated(){return!!localStorage.getItem(Tb)}isReadOnly(){return localStorage.getItem(kb)==="1"}clearSession(){this.clearAuthStorage()}setAuthStorage(n,e){localStorage.setItem(Tb,n),localStorage.setItem(kb,e?"1":"0")}clearAuthStorage(){localStorage.removeItem(Tb),localStorage.removeItem(kb)}static \u0275fac=function(e){return new(e||t)(A(ut),A(Ae))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})};function $B(t,n){t&1&&(f(0,"div",12),g(1," Willkommen! Es wurde keine Nutzer-Konfiguration gefunden. Die nun erfolgende Eingabe wird f\xFCr zuk\xFCnftige Anmeldungen verwendet. "),m())}function GB(t,n){t&1&&(f(0,"div",12),g(1,' Ung\xFCltige Zugangsdaten. Falls Sie die Zugangsdaten vergessen haben, k\xF6nnen Sie die Datei "data/authentication.json" l\xF6schen. '),m())}function WB(t,n){t&1&&(f(0,"mat-error"),g(1," Bitte geben Sie einen Benutzernamen ein. "),m())}function qB(t,n){t&1&&(f(0,"mat-error"),g(1," Bitte geben Sie ein Passwort ein. "),m())}var fp=class t{constructor(n,e){this.authService=n;this.router=e}credentials={user:"",password:""};firstTime=T(!1);valid=T(null);ngOnInit(){this.authService.getLoginStatus().subscribe({next:n=>{this.firstTime.set(n.firstTime)},error:n=>{console.error("Unable to determine login status:",n)}})}onSubmit(){this.authService.login(this.credentials).subscribe({next:n=>{n.success?(this.firstTime.set(!!n.firstTime),this.router.navigate(["/"])):this.valid.set(!1)},error:n=>{console.error("Login error:",n),this.valid.set(!1)}})}static \u0275fac=function(e){return new(e||t)(I(di),I(Ae))};static \u0275cmp=O({type:t,selectors:[["app-login"]],decls:21,vars:6,consts:[["loginForm","ngForm"],[1,"container-center"],[1,"login-card"],[1,"login-logo"],["alt","Mini Kassenbuch","src","/logo.png"],["class","error",4,"ngIf"],[1,"login-form",3,"ngSubmit"],[1,"full-width"],["matInput","","name","user","required","",3,"ngModelChange","ngModel"],[4,"ngIf"],["matInput","","type","password","name","password","required","",3,"ngModelChange","ngModel"],["mat-flat-button","","color","primary","type","submit",1,"full-width"],[1,"error"]],template:function(e,i){if(e&1){let r=Ke();f(0,"div",1)(1,"mat-card",2)(2,"div",3),W(3,"img",4),m(),f(4,"mat-card-content"),j(5,$B,2,0,"div",5)(6,GB,2,0,"div",5),f(7,"form",6,0),k("ngSubmit",function(){return i.onSubmit()}),f(9,"mat-form-field",7)(10,"mat-label"),g(11,"Nutzername"),m(),f(12,"input",8),Ft("ngModelChange",function(s){return oe(r),Wt(i.credentials.user,s)||(i.credentials.user=s),se(s)}),m(),j(13,WB,2,0,"mat-error",9),m(),f(14,"mat-form-field",7)(15,"mat-label"),g(16,"Passwort"),m(),f(17,"input",10),Ft("ngModelChange",function(s){return oe(r),Wt(i.credentials.password,s)||(i.credentials.password=s),se(s)}),m(),j(18,qB,2,0,"mat-error",9),m(),f(19,"button",11),g(20," Login "),m()()()()()}if(e&2){let r=at(8);h(5),b("ngIf",i.firstTime()),h(),b("ngIf",i.valid()===!1),h(6),Pt("ngModel",i.credentials.user),h(),b("ngIf",r.submitted&&(r.controls.user==null?null:r.controls.user.invalid)),h(4),Pt("ngModel",i.credentials.password),h(),b("ngIf",r.submitted&&(r.controls.password==null?null:r.controls.password.invalid))}},dependencies:[Mt,kn,ni,ii,Tn,kr,Gn,Vt,Ge,Lt,fn,dn,un,bt,qt,jt,Cb,ai,si,Yt,Kt],styles:[".container-center[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%;justify-content:center;align-items:center;padding:32px 16px;box-sizing:border-box}.login-card[_ngcontent-%COMP%]{width:100%;max-width:400px}.login-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px;margin-top:16px}.full-width[_ngcontent-%COMP%]{width:100%}.login-logo[_ngcontent-%COMP%]{padding:12px;background-color:#2196f3;display:flex;justify-content:center}.login-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:80px;width:auto}"]})};function bI(t){return Error(`Unable to find icon with the name "${t}"`)}function KB(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function CI(t){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`)}function wI(t){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`)}var Ar=class{url;svgText;options;svgElement=null;constructor(n,e,i){this.url=n,this.svgText=e,this.options=i}},EI=(()=>{class t{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(e,i,r,o){this._httpClient=e,this._sanitizer=i,this._errorHandler=o,this._document=r}addSvgIcon(e,i,r){return this.addSvgIconInNamespace("",e,i,r)}addSvgIconLiteral(e,i,r){return this.addSvgIconLiteralInNamespace("",e,i,r)}addSvgIconInNamespace(e,i,r,o){return this._addSvgIconConfig(e,i,new Ar(r,null,o))}addSvgIconResolver(e){return this._resolvers.push(e),this}addSvgIconLiteralInNamespace(e,i,r,o){let s=this._sanitizer.sanitize(Ot.HTML,r);if(!s)throw wI(r);let a=ws(s);return this._addSvgIconConfig(e,i,new Ar("",a,o))}addSvgIconSet(e,i){return this.addSvgIconSetInNamespace("",e,i)}addSvgIconSetLiteral(e,i){return this.addSvgIconSetLiteralInNamespace("",e,i)}addSvgIconSetInNamespace(e,i,r){return this._addSvgIconSetConfig(e,new Ar(i,null,r))}addSvgIconSetLiteralInNamespace(e,i,r){let o=this._sanitizer.sanitize(Ot.HTML,i);if(!o)throw wI(i);let s=ws(o);return this._addSvgIconSetConfig(e,new Ar("",s,r))}registerFontClassAlias(e,i=e){return this._fontCssClassesByAlias.set(e,i),this}classNameForFontAlias(e){return this._fontCssClassesByAlias.get(e)||e}setDefaultFontSetClass(...e){return this._defaultFontSetClass=e,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(e){let i=this._sanitizer.sanitize(Ot.RESOURCE_URL,e);if(!i)throw CI(e);let r=this._cachedIconsByUrl.get(i);return r?Q(mp(r)):this._loadSvgIconFromConfig(new Ar(e,null)).pipe(it(o=>this._cachedIconsByUrl.set(i,o)),ue(o=>mp(o)))}getNamedSvgIcon(e,i=""){let r=DI(i,e),o=this._svgIconConfigs.get(r);if(o)return this._getSvgFromConfig(o);if(o=this._getIconConfigFromResolvers(i,e),o)return this._svgIconConfigs.set(r,o),this._getSvgFromConfig(o);let s=this._iconSetConfigs.get(i);return s?this._getSvgFromIconSetConfigs(e,s):zo(bI(r))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(e){return e.svgText?Q(mp(this._svgElementFromConfig(e))):this._loadSvgIconFromConfig(e).pipe(ue(i=>mp(i)))}_getSvgFromIconSetConfigs(e,i){let r=this._extractIconWithNameFromAnySet(e,i);if(r)return Q(r);let o=i.filter(s=>!s.svgText).map(s=>this._loadSvgIconSetFromConfig(s).pipe(mi(a=>{let c=`Loading icon set URL: ${this._sanitizer.sanitize(Ot.RESOURCE_URL,s.url)} failed: ${a.message}`;return this._errorHandler.handleError(new Error(c)),Q(null)})));return hl(o).pipe(ue(()=>{let s=this._extractIconWithNameFromAnySet(e,i);if(!s)throw bI(e);return s}))}_extractIconWithNameFromAnySet(e,i){for(let r=i.length-1;r>=0;r--){let o=i[r];if(o.svgText&&o.svgText.toString().indexOf(e)>-1){let s=this._svgElementFromConfig(o),a=this._extractSvgIconFromSet(s,e,o.options);if(a)return a}}return null}_loadSvgIconFromConfig(e){return this._fetchIcon(e).pipe(it(i=>e.svgText=i),ue(()=>this._svgElementFromConfig(e)))}_loadSvgIconSetFromConfig(e){return e.svgText?Q(null):this._fetchIcon(e).pipe(it(i=>e.svgText=i))}_extractSvgIconFromSet(e,i,r){let o=e.querySelector(`[id="${i}"]`);if(!o)return null;let s=o.cloneNode(!0);if(s.removeAttribute("id"),s.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(s,r);if(s.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(s),r);let a=this._svgElementFromString(ws("<svg></svg>"));return a.appendChild(s),this._setSvgAttributes(a,r)}_svgElementFromString(e){let i=this._document.createElement("DIV");i.innerHTML=e;let r=i.querySelector("svg");if(!r)throw Error("<svg> tag not found");return r}_toSvgElement(e){let i=this._svgElementFromString(ws("<svg></svg>")),r=e.attributes;for(let o=0;o<r.length;o++){let{name:s,value:a}=r[o];s!=="id"&&i.setAttribute(s,a)}for(let o=0;o<e.childNodes.length;o++)e.childNodes[o].nodeType===this._document.ELEMENT_NODE&&i.appendChild(e.childNodes[o].cloneNode(!0));return i}_setSvgAttributes(e,i){return e.setAttribute("fit",""),e.setAttribute("height","100%"),e.setAttribute("width","100%"),e.setAttribute("preserveAspectRatio","xMidYMid meet"),e.setAttribute("focusable","false"),i&&i.viewBox&&e.setAttribute("viewBox",i.viewBox),e}_fetchIcon(e){let{url:i,options:r}=e,o=r?.withCredentials??!1;if(!this._httpClient)throw KB();if(i==null)throw Error(`Cannot fetch icon from URL "${i}".`);let s=this._sanitizer.sanitize(Ot.RESOURCE_URL,i);if(!s)throw CI(i);let a=this._inProgressUrlFetches.get(s);if(a)return a;let l=this._httpClient.get(s,{responseType:"text",withCredentials:o}).pipe(ue(c=>ws(c)),Wr(()=>this._inProgressUrlFetches.delete(s)),vl());return this._inProgressUrlFetches.set(s,l),l}_addSvgIconConfig(e,i,r){return this._svgIconConfigs.set(DI(e,i),r),this}_addSvgIconSetConfig(e,i){let r=this._iconSetConfigs.get(e);return r?r.push(i):this._iconSetConfigs.set(e,[i]),this}_svgElementFromConfig(e){if(!e.svgElement){let i=this._svgElementFromString(e.svgText);this._setSvgAttributes(i,e.options),e.svgElement=i}return e.svgElement}_getIconConfigFromResolvers(e,i){for(let r=0;r<this._resolvers.length;r++){let o=this._resolvers[r](i,e);if(o)return YB(o)?new Ar(o.url,null,o.options):new Ar(o,null)}}static \u0275fac=function(i){return new(i||t)(A(ut,8),A(Cc),A(Y,8),A(vn))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function mp(t){return t.cloneNode(!0)}function DI(t,n){return t+":"+n}function YB(t){return!!(t.url&&t.options)}var QB=["*"],ZB=new w("MAT_ICON_DEFAULT_OPTIONS"),XB=new w("mat-icon-location",{providedIn:"root",factory:()=>{let t=u(Y),n=t?t.location:null;return{getPathname:()=>n?n.pathname+n.search:""}}}),SI=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],JB=SI.map(t=>`[${t}]`).join(", "),eV=/^url\(['"]?#(.*?)['"]?\)$/,Qt=(()=>{class t{_elementRef=u(z);_iconRegistry=u(EI);_location=u(XB);_errorHandler=u(vn);_defaultColor;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(e){e!==this._svgIcon&&(e?this._updateSvgIcon(e):this._svgIcon&&this._clearSvgElement(),this._svgIcon=e)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(e){let i=this._cleanupFontValue(e);i!==this._fontSet&&(this._fontSet=i,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(e){let i=this._cleanupFontValue(e);i!==this._fontIcon&&(this._fontIcon=i,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=ke.EMPTY;constructor(){let e=u(new Sn("aria-hidden"),{optional:!0}),i=u(ZB,{optional:!0});i&&(i.color&&(this.color=this._defaultColor=i.color),i.fontSet&&(this.fontSet=i.fontSet)),e||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(e){if(!e)return["",""];let i=e.split(":");switch(i.length){case 1:return["",i[0]];case 2:return i;default:throw Error(`Invalid icon name: "${e}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let e=this._elementsWithExternalReferences;if(e&&e.size){let i=this._location.getPathname();i!==this._previousPath&&(this._previousPath=i,this._prependPathToReferences(i))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(e){this._clearSvgElement();let i=this._location.getPathname();this._previousPath=i,this._cacheChildrenWithExternalReferences(e),this._prependPathToReferences(i),this._elementRef.nativeElement.appendChild(e)}_clearSvgElement(){let e=this._elementRef.nativeElement,i=e.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();i--;){let r=e.childNodes[i];(r.nodeType!==1||r.nodeName.toLowerCase()==="svg")&&r.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let e=this._elementRef.nativeElement,i=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(r=>r.length>0);this._previousFontSetClass.forEach(r=>e.classList.remove(r)),i.forEach(r=>e.classList.add(r)),this._previousFontSetClass=i,this.fontIcon!==this._previousFontIconClass&&!i.includes("mat-ligature-font")&&(this._previousFontIconClass&&e.classList.remove(this._previousFontIconClass),this.fontIcon&&e.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(e){return typeof e=="string"?e.trim().split(" ")[0]:e}_prependPathToReferences(e){let i=this._elementsWithExternalReferences;i&&i.forEach((r,o)=>{r.forEach(s=>{o.setAttribute(s.name,`url('${e}#${s.value}')`)})})}_cacheChildrenWithExternalReferences(e){let i=e.querySelectorAll(JB),r=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let o=0;o<i.length;o++)SI.forEach(s=>{let a=i[o],l=a.getAttribute(s),c=l?l.match(eV):null;if(c){let d=r.get(a);d||(d=[],r.set(a,d)),d.push({name:s,value:c[1]})}})}_updateSvgIcon(e){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),e){let[i,r]=this._splitIconName(e);i&&(this._svgNamespace=i),r&&(this._svgName=r),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(r,i).pipe(hn(1)).subscribe(o=>this._setSvgElement(o),o=>{let s=`Error retrieving icon ${i}:${r}! ${o.message}`;this._errorHandler.handleError(new Error(s))})}}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(i,r){i&2&&(ae("data-mat-icon-type",r._usingFontIcon()?"font":"svg")("data-mat-icon-name",r._svgName||r.fontIcon)("data-mat-icon-namespace",r._svgNamespace||r.fontSet)("fontIcon",r._usingFontIcon()?r.fontIcon:null),_t(r.color?"mat-"+r.color:""),P("mat-icon-inline",r.inline)("mat-icon-no-color",r.color!=="primary"&&r.color!=="accent"&&r.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",H],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:QB,decls:1,vars:0,template:function(i,r){i&1&&(Ie(),re(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
  color: var(--mat-icon-color, inherit);
}

.mat-icon {
  -webkit-user-select: none;
  user-select: none;
  background-repeat: no-repeat;
  display: inline-block;
  fill: currentColor;
  height: 24px;
  width: 24px;
  overflow: hidden;
}
.mat-icon.mat-icon-inline {
  font-size: inherit;
  height: inherit;
  line-height: inherit;
  width: inherit;
}
.mat-icon.mat-ligature-font[fontIcon]::before {
  content: attr(fontIcon);
}

[dir=rtl] .mat-icon-rtl-mirror {
  transform: scale(-1, 1);
}

.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon {
  display: block;
}
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon {
  margin: auto;
}
`],encapsulation:2,changeDetection:0})}return t})(),Zt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[me]})}return t})();var Ss=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new F;constructor(n=!1,e,i=!0,r){this._multiple=n,this._emitChanges=i,this.compareWith=r,e&&e.length&&(n?e.forEach(o=>this._markSelected(o)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...n){this._verifyValueAssignment(n),n.forEach(i=>this._markSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}deselect(...n){this._verifyValueAssignment(n),n.forEach(i=>this._unmarkSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}setSelection(...n){this._verifyValueAssignment(n);let e=this.selected,i=new Set(n.map(o=>this._getConcreteValue(o)));n.forEach(o=>this._markSelected(o)),e.filter(o=>!i.has(this._getConcreteValue(o,i))).forEach(o=>this._unmarkSelected(o));let r=this._hasQueuedChanges();return this._emitChangeEvent(),r}toggle(n){return this.isSelected(n)?this.deselect(n):this.select(n)}clear(n=!0){this._unmarkAll();let e=this._hasQueuedChanges();return n&&this._emitChangeEvent(),e}isSelected(n){return this._selection.has(this._getConcreteValue(n))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(n){this._multiple&&this.selected&&this._selected.sort(n)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(n){n=this._getConcreteValue(n),this.isSelected(n)||(this._multiple||this._unmarkAll(),this.isSelected(n)||this._selection.add(n),this._emitChanges&&this._selectedToEmit.push(n))}_unmarkSelected(n){n=this._getConcreteValue(n),this.isSelected(n)&&(this._selection.delete(n),this._emitChanges&&this._deselectedToEmit.push(n))}_unmarkAll(){this.isEmpty()||this._selection.forEach(n=>this._unmarkSelected(n))}_verifyValueAssignment(n){n.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(n,e){if(this.compareWith){e=e??this._selection;for(let i of e)if(this.compareWith(n,i))return i;return n}else return n}};var Rb=(()=>{class t{_listeners=[];notify(e,i){for(let r of this._listeners)r(e,i)}listen(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(i=>e!==i)}}ngOnDestroy(){this._listeners=[]}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var tV=20,Ka=(()=>{class t{_ngZone=u(U);_platform=u(Re);_renderer=u(ct).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new F;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let i=this.scrollContainers.get(e);i&&(i.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=tV){return this._platform.isBrowser?new ye(i=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let r=e>0?this._scrolled.pipe(tu(e)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):Q()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,i)=>this.deregister(i)),this._scrolled.complete()}ancestorScrolled(e,i){let r=this.getAncestorScrollContainers(e);return this.scrolled(i).pipe(We(o=>!o||r.indexOf(o)>-1))}getAncestorScrollContainers(e){let i=[];return this.scrollContainers.forEach((r,o)=>{this._scrollableContainsElement(o,e)&&i.push(o)}),i}_scrollableContainsElement(e,i){let r=Wn(i),o=e.getElementRef().nativeElement;do if(r==o)return!0;while(r=r.parentElement);return!1}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var nV=20,Or=(()=>{class t{_platform=u(Re);_listeners;_viewportSize=null;_change=new F;_document=u(Y);constructor(){let e=u(U),i=u(ct).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let r=o=>this._change.next(o);this._listeners=[i.listen("window","resize",r),i.listen("window","orientationchange",r)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:i,height:r}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+r,right:e.left+i,height:r,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,i=this._getWindow(),r=e.documentElement,o=r.getBoundingClientRect(),s=-o.top||e.body?.scrollTop||i.scrollY||r.scrollTop||0,a=-o.left||e.body?.scrollLeft||i.scrollX||r.scrollLeft||0;return{top:s,left:a}}change(e=nV){return e>0?this._change.pipe(tu(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var xs=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({})}return t})(),sd=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[me,xs,me,xs]})}return t})();var ad=class{_attachedHost=null;attach(n){return this._attachedHost=n,n.attach(this)}detach(){let n=this._attachedHost;n!=null&&(this._attachedHost=null,n.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(n){this._attachedHost=n}},So=class extends ad{component;viewContainerRef;injector;projectableNodes;bindings;constructor(n,e,i,r,o){super(),this.component=n,this.viewContainerRef=e,this.injector=i,this.projectableNodes=r,this.bindings=o||null}},Nr=class extends ad{templateRef;viewContainerRef;context;injector;constructor(n,e,i,r){super(),this.templateRef=n,this.viewContainerRef=e,this.context=i,this.injector=r}get origin(){return this.templateRef.elementRef}attach(n,e=this.context){return this.context=e,super.attach(n)}detach(){return this.context=void 0,super.detach()}},Ab=class extends ad{element;constructor(n){super(),this.element=n instanceof z?n.nativeElement:n}},Ya=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(n){if(n instanceof So)return this._attachedPortal=n,this.attachComponentPortal(n);if(n instanceof Nr)return this._attachedPortal=n,this.attachTemplatePortal(n);if(this.attachDomPortal&&n instanceof Ab)return this._attachedPortal=n,this.attachDomPortal(n)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(n){this._disposeFn=n}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},pp=class extends Ya{outletElement;_appRef;_defaultInjector;constructor(n,e,i){super(),this.outletElement=n,this._appRef=e,this._defaultInjector=i}attachComponentPortal(n){let e;if(n.viewContainerRef){let i=n.injector||n.viewContainerRef.injector,r=i.get($i,null,{optional:!0})||void 0;e=n.viewContainerRef.createComponent(n.component,{index:n.viewContainerRef.length,injector:i,ngModuleRef:r,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0}),this.setDisposeFn(()=>e.destroy())}else{let i=this._appRef,r=n.injector||this._defaultInjector||ce.NULL,o=r.get(Ve,i.injector);e=Hf(n.component,{elementInjector:r,environmentInjector:o,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0}),i.attachView(e.hostView),this.setDisposeFn(()=>{i.viewCount>0&&i.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=n,e}attachTemplatePortal(n){let e=n.viewContainerRef,i=e.createEmbeddedView(n.templateRef,n.context,{injector:n.injector});return i.rootNodes.forEach(r=>this.outletElement.appendChild(r)),i.detectChanges(),this.setDisposeFn(()=>{let r=e.indexOf(i);r!==-1&&e.remove(r)}),this._attachedPortal=n,i}attachDomPortal=n=>{let e=n.element;e.parentNode;let i=this.outletElement.ownerDocument.createComment("dom-portal");e.parentNode.insertBefore(i,e),this.outletElement.appendChild(e),this._attachedPortal=n,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(e,i)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(n){return n.hostView.rootNodes[0]}};var ld=(()=>{class t extends Ya{_moduleRef=u($i,{optional:!0});_document=u(Y);_viewContainerRef=u(Nt);_isInitialized=!1;_attachedRef=null;constructor(){super()}get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null)}attached=new Z;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(e){e.setAttachedHost(this);let i=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,r=i.createComponent(e.component,{index:i.length,injector:e.injector||i.injector,projectableNodes:e.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:e.bindings||void 0});return i!==this._viewContainerRef&&this._getRootNode().appendChild(r.hostView.rootNodes[0]),super.setDisposeFn(()=>r.destroy()),this._attachedPortal=e,this._attachedRef=r,this.attached.emit(r),r}attachTemplatePortal(e){e.setAttachedHost(this);let i=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=i,this.attached.emit(i),i}attachDomPortal=e=>{let i=e.element;i.parentNode;let r=this._document.createComment("dom-portal");e.setAttachedHost(this),i.parentNode.insertBefore(r,i),this._getRootNode().appendChild(i),this._attachedPortal=e,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(i,r)})};_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[He]})}return t})(),Qa=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({})}return t})();var xI=UM();function OI(t){return new hp(t.get(Or),t.get(Y))}var hp=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=!1;_document;constructor(n,e){this._viewportRuler=n,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let n=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=n.style.left||"",this._previousHTMLStyles.top=n.style.top||"",n.style.left=yt(-this._previousScrollPosition.left),n.style.top=yt(-this._previousScrollPosition.top),n.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let n=this._document.documentElement,e=this._document.body,i=n.style,r=e.style,o=i.scrollBehavior||"",s=r.scrollBehavior||"";this._isEnabled=!1,i.left=this._previousHTMLStyles.left,i.top=this._previousHTMLStyles.top,n.classList.remove("cdk-global-scrollblock"),xI&&(i.scrollBehavior=r.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),xI&&(i.scrollBehavior=o,r.scrollBehavior=s)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let e=this._document.documentElement,i=this._viewportRuler.getViewportSize();return e.scrollHeight>i.height||e.scrollWidth>i.width}};function NI(t,n){return new gp(t.get(Ka),t.get(U),t.get(Or),n)}var gp=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(n,e,i,r){this._scrollDispatcher=n,this._ngZone=e,this._viewportRuler=i,this._config=r}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(this._scrollSubscription)return;let n=this._scrollDispatcher.scrolled(0).pipe(We(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=n.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=n.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var cd=class{enable(){}disable(){}attach(){}};function Ob(t,n){return n.some(e=>{let i=t.bottom<e.top,r=t.top>e.bottom,o=t.right<e.left,s=t.left>e.right;return i||r||o||s})}function MI(t,n){return n.some(e=>{let i=t.top<e.top,r=t.bottom>e.bottom,o=t.left<e.left,s=t.right>e.right;return i||r||o||s})}function Ts(t,n){return new vp(t.get(Ka),t.get(Or),t.get(U),n)}var vp=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(n,e,i,r){this._scrollDispatcher=n,this._viewportRuler=e,this._ngZone=i,this._config=r}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(!this._scrollSubscription){let n=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(n).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:i,height:r}=this._viewportRuler.getViewportSize();Ob(e,[{width:i,height:r,bottom:r,right:i,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},PI=(()=>{class t{_injector=u(ce);constructor(){}noop=()=>new cd;close=e=>NI(this._injector,e);block=()=>OI(this._injector);reposition=e=>Ts(this._injector,e);static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Is=class{positionStrategy;scrollStrategy=new cd;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(n){if(n){let e=Object.keys(n);for(let i of e)n[i]!==void 0&&(this[i]=n[i])}}};var _p=class{connectionPair;scrollableViewProperties;constructor(n,e){this.connectionPair=n,this.scrollableViewProperties=e}};var FI=(()=>{class t{_attachedOverlays=[];_document=u(Y);_isAttached=!1;constructor(){}ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let i=this._attachedOverlays.indexOf(e);i>-1&&this._attachedOverlays.splice(i,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,i,r){return r.observers.length<1?!1:e.eventPredicate?e.eventPredicate(i):!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),LI=(()=>{class t extends FI{_ngZone=u(U);_renderer=u(ct).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let i=this._attachedOverlays;for(let r=i.length-1;r>-1;r--){let o=i[r];if(this.canReceiveEvent(o,e,o._keydownEvents)){this._ngZone.run(()=>o._keydownEvents.next(e));break}}};static \u0275fac=(()=>{let e;return function(r){return(e||(e=en(t)))(r||t)}})();static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),BI=(()=>{class t extends FI{_platform=u(Re);_ngZone=u(U);_renderer=u(ct).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let i=this._document.body,r={capture:!0},o=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[o.listen(i,"pointerdown",this._pointerDownListener,r),o.listen(i,"click",this._clickListener,r),o.listen(i,"auxclick",this._clickListener,r),o.listen(i,"contextmenu",this._clickListener,r)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=i.style.cursor,i.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=tn(e)};_clickListener=e=>{let i=tn(e),r=e.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:i;this._pointerDownEventTarget=null;let o=this._attachedOverlays.slice();for(let s=o.length-1;s>-1;s--){let a=o[s],l=a._outsidePointerEvents;if(!(!a.hasAttached()||!this.canReceiveEvent(a,e,l))){if(II(a.overlayElement,i)||II(a.overlayElement,r))break;this._ngZone?this._ngZone.run(()=>l.next(e)):l.next(e)}}};static \u0275fac=(()=>{let e;return function(r){return(e||(e=en(t)))(r||t)}})();static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function II(t,n){let e=typeof ShadowRoot<"u"&&ShadowRoot,i=n;for(;i;){if(i===t)return!0;i=e&&i instanceof ShadowRoot?i.host:i.parentNode}return!1}var VI=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cdk-overlay-container {
  position: fixed;
}
@layer cdk-overlay {
  .cdk-overlay-container {
    z-index: 1000;
  }
}
.cdk-overlay-container:empty {
  display: none;
}

.cdk-global-overlay-wrapper {
  display: flex;
  position: absolute;
}
@layer cdk-overlay {
  .cdk-global-overlay-wrapper {
    z-index: 1000;
  }
}

.cdk-overlay-pane {
  position: absolute;
  pointer-events: auto;
  box-sizing: border-box;
  display: flex;
  max-width: 100%;
  max-height: 100%;
}
@layer cdk-overlay {
  .cdk-overlay-pane {
    z-index: 1000;
  }
}

.cdk-overlay-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  opacity: 0;
  touch-action: manipulation;
}
@layer cdk-overlay {
  .cdk-overlay-backdrop {
    z-index: 1000;
    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }
}
@media (prefers-reduced-motion) {
  .cdk-overlay-backdrop {
    transition-duration: 1ms;
  }
}

.cdk-overlay-backdrop-showing {
  opacity: 1;
}
@media (forced-colors: active) {
  .cdk-overlay-backdrop-showing {
    opacity: 0.6;
  }
}

@layer cdk-overlay {
  .cdk-overlay-dark-backdrop {
    background: rgba(0, 0, 0, 0.32);
  }
}

.cdk-overlay-transparent-backdrop {
  transition: visibility 1ms linear, opacity 1ms linear;
  visibility: hidden;
  opacity: 1;
}
.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing, .cdk-high-contrast-active .cdk-overlay-transparent-backdrop {
  opacity: 0;
  visibility: visible;
}

.cdk-overlay-backdrop-noop-animation {
  transition: none;
}

.cdk-overlay-connected-position-bounding-box {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  min-height: 1px;
}
@layer cdk-overlay {
  .cdk-overlay-connected-position-bounding-box {
    z-index: 1000;
  }
}

.cdk-global-scrollblock {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}

.cdk-overlay-popover {
  background: none;
  border: none;
  padding: 0;
  outline: 0;
  overflow: visible;
  position: fixed;
  pointer-events: none;
  white-space: normal;
  color: inherit;
  text-decoration: none;
  width: 100%;
  height: 100%;
  inset: auto;
  top: 0;
  left: 0;
}
.cdk-overlay-popover::backdrop {
  display: none;
}
.cdk-overlay-popover .cdk-overlay-backdrop {
  position: fixed;
  z-index: auto;
}
`],encapsulation:2,changeDetection:0})}return t})(),jI=(()=>{class t{_platform=u(Re);_containerElement;_document=u(Y);_styleLoader=u(ft);constructor(){}ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||vb()){let r=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let o=0;o<r.length;o++)r[o].remove()}let i=this._document.createElement("div");i.classList.add(e),vb()?i.setAttribute("platform","test"):this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._containerElement=i}_loadStyles(){this._styleLoader.load(VI)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Nb=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(n,e,i,r){this._renderer=e,this._ngZone=i,this.element=n.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=e.listen(this.element,"click",r)}detach(){this._ngZone.runOutsideAngular(()=>{let n=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(n,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),n.style.pointerEvents="none",n.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function Pb(t){return t&&t.nodeType===1}var yp=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new F;_attachments=new F;_detachments=new F;_positionStrategy;_scrollStrategy;_locationChanges=ke.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new F;_outsidePointerEvents=new F;_afterNextRenderRef;constructor(n,e,i,r,o,s,a,l,c,d=!1,p,_){this._portalOutlet=n,this._host=e,this._pane=i,this._config=r,this._ngZone=o,this._keyboardDispatcher=s,this._document=a,this._location=l,this._outsideClickDispatcher=c,this._animationsDisabled=d,this._injector=p,this._renderer=_,r.scrollStrategy&&(this._scrollStrategy=r.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=r.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(n){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(n);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=$t(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof e?.onDestroy=="function"&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let n=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),n}dispose(){if(this._disposed)return;let n=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,n&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(n){n!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=n,this.hasAttached()&&(n.attach(this),this.updatePosition()))}updateSize(n){this._config=S(S({},this._config),n),this._updateElementSize()}setDirection(n){this._config=de(S({},this._config),{direction:n}),this._updateElementDirection()}addPanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!0)}removePanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!1)}getDirection(){let n=this._config.direction;return n?typeof n=="string"?n:n.value:"ltr"}updateScrollStrategy(n){n!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=n,this.hasAttached()&&(n.attach(this),n.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let n=this._pane.style;n.width=yt(this._config.width),n.height=yt(this._config.height),n.minWidth=yt(this._config.minWidth),n.minHeight=yt(this._config.minHeight),n.maxWidth=yt(this._config.maxWidth),n.maxHeight=yt(this._config.maxHeight)}_togglePointerEvents(n){this._pane.style.pointerEvents=n?"":"none"}_attachHost(){if(!this._host.parentElement){let n=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;Pb(n)?n.after(this._host):n?.type==="parent"?n.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let n="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new Nb(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(n))}):this._backdropRef.element.classList.add(n)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(n,e,i){let r=ja(e||[]).filter(o=>!!o);r.length&&(i?n.classList.add(...r):n.classList.remove(...r))}_detachContentWhenEmpty(){let n=!1;try{this._detachContentAfterRenderRef=$t(()=>{n=!0,this._detachContent()},{injector:this._injector})}catch(e){if(n)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let n=this._scrollStrategy;n?.disable(),n?.detach?.()}},TI="cdk-overlay-connected-position-bounding-box",iV=/([A-Za-z%]+)$/;function dd(t,n){return new bp(n,t.get(Or),t.get(Y),t.get(Re),t.get(jI))}var bp=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new F;_resizeSubscription=ke.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(n,e,i,r,o){this._viewportRuler=e,this._document=i,this._platform=r,this._overlayContainer=o,this.setOrigin(n)}attach(n){this._overlayRef&&this._overlayRef,this._validatePositions(),n.hostElement.classList.add(TI),this._overlayRef=n,this._boundingBox=n.hostElement,this._pane=n.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let n=this._originRect,e=this._overlayRect,i=this._viewportRect,r=this._containerRect,o=[],s;for(let a of this._preferredPositions){let l=this._getOriginPoint(n,r,a),c=this._getOverlayPoint(l,e,a),d=this._getOverlayFit(c,e,i,a);if(d.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(a,l);return}if(this._canFitWithFlexibleDimensions(d,c,i)){o.push({position:a,origin:l,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(l,a)});continue}(!s||s.overlayFit.visibleArea<d.visibleArea)&&(s={overlayFit:d,overlayPoint:c,originPoint:l,position:a,overlayRect:e})}if(o.length){let a=null,l=-1;for(let c of o){let d=c.boundingBoxRect.width*c.boundingBoxRect.height*(c.position.weight||1);d>l&&(l=d,a=c)}this._isPushed=!1,this._applyPosition(a.position,a.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(s.position,s.originPoint);return}this._applyPosition(s.position,s.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&Ms(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(TI),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let n=this._lastPosition;n?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(n,this._getOriginPoint(this._originRect,this._containerRect,n))):this.apply()}withScrollableContainers(n){return this._scrollables=n,this}withPositions(n){return this._preferredPositions=n,n.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(n){return this._viewportMargin=n,this}withFlexibleDimensions(n=!0){return this._hasFlexibleDimensions=n,this}withGrowAfterOpen(n=!0){return this._growAfterOpen=n,this}withPush(n=!0){return this._canPush=n,this}withLockedPosition(n=!0){return this._positionLocked=n,this}setOrigin(n){return this._origin=n,this}withDefaultOffsetX(n){return this._offsetX=n,this}withDefaultOffsetY(n){return this._offsetY=n,this}withTransformOriginOn(n){return this._transformOriginSelector=n,this}withPopoverLocation(n){return this._popoverLocation=n,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof z?this._origin.nativeElement:Pb(this._origin)?this._origin:null}_getOriginPoint(n,e,i){let r;if(i.originX=="center")r=n.left+n.width/2;else{let s=this._isRtl()?n.right:n.left,a=this._isRtl()?n.left:n.right;r=i.originX=="start"?s:a}e.left<0&&(r-=e.left);let o;return i.originY=="center"?o=n.top+n.height/2:o=i.originY=="top"?n.top:n.bottom,e.top<0&&(o-=e.top),{x:r,y:o}}_getOverlayPoint(n,e,i){let r;i.overlayX=="center"?r=-e.width/2:i.overlayX==="start"?r=this._isRtl()?-e.width:0:r=this._isRtl()?0:-e.width;let o;return i.overlayY=="center"?o=-e.height/2:o=i.overlayY=="top"?0:-e.height,{x:n.x+r,y:n.y+o}}_getOverlayFit(n,e,i,r){let o=RI(e),{x:s,y:a}=n,l=this._getOffset(r,"x"),c=this._getOffset(r,"y");l&&(s+=l),c&&(a+=c);let d=0-s,p=s+o.width-i.width,_=0-a,v=a+o.height-i.height,y=this._subtractOverflows(o.width,d,p),D=this._subtractOverflows(o.height,_,v),M=y*D;return{visibleArea:M,isCompletelyWithinViewport:o.width*o.height===M,fitsInViewportVertically:D===o.height,fitsInViewportHorizontally:y==o.width}}_canFitWithFlexibleDimensions(n,e,i){if(this._hasFlexibleDimensions){let r=i.bottom-e.y,o=i.right-e.x,s=kI(this._overlayRef.getConfig().minHeight),a=kI(this._overlayRef.getConfig().minWidth),l=n.fitsInViewportVertically||s!=null&&s<=r,c=n.fitsInViewportHorizontally||a!=null&&a<=o;return l&&c}return!1}_pushOverlayOnScreen(n,e,i){if(this._previousPushAmount&&this._positionLocked)return{x:n.x+this._previousPushAmount.x,y:n.y+this._previousPushAmount.y};let r=RI(e),o=this._viewportRect,s=Math.max(n.x+r.width-o.width,0),a=Math.max(n.y+r.height-o.height,0),l=Math.max(o.top-i.top-n.y,0),c=Math.max(o.left-i.left-n.x,0),d=0,p=0;return r.width<=o.width?d=c||-s:d=n.x<this._getViewportMarginStart()?o.left-i.left-n.x:0,r.height<=o.height?p=l||-a:p=n.y<this._getViewportMarginTop()?o.top-i.top-n.y:0,this._previousPushAmount={x:d,y:p},{x:n.x+d,y:n.y+p}}_applyPosition(n,e){if(this._setTransformOrigin(n),this._setOverlayElementStyles(e,n),this._setBoundingBoxStyles(e,n),n.panelClass&&this._addPanelClasses(n.panelClass),this._positionChanges.observers.length){let i=this._getScrollVisibility();if(n!==this._lastPosition||!this._lastScrollVisibility||!rV(this._lastScrollVisibility,i)){let r=new _p(n,i);this._positionChanges.next(r)}this._lastScrollVisibility=i}this._lastPosition=n,this._isInitialRender=!1}_setTransformOrigin(n){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),i,r=n.overlayY;n.overlayX==="center"?i="center":this._isRtl()?i=n.overlayX==="start"?"right":"left":i=n.overlayX==="start"?"left":"right";for(let o=0;o<e.length;o++)e[o].style.transformOrigin=`${i} ${r}`}_calculateBoundingBoxRect(n,e){let i=this._viewportRect,r=this._isRtl(),o,s,a;if(e.overlayY==="top")s=n.y,o=i.height-s+this._getViewportMarginBottom();else if(e.overlayY==="bottom")a=i.height-n.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),o=i.height-a+this._getViewportMarginTop();else{let v=Math.min(i.bottom-n.y+i.top,n.y),y=this._lastBoundingBoxSize.height;o=v*2,s=n.y-v,o>y&&!this._isInitialRender&&!this._growAfterOpen&&(s=n.y-y/2)}let l=e.overlayX==="start"&&!r||e.overlayX==="end"&&r,c=e.overlayX==="end"&&!r||e.overlayX==="start"&&r,d,p,_;if(c)_=i.width-n.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),d=n.x-this._getViewportMarginStart();else if(l)p=n.x,d=i.right-n.x-this._getViewportMarginEnd();else{let v=Math.min(i.right-n.x+i.left,n.x),y=this._lastBoundingBoxSize.width;d=v*2,p=n.x-v,d>y&&!this._isInitialRender&&!this._growAfterOpen&&(p=n.x-y/2)}return{top:s,left:p,bottom:a,right:_,width:d,height:o}}_setBoundingBoxStyles(n,e){let i=this._calculateBoundingBoxRect(n,e);!this._isInitialRender&&!this._growAfterOpen&&(i.height=Math.min(i.height,this._lastBoundingBoxSize.height),i.width=Math.min(i.width,this._lastBoundingBoxSize.width));let r={};if(this._hasExactPosition())r.top=r.left="0",r.bottom=r.right="auto",r.maxHeight=r.maxWidth="",r.width=r.height="100%";else{let o=this._overlayRef.getConfig().maxHeight,s=this._overlayRef.getConfig().maxWidth;r.width=yt(i.width),r.height=yt(i.height),r.top=yt(i.top)||"auto",r.bottom=yt(i.bottom)||"auto",r.left=yt(i.left)||"auto",r.right=yt(i.right)||"auto",e.overlayX==="center"?r.alignItems="center":r.alignItems=e.overlayX==="end"?"flex-end":"flex-start",e.overlayY==="center"?r.justifyContent="center":r.justifyContent=e.overlayY==="bottom"?"flex-end":"flex-start",o&&(r.maxHeight=yt(o)),s&&(r.maxWidth=yt(s))}this._lastBoundingBoxSize=i,Ms(this._boundingBox.style,r)}_resetBoundingBoxStyles(){Ms(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){Ms(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(n,e){let i={},r=this._hasExactPosition(),o=this._hasFlexibleDimensions,s=this._overlayRef.getConfig();if(r){let d=this._viewportRuler.getViewportScrollPosition();Ms(i,this._getExactOverlayY(e,n,d)),Ms(i,this._getExactOverlayX(e,n,d))}else i.position="static";let a="",l=this._getOffset(e,"x"),c=this._getOffset(e,"y");l&&(a+=`translateX(${l}px) `),c&&(a+=`translateY(${c}px)`),i.transform=a.trim(),s.maxHeight&&(r?i.maxHeight=yt(s.maxHeight):o&&(i.maxHeight="")),s.maxWidth&&(r?i.maxWidth=yt(s.maxWidth):o&&(i.maxWidth="")),Ms(this._pane.style,i)}_getExactOverlayY(n,e,i){let r={top:"",bottom:""},o=this._getOverlayPoint(e,this._overlayRect,n);if(this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i)),n.overlayY==="bottom"){let s=this._document.documentElement.clientHeight;r.bottom=`${s-(o.y+this._overlayRect.height)}px`}else r.top=yt(o.y);return r}_getExactOverlayX(n,e,i){let r={left:"",right:""},o=this._getOverlayPoint(e,this._overlayRect,n);this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i));let s;if(this._isRtl()?s=n.overlayX==="end"?"left":"right":s=n.overlayX==="end"?"right":"left",s==="right"){let a=this._document.documentElement.clientWidth;r.right=`${a-(o.x+this._overlayRect.width)}px`}else r.left=yt(o.x);return r}_getScrollVisibility(){let n=this._getOriginRect(),e=this._pane.getBoundingClientRect(),i=this._scrollables.map(r=>r.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:MI(n,i),isOriginOutsideView:Ob(n,i),isOverlayClipped:MI(e,i),isOverlayOutsideView:Ob(e,i)}}_subtractOverflows(n,...e){return e.reduce((i,r)=>i-Math.max(r,0),n)}_getNarrowedViewportRect(){let n=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,i=this._viewportRuler.getViewportScrollPosition();return{top:i.top+this._getViewportMarginTop(),left:i.left+this._getViewportMarginStart(),right:i.left+n-this._getViewportMarginEnd(),bottom:i.top+e-this._getViewportMarginBottom(),width:n-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(n,e){return e==="x"?n.offsetX==null?this._offsetX:n.offsetX:n.offsetY==null?this._offsetY:n.offsetY}_validatePositions(){}_addPanelClasses(n){this._pane&&ja(n).forEach(e=>{e!==""&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(n=>{this._pane.classList.remove(n)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let n=this._origin;if(n instanceof z)return n.nativeElement.getBoundingClientRect();if(n instanceof Element)return n.getBoundingClientRect();let e=n.width||0,i=n.height||0;return{top:n.y,bottom:n.y+i,left:n.x,right:n.x+e,height:i,width:e}}_getContainerRect(){let n=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",e=this._overlayContainer.getContainerElement();n&&(e.style.display="block");let i=e.getBoundingClientRect();return n&&(e.style.display=""),i}};function Ms(t,n){for(let e in n)n.hasOwnProperty(e)&&(t[e]=n[e]);return t}function kI(t){if(typeof t!="number"&&t!=null){let[n,e]=t.split(iV);return!e||e==="px"?parseFloat(n):null}return t||null}function RI(t){return{top:Math.floor(t.top),right:Math.floor(t.right),bottom:Math.floor(t.bottom),left:Math.floor(t.left),width:Math.floor(t.width),height:Math.floor(t.height)}}function rV(t,n){return t===n?!0:t.isOriginClipped===n.isOriginClipped&&t.isOriginOutsideView===n.isOriginOutsideView&&t.isOverlayClipped===n.isOverlayClipped&&t.isOverlayOutsideView===n.isOverlayOutsideView}var AI="cdk-global-overlay-wrapper";function Dp(t){return new Cp}var Cp=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(n){let e=n.getConfig();this._overlayRef=n,this._width&&!e.width&&n.updateSize({width:this._width}),this._height&&!e.height&&n.updateSize({height:this._height}),n.hostElement.classList.add(AI),this._isDisposed=!1}top(n=""){return this._bottomOffset="",this._topOffset=n,this._alignItems="flex-start",this}left(n=""){return this._xOffset=n,this._xPosition="left",this}bottom(n=""){return this._topOffset="",this._bottomOffset=n,this._alignItems="flex-end",this}right(n=""){return this._xOffset=n,this._xPosition="right",this}start(n=""){return this._xOffset=n,this._xPosition="start",this}end(n=""){return this._xOffset=n,this._xPosition="end",this}width(n=""){return this._overlayRef?this._overlayRef.updateSize({width:n}):this._width=n,this}height(n=""){return this._overlayRef?this._overlayRef.updateSize({height:n}):this._height=n,this}centerHorizontally(n=""){return this.left(n),this._xPosition="center",this}centerVertically(n=""){return this.top(n),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,i=this._overlayRef.getConfig(),{width:r,height:o,maxWidth:s,maxHeight:a}=i,l=(r==="100%"||r==="100vw")&&(!s||s==="100%"||s==="100vw"),c=(o==="100%"||o==="100vh")&&(!a||a==="100%"||a==="100vh"),d=this._xPosition,p=this._xOffset,_=this._overlayRef.getConfig().direction==="rtl",v="",y="",D="";l?D="flex-start":d==="center"?(D="center",_?y=p:v=p):_?d==="left"||d==="end"?(D="flex-end",v=p):(d==="right"||d==="start")&&(D="flex-start",y=p):d==="left"||d==="start"?(D="flex-start",v=p):(d==="right"||d==="end")&&(D="flex-end",y=p),n.position=this._cssPosition,n.marginLeft=l?"0":v,n.marginTop=c?"0":this._topOffset,n.marginBottom=this._bottomOffset,n.marginRight=l?"0":y,e.justifyContent=D,e.alignItems=c?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,i=e.style;e.classList.remove(AI),i.justifyContent=i.alignItems=n.marginTop=n.marginBottom=n.marginLeft=n.marginRight=n.position="",this._overlayRef=null,this._isDisposed=!0}},HI=(()=>{class t{_injector=u(ce);constructor(){}global(){return Dp()}flexibleConnectedTo(e){return dd(this._injector,e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),ud=new w("OVERLAY_DEFAULT_CONFIG");function ks(t,n){t.get(ft).load(VI);let e=t.get(jI),i=t.get(Y),r=t.get(Ze),o=t.get(En),s=t.get(Rn),a=t.get(Ue,null,{optional:!0})||t.get(ct).createRenderer(null,null),l=new Is(n),c=t.get(ud,null,{optional:!0})?.usePopover??!0;l.direction=l.direction||s.value,"showPopover"in i.body?l.usePopover=n?.usePopover??c:l.usePopover=!1;let d=i.createElement("div"),p=i.createElement("div");d.id=r.getId("cdk-overlay-"),d.classList.add("cdk-overlay-pane"),p.appendChild(d),l.usePopover&&(p.setAttribute("popover","manual"),p.classList.add("cdk-overlay-popover"));let _=l.usePopover?l.positionStrategy?.getPopoverInsertionPoint?.():null;return Pb(_)?_.after(p):_?.type==="parent"?_.element.appendChild(p):e.getContainerElement().appendChild(p),new yp(new pp(d,o,t),p,d,l,t.get(U),t.get(LI),i,t.get(Ki),t.get(BI),n?.disableAnimations??t.get(so,null,{optional:!0})==="NoopAnimations",t.get(Ve),a)}var zI=(()=>{class t{scrollStrategies=u(PI);_positionBuilder=u(HI);_injector=u(ce);constructor(){}create(e){return ks(this._injector,e)}position(){return this._positionBuilder}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),oV=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"}],sV=new w("cdk-connected-overlay-scroll-strategy",{providedIn:"root",factory:()=>{let t=u(ce);return()=>Ts(t)}}),Za=(()=>{class t{elementRef=u(z);constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["","cdk-overlay-origin",""],["","overlay-origin",""],["","cdkOverlayOrigin",""]],exportAs:["cdkOverlayOrigin"]})}return t})(),UI=new w("cdk-connected-overlay-default-config"),Ep=(()=>{class t{_dir=u(Rn,{optional:!0});_injector=u(ce);_overlayRef;_templatePortal;_backdropSubscription=ke.EMPTY;_attachSubscription=ke.EMPTY;_detachSubscription=ke.EMPTY;_positionSubscription=ke.EMPTY;_offsetX;_offsetY;_position;_scrollStrategyFactory=u(sV);_ngZone=u(U);origin;positions;positionStrategy;get offsetX(){return this._offsetX}set offsetX(e){this._offsetX=e,this._position&&this._updatePositionStrategy(this._position)}get offsetY(){return this._offsetY}set offsetY(e){this._offsetY=e,this._position&&this._updatePositionStrategy(this._position)}width;height;minWidth;minHeight;backdropClass;panelClass;viewportMargin=0;scrollStrategy;open=!1;disableClose=!1;transformOriginSelector;hasBackdrop=!1;lockPosition=!1;flexibleDimensions=!1;growAfterOpen=!1;push=!1;disposeOnNavigation=!1;usePopover;matchWidth=!1;set _config(e){typeof e!="string"&&this._assignConfig(e)}backdropClick=new Z;positionChange=new Z;attach=new Z;detach=new Z;overlayKeydown=new Z;overlayOutsideClick=new Z;constructor(){let e=u(wt),i=u(Nt),r=u(UI,{optional:!0}),o=u(ud,{optional:!0});this.usePopover=o?.usePopover===!1?null:"global",this._templatePortal=new Nr(e,i),this.scrollStrategy=this._scrollStrategyFactory(),r&&this._assignConfig(r)}get overlayRef(){return this._overlayRef}get dir(){return this._dir?this._dir.value:"ltr"}ngOnDestroy(){this._attachSubscription.unsubscribe(),this._detachSubscription.unsubscribe(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this._overlayRef?.dispose()}ngOnChanges(e){this._position&&(this._updatePositionStrategy(this._position),this._overlayRef?.updateSize({width:this._getWidth(),minWidth:this.minWidth,height:this.height,minHeight:this.minHeight}),e.origin&&this.open&&this._position.apply()),e.open&&(this.open?this.attachOverlay():this.detachOverlay())}_createOverlay(){(!this.positions||!this.positions.length)&&(this.positions=oV);let e=this._overlayRef=ks(this._injector,this._buildConfig());this._attachSubscription=e.attachments().subscribe(()=>this.attach.emit()),this._detachSubscription=e.detachments().subscribe(()=>this.detach.emit()),e.keydownEvents().subscribe(i=>{this.overlayKeydown.next(i),i.keyCode===27&&!this.disableClose&&!mn(i)&&(i.preventDefault(),this.detachOverlay())}),this._overlayRef.outsidePointerEvents().subscribe(i=>{let r=this._getOriginElement(),o=tn(i);(!r||r!==o&&!r.contains(o))&&this.overlayOutsideClick.next(i)})}_buildConfig(){let e=this._position=this.positionStrategy||this._createPositionStrategy(),i=new Is({direction:this._dir||"ltr",positionStrategy:e,scrollStrategy:this.scrollStrategy,hasBackdrop:this.hasBackdrop,disposeOnNavigation:this.disposeOnNavigation,usePopover:!!this.usePopover});return(this.height||this.height===0)&&(i.height=this.height),(this.minWidth||this.minWidth===0)&&(i.minWidth=this.minWidth),(this.minHeight||this.minHeight===0)&&(i.minHeight=this.minHeight),this.backdropClass&&(i.backdropClass=this.backdropClass),this.panelClass&&(i.panelClass=this.panelClass),i}_updatePositionStrategy(e){let i=this.positions.map(r=>({originX:r.originX,originY:r.originY,overlayX:r.overlayX,overlayY:r.overlayY,offsetX:r.offsetX||this.offsetX,offsetY:r.offsetY||this.offsetY,panelClass:r.panelClass||void 0}));return e.setOrigin(this._getOrigin()).withPositions(i).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector).withPopoverLocation(this.usePopover===null?"global":this.usePopover)}_createPositionStrategy(){let e=dd(this._injector,this._getOrigin());return this._updatePositionStrategy(e),e}_getOrigin(){return this.origin instanceof Za?this.origin.elementRef:this.origin}_getOriginElement(){return this.origin instanceof Za?this.origin.elementRef.nativeElement:this.origin instanceof z?this.origin.nativeElement:typeof Element<"u"&&this.origin instanceof Element?this.origin:null}_getWidth(){return this.width?this.width:this.matchWidth?this._getOriginElement()?.getBoundingClientRect?.().width:void 0}attachOverlay(){this._overlayRef||this._createOverlay();let e=this._overlayRef;e.getConfig().hasBackdrop=this.hasBackdrop,e.updateSize({width:this._getWidth()}),e.hasAttached()||e.attach(this._templatePortal),this.hasBackdrop?this._backdropSubscription=e.backdropClick().subscribe(i=>this.backdropClick.emit(i)):this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.positionChange.observers.length>0&&(this._positionSubscription=this._position.positionChanges.pipe(Uh(()=>this.positionChange.observers.length>0)).subscribe(i=>{this._ngZone.run(()=>this.positionChange.emit(i)),this.positionChange.observers.length===0&&this._positionSubscription.unsubscribe()})),this.open=!0}detachOverlay(){this._overlayRef?.detach(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.open=!1}_assignConfig(e){this.origin=e.origin??this.origin,this.positions=e.positions??this.positions,this.positionStrategy=e.positionStrategy??this.positionStrategy,this.offsetX=e.offsetX??this.offsetX,this.offsetY=e.offsetY??this.offsetY,this.width=e.width??this.width,this.height=e.height??this.height,this.minWidth=e.minWidth??this.minWidth,this.minHeight=e.minHeight??this.minHeight,this.backdropClass=e.backdropClass??this.backdropClass,this.panelClass=e.panelClass??this.panelClass,this.viewportMargin=e.viewportMargin??this.viewportMargin,this.scrollStrategy=e.scrollStrategy??this.scrollStrategy,this.disableClose=e.disableClose??this.disableClose,this.transformOriginSelector=e.transformOriginSelector??this.transformOriginSelector,this.hasBackdrop=e.hasBackdrop??this.hasBackdrop,this.lockPosition=e.lockPosition??this.lockPosition,this.flexibleDimensions=e.flexibleDimensions??this.flexibleDimensions,this.growAfterOpen=e.growAfterOpen??this.growAfterOpen,this.push=e.push??this.push,this.disposeOnNavigation=e.disposeOnNavigation??this.disposeOnNavigation,this.usePopover=e.usePopover??this.usePopover,this.matchWidth=e.matchWidth??this.matchWidth}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["","cdk-connected-overlay",""],["","connected-overlay",""],["","cdkConnectedOverlay",""]],inputs:{origin:[0,"cdkConnectedOverlayOrigin","origin"],positions:[0,"cdkConnectedOverlayPositions","positions"],positionStrategy:[0,"cdkConnectedOverlayPositionStrategy","positionStrategy"],offsetX:[0,"cdkConnectedOverlayOffsetX","offsetX"],offsetY:[0,"cdkConnectedOverlayOffsetY","offsetY"],width:[0,"cdkConnectedOverlayWidth","width"],height:[0,"cdkConnectedOverlayHeight","height"],minWidth:[0,"cdkConnectedOverlayMinWidth","minWidth"],minHeight:[0,"cdkConnectedOverlayMinHeight","minHeight"],backdropClass:[0,"cdkConnectedOverlayBackdropClass","backdropClass"],panelClass:[0,"cdkConnectedOverlayPanelClass","panelClass"],viewportMargin:[0,"cdkConnectedOverlayViewportMargin","viewportMargin"],scrollStrategy:[0,"cdkConnectedOverlayScrollStrategy","scrollStrategy"],open:[0,"cdkConnectedOverlayOpen","open"],disableClose:[0,"cdkConnectedOverlayDisableClose","disableClose"],transformOriginSelector:[0,"cdkConnectedOverlayTransformOriginOn","transformOriginSelector"],hasBackdrop:[2,"cdkConnectedOverlayHasBackdrop","hasBackdrop",H],lockPosition:[2,"cdkConnectedOverlayLockPosition","lockPosition",H],flexibleDimensions:[2,"cdkConnectedOverlayFlexibleDimensions","flexibleDimensions",H],growAfterOpen:[2,"cdkConnectedOverlayGrowAfterOpen","growAfterOpen",H],push:[2,"cdkConnectedOverlayPush","push",H],disposeOnNavigation:[2,"cdkConnectedOverlayDisposeOnNavigation","disposeOnNavigation",H],usePopover:[0,"cdkConnectedOverlayUsePopover","usePopover"],matchWidth:[2,"cdkConnectedOverlayMatchWidth","matchWidth",H],_config:[0,"cdkConnectedOverlay","_config"]},outputs:{backdropClick:"backdropClick",positionChange:"positionChange",attach:"attach",detach:"detach",overlayKeydown:"overlayKeydown",overlayOutsideClick:"overlayOutsideClick"},exportAs:["cdkConnectedOverlay"],features:[et]})}return t})(),Rs=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({providers:[zI],imports:[me,Qa,sd,sd]})}return t})();var Sp=(()=>{class t{_animationsDisabled=tt();state="unchecked";disabled=!1;appearance="full";constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(i,r){i&2&&P("mat-pseudo-checkbox-indeterminate",r.state==="indeterminate")("mat-pseudo-checkbox-checked",r.state==="checked")("mat-pseudo-checkbox-disabled",r.disabled)("mat-pseudo-checkbox-minimal",r.appearance==="minimal")("mat-pseudo-checkbox-full",r.appearance==="full")("_mat-animation-noopable",r._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(i,r){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--mat-pseudo-checkbox-full-unselected-icon-color, var(--mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--mat-pseudo-checkbox-full-selected-icon-color, var(--mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-full-selected-checkmark-color, var(--mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2,changeDetection:0})}return t})();var aV=["text"],lV=[[["mat-icon"]],"*"],cV=["mat-icon","*"];function dV(t,n){if(t&1&&W(0,"mat-pseudo-checkbox",1),t&2){let e=E();b("disabled",e.disabled)("state",e.selected?"checked":"unchecked")}}function uV(t,n){if(t&1&&W(0,"mat-pseudo-checkbox",3),t&2){let e=E();b("disabled",e.disabled)}}function fV(t,n){if(t&1&&(f(0,"span",4),g(1),m()),t&2){let e=E();h(),X("(",e.group.label,")")}}var Lb=new w("MAT_OPTION_PARENT_COMPONENT"),Bb=new w("MatOptgroup");var Fb=class{source;isUserInput;constructor(n,e=!1){this.source=n,this.isUserInput=e}},xo=(()=>{class t{_element=u(z);_changeDetectorRef=u(De);_parent=u(Lb,{optional:!0});group=u(Bb,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue="";get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=u(Ze).getId("mat-option-");get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=T(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new Z;_text;_stateChanges=new F;constructor(){let e=u(ft);e.load(ci),e.load(Cs),this._signalDisableRipple=!!this._parent&&Gi(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||"").trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,i){let r=this._getHostElement();typeof r.focus=="function"&&r.focus(i)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!mn(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new Fb(this,e))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-option"]],viewQuery:function(i,r){if(i&1&&$e(aV,7),i&2){let o;q(o=K())&&(r._text=o.first)}},hostAttrs:["role","option",1,"mat-mdc-option","mdc-list-item"],hostVars:11,hostBindings:function(i,r){i&1&&k("click",function(){return r._selectViaInteraction()})("keydown",function(s){return r._handleKeydown(s)}),i&2&&(Vn("id",r.id),ae("aria-selected",r.selected)("aria-disabled",r.disabled.toString()),P("mdc-list-item--selected",r.selected)("mat-mdc-option-multiple",r.multiple)("mat-mdc-option-active",r.active)("mdc-list-item--disabled",r.disabled))},inputs:{value:"value",id:"id",disabled:[2,"disabled","disabled",H]},outputs:{onSelectionChange:"onSelectionChange"},exportAs:["matOption"],ngContentSelectors:cV,decls:8,vars:5,consts:[["text",""],["aria-hidden","true",1,"mat-mdc-option-pseudo-checkbox",3,"disabled","state"],[1,"mdc-list-item__primary-text"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"cdk-visually-hidden"],["aria-hidden","true","mat-ripple","",1,"mat-mdc-option-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"]],template:function(i,r){i&1&&(Ie(lV),he(0,dV,1,2,"mat-pseudo-checkbox",1),re(1),f(2,"span",2,0),re(4,1),m(),he(5,uV,1,1,"mat-pseudo-checkbox",3),he(6,fV,2,1,"span",4),W(7,"div",5)),i&2&&(ge(r.multiple?0:-1),h(5),ge(!r.multiple&&r.selected&&!r.hideSingleSelectionIndicator?5:-1),h(),ge(r.group&&r.group._inert?6:-1),h(),b("matRippleTrigger",r._getHostElement())("matRippleDisabled",r.disabled||r.disableRipple))},dependencies:[Sp,ir],styles:[`.mat-mdc-option {
  -webkit-user-select: none;
  user-select: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  min-height: 48px;
  padding: 0 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  color: var(--mat-option-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-option-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-option-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-option-label-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-option-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-option-label-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-option:hover:not(.mdc-list-item--disabled) {
  background-color: var(--mat-option-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {
  background-color: var(--mat-option-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
  outline: 0;
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {
  background-color: var(--mat-option-selected-state-layer-color, var(--mat-sys-secondary-container));
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {
  color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option.mdc-list-item {
  align-items: center;
  background: transparent;
}
.mat-mdc-option.mdc-list-item--disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {
  opacity: 0.38;
}
.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 32px;
}
[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 16px;
  padding-right: 32px;
}
.mat-mdc-option .mat-icon,
.mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-icon,
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 0;
  margin-left: 16px;
}
.mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-left: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-right: 16px;
  margin-left: 0;
}
.mat-mdc-option .mat-mdc-option-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-family: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  margin-right: auto;
}
[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {
  margin-right: 0;
  margin-left: auto;
}
@media (forced-colors: active) {
  .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  [dir=rtl] .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-option-multiple {
  --mat-list-list-item-selected-container-color: var(--mat-list-list-item-container-color, transparent);
}

.mat-mdc-option-active .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return t})();function $I(t,n,e){if(e.length){let i=n.toArray(),r=e.toArray(),o=0;for(let s=0;s<t+1;s++)i[s].group&&i[s].group===r[o]&&o++;return o}return 0}function GI(t,n,e,i){return t<e?t:t+n>e+i?Math.max(0,t-i+n):e}var WI=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[me]})}return t})();var Vb=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[rr,WI,xo,me]})}return t})();var mV=["trigger"],pV=["panel"],hV=[[["mat-select-trigger"]],"*"],gV=["mat-select-trigger","*"];function vV(t,n){if(t&1&&(f(0,"span",4),g(1),m()),t&2){let e=E();h(),ee(e.placeholder)}}function _V(t,n){t&1&&re(0)}function yV(t,n){if(t&1&&(f(0,"span",11),g(1),m()),t&2){let e=E(2);h(),ee(e.triggerValue)}}function bV(t,n){if(t&1&&(f(0,"span",5),he(1,_V,1,0)(2,yV,2,1,"span",11),m()),t&2){let e=E();h(),ge(e.customTrigger?1:2)}}function CV(t,n){if(t&1){let e=Ke();f(0,"div",12,1),k("keydown",function(r){oe(e);let o=E();return se(o._handleKeydown(r))}),re(2,1),m()}if(t&2){let e=E();_t(e.panelClass),P("mat-select-panel-animations-enabled",!e._animationsDisabled)("mat-primary",(e._parentFormField==null?null:e._parentFormField.color)==="primary")("mat-accent",(e._parentFormField==null?null:e._parentFormField.color)==="accent")("mat-warn",(e._parentFormField==null?null:e._parentFormField.color)==="warn")("mat-undefined",!(e._parentFormField!=null&&e._parentFormField.color)),ae("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby())}}var wV=new w("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{let t=u(ce);return()=>Ts(t)}}),DV=new w("MAT_SELECT_CONFIG"),EV=new w("MatSelectTrigger"),jb=class{source;value;constructor(n,e){this.source=n,this.value=e}},xp=(()=>{class t{_viewportRuler=u(Or);_changeDetectorRef=u(De);_elementRef=u(z);_dir=u(Rn,{optional:!0});_idGenerator=u(Ze);_renderer=u(Ue);_parentFormField=u(Ga,{optional:!0});ngControl=u(Ir,{self:!0,optional:!0});_liveAnnouncer=u(Zc);_defaultOptions=u(DV,{optional:!0});_animationsDisabled=tt();_popoverLocation;_initialized=new F;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}];_scrollOptionIntoView(e){let i=this.options.toArray()[e];if(i){let r=this.panel.nativeElement,o=$I(e,this.options,this.optionGroups),s=i._getHostElement();e===0&&o===1?r.scrollTop=0:r.scrollTop=GI(s.offsetTop,s.offsetHeight,r.scrollTop,r.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new jb(this,e)}_scrollStrategyFactory=u(wV);_panelOpen=!1;_compareWith=(e,i)=>e===i;_uid=this._idGenerator.getId("mat-select-");_triggerAriaLabelledBy=null;_previousControl;_destroy=new F;_errorStateTracker;stateChanges=new F;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId("mat-select-value-");_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||"";get focused(){return this._focused||this._panelOpen}_focused=!1;controlType="mat-select";trigger;panel;_overlayDir;panelClass;disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e)}_disableRipple=T(!1);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(Fa.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel="";ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto";canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=$o(()=>{let e=this.options;return e?e.changes.pipe(zt(e),Ct(()=>Go(...e.map(i=>i.onSelectionChange)))):this._initialized.pipe(Ct(()=>this.optionSelectionChanges))});openedChange=new Z;_openedStream=this.openedChange.pipe(We(e=>e),ue(()=>{}));_closedStream=this.openedChange.pipe(We(e=>!e),ue(()=>{}));selectionChange=new Z;valueChange=new Z;constructor(){let e=u(wo),i=u(Vt,{optional:!0}),r=u(Gc,{optional:!0}),o=u(new Sn("tabindex"),{optional:!0}),s=u(ud,{optional:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new Wa(e,this.ngControl,r,i,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=o==null?0:parseInt(o)||0,this._popoverLocation=s?.usePopover===!1?null:"inline",this.id=this.id}ngOnInit(){this._selectionModel=new Ss(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(xe(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(xe(this._destroy)).subscribe(e=>{e.added.forEach(i=>i.select()),e.removed.forEach(i=>i.deselect())}),this.options.changes.pipe(zt(null),xe(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),i=this.ngControl;if(e!==this._triggerAriaLabelledBy){let r=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?r.setAttribute("aria-labelledby",e):r.removeAttribute("aria-labelledby")}i&&(this._previousControl!==i.control&&(this._previousControl!==void 0&&i.disabled!==null&&i.disabled!==this.disabled&&(this.disabled=i.disabled),this._previousControl=i.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass))}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete(),this._clearFromModal()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._applyModalPanelOwnership(),this._panelOpen=!0,this._overlayDir.positionChange.pipe(hn(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!0)))}_trackedModal=null;_applyModalPanelOwnership(){let e=this._elementRef.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');if(!e)return;let i=`${this.id}-panel`;this._trackedModal&&sp(this._trackedModal,"aria-owns",i),gb(e,"aria-owns",i),this._trackedModal=e}_clearFromModal(){if(!this._trackedModal)return;let e=`${this.id}-panel`;sp(this._trackedModal,"aria-owns",e),this._trackedModal=null}close(){this._panelOpen&&(this._panelOpen=!1,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!1)))}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{i(),clearTimeout(r),this._cleanupDetach=void 0};let e=this.panel.nativeElement,i=this._renderer.listen(e,"animationend",o=>{o.animationName==="_mat-select-exit"&&(this._cleanupDetach?.(),this._detachOverlay())}),r=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay()},200);e.classList.add("mat-select-panel-exit")}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck()}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return"";if(this._multiple){let e=this._selectionModel.selected.map(i=>i.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value==="rtl":!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let i=e.keyCode,r=i===40||i===38||i===37||i===39,o=i===13||i===32,s=this._keyManager;if(!s.isTyping()&&o&&!mn(e)||(this.multiple||e.altKey)&&r)e.preventDefault(),this.open();else if(!this.multiple){let a=this.selected;s.onKeydown(e);let l=this.selected;l&&a!==l&&this._liveAnnouncer.announce(l.viewValue,1e4)}}_handleOpenKeydown(e){let i=this._keyManager,r=e.keyCode,o=r===40||r===38,s=i.isTyping();if(o&&e.altKey)e.preventDefault(),this.close();else if(!s&&(r===13||r===32)&&i.activeItem&&!mn(e))e.preventDefault(),i.activeItem._selectViaInteraction();else if(!s&&this._multiple&&r===65&&e.ctrlKey){e.preventDefault();let a=this.options.some(l=>!l.disabled&&!l.selected);this.options.forEach(l=>{l.disabled||(a?l.select():l.deselect())})}else{let a=i.activeItemIndex;i.onKeydown(e),this._multiple&&o&&e.shiftKey&&i.activeItem&&i.activeItemIndex!==a&&i.activeItem._selectViaInteraction()}}_handleOverlayKeydown(e){e.keyCode===27&&!mn(e)&&(e.preventDefault(),this.close())}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(i=>i.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)Array.isArray(e),e.forEach(i=>this._selectOptionByValue(i)),this._sortValues();else{let i=this._selectOptionByValue(e);i?this._keyManager.updateActiveItem(i):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let i=this.options.find(r=>{if(this._selectionModel.isSelected(r))return!1;try{return(r.value!=null||this.canSelectNullableOptions)&&this._compareWith(r.value,e)}catch{return!1}});return i&&this._selectionModel.select(i),i}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth==="auto"?(e instanceof Za?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?"":this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new ed(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=Go(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(xe(e)).subscribe(i=>{this._onSelect(i.source,i.isUserInput),i.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),Go(...this.options.map(i=>i._stateChanges)).pipe(xe(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,i){let r=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(r!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),i&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),i&&this.focus())),r!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((i,r)=>this.sortComparator?this.sortComparator(i,r,e):e.indexOf(i)-e.indexOf(r)),this.stateChanges.next()}}_propagateChanges(e){let i;this.multiple?i=this.selected.map(r=>r.value):i=this.selected?this.selected.value:e,this._value=i,this.valueChange.emit(i),this._onChange(i),this.selectionChange.emit(this._getChangeEvent(i)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let i=0;i<this.options.length;i++)if(!this.options.get(i).disabled){e=i;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,i=e?e+" ":"";return this.ariaLabelledby?i+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||"";return this.ariaLabelledby&&(e+=" "+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let i=this._elementRef.nativeElement;e.length?i.setAttribute("aria-describedby",e.join(" ")):i.removeAttribute("aria-describedby")}onContainerClick(e){let i=tn(e);i&&(i.tagName==="MAT-OPTION"||i.classList.contains("cdk-overlay-backdrop")||i.closest(".mat-mdc-select-panel"))||(this.focus(),this.open())}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-select"]],contentQueries:function(i,r,o){if(i&1&&Et(o,EV,5)(o,xo,5)(o,Bb,5),i&2){let s;q(s=K())&&(r.customTrigger=s.first),q(s=K())&&(r.options=s),q(s=K())&&(r.optionGroups=s)}},viewQuery:function(i,r){if(i&1&&$e(mV,5)(pV,5)(Ep,5),i&2){let o;q(o=K())&&(r.trigger=o.first),q(o=K())&&(r.panel=o.first),q(o=K())&&(r._overlayDir=o.first)}},hostAttrs:["role","combobox","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:21,hostBindings:function(i,r){i&1&&k("keydown",function(s){return r._handleKeydown(s)})("focus",function(){return r._onFocus()})("blur",function(){return r._onBlur()}),i&2&&(ae("id",r.id)("tabindex",r.disabled?-1:r.tabIndex)("aria-controls",r.panelOpen?r.id+"-panel":null)("aria-expanded",r.panelOpen)("aria-label",r.ariaLabel||null)("aria-required",r.required.toString())("aria-disabled",r.disabled.toString())("aria-invalid",r.errorState)("aria-activedescendant",r._getAriaActiveDescendant()),P("mat-mdc-select-disabled",r.disabled)("mat-mdc-select-invalid",r.errorState)("mat-mdc-select-required",r.required)("mat-mdc-select-empty",r.empty)("mat-mdc-select-multiple",r.multiple)("mat-select-open",r.panelOpen))},inputs:{userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[2,"disabled","disabled",H],disableRipple:[2,"disableRipple","disableRipple",H],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:St(e)],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",H],placeholder:"placeholder",required:[2,"required","required",H],multiple:[2,"multiple","multiple",H],disableOptionCentering:[2,"disableOptionCentering","disableOptionCentering",H],compareWith:"compareWith",value:"value",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[2,"typeaheadDebounceInterval","typeaheadDebounceInterval",St],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth",canSelectNullableOptions:[2,"canSelectNullableOptions","canSelectNullableOptions",H]},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],features:[ze([{provide:$a,useExisting:t},{provide:Lb,useExisting:t}]),et],ngContentSelectors:gV,decls:11,vars:10,consts:[["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],["panel",""],["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],[1,"mat-mdc-select-value"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"detach","backdropClick","overlayKeydown","cdkConnectedOverlayDisableClose","cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth","cdkConnectedOverlayFlexibleDimensions","cdkConnectedOverlayUsePopover"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",1,"mat-mdc-select-panel","mdc-menu-surface","mdc-menu-surface--open",3,"keydown"]],template:function(i,r){if(i&1&&(Ie(hV),f(0,"div",2,0),k("click",function(){return r.open()}),f(3,"div",3),he(4,vV,2,1,"span",4)(5,bV,3,1,"span",5),m(),f(6,"div",6)(7,"div",7),vr(),f(8,"svg",8),W(9,"path",9),m()()()(),j(10,CV,3,16,"ng-template",10),k("detach",function(){return r.close()})("backdropClick",function(){return r.close()})("overlayKeydown",function(s){return r._handleOverlayKeydown(s)})),i&2){let o=at(1);h(3),ae("id",r._valueId),h(),ge(r.empty?4:5),h(6),b("cdkConnectedOverlayDisableClose",!0)("cdkConnectedOverlayPanelClass",r._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",r._scrollStrategy)("cdkConnectedOverlayOrigin",r._preferredOverlayOrigin||o)("cdkConnectedOverlayPositions",r._positions)("cdkConnectedOverlayWidth",r._overlayWidth)("cdkConnectedOverlayFlexibleDimensions",!0)("cdkConnectedOverlayUsePopover",r._popoverLocation)}},dependencies:[Za,Ep],styles:[`@keyframes _mat-select-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-select-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-select {
  display: inline-block;
  width: 100%;
  outline: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--mat-select-enabled-trigger-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-select-trigger-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-select-trigger-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-select-trigger-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-select-trigger-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-select-trigger-text-tracking, var(--mat-sys-body-large-tracking));
}

div.mat-mdc-select-panel {
  box-shadow: var(--mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}

.mat-mdc-select-disabled {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-select-disabled .mat-mdc-select-placeholder {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-select-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.mat-mdc-select-disabled .mat-mdc-select-trigger {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

.mat-mdc-select-value {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-mdc-select-value-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mat-mdc-select-arrow-wrapper {
  height: 24px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}
.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper {
  transform: none;
}

.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,
.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after {
  color: var(--mat-select-invalid-arrow-color, var(--mat-sys-error));
}

.mat-mdc-select-arrow {
  width: 10px;
  height: 5px;
  position: relative;
  color: var(--mat-select-enabled-arrow-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {
  color: var(--mat-select-focused-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {
  color: var(--mat-select-disabled-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-select-open .mat-mdc-select-arrow {
  transform: rotate(180deg);
}
.mat-form-field-animations-enabled .mat-mdc-select-arrow {
  transition: transform 80ms linear;
}
.mat-mdc-select-arrow svg {
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (forced-colors: active) {
  .mat-mdc-select-arrow svg {
    fill: CanvasText;
  }
  .mat-mdc-select-disabled .mat-mdc-select-arrow svg {
    fill: GrayText;
  }
}

div.mat-mdc-select-panel {
  width: 100%;
  max-height: 275px;
  outline: 0;
  overflow: auto;
  padding: 8px 0;
  box-sizing: border-box;
  transform-origin: top center;
  border-radius: 0 0 4px 4px;
  position: relative;
  background-color: var(--mat-select-panel-background-color, var(--mat-sys-surface-container));
}
.mat-mdc-select-panel-above div.mat-mdc-select-panel {
  border-radius: 4px 4px 0 0;
  transform-origin: bottom center;
}
@media (forced-colors: active) {
  div.mat-mdc-select-panel {
    outline: solid 1px;
  }
}

.mat-select-panel-animations-enabled {
  animation: _mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-select-panel-animations-enabled.mat-select-panel-exit {
  animation: _mat-select-exit 100ms linear;
}

.mat-mdc-select-placeholder {
  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--mat-select-placeholder-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder, ._mat-animation-noopable .mat-mdc-select-placeholder {
  transition: none;
}
.mat-form-field-hide-placeholder .mat-mdc-select-placeholder {
  color: transparent;
  -webkit-text-fill-color: transparent;
  transition: none;
  display: block;
}

.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper {
  cursor: pointer;
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label {
  max-width: calc(100% - 18px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above {
  max-width: calc(100% / 0.75 - 24px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch {
  max-width: calc(100% - 60px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch {
  max-width: calc(100% - 24px);
}

.mat-mdc-select-min-line:empty::before {
  content: " ";
  white-space: pre;
  width: 1px;
  display: inline-block;
  visibility: hidden;
}

.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper {
  transform: var(--mat-select-arrow-transform, translateY(-8px));
}
`],encapsulation:2,changeDetection:0})}return t})();var Mo=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[Rs,Vb,me,xs,bt,Vb]})}return t})();var KI=(()=>{class t{get vertical(){return this._vertical}set vertical(e){this._vertical=oi(e)}_vertical=!1;get inset(){return this._inset}set inset(e){this._inset=oi(e)}_inset=!1;static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-divider"]],hostAttrs:["role","separator",1,"mat-divider"],hostVars:7,hostBindings:function(i,r){i&2&&(ae("aria-orientation",r.vertical?"vertical":"horizontal"),P("mat-divider-vertical",r.vertical)("mat-divider-horizontal",!r.vertical)("mat-divider-inset",r.inset))},inputs:{vertical:"vertical",inset:"inset"},decls:0,vars:0,template:function(i,r){},styles:[`.mat-divider {
  display: block;
  margin: 0;
  border-top-style: solid;
  border-top-color: var(--mat-divider-color, var(--mat-sys-outline-variant));
  border-top-width: var(--mat-divider-width, 1px);
}
.mat-divider.mat-divider-vertical {
  border-top: 0;
  border-right-style: solid;
  border-right-color: var(--mat-divider-color, var(--mat-sys-outline-variant));
  border-right-width: var(--mat-divider-width, 1px);
}
.mat-divider.mat-divider-inset {
  margin-left: 80px;
}
[dir=rtl] .mat-divider.mat-divider-inset {
  margin-left: auto;
  margin-right: 80px;
}
`],encapsulation:2,changeDetection:0})}return t})(),YI=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[me]})}return t})();var xV=["tooltip"],MV=20;var IV=new w("mat-tooltip-scroll-strategy",{providedIn:"root",factory:()=>{let t=u(ce);return()=>Ts(t,{scrollThrottle:MV})}}),TV=new w("mat-tooltip-default-options",{providedIn:"root",factory:()=>({showDelay:0,hideDelay:0,touchendHideDelay:1500})});var QI="tooltip-panel",kV={passive:!0},RV=8,AV=8,OV=24,NV=200,Pr=(()=>{class t{_elementRef=u(z);_ngZone=u(U);_platform=u(Re);_ariaDescriber=u(zM);_focusMonitor=u(qn);_dir=u(Rn);_injector=u(ce);_viewContainerRef=u(Nt);_mediaMatcher=u(Ha);_document=u(Y);_renderer=u(Ue);_animationsDisabled=tt();_defaultOptions=u(TV,{optional:!0});_overlayRef=null;_tooltipInstance=null;_overlayPanelClass;_portal;_position="below";_positionAtOrigin=!1;_disabled=!1;_tooltipClass;_viewInitialized=!1;_pointerExitEventsInitialized=!1;_tooltipComponent=ZI;_viewportMargin=8;_currentPosition;_cssClassPrefix="mat-mdc";_ariaDescriptionPending=!1;_dirSubscribed=!1;get position(){return this._position}set position(e){e!==this._position&&(this._position=e,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()))}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(e){this._positionAtOrigin=oi(e),this._detach(),this._overlayRef=null}get disabled(){return this._disabled}set disabled(e){let i=oi(e);this._disabled!==i&&(this._disabled=i,i?this.hide(0):this._setupPointerEnterEventsIfNeeded(),this._syncAriaDescription(this.message))}get showDelay(){return this._showDelay}set showDelay(e){this._showDelay=Va(e)}_showDelay;get hideDelay(){return this._hideDelay}set hideDelay(e){this._hideDelay=Va(e),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}_hideDelay;touchGestures="auto";get message(){return this._message}set message(e){let i=this._message;this._message=e!=null?String(e).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage()),this._syncAriaDescription(i)}_message="";get tooltipClass(){return this._tooltipClass}set tooltipClass(e){this._tooltipClass=e,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}_eventCleanups=[];_touchstartTimeout=null;_destroyed=new F;_isDestroyed=!1;constructor(){let e=this._defaultOptions;e&&(this._showDelay=e.showDelay,this._hideDelay=e.hideDelay,e.position&&(this.position=e.position),e.positionAtOrigin&&(this.positionAtOrigin=e.positionAtOrigin),e.touchGestures&&(this.touchGestures=e.touchGestures),e.tooltipClass&&(this.tooltipClass=e.tooltipClass)),this._viewportMargin=RV}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe(xe(this._destroyed)).subscribe(e=>{e?e==="keyboard"&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){let e=this._elementRef.nativeElement;this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._eventCleanups.forEach(i=>i()),this._eventCleanups.length=0,this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=!0,this._ariaDescriber.removeDescription(e,this.message,"tooltip"),this._focusMonitor.stopMonitoring(e)}show(e=this.showDelay,i){if(this.disabled||!this.message||this._isTooltipVisible()){this._tooltipInstance?._cancelPendingAnimations();return}let r=this._createOverlay(i);this._detach(),this._portal=this._portal||new So(this._tooltipComponent,this._viewContainerRef);let o=this._tooltipInstance=r.attach(this._portal).instance;o._triggerElement=this._elementRef.nativeElement,o._mouseLeaveHideDelay=this._hideDelay,o.afterHidden().pipe(xe(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),o.show(e)}hide(e=this.hideDelay){let i=this._tooltipInstance;i&&(i.isVisible()?i.hide(e):(i._cancelPendingAnimations(),this._detach()))}toggle(e){this._isTooltipVisible()?this.hide():this.show(void 0,e)}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(e){if(this._overlayRef){let s=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!e)&&s._origin instanceof z)return this._overlayRef;this._detach()}let i=this._injector.get(Ka).getAncestorScrollContainers(this._elementRef),r=`${this._cssClassPrefix}-${QI}`,o=dd(this._injector,this.positionAtOrigin?e||this._elementRef:this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(i).withPopoverLocation("global");return o.positionChanges.pipe(xe(this._destroyed)).subscribe(s=>{this._updateCurrentPositionClass(s.connectionPair),this._tooltipInstance&&s.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=ks(this._injector,{direction:this._dir,positionStrategy:o,panelClass:this._overlayPanelClass?[...this._overlayPanelClass,r]:r,scrollStrategy:this._injector.get(IV)(),disableAnimations:this._animationsDisabled,eventPredicate:this._overlayEventPredicate}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe(xe(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe(xe(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe(xe(this._destroyed)).subscribe(s=>{s.preventDefault(),s.stopPropagation(),this._ngZone.run(()=>this.hide(0))}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._dirSubscribed||(this._dirSubscribed=!0,this._dir.change.pipe(xe(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)})),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(e){let i=e.getConfig().positionStrategy,r=this._getOrigin(),o=this._getOverlayPosition();i.withPositions([this._addOffset(S(S({},r.main),o.main)),this._addOffset(S(S({},r.fallback),o.fallback))])}_addOffset(e){let i=AV,r=!this._dir||this._dir.value=="ltr";return e.originY==="top"?e.offsetY=-i:e.originY==="bottom"?e.offsetY=i:e.originX==="start"?e.offsetX=r?-i:i:e.originX==="end"&&(e.offsetX=r?i:-i),e}_getOrigin(){let e=!this._dir||this._dir.value=="ltr",i=this.position,r;i=="above"||i=="below"?r={originX:"center",originY:i=="above"?"top":"bottom"}:i=="before"||i=="left"&&e||i=="right"&&!e?r={originX:"start",originY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(r={originX:"end",originY:"center"});let{x:o,y:s}=this._invertPosition(r.originX,r.originY);return{main:r,fallback:{originX:o,originY:s}}}_getOverlayPosition(){let e=!this._dir||this._dir.value=="ltr",i=this.position,r;i=="above"?r={overlayX:"center",overlayY:"bottom"}:i=="below"?r={overlayX:"center",overlayY:"top"}:i=="before"||i=="left"&&e||i=="right"&&!e?r={overlayX:"end",overlayY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(r={overlayX:"start",overlayY:"center"});let{x:o,y:s}=this._invertPosition(r.overlayX,r.overlayY);return{main:r,fallback:{overlayX:o,overlayY:s}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),$t(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()},{injector:this._injector}))}_setTooltipClass(e){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=e instanceof Set?Array.from(e):e,this._tooltipInstance._markForCheck())}_invertPosition(e,i){return this.position==="above"||this.position==="below"?i==="top"?i="bottom":i==="bottom"&&(i="top"):e==="end"?e="start":e==="start"&&(e="end"),{x:e,y:i}}_updateCurrentPositionClass(e){let{overlayY:i,originX:r,originY:o}=e,s;if(i==="center"?this._dir&&this._dir.value==="rtl"?s=r==="end"?"left":"right":s=r==="start"?"left":"right":s=i==="bottom"&&o==="top"?"above":"below",s!==this._currentPosition){let a=this._overlayRef;if(a){let l=`${this._cssClassPrefix}-${QI}-`;a.removePanelClass(l+this._currentPosition),a.addPanelClass(l+s)}this._currentPosition=s}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._eventCleanups.length||(this._isTouchPlatform()?this.touchGestures!=="off"&&(this._disableNativeGesturesIfNecessary(),this._addListener("touchstart",e=>{let i=e.targetTouches?.[0],r=i?{x:i.clientX,y:i.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),this._touchstartTimeout&&clearTimeout(this._touchstartTimeout);let o=500;this._touchstartTimeout=setTimeout(()=>{this._touchstartTimeout=null,this.show(void 0,r)},this._defaultOptions?.touchLongPressShowDelay??o)})):this._addListener("mouseenter",e=>{this._setupPointerExitEventsIfNeeded();let i;e.x!==void 0&&e.y!==void 0&&(i=e),this.show(void 0,i)}))}_setupPointerExitEventsIfNeeded(){if(!this._pointerExitEventsInitialized){if(this._pointerExitEventsInitialized=!0,!this._isTouchPlatform())this._addListener("mouseleave",e=>{let i=e.relatedTarget;(!i||!this._overlayRef?.overlayElement.contains(i))&&this.hide()}),this._addListener("wheel",e=>{if(this._isTooltipVisible()){let i=this._document.elementFromPoint(e.clientX,e.clientY),r=this._elementRef.nativeElement;i!==r&&!r.contains(i)&&this.hide()}});else if(this.touchGestures!=="off"){this._disableNativeGesturesIfNecessary();let e=()=>{this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions?.touchendHideDelay)};this._addListener("touchend",e),this._addListener("touchcancel",e)}}}_addListener(e,i){this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement,e,i,kV))}_isTouchPlatform(){let e=this._defaultOptions?.detectHoverCapability;return typeof e=="function"?!e():this._platform.IOS||this._platform.ANDROID?!0:this._platform.isBrowser?!!e&&this._mediaMatcher.matchMedia("(any-hover: none)").matches:!1}_disableNativeGesturesIfNecessary(){let e=this.touchGestures;if(e!=="off"){let i=this._elementRef.nativeElement,r=i.style;(e==="on"||i.nodeName!=="INPUT"&&i.nodeName!=="TEXTAREA")&&(r.userSelect=r.msUserSelect=r.webkitUserSelect=r.MozUserSelect="none"),(e==="on"||!i.draggable)&&(r.webkitUserDrag="none"),r.touchAction="none",r.webkitTapHighlightColor="transparent"}}_syncAriaDescription(e){this._ariaDescriptionPending||(this._ariaDescriptionPending=!0,this._ariaDescriber.removeDescription(this._elementRef.nativeElement,e,"tooltip"),this._isDestroyed||$t({write:()=>{this._ariaDescriptionPending=!1,this.message&&!this.disabled&&this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")}},{injector:this._injector}))}_overlayEventPredicate=e=>e.type==="keydown"?this._isTooltipVisible()&&e.keyCode===27&&!mn(e):!0;static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-mdc-tooltip-trigger"],hostVars:2,hostBindings:function(i,r){i&2&&P("mat-mdc-tooltip-disabled",r.disabled)},inputs:{position:[0,"matTooltipPosition","position"],positionAtOrigin:[0,"matTooltipPositionAtOrigin","positionAtOrigin"],disabled:[0,"matTooltipDisabled","disabled"],showDelay:[0,"matTooltipShowDelay","showDelay"],hideDelay:[0,"matTooltipHideDelay","hideDelay"],touchGestures:[0,"matTooltipTouchGestures","touchGestures"],message:[0,"matTooltip","message"],tooltipClass:[0,"matTooltipClass","tooltipClass"]},exportAs:["matTooltip"]})}return t})(),ZI=(()=>{class t{_changeDetectorRef=u(De);_elementRef=u(z);_isMultiline=!1;message;tooltipClass;_showTimeoutId;_hideTimeoutId;_triggerElement;_mouseLeaveHideDelay;_animationsDisabled=tt();_tooltip;_closeOnInteraction=!1;_isVisible=!1;_onHide=new F;_showAnimation="mat-mdc-tooltip-show";_hideAnimation="mat-mdc-tooltip-hide";constructor(){}show(e){this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0},e)}hide(e){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0},e)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget:e}){(!e||!this._triggerElement.contains(e))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(!1))}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck()}_isTooltipMultiline(){let e=this._elementRef.nativeElement.getBoundingClientRect();return e.height>OV&&e.width>=NV}_handleAnimationEnd({animationName:e}){(e===this._showAnimation||e===this._hideAnimation)&&this._finalizeAnimation(e===this._showAnimation)}_cancelPendingAnimations(){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0}_finalizeAnimation(e){e?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(e){let i=this._tooltip.nativeElement,r=this._showAnimation,o=this._hideAnimation;if(i.classList.remove(e?o:r),i.classList.add(e?r:o),this._isVisible!==e&&(this._isVisible=e,this._changeDetectorRef.markForCheck()),e&&!this._animationsDisabled&&typeof getComputedStyle=="function"){let s=getComputedStyle(i);(s.getPropertyValue("animation-duration")==="0s"||s.getPropertyValue("animation-name")==="none")&&(this._animationsDisabled=!0)}e&&this._onShow(),this._animationsDisabled&&(i.classList.add("_mat-animation-noopable"),this._finalizeAnimation(e))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-tooltip-component"]],viewQuery:function(i,r){if(i&1&&$e(xV,7),i&2){let o;q(o=K())&&(r._tooltip=o.first)}},hostAttrs:["aria-hidden","true"],hostBindings:function(i,r){i&1&&k("mouseleave",function(s){return r._handleMouseLeave(s)})},decls:4,vars:5,consts:[["tooltip",""],[1,"mdc-tooltip","mat-mdc-tooltip",3,"animationend"],[1,"mat-mdc-tooltip-surface","mdc-tooltip__surface"]],template:function(i,r){i&1&&(gt(0,"div",1,0),Of("animationend",function(s){return r._handleAnimationEnd(s)}),gt(2,"div",2),g(3),Dt()()),i&2&&(_t(r.tooltipClass),P("mdc-tooltip--multiline",r._isMultiline),h(3),ee(r.message))},styles:[`.mat-mdc-tooltip {
  position: relative;
  transform: scale(0);
  display: inline-flex;
}
.mat-mdc-tooltip::before {
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  position: absolute;
}
.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before {
  top: -8px;
}
.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before {
  bottom: -8px;
}
.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before {
  left: -8px;
}
.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before {
  right: -8px;
}
.mat-mdc-tooltip._mat-animation-noopable {
  animation: none;
  transform: scale(1);
}

.mat-mdc-tooltip-surface {
  word-break: normal;
  overflow-wrap: anywhere;
  padding: 4px 8px;
  min-width: 40px;
  max-width: 200px;
  min-height: 24px;
  max-height: 40vh;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  will-change: transform, opacity;
  background-color: var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));
  color: var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));
  border-radius: var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));
  font-family: var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));
  font-size: var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));
  font-weight: var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));
  line-height: var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));
  letter-spacing: var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking));
}
.mat-mdc-tooltip-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
.mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: left;
}
[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: right;
}

.mat-mdc-tooltip-panel {
  line-height: normal;
}
.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive {
  pointer-events: none;
}

@keyframes mat-mdc-tooltip-show {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes mat-mdc-tooltip-hide {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}
.mat-mdc-tooltip-show {
  animation: mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}

.mat-mdc-tooltip-hide {
  animation: mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}
`],encapsulation:2,changeDetection:0})}return t})();var Io=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[fb,Rs,me,xs]})}return t})();var To=class t{constructor(n){this.http=n}apiUrl="/api/bookings";getBookings(){return this.http.get(this.apiUrl)}getBooking(n){return this.http.get(`${this.apiUrl}/${n}`)}createBooking(n){return this.http.post(this.apiUrl,n)}updateBooking(n,e){return this.http.put(`${this.apiUrl}/${n}`,e)}deleteBooking(n){return this.http.delete(`${this.apiUrl}/${n}`)}uploadDocuments(n,e){return this.http.post(`${this.apiUrl}/${n}/documents`,e)}getFilter(){return this.http.get("/api/filter")}setFilter(n,e){return this.http.post("/api/filter",{year:n,month:e})}static \u0275fac=function(e){return new(e||t)(A(ut))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})};var or=class t{constructor(n){this.http=n}apiUrl="/api/accounts";accountUrl="/api/account";activeAccount=T(null);getAccounts(){return this.http.get(this.apiUrl)}loadActiveAccount(){return this.http.get(this.accountUrl).pipe(it(n=>{this.activeAccount.set(n.account)}))}setActiveAccount(n){return this.http.post(this.accountUrl,{id:n}).pipe(it(()=>this.loadActiveAccount().subscribe()))}static \u0275fac=function(e){return new(e||t)(A(ut))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})};var pn=class t{constructor(n){this.http=n}apiUrl="/api/settings";getSettings(){return this.http.get(this.apiUrl)}updateSettings(n){return this.http.put(this.apiUrl,n)}static \u0275fac=function(e){return new(e||t)(A(ut))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})};var ko=class t{constructor(n){this.http=n}filterYear=T(new Date().getFullYear());filterMonth=T(0);initialized=!1;load(){this.initialized||(this.initialized=!0,this.http.get("/api/filter").subscribe({next:n=>{this.filterYear.set(n.year),this.filterMonth.set(n.month)}}))}setFilter(n,e){this.filterYear.set(n),this.filterMonth.set(e),this.http.post("/api/filter",{year:n,month:e}).subscribe()}yearRange(){let n=new Date().getFullYear();return Array.from({length:13},(e,i)=>n-10+i)}monthLabels=["Januar","Februar","M\xE4rz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];static \u0275fac=function(e){return new(e||t)(A(ut))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})};var PV=()=>[1,2,3,4,5,6,7,8,9,10,11,12],FV=(t,n)=>({"has-category":t,"no-category":n}),LV=(t,n)=>({income:t,expense:n}),BV=(t,n)=>({positive:t,negative:n}),VV=t=>["/edit",t];function jV(t,n){if(t&1&&(f(0,"mat-option",6),g(1),m()),t&2){let e=n.$implicit;b("value",e),h(),ee(e)}}function HV(t,n){if(t&1&&(f(0,"mat-option",6),g(1),m()),t&2){let e=n.$implicit,i=n.index,r=E();b("value",e),h(),X(" ",r.filterService.monthLabels[i]," ")}}function zV(t,n){t&1&&(f(0,"div",13)(1,"mat-icon",14),g(2,"refresh"),m(),g(3," Buchungen werden geladen... "),m())}function UV(t,n){t&1&&(f(0,"div",15)(1,"mat-icon"),g(2,"inbox"),m(),f(3,"p"),g(4,"Keine Buchungen vorhanden"),m(),f(5,"button",16),g(6," Erste Buchung erstellen "),m()())}function $V(t,n){if(t&1&&W(0,"div",39),t&2){let e=E().$implicit;b("ngClass","color-"+e.color)}}function GV(t,n){t&1&&(f(0,"mat-icon"),g(1,"label"),m())}function WV(t,n){if(t&1&&(f(0,"div",40)(1,"mat-icon"),g(2,"attach_file"),m(),f(3,"span"),g(4),m()()),t&2){let e=E().$implicit;h(4),X("",e.documents," Dokument(e)")}}function qV(t,n){if(t&1){let e=Ke();f(0,"mat-card",17),k("click",function(){let r=oe(e).$implicit,o=E();return se(o.editBooking(r.id))}),f(1,"div",18)(2,"div",19)(3,"div",20),j(4,$V,1,1,"div",21),f(5,"div",22),g(6),m()(),f(7,"div",23)(8,"span",24),g(9),m(),W(10,"mat-divider",25),f(11,"span",26),g(12),m(),W(13,"mat-divider",25),f(14,"span",27),j(15,GV,2,0,"mat-icon",28),g(16),m()()(),f(17,"div",29)(18,"div",30)(19,"div",31)(20,"span",32)(21,"mat-icon"),g(22),m()(),f(23,"span",33),g(24),m()(),f(25,"div",34),g(26),m()(),f(27,"div",35)(28,"button",36)(29,"mat-icon"),g(30,"edit"),m()(),f(31,"button",37),k("click",function(){let r=oe(e).$implicit,o=E();return se(o.deleteBooking(r.id))}),f(32,"mat-icon"),g(33,"delete"),m()()()()(),j(34,WV,5,1,"div",38),m()}if(t&2){let e=n.$implicit,i=E();b("ngClass","color-"+e.color),h(4),b("ngIf",e.color),h(2),ee(e.label||"Ohne Bezeichnung"),h(3),ee(e.date),h(),b("vertical",!0),h(2),X("#",e.number),h(),b("vertical",!0),h(),b("ngClass",ac(21,FV,e.category,!e.category)),h(),b("ngIf",e.category),h(),X(" ",e.category||"Ohne Kategorie"," "),h(3),b("ngClass",ac(24,LV,e.type===0,e.type===1)),h(),b("title",e.type===0?"Einnahme":"Ausgabe"),h(2),ee(e.type===0?"arrow_upward":"arrow_downward"),h(2),ot("",i.formatCurrency(e.amount)," ",i.currency),h(),b("ngClass",ac(27,BV,e.saldo>=0,e.saldo<0)),h(),ot(" Saldo: ",i.formatCurrency(e.saldo)," ",i.currency," "),h(2),b("routerLink",ln(30,VV,e.id)),h(3),b("disabled",i.readonly),h(3),b("ngIf",e.documents&&e.documents>0)}}var Tp=class t{constructor(n,e,i,r,o,s){this.bookingService=n;this.accountService=e;this.settingsService=i;this.filterService=r;this.cdr=o;this.router=s;bn(()=>{this.filterService.filterYear(),this.filterService.filterMonth(),this.loadBookings()})}bookings=[];currency="\u20AC";readonly=!1;isLoading=!0;ngOnInit(){this.loadSettings()}loadSettings(){this.settingsService.getSettings().subscribe({next:n=>{this.currency=n.currency||"\u20AC"}})}loadBookings(){this.isLoading=!0,this.bookingService.getBookings().subscribe({next:n=>{this.bookings=n||[],this.isLoading=!1,this.cdr.markForCheck()},error:()=>{this.bookings=[],this.isLoading=!1,this.cdr.markForCheck()}})}deleteBooking(n){confirm("Buchung wirklich l\xF6schen?")&&this.bookingService.deleteBooking(n).subscribe({next:()=>{this.loadBookings()}})}onFilterChange(n,e){this.filterService.setFilter(n,e)}formatCurrency(n){return new Intl.NumberFormat("de-DE",{minimumFractionDigits:2,maximumFractionDigits:2}).format(n/100)}exportData(){window.location.href="/api/export"}editBooking(n){this.router.navigate(["/edit",n])}static \u0275fac=function(e){return new(e||t)(I(To),I(or),I(pn),I(ko),I(De),I(Ae))};static \u0275cmp=O({type:t,selectors:[["app-list"]],decls:26,vars:10,consts:[[1,"list-page"],[1,"container"],[1,"filter-card"],[1,"filter-controls"],[3,"selectionChange","ngModel"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[1,"bookings-section"],["class","loading-message",4,"ngIf"],["class","empty-message",4,"ngIf"],["class","booking-card",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"export-section"],["mat-stroked-button","","color","primary",3,"click"],[1,"loading-message"],[1,"spinner"],[1,"empty-message"],["mat-raised-button","","color","primary","routerLink","/add"],[1,"booking-card",3,"click","ngClass"],[1,"booking-content"],[1,"booking-left"],[1,"booking-title-row"],["class","color-marker",3,"ngClass",4,"ngIf"],[1,"booking-title"],[1,"booking-meta"],[1,"date"],[1,"meta-divider",3,"vertical"],[1,"number"],[1,"category-badge",3,"ngClass"],[4,"ngIf"],[1,"booking-right"],[1,"amount-section"],[1,"amount",3,"ngClass"],[1,"type-icon",3,"title"],[1,"amount-value"],[1,"saldo",3,"ngClass"],[1,"booking-actions"],["mat-icon-button","","color","primary","matTooltip","Bearbeiten",3,"routerLink"],["mat-icon-button","","color","warn","matTooltip","L\xF6schen",3,"click","disabled"],["class","booking-documents",4,"ngIf"],[1,"color-marker",3,"ngClass"],[1,"booking-documents"]],template:function(e,i){e&1&&(f(0,"div",0)(1,"div",1)(2,"mat-card",2)(3,"mat-card-content")(4,"div",3)(5,"mat-form-field")(6,"mat-label"),g(7,"Jahr"),m(),f(8,"mat-select",4),k("selectionChange",function(o){return i.onFilterChange(o.value,i.filterService.filterMonth())}),j(9,jV,2,2,"mat-option",5),m()(),f(10,"mat-form-field")(11,"mat-label"),g(12,"Monat"),m(),f(13,"mat-select",4),k("selectionChange",function(o){return i.onFilterChange(i.filterService.filterYear(),o.value)}),f(14,"mat-option",6),g(15,"Gesamtes Jahr"),m(),j(16,HV,2,2,"mat-option",5),m()()()()(),f(17,"div",7),j(18,zV,4,0,"div",8)(19,UV,7,0,"div",9)(20,qV,35,32,"mat-card",10),m(),f(21,"div",11)(22,"button",12),k("click",function(){return i.exportData()}),f(23,"mat-icon"),g(24,"cloud_download"),m(),g(25),m()()()()),e&2&&(h(8),b("ngModel",i.filterService.filterYear()),h(),b("ngForOf",i.filterService.yearRange()),h(4),b("ngModel",i.filterService.filterMonth()),h(),b("value",0),h(2),b("ngForOf",Wi(9,PV)),h(2),b("ngIf",i.isLoading),h(),b("ngIf",!i.isLoading&&i.bookings.length===0),h(),b("ngForOf",i.bookings),h(5),X(" ",i.filterService.filterYear()," exportieren "))},dependencies:[Ge,Er,Mn,Lt,wn,er,Mt,ii,Gn,fn,dn,un,Yt,Kt,Rr,Zt,Qt,bt,qt,jt,Mo,xp,xo,YI,KI,Io,Pr],styles:[".list-page[_ngcontent-%COMP%]{min-height:100vh;display:flex;flex-direction:column}.container[_ngcontent-%COMP%]{flex:1;padding:1.5rem;max-width:1200px;margin:0 auto;width:100%}@media(max-width:768px){.container[_ngcontent-%COMP%]{padding:1rem}}@media(max-width:480px){.container[_ngcontent-%COMP%]{padding:.75rem}}.filter-card[_ngcontent-%COMP%]{margin-bottom:2rem;box-shadow:0 2px 4px #0000001a}.filter-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{padding:1rem 1.5rem;border-bottom:1px solid var(--mat-sys-outline-variant, #eee);margin-bottom:0}.filter-card[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-size:1.25rem;margin:0;color:var(--mat-sys-primary, #1976d2)}.filter-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:1.5rem}.filter-controls[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr auto;gap:1rem;align-items:flex-start}@media(max-width:768px){.filter-controls[_ngcontent-%COMP%]{grid-template-columns:1fr}}.filter-controls[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}.filter-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{align-self:flex-start;margin-top:.5rem}.bookings-section[_ngcontent-%COMP%]{display:grid;gap:1rem;margin-bottom:2rem}.loading-message[_ngcontent-%COMP%], .empty-message[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem 1rem;color:var(--mat-sys-on-surface, rgba(0, 0, 0, .54));opacity:.7}.loading-message[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .empty-message[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:3rem;width:3rem;height:3rem;margin-bottom:1rem;opacity:.5}.loading-message[_ngcontent-%COMP%]   mat-icon.spinner[_ngcontent-%COMP%], .empty-message[_ngcontent-%COMP%]   mat-icon.spinner[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_spin 1s linear infinite}.loading-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .empty-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.5rem 0;font-size:1.1rem}.loading-message[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .empty-message[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:1rem}@keyframes _ngcontent-%COMP%_spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.booking-card[_ngcontent-%COMP%]{box-shadow:0 2px 4px #0000001a;transition:all .2s ease;border-left:4px solid transparent;padding-left:1rem;padding-top:1rem;padding-bottom:1rem}.booking-card[_ngcontent-%COMP%]:hover{box-shadow:0 4px 12px #00000026}.booking-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:1rem 1.5rem}.booking-card.color-red[_ngcontent-%COMP%]{border-left-color:#ff6b6b}.booking-card.color-blue[_ngcontent-%COMP%]{border-left-color:#4ecdc4}.booking-card.color-green[_ngcontent-%COMP%]{border-left-color:#95e1d3}.booking-card.color-yellow[_ngcontent-%COMP%]{border-left-color:#ffe66d}.booking-card.color-purple[_ngcontent-%COMP%]{border-left-color:#a8e6cf}.booking-card.color-orange[_ngcontent-%COMP%]{border-left-color:#ff8b94}.dark-mode[_ngcontent-%COMP%]   .booking-card.color-red[_ngcontent-%COMP%]{border-left-color:#ff5252}.dark-mode[_ngcontent-%COMP%]   .booking-card.color-blue[_ngcontent-%COMP%]{border-left-color:#26c6da}.dark-mode[_ngcontent-%COMP%]   .booking-card.color-green[_ngcontent-%COMP%]{border-left-color:#66bb6a}.dark-mode[_ngcontent-%COMP%]   .booking-card.color-yellow[_ngcontent-%COMP%]{border-left-color:#fdd835}.dark-mode[_ngcontent-%COMP%]   .booking-card.color-purple[_ngcontent-%COMP%]{border-left-color:#ab47bc}.dark-mode[_ngcontent-%COMP%]   .booking-card.color-orange[_ngcontent-%COMP%]{border-left-color:#ff7043}.dark-mode[_ngcontent-%COMP%]   .color-marker.color-red[_ngcontent-%COMP%]{background-color:#ff5252}.dark-mode[_ngcontent-%COMP%]   .color-marker.color-blue[_ngcontent-%COMP%]{background-color:#26c6da}.dark-mode[_ngcontent-%COMP%]   .color-marker.color-green[_ngcontent-%COMP%]{background-color:#66bb6a}.dark-mode[_ngcontent-%COMP%]   .color-marker.color-yellow[_ngcontent-%COMP%]{background-color:#fdd835}.dark-mode[_ngcontent-%COMP%]   .color-marker.color-purple[_ngcontent-%COMP%]{background-color:#ab47bc}.dark-mode[_ngcontent-%COMP%]   .color-marker.color-orange[_ngcontent-%COMP%]{background-color:#ff7043}.dark-mode[_ngcontent-%COMP%]   .amount.income[_ngcontent-%COMP%]   .type-icon[_ngcontent-%COMP%]{background-color:#4caf5033}.dark-mode[_ngcontent-%COMP%]   .amount.expense[_ngcontent-%COMP%]   .type-icon[_ngcontent-%COMP%]{background-color:#f4433633}.booking-content[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr auto;gap:1.5rem;align-items:center}@media(max-width:768px){.booking-content[_ngcontent-%COMP%]{grid-template-columns:1fr;gap:1rem}}.booking-left[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.5rem}.booking-title-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem}.color-marker[_ngcontent-%COMP%]{flex-shrink:0;width:12px;height:12px;border-radius:50%;background-color:#ccc}.color-marker.color-red[_ngcontent-%COMP%]{background-color:#ff6b6b}.color-marker.color-blue[_ngcontent-%COMP%]{background-color:#4ecdc4}.color-marker.color-green[_ngcontent-%COMP%]{background-color:#95e1d3}.color-marker.color-yellow[_ngcontent-%COMP%]{background-color:#ffe66d}.color-marker.color-purple[_ngcontent-%COMP%]{background-color:#a8e6cf}.color-marker.color-orange[_ngcontent-%COMP%]{background-color:#ff8b94}.booking-title[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:600;color:var(--mat-sys-primary, #1976d2)}.booking-meta[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;font-size:.875rem;color:var(--mat-sys-on-surface-variant, rgba(0, 0, 0, .6))}.booking-meta[_ngcontent-%COMP%]   .meta-divider[_ngcontent-%COMP%]{height:1.2rem}.booking-meta[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%]{font-weight:500}.booking-meta[_ngcontent-%COMP%]   .number[_ngcontent-%COMP%]{font-family:monospace;font-size:.8rem}.category-badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.25rem;font-size:.8rem;padding:.25rem .75rem;border-radius:999px;background-color:var(--mat-sys-primary-container, #e3f2fd);color:var(--mat-sys-on-primary-container, #1976d2)}.category-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:.75rem;width:.75rem;height:.75rem}.category-badge.no-category[_ngcontent-%COMP%]{background-color:var(--mat-sys-error-container, #ffebee);color:var(--mat-sys-on-error-container, #d32f2f)}.booking-right[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1.5rem}@media(max-width:768px){.booking-right[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start;width:100%}}.amount-section[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.25rem;text-align:right}@media(max-width:768px){.amount-section[_ngcontent-%COMP%]{text-align:left;width:100%}}.amount[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;font-size:1.2rem;font-weight:600}.amount[_ngcontent-%COMP%]   .type-icon[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:50%}.amount[_ngcontent-%COMP%]   .type-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1rem;width:1rem;height:1rem}.amount.income[_ngcontent-%COMP%]{color:#4caf50}.amount.income[_ngcontent-%COMP%]   .type-icon[_ngcontent-%COMP%]{background-color:#e8f5e9;color:#4caf50}.amount.expense[_ngcontent-%COMP%]{color:#f44336}.amount.expense[_ngcontent-%COMP%]   .type-icon[_ngcontent-%COMP%]{background-color:#ffebee;color:#f44336}@media(max-width:768px){.amount[_ngcontent-%COMP%]   .amount-value[_ngcontent-%COMP%]{margin-left:.5rem}}.saldo[_ngcontent-%COMP%]{font-size:.875rem;font-weight:500}.saldo.positive[_ngcontent-%COMP%]{color:#4caf50}.saldo.negative[_ngcontent-%COMP%]{color:#f44336}.booking-actions[_ngcontent-%COMP%]{display:flex;gap:.5rem}.booking-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:.5rem}.booking-documents[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;font-size:.875rem;color:var(--mat-sys-on-surface-variant, rgba(0, 0, 0, .6));padding-top:.75rem;border-top:1px solid var(--mat-sys-outline-variant, #eee);margin-top:.75rem}.booking-documents[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1rem;width:1rem;height:1rem}.export-section[_ngcontent-%COMP%]{display:flex;justify-content:center;padding-top:1rem;border-top:1px solid var(--mat-sys-outline-variant, #eee)}.export-section[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin-right:.5rem}@media(max-width:600px){.container[_ngcontent-%COMP%]{padding:1rem}.filter-card[_ngcontent-%COMP%]{margin-bottom:1.5rem}.filter-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{padding:.75rem 1rem}.filter-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:1rem}.filter-card[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-size:1.1rem}.filter-controls[_ngcontent-%COMP%]{grid-template-columns:1fr;gap:.75rem}.filter-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;align-self:auto}.booking-card[_ngcontent-%COMP%]{margin:0 -1rem;border-radius:0;box-shadow:none;border-bottom:1px solid var(--mat-sys-outline-variant, #eee)}.booking-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:1rem}.booking-card[_ngcontent-%COMP%]:hover{box-shadow:none;background-color:var(--mat-sys-surface-container, #f5f5f5)}.booking-title[_ngcontent-%COMP%]{font-size:1rem}.booking-meta[_ngcontent-%COMP%]{font-size:.75rem}.amount[_ngcontent-%COMP%]{font-size:1rem}.booking-actions[_ngcontent-%COMP%]{width:100%;justify-content:space-between}}@media(max-width:480px){.container[_ngcontent-%COMP%]{padding:.5rem}.booking-card[_ngcontent-%COMP%]{margin:0 -.5rem}.filter-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{padding:.5rem 1rem}.filter-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:.75rem}.booking-meta[_ngcontent-%COMP%]{flex-wrap:wrap;gap:.25rem}.booking-right[_ngcontent-%COMP%]{gap:1rem}.booking-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:.25rem}.booking-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1.2rem;width:1.2rem;height:1.2rem;margin:0!important}}"]})};var sr=class t{constructor(n){this.http=n}apiUrl="/api/categories";getCategories(){return this.http.get(this.apiUrl)}getAllCategories(){return this.http.get(`${this.apiUrl}/all`)}getCategory(n){return this.http.get(`${this.apiUrl}/${n}`)}addCategory(n){return this.http.post(this.apiUrl,n)}updateCategory(n,e){return this.http.put(`${this.apiUrl}/${n}`,e)}deleteCategory(n){return this.http.delete(`${this.apiUrl}/${n}`)}static \u0275fac=function(e){return new(e||t)(A(ut))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})};var KV=t=>["/edit-category",t],YV=t=>["/delete-category",t];function QV(t,n){if(t&1&&(f(0,"mat-card",16)(1,"mat-card-content")(2,"mat-icon",17),g(3,"error"),m(),f(4,"span"),g(5),m()()()),t&2){let e=E();h(5),ee(e.error())}}function ZV(t,n){t&1&&(f(0,"div",18)(1,"mat-icon",19),g(2,"refresh"),m(),f(3,"p"),g(4,"Kategorien werden geladen..."),m()())}function XV(t,n){t&1&&(f(0,"div",20)(1,"mat-icon"),g(2,"category"),m(),f(3,"p"),g(4,"Noch keine Kategorien vorhanden"),m(),f(5,"p",21),g(6,"Erstellen Sie oben Ihre erste Kategorie"),m()())}function JV(t,n){if(t&1&&(f(0,"button",37)(1,"mat-icon"),g(2,"delete"),m()()),t&2){let e=E().$implicit;b("routerLink",ln(1,YV,e.id))}}function ej(t,n){if(t&1&&(f(0,"mat-card",24)(1,"div",25)(2,"div",26)(3,"mat-icon"),g(4),m()(),f(5,"div",27)(6,"div",28),g(7),m(),f(8,"div",29),g(9),m()()(),f(10,"div",30)(11,"div",31)(12,"span",32),g(13,"Voreingestellter Betrag"),m(),f(14,"span",33),g(15),m()()(),f(16,"div",34)(17,"button",35)(18,"mat-icon"),g(19,"edit"),m()(),j(20,JV,3,3,"button",36),m()()),t&2){let e=n.$implicit,i=E(2);b("ngClass",i.getCategoryColor(e.amount)),h(4),ee(e.amount===0?"label":e.amount>0?"arrow_upward":"arrow_downward"),h(3),ee(e.label),h(2),ee(i.getCategoryType(e.amount)),h(6),ot("",i.formatCurrency(e.amount)," ",i.currency),h(2),b("routerLink",ln(8,KV,e.id)),h(3),b("ngIf",!i.readonly())}}function tj(t,n){if(t&1&&(f(0,"div",22),j(1,ej,21,10,"mat-card",23),m()),t&2){let e=E();h(),b("ngForOf",e.categories())}}var Rp=class t{constructor(n,e,i){this.categoryService=n;this.authService=e;this.settingsService=i;this.readonly.set(this.authService.isReadOnly())}categories=T([]);newCategoryName=T("");currency="\u20AC";readonly=T(!1);isLoading=T(!1);error=T(null);ngOnInit(){this.loadCurrency(),this.loadCategories()}loadCurrency(){this.settingsService.getSettings().subscribe({next:n=>{this.currency=n.currency||"\u20AC"}})}loadCategories(){this.isLoading.set(!0),this.error.set(null),this.categoryService.getCategories().subscribe({next:n=>{this.categories.set(n||[]),this.isLoading.set(!1)},error:()=>{this.error.set("Fehler beim Laden der Kategorien"),this.isLoading.set(!1)}})}onAddCategory(){let n=this.newCategoryName().trim();!n||this.readonly()||this.categoryService.addCategory({category:n}).subscribe({next:()=>{this.newCategoryName.set(""),this.error.set(null),this.loadCategories()},error:()=>{this.error.set("Fehler beim Erstellen der Kategorie")}})}formatCurrency(n){return new Intl.NumberFormat("de-DE",{minimumFractionDigits:2,maximumFractionDigits:2}).format(n/100)}getCategoryType(n){return n?n>0?"Einnahme":"Ausgabe":"-"}getCategoryColor(n){return n?n>0?"income":"expense":""}static \u0275fac=function(e){return new(e||t)(I(sr),I(di),I(pn))};static \u0275cmp=O({type:t,selectors:[["app-categories"]],decls:29,vars:7,consts:[["categoryForm","ngForm"],[1,"categories-page"],[1,"container"],["class","error-card","role","alert",4,"ngIf"],[1,"page-header"],[1,"subtitle"],[1,"add-category-card"],[1,"add-category-form",3,"ngSubmit"],[1,"full-width"],["matInput","","type","text","name","category","placeholder","z.B. Mitgliedsbeitr\xE4ge, Supplies, etc.","required","",3,"ngModelChange","ngModel"],["mat-raised-button","","color","accent","type","submit",3,"disabled"],[1,"categories-section"],[1,"section-title"],["class","loading-state",4,"ngIf"],["class","empty-state",4,"ngIf"],["class","category-grid",4,"ngIf"],["role","alert",1,"error-card"],[1,"error-icon"],[1,"loading-state"],[1,"spinner"],[1,"empty-state"],[1,"empty-text"],[1,"category-grid"],["class","category-card",3,"ngClass",4,"ngFor","ngForOf"],[1,"category-card",3,"ngClass"],[1,"category-header"],[1,"category-icon"],[1,"category-info"],[1,"category-title"],[1,"category-type"],[1,"category-stats"],[1,"stat-item"],[1,"stat-label"],[1,"stat-value"],[1,"category-actions"],["mat-icon-button","","color","primary","matTooltip","Bearbeiten",3,"routerLink"],["mat-icon-button","","color","warn","matTooltip","L\xF6schen",3,"routerLink",4,"ngIf"],["mat-icon-button","","color","warn","matTooltip","L\xF6schen",3,"routerLink"]],template:function(e,i){e&1&&(f(0,"div",1)(1,"div",2),j(2,QV,6,1,"mat-card",3),f(3,"div",4)(4,"h1"),g(5,"Kategorien verwalten"),m(),f(6,"p",5),g(7,"Erstellen und verwalten Sie Kategorien f\xFCr Ihre Buchungen"),m()(),f(8,"mat-card",6)(9,"mat-card-header")(10,"mat-card-title"),g(11,"Neue Kategorie erstellen"),m()(),f(12,"mat-card-content")(13,"form",7,0),k("ngSubmit",function(){return i.onAddCategory()}),f(15,"mat-form-field",8)(16,"mat-label"),g(17,"Kategoriename"),m(),f(18,"input",9),k("ngModelChange",function(o){return i.newCategoryName.set(o)}),m()(),f(19,"button",10)(20,"mat-icon"),g(21,"add_circle"),m(),g(22," Kategorie anlegen "),m()()()(),f(23,"div",11)(24,"h2",12),g(25),m(),j(26,ZV,5,0,"div",13)(27,XV,7,0,"div",14)(28,tj,2,1,"div",15),m()()()),e&2&&(h(2),b("ngIf",i.error()),h(16),b("ngModel",i.newCategoryName()),h(),b("disabled",i.readonly()),h(6),X("Kategorien (",i.categories().length,")"),h(),b("ngIf",i.isLoading()),h(),b("ngIf",!i.isLoading()&&i.categories().length===0),h(),b("ngIf",!i.isLoading()&&i.categories().length>0))},dependencies:[Mt,kn,ni,ii,Tn,kr,Gn,Vt,Ge,Er,Mn,Lt,wn,er,fn,dn,un,nr,ri,Yt,Kt,Rr,Zt,Qt,bt,qt,jt,ai,si,Io,Pr],styles:[".categories-page[_ngcontent-%COMP%]{min-height:100vh;display:flex;flex-direction:column}.container[_ngcontent-%COMP%]{flex:1;padding:1.5rem;max-width:1200px;margin:0 auto;width:100%}.error-card[_ngcontent-%COMP%]{background-color:#ffebee;border-left:4px solid #f44336;margin-bottom:1.5rem}.error-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem;color:#c62828}.error-card[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%]{flex-shrink:0;color:#f44336}.page-header[_ngcontent-%COMP%]{margin-bottom:2rem}.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:2rem;font-weight:500;color:#1976d2;margin:0}.page-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{color:#0000008a;margin:.5rem 0 0}.add-category-card[_ngcontent-%COMP%]{margin-bottom:2rem;box-shadow:0 2px 4px #0000001a}.add-category-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{padding:1rem 1.5rem;border-bottom:1px solid #eee;margin-bottom:0}.add-category-card[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-size:1.1rem;margin:0;color:#1976d2}.add-category-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:1.5rem}.add-category-form[_ngcontent-%COMP%]{display:flex;gap:1rem;align-items:flex-start}@media(max-width:600px){.add-category-form[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch}}.add-category-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1;min-width:0}.add-category-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex-shrink:0;padding:.5rem 1.5rem;align-self:flex-start}@media(max-width:600px){.add-category-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{align-self:stretch;width:100%}}.add-category-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin-right:.5rem}.full-width[_ngcontent-%COMP%]{width:100%}.categories-section[_ngcontent-%COMP%]{margin-top:2rem}.section-title[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:500;color:#1976d2;margin:0 0 1.5rem}.loading-state[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem 1rem;color:#0000008a;text-align:center}.loading-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:3rem;width:3rem;height:3rem;margin-bottom:1rem;opacity:.5}.loading-state[_ngcontent-%COMP%]   mat-icon.spinner[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%]   mat-icon.spinner[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_spin 1s linear infinite}.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.5rem 0}.loading-state[_ngcontent-%COMP%]   p.empty-text[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%]   p.empty-text[_ngcontent-%COMP%]{font-size:.875rem;color:#00000061}@keyframes _ngcontent-%COMP%_spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.category-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem}@media(max-width:900px){.category-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(auto-fill,minmax(240px,1fr))}}@media(max-width:600px){.category-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}}.category-card[_ngcontent-%COMP%]{background:#fff;border-radius:8px;box-shadow:0 2px 4px #0000001a;transition:all .2s ease;padding:1.5rem;display:flex;flex-direction:column}.category-card[_ngcontent-%COMP%]:hover{box-shadow:0 4px 12px #00000026;transform:translateY(-2px)}.category-card.income[_ngcontent-%COMP%]{border-left:4px solid #4caf50}.category-card.expense[_ngcontent-%COMP%]{border-left:4px solid #f44336}.category-header[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem}.category-icon[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:2.5rem;height:2.5rem;border-radius:50%;flex-shrink:0}.category-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1.25rem;width:1.25rem;height:1.25rem}.income[_ngcontent-%COMP%]   .category-icon[_ngcontent-%COMP%]{background-color:#e8f5e9;color:#4caf50}.expense[_ngcontent-%COMP%]   .category-icon[_ngcontent-%COMP%]{background-color:#ffebee;color:#f44336}.category-info[_ngcontent-%COMP%]{flex:1;min-width:0}.category-title[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:600;color:#212121;word-break:break-word}.category-type[_ngcontent-%COMP%]{font-size:.875rem;color:#0000008a;margin-top:.25rem}.category-stats[_ngcontent-%COMP%]{flex:1;margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid #eee}.stat-item[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.25rem}.stat-label[_ngcontent-%COMP%]{font-size:.75rem;text-transform:uppercase;letter-spacing:.5px;color:#0000008a}.stat-value[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:600;color:#212121}.income[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{color:#4caf50}.expense[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{color:#f44336}.category-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:.5rem}.category-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:.5rem}@media(max-width:600px){.category-actions[_ngcontent-%COMP%]{justify-content:center}}"]})};var nj=["button"],ij=["*"];function rj(t,n){if(t&1&&(f(0,"div",2),W(1,"mat-pseudo-checkbox",6),m()),t&2){let e=E();h(),b("disabled",e.disabled)}}var XI=new w("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1,disabledInteractive:!1})}),JI=new w("MatButtonToggleGroup"),oj={provide:Tr,useExisting:Ut(()=>fd),multi:!0},Ap=class{source;value;constructor(n,e){this.source=n,this.value=e}},fd=(()=>{class t{_changeDetector=u(De);_dir=u(Rn,{optional:!0});_multiple=!1;_disabled=!1;_disabledInteractive=!1;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(e){this._name=e,this._markButtonsForCheck()}_name=u(Ze).getId("mat-button-toggle-group-");vertical=!1;get value(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e.map(i=>i.value):e[0]?e[0].value:void 0}set value(e){this._setSelectionByValue(e),this.valueChange.emit(this.value)}valueChange=new Z;get selected(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e:e[0]||null}get multiple(){return this._multiple}set multiple(e){this._multiple=e,this._markButtonsForCheck()}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markButtonsForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markButtonsForCheck()}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}change=new Z;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._markButtonsForCheck()}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(e){this._hideMultipleSelectionIndicator=e,this._markButtonsForCheck()}_hideMultipleSelectionIndicator;constructor(){let e=u(XI,{optional:!0});this.appearance=e&&e.appearance?e.appearance:"standard",this._hideSingleSelectionIndicator=e?.hideSingleSelectionIndicator??!1,this._hideMultipleSelectionIndicator=e?.hideMultipleSelectionIndicator??!1}ngOnInit(){this._selectionModel=new Ss(this.multiple,void 0,!1)}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(e=>e.checked)),this.multiple||this._initializeTabIndex()}writeValue(e){this.value=e,this._changeDetector.markForCheck()}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_keydown(e){if(this.multiple||this.disabled||mn(e))return;let r=e.target.id,o=this._buttonToggles.toArray().findIndex(a=>a.buttonId===r),s=null;switch(e.keyCode){case 32:case 13:s=this._buttonToggles.get(o)||null;break;case 38:s=this._getNextButton(o,-1);break;case 37:s=this._getNextButton(o,this.dir==="ltr"?-1:1);break;case 40:s=this._getNextButton(o,1);break;case 39:s=this._getNextButton(o,this.dir==="ltr"?1:-1);break;default:return}s&&(e.preventDefault(),s._onButtonClick(),s.focus())}_emitChangeEvent(e){let i=new Ap(e,this.value);this._rawValue=i.value,this._controlValueAccessorChangeFn(i.value),this.change.emit(i)}_syncButtonToggle(e,i,r=!1,o=!1){!this.multiple&&this.selected&&!e.checked&&(this.selected.checked=!1),this._selectionModel?i?this._selectionModel.select(e):this._selectionModel.deselect(e):o=!0,o?Promise.resolve().then(()=>this._updateModelValue(e,r)):this._updateModelValue(e,r)}_isSelected(e){return this._selectionModel&&this._selectionModel.isSelected(e)}_isPrechecked(e){return typeof this._rawValue>"u"?!1:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(i=>e.value!=null&&i===e.value):e.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(e=>{e.tabIndex=-1}),this.selected)this.selected.tabIndex=0;else for(let e=0;e<this._buttonToggles.length;e++){let i=this._buttonToggles.get(e);if(!i.disabled){i.tabIndex=0;break}}}_getNextButton(e,i){let r=this._buttonToggles;for(let o=1;o<=r.length;o++){let s=(e+i*o+r.length)%r.length,a=r.get(s);if(a&&!a.disabled)return a}return null}_setSelectionByValue(e){if(this._rawValue=e,!this._buttonToggles)return;let i=this._buttonToggles.toArray();if(this.multiple&&e?(Array.isArray(e),this._clearSelection(),e.forEach(r=>this._selectValue(r,i))):(this._clearSelection(),this._selectValue(e,i)),!this.multiple&&i.every(r=>r.tabIndex===-1)){for(let r of i)if(!r.disabled){r.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(e=>{e.checked=!1,this.multiple||(e.tabIndex=-1)})}_selectValue(e,i){for(let r of i)if(r.value===e){r.checked=!0,this._selectionModel.select(r),this.multiple||(r.tabIndex=0);break}}_updateModelValue(e,i){i&&this._emitChangeEvent(e),this.valueChange.emit(this.value)}_markButtonsForCheck(){this._buttonToggles?.forEach(e=>e._markForCheck())}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["mat-button-toggle-group"]],contentQueries:function(i,r,o){if(i&1&&Et(o,Xa,5),i&2){let s;q(s=K())&&(r._buttonToggles=s)}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(i,r){i&1&&k("keydown",function(s){return r._keydown(s)}),i&2&&(ae("role",r.multiple?"group":"radiogroup")("aria-disabled",r.disabled),P("mat-button-toggle-vertical",r.vertical)("mat-button-toggle-group-appearance-standard",r.appearance==="standard"))},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",H],value:"value",multiple:[2,"multiple","multiple",H],disabled:[2,"disabled","disabled",H],disabledInteractive:[2,"disabledInteractive","disabledInteractive",H],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",H],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",H]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[ze([oj,{provide:JI,useExisting:t}])]})}return t})(),Xa=(()=>{class t{_changeDetectorRef=u(De);_elementRef=u(z);_focusMonitor=u(qn);_idGenerator=u(Ze);_animationDisabled=tt();_checked=!1;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return`${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e)}_tabIndex;disableRipple=!1;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e}_disabled=!1;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e}_disabledInteractive;change=new Z;constructor(){u(ft).load(ci);let e=u(JI,{optional:!0}),i=u(new Sn("tabindex"),{optional:!0})||"",r=u(XI,{optional:!0});this._tabIndex=T(parseInt(i)||0),this.buttonToggleGroup=e,this._appearance=r&&r.appearance?r.appearance:"standard",this._disabledInteractive=r?.disabledInteractive??!1}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=!0:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,!1,!1,!0)}focus(e){this._buttonElement.nativeElement.focus(e)}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?!0:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let i=this.buttonToggleGroup._buttonToggles.find(r=>r.tabIndex===0);i&&(i.tabIndex=-1),this.tabIndex=0}this.change.emit(new Ap(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-button-toggle"]],viewQuery:function(i,r){if(i&1&&$e(nj,5),i&2){let o;q(o=K())&&(r._buttonElement=o.first)}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(i,r){i&1&&k("focus",function(){return r.focus()}),i&2&&(ae("aria-label",null)("aria-labelledby",null)("id",r.id)("name",null),P("mat-button-toggle-standalone",!r.buttonToggleGroup)("mat-button-toggle-checked",r.checked)("mat-button-toggle-disabled",r.disabled)("mat-button-toggle-disabled-interactive",r.disabledInteractive)("mat-button-toggle-appearance-standard",r.appearance==="standard"))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",H],appearance:"appearance",checked:[2,"checked","checked",H],disabled:[2,"disabled","disabled",H],disabledInteractive:[2,"disabledInteractive","disabledInteractive",H]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:ij,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(i,r){if(i&1&&(Ie(),f(0,"button",1,0),k("click",function(){return r._onButtonClick()}),he(2,rj,2,1,"div",2),f(3,"span",3),re(4),m()(),W(5,"span",4)(6,"span",5)),i&2){let o=at(1);b("id",r.buttonId)("disabled",r.disabled&&!r.disabledInteractive||null),ae("role",r.isSingleSelector()?"radio":"button")("tabindex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex)("aria-pressed",r.isSingleSelector()?null:r.checked)("aria-checked",r.isSingleSelector()?r.checked:null)("name",r._getButtonName())("aria-label",r.ariaLabel)("aria-labelledby",r.ariaLabelledby)("aria-disabled",r.disabled&&r.disabledInteractive?"true":null),h(2),ge(r.buttonToggleGroup&&(!r.buttonToggleGroup.multiple&&!r.buttonToggleGroup.hideSingleSelectionIndicator||r.buttonToggleGroup.multiple&&!r.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),h(4),b("matRippleTrigger",o)("matRippleDisabled",r.disableRipple||r.disabled)}},dependencies:[ir,Sp],styles:[`.mat-button-toggle-standalone,
.mat-button-toggle-group {
  position: relative;
  display: inline-flex;
  flex-direction: row;
  white-space: nowrap;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  border-radius: var(--mat-button-toggle-legacy-shape);
  transform: translateZ(0);
}
.mat-button-toggle-standalone:not([class*=mat-elevation-z]),
.mat-button-toggle-group:not([class*=mat-elevation-z]) {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone,
  .mat-button-toggle-group {
    outline: solid 1px;
  }
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
.mat-button-toggle-group-appearance-standard {
  border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,
.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),
.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]) {
  box-shadow: none;
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
  .mat-button-toggle-group-appearance-standard {
    outline: 0;
  }
}

.mat-button-toggle-vertical {
  flex-direction: column;
}
.mat-button-toggle-vertical .mat-button-toggle-label-content {
  display: block;
}

.mat-button-toggle {
  white-space: nowrap;
  position: relative;
  color: var(--mat-button-toggle-legacy-text-color);
  font-family: var(--mat-button-toggle-legacy-label-text-font);
  font-size: var(--mat-button-toggle-legacy-label-text-size);
  line-height: var(--mat-button-toggle-legacy-label-text-line-height);
  font-weight: var(--mat-button-toggle-legacy-label-text-weight);
  letter-spacing: var(--mat-button-toggle-legacy-label-text-tracking);
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-legacy-selected-state-text-color);
}
.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-legacy-focus-state-layer-opacity);
}
.mat-button-toggle .mat-icon svg {
  vertical-align: top;
}

.mat-button-toggle-checkbox-wrapper {
  display: inline-block;
  justify-content: flex-start;
  align-items: center;
  width: 0;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate3d(0, -50%, 0);
}
[dir=rtl] .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 16px;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: 12px;
}
[dir=rtl] .mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 12px;
}
.mat-button-toggle-checked .mat-button-toggle-checkbox-wrapper {
  width: 18px;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-checkbox-wrapper {
  transition: width 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-checkbox-wrapper {
  transition: none;
}

.mat-button-toggle-checked {
  color: var(--mat-button-toggle-legacy-selected-state-text-color);
  background-color: var(--mat-button-toggle-legacy-selected-state-background-color);
}

.mat-button-toggle-disabled {
  pointer-events: none;
  color: var(--mat-button-toggle-legacy-disabled-state-text-color);
  background-color: var(--mat-button-toggle-legacy-disabled-state-background-color);
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-legacy-disabled-state-text-color);
}
.mat-button-toggle-disabled.mat-button-toggle-checked {
  background-color: var(--mat-button-toggle-legacy-disabled-selected-state-background-color);
}

.mat-button-toggle-disabled-interactive {
  pointer-events: auto;
}

.mat-button-toggle-appearance-standard {
  color: var(--mat-button-toggle-text-color, var(--mat-sys-on-surface));
  background-color: var(--mat-button-toggle-background-color, transparent);
  font-family: var(--mat-button-toggle-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-toggle-label-text-size, var(--mat-sys-label-large-size));
  line-height: var(--mat-button-toggle-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-weight: var(--mat-button-toggle-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-button-toggle-label-text-tracking, var(--mat-sys-label-large-tracking));
}
.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: none;
  border-top: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-checked {
  color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-toggle-selected-state-background-color, var(--mat-sys-secondary-container));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled {
  color: var(--mat-button-toggle-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-state-background-color, transparent);
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked {
  color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-selected-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
  background-color: var(--mat-button-toggle-state-layer-color, var(--mat-sys-on-surface));
}
.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-button-toggle-appearance-standard.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
@media (hover: none) {
  .mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
    display: none;
  }
}

.mat-button-toggle-label-content {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  padding: 0 16px;
  line-height: var(--mat-button-toggle-legacy-height);
  position: relative;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-label-content {
  padding: 0 12px;
  line-height: var(--mat-button-toggle-height, 40px);
}

.mat-button-toggle-label-content > * {
  vertical-align: middle;
}

.mat-button-toggle-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background-color: var(--mat-button-toggle-legacy-state-layer-color);
}

@media (forced-colors: active) {
  .mat-button-toggle-checked .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
    opacity: 0.5;
    height: 0;
  }
  .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay {
    opacity: 0.6;
  }
  .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
  }
}
.mat-button-toggle .mat-button-toggle-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}

.mat-button-toggle-button {
  border: 0;
  background: none;
  color: inherit;
  padding: 0;
  margin: 0;
  font: inherit;
  outline: none;
  width: 100%;
  cursor: pointer;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-button {
  transition: padding 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-button {
  transition: none;
}
.mat-button-toggle-disabled .mat-button-toggle-button {
  cursor: default;
}
.mat-button-toggle-button::-moz-focus-inner {
  border: 0;
}
.mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 30px;
}
[dir=rtl] .mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 0;
  padding-right: 30px;
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard {
  --mat-focus-indicator-border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
`],encapsulation:2,changeDetection:0})}return t})(),Op=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[rr,Xa,me]})}return t})();var sj=["determinateSpinner"];function aj(t,n){if(t&1&&(vr(),f(0,"svg",11),W(1,"circle",12),m()),t&2){let e=E();ae("viewBox",e._viewBox()),h(),an("stroke-dasharray",e._strokeCircumference(),"px")("stroke-dashoffset",e._strokeCircumference()/2,"px")("stroke-width",e._circleStrokeWidth(),"%"),ae("r",e._circleRadius())}}var lj=new w("mat-progress-spinner-default-options",{providedIn:"root",factory:()=>({diameter:tT})}),tT=100,cj=10,Np=(()=>{class t{_elementRef=u(z);_noopAnimations;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;_defaultColor="primary";_determinateCircle;constructor(){let e=u(lj),i=td(),r=this._elementRef.nativeElement;this._noopAnimations=i==="di-disabled"&&!!e&&!e._forceAnimations,this.mode=r.nodeName.toLowerCase()==="mat-spinner"?"indeterminate":"determinate",!this._noopAnimations&&i==="reduced-motion"&&r.classList.add("mat-progress-spinner-reduced-motion"),e&&(e.color&&(this.color=this._defaultColor=e.color),e.diameter&&(this.diameter=e.diameter),e.strokeWidth&&(this.strokeWidth=e.strokeWidth))}mode;get value(){return this.mode==="determinate"?this._value:0}set value(e){this._value=Math.max(0,Math.min(100,e||0))}_value=0;get diameter(){return this._diameter}set diameter(e){this._diameter=e||0}_diameter=tT;get strokeWidth(){return this._strokeWidth??this.diameter/10}set strokeWidth(e){this._strokeWidth=e||0}_strokeWidth;_circleRadius(){return(this.diameter-cj)/2}_viewBox(){let e=this._circleRadius()*2+this.strokeWidth;return`0 0 ${e} ${e}`}_strokeCircumference(){return 2*Math.PI*this._circleRadius()}_strokeDashOffset(){return this.mode==="determinate"?this._strokeCircumference()*(100-this._value)/100:null}_circleStrokeWidth(){return this.strokeWidth/this.diameter*100}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-progress-spinner"],["mat-spinner"]],viewQuery:function(i,r){if(i&1&&$e(sj,5),i&2){let o;q(o=K())&&(r._determinateCircle=o.first)}},hostAttrs:["role","progressbar","tabindex","-1",1,"mat-mdc-progress-spinner","mdc-circular-progress"],hostVars:18,hostBindings:function(i,r){i&2&&(ae("aria-valuemin",0)("aria-valuemax",100)("aria-valuenow",r.mode==="determinate"?r.value:null)("mode",r.mode),_t("mat-"+r.color),an("width",r.diameter,"px")("height",r.diameter,"px")("--mat-progress-spinner-size",r.diameter+"px")("--mat-progress-spinner-active-indicator-width",r.diameter+"px"),P("_mat-animation-noopable",r._noopAnimations)("mdc-circular-progress--indeterminate",r.mode==="indeterminate"))},inputs:{color:"color",mode:"mode",value:[2,"value","value",St],diameter:[2,"diameter","diameter",St],strokeWidth:[2,"strokeWidth","strokeWidth",St]},exportAs:["matProgressSpinner"],decls:14,vars:11,consts:[["circle",""],["determinateSpinner",""],["aria-hidden","true",1,"mdc-circular-progress__determinate-container"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__determinate-circle-graphic"],["cx","50%","cy","50%",1,"mdc-circular-progress__determinate-circle"],["aria-hidden","true",1,"mdc-circular-progress__indeterminate-container"],[1,"mdc-circular-progress__spinner-layer"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-left"],[3,"ngTemplateOutlet"],[1,"mdc-circular-progress__gap-patch"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-right"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__indeterminate-circle-graphic"],["cx","50%","cy","50%"]],template:function(i,r){if(i&1&&(j(0,aj,2,8,"ng-template",null,0,lo),f(2,"div",2,1),vr(),f(4,"svg",3),W(5,"circle",4),m()(),Ou(),f(6,"div",5)(7,"div",6)(8,"div",7),Gt(9,8),m(),f(10,"div",9),Gt(11,8),m(),f(12,"div",10),Gt(13,8),m()()()),i&2){let o=at(1);h(4),ae("viewBox",r._viewBox()),h(),an("stroke-dasharray",r._strokeCircumference(),"px")("stroke-dashoffset",r._strokeDashOffset(),"px")("stroke-width",r._circleStrokeWidth(),"%"),ae("r",r._circleRadius()),h(4),b("ngTemplateOutlet",o),h(2),b("ngTemplateOutlet",o),h(2),b("ngTemplateOutlet",o)}},dependencies:[co],styles:[`.mat-mdc-progress-spinner {
  --mat-progress-spinner-animation-multiplier: 1;
  display: block;
  overflow: hidden;
  line-height: 0;
  position: relative;
  direction: ltr;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mat-mdc-progress-spinner circle {
  stroke-width: var(--mat-progress-spinner-active-indicator-width, 4px);
}
.mat-mdc-progress-spinner._mat-animation-noopable, .mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle {
  transition: none !important;
}
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container {
  animation: none !important;
}
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle {
  stroke-dasharray: 0 !important;
}
@media (forced-colors: active) {
  .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,
  .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle {
    stroke: currentColor;
    stroke: CanvasText;
  }
}

.mat-progress-spinner-reduced-motion {
  --mat-progress-spinner-animation-multiplier: 1.25;
}

.mdc-circular-progress__determinate-container,
.mdc-circular-progress__indeterminate-circle-graphic,
.mdc-circular-progress__indeterminate-container,
.mdc-circular-progress__spinner-layer {
  position: absolute;
  width: 100%;
  height: 100%;
}

.mdc-circular-progress__determinate-container {
  transform: rotate(-90deg);
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container {
  opacity: 0;
}

.mdc-circular-progress__indeterminate-container {
  font-size: 0;
  letter-spacing: 0;
  white-space: nowrap;
  opacity: 0;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container {
  opacity: 1;
  animation: mdc-circular-progress-container-rotate calc(1568.2352941176ms * var(--mat-progress-spinner-animation-multiplier)) linear infinite;
}

.mdc-circular-progress__determinate-circle-graphic,
.mdc-circular-progress__indeterminate-circle-graphic {
  fill: transparent;
}

.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,
.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
  stroke: var(--mat-progress-spinner-active-indicator-color, var(--mat-sys-primary));
}
@media (forced-colors: active) {
  .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,
  .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
    stroke: CanvasText;
  }
}

.mdc-circular-progress__determinate-circle {
  transition: stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);
}

.mdc-circular-progress__gap-patch {
  position: absolute;
  top: 0;
  left: 47.5%;
  box-sizing: border-box;
  width: 5%;
  height: 100%;
  overflow: hidden;
}

.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic {
  left: -900%;
  width: 2000%;
  transform: rotate(180deg);
}
.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic {
  width: 200%;
}
.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic {
  left: -100%;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic {
  animation: mdc-circular-progress-left-spin calc(1333ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic {
  animation: mdc-circular-progress-right-spin calc(1333ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

.mdc-circular-progress__circle-clipper {
  display: inline-flex;
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer {
  animation: mdc-circular-progress-spinner-layer-rotate calc(5332ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

@keyframes mdc-circular-progress-container-rotate {
  to {
    transform: rotate(360deg);
  }
}
@keyframes mdc-circular-progress-spinner-layer-rotate {
  12.5% {
    transform: rotate(135deg);
  }
  25% {
    transform: rotate(270deg);
  }
  37.5% {
    transform: rotate(405deg);
  }
  50% {
    transform: rotate(540deg);
  }
  62.5% {
    transform: rotate(675deg);
  }
  75% {
    transform: rotate(810deg);
  }
  87.5% {
    transform: rotate(945deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}
@keyframes mdc-circular-progress-left-spin {
  from {
    transform: rotate(265deg);
  }
  50% {
    transform: rotate(130deg);
  }
  to {
    transform: rotate(265deg);
  }
}
@keyframes mdc-circular-progress-right-spin {
  from {
    transform: rotate(-265deg);
  }
  50% {
    transform: rotate(-130deg);
  }
  to {
    transform: rotate(-265deg);
  }
}
`],encapsulation:2,changeDetection:0})}return t})();var Pp=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[me]})}return t})();var dj=["mat-internal-form-field",""],uj=["*"],Fp=(()=>{class t{labelPosition="after";static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["div","mat-internal-form-field",""]],hostAttrs:[1,"mdc-form-field","mat-internal-form-field"],hostVars:2,hostBindings:function(i,r){i&2&&P("mdc-form-field--align-end",r.labelPosition==="before")},inputs:{labelPosition:"labelPosition"},attrs:dj,ngContentSelectors:uj,decls:1,vars:0,template:function(i,r){i&1&&(Ie(),re(0))},styles:[`.mat-internal-form-field {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.mat-internal-form-field > label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
  order: 0;
}
[dir=rtl] .mat-internal-form-field > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
}

.mdc-form-field--align-end > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
  order: -1;
}
[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
}
`],encapsulation:2,changeDetection:0})}return t})();var fj=["input"],mj=["formField"],pj=["*"],Lp=class{source;value;constructor(n,e){this.source=n,this.value=e}},hj={provide:Tr,useExisting:Ut(()=>Ub),multi:!0},iT=new w("MatRadioGroup"),gj=new w("mat-radio-default-options",{providedIn:"root",factory:()=>({color:"accent",disabledInteractive:!1})}),Ub=(()=>{class t{_changeDetector=u(De);_value=null;_name=u(Ze).getId("mat-radio-group-");_selected=null;_isInitialized=!1;_labelPosition="after";_disabled=!1;_required=!1;_buttonChanges;_controlValueAccessorChangeFn=()=>{};onTouched=()=>{};change=new Z;_radios;color;get name(){return this._name}set name(e){this._name=e,this._updateRadioButtonNames()}get labelPosition(){return this._labelPosition}set labelPosition(e){this._labelPosition=e==="before"?"before":"after",this._markRadiosForCheck()}get value(){return this._value}set value(e){this._value!==e&&(this._value=e,this._updateSelectedRadioFromValue(),this._checkSelectedRadioButton())}_checkSelectedRadioButton(){this._selected&&!this._selected.checked&&(this._selected.checked=!0)}get selected(){return this._selected}set selected(e){this._selected=e,this.value=e?e.value:null,this._checkSelectedRadioButton()}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markRadiosForCheck()}get required(){return this._required}set required(e){this._required=e,this._markRadiosForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markRadiosForCheck()}_disabledInteractive=!1;constructor(){}ngAfterContentInit(){this._isInitialized=!0,this._buttonChanges=this._radios.changes.subscribe(()=>{this.selected&&!this._radios.find(e=>e===this.selected)&&(this._selected=null)})}ngOnDestroy(){this._buttonChanges?.unsubscribe()}_touch(){this.onTouched&&this.onTouched()}_updateRadioButtonNames(){this._radios&&this._radios.forEach(e=>{e.name=this.name,e._markForCheck()})}_updateSelectedRadioFromValue(){let e=this._selected!==null&&this._selected.value===this._value;this._radios&&!e&&(this._selected=null,this._radios.forEach(i=>{i.checked=this.value===i.value,i.checked&&(this._selected=i)}))}_emitChangeEvent(){this._isInitialized&&this.change.emit(new Lp(this._selected,this._value))}_markRadiosForCheck(){this._radios&&this._radios.forEach(e=>e._markForCheck())}writeValue(e){this.value=e,this._changeDetector.markForCheck()}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this.onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetector.markForCheck()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["mat-radio-group"]],contentQueries:function(i,r,o){if(i&1&&Et(o,Bp,5),i&2){let s;q(s=K())&&(r._radios=s)}},hostAttrs:["role","radiogroup",1,"mat-mdc-radio-group"],inputs:{color:"color",name:"name",labelPosition:"labelPosition",value:"value",selected:"selected",disabled:[2,"disabled","disabled",H],required:[2,"required","required",H],disabledInteractive:[2,"disabledInteractive","disabledInteractive",H]},outputs:{change:"change"},exportAs:["matRadioGroup"],features:[ze([hj,{provide:iT,useExisting:t}])]})}return t})(),Bp=(()=>{class t{_elementRef=u(z);_changeDetector=u(De);_focusMonitor=u(qn);_radioDispatcher=u(Rb);_defaultOptions=u(gj,{optional:!0});_ngZone=u(U);_renderer=u(Ue);_uniqueId=u(Ze).getId("mat-radio-");_cleanupClick;id=this._uniqueId;name;ariaLabel;ariaLabelledby;ariaDescribedby;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked!==e&&(this._checked=e,e&&this.radioGroup&&this.radioGroup.value!==this.value?this.radioGroup.selected=this:!e&&this.radioGroup&&this.radioGroup.value===this.value&&(this.radioGroup.selected=null),e&&this._radioDispatcher.notify(this.id,this.name),this._changeDetector.markForCheck())}get value(){return this._value}set value(e){this._value!==e&&(this._value=e,this.radioGroup!==null&&(this.checked||(this.checked=this.radioGroup.value===e),this.checked&&(this.radioGroup.selected=this)))}get labelPosition(){return this._labelPosition||this.radioGroup&&this.radioGroup.labelPosition||"after"}set labelPosition(e){this._labelPosition=e}_labelPosition;get disabled(){return this._disabled||this.radioGroup!==null&&this.radioGroup.disabled}set disabled(e){this._setDisabled(e)}get required(){return this._required||this.radioGroup&&this.radioGroup.required}set required(e){e!==this._required&&this._changeDetector.markForCheck(),this._required=e}get color(){return this._color||this.radioGroup&&this.radioGroup.color||this._defaultOptions&&this._defaultOptions.color||"accent"}set color(e){this._color=e}_color;get disabledInteractive(){return this._disabledInteractive||this.radioGroup!==null&&this.radioGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e}_disabledInteractive;change=new Z;radioGroup;get inputId(){return`${this.id||this._uniqueId}-input`}_checked=!1;_disabled=!1;_required=!1;_value=null;_removeUniqueSelectionListener=()=>{};_previousTabIndex;_inputElement;_rippleTrigger;_noopAnimations=tt();_injector=u(ce);constructor(){u(ft).load(ci);let e=u(iT,{optional:!0}),i=u(new Sn("tabindex"),{optional:!0});this.radioGroup=e,this._disabledInteractive=this._defaultOptions?.disabledInteractive??!1,i&&(this.tabIndex=St(i,0))}focus(e,i){i?this._focusMonitor.focusVia(this._inputElement,i,e):this._inputElement.nativeElement.focus(e)}_markForCheck(){this._changeDetector.markForCheck()}ngOnInit(){this.radioGroup&&(this.checked=this.radioGroup.value===this._value,this.checked&&(this.radioGroup.selected=this),this.name=this.radioGroup.name),this._removeUniqueSelectionListener=this._radioDispatcher.listen((e,i)=>{e!==this.id&&i===this.name&&(this.checked=!1)})}ngDoCheck(){this._updateTabIndex()}ngAfterViewInit(){this._updateTabIndex(),this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{!e&&this.radioGroup&&this.radioGroup._touch()}),this._ngZone.runOutsideAngular(()=>{this._cleanupClick=this._renderer.listen(this._inputElement.nativeElement,"click",this._onInputClick)})}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._removeUniqueSelectionListener()}_emitChangeEvent(){this.change.emit(new Lp(this,this._value))}_isRippleDisabled(){return this.disableRipple||this.disabled}_onInputInteraction(e){if(e.stopPropagation(),!this.checked&&!this.disabled){let i=this.radioGroup&&this.value!==this.radioGroup.value;this.checked=!0,this._emitChangeEvent(),this.radioGroup&&(this.radioGroup._controlValueAccessorChangeFn(this.value),i&&this.radioGroup._emitChangeEvent())}}_onTouchTargetClick(e){this._onInputInteraction(e),(!this.disabled||this.disabledInteractive)&&this._inputElement?.nativeElement.focus()}_setDisabled(e){this._disabled!==e&&(this._disabled=e,this._changeDetector.markForCheck())}_onInputClick=e=>{this.disabled&&this.disabledInteractive&&e.preventDefault()};_updateTabIndex(){let e=this.radioGroup,i;if(!e||!e.selected||this.disabled?i=this.tabIndex:i=e.selected===this?this.tabIndex:-1,i!==this._previousTabIndex){let r=this._inputElement?.nativeElement;r&&(r.setAttribute("tabindex",i+""),this._previousTabIndex=i,$t(()=>{queueMicrotask(()=>{e&&e.selected&&e.selected!==this&&document.activeElement===r&&(e.selected?._inputElement.nativeElement.focus(),document.activeElement===r&&this._inputElement.nativeElement.blur())})},{injector:this._injector}))}}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-radio-button"]],viewQuery:function(i,r){if(i&1&&$e(fj,5)(mj,7,z),i&2){let o;q(o=K())&&(r._inputElement=o.first),q(o=K())&&(r._rippleTrigger=o.first)}},hostAttrs:[1,"mat-mdc-radio-button"],hostVars:19,hostBindings:function(i,r){i&1&&k("focus",function(){return r._inputElement.nativeElement.focus()}),i&2&&(ae("id",r.id)("tabindex",null)("aria-label",null)("aria-labelledby",null)("aria-describedby",null),P("mat-primary",r.color==="primary")("mat-accent",r.color==="accent")("mat-warn",r.color==="warn")("mat-mdc-radio-checked",r.checked)("mat-mdc-radio-disabled",r.disabled)("mat-mdc-radio-disabled-interactive",r.disabledInteractive)("_mat-animation-noopable",r._noopAnimations))},inputs:{id:"id",name:"name",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],disableRipple:[2,"disableRipple","disableRipple",H],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:St(e)],checked:[2,"checked","checked",H],value:"value",labelPosition:"labelPosition",disabled:[2,"disabled","disabled",H],required:[2,"required","required",H],color:"color",disabledInteractive:[2,"disabledInteractive","disabledInteractive",H]},outputs:{change:"change"},exportAs:["matRadioButton"],ngContentSelectors:pj,decls:13,vars:17,consts:[["formField",""],["input",""],["mat-internal-form-field","",3,"labelPosition"],[1,"mdc-radio"],["aria-hidden","true",1,"mat-mdc-radio-touch-target",3,"click"],["type","radio","aria-invalid","false",1,"mdc-radio__native-control",3,"change","id","checked","disabled","required"],["aria-hidden","true",1,"mdc-radio__background"],[1,"mdc-radio__outer-circle"],[1,"mdc-radio__inner-circle"],["mat-ripple","","aria-hidden","true",1,"mat-radio-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mat-ripple-element","mat-radio-persistent-ripple"],[1,"mdc-label",3,"for"]],template:function(i,r){i&1&&(Ie(),f(0,"div",2,0)(2,"div",3)(3,"div",4),k("click",function(s){return r._onTouchTargetClick(s)}),m(),f(4,"input",5,1),k("change",function(s){return r._onInputInteraction(s)}),m(),f(6,"div",6),W(7,"div",7)(8,"div",8),m(),f(9,"div",9),W(10,"div",10),m()(),f(11,"label",11),re(12),m()()),i&2&&(b("labelPosition",r.labelPosition),h(2),P("mdc-radio--disabled",r.disabled),h(2),b("id",r.inputId)("checked",r.checked)("disabled",r.disabled&&!r.disabledInteractive)("required",r.required),ae("name",r.name)("value",r.value)("aria-label",r.ariaLabel)("aria-labelledby",r.ariaLabelledby)("aria-describedby",r.ariaDescribedby)("aria-disabled",r.disabled&&r.disabledInteractive?"true":null),h(5),b("matRippleTrigger",r._rippleTrigger.nativeElement)("matRippleDisabled",r._isRippleDisabled())("matRippleCentered",!0),h(2),b("for",r.inputId))},dependencies:[ir,Fp],styles:[`.mat-mdc-radio-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-radio-button .mdc-radio {
  display: inline-block;
  position: relative;
  flex: 0 0 auto;
  box-sizing: content-box;
  width: 20px;
  height: 20px;
  cursor: pointer;
  will-change: opacity, transform, border-color, color;
  padding: calc((var(--mat-radio-state-layer-size, 40px) - 20px) / 2);
}
.mat-mdc-radio-button .mdc-radio:hover > .mdc-radio__native-control:not([disabled]):not(:focus) ~ .mdc-radio__background::before {
  opacity: 0.04;
  transform: scale(1);
}
.mat-mdc-radio-button .mdc-radio:hover > .mdc-radio__native-control:not([disabled]) ~ .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-unselected-hover-icon-color, var(--mat-sys-on-surface));
}
.mat-mdc-radio-button .mdc-radio:hover > .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-selected-hover-icon-color, var(--mat-sys-primary));
}
.mat-mdc-radio-button .mdc-radio:hover > .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--mat-radio-selected-hover-icon-color, var(--mat-sys-primary, currentColor));
}
.mat-mdc-radio-button .mdc-radio:active > .mdc-radio__native-control:enabled:not(:checked) + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-unselected-pressed-icon-color, var(--mat-sys-on-surface));
}
.mat-mdc-radio-button .mdc-radio:active > .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-selected-pressed-icon-color, var(--mat-sys-primary));
}
.mat-mdc-radio-button .mdc-radio:active > .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--mat-radio-selected-pressed-icon-color, var(--mat-sys-primary, currentColor));
}
.mat-mdc-radio-button .mdc-radio__background {
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
}
.mat-mdc-radio-button .mdc-radio__background::before {
  position: absolute;
  transform: scale(0, 0);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  content: "";
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  width: var(--mat-radio-state-layer-size, 40px);
  height: var(--mat-radio-state-layer-size, 40px);
  top: calc(-1 * (var(--mat-radio-state-layer-size, 40px) - 20px) / 2);
  left: calc(-1 * (var(--mat-radio-state-layer-size, 40px) - 20px) / 2);
}
.mat-mdc-radio-button .mdc-radio__outer-circle {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;
  transition: border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mat-mdc-radio-button .mdc-radio__inner-circle {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  transform: scale(0);
  border-radius: 50%;
  transition: transform 90ms cubic-bezier(0.4, 0, 0.6, 1), background-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
@media (forced-colors: active) {
  .mat-mdc-radio-button .mdc-radio__inner-circle {
    background-color: CanvasText !important;
  }
}
.mat-mdc-radio-button .mdc-radio__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  top: 0;
  right: 0;
  left: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--mat-radio-state-layer-size, 40px);
  height: var(--mat-radio-state-layer-size, 40px);
}
.mat-mdc-radio-button .mdc-radio__native-control:checked + .mdc-radio__background, .mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background {
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 1), transform 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-radio-button .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__outer-circle, .mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background > .mdc-radio__outer-circle {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-radio-button .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__inner-circle, .mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background > .mdc-radio__inner-circle {
  transition: transform 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-radio-button .mdc-radio__native-control:focus + .mdc-radio__background::before {
  transform: scale(1);
  opacity: 0.12;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 1), transform 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-radio-button .mdc-radio__native-control:disabled:not(:checked) + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-disabled-unselected-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-radio-disabled-unselected-icon-opacity, 0.38);
}
.mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background {
  cursor: default;
}
.mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-disabled-selected-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-radio-disabled-selected-icon-opacity, 0.38);
}
.mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--mat-radio-disabled-selected-icon-color, var(--mat-sys-on-surface, currentColor));
  opacity: var(--mat-radio-disabled-selected-icon-opacity, 0.38);
}
.mat-mdc-radio-button .mdc-radio__native-control:enabled:not(:checked) + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-unselected-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-radio-button .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-selected-icon-color, var(--mat-sys-primary));
}
.mat-mdc-radio-button .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--mat-radio-selected-icon-color, var(--mat-sys-primary, currentColor));
}
.mat-mdc-radio-button .mdc-radio__native-control:enabled:focus:checked + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-selected-focus-icon-color, var(--mat-sys-primary));
}
.mat-mdc-radio-button .mdc-radio__native-control:enabled:focus:checked + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--mat-radio-selected-focus-icon-color, var(--mat-sys-primary, currentColor));
}
.mat-mdc-radio-button .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__inner-circle {
  transform: scale(0.5);
  transition: transform 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled {
  pointer-events: auto;
}
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:not(:checked) + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-disabled-unselected-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-radio-disabled-unselected-icon-opacity, 0.38);
}
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled:hover .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__outer-circle,
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:checked:focus + .mdc-radio__background > .mdc-radio__outer-circle,
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-disabled-selected-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-radio-disabled-selected-icon-opacity, 0.38);
}
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled:hover .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__inner-circle,
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:checked:focus + .mdc-radio__background > .mdc-radio__inner-circle,
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--mat-radio-disabled-selected-icon-color, var(--mat-sys-on-surface, currentColor));
  opacity: var(--mat-radio-disabled-selected-icon-opacity, 0.38);
}
.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__background::before,
.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__outer-circle,
.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__inner-circle {
  transition: none !important;
}
.mat-mdc-radio-button label {
  cursor: pointer;
}
.mat-mdc-radio-button label:empty {
  display: none;
}
.mat-mdc-radio-button .mdc-radio__background::before {
  background-color: var(--mat-radio-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-radio-button.mat-mdc-radio-checked .mat-ripple-element,
.mat-mdc-radio-button.mat-mdc-radio-checked .mdc-radio__background::before {
  background-color: var(--mat-radio-checked-ripple-color, var(--mat-sys-primary));
}
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mat-ripple-element,
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__background::before {
  background-color: var(--mat-radio-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-radio-button .mat-internal-form-field {
  color: var(--mat-radio-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-radio-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-radio-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-radio-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-radio-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-radio-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-radio-button .mdc-radio--disabled + label {
  color: var(--mat-radio-disabled-label-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-radio-button .mat-radio-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
}
.mat-mdc-radio-button .mat-radio-ripple > .mat-ripple-element {
  opacity: 0.14;
}
.mat-mdc-radio-button .mat-radio-ripple::before {
  border-radius: 50%;
}
.mat-mdc-radio-button .mdc-radio > .mdc-radio__native-control:focus:enabled:not(:checked) ~ .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-unselected-focus-icon-color, var(--mat-sys-on-surface));
}
.mat-mdc-radio-button.cdk-focused .mat-focus-indicator::before {
  content: "";
}

.mat-mdc-radio-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-radio-disabled.mat-mdc-radio-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-radio-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-radio-touch-target-size, 48px);
  width: var(--mat-radio-touch-target-size, 48px);
  transform: translate(-50%, -50%);
  display: var(--mat-radio-touch-target-display, block);
}
[dir=rtl] .mat-mdc-radio-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2,changeDetection:0})}return t})(),rT=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[rr,Bp,me]})}return t})();function _j(t,n){if(t&1){let e=Ke();f(0,"div",1)(1,"button",2),k("click",function(){oe(e);let r=E();return se(r.action())}),g(2),m()()}if(t&2){let e=E();h(2),X(" ",e.data.action," ")}}var yj=["label"];function bj(t,n){}var Cj=Math.pow(2,31)-1,md=class{_overlayRef;instance;containerInstance;_afterDismissed=new F;_afterOpened=new F;_onAction=new F;_durationTimeoutId;_dismissedByAction=!1;constructor(n,e){this._overlayRef=e,this.containerInstance=n,n._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(n){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(n,Cj))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}},oT=new w("MatSnackBarData"),Ja=class{politeness="polite";announcementMessage="";viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition="center";verticalPosition="bottom"},wj=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"]})}return t})(),Dj=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"]})}return t})(),Ej=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"]})}return t})(),sT=(()=>{class t{snackBarRef=u(md);data=u(oT);constructor(){}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["matButton","","matSnackBarAction","",3,"click"]],template:function(i,r){i&1&&(f(0,"div",0),g(1),m(),he(2,_j,3,1,"div",1)),i&2&&(h(),X(" ",r.data.message,`
`),h(),ge(r.hasAction?2:-1))},dependencies:[Kt,wj,Dj,Ej],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2,changeDetection:0})}return t})(),$b="_mat-snack-bar-enter",Gb="_mat-snack-bar-exit",Sj=(()=>{class t extends Ya{_ngZone=u(U);_elementRef=u(z);_changeDetectorRef=u(De);_platform=u(Re);_animationsDisabled=tt();snackBarConfig=u(Ja);_document=u(Y);_trackedModals=new Set;_enterFallback;_exitFallback;_injector=u(ce);_announceDelay=150;_announceTimeoutId;_destroyed=!1;_portalOutlet;_onAnnounce=new F;_onExit=new F;_onEnter=new F;_animationState="void";_live;_label;_role;_liveElementId=u(Ze).getId("mat-snack-bar-container-live-");constructor(){super();let e=this.snackBarConfig;e.politeness==="assertive"&&!e.announcementMessage?this._live="assertive":e.politeness==="off"?this._live="off":this._live="polite",this._platform.FIREFOX&&(this._live==="polite"&&(this._role="status"),this._live==="assertive"&&(this._role="alert"))}attachComponentPortal(e){this._assertNotAttached();let i=this._portalOutlet.attachComponentPortal(e);return this._afterPortalAttached(),i}attachTemplatePortal(e){this._assertNotAttached();let i=this._portalOutlet.attachTemplatePortal(e);return this._afterPortalAttached(),i}attachDomPortal=e=>{this._assertNotAttached();let i=this._portalOutlet.attachDomPortal(e);return this._afterPortalAttached(),i};onAnimationEnd(e){e===Gb?this._completeExit():e===$b&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete()}))}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?$t(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd($b)))},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-snack-bar-fallback-visible"),this.onAnimationEnd($b)},200)))}exit(){return this._destroyed?Q(void 0):(this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId),this._animationsDisabled?$t(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(Gb)))},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(Gb),200))}),this._onExit)}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let e=this._elementRef.nativeElement,i=this.snackBarConfig.panelClass;i&&(Array.isArray(i)?i.forEach(s=>e.classList.add(s)):e.classList.add(i)),this._exposeToModals();let r=this._label.nativeElement,o="mdc-snackbar__label";r.classList.toggle(o,!r.querySelector(`.${o}`))}_exposeToModals(){let e=this._liveElementId,i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<i.length;r++){let o=i[r],s=o.getAttribute("aria-owns");this._trackedModals.add(o),s?s.indexOf(e)===-1&&o.setAttribute("aria-owns",s+" "+e):o.setAttribute("aria-owns",e)}}_clearFromModals(){this._trackedModals.forEach(e=>{let i=e.getAttribute("aria-owns");if(i){let r=i.replace(this._liveElementId,"").trim();r.length>0?e.setAttribute("aria-owns",r):e.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let e=this._elementRef.nativeElement,i=e.querySelector("[aria-hidden]"),r=e.querySelector("[aria-live]");if(i&&r){let o=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&i.contains(document.activeElement)&&(o=document.activeElement),i.removeAttribute("aria-hidden"),r.appendChild(i),o?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-snack-bar-container"]],viewQuery:function(i,r){if(i&1&&$e(ld,7)(yj,7),i&2){let o;q(o=K())&&(r._portalOutlet=o.first),q(o=K())&&(r._label=o.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:6,hostBindings:function(i,r){i&1&&k("animationend",function(s){return r.onAnimationEnd(s.animationName)})("animationcancel",function(s){return r.onAnimationEnd(s.animationName)}),i&2&&P("mat-snack-bar-container-enter",r._animationState==="visible")("mat-snack-bar-container-exit",r._animationState==="hidden")("mat-snack-bar-container-animations-enabled",!r._animationsDisabled)},features:[He],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(i,r){i&1&&(f(0,"div",1)(1,"div",2,0)(3,"div",3),j(4,bj,0,0,"ng-template",4),m(),W(5,"div"),m()()),i&2&&(h(5),ae("aria-live",r._live)("role",r._role)("id",r._liveElementId))},dependencies:[ld],styles:[`@keyframes _mat-snack-bar-enter {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes _mat-snack-bar-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-snack-bar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 8px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container {
  width: 100vw;
}

.mat-snack-bar-container-animations-enabled {
  opacity: 0;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-fallback-visible {
  opacity: 1;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-enter {
  animation: _mat-snack-bar-enter 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-exit {
  animation: _mat-snack-bar-exit 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

.mat-mdc-snackbar-surface {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 8px;
}
[dir=rtl] .mat-mdc-snackbar-surface {
  padding-right: 0;
  padding-left: 8px;
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  min-width: 344px;
  max-width: 672px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface {
  width: 100%;
  min-width: 0;
}
@media (forced-colors: active) {
  .mat-mdc-snackbar-surface {
    outline: solid 1px;
  }
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  color: var(--mat-snack-bar-supporting-text-color, var(--mat-sys-inverse-on-surface));
  border-radius: var(--mat-snack-bar-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-snack-bar-container-color, var(--mat-sys-inverse-surface));
}

.mdc-snackbar__label {
  width: 100%;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  padding: 14px 8px 14px 16px;
}
[dir=rtl] .mdc-snackbar__label {
  padding-left: 8px;
  padding-right: 16px;
}
.mat-mdc-snack-bar-container .mdc-snackbar__label {
  font-family: var(--mat-snack-bar-supporting-text-font, var(--mat-sys-body-medium-font));
  font-size: var(--mat-snack-bar-supporting-text-size, var(--mat-sys-body-medium-size));
  font-weight: var(--mat-snack-bar-supporting-text-weight, var(--mat-sys-body-medium-weight));
  line-height: var(--mat-snack-bar-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
}

.mat-mdc-snack-bar-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
}

.mat-mdc-snack-bar-handset,
.mat-mdc-snack-bar-container,
.mat-mdc-snack-bar-label {
  flex: 1 1 auto;
}

.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled).mat-unthemed {
  color: var(--mat-snack-bar-button-color, var(--mat-sys-inverse-primary));
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) {
  --mat-button-text-state-layer-color: currentColor;
  --mat-button-text-ripple-color: currentColor;
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element {
  opacity: 0.1;
}
`],encapsulation:2})}return t})(),xj=new w("mat-snack-bar-default-options",{providedIn:"root",factory:()=>new Ja}),pd=(()=>{class t{_live=u(Zc);_injector=u(ce);_breakpointObserver=u(Qc);_parentSnackBar=u(t,{optional:!0,skipSelf:!0});_defaultConfig=u(xj);_animationsDisabled=tt();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=sT;snackBarContainerComponent=Sj;handsetCssClass="mat-mdc-snack-bar-handset";get _openedSnackBarRef(){let e=this._parentSnackBar;return e?e._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(e){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=e:this._snackBarRefAtThisLevel=e}constructor(){}openFromComponent(e,i){return this._attach(e,i)}openFromTemplate(e,i){return this._attach(e,i)}open(e,i="",r){let o=S(S({},this._defaultConfig),r);return o.data={message:e,action:i},o.announcementMessage===e&&(o.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,o)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(e,i){let r=i&&i.viewContainerRef&&i.viewContainerRef.injector,o=ce.create({parent:r||this._injector,providers:[{provide:Ja,useValue:i}]}),s=new So(this.snackBarContainerComponent,i.viewContainerRef,o),a=e.attach(s);return a.instance.snackBarConfig=i,a.instance}_attach(e,i){let r=S(S(S({},new Ja),this._defaultConfig),i),o=this._createOverlay(r),s=this._attachSnackBarContainer(o,r),a=new md(s,o);if(e instanceof wt){let l=new Nr(e,null,{$implicit:r.data,snackBarRef:a});a.instance=s.attachTemplatePortal(l)}else{let l=this._createInjector(r,a),c=new So(e,void 0,l),d=s.attachComponentPortal(c);a.instance=d.instance}return this._breakpointObserver.observe(WM.HandsetPortrait).pipe(xe(o.detachments())).subscribe(l=>{o.overlayElement.classList.toggle(this.handsetCssClass,l.matches)}),r.announcementMessage&&s._onAnnounce.subscribe(()=>{this._live.announce(r.announcementMessage,r.politeness)}),this._animateSnackBar(a,r),this._openedSnackBarRef=a,this._openedSnackBarRef}_animateSnackBar(e,i){e.afterDismissed().subscribe(()=>{this._openedSnackBarRef==e&&(this._openedSnackBarRef=null),i.announcementMessage&&this._live.clear()}),i.duration&&i.duration>0&&e.afterOpened().subscribe(()=>e._dismissAfter(i.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{e.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):e.containerInstance.enter()}_createOverlay(e){let i=new Is;i.direction=e.direction;let r=Dp(this._injector),o=e.direction==="rtl",s=e.horizontalPosition==="left"||e.horizontalPosition==="start"&&!o||e.horizontalPosition==="end"&&o,a=!s&&e.horizontalPosition!=="center";return s?r.left("0"):a?r.right("0"):r.centerHorizontally(),e.verticalPosition==="top"?r.top("0"):r.bottom("0"),i.positionStrategy=r,i.disableAnimations=this._animationsDisabled,ks(this._injector,i)}_createInjector(e,i){let r=e&&e.viewContainerRef&&e.viewContainerRef.injector;return ce.create({parent:r||this._injector,providers:[{provide:md,useValue:i},{provide:oT,useValue:e.data}]})}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Vp=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({providers:[pd],imports:[Rs,Qa,Yt,sT,me]})}return t})();var Mj=()=>["/categories"],lT=t=>["/edit",t];function Ij(t,n){t&1&&W(0,"mat-progress-spinner",5)}function Tj(t,n){if(t&1&&(f(0,"mat-card",40)(1,"mat-card-content")(2,"mat-icon",41),g(3,"error"),m(),f(4,"span"),g(5),m()()()),t&2){let e=E(2);h(5),ee(e.error)}}function kj(t,n){if(t&1&&(f(0,"mat-radio-button",16),g(1),m()),t&2){let e=n.$implicit;b("value",e.id),h(),X(" ",e.label," ")}}function Rj(t,n){if(t&1){let e=Ke();f(0,"button",42),k("click",function(){let r=oe(e).$implicit,o=E(2);return se(o.color=r.value)}),m()}if(t&2){let e=n.$implicit,i=E(2);an("background-color",e.hex),P("color-selected",i.color===e.value),b("matTooltip",e.label)}}function Aj(t,n){if(t&1){let e=Ke();f(0,"div",48)(1,"mat-icon"),g(2,"description"),m(),f(3,"a",49),g(4),m(),f(5,"button",50),k("click",function(){let r=oe(e).$implicit,o=E(4);return se(o.deleteDocument(r.id))}),f(6,"mat-icon"),g(7,"delete"),m()()()}if(t&2){let e=n.$implicit,i=E(4);h(3),b("href",i.getDocumentUrl(e.id),pf),h(),X(" ",e.filename," ")}}function Oj(t,n){if(t&1&&(f(0,"div",46),j(1,Aj,8,2,"div",47),m()),t&2){let e=E(3);h(),b("ngForOf",e.documents)}}function Nj(t,n){t&1&&(f(0,"p",51),g(1,"Keine Dokumente anh\xE4ngt."),m())}function Pj(t,n){if(t&1&&(f(0,"div",43)(1,"label",14),g(2,"Dokumente"),m(),j(3,Oj,2,1,"div",44)(4,Nj,2,0,"p",45),m()),t&2){let e=E(2);h(3),b("ngIf",e.documents.length>0),h(),b("ngIf",e.documents.length===0)}}function Fj(t,n){if(t&1&&(f(0,"span",52),g(1),m()),t&2){let e=E(2);h(),ot(" ",e.uploadedFiles.length," Datei(en): ",e.getUploadedFileNames()," ")}}function Lj(t,n){if(t&1&&(f(0,"button",56)(1,"mat-icon"),g(2,"keyboard_arrow_left"),m()()),t&2){let e=E(3);b("routerLink",ln(1,lT,e.previousId))}}function Bj(t,n){if(t&1&&(f(0,"button",57)(1,"mat-icon"),g(2,"keyboard_arrow_right"),m()()),t&2){let e=E(3);b("routerLink",ln(1,lT,e.nextId))}}function Vj(t,n){if(t&1&&(f(0,"div",53),j(1,Lj,3,3,"button",54)(2,Bj,3,3,"button",55),m()),t&2){let e=E(2);h(),b("ngIf",e.previousId),h(),b("ngIf",e.nextId)}}function jj(t,n){if(t&1){let e=Ke();f(0,"div",6),j(1,Tj,6,1,"mat-card",7),f(2,"mat-card",8)(3,"mat-card-header")(4,"mat-card-title"),g(5),m()(),f(6,"mat-card-content")(7,"form",9,0),k("ngSubmit",function(){oe(e);let r=E();return se(r.onSubmit())}),f(9,"div",10)(10,"mat-form-field",11)(11,"mat-label"),g(12,"Konto"),m(),W(13,"input",12),m()(),f(14,"div",10)(15,"mat-form-field",11)(16,"mat-label"),g(17,"Beschreibung (optional)"),m(),f(18,"input",13),Ft("ngModelChange",function(r){oe(e);let o=E();return Wt(o.label,r)||(o.label=r),se(r)}),k("blur",function(){oe(e);let r=E();return se(r.guessCategory(r.label))}),m()()(),f(19,"div",10)(20,"label",14),g(21,"Kategorie *"),m(),f(22,"mat-radio-group",15),Ft("ngModelChange",function(r){oe(e);let o=E();return Wt(o.selectedCategory,r)||(o.selectedCategory=r),se(r)}),k("change",function(r){oe(e);let o=E();return se(o.loadCategory(r))}),f(23,"mat-radio-button",16),g(24,"-- Keine --"),m(),j(25,kj,2,2,"mat-radio-button",17),m(),f(26,"a",18),g(27," Kategorien verwalten "),m()(),f(28,"div",10)(29,"mat-form-field",11)(30,"mat-label"),g(31,"Datum *"),m(),f(32,"input",19),Ft("ngModelChange",function(r){oe(e);let o=E();return Wt(o.date,r)||(o.date=r),se(r)}),m()()(),f(33,"div",10)(34,"div",20)(35,"mat-form-field",21)(36,"mat-label"),g(37,"Betrag *"),m(),f(38,"input",22),Ft("ngModelChange",function(r){oe(e);let o=E();return Wt(o.amount,r)||(o.amount=r),se(r)}),m(),f(39,"span",23),g(40),m()(),f(41,"mat-button-toggle-group",24),Ft("ngModelChange",function(r){oe(e);let o=E();return Wt(o.type,r)||(o.type=r),se(r)}),f(42,"mat-button-toggle",25)(43,"mat-icon"),g(44,"arrow_upward"),m(),g(45," Einnahme "),m(),f(46,"mat-button-toggle",26)(47,"mat-icon"),g(48,"arrow_downward"),m(),g(49," Ausgabe "),m()()()(),f(50,"div",10)(51,"mat-form-field",11)(52,"mat-label"),g(53,"Bemerkungen (optional)"),m(),f(54,"textarea",27),Ft("ngModelChange",function(r){oe(e);let o=E();return Wt(o.notes,r)||(o.notes=r),se(r)}),g(55,"              "),m()()(),f(56,"div",10)(57,"label",14),g(58,"Farbmarkierung (optional)"),m(),f(59,"div",28)(60,"button",29),k("click",function(){oe(e);let r=E();return se(r.color=null)}),f(61,"mat-icon"),g(62,"clear"),m()(),j(63,Rj,1,5,"button",30),m()(),j(64,Pj,5,2,"div",31),f(65,"div",10)(66,"label",14),g(67,"Belege anh\xE4ngen (optional)"),m(),f(68,"div",32)(69,"input",33,1),k("change",function(r){oe(e);let o=E();return se(o.onFileChange(r))}),m(),f(71,"button",34),k("click",function(){oe(e);let r=at(70);return se(r.click())}),f(72,"mat-icon"),g(73,"attach_file"),m(),g(74," Dateien ausw\xE4hlen "),m(),j(75,Fj,2,2,"span",35),m()(),f(76,"div",36)(77,"button",37)(78,"mat-icon"),g(79,"close"),m(),g(80," Abbrechen "),m(),f(81,"button",38)(82,"mat-icon"),g(83,"save"),m(),g(84," Speichern "),m()()()()(),j(85,Vj,3,2,"div",39),m()}if(t&2){let e,i=E();h(),b("ngIf",i.error),h(4),X(" ",i.id?"Buchung bearbeiten":"Neue Buchung erstellen"," "),h(8),b("value",(e=i.activeAccount())==null?null:e.label),h(5),Pt("ngModel",i.label),h(4),Pt("ngModel",i.selectedCategory),h(),b("value",null),h(2),b("ngForOf",i.categories),h(),b("routerLink",Wi(19,Mj)),h(6),Pt("ngModel",i.date),h(6),Pt("ngModel",i.amount),h(2),ee(i.currency),h(),Pt("ngModel",i.type),h(13),Pt("ngModel",i.notes),h(6),P("color-selected",i.color===null),h(3),b("ngForOf",i.colors),h(),b("ngIf",i.id),h(11),b("ngIf",i.uploadedFiles.length>0),h(10),b("ngIf",i.id)}}var hd=class t{constructor(n,e,i,r,o,s,a,l){this.route=n;this.router=e;this.bookingService=i;this.categoryService=r;this.accountService=o;this.settingsService=s;this.cdr=a;this.snackBar=l}id=null;label="";date="";amount=0;type="0";notes="";color=null;categories=[];selectedCategory=null;documents=[];error=null;currency="\u20AC";readonly=!1;previousId=null;nextId=null;isLoading=!0;uploadedFiles=[];get activeAccount(){return this.accountService.activeAccount}colors=[{value:"red",label:"Rot",hex:"#FF6B6B"},{value:"blue",label:"Blau",hex:"#4ECDC4"},{value:"green",label:"Gr\xFCn",hex:"#95E1D3"},{value:"yellow",label:"Gelb",hex:"#FFE66D"},{value:"purple",label:"Lila",hex:"#A8E6CF"},{value:"orange",label:"Orange",hex:"#FF8B94"}];ngOnInit(){this.isLoading=!0,this.loadCategories(),this.loadSettings(),this.loadActiveAccount(),this.route.params.subscribe(n=>{n.id?(this.id=+n.id,this.loadBooking()):(this.isLoading=!1,this.setDefaultDate())})}loadBooking(){this.id?this.bookingService.getBooking(this.id).subscribe({next:n=>{this.label=n.label||"",this.date=n.date||"",this.amount=n.amount||0,this.type=String(n.type||0),this.notes=n.notes||"",this.color=n.color||null,this.selectedCategory=n.category?parseInt(n.category):null,this.documents=n.documents||[],this.previousId=n.previousId||null,this.nextId=n.nextId||null,this.isLoading=!1,this.cdr.markForCheck(),console.log("Booking loaded, category:",this.selectedCategory)},error:n=>{console.error("Error loading booking:",n),this.error="Fehler beim Laden der Buchung",this.isLoading=!1,this.cdr.markForCheck()}}):(this.isLoading=!1,this.cdr.markForCheck())}loadCategories(){this.categoryService.getCategories().subscribe({next:n=>{this.categories=n||[]}})}loadSettings(){this.settingsService.getSettings().subscribe({next:n=>{this.currency=n.currency||"\u20AC"}})}loadActiveAccount(){this.accountService.loadActiveAccount().subscribe()}setDefaultDate(){let n=new Date;this.date=n.toISOString().split("T")[0]}guessCategory(n){if(!n||this.selectedCategory)return;let e=n.split(" "),i=null;for(let r of this.categories){if(r.keywords){let o=r.keywords.split(",").map(s=>s.trim().toLowerCase());for(let s of o)if(s&&n.toLowerCase().includes(s)){i=r;break}}if(i)break}if(!i)for(let r of this.categories){for(let o of e)if(o.length>3){let s=o.substring(0,Math.round(o.length*.8)).toLowerCase();if(r.label.toLowerCase().indexOf(s)!==-1){i=r;break}}if(i)break}i&&(this.selectedCategory=i.id,this.loadCategory(i))}loadCategory(n){n.amount&&this.amount===0&&(this.amount=Math.abs(n.amount),this.type=n.amount>=0?"0":"1")}clearCategorySelection(){this.selectedCategory=null}getDocumentUrl(n){return`/api/documents/${n}`}deleteDocument(n){this.id&&confirm("Dokument wirklich l\xF6schen?")&&(this.documents=this.documents.filter(e=>e.id!==n))}onFileChange(n){let e=n.target.files;e&&e.length>0&&(this.uploadedFiles=Array.from(e))}getUploadedFileNames(){return this.uploadedFiles.map(n=>n.name).join(", ")}onSubmit(){if(console.log("onSubmit called"),!this.validateForm()){console.log("Form validation failed");return}console.log("Form validation passed, saving booking"),this.isLoading=!0,this.cdr.markForCheck();let n={label:this.label,date:this.date,amount:this.amount,type:parseInt(this.type),notes:this.notes,color:this.color,category:this.selectedCategory,account:this.activeAccount()?.id};this.id?this.bookingService.updateBooking(this.id,n).subscribe({next:()=>{this.handleBookingSaved(this.id)},error:e=>{console.error("Error updating booking:",e),this.isLoading=!1,this.cdr.markForCheck(),this.snackBar.open("Fehler beim Speichern der Buchung","Schlie\xDFen",{duration:4e3})}}):this.bookingService.createBooking(n).subscribe({next:e=>{this.handleBookingSaved(e.id)},error:e=>{console.error("Error creating booking:",e),this.isLoading=!1,this.cdr.markForCheck(),this.snackBar.open("Fehler beim Erstellen der Buchung","Schlie\xDFen",{duration:4e3})}})}validateForm(){return this.error=null,this.date?this.amount===0||this.amount===null?(this.snackBar.open("Bitte Betrag angeben","Schlie\xDFen",{duration:4e3}),!1):this.selectedCategory?!0:(this.snackBar.open("Bitte eine Kategorie festlegen","Schlie\xDFen",{duration:4e3}),!1):(this.snackBar.open("Bitte Datum angeben","Schlie\xDFen",{duration:4e3}),!1)}handleBookingSaved(n){this.uploadedFiles.length===0?this.finishBookingSave():this.uploadFiles(n)}uploadFiles(n){let e=new FormData;for(let i of this.uploadedFiles)e.append("documents",i,i.name);this.bookingService.uploadDocuments(n,e).subscribe({next:()=>{console.log("Files uploaded successfully"),this.snackBar.open("Dateien hochgeladen","OK",{duration:3e3}),this.finishBookingSave()},error:i=>{console.error("Error uploading documents:",i),this.snackBar.open("Buchung gespeichert, aber Fehler beim Hochladen der Dateien","OK",{duration:4e3}),this.finishBookingSave()}})}finishBookingSave(){this.error=null,this.isLoading=!1,this.cdr.markForCheck(),this.router.navigate(["/"])}static \u0275fac=function(e){return new(e||t)(I(xt),I(Ae),I(To),I(sr),I(or),I(pn),I(De),I(pd))};static \u0275cmp=O({type:t,selectors:[["app-booking"]],decls:3,vars:2,consts:[["bookingForm","ngForm"],["fileInput",""],[1,"booking-page"],["mode","indeterminate","diameter","50","class","loading-spinner",4,"ngIf"],["class","container",4,"ngIf"],["mode","indeterminate","diameter","50",1,"loading-spinner"],[1,"container"],["class","error-card","role","alert",4,"ngIf"],[1,"booking-card"],[1,"booking-form",3,"ngSubmit"],[1,"form-section"],[1,"full-width"],["matInput","","readonly","","disabled","",3,"value"],["matInput","","name","label","placeholder","z.B. Supermarkt, Miete, Gehalt",3,"ngModelChange","blur","ngModel"],[1,"section-label"],["name","category",1,"category-radio-group",3,"ngModelChange","change","ngModel"],[1,"radio-option",3,"value"],["class","radio-option",3,"value",4,"ngFor","ngForOf"],[1,"manage-categories",3,"routerLink"],["matInput","","type","date","name","date","required","",3,"ngModelChange","ngModel"],[1,"amount-type-group"],[1,"amount-field"],["matInput","","type","number","step","0.01","name","amount","required","",3,"ngModelChange","ngModel"],["matSuffix","",1,"currency"],["name","type","aria-label","Typ",1,"type-toggle",3,"ngModelChange","ngModel"],["value","0",1,"income-toggle"],["value","1",1,"expense-toggle"],["matInput","","name","notes","rows","3","placeholder","Zus\xE4tzliche Informationen",3,"ngModelChange","ngModel"],[1,"color-picker"],["type","button","mat-icon-button","","matTooltip","Keine Farbe",1,"color-button","no-color",3,"click"],["type","button","mat-icon-button","","class","color-button",3,"color-selected","matTooltip","background-color","click",4,"ngFor","ngForOf"],["class","form-section documents-section",4,"ngIf"],[1,"file-input-wrapper"],["type","file","name","documents","multiple","","accept","image/*,.pdf",1,"file-input",3,"change"],["mat-stroked-button","","type","button",3,"click"],["class","file-list",4,"ngIf"],[1,"form-actions"],["mat-stroked-button","","type","button","routerLink","/"],["mat-raised-button","","color","accent","type","submit"],["class","navigation-buttons",4,"ngIf"],["role","alert",1,"error-card"],[1,"error-icon"],["type","button","mat-icon-button","",1,"color-button",3,"click","matTooltip"],[1,"form-section","documents-section"],["class","document-list",4,"ngIf"],["class","no-documents",4,"ngIf"],[1,"document-list"],["class","document-item",4,"ngFor","ngForOf"],[1,"document-item"],["target","_blank",1,"document-link",3,"href"],["mat-icon-button","","type","button","color","warn","matTooltip","L\xF6schen",3,"click"],[1,"no-documents"],[1,"file-list"],[1,"navigation-buttons"],["mat-fab","","matTooltip","Vorherige Buchung",3,"routerLink",4,"ngIf"],["mat-fab","","matTooltip","N\xE4chste Buchung",3,"routerLink",4,"ngIf"],["mat-fab","","matTooltip","Vorherige Buchung",3,"routerLink"],["mat-fab","","matTooltip","N\xE4chste Buchung",3,"routerLink"]],template:function(e,i){e&1&&(f(0,"div",2),j(1,Ij,1,0,"mat-progress-spinner",3)(2,jj,86,20,"div",4),m()),e&2&&(h(),b("ngIf",i.isLoading),h(),b("ngIf",!i.isLoading))},dependencies:[Mt,kn,ni,$c,ii,Tn,kr,Gn,Vt,Ge,Mn,Lt,wn,er,fn,dn,un,nr,ri,bt,qt,jt,id,ai,si,Yt,Kt,Rr,yI,Op,fd,Xa,Zt,Qt,Mo,rT,Ub,Bp,Pp,Np,Io,Pr,Vp],styles:[".booking-page[_ngcontent-%COMP%]{min-height:100vh;display:flex;flex-direction:column}.container[_ngcontent-%COMP%]{flex:1;padding:1.5rem;max-width:900px;margin:0 auto;width:100%}@media(max-width:768px){.container[_ngcontent-%COMP%]{padding:1rem}}@media(max-width:480px){.container[_ngcontent-%COMP%]{padding:.75rem}}.loading-spinner[_ngcontent-%COMP%]{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1000}.error-card[_ngcontent-%COMP%]{background-color:#ffebee;border-left:4px solid #f44336;margin-bottom:1.5rem}.error-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem;color:#c62828}.error-card[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%]{flex-shrink:0;color:#f44336}.booking-card[_ngcontent-%COMP%]{margin-bottom:2rem;box-shadow:0 2px 8px #0000001a}.booking-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{padding:1.5rem;border-bottom:1px solid #eee;margin-bottom:0}.booking-card[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-size:1.5rem;margin:0;color:#1976d2}.booking-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:1.5rem}.booking-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1.5rem}.form-section[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.5rem}.section-label[_ngcontent-%COMP%]{font-weight:500;font-size:.875rem;color:#000000de;text-transform:uppercase;letter-spacing:.5px;margin-bottom:.5rem}.section-label[_ngcontent-%COMP%]:after{content:attr(data-required)}.full-width[_ngcontent-%COMP%]{width:100%}.amount-type-group[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr auto;gap:1rem;align-items:flex-start}@media(max-width:600px){.amount-type-group[_ngcontent-%COMP%]{grid-template-columns:1fr;gap:1rem}}.amount-field[_ngcontent-%COMP%]{width:100%}.currency[_ngcontent-%COMP%]{margin-left:.5rem;font-weight:600}.type-toggle[_ngcontent-%COMP%]   mat-button-toggle[_ngcontent-%COMP%]{flex:1;padding:.5rem;font-size:.875rem}.type-toggle[_ngcontent-%COMP%]   mat-button-toggle.income-toggle[_ngcontent-%COMP%]{color:#4caf50}.type-toggle[_ngcontent-%COMP%]   mat-button-toggle.expense-toggle[_ngcontent-%COMP%]{color:#f44336}.manage-categories[_ngcontent-%COMP%]{font-size:.875rem;margin-top:.5rem;color:#1976d2;text-decoration:none}.manage-categories[_ngcontent-%COMP%]:hover{text-decoration:underline}.documents-section[_ngcontent-%COMP%]{border-top:1px solid #eee;padding-top:1rem}.document-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.75rem;margin-bottom:1rem}.document-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem;padding:.75rem;background-color:#f5f5f5;border-radius:4px;border-left:3px solid #1976d2}.document-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{flex-shrink:0;color:#1976d2}.document-item[_ngcontent-%COMP%]   .document-link[_ngcontent-%COMP%]{flex:1;color:#1976d2;text-decoration:none;word-break:break-word}.document-item[_ngcontent-%COMP%]   .document-link[_ngcontent-%COMP%]:hover{text-decoration:underline}.no-documents[_ngcontent-%COMP%]{color:#0000008a;font-style:italic;margin:0}.file-input-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.75rem}.file-input[_ngcontent-%COMP%]{display:none}.file-list[_ngcontent-%COMP%]{font-size:.875rem;color:#666;padding:.5rem;background-color:#f5f5f5;border-radius:4px;word-break:break-word}.form-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:1rem;margin-top:1rem;padding-top:1rem;border-top:1px solid #eee}.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{min-width:100px}.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin-right:.5rem}@media(max-width:768px){.form-actions[_ngcontent-%COMP%]{flex-direction:column-reverse;gap:.75rem}.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;min-width:auto}}.navigation-buttons[_ngcontent-%COMP%]{position:fixed;bottom:2rem;right:2rem;display:flex;flex-direction:column;gap:1rem;z-index:100}@media(max-width:768px){.navigation-buttons[_ngcontent-%COMP%]{bottom:1rem;right:1rem}.navigation-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{transform:scale(.8)}}@media(max-width:600px){.container[_ngcontent-%COMP%]{padding:1rem}.booking-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{padding:1rem}.booking-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:1rem}.form-actions[_ngcontent-%COMP%]{flex-direction:column-reverse}.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%}mat-button-toggle-group[_ngcontent-%COMP%]{width:100%}}.color-picker[_ngcontent-%COMP%]{display:flex;gap:.75rem;flex-wrap:wrap;padding:1rem 0}.color-button[_ngcontent-%COMP%]{width:48px;height:48px;border-radius:4px;border:2px solid transparent;transition:all .2s ease;cursor:pointer}.color-button.no-color[_ngcontent-%COMP%]{background-color:#f5f5f5;color:#666;border-color:#ddd}.color-button.no-color.color-selected[_ngcontent-%COMP%]{border-color:#1976d2;background-color:#e3f2fd}.color-button.color-selected[_ngcontent-%COMP%]{border-color:#000;box-shadow:0 0 8px #0000004d}.color-button[_ngcontent-%COMP%]:hover{transform:scale(1.05)}.dark-mode[_ngcontent-%COMP%]   .color-button.no-color[_ngcontent-%COMP%]{background-color:#2c2c2c;color:#ccc;border-color:#444}.dark-mode[_ngcontent-%COMP%]   .color-button.no-color.color-selected[_ngcontent-%COMP%]{border-color:#64b5f6;background-color:#1a3a52}.category-radio-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.75rem;padding:1rem 0}@media(max-width:768px){.category-radio-group[_ngcontent-%COMP%]{gap:.5rem}}.radio-option[_ngcontent-%COMP%]{display:block}"]})};var jp=class t{constructor(n,e,i){this.route=n;this.router=e;this.bookingService=i}id=T(null);label=T("");ngOnInit(){this.route.params.subscribe(n=>{n.id&&(this.id.set(+n.id),this.loadBooking())})}loadBooking(){let n=this.id();n!==null&&this.bookingService.getBooking(n).subscribe({next:e=>{this.label.set(e.label)}})}onSubmit(){let n=this.id();n!==null&&this.bookingService.deleteBooking(n).subscribe({next:()=>this.router.navigate(["/"])})}goBack(){this.router.navigate(["/"])}static \u0275fac=function(e){return new(e||t)(I(xt),I(Ae),I(To))};static \u0275cmp=O({type:t,selectors:[["app-delete"]],decls:10,vars:2,consts:[["deleteForm","ngForm"],[1,"container"],[3,"ngSubmit"],["type","hidden","name","id",3,"value"],[1,"error"],[1,"btn-flat",3,"click"],["type","submit",1,"btn"]],template:function(e,i){e&1&&(f(0,"div",1)(1,"form",2,0),k("ngSubmit",function(){return i.onSubmit()}),W(3,"input",3),f(4,"div",4),g(5),m(),f(6,"a",5),k("click",function(){return i.goBack()}),g(7,"Abbrechen"),m(),f(8,"button",6),g(9,"L\xF6schen"),m()()()),e&2&&(h(3),b("value",i.id()),h(2),X(" M\xF6chten Sie '",i.label(),"' wirklich l\xF6schen? "))},dependencies:[Mt,kn,Tn,Vt],styles:[".container[_ngcontent-%COMP%]{margin-bottom:20px}.error[_ngcontent-%COMP%]{padding:10px;margin:20px 0;color:#000;background-color:#fff;box-shadow:1px 1px 4px #00000080}.error[_ngcontent-%COMP%]{background-color:#800;color:#fff;font-weight:700}"]})};var Hp=class t{constructor(n,e,i,r){this.route=n;this.router=e;this.categoryService=i;this.settingsService=r}id=T(null);label=T("");amount=T(0);type=T(0);keywords=T("");currency=T("\u20AC");ngOnInit(){this.loadSettings(),this.route.params.subscribe(n=>{n.id&&(this.id.set(+n.id),this.loadCategory())})}loadSettings(){this.settingsService.getSettings().subscribe({next:n=>{this.currency.set(n.currency||"\u20AC")}})}loadCategory(){let n=this.id();n!==null&&this.categoryService.getCategory(n).subscribe({next:e=>{this.label.set(e.label),this.amount.set(Math.abs(e.amount)/100),this.type.set(e.amount>=0?0:1),this.keywords.set(e.keywords||"")}})}onSubmit(){let n=this.id();if(n===null)return;let e=Math.round(this.amount()*100),i={id:n,label:this.label(),amount:this.type()===0?e:-e,keywords:this.keywords()};this.categoryService.updateCategory(n,i).subscribe({next:()=>this.router.navigate(["/categories"])})}goBack(){this.router.navigate(["/categories"])}get typeValue(){return this.type()}set typeValue(n){this.type.set(n)}static \u0275fac=function(e){return new(e||t)(I(xt),I(Ae),I(sr),I(pn))};static \u0275cmp=O({type:t,selectors:[["app-edit-category"]],decls:46,vars:7,consts:[["categoryForm","ngForm"],[1,"edit-category-page"],[1,"container"],[1,"edit-form-card"],[1,"edit-form",3,"ngSubmit"],[1,"full-width"],["matInput","","type","text","name","label","required","",3,"ngModelChange","ngModel"],["matInput","","type","number","step","0.01","name","amount",3,"ngModelChange","ngModel"],["matSuffix","",1,"currency-suffix"],["matInput","","rows","3","name","keywords","placeholder",`Komma-getrennte Suchbegriffe f\xFCr automatische Kategorisierung
z.B.: Netflix, Streaming, Abo

Diese Begriffe werden verwendet, um Buchungen automatisch dieser Kategorie zuzuordnen.`,3,"ngModelChange","ngModel"],[1,"type-section"],[1,"section-label"],["name","type","aria-label","Typ",1,"type-toggle",3,"ngModelChange","ngModel"],[3,"value"],[1,"form-actions"],["mat-stroked-button","","type","button",3,"click"],["mat-raised-button","","color","accent","type","submit"]],template:function(e,i){if(e&1){let r=Ke();f(0,"div",1)(1,"div",2)(2,"mat-card",3)(3,"mat-card-header")(4,"mat-card-title"),g(5,"Kategorie bearbeiten"),m()(),f(6,"mat-card-content")(7,"form",4,0),k("ngSubmit",function(){return i.onSubmit()}),f(9,"mat-form-field",5)(10,"mat-label"),g(11,"Bezeichnung"),m(),f(12,"input",6),k("ngModelChange",function(s){return i.label.set(s)}),m()(),f(13,"mat-form-field",5)(14,"mat-label"),g(15,"Standard-Betrag (Optional)"),m(),f(16,"input",7),k("ngModelChange",function(s){return i.amount.set(s)}),m(),f(17,"span",8),g(18),m()(),f(19,"mat-form-field",5)(20,"mat-label"),g(21,"Suchbegriffe (Optional)"),m(),f(22,"textarea",9),k("ngModelChange",function(s){return i.keywords.set(s)}),m(),f(23,"mat-hint"),g(24,"Komma-getrennte Suchbegriffe. Diese werden bei der automatischen Kategorisierung ber\xFCcksichtigt."),m()(),f(25,"div",10)(26,"label",11),g(27,"Typ"),m(),f(28,"mat-button-toggle-group",12),Ft("ngModelChange",function(s){return oe(r),Wt(i.typeValue,s)||(i.typeValue=s),se(s)}),f(29,"mat-button-toggle",13)(30,"mat-icon"),g(31,"arrow_upward"),m(),g(32," Einnahme "),m(),f(33,"mat-button-toggle",13)(34,"mat-icon"),g(35,"arrow_downward"),m(),g(36," Ausgabe "),m()()(),f(37,"div",14)(38,"button",15),k("click",function(){return i.goBack()}),f(39,"mat-icon"),g(40,"close"),m(),g(41," Abbrechen "),m(),f(42,"button",16)(43,"mat-icon"),g(44,"save"),m(),g(45," Speichern "),m()()()()()()()}e&2&&(h(12),b("ngModel",i.label()),h(4),b("ngModel",i.amount()),h(2),ee(i.currency()),h(4),b("ngModel",i.keywords()),h(6),Pt("ngModel",i.typeValue),h(),b("value",0),h(4),b("value",1))},dependencies:[Mt,kn,ni,$c,ii,Tn,kr,Gn,Vt,Ge,bt,qt,jt,nd,id,ai,si,Yt,Kt,Op,fd,Xa,fn,dn,un,nr,ri,Zt,Qt],styles:[".container[_ngcontent-%COMP%]{margin-bottom:20px;max-width:600px;margin-left:auto;margin-right:auto}.edit-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1.5rem}.full-width[_ngcontent-%COMP%]{width:100%}mat-hint[_ngcontent-%COMP%]{display:block;margin-top:.25rem;font-size:.75rem;color:#0009}.edit-row[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem}.group[_ngcontent-%COMP%]{margin:20px 0}@media(min-width:768px){.edit-row[_ngcontent-%COMP%]{flex-direction:row;align-items:flex-end}.edit-row[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%], .edit-row[_ngcontent-%COMP%]   .flex-input[_ngcontent-%COMP%]{flex:1}}.type-section[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.75rem}.section-label[_ngcontent-%COMP%]{font-weight:500;font-size:.875rem;color:#000000de;text-transform:uppercase;letter-spacing:.5px}.type-toggle[_ngcontent-%COMP%]{display:flex;gap:.5rem;justify-content:flex-start;align-items:stretch}.type-toggle[_ngcontent-%COMP%]   .mat-button-toggle[_ngcontent-%COMP%]{flex:1;min-width:120px;white-space:nowrap}.form-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:1rem;margin-top:1rem;padding-top:1rem;border-top:1px solid #eee}.currency-suffix[_ngcontent-%COMP%]{font-weight:600;margin-left:.5rem}.flex-input[_ngcontent-%COMP%]{display:flex;align-items:center}.flex-input[_ngcontent-%COMP%] > input[_ngcontent-%COMP%]{flex-grow:1;margin-right:10px!important}"]})};var zp=class t{constructor(n,e,i){this.route=n;this.router=e;this.categoryService=i}id=T(null);label=T("");count=T(0);ngOnInit(){this.route.params.subscribe(n=>{n.id&&(this.id.set(+n.id),this.loadCategory())})}loadCategory(){let n=this.id();n!==null&&this.categoryService.getCategory(n).subscribe({next:e=>{this.label.set(e.label),this.count.set(e.count)}})}onSubmit(){let n=this.id();n!==null&&this.categoryService.deleteCategory(n).subscribe({next:()=>this.router.navigate(["/categories"])})}goBack(){this.router.navigate(["/categories"])}static \u0275fac=function(e){return new(e||t)(I(xt),I(Ae),I(sr))};static \u0275cmp=O({type:t,selectors:[["app-delete-category"]],decls:12,vars:3,consts:[["deleteForm","ngForm"],[1,"container"],[3,"ngSubmit"],["type","hidden","name","id",3,"value"],[1,"error"],[1,"btn-flat",3,"click"],["type","submit",1,"btn"]],template:function(e,i){e&1&&(f(0,"div",1)(1,"form",2,0),k("ngSubmit",function(){return i.onSubmit()}),W(3,"input",3),f(4,"div",4),g(5),W(6,"br"),g(7),m(),f(8,"a",5),k("click",function(){return i.goBack()}),g(9,"Abbrechen"),m(),f(10,"button",6),g(11,"L\xF6schen"),m()()()),e&2&&(h(3),b("value",i.id()),h(2),X(" M\xF6chten Sie die Kategorie '",i.label(),"' wirklich l\xF6schen?"),h(2),X(" Durch das L\xF6schen wird die Kategorie von\xA0",i.count()," Buchungen entfernt "))},dependencies:[Mt,kn,Tn,Vt,Ge,wn],styles:[".container[_ngcontent-%COMP%]{margin-bottom:20px}.error[_ngcontent-%COMP%]{padding:10px;margin:20px 0;color:#000;background-color:#fff;box-shadow:1px 1px 4px #00000080}.error[_ngcontent-%COMP%]{background-color:#800;color:#fff;font-weight:700}"]})};var cT=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[sd]})}return t})();var Up=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[cT,me]})}return t})();var Hj=["*"];function zj(t,n){t&1&&re(0)}var Wb=(()=>{class t{_elementRef=u(z);constructor(){}focus(){this._elementRef.nativeElement.focus()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["","cdkStepHeader",""]],hostAttrs:["role","tab"]})}return t})(),qb=(()=>{class t{template=u(wt);constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["","cdkStepLabel",""]]})}return t})();var Ps={NUMBER:"number",EDIT:"edit",DONE:"done",ERROR:"error"},Uj=new w("STEPPER_GLOBAL_OPTIONS"),$p=(()=>{class t{_stepperOptions;_stepper=u(Gp);_displayDefaultIndicatorType;stepLabel;_childForms;content;stepControl;get interacted(){return this._interacted()}set interacted(e){this._interacted.set(e)}_interacted=T(!1);interactedStream=new Z;label;errorMessage;ariaLabel;ariaLabelledby;get state(){return this._state()}set state(e){this._state.set(e)}_state=T(void 0);get editable(){return this._editable()}set editable(e){this._editable.set(e)}_editable=T(!0);optional=!1;get completed(){let e=this._completedOverride(),i=this._interacted();return e??(i&&(!this.stepControl||this.stepControl.valid))}set completed(e){this._completedOverride.set(e)}_completedOverride=T(null);index=T(-1);isSelected=dt(()=>this._stepper.selectedIndex===this.index());indicatorType=dt(()=>{let e=this.isSelected(),i=this.completed,r=this._state()??Ps.NUMBER,o=this._editable();return this._showError()&&this.hasError&&!e?Ps.ERROR:this._displayDefaultIndicatorType?!i||e?Ps.NUMBER:o?Ps.EDIT:Ps.DONE:i&&!e?Ps.DONE:i&&e?r:o&&e?Ps.EDIT:r});isNavigable=dt(()=>{let e=this.isSelected();return this.completed||e||!this._stepper.linear});get hasError(){let e=this._customError();return e??this._getDefaultError()}set hasError(e){this._customError.set(e)}_customError=T(null);_getDefaultError(){return this.interacted&&!!this.stepControl?.invalid}constructor(){let e=u(Uj,{optional:!0});this._stepperOptions=e||{},this._displayDefaultIndicatorType=this._stepperOptions.displayDefaultIndicatorType!==!1}select(){this._stepper.selected=this}reset(){this._interacted.set(!1),this._completedOverride()!=null&&this._completedOverride.set(!1),this._customError()!=null&&this._customError.set(!1),this.stepControl&&(this._childForms?.forEach(e=>e.resetForm?.()),this.stepControl.reset())}ngOnChanges(){this._stepper._stateChanged()}_markAsInteracted(){this._interacted()||(this._interacted.set(!0),this.interactedStream.emit(this))}_showError(){return this._stepperOptions.showError??this._customError()!=null}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["cdk-step"]],contentQueries:function(i,r,o){if(i&1&&Et(o,qb,5)(o,tr,5),i&2){let s;q(s=K())&&(r.stepLabel=s.first),q(s=K())&&(r._childForms=s)}},viewQuery:function(i,r){if(i&1&&$e(wt,7),i&2){let o;q(o=K())&&(r.content=o.first)}},inputs:{stepControl:"stepControl",label:"label",errorMessage:"errorMessage",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],state:"state",editable:[2,"editable","editable",H],optional:[2,"optional","optional",H],completed:[2,"completed","completed",H],hasError:[2,"hasError","hasError",H]},outputs:{interactedStream:"interacted"},exportAs:["cdkStep"],features:[et],ngContentSelectors:Hj,decls:1,vars:0,template:function(i,r){i&1&&(Ie(),Mf(0,zj,1,0,"ng-template"))},encapsulation:2,changeDetection:0})}return t})(),Gp=(()=>{class t{_dir=u(Rn,{optional:!0});_changeDetectorRef=u(De);_elementRef=u(z);_destroyed=new F;_keyManager;_steps;steps=new Jn;_stepHeader;_sortedHeaders=new Jn;get linear(){return this._linear()}set linear(e){this._linear.set(e)}_linear=T(!1);get selectedIndex(){return this._selectedIndex()}set selectedIndex(e){this._steps?(this._isValidIndex(e),this.selectedIndex!==e&&(this.selected?._markAsInteracted(),!this._anyControlsInvalidOrPending(e)&&(e>=this.selectedIndex||this.steps.toArray()[e].editable)&&this._updateSelectedItemIndex(e))):this._selectedIndex.set(e)}_selectedIndex=T(0);get selected(){return this.steps?this.steps.toArray()[this.selectedIndex]:void 0}set selected(e){this.selectedIndex=e&&this.steps?this.steps.toArray().indexOf(e):-1}selectionChange=new Z;selectedIndexChange=new Z;_groupId=u(Ze).getId("cdk-stepper-");get orientation(){return this._orientation}set orientation(e){this._orientation=e,this._keyManager&&this._keyManager.withVerticalOrientation(e==="vertical")}_orientation="horizontal";constructor(){}ngAfterContentInit(){this._steps.changes.pipe(zt(this._steps),xe(this._destroyed)).subscribe(e=>{this.steps.reset(e.filter(i=>i._stepper===this)),this.steps.forEach((i,r)=>i.index.set(r)),this.steps.notifyOnChanges()})}ngAfterViewInit(){if(this._stepHeader.changes.pipe(zt(this._stepHeader),xe(this._destroyed)).subscribe(e=>{this._sortedHeaders.reset(e.toArray().sort((i,r)=>i._elementRef.nativeElement.compareDocumentPosition(r._elementRef.nativeElement)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1)),this._sortedHeaders.notifyOnChanges()}),this._keyManager=new ip(this._sortedHeaders).withWrap().withHomeAndEnd().withVerticalOrientation(this._orientation==="vertical"),this._keyManager.updateActiveItem(this.selectedIndex),(this._dir?this._dir.change:Q()).pipe(zt(this._layoutDirection()),xe(this._destroyed)).subscribe(e=>this._keyManager?.withHorizontalOrientation(e)),this._keyManager.updateActiveItem(this.selectedIndex),this.steps.changes.subscribe(()=>{this.selected||this._selectedIndex.set(Math.max(this.selectedIndex-1,0))}),this._isValidIndex(this.selectedIndex)||this._selectedIndex.set(0),this.linear&&this.selectedIndex>0){let e=this.steps.toArray().slice(0,this._selectedIndex());for(let i of e)i._markAsInteracted()}}ngOnDestroy(){this._keyManager?.destroy(),this.steps.destroy(),this._sortedHeaders.destroy(),this._destroyed.next(),this._destroyed.complete()}next(){this.selectedIndex=Math.min(this._selectedIndex()+1,this.steps.length-1)}previous(){this.selectedIndex=Math.max(this._selectedIndex()-1,0)}reset(){this._updateSelectedItemIndex(0),this.steps.forEach(e=>e.reset()),this._stateChanged()}_getStepLabelId(e){return`${this._groupId}-label-${e}`}_getStepContentId(e){return`${this._groupId}-content-${e}`}_stateChanged(){this._changeDetectorRef.markForCheck()}_getAnimationDirection(e){let i=e-this._selectedIndex();return i<0?this._layoutDirection()==="rtl"?"next":"previous":i>0?this._layoutDirection()==="rtl"?"previous":"next":"current"}_getFocusIndex(){return this._keyManager?this._keyManager.activeItemIndex:this._selectedIndex()}_updateSelectedItemIndex(e){let i=this.steps.toArray(),r=this._selectedIndex();this.selectionChange.emit({selectedIndex:e,previouslySelectedIndex:r,selectedStep:i[e],previouslySelectedStep:i[r]}),this._keyManager&&(this._containsFocus()?this._keyManager.setActiveItem(e):this._keyManager.updateActiveItem(e)),this._selectedIndex.set(e),this.selectedIndexChange.emit(e),this._stateChanged()}_onKeydown(e){let i=mn(e),r=e.keyCode,o=this._keyManager;o?.activeItemIndex!=null&&!i&&(r===32||r===13)?(this.selectedIndex=o.activeItemIndex,e.preventDefault()):o?.setFocusOrigin("keyboard").onKeydown(e)}_anyControlsInvalidOrPending(e){return this.linear&&e>=0?this.steps.toArray().slice(0,e).some(i=>{let r=i.stepControl;return(r?r.invalid||r.pending||!i.interacted:!i.completed)&&!i.optional&&!i._completedOverride()}):!1}_layoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_containsFocus(){let e=this._elementRef.nativeElement,i=lb();return e===i||e.contains(i)}_isValidIndex(e){return e>-1&&(!this.steps||e<this.steps.length)}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["","cdkStepper",""]],contentQueries:function(i,r,o){if(i&1&&Et(o,$p,5)(o,Wb,5),i&2){let s;q(s=K())&&(r._steps=s),q(s=K())&&(r._stepHeader=s)}},inputs:{linear:[2,"linear","linear",H],selectedIndex:[2,"selectedIndex","selectedIndex",St],selected:"selected",orientation:"orientation"},outputs:{selectionChange:"selectionChange",selectedIndexChange:"selectedIndexChange"},exportAs:["cdkStepper"]})}return t})();var dT=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[me]})}return t})();var $j=(t,n,e)=>({index:t,active:n,optional:e});function Gj(t,n){if(t&1&&Gt(0,2),t&2){let e=E();b("ngTemplateOutlet",e.iconOverrides[e.state])("ngTemplateOutletContext",R_(2,$j,e.index,e.active,e.optional))}}function Wj(t,n){if(t&1&&(f(0,"span",7),g(1),m()),t&2){let e=E(2);h(),ee(e._getDefaultTextForState(e.state))}}function qj(t,n){if(t&1&&(f(0,"span",8),g(1),m()),t&2){let e=E(3);h(),ee(e._intl.completedLabel)}}function Kj(t,n){if(t&1&&(f(0,"span",8),g(1),m()),t&2){let e=E(3);h(),ee(e._intl.editableLabel)}}function Yj(t,n){if(t&1&&(he(0,qj,2,1,"span",8)(1,Kj,2,1,"span",8),f(2,"mat-icon",7),g(3),m()),t&2){let e=E(2);ge(e.state==="done"?0:e.state==="edit"?1:-1),h(3),ee(e._getDefaultTextForState(e.state))}}function Qj(t,n){if(t&1&&he(0,Wj,2,1,"span",7)(1,Yj,4,2),t&2){let e,i=E();ge((e=i.state)==="number"?0:1)}}function Zj(t,n){t&1&&(f(0,"div",4),Gt(1,9),m()),t&2&&(h(),b("ngTemplateOutlet",n.template))}function Xj(t,n){if(t&1&&(f(0,"div",4),g(1),m()),t&2){let e=E();h(),ee(e.label)}}function Jj(t,n){if(t&1&&(f(0,"div",5),g(1),m()),t&2){let e=E();h(),ee(e._intl.optionalLabel)}}function eH(t,n){if(t&1&&(f(0,"div",6),g(1),m()),t&2){let e=E();h(),ee(e.errorMessage)}}var uT=["*"];function tH(t,n){}function nH(t,n){if(t&1&&(re(0),j(1,tH,0,0,"ng-template",0)),t&2){let e=E();h(),b("cdkPortalOutlet",e._portal)}}var iH=["animatedContainer"],fT=t=>({steps:t}),mT=t=>({step:t});function rH(t,n){t&1&&re(0)}function oH(t,n){if(t&1&&(f(0,"div",5),Gt(1,9)(2,6),m()),t&2){let e=E(2),i=at(6);h(),b("ngTemplateOutlet",e.headerPrefix()),h(),b("ngTemplateOutlet",i)("ngTemplateOutletContext",ln(3,fT,e.steps))}}function sH(t,n){if(t&1&&Gt(0,6),t&2){let e=E(2),i=at(6);b("ngTemplateOutlet",i)("ngTemplateOutletContext",ln(2,fT,e.steps))}}function aH(t,n){if(t&1&&(f(0,"div",10,2),Gt(2,9),m()),t&2){let e=n.$implicit,i=n.$index,r=E(2);_t("mat-horizontal-stepper-content-"+r._getAnimationDirection(i)),b("id",r._getStepContentId(i)),ae("aria-labelledby",r._getStepLabelId(i))("inert",r.selectedIndex===i?null:""),h(2),b("ngTemplateOutlet",e.content)}}function lH(t,n){if(t&1&&(f(0,"div",3),he(1,oH,3,5,"div",5)(2,sH,1,4,"ng-container",6),f(3,"div",7),nc(4,aH,3,6,"div",8,tc),m()()),t&2){let e=E();h(),ge(e.headerPrefix()?1:2),h(3),ic(e.steps)}}function cH(t,n){if(t&1&&Gt(0,9),t&2){let e=E(2);b("ngTemplateOutlet",e.headerPrefix())}}function dH(t,n){if(t&1&&(f(0,"div",11),Gt(1,6),f(2,"div",12,2)(4,"div",13)(5,"div",14),Gt(6,9),m()()()()),t&2){let e=n.$implicit,i=n.$index,r=n.$index,o=n.$count,s=E(2),a=at(4);h(),b("ngTemplateOutlet",a)("ngTemplateOutletContext",ln(10,mT,e)),h(),P("mat-stepper-vertical-line",r!==o-1)("mat-vertical-content-container-active",s.selectedIndex===i),ae("inert",s.selectedIndex===i?null:""),h(2),b("id",s._getStepContentId(i)),ae("aria-labelledby",s._getStepLabelId(i)),h(2),b("ngTemplateOutlet",e.content)}}function uH(t,n){if(t&1&&(f(0,"div",4),he(1,cH,1,1,"ng-container",9),nc(2,dH,7,12,"div",11,tc),m()),t&2){let e=E();h(),ge(e.headerPrefix()?1:-1),h(),ic(e.steps)}}function fH(t,n){if(t&1){let e=Ke();f(0,"mat-step-header",15),k("click",function(){let r=oe(e).step;return se(r.select())})("keydown",function(r){oe(e);let o=E();return se(o._onKeydown(r))}),m()}if(t&2){let e=n.step,i=E();P("mat-horizontal-stepper-header",i.orientation==="horizontal")("mat-vertical-stepper-header",i.orientation==="vertical"),b("tabIndex",i._getFocusIndex()===e.index()?0:-1)("id",i._getStepLabelId(e.index()))("index",e.index())("state",e.indicatorType())("label",e.stepLabel||e.label)("selected",e.isSelected())("active",e.isNavigable())("optional",e.optional)("errorMessage",e.errorMessage)("iconOverrides",i._iconOverrides)("disableRipple",i.disableRipple||!e.isNavigable())("color",e.color||i.color),ae("role",i.orientation==="horizontal"?"tab":"button")("aria-posinset",i.orientation==="horizontal"?e.index()+1:null)("aria-setsize",i.orientation==="horizontal"?i.steps.length:null)("aria-selected",i.orientation==="horizontal"?e.isSelected():null)("aria-current",i.orientation==="vertical"&&e.isSelected()?"step":null)("aria-disabled",i.orientation==="vertical"&&e.isSelected()?"true":null)("aria-expanded",i.orientation==="vertical"?e.isSelected():null)("aria-controls",i._getStepContentId(e.index()))("aria-label",e.ariaLabel||null)("aria-labelledby",!e.ariaLabel&&e.ariaLabelledby?e.ariaLabelledby:null)("aria-disabled",e.isNavigable()?null:!0)}}function mH(t,n){t&1&&W(0,"div",17)}function pH(t,n){if(t&1&&(Gt(0,6),he(1,mH,1,0,"div",17)),t&2){let e=n.$implicit,i=n.$index,r=n.$count;E(2);let o=at(4);b("ngTemplateOutlet",o)("ngTemplateOutletContext",ln(3,mT,e)),h(),ge(i!==r-1?1:-1)}}function hH(t,n){if(t&1&&(f(0,"div",16),nc(1,pH,2,5,null,null,tc),m()),t&2){let e=n.steps;h(),ic(e)}}var Kb=(()=>{class t extends qb{static \u0275fac=(()=>{let e;return function(r){return(e||(e=en(t)))(r||t)}})();static \u0275dir=V({type:t,selectors:[["","matStepLabel",""]],features:[He]})}return t})(),gH=(()=>{class t{changes=new F;optionalLabel="Optional";completedLabel="Completed";editableLabel="Editable";static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Yb=(()=>{class t extends Wb{_intl=u(gH);_focusMonitor=u(qn);_intlSubscription;state;label;errorMessage;iconOverrides;index;selected=!1;active=!1;optional=!1;disableRipple=!1;color;constructor(){super();let e=u(ft);e.load(ci),e.load(Cs);let i=u(De);this._intlSubscription=this._intl.changes.subscribe(()=>i.markForCheck())}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){this._intlSubscription.unsubscribe(),this._focusMonitor.stopMonitoring(this._elementRef)}focus(e,i){e?this._focusMonitor.focusVia(this._elementRef,e,i):this._elementRef.nativeElement.focus(i)}_stringLabel(){return this.label instanceof Kb?null:this.label}_templateLabel(){return this.label instanceof Kb?this.label:null}_getHostElement(){return this._elementRef.nativeElement}_getDefaultTextForState(e){return e=="number"?`${this.index+1}`:e=="edit"?"create":e=="error"?"warning":e}_hasEmptyLabel(){return!this._stringLabel()&&!this._templateLabel()&&!this._hasOptionalLabel()&&!this._hasErrorLabel()}_hasOptionalLabel(){return this.optional&&this.state!=="error"}_hasErrorLabel(){return this.state==="error"}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-step-header"]],hostAttrs:["role","",1,"mat-step-header"],hostVars:4,hostBindings:function(i,r){i&2&&(_t("mat-"+(r.color||"primary")),P("mat-step-header-empty-label",r._hasEmptyLabel()))},inputs:{state:"state",label:"label",errorMessage:"errorMessage",iconOverrides:"iconOverrides",index:"index",selected:"selected",active:"active",optional:"optional",disableRipple:"disableRipple",color:"color"},features:[He],decls:10,vars:17,consts:[["matRipple","",1,"mat-step-header-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"],[1,"mat-step-icon-content"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"mat-step-label"],[1,"mat-step-text-label"],[1,"mat-step-optional"],[1,"mat-step-sub-label-error"],["aria-hidden","true"],[1,"cdk-visually-hidden"],[3,"ngTemplateOutlet"]],template:function(i,r){if(i&1&&(W(0,"div",0),f(1,"div")(2,"div",1),he(3,Gj,1,6,"ng-container",2)(4,Qj,2,1),m()(),f(5,"div",3),he(6,Zj,2,1,"div",4)(7,Xj,2,1,"div",4),he(8,Jj,2,1,"div",5),he(9,eH,2,1,"div",6),m()),i&2){let o;b("matRippleTrigger",r._getHostElement())("matRippleDisabled",r.disableRipple),h(),_t(k_("mat-step-icon-state-",r.state," mat-step-icon")),P("mat-step-icon-selected",r.selected),h(2),ge(r.iconOverrides&&r.iconOverrides[r.state]?3:4),h(2),P("mat-step-label-active",r.active)("mat-step-label-selected",r.selected)("mat-step-label-error",r.state=="error"),h(),ge((o=r._templateLabel())?6:r._stringLabel()?7:-1,o),h(2),ge(r._hasOptionalLabel()?8:-1),h(),ge(r._hasErrorLabel()?9:-1)}},dependencies:[ir,co,Qt],styles:[`.mat-step-header {
  overflow: hidden;
  outline: none;
  cursor: pointer;
  position: relative;
  box-sizing: content-box;
  -webkit-tap-highlight-color: transparent;
}
.mat-step-header:focus-visible .mat-focus-indicator::before {
  content: "";
}
.mat-step-header:hover[aria-disabled=true] {
  cursor: default;
}
.mat-step-header:hover:not([aria-disabled]), .mat-step-header:hover[aria-disabled=false] {
  background-color: var(--mat-stepper-header-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
  border-radius: var(--mat-stepper-header-hover-state-layer-shape, var(--mat-sys-corner-medium));
}
.mat-step-header.cdk-keyboard-focused, .mat-step-header.cdk-program-focused {
  background-color: var(--mat-stepper-header-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
  border-radius: var(--mat-stepper-header-focus-state-layer-shape, var(--mat-sys-corner-medium));
}
@media (hover: none) {
  .mat-step-header:hover {
    background: none;
  }
}
@media (forced-colors: active) {
  .mat-step-header {
    outline: solid 1px;
  }
  .mat-step-header[aria-selected=true] .mat-step-label {
    text-decoration: underline;
  }
  .mat-step-header[aria-disabled=true] {
    outline-color: GrayText;
  }
  .mat-step-header[aria-disabled=true] .mat-step-label,
  .mat-step-header[aria-disabled=true] .mat-step-icon,
  .mat-step-header[aria-disabled=true] .mat-step-optional {
    color: GrayText;
  }
}

.mat-step-optional {
  font-size: 12px;
  color: var(--mat-stepper-header-optional-label-text-color, var(--mat-sys-on-surface-variant));
}

.mat-step-sub-label-error {
  font-size: 12px;
  font-weight: normal;
}

.mat-step-icon {
  border-radius: 50%;
  height: 24px;
  width: 24px;
  flex-shrink: 0;
  position: relative;
  color: var(--mat-stepper-header-icon-foreground-color, var(--mat-sys-surface));
  background-color: var(--mat-stepper-header-icon-background-color, var(--mat-sys-on-surface-variant));
}

.mat-step-icon-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}

.mat-step-icon .mat-icon {
  font-size: 16px;
  height: 16px;
  width: 16px;
}

.mat-step-icon-state-error {
  background-color: var(--mat-stepper-header-error-state-icon-background-color, transparent);
  color: var(--mat-stepper-header-error-state-icon-foreground-color, var(--mat-sys-error));
}
.mat-step-icon-state-error .mat-icon {
  font-size: 24px;
  height: 24px;
  width: 24px;
}

.mat-step-label {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 50px;
  vertical-align: middle;
  font-family: var(--mat-stepper-header-label-text-font, var(--mat-sys-title-small-font));
  font-size: var(--mat-stepper-header-label-text-size, var(--mat-sys-title-small-size));
  font-weight: var(--mat-stepper-header-label-text-weight, var(--mat-sys-title-small-weight));
  color: var(--mat-stepper-header-label-text-color, var(--mat-sys-on-surface-variant));
}
.mat-step-label.mat-step-label-active {
  color: var(--mat-stepper-header-selected-state-label-text-color, var(--mat-sys-on-surface-variant));
}
.mat-step-label.mat-step-label-error {
  color: var(--mat-stepper-header-error-state-label-text-color, var(--mat-sys-error));
  font-size: var(--mat-stepper-header-error-state-label-text-size, var(--mat-sys-title-small-size));
}
.mat-step-label.mat-step-label-selected {
  font-size: var(--mat-stepper-header-selected-state-label-text-size, var(--mat-sys-title-small-size));
  font-weight: var(--mat-stepper-header-selected-state-label-text-weight, var(--mat-sys-title-small-weight));
}
.mat-step-header-empty-label .mat-step-label {
  min-width: 0;
}

.mat-step-text-label {
  text-overflow: ellipsis;
  overflow: hidden;
}

.mat-step-header .mat-step-header-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}

.mat-step-icon-selected {
  background-color: var(--mat-stepper-header-selected-state-icon-background-color, var(--mat-sys-primary));
  color: var(--mat-stepper-header-selected-state-icon-foreground-color, var(--mat-sys-on-primary));
}

.mat-step-icon-state-done {
  background-color: var(--mat-stepper-header-done-state-icon-background-color, var(--mat-sys-primary));
  color: var(--mat-stepper-header-done-state-icon-foreground-color, var(--mat-sys-on-primary));
}

.mat-step-icon-state-edit {
  background-color: var(--mat-stepper-header-edit-state-icon-background-color, var(--mat-sys-primary));
  color: var(--mat-stepper-header-edit-state-icon-foreground-color, var(--mat-sys-on-primary));
}
`],encapsulation:2,changeDetection:0})}return t})(),vH=(()=>{class t{templateRef=u(wt);name;constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["ng-template","matStepperIcon",""]],inputs:{name:[0,"matStepperIcon","name"]}})}return t})(),_H=(()=>{class t{_template=u(wt);constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["ng-template","matStepContent",""]]})}return t})(),yH=(()=>{class t extends $p{_errorStateMatcher=u(wo,{skipSelf:!0});_viewContainerRef=u(Nt);_isSelected=ke.EMPTY;stepLabel=void 0;color;_lazyContent;_portal;ngAfterContentInit(){this._isSelected=this._stepper.steps.changes.pipe(Ct(()=>this._stepper.selectionChange.pipe(ue(e=>e.selectedStep===this),zt(this._stepper.selected===this)))).subscribe(e=>{e&&this._lazyContent&&!this._portal&&(this._portal=new Nr(this._lazyContent._template,this._viewContainerRef))})}ngOnDestroy(){this._isSelected.unsubscribe()}isErrorState(e,i){let r=this._errorStateMatcher.isErrorState(e,i),o=!!(e&&e.invalid&&this.interacted);return r||o}static \u0275fac=(()=>{let e;return function(r){return(e||(e=en(t)))(r||t)}})();static \u0275cmp=O({type:t,selectors:[["mat-step"]],contentQueries:function(i,r,o){if(i&1&&Et(o,Kb,5)(o,_H,5),i&2){let s;q(s=K())&&(r.stepLabel=s.first),q(s=K())&&(r._lazyContent=s.first)}},hostAttrs:["hidden",""],inputs:{color:"color"},exportAs:["matStep"],features:[ze([{provide:wo,useExisting:t},{provide:$p,useExisting:t}]),He],ngContentSelectors:uT,decls:1,vars:0,consts:[[3,"cdkPortalOutlet"]],template:function(i,r){i&1&&(Ie(),j(0,nH,2,1,"ng-template"))},dependencies:[ld],encapsulation:2,changeDetection:0})}return t})(),bH=(()=>{class t extends Gp{_ngZone=u(U);_renderer=u(Ue);_animationsDisabled=tt();_cleanupTransition;_isAnimating=T(!1);_stepHeader=void 0;_animatedContainers;_steps=void 0;steps=new Jn;_icons;animationDone=new Z;disableRipple=!1;color;labelPosition="end";headerPosition="top";headerPrefix=Vf(null);_iconOverrides={};get animationDuration(){return this._animationDuration}set animationDuration(e){this._animationDuration=/^\d+$/.test(e)?e+"ms":e}_animationDuration="";_isServer=!u(Re).isBrowser;constructor(){super();let i=u(z).nativeElement.nodeName.toLowerCase();this.orientation=i==="mat-vertical-stepper"?"vertical":"horizontal"}ngAfterContentInit(){super.ngAfterContentInit(),this._icons.forEach(({name:e,templateRef:i})=>this._iconOverrides[e]=i),this.steps.changes.pipe(xe(this._destroyed)).subscribe(()=>this._stateChanged()),this.selectedIndexChange.pipe(xe(this._destroyed)).subscribe(()=>{let e=this._getAnimationDuration();e==="0ms"||e==="0s"?this._onAnimationDone():this._isAnimating.set(!0)}),this._ngZone.runOutsideAngular(()=>{this._animationsDisabled||setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-stepper-animations-enabled"),this._cleanupTransition=this._renderer.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionend)},200)})}ngAfterViewInit(){if(super.ngAfterViewInit(),typeof queueMicrotask=="function"){let e=!1;this._animatedContainers.changes.pipe(zt(null),xe(this._destroyed)).subscribe(()=>queueMicrotask(()=>{e||(e=!0,this.animationDone.emit()),this._stateChanged()}))}}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTransition?.()}_getAnimationDuration(){return this._animationsDisabled?"0ms":this.animationDuration?this.animationDuration:this.orientation==="horizontal"?"500ms":"225ms"}_handleTransitionend=e=>{let i=e.target;if(!i)return;let r=this.orientation==="horizontal"&&e.propertyName==="transform"&&i.classList.contains("mat-horizontal-stepper-content-current"),o=this.orientation==="vertical"&&e.propertyName==="grid-template-rows"&&i.classList.contains("mat-vertical-content-container-active");(r||o)&&this._animatedContainers.find(a=>a.nativeElement===i)&&this._onAnimationDone()};_onAnimationDone(){this._isAnimating.set(!1),this.animationDone.emit()}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-stepper"],["mat-vertical-stepper"],["mat-horizontal-stepper"],["","matStepper",""]],contentQueries:function(i,r,o){if(i&1&&Et(o,yH,5)(o,vH,5),i&2){let s;q(s=K())&&(r._steps=s),q(s=K())&&(r._icons=s)}},viewQuery:function(i,r){if(i&1&&$e(Yb,5)(iH,5),i&2){let o;q(o=K())&&(r._stepHeader=o),q(o=K())&&(r._animatedContainers=o)}},hostVars:14,hostBindings:function(i,r){i&2&&(an("--mat-stepper-animation-duration",r._getAnimationDuration()),P("mat-stepper-horizontal",r.orientation==="horizontal")("mat-stepper-vertical",r.orientation==="vertical")("mat-stepper-label-position-end",r.orientation==="horizontal"&&r.labelPosition=="end")("mat-stepper-label-position-bottom",r.orientation==="horizontal"&&r.labelPosition=="bottom")("mat-stepper-header-position-bottom",r.headerPosition==="bottom")("mat-stepper-animating",r._isAnimating()))},inputs:{disableRipple:"disableRipple",color:"color",labelPosition:"labelPosition",headerPosition:"headerPosition",headerPrefix:[1,"headerPrefix"],animationDuration:"animationDuration"},outputs:{animationDone:"animationDone"},exportAs:["matStepper","matVerticalStepper","matHorizontalStepper"],features:[ze([{provide:Gp,useExisting:t}]),He],ngContentSelectors:uT,decls:7,vars:2,consts:[["stepTemplate",""],["horizontalStepsTemplate",""],["animatedContainer",""],[1,"mat-horizontal-stepper-wrapper"],[1,"mat-vertical-stepper-wrapper"],[1,"mat-horizontal-stepper-header-wrapper"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"mat-horizontal-content-container"],["role","tabpanel",1,"mat-horizontal-stepper-content",3,"id","class"],[3,"ngTemplateOutlet"],["role","tabpanel",1,"mat-horizontal-stepper-content",3,"id"],[1,"mat-step"],[1,"mat-vertical-content-container"],["role","region",1,"mat-vertical-stepper-content",3,"id"],[1,"mat-vertical-content"],[3,"click","keydown","tabIndex","id","index","state","label","selected","active","optional","errorMessage","iconOverrides","disableRipple","color"],["aria-orientation","horizontal","role","tablist",1,"mat-horizontal-stepper-header-container"],[1,"mat-stepper-horizontal-line"]],template:function(i,r){if(i&1&&(Ie(),he(0,rH,1,0),he(1,lH,6,1,"div",3)(2,uH,4,1,"div",4),j(3,fH,1,27,"ng-template",null,0,lo)(5,hH,3,0,"ng-template",null,1,lo)),i&2){let o;ge(r._isServer?0:-1),h(),ge((o=r.orientation)==="horizontal"?1:o==="vertical"?2:-1)}},dependencies:[co,Yb],styles:[`.mat-stepper-vertical,
.mat-stepper-horizontal {
  display: block;
  font-family: var(--mat-stepper-container-text-font, var(--mat-sys-body-medium-font));
  background: var(--mat-stepper-container-color, var(--mat-sys-surface));
}

.mat-horizontal-stepper-header-wrapper {
  align-items: center;
  display: flex;
}

.mat-horizontal-stepper-header-container {
  white-space: nowrap;
  display: flex;
  align-items: center;
  flex-grow: 1;
}
.mat-stepper-label-position-bottom .mat-horizontal-stepper-header-container {
  align-items: flex-start;
}
.mat-stepper-header-position-bottom .mat-horizontal-stepper-header-container {
  order: 1;
}

.mat-stepper-horizontal-line {
  border-top-width: 1px;
  border-top-style: solid;
  flex: auto;
  height: 0;
  margin: 0 -16px;
  min-width: 32px;
  border-top-color: var(--mat-stepper-line-color, var(--mat-sys-outline));
}
.mat-stepper-label-position-bottom .mat-stepper-horizontal-line {
  margin: 0;
  min-width: 0;
  position: relative;
  top: calc(calc((var(--mat-stepper-header-height, 72px) - 24px) / 2) + 12px);
}

.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before, [dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before, .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after, [dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after {
  border-top-width: 1px;
  border-top-style: solid;
  content: "";
  display: inline-block;
  height: 0;
  position: absolute;
  width: calc(50% - 20px);
}

.mat-horizontal-stepper-header {
  display: flex;
  overflow: hidden;
  align-items: center;
  padding: 0 24px;
  height: var(--mat-stepper-header-height, 72px);
}
.mat-horizontal-stepper-header .mat-step-icon {
  margin-right: 8px;
  flex: none;
}
[dir=rtl] .mat-horizontal-stepper-header .mat-step-icon {
  margin-right: 0;
  margin-left: 8px;
}
.mat-horizontal-stepper-header.mat-step-header-empty-label .mat-step-icon {
  margin: 0;
}
.mat-horizontal-stepper-header::before, .mat-horizontal-stepper-header::after {
  border-top-color: var(--mat-stepper-line-color, var(--mat-sys-outline));
}
.mat-stepper-label-position-bottom .mat-horizontal-stepper-header {
  padding: calc((var(--mat-stepper-header-height, 72px) - 24px) / 2) 24px;
}
.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::before, .mat-stepper-label-position-bottom .mat-horizontal-stepper-header::after {
  top: calc(calc((var(--mat-stepper-header-height, 72px) - 24px) / 2) + 12px);
}
.mat-stepper-label-position-bottom .mat-horizontal-stepper-header {
  box-sizing: border-box;
  flex-direction: column;
  height: auto;
}
.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after, [dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after {
  right: 0;
}
.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before, [dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before {
  left: 0;
}
[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:last-child::before, [dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:first-child::after {
  display: none;
}
.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-icon {
  margin-right: 0;
  margin-left: 0;
}
.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-label {
  padding: 16px 0 0 0;
  text-align: center;
  width: 100%;
}

.mat-vertical-stepper-header {
  display: flex;
  align-items: center;
  height: 24px;
  padding: calc((var(--mat-stepper-header-height, 72px) - 24px) / 2) 24px;
}
.mat-vertical-stepper-header .mat-step-icon {
  margin-right: 12px;
}
[dir=rtl] .mat-vertical-stepper-header .mat-step-icon {
  margin-right: 0;
  margin-left: 12px;
}

.mat-horizontal-stepper-wrapper {
  display: flex;
  flex-direction: column;
}

.mat-horizontal-stepper-content {
  visibility: hidden;
  overflow: hidden;
  outline: 0;
  height: 0;
}
.mat-stepper-animations-enabled .mat-horizontal-stepper-content {
  transition: transform var(--mat-stepper-animation-duration, 0) cubic-bezier(0.35, 0, 0.25, 1);
}
.mat-horizontal-stepper-content.mat-horizontal-stepper-content-previous {
  transform: translate3d(-100%, 0, 0);
}
.mat-horizontal-stepper-content.mat-horizontal-stepper-content-next {
  transform: translate3d(100%, 0, 0);
}
.mat-horizontal-stepper-content.mat-horizontal-stepper-content-current {
  visibility: visible;
  transform: none;
  height: auto;
}
.mat-stepper-horizontal:not(.mat-stepper-animating) .mat-horizontal-stepper-content.mat-horizontal-stepper-content-current {
  overflow: visible;
}

.mat-horizontal-content-container {
  overflow: hidden;
  padding: 0 24px 24px 24px;
}
@media (forced-colors: active) {
  .mat-horizontal-content-container {
    outline: solid 1px;
  }
}
.mat-stepper-header-position-bottom .mat-horizontal-content-container {
  padding: 24px 24px 0 24px;
}

.mat-vertical-content-container {
  display: grid;
  grid-template-rows: 0fr;
  grid-template-columns: 100%;
  margin-left: 36px;
  border: 0;
  position: relative;
}
.mat-stepper-animations-enabled .mat-vertical-content-container {
  transition: grid-template-rows var(--mat-stepper-animation-duration, 0) cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-vertical-content-container.mat-vertical-content-container-active {
  grid-template-rows: 1fr;
}
.mat-step:last-child .mat-vertical-content-container {
  border: none;
}
@media (forced-colors: active) {
  .mat-vertical-content-container {
    outline: solid 1px;
  }
}
[dir=rtl] .mat-vertical-content-container {
  margin-left: 0;
  margin-right: 36px;
}
@supports not (grid-template-rows: 0fr) {
  .mat-vertical-content-container {
    height: 0;
  }
  .mat-vertical-content-container.mat-vertical-content-container-active {
    height: auto;
  }
}

.mat-stepper-vertical-line::before {
  content: "";
  position: absolute;
  left: 0;
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: var(--mat-stepper-line-color, var(--mat-sys-outline));
  top: calc(8px - calc((var(--mat-stepper-header-height, 72px) - 24px) / 2));
  bottom: calc(8px - calc((var(--mat-stepper-header-height, 72px) - 24px) / 2));
}
[dir=rtl] .mat-stepper-vertical-line::before {
  left: auto;
  right: 0;
}

.mat-vertical-stepper-content {
  overflow: hidden;
  outline: 0;
  visibility: hidden;
}
.mat-stepper-animations-enabled .mat-vertical-stepper-content {
  transition: visibility var(--mat-stepper-animation-duration, 0) linear;
}
.mat-vertical-content-container-active > .mat-vertical-stepper-content {
  visibility: visible;
}

.mat-vertical-content {
  padding: 0 24px 24px 24px;
}
`],encapsulation:2,changeDetection:0})}return t})();var pT=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({providers:[wo],imports:[Qa,dT,Zt,rr,bH,Yb,me]})}return t})();function CH(t,n){t&1&&vt(0,"div",2)}var wH=new w("MAT_PROGRESS_BAR_DEFAULT_OPTIONS");var gT=(()=>{class t{_elementRef=u(z);_ngZone=u(U);_changeDetectorRef=u(De);_renderer=u(Ue);_cleanupTransitionEnd;constructor(){let e=td(),i=u(wH,{optional:!0});this._isNoopAnimation=e==="di-disabled",e==="reduced-motion"&&this._elementRef.nativeElement.classList.add("mat-progress-bar-reduced-motion"),i&&(i.color&&(this.color=this._defaultColor=i.color),this.mode=i.mode||this.mode)}_isNoopAnimation;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;_defaultColor="primary";get value(){return this._value}set value(e){this._value=hT(e||0),this._changeDetectorRef.markForCheck()}_value=0;get bufferValue(){return this._bufferValue||0}set bufferValue(e){this._bufferValue=hT(e||0),this._changeDetectorRef.markForCheck()}_bufferValue=0;animationEnd=new Z;get mode(){return this._mode}set mode(e){this._mode=e,this._changeDetectorRef.markForCheck()}_mode="determinate";ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{this._cleanupTransitionEnd=this._renderer.listen(this._elementRef.nativeElement,"transitionend",this._transitionendHandler)})}ngOnDestroy(){this._cleanupTransitionEnd?.()}_getPrimaryBarTransform(){return`scaleX(${this._isIndeterminate()?1:this.value/100})`}_getBufferBarFlexBasis(){return`${this.mode==="buffer"?this.bufferValue:100}%`}_isIndeterminate(){return this.mode==="indeterminate"||this.mode==="query"}_transitionendHandler=e=>{this.animationEnd.observers.length===0||!e.target||!e.target.classList.contains("mdc-linear-progress__primary-bar")||(this.mode==="determinate"||this.mode==="buffer")&&this._ngZone.run(()=>this.animationEnd.next({value:this.value}))};static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-progress-bar"]],hostAttrs:["role","progressbar","aria-valuemin","0","aria-valuemax","100","tabindex","-1",1,"mat-mdc-progress-bar","mdc-linear-progress"],hostVars:10,hostBindings:function(i,r){i&2&&(ae("aria-valuenow",r._isIndeterminate()?null:r.value)("mode",r.mode),_t("mat-"+r.color),P("_mat-animation-noopable",r._isNoopAnimation)("mdc-linear-progress--animation-ready",!r._isNoopAnimation)("mdc-linear-progress--indeterminate",r._isIndeterminate()))},inputs:{color:"color",value:[2,"value","value",St],bufferValue:[2,"bufferValue","bufferValue",St],mode:"mode"},outputs:{animationEnd:"animationEnd"},exportAs:["matProgressBar"],decls:7,vars:5,consts:[["aria-hidden","true",1,"mdc-linear-progress__buffer"],[1,"mdc-linear-progress__buffer-bar"],[1,"mdc-linear-progress__buffer-dots"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__primary-bar"],[1,"mdc-linear-progress__bar-inner"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__secondary-bar"]],template:function(i,r){i&1&&(gt(0,"div",0),vt(1,"div",1),he(2,CH,1,0,"div",2),Dt(),gt(3,"div",3),vt(4,"span",4),Dt(),gt(5,"div",5),vt(6,"span",4),Dt()),i&2&&(h(),an("flex-basis",r._getBufferBarFlexBasis()),h(),ge(r.mode==="buffer"?2:-1),h(),an("transform",r._getPrimaryBarTransform()))},styles:[`.mat-mdc-progress-bar {
  --mat-progress-bar-animation-multiplier: 1;
  display: block;
  text-align: start;
}
.mat-mdc-progress-bar[mode=query] {
  transform: scaleX(-1);
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner {
  animation: none;
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar {
  transition: transform 1ms;
}

.mat-progress-bar-reduced-motion {
  --mat-progress-bar-animation-multiplier: 2;
}

.mdc-linear-progress {
  position: relative;
  width: 100%;
  transform: translateZ(0);
  outline: 1px solid transparent;
  overflow-x: hidden;
  transition: opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: max(var(--mat-progress-bar-track-height, 4px), var(--mat-progress-bar-active-indicator-height, 4px));
}
@media (forced-colors: active) {
  .mdc-linear-progress {
    outline-color: CanvasText;
  }
}

.mdc-linear-progress__bar {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  animation: none;
  transform-origin: top left;
  transition: transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: var(--mat-progress-bar-active-indicator-height, 4px);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__bar {
  transition: none;
}
[dir=rtl] .mdc-linear-progress__bar {
  right: 0;
  transform-origin: center right;
}

.mdc-linear-progress__bar-inner {
  display: inline-block;
  position: absolute;
  width: 100%;
  animation: none;
  border-top-style: solid;
  border-color: var(--mat-progress-bar-active-indicator-color, var(--mat-sys-primary));
  border-top-width: var(--mat-progress-bar-active-indicator-height, 4px);
}

.mdc-linear-progress__buffer {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  overflow: hidden;
  height: var(--mat-progress-bar-track-height, 4px);
  border-radius: var(--mat-progress-bar-track-shape, var(--mat-sys-corner-none));
}

.mdc-linear-progress__buffer-dots {
  background-image: radial-gradient(circle, var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant)) calc(var(--mat-progress-bar-track-height, 4px) / 2), transparent 0);
  background-repeat: repeat-x;
  background-size: calc(calc(var(--mat-progress-bar-track-height, 4px) / 2) * 5);
  background-position: left;
  flex: auto;
  transform: rotate(180deg);
  animation: mdc-linear-progress-buffering calc(250ms * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
@media (forced-colors: active) {
  .mdc-linear-progress__buffer-dots {
    background-color: ButtonBorder;
  }
}
[dir=rtl] .mdc-linear-progress__buffer-dots {
  animation: mdc-linear-progress-buffering-reverse calc(250ms * var(--mat-progress-bar-animation-multiplier)) infinite linear;
  transform: rotate(0);
}

.mdc-linear-progress__buffer-bar {
  flex: 0 1 100%;
  transition: flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  background-color: var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant));
}

.mdc-linear-progress__primary-bar {
  transform: scaleX(0);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  left: -145.166611%;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation: mdc-linear-progress-primary-indeterminate-translate calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-primary-indeterminate-scale calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation-name: mdc-linear-progress-primary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  right: -145.166611%;
  left: auto;
}

.mdc-linear-progress__secondary-bar {
  display: none;
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  left: -54.888891%;
  display: block;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation: mdc-linear-progress-secondary-indeterminate-translate calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-secondary-indeterminate-scale calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation-name: mdc-linear-progress-secondary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  right: -54.888891%;
  left: auto;
}

@keyframes mdc-linear-progress-buffering {
  from {
    transform: rotate(180deg) translateX(calc(var(--mat-progress-bar-track-height, 4px) * -2.5));
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(83.67142%);
  }
  100% {
    transform: translateX(200.611057%);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-scale {
  0% {
    transform: scaleX(0.08);
  }
  36.65% {
    animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
    transform: scaleX(0.08);
  }
  69.15% {
    animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
    transform: scaleX(0.661479);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(84.386165%);
  }
  100% {
    transform: translateX(160.277782%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-scale {
  0% {
    animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);
    transform: scaleX(0.08);
  }
  19.15% {
    animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);
    transform: scaleX(0.457104);
  }
  44.15% {
    animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
    transform: scaleX(0.72796);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(-83.67142%);
  }
  100% {
    transform: translateX(-200.611057%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(-37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(-84.386165%);
  }
  100% {
    transform: translateX(-160.277782%);
  }
}
@keyframes mdc-linear-progress-buffering-reverse {
  from {
    transform: translateX(-10px);
  }
}
`],encapsulation:2,changeDetection:0})}return t})();function hT(t,n=0,e=100){return Math.max(n,Math.min(e,t))}var vT=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[me]})}return t})();var Wp=class t{constructor(n){this.http=n}apiUrl="/api/import";previewImport(n,e){let i={csv:n,config:e};return this.http.post(`${this.apiUrl}/preview`,i)}startImport(n,e){let i={csv:n,config:e};return this.http.post(`${this.apiUrl}/start`,i)}static \u0275fac=function(e){return new(e||t)(A(ut))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})};var SH=t=>({"invalid-cell":t});function xH(t,n){if(t&1&&(f(0,"mat-card",6)(1,"mat-card-content")(2,"mat-icon",7),g(3,"error"),m(),f(4,"span"),g(5),m()()()),t&2){let e=E();h(5),ee(e.error())}}function MH(t,n){t&1&&W(0,"mat-progress-bar",8)}function IH(t,n){if(t&1){let e=Ke();f(0,"mat-card",9)(1,"mat-card-header")(2,"mat-card-title")(3,"mat-icon"),g(4,"upload_file"),m(),g(5," CSV-Datei ausw\xE4hlen "),m()(),f(6,"mat-card-content")(7,"p",10),g(8," W\xE4hlen Sie eine CSV-Datei (Kommagetrennte Tabellenwerte) zum Importieren aus. "),m(),f(9,"div",11)(10,"input",12,0),k("change",function(r){oe(e);let o=E();return se(o.onFileSelected(r))}),m(),f(12,"button",13),k("click",function(){oe(e);let r=at(11);return se(r.click())}),f(13,"mat-icon"),g(14,"folder_open"),m(),g(15," Datei ausw\xE4hlen "),m()()()()}}function TH(t,n){if(t&1){let e=Ke();f(0,"mat-card",9)(1,"mat-card-header")(2,"mat-card-title")(3,"mat-icon"),g(4,"settings"),m(),g(5," Einstellungen anpassen "),m()(),f(6,"mat-card-content")(7,"p",10),g(8," Passen Sie die CSV-Einstellungen an und erstellen Sie eine Vorschau. "),m(),f(9,"mat-form-field",14)(10,"mat-label"),g(11,"Trennzeichen"),m(),f(12,"input",15),k("input",function(r){oe(e);let o=E();return se(o.onSeparatorChange(r))}),m()(),f(13,"div",16)(14,"label",17)(15,"input",18),k("change",function(r){oe(e);let o=E();return se(o.onAutoDetectChange(r))}),m(),f(16,"span"),g(17,"Kategorien automatisch erkennen"),m()(),f(18,"p",19),g(19," Nutzt definierte Kategorie-Schl\xFCsselw\xF6rter und Namensmuster, um Kategorien automatisch zuzuweisen "),m()(),f(20,"div",20)(21,"button",21),k("click",function(){oe(e);let r=E();return se(r.goBack())}),f(22,"mat-icon"),g(23,"arrow_back"),m(),g(24," Zur\xFCck "),m(),f(25,"button",22),k("click",function(){oe(e);let r=E();return se(r.updatePreview())}),f(26,"mat-icon"),g(27,"preview"),m(),g(28," Vorschau aktualisieren "),m()()()()}if(t&2){let e=E();h(12),b("value",e.csvSeparator()),h(3),b("checked",e.autoDetectCategory()),h(10),b("disabled",e.isLoading())}}function kH(t,n){if(t&1&&(f(0,"div",24)(1,"span",25),g(2,"Probleme:"),m(),f(3,"span",35),g(4),m()()),t&2){let e=E(2);h(4),ee(e.previewData().length-e.validRowCount())}}function RH(t,n){if(t&1&&(f(0,"div",36)(1,"mat-icon"),g(2,"warning"),m(),f(3,"span"),g(4),m()()),t&2){let e=E(2);h(4),X("Es existieren ",e.previewData().length-e.validRowCount()," fehlerhafte oder doppelte Zeilen")}}function AH(t,n){if(t&1&&(f(0,"th"),g(1),m()),t&2){let e=n.$implicit;h(),ee(e)}}function OH(t,n){if(t&1&&(f(0,"td",37),g(1),m()),t&2){let e=n.$implicit,i=E().$implicit;b("ngClass",ln(2,SH,i._invalid)),h(),X(" ",i[e]," ")}}function NH(t,n){if(t&1&&(f(0,"tr",37)(1,"td",32)(2,"mat-icon",38),g(3),m()(),j(4,OH,2,4,"td",34),m()),t&2){let e=n.$implicit,i=E(2);b("ngClass","status-"+i.getRowStatus(e)),h(2),b("title",i.getRowStatus(e)),h(),X(" ",i.getRowStatusIcon(i.getRowStatus(e))," "),h(),b("ngForOf",i.headers())}}function PH(t,n){if(t&1){let e=Ke();f(0,"mat-card",9)(1,"mat-card-header")(2,"mat-card-title")(3,"mat-icon"),g(4,"visibility"),m(),g(5," Vorschau "),m()(),f(6,"mat-card-content")(7,"p",10),g(8," \xDCberpr\xFCfen Sie die importierten Daten in die Kasse: "),f(9,"strong"),g(10),m()(),f(11,"div",23)(12,"div",24)(13,"span",25),g(14,"Gesamtzeilen:"),m(),f(15,"span",26),g(16),m()(),f(17,"div",24)(18,"span",25),g(19,"G\xFCltig:"),m(),f(20,"span",27),g(21),m()(),j(22,kH,5,1,"div",28),m(),j(23,RH,5,1,"div",29),f(24,"div",30)(25,"table",31)(26,"thead")(27,"tr")(28,"th",32),g(29,"Status"),m(),j(30,AH,2,1,"th",33),m()(),f(31,"tbody"),j(32,NH,5,4,"tr",34),m()()(),f(33,"div",20)(34,"button",21),k("click",function(){oe(e);let r=E();return se(r.goBack())}),f(35,"mat-icon"),g(36,"arrow_back"),m(),g(37," Zur\xFCck "),m(),f(38,"button",22),k("click",function(){oe(e);let r=E();return se(r.confirmImport())}),f(39,"mat-icon"),g(40,"check"),m(),g(41," Vorschau best\xE4tigen "),m()()()()}if(t&2){let e,i=E();h(10),ee((e=i.activeAccount())==null?null:e.label),h(6),ee(i.previewData().length),h(5),ee(i.validRowCount()),h(),b("ngIf",i.hasInvalidRows()),h(),b("ngIf",i.hasInvalidRows()),h(7),b("ngForOf",i.headers()),h(2),b("ngForOf",i.previewData()),h(6),b("disabled",i.hasInvalidRows()||i.isLoading())}}function FH(t,n){if(t&1){let e=Ke();f(0,"mat-card",9)(1,"mat-card-header")(2,"mat-card-title")(3,"mat-icon"),g(4,"check_circle"),m(),g(5," Import best\xE4tigen "),m()(),f(6,"mat-card-content")(7,"p",10),g(8),m(),f(9,"div",39)(10,"div",40)(11,"mat-icon",41),g(12,"account_balance"),m(),f(13,"div",42)(14,"span",25),g(15,"Zielkonto:"),m(),f(16,"span",26),g(17),m()()(),f(18,"div",40)(19,"mat-icon",43),g(20,"file_copy"),m(),f(21,"div",42)(22,"span",25),g(23,"Buchungen zum Import:"),m(),f(24,"span",26),g(25),m()()()(),f(26,"div",20)(27,"button",21),k("click",function(){oe(e);let r=E();return se(r.goToPreview())}),f(28,"mat-icon"),g(29,"arrow_back"),m(),g(30," Zur\xFCck "),m(),f(31,"button",44),k("click",function(){oe(e);let r=E();return se(r.doImport())}),f(32,"mat-icon"),g(33,"cloud_upload"),m(),g(34," Import starten "),m()()()()}if(t&2){let e,i=E();h(8),X(" Sind Sie sicher, dass Sie ",i.validRowCount()," Buchungen importieren m\xF6chten? "),h(9),ee((e=i.activeAccount())==null?null:e.label),h(8),ee(i.validRowCount()),h(6),b("disabled",i.isLoading())}}var _T=(o=>(o[o.FileSelect=0]="FileSelect",o[o.Config=1]="Config",o[o.Preview=2]="Preview",o[o.Confirm=3]="Confirm",o[o.Complete=4]="Complete",o))(_T||{}),qp=class t{constructor(n,e,i,r){this.router=n;this.importService=e;this.accountService=i;this.settingsService=r}currentStep=T(0);csvSeparator=T(";");csvContent=T(null);autoDetectCategory=T(!0);previewData=T([]);headers=T([]);mappings=T({});isLoading=T(!1);error=T(null);activeAccount=T(null);currency=T("\u20AC");readonly=T(!1);ImportStep=_T;displayedColumns=dt(()=>["status",...this.headers().length>0?this.headers():[]]);hasInvalidRows=dt(()=>this.previewData().some(n=>n._invalid||n._duplicate));validRowCount=dt(()=>this.previewData().filter(n=>!n._invalid&&!n._duplicate).length);ngOnInit(){this.loadSettings(),this.loadActiveAccount()}loadSettings(){this.settingsService.getSettings().subscribe({next:n=>{this.currency.set(n.currency||"\u20AC")}})}loadActiveAccount(){this.accountService.loadActiveAccount().subscribe()}onFileSelected(n){let i=n.target.files?.[0];if(!i)return;if(!i.name.endsWith(".csv")){this.error.set("Bitte w\xE4hlen Sie eine CSV-Datei aus");return}this.error.set(null);let r=new FileReader;r.onload=o=>{let s=o.target?.result;this.csvContent.set(s),this.currentStep.set(1),this.updatePreview()},r.onerror=()=>{this.error.set("Fehler beim Lesen der Datei")},r.readAsText(i)}updatePreview(){let n=this.csvContent();if(!n)return;this.isLoading.set(!0),this.error.set(null);let e={separator:this.csvSeparator(),mappings:this.mappings(),autoDetectCategory:this.autoDetectCategory()};this.importService.previewImport(n,e).subscribe({next:i=>{this.previewData.set(i.bookings||[]),this.headers.set(i.headers||[]),this.currentStep.set(2),this.isLoading.set(!1)},error:i=>{this.error.set("Fehler beim Vorschau: "+(i.error?.message||"Unbekannter Fehler")),this.isLoading.set(!1)}})}confirmImport(){if(this.hasInvalidRows()){this.error.set("Bitte beheben Sie die Fehler in der Vorschau");return}this.currentStep.set(3)}doImport(){let n=this.csvContent();if(!n)return;this.isLoading.set(!0),this.error.set(null);let e={separator:this.csvSeparator(),mappings:this.mappings(),autoDetectCategory:this.autoDetectCategory()};this.importService.startImport(n,e).subscribe({next:i=>{this.isLoading.set(!1);let r=this.validRowCount(),o=(i.bookings?.length||0)-r;this.router.navigate(["/import-done"],{queryParams:{imported:r,skipped:o}})},error:i=>{this.error.set("Fehler beim Import: "+(i.error?.message||"Unbekannter Fehler")),this.isLoading.set(!1)}})}onSeparatorChange(n){let e=n.target.value;this.csvSeparator.set(e)}onAutoDetectChange(n){let e=n.target.checked;this.autoDetectCategory.set(e)}goBack(){this.currentStep.set(0),this.csvContent.set(null),this.previewData.set([]),this.headers.set([]),this.error.set(null)}goToPreview(){this.currentStep.set(2)}getRowStatus(n){return n._invalid?"invalid":n._duplicate?"duplicate":"valid"}getRowStatusIcon(n){switch(n){case"valid":return"check_circle";case"invalid":return"error";case"duplicate":return"warning";default:return"help"}}static \u0275fac=function(e){return new(e||t)(I(Ae),I(Wp),I(or),I(pn))};static \u0275cmp=O({type:t,selectors:[["app-import"]],decls:8,vars:6,consts:[["fileInput",""],[1,"import-page"],[1,"container"],["class","error-card",4,"ngIf"],["mode","indeterminate",4,"ngIf"],["class","step-card",4,"ngIf"],[1,"error-card"],[1,"error-icon"],["mode","indeterminate"],[1,"step-card"],[1,"step-description"],[1,"file-input-container"],["type","file","accept",".csv",1,"file-input",3,"change"],["mat-raised-button","","color","primary",3,"click"],[1,"full-width"],["matInput","","name","separator","placeholder","z.B. ',', ';', TAB",3,"input","value"],[1,"auto-detect-section"],[1,"auto-detect-label"],["type","checkbox",1,"auto-detect-checkbox",3,"change","checked"],[1,"auto-detect-hint"],[1,"button-group"],["mat-stroked-button","",3,"click"],["mat-raised-button","","color","primary",3,"click","disabled"],[1,"summary-box"],[1,"summary-item"],[1,"label"],[1,"value"],[1,"value","valid"],["class","summary-item",4,"ngIf"],["class","warning-box",4,"ngIf"],[1,"table-wrapper"],[1,"preview-table"],[1,"status-col"],[4,"ngFor","ngForOf"],[3,"ngClass",4,"ngFor","ngForOf"],[1,"value","invalid"],[1,"warning-box"],[3,"ngClass"],[3,"title"],[1,"confirmation-box"],[1,"confirmation-item"],[1,"account-icon"],[1,"confirmation-text"],[1,"file-icon"],["mat-raised-button","","color","accent",3,"click","disabled"]],template:function(e,i){e&1&&(f(0,"div",1)(1,"div",2),j(2,xH,6,1,"mat-card",3)(3,MH,1,0,"mat-progress-bar",4)(4,IH,16,0,"mat-card",5)(5,TH,29,3,"mat-card",5)(6,PH,42,8,"mat-card",5)(7,FH,35,4,"mat-card",5),m()()),e&2&&(h(2),b("ngIf",i.error()),h(),b("ngIf",i.isLoading()),h(),b("ngIf",i.currentStep()===i.ImportStep.FileSelect),h(),b("ngIf",i.currentStep()===i.ImportStep.Config),h(),b("ngIf",i.currentStep()===i.ImportStep.Preview),h(),b("ngIf",i.currentStep()===i.ImportStep.Confirm))},dependencies:[Mt,Ge,Er,Mn,Lt,fn,dn,un,nr,ri,Yt,Kt,bt,qt,jt,ai,si,Mo,Up,Zt,Qt,pT,vT,gT],styles:[".import-page[_ngcontent-%COMP%]{min-height:100vh;display:flex;flex-direction:column}.container[_ngcontent-%COMP%]{flex:1;padding:1.5rem;max-width:900px;margin:0 auto;width:100%}.error-card[_ngcontent-%COMP%]{background-color:#ffebee;border-left:4px solid #f44336;margin-bottom:1.5rem}.error-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem;color:#c62828}.error-card[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%]{flex-shrink:0;color:#f44336}.step-card[_ngcontent-%COMP%]{box-shadow:0 2px 4px #0000001a;margin-bottom:2rem}.step-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{padding:1.5rem;border-bottom:1px solid #eee;margin-bottom:0}.step-card[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-size:1.25rem;color:#1976d2;display:flex;align-items:center;gap:.75rem;margin:0}.step-card[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1.5rem;width:1.5rem;height:1.5rem}.step-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:1.5rem}.step-description[_ngcontent-%COMP%]{color:#0009;margin-bottom:1.5rem;font-size:.95rem}.step-description[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:#1976d2;font-weight:600}.file-input-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;padding:2rem;border:2px dashed #1976d2;border-radius:8px;background-color:#f5f5f5}.file-input[_ngcontent-%COMP%]{display:none}.full-width[_ngcontent-%COMP%]{width:100%}mat-form-field[_ngcontent-%COMP%]{margin-bottom:1rem}.auto-detect-section[_ngcontent-%COMP%]{margin:1.5rem 0;padding:1rem;background-color:#f5f5f5;border-radius:4px;border-left:4px solid #1976d2}.auto-detect-label[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem;cursor:pointer;margin-bottom:.5rem}.auto-detect-label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:500;color:#212121}.auto-detect-checkbox[_ngcontent-%COMP%]{cursor:pointer;width:1.125rem;height:1.125rem}.auto-detect-hint[_ngcontent-%COMP%]{margin:.5rem 0 0;font-size:.875rem;color:#0009}.summary-box[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1rem;margin-bottom:1.5rem;padding:1rem;background-color:#f5f5f5;border-radius:4px}.summary-item[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.summary-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{color:#0009;font-size:.875rem}.summary-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]{font-weight:600;font-size:1.25rem;color:#1976d2}.summary-item[_ngcontent-%COMP%]   .value.valid[_ngcontent-%COMP%]{color:#4caf50}.summary-item[_ngcontent-%COMP%]   .value.invalid[_ngcontent-%COMP%]{color:#f44336}.warning-box[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem;padding:1rem;margin-bottom:1.5rem;background-color:#fff3cd;border-left:4px solid #ffc107;border-radius:4px;color:#856404}.warning-box[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{flex-shrink:0;color:#ffc107}.confirmation-box[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem;padding:1.5rem;background-color:#f5f5f5;border-left:4px solid #1976d2;border-radius:4px;margin-bottom:1.5rem}.confirmation-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem}.confirmation-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1.5rem;width:1.5rem;height:1.5rem}.confirmation-item[_ngcontent-%COMP%]   mat-icon.account-icon[_ngcontent-%COMP%]{color:#1976d2}.confirmation-item[_ngcontent-%COMP%]   mat-icon.file-icon[_ngcontent-%COMP%]{color:#4caf50}.confirmation-item[_ngcontent-%COMP%]   .confirmation-text[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.25rem}.confirmation-item[_ngcontent-%COMP%]   .confirmation-text[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{font-size:.875rem;color:#0009}.confirmation-item[_ngcontent-%COMP%]   .confirmation-text[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]{font-weight:600;font-size:1rem;color:#212121}.table-wrapper[_ngcontent-%COMP%]{overflow-x:auto;margin-bottom:1.5rem}.preview-table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;background:#fff}.preview-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]{background-color:#f5f5f5;font-weight:600;color:#1976d2}.preview-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding:.75rem 1rem;text-align:left;font-size:.875rem;text-transform:uppercase;letter-spacing:.5px;border-bottom:2px solid #1976d2}.preview-table[_ngcontent-%COMP%]   th.status-col[_ngcontent-%COMP%]{width:60px;text-align:center}.preview-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:.75rem 1rem;border-bottom:1px solid #eee;font-size:.95rem}.preview-table[_ngcontent-%COMP%]   td.status-col[_ngcontent-%COMP%]{text-align:center}.preview-table[_ngcontent-%COMP%]   td.status-col[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1rem;width:1rem;height:1rem}.preview-table[_ngcontent-%COMP%]   td.invalid-cell[_ngcontent-%COMP%]{text-decoration:line-through;opacity:.5;color:#f44336}.preview-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{transition:background-color .2s}.preview-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#f9f9f9}.preview-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.status-valid[_ngcontent-%COMP%]{border-left:4px solid #4caf50}.preview-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.status-invalid[_ngcontent-%COMP%]{border-left:4px solid #f44336}.preview-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.status-duplicate[_ngcontent-%COMP%]{border-left:4px solid #ffc107}.button-group[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:1rem;margin-top:1.5rem;padding-top:1rem;border-top:1px solid #eee}.button-group[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin-right:.5rem}@media(max-width:768px){.container[_ngcontent-%COMP%]{padding:1rem}.step-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{padding:1rem}.step-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:1rem}.file-input-container[_ngcontent-%COMP%]{padding:1rem}.summary-box[_ngcontent-%COMP%]{grid-template-columns:1fr}.confirmation-box[_ngcontent-%COMP%]{padding:1rem}.preview-table[_ngcontent-%COMP%]{font-size:.85rem}.preview-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .preview-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:.5rem}.preview-table[_ngcontent-%COMP%]   th.status-col[_ngcontent-%COMP%]{width:40px}.button-group[_ngcontent-%COMP%]{flex-direction:column-reverse}.button-group[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%}}"]})};var Kp=class t{constructor(n){this.route=n}imported=0;skipped=0;ngOnInit(){this.route.queryParams.subscribe(n=>{this.imported=n.imported||0,this.skipped=n.skipped||0})}static \u0275fac=function(e){return new(e||t)(I(xt))};static \u0275cmp=O({type:t,selectors:[["app-import-done"]],decls:9,vars:2,consts:[[1,"container"],[1,"info"],["routerLink","/",1,"btn"]],template:function(e,i){e&1&&(f(0,"div",0)(1,"h5"),g(2,"Import ist abgeschlossen"),m(),f(3,"div",1),g(4),W(5,"br"),g(6),m(),f(7,"a",2),g(8,"Zur Liste der Buchungen"),m()()),e&2&&(h(4),X(" ",i.imported," Datens\xE4tze importiert"),h(2),X(" ",i.skipped," Datens\xE4tze \xFCbersprungen "))},dependencies:[wn,er],styles:[".container[_ngcontent-%COMP%]{margin-bottom:20px}.info[_ngcontent-%COMP%]{padding:10px;margin:20px 0;color:#000;background-color:#fff;box-shadow:1px 1px 4px #00000080}"]})};var el=class t{STORAGE_KEY="app-theme";darkMode=T(this.getInitialTheme());constructor(){bn(()=>{let n=this.darkMode();this.applyTheme(n),localStorage.setItem(this.STORAGE_KEY,n?"dark":"light")})}getInitialTheme(){let n=localStorage.getItem(this.STORAGE_KEY);return n?n==="dark":!0}applyTheme(n){let e=document.documentElement;n?(e.classList.add("dark-mode"),e.classList.remove("light-mode")):(e.classList.add("light-mode"),e.classList.remove("dark-mode"))}toggleTheme(){this.darkMode.set(!this.darkMode())}static \u0275fac=function(e){return new(e||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})};var BH=["chartContainer"],Yp=class t{title="";data={};series=["Serie 1","Serie 2"];colors=["#4caf50","#f44336"];height=350;currency="";chartContainer;chartData=[];themeService=u(el);ngOnChanges(n){n.data&&(this.processData(),this.drawChart())}ngAfterViewInit(){this.drawChart()}processData(){this.chartData=Object.entries(this.data).map(([n,e])=>({label:n,series:this.series.map((i,r)=>({name:i,value:Array.isArray(e)&&e[r]||0}))}))}drawChart(){if(!this.chartContainer||this.chartData.length===0)return;let n=this.chartContainer.nativeElement,e=n.offsetWidth||800,i=60,r=e-i*2,o=this.height-i*2,s=this.themeService.darkMode(),a=s?"#2c2c2c":"white",l=s?"#ffffff":"#000000",c=s?"#444":"#e0e0e0",d=s?"#999":"#000",p=Math.max(...this.chartData.flatMap(Te=>Te.series.map(Xe=>Xe.value))),_="http://www.w3.org/2000/svg",v=document.createElementNS(_,"svg");v.setAttribute("width",e.toString()),v.setAttribute("height",this.height.toString()),v.setAttribute("class","chart-svg");let y=document.createElementNS(_,"rect");if(y.setAttribute("width",e.toString()),y.setAttribute("height",this.height.toString()),y.setAttribute("fill",a),v.appendChild(y),this.title){let Te=document.createElementNS(_,"text");Te.setAttribute("x",(e/2).toString()),Te.setAttribute("y","25"),Te.setAttribute("text-anchor","middle"),Te.setAttribute("class","chart-title"),Te.setAttribute("fill",l),Te.textContent=this.title,v.appendChild(Te)}let D=5;for(let Te=0;Te<=D;Te++){let Xe=i+o/D*Te,Me=document.createElementNS(_,"line");Me.setAttribute("x1",i.toString()),Me.setAttribute("y1",Xe.toString()),Me.setAttribute("x2",(e-i).toString()),Me.setAttribute("y2",Xe.toString()),Me.setAttribute("stroke",c),Me.setAttribute("class","grid-line"),v.appendChild(Me);let Fe=p*(D-Te)/D,nt=document.createElementNS(_,"text");nt.setAttribute("x",(i-10).toString()),nt.setAttribute("y",(Xe+5).toString()),nt.setAttribute("text-anchor","end"),nt.setAttribute("fill",l),nt.setAttribute("class","axis-label"),nt.textContent=this.formatValue(Fe),v.appendChild(nt)}let M=document.createElementNS(_,"line");M.setAttribute("x1",i.toString()),M.setAttribute("y1",(i+o).toString()),M.setAttribute("x2",(e-i).toString()),M.setAttribute("y2",(i+o).toString()),M.setAttribute("stroke",d),M.setAttribute("class","axis"),v.appendChild(M);let R=document.createElementNS(_,"line");R.setAttribute("x1",i.toString()),R.setAttribute("y1",i.toString()),R.setAttribute("x2",i.toString()),R.setAttribute("y2",(i+o).toString()),R.setAttribute("stroke",d),R.setAttribute("class","axis"),v.appendChild(R);let $=r/this.chartData.length/(this.series.length+1),Ee=$*.5;this.chartData.forEach((Te,Xe)=>{let Me=i+r/this.chartData.length*Xe+Ee;Te.series.forEach((nt,lr)=>{let Ao=nt.value/p*o,ki=Me+lr*$,js=i+o-Ao,Ri=document.createElementNS(_,"rect");if(Ri.setAttribute("x",ki.toString()),Ri.setAttribute("y",js.toString()),Ri.setAttribute("width",$.toString()),Ri.setAttribute("height",Ao.toString()),Ri.setAttribute("fill",this.colors[lr]||"#999"),Ri.setAttribute("class","bar"),v.appendChild(Ri),Ao>20){let Ai=document.createElementNS(_,"text");Ai.setAttribute("x",(ki+$/2).toString()),Ai.setAttribute("y",(js+Ao/2+4).toString()),Ai.setAttribute("text-anchor","middle"),Ai.setAttribute("fill","white"),Ai.setAttribute("class","bar-label"),Ai.textContent=this.formatValue(nt.value),v.appendChild(Ai)}});let Fe=document.createElementNS(_,"text");Fe.setAttribute("x",(Me+$*this.series.length/2).toString()),Fe.setAttribute("y",(i+o+20).toString()),Fe.setAttribute("text-anchor","middle"),Fe.setAttribute("fill",l),Fe.setAttribute("class","axis-label"),Fe.textContent=Te.label,v.appendChild(Fe)});let pe=i+10;this.series.forEach((Te,Xe)=>{let Me=e-150,Fe=document.createElementNS(_,"rect");Fe.setAttribute("x",Me.toString()),Fe.setAttribute("y",pe.toString()),Fe.setAttribute("width","12"),Fe.setAttribute("height","12"),Fe.setAttribute("fill",this.colors[Xe]||"#999"),v.appendChild(Fe);let nt=document.createElementNS(_,"text");nt.setAttribute("x",(Me+18).toString()),nt.setAttribute("y",(pe+10).toString()),nt.setAttribute("fill",l),nt.setAttribute("class","legend-label"),nt.textContent=Te,v.appendChild(nt),pe+=20}),n.innerHTML="",n.appendChild(v)}formatValue(n){let e;return n>=1e6?e=(n/1e6).toFixed(1)+"M":n>=1e3?e=(n/1e3).toFixed(1)+"k":e=n.toFixed(0),this.currency?e+this.currency:e}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=O({type:t,selectors:[["app-column-chart"]],viewQuery:function(e,i){if(e&1&&$e(BH,5),e&2){let r;q(r=K())&&(i.chartContainer=r.first)}},inputs:{title:"title",data:"data",series:"series",colors:"colors",height:"height",currency:"currency"},features:[et],decls:3,vars:0,consts:[["chartContainer",""],[1,"chart-wrapper"],[1,"chart-container"]],template:function(e,i){e&1&&(gt(0,"div",1),vt(1,"div",2,0),Dt())},dependencies:[Ge],styles:[".chart-wrapper[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center;align-items:center;overflow-x:auto;padding:1rem 0}.chart-container[_ngcontent-%COMP%]{width:100%;min-width:600px;display:flex;justify-content:center}.chart-svg[_ngcontent-%COMP%]{font-family:Roboto,Segoe UI,sans-serif}.chart-svg[_ngcontent-%COMP%]   .chart-title[_ngcontent-%COMP%]{font-size:14px;font-weight:600;fill:#1976d2}.chart-svg[_ngcontent-%COMP%]   .axis[_ngcontent-%COMP%]{stroke:#333;stroke-width:2}.chart-svg[_ngcontent-%COMP%]   .axis-label[_ngcontent-%COMP%]{font-size:12px;fill:#666}.chart-svg[_ngcontent-%COMP%]   .grid-line[_ngcontent-%COMP%]{stroke:#e0e0e0;stroke-width:1;stroke-dasharray:5,5}.chart-svg[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]{transition:opacity .2s ease;cursor:pointer}.chart-svg[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]:hover{opacity:.8;filter:brightness(1.1)}.chart-svg[_ngcontent-%COMP%]   .bar-label[_ngcontent-%COMP%]{font-size:11px;font-weight:600;fill:#fff;pointer-events:none}.chart-svg[_ngcontent-%COMP%]   .legend-label[_ngcontent-%COMP%]{font-size:12px;fill:#333}@media(max-width:768px){.chart-container[_ngcontent-%COMP%]{min-width:100%}.chart-svg[_ngcontent-%COMP%]   .chart-title[_ngcontent-%COMP%]{font-size:12px}.chart-svg[_ngcontent-%COMP%]   .axis-label[_ngcontent-%COMP%]{font-size:10px}.chart-svg[_ngcontent-%COMP%]   .bar-label[_ngcontent-%COMP%]{font-size:9px}.chart-svg[_ngcontent-%COMP%]   .legend-label[_ngcontent-%COMP%]{font-size:10px}}"]})};var Qp=class t{constructor(n){this.http=n}apiUrl="/api/reports";getReports(){return this.http.get(this.apiUrl)}static \u0275fac=function(e){return new(e||t)(A(ut))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})};var yT=()=>["Einnahmen","Ausgaben"],bT=()=>["#4caf50","#f44336"];function jH(t,n){t&1&&(f(0,"div",3),W(1,"mat-spinner",4),f(2,"p"),g(3,"Berichte werden geladen..."),m()())}function HH(t,n){if(t&1&&(f(0,"tr")(1,"td",13),g(2),m(),f(3,"td",14),g(4),m(),f(5,"td",15),g(6),m(),f(7,"td",16),g(8),m(),f(9,"td",10),g(10),m(),f(11,"td",16),g(12),m()()),t&2){let e=n.$implicit,i=E(2);h(2),ee(e.key),h(2),ot(" ",i.formatCurrency(e.value[0]/100)," ",i.currency," "),h(2),ot(" ",i.formatCurrency(e.value[1]/100)," ",i.currency," "),h(),b("ngClass",e.value[0]-e.value[1]>=0?"income":"expense"),h(),ot(" ",i.formatCurrency((e.value[0]-e.value[1])/100)," ",i.currency," "),h(2),ot(" ",i.formatCurrency(e.value.saldo/100)," ",i.currency," "),h(),b("ngClass",e.value.saldo+(e.value[0]-e.value[1])>=0?"income":"expense"),h(),ot(" ",i.formatCurrency((e.value.saldo+(e.value[0]-e.value[1]))/100)," ",i.currency," ")}}function zH(t,n){if(t&1&&(f(0,"tr")(1,"td"),g(2),m(),f(3,"td",14),g(4),m(),f(5,"td",15),g(6),m(),f(7,"td",16),g(8),m(),f(9,"td",10),g(10),m(),f(11,"td",16),g(12),m()()),t&2){let e=n.$implicit,i=E(3);h(2),ee(e.account.label),h(2),ot(" ",i.formatCurrency(e.stats[0]/100)," ",i.currency," "),h(2),ot(" ",i.formatCurrency(e.stats[1]/100)," ",i.currency," "),h(),b("ngClass",e.stats[0]-e.stats[1]>=0?"income":"expense"),h(),ot(" ",i.formatCurrency((e.stats[0]-e.stats[1])/100)," ",i.currency," "),h(2),ot(" ",i.formatCurrency(e.stats.saldo/100)," ",i.currency," "),h(),b("ngClass",e.stats.saldo+(e.stats[0]-e.stats[1])>=0?"income":"expense"),h(),ot(" ",i.formatCurrency((e.stats.saldo+(e.stats[0]-e.stats[1]))/100)," ",i.currency," ")}}function UH(t,n){if(t&1&&(f(0,"mat-card",6)(1,"mat-card-header")(2,"mat-card-title"),g(3),m()(),f(4,"mat-card-content")(5,"div",8)(6,"table",9)(7,"thead")(8,"tr")(9,"th"),g(10,"Konto"),m(),f(11,"th",10),g(12,"Einnahmen"),m(),f(13,"th",10),g(14,"Ausgaben"),m(),f(15,"th",10),g(16,"Ergebnis"),m(),f(17,"th",10),g(18,"Start-Saldo"),m(),f(19,"th",10),g(20,"End-Saldo"),m()()(),f(21,"tbody"),j(22,zH,13,13,"tr",11),m()()()()()),t&2){let e=E(2);h(3),X("Konto\xFCbersicht ",e.currentYear),h(19),b("ngForOf",e.yearsAccountStats)}}function $H(t,n){if(t&1&&(f(0,"tr",19)(1,"td"),g(2),m(),f(3,"td",14),g(4),m(),f(5,"td",14),g(6),qi(7,"number"),m()()),t&2){let e=n.$implicit,i=E(3);h(2),ee(e.label),h(2),ot("",i.formatCurrency(e.amount/100)," ",i.currency),h(2),X("",wr(7,4,i.calculatePercentage(e.amount,i.yearStats[0]),"1.1-1")," %")}}function GH(t,n){if(t&1&&(f(0,"mat-card",6)(1,"mat-card-header")(2,"mat-card-title")(3,"mat-icon",17),g(4,"arrow_upward"),m(),g(5),m()(),f(6,"mat-card-content")(7,"div",8)(8,"table",9)(9,"thead")(10,"tr")(11,"th"),g(12,"Bezeichnung"),m(),f(13,"th",10),g(14,"Betrag"),m(),f(15,"th",10),g(16,"% von Gesamt"),m()()(),f(17,"tbody"),j(18,$H,8,7,"tr",18),m()()()()()),t&2){let e=E(2);h(5),X(" Top Einnahmen ",e.currentYear," "),h(13),b("ngForOf",e.tops[0])}}function WH(t,n){if(t&1&&(f(0,"tr",22)(1,"td"),g(2),m(),f(3,"td",15),g(4),m(),f(5,"td",15),g(6),qi(7,"number"),m()()),t&2){let e=n.$implicit,i=E(3);h(2),ee(e.label),h(2),ot("",i.formatCurrency(e.amount/100)," ",i.currency),h(2),X("",wr(7,4,i.calculatePercentage(e.amount,i.yearStats[1]),"1.1-1")," %")}}function qH(t,n){if(t&1&&(f(0,"mat-card",6)(1,"mat-card-header")(2,"mat-card-title")(3,"mat-icon",20),g(4,"arrow_downward"),m(),g(5),m()(),f(6,"mat-card-content")(7,"div",8)(8,"table",9)(9,"thead")(10,"tr")(11,"th"),g(12,"Bezeichnung"),m(),f(13,"th",10),g(14,"Betrag"),m(),f(15,"th",10),g(16,"% von Gesamt"),m()()(),f(17,"tbody"),j(18,WH,8,7,"tr",21),m()()()()()),t&2){let e=E(2);h(5),X(" Top Ausgaben ",e.currentYear," "),h(13),b("ngForOf",e.tops[1])}}function KH(t,n){if(t&1&&(f(0,"div",24)(1,"mat-icon"),g(2,"warning"),m(),f(3,"span"),g(4),m()()),t&2){let e=E(3);h(4),X("Es existieren ",e.categoriesMissing," Buchungen ohne Kategoriezuordnung")}}function YH(t,n){if(t&1&&(f(0,"tr",19)(1,"td"),g(2),m(),f(3,"td",14),g(4),m(),f(5,"td",14),g(6),qi(7,"number"),m()()),t&2){let e=n.$implicit,i=E(3);h(2),ee(e.label),h(2),ot("",i.formatCurrency(e.amount/100)," ",i.currency),h(2),X("",wr(7,4,i.calculatePercentage(e.amount,i.yearStats[0]),"1.1-1")," %")}}function QH(t,n){if(t&1&&(f(0,"mat-card",6)(1,"mat-card-header")(2,"mat-card-title")(3,"mat-icon",17),g(4,"label"),m(),g(5),m()(),f(6,"mat-card-content"),j(7,KH,5,1,"div",23),f(8,"div",8)(9,"table",9)(10,"thead")(11,"tr")(12,"th"),g(13,"Kategorie"),m(),f(14,"th",10),g(15,"Betrag"),m(),f(16,"th",10),g(17,"% von Gesamt"),m()()(),f(18,"tbody"),j(19,YH,8,7,"tr",18),m()()()()()),t&2){let e=E(2);h(5),X(" Alle Einnahmen ",e.currentYear," nach Kategorie "),h(2),b("ngIf",e.categoriesMissing),h(12),b("ngForOf",e.categories[0])}}function ZH(t,n){if(t&1&&(f(0,"div",24)(1,"mat-icon"),g(2,"warning"),m(),f(3,"span"),g(4),m()()),t&2){let e=E(3);h(4),X("Es existieren ",e.categoriesMissing," Buchungen ohne Kategoriezuordnung")}}function XH(t,n){if(t&1&&(f(0,"tr",22)(1,"td"),g(2),m(),f(3,"td",15),g(4),m(),f(5,"td",15),g(6),qi(7,"number"),m()()),t&2){let e=n.$implicit,i=E(3);h(2),ee(e.label),h(2),ot("",i.formatCurrency(e.amount/100)," ",i.currency),h(2),X("",wr(7,4,i.calculatePercentage(e.amount,i.yearStats[1]),"1.1-1")," %")}}function JH(t,n){if(t&1&&(f(0,"mat-card",6)(1,"mat-card-header")(2,"mat-card-title")(3,"mat-icon",20),g(4,"label"),m(),g(5),m()(),f(6,"mat-card-content"),j(7,ZH,5,1,"div",23),f(8,"div",8)(9,"table",9)(10,"thead")(11,"tr")(12,"th"),g(13,"Kategorie"),m(),f(14,"th",10),g(15,"Betrag"),m(),f(16,"th",10),g(17,"% von Gesamt"),m()()(),f(18,"tbody"),j(19,XH,8,7,"tr",21),m()()()()()),t&2){let e=E(2);h(5),X(" Alle Ausgaben ",e.currentYear," nach Kategorie "),h(2),b("ngIf",e.categoriesMissing),h(12),b("ngForOf",e.categories[1])}}function ez(t,n){if(t&1&&(f(0,"div",5)(1,"mat-card",6)(2,"mat-card-header")(3,"mat-card-title"),g(4,"Jahres\xFCbersicht Ein-/Ausgaben"),m()(),f(5,"mat-card-content"),W(6,"app-column-chart",7),m()(),f(7,"mat-card",6)(8,"mat-card-header")(9,"mat-card-title"),g(10,"Jahresstatistik"),m()(),f(11,"mat-card-content")(12,"div",8)(13,"table",9)(14,"thead")(15,"tr")(16,"th"),g(17,"Jahr"),m(),f(18,"th",10),g(19,"Einnahmen"),m(),f(20,"th",10),g(21,"Ausgaben"),m(),f(22,"th",10),g(23,"Ergebnis"),m(),f(24,"th",10),g(25,"Start-Saldo"),m(),f(26,"th",10),g(27,"End-Saldo"),m()()(),f(28,"tbody"),j(29,HH,13,13,"tr",11),qi(30,"keyvalue"),m()()()()(),j(31,UH,23,2,"mat-card",12),f(32,"mat-card",6)(33,"mat-card-header")(34,"mat-card-title"),g(35),m()(),f(36,"mat-card-content"),W(37,"app-column-chart",7),m()(),j(38,GH,19,2,"mat-card",12)(39,qH,19,2,"mat-card",12)(40,QH,20,3,"mat-card",12)(41,JH,20,3,"mat-card",12),m()),t&2){let e=E();h(6),b("data",e.yearlyChartData)("series",Wi(19,yT))("colors",Wi(20,bT))("height",350)("currency",e.currency),h(23),b("ngForOf",O_(30,17,e.yearsStats)),h(2),b("ngIf",e.yearsAccountStats.length>0),h(4),X("Monats\xFCbersicht ",e.currentYear),h(2),b("data",e.monthlyChartData)("series",Wi(21,yT))("colors",Wi(22,bT))("height",350)("currency",e.currency),h(),b("ngIf",e.tops[0]&&e.tops[0].length>0),h(),b("ngIf",e.tops[1]&&e.tops[1].length>0),h(),b("ngIf",e.categories[0]&&e.categories[0].length>0),h(),b("ngIf",e.categories[1]&&e.categories[1].length>0)}}var Zp=class t{constructor(n,e,i,r){this.reportService=n;this.settingsService=e;this.filterService=i;this.cdr=r;bn(()=>{this.filterService.filterYear(),this.filterService.filterMonth(),this.loadReports()})}currentYear=new Date().getFullYear();currency="\u20AC";yearsStats=[];yearsAccountStats=[];monthsStats=[];tops=[[],[]];categories=[[],[]];categoriesMissing=0;yearStats=[];isLoading=T(!0);displayedYearColumns=["year","income","expenses","result","startBalance","endBalance"];displayedAccountColumns=["account","income","expenses","result","startBalance","endBalance"];displayedTopColumns=["label","amount","percentage"];displayedCategoryColumns=["category","amount","percentage"];yearlyChartData={};monthlyChartData={};ngOnInit(){this.loadSettings()}loadSettings(){this.settingsService.getSettings().subscribe({next:n=>{this.currency=n.currency||"\u20AC"}})}loadReports(){this.isLoading.set(!0),this.reportService.getReports().subscribe({next:n=>{this.yearsStats=n.years,this.yearsAccountStats=n.yearsAccount,this.monthsStats=n.months,this.tops=n.tops,this.categories=n.categories,this.categoriesMissing=n.categoriesMissing,this.yearStats=n.yearStats,this.isLoading.set(!1),this.processChartData(),this.cdr.markForCheck()},error:()=>{this.isLoading.set(!1),this.cdr.markForCheck()}})}processChartData(){this.yearlyChartData={},Object.entries(this.yearsStats).forEach(([n,e])=>{this.yearlyChartData[n]=[e[0]?e[0]/100:0,e[1]?e[1]/100:0]}),this.monthlyChartData={},this.monthsStats.forEach((n,e)=>{let i=n.label||`Monat ${e+1}`;this.monthlyChartData[i]=[n[0]?n[0]/100:0,n[1]?n[1]/100:0]})}formatCurrency(n){return new Intl.NumberFormat("de-DE",{minimumFractionDigits:2,maximumFractionDigits:2}).format(n)}calculatePercentage(n,e){return e===0?0:n/e*100}getYearKey(n){return Object.keys(this.yearsStats)[n]||""}getYearValue(n){return Object.values(this.yearsStats)[n]||{}}static \u0275fac=function(e){return new(e||t)(I(Qp),I(pn),I(ko),I(De))};static \u0275cmp=O({type:t,selectors:[["app-reports"]],decls:3,vars:2,consts:[[1,"reports-page"],["class","loading-container",4,"ngIf"],["class","container",4,"ngIf"],[1,"loading-container"],["diameter","50"],[1,"container"],[1,"report-card"],[3,"data","series","colors","height","currency"],[1,"table-wrapper"],[1,"data-table"],[1,"amount-col"],[4,"ngFor","ngForOf"],["class","report-card",4,"ngIf"],[1,"year-col"],[1,"amount-col","income"],[1,"amount-col","expense"],[1,"amount-col",3,"ngClass"],[1,"income-icon"],["class","income-row",4,"ngFor","ngForOf"],[1,"income-row"],[1,"expense-icon"],["class","expense-row",4,"ngFor","ngForOf"],[1,"expense-row"],["class","warning-box",4,"ngIf"],[1,"warning-box"]],template:function(e,i){e&1&&(f(0,"div",0),j(1,jH,4,0,"div",1)(2,ez,42,23,"div",2),m()),e&2&&(h(),b("ngIf",i.isLoading()),h(),b("ngIf",!i.isLoading()))},dependencies:[Ge,Er,Mn,Lt,Yp,fn,dn,un,nr,ri,Up,Zt,Qt,Pp,Np,mc,ty],styles:[".reports-page[_ngcontent-%COMP%]{min-height:100vh;display:flex;flex-direction:column}.container[_ngcontent-%COMP%]{flex:1;padding:1.5rem;max-width:1400px;margin:0 auto;width:100%}@media(max-width:768px){.container[_ngcontent-%COMP%]{padding:1rem}}@media(max-width:480px){.container[_ngcontent-%COMP%]{padding:.75rem}}.loading-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:80vh;gap:1rem}.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#0000008a;font-size:1.1rem}.report-card[_ngcontent-%COMP%]{margin-bottom:2rem;box-shadow:0 2px 4px #0000001a;border-radius:8px}.report-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{padding:1.5rem;border-bottom:1px solid #eee;margin-bottom:0;display:flex;align-items:center}.report-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-size:1.25rem;margin:0;color:#1976d2;display:flex;align-items:center;gap:.75rem}.report-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1.5rem;width:1.5rem;height:1.5rem}.report-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon.income-icon[_ngcontent-%COMP%]{color:#4caf50}.report-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon.expense-icon[_ngcontent-%COMP%]{color:#f44336}.report-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:1.5rem}@media(max-width:768px){.report-card[_ngcontent-%COMP%]{margin-bottom:1.5rem}.report-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{padding:1rem}.report-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-size:1.1rem}.report-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1.2rem;width:1.2rem;height:1.2rem}.report-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:1rem}}@media(max-width:480px){.report-card[_ngcontent-%COMP%]{margin-bottom:1rem;border-radius:4px}.report-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{padding:.75rem 1rem}.report-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:.75rem}}.chart-container[_ngcontent-%COMP%]{width:100%;min-height:350px;display:flex;justify-content:center;align-items:center;overflow-x:auto}@media(max-width:900px){.chart-container[_ngcontent-%COMP%]{min-height:300px}}@media(max-width:600px){.chart-container[_ngcontent-%COMP%]{min-height:250px}}@media(max-width:480px){.chart-container[_ngcontent-%COMP%]{min-height:200px}}.table-wrapper[_ngcontent-%COMP%]{overflow-x:auto;-webkit-overflow-scrolling:touch}@media(max-width:600px){.table-wrapper[_ngcontent-%COMP%]{margin:0 -1rem;padding:0 1rem}}@media(max-width:480px){.table-wrapper[_ngcontent-%COMP%]{margin:0 -.75rem;padding:0 .75rem}}.data-table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;background:#fff}.data-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]{background-color:#f5f5f5;font-weight:600;color:#1976d2}.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding:.75rem 1rem;text-align:left;font-size:.875rem;text-transform:uppercase;letter-spacing:.5px;border-bottom:2px solid #1976d2;white-space:nowrap}.data-table[_ngcontent-%COMP%]   th.amount-col[_ngcontent-%COMP%]{text-align:right}@media(max-width:600px){.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding:.5rem .75rem;font-size:.75rem}}.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:.75rem 1rem;border-bottom:1px solid #eee;font-size:.95rem}.data-table[_ngcontent-%COMP%]   td.year-col[_ngcontent-%COMP%]{font-weight:600;color:#1976d2}.data-table[_ngcontent-%COMP%]   td.amount-col[_ngcontent-%COMP%]{text-align:right;font-weight:500}.data-table[_ngcontent-%COMP%]   td.amount-col.income[_ngcontent-%COMP%]{color:#4caf50}.data-table[_ngcontent-%COMP%]   td.amount-col.expense[_ngcontent-%COMP%]{color:#f44336}@media(max-width:600px){.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:.5rem .75rem;font-size:.85rem}}.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{transition:background-color .2s}.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#f9f9f9}.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.income-row[_ngcontent-%COMP%]{border-left:4px solid #4caf50}.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.expense-row[_ngcontent-%COMP%]{border-left:4px solid #f44336}.warning-box[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem;padding:1rem;margin-bottom:1.5rem;background-color:#fff3cd;border-left:4px solid #ffc107;border-radius:4px;color:#856404}.warning-box[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{flex-shrink:0;color:#ffc107}.warning-box[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{flex:1}.income[_ngcontent-%COMP%]{color:#4caf50;font-weight:600}.expense[_ngcontent-%COMP%]{color:#f44336;font-weight:600}@media print{.reports-page[_ngcontent-%COMP%]   app-header[_ngcontent-%COMP%]{display:none}.reports-page[_ngcontent-%COMP%]   .report-card[_ngcontent-%COMP%]{page-break-inside:avoid;box-shadow:none;margin-bottom:1rem}.reports-page[_ngcontent-%COMP%]   .chart-container[_ngcontent-%COMP%]{max-height:300px}.reports-page[_ngcontent-%COMP%]   .table-wrapper[_ngcontent-%COMP%]{margin-bottom:1rem}}@media(max-width:768px){.container[_ngcontent-%COMP%]{padding:1rem}.report-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{padding:1rem}.report-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:1rem}.data-table[_ngcontent-%COMP%]{font-size:.85rem}.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:.5rem}.chart-container[_ngcontent-%COMP%]{min-height:280px}}"]})};var tz=["switch"],nz=["*"];function iz(t,n){t&1&&(f(0,"span",11),vr(),f(1,"svg",13),W(2,"path",14),m(),f(3,"svg",15),W(4,"path",16),m()())}var rz=new w("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),Xp=class{source;checked;constructor(n,e){this.source=n,this.checked=e}},Qb=(()=>{class t{_elementRef=u(z);_focusMonitor=u(qn);_changeDetectorRef=u(De);defaults=u(rz);_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(e){return new Xp(this,e)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=tt();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new Z;toggleChange=new Z;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){u(ft).load(ci);let e=u(new Sn("tabindex"),{optional:!0}),i=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=i.color||"accent",this.id=this._uniqueId=u(Ze).getId("mat-mdc-slide-toggle-"),this.hideIcon=i.hideIcon??!1,this.disabledInteractive=i.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e==="keyboard"||e==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(e){e.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(e){this.checked=!!e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorOnChange=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new Xp(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-slide-toggle"]],viewQuery:function(i,r){if(i&1&&$e(tz,5),i&2){let o;q(o=K())&&(r._switchElement=o.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(i,r){i&2&&(Vn("id",r.id),ae("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),_t(r.color?"mat-"+r.color:""),P("mat-mdc-slide-toggle-focused",r._focused)("mat-mdc-slide-toggle-checked",r.checked)("_mat-animation-noopable",r._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",H],color:"color",disabled:[2,"disabled","disabled",H],disableRipple:[2,"disableRipple","disableRipple",H],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:St(e)],checked:[2,"checked","checked",H],hideIcon:[2,"hideIcon","hideIcon",H],disabledInteractive:[2,"disabledInteractive","disabledInteractive",H]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[ze([{provide:Tr,useExisting:Ut(()=>t),multi:!0},{provide:La,useExisting:t,multi:!0}]),et],ngContentSelectors:nz,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(i,r){if(i&1&&(Ie(),f(0,"div",1)(1,"button",2,0),k("click",function(){return r._handleClick()}),W(3,"div",3)(4,"span",4),f(5,"span",5)(6,"span",6)(7,"span",7),W(8,"span",8),m(),f(9,"span",9),W(10,"span",10),m(),he(11,iz,5,0,"span",11),m()()(),f(12,"label",12),k("click",function(s){return s.stopPropagation()}),re(13),m()()),i&2){let o=at(2);b("labelPosition",r.labelPosition),h(),P("mdc-switch--selected",r.checked)("mdc-switch--unselected",!r.checked)("mdc-switch--checked",r.checked)("mdc-switch--disabled",r.disabled)("mat-mdc-slide-toggle-disabled-interactive",r.disabledInteractive),b("tabIndex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex)("disabled",r.disabled&&!r.disabledInteractive),ae("id",r.buttonId)("name",r.name)("aria-label",r.ariaLabel)("aria-labelledby",r._getAriaLabelledBy())("aria-describedby",r.ariaDescribedby)("aria-required",r.required||null)("aria-checked",r.checked)("aria-disabled",r.disabled&&r.disabledInteractive?"true":null),h(9),b("matRippleTrigger",o)("matRippleDisabled",r.disableRipple||r.disabled)("matRippleCentered",!0),h(),ge(r.hideIcon?-1:11),h(),b("for",r.buttonId),ae("id",r._labelId)}},dependencies:[ir,Fp],styles:[`.mdc-switch {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  position: relative;
  width: var(--mat-slide-toggle-track-width, 52px);
}
.mdc-switch.mdc-switch--disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-switch.mat-mdc-slide-toggle-disabled-interactive {
  pointer-events: auto;
}

.mdc-switch__track {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: var(--mat-slide-toggle-track-height, 32px);
  border-radius: var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--mat-slide-toggle-disabled-track-opacity, 0.12);
}
.mdc-switch__track::before, .mdc-switch__track::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  border-width: var(--mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface));
}

.mdc-switch__handle-track {
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  right: auto;
  transform: translateX(0);
  width: calc(100% - var(--mat-slide-toggle-handle-width));
}
[dir=rtl] .mdc-switch__handle-track {
  left: auto;
  right: 0;
}
.mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(-100%);
}

.mdc-switch__handle {
  display: flex;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: auto;
  transition: width 75ms cubic-bezier(0.4, 0, 0.2, 1), height 75ms cubic-bezier(0.4, 0, 0.2, 1), margin 75ms cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--mat-slide-toggle-handle-width);
  height: var(--mat-slide-toggle-handle-height);
  border-radius: var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--mat-slide-toggle-selected-handle-size, 24px);
  height: var(--mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
}
.mdc-switch__handle::before, .mdc-switch__handle::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1), border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
@media (forced-colors: active) {
  .mdc-switch__handle::before, .mdc-switch__handle::after {
    border-color: currentColor;
  }
}
.mdc-switch--selected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary));
}
.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface));
}
.mdc-switch--unselected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline));
}
.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--mat-slide-toggle-handle-surface-color);
}

.mdc-switch__shadow {
  border-radius: inherit;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.mdc-switch:enabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--mat-slide-toggle-state-layer-size, 40px);
  height: var(--mat-slide-toggle-state-layer-size, 40px);
}
.mdc-switch__ripple::after {
  content: "";
  opacity: 0;
}
.mdc-switch--disabled .mdc-switch__ripple::after {
  display: none;
}
.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after {
  display: block;
}
.mdc-switch:hover .mdc-switch__ripple::after {
  transition: 75ms opacity cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--selected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}

.mdc-switch__icons {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  transform: translateZ(0);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
}

.mdc-switch__icon {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1);
}
.mdc-switch--unselected .mdc-switch__icon {
  width: var(--mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--mat-slide-toggle-selected-icon-size, 16px);
  height: var(--mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface));
}

.mdc-switch--selected .mdc-switch__icon--on,
.mdc-switch--unselected .mdc-switch__icon--off {
  opacity: 1;
  transition: opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1);
}

.mat-mdc-slide-toggle {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,
.mat-mdc-slide-toggle .mdc-switch__ripple::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),
.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty) {
  transform: translateZ(0);
}
.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-slide-toggle .mat-internal-form-field {
  color: var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-slide-toggle .mat-ripple-element {
  opacity: 0.12;
}
.mat-mdc-slide-toggle .mat-focus-indicator::before {
  border-radius: 50%;
}
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after {
  transition: none;
}
.mat-mdc-slide-toggle .mdc-switch:enabled + .mdc-label {
  cursor: pointer;
}
.mat-mdc-slide-toggle .mdc-switch--disabled + label {
  color: var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2,changeDetection:0})}return t})(),CT=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[Qb,me]})}return t})();function sz(t,n){if(t&1&&(f(0,"div",13),g(1),m()),t&2){let e=E();h(),ee(e.successMessage)}}function az(t,n){if(t&1&&(f(0,"div",14),g(1),m()),t&2){let e=E();h(),ee(e.error)}}function lz(t,n){if(t&1){let e=Ke();f(0,"div",15)(1,"mat-form-field",8)(2,"mat-label"),g(3,"Nutzername"),m(),f(4,"input",16),Ft("ngModelChange",function(r){oe(e);let o=E();return Wt(o.readOnlyUsername,r)||(o.readOnlyUsername=r),se(r)}),m()(),f(5,"mat-form-field",8)(6,"mat-label"),g(7,"Passwort"),m(),f(8,"input",17),Ft("ngModelChange",function(r){oe(e);let o=E();return Wt(o.readOnlyPassword,r)||(o.readOnlyPassword=r),se(r)}),m()()()}if(t&2){let e=E();h(4),Pt("ngModel",e.readOnlyUsername),h(4),Pt("ngModel",e.readOnlyPassword)}}var Jp=class t{constructor(n,e,i){this.settingsService=n;this.http=e;this.cdr=i}stats=null;currency="\u20AC";readOnlyEnabled=!1;readOnlyUsername="";readOnlyPassword="";error=null;successMessage=null;isDownloading=!1;ngOnInit(){this.loadSettings()}loadSettings(){this.settingsService.getSettings().subscribe({next:n=>{this.stats=n.stats,this.currency=n.settings.currency||"\u20AC";let e=n.settings.readOnlyEnabled;this.readOnlyEnabled=e===!0||e==="true"||e==="1",this.readOnlyUsername=n.settings.readOnlyUsername||"",this.cdr.markForCheck()}})}downloadBackup(){this.isDownloading=!0,this.error=null,this.http.get("/api/backup",{responseType:"blob"}).subscribe({next:n=>{let e=window.URL.createObjectURL(n),i=document.createElement("a");i.href=e,i.download=`backup-${new Date().toISOString().split("T")[0]}.zip`,document.body.appendChild(i),i.click(),document.body.removeChild(i),window.URL.revokeObjectURL(e),this.isDownloading=!1},error:n=>{console.error("Backup download failed:",n),this.error="Fehler beim Herunterladen des Backups",this.isDownloading=!1}})}onSubmit(){this.error=null,this.successMessage=null;let n={currency:this.currency,readOnlyEnabled:this.readOnlyEnabled,readOnlyUsername:this.readOnlyUsername,readOnlyPassword:this.readOnlyPassword};this.settingsService.updateSettings(n).subscribe({next:()=>{this.successMessage="Einstellungen gespeichert",setTimeout(()=>{this.successMessage=null},3e3)},error:e=>{this.error="Fehler beim Speichern der Einstellungen",console.error("Settings save error:",e)}})}toggleReadOnlyUser(){}static \u0275fac=function(e){return new(e||t)(I(pn),I(ut),I(De))};static \u0275cmp=O({type:t,selectors:[["app-settings"]],decls:39,vars:17,consts:[["settingsForm","ngForm"],[1,"container"],[1,"info-panel"],["mat-stroked-button","","color","primary",3,"click","disabled"],[1,"stats-card"],["class","success-message",4,"ngIf"],["class","error-message",4,"ngIf"],[1,"settings-form",3,"ngSubmit"],[1,"full-width"],["matInput","","type","text","name","currency",3,"ngModelChange","ngModel"],["name","readOnlyEnabled",3,"ngModelChange","change","ngModel"],["id","readonly-user",4,"ngIf"],["mat-raised-button","","color","accent","type","submit"],[1,"success-message"],[1,"error-message"],["id","readonly-user"],["matInput","","type","text","name","readOnlyUsername",3,"ngModelChange","ngModel"],["matInput","","type","password","name","readOnlyPassword","autocomplete","off",3,"ngModelChange","ngModel"]],template:function(e,i){if(e&1){let r=Ke();f(0,"div",1)(1,"div",2)(2,"h5"),g(3,"Export/Backup"),m(),f(4,"button",3),k("click",function(){return i.downloadBackup()}),f(5,"mat-icon"),g(6,"cloud_download"),m(),g(7),m()(),f(8,"mat-card",4)(9,"mat-card-title"),g(10,"System-Statistiken"),m(),f(11,"mat-card-content")(12,"div"),g(13),m(),f(14,"div"),g(15),m(),f(16,"div"),g(17),qi(18,"number"),m(),f(19,"div"),g(20),qi(21,"number"),m()()(),j(22,sz,2,1,"div",5)(23,az,2,1,"div",6),f(24,"form",7,0),k("ngSubmit",function(){return i.onSubmit()}),f(26,"h4"),g(27,"Voreinstellungen"),m(),f(28,"mat-form-field",8)(29,"mat-label"),g(30,"W\xE4hrungsformat"),m(),f(31,"input",9),Ft("ngModelChange",function(s){return oe(r),Wt(i.currency,s)||(i.currency=s),se(s)}),m()(),f(32,"h4"),g(33,"Lese-Zugang"),m(),f(34,"mat-slide-toggle",10),Ft("ngModelChange",function(s){return oe(r),Wt(i.readOnlyEnabled,s)||(i.readOnlyEnabled=s),se(s)}),k("change",function(){return i.toggleReadOnlyUser()}),g(35," Lesezugang aktivieren "),m(),j(36,lz,9,2,"div",11),f(37,"button",12),g(38,"Speichern"),m()()()}e&2&&(h(4),b("disabled",i.isDownloading),h(3),X(" ",i.isDownloading?"Wird heruntergeladen...":"Backup herunterladen"," "),h(6),X("Gesamtzahl Buchungen: ",i.stats==null?null:i.stats.bookings),h(2),X("Gesamtzahl Dokumente: ",i.stats==null?null:i.stats.documents),h(2),X("Gesamtgr\xF6\xDFe Dokumente: ",wr(18,11,(i.stats==null?null:i.stats.documentsSize)/1024/1024,"1.2-2")," MB"),h(3),X("Gesamtgr\xF6\xDFe Datenbank: ",wr(21,14,(i.stats==null?null:i.stats.databaseSize)/1024/1024,"1.2-2")," MB"),h(2),b("ngIf",i.successMessage),h(),b("ngIf",i.error),h(8),Pt("ngModel",i.currency),h(3),Pt("ngModel",i.readOnlyEnabled),h(2),b("ngIf",i.readOnlyEnabled))},dependencies:[Mt,kn,ni,ii,Tn,Gn,Vt,Ge,Lt,wn,fn,dn,un,ri,Yt,Kt,Zt,Qt,bt,qt,jt,ai,si,CT,Qb,mc],styles:[".container[_ngcontent-%COMP%]{margin-bottom:1.5rem}.info-panel[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1rem}.stats-card[_ngcontent-%COMP%]{margin-bottom:1.5rem}.settings-form[_ngcontent-%COMP%]{display:grid;gap:1rem}.full-width[_ngcontent-%COMP%]{width:100%}.success-message[_ngcontent-%COMP%]{padding:.75rem 1rem;margin-bottom:1rem;background-color:#e8f5e9;border-left:4px solid #4caf50;color:#2e7d32;border-radius:4px}.error-message[_ngcontent-%COMP%]{padding:.75rem 1rem;margin-bottom:1rem;background-color:#ffebee;border-left:4px solid #f44336;color:#c62828;border-radius:4px}"]})};var wT=()=>{let t=u(di),n=u(Ae);return t.isAuthenticated()?!0:(n.navigate(["/login"]),!1)};var DT=[{path:"",canActivate:[wT],children:[{path:"",component:Tp},{path:"categories",component:Rp},{path:"add",component:hd},{path:"edit/:id",component:hd},{path:"delete/:id",component:jp},{path:"edit-category/:id",component:Hp},{path:"delete-category/:id",component:zp},{path:"import",component:qp},{path:"import-done",component:Kp},{path:"reports",component:Zp},{path:"settings",component:Jp}]},{path:"login",component:fp},{path:"**",redirectTo:""}];var Se=(function(t){return t[t.State=0]="State",t[t.Transition=1]="Transition",t[t.Sequence=2]="Sequence",t[t.Group=3]="Group",t[t.Animate=4]="Animate",t[t.Keyframes=5]="Keyframes",t[t.Style=6]="Style",t[t.Trigger=7]="Trigger",t[t.Reference=8]="Reference",t[t.AnimateChild=9]="AnimateChild",t[t.AnimateRef=10]="AnimateRef",t[t.Query=11]="Query",t[t.Stagger=12]="Stagger",t})(Se||{}),Mi="*";function ET(t,n=null){return{type:Se.Sequence,steps:t,options:n}}function Zb(t){return{type:Se.Style,styles:t,offset:null}}var Fr=class{_onDoneFns=[];_onStartFns=[];_onDestroyFns=[];_originalOnDoneFns=[];_originalOnStartFns=[];_started=!1;_destroyed=!1;_finished=!1;_position=0;parentPlayer=null;totalTime;constructor(n=0,e=0){this.totalTime=n+e}_onFinish(){this._finished||(this._finished=!0,this._onDoneFns.forEach(n=>n()),this._onDoneFns=[])}onStart(n){this._originalOnStartFns.push(n),this._onStartFns.push(n)}onDone(n){this._originalOnDoneFns.push(n),this._onDoneFns.push(n)}onDestroy(n){this._onDestroyFns.push(n)}hasStarted(){return this._started}init(){}play(){this.hasStarted()||(this._onStart(),this.triggerMicrotask()),this._started=!0}triggerMicrotask(){queueMicrotask(()=>this._onFinish())}_onStart(){this._onStartFns.forEach(n=>n()),this._onStartFns=[]}pause(){}restart(){}finish(){this._onFinish()}destroy(){this._destroyed||(this._destroyed=!0,this.hasStarted()||this._onStart(),this.finish(),this._onDestroyFns.forEach(n=>n()),this._onDestroyFns=[])}reset(){this._started=!1,this._finished=!1,this._onStartFns=this._originalOnStartFns,this._onDoneFns=this._originalOnDoneFns}setPosition(n){this._position=this.totalTime?n*this.totalTime:1}getPosition(){return this.totalTime?this._position/this.totalTime:1}triggerCallback(n){let e=n=="start"?this._onStartFns:this._onDoneFns;e.forEach(i=>i()),e.length=0}},tl=class{_onDoneFns=[];_onStartFns=[];_finished=!1;_started=!1;_destroyed=!1;_onDestroyFns=[];parentPlayer=null;totalTime=0;players;constructor(n){this.players=n;let e=0,i=0,r=0,o=this.players.length;o==0?queueMicrotask(()=>this._onFinish()):this.players.forEach(s=>{s.onDone(()=>{++e==o&&this._onFinish()}),s.onDestroy(()=>{++i==o&&this._onDestroy()}),s.onStart(()=>{++r==o&&this._onStart()})}),this.totalTime=this.players.reduce((s,a)=>Math.max(s,a.totalTime),0)}_onFinish(){this._finished||(this._finished=!0,this._onDoneFns.forEach(n=>n()),this._onDoneFns=[])}init(){this.players.forEach(n=>n.init())}onStart(n){this._onStartFns.push(n)}_onStart(){this.hasStarted()||(this._started=!0,this._onStartFns.forEach(n=>n()),this._onStartFns=[])}onDone(n){this._onDoneFns.push(n)}onDestroy(n){this._onDestroyFns.push(n)}hasStarted(){return this._started}play(){this.parentPlayer||this.init(),this._onStart(),this.players.forEach(n=>n.play())}pause(){this.players.forEach(n=>n.pause())}restart(){this.players.forEach(n=>n.restart())}finish(){this._onFinish(),this.players.forEach(n=>n.finish())}destroy(){this._onDestroy()}_onDestroy(){this._destroyed||(this._destroyed=!0,this._onFinish(),this.players.forEach(n=>n.destroy()),this._onDestroyFns.forEach(n=>n()),this._onDestroyFns=[])}reset(){this.players.forEach(n=>n.reset()),this._destroyed=!1,this._finished=!1,this._started=!1}setPosition(n){let e=n*this.totalTime;this.players.forEach(i=>{let r=i.totalTime?Math.min(1,e/i.totalTime):1;i.setPosition(r)})}getPosition(){let n=this.players.reduce((e,i)=>e===null||i.totalTime>e.totalTime?i:e,null);return n!=null?n.getPosition():0}beforeDestroy(){this.players.forEach(n=>{n.beforeDestroy&&n.beforeDestroy()})}triggerCallback(n){let e=n=="start"?this._onStartFns:this._onDoneFns;e.forEach(i=>i()),e.length=0}},gd="!";function ST(t){return new x(3e3,!1)}function cz(){return new x(3100,!1)}function dz(){return new x(3101,!1)}function uz(t){return new x(3001,!1)}function fz(t){return new x(3003,!1)}function mz(t){return new x(3004,!1)}function MT(t,n){return new x(3005,!1)}function IT(){return new x(3006,!1)}function TT(){return new x(3007,!1)}function kT(t,n){return new x(3008,!1)}function RT(t){return new x(3002,!1)}function AT(t,n,e,i,r){return new x(3010,!1)}function OT(){return new x(3011,!1)}function NT(){return new x(3012,!1)}function PT(){return new x(3200,!1)}function FT(){return new x(3202,!1)}function LT(){return new x(3013,!1)}function BT(t){return new x(3014,!1)}function VT(t){return new x(3015,!1)}function jT(t){return new x(3016,!1)}function HT(t,n){return new x(3404,!1)}function pz(t){return new x(3502,!1)}function zT(t){return new x(3503,!1)}function UT(){return new x(3300,!1)}function $T(t){return new x(3504,!1)}function GT(t){return new x(3301,!1)}function WT(t,n){return new x(3302,!1)}function qT(t){return new x(3303,!1)}function KT(t,n){return new x(3400,!1)}function YT(t){return new x(3401,!1)}function QT(t){return new x(3402,!1)}function ZT(t,n){return new x(3505,!1)}function Lr(t){switch(t.length){case 0:return new Fr;case 1:return t[0];default:return new tl(t)}}function t0(t,n,e=new Map,i=new Map){let r=[],o=[],s=-1,a=null;if(n.forEach(l=>{let c=l.get("offset"),d=c==s,p=d&&a||new Map;l.forEach((_,v)=>{let y=v,D=_;if(v!=="offset")switch(y=t.normalizePropertyName(y,r),D){case gd:D=e.get(v);break;case Mi:D=i.get(v);break;default:D=t.normalizeStyleValue(v,y,D,r);break}p.set(y,D)}),d||o.push(p),a=p,s=c}),r.length)throw pz(r);return o}function eh(t,n,e,i){switch(n){case"start":t.onStart(()=>i(e&&Xb(e,"start",t)));break;case"done":t.onDone(()=>i(e&&Xb(e,"done",t)));break;case"destroy":t.onDestroy(()=>i(e&&Xb(e,"destroy",t)));break}}function Xb(t,n,e){let i=e.totalTime,r=!!e.disabled,o=th(t.element,t.triggerName,t.fromState,t.toState,n||t.phaseName,i??t.totalTime,r),s=t._data;return s!=null&&(o._data=s),o}function th(t,n,e,i,r="",o=0,s){return{element:t,triggerName:n,fromState:e,toState:i,phaseName:r,totalTime:o,disabled:!!s}}function An(t,n,e){let i=t.get(n);return i||t.set(n,i=e),i}function n0(t){let n=t.indexOf(":"),e=t.substring(1,n),i=t.slice(n+1);return[e,i]}var hz=typeof document>"u"?null:document.documentElement;function nh(t){let n=t.parentNode||t.host||null;return n===hz?null:n}function gz(t){return t.substring(1,6)=="ebkit"}var Fs=null,xT=!1;function XT(t){Fs||(Fs=vz()||{},xT=Fs.style?"WebkitAppearance"in Fs.style:!1);let n=!0;return Fs.style&&!gz(t)&&(n=t in Fs.style,!n&&xT&&(n="Webkit"+t.charAt(0).toUpperCase()+t.slice(1)in Fs.style)),n}function vz(){return typeof document<"u"?document.body:null}function i0(t,n){for(;n;){if(n===t)return!0;n=nh(n)}return!1}function r0(t,n,e){if(e)return Array.from(t.querySelectorAll(n));let i=t.querySelector(n);return i?[i]:[]}var _z=1e3,o0="{{",yz="}}",s0="ng-enter",ih="ng-leave",vd="ng-trigger",_d=".ng-trigger",a0="ng-animating",rh=".ng-animating";function ar(t){if(typeof t=="number")return t;let n=t.match(/^(-?[\.\d]+)(m?s)/);return!n||n.length<2?0:Jb(parseFloat(n[1]),n[2])}function Jb(t,n){return n==="s"?t*_z:t}function yd(t,n,e){return t.hasOwnProperty("duration")?t:Cz(t,n,e)}var bz=/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i;function Cz(t,n,e){let i,r=0,o="";if(typeof t=="string"){let s=t.match(bz);if(s===null)return n.push(ST(t)),{duration:0,delay:0,easing:""};i=Jb(parseFloat(s[1]),s[2]);let a=s[3];a!=null&&(r=Jb(parseFloat(a),s[4]));let l=s[5];l&&(o=l)}else i=t;if(!e){let s=!1,a=n.length;i<0&&(n.push(cz()),s=!0),r<0&&(n.push(dz()),s=!0),s&&n.splice(a,0,ST(t))}return{duration:i,delay:r,easing:o}}function JT(t){return t.length?t[0]instanceof Map?t:t.map(n=>new Map(Object.entries(n))):[]}function Ii(t,n,e){n.forEach((i,r)=>{let o=oh(r);e&&!e.has(r)&&e.set(r,t.style[o]),t.style[o]=i})}function Ro(t,n){n.forEach((e,i)=>{let r=oh(i);t.style[r]=""})}function nl(t){return Array.isArray(t)?t.length==1?t[0]:ET(t):t}function ek(t,n,e){let i=n.params||{},r=l0(t);r.length&&r.forEach(o=>{i.hasOwnProperty(o)||e.push(uz(o))})}var e0=new RegExp(`${o0}\\s*(.+?)\\s*${yz}`,"g");function l0(t){let n=[];if(typeof t=="string"){let e;for(;e=e0.exec(t);)n.push(e[1]);e0.lastIndex=0}return n}function il(t,n,e){let i=`${t}`,r=i.replace(e0,(o,s)=>{let a=n[s];return a==null&&(e.push(fz(s)),a=""),a.toString()});return r==i?t:r}var wz=/-+([a-z0-9])/g;function oh(t){return t.replace(wz,(...n)=>n[1].toUpperCase())}function tk(t,n){return t===0||n===0}function nk(t,n,e){if(e.size&&n.length){let i=n[0],r=[];if(e.forEach((o,s)=>{i.has(s)||r.push(s),i.set(s,o)}),r.length)for(let o=1;o<n.length;o++){let s=n[o];r.forEach(a=>s.set(a,sh(t,a)))}}return n}function On(t,n,e){switch(n.type){case Se.Trigger:return t.visitTrigger(n,e);case Se.State:return t.visitState(n,e);case Se.Transition:return t.visitTransition(n,e);case Se.Sequence:return t.visitSequence(n,e);case Se.Group:return t.visitGroup(n,e);case Se.Animate:return t.visitAnimate(n,e);case Se.Keyframes:return t.visitKeyframes(n,e);case Se.Style:return t.visitStyle(n,e);case Se.Reference:return t.visitReference(n,e);case Se.AnimateChild:return t.visitAnimateChild(n,e);case Se.AnimateRef:return t.visitAnimateRef(n,e);case Se.Query:return t.visitQuery(n,e);case Se.Stagger:return t.visitStagger(n,e);default:throw mz(n.type)}}function sh(t,n){return window.getComputedStyle(t)[n]}var S0=(()=>{class t{validateStyleProperty(e){return XT(e)}containsElement(e,i){return i0(e,i)}getParentElement(e){return nh(e)}query(e,i,r){return r0(e,i,r)}computeStyle(e,i,r){return r||""}animate(e,i,r,o,s,a=[],l){return new Fr(r,o)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})(),Bs=class{static NOOP=new S0},Vs=class{};var Dz=new Set(["width","height","minWidth","minHeight","maxWidth","maxHeight","left","top","bottom","right","fontSize","outlineWidth","outlineOffset","paddingTop","paddingLeft","paddingBottom","paddingRight","marginTop","marginLeft","marginBottom","marginRight","borderRadius","borderWidth","borderTopWidth","borderLeftWidth","borderRightWidth","borderBottomWidth","textIndent","perspective"]),uh=class extends Vs{normalizePropertyName(n,e){return oh(n)}normalizeStyleValue(n,e,i,r){let o="",s=i.toString().trim();if(Dz.has(e)&&i!==0&&i!=="0")if(typeof i=="number")o="px";else{let a=i.match(/^[+-]?[\d\.]+([a-z]*)$/);a&&a[1].length==0&&r.push(MT(n,i))}return s+o}};var fh="*";function Ez(t,n){let e=[];return typeof t=="string"?t.split(/\s*,\s*/).forEach(i=>Sz(i,e,n)):e.push(t),e}function Sz(t,n,e){if(t[0]==":"){let l=xz(t,e);if(typeof l=="function"){n.push(l);return}t=l}let i=t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);if(i==null||i.length<4)return e.push(VT(t)),n;let r=i[1],o=i[2],s=i[3];n.push(ik(r,s));let a=r==fh&&s==fh;o[0]=="<"&&!a&&n.push(ik(s,r))}function xz(t,n){switch(t){case":enter":return"void => *";case":leave":return"* => void";case":increment":return(e,i)=>parseFloat(i)>parseFloat(e);case":decrement":return(e,i)=>parseFloat(i)<parseFloat(e);default:return n.push(jT(t)),"* => *"}}var ah=new Set(["true","1"]),lh=new Set(["false","0"]);function ik(t,n){let e=ah.has(t)||lh.has(t),i=ah.has(n)||lh.has(n);return(r,o)=>{let s=t==fh||t==r,a=n==fh||n==o;return!s&&e&&typeof r=="boolean"&&(s=r?ah.has(t):lh.has(t)),!a&&i&&typeof o=="boolean"&&(a=o?ah.has(n):lh.has(n)),s&&a}}var mk=":self",Mz=new RegExp(`s*${mk}s*,?`,"g");function pk(t,n,e,i){return new p0(t).build(n,e,i)}var rk="",p0=class{_driver;constructor(n){this._driver=n}build(n,e,i){let r=new h0(e);return this._resetContextStyleTimingState(r),On(this,nl(n),r)}_resetContextStyleTimingState(n){n.currentQuerySelector=rk,n.collectedStyles=new Map,n.collectedStyles.set(rk,new Map),n.currentTime=0}visitTrigger(n,e){let i=e.queryCount=0,r=e.depCount=0,o=[],s=[];return n.name.charAt(0)=="@"&&e.errors.push(IT()),n.definitions.forEach(a=>{if(this._resetContextStyleTimingState(e),a.type==Se.State){let l=a,c=l.name;c.toString().split(/\s*,\s*/).forEach(d=>{l.name=d,o.push(this.visitState(l,e))}),l.name=c}else if(a.type==Se.Transition){let l=this.visitTransition(a,e);i+=l.queryCount,r+=l.depCount,s.push(l)}else e.errors.push(TT())}),{type:Se.Trigger,name:n.name,states:o,transitions:s,queryCount:i,depCount:r,options:null}}visitState(n,e){let i=this.visitStyle(n.styles,e),r=n.options&&n.options.params||null;if(i.containsDynamicStyles){let o=new Set,s=r||{};i.styles.forEach(a=>{a instanceof Map&&a.forEach(l=>{l0(l).forEach(c=>{s.hasOwnProperty(c)||o.add(c)})})}),o.size&&e.errors.push(kT(n.name,[...o.values()]))}return{type:Se.State,name:n.name,style:i,options:r?{params:r}:null}}visitTransition(n,e){e.queryCount=0,e.depCount=0;let i=On(this,nl(n.animation),e),r=Ez(n.expr,e.errors);return{type:Se.Transition,matchers:r,animation:i,queryCount:e.queryCount,depCount:e.depCount,options:Ls(n.options)}}visitSequence(n,e){return{type:Se.Sequence,steps:n.steps.map(i=>On(this,i,e)),options:Ls(n.options)}}visitGroup(n,e){let i=e.currentTime,r=0,o=n.steps.map(s=>{e.currentTime=i;let a=On(this,s,e);return r=Math.max(r,e.currentTime),a});return e.currentTime=r,{type:Se.Group,steps:o,options:Ls(n.options)}}visitAnimate(n,e){let i=Rz(n.timings,e.errors);e.currentAnimateTimings=i;let r,o=n.styles?n.styles:Zb({});if(o.type==Se.Keyframes)r=this.visitKeyframes(o,e);else{let s=n.styles,a=!1;if(!s){a=!0;let c={};i.easing&&(c.easing=i.easing),s=Zb(c)}e.currentTime+=i.duration+i.delay;let l=this.visitStyle(s,e);l.isEmptyStep=a,r=l}return e.currentAnimateTimings=null,{type:Se.Animate,timings:i,style:r,options:null}}visitStyle(n,e){let i=this._makeStyleAst(n,e);return this._validateStyleAst(i,e),i}_makeStyleAst(n,e){let i=[],r=Array.isArray(n.styles)?n.styles:[n.styles];for(let a of r)typeof a=="string"?a===Mi?i.push(a):e.errors.push(RT(a)):i.push(new Map(Object.entries(a)));let o=!1,s=null;return i.forEach(a=>{if(a instanceof Map&&(a.has("easing")&&(s=a.get("easing"),a.delete("easing")),!o)){for(let l of a.values())if(l.toString().indexOf(o0)>=0){o=!0;break}}}),{type:Se.Style,styles:i,easing:s,offset:n.offset,containsDynamicStyles:o,options:null}}_validateStyleAst(n,e){let i=e.currentAnimateTimings,r=e.currentTime,o=e.currentTime;i&&o>0&&(o-=i.duration+i.delay),n.styles.forEach(s=>{typeof s!="string"&&s.forEach((a,l)=>{let c=e.collectedStyles.get(e.currentQuerySelector),d=c.get(l),p=!0;d&&(o!=r&&o>=d.startTime&&r<=d.endTime&&(e.errors.push(AT(l,d.startTime,d.endTime,o,r)),p=!1),o=d.startTime),p&&c.set(l,{startTime:o,endTime:r}),e.options&&ek(a,e.options,e.errors)})})}visitKeyframes(n,e){let i={type:Se.Keyframes,styles:[],options:null};if(!e.currentAnimateTimings)return e.errors.push(OT()),i;let r=1,o=0,s=[],a=!1,l=!1,c=0,d=n.steps.map(R=>{let $=this._makeStyleAst(R,e),Ee=$.offset!=null?$.offset:kz($.styles),pe=0;return Ee!=null&&(o++,pe=$.offset=Ee),l=l||pe<0||pe>1,a=a||pe<c,c=pe,s.push(pe),$});l&&e.errors.push(NT()),a&&e.errors.push(PT());let p=n.steps.length,_=0;o>0&&o<p?e.errors.push(FT()):o==0&&(_=r/(p-1));let v=p-1,y=e.currentTime,D=e.currentAnimateTimings,M=D.duration;return d.forEach((R,$)=>{let Ee=_>0?$==v?1:_*$:s[$],pe=Ee*M;e.currentTime=y+D.delay+pe,D.duration=pe,this._validateStyleAst(R,e),R.offset=Ee,i.styles.push(R)}),i}visitReference(n,e){return{type:Se.Reference,animation:On(this,nl(n.animation),e),options:Ls(n.options)}}visitAnimateChild(n,e){return e.depCount++,{type:Se.AnimateChild,options:Ls(n.options)}}visitAnimateRef(n,e){return{type:Se.AnimateRef,animation:this.visitReference(n.animation,e),options:Ls(n.options)}}visitQuery(n,e){let i=e.currentQuerySelector,r=n.options||{};e.queryCount++,e.currentQuery=n;let[o,s]=Iz(n.selector);e.currentQuerySelector=i.length?i+" "+o:o,An(e.collectedStyles,e.currentQuerySelector,new Map);let a=On(this,nl(n.animation),e);return e.currentQuery=null,e.currentQuerySelector=i,{type:Se.Query,selector:o,limit:r.limit||0,optional:!!r.optional,includeSelf:s,animation:a,originalSelector:n.selector,options:Ls(n.options)}}visitStagger(n,e){e.currentQuery||e.errors.push(LT());let i=n.timings==="full"?{duration:0,delay:0,easing:"full"}:yd(n.timings,e.errors,!0);return{type:Se.Stagger,animation:On(this,nl(n.animation),e),timings:i,options:null}}};function Iz(t){let n=!!t.split(/\s*,\s*/).find(e=>e==mk);return n&&(t=t.replace(Mz,"")),t=t.replace(/@\*/g,_d).replace(/@\w+/g,e=>_d+"-"+e.slice(1)).replace(/:animating/g,rh),[t,n]}function Tz(t){return t?S({},t):null}var h0=class{errors;queryCount=0;depCount=0;currentTransition=null;currentQuery=null;currentQuerySelector=null;currentAnimateTimings=null;currentTime=0;collectedStyles=new Map;options=null;unsupportedCSSPropertiesFound=new Set;constructor(n){this.errors=n}};function kz(t){if(typeof t=="string")return null;let n=null;if(Array.isArray(t))t.forEach(e=>{if(e instanceof Map&&e.has("offset")){let i=e;n=parseFloat(i.get("offset")),i.delete("offset")}});else if(t instanceof Map&&t.has("offset")){let e=t;n=parseFloat(e.get("offset")),e.delete("offset")}return n}function Rz(t,n){if(t.hasOwnProperty("duration"))return t;if(typeof t=="number"){let o=yd(t,n).duration;return c0(o,0,"")}let e=t;if(e.split(/\s+/).some(o=>o.charAt(0)=="{"&&o.charAt(1)=="{")){let o=c0(0,0,"");return o.dynamic=!0,o.strValue=e,o}let r=yd(e,n);return c0(r.duration,r.delay,r.easing)}function Ls(t){return t?(t=S({},t),t.params&&(t.params=Tz(t.params))):t={},t}function c0(t,n,e){return{duration:t,delay:n,easing:e}}function x0(t,n,e,i,r,o,s=null,a=!1){return{type:1,element:t,keyframes:n,preStyleProps:e,postStyleProps:i,duration:r,delay:o,totalTime:r+o,easing:s,subTimeline:a}}var Cd=class{_map=new Map;get(n){return this._map.get(n)||[]}append(n,e){let i=this._map.get(n);i||this._map.set(n,i=[]),i.push(...e)}has(n){return this._map.has(n)}clear(){this._map.clear()}},Az=1,Oz=":enter",Nz=new RegExp(Oz,"g"),Pz=":leave",Fz=new RegExp(Pz,"g");function hk(t,n,e,i,r,o=new Map,s=new Map,a,l,c=[]){return new g0().buildKeyframes(t,n,e,i,r,o,s,a,l,c)}var g0=class{buildKeyframes(n,e,i,r,o,s,a,l,c,d=[]){c=c||new Cd;let p=new v0(n,e,c,r,o,d,[]);p.options=l;let _=l.delay?ar(l.delay):0;p.currentTimeline.delayNextStep(_),p.currentTimeline.setStyles([s],null,p.errors,l),On(this,i,p);let v=p.timelines.filter(y=>y.containsAnimation());if(v.length&&a.size){let y;for(let D=v.length-1;D>=0;D--){let M=v[D];if(M.element===e){y=M;break}}y&&!y.allowOnlyTimelineStyles()&&y.setStyles([a],null,p.errors,l)}return v.length?v.map(y=>y.buildKeyframes()):[x0(e,[],[],[],0,_,"",!1)]}visitTrigger(n,e){}visitState(n,e){}visitTransition(n,e){}visitAnimateChild(n,e){let i=e.subInstructions.get(e.element);if(i){let r=e.createSubContext(n.options),o=e.currentTimeline.currentTime,s=this._visitSubInstructions(i,r,r.options);o!=s&&e.transformIntoNewTimeline(s)}e.previousNode=n}visitAnimateRef(n,e){let i=e.createSubContext(n.options);i.transformIntoNewTimeline(),this._applyAnimationRefDelays([n.options,n.animation.options],e,i),this.visitReference(n.animation,i),e.transformIntoNewTimeline(i.currentTimeline.currentTime),e.previousNode=n}_applyAnimationRefDelays(n,e,i){for(let r of n){let o=r?.delay;if(o){let s=typeof o=="number"?o:ar(il(o,r?.params??{},e.errors));i.delayNextStep(s)}}}_visitSubInstructions(n,e,i){let o=e.currentTimeline.currentTime,s=i.duration!=null?ar(i.duration):null,a=i.delay!=null?ar(i.delay):null;return s!==0&&n.forEach(l=>{let c=e.appendInstructionToTimeline(l,s,a);o=Math.max(o,c.duration+c.delay)}),o}visitReference(n,e){e.updateOptions(n.options,!0),On(this,n.animation,e),e.previousNode=n}visitSequence(n,e){let i=e.subContextCount,r=e,o=n.options;if(o&&(o.params||o.delay)&&(r=e.createSubContext(o),r.transformIntoNewTimeline(),o.delay!=null)){r.previousNode.type==Se.Style&&(r.currentTimeline.snapshotCurrentStyles(),r.previousNode=mh);let s=ar(o.delay);r.delayNextStep(s)}n.steps.length&&(n.steps.forEach(s=>On(this,s,r)),r.currentTimeline.applyStylesToKeyframe(),r.subContextCount>i&&r.transformIntoNewTimeline()),e.previousNode=n}visitGroup(n,e){let i=[],r=e.currentTimeline.currentTime,o=n.options&&n.options.delay?ar(n.options.delay):0;n.steps.forEach(s=>{let a=e.createSubContext(n.options);o&&a.delayNextStep(o),On(this,s,a),r=Math.max(r,a.currentTimeline.currentTime),i.push(a.currentTimeline)}),i.forEach(s=>e.currentTimeline.mergeTimelineCollectedStyles(s)),e.transformIntoNewTimeline(r),e.previousNode=n}_visitTiming(n,e){if(n.dynamic){let i=n.strValue,r=e.params?il(i,e.params,e.errors):i;return yd(r,e.errors)}else return{duration:n.duration,delay:n.delay,easing:n.easing}}visitAnimate(n,e){let i=e.currentAnimateTimings=this._visitTiming(n.timings,e),r=e.currentTimeline;i.delay&&(e.incrementTime(i.delay),r.snapshotCurrentStyles());let o=n.style;o.type==Se.Keyframes?this.visitKeyframes(o,e):(e.incrementTime(i.duration),this.visitStyle(o,e),r.applyStylesToKeyframe()),e.currentAnimateTimings=null,e.previousNode=n}visitStyle(n,e){let i=e.currentTimeline,r=e.currentAnimateTimings;!r&&i.hasCurrentStyleProperties()&&i.forwardFrame();let o=r&&r.easing||n.easing;n.isEmptyStep?i.applyEmptyStep(o):i.setStyles(n.styles,o,e.errors,e.options),e.previousNode=n}visitKeyframes(n,e){let i=e.currentAnimateTimings,r=e.currentTimeline.duration,o=i.duration,a=e.createSubContext().currentTimeline;a.easing=i.easing,n.styles.forEach(l=>{let c=l.offset||0;a.forwardTime(c*o),a.setStyles(l.styles,l.easing,e.errors,e.options),a.applyStylesToKeyframe()}),e.currentTimeline.mergeTimelineCollectedStyles(a),e.transformIntoNewTimeline(r+o),e.previousNode=n}visitQuery(n,e){let i=e.currentTimeline.currentTime,r=n.options||{},o=r.delay?ar(r.delay):0;o&&(e.previousNode.type===Se.Style||i==0&&e.currentTimeline.hasCurrentStyleProperties())&&(e.currentTimeline.snapshotCurrentStyles(),e.previousNode=mh);let s=i,a=e.invokeQuery(n.selector,n.originalSelector,n.limit,n.includeSelf,!!r.optional,e.errors);e.currentQueryTotal=a.length;let l=null;a.forEach((c,d)=>{e.currentQueryIndex=d;let p=e.createSubContext(n.options,c);o&&p.delayNextStep(o),c===e.element&&(l=p.currentTimeline),On(this,n.animation,p),p.currentTimeline.applyStylesToKeyframe();let _=p.currentTimeline.currentTime;s=Math.max(s,_)}),e.currentQueryIndex=0,e.currentQueryTotal=0,e.transformIntoNewTimeline(s),l&&(e.currentTimeline.mergeTimelineCollectedStyles(l),e.currentTimeline.snapshotCurrentStyles()),e.previousNode=n}visitStagger(n,e){let i=e.parentContext,r=e.currentTimeline,o=n.timings,s=Math.abs(o.duration),a=s*(e.currentQueryTotal-1),l=s*e.currentQueryIndex;switch(o.duration<0?"reverse":o.easing){case"reverse":l=a-l;break;case"full":l=i.currentStaggerTime;break}let d=e.currentTimeline;l&&d.delayNextStep(l);let p=d.currentTime;On(this,n.animation,e),e.previousNode=n,i.currentStaggerTime=r.currentTime-p+(r.startTime-i.currentTimeline.startTime)}},mh={},v0=class t{_driver;element;subInstructions;_enterClassName;_leaveClassName;errors;timelines;parentContext=null;currentTimeline;currentAnimateTimings=null;previousNode=mh;subContextCount=0;options={};currentQueryIndex=0;currentQueryTotal=0;currentStaggerTime=0;constructor(n,e,i,r,o,s,a,l){this._driver=n,this.element=e,this.subInstructions=i,this._enterClassName=r,this._leaveClassName=o,this.errors=s,this.timelines=a,this.currentTimeline=l||new ph(this._driver,e,0),a.push(this.currentTimeline)}get params(){return this.options.params}updateOptions(n,e){if(!n)return;let i=n,r=this.options;i.duration!=null&&(r.duration=ar(i.duration)),i.delay!=null&&(r.delay=ar(i.delay));let o=i.params;if(o){let s=r.params;s||(s=this.options.params={}),Object.keys(o).forEach(a=>{(!e||!s.hasOwnProperty(a))&&(s[a]=il(o[a],s,this.errors))})}}_copyOptions(){let n={};if(this.options){let e=this.options.params;if(e){let i=n.params={};Object.keys(e).forEach(r=>{i[r]=e[r]})}}return n}createSubContext(n=null,e,i){let r=e||this.element,o=new t(this._driver,r,this.subInstructions,this._enterClassName,this._leaveClassName,this.errors,this.timelines,this.currentTimeline.fork(r,i||0));return o.previousNode=this.previousNode,o.currentAnimateTimings=this.currentAnimateTimings,o.options=this._copyOptions(),o.updateOptions(n),o.currentQueryIndex=this.currentQueryIndex,o.currentQueryTotal=this.currentQueryTotal,o.parentContext=this,this.subContextCount++,o}transformIntoNewTimeline(n){return this.previousNode=mh,this.currentTimeline=this.currentTimeline.fork(this.element,n),this.timelines.push(this.currentTimeline),this.currentTimeline}appendInstructionToTimeline(n,e,i){let r={duration:e??n.duration,delay:this.currentTimeline.currentTime+(i??0)+n.delay,easing:""},o=new _0(this._driver,n.element,n.keyframes,n.preStyleProps,n.postStyleProps,r,n.stretchStartingKeyframe);return this.timelines.push(o),r}incrementTime(n){this.currentTimeline.forwardTime(this.currentTimeline.duration+n)}delayNextStep(n){n>0&&this.currentTimeline.delayNextStep(n)}invokeQuery(n,e,i,r,o,s){let a=[];if(r&&a.push(this.element),n.length>0){n=n.replace(Nz,"."+this._enterClassName),n=n.replace(Fz,"."+this._leaveClassName);let l=i!=1,c=this._driver.query(this.element,n,l);i!==0&&(c=i<0?c.slice(c.length+i,c.length):c.slice(0,i)),a.push(...c)}return!o&&a.length==0&&s.push(BT(e)),a}},ph=class t{_driver;element;startTime;_elementTimelineStylesLookup;duration=0;easing=null;_previousKeyframe=new Map;_currentKeyframe=new Map;_keyframes=new Map;_styleSummary=new Map;_localTimelineStyles=new Map;_globalTimelineStyles;_pendingStyles=new Map;_backFill=new Map;_currentEmptyStepKeyframe=null;constructor(n,e,i,r){this._driver=n,this.element=e,this.startTime=i,this._elementTimelineStylesLookup=r,this._elementTimelineStylesLookup||(this._elementTimelineStylesLookup=new Map),this._globalTimelineStyles=this._elementTimelineStylesLookup.get(e),this._globalTimelineStyles||(this._globalTimelineStyles=this._localTimelineStyles,this._elementTimelineStylesLookup.set(e,this._localTimelineStyles)),this._loadKeyframe()}containsAnimation(){switch(this._keyframes.size){case 0:return!1;case 1:return this.hasCurrentStyleProperties();default:return!0}}hasCurrentStyleProperties(){return this._currentKeyframe.size>0}get currentTime(){return this.startTime+this.duration}delayNextStep(n){let e=this._keyframes.size===1&&this._pendingStyles.size;this.duration||e?(this.forwardTime(this.currentTime+n),e&&this.snapshotCurrentStyles()):this.startTime+=n}fork(n,e){return this.applyStylesToKeyframe(),new t(this._driver,n,e||this.currentTime,this._elementTimelineStylesLookup)}_loadKeyframe(){this._currentKeyframe&&(this._previousKeyframe=this._currentKeyframe),this._currentKeyframe=this._keyframes.get(this.duration),this._currentKeyframe||(this._currentKeyframe=new Map,this._keyframes.set(this.duration,this._currentKeyframe))}forwardFrame(){this.duration+=Az,this._loadKeyframe()}forwardTime(n){this.applyStylesToKeyframe(),this.duration=n,this._loadKeyframe()}_updateStyle(n,e){this._localTimelineStyles.set(n,e),this._globalTimelineStyles.set(n,e),this._styleSummary.set(n,{time:this.currentTime,value:e})}allowOnlyTimelineStyles(){return this._currentEmptyStepKeyframe!==this._currentKeyframe}applyEmptyStep(n){n&&this._previousKeyframe.set("easing",n);for(let[e,i]of this._globalTimelineStyles)this._backFill.set(e,i||Mi),this._currentKeyframe.set(e,Mi);this._currentEmptyStepKeyframe=this._currentKeyframe}setStyles(n,e,i,r){e&&this._previousKeyframe.set("easing",e);let o=r&&r.params||{},s=Lz(n,this._globalTimelineStyles);for(let[a,l]of s){let c=il(l,o,i);this._pendingStyles.set(a,c),this._localTimelineStyles.has(a)||this._backFill.set(a,this._globalTimelineStyles.get(a)??Mi),this._updateStyle(a,c)}}applyStylesToKeyframe(){this._pendingStyles.size!=0&&(this._pendingStyles.forEach((n,e)=>{this._currentKeyframe.set(e,n)}),this._pendingStyles.clear(),this._localTimelineStyles.forEach((n,e)=>{this._currentKeyframe.has(e)||this._currentKeyframe.set(e,n)}))}snapshotCurrentStyles(){for(let[n,e]of this._localTimelineStyles)this._pendingStyles.set(n,e),this._updateStyle(n,e)}getFinalKeyframe(){return this._keyframes.get(this.duration)}get properties(){let n=[];for(let e in this._currentKeyframe)n.push(e);return n}mergeTimelineCollectedStyles(n){n._styleSummary.forEach((e,i)=>{let r=this._styleSummary.get(i);(!r||e.time>r.time)&&this._updateStyle(i,e.value)})}buildKeyframes(){this.applyStylesToKeyframe();let n=new Set,e=new Set,i=this._keyframes.size===1&&this.duration===0,r=[];this._keyframes.forEach((a,l)=>{let c=new Map([...this._backFill,...a]);c.forEach((d,p)=>{d===gd?n.add(p):d===Mi&&e.add(p)}),i||c.set("offset",l/this.duration),r.push(c)});let o=[...n.values()],s=[...e.values()];if(i){let a=r[0],l=new Map(a);a.set("offset",0),l.set("offset",1),r=[a,l]}return x0(this.element,r,o,s,this.duration,this.startTime,this.easing,!1)}},_0=class extends ph{keyframes;preStyleProps;postStyleProps;_stretchStartingKeyframe;timings;constructor(n,e,i,r,o,s,a=!1){super(n,e,s.delay),this.keyframes=i,this.preStyleProps=r,this.postStyleProps=o,this._stretchStartingKeyframe=a,this.timings={duration:s.duration,delay:s.delay,easing:s.easing}}containsAnimation(){return this.keyframes.length>1}buildKeyframes(){let n=this.keyframes,{delay:e,duration:i,easing:r}=this.timings;if(this._stretchStartingKeyframe&&e){let o=[],s=i+e,a=e/s,l=new Map(n[0]);l.set("offset",0),o.push(l);let c=new Map(n[0]);c.set("offset",ok(a)),o.push(c);let d=n.length-1;for(let p=1;p<=d;p++){let _=new Map(n[p]),v=_.get("offset"),y=e+v*i;_.set("offset",ok(y/s)),o.push(_)}i=s,e=0,r="",n=o}return x0(this.element,n,this.preStyleProps,this.postStyleProps,i,e,r,!0)}};function ok(t,n=3){let e=Math.pow(10,n-1);return Math.round(t*e)/e}function Lz(t,n){let e=new Map,i;return t.forEach(r=>{if(r==="*"){i??=n.keys();for(let o of i)e.set(o,Mi)}else for(let[o,s]of r)e.set(o,s)}),e}function sk(t,n,e,i,r,o,s,a,l,c,d,p,_){return{type:0,element:t,triggerName:n,isRemovalTransition:r,fromState:e,fromStyles:o,toState:i,toStyles:s,timelines:a,queriedElements:l,preStyleProps:c,postStyleProps:d,totalTime:p,errors:_}}var d0={},hh=class{_triggerName;ast;_stateStyles;constructor(n,e,i){this._triggerName=n,this.ast=e,this._stateStyles=i}match(n,e,i,r){return Bz(this.ast.matchers,n,e,i,r)}buildStyles(n,e,i){let r=this._stateStyles.get("*");return n!==void 0&&(r=this._stateStyles.get(n?.toString())||r),r?r.buildStyles(e,i):new Map}build(n,e,i,r,o,s,a,l,c,d){let p=[],_=this.ast.options&&this.ast.options.params||d0,v=a&&a.params||d0,y=this.buildStyles(i,v,p),D=l&&l.params||d0,M=this.buildStyles(r,D,p),R=new Set,$=new Map,Ee=new Map,pe=r==="void",Te={params:gk(D,_),delay:this.ast.options?.delay},Xe=d?[]:hk(n,e,this.ast.animation,o,s,y,M,Te,c,p),Me=0;return Xe.forEach(Fe=>{Me=Math.max(Fe.duration+Fe.delay,Me)}),p.length?sk(e,this._triggerName,i,r,pe,y,M,[],[],$,Ee,Me,p):(Xe.forEach(Fe=>{let nt=Fe.element,lr=An($,nt,new Set);Fe.preStyleProps.forEach(ki=>lr.add(ki));let Ao=An(Ee,nt,new Set);Fe.postStyleProps.forEach(ki=>Ao.add(ki)),nt!==e&&R.add(nt)}),sk(e,this._triggerName,i,r,pe,y,M,Xe,[...R.values()],$,Ee,Me))}};function Bz(t,n,e,i,r){return t.some(o=>o(n,e,i,r))}function gk(t,n){let e=S({},n);return Object.entries(t).forEach(([i,r])=>{r!=null&&(e[i]=r)}),e}var y0=class{styles;defaultParams;normalizer;constructor(n,e,i){this.styles=n,this.defaultParams=e,this.normalizer=i}buildStyles(n,e){let i=new Map,r=gk(n,this.defaultParams);return this.styles.styles.forEach(o=>{typeof o!="string"&&o.forEach((s,a)=>{s&&(s=il(s,r,e));let l=this.normalizer.normalizePropertyName(a,e);s=this.normalizer.normalizeStyleValue(a,l,s,e),i.set(a,s)})}),i}};function Vz(t,n,e){return new b0(t,n,e)}var b0=class{name;ast;_normalizer;transitionFactories=[];fallbackTransition;states=new Map;constructor(n,e,i){this.name=n,this.ast=e,this._normalizer=i,e.states.forEach(r=>{let o=r.options&&r.options.params||{};this.states.set(r.name,new y0(r.style,o,i))}),ak(this.states,"true","1"),ak(this.states,"false","0"),e.transitions.forEach(r=>{this.transitionFactories.push(new hh(n,r,this.states))}),this.fallbackTransition=jz(n,this.states)}get containsQueries(){return this.ast.queryCount>0}matchTransition(n,e,i,r){return this.transitionFactories.find(s=>s.match(n,e,i,r))||null}matchStyles(n,e,i){return this.fallbackTransition.buildStyles(n,e,i)}};function jz(t,n,e){let i=[(s,a)=>!0],r={type:Se.Sequence,steps:[],options:null},o={type:Se.Transition,animation:r,matchers:i,options:null,queryCount:0,depCount:0};return new hh(t,o,n)}function ak(t,n,e){t.has(n)?t.has(e)||t.set(e,t.get(n)):t.has(e)&&t.set(n,t.get(e))}var Hz=new Cd,C0=class{bodyNode;_driver;_normalizer;_animations=new Map;_playersById=new Map;players=[];constructor(n,e,i){this.bodyNode=n,this._driver=e,this._normalizer=i}register(n,e){let i=[],r=[],o=pk(this._driver,e,i,r);if(i.length)throw zT(i);this._animations.set(n,o)}_buildPlayer(n,e,i){let r=n.element,o=t0(this._normalizer,n.keyframes,e,i);return this._driver.animate(r,o,n.duration,n.delay,n.easing,[],!0)}create(n,e,i={}){let r=[],o=this._animations.get(n),s,a=new Map;if(o?(s=hk(this._driver,e,o,s0,ih,new Map,new Map,i,Hz,r),s.forEach(d=>{let p=An(a,d.element,new Map);d.postStyleProps.forEach(_=>p.set(_,null))})):(r.push(UT()),s=[]),r.length)throw $T(r);a.forEach((d,p)=>{d.forEach((_,v)=>{d.set(v,this._driver.computeStyle(p,v,Mi))})});let l=s.map(d=>{let p=a.get(d.element);return this._buildPlayer(d,new Map,p)}),c=Lr(l);return this._playersById.set(n,c),c.onDestroy(()=>this.destroy(n)),this.players.push(c),c}destroy(n){let e=this._getPlayer(n);e.destroy(),this._playersById.delete(n);let i=this.players.indexOf(e);i>=0&&this.players.splice(i,1)}_getPlayer(n){let e=this._playersById.get(n);if(!e)throw GT(n);return e}listen(n,e,i,r){let o=th(e,"","","");return eh(this._getPlayer(n),i,o,r),()=>{}}command(n,e,i,r){if(i=="register"){this.register(n,r[0]);return}if(i=="create"){let s=r[0]||{};this.create(n,e,s);return}let o=this._getPlayer(n);switch(i){case"play":o.play();break;case"pause":o.pause();break;case"reset":o.reset();break;case"restart":o.restart();break;case"finish":o.finish();break;case"init":o.init();break;case"setPosition":o.setPosition(parseFloat(r[0]));break;case"destroy":this.destroy(n);break}}},lk="ng-animate-queued",zz=".ng-animate-queued",u0="ng-animate-disabled",Uz=".ng-animate-disabled",$z="ng-star-inserted",Gz=".ng-star-inserted",Wz=[],vk={namespaceId:"",setForRemoval:!1,setForMove:!1,hasAnimation:!1,removedBeforeQueried:!1},qz={namespaceId:"",setForMove:!1,setForRemoval:!1,hasAnimation:!1,removedBeforeQueried:!0},Ti="__ng_removed",wd=class{namespaceId;value;options;get params(){return this.options.params}constructor(n,e=""){this.namespaceId=e;let i=n&&n.hasOwnProperty("value"),r=i?n.value:n;if(this.value=Yz(r),i){let o=n,{value:s}=o,a=Eh(o,["value"]);this.options=a}else this.options={};this.options.params||(this.options.params={})}absorbOptions(n){let e=n.params;if(e){let i=this.options.params;Object.keys(e).forEach(r=>{i[r]==null&&(i[r]=e[r])})}}},bd="void",f0=new wd(bd),w0=class{id;hostElement;_engine;players=[];_triggers=new Map;_queue=[];_elementListeners=new Map;_hostClassName;constructor(n,e,i){this.id=n,this.hostElement=e,this._engine=i,this._hostClassName="ng-tns-"+n,ui(e,this._hostClassName)}listen(n,e,i,r){if(!this._triggers.has(e))throw WT(i,e);if(i==null||i.length==0)throw qT(e);if(!Qz(i))throw KT(i,e);let o=An(this._elementListeners,n,[]),s={name:e,phase:i,callback:r};o.push(s);let a=An(this._engine.statesByElement,n,new Map);return a.has(e)||(ui(n,vd),ui(n,vd+"-"+e),a.set(e,f0)),()=>{this._engine.afterFlush(()=>{let l=o.indexOf(s);l>=0&&o.splice(l,1),this._triggers.has(e)||a.delete(e)})}}register(n,e){return this._triggers.has(n)?!1:(this._triggers.set(n,e),!0)}_getTrigger(n){let e=this._triggers.get(n);if(!e)throw YT(n);return e}trigger(n,e,i,r=!0){let o=this._getTrigger(e),s=new Dd(this.id,e,n),a=this._engine.statesByElement.get(n);a||(ui(n,vd),ui(n,vd+"-"+e),this._engine.statesByElement.set(n,a=new Map));let l=a.get(e),c=new wd(i,this.id);if(!(i&&i.hasOwnProperty("value"))&&l&&c.absorbOptions(l.options),a.set(e,c),l||(l=f0),!(c.value===bd)&&l.value===c.value){if(!Jz(l.params,c.params)){let D=[],M=o.matchStyles(l.value,l.params,D),R=o.matchStyles(c.value,c.params,D);D.length?this._engine.reportError(D):this._engine.afterFlush(()=>{Ro(n,M),Ii(n,R)})}return}let _=An(this._engine.playersByElement,n,[]);_.forEach(D=>{D.namespaceId==this.id&&D.triggerName==e&&D.queued&&D.destroy()});let v=o.matchTransition(l.value,c.value,n,c.params),y=!1;if(!v){if(!r)return;v=o.fallbackTransition,y=!0}return this._engine.totalQueuedPlayers++,this._queue.push({element:n,triggerName:e,transition:v,fromState:l,toState:c,player:s,isFallbackTransition:y}),y||(ui(n,lk),s.onStart(()=>{rl(n,lk)})),s.onDone(()=>{let D=this.players.indexOf(s);D>=0&&this.players.splice(D,1);let M=this._engine.playersByElement.get(n);if(M){let R=M.indexOf(s);R>=0&&M.splice(R,1)}}),this.players.push(s),_.push(s),s}deregister(n){this._triggers.delete(n),this._engine.statesByElement.forEach(e=>e.delete(n)),this._elementListeners.forEach((e,i)=>{this._elementListeners.set(i,e.filter(r=>r.name!=n))})}clearElementCache(n){this._engine.statesByElement.delete(n),this._elementListeners.delete(n);let e=this._engine.playersByElement.get(n);e&&(e.forEach(i=>i.destroy()),this._engine.playersByElement.delete(n))}_signalRemovalForInnerTriggers(n,e){let i=this._engine.driver.query(n,_d,!0);i.forEach(r=>{if(r[Ti])return;let o=this._engine.fetchNamespacesByElement(r);o.size?o.forEach(s=>s.triggerLeaveAnimation(r,e,!1,!0)):this.clearElementCache(r)}),this._engine.afterFlushAnimationsDone(()=>i.forEach(r=>this.clearElementCache(r)))}triggerLeaveAnimation(n,e,i,r){let o=this._engine.statesByElement.get(n),s=new Map;if(o){let a=[];if(o.forEach((l,c)=>{if(s.set(c,l.value),this._triggers.has(c)){let d=this.trigger(n,c,bd,r);d&&a.push(d)}}),a.length)return this._engine.markElementAsRemoved(this.id,n,!0,e,s),i&&Lr(a).onDone(()=>this._engine.processLeaveNode(n)),!0}return!1}prepareLeaveAnimationListeners(n){let e=this._elementListeners.get(n),i=this._engine.statesByElement.get(n);if(e&&i){let r=new Set;e.forEach(o=>{let s=o.name;if(r.has(s))return;r.add(s);let l=this._triggers.get(s).fallbackTransition,c=i.get(s)||f0,d=new wd(bd),p=new Dd(this.id,s,n);this._engine.totalQueuedPlayers++,this._queue.push({element:n,triggerName:s,transition:l,fromState:c,toState:d,player:p,isFallbackTransition:!0})})}}removeNode(n,e){let i=this._engine;if(n.childElementCount&&this._signalRemovalForInnerTriggers(n,e),this.triggerLeaveAnimation(n,e,!0))return;let r=!1;if(i.totalAnimations){let o=i.players.length?i.playersByQueriedElement.get(n):[];if(o&&o.length)r=!0;else{let s=n;for(;s=s.parentNode;)if(i.statesByElement.get(s)){r=!0;break}}}if(this.prepareLeaveAnimationListeners(n),r)i.markElementAsRemoved(this.id,n,!1,e);else{let o=n[Ti];(!o||o===vk)&&(i.afterFlush(()=>this.clearElementCache(n)),i.destroyInnerAnimations(n),i._onRemovalComplete(n,e))}}insertNode(n,e){ui(n,this._hostClassName)}drainQueuedTransitions(n){let e=[];return this._queue.forEach(i=>{let r=i.player;if(r.destroyed)return;let o=i.element,s=this._elementListeners.get(o);s&&s.forEach(a=>{if(a.name==i.triggerName){let l=th(o,i.triggerName,i.fromState.value,i.toState.value);l._data=n,eh(i.player,a.phase,l,a.callback)}}),r.markedForDestroy?this._engine.afterFlush(()=>{r.destroy()}):e.push(i)}),this._queue=[],e.sort((i,r)=>{let o=i.transition.ast.depCount,s=r.transition.ast.depCount;return o==0||s==0?o-s:this._engine.driver.containsElement(i.element,r.element)?1:-1})}destroy(n){this.players.forEach(e=>e.destroy()),this._signalRemovalForInnerTriggers(this.hostElement,n)}},D0=class{bodyNode;driver;_normalizer;players=[];newHostElements=new Map;playersByElement=new Map;playersByQueriedElement=new Map;statesByElement=new Map;disabledNodes=new Set;totalAnimations=0;totalQueuedPlayers=0;_namespaceLookup={};_namespaceList=[];_flushFns=[];_whenQuietFns=[];namespacesByHostElement=new Map;collectedEnterElements=[];collectedLeaveElements=[];onRemovalComplete=(n,e)=>{};_onRemovalComplete(n,e){this.onRemovalComplete(n,e)}constructor(n,e,i){this.bodyNode=n,this.driver=e,this._normalizer=i}get queuedPlayers(){let n=[];return this._namespaceList.forEach(e=>{e.players.forEach(i=>{i.queued&&n.push(i)})}),n}createNamespace(n,e){let i=new w0(n,e,this);return this.bodyNode&&this.driver.containsElement(this.bodyNode,e)?this._balanceNamespaceList(i,e):(this.newHostElements.set(e,i),this.collectEnterElement(e)),this._namespaceLookup[n]=i}_balanceNamespaceList(n,e){let i=this._namespaceList,r=this.namespacesByHostElement;if(i.length-1>=0){let s=!1,a=this.driver.getParentElement(e);for(;a;){let l=r.get(a);if(l){let c=i.indexOf(l);i.splice(c+1,0,n),s=!0;break}a=this.driver.getParentElement(a)}s||i.unshift(n)}else i.push(n);return r.set(e,n),n}register(n,e){let i=this._namespaceLookup[n];return i||(i=this.createNamespace(n,e)),i}registerTrigger(n,e,i){let r=this._namespaceLookup[n];r&&r.register(e,i)&&this.totalAnimations++}destroy(n,e){n&&(this.afterFlush(()=>{}),this.afterFlushAnimationsDone(()=>{let i=this._fetchNamespace(n);this.namespacesByHostElement.delete(i.hostElement);let r=this._namespaceList.indexOf(i);r>=0&&this._namespaceList.splice(r,1),i.destroy(e),delete this._namespaceLookup[n]}))}_fetchNamespace(n){return this._namespaceLookup[n]}fetchNamespacesByElement(n){let e=new Set,i=this.statesByElement.get(n);if(i){for(let r of i.values())if(r.namespaceId){let o=this._fetchNamespace(r.namespaceId);o&&e.add(o)}}return e}trigger(n,e,i,r){if(ch(e)){let o=this._fetchNamespace(n);if(o)return o.trigger(e,i,r),!0}return!1}insertNode(n,e,i,r){if(!ch(e))return;let o=e[Ti];if(o&&o.setForRemoval){o.setForRemoval=!1,o.setForMove=!0;let s=this.collectedLeaveElements.indexOf(e);s>=0&&this.collectedLeaveElements.splice(s,1)}if(n){let s=this._fetchNamespace(n);s&&s.insertNode(e,i)}r&&this.collectEnterElement(e)}collectEnterElement(n){this.collectedEnterElements.push(n)}markElementAsDisabled(n,e){e?this.disabledNodes.has(n)||(this.disabledNodes.add(n),ui(n,u0)):this.disabledNodes.has(n)&&(this.disabledNodes.delete(n),rl(n,u0))}removeNode(n,e,i){if(ch(e)){let r=n?this._fetchNamespace(n):null;r?r.removeNode(e,i):this.markElementAsRemoved(n,e,!1,i);let o=this.namespacesByHostElement.get(e);o&&o.id!==n&&o.removeNode(e,i)}else this._onRemovalComplete(e,i)}markElementAsRemoved(n,e,i,r,o){this.collectedLeaveElements.push(e),e[Ti]={namespaceId:n,setForRemoval:r,hasAnimation:i,removedBeforeQueried:!1,previousTriggersValues:o}}listen(n,e,i,r,o){return ch(e)?this._fetchNamespace(n).listen(e,i,r,o):()=>{}}_buildInstruction(n,e,i,r,o){return n.transition.build(this.driver,n.element,n.fromState.value,n.toState.value,i,r,n.fromState.options,n.toState.options,e,o)}destroyInnerAnimations(n){let e=this.driver.query(n,_d,!0);e.forEach(i=>this.destroyActiveAnimationsForElement(i)),this.playersByQueriedElement.size!=0&&(e=this.driver.query(n,rh,!0),e.forEach(i=>this.finishActiveQueriedAnimationOnElement(i)))}destroyActiveAnimationsForElement(n){let e=this.playersByElement.get(n);e&&e.forEach(i=>{i.queued?i.markedForDestroy=!0:i.destroy()})}finishActiveQueriedAnimationOnElement(n){let e=this.playersByQueriedElement.get(n);e&&e.forEach(i=>i.finish())}whenRenderingDone(){return new Promise(n=>{if(this.players.length)return Lr(this.players).onDone(()=>n());n()})}processLeaveNode(n){let e=n[Ti];if(e&&e.setForRemoval){if(n[Ti]=vk,e.namespaceId){this.destroyInnerAnimations(n);let i=this._fetchNamespace(e.namespaceId);i&&i.clearElementCache(n)}this._onRemovalComplete(n,e.setForRemoval)}n.classList?.contains(u0)&&this.markElementAsDisabled(n,!1),this.driver.query(n,Uz,!0).forEach(i=>{this.markElementAsDisabled(i,!1)})}flush(n=-1){let e=[];if(this.newHostElements.size&&(this.newHostElements.forEach((i,r)=>this._balanceNamespaceList(i,r)),this.newHostElements.clear()),this.totalAnimations&&this.collectedEnterElements.length)for(let i=0;i<this.collectedEnterElements.length;i++){let r=this.collectedEnterElements[i];ui(r,$z)}if(this._namespaceList.length&&(this.totalQueuedPlayers||this.collectedLeaveElements.length)){let i=[];try{e=this._flushAnimations(i,n)}finally{for(let r=0;r<i.length;r++)i[r]()}}else for(let i=0;i<this.collectedLeaveElements.length;i++){let r=this.collectedLeaveElements[i];this.processLeaveNode(r)}if(this.totalQueuedPlayers=0,this.collectedEnterElements.length=0,this.collectedLeaveElements.length=0,this._flushFns.forEach(i=>i()),this._flushFns=[],this._whenQuietFns.length){let i=this._whenQuietFns;this._whenQuietFns=[],e.length?Lr(e).onDone(()=>{i.forEach(r=>r())}):i.forEach(r=>r())}}reportError(n){throw QT(n)}_flushAnimations(n,e){let i=new Cd,r=[],o=new Map,s=[],a=new Map,l=new Map,c=new Map,d=new Set;this.disabledNodes.forEach(G=>{d.add(G);let te=this.driver.query(G,zz,!0);for(let le=0;le<te.length;le++)d.add(te[le])});let p=this.bodyNode,_=Array.from(this.statesByElement.keys()),v=uk(_,this.collectedEnterElements),y=new Map,D=0;v.forEach((G,te)=>{let le=s0+D++;y.set(te,le),G.forEach(Oe=>ui(Oe,le))});let M=[],R=new Set,$=new Set;for(let G=0;G<this.collectedLeaveElements.length;G++){let te=this.collectedLeaveElements[G],le=te[Ti];le&&le.setForRemoval&&(M.push(te),R.add(te),le.hasAnimation?this.driver.query(te,Gz,!0).forEach(Oe=>R.add(Oe)):$.add(te))}let Ee=new Map,pe=uk(_,Array.from(R));pe.forEach((G,te)=>{let le=ih+D++;Ee.set(te,le),G.forEach(Oe=>ui(Oe,le))}),n.push(()=>{v.forEach((G,te)=>{let le=y.get(te);G.forEach(Oe=>rl(Oe,le))}),pe.forEach((G,te)=>{let le=Ee.get(te);G.forEach(Oe=>rl(Oe,le))}),M.forEach(G=>{this.processLeaveNode(G)})});let Te=[],Xe=[];for(let G=this._namespaceList.length-1;G>=0;G--)this._namespaceList[G].drainQueuedTransitions(e).forEach(le=>{let Oe=le.player,Ht=le.element;if(Te.push(Oe),this.collectedEnterElements.length){let nn=Ht[Ti];if(nn&&nn.setForMove){if(nn.previousTriggersValues&&nn.previousTriggersValues.has(le.triggerName)){let Oo=nn.previousTriggersValues.get(le.triggerName),Kn=this.statesByElement.get(le.element);if(Kn&&Kn.has(le.triggerName)){let Ed=Kn.get(le.triggerName);Ed.value=Oo,Kn.set(le.triggerName,Ed)}}Oe.destroy();return}}let Oi=!p||!this.driver.containsElement(p,Ht),Nn=Ee.get(Ht),Br=y.get(Ht),st=this._buildInstruction(le,i,Br,Nn,Oi);if(st.errors&&st.errors.length){Xe.push(st);return}if(Oi){Oe.onStart(()=>Ro(Ht,st.fromStyles)),Oe.onDestroy(()=>Ii(Ht,st.toStyles)),r.push(Oe);return}if(le.isFallbackTransition){Oe.onStart(()=>Ro(Ht,st.fromStyles)),Oe.onDestroy(()=>Ii(Ht,st.toStyles)),r.push(Oe);return}let M0=[];st.timelines.forEach(nn=>{nn.stretchStartingKeyframe=!0,this.disabledNodes.has(nn.element)||M0.push(nn)}),st.timelines=M0,i.append(Ht,st.timelines);let xk={instruction:st,player:Oe,element:Ht};s.push(xk),st.queriedElements.forEach(nn=>An(a,nn,[]).push(Oe)),st.preStyleProps.forEach((nn,Oo)=>{if(nn.size){let Kn=l.get(Oo);Kn||l.set(Oo,Kn=new Set),nn.forEach((Ed,Dh)=>Kn.add(Dh))}}),st.postStyleProps.forEach((nn,Oo)=>{let Kn=c.get(Oo);Kn||c.set(Oo,Kn=new Set),nn.forEach((Ed,Dh)=>Kn.add(Dh))})});if(Xe.length){let G=[];Xe.forEach(te=>{G.push(ZT(te.triggerName,te.errors))}),Te.forEach(te=>te.destroy()),this.reportError(G)}let Me=new Map,Fe=new Map;s.forEach(G=>{let te=G.element;i.has(te)&&(Fe.set(te,te),this._beforeAnimationBuild(G.player.namespaceId,G.instruction,Me))}),r.forEach(G=>{let te=G.element;this._getPreviousPlayers(te,!1,G.namespaceId,G.triggerName,null).forEach(Oe=>{An(Me,te,[]).push(Oe),Oe.destroy()})});let nt=M.filter(G=>fk(G,l,c)),lr=new Map;dk(lr,this.driver,$,c,Mi).forEach(G=>{fk(G,l,c)&&nt.push(G)});let ki=new Map;v.forEach((G,te)=>{dk(ki,this.driver,new Set(G),l,gd)}),nt.forEach(G=>{let te=lr.get(G),le=ki.get(G);lr.set(G,new Map([...te?.entries()??[],...le?.entries()??[]]))});let js=[],Ri=[],Ai={};s.forEach(G=>{let{element:te,player:le,instruction:Oe}=G;if(i.has(te)){if(d.has(te)){le.onDestroy(()=>Ii(te,Oe.toStyles)),le.disabled=!0,le.overrideTotalTime(Oe.totalTime),r.push(le);return}let Ht=Ai;if(Fe.size>1){let Nn=te,Br=[];for(;Nn=Nn.parentNode;){let st=Fe.get(Nn);if(st){Ht=st;break}Br.push(Nn)}Br.forEach(st=>Fe.set(st,Ht))}let Oi=this._buildAnimation(le.namespaceId,Oe,Me,o,ki,lr);if(le.setRealPlayer(Oi),Ht===Ai)js.push(le);else{let Nn=this.playersByElement.get(Ht);Nn&&Nn.length&&(le.parentPlayer=Lr(Nn)),r.push(le)}}else Ro(te,Oe.fromStyles),le.onDestroy(()=>Ii(te,Oe.toStyles)),Ri.push(le),d.has(te)&&r.push(le)}),Ri.forEach(G=>{let te=o.get(G.element);if(te&&te.length){let le=Lr(te);G.setRealPlayer(le)}}),r.forEach(G=>{G.parentPlayer?G.syncPlayerEvents(G.parentPlayer):G.destroy()});for(let G=0;G<M.length;G++){let te=M[G],le=te[Ti];if(rl(te,ih),le&&le.hasAnimation)continue;let Oe=[];if(a.size){let Oi=a.get(te);Oi&&Oi.length&&Oe.push(...Oi);let Nn=this.driver.query(te,rh,!0);for(let Br=0;Br<Nn.length;Br++){let st=a.get(Nn[Br]);st&&st.length&&Oe.push(...st)}}let Ht=Oe.filter(Oi=>!Oi.destroyed);Ht.length?Zz(this,te,Ht):this.processLeaveNode(te)}return M.length=0,js.forEach(G=>{this.players.push(G),G.onDone(()=>{G.destroy();let te=this.players.indexOf(G);this.players.splice(te,1)}),G.play()}),js}afterFlush(n){this._flushFns.push(n)}afterFlushAnimationsDone(n){this._whenQuietFns.push(n)}_getPreviousPlayers(n,e,i,r,o){let s=[];if(e){let a=this.playersByQueriedElement.get(n);a&&(s=a)}else{let a=this.playersByElement.get(n);if(a){let l=!o||o==bd;a.forEach(c=>{c.queued||!l&&c.triggerName!=r||s.push(c)})}}return(i||r)&&(s=s.filter(a=>!(i&&i!=a.namespaceId||r&&r!=a.triggerName))),s}_beforeAnimationBuild(n,e,i){let r=e.triggerName,o=e.element,s=e.isRemovalTransition?void 0:n,a=e.isRemovalTransition?void 0:r;for(let l of e.timelines){let c=l.element,d=c!==o,p=An(i,c,[]);this._getPreviousPlayers(c,d,s,a,e.toState).forEach(v=>{let y=v.getRealPlayer();y.beforeDestroy&&y.beforeDestroy(),v.destroy(),p.push(v)})}Ro(o,e.fromStyles)}_buildAnimation(n,e,i,r,o,s){let a=e.triggerName,l=e.element,c=[],d=new Set,p=new Set,_=e.timelines.map(y=>{let D=y.element;d.add(D);let M=D[Ti];if(M&&M.removedBeforeQueried)return new Fr(y.duration,y.delay);let R=D!==l,$=Xz((i.get(D)||Wz).map(Me=>Me.getRealPlayer())).filter(Me=>{let Fe=Me;return Fe.element?Fe.element===D:!1}),Ee=o.get(D),pe=s.get(D),Te=t0(this._normalizer,y.keyframes,Ee,pe),Xe=this._buildPlayer(y,Te,$);if(y.subTimeline&&r&&p.add(D),R){let Me=new Dd(n,a,D);Me.setRealPlayer(Xe),c.push(Me)}return Xe});c.forEach(y=>{An(this.playersByQueriedElement,y.element,[]).push(y),y.onDone(()=>Kz(this.playersByQueriedElement,y.element,y))}),d.forEach(y=>ui(y,a0));let v=Lr(_);return v.onDestroy(()=>{d.forEach(y=>rl(y,a0)),Ii(l,e.toStyles)}),p.forEach(y=>{An(r,y,[]).push(v)}),v}_buildPlayer(n,e,i){return e.length>0?this.driver.animate(n.element,e,n.duration,n.delay,n.easing,i):new Fr(n.duration,n.delay)}},Dd=class{namespaceId;triggerName;element;_player=new Fr;_containsRealPlayer=!1;_queuedCallbacks=new Map;destroyed=!1;parentPlayer=null;markedForDestroy=!1;disabled=!1;queued=!0;totalTime=0;constructor(n,e,i){this.namespaceId=n,this.triggerName=e,this.element=i}setRealPlayer(n){this._containsRealPlayer||(this._player=n,this._queuedCallbacks.forEach((e,i)=>{e.forEach(r=>eh(n,i,void 0,r))}),this._queuedCallbacks.clear(),this._containsRealPlayer=!0,this.overrideTotalTime(n.totalTime),this.queued=!1)}getRealPlayer(){return this._player}overrideTotalTime(n){this.totalTime=n}syncPlayerEvents(n){let e=this._player;e.triggerCallback&&n.onStart(()=>e.triggerCallback("start")),n.onDone(()=>this.finish()),n.onDestroy(()=>this.destroy())}_queueEvent(n,e){An(this._queuedCallbacks,n,[]).push(e)}onDone(n){this.queued&&this._queueEvent("done",n),this._player.onDone(n)}onStart(n){this.queued&&this._queueEvent("start",n),this._player.onStart(n)}onDestroy(n){this.queued&&this._queueEvent("destroy",n),this._player.onDestroy(n)}init(){this._player.init()}hasStarted(){return this.queued?!1:this._player.hasStarted()}play(){!this.queued&&this._player.play()}pause(){!this.queued&&this._player.pause()}restart(){!this.queued&&this._player.restart()}finish(){this._player.finish()}destroy(){this.destroyed=!0,this._player.destroy()}reset(){!this.queued&&this._player.reset()}setPosition(n){this.queued||this._player.setPosition(n)}getPosition(){return this.queued?0:this._player.getPosition()}triggerCallback(n){let e=this._player;e.triggerCallback&&e.triggerCallback(n)}};function Kz(t,n,e){let i=t.get(n);if(i){if(i.length){let r=i.indexOf(e);i.splice(r,1)}i.length==0&&t.delete(n)}return i}function Yz(t){return t??null}function ch(t){return t&&t.nodeType===1}function Qz(t){return t=="start"||t=="done"}function ck(t,n){let e=t.style.display;return t.style.display=n??"none",e}function dk(t,n,e,i,r){let o=[];e.forEach(l=>o.push(ck(l)));let s=[];i.forEach((l,c)=>{let d=new Map;l.forEach(p=>{let _=n.computeStyle(c,p,r);d.set(p,_),(!_||_.length==0)&&(c[Ti]=qz,s.push(c))}),t.set(c,d)});let a=0;return e.forEach(l=>ck(l,o[a++])),s}function uk(t,n){let e=new Map;if(t.forEach(a=>e.set(a,[])),n.length==0)return e;let i=1,r=new Set(n),o=new Map;function s(a){if(!a)return i;let l=o.get(a);if(l)return l;let c=a.parentNode;return e.has(c)?l=c:r.has(c)?l=i:l=s(c),o.set(a,l),l}return n.forEach(a=>{let l=s(a);l!==i&&e.get(l).push(a)}),e}function ui(t,n){t.classList?.add(n)}function rl(t,n){t.classList?.remove(n)}function Zz(t,n,e){Lr(e).onDone(()=>t.processLeaveNode(n))}function Xz(t){let n=[];return _k(t,n),n}function _k(t,n){for(let e=0;e<t.length;e++){let i=t[e];i instanceof tl?_k(i.players,n):n.push(i)}}function Jz(t,n){let e=Object.keys(t),i=Object.keys(n);if(e.length!=i.length)return!1;for(let r=0;r<e.length;r++){let o=e[r];if(!n.hasOwnProperty(o)||t[o]!==n[o])return!1}return!0}function fk(t,n,e){let i=e.get(t);if(!i)return!1;let r=n.get(t);return r?i.forEach(o=>r.add(o)):n.set(t,i),e.delete(t),!0}var ol=class{_driver;_normalizer;_transitionEngine;_timelineEngine;_triggerCache={};onRemovalComplete=(n,e)=>{};constructor(n,e,i){this._driver=e,this._normalizer=i,this._transitionEngine=new D0(n.body,e,i),this._timelineEngine=new C0(n.body,e,i),this._transitionEngine.onRemovalComplete=(r,o)=>this.onRemovalComplete(r,o)}registerTrigger(n,e,i,r,o){let s=n+"-"+r,a=this._triggerCache[s];if(!a){let l=[],c=[],d=pk(this._driver,o,l,c);if(l.length)throw HT(r,l);a=Vz(r,d,this._normalizer),this._triggerCache[s]=a}this._transitionEngine.registerTrigger(e,r,a)}register(n,e){this._transitionEngine.register(n,e)}destroy(n,e){this._transitionEngine.destroy(n,e)}onInsert(n,e,i,r){this._transitionEngine.insertNode(n,e,i,r)}onRemove(n,e,i){this._transitionEngine.removeNode(n,e,i)}disableAnimations(n,e){this._transitionEngine.markElementAsDisabled(n,e)}process(n,e,i,r){if(i.charAt(0)=="@"){let[o,s]=n0(i),a=r;this._timelineEngine.command(o,e,s,a)}else this._transitionEngine.trigger(n,e,i,r)}listen(n,e,i,r,o){if(i.charAt(0)=="@"){let[s,a]=n0(i);return this._timelineEngine.listen(s,e,a,o)}return this._transitionEngine.listen(n,e,i,r,o)}flush(n=-1){this._transitionEngine.flush(n)}get players(){return[...this._transitionEngine.players,...this._timelineEngine.players]}whenRenderingDone(){return this._transitionEngine.whenRenderingDone()}afterFlushAnimationsDone(n){this._transitionEngine.afterFlushAnimationsDone(n)}};function eU(t,n){let e=null,i=null;return Array.isArray(n)&&n.length?(e=m0(n[0]),n.length>1&&(i=m0(n[n.length-1]))):n instanceof Map&&(e=m0(n)),e||i?new tU(t,e,i):null}var tU=(()=>{class t{_element;_startStyles;_endStyles;static initialStylesByElement=new WeakMap;_state=0;_initialStyles;constructor(e,i,r){this._element=e,this._startStyles=i,this._endStyles=r;let o=t.initialStylesByElement.get(e);o||t.initialStylesByElement.set(e,o=new Map),this._initialStyles=o}start(){this._state<1&&(this._startStyles&&Ii(this._element,this._startStyles,this._initialStyles),this._state=1)}finish(){this.start(),this._state<2&&(Ii(this._element,this._initialStyles),this._endStyles&&(Ii(this._element,this._endStyles),this._endStyles=null),this._state=1)}destroy(){this.finish(),this._state<3&&(t.initialStylesByElement.delete(this._element),this._startStyles&&(Ro(this._element,this._startStyles),this._endStyles=null),this._endStyles&&(Ro(this._element,this._endStyles),this._endStyles=null),Ii(this._element,this._initialStyles),this._state=3)}}return t})();function m0(t){let n=null;return t.forEach((e,i)=>{nU(i)&&(n=n||new Map,n.set(i,e))}),n}function nU(t){return t==="display"||t==="position"}var gh=class{element;keyframes;options;_specialStyles;_onDoneFns=[];_onStartFns=[];_onDestroyFns=[];_duration;_delay;_initialized=!1;_finished=!1;_started=!1;_destroyed=!1;_finalKeyframe;_originalOnDoneFns=[];_originalOnStartFns=[];domPlayer=null;time=0;parentPlayer=null;currentSnapshot=new Map;constructor(n,e,i,r){this.element=n,this.keyframes=e,this.options=i,this._specialStyles=r,this._duration=i.duration,this._delay=i.delay||0,this.time=this._duration+this._delay}_onFinish(){this._finished||(this._finished=!0,this._onDoneFns.forEach(n=>n()),this._onDoneFns=[])}init(){this._buildPlayer()&&this._preparePlayerBeforeStart()}_buildPlayer(){if(this._initialized)return this.domPlayer;this._initialized=!0;let n=this.keyframes,e=this._triggerWebAnimation(this.element,n,this.options);if(!e)return this._onFinish(),null;this.domPlayer=e,this._finalKeyframe=n.length?n[n.length-1]:new Map;let i=()=>this._onFinish();return e.addEventListener("finish",i),this.onDestroy(()=>{e.removeEventListener("finish",i)}),e}_preparePlayerBeforeStart(){this._delay?this._resetDomPlayerState():this.domPlayer?.pause()}_convertKeyframesToObject(n){let e=[];return n.forEach(i=>{e.push(Object.fromEntries(i))}),e}_triggerWebAnimation(n,e,i){let r=this._convertKeyframesToObject(e);try{return n.animate(r,i)}catch{return null}}onStart(n){this._originalOnStartFns.push(n),this._onStartFns.push(n)}onDone(n){this._originalOnDoneFns.push(n),this._onDoneFns.push(n)}onDestroy(n){this._onDestroyFns.push(n)}play(){let n=this._buildPlayer();n&&(this.hasStarted()||(this._onStartFns.forEach(e=>e()),this._onStartFns=[],this._started=!0,this._specialStyles&&this._specialStyles.start()),n.play())}pause(){this.init(),this.domPlayer?.pause()}finish(){this.init(),this.domPlayer&&(this._specialStyles&&this._specialStyles.finish(),this._onFinish(),this.domPlayer.finish())}reset(){this._resetDomPlayerState(),this._destroyed=!1,this._finished=!1,this._started=!1,this._onStartFns=this._originalOnStartFns,this._onDoneFns=this._originalOnDoneFns}_resetDomPlayerState(){this.domPlayer?.cancel()}restart(){this.reset(),this.play()}hasStarted(){return this._started}destroy(){this._destroyed||(this._destroyed=!0,this._resetDomPlayerState(),this._onFinish(),this._specialStyles&&this._specialStyles.destroy(),this._onDestroyFns.forEach(n=>n()),this._onDestroyFns=[])}setPosition(n){this.domPlayer||this.init(),this.domPlayer&&(this.domPlayer.currentTime=n*this.time)}getPosition(){return this.domPlayer?+(this.domPlayer.currentTime??0)/this.time:this._initialized?1:0}get totalTime(){return this._delay+this._duration}beforeDestroy(){let n=new Map;this.hasStarted()&&this._finalKeyframe.forEach((i,r)=>{r!=="offset"&&n.set(r,this._finished?i:sh(this.element,r))}),this.currentSnapshot=n}triggerCallback(n){let e=n==="start"?this._onStartFns:this._onDoneFns;e.forEach(i=>i()),e.length=0}},vh=class{validateStyleProperty(n){return!0}validateAnimatableStyleProperty(n){return!0}containsElement(n,e){return i0(n,e)}getParentElement(n){return nh(n)}query(n,e,i){return r0(n,e,i)}computeStyle(n,e,i){return sh(n,e)}animate(n,e,i,r,o,s=[]){let a=r==0?"both":"forwards",l={duration:i,delay:r,fill:a};o&&(l.easing=o);let c=new Map,d=s.filter(v=>v instanceof gh);tk(i,r)&&d.forEach(v=>{v.currentSnapshot.forEach((y,D)=>c.set(D,y))});let p=JT(e).map(v=>new Map(v));p=nk(n,p,c);let _=eU(n,p);return new gh(n,p,l,_)}};var dh="@",yk="@.disabled",_h=class{namespaceId;delegate;engine;_onDestroy;\u0275type=0;constructor(n,e,i,r){this.namespaceId=n,this.delegate=e,this.engine=i,this._onDestroy=r}get data(){return this.delegate.data}destroyNode(n){this.delegate.destroyNode?.(n)}destroy(){this.engine.destroy(this.namespaceId,this.delegate),this.engine.afterFlushAnimationsDone(()=>{queueMicrotask(()=>{this.delegate.destroy()})}),this._onDestroy?.()}createElement(n,e){return this.delegate.createElement(n,e)}createComment(n){return this.delegate.createComment(n)}createText(n){return this.delegate.createText(n)}appendChild(n,e){this.delegate.appendChild(n,e),this.engine.onInsert(this.namespaceId,e,n,!1)}insertBefore(n,e,i,r=!0){this.delegate.insertBefore(n,e,i),this.engine.onInsert(this.namespaceId,e,n,r)}removeChild(n,e,i,r){if(r){this.delegate.removeChild(n,e,i,r);return}this.parentNode(e)&&this.engine.onRemove(this.namespaceId,e,this.delegate)}selectRootElement(n,e){return this.delegate.selectRootElement(n,e)}parentNode(n){return this.delegate.parentNode(n)}nextSibling(n){return this.delegate.nextSibling(n)}setAttribute(n,e,i,r){this.delegate.setAttribute(n,e,i,r)}removeAttribute(n,e,i){this.delegate.removeAttribute(n,e,i)}addClass(n,e){this.delegate.addClass(n,e)}removeClass(n,e){this.delegate.removeClass(n,e)}setStyle(n,e,i,r){this.delegate.setStyle(n,e,i,r)}removeStyle(n,e,i){this.delegate.removeStyle(n,e,i)}setProperty(n,e,i){e.charAt(0)==dh&&e==yk?this.disableAnimations(n,!!i):this.delegate.setProperty(n,e,i)}setValue(n,e){this.delegate.setValue(n,e)}listen(n,e,i,r){return this.delegate.listen(n,e,i,r)}disableAnimations(n,e){this.engine.disableAnimations(n,e)}},E0=class extends _h{factory;constructor(n,e,i,r,o){super(e,i,r,o),this.factory=n,this.namespaceId=e}setProperty(n,e,i){e.charAt(0)==dh?e.charAt(1)=="."&&e==yk?(i=i===void 0?!0:!!i,this.disableAnimations(n,i)):this.engine.process(this.namespaceId,n,e.slice(1),i):this.delegate.setProperty(n,e,i)}listen(n,e,i,r){if(e.charAt(0)==dh){let o=iU(n),s=e.slice(1),a="";return s.charAt(0)!=dh&&([s,a]=rU(s)),this.engine.listen(this.namespaceId,o,s,a,l=>{let c=l._data||-1;this.factory.scheduleListenerCallback(c,i,l)})}return this.delegate.listen(n,e,i,r)}};function iU(t){switch(t){case"body":return document.body;case"document":return document;case"window":return window;default:return t}}function rU(t){let n=t.indexOf("."),e=t.substring(0,n),i=t.slice(n+1);return[e,i]}var yh=class{delegate;engine;_zone;_currentId=0;_microtaskId=1;_animationCallbacksBuffer=[];_rendererCache=new Map;_cdRecurDepth=0;constructor(n,e,i){this.delegate=n,this.engine=e,this._zone=i,e.onRemovalComplete=(r,o)=>{o?.removeChild(null,r)}}createRenderer(n,e){let r=this.delegate.createRenderer(n,e);if(!n||!e?.data?.animation){let c=this._rendererCache,d=c.get(r);if(!d){let p=()=>c.delete(r);d=new _h("",r,this.engine,p),c.set(r,d)}return d}let o=e.id,s=e.id+"-"+this._currentId;this._currentId++,this.engine.register(s,n);let a=c=>{Array.isArray(c)?c.forEach(a):this.engine.registerTrigger(o,s,n,c.name,c)};return e.data.animation.forEach(a),new E0(this,s,r,this.engine)}begin(){this._cdRecurDepth++,this.delegate.begin&&this.delegate.begin()}_scheduleCountTask(){queueMicrotask(()=>{this._microtaskId++})}scheduleListenerCallback(n,e,i){if(n>=0&&n<this._microtaskId){this._zone.run(()=>e(i));return}let r=this._animationCallbacksBuffer;r.length==0&&queueMicrotask(()=>{this._zone.run(()=>{r.forEach(o=>{let[s,a]=o;s(a)}),this._animationCallbacksBuffer=[]})}),r.push([e,i])}end(){this._cdRecurDepth--,this._cdRecurDepth==0&&this._zone.runOutsideAngular(()=>{this._scheduleCountTask(),this.engine.flush(this._microtaskId)}),this.delegate.end&&this.delegate.end()}whenRenderingDone(){return this.engine.whenRenderingDone()}componentReplaced(n){this.engine.flush(),this.delegate.componentReplaced?.(n)}};var sU=(()=>{class t extends ol{constructor(e,i,r){super(e,i,r)}ngOnDestroy(){this.flush()}static \u0275fac=function(i){return new(i||t)(A(Y),A(Bs),A(Vs))};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})();function aU(){return new uh}function lU(){return new yh(u(_c),u(ol),u(U))}var Ck=[{provide:Vs,useFactory:aU},{provide:ol,useClass:sU},{provide:ct,useFactory:lU}],cU=[{provide:Bs,useClass:S0},{provide:so,useValue:"NoopAnimations"},...Ck],bk=[{provide:Bs,useFactory:()=>new vh},{provide:so,useFactory:()=>"BrowserAnimations"},...Ck],wk=(()=>{class t{static withConfig(e){return{ngModule:t,providers:e.disableAnimations?cU:bk}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({providers:bk,imports:[fy]})}return t})();var bh=class t{constructor(n,e){this.authService=n;this.router=e}intercept(n,e){return e.handle(n).pipe(mi(i=>(i.status===401&&(this.authService.clearSession(),this.router.navigate(["/login"])),zo(()=>i))))}static \u0275fac=function(e){return new(e||t)(A(di),A(Ae))};static \u0275prov=C({token:t,factory:t.\u0275fac})};var Dk={providers:[Qy(DT),{provide:om,useClass:bh,multi:!0},{provide:lp,useValue:{appearance:"fill",floatLabel:"always"}},Cu(by,Mt,Ge,wn,wk)]};var dU=["*",[["mat-toolbar-row"]]],uU=["*","mat-toolbar-row"],fU=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=V({type:t,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return t})(),Ek=(()=>{class t{_elementRef=u(z);_platform=u(Re);_document=u(Y);color;_toolbarRows;constructor(){}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=O({type:t,selectors:[["mat-toolbar"]],contentQueries:function(i,r,o){if(i&1&&Et(o,fU,5),i&2){let s;q(s=K())&&(r._toolbarRows=s)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(i,r){i&2&&(_t(r.color?"mat-"+r.color:""),P("mat-toolbar-multiple-rows",r._toolbarRows.length>0)("mat-toolbar-single-row",r._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:uU,decls:2,vars:0,template:function(i,r){i&1&&(Ie(dU),re(0),re(1,1))},styles:[`.mat-toolbar {
  background: var(--mat-toolbar-container-background-color, var(--mat-sys-surface));
  color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}
.mat-toolbar, .mat-toolbar h1, .mat-toolbar h2, .mat-toolbar h3, .mat-toolbar h4, .mat-toolbar h5, .mat-toolbar h6 {
  font-family: var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));
  font-size: var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));
  line-height: var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-weight: var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));
  letter-spacing: var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));
  margin: 0;
}
@media (forced-colors: active) {
  .mat-toolbar {
    outline: solid 1px;
  }
}
.mat-toolbar .mat-form-field-underline,
.mat-toolbar .mat-form-field-ripple,
.mat-toolbar .mat-focused .mat-form-field-ripple {
  background-color: currentColor;
}
.mat-toolbar .mat-form-field-label,
.mat-toolbar .mat-focused .mat-form-field-label,
.mat-toolbar .mat-select-value,
.mat-toolbar .mat-select-arrow,
.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {
  color: inherit;
}
.mat-toolbar .mat-input-element {
  caret-color: currentColor;
}
.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed {
  --mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
  --mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}

.mat-toolbar-row, .mat-toolbar-single-row {
  display: flex;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-row, .mat-toolbar-single-row {
    height: var(--mat-toolbar-mobile-height, 56px);
  }
}

.mat-toolbar-multiple-rows {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  min-height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-multiple-rows {
    min-height: var(--mat-toolbar-mobile-height, 56px);
  }
}
`],encapsulation:2,changeDetection:0})}return t})();var Sk=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=L({imports:[me]})}return t})();function pU(t,n){if(t&1){let e=Ke();f(0,"a",5),k("click",function(){oe(e);let r=E();return se(r.navigateTo("/add"))}),f(1,"mat-icon"),g(2,"add_circle_outline"),m(),f(3,"span",6),g(4,"Buchung"),m()()}if(t&2){let e=E();P("active",e.isActive("/add"))("mobile-hide-label",!e.isActive("/add"))}}function hU(t,n){if(t&1){let e=Ke();f(0,"a",5),k("click",function(){oe(e);let r=E();return se(r.navigateTo("/settings"))}),f(1,"mat-icon"),g(2,"settings"),m(),f(3,"span",6),g(4,"Konfiguration"),m()()}if(t&2){let e=E();P("active",e.isActive("/settings"))("mobile-hide-label",!e.isActive("/settings"))}}function gU(t,n){if(t&1&&(f(0,"mat-option",16),g(1),m()),t&2){let e=n.$implicit;b("value",e.id),h(),X(" ",e.label," ")}}function vU(t,n){t&1&&(f(0,"div",17)(1,"div",18),g(2," Der aktuelle Zugang hat keine Schreibrechte. Jegliche Speicher- oder Bearbeitungsoperationen werden nicht ausgef\xFChrt. "),m()())}var Ch=class t{constructor(n,e,i,r,o){this.router=n;this.accountService=e;this.themeService=i;this.filterService=r;this.snackBar=o;this.activeAccount=this.accountService.activeAccount}activeAccount;readonly=!1;accounts=[];ngOnInit(){this.filterService.load(),this.accountService.getAccounts().subscribe(n=>{this.accounts=n,this.activeAccount()||this.accountService.activeAccount.set(n[0]??null)}),this.accountService.loadActiveAccount().subscribe()}isActive(n){return this.router.url===n}navigateTo(n){this.router.navigate([n])}selectAccount(n){this.accounts.find(i=>i.id===n)&&this.accountService.setActiveAccount(n).subscribe(()=>{window.location.reload()})}toggleTheme(){this.themeService.toggleTheme(),this.themeService.darkMode()&&this.snackBar.open("Dunkelmodus befindet sich noch in der Beta-Phase.","OK",{duration:5e3,horizontalPosition:"start",verticalPosition:"bottom"})}static \u0275fac=function(e){return new(e||t)(I(Ae),I(or),I(el),I(ko),I(pd))};static \u0275cmp=O({type:t,selectors:[["app-header"]],decls:39,vars:22,consts:[["color","primary",1,"app-toolbar"],["role","presentation",1,"logo-group"],["mat-icon-button","","routerLink","/","aria-label","Home",1,"logo-link"],["src","/logo.png","alt","Mini Kassenbuch Logo"],["aria-label","Primary",1,"nav-actions"],["mat-button","",3,"click"],[1,"nav-label"],["mat-button","",3,"active","mobile-hide-label","click",4,"ngIf"],["mat-icon-button","","aria-label","Toggle dark mode",2,"color","white",3,"click","matTooltip"],[2,"color","white","font-size","24px","width","24px","height","24px"],["aria-label","Current year",1,"current-year-block"],[1,"current-year"],[1,"account-select"],[3,"selectionChange","value"],[3,"value",4,"ngFor","ngForOf"],["class","info-panel",4,"ngIf"],[3,"value"],[1,"info-panel"],[1,"info"]],template:function(e,i){if(e&1&&(f(0,"mat-toolbar",0)(1,"div",1)(2,"a",2),W(3,"img",3),m()(),f(4,"nav",4)(5,"a",5),k("click",function(){return i.navigateTo("/")}),f(6,"mat-icon"),g(7,"list"),m(),f(8,"span",6),g(9,"Liste"),m()(),j(10,pU,5,4,"a",7),f(11,"a",5),k("click",function(){return i.navigateTo("/reports")}),f(12,"mat-icon"),g(13,"timeline"),m(),f(14,"span",6),g(15,"Berichte"),m()(),f(16,"a",5),k("click",function(){return i.navigateTo("/categories")}),f(17,"mat-icon"),g(18,"view_comfy"),m(),f(19,"span",6),g(20,"Kategorien"),m()(),f(21,"a",5),k("click",function(){return i.navigateTo("/import")}),f(22,"mat-icon"),g(23,"cloud_upload"),m(),f(24,"span",6),g(25,"Importieren"),m()(),j(26,hU,5,4,"a",7),m(),f(27,"button",8),k("click",function(){return i.toggleTheme()}),f(28,"mat-icon",9),g(29),m()(),f(30,"div",10)(31,"span",11),g(32),m()(),f(33,"mat-form-field",12)(34,"mat-label"),g(35,"Konto"),m(),f(36,"mat-select",13),k("selectionChange",function(o){return i.selectAccount(o.value)}),j(37,gU,2,2,"mat-option",14),m()()(),j(38,vU,3,0,"div",15)),e&2){let r;h(5),P("active",i.isActive("/"))("mobile-hide-label",!i.isActive("/")),h(5),b("ngIf",!i.readonly),h(),P("active",i.isActive("/reports"))("mobile-hide-label",!i.isActive("/reports")),h(5),P("active",i.isActive("/categories"))("mobile-hide-label",!i.isActive("/categories")),h(5),P("mobile-hide-label",!i.isActive("/import")),h(5),b("ngIf",!i.readonly),h(),b("matTooltip",i.themeService.darkMode()?"Hellmodus":"Dunkelmodus"),h(2),ee(i.themeService.darkMode()?"brightness_7":"brightness_4"),h(3),ee(i.filterService.filterYear()),h(4),b("value",(r=i.activeAccount())==null?null:r.id),h(),b("ngForOf",i.accounts),h(),b("ngIf",i.readonly)}},dependencies:[Ge,Mn,Lt,bt,qt,jt,Mo,xp,xo,Sk,Ek,Yt,Kt,Rr,Zt,Qt,Io,Pr,Vp],styles:[".app-toolbar[_ngcontent-%COMP%]{position:sticky;top:0;z-index:1000;display:flex;justify-content:start;padding:.5rem 1rem;height:auto!important;min-height:82px;background-color:#2196f3;align-items:center;flex-wrap:wrap;gap:.5rem}@media(max-width:768px){.app-toolbar[_ngcontent-%COMP%]{padding:0 .5rem;gap:.25rem}}.logo-group[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem;padding:0;flex-shrink:0;margin-right:1rem}.logo-link[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:32px;width:auto}.title-block[_ngcontent-%COMP%]{display:flex;flex-direction:column;font-size:.9rem}.app-title[_ngcontent-%COMP%]{font-weight:600}.current-year[_ngcontent-%COMP%]{font-size:.75rem;color:#fffc}.nav-actions[_ngcontent-%COMP%]{display:flex;gap:.5rem;flex-wrap:wrap;align-items:center;margin-left:3.5rem;flex:1}@media(max-width:768px){.nav-actions[_ngcontent-%COMP%]{margin-left:2rem;gap:.25rem}}.nav-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.25rem;color:#fff;white-space:nowrap;padding:8px 12px;border-radius:4px;transition:background .2s ease}@media(max-width:768px){.nav-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding:8px}.nav-actions[_ngcontent-%COMP%]   a.mobile-hide-label[_ngcontent-%COMP%]   .nav-label[_ngcontent-%COMP%]{display:none}}@media(max-width:480px){.nav-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding:6px}.nav-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin:0}}@media(max-width:1230px){.nav-label[_ngcontent-%COMP%]{display:none}}.nav-actions[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%]{background:#ffffff40}.account-select[_ngcontent-%COMP%]{min-width:220px;margin-left:.5rem;padding-top:.5rem}@media(max-width:1024px){.account-select[_ngcontent-%COMP%]{min-width:180px;font-size:.9rem}}@media(max-width:768px){.account-select[_ngcontent-%COMP%]{min-width:140px;margin-left:.25rem;font-size:.85rem}.account-select[_ngcontent-%COMP%]     .mat-mdc-form-field{font-size:.85rem}.account-select[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper{padding-bottom:.5em}}@media(max-width:480px){.account-select[_ngcontent-%COMP%]{min-width:100px;font-size:.75rem}}.current-year-block[_ngcontent-%COMP%]{display:flex;align-items:center;flex-shrink:0;margin-right:1rem}@media(max-width:480px){.current-year-block[_ngcontent-%COMP%]{display:none}}.current-year-block[_ngcontent-%COMP%]   .current-year[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:600;color:#fff}@media(max-width:1024px){.current-year-block[_ngcontent-%COMP%]   .current-year[_ngcontent-%COMP%]{font-size:1.2rem}}@media(max-width:768px){.current-year-block[_ngcontent-%COMP%]   .current-year[_ngcontent-%COMP%]{font-size:1rem}}.account-select[_ngcontent-%COMP%]   .mat-form-field-outline[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{stroke:#ffffffb3}.info-panel[_ngcontent-%COMP%]{margin:.5rem 1rem;background-color:transparent}input[_ngcontent-%COMP%]::-webkit-outer-spin-button, input[_ngcontent-%COMP%]::-webkit-inner-spin-button{display:none}.theme-toggle[_ngcontent-%COMP%]{color:#fff!important}.theme-toggle[_ngcontent-%COMP%]     .mat-icon{color:#fff!important}.theme-toggle[_ngcontent-%COMP%]     .mdc-icon-button{color:#fff!important}.theme-toggle[_ngcontent-%COMP%]     svg{fill:#fff!important}"]})};function _U(t,n){t&1&&W(0,"app-header")}var wh=class t{constructor(n,e){this.authService=n;this.router=e;this.showHeader.set(!this.router.url.startsWith("/login")),this.router.events.subscribe(i=>{i instanceof In&&this.showHeader.set(!i.urlAfterRedirects.startsWith("/login"))})}title=T("mini-kassenbuch");showHeader=T(!0);static \u0275fac=function(e){return new(e||t)(I(di),I(Ae))};static \u0275cmp=O({type:t,selectors:[["app-root"]],decls:3,vars:1,consts:[[4,"ngIf"]],template:function(e,i){e&1&&(j(0,_U,1,0,"app-header",0),f(1,"main"),W(2,"router-outlet"),m()),e&2&&b("ngIf",i.showHeader())},dependencies:[Ge,Lt,Nc,Ch],styles:["[_nghost-%COMP%]{display:block;min-height:100vh}main[_ngcontent-%COMP%]{min-height:calc(100vh - 4rem);width:100%;padding:2rem 2.5rem 3rem;box-sizing:border-box}main[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{max-width:960px;margin:0 auto;min-height:100%}"]})};uy(wh,Dk).catch(t=>console.error(t));
