(()=>{var qn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Qn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},hc=0,Fo=1,uc=2;var Ts=1,dc=2,Ji=3,Zn=0,Le=1,En=2,Cn=0,Wi=1,wo=2,Ro=3,Go=4,fc=5;var hi=100,pc=101,mc=102,gc=103,_c=104,Ec=200,Cc=201,xc=202,Bc=203,Lo=204,Po=205,Ac=206,Mc=207,yc=208,vc=209,Sc=210,Dc=211,bc=212,Ic=213,Tc=214,mr=0,gr=1,_r=2,Ri=3,Er=4,Cr=5,xr=6,Br=7,Yr=0,Fc=1,wc=2,ln=0,No=1,Oo=2,Ho=3,Uo=4,zo=5,Vo=6,ko=7;var Ko=300,jn=301,ui=302,qr=303,Qr=304,Fs=306,Ar=1e3,gn=1001,Mr=1002,Me=1003,Rc=1004;var ws=1005;var ve=1006,Zr=1007;var $n=1008;var Ve=1009,Jo=1010,Wo=1011,Xi=1012,jr=1013,cn=1014,hn=1015,un=1016,$r=1017,ta=1018,Yi=1020,Xo=35902,Yo=35899,qo=1021,Qo=1022,$e=1023,_n=1026,ti=1027,Zo=1028,ea=1029,ei=1030,na=1031;var ia=1033,Rs=33776,Gs=33777,Ls=33778,Ps=33779,sa=35840,ra=35841,aa=35842,oa=35843,la=36196,ca=37492,ha=37496,ua=37488,da=37489,Ns=37490,fa=37491,pa=37808,ma=37809,ga=37810,_a=37811,Ea=37812,Ca=37813,xa=37814,Ba=37815,Aa=37816,Ma=37817,ya=37818,va=37819,Sa=37820,Da=37821,ba=36492,Ia=36494,Ta=36495,Fa=36283,wa=36284,Os=36285,Ra=36286;var hs=2300,yr=2301,fr=2302,yo=2303,vo=2400,So=2401,Do=2402;var Gc=3200;var Ga=0,Lc=1,wn="",We="srgb",us="srgb-linear",ds="linear",qt="srgb";var pr=7680;var Pc=519,Nc=512,Oc=513,Hc=514,La=515,Uc=516,zc=517,Pa=518,Vc=519,kc=35044;var jo="300 es",rn=2e3,Gi=2001;function eu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function nu(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function fs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Kc(){let i=fs("canvas");return i.style.display="block",i}var Vl={},Li=null;function $o(...i){let t="THREE."+i.shift();Li?Li("log",t,...i):console.log(t,...i)}function Jc(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function It(...i){i=Jc(i);let t="THREE."+i.shift();if(Li)Li("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Tt(...i){i=Jc(i);let t="THREE."+i.shift();if(Li)Li("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function ci(...i){let t=i.join(" ");t in Vl||(Vl[t]=!0,It(...i))}function Wc(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Xc={[mr]:gr,[_r]:xr,[Er]:Br,[Ri]:Cr,[gr]:mr,[xr]:_r,[Br]:Er,[Cr]:Ri},an=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],kl=1234567,ls=Math.PI/180,Pi=180/Math.PI;function qi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(be[i&255]+be[i>>8&255]+be[i>>16&255]+be[i>>24&255]+"-"+be[t&255]+be[t>>8&255]+"-"+be[t>>16&15|64]+be[t>>24&255]+"-"+be[e&63|128]+be[e>>8&255]+"-"+be[e>>16&255]+be[e>>24&255]+be[n&255]+be[n>>8&255]+be[n>>16&255]+be[n>>24&255]).toLowerCase()}function Nt(i,t,e){return Math.max(t,Math.min(e,i))}function tl(i,t){return(i%t+t)%t}function iu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function su(i,t,e){return i!==t?(e-i)/(t-i):0}function cs(i,t,e){return(1-e)*i+e*t}function ru(i,t,e,n){return cs(i,t,1-Math.exp(-e*n))}function au(i,t=1){return t-Math.abs(tl(i,t*2)-t)}function ou(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function lu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function cu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function hu(i,t){return i+Math.random()*(t-i)}function uu(i){return i*(.5-Math.random())}function du(i){i!==void 0&&(kl=i);let t=kl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function fu(i){return i*ls}function pu(i){return i*Pi}function mu(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function gu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function _u(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Eu(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),u=a((t+n)/2),f=r((t-n)/2),h=a((t-n)/2),p=r((n-t)/2),_=a((n-t)/2);switch(s){case"XYX":i.set(o*u,c*f,c*h,o*l);break;case"YZY":i.set(c*h,o*u,c*f,o*l);break;case"ZXZ":i.set(c*f,c*h,o*u,o*l);break;case"XZX":i.set(o*u,c*_,c*p,o*l);break;case"YXY":i.set(c*p,o*u,c*_,o*l);break;case"ZYZ":i.set(c*_,c*p,o*u,o*l);break;default:It("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Fi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ge(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var el={DEG2RAD:ls,RAD2DEG:Pi,generateUUID:qi,clamp:Nt,euclideanModulo:tl,mapLinear:iu,inverseLerp:su,lerp:cs,damp:ru,pingpong:au,smoothstep:ou,smootherstep:lu,randInt:cu,randFloat:hu,randFloatSpread:uu,seededRandom:du,degToRad:fu,radToDeg:pu,isPowerOfTwo:mu,ceilPowerOfTwo:gu,floorPowerOfTwo:_u,setQuaternionFromProperEuler:Eu,normalize:Ge,denormalize:Fi},al=class al{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Nt(this.x,t.x,e.x),this.y=Nt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Nt(this.x,t,e),this.y=Nt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Nt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Nt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};al.prototype.isVector2=!0;var Ft=al,Ye=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],f=n[s+3],h=r[a+0],p=r[a+1],_=r[a+2],B=r[a+3];if(f!==B||c!==h||l!==p||u!==_){let m=c*h+l*p+u*_+f*B;m<0&&(h=-h,p=-p,_=-_,B=-B,m=-m);let d=1-o;if(m<.9995){let x=Math.acos(m),D=Math.sin(x);d=Math.sin(d*x)/D,o=Math.sin(o*x)/D,c=c*d+h*o,l=l*d+p*o,u=u*d+_*o,f=f*d+B*o}else{c=c*d+h*o,l=l*d+p*o,u=u*d+_*o,f=f*d+B*o;let x=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=x,l*=x,u*=x,f*=x}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],f=r[a],h=r[a+1],p=r[a+2],_=r[a+3];return t[e]=o*_+u*f+c*p-l*h,t[e+1]=c*_+u*h+l*f-o*p,t[e+2]=l*_+u*p+o*h-c*f,t[e+3]=u*_-o*f-c*h-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),f=o(r/2),h=c(n/2),p=c(s/2),_=c(r/2);switch(a){case"XYZ":this._x=h*u*f+l*p*_,this._y=l*p*f-h*u*_,this._z=l*u*_+h*p*f,this._w=l*u*f-h*p*_;break;case"YXZ":this._x=h*u*f+l*p*_,this._y=l*p*f-h*u*_,this._z=l*u*_-h*p*f,this._w=l*u*f+h*p*_;break;case"ZXY":this._x=h*u*f-l*p*_,this._y=l*p*f+h*u*_,this._z=l*u*_+h*p*f,this._w=l*u*f-h*p*_;break;case"ZYX":this._x=h*u*f-l*p*_,this._y=l*p*f+h*u*_,this._z=l*u*_-h*p*f,this._w=l*u*f+h*p*_;break;case"YZX":this._x=h*u*f+l*p*_,this._y=l*p*f+h*u*_,this._z=l*u*_-h*p*f,this._w=l*u*f-h*p*_;break;case"XZY":this._x=h*u*f-l*p*_,this._y=l*p*f-h*u*_,this._z=l*u*_+h*p*f,this._w=l*u*f+h*p*_;break;default:It("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],f=e[10],h=n+o+f;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(n>o&&n>f){let p=2*Math.sqrt(1+n-o-f);this._w=(u-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>f){let p=2*Math.sqrt(1+o-n-f);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+u)/p}else{let p=2*Math.sqrt(1+f-n-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Nt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){let l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},ol=class ol{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Kl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Kl.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),u=2*(o*e-r*s),f=2*(r*n-a*e);return this.x=e+c*l+a*f-o*u,this.y=n+c*u+o*l-r*f,this.z=s+c*f+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Nt(this.x,t.x,e.x),this.y=Nt(this.y,t.y,e.y),this.z=Nt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Nt(this.x,t,e),this.y=Nt(this.y,t,e),this.z=Nt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Nt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return no.copy(this).projectOnVector(t),this.sub(no)}reflect(t){return this.sub(no.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Nt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ol.prototype.isVector3=!0;var H=ol,no=new H,Kl=new Ye,ll=class ll{constructor(t,e,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){let u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],f=n[7],h=n[2],p=n[5],_=n[8],B=s[0],m=s[3],d=s[6],x=s[1],D=s[4],A=s[7],y=s[2],M=s[5],I=s[8];return r[0]=a*B+o*x+c*y,r[3]=a*m+o*D+c*M,r[6]=a*d+o*A+c*I,r[1]=l*B+u*x+f*y,r[4]=l*m+u*D+f*M,r[7]=l*d+u*A+f*I,r[2]=h*B+p*x+_*y,r[5]=h*m+p*D+_*M,r[8]=h*d+p*A+_*I,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],f=u*a-o*l,h=o*c-u*r,p=l*r-a*c,_=e*f+n*h+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let B=1/_;return t[0]=f*B,t[1]=(s*l-u*n)*B,t[2]=(o*n-s*a)*B,t[3]=h*B,t[4]=(u*e-s*c)*B,t[5]=(s*r-o*e)*B,t[6]=p*B,t[7]=(n*c-l*e)*B,t[8]=(a*e-n*r)*B,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return ci("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(io.makeScale(t,e)),this}rotate(t){return ci("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(io.makeRotation(-t)),this}translate(t,e){return ci("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(io.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};ll.prototype.isMatrix3=!0;var wt=ll,io=new wt,Jl=new wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wl=new wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Cu(){let i={enabled:!0,workingColorSpace:us,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===qt&&(s.r=bn(s.r),s.g=bn(s.g),s.b=bn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===qt&&(s.r=wi(s.r),s.g=wi(s.g),s.b=wi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===wn?ds:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ci("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ci("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[us]:{primaries:t,whitePoint:n,transfer:ds,toXYZ:Jl,fromXYZ:Wl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:We},outputColorSpaceConfig:{drawingBufferColorSpace:We}},[We]:{primaries:t,whitePoint:n,transfer:qt,toXYZ:Jl,fromXYZ:Wl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:We}}}),i}var kt=Cu();function bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function wi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ei,vr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ei===void 0&&(Ei=fs("canvas")),Ei.width=t.width,Ei.height=t.height;let s=Ei.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ei}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=fs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=bn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(bn(e[n]/255)*255):e[n]=bn(e[n]);return{data:e,width:t.width,height:t.height}}else return It("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},xu=0,Ni=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=qi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(so(s[a].image)):r.push(so(s[a]))}else r=so(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function so(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?vr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(It("Texture: Unable to serialize Texture."),{})}var Bu=0,ro=new H,He=class i extends an{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=gn,s=gn,r=ve,a=$n,o=$e,c=Ve,l=i.DEFAULT_ANISOTROPY,u=wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bu++}),this.uuid=qi(),this.name="",this.source=new Ni(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ft(0,0),this.repeat=new Ft(1,1),this.center=new Ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ro).x}get height(){return this.source.getSize(ro).y}get depth(){return this.source.getSize(ro).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){It(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){It(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ko)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ar:t.x=t.x-Math.floor(t.x);break;case gn:t.x=t.x<0?0:1;break;case Mr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ar:t.y=t.y-Math.floor(t.y);break;case gn:t.y=t.y<0?0:1;break;case Mr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};He.DEFAULT_IMAGE=null;He.DEFAULT_MAPPING=Ko;He.DEFAULT_ANISOTROPY=1;var cl=class cl{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],u=c[4],f=c[8],h=c[1],p=c[5],_=c[9],B=c[2],m=c[6],d=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-B)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+B)<.1&&Math.abs(_+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let D=(l+1)/2,A=(p+1)/2,y=(d+1)/2,M=(u+h)/4,I=(f+B)/4,E=(_+m)/4;return D>A&&D>y?D<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(D),s=M/n,r=I/n):A>y?A<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(A),n=M/s,r=E/s):y<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(y),n=I/r,s=E/r),this.set(n,s,r,e),this}let x=Math.sqrt((m-_)*(m-_)+(f-B)*(f-B)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(m-_)/x,this.y=(f-B)/x,this.z=(h-u)/x,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Nt(this.x,t.x,e.x),this.y=Nt(this.y,t.y,e.y),this.z=Nt(this.z,t.z,e.z),this.w=Nt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Nt(this.x,t,e),this.y=Nt(this.y,t,e),this.z=Nt(this.z,t,e),this.w=Nt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Nt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};cl.prototype.isVector4=!0;var le=cl,Sr=class extends an{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ve,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new le(0,0,t,e),this.scissorTest=!1,this.viewport=new le(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new He(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:ve,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ni(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ue=class extends Sr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},ps=class extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Me,this.minFilter=Me,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Dr=class extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Me,this.minFilter=Me,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Xr=class Xr{constructor(t,e,n,s,r,a,o,c,l,u,f,h,p,_,B,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,u,f,h,p,_,B,m)}set(t,e,n,s,r,a,o,c,l,u,f,h,p,_,B,m){let d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=_,d[11]=B,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xr().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Ci.setFromMatrixColumn(t,0).length(),r=1/Ci.setFromMatrixColumn(t,1).length(),a=1/Ci.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let h=a*u,p=a*f,_=o*u,B=o*f;e[0]=c*u,e[4]=-c*f,e[8]=l,e[1]=p+_*l,e[5]=h-B*l,e[9]=-o*c,e[2]=B-h*l,e[6]=_+p*l,e[10]=a*c}else if(t.order==="YXZ"){let h=c*u,p=c*f,_=l*u,B=l*f;e[0]=h+B*o,e[4]=_*o-p,e[8]=a*l,e[1]=a*f,e[5]=a*u,e[9]=-o,e[2]=p*o-_,e[6]=B+h*o,e[10]=a*c}else if(t.order==="ZXY"){let h=c*u,p=c*f,_=l*u,B=l*f;e[0]=h-B*o,e[4]=-a*f,e[8]=_+p*o,e[1]=p+_*o,e[5]=a*u,e[9]=B-h*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let h=a*u,p=a*f,_=o*u,B=o*f;e[0]=c*u,e[4]=_*l-p,e[8]=h*l+B,e[1]=c*f,e[5]=B*l+h,e[9]=p*l-_,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let h=a*c,p=a*l,_=o*c,B=o*l;e[0]=c*u,e[4]=B-h*f,e[8]=_*f+p,e[1]=f,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=p*f+_,e[10]=h-B*f}else if(t.order==="XZY"){let h=a*c,p=a*l,_=o*c,B=o*l;e[0]=c*u,e[4]=-f,e[8]=l*u,e[1]=h*f+B,e[5]=a*u,e[9]=p*f-_,e[2]=_*f-p,e[6]=o*u,e[10]=B*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Au,t,Mu)}lookAt(t,e,n){let s=this.elements;return Ke.subVectors(t,e),Ke.lengthSq()===0&&(Ke.z=1),Ke.normalize(),Nn.crossVectors(n,Ke),Nn.lengthSq()===0&&(Math.abs(n.z)===1?Ke.x+=1e-4:Ke.z+=1e-4,Ke.normalize(),Nn.crossVectors(n,Ke)),Nn.normalize(),Ys.crossVectors(Ke,Nn),s[0]=Nn.x,s[4]=Ys.x,s[8]=Ke.x,s[1]=Nn.y,s[5]=Ys.y,s[9]=Ke.y,s[2]=Nn.z,s[6]=Ys.z,s[10]=Ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],f=n[5],h=n[9],p=n[13],_=n[2],B=n[6],m=n[10],d=n[14],x=n[3],D=n[7],A=n[11],y=n[15],M=s[0],I=s[4],E=s[8],v=s[12],F=s[1],L=s[5],O=s[9],T=s[13],b=s[2],N=s[6],R=s[10],U=s[14],j=s[3],K=s[7],X=s[11],Y=s[15];return r[0]=a*M+o*F+c*b+l*j,r[4]=a*I+o*L+c*N+l*K,r[8]=a*E+o*O+c*R+l*X,r[12]=a*v+o*T+c*U+l*Y,r[1]=u*M+f*F+h*b+p*j,r[5]=u*I+f*L+h*N+p*K,r[9]=u*E+f*O+h*R+p*X,r[13]=u*v+f*T+h*U+p*Y,r[2]=_*M+B*F+m*b+d*j,r[6]=_*I+B*L+m*N+d*K,r[10]=_*E+B*O+m*R+d*X,r[14]=_*v+B*T+m*U+d*Y,r[3]=x*M+D*F+A*b+y*j,r[7]=x*I+D*L+A*N+y*K,r[11]=x*E+D*O+A*R+y*X,r[15]=x*v+D*T+A*U+y*Y,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],f=t[6],h=t[10],p=t[14],_=t[3],B=t[7],m=t[11],d=t[15],x=c*p-l*h,D=o*p-l*f,A=o*h-c*f,y=a*p-l*u,M=a*h-c*u,I=a*f-o*u;return e*(B*x-m*D+d*A)-n*(_*x-m*y+d*M)+s*(_*D-B*y+d*I)-r*(_*A-B*M+m*I)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],u=t[10];return e*(a*u-o*l)-n*(r*u-o*c)+s*(r*l-a*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],f=t[9],h=t[10],p=t[11],_=t[12],B=t[13],m=t[14],d=t[15],x=e*o-n*a,D=e*c-s*a,A=e*l-r*a,y=n*c-s*o,M=n*l-r*o,I=s*l-r*c,E=u*B-f*_,v=u*m-h*_,F=u*d-p*_,L=f*m-h*B,O=f*d-p*B,T=h*d-p*m,b=x*T-D*O+A*L+y*F-M*v+I*E;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/b;return t[0]=(o*T-c*O+l*L)*N,t[1]=(s*O-n*T-r*L)*N,t[2]=(B*I-m*M+d*y)*N,t[3]=(h*M-f*I-p*y)*N,t[4]=(c*F-a*T-l*v)*N,t[5]=(e*T-s*F+r*v)*N,t[6]=(m*A-_*I-d*D)*N,t[7]=(u*I-h*A+p*D)*N,t[8]=(a*O-o*F+l*E)*N,t[9]=(n*F-e*O-r*E)*N,t[10]=(_*M-B*A+d*x)*N,t[11]=(f*A-u*M-p*x)*N,t[12]=(o*v-a*L-c*E)*N,t[13]=(e*L-n*v+s*E)*N,t[14]=(B*D-_*y-m*x)*N,t[15]=(u*y-f*D+h*x)*N,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,u=a+a,f=o+o,h=r*l,p=r*u,_=r*f,B=a*u,m=a*f,d=o*f,x=c*l,D=c*u,A=c*f,y=n.x,M=n.y,I=n.z;return s[0]=(1-(B+d))*y,s[1]=(p+A)*y,s[2]=(_-D)*y,s[3]=0,s[4]=(p-A)*M,s[5]=(1-(h+d))*M,s[6]=(m+x)*M,s[7]=0,s[8]=(_+D)*I,s[9]=(m-x)*I,s[10]=(1-(h+B))*I,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Ci.set(s[0],s[1],s[2]).length(),o=Ci.set(s[4],s[5],s[6]).length(),c=Ci.set(s[8],s[9],s[10]).length();r<0&&(a=-a),en.copy(this);let l=1/a,u=1/o,f=1/c;return en.elements[0]*=l,en.elements[1]*=l,en.elements[2]*=l,en.elements[4]*=u,en.elements[5]*=u,en.elements[6]*=u,en.elements[8]*=f,en.elements[9]*=f,en.elements[10]*=f,e.setFromRotationMatrix(en),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,s,r,a,o=rn,c=!1){let l=this.elements,u=2*r/(e-t),f=2*r/(n-s),h=(e+t)/(e-t),p=(n+s)/(n-s),_,B;if(c)_=r/(a-r),B=a*r/(a-r);else if(o===rn)_=-(a+r)/(a-r),B=-2*a*r/(a-r);else if(o===Gi)_=-a/(a-r),B=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=B,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=rn,c=!1){let l=this.elements,u=2/(e-t),f=2/(n-s),h=-(e+t)/(e-t),p=-(n+s)/(n-s),_,B;if(c)_=1/(a-r),B=a/(a-r);else if(o===rn)_=-2/(a-r),B=-(a+r)/(a-r);else if(o===Gi)_=-1/(a-r),B=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=_,l[14]=B,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Xr.prototype.isMatrix4=!0;var ue=Xr,Ci=new H,en=new ue,Au=new H(0,0,0),Mu=new H(1,1,1),Nn=new H,Ys=new H,Ke=new H,Xl=new ue,Yl=new Ye,In=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],f=s[2],h=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Nt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Nt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:It("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Xl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Xl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Yl.setFromEuler(this),this.setFromQuaternion(Yl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};In.DEFAULT_ORDER="XYZ";var ms=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},yu=0,ql=new H,xi=new Ye,An=new ue,qs=new H,ss=new H,vu=new H,Su=new Ye,Ql=new H(1,0,0),Zl=new H(0,1,0),jl=new H(0,0,1),$l={type:"added"},Du={type:"removed"},Bi={type:"childadded",child:null},ao={type:"childremoved",child:null},Fe=class i extends an{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yu++}),this.uuid=qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new H,e=new In,n=new Ye,s=new H(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ue},normalMatrix:{value:new wt}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ms,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return xi.setFromAxisAngle(t,e),this.quaternion.multiply(xi),this}rotateOnWorldAxis(t,e){return xi.setFromAxisAngle(t,e),this.quaternion.premultiply(xi),this}rotateX(t){return this.rotateOnAxis(Ql,t)}rotateY(t){return this.rotateOnAxis(Zl,t)}rotateZ(t){return this.rotateOnAxis(jl,t)}translateOnAxis(t,e){return ql.copy(t).applyQuaternion(this.quaternion),this.position.add(ql.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ql,t)}translateY(t){return this.translateOnAxis(Zl,t)}translateZ(t){return this.translateOnAxis(jl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(An.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?qs.copy(t):qs.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?An.lookAt(ss,qs,this.up):An.lookAt(qs,ss,this.up),this.quaternion.setFromRotationMatrix(An),s&&(An.extractRotation(s.matrixWorld),xi.setFromRotationMatrix(An),this.quaternion.premultiply(xi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Tt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent($l),Bi.child=t,this.dispatchEvent(Bi),Bi.child=null):Tt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Du),ao.child=t,this.dispatchEvent(ao),ao.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),An.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),An.multiply(t.parent.matrixWorld)),t.applyMatrix4(An),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent($l),Bi.child=t,this.dispatchEvent(Bi),Bi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,t,vu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,Su,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),f=a(t.shapes),h=a(t.skeletons),p=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Fe.DEFAULT_UP=new H(0,1,0);Fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Dn=class extends Fe{constructor(){super(),this.isGroup=!0,this.type="Group"}},bu={type:"move"},Oi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let B of t.hand.values()){let m=e.getJointPose(B,n),d=this._getHandJoint(l,B);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,_=.005;l.inputState.pinching&&h>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(bu)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Dn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Yc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},Qs={h:0,s:0,l:0};function oo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var zt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=We){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,kt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,kt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=kt.workingColorSpace){if(t=tl(t,1),e=Nt(e,0,1),n=Nt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=oo(a,r,t+1/3),this.g=oo(a,r,t),this.b=oo(a,r,t-1/3)}return kt.colorSpaceToWorking(this,s),this}setStyle(t,e=We){function n(r){r!==void 0&&parseFloat(r)<1&&It("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:It("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);It("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=We){let n=Yc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):It("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=bn(t.r),this.g=bn(t.g),this.b=bn(t.b),this}copyLinearToSRGB(t){return this.r=wi(t.r),this.g=wi(t.g),this.b=wi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=We){return kt.workingToColorSpace(Ie.copy(this),t),Math.round(Nt(Ie.r*255,0,255))*65536+Math.round(Nt(Ie.g*255,0,255))*256+Math.round(Nt(Ie.b*255,0,255))}getHexString(t=We){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=kt.workingColorSpace){kt.workingToColorSpace(Ie.copy(this),e);let n=Ie.r,s=Ie.g,r=Ie.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=kt.workingColorSpace){return kt.workingToColorSpace(Ie.copy(this),e),t.r=Ie.r,t.g=Ie.g,t.b=Ie.b,t}getStyle(t=We){kt.workingToColorSpace(Ie.copy(this),t);let e=Ie.r,n=Ie.g,s=Ie.b;return t!==We?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(On),this.setHSL(On.h+t,On.s+e,On.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(On),t.getHSL(Qs);let n=cs(On.h,Qs.h,e),s=cs(On.s,Qs.s,e),r=cs(On.l,Qs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ie=new zt;zt.NAMES=Yc;var gs=class extends Fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new In,this.environmentIntensity=1,this.environmentRotation=new In,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},nn=new H,Mn=new H,lo=new H,yn=new H,Ai=new H,Mi=new H,tc=new H,co=new H,ho=new H,uo=new H,fo=new le,po=new le,mo=new le,Vn=class i{constructor(t=new H,e=new H,n=new H){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),nn.subVectors(t,e),s.cross(nn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){nn.subVectors(s,e),Mn.subVectors(n,e),lo.subVectors(t,e);let a=nn.dot(nn),o=nn.dot(Mn),c=nn.dot(lo),l=Mn.dot(Mn),u=Mn.dot(lo),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;let h=1/f,p=(l*c-o*u)*h,_=(a*u-o*c)*h;return r.set(1-p-_,_,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,yn.x),c.addScaledVector(a,yn.y),c.addScaledVector(o,yn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return fo.setScalar(0),po.setScalar(0),mo.setScalar(0),fo.fromBufferAttribute(t,e),po.fromBufferAttribute(t,n),mo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(fo,r.x),a.addScaledVector(po,r.y),a.addScaledVector(mo,r.z),a}static isFrontFacing(t,e,n,s){return nn.subVectors(n,e),Mn.subVectors(t,e),nn.cross(Mn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return nn.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),nn.cross(Mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Ai.subVectors(s,n),Mi.subVectors(r,n),co.subVectors(t,n);let c=Ai.dot(co),l=Mi.dot(co);if(c<=0&&l<=0)return e.copy(n);ho.subVectors(t,s);let u=Ai.dot(ho),f=Mi.dot(ho);if(u>=0&&f<=u)return e.copy(s);let h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(n).addScaledVector(Ai,a);uo.subVectors(t,r);let p=Ai.dot(uo),_=Mi.dot(uo);if(_>=0&&p<=_)return e.copy(r);let B=p*l-c*_;if(B<=0&&l>=0&&_<=0)return o=l/(l-_),e.copy(n).addScaledVector(Mi,o);let m=u*_-p*f;if(m<=0&&f-u>=0&&p-_>=0)return tc.subVectors(r,s),o=(f-u)/(f-u+(p-_)),e.copy(s).addScaledVector(tc,o);let d=1/(m+B+h);return a=B*d,o=h*d,e.copy(n).addScaledVector(Ai,a).addScaledVector(Mi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},kn=class{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(sn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(sn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=sn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,sn):sn.fromBufferAttribute(r,a),sn.applyMatrix4(t.matrixWorld),this.expandByPoint(sn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Zs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Zs.copy(n.boundingBox)),Zs.applyMatrix4(t.matrixWorld),this.union(Zs)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,sn),sn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(rs),js.subVectors(this.max,rs),yi.subVectors(t.a,rs),vi.subVectors(t.b,rs),Si.subVectors(t.c,rs),Hn.subVectors(vi,yi),Un.subVectors(Si,vi),ri.subVectors(yi,Si);let e=[0,-Hn.z,Hn.y,0,-Un.z,Un.y,0,-ri.z,ri.y,Hn.z,0,-Hn.x,Un.z,0,-Un.x,ri.z,0,-ri.x,-Hn.y,Hn.x,0,-Un.y,Un.x,0,-ri.y,ri.x,0];return!go(e,yi,vi,Si,js)||(e=[1,0,0,0,1,0,0,0,1],!go(e,yi,vi,Si,js))?!1:($s.crossVectors(Hn,Un),e=[$s.x,$s.y,$s.z],go(e,yi,vi,Si,js))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,sn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(sn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(vn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},vn=[new H,new H,new H,new H,new H,new H,new H,new H],sn=new H,Zs=new kn,yi=new H,vi=new H,Si=new H,Hn=new H,Un=new H,ri=new H,rs=new H,js=new H,$s=new H,ai=new H;function go(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ai.fromArray(i,r);let o=s.x*Math.abs(ai.x)+s.y*Math.abs(ai.y)+s.z*Math.abs(ai.z),c=t.dot(ai),l=e.dot(ai),u=n.dot(ai);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var ge=new H,tr=new Ft,Iu=0,Oe=class extends an{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Iu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=kc,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)tr.fromBufferAttribute(this,e),tr.applyMatrix3(t),this.setXY(e,tr.x,tr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix3(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix4(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyNormalMatrix(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.transformDirection(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Fi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ge(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Fi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Fi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Fi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Fi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),n=Ge(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),n=Ge(n,this.array),s=Ge(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),n=Ge(n,this.array),s=Ge(s,this.array),r=Ge(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var _s=class extends Oe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Es=class extends Oe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Ae=class extends Oe{constructor(t,e,n){super(new Float32Array(t),e,n)}},Tu=new kn,as=new H,_o=new H,Hi=class{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Tu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;as.subVectors(t,this.center);let e=as.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(as,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(_o.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(as.copy(t.center).add(_o)),this.expandByPoint(as.copy(t.center).sub(_o))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Fu=0,je=new ue,Eo=new Fe,Di=new H,Je=new kn,os=new kn,Be=new H,ze=class i extends an{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fu++}),this.uuid=qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(eu(t)?Es:_s)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new wt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return je.makeRotationFromQuaternion(t),this.applyMatrix4(je),this}rotateX(t){return je.makeRotationX(t),this.applyMatrix4(je),this}rotateY(t){return je.makeRotationY(t),this.applyMatrix4(je),this}rotateZ(t){return je.makeRotationZ(t),this.applyMatrix4(je),this}translate(t,e,n){return je.makeTranslation(t,e,n),this.applyMatrix4(je),this}scale(t,e,n){return je.makeScale(t,e,n),this.applyMatrix4(je),this}lookAt(t){return Eo.lookAt(t),Eo.updateMatrix(),this.applyMatrix4(Eo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Di).negate(),this.translate(Di.x,Di.y,Di.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ae(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&It("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Tt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Je.setFromBufferAttribute(r),this.morphTargetsRelative?(Be.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(Be),Be.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(Be)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Tt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Tt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){let n=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];os.setFromBufferAttribute(o),this.morphTargetsRelative?(Be.addVectors(Je.min,os.min),Je.expandByPoint(Be),Be.addVectors(Je.max,os.max),Je.expandByPoint(Be)):(Je.expandByPoint(os.min),Je.expandByPoint(os.max))}Je.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Be.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Be));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Be.fromBufferAttribute(o,l),c&&(Di.fromBufferAttribute(t,l),Be.add(Di)),s=Math.max(s,n.distanceToSquared(Be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Tt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Tt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Oe(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let E=0;E<n.count;E++)o[E]=new H,c[E]=new H;let l=new H,u=new H,f=new H,h=new Ft,p=new Ft,_=new Ft,B=new H,m=new H;function d(E,v,F){l.fromBufferAttribute(n,E),u.fromBufferAttribute(n,v),f.fromBufferAttribute(n,F),h.fromBufferAttribute(r,E),p.fromBufferAttribute(r,v),_.fromBufferAttribute(r,F),u.sub(l),f.sub(l),p.sub(h),_.sub(h);let L=1/(p.x*_.y-_.x*p.y);isFinite(L)&&(B.copy(u).multiplyScalar(_.y).addScaledVector(f,-p.y).multiplyScalar(L),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(L),o[E].add(B),o[v].add(B),o[F].add(B),c[E].add(m),c[v].add(m),c[F].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let E=0,v=x.length;E<v;++E){let F=x[E],L=F.start,O=F.count;for(let T=L,b=L+O;T<b;T+=3)d(t.getX(T+0),t.getX(T+1),t.getX(T+2))}let D=new H,A=new H,y=new H,M=new H;function I(E){y.fromBufferAttribute(s,E),M.copy(y);let v=o[E];D.copy(v),D.sub(y.multiplyScalar(y.dot(v))).normalize(),A.crossVectors(M,v);let L=A.dot(c[E])<0?-1:1;a.setXYZW(E,D.x,D.y,D.z,L)}for(let E=0,v=x.length;E<v;++E){let F=x[E],L=F.start,O=F.count;for(let T=L,b=L+O;T<b;T+=3)I(t.getX(T+0)),I(t.getX(T+1)),I(t.getX(T+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Oe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);let s=new H,r=new H,a=new H,o=new H,c=new H,l=new H,u=new H,f=new H;if(t)for(let h=0,p=t.count;h<p;h+=3){let _=t.getX(h+0),B=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,B),a.fromBufferAttribute(e,m),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,B),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(B,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,p=e.count;h<p;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Be.fromBufferAttribute(t,e),Be.normalize(),t.setXYZ(e,Be.x,Be.y,Be.z)}toNonIndexed(){function t(o,c){let l=o.array,u=o.itemSize,f=o.normalized,h=new l.constructor(c.length*u),p=0,_=0;for(let B=0,m=c.length;B<m;B++){o.isInterleavedBufferAttribute?p=c[B]*o.data.stride+o.offset:p=c[B]*u;for(let d=0;d<u;d++)h[_++]=l[p++]}return new Oe(h,u,f)}if(this.index===null)return It("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=t(c,n);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let u=0,f=l.length;u<f;u++){let h=l[u],p=t(h,n);c.push(p)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){let p=l[f];u.push(p.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(e))}let r=t.morphAttributes;for(let l in r){let u=[],f=r[l];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,u=a.length;l<u;l++){let f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Co=new H,wu=new H,Ru=new wt,Xe=class{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Co.subVectors(n,e).cross(wu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Co),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Ru.getNormalMatrix(t),s=this.coplanarPoint(Co).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Gu=0,Kn=class extends an{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gu++}),this.uuid=qi(),this.name="",this.type="Material",this.blending=Wi,this.side=Zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Lo,this.blendDst=Po,this.blendEquation=hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=Ri,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pr,this.stencilZFail=pr,this.stencilZPass=pr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){It(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){It(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new zt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Xe().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ft().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ft().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Sn=new H,xo=new H,er=new H,nr=new H,Ui=class{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Sn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Sn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Sn.copy(this.origin).addScaledVector(this.direction,e),Sn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){xo.copy(t).add(e).multiplyScalar(.5),er.copy(e).sub(t).normalize(),nr.copy(this.origin).sub(xo);let r=t.distanceTo(e)*.5,a=-this.direction.dot(er),o=nr.dot(this.direction),c=-nr.dot(er),l=nr.lengthSq(),u=Math.abs(1-a*a),f,h,p,_;if(u>0)if(f=a*c-o,h=a*o-c,_=r*u,f>=0)if(h>=-_)if(h<=_){let B=1/u;f*=B,h*=B,p=f*(f+a*h+2*o)+h*(a*f+h+2*c)+l}else h=r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*c)+l;else h=-r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*c)+l;else h<=-_?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-c),r),p=-f*f+h*(h+2*c)+l):h<=_?(f=0,h=Math.min(Math.max(-r,-c),r),p=h*(h+2*c)+l):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-c),r),p=-f*f+h*(h+2*c)+l);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(xo).addScaledVector(er,h),p}intersectSphere(t,e){if(t.radius<0)return null;Sn.subVectors(t.center,this.origin);let n=Sn.dot(this.direction),s=Sn.dot(Sn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c,l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(n=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(n=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(o=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Sn)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,f=t.x-a.x,h=t.y-a.y,p=t.z-a.z,_=e.x-a.x,B=e.y-a.y,m=e.z-a.z,d=n.x-a.x,x=n.y-a.y,D=n.z-a.z,A=Math.abs(c),y=Math.abs(l),M=Math.abs(u),I,E,v,F,L,O,T,b,N,R,U,j;if(A>=y&&A>=M?(v=c,O=f,N=_,j=d,c>=0?(I=l,E=u,F=h,L=p,T=B,b=m,R=x,U=D):(I=u,E=l,F=p,L=h,T=m,b=B,R=D,U=x)):y>=M?(v=l,O=h,N=B,j=x,l>=0?(I=u,E=c,F=p,L=f,T=m,b=_,R=D,U=d):(I=c,E=u,F=f,L=p,T=_,b=m,R=d,U=D)):(v=u,O=p,N=m,j=D,u>=0?(I=c,E=l,F=f,L=h,T=_,b=B,R=d,U=x):(I=l,E=c,F=h,L=f,T=B,b=_,R=x,U=d)),v===0)return null;let K=I/v,X=E/v,Y=1/v,_t=F-K*O,Et=L-X*O,jt=T-K*N,Ot=b-X*N,Kt=R-K*j,q=U-X*j,et=Kt*Ot-q*jt,mt=_t*q-Et*Kt,yt=jt*Et-Ot*_t;if(s){if(et<0||mt<0||yt<0)return null}else if((et<0||mt<0||yt<0)&&(et>0||mt>0||yt>0))return null;let ct=et+mt+yt;if(ct===0)return null;let Gt=Y*(et*O+mt*N+yt*j);return(ct>0?Gt<0:Gt>0)?null:this.at(Gt/ct,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Cs=class extends Kn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=Yr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},ec=new ue,oi=new Ui,ir=new Hi,nc=new H,sr=new H,rr=new H,ar=new H,Bo=new H,or=new H,ic=new H,lr=new H,fe=class extends Fe{constructor(t=new ze,e=new Cs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){or.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=o[c],f=r[c];u!==0&&(Bo.fromBufferAttribute(f,t),a?or.addScaledVector(Bo,u):or.addScaledVector(Bo.sub(e),u))}e.add(or)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ir.copy(n.boundingSphere),ir.applyMatrix4(r),oi.copy(t.ray).recast(t.near),!(ir.containsPoint(oi.origin)===!1&&(oi.intersectSphere(ir,nc)===null||oi.origin.distanceToSquared(nc)>(t.far-t.near)**2))&&(ec.copy(r).invert(),oi.copy(t.ray).applyMatrix4(ec),!(n.boundingBox!==null&&oi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,oi)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,B=h.length;_<B;_++){let m=h[_],d=a[m.materialIndex],x=Math.max(m.start,p.start),D=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let A=x,y=D;A<y;A+=3){let M=o.getX(A),I=o.getX(A+1),E=o.getX(A+2);s=cr(this,d,t,n,l,u,f,M,I,E),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let _=Math.max(0,p.start),B=Math.min(o.count,p.start+p.count);for(let m=_,d=B;m<d;m+=3){let x=o.getX(m),D=o.getX(m+1),A=o.getX(m+2);s=cr(this,a,t,n,l,u,f,x,D,A),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,B=h.length;_<B;_++){let m=h[_],d=a[m.materialIndex],x=Math.max(m.start,p.start),D=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let A=x,y=D;A<y;A+=3){let M=A,I=A+1,E=A+2;s=cr(this,d,t,n,l,u,f,M,I,E),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let _=Math.max(0,p.start),B=Math.min(c.count,p.start+p.count);for(let m=_,d=B;m<d;m+=3){let x=m,D=m+1,A=m+2;s=cr(this,a,t,n,l,u,f,x,D,A),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Lu(i,t,e,n,s,r,a,o){let c;if(t.side===Le?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===Zn,o),c===null)return null;lr.copy(o),lr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(lr);return l<e.near||l>e.far?null:{distance:l,point:lr.clone(),object:i}}function cr(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,sr),i.getVertexPosition(c,rr),i.getVertexPosition(l,ar);let u=Lu(i,t,e,n,sr,rr,ar,ic);if(u){let f=new H;Vn.getBarycoord(ic,sr,rr,ar,f),s&&(u.uv=Vn.getInterpolatedAttribute(s,o,c,l,f,new Ft)),r&&(u.uv1=Vn.getInterpolatedAttribute(r,o,c,l,f,new Ft)),a&&(u.normal=Vn.getInterpolatedAttribute(a,o,c,l,f,new H),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:c,c:l,normal:new H,materialIndex:0};Vn.getNormal(sr,rr,ar,h.normal),u.face=h,u.barycoord=f}return u}var br=class extends He{constructor(t=null,e=1,n=1,s,r,a,o,c,l=Me,u=Me,f,h){super(null,a,o,c,l,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var li=new Hi,Pu=new Ft(.5,.5),hr=new H,zi=class{constructor(t=new Xe,e=new Xe,n=new Xe,s=new Xe,r=new Xe,a=new Xe){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=rn,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],f=r[5],h=r[6],p=r[7],_=r[8],B=r[9],m=r[10],d=r[11],x=r[12],D=r[13],A=r[14],y=r[15];if(s[0].setComponents(l-a,p-u,d-_,y-x).normalize(),s[1].setComponents(l+a,p+u,d+_,y+x).normalize(),s[2].setComponents(l+o,p+f,d+B,y+D).normalize(),s[3].setComponents(l-o,p-f,d-B,y-D).normalize(),n)s[4].setComponents(c,h,m,A).normalize(),s[5].setComponents(l-c,p-h,d-m,y-A).normalize();else if(s[4].setComponents(l-c,p-h,d-m,y-A).normalize(),e===rn)s[5].setComponents(l+c,p+h,d+m,y+A).normalize();else if(e===Gi)s[5].setComponents(c,h,m,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(li)}intersectsSprite(t){li.center.set(0,0,0);let e=Pu.distanceTo(t.center);return li.radius=.7071067811865476+e,li.applyMatrix4(t.matrixWorld),this.intersectsSphere(li)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(hr.x=s.normal.x>0?t.max.x:t.min.x,hr.y=s.normal.y>0?t.max.y:t.min.y,hr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(hr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var xs=class extends He{constructor(t=[],e=jn,n,s,r,a,o,c,l,u){super(t,e,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Jn=class extends He{constructor(t,e,n=cn,s,r,a,o=Me,c=Me,l,u=_n,f=1){if(u!==_n&&u!==ti)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:f};super(h,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ni(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Ir=class extends Jn{constructor(t,e=cn,n=jn,s,r,a=Me,o=Me,c,l=_n){let u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,n,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Bs=class extends He{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Tn=class i extends ze{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],u=[],f=[],h=0,p=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,s,a,2),_("x","z","y",1,-1,t,n,-e,s,a,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ae(l,3)),this.setAttribute("normal",new Ae(u,3)),this.setAttribute("uv",new Ae(f,2));function _(B,m,d,x,D,A,y,M,I,E,v){let F=A/I,L=y/E,O=A/2,T=y/2,b=M/2,N=I+1,R=E+1,U=0,j=0,K=new H;for(let X=0;X<R;X++){let Y=X*L-T;for(let _t=0;_t<N;_t++){let Et=_t*F-O;K[B]=Et*x,K[m]=Y*D,K[d]=b,l.push(K.x,K.y,K.z),K[B]=0,K[m]=0,K[d]=M>0?1:-1,u.push(K.x,K.y,K.z),f.push(_t/I),f.push(1-X/E),U+=1}}for(let X=0;X<E;X++)for(let Y=0;Y<I;Y++){let _t=h+Y+N*X,Et=h+Y+N*(X+1),jt=h+(Y+1)+N*(X+1),Ot=h+(Y+1)+N*X;c.push(_t,Et,Ot),c.push(Et,jt,Ot),j+=6}o.addGroup(p,j,v),p+=j,h+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Tr=class i extends ze{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],f=[],h=[],p=[],_=0,B=[],m=n/2,d=0;x(),a===!1&&(t>0&&D(!0),e>0&&D(!1)),this.setIndex(u),this.setAttribute("position",new Ae(f,3)),this.setAttribute("normal",new Ae(h,3)),this.setAttribute("uv",new Ae(p,2));function x(){let A=new H,y=new H,M=0,I=(e-t)/n;for(let E=0;E<=r;E++){let v=[],F=E/r,L=F*(e-t)+t;for(let O=0;O<=s;O++){let T=O/s,b=T*c+o,N=Math.sin(b),R=Math.cos(b);y.x=L*N,y.y=-F*n+m,y.z=L*R,f.push(y.x,y.y,y.z),A.set(N,I,R).normalize(),h.push(A.x,A.y,A.z),p.push(T,1-F),v.push(_++)}B.push(v)}for(let E=0;E<s;E++)for(let v=0;v<r;v++){let F=B[v][E],L=B[v+1][E],O=B[v+1][E+1],T=B[v][E+1];(t>0||v!==0)&&(u.push(F,L,T),M+=3),(e>0||v!==r-1)&&(u.push(L,O,T),M+=3)}l.addGroup(d,M,0),d+=M}function D(A){let y=_,M=new Ft,I=new H,E=0,v=A===!0?t:e,F=A===!0?1:-1;for(let O=1;O<=s;O++)f.push(0,m*F,0),h.push(0,F,0),p.push(.5,.5),_++;let L=_;for(let O=0;O<=s;O++){let b=O/s*c+o,N=Math.cos(b),R=Math.sin(b);I.x=v*R,I.y=m*F,I.z=v*N,f.push(I.x,I.y,I.z),h.push(0,F,0),M.x=N*.5+.5,M.y=R*.5*F+.5,p.push(M.x,M.y),_++}for(let O=0;O<s;O++){let T=y+O,b=L+O;A===!0?u.push(b,b+1,T):u.push(b+1,b,T),E+=3}l.addGroup(d,E,A===!0?1:2),d+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},As=class i extends Tr{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Fn=class i extends ze{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,f=t/o,h=e/c,p=[],_=[],B=[],m=[];for(let d=0;d<u;d++){let x=d*h-a;for(let D=0;D<l;D++){let A=D*f-r;_.push(A,-x,0),B.push(0,0,1),m.push(D/o),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let x=0;x<o;x++){let D=x+l*d,A=x+l*(d+1),y=x+1+l*(d+1),M=x+1+l*d;p.push(D,A,M),p.push(A,y,M)}this.setIndex(p),this.setAttribute("position",new Ae(_,3)),this.setAttribute("normal",new Ae(B,3)),this.setAttribute("uv",new Ae(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var Ms=class i extends ze{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,u=[],f=new H,h=new H,p=[],_=[],B=[],m=[];for(let d=0;d<=n;d++){let x=[],D=d/n,A=a+D*o,y=t*Math.cos(A),M=Math.sqrt(t*t-y*y),I=0;d===0&&a===0?I=.5/e:d===n&&c===Math.PI&&(I=-.5/e);for(let E=0;E<=e;E++){let v=E/e,F=s+v*r;f.x=-M*Math.cos(F),f.y=y,f.z=M*Math.sin(F),_.push(f.x,f.y,f.z),h.copy(f).normalize(),B.push(h.x,h.y,h.z),m.push(v+I,1-D),x.push(l++)}u.push(x)}for(let d=0;d<n;d++)for(let x=0;x<e;x++){let D=u[d][x+1],A=u[d][x],y=u[d+1][x],M=u[d+1][x+1];(d!==0||a>0)&&p.push(D,A,M),(d!==n-1||c<Math.PI)&&p.push(A,y,M)}this.setIndex(p),this.setAttribute("position",new Ae(_,3)),this.setAttribute("normal",new Ae(B,3)),this.setAttribute("uv",new Ae(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function di(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(sc(s))s.isRenderTargetTexture?(It("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(sc(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function we(i){let t={};for(let e=0;e<i.length;e++){let n=di(i[e]);for(let s in n)t[s]=n[s]}return t}function sc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Nu(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function nl(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:kt.workingColorSpace}var qc={clone:di,merge:we},Ou=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,qe=class extends Kn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ou,this.fragmentShader=Hu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=di(t.uniforms),this.uniformsGroups=Nu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new zt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ft().fromArray(s.value);break;case"v3":this.uniforms[n].value=new H().fromArray(s.value);break;case"v4":this.uniforms[n].value=new le().fromArray(s.value);break;case"m3":this.uniforms[n].value=new wt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ue().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Fr=class extends qe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var on=class extends Kn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ga,this.normalScale=new Ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=Yr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},wr=class extends Kn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Rr=class extends Kn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function bi(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Ao(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Wn=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Gr=class extends Wn{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:vo,endingEnd:vo}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case So:r=t,o=2*e-n;break;case Do:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case So:a=t,c=2*n-e;break;case Do:a=1,c=n+s[1]-s[0];break;default:a=t-1,c=e}let l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,p=this._weightNext,_=(n-e)/(s-e),B=_*_,m=B*_,d=-h*m+2*h*B-h*_,x=(1+h)*m+(-1.5-2*h)*B+(-.5+h)*_+1,D=(-1-p)*m+(1.5+p)*B+.5*_,A=p*m-p*B;for(let y=0;y!==o;++y)r[y]=d*a[u+y]+x*a[l+y]+D*a[c+y]+A*a[f+y];return r}},Lr=class extends Wn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=(n-e)/(s-e),f=1-u;for(let h=0;h!==o;++h)r[h]=a[l+h]*f+a[c+h]*u;return r}},Pr=class extends Wn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Nr=class extends Wn{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=this.inTangents,f=this.outTangents;if(!u||!f){let _=(n-e)/(s-e),B=1-_;for(let m=0;m!==o;++m)r[m]=a[l+m]*B+a[c+m]*_;return r}let h=o*2,p=t-1;for(let _=0;_!==o;++_){let B=a[l+_],m=a[c+_],d=p*h+_*2,x=f[d],D=f[d+1],A=t*h+_*2,y=u[A],M=u[A+1],I=zu(n,e,x,y,s);r[_]=Qc(I,B,D,M,m)}return r}};function Qc(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function Uu(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function zu(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=Qc(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let c=Uu(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var Qe=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=bi(e,this.TimeBufferType),this.values=bi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:bi(t.times,Array),values:bi(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),Ao(t.settings)&&(n.settings={inTangents:bi(t.settings.inTangents,Array),outTangents:bi(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Pr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Lr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Gr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Nr(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case hs:e=this.InterpolantFactoryMethodDiscrete;break;case yr:e=this.InterpolantFactoryMethodLinear;break;case fr:e=this.InterpolantFactoryMethodSmooth;break;case yo:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return It("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return hs;case this.InterpolantFactoryMethodLinear:return yr;case this.InterpolantFactoryMethodSmooth:return fr;case this.InterpolantFactoryMethodBezier:return yo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;Ao(this.settings)&&(rc(this.settings.inTangents,t),rc(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Tt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Tt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Tt("KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){Tt("KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&nu(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Tt("KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===fr,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],u=t[o+1];if(l!==u&&(o!==1||l!==t[0]))if(s)c=!0;else{let f=o*n,h=f-n,p=f+n;for(let _=0;_!==n;++_){let B=e[f+_];if(B!==e[h+_]||B!==e[p+_]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let f=o*n,h=a*n;for(let p=0;p!==n;++p)e[h+p]=e[f+p]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,Ao(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function rc(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}Qe.prototype.ValueTypeName="";Qe.prototype.TimeBufferType=Float32Array;Qe.prototype.ValueBufferType=Float32Array;Qe.prototype.DefaultInterpolation=yr;var Xn=class extends Qe{constructor(t,e,n){super(t,e,n)}};Xn.prototype.ValueTypeName="bool";Xn.prototype.ValueBufferType=Array;Xn.prototype.DefaultInterpolation=hs;Xn.prototype.InterpolantFactoryMethodLinear=void 0;Xn.prototype.InterpolantFactoryMethodSmooth=void 0;var Or=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};Or.prototype.ValueTypeName="color";var Hr=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};Hr.prototype.ValueTypeName="number";var Ur=class extends Wn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(s-e),l=t*o;for(let u=l+o;l!==u;l+=4)Ye.slerpFlat(r,0,a,l-o,a,l,c);return r}},ys=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Ur(this.times,this.values,this.getValueSize(),t)}};ys.prototype.ValueTypeName="quaternion";ys.prototype.InterpolantFactoryMethodSmooth=void 0;var Yn=class extends Qe{constructor(t,e,n){super(t,e,n)}};Yn.prototype.ValueTypeName="string";Yn.prototype.ValueBufferType=Array;Yn.prototype.DefaultInterpolation=hs;Yn.prototype.InterpolantFactoryMethodLinear=void 0;Yn.prototype.InterpolantFactoryMethodSmooth=void 0;var zr=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};zr.prototype.ValueTypeName="vector";var Vr=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){let f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=l.length;f<h;f+=2){let p=l[f],_=l[f+1];if(p.global&&(p.lastIndex=0),p.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Zc=new Vr,kr=class{constructor(t){this.manager=t!==void 0?t:Zc,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};kr.DEFAULT_MATERIAL_NAME="__DEFAULT";var Vi=class extends Fe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},vs=class extends Vi{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Mo=new ue,ac=new H,oc=new H,Kr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ft(512,512),this.mapType=Ve,this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zi,this._frameExtents=new Ft(1,1),this._viewportCount=1,this._viewports=[new le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;ac.setFromMatrixPosition(t.matrixWorld),e.position.copy(ac),oc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(oc),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Mo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Mo,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Gi||t.reversedDepth?e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),e.multiply(Mo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},ur=new H,dr=new Ye,mn=new H,Ss=class extends Fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=rn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ur,dr,mn),mn.x===1&&mn.y===1&&mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ur,dr,mn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(ur,dr,mn),mn.x===1&&mn.y===1&&mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ur,dr,mn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},zn=new H,lc=new Ft,cc=new Ft,Te=class extends Ss{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Pi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(ls*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Pi*2*Math.atan(Math.tan(ls*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(zn.x,zn.y).multiplyScalar(-t/zn.z),zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(zn.x,zn.y).multiplyScalar(-t/zn.z)}getViewSize(t,e){return this.getViewBounds(t,lc,cc),e.subVectors(cc,lc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(ls*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var ki=class extends Ss{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},bo=class extends Kr{constructor(){super(new ki(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ds=class extends Vi{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.shadow=new bo}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},bs=class extends Vi{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ii=-90,Ti=1,Jr=class extends Fe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Te(Ii,Ti,t,e);s.layers=this.layers,this.add(s);let r=new Te(Ii,Ti,t,e);r.layers=this.layers,this.add(r);let a=new Te(Ii,Ti,t,e);a.layers=this.layers,this.add(a);let o=new Te(Ii,Ti,t,e);o.layers=this.layers,this.add(o);let c=new Te(Ii,Ti,t,e);c.layers=this.layers,this.add(c);let l=new Te(Ii,Ti,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===rn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Gi)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let B=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=B,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,h,p),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},Wr=class extends Te{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var il="\\[\\]\\.:\\/",Vu=new RegExp("["+il+"]","g"),sl="[^"+il+"]",ku="[^"+il.replace("\\.","")+"]",Ku=/((?:WC+[\/:])*)/.source.replace("WC",sl),Ju=/(WCOD+)?/.source.replace("WCOD",ku),Wu=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",sl),Xu=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",sl),Yu=new RegExp("^"+Ku+Ju+Wu+Xu+"$"),qu=["material","materials","bones","map"],Io=class{constructor(t,e,n){let s=n||ae.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ae=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Vu,"")}static parseTrackName(t){let e=Yu.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);qu.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=n(o.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){It("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){Tt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Tt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Tt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Tt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Tt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Tt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){Tt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[s];if(a===void 0){let l=e.nodeName;Tt("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Tt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Tt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ae.Composite=Io;ae.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ae.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ae.prototype.GetterByBindingType=[ae.prototype._getValue_direct,ae.prototype._getValue_array,ae.prototype._getValue_arrayElement,ae.prototype._getValue_toArray];ae.prototype.SetterByBindingTypeAndVersioning=[[ae.prototype._setValue_direct,ae.prototype._setValue_direct_setNeedsUpdate,ae.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ae.prototype._setValue_array,ae.prototype._setValue_array_setNeedsUpdate,ae.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ae.prototype._setValue_arrayElement,ae.prototype._setValue_arrayElement_setNeedsUpdate,ae.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ae.prototype._setValue_fromArray,ae.prototype._setValue_fromArray_setNeedsUpdate,ae.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var u0=new Float32Array(1);var Ki=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Nt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Nt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var hl=class hl{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};hl.prototype.isMatrix2=!0;var To=hl;var Is=class extends an{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function rl(i,t,e,n){let s=Qu(n);switch(e){case qo:return i*t;case Zo:return i*t/s.components*s.byteLength;case ea:return i*t/s.components*s.byteLength;case ei:return i*t*2/s.components*s.byteLength;case na:return i*t*2/s.components*s.byteLength;case Qo:return i*t*3/s.components*s.byteLength;case $e:return i*t*4/s.components*s.byteLength;case ia:return i*t*4/s.components*s.byteLength;case Rs:case Gs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ls:case Ps:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ra:case oa:return Math.max(i,16)*Math.max(t,8)/4;case sa:case aa:return Math.max(i,8)*Math.max(t,8)/2;case la:case ca:case ua:case da:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ha:case Ns:case fa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case pa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ma:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ga:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case _a:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ea:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ca:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case xa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ba:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Aa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ma:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ya:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case va:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Sa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Da:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ba:case Ia:case Ta:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Fa:case wa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Os:case Ra:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Qu(i){switch(i){case Ve:case Jo:return{byteLength:1,components:1};case Xi:case Wo:case un:return{byteLength:2,components:1};case $r:case ta:return{byteLength:2,components:4};case cn:case jr:case hn:return{byteLength:4,components:1};case Xo:case Yo:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window!="undefined"&&(window.__THREE__?It("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Ch(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function ju(i){let t=new WeakMap;function e(o,c){let l=o.array,u=o.usage,f=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array!="undefined"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){let u=c.array,f=c.updateRanges;if(i.bindBuffer(l,o),f.length===0)i.bufferSubData(l,0,u);else{f.sort((p,_)=>p.start-_.start);let h=0;for(let p=1;p<f.length;p++){let _=f[h],B=f[p];B.start<=_.start+_.count+1?_.count=Math.max(_.count,B.start+B.count-_.start):(++h,f[h]=B)}f.length=h+1;for(let p=0,_=f.length;p<_;p++){let B=f[p];i.bufferSubData(l,B.start*u.BYTES_PER_ELEMENT,u,B.start,B.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var $u=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,td=`#ifdef USE_ALPHAHASH
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
#endif`,ed=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,nd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,id=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,rd=`#ifdef USE_AOMAP
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
#endif`,ad=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,od=`#ifdef USE_BATCHING
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
#endif`,ld=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ud=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,dd=`#ifdef USE_IRIDESCENCE
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
#endif`,fd=`#ifdef USE_BUMPMAP
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
#endif`,pd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,md=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_d=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ed=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Cd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,xd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Bd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Ad=`#define PI 3.141592653589793
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
} // validated`,Md=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,yd=`vec3 transformedNormal = objectNormal;
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
#endif`,vd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Id="gl_FragColor = linearToOutputTexel( gl_FragColor );",Td=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Fd=`#ifdef USE_ENVMAP
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
#endif`,wd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Rd=`#ifdef USE_ENVMAP
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
#endif`,Gd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ld=`#ifdef USE_ENVMAP
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
#endif`,Pd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Nd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Od=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ud=`#ifdef USE_GRADIENTMAP
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
}`,zd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kd=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Jd=`#ifdef USE_ENVMAP
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
#endif`,Wd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qd=`PhysicalMaterial material;
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
#endif`,Zd=`uniform sampler2D dfgLUT;
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
}`,jd=`
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
#endif`,$d=`#if defined( RE_IndirectDiffuse )
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
#endif`,tf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ef=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,nf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,af=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,of=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hf=`#if defined( USE_POINTS_UV )
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
#endif`,uf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,df=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ff=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gf=`#ifdef USE_MORPHTARGETS
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
#endif`,_f=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ef=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Cf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,xf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Af=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Mf=`#ifdef USE_NORMALMAP
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
#endif`,yf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Df=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,bf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,If=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Tf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ff=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Pf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Nf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Of=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hf=`float getShadowMask() {
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
}`,Uf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zf=`#ifdef USE_SKINNING
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
#endif`,Vf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kf=`#ifdef USE_SKINNING
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
#endif`,Kf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Yf=`#ifdef USE_TRANSMISSION
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
#endif`,qf=`#ifdef USE_TRANSMISSION
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
#endif`,Qf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$f=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,tp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ep=`uniform sampler2D t2D;
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
}`,np=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ip=`#ifdef ENVMAP_TYPE_CUBE
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
}`,sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ap=`#include <common>
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
}`,op=`#if DEPTH_PACKING == 3200
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
}`,lp=`#define DISTANCE
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
}`,cp=`#define DISTANCE
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
}`,hp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,up=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dp=`uniform float scale;
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
}`,fp=`uniform vec3 diffuse;
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
}`,pp=`#include <common>
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
}`,mp=`uniform vec3 diffuse;
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
}`,gp=`#define LAMBERT
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
}`,_p=`#define LAMBERT
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
}`,Ep=`#define MATCAP
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
}`,Cp=`#define MATCAP
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
}`,xp=`#define NORMAL
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
}`,Bp=`#define NORMAL
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
}`,Ap=`#define PHONG
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
}`,Mp=`#define PHONG
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
}`,yp=`#define STANDARD
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
}`,vp=`#define STANDARD
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
}`,Sp=`#define TOON
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
}`,Dp=`#define TOON
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
}`,bp=`uniform float size;
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
}`,Ip=`uniform vec3 diffuse;
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
}`,Tp=`#include <common>
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
}`,Fp=`uniform vec3 color;
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
}`,wp=`uniform float rotation;
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
}`,Rp=`uniform vec3 diffuse;
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
}`,Pt={alphahash_fragment:$u,alphahash_pars_fragment:td,alphamap_fragment:ed,alphamap_pars_fragment:nd,alphatest_fragment:id,alphatest_pars_fragment:sd,aomap_fragment:rd,aomap_pars_fragment:ad,batching_pars_vertex:od,batching_vertex:ld,begin_vertex:cd,beginnormal_vertex:hd,bsdfs:ud,iridescence_fragment:dd,bumpmap_pars_fragment:fd,clipping_planes_fragment:pd,clipping_planes_pars_fragment:md,clipping_planes_pars_vertex:gd,clipping_planes_vertex:_d,color_fragment:Ed,color_pars_fragment:Cd,color_pars_vertex:xd,color_vertex:Bd,common:Ad,cube_uv_reflection_fragment:Md,defaultnormal_vertex:yd,displacementmap_pars_vertex:vd,displacementmap_vertex:Sd,emissivemap_fragment:Dd,emissivemap_pars_fragment:bd,colorspace_fragment:Id,colorspace_pars_fragment:Td,envmap_fragment:Fd,envmap_common_pars_fragment:wd,envmap_pars_fragment:Rd,envmap_pars_vertex:Gd,envmap_physical_pars_fragment:Jd,envmap_vertex:Ld,fog_vertex:Pd,fog_pars_vertex:Nd,fog_fragment:Od,fog_pars_fragment:Hd,gradientmap_pars_fragment:Ud,lightmap_pars_fragment:zd,lights_lambert_fragment:Vd,lights_lambert_pars_fragment:kd,lights_pars_begin:Kd,lights_toon_fragment:Wd,lights_toon_pars_fragment:Xd,lights_phong_fragment:Yd,lights_phong_pars_fragment:qd,lights_physical_fragment:Qd,lights_physical_pars_fragment:Zd,lights_fragment_begin:jd,lights_fragment_maps:$d,lights_fragment_end:tf,lightprobes_pars_fragment:ef,logdepthbuf_fragment:nf,logdepthbuf_pars_fragment:sf,logdepthbuf_pars_vertex:rf,logdepthbuf_vertex:af,map_fragment:of,map_pars_fragment:lf,map_particle_fragment:cf,map_particle_pars_fragment:hf,metalnessmap_fragment:uf,metalnessmap_pars_fragment:df,morphinstance_vertex:ff,morphcolor_vertex:pf,morphnormal_vertex:mf,morphtarget_pars_vertex:gf,morphtarget_vertex:_f,normal_fragment_begin:Ef,normal_fragment_maps:Cf,normal_pars_fragment:xf,normal_pars_vertex:Bf,normal_vertex:Af,normalmap_pars_fragment:Mf,clearcoat_normal_fragment_begin:yf,clearcoat_normal_fragment_maps:vf,clearcoat_pars_fragment:Sf,iridescence_pars_fragment:Df,opaque_fragment:bf,packing:If,premultiplied_alpha_fragment:Tf,project_vertex:Ff,dithering_fragment:wf,dithering_pars_fragment:Rf,roughnessmap_fragment:Gf,roughnessmap_pars_fragment:Lf,shadowmap_pars_fragment:Pf,shadowmap_pars_vertex:Nf,shadowmap_vertex:Of,shadowmask_pars_fragment:Hf,skinbase_vertex:Uf,skinning_pars_vertex:zf,skinning_vertex:Vf,skinnormal_vertex:kf,specularmap_fragment:Kf,specularmap_pars_fragment:Jf,tonemapping_fragment:Wf,tonemapping_pars_fragment:Xf,transmission_fragment:Yf,transmission_pars_fragment:qf,uv_pars_fragment:Qf,uv_pars_vertex:Zf,uv_vertex:jf,worldpos_vertex:$f,background_vert:tp,background_frag:ep,backgroundCube_vert:np,backgroundCube_frag:ip,cube_vert:sp,cube_frag:rp,depth_vert:ap,depth_frag:op,distance_vert:lp,distance_frag:cp,equirect_vert:hp,equirect_frag:up,linedashed_vert:dp,linedashed_frag:fp,meshbasic_vert:pp,meshbasic_frag:mp,meshlambert_vert:gp,meshlambert_frag:_p,meshmatcap_vert:Ep,meshmatcap_frag:Cp,meshnormal_vert:xp,meshnormal_frag:Bp,meshphong_vert:Ap,meshphong_frag:Mp,meshphysical_vert:yp,meshphysical_frag:vp,meshtoon_vert:Sp,meshtoon_frag:Dp,points_vert:bp,points_frag:Ip,shadow_vert:Tp,shadow_frag:Fp,sprite_vert:wp,sprite_frag:Rp},ut={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new wt},alphaMap:{value:null},alphaMapTransform:{value:new wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new wt}},envmap:{envMap:{value:null},envMapRotation:{value:new wt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new wt},normalScale:{value:new Ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new wt},alphaTest:{value:0},uvTransform:{value:new wt}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new Ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new wt},alphaMap:{value:null},alphaMapTransform:{value:new wt},alphaTest:{value:0}}},Bn={basic:{uniforms:we([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Pt.meshbasic_vert,fragmentShader:Pt.meshbasic_frag},lambert:{uniforms:we([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new zt(0)},envMapIntensity:{value:1}}]),vertexShader:Pt.meshlambert_vert,fragmentShader:Pt.meshlambert_frag},phong:{uniforms:we([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Pt.meshphong_vert,fragmentShader:Pt.meshphong_frag},standard:{uniforms:we([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Pt.meshphysical_vert,fragmentShader:Pt.meshphysical_frag},toon:{uniforms:we([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new zt(0)}}]),vertexShader:Pt.meshtoon_vert,fragmentShader:Pt.meshtoon_frag},matcap:{uniforms:we([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Pt.meshmatcap_vert,fragmentShader:Pt.meshmatcap_frag},points:{uniforms:we([ut.points,ut.fog]),vertexShader:Pt.points_vert,fragmentShader:Pt.points_frag},dashed:{uniforms:we([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Pt.linedashed_vert,fragmentShader:Pt.linedashed_frag},depth:{uniforms:we([ut.common,ut.displacementmap]),vertexShader:Pt.depth_vert,fragmentShader:Pt.depth_frag},normal:{uniforms:we([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Pt.meshnormal_vert,fragmentShader:Pt.meshnormal_frag},sprite:{uniforms:we([ut.sprite,ut.fog]),vertexShader:Pt.sprite_vert,fragmentShader:Pt.sprite_frag},background:{uniforms:{uvTransform:{value:new wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Pt.background_vert,fragmentShader:Pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new wt}},vertexShader:Pt.backgroundCube_vert,fragmentShader:Pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Pt.cube_vert,fragmentShader:Pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Pt.equirect_vert,fragmentShader:Pt.equirect_frag},distance:{uniforms:we([ut.common,ut.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Pt.distance_vert,fragmentShader:Pt.distance_frag},shadow:{uniforms:we([ut.lights,ut.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:Pt.shadow_vert,fragmentShader:Pt.shadow_frag}};Bn.physical={uniforms:we([Bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new wt},clearcoatNormalScale:{value:new Ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new wt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new wt},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new wt},transmissionSamplerSize:{value:new Ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new wt},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new wt},anisotropyVector:{value:new Ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new wt}}]),vertexShader:Pt.meshphysical_vert,fragmentShader:Pt.meshphysical_frag};var Na={r:0,b:0,g:0},Gp=new ue,xh=new wt;xh.set(-1,0,0,0,1,0,0,0,1);function Lp(i,t,e,n,s,r){let a=new zt(0),o=s===!0?0:1,c,l,u=null,f=0,h=null;function p(x){let D=x.isScene===!0?x.background:null;if(D&&D.isTexture){let A=x.backgroundBlurriness>0;D=t.get(D,A)}return D}function _(x){let D=!1,A=p(x);A===null?m(a,o):A&&A.isColor&&(m(A,1),D=!0);let y=i.xr.getEnvironmentBlendMode();y==="additive"?e.buffers.color.setClear(0,0,0,1,r):y==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||D)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function B(x,D){let A=p(D);A&&(A.isCubeTexture||A.mapping===Fs)?(l===void 0&&(l=new fe(new Tn(1,1,1),new qe({name:"BackgroundCubeMaterial",uniforms:di(Bn.backgroundCube.uniforms),vertexShader:Bn.backgroundCube.vertexShader,fragmentShader:Bn.backgroundCube.fragmentShader,side:Le,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(y,M,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=A,l.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Gp.makeRotationFromEuler(D.backgroundRotation)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(xh),l.material.toneMapped=kt.getTransfer(A.colorSpace)!==qt,(u!==A||f!==A.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=A,f=A.version,h=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new fe(new Fn(2,2),new qe({name:"BackgroundMaterial",uniforms:di(Bn.background.uniforms),vertexShader:Bn.background.vertexShader,fragmentShader:Bn.background.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,c.material.toneMapped=kt.getTransfer(A.colorSpace)!==qt,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||f!==A.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=A,f=A.version,h=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function m(x,D){x.getRGB(Na,nl(i)),e.buffers.color.setClear(Na.r,Na.g,Na.b,D,r)}function d(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,D=1){a.set(x),o=D,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,m(a,o)},render:_,addToRenderList:B,dispose:d}}function Pp(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,a=!1;function o(L,O,T,b,N){let R=!1,U=f(L,b,T,O);r!==U&&(r=U,l(r.object)),R=p(L,b,T,N),R&&_(L,b,T,N),N!==null&&t.update(N,i.ELEMENT_ARRAY_BUFFER),(R||a)&&(a=!1,A(L,O,T,b),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function c(){return i.createVertexArray()}function l(L){return i.bindVertexArray(L)}function u(L){return i.deleteVertexArray(L)}function f(L,O,T,b){let N=b.wireframe===!0,R=n[O.id];R===void 0&&(R={},n[O.id]=R);let U=L.isInstancedMesh===!0?L.id:0,j=R[U];j===void 0&&(j={},R[U]=j);let K=j[T.id];K===void 0&&(K={},j[T.id]=K);let X=K[N];return X===void 0&&(X=h(c()),K[N]=X),X}function h(L){let O=[],T=[],b=[];for(let N=0;N<e;N++)O[N]=0,T[N]=0,b[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:T,attributeDivisors:b,object:L,attributes:{},index:null}}function p(L,O,T,b){let N=r.attributes,R=O.attributes,U=0,j=T.getAttributes();for(let K in j)if(j[K].location>=0){let Y=N[K],_t=R[K];if(_t===void 0&&(K==="instanceMatrix"&&L.instanceMatrix&&(_t=L.instanceMatrix),K==="instanceColor"&&L.instanceColor&&(_t=L.instanceColor)),Y===void 0||Y.attribute!==_t||_t&&Y.data!==_t.data)return!0;U++}return r.attributesNum!==U||r.index!==b}function _(L,O,T,b){let N={},R=O.attributes,U=0,j=T.getAttributes();for(let K in j)if(j[K].location>=0){let Y=R[K];Y===void 0&&(K==="instanceMatrix"&&L.instanceMatrix&&(Y=L.instanceMatrix),K==="instanceColor"&&L.instanceColor&&(Y=L.instanceColor));let _t={};_t.attribute=Y,Y&&Y.data&&(_t.data=Y.data),N[K]=_t,U++}r.attributes=N,r.attributesNum=U,r.index=b}function B(){let L=r.newAttributes;for(let O=0,T=L.length;O<T;O++)L[O]=0}function m(L){d(L,0)}function d(L,O){let T=r.newAttributes,b=r.enabledAttributes,N=r.attributeDivisors;T[L]=1,b[L]===0&&(i.enableVertexAttribArray(L),b[L]=1),N[L]!==O&&(i.vertexAttribDivisor(L,O),N[L]=O)}function x(){let L=r.newAttributes,O=r.enabledAttributes;for(let T=0,b=O.length;T<b;T++)O[T]!==L[T]&&(i.disableVertexAttribArray(T),O[T]=0)}function D(L,O,T,b,N,R,U){U===!0?i.vertexAttribIPointer(L,O,T,N,R):i.vertexAttribPointer(L,O,T,b,N,R)}function A(L,O,T,b){B();let N=b.attributes,R=T.getAttributes(),U=O.defaultAttributeValues;for(let j in R){let K=R[j];if(K.location>=0){let X=N[j];if(X===void 0&&(j==="instanceMatrix"&&L.instanceMatrix&&(X=L.instanceMatrix),j==="instanceColor"&&L.instanceColor&&(X=L.instanceColor)),X!==void 0){let Y=X.normalized,_t=X.itemSize,Et=t.get(X);if(Et===void 0)continue;let jt=Et.buffer,Ot=Et.type,Kt=Et.bytesPerElement,q=Ot===i.INT||Ot===i.UNSIGNED_INT||X.gpuType===jr;if(X.isInterleavedBufferAttribute){let et=X.data,mt=et.stride,yt=X.offset;if(et.isInstancedInterleavedBuffer){for(let ct=0;ct<K.locationSize;ct++)d(K.location+ct,et.meshPerAttribute);L.isInstancedMesh!==!0&&b._maxInstanceCount===void 0&&(b._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let ct=0;ct<K.locationSize;ct++)m(K.location+ct);i.bindBuffer(i.ARRAY_BUFFER,jt);for(let ct=0;ct<K.locationSize;ct++)D(K.location+ct,_t/K.locationSize,Ot,Y,mt*Kt,(yt+_t/K.locationSize*ct)*Kt,q)}else{if(X.isInstancedBufferAttribute){for(let et=0;et<K.locationSize;et++)d(K.location+et,X.meshPerAttribute);L.isInstancedMesh!==!0&&b._maxInstanceCount===void 0&&(b._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let et=0;et<K.locationSize;et++)m(K.location+et);i.bindBuffer(i.ARRAY_BUFFER,jt);for(let et=0;et<K.locationSize;et++)D(K.location+et,_t/K.locationSize,Ot,Y,_t*Kt,_t/K.locationSize*et*Kt,q)}}else if(U!==void 0){let Y=U[j];if(Y!==void 0)switch(Y.length){case 2:i.vertexAttrib2fv(K.location,Y);break;case 3:i.vertexAttrib3fv(K.location,Y);break;case 4:i.vertexAttrib4fv(K.location,Y);break;default:i.vertexAttrib1fv(K.location,Y)}}}}x()}function y(){v();for(let L in n){let O=n[L];for(let T in O){let b=O[T];for(let N in b){let R=b[N];for(let U in R)u(R[U].object),delete R[U];delete b[N]}}delete n[L]}}function M(L){if(n[L.id]===void 0)return;let O=n[L.id];for(let T in O){let b=O[T];for(let N in b){let R=b[N];for(let U in R)u(R[U].object),delete R[U];delete b[N]}}delete n[L.id]}function I(L){for(let O in n){let T=n[O];for(let b in T){let N=T[b];if(N[L.id]===void 0)continue;let R=N[L.id];for(let U in R)u(R[U].object),delete R[U];delete N[L.id]}}}function E(L){for(let O in n){let T=n[O],b=L.isInstancedMesh===!0?L.id:0,N=T[b];if(N!==void 0){for(let R in N){let U=N[R];for(let j in U)u(U[j].object),delete U[j];delete N[R]}delete T[b],Object.keys(T).length===0&&delete n[O]}}}function v(){F(),a=!0,r!==s&&(r=s,l(r.object))}function F(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:v,resetDefaultState:F,dispose:y,releaseStatesOfGeometry:M,releaseStatesOfObject:E,releaseStatesOfProgram:I,initAttributes:B,enableAttribute:m,disableUnusedAttributes:x}}function Np(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),e.update(l,n,u))}function o(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let p=0;p<u;p++)h+=l[p];e.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Op(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let I=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(I){return!(I!==$e&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(I){let E=I===un&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==Ve&&I!==hn&&!E&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",u=c(l);u!==l&&(It("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&It("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),B=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),D=i.getParameter(i.MAX_VARYING_VECTORS),A=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=i.getParameter(i.MAX_SAMPLES),M=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:_,maxTextureSize:B,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:x,maxVaryings:D,maxFragmentUniforms:A,maxSamples:y,samples:M}}function Hp(i){let t=this,e=null,n=0,s=!1,r=!1,a=new Xe,o=new wt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let p=f.length!==0||h||n!==0||s;return s=h,n=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,p){let _=f.clippingPlanes,B=f.clipIntersection,m=f.clipShadows,d=i.get(f);if(!s||_===null||_.length===0||r&&!m)r?u(null):l();else{let x=r?0:n,D=x*4,A=d.clippingState||null;c.value=A,A=u(_,h,D,p);for(let y=0;y!==D;++y)A[y]=e[y];d.clippingState=A,this.numIntersection=B?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,h,p,_){let B=f!==null?f.length:0,m=null;if(B!==0){if(m=c.value,_!==!0||m===null){let d=p+B*4,x=h.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<d)&&(m=new Float32Array(d));for(let D=0,A=p;D!==B;++D,A+=4)a.copy(f[D]).applyMatrix4(x,o),a.normal.toArray(m,A),m[A+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=B,t.numIntersection=0,m}}var Zi=4,Up=6,zp=20,Vp=256,Hs=new ki,jc=new zt,ul=null,dl=0,fl=0,pl=!1,kp=new H,fi=new H,Ha=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=kp}=r;ul=this._renderer.getRenderTarget(),dl=this._renderer.getActiveCubeFace(),fl=this._renderer.getActiveMipmapLevel(),pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=eh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=th(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(ul,dl,fl),this._renderer.xr.enabled=pl,t.scissorTest=!1,Qi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===jn||t.mapping===ui?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ul=this._renderer.getRenderTarget(),dl=this._renderer.getActiveCubeFace(),fl=this._renderer.getActiveMipmapLevel(),pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ve,minFilter:ve,generateMipmaps:!1,type:un,format:$e,colorSpace:us,depthBuffer:!1},s=$c(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$c(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Kp(r)),this._blurMaterial=Wp(r,t,e),this._ggxMaterial=Jp(r,t,e)}return s}_compileMaterial(t){let e=new fe(new ze,t);this._renderer.compile(e,Hs)}_sceneToCubeUV(t,e,n,s,r){let c=new Te(90,1,e,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,p=f.toneMapping;f.getClearColor(jc),f.toneMapping=ln,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new fe(new Tn,new Cs({name:"PMREM.Background",side:Le,depthWrite:!1,depthTest:!1})));let B=this._backgroundBox,m=B.material,d=!1,x=t.background;x?x.isColor&&(m.color.copy(x),t.background=null,d=!0):(m.color.copy(jc),d=!0);for(let D=0;D<6;D++){let A=D%3;A===0?(c.up.set(0,l[D],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[D],r.y,r.z)):A===1?(c.up.set(0,0,l[D]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[D],r.z)):(c.up.set(0,l[D],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[D]));let y=this._cubeSize;Qi(s,A*y,D>2?y:0,y,y),f.setRenderTarget(s),d&&f.render(B,c),f.render(t,c)}f.toneMapping=p,f.autoClear=h,t.background=x}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===jn||t.mapping===ui;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=eh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=th());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let c=this._cubeSize;Qi(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Hs)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),h=l*1.25,p=f*h,{_lodMax:_}=this,B=this._sizeLods[n],m=3*B*(n>_-Zi?n-_+Zi:0),d=4*(this._cubeSize-B);c.envMap.value=t.texture,c.roughness.value=p,c.mipInt.value=_-e,Qi(r,m,d,3*B,2*B),s.setRenderTarget(r),s.render(o,Hs),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=_-n,Qi(t,m,d,3*B,2*B),s.setRenderTarget(t),s.render(o,Hs)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],f=3*u*(s>this._lodMax-Zi?s-this._lodMax+Zi:0),h=4*(this._cubeSize-u);Qi(e,f,h,3*u,2*u),a.setRenderTarget(e),a.render(c,Hs)}};function Kp(i){let t=[],e=[],n=i,s=i-Zi+1+Up;for(let r=0;r<s;r++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,h=6,p=3,_=new Float32Array(p*h*f),B=new Float32Array(p*h*f);for(let d=0;d<f;d++){let x=d%3*2/3-1,D=d>2?0:-1,A=[x,D,0,x+2/3,D,0,x+2/3,D+1,0,x,D,0,x+2/3,D+1,0,x,D+1,0];_.set(A,p*h*d);for(let y=0;y<h;y++){let M=u[y*2]*2-1,I=u[y*2+1]*2-1;d===0?fi.set(1,I,M):d===1?fi.set(-M,1,-I):d===2?fi.set(-M,I,1):d===3?fi.set(-1,I,-M):d===4?fi.set(-M,-1,I):fi.set(M,I,-1),fi.toArray(B,(d*h+y)*p)}}let m=new ze;m.setAttribute("position",new Oe(_,p)),m.setAttribute("outputDirection",new Oe(B,p)),e.push(new fe(m,null)),n>Zi&&n--}return{lodMeshes:e,sizeLods:t}}function $c(i,t,e){let n=new Ue(i,t,e);return n.texture.mapping=Fs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qi(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Jp(i,t,e){return new qe({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Vp,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Va(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Wp(i,t,e){return new qe({name:"SphericalGaussianBlur",defines:{SAMPLES:zp,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Va(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function th(){return new qe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Va(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function eh(){return new qe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Va(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Va(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ua=class extends Ue{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new xs(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Tn(5,5,5),r=new qe({name:"CubemapFromEquirect",uniforms:di(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Le,blending:Cn});r.uniforms.tEquirect.value=e;let a=new fe(s,r),o=e.minFilter;return e.minFilter===$n&&(e.minFilter=ve),new Jr(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function Xp(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,p=!1){return h==null?null:p?a(h):r(h)}function r(h){if(h&&h.isTexture){let p=h.mapping;if(p===qr||p===Qr)if(t.has(h)){let _=t.get(h).texture;return o(_,h.mapping)}else{let _=h.image;if(_&&_.height>0){let B=new Ua(_.height);return B.fromEquirectangularTexture(i,h),t.set(h,B),h.addEventListener("dispose",l),o(B.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let p=h.mapping,_=p===qr||p===Qr,B=p===jn||p===ui;if(_||B){let m=e.get(h),d=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==d)return n===null&&(n=new Ha(i)),m=_?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),m.texture;if(m!==void 0)return m.texture;{let x=h.image;return _&&x&&x.height>0||B&&x&&c(x)?(n===null&&(n=new Ha(i)),m=_?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,p){return p===qr?h.mapping=jn:p===Qr&&(h.mapping=ui),h}function c(h){let p=0,_=6;for(let B=0;B<_;B++)h[B]!==void 0&&p++;return p===_}function l(h){let p=h.target;p.removeEventListener("dispose",l);let _=t.get(p);_!==void 0&&(t.delete(p),_.dispose())}function u(h){let p=h.target;p.removeEventListener("dispose",u);let _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function Yp(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&ci("WebGLRenderer: "+n+" extension not supported."),s}}}function qp(i,t,e,n){let s={},r=new WeakMap;function a(f){let h=f.target;h.index!==null&&t.remove(h.index);for(let _ in h.attributes)t.remove(h.attributes[_]);h.removeEventListener("dispose",a),delete s[h.id];let p=r.get(h);p&&(t.remove(p),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function c(f){let h=f.attributes;for(let p in h)t.update(h[p],i.ARRAY_BUFFER)}function l(f){let h=[],p=f.index,_=f.attributes.position,B=0;if(_===void 0)return;if(p!==null){let x=p.array;B=p.version;for(let D=0,A=x.length;D<A;D+=3){let y=x[D+0],M=x[D+1],I=x[D+2];h.push(y,M,M,I,I,y)}}else{let x=_.array;B=_.version;for(let D=0,A=x.length/3-1;D<A;D+=3){let y=D+0,M=D+1,I=D+2;h.push(y,M,M,I,I,y)}}let m=new(_.count>=65535?Es:_s)(h,1);m.version=B;let d=r.get(f);d&&t.remove(d),r.set(f,m)}function u(f){let h=r.get(f);if(h){let p=f.index;p!==null&&h.version<p.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function Qp(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,h){i.drawElements(n,h,r,f*a),e.update(h,n,1)}function l(f,h,p){p!==0&&(i.drawElementsInstanced(n,h,r,f*a,p),e.update(h,n,p))}function u(f,h,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,p);let B=0;for(let m=0;m<p;m++)B+=h[m];e.update(B,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Zp(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Tt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function jp(i,t,e){let n=new WeakMap,s=new le;function r(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==f){let v=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",v)};h!==void 0&&h.texture.dispose();let p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,B=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],x=o.morphAttributes.color||[],D=0;p===!0&&(D=1),_===!0&&(D=2),B===!0&&(D=3);let A=o.attributes.position.count*D,y=1;A>t.maxTextureSize&&(y=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);let M=new Float32Array(A*y*4*f),I=new ps(M,A,y,f);I.type=hn,I.needsUpdate=!0;let E=D*4;for(let F=0;F<f;F++){let L=m[F],O=d[F],T=x[F],b=A*y*4*F;for(let N=0;N<L.count;N++){let R=N*E;p===!0&&(s.fromBufferAttribute(L,N),M[b+R+0]=s.x,M[b+R+1]=s.y,M[b+R+2]=s.z,M[b+R+3]=0),_===!0&&(s.fromBufferAttribute(O,N),M[b+R+4]=s.x,M[b+R+5]=s.y,M[b+R+6]=s.z,M[b+R+7]=0),B===!0&&(s.fromBufferAttribute(T,N),M[b+R+8]=s.x,M[b+R+9]=s.y,M[b+R+10]=s.z,M[b+R+11]=T.itemSize===4?s.w:1)}}h={count:f,texture:I,size:new Ft(A,y)},n.set(o,h),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let p=0;for(let B=0;B<l.length;B++)p+=l[B];let _=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function $p(i,t,e,n,s){let r=new WeakMap;function a(l){let u=s.render.frame,f=l.geometry,h=t.get(l,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let p=l.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return h}function o(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}var tm={[No]:"LINEAR_TONE_MAPPING",[Oo]:"REINHARD_TONE_MAPPING",[Ho]:"CINEON_TONE_MAPPING",[Uo]:"ACES_FILMIC_TONE_MAPPING",[Vo]:"AGX_TONE_MAPPING",[ko]:"NEUTRAL_TONE_MAPPING",[zo]:"CUSTOM_TONE_MAPPING"};function em(i,t,e,n,s,r){let a=new Ue(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new ze;l.setAttribute("position",new Ae([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ae([0,2,0,0,2,0],2));let u=new Fr({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new fe(l,u),h=new ki(-1,1,1,-1,0,1),p=null,_=null,B=!1,m,d=null,x=[],D=!1;this.setSize=function(A,y){a.setSize(A,y),o!==null&&o.setSize(A,y),c!==null&&c.setSize(A,y);for(let M=0;M<x.length;M++){let I=x[M];I.setSize&&I.setSize(A,y)}},this.setEffects=function(A){x=A,D=x.length>0&&x[0].isRenderPass===!0;let y=a.width,M=a.height;x.length>0&&o===null&&(o=new Ue(y,M,{type:un,depthBuffer:!1,stencilBuffer:!1}),c=new Ue(y,M,{type:un,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<x.length;I++){let E=x[I];E.setSize&&E.setSize(y,M)}},this.begin=function(A,y){if(B||A.toneMapping===ln&&x.length===0)return!1;if(d=y,y!==null){let M=y.width,I=y.height;(a.width!==M||a.height!==I)&&this.setSize(M,I)}return D===!1&&A.setRenderTarget(a),m=A.toneMapping,A.toneMapping=ln,!0},this.hasRenderPass=function(){return D},this.end=function(A,y){A.toneMapping=m,B=!0;let M=a,I=o;for(let E=0;E<x.length;E++){let v=x[E];v.enabled!==!1&&(v.render(A,I,M,y),v.needsSwap!==!1&&(M=I,I=I===o?c:o))}if(p!==A.outputColorSpace||_!==A.toneMapping){p=A.outputColorSpace,_=A.toneMapping,u.defines={},kt.getTransfer(p)===qt&&(u.defines.SRGB_TRANSFER="");let E=tm[_];E&&(u.defines[E]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=M.texture,A.setRenderTarget(d),A.render(f,h),d=null,B=!1},this.isCompositing=function(){return B},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Bh=new He,_l=new Jn(1,1),Ah=new ps,Mh=new Dr,yh=new xs,nh=[],ih=[],sh=new Float32Array(16),rh=new Float32Array(9),ah=new Float32Array(4);function $i(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=nh[s];if(r===void 0&&(r=new Float32Array(s),nh[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function _e(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ee(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ka(i,t){let e=ih[t];e===void 0&&(e=new Int32Array(t),ih[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function nm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function im(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;i.uniform2fv(this.addr,t),Ee(e,t)}}function sm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(_e(e,t))return;i.uniform3fv(this.addr,t),Ee(e,t)}}function rm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;i.uniform4fv(this.addr,t),Ee(e,t)}}function am(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(_e(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(_e(e,n))return;ah.set(n),i.uniformMatrix2fv(this.addr,!1,ah),Ee(e,n)}}function om(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(_e(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(_e(e,n))return;rh.set(n),i.uniformMatrix3fv(this.addr,!1,rh),Ee(e,n)}}function lm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(_e(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(_e(e,n))return;sh.set(n),i.uniformMatrix4fv(this.addr,!1,sh),Ee(e,n)}}function cm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function hm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;i.uniform2iv(this.addr,t),Ee(e,t)}}function um(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;i.uniform3iv(this.addr,t),Ee(e,t)}}function dm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;i.uniform4iv(this.addr,t),Ee(e,t)}}function fm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function pm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;i.uniform2uiv(this.addr,t),Ee(e,t)}}function mm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;i.uniform3uiv(this.addr,t),Ee(e,t)}}function gm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;i.uniform4uiv(this.addr,t),Ee(e,t)}}function _m(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(_l.compareFunction=e.isReversedDepthBuffer()?Pa:La,r=_l):r=Bh,e.setTexture2D(t||r,s)}function Em(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Mh,s)}function Cm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||yh,s)}function xm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Ah,s)}function Bm(i){switch(i){case 5126:return nm;case 35664:return im;case 35665:return sm;case 35666:return rm;case 35674:return am;case 35675:return om;case 35676:return lm;case 5124:case 35670:return cm;case 35667:case 35671:return hm;case 35668:case 35672:return um;case 35669:case 35673:return dm;case 5125:return fm;case 36294:return pm;case 36295:return mm;case 36296:return gm;case 35678:case 36198:case 36298:case 36306:case 35682:return _m;case 35679:case 36299:case 36307:return Em;case 35680:case 36300:case 36308:case 36293:return Cm;case 36289:case 36303:case 36311:case 36292:return xm}}function Am(i,t){i.uniform1fv(this.addr,t)}function Mm(i,t){let e=$i(t,this.size,2);i.uniform2fv(this.addr,e)}function ym(i,t){let e=$i(t,this.size,3);i.uniform3fv(this.addr,e)}function vm(i,t){let e=$i(t,this.size,4);i.uniform4fv(this.addr,e)}function Sm(i,t){let e=$i(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Dm(i,t){let e=$i(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function bm(i,t){let e=$i(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Im(i,t){i.uniform1iv(this.addr,t)}function Tm(i,t){i.uniform2iv(this.addr,t)}function Fm(i,t){i.uniform3iv(this.addr,t)}function wm(i,t){i.uniform4iv(this.addr,t)}function Rm(i,t){i.uniform1uiv(this.addr,t)}function Gm(i,t){i.uniform2uiv(this.addr,t)}function Lm(i,t){i.uniform3uiv(this.addr,t)}function Pm(i,t){i.uniform4uiv(this.addr,t)}function Nm(i,t,e){let n=this.cache,s=t.length,r=ka(e,s);_e(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=_l:a=Bh;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Om(i,t,e){let n=this.cache,s=t.length,r=ka(e,s);_e(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Mh,r[a])}function Hm(i,t,e){let n=this.cache,s=t.length,r=ka(e,s);_e(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||yh,r[a])}function Um(i,t,e){let n=this.cache,s=t.length,r=ka(e,s);_e(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Ah,r[a])}function zm(i){switch(i){case 5126:return Am;case 35664:return Mm;case 35665:return ym;case 35666:return vm;case 35674:return Sm;case 35675:return Dm;case 35676:return bm;case 5124:case 35670:return Im;case 35667:case 35671:return Tm;case 35668:case 35672:return Fm;case 35669:case 35673:return wm;case 5125:return Rm;case 36294:return Gm;case 36295:return Lm;case 36296:return Pm;case 35678:case 36198:case 36298:case 36306:case 35682:return Nm;case 35679:case 36299:case 36307:return Om;case 35680:case 36300:case 36308:case 36293:return Hm;case 36289:case 36303:case 36311:case 36292:return Um}}var El=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Bm(e.type)}},Cl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=zm(e.type)}},xl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},ml=/(\w+)(\])?(\[|\.)?/g;function oh(i,t){i.seq.push(t),i.map[t.id]=t}function Vm(i,t,e){let n=i.name,s=n.length;for(ml.lastIndex=0;;){let r=ml.exec(n),a=ml.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){oh(e,l===void 0?new El(o,i,t):new Cl(o,i,t));break}else{let f=e.map[o];f===void 0&&(f=new xl(o),oh(e,f)),e=f}}}var ji=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);Vm(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function lh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var km=37297,Km=0;function Jm(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var ch=new wt;function Wm(i){kt._getMatrix(ch,kt.workingColorSpace,i);let t=`mat3( ${ch.elements.map(e=>e.toFixed(4))} )`;switch(kt.getTransfer(i)){case ds:return[t,"LinearTransferOETF"];case qt:return[t,"sRGBTransferOETF"];default:return It("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function hh(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Jm(i.getShaderSource(t),o)}else return r}function Xm(i,t){let e=Wm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var Ym={[No]:"Linear",[Oo]:"Reinhard",[Ho]:"Cineon",[Uo]:"ACESFilmic",[Vo]:"AgX",[ko]:"Neutral",[zo]:"Custom"};function qm(i,t){let e=Ym[t];return e===void 0?(It("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Oa=new H;function Qm(){kt.getLuminanceCoefficients(Oa);let i=Oa.x.toFixed(4),t=Oa.y.toFixed(4),e=Oa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Zm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zs).join(`
`)}function jm(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function $m(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function zs(i){return i!==""}function uh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function dh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var tg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bl(i){return i.replace(tg,ng)}var eg=new Map;function ng(i,t){let e=Pt[t];if(e===void 0){let n=eg.get(t);if(n!==void 0)e=Pt[n],It('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Bl(e)}var ig=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fh(i){return i.replace(ig,sg)}function sg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ph(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var rg={[Ts]:"SHADOWMAP_TYPE_PCF",[Ji]:"SHADOWMAP_TYPE_VSM"};function ag(i){return rg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var og={[jn]:"ENVMAP_TYPE_CUBE",[ui]:"ENVMAP_TYPE_CUBE",[Fs]:"ENVMAP_TYPE_CUBE_UV"};function lg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":og[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var cg={[ui]:"ENVMAP_MODE_REFRACTION"};function hg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":cg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var ug={[Yr]:"ENVMAP_BLENDING_MULTIPLY",[Fc]:"ENVMAP_BLENDING_MIX",[wc]:"ENVMAP_BLENDING_ADD"};function dg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":ug[i.combine]||"ENVMAP_BLENDING_NONE"}function fg(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function pg(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=ag(e),l=lg(e),u=hg(e),f=dg(e),h=fg(e),p=Zm(e),_=jm(r),B=s.createProgram(),m,d,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(zs).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(zs).join(`
`),d.length>0&&(d+=`
`)):(m=[ph(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zs).join(`
`),d=[ph(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ln?"#define TONE_MAPPING":"",e.toneMapping!==ln?Pt.tonemapping_pars_fragment:"",e.toneMapping!==ln?qm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Pt.colorspace_pars_fragment,Xm("linearToOutputTexel",e.outputColorSpace),Qm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(zs).join(`
`)),a=Bl(a),a=uh(a,e),a=dh(a,e),o=Bl(o),o=uh(o,e),o=dh(o,e),a=fh(a),o=fh(o),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===jo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===jo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let D=x+m+a,A=x+d+o,y=lh(s,s.VERTEX_SHADER,D),M=lh(s,s.FRAGMENT_SHADER,A);s.attachShader(B,y),s.attachShader(B,M),e.index0AttributeName!==void 0?s.bindAttribLocation(B,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(B,0,"position"),s.linkProgram(B);function I(L){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(B)||"",T=s.getShaderInfoLog(y)||"",b=s.getShaderInfoLog(M)||"",N=O.trim(),R=T.trim(),U=b.trim(),j=!0,K=!0;if(s.getProgramParameter(B,s.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,B,y,M);else{let X=hh(s,y,"vertex"),Y=hh(s,M,"fragment");Tt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(B,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+N+`
`+X+`
`+Y)}else N!==""?It("WebGLProgram: Program Info Log:",N):(R===""||U==="")&&(K=!1);K&&(L.diagnostics={runnable:j,programLog:N,vertexShader:{log:R,prefix:m},fragmentShader:{log:U,prefix:d}})}s.deleteShader(y),s.deleteShader(M),E=new ji(s,B),v=$m(s,B)}let E;this.getUniforms=function(){return E===void 0&&I(this),E};let v;this.getAttributes=function(){return v===void 0&&I(this),v};let F=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=s.getProgramParameter(B,km)),F},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(B),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Km++,this.cacheKey=t,this.usedTimes=1,this.program=B,this.vertexShader=y,this.fragmentShader=M,this}var mg=0,Al=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Ml(t),e.set(t,n)),n}},Ml=class{constructor(t){this.id=mg++,this.code=t,this.usedTimes=0}};function gg(i){return i===ei||i===Ns||i===Os}function _g(i,t,e,n,s,r){let a=new ms,o=new Al,c=new Set,l=[],u=new Map,f=n.logarithmicDepthBuffer,h=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return c.add(E),E===0?"uv":`uv${E}`}function B(E,v,F,L,O,T){let b=L.fog,N=O.geometry,R=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?L.environment:null,U=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,j=t.get(E.envMap||R,U),K=j&&j.mapping===Fs?j.image.height:null,X=p[E.type];E.precision!==null&&(h=n.getMaxPrecision(E.precision),h!==E.precision&&It("WebGLProgram.getParameters:",E.precision,"not supported, using",h,"instead."));let Y=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,_t=Y!==void 0?Y.length:0,Et=0;N.morphAttributes.position!==void 0&&(Et=1),N.morphAttributes.normal!==void 0&&(Et=2),N.morphAttributes.color!==void 0&&(Et=3);let jt,Ot,Kt,q;if(X){let ie=Bn[X];jt=ie.vertexShader,Ot=ie.fragmentShader}else{jt=E.vertexShader,Ot=E.fragmentShader;let ie=o.getVertexShaderStage(E),Xt=o.getFragmentShaderStage(E);o.update(E,ie,Xt),Kt=ie.id,q=Xt.id}let et=i.getRenderTarget(),mt=i.state.buffers.depth.getReversed(),yt=O.isInstancedMesh===!0,ct=O.isBatchedMesh===!0,Gt=!!E.map,ce=!!E.matcap,Ht=!!j,Wt=!!E.aoMap,ne=!!E.lightMap,Vt=!!E.bumpMap&&E.wireframe===!1,oe=!!E.normalMap,xe=!!E.displacementMap,Ne=!!E.emissiveMap,he=!!E.metalnessMap,pe=!!E.roughnessMap,P=E.anisotropy>0,Se=E.clearcoat>0,Qt=E.dispersion>0,S=E.retroreflectivity>0,g=E.iridescence>0,z=E.sheen>0,J=E.transmission>0,Q=P&&!!E.anisotropyMap,it=Se&&!!E.clearcoatMap,st=Se&&!!E.clearcoatNormalMap,Z=Se&&!!E.clearcoatRoughnessMap,tt=g&&!!E.iridescenceMap,rt=g&&!!E.iridescenceThicknessMap,vt=z&&!!E.sheenColorMap,ht=z&&!!E.sheenRoughnessMap,at=!!E.specularMap,St=!!E.specularColorMap,bt=!!E.specularIntensityMap,Rt=J&&!!E.transmissionMap,G=J&&!!E.thicknessMap,ot=!!E.gradientMap,$=!!E.alphaMap,lt=E.alphaTest>0,pt=!!E.alphaHash,nt=!!E.extensions,Dt=ln;E.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Dt=i.toneMapping);let At={shaderID:X,shaderType:E.type,shaderName:E.name,vertexShader:jt,fragmentShader:Ot,defines:E.defines,customVertexShaderID:Kt,customFragmentShaderID:q,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:h,batching:ct,batchingColor:ct&&O._colorsTexture!==null,instancing:yt,instancingColor:yt&&O.instanceColor!==null,instancingMorph:yt&&O.morphTexture!==null,outputColorSpace:et===null?i.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:kt.workingColorSpace,alphaToCoverage:!!E.alphaToCoverage,map:Gt,matcap:ce,envMap:Ht,envMapMode:Ht&&j.mapping,envMapCubeUVHeight:K,aoMap:Wt,lightMap:ne,bumpMap:Vt,normalMap:oe,displacementMap:xe,emissiveMap:Ne,normalMapObjectSpace:oe&&E.normalMapType===Lc,normalMapTangentSpace:oe&&E.normalMapType===Ga,packedNormalMap:oe&&E.normalMapType===Ga&&gg(E.normalMap.format),metalnessMap:he,roughnessMap:pe,anisotropy:P,anisotropyMap:Q,clearcoat:Se,clearcoatMap:it,clearcoatNormalMap:st,clearcoatRoughnessMap:Z,dispersion:Qt,retroreflection:S,iridescence:g,iridescenceMap:tt,iridescenceThicknessMap:rt,sheen:z,sheenColorMap:vt,sheenRoughnessMap:ht,specularMap:at,specularColorMap:St,specularIntensityMap:bt,transmission:J,transmissionMap:Rt,thicknessMap:G,gradientMap:ot,opaque:E.transparent===!1&&E.blending===Wi&&E.alphaToCoverage===!1,alphaMap:$,alphaTest:lt,alphaHash:pt,combine:E.combine,mapUv:Gt&&_(E.map.channel),aoMapUv:Wt&&_(E.aoMap.channel),lightMapUv:ne&&_(E.lightMap.channel),bumpMapUv:Vt&&_(E.bumpMap.channel),normalMapUv:oe&&_(E.normalMap.channel),displacementMapUv:xe&&_(E.displacementMap.channel),emissiveMapUv:Ne&&_(E.emissiveMap.channel),metalnessMapUv:he&&_(E.metalnessMap.channel),roughnessMapUv:pe&&_(E.roughnessMap.channel),anisotropyMapUv:Q&&_(E.anisotropyMap.channel),clearcoatMapUv:it&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:st&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:tt&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:rt&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:vt&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:ht&&_(E.sheenRoughnessMap.channel),specularMapUv:at&&_(E.specularMap.channel),specularColorMapUv:St&&_(E.specularColorMap.channel),specularIntensityMapUv:bt&&_(E.specularIntensityMap.channel),transmissionMapUv:Rt&&_(E.transmissionMap.channel),thicknessMapUv:G&&_(E.thicknessMap.channel),alphaMapUv:$&&_(E.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(oe||P),vertexNormals:!!N.attributes.normal,vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!N.attributes.uv&&(Gt||$),fog:!!b,useFog:E.fog===!0,fogExp2:!!b&&b.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||N.attributes.normal===void 0&&oe===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:mt,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:Et,numSunLights:v.sun.length,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numSunLightShadows:v.sunShadowMap.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:T.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:Dt,decodeVideoTexture:Gt&&E.map.isVideoTexture===!0&&kt.getTransfer(E.map.colorSpace)===qt,decodeVideoTextureEmissive:Ne&&E.emissiveMap.isVideoTexture===!0&&kt.getTransfer(E.emissiveMap.colorSpace)===qt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===En,flipSided:E.side===Le,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:nt&&E.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(nt&&E.extensions.multiDraw===!0||ct)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return At.vertexUv1s=c.has(1),At.vertexUv2s=c.has(2),At.vertexUv3s=c.has(3),c.clear(),At}function m(E){let v=[];if(E.shaderID?v.push(E.shaderID):(v.push(E.customVertexShaderID),v.push(E.customFragmentShaderID)),E.defines!==void 0)for(let F in E.defines)v.push(F),v.push(E.defines[F]);return E.isRawShaderMaterial===!1&&(d(v,E),x(v,E),v.push(i.outputColorSpace)),v.push(E.customProgramCacheKey),v.join()}function d(E,v){E.push(v.precision),E.push(v.outputColorSpace),E.push(v.envMapMode),E.push(v.envMapCubeUVHeight),E.push(v.mapUv),E.push(v.alphaMapUv),E.push(v.lightMapUv),E.push(v.aoMapUv),E.push(v.bumpMapUv),E.push(v.normalMapUv),E.push(v.displacementMapUv),E.push(v.emissiveMapUv),E.push(v.metalnessMapUv),E.push(v.roughnessMapUv),E.push(v.anisotropyMapUv),E.push(v.clearcoatMapUv),E.push(v.clearcoatNormalMapUv),E.push(v.clearcoatRoughnessMapUv),E.push(v.iridescenceMapUv),E.push(v.iridescenceThicknessMapUv),E.push(v.sheenColorMapUv),E.push(v.sheenRoughnessMapUv),E.push(v.specularMapUv),E.push(v.specularColorMapUv),E.push(v.specularIntensityMapUv),E.push(v.transmissionMapUv),E.push(v.thicknessMapUv),E.push(v.combine),E.push(v.fogExp2),E.push(v.sizeAttenuation),E.push(v.morphTargetsCount),E.push(v.morphAttributeCount),E.push(v.numSunLights),E.push(v.numDirLights),E.push(v.numPointLights),E.push(v.numSpotLights),E.push(v.numSpotLightMaps),E.push(v.numHemiLights),E.push(v.numRectAreaLights),E.push(v.numSunLightShadows),E.push(v.numDirLightShadows),E.push(v.numPointLightShadows),E.push(v.numSpotLightShadows),E.push(v.numSpotLightShadowsWithMaps),E.push(v.numLightProbes),E.push(v.shadowMapType),E.push(v.toneMapping),E.push(v.numClippingPlanes),E.push(v.numClipIntersection),E.push(v.depthPacking)}function x(E,v){a.disableAll(),v.instancing&&a.enable(0),v.instancingColor&&a.enable(1),v.instancingMorph&&a.enable(2),v.matcap&&a.enable(3),v.envMap&&a.enable(4),v.normalMapObjectSpace&&a.enable(5),v.normalMapTangentSpace&&a.enable(6),v.clearcoat&&a.enable(7),v.iridescence&&a.enable(8),v.alphaTest&&a.enable(9),v.vertexColors&&a.enable(10),v.vertexAlphas&&a.enable(11),v.vertexUv1s&&a.enable(12),v.vertexUv2s&&a.enable(13),v.vertexUv3s&&a.enable(14),v.vertexTangents&&a.enable(15),v.anisotropy&&a.enable(16),v.alphaHash&&a.enable(17),v.batching&&a.enable(18),v.dispersion&&a.enable(19),v.retroreflection&&a.enable(24),v.batchingColor&&a.enable(20),v.gradientMap&&a.enable(21),v.packedNormalMap&&a.enable(22),v.vertexNormals&&a.enable(23),E.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reversedDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),v.numLightProbeGrids>0&&a.enable(22),v.hasPositionAttribute&&a.enable(23),E.push(a.mask)}function D(E){let v=p[E.type],F;if(v){let L=Bn[v];F=qc.clone(L.uniforms)}else F=E.uniforms;return F}function A(E,v){let F=u.get(v);return F!==void 0?++F.usedTimes:(F=new pg(i,v,E,s),l.push(F),u.set(v,F)),F}function y(E){if(--E.usedTimes===0){let v=l.indexOf(E);l[v]=l[l.length-1],l.pop(),u.delete(E.cacheKey),E.destroy()}}function M(E){o.remove(E)}function I(){o.dispose()}return{getParameters:B,getProgramCacheKey:m,getUniforms:D,acquireProgram:A,releaseProgram:y,releaseShaderCache:M,programs:l,dispose:I}}function Eg(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Cg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function mh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function gh(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,_,B,m,d){let x=i[t];return x===void 0?(x={id:h.id,object:h,geometry:p,material:_,materialVariant:a(h),groupOrder:B,renderOrder:h.renderOrder,z:m,group:d},i[t]=x):(x.id=h.id,x.object=h,x.geometry=p,x.material=_,x.materialVariant=a(h),x.groupOrder=B,x.renderOrder=h.renderOrder,x.z=m,x.group=d),t++,x}function c(h,p,_,B,m,d,x){x.reversedDepth===!0&&(m=-m);let D=o(h,p,_,B,m,d);_.transmission>0?n.push(D):_.transparent===!0?s.push(D):e.push(D)}function l(h,p,_,B,m,d){let x=o(h,p,_,B,m,d);_.transmission>0?n.unshift(x):_.transparent===!0?s.unshift(x):e.unshift(x)}function u(h,p){e.length>1&&e.sort(h||Cg),n.length>1&&n.sort(p||mh),s.length>1&&s.sort(p||mh)}function f(){for(let h=t,p=i.length;h<p;h++){let _=i[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function xg(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new gh,i.set(n,[a])):s>=r.length?(a=new gh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Bg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new H,color:new zt};break;case"SpotLight":e={position:new H,direction:new H,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new H,halfWidth:new H,halfHeight:new H};break}return i[t.id]=e,e}}}function Ag(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Mg=0;function yg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function vg(i){let t=new Bg,e=Ag(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new H);let s=new H,r=new ue,a=new ue;function o(l){let u=0,f=0,h=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let p=0,_=0,B=0,m=0,d=0,x=0,D=0,A=0,y=0,M=0,I=0,E=0,v=0,F=0;l.sort(yg);for(let O=0,T=l.length;O<T;O++){let b=l[O],N=b.color,R=b.intensity,U=b.distance,j=null;if(b.shadow&&b.shadow.map&&(b.shadow.map.texture.format===ei?j=b.shadow.map.texture:j=b.shadow.map.depthTexture||b.shadow.map.texture),b.isAmbientLight)u+=N.r*R,f+=N.g*R,h+=N.b*R;else if(b.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(b.sh.coefficients[K],R);F++}else if(b.isSunLight){let K=t.get(b);if(K.color.copy(b.color).multiplyScalar(b.intensity),b.castShadow){let X=b.shadow,Y=e.get(b);Y.shadowIntensity=X.intensity,Y.shadowBias=X.bias,Y.shadowNormalBias=X.normalBias,Y.shadowRadius=X.radius,Y.shadowMapSize.copy(X.mapSize).multiply(X.getFrameExtents()),n.sunShadow[_]=Y,n.sunShadowMap[_]=j;let _t=X.getViewportCount();for(let Et=0;Et<_t;Et++)n.sunShadowMatrix[B+Et]=X.getMatrix(Et),n.sunShadowCascade[B+Et]=X._cascadeData[Et];B+=_t,_++}n.sun[p]=K,p++}else if(b.isDirectionalLight){let K=t.get(b);if(K.color.copy(b.color).multiplyScalar(b.intensity),b.castShadow){let X=b.shadow,Y=e.get(b);Y.shadowIntensity=X.intensity,Y.shadowBias=X.bias,Y.shadowNormalBias=X.normalBias,Y.shadowRadius=X.radius,Y.shadowMapSize=X.mapSize,n.directionalShadow[m]=Y,n.directionalShadowMap[m]=j,n.directionalShadowMatrix[m]=b.shadow.matrix,y++}n.directional[m]=K,m++}else if(b.isSpotLight){let K=t.get(b);K.position.setFromMatrixPosition(b.matrixWorld),K.color.copy(N).multiplyScalar(R),K.distance=U,K.coneCos=Math.cos(b.angle),K.penumbraCos=Math.cos(b.angle*(1-b.penumbra)),K.decay=b.decay,n.spot[x]=K;let X=b.shadow;if(b.map&&(n.spotLightMap[E]=b.map,E++,X.updateMatrices(b),b.castShadow&&v++),n.spotLightMatrix[x]=X.matrix,b.castShadow){let Y=e.get(b);Y.shadowIntensity=X.intensity,Y.shadowBias=X.bias,Y.shadowNormalBias=X.normalBias,Y.shadowRadius=X.radius,Y.shadowMapSize=X.mapSize,n.spotShadow[x]=Y,n.spotShadowMap[x]=j,I++}x++}else if(b.isRectAreaLight){let K=t.get(b);K.color.copy(N).multiplyScalar(R),K.halfWidth.set(b.width*.5,0,0),K.halfHeight.set(0,b.height*.5,0),n.rectArea[D]=K,D++}else if(b.isPointLight){let K=t.get(b);if(K.color.copy(b.color).multiplyScalar(b.intensity),K.distance=b.distance,K.decay=b.decay,b.castShadow){let X=b.shadow,Y=e.get(b);Y.shadowIntensity=X.intensity,Y.shadowBias=X.bias,Y.shadowNormalBias=X.normalBias,Y.shadowRadius=X.radius,Y.shadowMapSize=X.mapSize,Y.shadowCameraNear=X.camera.near,Y.shadowCameraFar=X.camera.far,n.pointShadow[d]=Y,n.pointShadowMap[d]=j,n.pointShadowMatrix[d]=b.shadow.matrix,M++}n.point[d]=K,d++}else if(b.isHemisphereLight){let K=t.get(b);K.skyColor.copy(b.color).multiplyScalar(R),K.groundColor.copy(b.groundColor).multiplyScalar(R),n.hemi[A]=K,A++}}D>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;let L=n.hash;(L.sunLength!==p||L.directionalLength!==m||L.pointLength!==d||L.spotLength!==x||L.rectAreaLength!==D||L.hemiLength!==A||L.numSunShadows!==_||L.numDirectionalShadows!==y||L.numPointShadows!==M||L.numSpotShadows!==I||L.numSpotMaps!==E||L.numLightProbes!==F)&&(n.sun.length=p,n.directional.length=m,n.spot.length=x,n.rectArea.length=D,n.point.length=d,n.hemi.length=A,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=B,n.sunShadowCascade.length=B,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.directionalShadowMatrix.length=y,n.pointShadow.length=M,n.pointShadowMap.length=M,n.pointShadowMatrix.length=M,n.spotShadow.length=I,n.spotShadowMap.length=I,n.spotLightMatrix.length=I+E-v,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=v,n.numLightProbes=F,L.sunLength=p,L.directionalLength=m,L.pointLength=d,L.spotLength=x,L.rectAreaLength=D,L.hemiLength=A,L.numSunShadows=_,L.numDirectionalShadows=y,L.numPointShadows=M,L.numSpotShadows=I,L.numSpotMaps=E,L.numLightProbes=F,n.version=Mg++)}function c(l,u){let f=0,h=0,p=0,_=0,B=0,m=0,d=u.matrixWorldInverse;for(let x=0,D=l.length;x<D;x++){let A=l[x];if(A.isSunLight){let y=n.sun[f];y.direction.setFromMatrixPosition(A.matrixWorld),y.direction.transformDirection(d),f++}else if(A.isDirectionalLight){let y=n.directional[h];y.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(d),h++}else if(A.isSpotLight){let y=n.spot[_];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(d),y.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(d),_++}else if(A.isRectAreaLight){let y=n.rectArea[B];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(d),a.identity(),r.copy(A.matrixWorld),r.premultiply(d),a.extractRotation(r),y.halfWidth.set(A.width*.5,0,0),y.halfHeight.set(0,A.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),B++}else if(A.isPointLight){let y=n.point[p];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(d),p++}else if(A.isHemisphereLight){let y=n.hemi[m];y.direction.setFromMatrixPosition(A.matrixWorld),y.direction.transformDirection(d),m++}}}return{setup:o,setupView:c,state:n}}function _h(i){let t=new vg(i),e=[],n=[],s=[];function r(h){f.camera=h,e.length=0,n.length=0,s.length=0}function a(h){e.push(h)}function o(h){n.push(h)}function c(h){s.push(h)}function l(){t.setup(e)}function u(h){t.setupView(e,h)}let f={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Sg(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new _h(i),t.set(s,[o])):r>=a.length?(o=new _h(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var Dg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bg=`uniform sampler2D shadow_pass;
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
}`,Ig=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],Tg=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],Eh=new ue,Us=new H,gl=new H;function Fg(i,t,e){let n=new zi,s=new Ft,r=new Ft,a=new le,o=new wr,c=new Rr,l={},u=e.maxTextureSize,f={[Zn]:Le,[Le]:Zn,[En]:En},h=new qe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ft},radius:{value:4}},vertexShader:Dg,fragmentShader:bg}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let _=new ze;_.setAttribute("position",new Oe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let B=new fe(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ts;let d=this.type;this.render=function(M,I,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;this.type===dc&&(It("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ts);let v=i.getRenderTarget(),F=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Cn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let T=d!==this.type;T&&I.traverse(function(b){b.material&&(Array.isArray(b.material)?b.material.forEach(N=>N.needsUpdate=!0):b.material.needsUpdate=!0)});for(let b=0,N=M.length;b<N;b++){let R=M[b],U=R.shadow;if(U===void 0){It("WebGLShadowMap:",R,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;s.copy(U.mapSize);let j=U.getFrameExtents();s.multiply(j),r.copy(U.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/j.x),s.x=r.x*j.x,U.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/j.y),s.y=r.y*j.y,U.mapSize.y=r.y));let K=i.state.buffers.depth.getReversed();if(U.camera._reversedDepth=K,U.map===null||T===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===Ji){if(R.isPointLight){It("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new Ue(s.x,s.y,{format:ei,type:un,minFilter:ve,magFilter:ve,generateMipmaps:!1}),U.map.texture.name=R.name+".shadowMap",U.map.depthTexture=new Jn(s.x,s.y,hn),U.map.depthTexture.name=R.name+".shadowMapDepth",U.map.depthTexture.format=_n,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Me,U.map.depthTexture.magFilter=Me}else R.isPointLight?(U.map=new Ua(s.x),U.map.depthTexture=new Ir(s.x,cn)):(U.map=new Ue(s.x,s.y),U.map.depthTexture=new Jn(s.x,s.y,cn)),U.map.depthTexture.name=R.name+".shadowMap",U.map.depthTexture.format=_n,this.type===Ts?(U.map.depthTexture.compareFunction=K?Pa:La,U.map.depthTexture.minFilter=ve,U.map.depthTexture.magFilter=ve):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Me,U.map.depthTexture.magFilter=Me);U.camera.updateProjectionMatrix()}U.map.isWebGLCubeRenderTarget!==!0&&(U.map.width!==s.x||U.map.height!==s.y)&&U.map.setSize(s.x,s.y);let X=U.map.isWebGLCubeRenderTarget?6:U.getViewportCount();R.isPointLight!==!0&&U.updateMatrices(R,E);for(let Y=0;Y<X;Y++){let _t=U.getCamera(Y);if(R.isPointLight){let Et=U.camera,jt=U.matrix,Ot=R.distance||Et.far;Ot!==Et.far&&(Et.far=Ot,Et.updateProjectionMatrix()),Us.setFromMatrixPosition(R.matrixWorld),Et.position.copy(Us),gl.copy(Et.position),gl.add(Ig[Y]),Et.up.copy(Tg[Y]),Et.lookAt(gl),Et.updateMatrixWorld(),jt.makeTranslation(-Us.x,-Us.y,-Us.z),Eh.multiplyMatrices(Et.projectionMatrix,Et.matrixWorldInverse),U._frustum.setFromProjectionMatrix(Eh,Et.coordinateSystem,Et.reversedDepth)}if(U.map.isWebGLCubeRenderTarget)i.setRenderTarget(U.map,Y),i.clear();else{Y===0&&(i.setRenderTarget(U.map),i.clear());let Et=U.getViewport(Y);a.set(r.x*Et.x,r.y*Et.y,r.x*Et.z,r.y*Et.w),O.viewport(a)}n=U.getFrustum(Y),A(I,E,_t,R,this.type)}U.isPointLightShadow!==!0&&this.type===Ji&&x(U,E),U.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(v,F,L)};function x(M,I){let E=t.update(B);h.defines.VSM_SAMPLES!==M.blurSamples&&(h.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null?M.mapPass=new Ue(s.x,s.y,{format:ei,type:un}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),h.uniforms.shadow_pass.value=M.map.depthTexture,h.uniforms.resolution.value.set(M.map.width,M.map.height),h.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(I,null,E,h,B,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value.set(M.map.width,M.map.height),p.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(I,null,E,p,B,null)}function D(M,I,E,v){let F=null,L=E.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(L!==void 0)F=L;else if(F=E.isPointLight===!0?c:o,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let O=F.uuid,T=I.uuid,b=l[O];b===void 0&&(b={},l[O]=b);let N=b[T];N===void 0&&(N=F.clone(),b[T]=N,I.addEventListener("dispose",y)),F=N}if(F.visible=I.visible,F.wireframe=I.wireframe,v===Ji?F.side=I.shadowSide!==null?I.shadowSide:I.side:F.side=I.shadowSide!==null?I.shadowSide:f[I.side],F.alphaMap=I.alphaMap,F.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,F.map=I.map,F.clipShadows=I.clipShadows,F.clippingPlanes=I.clippingPlanes,F.clipIntersection=I.clipIntersection,F.displacementMap=I.displacementMap,F.displacementScale=I.displacementScale,F.displacementBias=I.displacementBias,F.wireframeLinewidth=I.wireframeLinewidth,F.linewidth=I.linewidth,E.isPointLight===!0&&F.isMeshDistanceMaterial===!0){let O=i.properties.get(F);O.light=E}return F}function A(M,I,E,v,F){if(M.visible===!1)return;if(M.layers.test(I.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&F===Ji)&&(!M.frustumCulled||M.intersectsFrustum(n))){M.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,M.matrixWorld);let T=t.update(M),b=M.material;if(Array.isArray(b)){let N=T.groups;for(let R=0,U=N.length;R<U;R++){let j=N[R],K=b[j.materialIndex];if(K&&K.visible){let X=D(M,K,v,F);M.onBeforeShadow(i,M,I,E,T,X,j),i.renderBufferDirect(E,null,T,X,M,j),M.onAfterShadow(i,M,I,E,T,X,j)}}}else if(b.visible){let N=D(M,b,v,F);M.onBeforeShadow(i,M,I,E,T,N,null),i.renderBufferDirect(E,null,T,N,M,null),M.onAfterShadow(i,M,I,E,T,N,null)}}let O=M.children;for(let T=0,b=O.length;T<b;T++)A(O[T],I,E,v,F)}function y(M){M.target.removeEventListener("dispose",y);for(let E in l){let v=l[E],F=M.target.uuid;F in v&&(v[F].dispose(),delete v[F])}}}function wg(i,t){function e(){let G=!1,ot=new le,$=null,lt=new le(0,0,0,0);return{setMask:function(pt){$!==pt&&!G&&(i.colorMask(pt,pt,pt,pt),$=pt)},setLocked:function(pt){G=pt},setClear:function(pt,nt,Dt,At,ie){ie===!0&&(pt*=At,nt*=At,Dt*=At),ot.set(pt,nt,Dt,At),lt.equals(ot)===!1&&(i.clearColor(pt,nt,Dt,At),lt.copy(ot))},reset:function(){G=!1,$=null,lt.set(-1,0,0,0)}}}function n(){let G=!1,ot=!1,$=null,lt=null,pt=null;return{setReversed:function(nt){if(ot!==nt){let Dt=t.get("EXT_clip_control");nt?Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.ZERO_TO_ONE_EXT):Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.NEGATIVE_ONE_TO_ONE_EXT),ot=nt;let At=pt;pt=null,this.setClear(At)}},getReversed:function(){return ot},setTest:function(nt){nt?et(i.DEPTH_TEST):mt(i.DEPTH_TEST)},setMask:function(nt){$!==nt&&!G&&(i.depthMask(nt),$=nt)},setFunc:function(nt){if(ot&&(nt=Xc[nt]),lt!==nt){switch(nt){case mr:i.depthFunc(i.NEVER);break;case gr:i.depthFunc(i.ALWAYS);break;case _r:i.depthFunc(i.LESS);break;case Ri:i.depthFunc(i.LEQUAL);break;case Er:i.depthFunc(i.EQUAL);break;case Cr:i.depthFunc(i.GEQUAL);break;case xr:i.depthFunc(i.GREATER);break;case Br:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}lt=nt}},setLocked:function(nt){G=nt},setClear:function(nt){pt!==nt&&(pt=nt,ot&&(nt=1-nt),i.clearDepth(nt))},reset:function(){G=!1,$=null,lt=null,pt=null,ot=!1}}}function s(){let G=!1,ot=null,$=null,lt=null,pt=null,nt=null,Dt=null,At=null,ie=null;return{setTest:function(Xt){G||(Xt?et(i.STENCIL_TEST):mt(i.STENCIL_TEST))},setMask:function(Xt){ot!==Xt&&!G&&(i.stencilMask(Xt),ot=Xt)},setFunc:function(Xt,tn,fn){($!==Xt||lt!==tn||pt!==fn)&&(i.stencilFunc(Xt,tn,fn),$=Xt,lt=tn,pt=fn)},setOp:function(Xt,tn,fn){(nt!==Xt||Dt!==tn||At!==fn)&&(i.stencilOp(Xt,tn,fn),nt=Xt,Dt=tn,At=fn)},setLocked:function(Xt){G=Xt},setClear:function(Xt){ie!==Xt&&(i.clearStencil(Xt),ie=Xt)},reset:function(){G=!1,ot=null,$=null,lt=null,pt=null,nt=null,Dt=null,At=null,ie=null}}}let r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap,u={},f={},h={},p=new WeakMap,_=[],B=null,m=!1,d=null,x=null,D=null,A=null,y=null,M=null,I=null,E=new zt(0,0,0),v=0,F=!1,L=null,O=null,T=null,b=null,N=null,R=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),U=!1,j=0,K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(K)[1]),U=j>=1):K.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),U=j>=2);let X=null,Y={},_t=i.getParameter(i.SCISSOR_BOX),Et=i.getParameter(i.VIEWPORT),jt=new le().fromArray(_t),Ot=new le().fromArray(Et);function Kt(G,ot,$,lt){let pt=new Uint8Array(4),nt=i.createTexture();i.bindTexture(G,nt),i.texParameteri(G,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(G,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Dt=0;Dt<$;Dt++)G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?i.texImage3D(ot,0,i.RGBA,1,1,lt,0,i.RGBA,i.UNSIGNED_BYTE,pt):i.texImage2D(ot+Dt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,pt);return nt}let q={};q[i.TEXTURE_2D]=Kt(i.TEXTURE_2D,i.TEXTURE_2D,1),q[i.TEXTURE_CUBE_MAP]=Kt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[i.TEXTURE_2D_ARRAY]=Kt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),q[i.TEXTURE_3D]=Kt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(i.DEPTH_TEST),a.setFunc(Ri),Vt(!1),oe(Fo),et(i.CULL_FACE),Wt(Cn);function et(G){u[G]!==!0&&(i.enable(G),u[G]=!0)}function mt(G){u[G]!==!1&&(i.disable(G),u[G]=!1)}function yt(G,ot){return h[G]!==ot?(i.bindFramebuffer(G,ot),h[G]=ot,G===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ot),G===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ot),!0):!1}function ct(G,ot){let $=_,lt=!1;if(G){$=p.get(ot),$===void 0&&($=[],p.set(ot,$));let pt=G.textures;if($.length!==pt.length||$[0]!==i.COLOR_ATTACHMENT0){for(let nt=0,Dt=pt.length;nt<Dt;nt++)$[nt]=i.COLOR_ATTACHMENT0+nt;$.length=pt.length,lt=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,lt=!0);lt&&i.drawBuffers($)}function Gt(G){return B!==G?(i.useProgram(G),B=G,!0):!1}let ce={[hi]:i.FUNC_ADD,[pc]:i.FUNC_SUBTRACT,[mc]:i.FUNC_REVERSE_SUBTRACT};ce[gc]=i.MIN,ce[_c]=i.MAX;let Ht={[Ec]:i.ZERO,[Cc]:i.ONE,[xc]:i.SRC_COLOR,[Lo]:i.SRC_ALPHA,[Sc]:i.SRC_ALPHA_SATURATE,[yc]:i.DST_COLOR,[Ac]:i.DST_ALPHA,[Bc]:i.ONE_MINUS_SRC_COLOR,[Po]:i.ONE_MINUS_SRC_ALPHA,[vc]:i.ONE_MINUS_DST_COLOR,[Mc]:i.ONE_MINUS_DST_ALPHA,[Dc]:i.CONSTANT_COLOR,[bc]:i.ONE_MINUS_CONSTANT_COLOR,[Ic]:i.CONSTANT_ALPHA,[Tc]:i.ONE_MINUS_CONSTANT_ALPHA};function Wt(G,ot,$,lt,pt,nt,Dt,At,ie,Xt){if(G===Cn){m===!0&&(mt(i.BLEND),m=!1);return}if(m===!1&&(et(i.BLEND),m=!0),G!==fc){if(G!==d||Xt!==F){if((x!==hi||y!==hi)&&(i.blendEquation(i.FUNC_ADD),x=hi,y=hi),Xt)switch(G){case Wi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wo:i.blendFunc(i.ONE,i.ONE);break;case Ro:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Go:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Tt("WebGLState: Invalid blending: ",G);break}else switch(G){case Wi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ro:Tt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Go:Tt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Tt("WebGLState: Invalid blending: ",G);break}D=null,A=null,M=null,I=null,E.set(0,0,0),v=0,d=G,F=Xt}return}pt=pt||ot,nt=nt||$,Dt=Dt||lt,(ot!==x||pt!==y)&&(i.blendEquationSeparate(ce[ot],ce[pt]),x=ot,y=pt),($!==D||lt!==A||nt!==M||Dt!==I)&&(i.blendFuncSeparate(Ht[$],Ht[lt],Ht[nt],Ht[Dt]),D=$,A=lt,M=nt,I=Dt),(At.equals(E)===!1||ie!==v)&&(i.blendColor(At.r,At.g,At.b,ie),E.copy(At),v=ie),d=G,F=!1}function ne(G,ot){G.side===En?mt(i.CULL_FACE):et(i.CULL_FACE);let $=G.side===Le;ot&&($=!$),Vt($),G.blending===Wi&&G.transparent===!1?Wt(Cn):Wt(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),a.setFunc(G.depthFunc),a.setTest(G.depthTest),a.setMask(G.depthWrite),r.setMask(G.colorWrite);let lt=G.stencilWrite;o.setTest(lt),lt&&(o.setMask(G.stencilWriteMask),o.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),o.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),Ne(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?et(i.SAMPLE_ALPHA_TO_COVERAGE):mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Vt(G){L!==G&&(G?i.frontFace(i.CW):i.frontFace(i.CCW),L=G)}function oe(G){G!==hc?(et(i.CULL_FACE),G!==O&&(G===Fo?i.cullFace(i.BACK):G===uc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):mt(i.CULL_FACE),O=G}function xe(G){G!==T&&(U&&i.lineWidth(G),T=G)}function Ne(G,ot,$){G?(et(i.POLYGON_OFFSET_FILL),(b!==ot||N!==$)&&(b=ot,N=$,a.getReversed()&&(ot=-ot),i.polygonOffset(ot,$))):mt(i.POLYGON_OFFSET_FILL)}function he(G){G?et(i.SCISSOR_TEST):mt(i.SCISSOR_TEST)}function pe(G){G===void 0&&(G=i.TEXTURE0+R-1),X!==G&&(i.activeTexture(G),X=G)}function P(G,ot,$){$===void 0&&(X===null?$=i.TEXTURE0+R-1:$=X);let lt=Y[$];lt===void 0&&(lt={type:void 0,texture:void 0},Y[$]=lt),(lt.type!==G||lt.texture!==ot)&&(X!==$&&(i.activeTexture($),X=$),i.bindTexture(G,ot||q[G]),lt.type=G,lt.texture=ot)}function Se(){let G=Y[X];G!==void 0&&G.type!==void 0&&(i.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function Qt(){try{i.compressedTexImage2D(...arguments)}catch(G){Tt("WebGLState:",G)}}function S(){try{i.compressedTexImage3D(...arguments)}catch(G){Tt("WebGLState:",G)}}function g(){try{i.texSubImage2D(...arguments)}catch(G){Tt("WebGLState:",G)}}function z(){try{i.texSubImage3D(...arguments)}catch(G){Tt("WebGLState:",G)}}function J(){try{i.compressedTexSubImage2D(...arguments)}catch(G){Tt("WebGLState:",G)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(G){Tt("WebGLState:",G)}}function it(){try{i.texStorage2D(...arguments)}catch(G){Tt("WebGLState:",G)}}function st(){try{i.texStorage3D(...arguments)}catch(G){Tt("WebGLState:",G)}}function Z(){try{i.texImage2D(...arguments)}catch(G){Tt("WebGLState:",G)}}function tt(){try{i.texImage3D(...arguments)}catch(G){Tt("WebGLState:",G)}}function rt(G){return f[G]!==void 0?f[G]:i.getParameter(G)}function vt(G,ot){f[G]!==ot&&(i.pixelStorei(G,ot),f[G]=ot)}function ht(G){jt.equals(G)===!1&&(i.scissor(G.x,G.y,G.z,G.w),jt.copy(G))}function at(G){Ot.equals(G)===!1&&(i.viewport(G.x,G.y,G.z,G.w),Ot.copy(G))}function St(G,ot){let $=l.get(ot);$===void 0&&($=new WeakMap,l.set(ot,$));let lt=$.get(G);lt===void 0&&(lt=i.getUniformBlockIndex(ot,G.name),$.set(G,lt))}function bt(G,ot){let lt=l.get(ot).get(G);c.get(ot)!==lt&&(i.uniformBlockBinding(ot,lt,G.__bindingPointIndex),c.set(ot,lt))}function Rt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},X=null,Y={},h={},p=new WeakMap,_=[],B=null,m=!1,d=null,x=null,D=null,A=null,y=null,M=null,I=null,E=new zt(0,0,0),v=0,F=!1,L=null,O=null,T=null,b=null,N=null,jt.set(0,0,i.canvas.width,i.canvas.height),Ot.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:et,disable:mt,bindFramebuffer:yt,drawBuffers:ct,useProgram:Gt,setBlending:Wt,setMaterial:ne,setFlipSided:Vt,setCullFace:oe,setLineWidth:xe,setPolygonOffset:Ne,setScissorTest:he,activeTexture:pe,bindTexture:P,unbindTexture:Se,compressedTexImage2D:Qt,compressedTexImage3D:S,texImage2D:Z,texImage3D:tt,pixelStorei:vt,getParameter:rt,updateUBOMapping:St,uniformBlockBinding:bt,texStorage2D:it,texStorage3D:st,texSubImage2D:g,texSubImage3D:z,compressedTexSubImage2D:J,compressedTexSubImage3D:Q,scissor:ht,viewport:at,reset:Rt}}function Rg(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ft,u=new WeakMap,f=new Set,h,p=new WeakMap,_=!1;try{_=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function B(S,g){return _?new OffscreenCanvas(S,g):fs("canvas")}function m(S,g,z){let J=1,Q=Qt(S);if((Q.width>z||Q.height>z)&&(J=z/Math.max(Q.width,Q.height)),J<1)if(typeof HTMLImageElement!="undefined"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&S instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&S instanceof ImageBitmap||typeof VideoFrame!="undefined"&&S instanceof VideoFrame){let it=Math.floor(J*Q.width),st=Math.floor(J*Q.height);h===void 0&&(h=B(it,st));let Z=g?B(it,st):h;return Z.width=it,Z.height=st,Z.getContext("2d").drawImage(S,0,0,it,st),It("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+it+"x"+st+")."),Z}else return"data"in S&&It("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),S;return S}function d(S){return S.generateMipmaps}function x(S){i.generateMipmap(S)}function D(S){return S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?i.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function A(S,g,z,J,Q,it=!1){if(S!==null){if(i[S]!==void 0)return i[S];It("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let st;J&&(st=t.get("EXT_texture_norm16"),st||It("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=g;if(g===i.RED&&(z===i.FLOAT&&(Z=i.R32F),z===i.HALF_FLOAT&&(Z=i.R16F),z===i.UNSIGNED_BYTE&&(Z=i.R8),z===i.UNSIGNED_SHORT&&st&&(Z=st.R16_EXT),z===i.SHORT&&st&&(Z=st.R16_SNORM_EXT)),g===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.R8UI),z===i.UNSIGNED_SHORT&&(Z=i.R16UI),z===i.UNSIGNED_INT&&(Z=i.R32UI),z===i.BYTE&&(Z=i.R8I),z===i.SHORT&&(Z=i.R16I),z===i.INT&&(Z=i.R32I)),g===i.RG&&(z===i.FLOAT&&(Z=i.RG32F),z===i.HALF_FLOAT&&(Z=i.RG16F),z===i.UNSIGNED_BYTE&&(Z=i.RG8),z===i.UNSIGNED_SHORT&&st&&(Z=st.RG16_EXT),z===i.SHORT&&st&&(Z=st.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RG8UI),z===i.UNSIGNED_SHORT&&(Z=i.RG16UI),z===i.UNSIGNED_INT&&(Z=i.RG32UI),z===i.BYTE&&(Z=i.RG8I),z===i.SHORT&&(Z=i.RG16I),z===i.INT&&(Z=i.RG32I)),g===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),z===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),z===i.UNSIGNED_INT&&(Z=i.RGB32UI),z===i.BYTE&&(Z=i.RGB8I),z===i.SHORT&&(Z=i.RGB16I),z===i.INT&&(Z=i.RGB32I)),g===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),z===i.UNSIGNED_INT&&(Z=i.RGBA32UI),z===i.BYTE&&(Z=i.RGBA8I),z===i.SHORT&&(Z=i.RGBA16I),z===i.INT&&(Z=i.RGBA32I)),g===i.RGB&&(z===i.UNSIGNED_SHORT&&st&&(Z=st.RGB16_EXT),z===i.SHORT&&st&&(Z=st.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),g===i.RGBA){let tt=it?ds:kt.getTransfer(Q);z===i.FLOAT&&(Z=i.RGBA32F),z===i.HALF_FLOAT&&(Z=i.RGBA16F),z===i.UNSIGNED_BYTE&&(Z=tt===qt?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&st&&(Z=st.RGBA16_EXT),z===i.SHORT&&st&&(Z=st.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function y(S,g){let z;return S?g===null||g===cn||g===Yi?z=i.DEPTH24_STENCIL8:g===hn?z=i.DEPTH32F_STENCIL8:g===Xi&&(z=i.DEPTH24_STENCIL8,It("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===cn||g===Yi?z=i.DEPTH_COMPONENT24:g===hn?z=i.DEPTH_COMPONENT32F:g===Xi&&(z=i.DEPTH_COMPONENT16),z}function M(S,g){return d(S)===!0||S.isFramebufferTexture&&S.minFilter!==Me&&S.minFilter!==ve?Math.log2(Math.max(g.width,g.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?g.mipmaps.length:1}function I(S){let g=S.target;g.removeEventListener("dispose",I),v(g),g.isVideoTexture&&u.delete(g),g.isHTMLTexture&&f.delete(g)}function E(S){let g=S.target;g.removeEventListener("dispose",E),L(g)}function v(S){let g=n.get(S);if(g.__webglInit===void 0)return;let z=S.source,J=p.get(z);if(J){let Q=J[g.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&F(S),Object.keys(J).length===0&&p.delete(z)}n.remove(S)}function F(S){let g=n.get(S);i.deleteTexture(g.__webglTexture);let z=S.source,J=p.get(z);delete J[g.__cacheKey],a.memory.textures--}function L(S){let g=n.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),n.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(g.__webglFramebuffer[J]))for(let Q=0;Q<g.__webglFramebuffer[J].length;Q++)i.deleteFramebuffer(g.__webglFramebuffer[J][Q]);else i.deleteFramebuffer(g.__webglFramebuffer[J]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[J])}else{if(Array.isArray(g.__webglFramebuffer))for(let J=0;J<g.__webglFramebuffer.length;J++)i.deleteFramebuffer(g.__webglFramebuffer[J]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let J=0;J<g.__webglColorRenderbuffer.length;J++)g.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[J]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let z=S.textures;for(let J=0,Q=z.length;J<Q;J++){let it=n.get(z[J]);it.__webglTexture&&(i.deleteTexture(it.__webglTexture),a.memory.textures--),n.remove(z[J])}n.remove(S)}let O=0;function T(){O=0}function b(){return O}function N(S){O=S}function R(){let S=O;return S>=s.maxTextures&&It("WebGLTextures: Trying to use "+(S+1)+" texture units while this GPU supports only "+s.maxTextures),O+=1,S}function U(S){let g=[];return g.push(S.wrapS),g.push(S.wrapT),g.push(S.wrapR||0),g.push(S.magFilter),g.push(S.minFilter),g.push(S.anisotropy),g.push(S.internalFormat),g.push(S.format),g.push(S.type),g.push(S.generateMipmaps),g.push(S.premultiplyAlpha),g.push(S.flipY),g.push(S.unpackAlignment),g.push(S.colorSpace),g.join()}function j(S,g){let z=n.get(S);if(S.isVideoTexture&&P(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&z.__version!==S.version){let J=S.image;if(J===null)It("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)It("WebGLRenderer: Texture marked for update but image is incomplete");else{mt(z,S,g);return}}else S.isExternalTexture&&(z.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+g)}function K(S,g){let z=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&z.__version!==S.version){mt(z,S,g);return}else S.isExternalTexture&&(z.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+g)}function X(S,g){let z=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&z.__version!==S.version){mt(z,S,g);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+g)}function Y(S,g){let z=n.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&z.__version!==S.version){yt(z,S,g);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+g)}let _t={[Ar]:i.REPEAT,[gn]:i.CLAMP_TO_EDGE,[Mr]:i.MIRRORED_REPEAT},Et={[Me]:i.NEAREST,[Rc]:i.NEAREST_MIPMAP_NEAREST,[ws]:i.NEAREST_MIPMAP_LINEAR,[ve]:i.LINEAR,[Zr]:i.LINEAR_MIPMAP_NEAREST,[$n]:i.LINEAR_MIPMAP_LINEAR},jt={[Nc]:i.NEVER,[Vc]:i.ALWAYS,[Oc]:i.LESS,[La]:i.LEQUAL,[Hc]:i.EQUAL,[Pa]:i.GEQUAL,[Uc]:i.GREATER,[zc]:i.NOTEQUAL};function Ot(S,g){if(g.type===hn&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===ve||g.magFilter===Zr||g.magFilter===ws||g.magFilter===$n||g.minFilter===ve||g.minFilter===Zr||g.minFilter===ws||g.minFilter===$n)&&It("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(S,i.TEXTURE_WRAP_S,_t[g.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,_t[g.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,_t[g.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,Et[g.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,Et[g.minFilter]),g.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,jt[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Me||g.minFilter!==ws&&g.minFilter!==$n||g.type===hn&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(S,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function Kt(S,g){let z=!1;S.__webglInit===void 0&&(S.__webglInit=!0,g.addEventListener("dispose",I));let J=g.source,Q=p.get(J);Q===void 0&&(Q={},p.set(J,Q));let it=U(g);if(it!==S.__cacheKey){Q[it]===void 0&&(Q[it]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Q[it].usedTimes++;let st=Q[S.__cacheKey];st!==void 0&&(Q[S.__cacheKey].usedTimes--,st.usedTimes===0&&F(g)),S.__cacheKey=it,S.__webglTexture=Q[it].texture}return z}function q(S,g,z){return Math.floor(Math.floor(S/z)/g)}function et(S,g,z,J){let it=S.updateRanges;if(it.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,z,J,g.data);else{it.sort((vt,ht)=>vt.start-ht.start);let st=0;for(let vt=1;vt<it.length;vt++){let ht=it[st],at=it[vt],St=ht.start+ht.count,bt=q(at.start,g.width,4),Rt=q(ht.start,g.width,4);at.start<=St+1&&bt===Rt&&q(at.start+at.count-1,g.width,4)===bt?ht.count=Math.max(ht.count,at.start+at.count-ht.start):(++st,it[st]=at)}it.length=st+1;let Z=e.getParameter(i.UNPACK_ROW_LENGTH),tt=e.getParameter(i.UNPACK_SKIP_PIXELS),rt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let vt=0,ht=it.length;vt<ht;vt++){let at=it[vt],St=Math.floor(at.start/4),bt=Math.ceil(at.count/4),Rt=St%g.width,G=Math.floor(St/g.width),ot=bt,$=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Rt),e.pixelStorei(i.UNPACK_SKIP_ROWS,G),e.texSubImage2D(i.TEXTURE_2D,0,Rt,G,ot,$,z,J,g.data)}S.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Z),e.pixelStorei(i.UNPACK_SKIP_PIXELS,tt),e.pixelStorei(i.UNPACK_SKIP_ROWS,rt)}}function mt(S,g,z){let J=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(J=i.TEXTURE_3D);let Q=Kt(S,g),it=g.source;e.bindTexture(J,S.__webglTexture,i.TEXTURE0+z);let st=n.get(it);if(it.version!==st.__version||Q===!0){if(e.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap!="undefined"&&g.image instanceof ImageBitmap)===!1){let $=kt.getPrimaries(kt.workingColorSpace),lt=g.colorSpace===wn?null:kt.getPrimaries(g.colorSpace),pt=g.colorSpace===wn||$===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt)}e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let tt=m(g.image,!1,s.maxTextureSize);tt=Se(g,tt);let rt=r.convert(g.format,g.colorSpace),vt=r.convert(g.type),ht=A(g.internalFormat,rt,vt,g.normalized,g.colorSpace,g.isVideoTexture);Ot(J,g);let at,St=g.mipmaps,bt=g.isVideoTexture!==!0,Rt=st.__version===void 0||Q===!0,G=it.dataReady,ot=M(g,tt);if(g.isDepthTexture)ht=y(g.format===ti,g.type),Rt&&(bt?e.texStorage2D(i.TEXTURE_2D,1,ht,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,ht,tt.width,tt.height,0,rt,vt,null));else if(g.isDataTexture)if(St.length>0){bt&&Rt&&e.texStorage2D(i.TEXTURE_2D,ot,ht,St[0].width,St[0].height);for(let $=0,lt=St.length;$<lt;$++)at=St[$],bt?G&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,at.width,at.height,rt,vt,at.data):e.texImage2D(i.TEXTURE_2D,$,ht,at.width,at.height,0,rt,vt,at.data);g.generateMipmaps=!1}else bt?(Rt&&e.texStorage2D(i.TEXTURE_2D,ot,ht,tt.width,tt.height),G&&et(g,tt,rt,vt)):e.texImage2D(i.TEXTURE_2D,0,ht,tt.width,tt.height,0,rt,vt,tt.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){bt&&Rt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ot,ht,St[0].width,St[0].height,tt.depth);for(let $=0,lt=St.length;$<lt;$++)if(at=St[$],g.format!==$e)if(rt!==null)if(bt){if(G)if(g.layerUpdates.size>0){let pt=rl(at.width,at.height,g.format,g.type);for(let nt of g.layerUpdates){let Dt=at.data.subarray(nt*pt/at.data.BYTES_PER_ELEMENT,(nt+1)*pt/at.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,nt,at.width,at.height,1,rt,Dt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,at.width,at.height,tt.depth,rt,at.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,ht,at.width,at.height,tt.depth,0,at.data,0,0);else It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else bt?G&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,at.width,at.height,tt.depth,rt,vt,at.data):e.texImage3D(i.TEXTURE_2D_ARRAY,$,ht,at.width,at.height,tt.depth,0,rt,vt,at.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{bt&&Rt&&e.texStorage2D(i.TEXTURE_2D,ot,ht,St[0].width,St[0].height);for(let $=0,lt=St.length;$<lt;$++)at=St[$],g.format!==$e?rt!==null?bt?G&&e.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,at.width,at.height,rt,at.data):e.compressedTexImage2D(i.TEXTURE_2D,$,ht,at.width,at.height,0,at.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):bt?G&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,at.width,at.height,rt,vt,at.data):e.texImage2D(i.TEXTURE_2D,$,ht,at.width,at.height,0,rt,vt,at.data)}else if(g.isDataArrayTexture)if(bt){if(Rt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ot,ht,tt.width,tt.height,tt.depth),G)if(g.layerUpdates.size>0){let $=rl(tt.width,tt.height,g.format,g.type);for(let lt of g.layerUpdates){let pt=tt.data.subarray(lt*$/tt.data.BYTES_PER_ELEMENT,(lt+1)*$/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,lt,tt.width,tt.height,1,rt,vt,pt)}g.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,rt,vt,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,ht,tt.width,tt.height,tt.depth,0,rt,vt,tt.data);else if(g.isData3DTexture)bt?(Rt&&e.texStorage3D(i.TEXTURE_3D,ot,ht,tt.width,tt.height,tt.depth),G&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,rt,vt,tt.data)):e.texImage3D(i.TEXTURE_3D,0,ht,tt.width,tt.height,tt.depth,0,rt,vt,tt.data);else if(g.isFramebufferTexture){if(Rt)if(bt)e.texStorage2D(i.TEXTURE_2D,ot,ht,tt.width,tt.height);else{let $=tt.width,lt=tt.height;for(let pt=0;pt<ot;pt++)e.texImage2D(i.TEXTURE_2D,pt,ht,$,lt,0,rt,vt,null),$>>=1,lt>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){let $=i.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),tt.parentNode!==$){$.appendChild(tt),f.add(g),$.onpaint=lt=>{let pt=lt.changedElements;for(let nt of f)pt.includes(nt.image)&&(nt.needsUpdate=!0)},$.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,tt);else{let pt=i.RGBA,nt=i.RGBA,Dt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,pt,nt,Dt,tt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(St.length>0){if(bt&&Rt){let $=Qt(St[0]);e.texStorage2D(i.TEXTURE_2D,ot,ht,$.width,$.height)}for(let $=0,lt=St.length;$<lt;$++)at=St[$],bt?G&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,rt,vt,at):e.texImage2D(i.TEXTURE_2D,$,ht,rt,vt,at);g.generateMipmaps=!1}else if(bt){if(Rt){let $=Qt(tt);e.texStorage2D(i.TEXTURE_2D,ot,ht,$.width,$.height)}G&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,rt,vt,tt)}else e.texImage2D(i.TEXTURE_2D,0,ht,rt,vt,tt);d(g)&&x(J),st.__version=it.version,g.onUpdate&&g.onUpdate(g)}S.__version=g.version}function yt(S,g,z){if(g.image.length!==6)return;let J=Kt(S,g),Q=g.source;e.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+z);let it=n.get(Q);if(Q.version!==it.__version||J===!0){e.activeTexture(i.TEXTURE0+z);let st=kt.getPrimaries(kt.workingColorSpace),Z=g.colorSpace===wn?null:kt.getPrimaries(g.colorSpace),tt=g.colorSpace===wn||st===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);let rt=g.isCompressedTexture||g.image[0].isCompressedTexture,vt=g.image[0]&&g.image[0].isDataTexture,ht=[];for(let nt=0;nt<6;nt++)!rt&&!vt?ht[nt]=m(g.image[nt],!0,s.maxCubemapSize):ht[nt]=vt?g.image[nt].image:g.image[nt],ht[nt]=Se(g,ht[nt]);let at=ht[0],St=r.convert(g.format,g.colorSpace),bt=r.convert(g.type),Rt=A(g.internalFormat,St,bt,g.normalized,g.colorSpace),G=g.isVideoTexture!==!0,ot=it.__version===void 0||J===!0,$=Q.dataReady,lt=M(g,at);Ot(i.TEXTURE_CUBE_MAP,g);let pt;if(rt){G&&ot&&e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,Rt,at.width,at.height);for(let nt=0;nt<6;nt++){pt=ht[nt].mipmaps;for(let Dt=0;Dt<pt.length;Dt++){let At=pt[Dt];g.format!==$e?St!==null?G?$&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,0,0,At.width,At.height,St,At.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,Rt,At.width,At.height,0,At.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,0,0,At.width,At.height,St,bt,At.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,Rt,At.width,At.height,0,St,bt,At.data)}}}else{if(pt=g.mipmaps,G&&ot){pt.length>0&&lt++;let nt=Qt(ht[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,Rt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(vt){G?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,ht[nt].width,ht[nt].height,St,bt,ht[nt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Rt,ht[nt].width,ht[nt].height,0,St,bt,ht[nt].data);for(let Dt=0;Dt<pt.length;Dt++){let ie=pt[Dt].image[nt].image;G?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,0,0,ie.width,ie.height,St,bt,ie.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,Rt,ie.width,ie.height,0,St,bt,ie.data)}}else{G?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,St,bt,ht[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Rt,St,bt,ht[nt]);for(let Dt=0;Dt<pt.length;Dt++){let At=pt[Dt];G?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,0,0,St,bt,At.image[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,Rt,St,bt,At.image[nt])}}}d(g)&&x(i.TEXTURE_CUBE_MAP),it.__version=Q.version,g.onUpdate&&g.onUpdate(g)}S.__version=g.version}function ct(S,g,z,J,Q,it){let st=r.convert(z.format,z.colorSpace),Z=r.convert(z.type),tt=A(z.internalFormat,st,Z,z.normalized,z.colorSpace),rt=n.get(g),vt=n.get(z);if(vt.__renderTarget=g,!rt.__hasExternalTextures){let ht=Math.max(1,g.width>>it),at=Math.max(1,g.height>>it);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,it,tt,ht,at,g.depth,0,st,Z,null):e.texImage2D(Q,it,tt,ht,at,0,st,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,S),pe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,Q,vt.__webglTexture,0,he(g)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,Q,vt.__webglTexture,it),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Gt(S,g,z){if(i.bindRenderbuffer(i.RENDERBUFFER,S),g.depthBuffer){let J=g.depthTexture,Q=J&&J.isDepthTexture?J.type:null,it=y(g.stencilBuffer,Q),st=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;pe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,he(g),it,g.width,g.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,he(g),it,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,it,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,S)}else{let J=g.textures;for(let Q=0;Q<J.length;Q++){let it=J[Q],st=r.convert(it.format,it.colorSpace),Z=r.convert(it.type),tt=A(it.internalFormat,st,Z,it.normalized,it.colorSpace);pe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,he(g),tt,g.width,g.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,he(g),tt,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,tt,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ce(S,g,z){let J=g.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,S),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Q=n.get(g.depthTexture);if(Q.__renderTarget=g,(!Q.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),J){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,g.depthTexture.addEventListener("dispose",I)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),Ot(i.TEXTURE_CUBE_MAP,g.depthTexture);let rt=r.convert(g.depthTexture.format),vt=r.convert(g.depthTexture.type),ht;g.depthTexture.format===_n?ht=i.DEPTH_COMPONENT24:g.depthTexture.format===ti&&(ht=i.DEPTH24_STENCIL8);for(let at=0;at<6;at++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,ht,g.width,g.height,0,rt,vt,null)}}else j(g.depthTexture,0);let it=Q.__webglTexture,st=he(g),Z=J?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,tt=g.depthTexture.format===ti?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===_n)pe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,Z,it,0,st):i.framebufferTexture2D(i.FRAMEBUFFER,tt,Z,it,0);else if(g.depthTexture.format===ti)pe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,Z,it,0,st):i.framebufferTexture2D(i.FRAMEBUFFER,tt,Z,it,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ht(S){let g=n.get(S),z=S.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==S.depthTexture){let J=S.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),J){let Q=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,J.removeEventListener("dispose",Q)};J.addEventListener("dispose",Q),g.__depthDisposeCallback=Q}g.__boundDepthTexture=J}if(S.depthTexture&&!g.__autoAllocateDepthBuffer)if(z)for(let J=0;J<6;J++)ce(g.__webglFramebuffer[J],S,J);else{let J=S.texture.mipmaps;J&&J.length>0?ce(g.__webglFramebuffer[0],S,0):ce(g.__webglFramebuffer,S,0)}else if(z){g.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[J]),g.__webglDepthbuffer[J]===void 0)g.__webglDepthbuffer[J]=i.createRenderbuffer(),Gt(g.__webglDepthbuffer[J],S,!1);else{let Q=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=g.__webglDepthbuffer[J];i.bindRenderbuffer(i.RENDERBUFFER,it),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,it)}}else{let J=S.texture.mipmaps;if(J&&J.length>0?e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),Gt(g.__webglDepthbuffer,S,!1);else{let Q=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,it),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,it)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Wt(S,g,z){let J=n.get(S);g!==void 0&&ct(J.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Ht(S)}function ne(S){let g=S.texture,z=n.get(S),J=n.get(g);S.addEventListener("dispose",E);let Q=S.textures,it=S.isWebGLCubeRenderTarget===!0,st=Q.length>1;if(st||(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=g.version,a.memory.textures++),it){z.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(g.mipmaps&&g.mipmaps.length>0){z.__webglFramebuffer[Z]=[];for(let tt=0;tt<g.mipmaps.length;tt++)z.__webglFramebuffer[Z][tt]=i.createFramebuffer()}else z.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){z.__webglFramebuffer=[];for(let Z=0;Z<g.mipmaps.length;Z++)z.__webglFramebuffer[Z]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(st)for(let Z=0,tt=Q.length;Z<tt;Z++){let rt=n.get(Q[Z]);rt.__webglTexture===void 0&&(rt.__webglTexture=i.createTexture(),a.memory.textures++)}if(S.samples>0&&pe(S)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Z=0;Z<Q.length;Z++){let tt=Q[Z];z.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[Z]);let rt=r.convert(tt.format,tt.colorSpace),vt=r.convert(tt.type),ht=A(tt.internalFormat,rt,vt,tt.normalized,tt.colorSpace,S.isXRRenderTarget===!0),at=he(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,at,ht,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,z.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Gt(z.__webglDepthRenderbuffer,S,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(it){e.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),Ot(i.TEXTURE_CUBE_MAP,g);for(let Z=0;Z<6;Z++)if(g.mipmaps&&g.mipmaps.length>0)for(let tt=0;tt<g.mipmaps.length;tt++)ct(z.__webglFramebuffer[Z][tt],S,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,tt);else ct(z.__webglFramebuffer[Z],S,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);d(g)&&x(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(st){for(let Z=0,tt=Q.length;Z<tt;Z++){let rt=Q[Z],vt=n.get(rt),ht=i.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(ht=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,vt.__webglTexture),Ot(ht,rt),ct(z.__webglFramebuffer,S,rt,i.COLOR_ATTACHMENT0+Z,ht,0),d(rt)&&x(ht)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(Z=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,J.__webglTexture),Ot(Z,g),g.mipmaps&&g.mipmaps.length>0)for(let tt=0;tt<g.mipmaps.length;tt++)ct(z.__webglFramebuffer[tt],S,g,i.COLOR_ATTACHMENT0,Z,tt);else ct(z.__webglFramebuffer,S,g,i.COLOR_ATTACHMENT0,Z,0);d(g)&&x(Z),e.unbindTexture()}S.depthBuffer&&Ht(S)}function Vt(S){let g=S.textures;for(let z=0,J=g.length;z<J;z++){let Q=g[z];if(d(Q)){let it=D(S),st=n.get(Q).__webglTexture;e.bindTexture(it,st),x(it),e.unbindTexture()}}}let oe=[],xe=[];function Ne(S){if(S.samples>0){if(pe(S)===!1){let g=S.textures,z=S.width,J=S.height,Q=i.COLOR_BUFFER_BIT,it=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=n.get(S),Z=g.length>1;if(Z)for(let rt=0;rt<g.length;rt++)e.bindFramebuffer(i.FRAMEBUFFER,st.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,st.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,st.__webglMultisampledFramebuffer);let tt=S.texture.mipmaps;tt&&tt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,st.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,st.__webglFramebuffer);for(let rt=0;rt<g.length;rt++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,st.__webglColorRenderbuffer[rt]);let vt=n.get(g[rt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,vt,0)}i.blitFramebuffer(0,0,z,J,0,0,z,J,Q,i.NEAREST),c===!0&&(oe.length=0,xe.length=0,oe.push(i.COLOR_ATTACHMENT0+rt),S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&(oe.push(it),xe.push(it),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,xe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,oe))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let rt=0;rt<g.length;rt++){e.bindFramebuffer(i.FRAMEBUFFER,st.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,st.__webglColorRenderbuffer[rt]);let vt=n.get(g[rt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,st.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.TEXTURE_2D,vt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,st.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&c){let g=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function he(S){return Math.min(s.maxSamples,S.samples)}function pe(S){let g=n.get(S);return S.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function P(S){let g=a.render.frame;u.get(S)!==g&&(u.set(S,g),S.update())}function Se(S,g){let z=S.colorSpace,J=S.format,Q=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||z!==us&&z!==wn&&(kt.getTransfer(z)===qt?(J!==$e||Q!==Ve)&&It("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Tt("WebGLTextures: Unsupported texture color space:",z)),g}function Qt(S){return typeof HTMLImageElement!="undefined"&&S instanceof HTMLImageElement?(l.width=S.naturalWidth||S.width,l.height=S.naturalHeight||S.height):typeof VideoFrame!="undefined"&&S instanceof VideoFrame?(l.width=S.displayWidth,l.height=S.displayHeight):(l.width=S.width,l.height=S.height),l}this.allocateTextureUnit=R,this.resetTextureUnits=T,this.getTextureUnits=b,this.setTextureUnits=N,this.setTexture2D=j,this.setTexture2DArray=K,this.setTexture3D=X,this.setTextureCube=Y,this.rebindTextures=Wt,this.setupRenderTarget=ne,this.updateRenderTargetMipmap=Vt,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=Ht,this.setupFrameBufferTexture=ct,this.useMultisampledRTT=pe,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Gg(i,t){function e(n,s=wn){let r,a=kt.getTransfer(s);if(n===Ve)return i.UNSIGNED_BYTE;if(n===$r)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ta)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Xo)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Yo)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Jo)return i.BYTE;if(n===Wo)return i.SHORT;if(n===Xi)return i.UNSIGNED_SHORT;if(n===jr)return i.INT;if(n===cn)return i.UNSIGNED_INT;if(n===hn)return i.FLOAT;if(n===un)return i.HALF_FLOAT;if(n===qo)return i.ALPHA;if(n===Qo)return i.RGB;if(n===$e)return i.RGBA;if(n===_n)return i.DEPTH_COMPONENT;if(n===ti)return i.DEPTH_STENCIL;if(n===Zo)return i.RED;if(n===ea)return i.RED_INTEGER;if(n===ei)return i.RG;if(n===na)return i.RG_INTEGER;if(n===ia)return i.RGBA_INTEGER;if(n===Rs||n===Gs||n===Ls||n===Ps)if(a===qt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Rs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Gs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ls)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ps)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Rs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Gs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ls)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ps)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===sa||n===ra||n===aa||n===oa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===sa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ra)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===aa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===oa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===la||n===ca||n===ha||n===ua||n===da||n===Ns||n===fa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===la||n===ca)return a===qt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ha)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ua)return r.COMPRESSED_R11_EAC;if(n===da)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ns)return r.COMPRESSED_RG11_EAC;if(n===fa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===pa||n===ma||n===ga||n===_a||n===Ea||n===Ca||n===xa||n===Ba||n===Aa||n===Ma||n===ya||n===va||n===Sa||n===Da)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===pa)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ma)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ga)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===_a)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ea)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ca)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===xa)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ba)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Aa)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ma)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ya)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===va)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Sa)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Da)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ba||n===Ia||n===Ta)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ba)return a===qt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ia)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ta)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Fa||n===wa||n===Os||n===Ra)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Fa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===wa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Os)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ra)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Yi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Lg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Pg=`
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

}`,yl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Bs(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new qe({vertexShader:Lg,fragmentShader:Pg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new fe(new Fn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},vl=class extends an{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,h=null,p=null,_=null,B=typeof XRWebGLBinding!="undefined",m=new yl,d={},x=e.getContextAttributes(),D=null,A=null,y=[],M=[],I=new Ft,E=null,v=null,F=new Te;F.viewport=new le;let L=new Te;L.viewport=new le;let O=[F,L],T=new Wr,b=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let et=y[q];return et===void 0&&(et=new Oi,y[q]=et),et.getTargetRaySpace()},this.getControllerGrip=function(q){let et=y[q];return et===void 0&&(et=new Oi,y[q]=et),et.getGripSpace()},this.getHand=function(q){let et=y[q];return et===void 0&&(et=new Oi,y[q]=et),et.getHandSpace()};function R(q){let et=M.indexOf(q.inputSource);if(et===-1)return;let mt=y[et];mt!==void 0&&(mt.update(q.inputSource,q.frame,l||a),mt.dispatchEvent({type:q.type,data:q.inputSource}))}function U(){s.removeEventListener("select",R),s.removeEventListener("selectstart",R),s.removeEventListener("selectend",R),s.removeEventListener("squeeze",R),s.removeEventListener("squeezestart",R),s.removeEventListener("squeezeend",R),s.removeEventListener("end",U),s.removeEventListener("inputsourceschange",j);for(let q=0;q<y.length;q++){let et=M[q];et!==null&&(M[q]=null,y[q].disconnect(et))}b=null,N=null,m.reset();for(let q in d)delete d[q];if(t.setRenderTarget(D),p=null,h=null,f=null,s=null,A=null,Kt.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(I.width,I.height,!1),v!==null){let q=v.camera;q.fov=v.fov,q.zoom=v.zoom,q.updateProjectionMatrix(),v=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&It("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&It("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f===null&&B&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(D=t.getRenderTarget(),s.addEventListener("select",R),s.addEventListener("selectstart",R),s.addEventListener("selectend",R),s.addEventListener("squeeze",R),s.addEventListener("squeezestart",R),s.addEventListener("squeezeend",R),s.addEventListener("end",U),s.addEventListener("inputsourceschange",j),x.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(I),B&&"createProjectionLayer"in XRWebGLBinding.prototype){let mt=null,yt=null,ct=null;x.depth&&(ct=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,mt=x.stencil?ti:_n,yt=x.stencil?Yi:cn);let Gt={colorFormat:e.RGBA8,depthFormat:ct,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Gt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),A=new Ue(h.textureWidth,h.textureHeight,{format:$e,type:Ve,depthTexture:new Jn(h.textureWidth,h.textureHeight,yt,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let mt={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,mt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),A=new Ue(p.framebufferWidth,p.framebufferHeight,{format:$e,type:Ve,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Kt.setContext(s),Kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(q){for(let et=0;et<q.removed.length;et++){let mt=q.removed[et],yt=M.indexOf(mt);yt>=0&&(M[yt]=null,y[yt].disconnect(mt))}for(let et=0;et<q.added.length;et++){let mt=q.added[et],yt=M.indexOf(mt);if(yt===-1){for(let Gt=0;Gt<y.length;Gt++)if(Gt>=M.length){M.push(mt),yt=Gt;break}else if(M[Gt]===null){M[Gt]=mt,yt=Gt;break}if(yt===-1)break}let ct=y[yt];ct&&ct.connect(mt)}}let K=new H,X=new H;function Y(q,et,mt){K.setFromMatrixPosition(et.matrixWorld),X.setFromMatrixPosition(mt.matrixWorld);let yt=K.distanceTo(X),ct=et.projectionMatrix.elements,Gt=mt.projectionMatrix.elements,ce=ct[14]/(ct[10]-1),Ht=ct[14]/(ct[10]+1),Wt=(ct[9]+1)/ct[5],ne=(ct[9]-1)/ct[5],Vt=(ct[8]-1)/ct[0],oe=(Gt[8]+1)/Gt[0],xe=ce*Vt,Ne=ce*oe,he=yt/(-Vt+oe),pe=he*-Vt;if(et.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(pe),q.translateZ(he),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),ct[10]===-1)q.projectionMatrix.copy(et.projectionMatrix),q.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let P=ce+he,Se=Ht+he,Qt=xe-pe,S=Ne+(yt-pe),g=Wt*Ht/Se*P,z=ne*Ht/Se*P;q.projectionMatrix.makePerspective(Qt,S,g,z,P,Se),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function _t(q,et){et===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(et.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let et=q.near,mt=q.far;m.texture!==null&&(m.depthNear>0&&(et=m.depthNear),m.depthFar>0&&(mt=m.depthFar)),T.near=L.near=F.near=et,T.far=L.far=F.far=mt,(b!==T.near||N!==T.far)&&(s.updateRenderState({depthNear:T.near,depthFar:T.far}),b=T.near,N=T.far),T.layers.mask=q.layers.mask|6,F.layers.mask=T.layers.mask&-5,L.layers.mask=T.layers.mask&-3;let yt=q.parent,ct=T.cameras;_t(T,yt);for(let Gt=0;Gt<ct.length;Gt++)_t(ct[Gt],yt);ct.length===2?Y(T,F,L):T.projectionMatrix.copy(F.projectionMatrix),v===null&&q.isPerspectiveCamera&&(v={camera:q,fov:q.fov,zoom:q.zoom}),Et(q,T,yt)};function Et(q,et,mt){mt===null?q.matrix.copy(et.matrixWorld):(q.matrix.copy(mt.matrixWorld),q.matrix.invert(),q.matrix.multiply(et.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(et.projectionMatrix),q.projectionMatrixInverse.copy(et.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Pi*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return T},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(q){c=q,h!==null&&(h.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(T)},this.getCameraTexture=function(q){return d[q]};let jt=null;function Ot(q,et){if(u=et.getViewerPose(l||a),_=et,u!==null){let mt=u.views;p!==null&&(t.setRenderTargetFramebuffer(A,p.framebuffer),t.setRenderTarget(A));let yt=!1;mt.length!==T.cameras.length&&(T.cameras.length=0,yt=!0);for(let Ht=0;Ht<mt.length;Ht++){let Wt=mt[Ht],ne=null;if(p!==null)ne=p.getViewport(Wt);else{let oe=f.getViewSubImage(h,Wt);ne=oe.viewport,Ht===0&&(t.setRenderTargetTextures(A,oe.colorTexture,oe.depthStencilTexture),t.setRenderTarget(A))}let Vt=O[Ht];Vt===void 0&&(Vt=new Te,Vt.layers.enable(Ht),Vt.viewport=new le,O[Ht]=Vt),Vt.matrix.fromArray(Wt.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(Wt.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(ne.x,ne.y,ne.width,ne.height),Ht===0&&(T.matrix.copy(Vt.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale)),yt===!0&&T.cameras.push(Vt)}let ct=s.enabledFeatures;if(ct&&ct.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&B){f=n.getBinding();let Ht=f.getDepthInformation(mt[0]);Ht&&Ht.isValid&&Ht.texture&&m.init(Ht,s.renderState)}if(ct&&ct.includes("camera-access")&&B){t.state.unbindTexture(),f=n.getBinding();for(let Ht=0;Ht<mt.length;Ht++){let Wt=mt[Ht].camera;if(Wt){let ne=d[Wt];ne||(ne=new Bs,d[Wt]=ne);let Vt=f.getCameraImage(Wt);ne.sourceTexture=Vt}}}}for(let mt=0;mt<y.length;mt++){let yt=M[mt],ct=y[mt];yt!==null&&ct!==void 0&&ct.update(yt,et,l||a)}jt&&jt(q,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),_=null}let Kt=new Ch;Kt.setAnimationLoop(Ot),this.setAnimationLoop=function(q){jt=q},this.dispose=function(){}}},Ng=new ue,vh=new wt;vh.set(-1,0,0,0,1,0,0,0,1);function Og(i,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,nl(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,x,D,A){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(m,d):d.isMeshLambertMaterial?(r(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(m,d),f(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,A)):d.isMeshMatcapMaterial?(r(m,d),_(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),B(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?c(m,d,x,D):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Le&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Le&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let x=t.get(d),D=x.envMap,A=x.envMapRotation;D&&(m.envMap.value=D,m.envMapRotation.value.setFromMatrix4(Ng.makeRotationFromEuler(A)).transpose(),D.isCubeTexture&&D.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(vh),m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,x,D){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*x,m.scale.value=D*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,x){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Le&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.retroreflectivity>0&&(m.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,d){d.matcap&&(m.matcap.value=d.matcap)}function B(m,d){let x=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Hg(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(A,y){let M=y.program;n.uniformBlockBinding(A,M)}function l(A,y){let M=s[A.id];M===void 0&&(m(A),M=u(A),s[A.id]=M,A.addEventListener("dispose",x));let I=y.program;n.updateUBOMapping(A,I);let E=t.render.frame;r[A.id]!==E&&(h(A),r[A.id]=E)}function u(A){let y=f();A.__bindingPointIndex=y;let M=i.createBuffer(),I=A.__size,E=A.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,I,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,M),M}function f(){for(let A=0;A<o;A++)if(a.indexOf(A)===-1)return a.push(A),A;return Tt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(A){let y=s[A.id],M=A.uniforms,I=A.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let E=0,v=M.length;E<v;E++){let F=M[E];if(Array.isArray(F))for(let L=0,O=F.length;L<O;L++)p(F[L],E,L,I);else p(F,E,0,I)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(A,y,M,I){if(B(A,y,M,I)===!0){let E=A.__offset,v=A.value;if(Array.isArray(v)){let F=0;for(let L=0;L<v.length;L++){let O=v[L],T=d(O);_(O,A.__data,F),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(F+=T.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(v,A.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,E,A.__data)}}function _(A,y,M){typeof A=="number"||typeof A=="boolean"?y[0]=A:A.isMatrix3?(y[0]=A.elements[0],y[1]=A.elements[1],y[2]=A.elements[2],y[3]=0,y[4]=A.elements[3],y[5]=A.elements[4],y[6]=A.elements[5],y[7]=0,y[8]=A.elements[6],y[9]=A.elements[7],y[10]=A.elements[8],y[11]=0):ArrayBuffer.isView(A)?y.set(new A.constructor(A.buffer,A.byteOffset,y.length)):A.toArray(y,M)}function B(A,y,M,I){let E=A.value,v=y+"_"+M;if(I[v]===void 0)return typeof E=="number"||typeof E=="boolean"?I[v]=E:ArrayBuffer.isView(E)?I[v]=E.slice():I[v]=E.clone(),!0;{let F=I[v];if(typeof E=="number"||typeof E=="boolean"){if(F!==E)return I[v]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(F.equals(E)===!1)return F.copy(E),!0}}return!1}function m(A){let y=A.uniforms,M=0,I=16;for(let v=0,F=y.length;v<F;v++){let L=Array.isArray(y[v])?y[v]:[y[v]];for(let O=0,T=L.length;O<T;O++){let b=L[O],N=Array.isArray(b.value)?b.value:[b.value];for(let R=0,U=N.length;R<U;R++){let j=N[R],K=d(j),X=M%I,Y=X%K.boundary,_t=X+Y;M+=Y,_t!==0&&I-_t<K.storage&&(M+=I-_t),b.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),b.__offset=M,M+=K.storage}}}let E=M%I;return E>0&&(M+=I-E),A.__size=M,A.__cache={},this}function d(A){let y={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(y.boundary=4,y.storage=4):A.isVector2?(y.boundary=8,y.storage=8):A.isVector3||A.isColor?(y.boundary=16,y.storage=12):A.isVector4?(y.boundary=16,y.storage=16):A.isMatrix3?(y.boundary=48,y.storage=48):A.isMatrix4?(y.boundary=64,y.storage=64):A.isTexture?It("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(A)?(y.boundary=16,y.storage=A.byteLength):It("WebGLRenderer: Unsupported uniform value type.",A),y}function x(A){let y=A.target;y.removeEventListener("dispose",x);let M=a.indexOf(y.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function D(){for(let A in s)i.deleteBuffer(s[A]);a=[],s={},r={}}return{bind:c,update:l,dispose:D}}var Ug=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),xn=null;function zg(){return xn===null&&(xn=new br(Ug,16,16,ei,un),xn.name="DFG_LUT",xn.minFilter=ve,xn.magFilter=ve,xn.wrapS=gn,xn.wrapT=gn,xn.generateMipmaps=!1,xn.needsUpdate=!0),xn}var za=class{constructor(t={}){let{canvas:e=Kc(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:p=Ve}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;let B=p,m=new Set([ia,na,ea]),d=new Set([Ve,cn,Xi,Yi,$r,ta]),x=new Uint32Array(4),D=new Int32Array(4),A=new H,y=null,M=null,I=[],E=[],v=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ln,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let F=this,L=!1,O=null,T=null,b=null,N=null;this._outputColorSpace=We;let R=0,U=0,j=null,K=-1,X=null,Y=new le,_t=new le,Et=null,jt=new zt(0),Ot=0,Kt=e.width,q=e.height,et=1,mt=null,yt=null,ct=new le(0,0,Kt,q),Gt=new le(0,0,Kt,q),ce=!1,Ht=new zi,Wt=!1,ne=!1,Vt=new ue,oe=new H,xe=new le,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},he=!1;function pe(){return j===null?et:1}let P=n;function Se(C,w){return e.getContext(C,w)}let Qt,S,g,z,J,Q,it,st,Z,tt,rt,vt,ht,at,St,bt,Rt,G,ot,$,lt,pt,nt;try{let C={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",ie,!1),e.addEventListener("webglcontextrestored",Xt,!1),e.addEventListener("webglcontextcreationerror",tn,!1),P===null){let w="webgl2";if(P=Se(w,C),P===null)throw Se(w)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Dt()}catch(C){throw e.removeEventListener("webglcontextlost",ie,!1),e.removeEventListener("webglcontextrestored",Xt,!1),e.removeEventListener("webglcontextcreationerror",tn,!1),Tt("WebGLRenderer: "+C.message),C}function Dt(){Qt=new Yp(P),Qt.init(),lt=new Gg(P,Qt),S=new Op(P,Qt,t,lt),g=new wg(P,Qt),S.reversedDepthBuffer&&h&&g.buffers.depth.setReversed(!0),T=P.createFramebuffer(),b=P.createFramebuffer(),N=P.createFramebuffer(),z=new Zp(P),J=new Eg,Q=new Rg(P,Qt,g,J,S,lt,z),it=new Xp(F),st=new ju(P),pt=new Pp(P,st),Z=new qp(P,st,z,pt),tt=new $p(P,Z,st,pt,z),G=new jp(P,S,Q),St=new Hp(J),rt=new _g(F,it,Qt,S,pt,St),vt=new Og(F,J),ht=new xg,at=new Sg(Qt),Rt=new Lp(F,it,g,tt,_,c),bt=new Fg(F,tt,S),nt=new Hg(P,z,S,g),ot=new Np(P,Qt,z),$=new Qp(P,Qt,z),z.programs=rt.programs,F.capabilities=S,F.extensions=Qt,F.properties=J,F.renderLists=ht,F.shadowMap=bt,F.state=g,F.info=z}B!==Ve&&(v=new em(B,e.width,e.height,o,s,r));let At=new vl(F,P);this.xr=At,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let C=Qt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){let C=Qt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(C){C!==void 0&&(et=C,this.setSize(Kt,q,!1))},this.getSize=function(C){return C.set(Kt,q)},this.setSize=function(C,w,W=!0){if(At.isPresenting){It("WebGLRenderer: Can't change size while VR device is presenting.");return}Kt=C,q=w,e.width=Math.floor(C*et),e.height=Math.floor(w*et),W===!0&&(e.style.width=C+"px",e.style.height=w+"px"),v!==null&&v.setSize(e.width,e.height),this.setViewport(0,0,C,w)},this.getDrawingBufferSize=function(C){return C.set(Kt*et,q*et).floor()},this.setDrawingBufferSize=function(C,w,W){Kt=C,q=w,et=W,e.width=Math.floor(C*W),e.height=Math.floor(w*W),this.setViewport(0,0,C,w)},this.setEffects=function(C){if(B===Ve){Tt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let w=0;w<C.length;w++)if(C[w].isOutputPass===!0){It("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(Y)},this.getViewport=function(C){return C.copy(ct)},this.setViewport=function(C,w,W,V){C.isVector4?ct.set(C.x,C.y,C.z,C.w):ct.set(C,w,W,V),g.viewport(Y.copy(ct).multiplyScalar(et).round())},this.getScissor=function(C){return C.copy(Gt)},this.setScissor=function(C,w,W,V){C.isVector4?Gt.set(C.x,C.y,C.z,C.w):Gt.set(C,w,W,V),g.scissor(_t.copy(Gt).multiplyScalar(et).round())},this.getScissorTest=function(){return ce},this.setScissorTest=function(C){g.setScissorTest(ce=C)},this.setOpaqueSort=function(C){mt=C},this.setTransparentSort=function(C){yt=C},this.getClearColor=function(C){return C.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor(...arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha(...arguments)},this.clear=function(C=!0,w=!0,W=!0){let V=0;if(C){let k=!1;if(j!==null){let ft=j.texture.format;k=m.has(ft)}if(k){let ft=j.texture.type,Ct=d.has(ft),dt=Rt.getClearColor(),xt=Rt.getClearAlpha(),Mt=dt.r,Lt=dt.g,Ut=dt.b;Ct?(x[0]=Mt,x[1]=Lt,x[2]=Ut,x[3]=xt,P.clearBufferuiv(P.COLOR,0,x)):(D[0]=Mt,D[1]=Lt,D[2]=Ut,D[3]=xt,P.clearBufferiv(P.COLOR,0,D))}else V|=P.COLOR_BUFFER_BIT}w&&(V|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(V|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&P.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),O=C},this.dispose=function(){e.removeEventListener("webglcontextlost",ie,!1),e.removeEventListener("webglcontextrestored",Xt,!1),e.removeEventListener("webglcontextcreationerror",tn,!1),Rt.dispose(),ht.dispose(),at.dispose(),J.dispose(),it.dispose(),tt.dispose(),pt.dispose(),nt.dispose(),rt.dispose(),At.dispose(),At.removeEventListener("sessionstart",Rl),At.removeEventListener("sessionend",Gl),si.stop()};function ie(C){C.preventDefault(),$o("WebGLRenderer: Context Lost."),L=!0}function Xt(){$o("WebGLRenderer: Context Restored."),L=!1;let C=z.autoReset,w=bt.enabled,W=bt.autoUpdate,V=bt.needsUpdate,k=bt.type;Dt(),z.autoReset=C,bt.enabled=w,bt.autoUpdate=W,bt.needsUpdate=V,bt.type=k}function tn(C){Tt("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function fn(C){let w=C.target;w.removeEventListener("dispose",fn),Yh(w)}function Yh(C){qh(C),J.remove(C)}function qh(C){let w=J.get(C).programs;w!==void 0&&(w.forEach(function(W){rt.releaseProgram(W)}),C.isShaderMaterial&&rt.releaseShaderCache(C))}this.renderBufferDirect=function(C,w,W,V,k,ft){w===null&&(w=Ne);let Ct=k.isMesh&&k.matrixWorld.determinantAffine()<0,dt=jh(C,w,W,V,k);g.setMaterial(V,Ct);let xt=W.index,Mt=1;if(V.wireframe===!0){if(xt=Z.getWireframeAttribute(W),xt===void 0)return;Mt=2}let Lt=W.drawRange,Ut=W.attributes.position,Bt=Lt.start*Mt,Yt=(Lt.start+Lt.count)*Mt;ft!==null&&(Bt=Math.max(Bt,ft.start*Mt),Yt=Math.min(Yt,(ft.start+ft.count)*Mt)),xt!==null?(Bt=Math.max(Bt,0),Yt=Math.min(Yt,xt.count)):Ut!=null&&(Bt=Math.max(Bt,0),Yt=Math.min(Yt,Ut.count));let me=Yt-Bt;if(me<0||me===1/0)return;pt.setup(k,V,dt,W,xt);let re,te=ot;if(xt!==null&&(re=st.get(xt),te=$,te.setIndex(re)),k.isMesh)V.wireframe===!0?(g.setLineWidth(V.wireframeLinewidth*pe()),te.setMode(P.LINES)):te.setMode(P.TRIANGLES);else if(k.isLine){let De=V.linewidth;De===void 0&&(De=1),g.setLineWidth(De*pe()),k.isLineSegments?te.setMode(P.LINES):k.isLineLoop?te.setMode(P.LINE_LOOP):te.setMode(P.LINE_STRIP)}else k.isPoints?te.setMode(P.POINTS):k.isSprite&&te.setMode(P.TRIANGLES);if(k.isBatchedMesh)if(Qt.get("WEBGL_multi_draw"))te.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let De=k._multiDrawStarts,gt=k._multiDrawCounts,Re=k._multiDrawCount,Jt=xt?st.get(xt).bytesPerElement:1,Ze=J.get(V).currentProgram.getUniforms();for(let pn=0;pn<Re;pn++)Ze.setValue(P,"_gl_DrawID",pn),te.render(De[pn]/Jt,gt[pn])}else if(k.isInstancedMesh)te.renderInstances(Bt,me,k.count);else if(W.isInstancedBufferGeometry){let De=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,gt=Math.min(W.instanceCount,De);te.renderInstances(Bt,me,gt)}else te.render(Bt,me)};function wl(C,w,W,V){O!==null&&C.isNodeMaterial&&O.setObject(V,C),Wt===!0&&St.setState(C,W,!1),C.transparent===!0&&C.side===En&&C.forceSinglePass===!1?(C.side=Le,C.needsUpdate=!0,Xs(C,w,V),C.side=Zn,C.needsUpdate=!0,Xs(C,w,V),C.side=En):Xs(C,w,V)}this.compile=function(C,w,W=null){W===null&&(W=C),O!==null&&O.renderStart(C,w,W),M=at.get(W),M.init(w),E.push(M),W.traverseVisible(function(k){k.isLight&&k.layers.test(w.layers)&&(M.pushLight(k),k.castShadow&&M.pushShadow(k))}),C!==W&&C.traverseVisible(function(k){k.isLight&&k.layers.test(w.layers)&&(M.pushLight(k),k.castShadow&&M.pushShadow(k))}),M.setupLights(),O!==null&&O.updateLights(M.state.lightsArray),ne=this.localClippingEnabled,Wt=St.init(this.clippingPlanes,ne),Wt===!0&&St.setGlobalState(this.clippingPlanes,w),O!==null&&bt.render(M.state.shadowsArray,W,w);let V=new Set;return C.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let ft=k.material;if(ft)if(Array.isArray(ft))for(let Ct=0;Ct<ft.length;Ct++){let dt=ft[Ct];wl(dt,W,w,k),V.add(dt)}else wl(ft,W,w,k),V.add(ft)}),M=E.pop(),O!==null&&O.renderEnd(),V},this.compileAsync=function(C,w,W=null){let V=this.compile(C,w,W);return new Promise(k=>{function ft(){if(V.forEach(function(Ct){let xt=J.get(Ct).currentProgram;(xt===void 0||xt.isReady())&&V.delete(Ct)}),V.size===0){k(C);return}setTimeout(ft,10)}Qt.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let to=null;function Qh(C){to&&to(C)}function Rl(){si.stop()}function Gl(){si.start()}let si=new Ch;si.setAnimationLoop(Qh),typeof self!="undefined"&&si.setContext(self),this.setAnimationLoop=function(C){to=C,At.setAnimationLoop(C),C===null?si.stop():si.start()},At.addEventListener("sessionstart",Rl),At.addEventListener("sessionend",Gl),this.render=function(C,w){if(w!==void 0&&w.isCamera!==!0){Tt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;O!==null&&O.renderStart(C,w);let W=At.enabled===!0&&At.isPresenting===!0,V=v!==null&&(j===null||W)&&v.begin(F,j);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),w.parent===null&&w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),At.enabled===!0&&At.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(At.cameraAutoUpdate===!0&&At.updateCamera(w),w=At.getCamera()),C.isScene===!0&&C.onBeforeRender(F,C,w,j),M=at.get(C,E.length),M.init(w),M.state.textureUnits=Q.getTextureUnits(),E.push(M),Vt.multiplyMatrices(w.projectionMatrix,w.matrixWorldInverse),Ht.setFromProjectionMatrix(Vt,rn,w.reversedDepth),ne=this.localClippingEnabled,Wt=St.init(this.clippingPlanes,ne),y=ht.get(C,I.length),y.init(),I.push(y),At.enabled===!0&&At.isPresenting===!0){let Ct=F.xr.getDepthSensingMesh();Ct!==null&&eo(Ct,w,-1/0,F.sortObjects)}eo(C,w,0,F.sortObjects),y.finish(),O!==null&&O.updateLights(M.state.lightsArray),F.sortObjects===!0&&y.sort(mt,yt),he=At.enabled===!1||At.isPresenting===!1||At.hasDepthSensing()===!1,he&&Rt.addToRenderList(y,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Wt===!0&&St.beginShadows();let k=M.state.shadowsArray;if(bt.render(k,C,w),Wt===!0&&St.endShadows(),(V&&v.hasRenderPass())===!1){let Ct=y.opaque,dt=y.transmissive;if(M.setupLights(),w.isArrayCamera){let xt=w.cameras;if(dt.length>0)for(let Mt=0,Lt=xt.length;Mt<Lt;Mt++){let Ut=xt[Mt];Pl(Ct,dt,C,Ut)}he&&Rt.render(C);for(let Mt=0,Lt=xt.length;Mt<Lt;Mt++){let Ut=xt[Mt];Ll(y,C,Ut,Ut.viewport)}}else dt.length>0&&Pl(Ct,dt,C,w),he&&Rt.render(C),Ll(y,C,w)}j!==null&&U===0&&(Q.updateMultisampleRenderTarget(j),Q.updateRenderTargetMipmap(j)),V&&v.end(F),C.isScene===!0&&C.onAfterRender(F,C,w),pt.resetDefaultState(),K=-1,X=null,E.pop(),E.length>0?(M=E[E.length-1],Q.setTextureUnits(M.state.textureUnits),Wt===!0&&St.setGlobalState(F.clippingPlanes,M.state.camera)):M=null,I.pop(),I.length>0?y=I[I.length-1]:y=null,O!==null&&O.renderEnd()};function eo(C,w,W,V){if(C.visible===!1)return;if(C.layers.test(w.layers)){if(C.isGroup)W=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(w);else if(C.isLightProbeGrid)M.pushLightProbeGrid(C);else if(C.isLight)M.pushLight(C),C.castShadow&&M.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||C.intersectsFrustum(Ht)){V&&xe.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Vt);let Ct=tt.update(C),dt=C.material;dt.visible&&y.push(C,Ct,dt,W,xe.z,null,w)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||C.intersectsFrustum(Ht))){let Ct=tt.update(C),dt=C.material;if(V&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),xe.copy(C.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),xe.copy(Ct.boundingSphere.center)),xe.applyMatrix4(C.matrixWorld).applyMatrix4(Vt)),Array.isArray(dt)){let xt=Ct.groups;for(let Mt=0,Lt=xt.length;Mt<Lt;Mt++){let Ut=xt[Mt],Bt=dt[Ut.materialIndex];Bt&&Bt.visible&&y.push(C,Ct,Bt,W,xe.z,Ut,w)}}else dt.visible&&y.push(C,Ct,dt,W,xe.z,null,w)}}let ft=C.children;for(let Ct=0,dt=ft.length;Ct<dt;Ct++)eo(ft[Ct],w,W,V)}function Ll(C,w,W,V){let{opaque:k,transmissive:ft,transparent:Ct}=C;M.setupLightsView(W),Wt===!0&&St.setGlobalState(F.clippingPlanes,W),V&&g.viewport(Y.copy(V)),k.length>0&&Ws(k,w,W),ft.length>0&&Ws(ft,w,W),Ct.length>0&&Ws(Ct,w,W),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function Pl(C,w,W,V){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[V.id]===void 0){let Bt=Qt.has("EXT_color_buffer_half_float")||Qt.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[V.id]=new Ue(1,1,{generateMipmaps:!0,type:Bt?un:Ve,minFilter:$n,samples:Math.max(4,S.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:kt.workingColorSpace})}let ft=M.state.transmissionRenderTarget[V.id],Ct=V.viewport||Y;ft.setSize(Ct.z*F.transmissionResolutionScale,Ct.w*F.transmissionResolutionScale);let dt=F.getRenderTarget(),xt=F.getActiveCubeFace(),Mt=F.getActiveMipmapLevel();F.setRenderTarget(ft),F.getClearColor(jt),Ot=F.getClearAlpha(),Ot<1&&F.setClearColor(16777215,.5),F.clear(),he&&Rt.render(W);let Lt=F.toneMapping;F.toneMapping=ln;let Ut=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),M.setupLightsView(V),Wt===!0&&St.setGlobalState(F.clippingPlanes,V),Ws(C,W,V),Q.updateMultisampleRenderTarget(ft),Q.updateRenderTargetMipmap(ft),Qt.has("WEBGL_multisampled_render_to_texture")===!1){let Bt=!1;for(let Yt=0,me=w.length;Yt<me;Yt++){let re=w[Yt],{object:te,geometry:De,material:gt,group:Re}=re;if(gt.side===En&&te.layers.test(V.layers)){let Jt=gt.side;gt.side=Le,gt.needsUpdate=!0,Nl(te,W,V,De,gt,Re),gt.side=Jt,gt.needsUpdate=!0,Bt=!0}}Bt===!0&&(Q.updateMultisampleRenderTarget(ft),Q.updateRenderTargetMipmap(ft))}F.setRenderTarget(dt,xt,Mt),F.setClearColor(jt,Ot),Ut!==void 0&&(V.viewport=Ut),F.toneMapping=Lt}function Ws(C,w,W){let V=w.isScene===!0?w.overrideMaterial:null;for(let k=0,ft=C.length;k<ft;k++){let Ct=C[k],{object:dt,geometry:xt,group:Mt}=Ct,Lt=Ct.material;Lt.allowOverride===!0&&V!==null&&(Lt=V),dt.layers.test(W.layers)&&Nl(dt,w,W,xt,Lt,Mt)}}function Nl(C,w,W,V,k,ft){O!==null&&k.isNodeMaterial&&O.setObject(C,k),C.onBeforeRender(F,w,W,V,k,ft),C.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),k.onBeforeRender(F,w,W,V,C,ft),k.transparent===!0&&k.side===En&&k.forceSinglePass===!1?(k.side=Le,k.needsUpdate=!0,F.renderBufferDirect(W,w,V,k,C,ft),k.side=Zn,k.needsUpdate=!0,F.renderBufferDirect(W,w,V,k,C,ft),k.side=En):F.renderBufferDirect(W,w,V,k,C,ft),C.onAfterRender(F,w,W,V,k,ft)}function Xs(C,w,W){w.isScene!==!0&&(w=Ne);let V=J.get(C),k=M.state.lights,ft=M.state.shadowsArray,Ct=k.state.version,dt=rt.getParameters(C,k.state,ft,w,W,M.state.lightProbeGridArray),xt=rt.getProgramCacheKey(dt),Mt=V.programs;V.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?w.environment:null,V.fog=w.fog;let Lt=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;V.envMap=it.get(C.envMap||V.environment,Lt),V.envMapRotation=V.environment!==null&&C.envMap===null?w.environmentRotation:C.envMapRotation,Mt===void 0&&(C.addEventListener("dispose",fn),Mt=new Map,V.programs=Mt);let Ut=Mt.get(xt);if(Ut!==void 0){if(V.currentProgram===Ut&&V.lightsStateVersion===Ct)return Hl(C,dt),Ut}else dt.uniforms=rt.getUniforms(C),O!==null&&C.isNodeMaterial&&O.build(C,W,dt),C.onBeforeCompile(dt,F),Ut=rt.acquireProgram(dt,xt),Mt.set(xt,Ut),V.uniforms=dt.uniforms;let Bt=V.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Bt.clippingPlanes=St.uniform),Hl(C,dt),V.needsLights=tu(C),V.lightsStateVersion=Ct,V.needsLights&&(Bt.ambientLightColor.value=k.state.ambient,Bt.lightProbe.value=k.state.probe,Bt.sunLights.value=k.state.sun,Bt.sunLightShadows.value=k.state.sunShadow,Bt.directionalLights.value=k.state.directional,Bt.directionalLightShadows.value=k.state.directionalShadow,Bt.spotLights.value=k.state.spot,Bt.spotLightShadows.value=k.state.spotShadow,Bt.rectAreaLights.value=k.state.rectArea,Bt.ltc_1.value=k.state.rectAreaLTC1,Bt.ltc_2.value=k.state.rectAreaLTC2,Bt.pointLights.value=k.state.point,Bt.pointLightShadows.value=k.state.pointShadow,Bt.hemisphereLights.value=k.state.hemi,Bt.sunShadowMatrix.value=k.state.sunShadowMatrix,Bt.sunShadowCascade.value=k.state.sunShadowCascade,Bt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Bt.spotLightMatrix.value=k.state.spotLightMatrix,Bt.spotLightMap.value=k.state.spotLightMap,Bt.pointShadowMatrix.value=k.state.pointShadowMatrix),V.lightProbeGrid=M.state.lightProbeGridArray.length>0,V.currentProgram=Ut,V.uniformsList=null,Ut}function Ol(C){if(C.uniformsList===null){let w=C.currentProgram.getUniforms();C.uniformsList=ji.seqWithValue(w.seq,C.uniforms)}return C.uniformsList}function Hl(C,w){let W=J.get(C);W.outputColorSpace=w.outputColorSpace,W.batching=w.batching,W.batchingColor=w.batchingColor,W.instancing=w.instancing,W.instancingColor=w.instancingColor,W.instancingMorph=w.instancingMorph,W.skinning=w.skinning,W.morphTargets=w.morphTargets,W.morphNormals=w.morphNormals,W.morphColors=w.morphColors,W.morphTargetsCount=w.morphTargetsCount,W.numClippingPlanes=w.numClippingPlanes,W.numIntersection=w.numClipIntersection,W.vertexAlphas=w.vertexAlphas,W.vertexTangents=w.vertexTangents,W.toneMapping=w.toneMapping}function Zh(C,w){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;A.setFromMatrixPosition(w.matrixWorld);for(let W=0,V=C.length;W<V;W++){let k=C[W];if(k.texture!==null&&k.boundingBox.containsPoint(A))return k}return null}function jh(C,w,W,V,k){w.isScene!==!0&&(w=Ne),Q.resetTextureUnits();let ft=w.fog,Ct=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?w.environment:null,dt=j===null?F.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:kt.workingColorSpace,xt=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Mt=it.get(V.envMap||Ct,xt),Lt=V.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ut=!!W.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Bt=!!W.morphAttributes.position,Yt=!!W.morphAttributes.normal,me=!!W.morphAttributes.color,re=ln;V.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(re=F.toneMapping);let te=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,De=te!==void 0?te.length:0,gt=J.get(V),Re=M.state.lights;if(Wt===!0&&(ne===!0||C!==X)){let se=C===X&&V.id===K;St.setState(V,C,se)}let Jt=!1;V.version===gt.__version?(gt.needsLights&&gt.lightsStateVersion!==Re.state.version||gt.outputColorSpace!==dt||k.isBatchedMesh&&gt.batching===!1||!k.isBatchedMesh&&gt.batching===!0||k.isBatchedMesh&&gt.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&gt.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&gt.instancing===!1||!k.isInstancedMesh&&gt.instancing===!0||k.isSkinnedMesh&&gt.skinning===!1||!k.isSkinnedMesh&&gt.skinning===!0||k.isInstancedMesh&&gt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&gt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&gt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&gt.instancingMorph===!1&&k.morphTexture!==null||gt.envMap!==Mt||V.fog===!0&&gt.fog!==ft||gt.numClippingPlanes!==void 0&&(gt.numClippingPlanes!==St.numPlanes||gt.numIntersection!==St.numIntersection)||gt.vertexAlphas!==Lt||gt.vertexTangents!==Ut||gt.morphTargets!==Bt||gt.morphNormals!==Yt||gt.morphColors!==me||gt.toneMapping!==re||gt.morphTargetsCount!==De||!!gt.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(Jt=!0):(Jt=!0,gt.__version=V.version);let Ze=gt.currentProgram;Jt===!0&&(Ze=Xs(V,w,k),O&&V.isNodeMaterial&&O.onUpdateProgram(V,Ze,gt));let pn=!1,Gn=!1,gi=!1,$t=Ze.getUniforms(),de=gt.uniforms;if(g.useProgram(Ze.program)&&(pn=!0,Gn=!0,gi=!0),V.id!==K&&(K=V.id,Gn=!0),gt.needsLights){let se=Zh(M.state.lightProbeGridArray,k);gt.lightProbeGrid!==se&&(gt.lightProbeGrid=se,Gn=!0)}if(pn||X!==C){g.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),$t.setValue(P,"projectionMatrix",C.projectionMatrix),$t.setValue(P,"viewMatrix",C.matrixWorldInverse);let Pn=$t.map.cameraPosition;Pn!==void 0&&Pn.setValue(P,oe.setFromMatrixPosition(C.matrixWorld)),S.logarithmicDepthBuffer&&$t.setValue(P,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&$t.setValue(P,"isOrthographic",C.isOrthographicCamera===!0),X!==C&&(X=C,Gn=!0,gi=!0)}if(gt.needsLights&&(Re.state.sunShadowMap.length>0&&$t.setValue(P,"sunShadowMap",Re.state.sunShadowMap,Q),Re.state.directionalShadowMap.length>0&&$t.setValue(P,"directionalShadowMap",Re.state.directionalShadowMap,Q),Re.state.spotShadowMap.length>0&&$t.setValue(P,"spotShadowMap",Re.state.spotShadowMap,Q),Re.state.pointShadowMap.length>0&&$t.setValue(P,"pointShadowMap",Re.state.pointShadowMap,Q)),k.isSkinnedMesh){$t.setOptional(P,k,"bindMatrix"),$t.setOptional(P,k,"bindMatrixInverse");let se=k.skeleton;se&&(se.boneTexture===null&&se.computeBoneTexture(),$t.setValue(P,"boneTexture",se.boneTexture,Q))}k.isBatchedMesh&&($t.setOptional(P,k,"batchingTexture"),$t.setValue(P,"batchingTexture",k._matricesTexture,Q),$t.setOptional(P,k,"batchingIdTexture"),$t.setValue(P,"batchingIdTexture",k._indirectTexture,Q),$t.setOptional(P,k,"batchingColorTexture"),k._colorsTexture!==null&&$t.setValue(P,"batchingColorTexture",k._colorsTexture,Q));let Ln=W.morphAttributes;if((Ln.position!==void 0||Ln.normal!==void 0||Ln.color!==void 0)&&G.update(k,W,Ze),(Gn||gt.receiveShadow!==k.receiveShadow)&&(gt.receiveShadow=k.receiveShadow,$t.setValue(P,"receiveShadow",k.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&w.environment!==null&&(de.envMapIntensity.value=w.environmentIntensity),de.dfgLUT!==void 0&&(de.dfgLUT.value=zg()),Gn){if($t.setValue(P,"toneMappingExposure",F.toneMappingExposure),gt.needsLights&&$h(de,gi),ft&&V.fog===!0&&vt.refreshFogUniforms(de,ft),vt.refreshMaterialUniforms(de,V,et,q,M.state.transmissionRenderTarget[C.id]),gt.needsLights&&gt.lightProbeGrid){let se=gt.lightProbeGrid;de.probesSH.value=se.texture,de.probesMin.value.copy(se.boundingBox.min),de.probesMax.value.copy(se.boundingBox.max),de.probesResolution.value.copy(se.resolution)}ji.upload(P,Ol(gt),de,Q)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(ji.upload(P,Ol(gt),de,Q),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&$t.setValue(P,"center",k.center),$t.setValue(P,"modelViewMatrix",k.modelViewMatrix),$t.setValue(P,"normalMatrix",k.normalMatrix),$t.setValue(P,"modelMatrix",k.matrixWorld),V.uniformsGroups!==void 0){let se=V.uniformsGroups;for(let Pn=0,_i=se.length;Pn<_i;Pn++){let zl=se[Pn];nt.update(zl,Ze),nt.bind(zl,Ze)}}return Ze}function $h(C,w){C.ambientLightColor.needsUpdate=w,C.lightProbe.needsUpdate=w,C.sunLights.needsUpdate=w,C.sunLightShadows.needsUpdate=w,C.directionalLights.needsUpdate=w,C.directionalLightShadows.needsUpdate=w,C.pointLights.needsUpdate=w,C.pointLightShadows.needsUpdate=w,C.spotLights.needsUpdate=w,C.spotLightShadows.needsUpdate=w,C.rectAreaLights.needsUpdate=w,C.hemisphereLights.needsUpdate=w}function tu(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(C,w,W){let V=J.get(C);V.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),J.get(C.texture).__webglTexture=w,J.get(C.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:W,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,w){let W=J.get(C);W.__webglFramebuffer=w,W.__useDefaultFramebuffer=w===void 0},this.setRenderTarget=function(C,w=0,W=0){j=C,R=w,U=W;let V=null,k=!1,ft=!1;if(C){let dt=J.get(C);if(dt.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(P.FRAMEBUFFER,dt.__webglFramebuffer),Y.copy(C.viewport),_t.copy(C.scissor),Et=C.scissorTest,g.viewport(Y),g.scissor(_t),g.setScissorTest(Et),K=-1;return}else if(dt.__webglFramebuffer===void 0)Q.setupRenderTarget(C);else if(dt.__hasExternalTextures)Q.rebindTextures(C,J.get(C.texture).__webglTexture,J.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){let Lt=C.depthTexture;if(dt.__boundDepthTexture!==Lt){if(Lt!==null&&J.has(Lt)&&(C.width!==Lt.image.width||C.height!==Lt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(C)}}let xt=C.texture;(xt.isData3DTexture||xt.isDataArrayTexture||xt.isCompressedArrayTexture)&&(ft=!0);let Mt=J.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Mt[w])?V=Mt[w][W]:V=Mt[w],k=!0):C.samples>0&&Q.useMultisampledRTT(C)===!1?V=J.get(C).__webglMultisampledFramebuffer:Array.isArray(Mt)?V=Mt[W]:V=Mt,Y.copy(C.viewport),_t.copy(C.scissor),Et=C.scissorTest}else Y.copy(ct).multiplyScalar(et).floor(),_t.copy(Gt).multiplyScalar(et).floor(),Et=ce;if(W!==0&&(V=T),g.bindFramebuffer(P.FRAMEBUFFER,V)&&g.drawBuffers(C,V),g.viewport(Y),g.scissor(_t),g.setScissorTest(Et),k){let dt=J.get(C.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+w,dt.__webglTexture,W)}else if(ft){let dt=w;for(let xt=0;xt<C.textures.length;xt++){let Mt=J.get(C.textures[xt]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+xt,Mt.__webglTexture,W,dt)}}else if(C!==null&&W!==0){let dt=J.get(C.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,dt.__webglTexture,W)}K=-1};function Ul(C){let w=J.get(C);return(w.__readFormat!==C.format||w.__readType!==C.type)&&(w.__readFormat=C.format,w.__readType=C.type,w.__formatReadable=S.textureFormatReadable(C.format),w.__typeReadable=S.textureTypeReadable(C.type)),w}this.readRenderTargetPixels=function(C,w,W,V,k,ft,Ct,dt=0){if(!(C&&C.isWebGLRenderTarget)){Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xt=J.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ct!==void 0&&(xt=xt[Ct]),xt){g.bindFramebuffer(P.FRAMEBUFFER,xt);try{let Mt=C.textures[dt],Lt=Mt.format,Ut=Mt.type;C.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+dt);let Bt=Ul(Mt);if(Bt.__formatReadable===!1){Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Bt.__typeReadable===!1){Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}w>=0&&w<=C.width-V&&W>=0&&W<=C.height-k&&P.readPixels(w,W,V,k,lt.convert(Lt),lt.convert(Ut),ft)}finally{let Mt=j!==null?J.get(j).__webglFramebuffer:null;g.bindFramebuffer(P.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(C,w,W,V,k,ft,Ct,dt=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xt=J.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ct!==void 0&&(xt=xt[Ct]),xt)if(w>=0&&w<=C.width-V&&W>=0&&W<=C.height-k){g.bindFramebuffer(P.FRAMEBUFFER,xt);let Mt=C.textures[dt],Lt=Mt.format,Ut=Mt.type;C.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+dt);let Bt=Ul(Mt);if(Bt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Bt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Yt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Yt),P.bufferData(P.PIXEL_PACK_BUFFER,ft.byteLength,P.STREAM_READ),P.readPixels(w,W,V,k,lt.convert(Lt),lt.convert(Ut),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);let me=j!==null?J.get(j).__webglFramebuffer:null;g.bindFramebuffer(P.FRAMEBUFFER,me);let re=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Wc(P,re,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Yt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ft),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(Yt),P.deleteSync(re),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,w=null,W=0){let V=Math.pow(2,-W),k=Math.floor(C.image.width*V),ft=Math.floor(C.image.height*V),Ct=w!==null?w.x:0,dt=w!==null?w.y:0;Q.setTexture2D(C,0),P.copyTexSubImage2D(P.TEXTURE_2D,W,0,0,Ct,dt,k,ft),g.unbindTexture()},this.copyTextureToTexture=function(C,w,W=null,V=null,k=0,ft=0){let Ct,dt,xt,Mt,Lt,Ut,Bt,Yt,me,re=C.isCompressedTexture?C.mipmaps[ft]:C.image;if(W!==null)Ct=W.max.x-W.min.x,dt=W.max.y-W.min.y,xt=W.isBox3?W.max.z-W.min.z:1,Mt=W.min.x,Lt=W.min.y,Ut=W.isBox3?W.min.z:0;else{let de=Math.pow(2,-k);Ct=Math.floor(re.width*de),dt=Math.floor(re.height*de),C.isDataArrayTexture?xt=re.depth:C.isData3DTexture?xt=Math.floor(re.depth*de):xt=1,Mt=0,Lt=0,Ut=0}V!==null?(Bt=V.x,Yt=V.y,me=V.z):(Bt=0,Yt=0,me=0);let te=lt.convert(w.format),De=lt.convert(w.type),gt;w.isData3DTexture?(Q.setTexture3D(w,0),gt=P.TEXTURE_3D):w.isDataArrayTexture||w.isCompressedArrayTexture?(Q.setTexture2DArray(w,0),gt=P.TEXTURE_2D_ARRAY):(Q.setTexture2D(w,0),gt=P.TEXTURE_2D),g.activeTexture(P.TEXTURE0),g.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,w.flipY),g.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),g.pixelStorei(P.UNPACK_ALIGNMENT,w.unpackAlignment);let Re=g.getParameter(P.UNPACK_ROW_LENGTH),Jt=g.getParameter(P.UNPACK_IMAGE_HEIGHT),Ze=g.getParameter(P.UNPACK_SKIP_PIXELS),pn=g.getParameter(P.UNPACK_SKIP_ROWS),Gn=g.getParameter(P.UNPACK_SKIP_IMAGES);g.pixelStorei(P.UNPACK_ROW_LENGTH,re.width),g.pixelStorei(P.UNPACK_IMAGE_HEIGHT,re.height),g.pixelStorei(P.UNPACK_SKIP_PIXELS,Mt),g.pixelStorei(P.UNPACK_SKIP_ROWS,Lt),g.pixelStorei(P.UNPACK_SKIP_IMAGES,Ut);let gi=C.isDataArrayTexture||C.isData3DTexture,$t=w.isDataArrayTexture||w.isData3DTexture;if(C.isDepthTexture){let de=J.get(C),Ln=J.get(w),se=J.get(de.__renderTarget),Pn=J.get(Ln.__renderTarget);g.bindFramebuffer(P.READ_FRAMEBUFFER,se.__webglFramebuffer),g.bindFramebuffer(P.DRAW_FRAMEBUFFER,Pn.__webglFramebuffer);for(let _i=0;_i<xt;_i++)gi&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,J.get(C).__webglTexture,k,Ut+_i),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,J.get(w).__webglTexture,ft,me+_i)),P.blitFramebuffer(Mt,Lt,Ct,dt,Bt,Yt,Ct,dt,P.DEPTH_BUFFER_BIT,P.NEAREST);g.bindFramebuffer(P.READ_FRAMEBUFFER,null),g.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(k!==0||C.isRenderTargetTexture||J.has(C)){let de=J.get(C),Ln=J.get(w);g.bindFramebuffer(P.READ_FRAMEBUFFER,b),g.bindFramebuffer(P.DRAW_FRAMEBUFFER,N);for(let se=0;se<xt;se++)gi?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,de.__webglTexture,k,Ut+se):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,de.__webglTexture,k),$t?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ln.__webglTexture,ft,me+se):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Ln.__webglTexture,ft),k!==0?P.blitFramebuffer(Mt,Lt,Ct,dt,Bt,Yt,Ct,dt,P.COLOR_BUFFER_BIT,P.NEAREST):$t?P.copyTexSubImage3D(gt,ft,Bt,Yt,me+se,Mt,Lt,Ct,dt):P.copyTexSubImage2D(gt,ft,Bt,Yt,Mt,Lt,Ct,dt);g.bindFramebuffer(P.READ_FRAMEBUFFER,null),g.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else $t?C.isDataTexture||C.isData3DTexture?P.texSubImage3D(gt,ft,Bt,Yt,me,Ct,dt,xt,te,De,re.data):w.isCompressedArrayTexture?P.compressedTexSubImage3D(gt,ft,Bt,Yt,me,Ct,dt,xt,te,re.data):P.texSubImage3D(gt,ft,Bt,Yt,me,Ct,dt,xt,te,De,re):C.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ft,Bt,Yt,Ct,dt,te,De,re.data):C.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ft,Bt,Yt,re.width,re.height,te,re.data):P.texSubImage2D(P.TEXTURE_2D,ft,Bt,Yt,Ct,dt,te,De,re);g.pixelStorei(P.UNPACK_ROW_LENGTH,Re),g.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Jt),g.pixelStorei(P.UNPACK_SKIP_PIXELS,Ze),g.pixelStorei(P.UNPACK_SKIP_ROWS,pn),g.pixelStorei(P.UNPACK_SKIP_IMAGES,Gn),ft===0&&w.generateMipmaps&&P.generateMipmap(gt),g.unbindTexture()},this.initRenderTarget=function(C){J.get(C).__webglFramebuffer===void 0&&Q.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?Q.setTextureCube(C,0):C.isData3DTexture?Q.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?Q.setTexture2DArray(C,0):Q.setTexture2D(C,0),g.unbindTexture()},this.resetState=function(){R=0,U=0,j=null,g.reset(),pt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=kt._getUnpackColorSpace()}};var Sh={type:"change"},Dl={type:"start"},bh={type:"end"},Ka=new Ui,Dh=new Xe,Vg=Math.cos(70*el.DEG2RAD),Ce=new H,ke=2*Math.PI,Zt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Sl=1e-6,Ja=class extends Is{constructor(t,e=null){super(t,e),this.state=Zt.NONE,this.target=new H,this.cursor=new H,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:qn.ROTATE,MIDDLE:qn.DOLLY,RIGHT:qn.PAN},this.touches={ONE:Qn.ROTATE,TWO:Qn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new H,this._lastQuaternion=new Ye,this._lastTargetPosition=new H,this._quat=new Ye().setFromUnitVectors(t.up,new H(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ki,this._sphericalDelta=new Ki,this._scale=1,this._panOffset=new H,this._rotateStart=new Ft,this._rotateEnd=new Ft,this._rotateDelta=new Ft,this._panStart=new Ft,this._panEnd=new Ft,this._panDelta=new Ft,this._dollyStart=new Ft,this._dollyEnd=new Ft,this._dollyDelta=new Ft,this._dollyDirection=new H,this._mouse=new Ft,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Kg.bind(this),this._onPointerDown=kg.bind(this),this._onPointerUp=Jg.bind(this),this._onContextMenu=jg.bind(this),this._onMouseWheel=Yg.bind(this),this._onKeyDown=qg.bind(this),this._onTouchStart=Qg.bind(this),this._onTouchMove=Zg.bind(this),this._onMouseDown=Wg.bind(this),this._onMouseMove=Xg.bind(this),this._interceptControlDown=$g.bind(this),this._interceptControlUp=t0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Zt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Sh),this.update(),this.state=Zt.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Ce.copy(e).sub(this.target),Ce.applyQuaternion(this._quat),this._spherical.setFromVector3(Ce),this.autoRotate&&this.state===Zt.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=ke:n>Math.PI&&(n-=ke),s<-Math.PI?s+=ke:s>Math.PI&&(s-=ke),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ce.setFromSpherical(this._spherical),Ce.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ce),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Ce.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new H(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new H(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Ce.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ka.origin.copy(this.object.position),Ka.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ka.direction))<Vg?this.object.lookAt(this.target):(Dh.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ka.intersectPlane(Dh,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Sl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Sl||this._lastTargetPosition.distanceToSquared(this.target)>Sl?(this.dispatchEvent(Sh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ke/60*this.autoRotateSpeed*t:ke/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ce.setFromMatrixColumn(e,0),Ce.multiplyScalar(-t),this._panOffset.add(Ce)}_panUp(t,e){this.screenSpacePanning===!0?Ce.setFromMatrixColumn(e,1):(Ce.setFromMatrixColumn(e,0),Ce.crossVectors(this.object.up,Ce)),Ce.multiplyScalar(t),this._panOffset.add(Ce)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ce.copy(s).sub(this.target);let r=Ce.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ft,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function kg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Kg(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Jg(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(bh),this.state=Zt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Wg(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case qn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Zt.DOLLY;break;case qn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Zt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Zt.ROTATE}break;case qn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Zt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Zt.PAN}break;default:this.state=Zt.NONE}this.state!==Zt.NONE&&this.dispatchEvent(Dl)}function Xg(i){switch(this.state){case Zt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Zt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Zt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Yg(i){this.enabled===!1||this.enableZoom===!1||this.state!==Zt.NONE||(i.preventDefault(),this.dispatchEvent(Dl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(bh))}function qg(i){this.enabled!==!1&&this._handleKeyDown(i)}function Qg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Qn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Zt.TOUCH_ROTATE;break;case Qn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Zt.TOUCH_PAN;break;default:this.state=Zt.NONE}break;case 2:switch(this.touches.TWO){case Qn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Zt.TOUCH_DOLLY_PAN;break;case Qn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Zt.TOUCH_DOLLY_ROTATE;break;default:this.state=Zt.NONE}break;default:this.state=Zt.NONE}this.state!==Zt.NONE&&this.dispatchEvent(Dl)}function Zg(i){switch(this._trackPointer(i),this.state){case Zt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Zt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Zt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Zt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Zt.NONE}}function jg(i){this.enabled!==!1&&i.preventDefault()}function $g(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function t0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ih(i,t,e){let n=new H;return{add(s,r){let a=document.createElement("span");return a.className=`al-lab ${s}`,a.innerHTML=r,i.appendChild(a),a},place(s,r,a=!0,o=0){n.copy(r).project(e);let c=t.clientWidth,l=t.clientHeight,u=!a||n.z>1||Math.abs(n.x)>1.05||Math.abs(n.y)>1.05;if(s.style.opacity=u?0:1,s.style.pointerEvents=u?"none":"",u)return;let f=s.offsetWidth/2+4,h=Math.min(c-f,Math.max(f,(n.x*.5+.5)*c));s.style.transform=`translate(${h}px, ${(-n.y*.5+.5)*l+o}px) translate(-50%, -50%)`}}}function Th(i,t,e={}){let n=()=>{let s=document.querySelector(i);if(!s)return;let r=null,a=!1,o=()=>(a||(a=!0,r=t(s)),r),c=new IntersectionObserver(l=>{l[0].isIntersecting&&(c.disconnect(),o())},{rootMargin:"600px"});c.observe(s);for(let[l,u]of Object.entries(e))document.querySelectorAll(`[data-lab-${l}]`).forEach(f=>f.addEventListener("click",h=>{let p=o();p&&(h.preventDefault(),s.scrollIntoView({behavior:"smooth",block:"center"}),u(p,f.getAttribute(`data-lab-${l}`)))}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n):n()}function ts(i,t){let e=()=>document.querySelectorAll(i).forEach(n=>{n.__done||(n.__done=!0,t(n))});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var Pe=i=>String(i).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),ee=(i,t)=>`${Pe(i)}<span class="zh">${Pe(t)}</span>`,ni=i=>JSON.parse(i.querySelector('script[type="application/json"]').textContent);var Fh=["straight","zigzag","spiral","internal"],wh=(i,t)=>i*i*t/3;function bl(i){return 1-(1-Math.min(1,Math.max(0,i)))**3}var Rh=(i,t,e)=>i/2*(1-Math.min(1,Math.max(0,e)));function Wa(i){let t=0;for(let e=1;e<i.length;e++)t+=Math.hypot(i[e].x-i[e-1].x,i[e].y-i[e-1].y,i[e].z-i[e-1].z);return t}function Gh(i,t,e=10,n=20){let s=i*t;return .5*(s*e)*s*n}function pi(i,t,e,n,s={}){let r=s.grade||10,a=e*Math.min(1,Math.max(0,n));if(a<=0)return[];let o=c=>t/2*(1-c/e);if(i==="straight"){let c=o(a);return[{x:0,y:0,z:c+a*r},{x:0,y:a,z:c}]}if(i==="zigzag"){let c=[],l=0,u=-1,f=e/8;for(c.push({x:-o(0)*.8,y:0,z:o(0)});l<a-1e-9;){let h=Math.min(a,l+f),p=o(h)*.8;u=-u,c.push({x:u*p,y:h,z:o(h)}),l=h}return c}if(i==="spiral"||i==="internal"){let c=i==="internal"?.82:1.02,l=[[1,1],[-1,1],[-1,-1],[1,-1]],u=[],f=0,h=0,p=i==="internal"?e/14:e/10,_=(B,m)=>{let d=o(m)*c;return{x:l[B%4][0]*d,y:m,z:l[B%4][1]*d}};for(u.push(_(0,0));f<a-1e-9;){let B=Math.min(a,f+p);if(B<f+p-1e-9){let m=_(h,f),d=_(h+1,f+p),x=(B-f)/p;u.push({x:m.x+(d.x-m.x)*x,y:B,z:m.z+(d.z-m.z)*x})}else u.push(_(h+1,B));f=B,h+=1}return u}throw new RangeError(`Unknown ramp: ${i}`)}var es=[{key:"africa",en:"Africa",zh:"\u975E\u6D32"},{key:"wasia",en:"West Asia",zh:"\u897F\u4E9E"},{key:"europe",en:"Europe",zh:"\u6B50\u6D32"},{key:"sasia",en:"South Asia",zh:"\u5357\u4E9E"},{key:"easia",en:"East Asia",zh:"\u6771\u4E9E"},{key:"oceania",en:"Oceania",zh:"\u5927\u6D0B\u6D32"},{key:"americas",en:"The Americas",zh:"\u7F8E\u6D32"}],Tl=i=>es.findIndex(t=>t.key===i);function Lh(i){if(!Number.isInteger(i)||i===0)throw new RangeError("There is no year 0: 1 BCE is -1 and the next year is 1 CE")}function Fl(i,t=2e3){return Lh(i),i>0?t-i:t-i-1}function Ks(i,t=2e3){let e=t-Math.round(i);return e>=1?e:e-1}var ii=i=>String(Math.round(i)).replace(/\B(?=(\d{3})+(?!\d))/g,",");function Il(i){let t=Math.abs(i);if(t<100)return Math.round(t);let e=10**(Math.floor(Math.log10(t))-1);return Math.round(t/e)*e}function Vs(i){return i>=1e4?`${Math.round(i/1e3)/10} \u842C`:ii(i)}function ns(i){return Lh(i),i>0?{en:`${i} CE`,zh:`\u897F\u5143 ${i} \u5E74`}:{en:`${ii(-i)} BCE`,zh:`\u897F\u5143\u524D ${ii(-i)} \u5E74`}}function Xa(i){let t=Il(i);if(t<=0)return{en:"the year 2000",zh:"\u897F\u5143 2000 \u5E74"};let e=Vs(t);return{en:`about ${ii(t)} years ago`,zh:`\u5927\u7D04 ${e}${e.endsWith("\u842C")?"":" "}\u5E74\u524D`}}function Ya(i,t){let e=Il(Math.max(i,t)),n=Il(Math.min(i,t));if(e===n)return Xa(e);let s=Vs(e),r=Vs(n);return{en:`about ${ii(e)} to ${ii(n)} years ago`,zh:`\u5927\u7D04 ${s}${s.endsWith("\u842C")?"":" "}\u5230 ${r}${r.endsWith("\u842C")?"":" "}\u5E74\u524D`}}function qa(i){let t=Xa(i);if(i>=1e4)return t;let e=ns(e0(Ks(i)));return{en:`${t.en} (around ${e.en})`,zh:`${t.zh}\uFF08${e.zh.replace(" \u5E74"," \u5E74\u524D\u5F8C")}\uFF09`}}function e0(i){let t=Math.abs(i),e=t>=2e3?100:t>=500?50:10,n=Math.round(t/e)*e||e;return i<0?-n:n}var dn=(i,t)=>i==="log"?Math.log10(Math.max(t,1)):t,ks=(i,t)=>i==="log"?10**t:t,mi=(i,t)=>i==="log"?Math.max(t,1):Math.max(t,0);function Ph(i,t,e){if(i!=="log"&&i!=="linear")throw new RangeError(`Unknown scale: ${i}`);let n=mi(i,e);if(!(t>n))throw new RangeError("older must be farther back than nearer");let s=dn(i,t),r=dn(i,n);return{kind:i,older:t,nearer:n,pos:a=>(s-dn(i,a))/(s-r),ago:a=>ks(i,s-a*(s-r)),has:a=>{let o=i==="log"?Math.max(a,1):a;return o<=t*(1+1e-9)&&o>=n*(1-1e-9)}}}function Qa(i,t,e){let n=i.pos(Math.max(t,e)),s=i.pos(Math.min(t,e));return s<0||n>1?null:{from:Math.max(0,n),to:Math.min(1,s)}}function n0(i){let t=10**Math.floor(Math.log10(i)),e=i/t;return(e<=1?1:e<=2?2:e<=5?5:10)*t}function Nh(i,t=6){let e=[];if(i.kind==="log"){let r=Math.log10(i.nearer),a=Math.log10(i.older);for(let o=Math.ceil(a);o>=Math.floor(r);o--)for(let c of a-r<3?[5,2,1]:[1]){let l=c*10**o;i.has(l)&&e.push({ago:l,major:c===1,en:ii(l),zh:Vs(l),unit:"ago"})}return e}let n=i.older-i.nearer,s=n0(n/t);if(n<=5e3){let r=2e3-i.older,a=2e3-i.nearer;for(let o=Math.ceil(r/s)*s;o<=a+1e-9;o+=s){let c=o>=1?o:o===0?-1:o,l=o===0?{en:"1 BCE / 1 CE",zh:"\u524D 1\uFF0F\u897F\u5143 1"}:ns(c);e.push({ago:Fl(c),major:!0,year:c,en:l.en,zh:l.zh.replace(/ 年$/,"").replace("\u897F\u5143\u524D ","\u524D ").replace("\u897F\u5143 ",""),unit:"year"})}return e}for(let r=Math.floor(i.older/s)*s;r>=i.nearer-1e-9;r-=s)e.push({ago:r,major:!0,en:r===0?"2000 CE":ii(r),zh:r===0?"\u897F\u5143 2000":Vs(r),unit:"ago"});return e}function Oh(i,t,e,n,s){let r=dn(i,mi(i,s.nearer)),a=dn(i,s.older),o=dn(i,t.older),c=dn(i,mi(i,t.nearer)),l=s.minSpan||(i==="log"?.6:50),u=Math.min(a-r,Math.max(l,(o-c)/e)),h=o-n*(o-c)+n*u;return h=Math.min(a,Math.max(r+u,h)),{older:ks(i,h),nearer:ks(i,h-u)}}function Hh(i,t,e,n){let s=dn(i,mi(i,n.nearer)),r=dn(i,n.older),a=dn(i,t.older),o=a-dn(i,mi(i,t.nearer)),c=Math.min(r,Math.max(s+o,a-e*o));return{older:ks(i,c),nearer:ks(i,c-o)}}function Js(i,t,e){let n=Math.min(e.older,t.older),s=Math.max(mi(i,e.nearer),t.nearer);return n>s?{older:n,nearer:s}:{older:e.older,nearer:mi(i,e.nearer)}}function Uh(i,t=.01){let e=[];return i.map(n=>{let s=e.findIndex(r=>r+t<=n.from);return s<0&&(s=e.length,e.push(0)),e[s]=n.to,s})}var is=i=>i&&typeof i=="object"?Fl(i.year):i;function i0(i){if(i.to!=null&&i.to!==i.from){if(i.from>=1e4)return Ya(i.from,i.to);let t=ns(Ks(i.from)),e=ns(Ks(i.to));return{en:`${t.en} to ${e.en}`,zh:`${t.zh}\u5230${e.zh}`}}return i.from>=1e4?Xa(i.from):i.exact?ns(Ks(i.from)):qa(i.from)}function s0(i){let t=ni(i),e={older:t.from,nearer:t.to||0},n=t.events.map((x,D)=>({...x,i:D,from:is(x.from),to:x.to==null?null:is(x.to)})),s=t.lesson?{...t.lesson,from:is(t.lesson.from),to:is(t.lesson.to)}:null,r=i.querySelector(".wh-tl-view"),a=i.querySelector(".wh-tl-read"),o=t.view?{older:is(t.view.from),nearer:is(t.view.to)}:e,c={kind:"log",view:Js("log",o,e),sel:-1};r.innerHTML=`<div class="wh-tl-axis" aria-hidden="true"></div><div class="wh-tl-lanes">${es.map(x=>`<div class="wh-tl-lane" data-lane="${x.key}"><p class="wh-tl-name">${ee(x.en,x.zh)}</p><div class="wh-tl-track"></div></div>`).join("")}</div><div class="wh-tl-over" aria-hidden="true"><div class="wh-tl-grid"></div><div class="wh-tl-lesson"><span></span></div></div>`;let l=r.querySelector(".wh-tl-axis"),u=r.querySelector(".wh-tl-grid"),f=r.querySelector(".wh-tl-lesson"),h=es.map(x=>r.querySelector(`[data-lane="${x.key}"] .wh-tl-track`));s&&(f.firstChild.innerHTML=ee(s.en,s.zh));function p(){let x=Ph(c.kind,c.view.older,c.view.nearer),D=E=>`${(E*100).toFixed(3)}%`,A=r.clientWidth<560,y=Nh(x,A?c.kind==="linear"?2:4:7);l.innerHTML=y.map(E=>`<span class="wh-tl-tick${E.major?"":" is-minor"}" style="left:${D(x.pos(E.ago))}"><b>${Pe(E.en)}</b><i>${Pe(E.zh)}</i></span>`).join("")+`<span class="wh-tl-unit">${y[0]&&y[0].unit==="year"?ee("calendar years","\u66C6\u5E74"):ee("years ago","\u5E74\u524D")}</span>`,u.innerHTML=y.map(E=>`<i style="left:${D(x.pos(E.ago))}"${E.major?"":' class="is-minor"'}></i>`).join("");let M=s&&Qa(x,s.from,s.to);f.hidden=!M,M&&(f.style.left=D(M.from),f.style.width=D(Math.max(.004,M.to-M.from)));let I=Math.max(120,h[0].clientWidth);es.forEach((E,v)=>{let F=n.filter(R=>Tl(R.lane)===v).map(R=>{let U=R.to==null?Qa(x,R.from,R.from):Qa(x,R.from,R.to);return U&&{e:R,s:U}}).filter(Boolean).sort((R,U)=>R.s.from-U.s.from),L=F.map(({e:R,s:U})=>{let K=(([...R.en].length*.56+1.5)*11.5+16)/I,X=Math.max(U.to,U.from);return X+K>1&&U.from>.45?{from:U.from-K,to:X+.01,flip:!0}:{from:U.from,to:X+K}}),O=L.map((R,U)=>U).sort((R,U)=>L[R].from-L[U].from),T=Uh(O.map(R=>L[R]),.012),b=[];O.forEach((R,U)=>{b[R]=T[U]});let N=b.length?Math.max(...b)+1:1;h[v].style.setProperty("--rows",N),h[v].innerHTML=F.map(({e:R,s:U},j)=>{let K=R.to==null||U.to-U.from<.004,X=!!L[j].flip,Y=X?`right:${D(1-(K?U.from:U.to))}`:`left:${D(U.from)}`;return`<button type="button" class="wh-ev${K?" is-point":""}${R.kind?` is-${R.kind}`:""}${X?" is-flip":""}${c.sel===R.i?" is-on":""}" data-ev="${R.i}" style="${Y};--w:${K?12:Math.max(10,Math.round((U.to-U.from)*I))}px;--row:${b[j]}" aria-pressed="${c.sel===R.i}"><span class="wh-ev-bar"></span><span class="wh-ev-t">${ee(R.en,R.zh)}</span></button>`}).join("")}),i.querySelectorAll("[data-scale]").forEach(E=>E.setAttribute("aria-pressed",E.dataset.scale===c.kind))}function _(x){c.sel=x;let D=n[x];if(!D){a.innerHTML=a.dataset.idle||"";return}let A=i0(D),y=es[Tl(D.lane)];a.innerHTML=`<b>${Pe(D.en)}<span class="zh">${Pe(D.zh)}</span></b><span class="wh-tl-when">${Pe(y.en)} \xB7 ${Pe(A.en)}<span class="zh">${Pe(y.zh)}\u30FB${Pe(A.zh)}</span></span>`+(D.note_en?`<span class="wh-tl-note">${ee(D.note_en,D.note_zh)}</span>`:"")}a.dataset.idle=a.innerHTML;let B={state:c,events:n,setScale(x){c.kind=x,c.view=Js(x,x==="linear"?{older:e.older,nearer:e.nearer}:c.view,e),p()},zoom(x,D=.5){c.view=Oh(c.kind,c.view,x,D,e),p()},pan(x){c.view=Hh(c.kind,c.view,x,e),p()},fit(x,D){c.view=Js(c.kind,{older:x,nearer:D},e),p()},all(){c.view=Js(c.kind,e,e),p()},select(x){_(x),p()},draw:p};i.addEventListener("click",x=>{let D=x.target.closest("button");!D||!i.contains(D)||(D.dataset.scale?B.setScale(D.dataset.scale):D.dataset.zoom==="in"?B.zoom(1.8):D.dataset.zoom==="out"?B.zoom(1/1.8):D.dataset.zoom==="all"?B.all():D.dataset.zoom==="recent"?(c.kind!=="linear"&&(c.kind="linear"),B.fit(Number(D.dataset.older)||6e3,0)):D.dataset.ev&&B.select(c.sel===Number(D.dataset.ev)?-1:Number(D.dataset.ev)))}),r.addEventListener("keydown",x=>{if(x.key==="ArrowLeft")B.pan(-.15);else if(x.key==="ArrowRight")B.pan(.15);else if(x.key==="+"||x.key==="=")B.zoom(1.5);else if(x.key==="-")B.zoom(1/1.5);else return;x.preventDefault()});let m=null;r.addEventListener("pointerdown",x=>{x.button===0&&(m={x:x.clientX,moved:!1,id:x.pointerId})}),r.addEventListener("pointermove",x=>{if(!m||x.pointerId!==m.id)return;let D=x.clientX-m.x;!m.moved&&Math.abs(D)<6||(m.moved||(m.moved=!0,r.setPointerCapture(x.pointerId),r.classList.add("is-drag")),B.pan(-D/Math.max(120,h[0].clientWidth)),m.x=x.clientX)});let d=x=>{if(m){if(m.moved){r.classList.remove("is-drag");let D=A=>{A.stopPropagation(),A.preventDefault()};r.addEventListener("click",D,{capture:!0,once:!0}),setTimeout(()=>r.removeEventListener("click",D,{capture:!0}),60);try{r.releasePointerCapture(x.pointerId)}catch{}}m=null}};return r.addEventListener("pointerup",d),r.addEventListener("pointercancel",d),r.addEventListener("wheel",x=>{if(!(!x.ctrlKey&&!x.metaKey&&Math.abs(x.deltaX)<=Math.abs(x.deltaY)))if(x.preventDefault(),x.ctrlKey||x.metaKey){let D=h[0].getBoundingClientRect();B.zoom(x.deltaY<0?1.15:1/1.15,Math.min(1,Math.max(0,(x.clientX-D.left)/D.width)))}else B.pan(x.deltaX/600)},{passive:!1}),new ResizeObserver(p).observe(r),p(),i.__tl=B,B}ts("[data-wh-timeline]",s0);var Za={source:"Natural Earth 1:50m Land v5.1.2 (public domain) \xB7 naturalearthdata.com",q:.05,polys:[["ghHlURTADQKAJVBHEHHLDDIDAEIIBGGYK"],["gzF9ODNMNIfBLIXIDUIIJaRBVIVANMTGAKdDXMLBLEFePKAONoBVGHFCBFUVKRKhBECGFAKCGWPCIGJEhBMNcLMTMHIPKJAJKJBNAjBUpBAPAHJRDXHZDjBPXDPLJABNFNXFDANHBGBPRBTJHNZJnBAbRHxBDNDpBbZDGFECCHDDJMHBFKPEGGBGHANJJGIAIKHITJKBrBXrBQdGDFHCPKNCJGXaBIEQDMLOTQKEEDAIfJLCMYAKPYPnBfDEOQAEeSWDQGEHUAHNPHRfPVXCNFGFDNMHCEEKDJaLMHQPEHQGAAIXORARKVBTMVINDpCDhCV3BBtBXTDPXNLLDPEZDDGZA9BDHFHJVFdTLB1BCTIROVIAeIFGAGEIODWGKBcXuBJ4BbqBDehBuBEBCGKRGBEEAGJKHQCEKJALGGGLEDEEASf4BEYKSCUDKMeECCBAXKGMWeMWScQcBgBMWGOKUBiBIWKOMUgBUQHWEQSOKOYpBCSKBAINQGEBIGAEHIGKFSANEAGICCKBCDFDICKEAGKOHAGFABGIGMDCEFCBKEEMECKCBBJGEEFEEEQBEGACFGGGFKIAGECWLebFXEEEBBKQMSFGJCMIDIHAMIAJIEELGMQGSQKDGAIGCEIICAIKDAIGAAGIAEGGJYAIEGDEGICBCAQFGRCJGGEIDIEOLKEKLcFUHOCMHGAcOHNMAEHGBEGDGMICHMDCDPRCHFJFENFAZBHTXCFeTEFQFEHIAcNWReHKRgBNSEOIW2BKoBFYEMFOIWBMIGEABIFEAGGOEBIsBMKGBBDGFGLAT"],["8-G1VMLCRbFZGBKKMMGQE"],["otGpZKBeRST0BhBAHHDLG7BmBfgBDO"],["2_EiBGACIIECKUGARPHBFOHEHIFjBKDFEVSZPINSAWFMCKFMIcQOFNEFANNN"],["w2Cr9BQGCFJDGBeIIBCDFJJEPDKFKCCBHDlBGBDJBBCCIBIEEFEEIIIEHDF"],["mvC8kDhBEYGoBCIIiBBKDCDjBH"],["uoCkkDXCFKHCEC4BBeDhBB"],["5f04CADEDBBfHPE5BBOIAIEAoBAgBG"],["2nGxLIHQCMHGJFDhBIHMCG"],["0yEyKDDCEEKWWIEsBuBESIQCBANGRNFFLPFBFLT"],["k5EwOOAEBBDKEBJLLBHfNGwBHGACGC"],["-5EqLFAFKLIFMCGQGBQIQKEKDCDPlBAJGN"],["27EmOQAEFBPGFENDDFGCLJEBeDCHBFY"],["y8E2PCJKDDJCNCNIHDEPALOCKVQDKBG"],["82E8QUBMLCTFNFDNMJaLKCE"],["-iGrIBDHBNGFGAKROAUOFOVOJ"],["m_F9FBDFIDUNWxBeLEECAGQLgBPmBhBGJ"],["mtFpKJFZASiBIESCKLHN"],["miFxDKFQAGFMPBLlBUNABDXINHNMJNAMMOgBAGDOG"],["y-E7DIBILAHLDPATOCM"],["w5E3KtBLJEBDLBTGRAHBDGCMeGiBNUGOHWOCEFAEEGBAH"],["g2E1LMLKBKJAFNHLEVSVEDGKEYAGE"],["6zErKOAEDKEINBDLCBBEDPABIHHbFRDJECSMIQDKJGBMGRKBIOC"],["6xE3KFHEDNAPEKCBMOKMF"],["qwElKKJNHHJDMRGFKUBIG"],["ykEhCMfSDHNCFZKHYZGIKEKGAEHAIIC"],["ocopCOAOFVHPBHJFAIILEEGFE"],["gboiDSAKNcASDLBBDoCJdDPHlBFNAAGKElCDDEOCSMXGTMACLE"],["2tCilDEBFHpBHdEZBNEEGMG"],["q7BilDoBBKDABnBEPFtBFHEpBC"],["8-BmlDUBkBHdFrBBJDfBDBKBCDxBBDAOEDCjBBNEyBKwBBECBGEE"],["6-Bw2CBFDERLdDRCFKEMWGMA"],["yrCu3CAHdBHGVCTOYI"],["q4Cs7CdAEKOGaAaL"],["8zD0jDVArBMsBCiCF"],["4tEg9CXLbCXIQAII"],["owFw8CXDHEDIiBCGD"],["6dusBMCBDKFOCgBDKCCJUIFL1BBDGJChBEBMEBEG"],["od2wBEFaFGRKBCFJALQPCPONCOI"],["irBwsBTLBDGHNBLHNDBDVIFIAGYECIaB"],["8XqoCLFAHEDdTGIHGCMQMOC"],["2P4lCAFNHIFLDBPHBHSNAHQDEMCGIIACHEBGIDCOGQB"],["qNwlCGLAFHDXEFIAG"],["-D4xBMDHLHDJEDGHBFCWOMC"],["12El8CMJdFAHzBBZEACICFEMGdEOI"],["99Ez7CYDUJXFiBBSEUFDBOFBFxBCtBMNKXBBEHGIG"],["1yCjkDdIDEfKoCBGFKAEH"],["poChwCOEABKDCDHDEBPCHDBEJBDCMCFCAELAIIQE"],["_uCxwCDDSAjBLTGeSKB"],["j8Cp4CGBFDrBH5BFJGKGsBEIGOHII"],["39Cl3CWHHHXAVEEG"],["z6D75CBHKAEIIAGDFDKDUOeBHFbFMBsBICHBFTBCF9CCnCMnCCLEGEuCGQHwBMQB"],["98Cr7CLHMFHF1BKHIIEYARGOEqBDGD"],["_0Cp0CfLNKeaWKGDJFAHKDVH"],["z_Gw5CWBiBNLF1BDhBCAW"],["xpChgCQBCBDFKBAGOAEDFDGBBBhBJCFVEGFLBBDFCDEEIUKBI"],["ruBxjCQBEDBBMAMLGAAFEBLDPOPGdIBCECPCYA"],["l8Cl2BNALEIOGsBUDGLFDEFNFONLH"],["rrCpgCkBEGDZTNBJHRGcMNCOCLM"],["j9Ct9BARCDFLFAFKIOJFDLTCCIGBCGFGOEDEKIBGECOA"],["n7C_3BJBFEBEIMSF"],["ntCs9BxBETIJIbMOC0BJqBPEF"],["rsCu5BKCHDEBDFMCMILASOCDQBDFEBfNZBFGBKEIWaOIEACJFT"],["p2GyvCYBQEkBNiBBFFTANHDGpBOfDFGCI"],["1vGwrCQDCJEFTBBDnBKLIYAOI"],["rsG4kCEHMFJEJDRBVHHADGQOcG"],["xgDiXkBLGJLBNEDDFCDHFGPCLKJCBGUG"],["1yCiXUBCFNLxBCCIDGEG"],["j_FooCSCBFMDHFVCKFpBLEDLHDCKILACEHCFBIDFDNSGISEQNFOGAHGCCODMCCGMB"],["v-F-oCECODFFFEBDLANFREQIKADE"],["3jFslCHLHEBELJBCBIIICKOEKH"],["9mFumCOBEHUHSPNEFFKCKHBDIAARVIBIHDLMGCFECEJAPIMAGEDGPDII"],["1mFonCOBCJDDLKINNBFCBMLIGC"],["1oF2nCOZDTLMEIREGKJIHHFBAMOK"],["roF2oCSASTPODCCFMLCJVLFEEOFGLc"],["1pF6oCGDDDEBKEQDAHPBOBGDDDXGFJHCHIRMKKGDCE"],["1gFmiCCRHHBSFDLOGMQH"],["5lF2jCOBGFBDNHOCCOUENjBTBJEMCPGHMBICG"],["1kFwiCELLAUHFDGHIABDGABFlBaDGECPG"],["3vCi6BEEWFoBEGDVHAHRCECFECEJDCBREDGNCBGJCCEOMDJ"],["z6CozBDDEAYGzBPbDEEJAUKkBEQG"],["89FrFIEMFBRNJGLBDJDNAJNfNfBJILAdSEIkBFUEECGSCBDJGHcCSUMCBc"],["k_EvKfTrBPlBhBXHJEEGDGEOMKkBQMMYGgBCOG"],["q1F_yBKCoBPQCGBAEGCSAGGKAECKBEDCxBBBDIAEHLDPETHBFIGCJEDHFKCFDJJCEFJLLETBBGIENANOLcKJCGFIDBAITYDQCO"],["24DslDIFsBHABdDBBOJHBtEJvCKFE2BKQIZAeKiDK"],["i6DmkDOFNFADQGMAKGcBeHJFDNZAiBLRFrCAdGnBAJEVBNERKtBEuCYMBIC"],["0gEijDTPWIiBEiBLUBGFAFVFtCF_BArBJfEcMQQWCDEIIUGCEaDBEIEaD"],["ivF6-CeHGCCKUIuBLqBAiCLVFBBGDjBHhBCNGDICEKEBCZAHBEJQJWHbFRIlCFVENJJBnBGrBSAEMADICISAHGGEuBI"],["4xFs8CuBNEDAHpCClBGbDJEcCcO"],["w3Fm-CiCCCABFGA8BBSDKCHJdD9BA1CQMOMB"],["y4G1rBIEADaHCFGCMVHAQTBHCDDJYFEHGABUDGCCKJCAOjBuBNMESOWFLhBJFDVDGLCPFFNGDJThBpBbPFIJABIDFDCUcEMDIFGpBSHIEGWIIGKgBBEGENcGDIEFGLALSIDAONGFIKRBBbiBKKJHLMEITWOADD"],["s4GzzBiBQFNIIACMAJJMGLNEDBDIDrBxBXJGDHDGAEFKDAFVAEEDAHDJGGHlBNCBFXFAEFPZEFRFZVXDbCHKNALIHDTAFEIIFDDACGHBAGUEHCIEJACGEABEMDBEGAHEAEIADEKGCDCIMGEBBGUQcKGBBEcKAEQMGBDEGCGBDEGCEDIOEFAGKKBCKYSKMgBQKMAHBBDMH"],["w9E0LIAENFNIDELANEFCRFJJFAVPqBDDLVIJCRLPDGAMHHDCdODGDYIQJKLGFADPHGDGDFFABGHCFDLbHABKOeaIGMQKKDGFBPQIIOOBEQMDCIMBDaCESJ"],["s3EoXeLICEGEBCFDJBPKREDNjBVJALHNMVBFERGFMBECDGSGMDGRIEAIUHAFJBKPAFOBDTFGCILANGFQVSFAITBHHMXSLDFHJCJIHDBQMMCGNKAPFBHOFCN4BEEMLICBWGeDKKiB"],["6mFdUAGDBFINFNEXKVCKGCCPGCCLIFQAeeGOaGECBIgBOsChBgBDGFSB2BVmBJWNSBYTKBQPAX0BTOBQNAPbAFFADMTkBZERIFGNYACReHJDEHUHUBHDHCIHNFLCJKvCMdaBGAIDBHGXiBrBMDGNEBFLBTMMTDAADNCEHrBDFGFBGAEFOAMDMLBHbPPIrBBtBoBEMFHVDFILJDEKWNOSCNCJIKEPUFQCEFCGEJABKdUDBXIXKfETOAGIAZADGHAJMAKGIFBBJFBDTFFLBHQEGDKPMNGBCMESDUOUFCGGCAEDAEIlBFZALKBSZGLAIKCMWGOKOEOB"],["k8EoBRVbFTCJGvCBPEJDFHHRCNILKHGLUASUODOIYABEMEKDCFBHTEZZPFHHLAKJGDOTIFELFPSTGCANFCABXFBLREDGEUbYGOAQFEJAPLIdDPCTDVGRTAJDFEHMKgBASFWRBFGBcMIIWAWIUIIGFFeGGBIEIOUGDIAKQKEMDIHiBBQFIEkBDYQCGQMGBEF"],["mmEvHMHcDOTmCFQWEBKJOCWJSBEJGDAJIDUBWCOFAXIN1BSVDvBEjBGVKdIVCLFJAjBOhBEBEEIVIbAAEEEGFGOGACOKIeHII"],["04DyGqBBcfCL6BjBenBQJBMIASVMDIFQXWHEFBDRHOESIMHGJNJBFEDBFKLaFGdOLHNAFMKSBIDSXHTEJDLChBFfPKJHRKCPDAdgBzBmBPWVSbkBBMVsBZkBTMV8BjBUDUHGRYTInBqBJSEMSAQL"],["gyEsIADECKMEACJMHEFBNFDUGEHFBADQEKHaJAFDDTFPCBFONADVFLEHHMRFBFEBDPBMFAJKFBDGBBBGDKRJJwBpBRHNCLKCHHFJTBVERZRFGALRREAAJDDKBAHADJBCNHDEFLRxBVFeDDDCAIDDFCPFDKJBLMDJHDFDLERJBUDGBDLCPDDCCEHDFELBFmBFGEMBMLMPECIHIEULMBSCOIEFAEKMQKGILUBiBLFGIYBKKACO8BQkBsBEOQCYOCDQCGKHIIIGBGCiB4BEB"],["20Cq_C_HlBZJPBIDdFDFPEHHTAEHBBhBJEFDDREKHXLLBhCGbDFGCCRIkBIcSgBEVGkBMTCHEECaBOGBEeAIGMEBCwCOKEaBECAGGCmCB8BG0BIMGgBGgBEiBBSJBFdJ"],["klC07CuBDJFDJPBDFHBBFGHHJuBhBwBNTFdGFBMDDBLENBDEpBCBBjBELCICAGWEdIDCEG5BDNEFKAGGEaEOGMONEOGSADCBGCE-BI"],["uyFgkCKJDNQhBANFJCPENGFOtBWrBONAHFKTOLCZDVtBALQRKTMBEPFLFUbGHFLZFEDSIcDSKQBMLSMgBDsBGWTWECFGAMIWBWOGGDKCCEDCICAKNQ"],["4zFk3BkBFaQHTAHINUENJXFbBJBTTHP3BYRBPHLIHAFJgBTFBNCPNHACSJQAMYOCEDKeDIECOKOEUCIHSCKMEmBhB"],["ywF2zBICAbOPITANDNJFDHDNNBFHCpBJNHTMVPHDLTLAQKMJCHJEFBDJGHADFBLJJDECKEEHCDAPTZCTBKGNEAFDCCMDAJNOJBFTDRZHBJCLSBMIEEINCLETBLFfJTBNCFRPIhBBAKEGOA-BsBsBAuBKEBADEBOBIEIGDKCEaaASGISECBRNEJKDKIgBKOKKQSKGQMQKcBKJCGEEKBQOIEQKBENIEGBGEAIRBAEGK"],["-nF6qBMAERNHHNJILCNFLTHDFACGHABGCKDCAENDYOGMGEKFQCAKOE"],["-jFgqBWAFNOABFGHNRLpBLCCHPJEKDOEEFADFAFEFBBPEBEGCAGDGAOIEKQFCCILODDCJGAAFLCLHEIFGAGMHPQAEKBAGUIGIIEKD"],["o3EocFZDAFQLIHWCWkB4BWKONFFCJR3B"],["0qEgZENHDFJHVPLVJfOBeaSDACGkBGSBCG"],["gkDoMKASRWhBEBCLShBAPHRlBRRAFGJcF2BCECJGiBGMAQODPG"],["-9BxPQXInBEbIPBTHLHGDOJBInBDLFFFLCZFR5BjFN3BNlBRNXDZLPALIRELKPcAWCIFSHMDQCSIYMGY0BCSHOAOHSBkBQcEUQCMIGDKCEISCKFBIGISMEJCAAMKQECCLKOIAFEBIKQDGCGECIDWSEQDQGAKO"],["5mG3jDxBB9BGpCKXIGKkBMiBBsDZaL"],["93CzjD1BGDEGIIEkBK6DWeBjDfRJCBDD"],["v4BviD8BAGDYbDLbDKDBDhHRVFvFBHEAImBSOBYEGDsCaECDENCKIAGKEFCIIsBW6CK6CJgBJBJ1BFFD"],["1qCtkDDPdHxCELEHGjBBHDjDSOEQHuFCSEPCDIQABEeGeBGDDHUD"],["x3Cv2CBDQAMLMTgBfCjBLNXLBD1BDnCARCLIOEsCBaENErBDJGiBCKGnBEVGXJhBCKFRFfEXICIKEcDBIICeHECHGGEyBBfGBCOEoBDUGgBCWHBKnBELGGEcIeBdKdBZGFGGUPIEIIC6BGMF"],["t2C5hCOCKDMPHCBHOBGJcTqBTqBFJHpBFjCKjBDPCHGNDJCHB3BIBCGEIBKEKBMEEAAFQBVSAIIEBCGEGNJAQNUCQFCDKElBOFICIeIBGfBJICGKEJISBSM"],["pmD-cYAEDUCMFWBBBWRYBqBVGADEEBOHHBEDGEKHABuBJEDBDCBFBCDgBBQJODAFlBJBEFDhBE9BFGKSMFKhBEPMDOFIXAjBKJKVBFIDFVEJIQEAEFCjBCZTTBFHRFAGNDBCWGAOMKgBMuBK"],["kaqkDaAeHGGAIWCMAHJ0BG6BFoBBMDCFvBLNHjBBfFpBCHEGCvCAlBGFCeCMEpCAZEBEYElBEkBCWDICNIWDCEHEeB"],["gV8jDQCaFEDJFBFeIQFAFDBQDaAGDKESBGBJBkBJjCFVHFFAFVBDNDHZDRNEDJFCFNBtBMRIdGNKQEMBIG2CEFEvDFLEDIKCODBC6BIBCGCwBAGCPALEOG3BHFGGGPDLCJACDBDIDVFlBA3BSAEECTEqBAPEDEIEDCPAADDBLAROCGDESBWEYDDEEA4BCIBDDxBFgBACBWFECAIWIKBkBXYFRUBIKIAEGC"],["iMkzBGPFJCJFhBTEDLLAJKAMGOFCCQJOAKOBcQOJBB"],["8Lw1BCZNdPIEEHCCIFAEGDCEGFCKKUECMEA"],["wT4vBTdIPHHAFXEJKREjBQJCHIEKIGGFQGUH0BGQGGB"],["9hCu3CcFGHHD7BJXGWCFElBCFEEKUAVIGEOCqBD"],["_-Eq_BkCNadiBNUXEEEJJFzBOLGMKCGFHVBNGIELCAGXAAIQCPCNKHBFKDDDEPAAGDCCEQBCILAABLBLICEQC"],["95C0YICIGYAeJKAINUBNBADkBHMJCDNNJILCTAdJFGPDPXHEBKNKhBDXEJBFFVOCIgCFSGRSEQbIAGUG"],["h-BJWEcFFXLNAFHDDEDHJEDHHDJERDJWAEGCDADIGaQG"],["7DkpCDHfNBDIBLHeE2BAKJfjBbHQCKDABbHRCeFSESFUNQhBYHWPDDMPNGPBOAWNEHLJKDKGUAYHELFNNFADBBRBGBAFTDoBDAFNFDDdHnBAXGCDFBVAEDDBlBEPBLPTGVDNJTABEeQMKEIICEGqBAcWhBNJANINBGELETDJEDGCCoBOIKDCAMXDSOUGQCKDBGECGFGALIEKDAAGGCCILARQGIQITAPFLCJDLEDFFCDKEAOUHICGKEJECERJCGEGLHAJFNHBCKIIDAAKQcRHTGQGDCKICGJGACIEFEGKSAJGCIOADGEGWBwBGIA"],["_I6kCKGgBASPHFMAGFBBFEAFEBBDdJIPEZFPJHGDXDBEBDVBTJNCCDBDjBHVAKITDUKdBBCUKTCCCYCFGKGiBGHCHDbDSKCEBCGGOEVCFEJAECLAAGQCHCAEMCAELBCKJCCE8BABEOGEGXCOIAEGGYEEFDFGEAIICACOD"],["3gHm2CmBHMFHCCDYFCFKERIcJBDMAuCTEJDDOEGDDJILFHQBEHMECHMITIKGDGRGiBCWDFDBDEACAAGcBTEwBD0BXDDMCEDBBSACDfHAHDBdIOJDBdAVGNCSHBBGABFNBOBEFhBHKBDFQDEDNBFGAHJBJCCIPHfOjBEPIAKJIlBGRDjBAFECGRMIBIQLHJCBGHDAFNCDLSJAFNLLFA-E"],["tT6yCmBGLDHHQDADFFSCEDFDMCWFHFGBDDIDBBJBAFHDNABHHFvBHfNtBFFFbF9BGLGGCBCJBRI9BDBKIDMCeOXDGEDACEOGTDHCCGHCjBARBJEyBIkBAEGJBRCaKpBGnBHXGKCQBJKUDMCVEOCLEOAFEGEQDCDOCCHGCAGTGSCXEIESAqBPDDIBBFLBMDDFIBEFOQODEGAOGCcNEOWEcRCEHMQAOHQKMBOCCEDGMCKA"],["v0C7lCJCMA"],["_6CwXADLEHG"],["6U41BWDNA"],["gVi2BPCIEKBCB"],["vCy9BJBCC"],["9wCoWCBEADBHAAC"],["1gDofHCICEB"],["96GtaCABDHG"],["kuB4fNIAE"],["w6EjCDACI"],["k_Fk_CDAJCEAGCCAAB"],["m0C-2CDDFABAACGE"],["mzCm4CFCCG"],["gtGx9CJCAESE"],["iuGt0CHCCKIF"],["yxG1hDJDrBBHCDGiBDaI"],["ksGvzCBBFGGA"],["8wGzgD4CFCBhBHrBCZHVOSEJGECUA"],["q0G_7CNCMKGH"],["2rGt-CFFFABCECGCCA"],["o-DjyCRALEMIOAOF"],["orD1zCFBNIUCGF"],["4zDnyCNCKCGB"],["msDtzCLAKCGA"],["2qDnzCLAEE"],["s3C75CDFBABECCCA"],["y1Cr6CIIIB"],["44DxyCOACDXBDAEE"],["g6Cp4CNGAGGEKJ"],["orGjzCDAHEAG"],["q9D3yCDBBCCCGCAD"],["y7DhzCDBDCBCGCIB"],["ohE5xCHADGNGQBCF"],["x1Fz-CjBGQC"],["n3FlgDTBAGiBBEB"],["vlFh9CFBLCACMAIA"],["35FngDZABEgBB"],["16F7_CqBBbDRE"],["5jFn9CfCLEQGeD"],["t1Ez8CNAKEFIYAMD"],["9xE18CZCoBKKB"],["l_En9CVCHEBEkBDEB"],["v6F1gDKBTCHCGCEBGA"],["vqG7nDpBAdK4BBeF"],["57F__CXCaCEB"],["r3Fp_CHATISB"],["v3F5_CDBREIC"],["xoG_lDrEIeEeA8BF"],["_7F1gDrBEUC"],["tgGhkDnCIEE"],["x6FrgDvBANEmBG"],["vlGzmDnBMuBJ"],["rHl4CJBLGUC"],["6Dn4CNADCYGAD"],["1D_4CNADG"],["0B53CFFHMSCCD"],["lDt4CSBJJRDAGHGVGUC"],["2Fj4CNCFGSCED"],["28BvzCJCOCED"],["oUv3CBBXIOEaCJF"],["yhB_3CTBNEBEOIMB"],["7mB3jDKCCEwBJfD3BGHEME"],["tqBjjDpDACEoBE"],["jEl4CHCOIOAEDBD"],["3Zr8CBJKFDHLCHIFEjBCkBGMKGCIB"],["jU76CHAHGGE"],["zPl6CHBJGGC"],["toBxjDJAIESA"],["j5BzrCSFEDfGAC"],["xjCzsCFCIE"],["h0CpjDzBAKGYEaBHD"],["9kCvsCFBFGCCeB"],["tlC9uCQBCDBBbCVFDESI"],["5lCtvCPEUCCD"],["xnC1wCHAAEWE"],["voCrtCKAEDTBBDJADDRCMI"],["vtCj3CDBRWMASHADDB"],["jvChxCJBOG"],["9tCvwCRDMKDGGEQFFH"],["nuC5uCBAEGKCBBBB"],["nqChuCFABCBCGAEACB"],["hmC7uCLBJEECSA"],["3rCluCeBNFHGZDDEOE"],["1nC3vCKBJBNE"],["tsCv3CJCKC"],["9rCr4CFABGUABD"],["1rC54CPEOC"],["zrC1uCJAEC"],["5rC5vCLAGAEIGB"],["9xDv7CNAGMLMOCUBAFDBEBAF"],["1iEt7CNBJIIC"],["52D56CFAACaGEF"],["z5C53COBNFDG"],["_5Cj3CfCFEEEQA"],["r8C17CJCMIMA"],["pyCpyCNACEIIMAADFB"],["nzC3yCJDCIIA"],["l0C10CNABEUCEB"],["l0CzzCJAGGID"],["9gHjVBEGECB"],["ziDqKBICA"],["whG09BHAAEIKEA"],["kqC0lDbCUC"],["gkCykDXCEAAEUB"],["usCmlDrBC4BEEB"],["8iCokDzBCoBGaF"],["snCukDAFDFzBCMEAG"],["0qC-jDfCaEOD"],["r-C98BDABGGKBMGCKRAF"],["j-Cr_BBBDAAKOA"],["_8CjiCeFULPCLIPARO"],["j3CzkCgBDSCCDHDMDBDKFCFLGTCBILEDABFGFHAJGACNEEK"],["79Ch9BLLJBGEFGCEUE"],["jrCngCFABCACGCEBBB"],["mjC6PSAMDNHRBPKKG"],["2iCqeFCIE"],["spCoZBAAGKOCH"],["omC0hBJHVDDCSGAGSCEB"],["ujCoeLBIE"],["w0B8UCAAEEDAFJGDGCG"],["myB0TKDPABEEADCAGGB"],["o_BsgBBDDGAMGA"],["s8BglBDADIEIGH"],["yyG_UJABGCC"],["syGtUNEIG"],["yyG9VGFDDNEEG"],["8xGpTBBFABCIGGA"],["uwGxSCLMIETDFNBDKDaCE"],["oyG9TBUER"],["oyGlTBBAEBMCACH"],["oxGjUSNPDDQHCEI"],["8nG1KlBUTUMBOLOFQLBB"],["8kGlJBDNGZaYJGJ"],["u3E0HKDDFPEGG"],["79C57BFECAKC"],["h8C_3BFGAEGB"],["l9C38BNBNYQIAFKN"],["1wCrkCeBhBFDC"],["rtC9wBADHG"],["nsC3gCEABFHE"],["j7C7iCADQAMHHHRFDEIILABFDADCAIVIGEKCODCE"],["7zC9kCJFFEJBLCJIqBA"],["34CxkCIDQCEHHDDENCJGHBAE"],["j0C3lCJEIE"],["l9CjgCBDRAJJGOWE"],["59C7-BPBEOSDCD"],["v9CxgCAFKFFNFCJS"],["n8C52BFBHC"],["n5CxjCQBAFFDLETBJKIG"],["18C9gCHCFG"],["l8Cv3BJDADGJEPNDAGTWECAGQCAIECMD"],["78Cj5BFBJAAEIIAGIGCR"],["97C64BPASK"],["j8Cg5BDBBAGEGC"],["rtCk7BGBJAEIUI"],["n1Cu3BDDDCEG"],["quE7IbDPGEGsBCGF"],["1kGqCGDBANGGBEEDEGD"],["3tFjMGBHDDE"],["z6FjWEBADFEJABIKC"],["hvFjLFBBGIA"],["t3G5QGJADNAJM"],["p2GxRRCFGSB"],["n0G7XDBBECCCCCD"],["ooFoJBBBIGG"],["-0FyQDIKGCB"],["k_G1XVFQG"],["wxG5RFBBEEC"],["sxGrRDEEECD"],["8zGtYBDDCFECGEA"],["2zG1XNEAIGA"],["gyG5aGABFFBFKIC"],["oxGtaNGAEGEFEKB"],["2vGtNJDDCIGGB"],["4oG3OFARM"],["-oGrKKLBHIFIZXaDOCCDI"],["kqG_MQBKNRCNIBIHAAG"],["-pGhMADFCBO"],["gnGrLFCECEB"],["moGnLKFLC"],["mlGpKGJDDHGBIJDDEMMEBCH"],["0lG7KFBBIIA"],["4kG7KHGIG"],["8jG7JHICGKF"],["ukGjKDADECGID"],["6iG7IDABAAECCED"],["8lGwIDABGGA"],["u7GrtBHECE"],["s5GhzBDBAEGE"],["uwGh5BADHC"],["n8G12BHDAEDBGJFBFCEILCME"],["4vGt_BCDNCGECGGA"],["myGx6BDDIBABdHMOAIGA"],["srF3TFECE"],["4lFjODKEE"],["82F5WAJHK"],["6xFrNBBBAAECC"],["suF1UNHGMMCED"],["8qFnRIAFJIFBDVEECBMKG"],["qqFnRFAEG"],["4qFnODAMQ"],["ijFzOGDVAAEGCBGGG"],["ojFnOQCKGMJDFTNROFQ"],["qwE_ZBBDAACCCEEAB"],["wtExgBJKAK"],["m4Fn2BBDHCIG"],["-zFjyBDIGMEBCL"],["u5FryBEFBBPE"],["g5F1xBMJAFHDNQ"],["gsF1sBOAGDRBHFJCRBHGEGcGKA"],["-_FpiBDJBCAGCECA"],["6_FjiBDGEE"],["s_FlgBDICOIIDIECEL"],["-8FrdEBAJHK"],["syE8JBDDECEACEA"],["81EkNDBBEEEEBCB"],["k2EmPGCCHLADM"],["i2E0ODADKIB"],["q5EiNDBAIGG"],["m6E6LCUMUOgBBhBLJ"],["47EoMTHFAFIOOIAKD"],["g8EuLFAAE"],["06EyLADDBDE"],["q2EyGRHOM"],["04EiIFBDKIEKD"],["y9EmMBECIEJ"],["k9EsMHIAIGG"],["s4E-QIDDJFG"],["04EuPDJDKEKGC"],["q5EsPJGIC"],["k6EiQCFPQ"],["46EyPADBCFGAEEB"],["06EsPONAHXSLJEa"],["u7EiRFDFEGSIJ"],["y4E4SDNDQ"],["i5FpHJIAGKD"],["g4F5GHGGECB"],["w2F9FDEEE"],["63FtCQBJHZAEK"],["qhG5GDOEEEH"],["m7F9BHECE"],["i8FpDLAHIMCIB"],["88FvMICBJLEFQ"],["-7F7LJGEGEB"],["m8F1LKBEJRCCCBI"],["88F9KDKEE"],["6-FlLMDAFJCHG"],["8gGlOHDDE"],["-_FrOIDNCHK"],["wzFzKBAHEBCKBCAAB"],["opFZUDUNJDJAFQDD"],["qpF_B6BHZDdK"],["2oFrBDAAEGB"],["0tFvKNEKG"],["-iFjCCJFDNCFG"],["4jFzBHCFMQC"],["0jFfBBRBEC"],["wjFAUFCFDBLAJKBBKJFBBGFBBEJCEG"],["ygFyCFADKGGKGEFDJ"],["i_ETFACIGA"],["k_EfDABCCGCACF"],["u_ELGFDFMHFDFGFBAGFGCGEB"],["mgFhCXDFGKK"],["uoFjHBXJBLMGCCGFGGAIK"],["moFhIJPDBDCAQEADK"],["mmFrHDDEMIQBL"],["gmFpHDBBM"],["sgFxELDBCMIEA"],["g6E1FAJFCDPKHJBFJFABGGMEYII"],["q5ExGDFJEEKBMOGCNFH"],["y4E5GJIEIGD"],["i6EjFFFFIKC"],["y9EhDHOCG"],["w9EnCOAPDTBBE"],["m8EjCKAEHjBDBGCI"],["g6EtBCJIGEDBDFBDCDFAMJLDGEK"],["q4EPCDJB"],["w-EiFDAEIDECIGJ"],["i9EqEFABM"],["22E7HBFBKCQ"],["yjFrKGIIB"],["mkF_JJACMUYEDDBBP"],["qiF9JFDDGAEIA"],["4_EjKIBEADDHC"],["w-ExJADHBFFPCJDIOIBQG"],["25EzNDAAGUMCH"],["s4EnNHCME"],["47ElKSBEFbDDCCG"],["s7EtKFHHEMK"],["86EpKDBJJLAKKDAQE"],["k6EtKJBGGGA"],["q1E9KBACMEB"],["owE1IHACEKB"],["szEiFFBDEAGKB"],["izEkEABDEACACEACB"],["sxE5EHHDOEOGE"],["kpEvBJDCMKB"],["snE0EHAGEJIKIGH"],["mkEyDBIGB"],["k_D0CCFBFHBDKKG"],["igEoBFEBMIF"],["kgE6BADPGDE"],["6gEeVEAKUJ"],["-gEiBRICEKD"],["khEWFAAECCCACD"],["qhEaDGCCEF"],["giEwBGBDFDC"],["4iEwBCFBHFIHBEI"],["gjEHIDDAREEI"],["yiENGDJHDI"],["2hENLAEE"],["onE3DFJHGJDBMEOIAOFEF"],["85D6BSTFPDCDKHELUGBEG"],["-_D7GJIKB"],["y9D_DAFDEFKAIKH"],["o9DtDHBAK"],["68D9CJEBIGA"],["-7DnCLIJQEKKAMbAD"],["i7DVFAGMFKKJ"],["y4D-CZMDIICUP"],["orEgDDCCM"],["uyE-IBBBGIEAF"],["goB45BRCBE"],["0cypCNFFGNEQAIGKDEF"],["mdmpCDAHCCCCCIBAB"],["4sBwxCCDBDJG"],["0hBqiDTGYD"],["qkB0iDYANB3BAYE"],["y-BikDTEcCCB"],["ogC-jDzBCiBE"],["2oBkkDpBA2CE"],["ooC-lDeFbBGDVDZErBBJEcAmBK"],["skCslDmCDyBH3BFhCEXEMC"],["u_BqlDPCWCCB"],["opCqlDOHLDbCdIiBE"],["yvCgmD9BEgCAEB"],["8oCkmDPAKGyBABD"],["uXskDJBNCCCEAIA"],["iOoiDABYDKHnBIRMDGQB"],["gYg9CDBLGQACB"],["uiCi5CCDFDCBDBJKTGWC"],["q9Ci7CVGMGWDHA"],["s-C67CDCGCUA"],["-_C67CDAPCFACCEA"],["ihDs6CfAWKOEYF"],["sjD86CXCJEUKQH"],["uoDy8CdCOC"],["-pDi9CBBJCBAGCGAGA"],["qsD49CSBFDVAFCEC"],["2mDo-CCBHDTEIEKBBEEAGA"],["24Ds_CCDJABDnBEEE"],["g6D4_CBADADCBCEA"],["s4DqgDpBB0BIAB"],["8vDwgDNCSCCB"],["q_CyjD2BFlBATEDC"],["ikDilDpBAIEYCaB"],["uyDulDNDzBE"],["0mE2hDHDrBE"],["6kE4hDHCaC"],["omEygDFCECOD"],["0sE4_CGDDBXI"],["q2Es7CRBFCMC"],["27Eq8CHEMB"],["-pFo-CTAKSSJFDAB"],["u6F6_CdACCKCcCFBBB"],["oqFs8CfOaFID"],["usFs5CJDZGeC"],["8oGw4CHABE"],["wzGg3ChBCVIWGoBDCD"],["ysGopCHDAEMIAIgBICL"],["qwGykCAFjBYWABF"],["wjGq_BJEME"],["8iG8-BTJFCBGUGIMICAH"],["yiGw_BHEIA"],["g-F06BHDDCYM"],["k7Fi5BJBIKaOKA"],["45F04BbLJARRLFOSaQAGGFKCSKEH"],["o8F4pCFCKC"],["usF8kCKBTPJIHBOQ"],["wrF8kCFFNA"],["s3F22BDAACMA"],["42F03BOBBDXJLJBHDEAEaa"],["s7E0eBFDABEIG"],["86EseHACEIB"],["qgFqhBPHCDDDADFBEOIGBEIBGKED"],["ohF0iBDCAG"],["6hFojBDBHEWKAB"],["ojF6lBDABABGECGBAB"],["2jFgmBDCIQ"],["6gFgpBIBCDHB"],["0iFqoBFACKGCCH"],["2mFotBBBBCBCACECED"],["-sFovBDCCEBGKIBHGB"],["0wFs4BFEEC"],["2oF8qBFDFEOK"],["shFipBDEEIEF"],["0hF0qBDAACAGGAAB"],["4hF-qBFAEKEE"],["-gFwrBDBFCACEECCCA"],["igFwrBADHCAECC"],["-9EwpBHEIGWCBF"],["69E-qBFEKE"],["k-EmvBBFDG"],["q4EsnBNCLKKB"],["84EulBLCBGOD"],["41E6fDAAIGB"],["gqEsaEAAFHC"],["wmEwaFDBACGCACB"],["iiEgNBNFM"],["igEgPFAAG"],["-hE2BFDFEGE"],["s9D0GBBBCAGCACACB"],["68DiICDFDDG"],["i9DgMDHAG"],["g7D8JDDAOGB"],["s1DyIBDHKCIECGL"],["0zDmNFAAIGGCH"],["8zDuOFMGOECDMGgBIIANFJEPFD"],["46D2NCHFG"],["m7D2OAHDABK"],["g7D4PCFFDAO"],["g6DqUDCCI"],["k2D-TDDAGII"],["k1DsXHGKA"],["k1DuYKDBDFADG"],["-yD8aDCAGEA"],["-xD4bDDCQCFCB"],["uyDgcFECE"],["wxD0bLBIMHUEAKN"],["lLy4CFAeMOBAB"],["viG4XDBHEAOFOKKDGCGaLQT"],["vkGwaUBFDRC"],["zjGmaIAMHDDLBDIHECE"],["noGqbBBCEGE"],["nlG6aEAAFLEDDFMME"],["lnGubJBHGIGKA"],["hkG-ZDADGGA"],["2gH8gCDADABCACGCGD"],["49G8gCFAQIBF"],["k5GuhCLCQE"],["g4GoiCaFTDRI"],["93GyrCUFPCPGGE"],["10GwnCDBDABCMC"],["7oGklCGECHLBBIGC"],["7qGykCFEIC"],["lrGgkCDADABCACGBCA"],["5nG-kCPJEIKG"],["t1G4hCDAGEEB"],["pvGyjCHABEICID"],["9uG2jCDECCID"],["9xG2iCtBTQQMCAEEESA"],["nwGsjCEAGEEBLHIDtBNLAaKGGIBCCNECGQC"],["x3GqhCFAGGGB"],["94GmhCWBhBBFC"],["r6GihCXBoBICCHCMEGBHFEB"],["38G6gCGBABTFKQGB"],["_7GghCHCEC"],["t9G0gCTAQEEGEB"],["r-GygCFACEHGKAMB"],["k8CtiCJBHIYD"],["02Cp9BFGIA"],["qvB16BJCIC"],["6iB-sBFAAIIIOEFP"],["giBqsBDABGGI"],["2hB-tBKGGB"],["-fmuBDADEIG"],["0fquBDBDCGE"],["whBovBKDHBJC"],["ygB-uBCEKA"],["ofmvBBBJKKB"],["yfgvBDBFG"],["0gB4vBDBDEEEFIMA"],["ghBmxBILDACBDBNGGEHDHEMG"],["6ewwBDABI"],["kgByyBFBDEEACACB"],["6fgyBDHDEHBAG"],["-e4yBDAFEIE"],["ugBmyBHBDCECECCAEB"],["jU6NFCIE"],["tU0YDDACBCEEACCA"],["vVipBUDFDFAJE"],["tUwjBBJJFJOgBK"],["jRkkBFBCGOKBJ"],["3RmjBFDFCKEKUGCDT"],["1PqJPEOEEB"],["nTmjBBNHBFGEK"],["tfmVFABGMECD"],["jfgVHCGC"],["vVgjBDECEGD"],["rW4iBDFDCBCEAGE"],["zcqUIDADJA"],["reySFABGGA"],["pW0jBFKCEGACF"],["je4UCBHCBDDE"],["zc6UDCCG"],["_c-SBCCEEB"],["pd4SBDHCDGCK"],["03BjPAJLI"],["w4BnQFECKED"],["q2B7OHGCQEB"],["0xB_JDCMM"],["sxB1HCJBBLMES"],["ioCzZJADCEKKIGH"],["4lC1aREDICGOAIJ"],["u8B1QFBAGEC"],["u-BjVFHCGGK"],["6xBjGANDHDEAQ"],["-K2EGACDJRJCAIGC"],["qIEFBBIKGCF"],["l3B9cHAEE"],["38B_gBBEEGCBBDAD"],["z8B1iBBBAKGG"],["x4B7dHAGG"],["2NkqBJCCGKD"],["vF4jCHFHAQOCF"],["rGqlCJCAGGC"],["nHumCTBGIFCIEOF"],["1H-lCCLHBAIHDEG"],["tH4lCDEMI"],["pB0rCDECEEA"],["zB2rCGFECJVAKNGMCHGIE"],["dgsCDDBAAE"],["9DwpCFADE"],["nF0iCEBJDHEAGKA"],["5D6pCMDRAFCCGKB"],["rI6sCJIID"],["_I2tCGDFAHE"],["pI6tCAFHAEFPO"],["3H-oCFFHDEDTJFCKEHECCDCCEMABEWI"],["1H8nCAHUBLHDGJARKQI"],["_IkoCEBDDLC"],["hJsnCFCAKGB"],["tMsjCLEKA"],["gZurCKBBDFAADLABGGBBI"],["waivCIAFDFG"],["2UsmCDBBCAKYeEA"],["8S4kCPEAGCCQF"],["kRgkCADHCFDHECIIGKFBD"],["2P2kCRBGG"],["mO0kCQDADLBPEAI"],["yM0kCJABG"],["uNukCFEOM"],["oN4lCBAAIED"],["kOgkCLCEE"],["6NynCBAFAECGCCBBA"],["sKwkCEKAFKA"],["vBs5BADDEBCBEEB"],["pBs_BHDLCKE"],["kGqiCDBBABCCCGE"],["gNy1BAFLE"],["sF6xBREAEQA"],["6B0wBJAGIKA"],["9mBoxBBBBCBACECACA"],["7hBqwBHADEKCEB"],["3iBmwBBAJCDCDEOD"],["5jBkwBDADEGCCBCAAB"],["ljBiwBLBDE"],["hgBqvBSABDHBLCDG"],["mS6sBABDADCAGEBEB"],["wSo4BNEEE"],["kS63BHKCKEH"],["4ZgwBGNJCBGDBIK"],["kaovBEDHBHIEE"],["8ZowBFAGK"],["kZqxBHAJMMADDEH"],["6cotBFACIGF"],["-E2gCGDFAJC"],["3_B-2CJADMKCQBHD"],["puB-xCFABCCEGAEBBB"],["9iC64CPEOGGF"],["3kCg7CVJZGoBG"],["zgCy4CRCIE"],["55BgsCFFPGYG"],["l5Em8BGJFEHKEGEDFB"],["l7E-9BTIKA"],["p6E-8BBADI"],["p-Eg-BLEAGIA"],["v8E0-BFICEIF"],["5zEmkBFGCE"],["h2EsqBBABADEICCBAB"],["71E0qBOBJD"],["9zE4pBCDFADG"],["j4C4zBLBBAEAEECACB"],["t-CisBFBGECSCL"],["15DkiBBBAEEGGMEAHJ"],["t5D2gBJaAQ"],["3yD8kBHEECGD"],["hhDqeDDCBEECBAPHAJS"],["hhDubJGKB"],["xhD8bHEEC"],["piDmcMACDJADC"],["xgDsgBFEGGAQJMRCQAUNAHDD"],["x8CscHABG"],["p7CwaDHVAAEIEKBIG"],["38C4bMOBGECAH"],["5_C8fUNATFGEACMHIRGEE"],["x-CqdPGCC"],["x9C0cDGJECEFQ"],["j-CoeHBEENS"],["rhD2bFCCE"],["lhD8eAJLFDILGIABEEGCMGD"],["nkDkiBCDDIFKBICBCD"],["lnD-aPDJGKAFIEGMB"],["jiDuhBYBhBHJIIDGCCG"],["vkDufHHKOEC"],["1lDmYKBLA"],["1sDsZBEAEKE"],["jsCoRBDDGGK"],["hsCkSABHACGFCBIKD"],["nsC2MjBDQIAOFEWGIAFH"],["n1CmPBDDK"],["9rCgOBBACEEGAACAD"],["rqCsQDABIIF"],["5vC-NCFDDTEIEGD"],["jtCgPDAEIEA"],["jtCqVFBBEECEB"],["zsCiTDABQGD"],["1sCqUFACKMJ"],["_sCgUBBDEAMID"],["tsCuQDGEC"],["p7CicMDPC"],["91CiPJEFK"],["jpGopCFBDESG"],["n_FsnCLDBCCG"],["z-FkpCFCMC"],["tiG4lCHCGC"],["rhGymCBBAEMC"],["3gG0mCDCIC"],["_2FyrCMBTFDG"],["14F4qCDACEYSKB"],["_4FirCBAHAACGCIB"],["x4FyrCFJDEEG"],["94FisCFACC"],["hmF0kCKADHDAZYOD"],["vnFinCKHDBDRJBAMECHGBKIE"],["zmFulCNLAGDE"],["lkF8kCEHHAAEFCAIIB"],["9lF2mCHAEKMH"],["jlFkmCBFHADEHCBEMMOJ"],["_lFqmCJEGEKAAF"],["7nF6oCNCGC"],["lhF0hCHEDIKF"],["1jFkkCCGGB"],["5iFujCFDHEBDBCKI"],["piFuiCZQECSFIH"],["7_EqgCHCBGGC"],["tgFwhCDAAMIE"],["thFsiCFCCI"],["5tFg3CJAKCGB"],["nsCiLBEGECD"],["lkD1DDBCKEEID"],["5gC5BDAKOAKGIMEEDFN"],["z3B1DDDEO"],["twBrQEICD"],["l-BKCBHHRCEI"],["7-BuCFBBKGA"],["p_BFLHDECGGCIA"],["59BDPAOIGD"],["h_BGAFFCAGGGEKAN"],["1-BQDBBGKG"],["9wDdHCAEMECF"],["3vDjBHAMI"],["_lDmJJECGCA"],["pyDRFABGIC"],["hyDCSfDHJBJADGQMJKDMFAKG"],["lxDNLECE"],["jlEgbBBBABG"],["lqEofBDDI"],["ttEqkBNKDKIBCFGB"],["9vEijBHCEK"],["zrEweABLICAEA"],["nsEokBDJHEEOEC"],["hsE2eJKGUBR"],["o9E2IBBBGAGEB"],["47EsODAFGGC"],["45E1KBBBCEEGB"],["-yEtKBGGC"],["w3CkzCFAPIaAAF"],["i5Do_CDAEGIB"],["m9DwjDJACCACEAEAGB"],["6pGk2CAELEAKBCQKEBADJFCJEF"],["nsD44CmBGWAEABBCBIAGSBGZCVMYKoBHVKKEdAJIBEEGMEoBFvBMSKYEYBDGUEeEqBBKDILWHAFMHlBRaGNJKDHBBFeMMAHGKEKFMEMFAHQFJIGKwBFfGHEEEaGiBAwBFYFCFhBVeOkBACDDDjBFUALTKGKMaEGBTLUIULDKQGyBHQFCDLFRAbJOAMGKCQBUEIBAFDDtBNGBMGGBFNSSSGYEgBDcFEDjCRyBGEBLFKBUGDEMEcJIJDDdCxBJeEYFaAWFADDBtBErBFaCWDEDFF3BCsBFKHwBBLDIFBFGEEDAGSEBJLHEAUIADEBOCBHGDAKUGCBHDCDOCgBLJBEFbAiBDKGWFHJRHeGWBMGgBPJDNGHBUJJDbEGDFBWHXBIFJHTALICFJBMBANJLLGJBHEEKLLVOLMmBWVHhBDAEIEPBRGTOCDFAHAEDBFZGIHUHFDTAXMLBWDAJODDHQESHJDULGJCISFDBEDKIUFIDLFUBFFPAKBIHSADFIAIHFACRFALOJGIPBDQNTCEJBBrBSBDFCJIBHLKJCZQGNdOPBeVSBBDsBPOLMDFDEHJBtBMvBGTEROZAhBKGEPBZOQCIGRERCGGNDHIdQIIZAFHDILCJIHDKHBBnBABDrBFjBELGFGEMeKDGEE8BHOHDFGBEGRMaAuBISAHKVKDG2BYKMYIVWXSCENBFCAOLAEFJARKHAGEHCKErCNCMYCMGfKBGKCJCJFNEKGdCFQVAdONHSDIHBDbDxCIaJCDBAZIdDhBGbB_BGNBTEHIEE5BHnBKNKJMgCDcCbIxBEdIHSQKHCAGUQEMWMoBM0BG4BBCDtBRVTOLBNGHwBV"],["72C4nD8DBxCLsDISBMEUDiBAIBHBWFFD-BCQDEBBBlBJ3BH5DJJDnCH2DIkBB3EdjBLXAVGUJBBnCF8BAfHKBLDpBBtCGJAEBsBBKFFD1CD3BE0BJsBABHhFCcFiCCoCLRF7BBwBFdNxCBDRPFxCBrBKOHdBIDeCkBDcCGBCFEBQBUEMFADLH_CNLAGGDEdChBIMFADhCALKDNhBBlBGNGJHZCFGAHjBADODDCJnBECOsBKgCEfINIFEOGeCYDgBNiBDuBEmBSCEDBrBPpBBRCAIJImBKQAbCEMHJXHXAMKnBHZCCIcOoCGmCF8BKbDtCEFCGCgBBhCYfCNGHKEGICoDBwCVwBDQCjBCvCY2HWpCEQI4BM7CNVJxBHrCBcGvBBfFlBB3BEBCGEwBKuCGjDD9BPNA1BIHCECqDE-BK9CH7CBNEeEREqBGoBCjBAnCFJCeI7BDPEeI0DKqBFOEgCB9BIkCK0BDmBJMAPEIC-DP5DWeEPGyBDNIIC6CDrBELEKCgDB8BNOE5BOsDAmCLfIEEWEgBAqBHREMEuBA"],["71D25CUACDcLGLDHaHMNMCIFLBREHFUBjBPYAQDcEJDqBDLAHHNCUHKHBRMHOKKUOKKAoBRITTACNEHcPGFgBMGMSKKYIEaAJEKIVIDYwBAaF0BBPFSDCFiBBCDXHWBGDBDXHZAOLICBJeRFRTDLHtBPHCPOLCCCLELEJFOCWJOPADREHDFAlBOrBBAFeJtBZNDTAfOnBKHACD7BEODCCsBDmBRsCFAFJHfZbHPECFREHGJBIHLCGHFDZDvBINA1BOEDBDEDMAFEyBJLFYGuBPDNZFjBACDODXBHFIJZIMFFBADLAEDDAJAMHXJAFHBCFRVJDEDFRAbFHaNBPKSkBAe5BNPkCOUBmCPeNYRoCPUJFJMIuBAkBBYHIJHVKRAVFHcXAFJDQAgBRINPJOGQAKFUPNOAKIIICKFGJGMJKWULQCIHIHYCGECFEECJEECHENQsCaqBcIUAcNWZUlBQCKcUDEEIQDFEGEAGCCLEGCJMIELEIIXBSOAMKETMFSgBK-BJEBDBSEcHAEmBKgBLIBCBDHKCKBIFFDOEIDHFIBDBOHsBDMHMCEGGBCFJFDHELADnBBkBFGHDNOBHRDBFGNHOBWIWAMFGJDNbJaGQSEHFFMKCPGIiBMOMKFEHEEFKICBCIEMCLGIGEBDGSBNGDECGQBDGOSMDEDNFSCEDBHICMLHDGDKCGFVFcABHKCIJbLOEYAHJRHeGIHOBCBDDCFVDYDCBFDaJALtBEeJHFUBJDOBCFFBOFOEIHICBFIFPRiBKCDKAPPYQKBILQDSGEHSDLHdFHHtBHNJJCMFHDBFkCecENAAEkBBKNNHGFUMOAWLGJDHENTDWDBDHCOH1BdRApBFZTlBVbAjBFHGfCVBvCCxBDRHPZlBFEBdLbZ1BKuBLEBJNxBlBlBJfNTRHBNHJCMDCDdNuBSQWyBa4BQqBkBwBciCUsBEaBYLCDLCKFDLjBPbIdHOCUFKJYIBBODHNPJSBBFOZaDCBHDOFoBDBDKBWKGHMCGFCDFDQB5CZLCCFBBPGDFBEFBAHvBhBJCFKFBDCBOEIKIJBUIECJBECeOSGAEEBAFIFBGECeG7BAAGWOHBFGCFHFrBRHECEFBCDLFPBJEAJEBHFZDHHDEHBDCDJJEEEDACEHDDNHDJDBEBDBEDFBCAFFCACJDBDCAVXDHKJJBHHMDEJIJSEDIFAGCEFCJbFBGRHAKDBFEDP3BDbLPJGMDIANLNMFFXAIFPFBBFRRAIJCNMEMOIPHFFCFKVIFDHGAAFjBzBBKOWHACGFCEIHBHGAGKCHEFBIGDEDBCEEACEBBBGIGGCDAGEHCBDFABFBEBFFAEDADDACTEHJIMRPGDGBDDGJBIUJTKBGFaLDHFAXSWTKDBAEBAFFCBFLKSRDBJIXGYHGJUASrBPiBBHINNIAFDCADFCFFHKALcABJKKEDAHPLNCDGFDLEWLLJJGEDIDMCEBDDhBJDGAHNJHNAIBJPARHNRBGBJTNFAAFPFLAIDFDHGEJHJHBCDHJCAHHEDFDBNKnBezBDJGNFMAMDFAKFGENc_BDlBNXXDBGIBFEJUNGJUEIHFCQHAADDAPaMOJGALHGIaAQpBqBNGJBDFjBHDCAEEDBGNIEIHFZKOAFElBFIEAEFAFHHBCEFFPAICHQFNdCPBLHVIHBBFIDSEEBFDGDKGCJNHIHUHFHDEFDBIbOEDDLNGJFVGGADKJAPMJFCDFBlBKZBBCGGDCDHCDhBLIGJACIJBENNPXLPFKGRBHEKJLDBCDHLBADECADDDLBGHFLLECFIBBLERMRALNdFXD5BDNETSVDLAMNUERSjBehBGTUVDAKDBCUBQHONkBMaASKUACBADODKGBMDAcSCQIIAYGSWKkBGSGSCeFCEFAMCKHAPXdBPJHCDKCJJADGCNpBHKAOFFFNIACDFZCDDhBXZADMFCEBESJSIIDYBWCQGBCUDWEQHECBAKBSNLCADGAIHKAFGMDIJFHBEBBEDEPLXBRCjBFCCKFHEHBLBCDHGBCFHNUnBWZSHAJGABFGDMADIOLUBkBQWQUBGDSBaNoBlBBFEACOFKYSKOQEBMGSFBKSIIQMUDFFEDKWiBAYQSIEMWKODELJLVHENIHDAGNThBUdOEGICORiBBKEGwBQGGMBAIPBDMEIIEGFIVQAQBSLGJBHGHsCGQPcHMCaOSCTCBEgDETHTAIJBJIGKPEECDAICAONAGGEMJMDIHHHJVNAMHUIaAmBVQLMPFlBKSQBSRMFCZKScDMDCDAICCoBCUDMDDRMSQJWDYTAHEEGFEHBFGMIXEKOHUtCEBGJUHCTPLRZVLPZAJHHDFJAPHSDKCqBaCDBBIZMJQGMDQINjBIGKYICMOKDEEDEAKOQWEGDAEYFIFQDWLIAENKKQLDBGCELHHEDIICHDBDFDZKKIUGBDLKIUECESBcNOCQFqBEUB6BhBSTQPODGHWHYCUDKPQ5BAlBTzBPRFAAFTZVLJJDNBGNhBVdJDAIHGFHEDNbEABRCBCCDXGvBL1BCTTVFzBHHPfPNFNDJCTbLLLCHDFjBAHIDBCHbDBCKCFEfFAFEBfNDHTAjBRtBfEABDJJAEHCDHJECFMDFHDBCDAJFBEFBLGTDNCVHTRJTTVrBXftBhBAKGAIESKEQGACIKIAKEACIRDLMAHGDFPBEFRRLJTCJTnBdZPXNJdLdGVDZILKbBVYBIEUKKDUCTDFFAFVGVFDKPeLQNAFHHBHMPQDBVZfFNZNhCPxBFdCTGCRKDFBEBBPFBDLAJGHFJVHZBxBOACHBDLGnBSFAFGBMCCGHCSEGHCPDDNDRQRFDDeHVJPNAdDHLFANVCdLZfEPcVmBFEHBHDFNFMAGDhCnBJLDXDFNDPOAHNBQAIFVJHRHHGCGVPBUDWXhBEHBFHvBLHXARLDhBKJMEEOAEFBDEACKSIGGDEFCjBPHFBFTIGGAKGEMBOGYCdEHFJEPTJALIQGIGBCFDNDPCBKDADMQFGCAESBSIKJFFIEDKEGBGXKUJCDfJDAJKREGEEAAOhBILOQCDIGEMFILOFCKGCBGNNHKAEKAbMMKQBNIAISAJGGSDBFRFEAgBOGRAFSeBMFGCHGDOJLLAPKEGMFEENGOKAKFGFCBFTGAKVHGFBDHEBGgBWFGAGkBECCAIGEGBJTCDPFSCCMGCCJJTEAIKCQAEFEAIUGMDLIHACGCEYKCGCGXMCKGCCIDOIKGADQEGEADKECKHDQJABEGGMECGJHPILLNCFAGGHEFQMuBKGGYJcCSHOAOCGQCESECIaIKAGQUImBOUDWMSCKDIH-BCMKIEUHcMWWyCBWKWDYCeEOHMCIIIK2BDeCmBH4BnBcBMFEVMNMzBU1BgBRUPKRgBGCCSZoBLMBQRODSReV8BZeHWPWtBcAGICCIRoBEQSUeUMaDWDTDACILNZUIEAGFiBOKEKGAHKSUBaOIiBICKHGKKIDAYIGOAKIGIBGGCIKKWFABGBDBMDBGICMBYHKMKHQEQfmBJUECAGGGQJNODDHEAFDMRMTCJFDHCBbPADSXLBFHPBHcHJJCJSPCDERAFBBHPYFCGLLEFEGIFORMPEDOVOAFOLHHHILEJQIOAEJGGEAEbaPUfaCGKDFQLCADHFbGIDfMTCbOjBEhBWVYrBkBRKDBSJZICGHBDEDDIDNALJpBLbKVCPKNEJKlBGtBUdSLMfEdMRUpBSVcFQQIDGFCKMCQJEHQAOFMXWVcfWIDCGRENUKBZODGJBACGIHFHCFQKKEBHMHGJAHQNCHGDOCIVENSJCRWBKHEAINSNgBCQVGFIHEBDFBfQGJDTKZANMLYTKPEAEFEAELKDEVQNGLIDGPGDDMKHKjBKJObBJEJMJEKiBhBDNTJNc1BmBDAJMAcNaXQFODFNDJKXKDKRMBEUBKCABKDDIDCIUjBkBbQFIAOHEBQJGBKLOBIEEJGHODMDABSFIZQLCDKZERMjBCFGAUHEBKPKXaAIEIAENGJIDOAICCGHKDNSECeChBEDBAJRIBBAKEBfcFkBTWIYEUT2BIWGCDAGMIsCBYgBBJEXCAMEFCIHIKEJEBDJcJMBScJiBAIDGEGJPNDHKCFAAEUQCFHFGFBFDABDDGHHQAMIBSGIFIADDCAEECJGGCBKFCFKDAFBAGDABEMCCEPBEOFJHBPGDECEIFIEJCBKEEDCBCEFDFHDJALGNSIKAIHNRABGDHRCNEWEXAGGFAAIFFPBZMAIMKcEZALHHGAGEIDACIOGICWNTQKKBGBHfPJRJOMGAGEELHIWLBFMXIBIGGGABFOFQAIFJKTCBIIEFCJBJHBJLFNMRGMSQERBNIEKgBgBFADEBJHJCMDOCIDJENFJADNHLCHOMGDCBQJIEGdHFNFADIOQMCNCLGLKAELGAGZEAIHMECSFRMOCNAFBNIAKGILJRGTSHWFDEDDAShBBDRGNACIHIIEFBFICJFBLIRCCBDDSBIDDDMAGFBDTDlBOlBWxBQKGDGEEGBCLEIICRGlBLnBIEEDEBDHBzBGvBDCEDCbIIMVJZEKGjBEGCJECGMC_BHDCKKXFBBICFHHAMFBDNDWEGDJDAJJFfAFEHNDGDFHCCDJFPANLJCCBXBHCCGUEOKPDPGSSEIBKkBM2BDlBKcOLANHXAnBLHFCDTHAFLFRCOFAFVFIBDDJBBEJDDFNFDHgBHCBDFhBREABFdFfRZHCFJHfHFFRBBBGBRBFFKDHDDEHHbHFFBGBCdLPBLDJACGIALCVRNDJIAJHBJEBFHBCKQEeUSIUEABMCDDIFEEQBJIKM4BYIDCKOKSKQBJIEOCEOCLCAGWODAKQNJpBLLKCGOALELFDABJCJFBbUJDRKjBJDFfASGDIGENCAGGMPYFEKMIEHAVRGBAH1BHdUPEAELCWOUFCBDDOGKFOGTEMCFCJDrBEDAOGRCBCECFBADFAFIFCAIJBBGOCLEUCFECGUOSCDEKEHDAMEEMCFEGCSCODFFKEIBcIMMgBDWIGGHSTIEESCEEBEJGLFLAlBPTKDBKDDDVIzBFtBGNGEIVIQAEEMCxBEbKqBKaKeAEALECC2BMgBBJCEBDJFDODmCBUKQDBGfCAELINEBEKCOFBFGDMD2BBDITCVDRGBEMIDApCEXUxBS3BMQEISsCCeIQKIOqBYGDLDqBGkBMGBFDEADDKBCIQAbGQGQEEBFBEB2BE6BWDBEBiBHVFIDOCSIUDFDYDmBGmBDCBHFcDHDsDC-BLsCBwBF4BEoCR4CF2BPuBHYAiBHHGREACMCLCIIQAGGcCCIUHJJoBIKIUAFCCCOBcIMAUKcBOCCDDBvBNrBDPJNBbPKDHEeAFCCIgBIEGSACDKEEJSOQGwBKJFEDICSIEGYGRGGGeJWTSJeHOEHIGISGJCSEEBCNMBPJGDgBCOGGKoBAsBFgBJ0BFgCNwBBHESCgBFqBRFFZAPDAFLDMDqDD8BEmBIQJYBILKIYNEDDBTAyBbROBIYBHGCCJGDKLIAEIEBG4BGAESGIGHCTFFFnBAFBAFTARGQM2CMSBMReFADGDqBCuBNeBsBG-BDUCLGCEcNUDMGBEVGRDLIECJIiBCFEECUBOJWCJJeIPdIJSCDDQBAFnBCYRCELKaAGMHOHGIKcC0BWHCBKFEHHVACESIFCAGaEHFCAMGHEXBPIFBxBKRKBKMIOADCEERAHECOEEOGUBGGRCaOaE"],["9kD-hCzBMIGcAQL"],["_7C40CjBAJIOEkBDEH"],["rhDqvCIAGHPFXM"],["vmD2uCCDFHjBRbBHMUS"],["tjDguCMHPVFBRIAMKK"],["1iEugDZChBWSAMDOJQBED"],["r3DohDsCBSDHAHHhDCJECE"],["v7DgkDAHFDVITAFEEEMCeB"],["pwDygDPBdGFCBGOEcBSFAF"],["90D69CEHDHnBAxCQaQqBIoBJQJ"],["npEqiDSFAFFBjBAdENFZEtBAgDQ"],["9zEw-CRDXEeMoBIGAFF"],["zjEk7CjBQdIOIsBCiBFEBBJ"],["_8Du8CiBH8BGWDEFZFMAEDVDZNgBEWLBDYCEJNFIDFFGDADnBHXADIFDKLRFTCXQhBQXGTAlBQBEGIOEMBaNeCEKKDDILEICUBTGVBXIUEUFDGNEAEmBAECNC"],["jqDyxCQIQJYBMHuBLORHHqBEMFDBQDfN1BKBKXCAGJALDFJVHNLdHDCJW3BDBCKKcKDQMoBKMKCMDGHFD"],["z-Cs1CYFATDHXFjBBLAHKDICGUQ"],["tjDi8CyBAsBFkBPADIDLDrCEnBFTEHCHMXGAECCDEAESC"],["j6Dy_CBDIJDDCFLDUDCJLEJDCFIDPCCF7CAHGOCXECC8BMlEHJEaMwBDNAHECENCBCMGXCOGSBMFwBNGCPGWChBEQCfGDCCAqBGaHKADGME"],["phEkjDWBKFDFGBIEcEaFDFcASBQHJDEFYHGDFFfBZERM9BCFCACvBDfEJEEE2BACCDAPCaEhBCMEJEdHBCIIfAEK"],["7yDulDwBRCD4BDEBBHODaBPGBGGAiBBAFJDcBIFLLmBCOFOEYLrCNZJLCBGGGJBDBDLKBABFBXEGHHHLAlBQBBWPdINBMDJBzBEfGFCECkBC3BCPGUCdCJG0BGMGyBC7BEtBFFAGEFAnBDZEEGyBI5BDXILM0CDCEOCtBBnBGiBCXIAGIAcAOFmBA9BMKGKCkCCCCFCfCAEuBA"],["71DkgDUAWFCDNHWGkCEeHhBB0CFCBFBvCAuBFmBJEBBBPFeDECBEICSFSEIDME0BHCCFCEC2BEaGcBsBEkBDKDcAIDFBYBGHjBHeBKDVBPCIDFHhCFnBEFGAEPEGFHFjBDXEDDLENDnDAFCIKHCLFDEJBADNDnBCPECEJBADPAPGHKCCLIAEOKFIjBU1CDfKQExBGACUANEACkBE"],["n4DmiD0BFRFQFJFnCFAEZIcCrBIJGKCLImBCkBF"],["hqE0hDiBBFDrBDeFDHTBhCDfIBCECHGEEkBE"],["twE2gDCBhBFWHRBMHpBFBHHBdEIQDAPBFHNBIFPHFARIFJIDNFTAROFHHAbCTDJCEEBCLAUKiBCiDiB6CCGCNCWE"],["rnEi_CYBLHgBEMHAEIAFGGCqBBGJRVrBHdCZBPEZFjBDVF9BJtBCXGFCEC6BMwBAWIACrBDPCrBFFCAGQGVCFHNCGFDBVDPENFdITAXEOIuBCmBIzBDbCOEoCG1BALCECBEQE4BBnBEIIYCgBBQJsBAiBJHDUBUJuCBIEBEjBKQCAEdIDEmBOUCQBHFWNLF"],["t0D28CmBHsBCaDCDhBTLBEDZPzCASDIFTRtBABSNQBgBKCcDRKCEGC"],["55Di3CIAmBLWRUB1BPhBEfIBEPBHGHDNCDGEEWASIDIUDJIEGQCQD"],["jvE46CkBCMMWC8BLDFVHIBQGCDEAmBMAENEFECCaAyBRWhBQBUKPKVoBMCFECCmBFGESDcHQHUfUPCHHJCDkBPUFECBEqBNMAGFSAINFFLCFGFFXGNFCDBBhBEQHBJaMMAGBBHKBBHpBH3CEBCGGtBCHCBIJCfRjBBrBJzEHRODOrCEjBEXQDKoDKuCBoBCzCQ5CD_BCZKFCGE-COFACCcCLC9CFLCUIhBAPECKeKLIGEoCUsCMOAGDEL"],["11E08CWEEHWKqBAqCXKFzEhBPNbDJVFFhBDLCPHlBFjBYzBKVCEGGCBCaOCKQEJEAEoBYPGTSgEIuCL"],["l2D2-CHAFIQCIH"],["njD-gCJCQE"],["xiDmmCBAEKGCAH"],["1iDqmCJNBAEKBCLNJBIONLDCUSCIDNGEGMMH"],["_jDomCDACESG"],["hkD2qCDACEIA"],["_4Dm7CLCCGICKF"],["15Dm9CPBOGEB"],["56Dq8CbBREgCIGBDB"],["3wD42CDFHE"],["jxDw2CJGGA"],["z9Cu1CPEDGEEMBIH"],["liD-rCDBCCOC"],["3iDo1CFCAEMB"],["7_CovCZIIEUH"],["_wCmuCQBFDLADC"],["ruC6zCFAIGKA"],["p1CqrCDCIKGAID"],["93CmuCPCRKeDIF"],["hxC2sCVIBEaAGB"],["70C-2CLCOCEA"],["pjDo3CEDHBTACFfIQE"],["xhDk3CEBDBfDKG"],["7nD8yCGBDBFE"],["_iDi2CHEeMAEMCEDXP"],["ngDu2CLCBIaA"],["pxCstCIFLCBG"],["zsD03COACDJAVE"],["1oDoyCUDDBRAEEDCLBBGLIaFEB"],["nsD20CLECGDEKIMDAL"],["5pDgyCRGBKIAIFGH"],["5_Dg_CKBXFbBKGbAJCIEXCQEyBEGAEH"],["x-D4_CNAaGcA"],["_hE4_CMAaFPDjBAJKWCEA"],["3gE2hDJAOEEB"],["j_DkhDbCBEyBAID"],["lwD0_CPAPKYEKDDD"],["j4Ds-CdFFEaIQD"],["j3Dk9CVEOC"],["puEmhDdARIcGeJ"],["r3E2-CDCMG"],["9tE-_CzBCmBEQB"],["jiE69CfESKQAKBGH"],["plCugCFFRBCFIAAFlBpBBPYUCFICSAZPMCJHcCCFEGDPGGcMCHGCOCOFCFXNMADDKBDDLFqBKDJRHCDLDIAHHIFOOSELNAJCBGEGIGHPhBVBAUPLFCMWFMHELRBAEGPFRTTBFECCQGMMQIVADFFBVCMEAIjBJ_BIXFLCDMoBWfCMIBDIBMUQDDEEGHAAGIGIBFIUgBKEDEKGAGOOaIODCG"],["lkCg-BJDBE"],["zjCm-BEDLBAE"],["pmCy6BFBCMCB"],["n9Dg2CHDHCAKKAGD"],["_8Do2CFBDEEE"],["r9Dk4CLCDEQB"],["r3D-2CEBDFJAEEDEFHDCEI"],["t-D42CDACEFCMB"],["p_D41CREMGGBGD"],["1iEw1CTGSAGD"],["7mEo0CBDHGAIGB"],["jnE4zCMAFF"],["nsCimCHAEEGB"],["ltC-nCEFNG"],["t2C6pCHDCIEA"],["4burCIBDBCDJG"],["6a2rCFBDE"],["vwCurCBBLEDEIA"],["29EurBFEEC"],["ifoxCJAACOA"],["ulBo3CHAEEIB"],["mGssCDBBCAECACACB"],["kKmvCLCKC"],["yKyvCFCUC"],["0PsyCBCECKA"],["wPyyCBAEGGAAF"],["2Y43CODLAHG"],["qdw4CXJTBNG"],["ga03CPAKGGB"],["ggB-4CWDVDLE"],["wdm4CCDPFNEaI"],["gem4CFAHGGCGBGB"],["qRq1CKABBfHBEEC"],["mQ60CFBGIGC"],["8Vg3CUDEDFBAFRAPHLCGECIOCDE"],["iYy3CODXHHFdAMGMCCEOGEICA"],["2T21CMGEGOBAFTJlCHOIUCMGGKDCCGSKGDLHGJ"],["gTm2CIFHHbCFCIEKACEIAAE"],["iOixCTAKG"],["sGsrCADDABK"],["-OiyCHAGCEA"],["5iD--CLDNCcKGB"],["x5C2gDhBCUCWB"],["h4B0mDrCKXKmBE8BHGD"],["pXqmDPAVGAEMA"],["_V6jDRFXATGGEoBEWACD"],["3XuhDFAFQOCCL"],["nXi_CDBPSCKMB"],["vWo-CEHQBEDxBBJCCK"],["tWihDHAACKGIACBDD"],["tlBuoDmFL3HFBD0CE2DBsCEaJuDHIDDB7BJjIFLDEDKAkCEsDBWDMHgBCQKmCCIDDNRJ1BPFDEBKEuCQyBOSACFkCD2BQqCAoCDoBJjCNzBDIFJD5CHgBDVH9BD3BEbJBFGDcACBDNKAGFbFNHrBHIDfdADOAWI2BHIDFBbGVDKFuBJiBCGDBJJFrCGrBHdEJDcFGFKFYCqBHDDSJEJAHFDJBbGtBLXEWFcEIJJFIAKEIKQASPKBCHPDXCADjBDfGIKJCCFPDGDFFwCHFNFBjBAfHjBGjBOVFfKcNxBJvBIcHnBDIDuCKOEkBA0CTATJBAJlCQLILOvCNKBgCKGLVHEBWCyCTGFQAVJADEFEIWCEZGLjBDBQJPZAXILQLG1BOvBEBBCByBBGFBFlBJjCCQDBHnBJiDAEBDBlBJDBKBOI8BGsCH2BAEBDBdFADfBEFVAEDDBjBHEDRDFFfHtDPXANDTCEFPB1BQGHFBIHlBNPJBFVTLDJHVHZIILdLAEFCDHLADCJBDFNBJEIGAGUMhBEQFPNNEMFAFtCFWHBBXJPCRAABGHMCSPTFDFfEWHSCBHEHHDBDJBDFCDLHRALGUJJHpBBgBFFPGFCFTFMABDNhBNJhBEcHENHDZEMHJBHCCCNABEKKPJfICGQEIIZHZGDIMQFDhBL1BBAESGZABIREFIJEEEHIWIJATDBGEEdIAKUOXJpBiBDEEGDE0BIJACErBHFESOQAAEGCOAOJDKPCRSKPTFCGDBZVHIAMFSLImBOUEXDZJHAHGRABGGKLC4CiBpCbVBBKKKOIaCzBEHGEK0BOsCHVGKEBAfBXE3BLGMSO-BFQMACRFVBvBEOMSEoBFSCOIRBGQgBAJEVBMSSGFGIEtCAdKnBEVMQE2BB0BLgBBXICKTGeAPE_BEDEIGsBKhCDBCOGHABILGDGGCLBUPNHHBEDBDdDZEJEBGOQSKdFBEOCLEcEGGAGLGJBNCBEOECGFELBNGGIEAPQnBAWCCEBGSE7CgBMGJIrDSzCIVFREpBFVEVDVCBBQFHB5BGvBM4BK9BEJEIGjBHVKWGgCAQGSCmCDBEIEBCTGjBHjBEdFvBKSGtBBjBGZKIEDCKGgBEqDKECFCaEmDEWMUWYE_BDpBENEIIkDYgBCaFHIKE-BBOKDOeGuBAsDVpDa8FOkBHCDCPUIEIFCEI0CP2BAhBIVMBCmBAwBBkFXICDKEGMEDEvBMyEBWC_FENEOEeBgDKkCFmBK4CNIGfIqBG8FE"],["l0G6mCMBHB"],["nnClvCIHBDJABGLAfJXRFAIDDBEFdGDJDGHAPDbRZAEHNAHFQHJBLJABMHGAyBGCBHDJAEDFFDGLCJDBHNKXBBBILADDAXSTBEDRJMDCDLDZGHHEDJDKDbDEJHJGDHFeECDXHSBJHEAqBFBGKEmBCdFBDQDDJiBRGDCJSJBHHCHDQFUAABHFLBCFaCOPnBPQBOGIDCDDBjBDLDmBDYCCLDDVAAFODQCAHGFQCCDFJRENDrBGIDGJWBMFDFHDRCLFgBBfHUBWEEBLHxBCQNTFNITCCFBBbDWBIBDBpBFoBBCBDB3DV1DNjBL_BDpEGtCBDBGFkBPUF0DHBDXJzBJnHSnBDmFXDHLDhDB7CQvBQEFSJRABBGFOFgCNePOACIOC-EFGJTJtBDtCA6BFoCCcLYRuBCkBD-CKSHUDuBASHoDLgEFIBPB1CCjBD4BBCBvCDMBCBDFIDgBBuFG3CNiBRcAADPJGBuCB0EmBUC0BKmEI8CEoBDsBCIHPHBDMBuBC4BIkDqBgDM-BFyBGYKiFIMG6BE0GGcEGEjBEhHGJEAIDGNC9CFvBGxCOCMcQQIWESM8BMWA8DgB8FYwDCmBIoBBwBERIKIMEeWoBEgBDsBSBE_BBDCOEVECIiBO6BAGELKsBBkCQWUBGNBfIHIQEsBJOKSGLGECoBHYTeAIEEOJKEEkBAkBGKBEDTLAHsECYFaCMGGDGLIBsBS2BK8GUMGgBDaKoCTeByBWNECCQAKHUDwCCYGIBEH4BFOKWEIDFNIJGAiCCMOOKaJCBFDCBcDQEQMIAQFAFOHmCDsEc4BCwBKIEIMDINOEISGOCeBADRHCDgBAeXyBCUFcCsBPBGiBWGUOG4CSWK4BGiBIwBGCCFGKGgBDCBLFQHcCGLMIAMWKTCJGgBEeJWABQHCBGEG-BSmCGiCDqBPaDIFHDhBCOHDDXJOBYIkBCsBJUJyBE4CJoBG6FPwBGEDBHQPRLEHDBEJdDADMHDHNBVClBPcFqBCKDBJNNfNXXVlBPHCBeDaIAOSKuBGqBUcKGSMOoBQCMUKaEYFsBCKKIEKA6BScQCKUI2DU0BEIGoBOwBB8COkCA-CMyCHeIcF-BGYDWGSDGDUA-BMSKCGyBE0FXaHOAKDqBFuBQAIMI4CMYFaPmBHOHPLxBFDFGDqDQwCD8BIGB5BLKB-CKcKmCKiBDMCMKSCgBFIJcLkBBgBCUYiBKyBBgCGeHEHEAmBOwBLgBEkBHoBAyCLaCeHqBEEBCFSEIBCDZZCBIBmBKiBCiBNCFDFMD2BDkDEEBENGBKEoBBWDYEEQECgCboBHWASDSEqCLOJCHSFQHOVgBHEEJOBGIESCcLaBQG-DLYPwCRGIGCQRFDTAFFDLMCBHlCGOFqBHLLTFZGxBDbIQJiBHbFtBBKFdFHUNABFKPHDYThCANGJHVHBNFDbCfF0BDCFWJNLMDCHFDEHLHaDUNAHGDMBADOBEBBDRFaDeKEAGJWFiBBEDDDVAPG5BBvCLnBOFAAFSNdCNBNFGJZFODTDCBUBGBABnCLHBAB0CBFFOFXBSDALJF-BLgCREDlDHGDkCBmCI-CRIHMBUEUDNHXASD2DDiBHsJVYFAhH_hOAAiHgCA0CBSDmFB6DFuBF2FBkILnBMmBADC1KS4BElBGcGDC5BI5CB1BOjGWHEwBDyBCoEPwDCcDSF2BEkBFuDBwCIQEZE6CGiDWjCUeKlBI1CIUGyKKECtBGBElBERGQIsCEFEMCCCDCxDOpBIBG9CC_BMNEKE8BGQG1DCpBKHGKMCOICiBFmBG4BBkBDSFmCBwCN-BOXEDCCIyBJYEWHOBSCHIMCRGMEDIpBKVCxBBpBG2BKgDLSAlBMEEME0BCuBMwBC8BJNIeEeK0CEmBBQMkBG-BFmCE6CFwDI6GBqCE2BK-DDYYsBHABHDBDQDVHHNgDIECHIECDKGCSAkBFCHBFJFjBLEB0CAqDFkCKoCA4BBaJ8CEIEHCjCMSIDGtBARUpBEDECGQCkCFoCG9BKhDCRUKEeBEDJDEBoFAoCLuBEoBD4BGuCFSCIGBEUGSBIIOAYDNLGFoBCYFoBGgBLwDNkBEGEDOCCiBFJMAEGCmBFWHGHuCCEDPJEBmCI0BBqBKyEMiCMOKSUDITOBUHObcBOJIWEgBBQKBEPIKEEMKINKKMIGPCRBCSSGGLMCEDAYIEWACIBEGGSCDEeCFEAEIBCEBCaEJGAEMKcDBIWECIKDYGWMKK2BKaK6BMMA"],["y_Gy4CHGCE0BSAV"],["wWmqCWCCBHBDHzBRfAYBEDJBEJBLFDELFJCHVhBFDtBCCDHANHGLHFxBACOTWOBFIIACGTMNWDABKFABKJGAKHADaCEIBVGHIBOBFFDCHJLNBLGEFNDEBDBtBXbFRADGFDHCEGXGRIDIEIUFKGJBHGCISKxBPEQIGMBSGRCMKEGOGCJGKMEhBFJLdPCSUAPEFKUKPFFEDQoCEKHAGWEJEEGFJNBNGHFrBBLGAIOCPIAIUAWDeC7BEFECEIAIGOEIBUCECVBIIwBBGCFCWE1BBIKYGWAUJRMEGQCLGKEWABDCBWGMHeCDEEEYGFEKEJCLFGBDDjBJFAFIFAAEmBYmBOGCDAJBIKaIGDSEGGTFJEBCYWOCJGiBEQElBBBIGIQGOALESI0BElBCUMaHAEECRECGRDBAAGOGSALEcIMNBEGEFCBG2BGpBEkBKMMQCAIGEYFJIQCIIUCBPMQOGCNJJQIKBHICIWAEEIAUFFIRImBAQEKBEHMDBEEGoBSFGQGYFICMBVNHLCDOGCEqBWGCEDHHEABJQEMMKALEEEKEWBKBAFTFOBBPQUKEkBHMCIDBBeFAFbF5BCgBFEJQBGGIFKEiBDSEAGoBJDDbCDAMFYBADSEDLHDMEKG2CDsCTcNQBcJKABECAYLWFIRIBFNrBV5BJ9DObILBDCCCzBILGEEpBCYFBDQHOAAFSDLDeDYLEHHJHDQPCHEBDBAFIDYBUHIHsBHUGEGDIdEXQBGKCEGKCiBLmCLMGQCZWAKkBOgBGcQqBDQFDFMCKFAKQQBMFGTGSeBKhBQcDqBCgBDgBVADtBDZNaHOLYDuBIKSBGoBECCHECCQB-BS0BKMDDDIAMGNE6BQcAbDGBHHIHbHyBCODCGUIaEsBDoBOEBgBGMJJFAFaDGEAKYCSKDGHBTUeKiDFiBFeHBD0CPeNYHGCOIMQXARMDKPEVEFFDIGKMEDEGWFERBBEIGHCKI2BQOMSaOMMCBDEAqCAwBHJbJLRJeLEHATJHGRAhBmBPCBRLAJDHRFdXTBIJhBHLEMGPBPGjBBIHgBHyCFKEEI4BSKQcOAMNOIOUE2BGgBVDZYJuBCzBGBKEIOCNahCOXAXFfAHEEINMCEKQUQdYTKWQ2BMEEBMJKWAKHAFGFTNAFKFBDFDCDQDwBDaAcHcAECXCLIbCpBKPOgBGcHaCCCJGTBBEqBKkBA2BLEFgBJ6BAGBJHbHBJEHHHCHQUKCGBCLNPQDBISCKIXWQSAGNGVEVMxBKHIIKNGDGAEIEAE4FGkCIGDxBNADkBJdKAEuBGSINEZOVCQGUDOAfKZCQGSDIAWKCCTCCEaAmDS8EMvBACIGBGC-CCUBRHiBEEADDiBGGBuBKsBHLJEAMGAInBOwCCeDECdCGGHEEIgCU4BKkCHOFpCL6BAGDuBCUDfPJCAD0BAUK0DBiBFGBFDaAIJFDSECAFEKAMNMALNFGlBGULMCUFFFbL5DbCBDDbDjBNlBDVJTBTNVFWCgBMyBA4DWECFCnBBBCIGQCgBBEEQALDGDeFaCGEDEIBOJJHODBLLHGHOARGOKAIOEPGWE0BE8DDUDTBBDCD0BJwCBgBBIAHEYBSKLKEIuBEqBJABaEEBBDKBUIcBWFBDiBFTHQBKFhBFkBDEFAFDBNAvBMuBZICAGEBKFXDMBYTgBHICKHWGUOBEKMQMUNWFoBBiBIWAoBHiBJDESEPCOIWCQHgBCLIAINCiBKnBBBISG8BERKGCyBH6BAuDJAD5BCZFMDgDGdNDAKITEDHEDbABHIBiBEwBWuBBsBFSFCDlBDDDsBHWACBVHiBGaDULNAeFoEK-BByBDaFWLEHJREBqBHGTMHHJLDKASOBMCIYIqBEeCWF8CDiBKIAMFGNoBFMLmBCSIAEPSRCOIAKyCFeFGG2BDsBCoBJuCJuBPA9EVJlBHdEhBQVBcBGFFBnBGJDxBFuBEOEMHHDyBGCAALKFODIGKHBFIBCDCHLDIAEFCGEHSFCDFDMJBFLFDFnCMCINABFIDRB3CbbDHARLLCCFTFADnCXJTNEPQNGrBBjBFnBVBABGIUxBPBFDDPIRFCEPCPJDTLHADfVHNEHODADKKYFBFPLBDCRSDERLHHAHIQKPAFDCFRFPXELMRTJREPBbNHPIZREhBNLGADGDDHAJPX1BhBJSFsBJOV-CGiBMaiBYGGHMCCYAIIaAkBUaasCoBMMkBOeEFGSMHEIKIYQGYDAEIAnBKpBFNZADKDFFDAFGRBhCjBXDKQXDGIBGOOCKdHNKtBHXCNDPHBJXJNLdLZVFLgBDIDAFRBJCRDLENADDRFTEHFdAJIkBCKCDENARKhBBGCnBIXDGFPCBHIAHDJAJGdFlBILJHBTKjCAxBFVJRNfNNTRD1BdlBfhDvBAHYFmBADfSAEKFECCUELHUFXPcCYOAFLLICIICWYDUCQHGJOHaLCDHHNEQJALDDOJFLPLRfCZCBFHCLHVEDLVdTNTPNJTZdjBZZZLFNTNLtBXhBJRIPAAQNHDAGIHBZXRAGFDFTFTTBDCLBRNDhBXVFPHANFDAFQDWPqBhCAnBGAADNdbDDDCFNEBCNBBBCHLEEFHHFEEINLFCHHBIJGKCBCGCHADOMQDEKIHMBWLABCOKMBCFGGJKCEJQEELEJFBELGPLBGLEIGTCGEIMUGPEKUBKVIFFDIHEAEJFRCBDdHTJNLLBBFTDBGYIBEGITABGKEAIMESWDILGAEDDXCZZrBTHNHHbFJIJDJRELOHgBBGDGNDBBLOHSAGIQKBEUGkBPMAEEMFMAHNCDFDHEHAjBNJCEHHBBJJDBIFBDDIDhBbLRCDGAkBTKXOZANUHCJOHEHADFANGPARKRFaCEHiBTKPTDPJHHNCJFMCGFYGSLQFXNQGCFBNHEJDKHFAEDFHENNDBGBAHLHBEDJLAHLLHRHBDKDDDCMRRLLCIFKCBPCHPCEHLBDJJDCDBFVCDFFBGBCFPPHADJBEHDHCBHHDCBFDDJHCPHHCFFLENHHGDHLAEFDDNEEEPOAMDBFHILAPPFBGFLFCHFJICHDBNENLXBRLFGBHHHCDGABHIFFHPABECCLSCKKOJAHICFRDAGNCFKDAAJHCBFRBPHBJHDRCCJHHBJTNPnBMRYVAJFC8B5BICelBU9BBVGNCNDGFDEJDACRBCALFDBJjBRDHdLJKBJHGFDGAAFLAOHHJROQVFDVSMPAHZLPRNBGGDCCgBCIIEBGJGFBPQPEHFBCBEGKFKHJHAAWVeBDLMABVOfBCgBNEXHELFNCVNbFVNXEpBYCGbGFACGJKnBDCBKDABIDAAFKPIAQNUAMPWLILaXKXDjBEJAVONGNOdDFHKAFLAHDFIXM5BqBAOXcECHOJiCJSPSAIFECGJADKFEBIJGDIDEHFDCBUS6BFFBCBYKMCYGEJCCUDAEEDgBNYBKDLASHUEAHIDqBDECSEENBHYNMCNFNLHJKELVLNRDCCOFJJBBQDJFBCYBFHJJDCUOqBFaLWEAHGAQDPJGHMECIFIIPOEERGDACFBBFIEGDACIHHCGFIBJPUJOHwBBBLYLJJBLSBWBHLCOHADFDEFDFGPNTHCGKJFBEEODBDPJJBWAPFHJGBKAFDAELFABEDFAQDEBRFBFGBFFCBCGSJIADIFHJJHXFJJGVJPNLFCCBDDXHDACCBGJFBFGEEBbTZhBRJRRhBTDVTHRALXNGNHJZGVDLIbFIDDMJDZPbBVDFECCFAjBVBNbCHQFPCXFHHFTVLRITYJWBUEDCLCADOFITyBTcJUVuCRWFOGAHGEEFCNeHuBJqBEOBGDFBEAIIAHCFUKgBDSDEDGGEFAUMVBGKHCCGKEXAEBBDHLGBCHJPnBPTEROrBsBEGKFkBKMSAEFFJARHhBMPUQMVJDKBDJGHDAEDAJKFYREAQJOJABDMBhCFFDXITBBFhBCNDDCLBNCFDdIFGDFlBIPDJGnBERGLoBLOPCJBRFJJdJPIVCJIdOHMRIRCLMJYHECIHEBKTUDMTFTMICBCHCFRPDRCGRHCJHOBe5BAHSHBBIJeVFCIPBHDAcxBCBCEDUKYKGMJBPERFPHBGBDHMAGDEJKBWIuBDOEKGOUwBoBIQKGDbCZMVWVsBLMCGFchBOFAHRfRPRbJACIDALNFVEblBJHFDRFFjBFJJCLJJLDbCRJnBLNLBTjBPtCXbXZAXPXHtBDXVRAJFPBLGFBJWCSHMFmBDIHEGEDMGQBQDMLODOZWPcTqBZUNGRWHOCIFQCcXsBVUNENUCGDOtCuDTEBDM8BHLNxBHJRMTUDSRUFSDADLKNCNkBpBALMPEVyB1CYVJBBDIhBIHODYZEPMTABDCADERBRKzBSJMLECKJOXQ9BINMRCOIDGNoBPSXYPGPEAMNGBCEEDKRCFBFVLFHFACBYCMHQVSNaAiBQeDiBQMBiBIUBqBMcSSFFTCbDHGEIFHCJDDjBdxBJJHTPZHZpBhCtCvCtBbvBlBjCnCXjBPDBDBCAHDHFFNDHXJNNjBJFR3BCLcZJTALGAAHFRGTIJGbBDaNILDDEDHTGZBTEFFNEACrBEDBNEGCBCNJLBNVfHBCFdTlBLZLVRVdFCAFPFjBfLEEDBZMNKhBCdEBCOEHBNELJhBIADNRThCXVPHNKJEGBdN1BFLpBjBjBzBTXzClCxBZfBJLVEFHJAjBGRDbELBRLfARDVNbICEJGJADKJABJDGAKECAIXiBEGIBIKFehB0BX6BJOfcNWHYAMHIDWAcNiBDyBEGBOnB-BLcbyBPUJSDWEmBBaKOWyCOQEKQMMQGqBFQNaNmBOOCOVsBBMTiBeKXFHIDGCOPe5B-BXUMBRILSIBACJCHWKNIEHCCIFDFENcEDGAOOCcEHODIGREJKIEEBASHEQgBGuBLSECDADIICDECEHABFRIDSJECDFAAIDAHGCNZADEDDFAHGCHJDFMENHABGBFLBAGBFDATODIFUIEFBHGKCDEJBJQPMnBEKGJBDFpBBnBHHDFJbB5CnBxBOKCFCBGFHdGTBWAhBDPCBBMAhBFhCZbKjBStBqBTIBGRKRQdMAOHBFEDOHCDKGBIKLBAKGCHEAGHKJGAQDBJKPEFMAIDBDKDADFBOFDAEHCCIFACEQEHEFDDIQGhBFCGJBHGEIHBNKOGFEFBBcCEECEHGBICCEcCnBDLWGGHBNaHEDDDEQGYiBEiBOmBAmBDULOIGFBGOESJQDCADBCLSDBBJBCGqBYcGUQcHFEIoBiBEcOeiBYQkBKK4BQqBeMOWcAOJKEcScESecgCcWiBSoBYEBFEFYPMBaGMDSIEJmBBoBWSIQAOMmBO2BEOIWAMEmBAWJeISKSHMCBGKBSHkBGOIWGGBAFCEMBEPEBWMEAEHZXENQJEPPVZTAFKLQBAHKGMNBBYFUJSBWEiBHOHcDGJGTIHQHcBqBJsBZOAMEQQGQHYGQUQSIOAKGWBkBLAJIFUBOFeAORaCiBFwBNWBWHQEUMKAIIUENFSCEGQFQEKHJGFHKDEDIEBEOJ0BGYQuBqDOMDiBFGISFMQOAGFEZLbInBXjBFPGPOdKXCHXHCVFTGJQFATEHFDAEEVBDCWEKInBBCGKABELGFKGECKlBMECAKCCGDCHECQCJCFIKIHCCGFIIKfDEWWQWCIFKCECDEEAGABFqBCHGGEkBETCJGBCEI0CDIIiBSsBK2BBKEGABFIFKDUCGJIHQEKF2BLqBIgBFuBSMMCKNgB9BctBiBTENMNALKVIMGJCGEOHSGBGOSCCEDEGMAPMHAFKeABGgBKBIVDDAIEFAPFZBdNJCbFfTKIBGPJAHGLSPcGSBHNVBPENLZDFFPFRGGOBIZKLADCuBWBGFBJGbDZIBAIGREgBDKGJBLELWGJBLLAAGFFXDFLRPVFENHTTDCKFBFPEAJJDfDDLAHHBRPLUPAHILiBLDJfEZFJJTHVPCIWObBJKdGLFLEPJNCENOBGHRIFAIJAFLKHCAFIFJCDIPIAIJDBRejBHBAGJCBBCDCDEATHcHSLKDCDARTORFGLIAEFNDFGJCQrBRODADNBCBILOFBBJLOEMXUMMKAGGsBPAEIACGdKDDNCTDDIBFDARUOCAGLBTORcRKDEGADKEMASGQPGVU_BWaFfWTGPBBGdUDEOAROFULIJCNTDAHKFQMGFEHBJCFDfHAHKLDFDCBFGTuBZShBWRYLoBBAFJFADyChBURDPJGJORCHGJBLLFPYNCPVHBPJFJLNABEAGKMAEMGAITqBdKAIHIPBEGPCLSZARInBiBNEFAAGRQHAAKLejBOVEHBVRdHbTRFbININDZKfPHNCJILFBADEHtBZpBJNJIDLDlBrBGRQLbRLVEDZDLFRXNCNF9BALHTDHJLDPGHQFCAEIGHBTOCEDDVBNFdEPBIQDUEKDKKBFEPBBIKECKGEFDHJHBFEGWIIMWAGGUCOFSCGFCEIDAAGIGDCCEBKJBEILICGOIUCECAGWGaHwBE2BJkBEWFGEkBDUIKoBGGBCDDGkBKFGLGDJSPKGCDWZILOEIHECCQAJETACGLCBGrBIPBFGJEOEJGOARCAI6BMKBMJKESBEEUBFGBQJUYAELoBDWGJCCIwBQIGAUGIkCSgBAfGMCUFJGIAJIEGSOKaMAUMUGeCQFFEGKSCOAIJGGGDADCQCEYBYLTMLEDMJCAEMCAEJKFOEABKRIAoBUDKKGCGDCMFCDBJJLDHEOOiBCUSaGFHEDBHHJAPaFHHRBDNLAEDPJCJHHKBCHKFCBHFMCYHKECDJHCDWBQIMAUMSBQJKAKNaFBGXEDKWJoCQOKcIiBEaFLCILIDWCSKEKSCMGMMEIBJRNYBCUHOAiBAGMIEMMKgBGYPGHOFMCSKDWKWHCJFNEJMIGHABECEAIYEBCOEqBCCGgDJGGAKMDGGSAIGmBFCERKZAPIFGEBCEFEpBJJEZFAIFHRCEDLDDEvBNnBARHIILIFFLAAEGEDCEEdEBEHBFCDOIWBCECNQEMHEBIOSIADGeEBGMIqBQmBeeCBEECDGEObGBECEJBbCXDNEHBFCFJFACBJAAFNACFHCGFPNONTJJNhBJHFNCLJRBLHIABDLDJCCFBBGBPFJACDIDFDFLEFJABDEjBOBCDMCYNADKBIJ","s_B26BfNVDADFACDVHCHJCNHRBBDHEEFHNJPDEJJBHMDMJGVIOHhBKJCDadQLahBOHQDGHRANDJXCJHLFEBBDLAPKdKFgBDIJYNgBHwCOGAHDKBCGHoBCoBFKNGHDBIGGOBFECKTECJJMBOIaIJSAKFWCDGQAAIXSJYDCXBHDFLEBBRPcIaBIbELMLAAORcXICIEAuBBJCLMQSqBCeBRIQaDMEGJMPCNFlBK"]]};var $C=Math.PI/180;var a0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",o0=Object.fromEntries([...a0].map((i,t)=>[i,t]));function zh(i,t){let e=[],n=0,s=0,r=0,a=()=>{let o=0,c=1,l;do l=o0[i[n++]],o+=(l&31)*c,c*=32;while(l&32);return o%2?-(o+1)/2:o/2};for(;n<i.length;)s+=a(),r+=a(),e.push([s*t,r*t]);return e}var ja=null;function Vh(){return ja||(ja=Za.polys.map(i=>{let t=i.map(a=>zh(a,Za.q)),e=180,n=90,s=-180,r=-90;for(let[a,o]of t[0])a<e&&(e=a),a>s&&(s=a),o<n&&(n=o),o>r&&(r=o);return{rings:t,box:[e,n,s,r]}}),ja)}var ax=Za.source;function kh(i,t,e={}){let{south:n=-58,north:s=74,west:r=-180,east:a=180}=e;return{w:i,h:t,south:n,north:s,west:r,east:a,x:l=>(l-r)/(a-r)*i,y:l=>(s-l)/(s-n)*t,lonLat:(l,u)=>[r+l/i*(a-r),s-u/t*(s-n)],k:i/(a-r)}}var Kh=(i={})=>{let{south:t=-58,north:e=74,west:n=-180,east:s=180}=i;return(s-n)/(e-t)};function Jh(i,t,e,{sea:n="#dbe9f4",fill:s="#c9d8b6",stroke:r="#9db386"}={}){i.fillStyle=n,i.fillRect(0,0,t.w,t.h),i.beginPath();for(let{rings:a,box:o}of e)if(!(o[3]<t.south||o[1]>t.north))for(let c of a){i.moveTo(t.x(c[0][0]),t.y(c[0][1]));for(let l=1;l<c.length;l++)i.lineTo(t.x(c[l][0]),t.y(c[l][1]));i.closePath()}i.fillStyle=s,i.fill("evenodd"),r&&(i.strokeStyle=r,i.lineWidth=.6,i.lineJoin="round",i.stroke())}function Wh(i,t,e,n,s,r=1){let a=t.x(e[0]),o=t.y(e[1]),c=n*t.k,l=i.createRadialGradient(a,o,0,a,o,c);l.addColorStop(0,s),l.addColorStop(.45,s),l.addColorStop(1,"rgba(255,255,255,0)"),i.save(),i.globalAlpha=r,i.fillStyle=l,i.beginPath(),i.arc(a,o,c,0,Math.PI*2),i.fill(),i.restore()}function $a(i,t){return t>i.older?"not":t>i.nearer?"maybe":"yes"}function Xh(i,t){let e={i:0,first:0,tried:[],done:!1};return{state:e,items:i,buckets:t,current:()=>e.done?null:i[e.i],pick(n){if(e.done)return null;if(!t.includes(n))throw new Error(`Unknown bucket: ${n}`);let s=i[e.i];if(e.tried.includes(n))return{right:!1,repeat:!0};let r=s.answer===n;return r&&e.tried.length===0&&(e.first+=1),e.tried.push(n),{right:r,firstTry:r&&e.tried.length===1}},next(){if(e.done)return!1;let n=i[e.i];return e.tried.includes(n.answer)?(e.tried=[],e.i+1>=i.length?(e.done=!0,!0):(e.i+=1,!0)):!1},reset(){e.i=0,e.first=0,e.tried=[],e.done=!1}}}function l0(i){let t=ni(i),e=t.centers,n=i.querySelector("canvas"),s=n.getContext("2d"),r=i.querySelector(".wh-ce-slider"),a=i.querySelector(".wh-ce-when"),o=i.querySelector(".wh-ce-count"),c=i.querySelector(".wh-ce-list"),l=i.querySelector(".wh-ce-card"),u={ago:t.from,sel:null},f={what_en:"First farmed here",what_zh:"\u9019\u88E1\u6700\u65E9\u683D\u57F9\u3001\u755C\u990A\u7684",when_en:"Roughly when",when_zh:"\u5927\u7D04\u4EC0\u9EBC\u6642\u5019",...t.labels||{}},h={south:-58,north:72},p=null;c.innerHTML=e.map((d,x)=>`<button type="button" data-center="${d.key}" aria-pressed="false"><b>${x+1}</b><span>${ee(d.en,d.zh)}</span></button>`).join("");function _(){let d=n.clientWidth,x=Math.round(d/Kh(h)),D=Math.min(2,window.devicePixelRatio||1);if(!d)return;n.width!==Math.round(d*D)&&(n.width=Math.round(d*D),n.height=Math.round(x*D),n.style.height=`${x}px`),s.setTransform(D,0,0,D,0,0),p=kh(d,x,h),Jh(s,p,Vh());let A=0;e.forEach((M,I)=>{let E=$a(M,u.ago);E!=="not"&&(A+=1,Wh(s,p,M.at,M.r||9,E==="yes"?"#e89a1c":"#f1c56b",E==="yes"?.78:.42));let v=p.x(M.at[0]),F=p.y(M.at[1]),L=u.sel===M.key,O=L?12:9.5;s.beginPath(),s.arc(v,F,O,0,Math.PI*2),s.fillStyle=E==="not"?"#ffffff":E==="yes"?"#0e6b5c":"#c4861a",s.fill(),s.lineWidth=L?3:1.5,s.strokeStyle=L?"#1b1405":E==="not"?"#8fa0a8":"#ffffff",s.stroke(),s.fillStyle=E==="not"?"#5b6b73":"#ffffff",s.font=`800 ${L?13:11}px system-ui, sans-serif`,s.textAlign="center",s.textBaseline="middle",s.fillText(String(I+1),v,F+.5)});let y=qa(u.ago);a.innerHTML=ee(y.en.replace(/^about /,"About "),y.zh),o.textContent=`${A} / ${e.length}`,r.setAttribute("aria-valuetext",`${y.en} \xB7 ${y.zh}`),c.querySelectorAll("[data-center]").forEach(M=>{let I=e.find(E=>E.key===M.dataset.center);M.dataset.state=$a(I,u.ago),M.setAttribute("aria-pressed",u.sel===I.key)})}function B(d){u.sel=u.sel===d?null:d;let x=e.find(D=>D.key===u.sel);if(!x)l.innerHTML=l.dataset.idle;else{let D=Ya(x.older,x.nearer);u.ago>x.older&&m(x.older,!0),l.innerHTML=`<h3>${ee(x.en,x.zh)}</h3><dl><div><dt>${ee(f.what_en,f.what_zh)}</dt><dd>${ee(x.crops_en,x.crops_zh)}</dd></div><div><dt>${ee(f.when_en,f.when_zh)}</dt><dd>${ee(x.when_en||D.en,x.when_zh||D.zh)}</dd></div></dl>`+(x.note_en?`<p class="wh-ce-note">${ee(x.note_en,x.note_zh)}</p>`:"")+(x.url?`<a class="wh-ce-src" href="${Pe(x.url)}" target="_blank" rel="noopener">${Pe(x.src)} &#8599;</a>`:x.src?`<p class="wh-ce-src">${Pe(x.src)}</p>`:"")}_()}function m(d,x){u.ago=Math.min(t.from,Math.max(t.to,d)),r.value=Math.round((t.from-u.ago)/(t.from-t.to)*1e3),x||_()}return l.dataset.idle=l.innerHTML,r.addEventListener("input",()=>{u.ago=t.from-r.value/1e3*(t.from-t.to),_()}),c.addEventListener("click",d=>{let x=d.target.closest("[data-center]");x&&B(x.dataset.center)}),n.addEventListener("click",d=>{if(!p)return;let x=n.getBoundingClientRect(),D=d.clientX-x.left,A=d.clientY-x.top,y=null,M=22;for(let I of e){let E=Math.hypot(p.x(I.at[0])-D,p.y(I.at[1])-A);E<M&&(M=E,y=I)}y&&B(y.key)}),i.querySelectorAll("[data-ce-jump]").forEach(d=>d.addEventListener("click",()=>m(Number(d.dataset.ceJump)))),new ResizeObserver(_).observe(n),m(t.start||t.from),i.__centers={state:u,setAgo:m,select:B,info:()=>({ago:u.ago,sel:u.sel,lit:e.filter(d=>$a(d,u.ago)!=="not").map(d=>d.key)})},i.__centers}ts("[data-wh-centers]",l0);function c0(i){let t=ni(i),e=Xh(t.items,t.buckets.map(_=>_.key)),n=_=>i.querySelector(_),s=n(".wh-so-k"),r=n(".wh-so-score"),a=n(".wh-so-q"),o=n(".wh-so-msg"),c=n(".wh-so-next"),l=n(".wh-so-steps"),u=[...i.querySelectorAll("[data-pick]")],f=0;function h(){let _=e.state,B=t.items.length;if(l.innerHTML=t.items.map((d,x)=>`<i class="${x<_.i||_.done?"is-done":x===_.i?"is-now":""}"></i>`).join(""),r.textContent=`${_.first} / ${f}`,_.done){s.innerHTML=ee("All done","\u5168\u90E8\u5B8C\u6210"),a.innerHTML=ee(t.end_en,t.end_zh),u.forEach(d=>{d.disabled=!0,d.classList.remove("is-right","is-wrong")}),o.innerHTML=ee(`You sorted ${_.first} of ${B} correctly on the first try.`,`${B} \u984C\u88E1\uFF0C\u4F60\u6709 ${_.first} \u984C\u7B2C\u4E00\u6B21\u5C31\u5206\u5C0D\u3002`),o.className="wh-so-msg is-ok",c.hidden=!1,c.innerHTML="Play again \xB7 \u518D\u73A9\u4E00\u6B21",c.dataset.act="reset";return}s.innerHTML=ee(`Question ${_.i+1} of ${B}`,`\u7B2C ${_.i+1} \u984C\uFF08\u5171 ${B} \u984C\uFF09`);let m=e.current();a.innerHTML=ee(m.en,m.zh),u.forEach(d=>{d.disabled=!1,d.classList.remove("is-right","is-wrong")}),o.innerHTML="",o.className="wh-so-msg",c.hidden=!0,c.dataset.act="next",c.innerHTML="Next \xB7 \u4E0B\u4E00\u984C"}function p(_){let B=e.current();if(!B)return null;let m=e.pick(_);if(!m||m.repeat)return m;let d=u.find(x=>x.dataset.pick===_);return m.right?(f+=1,d.classList.add("is-right"),u.forEach(x=>{x.disabled=!0}),o.className="wh-so-msg is-ok",o.innerHTML=ee(B.why_en,B.why_zh),r.textContent=`${e.state.first} / ${f}`,c.hidden=!1,c.focus()):(d.classList.add("is-wrong"),d.disabled=!0,o.className="wh-so-msg is-bad",o.innerHTML=ee(B.hint_en||"Not that one. Try another.",B.hint_zh||"\u4E0D\u662F\u9019\u4E00\u7A2E\uFF0C\u518D\u8A66\u8A66\u5225\u7684\u3002")),m}return i.addEventListener("click",_=>{let B=_.target.closest("button");B&&(B.dataset.pick?p(B.dataset.pick):B.dataset.act==="next"?(e.next(),h()):B.dataset.act==="reset"&&(e.reset(),f=0,h()))}),h(),i.__sort={game:e,pick:p,next(){e.next(),h()},reset(){e.reset(),f=0,h()}},i.__sort}ts("[data-wh-sort]",c0);var ye=.1,Rn=36;function h0(i){let t=ni(i),e=t.base,n=t.height,s=T=>i.querySelector(T),r=s(".al-space-cv"),a=s(".al-space"),o=s(".wh-py-p"),c=s(".al-play"),l={p:.42,idea:"straight",playing:!1,casing:!1},u=0,f=0,h=0,p=!0,_=null;try{let mt=function(){let yt=a.clientWidth,ct=a.clientHeight;!yt||!ct||(T.setSize(yt,ct,!1),N.aspect=yt/ct,N.fov=yt/ct<1.1?38:36,N.updateProjectionMatrix())},T=new za({canvas:r,antialias:!0,alpha:!0});T.setPixelRatio(Math.min(window.devicePixelRatio||1,2));let b=new gs,N=new Te(36,1,.5,400),R=new Ja(N,r);R.enablePan=!1,R.enableDamping=!0,R.minDistance=20,R.maxDistance=150,R.maxPolarAngle=Math.PI*.47,R.target.set(0,4,4),N.position.set(48,34,62),b.add(new vs(16774368,9071162,1.05),new bs(16777215,.2));let U=new Ds(16777215,1.7);U.position.set(-30,50,25),b.add(U);let j=new fe(new Fn(220,220),new on({color:"#dcc08a"}));j.rotation.x=-Math.PI/2,b.add(j);let K=new fe(new Fn(16,220),new on({color:"#3f86c9"}));K.rotation.x=-Math.PI/2,K.position.set(70,.02,0),b.add(K);let X=new fe(new Fn(22,220),new on({color:"#8fb86a"}));X.rotation.x=-Math.PI/2,X.position.set(52,.01,0),b.add(X);let Y=new on({color:"#cdb27c",transparent:!0,opacity:1}),_t=[];for(let yt=0;yt<Rn;yt++){let ct=yt/Rn*n,Gt=2*Rh(e,n,(yt+.5)/Rn),ce=new fe(new Tn(Gt*ye,n/Rn*ye*.98,Gt*ye),Y);ce.position.y=(ct+n/Rn/2)*ye,b.add(ce),_t.push(ce)}let Et=new fe(new As(e*ye/Math.SQRT2,n*ye,4,1),new on({color:"#f1ead7",transparent:!0,opacity:.95}));Et.rotation.y=Math.PI/4,Et.position.y=n*ye/2,Et.visible=!1,b.add(Et);let jt=new on({color:"#b98c55",transparent:!0,opacity:.95}),Ot=new Dn;b.add(Ot);let Kt=[];for(let yt=0;yt<6;yt++){let ct=new fe(new Ms(.45,10,8),new on({color:"#7a3b1e"}));b.add(ct),Kt.push(ct)}let q=Ih(s(".al-labels"),r,N),et={nile:q.add("wh-lab","Toward the Nile<i>\u5F80\u5C3C\u7F85\u6CB3</i>"),top:q.add("wh-lab wh-lab-fb",""),ramp:q.add("wh-lab wh-lab-fa","")};new ResizeObserver(()=>{mt(),A()}).observe(a),R.addEventListener("change",()=>M()),_={renderer:T,scene:b,camera:N,controls:R,courses:_t,casing:Et,stone:Y,rampG:Ot,rampMat:jt,sleds:Kt,labs:q,L:et},mt(),R.update()}catch(T){_=null,window.console&&console.warn("World History pyramid model: 3D is off",T)}_||i.classList.add("al-nogl","wh-nogl");function B(T,b){let[N,R]=T,U=b/2,j=[N.x-U,0,N.z,N.x+U,0,N.z,R.x-U,R.y,R.z,R.x+U,R.y,R.z,R.x-U,0,R.z,R.x+U,0,R.z].map(Y=>Y*ye),K=[0,2,3,0,3,1,4,2,0,1,3,5,4,5,3,4,3,2,0,1,5,0,5,4],X=new ze;return X.setAttribute("position",new Oe(new Float32Array(j),3)),X.setIndex(K),X.computeVertexNormals(),X}function m(){if(!_)return;let{rampG:T,rampMat:b}=_;for(;T.children.length;)T.children.pop().geometry.dispose();let N=pi(l.idea,e,n,l.p);if(!(N.length<2)){if(l.idea==="straight"){T.add(new fe(B(N,22),b));return}for(let R=1;R<N.length;R++){let U=new H(N[R-1].x,N[R-1].y,N[R-1].z).multiplyScalar(ye),j=new H(N[R].x,N[R].y,N[R].z).multiplyScalar(ye),K=U.distanceTo(j),X=new fe(new Tn(1,.35,K),b);X.position.copy(U).add(j).multiplyScalar(.5),X.lookAt(j),T.add(X)}}}function d(T){if(!_)return;let b=pi(l.idea,e,n,l.p),N=Wa(b);_.sleds.forEach((R,U)=>{if(R.visible=N>0&&!l.casing,!R.visible)return;let j=(T*.05+U/_.sleds.length)%1*N;for(let K=1;K<b.length;K++){let X=b[K-1],Y=b[K],_t=Math.hypot(Y.x-X.x,Y.y-X.y,Y.z-X.z);if(j<=_t||K===b.length-1){let Et=Math.min(1,j/_t);R.position.set((X.x+(Y.x-X.x)*Et)*ye,(X.y+(Y.y-X.y)*Et)*ye+.6,(X.z+(Y.z-X.z)*Et)*ye);break}j-=_t}})}let x=T=>Math.round(T).toLocaleString("en-US");function D(){let T=l.p,b=bl(T);s(".wh-py-h").textContent=`${Math.round(T*100)}%`,s(".wh-py-v").textContent=b<1&&b*100>=99.5?`${(Math.floor(b*1e3)/10).toFixed(1)}%`:`${Math.round(b*100)}%`,s(".wh-py-hm").textContent=`${x(n*T)} m`;let N=pi(l.idea,e,n,T),R=Wa(N);s(".wh-py-len").textContent=R?`${x(R)} m`:"\u2014";let U=l.idea==="straight"?Gh(n,T)/wh(e,n):null;if(s(".wh-py-rv").textContent=U==null?"\u2014":`${Math.round(U*100)}%`,s(".wh-py-rvrow").hidden=U==null,o.setAttribute("aria-valuetext",`${Math.round(T*100)}% of the height \xB7 \u9AD8\u5EA6\u7684 ${Math.round(T*100)}%`),i.querySelectorAll("[data-idea]").forEach(Y=>Y.setAttribute("aria-pressed",Y.dataset.idea===l.idea)),i.querySelectorAll("[data-idea-card]").forEach(Y=>{Y.hidden=Y.dataset.ideaCard!==l.idea}),!_)return;let j=Math.floor(T*Rn+1e-9),K=T*Rn-j;_.courses.forEach((Y,_t)=>{Y.visible=!l.casing&&(_t<j||_t===j&&K>.02),Y.scale.y=_t===j?Math.max(.02,K):1,Y.position.y=(_t/Rn*n+(_t===j?K:1)*n/Rn/2)*ye}),_.stone.opacity=l.idea==="internal"&&!l.casing?.4:1,_.casing.visible=l.casing,_.rampG.visible=!l.casing,m();let X=pi(l.idea,e,n,T).slice(-1)[0];_.L.top.innerHTML=ee(`${Math.round(T*100)}% of the height`,`\u9AD8\u5EA6\u7684 ${Math.round(T*100)}%`),_.L.top.dataset.y=n*T,_.L.ramp.innerHTML=ee(t.ideas.find(Y=>Y.key===l.idea).en,t.ideas.find(Y=>Y.key===l.idea).zh),_.L.ramp.dataset.at=X?JSON.stringify(X):""}function A(){if(!_)return;let{labs:T,L:b,camera:N}=_;T.place(b.nile,new H(70,1.5,30),!0),T.place(b.top,new H(0,(Number(b.top.dataset.y)||0)*ye+2.2,0),!l.casing);let R=b.ramp.dataset.at?JSON.parse(b.ramp.dataset.at):null;if(R){let U=pi(l.idea,e,n,l.p),j=U[Math.floor(U.length/2)]||R;T.place(b.ramp,new H(j.x*ye,j.y*ye+2.5,j.z*ye),!l.casing)}_.renderer.render(_.scene,N)}function y(T){u=0;let b=Math.min(.05,f?(T-f)/1e3:.016);f=T;let N=!1;l.playing&&(l.p=Math.min(1,l.p+b/18),o.value=Math.round(l.p*1e3),D(),N=!0,l.p>=1&&F(!1)),d(T/1e3),_&&_.controls.update(),A(),h=N?0:h+1,p&&h<600&&(u=requestAnimationFrame(y))}function M(){h=0,!u&&p&&(f=0,u=requestAnimationFrame(y))}new IntersectionObserver(T=>{p=T[0].isIntersecting,p&&M()}).observe(i);function I(T){l.p=Math.min(1,Math.max(0,T)),o.value=Math.round(l.p*1e3),l.p<1&&l.casing&&v(!1),D(),M()}function E(T){Fh.includes(T)&&(l.idea=T,l.casing&&v(!1),D(),M())}function v(T){l.casing=T;let b=i.querySelector('[data-t="casing"]');b&&(b.checked=T),T&&(l.p=1,o.value=1e3),D(),M()}function F(T){l.playing=T,T&&l.p>=1&&(l.p=0),T&&l.casing&&v(!1),c.setAttribute("aria-pressed",T),c.querySelector(".al-play-t").textContent=T?"Pause \xB7 \u66AB\u505C":"Build it \xB7 \u84CB\u8D77\u4F86",i.classList.toggle("is-playing",T),M()}o.addEventListener("input",()=>{l.playing&&F(!1),I(o.value/1e3)}),c.addEventListener("click",()=>F(!l.playing)),i.addEventListener("click",T=>{let b=T.target.closest("[data-idea]");b&&E(b.dataset.idea)}),i.querySelectorAll(".al-tg input").forEach(T=>T.addEventListener("change",()=>{T.dataset.t==="casing"&&v(T.checked)})),_&&s(".al-home").addEventListener("click",()=>{_.camera.position.set(48,34,62),_.controls.target.set(0,4,4),_.controls.update(),M()});let L={half:()=>{E("straight"),I(.5)},straight:()=>{E("straight"),I(.9)},spiral:()=>{E("spiral"),I(.7)},finished:()=>{v(!0)}},O={state:l,setP:I,idea:E,play:F,casing:v,demo(T){L[T]&&L[T]()},info(){return{p:l.p,idea:l.idea,built:bl(l.p),rampLength:Wa(pi(l.idea,e,n,l.p)),casing:l.casing,webgl:!!_}},render(){D(),A()},ready:()=>!0};return D(),i.__lab=O,O}Th("[data-wh-pyramid-lab]",h0,{demo:(i,t)=>i.demo(t)});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
