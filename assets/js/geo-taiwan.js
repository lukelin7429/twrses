(()=>{var Jn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Kn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},nc=0,Ea=1,ic=2;var ys=1,sc=2,Gi=3,Xn=0,Pe=1,Te=2,wn=0,Oi=1,_a=2,Ma=3,xa=4,rc=5;var oi=100,oc=101,ac=102,Ac=103,cc=104,lc=200,hc=201,uc=202,dc=203,ya=204,va=205,fc=206,pc=207,gc=208,mc=209,Bc=210,wc=211,Cc=212,Ec=213,_c=214,Ar=0,cr=1,lr=2,Si=3,hr=4,ur=5,dr=6,fr=7,kr=0,Mc=1,xc=2,An=0,Sa=1,ba=2,Ia=3,Da=4,Ta=5,Qa=6,Fa=7;var Ra=300,Zn=301,ai=302,Vr=303,zr=304,vs=306,pr=1e3,pn=1001,gr=1002,Ee=1003,yc=1004;var Ss=1005;var Me=1006,Yr=1007;var qn=1008;var He=1009,Ua=1010,Pa=1011,Hi=1012,Wr=1013,cn=1014,ln=1015,hn=1016,Jr=1017,Kr=1018,ki=1020,La=35902,Na=35899,Ga=1021,Oa=1022,$e=1023,mn=1026,jn=1027,Ha=1028,Xr=1029,$n=1030,Zr=1031;var qr=1033,bs=33776,Is=33777,Ds=33778,Ts=33779,jr=35840,$r=35841,to=35842,eo=35843,no=36196,io=37492,so=37496,ro=37488,oo=37489,Qs=37490,ao=37491,Ao=37808,co=37809,lo=37810,ho=37811,uo=37812,fo=37813,po=37814,go=37815,mo=37816,Bo=37817,wo=37818,Co=37819,Eo=37820,_o=37821,Mo=36492,xo=36494,yo=36495,vo=36283,So=36284,Fs=36285,bo=36286;var os=2300,mr=2301,or=2302,da=2303,fa=2400,pa=2401,ga=2402;var vc=3200;var Io=0,Sc=1,Dn="",Ne="srgb",as="srgb-linear",As="linear",jt="srgb";var ar=7680;var bc=519,Ic=512,Dc=513,Tc=514,Do=515,Qc=516,Fc=517,To=518,Rc=519,Uc=35044;var ka="300 es",rn=2e3,bi=2001;function Ol(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Hl(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function cs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Pc(){let i=cs("canvas");return i.style.display="block",i}var DA={},Ii=null;function Va(...i){let t="THREE."+i.shift();Ii?Ii("log",t,...i):console.log(t,...i)}function Lc(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Qt(...i){i=Lc(i);let t="THREE."+i.shift();if(Ii)Ii("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Ft(...i){i=Lc(i);let t="THREE."+i.shift();if(Ii)Ii("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function ri(...i){let t=i.join(" ");t in DA||(DA[t]=!0,Qt(...i))}function Nc(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Gc={[Ar]:cr,[lr]:dr,[hr]:fr,[Si]:ur,[cr]:Ar,[dr]:lr,[fr]:hr,[ur]:Si},on=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Se=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],TA=1234567,ss=Math.PI/180,Di=180/Math.PI;function Vi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Se[i&255]+Se[i>>8&255]+Se[i>>16&255]+Se[i>>24&255]+"-"+Se[t&255]+Se[t>>8&255]+"-"+Se[t>>16&15|64]+Se[t>>24&255]+"-"+Se[e&63|128]+Se[e>>8&255]+"-"+Se[e>>16&255]+Se[e>>24&255]+Se[n&255]+Se[n>>8&255]+Se[n>>16&255]+Se[n>>24&255]).toLowerCase()}function kt(i,t,e){return Math.max(t,Math.min(e,i))}function za(i,t){return(i%t+t)%t}function kl(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Vl(i,t,e){return i!==t?(e-i)/(t-i):0}function rs(i,t,e){return(1-e)*i+e*t}function zl(i,t,e,n){return rs(i,t,1-Math.exp(-e*n))}function Yl(i,t=1){return t-Math.abs(za(i,t*2)-t)}function Wl(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Jl(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Kl(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Xl(i,t){return i+Math.random()*(t-i)}function Zl(i){return i*(.5-Math.random())}function ql(i){i!==void 0&&(TA=i);let t=TA+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function jl(i){return i*ss}function $l(i){return i*Di}function th(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function eh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function nh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ih(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),A=r((t+n)/2),u=o((t+n)/2),f=r((t-n)/2),h=o((t-n)/2),p=r((n-t)/2),B=o((n-t)/2);switch(s){case"XYX":i.set(a*u,c*f,c*h,a*A);break;case"YZY":i.set(c*h,a*u,c*f,a*A);break;case"ZXZ":i.set(c*f,c*h,a*u,a*A);break;case"XZX":i.set(a*u,c*B,c*p,a*A);break;case"YXY":i.set(c*p,a*u,c*B,a*A);break;case"ZYZ":i.set(c*B,c*p,a*u,a*A);break;default:Qt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function yi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ue(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Ya={DEG2RAD:ss,RAD2DEG:Di,generateUUID:Vi,clamp:kt,euclideanModulo:za,mapLinear:kl,inverseLerp:Vl,lerp:rs,damp:zl,pingpong:Yl,smoothstep:Wl,smootherstep:Jl,randInt:Kl,randFloat:Xl,randFloatSpread:Zl,seededRandom:ql,degToRad:jl,radToDeg:$l,isPowerOfTwo:th,ceilPowerOfTwo:eh,floorPowerOfTwo:nh,setQuaternionFromProperEuler:ih,normalize:Ue,denormalize:yi},Za=class Za{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Za.prototype.isVector2=!0;var Rt=Za,Je=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],A=n[s+1],u=n[s+2],f=n[s+3],h=r[o+0],p=r[o+1],B=r[o+2],M=r[o+3];if(f!==M||c!==h||A!==p||u!==B){let d=c*h+A*p+u*B+f*M;d<0&&(h=-h,p=-p,B=-B,M=-M,d=-d);let l=1-a;if(d<.9995){let y=Math.acos(d),v=Math.sin(y);l=Math.sin(l*y)/v,a=Math.sin(a*y)/v,c=c*l+h*a,A=A*l+p*a,u=u*l+B*a,f=f*l+M*a}else{c=c*l+h*a,A=A*l+p*a,u=u*l+B*a,f=f*l+M*a;let y=1/Math.sqrt(c*c+A*A+u*u+f*f);c*=y,A*=y,u*=y,f*=y}}t[e]=c,t[e+1]=A,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],A=n[s+2],u=n[s+3],f=r[o],h=r[o+1],p=r[o+2],B=r[o+3];return t[e]=a*B+u*f+c*p-A*h,t[e+1]=c*B+u*h+A*f-a*p,t[e+2]=A*B+u*p+a*h-c*f,t[e+3]=u*B-a*f-c*h-A*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,A=a(n/2),u=a(s/2),f=a(r/2),h=c(n/2),p=c(s/2),B=c(r/2);switch(o){case"XYZ":this._x=h*u*f+A*p*B,this._y=A*p*f-h*u*B,this._z=A*u*B+h*p*f,this._w=A*u*f-h*p*B;break;case"YXZ":this._x=h*u*f+A*p*B,this._y=A*p*f-h*u*B,this._z=A*u*B-h*p*f,this._w=A*u*f+h*p*B;break;case"ZXY":this._x=h*u*f-A*p*B,this._y=A*p*f+h*u*B,this._z=A*u*B+h*p*f,this._w=A*u*f-h*p*B;break;case"ZYX":this._x=h*u*f-A*p*B,this._y=A*p*f+h*u*B,this._z=A*u*B-h*p*f,this._w=A*u*f+h*p*B;break;case"YZX":this._x=h*u*f+A*p*B,this._y=A*p*f+h*u*B,this._z=A*u*B-h*p*f,this._w=A*u*f-h*p*B;break;case"XZY":this._x=h*u*f-A*p*B,this._y=A*p*f-h*u*B,this._z=A*u*B+h*p*f,this._w=A*u*f+h*p*B;break;default:Qt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],A=e[2],u=e[6],f=e[10],h=n+a+f;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-A)*p,this._z=(o-s)*p}else if(n>a&&n>f){let p=2*Math.sqrt(1+n-a-f);this._w=(u-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+A)/p}else if(a>f){let p=2*Math.sqrt(1+a-n-f);this._w=(r-A)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+u)/p}else{let p=2*Math.sqrt(1+f-n-a);this._w=(o-s)/p,this._x=(r+A)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(kt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,A=e._z,u=e._w;return this._x=n*u+o*a+s*A-r*c,this._y=s*u+o*c+r*a-n*A,this._z=r*u+o*A+n*c-s*a,this._w=o*u-n*a-s*c-r*A,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){let A=Math.acos(a),u=Math.sin(A);c=Math.sin(c*A)/u,e=Math.sin(e*A)/u,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},qa=class qa{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(QA.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(QA.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,A=2*(o*s-a*n),u=2*(a*e-r*s),f=2*(r*n-o*e);return this.x=e+c*A+o*f-a*u,this.y=n+c*u+a*A-r*f,this.z=s+c*f+r*u-o*A,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Yo.copy(this).projectOnVector(t),this.sub(Yo)}reflect(t){return this.sub(Yo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};qa.prototype.isVector3=!0;var U=qa,Yo=new U,QA=new Je,ja=class ja{constructor(t,e,n,s,r,o,a,c,A){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,A)}set(t,e,n,s,r,o,a,c,A){let u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=A,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],A=n[1],u=n[4],f=n[7],h=n[2],p=n[5],B=n[8],M=s[0],d=s[3],l=s[6],y=s[1],v=s[4],m=s[7],E=s[2],_=s[5],b=s[8];return r[0]=o*M+a*y+c*E,r[3]=o*d+a*v+c*_,r[6]=o*l+a*m+c*b,r[1]=A*M+u*y+f*E,r[4]=A*d+u*v+f*_,r[7]=A*l+u*m+f*b,r[2]=h*M+p*y+B*E,r[5]=h*d+p*v+B*_,r[8]=h*l+p*m+B*b,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],A=t[7],u=t[8];return e*o*u-e*a*A-n*r*u+n*a*c+s*r*A-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],A=t[7],u=t[8],f=u*o-a*A,h=a*c-u*r,p=A*r-o*c,B=e*f+n*h+s*p;if(B===0)return this.set(0,0,0,0,0,0,0,0,0);let M=1/B;return t[0]=f*M,t[1]=(s*A-u*n)*M,t[2]=(a*n-s*o)*M,t[3]=h*M,t[4]=(u*e-s*c)*M,t[5]=(s*r-a*e)*M,t[6]=p*M,t[7]=(n*c-A*e)*M,t[8]=(o*e-n*r)*M,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),A=Math.sin(r);return this.set(n*c,n*A,-n*(c*o+A*a)+o+t,-s*A,s*c,-s*(-A*o+c*a)+a+e,0,0,1),this}scale(t,e){return ri("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Wo.makeScale(t,e)),this}rotate(t){return ri("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Wo.makeRotation(-t)),this}translate(t,e){return ri("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Wo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};ja.prototype.isMatrix3=!0;var Ut=ja,Wo=new Ut,FA=new Ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),RA=new Ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sh(){let i={enabled:!0,workingColorSpace:as,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===jt&&(s.r=Sn(s.r),s.g=Sn(s.g),s.b=Sn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===jt&&(s.r=vi(s.r),s.g=vi(s.g),s.b=vi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Dn?As:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ri("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ri("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[as]:{primaries:t,whitePoint:n,transfer:As,toXYZ:FA,fromXYZ:RA,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ne},outputColorSpaceConfig:{drawingBufferColorSpace:Ne}},[Ne]:{primaries:t,whitePoint:n,transfer:jt,toXYZ:FA,fromXYZ:RA,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ne}}}),i}var Yt=sh();function Sn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function vi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ui,Br=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ui===void 0&&(ui=cs("canvas")),ui.width=t.width,ui.height=t.height;let s=ui.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ui}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=cs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Sn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Sn(e[n]/255)*255):e[n]=Sn(e[n]);return{data:e,width:t.width,height:t.height}}else return Qt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},rh=0,Ti=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:rh++}),this.uuid=Vi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Jo(s[o].image)):r.push(Jo(s[o]))}else r=Jo(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Jo(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?Br.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Qt("Texture: Unable to serialize Texture."),{})}var oh=0,Ko=new U,Ge=class i extends on{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=pn,s=pn,r=Me,o=qn,a=$e,c=He,A=i.DEFAULT_ANISOTROPY,u=Dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:oh++}),this.uuid=Vi(),this.name="",this.source=new Ti(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=A,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Rt(0,0),this.repeat=new Rt(1,1),this.center=new Rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ko).x}get height(){return this.source.getSize(Ko).y}get depth(){return this.source.getSize(Ko).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Qt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Qt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ra)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case pr:t.x=t.x-Math.floor(t.x);break;case pn:t.x=t.x<0?0:1;break;case gr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case pr:t.y=t.y-Math.floor(t.y);break;case pn:t.y=t.y<0?0:1;break;case gr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=Ra;Ge.DEFAULT_ANISOTROPY=1;var $a=class $a{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,A=c[0],u=c[4],f=c[8],h=c[1],p=c[5],B=c[9],M=c[2],d=c[6],l=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-M)<.01&&Math.abs(B-d)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+M)<.1&&Math.abs(B+d)<.1&&Math.abs(A+p+l-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(A+1)/2,m=(p+1)/2,E=(l+1)/2,_=(u+h)/4,b=(f+M)/4,w=(B+d)/4;return v>m&&v>E?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=_/n,r=b/n):m>E?m<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(m),n=_/s,r=w/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=b/r,s=w/r),this.set(n,s,r,e),this}let y=Math.sqrt((d-B)*(d-B)+(f-M)*(f-M)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(d-B)/y,this.y=(f-M)/y,this.z=(h-u)/y,this.w=Math.acos((A+p+l-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this.w=kt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this.w=kt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};$a.prototype.isVector4=!0;var ce=$a,wr=class extends on{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Me,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new Ge(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Me,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ti(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Oe=class extends wr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},ls=class extends Ge{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ee,this.minFilter=Ee,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Cr=class extends Ge{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ee,this.minFilter=Ee,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Hr=class Hr{constructor(t,e,n,s,r,o,a,c,A,u,f,h,p,B,M,d){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,A,u,f,h,p,B,M,d)}set(t,e,n,s,r,o,a,c,A,u,f,h,p,B,M,d){let l=this.elements;return l[0]=t,l[4]=e,l[8]=n,l[12]=s,l[1]=r,l[5]=o,l[9]=a,l[13]=c,l[2]=A,l[6]=u,l[10]=f,l[14]=h,l[3]=p,l[7]=B,l[11]=M,l[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Hr().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/di.setFromMatrixColumn(t,0).length(),r=1/di.setFromMatrixColumn(t,1).length(),o=1/di.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),A=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let h=o*u,p=o*f,B=a*u,M=a*f;e[0]=c*u,e[4]=-c*f,e[8]=A,e[1]=p+B*A,e[5]=h-M*A,e[9]=-a*c,e[2]=M-h*A,e[6]=B+p*A,e[10]=o*c}else if(t.order==="YXZ"){let h=c*u,p=c*f,B=A*u,M=A*f;e[0]=h+M*a,e[4]=B*a-p,e[8]=o*A,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=p*a-B,e[6]=M+h*a,e[10]=o*c}else if(t.order==="ZXY"){let h=c*u,p=c*f,B=A*u,M=A*f;e[0]=h-M*a,e[4]=-o*f,e[8]=B+p*a,e[1]=p+B*a,e[5]=o*u,e[9]=M-h*a,e[2]=-o*A,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let h=o*u,p=o*f,B=a*u,M=a*f;e[0]=c*u,e[4]=B*A-p,e[8]=h*A+M,e[1]=c*f,e[5]=M*A+h,e[9]=p*A-B,e[2]=-A,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let h=o*c,p=o*A,B=a*c,M=a*A;e[0]=c*u,e[4]=M-h*f,e[8]=B*f+p,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-A*u,e[6]=p*f+B,e[10]=h-M*f}else if(t.order==="XZY"){let h=o*c,p=o*A,B=a*c,M=a*A;e[0]=c*u,e[4]=-f,e[8]=A*u,e[1]=h*f+M,e[5]=o*u,e[9]=p*f-B,e[2]=B*f-p,e[6]=a*u,e[10]=M*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ah,t,Ah)}lookAt(t,e,n){let s=this.elements;return Ve.subVectors(t,e),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),Rn.crossVectors(n,Ve),Rn.lengthSq()===0&&(Math.abs(n.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),Rn.crossVectors(n,Ve)),Rn.normalize(),Gs.crossVectors(Ve,Rn),s[0]=Rn.x,s[4]=Gs.x,s[8]=Ve.x,s[1]=Rn.y,s[5]=Gs.y,s[9]=Ve.y,s[2]=Rn.z,s[6]=Gs.z,s[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],A=n[12],u=n[1],f=n[5],h=n[9],p=n[13],B=n[2],M=n[6],d=n[10],l=n[14],y=n[3],v=n[7],m=n[11],E=n[15],_=s[0],b=s[4],w=s[8],x=s[12],I=s[1],D=s[5],N=s[9],H=s[13],Q=s[2],V=s[6],Z=s[10],J=s[14],et=s[3],W=s[7],$=s[11],tt=s[15];return r[0]=o*_+a*I+c*Q+A*et,r[4]=o*b+a*D+c*V+A*W,r[8]=o*w+a*N+c*Z+A*$,r[12]=o*x+a*H+c*J+A*tt,r[1]=u*_+f*I+h*Q+p*et,r[5]=u*b+f*D+h*V+p*W,r[9]=u*w+f*N+h*Z+p*$,r[13]=u*x+f*H+h*J+p*tt,r[2]=B*_+M*I+d*Q+l*et,r[6]=B*b+M*D+d*V+l*W,r[10]=B*w+M*N+d*Z+l*$,r[14]=B*x+M*H+d*J+l*tt,r[3]=y*_+v*I+m*Q+E*et,r[7]=y*b+v*D+m*V+E*W,r[11]=y*w+v*N+m*Z+E*$,r[15]=y*x+v*H+m*J+E*tt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],A=t[13],u=t[2],f=t[6],h=t[10],p=t[14],B=t[3],M=t[7],d=t[11],l=t[15],y=c*p-A*h,v=a*p-A*f,m=a*h-c*f,E=o*p-A*u,_=o*h-c*u,b=o*f-a*u;return e*(M*y-d*v+l*m)-n*(B*y-d*E+l*_)+s*(B*v-M*E+l*b)-r*(B*m-M*_+d*b)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],A=t[6],u=t[10];return e*(o*u-a*A)-n*(r*u-a*c)+s*(r*A-o*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],A=t[7],u=t[8],f=t[9],h=t[10],p=t[11],B=t[12],M=t[13],d=t[14],l=t[15],y=e*a-n*o,v=e*c-s*o,m=e*A-r*o,E=n*c-s*a,_=n*A-r*a,b=s*A-r*c,w=u*M-f*B,x=u*d-h*B,I=u*l-p*B,D=f*d-h*M,N=f*l-p*M,H=h*l-p*d,Q=y*H-v*N+m*D+E*I-_*x+b*w;if(Q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/Q;return t[0]=(a*H-c*N+A*D)*V,t[1]=(s*N-n*H-r*D)*V,t[2]=(M*b-d*_+l*E)*V,t[3]=(h*_-f*b-p*E)*V,t[4]=(c*I-o*H-A*x)*V,t[5]=(e*H-s*I+r*x)*V,t[6]=(d*m-B*b-l*v)*V,t[7]=(u*b-h*m+p*v)*V,t[8]=(o*N-a*I+A*w)*V,t[9]=(n*I-e*N-r*w)*V,t[10]=(B*_-M*m+l*y)*V,t[11]=(f*m-u*_-p*y)*V,t[12]=(a*x-o*D-c*w)*V,t[13]=(e*D-n*x+s*w)*V,t[14]=(M*v-B*E-d*y)*V,t[15]=(u*E-f*v+h*y)*V,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,A=r*o,u=r*a;return this.set(A*o+n,A*a-s*c,A*c+s*a,0,A*a+s*c,u*a+n,u*c-s*o,0,A*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,A=r+r,u=o+o,f=a+a,h=r*A,p=r*u,B=r*f,M=o*u,d=o*f,l=a*f,y=c*A,v=c*u,m=c*f,E=n.x,_=n.y,b=n.z;return s[0]=(1-(M+l))*E,s[1]=(p+m)*E,s[2]=(B-v)*E,s[3]=0,s[4]=(p-m)*_,s[5]=(1-(h+l))*_,s[6]=(d+y)*_,s[7]=0,s[8]=(B+v)*b,s[9]=(d-y)*b,s[10]=(1-(h+M))*b,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=di.set(s[0],s[1],s[2]).length(),a=di.set(s[4],s[5],s[6]).length(),c=di.set(s[8],s[9],s[10]).length();r<0&&(o=-o),en.copy(this);let A=1/o,u=1/a,f=1/c;return en.elements[0]*=A,en.elements[1]*=A,en.elements[2]*=A,en.elements[4]*=u,en.elements[5]*=u,en.elements[6]*=u,en.elements[8]*=f,en.elements[9]*=f,en.elements[10]*=f,e.setFromRotationMatrix(en),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=rn,c=!1){let A=this.elements,u=2*r/(e-t),f=2*r/(n-s),h=(e+t)/(e-t),p=(n+s)/(n-s),B,M;if(c)B=r/(o-r),M=o*r/(o-r);else if(a===rn)B=-(o+r)/(o-r),M=-2*o*r/(o-r);else if(a===bi)B=-o/(o-r),M=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return A[0]=u,A[4]=0,A[8]=h,A[12]=0,A[1]=0,A[5]=f,A[9]=p,A[13]=0,A[2]=0,A[6]=0,A[10]=B,A[14]=M,A[3]=0,A[7]=0,A[11]=-1,A[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=rn,c=!1){let A=this.elements,u=2/(e-t),f=2/(n-s),h=-(e+t)/(e-t),p=-(n+s)/(n-s),B,M;if(c)B=1/(o-r),M=o/(o-r);else if(a===rn)B=-2/(o-r),M=-(o+r)/(o-r);else if(a===bi)B=-1/(o-r),M=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return A[0]=u,A[4]=0,A[8]=0,A[12]=h,A[1]=0,A[5]=f,A[9]=0,A[13]=p,A[2]=0,A[6]=0,A[10]=B,A[14]=M,A[3]=0,A[7]=0,A[11]=0,A[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Hr.prototype.isMatrix4=!0;var Ae=Hr,di=new U,en=new Ae,ah=new U(0,0,0),Ah=new U(1,1,1),Rn=new U,Gs=new U,Ve=new U,UA=new Ae,PA=new Je,bn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],A=s[5],u=s[9],f=s[2],h=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,A),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,A)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,A)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-kt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,A));break;case"YZX":this._z=Math.asin(kt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,A),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,A),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Qt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return UA.makeRotationFromQuaternion(t),this.setFromRotationMatrix(UA,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return PA.setFromEuler(this),this.setFromQuaternion(PA,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};bn.DEFAULT_ORDER="XYZ";var Qi=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},ch=0,LA=new U,fi=new Je,_n=new Ae,Os=new U,$i=new U,lh=new U,hh=new Je,NA=new U(1,0,0),GA=new U(0,1,0),OA=new U(0,0,1),HA={type:"added"},uh={type:"removed"},pi={type:"childadded",child:null},Xo={type:"childremoved",child:null},De=class i extends on{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ch++}),this.uuid=Vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new U,e=new bn,n=new Je,s=new U(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ae},normalMatrix:{value:new Ut}}),this.matrix=new Ae,this.matrixWorld=new Ae,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qi,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return fi.setFromAxisAngle(t,e),this.quaternion.multiply(fi),this}rotateOnWorldAxis(t,e){return fi.setFromAxisAngle(t,e),this.quaternion.premultiply(fi),this}rotateX(t){return this.rotateOnAxis(NA,t)}rotateY(t){return this.rotateOnAxis(GA,t)}rotateZ(t){return this.rotateOnAxis(OA,t)}translateOnAxis(t,e){return LA.copy(t).applyQuaternion(this.quaternion),this.position.add(LA.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(NA,t)}translateY(t){return this.translateOnAxis(GA,t)}translateZ(t){return this.translateOnAxis(OA,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Os.copy(t):Os.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),$i.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt($i,Os,this.up):_n.lookAt(Os,$i,this.up),this.quaternion.setFromRotationMatrix(_n),s&&(_n.extractRotation(s.matrixWorld),fi.setFromRotationMatrix(_n),this.quaternion.premultiply(fi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Ft("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(HA),pi.child=t,this.dispatchEvent(pi),pi.child=null):Ft("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(uh),Xo.child=t,this.dispatchEvent(Xo),Xo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_n.multiply(t.parent.matrixWorld)),t.applyMatrix4(_n),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(HA),pi.child=t,this.dispatchEvent(pi),pi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,t,lh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,hh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let A=0,u=c.length;A<u;A++){let f=c[A];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,A=this.material.length;c<A;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),A=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),p=o(t.animations),B=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),A.length>0&&(n.textures=A),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),B.length>0&&(n.nodes=B)}return n.object=s,n;function o(a){let c=[];for(let A in a){let u=a[A];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};De.DEFAULT_UP=new U(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var gn=class extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}},dh={type:"move"},Fi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,A=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(A&&t.hand){o=!0;for(let M of t.hand.values()){let d=e.getJointPose(M,n),l=this._getHandJoint(A,M);d!==null&&(l.matrix.fromArray(d.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,l.jointRadius=d.radius),l.visible=d!==null}let u=A.joints["index-finger-tip"],f=A.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,B=.005;A.inputState.pinching&&h>p+B?(A.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!A.inputState.pinching&&h<=p-B&&(A.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(dh)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),A!==null&&(A.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new gn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Oc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Un={h:0,s:0,l:0},Hs={h:0,s:0,l:0};function Zo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Vt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ne){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Yt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Yt.workingColorSpace){if(t=za(t,1),e=kt(e,0,1),n=kt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Zo(o,r,t+1/3),this.g=Zo(o,r,t),this.b=Zo(o,r,t-1/3)}return Yt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ne){function n(r){r!==void 0&&parseFloat(r)<1&&Qt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Qt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Qt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ne){let n=Oc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Qt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Sn(t.r),this.g=Sn(t.g),this.b=Sn(t.b),this}copyLinearToSRGB(t){return this.r=vi(t.r),this.g=vi(t.g),this.b=vi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ne){return Yt.workingToColorSpace(be.copy(this),t),Math.round(kt(be.r*255,0,255))*65536+Math.round(kt(be.g*255,0,255))*256+Math.round(kt(be.b*255,0,255))}getHexString(t=Ne){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.workingToColorSpace(be.copy(this),e);let n=be.r,s=be.g,r=be.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,A,u=(a+o)/2;if(a===o)c=0,A=0;else{let f=o-a;switch(A=u<=.5?f/(o+a):f/(2-o-a),o){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return t.h=c,t.s=A,t.l=u,t}getRGB(t,e=Yt.workingColorSpace){return Yt.workingToColorSpace(be.copy(this),e),t.r=be.r,t.g=be.g,t.b=be.b,t}getStyle(t=Ne){Yt.workingToColorSpace(be.copy(this),t);let e=be.r,n=be.g,s=be.b;return t!==Ne?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Un),this.setHSL(Un.h+t,Un.s+e,Un.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Un),t.getHSL(Hs);let n=rs(Un.h,Hs.h,e),s=rs(Un.s,Hs.s,e),r=rs(Un.l,Hs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},be=new Vt;Vt.NAMES=Oc;var hs=class extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bn,this.environmentIntensity=1,this.environmentRotation=new bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},nn=new U,Mn=new U,qo=new U,xn=new U,gi=new U,mi=new U,kA=new U,jo=new U,$o=new U,ta=new U,ea=new ce,na=new ce,ia=new ce,Gn=class i{constructor(t=new U,e=new U,n=new U){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),nn.subVectors(t,e),s.cross(nn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){nn.subVectors(s,e),Mn.subVectors(n,e),qo.subVectors(t,e);let o=nn.dot(nn),a=nn.dot(Mn),c=nn.dot(qo),A=Mn.dot(Mn),u=Mn.dot(qo),f=o*A-a*a;if(f===0)return r.set(0,0,0),null;let h=1/f,p=(A*c-a*u)*h,B=(o*u-a*c)*h;return r.set(1-p-B,B,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,xn)===null?!1:xn.x>=0&&xn.y>=0&&xn.x+xn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,xn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,xn.x),c.addScaledVector(o,xn.y),c.addScaledVector(a,xn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return ea.setScalar(0),na.setScalar(0),ia.setScalar(0),ea.fromBufferAttribute(t,e),na.fromBufferAttribute(t,n),ia.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ea,r.x),o.addScaledVector(na,r.y),o.addScaledVector(ia,r.z),o}static isFrontFacing(t,e,n,s){return nn.subVectors(n,e),Mn.subVectors(t,e),nn.cross(Mn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return nn.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),nn.cross(Mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;gi.subVectors(s,n),mi.subVectors(r,n),jo.subVectors(t,n);let c=gi.dot(jo),A=mi.dot(jo);if(c<=0&&A<=0)return e.copy(n);$o.subVectors(t,s);let u=gi.dot($o),f=mi.dot($o);if(u>=0&&f<=u)return e.copy(s);let h=c*f-u*A;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(gi,o);ta.subVectors(t,r);let p=gi.dot(ta),B=mi.dot(ta);if(B>=0&&p<=B)return e.copy(r);let M=p*A-c*B;if(M<=0&&A>=0&&B<=0)return a=A/(A-B),e.copy(n).addScaledVector(mi,a);let d=u*B-p*f;if(d<=0&&f-u>=0&&p-B>=0)return kA.subVectors(r,s),a=(f-u)/(f-u+(p-B)),e.copy(s).addScaledVector(kA,a);let l=1/(d+M+h);return o=M*l,a=h*l,e.copy(n).addScaledVector(gi,o).addScaledVector(mi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},On=class{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(sn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(sn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=sn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,sn):sn.fromBufferAttribute(r,o),sn.applyMatrix4(t.matrixWorld),this.expandByPoint(sn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ks.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ks.copy(n.boundingBox)),ks.applyMatrix4(t.matrixWorld),this.union(ks)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,sn),sn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ts),Vs.subVectors(this.max,ts),Bi.subVectors(t.a,ts),wi.subVectors(t.b,ts),Ci.subVectors(t.c,ts),Pn.subVectors(wi,Bi),Ln.subVectors(Ci,wi),ei.subVectors(Bi,Ci);let e=[0,-Pn.z,Pn.y,0,-Ln.z,Ln.y,0,-ei.z,ei.y,Pn.z,0,-Pn.x,Ln.z,0,-Ln.x,ei.z,0,-ei.x,-Pn.y,Pn.x,0,-Ln.y,Ln.x,0,-ei.y,ei.x,0];return!sa(e,Bi,wi,Ci,Vs)||(e=[1,0,0,0,1,0,0,0,1],!sa(e,Bi,wi,Ci,Vs))?!1:(zs.crossVectors(Pn,Ln),e=[zs.x,zs.y,zs.z],sa(e,Bi,wi,Ci,Vs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,sn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(sn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(yn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},yn=[new U,new U,new U,new U,new U,new U,new U,new U],sn=new U,ks=new On,Bi=new U,wi=new U,Ci=new U,Pn=new U,Ln=new U,ei=new U,ts=new U,Vs=new U,zs=new U,ni=new U;function sa(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ni.fromArray(i,r);let a=s.x*Math.abs(ni.x)+s.y*Math.abs(ni.y)+s.z*Math.abs(ni.z),c=t.dot(ni),A=e.dot(ni),u=n.dot(ni);if(Math.max(-Math.max(c,A,u),Math.min(c,A,u))>a)return!1}return!0}var fe=new U,Ys=new Rt,fh=0,pe=class extends on{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:fh++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Uc,this.updateRanges=[],this.gpuType=ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ys.fromBufferAttribute(this,e),Ys.applyMatrix3(t),this.setXY(e,Ys.x,Ys.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyMatrix3(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyMatrix4(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyNormalMatrix(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.transformDirection(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=yi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ue(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=yi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=yi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=yi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=yi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array),s=Ue(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array),s=Ue(s,this.array),r=Ue(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var us=class extends pe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ds=class extends pe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var We=class extends pe{constructor(t,e,n){super(new Float32Array(t),e,n)}},ph=new On,es=new U,ra=new U,Bn=class{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):ph.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;es.subVectors(t,this.center);let e=es.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(es,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ra.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(es.copy(t.center).add(ra)),this.expandByPoint(es.copy(t.center).sub(ra))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},gh=0,je=new Ae,oa=new De,Ei=new U,ze=new On,ns=new On,Ce=new U,xe=class i extends on{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gh++}),this.uuid=Vi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ol(t)?ds:us)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ut().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return je.makeRotationFromQuaternion(t),this.applyMatrix4(je),this}rotateX(t){return je.makeRotationX(t),this.applyMatrix4(je),this}rotateY(t){return je.makeRotationY(t),this.applyMatrix4(je),this}rotateZ(t){return je.makeRotationZ(t),this.applyMatrix4(je),this}translate(t,e,n){return je.makeTranslation(t,e,n),this.applyMatrix4(je),this}scale(t,e,n){return je.makeScale(t,e,n),this.applyMatrix4(je),this}lookAt(t){return oa.lookAt(t),oa.updateMatrix(),this.applyMatrix4(oa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new We(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Qt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new On);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ft("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];ze.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,ze.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,ze.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(ze.min),this.boundingBox.expandByPoint(ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ft('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ft("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){let n=this.boundingSphere.center;if(ze.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];ns.setFromBufferAttribute(a),this.morphTargetsRelative?(Ce.addVectors(ze.min,ns.min),ze.expandByPoint(Ce),Ce.addVectors(ze.max,ns.max),ze.expandByPoint(Ce)):(ze.expandByPoint(ns.min),ze.expandByPoint(ns.max))}ze.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ce.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ce));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let A=0,u=a.count;A<u;A++)Ce.fromBufferAttribute(a,A),c&&(Ei.fromBufferAttribute(t,A),Ce.add(Ei)),s=Math.max(s,n.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ft('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Ft("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new pe(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let w=0;w<n.count;w++)a[w]=new U,c[w]=new U;let A=new U,u=new U,f=new U,h=new Rt,p=new Rt,B=new Rt,M=new U,d=new U;function l(w,x,I){A.fromBufferAttribute(n,w),u.fromBufferAttribute(n,x),f.fromBufferAttribute(n,I),h.fromBufferAttribute(r,w),p.fromBufferAttribute(r,x),B.fromBufferAttribute(r,I),u.sub(A),f.sub(A),p.sub(h),B.sub(h);let D=1/(p.x*B.y-B.x*p.y);isFinite(D)&&(M.copy(u).multiplyScalar(B.y).addScaledVector(f,-p.y).multiplyScalar(D),d.copy(f).multiplyScalar(p.x).addScaledVector(u,-B.x).multiplyScalar(D),a[w].add(M),a[x].add(M),a[I].add(M),c[w].add(d),c[x].add(d),c[I].add(d))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let w=0,x=y.length;w<x;++w){let I=y[w],D=I.start,N=I.count;for(let H=D,Q=D+N;H<Q;H+=3)l(t.getX(H+0),t.getX(H+1),t.getX(H+2))}let v=new U,m=new U,E=new U,_=new U;function b(w){E.fromBufferAttribute(s,w),_.copy(E);let x=a[w];v.copy(x),v.sub(E.multiplyScalar(E.dot(x))).normalize(),m.crossVectors(_,x);let D=m.dot(c[w])<0?-1:1;o.setXYZW(w,v.x,v.y,v.z,D)}for(let w=0,x=y.length;w<x;++w){let I=y[w],D=I.start,N=I.count;for(let H=D,Q=D+N;H<Q;H+=3)b(t.getX(H+0)),b(t.getX(H+1)),b(t.getX(H+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new pe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);let s=new U,r=new U,o=new U,a=new U,c=new U,A=new U,u=new U,f=new U;if(t)for(let h=0,p=t.count;h<p;h+=3){let B=t.getX(h+0),M=t.getX(h+1),d=t.getX(h+2);s.fromBufferAttribute(e,B),r.fromBufferAttribute(e,M),o.fromBufferAttribute(e,d),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(n,B),c.fromBufferAttribute(n,M),A.fromBufferAttribute(n,d),a.add(u),c.add(u),A.add(u),n.setXYZ(B,a.x,a.y,a.z),n.setXYZ(M,c.x,c.y,c.z),n.setXYZ(d,A.x,A.y,A.z)}else for(let h=0,p=e.count;h<p;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(a,c){let A=a.array,u=a.itemSize,f=a.normalized,h=new A.constructor(c.length*u),p=0,B=0;for(let M=0,d=c.length;M<d;M++){a.isInterleavedBufferAttribute?p=c[M]*a.data.stride+a.offset:p=c[M]*u;for(let l=0;l<u;l++)h[B++]=A[p++]}return new pe(h,u,f)}if(this.index===null)return Qt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],A=t(c,n);e.setAttribute(a,A)}let r=this.morphAttributes;for(let a in r){let c=[],A=r[a];for(let u=0,f=A.length;u<f;u++){let h=A[u],p=t(h,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let A=o[a];e.addGroup(A.start,A.count,A.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let A in c)c[A]!==void 0&&(t[A]=c[A]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let A=n[c];t.data.attributes[c]=A.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let A=this.morphAttributes[c],u=[];for(let f=0,h=A.length;f<h;f++){let p=A[f];u.push(p.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let A in s){let u=s[A];this.setAttribute(A,u.clone(e))}let r=t.morphAttributes;for(let A in r){let u=[],f=r[A];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(e));this.morphAttributes[A]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let A=0,u=o.length;A<u;A++){let f=o[A];this.addGroup(f.start,f.count,f.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var aa=new U,mh=new U,Bh=new Ut,Ye=class{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=aa.subVectors(n,e).cross(mh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(aa),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Bh.getNormalMatrix(t),s=this.coplanarPoint(aa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},wh=0,In=class extends on{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wh++}),this.uuid=Vi(),this.name="",this.type="Material",this.blending=Oi,this.side=Xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ya,this.blendDst=va,this.blendEquation=oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Vt(0,0,0),this.blendAlpha=0,this.depthFunc=Si,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ar,this.stencilZFail=ar,this.stencilZPass=ar,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Qt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Qt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Vt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Ye().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Rt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Rt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var vn=new U,Aa=new U,Ws=new U,Js=new U,Hn=class{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,vn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=vn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(vn.copy(this.origin).addScaledVector(this.direction,e),vn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Aa.copy(t).add(e).multiplyScalar(.5),Ws.copy(e).sub(t).normalize(),Js.copy(this.origin).sub(Aa);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Ws),a=Js.dot(this.direction),c=-Js.dot(Ws),A=Js.lengthSq(),u=Math.abs(1-o*o),f,h,p,B;if(u>0)if(f=o*c-a,h=o*a-c,B=r*u,f>=0)if(h>=-B)if(h<=B){let M=1/u;f*=M,h*=M,p=f*(f+o*h+2*a)+h*(o*f+h+2*c)+A}else h=r,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*c)+A;else h=-r,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*c)+A;else h<=-B?(f=Math.max(0,-(-o*r+a)),h=f>0?-r:Math.min(Math.max(-r,-c),r),p=-f*f+h*(h+2*c)+A):h<=B?(f=0,h=Math.min(Math.max(-r,-c),r),p=h*(h+2*c)+A):(f=Math.max(0,-(o*r+a)),h=f>0?r:Math.min(Math.max(-r,-c),r),p=-f*f+h*(h+2*c)+A);else h=o>0?-r:r,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*c)+A;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Aa).addScaledVector(Ws,h),p}intersectSphere(t,e){if(t.radius<0)return null;vn.subVectors(t.center,this.origin);let n=vn.dot(this.direction),s=vn.dot(vn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,A=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return A>=0?(n=(t.min.x-h.x)*A,s=(t.max.x-h.x)*A):(n=(t.max.x-h.x)*A,s=(t.min.x-h.x)*A),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,vn)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,c=a.x,A=a.y,u=a.z,f=t.x-o.x,h=t.y-o.y,p=t.z-o.z,B=e.x-o.x,M=e.y-o.y,d=e.z-o.z,l=n.x-o.x,y=n.y-o.y,v=n.z-o.z,m=Math.abs(c),E=Math.abs(A),_=Math.abs(u),b,w,x,I,D,N,H,Q,V,Z,J,et;if(m>=E&&m>=_?(x=c,N=f,V=B,et=l,c>=0?(b=A,w=u,I=h,D=p,H=M,Q=d,Z=y,J=v):(b=u,w=A,I=p,D=h,H=d,Q=M,Z=v,J=y)):E>=_?(x=A,N=h,V=M,et=y,A>=0?(b=u,w=c,I=p,D=f,H=d,Q=B,Z=v,J=l):(b=c,w=u,I=f,D=p,H=B,Q=d,Z=l,J=v)):(x=u,N=p,V=d,et=v,u>=0?(b=c,w=A,I=f,D=h,H=B,Q=M,Z=l,J=y):(b=A,w=c,I=h,D=f,H=M,Q=B,Z=y,J=l)),x===0)return null;let W=b/x,$=w/x,tt=1/x,it=I-W*N,st=D-$*N,It=H-W*V,wt=Q-$*V,at=Z-W*et,L=J-$*et,z=at*wt-L*It,ot=it*L-st*at,Et=It*st-wt*it;if(s){if(z<0||ot<0||Et<0)return null}else if((z<0||ot<0||Et<0)&&(z>0||ot>0||Et>0))return null;let ct=z+ot+Et;if(ct===0)return null;let Pt=tt*(z*N+ot*V+Et*et);return(ct>0?Pt<0:Pt>0)?null:this.at(Pt/ct,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},an=class extends In{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=kr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},VA=new Ae,ii=new Hn,Ks=new Bn,zA=new U,Xs=new U,Zs=new U,qs=new U,ca=new U,js=new U,YA=new U,$s=new U,_e=class extends De{constructor(t=new xe,e=new an){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){js.set(0,0,0);for(let c=0,A=r.length;c<A;c++){let u=a[c],f=r[c];u!==0&&(ca.fromBufferAttribute(f,t),o?js.addScaledVector(ca,u):js.addScaledVector(ca.sub(e),u))}e.add(js)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ks.copy(n.boundingSphere),Ks.applyMatrix4(r),ii.copy(t.ray).recast(t.near),!(Ks.containsPoint(ii.origin)===!1&&(ii.intersectSphere(Ks,zA)===null||ii.origin.distanceToSquared(zA)>(t.far-t.near)**2))&&(VA.copy(r).invert(),ii.copy(t.ray).applyMatrix4(VA),!(n.boundingBox!==null&&ii.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ii)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,A=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let B=0,M=h.length;B<M;B++){let d=h[B],l=o[d.materialIndex],y=Math.max(d.start,p.start),v=Math.min(a.count,Math.min(d.start+d.count,p.start+p.count));for(let m=y,E=v;m<E;m+=3){let _=a.getX(m),b=a.getX(m+1),w=a.getX(m+2);s=tr(this,l,t,n,A,u,f,_,b,w),s&&(s.faceIndex=Math.floor(m/3),s.face.materialIndex=d.materialIndex,e.push(s))}}else{let B=Math.max(0,p.start),M=Math.min(a.count,p.start+p.count);for(let d=B,l=M;d<l;d+=3){let y=a.getX(d),v=a.getX(d+1),m=a.getX(d+2);s=tr(this,o,t,n,A,u,f,y,v,m),s&&(s.faceIndex=Math.floor(d/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let B=0,M=h.length;B<M;B++){let d=h[B],l=o[d.materialIndex],y=Math.max(d.start,p.start),v=Math.min(c.count,Math.min(d.start+d.count,p.start+p.count));for(let m=y,E=v;m<E;m+=3){let _=m,b=m+1,w=m+2;s=tr(this,l,t,n,A,u,f,_,b,w),s&&(s.faceIndex=Math.floor(m/3),s.face.materialIndex=d.materialIndex,e.push(s))}}else{let B=Math.max(0,p.start),M=Math.min(c.count,p.start+p.count);for(let d=B,l=M;d<l;d+=3){let y=d,v=d+1,m=d+2;s=tr(this,o,t,n,A,u,f,y,v,m),s&&(s.faceIndex=Math.floor(d/3),e.push(s))}}}};function Ch(i,t,e,n,s,r,o,a){let c;if(t.side===Pe?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Xn,a),c===null)return null;$s.copy(a),$s.applyMatrix4(i.matrixWorld);let A=e.ray.origin.distanceTo($s);return A<e.near||A>e.far?null:{distance:A,point:$s.clone(),object:i}}function tr(i,t,e,n,s,r,o,a,c,A){i.getVertexPosition(a,Xs),i.getVertexPosition(c,Zs),i.getVertexPosition(A,qs);let u=Ch(i,t,e,n,Xs,Zs,qs,YA);if(u){let f=new U;Gn.getBarycoord(YA,Xs,Zs,qs,f),s&&(u.uv=Gn.getInterpolatedAttribute(s,a,c,A,f,new Rt)),r&&(u.uv1=Gn.getInterpolatedAttribute(r,a,c,A,f,new Rt)),o&&(u.normal=Gn.getInterpolatedAttribute(o,a,c,A,f,new U),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:c,c:A,normal:new U,materialIndex:0};Gn.getNormal(Xs,Zs,qs,h.normal),u.face=h,u.barycoord=f}return u}var Er=class extends Ge{constructor(t=null,e=1,n=1,s,r,o,a,c,A=Ee,u=Ee,f,h){super(null,o,a,c,A,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var si=new Bn,Eh=new Rt(.5,.5),er=new U,Ri=class{constructor(t=new Ye,e=new Ye,n=new Ye,s=new Ye,r=new Ye,o=new Ye){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=rn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],A=r[3],u=r[4],f=r[5],h=r[6],p=r[7],B=r[8],M=r[9],d=r[10],l=r[11],y=r[12],v=r[13],m=r[14],E=r[15];if(s[0].setComponents(A-o,p-u,l-B,E-y).normalize(),s[1].setComponents(A+o,p+u,l+B,E+y).normalize(),s[2].setComponents(A+a,p+f,l+M,E+v).normalize(),s[3].setComponents(A-a,p-f,l-M,E-v).normalize(),n)s[4].setComponents(c,h,d,m).normalize(),s[5].setComponents(A-c,p-h,l-d,E-m).normalize();else if(s[4].setComponents(A-c,p-h,l-d,E-m).normalize(),e===rn)s[5].setComponents(A+c,p+h,l+d,E+m).normalize();else if(e===bi)s[5].setComponents(c,h,d,m).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),si.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),si.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(si)}intersectsSprite(t){si.center.set(0,0,0);let e=Eh.distanceTo(t.center);return si.radius=.7071067811865476+e,si.applyMatrix4(t.matrixWorld),this.intersectsSphere(si)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(er.x=s.normal.x>0?t.max.x:t.min.x,er.y=s.normal.y>0?t.max.y:t.min.y,er.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(er)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ui=class extends In{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Vt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},_r=new U,Mr=new U,WA=new Ae,is=new Hn,nr=new Bn,la=new U,JA=new U,fs=class extends De{constructor(t=new xe,e=new Ui){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)_r.fromBufferAttribute(e,s-1),Mr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=_r.distanceTo(Mr);t.setAttribute("lineDistance",new We(n,1))}else Qt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(s),nr.radius+=r,t.ray.intersectsSphere(nr)===!1)return;WA.copy(s).invert(),is.copy(t.ray).applyMatrix4(WA);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,A=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){let p=Math.max(0,o.start),B=Math.min(u.count,o.start+o.count);for(let M=p,d=B-1;M<d;M+=A){let l=u.getX(M),y=u.getX(M+1),v=ir(this,t,is,c,l,y,M);v&&e.push(v)}if(this.isLineLoop){let M=u.getX(B-1),d=u.getX(p),l=ir(this,t,is,c,M,d,B-1);l&&e.push(l)}}else{let p=Math.max(0,o.start),B=Math.min(h.count,o.start+o.count);for(let M=p,d=B-1;M<d;M+=A){let l=ir(this,t,is,c,M,M+1,M);l&&e.push(l)}if(this.isLineLoop){let M=ir(this,t,is,c,B-1,p,B-1);M&&e.push(M)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ir(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(_r.fromBufferAttribute(a,s),Mr.fromBufferAttribute(a,r),e.distanceSqToSegment(_r,Mr,la,JA)>n)return;la.applyMatrix4(i.matrixWorld);let A=t.ray.origin.distanceTo(la);if(!(A<t.near||A>t.far))return{distance:A,point:JA.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var ps=class extends Ge{constructor(t=[],e=Zn,n,s,r,o,a,c,A,u){super(t,e,n,s,r,o,a,c,A,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var kn=class extends Ge{constructor(t,e,n=cn,s,r,o,a=Ee,c=Ee,A,u=mn,f=1){if(u!==mn&&u!==jn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:f};super(h,s,r,o,a,c,u,n,A),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ti(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},xr=class extends kn{constructor(t,e=cn,n=Zn,s,r,o=Ee,a=Ee,c,A=mn){let u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,n,s,r,o,a,c,A),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},gs=class extends Ge{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Pi=class i extends xe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],A=[],u=[],f=[],h=0,p=0;B("z","y","x",-1,-1,n,e,t,o,r,0),B("z","y","x",1,-1,n,e,-t,o,r,1),B("x","z","y",1,1,t,n,e,s,o,2),B("x","z","y",1,-1,t,n,-e,s,o,3),B("x","y","z",1,-1,t,e,n,s,r,4),B("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new We(A,3)),this.setAttribute("normal",new We(u,3)),this.setAttribute("uv",new We(f,2));function B(M,d,l,y,v,m,E,_,b,w,x){let I=m/b,D=E/w,N=m/2,H=E/2,Q=_/2,V=b+1,Z=w+1,J=0,et=0,W=new U;for(let $=0;$<Z;$++){let tt=$*D-H;for(let it=0;it<V;it++){let st=it*I-N;W[M]=st*y,W[d]=tt*v,W[l]=Q,A.push(W.x,W.y,W.z),W[M]=0,W[d]=0,W[l]=_>0?1:-1,u.push(W.x,W.y,W.z),f.push(it/b),f.push(1-$/w),J+=1}}for(let $=0;$<w;$++)for(let tt=0;tt<b;tt++){let it=h+tt+V*$,st=h+tt+V*($+1),It=h+(tt+1)+V*($+1),wt=h+(tt+1)+V*$;c.push(it,st,wt),c.push(st,It,wt),et+=6}a.addGroup(p,et,x),p+=et,h+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Vn=class i extends xe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),A=a+1,u=c+1,f=t/a,h=e/c,p=[],B=[],M=[],d=[];for(let l=0;l<u;l++){let y=l*h-o;for(let v=0;v<A;v++){let m=v*f-r;B.push(m,-y,0),M.push(0,0,1),d.push(v/a),d.push(1-l/c)}}for(let l=0;l<c;l++)for(let y=0;y<a;y++){let v=y+A*l,m=y+A*(l+1),E=y+1+A*(l+1),_=y+1+A*l;p.push(v,m,_),p.push(m,E,_)}this.setIndex(p),this.setAttribute("position",new We(B,3)),this.setAttribute("normal",new We(M,3)),this.setAttribute("uv",new We(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};function Ai(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(KA(s))s.isRenderTargetTexture?(Qt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(KA(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Qe(i){let t={};for(let e=0;e<i.length;e++){let n=Ai(i[e]);for(let s in n)t[s]=n[s]}return t}function KA(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function _h(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Wa(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}var Hc={clone:Ai,merge:Qe},Mh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ke=class extends In{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mh,this.fragmentShader=xh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ai(t.uniforms),this.uniformsGroups=_h(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Vt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Rt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new U().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ce().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ut().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ae().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},yr=class extends Ke{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var ms=class extends In{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Io,this.normalScale=new Rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=kr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},vr=class extends In{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Sr=class extends In{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function _i(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function ha(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var zn=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},br=class extends zn{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:fa,endingEnd:fa}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case pa:r=t,a=2*e-n;break;case ga:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case pa:o=t,c=2*n-e;break;case ga:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let A=(n-e)*.5,u=this.valueSize;this._weightPrev=A/(e-a),this._weightNext=A/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,A=c-a,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,p=this._weightNext,B=(n-e)/(s-e),M=B*B,d=M*B,l=-h*d+2*h*M-h*B,y=(1+h)*d+(-1.5-2*h)*M+(-.5+h)*B+1,v=(-1-p)*d+(1.5+p)*M+.5*B,m=p*d-p*M;for(let E=0;E!==a;++E)r[E]=l*o[u+E]+y*o[A+E]+v*o[c+E]+m*o[f+E];return r}},Ir=class extends zn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,A=c-a,u=(n-e)/(s-e),f=1-u;for(let h=0;h!==a;++h)r[h]=o[A+h]*f+o[c+h]*u;return r}},Dr=class extends zn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Tr=class extends zn{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,A=c-a,u=this.inTangents,f=this.outTangents;if(!u||!f){let B=(n-e)/(s-e),M=1-B;for(let d=0;d!==a;++d)r[d]=o[A+d]*M+o[c+d]*B;return r}let h=a*2,p=t-1;for(let B=0;B!==a;++B){let M=o[A+B],d=o[c+B],l=p*h+B*2,y=f[l],v=f[l+1],m=t*h+B*2,E=u[m],_=u[m+1],b=vh(n,e,y,E,s);r[B]=kc(b,M,v,_,d)}return r}};function kc(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function yh(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function vh(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=kc(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let c=yh(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var Xe=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=_i(e,this.TimeBufferType),this.values=_i(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:_i(t.times,Array),values:_i(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),ha(t.settings)&&(n.settings={inTangents:_i(t.settings.inTangents,Array),outTangents:_i(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Dr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ir(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new br(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Tr(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case os:e=this.InterpolantFactoryMethodDiscrete;break;case mr:e=this.InterpolantFactoryMethodLinear;break;case or:e=this.InterpolantFactoryMethodSmooth;break;case da:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Qt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return os;case this.InterpolantFactoryMethodLinear:return mr;case this.InterpolantFactoryMethodSmooth:return or;case this.InterpolantFactoryMethodBezier:return da}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;ha(this.settings)&&(XA(this.settings.inTangents,t),XA(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Ft("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ft("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){Ft("KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){Ft("KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&Hl(s))for(let a=0,c=s.length;a!==c;++a){let A=s[a];if(isNaN(A)){Ft("KeyframeTrack: Value is not a valid number.",this,a,A),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===or,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,A=t[a],u=t[a+1];if(A!==u&&(a!==1||A!==t[0]))if(s)c=!0;else{let f=a*n,h=f-n,p=f+n;for(let B=0;B!==n;++B){let M=e[f+B];if(M!==e[h+B]||M!==e[p+B]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let f=a*n,h=o*n;for(let p=0;p!==n;++p)e[h+p]=e[f+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,A=0;A!==n;++A)e[c+A]=e[a+A];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,ha(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function XA(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}Xe.prototype.ValueTypeName="";Xe.prototype.TimeBufferType=Float32Array;Xe.prototype.ValueBufferType=Float32Array;Xe.prototype.DefaultInterpolation=mr;var Yn=class extends Xe{constructor(t,e,n){super(t,e,n)}};Yn.prototype.ValueTypeName="bool";Yn.prototype.ValueBufferType=Array;Yn.prototype.DefaultInterpolation=os;Yn.prototype.InterpolantFactoryMethodLinear=void 0;Yn.prototype.InterpolantFactoryMethodSmooth=void 0;var Qr=class extends Xe{constructor(t,e,n,s){super(t,e,n,s)}};Qr.prototype.ValueTypeName="color";var Fr=class extends Xe{constructor(t,e,n,s){super(t,e,n,s)}};Fr.prototype.ValueTypeName="number";var Rr=class extends zn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),A=t*a;for(let u=A+a;A!==u;A+=4)Je.slerpFlat(r,0,o,A-a,o,A,c);return r}},Bs=class extends Xe{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Rr(this.times,this.values,this.getValueSize(),t)}};Bs.prototype.ValueTypeName="quaternion";Bs.prototype.InterpolantFactoryMethodSmooth=void 0;var Wn=class extends Xe{constructor(t,e,n){super(t,e,n)}};Wn.prototype.ValueTypeName="string";Wn.prototype.ValueBufferType=Array;Wn.prototype.DefaultInterpolation=os;Wn.prototype.InterpolantFactoryMethodLinear=void 0;Wn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ur=class extends Xe{constructor(t,e,n,s){super(t,e,n,s)}};Ur.prototype.ValueTypeName="vector";var Pr=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,A=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return A.push(u,f),this},this.removeHandler=function(u){let f=A.indexOf(u);return f!==-1&&A.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=A.length;f<h;f+=2){let p=A[f],B=A[f+1];if(p.global&&(p.lastIndex=0),p.test(u))return B}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Vc=new Pr,Lr=class{constructor(t){this.manager=t!==void 0?t:Vc,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Lr.DEFAULT_MATERIAL_NAME="__DEFAULT";var ws=class extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Vt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var ua=new Ae,ZA=new U,qA=new U,Nr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Rt(512,512),this.mapType=He,this.map=null,this.mapPass=null,this.matrix=new Ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ri,this._frameExtents=new Rt(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;ZA.setFromMatrixPosition(t.matrixWorld),e.position.copy(ZA),qA.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(qA),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){ua.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(ua,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,A=s?s.y/r.y:0;t.coordinateSystem===bi||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+A,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+A,0,0,.5,.5,0,0,0,1),e.multiply(ua)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},sr=new U,rr=new Je,fn=new U,Cs=class extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ae,this.projectionMatrix=new Ae,this.projectionMatrixInverse=new Ae,this.coordinateSystem=rn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(sr,rr,fn),fn.x===1&&fn.y===1&&fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sr,rr,fn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(sr,rr,fn),fn.x===1&&fn.y===1&&fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sr,rr,fn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Nn=new U,jA=new Rt,$A=new Rt,Ie=class extends Cs{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Di*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(ss*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Di*2*Math.atan(Math.tan(ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Nn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Nn.x,Nn.y).multiplyScalar(-t/Nn.z),Nn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Nn.x,Nn.y).multiplyScalar(-t/Nn.z)}getViewSize(t,e){return this.getViewBounds(t,jA,$A),e.subVectors($A,jA)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(ss*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,A=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/A,s*=o.width/c,n*=o.height/A}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Li=class extends Cs{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let A=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=A*this.view.offsetX,o=r+A*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ma=class extends Nr{constructor(){super(new Li(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Es=class extends ws{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new ma}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},_s=class extends ws{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Mi=-90,xi=1,Gr=class extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ie(Mi,xi,t,e);s.layers=this.layers,this.add(s);let r=new Ie(Mi,xi,t,e);r.layers=this.layers,this.add(r);let o=new Ie(Mi,xi,t,e);o.layers=this.layers,this.add(o);let a=new Ie(Mi,xi,t,e);a.layers=this.layers,this.add(a);let c=new Ie(Mi,xi,t,e);c.layers=this.layers,this.add(c);let A=new Ie(Mi,xi,t,e);A.layers=this.layers,this.add(A)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let A of e)this.remove(A);if(t===rn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===bi)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let A of e)this.add(A),A.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,A,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),B=t.xr.enabled;t.xr.enabled=!1;let M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let d=!1;t.isWebGLRenderer===!0?d=t.state.buffers.depth.getReversed():d=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,A),n.texture.generateMipmaps=M,t.setRenderTarget(n,5,s),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,h,p),t.xr.enabled=B,n.texture.needsPMREMUpdate=!0}},Or=class extends Ie{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Ja="\\[\\]\\.:\\/",Sh=new RegExp("["+Ja+"]","g"),Ka="[^"+Ja+"]",bh="[^"+Ja.replace("\\.","")+"]",Ih=/((?:WC+[\/:])*)/.source.replace("WC",Ka),Dh=/(WCOD+)?/.source.replace("WCOD",bh),Th=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ka),Qh=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ka),Fh=new RegExp("^"+Ih+Dh+Th+Qh+"$"),Rh=["material","materials","bones","map"],Ba=class{constructor(t,e,n){let s=n||ae.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ae=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Sh,"")}static parseTrackName(t){let e=Fh.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Rh.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Qt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let A=e.objectIndex;switch(n){case"materials":if(!t.material){Ft("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ft("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ft("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===A){A=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ft("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ft("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Ft("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(A!==void 0){if(t[A]===void 0){Ft("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[A]}}let o=t[s];if(o===void 0){let A=e.nodeName;Ft("PropertyBinding: Trying to update property for track: "+A+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ft("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ft("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ae.Composite=Ba;ae.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ae.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ae.prototype.GetterByBindingType=[ae.prototype._getValue_direct,ae.prototype._getValue_array,ae.prototype._getValue_arrayElement,ae.prototype._getValue_toArray];ae.prototype.SetterByBindingTypeAndVersioning=[[ae.prototype._setValue_direct,ae.prototype._setValue_direct_setNeedsUpdate,ae.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ae.prototype._setValue_array,ae.prototype._setValue_array_setNeedsUpdate,ae.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ae.prototype._setValue_arrayElement,ae.prototype._setValue_arrayElement_setNeedsUpdate,ae.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ae.prototype._setValue_fromArray,ae.prototype._setValue_fromArray_setNeedsUpdate,ae.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Xg=new Float32Array(1);var tc=new Ae,Ms=class{constructor(t,e,n=0,s=1/0){this.ray=new Hn(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Qi,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Ft("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return tc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(tc),this}intersectObject(t,e=!0,n=[]){return wa(t,this,n,e),n.sort(ec),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)wa(t[s],this,n,e);return n.sort(ec),n}};function ec(i,t){return i.distance-t.distance}function wa(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)wa(r[o],t,e,!0)}}var Ni=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=kt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(kt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var tA=class tA{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};tA.prototype.isMatrix2=!0;var Ca=tA;var xs=class extends on{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Xa(i,t,e,n){let s=Uh(n);switch(e){case Ga:return i*t;case Ha:return i*t/s.components*s.byteLength;case Xr:return i*t/s.components*s.byteLength;case $n:return i*t*2/s.components*s.byteLength;case Zr:return i*t*2/s.components*s.byteLength;case Oa:return i*t*3/s.components*s.byteLength;case $e:return i*t*4/s.components*s.byteLength;case qr:return i*t*4/s.components*s.byteLength;case bs:case Is:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ds:case Ts:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case $r:case eo:return Math.max(i,16)*Math.max(t,8)/4;case jr:case to:return Math.max(i,8)*Math.max(t,8)/2;case no:case io:case ro:case oo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case so:case Qs:case ao:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ao:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case co:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case lo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ho:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case uo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case fo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case po:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case go:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case mo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Bo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case wo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Co:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Eo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case _o:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Mo:case xo:case yo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case vo:case So:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Fs:case bo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Uh(i){switch(i){case He:case Ua:return{byteLength:1,components:1};case Hi:case Pa:case hn:return{byteLength:2,components:1};case Jr:case Kr:return{byteLength:2,components:4};case cn:case Wr:case ln:return{byteLength:4,components:1};case La:case Na:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window!="undefined"&&(window.__THREE__?Qt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function hl(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Nh(i){let t=new WeakMap;function e(a,c){let A=a.array,u=a.usage,f=A.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,A,u),a.onUploadCallback();let p;if(A instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array!="undefined"&&A instanceof Float16Array)p=i.HALF_FLOAT;else if(A instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(A instanceof Int16Array)p=i.SHORT;else if(A instanceof Uint32Array)p=i.UNSIGNED_INT;else if(A instanceof Int32Array)p=i.INT;else if(A instanceof Int8Array)p=i.BYTE;else if(A instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(A instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+A);return{buffer:h,type:p,bytesPerElement:A.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,A){let u=c.array,f=c.updateRanges;if(i.bindBuffer(A,a),f.length===0)i.bufferSubData(A,0,u);else{f.sort((p,B)=>p.start-B.start);let h=0;for(let p=1;p<f.length;p++){let B=f[h],M=f[p];M.start<=B.start+B.count+1?B.count=Math.max(B.count,M.start+M.count-B.start):(++h,f[h]=M)}f.length=h+1;for(let p=0,B=f.length;p<B;p++){let M=f[p];i.bufferSubData(A,M.start*u.BYTES_PER_ELEMENT,u,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let A=t.get(a);if(A===void 0)t.set(a,e(a,c));else if(A.version<a.version){if(A.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(A.buffer,a,c),A.version=a.version}}return{get:s,remove:r,update:o}}var Gh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Oh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Hh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Wh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Jh=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Kh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,jh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,$h=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,tu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,eu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,nu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,iu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,su=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ru=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ou=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,au=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Au=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,lu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,hu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,du=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pu="gl_FragColor = linearToOutputTexel( gl_FragColor );",gu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Bu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,wu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Cu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Eu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_u=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Mu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Su=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Iu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Du=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Tu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Qu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ru=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Uu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Lu=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Nu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Gu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ou=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hu=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,ku=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Wu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ju=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ku=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Xu=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ju=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,$u=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,td=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ed=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,nd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,id=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,sd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,rd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,od=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ad=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Ad=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,cd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ld=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ud=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,pd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,md=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Bd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,wd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ed=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,_d=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Md=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,xd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,yd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Sd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Id=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Dd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Td=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Fd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Rd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ud=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Pd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ld=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Nd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Gd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Od=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Wd=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Jd=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Kd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Xd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$d=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,tf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ef=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,rf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,of=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,af=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Af=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,hf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,df=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ff=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,pf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ht={alphahash_fragment:Gh,alphahash_pars_fragment:Oh,alphamap_fragment:Hh,alphamap_pars_fragment:kh,alphatest_fragment:Vh,alphatest_pars_fragment:zh,aomap_fragment:Yh,aomap_pars_fragment:Wh,batching_pars_vertex:Jh,batching_vertex:Kh,begin_vertex:Xh,beginnormal_vertex:Zh,bsdfs:qh,iridescence_fragment:jh,bumpmap_pars_fragment:$h,clipping_planes_fragment:tu,clipping_planes_pars_fragment:eu,clipping_planes_pars_vertex:nu,clipping_planes_vertex:iu,color_fragment:su,color_pars_fragment:ru,color_pars_vertex:ou,color_vertex:au,common:Au,cube_uv_reflection_fragment:cu,defaultnormal_vertex:lu,displacementmap_pars_vertex:hu,displacementmap_vertex:uu,emissivemap_fragment:du,emissivemap_pars_fragment:fu,colorspace_fragment:pu,colorspace_pars_fragment:gu,envmap_fragment:mu,envmap_common_pars_fragment:Bu,envmap_pars_fragment:wu,envmap_pars_vertex:Cu,envmap_physical_pars_fragment:Tu,envmap_vertex:Eu,fog_vertex:_u,fog_pars_vertex:Mu,fog_fragment:xu,fog_pars_fragment:yu,gradientmap_pars_fragment:vu,lightmap_pars_fragment:Su,lights_lambert_fragment:bu,lights_lambert_pars_fragment:Iu,lights_pars_begin:Du,lights_toon_fragment:Qu,lights_toon_pars_fragment:Fu,lights_phong_fragment:Ru,lights_phong_pars_fragment:Uu,lights_physical_fragment:Pu,lights_physical_pars_fragment:Lu,lights_fragment_begin:Nu,lights_fragment_maps:Gu,lights_fragment_end:Ou,lightprobes_pars_fragment:Hu,logdepthbuf_fragment:ku,logdepthbuf_pars_fragment:Vu,logdepthbuf_pars_vertex:zu,logdepthbuf_vertex:Yu,map_fragment:Wu,map_pars_fragment:Ju,map_particle_fragment:Ku,map_particle_pars_fragment:Xu,metalnessmap_fragment:Zu,metalnessmap_pars_fragment:qu,morphinstance_vertex:ju,morphcolor_vertex:$u,morphnormal_vertex:td,morphtarget_pars_vertex:ed,morphtarget_vertex:nd,normal_fragment_begin:id,normal_fragment_maps:sd,normal_pars_fragment:rd,normal_pars_vertex:od,normal_vertex:ad,normalmap_pars_fragment:Ad,clearcoat_normal_fragment_begin:cd,clearcoat_normal_fragment_maps:ld,clearcoat_pars_fragment:hd,iridescence_pars_fragment:ud,opaque_fragment:dd,packing:fd,premultiplied_alpha_fragment:pd,project_vertex:gd,dithering_fragment:md,dithering_pars_fragment:Bd,roughnessmap_fragment:wd,roughnessmap_pars_fragment:Cd,shadowmap_pars_fragment:Ed,shadowmap_pars_vertex:_d,shadowmap_vertex:Md,shadowmask_pars_fragment:xd,skinbase_vertex:yd,skinning_pars_vertex:vd,skinning_vertex:Sd,skinnormal_vertex:bd,specularmap_fragment:Id,specularmap_pars_fragment:Dd,tonemapping_fragment:Td,tonemapping_pars_fragment:Qd,transmission_fragment:Fd,transmission_pars_fragment:Rd,uv_pars_fragment:Ud,uv_pars_vertex:Pd,uv_vertex:Ld,worldpos_vertex:Nd,background_vert:Gd,background_frag:Od,backgroundCube_vert:Hd,backgroundCube_frag:kd,cube_vert:Vd,cube_frag:zd,depth_vert:Yd,depth_frag:Wd,distance_vert:Jd,distance_frag:Kd,equirect_vert:Xd,equirect_frag:Zd,linedashed_vert:qd,linedashed_frag:jd,meshbasic_vert:$d,meshbasic_frag:tf,meshlambert_vert:ef,meshlambert_frag:nf,meshmatcap_vert:sf,meshmatcap_frag:rf,meshnormal_vert:of,meshnormal_frag:af,meshphong_vert:Af,meshphong_frag:cf,meshphysical_vert:lf,meshphysical_frag:hf,meshtoon_vert:uf,meshtoon_frag:df,points_vert:ff,points_frag:pf,shadow_vert:gf,shadow_frag:mf,sprite_vert:Bf,sprite_frag:wf},pt={common:{diffuse:{value:new Vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new Rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new Vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new Vt(16777215)},opacity:{value:1},center:{value:new Rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},En={basic:{uniforms:Qe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:Qe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Vt(0)},envMapIntensity:{value:1}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:Qe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Vt(0)},specular:{value:new Vt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:Qe([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:Qe([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Vt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:Qe([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:Qe([pt.points,pt.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:Qe([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:Qe([pt.common,pt.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:Qe([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:Qe([pt.sprite,pt.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distance:{uniforms:Qe([pt.common,pt.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distance_vert,fragmentShader:Ht.distance_frag},shadow:{uniforms:Qe([pt.lights,pt.fog,{color:{value:new Vt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};En.physical={uniforms:Qe([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new Rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new Vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new Rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new Vt(0)},specularColor:{value:new Vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new Rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};var Qo={r:0,b:0,g:0},Cf=new Ae,ul=new Ut;ul.set(-1,0,0,0,1,0,0,0,1);function Ef(i,t,e,n,s,r){let o=new Vt(0),a=s===!0?0:1,c,A,u=null,f=0,h=null;function p(y){let v=y.isScene===!0?y.background:null;if(v&&v.isTexture){let m=y.backgroundBlurriness>0;v=t.get(v,m)}return v}function B(y){let v=!1,m=p(y);m===null?d(o,a):m&&m.isColor&&(d(m,1),v=!0);let E=i.xr.getEnvironmentBlendMode();E==="additive"?e.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||v)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(y,v){let m=p(v);m&&(m.isCubeTexture||m.mapping===vs)?(A===void 0&&(A=new _e(new Pi(1,1,1),new Ke({name:"BackgroundCubeMaterial",uniforms:Ai(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:Pe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),A.geometry.deleteAttribute("normal"),A.geometry.deleteAttribute("uv"),A.onBeforeRender=function(E,_,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(A.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(A)),A.material.uniforms.envMap.value=m,A.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,A.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,A.material.uniforms.backgroundRotation.value.setFromMatrix4(Cf.makeRotationFromEuler(v.backgroundRotation)).transpose(),m.isCubeTexture&&m.isRenderTargetTexture===!1&&A.material.uniforms.backgroundRotation.value.premultiply(ul),A.material.toneMapped=Yt.getTransfer(m.colorSpace)!==jt,(u!==m||f!==m.version||h!==i.toneMapping)&&(A.material.needsUpdate=!0,u=m,f=m.version,h=i.toneMapping),A.layers.enableAll(),y.unshift(A,A.geometry,A.material,0,0,null)):m&&m.isTexture&&(c===void 0&&(c=new _e(new Vn(2,2),new Ke({name:"BackgroundMaterial",uniforms:Ai(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=m,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Yt.getTransfer(m.colorSpace)!==jt,m.matrixAutoUpdate===!0&&m.updateMatrix(),c.material.uniforms.uvTransform.value.copy(m.matrix),(u!==m||f!==m.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=m,f=m.version,h=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function d(y,v){y.getRGB(Qo,Wa(i)),e.buffers.color.setClear(Qo.r,Qo.g,Qo.b,v,r)}function l(){A!==void 0&&(A.geometry.dispose(),A.material.dispose(),A=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,v=1){o.set(y),a=v,d(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,d(o,a)},render:B,addToRenderList:M,dispose:l}}function _f(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,o=!1;function a(D,N,H,Q,V){let Z=!1,J=f(D,Q,H,N);r!==J&&(r=J,A(r.object)),Z=p(D,Q,H,V),Z&&B(D,Q,H,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,m(D,N,H,Q),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function c(){return i.createVertexArray()}function A(D){return i.bindVertexArray(D)}function u(D){return i.deleteVertexArray(D)}function f(D,N,H,Q){let V=Q.wireframe===!0,Z=n[N.id];Z===void 0&&(Z={},n[N.id]=Z);let J=D.isInstancedMesh===!0?D.id:0,et=Z[J];et===void 0&&(et={},Z[J]=et);let W=et[H.id];W===void 0&&(W={},et[H.id]=W);let $=W[V];return $===void 0&&($=h(c()),W[V]=$),$}function h(D){let N=[],H=[],Q=[];for(let V=0;V<e;V++)N[V]=0,H[V]=0,Q[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:H,attributeDivisors:Q,object:D,attributes:{},index:null}}function p(D,N,H,Q){let V=r.attributes,Z=N.attributes,J=0,et=H.getAttributes();for(let W in et)if(et[W].location>=0){let tt=V[W],it=Z[W];if(it===void 0&&(W==="instanceMatrix"&&D.instanceMatrix&&(it=D.instanceMatrix),W==="instanceColor"&&D.instanceColor&&(it=D.instanceColor)),tt===void 0||tt.attribute!==it||it&&tt.data!==it.data)return!0;J++}return r.attributesNum!==J||r.index!==Q}function B(D,N,H,Q){let V={},Z=N.attributes,J=0,et=H.getAttributes();for(let W in et)if(et[W].location>=0){let tt=Z[W];tt===void 0&&(W==="instanceMatrix"&&D.instanceMatrix&&(tt=D.instanceMatrix),W==="instanceColor"&&D.instanceColor&&(tt=D.instanceColor));let it={};it.attribute=tt,tt&&tt.data&&(it.data=tt.data),V[W]=it,J++}r.attributes=V,r.attributesNum=J,r.index=Q}function M(){let D=r.newAttributes;for(let N=0,H=D.length;N<H;N++)D[N]=0}function d(D){l(D,0)}function l(D,N){let H=r.newAttributes,Q=r.enabledAttributes,V=r.attributeDivisors;H[D]=1,Q[D]===0&&(i.enableVertexAttribArray(D),Q[D]=1),V[D]!==N&&(i.vertexAttribDivisor(D,N),V[D]=N)}function y(){let D=r.newAttributes,N=r.enabledAttributes;for(let H=0,Q=N.length;H<Q;H++)N[H]!==D[H]&&(i.disableVertexAttribArray(H),N[H]=0)}function v(D,N,H,Q,V,Z,J){J===!0?i.vertexAttribIPointer(D,N,H,V,Z):i.vertexAttribPointer(D,N,H,Q,V,Z)}function m(D,N,H,Q){M();let V=Q.attributes,Z=H.getAttributes(),J=N.defaultAttributeValues;for(let et in Z){let W=Z[et];if(W.location>=0){let $=V[et];if($===void 0&&(et==="instanceMatrix"&&D.instanceMatrix&&($=D.instanceMatrix),et==="instanceColor"&&D.instanceColor&&($=D.instanceColor)),$!==void 0){let tt=$.normalized,it=$.itemSize,st=t.get($);if(st===void 0)continue;let It=st.buffer,wt=st.type,at=st.bytesPerElement,L=wt===i.INT||wt===i.UNSIGNED_INT||$.gpuType===Wr;if($.isInterleavedBufferAttribute){let z=$.data,ot=z.stride,Et=$.offset;if(z.isInstancedInterleavedBuffer){for(let ct=0;ct<W.locationSize;ct++)l(W.location+ct,z.meshPerAttribute);D.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let ct=0;ct<W.locationSize;ct++)d(W.location+ct);i.bindBuffer(i.ARRAY_BUFFER,It);for(let ct=0;ct<W.locationSize;ct++)v(W.location+ct,it/W.locationSize,wt,tt,ot*at,(Et+it/W.locationSize*ct)*at,L)}else{if($.isInstancedBufferAttribute){for(let z=0;z<W.locationSize;z++)l(W.location+z,$.meshPerAttribute);D.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let z=0;z<W.locationSize;z++)d(W.location+z);i.bindBuffer(i.ARRAY_BUFFER,It);for(let z=0;z<W.locationSize;z++)v(W.location+z,it/W.locationSize,wt,tt,it*at,it/W.locationSize*z*at,L)}}else if(J!==void 0){let tt=J[et];if(tt!==void 0)switch(tt.length){case 2:i.vertexAttrib2fv(W.location,tt);break;case 3:i.vertexAttrib3fv(W.location,tt);break;case 4:i.vertexAttrib4fv(W.location,tt);break;default:i.vertexAttrib1fv(W.location,tt)}}}}y()}function E(){x();for(let D in n){let N=n[D];for(let H in N){let Q=N[H];for(let V in Q){let Z=Q[V];for(let J in Z)u(Z[J].object),delete Z[J];delete Q[V]}}delete n[D]}}function _(D){if(n[D.id]===void 0)return;let N=n[D.id];for(let H in N){let Q=N[H];for(let V in Q){let Z=Q[V];for(let J in Z)u(Z[J].object),delete Z[J];delete Q[V]}}delete n[D.id]}function b(D){for(let N in n){let H=n[N];for(let Q in H){let V=H[Q];if(V[D.id]===void 0)continue;let Z=V[D.id];for(let J in Z)u(Z[J].object),delete Z[J];delete V[D.id]}}}function w(D){for(let N in n){let H=n[N],Q=D.isInstancedMesh===!0?D.id:0,V=H[Q];if(V!==void 0){for(let Z in V){let J=V[Z];for(let et in J)u(J[et].object),delete J[et];delete V[Z]}delete H[Q],Object.keys(H).length===0&&delete n[N]}}}function x(){I(),o=!0,r!==s&&(r=s,A(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:x,resetDefaultState:I,dispose:E,releaseStatesOfGeometry:_,releaseStatesOfObject:w,releaseStatesOfProgram:b,initAttributes:M,enableAttribute:d,disableUnusedAttributes:y}}function Mf(i,t,e){let n;function s(c){n=c}function r(c,A){i.drawArrays(n,c,A),e.update(A,n,1)}function o(c,A,u){u!==0&&(i.drawArraysInstanced(n,c,A,u),e.update(A,n,u))}function a(c,A,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,A,0,u);let h=0;for(let p=0;p<u;p++)h+=A[p];e.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function xf(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let b=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(b){return!(b!==$e&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){let w=b===hn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==He&&b!==ln&&!w&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let A=e.precision!==void 0?e.precision:"highp",u=c(A);u!==A&&(Qt("WebGLRenderer:",A,"not supported, using",u,"instead."),A=u);let f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Qt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),B=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),d=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),l=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),m=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=i.getParameter(i.MAX_SAMPLES),_=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:A,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:B,maxTextureSize:M,maxCubemapSize:d,maxAttributes:l,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:m,maxSamples:E,samples:_}}function yf(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Ye,a=new Ut,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let p=f.length!==0||h||n!==0||s;return s=h,n=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,p){let B=f.clippingPlanes,M=f.clipIntersection,d=f.clipShadows,l=i.get(f);if(!s||B===null||B.length===0||r&&!d)r?u(null):A();else{let y=r?0:n,v=y*4,m=l.clippingState||null;c.value=m,m=u(B,h,v,p);for(let E=0;E!==v;++E)m[E]=e[E];l.clippingState=m,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=y}};function A(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,h,p,B){let M=f!==null?f.length:0,d=null;if(M!==0){if(d=c.value,B!==!0||d===null){let l=p+M*4,y=h.matrixWorldInverse;a.getNormalMatrix(y),(d===null||d.length<l)&&(d=new Float32Array(l));for(let v=0,m=p;v!==M;++v,m+=4)o.copy(f[v]).applyMatrix4(y,a),o.normal.toArray(d,m),d[m+3]=o.constant}c.value=d,c.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,d}}var Yi=4,vf=6,Sf=20,bf=256,Rs=new Li,zc=new Vt,eA=null,nA=0,iA=0,sA=!1,If=new U,ci=new U,Ro=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=If}=r;eA=this._renderer.getRenderTarget(),nA=this._renderer.getActiveCubeFace(),iA=this._renderer.getActiveMipmapLevel(),sA=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(eA,nA,iA),this._renderer.xr.enabled=sA,t.scissorTest=!1,zi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Zn||t.mapping===ai?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),eA=this._renderer.getRenderTarget(),nA=this._renderer.getActiveCubeFace(),iA=this._renderer.getActiveMipmapLevel(),sA=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Me,minFilter:Me,generateMipmaps:!1,type:hn,format:$e,colorSpace:as,depthBuffer:!1},s=Yc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yc(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Df(r)),this._blurMaterial=Qf(r,t,e),this._ggxMaterial=Tf(r,t,e)}return s}_compileMaterial(t){let e=new _e(new xe,t);this._renderer.compile(e,Rs)}_sceneToCubeUV(t,e,n,s,r){let c=new Ie(90,1,e,n),A=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,p=f.toneMapping;f.getClearColor(zc),f.toneMapping=An,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new _e(new Pi,new an({name:"PMREM.Background",side:Pe,depthWrite:!1,depthTest:!1})));let M=this._backgroundBox,d=M.material,l=!1,y=t.background;y?y.isColor&&(d.color.copy(y),t.background=null,l=!0):(d.color.copy(zc),l=!0);for(let v=0;v<6;v++){let m=v%3;m===0?(c.up.set(0,A[v],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[v],r.y,r.z)):m===1?(c.up.set(0,0,A[v]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[v],r.z)):(c.up.set(0,A[v],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[v]));let E=this._cubeSize;zi(s,m*E,v>2?E:0,E,E),f.setRenderTarget(s),l&&f.render(M,c),f.render(t,c)}f.toneMapping=p,f.autoClear=h,t.background=y}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Zn||t.mapping===ai;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wc());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;zi(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Rs)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let c=o.uniforms,A=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(A*A-u*u),h=A*1.25,p=f*h,{_lodMax:B}=this,M=this._sizeLods[n],d=3*M*(n>B-Yi?n-B+Yi:0),l=4*(this._cubeSize-M);c.envMap.value=t.texture,c.roughness.value=p,c.mipInt.value=B-e,zi(r,d,l,3*M,2*M),s.setRenderTarget(r),s.render(a,Rs),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=B-n,zi(t,d,l,3*M,2*M),s.setRenderTarget(t),s.render(a,Rs)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,s,r){let o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[s];c.material=a;let A=a.uniforms;A.envMap.value=t.texture,A.sigma.value=r,A.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],f=3*u*(s>this._lodMax-Yi?s-this._lodMax+Yi:0),h=4*(this._cubeSize-u);zi(e,f,h,3*u,2*u),o.setRenderTarget(e),o.render(c,Rs)}};function Df(i){let t=[],e=[],n=i,s=i-Yi+1+vf;for(let r=0;r<s;r++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),c=-a,A=1+a,u=[c,c,A,c,A,A,c,c,A,A,c,A],f=6,h=6,p=3,B=new Float32Array(p*h*f),M=new Float32Array(p*h*f);for(let l=0;l<f;l++){let y=l%3*2/3-1,v=l>2?0:-1,m=[y,v,0,y+2/3,v,0,y+2/3,v+1,0,y,v,0,y+2/3,v+1,0,y,v+1,0];B.set(m,p*h*l);for(let E=0;E<h;E++){let _=u[E*2]*2-1,b=u[E*2+1]*2-1;l===0?ci.set(1,b,_):l===1?ci.set(-_,1,-b):l===2?ci.set(-_,b,1):l===3?ci.set(-1,b,-_):l===4?ci.set(-_,-1,b):ci.set(_,b,-1),ci.toArray(M,(l*h+E)*p)}}let d=new xe;d.setAttribute("position",new pe(B,p)),d.setAttribute("outputDirection",new pe(M,p)),e.push(new _e(d,null)),n>Yi&&n--}return{lodMeshes:e,sizeLods:t}}function Yc(i,t,e){let n=new Oe(i,t,e);return n.texture.mapping=vs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function zi(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Tf(i,t,e){return new Ke({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:bf,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Lo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Qf(i,t,e){return new Ke({name:"SphericalGaussianBlur",defines:{SAMPLES:Sf,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Lo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Wc(){return new Ke({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Lo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Jc(){return new Ke({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Lo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Lo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Uo=class extends Oe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ps(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Pi(5,5,5),r=new Ke({name:"CubemapFromEquirect",uniforms:Ai(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pe,blending:wn});r.uniforms.tEquirect.value=e;let o=new _e(s,r),a=e.minFilter;return e.minFilter===qn&&(e.minFilter=Me),new Gr(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}};function Ff(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,p=!1){return h==null?null:p?o(h):r(h)}function r(h){if(h&&h.isTexture){let p=h.mapping;if(p===Vr||p===zr)if(t.has(h)){let B=t.get(h).texture;return a(B,h.mapping)}else{let B=h.image;if(B&&B.height>0){let M=new Uo(B.height);return M.fromEquirectangularTexture(i,h),t.set(h,M),h.addEventListener("dispose",A),a(M.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){let p=h.mapping,B=p===Vr||p===zr,M=p===Zn||p===ai;if(B||M){let d=e.get(h),l=d!==void 0?d.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==l)return n===null&&(n=new Ro(i)),d=B?n.fromEquirectangular(h,d):n.fromCubemap(h,d),d.texture.pmremVersion=h.pmremVersion,e.set(h,d),d.texture;if(d!==void 0)return d.texture;{let y=h.image;return B&&y&&y.height>0||M&&y&&c(y)?(n===null&&(n=new Ro(i)),d=B?n.fromEquirectangular(h):n.fromCubemap(h),d.texture.pmremVersion=h.pmremVersion,e.set(h,d),h.addEventListener("dispose",u),d.texture):null}}}return h}function a(h,p){return p===Vr?h.mapping=Zn:p===zr&&(h.mapping=ai),h}function c(h){let p=0,B=6;for(let M=0;M<B;M++)h[M]!==void 0&&p++;return p===B}function A(h){let p=h.target;p.removeEventListener("dispose",A);let B=t.get(p);B!==void 0&&(t.delete(p),B.dispose())}function u(h){let p=h.target;p.removeEventListener("dispose",u);let B=e.get(p);B!==void 0&&(e.delete(p),B.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function Rf(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&ri("WebGLRenderer: "+n+" extension not supported."),s}}}function Uf(i,t,e,n){let s={},r=new WeakMap;function o(f){let h=f.target;h.index!==null&&t.remove(h.index);for(let B in h.attributes)t.remove(h.attributes[B]);h.removeEventListener("dispose",o),delete s[h.id];let p=r.get(h);p&&(t.remove(p),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(f,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function c(f){let h=f.attributes;for(let p in h)t.update(h[p],i.ARRAY_BUFFER)}function A(f){let h=[],p=f.index,B=f.attributes.position,M=0;if(B===void 0)return;if(p!==null){let y=p.array;M=p.version;for(let v=0,m=y.length;v<m;v+=3){let E=y[v+0],_=y[v+1],b=y[v+2];h.push(E,_,_,b,b,E)}}else{let y=B.array;M=B.version;for(let v=0,m=y.length/3-1;v<m;v+=3){let E=v+0,_=v+1,b=v+2;h.push(E,_,_,b,b,E)}}let d=new(B.count>=65535?ds:us)(h,1);d.version=M;let l=r.get(f);l&&t.remove(l),r.set(f,d)}function u(f){let h=r.get(f);if(h){let p=f.index;p!==null&&h.version<p.version&&A(f)}else A(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function Pf(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,h){i.drawElements(n,h,r,f*o),e.update(h,n,1)}function A(f,h,p){p!==0&&(i.drawElementsInstanced(n,h,r,f*o,p),e.update(h,n,p))}function u(f,h,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,p);let M=0;for(let d=0;d<p;d++)M+=h[d];e.update(M,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=A,this.renderMultiDraw=u}function Lf(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Ft("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Nf(i,t,e){let n=new WeakMap,s=new ce;function r(o,a,c){let A=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0,h=n.get(a);if(h===void 0||h.count!==f){let x=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",x)};h!==void 0&&h.texture.dispose();let p=a.morphAttributes.position!==void 0,B=a.morphAttributes.normal!==void 0,M=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],l=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],v=0;p===!0&&(v=1),B===!0&&(v=2),M===!0&&(v=3);let m=a.attributes.position.count*v,E=1;m>t.maxTextureSize&&(E=Math.ceil(m/t.maxTextureSize),m=t.maxTextureSize);let _=new Float32Array(m*E*4*f),b=new ls(_,m,E,f);b.type=ln,b.needsUpdate=!0;let w=v*4;for(let I=0;I<f;I++){let D=d[I],N=l[I],H=y[I],Q=m*E*4*I;for(let V=0;V<D.count;V++){let Z=V*w;p===!0&&(s.fromBufferAttribute(D,V),_[Q+Z+0]=s.x,_[Q+Z+1]=s.y,_[Q+Z+2]=s.z,_[Q+Z+3]=0),B===!0&&(s.fromBufferAttribute(N,V),_[Q+Z+4]=s.x,_[Q+Z+5]=s.y,_[Q+Z+6]=s.z,_[Q+Z+7]=0),M===!0&&(s.fromBufferAttribute(H,V),_[Q+Z+8]=s.x,_[Q+Z+9]=s.y,_[Q+Z+10]=s.z,_[Q+Z+11]=H.itemSize===4?s.w:1)}}h={count:f,texture:b,size:new Rt(m,E)},n.set(a,h),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let p=0;for(let M=0;M<A.length;M++)p+=A[M];let B=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",B),c.getUniforms().setValue(i,"morphTargetInfluences",A)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Gf(i,t,e,n,s){let r=new WeakMap;function o(A){let u=s.render.frame,f=A.geometry,h=t.get(A,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),A.isInstancedMesh&&(A.hasEventListener("dispose",c)===!1&&A.addEventListener("dispose",c),r.get(A)!==u&&(e.update(A.instanceMatrix,i.ARRAY_BUFFER),A.instanceColor!==null&&e.update(A.instanceColor,i.ARRAY_BUFFER),r.set(A,u))),A.isSkinnedMesh){let p=A.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return h}function a(){r=new WeakMap}function c(A){let u=A.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}var Of={[Sa]:"LINEAR_TONE_MAPPING",[ba]:"REINHARD_TONE_MAPPING",[Ia]:"CINEON_TONE_MAPPING",[Da]:"ACES_FILMIC_TONE_MAPPING",[Qa]:"AGX_TONE_MAPPING",[Fa]:"NEUTRAL_TONE_MAPPING",[Ta]:"CUSTOM_TONE_MAPPING"};function Hf(i,t,e,n,s,r){let o=new Oe(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,A=new xe;A.setAttribute("position",new We([-1,3,0,-1,-1,0,3,-1,0],3)),A.setAttribute("uv",new We([0,2,0,0,2,0],2));let u=new yr({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new _e(A,u),h=new Li(-1,1,1,-1,0,1),p=null,B=null,M=!1,d,l=null,y=[],v=!1;this.setSize=function(m,E){o.setSize(m,E),a!==null&&a.setSize(m,E),c!==null&&c.setSize(m,E);for(let _=0;_<y.length;_++){let b=y[_];b.setSize&&b.setSize(m,E)}},this.setEffects=function(m){y=m,v=y.length>0&&y[0].isRenderPass===!0;let E=o.width,_=o.height;y.length>0&&a===null&&(a=new Oe(E,_,{type:hn,depthBuffer:!1,stencilBuffer:!1}),c=new Oe(E,_,{type:hn,depthBuffer:!1,stencilBuffer:!1}));for(let b=0;b<y.length;b++){let w=y[b];w.setSize&&w.setSize(E,_)}},this.begin=function(m,E){if(M||m.toneMapping===An&&y.length===0)return!1;if(l=E,E!==null){let _=E.width,b=E.height;(o.width!==_||o.height!==b)&&this.setSize(_,b)}return v===!1&&m.setRenderTarget(o),d=m.toneMapping,m.toneMapping=An,!0},this.hasRenderPass=function(){return v},this.end=function(m,E){m.toneMapping=d,M=!0;let _=o,b=a;for(let w=0;w<y.length;w++){let x=y[w];x.enabled!==!1&&(x.render(m,b,_,E),x.needsSwap!==!1&&(_=b,b=b===a?c:a))}if(p!==m.outputColorSpace||B!==m.toneMapping){p=m.outputColorSpace,B=m.toneMapping,u.defines={},Yt.getTransfer(p)===jt&&(u.defines.SRGB_TRANSFER="");let w=Of[B];w&&(u.defines[w]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=_.texture,m.setRenderTarget(l),m.render(f,h),l=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),A.dispose(),u.dispose()}}var dl=new Ge,aA=new kn(1,1),fl=new ls,pl=new Cr,gl=new ps,Kc=[],Xc=[],Zc=new Float32Array(16),qc=new Float32Array(9),jc=new Float32Array(4);function Ji(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Kc[s];if(r===void 0&&(r=new Float32Array(s),Kc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function ge(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function me(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function No(i,t){let e=Xc[t];e===void 0&&(e=new Int32Array(t),Xc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function kf(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Vf(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2fv(this.addr,t),me(e,t)}}function zf(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ge(e,t))return;i.uniform3fv(this.addr,t),me(e,t)}}function Yf(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4fv(this.addr,t),me(e,t)}}function Wf(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),me(e,t)}else{if(ge(e,n))return;jc.set(n),i.uniformMatrix2fv(this.addr,!1,jc),me(e,n)}}function Jf(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),me(e,t)}else{if(ge(e,n))return;qc.set(n),i.uniformMatrix3fv(this.addr,!1,qc),me(e,n)}}function Kf(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),me(e,t)}else{if(ge(e,n))return;Zc.set(n),i.uniformMatrix4fv(this.addr,!1,Zc),me(e,n)}}function Xf(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Zf(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2iv(this.addr,t),me(e,t)}}function qf(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;i.uniform3iv(this.addr,t),me(e,t)}}function jf(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4iv(this.addr,t),me(e,t)}}function $f(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function tp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2uiv(this.addr,t),me(e,t)}}function ep(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;i.uniform3uiv(this.addr,t),me(e,t)}}function np(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4uiv(this.addr,t),me(e,t)}}function ip(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(aA.compareFunction=e.isReversedDepthBuffer()?To:Do,r=aA):r=dl,e.setTexture2D(t||r,s)}function sp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||pl,s)}function rp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||gl,s)}function op(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||fl,s)}function ap(i){switch(i){case 5126:return kf;case 35664:return Vf;case 35665:return zf;case 35666:return Yf;case 35674:return Wf;case 35675:return Jf;case 35676:return Kf;case 5124:case 35670:return Xf;case 35667:case 35671:return Zf;case 35668:case 35672:return qf;case 35669:case 35673:return jf;case 5125:return $f;case 36294:return tp;case 36295:return ep;case 36296:return np;case 35678:case 36198:case 36298:case 36306:case 35682:return ip;case 35679:case 36299:case 36307:return sp;case 35680:case 36300:case 36308:case 36293:return rp;case 36289:case 36303:case 36311:case 36292:return op}}function Ap(i,t){i.uniform1fv(this.addr,t)}function cp(i,t){let e=Ji(t,this.size,2);i.uniform2fv(this.addr,e)}function lp(i,t){let e=Ji(t,this.size,3);i.uniform3fv(this.addr,e)}function hp(i,t){let e=Ji(t,this.size,4);i.uniform4fv(this.addr,e)}function up(i,t){let e=Ji(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function dp(i,t){let e=Ji(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function fp(i,t){let e=Ji(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function pp(i,t){i.uniform1iv(this.addr,t)}function gp(i,t){i.uniform2iv(this.addr,t)}function mp(i,t){i.uniform3iv(this.addr,t)}function Bp(i,t){i.uniform4iv(this.addr,t)}function wp(i,t){i.uniform1uiv(this.addr,t)}function Cp(i,t){i.uniform2uiv(this.addr,t)}function Ep(i,t){i.uniform3uiv(this.addr,t)}function _p(i,t){i.uniform4uiv(this.addr,t)}function Mp(i,t,e){let n=this.cache,s=t.length,r=No(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),me(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=aA:o=dl;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function xp(i,t,e){let n=this.cache,s=t.length,r=No(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),me(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||pl,r[o])}function yp(i,t,e){let n=this.cache,s=t.length,r=No(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),me(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||gl,r[o])}function vp(i,t,e){let n=this.cache,s=t.length,r=No(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),me(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||fl,r[o])}function Sp(i){switch(i){case 5126:return Ap;case 35664:return cp;case 35665:return lp;case 35666:return hp;case 35674:return up;case 35675:return dp;case 35676:return fp;case 5124:case 35670:return pp;case 35667:case 35671:return gp;case 35668:case 35672:return mp;case 35669:case 35673:return Bp;case 5125:return wp;case 36294:return Cp;case 36295:return Ep;case 36296:return _p;case 35678:case 36198:case 36298:case 36306:case 35682:return Mp;case 35679:case 36299:case 36307:return xp;case 35680:case 36300:case 36308:case 36293:return yp;case 36289:case 36303:case 36311:case 36292:return vp}}var AA=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ap(e.type)}},cA=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Sp(e.type)}},lA=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},rA=/(\w+)(\])?(\[|\.)?/g;function $c(i,t){i.seq.push(t),i.map[t.id]=t}function bp(i,t,e){let n=i.name,s=n.length;for(rA.lastIndex=0;;){let r=rA.exec(n),o=rA.lastIndex,a=r[1],c=r[2]==="]",A=r[3];if(c&&(a=a|0),A===void 0||A==="["&&o+2===s){$c(e,A===void 0?new AA(a,i,t):new cA(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new lA(a),$c(e,f)),e=f}}}var Wi=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);bp(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function tl(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Ip=37297,Dp=0;function Tp(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var el=new Ut;function Qp(i){Yt._getMatrix(el,Yt.workingColorSpace,i);let t=`mat3( ${el.elements.map(e=>e.toFixed(4))} )`;switch(Yt.getTransfer(i)){case As:return[t,"LinearTransferOETF"];case jt:return[t,"sRGBTransferOETF"];default:return Qt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function nl(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Tp(i.getShaderSource(t),a)}else return r}function Fp(i,t){let e=Qp(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var Rp={[Sa]:"Linear",[ba]:"Reinhard",[Ia]:"Cineon",[Da]:"ACESFilmic",[Qa]:"AgX",[Fa]:"Neutral",[Ta]:"Custom"};function Up(i,t){let e=Rp[t];return e===void 0?(Qt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Fo=new U;function Pp(){Yt.getLuminanceCoefficients(Fo);let i=Fo.x.toFixed(4),t=Fo.y.toFixed(4),e=Fo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ps).join(`
`)}function Np(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Gp(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ps(i){return i!==""}function il(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function sl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Op=/^[ \t]*#include +<([\w\d./]+)>/gm;function hA(i){return i.replace(Op,kp)}var Hp=new Map;function kp(i,t){let e=Ht[t];if(e===void 0){let n=Hp.get(t);if(n!==void 0)e=Ht[n],Qt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return hA(e)}var Vp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rl(i){return i.replace(Vp,zp)}function zp(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ol(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Yp={[ys]:"SHADOWMAP_TYPE_PCF",[Gi]:"SHADOWMAP_TYPE_VSM"};function Wp(i){return Yp[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Jp={[Zn]:"ENVMAP_TYPE_CUBE",[ai]:"ENVMAP_TYPE_CUBE",[vs]:"ENVMAP_TYPE_CUBE_UV"};function Kp(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Jp[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Xp={[ai]:"ENVMAP_MODE_REFRACTION"};function Zp(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Xp[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var qp={[kr]:"ENVMAP_BLENDING_MULTIPLY",[Mc]:"ENVMAP_BLENDING_MIX",[xc]:"ENVMAP_BLENDING_ADD"};function jp(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":qp[i.combine]||"ENVMAP_BLENDING_NONE"}function $p(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function tg(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=Wp(e),A=Kp(e),u=Zp(e),f=jp(e),h=$p(e),p=Lp(e),B=Np(r),M=s.createProgram(),d,l,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,B].filter(Ps).join(`
`),d.length>0&&(d+=`
`),l=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,B].filter(Ps).join(`
`),l.length>0&&(l+=`
`)):(d=[ol(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,B,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ps).join(`
`),l=[ol(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,B,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+A:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==An?"#define TONE_MAPPING":"",e.toneMapping!==An?Ht.tonemapping_pars_fragment:"",e.toneMapping!==An?Up("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,Fp("linearToOutputTexel",e.outputColorSpace),Pp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ps).join(`
`)),o=hA(o),o=il(o,e),o=sl(o,e),a=hA(a),a=il(a,e),a=sl(a,e),o=rl(o),a=rl(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,d=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,l=["#define varying in",e.glslVersion===ka?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ka?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+l);let v=y+d+o,m=y+l+a,E=tl(s,s.VERTEX_SHADER,v),_=tl(s,s.FRAGMENT_SHADER,m);s.attachShader(M,E),s.attachShader(M,_),e.index0AttributeName!==void 0?s.bindAttribLocation(M,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function b(D){if(i.debug.checkShaderErrors){let N=s.getProgramInfoLog(M)||"",H=s.getShaderInfoLog(E)||"",Q=s.getShaderInfoLog(_)||"",V=N.trim(),Z=H.trim(),J=Q.trim(),et=!0,W=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(et=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,M,E,_);else{let $=nl(s,E,"vertex"),tt=nl(s,_,"fragment");Ft("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+V+`
`+$+`
`+tt)}else V!==""?Qt("WebGLProgram: Program Info Log:",V):(Z===""||J==="")&&(W=!1);W&&(D.diagnostics={runnable:et,programLog:V,vertexShader:{log:Z,prefix:d},fragmentShader:{log:J,prefix:l}})}s.deleteShader(E),s.deleteShader(_),w=new Wi(s,M),x=Gp(s,M)}let w;this.getUniforms=function(){return w===void 0&&b(this),w};let x;this.getAttributes=function(){return x===void 0&&b(this),x};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(M,Ip)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Dp++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=E,this.fragmentShader=_,this}var eg=0,uA=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new dA(t),e.set(t,n)),n}},dA=class{constructor(t){this.id=eg++,this.code=t,this.usedTimes=0}};function ng(i){return i===$n||i===Qs||i===Fs}function ig(i,t,e,n,s,r){let o=new Qi,a=new uA,c=new Set,A=[],u=new Map,f=n.logarithmicDepthBuffer,h=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function B(w){return c.add(w),w===0?"uv":`uv${w}`}function M(w,x,I,D,N,H){let Q=D.fog,V=N.geometry,Z=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?D.environment:null,J=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap,et=t.get(w.envMap||Z,J),W=et&&et.mapping===vs?et.image.height:null,$=p[w.type];w.precision!==null&&(h=n.getMaxPrecision(w.precision),h!==w.precision&&Qt("WebGLProgram.getParameters:",w.precision,"not supported, using",h,"instead."));let tt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,it=tt!==void 0?tt.length:0,st=0;V.morphAttributes.position!==void 0&&(st=1),V.morphAttributes.normal!==void 0&&(st=2),V.morphAttributes.color!==void 0&&(st=3);let It,wt,at,L;if($){let se=En[$];It=se.vertexShader,wt=se.fragmentShader}else{It=w.vertexShader,wt=w.fragmentShader;let se=a.getVertexShaderStage(w),Zt=a.getFragmentShaderStage(w);a.update(w,se,Zt),at=se.id,L=Zt.id}let z=i.getRenderTarget(),ot=i.state.buffers.depth.getReversed(),Et=N.isInstancedMesh===!0,ct=N.isBatchedMesh===!0,Pt=!!w.map,ie=!!w.matcap,Lt=!!et,Wt=!!w.aoMap,Kt=!!w.lightMap,Gt=!!w.bumpMap&&w.wireframe===!1,Xt=!!w.normalMap,we=!!w.displacementMap,Le=!!w.emissiveMap,le=!!w.metalnessMap,ue=!!w.roughnessMap,R=w.anisotropy>0,ye=w.clearcoat>0,$t=w.dispersion>0,S=w.retroreflectivity>0,g=w.iridescence>0,P=w.sheen>0,k=w.transmission>0,K=R&&!!w.anisotropyMap,rt=ye&&!!w.clearcoatMap,At=ye&&!!w.clearcoatNormalMap,X=ye&&!!w.clearcoatRoughnessMap,j=g&&!!w.iridescenceMap,lt=g&&!!w.iridescenceThicknessMap,St=P&&!!w.sheenColorMap,ft=P&&!!w.sheenRoughnessMap,ht=!!w.specularMap,bt=!!w.specularColorMap,Tt=!!w.specularIntensityMap,Nt=k&&!!w.transmissionMap,F=k&&!!w.thicknessMap,ut=!!w.gradientMap,q=!!w.alphaMap,dt=w.alphaTest>0,Bt=!!w.alphaHash,nt=!!w.extensions,Dt=An;w.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(Dt=i.toneMapping);let yt={shaderID:$,shaderType:w.type,shaderName:w.name,vertexShader:It,fragmentShader:wt,defines:w.defines,customVertexShaderID:at,customFragmentShaderID:L,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:h,batching:ct,batchingColor:ct&&N._colorsTexture!==null,instancing:Et,instancingColor:Et&&N.instanceColor!==null,instancingMorph:Et&&N.morphTexture!==null,outputColorSpace:z===null?i.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:Yt.workingColorSpace,alphaToCoverage:!!w.alphaToCoverage,map:Pt,matcap:ie,envMap:Lt,envMapMode:Lt&&et.mapping,envMapCubeUVHeight:W,aoMap:Wt,lightMap:Kt,bumpMap:Gt,normalMap:Xt,displacementMap:we,emissiveMap:Le,normalMapObjectSpace:Xt&&w.normalMapType===Sc,normalMapTangentSpace:Xt&&w.normalMapType===Io,packedNormalMap:Xt&&w.normalMapType===Io&&ng(w.normalMap.format),metalnessMap:le,roughnessMap:ue,anisotropy:R,anisotropyMap:K,clearcoat:ye,clearcoatMap:rt,clearcoatNormalMap:At,clearcoatRoughnessMap:X,dispersion:$t,retroreflection:S,iridescence:g,iridescenceMap:j,iridescenceThicknessMap:lt,sheen:P,sheenColorMap:St,sheenRoughnessMap:ft,specularMap:ht,specularColorMap:bt,specularIntensityMap:Tt,transmission:k,transmissionMap:Nt,thicknessMap:F,gradientMap:ut,opaque:w.transparent===!1&&w.blending===Oi&&w.alphaToCoverage===!1,alphaMap:q,alphaTest:dt,alphaHash:Bt,combine:w.combine,mapUv:Pt&&B(w.map.channel),aoMapUv:Wt&&B(w.aoMap.channel),lightMapUv:Kt&&B(w.lightMap.channel),bumpMapUv:Gt&&B(w.bumpMap.channel),normalMapUv:Xt&&B(w.normalMap.channel),displacementMapUv:we&&B(w.displacementMap.channel),emissiveMapUv:Le&&B(w.emissiveMap.channel),metalnessMapUv:le&&B(w.metalnessMap.channel),roughnessMapUv:ue&&B(w.roughnessMap.channel),anisotropyMapUv:K&&B(w.anisotropyMap.channel),clearcoatMapUv:rt&&B(w.clearcoatMap.channel),clearcoatNormalMapUv:At&&B(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:X&&B(w.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&B(w.iridescenceMap.channel),iridescenceThicknessMapUv:lt&&B(w.iridescenceThicknessMap.channel),sheenColorMapUv:St&&B(w.sheenColorMap.channel),sheenRoughnessMapUv:ft&&B(w.sheenRoughnessMap.channel),specularMapUv:ht&&B(w.specularMap.channel),specularColorMapUv:bt&&B(w.specularColorMap.channel),specularIntensityMapUv:Tt&&B(w.specularIntensityMap.channel),transmissionMapUv:Nt&&B(w.transmissionMap.channel),thicknessMapUv:F&&B(w.thicknessMap.channel),alphaMapUv:q&&B(w.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Xt||R),vertexNormals:!!V.attributes.normal,vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!V.attributes.uv&&(Pt||q),fog:!!Q,useFog:w.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:w.wireframe===!1&&(w.flatShading===!0||V.attributes.normal===void 0&&Xt===!1&&(w.isMeshLambertMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isMeshPhysicalMaterial)),sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ot,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:it,morphTextureStride:st,numSunLights:x.sun.length,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numSunLightShadows:x.sunShadowMap.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Dt,decodeVideoTexture:Pt&&w.map.isVideoTexture===!0&&Yt.getTransfer(w.map.colorSpace)===jt,decodeVideoTextureEmissive:Le&&w.emissiveMap.isVideoTexture===!0&&Yt.getTransfer(w.emissiveMap.colorSpace)===jt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Te,flipSided:w.side===Pe,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:nt&&w.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(nt&&w.extensions.multiDraw===!0||ct)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return yt.vertexUv1s=c.has(1),yt.vertexUv2s=c.has(2),yt.vertexUv3s=c.has(3),c.clear(),yt}function d(w){let x=[];if(w.shaderID?x.push(w.shaderID):(x.push(w.customVertexShaderID),x.push(w.customFragmentShaderID)),w.defines!==void 0)for(let I in w.defines)x.push(I),x.push(w.defines[I]);return w.isRawShaderMaterial===!1&&(l(x,w),y(x,w),x.push(i.outputColorSpace)),x.push(w.customProgramCacheKey),x.join()}function l(w,x){w.push(x.precision),w.push(x.outputColorSpace),w.push(x.envMapMode),w.push(x.envMapCubeUVHeight),w.push(x.mapUv),w.push(x.alphaMapUv),w.push(x.lightMapUv),w.push(x.aoMapUv),w.push(x.bumpMapUv),w.push(x.normalMapUv),w.push(x.displacementMapUv),w.push(x.emissiveMapUv),w.push(x.metalnessMapUv),w.push(x.roughnessMapUv),w.push(x.anisotropyMapUv),w.push(x.clearcoatMapUv),w.push(x.clearcoatNormalMapUv),w.push(x.clearcoatRoughnessMapUv),w.push(x.iridescenceMapUv),w.push(x.iridescenceThicknessMapUv),w.push(x.sheenColorMapUv),w.push(x.sheenRoughnessMapUv),w.push(x.specularMapUv),w.push(x.specularColorMapUv),w.push(x.specularIntensityMapUv),w.push(x.transmissionMapUv),w.push(x.thicknessMapUv),w.push(x.combine),w.push(x.fogExp2),w.push(x.sizeAttenuation),w.push(x.morphTargetsCount),w.push(x.morphAttributeCount),w.push(x.numSunLights),w.push(x.numDirLights),w.push(x.numPointLights),w.push(x.numSpotLights),w.push(x.numSpotLightMaps),w.push(x.numHemiLights),w.push(x.numRectAreaLights),w.push(x.numSunLightShadows),w.push(x.numDirLightShadows),w.push(x.numPointLightShadows),w.push(x.numSpotLightShadows),w.push(x.numSpotLightShadowsWithMaps),w.push(x.numLightProbes),w.push(x.shadowMapType),w.push(x.toneMapping),w.push(x.numClippingPlanes),w.push(x.numClipIntersection),w.push(x.depthPacking)}function y(w,x){o.disableAll(),x.instancing&&o.enable(0),x.instancingColor&&o.enable(1),x.instancingMorph&&o.enable(2),x.matcap&&o.enable(3),x.envMap&&o.enable(4),x.normalMapObjectSpace&&o.enable(5),x.normalMapTangentSpace&&o.enable(6),x.clearcoat&&o.enable(7),x.iridescence&&o.enable(8),x.alphaTest&&o.enable(9),x.vertexColors&&o.enable(10),x.vertexAlphas&&o.enable(11),x.vertexUv1s&&o.enable(12),x.vertexUv2s&&o.enable(13),x.vertexUv3s&&o.enable(14),x.vertexTangents&&o.enable(15),x.anisotropy&&o.enable(16),x.alphaHash&&o.enable(17),x.batching&&o.enable(18),x.dispersion&&o.enable(19),x.retroreflection&&o.enable(24),x.batchingColor&&o.enable(20),x.gradientMap&&o.enable(21),x.packedNormalMap&&o.enable(22),x.vertexNormals&&o.enable(23),w.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reversedDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),x.numLightProbeGrids>0&&o.enable(22),x.hasPositionAttribute&&o.enable(23),w.push(o.mask)}function v(w){let x=p[w.type],I;if(x){let D=En[x];I=Hc.clone(D.uniforms)}else I=w.uniforms;return I}function m(w,x){let I=u.get(x);return I!==void 0?++I.usedTimes:(I=new tg(i,x,w,s),A.push(I),u.set(x,I)),I}function E(w){if(--w.usedTimes===0){let x=A.indexOf(w);A[x]=A[A.length-1],A.pop(),u.delete(w.cacheKey),w.destroy()}}function _(w){a.remove(w)}function b(){a.dispose()}return{getParameters:M,getProgramCacheKey:d,getUniforms:v,acquireProgram:m,releaseProgram:E,releaseShaderCache:_,programs:A,dispose:b}}function sg(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function rg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function al(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Al(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function a(h,p,B,M,d,l){let y=i[t];return y===void 0?(y={id:h.id,object:h,geometry:p,material:B,materialVariant:o(h),groupOrder:M,renderOrder:h.renderOrder,z:d,group:l},i[t]=y):(y.id=h.id,y.object=h,y.geometry=p,y.material=B,y.materialVariant=o(h),y.groupOrder=M,y.renderOrder=h.renderOrder,y.z=d,y.group=l),t++,y}function c(h,p,B,M,d,l,y){y.reversedDepth===!0&&(d=-d);let v=a(h,p,B,M,d,l);B.transmission>0?n.push(v):B.transparent===!0?s.push(v):e.push(v)}function A(h,p,B,M,d,l){let y=a(h,p,B,M,d,l);B.transmission>0?n.unshift(y):B.transparent===!0?s.unshift(y):e.unshift(y)}function u(h,p){e.length>1&&e.sort(h||rg),n.length>1&&n.sort(p||al),s.length>1&&s.sort(p||al)}function f(){for(let h=t,p=i.length;h<p;h++){let B=i[h];if(B.id===null)break;B.id=null,B.object=null,B.geometry=null,B.material=null,B.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:A,finish:f,sort:u}}function og(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Al,i.set(n,[o])):s>=r.length?(o=new Al,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function ag(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new U,color:new Vt};break;case"SpotLight":e={position:new U,direction:new U,color:new Vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new Vt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new Vt,groundColor:new Vt};break;case"RectAreaLight":e={color:new Vt,position:new U,halfWidth:new U,halfHeight:new U};break}return i[t.id]=e,e}}}function Ag(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var cg=0;function lg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function hg(i){let t=new ag,e=Ag(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let A=0;A<9;A++)n.probe.push(new U);let s=new U,r=new Ae,o=new Ae;function a(A){let u=0,f=0,h=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let p=0,B=0,M=0,d=0,l=0,y=0,v=0,m=0,E=0,_=0,b=0,w=0,x=0,I=0;A.sort(lg);for(let N=0,H=A.length;N<H;N++){let Q=A[N],V=Q.color,Z=Q.intensity,J=Q.distance,et=null;if(Q.shadow&&Q.shadow.map&&(Q.shadow.map.texture.format===$n?et=Q.shadow.map.texture:et=Q.shadow.map.depthTexture||Q.shadow.map.texture),Q.isAmbientLight)u+=V.r*Z,f+=V.g*Z,h+=V.b*Z;else if(Q.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(Q.sh.coefficients[W],Z);I++}else if(Q.isSunLight){let W=t.get(Q);if(W.color.copy(Q.color).multiplyScalar(Q.intensity),Q.castShadow){let $=Q.shadow,tt=e.get(Q);tt.shadowIntensity=$.intensity,tt.shadowBias=$.bias,tt.shadowNormalBias=$.normalBias,tt.shadowRadius=$.radius,tt.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),n.sunShadow[B]=tt,n.sunShadowMap[B]=et;let it=$.getViewportCount();for(let st=0;st<it;st++)n.sunShadowMatrix[M+st]=$.getMatrix(st),n.sunShadowCascade[M+st]=$._cascadeData[st];M+=it,B++}n.sun[p]=W,p++}else if(Q.isDirectionalLight){let W=t.get(Q);if(W.color.copy(Q.color).multiplyScalar(Q.intensity),Q.castShadow){let $=Q.shadow,tt=e.get(Q);tt.shadowIntensity=$.intensity,tt.shadowBias=$.bias,tt.shadowNormalBias=$.normalBias,tt.shadowRadius=$.radius,tt.shadowMapSize=$.mapSize,n.directionalShadow[d]=tt,n.directionalShadowMap[d]=et,n.directionalShadowMatrix[d]=Q.shadow.matrix,E++}n.directional[d]=W,d++}else if(Q.isSpotLight){let W=t.get(Q);W.position.setFromMatrixPosition(Q.matrixWorld),W.color.copy(V).multiplyScalar(Z),W.distance=J,W.coneCos=Math.cos(Q.angle),W.penumbraCos=Math.cos(Q.angle*(1-Q.penumbra)),W.decay=Q.decay,n.spot[y]=W;let $=Q.shadow;if(Q.map&&(n.spotLightMap[w]=Q.map,w++,$.updateMatrices(Q),Q.castShadow&&x++),n.spotLightMatrix[y]=$.matrix,Q.castShadow){let tt=e.get(Q);tt.shadowIntensity=$.intensity,tt.shadowBias=$.bias,tt.shadowNormalBias=$.normalBias,tt.shadowRadius=$.radius,tt.shadowMapSize=$.mapSize,n.spotShadow[y]=tt,n.spotShadowMap[y]=et,b++}y++}else if(Q.isRectAreaLight){let W=t.get(Q);W.color.copy(V).multiplyScalar(Z),W.halfWidth.set(Q.width*.5,0,0),W.halfHeight.set(0,Q.height*.5,0),n.rectArea[v]=W,v++}else if(Q.isPointLight){let W=t.get(Q);if(W.color.copy(Q.color).multiplyScalar(Q.intensity),W.distance=Q.distance,W.decay=Q.decay,Q.castShadow){let $=Q.shadow,tt=e.get(Q);tt.shadowIntensity=$.intensity,tt.shadowBias=$.bias,tt.shadowNormalBias=$.normalBias,tt.shadowRadius=$.radius,tt.shadowMapSize=$.mapSize,tt.shadowCameraNear=$.camera.near,tt.shadowCameraFar=$.camera.far,n.pointShadow[l]=tt,n.pointShadowMap[l]=et,n.pointShadowMatrix[l]=Q.shadow.matrix,_++}n.point[l]=W,l++}else if(Q.isHemisphereLight){let W=t.get(Q);W.skyColor.copy(Q.color).multiplyScalar(Z),W.groundColor.copy(Q.groundColor).multiplyScalar(Z),n.hemi[m]=W,m++}}v>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;let D=n.hash;(D.sunLength!==p||D.directionalLength!==d||D.pointLength!==l||D.spotLength!==y||D.rectAreaLength!==v||D.hemiLength!==m||D.numSunShadows!==B||D.numDirectionalShadows!==E||D.numPointShadows!==_||D.numSpotShadows!==b||D.numSpotMaps!==w||D.numLightProbes!==I)&&(n.sun.length=p,n.directional.length=d,n.spot.length=y,n.rectArea.length=v,n.point.length=l,n.hemi.length=m,n.sunShadow.length=B,n.sunShadowMap.length=B,n.sunShadowMatrix.length=M,n.sunShadowCascade.length=M,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.directionalShadowMatrix.length=E,n.pointShadow.length=_,n.pointShadowMap.length=_,n.pointShadowMatrix.length=_,n.spotShadow.length=b,n.spotShadowMap.length=b,n.spotLightMatrix.length=b+w-x,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=x,n.numLightProbes=I,D.sunLength=p,D.directionalLength=d,D.pointLength=l,D.spotLength=y,D.rectAreaLength=v,D.hemiLength=m,D.numSunShadows=B,D.numDirectionalShadows=E,D.numPointShadows=_,D.numSpotShadows=b,D.numSpotMaps=w,D.numLightProbes=I,n.version=cg++)}function c(A,u){let f=0,h=0,p=0,B=0,M=0,d=0,l=u.matrixWorldInverse;for(let y=0,v=A.length;y<v;y++){let m=A[y];if(m.isSunLight){let E=n.sun[f];E.direction.setFromMatrixPosition(m.matrixWorld),E.direction.transformDirection(l),f++}else if(m.isDirectionalLight){let E=n.directional[h];E.direction.setFromMatrixPosition(m.matrixWorld),s.setFromMatrixPosition(m.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(l),h++}else if(m.isSpotLight){let E=n.spot[B];E.position.setFromMatrixPosition(m.matrixWorld),E.position.applyMatrix4(l),E.direction.setFromMatrixPosition(m.matrixWorld),s.setFromMatrixPosition(m.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(l),B++}else if(m.isRectAreaLight){let E=n.rectArea[M];E.position.setFromMatrixPosition(m.matrixWorld),E.position.applyMatrix4(l),o.identity(),r.copy(m.matrixWorld),r.premultiply(l),o.extractRotation(r),E.halfWidth.set(m.width*.5,0,0),E.halfHeight.set(0,m.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),M++}else if(m.isPointLight){let E=n.point[p];E.position.setFromMatrixPosition(m.matrixWorld),E.position.applyMatrix4(l),p++}else if(m.isHemisphereLight){let E=n.hemi[d];E.direction.setFromMatrixPosition(m.matrixWorld),E.direction.transformDirection(l),d++}}}return{setup:a,setupView:c,state:n}}function cl(i){let t=new hg(i),e=[],n=[],s=[];function r(h){f.camera=h,e.length=0,n.length=0,s.length=0}function o(h){e.push(h)}function a(h){n.push(h)}function c(h){s.push(h)}function A(){t.setup(e)}function u(h){t.setupView(e,h)}let f={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:A,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function ug(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new cl(i),t.set(s,[a])):r>=o.length?(a=new cl(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var dg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,pg=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],gg=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],ll=new Ae,Us=new U,oA=new U;function mg(i,t,e){let n=new Ri,s=new Rt,r=new Rt,o=new ce,a=new vr,c=new Sr,A={},u=e.maxTextureSize,f={[Xn]:Pe,[Pe]:Xn,[Te]:Te},h=new Ke({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Rt},radius:{value:4}},vertexShader:dg,fragmentShader:fg}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let B=new xe;B.setAttribute("position",new pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let M=new _e(B,h),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ys;let l=this.type;this.render=function(_,b,w){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||_.length===0)return;this.type===sc&&(Qt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ys);let x=i.getRenderTarget(),I=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),N=i.state;N.setBlending(wn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let H=l!==this.type;H&&b.traverse(function(Q){Q.material&&(Array.isArray(Q.material)?Q.material.forEach(V=>V.needsUpdate=!0):Q.material.needsUpdate=!0)});for(let Q=0,V=_.length;Q<V;Q++){let Z=_[Q],J=Z.shadow;if(J===void 0){Qt("WebGLShadowMap:",Z,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;s.copy(J.mapSize);let et=J.getFrameExtents();s.multiply(et),r.copy(J.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/et.x),s.x=r.x*et.x,J.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/et.y),s.y=r.y*et.y,J.mapSize.y=r.y));let W=i.state.buffers.depth.getReversed();if(J.camera._reversedDepth=W,J.map===null||H===!0){if(J.map!==null&&(J.map.depthTexture!==null&&(J.map.depthTexture.dispose(),J.map.depthTexture=null),J.map.dispose()),this.type===Gi){if(Z.isPointLight){Qt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}J.map=new Oe(s.x,s.y,{format:$n,type:hn,minFilter:Me,magFilter:Me,generateMipmaps:!1}),J.map.texture.name=Z.name+".shadowMap",J.map.depthTexture=new kn(s.x,s.y,ln),J.map.depthTexture.name=Z.name+".shadowMapDepth",J.map.depthTexture.format=mn,J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=Ee,J.map.depthTexture.magFilter=Ee}else Z.isPointLight?(J.map=new Uo(s.x),J.map.depthTexture=new xr(s.x,cn)):(J.map=new Oe(s.x,s.y),J.map.depthTexture=new kn(s.x,s.y,cn)),J.map.depthTexture.name=Z.name+".shadowMap",J.map.depthTexture.format=mn,this.type===ys?(J.map.depthTexture.compareFunction=W?To:Do,J.map.depthTexture.minFilter=Me,J.map.depthTexture.magFilter=Me):(J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=Ee,J.map.depthTexture.magFilter=Ee);J.camera.updateProjectionMatrix()}J.map.isWebGLCubeRenderTarget!==!0&&(J.map.width!==s.x||J.map.height!==s.y)&&J.map.setSize(s.x,s.y);let $=J.map.isWebGLCubeRenderTarget?6:J.getViewportCount();Z.isPointLight!==!0&&J.updateMatrices(Z,w);for(let tt=0;tt<$;tt++){let it=J.getCamera(tt);if(Z.isPointLight){let st=J.camera,It=J.matrix,wt=Z.distance||st.far;wt!==st.far&&(st.far=wt,st.updateProjectionMatrix()),Us.setFromMatrixPosition(Z.matrixWorld),st.position.copy(Us),oA.copy(st.position),oA.add(pg[tt]),st.up.copy(gg[tt]),st.lookAt(oA),st.updateMatrixWorld(),It.makeTranslation(-Us.x,-Us.y,-Us.z),ll.multiplyMatrices(st.projectionMatrix,st.matrixWorldInverse),J._frustum.setFromProjectionMatrix(ll,st.coordinateSystem,st.reversedDepth)}if(J.map.isWebGLCubeRenderTarget)i.setRenderTarget(J.map,tt),i.clear();else{tt===0&&(i.setRenderTarget(J.map),i.clear());let st=J.getViewport(tt);o.set(r.x*st.x,r.y*st.y,r.x*st.z,r.y*st.w),N.viewport(o)}n=J.getFrustum(tt),m(b,w,it,Z,this.type)}J.isPointLightShadow!==!0&&this.type===Gi&&y(J,w),J.needsUpdate=!1}l=this.type,d.needsUpdate=!1,i.setRenderTarget(x,I,D)};function y(_,b){let w=t.update(M);h.defines.VSM_SAMPLES!==_.blurSamples&&(h.defines.VSM_SAMPLES=_.blurSamples,p.defines.VSM_SAMPLES=_.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),_.mapPass===null?_.mapPass=new Oe(s.x,s.y,{format:$n,type:hn}):(_.mapPass.width!==_.map.width||_.mapPass.height!==_.map.height)&&_.mapPass.setSize(_.map.width,_.map.height),h.uniforms.shadow_pass.value=_.map.depthTexture,h.uniforms.resolution.value.set(_.map.width,_.map.height),h.uniforms.radius.value=_.radius,i.setRenderTarget(_.mapPass),i.clear(),i.renderBufferDirect(b,null,w,h,M,null),p.uniforms.shadow_pass.value=_.mapPass.texture,p.uniforms.resolution.value.set(_.map.width,_.map.height),p.uniforms.radius.value=_.radius,i.setRenderTarget(_.map),i.clear(),i.renderBufferDirect(b,null,w,p,M,null)}function v(_,b,w,x){let I=null,D=w.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(D!==void 0)I=D;else if(I=w.isPointLight===!0?c:a,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){let N=I.uuid,H=b.uuid,Q=A[N];Q===void 0&&(Q={},A[N]=Q);let V=Q[H];V===void 0&&(V=I.clone(),Q[H]=V,b.addEventListener("dispose",E)),I=V}if(I.visible=b.visible,I.wireframe=b.wireframe,x===Gi?I.side=b.shadowSide!==null?b.shadowSide:b.side:I.side=b.shadowSide!==null?b.shadowSide:f[b.side],I.alphaMap=b.alphaMap,I.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,I.map=b.map,I.clipShadows=b.clipShadows,I.clippingPlanes=b.clippingPlanes,I.clipIntersection=b.clipIntersection,I.displacementMap=b.displacementMap,I.displacementScale=b.displacementScale,I.displacementBias=b.displacementBias,I.wireframeLinewidth=b.wireframeLinewidth,I.linewidth=b.linewidth,w.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let N=i.properties.get(I);N.light=w}return I}function m(_,b,w,x,I){if(_.visible===!1)return;if(_.layers.test(b.layers)&&(_.isMesh||_.isLine||_.isPoints)&&(_.castShadow||_.receiveShadow&&I===Gi)&&(!_.frustumCulled||_.intersectsFrustum(n))){_.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,_.matrixWorld);let H=t.update(_),Q=_.material;if(Array.isArray(Q)){let V=H.groups;for(let Z=0,J=V.length;Z<J;Z++){let et=V[Z],W=Q[et.materialIndex];if(W&&W.visible){let $=v(_,W,x,I);_.onBeforeShadow(i,_,b,w,H,$,et),i.renderBufferDirect(w,null,H,$,_,et),_.onAfterShadow(i,_,b,w,H,$,et)}}}else if(Q.visible){let V=v(_,Q,x,I);_.onBeforeShadow(i,_,b,w,H,V,null),i.renderBufferDirect(w,null,H,V,_,null),_.onAfterShadow(i,_,b,w,H,V,null)}}let N=_.children;for(let H=0,Q=N.length;H<Q;H++)m(N[H],b,w,x,I)}function E(_){_.target.removeEventListener("dispose",E);for(let w in A){let x=A[w],I=_.target.uuid;I in x&&(x[I].dispose(),delete x[I])}}}function Bg(i,t){function e(){let F=!1,ut=new ce,q=null,dt=new ce(0,0,0,0);return{setMask:function(Bt){q!==Bt&&!F&&(i.colorMask(Bt,Bt,Bt,Bt),q=Bt)},setLocked:function(Bt){F=Bt},setClear:function(Bt,nt,Dt,yt,se){se===!0&&(Bt*=yt,nt*=yt,Dt*=yt),ut.set(Bt,nt,Dt,yt),dt.equals(ut)===!1&&(i.clearColor(Bt,nt,Dt,yt),dt.copy(ut))},reset:function(){F=!1,q=null,dt.set(-1,0,0,0)}}}function n(){let F=!1,ut=!1,q=null,dt=null,Bt=null;return{setReversed:function(nt){if(ut!==nt){let Dt=t.get("EXT_clip_control");nt?Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.ZERO_TO_ONE_EXT):Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.NEGATIVE_ONE_TO_ONE_EXT),ut=nt;let yt=Bt;Bt=null,this.setClear(yt)}},getReversed:function(){return ut},setTest:function(nt){nt?z(i.DEPTH_TEST):ot(i.DEPTH_TEST)},setMask:function(nt){q!==nt&&!F&&(i.depthMask(nt),q=nt)},setFunc:function(nt){if(ut&&(nt=Gc[nt]),dt!==nt){switch(nt){case Ar:i.depthFunc(i.NEVER);break;case cr:i.depthFunc(i.ALWAYS);break;case lr:i.depthFunc(i.LESS);break;case Si:i.depthFunc(i.LEQUAL);break;case hr:i.depthFunc(i.EQUAL);break;case ur:i.depthFunc(i.GEQUAL);break;case dr:i.depthFunc(i.GREATER);break;case fr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}dt=nt}},setLocked:function(nt){F=nt},setClear:function(nt){Bt!==nt&&(Bt=nt,ut&&(nt=1-nt),i.clearDepth(nt))},reset:function(){F=!1,q=null,dt=null,Bt=null,ut=!1}}}function s(){let F=!1,ut=null,q=null,dt=null,Bt=null,nt=null,Dt=null,yt=null,se=null;return{setTest:function(Zt){F||(Zt?z(i.STENCIL_TEST):ot(i.STENCIL_TEST))},setMask:function(Zt){ut!==Zt&&!F&&(i.stencilMask(Zt),ut=Zt)},setFunc:function(Zt,tn,un){(q!==Zt||dt!==tn||Bt!==un)&&(i.stencilFunc(Zt,tn,un),q=Zt,dt=tn,Bt=un)},setOp:function(Zt,tn,un){(nt!==Zt||Dt!==tn||yt!==un)&&(i.stencilOp(Zt,tn,un),nt=Zt,Dt=tn,yt=un)},setLocked:function(Zt){F=Zt},setClear:function(Zt){se!==Zt&&(i.clearStencil(Zt),se=Zt)},reset:function(){F=!1,ut=null,q=null,dt=null,Bt=null,nt=null,Dt=null,yt=null,se=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,A=new WeakMap,u={},f={},h={},p=new WeakMap,B=[],M=null,d=!1,l=null,y=null,v=null,m=null,E=null,_=null,b=null,w=new Vt(0,0,0),x=0,I=!1,D=null,N=null,H=null,Q=null,V=null,Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,et=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(W)[1]),J=et>=1):W.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),J=et>=2);let $=null,tt={},it=i.getParameter(i.SCISSOR_BOX),st=i.getParameter(i.VIEWPORT),It=new ce().fromArray(it),wt=new ce().fromArray(st);function at(F,ut,q,dt){let Bt=new Uint8Array(4),nt=i.createTexture();i.bindTexture(F,nt),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Dt=0;Dt<q;Dt++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(ut,0,i.RGBA,1,1,dt,0,i.RGBA,i.UNSIGNED_BYTE,Bt):i.texImage2D(ut+Dt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Bt);return nt}let L={};L[i.TEXTURE_2D]=at(i.TEXTURE_2D,i.TEXTURE_2D,1),L[i.TEXTURE_CUBE_MAP]=at(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),L[i.TEXTURE_2D_ARRAY]=at(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),L[i.TEXTURE_3D]=at(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),z(i.DEPTH_TEST),o.setFunc(Si),Gt(!1),Xt(Ea),z(i.CULL_FACE),Wt(wn);function z(F){u[F]!==!0&&(i.enable(F),u[F]=!0)}function ot(F){u[F]!==!1&&(i.disable(F),u[F]=!1)}function Et(F,ut){return h[F]!==ut?(i.bindFramebuffer(F,ut),h[F]=ut,F===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ut),F===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ut),!0):!1}function ct(F,ut){let q=B,dt=!1;if(F){q=p.get(ut),q===void 0&&(q=[],p.set(ut,q));let Bt=F.textures;if(q.length!==Bt.length||q[0]!==i.COLOR_ATTACHMENT0){for(let nt=0,Dt=Bt.length;nt<Dt;nt++)q[nt]=i.COLOR_ATTACHMENT0+nt;q.length=Bt.length,dt=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,dt=!0);dt&&i.drawBuffers(q)}function Pt(F){return M!==F?(i.useProgram(F),M=F,!0):!1}let ie={[oi]:i.FUNC_ADD,[oc]:i.FUNC_SUBTRACT,[ac]:i.FUNC_REVERSE_SUBTRACT};ie[Ac]=i.MIN,ie[cc]=i.MAX;let Lt={[lc]:i.ZERO,[hc]:i.ONE,[uc]:i.SRC_COLOR,[ya]:i.SRC_ALPHA,[Bc]:i.SRC_ALPHA_SATURATE,[gc]:i.DST_COLOR,[fc]:i.DST_ALPHA,[dc]:i.ONE_MINUS_SRC_COLOR,[va]:i.ONE_MINUS_SRC_ALPHA,[mc]:i.ONE_MINUS_DST_COLOR,[pc]:i.ONE_MINUS_DST_ALPHA,[wc]:i.CONSTANT_COLOR,[Cc]:i.ONE_MINUS_CONSTANT_COLOR,[Ec]:i.CONSTANT_ALPHA,[_c]:i.ONE_MINUS_CONSTANT_ALPHA};function Wt(F,ut,q,dt,Bt,nt,Dt,yt,se,Zt){if(F===wn){d===!0&&(ot(i.BLEND),d=!1);return}if(d===!1&&(z(i.BLEND),d=!0),F!==rc){if(F!==l||Zt!==I){if((y!==oi||E!==oi)&&(i.blendEquation(i.FUNC_ADD),y=oi,E=oi),Zt)switch(F){case Oi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _a:i.blendFunc(i.ONE,i.ONE);break;case Ma:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xa:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ft("WebGLState: Invalid blending: ",F);break}else switch(F){case Oi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _a:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ma:Ft("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case xa:Ft("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ft("WebGLState: Invalid blending: ",F);break}v=null,m=null,_=null,b=null,w.set(0,0,0),x=0,l=F,I=Zt}return}Bt=Bt||ut,nt=nt||q,Dt=Dt||dt,(ut!==y||Bt!==E)&&(i.blendEquationSeparate(ie[ut],ie[Bt]),y=ut,E=Bt),(q!==v||dt!==m||nt!==_||Dt!==b)&&(i.blendFuncSeparate(Lt[q],Lt[dt],Lt[nt],Lt[Dt]),v=q,m=dt,_=nt,b=Dt),(yt.equals(w)===!1||se!==x)&&(i.blendColor(yt.r,yt.g,yt.b,se),w.copy(yt),x=se),l=F,I=!1}function Kt(F,ut){F.side===Te?ot(i.CULL_FACE):z(i.CULL_FACE);let q=F.side===Pe;ut&&(q=!q),Gt(q),F.blending===Oi&&F.transparent===!1?Wt(wn):Wt(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);let dt=F.stencilWrite;a.setTest(dt),dt&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Le(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?z(i.SAMPLE_ALPHA_TO_COVERAGE):ot(i.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(F){D!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),D=F)}function Xt(F){F!==nc?(z(i.CULL_FACE),F!==N&&(F===Ea?i.cullFace(i.BACK):F===ic?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ot(i.CULL_FACE),N=F}function we(F){F!==H&&(J&&i.lineWidth(F),H=F)}function Le(F,ut,q){F?(z(i.POLYGON_OFFSET_FILL),(Q!==ut||V!==q)&&(Q=ut,V=q,o.getReversed()&&(ut=-ut),i.polygonOffset(ut,q))):ot(i.POLYGON_OFFSET_FILL)}function le(F){F?z(i.SCISSOR_TEST):ot(i.SCISSOR_TEST)}function ue(F){F===void 0&&(F=i.TEXTURE0+Z-1),$!==F&&(i.activeTexture(F),$=F)}function R(F,ut,q){q===void 0&&($===null?q=i.TEXTURE0+Z-1:q=$);let dt=tt[q];dt===void 0&&(dt={type:void 0,texture:void 0},tt[q]=dt),(dt.type!==F||dt.texture!==ut)&&($!==q&&(i.activeTexture(q),$=q),i.bindTexture(F,ut||L[F]),dt.type=F,dt.texture=ut)}function ye(){let F=tt[$];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function $t(){try{i.compressedTexImage2D(...arguments)}catch(F){Ft("WebGLState:",F)}}function S(){try{i.compressedTexImage3D(...arguments)}catch(F){Ft("WebGLState:",F)}}function g(){try{i.texSubImage2D(...arguments)}catch(F){Ft("WebGLState:",F)}}function P(){try{i.texSubImage3D(...arguments)}catch(F){Ft("WebGLState:",F)}}function k(){try{i.compressedTexSubImage2D(...arguments)}catch(F){Ft("WebGLState:",F)}}function K(){try{i.compressedTexSubImage3D(...arguments)}catch(F){Ft("WebGLState:",F)}}function rt(){try{i.texStorage2D(...arguments)}catch(F){Ft("WebGLState:",F)}}function At(){try{i.texStorage3D(...arguments)}catch(F){Ft("WebGLState:",F)}}function X(){try{i.texImage2D(...arguments)}catch(F){Ft("WebGLState:",F)}}function j(){try{i.texImage3D(...arguments)}catch(F){Ft("WebGLState:",F)}}function lt(F){return f[F]!==void 0?f[F]:i.getParameter(F)}function St(F,ut){f[F]!==ut&&(i.pixelStorei(F,ut),f[F]=ut)}function ft(F){It.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),It.copy(F))}function ht(F){wt.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),wt.copy(F))}function bt(F,ut){let q=A.get(ut);q===void 0&&(q=new WeakMap,A.set(ut,q));let dt=q.get(F);dt===void 0&&(dt=i.getUniformBlockIndex(ut,F.name),q.set(F,dt))}function Tt(F,ut){let dt=A.get(ut).get(F);c.get(ut)!==dt&&(i.uniformBlockBinding(ut,dt,F.__bindingPointIndex),c.set(ut,dt))}function Nt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},$=null,tt={},h={},p=new WeakMap,B=[],M=null,d=!1,l=null,y=null,v=null,m=null,E=null,_=null,b=null,w=new Vt(0,0,0),x=0,I=!1,D=null,N=null,H=null,Q=null,V=null,It.set(0,0,i.canvas.width,i.canvas.height),wt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:z,disable:ot,bindFramebuffer:Et,drawBuffers:ct,useProgram:Pt,setBlending:Wt,setMaterial:Kt,setFlipSided:Gt,setCullFace:Xt,setLineWidth:we,setPolygonOffset:Le,setScissorTest:le,activeTexture:ue,bindTexture:R,unbindTexture:ye,compressedTexImage2D:$t,compressedTexImage3D:S,texImage2D:X,texImage3D:j,pixelStorei:St,getParameter:lt,updateUBOMapping:bt,uniformBlockBinding:Tt,texStorage2D:rt,texStorage3D:At,texSubImage2D:g,texSubImage3D:P,compressedTexSubImage2D:k,compressedTexSubImage3D:K,scissor:ft,viewport:ht,reset:Nt}}function wg(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),A=new Rt,u=new WeakMap,f=new Set,h,p=new WeakMap,B=!1;try{B=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(S,g){return B?new OffscreenCanvas(S,g):cs("canvas")}function d(S,g,P){let k=1,K=$t(S);if((K.width>P||K.height>P)&&(k=P/Math.max(K.width,K.height)),k<1)if(typeof HTMLImageElement!="undefined"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&S instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&S instanceof ImageBitmap||typeof VideoFrame!="undefined"&&S instanceof VideoFrame){let rt=Math.floor(k*K.width),At=Math.floor(k*K.height);h===void 0&&(h=M(rt,At));let X=g?M(rt,At):h;return X.width=rt,X.height=At,X.getContext("2d").drawImage(S,0,0,rt,At),Qt("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+rt+"x"+At+")."),X}else return"data"in S&&Qt("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),S;return S}function l(S){return S.generateMipmaps}function y(S){i.generateMipmap(S)}function v(S){return S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?i.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function m(S,g,P,k,K,rt=!1){if(S!==null){if(i[S]!==void 0)return i[S];Qt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let At;k&&(At=t.get("EXT_texture_norm16"),At||Qt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=g;if(g===i.RED&&(P===i.FLOAT&&(X=i.R32F),P===i.HALF_FLOAT&&(X=i.R16F),P===i.UNSIGNED_BYTE&&(X=i.R8),P===i.UNSIGNED_SHORT&&At&&(X=At.R16_EXT),P===i.SHORT&&At&&(X=At.R16_SNORM_EXT)),g===i.RED_INTEGER&&(P===i.UNSIGNED_BYTE&&(X=i.R8UI),P===i.UNSIGNED_SHORT&&(X=i.R16UI),P===i.UNSIGNED_INT&&(X=i.R32UI),P===i.BYTE&&(X=i.R8I),P===i.SHORT&&(X=i.R16I),P===i.INT&&(X=i.R32I)),g===i.RG&&(P===i.FLOAT&&(X=i.RG32F),P===i.HALF_FLOAT&&(X=i.RG16F),P===i.UNSIGNED_BYTE&&(X=i.RG8),P===i.UNSIGNED_SHORT&&At&&(X=At.RG16_EXT),P===i.SHORT&&At&&(X=At.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(P===i.UNSIGNED_BYTE&&(X=i.RG8UI),P===i.UNSIGNED_SHORT&&(X=i.RG16UI),P===i.UNSIGNED_INT&&(X=i.RG32UI),P===i.BYTE&&(X=i.RG8I),P===i.SHORT&&(X=i.RG16I),P===i.INT&&(X=i.RG32I)),g===i.RGB_INTEGER&&(P===i.UNSIGNED_BYTE&&(X=i.RGB8UI),P===i.UNSIGNED_SHORT&&(X=i.RGB16UI),P===i.UNSIGNED_INT&&(X=i.RGB32UI),P===i.BYTE&&(X=i.RGB8I),P===i.SHORT&&(X=i.RGB16I),P===i.INT&&(X=i.RGB32I)),g===i.RGBA_INTEGER&&(P===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),P===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),P===i.UNSIGNED_INT&&(X=i.RGBA32UI),P===i.BYTE&&(X=i.RGBA8I),P===i.SHORT&&(X=i.RGBA16I),P===i.INT&&(X=i.RGBA32I)),g===i.RGB&&(P===i.UNSIGNED_SHORT&&At&&(X=At.RGB16_EXT),P===i.SHORT&&At&&(X=At.RGB16_SNORM_EXT),P===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),P===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),g===i.RGBA){let j=rt?As:Yt.getTransfer(K);P===i.FLOAT&&(X=i.RGBA32F),P===i.HALF_FLOAT&&(X=i.RGBA16F),P===i.UNSIGNED_BYTE&&(X=j===jt?i.SRGB8_ALPHA8:i.RGBA8),P===i.UNSIGNED_SHORT&&At&&(X=At.RGBA16_EXT),P===i.SHORT&&At&&(X=At.RGBA16_SNORM_EXT),P===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),P===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function E(S,g){let P;return S?g===null||g===cn||g===ki?P=i.DEPTH24_STENCIL8:g===ln?P=i.DEPTH32F_STENCIL8:g===Hi&&(P=i.DEPTH24_STENCIL8,Qt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===cn||g===ki?P=i.DEPTH_COMPONENT24:g===ln?P=i.DEPTH_COMPONENT32F:g===Hi&&(P=i.DEPTH_COMPONENT16),P}function _(S,g){return l(S)===!0||S.isFramebufferTexture&&S.minFilter!==Ee&&S.minFilter!==Me?Math.log2(Math.max(g.width,g.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?g.mipmaps.length:1}function b(S){let g=S.target;g.removeEventListener("dispose",b),x(g),g.isVideoTexture&&u.delete(g),g.isHTMLTexture&&f.delete(g)}function w(S){let g=S.target;g.removeEventListener("dispose",w),D(g)}function x(S){let g=n.get(S);if(g.__webglInit===void 0)return;let P=S.source,k=p.get(P);if(k){let K=k[g.__cacheKey];K.usedTimes--,K.usedTimes===0&&I(S),Object.keys(k).length===0&&p.delete(P)}n.remove(S)}function I(S){let g=n.get(S);i.deleteTexture(g.__webglTexture);let P=S.source,k=p.get(P);delete k[g.__cacheKey],o.memory.textures--}function D(S){let g=n.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),n.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(g.__webglFramebuffer[k]))for(let K=0;K<g.__webglFramebuffer[k].length;K++)i.deleteFramebuffer(g.__webglFramebuffer[k][K]);else i.deleteFramebuffer(g.__webglFramebuffer[k]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[k])}else{if(Array.isArray(g.__webglFramebuffer))for(let k=0;k<g.__webglFramebuffer.length;k++)i.deleteFramebuffer(g.__webglFramebuffer[k]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let k=0;k<g.__webglColorRenderbuffer.length;k++)g.__webglColorRenderbuffer[k]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[k]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let P=S.textures;for(let k=0,K=P.length;k<K;k++){let rt=n.get(P[k]);rt.__webglTexture&&(i.deleteTexture(rt.__webglTexture),o.memory.textures--),n.remove(P[k])}n.remove(S)}let N=0;function H(){N=0}function Q(){return N}function V(S){N=S}function Z(){let S=N;return S>=s.maxTextures&&Qt("WebGLTextures: Trying to use "+(S+1)+" texture units while this GPU supports only "+s.maxTextures),N+=1,S}function J(S){let g=[];return g.push(S.wrapS),g.push(S.wrapT),g.push(S.wrapR||0),g.push(S.magFilter),g.push(S.minFilter),g.push(S.anisotropy),g.push(S.internalFormat),g.push(S.format),g.push(S.type),g.push(S.generateMipmaps),g.push(S.premultiplyAlpha),g.push(S.flipY),g.push(S.unpackAlignment),g.push(S.colorSpace),g.join()}function et(S,g){let P=n.get(S);if(S.isVideoTexture&&R(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&P.__version!==S.version){let k=S.image;if(k===null)Qt("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)Qt("WebGLRenderer: Texture marked for update but image is incomplete");else{ot(P,S,g);return}}else S.isExternalTexture&&(P.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,P.__webglTexture,i.TEXTURE0+g)}function W(S,g){let P=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&P.__version!==S.version){ot(P,S,g);return}else S.isExternalTexture&&(P.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,P.__webglTexture,i.TEXTURE0+g)}function $(S,g){let P=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&P.__version!==S.version){ot(P,S,g);return}e.bindTexture(i.TEXTURE_3D,P.__webglTexture,i.TEXTURE0+g)}function tt(S,g){let P=n.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&P.__version!==S.version){Et(P,S,g);return}e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+g)}let it={[pr]:i.REPEAT,[pn]:i.CLAMP_TO_EDGE,[gr]:i.MIRRORED_REPEAT},st={[Ee]:i.NEAREST,[yc]:i.NEAREST_MIPMAP_NEAREST,[Ss]:i.NEAREST_MIPMAP_LINEAR,[Me]:i.LINEAR,[Yr]:i.LINEAR_MIPMAP_NEAREST,[qn]:i.LINEAR_MIPMAP_LINEAR},It={[Ic]:i.NEVER,[Rc]:i.ALWAYS,[Dc]:i.LESS,[Do]:i.LEQUAL,[Tc]:i.EQUAL,[To]:i.GEQUAL,[Qc]:i.GREATER,[Fc]:i.NOTEQUAL};function wt(S,g){if(g.type===ln&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===Me||g.magFilter===Yr||g.magFilter===Ss||g.magFilter===qn||g.minFilter===Me||g.minFilter===Yr||g.minFilter===Ss||g.minFilter===qn)&&Qt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(S,i.TEXTURE_WRAP_S,it[g.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,it[g.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,it[g.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,st[g.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,st[g.minFilter]),g.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,It[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Ee||g.minFilter!==Ss&&g.minFilter!==qn||g.type===ln&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){let P=t.get("EXT_texture_filter_anisotropic");i.texParameterf(S,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function at(S,g){let P=!1;S.__webglInit===void 0&&(S.__webglInit=!0,g.addEventListener("dispose",b));let k=g.source,K=p.get(k);K===void 0&&(K={},p.set(k,K));let rt=J(g);if(rt!==S.__cacheKey){K[rt]===void 0&&(K[rt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,P=!0),K[rt].usedTimes++;let At=K[S.__cacheKey];At!==void 0&&(K[S.__cacheKey].usedTimes--,At.usedTimes===0&&I(g)),S.__cacheKey=rt,S.__webglTexture=K[rt].texture}return P}function L(S,g,P){return Math.floor(Math.floor(S/P)/g)}function z(S,g,P,k){let rt=S.updateRanges;if(rt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,P,k,g.data);else{rt.sort((St,ft)=>St.start-ft.start);let At=0;for(let St=1;St<rt.length;St++){let ft=rt[At],ht=rt[St],bt=ft.start+ft.count,Tt=L(ht.start,g.width,4),Nt=L(ft.start,g.width,4);ht.start<=bt+1&&Tt===Nt&&L(ht.start+ht.count-1,g.width,4)===Tt?ft.count=Math.max(ft.count,ht.start+ht.count-ft.start):(++At,rt[At]=ht)}rt.length=At+1;let X=e.getParameter(i.UNPACK_ROW_LENGTH),j=e.getParameter(i.UNPACK_SKIP_PIXELS),lt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let St=0,ft=rt.length;St<ft;St++){let ht=rt[St],bt=Math.floor(ht.start/4),Tt=Math.ceil(ht.count/4),Nt=bt%g.width,F=Math.floor(bt/g.width),ut=Tt,q=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Nt),e.pixelStorei(i.UNPACK_SKIP_ROWS,F),e.texSubImage2D(i.TEXTURE_2D,0,Nt,F,ut,q,P,k,g.data)}S.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,X),e.pixelStorei(i.UNPACK_SKIP_PIXELS,j),e.pixelStorei(i.UNPACK_SKIP_ROWS,lt)}}function ot(S,g,P){let k=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(k=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(k=i.TEXTURE_3D);let K=at(S,g),rt=g.source;e.bindTexture(k,S.__webglTexture,i.TEXTURE0+P);let At=n.get(rt);if(rt.version!==At.__version||K===!0){if(e.activeTexture(i.TEXTURE0+P),(typeof ImageBitmap!="undefined"&&g.image instanceof ImageBitmap)===!1){let q=Yt.getPrimaries(Yt.workingColorSpace),dt=g.colorSpace===Dn?null:Yt.getPrimaries(g.colorSpace),Bt=g.colorSpace===Dn||q===dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Bt)}e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let j=d(g.image,!1,s.maxTextureSize);j=ye(g,j);let lt=r.convert(g.format,g.colorSpace),St=r.convert(g.type),ft=m(g.internalFormat,lt,St,g.normalized,g.colorSpace,g.isVideoTexture);wt(k,g);let ht,bt=g.mipmaps,Tt=g.isVideoTexture!==!0,Nt=At.__version===void 0||K===!0,F=rt.dataReady,ut=_(g,j);if(g.isDepthTexture)ft=E(g.format===jn,g.type),Nt&&(Tt?e.texStorage2D(i.TEXTURE_2D,1,ft,j.width,j.height):e.texImage2D(i.TEXTURE_2D,0,ft,j.width,j.height,0,lt,St,null));else if(g.isDataTexture)if(bt.length>0){Tt&&Nt&&e.texStorage2D(i.TEXTURE_2D,ut,ft,bt[0].width,bt[0].height);for(let q=0,dt=bt.length;q<dt;q++)ht=bt[q],Tt?F&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,ht.width,ht.height,lt,St,ht.data):e.texImage2D(i.TEXTURE_2D,q,ft,ht.width,ht.height,0,lt,St,ht.data);g.generateMipmaps=!1}else Tt?(Nt&&e.texStorage2D(i.TEXTURE_2D,ut,ft,j.width,j.height),F&&z(g,j,lt,St)):e.texImage2D(i.TEXTURE_2D,0,ft,j.width,j.height,0,lt,St,j.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Tt&&Nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ut,ft,bt[0].width,bt[0].height,j.depth);for(let q=0,dt=bt.length;q<dt;q++)if(ht=bt[q],g.format!==$e)if(lt!==null)if(Tt){if(F)if(g.layerUpdates.size>0){let Bt=Xa(ht.width,ht.height,g.format,g.type);for(let nt of g.layerUpdates){let Dt=ht.data.subarray(nt*Bt/ht.data.BYTES_PER_ELEMENT,(nt+1)*Bt/ht.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,nt,ht.width,ht.height,1,lt,Dt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ht.width,ht.height,j.depth,lt,ht.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,ft,ht.width,ht.height,j.depth,0,ht.data,0,0);else Qt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Tt?F&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ht.width,ht.height,j.depth,lt,St,ht.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,ft,ht.width,ht.height,j.depth,0,lt,St,ht.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{Tt&&Nt&&e.texStorage2D(i.TEXTURE_2D,ut,ft,bt[0].width,bt[0].height);for(let q=0,dt=bt.length;q<dt;q++)ht=bt[q],g.format!==$e?lt!==null?Tt?F&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,ht.width,ht.height,lt,ht.data):e.compressedTexImage2D(i.TEXTURE_2D,q,ft,ht.width,ht.height,0,ht.data):Qt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Tt?F&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,ht.width,ht.height,lt,St,ht.data):e.texImage2D(i.TEXTURE_2D,q,ft,ht.width,ht.height,0,lt,St,ht.data)}else if(g.isDataArrayTexture)if(Tt){if(Nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ut,ft,j.width,j.height,j.depth),F)if(g.layerUpdates.size>0){let q=Xa(j.width,j.height,g.format,g.type);for(let dt of g.layerUpdates){let Bt=j.data.subarray(dt*q/j.data.BYTES_PER_ELEMENT,(dt+1)*q/j.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,dt,j.width,j.height,1,lt,St,Bt)}g.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,lt,St,j.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,ft,j.width,j.height,j.depth,0,lt,St,j.data);else if(g.isData3DTexture)Tt?(Nt&&e.texStorage3D(i.TEXTURE_3D,ut,ft,j.width,j.height,j.depth),F&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,lt,St,j.data)):e.texImage3D(i.TEXTURE_3D,0,ft,j.width,j.height,j.depth,0,lt,St,j.data);else if(g.isFramebufferTexture){if(Nt)if(Tt)e.texStorage2D(i.TEXTURE_2D,ut,ft,j.width,j.height);else{let q=j.width,dt=j.height;for(let Bt=0;Bt<ut;Bt++)e.texImage2D(i.TEXTURE_2D,Bt,ft,q,dt,0,lt,St,null),q>>=1,dt>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){let q=i.canvas;if(q.hasAttribute("layoutsubtree")||q.setAttribute("layoutsubtree","true"),j.parentNode!==q){q.appendChild(j),f.add(g),q.onpaint=dt=>{let Bt=dt.changedElements;for(let nt of f)Bt.includes(nt.image)&&(nt.needsUpdate=!0)},q.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,j);else{let Bt=i.RGBA,nt=i.RGBA,Dt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Bt,nt,Dt,j)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(bt.length>0){if(Tt&&Nt){let q=$t(bt[0]);e.texStorage2D(i.TEXTURE_2D,ut,ft,q.width,q.height)}for(let q=0,dt=bt.length;q<dt;q++)ht=bt[q],Tt?F&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,lt,St,ht):e.texImage2D(i.TEXTURE_2D,q,ft,lt,St,ht);g.generateMipmaps=!1}else if(Tt){if(Nt){let q=$t(j);e.texStorage2D(i.TEXTURE_2D,ut,ft,q.width,q.height)}F&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt,St,j)}else e.texImage2D(i.TEXTURE_2D,0,ft,lt,St,j);l(g)&&y(k),At.__version=rt.version,g.onUpdate&&g.onUpdate(g)}S.__version=g.version}function Et(S,g,P){if(g.image.length!==6)return;let k=at(S,g),K=g.source;e.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+P);let rt=n.get(K);if(K.version!==rt.__version||k===!0){e.activeTexture(i.TEXTURE0+P);let At=Yt.getPrimaries(Yt.workingColorSpace),X=g.colorSpace===Dn?null:Yt.getPrimaries(g.colorSpace),j=g.colorSpace===Dn||At===X?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);let lt=g.isCompressedTexture||g.image[0].isCompressedTexture,St=g.image[0]&&g.image[0].isDataTexture,ft=[];for(let nt=0;nt<6;nt++)!lt&&!St?ft[nt]=d(g.image[nt],!0,s.maxCubemapSize):ft[nt]=St?g.image[nt].image:g.image[nt],ft[nt]=ye(g,ft[nt]);let ht=ft[0],bt=r.convert(g.format,g.colorSpace),Tt=r.convert(g.type),Nt=m(g.internalFormat,bt,Tt,g.normalized,g.colorSpace),F=g.isVideoTexture!==!0,ut=rt.__version===void 0||k===!0,q=K.dataReady,dt=_(g,ht);wt(i.TEXTURE_CUBE_MAP,g);let Bt;if(lt){F&&ut&&e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Nt,ht.width,ht.height);for(let nt=0;nt<6;nt++){Bt=ft[nt].mipmaps;for(let Dt=0;Dt<Bt.length;Dt++){let yt=Bt[Dt];g.format!==$e?bt!==null?F?q&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,0,0,yt.width,yt.height,bt,yt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,Nt,yt.width,yt.height,0,yt.data):Qt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,0,0,yt.width,yt.height,bt,Tt,yt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,Nt,yt.width,yt.height,0,bt,Tt,yt.data)}}}else{if(Bt=g.mipmaps,F&&ut){Bt.length>0&&dt++;let nt=$t(ft[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Nt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(St){F?q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,ft[nt].width,ft[nt].height,bt,Tt,ft[nt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Nt,ft[nt].width,ft[nt].height,0,bt,Tt,ft[nt].data);for(let Dt=0;Dt<Bt.length;Dt++){let se=Bt[Dt].image[nt].image;F?q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,0,0,se.width,se.height,bt,Tt,se.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,Nt,se.width,se.height,0,bt,Tt,se.data)}}else{F?q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,bt,Tt,ft[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Nt,bt,Tt,ft[nt]);for(let Dt=0;Dt<Bt.length;Dt++){let yt=Bt[Dt];F?q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,0,0,bt,Tt,yt.image[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,Nt,bt,Tt,yt.image[nt])}}}l(g)&&y(i.TEXTURE_CUBE_MAP),rt.__version=K.version,g.onUpdate&&g.onUpdate(g)}S.__version=g.version}function ct(S,g,P,k,K,rt){let At=r.convert(P.format,P.colorSpace),X=r.convert(P.type),j=m(P.internalFormat,At,X,P.normalized,P.colorSpace),lt=n.get(g),St=n.get(P);if(St.__renderTarget=g,!lt.__hasExternalTextures){let ft=Math.max(1,g.width>>rt),ht=Math.max(1,g.height>>rt);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,rt,j,ft,ht,g.depth,0,At,X,null):e.texImage2D(K,rt,j,ft,ht,0,At,X,null)}e.bindFramebuffer(i.FRAMEBUFFER,S),ue(g)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,k,K,St.__webglTexture,0,le(g)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,k,K,St.__webglTexture,rt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Pt(S,g,P){if(i.bindRenderbuffer(i.RENDERBUFFER,S),g.depthBuffer){let k=g.depthTexture,K=k&&k.isDepthTexture?k.type:null,rt=E(g.stencilBuffer,K),At=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ue(g)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,le(g),rt,g.width,g.height):P?i.renderbufferStorageMultisample(i.RENDERBUFFER,le(g),rt,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,rt,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,At,i.RENDERBUFFER,S)}else{let k=g.textures;for(let K=0;K<k.length;K++){let rt=k[K],At=r.convert(rt.format,rt.colorSpace),X=r.convert(rt.type),j=m(rt.internalFormat,At,X,rt.normalized,rt.colorSpace);ue(g)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,le(g),j,g.width,g.height):P?i.renderbufferStorageMultisample(i.RENDERBUFFER,le(g),j,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,j,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ie(S,g,P){let k=g.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,S),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=n.get(g.depthTexture);if(K.__renderTarget=g,(!K.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),k){if(K.__webglInit===void 0&&(K.__webglInit=!0,g.depthTexture.addEventListener("dispose",b)),K.__webglTexture===void 0){K.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),wt(i.TEXTURE_CUBE_MAP,g.depthTexture);let lt=r.convert(g.depthTexture.format),St=r.convert(g.depthTexture.type),ft;g.depthTexture.format===mn?ft=i.DEPTH_COMPONENT24:g.depthTexture.format===jn&&(ft=i.DEPTH24_STENCIL8);for(let ht=0;ht<6;ht++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,ft,g.width,g.height,0,lt,St,null)}}else et(g.depthTexture,0);let rt=K.__webglTexture,At=le(g),X=k?i.TEXTURE_CUBE_MAP_POSITIVE_X+P:i.TEXTURE_2D,j=g.depthTexture.format===jn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===mn)ue(g)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,X,rt,0,At):i.framebufferTexture2D(i.FRAMEBUFFER,j,X,rt,0);else if(g.depthTexture.format===jn)ue(g)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,X,rt,0,At):i.framebufferTexture2D(i.FRAMEBUFFER,j,X,rt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Lt(S){let g=n.get(S),P=S.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==S.depthTexture){let k=S.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),k){let K=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,k.removeEventListener("dispose",K)};k.addEventListener("dispose",K),g.__depthDisposeCallback=K}g.__boundDepthTexture=k}if(S.depthTexture&&!g.__autoAllocateDepthBuffer)if(P)for(let k=0;k<6;k++)ie(g.__webglFramebuffer[k],S,k);else{let k=S.texture.mipmaps;k&&k.length>0?ie(g.__webglFramebuffer[0],S,0):ie(g.__webglFramebuffer,S,0)}else if(P){g.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[k]),g.__webglDepthbuffer[k]===void 0)g.__webglDepthbuffer[k]=i.createRenderbuffer(),Pt(g.__webglDepthbuffer[k],S,!1);else{let K=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=g.__webglDepthbuffer[k];i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,rt)}}else{let k=S.texture.mipmaps;if(k&&k.length>0?e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),Pt(g.__webglDepthbuffer,S,!1);else{let K=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,rt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Wt(S,g,P){let k=n.get(S);g!==void 0&&ct(k.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),P!==void 0&&Lt(S)}function Kt(S){let g=S.texture,P=n.get(S),k=n.get(g);S.addEventListener("dispose",w);let K=S.textures,rt=S.isWebGLCubeRenderTarget===!0,At=K.length>1;if(At||(k.__webglTexture===void 0&&(k.__webglTexture=i.createTexture()),k.__version=g.version,o.memory.textures++),rt){P.__webglFramebuffer=[];for(let X=0;X<6;X++)if(g.mipmaps&&g.mipmaps.length>0){P.__webglFramebuffer[X]=[];for(let j=0;j<g.mipmaps.length;j++)P.__webglFramebuffer[X][j]=i.createFramebuffer()}else P.__webglFramebuffer[X]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){P.__webglFramebuffer=[];for(let X=0;X<g.mipmaps.length;X++)P.__webglFramebuffer[X]=i.createFramebuffer()}else P.__webglFramebuffer=i.createFramebuffer();if(At)for(let X=0,j=K.length;X<j;X++){let lt=n.get(K[X]);lt.__webglTexture===void 0&&(lt.__webglTexture=i.createTexture(),o.memory.textures++)}if(S.samples>0&&ue(S)===!1){P.__webglMultisampledFramebuffer=i.createFramebuffer(),P.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let X=0;X<K.length;X++){let j=K[X];P.__webglColorRenderbuffer[X]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,P.__webglColorRenderbuffer[X]);let lt=r.convert(j.format,j.colorSpace),St=r.convert(j.type),ft=m(j.internalFormat,lt,St,j.normalized,j.colorSpace,S.isXRRenderTarget===!0),ht=le(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,ft,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+X,i.RENDERBUFFER,P.__webglColorRenderbuffer[X])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(P.__webglDepthRenderbuffer=i.createRenderbuffer(),Pt(P.__webglDepthRenderbuffer,S,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(rt){e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture),wt(i.TEXTURE_CUBE_MAP,g);for(let X=0;X<6;X++)if(g.mipmaps&&g.mipmaps.length>0)for(let j=0;j<g.mipmaps.length;j++)ct(P.__webglFramebuffer[X][j],S,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+X,j);else ct(P.__webglFramebuffer[X],S,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);l(g)&&y(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let X=0,j=K.length;X<j;X++){let lt=K[X],St=n.get(lt),ft=i.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(ft=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ft,St.__webglTexture),wt(ft,lt),ct(P.__webglFramebuffer,S,lt,i.COLOR_ATTACHMENT0+X,ft,0),l(lt)&&y(ft)}e.unbindTexture()}else{let X=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(X=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(X,k.__webglTexture),wt(X,g),g.mipmaps&&g.mipmaps.length>0)for(let j=0;j<g.mipmaps.length;j++)ct(P.__webglFramebuffer[j],S,g,i.COLOR_ATTACHMENT0,X,j);else ct(P.__webglFramebuffer,S,g,i.COLOR_ATTACHMENT0,X,0);l(g)&&y(X),e.unbindTexture()}S.depthBuffer&&Lt(S)}function Gt(S){let g=S.textures;for(let P=0,k=g.length;P<k;P++){let K=g[P];if(l(K)){let rt=v(S),At=n.get(K).__webglTexture;e.bindTexture(rt,At),y(rt),e.unbindTexture()}}}let Xt=[],we=[];function Le(S){if(S.samples>0){if(ue(S)===!1){let g=S.textures,P=S.width,k=S.height,K=i.COLOR_BUFFER_BIT,rt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,At=n.get(S),X=g.length>1;if(X)for(let lt=0;lt<g.length;lt++)e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer);let j=S.texture.mipmaps;j&&j.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let lt=0;lt<g.length;lt++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),X){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,At.__webglColorRenderbuffer[lt]);let St=n.get(g[lt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,St,0)}i.blitFramebuffer(0,0,P,k,0,0,P,k,K,i.NEAREST),c===!0&&(Xt.length=0,we.length=0,Xt.push(i.COLOR_ATTACHMENT0+lt),S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&(Xt.push(rt),we.push(rt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,we)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Xt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),X)for(let lt=0;lt<g.length;lt++){e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,At.__webglColorRenderbuffer[lt]);let St=n.get(g[lt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,St,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&c){let g=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function le(S){return Math.min(s.maxSamples,S.samples)}function ue(S){let g=n.get(S);return S.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function R(S){let g=o.render.frame;u.get(S)!==g&&(u.set(S,g),S.update())}function ye(S,g){let P=S.colorSpace,k=S.format,K=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||P!==as&&P!==Dn&&(Yt.getTransfer(P)===jt?(k!==$e||K!==He)&&Qt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ft("WebGLTextures: Unsupported texture color space:",P)),g}function $t(S){return typeof HTMLImageElement!="undefined"&&S instanceof HTMLImageElement?(A.width=S.naturalWidth||S.width,A.height=S.naturalHeight||S.height):typeof VideoFrame!="undefined"&&S instanceof VideoFrame?(A.width=S.displayWidth,A.height=S.displayHeight):(A.width=S.width,A.height=S.height),A}this.allocateTextureUnit=Z,this.resetTextureUnits=H,this.getTextureUnits=Q,this.setTextureUnits=V,this.setTexture2D=et,this.setTexture2DArray=W,this.setTexture3D=$,this.setTextureCube=tt,this.rebindTextures=Wt,this.setupRenderTarget=Kt,this.updateRenderTargetMipmap=Gt,this.updateMultisampleRenderTarget=Le,this.setupDepthRenderbuffer=Lt,this.setupFrameBufferTexture=ct,this.useMultisampledRTT=ue,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Cg(i,t){function e(n,s=Dn){let r,o=Yt.getTransfer(s);if(n===He)return i.UNSIGNED_BYTE;if(n===Jr)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Kr)return i.UNSIGNED_SHORT_5_5_5_1;if(n===La)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Na)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ua)return i.BYTE;if(n===Pa)return i.SHORT;if(n===Hi)return i.UNSIGNED_SHORT;if(n===Wr)return i.INT;if(n===cn)return i.UNSIGNED_INT;if(n===ln)return i.FLOAT;if(n===hn)return i.HALF_FLOAT;if(n===Ga)return i.ALPHA;if(n===Oa)return i.RGB;if(n===$e)return i.RGBA;if(n===mn)return i.DEPTH_COMPONENT;if(n===jn)return i.DEPTH_STENCIL;if(n===Ha)return i.RED;if(n===Xr)return i.RED_INTEGER;if(n===$n)return i.RG;if(n===Zr)return i.RG_INTEGER;if(n===qr)return i.RGBA_INTEGER;if(n===bs||n===Is||n===Ds||n===Ts)if(o===jt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===bs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Is)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ds)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ts)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===bs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Is)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ds)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ts)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===jr||n===$r||n===to||n===eo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===jr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===$r)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===to)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===eo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===no||n===io||n===so||n===ro||n===oo||n===Qs||n===ao)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===no||n===io)return o===jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===so)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ro)return r.COMPRESSED_R11_EAC;if(n===oo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Qs)return r.COMPRESSED_RG11_EAC;if(n===ao)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ao||n===co||n===lo||n===ho||n===uo||n===fo||n===po||n===go||n===mo||n===Bo||n===wo||n===Co||n===Eo||n===_o)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ao)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===co)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===lo)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ho)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===uo)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===fo)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===po)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===go)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===mo)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Bo)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wo)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Co)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Eo)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===_o)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Mo||n===xo||n===yo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Mo)return o===jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===yo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===vo||n===So||n===Fs||n===bo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===vo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===So)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Fs)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===bo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ki?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Eg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_g=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,fA=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new gs(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Ke({vertexShader:Eg,fragmentShader:_g,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new _e(new Vn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},pA=class extends on{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,A=null,u=null,f=null,h=null,p=null,B=null,M=typeof XRWebGLBinding!="undefined",d=new fA,l={},y=e.getContextAttributes(),v=null,m=null,E=[],_=[],b=new Rt,w=null,x=null,I=new Ie;I.viewport=new ce;let D=new Ie;D.viewport=new ce;let N=[I,D],H=new Or,Q=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(L){let z=E[L];return z===void 0&&(z=new Fi,E[L]=z),z.getTargetRaySpace()},this.getControllerGrip=function(L){let z=E[L];return z===void 0&&(z=new Fi,E[L]=z),z.getGripSpace()},this.getHand=function(L){let z=E[L];return z===void 0&&(z=new Fi,E[L]=z),z.getHandSpace()};function Z(L){let z=_.indexOf(L.inputSource);if(z===-1)return;let ot=E[z];ot!==void 0&&(ot.update(L.inputSource,L.frame,A||o),ot.dispatchEvent({type:L.type,data:L.inputSource}))}function J(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",et);for(let L=0;L<E.length;L++){let z=_[L];z!==null&&(_[L]=null,E[L].disconnect(z))}Q=null,V=null,d.reset();for(let L in l)delete l[L];if(t.setRenderTarget(v),p=null,h=null,f=null,s=null,m=null,at.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(b.width,b.height,!1),x!==null){let L=x.camera;L.fov=x.fov,L.zoom=x.zoom,L.updateProjectionMatrix(),x=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(L){r=L,n.isPresenting===!0&&Qt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(L){a=L,n.isPresenting===!0&&Qt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return A||o},this.setReferenceSpace=function(L){A=L},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f===null&&M&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return B},this.getSession=function(){return s},this.setSession=async function(L){if(s=L,s!==null){if(v=t.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",J),s.addEventListener("inputsourceschange",et),y.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(b),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let ot=null,Et=null,ct=null;y.depth&&(ct=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=y.stencil?jn:mn,Et=y.stencil?ki:cn);let Pt={colorFormat:e.RGBA8,depthFormat:ct,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Pt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),m=new Oe(h.textureWidth,h.textureHeight,{format:$e,type:He,depthTexture:new kn(h.textureWidth,h.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let ot={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,ot),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),m=new Oe(p.framebufferWidth,p.framebufferHeight,{format:$e,type:He,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}m.isXRRenderTarget=!0,this.setFoveation(c),A=null,o=await s.requestReferenceSpace(a),at.setContext(s),at.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return d.getDepthTexture()};function et(L){for(let z=0;z<L.removed.length;z++){let ot=L.removed[z],Et=_.indexOf(ot);Et>=0&&(_[Et]=null,E[Et].disconnect(ot))}for(let z=0;z<L.added.length;z++){let ot=L.added[z],Et=_.indexOf(ot);if(Et===-1){for(let Pt=0;Pt<E.length;Pt++)if(Pt>=_.length){_.push(ot),Et=Pt;break}else if(_[Pt]===null){_[Pt]=ot,Et=Pt;break}if(Et===-1)break}let ct=E[Et];ct&&ct.connect(ot)}}let W=new U,$=new U;function tt(L,z,ot){W.setFromMatrixPosition(z.matrixWorld),$.setFromMatrixPosition(ot.matrixWorld);let Et=W.distanceTo($),ct=z.projectionMatrix.elements,Pt=ot.projectionMatrix.elements,ie=ct[14]/(ct[10]-1),Lt=ct[14]/(ct[10]+1),Wt=(ct[9]+1)/ct[5],Kt=(ct[9]-1)/ct[5],Gt=(ct[8]-1)/ct[0],Xt=(Pt[8]+1)/Pt[0],we=ie*Gt,Le=ie*Xt,le=Et/(-Gt+Xt),ue=le*-Gt;if(z.matrixWorld.decompose(L.position,L.quaternion,L.scale),L.translateX(ue),L.translateZ(le),L.matrixWorld.compose(L.position,L.quaternion,L.scale),L.matrixWorldInverse.copy(L.matrixWorld).invert(),ct[10]===-1)L.projectionMatrix.copy(z.projectionMatrix),L.projectionMatrixInverse.copy(z.projectionMatrixInverse);else{let R=ie+le,ye=Lt+le,$t=we-ue,S=Le+(Et-ue),g=Wt*Lt/ye*R,P=Kt*Lt/ye*R;L.projectionMatrix.makePerspective($t,S,g,P,R,ye),L.projectionMatrixInverse.copy(L.projectionMatrix).invert()}}function it(L,z){z===null?L.matrixWorld.copy(L.matrix):L.matrixWorld.multiplyMatrices(z.matrixWorld,L.matrix),L.matrixWorldInverse.copy(L.matrixWorld).invert()}this.updateCamera=function(L){if(s===null)return;let z=L.near,ot=L.far;d.texture!==null&&(d.depthNear>0&&(z=d.depthNear),d.depthFar>0&&(ot=d.depthFar)),H.near=D.near=I.near=z,H.far=D.far=I.far=ot,(Q!==H.near||V!==H.far)&&(s.updateRenderState({depthNear:H.near,depthFar:H.far}),Q=H.near,V=H.far),H.layers.mask=L.layers.mask|6,I.layers.mask=H.layers.mask&-5,D.layers.mask=H.layers.mask&-3;let Et=L.parent,ct=H.cameras;it(H,Et);for(let Pt=0;Pt<ct.length;Pt++)it(ct[Pt],Et);ct.length===2?tt(H,I,D):H.projectionMatrix.copy(I.projectionMatrix),x===null&&L.isPerspectiveCamera&&(x={camera:L,fov:L.fov,zoom:L.zoom}),st(L,H,Et)};function st(L,z,ot){ot===null?L.matrix.copy(z.matrixWorld):(L.matrix.copy(ot.matrixWorld),L.matrix.invert(),L.matrix.multiply(z.matrixWorld)),L.matrix.decompose(L.position,L.quaternion,L.scale),L.updateMatrixWorld(!0),L.projectionMatrix.copy(z.projectionMatrix),L.projectionMatrixInverse.copy(z.projectionMatrixInverse),L.isPerspectiveCamera&&(L.fov=Di*2*Math.atan(1/L.projectionMatrix.elements[5]),L.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(L){c=L,h!==null&&(h.fixedFoveation=L),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=L)},this.hasDepthSensing=function(){return d.texture!==null},this.getDepthSensingMesh=function(){return d.getMesh(H)},this.getCameraTexture=function(L){return l[L]};let It=null;function wt(L,z){if(u=z.getViewerPose(A||o),B=z,u!==null){let ot=u.views;p!==null&&(t.setRenderTargetFramebuffer(m,p.framebuffer),t.setRenderTarget(m));let Et=!1;ot.length!==H.cameras.length&&(H.cameras.length=0,Et=!0);for(let Lt=0;Lt<ot.length;Lt++){let Wt=ot[Lt],Kt=null;if(p!==null)Kt=p.getViewport(Wt);else{let Xt=f.getViewSubImage(h,Wt);Kt=Xt.viewport,Lt===0&&(t.setRenderTargetTextures(m,Xt.colorTexture,Xt.depthStencilTexture),t.setRenderTarget(m))}let Gt=N[Lt];Gt===void 0&&(Gt=new Ie,Gt.layers.enable(Lt),Gt.viewport=new ce,N[Lt]=Gt),Gt.matrix.fromArray(Wt.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(Wt.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(Kt.x,Kt.y,Kt.width,Kt.height),Lt===0&&(H.matrix.copy(Gt.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Et===!0&&H.cameras.push(Gt)}let ct=s.enabledFeatures;if(ct&&ct.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){f=n.getBinding();let Lt=f.getDepthInformation(ot[0]);Lt&&Lt.isValid&&Lt.texture&&d.init(Lt,s.renderState)}if(ct&&ct.includes("camera-access")&&M){t.state.unbindTexture(),f=n.getBinding();for(let Lt=0;Lt<ot.length;Lt++){let Wt=ot[Lt].camera;if(Wt){let Kt=l[Wt];Kt||(Kt=new gs,l[Wt]=Kt);let Gt=f.getCameraImage(Wt);Kt.sourceTexture=Gt}}}}for(let ot=0;ot<E.length;ot++){let Et=_[ot],ct=E[ot];Et!==null&&ct!==void 0&&ct.update(Et,z,A||o)}It&&It(L,z),z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:z}),B=null}let at=new hl;at.setAnimationLoop(wt),this.setAnimationLoop=function(L){It=L},this.dispose=function(){}}},Mg=new Ae,ml=new Ut;ml.set(-1,0,0,0,1,0,0,0,1);function xg(i,t){function e(d,l){d.matrixAutoUpdate===!0&&d.updateMatrix(),l.value.copy(d.matrix)}function n(d,l){l.color.getRGB(d.fogColor.value,Wa(i)),l.isFog?(d.fogNear.value=l.near,d.fogFar.value=l.far):l.isFogExp2&&(d.fogDensity.value=l.density)}function s(d,l,y,v,m){l.isNodeMaterial?l.uniformsNeedUpdate=!1:l.isMeshBasicMaterial?r(d,l):l.isMeshLambertMaterial?(r(d,l),l.envMap&&(d.envMapIntensity.value=l.envMapIntensity)):l.isMeshToonMaterial?(r(d,l),f(d,l)):l.isMeshPhongMaterial?(r(d,l),u(d,l),l.envMap&&(d.envMapIntensity.value=l.envMapIntensity)):l.isMeshStandardMaterial?(r(d,l),h(d,l),l.isMeshPhysicalMaterial&&p(d,l,m)):l.isMeshMatcapMaterial?(r(d,l),B(d,l)):l.isMeshDepthMaterial?r(d,l):l.isMeshDistanceMaterial?(r(d,l),M(d,l)):l.isMeshNormalMaterial?r(d,l):l.isLineBasicMaterial?(o(d,l),l.isLineDashedMaterial&&a(d,l)):l.isPointsMaterial?c(d,l,y,v):l.isSpriteMaterial?A(d,l):l.isShadowMaterial?(d.color.value.copy(l.color),d.opacity.value=l.opacity):l.isShaderMaterial&&(l.uniformsNeedUpdate=!1)}function r(d,l){d.opacity.value=l.opacity,l.color&&d.diffuse.value.copy(l.color),l.emissive&&d.emissive.value.copy(l.emissive).multiplyScalar(l.emissiveIntensity),l.map&&(d.map.value=l.map,e(l.map,d.mapTransform)),l.alphaMap&&(d.alphaMap.value=l.alphaMap,e(l.alphaMap,d.alphaMapTransform)),l.bumpMap&&(d.bumpMap.value=l.bumpMap,e(l.bumpMap,d.bumpMapTransform),d.bumpScale.value=l.bumpScale,l.side===Pe&&(d.bumpScale.value*=-1)),l.normalMap&&(d.normalMap.value=l.normalMap,e(l.normalMap,d.normalMapTransform),d.normalScale.value.copy(l.normalScale),l.side===Pe&&d.normalScale.value.negate()),l.displacementMap&&(d.displacementMap.value=l.displacementMap,e(l.displacementMap,d.displacementMapTransform),d.displacementScale.value=l.displacementScale,d.displacementBias.value=l.displacementBias),l.emissiveMap&&(d.emissiveMap.value=l.emissiveMap,e(l.emissiveMap,d.emissiveMapTransform)),l.specularMap&&(d.specularMap.value=l.specularMap,e(l.specularMap,d.specularMapTransform)),l.alphaTest>0&&(d.alphaTest.value=l.alphaTest);let y=t.get(l),v=y.envMap,m=y.envMapRotation;v&&(d.envMap.value=v,d.envMapRotation.value.setFromMatrix4(Mg.makeRotationFromEuler(m)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&d.envMapRotation.value.premultiply(ml),d.reflectivity.value=l.reflectivity,d.ior.value=l.ior,d.refractionRatio.value=l.refractionRatio),l.lightMap&&(d.lightMap.value=l.lightMap,d.lightMapIntensity.value=l.lightMapIntensity,e(l.lightMap,d.lightMapTransform)),l.aoMap&&(d.aoMap.value=l.aoMap,d.aoMapIntensity.value=l.aoMapIntensity,e(l.aoMap,d.aoMapTransform))}function o(d,l){d.diffuse.value.copy(l.color),d.opacity.value=l.opacity,l.map&&(d.map.value=l.map,e(l.map,d.mapTransform))}function a(d,l){d.dashSize.value=l.dashSize,d.totalSize.value=l.dashSize+l.gapSize,d.scale.value=l.scale}function c(d,l,y,v){d.diffuse.value.copy(l.color),d.opacity.value=l.opacity,d.size.value=l.size*y,d.scale.value=v*.5,l.map&&(d.map.value=l.map,e(l.map,d.uvTransform)),l.alphaMap&&(d.alphaMap.value=l.alphaMap,e(l.alphaMap,d.alphaMapTransform)),l.alphaTest>0&&(d.alphaTest.value=l.alphaTest)}function A(d,l){d.diffuse.value.copy(l.color),d.opacity.value=l.opacity,d.rotation.value=l.rotation,l.map&&(d.map.value=l.map,e(l.map,d.mapTransform)),l.alphaMap&&(d.alphaMap.value=l.alphaMap,e(l.alphaMap,d.alphaMapTransform)),l.alphaTest>0&&(d.alphaTest.value=l.alphaTest)}function u(d,l){d.specular.value.copy(l.specular),d.shininess.value=Math.max(l.shininess,1e-4)}function f(d,l){l.gradientMap&&(d.gradientMap.value=l.gradientMap)}function h(d,l){d.metalness.value=l.metalness,l.metalnessMap&&(d.metalnessMap.value=l.metalnessMap,e(l.metalnessMap,d.metalnessMapTransform)),d.roughness.value=l.roughness,l.roughnessMap&&(d.roughnessMap.value=l.roughnessMap,e(l.roughnessMap,d.roughnessMapTransform)),l.envMap&&(d.envMapIntensity.value=l.envMapIntensity)}function p(d,l,y){d.ior.value=l.ior,l.sheen>0&&(d.sheenColor.value.copy(l.sheenColor).multiplyScalar(l.sheen),d.sheenRoughness.value=l.sheenRoughness,l.sheenColorMap&&(d.sheenColorMap.value=l.sheenColorMap,e(l.sheenColorMap,d.sheenColorMapTransform)),l.sheenRoughnessMap&&(d.sheenRoughnessMap.value=l.sheenRoughnessMap,e(l.sheenRoughnessMap,d.sheenRoughnessMapTransform))),l.clearcoat>0&&(d.clearcoat.value=l.clearcoat,d.clearcoatRoughness.value=l.clearcoatRoughness,l.clearcoatMap&&(d.clearcoatMap.value=l.clearcoatMap,e(l.clearcoatMap,d.clearcoatMapTransform)),l.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=l.clearcoatRoughnessMap,e(l.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),l.clearcoatNormalMap&&(d.clearcoatNormalMap.value=l.clearcoatNormalMap,e(l.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(l.clearcoatNormalScale),l.side===Pe&&d.clearcoatNormalScale.value.negate())),l.dispersion>0&&(d.dispersion.value=l.dispersion),l.retroreflectivity>0&&(d.retroreflectivity.value=l.retroreflectivity),l.iridescence>0&&(d.iridescence.value=l.iridescence,d.iridescenceIOR.value=l.iridescenceIOR,d.iridescenceThicknessMinimum.value=l.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=l.iridescenceThicknessRange[1],l.iridescenceMap&&(d.iridescenceMap.value=l.iridescenceMap,e(l.iridescenceMap,d.iridescenceMapTransform)),l.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=l.iridescenceThicknessMap,e(l.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),l.transmission>0&&(d.transmission.value=l.transmission,d.transmissionSamplerMap.value=y.texture,d.transmissionSamplerSize.value.set(y.width,y.height),l.transmissionMap&&(d.transmissionMap.value=l.transmissionMap,e(l.transmissionMap,d.transmissionMapTransform)),d.thickness.value=l.thickness,l.thicknessMap&&(d.thicknessMap.value=l.thicknessMap,e(l.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=l.attenuationDistance,d.attenuationColor.value.copy(l.attenuationColor)),l.anisotropy>0&&(d.anisotropyVector.value.set(l.anisotropy*Math.cos(l.anisotropyRotation),l.anisotropy*Math.sin(l.anisotropyRotation)),l.anisotropyMap&&(d.anisotropyMap.value=l.anisotropyMap,e(l.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=l.specularIntensity,d.specularColor.value.copy(l.specularColor),l.specularColorMap&&(d.specularColorMap.value=l.specularColorMap,e(l.specularColorMap,d.specularColorMapTransform)),l.specularIntensityMap&&(d.specularIntensityMap.value=l.specularIntensityMap,e(l.specularIntensityMap,d.specularIntensityMapTransform))}function B(d,l){l.matcap&&(d.matcap.value=l.matcap)}function M(d,l){let y=t.get(l).light;d.referencePosition.value.setFromMatrixPosition(y.matrixWorld),d.nearDistance.value=y.shadow.camera.near,d.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function yg(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(m,E){let _=E.program;n.uniformBlockBinding(m,_)}function A(m,E){let _=s[m.id];_===void 0&&(d(m),_=u(m),s[m.id]=_,m.addEventListener("dispose",y));let b=E.program;n.updateUBOMapping(m,b);let w=t.render.frame;r[m.id]!==w&&(h(m),r[m.id]=w)}function u(m){let E=f();m.__bindingPointIndex=E;let _=i.createBuffer(),b=m.__size,w=m.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,b,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,_),_}function f(){for(let m=0;m<a;m++)if(o.indexOf(m)===-1)return o.push(m),m;return Ft("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(m){let E=s[m.id],_=m.uniforms,b=m.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let w=0,x=_.length;w<x;w++){let I=_[w];if(Array.isArray(I))for(let D=0,N=I.length;D<N;D++)p(I[D],w,D,b);else p(I,w,0,b)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(m,E,_,b){if(M(m,E,_,b)===!0){let w=m.__offset,x=m.value;if(Array.isArray(x)){let I=0;for(let D=0;D<x.length;D++){let N=x[D],H=l(N);B(N,m.__data,I),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(I+=H.storage/Float32Array.BYTES_PER_ELEMENT)}}else B(x,m.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,w,m.__data)}}function B(m,E,_){typeof m=="number"||typeof m=="boolean"?E[0]=m:m.isMatrix3?(E[0]=m.elements[0],E[1]=m.elements[1],E[2]=m.elements[2],E[3]=0,E[4]=m.elements[3],E[5]=m.elements[4],E[6]=m.elements[5],E[7]=0,E[8]=m.elements[6],E[9]=m.elements[7],E[10]=m.elements[8],E[11]=0):ArrayBuffer.isView(m)?E.set(new m.constructor(m.buffer,m.byteOffset,E.length)):m.toArray(E,_)}function M(m,E,_,b){let w=m.value,x=E+"_"+_;if(b[x]===void 0)return typeof w=="number"||typeof w=="boolean"?b[x]=w:ArrayBuffer.isView(w)?b[x]=w.slice():b[x]=w.clone(),!0;{let I=b[x];if(typeof w=="number"||typeof w=="boolean"){if(I!==w)return b[x]=w,!0}else{if(ArrayBuffer.isView(w))return!0;if(I.equals(w)===!1)return I.copy(w),!0}}return!1}function d(m){let E=m.uniforms,_=0,b=16;for(let x=0,I=E.length;x<I;x++){let D=Array.isArray(E[x])?E[x]:[E[x]];for(let N=0,H=D.length;N<H;N++){let Q=D[N],V=Array.isArray(Q.value)?Q.value:[Q.value];for(let Z=0,J=V.length;Z<J;Z++){let et=V[Z],W=l(et),$=_%b,tt=$%W.boundary,it=$+tt;_+=tt,it!==0&&b-it<W.storage&&(_+=b-it),Q.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),Q.__offset=_,_+=W.storage}}}let w=_%b;return w>0&&(_+=b-w),m.__size=_,m.__cache={},this}function l(m){let E={boundary:0,storage:0};return typeof m=="number"||typeof m=="boolean"?(E.boundary=4,E.storage=4):m.isVector2?(E.boundary=8,E.storage=8):m.isVector3||m.isColor?(E.boundary=16,E.storage=12):m.isVector4?(E.boundary=16,E.storage=16):m.isMatrix3?(E.boundary=48,E.storage=48):m.isMatrix4?(E.boundary=64,E.storage=64):m.isTexture?Qt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(m)?(E.boundary=16,E.storage=m.byteLength):Qt("WebGLRenderer: Unsupported uniform value type.",m),E}function y(m){let E=m.target;E.removeEventListener("dispose",y);let _=o.indexOf(E.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function v(){for(let m in s)i.deleteBuffer(s[m]);o=[],s={},r={}}return{bind:c,update:A,dispose:v}}var vg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Cn=null;function Sg(){return Cn===null&&(Cn=new Er(vg,16,16,$n,hn),Cn.name="DFG_LUT",Cn.minFilter=Me,Cn.magFilter=Me,Cn.wrapS=pn,Cn.wrapT=pn,Cn.generateMipmaps=!1,Cn.needsUpdate=!0),Cn}var Po=class{constructor(t={}){let{canvas:e=Pc(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:A=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:p=He}=t;this.isWebGLRenderer=!0;let B;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");B=n.getContextAttributes().alpha}else B=o;let M=p,d=new Set([qr,Zr,Xr]),l=new Set([He,cn,Hi,ki,Jr,Kr]),y=new Uint32Array(4),v=new Int32Array(4),m=new U,E=null,_=null,b=[],w=[],x=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=An,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,D=!1,N=null,H=null,Q=null,V=null;this._outputColorSpace=Ne;let Z=0,J=0,et=null,W=-1,$=null,tt=new ce,it=new ce,st=null,It=new Vt(0),wt=0,at=e.width,L=e.height,z=1,ot=null,Et=null,ct=new ce(0,0,at,L),Pt=new ce(0,0,at,L),ie=!1,Lt=new Ri,Wt=!1,Kt=!1,Gt=new Ae,Xt=new U,we=new ce,Le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},le=!1;function ue(){return et===null?z:1}let R=n;function ye(C,T){return e.getContext(C,T)}let $t,S,g,P,k,K,rt,At,X,j,lt,St,ft,ht,bt,Tt,Nt,F,ut,q,dt,Bt,nt;try{let C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:A,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",se,!1),e.addEventListener("webglcontextrestored",Zt,!1),e.addEventListener("webglcontextcreationerror",tn,!1),R===null){let T="webgl2";if(R=ye(T,C),R===null)throw ye(T)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Dt()}catch(C){throw e.removeEventListener("webglcontextlost",se,!1),e.removeEventListener("webglcontextrestored",Zt,!1),e.removeEventListener("webglcontextcreationerror",tn,!1),Ft("WebGLRenderer: "+C.message),C}function Dt(){$t=new Rf(R),$t.init(),dt=new Cg(R,$t),S=new xf(R,$t,t,dt),g=new Bg(R,$t),S.reversedDepthBuffer&&h&&g.buffers.depth.setReversed(!0),H=R.createFramebuffer(),Q=R.createFramebuffer(),V=R.createFramebuffer(),P=new Lf(R),k=new sg,K=new wg(R,$t,g,k,S,dt,P),rt=new Ff(I),At=new Nh(R),Bt=new _f(R,At),X=new Uf(R,At,P,Bt),j=new Gf(R,X,At,Bt,P),F=new Nf(R,S,K),bt=new yf(k),lt=new ig(I,rt,$t,S,Bt,bt),St=new xg(I,k),ft=new og,ht=new ug($t),Nt=new Ef(I,rt,g,j,B,c),Tt=new mg(I,j,S),nt=new yg(R,P,S,g),ut=new Mf(R,$t,P),q=new Pf(R,$t,P),P.programs=lt.programs,I.capabilities=S,I.extensions=$t,I.properties=k,I.renderLists=ft,I.shadowMap=Tt,I.state=g,I.info=P}M!==He&&(x=new Hf(M,e.width,e.height,a,s,r));let yt=new pA(I,R);this.xr=yt,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let C=$t.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){let C=$t.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(C){C!==void 0&&(z=C,this.setSize(at,L,!1))},this.getSize=function(C){return C.set(at,L)},this.setSize=function(C,T,Y=!0){if(yt.isPresenting){Qt("WebGLRenderer: Can't change size while VR device is presenting.");return}at=C,L=T,e.width=Math.floor(C*z),e.height=Math.floor(T*z),Y===!0&&(e.style.width=C+"px",e.style.height=T+"px"),x!==null&&x.setSize(e.width,e.height),this.setViewport(0,0,C,T)},this.getDrawingBufferSize=function(C){return C.set(at*z,L*z).floor()},this.setDrawingBufferSize=function(C,T,Y){at=C,L=T,z=Y,e.width=Math.floor(C*Y),e.height=Math.floor(T*Y),this.setViewport(0,0,C,T)},this.setEffects=function(C){if(M===He){Ft("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let T=0;T<C.length;T++)if(C[T].isOutputPass===!0){Qt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}x.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(tt)},this.getViewport=function(C){return C.copy(ct)},this.setViewport=function(C,T,Y,G){C.isVector4?ct.set(C.x,C.y,C.z,C.w):ct.set(C,T,Y,G),g.viewport(tt.copy(ct).multiplyScalar(z).round())},this.getScissor=function(C){return C.copy(Pt)},this.setScissor=function(C,T,Y,G){C.isVector4?Pt.set(C.x,C.y,C.z,C.w):Pt.set(C,T,Y,G),g.scissor(it.copy(Pt).multiplyScalar(z).round())},this.getScissorTest=function(){return ie},this.setScissorTest=function(C){g.setScissorTest(ie=C)},this.setOpaqueSort=function(C){ot=C},this.setTransparentSort=function(C){Et=C},this.getClearColor=function(C){return C.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor(...arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha(...arguments)},this.clear=function(C=!0,T=!0,Y=!0){let G=0;if(C){let O=!1;if(et!==null){let mt=et.texture.format;O=d.has(mt)}if(O){let mt=et.texture.type,_t=l.has(mt),gt=Nt.getClearColor(),Mt=Nt.getClearAlpha(),vt=gt.r,Ot=gt.g,zt=gt.b;_t?(y[0]=vt,y[1]=Ot,y[2]=zt,y[3]=Mt,R.clearBufferuiv(R.COLOR,0,y)):(v[0]=vt,v[1]=Ot,v[2]=zt,v[3]=Mt,R.clearBufferiv(R.COLOR,0,v))}else G|=R.COLOR_BUFFER_BIT}T&&(G|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(G|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&R.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),N=C},this.dispose=function(){e.removeEventListener("webglcontextlost",se,!1),e.removeEventListener("webglcontextrestored",Zt,!1),e.removeEventListener("webglcontextcreationerror",tn,!1),Nt.dispose(),ft.dispose(),ht.dispose(),k.dispose(),rt.dispose(),j.dispose(),Bt.dispose(),nt.dispose(),lt.dispose(),yt.dispose(),yt.removeEventListener("sessionstart",EA),yt.removeEventListener("sessionend",_A),ti.stop()};function se(C){C.preventDefault(),Va("WebGLRenderer: Context Lost."),D=!0}function Zt(){Va("WebGLRenderer: Context Restored."),D=!1;let C=P.autoReset,T=Tt.enabled,Y=Tt.autoUpdate,G=Tt.needsUpdate,O=Tt.type;Dt(),P.autoReset=C,Tt.enabled=T,Tt.autoUpdate=Y,Tt.needsUpdate=G,Tt.type=O}function tn(C){Ft("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function un(C){let T=C.target;T.removeEventListener("dispose",un),Fl(T)}function Fl(C){Rl(C),k.remove(C)}function Rl(C){let T=k.get(C).programs;T!==void 0&&(T.forEach(function(Y){lt.releaseProgram(Y)}),C.isShaderMaterial&&lt.releaseShaderCache(C))}this.renderBufferDirect=function(C,T,Y,G,O,mt){T===null&&(T=Le);let _t=O.isMesh&&O.matrixWorld.determinantAffine()<0,gt=Ll(C,T,Y,G,O);g.setMaterial(G,_t);let Mt=Y.index,vt=1;if(G.wireframe===!0){if(Mt=X.getWireframeAttribute(Y),Mt===void 0)return;vt=2}let Ot=Y.drawRange,zt=Y.attributes.position,xt=Ot.start*vt,qt=(Ot.start+Ot.count)*vt;mt!==null&&(xt=Math.max(xt,mt.start*vt),qt=Math.min(qt,(mt.start+mt.count)*vt)),Mt!==null?(xt=Math.max(xt,0),qt=Math.min(qt,Mt.count)):zt!=null&&(xt=Math.max(xt,0),qt=Math.min(qt,zt.count));let de=qt-xt;if(de<0||de===1/0)return;Bt.setup(O,G,gt,Y,Mt);let oe,ne=ut;if(Mt!==null&&(oe=At.get(Mt),ne=q,ne.setIndex(oe)),O.isMesh)G.wireframe===!0?(g.setLineWidth(G.wireframeLinewidth*ue()),ne.setMode(R.LINES)):ne.setMode(R.TRIANGLES);else if(O.isLine){let ve=G.linewidth;ve===void 0&&(ve=1),g.setLineWidth(ve*ue()),O.isLineSegments?ne.setMode(R.LINES):O.isLineLoop?ne.setMode(R.LINE_LOOP):ne.setMode(R.LINE_STRIP)}else O.isPoints?ne.setMode(R.POINTS):O.isSprite&&ne.setMode(R.TRIANGLES);if(O.isBatchedMesh)if($t.get("WEBGL_multi_draw"))ne.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{let ve=O._multiDrawStarts,Ct=O._multiDrawCounts,Re=O._multiDrawCount,Jt=Mt?At.get(Mt).bytesPerElement:1,qe=k.get(G).currentProgram.getUniforms();for(let dn=0;dn<Re;dn++)qe.setValue(R,"_gl_DrawID",dn),ne.render(ve[dn]/Jt,Ct[dn])}else if(O.isInstancedMesh)ne.renderInstances(xt,de,O.count);else if(Y.isInstancedBufferGeometry){let ve=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Ct=Math.min(Y.instanceCount,ve);ne.renderInstances(xt,de,Ct)}else ne.render(xt,de)};function CA(C,T,Y,G){N!==null&&C.isNodeMaterial&&N.setObject(G,C),Wt===!0&&bt.setState(C,Y,!1),C.transparent===!0&&C.side===Te&&C.forceSinglePass===!1?(C.side=Pe,C.needsUpdate=!0,Ns(C,T,G),C.side=Xn,C.needsUpdate=!0,Ns(C,T,G),C.side=Te):Ns(C,T,G)}this.compile=function(C,T,Y=null){Y===null&&(Y=C),N!==null&&N.renderStart(C,T,Y),_=ht.get(Y),_.init(T),w.push(_),Y.traverseVisible(function(O){O.isLight&&O.layers.test(T.layers)&&(_.pushLight(O),O.castShadow&&_.pushShadow(O))}),C!==Y&&C.traverseVisible(function(O){O.isLight&&O.layers.test(T.layers)&&(_.pushLight(O),O.castShadow&&_.pushShadow(O))}),_.setupLights(),N!==null&&N.updateLights(_.state.lightsArray),Kt=this.localClippingEnabled,Wt=bt.init(this.clippingPlanes,Kt),Wt===!0&&bt.setGlobalState(this.clippingPlanes,T),N!==null&&Tt.render(_.state.shadowsArray,Y,T);let G=new Set;return C.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;let mt=O.material;if(mt)if(Array.isArray(mt))for(let _t=0;_t<mt.length;_t++){let gt=mt[_t];CA(gt,Y,T,O),G.add(gt)}else CA(mt,Y,T,O),G.add(mt)}),_=w.pop(),N!==null&&N.renderEnd(),G},this.compileAsync=function(C,T,Y=null){let G=this.compile(C,T,Y);return new Promise(O=>{function mt(){if(G.forEach(function(_t){let Mt=k.get(_t).currentProgram;(Mt===void 0||Mt.isReady())&&G.delete(_t)}),G.size===0){O(C);return}setTimeout(mt,10)}$t.get("KHR_parallel_shader_compile")!==null?mt():setTimeout(mt,10)})};let Vo=null;function Ul(C){Vo&&Vo(C)}function EA(){ti.stop()}function _A(){ti.start()}let ti=new hl;ti.setAnimationLoop(Ul),typeof self!="undefined"&&ti.setContext(self),this.setAnimationLoop=function(C){Vo=C,yt.setAnimationLoop(C),C===null?ti.stop():ti.start()},yt.addEventListener("sessionstart",EA),yt.addEventListener("sessionend",_A),this.render=function(C,T){if(T!==void 0&&T.isCamera!==!0){Ft("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;N!==null&&N.renderStart(C,T);let Y=yt.enabled===!0&&yt.isPresenting===!0,G=x!==null&&(et===null||Y)&&x.begin(I,et);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),T.parent===null&&T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),yt.enabled===!0&&yt.isPresenting===!0&&(x===null||x.isCompositing()===!1)&&(yt.cameraAutoUpdate===!0&&yt.updateCamera(T),T=yt.getCamera()),C.isScene===!0&&C.onBeforeRender(I,C,T,et),_=ht.get(C,w.length),_.init(T),_.state.textureUnits=K.getTextureUnits(),w.push(_),Gt.multiplyMatrices(T.projectionMatrix,T.matrixWorldInverse),Lt.setFromProjectionMatrix(Gt,rn,T.reversedDepth),Kt=this.localClippingEnabled,Wt=bt.init(this.clippingPlanes,Kt),E=ft.get(C,b.length),E.init(),b.push(E),yt.enabled===!0&&yt.isPresenting===!0){let _t=I.xr.getDepthSensingMesh();_t!==null&&zo(_t,T,-1/0,I.sortObjects)}zo(C,T,0,I.sortObjects),E.finish(),N!==null&&N.updateLights(_.state.lightsArray),I.sortObjects===!0&&E.sort(ot,Et),le=yt.enabled===!1||yt.isPresenting===!1||yt.hasDepthSensing()===!1,le&&Nt.addToRenderList(E,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Wt===!0&&bt.beginShadows();let O=_.state.shadowsArray;if(Tt.render(O,C,T),Wt===!0&&bt.endShadows(),(G&&x.hasRenderPass())===!1){let _t=E.opaque,gt=E.transmissive;if(_.setupLights(),T.isArrayCamera){let Mt=T.cameras;if(gt.length>0)for(let vt=0,Ot=Mt.length;vt<Ot;vt++){let zt=Mt[vt];xA(_t,gt,C,zt)}le&&Nt.render(C);for(let vt=0,Ot=Mt.length;vt<Ot;vt++){let zt=Mt[vt];MA(E,C,zt,zt.viewport)}}else gt.length>0&&xA(_t,gt,C,T),le&&Nt.render(C),MA(E,C,T)}et!==null&&J===0&&(K.updateMultisampleRenderTarget(et),K.updateRenderTargetMipmap(et)),G&&x.end(I),C.isScene===!0&&C.onAfterRender(I,C,T),Bt.resetDefaultState(),W=-1,$=null,w.pop(),w.length>0?(_=w[w.length-1],K.setTextureUnits(_.state.textureUnits),Wt===!0&&bt.setGlobalState(I.clippingPlanes,_.state.camera)):_=null,b.pop(),b.length>0?E=b[b.length-1]:E=null,N!==null&&N.renderEnd()};function zo(C,T,Y,G){if(C.visible===!1)return;if(C.layers.test(T.layers)){if(C.isGroup)Y=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(T);else if(C.isLightProbeGrid)_.pushLightProbeGrid(C);else if(C.isLight)_.pushLight(C),C.castShadow&&_.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||C.intersectsFrustum(Lt)){G&&we.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Gt);let _t=j.update(C),gt=C.material;gt.visible&&E.push(C,_t,gt,Y,we.z,null,T)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||C.intersectsFrustum(Lt))){let _t=j.update(C),gt=C.material;if(G&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),we.copy(C.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),we.copy(_t.boundingSphere.center)),we.applyMatrix4(C.matrixWorld).applyMatrix4(Gt)),Array.isArray(gt)){let Mt=_t.groups;for(let vt=0,Ot=Mt.length;vt<Ot;vt++){let zt=Mt[vt],xt=gt[zt.materialIndex];xt&&xt.visible&&E.push(C,_t,xt,Y,we.z,zt,T)}}else gt.visible&&E.push(C,_t,gt,Y,we.z,null,T)}}let mt=C.children;for(let _t=0,gt=mt.length;_t<gt;_t++)zo(mt[_t],T,Y,G)}function MA(C,T,Y,G){let{opaque:O,transmissive:mt,transparent:_t}=C;_.setupLightsView(Y),Wt===!0&&bt.setGlobalState(I.clippingPlanes,Y),G&&g.viewport(tt.copy(G)),O.length>0&&Ls(O,T,Y),mt.length>0&&Ls(mt,T,Y),_t.length>0&&Ls(_t,T,Y),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function xA(C,T,Y,G){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(_.state.transmissionRenderTarget[G.id]===void 0){let xt=$t.has("EXT_color_buffer_half_float")||$t.has("EXT_color_buffer_float");_.state.transmissionRenderTarget[G.id]=new Oe(1,1,{generateMipmaps:!0,type:xt?hn:He,minFilter:qn,samples:Math.max(4,S.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Yt.workingColorSpace})}let mt=_.state.transmissionRenderTarget[G.id],_t=G.viewport||tt;mt.setSize(_t.z*I.transmissionResolutionScale,_t.w*I.transmissionResolutionScale);let gt=I.getRenderTarget(),Mt=I.getActiveCubeFace(),vt=I.getActiveMipmapLevel();I.setRenderTarget(mt),I.getClearColor(It),wt=I.getClearAlpha(),wt<1&&I.setClearColor(16777215,.5),I.clear(),le&&Nt.render(Y);let Ot=I.toneMapping;I.toneMapping=An;let zt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),_.setupLightsView(G),Wt===!0&&bt.setGlobalState(I.clippingPlanes,G),Ls(C,Y,G),K.updateMultisampleRenderTarget(mt),K.updateRenderTargetMipmap(mt),$t.has("WEBGL_multisampled_render_to_texture")===!1){let xt=!1;for(let qt=0,de=T.length;qt<de;qt++){let oe=T[qt],{object:ne,geometry:ve,material:Ct,group:Re}=oe;if(Ct.side===Te&&ne.layers.test(G.layers)){let Jt=Ct.side;Ct.side=Pe,Ct.needsUpdate=!0,yA(ne,Y,G,ve,Ct,Re),Ct.side=Jt,Ct.needsUpdate=!0,xt=!0}}xt===!0&&(K.updateMultisampleRenderTarget(mt),K.updateRenderTargetMipmap(mt))}I.setRenderTarget(gt,Mt,vt),I.setClearColor(It,wt),zt!==void 0&&(G.viewport=zt),I.toneMapping=Ot}function Ls(C,T,Y){let G=T.isScene===!0?T.overrideMaterial:null;for(let O=0,mt=C.length;O<mt;O++){let _t=C[O],{object:gt,geometry:Mt,group:vt}=_t,Ot=_t.material;Ot.allowOverride===!0&&G!==null&&(Ot=G),gt.layers.test(Y.layers)&&yA(gt,T,Y,Mt,Ot,vt)}}function yA(C,T,Y,G,O,mt){N!==null&&O.isNodeMaterial&&N.setObject(C,O),C.onBeforeRender(I,T,Y,G,O,mt),C.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),O.onBeforeRender(I,T,Y,G,C,mt),O.transparent===!0&&O.side===Te&&O.forceSinglePass===!1?(O.side=Pe,O.needsUpdate=!0,I.renderBufferDirect(Y,T,G,O,C,mt),O.side=Xn,O.needsUpdate=!0,I.renderBufferDirect(Y,T,G,O,C,mt),O.side=Te):I.renderBufferDirect(Y,T,G,O,C,mt),C.onAfterRender(I,T,Y,G,O,mt)}function Ns(C,T,Y){T.isScene!==!0&&(T=Le);let G=k.get(C),O=_.state.lights,mt=_.state.shadowsArray,_t=O.state.version,gt=lt.getParameters(C,O.state,mt,T,Y,_.state.lightProbeGridArray),Mt=lt.getProgramCacheKey(gt),vt=G.programs;G.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?T.environment:null,G.fog=T.fog;let Ot=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;G.envMap=rt.get(C.envMap||G.environment,Ot),G.envMapRotation=G.environment!==null&&C.envMap===null?T.environmentRotation:C.envMapRotation,vt===void 0&&(C.addEventListener("dispose",un),vt=new Map,G.programs=vt);let zt=vt.get(Mt);if(zt!==void 0){if(G.currentProgram===zt&&G.lightsStateVersion===_t)return SA(C,gt),zt}else gt.uniforms=lt.getUniforms(C),N!==null&&C.isNodeMaterial&&N.build(C,Y,gt),C.onBeforeCompile(gt,I),zt=lt.acquireProgram(gt,Mt),vt.set(Mt,zt),G.uniforms=gt.uniforms;let xt=G.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(xt.clippingPlanes=bt.uniform),SA(C,gt),G.needsLights=Gl(C),G.lightsStateVersion=_t,G.needsLights&&(xt.ambientLightColor.value=O.state.ambient,xt.lightProbe.value=O.state.probe,xt.sunLights.value=O.state.sun,xt.sunLightShadows.value=O.state.sunShadow,xt.directionalLights.value=O.state.directional,xt.directionalLightShadows.value=O.state.directionalShadow,xt.spotLights.value=O.state.spot,xt.spotLightShadows.value=O.state.spotShadow,xt.rectAreaLights.value=O.state.rectArea,xt.ltc_1.value=O.state.rectAreaLTC1,xt.ltc_2.value=O.state.rectAreaLTC2,xt.pointLights.value=O.state.point,xt.pointLightShadows.value=O.state.pointShadow,xt.hemisphereLights.value=O.state.hemi,xt.sunShadowMatrix.value=O.state.sunShadowMatrix,xt.sunShadowCascade.value=O.state.sunShadowCascade,xt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,xt.spotLightMatrix.value=O.state.spotLightMatrix,xt.spotLightMap.value=O.state.spotLightMap,xt.pointShadowMatrix.value=O.state.pointShadowMatrix),G.lightProbeGrid=_.state.lightProbeGridArray.length>0,G.currentProgram=zt,G.uniformsList=null,zt}function vA(C){if(C.uniformsList===null){let T=C.currentProgram.getUniforms();C.uniformsList=Wi.seqWithValue(T.seq,C.uniforms)}return C.uniformsList}function SA(C,T){let Y=k.get(C);Y.outputColorSpace=T.outputColorSpace,Y.batching=T.batching,Y.batchingColor=T.batchingColor,Y.instancing=T.instancing,Y.instancingColor=T.instancingColor,Y.instancingMorph=T.instancingMorph,Y.skinning=T.skinning,Y.morphTargets=T.morphTargets,Y.morphNormals=T.morphNormals,Y.morphColors=T.morphColors,Y.morphTargetsCount=T.morphTargetsCount,Y.numClippingPlanes=T.numClippingPlanes,Y.numIntersection=T.numClipIntersection,Y.vertexAlphas=T.vertexAlphas,Y.vertexTangents=T.vertexTangents,Y.toneMapping=T.toneMapping}function Pl(C,T){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;m.setFromMatrixPosition(T.matrixWorld);for(let Y=0,G=C.length;Y<G;Y++){let O=C[Y];if(O.texture!==null&&O.boundingBox.containsPoint(m))return O}return null}function Ll(C,T,Y,G,O){T.isScene!==!0&&(T=Le),K.resetTextureUnits();let mt=T.fog,_t=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?T.environment:null,gt=et===null?I.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Yt.workingColorSpace,Mt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,vt=rt.get(G.envMap||_t,Mt),Ot=G.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,zt=!!Y.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),xt=!!Y.morphAttributes.position,qt=!!Y.morphAttributes.normal,de=!!Y.morphAttributes.color,oe=An;G.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(oe=I.toneMapping);let ne=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ve=ne!==void 0?ne.length:0,Ct=k.get(G),Re=_.state.lights;if(Wt===!0&&(Kt===!0||C!==$)){let re=C===$&&G.id===W;bt.setState(G,C,re)}let Jt=!1;G.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==Re.state.version||Ct.outputColorSpace!==gt||O.isBatchedMesh&&Ct.batching===!1||!O.isBatchedMesh&&Ct.batching===!0||O.isBatchedMesh&&Ct.batchingColor===!0&&O._colorsTexture===null||O.isBatchedMesh&&Ct.batchingColor===!1&&O._colorsTexture!==null||O.isInstancedMesh&&Ct.instancing===!1||!O.isInstancedMesh&&Ct.instancing===!0||O.isSkinnedMesh&&Ct.skinning===!1||!O.isSkinnedMesh&&Ct.skinning===!0||O.isInstancedMesh&&Ct.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ct.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ct.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ct.instancingMorph===!1&&O.morphTexture!==null||Ct.envMap!==vt||G.fog===!0&&Ct.fog!==mt||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==bt.numPlanes||Ct.numIntersection!==bt.numIntersection)||Ct.vertexAlphas!==Ot||Ct.vertexTangents!==zt||Ct.morphTargets!==xt||Ct.morphNormals!==qt||Ct.morphColors!==de||Ct.toneMapping!==oe||Ct.morphTargetsCount!==ve||!!Ct.lightProbeGrid!=_.state.lightProbeGridArray.length>0)&&(Jt=!0):(Jt=!0,Ct.__version=G.version);let qe=Ct.currentProgram;Jt===!0&&(qe=Ns(G,T,O),N&&G.isNodeMaterial&&N.onUpdateProgram(G,qe,Ct));let dn=!1,Tn=!1,li=!1,ee=qe.getUniforms(),he=Ct.uniforms;if(g.useProgram(qe.program)&&(dn=!0,Tn=!0,li=!0),G.id!==W&&(W=G.id,Tn=!0),Ct.needsLights){let re=Pl(_.state.lightProbeGridArray,O);Ct.lightProbeGrid!==re&&(Ct.lightProbeGrid=re,Tn=!0)}if(dn||$!==C){g.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),ee.setValue(R,"projectionMatrix",C.projectionMatrix),ee.setValue(R,"viewMatrix",C.matrixWorldInverse);let Fn=ee.map.cameraPosition;Fn!==void 0&&Fn.setValue(R,Xt.setFromMatrixPosition(C.matrixWorld)),S.logarithmicDepthBuffer&&ee.setValue(R,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ee.setValue(R,"isOrthographic",C.isOrthographicCamera===!0),$!==C&&($=C,Tn=!0,li=!0)}if(Ct.needsLights&&(Re.state.sunShadowMap.length>0&&ee.setValue(R,"sunShadowMap",Re.state.sunShadowMap,K),Re.state.directionalShadowMap.length>0&&ee.setValue(R,"directionalShadowMap",Re.state.directionalShadowMap,K),Re.state.spotShadowMap.length>0&&ee.setValue(R,"spotShadowMap",Re.state.spotShadowMap,K),Re.state.pointShadowMap.length>0&&ee.setValue(R,"pointShadowMap",Re.state.pointShadowMap,K)),O.isSkinnedMesh){ee.setOptional(R,O,"bindMatrix"),ee.setOptional(R,O,"bindMatrixInverse");let re=O.skeleton;re&&(re.boneTexture===null&&re.computeBoneTexture(),ee.setValue(R,"boneTexture",re.boneTexture,K))}O.isBatchedMesh&&(ee.setOptional(R,O,"batchingTexture"),ee.setValue(R,"batchingTexture",O._matricesTexture,K),ee.setOptional(R,O,"batchingIdTexture"),ee.setValue(R,"batchingIdTexture",O._indirectTexture,K),ee.setOptional(R,O,"batchingColorTexture"),O._colorsTexture!==null&&ee.setValue(R,"batchingColorTexture",O._colorsTexture,K));let Qn=Y.morphAttributes;if((Qn.position!==void 0||Qn.normal!==void 0||Qn.color!==void 0)&&F.update(O,Y,qe),(Tn||Ct.receiveShadow!==O.receiveShadow)&&(Ct.receiveShadow=O.receiveShadow,ee.setValue(R,"receiveShadow",O.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&T.environment!==null&&(he.envMapIntensity.value=T.environmentIntensity),he.dfgLUT!==void 0&&(he.dfgLUT.value=Sg()),Tn){if(ee.setValue(R,"toneMappingExposure",I.toneMappingExposure),Ct.needsLights&&Nl(he,li),mt&&G.fog===!0&&St.refreshFogUniforms(he,mt),St.refreshMaterialUniforms(he,G,z,L,_.state.transmissionRenderTarget[C.id]),Ct.needsLights&&Ct.lightProbeGrid){let re=Ct.lightProbeGrid;he.probesSH.value=re.texture,he.probesMin.value.copy(re.boundingBox.min),he.probesMax.value.copy(re.boundingBox.max),he.probesResolution.value.copy(re.resolution)}Wi.upload(R,vA(Ct),he,K)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Wi.upload(R,vA(Ct),he,K),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ee.setValue(R,"center",O.center),ee.setValue(R,"modelViewMatrix",O.modelViewMatrix),ee.setValue(R,"normalMatrix",O.normalMatrix),ee.setValue(R,"modelMatrix",O.matrixWorld),G.uniformsGroups!==void 0){let re=G.uniformsGroups;for(let Fn=0,hi=re.length;Fn<hi;Fn++){let IA=re[Fn];nt.update(IA,qe),nt.bind(IA,qe)}}return qe}function Nl(C,T){C.ambientLightColor.needsUpdate=T,C.lightProbe.needsUpdate=T,C.sunLights.needsUpdate=T,C.sunLightShadows.needsUpdate=T,C.directionalLights.needsUpdate=T,C.directionalLightShadows.needsUpdate=T,C.pointLights.needsUpdate=T,C.pointLightShadows.needsUpdate=T,C.spotLights.needsUpdate=T,C.spotLightShadows.needsUpdate=T,C.rectAreaLights.needsUpdate=T,C.hemisphereLights.needsUpdate=T}function Gl(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return J},this.getRenderTarget=function(){return et},this.setRenderTargetTextures=function(C,T,Y){let G=k.get(C);G.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),k.get(C.texture).__webglTexture=T,k.get(C.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:Y,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,T){let Y=k.get(C);Y.__webglFramebuffer=T,Y.__useDefaultFramebuffer=T===void 0},this.setRenderTarget=function(C,T=0,Y=0){et=C,Z=T,J=Y;let G=null,O=!1,mt=!1;if(C){let gt=k.get(C);if(gt.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(R.FRAMEBUFFER,gt.__webglFramebuffer),tt.copy(C.viewport),it.copy(C.scissor),st=C.scissorTest,g.viewport(tt),g.scissor(it),g.setScissorTest(st),W=-1;return}else if(gt.__webglFramebuffer===void 0)K.setupRenderTarget(C);else if(gt.__hasExternalTextures)K.rebindTextures(C,k.get(C.texture).__webglTexture,k.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){let Ot=C.depthTexture;if(gt.__boundDepthTexture!==Ot){if(Ot!==null&&k.has(Ot)&&(C.width!==Ot.image.width||C.height!==Ot.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(C)}}let Mt=C.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(mt=!0);let vt=k.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(vt[T])?G=vt[T][Y]:G=vt[T],O=!0):C.samples>0&&K.useMultisampledRTT(C)===!1?G=k.get(C).__webglMultisampledFramebuffer:Array.isArray(vt)?G=vt[Y]:G=vt,tt.copy(C.viewport),it.copy(C.scissor),st=C.scissorTest}else tt.copy(ct).multiplyScalar(z).floor(),it.copy(Pt).multiplyScalar(z).floor(),st=ie;if(Y!==0&&(G=H),g.bindFramebuffer(R.FRAMEBUFFER,G)&&g.drawBuffers(C,G),g.viewport(tt),g.scissor(it),g.setScissorTest(st),O){let gt=k.get(C.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+T,gt.__webglTexture,Y)}else if(mt){let gt=T;for(let Mt=0;Mt<C.textures.length;Mt++){let vt=k.get(C.textures[Mt]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Mt,vt.__webglTexture,Y,gt)}}else if(C!==null&&Y!==0){let gt=k.get(C.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,gt.__webglTexture,Y)}W=-1};function bA(C){let T=k.get(C);return(T.__readFormat!==C.format||T.__readType!==C.type)&&(T.__readFormat=C.format,T.__readType=C.type,T.__formatReadable=S.textureFormatReadable(C.format),T.__typeReadable=S.textureTypeReadable(C.type)),T}this.readRenderTargetPixels=function(C,T,Y,G,O,mt,_t,gt=0){if(!(C&&C.isWebGLRenderTarget)){Ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=k.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&_t!==void 0&&(Mt=Mt[_t]),Mt){g.bindFramebuffer(R.FRAMEBUFFER,Mt);try{let vt=C.textures[gt],Ot=vt.format,zt=vt.type;C.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+gt);let xt=bA(vt);if(xt.__formatReadable===!1){Ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(xt.__typeReadable===!1){Ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}T>=0&&T<=C.width-G&&Y>=0&&Y<=C.height-O&&R.readPixels(T,Y,G,O,dt.convert(Ot),dt.convert(zt),mt)}finally{let vt=et!==null?k.get(et).__webglFramebuffer:null;g.bindFramebuffer(R.FRAMEBUFFER,vt)}}},this.readRenderTargetPixelsAsync=async function(C,T,Y,G,O,mt,_t,gt=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=k.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&_t!==void 0&&(Mt=Mt[_t]),Mt)if(T>=0&&T<=C.width-G&&Y>=0&&Y<=C.height-O){g.bindFramebuffer(R.FRAMEBUFFER,Mt);let vt=C.textures[gt],Ot=vt.format,zt=vt.type;C.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+gt);let xt=bA(vt);if(xt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(xt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let qt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,qt),R.bufferData(R.PIXEL_PACK_BUFFER,mt.byteLength,R.STREAM_READ),R.readPixels(T,Y,G,O,dt.convert(Ot),dt.convert(zt),0),R.bindBuffer(R.PIXEL_PACK_BUFFER,null);let de=et!==null?k.get(et).__webglFramebuffer:null;g.bindFramebuffer(R.FRAMEBUFFER,de);let oe=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Nc(R,oe,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,qt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,mt),R.bindBuffer(R.PIXEL_PACK_BUFFER,null),R.deleteBuffer(qt),R.deleteSync(oe),mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,T=null,Y=0){let G=Math.pow(2,-Y),O=Math.floor(C.image.width*G),mt=Math.floor(C.image.height*G),_t=T!==null?T.x:0,gt=T!==null?T.y:0;K.setTexture2D(C,0),R.copyTexSubImage2D(R.TEXTURE_2D,Y,0,0,_t,gt,O,mt),g.unbindTexture()},this.copyTextureToTexture=function(C,T,Y=null,G=null,O=0,mt=0){let _t,gt,Mt,vt,Ot,zt,xt,qt,de,oe=C.isCompressedTexture?C.mipmaps[mt]:C.image;if(Y!==null)_t=Y.max.x-Y.min.x,gt=Y.max.y-Y.min.y,Mt=Y.isBox3?Y.max.z-Y.min.z:1,vt=Y.min.x,Ot=Y.min.y,zt=Y.isBox3?Y.min.z:0;else{let he=Math.pow(2,-O);_t=Math.floor(oe.width*he),gt=Math.floor(oe.height*he),C.isDataArrayTexture?Mt=oe.depth:C.isData3DTexture?Mt=Math.floor(oe.depth*he):Mt=1,vt=0,Ot=0,zt=0}G!==null?(xt=G.x,qt=G.y,de=G.z):(xt=0,qt=0,de=0);let ne=dt.convert(T.format),ve=dt.convert(T.type),Ct;T.isData3DTexture?(K.setTexture3D(T,0),Ct=R.TEXTURE_3D):T.isDataArrayTexture||T.isCompressedArrayTexture?(K.setTexture2DArray(T,0),Ct=R.TEXTURE_2D_ARRAY):(K.setTexture2D(T,0),Ct=R.TEXTURE_2D),g.activeTexture(R.TEXTURE0),g.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,T.flipY),g.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),g.pixelStorei(R.UNPACK_ALIGNMENT,T.unpackAlignment);let Re=g.getParameter(R.UNPACK_ROW_LENGTH),Jt=g.getParameter(R.UNPACK_IMAGE_HEIGHT),qe=g.getParameter(R.UNPACK_SKIP_PIXELS),dn=g.getParameter(R.UNPACK_SKIP_ROWS),Tn=g.getParameter(R.UNPACK_SKIP_IMAGES);g.pixelStorei(R.UNPACK_ROW_LENGTH,oe.width),g.pixelStorei(R.UNPACK_IMAGE_HEIGHT,oe.height),g.pixelStorei(R.UNPACK_SKIP_PIXELS,vt),g.pixelStorei(R.UNPACK_SKIP_ROWS,Ot),g.pixelStorei(R.UNPACK_SKIP_IMAGES,zt);let li=C.isDataArrayTexture||C.isData3DTexture,ee=T.isDataArrayTexture||T.isData3DTexture;if(C.isDepthTexture){let he=k.get(C),Qn=k.get(T),re=k.get(he.__renderTarget),Fn=k.get(Qn.__renderTarget);g.bindFramebuffer(R.READ_FRAMEBUFFER,re.__webglFramebuffer),g.bindFramebuffer(R.DRAW_FRAMEBUFFER,Fn.__webglFramebuffer);for(let hi=0;hi<Mt;hi++)li&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,k.get(C).__webglTexture,O,zt+hi),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,k.get(T).__webglTexture,mt,de+hi)),R.blitFramebuffer(vt,Ot,_t,gt,xt,qt,_t,gt,R.DEPTH_BUFFER_BIT,R.NEAREST);g.bindFramebuffer(R.READ_FRAMEBUFFER,null),g.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(O!==0||C.isRenderTargetTexture||k.has(C)){let he=k.get(C),Qn=k.get(T);g.bindFramebuffer(R.READ_FRAMEBUFFER,Q),g.bindFramebuffer(R.DRAW_FRAMEBUFFER,V);for(let re=0;re<Mt;re++)li?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,he.__webglTexture,O,zt+re):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,he.__webglTexture,O),ee?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Qn.__webglTexture,mt,de+re):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Qn.__webglTexture,mt),O!==0?R.blitFramebuffer(vt,Ot,_t,gt,xt,qt,_t,gt,R.COLOR_BUFFER_BIT,R.NEAREST):ee?R.copyTexSubImage3D(Ct,mt,xt,qt,de+re,vt,Ot,_t,gt):R.copyTexSubImage2D(Ct,mt,xt,qt,vt,Ot,_t,gt);g.bindFramebuffer(R.READ_FRAMEBUFFER,null),g.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else ee?C.isDataTexture||C.isData3DTexture?R.texSubImage3D(Ct,mt,xt,qt,de,_t,gt,Mt,ne,ve,oe.data):T.isCompressedArrayTexture?R.compressedTexSubImage3D(Ct,mt,xt,qt,de,_t,gt,Mt,ne,oe.data):R.texSubImage3D(Ct,mt,xt,qt,de,_t,gt,Mt,ne,ve,oe):C.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,mt,xt,qt,_t,gt,ne,ve,oe.data):C.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,mt,xt,qt,oe.width,oe.height,ne,oe.data):R.texSubImage2D(R.TEXTURE_2D,mt,xt,qt,_t,gt,ne,ve,oe);g.pixelStorei(R.UNPACK_ROW_LENGTH,Re),g.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Jt),g.pixelStorei(R.UNPACK_SKIP_PIXELS,qe),g.pixelStorei(R.UNPACK_SKIP_ROWS,dn),g.pixelStorei(R.UNPACK_SKIP_IMAGES,Tn),mt===0&&T.generateMipmaps&&R.generateMipmap(Ct),g.unbindTexture()},this.initRenderTarget=function(C){k.get(C).__webglFramebuffer===void 0&&K.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?K.setTextureCube(C,0):C.isData3DTexture?K.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?K.setTexture2DArray(C,0):K.setTexture2D(C,0),g.unbindTexture()},this.resetState=function(){Z=0,J=0,et=null,g.reset(),Bt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Yt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Yt._getUnpackColorSpace()}};var Bl={type:"change"},mA={type:"start"},Cl={type:"end"},Go=new Hn,wl=new Ye,bg=Math.cos(70*Ya.DEG2RAD),Be=new U,ke=2*Math.PI,te={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},gA=1e-6,Oo=class extends xs{constructor(t,e=null){super(t,e),this.state=te.NONE,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Jn.ROTATE,MIDDLE:Jn.DOLLY,RIGHT:Jn.PAN},this.touches={ONE:Kn.ROTATE,TWO:Kn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new Je,this._lastTargetPosition=new U,this._quat=new Je().setFromUnitVectors(t.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ni,this._sphericalDelta=new Ni,this._scale=1,this._panOffset=new U,this._rotateStart=new Rt,this._rotateEnd=new Rt,this._rotateDelta=new Rt,this._panStart=new Rt,this._panEnd=new Rt,this._panDelta=new Rt,this._dollyStart=new Rt,this._dollyEnd=new Rt,this._dollyDelta=new Rt,this._dollyDirection=new U,this._mouse=new Rt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Dg.bind(this),this._onPointerDown=Ig.bind(this),this._onPointerUp=Tg.bind(this),this._onContextMenu=Ng.bind(this),this._onMouseWheel=Rg.bind(this),this._onKeyDown=Ug.bind(this),this._onTouchStart=Pg.bind(this),this._onTouchMove=Lg.bind(this),this._onMouseDown=Qg.bind(this),this._onMouseMove=Fg.bind(this),this._interceptControlDown=Gg.bind(this),this._interceptControlUp=Og.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=te.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Bl),this.update(),this.state=te.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Be.copy(e).sub(this.target),Be.applyQuaternion(this._quat),this._spherical.setFromVector3(Be),this.autoRotate&&this.state===te.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=ke:n>Math.PI&&(n-=ke),s<-Math.PI?s+=ke:s>Math.PI&&(s-=ke),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Be.setFromSpherical(this._spherical),Be.applyQuaternion(this._quatInverse),e.copy(this.target).add(Be),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Be.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new U(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let A=new U(this._mouse.x,this._mouse.y,0);A.unproject(this.object),this.object.position.sub(A).add(a),this.object.updateMatrixWorld(),o=Be.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Go.origin.copy(this.object.position),Go.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Go.direction))<bg?this.object.lookAt(this.target):(wl.setFromNormalAndCoplanarPoint(this.object.up,this.target),Go.intersectPlane(wl,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>gA||8*(1-this._lastQuaternion.dot(this.object.quaternion))>gA||this._lastTargetPosition.distanceToSquared(this.target)>gA?(this.dispatchEvent(Bl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ke/60*this.autoRotateSpeed*t:ke/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Be.setFromMatrixColumn(e,0),Be.multiplyScalar(-t),this._panOffset.add(Be)}_panUp(t,e){this.screenSpacePanning===!0?Be.setFromMatrixColumn(e,1):(Be.setFromMatrixColumn(e,0),Be.crossVectors(this.object.up,Be)),Be.multiplyScalar(t),this._panOffset.add(Be)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Be.copy(s).sub(this.target);let r=Be.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Rt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Ig(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Dg(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Tg(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Cl),this.state=te.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Qg(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Jn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=te.DOLLY;break;case Jn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=te.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=te.ROTATE}break;case Jn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=te.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=te.PAN}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(mA)}function Fg(i){switch(this.state){case te.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case te.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case te.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Rg(i){this.enabled===!1||this.enableZoom===!1||this.state!==te.NONE||(i.preventDefault(),this.dispatchEvent(mA),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Cl))}function Ug(i){this.enabled!==!1&&this._handleKeyDown(i)}function Pg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Kn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=te.TOUCH_ROTATE;break;case Kn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=te.TOUCH_PAN;break;default:this.state=te.NONE}break;case 2:switch(this.touches.TWO){case Kn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=te.TOUCH_DOLLY_PAN;break;case Kn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=te.TOUCH_DOLLY_ROTATE;break;default:this.state=te.NONE}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(mA)}function Lg(i){switch(this._trackPointer(i),this.state){case te.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case te.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case te.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case te.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=te.NONE}}function Ng(i){this.enabled!==!1&&i.preventDefault()}function Gg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Og(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function El(i,t,e){let n=new U;return{add(s,r){let o=document.createElement("span");return o.className=`al-lab ${s}`,o.innerHTML=r,i.appendChild(o),o},place(s,r,o=0){n.copy(r).project(e);let a=t.clientWidth,c=t.clientHeight,A=n.z>1||Math.abs(n.x)>1.1||Math.abs(n.y)>1.1;s.style.opacity=A?0:1;let u=s.offsetWidth/2+6,f=Math.min(a-u,Math.max(u,(n.x*.5+.5)*a));s.style.transform=`translate(${f}px, ${(-n.y*.5+.5)*c+o}px) translate(-50%, -50%)`}}}function _l(i,t,e={}){let n=()=>{let s=document.querySelector(i);if(!s)return;let r=null,o=!1,a=()=>(o||(o=!0,r=t(s)),r),c=new IntersectionObserver(A=>{A[0].isIntersecting&&(c.disconnect(),a())},{rootMargin:"600px"});c.observe(s);for(let[A,u]of Object.entries(e))document.querySelectorAll(`[data-lab-${A}]`).forEach(f=>f.addEventListener("click",h=>{let p=a();if(!p)return;h.preventDefault(),s.scrollIntoView({behavior:"smooth",block:"center"});let B=f.getAttribute(`data-lab-${A}`),M=()=>p.ready()?u(p,B):setTimeout(M,150);M()}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n):n()}var T0=Math.PI/180;function Ml(i,t,e){let[n,s,r,o]=t,a=new Float64Array(e*e);for(let c=0;c<e;c++)for(let A=0;A<e;A++)a[c*e+A]=i(n+(r-n)*A/(e-1),s+(o-s)*c/(e-1));return{n:e,box:t,z:a}}function BA(i,t){let{n:e,box:[n,s,r,o],z:a}=i,c=(r-n)/(e-1),A=(o-s)/(e-1),u=(v,m)=>a[m*e+v]-t,f=(v,m)=>u(v,m)>0,h=new Map,p=v=>{let m=h.get(v);if(m)return m;let E=v>>1,_=E%e,b=(E-_)/e,w,x,I,D,N,H;v&1?(w=u(_,b),x=u(_,b+1),I=_,D=b,N=_,H=b+1):(w=u(_,b),x=u(_+1,b),I=_,D=b,N=_+1,H=b);let Q=w/(w-x);return m=[n+(I+(N-I)*Q)*c,s+(D+(H-D)*Q)*A],h.set(v,m),m},B=[];for(let v=0;v<e-1;v++)for(let m=0;m<e-1;m++){let E=(f(m,v)?1:0)|(f(m+1,v)?2:0)|(f(m+1,v+1)?4:0)|(f(m,v+1)?8:0);if(E===0||E===15)continue;let _=2*(v*e+m),b=2*((v+1)*e+m),w=2*(v*e+m)+1,x=2*(v*e+m+1)+1,I=(D,N)=>B.push([D,N]);switch(E){case 1:case 14:I(w,_);break;case 2:case 13:I(_,x);break;case 3:case 12:I(w,x);break;case 4:case 11:I(x,b);break;case 6:case 9:I(_,b);break;case 7:case 8:I(w,b);break;case 5:case 10:{let D=(u(m,v)+u(m+1,v)+u(m+1,v+1)+u(m,v+1))/4>0;E===5===D?(I(w,b),I(_,x)):(I(w,_),I(x,b));break}default:break}}let M=new Map;B.forEach(([v,m],E)=>{for(let _ of[v,m]){let b=M.get(_);b?b.push(E):M.set(_,[E])}});let d=new Uint8Array(B.length),l=[],y=(v,m)=>B[v][0]===m?B[v][1]:B[v][0];for(let v=0;v<B.length;v++){if(d[v])continue;d[v]=1;let m=[B[v][0],B[v][1]];for(let E of[1,0])for(;;){let _=E?m[m.length-1]:m[0],b=(M.get(_)||[]).find(x=>!d[x]);if(b==null)break;d[b]=1;let w=y(b,_);if(E?m.push(w):m.unshift(w),w===(E?m[0]:m[m.length-1]))break}l.push(m.map(p))}return l}var Ki=[[-200,[24,62,118]],[-.01,[36,88,150]],[0,[150,196,136]],[150,[184,212,146]],[350,[222,214,156]],[600,[214,182,134]],[850,[190,150,116]],[1100,[236,228,218]]];function xl(i){for(let t=1;t<Ki.length;t++)if(i<=Ki[t][0]){let[e,n]=Ki[t-1],[s,r]=Ki[t],o=Math.max(0,Math.min(1,(i-e)/(s-e)));return[0,1,2].map(a=>Math.round(n[a]+(r[a]-n[a])*o))}return Ki[Ki.length-1][1]}function yl({M:i,n:t=160,ny:e=t,exag:n=1.5,color:s=xl,sea:r=-80}={}){let[o,a,c,A]=i.box,u=n/1e3,f=(it,st,It)=>new U(it,It*u,-st),h=it=>[it.x,-it.z],p=new gn,B=Ml(i.h,i.box,t+1),M=new Vn(c-o,A-a,t,e);M.rotateX(-Math.PI/2);let d=M.getAttribute("position"),l=new Float32Array(d.count*3);for(let it=0;it<d.count;it++){let st=d.getX(it)+(o+c)/2,It=-d.getZ(it)+(a+A)/2,wt=i.h(st,It);d.setXYZ(it,st,Math.max(wt,r)*u,-It);let at=wt<0?[70,110,150]:s(wt);l[3*it]=at[0]/255,l[3*it+1]=at[1]/255,l[3*it+2]=at[2]/255}M.setAttribute("color",new pe(l,3)),M.computeVertexNormals(),M.boundingSphere=new Bn(new U,Math.max(10,Math.hypot(c-o,A-a)/2+1));let y=new _e(M,new ms({vertexColors:!0}));p.add(y);let v=-.35,m=[],E=[],_=it=>{let st=m.length/3;it.forEach(([It,wt])=>{let at=Math.max(i.h(It,wt),r)*u;m.push(It,at,-wt,It,v,-wt)});for(let It=0;It+1<it.length;It++){let wt=st+2*It;E.push(wt,wt+1,wt+2,wt+1,wt+3,wt+2)}},b=80,w=(it,st,It,wt)=>Array.from({length:b+1},(at,L)=>[it+(It-it)*L/b,st+(wt-st)*L/b]);_(w(o,a,c,a)),_(w(c,a,c,A)),_(w(c,A,o,A)),_(w(o,A,o,a));let x=new xe;x.setAttribute("position",new pe(new Float32Array(m),3)),x.setIndex(E);let I=new _e(x,new an({color:7031343,side:Te}));p.add(I);let D=new _e(new Vn(c-o,A-a),new an({color:4165600,transparent:!0,opacity:.42,depthWrite:!1,side:Te}));D.rotateX(-Math.PI/2),D.renderOrder=2,p.add(D);let N=new xe;N.setAttribute("position",new pe(new Float32Array(72),3));let H=new _e(N,new an({color:3108789,transparent:!0,opacity:.35,depthWrite:!1,side:Te}));p.add(H);function Q(it){let st=it*u;D.position.y=st;let It=[[o,-a],[c,-a],[c,-A],[o,-A]],wt=N.getAttribute("position");for(let at=0;at<4;at++){let[L,z]=It[at],[ot,Et]=It[(at+1)%4],ct=at*6;[[L,v,z],[ot,v,Et],[ot,st,Et],[L,v,z],[ot,st,Et],[L,st,z]].forEach((ie,Lt)=>wt.setXYZ(ct+Lt,ie[0],ie[1],ie[2]))}wt.needsUpdate=!0,N.computeBoundingSphere()}Q(0);let V=.032,Z=new an({color:16765806,side:Te,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),J=new an({color:16777215,side:Te,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),et=new gn;p.add(et);let W=new Map,$=it=>{let st=W.get(it);if(!st){let It=[],wt=[],at=it*u+.012;for(let L of BA(B,it))for(let z=0;z+1<L.length;z++){let[ot,Et]=L[z],[ct,Pt]=L[z+1],ie=ct-ot,Lt=-(Pt-Et),Wt=Math.hypot(ie,Lt)||1,Kt=-Lt/Wt*V/2,Gt=ie/Wt*V/2,Xt=It.length/3;It.push(ot+Kt,at,-Et+Gt,ot-Kt,at,-Et-Gt,ct+Kt,at,-Pt+Gt,ct-Kt,at,-Pt-Gt),wt.push(Xt,Xt+1,Xt+2,Xt+1,Xt+3,Xt+2)}st=new xe,st.setAttribute("position",new pe(new Float32Array(It),3)),st.setIndex(wt),st.boundingSphere=new Bn(new U,10),W.set(it,st)}return st};function tt(it,st){et.clear();for(let It of it){let wt=new _e($(It),It===st?J:Z);wt.renderOrder=3,et.add(wt)}}return{group:p,mesh:y,grid:B,toWorld:f,fromWorld:h,setWater:Q,setContours:tt,k:u,show(it,st){({water:[D,H],lines:[et],skirt:[I]})[it].forEach(It=>{It.visible=st})},heightAt:(it,st)=>i.h(it,st)}}var vl={meta:{source:"\u5167\u653F\u90E8 2026\u5E74\u7248\u5168\u81FA\u706320\u516C\u5C3A\u7DB2\u683C\u6578\u503C\u5730\u5F62\u6A21\u578BDTM\u8CC7\u6599\uFF08DEMg_tawiwan_20m_20260228_g14_update\uFF09",dataset:"https://data.gov.tw/dataset/178729",license:"\u653F\u5E9C\u8CC7\u6599\u958B\u653E\u6388\u6B0A\u689D\u6B3E\uFF0D\u7B2C1\u7248 Open Government Data License, version 1.0 (https://data.gov.tw/license)",attribution:"\u5167\u653F\u90E8 2026\u5E74\u7248\u5168\u81FA\u706320\u516C\u5C3A\u7DB2\u683C\u6578\u503C\u5730\u5F62\u6A21\u578BDTM\u8CC7\u6599 \u6B64\u958B\u653E\u8CC7\u6599\u4F9D\u653F\u5E9C\u8CC7\u6599\u958B\u653E\u6388\u6B0A\u689D\u6B3E (Open Government Data License) \u9032\u884C\u516C\u773E\u91CB\u51FA\uFF0C\u4F7F\u7528\u8005\u65BC\u9075\u5B88\u672C\u689D\u6B3E\u5404\u9805\u898F\u5B9A\u4E4B\u524D\u63D0\u4E0B\uFF0C\u5F97\u5229\u7528\u4E4B\u3002\u653F\u5E9C\u8CC7\u6599\u958B\u653E\u6388\u6B0A\u689D\u6B3E\uFF1Ahttps://data.gov.tw/license",changes:"Averaged 50 \xD7 50 cells (20 m) into 1 km cells; cells with less than half valid data are treated as sea; a small area with no data in the northern mountains was filled by averaging the squares around it.",filled:141,crs:"TWD97 / TM2 (EPSG:3826), km",cell:1,e0:150.98,n0:2422.16,nx:200,ny:377},h:"/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xEAFwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8oAC0A////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////GwD//////////////////////////zMAUQD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8eACsA////////////////////////LwBiAEEA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////x4ANwAzAB0A////////////////LAAhAFIATAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8vAFoAOgAWAP///////xIADQAWADgAdgBwADAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////KQBhADUAKAAOAP//NgAoAEYAdQCSALsAZgAmAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ysAWgAlAB8AHgA7AIcAgABcAKoA6ADtAIAANAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yoAGgATABQAUACzAJQAlQCJALIAAAGiACoA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////JAAwABIAEAAXAHUAzACMAL4AWQCGAHAARAAWAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0gALwASABAAHACQALkAdQBPADQAUAASABoAJwBRADIA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////QwBOACkADwATAB0AUABaAGoAVQArAB0AFgBMAJUAEgGKAIYA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9NAH4AQwAZAA4AEwAiAFUAsQCdAFUALgA3ACQALwA8AM8AMwHRAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2QAEwErAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////cgBmADIAEAAPABYAQADCAGUBKgGmAHcAYwBgAE0AJgBPAKoAsQBuAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////iAAtAQgBuQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////3wASgAgAAoADwAbAD0AvgBaAbQBdQHsAM0AdwA9ADIAcAD9APoA1QBUAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0UAMABAAMkAmgBWAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8iACMAGwAIAAwAIQBZAHIAugCNATUC4AHrAFoAOgBBAIwAKAE3AeoAhgBDAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////QgABAbkAugBYAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8XABcACAANACAAhgAEAcwAdgEEAo8B3ABtAE8AoAB6ANUAMwH0AG4A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////81APAAeQFNASQBLQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////CwAFAAcAEwAzAFMA2QAFAQkBLQHiAJIAbACdACYB8QAOAfcAmwCDAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////rwANAaUBGgF5AP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAAHAC4AagBVAJcAmQCcAN4A3QCKAF8AwACTAWEBOwHaAOkAhQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0IBhgFnAR0BnQAsAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wUACgAUAE8AagCFAHkAmwARAYsB9AB4AJAANgGOAS0B8wArAYIA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VgDjAPQAqgDYACIBVwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwAEABcAMQApAGEAzgCbAJ0AFwEFAm8BsgCVAMUANgFTASsBIQFsAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////00A//8LABkARwBCADMA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAA6AM8AaQBMAF4AfwABARIBpgGeAdkAoQAKAcEAHQFFARUBcQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////SQADAZMAQAA6AJ8ADAFZAbgBWgENAbYAzQBxAIcA9QDjALAAOwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8bAJgAMQG7AMgAdQDxACoB3wDyADcBVgH/AO8AsQCCAEEALQAbAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////IADmANEB8wCuAIkAewCsAJUAEAF0ATEBKgEuAXgAXwBjAD4A/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0AASwFnAlIBqwDFAGsAbgCzABIBfAFuAXkBMgGgAMYAUQAcAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////LgCGADkBRgICAv0AVAERAZUAvwDgAIcBsQGaAQ0BCQH1AHcATQBRAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////1AA5gB9AY4CuAIyAXMBNAGpAEMBNQEIAS4BaQGGAWUBJgFnAGAAdAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////94AEkBogGzAsMCgwFOAREByABrAc0BpgFGAZIBwQFAAc4AoAB2ADcA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////lABhAUUCbAOsAsIB4gFbAcQAIQFwAbMBhwE7AZ8BewEUAdoAgQA2AP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9IAAgB1AFwAlEDpwJJAj4CugFFAf8AfwEAAt4BUAFRAWMBGQHbAKUAWQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////LQCwALsBdwL9AhICGQK+AgECmQGgATgBzwEbArgBXAEuAfAAhABQAEcA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////x8AhgDyAGkBQgJxAWYBEAIPAkgCMAKGAZcBugGmAZ4BOQHbAGgAKQAqAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////CAAYAD0AfADHABkB4ADRAF4BfgFFAkMCJAIcAucBtAGPATkBDwGUAGcAUQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////NgAgAEUARQBsAIMAgQCnACABLAFTAeIB6wEvAuoBuAFlAUoBEgGyAJAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9kAJsATACyALYAegBKASMB+wChANoA0QDvADwBWQFtAYgBUwFdAVoB1QBIAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////TwDWALYACQFcAdUA2QCIAdYBGwFkAXsBKwHSAVYBSAFoAWgBcgFNAdYAmwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9SAHEAhAC3APcAwQGqAR4BqAFYAr4BUQHlATUB5QHPAX0BVAFmAYsBNgHoAO8AewD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xUAsQBeAUEB+AAzAbcBhgGQAQoChQK6AcIBVQLrAbUBlQG0AaQBeQFdAQkBmgBqAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BgAwAGoAIAEjAVwBbwEXAUQBBAK9Ar8CowKeAuYC0wJaAuYB4gGIAQ4BxQCQAIUAcAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wwALABCAEwAagCEAIYA3gCxAUECyAFVAnMCMQKqAsMCpAI4AoQB9QBhARMBjABLAC8A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////93AAUB2gBuAK4A6QCSALwA4gANASsBpwGQAcIBAAKAAvgBrwFIAdgAwwC/AOEAtQBnAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xAA5AX0B5wCxAIkB3QCgAEIBzwGEAa4BpwGlAfABlAIuAkwByQAVAcYAZAB0AJgAQAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9EAHMA0gAXAVwB6wCIASQCvQHiAMoBWQI2AmsC6AKaAuMBagEeAaQAagB2AEgALgA7ABcA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////KgCmAB0BTQEQAvMBxAH9AhQCRwEZAYMCrQLYAiYDPAJ9AS0BIAECASwB5gCMAJoAcgAuAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xoAhQAIAVIBvgGcAnAC2AIVAykCNAGeAYMCBAOXA/EC+QEHAlMBmwFrAdsAwQDvAIQAIwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////HgB9AIYApQBUAYoBYQJWA6EDJwM1AoMBXgEQAkUC0QIbA+cCQwL3ASoCzwFUAV0B3wCUAGAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8cAP////////////////////////////////////////////////////////////////////8IADcAAAHcAAQB9ABwASEC/AKgA9ICpAIYAsEBcgJrAlkCVwOTAtYBhwHZAb0BEgHxAOsAxABbAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////MAAQAP///////////////////////////////////////////////////////////////wYAEABRAFcBgQGpAeABAAKbAmEDZgTYA1ADKwKcApwDzwO9AhgDFAKWATYBVgGLAUkBpgBwAD0ARwD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xsAMAAoAP//////////////////////////////////////////////////////////BQALAB0AjgC/ANEA8ABIAYABSgLvAkYEwgNKA24C7QK7AzME4AOfA+8CHgL8AUUB8gDyAAkBzAA7ABwAGgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ygAEQD//////////////////////////////////////////////////////////wgAEAAYADQAVwA6AZYBPwKwArcCOQNpBKAE7AMdA1ADtwT9A3sD9wK2AjQCQAIJAqEBCwGXAMcAmgAxACkA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAAJABMAMAB3AIQAsQEiAvEBLQM+BKsEIwRMBMcEZgSdBJ8EfwP9AvUBPAIEAkUBCQEFAUIBqgBYAEYASQAnAAwA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAQACQAXAD4A4ACkALMANgFqAYkCZQMYBBkDygO1BMkEPgQiA18CSgLbAWUBVgFxAeMBbAGvADkBywDdABUBzgCAAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIABQAHAAwAGAB/AC0BJgGaAPYAAwL5AdkCIgOCApwDcQPwA6UEdAMRA0ICRwLPAmoCBQJ0AfYAJwGlAWMBFAHBAHUAPgD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgAFAAkADgARAB4AYwCPABcB+QDzAIMBTgHoAeMBpAKfAiMDagRuBVwEFwMBA+YD8QK/AeABaQF7AeMBswFiAS4BTgHTALcA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQADAAYACgAOABUAGQAbACkAcAD0ADwBAgEeAdMBwQGTATQCDwI8A04EaQXEBPUDLwR1A3EC4wJWAqYBZQI3AlcCMgIvAgAClwG3AbAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAIABQAKAA8AFgAdACMAJQA5AJUAawGnAeoBuwESA7EC7QGwAhUDwwN3BOYFeAVEBfgEegQWBHYDvgJHAs8CvgKOAmUCZgK1ATUBSAHKAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAAAAgADAAYADAATABwAJgAvAEMASQCxAH8B5QF6AvACiwNqAwADqgPGA7wDZgSkBGEEsgQnBZcFHgUqBKQDWQP8AgsDywKgAp0CLwKjAScBpQBUAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAQABAAEABQAJAA4AFgAfACoANQBBAF0AnQD/AHoB/gHDAtgD6QIVAkICMwImAr8CSgM7BNUEaQUvBfkDngM0A6YDAwNeAmoCMgI9ApMCxgJZAr4B6gD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAQABAAEAAgADAAYACgAQABgAIQArADYAQABHAFwAfgA/AREB3QFrAqABgQG3AY0BdgJ2AoQCCAPWAxoFNgUpBKwCHALTAu4C3wFrAfcBUwErApACjQIeAj8BXwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAEAAAABAAEAAQABAAMABAAGAAoADwAWAB8AKQAyAEIAeACbANEAywDIAOYANgE7AfgB1QL3AjMEsgToA60DngTPBPIDEQOdAt8BiQG+AW0BJAHYAAMB3gGnAXMBHgFIAaIA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQAAAAEAAQABAAEAAgAEAAUACAALAA4AFAAcACQAKgA3AHEA0QChAbsBewHGAYMBIAFSAYMBIALcA6kFIgW7BA4FFwVuBCIDNwLaAVYBiQGYASoCVQHGAKwAygDdAOkAoQCDAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgABAAEAAQACAAMAAgACAAIABQAGAAgACQAMABEAFwAdACEAMQCoAHYBogHeAdkBDwM2AvsBnwJBApoBCgO9BGgFmwR6A/wCqQKmAr4CtALMAQMCAgPgAtYBfAFsARcBzABLADcALQAkAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAQACAAIAAQACAAIAAwAEAAUABwAKAAwADwASABcAGwAfADUAnwAPAfwBpgIhAlcDwQKwAukDqgLUAc8C9APABOEDjgOyAwYECwTkAwED5QKzApcDZQN9AlQCXQLlAS4BuAD3AAgBwgD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgACAAAAAQACAAEAAQABAAEAAgACAAMABQAHAAkADAAPABEAFgAbACEAJgA4AHkAGAHYAfICGQOpA1YEuwN5BPYCkwKJAnQEqAWHBHYEIgXWBCEF2wQbBP8DJAP6AwEEJQMwAsQBYAEBAS4BxgFxAeoA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8DAAMAAwAAAAEAAgABAAIAAgACAAMAAwAFAAYACAALAA0AEAAUABoAHwAnAC0AOAB6AP8AFALdAZ0CqgPUBCIFdgSsAxkEFQOlA6UEWAUkBQ8GKwaxBroFRgTiAlUCawJlA74DCAPuAn8CjAF8AXcC9gESAf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQAAwADAAQAAQADAAMAAgACAAIAAgADAAQABQAHAAkACwAPABIAFwAeACUAKwAyADoAhwA4AU4BlQE7AwIEfwTZBFYFHAVwBIMDTQS6BOAF8AV8BoYGqAZJBWgE/AJSApwBiAI3A2AC+wInA2QC8AHsAuYBUwGWAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wgABQAEAAUABAADAAEABAADAAMAAgACAAMAAwAFAAUABwAKAAwADwATABkAIQAqADIAOQA+AFwAogAwAZcCXwMaA7MChwOMBVEFHAWxBMUFiQbKBhAG5QWdBVMFuwS8A+ECOgKmAXkBuAGjAaYB0AE3Ar0CWwJeAg4CsAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BwASABYACgAFAAUAAwABAAQABAAEAAMAAwADAAQABQAHAAkACwAOABEAFQAbACMALAA2AEAASQBXAKkAOwE5AmUCjALwAUYDuwOYA+MDWwQeBS4HDwaeBbYGkwYLBgAFCgSTA6MCpQFXAQoB6wDyAOAACAEaAVYB3QH4ASYB//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8EAAMA//8FAAcACQAvAFMAEwAGAAQAAwAEAAYABQAEAAMAAwAEAAUABgAIAAsADgASABYAGwAjACsANQBAAEoAVgBtAIwAsQAeAToBFwG/AbQB1QGGAj8DaAUVB98FWARMBR4F3gM8A1ACFQLaAW4BPwKpAYcBogG7ARkBCwGFAHgAwwBiABwA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQABAAEAAQAAwAEAAYAEABbADIACQAGAAUAAwAHAAYABQAEAAQABAAFAAYACAALAA0AEAAUABoAIQApADIAPABFAG0A+gBhAQcB0ABZAaQBQAESAskChwTEA8MFjAdeBkYEhQOJA4wDzQJ7AzkDGwJTAhkDZQIiAsYCZwJhAk8CgQGmAIkAXgA6AP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQABAABAAEABAAFAAcAHQAwABQABwAHAAUABQAHAAYABQAGAAYABQAHAAgACgAMAA8AEwAYAB4AJgAtADQAOgB0AAYB2QEAAYUBxgIyA44C2AK6BCEGLQXQBqsGrQW0BMIDFQWYBSsFAgWXAwkDswLFAz0DNwMyA9wCKgNKA70CqgEHAkUBpgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAEAAQACAAUABgAJABwAPwApAAwACAAIAAQACgAJAAgABwAHAAcABgAIAAoADAAPABMAFgAcACEAJwAsADAAQQCDACwB0gDXAQEDtQKsAqUDCAX9BcEG4gcFBz8HvgW+BDkGQQcqBv0ECAQyA4YDVwQEBJoD/wJHAmQCaQOAAjgCqAJ/AVEBkAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgACAAMABAAGAAcADAAwAEkAGAALAAgACQAGAAgACwAKAAkACAAHAAcACAAJAAsADgAQABQAGAAcACEAJAAmADAAlABvAf8AJgFYAUsBxQFBAiwDNgQDBnYI+QgSCIwGVwaFBh8GXgS8A/gD1QLUAj8DcwPqAkcC4AFAAjMDDAMqA3ECTgJPAtIA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAEAAwAEAAUABwAIAA8AKwBDACUADAAJAAoABwAIAAoACgALAAkACAAJAAoACgALAAoADgASABYAGAAdAB0AIAAyAJQAJQF9AV4BPwF8Ac0CiQMzBGIFBQeRCRoKWQjGBpgFnwTLBLkDeAJaAgwClwEWAuIBawGKAX0BsgEuAoQCJgMiAwYDgwI5ATgA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAAgADAAMABQAGAAgACQAOACUAIQAeAAsACgAKAAgACQALAAsADQAMAAoACgALAAsADAAMAAwAEAATABYAGQAZAB8AKwBQACABCgIWAogBZQGvAf0C6wR/BVYGZQiQCcIHHgZ0BKUD1wKVAvgB0wKmAocBiQFjAXUBKQH5AOAAQAHkAdgCAwKYAvUBtAF+AAgA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAIAAgADAAYABwAIAAoAFgAUABIAEAALAAsACwAIAAsACwAMAA4ADgAMAAsACwAMAA0ADgAPAA8AEQAUABYAGQAdAC0AjQAXAXkCqQI4Am4C+wEFA6EDAwTCBXwIVQhkBo4F9wT3A5UC+wFKAnYD0ALcAU4CJwKnAuEBAAI8AQQBEQENASIBIwHOAK0AfgAWAAgA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAgACAAMABQAHAAgACQALAB0AKAAeAA8ADAAMAA0ACQAMAAwADQAOAA8ADQANAAwADgAOAA8AEQASABIAFwAZABwAIQA0ANUAJwI0A3ADWgNgA2ACHwKiAmcDogRxBrIIVQjcBqsFUgTdAoACUAOxAu8BYgLJAuICbwPAAnQCnwHCAUICXQEYAaUAdgBvADUAFwAKAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwABAAEAAwAEAAYACAAKAAoADAAlADAAGwANAA0ADQANAAoADQANAA4ADwAQAA4ADgAOABAAEAARABMAFQAUABYAGwAfACUARQAPAS8CTQKYAoUCJQOsAxMDLwM9BKUEQgbeCUYJawftBb4EJwO5Ak8DzQJtApQCpwMVA90DvAOEAk8CCwI5A6sCfwKJASkBUQFDAWEAEQD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8EAAAAAQACAAMABQAGAAgACgALAAwAFgAbABAADgAOAA4ADQALAA4ADgAQABAAEQAPAA8AEAARABMAEwAVABgAGAAYABwAIgApADQAsQAQAUEBiAFUAUYCvQNWBNwDswVmBgIIcQqmCdAHuQZIBa8D5QJuBDYEtgK9AtADkAOeBCwEvAIxA5UCWQMRBB4DhgKEAVYCkwHeACYA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////DAAJAAEAAgADAAUABgAIAAoADAAMAA8AEQAPAA4ADwAPAA4ACwAPAA8AEAASABIAEgAQABEAEwAUABYAGAAaABsAHQAdACIAKgAyAFIAfADQACYBDAKdAt0DggWLBXQGwAWAB8AJ5wpRCVMHXQWcA0YD9AQuBOYCawPbA1QEDAWVBIYDDgR3A6QDjgQKBKkCAgLwAgICDQFOAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////1gAUAAEAAIAAwAFAAYACQAKAAwADgAOAA4ADwAQABAAEAAOAAwAEQAQABEAEwATABQAEgATABMAFQAYABoAHQAgACEAIwAmACsAQgCSANcALAH7AVgD/QNEBbsFSwVdBbME3wVGCIMKpgjQBj8FzAOFA/UE6gSWA+ADCwXrBBsFIwR8A/ECeQMNBMUEWwSgA6gCFwP9ARcBgABjAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////YADyAEgAAgADAAQABQAHAAkACgAOABEADwAOABAAEQASABMADwAMABIAEQASABUAFgAVABQAFgAXABcAGQAcAB8AIwAmACcAQgBIADwA6wBcAfgAVwH6ArMD2gQPBQgE0gNiBHcGkQhGCG8ILgedBZIELwR8BVgFIATbBBgFZgR9BFYDcwNXAvcCIQPZAwcEXgRtA0EDAgIPARcBsQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////5AA8gAVAAMABAAEAAYABwAJAAwAFAATAA0AEgAVABYAFwAXABAADgASABIAEgAUABcAGAAXABcAGgAaABsAHgAiACYAKgAsAD4AZQBBAM0ADAK9Ac8BBAIgAw0FjgTQAy4D9gRrBvIGugVcBoEHVwb5BboFcgXRBIkEkQSqBJkDRANBAhMCwAG4AT4CjwIGAzQEmANbAzsCwwGwAQQB//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+CAH0AFgAFAAUABgAGAAcACgAWABIAEAAQABsAIgAoACIAHQARABEAEwATABQAFQAXABkAGwAaABsAHQAeACEAJgAqAC4AMgA5AGMAYACtAAEC3AIhAz4DjAQFBVgEMQORAmEEKgU3Bt8EjwRjBzgI1Qa6BfUEswSBBA4E3AN7A1YEeQMkA6oCwQEsAt0BNwJpA5oCZQMNA7oCUQI5AU4A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9VADUADQAHAAcABwAJABQAHgAUABEAHQAwAD4APgAsACIAEgASABUAFAAVABgAGAAZABsAHQAeAB8AIgAlACkALgAzADcAPABYAH8AmQCrAZMC5QNZBLEDOQPSAwQD7QFhA3IDYwRmA1IEBQcACAEHgwa8BZoF2wXPBPsDNgSVBVkFBwSbAkwC1wLQAysCWAHkAYsCcwLYAkACdQHqAEcA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BQAMAAsACwAJAAgACQALAA0ADwAWACEAOwBfAEkAPQAvABsAEgAVABYAFwAZABoAGwAcAB8AIgAkACUAKQAtADIANwA9AEIAWACCAHcAEgFnAsQCxwMNAxIC4QJmArIBvAI1AkICugIVBFUGrAgBCAAH7QV1BrUFrQSfBEQFOgYpBs8EqAOcA7cC8wPtAyACngEqAQoB6QFNAtQBngHIAAsABwD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEABAAPAAwACwALAAsADAANAA8AFgAmADYAXwBmAEMALwAcABEAFQAWABgAGgAcAB0AHgAgACMAJwAqAC0AMQA2ADsAQQBHAE0AawBkAOMAwAFiAuACOALuAYYBPAFpAeEBFAIJA28EiwVoB4gJqwgfBy0HjgZwBZkFvgRKBbsFSgYaBSoELANkA4cEGwT0AmMCOwJmAcQARQETAXUBDwEoAA4ABwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAMADgARACQAIgANAA0ADQASABgAHgArAFgAZgBFAC8AKAAWABMAFwAYABoAHAAfACAAIQAkACgALAAxADUAOgA/AEUASwBSAFkAZQCmAHUBjQLlASABJQFTAeMBSgJvA0cDwAPZBbQG+QiECUEIGAcIB+MGyAY8Bv0EzQURBkoGKAUjBA4ETAQmBYcFIQQcA/oCjQEQAbsAlABLAEgALgAUAAwABgD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQACAAkAEwASADkAEAANAA8AFQAdACIAKgBFAF8AVwBDADIAGQAVABUAGAAaABwAHgAgACMAJQApAC0AMQA3AD0AQgBIAE8AVgBdAGQAkADjAAoB4wAyAU4CiwIXA+wDuQTdBI4F8AZTB3oHwwe4B4gGyQXsBX4GPQbbBewFtwa3BmAGVQUOBYsExQSnBbQE6AOZAlsC4gEaAn4BxABHACwAHwASAA0ACQAGAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAwAEAA4AEAAOAAwADQARABcAHwAxADUAOgByAGMAWABEAB0AGAAVABgAGwAdAB4AIAAiACUAKQAuADIAOAA+AEQASwBRAFgAXwBmAH8AvQC7ACUBggG5A7sDkARtBSMGfQa/BpgFFQYgBmIF9gY1BgEFYwUKBrgG7QaaBiYHiwczB10GgQUwBJwDoARCBLkDuQN8AwkD8gJXAg8BlgBEACoAHQAYABQADgAKAAYA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgACAAMABAAJABIADwAMAA4AEAAUABwATABTAEEAbgB/AGkAQAApABkAFQAaABsAHQAfACAAIgAmACoALgAyADgAPgBEAEoAUQBXAFwAdADAACIBwAEYARACaQOiBKwElQSFBisHDQZ8BNEEqAU7BAEFGgWQBEIF+QWkBlYG4QbJBxMI1AfEBuwE1QPmAjQDpwJMAg4DuAPnAwIEmgIbAmcBlgA+ACwAJgAfABgAEQAMAAcABQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMAAgADAAQACQATAA8ADgARABEAFAAbADYAawBWAHcAYgBVAFoAOAAaABYAGgAeACAAIAAhACMAJgAqAC0AMgA3ADwAQgBIAE8AUQBiAHcA+wCNAWMChAEXAdUBvwNvAywDAAU4BQ4FlgOLAyMEYgOUA7cDCgXTBdUFnwUuBu0GdQcZCBMIUAc1BacDJgPAAhADsAI+AgsCugJnA0gDEgMZAgsBUgA8ADQAKgAgABkAEwANAAkA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////CQAHAAMAAgACAAYADwARABAAEAASABUAGwAlAD8AWQBXAIMAgABwAEIAGwAYABwAHwAhACIAIgAkACYAKgAuADIANwA8AEEARgBKAE4AbABzAPoAZwJrA90CmwGCAQYCEAIuAoYD1QNsA4kCJgJFAkoC0gIYBP4FggWJBPwEdAVeBiQHBAg/CLcHIQYwBZ4E6AMbA6QDxAOsAp4BwgFAAjwDigKnAb8ASgA/ADMAKQAgABoAEwAOAAgABQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////w4ACgAGAAMABAAEAAcADwANAA8AEgAXAB0AIgApADUATgCMAKoAgwBSACEAGwAdAB4AIgAkACQAJQAnACoALQAxADUAOgA/AEQARABJAFAAWgAYAdIBZALTAk4CiwFzAXUBzwGaAvQCHgLXAUkCJQNbA6QCKgN0BP8ETgR8BS8GMgbLBkYHqAd1B8oGBQVPBBsEXQPnA2wE7QLoARICTwH+ASgChAGgAFUASgA9ADEAJwAfABgAEQAPAAkABgD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAAOAA0ABwADAAQABQAGAAkACwAQABEAFgAaACMAKAA6AFQAggCdAH4AVAAhAB0AHgAgACIAJAAlACUAKAAqAC0AMAA0ADgAPAA+AEEARwBOAFQA1gDLANwAagHAAmYDngIJAm0BkAHAAeEBTwI0AwgEygSkAxADVgPJA1oEJAV9BfMFagaGB8UHIgcDB/4F0wTaAxsEyQTPBCUDUQMQA5QBSAENAacAcABfAFMAQwA2ACsAIwAbABQAEgAOAAkABAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEACQAWAAcABAAFAAYABwAIAAoAFAAWABcAHAAkAC0AMABFAFsAswCbAGUAJwAeAB8AIQAjACQAJgAmACkAKwAtADAAMwA1ADgAPQBCAEkAUQBZAHQAEwE4AVgBAQL7Ax4D5QEkAlUCKwLhApUDDgR2BQQFxQP8AiUEBQWNBR8GhAbiBh0HtgcoCB0IqwezBfcEtQRABYYG+AVcBHUDOQKyASUBvgDeAIsAaABUAEUAOQAuACUAHQAYABUAEQALAAUA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAMACQAIAAUABAAFAAYACAAKABEAGAAfACoAMQA+AEIARgBGAHEAggBeADMAGgAfACIAIwAlACcAKQArACwALgAvADEANQA4ADwAQwBJAFIAdwAXASMCPwK7AbYBTAPdAmkCeQM1A3kDDQTVBCcF3AXjBDIERwOTA+oDdQWhBs4GIAYBBiEHVAjuCCYIrQb6BdIFJAaLBukF7ASvA9MC6wK7ARYBywE2AaQAWwBKAD4AMQAoACEAHQAZABIADwAKAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQADAAYACQAIAAcABgAHAAkADQATABwAJAAuAEYAbACJAHMASwBUAKUAjABTABwAGwAbAB8AJAAnACkAKQAqAC4AMgA0ADcAOgA8AEEARgBSAIYAJgGjAnMCZgFtAvkCMAP+AigE2gNNBBAFFAa2BvAFXQVeBNQDiASxAxMF6gWFBTsFdAV7BrgH8wd7B6EHGweEBjoHbAY+BXMEHATBA8gCdAF8AYoCCAIqAXEAYABMADsAMgAoACMAGwAZACkAEAALAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAwAGAAkACQAIAAYABwALAA8AFQAeACcALgA1AEAAcQCRAJQAbwB5AIEATgAqACEAIgAhACAAIQAjACYALAAxADMANwA6AD4AQABDAEYAUgBwAIIBtwKTAWIBcwGYAXECMQPFA8EEEgVyBnYH7Ab0BcYEJgSaBD4FEARoBN8EhQVZBlcG3QYiCOMHUAaJBgIHkgdfBwMGGwWkA4sCNwL2AZcBogK0AtoB7QCJAHAAVQBPAIUAOQAoACEAZwB1ADYAHwAeAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAAQACAAUACwALAAgABwAGAAcACgAQABgAHAAlACoAMgA7AFsAZgDHAM4AcwCGAIsANgAhACMAJAAmACcAJwAnACoAMAA3ADsAPwBCAEUASABMAFwAiAAVAaICIAJ/ARkC7gH4AXkD6AQeBeMF8wbrB8sGBwZABc0EhQU/BSoEaQU3BtQGcQe8B8UHvQg/CKAGhQVzBjIH3AZxB6wG3wT8AjgCnQLJAmADYQJ3AcoAmgB5AGcAmwD4AFwALgBEAKYAkgBYAEAAKAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAwABAAIAAQAGAAsACwAKAAcABQAFAAgAFQBsAC4AKAAxAD8ASgBVAF8AjgAQAb4AeQCWAEcAIQAjACUAJgAoACsALgAtAC0ANgA/AEMASABMAE4AUQBaAIMAAwFWAqwCtgK/AsYBswKNA9gEwwUXB1oH2QfpBuEF7gUnBjQGRgV4BLUFPAdlB7gHEAh0CEAIBAjmBhwFfAXZBUMGbQb/Bj8FhgN4A2UDygP1AuIBZgE/ASQBgQCWAOYA+QBjACwAdADNAIUAiABNACAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAMACAALAAsACgAHAAUABQAJABMAVABWACwALgA1ADkASgBaAGYApwAjAX4AWQA+ACMAJAAmACcAKQArADAANAAzADUAQABJAE0AUQBVAFgAXQCLANEAUQHrAq4DKgMTAiQCLgMEBZ4GzQeICCUHXQbhBoQHggcVBk8FuAQ5BngHRgjSB/QGPAepB0gHiQa/BMkEAQYCBrYFZwYvBm0E+AOuBK4DfwIRAmoCLALLAdAAoQAIAdUAbwA7AHQA1wCIAE0ANAARAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAQAFAAsADgAMAAoACAAFAAUABwAPACEANQA1AC0ANwA+AEMARABPAH8ACgHqAG8AUQAjACQAJQAnACkALAAxADcAOwA8AEAATQBSAFcAXABfAGEAmQA2AUwB6QGbA90DkAJCArID2ATjBJIGwgdHB20HdgiHCIkHYAZcBSMFrgVyBtUHHgjDBjEG8wYMB7YGiQRoBBMFvQR0BSIFOAa0Bc4EUgUMBPMDAANAAyoCVgHWAK0A+ADaALAAQQCOAP4AkgBtAEgA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAAAAAABgANABAADQALAAkABQAFAAYADAAdAKAAdwAtAC8ANQA6AEIATQBYAIoA+gC3AE4AJQAkACUAJwApAC0AMgA4AD8ARQBHAE0AVgBdAGIAZgBoAJgAGAEZAkoCQAPpA4cCbwKyAl0DDgT2BToGDQcMCAMIhgj0B9sG4QX3BQgGIgf8BxwIDgemBQUG0wVyBdQDlARbBA4EVwQABYsFiQUPBLsEdQXpBOoDFgNwArYBAAG7AOsAPAG9AEQAgAD5AM8AjQBaAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8DAAIAAAABAAkADgAQAA4ADQALAAYABQAGAAoAGQDDALIAKQAwADwANgA4ADwASQBcAGwApwB6AC0AJgAkACcAKQAsADEAOAA/AEcAUABQAFUAYABoAG0AcQCQAC4BsgIpAzEERwRGAy0D+AINBMcE0wSRBTsHpAfgBm0IXAi4B/YGewbpBhwIVwj+B9AGWQXGBJgEEwRiA0kETgMEBPIDBwQ4BMsD1AITBKEECwSbA4EDZgKTARIB0wAKAUABBQFjAF8AwAAcAaQAUgAgAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwABAAAAAgAKAA8AEQASAA8ADAAIAAYABwALABYAmQDhADIAKAAuAC0AMwBAAEsAbACFAGMAXAA+ACcAJgAnACkALAAwADYAPQBGAE4AbABnAF8AaQBzAHgAewAIAcoC/gOTBHAEDAQfA3oD1wMGBGEFmgZSByIGhwbgBzIHtgf3B0IHKwhzCIYIIQdNBoYFmwXNBbMF3wMjA6kChwLHAkICUwL+ARwCwgIcA7ECtAJvA/ICeAJmAeYAMAE8AeQAjQBQAKQANwHrAJ8AgAArAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQAAAAIACgARABIAFAARAA8ADgAKAAsADQAVAEgAuAA8ABkAJwA4ADwASABMAFUAcgBaAEgAQQAoACkAJwAoACoALgAzADkAQABFAEwAYwCQAG0AcgB8AIEAuQAlApoCuQLbA2AEJANDA+gDoAQcBiUHuAZSBVsG/wfnBowGRggsCAYIBgiZCBcI4wYwBjcG2wbhBSMFhwTBA54CYAJIAvkCBQN7AscByQF1AZ4BiQEYAu4CEgI7AR0BVwE+AfUAlQBrAEEB+wGJAfUAiQBSADQAGwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAIAAgADAAkAEAAVABcAEwAQABEADwAQABIAFQAdAC0AHAAmAB4AIwA3AEAAPwBTAGAAcgBWAE4AMgApACoAKAArAC0AMAA0ADgAPwBLAHkAngCEAHoAfgCEAKUA+gAlAbIBYwLTAgkEsgSWBasFYwVvBQ0FwASzBggIqwYCBuwGawePB3wINwmfCIsHvQYvB1wH4wbeBd0EBASlAssCywPrA6MDJALjAgMD3QKGAkIBugEIA7oCgQEKATgB6gD3ALoAcgBmAYYCZwKBAeEAmwBlADEAEAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAAgACAAIAAwAFAA0AEwAUABIAEQARABAAEQAUABgAGgAXAB0APAAxACMALgAzAE0AZQB5AGwAaQBrAEIAMAA0ACoAKwAsAC8AMgA2AEkARgBgAMQAjwCNAI0AiQCVAAYB/ABAAakBCAPNA7wEbAXXBIwDWwNnA7kEvgahBxkGWgWuBTwHKwipCFAJYQmJCFIH+AeIB88FvwOBA0ADuwP4AlsE8wQ+BJEC2AL+AxIEiQMNAlYBiAEsAjoBwQCNAHkAcABqAKQASgErAnYDTgJwAegAiABPACMADgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAEAAQACAAQABQAIAAoACgALAA4AEgASABEAEAAQABUAGQAjAEIAOgAuACwAOwBPAFkAVwBPAGoAhQBJADIAcgAyACwALQAvADEANwBZAEoAbQDQAK0AmQClAJMAmQDYAQYC6wCNAZwBtAJdBAYERQPjApEDcQSOBe0GrwbzBbcEKgZlCPgIDwkACfMIvAjLB/wHBAdeBZQDeARdBEoF0QMWBcwFagStA78C8QMBBScErQJfAfYAHgGuAJUAjgCSAI0AcACiACoBxAHwAsIDSwLSAQoBfgBTACIA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgABAAIAAwAEAAUABQAIAAsADQAJAAsACwAQAA0AFwAeACYAIwArAEEASQAxACwAPQBXAEgAQwBkAHgATQAzAFgAuQBZADIAMAAxADUARgBYAJcAKwEBAaoAswCfAJsAnQHFApQB+wALATMCAQPuApACHgNKBJwFLQbEBYMEkwRRBfgG1QhzCGEIFgjIB/YHAAe3ByAH6QUWBHoEeQXqBeMEzgVZBmYFNwT2AkYDpAS/A3wCygEoAfMA1QDGAMYAwgCuAHQAlQD/AHoBNAINA/IC0QIPAusAkQBLABsA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAAgADAAMABAAEAAUABwAOABIAEgAUABEAFwASABYAHQAoADEAKAA/AD8AOgAyADoAOwA5ADoARQBYAGcAQwA2AFIAxgDDAEkANwA3ADsAQgBoANwABwHsALsAyACjAFcBwgLhAnQBLgG1Ad0BugF9AlgEigVMBjsGfQS2A04FxgaHB6cI4QcBB5cGcAanBgkGnQYuBvIE+AP/BGAGrAarBmwGawdnBbQDhAM+BA4FGAR0A3oCugGCARUBWAEAARgBywB5AJcA4QBeAQ8CQAJRApYC/QFuAu8AcgA0AAsA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgACAAIAAwADAAQABAAFAAcADAATABcAGAAWABkAFQAXACAANgA3ADYAMAA0AEMASgBkAE8ASQBEAD0ASQCSAFoAQAA/AEEA0QAyAbgAcwBMAEYAYADaAM0AHQHXAAMBrwBIAQsDdgPOAaYBTAGAATcC1AKUBA0EfwS1BIUDlASZBTIHzwcfCVcIaAe8BvsFigVqBeEFOgUrBTEE9AQjBq8HBwj0BhUIiQYiBf8D8wMkBb8E9ALrAmQC6wEtAlUCigE7AQABmACHANEAKQGKAf4BnwEvAoIC8gKvAfsASwAYAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAAwAEAAQAAwAEAAUABgAIAAsAEQAXABkAGQAcABkAHgAkADEAQgBAAEQAMgA8AFgAjQB3AF0ASwA/AEYAjABoAE8ARwBDAFYANQGJASUB0wCVAGIAngCxADcBFAESAckANQG8ArADdQKXAtYBqQFdAssDqAO7AowC3QKJAz0Fxga9B4cImgiVB7UGHQY8BoAFHAW+BIIEhgTgBCUG/AZ8CHUIkAcBCKUFxQS5BIYFOgYCBXsDAASeA6kCGwO3Ao4BFwHzALUAjACeAOQAbQHnAWYBlAFcASECowIuAhMBQwARAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAMABwAIAAkACQAFAAUACAALAA4AEgAUABgAHAAfACAAKgAvADgASQBTAEgAPABXAIgAxgBrAFEASABDAH8AiwBeAFIASQBNAJUAgQHwAYEBGgGtAMUA1ABtAYEBCgHSAGsBZQNuBF4DlgPyAtMBRAL5AUwCCAKxAkAE9ASVBQYGIQfKCFgIiQetBjAGtQUwBdUE7QTwBJgEugXdBoUHzAjmCHkIvwY7BmgGfAYcBocGfwVkBC4FVQSOA3UDQgLKASQB7gCzAJ4AnACeAC0BqQHPAUABBQFFAX0BOAK6AcoAMAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgADAAcADQARABAADgAFAAkACwAQABIAFgAZABwAIgAlAC4AOwBCAEoAXQBUAEUAWAB6AOcAigBfAE4ASQBbAIYAbABmAFQAUwBmALYAGwH5AGEB7wDjAOsAOwGIAQ4B0wCOAWADdgSDBIwETQOrAewBkwLBAnoCegPJA8YEogXiBjcHQAhRCBwIBQdEB9sGAQZHBewEoQSjBXkFaQbZB7EIhAmbCB8HjQglCFEHSQYnB84GkQUkBg4FNgTXA0EDYwJiAdwAtwCyAKUAowDvAC8B3gGYAUYBPgHuACcC9QFcAa4A/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAgAGABAAFQAVABUABwAIAAsAEAAUABYAGwAfACUAKgAyAEIATgBXAFQAagBeAFUAhgDcAMcAZgBRAFQAZACsAF8AawBbAFwAaACHALMAFgHRAU8BwgDBAPUAmAE3AdkANwHNAb4CDwSVBEcDpQJpAgYEpQK3Ar8EywMjBFMFlAeQBwQIgAhiCA4IaQdTBqIF/ARVBR4FKgbNBiMGBQcwCNYI7AekBzEJoQiBB9wG6Qb5BiIGbAXcA8QCHgN/AtUBVgHeAMcAwgCqAJcA1QAbAU8B5QHkAVgB6QBdAagCBAJ5AXAAEQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAgACAAIABQAQABUAFgAYAAgACAALABAAFAAYABsAHQAoACcAKgA2AEkAPwBSAFkAdABjAHsAqgDvAHgAWABkAJQA5wBhAHgAZgBiAG8AiACuAPoA3gHUAfkAIAGVAfwBbgHbAE4BpQL2AYQCmwNxBPADwAIdBJkC2gPNBf4E4wRPBpYHXQhqCHUJjgm+CLcHuAZ+BW0FeAalBUYGggfLBl0H1wh+CUcIQAi/CawJrggFB9EFOgWPBZUEDwPHAawBVwFCAfwA3gDeAMoArQCcAM4A6gAiAa4BiwH7AK4AkwA7AU0CqwHtAFkA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8DAAEAAgACAAUADwATABUAGAAMAAcACwAPABMAFwAXACAAKAAmAC0AMgA1AFMAVgBpAG0AagBfAIYAxACWAF8AZQDTAPcAYgB0AHoAbABwAIEAmADLAC8BeQFAAX0B9gGQAnYB4gA3AeQCGgPeApMDogR3BIEDPgS9AjAE+gVxBukFSQa9BywJlgkpCrcJTwgwB6kG9gWqBakGGwZmBqUHRAdtB8YIQQm9CKoIVAp3CoUIqwUEBHMEWgQdAy8CbwJ9AjECqwGuAToB4QDIAK8AqgD8AGYBFQFbAdwBQgHfAJ4AhgAlAeMB2AGpACkA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgACAAIAAgAEAA4AEgAWABkAEAAHAAkADQARABUAFgAmADMAKQA1AD8APgBKAFYAcABwAGgAVwBtAG8AiABqAGsA8QCoAGQAcgB/AIMAfAB4AI0AwQAXARUBLgF+AZoB4QEdAe8AOgGvAoUD8gIBBDwFagWwBM8ENQP1ArQEEAdEB0EGwAdACZ8IlwisCa8IfAdNB48G1QUxB+0GyQY9COMHMgjsCMkJuQnDCagKrgnyB+AF/gO7AzkDIwIbAwYEJgQvAykDQwKCAeEAxgCuAK4A8QBNAX4BiAEmAmcB5wDRAJAAgwDYACgBgABeAA8A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAEAAgACAAIAAgALABIAFgAZABIABwAJAAwAEAATABQAIgA1AC0AOQBIAE8ATQBUAF4AawBvAEwAVQBNAFgAcgB2AB8BqABtAHcAhACeAKEAiACIAJQAswDnABcBFQGDAXMBAAH8ACIBvwEGArUCvQPwBOwF4AW6BVgE6QLuA9UFyAcpB9YHrAggB6wHhQjFCLIIYAjDBikGfAY8B6EHQwhcCDIJjAk7Co8KLwoiCVkJ0QdNBTwD7wJkAlMDuQRsBTkF5gNHA+MBRQHvAM0AtAC4ABUBDgFSAcsBRAK+AWkB1wCZAGkAYwBvAJsAbQAWAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQABAAEAAgACAAIABwAQABUAGAAVAAgACQAKAA0AEAASABkALAAhADAAQgBcAFkAYQBlAFwAYABBAEMASwBmAHcAgABFAcgAfAB+AJcAugC8AKoAsQCdAJ8AuQDdADUBewGMAQ4B/QARAW0BoAIoAgoDMwTGBb4G+gXIBOYCqANhBNQFwgcZCOkHpAbUBv4HtgncCXcILAc7B/wG5gZCB60HJAkyCrUJ3AkACt4I7QcoCLYGgQU9BKEDngLBAxQFLwbMBDoDPAKzATkB9QDLALgAvwAfAVQBUwE9AvkCuQEvAdYAowCCAGkAUgDnAG8BQwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAAAAQABAAEAAgADAAUADQASABYAFwAJAAkACgAMAA4AEAAWACMAHQAmADkARwBRAGwAfQBgAEcANwA6AE8AXQBqAGoALAEpAcEAtQCjALkA3QDiANYAqQCiAOwAiQFBAb4BuwFoAScBOgE5AbsBwgKEAkMDvgS8BaIFGQRKA0IDrwRbBT0FhQUcBpEGJgbpB0gJVAlsCNcHgwhNCKIHjQeiCAcJggqdCZQJrQjwB0wHngaZBkEFUAQxA+kCbwPdBCMG/wSKBEUDAALZATIByQC/AMMAGQGNAXMBJQJPA2IC3gE6AegAmQBdAIUAmwHwAaAAFAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAQAAAAAAAQABAAIAAwADAAcADQAUABgADwAJAAoACwANABAAFQAaABoAJwA4AD4AWgBnAGsAVgBLADYAPgBMAEkAWQBWAL0AnwGjAU0B9ADfAPsA6gC1AKwAzAATAdIBCALlAdkBpgFnAXQBRAFWAl8CQgP0AjcD0QMVBZcEOgROAyQDBQTkA7cEOQbTBfkFFgcMCEEJ/gh9Cf0JOwlzCDEIXAnBCSUKcAl2CWYICwdSBgsFigTvA/oDAQX1A/kD4gSBBiwGMAVQAykDiwJ8AdkAxwDHAA4BcgF6Ac0B5QLbAsABLwHjAKQAZQCTAEIBLgI9ATEA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAQABAAEAAAABAAEAAQACAAIAAwADAAYADgARABAACgAKAAoACwAMABEAFAAcACkAMQA+AFAAXABfAEkAOwArAEAARQBBAEcAVQB3AOIAqgE1ApABJgEyAQMBugDQAOMAKgHkAfACuALcARcC2AF1ATsBcQJuA5kD+gMlA20DpQSzBSoFjgNKAw8DpwO6BJ0FNwV8Br4HsAjtCSkKHQvPClsJsQhJCSYK9wlKCegIxgksCYsIEwf5BbIFsQQrBVQGDAUbBWAFMAYUBjgG7wRABNECBAIQAdgAzQDfACUBVgF1AUcCEQMSAq0B+gCzAIAAmQDfALQBtQFOAA4A/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAAAAAAAAAAgACAAIAAwABAAEAAgACAAIAAwAEAAgACwAMAAgACAAJAAkACgANABEAGgAlAC0APQBOAE0AVwBAADIALgAzADkAPABQAFcAcwCtACoByQFYArEBGAHAAOMADAELAUIBAwLiAgwDXwIvAosCtwE+AfUBHwPpA88ElASdAysEkAXmBOUDuwMqA8sDyQN2BMoFCQYHCA8KiAoAC2YLpAoXCugJAwp4CoAKYQmPCCIJ8AnfCIIHSwfOBk4FiwZmB9AGjgYMBrIFqQV2BtYFuQNyAn8BGAHjANUA1wAZAXUBcAGtAZUCvAL5AWUB+gCeAI0AugCwAQMCuAAUAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAgAAAAEAAQABAAEAAgACAAIAAgACAAIAAgACAAMAAwAEAAUABgAGAAcACAAJAAoADAARABgAIwA0ADwARQBNAE4AJgAnADkAPAA1ADsASgBdAG8AhwDJADYBAAJbAmAB2ADiABMBSgFEAZIB/wGPAiMDpAJKA2ICdwFwAV4CBAO4AxkFqATUA9YE9gShBD8EpANyA8oERAV2BUkGWAh5CRsL0wssDF4LXguQCqwJrgqxCvMJiQjTCA8K6ghXCPcH9QemBpgHAgjTBtIFawV0BeYEewWYBXIDdAICAkwB4gDfAOAA5AAeASwBbQH3AUADUwKNARAB0QDNAKAAsgGTAc8AMwD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAEAAQABAAEAAQABAAIAAgACAAIAAwADAAMAAwADAAMABAAEAAUABgAGAAcACAAKAAsADwAXACYAOQA4ADoAQAAqACkAKwAyAEMARQBBAFUAZABuAI8ArQDjACYB/gH3AWUB8wDeABEBdAFiAUYCvgJBA58C1gJTApYBTQEJAgMDjgM4BBIFRQXYBD8FcAXPBAIERgT4BKkGKAbfBUMHtwi7CgEMeAtnClgKIwpwCbAJbgo5CQcIfwjyCR0Jiwn7CCAJYwidB+oGcga6BvMGJQaPBMIEvQVfBOIDDQP3ARUB6wDrAOwA7wAmAWMBogGrAssCCAIqAfIA7AC1AKgBAgIQAU4A////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAEAAQABAAEAAQABAAEAAgACAAIAAgADAAQABAAEAAMAAwADAAQABAAEAAUABgAIAAkACgANABEAFgAfAC8AMAA7ACIAKgA7ADgAQwBEAFkATwBNAF0AbAB8AHUAmQCnAAYBdgG9AUcBMQH2AAgBPAHuAcQCWwJeAgwC3QGtAWkBaQGAAnoDdQRnBGIE8wSXBTYGYgWWBDQF6gUjBlcHWAd3ByYJSAs3C90L4QrzCQYJdggfCUcKEgntB/gH3AlWCgUKrQnbCGoIVgjDBzEHyQewB94FXAQOBLwEpQUCBVwD5QE3AfkA9gD3APUAFgE4AXcBAQJbAzwCggEiAeUA5ACmAboCxgGAACsA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAAABAAEAAQABAAEAAgACAAIAAgACAAMAAwAEAAQABAAEAAQABAADAAIAAwAEAAQABgAJAAsADQARABcAHwAlADAAPAAgADIAVQBZAEIASABiAGAAYABoAG0AVwBXAGMAaQC1AOYA2QBcAa4BWQH3AE0BiQH2AfEBVAJjAkUC6wGlAWgB5wF8A6UEmwMJA/wDwgTuBR0GHgWEBQEH6AYxCIQJ+QjDCcEKxglTCzIL5Ar4CZAILgitCUkJ1AeoB0kJ2wkYCfsIMgmZBwAHswfqBnAGDgc1BrMFNAToA/8EbgTZAuoBVgEFAQIBAQH/AP0AFwFdAecBTQN3ArgBIQEGAVIBDAJiA90BlABKAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAQABAAEAAQABAAEAAgACAAIAAwADAAMAAwAEAAQABAAEAAQAAwACAAMAAgADAAUABwAKAAwAEgAYABgAIwA3ADQAJgAhAEoAawBSAFMAVwBcAGYAXABUAFgAfQCbAIsAlwCzAL4AIgEpAgsCDQEkAUoBeAEuAggDKwPnAk4CEAKlAYgBlgICA4kCUAK9AtQDYwWYBu0FfwYGCNEILgkpCjgJJQnKCT8JZgouC24KBQqkCJ0HeAjyB9gG2gbBB6oHQAi8B2kIcgimBvAFawZTBQcGSwbeBMcDHwOvA7kEDAQaA7sBMgEOAQsBCQEGARUBTgHJAZ8CygLLATgBCwGLATkCRwMiAsAAdQAqAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAAAAAAAQABAAIAAgACAAEAAgADAAMAAwADAAMAAwAEAAQABAAEAAQAAwADAAMABQAHAAcACQANABIAEwAUABUAHwAaABwAHwA1AG8AbQBgAFsAWwBVAFQARQBfAHYAvAADAaEApwC4ANYAiwFNAlwBJAFlAXwBLAINA50DwwPnAj4CwAGWAU0CDwL2Ah8DpgIiA4IEwgVZBksHHwk8CckItwiWB08IVwlFCPUIBwuOCrEJjgi/ByEHaAeqB0MGKgbjBQsGAAZUB68IZwecBSkFDgWOBKoFdQQNAz8DDgQrBUMFVQTWAp0BGQEVARIBCwEdAUYBpQGbAgQD1gGZAW8BrQGlAsoDYwLyAMkASgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAAAAAAEAAQABAAEAAQACAAIAAgADAAMAAwAEAAQAAwAFAAUABQAEAAMABAAFAAUABgAIAAoADgASABUAFAAUABYAEgATACYAPABbALUAZwBJAEEAQgBEAEQAbgB4AKEAbgEFAd0A9QDEABgB5wHzATcBaAF7AboBMAJAA+4D/QKQAgICpgH1Ad0BwQLuAwUE4QJ+A3QEUgUmBjAHWwjPBxcHKAY4BqwHrgaWCP0KUQojCckIFAngB7cGgQYUBlQGAwa5BdQEoQWTB08GrAU1BOcE0wOvBKwDnwLHAnQDwgMBBMoENAPmASQBHgEbAQ8BEgFDAX8ByQGbAtMCIwLbAQIC/gJSBLkCnQECAZgAPwAgAAsA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAEAAQABAAEAAQABAAIAAgACAAMAAwAEAAUABAAEAAUABQAEAAMABgAGAAcACAALAA4AEgAVABUAEgARACAAIAAXACwASQCIAFMAOAAwADgAPQBOAGAAbgCNADcBvgETAYcB7QD1AFcBAQJXAV0BnAGuAQYCzgIWBPIDlQOWAgACswHQATkCDwNYBMED3AJnA5UEAwWNBa4G1wZyBVEFOAbhBdIG2wgGC4cKIApNCX0ITQesBigGTwcBCCEIQgccBWEEygWmBXcEpwOtBLcDswMwA5QCagL9AbICOATrA9ECngEtASwBJQEVAQkBMQFIAX8BIwI0A/EB9QFeAp8DPgXQA8ECnQHVAHEARgAWAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAAABAAEAAQABAAEAAQACAAIAAgADAAMABAAEAAUABQAEAAYABgAHAAoABwAIAAkADAAPABIAEwAQAA4AGQAqABQAJgA2AFIAYgBnACgALAA1AEYAdACZAIYAjgDuAI8BWwHaAV0B0wAhARECvAE4AZAB0wH0AbMC0gOSBCcEvgNDA64CAQJwAnQDSASoBK0DHwPYA1gDyQOSBNcEnQQrBlQHDgcgB3oJ/ArTCV0JpAhAB+8GAwgDBwAI1AjsCF8HpAUcBMQDWwSzA/4CFgO6AqQCKAPQA20CPQKMA+YDbALzAUEBOAE8ASsBGQEKARQBOAFdAc8BogLgAacB5gGFA/YEewSHApgB2wCjAHQAVwAwABUA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAAAAAAEAAQABAAIAAgACAAMAAwADAAMAAwAEAAUABgAFAAYACAAIAAcACQAMAA4AEAATABQADQAQACsALwAaABcAIwBRAGwAVwAyADUANABDAHkAoQBuAIAAqgDjAHoB5gGgAeoALAHRAWECZwFRAY8B0AFWAuwCxgP7BLgE6APzAlEC/wEhAsUCzAN5BMYDRwMBBB4E5wOSBFUFXQZIBzIIPggjCRoLBgoqCSsIaAfJB/cI3AfhCGIJaAiLB6QG6gV6BFcDzwPDA1gEiwSHBFEE8wMrAgMCWwJDAowBXAGBAU4BPQEtARsBCwEMAVMBwAFzAaoBzwHNASgClAM9BdoE/gKaAUIBxACOAGYAKAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAEAAQABAAIAAgACAAMAAwAEAAQABQAGAAcACAAGAAUACAAJAAsADQAOABAAEwAUAA4AEAAyADkAMwAmACIALgAvADUARABQADgAPQBHAFIAbAB/AK0AGgEdAnkCngF6Ad4AMwE8AhACXgFuAdMBVALYAqIDrQTuBOoDkAPgAtQCUQIwArMCnAOqBFMEuQROBfUESgW6BvgHWgjMCNEJHAoLC3cKcgmCCI0I/gjNCRsJ/gm8CcAI/gchCPAHVAa6BQkG2QVZBScE8QJzAncCWgLkAdQBsgEaAjQCvwLkAcgBLAEZAQsBAQEZAW8BXAFHAZIBhAFfAl0EvwUdBZ4DqgKjAbUAgABkACAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAAAAAAAQABAAEAAQABAAIAAgACAAMABQAFAAYABwAHAAcABgAFAAcACgAMAA0ADgAQABMAFAARABQAKwAyADsAPAAvACQAOgBbAFwAXQBoAEcAQABWAIEAtgC8ADgBpAHGAlQC/AEHARMBpgGrAkwCcQGsAQ8CXAJVA7EEjQWNBPgDugMFAwID9AKOAlgCUAOOBJ8FhwYcBl0GzQZQB3sILQmlCsELCws0CpUJaAk5CjsKKQoBClQJ0gijBysHrAcoB1wHOgYuBf8EzAMcA0gCtwJlA5YC4AJLA/MC9wNLBNcD5wLuASwBTQEUAf0AAwE5AVQBJgGUAeoBOAOOBJYFiQUkBGkCPQHbAMgAkwAiAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAEAAQABAAEAAQACAAIAAwAFAAYABQAGAAcABgAIAAgABQAIAAgACwAMAA0ADwAQAA4ADwAZACYAMwBBAEYAVQBCAGIAXQB4AHUAyQCbAEMAVgCUAJoAyAAQAXkBJgLuAjkCegH+ADMB9AESAz8ChQGkAVsCJgP3A0cFAwUPBbYEYQMmBB4EEwNbAmkCeAM4BM0F9wbIBy8IHAjDCKsJnwrtCngLdQtRCk4KxAocCr8IMAn4CAsIYwfYBeYFugWsBV8FOARZA7kC7AJEA24EGwSXAm8DXARSBE4FoQQCAwECaAGRASACZAH6APUAOAEoAREBbQEkAggDSQSuBW8F5wNPAuwBYwF5AdcAQAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAABAAEAAAABAAIAAgACAAQABQAGAAYABQAFAAcACAAJAAcACAAJAAkACQAKAAsACQANABIAGQAiAC8APQBMAGgAWwBVAH0AowDFAJoAfgBJAFcAbgCTANwAEwEwAcMB2AKdAjwCSQH1AKgBgQJLA4YCrAE8An0DqgR2BdYF5wWrBB0EDwVDBEgDJQOWAsICvgPFBBYG+gaTB3kI6QmuCR8KUQlbCrQLiwqVCqsJnQjGB20IWAnKCD4HoQXLBEwEEgShA2kD9QIuBF4FEAajBHIDLgOnBEAEiAUbBkUEiAKuAccBZAKTAlsBBgHpAB0BEwEjAUwBWQLeA+cEvAWVBOACvgKvAjoCIgI9AXAADQD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAAABAAIAAwAFAAUABQAFAAYABgAGAAYACAAKAAgACQAKAAoACQAKABIAEgAUABgAIAAqADcAVQBkAHwAZACAALwAIAG9AHAASQBeAG0AjACvABQBXQGnAW0CfwPOArsBDAFJAbsBjwI7AzcCAwLkAlUEcQWGBaoFbAVfBbIFcQQIBOkDnQKaAk8DEQT8BKcFzAZWCLYJHAirCHQIBgp3CzYLbQoQCfsHRAfEBgEIZwioB+MGQQZIBboDWgMYAwUE2QUzBzgGswVzBOMD3wS1BIYFiQaABccDbQKfAnADaQKbAUsB5AD0APwAHgFDAbIBLQMVBMoEiAQkBPADjAOiA6ACYAFoAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAEAAQADAAQABAAEAAUABQAFAAUABAAFAAYACAAKAAkABwAIAAsAEAAWABgAFwAYAB8ALgBCAEsAWwBcAG4AiQC5APsA3wCnAFIAXAB7AKsAvADjAAcBeQEaAjwD6gLhAX8BFwFjAa0BpALkAiUCiAOsBIoFOgStBHAFCgbFBQgFQAVYBEMDcwIVA4wDLAQyBi8IogjyCL0G5AeoB90IMgpbC6ALYwr2CIgHfQbDBvYGKQZLBcwE1APaA/8D4ANpBa4G7wfdBloGyAQLBZ4F/wW2BeUGaAYOBfICPwP/A60CMwLWAR0B3QDwAPgAFgFoAY8CeANsBKQE+AT5AxkDwQLIAbgATAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAQAAAAAAAAABAAIAAwAEAAQAAwAEAAQABAAEAAQAAwAEAAUABwAKAAsADAANABAAFAAWABgAHAAcAC4AOwA7AEwARgBfAFoAkACuAA8BowBoAF0AdwDNAN8A7QAYAXEB2AF6ApcDWwKGAR8BZQF5AWQCowLZAa8C1QOpBH0D5gNiBC0FeAZFBtAF/ASsAxUDqgKcA5gEygWGB9AGSAcPBvgGMwd0CHcJ2Qq9CjMKQAn4B9AGoQUqBdAElQRsBAMEbAWXBAIFnQYpB1QITQexBlYFSgXNBsQH7gfiB0wGxwSxAzsETAR+A1gDVAJ2AekA0gDuAPEAPwEuAtsCPgN3BF0FswQoA6UBAAFMAB4A/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAQACAAIAAwAEAAMAAwADAAMAAwADAAIAAwAEAAUACAAKAAoADAAPABMAFgAaAB4AHwAvAD4ARAA/AEEATABMAF4AlAC3AOMAiwCLAGUAhACeAL0ABQEaAXsBHgJnA/kC7wEsAZ0BfwEMAsYCdwIXAvsCZgPgAggD9AP9BNkFSQdHBkEFrQTtA9wC5QJHBHYFWgZdBUUFNwUUBlIHDAmHCRgLvgp3CUkI7QZyBrUFfwaSBgUGOgVyBOkFYAXbBIUGjwerCLAH8gerBmkFkwbFB60INAiAB5YGcAVKBRUEhAIvAmICxwEaAdUA0gDgAAsBZgHjAegCNwPfA1sE0AKoAR4BegAsAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAQABAAEAAgADAAQABAADAAMAAwACAAIAAgACAAMAAwAEAAYACAAHAAoADgASABYAGgAeACMAOQA7AEAASgBJAE8AVQBRAGMAsQBLAawAogBvAOUAyACdAL4A/wBGAccB+gL8AhgCaQF3AbwB4gGoAmADzAIvAjcCWAJPA5UEuAWWBgAHwAavBYcERASyA9cCYAM6BFcFagQ4BIsFdAfOCPoJmwqCC60LWQoACa4HKwckBn4HBwegBbwElgV0BpMFegX0BhsIRwnBCIcIdQeeBv4GjAgMCBEHugevB+4GzwSNA+QCFQK2AXEBCAHiAM4A3QD+AG8B0wGBAocCjgPIBGgDhAENAYIAMQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgABAAEAAQABAAIAAwADAAQAAgADAAMAAgACAAIAAwAEAAMAAwAEAAYABgAJAA0AEQAVABgAGwAgAD0AQwA/AFgATgBbAEwASgBcAIwABAFaAc4AewDSAAoBDwHvABcBggHCAaoCcAPAArsBYAGuAeoBbgJpAxwDkQLeAiwCIAOYBJ0FgAaMB1MHBQZ0BXoEFwQWAwIDTAP4A9cDJQUMB3sIwwnPCQ4LsAy4DIgLQwrZCHsHLQcvBwcGjQWJBdYGGgbABUMGjAZvB/8IkAlDCfsITwgXCBEJbAeBBu4GvQbMBi0GfgRkBPEC7AF6AWgBBAHIANAABAHIAfMCWwOsAs0C7QOrA50BrAByAE0ANQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAAAAAAEAAQABAAIAAwACAAIAAwADAAIAAgADAAMABAAEAAQABAAEAAYACAAMABAAEwAXABkAGgA5AEcAWAB3AGsAVgBZAF4AVABrAKgAhgFyAeQAxQBuAW0BVgEkATUBfAH0AQEDNwNfAtkBjQHgAZgC/gJaA3wD9gIwAs4CmAMiBUwGcgaNB/oGYgV7BDQFkAMTA7gDeQNOBMgF/Qd9CS8J/QkdC8wMGQ2OC4QK7AmDCFEHXgaFBjAGnwZuB6IHUgdKB4EHkggkCpoKsQozCoYIogjOCCAIfAYVBuIFygUFBusFJwTtAoUC6QKMApwB0QDGANoAMQExAjUDBgPRAY8CWAOxAbsAjgBkAE4AGAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAQABAAEAAQABAAEAAQACAAIAAgACAAIAAgADAAQABQAFAAUABQAGAAkADAAQABIAFQAXABkAJQBIAFYAdgB7AH4AZwBuAGMAbACjABsBSQLwAfsAvAAfAVgB7wALAf4AewGnAuUDQwNxAv0B1QF2AjwCLwP5A2EDWgLwAvgDxgR1BSgGBQdEBwUGlwX1BV8EKQMXBNYEMQVMBmYHOQiKCPcJqQttC8sMGAxKC4IKgQieB+EGMAg8B+kHyAivCPQH2gflCKgJpQp9CokKcgmsB0gH/wdUB1UGggVTBRQF/AQwBVIFlwSkA8ADmgKWAeYAuQDgAPsAuQF8AqMCgAENAi0DHgINAbAAggBUABwA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAEAAQABAAEAAQABAAIAAgACAAIAAgACAAIAAwADAAUABgAGAAYABwAKAA0ADwASABMAEwAVABsALQBAAFUAXwB1AH0AWABjAGIAdgDAAI0BnQLPAaMB3gDtAOYA6gAzAYkBYwJxA1wDzQI6Ai4CXQIjAu4CoQOTA2ICCQMHBHIE5ASgBZ0GhAd0BlYGXgbEBFgDgwM4BXQGeAa1BYAGZweUCNQJWApsC/8LswvECjsJsAf7Bx0JoghcCdsIQAjJCEYJiwkuCpsKLQlICX0I+gZ/BlsHDwYiBf8ElARhBPUDAQQWBeAFswTGAwUD3QEKAbAAsQDEAAoBUQFQAS8BsgH1AqQCbgHkAJUAbAAhAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAAAAAAAAAAAAAAAQABAAIAAQACAAMAAwAEAAQABQAFAAYABwAHAAkACwANAA4AEAAQABEAFAAXACIAMwA/AFoArgCFAE4AWQBVAGcAwACDAUACCAKSAo8BSAE4AeUAAAGKAfYBIgJCAiQC6QI2ArEBTwJLA7UDRAOEApMCPwNtBO0EoAWsBtEHYQcSB+0F0ATsA1ADxASjBY8ElAVYB2sIHAknCvcKJgocCk4KQguTCjcJ/wiICiwK5QmuCbAJlQliCuwKTwvMCu4InAj1B0UGegXuBekEMgQjBNUDmANpA/cC3APEBG8E7QKuA1ACPAG2AKkAsgDUAPoAQgErAXwBqQJGA0QCIAHRAIEAKAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAAAAAAAAAAAAAAAAAQABAAEAAgACAAMAAwAEAAUABgAGAAcABwAIAAoACwAMAA0ADwARABIAFgAbACgAMwB2AI8AnAA/AEoAXAByALoADgHUAakCbgIFArcBcQHsAA0BVAF+AVMBnAGZAiYDJQKaAbICkwPOA1sDQAPzAocCJAMjBDkFZwaHB/IHpQeVBt8FVwRLAw0EPwRfBDAGtgjNCZgJwwqWCg0JWwh5CbUJDguLCvgJsgucC4YK8wn8CkwK9wm/ClQLtwl3CMoHAQg9Bj8F1gTtBKAFSgUMBPUCqQIyAqYCVQNhAy8CtgJ7AukB+QCkAKgAsgDNABABBQE7Ab0BAwPzAssB6ACFAEAA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAEAAAAAAAEAAQABAAIAAQACAAMABAAEAAUABgAHAAgACQAJAAoADAAOAA8AEAAUABYAGgAbAB8ALwA+AFAAUABaAGIAfgCjAOcAWgHTAWoCmQKxAWQBFQHhAPcA/wBDAdoB8ALaAgkCeAGaAn8CQQOxAsQD6QOyAuYCcQQ2Br0GPgclCO0G5QUSBSUF5AN6A1IEWwUSBzUIcQhoCNoIfgmJCB0HwwcFCV0LrQsQC20MzAtNC3cKmgt9C74KywpzC3YKEwmjBwoHIwZrBuMGQwfUBvQEfwRHA4ICPgLIAcsB4QGGAUMBKQFEAR4BpQCdAJoApwABAfEAJQFcAd4BBgMMAgABiwBvABsA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAAABAAEAAQACAAIAAgADAAQABQAFAAcACAAIAAkACgALAAwADwAQABMAFQAWABkAGgAiAD0AhABTAEAAZwCGAIgAqQD0AGUBwAGQAvYC4AHOAYoB8ADhAP8AgwFOAhQDiAIOAlQBOQIKAngCVAJwA3wELQPEAgEEiwVABS4GoAdPB0gHnAZbBUsEcgPoBB8G6QbgBZIG6AafB20HOwj6BsUG/gg8CtUKagzgDDANGQxGC+YLIQyBC4YLcQv1CegIzwdtCGQIEQhtB/MIZQdvBZYFpASVA+gDcgOqAn4CVgI9AvwB6AARAbUApACaAJIAwgDwABIBGwGsAdkCrwHqAKYAkwAmAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAABAAAAAAABAAEAAgADAAQAAwADAAQABQAGAAcACAAJAAsADAANAA8AEAARABMAFQAVABkAIgA1AGYAfwBgAGsAjQC3AA8BOwE+AbwBVwIjA8ICRwIEAgcB3gDqADQBDQJ0AloCiwFBAVABjwHIAZsCiAOUBM8D+AJIAyUEGQXKBqQHsgiKCEwHagbrBMwDygNYBJcESQSeBG4FFwayBdoF3wVxBhoIQwiaCqYLmwsqDIQMhQzPDNoMVQzsC/kK9wlyCdAITwjHCRUJSwh8CS0I/Aa1BtQFlwWjBT8FVQSdBBgEWQNwAcsAvwCuAKYAmwCRAJMAtABCAZ0B/gEsA/gBSAENAY0APAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAEAAQACAAIAAwAEAAQABAAEAAUABgAGAAgACQALAAwADQANAA8AEAARABQAFwAaABwAJQA6AEkAWgBsAJAAmADCACYBbQHxAZ0CAwRiA1oCzAFjAeQA4QD3AIABrQFNAS4BSgG+AU4B7wGxApYD5gQZBd8DPwPCBNIF2wVNB38IzgheB8wFhwTcBIwFTwQnBYAF1wRUBIkEuwTLBaAGJgblBlcIfgrWCWAKQwrOCqILgAw8DagMQwxnC1UL8AqkCW4Jewm8CnUKeArcCEUInge6BsgGFgcDB9QFmgSwA3ECBgFmAVMB+ACkAJkAkQCKAL8AIgEhAvwBAQNwAkoB0wCLAG4AOAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAQABAAEAAQABAAIAAwAEAAUABAAFAAUABgAHAAkACgALAA4ADgAOABEAEwAVABUAGAAbACAAJgAzAEIAVABdAHQAqwAKAXEBGAIAA0AEbwOXAr0C1wEFAfEA4AALAQsBPgGgAbkB7QG5AZMBYwKpA8MEQgVCBDEDQQR7BIgF1wbiB5sHNwevBTMFRgbvBTAFogavBycG2AVyBUEFUwUZB2oGfgaGB10IHQg0CDYI7gg0CjIMswxpDFQL+gpNC70KjQpkCz4KBgtvC7EKDQqmCasH3AWiBWgGkwYBBlQEvgJTATgBagJ6AqUBrACWAI0AhgCjACcBZgGFARECMAPoARoBCgHWAFsAJwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAAABAAEAAAABAAAAAQACAAIABAAFAAUABQAFAAYABwAIAAkACwANAA8ADwAQABAAEQAWABkAHQAhACUAIwArAEYAZwCRAAYBcwGLARQCnQJYAwwEyAM0A88BZAEJAT4BEgH7ATcCYgJ2AikCCQJ7AXICWAO1A1IE2wQQBFkDxAPyBBAGfAeTBiMHgwYQBgEHkAaCBkYHZQj7BhoHigZ0BhgFfgZ+CIAHkgbuBpYHLwieCA4JswqRC8MLcQuyCokJWAljCZMJjgpkC3IL7AoEClYKAAmIBjMFqwQxBd4FpwSJAw8DtAGZATADNAJOAcMAkwCHAIEAiwDSABEBJwFlAZsCRAM8AlIB0QCLAFIAOQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAAAAAAAQAAAAAAAAAAAAAAAQACAAMABQAGAAYABwAHAAcACQAKAAsADQAPABAAEgARABQAEwAYABwAHwAgACcALQA+AGgAdQD5APYBowGtASICvAJ0A6ADuAIrAr8BdwEMApoBYwFDAvUCGwOTAs8BpwHwAW4CuQLqA3MFtwVgBMEDNQTzBW8G3AUZBk8HyAanByYHdwcKCCIJmQgqCeEIrwfiBaIFMgiOCEEHnggDCpgKLgoZCooK5AoLCwwL+QkhCSEIqgiuCNgIUQrTCdcIMgiLCLkIXwYABecDbAT6BKYD7AGgAUwBbQLMA/sCCgILAZIAgQB7AI8A/AC8AWoBeQHNATID9wLoASEBuwBtAD8AHAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAEAAgADAAQABgAHAAcACAAIAAoACwANAA0ADgAPABEAEwAVABYAFgAZABoAHgAjACsASgBnAIcAtwBFAUgBUgHIAfsBqALJAzID/QL1AfIBBAN5ApABvAFmAiEDRAMEA5oBFwK7AhgDbAOGBOIFvgWfBJkDnwSmBAQFdgbwBuIHVAgUCL0IggndCVMKNgloCDgH/QUJB4MIcgkvCKcJxwtnC9cKHQvvC3gL5QqYCbQIugdjB54H7wfXB2MJPgkYB/EGeQd4CBEHcwXqA4oDTQSJAs8B2gJwAi4DKQOSAqIBKQGqAIIAdwB8AAgBvQErAj8B0AGAAscDvQK7AfsAfgA6ABkA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAABAAIAAwAEAAUABwAHAAgACQAJAAsADAANAA4ADwARABMAFQAXABoAHAAfAB4AIAAoAD8AYgCJAIgAowAAATsBeAHNAWkCUwN1A9ECaQIzAloDSAPwAcMBTAJIAt4CVAPIAQkC8wIBBAYElQRoBWgGpgUyBDQERARNBLIF1gW4B4cHowbvBx8JLwnnCdUJcQlsB9MGAwnLCZUKOglcCngMJwybC7gLkAzeC4kKngktCQcI+AZjBkwGBQdcCAMJZgaaBXMGGgguBgAFnQMKA0MD6AFHAsMDWQTfAzsCkQEFAeMAswCNAHcAcgCjAHcBlgLVAZQBbAJ4A7cDuwLSAaUAWQAjAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAABAAMABAAFAAcACAAIAAkACQAKAAsADAAOAA8AEQATABUAFwAaAB0AIAAjACUAIwApAEQAWQBvAIAAyQBAAcAB3AHWARoCyQKEAwgDzQJiA70C9QHLAfQC5QL1AqcCwgGHAsED3ATaBEIF7AXqBlwHWwZ5BaEFDQRwBPwF+QaWBusFCwdFB0AIuQlPCjMKFAiwBqsIBQugCgMKdgsBDfwMGgyFC5kLDwxfCwALDArUCOcHqgacBQ4HCAhdCJgFpwSTBksHhAXLAxUDFAJRAiMC2wJ/BKoFDgSzAiMCUwHNAVgBtQByAG0AlgB9AYECtAKpATEC+wLcA+UDDAJTAa4ANAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAQACAAQABQAGAAcACQAKAAoACgALAAsADgAPABEAEwAVABgAGwAeACEAJAAoACsAKwAyAFcAeABxAJEA2AALAToBmgGZASMCawLsAoYDCgQqA/cBNgJfAkwDeAIPAuABQQOuBHME+AO7BGMFDAYfB6kHPAeSBVwFfwT8BDAFPAWDBZkG9AeqCIEIbwjACYUIygZWCDsKdAnxCaILRQvoC5cLggplCrcKRgoCCsEJhglQCBMHdQUbBvMGIwjhBSIE3QU8BQkFsgKWAloCEQRcBCgFwQU9BY4DowICAuIBrwKtAccAbQBpAH0AWgH4AQwDugJWAjMDbgMiBCQDKALiAFgA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAAAAAAAAAAAAAAAAAAAAEAAgADAAQABgAHAAkACgAKAAoADAANAA0ADwARABQAFgAZABwAHgAhACMAJwArAC8ANwBUAGkAgAB3AIsAuwARAQ0BlgHwAagBAQL7Au0DlwM7Ah4DRQN7A60CUALbAUADRQOCA/sDfATvBIgFVwamB3IH6wVyBtoE6AT4BMQEKQaRBqUG3gZnBxwI/gkSCZUHOweBCKUIVwmhCrsJvAuQCzYKdAkrCREJBAmHCLQHrQZKBrIFCQWbBngHrASBA3EDywNrAzIDIATHAloEagU1Bi4HFga/BPEDFgNyApUCDQLkAGoAZgBoANYALQEGAkoD8wIFA6YCnQMgBB8DWQFyAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQABAAAAAAAAAAAAAAABAAIAAwAFAAYABwAIAAkACgALAAsADAAMAA8ADwATABcAGQAdAB4AHwAjACIAJwApAC8APABJAGsAewCOALsAwADOAAMBTgF/AQ4ChAJKA7QDyALdAjoDrgM8A3YCMQIGAj4DwwR6BUkFWwaLBj4HxwelBzIHXAbHBRwGCAa1BDQFHwYtB+kHBAkJCSYKwAmmCKYHSQeUB7AHwAjICOsKTAtZC1EKMglbCAMIzwc/B/QHgQc0BuoELAZjBsMDzAR+BDsD5QIzBQ0FHwPZAyQFrAbEB+YGbQWsA/oBTgFfAaUBPgFyAGMAZQB9AMoAoAEKAxMEUANNAiQCLgOwAhACyQAQAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAEAAgACAAMABgAGAAcABwAIAAoADAAMAAwADAANAA0ADwATABYAFwAcAB8AHwAhACIALgA3ADsAWABVAHAAfACMAKwAsQD2AIQBsQGIARECOAMoBL0DcQOQA5UDuwO8AlcDXQIDBPoE8gQIBZ4FqgUOBqcHrAh/B4oGWwfcBoYGNgX3BBAGWgbZBtgHIglNCl4J0QhMCL0HogiRCK8IdghgCo0L2QvXCkYKXQmUCeEJFwmDCIYHsQYyBSoFewQDBO0EQgWLBb4EwQYFB44E/wOZBdgG0QflBj0F6gOVAg8CHAG9AN4AcwBjAF8AcgDhAB4CJAO3Az8EAgPOAagCSwIgASoBNQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAABAAIAAwAEAAUABgAHAAgACQALAAwADQANAAwADgAOAA8AEAARABUAGQAbABsAHgAgAC4ARQBiAHEAagBzAHkAfACVAM0ABQEsATQBhAELAvYCEgQSBDIElgPkA7oDjQMKBHMCBgO8A90DEgShBPUEJwZzB6YIFwgNCGgIbgdXBpMGYgWsBSgHzgdPCAcJKgr1CUkJRghDCBUKUAryCVUIrglxCoMLLwvxCpwKgQp+CowJPwk8CBkH3wQtBb0EGAYtB9UGCAbaBrEHZAjWBR4EFwWdBmUGxQZ3BmQFcwQUA34CLAF8AJsAYwBdAF8AmAAyAVwCRwObA2kD/wHcAekBzwCpAIsA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAQACAAMABAAFAAYABwAIAAoACgAMAA0ADgAPABAAEAASABQAEwATABQAFgAYABsAIAApADYARgBtAHwAbgBgAGwAjwCyANAA+QBZAasByAFqAkEDnQKmAyADbANLBAME5gJjA6oDagQ+Bc8ELAUFBvIFbgfOBzoHLQgmCAgIMQfLB04GTwW3BggIRQloCWAJ4Qi2CYAJ1Qi9CbMKuglICeYIqwkdCgkK3wo+CgAKqQkzCRcItgbqBZ8FkwZEBUwGywdBCFgGuwZJCG0IyAU2BfEFzwaDBZgFoQUUBZME6wIsAnsBlADhAGcAWgBbAHcAxgBrAZECwgLXAz0CKgHyAK0AfwCJAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAEAAgADAAMABQAGAAcACAAJAAoADAANAA0ADwAQABEAEwAVABYAFgAWABQAGAAeACEAKgBAAFUAcABfAFYAUgBkAHwAnACtAMwAEgFHAY4B/QGaAhoCOAKQAnkDqQRYBHUDEwMPBMcErwXLBbEFeAayBmYHhQa0BtkGAQdxB4YIFgjJBmUFGwbPBpsHQwjzB/4HTwkqC3EKLgqBC0ELdAouCToJnQlDCqAKwQmzCBwIgQfSBgwHKQf/BRkHzwUvBs8HNQmQCEgHkwiyCFsGfAYZB58GDgV8BFgEDgRHA2wCJQH+APMAsACHAFgAVgBeAJMA4wBnAQMCVgMQA+gBhAElAb8AowA1AP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAABAAIAAgADAAQABQAGAAgACQAKAAsACwAMAA4AEAARABMAFAAVABgAGQAXABQAFwAbACEAJgArADoARQBEAFwAaAB5AJYAjACjANAAAAE6AZQBTwKbAd8BTQILA6sElwQWBOACawOjBAcFcQUQBVIFlgVcBnsFpAVmBUQGEwdECBYIiAamBQ8GDgZrBmcHEwdaCPoJZAycCxULiwxYDOIK/AmECcUKdwvjCs4J0wiqCCYJ7QcZCbUHhQYgBwkGjAd5CBUKSAosCAUIOgmNB9cH0QftBS4FnQWCBDgDiALCAW4B+QC1ALAArwBkAFQAUwBwAJ0AHAGSAUwCrQOJA4ACUwEJAaUAcQD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAQABAAEAAgADAAUABgAHAAgACAAHAAkACwANAA8AEQATABUAFgAXABoAGwAbABcAGAAYAB0AIgArADQAQABPAGAAcAB/AJEAvwDkAO4ADgEbATkBeAHkAWAC3QJTBP0EbAThAwQDtANBBKUERwRnBIoF5QXLBMEErQWSBrUHlQjEB6AGUQaFB1IHrQZKBs4HygiPCsgL9gxVDFANtw1vDPIKewmiCrILMwuxCukJ/wk3CtgJMwmTBy4HLAjYBjAHoQh+CjEKTQh7CNoIbwlPCQwIewbGBhEG/APeAsgBqAF4Ad4BKAHkAMgAgwBaAFAAVQB5ALgAmQFbAtQCtgM1AygCEwL0AIMAIAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAABAAIAAgAEAAMABQAGAAYACQAJAAoADQAPABEAEwAVABYAGAAZABsAHQAdABwAGwAgACcALgA5AEYAVABgAG8AfwCTALQAzQDIANMAHgGDAaUBBwLJAswCCwMEBOUEFQQjA+0CIQNAA2gDywOjBOEERARZBfkGVQcACNEITAj0Bt4G0AcsCREI3gYeBy0IYglIC3oMlQ0gDrINXgw2C/IJcQotCzEL0QuXCwMM0wurCrsIfQeqCO0IxwcDBwsJEAuwCtQI3AlICrMKfgnDCPIHHgdYBbkDeAKVAWUCaAL/AvIBnQExAZ0AmgBOAFAAXwCCAFYBpgHnAYAClwNiAvsB8gBoAB0A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAAAAAAAAAAAAAAEAAQACAAMAAwAEAAQABQAHAAkACwALAA0ADwARABIAFAAVABcAGgAbAB0AHgAfAB8AHwAmAC8ANQBCAFEAWwBtAIAAkgCpAMgA8gAmAVwB4wGhAccBAQJsAhsDdANCBGQEGQRXA9gDmATOA4gDtAPxA70E9AUbB+IHfQgmCZMIagcxB1YIPwpkCRUIMAeGB5gIsAkhCw8N+A3KDNkL/goGCtgJRAp7CkAL1wujDE4L9AmKCK8IPAm/B4YHPgilCRwLOQuUCWAKnAu2CvcJKAnPBnwFoQTrAjMCnwGnAn0DegOqAhMCWQHWALQAXABLAFAAXQCpABYBTQEzAjsD2QE8AUcBnQAzAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAABAAEAAQABAAIAAwADAAQABQAGAAcACQAKAAsADAANAA4AEAARABIAEwAVABgAGgAcAB4AIAAhACEAKAAxADkATABjAGIAfQCVAMEA0gDeAO4AKgGCATYCcwKuAQQCagJvApQCCwMtBNUEWARnBH0FLAVCBPID+wOxBFgF/gXnBqkHzwhSCS4IHAjCCGYKkwoiCZgIhggaCagKtAv8DDgOqQ2/DBMM3go4Cv4JLQsTDKYMmgx8C9IJDQmGCcgIygfVB+cIzwkGCxIMlgorCyUMLQtoCsUINwc2Bb0DnQLhAb4CUgMSBKsDUQM8AqkB3ADaALAAVQBMAGAAhgDAAGsBPALLAmUB1wDGAJYAEgD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQD/////////////////////AAAAAAAAAAABAAEAAQACAAMABAAFAAUABgAIAAkACgAKAAoADAANAA8ADwARABIAFQAXABgAGgAcAB4AIAAjAC8ASQBHAFMAbwBwAJEAqACzAN4AtQDfAC8BnQFDAjcDhwJDAhACpAKMAxUDwwPABCkFNwXjBTwGSgX/BBkEPAUnBsIGfQdxCE0JpQk5Ce0IrwknCjoKYwokCoAKjwv1C8oMDQzqDekNiw0uDKYKjwomC44LFQ2IDX4McQsZCr0KhgqJCUwIewgmCdMJUwspDKUL9QuLC7kKkwk6CfgH0wXuA0oCjANrBNkErQQlA08CXwLSAboAmwDCALAATgBRAJEAqQDLALYBTgIKAVkATQBQAGEAIAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQD//////////////////wAAAAAAAAAAAAABAAIAAgACAAQABQAFAAYABwAIAAgACAAJAAoADQAOAA8AEQASABMAFgAXABkAGwAdAB8AIQAxAFEAaQB6AIQAeACJAI0AgQCEAKIA4gACAVIB9wEtAywDjQNLA58CtAMqBLMDugTMBc4F2QXgBhEGmgX8BLAETQU4BuIGvgdUCP8IAwhGCOkIKAkBCSsKtQnjCUEKiAruCvIKXQ17DWkM3gvICi4L/AqFC1MMSw05DbsLdQsODPQKUwm3CK4InAkQCiYL3QvTDLALmQolCgwI7Qf6B/UFLATZAnkDXQQMBdcEnwMbAp4BYwGhAIoAgACRAFgARgBuAFEASgAKAaEB5wBaABQBJQH6AGIA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQD//////////wAA/////wAAAAAAAAAAAQACAAIAAgADAAQABgAGAAcACAAJAAkACQALAA0ADQAQABIAEwAVABYAGAAZABsAHQAeACAALgBIAFsAWABBAD4AVABlAGkAggCQAMkANAGUATAC5QLSAz4EcARjA10DMwRgBIkElgV/BoQGcAa/BfEFPgZ+BpYGvgZ4B4cHpQjUCDUH6wfTB0wITQiNCXEJ8AddCE4KOAlfC7gNjg2JDD0LswrMC+0Lrgs7DPQMAQ7YDFcNQAyyClIJaAkQCqgKCAu3C0MLcwz7CtcJ/QirBqsGWwbrBG4D8gJqA3oECwWyBAIEJwIRAckAogCNAHkAZgBWAEsATQBMAGUAqgBKAFMAjgCRAJoBDwFNAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEA////////AAAAAAAAAAAAAAAAAAAAAAEAAQACAAMAAwADAAQABQAGAAgACAAKAAsADAANAA0AEAASABQAFgAWABQAGAAaABwAHAAfACAANAA5ADIANgBSAEoAVQByAJwA1ADEAC0BsgE4AmkDWgMFBPkDcARmBFkERAUWBXsFdgaQBnYFIgUzBSYGjwY+B9IHfgh7CMsIGwiKBsIGfwYMBy8I4wjFCUYHUgcnCH8IaAqPDG4MuwqkCToJ6QlNCl8K5QqzC2MNKw4zDcQLdApRCgUKKwqlCjULTAsNCpALMgsLCloJDgc3BSkFzgNLA2IDagQWBegE7QOFA3wCFQFsATUBpgB0AGIAUQBVAGoAtgDiAF8AXQBhADYBDwG0AdABRQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEA/////wAAAAAAAAAAAAAAAAAAAQABAAEAAgADAAMABAAEAAUABgAIAAkACwALAAwADAANAA8ADgAQABIAEQATABYAGAAaABwAHAAcAB4AIQAnADQAVgBeAFgAaACeAOUA9gAPAUMBUAHeAWUCCgOzA9gEpgTzBOsFYwYwBk0GwwW0BG0EkAQ5BYMF3AaRB1wICwk8CWYI5wbCBdkFbgdOB3oIYgl/B/sF4galCA0KSAu5CxkKiQjLCSUJpwjoCDoJIApPCyQNqAyWC1sMXQttCzALwwv6C3wKAglLCjMK9Ag/CVwHrgTRA0sEwQTqBEoE/ATlBFMDSwKqAVkBNgIQAvoAbABcAFMAegCsAOAABAGAALoAnwBJAfkBNQKbAXgA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEA//8AAAAAAAAAAAAAAQABAAAAAAABAAEAAgADAAQABAAEAAUABwAIAAoACwAMAA0ADgAOABAAEQASABUAGAAZABsAGQAeAB4AJgAlACcAMABDAFcAWwBwAG0AiQCuAMUA2QDrAEgBWAIXA+YDLATOBCYE3wR8BSMG7gUhBdUEmAS+A9oD2QRgBbEFwgaYB2UIAwnMB00GjgVbBQEGAgdFCPkIWQfRBc8FtgZyCPkJsAmBCNsInwleCHAITwkHCuIK4QtzDZUNbAzwDEIM3wy0DJAMiAvACYMImgh2CMYHSgeRBVMErgT6BdEG/AXwBPcF7wV/BNEC6QETAhwDewJfAYcAWwBcAHMAxQBCASoBuQDgAC8BQwEeApgCrgH///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAA////////AAAAAAAAAAAAAAAAAAABAAIAAwAEAAQABQAFAAYABgAIAAkACwAMAA4ADwAQABEAEwAVABYAGQAaABwAIwArADYAOwA5AD0AOgBCAFUAbAB+AIcAmAC2APoATAF4Ad0B+gL8A4oEMwTlA9QDHQSYBZgFpQQBBMoDUwNDBF4FhQf4B/0HzQdkCNYIaAi1BnAF3QQpBjsG7wZfCEkHzAWTBRgIywmBCfUHcQeQCfIIygejCGMKYQtPDHIM/QzjDFwLLwzLCxgMkgzDC18LtQrqCNoHpgZRBtQF8AV3BSQFkwUCBwUH0wU5BqEG3ASeA2ICYgL0A18DKALSAGQAaQCyAMwAUAH2ADEBFQEoAUoBdwEyAr8BbwD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAQACAAMABAAEAAQABQAGAAYABwAJAAsADAANAA4ADwARABEAEwAWABcAGQAiACMALQBCAGQATwBFAE8AVwBUAGQAewCcAMcAEAGKAQoCmgJDAtgCigNpAwYDLwOeAxYEYQUABW4EsgMsAzMDWgSSBZYH1ggeCWIJnAlHCKIHAQZIBYYEKwXzBesHGAjoBnkF8ASAB10IAwewBn8IVAozCYgHEAjPCA8KkAv1CpELBQzOCj4L8goDC6MLwwoSC2YKnAjlCCEHvQaLB54HkgbrBY8HpgcoCOQGPwbIBkMGlgTjAg8DRwTAA3MCLQF2AHUA0ADuACkBNgFjAcwBbwEdAWEBEwIMAqIA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAEAAgADAAQABAAEAAUABgAGAAYACAAJAAoACwAMAA8AEAARABQAFQAXABgAGwAfACsAPgBYAG0AbgBdAGsAawBxAIIAugDQAFUBBgIpA6EDLAM/A7YCPALcAoMDPgROBAEEsgRmBNMDwAIyA+gDNgb5BwMIEAisCAoJdweoBtYFZwVjBFEE7AWyBsUH2AZYBYUEowZBBvcFsAf4CUwKnQg4BwgIrglKC2QLKAo2C3wL+Al7Cp4KTQpRC5UKoQpzCm0Jmgg3CNsHGwkACHgGtQZoByIIbQjUBlcGwQb5BZ8EWwMqBDAEXgOlAnsBiQCEANkAQAEMAV8BzQHjAfYBLQFNAacCjwIiAf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAABAAIAAwAEAAUABQAGAAYABwAHAAcACQAJAAsADAAOABAAEQATABQAFQAYABoAHQAlADsAXgB5AHkAVwBQAF4AcQCHAJcA0AA7AdkBxgL8A90D9QJNAiwCCgNvAycEnARyA9QDmgMaA6MC9QOMBFkFzwbKBg0H3AfHCKUIeweoBngGjAT4A+4EbQU2BykG8QRVBH0F9gX3BvAIoAp7CToI+wYICJcJ5AoECpoJUApSCisJjQmDCQsKTQqSCjMLmwoQCoIIhwmQCVoJXQg7CEEHTwczCGsI/AafBWYGjQY/BbEE/gTbA7oCVgJpAZkAiwDEABABVQGOAYQBhAElAfQA0ACyAb4BqwH///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAQACAAIAAwAEAAUABgAGAAcABwAIAAkACgAMAAwADQAOAA8AEAASABUAFwAbAB4AIgAyAFIARwA5AEoAYwBvAHsAkQC5AOgAYgHiAfMC6gPFA0cDdwLUAb8ClQMbBOwDcgPfAp0DcwIQA2YDegMKBKkFWAU4Bg8HDQgzCYkHaAcoBtIExQP0AxgFWQZOBfYDoQThBV8I4wguCl4KawkxCNcGfwclCOgI6Ai8CAAI/Qf6B5QI1QiPCVoKjgqwCukKcwrTCMYJ4woLCo8JCAoaCXYIrQktCGwGCgU/Ba4F8QUOBtYFLAR0AqcB8ACQAJgAuQAeAYEBmQFCAf4A5AC/AI8ArwAFAWYBsgD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAQABAAEAAgADAAQABAAFAAUABgAHAAgACAAIAAoACgALAAwADQAOAA8AEQAUABcAGwAfACIAJwAmAC0APwBFAFEAXwB6AKEAtADYABABYgEUAvgCJQQABC8D9gHYAScCUQIoAnECQwJ3ApQCwgK/AtwCBwRgBIsF2AZ7Bx8I3QioB9sG+gVJBXAEfgMBBCUFBwQaBKYFEwfzB2sK2At/Cm4JzAjuBkcGeQbJBugGYwc3B78HIQhdCGkJcgolC1wLHgtnC0kKGQrkCooL0ArrCvgJ8AiRCYgKZQi2BrwFdAS6BGYEGAXMBPsDrQI1AakAngCkAL8AFQG3AZ0BNQEcAeQAmQCLAIoAeACSAOcA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQD//wAAAAAAAAAAAAABAAEAAQABAAIAAwAEAAQABQAGAAYABwAIAAkACQAJAAoACwALAAwADgAQABEAFAAWABoAHgAfACEAJQAqADQATgByAHAAfACYAKIAsAAiAWQBrwFbAp0DPQRdAxQCFwKLAj4C6QLQAm4CxwI9AzEExwM/A3EDHwRpBSEG/QaOB88IBAhQBj8GIwYGBdsDQAOpA/UD7gSeBocIAQkjC64LJArnCMgHagaZBrMHEAjNCHkJOwlKCbgKXgpYCfkJnwpSC2ALpQt4CjkLHwwnDOcLkgoCCoMJpwqDCjAJCwjgBT8ExQPEAmQD0QJ0AvIBDwHAALUAqwDGAPsAeQHBAaABTAH/AN8AuQC1AKUAPACyAIIA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEA//8AAAAAAAAAAAEAAQABAAEAAQACAAMABAAEAAUABgAGAAcACAAJAAkACgAKAAsACwANAA4ADgAQABQAFgAYABsAHQAhACUAKAAxAEMAVwBsAHoAdQCFAKEA7QBcAckBDgLbAlkEigNJAvEBTgO5A9QDqgPgAsMDqgM3BVsE8ANgBJkF7gYAB78HogdGCDEIOAfrBRAF7QSmBEQDpAO8BP8F5QeuCfAK1QtIC6kJRghwB4YGIwbJB6YJswqTC1kLeQunDHsLugmACoQLRAz1CxgMUAtNC60LmQt3Cw0L2AoJCh8LKQrxB5gHCgb1A08DvgIYAvQB2wGQAR8BbAEAAaoAtgD5AEIB4QH4AZoBPwEUAcsAqwCzAF0AMwBgAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAP//AAAAAAAAAAABAAEAAQACAAIAAwADAAQABQAGAAYABwAHAAgACAAJAAoACgALAAsADAAMAA0AEAASABMAFwAaAB4AIgAlACoAMAA6AEsAVQBdAIQApgC/AAcBIAGMAQ8CfgIXAwUDVwKXAd8BVQLVAsUDwgMhBBIFwAXABF8E+gUTB54HVAgYCE4I3weKBo4GIwahBUMEMgRSA6sDZQWgBgkISQnFCmAKvQr/CKoIAwjIBuEFSgdeCMoIoAn0Cd0KEwzZCy8Ktgr1C5YMWAxlC84KCgpnClULagv9C+ULtQryCq4JagdFBpoFHgQJBB8EGQMYBA4EjwJEAhkC8AC2AKwAwAAAAV4B9AFrAawBeQHcAJ4AtABzAGsAGwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAAAAAAAAAQABAAIAAgADAAMABAAEAAUABgAGAAcABwAIAAgACQAKAAoACwALAAwADQAOAA8AEQATABcAGgAdACEAJgArADEANwA8AEYAbACIAJEAmgDBABEBXwGGAeUBQgLUAjUChwHAAioDIgObAzwFywRaBT8GlAWbBeQFpgcvCFMIxAfNB+0HsAaEBfkE0QX0BOEDQwMqA1kEOwX7BtIIUwrhCAcKzQhXB8YGPAa9BSAG9QYVCAsJhAoHC3AMKgyXClILVwzJDCEMAAvkCSUJowluCs4JPgtzC0sLIwvqCW8HYwebBRQFLgVpBUIEmwUeBZgD4ALZAfcAwQCrALUA1gAHAaYBoAEgAUcBuwCHAJ4AewBHAFMA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAAAAQABAAEAAQACAAIAAwADAAQABQAGAAYABgAGAAYABwAIAAoACgALAAsADAAMAA0ADgAPABEAFAAXABkAHQAhACUAKgAwADMAMwBFAFkAaQB8AJYAxwDzADQBbAGBAeQBnwJYAoIBJwKVApsDYgTNBcsFXwXhBTEFAQaLBn8HvAf+B00HTAfxB+YHEgbVBNUEwATfAzcD9wKyBIsGpQjfCekItQfyCdoIMQhNB6cFXwWLBsQHAQkNCl0KuAqkC1UMLAv2C9oMPwwQDLgKrAm5CNgIaAn4CJUKZgsDCpkKhgreCN0IiwfbBuQF+AZKBiIGtgQyA9sBcAFEAcoAqQCiALIAxwAxAZ4BcQE+AQUBowBjAFgAzwBRAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQAAAAEAAQABAAIAAgACAAMAAwAEAAUABgAGAAUABQAGAAcACQAKAAoACwAMAAwADQANAA4ADwASABQAFwAZABwAHwAjACgALgArADMAPwBNAFwAbgCEAKEA4QA5AS8BQAGOAe8B+AE+AVIBTAL2AxMFfQULBssFDQViBAQFBgWiBpEHXQfPBi4HtAehB58GowX3A88DggP5AuUCCwUxB+cIsQgbB2UIdArQCQMJlweABgcF8AVNBuoGvwfWCD8KQQxwDacMFg2VDO4L7wusChIKhQn+B94HnwiUCZgK3AlmCYwKcwrqCEgIKQgGB5MHtgYFBacD9wIOA90CfgJRAZ0AkwCXAKEAswD+AM0BPAE+AcMAfgCLABUBhgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAAABAAIAAgACAAMAAwADAAMABAAFAAUABQAFAAUABgAHAAkACgALAAsADAAMAA0ADgAOABAAEgAVABgAGgAdACAAIgAjACgAKQAvADcAQQBNAFsAbQCJAN4A1AD7AB8BUgGLAYEBlQEjAYIC0QOOBAoEjwSdBfIE7gP8A7QEQgaQBqAG+wZ5B4cHsQYuBjAFoASLA0UDqwJmA40FzAVaBu8G3wb3CO4KGQoYCMUG6AX7BP0FOQcPCMwI8wleCkYM8gyJDBwM8QtNC5gLWAulClkJHQgiB8wH5gjXCugJNQj4CCkKzwnECW4JhwdaBsQGLQahBJcElwOnAtUB+wCbAJAAhwCLAIsAlwAIAQkB8wDQACQBPgFGAc8A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAQACAAMAAwADAAQABAAEAAQABAAFAAUABgAGAAYABwAJAAoACwALAAsADQAOAA8ADwAQABIAFQAYABoAHQAgACMAJwAqACwAMQA0ADoAQwBNAF0AdQCnALcA/gD3ABsBfAGBARwB/gC9Aa0CkAMtA2cENQWKBJYDkQMEBJIEzgUQB0sHhwfZBlUFswWxBLkDQgP9As4C6wMBBDYEjASNBeMGgwlGCzQKSgivBtMFyARLBfcFwwauBxkJEQvVDOIMugv2CgYLKgp3CboJYwlHCOUH3wYkCJkJHQrbCSMICQjnCD8KcQrNCUkIbQaaBb4GpQZoBXADCwJsAXUBEQEWAYEAfQB8AH0AiQCpANgA/wBFAQ0CsQHoAC0A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAgADAAMABAAEAAQABAAFAAUABgAGAAYABgAGAAcACAAKAAsADAALAA0ADgAPABAAEQASABQAFwAaABwAHgAhACQAJwAsAC8AMwA4AD4ASQBaAG4AkAC6AMcA0gAJAXYBfgHsAAoBiwFVAnoCywIqBF4ExwMyAx8EogXhBTcG0QbhBuAG2AVpBOAEBwWQBC4DlQLIAu8D1ARvBaQFkgbtB4YJGwkuCWwIlwdtBvEEzATWBTsH+QjyCiYLSgy0C+oKzQqqCZcJRgi/CPgIqgezBjcHQQgZCQYKvArPCDIHpQfDCKcILQlCCJ4G8QSCBVsG3gXwA1oDGwMDA9kB6QB7AHgAdABzAHgAnADhAMoAEgGoAS0CBAFYAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAEAAQACAAMAAwADAAQABAAFAAYABgAGAAcABwAGAAgACgALAAwADAANAA4ADwARABIAEwAVABcAGQAcAB4AIAAiACcAKgAsADAANAA6AEUAUwBkAJMAkgCiAMoA+wBGAZIB/ADTACIBfQGEAf0BUgM5A8sChQN6BEcFQwb1BT8FPgVkBjQFvAPOA50EsAOPAmsCkQO/BdoGPge1BywI8wjvCSII9QZWBt4FyQSDBPcEHwaCB8MIQwr3CewKAgqXCUsJjgiDCKUHswe4CIMHSwYxB+MHlQiACYAKCQqRB8cGtwdMB1UIEweHBuEEggTTBJoFUAWHBBUERAMZAvgAeAB1AHEAbgBuAHgAowDBAP4AKAEzApwBuAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAQABAAEAAgADAAMAAwADAAQABQAFAAYABgAHAAcABwAIAAoACwAMAAwADQAPABAAEQASABMAFQAXABkAHAAdACEAIwAlACYAKwAvADQAOQBBAEwAVwBmAHMAhQCyAOQABwFvATMBxgD3AC4BvgEPAh4CvwJrAwIEUAQPBZgF9ASOBKgEKgbRBMIDNAMSBC0DQALVAsEEvQYICCoIZQiZCDMKyArUCE0HDgf2BQIFFgQfBaUG/AZYCBQIJQg3Ce0I6gfCCCkIhQYzBzMIDQjGBjUG8gYRCE8JHgq8ChEKhwclBmoGCQcmCPMGaAVGBc0DyAM2BOoEmgPEAh4C5wG5Ad8AfABzAG4AagBrAIAAqgDRABMBxAEuAiwBkgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAEAAQABAAEAAgACAAMAAwAEAAUABQAGAAYABwAIAAgACQAKAAsADAANAA0ADgAQABEAEwATABUAFwAZABsAHQAgACEAIgAlACkALQAxADgAQABGAE8AVwBhAHMAkQDPAOIAFwEFAcMAOAFxAeAB5wIIAyQE9wMSBOUEeAUWBZQEKQR+BPsF0wR6A7sCBQNoAjcCSgMlBRAHWgY0Bn4GvAfXCe0JPwglBxMH3gaoBUAEVQXBBTkG2warBWkGGQewB34IQQnLB0cGowaLB7sG4AXTBtQHZggZCT8K5QqtCTAI3AaoBQoGggafBpQEEgQ6A6AC1QIYBOACCwImAfgARwG3AIYAfABzAGwAZgBqAJwAvwDkAGcBfQJ3AYkA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAEAAQAAAAEAAwADAAQABAAEAAUABQAGAAcACAAIAAkACwALAAwADQAOAA8AEAARABMAFAAVABYAGAAaABwAHgAgACEAIwAoACsALwA3ADwAQwBGAEsAVQBlAH4AqwDQAPEAywC/AFMBsgEpAioDtQOrAyYD6AN3BEoEpgTRA7ADqQTdBbQE3wPOAjECCAK6AjMDgQTSBesEaAU5ByMJ0gpOCl4JhAgDCNMGagUJBMcEkgSNBPkEXgWMB68Idgn/CfwICAiBBgsG+QYBBsUFZwa8B4EIxwhHCUIKxQqRCcIH0QUTBRoFXwWNA48DyANPAx0CLQK3AS4B6AC9AK4AmwCMAH4AdABtAGcAYgBvAIwAswAnAcgBwAGfAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAAAAAAAAABAAIAAwADAAQABAAFAAUABgAGAAcACAAJAAoACwAMAA0ADgAQABEAEgATABQAFgAWABcAGAAaABwAHgAhACQAJgApAC8ANAA4AD0APwBGAFEAXwB1AJcAyAD9AMYAtwBIAagBzwFhArgCqALhAmgDYwPYA/kDJgO3AwEFgQV5BJoDGwMGAnUCwQNKA+EDfwRiBLgFXAeACccKmgrhCc0HKwaZBWEEvAPzAwwFyQX9BR8HeQjuCWoKmAlFCEgHIgZVBVYGkQWMBWoGmwdvCKYH1QgjCjALMArPCJkHbAaFBOUDhgQ1BaQFLAVjAw8D4QIEA0MCWgHMAJMAhwB8AHUAbgBnAGEAcgCNAKMALAEYAWQBzQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAAAAAAAAAAACAAMAAwAEAAUABQAGAAcABwAHAAgACQAKAAsADAAOAA8AEQASABMAFAAVABcAGAAaABsAGwAbAB0AHwAhACQAKQAuADIANwA5ADoAQgBPAGUAmADTAOYACAHKAKkAFgFsAXUBmgFGApYCRwKoArICSgNWA+MCrwNCBQkF+gPRAogC0QFtArMCxwJmA78DewVkBhwHcwhiCCMJeAn6BxcHUwb5BKUDxwTbBRoGhAfnCD4JKQnzCPYIfghuB4AGIQV2BQgFowU4BpoG7wZeB54IaAl/ChUKJAqGCU8I/AVXBH0F0wYjBs4GWQWzBNIDBwPEAvsBNwGOAIUAfgB3AG8AZwBgAFsAiQDtAFsBLwGpAEYA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAQADAAQABAAFAAUABgAHAAcABwAIAAkACgALAAwADQAOABAAEQATABQAFgAYABoAGwAcAB4AHgAeAB8AIgAkACgALAAwADQANgA2AEAAUABpAJsAywD5AB4B2gCaAO8AJwEYAT8BKwLWAu4BEwIyAokCtAKmAkcDsgSDBIYDRQOmAsIBIAK1AmIDXwQ2BVAFkwXoBNYFIgf3CE4JaAd9BtQFoARcA0IEtwT7BDwHDAigB6EHjweLB0IHHAaRBbgE6wTHBRsGzQanBqUHXwiyCOQJ2ArSCQcJsQmzCf8GKAXWBU8HHgfxBuMERgNyAmoBOAH6AM8AkwCJAIAAeQBwAGcAYABZAHQAxgBlAXMB0QBtAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwAAAAAAAAAAAAEAAgADAAQABQAFAAYABgAHAAcACAAJAAoACwAMAA0ADwAQABEAEgAUABYAGAAZABsAHAAdAB8AIAAhACEAJAAnACkAKgAtAC8AMwA9AEsAXwCIAJ4AxgDwAL8AkwDAANAA7gBhAVYCyALmAcQBGwIjAkECrQJQA6wDfANaA+8DlQKlATsC+wKOA2IFrAVrBHUE9AN4Be8HSgiNCEsJVgjjBvQEewNCA40DiQQpBokGWwb5BfIFaQZHBU4E8wRiBqAG+QX/BsUHUgdgCBIJ2wnvCi0LfgruCMMIlgnNCCMH0AYUBpYGHQYeBRADegHJAYQBuQEJAbwA0ACXAHcAbgBmAF0AVQBeAIUAzwBuAecAtQBrAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMAAQAAAAAAAAAAAAEAAwAEAAQABQAGAAYABwAHAAgACQAKAAwADQAOAA8AEAARABQAFQAWABcAGQAaABwAHQAfACAAIgAjACQAJgAoACwALgAxADQAOgBFAFcAgACvANAA+wC5AI0AsgDlAOAAQgHhAUUCmgG7AbwB6gEyAqUC0AKOAnsDOgRkBJ8CmgHjAXECCwRCBQsENgN5A0QEEQZvB7UG+wcuCogIPgdzBc0EYwSOA+gCqQRiBJ0ESwTQAxwEEASABT4GnAfkBvsGtQdfCF8IAwlbCeYJCwt+CjYKzwl5CH4I2Qg5B7YGDgXcBeQF9ARKBHACtAGTAkcDRAISAmoBnQBxAGoAYQBaAFMAbQDBANgAGwEsAS4BjAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAABAAMABAAEAAUABgAGAAcACAAJAAoACgAMAA0ADQAOAA8AEQATABQAFgAXABgAGgAcAB0AHwAgACIAJAAmACgAKQAtAC8AMwA2ADoAPwBMAGcAjwC+AAEBsACIAJkAvADWAOgASgHFAXsBYwHEAR0ChQKiAlYCEwIRA4wEggQDA+MBmQGpAh4EKAQBA+0CkQT0BdQG/gUxBmMInAkqCiMI9QY0BskEBgOZA50DRANGA0QEfwSoBe8EuQZdCIkIFQiHCLwIygjiCEYJ9QkxCuQKhQqSCQsJfAfIB1cHMQeWBrgEswTNBEwEJANCAp4BpQJHBJYDgAIaAXYAagBlAF4AVgBQAG4A7ABBARIB6wDhAMAArAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAQADAAMABAAFAAUABQAHAAgACQAKAAsADAANAA4ADwAQABIAEwAUABYAFwAYABoAHAAdAB8AIQAjACUAJgAoACsALQAwADQAOAA9AEIASABcAKEA7gAJAYwAggCRAKMAoQCzAB4BNwFpAT4B1AEpAocCgQLRAdUBnQKKA/YDgANFAnABZgLyA1gDagIPA5YEigbfBQkFxgZMBzkIuQjNCJoHQQZABbwDuwK5AuQD1gRlBgAG+AZmBs8HdQlsCdMIYQlnCWYJVAnnCdAKHQtHC8wKkgnaCIwH3waGBeAFjQUtBZQDFARRAxUCjAKgA+EEwASnAnwB3wBxAGQAXgBZAFMATQBUANEAygEvARkB1ADMALMA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgACAAEAAQAAAAEAAgADAAQABAAFAAUABgAHAAgACgAKAAwADQAOAA8AEQASABMAFQAWABcAGAAaABsAHQAfACEAJAAnACgAKQArAC4AMQA1ADoAPwBEAEkATwBtALkA5QB7AHsAkgCWAJgAoQDNAOQAGgGIAbYBvAHwAeoBcwHyAawCbwNvBGADdAJ3AeIBWgNtAwMCJgM6BMIEOAV4BMMFdgVbBvkGpQduBuQFRATyAqMCzwN3BRsG9QcCCJIIrghrCXwJfAjIB0sIDgmiCcAJRQqKCk8Kowr/CWgIwQfJBscG4AUOBHAEaAQeBLQC+QH/ApEEuwUtB8wFMQSqAo0BAQGtAF0AVABQAEsASQCnAIkBSwG9AMQAxQBdAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMAAwAEAAIAAQABAAIAAgADAAQABQAFAAYABwAIAAkACgALAA0ADgAPABAAEgAUABUAFgAWABgAGQAbAB0AHwAiACQAJgApACsALQAvADMANwA7AEEARgBMAFIAVwBnAI0AbgBzAIQAlwC9AKAAsADuAE0BcwGWAWUBdAFjAV4BGgJXAxUEGwQQA3ECiAGsAfoC/AIBApUCBQNOA6UEAATyAwwEBwVZBQ4GcgWJBHUEnwLgAkIFGwc0B1kH1weeB0MIIwljCN4HKQdpCD4JWwpXCngKYwrrCVcJdgicB4gGngUbBYUFvgMoA7oCoAM/AtICTwMwBTUGxgbtBAkErQP5AkgCJgFnAFoAUgBMAEYAXQDeAFYBjABkAFgAZQD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAMAAwADAAEAAAABAAIAAwAEAAUABQAGAAcACAAJAAoACwANAA4ADwAQABEAEwAVABYAFwAYABoAGwAdACAAIQAjACUAKAArACwALwAzADgAPQBDAEkATgBUAFoAXgBhAGUAawB2AJEApwCWAJ8A+QBuAXEBvAFVAS8BJgF5AdYBbQIBA4kDPgNQAooBTwHOAdsBsAGrAWoCYwLuAuICdQLTAjoEsAM2A2gDBAOCAq4CzQN5Bc8FwwVgBR0G0gRGBSsH/gfABu8G+gdSCfUJIwohCs0K6ArjCcIJ5wj3B5UGoAS/A50D2AMEA3kC2gLuAiEEnAUcB3wGMgTaAkUCBgLKAa4AcgBjAFoAUwBKAEIAWwArAb4AjAA9ACsA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAADAAQABAACAAEAAQACAAMABAAFAAYABgAHAAgACQALAAwADAANAA4AEAARABMAFAAVABgAGQAbABwAHQAgACEAIwAkACUAJwApAC0AMQA2ADoAPgBEAEcATQBUAFsAYwBoAG8AdAB3AIIAigCrABoBOwGGAcUBrQFdAQMBWAF2AdkBHgJiAn0CpgEjATMByAGvAWQBdwGEAXYBgQGvAcQB0gETA3YC4AEvAoECtAOZBBMFbwQVBDYEkwNMBBoEwwRHBckFDAaXB7cI5QgYCfQJCwqDCowK4QqfCWoHlwYvBYAE8AMiBfkFHQRwBEwF2AMNBdkFoQYdB+wFEASIAk0BdgGyAHoAbwBmAFsAUQBHAD0AyQD5AHwAVgAuAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAEAAMABAADAAIAAwADAAQABQAGAAcABwAJAAkACwAMAAwADQAOABAAEQASABQAFgAYABkAGwAcAB4AHwAgACAAIQAiACIAJAAnACsALwA1ADsAQABIAFIAVwBfAGgAcAB1AHsAfwCDAI0AlgAOARYBFwFXAfwBhwEpAQUBegGmAc0BjgG1AUYBJAGIARoC0QJJAhACiAGTAdQBLgL4AoACKwIQApcCxwKBAuoDlwNWAwgDTwOgAy8EJgXwBI8GGQacBXcG4QaGCBQIuwgaCWUJ9gk0CiMK7wj7BmkF6wSlBQcGeAWyBvIFJAXuBqsGxQUZBdsFMwbtBcgDlgKFAdwAmACKAH4AcQBjAFYASAA8AI0AXgHkAFYAbQD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAIABAAEAAMAAwACAAIAAwAEAAUABgAHAAgACQAKAAsADAANAA0ADwAQABEAEwAUABUAFgAYABoAHAAbABoAGwAcAB4AIQAkACcAKwAuADAANgA8AEMASgBPAFcAaACaAO4A3QCAAIYAiwCOAKAAugDPANgAPAHAATIB8QDhAAsBUQFcARoBGQERAS8BowERArgC5ALIAlECAgJjArUCdAQsBEIErwNKAzECgQKAAmECtgIEBEoFMgbWBQUHwwavB8MGgQZUB74HyQfYB/wHDwh8CI0JHwobCmoJ7gcPB18FKwasBzwHLQjIBzYGogZiB2IFOASJBKoFtAUCBW8DSwIrAaIAlACFAHYAZgBXAEoAPQBRAHMBYQGPACQBdAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAEABQADAAQAAwADAAYABwAHAAcABwAHAAgACQALAAsADQAOAA8AEAASABMAFAAVABcAGAAVABUAFwAaAB8AIQAjACUAJwArAC0AMQA1ADkAPQBCAEcATQBwANUAMAGCAVABxwCIAJAAlgCdAKwAtwC/AMYA4gDbANcA3QDkAOsA9AD9AAMBGgFPAQkCXgKfAjMD8wLDAiYCoAJEA2cEpQUmBiQFygOBA2UEQwOFAuACAAQcBSIG7AY5CN0IoQmMCQEJ2QhCCRcJlggACeMIewjkCMQJUAoFChEJZgfEBbgGbgi1CSUK1AmzBwgIuAf7BHUD9wNEBagETARSA74BzgCyAMUAqQBzAGMAUwBFADoAOgALAc0BBgEqAYMA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAEAAgACAAEAAgAEAAQABQAGAAYABwAHAAcACAAJAAoACwALAA4AEQATABQAEwASABIAFQAZABwAHQAfACEAIgAlACcAKgAsAC8AMgA2ADoAPgBCAGAAygAnAZ0BfwFEAQ8BwACSAJkAngCkALAAtgC8AOIA8ADeAOUA7gAKAUoBNQFrAbUBbQHfAYICpQKhAp0C9AKDAh0DeQP1BFUGAwegBc8EpgUYBQAD0QLLA7YDuwPDBD0G8wfYCZoLCAtkCoYJFgraCX4JFQq4CSIJQAn8CYgJ+Qk/CNUGFQb7B2oJPQqJCWwJ9QhaCAEHYgUnA5kDHQRaAx0DzAIiAQABkAHTAbQAYgBaAE0AQAA1ADEAmgBTAaoBHgG5AEYA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAEAAgACAAMABAAFAAQABAAFAAYABwAIAAkACgALAAsADAANAA0ADwAPAA8AEgAVABkAGgAcAB0AHwAhACMAJAAmACgAKgAsAC8AMwA2ADoAPwClACMBdwGLAV0BJAH/AOAAuQCcALEAwQDEANQA2AADASsBCwH5APsAQgGKAdcBbQLRAgcCgQHWAoQCkgK6AgYD6wKYAxkEOQVNBmoHYwYuBjYGTAUEBMoCMwSQBdkERgV1BisIYwpRDAIMCwtaCuwKHQtZCqUJ7glcCd4J1wnlCNwJ8wf6BtgG0ge9CPEJfAjAB38HBAdMBbUFSwPGAmMC/AFCAkoCLQExApoCOAIvAVcATABDADkALwArAFcAugDEAXsBHwGHAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAEAAgACAAMAAwAEAAMABAAFAAYABwAIAAoACwAMAA0ADwAQABEAEgAUABUAFgAYABoAHAAdAB4AIAAiACQAJQAlACcAKgAtADAAMgA2ADwAwQBkAY8BcgE3AREB7QDMALMAogAJATEBIAEoAfwAGgEoAScBQQEhAWcB/QG7AkgDnAMUApgB8gFRAtgC9QIYAz4DewNpBF0F/QYTBxQGhQZ5BagEwgPoAsoDSQUGB0EH4gd1CcgKfgraCkULqwuAC7cK9wmiCpcKZgpxCpEJawisCTkJjwh6Bx4IsQgMCsUIXQfTBa8FsgSYBJsD5wE+AikCWAE0AcYBPQOHAxcCzwBOAD0AOAAyACoAKAAoAHoAZAENAX4B1gD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAQABAAEAAgACAAMAAwACAAIABAAGAAcACAAJAAoACwAMAA0ADgAQABIAEwAUABYAGAAZABsAHAAeACAAIQAiACIAJAAlACgAKgAtADAAMgA6AJMAIgFeAUABGwH0ANgAvQChAJMA4gAYAUcBMgEWATABJAExATwBVgGtAbsC6gNqBLMDfALLAZ8CmAISA/MC8gLxAicDLwRoBNwFxwTPBJYGGgbnBSsE8QJsA2cFnQYYB0QIBwnwCM4Ibwh4CdIKTQuXCuwK5Qt+C7cKiQl7CNsH/QjLCWcJeAigCI4IbAl8CE0HMAaABOcDKQOiAjkC4gNKBP4BSgIwA/YDCgQPA9kBhwAyAC8AKwAnACUAIgBWAOwATQHtAKUAVgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAABAAIAAgACAAIAAQACAAMABQAGAAcABwAJAAoADAAMAA4AEAARABIAFAAVABcAGAAZABsAHQAeAB8AHwAgACIAJAAmACgAKgAuADAANwCNAA4BPQEfAf8A4wDHAKwAkAB/ALgA+QAYAUQBDwHjAOMA9AD7AE0BxAGCArQD6wP8AwgDBwKEAjgDLAPtAuwC7AL1Al0D6gPKBKMD4gS1BvYFLgUpBC0DYAM9BXYFpQb5BVEGfganBlEHDghYCYkLAgzuC0IL8ApLCkkJYAiZB0QI8AlnCrkJhAnFCH8IKgfzB1MIhAbIBbsDsAJbA7YEKwQAApIDmgSRBJADwwIhAmsBhAA6ACYAJAAiACAAJABsAP0ARwHeAGAA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAQABAAIAAQACAAEAAQACAAQABQAGAAgACQALAAwADAAOAA8AEAASABMAFQAWABcAGAAaABwAHAAcAB4AIAAiACQAJAAnACoALAAtADMAjQANASoBFAH+AOkAzwCnAIEAbgClANsA/wDxAPIAxADEAMQA5QAPAZgBXQLPArkC0QNxAz0CVwL/AtYCHwMJAwUDAgMAA1QDXgNEAyIFMQWhBQgGqAT+AkADLgQ2BaoF/QSmBAcG/wdvCU4KMAt/C2sLewt+C90K6gnSCN4HMQctCM4JFwsnC/4J3AifBwgGpwYgCCwGzQTpAkMEoQWRBYYDbALNA+8EEwV7A34C/wE3AZ0BEwEvACIAIAAeABsAJgBnAB0B2ABzAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAEAAgADAAUABgAIAAoACwAMAA0ADgAPABAAEQASABMAFAAWABgAGQAaABsAGwAeAB8AIAAhACIAJgAoACoAKgAxAHYA5QA5ASABCgH0AM8AnQByAGEAaQC2ACIBtgDGAKUAqADAAM4A7gAwAVwBsAGZAgUEbgNZAh0CfQL7An0DDQO7AvQCtwLeAqwCiQOXBAAEHAV2BEsEeQP+AuUDqgPaAxgEvwTeBqgIZQqZC+sLFAsICpQJewlkCdwI3QdPB+UGGwhdCcUKIQt/Cj0JCAgzBskFHQjcBjUE1ALxA/wFfgYDBbEDmwMnBRAG/QRAA/ACpQHPAMAAPgAoACMAHAAZABcAJADUAHcBzwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAABAAIAAwAFAAcACAAJAAoACwAMAA0ADgAPABEAEgATABQAFQAXABgAGQAZABoAGwAdACEAIQAjACUAJgAnACgALQBfAO8AawF1AUsBDgHSAJAAZQBcAGQApQDQAIMAmwCnAMwA4ADnAAMBZAHIARwCYALnA6EDcAI6AisCgQIIA+wCqwLPAo4CfwKVAoUDwwOxAycF/AQ8BfcD7AIjA3kEAQRWBH8EkAWcB8QJ3AmICkAKTQoGChEJDwh4BzcHhAZMB9sHTAm7Cg4LBAqkCQEICAboBO4FoAVRA60DkgOkBG4GwwUCBecD2gW3B6MGDgRvAlMCBAK1AHMAUgAnAB8AGwAXABIAPQADAQcB////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAACAAMABQAHAAgACAAJAAsADAANAA4ADwAQABEAEgASABQAFgAXABcAFwAZABsAHQAgAB8AIAAhACMAJgAmACoAVADUAGABigFDAQEBuAB9AF0AWQBtAI8AigCnAKoAsgDKANoAKgFhAV0BRALnAt8C2wN0A4gC2gJ3ArMCvAKaAqkClAJ6AmECfwLfAhgDJgNgBOwEagVnBCID+gNRBR0GvQVdBo0HKgknCXIIdAjKCKUJKwpFCY0IvAeWBnQGWwc9CJYJDws0C50KJwqyCfgHWQbLBMQDfQP1BC8FVAQUBiIHAQVOBPUF/QbvBjYEFQP5AdUBTQFyAIQAJQAlACMAHwAaABMAaAD6AFIA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAQADAAQABgAHAAgACQAKAAsADAANAA4ADwAQABAAEQATABQAFQAVABcAGQAaABwAHgAeAB4AHgAfACMAIwAlAEYA1ABxAYkBOgHvAKUAcQBaAFkArADgANcA8QDOAMMAzQDnAEwBzQE9AdMBSwL4At4D7QKpAi0DiAKxAg8DiwJ8AnkCZQJPAkUCWwJ+AkADnQMTBCQFwwPjAqYDVAQbBWQFQQZBCCsIrAcjB3kHDQk+CEMIOwnSCJMHawZsBtAHZggZCaAKTwuSCyYLBQqyCSUIogWdBRQFOQWBBq4GvgbuBtYFlAVjBgUHAghDBWUE+AKEAUABjADkAEUALwAtACgAIQAYABUAkgBHAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAEAAgAEAAYABwAHAAgACQAKAAsADAANAA4ADgAPABAAEQASABMAFAAWABgAGQAaABwAHQAcAB0AHQAhACIAJABKAMMAbAGDATAB2gCQAGQAVgBZALMAtwDcAPoA5ADcAOIA7QBKAQUCkAHPAewBzwL3A8gCVAIgA5YCjwK0AmACggJ9AlMCKAITAj4CpAKSA8UCxAO5BGAEEAMZAz0DgQR6BDAFHwcHByUGvQYpCAUJaAhHB5kHcgdVBywGrQbaB5oHpwh3CXYK4wreCQIJEgikBqEFPQYMBocFZAeYCC8IewhsB2MHzwciCL0IAwejBeUDsgICAa0AjAHNADoANwAwACcAHAASACoAYgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAQABAAEAAwAFAAUABgAHAAkACQALAAsADAANAA0ADwAQABEAEQASABQAFgAYABcAGgAcABsAHAAdAB4AIAAhACUAVwDIAFwBiwEeAbkAegBZAFQAVgBnALYAoQC5ANUA2ADcAAUBSwH6AT8CxAKcAjED7gPNAhsC3wLPAtUCkAJTApACqQKiAmUCLQJ+AjsCcAJjAjYDxwRkBC4ELARrA00DJQSJBR0GcwUcBtgGGgfVCHgIoAfEBhkG1wVoBqcGrwcHB2oHzQj5CXQKNwkMCH8HDwhaB/MGyAcDBz4IwgmnCakHLgeDB0wGKwc+CGMGrQW+BOgClwGnAAwBYQFYAD8ANQArACIAFwAMACMA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAMABAAFAAYABwAIAAgACgAKAAwADAANAA4ADwAQAA8AEQATABQAFwAVABcAGQAZABsAHAAdAB4AHwAnAGUA6wBpAXsB/ACYAGQAUgBWAFsAkwCVAKAAxgC8AMcA3ADyAFwB1wH1ARID2wOuA70DzwLlAZMCkQLFAp0CTAIyAnkCvwJRAgoCVwL0AS0CLANaA7MERwXjBLIEygM+A3AEbgXyBEMF2QUsBT8Glgc9By8HDwczBoAF1AYQB18HpQYmB/gIeQpwCgUKtQk1Cb8J1wgUCJYIywjfCCoJygj2BuEFPQa5BVIGowe1BX8EFwVIA4IBwgDrALQAWABFADsAMAAlABoADwAKAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAABAAMABAAFAAYABwAIAAkACgALAAwADAANAA4ADgAPABAAEgASABQAFQAVABYAFwAZABoAGwAcAB4ALgB3AOcAWAFhAdsAdgBUAFQAWQBkAL4A5gDIAOkA4gDgANoA6wAWAWYBCgK3Ar8DQQMGA6kCwwGJAkECpAJHAlEC+wHsARYCzAHIAdMB1gEVAnID4AQwBXQFVQUPBTIEMAP8A04F3QStBFME3gR7BuAGvgb1BVgFGwVkBSIG2gX4BWIGNAcjCTALxwtXCxsLygpuClcKxAlyCYYIrAh2CEsIPwdeBY0FFQWtBXAGpwQ8A3sEnAPoAacAjgBdAFcATAA+ADIAJgAaABAABAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAAACAAQABQAFAAYABwAJAAoACgALAAsADAANAA0ADgAQABEAEgATABQAFAAVABYAGAAZABoAGwAdACgAfgDrAEsBKAGjAFYAVQBYAGYAjADLAOAA/wArAQoBEAECATUBNgFhAR4CNQPtA1EDYAICAo4BFwIMAvoBagJvAj0CAAL4AcUBvQG9AdIBdwIbA30ELgQYBPgEaQVUBD8DsQPHBCgEEQRMBHAEcQUVBScF+wT4BMkFjQWVBSsG+AVpBmQHDgnZCrsLCgvQCpwK9QnACcAJNwk+CNoHPwe9BtYFzATlBAEFWwRpBO8DbAKjA/ICdgGxALAAjwBdAEwAPgAxACUAGgAPAAcA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAABAAEAAQACAAQABQAGAAcACQAJAAkACgAKAAsACwANAA0ADwAQABAAEQASABIAEwAVABcAGAAZABkAGwAlAHkA9QA7AdgAWwBSAFYAXAClAOQAxwD3ACEBQwF8AXMBNgFJAXQBxQHnAYUCaAPYA88CbALLAbYB6gHUAUYCpwI+AvEB0gGwAbUBvAHwAU0CkAI+A1UDcAO7BKMFnQSSA1wDGgR+BCYE2QNlBLkEHgV7BZsFsQXqBpsGoQZzBrAGSQfOB6IIAwrhC7ILGAtIC6cKeQngCFQIdgclB9YG8gVuBfYEDARmBIkDQAOJAtMBjwL8AdsAswCRAfABLAFtADoALgAjABgADgAHAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAEAAgADAAQABQAGAAgACAAIAAkACQAKAAsADAANAA0ADwAQABAAEQARABIAFQAWABYAFwAXABkALwB7APIA7AB6AE0AVABaAGAAfADYALcA5QACATgBcwFvARYBEwGSAf4BfwKVAlMD3ANDA1kC1AF5AboB8wEyAigC1QGcAaoBsAG+AcoBBQIdAkECjgI5Aw4E6QTwBWsFqATGA2cDgwOBA6UDLQTpBDAGDgeyBmsGuAdzCMwH+wZhB6IIRAk8CtYK/QsjC0EKGwpvCo4JHQmcCBAI1gYyBx8HpQYiBqcEgwQkA7oCqAFdAXEBBwHyAPQBPQKzAmsC9AA0ACgAHwAXAA4ABwD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAQABAAEAAgADAAQABQAHAAgACAAIAAkACgALAAsADAANAA4ADwAQABAAEQASABMAFAAUABUAFgAgAFIAlgDYAJ4AUQBKAFQAWwBiAHIAjACbAJMApQDGAPIA6ADBAM8ABwFRARQC9gHNAvoCcwLJAWoBaQGGAYQBzQGpAZABngGoAbMBwQHQAeEB9gEtAq4CCwQGBQIF8gRwBRkFLQVoBAUEPARgBOwDGgQ3BQcHowcmB40IKwk3CAAIEwiICQcKOgtGCygLIgp+Cd4IMQnCB+kHUgh8B30FjwUWBj8FkAXlBa4E0gIxAqYCkwH3AI8CgQJWAhwErQN2Ah0BNwAmAB4AFwAPAAcACQAEAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAQABAAEAAgADAAQABQAHAAcABwAIAAkACgAKAAsADQAOAA8ADQAQABAAEAARABIAEwATABgAOwB+AM8AtQBqAEQASQBRAFcAXwBvAIYAkACYAKQArgCiAKIAyADQAM0A3wAZAc8BeQKCAvABSQGZAZ8BWwG0AfkBwQGZAZgBpQGzAb8BzAHcAVUCywJnAsUCawMdBC4EAgQ8BG8EPwU/BVQFXwUeBHEEMgUlBsUHJAh3CN0IighcCLUIxgnaCr8LoArSCR8JsQigB/0HOgdeBtkGBAdLBbgEEAU2BKsEgwTQAy4DSgKNAckBOwKNA3cETgOxBMIDAgLZAD4ALwAkABkADwAJACcAHAAHAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAABAAIAAwAEAAQABQAGAAcABwAIAAkACQAKAAwADQANAA4ADwAPAA8AEAARABIAEwAjAFkAngDPAI8ASwA/AEYATgBVAFsAagCuAKMAjACZAJcAlgC7ACABhgFOARkBzgC3AYcC/gFeAWAB6wEQAr8BCQK+AuwB0wHrAcQBtQG7AckBAwInA4AD8wIGA5QCqgLzAjgD3wIwAycE4wRmBB0FPQScBMoF8wbfB60HegciB+gH3AiUCGwJJQqTC7EKmQnVCOYH8AaBBpwH4AXYBaEGcAUUBCwELwPEA9gCawLxAeoBBANXA0cDgQWeBtUFUQRoA0QCIwFvADgAKQAcABEACwAiAB8ACwD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQACAAMAAwAEAAUABQAGAAcABwAIAAkACgAKAAwADAANAA4ADgAOAA8AEAASABYAMQBzALUAsgBvAD4AOwBDAEoATgBVAFsAbQB4AHQAewCJAN8A+gBrAakBBwKQAekABAHRAf0BPwHRAXcCaAIgAl0CqAIWAhcC6AHdAcMBuAHhAbYCuwNnBKMDiwTWA1oD4gLYAm0DHwM0A/gDuAO7BDIEtAQWBlUGbQaDBt8FswXyBjoIiAcsCFcKRApmC20KqglyCD8H3gXiBq8F6QTnBKwENgPdAt4CtAKRAukB6gL8A8QEiwQrBHEFqgYEBjwEJgLHAZ0AdgBCACkAGgARAAwADQAXAAsABwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAgACAAMABAAEAAUABQAGAAcACAAJAAkACgALAAwADQANAA0ADgAPABEAFAAdAEcAgwDJAKMAYQA4ADcAPgBFAEkATwBXAHMAjQCNAKsA4wAeAS8BigE5AmcC9wEfAeUAXwHRATQB9wFMAo4CqAK9Ao4CXQJZAh4CAQLmAcoB9AF7AmMD6QS0BDsF8QQYBIQEZAT4AwIErwNqAx4E7AM1BGsE2AQZBUQFXQXvBEwGogdKCAcHFAgeCSkJoAoRCl4IGAdyBn0FMwW1BNwDAATdA1gDUgOaBKgEQQNfAoEDygS/BVAFnAW6BhkHFwVvA34BWQEHAdUBPAGBABcADwANAAwAFQAXABYA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAEAAgACAAMABAAEAAUABQAHAAcACAAJAAkACgALAAwADAAMAA0ADwAUACYAMgBbAJkAvACMAFIAMgA1ADsAPQBFAE0AUQByAMoAyQDbAPwANAFSAYgBEAI7AsQBMQHnAAUBdAEoAdkBrgFEApQCnQJ4AkkCkQI4Av8B9AFJAmsCmgP6A8IEbQakBvEFxQWCBsMFzQTIA0MEQwRqBHsELARyBIIEQwRqBJgEswTOBfoGBgeaBnMGBQfbBywJNgq6CDYIgQejBqAGWgUwBCoFrQV8BKQEigWCBVkE0AMpA1cEfAbIBugF2QbHB7UF0QMvA8UCxgGFA9oCEAFDABAADgANABEAHgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAEAAgADAAMABAAEAAUABgAGAAcABwAIAAoACwALAAsADAAMAA4AIwA7AFAAaQCoAKYAdgBIAC0AMQAzADoAQQBGAEgAegC6AMUAtgDcAAUBKgFQAZYBRwITAkcBkAGHAXMBGQFcAbYBQwIdAhkCsgJqApgCcwIWAigCmgJEAzgDJQPmAyIFxwb2BtQHFQc2BToEaARVBSkFigQ4BRsEHAWoBS0FgQRYBQgFGAWKBa0FIQalBroHFgjFCMAKwQo1Cj0J3geDBkIG1ATmBWoHzwVkBhEGNQa1BVQFmgQRBeEGdgeBBo4HBQi+BjIG+QRJA0ICUQP6A0ECkgASABIADwANAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAIAAgADAAMAAwAEAAUABQAGAAcACAAJAAoACwALAAoADAAQACwATgB4AIgAsgCTAGkAPAAqACsALwA2ADoAPgBCAGUAiwCeAMUA4AAGASMBVgGDAa4BCAJjARQCnwJKAlQBLAE2AXsBjAEmAogCjQKXArYCYgLtAt4C3gKvAoADEQUpBqkGXAZFCNUHHgZKBV0FVAbZBRMFqQXIBNAEXQbUBQ4FzgT6BXsG/AYkB+4H9gcWCXQJbwoPC8kLfQocCbEHnAfyBloFgwYoCMQG7QaHBiEHrQeGB3oGtQV1BlQHwwfBB5AGwgVxBrkG2AReBO4EBwT0Ad4AGgAVABEADAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAEAAgACAAIAAwAEAAUABgAHAAgACQAJAAkACgAKAAsAEAAxAFQAcQCjALYAfwBdADMAJwAkAC0AMAAzADcAOgBiAIkArgDUAOkA7QAGATkBagGLAbwBkwEdAjkDfAKUAV4BOAGZAWsBMALAARkCPgI7AooCtQLrApYCugICBMgEtQX8BQYGIweHCL8HXAY7BjoGhAYyBhkGpAWDBPIFzAbOBUIF8QTyBgUIdgg4CTMJJQrbCucL9wubC/IKJwqiCCgJuwcLBu8GoQi/B1EHtQiqCEMJLgiAB7EG7wUnB50IEAgEBuQEPwVgBlkGQwWEBJoESAKgACcAFwARAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAgACAAIAAgACAAMAAwAEAAUABgAHAAcACAAJAAoACgAKAA8AMABiAHsAgQCSAHYAUQAnAB0AJAApACsALQAwADIARACWAM4A7wCsANUACwEpAV0BaAGjAfgBOAJKA2ICMAJDArYBWwFlAW4BewGAAYcBmQHXASQCTQKOAswCygPJA0QF5QU0BXgFFwdlBxsGEgWnBMkFBgcYB8oFsgRwBfoG6AbQBRoFMQaqB9IIXgmbCVgJkgm4CosMcQxcDOMK3QnMCAYImwa+B8sIiAc8CD4K+QlzCVEJuwibB3MGzQZDCKUHZgaGBYQEVQXJBZUEaQMsBGgDxgFnABMADQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQABAAEAAMAAgACAAMAAwAFAAYABwAHAAgACAAJAAoACwANAC4ASABlAGYAZgBoADsAHAAdACMAJQAmACgAKgAtADsAcwCVAK4ArQDZAAABHQElAVQBmgEiAp8CgQM6A9wCeQKsAVwB9wFKAisC5gHhAe4BsAHJAfcBwgGjAqgCpAO2BH0FUQVYBLcFkAeuBlQFGQQ9BZQGNgeqBoUFPAXLBk4HJQZnBRwGegcfB2UIAwkUCAwJUArrCtAL9AvHC0wKdwmsCNYH9wh4CLYIAAjyCMMKpwqUCpYJFgjwBr8GCggMCF0HMgeGBfQDVQQSBIACcwNxA+ICPwEjAA4A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8DAAQABAAEAAMAAgACAAMABAAFAAYABwAHAAgACQALAAwADgAvADgAUwBFADsALgAeABYAHgAgACEAIgAkACgALwA4AEMAWACjAOkAFwHYAPsARwGJAaAB1gGMArkD0gJEAtEBlQFdAe8BZQKwAkoCUwIyAqQCGQLtAiIC6AEeAnUCtgL4AxYEywNWBRoHLgaeBNoD4wQDBkgHcwesBrQFswYOCE4HEgaTBfkFCwcpCEcIbgdHCMsIVAniCr4K9AsyDOAK+Ar4CYgJVQnqCSIJoQgRCwAMGwskCYgH9QZxBxEImgeyBtIFDgU1BNsCKQL4Af8BxQEpAgcCSAAOAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAEAAQABAAEAAgADAAQABAAFAAcABwAIAAkACgAMAA4AEQASABkAGgAaABoAGAAXABwAHgAeACEAJQAnAC4ANwBDAFAAcgCiANAABQFBAUYBRwGLAf0BgQKMA6YCLgL9AQgClQGKAR4CbwK5AnACXwLsAkYCYwMDBJACgALZAl8CrgIQAw0ERQWsBWgFJwSDA9MEqgVJBosGvgUgBsIGFghQB3sGKwbjBQgGlAb+BpQGuwbfBpAIIAqsCboKqgzaDKULDQrGCbgK2Qq4CeUIigqPCxoKcQjSB2kItQh9CHMHtAUZBJkDpALzAlcEawMCAgoBVwExArEADgD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwACAAAAAAAAAAIAAgADAAQABQAGAAcACAAJAAoADQAPABEAEgAVABUAFgAWABQAGQAbABwAHwAjACcAKwAuADUAQQBOAF8AxwA5ATsBDwEtAVwBZgHFAQgCIgPIAtYCzwJgAg8CmwEwAt8CKQOsAqQCXQONAhEDYwTSAx4ESQMoA9oCjwK4AiID7wMgBGoD5QOSA7YEtAVWBikFVgXYBU4H8gdRCGsHBgejBjwGbQb6BigHPgemB1EI9Ai+CoYMFQw6C4IK1gp7C0sLTwr0Ce0KvgrzCmkJgQjbCawKZwl9B3AFeQSfA0AEogSXBjwFUAKbAbwAkQERARgA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAAEAAEAAAACAAIAAwAEAAUABgAHAAgACQALAA0ADgAQABEAEQAQABEAFAAYABoAHAAfACIAJgAqAC8AMgA3AD4ASQBYALUAWgH5ANwA5gAKAVwBvwF0AlwDEgPtAngDuwKmAhYCyAHZAngDGgMQA3EDSwNRA0YEWAX+BBoEYwMqBKEDsQM4A1kDdQPxA1sF1APEA7UE3wRIBKwEVQV6Bp8HZgibCKAIHAg+CMQHjQgTCcMIgAnaCVoJBgpxC5sMcQtVC1EMAQx5C2oLCgtGCk0JggqQCcAIHwqNCtcH9AV5BQkGDQbqBVwHSwZ9BDoDNQMvAbQARQAfAAsA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQABAACAAAAAQADAAMAAwAFAAYABwAIAAoACwAMAAoACQANABMAGQAfACsAHgAeACIAJQApAC0ALwAzADgAOwBDAEoAUQCPABoB2QDnABIBEwFcAakBRgKOAi8DLwPUA4ADDwMLAvABqALMAgwD7QOiAwkE8QO4BAQGyAUbBJIE6gVCBcsDGQSYBTsFAAQoBnsFDQTQA+4D8wPnA1cEIgXnBZoHNQiJCfgJ+QmtCSgKHgpOCvAKKArECUkKUAsHDdQMVgwhDOsKQwr8CTYJQwj7CEkJ+wlqCUgKTglfBy8GOgZEB94H7wiHCKYGNwUfBFMCTwEtAccBrAAbAAwA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQABAABAAIAAgADAAMABQAGAAcACAAJAAoACQAFABEAGQAeADIAZgBJACYAJQApAC0AMgA0ADcAOgA9AEEASQBSAFkAfQCjAL8A5wD/ACEBPgF6AdQBtwJNA4kDzQP7AocCEAJKAloCBgM4A6ADcgQSBX0EoASsBSMGgAXaBEkGMwamBFUEWAboBVcEbgayBm4FAgW7BTUFRwQaBB0FlgZGB7oGhggvCRIJEwo4Cs8K0QssC5AKVwvcCnQKuguLDDYLaAqyCYUIygjbB7YH2AhWCIkJ4QpyCoMJwggZCKQHoQfUB48HFAjeBqUEuwOKAvECswIfA6kBgAAdABIACgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEABAAEAAIAAwAEAAUABgAGAAcACQAJAAQABwARAC8AUQB+AJMAXQA0ACwALwA0ADkAPQBBAEMARgBJAE0AVwBiAHoAuwAqAeAAHgFKAXkBFgLDAogCOwMuA+UDjgP3AnMCyQK/AncD2AOpA6sEcQTnA4sEHgVLBg8HvwVXBhEHlgVLBVIHdgZWBZ8FrwdiB+8G3gUCBZcFUAR4BN8FEwbQBRQHbAekB4cIfgmcChAMSwy5C50LZAqxCd4KHwugCYcIvAc0BxcH2wZmBxkItAdDCAEKBwqmCBIIrQhlCNAGBAYbBscHKAcSBr8FQQVhBJ4EsgQvA20BRgAZAAwA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAMABAADAAMAAwAEAAUABgAHAAgABQAFAAgAHABbAJsAzAChAGUAPwA0ADcAPABCAEYASQBNAFAAUwBWAFsAZgCWACsBawEPAR8BOAFmARcC4AJmA34D1QKJAzYDRwMbA48DcQO/A7YEVQRCBSUEogPlBLUFlwbXB8kGxAZDCIAGlAatByMIAQdyBbEH0ghOB/AFRAbwBmkFSQS5BAsFzwWaBoIH7giICcgKPwunDHYMjQtyCpUJVQl1CtoLCgspChsJqQd8BkQGDAcNBhAHJgepCBQJ1AhyB9wHvghfBx0FzAUCBy4IMgiFBv8F2gXsAy0EVQMdAVMAFAAKAAMA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAQABAADAAMABAAFAAYABgAIAAQABgAJAC4AhwDxAOsApQB0AE4AOwA+AEMASgBQAFIAVwBaAF4AYQBmAHEAlwAvAUcBHwEyATMBZQGGASgCjgLRAswCuwK0At8CsQJxAzYEtAQpBTkF5QSEA7wDvgSWBQcGcAcNCKEHjwhbB1UIVAhJCbwHLAYcCNoJLAhsB4cHFwZCBbQElQT3BVAH3wfxCFUKywrYC/8LxgsiDJALiQpwCcYIdgloC24L+glOCQIIPAfGBQQGBgXtBS0HZAb2BywIiwaaB5cIMQeFBDIEcAWbBp0GtgXVBBQG8ANZAgsCkAAwAD8AGwAOAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAMAAwADAAMABAAFAAYABwADAAYACwBRALQABAHsALQAggBbAEQARQBMAFEAVwBdAGAAZQBoAGsAcgB7AJcA2QDwABQBTAF2AdwB9gHpAQ8CNAIdAvQBJwJyAmICwgKjA4EEvgQ2BL0DBwPZAyAElARJBmwHiQjcCLoI8QiwCQ8KhwkuCFUHQwhkCpYIzgYjBlQFmQUIBboEpgVCBqYGtAccCQkLCwspC5YLJwwqC8wJOgkzCOAIDgpBCoQJHQgHB98F4QUaBgwF9AQUBmgF6wb+BtsFJQdBBy8GAAUOAy8E7gTtA+EE+AOEBI0DIgGrALcAtwFZASUA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAABAAEAAgADAAMABAAGAAUAAwAGAA4AVgCmAO8A8gDDAJAAZwBOAEwAUgBZAGAAZgBqAG8AdAB2AH4AiQDBANwA6QAYAVkBwAFvAmICLQIBAtUBMgKoAhcC+AH9AR0CVAJHA7QD3gKfAqwC1QImA28EAAVABtcGnAccCNYHHgnUCsUKkAkICcIJCArzBwwGZwbwBkwGjgXaBHUFsAZ7B0kIgwlCCjoL8QoBC1oLkgtbCp0JSQgZCCMINAiMBwUHDgdpB7UHyQZ1BbAEmASNBNYFKAbkBA8FGQWfBAkEnAKkAkwDCwKWAhUCywHEAd4AQQGMAmED1AI+AP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAABAAIAAgADAAMABQADAAQABQAIAFMArwDmAPQA1AClAHYAWgBVAFgAYABnAG8AdAB5AH8AggCHAKAAwgDqAPcAOAFtAdsBxAK/AkAC9gHQAXwCtwLbAqICZgKjAqoCowKnAjMD7gNIBG0D3gIWA3EEqQVgBYMGewYuB44IYAl3CZ0KoQriCUcIWAcLBzcIGgiXBr0GsgU5BRkGXAepCGQJVAsDDNwL3AudDGEM8gqwCfUIGAjOB78HGQhACXcJtgjPCKYHgAabBTIEIQSNBMQD8QLgAqACGQIGAuAC2gPlArMC/gHHAQsBRgFHAoQBYgHtAtgD7QD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAABAAEAAgADAAMAAwAEAAQABQAsAH0AvADmAOsAuwCIAGgAXQBhAGcAbwB3AH0AgwCJAI0AlQDbAPoA6QAKAToBbAHxAbgCewIXAs0BrwEVAmUCvAIwA+8CIQP2AnwCywL4Ar4DPwU1BdAD3QJqA6sEXgTcBJQF+gXKBp8Hrgg4CroLGgpiCdAIzwhzCbAIswf7BhwG6wW7BT0HzQgoCQcKbwp2C+EKQAxfDPkKEAplClMJEgnNCHMKNAoSCcYHdQfRBtAGbAXTA7YDSwN0AysDdgJSAvMCFAOyAnUEqAWBBCoEjgPNAgoD7wPeA2YB2QIdBKQB/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAEAAgACAAQABAAEAAQAJABZAHwAwwAFAdwAmgB2AGcAaABvAHcAfgCGAIwAkgCXAKMA6AA6AewAGAEkAUkBlQExAhwCCALBAacBFQIyAt8ChgN4A8YD9gI/A9YD9AOtA0IEmwWCBBcEFQNoA7UDjgU+B7UHZAj4CIUJhQp9C7MLRguTCusKhApQCZoIkwf2BuUG0wUXB4sIUgkNCW0JwQq3CRQLHgtfCnAJVwqzClMKfQqcCsQJ1ggmCM0HyQcqBx8GnwX6BD4EcQPHAwwDywJCBLQEFAQiBKQEJga2BooFgQUZBR8G4gTpAfwCYQRBA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAABAAMAAwADAAQAAwAEAB8AOwBRAJkACQEJAa8AiABzAHEAdgB+AIYAjgCUAJsAoQCqAOAASwFCASQBWAF+AaMB7QH7Af0BngGYAQAClQIbA6cDBAQWBGkDwwMZBOMEqAQ8BJAF0QWZBHAEIgNYAzoEAAVGBrcHqwekCHcJFAovCxEMtApSCjALsQl0CL8HggiwB0AGlwbTB1kJzAhqCZkJEgmmCsgK1gkXCckJygl1CocLxArVCl8K+gliCcwHwAaVBcgEbwRYBN8E+QQlA3IDmQR/Bc4FdgUnBQMFnQZ7CEQIoAezBrcDywEWA+cEwAP4AP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQABgAEAAMABAADAAMAAwAQACYANgB8APYAIAHEAJkAgQB6AH8AhQCOAJUAnQCkAKsAsADpAFMBfwFtAdoBLwLwAeIB8QHkAYwBlAHpAVwCnAIMAxAD6ANmAywEGQWaBQAFLwXvBUUGsAUfBesDugOHA5IDSgW7BowGWQjVB1kIJAoOCi8JIwmCCqQKpAnxCGAJRQgMB9sG+QdlCckIagg2CKMIpAqUChsK7AgQCbQJzAp/DPcLQQtvCrcIXgd0BvkFcQVaBmIFEAYJBmgEQgMVBFsEowR4BU0GiQazBmgGeQf2CFoI2AYfBDUCXQNMBZUDagKBAf////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8GAAQABgADAAMAAwADAAMACQAmADAAZADaACEB2ACpAJEAhQCIAI4AlQCeAKUArQC0ALkA4gB9AYUBgAHvAWYCBALTAdcBzgF5AY0B2AENAjcCeQLaAp0DmQOpBO8FUAb2BdgFCAcmB2AGzATzBHEFwARNBNgDbgScBRgGmwb5BrAI5ggpB8YH8QmCCQoKCQrnCJIIAggGCFIIWQmvCfQIxAe2CIIJBAmyCakIRwlMCnkLSAtMCm8JjgjmBwoHIAiYBosGAge5BiwGYgRgA1YDhAR5BU0FswX3BdQGwQfZBmsHNQjmBoMGzASpAnYDewUCBQ4F0wOvAfwA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BgACAAUAAwAEAAQAAwADAAYAHwAyAFgAvgATAe8AuACgAJMAkACWAJ0ApQCuALYAvQDDANcANQEuAWQBqQEIAhgCyQHAAbYBbQGaAc8ByAFPAkUCnQI7A9YD3wTxBfcG8AZ6BmwHPgi5BpMFmAURBtwFWwWhBIQE9wMDBPwElwWWBikHvAW0B9oJawhWCcMJhAjGB64H4Ae1CGsI5QgiCHoHeQjSB/sHggiiCLgJFwv7Co0LcAo8CewIJggcCYkIbwdiB/AHOAaNBNcDZgS5A+YEoQWPBg8GkwYEB4oHHgeDBxAHggWJBSgE0gK5AwcGXQeCBqoDAAMtAzcB////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwABAAIABgAEAAQAAwAEAAwAJABSAJ4A4gDaALwArwCkAJoAnQCkAKsAtAC+AMYAzQDXABQBeQGFAZMBCAIkArABsQGcAWMBjQGdAa8BzwH6ATkC7AKwA3QECwXkBcoGpAfLBwkICgcbBigHAAbCBooFhQZxBgIFiwRdBDkEGgXPBOME7QZjCKsHcQfICHUHmwc4B18H1wd0B5IIOgj6Bp0HDwmNCY0ILwlYCcYJTgqiCzoLJgo2CcAJ2QkNCdYIRAgZB6wFrgSEBK0EjANzBKoF4wakB6oHEwiuB4UINAjABgkGRATkA6YDkwV5B3UIdwdzBkUEmgJhAf//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgACAAUABAAEAAQABAAGACsAXwCUAMQA1ADJAL0AsgCoAKQAqACvALcAwQDMANUA4AD5AEABfwHQAe4BDAK9AakBdQFcAXIBmgHJAf8BCAJIAg4DwQOoBPcFnAazBj4GRwZLB9cHvQacBzwHFAcmB1QHKweYBdMGzwVrBFcEzwX+BSEFhAWcBc0F3Ab1BjkH9gZ9BvEGwgYwCDMIDwc1B3oIFArcCXYK8QnvCWcLwAttCyULugrBCwIL9AqOCeUHUAdEBtoEFwapBT0EBwQbBTYGSgdzBxgIXAjUCFUIlgZ3BekEgwXoBbsHTAdvBg8GgAZfBa8CcABCAKcA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wUAAwAEAAQABAAEAAQABQARAGEAogDDAM0AywDDALwAsQCsAK0AsgC0ALoAxQDQAOAA7wAoAZEBxgG9AbYBfwGHAU4BWwF6AZgBoAHOAeQBKwK2Ai0DEQQwBeoFJQUcBfEF6QZmCLYHKwjYCOsH3QhJCFAHCwZxB4YG3wSWBVQG2AXuBtUG7gb5BdQF9gWABhQGygUkBmEGDwf7BoYHvAYdCM4J4wrBCwELlAogC0YKOAohC6ELegyMC5cKVwmlB4IGxgVdBiEH9wU7BQoEPgR2BV8GzwbFB4EISwnPCFIIJAe9BYcG0AdsCOcFmAVyBBIEMwTZAb4ALAJeAnkB/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQAAwADAAQABAAEAAUABwBBAKAAyQDJAMgAxwDEALoAsACvAKYArAC5AMUA0QDbAOoA+wCFAaMBWAFzAVwBRAE9AVYBfQGnAcYBAgIxAicCeQJLA4ADzQPKBOsDkgUsBt0GaAisCAwJzwlnCcIJIQhQB1EIyAh2B7gF9wX4BskF0wZACB8JUwg/BxEGDgbeBS8GrAWmBdIF7QX3Bp8GeweaCEEKhwuOCxEKkAnuCVsJbglBC7YLkApxCYYIvQZ3BnYHowjzB0IHkwXuBJ0EzwXtBq8HFQhiCFEIwQegB+sHrge1B/UItwfaBCsEbARXAzMDJwI2AeMDIQRbASgA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAAgAEAAQABQAGAAgAFQB0AMUA1ADHAMIAwQC9AK0AnACeAKsAuADDAM4A2QDlAO8ABgEbARwBKAExATUBQAFiAaQB1gHoAQACHQJpAmECjAL6AgUEwwNoA1AEDQUfB8IHkQfsB8YIAwpICX4IcgijCdwINQe/BYkGfAhjB1oG9gYxCfMJ5giIB88HpwYLB5EG5QY8BuwFUAZ3BhAH9gccCUwKLguPChgJjAgACf8JXAtqCh4JMgh8BywHnAfeCRAK1AibB0EG/ATdBPkFzAaECFcIawe6B40GawbXBgMIgQnkCOMHkwRFA4cCOwKkATEB5wEhBCoEOQEwAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAIAAwADAAQABQAJABAAOgCXAMoAxQC6ALYArACKAI0AmgCnALUAvwDMAOAAEgE9ASkBMgEdASkBMAFFAX8BtwGcAYYBlAG2Af4BGAJgAioCBwPEAxgDCwNEBGMFBAeSBpUGTQb4B5YJxQnMCZwJfgkwCLIG5wamBhgJCAnDBvAGpggeCusJcgkoCbgHUwe0B8gHNgdYBuIFrQZyBlMH1gcHCdAKHQoHCTsITgmICtMKQQtLChkJVAjnCBIIKgrgCXEIPQeqBSgFaAVGBoMHiwhAB4sGWgejBc8F+QbGB/kHzgbBB4YGKgSpA54CAQONA+wDqQRABFcDUQH/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAAEAAUABQAEAAYADgAYACEAawC6AL0AqQCeAHgAgACcALEAugDBAMYA1gDsABEBPAGDAZwBYAFUAWwBhAGyAW4BegGJAZwBqAG1AcMB1QH8AUUCjAK1AjED4AMiBeEGbgUdBbwFvAccCcYK7QrHClMJ+gciCDgImgd4CdEIzgd9B0YH+QmoC5AKcglECdQHkgieCE4H+QYPBhIGFwbHBu8HgwjkCe4JlAjCB0sI4whyCSwL9gpQCp8JhgqTCTsKGQkZBwAGQQboBdkGSAcfCFoI3gYBBqIFmwQ4BdgFAwZeBrYFKgfUB1UGuQVBBBQFBwUNBBsE2APTA1cCVAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEABAAFAAQABAAJABIAHQApADwAfQCMAHEAZAB0AJwArAC0ALoAwwDPANsA7QAaAUYBmAG0AWABUQFQAU8BTwFZAXkBmgHvARkCDAIMApsCrwKnAkwCIQMkBIEESgVlBW4EgAU+BjsHKwnpCZ8JZwpTCfMIPArNCb0IVQpECbgJDwmCB6cIVgqeC3ELigkdCY4JAghsByAI6QY8Bi0GPAbgBsAHZAi8CYYIpgfgB0gIbAmRCSoLuQslDJQMQQu4CloJWQd+BrgHhQY0B0UICQh7B94FMAU2BTMFIgQHBL8EsgTiBaIHiwf6BuUF5wXEBCsEjgMsBIMDMgPtAA4AAgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAAwABAAQACwAVACAAKwA3AEIASwBWAHMApQC5AMcAzADGAMgA0wDjAPAACAEwAV8BWQE8AR8BKwE2AUIBTAF0Aa4BnQG9AdcBGQLGArwD8AKPAgcDEQReBPADuwNjBDMFZAY/CJYIxwgUCCgKkgpECsoKawqPCdIKxAqdClcJTAhECMsIeQp1CwgL0grJCWkIvghaCXEIbQcBB0gGTgaUBqQHhgjJB+UHOAmXCOoINQr4C1EMJw1NDGkKiQlyCIQHiAeQCLsHKQiXCLcHmgbCBWEGPwY4BcUEZgSUAwQFxwbCBuoFdwZJBEUE3QNUA/QCKAPgAloCqgAUAAoABAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAQADAAsAFAAeACcAMgBAAF8AgQCVAKAArgDDAOAA7QDdANEA4QDpAOQACwEXAfYABgETASEBLgE5AVoBsQHiAfUB9gEJAjAC5gL2A5wCdQKMA+sDbgNeAxMEdgVJBj0HJwjtBsUHWQdTCcEKTwuJC2AL2ArDC2MMQgsCCuwJuAkPCf4IYwogDKsLlwrnCbUJIwlpCMgH2AZjBvcG5QanBiAHUweGBy0IbgiqCfkK3QrfCoIL7wvgCrgJRQk3CAUJpwlmCKsHUQcPB7IGcgZgB+cGOwaNBD4EjgPiBHcFdQTNBNoF1gTZAu4C+gGyAY0BHwGxAC4ARwAcAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAgAJABEAGwAnADEAPgB1AHcAfgCKAJQApwC/AN4A/ADhAL4AvwDOANkA+ABKAVIBegFQAVoBigG+AaoBrgHIAfgB0gE4ArMClQOKAqwCFgP4AsMDfAQlBUQGDwc+CFwHJgbYBpwGEQiICcsKOAtiCuwLtAwcDcgL6woWC/EKhQnkCT4L4wvmC6sKkwnECHIHPQftBjUHmgaeBmoHXAf9BsIHWQi5B7gHaQnMCW8JYgpcCpsLKQuuCtQJYQkWCoMJ1QhnCBMIlgcZCL0H4QekBUcESAPHAs0CYwNqA90COQRuBKYDKALdAcoAdQB+AKsAmQBKAOEAqQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAABgAMABUAHwAmACoANABTAGgAbAB3AIsAnwCrALQApQCrALsAxgDWABIBBwEZAUoBVQFRAWwBWwFgAYsBpAHFAbcBHgKkAnwDdwJFAncCgQOTBEQEXwVuBdQFCgcrB6oFvgUNB4sIOwrHCkMKuwnlCp4L6AxJDBsMewtiCrIJ9wkNDAkNBAt2CTQInwcNCOII3QcHCJ0HxAZaBwsIaggrCegJVAnmB48IwghtCWYJ/wmdC2cM3QpNC9gKIQoVCnQKfAlvCZcIcgipCHoGgwTpA9YE1ANbA5MCaAJgAlID3QLxAd4AqgCZAQECqALiAiwBnQCfAVwB/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIABwAOABQAGgAgACsAPQBbAGgAbQBsAHEAfgCLAJcApACwALwA2wDiACQBSAFpAY0BbAEzAUEBTwFfAXYBdAHPAUEC0QK9AwYDpQK2AsICDAR8A1wEQwTIBSMHnQW3BN8FowfHCNMJMQnzCE4I5Qn0C3cMqwzEDEIL5Qo8CgsKzAtHDdoL1glTCDIJ+QkECgEJ8giTCIgH5QY2B6AHiQjXCUgKtggACEMIuQiDCf8KIwy+DBIMxQz6C0gL4gsjC+oJHwkUCOQGSgeKBfwEXgWoBUsGzwQQA4ICOQJaAmYB6ABWAdAB0gL5A/cELwP7ABwCFwMhApwA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMABwAMABEAGgAlADAAYwC1AGQAXgBpAHUAggCOAKoA0gDPAAwBNgEhASgBbgH3AQACkgFhAWQBjAGZAZ4B2AE6AgAD5wPPA7UDYgOUAs0C+ALUA48E/wWKBuMEwgS+Br8HxwhTCTEIiggICEIK1QpjC2gM4AwbDDwMhgtSCiELiwwADA8KQQkmCysM2Qr/CWsJvgjNBwYHhwdbBz4I0Aj2CdQJLQnPCHQJdwrQCl4MoA1+Df4Mkgx4C+0KpgrPCZoILwdxBowFKgWeBugG0gYWB08G8wMyAp8CbQERAWUByAE0A38DXQSEBd8DqAFbAkADIAN5Af////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAMABwANABcAIQAsADoATABNAFoAZwBzAH8AkQAFAZsBMgE0AYYBpgFNAXUB/AGMAiICsQFqAXUBYwFvAbUBPwIMAx4ErQSQBMQDegMNAwIDKARKBT4GNAZhBP8EMQe6Bq0HfggtB5IHsAdGCckJkQrgC9kLzgoxC+IL1ArMCkwMfAymCpgKQQwLDPwJpAgdCLEH2wdRB20I9gdnBx0IsgjmCTcK2AkWCYUJ+QpEDEENpw2bDA8LLwsJCqcJqAh8CH0HfQaBBXAF3wUZBpUFGwYmBhYD0wGPAccBaQEVA8ICzwInBEgFQgbGBOYDVQPRA/4CTAH/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAACAAYADAAUAB8AKgAyAD8ASgBVAF8AaQB0AJUAHgHjAaYBSgFtAa4BjwGFASgC1QK2AiwCpAFsAVEBQQGNAQkCjAKxA+UDLQRKBHwEWAOmAlgDvgOeBI0F4APmBFIG8QX5BqYHOAaHBjUHFQj7CKgKyguBCnQJqAqBC7QLIgt1DB4N6gtwDL8MQAv6CQcJUQnJCFcITweaCC0IkAdICAgJdAnaCIcJvQmmClwL9AsfDSwNnwuGCgUKGwpvCaUIOgijBz4G2QWdBF4EugSxBNsEswVkBM0CSAJfARUDAQRSBBYDNQQWBesFyQUzBVYEfQQFBMMCCwH/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAEAAoAEgAcACQALQA5AEMATQBVAF8AaACnAPsAhgECApIBewGMAawBqwHlAR0CkQKqAvYBZgFNATIBfAHHAYMCkwPGAvICjQNoBM0DCgPvAhkDZQMmBKYDbQQOBRwFDwdVBo0FPgeUCLMJHgqYCUoKQglMCR8LmgsPC2gLyAsFDZoNbw6QDUsMJAtBC38KbgkOCGoHOQizCBoIzgdfCEgIZwdACP0IVApdC5IMCg3aC7oLlAqNCWEJYAgOCPkG1wYeBkMF1wMyA00D0QMmBCsE1wOGAnsBqQFdA4EEWwUgBd8ESgVuBbUEPQSFBGQEwAOuAiIB////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwAHAA8AFgAeACgAMgA7AEQATABUAGEAmgDWACQBtgHrAXsBZQF6AbEBmQExAjUCzwJBArEBPwEqAZEBAgLLAu4CKgJDAmIDOgT0BD8EqANdBPID9APkA6cDrwOJBXkHCwdkBR0GmQcsCVMJYwhJCO8HqQlCCr4J6QmcCxwMEgxzDBoOSA2QDIMLFgtAC8IJXQibBxkJngmMCL8H4AfHB4AG4Ab1B84IzgmCC0MM6wrqCS0IeQeoB48H6gfZBqoGNwUPBI4D/QJsAokCOAMUA6ICHAI8AkECPgPOBG8FWgZJBn4FmwVxBH4D9gPQA6QCEAIYAf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAABAALABEAGAAhACoAMwA7AEIASgBdAIwAugDnAEUB2gGbAUQBUAFsAVsBfgGsATUCegLuAU0BJwFlAeMBZQLeAaAC9AKzAr4DwgS3BJgEUQWsBTMGYQXXA/AE4AW3BuwFBQXjBfgHgQhWCAoI1AaQBwMJ8AhRCJcJNgsUC5MK6QrjDKANvQx+CzAKXAnrCAEI9QeRCZwJLwgcB4UGqAbIBR8G3AaAB8MI1QpSC8EKmgmlCMAGcAZdBs4GYgVhBYkFFAT3AhwDBQNIAgcCEwIYArYBLQLjAtcDpwRjBS8GeAXJAyUEsAMRA7UDVgOuAq4BiwH//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIABgALABIAGwAjACkAMgA5AEUAaQCFAKUA4QAXAZIBsgFAASoBUwEwAQoBYgHbATMCyQFXARwBZwEQAvcB4wHqAmsD8QIzA7cD7AM1BC4FOgaXBjEFCwQbBGAEiQRTBOgEeAWfBt0HVQfBBjwGQwbDB1sHbAjKCe8JWQmiCMcJPAuSDZUMMgsYCkYK+AgbCaEISQnkCf8INAcGBoUFUAW3BYkG0gfRCGQKXQqICokKQwkPB7kFaAUtBc8EFgRSBEwDvANzBC4ERQPeArQCEAJlAogDCQMLBGIFdwTGBN8D6QKfAycC8wEvAjkC7wF9AZsB/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIABwANABQAGwAiACoAMwBFAGAAfADCAL8A7wB8AXABVgFEAcUBNQHwADYBqAFJAkMCjAEOAUYBvwGNAegBvgJmA2oDAQTqBO8EGgWLBGgFiQaCBmAFQQQqBG0EiASCBIwEGgWeBkwGmgUUBg0GQwarBrQHiAj8CKgImgiyCqkLGA31DMcLhgtcC4MKrArLCVcJ2wmvCCUHQgY3BdAE7wXHBkcHdgeWCL8JLAkJCo0IKwd8BpwFUQUrBRsEgAP7A6sEhAUqBY0ENgTsAiwCRAJYA60DFwRHBF8DHwMlArwBHAJOAeMA6QBzAQUBzgFwAbQA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQACQAPABcAIAAmADgARQBUAHkAugCYAMYAPwFzAUcBKQHKAUYB3wADAXcBIQINAoMBCgExAWoB6QGZAuQCDwOkAuQDkgXGBRwGlAUsBSIGHAdeBqEFigSmBCkGjwV/BQIFuwX8BWcG4QfJB6IHPAeqBikHUgevBxMJwwl4CgoLEQy0DMcMCQwNDNsLHwsPCpEJugfLBrwFKwWKBO0EKwZXBkEGoweTCG4IlQmqCH4IkQcyBlEF0gTeBE4E9AQxBWIGfQV1BHIDsQLHAnICfwK1A5oEowPEAi0ClAFiAVEBmgHeAdwA1ADBAEgBtwDWAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wUACwAUABoAIgAvAEgAaACJAI4AgQCwABABcAFAAQoBtwFbAekA1gBHAdkBJQL3AVIBEwFrAfIBTgIXAvgBqgK/A0gFAwUKBbAFFQYcBhgHigeQBl4FlQREBk0HDAdyBf8ELAXBBeYHgQm8CH4ItQcOCEUIvwcvCB4IvQgaCr0LRwxBC68K/AoUC78LUQvuCRsJywcNBzEGoAQ4BBUF9wW5BeEGYAeEB1YIKwk0CBQHBAZPBWYFBgV5BRUGqAVgBqMFKAQrA34DlgIWAz0DNwOJBMgD3ALtAUECdgIRAjUDhQLCAGwAlQBWAGUAugAPAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wcADgAWAC8ARgBQAGoAhQBgAHUAmADbAGEBMgHrAHcBawHjAMYAIgGpAfQBkwGpAfoANgGBAWwBvQGSApMCbgPWBOgDwwOvBBgGQwZLBygIEAeUBb0EggW8BloHQAa4BTgFUwYBCCEJ0QmRCcoIkwlHCeUIhAm7CUAJqgp/C/ELxQrCCVYJuAlKCosL6AnQCA4H2QapBTsFBARzBJAFBgWXBecGtwZOB3cIcggMCAkHoQZEBh0G7gX0BroG5wUUBe0DtQQwBAgDswPbAw0ErgRMBC8D9gH5Ao4DsAKGA6gCQgK2AYcAcgBaAGYACQADAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wYADQBGAEEAaABvAGwATwBvAH8AyQBEARgB0gANAToBuAC/AOQATAGEARMBVwECATsB5QEnAqkBcwJ+AgYDxgOuA2EDHQVtBaoE2gV+BksGyAWABcgFRwaGBkEGDQYMBqEGkQeVCNwIogkXCkEKMgpGCj4LNAsfCowKSAySDCoMCAuDCWoIcAkLC8EJ7QfkBvgFAwaLBYcEoQNfBHoETwULBhwGRAcVCDgJeQjsB3wHWwcrB+EGdgcpB+wFxAQJBTIG5wRfAwwEfwTcBC4E6gMgAwAC7wInBKED1QN6A/UC+gGEAe8AHwAPAAsAOAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAYANQAwAE4ASwA4AEQAYACLAOQAJAEEAcAAzwAVAZwAmQCcAMUA+AAWAeUAAAEYAaQBXAKoAbEB0AH0AUoCXALcAokDiwOVA/cEqgXVBcAFtQXYBRIGNgYyBi8GSQaWBvIGZwffBxgJrAniCBEJ3wnMCp4LwAu6C1YM8wvvCjMLUAkaCJYIxwlmCmYJzAdmBl8FoQQ8BMoDbwNeBGcF/wRuBfEGTQgKCUwIxgfzB2YHFwf6BukG+waeBeAE4AUsBgQFwwOiBCcFjgQXBCoDjALHAvACdATDBKoD3wIoAuwAsQB7AC4AGgAXACIAbwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8DAA4AFwAZACgAOgBDAFwAggCzAP4A5ACtAK0AwQB/AIgAkADuAH0B4AF9Ab0BKAFhARICJALvAUgCRAIMA3UDzAIrA3cDewPBBGAFnwWvBbkF0gXzBQ8GIQY0BlIGewacBsAG+Qe2B30IVwgMCNIIXwnkCekKvQsLC+0K/wm8CfoI+Qe/B7QI9AkZCrwIJAdSBogFGQWvBGwDagObBCAEugQ8BqAHvQhuCCkIgwhCCDsHwwbXBZ0FeQW/BXYGhAanBWMEwASSBf4ERQR0A3sD9QPVA14ERQVRBIcD+QL3AUUBtAArAM0AvACkAB0BYQH///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8EAAkAHQAhAC0AOwBRAGgAlwDBANQAmgCYAIAAeAB8AIEA4gA4AdABLQIpAnUBJgGJAfQBNAJ3AtEC1gOUBM4D2AMABdEEMwV2BZcFpQWwBcEF2QXzBQ4GLgZSBmYGGQZyBqMGAAdWB0UHVgcVCJQISQkRCoQKnwlFCggKOwnICM8HGQfYB20JkgrwCc0IeQfpBigG/QQJBPcCZgM0BDgFMwYJBzsI8QflBlwHQgg6CBAHJwYOBncGkQaSBvMGTgX0BCgFpgV3BbEE4AMRBOEEZgQCBdgFjAUWBbAE9wPYAm8BYwC7AR4CugFcASgCVgH/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAALABMAFAAhADUARQBgAHcArADMAIsAlQBtAGwAbwBzAKsA1ABIAe0BRQLTAU8BYQEtAt4CsAKlAnQDqgQTBeUE6QXiBcMFrgWiBZ4FoAWrBb0F1gX2BSMGYQa0BhgHwgdhB2AHZQd/B/8HIwm3CVkKJwplCY8I1An7CssKWQoRCT4HSQejCGUJaAlYCWMI1QYxBcAEfgRmA/sCOgRJBfUFpAaYBvwGsQYwBrMHPwhHB4gHvwY+B5IGaAdiBqcFdAUZBlQGwAU+BdkEAwXqBSoFMgV+BRQGiAQnA24DtgGUACcBBAL8AvYCbgJMAQIB////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAAYABsALgAvAEoAWABwAKEAnQB3AI8AYABhAGQAZgB9ANMAIAGtAWMCPgKJAVgB0gGXAtUCVANYAz4EYgUHBtoGPQdKBtwFpwWPBYgFjQWbBbEF0wUHBlsG8gYvCMAI1AjJCCAJ8AiRCB0J/AnACtIJuwgaCEYJaQqmCoEJYwhuB24GdwciCK0IswgGCUsHJQYXBmoFHATgAnQDNwTuBUkG/wW3BfIFyAW7Bq0HxgYoB6AH9QfLBqMHIQfPBpMGwQbxBvMG5AXhBTkGiQZ6BRIFSgUNBRIErQFbAesAUgF3AkwD9wJHAv0BHgH//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAEAAgACMAMQBCAFQAcwCbAIUAawCOAFkAVwBYAFsAYQCwANAAUQHxAW4C/wE2AWUBxAGiApsCEAPkA1QEVgUGBlQHTgbPBY8FcQVlBWYFbwWBBZ0FygUSBokGXwfeB10IDwg5CKQIjQhmCaQJ2gnUCYUIfAe8CGAJzAkRCvQI/wehBhYGcwd4B5sHWggbCMgHdwatBasEKgOzAu4DWgTJBVEFDgXnBMcECQZjBrYFvQWXB0sIkQcFCLEHTgeFB2wGwAW5BbQG7wVKBhsG5gQiBH0EeAN/A3wBhwFHAUUCqAOaA+cBDQHWAGoA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wkAMgAwACoAOwBYAHsAcwBeAGwAnQByAE0ATgBQAFIAhwCJAOwAhQEeAggCWgEVAaYB7AFGAvMCBQPAA0sEBQUfBsoFgwVWBT4FNQU1BTsFRgVYBXMFmQXABbwFWQZhBgAH2AbgBp8HrAjyCNMIzwgCCCgHTgj5B44IagnFCTsJIAg9BvIFPgZLBw4IlgdeB/EFywShBIoDbgLQAjIEiAVqBWQEMQQGBSQGhQVHBMoEfwYLCOMHJwjGB1EHrAaEBZkEgwRoBcUE+QQnBUcFewP7Aj8C1AGdAesBEQPyAQcD4AM7Ar4ANwAUAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8EADMARgA4AD8AVQBJAE8AXAB2AKoAngBqAEQARgBJAGsAWQCjAP8AnQF2AagB+gAkAZ4BwQKuAooC+wKNA3cEsgU6BRwFCQX+BPwEAAUDBQQFCAUSBSAFIQUEBbkFuAVoBrYFPwZRB34I+QdkCEwHHQe0BlYHGAjdCAwJJgkKCbUIvgdKB7UFsgYeB80GLQf2BkEF+wOUA/UCWQKVA+YE0wQVBJgDbAT2BCsEawNsBOcE2gbeBngHRQd6BuMF+AURBQQEdgScBGYEPQQpBaUDbwLrARIC2AIqAxwEvALxA2UDqgG0AJkAUAAgAekA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8lAGYAUgBIAFEAOgB5AGIAaACwAJYAlgBFADoAPwBgAEcAaQCrAP4AiAGxAQIB+wBvAUAC2QIHAlICEwPuA9gETgSqBLIEswS/BMoEzAS/BLEErgSyBKIEYQRtBH8FLQVzBf8GLwhtCIwHdgdCBk8GAwgsCHIItQjjBzwI6gj5BzcIdgehBVgGzgamB1YIiwf8BSEFswTbA0oC3gIOBO0D+QMAAxQD3ANGAwEDkAPDBAcGIgY6BvQGUgYbBeYEbQRIBLMD0AS7AwIE9wSPAx8C3AIOA7IDmATaBFoD7AN0AlEBKgFwAcEA5gFdAsoB////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////EABIAEcAZwBfAC4AUQBDAGIAiACOAIgAQQA1ADQAVQBUAFsAawDaAEoBpwE1AdcAUQEVAtMCLwLNAZoC8wLiA6cEiwRkBF4EgwSdBKMEfARRBEMEWARSBK8D8wNKBL0EBQanBoIHJggtBysG4QUbBwwIsAgVCYkI2AYjB0wIGAj1BgsGJQXjBWsHIQjcB1cHgwadBaADBwNrAmYCvgJRA9ID4wJjApsCxwLKA/wDZwR+BUIGNAUuBsMGzwXSBBoEnQNXA9UD+ALtAzoEWQO9Av4BCAPAA74EVwRtBIQEUgNaAokC9AG4AbkBsAHiAf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQAGABQAI4AawAsACgASQBjAIQAggBnAD0AMAAsAEkARgBNAGIAkgDVAFMBegHkAOMAZwFSAm8CmgHSAcMCPAPJA3kE8wPgA08EhQSnBD4E0QO2AxgEoATABBwFQAU6BbAFfgbgB1IHOAaaBaYF/AbhBl0HvwhCCLwGKQb8BkgHKgdJBTgFlgUfBpkGeQcxB5MFqARrBAwEkwM+Au4BYwJHAwwCXgJJAlYDlATeBIcEdwSXBcgEcwXiBZwGpAU9BeAE6gNHA90C0QL/AqYCOAI3AocCFQMwBDkDSgSbA+wC5QIbA0kCzAHoAKwBLQH//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wwANgBuAFgAIQAvAE8AdgCEAGEATAAyACwAJwAqAE8AXgBmAGAAjwD2AFIBOgGtAAABsgFTAhQCbgEvAkUCcwNbBBAD3gJWBIEENwUEBAADrAKxA1cFRQYmBmcGVQbeBg8HtQeYB8cG/QX9BLsFlwbqB9wH7QesBrIFUAWXBQQG5gQpBbQFsgZwBvEGSAefBhwGvQVABDID9AIwAsQCkgLQAQQCjwLoAzcEHQRCAxwEGAUxBPYDmAQmBawEGAQFBTwEcwP9AlADvgJFAvgCGgNRA74DoQOCAoUDTAMIArUBawJkAQkBdADiAMEA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8FABoARgBUAB4AGgBHAHEAcgBhAEgAKgAnACQAIgA3AD4AVABeAG0AmAASAfoApwDXACoB9gE9AkcBbwEEAj0DjwNzAzsCIAOoAxIFagSxA24COgOoBOAF0gTEBAIF4QWdBmUHcAdoBqEFGgXFBPcFeAe7BlcHuQfNBgcGzgTbBG4FiwYaB9YGfQfxBs0G6wYqBvsEuQMQBB8EcgL4AUwCkQEDAjgD2wMGA+oCAwPmAxUFIAQ9A8oD6QNxA/wC1AOVA4gCBgIjAxwD2AJRAwwD0AIsA7UC/wF6AqgCIgIlAf0BCwFhADsAXgB8AP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8gAEMAWAAWACQAQgBIAEAANQBnACsAHwAdACMAOQA4AD0AQABOAHAAkgC0AMMAvQD5AHEBQgKsASkByAGBAo0CGwNAAroCVQQbBckEzgOHAnsCGAT7BJIDmgTyBYcGYwexB8cHagetBgQG6wQHBRMGrwVmBosHGQbABMgE6gU4B/QGNAiRBygIPghuB+MGlgUkBS4FuARmA8ECEgLhAZ8BbAErAg0DSwJiAmYDxQTCBKAD1AKtAtgD6wJSApACDwPxApAB+QEDA9IC/AEYAgECXQPgAtQBmQGrAUgB2gBHAQ4BxgBMADcAQgAOAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////GgBIADsACAAmAD0AJQAiAD8ATQAfABYAFgAnAE4AVABlAFgATgBJAGMAmQD+ANwAqAAAAfMB1AEWATQBaAG0AQkCzAFeAiEDEQRDBXwEEANGAqEDDAQiA4QEqwUcB8IHxgbmBrsHpwchBjoFSARXBBAFXgbfBhUGjAS1BHsFrQbZBoIHrghYCPAH1wdSB6AGrAYXBrgERAQkBHEDIQOrAooBUQHKAcMBFAOWA1EEtgNcAyIDeAIwA0kDTQLSAcAC7wK7AWcBAQJbAlABUgEAAuEC4wIgAiwB1QDMAJ0AyAA7AU8AGAAXAA0AAAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQAJwAaAAUAMAA7ABQAHgAiAA4ADwATABoARABWAEwAZABYAGYAQgA9AGMAgADHAI4AwgBuAfEBAAECAXoBawGNAZ0BiQKZAw0FHwXqA8cC/QFTApMCxQIpBB4FNAabBicG2wUqB8QHlgZiBTsFGgQ4BOQE5AUmBUwEYAWiBY4FOwadBzIIRgdxBkEGiQd/B3sGjAWjBVgFnQTuAw8DRQLBAUoBNQGZAaMCpgLkA3oDAANGAloCUwIPAn0BgQFzAlACXAEiAUAB0wEFAdYB+wFpAQECvgG3ATsBAAGtAHUArgApAFUAKgAAAAQA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAAFABQACQAFAAcACgANABMAHAAoADcAQQA3AEgAQgBFADwAJABDAEkAawBpAHoAxQCNAYsB3ABuAU0CEQIeAnsCjgMxBbcElwOOAmoCJANxA2kDTQOXBLUEPAVZBcoFFge3BisHCAc3Bj0FTATWA9wE/AQ3BAIGRQfuBiIH9wc1B6oGJQU7BYgGdwbTBrMFHgXKBbsE1gNNAxMDjQLwASYBHAGdATYCgANLAysC7gEMAnoC8wEwAcwB3AF9ARgBswARARUB+wB5AVABpAAmAZEBLgEYAaoAxAAyADgAIAA+ADYAIwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAABAAMABgAIAA8AGgAmADkAPQA+ADoAKwA5ADYALwA4ACYANwBNAE4AWQB+ALAA8ABaAcYAFAHvAZUCTQK2AjAD4wPxAy0D6AFYApwCHgPsAzUD3AOgBI4EfQVzBicG4wW0BtAGeganBVYFKwTDAxYEyASHBaoHNAgNCD4IZgf1BacEqQQDBWsFrQZYBsUEgwXUBfEElQS9A84CtgGwAQ4BYAHfAeQBLwI2Aq8BVQGSAXgBXQFbAuoBFwHfAKgAmgCaAMAAsADMAIwAigCBAJAAbwA3ADIAEwAMAAgAAwADAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgADAAYADAAXAC8AOwA5AEoARAAtACEAJwAcADEAOQA2ADwAOgBeAH0AhQCgALIA8ADMAN8AUQECAqECQwJFAs0CGgPdAgcCsAGkAcUCFQN6AzEEjgXrBWwGxwW4BBYF6QXPBcYGAAY9BfcD5gPgBAYG5QZoBw8H+gapB0QHRgYpBfEDqQMIBccFyQWYBFUFsQWCBWgEAAPkAYQCpgKOARYBXwFVATUBeQE1AQYB7wA6Ab4BLwI9AoYBbgEmAZ4AcQC0AKgAVAA3AFAALwAsABAABgAJAAkABwAEAAIA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAAGAAsAFQAlACwAIgAqAC8AKwAcABcAHQAtAFIASQBeAFUAXwBtAGkAdACNAJoAwgAaAToBXgEUAkECygEgAqgCeAP/Ak4CcwEOAhEDOwO0A6cE8gV/BVIEbATdBL8E5gUcBgUFRQSNA/gDigUPBrQFbgW8BYgGzwYrByIH+wUpBYkDqAMkBGcEVASQBNsE4AS3AwIDOgIQAxgDlwJwAQoB/ADkABYBFgG+AAcB9AFjAm4CZQL0Ae4BVAGmAFwAUgB0AKQAPwARAAkABAADAAQABAAEAAQABAAEAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMABQAJABEAHwAkACAAIgAiACoAIAAMACAAOwBDAF0AZACHAHkAZQCCAHoArgCfABMBTQEbAREBkwEfAvABtwHmAVwCbgIvAlIBAAJAAjgCOgNEBBAFCQVfA4cDRwQoBUYGJwYcBkoFwgS4A6oEIAToA+QD6QSrBBwFLgZTBroE+wM6A+8DEwRoBA4FjwTIBIkEHwTJA7sCygK0A2ICpAHIAfQAxAC4ALoA1gAQAWwBXgFnAc4BZQEIAQIBxAB+AEcASgBNACIADQAJAAQAAwACAAIAAQACAAUABgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQACQATABQAFwAlABUAFwAPAAsACQAYAC4AUABSAFEAcQB8AFsAegBiAHEAhAC3AMgArQDsADIBbwH2AWIB1gHLAZUBlQE6AYgBUQLcAn4DuwMOBAME0gLGAyIF1ARDBQ8FXAWyBVkEaAMfAwsDDwMyAyIE5wNJBO4EHQXaBEYD3ANIBZIFyQUXBiYFMQX+BMMEhwSuAxUD0gPQApwCdwKUAeQAswCqAOAAvwCYANQAmADJAMoAXwCtAK8AaAA8ADQAKgAcAA8ACQAFAAIAAQABAAAAAgAGAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BwAHAAkADwAJAAIAAwADAAcAFwAqAEkAQQBXAGoAbwBfAE8AVgBUAGEAgwCbALYAwwDrAPsAXwE7ATsC8gEmARIBEQEiAhkDjgPxA8gDMQNLA7wCwgL6A4sDawTOA+4D9wQXBTkErgOfBMED0gIBA+MC/gJDA9ADjwR0A64DUAVCBUQFMgbgBXQGhQbJBYEF3gSFA28EbgPSAtgBSgFlAeUAoACPAI4AfgBwAGIAXgBRAD0ARgBWAC4ALgAqACQAGwARAAkABAADAAIAAQAAAAMABwD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEABAADAAMABQAGAAgACgAPABwANwA1ADIAOwBLAG0AUQBnAHsAbQCeAOcAxQDUAOgAUQEdAqkBJgFoAVUBsAGdAjwDjQOyA0ED/gKZAioCYAP5AusC9QJiA/MDgQVHBVUEFAUrBO4DWgNgA5QCZQKvAuUC0AJ6A9ID1QM4BFUFvgYnB6EHDwfRBsEFfwSLBDwDKAICAioCDAJDAecAqwCAAHgAbABfAFMASAA9ADMAKgAiACAAHwAbABUADgAIAAUAAwACAAEAAQACAAYA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQABAAFAAUABwAKAA0AEQATABkALABRAE0AUwB5AFQAVwBrAGAAWwCDAKkAvwDXAB0BkwGrAf0ACQIdAr0B1wFgAqMC8gL5AiUD+AL3ATcCfgK8AsYC9wOLBPoE+AU5BWoFfATwBJwEmgTaA5cDTwJgA8sDvwNvBG8EVQWzBIUFNAaWBu8FbwbYBv0F5wQfBPkCEANuApoBOgE0AckAsQBvAGgAXgBTAEcAPAAyACkAIAAZABUAEgAPAAoABwAFAAQAAgABAAEAAQAEAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMABgAHAAkACwAOABEAFwAdADAAgQB4AG0AfQBgAFwAVwBgAG8AWwB8AIwAngCrANgAEwHYAJsBDAIJAmcBhAE4AkYC+wHrAZMCnwK/AX0CzwOBAx4EKgWKBQsGtQYSBqsFfQVYBQUFsAScAz8CGwOiA3IEcgVDBVwG0wX2BUYGHAa7BI4EogUZBicF2wQOBFMDWAIWAtYBnQFlAcsAjQBhAFkAUABFADoAMAAnAB8AGAASAA8ACwAJAAcABQAEAAMAAgAAAAEAAgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMABwAOABEAEwAaAB0AJQBCAGMAcQBoAHsAdgBdAFwAZgB4AH8AbgB5AJsApAC+AMEAqwDsAGYBvQE2AQ0BoAGSAToBYgFrAaYBQAJAA9IDdQRYBNEDZwRwBR8GKgbBBdoFhASTA9wCSAJLAkgDbgSBBCwFXwY+B5IHNQcnBmgGPgXHAzkEXQX8BFEFygTMA4kCFwOEAmICJgEQARQBlABiAEkAQAA2AC0AJAAcABUAEQANAAoACAAGAAUABAADAAIAAQABAAIA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wkAFQAdACUALwA0ADsASQBRAEgAWwB1AIUAjQB0AHIAegCKAIMAiACZALYA1ADDAJgAswDKANEAwwD1ANsAFgFfAS4CpAF/Ad8CcwPEAzoE1gMbA9kDZARjBfoEYATaBDsEggOKAsYCeAP8A6EF4AUNBfEFrgarB3cGHAV6BfIEiAP1AzAFpAQDBVIFNASOA5gDgwLWAZcBDgKQAQABaQBkAD4AMwArACIAGgAUAA8ACgAJAAcABgAFAAQAAwACAAIAAgABAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8LACgAPQBBADAAKQAmAC4AKgAxADgASABJAIwAjwB9AHQAewCJAJIAnwDdANEAoACNAJkAoACiALwA3gDvABkBqAEKAnUCkAHTAVAC7gI7A9QCuwI7A8kDpgQ4BUIElgMYAzQCTgLLA7cEswTmBVQGHgZCBpYGlgYXBpEEawTEAx4DogOYBLwE9gMgBHQDewORAw8DIgOYAvoBpwH5APkA2wCoAGIAJwAfABgAEgANAAoACAAGAAUABQAEAAMAAgABAAIA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8aAEEAOgAbAA4AEwAWABkAIgAvADkASABzAHEAggB7AHwAhwCRALMA3ACnAIEAfwCDAJUAvwDtANQAxwAKASIBkQEcAlYCngGrAdMBHAKIAhEDvQNEBa8FmAVbBeAETAT4Aj0C+wMEBTMFQQUGBXAFEAfcBkUFhQS+A5UDOQNwA8MD7ARCBW8E2gO1A9sCJQOSA68DAwP7ASYBlAGzAWsBEQGVAEkAGwATAA8ADAAJAAgABgAEAAMAAgABAAEAAQADAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8LABYACQAWACYAJgAmACsAMQAzAE8AVQBhAHAAaAB7AIkAoACrAJ8AkAB0AHYAlACwANwAQAH3ALYA5AAPATIBYQEUAncCXQJQAioCfQJcA0oEbQWvBUAE3wOwAzYDNgLdAjgDQgOSA3gD3APiBEgGTQagBcEEpgPLArACqwNqBBoFUQVJBMUD6APXAuwCSAN+AxEDJAJQASgChgIeAoQB/ACTACcADwANAAwABwAFAAUAAwACAAIAAgACAAIABAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAkAFAAZAB0AKwA7AEYAPwBQAFEAWQBTAGYAigCTAKUAvACaAGwAaQCNANkACAEGARIBGwG7AMIA5wAiASkBagH5AYsCywLAAnAC8ALOA1wEpgV1BGsD9QLLAiEC5wF4Av0CRgOjBEoF9gT2BfAEnwREBX0EggOdAoICRgP7A54E4gNuA2ADwgKWAjQDIANaAt0BwgEeAggC9AEPAV8AKgAQAA0ACgAKAAgABQAEAAQAAwADAAIAAgADAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAEABsAJQAxADoATgBZAEoATQBGAEUAYAB+AI0AoQCnAJYAdgBeAGsAygAjAREBTgElAUQB1QCdAMQA0gAqAQcBaAGuASoCUwJJA2YDuAMXBBEF+gRsBK0DKQPvAeABoQObBBgF7AWSBvIFLgbjBLEDDAS3BE0EjANXAn4CxgP6A/cCGgN6AnECkgKgAmcCKQL/Af8B2wGDASsBzwBNADEAHQA8AAwACQAIAAcABgAFAAQABAADAAIAAwD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAgAOADMAPgBLAFAAVABFADQANwBEAGoAegB/AIwAhABuAFUAXAB/ALgAWgFsAXgBfQE5AfsAlgDJAM0A9AAZAQYBIAFWAewBcwLAAkIDdASsBO8DsgNOA6ICxgG6AfkCJASQBDAFfAaKBjUG0QQVBAwDFAPTAy0D3QL/ASsD+wJBAo4CUAKTAtQCugLaAtoCawJqAj8CGwLjAWgBvACzANgAogAaABEACAAHAAYABQAEAAMAAgACAAMA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAEACQBBADgAPABPADwAPABgAGYAYgBhAGAAbAB/AG0ATwBRAGMAfgCmANMA7gDsAPQA9gDPAJQAqQDGAMAACQEdAQ0BJQGKAboBNALTAkEDvwNZA7sCUAODA9ICpwE8AgcDrwPCBMgEyQSmBaoFdwT5A/4CbgJAAgQC0gEnAj8CSwKRAusCSAMiA34DeQN6A9ACvQKvAqoCWgKhAXsBdAHMAH8ALAAZAA0ACAAGAAUABAADAAIAAgAEAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAUAJwAuAE4AYwAyAFsAdABuAFwATQBHAEYASwBMAEUAVgCEAH4AjACmAK8AsgC3ALEA3gCuAJkAtADWAAoBlwGgAUEBTAGUAbMB/gFQAt0CIAMkAkwCowLcAp0B9gGjAukC8wInA6UDaARRBccF0AShAzEDmQLhAUoCYgPsA6sDdQN0AyIEmgNVBFAEJQQiA5IDVwMaA7ACvwElAeEAbwBZADUAIAAZAAsABgAFAAMAAwABAAEABAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQADAAgAFQAoADQAIAA0AFEARgA/AD0ANQAzADUAOgBCAFoAigCrAL8A2wCrAJcAogDIAKcAggCZAK0A4AAUASoBnQGzAdQBtAFgAYYBAQLxAZAChgK4Ab4BdgLSAUMBzAH3ASsC2wKSA1gEEwX8BckFQgReAwsCwwG3AiEDbQTlBIEEXgS3BDAE0AQTBZwEGQThA/oCSQJrAT0BXQEvAQ8BAAG5AEQAKwAbAAUABAADAAIAAQABAAMA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEABQAFAAkADgARABUAGQAgACgAKQAoACcALAA0ADgARACSAI0AqgCjAK4AyQCJAHwAdgB5ALAA0wDNAOQAOgGtAZABMgF8AWQBcgEvAUsBUgFdAT8BMwE/AbMBVAFCAVYCnwLCAgoDnwM2BJgE8QRRBSUEMQNRAvABowFwAoED+wSfBOoEIwUuBIIDMASzA+MDpwNgAvsBOAKcAngCIAK+AYcBwwB5AFMAXAAHAAMAAgACAAEAAQADAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAQABAAHAAwADwARABIAFgAZABsAHgAmACsALwA6AHoAkAByAHQAYwBlAF0AWwCFAKUAzAD+APsA/QAAASsBZAGoAf0A7AD+ADwBMQHxAOIABwGsAdcBZAEwAX8BigHIAfABMgJ8AsICogPsA44DvgSCBXkEiAP7AggCDAJyA5YEmwMQBK4EowOmAgMD2QIqBD0EdAOJA5EDfQMQAysCeAEBAfMAFwG3AGoAGAAEAAIAAQABAAEAAwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAMABQAIAAsADQAPABEAFAAVAB4AIwAnAD4AdQBkAD8APQA/AFYAWgCEALQA+gDmAAMBNgEqASsBCgEcARYBKgHJALMAPwFBAQ0BIwEnAQQBIQFuAYYBjgFNAosC0wEKAhEDoAOAA6IDdwONAm8DtQRvBeYE4AOXAp4B5gLhAuoCvwMABDwDLQI7AkwDMQR4AzED/ANiAwoEigPXAlQCvwGaAUoBsQBEABUADQACAAEAAAABAAIA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwADAAUABgAIAAkACwANABEAGAAcACAAKQA5ACwALgA8AEQAWQCtAKIAmgDcAAMBKgE+AUEBMwEnAR4BJAEeAfAAwwCUAIsACAGAAVEBIgElAT8BQAGxAfwBBgK3Ar8CLwLPArgDLQRyA0oCMQJgA5EDqQRfBIYDJAPkAYoBtQK8Ax4EiQNAAhMC/QILBCAEbAN6AtoC+gKbAx0DCgNJA88CIwKFAfsAnAA9AB4ABQACAAEAAAABAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQAAwAEAAUABAAHAAsADgASABcAGgAdAB8AJAA0AEsAbwCPAGoAbACfAM4A2wAEAREB8wAMASQBLAEsASYBAAH3ANwAmgB1AJ4A+QA5ATgBWgFMAU4BewHFASMCtQJTA98CswKEAyUDQANJAusBjALoAlME6gQTBM8CqAFIAecB6AIsA+4CxwFJAnEDWAP0AvwCHgIBAjsCegK+AsUDIQS0A7gCxQEHAQ0BFgHfACkABwADAAEAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAMAAgADAAUABwAKAA0AEQAVABgAHQAzAEsAeQBkAGwAmACdAGYAZwCGAJsAnwCuANUA8AAaASoBLwH/AO8A8gDcAK0AcgCDAMUA/AAeAY0BkQFyAVoBSwFeAQMCZQLGAscC6gJLAvEB1AFoAdIByAJtA7ADCgQHAyUCwwGAAXkBMQI6Ap4BXAGfAbcB7AHsARICpgLwAg8DGQPSA8MDwQOXA6AC2wExAjsCpAHuAEQACgAFAAIAAgD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAEAAwAEAAUACAANABIAIwA+AFoAcgCOAJIAowCeAI0AowCSAJQAjQDYANQA3AD+AAMBCgEpAQ0B6ADpAOoA5gDWAIUAaACaANIA3gCLAe4B0QFcAQwBAgFhAScCQgKnAQ4COALCAUIBKQIQAgsCeAIyA2IDcQOTAwgDWwIjAXABGAE3ATYBAwLhAeoBBgKsAv0CZgNWA2cDjQMUA5YCSwMoA9ECAQOgAjYCdwHnAE0ADgAJAAMA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMABQAHABQAOQA8AEEATQBeAHUAlQCyAMoA8QDvAN0AzQC5AKkApQDrAAUB/QA6AVcBPwHwAOUA5wDjAOUA0gCpAGEAfwDCAL4A4gBOAecB8gGBAf0ABAF1AY0BuQENAQUBJgGpAd8CCQOmAj8DFANQAlcC0gKKAukB1AA9Ad8BOALqAbcC4QKVAqgC5QL0AjYCeAJBAmACngIAAm8CUQOmArkCdwJHAswBhgGwAD0AEwAFAAQA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8DAAgAKwBeAEUANwA+AEgAVQBgAH8AhwCmANwA5QD7AAkB5ADhAMEAygAaAVABZwFHAQsB8QDgAOAA4QDeAMwAvABwAGgAlADBAJ8A0QBYAYgB5gHBARgBxgDNANQA3AApAcsBKQLEAiMDIgPRAhQCLgLEAbABpAFIAdQAOwLZAtMCZAL0AVQCyAHHAUUCkAIFAj4CSQLVAfcB1wGBAtcCkwIBAgUC7AEiAt0BIgHEAJkATAARAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8XAFwATgA0ADgAPQBKAGAATwBYAGMAcgCWALMAzADbAAsBHgEEAf0ALQEiAVkBDwHmAOAA2wDUANUA1gDHAL8ArwBdAHUArgCEAJYAuQDYAEkBigFMAcEAdQGtAe0BvQE3ApcCLgJcAgoDcwKoAUkByAG4AUYBwAAHAfkBswJhAsoBTgEaAm8BUQGAAQgCBAKqAQcCLALHAYoB5AEKAkMCsAH5AUACWgIcAvQBKgEEAcwAbQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////CwAtAB4AGwAhACcALwA4AEUAUQBeAGsAewCSAK4A2gDgANgA2gD2ABYBHAE0AQEB0ADUANMAygDKAMwAwQC3ALAAXQBTAHcAgQCYAJwAmgCGALwArAD0AOABPwKCAvIB2wHqAW0BLwJhApoCIQJmARIB7gBgAQsBmQBvAYoBxQF9AfUAhwEGAQYBRwHaAcQBfgGqAVkCJwLWAUoBdQGdAZYBeQIBAxUDGwNeAoABgAFXAegAUwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BgAMAA0AFgAfACcAMwA/AEwAWQBmAHQAhgCgALoAywC/ALgAvADRAPcA+QDwAMMA0ADMAMAAwQDCALsArQCtAKUAWABiAKkAkgCNAHYAYwBlAE4ApABAAZcBGAKxARUB/ABtAUoC6gFsAq8CRwJhAqQBvwAVAYAAnwDUAJwBIgHpAEoBxQBJAYYB3wHDAXsBaQHPAcoBUQEhAZQBjAGOAaUBEgJQAicDVQPIAjYCxAEbAaYATAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEABQAHABAAGgAlADIAPgBLAFgAZwB0AIMAkACbAKwAywC9AKcArgC4ALwAyQCuALIAtQCxALEAtQCxAKUAowCiAGsARABgALoAjwBpAGoASwA8AGEAhwDFAPsAFwG5ANoAnAGvAVgBvgGJAgwC3AGYARgBogCIAMcAsADHAPYArgDIALcA9gAyAScBZAGZASMBvwEDAhYBQgEXAnQCCwIoAugBMwLPAtACBQPcAlACxQHBAF8ALgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wgAEQAUABsAJQAxADwASwBbAGsAegCGAI4AkgCaAKAAnwCUALIAvAC4ALYAogCgAKQApwCnAKoAqwCdAJsAmwCOAE8AQwBbAJgAoABXAD8ASQBqAHYAlQClAHkAdgCwAOQA7AD6AJEBTwLeASQBQAGKADsAewB5AfwBMAHsAMwA/gCjAPcA5gD3ACUBowE5AUUBSwH9AAYClwIFA+ICxQKTAlMCSAIPAoMCYQJbAhsCqAFYAbwAjQD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8EAA0AFgAcACMALQA3AEUAVABnAHYAgQCFAIAAegB9AIMAmgCrALgAxgDOAKUAnACdAKMApQCoAKoAmgCUAJQAkgB8AFMAOwA7AJUAvgBVACsASwCMAGsAWQBgAHkAeQByAMgA9ABwAagB2wEdAZUAVAB0AI0AcAEOAjkCIwJeAeMA4wC2AL8A4gDZAN8AEgH/APoACwHmAUECUAKIAiYDFwPZAnACPgLlAdAB8QH0AUoCPwKMAckAHwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8GAAsAGQAfACMALAA3AEUAWgBqAGwAbQBqAGoAcAB6AIcAlwCmALEAtwCgAJ0AmACaAJwAnwCiAJoAjQCNAIsAiwB6AEwAPwA0AEcAWwAoAB8AHQAuAFAAnADFACIBwQCEAH4AzwDwAFcBkAHkADsAUAB1AO0AhQHdAYcByAGUAQoBtgDfABcB4gAiAdwA2QDRANEAMgHFAYcBIwJGAu8CpALUAmkC3wH+AQYC9wFBAlMCLAIZAS0A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8KABAAFAAdACUALgA3AEEATwBSAFsAYQBiAGkAbwB9AI8AmQCkAKcAkgCSAI8AkACSAJUAmACWAIYAhQCFAIMAgAB1AFUAOwApACkAJQAgABsAJgBUAJMAzgAFAQ8BAAGAAE4AaACcAM0AnAAtACYAaADrAPwAFgFHAeYBjgFCAVEBOAHNAZYBnAGCAaUBjwEaAfQA/wBsAYUBBAI3Ai8CWQLnAewBowIlAg0CfgFpAasBkgHSAEAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8LABcAHgAlAC0ANQA/AEcATgBSAFcAXgBkAGwAcwB9AIwAmgCbAIkAhwCGAIcAiACLAI4AjAB+AH0AfQB8AHcAdQBlAD0AMgAoACAAIAAdABkAGABJAFMAgACrANsA9gB+AEcALgBDAEsAUwAmAEcATABxANcADgFSAZUBxgGxAdYB/QE2AiACOwLyAV8BlgFkAVoBJgE4AYIBrAECAqMBkgFOAoECCAJGAuQBJAHOAL0A2wABAUoA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BQAPABcAIQAqADMAOQA+AEMASQBSAFsAYwBqAG8AcwB5AIEAgQCCAHwAfgCAAH8AgQCFAIEAdgB2AHcAdQBxAHAAagBOAHYAjQBoACUAGAAWABAAEwAWABkARABgALsA4gChAFUAIwAZABYAJQCNAMEAtQDzAIYBrwG1AdIBegFJAU0BkAHQAakBEgLtASMCHALoAXcBLAFKAU4BkAGBAZMBxgECAuoBHAJcAuwBngGLAYcBGwHPAF0A////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BgARABwAJAAoAC4ANQA/AEkAUgBYAGEAZwBpAG4AdgB7AHYAeQBwAHUAeAB4AHoAfAB4AG8AbwBwAG8AbQBqAGgAWwBqAJoA0QBtAC4AGAAQAAsADAAQABwALwCNALEAigCdAFgAEQAPABMAOABxAJcA8gDuADkBpgHlAZkBGQHgAOcAjgE7AbQBbwK4At8CGwK8AbwBvAG3AXQBoQHaAZABhAGPAbUB8wEWApwBXQGIAakBSwH0ADcA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMACAAPABcAIQAqADYAPgBGAE0AVwBeAF8AYgBoAG4AbwBqAGwAaABsAHAAcQByAHIAbQBoAGgAagBqAGgAZABrAI8AcgDIABIB4wCTAEgAHQAQAAkADAAOABIAKAA9AG4AMgApAA8ADwARABAAFQAoAF4AzQB1AXMBPAFsAYYBQAG/AAwB9wCpAeIBOQKuAjQCGwL/AfoBJwIGAvcB+AG4AZ0BqgGqAdEB8wGQAekA4wAtAcUBxAEjAb0AWgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAgAEgAZACAAKwAyADkAPwBIAE8AVABVAFwAYgBpAGIAYABhAGAAYwBoAGgAawBpAGAAYQBjAGUAZABhAGIAcACQAJgAkAC8AAUB5ACAADcADwALAAkACgAMAA0AEwAUACMADAARAAsADgAjABwAFQAoAHkAnQCpAK0A+AAkAeoAtQARAVwBnAFjAYABygHpAYcBsQGFAcoBDAKOAboBAgLEAaoBtgHHAXABYAEDAZ0AGAEcAVEBIgFAAWYBsQCcAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8EAA0AFQAdACQAKQAyADoAQABHAEkATwBWAFwAYwBXAFgAWQBYAFsAXQBhAGEAXQBYAFoAXQBfAF0AWwBfAH8AfACfAKEAxAAZARgB0ABSAAoACQAHAAgADAAMAAwACAAIAAgACQAIAAwAGAAhACoAIwAxAEsALwBCAIAAJgHYAPQAGwFTAZUBdgEPATwBSgFIAVIBnwGXAR4BFAEjAZIBfQHvACcBnAEEAdwA7wCvAPYA2QDSAKsA4QAkAa4A0QDsAGMA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAIABEAFgAbACQALAAyADoAQAA/AEcATgBVAFsATQBPAFEATgBUAFQAWQBZAFEAUgBUAFcAWABXAFUAbQC/AJwAlQDEAIsAbwB2ALUAMgAIAAgABgAHAAoACQAJAAYABgAHAAgACAAZADAANABSAEUAVwA7AF4AWAA6AG4AcwCfAIUAsgC2ANEAOQHWAYgBRwETAXgBxgF0AekA3AAKAWABxwA8AZYBHQGqAMUAWwByAGUAjQBbAJwAhQBCAJwANgGHAE4A////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwAJAA8AFQAcACUAKwAzADUANwBAAEcATgBTAEcARQBHAEYATQBLAFAATgBIAEsAUQBQAFEAUABVAJ8AzgCwALMApwDEALAAUgAxABEACAAIAAUABgAHAAcABwAEAAQABQAGAAkACgAUACoATwCoAJ0AtQC7ANEAqACJAJAA2gDPAMgAAAH5ADoBWAF8AZQBJgE5AU8BggFoAaIAfQDWAJYA9QA3AfMAtwCOAJIAQAAgABMAFwA1AB4ALgB5APsATwAtAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BQAKABIAFgAcACQAKgApADEAOQA+AEYARgA9ADsAPAA+AEEAQgBHAD8AQgBGAEgASQBKAEkAZgC2ANgA3QDUAM0AwwDYALgAiQApAAkABwAGAAQABgAFAAUAAwAFAAUABwAIAAgACAANACAAcwDvAHAAmwC8AOAABwHKAB0BHgE+AUEBTAGIAToB/gD5APoALwEvATwBXwEqAboAcQBSAG0AjACrAH4AIQAdACcALQAbAAsADAD/////OABmAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIABQALABEAFAAcACEAHwAqADAAOAA+ADwANAAzADIANAA3ADkAOAA4AD0AQABBAEIAQQBJAGgAmgDYAPQA9ADsANsA2gDNAKAAXgAOAAYABgAEAAQABAAEAAMABQAGAAYABgAHAAcACAAMACIAWQCZAEkAPQBWAIkA7gBTAX8BvgGWAboB4gHaAU0BFQHvANcA4gAGAX8BiwFyAcYAagBFADQAOwA4AFkAfwB5AIoAUgAhAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BgAGAAwAFQAVABsAIwAoADQANQAyAC8AJwAoACoALQAtAC4AMwA4ADkAOgA3ADwATABrAJIAwADkAPsA+ADuAO0A4ACwAL0ASAAEAAQAAwAEAAQAAgABAAMABAAFAAUABgAGAAcABwAIAA4AIAAhABUAMgB6APUA9gBpARIC7wHbAW8B8AGrAXcBTQEEAQ4BwQAoAVcBTAE4AcoArwCdAGkANABXAK8AsACXAEwACgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8EAAgADQAXABkAIgApACoAKQAnABwAHgAiACMAJQAoAC4AMQAzADMAMAA5AFsAkwCpAKwA6gD7APwA+QD2AN8AkgCqAIkACQADAAMAAwAEAAQABAABAAMAAwAEAAUABQAFAAUABgAIAA4AEwAPAB4ALwBLAHwAOQFXAWIBJQFEAdQBTwIDAuQBcwFPAekAzwDPAMUA4AACAd4AqABwAEYAWACDAF8AWgArAAYA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAYACgANABIAGgAcAB4AFgASABgAGgAcAB8AJAAoACsAKwArACsAQwByAJ4AwwC0ANoA+QD9APoA6wC1ALkAdQBGABcABAAEAAMAAwADAAMAAgACAAIAAwAEAAQABQAFAAcACgAKAAsACQALAA4AJQAjAFsAfACvAIEA0gB8AfABpQG+AeYBxgGBASMBBAHqAKsA7QDtAIEAigCRAKgAnAB1AC0AKQASAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMABAAHAAoACwALAAoACwAPABIAFgAZAB4AIQAjACQAIgApAE8AgwCTAIkAugDRAO4A+QD5AO0A2wDcAI4AYQAfAAcABQACAAIAAgADAAMAAQAEAAQABAAEAAQABAAOABIAGgAUABAAEwAPABMADQAeAC0AQQCIANkA6QBHAf0AYQEiAdABZQLRAXIBRwEVAdsALQHCAL0A7ABnARkBqABVAEkA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wUABQAEAAgACQAMAA8AEwAYABoAHAAaAB0AKAA6AEkAXAB/AKEAygDzAOcA9ADzAO0A5QC3ALMAUAAIAAYAAgACAAIAAgACAAIAAwAdAAYABAAGAAYACAASACYAMQArADEAJQAmADUAEgAhABcAJABXAJsAwgC0ANMA9QBwAb4B/wGXAY0BCwGyAHsBEQH2AFgB2wGGAd0AaAANAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAEAAUACAALABAAEQAUABMAFAAcACoAPwBbAHsAoQC0AMMAzgDTAOsA7gDmAM8ArABzACkADgACAAEAAQACAAIAAQACAAMANgBcAEwAIwA9ADsAKQAmADYAMgBJACsAJgBGACoAMgAgABUAJABJAHYAYQCOANcA5AD2ABgB6ABUAUQBnAAAAdEBiAGNAf8BjgH2AGcA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAQACAAMAAwADgANABEAGAA3AF8AfAB2AJEAdgCkAK0AwADeAOQA4AC2AKIARgBZAD8ACgACAAIAAQACAAMABAAEAAgAMgAuAJMA1gC8ALEAnQBmAEwATQBGAGkAYAAwAFcAWQAmABkAHwBMAD4AOgBHAHIAcgCBAK8AxQDYAKIA5QDTATQCQgIbAmoB6gCsAEoA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wUABgAHAAcACAAQABcAOwBYAGEAPQBZAIsAoACVAKUAtQDWAKcAlgB5AKAAVwA9ABgAAQABAAIAAwACAAMABQAJAFEAjQB5ADEBWQFCAVgB0wBlAFcAdACZAGoAWgCBAEMAXgBDADMAJwAyAGQAPABBADwAPwBWAE0AUQBeACgBhwFyAfYBRQEtARAB5wBlAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8EAAUACQAPABcALQAfAEIATABOAFAAaQCEALoAvABkAJsAzwB9AHQAjwBDAAkAAgACAAMAAwAFAAsADQAtAMgA1QCyAOoAkQHPAUYBzwB3AIQAtgBzAJcAiABQAFwAXwBRAC4AOwB0AF8AdABwAGsAQQBiAGUATACIAD8BzADyALwAlACiAHIAJAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BwAHAP////8jAE8AdQClAGUAMgB5AOMABQH6AI4AHQANAAUAAgACAAQAKABJADEApABAAWYBUAFAASgBFwLxAVgB+ADyAOoAowC1AHQArgBhAG0AOgBFACUAOwA4AFoAcQBWAFAAXwAqABMAXwDlAJ8ANgA7AP///////y4A/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////zAASwBAAB0AOQDrALMBNQFwAAwAFAA6AAgABQAKAFYAvgCXAFMBhAHgAY4BuQFuAQcCaAL/AZsBJAHUANEAsACcAHAAgABbAD0ARAAMABAAMQA8AE4AUgA9AEoAFQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQACAAIABgAngD9AP0AWwACABMAWQCBACQAJQBaALMA3ABXAawBAwK+AQcCUwJIArAB9QH8AZkBNwHYAKQAvwCFAEgAOwBUADwAIwAOABUAMQBmAC4AFQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQACAAIAAwAGACAAQgBpABwAAQAjALoA6QCmAMQAKAFBATUBtgHJARQCYwKNAuACIwKXATIBFwExARkBOgEdAQMBnABNAF4ASwA8AC4ACAACABoAHgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8DAAIAAwAFAAYABgACAAUANQCiAPQAVwHMAR0CdgLXAfYBhgLPAssC4wICA5oCTQKiARwB+wCmAJYAmAC9AH4AZwCEAG8APwD/////AQASAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAQABAAIACQAcAEEAnwD0ALkB3AInA2MDiQKzArUDWwPjAnsCywLeAnIC4wF0AU0B9gCXAJwALgCFAIEA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAwAZACcANgBIAKUA5QCaAagCDwO4A/gC9wItA5sCNQK4AZkCHAPlAuIBeAHvAOYAAQFYAbIAKQAuAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8DAAYAFQAgAEQAbgCAAJEA8gByAVICKgN0A7YDuQIMApgBVQGWAR0CHgKsAXoBswC7AAIB5wBLAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8MAB4ALAA4AFQAbQCKALYARAHqATICxwJLAzoDLQJmASkB5QBWAa4BOQHJAHMAUQBdAGcAVwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8VACMAOwBZAHsAmAC6APQAKgF9ARMCfAIxAwoDaQKAAccA4wDwANAAdQA7ACsAGAD/////FAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8UACcAQQBkAI8AtQDEACoBeAFtAcEBsAKxA0QD6gHpAFEARgBEAB0ADQAHAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////DwAlADwAYgCBAI0AtwDxAAEBHAHiAUkC7QIYA0kCNwGAACcAEAAHAA4AEQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////FAAmAEEAWwCKAJ0ArwDzAGoBtAG5AS0CMAKqARYBzgCEACQABQADAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////woAGwA4AFIAYgB+AJEA3QAUAZ8BVAFEAYIBEQEQASUBtgCCACcA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////GQAtAEUAUgBqAKkA1gBaAeoA1wAhAQ8B0wAmAQgB3wBxAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////FAAjADUAQQBmAKwA4gCXALYA1wDLAMcA4QDnANkARwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////EAAcACkAUgB1AIYAYAB+AIcAfACJAJMAhwCLAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BwAfADMARwBIADIAYQBSAFwAWgBlAEIA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xoAIAAZADMALQBDACYARgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xcAIQD///////////////////////////////////////////////////////////////////////////////////////////////////////////////8=",peak:{e:245.65,n:2596.31,h:3947.46},max1k:{e:273.48,n:2697.66,h:3695.2},places:{taipeiBasin:{e:302.47,n:2771.42},linkou:{e:286.32,n:2773.58},lanyang:{e:325.9,n:2730.54},taichungBasin:{e:217.48,n:2671.67},bagua:{e:212.84,n:2644},chianan:{e:173.26,n:2572.17},pingtung:{e:203.75,n:2505.6},huadong:{e:281.7,n:2583.07},central:{e:265.29,n:2627.34},xueshan:{e:273.33,n:2697.13},coastal:{e:288.87,n:2577.55},yushan:{e:245.61,n:2596.33}}};var Sl=null;function kg(i=vl){let t=i.meta,e=typeof atob=="function"?atob(i.h):Buffer.from(i.h,"base64").toString("binary"),n=new Float32Array(t.nx*t.ny);for(let s=0;s<n.length;s++){let r=e.charCodeAt(2*s)|e.charCodeAt(2*s+1)<<8;n[s]=r===65535?NaN:r}return{meta:t,grid:n,nx:t.nx,ny:t.ny,e0:t.e0,n0:t.n0,peak:i.peak,max1k:i.max1k,places:i.places}}var Xi=()=>Sl||(Sl=kg()),Ho=(i,t,e)=>t<0||e<0||t>=i.ny||e>=i.nx?NaN:i.grid[t*i.nx+e];function Fe(i,t,e){let n=t-i.e0-.5,s=e-i.n0-.5,r=Math.floor(n),o=Math.floor(s),a=n-r,c=s-o,A=Ho(i,o,r),u=Ho(i,o,r+1),f=Ho(i,o+1,r),h=Ho(i,o+1,r+1),p=[[A,(1-a)*(1-c)],[u,a*(1-c)],[f,(1-a)*c],[h,a*c]],B=a<.5?c<.5?A:f:c<.5?u:h;if(Number.isNaN(B))return NaN;let M=0,d=0;for(let[l,y]of p)Number.isNaN(l)||(M+=l*y,d+=y);return d?M/d:NaN}function Vg(i,t){let e=[];for(let n=0;n<i.nx;n++){let s=i.e0+n+.5;e.push({e:s,z:Fe(i,s,t)})}return e}function Zi(i,t){let e=Vg(i,t),n=e.filter(A=>!Number.isNaN(A.z));if(!n.length)return null;let s=n.reduce((A,u)=>u.z>A.z?u:A),r=n[0],o=n[n.length-1],a=s.e-r.e,c=o.e-s.e;return{top:s,west:r,east:o,wKm:a,eKm:c,wSlope:(s.z-r.z)/Math.max(a,.5),eSlope:(s.z-o.z)/Math.max(c,.5)}}function bl(i,t,e){let n=(s,r)=>{let o=0,a=0;for(let c of[6,8,10,12]){let A=Fe(i,t+s*c,e+r*c);Number.isNaN(A)||(o+=A,a++)}return a?o/a:NaN};return{here:Fe(i,t,e),E:n(1,0),W:n(-1,0),N:n(0,1),S:n(0,-1)}}var qi=[[0,[96,150,92]],[100,[132,176,110]],[400,[196,198,132]],[1e3,[204,164,110]],[2e3,[168,124,92]],[3e3,[150,120,104]],[3800,[232,228,222]]];function wA(i){if(Number.isNaN(i))return[20,52,96];for(let t=1;t<qi.length;t++)if(i<=qi[t][0]){let[e,n]=qi[t-1],[s,r]=qi[t],o=Math.max(0,Math.min(1,(i-e)/(s-e)));return[0,1,2].map(a=>Math.round(n[a]+(r[a]-n[a])*o))}return qi[qi.length-1][1]}function ko(i,t,e,n,s=1,r=6){let o=Math.min((t-2*r)/n.nx,(e-2*r)/n.ny),a=(t-n.nx*o)/2,c=(e-n.ny*o)/2,A=(p,B)=>[a+(p-n.e0)*o,c+(n.n0+n.ny-B)*o],u=(p,B)=>[n.e0+(p-a)/o,n.n0+n.ny-(B-c)/o],f=i.createImageData(n.nx,n.ny);for(let p=0;p<n.ny;p++)for(let B=0;B<n.nx;B++){let M=n.grid[p*n.nx+B],d=((n.ny-1-p)*n.nx+B)*4,l=wA(M),y=n.grid[Math.min(n.ny-1,p+1)*n.nx+Math.max(0,B-1)],v=Number.isNaN(M)||Number.isNaN(y)?0:Math.max(-40,Math.min(40,(y-M)*-.08));f.data[d]=l[0]+v,f.data[d+1]=l[1]+v,f.data[d+2]=l[2]+v,f.data[d+3]=255}let h=document.createElement("canvas");return h.width=n.nx,h.height=n.ny,h.getContext("2d").putImageData(f,0,0),i.fillStyle="#14345f",i.fillRect(0,0,t,e),i.imageSmoothingEnabled=!0,i.drawImage(h,a,c,n.nx*o,n.ny*o),{toXY:A,toEN:u,scale:o}}function ji(i,t,e,n,{exag:s=10,e0:r,e1:o,zMax:a=4e3,mark:c=null,padL:A=38,padB:u=22}={}){i.fillStyle="#0a1226",i.fillRect(0,0,t,e);let f=t-A-8,h=e-u-10,p=f/(o-r),B=Math.min(h/a,p*s/1e3),M=10+h,d=(w,x)=>[A+(w-r)*p,M-x*B];i.strokeStyle="rgba(160,180,230,.18)",i.fillStyle="#7f8fb0",i.font="11px system-ui, sans-serif",i.textAlign="right";let l=(M-4)/B,y=l>2500?1e3:l>1e3?500:l>400?200:100;for(let w=0;w<=a;w+=y){let[,x]=d(r,w);if(x<4)break;i.beginPath(),i.moveTo(A,x),i.lineTo(t-8,x),i.stroke(),i.fillText(w?w%1e3?`${w} m`:`${w/1e3}k m`:"0",A-4,x+4)}let[,v]=d(r,0);i.fillStyle="rgba(63,143,224,.35)",i.fillRect(A,v,f,6),i.beginPath();let m=!1,E=w=>{let[x]=d(w,0);i.lineTo(x,v),i.closePath(),m=!1},_=null;for(let w of n){if(Number.isNaN(w.z)){m&&E(_.e);continue}let[x,I]=d(w.e,w.z);if(!m){let[D]=d(w.e,0);i.moveTo(D,v),m=!0}i.lineTo(x,I),_=w}m&&E(_.e);let b=i.createLinearGradient(0,d(0,3500)[1],0,v);if(b.addColorStop(0,"#d9c3a2"),b.addColorStop(.5,"#a9814f"),b.addColorStop(1,"#5f965c"),i.fillStyle=b,i.fill(),i.strokeStyle="#fff3c4",i.lineWidth=1.5,i.stroke(),i.textAlign="left",i.fillStyle="#9fb0cf",i.fillText("W \u897F",A+2,e-6),i.textAlign="right",i.fillText("\u6771 E",t-10,e-6),c){let[w,x]=d(c.e,c.z);i.fillStyle="#ff6b6b",i.beginPath(),i.arc(w,x,4,0,Math.PI*2),i.fill()}return{toXY:d}}var zg=10;function Il(i){let t=l=>i.querySelector(l),e=JSON.parse(t('script[type="application/json"]').textContent),n=Xi(),s=t(".gg-tw-map"),r=t(".gg-tw-cut"),o=t(".gg-tw-n"),a=e.lines.find(l=>l.key==="changhua")||e.lines[0],c={n:a.n,key:a.key};o.min=Math.ceil(n.n0+3),o.max=Math.floor(n.n0+n.ny-3),o.value=c.n;let A=null,u=null,f=l=>{let y=l.clientWidth,v=l.clientHeight,m=Math.min(window.devicePixelRatio||1,2);if(!y||!v)return null;l.width=Math.round(y*m),l.height=Math.round(v*m);let E=l.getContext("2d");return E.setTransform(m,0,0,m,0,0),{c:E,w:y,h:v,d:m}};function h(){let l=f(s);if(!l)return;A=document.createElement("canvas"),A.width=s.width,A.height=s.height;let y=A.getContext("2d");y.setTransform(l.d,0,0,l.d,0,0),u=ko(y,l.w,l.h,n,l.d),u.f=l}let p=()=>Zi(n,c.n);function B(){if(u||h(),!u)return;let{c:l,w:y,d:v}=u.f;l.setTransform(1,0,0,1,0,0),l.drawImage(A,0,0),l.setTransform(v,0,0,v,0,0);let[,m]=u.toXY(n.e0,c.n);l.strokeStyle="#fff",l.lineWidth=3.5,l.beginPath(),l.moveTo(0,m),l.lineTo(y,m),l.stroke(),l.strokeStyle="#ff5a8a",l.lineWidth=1.8,l.stroke();let E=p(),_=f(r);if(_&&E){let x=[];for(let I=n.e0;I<=n.e0+n.nx;I+=.5)x.push({e:I,z:M(I)});ji(_.c,_.w,_.h,x,{exag:zg,e0:n.e0,e1:n.e0+n.nx,mark:E.top})}let b=t(".gg-tw-out");if(!E){b.innerHTML='This line misses the island. Move it a little.<span class="zh">\u9019\u689D\u7DDA\u6C92\u6709\u7D93\u904E\u672C\u5CF6\uFF0C\u79FB\u4E00\u4E0B\u3002</span>';return}let w=x=>Math.round(x);b.innerHTML=`<span class="gg-tw-k">Highest point on the line<span class="zh">\u7DDA\u4E0A\u6700\u9AD8\u9EDE</span><b>${w(E.top.z).toLocaleString("en-US")} m</b></span>
      <span class="gg-tw-k">West side<span class="zh">\u897F\u908A</span><b>${w(E.wKm)} km \xB7 ${w(E.wSlope)} m/km</b></span>
      <span class="gg-tw-k">East side<span class="zh">\u6771\u908A</span><b>${w(E.eKm)} km \xB7 ${w(E.eSlope)} m/km</b></span>
      <span class="gg-tw-note">${E.eSlope>E.wSlope?`The east side climbs about ${(E.eSlope/E.wSlope).toFixed(1)} times as steeply as the west side.<span class="zh">\u6771\u908A\u7684\u5761\u5927\u7D04\u662F\u897F\u908A\u7684 ${(E.eSlope/E.wSlope).toFixed(1)} \u500D\u9661\u3002</span>`:'Here the west side is steeper.<span class="zh">\u9019\u88E1\u53CD\u800C\u662F\u897F\u908A\u6BD4\u8F03\u9661\u3002</span>'}</span>`,i.querySelectorAll("[data-cut]").forEach(x=>x.setAttribute("aria-pressed",String(x.dataset.cut===c.key)))}let M=l=>Fe(n,l,c.n),d={state:c,stats:p,setN(l){return c.n=+l,c.key=(e.lines.find(y=>Math.abs(y.n-c.n)<.5)||{}).key||null,o.value=c.n,B(),p()},pick(l){let y=e.lines.find(v=>v.key===l);return y?d.setN(y.n):null}};return o.addEventListener("input",()=>d.setN(+o.value)),i.querySelectorAll("[data-cut]").forEach(l=>l.addEventListener("click",()=>d.pick(l.dataset.cut))),new ResizeObserver(()=>{u=null,B()}).observe(i),B(),i.__cut=d,d}function Dl(i){let t={i:0,tries:0,first:0,done:!1,solved:!1,log:[]};return{state:t,total:i.length,question:()=>i[t.i],answer(e){if(t.done||t.solved)return null;let n=i[t.i];t.tries++;let s=e===n.answer;if(s){t.solved=!0;let r=t.tries===1;return r&&t.first++,t.log.push({q:t.i,tries:t.tries,first:r}),{correct:s,first:r}}return{correct:s,first:!1}},next(){return t.solved?(t.solved=!1,t.tries=0,t.i>=i.length-1?(t.done=!0,!1):(t.i++,!0)):!1},reset(){t.i=0,t.tries=0,t.first=0,t.done=!1,t.solved=!1,t.log=[]}}}var Yg={mountain:{en:"Mountains",zh:"\u5C71\u5730"},tableland:{en:"Tableland",zh:"\u53F0\u5730"},basin:{en:"Basin",zh:"\u76C6\u5730"},plain:{en:"Plain",zh:"\u5E73\u539F"},valley:{en:"Longitudinal valley",zh:"\u7E31\u8C37"}};function Tl(i){let t=l=>i.querySelector(l),e=JSON.parse(t('script[type="application/json"]').textContent),n=Xi(),s=Dl(e.questions),r=t(".gg-ft-k"),o=t(".gg-ft-score"),a=t(".gg-ft-msg"),c=t(".gg-ft-next"),A=t(".gg-ft-steps"),u=t(".gg-ck-opts");A.innerHTML=e.questions.map(()=>"<i></i>").join("");let f=l=>{let y=l.clientWidth,v=l.clientHeight,m=Math.min(window.devicePixelRatio||1,2);if(!y||!v)return null;l.width=Math.round(y*m),l.height=Math.round(v*m);let E=l.getContext("2d");return E.setTransform(m,0,0,m,0,0),{c:E,w:y,h:v}},h=l=>Number.isNaN(l)?"\u2014":`${Math.round(l).toLocaleString("en-US")} m`;function p(l){let y=n.places[l.place],v=f(t(".gg-fm-map"));if(v){let E=ko(v.c,v.w,v.h,n),[_,b]=E.toXY(y.e,y.n);v.c.fillStyle="#ff4d4d",v.c.strokeStyle="#fff",v.c.lineWidth=2,v.c.beginPath(),v.c.arc(_,b,6,0,Math.PI*2),v.c.fill(),v.c.stroke()}let m=f(t(".gg-fm-cut"));if(m){let E=[];for(let b=y.e-25;b<=y.e+25;b+=.25)E.push({e:b,z:Fe(n,b,y.n)});let _=Math.max(500,...E.filter(b=>!Number.isNaN(b.z)).map(b=>b.z))*1.15;ji(m.c,m.w,m.h,E,{exag:10,e0:y.e-25,e1:y.e+25,zMax:_,mark:{e:y.e,z:Fe(n,y.e,y.n)}})}}function B(){let l=s.state,y=s.question(),v=n.places[y.place],m=bl(n,v.e,v.n);r.textContent=`Question ${l.i+1} of ${s.total} \xB7 \u7B2C ${l.i+1} \u984C\uFF08\u5171 ${s.total} \u984C\uFF09`,o.textContent=`${l.first} / ${l.log.length}`,t(".gg-fm-name").innerHTML='The red dot<span class="zh">\u7D05\u9EDE\u9019\u500B\u5730\u65B9</span>',t(".gg-fm-here").textContent=h(m.here);for(let E of["N","S","E","W"])t(`.gg-fm-${E}`).textContent=h(m[E]);u.innerHTML=Object.entries(Yg).map(([E,_])=>`<button type="button" class="gg-ft-opt gg-ck-opt" data-pick="${E}"><span class="gg-ft-lab">${_.en}<span class="zh">${_.zh}</span></span></button>`).join(""),u.querySelectorAll("[data-pick]").forEach(E=>E.addEventListener("click",()=>M(E.dataset.pick))),a.className="gg-ft-msg",a.innerHTML=`${e.start_en}<span class="zh">${e.start_zh}</span>`,c.hidden=!0,[...A.children].forEach((E,_)=>{E.className=_<l.log.length?l.log[_].first?"is-first":"is-later":_===l.i?"is-now":""}),p(y)}function M(l){let y=s.question(),v=s.answer(l);if(!v)return null;let m=u.querySelector(`[data-pick="${l}"]`),E=[...u.querySelectorAll("[data-pick]")];return v.correct?(m.classList.add("is-right"),E.forEach(_=>{_.disabled=!0}),t(".gg-fm-name").innerHTML=`${y.name_en}<span class="zh">${y.name_zh}</span>`,a.className="gg-ft-msg is-right",a.innerHTML=`<b>${v.first?"Right on the first try. \xB7 \u7B2C\u4E00\u6B21\u5C31\u7B54\u5C0D\u3002":"That is it. \xB7 \u7B54\u5C0D\u4E86\u3002"}</b> ${y.why_en}<span class="zh">${y.why_zh}</span>`,c.textContent=s.state.i>=s.total-1?"See your result \xB7 \u770B\u7D50\u679C":"Next question \xB7 \u4E0B\u4E00\u984C",c.hidden=!1,o.textContent=`${s.state.first} / ${s.state.log.length}`,[...A.children][s.state.i].className=v.first?"is-first":"is-later"):(m.classList.add("is-wrong"),m.disabled=!0,a.className="gg-ft-msg is-wrong",a.innerHTML=`<b>Not quite. Look at the numbers again. \xB7 \u4E0D\u592A\u5C0D\uFF0C\u518D\u770B\u4E00\u6B21\u6578\u5B57\u3002</b> ${e.hint_en}<span class="zh">${e.hint_zh}</span>`),v}function d(){if(s.next()){B();return}if(!s.state.done)return;let l=s.state.first;r.textContent="Finished \xB7 \u5B8C\u6210",u.innerHTML="",t(".gg-fm-name").innerHTML=`You got ${l} of ${s.total} right on the first try.<span class="zh">${s.total} \u984C\u88E1\uFF0C\u4F60\u6709 ${l} \u984C\u7B2C\u4E00\u6B21\u5C31\u7B54\u5C0D\u3002</span>`,a.className="gg-ft-msg",a.innerHTML=`${e.end_en}<span class="zh">${e.end_zh}</span>`,c.textContent="Play again \xB7 \u518D\u73A9\u4E00\u6B21",c.hidden=!1}return c.addEventListener("click",()=>{s.state.done?(s.reset(),B()):d()}),new ResizeObserver(()=>{s.state.done||p(s.question())}).observe(t(".gg-fm-pics")),B(),i.__form={game:s,pick:M,next:d,reset(){s.reset(),B()}},i.__form}var Wg=5,Ze=10,Jg=[["yushan","Yushan","\u7389\u5C71"],["central","Central Mountain Range","\u4E2D\u592E\u5C71\u8108"],["coastal","Coastal Mountain Range","\u6D77\u5CB8\u5C71\u8108"],["taipeiBasin","Taipei Basin","\u81FA\u5317\u76C6\u5730"],["chianan","Chianan Plain","\u5609\u5357\u5E73\u539F"],["huadong","Huadong Longitudinal Valley","\u82B1\u6771\u7E31\u8C37"],["xueshan","Xueshan Range","\u96EA\u5C71\u5C71\u8108"],["bagua","Bagua Tableland","\u516B\u5366\u53F0\u5730"],["lanyang","Lanyang Plain","\u862D\u967D\u5E73\u539F"],["pingtung","Pingtung Plain","\u5C4F\u6771\u5E73\u539F"]];function Kg(i){let t=m=>i.querySelector(m),e=t(".al-space-cv"),n=t(".al-space"),s=JSON.parse(t('script[type="application/json"]').textContent),r=Xi(),o=r.e0+r.nx/2,a=r.n0+r.ny/2,c=s.lines.find(m=>m.key==="changhua")||s.lines[0],A={n:c.n,key:c.key,pick:null,labels:!0,cutOn:!0},u=t(".gg-tw3-n");u.min=Math.ceil(r.n0+3),u.max=Math.floor(r.n0+r.ny-3);function f(){let m=Zi(r,A.n),E=t(".gg-tw3-cut"),_=E.clientWidth,b=E.clientHeight,w=Math.min(window.devicePixelRatio||1,2);if(_&&b){E.width=Math.round(_*w),E.height=Math.round(b*w);let D=E.getContext("2d");D.setTransform(w,0,0,w,0,0);let N=[];for(let H=r.e0;H<=r.e0+r.nx;H+=.5)N.push({e:H,z:Fe(r,H,A.n)});ji(D,_,b,N,{exag:10,e0:r.e0,e1:r.e0+r.nx,mark:m&&m.top,padL:34,padB:18})}let x=D=>Math.round(D).toLocaleString("en-US");t(".gg-tw3-nums").innerHTML=m?`<div><dt>West side<span class="zh">\u897F\u908A</span></dt><dd>${x(m.wSlope)} <small>m/km</small></dd></div><div><dt>East side<span class="zh">\u6771\u908A</span></dt><dd>${x(m.eSlope)} <small>m/km</small></dd></div>`:"",t(".gg-tw3-top").innerHTML=m?`Highest point on the line: <b>${x(m.top.z)} m</b>, ${x(m.wKm)} km from the west coast and ${x(m.eKm)} km from the east coast.<span class="zh">\u7DDA\u4E0A\u6700\u9AD8\u9EDE <b>${x(m.top.z)} \u516C\u5C3A</b>\uFF0C\u96E2\u897F\u6D77\u5CB8 ${x(m.wKm)} \u516C\u91CC\u3001\u96E2\u6771\u6D77\u5CB8 ${x(m.eKm)} \u516C\u91CC\u3002</span>`:"",u.value=A.n,i.querySelectorAll("[data-cut3]").forEach(D=>D.setAttribute("aria-pressed",String(D.dataset.cut3===A.key)));let I=t(".gg-tw3-pick");if(A.pick){let D=Fe(r,...A.pick);I.innerHTML=Number.isNaN(D)?'That is the sea.<span class="zh">\u90A3\u88E1\u662F\u6D77\u3002</span>':`Height here: <b>about ${x(D)} m</b> (1 km average).<span class="zh">\u9019\u88E1\u7684\u6D77\u62D4\uFF1A<b>\u5927\u7D04 ${x(D)} \u516C\u5C3A</b>\uFF081 \u516C\u91CC\u683C\u5B50\u7684\u5E73\u5747\uFF09\u3002</span>`}else I.innerHTML='Tap the land to read its height.<span class="zh">\u9EDE\u5730\u5F62\uFF0C\u8B80\u51FA\u90A3\u88E1\u7684\u6D77\u62D4\u3002</span>';return B.info()}let h=null;try{h=p()}catch{h=null}h||i.classList.add("al-nogl");function p(){let m;try{m=new Po({canvas:e,antialias:!0})}catch{return null}m.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),m.setClearColor(462879,1);let E=new hs,_=new Ie(34,1,.1,400);E.add(new _s(12569574,.85));let b=new Es(16777215,1.6);b.position.set(-20,30,-14),E.add(b);let w={box:[-r.nx/2/Ze,-r.ny/2/Ze,r.nx/2/Ze,r.ny/2/Ze],h:(at,L)=>{let z=Fe(r,o+at*Ze,a+L*Ze);return Number.isNaN(z)?-60:z}},x=yl({M:w,n:r.nx,ny:r.ny,exag:Wg/Ze,color:wA,sea:-60});x.show("lines",!1),E.add(x.group);let I=(at,L,z)=>x.toWorld((at-o)/Ze,(L-a)/Ze,z),D=new xe;D.setAttribute("position",new pe(new Float32Array((r.nx*2+1)*3),3));let N=new fs(D,new Ui({color:16734858}));N.frustumCulled=!1,E.add(N);function H(){let at=D.getAttribute("position");for(let L=0;L<=r.nx*2;L++){let z=r.e0+L/2,ot=Fe(r,z,A.n),Et=I(z,A.n,Number.isNaN(ot)?0:ot);at.setXYZ(L,Et.x,Et.y+.04,Et.z)}at.needsUpdate=!0,N.visible=A.cutOn}let Q=new Oo(_,e);Q.enablePan=!0,Q.enableDamping=!0,Q.dampingFactor=.12,Q.minDistance=6,Q.maxDistance=80,Q.maxPolarAngle=Math.PI/2-.05;let V=El(t(".al-labels"),e,_),Z=Jg.map(([at,L,z])=>({k:at,el:V.add(`gg-lab gg-tw3-lab${at==="yushan"?" is-peak":""}`,at==="yushan"?`${L} <i>${z}</i> <b>3,952 m</b>`:`${L} <i>${z}</i>`)})),J=new U;function et(){let at=[];for(let L of Z){let z=L.k==="yushan"?r.peak:r.places[L.k],ot=Fe(r,z.e,z.n);if(J.copy(I(z.e,z.n,Number.isNaN(ot)?0:ot)),J.y+=.15,V.place(L.el,J,-10),!A.labels){L.el.style.opacity=0;continue}if(L.el.style.opacity==="0")continue;let Et=L.el.getBoundingClientRect();at.some(ct=>Et.left<ct.right+4&&Et.right>ct.left-4&&Et.top<ct.bottom+2&&Et.bottom>ct.top-2)?L.el.style.opacity=0:at.push(Et)}}function W(){let at=n.clientWidth,L=n.clientHeight;!at||!L||(m.setSize(at,L,!1),_.aspect=at/L,_.updateProjectionMatrix())}function $(){m.render(E,_),et()}let tt={south:[new U(6,24,42),new U(0,0,0)],west:[new U(-24,10,8),new U(0,0,-1)],east:[new U(24,9,8),new U(0,0,-1)],top:[new U(0,52,.5),new U(0,0,0)],yushan:[new U(-5,9,6.5),new U((r.peak.e-o)/Ze,.6,-(r.peak.n-a)/Ze)]};function it(at){let[L,z]=tt[at];_.position.copy(L),Q.target.copy(z);let ot=n.clientWidth,Et=n.clientHeight;ot/Et<1&&_.position.sub(z).multiplyScalar(1.35).add(z),_.lookAt(z),Q.update()}let st=new Ms,It=new Rt,wt=null;return e.addEventListener("pointerdown",at=>{wt={x:at.clientX,y:at.clientY}}),e.addEventListener("pointerup",at=>{if(!wt||Math.hypot(at.clientX-wt.x,at.clientY-wt.y)>6){wt=null;return}wt=null;let L=e.getBoundingClientRect();It.set((at.clientX-L.left)/L.width*2-1,-((at.clientY-L.top)/L.height)*2+1),st.setFromCamera(It,_);let z=st.intersectObject(x.mesh)[0];if(z){let[ot,Et]=x.fromWorld(z.point);B.pickAt(o+ot*Ze,a+Et*Ze)}}),new ResizeObserver(()=>{W(),$(),f()}).observe(n),it("south"),W(),{renderer:m,camera:_,controls:Q,render:$,look:it,setCutLine:H,terrain:x}}let B={state:A,ready:()=>!0,setN(m){return A.n=+m,A.key=(s.lines.find(E=>Math.abs(E.n-A.n)<.5)||{}).key||null,h&&h.setCutLine(),f(),v(),Zi(r,A.n)},cut(m){let E=s.lines.find(_=>_.key===m);return E?B.setN(E.n):null},pickAt(m,E){return A.pick=[m,E],f(),v(),Fe(r,m,E)},view(m){h&&(h.look(m),v())},demo(m){m==="whole"?(B.cut("changhua"),B.view("south")):m==="yushan"?(B.setN(r.peak.n),B.pickAt(r.peak.e,r.peak.n),B.view("yushan")):m==="east"?(B.cut("changhua"),B.view("east")):m==="west"&&(B.cut("changhua"),B.view("west")),v()},info(){let m=Zi(r,A.n);return{n:A.n,key:A.key,top:m&&Math.round(m.top.z),wSlope:m&&m.wSlope,eSlope:m&&m.eSlope,pick:A.pick,height:A.pick?Fe(r,...A.pick):null}},goHome(){B.view("south")},render(){h&&h.render()}};u.addEventListener("input",()=>B.setN(+u.value)),i.querySelectorAll("[data-cut3]").forEach(m=>m.addEventListener("click",()=>B.cut(m.dataset.cut3))),i.querySelectorAll("[data-view]").forEach(m=>m.addEventListener("click",()=>B.view(m.dataset.view))),i.querySelectorAll("[data-t]").forEach(m=>m.addEventListener("change",()=>{let E=m.dataset.t;E==="labels"?A.labels=m.checked:E==="cut"?(A.cutOn=m.checked,h&&h.setCutLine()):E==="sea"&&h&&h.terrain.show("water",m.checked),v()})),h&&t(".al-home").addEventListener("click",()=>B.goHome());let M=0,d=!0,l=0;function y(){M=0;let m=h?h.controls.update():!1;h&&h.render(),l=m?0:l+1,d&&l<60&&(M=requestAnimationFrame(y))}function v(){l=0,!M&&d&&(M=requestAnimationFrame(y))}return h&&(h.controls.addEventListener("start",v),h.controls.addEventListener("change",v)),new IntersectionObserver(m=>{d=m[0].isIntersecting,d&&v()}).observe(i),h&&h.setCutLine(),f(),v(),i.__lab=B,B}function Ql(){document.querySelectorAll("[data-gg-cut]").forEach(i=>Il(i)),document.querySelectorAll("[data-gg-form]").forEach(i=>Tl(i))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ql):Ql();_l("[data-geotw-lab]",Kg,{demo:(i,t)=>i.demo(t)});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
