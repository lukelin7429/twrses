(()=>{var yi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},vi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},yh=0,Fl=1,vh=2;var Hi=1,Mh=2,Ls=3,Mi=0,an=1,hn=2,Gn=0,Ds=1,Ol=2,Bl=3,zl=4,Sh=5;var Wi=100,bh=101,wh=102,Th=103,Eh=104,Ah=200,Ch=201,Rh=202,Ph=203,kl=204,Vl=205,Ih=206,Lh=207,Dh=208,Nh=209,Uh=210,Fh=211,Oh=212,Bh=213,zh=214,pa=0,ma=1,ga=2,_s=3,_a=4,xa=5,ya=6,va=7,Gl=0,kh=1,Vh=2,In=0,Hl=1,Wl=2,Xl=3,ql=4,Yl=5,Zl=6,$l=7;var Jl=300,Si=301,Xi=302,ja=303,Qa=304,Pr=306,Ma=1e3,Bn=1001,Sa=1002,Ge=1003,Gh=1004;var Ir=1005;var Xe=1006,to=1007;var bi=1008;var un=1009,Kl=1010,jl=1011,Ns=1012,eo=1013,Ln=1014,Dn=1015,Nn=1016,no=1017,io=1018,Us=1020,Ql=35902,tc=35899,ec=1021,nc=1022,Sn=1023,zn=1026,wi=1027,ic=1028,so=1029,Ti=1030,ro=1031;var ao=1033,Lr=33776,Dr=33777,Nr=33778,Ur=33779,oo=35840,lo=35841,co=35842,ho=35843,uo=36196,fo=37492,po=37496,mo=37488,go=37489,Fr=37490,_o=37491,xo=37808,yo=37809,vo=37810,Mo=37811,So=37812,bo=37813,wo=37814,To=37815,Eo=37816,Ao=37817,Co=37818,Ro=37819,Po=37820,Io=37821,Lo=36492,Do=36494,No=36495,Uo=36283,Fo=36284,Or=36285,Oo=36286;var tr=2300,ba=2301,da=2302,wl=2303,Tl=2400,El=2401,Al=2402;var Hh=3200;var Bo=0,Wh=1,jn="",Ne="srgb",er="srgb-linear",nr="linear",ye="srgb";var fa=7680;var Xh=519,qh=512,Yh=513,Zh=514,zo=515,$h=516,Jh=517,ko=518,Kh=519,jh=35044;var sc="300 es",Cn=2e3,xs=2001;function ld(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function cd(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ir(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Qh(){let i=ir("canvas");return i.style.display="block",i}var Hc={},ys=null;function rc(...i){let t="THREE."+i.shift();ys?ys("log",t,...i):console.log(t,...i)}function tu(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function $t(...i){i=tu(i);let t="THREE."+i.shift();if(ys)ys("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Jt(...i){i=tu(i);let t="THREE."+i.shift();if(ys)ys("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Bi(...i){let t=i.join(" ");t in Hc||(Hc[t]=!0,$t(...i))}function eu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var nu={[pa]:ma,[ga]:ya,[_a]:va,[_s]:xa,[ma]:pa,[ya]:ga,[va]:_a,[xa]:_s},Rn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},$e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wc=1234567,Js=Math.PI/180,vs=180/Math.PI;function qi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return($e[i&255]+$e[i>>8&255]+$e[i>>16&255]+$e[i>>24&255]+"-"+$e[t&255]+$e[t>>8&255]+"-"+$e[t>>16&15|64]+$e[t>>24&255]+"-"+$e[e&63|128]+$e[e>>8&255]+"-"+$e[e>>16&255]+$e[e>>24&255]+$e[n&255]+$e[n>>8&255]+$e[n>>16&255]+$e[n>>24&255]).toLowerCase()}function re(i,t,e){return Math.max(t,Math.min(e,i))}function ac(i,t){return(i%t+t)%t}function hd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function ud(i,t,e){return i!==t?(e-i)/(t-i):0}function Ks(i,t,e){return(1-e)*i+e*t}function dd(i,t,e,n){return Ks(i,t,1-Math.exp(-e*n))}function fd(i,t=1){return t-Math.abs(ac(i,t*2)-t)}function pd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function md(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function gd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function _d(i,t){return i+Math.random()*(t-i)}function xd(i){return i*(.5-Math.random())}function yd(i){i!==void 0&&(Wc=i);let t=Wc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function vd(i){return i*Js}function Md(i){return i*vs}function Sd(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function bd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function wd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Td(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),u=a((t+n)/2),d=r((t-n)/2),h=a((t-n)/2),f=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*u,l*d,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*d,o*c);break;case"ZXZ":i.set(l*d,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*u,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*u,o*c);break;default:$t("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ms(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function en(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Fs={DEG2RAD:Js,RAD2DEG:vs,generateUUID:qi,clamp:re,euclideanModulo:ac,mapLinear:hd,inverseLerp:ud,lerp:Ks,damp:dd,pingpong:fd,smoothstep:pd,smootherstep:md,randInt:gd,randFloat:_d,randFloatSpread:xd,seededRandom:yd,degToRad:vd,radToDeg:Md,isPowerOfTwo:Sd,ceilPowerOfTwo:bd,floorPowerOfTwo:wd,setQuaternionFromProperEuler:Td,normalize:en,denormalize:ms},dc=class dc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};dc.prototype.isVector2=!0;var ut=dc,Ie=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],d=n[s+3],h=r[a+0],f=r[a+1],g=r[a+2],x=r[a+3];if(d!==x||l!==h||c!==f||u!==g){let m=l*h+c*f+u*g+d*x;m<0&&(h=-h,f=-f,g=-g,x=-x,m=-m);let p=1-o;if(m<.9995){let S=Math.acos(m),A=Math.sin(S);p=Math.sin(p*S)/A,o=Math.sin(o*S)/A,l=l*p+h*o,c=c*p+f*o,u=u*p+g*o,d=d*p+x*o}else{l=l*p+h*o,c=c*p+f*o,u=u*p+g*o,d=d*p+x*o;let S=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=S,c*=S,u*=S,d*=S}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],d=r[a],h=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+u*d+l*f-c*h,t[e+1]=l*g+u*h+c*d-o*f,t[e+2]=c*g+u*f+o*h-l*d,t[e+3]=u*g-o*d-l*h-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),d=o(r/2),h=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"YZX":this._x=h*u*d+c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d-h*f*g;break;case"XZY":this._x=h*u*d-c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d+h*f*g;break;default:$t("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],d=e[10],h=n+o+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(re(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},fc=class fc{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),u=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*u,this.y=n+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return tl.copy(this).projectOnVector(t),this.sub(tl)}reflect(t){return this.sub(tl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};fc.prototype.isVector3=!0;var U=fc,tl=new U,Xc=new Ie,pc=class pc{constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],S=s[1],A=s[4],v=s[7],b=s[2],w=s[5],R=s[8];return r[0]=a*x+o*S+l*b,r[3]=a*m+o*A+l*w,r[6]=a*p+o*v+l*R,r[1]=c*x+u*S+d*b,r[4]=c*m+u*A+d*w,r[7]=c*p+u*v+d*R,r[2]=h*x+f*S+g*b,r[5]=h*m+f*A+g*w,r[8]=h*p+f*v+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=u*a-o*c,h=o*l-u*r,f=c*r-a*l,g=e*d+n*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=d*x,t[1]=(s*c-u*n)*x,t[2]=(o*n-s*a)*x,t[3]=h*x,t[4]=(u*e-s*l)*x,t[5]=(s*r-o*e)*x,t[6]=f*x,t[7]=(n*l-c*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Bi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(el.makeScale(t,e)),this}rotate(t){return Bi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(el.makeRotation(-t)),this}translate(t,e){return Bi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(el.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};pc.prototype.isMatrix3=!0;var Qt=pc,el=new Qt,qc=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yc=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ed(){let i={enabled:!0,workingColorSpace:er,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ye&&(s.r=Jn(s.r),s.g=Jn(s.g),s.b=Jn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ye&&(s.r=gs(s.r),s.g=gs(s.g),s.b=gs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===jn?nr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Bi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Bi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[er]:{primaries:t,whitePoint:n,transfer:nr,toXYZ:qc,fromXYZ:Yc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ne},outputColorSpaceConfig:{drawingBufferColorSpace:Ne}},[Ne]:{primaries:t,whitePoint:n,transfer:ye,toXYZ:qc,fromXYZ:Yc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ne}}}),i}var ue=Ed();function Jn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ns,wa=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ns===void 0&&(ns=ir("canvas")),ns.width=t.width,ns.height=t.height;let s=ns.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ns}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=ir("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Jn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Jn(e[n]/255)*255):e[n]=Jn(e[n]);return{data:e,width:t.width,height:t.height}}else return $t("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Ad=0,Ms=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=qi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(nl(s[a].image)):r.push(nl(s[a]))}else r=nl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function nl(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?wa.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:($t("Texture: Unable to serialize Texture."),{})}var Cd=0,il=new U,sn=class i extends Rn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Bn,s=Bn,r=Xe,a=bi,o=Sn,l=un,c=i.DEFAULT_ANISOTROPY,u=jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=qi(),this.name="",this.source=new Ms(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(il).x}get height(){return this.source.getSize(il).y}get depth(){return this.source.getSize(il).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){$t(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){$t(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Jl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ma:t.x=t.x-Math.floor(t.x);break;case Bn:t.x=t.x<0?0:1;break;case Sa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ma:t.y=t.y-Math.floor(t.y);break;case Bn:t.y=t.y<0?0:1;break;case Sa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=Jl;sn.DEFAULT_ANISOTROPY=1;var mc=class mc{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let A=(c+1)/2,v=(f+1)/2,b=(p+1)/2,w=(u+h)/4,R=(d+x)/4,y=(g+m)/4;return A>v&&A>b?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=w/n,r=R/n):v>b?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=w/s,r=y/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=R/r,s=y/r),this.set(n,s,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(d-x)/S,this.z=(h-u)/S,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this.w=re(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this.w=re(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};mc.prototype.isVector4=!0;var Ce=mc,Ta=class extends Rn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ce(0,0,t,e),this.scissorTest=!1,this.viewport=new Ce(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new sn(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Xe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ms(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},cn=class extends Ta{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},sr=class extends sn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ea=class extends sn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Ka=class Ka{constructor(t,e,n,s,r,a,o,l,c,u,d,h,f,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,u,d,h,f,g,x,m)}set(t,e,n,s,r,a,o,l,c,u,d,h,f,g,x,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ka().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/is.setFromMatrixColumn(t,0).length(),r=1/is.setFromMatrixColumn(t,1).length(),a=1/is.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let h=a*u,f=a*d,g=o*u,x=o*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=h-x*c,e[9]=-o*l,e[2]=x-h*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){let h=l*u,f=l*d,g=c*u,x=c*d;e[0]=h+x*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*u,e[9]=-o,e[2]=f*o-g,e[6]=x+h*o,e[10]=a*l}else if(t.order==="ZXY"){let h=l*u,f=l*d,g=c*u,x=c*d;e[0]=h-x*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*u,e[9]=x-h*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let h=a*u,f=a*d,g=o*u,x=o*d;e[0]=l*u,e[4]=g*c-f,e[8]=h*c+x,e[1]=l*d,e[5]=x*c+h,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let h=a*l,f=a*c,g=o*l,x=o*c;e[0]=l*u,e[4]=x-h*d,e[8]=g*d+f,e[1]=d,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=f*d+g,e[10]=h-x*d}else if(t.order==="XZY"){let h=a*l,f=a*c,g=o*l,x=o*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=h*d+x,e[5]=a*u,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*u,e[10]=x*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Rd,t,Pd)}lookAt(t,e,n){let s=this.elements;return fn.subVectors(t,e),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),oi.crossVectors(n,fn),oi.lengthSq()===0&&(Math.abs(n.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),oi.crossVectors(n,fn)),oi.normalize(),Xr.crossVectors(fn,oi),s[0]=oi.x,s[4]=Xr.x,s[8]=fn.x,s[1]=oi.y,s[5]=Xr.y,s[9]=fn.y,s[2]=oi.z,s[6]=Xr.z,s[10]=fn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],S=n[3],A=n[7],v=n[11],b=n[15],w=s[0],R=s[4],y=s[8],T=s[12],L=s[1],I=s[5],B=s[9],H=s[13],N=s[2],V=s[6],Z=s[10],D=s[14],X=s[3],G=s[7],k=s[11],tt=s[15];return r[0]=a*w+o*L+l*N+c*X,r[4]=a*R+o*I+l*V+c*G,r[8]=a*y+o*B+l*Z+c*k,r[12]=a*T+o*H+l*D+c*tt,r[1]=u*w+d*L+h*N+f*X,r[5]=u*R+d*I+h*V+f*G,r[9]=u*y+d*B+h*Z+f*k,r[13]=u*T+d*H+h*D+f*tt,r[2]=g*w+x*L+m*N+p*X,r[6]=g*R+x*I+m*V+p*G,r[10]=g*y+x*B+m*Z+p*k,r[14]=g*T+x*H+m*D+p*tt,r[3]=S*w+A*L+v*N+b*X,r[7]=S*R+A*I+v*V+b*G,r[11]=S*y+A*B+v*Z+b*k,r[15]=S*T+A*H+v*D+b*tt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],d=t[6],h=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15],S=l*f-c*h,A=o*f-c*d,v=o*h-l*d,b=a*f-c*u,w=a*h-l*u,R=a*d-o*u;return e*(x*S-m*A+p*v)-n*(g*S-m*b+p*w)+s*(g*A-x*b+p*R)-r*(g*v-x*w+m*R)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],u=t[10];return e*(a*u-o*c)-n*(r*u-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=t[9],h=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],S=e*o-n*a,A=e*l-s*a,v=e*c-r*a,b=n*l-s*o,w=n*c-r*o,R=s*c-r*l,y=u*x-d*g,T=u*m-h*g,L=u*p-f*g,I=d*m-h*x,B=d*p-f*x,H=h*p-f*m,N=S*H-A*B+v*I+b*L-w*T+R*y;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/N;return t[0]=(o*H-l*B+c*I)*V,t[1]=(s*B-n*H-r*I)*V,t[2]=(x*R-m*w+p*b)*V,t[3]=(h*w-d*R-f*b)*V,t[4]=(l*L-a*H-c*T)*V,t[5]=(e*H-s*L+r*T)*V,t[6]=(m*v-g*R-p*A)*V,t[7]=(u*R-h*v+f*A)*V,t[8]=(a*B-o*L+c*y)*V,t[9]=(n*L-e*B-r*y)*V,t[10]=(g*w-x*v+p*S)*V,t[11]=(d*v-u*w-f*S)*V,t[12]=(o*T-a*I-l*y)*V,t[13]=(e*I-n*T+s*y)*V,t[14]=(x*A-g*b-m*S)*V,t[15]=(u*b-d*A+h*S)*V,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,d=o+o,h=r*c,f=r*u,g=r*d,x=a*u,m=a*d,p=o*d,S=l*c,A=l*u,v=l*d,b=n.x,w=n.y,R=n.z;return s[0]=(1-(x+p))*b,s[1]=(f+v)*b,s[2]=(g-A)*b,s[3]=0,s[4]=(f-v)*w,s[5]=(1-(h+p))*w,s[6]=(m+S)*w,s[7]=0,s[8]=(g+A)*R,s[9]=(m-S)*R,s[10]=(1-(h+x))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=is.set(s[0],s[1],s[2]).length(),o=is.set(s[4],s[5],s[6]).length(),l=is.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Tn.copy(this);let c=1/a,u=1/o,d=1/l;return Tn.elements[0]*=c,Tn.elements[1]*=c,Tn.elements[2]*=c,Tn.elements[4]*=u,Tn.elements[5]*=u,Tn.elements[6]*=u,Tn.elements[8]*=d,Tn.elements[9]*=d,Tn.elements[10]*=d,e.setFromRotationMatrix(Tn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=Cn,l=!1){let c=this.elements,u=2*r/(e-t),d=2*r/(n-s),h=(e+t)/(e-t),f=(n+s)/(n-s),g,x;if(l)g=r/(a-r),x=a*r/(a-r);else if(o===Cn)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===xs)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Cn,l=!1){let c=this.elements,u=2/(e-t),d=2/(n-s),h=-(e+t)/(e-t),f=-(n+s)/(n-s),g,x;if(l)g=1/(a-r),x=a/(a-r);else if(o===Cn)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===xs)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Ka.prototype.isMatrix4=!0;var Ae=Ka,is=new U,Tn=new Ae,Rd=new U(0,0,0),Pd=new U(1,1,1),oi=new U,Xr=new U,fn=new U,Zc=new Ae,$c=new Ie,Kn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(re(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-re(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(re(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-re(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(re(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-re(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:$t("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Zc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Zc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return $c.setFromEuler(this),this.setFromQuaternion($c,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Kn.DEFAULT_ORDER="XYZ";var Ss=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Id=0,Jc=new U,ss=new Ie,Xn=new Ae,qr=new U,Xs=new U,Ld=new U,Dd=new Ie,Kc=new U(1,0,0),jc=new U(0,1,0),Qc=new U(0,0,1),th={type:"added"},Nd={type:"removed"},rs={type:"childadded",child:null},sl={type:"childremoved",child:null},je=class i extends Rn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Id++}),this.uuid=qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new U,e=new Kn,n=new Ie,s=new U(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ae},normalMatrix:{value:new Qt}}),this.matrix=new Ae,this.matrixWorld=new Ae,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ss,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.multiply(ss),this}rotateOnWorldAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.premultiply(ss),this}rotateX(t){return this.rotateOnAxis(Kc,t)}rotateY(t){return this.rotateOnAxis(jc,t)}rotateZ(t){return this.rotateOnAxis(Qc,t)}translateOnAxis(t,e){return Jc.copy(t).applyQuaternion(this.quaternion),this.position.add(Jc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Kc,t)}translateY(t){return this.translateOnAxis(jc,t)}translateZ(t){return this.translateOnAxis(Qc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?qr.copy(t):qr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(Xs,qr,this.up):Xn.lookAt(qr,Xs,this.up),this.quaternion.setFromRotationMatrix(Xn),s&&(Xn.extractRotation(s.matrixWorld),ss.setFromRotationMatrix(Xn),this.quaternion.premultiply(ss.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(th),rs.child=t,this.dispatchEvent(rs),rs.child=null):Jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Nd),sl.child=t,this.dispatchEvent(sl),sl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(th),rs.child=t,this.dispatchEvent(rs),rs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xs,t,Ld),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xs,Dd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),d=a(t.shapes),h=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};je.DEFAULT_UP=new U(0,1,0);je.DEFAULT_MATRIX_AUTO_UPDATE=!0;je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ln=class extends je{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ud={type:"move"},bs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ln,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ln,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ln,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ud)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new ln;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},iu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},Yr={h:0,s:0,l:0};function rl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var te=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ne){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ue.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ue.workingColorSpace){return this.r=t,this.g=e,this.b=n,ue.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ue.workingColorSpace){if(t=ac(t,1),e=re(e,0,1),n=re(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=rl(a,r,t+1/3),this.g=rl(a,r,t),this.b=rl(a,r,t-1/3)}return ue.colorSpaceToWorking(this,s),this}setStyle(t,e=Ne){function n(r){r!==void 0&&parseFloat(r)<1&&$t("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:$t("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);$t("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ne){let n=iu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):$t("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Jn(t.r),this.g=Jn(t.g),this.b=Jn(t.b),this}copyLinearToSRGB(t){return this.r=gs(t.r),this.g=gs(t.g),this.b=gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ne){return ue.workingToColorSpace(Je.copy(this),t),Math.round(re(Je.r*255,0,255))*65536+Math.round(re(Je.g*255,0,255))*256+Math.round(re(Je.b*255,0,255))}getHexString(t=Ne){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ue.workingColorSpace){ue.workingToColorSpace(Je.copy(this),e);let n=Je.r,s=Je.g,r=Je.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=ue.workingColorSpace){return ue.workingToColorSpace(Je.copy(this),e),t.r=Je.r,t.g=Je.g,t.b=Je.b,t}getStyle(t=Ne){ue.workingToColorSpace(Je.copy(this),t);let e=Je.r,n=Je.g,s=Je.b;return t!==Ne?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(li),this.setHSL(li.h+t,li.s+e,li.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(li),t.getHSL(Yr);let n=Ks(li.h,Yr.h,e),s=Ks(li.s,Yr.s,e),r=Ks(li.l,Yr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Je=new te;te.NAMES=iu;var rr=class extends je{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Kn,this.environmentIntensity=1,this.environmentRotation=new Kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},En=new U,qn=new U,al=new U,Yn=new U,as=new U,os=new U,eh=new U,ol=new U,ll=new U,cl=new U,hl=new Ce,ul=new Ce,dl=new Ce,di=class i{constructor(t=new U,e=new U,n=new U){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),En.subVectors(t,e),s.cross(En);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){En.subVectors(s,e),qn.subVectors(n,e),al.subVectors(t,e);let a=En.dot(En),o=En.dot(qn),l=En.dot(al),c=qn.dot(qn),u=qn.dot(al),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let h=1/d,f=(c*l-o*u)*h,g=(a*u-o*l)*h;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Yn)===null?!1:Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Yn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Yn.x),l.addScaledVector(a,Yn.y),l.addScaledVector(o,Yn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return hl.setScalar(0),ul.setScalar(0),dl.setScalar(0),hl.fromBufferAttribute(t,e),ul.fromBufferAttribute(t,n),dl.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(hl,r.x),a.addScaledVector(ul,r.y),a.addScaledVector(dl,r.z),a}static isFrontFacing(t,e,n,s){return En.subVectors(n,e),qn.subVectors(t,e),En.cross(qn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return En.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),En.cross(qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;as.subVectors(s,n),os.subVectors(r,n),ol.subVectors(t,n);let l=as.dot(ol),c=os.dot(ol);if(l<=0&&c<=0)return e.copy(n);ll.subVectors(t,s);let u=as.dot(ll),d=os.dot(ll);if(u>=0&&d<=u)return e.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(as,a);cl.subVectors(t,r);let f=as.dot(cl),g=os.dot(cl);if(g>=0&&f<=g)return e.copy(r);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(os,o);let m=u*g-f*d;if(m<=0&&d-u>=0&&f-g>=0)return eh.subVectors(r,s),o=(d-u)/(d-u+(f-g)),e.copy(s).addScaledVector(eh,o);let p=1/(m+x+h);return a=x*p,o=h*p,e.copy(n).addScaledVector(as,a).addScaledVector(os,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},fi=class{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(An.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(An.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=An.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,An):An.fromBufferAttribute(r,a),An.applyMatrix4(t.matrixWorld),this.expandByPoint(An);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Zr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Zr.copy(n.boundingBox)),Zr.applyMatrix4(t.matrixWorld),this.union(Zr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,An),An.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(qs),$r.subVectors(this.max,qs),ls.subVectors(t.a,qs),cs.subVectors(t.b,qs),hs.subVectors(t.c,qs),ci.subVectors(cs,ls),hi.subVectors(hs,cs),Di.subVectors(ls,hs);let e=[0,-ci.z,ci.y,0,-hi.z,hi.y,0,-Di.z,Di.y,ci.z,0,-ci.x,hi.z,0,-hi.x,Di.z,0,-Di.x,-ci.y,ci.x,0,-hi.y,hi.x,0,-Di.y,Di.x,0];return!fl(e,ls,cs,hs,$r)||(e=[1,0,0,0,1,0,0,0,1],!fl(e,ls,cs,hs,$r))?!1:(Jr.crossVectors(ci,hi),e=[Jr.x,Jr.y,Jr.z],fl(e,ls,cs,hs,$r))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,An).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(An).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Zn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Zn=[new U,new U,new U,new U,new U,new U,new U,new U],An=new U,Zr=new fi,ls=new U,cs=new U,hs=new U,ci=new U,hi=new U,Di=new U,qs=new U,$r=new U,Jr=new U,Ni=new U;function fl(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ni.fromArray(i,r);let o=s.x*Math.abs(Ni.x)+s.y*Math.abs(Ni.y)+s.z*Math.abs(Ni.z),l=t.dot(Ni),c=e.dot(Ni),u=n.dot(Ni);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var De=new U,Kr=new ut,Fd=0,nn=class extends Rn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Fd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=jh,this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Kr.fromBufferAttribute(this,e),Kr.applyMatrix3(t),this.setXY(e,Kr.x,Kr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyMatrix3(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyMatrix4(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyNormalMatrix(t),this.setXYZ(e,De.x,De.y,De.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.transformDirection(t),this.setXYZ(e,De.x,De.y,De.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ms(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=en(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ms(e,this.array)),e}setX(t,e){return this.normalized&&(e=en(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ms(e,this.array)),e}setY(t,e){return this.normalized&&(e=en(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ms(e,this.array)),e}setZ(t,e){return this.normalized&&(e=en(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ms(e,this.array)),e}setW(t,e){return this.normalized&&(e=en(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=en(e,this.array),n=en(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=en(e,this.array),n=en(n,this.array),s=en(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=en(e,this.array),n=en(n,this.array),s=en(s,this.array),r=en(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var ar=class extends nn{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var or=class extends nn{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var me=class extends nn{constructor(t,e,n){super(new Float32Array(t),e,n)}},Od=new fi,Ys=new U,pl=new U,ws=class{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Od.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ys.subVectors(t,this.center);let e=Ys.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ys,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(pl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ys.copy(t.center).add(pl)),this.expandByPoint(Ys.copy(t.center).sub(pl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Bd=0,Mn=new Ae,ml=new je,us=new U,pn=new fi,Zs=new fi,Ve=new U,Oe=class i extends Rn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bd++}),this.uuid=qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ld(t)?or:ar)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Mn.makeRotationFromQuaternion(t),this.applyMatrix4(Mn),this}rotateX(t){return Mn.makeRotationX(t),this.applyMatrix4(Mn),this}rotateY(t){return Mn.makeRotationY(t),this.applyMatrix4(Mn),this}rotateZ(t){return Mn.makeRotationZ(t),this.applyMatrix4(Mn),this}translate(t,e,n){return Mn.makeTranslation(t,e,n),this.applyMatrix4(Mn),this}scale(t,e,n){return Mn.makeScale(t,e,n),this.applyMatrix4(Mn),this}lookAt(t){return ml.lookAt(t),ml.updateMatrix(),this.applyMatrix4(ml.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new me(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&$t("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];pn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ve.addVectors(this.boundingBox.min,pn.min),this.boundingBox.expandByPoint(Ve),Ve.addVectors(this.boundingBox.max,pn.max),this.boundingBox.expandByPoint(Ve)):(this.boundingBox.expandByPoint(pn.min),this.boundingBox.expandByPoint(pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ws);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){let n=this.boundingSphere.center;if(pn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Zs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ve.addVectors(pn.min,Zs.min),pn.expandByPoint(Ve),Ve.addVectors(pn.max,Zs.max),pn.expandByPoint(Ve)):(pn.expandByPoint(Zs.min),pn.expandByPoint(Zs.max))}pn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ve.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ve));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ve.fromBufferAttribute(o,c),l&&(us.fromBufferAttribute(t,c),Ve.add(us)),s=Math.max(s,n.distanceToSquared(Ve))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new nn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let y=0;y<n.count;y++)o[y]=new U,l[y]=new U;let c=new U,u=new U,d=new U,h=new ut,f=new ut,g=new ut,x=new U,m=new U;function p(y,T,L){c.fromBufferAttribute(n,y),u.fromBufferAttribute(n,T),d.fromBufferAttribute(n,L),h.fromBufferAttribute(r,y),f.fromBufferAttribute(r,T),g.fromBufferAttribute(r,L),u.sub(c),d.sub(c),f.sub(h),g.sub(h);let I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(I),m.copy(d).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(I),o[y].add(x),o[T].add(x),o[L].add(x),l[y].add(m),l[T].add(m),l[L].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let y=0,T=S.length;y<T;++y){let L=S[y],I=L.start,B=L.count;for(let H=I,N=I+B;H<N;H+=3)p(t.getX(H+0),t.getX(H+1),t.getX(H+2))}let A=new U,v=new U,b=new U,w=new U;function R(y){b.fromBufferAttribute(s,y),w.copy(b);let T=o[y];A.copy(T),A.sub(b.multiplyScalar(b.dot(T))).normalize(),v.crossVectors(w,T);let I=v.dot(l[y])<0?-1:1;a.setXYZW(y,A.x,A.y,A.z,I)}for(let y=0,T=S.length;y<T;++y){let L=S[y],I=L.start,B=L.count;for(let H=I,N=I+B;H<N;H+=3)R(t.getX(H+0)),R(t.getX(H+1)),R(t.getX(H+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new nn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);let s=new U,r=new U,a=new U,o=new U,l=new U,c=new U,u=new U,d=new U;if(t)for(let h=0,f=t.count;h<f;h+=3){let g=t.getX(h+0),x=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=e.count;h<f;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ve.fromBufferAttribute(t,e),Ve.normalize(),t.setXYZ(e,Ve.x,Ve.y,Ve.z)}toNonIndexed(){function t(o,l){let c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u),f=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*u;for(let p=0;p<u;p++)h[g++]=c[f++]}return new nn(h,u,d)}if(this.index===null)return $t("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){let h=c[u],f=t(h,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let f=c[d];u.push(f.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(e))}let r=t.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var gl=new U,zd=new U,kd=new Qt,mn=class{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=gl.subVectors(n,e).cross(zd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(gl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||kd.getNormalMatrix(t),s=this.coplanarPoint(gl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Vd=0,pi=class extends Rn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=qi(),this.name="",this.type="Material",this.blending=Ds,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kl,this.blendDst=Vl,this.blendEquation=Wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=_s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fa,this.stencilZFail=fa,this.stencilZPass=fa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){$t(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){$t(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new te().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new mn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ut().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ut().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var $n=new U,_l=new U,jr=new U,Qr=new U,zi=class{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,$n)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=$n.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):($n.copy(this.origin).addScaledVector(this.direction,e),$n.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){_l.copy(t).add(e).multiplyScalar(.5),jr.copy(e).sub(t).normalize(),Qr.copy(this.origin).sub(_l);let r=t.distanceTo(e)*.5,a=-this.direction.dot(jr),o=Qr.dot(this.direction),l=-Qr.dot(jr),c=Qr.lengthSq(),u=Math.abs(1-a*a),d,h,f,g;if(u>0)if(d=a*l-o,h=a*o-l,g=r*u,d>=0)if(h>=-g)if(h<=g){let x=1/u;d*=x,h*=x,f=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(_l).addScaledVector(jr,h),f}intersectSphere(t,e){if(t.radius<0)return null;$n.subVectors(t.center,this.origin);let n=$n.dot(this.direction),s=$n.dot($n)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(n=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(o=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,$n)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,d=t.x-a.x,h=t.y-a.y,f=t.z-a.z,g=e.x-a.x,x=e.y-a.y,m=e.z-a.z,p=n.x-a.x,S=n.y-a.y,A=n.z-a.z,v=Math.abs(l),b=Math.abs(c),w=Math.abs(u),R,y,T,L,I,B,H,N,V,Z,D,X;if(v>=b&&v>=w?(T=l,B=d,V=g,X=p,l>=0?(R=c,y=u,L=h,I=f,H=x,N=m,Z=S,D=A):(R=u,y=c,L=f,I=h,H=m,N=x,Z=A,D=S)):b>=w?(T=c,B=h,V=x,X=S,c>=0?(R=u,y=l,L=f,I=d,H=m,N=g,Z=A,D=p):(R=l,y=u,L=d,I=f,H=g,N=m,Z=p,D=A)):(T=u,B=f,V=m,X=A,u>=0?(R=l,y=c,L=d,I=h,H=g,N=x,Z=p,D=S):(R=c,y=l,L=h,I=d,H=x,N=g,Z=S,D=p)),T===0)return null;let G=R/T,k=y/T,tt=1/T,Tt=L-G*B,yt=I-k*B,ee=H-G*V,Kt=N-k*V,Yt=Z-G*X,K=D-k*X,it=Yt*Kt-K*ee,pt=Tt*K-yt*Yt,Dt=ee*yt-Kt*Tt;if(s){if(it<0||pt<0||Dt<0)return null}else if((it<0||pt<0||Dt<0)&&(it>0||pt>0||Dt>0))return null;let xt=it+pt+Dt;if(xt===0)return null;let Vt=tt*(it*B+pt*V+Dt*X);return(xt>0?Vt<0:Vt>0)?null:this.at(Vt/xt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},lr=class extends pi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.combine=Gl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},nh=new Ae,Ui=new zi,ta=new ws,ih=new U,ea=new U,na=new U,ia=new U,xl=new U,sa=new U,sh=new U,ra=new U,ae=class extends je{constructor(t=new Oe,e=new lr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){sa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],d=r[l];u!==0&&(xl.fromBufferAttribute(d,t),a?sa.addScaledVector(xl,u):sa.addScaledVector(xl.sub(e),u))}e.add(sa)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ta.copy(n.boundingSphere),ta.applyMatrix4(r),Ui.copy(t.ray).recast(t.near),!(ta.containsPoint(Ui.origin)===!1&&(Ui.intersectSphere(ta,ih)===null||Ui.origin.distanceToSquared(ih)>(t.far-t.near)**2))&&(nh.copy(r).invert(),Ui.copy(t.ray).applyMatrix4(nh),!(n.boundingBox!==null&&Ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ui)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){let m=h[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),A=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=S,b=A;v<b;v+=3){let w=o.getX(v),R=o.getX(v+1),y=o.getX(v+2);s=aa(this,p,t,n,c,u,d,w,R,y),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let S=o.getX(m),A=o.getX(m+1),v=o.getX(m+2);s=aa(this,a,t,n,c,u,d,S,A,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){let m=h[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),A=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=S,b=A;v<b;v+=3){let w=v,R=v+1,y=v+2;s=aa(this,p,t,n,c,u,d,w,R,y),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let S=m,A=m+1,v=m+2;s=aa(this,a,t,n,c,u,d,S,A,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Gd(i,t,e,n,s,r,a,o){let l;if(t.side===an?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Mi,o),l===null)return null;ra.copy(o),ra.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(ra);return c<e.near||c>e.far?null:{distance:c,point:ra.clone(),object:i}}function aa(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,ea),i.getVertexPosition(l,na),i.getVertexPosition(c,ia);let u=Gd(i,t,e,n,ea,na,ia,sh);if(u){let d=new U;di.getBarycoord(sh,ea,na,ia,d),s&&(u.uv=di.getInterpolatedAttribute(s,o,l,c,d,new ut)),r&&(u.uv1=di.getInterpolatedAttribute(r,o,l,c,d,new ut)),a&&(u.normal=di.getInterpolatedAttribute(a,o,l,c,d,new U),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new U,materialIndex:0};di.getNormal(ea,na,ia,h.normal),u.face=h,u.barycoord=d}return u}var Aa=class extends sn{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Ge,u=Ge,d,h){super(null,a,o,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Fi=new ws,Hd=new ut(.5,.5),oa=new U,Ts=class{constructor(t=new mn,e=new mn,n=new mn,s=new mn,r=new mn,a=new mn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Cn,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],f=r[7],g=r[8],x=r[9],m=r[10],p=r[11],S=r[12],A=r[13],v=r[14],b=r[15];if(s[0].setComponents(c-a,f-u,p-g,b-S).normalize(),s[1].setComponents(c+a,f+u,p+g,b+S).normalize(),s[2].setComponents(c+o,f+d,p+x,b+A).normalize(),s[3].setComponents(c-o,f-d,p-x,b-A).normalize(),n)s[4].setComponents(l,h,m,v).normalize(),s[5].setComponents(c-l,f-h,p-m,b-v).normalize();else if(s[4].setComponents(c-l,f-h,p-m,b-v).normalize(),e===Cn)s[5].setComponents(c+l,f+h,p+m,b+v).normalize();else if(e===xs)s[5].setComponents(l,h,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Fi)}intersectsSprite(t){Fi.center.set(0,0,0);let e=Hd.distanceTo(t.center);return Fi.radius=.7071067811865476+e,Fi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Fi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(oa.x=s.normal.x>0?t.max.x:t.min.x,oa.y=s.normal.y>0?t.max.y:t.min.y,oa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(oa)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var cr=class extends sn{constructor(t=[],e=Si,n,s,r,a,o,l,c,u){super(t,e,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},kn=class extends sn{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var mi=class extends sn{constructor(t,e,n=Ln,s,r,a,o=Ge,l=Ge,c,u=zn,d=1){if(u!==zn&&u!==wi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:d};super(h,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ms(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Ca=class extends mi{constructor(t,e=Ln,n=Si,s,r,a=Ge,o=Ge,l,c=zn){let u={width:t,height:t,depth:1},d=[u,u,u,u,u,u];super(t,t,e,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},hr=class extends sn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},rn=class i extends Oe{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],d=[],h=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new me(c,3)),this.setAttribute("normal",new me(u,3)),this.setAttribute("uv",new me(d,2));function g(x,m,p,S,A,v,b,w,R,y,T){let L=v/R,I=b/y,B=v/2,H=b/2,N=w/2,V=R+1,Z=y+1,D=0,X=0,G=new U;for(let k=0;k<Z;k++){let tt=k*I-H;for(let Tt=0;Tt<V;Tt++){let yt=Tt*L-B;G[x]=yt*S,G[m]=tt*A,G[p]=N,c.push(G.x,G.y,G.z),G[x]=0,G[m]=0,G[p]=w>0?1:-1,u.push(G.x,G.y,G.z),d.push(Tt/R),d.push(1-k/y),D+=1}}for(let k=0;k<y;k++)for(let tt=0;tt<R;tt++){let Tt=h+tt+V*k,yt=h+tt+V*(k+1),ee=h+(tt+1)+V*(k+1),Kt=h+(tt+1)+V*k;l.push(Tt,yt,Kt),l.push(yt,ee,Kt),X+=6}o.addGroup(f,X,T),f+=X,h+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var ur=class i extends Oe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new U,u=new ut;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=e;d++,h+=3){let f=n+d/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/t+1)/2,u.y=(a[h+1]/t+1)/2,l.push(u.x,u.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new me(a,3)),this.setAttribute("normal",new me(o,3)),this.setAttribute("uv",new me(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Vn=class i extends Oe{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],h=[],f=[],g=0,x=[],m=n/2,p=0;S(),a===!1&&(t>0&&A(!0),e>0&&A(!1)),this.setIndex(u),this.setAttribute("position",new me(d,3)),this.setAttribute("normal",new me(h,3)),this.setAttribute("uv",new me(f,2));function S(){let v=new U,b=new U,w=0,R=(e-t)/n;for(let y=0;y<=r;y++){let T=[],L=y/r,I=L*(e-t)+t;for(let B=0;B<=s;B++){let H=B/s,N=H*l+o,V=Math.sin(N),Z=Math.cos(N);b.x=I*V,b.y=-L*n+m,b.z=I*Z,d.push(b.x,b.y,b.z),v.set(V,R,Z).normalize(),h.push(v.x,v.y,v.z),f.push(H,1-L),T.push(g++)}x.push(T)}for(let y=0;y<s;y++)for(let T=0;T<r;T++){let L=x[T][y],I=x[T+1][y],B=x[T+1][y+1],H=x[T][y+1];(t>0||T!==0)&&(u.push(L,I,H),w+=3),(e>0||T!==r-1)&&(u.push(I,B,H),w+=3)}c.addGroup(p,w,0),p+=w}function A(v){let b=g,w=new ut,R=new U,y=0,T=v===!0?t:e,L=v===!0?1:-1;for(let B=1;B<=s;B++)d.push(0,m*L,0),h.push(0,L,0),f.push(.5,.5),g++;let I=g;for(let B=0;B<=s;B++){let N=B/s*l+o,V=Math.cos(N),Z=Math.sin(N);R.x=T*Z,R.y=m*L,R.z=T*V,d.push(R.x,R.y,R.z),h.push(0,L,0),w.x=V*.5+.5,w.y=Z*.5*L+.5,f.push(w.x,w.y),g++}for(let B=0;B<s;B++){let H=b+B,N=I+B;v===!0?u.push(N,N+1,H):u.push(N+1,N,H),y+=3}c.addGroup(p,y,v===!0?1:2),p+=y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var gn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){$t("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let u=n[s],h=n[s+1]-u,f=(a-u)/h;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new ut:new U);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new U,s=[],r=[],a=[],o=new U,l=new Ae;for(let f=0;f<=t;f++){let g=f/t;s[f]=this.getTangentAt(g,new U)}r[0]=new U,a[0]=new U;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(re(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(re(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Es=class extends gn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ut){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Ra=class extends Es{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function oc(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,d){let h=(a-r)/c-(o-r)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+d)+(l-o)/d;h*=u,f*=u,s(a,o,h,f)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var rh=new U,ah=new U,yl=new oc,vl=new oc,Ml=new oc,Pa=class extends gn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new U){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(ah.subVectors(s[0],s[1]).add(s[0]),c=ah);let d=s[o%r],h=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(rh.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=rh),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(h),f),m=Math.pow(h.distanceToSquared(u),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),yl.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,g,x,m),vl.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,g,x,m),Ml.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,g,x,m)}else this.curveType==="catmullrom"&&(yl.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),vl.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),Ml.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return n.set(yl.calc(l),vl.calc(l),Ml.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new U().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function oh(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function Wd(i,t){let e=1-i;return e*e*t}function Xd(i,t){return 2*(1-i)*i*t}function qd(i,t){return i*i*t}function js(i,t,e,n){return Wd(i,t)+Xd(i,e)+qd(i,n)}function Yd(i,t){let e=1-i;return e*e*e*t}function Zd(i,t){let e=1-i;return 3*e*e*i*t}function $d(i,t){return 3*(1-i)*i*i*t}function Jd(i,t){return i*i*i*t}function Qs(i,t,e,n,s){return Yd(i,t)+Zd(i,e)+$d(i,n)+Jd(i,s)}var dr=class extends gn{constructor(t=new ut,e=new ut,n=new ut,s=new ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ut){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Qs(t,s.x,r.x,a.x,o.x),Qs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ia=class extends gn{constructor(t=new U,e=new U,n=new U,s=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new U){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Qs(t,s.x,r.x,a.x,o.x),Qs(t,s.y,r.y,a.y,o.y),Qs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},fr=class extends gn{constructor(t=new ut,e=new ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ut){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},La=class extends gn{constructor(t=new U,e=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new U){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new U){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},pr=class extends gn{constructor(t=new ut,e=new ut,n=new ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ut){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(js(t,s.x,r.x,a.x),js(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Da=class extends gn{constructor(t=new U,e=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new U){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(js(t,s.x,r.x,a.x),js(t,s.y,r.y,a.y),js(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},mr=class extends gn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ut){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(oh(o,l.x,c.x,u.x,d.x),oh(o,l.y,c.y,u.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new ut().fromArray(s))}return this}},Cl=Object.freeze({__proto__:null,ArcCurve:Ra,CatmullRomCurve3:Pa,CubicBezierCurve:dr,CubicBezierCurve3:Ia,EllipseCurve:Es,LineCurve:fr,LineCurve3:La,QuadraticBezierCurve:pr,QuadraticBezierCurve3:Da,SplineCurve:mr}),Na=class extends gn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Cl[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let u=l[c];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Cl[s.type]().fromJSON(s))}return this}},gr=class extends Na{constructor(t){super(),this.type="Path",this.currentPoint=new ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new fr(this.currentPoint.clone(),new ut(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new pr(this.currentPoint.clone(),new ut(t,e),new ut(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new dr(this.currentPoint.clone(),new ut(t,e),new ut(n,s),new ut(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new mr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){let c=new Es(t,e,n,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},ki=class extends gr{constructor(t){super(t),this.uuid=qi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new gr().fromJSON(s))}return this}};function Kd(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=su(i,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=nf(i,t,r,e)),i.length>80*e){o=i[0],l=i[1];let u=o,d=l;for(let h=e;h<s;h+=e){let f=i[h],g=i[h+1];f<o&&(o=f),g<l&&(l=g),f>u&&(u=f),g>d&&(d=g)}c=Math.max(u-o,d-l),c=c!==0?32767/c:0}return _r(r,a,e,o,l,c,0),a}function su(i,t,e,n,s){let r;if(s===pf(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=lh(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=lh(a/n|0,i[a],i[a+1],r);return r&&As(r,r.next)&&(yr(r),r=r.next),r}function Vi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(As(e,e.next)||Re(e.prev,e,e.next)===0)){if(yr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function _r(i,t,e,n,s,r,a){if(!i)return;!a&&r&&lf(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Qd(i,n,s,r):jd(i)){t.push(l.i,i.i,c.i),yr(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=tf(Vi(i),t),_r(i,t,e,n,s,r,2)):a===2&&ef(i,t,e,n,s,r):_r(Vi(i),t,e,n,s,r,1);break}}}function jd(i){let t=i.prev,e=i,n=i.next;if(Re(t,e,n)>=0)return!1;let s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,u=Math.min(s,r,a),d=Math.min(o,l,c),h=Math.max(s,r,a),f=Math.max(o,l,c),g=n.next;for(;g!==t;){if(g.x>=u&&g.x<=h&&g.y>=d&&g.y<=f&&$s(s,o,r,l,a,c,g.x,g.y)&&Re(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Qd(i,t,e,n){let s=i.prev,r=i,a=i.next;if(Re(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,u=s.y,d=r.y,h=a.y,f=Math.min(o,l,c),g=Math.min(u,d,h),x=Math.max(o,l,c),m=Math.max(u,d,h),p=Rl(f,g,t,e,n),S=Rl(x,m,t,e,n),A=i.prevZ,v=i.nextZ;for(;A&&A.z>=p&&v&&v.z<=S;){if(A.x>=f&&A.x<=x&&A.y>=g&&A.y<=m&&A!==s&&A!==a&&$s(o,u,l,d,c,h,A.x,A.y)&&Re(A.prev,A,A.next)>=0||(A=A.prevZ,v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==a&&$s(o,u,l,d,c,h,v.x,v.y)&&Re(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;A&&A.z>=p;){if(A.x>=f&&A.x<=x&&A.y>=g&&A.y<=m&&A!==s&&A!==a&&$s(o,u,l,d,c,h,A.x,A.y)&&Re(A.prev,A,A.next)>=0)return!1;A=A.prevZ}for(;v&&v.z<=S;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==a&&$s(o,u,l,d,c,h,v.x,v.y)&&Re(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function tf(i,t){let e=i;do{let n=e.prev,s=e.next.next;!As(n,s)&&au(n,e,e.next,s)&&xr(n,s)&&xr(s,n)&&(t.push(n.i,e.i,s.i),yr(e),yr(e.next),e=i=s),e=e.next}while(e!==i);return Vi(e)}function ef(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&uf(a,o)){let l=ou(a,o);a=Vi(a,a.next),l=Vi(l,l.next),_r(a,t,e,n,s,r,0),_r(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function nf(i,t,e,n){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=su(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(hf(c))}s.sort(sf);for(let r=0;r<s.length;r++)e=rf(s[r],e);return e}function sf(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function rf(i,t){let e=af(i,t);if(!e)return t;let n=ou(e,i);return Vi(n,n.next),Vi(e,e.next)}function af(i,t){let e=t,n=i.x,s=i.y,r=-1/0,a;if(As(i,e))return e;do{if(As(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let d=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>r&&(r=d,a=e.x<e.next.x?e:e.next,d===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,u=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&ru(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){let d=Math.abs(s-e.y)/(n-e.x);xr(e,i)&&(d<u||d===u&&(e.x>a.x||e.x===a.x&&of(a,e)))&&(a=e,u=d)}e=e.next}while(e!==o);return a}function of(i,t){return Re(i.prev,i,t.prev)<0&&Re(t.next,i,i.next)<0}function lf(i,t,e,n){let s=i;do s.z===0&&(s.z=Rl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,cf(s)}function cf(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function Rl(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function hf(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function ru(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function $s(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&ru(i,t,e,n,s,r,a,o)}function uf(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!df(i,t)&&(xr(i,t)&&xr(t,i)&&ff(i,t)&&(Re(i.prev,i,t.prev)||Re(i,t.prev,t))||As(i,t)&&Re(i.prev,i,i.next)>0&&Re(t.prev,t,t.next)>0)}function Re(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function As(i,t){return i.x===t.x&&i.y===t.y}function au(i,t,e,n){let s=ca(Re(i,t,e)),r=ca(Re(i,t,n)),a=ca(Re(e,n,i)),o=ca(Re(e,n,t));return!!(s!==r&&a!==o||s===0&&la(i,e,t)||r===0&&la(i,n,t)||a===0&&la(e,i,n)||o===0&&la(e,t,n))}function la(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function ca(i){return i>0?1:i<0?-1:0}function df(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&au(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function xr(i,t){return Re(i.prev,i,i.next)<0?Re(i,t,i.next)>=0&&Re(i,i.prev,t)>=0:Re(i,t,i.prev)<0||Re(i,i.next,t)<0}function ff(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function ou(i,t){let e=Pl(i.i,i.x,i.y),n=Pl(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function lh(i,t,e,n){let s=Pl(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function yr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Pl(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function pf(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Il=class{static triangulate(t,e,n=2){return Kd(t,e,n)}},Oi=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];ch(t),hh(n,t);let a=t.length;e.forEach(ch);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,hh(n,e[l]);let o=Il.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function ch(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function hh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Cs=class i extends Oe{constructor(t=new ki([new ut(.5,.5),new ut(-.5,.5),new ut(-.5,-.5),new ut(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new me(s,3)),this.setAttribute("uv",new me(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,h=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:mf,A,v=!1,b,w,R,y;if(p){A=p.getSpacedPoints(u),v=!0,h=!1;let j=p.isCatmullRomCurve3?p.closed:!1;b=p.computeFrenetFrames(u,j),w=new U,R=new U,y=new U}h||(m=0,f=0,g=0,x=0);let T=o.extractPoints(c),L=T.shape,I=T.holes;if(!Oi.isClockWise(L)){L=L.reverse();for(let j=0,at=I.length;j<at;j++){let dt=I[j];Oi.isClockWise(dt)&&(I[j]=dt.reverse())}}function H(j){let dt=10000000000000001e-36,ht=j[0];for(let _t=1;_t<=j.length;_t++){let Xt=_t%j.length,Nt=j[Xt],mt=Nt.x-ht.x,$=Nt.y-ht.y,C=mt*mt+$*$,ce=Math.max(Math.abs(Nt.x),Math.abs(Nt.y),Math.abs(ht.x),Math.abs(ht.y)),ie=dt*ce*ce;if(C<=ie){j.splice(Xt,1),_t--;continue}ht=Nt}}H(L),I.forEach(H);let N=I.length,V=L;for(let j=0;j<N;j++){let at=I[j];L=L.concat(at)}function Z(j,at,dt){return at||Jt("ExtrudeGeometry: vec does not exist"),j.clone().addScaledVector(at,dt)}let D=L.length;function X(j,at,dt){let ht,_t,Xt,Nt=j.x-at.x,mt=j.y-at.y,$=dt.x-j.x,C=dt.y-j.y,ce=Nt*Nt+mt*mt,ie=Nt*C-mt*$;if(Math.abs(ie)>Number.EPSILON){let E=Math.sqrt(ce),_=Math.sqrt($*$+C*C),z=at.x-mt/E,q=at.y+Nt/E,Q=dt.x-C/_,lt=dt.y+$/_,ft=((Q-z)*C-(lt-q)*$)/(Nt*C-mt*$);ht=z+Nt*ft-j.x,_t=q+mt*ft-j.y;let et=ht*ht+_t*_t;if(et<=2)return new ut(ht,_t);Xt=Math.sqrt(et/2)}else{let E=!1;Nt>Number.EPSILON?$>Number.EPSILON&&(E=!0):Nt<-Number.EPSILON?$<-Number.EPSILON&&(E=!0):Math.sign(mt)===Math.sign(C)&&(E=!0),E?(ht=-mt,_t=Nt,Xt=Math.sqrt(ce)):(ht=Nt,_t=mt,Xt=Math.sqrt(ce/2))}return new ut(ht/Xt,_t/Xt)}let G=[];for(let j=0,at=V.length,dt=at-1,ht=j+1;j<at;j++,dt++,ht++)dt===at&&(dt=0),ht===at&&(ht=0),G[j]=X(V[j],V[dt],V[ht]);let k=[],tt,Tt=G.concat();for(let j=0,at=N;j<at;j++){let dt=I[j];tt=[];for(let ht=0,_t=dt.length,Xt=_t-1,Nt=ht+1;ht<_t;ht++,Xt++,Nt++)Xt===_t&&(Xt=0),Nt===_t&&(Nt=0),tt[ht]=X(dt[ht],dt[Xt],dt[Nt]);k.push(tt),Tt=Tt.concat(tt)}let yt;if(m===0)yt=Oi.triangulateShape(V,I);else{let j=[],at=[];for(let dt=0;dt<m;dt++){let ht=dt/m,_t=f*Math.cos(ht*Math.PI/2),Xt=g*Math.sin(ht*Math.PI/2)+x;for(let Nt=0,mt=V.length;Nt<mt;Nt++){let $=Z(V[Nt],G[Nt],Xt);pt($.x,$.y,-_t),ht===0&&j.push($)}for(let Nt=0,mt=N;Nt<mt;Nt++){let $=I[Nt];tt=k[Nt];let C=[];for(let ce=0,ie=$.length;ce<ie;ce++){let E=Z($[ce],tt[ce],Xt);pt(E.x,E.y,-_t),ht===0&&C.push(E)}ht===0&&at.push(C)}}yt=Oi.triangulateShape(j,at)}let ee=yt.length,Kt=g+x;for(let j=0;j<D;j++){let at=h?Z(L[j],Tt[j],Kt):L[j];v?(R.copy(b.normals[0]).multiplyScalar(at.x),w.copy(b.binormals[0]).multiplyScalar(at.y),y.copy(A[0]).add(R).add(w),pt(y.x,y.y,y.z)):pt(at.x,at.y,0)}for(let j=1;j<=u;j++)for(let at=0;at<D;at++){let dt=h?Z(L[at],Tt[at],Kt):L[at];v?(R.copy(b.normals[j]).multiplyScalar(dt.x),w.copy(b.binormals[j]).multiplyScalar(dt.y),y.copy(A[j]).add(R).add(w),pt(y.x,y.y,y.z)):pt(dt.x,dt.y,d/u*j)}for(let j=m-1;j>=0;j--){let at=j/m,dt=f*Math.cos(at*Math.PI/2),ht=g*Math.sin(at*Math.PI/2)+x;for(let _t=0,Xt=V.length;_t<Xt;_t++){let Nt=Z(V[_t],G[_t],ht);pt(Nt.x,Nt.y,d+dt)}for(let _t=0,Xt=I.length;_t<Xt;_t++){let Nt=I[_t];tt=k[_t];for(let mt=0,$=Nt.length;mt<$;mt++){let C=Z(Nt[mt],tt[mt],ht);v?pt(C.x,C.y+A[u-1].y,A[u-1].x+dt):pt(C.x,C.y,d+dt)}}}Yt(),K();function Yt(){let j=s.length/3;if(h){let at=0,dt=D*at;for(let ht=0;ht<ee;ht++){let _t=yt[ht];Dt(_t[2]+dt,_t[1]+dt,_t[0]+dt)}at=u+m*2,dt=D*at;for(let ht=0;ht<ee;ht++){let _t=yt[ht];Dt(_t[0]+dt,_t[1]+dt,_t[2]+dt)}}else{for(let at=0;at<ee;at++){let dt=yt[at];Dt(dt[2],dt[1],dt[0])}for(let at=0;at<ee;at++){let dt=yt[at];Dt(dt[0]+D*u,dt[1]+D*u,dt[2]+D*u)}}n.addGroup(j,s.length/3-j,0)}function K(){let j=s.length/3,at=0;it(V,at),at+=V.length;for(let dt=0,ht=I.length;dt<ht;dt++){let _t=I[dt];it(_t,at),at+=_t.length}n.addGroup(j,s.length/3-j,1)}function it(j,at){let dt=j.length;for(;--dt>=0;){let ht=dt,_t=dt-1;_t<0&&(_t=j.length-1);for(let Xt=0,Nt=u+m*2;Xt<Nt;Xt++){let mt=D*Xt,$=D*(Xt+1),C=at+ht+mt,ce=at+_t+mt,ie=at+_t+$,E=at+ht+$;xt(C,ce,ie,E)}}}function pt(j,at,dt){l.push(j),l.push(at),l.push(dt)}function Dt(j,at,dt){Vt(j),Vt(at),Vt(dt);let ht=s.length/3,_t=S.generateTopUV(n,s,ht-3,ht-2,ht-1);Zt(_t[0]),Zt(_t[1]),Zt(_t[2])}function xt(j,at,dt,ht){Vt(j),Vt(at),Vt(ht),Vt(at),Vt(dt),Vt(ht);let _t=s.length/3,Xt=S.generateSideWallUV(n,s,_t-6,_t-3,_t-2,_t-1);Zt(Xt[0]),Zt(Xt[1]),Zt(Xt[3]),Zt(Xt[1]),Zt(Xt[2]),Zt(Xt[3])}function Vt(j){s.push(l[j*3+0]),s.push(l[j*3+1]),s.push(l[j*3+2])}function Zt(j){r.push(j.x),r.push(j.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return gf(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Cl[s.type]().fromJSON(s)),new i(n,t.options)}},mf={generateTopUV:function(i,t,e,n,s){let r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],u=t[s*3+1];return[new ut(r,a),new ut(o,l),new ut(c,u)]},generateSideWallUV:function(i,t,e,n,s,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],u=t[n*3+1],d=t[n*3+2],h=t[s*3],f=t[s*3+1],g=t[s*3+2],x=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new ut(a,1-l),new ut(c,1-d),new ut(h,1-g),new ut(x,1-p)]:[new ut(o,1-l),new ut(u,1-d),new ut(f,1-g),new ut(m,1-p)]}};function gf(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var vr=class i extends Oe{constructor(t=[new ut(0,-.5),new ut(.5,0),new ut(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=re(s,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],u=1/e,d=new U,h=new ut,f=new U,g=new U,x=new U,m=0,p=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:m=t[S+1].x-t[S].x,p=t[S+1].y-t[S].y,f.x=p*1,f.y=-m,f.z=p*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(x.x,x.y,x.z);break;default:m=t[S+1].x-t[S].x,p=t[S+1].y-t[S].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(g)}for(let S=0;S<=e;S++){let A=n+S*u*s,v=Math.sin(A),b=Math.cos(A);for(let w=0;w<=t.length-1;w++){d.x=t[w].x*v,d.y=t[w].y,d.z=t[w].x*b,a.push(d.x,d.y,d.z),h.x=S/e,h.y=w/(t.length-1),o.push(h.x,h.y);let R=l[3*w+0]*v,y=l[3*w+1],T=l[3*w+0]*b;c.push(R,y,T)}}for(let S=0;S<e;S++)for(let A=0;A<t.length-1;A++){let v=A+S*t.length,b=v,w=v+t.length,R=v+t.length+1,y=v+1;r.push(b,w,y),r.push(R,y,w)}this.setIndex(r),this.setAttribute("position",new me(a,3)),this.setAttribute("uv",new me(o,2)),this.setAttribute("normal",new me(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}};var Pn=class i extends Oe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,d=t/o,h=e/l,f=[],g=[],x=[],m=[];for(let p=0;p<u;p++){let S=p*h-a;for(let A=0;A<c;A++){let v=A*d-r;g.push(v,-S,0),x.push(0,0,1),m.push(A/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<o;S++){let A=S+c*p,v=S+c*(p+1),b=S+1+c*(p+1),w=S+1+c*p;f.push(A,v,w),f.push(v,b,w)}this.setIndex(f),this.setAttribute("position",new me(g,3)),this.setAttribute("normal",new me(x,3)),this.setAttribute("uv",new me(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Mr=class i extends Oe{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],l=[],c=[],u=[],d=t,h=(e-t)/s,f=new U,g=new ut;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){let p=r+m/n*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,u.push(g.x,g.y)}d+=h}for(let x=0;x<s;x++){let m=x*(n+1);for(let p=0;p<n;p++){let S=p+m,A=S,v=S+n+1,b=S+n+2,w=S+1;o.push(A,v,w),o.push(v,b,w)}}this.setIndex(o),this.setAttribute("position",new me(l,3)),this.setAttribute("normal",new me(c,3)),this.setAttribute("uv",new me(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var Gi=class i extends Oe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],d=new U,h=new U,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let S=[],A=p/n,v=a+A*o,b=t*Math.cos(v),w=Math.sqrt(t*t-b*b),R=0;p===0&&a===0?R=.5/e:p===n&&l===Math.PI&&(R=-.5/e);for(let y=0;y<=e;y++){let T=y/e,L=s+T*r;d.x=-w*Math.cos(L),d.y=b,d.z=w*Math.sin(L),g.push(d.x,d.y,d.z),h.copy(d).normalize(),x.push(h.x,h.y,h.z),m.push(T+R,1-A),S.push(c++)}u.push(S)}for(let p=0;p<n;p++)for(let S=0;S<e;S++){let A=u[p][S+1],v=u[p][S],b=u[p+1][S],w=u[p+1][S+1];(p!==0||a>0)&&f.push(A,v,w),(p!==n-1||l<Math.PI)&&f.push(v,b,w)}this.setIndex(f),this.setAttribute("position",new me(g,3)),this.setAttribute("normal",new me(x,3)),this.setAttribute("uv",new me(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Sr=class i extends Oe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],u=[],d=[],h=new U,f=new U,g=new U;for(let x=0;x<=n;x++){let m=a+x/n*o;for(let p=0;p<=s;p++){let S=p/s*r;f.x=(t+e*Math.cos(m))*Math.cos(S),f.y=(t+e*Math.cos(m))*Math.sin(S),f.z=e*Math.sin(m),c.push(f.x,f.y,f.z),h.x=t*Math.cos(S),h.y=t*Math.sin(S),g.subVectors(f,h).normalize(),u.push(g.x,g.y,g.z),d.push(p/s),d.push(x/n)}}for(let x=1;x<=n;x++)for(let m=1;m<=s;m++){let p=(s+1)*x+m-1,S=(s+1)*(x-1)+m-1,A=(s+1)*(x-1)+m,v=(s+1)*x+m;l.push(p,S,v),l.push(S,A,v)}this.setIndex(l),this.setAttribute("position",new me(c,3)),this.setAttribute("normal",new me(u,3)),this.setAttribute("uv",new me(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Yi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(uh(s))s.isRenderTargetTexture?($t("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(uh(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Qe(i){let t={};for(let e=0;e<i.length;e++){let n=Yi(i[e]);for(let s in n)t[s]=n[s]}return t}function uh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function _f(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function lc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ue.workingColorSpace}var lu={clone:Yi,merge:Qe},xf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,_n=class extends pi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xf,this.fragmentShader=yf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Yi(t.uniforms),this.uniformsGroups=_f(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new te().setHex(s.value);break;case"v2":this.uniforms[n].value=new ut().fromArray(s.value);break;case"v3":this.uniforms[n].value=new U().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ce().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Qt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ae().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Ua=class extends _n{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},de=class extends pi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bo,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Fa=class extends pi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Oa=class extends pi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ds(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Sl(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var gi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ba=class extends gi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Tl,endingEnd:Tl}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case El:r=t,o=2*e-n;break;case Al:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case El:a=t,l=2*n-e;break;case Al:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,u=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),x=g*g,m=x*g,p=-h*m+2*h*x-h*g,S=(1+h)*m+(-1.5-2*h)*x+(-.5+h)*g+1,A=(-1-f)*m+(1.5+f)*x+.5*g,v=f*m-f*x;for(let b=0;b!==o;++b)r[b]=p*a[u+b]+S*a[c+b]+A*a[l+b]+v*a[d+b];return r}},za=class extends gi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=(n-e)/(s-e),d=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*d+a[l+h]*u;return r}},ka=class extends gi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Va=class extends gi{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this.inTangents,d=this.outTangents;if(!u||!d){let g=(n-e)/(s-e),x=1-g;for(let m=0;m!==o;++m)r[m]=a[c+m]*x+a[l+m]*g;return r}let h=o*2,f=t-1;for(let g=0;g!==o;++g){let x=a[c+g],m=a[l+g],p=f*h+g*2,S=d[p],A=d[p+1],v=t*h+g*2,b=u[v],w=u[v+1],R=Mf(n,e,S,b,s);r[g]=cu(R,x,A,w,m)}return r}};function cu(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function vf(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Mf(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=cu(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let l=vf(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var xn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ds(e,this.TimeBufferType),this.values=ds(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ds(t.times,Array),values:ds(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),Sl(t.settings)&&(n.settings={inTangents:ds(t.settings.inTangents,Array),outTangents:ds(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ka(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new za(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ba(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Va(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case tr:e=this.InterpolantFactoryMethodDiscrete;break;case ba:e=this.InterpolantFactoryMethodLinear;break;case da:e=this.InterpolantFactoryMethodSmooth;break;case wl:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return $t("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return tr;case this.InterpolantFactoryMethodLinear:return ba;case this.InterpolantFactoryMethodSmooth:return da;case this.InterpolantFactoryMethodBezier:return wl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;Sl(this.settings)&&(dh(this.settings.inTangents,t),dh(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Jt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Jt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Jt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Jt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&cd(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Jt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===da,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],u=t[o+1];if(c!==u&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*n,h=d-n,f=d+n;for(let g=0;g!==n;++g){let x=e[d+g];if(x!==e[h+g]||x!==e[f+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*n,h=a*n;for(let f=0;f!==n;++f)e[h+f]=e[d+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,Sl(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function dh(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}xn.prototype.ValueTypeName="";xn.prototype.TimeBufferType=Float32Array;xn.prototype.ValueBufferType=Float32Array;xn.prototype.DefaultInterpolation=ba;var _i=class extends xn{constructor(t,e,n){super(t,e,n)}};_i.prototype.ValueTypeName="bool";_i.prototype.ValueBufferType=Array;_i.prototype.DefaultInterpolation=tr;_i.prototype.InterpolantFactoryMethodLinear=void 0;_i.prototype.InterpolantFactoryMethodSmooth=void 0;var Ga=class extends xn{constructor(t,e,n,s){super(t,e,n,s)}};Ga.prototype.ValueTypeName="color";var Ha=class extends xn{constructor(t,e,n,s){super(t,e,n,s)}};Ha.prototype.ValueTypeName="number";var Wa=class extends gi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let u=c+o;c!==u;c+=4)Ie.slerpFlat(r,0,a,c-o,a,c,l);return r}},br=class extends xn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Wa(this.times,this.values,this.getValueSize(),t)}};br.prototype.ValueTypeName="quaternion";br.prototype.InterpolantFactoryMethodSmooth=void 0;var xi=class extends xn{constructor(t,e,n){super(t,e,n)}};xi.prototype.ValueTypeName="string";xi.prototype.ValueBufferType=Array;xi.prototype.DefaultInterpolation=tr;xi.prototype.InterpolantFactoryMethodLinear=void 0;xi.prototype.InterpolantFactoryMethodSmooth=void 0;var Xa=class extends xn{constructor(t,e,n,s){super(t,e,n,s)}};Xa.prototype.ValueTypeName="vector";var qa=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},hu=new qa,Ya=class{constructor(t){this.manager=t!==void 0?t:hu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ya.DEFAULT_MATERIAL_NAME="__DEFAULT";var Rs=class extends je{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new te(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},wr=class extends Rs{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(je.DEFAULT_UP),this.updateMatrix(),this.groundColor=new te(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},bl=new Ae,fh=new U,ph=new U,Za=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.mapType=un,this.map=null,this.mapPass=null,this.matrix=new Ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ts,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new Ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;fh.setFromMatrixPosition(t.matrixWorld),e.position.copy(fh),ph.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ph),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){bl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(bl,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===xs||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(bl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},ha=new U,ua=new Ie,On=new U,Tr=class extends je{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ae,this.projectionMatrix=new Ae,this.projectionMatrixInverse=new Ae,this.coordinateSystem=Cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ha,ua,On),On.x===1&&On.y===1&&On.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ha,ua,On.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(ha,ua,On),On.x===1&&On.y===1&&On.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ha,ua,On.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ui=new U,mh=new ut,gh=new ut,Ke=class extends Tr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=vs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Js*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return vs*2*Math.atan(Math.tan(Js*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ui.x,ui.y).multiplyScalar(-t/ui.z),ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ui.x,ui.y).multiplyScalar(-t/ui.z)}getViewSize(t,e){return this.getViewBounds(t,mh,gh),e.subVectors(gh,mh)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Js*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Ps=class extends Tr{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ll=class extends Za{constructor(){super(new Ps(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Er=class extends Rs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(je.DEFAULT_UP),this.updateMatrix(),this.target=new je,this.shadow=new Ll}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},Ar=class extends Rs{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var fs=-90,ps=1,$a=class extends je{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ke(fs,ps,t,e);s.layers=this.layers,this.add(s);let r=new Ke(fs,ps,t,e);r.layers=this.layers,this.add(r);let a=new Ke(fs,ps,t,e);a.layers=this.layers,this.add(a);let o=new Ke(fs,ps,t,e);o.layers=this.layers,this.add(o);let l=new Ke(fs,ps,t,e);l.layers=this.layers,this.add(l);let c=new Ke(fs,ps,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===xs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(d,h,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ja=class extends Ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var cc="\\[\\]\\.:\\/",Sf=new RegExp("["+cc+"]","g"),hc="[^"+cc+"]",bf="[^"+cc.replace("\\.","")+"]",wf=/((?:WC+[\/:])*)/.source.replace("WC",hc),Tf=/(WCOD+)?/.source.replace("WCOD",bf),Ef=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",hc),Af=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",hc),Cf=new RegExp("^"+wf+Tf+Ef+Af+"$"),Rf=["material","materials","bones","map"],Dl=class{constructor(t,e,n){let s=n||Ee.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ee=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Sf,"")}static parseTrackName(t){let e=Cf.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Rf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){$t("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Jt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Jt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Jt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Jt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Jt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Jt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Jt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Jt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Jt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Jt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ee.Composite=Dl;Ee.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ee.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ee.prototype.GetterByBindingType=[Ee.prototype._getValue_direct,Ee.prototype._getValue_array,Ee.prototype._getValue_arrayElement,Ee.prototype._getValue_toArray];Ee.prototype.SetterByBindingTypeAndVersioning=[[Ee.prototype._setValue_direct,Ee.prototype._setValue_direct_setNeedsUpdate,Ee.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ee.prototype._setValue_array,Ee.prototype._setValue_array_setNeedsUpdate,Ee.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ee.prototype._setValue_arrayElement,Ee.prototype._setValue_arrayElement_setNeedsUpdate,Ee.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ee.prototype._setValue_fromArray,Ee.prototype._setValue_fromArray_setNeedsUpdate,Ee.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Y_=new Float32Array(1);var _h=new Ae,Cr=class{constructor(t,e,n=0,s=1/0){this.ray=new zi(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ss,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Jt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return _h.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_h),this}intersectObject(t,e=!0,n=[]){return Nl(t,this,n,e),n.sort(xh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Nl(t[s],this,n,e);return n.sort(xh),n}};function xh(i,t){return i.distance-t.distance}function Nl(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Nl(r[a],t,e,!0)}}var Is=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=re(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(re(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var gc=class gc{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};gc.prototype.isMatrix2=!0;var Ul=gc;var Rr=class extends Rn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function uc(i,t,e,n){let s=Pf(n);switch(e){case ec:return i*t;case ic:return i*t/s.components*s.byteLength;case so:return i*t/s.components*s.byteLength;case Ti:return i*t*2/s.components*s.byteLength;case ro:return i*t*2/s.components*s.byteLength;case nc:return i*t*3/s.components*s.byteLength;case Sn:return i*t*4/s.components*s.byteLength;case ao:return i*t*4/s.components*s.byteLength;case Lr:case Dr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Nr:case Ur:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case lo:case ho:return Math.max(i,16)*Math.max(t,8)/4;case oo:case co:return Math.max(i,8)*Math.max(t,8)/2;case uo:case fo:case mo:case go:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case po:case Fr:case _o:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case yo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case vo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Mo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case So:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case bo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case wo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case To:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Eo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ao:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Co:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ro:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Po:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Io:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Lo:case Do:case No:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Uo:case Fo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Or:case Oo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Pf(i){switch(i){case un:case Kl:return{byteLength:1,components:1};case Ns:case jl:case Nn:return{byteLength:2,components:1};case no:case io:return{byteLength:2,components:4};case Ln:case eo:case Dn:return{byteLength:4,components:1};case Ql:case tc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window!="undefined"&&(window.__THREE__?$t("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Lu(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Lf(i){let t=new WeakMap;function e(o,l){let c=o.array,u=o.usage,d=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array!="undefined"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let u=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,u);else{d.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<d.length;f++){let g=d[h],x=d[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++h,d[h]=x)}d.length=h+1;for(let f=0,g=d.length;f<g;f++){let x=d[f];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Df=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nf=`#ifdef USE_ALPHAHASH
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
#endif`,Uf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ff=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Of=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zf=`#ifdef USE_AOMAP
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
#endif`,kf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vf=`#ifdef USE_BATCHING
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
#endif`,Gf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Xf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,qf=`#ifdef USE_IRIDESCENCE
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
#endif`,Yf=`#ifdef USE_BUMPMAP
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
#endif`,Zf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,$f=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Kf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Qf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,tp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ep=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,np=`#define PI 3.141592653589793
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
} // validated`,ip=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,sp=`vec3 transformedNormal = objectNormal;
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
#endif`,rp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ap=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,op=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cp="gl_FragColor = linearToOutputTexel( gl_FragColor );",hp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,up=`#ifdef USE_ENVMAP
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
#endif`,dp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,fp=`#ifdef USE_ENVMAP
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
#endif`,pp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mp=`#ifdef USE_ENVMAP
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
#endif`,gp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_p=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vp=`#ifdef USE_GRADIENTMAP
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
}`,Mp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Tp=`#ifdef USE_ENVMAP
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
#endif`,Ep=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ap=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Rp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pp=`PhysicalMaterial material;
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
#endif`,Ip=`uniform sampler2D dfgLUT;
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
}`,Lp=`
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
#endif`,Dp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Np=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Up=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Fp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Op=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Hp=`#if defined( USE_POINTS_UV )
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
#endif`,Wp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$p=`#ifdef USE_MORPHTARGETS
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
#endif`,Jp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,jp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Qp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,em=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,nm=`#ifdef USE_NORMALMAP
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
#endif`,im=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,am=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,om=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,cm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,um=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_m=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,xm=`float getShadowMask() {
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
}`,ym=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vm=`#ifdef USE_SKINNING
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
#endif`,Mm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sm=`#ifdef USE_SKINNING
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
#endif`,bm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Em=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Am=`#ifdef USE_TRANSMISSION
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
#endif`,Cm=`#ifdef USE_TRANSMISSION
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
#endif`,Rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Dm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nm=`uniform sampler2D t2D;
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
}`,Um=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Om=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zm=`#include <common>
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
}`,km=`#if DEPTH_PACKING == 3200
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
}`,Vm=`#define DISTANCE
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
}`,Gm=`#define DISTANCE
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
}`,Hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xm=`uniform float scale;
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
}`,qm=`uniform vec3 diffuse;
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
}`,Ym=`#include <common>
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
}`,Zm=`uniform vec3 diffuse;
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
}`,$m=`#define LAMBERT
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
}`,Jm=`#define LAMBERT
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
}`,Km=`#define MATCAP
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
}`,jm=`#define MATCAP
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
}`,Qm=`#define NORMAL
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
}`,tg=`#define NORMAL
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
}`,eg=`#define PHONG
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
}`,ng=`#define PHONG
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
}`,ig=`#define STANDARD
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
}`,sg=`#define STANDARD
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
}`,rg=`#define TOON
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
}`,ag=`#define TOON
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
}`,og=`uniform float size;
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
}`,lg=`uniform vec3 diffuse;
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
}`,cg=`#include <common>
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
}`,hg=`uniform vec3 color;
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
}`,ug=`uniform float rotation;
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
}`,dg=`uniform vec3 diffuse;
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
}`,le={alphahash_fragment:Df,alphahash_pars_fragment:Nf,alphamap_fragment:Uf,alphamap_pars_fragment:Ff,alphatest_fragment:Of,alphatest_pars_fragment:Bf,aomap_fragment:zf,aomap_pars_fragment:kf,batching_pars_vertex:Vf,batching_vertex:Gf,begin_vertex:Hf,beginnormal_vertex:Wf,bsdfs:Xf,iridescence_fragment:qf,bumpmap_pars_fragment:Yf,clipping_planes_fragment:Zf,clipping_planes_pars_fragment:$f,clipping_planes_pars_vertex:Jf,clipping_planes_vertex:Kf,color_fragment:jf,color_pars_fragment:Qf,color_pars_vertex:tp,color_vertex:ep,common:np,cube_uv_reflection_fragment:ip,defaultnormal_vertex:sp,displacementmap_pars_vertex:rp,displacementmap_vertex:ap,emissivemap_fragment:op,emissivemap_pars_fragment:lp,colorspace_fragment:cp,colorspace_pars_fragment:hp,envmap_fragment:up,envmap_common_pars_fragment:dp,envmap_pars_fragment:fp,envmap_pars_vertex:pp,envmap_physical_pars_fragment:Tp,envmap_vertex:mp,fog_vertex:gp,fog_pars_vertex:_p,fog_fragment:xp,fog_pars_fragment:yp,gradientmap_pars_fragment:vp,lightmap_pars_fragment:Mp,lights_lambert_fragment:Sp,lights_lambert_pars_fragment:bp,lights_pars_begin:wp,lights_toon_fragment:Ep,lights_toon_pars_fragment:Ap,lights_phong_fragment:Cp,lights_phong_pars_fragment:Rp,lights_physical_fragment:Pp,lights_physical_pars_fragment:Ip,lights_fragment_begin:Lp,lights_fragment_maps:Dp,lights_fragment_end:Np,lightprobes_pars_fragment:Up,logdepthbuf_fragment:Fp,logdepthbuf_pars_fragment:Op,logdepthbuf_pars_vertex:Bp,logdepthbuf_vertex:zp,map_fragment:kp,map_pars_fragment:Vp,map_particle_fragment:Gp,map_particle_pars_fragment:Hp,metalnessmap_fragment:Wp,metalnessmap_pars_fragment:Xp,morphinstance_vertex:qp,morphcolor_vertex:Yp,morphnormal_vertex:Zp,morphtarget_pars_vertex:$p,morphtarget_vertex:Jp,normal_fragment_begin:Kp,normal_fragment_maps:jp,normal_pars_fragment:Qp,normal_pars_vertex:tm,normal_vertex:em,normalmap_pars_fragment:nm,clearcoat_normal_fragment_begin:im,clearcoat_normal_fragment_maps:sm,clearcoat_pars_fragment:rm,iridescence_pars_fragment:am,opaque_fragment:om,packing:lm,premultiplied_alpha_fragment:cm,project_vertex:hm,dithering_fragment:um,dithering_pars_fragment:dm,roughnessmap_fragment:fm,roughnessmap_pars_fragment:pm,shadowmap_pars_fragment:mm,shadowmap_pars_vertex:gm,shadowmap_vertex:_m,shadowmask_pars_fragment:xm,skinbase_vertex:ym,skinning_pars_vertex:vm,skinning_vertex:Mm,skinnormal_vertex:Sm,specularmap_fragment:bm,specularmap_pars_fragment:wm,tonemapping_fragment:Tm,tonemapping_pars_fragment:Em,transmission_fragment:Am,transmission_pars_fragment:Cm,uv_pars_fragment:Rm,uv_pars_vertex:Pm,uv_vertex:Im,worldpos_vertex:Lm,background_vert:Dm,background_frag:Nm,backgroundCube_vert:Um,backgroundCube_frag:Fm,cube_vert:Om,cube_frag:Bm,depth_vert:zm,depth_frag:km,distance_vert:Vm,distance_frag:Gm,equirect_vert:Hm,equirect_frag:Wm,linedashed_vert:Xm,linedashed_frag:qm,meshbasic_vert:Ym,meshbasic_frag:Zm,meshlambert_vert:$m,meshlambert_frag:Jm,meshmatcap_vert:Km,meshmatcap_frag:jm,meshnormal_vert:Qm,meshnormal_frag:tg,meshphong_vert:eg,meshphong_frag:ng,meshphysical_vert:ig,meshphysical_frag:sg,meshtoon_vert:rg,meshtoon_frag:ag,points_vert:og,points_frag:lg,shadow_vert:cg,shadow_frag:hg,sprite_vert:ug,sprite_frag:dg},At={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},Wn={basic:{uniforms:Qe([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:le.meshbasic_vert,fragmentShader:le.meshbasic_frag},lambert:{uniforms:Qe([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new te(0)},envMapIntensity:{value:1}}]),vertexShader:le.meshlambert_vert,fragmentShader:le.meshlambert_frag},phong:{uniforms:Qe([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:le.meshphong_vert,fragmentShader:le.meshphong_frag},standard:{uniforms:Qe([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag},toon:{uniforms:Qe([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new te(0)}}]),vertexShader:le.meshtoon_vert,fragmentShader:le.meshtoon_frag},matcap:{uniforms:Qe([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:le.meshmatcap_vert,fragmentShader:le.meshmatcap_frag},points:{uniforms:Qe([At.points,At.fog]),vertexShader:le.points_vert,fragmentShader:le.points_frag},dashed:{uniforms:Qe([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:le.linedashed_vert,fragmentShader:le.linedashed_frag},depth:{uniforms:Qe([At.common,At.displacementmap]),vertexShader:le.depth_vert,fragmentShader:le.depth_frag},normal:{uniforms:Qe([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:le.meshnormal_vert,fragmentShader:le.meshnormal_frag},sprite:{uniforms:Qe([At.sprite,At.fog]),vertexShader:le.sprite_vert,fragmentShader:le.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:le.background_vert,fragmentShader:le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:le.backgroundCube_vert,fragmentShader:le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:le.cube_vert,fragmentShader:le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:le.equirect_vert,fragmentShader:le.equirect_frag},distance:{uniforms:Qe([At.common,At.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:le.distance_vert,fragmentShader:le.distance_frag},shadow:{uniforms:Qe([At.lights,At.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:le.shadow_vert,fragmentShader:le.shadow_frag}};Wn.physical={uniforms:Qe([Wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag};var Vo={r:0,b:0,g:0},fg=new Ae,Du=new Qt;Du.set(-1,0,0,0,1,0,0,0,1);function pg(i,t,e,n,s,r){let a=new te(0),o=s===!0?0:1,l,c,u=null,d=0,h=null;function f(S){let A=S.isScene===!0?S.background:null;if(A&&A.isTexture){let v=S.backgroundBlurriness>0;A=t.get(A,v)}return A}function g(S){let A=!1,v=f(S);v===null?m(a,o):v&&v.isColor&&(m(v,1),A=!0);let b=i.xr.getEnvironmentBlendMode();b==="additive"?e.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(S,A){let v=f(A);v&&(v.isCubeTexture||v.mapping===Pr)?(c===void 0&&(c=new ae(new rn(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:Yi(Wn.backgroundCube.uniforms),vertexShader:Wn.backgroundCube.vertexShader,fragmentShader:Wn.backgroundCube.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(fg.makeRotationFromEuler(A.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Du),c.material.toneMapped=ue.getTransfer(v.colorSpace)!==ye,(u!==v||d!==v.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,h=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ae(new Pn(2,2),new _n({name:"BackgroundMaterial",uniforms:Yi(Wn.background.uniforms),vertexShader:Wn.background.vertexShader,fragmentShader:Wn.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=ue.getTransfer(v.colorSpace)!==ye,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,d=v.version,h=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,A){S.getRGB(Vo,lc(i)),e.buffers.color.setClear(Vo.r,Vo.g,Vo.b,A,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,A=1){a.set(S),o=A,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:g,addToRenderList:x,dispose:p}}function mg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,a=!1;function o(I,B,H,N,V){let Z=!1,D=d(I,N,H,B);r!==D&&(r=D,c(r.object)),Z=f(I,N,H,V),Z&&g(I,N,H,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,v(I,B,H,N),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return i.createVertexArray()}function c(I){return i.bindVertexArray(I)}function u(I){return i.deleteVertexArray(I)}function d(I,B,H,N){let V=N.wireframe===!0,Z=n[B.id];Z===void 0&&(Z={},n[B.id]=Z);let D=I.isInstancedMesh===!0?I.id:0,X=Z[D];X===void 0&&(X={},Z[D]=X);let G=X[H.id];G===void 0&&(G={},X[H.id]=G);let k=G[V];return k===void 0&&(k=h(l()),G[V]=k),k}function h(I){let B=[],H=[],N=[];for(let V=0;V<e;V++)B[V]=0,H[V]=0,N[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:H,attributeDivisors:N,object:I,attributes:{},index:null}}function f(I,B,H,N){let V=r.attributes,Z=B.attributes,D=0,X=H.getAttributes();for(let G in X)if(X[G].location>=0){let tt=V[G],Tt=Z[G];if(Tt===void 0&&(G==="instanceMatrix"&&I.instanceMatrix&&(Tt=I.instanceMatrix),G==="instanceColor"&&I.instanceColor&&(Tt=I.instanceColor)),tt===void 0||tt.attribute!==Tt||Tt&&tt.data!==Tt.data)return!0;D++}return r.attributesNum!==D||r.index!==N}function g(I,B,H,N){let V={},Z=B.attributes,D=0,X=H.getAttributes();for(let G in X)if(X[G].location>=0){let tt=Z[G];tt===void 0&&(G==="instanceMatrix"&&I.instanceMatrix&&(tt=I.instanceMatrix),G==="instanceColor"&&I.instanceColor&&(tt=I.instanceColor));let Tt={};Tt.attribute=tt,tt&&tt.data&&(Tt.data=tt.data),V[G]=Tt,D++}r.attributes=V,r.attributesNum=D,r.index=N}function x(){let I=r.newAttributes;for(let B=0,H=I.length;B<H;B++)I[B]=0}function m(I){p(I,0)}function p(I,B){let H=r.newAttributes,N=r.enabledAttributes,V=r.attributeDivisors;H[I]=1,N[I]===0&&(i.enableVertexAttribArray(I),N[I]=1),V[I]!==B&&(i.vertexAttribDivisor(I,B),V[I]=B)}function S(){let I=r.newAttributes,B=r.enabledAttributes;for(let H=0,N=B.length;H<N;H++)B[H]!==I[H]&&(i.disableVertexAttribArray(H),B[H]=0)}function A(I,B,H,N,V,Z,D){D===!0?i.vertexAttribIPointer(I,B,H,V,Z):i.vertexAttribPointer(I,B,H,N,V,Z)}function v(I,B,H,N){x();let V=N.attributes,Z=H.getAttributes(),D=B.defaultAttributeValues;for(let X in Z){let G=Z[X];if(G.location>=0){let k=V[X];if(k===void 0&&(X==="instanceMatrix"&&I.instanceMatrix&&(k=I.instanceMatrix),X==="instanceColor"&&I.instanceColor&&(k=I.instanceColor)),k!==void 0){let tt=k.normalized,Tt=k.itemSize,yt=t.get(k);if(yt===void 0)continue;let ee=yt.buffer,Kt=yt.type,Yt=yt.bytesPerElement,K=Kt===i.INT||Kt===i.UNSIGNED_INT||k.gpuType===eo;if(k.isInterleavedBufferAttribute){let it=k.data,pt=it.stride,Dt=k.offset;if(it.isInstancedInterleavedBuffer){for(let xt=0;xt<G.locationSize;xt++)p(G.location+xt,it.meshPerAttribute);I.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let xt=0;xt<G.locationSize;xt++)m(G.location+xt);i.bindBuffer(i.ARRAY_BUFFER,ee);for(let xt=0;xt<G.locationSize;xt++)A(G.location+xt,Tt/G.locationSize,Kt,tt,pt*Yt,(Dt+Tt/G.locationSize*xt)*Yt,K)}else{if(k.isInstancedBufferAttribute){for(let it=0;it<G.locationSize;it++)p(G.location+it,k.meshPerAttribute);I.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let it=0;it<G.locationSize;it++)m(G.location+it);i.bindBuffer(i.ARRAY_BUFFER,ee);for(let it=0;it<G.locationSize;it++)A(G.location+it,Tt/G.locationSize,Kt,tt,Tt*Yt,Tt/G.locationSize*it*Yt,K)}}else if(D!==void 0){let tt=D[X];if(tt!==void 0)switch(tt.length){case 2:i.vertexAttrib2fv(G.location,tt);break;case 3:i.vertexAttrib3fv(G.location,tt);break;case 4:i.vertexAttrib4fv(G.location,tt);break;default:i.vertexAttrib1fv(G.location,tt)}}}}S()}function b(){T();for(let I in n){let B=n[I];for(let H in B){let N=B[H];for(let V in N){let Z=N[V];for(let D in Z)u(Z[D].object),delete Z[D];delete N[V]}}delete n[I]}}function w(I){if(n[I.id]===void 0)return;let B=n[I.id];for(let H in B){let N=B[H];for(let V in N){let Z=N[V];for(let D in Z)u(Z[D].object),delete Z[D];delete N[V]}}delete n[I.id]}function R(I){for(let B in n){let H=n[B];for(let N in H){let V=H[N];if(V[I.id]===void 0)continue;let Z=V[I.id];for(let D in Z)u(Z[D].object),delete Z[D];delete V[I.id]}}}function y(I){for(let B in n){let H=n[B],N=I.isInstancedMesh===!0?I.id:0,V=H[N];if(V!==void 0){for(let Z in V){let D=V[Z];for(let X in D)u(D[X].object),delete D[X];delete V[Z]}delete H[N],Object.keys(H).length===0&&delete n[B]}}}function T(){L(),a=!0,r!==s&&(r=s,c(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:L,dispose:b,releaseStatesOfGeometry:w,releaseStatesOfObject:y,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:S}}function gg(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),e.update(c,n,u))}function o(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let h=0;for(let f=0;f<u;f++)h+=c[f];e.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function _g(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==Sn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let y=R===Nn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==un&&R!==Dn&&!y&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",u=l(c);u!==c&&($t("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&$t("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:A,maxFragmentUniforms:v,maxSamples:b,samples:w}}function xg(i){let t=this,e=null,n=0,s=!1,r=!1,a=new mn,o=new Qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||n!==0||s;return s=h,n=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,f){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{let S=r?0:n,A=S*4,v=p.clippingState||null;l.value=v,v=u(g,h,A,f);for(let b=0;b!==A;++b)v[b]=e[b];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,h,f,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let p=f+x*4,S=h.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let A=0,v=f;A!==x;++A,v+=4)a.copy(d[A]).applyMatrix4(S,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}var Bs=4,yg=6,vg=20,Mg=256,Br=new Ps,uu=new te,_c=null,xc=0,yc=0,vc=!1,Sg=new U,Zi=new U,Ho=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=Sg}=r;_c=this._renderer.getRenderTarget(),xc=this._renderer.getActiveCubeFace(),yc=this._renderer.getActiveMipmapLevel(),vc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(_c,xc,yc),this._renderer.xr.enabled=vc,t.scissorTest=!1,Os(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Si||t.mapping===Xi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),_c=this._renderer.getRenderTarget(),xc=this._renderer.getActiveCubeFace(),yc=this._renderer.getActiveMipmapLevel(),vc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Xe,minFilter:Xe,generateMipmaps:!1,type:Nn,format:Sn,colorSpace:er,depthBuffer:!1},s=du(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=du(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=bg(r)),this._blurMaterial=Tg(r,t,e),this._ggxMaterial=wg(r,t,e)}return s}_compileMaterial(t){let e=new ae(new Oe,t);this._renderer.compile(e,Br)}_sceneToCubeUV(t,e,n,s,r){let l=new Ke(90,1,e,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(uu),d.toneMapping=In,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ae(new rn,new lr({name:"PMREM.Background",side:an,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,p=!1,S=t.background;S?S.isColor&&(m.color.copy(S),t.background=null,p=!0):(m.color.copy(uu),p=!0);for(let A=0;A<6;A++){let v=A%3;v===0?(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[A],r.y,r.z)):v===1?(l.up.set(0,0,c[A]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[A],r.z)):(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[A]));let b=this._cubeSize;Os(s,v*b,A>2?b:0,b,b),d.setRenderTarget(s),p&&d.render(x,l),d.render(t,l)}d.toneMapping=f,d.autoClear=h,t.background=S}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Si||t.mapping===Xi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=pu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Os(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Br)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=c*1.25,f=d*h,{_lodMax:g}=this,x=this._sizeLods[n],m=3*x*(n>g-Bs?n-g+Bs:0),p=4*(this._cubeSize-x);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=g-e,Os(r,m,p,3*x,2*x),s.setRenderTarget(r),s.render(o,Br),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Os(t,m,p,3*x,2*x),s.setRenderTarget(t),s.render(o,Br)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],d=3*u*(s>this._lodMax-Bs?s-this._lodMax+Bs:0),h=4*(this._cubeSize-u);Os(e,d,h,3*u,2*u),a.setRenderTarget(e),a.render(l,Br)}};function bg(i){let t=[],e=[],n=i,s=i-Bs+1+yg;for(let r=0;r<s;r++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,h=6,f=3,g=new Float32Array(f*h*d),x=new Float32Array(f*h*d);for(let p=0;p<d;p++){let S=p%3*2/3-1,A=p>2?0:-1,v=[S,A,0,S+2/3,A,0,S+2/3,A+1,0,S,A,0,S+2/3,A+1,0,S,A+1,0];g.set(v,f*h*p);for(let b=0;b<h;b++){let w=u[b*2]*2-1,R=u[b*2+1]*2-1;p===0?Zi.set(1,R,w):p===1?Zi.set(-w,1,-R):p===2?Zi.set(-w,R,1):p===3?Zi.set(-1,R,-w):p===4?Zi.set(-w,-1,R):Zi.set(w,R,-1),Zi.toArray(x,(p*h+b)*f)}}let m=new Oe;m.setAttribute("position",new nn(g,f)),m.setAttribute("outputDirection",new nn(x,f)),e.push(new ae(m,null)),n>Bs&&n--}return{lodMeshes:e,sizeLods:t}}function du(i,t,e){let n=new cn(i,t,e);return n.texture.mapping=Pr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Os(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function wg(i,t,e){return new _n({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Mg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:qo(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Tg(i,t,e){return new _n({name:"SphericalGaussianBlur",defines:{SAMPLES:vg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:qo(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function fu(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qo(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function pu(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function qo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Wo=class extends cn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new cr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new rn(5,5,5),r=new _n({name:"CubemapFromEquirect",uniforms:Yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:an,blending:Gn});r.uniforms.tEquirect.value=e;let a=new ae(s,r),o=e.minFilter;return e.minFilter===bi&&(e.minFilter=Xe),new $a(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function Eg(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,f=!1){return h==null?null:f?a(h):r(h)}function r(h){if(h&&h.isTexture){let f=h.mapping;if(f===ja||f===Qa)if(t.has(h)){let g=t.get(h).texture;return o(g,h.mapping)}else{let g=h.image;if(g&&g.height>0){let x=new Wo(g.height);return x.fromEquirectangularTexture(i,h),t.set(h,x),h.addEventListener("dispose",c),o(x.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let f=h.mapping,g=f===ja||f===Qa,x=f===Si||f===Xi;if(g||x){let m=e.get(h),p=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return n===null&&(n=new Ho(i)),m=g?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),m.texture;if(m!==void 0)return m.texture;{let S=h.image;return g&&S&&S.height>0||x&&S&&l(S)?(n===null&&(n=new Ho(i)),m=g?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,f){return f===ja?h.mapping=Si:f===Qa&&(h.mapping=Xi),h}function l(h){let f=0,g=6;for(let x=0;x<g;x++)h[x]!==void 0&&f++;return f===g}function c(h){let f=h.target;f.removeEventListener("dispose",c);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function u(h){let f=h.target;f.removeEventListener("dispose",u);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Ag(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Bi("WebGLRenderer: "+n+" extension not supported."),s}}}function Cg(i,t,e,n){let s={},r=new WeakMap;function a(d){let h=d.target;h.index!==null&&t.remove(h.index);for(let g in h.attributes)t.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];let f=r.get(h);f&&(t.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function l(d){let h=d.attributes;for(let f in h)t.update(h[f],i.ARRAY_BUFFER)}function c(d){let h=[],f=d.index,g=d.attributes.position,x=0;if(g===void 0)return;if(f!==null){let S=f.array;x=f.version;for(let A=0,v=S.length;A<v;A+=3){let b=S[A+0],w=S[A+1],R=S[A+2];h.push(b,w,w,R,R,b)}}else{let S=g.array;x=g.version;for(let A=0,v=S.length/3-1;A<v;A+=3){let b=A+0,w=A+1,R=A+2;h.push(b,w,w,R,R,b)}}let m=new(g.count>=65535?or:ar)(h,1);m.version=x;let p=r.get(d);p&&t.remove(p),r.set(d,m)}function u(d){let h=r.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function Rg(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,h){i.drawElements(n,h,r,d*a),e.update(h,n,1)}function c(d,h,f){f!==0&&(i.drawElementsInstanced(n,h,r,d*a,f),e.update(h,n,f))}function u(d,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,d,0,f);let x=0;for(let m=0;m<f;m++)x+=h[m];e.update(x,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Pg(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Jt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Ig(i,t,e){let n=new WeakMap,s=new Ce;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==d){let T=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],A=0;f===!0&&(A=1),g===!0&&(A=2),x===!0&&(A=3);let v=o.attributes.position.count*A,b=1;v>t.maxTextureSize&&(b=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let w=new Float32Array(v*b*4*d),R=new sr(w,v,b,d);R.type=Dn,R.needsUpdate=!0;let y=A*4;for(let L=0;L<d;L++){let I=m[L],B=p[L],H=S[L],N=v*b*4*L;for(let V=0;V<I.count;V++){let Z=V*y;f===!0&&(s.fromBufferAttribute(I,V),w[N+Z+0]=s.x,w[N+Z+1]=s.y,w[N+Z+2]=s.z,w[N+Z+3]=0),g===!0&&(s.fromBufferAttribute(B,V),w[N+Z+4]=s.x,w[N+Z+5]=s.y,w[N+Z+6]=s.z,w[N+Z+7]=0),x===!0&&(s.fromBufferAttribute(H,V),w[N+Z+8]=s.x,w[N+Z+9]=s.y,w[N+Z+10]=s.z,w[N+Z+11]=H.itemSize===4?s.w:1)}}h={count:d,texture:R,size:new ut(v,b)},n.set(o,h),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Lg(i,t,e,n,s){let r=new WeakMap;function a(c){let u=s.render.frame,d=c.geometry,h=t.get(c,d);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return h}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}var Dg={[Hl]:"LINEAR_TONE_MAPPING",[Wl]:"REINHARD_TONE_MAPPING",[Xl]:"CINEON_TONE_MAPPING",[ql]:"ACES_FILMIC_TONE_MAPPING",[Zl]:"AGX_TONE_MAPPING",[$l]:"NEUTRAL_TONE_MAPPING",[Yl]:"CUSTOM_TONE_MAPPING"};function Ng(i,t,e,n,s,r){let a=new cn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Oe;c.setAttribute("position",new me([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new me([0,2,0,0,2,0],2));let u=new Ua({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new ae(c,u),h=new Ps(-1,1,1,-1,0,1),f=null,g=null,x=!1,m,p=null,S=[],A=!1;this.setSize=function(v,b){a.setSize(v,b),o!==null&&o.setSize(v,b),l!==null&&l.setSize(v,b);for(let w=0;w<S.length;w++){let R=S[w];R.setSize&&R.setSize(v,b)}},this.setEffects=function(v){S=v,A=S.length>0&&S[0].isRenderPass===!0;let b=a.width,w=a.height;S.length>0&&o===null&&(o=new cn(b,w,{type:Nn,depthBuffer:!1,stencilBuffer:!1}),l=new cn(b,w,{type:Nn,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<S.length;R++){let y=S[R];y.setSize&&y.setSize(b,w)}},this.begin=function(v,b){if(x||v.toneMapping===In&&S.length===0)return!1;if(p=b,b!==null){let w=b.width,R=b.height;(a.width!==w||a.height!==R)&&this.setSize(w,R)}return A===!1&&v.setRenderTarget(a),m=v.toneMapping,v.toneMapping=In,!0},this.hasRenderPass=function(){return A},this.end=function(v,b){v.toneMapping=m,x=!0;let w=a,R=o;for(let y=0;y<S.length;y++){let T=S[y];T.enabled!==!1&&(T.render(v,R,w,b),T.needsSwap!==!1&&(w=R,R=R===o?l:o))}if(f!==v.outputColorSpace||g!==v.toneMapping){f=v.outputColorSpace,g=v.toneMapping,u.defines={},ue.getTransfer(f)===ye&&(u.defines.SRGB_TRANSFER="");let y=Dg[g];y&&(u.defines[y]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=w.texture,v.setRenderTarget(p),v.render(d,h),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}var Nu=new sn,bc=new mi(1,1),Uu=new sr,Fu=new Ea,Ou=new cr,mu=[],gu=[],_u=new Float32Array(16),xu=new Float32Array(9),yu=new Float32Array(4);function ks(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=mu[s];if(r===void 0&&(r=new Float32Array(s),mu[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Be(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ze(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Yo(i,t){let e=gu[t];e===void 0&&(e=new Int32Array(t),gu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Ug(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Fg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2fv(this.addr,t),ze(e,t)}}function Og(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Be(e,t))return;i.uniform3fv(this.addr,t),ze(e,t)}}function Bg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4fv(this.addr,t),ze(e,t)}}function zg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;yu.set(n),i.uniformMatrix2fv(this.addr,!1,yu),ze(e,n)}}function kg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;xu.set(n),i.uniformMatrix3fv(this.addr,!1,xu),ze(e,n)}}function Vg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;_u.set(n),i.uniformMatrix4fv(this.addr,!1,_u),ze(e,n)}}function Gg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Hg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2iv(this.addr,t),ze(e,t)}}function Wg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;i.uniform3iv(this.addr,t),ze(e,t)}}function Xg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4iv(this.addr,t),ze(e,t)}}function qg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Yg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2uiv(this.addr,t),ze(e,t)}}function Zg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;i.uniform3uiv(this.addr,t),ze(e,t)}}function $g(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4uiv(this.addr,t),ze(e,t)}}function Jg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(bc.compareFunction=e.isReversedDepthBuffer()?ko:zo,r=bc):r=Nu,e.setTexture2D(t||r,s)}function Kg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Fu,s)}function jg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Ou,s)}function Qg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Uu,s)}function t0(i){switch(i){case 5126:return Ug;case 35664:return Fg;case 35665:return Og;case 35666:return Bg;case 35674:return zg;case 35675:return kg;case 35676:return Vg;case 5124:case 35670:return Gg;case 35667:case 35671:return Hg;case 35668:case 35672:return Wg;case 35669:case 35673:return Xg;case 5125:return qg;case 36294:return Yg;case 36295:return Zg;case 36296:return $g;case 35678:case 36198:case 36298:case 36306:case 35682:return Jg;case 35679:case 36299:case 36307:return Kg;case 35680:case 36300:case 36308:case 36293:return jg;case 36289:case 36303:case 36311:case 36292:return Qg}}function e0(i,t){i.uniform1fv(this.addr,t)}function n0(i,t){let e=ks(t,this.size,2);i.uniform2fv(this.addr,e)}function i0(i,t){let e=ks(t,this.size,3);i.uniform3fv(this.addr,e)}function s0(i,t){let e=ks(t,this.size,4);i.uniform4fv(this.addr,e)}function r0(i,t){let e=ks(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function a0(i,t){let e=ks(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function o0(i,t){let e=ks(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function l0(i,t){i.uniform1iv(this.addr,t)}function c0(i,t){i.uniform2iv(this.addr,t)}function h0(i,t){i.uniform3iv(this.addr,t)}function u0(i,t){i.uniform4iv(this.addr,t)}function d0(i,t){i.uniform1uiv(this.addr,t)}function f0(i,t){i.uniform2uiv(this.addr,t)}function p0(i,t){i.uniform3uiv(this.addr,t)}function m0(i,t){i.uniform4uiv(this.addr,t)}function g0(i,t,e){let n=this.cache,s=t.length,r=Yo(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=bc:a=Nu;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function _0(i,t,e){let n=this.cache,s=t.length,r=Yo(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Fu,r[a])}function x0(i,t,e){let n=this.cache,s=t.length,r=Yo(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Ou,r[a])}function y0(i,t,e){let n=this.cache,s=t.length,r=Yo(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Uu,r[a])}function v0(i){switch(i){case 5126:return e0;case 35664:return n0;case 35665:return i0;case 35666:return s0;case 35674:return r0;case 35675:return a0;case 35676:return o0;case 5124:case 35670:return l0;case 35667:case 35671:return c0;case 35668:case 35672:return h0;case 35669:case 35673:return u0;case 5125:return d0;case 36294:return f0;case 36295:return p0;case 36296:return m0;case 35678:case 36198:case 36298:case 36306:case 35682:return g0;case 35679:case 36299:case 36307:return _0;case 35680:case 36300:case 36308:case 36293:return x0;case 36289:case 36303:case 36311:case 36292:return y0}}var wc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=t0(e.type)}},Tc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=v0(e.type)}},Ec=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},Mc=/(\w+)(\])?(\[|\.)?/g;function vu(i,t){i.seq.push(t),i.map[t.id]=t}function M0(i,t,e){let n=i.name,s=n.length;for(Mc.lastIndex=0;;){let r=Mc.exec(n),a=Mc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){vu(e,c===void 0?new wc(o,i,t):new Tc(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new Ec(o),vu(e,d)),e=d}}}var zs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);M0(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function Mu(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var S0=37297,b0=0;function w0(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Su=new Qt;function T0(i){ue._getMatrix(Su,ue.workingColorSpace,i);let t=`mat3( ${Su.elements.map(e=>e.toFixed(4))} )`;switch(ue.getTransfer(i)){case nr:return[t,"LinearTransferOETF"];case ye:return[t,"sRGBTransferOETF"];default:return $t("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function bu(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+w0(i.getShaderSource(t),o)}else return r}function E0(i,t){let e=T0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var A0={[Hl]:"Linear",[Wl]:"Reinhard",[Xl]:"Cineon",[ql]:"ACESFilmic",[Zl]:"AgX",[$l]:"Neutral",[Yl]:"Custom"};function C0(i,t){let e=A0[t];return e===void 0?($t("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Go=new U;function R0(){ue.getLuminanceCoefficients(Go);let i=Go.x.toFixed(4),t=Go.y.toFixed(4),e=Go.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function P0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(kr).join(`
`)}function I0(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function L0(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function kr(i){return i!==""}function wu(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Tu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var D0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ac(i){return i.replace(D0,U0)}var N0=new Map;function U0(i,t){let e=le[t];if(e===void 0){let n=N0.get(t);if(n!==void 0)e=le[n],$t('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Ac(e)}var F0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Eu(i){return i.replace(F0,O0)}function O0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Au(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var B0={[Hi]:"SHADOWMAP_TYPE_PCF",[Ls]:"SHADOWMAP_TYPE_VSM"};function z0(i){return B0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var k0={[Si]:"ENVMAP_TYPE_CUBE",[Xi]:"ENVMAP_TYPE_CUBE",[Pr]:"ENVMAP_TYPE_CUBE_UV"};function V0(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":k0[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var G0={[Xi]:"ENVMAP_MODE_REFRACTION"};function H0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":G0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var W0={[Gl]:"ENVMAP_BLENDING_MULTIPLY",[kh]:"ENVMAP_BLENDING_MIX",[Vh]:"ENVMAP_BLENDING_ADD"};function X0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":W0[i.combine]||"ENVMAP_BLENDING_NONE"}function q0(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Y0(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=z0(e),c=V0(e),u=H0(e),d=X0(e),h=q0(e),f=P0(e),g=I0(r),x=s.createProgram(),m,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(kr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(kr).join(`
`),p.length>0&&(p+=`
`)):(m=[Au(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(kr).join(`
`),p=[Au(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==In?"#define TONE_MAPPING":"",e.toneMapping!==In?le.tonemapping_pars_fragment:"",e.toneMapping!==In?C0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",le.colorspace_pars_fragment,E0("linearToOutputTexel",e.outputColorSpace),R0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(kr).join(`
`)),a=Ac(a),a=wu(a,e),a=Tu(a,e),o=Ac(o),o=wu(o,e),o=Tu(o,e),a=Eu(a),o=Eu(o),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===sc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let A=S+m+a,v=S+p+o,b=Mu(s,s.VERTEX_SHADER,A),w=Mu(s,s.FRAGMENT_SHADER,v);s.attachShader(x,b),s.attachShader(x,w),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function R(I){if(i.debug.checkShaderErrors){let B=s.getProgramInfoLog(x)||"",H=s.getShaderInfoLog(b)||"",N=s.getShaderInfoLog(w)||"",V=B.trim(),Z=H.trim(),D=N.trim(),X=!0,G=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,b,w);else{let k=bu(s,b,"vertex"),tt=bu(s,w,"fragment");Jt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+V+`
`+k+`
`+tt)}else V!==""?$t("WebGLProgram: Program Info Log:",V):(Z===""||D==="")&&(G=!1);G&&(I.diagnostics={runnable:X,programLog:V,vertexShader:{log:Z,prefix:m},fragmentShader:{log:D,prefix:p}})}s.deleteShader(b),s.deleteShader(w),y=new zs(s,x),T=L0(s,x)}let y;this.getUniforms=function(){return y===void 0&&R(this),y};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let L=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(x,S0)),L},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=b0++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=b,this.fragmentShader=w,this}var Z0=0,Cc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Rc(t),e.set(t,n)),n}},Rc=class{constructor(t){this.id=Z0++,this.code=t,this.usedTimes=0}};function $0(i){return i===Ti||i===Fr||i===Or}function J0(i,t,e,n,s,r){let a=new Ss,o=new Cc,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer,h=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return l.add(y),y===0?"uv":`uv${y}`}function x(y,T,L,I,B,H){let N=I.fog,V=B.geometry,Z=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?I.environment:null,D=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,X=t.get(y.envMap||Z,D),G=X&&X.mapping===Pr?X.image.height:null,k=f[y.type];y.precision!==null&&(h=n.getMaxPrecision(y.precision),h!==y.precision&&$t("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));let tt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Tt=tt!==void 0?tt.length:0,yt=0;V.morphAttributes.position!==void 0&&(yt=1),V.morphAttributes.normal!==void 0&&(yt=2),V.morphAttributes.color!==void 0&&(yt=3);let ee,Kt,Yt,K;if(k){let ge=Wn[k];ee=ge.vertexShader,Kt=ge.fragmentShader}else{ee=y.vertexShader,Kt=y.fragmentShader;let ge=o.getVertexShaderStage(y),fe=o.getFragmentShaderStage(y);o.update(y,ge,fe),Yt=ge.id,K=fe.id}let it=i.getRenderTarget(),pt=i.state.buffers.depth.getReversed(),Dt=B.isInstancedMesh===!0,xt=B.isBatchedMesh===!0,Vt=!!y.map,Zt=!!y.matcap,j=!!X,at=!!y.aoMap,dt=!!y.lightMap,ht=!!y.bumpMap&&y.wireframe===!1,_t=!!y.normalMap,Xt=!!y.displacementMap,Nt=!!y.emissiveMap,mt=!!y.metalnessMap,$=!!y.roughnessMap,C=y.anisotropy>0,ce=y.clearcoat>0,ie=y.dispersion>0,E=y.retroreflectivity>0,_=y.iridescence>0,z=y.sheen>0,q=y.transmission>0,Q=C&&!!y.anisotropyMap,lt=ce&&!!y.clearcoatMap,ft=ce&&!!y.clearcoatNormalMap,et=ce&&!!y.clearcoatRoughnessMap,nt=_&&!!y.iridescenceMap,gt=_&&!!y.iridescenceThicknessMap,Ut=z&&!!y.sheenColorMap,bt=z&&!!y.sheenRoughnessMap,Mt=!!y.specularMap,Bt=!!y.specularColorMap,Ht=!!y.specularIntensityMap,jt=q&&!!y.transmissionMap,O=q&&!!y.thicknessMap,vt=!!y.gradientMap,rt=!!y.alphaMap,St=y.alphaTest>0,Ct=!!y.alphaHash,ot=!!y.extensions,Gt=In;y.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(Gt=i.toneMapping);let It={shaderID:k,shaderType:y.type,shaderName:y.name,vertexShader:ee,fragmentShader:Kt,defines:y.defines,customVertexShaderID:Yt,customFragmentShaderID:K,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:xt,batchingColor:xt&&B._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&B.instanceColor!==null,instancingMorph:Dt&&B.morphTexture!==null,outputColorSpace:it===null?i.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:ue.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Vt,matcap:Zt,envMap:j,envMapMode:j&&X.mapping,envMapCubeUVHeight:G,aoMap:at,lightMap:dt,bumpMap:ht,normalMap:_t,displacementMap:Xt,emissiveMap:Nt,normalMapObjectSpace:_t&&y.normalMapType===Wh,normalMapTangentSpace:_t&&y.normalMapType===Bo,packedNormalMap:_t&&y.normalMapType===Bo&&$0(y.normalMap.format),metalnessMap:mt,roughnessMap:$,anisotropy:C,anisotropyMap:Q,clearcoat:ce,clearcoatMap:lt,clearcoatNormalMap:ft,clearcoatRoughnessMap:et,dispersion:ie,retroreflection:E,iridescence:_,iridescenceMap:nt,iridescenceThicknessMap:gt,sheen:z,sheenColorMap:Ut,sheenRoughnessMap:bt,specularMap:Mt,specularColorMap:Bt,specularIntensityMap:Ht,transmission:q,transmissionMap:jt,thicknessMap:O,gradientMap:vt,opaque:y.transparent===!1&&y.blending===Ds&&y.alphaToCoverage===!1,alphaMap:rt,alphaTest:St,alphaHash:Ct,combine:y.combine,mapUv:Vt&&g(y.map.channel),aoMapUv:at&&g(y.aoMap.channel),lightMapUv:dt&&g(y.lightMap.channel),bumpMapUv:ht&&g(y.bumpMap.channel),normalMapUv:_t&&g(y.normalMap.channel),displacementMapUv:Xt&&g(y.displacementMap.channel),emissiveMapUv:Nt&&g(y.emissiveMap.channel),metalnessMapUv:mt&&g(y.metalnessMap.channel),roughnessMapUv:$&&g(y.roughnessMap.channel),anisotropyMapUv:Q&&g(y.anisotropyMap.channel),clearcoatMapUv:lt&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:ft&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:gt&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ut&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:bt&&g(y.sheenRoughnessMap.channel),specularMapUv:Mt&&g(y.specularMap.channel),specularColorMapUv:Bt&&g(y.specularColorMap.channel),specularIntensityMapUv:Ht&&g(y.specularIntensityMap.channel),transmissionMapUv:jt&&g(y.transmissionMap.channel),thicknessMapUv:O&&g(y.thicknessMap.channel),alphaMapUv:rt&&g(y.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(_t||C),vertexNormals:!!V.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!V.attributes.uv&&(Vt||rt),fog:!!N,useFog:y.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||V.attributes.normal===void 0&&_t===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:pt,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Tt,morphTextureStride:yt,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Gt,decodeVideoTexture:Vt&&y.map.isVideoTexture===!0&&ue.getTransfer(y.map.colorSpace)===ye,decodeVideoTextureEmissive:Nt&&y.emissiveMap.isVideoTexture===!0&&ue.getTransfer(y.emissiveMap.colorSpace)===ye,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===hn,flipSided:y.side===an,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ot&&y.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ot&&y.extensions.multiDraw===!0||xt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return It.vertexUv1s=l.has(1),It.vertexUv2s=l.has(2),It.vertexUv3s=l.has(3),l.clear(),It}function m(y){let T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(let L in y.defines)T.push(L),T.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(p(T,y),S(T,y),T.push(i.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function p(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numSunLights),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numSunLightShadows),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function S(y,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function A(y){let T=f[y.type],L;if(T){let I=Wn[T];L=lu.clone(I.uniforms)}else L=y.uniforms;return L}function v(y,T){let L=u.get(T);return L!==void 0?++L.usedTimes:(L=new Y0(i,T,y,s),c.push(L),u.set(T,L)),L}function b(y){if(--y.usedTimes===0){let T=c.indexOf(y);c[T]=c[c.length-1],c.pop(),u.delete(y.cacheKey),y.destroy()}}function w(y){o.remove(y)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:A,acquireProgram:v,releaseProgram:b,releaseShaderCache:w,programs:c,dispose:R}}function K0(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function j0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Cu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ru(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function o(h,f,g,x,m,p){let S=i[t];return S===void 0?(S={id:h.id,object:h,geometry:f,material:g,materialVariant:a(h),groupOrder:x,renderOrder:h.renderOrder,z:m,group:p},i[t]=S):(S.id=h.id,S.object=h,S.geometry=f,S.material=g,S.materialVariant=a(h),S.groupOrder=x,S.renderOrder=h.renderOrder,S.z=m,S.group=p),t++,S}function l(h,f,g,x,m,p,S){S.reversedDepth===!0&&(m=-m);let A=o(h,f,g,x,m,p);g.transmission>0?n.push(A):g.transparent===!0?s.push(A):e.push(A)}function c(h,f,g,x,m,p){let S=o(h,f,g,x,m,p);g.transmission>0?n.unshift(S):g.transparent===!0?s.unshift(S):e.unshift(S)}function u(h,f){e.length>1&&e.sort(h||j0),n.length>1&&n.sort(f||Cu),s.length>1&&s.sort(f||Cu)}function d(){for(let h=t,f=i.length;h<f;h++){let g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:u}}function Q0(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new Ru,i.set(n,[a])):s>=r.length?(a=new Ru,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function t_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new U,color:new te};break;case"SpotLight":e={position:new U,direction:new U,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new te,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new te,groundColor:new te};break;case"RectAreaLight":e={color:new te,position:new U,halfWidth:new U,halfHeight:new U};break}return i[t.id]=e,e}}}function e_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var n_=0;function i_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function s_(i){let t=new t_,e=e_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);let s=new U,r=new Ae,a=new Ae;function o(c){let u=0,d=0,h=0;for(let B=0;B<9;B++)n.probe[B].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,S=0,A=0,v=0,b=0,w=0,R=0,y=0,T=0,L=0;c.sort(i_);for(let B=0,H=c.length;B<H;B++){let N=c[B],V=N.color,Z=N.intensity,D=N.distance,X=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Ti?X=N.shadow.map.texture:X=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=V.r*Z,d+=V.g*Z,h+=V.b*Z;else if(N.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(N.sh.coefficients[G],Z);L++}else if(N.isSunLight){let G=t.get(N);if(G.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let k=N.shadow,tt=e.get(N);tt.shadowIntensity=k.intensity,tt.shadowBias=k.bias,tt.shadowNormalBias=k.normalBias,tt.shadowRadius=k.radius,tt.shadowMapSize.copy(k.mapSize).multiply(k.getFrameExtents()),n.sunShadow[g]=tt,n.sunShadowMap[g]=X;let Tt=k.getViewportCount();for(let yt=0;yt<Tt;yt++)n.sunShadowMatrix[x+yt]=k.getMatrix(yt),n.sunShadowCascade[x+yt]=k._cascadeData[yt];x+=Tt,g++}n.sun[f]=G,f++}else if(N.isDirectionalLight){let G=t.get(N);if(G.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let k=N.shadow,tt=e.get(N);tt.shadowIntensity=k.intensity,tt.shadowBias=k.bias,tt.shadowNormalBias=k.normalBias,tt.shadowRadius=k.radius,tt.shadowMapSize=k.mapSize,n.directionalShadow[m]=tt,n.directionalShadowMap[m]=X,n.directionalShadowMatrix[m]=N.shadow.matrix,b++}n.directional[m]=G,m++}else if(N.isSpotLight){let G=t.get(N);G.position.setFromMatrixPosition(N.matrixWorld),G.color.copy(V).multiplyScalar(Z),G.distance=D,G.coneCos=Math.cos(N.angle),G.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),G.decay=N.decay,n.spot[S]=G;let k=N.shadow;if(N.map&&(n.spotLightMap[y]=N.map,y++,k.updateMatrices(N),N.castShadow&&T++),n.spotLightMatrix[S]=k.matrix,N.castShadow){let tt=e.get(N);tt.shadowIntensity=k.intensity,tt.shadowBias=k.bias,tt.shadowNormalBias=k.normalBias,tt.shadowRadius=k.radius,tt.shadowMapSize=k.mapSize,n.spotShadow[S]=tt,n.spotShadowMap[S]=X,R++}S++}else if(N.isRectAreaLight){let G=t.get(N);G.color.copy(V).multiplyScalar(Z),G.halfWidth.set(N.width*.5,0,0),G.halfHeight.set(0,N.height*.5,0),n.rectArea[A]=G,A++}else if(N.isPointLight){let G=t.get(N);if(G.color.copy(N.color).multiplyScalar(N.intensity),G.distance=N.distance,G.decay=N.decay,N.castShadow){let k=N.shadow,tt=e.get(N);tt.shadowIntensity=k.intensity,tt.shadowBias=k.bias,tt.shadowNormalBias=k.normalBias,tt.shadowRadius=k.radius,tt.shadowMapSize=k.mapSize,tt.shadowCameraNear=k.camera.near,tt.shadowCameraFar=k.camera.far,n.pointShadow[p]=tt,n.pointShadowMap[p]=X,n.pointShadowMatrix[p]=N.shadow.matrix,w++}n.point[p]=G,p++}else if(N.isHemisphereLight){let G=t.get(N);G.skyColor.copy(N.color).multiplyScalar(Z),G.groundColor.copy(N.groundColor).multiplyScalar(Z),n.hemi[v]=G,v++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=At.LTC_FLOAT_1,n.rectAreaLTC2=At.LTC_FLOAT_2):(n.rectAreaLTC1=At.LTC_HALF_1,n.rectAreaLTC2=At.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;let I=n.hash;(I.sunLength!==f||I.directionalLength!==m||I.pointLength!==p||I.spotLength!==S||I.rectAreaLength!==A||I.hemiLength!==v||I.numSunShadows!==g||I.numDirectionalShadows!==b||I.numPointShadows!==w||I.numSpotShadows!==R||I.numSpotMaps!==y||I.numLightProbes!==L)&&(n.sun.length=f,n.directional.length=m,n.spot.length=S,n.rectArea.length=A,n.point.length=p,n.hemi.length=v,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+y-T,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=L,I.sunLength=f,I.directionalLength=m,I.pointLength=p,I.spotLength=S,I.rectAreaLength=A,I.hemiLength=v,I.numSunShadows=g,I.numDirectionalShadows=b,I.numPointShadows=w,I.numSpotShadows=R,I.numSpotMaps=y,I.numLightProbes=L,n.version=n_++)}function l(c,u){let d=0,h=0,f=0,g=0,x=0,m=0,p=u.matrixWorldInverse;for(let S=0,A=c.length;S<A;S++){let v=c[S];if(v.isSunLight){let b=n.sun[d];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(p),d++}else if(v.isDirectionalLight){let b=n.directional[h];b.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(p),h++}else if(v.isSpotLight){let b=n.spot[g];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(p),g++}else if(v.isRectAreaLight){let b=n.rectArea[x];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(p),a.identity(),r.copy(v.matrixWorld),r.premultiply(p),a.extractRotation(r),b.halfWidth.set(v.width*.5,0,0),b.halfHeight.set(0,v.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),x++}else if(v.isPointLight){let b=n.point[f];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){let b=n.hemi[m];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:n}}function Pu(i){let t=new s_(i),e=[],n=[],s=[];function r(h){d.camera=h,e.length=0,n.length=0,s.length=0}function a(h){e.push(h)}function o(h){n.push(h)}function l(h){s.push(h)}function c(){t.setup(e)}function u(h){t.setupView(e,h)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function r_(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Pu(i),t.set(s,[o])):r>=a.length?(o=new Pu(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var a_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,o_=`uniform sampler2D shadow_pass;
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
}`,l_=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],c_=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Iu=new Ae,zr=new U,Sc=new U;function h_(i,t,e){let n=new Ts,s=new ut,r=new ut,a=new Ce,o=new Fa,l=new Oa,c={},u=e.maxTextureSize,d={[Mi]:an,[an]:Mi,[hn]:hn},h=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:a_,fragmentShader:o_}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let g=new Oe;g.setAttribute("position",new nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new ae(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hi;let p=this.type;this.render=function(w,R,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===Mh&&($t("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Hi);let T=i.getRenderTarget(),L=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Gn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let H=p!==this.type;H&&R.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(V=>V.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,V=w.length;N<V;N++){let Z=w[N],D=Z.shadow;if(D===void 0){$t("WebGLShadowMap:",Z,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;s.copy(D.mapSize);let X=D.getFrameExtents();s.multiply(X),r.copy(D.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/X.x),s.x=r.x*X.x,D.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/X.y),s.y=r.y*X.y,D.mapSize.y=r.y));let G=i.state.buffers.depth.getReversed();if(D.camera._reversedDepth=G,D.map===null||H===!0){if(D.map!==null&&(D.map.depthTexture!==null&&(D.map.depthTexture.dispose(),D.map.depthTexture=null),D.map.dispose()),this.type===Ls){if(Z.isPointLight){$t("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}D.map=new cn(s.x,s.y,{format:Ti,type:Nn,minFilter:Xe,magFilter:Xe,generateMipmaps:!1}),D.map.texture.name=Z.name+".shadowMap",D.map.depthTexture=new mi(s.x,s.y,Dn),D.map.depthTexture.name=Z.name+".shadowMapDepth",D.map.depthTexture.format=zn,D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=Ge,D.map.depthTexture.magFilter=Ge}else Z.isPointLight?(D.map=new Wo(s.x),D.map.depthTexture=new Ca(s.x,Ln)):(D.map=new cn(s.x,s.y),D.map.depthTexture=new mi(s.x,s.y,Ln)),D.map.depthTexture.name=Z.name+".shadowMap",D.map.depthTexture.format=zn,this.type===Hi?(D.map.depthTexture.compareFunction=G?ko:zo,D.map.depthTexture.minFilter=Xe,D.map.depthTexture.magFilter=Xe):(D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=Ge,D.map.depthTexture.magFilter=Ge);D.camera.updateProjectionMatrix()}D.map.isWebGLCubeRenderTarget!==!0&&(D.map.width!==s.x||D.map.height!==s.y)&&D.map.setSize(s.x,s.y);let k=D.map.isWebGLCubeRenderTarget?6:D.getViewportCount();Z.isPointLight!==!0&&D.updateMatrices(Z,y);for(let tt=0;tt<k;tt++){let Tt=D.getCamera(tt);if(Z.isPointLight){let yt=D.camera,ee=D.matrix,Kt=Z.distance||yt.far;Kt!==yt.far&&(yt.far=Kt,yt.updateProjectionMatrix()),zr.setFromMatrixPosition(Z.matrixWorld),yt.position.copy(zr),Sc.copy(yt.position),Sc.add(l_[tt]),yt.up.copy(c_[tt]),yt.lookAt(Sc),yt.updateMatrixWorld(),ee.makeTranslation(-zr.x,-zr.y,-zr.z),Iu.multiplyMatrices(yt.projectionMatrix,yt.matrixWorldInverse),D._frustum.setFromProjectionMatrix(Iu,yt.coordinateSystem,yt.reversedDepth)}if(D.map.isWebGLCubeRenderTarget)i.setRenderTarget(D.map,tt),i.clear();else{tt===0&&(i.setRenderTarget(D.map),i.clear());let yt=D.getViewport(tt);a.set(r.x*yt.x,r.y*yt.y,r.x*yt.z,r.y*yt.w),B.viewport(a)}n=D.getFrustum(tt),v(R,y,Tt,Z,this.type)}D.isPointLightShadow!==!0&&this.type===Ls&&S(D,y),D.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(T,L,I)};function S(w,R){let y=t.update(x);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null?w.mapPass=new cn(s.x,s.y,{format:Ti,type:Nn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),h.uniforms.shadow_pass.value=w.map.depthTexture,h.uniforms.resolution.value.set(w.map.width,w.map.height),h.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(R,null,y,h,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(R,null,y,f,x,null)}function A(w,R,y,T){let L=null,I=y.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)L=I;else if(L=y.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let B=L.uuid,H=R.uuid,N=c[B];N===void 0&&(N={},c[B]=N);let V=N[H];V===void 0&&(V=L.clone(),N[H]=V,R.addEventListener("dispose",b)),L=V}if(L.visible=R.visible,L.wireframe=R.wireframe,T===Ls?L.side=R.shadowSide!==null?R.shadowSide:R.side:L.side=R.shadowSide!==null?R.shadowSide:d[R.side],L.alphaMap=R.alphaMap,L.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,L.map=R.map,L.clipShadows=R.clipShadows,L.clippingPlanes=R.clippingPlanes,L.clipIntersection=R.clipIntersection,L.displacementMap=R.displacementMap,L.displacementScale=R.displacementScale,L.displacementBias=R.displacementBias,L.wireframeLinewidth=R.wireframeLinewidth,L.linewidth=R.linewidth,y.isPointLight===!0&&L.isMeshDistanceMaterial===!0){let B=i.properties.get(L);B.light=y}return L}function v(w,R,y,T,L){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&L===Ls)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,w.matrixWorld);let H=t.update(w),N=w.material;if(Array.isArray(N)){let V=H.groups;for(let Z=0,D=V.length;Z<D;Z++){let X=V[Z],G=N[X.materialIndex];if(G&&G.visible){let k=A(w,G,T,L);w.onBeforeShadow(i,w,R,y,H,k,X),i.renderBufferDirect(y,null,H,k,w,X),w.onAfterShadow(i,w,R,y,H,k,X)}}}else if(N.visible){let V=A(w,N,T,L);w.onBeforeShadow(i,w,R,y,H,V,null),i.renderBufferDirect(y,null,H,V,w,null),w.onAfterShadow(i,w,R,y,H,V,null)}}let B=w.children;for(let H=0,N=B.length;H<N;H++)v(B[H],R,y,T,L)}function b(w){w.target.removeEventListener("dispose",b);for(let y in c){let T=c[y],L=w.target.uuid;L in T&&(T[L].dispose(),delete T[L])}}}function u_(i,t){function e(){let O=!1,vt=new Ce,rt=null,St=new Ce(0,0,0,0);return{setMask:function(Ct){rt!==Ct&&!O&&(i.colorMask(Ct,Ct,Ct,Ct),rt=Ct)},setLocked:function(Ct){O=Ct},setClear:function(Ct,ot,Gt,It,ge){ge===!0&&(Ct*=It,ot*=It,Gt*=It),vt.set(Ct,ot,Gt,It),St.equals(vt)===!1&&(i.clearColor(Ct,ot,Gt,It),St.copy(vt))},reset:function(){O=!1,rt=null,St.set(-1,0,0,0)}}}function n(){let O=!1,vt=!1,rt=null,St=null,Ct=null;return{setReversed:function(ot){if(vt!==ot){let Gt=t.get("EXT_clip_control");ot?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT),vt=ot;let It=Ct;Ct=null,this.setClear(It)}},getReversed:function(){return vt},setTest:function(ot){ot?it(i.DEPTH_TEST):pt(i.DEPTH_TEST)},setMask:function(ot){rt!==ot&&!O&&(i.depthMask(ot),rt=ot)},setFunc:function(ot){if(vt&&(ot=nu[ot]),St!==ot){switch(ot){case pa:i.depthFunc(i.NEVER);break;case ma:i.depthFunc(i.ALWAYS);break;case ga:i.depthFunc(i.LESS);break;case _s:i.depthFunc(i.LEQUAL);break;case _a:i.depthFunc(i.EQUAL);break;case xa:i.depthFunc(i.GEQUAL);break;case ya:i.depthFunc(i.GREATER);break;case va:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}St=ot}},setLocked:function(ot){O=ot},setClear:function(ot){Ct!==ot&&(Ct=ot,vt&&(ot=1-ot),i.clearDepth(ot))},reset:function(){O=!1,rt=null,St=null,Ct=null,vt=!1}}}function s(){let O=!1,vt=null,rt=null,St=null,Ct=null,ot=null,Gt=null,It=null,ge=null;return{setTest:function(fe){O||(fe?it(i.STENCIL_TEST):pt(i.STENCIL_TEST))},setMask:function(fe){vt!==fe&&!O&&(i.stencilMask(fe),vt=fe)},setFunc:function(fe,Ye,Fe){(rt!==fe||St!==Ye||Ct!==Fe)&&(i.stencilFunc(fe,Ye,Fe),rt=fe,St=Ye,Ct=Fe)},setOp:function(fe,Ye,Fe){(ot!==fe||Gt!==Ye||It!==Fe)&&(i.stencilOp(fe,Ye,Fe),ot=fe,Gt=Ye,It=Fe)},setLocked:function(fe){O=fe},setClear:function(fe){ge!==fe&&(i.clearStencil(fe),ge=fe)},reset:function(){O=!1,vt=null,rt=null,St=null,Ct=null,ot=null,Gt=null,It=null,ge=null}}}let r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap,u={},d={},h={},f=new WeakMap,g=[],x=null,m=!1,p=null,S=null,A=null,v=null,b=null,w=null,R=null,y=new te(0,0,0),T=0,L=!1,I=null,B=null,H=null,N=null,V=null,Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),D=!1,X=0,G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(G)[1]),D=X>=1):G.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),D=X>=2);let k=null,tt={},Tt=i.getParameter(i.SCISSOR_BOX),yt=i.getParameter(i.VIEWPORT),ee=new Ce().fromArray(Tt),Kt=new Ce().fromArray(yt);function Yt(O,vt,rt,St){let Ct=new Uint8Array(4),ot=i.createTexture();i.bindTexture(O,ot),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Gt=0;Gt<rt;Gt++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(vt,0,i.RGBA,1,1,St,0,i.RGBA,i.UNSIGNED_BYTE,Ct):i.texImage2D(vt+Gt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ct);return ot}let K={};K[i.TEXTURE_2D]=Yt(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=Yt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=Yt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=Yt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),it(i.DEPTH_TEST),a.setFunc(_s),ht(!1),_t(Fl),it(i.CULL_FACE),at(Gn);function it(O){u[O]!==!0&&(i.enable(O),u[O]=!0)}function pt(O){u[O]!==!1&&(i.disable(O),u[O]=!1)}function Dt(O,vt){return h[O]!==vt?(i.bindFramebuffer(O,vt),h[O]=vt,O===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=vt),O===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=vt),!0):!1}function xt(O,vt){let rt=g,St=!1;if(O){rt=f.get(vt),rt===void 0&&(rt=[],f.set(vt,rt));let Ct=O.textures;if(rt.length!==Ct.length||rt[0]!==i.COLOR_ATTACHMENT0){for(let ot=0,Gt=Ct.length;ot<Gt;ot++)rt[ot]=i.COLOR_ATTACHMENT0+ot;rt.length=Ct.length,St=!0}}else rt[0]!==i.BACK&&(rt[0]=i.BACK,St=!0);St&&i.drawBuffers(rt)}function Vt(O){return x!==O?(i.useProgram(O),x=O,!0):!1}let Zt={[Wi]:i.FUNC_ADD,[bh]:i.FUNC_SUBTRACT,[wh]:i.FUNC_REVERSE_SUBTRACT};Zt[Th]=i.MIN,Zt[Eh]=i.MAX;let j={[Ah]:i.ZERO,[Ch]:i.ONE,[Rh]:i.SRC_COLOR,[kl]:i.SRC_ALPHA,[Uh]:i.SRC_ALPHA_SATURATE,[Dh]:i.DST_COLOR,[Ih]:i.DST_ALPHA,[Ph]:i.ONE_MINUS_SRC_COLOR,[Vl]:i.ONE_MINUS_SRC_ALPHA,[Nh]:i.ONE_MINUS_DST_COLOR,[Lh]:i.ONE_MINUS_DST_ALPHA,[Fh]:i.CONSTANT_COLOR,[Oh]:i.ONE_MINUS_CONSTANT_COLOR,[Bh]:i.CONSTANT_ALPHA,[zh]:i.ONE_MINUS_CONSTANT_ALPHA};function at(O,vt,rt,St,Ct,ot,Gt,It,ge,fe){if(O===Gn){m===!0&&(pt(i.BLEND),m=!1);return}if(m===!1&&(it(i.BLEND),m=!0),O!==Sh){if(O!==p||fe!==L){if((S!==Wi||b!==Wi)&&(i.blendEquation(i.FUNC_ADD),S=Wi,b=Wi),fe)switch(O){case Ds:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ol:i.blendFunc(i.ONE,i.ONE);break;case Bl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Jt("WebGLState: Invalid blending: ",O);break}else switch(O){case Ds:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ol:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Bl:Jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zl:Jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Jt("WebGLState: Invalid blending: ",O);break}A=null,v=null,w=null,R=null,y.set(0,0,0),T=0,p=O,L=fe}return}Ct=Ct||vt,ot=ot||rt,Gt=Gt||St,(vt!==S||Ct!==b)&&(i.blendEquationSeparate(Zt[vt],Zt[Ct]),S=vt,b=Ct),(rt!==A||St!==v||ot!==w||Gt!==R)&&(i.blendFuncSeparate(j[rt],j[St],j[ot],j[Gt]),A=rt,v=St,w=ot,R=Gt),(It.equals(y)===!1||ge!==T)&&(i.blendColor(It.r,It.g,It.b,ge),y.copy(It),T=ge),p=O,L=!1}function dt(O,vt){O.side===hn?pt(i.CULL_FACE):it(i.CULL_FACE);let rt=O.side===an;vt&&(rt=!rt),ht(rt),O.blending===Ds&&O.transparent===!1?at(Gn):at(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),r.setMask(O.colorWrite);let St=O.stencilWrite;o.setTest(St),St&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Nt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?it(i.SAMPLE_ALPHA_TO_COVERAGE):pt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ht(O){I!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),I=O)}function _t(O){O!==yh?(it(i.CULL_FACE),O!==B&&(O===Fl?i.cullFace(i.BACK):O===vh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pt(i.CULL_FACE),B=O}function Xt(O){O!==H&&(D&&i.lineWidth(O),H=O)}function Nt(O,vt,rt){O?(it(i.POLYGON_OFFSET_FILL),(N!==vt||V!==rt)&&(N=vt,V=rt,a.getReversed()&&(vt=-vt),i.polygonOffset(vt,rt))):pt(i.POLYGON_OFFSET_FILL)}function mt(O){O?it(i.SCISSOR_TEST):pt(i.SCISSOR_TEST)}function $(O){O===void 0&&(O=i.TEXTURE0+Z-1),k!==O&&(i.activeTexture(O),k=O)}function C(O,vt,rt){rt===void 0&&(k===null?rt=i.TEXTURE0+Z-1:rt=k);let St=tt[rt];St===void 0&&(St={type:void 0,texture:void 0},tt[rt]=St),(St.type!==O||St.texture!==vt)&&(k!==rt&&(i.activeTexture(rt),k=rt),i.bindTexture(O,vt||K[O]),St.type=O,St.texture=vt)}function ce(){let O=tt[k];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function ie(){try{i.compressedTexImage2D(...arguments)}catch(O){Jt("WebGLState:",O)}}function E(){try{i.compressedTexImage3D(...arguments)}catch(O){Jt("WebGLState:",O)}}function _(){try{i.texSubImage2D(...arguments)}catch(O){Jt("WebGLState:",O)}}function z(){try{i.texSubImage3D(...arguments)}catch(O){Jt("WebGLState:",O)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(O){Jt("WebGLState:",O)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(O){Jt("WebGLState:",O)}}function lt(){try{i.texStorage2D(...arguments)}catch(O){Jt("WebGLState:",O)}}function ft(){try{i.texStorage3D(...arguments)}catch(O){Jt("WebGLState:",O)}}function et(){try{i.texImage2D(...arguments)}catch(O){Jt("WebGLState:",O)}}function nt(){try{i.texImage3D(...arguments)}catch(O){Jt("WebGLState:",O)}}function gt(O){return d[O]!==void 0?d[O]:i.getParameter(O)}function Ut(O,vt){d[O]!==vt&&(i.pixelStorei(O,vt),d[O]=vt)}function bt(O){ee.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),ee.copy(O))}function Mt(O){Kt.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Kt.copy(O))}function Bt(O,vt){let rt=c.get(vt);rt===void 0&&(rt=new WeakMap,c.set(vt,rt));let St=rt.get(O);St===void 0&&(St=i.getUniformBlockIndex(vt,O.name),rt.set(O,St))}function Ht(O,vt){let St=c.get(vt).get(O);l.get(vt)!==St&&(i.uniformBlockBinding(vt,St,O.__bindingPointIndex),l.set(vt,St))}function jt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},k=null,tt={},h={},f=new WeakMap,g=[],x=null,m=!1,p=null,S=null,A=null,v=null,b=null,w=null,R=null,y=new te(0,0,0),T=0,L=!1,I=null,B=null,H=null,N=null,V=null,ee.set(0,0,i.canvas.width,i.canvas.height),Kt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:it,disable:pt,bindFramebuffer:Dt,drawBuffers:xt,useProgram:Vt,setBlending:at,setMaterial:dt,setFlipSided:ht,setCullFace:_t,setLineWidth:Xt,setPolygonOffset:Nt,setScissorTest:mt,activeTexture:$,bindTexture:C,unbindTexture:ce,compressedTexImage2D:ie,compressedTexImage3D:E,texImage2D:et,texImage3D:nt,pixelStorei:Ut,getParameter:gt,updateUBOMapping:Bt,uniformBlockBinding:Ht,texStorage2D:lt,texStorage3D:ft,texSubImage2D:_,texSubImage3D:z,compressedTexSubImage2D:q,compressedTexSubImage3D:Q,scissor:bt,viewport:Mt,reset:jt}}function d_(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ut,u=new WeakMap,d=new Set,h,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(E,_){return g?new OffscreenCanvas(E,_):ir("canvas")}function m(E,_,z){let q=1,Q=ie(E);if((Q.width>z||Q.height>z)&&(q=z/Math.max(Q.width,Q.height)),q<1)if(typeof HTMLImageElement!="undefined"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&E instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&E instanceof ImageBitmap||typeof VideoFrame!="undefined"&&E instanceof VideoFrame){let lt=Math.floor(q*Q.width),ft=Math.floor(q*Q.height);h===void 0&&(h=x(lt,ft));let et=_?x(lt,ft):h;return et.width=lt,et.height=ft,et.getContext("2d").drawImage(E,0,0,lt,ft),$t("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+lt+"x"+ft+")."),et}else return"data"in E&&$t("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),E;return E}function p(E){return E.generateMipmaps}function S(E){i.generateMipmap(E)}function A(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(E,_,z,q,Q,lt=!1){if(E!==null){if(i[E]!==void 0)return i[E];$t("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let ft;q&&(ft=t.get("EXT_texture_norm16"),ft||$t("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let et=_;if(_===i.RED&&(z===i.FLOAT&&(et=i.R32F),z===i.HALF_FLOAT&&(et=i.R16F),z===i.UNSIGNED_BYTE&&(et=i.R8),z===i.UNSIGNED_SHORT&&ft&&(et=ft.R16_EXT),z===i.SHORT&&ft&&(et=ft.R16_SNORM_EXT)),_===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(et=i.R8UI),z===i.UNSIGNED_SHORT&&(et=i.R16UI),z===i.UNSIGNED_INT&&(et=i.R32UI),z===i.BYTE&&(et=i.R8I),z===i.SHORT&&(et=i.R16I),z===i.INT&&(et=i.R32I)),_===i.RG&&(z===i.FLOAT&&(et=i.RG32F),z===i.HALF_FLOAT&&(et=i.RG16F),z===i.UNSIGNED_BYTE&&(et=i.RG8),z===i.UNSIGNED_SHORT&&ft&&(et=ft.RG16_EXT),z===i.SHORT&&ft&&(et=ft.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(et=i.RG8UI),z===i.UNSIGNED_SHORT&&(et=i.RG16UI),z===i.UNSIGNED_INT&&(et=i.RG32UI),z===i.BYTE&&(et=i.RG8I),z===i.SHORT&&(et=i.RG16I),z===i.INT&&(et=i.RG32I)),_===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(et=i.RGB8UI),z===i.UNSIGNED_SHORT&&(et=i.RGB16UI),z===i.UNSIGNED_INT&&(et=i.RGB32UI),z===i.BYTE&&(et=i.RGB8I),z===i.SHORT&&(et=i.RGB16I),z===i.INT&&(et=i.RGB32I)),_===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(et=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(et=i.RGBA16UI),z===i.UNSIGNED_INT&&(et=i.RGBA32UI),z===i.BYTE&&(et=i.RGBA8I),z===i.SHORT&&(et=i.RGBA16I),z===i.INT&&(et=i.RGBA32I)),_===i.RGB&&(z===i.UNSIGNED_SHORT&&ft&&(et=ft.RGB16_EXT),z===i.SHORT&&ft&&(et=ft.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(et=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(et=i.R11F_G11F_B10F)),_===i.RGBA){let nt=lt?nr:ue.getTransfer(Q);z===i.FLOAT&&(et=i.RGBA32F),z===i.HALF_FLOAT&&(et=i.RGBA16F),z===i.UNSIGNED_BYTE&&(et=nt===ye?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&ft&&(et=ft.RGBA16_EXT),z===i.SHORT&&ft&&(et=ft.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(et=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(et=i.RGB5_A1)}return(et===i.R16F||et===i.R32F||et===i.RG16F||et===i.RG32F||et===i.RGBA16F||et===i.RGBA32F)&&t.get("EXT_color_buffer_float"),et}function b(E,_){let z;return E?_===null||_===Ln||_===Us?z=i.DEPTH24_STENCIL8:_===Dn?z=i.DEPTH32F_STENCIL8:_===Ns&&(z=i.DEPTH24_STENCIL8,$t("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Ln||_===Us?z=i.DEPTH_COMPONENT24:_===Dn?z=i.DEPTH_COMPONENT32F:_===Ns&&(z=i.DEPTH_COMPONENT16),z}function w(E,_){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==Ge&&E.minFilter!==Xe?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function R(E){let _=E.target;_.removeEventListener("dispose",R),T(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&d.delete(_)}function y(E){let _=E.target;_.removeEventListener("dispose",y),I(_)}function T(E){let _=n.get(E);if(_.__webglInit===void 0)return;let z=E.source,q=f.get(z);if(q){let Q=q[_.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&L(E),Object.keys(q).length===0&&f.delete(z)}n.remove(E)}function L(E){let _=n.get(E);i.deleteTexture(_.__webglTexture);let z=E.source,q=f.get(z);delete q[_.__cacheKey],a.memory.textures--}function I(E){let _=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(_.__webglFramebuffer[q]))for(let Q=0;Q<_.__webglFramebuffer[q].length;Q++)i.deleteFramebuffer(_.__webglFramebuffer[q][Q]);else i.deleteFramebuffer(_.__webglFramebuffer[q]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[q])}else{if(Array.isArray(_.__webglFramebuffer))for(let q=0;q<_.__webglFramebuffer.length;q++)i.deleteFramebuffer(_.__webglFramebuffer[q]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let q=0;q<_.__webglColorRenderbuffer.length;q++)_.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let z=E.textures;for(let q=0,Q=z.length;q<Q;q++){let lt=n.get(z[q]);lt.__webglTexture&&(i.deleteTexture(lt.__webglTexture),a.memory.textures--),n.remove(z[q])}n.remove(E)}let B=0;function H(){B=0}function N(){return B}function V(E){B=E}function Z(){let E=B;return E>=s.maxTextures&&$t("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+s.maxTextures),B+=1,E}function D(E){let _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function X(E,_){let z=n.get(E);if(E.isVideoTexture&&C(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&z.__version!==E.version){let q=E.image;if(q===null)$t("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)$t("WebGLRenderer: Texture marked for update but image is incomplete");else{pt(z,E,_);return}}else E.isExternalTexture&&(z.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+_)}function G(E,_){let z=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&z.__version!==E.version){pt(z,E,_);return}else E.isExternalTexture&&(z.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+_)}function k(E,_){let z=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&z.__version!==E.version){pt(z,E,_);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+_)}function tt(E,_){let z=n.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&z.__version!==E.version){Dt(z,E,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+_)}let Tt={[Ma]:i.REPEAT,[Bn]:i.CLAMP_TO_EDGE,[Sa]:i.MIRRORED_REPEAT},yt={[Ge]:i.NEAREST,[Gh]:i.NEAREST_MIPMAP_NEAREST,[Ir]:i.NEAREST_MIPMAP_LINEAR,[Xe]:i.LINEAR,[to]:i.LINEAR_MIPMAP_NEAREST,[bi]:i.LINEAR_MIPMAP_LINEAR},ee={[qh]:i.NEVER,[Kh]:i.ALWAYS,[Yh]:i.LESS,[zo]:i.LEQUAL,[Zh]:i.EQUAL,[ko]:i.GEQUAL,[$h]:i.GREATER,[Jh]:i.NOTEQUAL};function Kt(E,_){if(_.type===Dn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Xe||_.magFilter===to||_.magFilter===Ir||_.magFilter===bi||_.minFilter===Xe||_.minFilter===to||_.minFilter===Ir||_.minFilter===bi)&&$t("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,Tt[_.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,Tt[_.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,Tt[_.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,yt[_.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,yt[_.minFilter]),_.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,ee[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ge||_.minFilter!==Ir&&_.minFilter!==bi||_.type===Dn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(E,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Yt(E,_){let z=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",R));let q=_.source,Q=f.get(q);Q===void 0&&(Q={},f.set(q,Q));let lt=D(_);if(lt!==E.__cacheKey){Q[lt]===void 0&&(Q[lt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Q[lt].usedTimes++;let ft=Q[E.__cacheKey];ft!==void 0&&(Q[E.__cacheKey].usedTimes--,ft.usedTimes===0&&L(_)),E.__cacheKey=lt,E.__webglTexture=Q[lt].texture}return z}function K(E,_,z){return Math.floor(Math.floor(E/z)/_)}function it(E,_,z,q){let lt=E.updateRanges;if(lt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,z,q,_.data);else{lt.sort((Ut,bt)=>Ut.start-bt.start);let ft=0;for(let Ut=1;Ut<lt.length;Ut++){let bt=lt[ft],Mt=lt[Ut],Bt=bt.start+bt.count,Ht=K(Mt.start,_.width,4),jt=K(bt.start,_.width,4);Mt.start<=Bt+1&&Ht===jt&&K(Mt.start+Mt.count-1,_.width,4)===Ht?bt.count=Math.max(bt.count,Mt.start+Mt.count-bt.start):(++ft,lt[ft]=Mt)}lt.length=ft+1;let et=e.getParameter(i.UNPACK_ROW_LENGTH),nt=e.getParameter(i.UNPACK_SKIP_PIXELS),gt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Ut=0,bt=lt.length;Ut<bt;Ut++){let Mt=lt[Ut],Bt=Math.floor(Mt.start/4),Ht=Math.ceil(Mt.count/4),jt=Bt%_.width,O=Math.floor(Bt/_.width),vt=Ht,rt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,jt),e.pixelStorei(i.UNPACK_SKIP_ROWS,O),e.texSubImage2D(i.TEXTURE_2D,0,jt,O,vt,rt,z,q,_.data)}E.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,et),e.pixelStorei(i.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(i.UNPACK_SKIP_ROWS,gt)}}function pt(E,_,z){let q=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(q=i.TEXTURE_3D);let Q=Yt(E,_),lt=_.source;e.bindTexture(q,E.__webglTexture,i.TEXTURE0+z);let ft=n.get(lt);if(lt.version!==ft.__version||Q===!0){if(e.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap!="undefined"&&_.image instanceof ImageBitmap)===!1){let rt=ue.getPrimaries(ue.workingColorSpace),St=_.colorSpace===jn?null:ue.getPrimaries(_.colorSpace),Ct=_.colorSpace===jn||rt===St?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct)}e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let nt=m(_.image,!1,s.maxTextureSize);nt=ce(_,nt);let gt=r.convert(_.format,_.colorSpace),Ut=r.convert(_.type),bt=v(_.internalFormat,gt,Ut,_.normalized,_.colorSpace,_.isVideoTexture);Kt(q,_);let Mt,Bt=_.mipmaps,Ht=_.isVideoTexture!==!0,jt=ft.__version===void 0||Q===!0,O=lt.dataReady,vt=w(_,nt);if(_.isDepthTexture)bt=b(_.format===wi,_.type),jt&&(Ht?e.texStorage2D(i.TEXTURE_2D,1,bt,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,bt,nt.width,nt.height,0,gt,Ut,null));else if(_.isDataTexture)if(Bt.length>0){Ht&&jt&&e.texStorage2D(i.TEXTURE_2D,vt,bt,Bt[0].width,Bt[0].height);for(let rt=0,St=Bt.length;rt<St;rt++)Mt=Bt[rt],Ht?O&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,Mt.width,Mt.height,gt,Ut,Mt.data):e.texImage2D(i.TEXTURE_2D,rt,bt,Mt.width,Mt.height,0,gt,Ut,Mt.data);_.generateMipmaps=!1}else Ht?(jt&&e.texStorage2D(i.TEXTURE_2D,vt,bt,nt.width,nt.height),O&&it(_,nt,gt,Ut)):e.texImage2D(i.TEXTURE_2D,0,bt,nt.width,nt.height,0,gt,Ut,nt.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ht&&jt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,vt,bt,Bt[0].width,Bt[0].height,nt.depth);for(let rt=0,St=Bt.length;rt<St;rt++)if(Mt=Bt[rt],_.format!==Sn)if(gt!==null)if(Ht){if(O)if(_.layerUpdates.size>0){let Ct=uc(Mt.width,Mt.height,_.format,_.type);for(let ot of _.layerUpdates){let Gt=Mt.data.subarray(ot*Ct/Mt.data.BYTES_PER_ELEMENT,(ot+1)*Ct/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,ot,Mt.width,Mt.height,1,gt,Gt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,0,Mt.width,Mt.height,nt.depth,gt,Mt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,rt,bt,Mt.width,Mt.height,nt.depth,0,Mt.data,0,0);else $t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?O&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,0,Mt.width,Mt.height,nt.depth,gt,Ut,Mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,rt,bt,Mt.width,Mt.height,nt.depth,0,gt,Ut,Mt.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Ht&&jt&&e.texStorage2D(i.TEXTURE_2D,vt,bt,Bt[0].width,Bt[0].height);for(let rt=0,St=Bt.length;rt<St;rt++)Mt=Bt[rt],_.format!==Sn?gt!==null?Ht?O&&e.compressedTexSubImage2D(i.TEXTURE_2D,rt,0,0,Mt.width,Mt.height,gt,Mt.data):e.compressedTexImage2D(i.TEXTURE_2D,rt,bt,Mt.width,Mt.height,0,Mt.data):$t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?O&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,Mt.width,Mt.height,gt,Ut,Mt.data):e.texImage2D(i.TEXTURE_2D,rt,bt,Mt.width,Mt.height,0,gt,Ut,Mt.data)}else if(_.isDataArrayTexture)if(Ht){if(jt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,vt,bt,nt.width,nt.height,nt.depth),O)if(_.layerUpdates.size>0){let rt=uc(nt.width,nt.height,_.format,_.type);for(let St of _.layerUpdates){let Ct=nt.data.subarray(St*rt/nt.data.BYTES_PER_ELEMENT,(St+1)*rt/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,St,nt.width,nt.height,1,gt,Ut,Ct)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,gt,Ut,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,bt,nt.width,nt.height,nt.depth,0,gt,Ut,nt.data);else if(_.isData3DTexture)Ht?(jt&&e.texStorage3D(i.TEXTURE_3D,vt,bt,nt.width,nt.height,nt.depth),O&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,gt,Ut,nt.data)):e.texImage3D(i.TEXTURE_3D,0,bt,nt.width,nt.height,nt.depth,0,gt,Ut,nt.data);else if(_.isFramebufferTexture){if(jt)if(Ht)e.texStorage2D(i.TEXTURE_2D,vt,bt,nt.width,nt.height);else{let rt=nt.width,St=nt.height;for(let Ct=0;Ct<vt;Ct++)e.texImage2D(i.TEXTURE_2D,Ct,bt,rt,St,0,gt,Ut,null),rt>>=1,St>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let rt=i.canvas;if(rt.hasAttribute("layoutsubtree")||rt.setAttribute("layoutsubtree","true"),nt.parentNode!==rt){rt.appendChild(nt),d.add(_),rt.onpaint=St=>{let Ct=St.changedElements;for(let ot of d)Ct.includes(ot.image)&&(ot.needsUpdate=!0)},rt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,nt);else{let Ct=i.RGBA,ot=i.RGBA,Gt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ct,ot,Gt,nt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Bt.length>0){if(Ht&&jt){let rt=ie(Bt[0]);e.texStorage2D(i.TEXTURE_2D,vt,bt,rt.width,rt.height)}for(let rt=0,St=Bt.length;rt<St;rt++)Mt=Bt[rt],Ht?O&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,gt,Ut,Mt):e.texImage2D(i.TEXTURE_2D,rt,bt,gt,Ut,Mt);_.generateMipmaps=!1}else if(Ht){if(jt){let rt=ie(nt);e.texStorage2D(i.TEXTURE_2D,vt,bt,rt.width,rt.height)}O&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt,Ut,nt)}else e.texImage2D(i.TEXTURE_2D,0,bt,gt,Ut,nt);p(_)&&S(q),ft.__version=lt.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function Dt(E,_,z){if(_.image.length!==6)return;let q=Yt(E,_),Q=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+z);let lt=n.get(Q);if(Q.version!==lt.__version||q===!0){e.activeTexture(i.TEXTURE0+z);let ft=ue.getPrimaries(ue.workingColorSpace),et=_.colorSpace===jn?null:ue.getPrimaries(_.colorSpace),nt=_.colorSpace===jn||ft===et?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let gt=_.isCompressedTexture||_.image[0].isCompressedTexture,Ut=_.image[0]&&_.image[0].isDataTexture,bt=[];for(let ot=0;ot<6;ot++)!gt&&!Ut?bt[ot]=m(_.image[ot],!0,s.maxCubemapSize):bt[ot]=Ut?_.image[ot].image:_.image[ot],bt[ot]=ce(_,bt[ot]);let Mt=bt[0],Bt=r.convert(_.format,_.colorSpace),Ht=r.convert(_.type),jt=v(_.internalFormat,Bt,Ht,_.normalized,_.colorSpace),O=_.isVideoTexture!==!0,vt=lt.__version===void 0||q===!0,rt=Q.dataReady,St=w(_,Mt);Kt(i.TEXTURE_CUBE_MAP,_);let Ct;if(gt){O&&vt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,St,jt,Mt.width,Mt.height);for(let ot=0;ot<6;ot++){Ct=bt[ot].mipmaps;for(let Gt=0;Gt<Ct.length;Gt++){let It=Ct[Gt];_.format!==Sn?Bt!==null?O?rt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Gt,0,0,It.width,It.height,Bt,It.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Gt,jt,It.width,It.height,0,It.data):$t("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Gt,0,0,It.width,It.height,Bt,Ht,It.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Gt,jt,It.width,It.height,0,Bt,Ht,It.data)}}}else{if(Ct=_.mipmaps,O&&vt){Ct.length>0&&St++;let ot=ie(bt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,St,jt,ot.width,ot.height)}for(let ot=0;ot<6;ot++)if(Ut){O?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,bt[ot].width,bt[ot].height,Bt,Ht,bt[ot].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,jt,bt[ot].width,bt[ot].height,0,Bt,Ht,bt[ot].data);for(let Gt=0;Gt<Ct.length;Gt++){let ge=Ct[Gt].image[ot].image;O?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Gt+1,0,0,ge.width,ge.height,Bt,Ht,ge.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Gt+1,jt,ge.width,ge.height,0,Bt,Ht,ge.data)}}else{O?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Bt,Ht,bt[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,jt,Bt,Ht,bt[ot]);for(let Gt=0;Gt<Ct.length;Gt++){let It=Ct[Gt];O?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Gt+1,0,0,Bt,Ht,It.image[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Gt+1,jt,Bt,Ht,It.image[ot])}}}p(_)&&S(i.TEXTURE_CUBE_MAP),lt.__version=Q.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function xt(E,_,z,q,Q,lt){let ft=r.convert(z.format,z.colorSpace),et=r.convert(z.type),nt=v(z.internalFormat,ft,et,z.normalized,z.colorSpace),gt=n.get(_),Ut=n.get(z);if(Ut.__renderTarget=_,!gt.__hasExternalTextures){let bt=Math.max(1,_.width>>lt),Mt=Math.max(1,_.height>>lt);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,lt,nt,bt,Mt,_.depth,0,ft,et,null):e.texImage2D(Q,lt,nt,bt,Mt,0,ft,et,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),$(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,Q,Ut.__webglTexture,0,mt(_)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,Q,Ut.__webglTexture,lt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Vt(E,_,z){if(i.bindRenderbuffer(i.RENDERBUFFER,E),_.depthBuffer){let q=_.depthTexture,Q=q&&q.isDepthTexture?q.type:null,lt=b(_.stencilBuffer,Q),ft=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;$(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,mt(_),lt,_.width,_.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,mt(_),lt,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,lt,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ft,i.RENDERBUFFER,E)}else{let q=_.textures;for(let Q=0;Q<q.length;Q++){let lt=q[Q],ft=r.convert(lt.format,lt.colorSpace),et=r.convert(lt.type),nt=v(lt.internalFormat,ft,et,lt.normalized,lt.colorSpace);$(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,mt(_),nt,_.width,_.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,mt(_),nt,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,nt,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Zt(E,_,z){let q=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Q=n.get(_.depthTexture);if(Q.__renderTarget=_,(!Q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,_.depthTexture.addEventListener("dispose",R)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),Kt(i.TEXTURE_CUBE_MAP,_.depthTexture);let gt=r.convert(_.depthTexture.format),Ut=r.convert(_.depthTexture.type),bt;_.depthTexture.format===zn?bt=i.DEPTH_COMPONENT24:_.depthTexture.format===wi&&(bt=i.DEPTH24_STENCIL8);for(let Mt=0;Mt<6;Mt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,bt,_.width,_.height,0,gt,Ut,null)}}else X(_.depthTexture,0);let lt=Q.__webglTexture,ft=mt(_),et=q?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,nt=_.depthTexture.format===wi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===zn)$(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,et,lt,0,ft):i.framebufferTexture2D(i.FRAMEBUFFER,nt,et,lt,0);else if(_.depthTexture.format===wi)$(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,et,lt,0,ft):i.framebufferTexture2D(i.FRAMEBUFFER,nt,et,lt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function j(E){let _=n.get(E),z=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){let q=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),q){let Q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,q.removeEventListener("dispose",Q)};q.addEventListener("dispose",Q),_.__depthDisposeCallback=Q}_.__boundDepthTexture=q}if(E.depthTexture&&!_.__autoAllocateDepthBuffer)if(z)for(let q=0;q<6;q++)Zt(_.__webglFramebuffer[q],E,q);else{let q=E.texture.mipmaps;q&&q.length>0?Zt(_.__webglFramebuffer[0],E,0):Zt(_.__webglFramebuffer,E,0)}else if(z){_.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[q]),_.__webglDepthbuffer[q]===void 0)_.__webglDepthbuffer[q]=i.createRenderbuffer(),Vt(_.__webglDepthbuffer[q],E,!1);else{let Q=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=_.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,lt),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,lt)}}else{let q=E.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Vt(_.__webglDepthbuffer,E,!1);else{let Q=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,lt),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,lt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function at(E,_,z){let q=n.get(E);_!==void 0&&xt(q.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&j(E)}function dt(E){let _=E.texture,z=n.get(E),q=n.get(_);E.addEventListener("dispose",y);let Q=E.textures,lt=E.isWebGLCubeRenderTarget===!0,ft=Q.length>1;if(ft||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=_.version,a.memory.textures++),lt){z.__webglFramebuffer=[];for(let et=0;et<6;et++)if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer[et]=[];for(let nt=0;nt<_.mipmaps.length;nt++)z.__webglFramebuffer[et][nt]=i.createFramebuffer()}else z.__webglFramebuffer[et]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer=[];for(let et=0;et<_.mipmaps.length;et++)z.__webglFramebuffer[et]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(ft)for(let et=0,nt=Q.length;et<nt;et++){let gt=n.get(Q[et]);gt.__webglTexture===void 0&&(gt.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&$(E)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let et=0;et<Q.length;et++){let nt=Q[et];z.__webglColorRenderbuffer[et]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[et]);let gt=r.convert(nt.format,nt.colorSpace),Ut=r.convert(nt.type),bt=v(nt.internalFormat,gt,Ut,nt.normalized,nt.colorSpace,E.isXRRenderTarget===!0),Mt=mt(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt,bt,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+et,i.RENDERBUFFER,z.__webglColorRenderbuffer[et])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Vt(z.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(lt){e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Kt(i.TEXTURE_CUBE_MAP,_);for(let et=0;et<6;et++)if(_.mipmaps&&_.mipmaps.length>0)for(let nt=0;nt<_.mipmaps.length;nt++)xt(z.__webglFramebuffer[et][nt],E,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+et,nt);else xt(z.__webglFramebuffer[et],E,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0);p(_)&&S(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ft){for(let et=0,nt=Q.length;et<nt;et++){let gt=Q[et],Ut=n.get(gt),bt=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(bt=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(bt,Ut.__webglTexture),Kt(bt,gt),xt(z.__webglFramebuffer,E,gt,i.COLOR_ATTACHMENT0+et,bt,0),p(gt)&&S(bt)}e.unbindTexture()}else{let et=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(et=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(et,q.__webglTexture),Kt(et,_),_.mipmaps&&_.mipmaps.length>0)for(let nt=0;nt<_.mipmaps.length;nt++)xt(z.__webglFramebuffer[nt],E,_,i.COLOR_ATTACHMENT0,et,nt);else xt(z.__webglFramebuffer,E,_,i.COLOR_ATTACHMENT0,et,0);p(_)&&S(et),e.unbindTexture()}E.depthBuffer&&j(E)}function ht(E){let _=E.textures;for(let z=0,q=_.length;z<q;z++){let Q=_[z];if(p(Q)){let lt=A(E),ft=n.get(Q).__webglTexture;e.bindTexture(lt,ft),S(lt),e.unbindTexture()}}}let _t=[],Xt=[];function Nt(E){if(E.samples>0){if($(E)===!1){let _=E.textures,z=E.width,q=E.height,Q=i.COLOR_BUFFER_BIT,lt=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ft=n.get(E),et=_.length>1;if(et)for(let gt=0;gt<_.length;gt++)e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ft.__webglMultisampledFramebuffer);let nt=E.texture.mipmaps;nt&&nt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ft.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ft.__webglFramebuffer);for(let gt=0;gt<_.length;gt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),et){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ft.__webglColorRenderbuffer[gt]);let Ut=n.get(_[gt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ut,0)}i.blitFramebuffer(0,0,z,q,0,0,z,q,Q,i.NEAREST),l===!0&&(_t.length=0,Xt.length=0,_t.push(i.COLOR_ATTACHMENT0+gt),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&(_t.push(lt),Xt.push(lt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Xt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,_t))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),et)for(let gt=0;gt<_.length;gt++){e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,ft.__webglColorRenderbuffer[gt]);let Ut=n.get(_[gt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,Ut,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ft.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&l){let _=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function mt(E){return Math.min(s.maxSamples,E.samples)}function $(E){let _=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function C(E){let _=a.render.frame;u.get(E)!==_&&(u.set(E,_),E.update())}function ce(E,_){let z=E.colorSpace,q=E.format,Q=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||z!==er&&z!==jn&&(ue.getTransfer(z)===ye?(q!==Sn||Q!==un)&&$t("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Jt("WebGLTextures: Unsupported texture color space:",z)),_}function ie(E){return typeof HTMLImageElement!="undefined"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame!="undefined"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=Z,this.resetTextureUnits=H,this.getTextureUnits=N,this.setTextureUnits=V,this.setTexture2D=X,this.setTexture2DArray=G,this.setTexture3D=k,this.setTextureCube=tt,this.rebindTextures=at,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=ht,this.updateMultisampleRenderTarget=Nt,this.setupDepthRenderbuffer=j,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=$,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function f_(i,t){function e(n,s=jn){let r,a=ue.getTransfer(s);if(n===un)return i.UNSIGNED_BYTE;if(n===no)return i.UNSIGNED_SHORT_4_4_4_4;if(n===io)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ql)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===tc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Kl)return i.BYTE;if(n===jl)return i.SHORT;if(n===Ns)return i.UNSIGNED_SHORT;if(n===eo)return i.INT;if(n===Ln)return i.UNSIGNED_INT;if(n===Dn)return i.FLOAT;if(n===Nn)return i.HALF_FLOAT;if(n===ec)return i.ALPHA;if(n===nc)return i.RGB;if(n===Sn)return i.RGBA;if(n===zn)return i.DEPTH_COMPONENT;if(n===wi)return i.DEPTH_STENCIL;if(n===ic)return i.RED;if(n===so)return i.RED_INTEGER;if(n===Ti)return i.RG;if(n===ro)return i.RG_INTEGER;if(n===ao)return i.RGBA_INTEGER;if(n===Lr||n===Dr||n===Nr||n===Ur)if(a===ye)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Lr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Lr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Nr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ur)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===oo||n===lo||n===co||n===ho)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===oo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===lo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===co)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ho)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===uo||n===fo||n===po||n===mo||n===go||n===Fr||n===_o)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===uo||n===fo)return a===ye?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===po)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===mo)return r.COMPRESSED_R11_EAC;if(n===go)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Fr)return r.COMPRESSED_RG11_EAC;if(n===_o)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===xo||n===yo||n===vo||n===Mo||n===So||n===bo||n===wo||n===To||n===Eo||n===Ao||n===Co||n===Ro||n===Po||n===Io)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===xo)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===yo)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===vo)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Mo)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===So)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===bo)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wo)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===To)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Eo)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ao)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Co)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ro)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Po)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Io)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Lo||n===Do||n===No)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Lo)return a===ye?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Do)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===No)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Uo||n===Fo||n===Or||n===Oo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Uo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Fo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Or)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Oo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Us?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var p_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,m_=`
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

}`,Pc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new hr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new _n({vertexShader:p_,fragmentShader:m_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ae(new Pn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ic=class extends Rn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,g=null,x=typeof XRWebGLBinding!="undefined",m=new Pc,p={},S=e.getContextAttributes(),A=null,v=null,b=[],w=[],R=new ut,y=null,T=null,L=new Ke;L.viewport=new Ce;let I=new Ke;I.viewport=new Ce;let B=[L,I],H=new Ja,N=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let it=b[K];return it===void 0&&(it=new bs,b[K]=it),it.getTargetRaySpace()},this.getControllerGrip=function(K){let it=b[K];return it===void 0&&(it=new bs,b[K]=it),it.getGripSpace()},this.getHand=function(K){let it=b[K];return it===void 0&&(it=new bs,b[K]=it),it.getHandSpace()};function Z(K){let it=w.indexOf(K.inputSource);if(it===-1)return;let pt=b[it];pt!==void 0&&(pt.update(K.inputSource,K.frame,c||a),pt.dispatchEvent({type:K.type,data:K.inputSource}))}function D(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",D),s.removeEventListener("inputsourceschange",X);for(let K=0;K<b.length;K++){let it=w[K];it!==null&&(w[K]=null,b[K].disconnect(it))}N=null,V=null,m.reset();for(let K in p)delete p[K];if(t.setRenderTarget(A),f=null,h=null,d=null,s=null,v=null,Yt.stop(),n.isPresenting=!1,t.setPixelRatio(y),t.setSize(R.width,R.height,!1),T!==null){let K=T.camera;K.fov=T.fov,K.zoom=T.zoom,K.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&$t("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&$t("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(A=t.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",D),s.addEventListener("inputsourceschange",X),S.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let pt=null,Dt=null,xt=null;S.depth&&(xt=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=S.stencil?wi:zn,Dt=S.stencil?Us:Ln);let Vt={colorFormat:e.RGBA8,depthFormat:xt,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Vt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),v=new cn(h.textureWidth,h.textureHeight,{format:Sn,type:un,depthTexture:new mi(h.textureWidth,h.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let pt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,pt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new cn(f.framebufferWidth,f.framebufferHeight,{format:Sn,type:un,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Yt.setContext(s),Yt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(K){for(let it=0;it<K.removed.length;it++){let pt=K.removed[it],Dt=w.indexOf(pt);Dt>=0&&(w[Dt]=null,b[Dt].disconnect(pt))}for(let it=0;it<K.added.length;it++){let pt=K.added[it],Dt=w.indexOf(pt);if(Dt===-1){for(let Vt=0;Vt<b.length;Vt++)if(Vt>=w.length){w.push(pt),Dt=Vt;break}else if(w[Vt]===null){w[Vt]=pt,Dt=Vt;break}if(Dt===-1)break}let xt=b[Dt];xt&&xt.connect(pt)}}let G=new U,k=new U;function tt(K,it,pt){G.setFromMatrixPosition(it.matrixWorld),k.setFromMatrixPosition(pt.matrixWorld);let Dt=G.distanceTo(k),xt=it.projectionMatrix.elements,Vt=pt.projectionMatrix.elements,Zt=xt[14]/(xt[10]-1),j=xt[14]/(xt[10]+1),at=(xt[9]+1)/xt[5],dt=(xt[9]-1)/xt[5],ht=(xt[8]-1)/xt[0],_t=(Vt[8]+1)/Vt[0],Xt=Zt*ht,Nt=Zt*_t,mt=Dt/(-ht+_t),$=mt*-ht;if(it.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX($),K.translateZ(mt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),xt[10]===-1)K.projectionMatrix.copy(it.projectionMatrix),K.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{let C=Zt+mt,ce=j+mt,ie=Xt-$,E=Nt+(Dt-$),_=at*j/ce*C,z=dt*j/ce*C;K.projectionMatrix.makePerspective(ie,E,_,z,C,ce),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Tt(K,it){it===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(it.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let it=K.near,pt=K.far;m.texture!==null&&(m.depthNear>0&&(it=m.depthNear),m.depthFar>0&&(pt=m.depthFar)),H.near=I.near=L.near=it,H.far=I.far=L.far=pt,(N!==H.near||V!==H.far)&&(s.updateRenderState({depthNear:H.near,depthFar:H.far}),N=H.near,V=H.far),H.layers.mask=K.layers.mask|6,L.layers.mask=H.layers.mask&-5,I.layers.mask=H.layers.mask&-3;let Dt=K.parent,xt=H.cameras;Tt(H,Dt);for(let Vt=0;Vt<xt.length;Vt++)Tt(xt[Vt],Dt);xt.length===2?tt(H,L,I):H.projectionMatrix.copy(L.projectionMatrix),T===null&&K.isPerspectiveCamera&&(T={camera:K,fov:K.fov,zoom:K.zoom}),yt(K,H,Dt)};function yt(K,it,pt){pt===null?K.matrix.copy(it.matrixWorld):(K.matrix.copy(pt.matrixWorld),K.matrix.invert(),K.matrix.multiply(it.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(it.projectionMatrix),K.projectionMatrixInverse.copy(it.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=vs*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(K){l=K,h!==null&&(h.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(H)},this.getCameraTexture=function(K){return p[K]};let ee=null;function Kt(K,it){if(u=it.getViewerPose(c||a),g=it,u!==null){let pt=u.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let Dt=!1;pt.length!==H.cameras.length&&(H.cameras.length=0,Dt=!0);for(let j=0;j<pt.length;j++){let at=pt[j],dt=null;if(f!==null)dt=f.getViewport(at);else{let _t=d.getViewSubImage(h,at);dt=_t.viewport,j===0&&(t.setRenderTargetTextures(v,_t.colorTexture,_t.depthStencilTexture),t.setRenderTarget(v))}let ht=B[j];ht===void 0&&(ht=new Ke,ht.layers.enable(j),ht.viewport=new Ce,B[j]=ht),ht.matrix.fromArray(at.transform.matrix),ht.matrix.decompose(ht.position,ht.quaternion,ht.scale),ht.projectionMatrix.fromArray(at.projectionMatrix),ht.projectionMatrixInverse.copy(ht.projectionMatrix).invert(),ht.viewport.set(dt.x,dt.y,dt.width,dt.height),j===0&&(H.matrix.copy(ht.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Dt===!0&&H.cameras.push(ht)}let xt=s.enabledFeatures;if(xt&&xt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();let j=d.getDepthInformation(pt[0]);j&&j.isValid&&j.texture&&m.init(j,s.renderState)}if(xt&&xt.includes("camera-access")&&x){t.state.unbindTexture(),d=n.getBinding();for(let j=0;j<pt.length;j++){let at=pt[j].camera;if(at){let dt=p[at];dt||(dt=new hr,p[at]=dt);let ht=d.getCameraImage(at);dt.sourceTexture=ht}}}}for(let pt=0;pt<b.length;pt++){let Dt=w[pt],xt=b[pt];Dt!==null&&xt!==void 0&&xt.update(Dt,it,c||a)}ee&&ee(K,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),g=null}let Yt=new Lu;Yt.setAnimationLoop(Kt),this.setAnimationLoop=function(K){ee=K},this.dispose=function(){}}},g_=new Ae,Bu=new Qt;Bu.set(-1,0,0,0,1,0,0,0,1);function __(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,lc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,A,v){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,S,A):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===an&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===an&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let S=t.get(p),A=S.envMap,v=S.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(g_.makeRotationFromEuler(v)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Bu),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,A){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=A*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===an&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function x_(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,b){let w=b.program;n.uniformBlockBinding(v,w)}function c(v,b){let w=s[v.id];w===void 0&&(m(v),w=u(v),s[v.id]=w,v.addEventListener("dispose",S));let R=b.program;n.updateUBOMapping(v,R);let y=t.render.frame;r[v.id]!==y&&(h(v),r[v.id]=y)}function u(v){let b=d();v.__bindingPointIndex=b;let w=i.createBuffer(),R=v.__size,y=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,R,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,w),w}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Jt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){let b=s[v.id],w=v.uniforms,R=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let y=0,T=w.length;y<T;y++){let L=w[y];if(Array.isArray(L))for(let I=0,B=L.length;I<B;I++)f(L[I],y,I,R);else f(L,y,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,b,w,R){if(x(v,b,w,R)===!0){let y=v.__offset,T=v.value;if(Array.isArray(T)){let L=0;for(let I=0;I<T.length;I++){let B=T[I],H=p(B);g(B,v.__data,L),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(L+=H.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,y,v.__data)}}function g(v,b,w){typeof v=="number"||typeof v=="boolean"?b[0]=v:v.isMatrix3?(b[0]=v.elements[0],b[1]=v.elements[1],b[2]=v.elements[2],b[3]=0,b[4]=v.elements[3],b[5]=v.elements[4],b[6]=v.elements[5],b[7]=0,b[8]=v.elements[6],b[9]=v.elements[7],b[10]=v.elements[8],b[11]=0):ArrayBuffer.isView(v)?b.set(new v.constructor(v.buffer,v.byteOffset,b.length)):v.toArray(b,w)}function x(v,b,w,R){let y=v.value,T=b+"_"+w;if(R[T]===void 0)return typeof y=="number"||typeof y=="boolean"?R[T]=y:ArrayBuffer.isView(y)?R[T]=y.slice():R[T]=y.clone(),!0;{let L=R[T];if(typeof y=="number"||typeof y=="boolean"){if(L!==y)return R[T]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(L.equals(y)===!1)return L.copy(y),!0}}return!1}function m(v){let b=v.uniforms,w=0,R=16;for(let T=0,L=b.length;T<L;T++){let I=Array.isArray(b[T])?b[T]:[b[T]];for(let B=0,H=I.length;B<H;B++){let N=I[B],V=Array.isArray(N.value)?N.value:[N.value];for(let Z=0,D=V.length;Z<D;Z++){let X=V[Z],G=p(X),k=w%R,tt=k%G.boundary,Tt=k+tt;w+=tt,Tt!==0&&R-Tt<G.storage&&(w+=R-Tt),N.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=w,w+=G.storage}}}let y=w%R;return y>0&&(w+=R-y),v.__size=w,v.__cache={},this}function p(v){let b={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(b.boundary=4,b.storage=4):v.isVector2?(b.boundary=8,b.storage=8):v.isVector3||v.isColor?(b.boundary=16,b.storage=12):v.isVector4?(b.boundary=16,b.storage=16):v.isMatrix3?(b.boundary=48,b.storage=48):v.isMatrix4?(b.boundary=64,b.storage=64):v.isTexture?$t("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(b.boundary=16,b.storage=v.byteLength):$t("WebGLRenderer: Unsupported uniform value type.",v),b}function S(v){let b=v.target;b.removeEventListener("dispose",S);let w=a.indexOf(b.__bindingPointIndex);a.splice(w,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function A(){for(let v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:A}}var y_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Hn=null;function v_(){return Hn===null&&(Hn=new Aa(y_,16,16,Ti,Nn),Hn.name="DFG_LUT",Hn.minFilter=Xe,Hn.magFilter=Xe,Hn.wrapS=Bn,Hn.wrapT=Bn,Hn.generateMipmaps=!1,Hn.needsUpdate=!0),Hn}var Xo=class{constructor(t={}){let{canvas:e=Qh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=un}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let x=f,m=new Set([ao,ro,so]),p=new Set([un,Ln,Ns,Us,no,io]),S=new Uint32Array(4),A=new Int32Array(4),v=new U,b=null,w=null,R=[],y=[],T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=In,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let L=this,I=!1,B=null,H=null,N=null,V=null;this._outputColorSpace=Ne;let Z=0,D=0,X=null,G=-1,k=null,tt=new Ce,Tt=new Ce,yt=null,ee=new te(0),Kt=0,Yt=e.width,K=e.height,it=1,pt=null,Dt=null,xt=new Ce(0,0,Yt,K),Vt=new Ce(0,0,Yt,K),Zt=!1,j=new Ts,at=!1,dt=!1,ht=new Ae,_t=new U,Xt=new Ce,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},mt=!1;function $(){return X===null?it:1}let C=n;function ce(M,F){return e.getContext(M,F)}let ie,E,_,z,q,Q,lt,ft,et,nt,gt,Ut,bt,Mt,Bt,Ht,jt,O,vt,rt,St,Ct,ot;try{let M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",ge,!1),e.addEventListener("webglcontextrestored",fe,!1),e.addEventListener("webglcontextcreationerror",Ye,!1),C===null){let F="webgl2";if(C=ce(F,M),C===null)throw ce(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Gt()}catch(M){throw e.removeEventListener("webglcontextlost",ge,!1),e.removeEventListener("webglcontextrestored",fe,!1),e.removeEventListener("webglcontextcreationerror",Ye,!1),Jt("WebGLRenderer: "+M.message),M}function Gt(){ie=new Ag(C),ie.init(),St=new f_(C,ie),E=new _g(C,ie,t,St),_=new u_(C,ie),E.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),H=C.createFramebuffer(),N=C.createFramebuffer(),V=C.createFramebuffer(),z=new Pg(C),q=new K0,Q=new d_(C,ie,_,q,E,St,z),lt=new Eg(L),ft=new Lf(C),Ct=new mg(C,ft),et=new Cg(C,ft,z,Ct),nt=new Lg(C,et,ft,Ct,z),O=new Ig(C,E,Q),Bt=new xg(q),gt=new J0(L,lt,ie,E,Ct,Bt),Ut=new __(L,q),bt=new Q0,Mt=new r_(ie),jt=new pg(L,lt,_,nt,g,l),Ht=new h_(L,nt,E),ot=new x_(C,z,E,_),vt=new gg(C,ie,z),rt=new Rg(C,ie,z),z.programs=gt.programs,L.capabilities=E,L.extensions=ie,L.properties=q,L.renderLists=bt,L.shadowMap=Ht,L.state=_,L.info=z}x!==un&&(T=new Ng(x,e.width,e.height,o,s,r));let It=new Ic(L,C);this.xr=It,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let M=ie.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=ie.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return it},this.setPixelRatio=function(M){M!==void 0&&(it=M,this.setSize(Yt,K,!1))},this.getSize=function(M){return M.set(Yt,K)},this.setSize=function(M,F,J=!0){if(It.isPresenting){$t("WebGLRenderer: Can't change size while VR device is presenting.");return}Yt=M,K=F,e.width=Math.floor(M*it),e.height=Math.floor(F*it),J===!0&&(e.style.width=M+"px",e.style.height=F+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,M,F)},this.getDrawingBufferSize=function(M){return M.set(Yt*it,K*it).floor()},this.setDrawingBufferSize=function(M,F,J){Yt=M,K=F,it=J,e.width=Math.floor(M*J),e.height=Math.floor(F*J),this.setViewport(0,0,M,F)},this.setEffects=function(M){if(x===un){Jt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let F=0;F<M.length;F++)if(M[F].isOutputPass===!0){$t("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(tt)},this.getViewport=function(M){return M.copy(xt)},this.setViewport=function(M,F,J,Y){M.isVector4?xt.set(M.x,M.y,M.z,M.w):xt.set(M,F,J,Y),_.viewport(tt.copy(xt).multiplyScalar(it).round())},this.getScissor=function(M){return M.copy(Vt)},this.setScissor=function(M,F,J,Y){M.isVector4?Vt.set(M.x,M.y,M.z,M.w):Vt.set(M,F,J,Y),_.scissor(Tt.copy(Vt).multiplyScalar(it).round())},this.getScissorTest=function(){return Zt},this.setScissorTest=function(M){_.setScissorTest(Zt=M)},this.setOpaqueSort=function(M){pt=M},this.setTransparentSort=function(M){Dt=M},this.getClearColor=function(M){return M.copy(jt.getClearColor())},this.setClearColor=function(){jt.setClearColor(...arguments)},this.getClearAlpha=function(){return jt.getClearAlpha()},this.setClearAlpha=function(){jt.setClearAlpha(...arguments)},this.clear=function(M=!0,F=!0,J=!0){let Y=0;if(M){let W=!1;if(X!==null){let wt=X.texture.format;W=m.has(wt)}if(W){let wt=X.texture.type,Rt=p.has(wt),Et=jt.getClearColor(),Ft=jt.getClearAlpha(),kt=Et.r,oe=Et.g,he=Et.b;Rt?(S[0]=kt,S[1]=oe,S[2]=he,S[3]=Ft,C.clearBufferuiv(C.COLOR,0,S)):(A[0]=kt,A[1]=oe,A[2]=he,A[3]=Ft,C.clearBufferiv(C.COLOR,0,A))}else Y|=C.COLOR_BUFFER_BIT}F&&(Y|=C.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(Y|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y!==0&&C.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),B=M},this.dispose=function(){e.removeEventListener("webglcontextlost",ge,!1),e.removeEventListener("webglcontextrestored",fe,!1),e.removeEventListener("webglcontextcreationerror",Ye,!1),jt.dispose(),bt.dispose(),Mt.dispose(),q.dispose(),lt.dispose(),nt.dispose(),Ct.dispose(),ot.dispose(),gt.dispose(),It.dispose(),It.removeEventListener("sessionstart",Hs),It.removeEventListener("sessionend",Ws),wn.stop()};function ge(M){M.preventDefault(),rc("WebGLRenderer: Context Lost."),I=!0}function fe(){rc("WebGLRenderer: Context Restored."),I=!1;let M=z.autoReset,F=Ht.enabled,J=Ht.autoUpdate,Y=Ht.needsUpdate,W=Ht.type;Gt(),z.autoReset=M,Ht.enabled=F,Ht.autoUpdate=J,Ht.needsUpdate=Y,Ht.type=W}function Ye(M){Jt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Fe(M){let F=M.target;F.removeEventListener("dispose",Fe),We(F)}function We(M){Hr(M),q.remove(M)}function Hr(M){let F=q.get(M).programs;F!==void 0&&(F.forEach(function(J){gt.releaseProgram(J)}),M.isShaderMaterial&&gt.releaseShaderCache(M))}this.renderBufferDirect=function(M,F,J,Y,W,wt){F===null&&(F=Nt);let Rt=W.isMesh&&W.matrixWorld.determinantAffine()<0,Et=se(M,F,J,Y,W);_.setMaterial(Y,Rt);let Ft=J.index,kt=1;if(Y.wireframe===!0){if(Ft=et.getWireframeAttribute(J),Ft===void 0)return;kt=2}let oe=J.drawRange,he=J.attributes.position,Ot=oe.start*kt,xe=(oe.start+oe.count)*kt;wt!==null&&(Ot=Math.max(Ot,wt.start*kt),xe=Math.min(xe,(wt.start+wt.count)*kt)),Ft!==null?(Ot=Math.max(Ot,0),xe=Math.min(xe,Ft.count)):he!=null&&(Ot=Math.max(Ot,0),xe=Math.min(xe,he.count));let Le=xe-Ot;if(Le<0||Le===1/0)return;Ct.setup(W,Y,Et,J,Ft);let Te,be=vt;if(Ft!==null&&(Te=ft.get(Ft),be=rt,be.setIndex(Te)),W.isMesh)Y.wireframe===!0?(_.setLineWidth(Y.wireframeLinewidth*$()),be.setMode(C.LINES)):be.setMode(C.TRIANGLES);else if(W.isLine){let Ze=Y.linewidth;Ze===void 0&&(Ze=1),_.setLineWidth(Ze*$()),W.isLineSegments?be.setMode(C.LINES):W.isLineLoop?be.setMode(C.LINE_LOOP):be.setMode(C.LINE_STRIP)}else W.isPoints?be.setMode(C.POINTS):W.isSprite&&be.setMode(C.TRIANGLES);if(W.isBatchedMesh)if(ie.get("WEBGL_multi_draw"))be.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let Ze=W._multiDrawStarts,Pt=W._multiDrawCounts,tn=W._multiDrawCount,pe=Ft?ft.get(Ft).bytesPerElement:1,vn=q.get(Y).currentProgram.getUniforms();for(let Fn=0;Fn<tn;Fn++)vn.setValue(C,"_gl_DrawID",Fn),be.render(Ze[Fn]/pe,Pt[Fn])}else if(W.isInstancedMesh)be.renderInstances(Ot,Le,W.count);else if(J.isInstancedBufferGeometry){let Ze=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Pt=Math.min(J.instanceCount,Ze);be.renderInstances(Ot,Le,Pt)}else be.render(Ot,Le)};function Gs(M,F,J,Y){B!==null&&M.isNodeMaterial&&B.setObject(Y,M),at===!0&&Bt.setState(M,J,!1),M.transparent===!0&&M.side===hn&&M.forceSinglePass===!1?(M.side=an,M.needsUpdate=!0,ct(M,F,Y),M.side=Mi,M.needsUpdate=!0,ct(M,F,Y),M.side=hn):ct(M,F,Y)}this.compile=function(M,F,J=null){J===null&&(J=M),B!==null&&B.renderStart(M,F,J),w=Mt.get(J),w.init(F),y.push(w),J.traverseVisible(function(W){W.isLight&&W.layers.test(F.layers)&&(w.pushLight(W),W.castShadow&&w.pushShadow(W))}),M!==J&&M.traverseVisible(function(W){W.isLight&&W.layers.test(F.layers)&&(w.pushLight(W),W.castShadow&&w.pushShadow(W))}),w.setupLights(),B!==null&&B.updateLights(w.state.lightsArray),dt=this.localClippingEnabled,at=Bt.init(this.clippingPlanes,dt),at===!0&&Bt.setGlobalState(this.clippingPlanes,F),B!==null&&Ht.render(w.state.shadowsArray,J,F);let Y=new Set;return M.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let wt=W.material;if(wt)if(Array.isArray(wt))for(let Rt=0;Rt<wt.length;Rt++){let Et=wt[Rt];Gs(Et,J,F,W),Y.add(Et)}else Gs(wt,J,F,W),Y.add(wt)}),w=y.pop(),B!==null&&B.renderEnd(),Y},this.compileAsync=function(M,F,J=null){let Y=this.compile(M,F,J);return new Promise(W=>{function wt(){if(Y.forEach(function(Rt){let Ft=q.get(Rt).currentProgram;(Ft===void 0||Ft.isReady())&&Y.delete(Rt)}),Y.size===0){W(M);return}setTimeout(wt,10)}ie.get("KHR_parallel_shader_compile")!==null?wt():setTimeout(wt,10)})};let Ii=null;function Wr(M){Ii&&Ii(M)}function Hs(){wn.stop()}function Ws(){wn.start()}let wn=new Lu;wn.setAnimationLoop(Wr),typeof self!="undefined"&&wn.setContext(self),this.setAnimationLoop=function(M){Ii=M,It.setAnimationLoop(M),M===null?wn.stop():wn.start()},It.addEventListener("sessionstart",Hs),It.addEventListener("sessionend",Ws),this.render=function(M,F){if(F!==void 0&&F.isCamera!==!0){Jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;B!==null&&B.renderStart(M,F);let J=It.enabled===!0&&It.isPresenting===!0,Y=T!==null&&(X===null||J)&&T.begin(L,X);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),It.enabled===!0&&It.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(It.cameraAutoUpdate===!0&&It.updateCamera(F),F=It.getCamera()),M.isScene===!0&&M.onBeforeRender(L,M,F,X),w=Mt.get(M,y.length),w.init(F),w.state.textureUnits=Q.getTextureUnits(),y.push(w),ht.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),j.setFromProjectionMatrix(ht,Cn,F.reversedDepth),dt=this.localClippingEnabled,at=Bt.init(this.clippingPlanes,dt),b=bt.get(M,R.length),b.init(),R.push(b),It.enabled===!0&&It.isPresenting===!0){let Rt=L.xr.getDepthSensingMesh();Rt!==null&&ii(Rt,F,-1/0,L.sortObjects)}ii(M,F,0,L.sortObjects),b.finish(),B!==null&&B.updateLights(w.state.lightsArray),L.sortObjects===!0&&b.sort(pt,Dt),mt=It.enabled===!1||It.isPresenting===!1||It.hasDepthSensing()===!1,mt&&jt.addToRenderList(b,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),at===!0&&Bt.beginShadows();let W=w.state.shadowsArray;if(Ht.render(W,M,F),at===!0&&Bt.endShadows(),(Y&&T.hasRenderPass())===!1){let Rt=b.opaque,Et=b.transmissive;if(w.setupLights(),F.isArrayCamera){let Ft=F.cameras;if(Et.length>0)for(let kt=0,oe=Ft.length;kt<oe;kt++){let he=Ft[kt];Li(Rt,Et,M,he)}mt&&jt.render(M);for(let kt=0,oe=Ft.length;kt<oe;kt++){let he=Ft[kt];Qi(b,M,he,he.viewport)}}else Et.length>0&&Li(Rt,Et,M,F),mt&&jt.render(M),Qi(b,M,F)}X!==null&&D===0&&(Q.updateMultisampleRenderTarget(X),Q.updateRenderTargetMipmap(X)),Y&&T.end(L),M.isScene===!0&&M.onAfterRender(L,M,F),Ct.resetDefaultState(),G=-1,k=null,y.pop(),y.length>0?(w=y[y.length-1],Q.setTextureUnits(w.state.textureUnits),at===!0&&Bt.setGlobalState(L.clippingPlanes,w.state.camera)):w=null,R.pop(),R.length>0?b=R[R.length-1]:b=null,B!==null&&B.renderEnd()};function ii(M,F,J,Y){if(M.visible===!1)return;if(M.layers.test(F.layers)){if(M.isGroup)J=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(F);else if(M.isLightProbeGrid)w.pushLightProbeGrid(M);else if(M.isLight)w.pushLight(M),M.castShadow&&w.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(j)){Y&&Xt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ht);let Rt=nt.update(M),Et=M.material;Et.visible&&b.push(M,Rt,Et,J,Xt.z,null,F)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(j))){let Rt=nt.update(M),Et=M.material;if(Y&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Xt.copy(M.boundingSphere.center)):(Rt.boundingSphere===null&&Rt.computeBoundingSphere(),Xt.copy(Rt.boundingSphere.center)),Xt.applyMatrix4(M.matrixWorld).applyMatrix4(ht)),Array.isArray(Et)){let Ft=Rt.groups;for(let kt=0,oe=Ft.length;kt<oe;kt++){let he=Ft[kt],Ot=Et[he.materialIndex];Ot&&Ot.visible&&b.push(M,Rt,Ot,J,Xt.z,he,F)}}else Et.visible&&b.push(M,Rt,Et,J,Xt.z,null,F)}}let wt=M.children;for(let Rt=0,Et=wt.length;Rt<Et;Rt++)ii(wt[Rt],F,J,Y)}function Qi(M,F,J,Y){let{opaque:W,transmissive:wt,transparent:Rt}=M;w.setupLightsView(J),at===!0&&Bt.setGlobalState(L.clippingPlanes,J),Y&&_.viewport(tt.copy(Y)),W.length>0&&P(W,F,J),wt.length>0&&P(wt,F,J),Rt.length>0&&P(Rt,F,J),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Li(M,F,J,Y){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[Y.id]===void 0){let Ot=ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[Y.id]=new cn(1,1,{generateMipmaps:!0,type:Ot?Nn:un,minFilter:bi,samples:Math.max(4,E.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ue.workingColorSpace})}let wt=w.state.transmissionRenderTarget[Y.id],Rt=Y.viewport||tt;wt.setSize(Rt.z*L.transmissionResolutionScale,Rt.w*L.transmissionResolutionScale);let Et=L.getRenderTarget(),Ft=L.getActiveCubeFace(),kt=L.getActiveMipmapLevel();L.setRenderTarget(wt),L.getClearColor(ee),Kt=L.getClearAlpha(),Kt<1&&L.setClearColor(16777215,.5),L.clear(),mt&&jt.render(J);let oe=L.toneMapping;L.toneMapping=In;let he=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),w.setupLightsView(Y),at===!0&&Bt.setGlobalState(L.clippingPlanes,Y),P(M,J,Y),Q.updateMultisampleRenderTarget(wt),Q.updateRenderTargetMipmap(wt),ie.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let xe=0,Le=F.length;xe<Le;xe++){let Te=F[xe],{object:be,geometry:Ze,material:Pt,group:tn}=Te;if(Pt.side===hn&&be.layers.test(Y.layers)){let pe=Pt.side;Pt.side=an,Pt.needsUpdate=!0,st(be,J,Y,Ze,Pt,tn),Pt.side=pe,Pt.needsUpdate=!0,Ot=!0}}Ot===!0&&(Q.updateMultisampleRenderTarget(wt),Q.updateRenderTargetMipmap(wt))}L.setRenderTarget(Et,Ft,kt),L.setClearColor(ee,Kt),he!==void 0&&(Y.viewport=he),L.toneMapping=oe}function P(M,F,J){let Y=F.isScene===!0?F.overrideMaterial:null;for(let W=0,wt=M.length;W<wt;W++){let Rt=M[W],{object:Et,geometry:Ft,group:kt}=Rt,oe=Rt.material;oe.allowOverride===!0&&Y!==null&&(oe=Y),Et.layers.test(J.layers)&&st(Et,F,J,Ft,oe,kt)}}function st(M,F,J,Y,W,wt){B!==null&&W.isNodeMaterial&&B.setObject(M,W),M.onBeforeRender(L,F,J,Y,W,wt),M.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),W.onBeforeRender(L,F,J,Y,M,wt),W.transparent===!0&&W.side===hn&&W.forceSinglePass===!1?(W.side=an,W.needsUpdate=!0,L.renderBufferDirect(J,F,Y,W,M,wt),W.side=Mi,W.needsUpdate=!0,L.renderBufferDirect(J,F,Y,W,M,wt),W.side=hn):L.renderBufferDirect(J,F,Y,W,M,wt),M.onAfterRender(L,F,J,Y,W,wt)}function ct(M,F,J){F.isScene!==!0&&(F=Nt);let Y=q.get(M),W=w.state.lights,wt=w.state.shadowsArray,Rt=W.state.version,Et=gt.getParameters(M,W.state,wt,F,J,w.state.lightProbeGridArray),Ft=gt.getProgramCacheKey(Et),kt=Y.programs;Y.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?F.environment:null,Y.fog=F.fog;let oe=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;Y.envMap=lt.get(M.envMap||Y.environment,oe),Y.envMapRotation=Y.environment!==null&&M.envMap===null?F.environmentRotation:M.envMapRotation,kt===void 0&&(M.addEventListener("dispose",Fe),kt=new Map,Y.programs=kt);let he=kt.get(Ft);if(he!==void 0){if(Y.currentProgram===he&&Y.lightsStateVersion===Rt)return qt(M,Et),he}else Et.uniforms=gt.getUniforms(M),B!==null&&M.isNodeMaterial&&B.build(M,J,Et),M.onBeforeCompile(Et,L),he=gt.acquireProgram(Et,Ft),kt.set(Ft,he),Y.uniforms=Et.uniforms;let Ot=Y.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ot.clippingPlanes=Bt.uniform),qt(M,Et),Y.needsLights=ne(M),Y.lightsStateVersion=Rt,Y.needsLights&&(Ot.ambientLightColor.value=W.state.ambient,Ot.lightProbe.value=W.state.probe,Ot.sunLights.value=W.state.sun,Ot.sunLightShadows.value=W.state.sunShadow,Ot.directionalLights.value=W.state.directional,Ot.directionalLightShadows.value=W.state.directionalShadow,Ot.spotLights.value=W.state.spot,Ot.spotLightShadows.value=W.state.spotShadow,Ot.rectAreaLights.value=W.state.rectArea,Ot.ltc_1.value=W.state.rectAreaLTC1,Ot.ltc_2.value=W.state.rectAreaLTC2,Ot.pointLights.value=W.state.point,Ot.pointLightShadows.value=W.state.pointShadow,Ot.hemisphereLights.value=W.state.hemi,Ot.sunShadowMatrix.value=W.state.sunShadowMatrix,Ot.sunShadowCascade.value=W.state.sunShadowCascade,Ot.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ot.spotLightMatrix.value=W.state.spotLightMatrix,Ot.spotLightMap.value=W.state.spotLightMap,Ot.pointShadowMatrix.value=W.state.pointShadowMatrix),Y.lightProbeGrid=w.state.lightProbeGridArray.length>0,Y.currentProgram=he,Y.uniformsList=null,he}function zt(M){if(M.uniformsList===null){let F=M.currentProgram.getUniforms();M.uniformsList=zs.seqWithValue(F.seq,M.uniforms)}return M.uniformsList}function qt(M,F){let J=q.get(M);J.outputColorSpace=F.outputColorSpace,J.batching=F.batching,J.batchingColor=F.batchingColor,J.instancing=F.instancing,J.instancingColor=F.instancingColor,J.instancingMorph=F.instancingMorph,J.skinning=F.skinning,J.morphTargets=F.morphTargets,J.morphNormals=F.morphNormals,J.morphColors=F.morphColors,J.morphTargetsCount=F.morphTargetsCount,J.numClippingPlanes=F.numClippingPlanes,J.numIntersection=F.numClipIntersection,J.vertexAlphas=F.vertexAlphas,J.vertexTangents=F.vertexTangents,J.toneMapping=F.toneMapping}function Se(M,F){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;v.setFromMatrixPosition(F.matrixWorld);for(let J=0,Y=M.length;J<Y;J++){let W=M[J];if(W.texture!==null&&W.boundingBox.containsPoint(v))return W}return null}function se(M,F,J,Y,W){F.isScene!==!0&&(F=Nt),Q.resetTextureUnits();let wt=F.fog,Rt=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial?F.environment:null,Et=X===null?L.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:ue.workingColorSpace,Ft=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial&&!Y.envMap||Y.isMeshPhongMaterial&&!Y.envMap,kt=lt.get(Y.envMap||Rt,Ft),oe=Y.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,he=!!J.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Ot=!!J.morphAttributes.position,xe=!!J.morphAttributes.normal,Le=!!J.morphAttributes.color,Te=In;Y.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(Te=L.toneMapping);let be=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Ze=be!==void 0?be.length:0,Pt=q.get(Y),tn=w.state.lights;if(at===!0&&(dt===!0||M!==k)){let we=M===k&&Y.id===G;Bt.setState(Y,M,we)}let pe=!1;Y.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==tn.state.version||Pt.outputColorSpace!==Et||W.isBatchedMesh&&Pt.batching===!1||!W.isBatchedMesh&&Pt.batching===!0||W.isBatchedMesh&&Pt.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&Pt.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&Pt.instancing===!1||!W.isInstancedMesh&&Pt.instancing===!0||W.isSkinnedMesh&&Pt.skinning===!1||!W.isSkinnedMesh&&Pt.skinning===!0||W.isInstancedMesh&&Pt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Pt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Pt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Pt.instancingMorph===!1&&W.morphTexture!==null||Pt.envMap!==kt||Y.fog===!0&&Pt.fog!==wt||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==Bt.numPlanes||Pt.numIntersection!==Bt.numIntersection)||Pt.vertexAlphas!==oe||Pt.vertexTangents!==he||Pt.morphTargets!==Ot||Pt.morphNormals!==xe||Pt.morphColors!==Le||Pt.toneMapping!==Te||Pt.morphTargetsCount!==Ze||!!Pt.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(pe=!0):(pe=!0,Pt.__version=Y.version);let vn=Pt.currentProgram;pe===!0&&(vn=ct(Y,F,W),B&&Y.isNodeMaterial&&B.onUpdateProgram(Y,vn,Pt));let Fn=!1,si=!1,ts=!1,Me=vn.getUniforms(),Pe=Pt.uniforms;if(_.useProgram(vn.program)&&(Fn=!0,si=!0,ts=!0),Y.id!==G&&(G=Y.id,si=!0),Pt.needsLights){let we=Se(w.state.lightProbeGridArray,W);Pt.lightProbeGrid!==we&&(Pt.lightProbeGrid=we,si=!0)}if(Fn||k!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),Me.setValue(C,"projectionMatrix",M.projectionMatrix),Me.setValue(C,"viewMatrix",M.matrixWorldInverse);let ai=Me.map.cameraPosition;ai!==void 0&&ai.setValue(C,_t.setFromMatrixPosition(M.matrixWorld)),E.logarithmicDepthBuffer&&Me.setValue(C,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Me.setValue(C,"isOrthographic",M.isOrthographicCamera===!0),k!==M&&(k=M,si=!0,ts=!0)}if(Pt.needsLights&&(tn.state.sunShadowMap.length>0&&Me.setValue(C,"sunShadowMap",tn.state.sunShadowMap,Q),tn.state.directionalShadowMap.length>0&&Me.setValue(C,"directionalShadowMap",tn.state.directionalShadowMap,Q),tn.state.spotShadowMap.length>0&&Me.setValue(C,"spotShadowMap",tn.state.spotShadowMap,Q),tn.state.pointShadowMap.length>0&&Me.setValue(C,"pointShadowMap",tn.state.pointShadowMap,Q)),W.isSkinnedMesh){Me.setOptional(C,W,"bindMatrix"),Me.setOptional(C,W,"bindMatrixInverse");let we=W.skeleton;we&&(we.boneTexture===null&&we.computeBoneTexture(),Me.setValue(C,"boneTexture",we.boneTexture,Q))}W.isBatchedMesh&&(Me.setOptional(C,W,"batchingTexture"),Me.setValue(C,"batchingTexture",W._matricesTexture,Q),Me.setOptional(C,W,"batchingIdTexture"),Me.setValue(C,"batchingIdTexture",W._indirectTexture,Q),Me.setOptional(C,W,"batchingColorTexture"),W._colorsTexture!==null&&Me.setValue(C,"batchingColorTexture",W._colorsTexture,Q));let ri=J.morphAttributes;if((ri.position!==void 0||ri.normal!==void 0||ri.color!==void 0)&&O.update(W,J,vn),(si||Pt.receiveShadow!==W.receiveShadow)&&(Pt.receiveShadow=W.receiveShadow,Me.setValue(C,"receiveShadow",W.receiveShadow)),(Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial)&&Y.envMap===null&&F.environment!==null&&(Pe.envMapIntensity.value=F.environmentIntensity),Pe.dfgLUT!==void 0&&(Pe.dfgLUT.value=v_()),si){if(Me.setValue(C,"toneMappingExposure",L.toneMappingExposure),Pt.needsLights&&Wt(Pe,ts),wt&&Y.fog===!0&&Ut.refreshFogUniforms(Pe,wt),Ut.refreshMaterialUniforms(Pe,Y,it,K,w.state.transmissionRenderTarget[M.id]),Pt.needsLights&&Pt.lightProbeGrid){let we=Pt.lightProbeGrid;Pe.probesSH.value=we.texture,Pe.probesMin.value.copy(we.boundingBox.min),Pe.probesMax.value.copy(we.boundingBox.max),Pe.probesResolution.value.copy(we.resolution)}zs.upload(C,zt(Pt),Pe,Q)}if(Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(zs.upload(C,zt(Pt),Pe,Q),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Me.setValue(C,"center",W.center),Me.setValue(C,"modelViewMatrix",W.modelViewMatrix),Me.setValue(C,"normalMatrix",W.normalMatrix),Me.setValue(C,"modelMatrix",W.matrixWorld),Y.uniformsGroups!==void 0){let we=Y.uniformsGroups;for(let ai=0,es=we.length;ai<es;ai++){let Gc=we[ai];ot.update(Gc,vn),ot.bind(Gc,vn)}}return vn}function Wt(M,F){M.ambientLightColor.needsUpdate=F,M.lightProbe.needsUpdate=F,M.sunLights.needsUpdate=F,M.sunLightShadows.needsUpdate=F,M.directionalLights.needsUpdate=F,M.directionalLightShadows.needsUpdate=F,M.pointLights.needsUpdate=F,M.pointLightShadows.needsUpdate=F,M.spotLights.needsUpdate=F,M.spotLightShadows.needsUpdate=F,M.rectAreaLights.needsUpdate=F,M.hemisphereLights.needsUpdate=F}function ne(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return X},this.setRenderTargetTextures=function(M,F,J){let Y=q.get(M);Y.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),q.get(M.texture).__webglTexture=F,q.get(M.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:J,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,F){let J=q.get(M);J.__webglFramebuffer=F,J.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(M,F=0,J=0){X=M,Z=F,D=J;let Y=null,W=!1,wt=!1;if(M){let Et=q.get(M);if(Et.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(C.FRAMEBUFFER,Et.__webglFramebuffer),tt.copy(M.viewport),Tt.copy(M.scissor),yt=M.scissorTest,_.viewport(tt),_.scissor(Tt),_.setScissorTest(yt),G=-1;return}else if(Et.__webglFramebuffer===void 0)Q.setupRenderTarget(M);else if(Et.__hasExternalTextures)Q.rebindTextures(M,q.get(M.texture).__webglTexture,q.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let oe=M.depthTexture;if(Et.__boundDepthTexture!==oe){if(oe!==null&&q.has(oe)&&(M.width!==oe.image.width||M.height!==oe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(M)}}let Ft=M.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(wt=!0);let kt=q.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(kt[F])?Y=kt[F][J]:Y=kt[F],W=!0):M.samples>0&&Q.useMultisampledRTT(M)===!1?Y=q.get(M).__webglMultisampledFramebuffer:Array.isArray(kt)?Y=kt[J]:Y=kt,tt.copy(M.viewport),Tt.copy(M.scissor),yt=M.scissorTest}else tt.copy(xt).multiplyScalar(it).floor(),Tt.copy(Vt).multiplyScalar(it).floor(),yt=Zt;if(J!==0&&(Y=H),_.bindFramebuffer(C.FRAMEBUFFER,Y)&&_.drawBuffers(M,Y),_.viewport(tt),_.scissor(Tt),_.setScissorTest(yt),W){let Et=q.get(M.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+F,Et.__webglTexture,J)}else if(wt){let Et=F;for(let Ft=0;Ft<M.textures.length;Ft++){let kt=q.get(M.textures[Ft]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Ft,kt.__webglTexture,J,Et)}}else if(M!==null&&J!==0){let Et=q.get(M.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Et.__webglTexture,J)}G=-1};function _e(M){let F=q.get(M);return(F.__readFormat!==M.format||F.__readType!==M.type)&&(F.__readFormat=M.format,F.__readType=M.type,F.__formatReadable=E.textureFormatReadable(M.format),F.__typeReadable=E.textureTypeReadable(M.type)),F}this.readRenderTargetPixels=function(M,F,J,Y,W,wt,Rt,Et=0){if(!(M&&M.isWebGLRenderTarget)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ft=q.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Rt!==void 0&&(Ft=Ft[Rt]),Ft){_.bindFramebuffer(C.FRAMEBUFFER,Ft);try{let kt=M.textures[Et],oe=kt.format,he=kt.type;M.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Et);let Ot=_e(kt);if(Ot.__formatReadable===!1){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ot.__typeReadable===!1){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=M.width-Y&&J>=0&&J<=M.height-W&&C.readPixels(F,J,Y,W,St.convert(oe),St.convert(he),wt)}finally{let kt=X!==null?q.get(X).__webglFramebuffer:null;_.bindFramebuffer(C.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(M,F,J,Y,W,wt,Rt,Et=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ft=q.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Rt!==void 0&&(Ft=Ft[Rt]),Ft)if(F>=0&&F<=M.width-Y&&J>=0&&J<=M.height-W){_.bindFramebuffer(C.FRAMEBUFFER,Ft);let kt=M.textures[Et],oe=kt.format,he=kt.type;M.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Et);let Ot=_e(kt);if(Ot.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ot.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let xe=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,xe),C.bufferData(C.PIXEL_PACK_BUFFER,wt.byteLength,C.STREAM_READ),C.readPixels(F,J,Y,W,St.convert(oe),St.convert(he),0),C.bindBuffer(C.PIXEL_PACK_BUFFER,null);let Le=X!==null?q.get(X).__webglFramebuffer:null;_.bindFramebuffer(C.FRAMEBUFFER,Le);let Te=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await eu(C,Te,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,xe),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,wt),C.bindBuffer(C.PIXEL_PACK_BUFFER,null),C.deleteBuffer(xe),C.deleteSync(Te),wt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,F=null,J=0){let Y=Math.pow(2,-J),W=Math.floor(M.image.width*Y),wt=Math.floor(M.image.height*Y),Rt=F!==null?F.x:0,Et=F!==null?F.y:0;Q.setTexture2D(M,0),C.copyTexSubImage2D(C.TEXTURE_2D,J,0,0,Rt,Et,W,wt),_.unbindTexture()},this.copyTextureToTexture=function(M,F,J=null,Y=null,W=0,wt=0){let Rt,Et,Ft,kt,oe,he,Ot,xe,Le,Te=M.isCompressedTexture?M.mipmaps[wt]:M.image;if(J!==null)Rt=J.max.x-J.min.x,Et=J.max.y-J.min.y,Ft=J.isBox3?J.max.z-J.min.z:1,kt=J.min.x,oe=J.min.y,he=J.isBox3?J.min.z:0;else{let Pe=Math.pow(2,-W);Rt=Math.floor(Te.width*Pe),Et=Math.floor(Te.height*Pe),M.isDataArrayTexture?Ft=Te.depth:M.isData3DTexture?Ft=Math.floor(Te.depth*Pe):Ft=1,kt=0,oe=0,he=0}Y!==null?(Ot=Y.x,xe=Y.y,Le=Y.z):(Ot=0,xe=0,Le=0);let be=St.convert(F.format),Ze=St.convert(F.type),Pt;F.isData3DTexture?(Q.setTexture3D(F,0),Pt=C.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Q.setTexture2DArray(F,0),Pt=C.TEXTURE_2D_ARRAY):(Q.setTexture2D(F,0),Pt=C.TEXTURE_2D),_.activeTexture(C.TEXTURE0),_.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,F.flipY),_.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),_.pixelStorei(C.UNPACK_ALIGNMENT,F.unpackAlignment);let tn=_.getParameter(C.UNPACK_ROW_LENGTH),pe=_.getParameter(C.UNPACK_IMAGE_HEIGHT),vn=_.getParameter(C.UNPACK_SKIP_PIXELS),Fn=_.getParameter(C.UNPACK_SKIP_ROWS),si=_.getParameter(C.UNPACK_SKIP_IMAGES);_.pixelStorei(C.UNPACK_ROW_LENGTH,Te.width),_.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Te.height),_.pixelStorei(C.UNPACK_SKIP_PIXELS,kt),_.pixelStorei(C.UNPACK_SKIP_ROWS,oe),_.pixelStorei(C.UNPACK_SKIP_IMAGES,he);let ts=M.isDataArrayTexture||M.isData3DTexture,Me=F.isDataArrayTexture||F.isData3DTexture;if(M.isDepthTexture){let Pe=q.get(M),ri=q.get(F),we=q.get(Pe.__renderTarget),ai=q.get(ri.__renderTarget);_.bindFramebuffer(C.READ_FRAMEBUFFER,we.__webglFramebuffer),_.bindFramebuffer(C.DRAW_FRAMEBUFFER,ai.__webglFramebuffer);for(let es=0;es<Ft;es++)ts&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,q.get(M).__webglTexture,W,he+es),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,q.get(F).__webglTexture,wt,Le+es)),C.blitFramebuffer(kt,oe,Rt,Et,Ot,xe,Rt,Et,C.DEPTH_BUFFER_BIT,C.NEAREST);_.bindFramebuffer(C.READ_FRAMEBUFFER,null),_.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(W!==0||M.isRenderTargetTexture||q.has(M)){let Pe=q.get(M),ri=q.get(F);_.bindFramebuffer(C.READ_FRAMEBUFFER,N),_.bindFramebuffer(C.DRAW_FRAMEBUFFER,V);for(let we=0;we<Ft;we++)ts?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Pe.__webglTexture,W,he+we):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Pe.__webglTexture,W),Me?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ri.__webglTexture,wt,Le+we):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,ri.__webglTexture,wt),W!==0?C.blitFramebuffer(kt,oe,Rt,Et,Ot,xe,Rt,Et,C.COLOR_BUFFER_BIT,C.NEAREST):Me?C.copyTexSubImage3D(Pt,wt,Ot,xe,Le+we,kt,oe,Rt,Et):C.copyTexSubImage2D(Pt,wt,Ot,xe,kt,oe,Rt,Et);_.bindFramebuffer(C.READ_FRAMEBUFFER,null),_.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else Me?M.isDataTexture||M.isData3DTexture?C.texSubImage3D(Pt,wt,Ot,xe,Le,Rt,Et,Ft,be,Ze,Te.data):F.isCompressedArrayTexture?C.compressedTexSubImage3D(Pt,wt,Ot,xe,Le,Rt,Et,Ft,be,Te.data):C.texSubImage3D(Pt,wt,Ot,xe,Le,Rt,Et,Ft,be,Ze,Te):M.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,wt,Ot,xe,Rt,Et,be,Ze,Te.data):M.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,wt,Ot,xe,Te.width,Te.height,be,Te.data):C.texSubImage2D(C.TEXTURE_2D,wt,Ot,xe,Rt,Et,be,Ze,Te);_.pixelStorei(C.UNPACK_ROW_LENGTH,tn),_.pixelStorei(C.UNPACK_IMAGE_HEIGHT,pe),_.pixelStorei(C.UNPACK_SKIP_PIXELS,vn),_.pixelStorei(C.UNPACK_SKIP_ROWS,Fn),_.pixelStorei(C.UNPACK_SKIP_IMAGES,si),wt===0&&F.generateMipmaps&&C.generateMipmap(Pt),_.unbindTexture()},this.initRenderTarget=function(M){q.get(M).__webglFramebuffer===void 0&&Q.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Q.setTextureCube(M,0):M.isData3DTexture?Q.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Q.setTexture2DArray(M,0):Q.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){Z=0,D=0,X=null,_.reset(),Ct.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ue._getDrawingBufferColorSpace(t),e.unpackColorSpace=ue._getUnpackColorSpace()}};var zu={type:"change"},Dc={type:"start"},Vu={type:"end"},Zo=new zi,ku=new mn,M_=Math.cos(70*Fs.DEG2RAD),ke=new U,dn=2*Math.PI,ve={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Lc=1e-6,$o=class extends Rr{constructor(t,e=null){super(t,e),this.state=ve.NONE,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:yi.ROTATE,MIDDLE:yi.DOLLY,RIGHT:yi.PAN},this.touches={ONE:vi.ROTATE,TWO:vi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new Ie,this._lastTargetPosition=new U,this._quat=new Ie().setFromUnitVectors(t.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Is,this._sphericalDelta=new Is,this._scale=1,this._panOffset=new U,this._rotateStart=new ut,this._rotateEnd=new ut,this._rotateDelta=new ut,this._panStart=new ut,this._panEnd=new ut,this._panDelta=new ut,this._dollyStart=new ut,this._dollyEnd=new ut,this._dollyDelta=new ut,this._dollyDirection=new U,this._mouse=new ut,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=b_.bind(this),this._onPointerDown=S_.bind(this),this._onPointerUp=w_.bind(this),this._onContextMenu=I_.bind(this),this._onMouseWheel=A_.bind(this),this._onKeyDown=C_.bind(this),this._onTouchStart=R_.bind(this),this._onTouchMove=P_.bind(this),this._onMouseDown=T_.bind(this),this._onMouseMove=E_.bind(this),this._interceptControlDown=L_.bind(this),this._interceptControlUp=D_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ve.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(zu),this.update(),this.state=ve.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;ke.copy(e).sub(this.target),ke.applyQuaternion(this._quat),this._spherical.setFromVector3(ke),this.autoRotate&&this.state===ve.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=dn:n>Math.PI&&(n-=dn),s<-Math.PI?s+=dn:s>Math.PI&&(s-=dn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(ke.setFromSpherical(this._spherical),ke.applyQuaternion(this._quatInverse),e.copy(this.target).add(ke),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=ke.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new U(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new U(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=ke.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Zo.origin.copy(this.object.position),Zo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Zo.direction))<M_?this.object.lookAt(this.target):(ku.setFromNormalAndCoplanarPoint(this.object.up,this.target),Zo.intersectPlane(ku,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Lc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Lc||this._lastTargetPosition.distanceToSquared(this.target)>Lc?(this.dispatchEvent(zu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?dn/60*this.autoRotateSpeed*t:dn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ke.setFromMatrixColumn(e,0),ke.multiplyScalar(-t),this._panOffset.add(ke)}_panUp(t,e){this.screenSpacePanning===!0?ke.setFromMatrixColumn(e,1):(ke.setFromMatrixColumn(e,0),ke.crossVectors(this.object.up,ke)),ke.multiplyScalar(t),this._panOffset.add(ke)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;ke.copy(s).sub(this.target);let r=ke.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(dn*this._rotateDelta.x/e.clientHeight),this._rotateUp(dn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(dn*this._rotateDelta.x/e.clientHeight),this._rotateUp(dn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ut,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function S_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function b_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function w_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Vu),this.state=ve.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function T_(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case yi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ve.DOLLY;break;case yi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ve.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ve.ROTATE}break;case yi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ve.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ve.PAN}break;default:this.state=ve.NONE}this.state!==ve.NONE&&this.dispatchEvent(Dc)}function E_(i){switch(this.state){case ve.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ve.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ve.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function A_(i){this.enabled===!1||this.enableZoom===!1||this.state!==ve.NONE||(i.preventDefault(),this.dispatchEvent(Dc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Vu))}function C_(i){this.enabled!==!1&&this._handleKeyDown(i)}function R_(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case vi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ve.TOUCH_ROTATE;break;case vi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ve.TOUCH_PAN;break;default:this.state=ve.NONE}break;case 2:switch(this.touches.TWO){case vi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ve.TOUCH_DOLLY_PAN;break;case vi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ve.TOUCH_DOLLY_ROTATE;break;default:this.state=ve.NONE}break;default:this.state=ve.NONE}this.state!==ve.NONE&&this.dispatchEvent(Dc)}function P_(i){switch(this._trackPointer(i),this.state){case ve.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ve.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ve.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ve.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ve.NONE}}function I_(i){this.enabled!==!1&&i.preventDefault()}function L_(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function D_(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var He=(i,t=0,e=1)=>Math.min(e,Math.max(t,i)),Ei=(i,t,e)=>i+(t-i)*e,Gu=i=>{for(;i>Math.PI;)i-=2*Math.PI;for(;i<-Math.PI;)i+=2*Math.PI;return i};function N_(i,t,e,n,s){let r=(p,S)=>Math.max(1e-6,Math.hypot(S[0]-p[0],S[1]-p[1])**.5),o=0+r(i,t),l=o+r(t,e),c=l+r(e,n),u=o+(l-o)*s,d=(p,S,A,v)=>[((v-u)*p[0]+(u-A)*S[0])/(v-A),((v-u)*p[1]+(u-A)*S[1])/(v-A)],h=d(i,t,0,o),f=d(t,e,o,l),g=d(e,n,l,c),x=d(h,f,0,l),m=d(f,g,o,c);return d(x,m,o,l)}function U_(i,t){return t?i<t[0]?0:i<t[1]?1:2:1}function Jo(i,{step:t=3}={}){let e=i.pts,n=e.length;if(n<2)throw new Error("a stroke needs at least two points");let s=c=>c<0?[2*e[0][0]-e[1][0],2*e[0][1]-e[1][1]]:c>=n?[2*e[n-1][0]-e[n-2][0],2*e[n-1][1]-e[n-2][1]]:e[c],r=[];for(let c=0;c<n-1;c++){let u=Math.hypot(e[c+1][0]-e[c][0],e[c+1][1]-e[c][1]),d=Math.max(1,Math.ceil(u/t));for(let h=0;h<d;h++){let f=h/d,[g,x]=N_(s(c-1),e[c],e[c+1],s(c+2),f);r.push({x:g,y:x,p:Ei(e[c][2],e[c+1][2],f),v:Ei(e[c][3],e[c+1][3],f),ctrl:c+f})}}let a=e[n-1];r.push({x:a[0],y:a[1],p:a[2],v:a[3],ctrl:n-1});let o=0,l=0;return r.forEach((c,u)=>{if(u>0){let d=r[u-1],h=Math.hypot(c.x-d.x,c.y-d.y);o+=h,l+=h/Math.max(1,(c.v+d.v)/2)}c.s=o,c.t=l,c.phase=U_(c.ctrl,i.phases)}),r}var F_=i=>i[i.length-1].s,Hu=i=>i[i.length-1].t;function Wu(i,t){let e=i.length-1;if(t<=0)return{...i[0],i:0};if(t>=i[e].t)return{...i[e],i:e};let n=0,s=e;for(;s-n>1;){let l=n+s>>1;i[l].t<=t?n=l:s=l}let r=i[n],a=i[s],o=(t-r.t)/Math.max(1e-9,a.t-r.t);return{x:Ei(r.x,a.x,o),y:Ei(r.y,a.y,o),p:Ei(r.p,a.p,o),s:Ei(r.s,a.s,o),t,ctrl:Ei(r.ctrl,a.ctrl,o),phase:r.phase,i:n}}var Xu={tipW:6,maxW:118,maxLen:56,gamma:1.12};function Vr(i,t=Xu){if(!(i>.001))return null;let e=He(i);return{hw:(t.tipW+(t.maxW-t.tipW)*e**t.gamma)/2,len:t.tipW*.5+t.maxLen*e**.9}}var qu=i=>.58*He(i)**.95;function Nc(i,{lag:t=26,start:e=null}={}){let n=new Array(i.length),s=e;if(s===null){let r=1;for(;r<i.length&&Math.hypot(i[r].x-i[0].x,i[r].y-i[0].y)<1e-6;)r++;let a=i[Math.min(r,i.length-1)];s=Math.atan2(i[0].y-a.y,i[0].x-a.x)}n[0]=s;for(let r=1;r<i.length;r++){let a=i[r].x-i[r-1].x,o=i[r].y-i[r-1].y,l=Math.hypot(a,o);if(l>1e-9){let c=Math.atan2(-o,-a),u=Gu(c-s);Math.abs(Math.abs(u)-Math.PI)<1e-6&&(u=Math.PI-1e-6),s=Gu(s+u*(1-Math.exp(-l/t)))}n[r]=s}return n}function Ko(i,t={}){let e=Nc(i,t),n=[];return i.forEach((s,r)=>{let a=Vr(s.p,t.foot||Xu);a&&n.push({x:s.x,y:s.y,a:e[r],hw:a.hw,len:a.len,p:s.p,phase:s.phase,t:s.t,s:s.s})}),n}function Yu(i,t=10){let e=Math.cos(i.a),n=Math.sin(i.a),s=-n,r=e,a=[];for(let o=t;o>=0;o--){let l=o/t,c=i.hw*(1-l*l)**.55;a.push([i.x+e*i.len*l+s*c,i.y+n*i.len*l+r*c])}for(let o=1;o<t*2;o++){let l=Math.PI/2+Math.PI*o/(t*2),c=Math.cos(l),u=Math.sin(l);a.push([i.x+(e*c-n*u)*i.hw,i.y+(n*c+e*u)*i.hw])}for(let o=0;o<=t;o++){let l=o/t,c=i.hw*(1-l*l)**.55;a.push([i.x+e*i.len*l-s*c,i.y+n*i.len*l-r*c])}return a}function Zu(i,t=120){let e=F_(i)||1,n=[],s=0;for(let r=0;r<=t;r++){let a=e*r/t;for(;s<i.length-2&&i[s+1].s<a;)s++;let o=i[s],l=i[s+1]||o,c=l.s>o.s?(a-o.s)/(l.s-o.s):0;n.push([r/t,Ei(o.p,l.p,He(c))])}return n}var O_={pMin:.12,pMax:.92,vMid:700};function $u(i,t=O_){let e=Math.max(0,i)/t.vMid;return t.pMin+(t.pMax-t.pMin)/(1+e*e)}function Uc(i){return .06+.94*He(i)**.85}function Ju(i,t,e,n=.06){return i+(t-i)*(1-Math.exp(-Math.max(0,e)/n))}var B_={xuan:{en:"Raw Xuan paper",zh:"\u751F\u5BA3\u7D19",spread:3.1,tau:1.5,feather:.42,gloss:0},shu:{en:"Sized Xuan paper",zh:"\u719F\u5BA3\u7D19",spread:1.45,tau:2.2,feather:.1,gloss:.25},news:{en:"Newspaper",zh:"\u5831\u7D19",spread:2.1,tau:1,feather:.28,gloss:0},copy:{en:"Copy paper",zh:"\u5F71\u5370\u7D19",spread:1.1,tau:3,feather:.03,gloss:1}},z_={thick:{en:"Thick ink",zh:"\u6FC3\u58A8",water:.2,dark:.96},mid:{en:"Medium ink",zh:"\u4E2D\u58A8",water:.55,dark:.72},light:{en:"Light ink",zh:"\u6DE1\u58A8",water:.95,dark:.42}};function $i(i,t,e){let n=B_[i],s=z_[t];if(!n||!s)throw new Error(`unknown paper or ink: ${i}, ${t}`);let r=1+(n.spread-1)*(.55+.75*s.water),a=1-Math.exp(-Math.max(0,e)/n.tau),o=1-n.gloss;return{r:1+(r-1)*a,rMax:r,feather:n.feather*(.6+.6*s.water)*a,dark:s.dark*(1-.18*o*a),halo:o*(.08+.3*s.water)*a,gloss:n.gloss*Math.exp(-Math.max(0,e)/14)+(1-n.gloss)*.7*Math.exp(-Math.max(0,e)/.35)}}var Fc=(i,t=40)=>1-Math.exp(-Math.max(0,i)/t),Ji={goat:{en:"Goat hair",zh:"\u7F8A\u6BEB",soft:1,spring:2.2,color:15920088},mixed:{en:"Mixed hair",zh:"\u517C\u6BEB",soft:.72,spring:4.2,color:13215610},weasel:{en:"Weasel hair",zh:"\u72FC\u6BEB",soft:.48,spring:7.5,color:10185276}},Ku=(i,t)=>He(t*Ji[i].soft),Oc=(i,t,e)=>t*Math.exp(-Ji[i].spring*Math.max(0,e));function Ki(i=1){let t=i*2654435761>>>0||1;return()=>(t^=t<<13,t>>>=0,t^=t>>>17,t^=t<<5,t>>>=0,t/4294967296)}function Ci(i,t,e,{color:n="#f6f0e1",seed:s=7,fiber:r=.5,edge:a=0}={}){i.save(),i.fillStyle=n,i.fillRect(0,0,t,e);let o=Ki(s),l=Math.round(t*e/900*r);i.lineCap="round";for(let c=0;c<l;c++){let u=o()*t,d=o()*e,h=4+o()*16,f=o()*Math.PI*2;i.strokeStyle=o()<.55?"rgba(150,120,70,0.10)":"rgba(255,255,255,0.38)",i.lineWidth=.5+o()*.9,i.beginPath(),i.moveTo(u,d),i.quadraticCurveTo(u+Math.cos(f+.7)*h*.5,d+Math.sin(f+.7)*h*.5,u+Math.cos(f)*h,d+Math.sin(f)*h),i.stroke()}if(a>0){let c=i.createLinearGradient(0,0,a,0);c.addColorStop(0,"rgba(120,100,60,.16)"),c.addColorStop(1,"rgba(120,100,60,0)"),i.fillStyle=c,i.fillRect(0,0,a,e),i.save(),i.translate(t,0),i.scale(-1,1),i.fillRect(0,0,a,e),i.restore()}i.restore()}function jo(i,t,e,n,{kind:s="mi",color:r="rgba(205,62,50,.62)",lw:a=2}={}){if(i.save(),i.strokeStyle=r,i.lineWidth=a*1.5,i.strokeRect(t,e,n,n),i.lineWidth=a,i.setLineDash([a*5,a*4]),i.beginPath(),s==="jiu")for(let o of[1/3,2/3])i.moveTo(t+n*o,e),i.lineTo(t+n*o,e+n),i.moveTo(t,e+n*o),i.lineTo(t+n,e+n*o);else i.moveTo(t+n/2,e),i.lineTo(t+n/2,e+n),i.moveTo(t,e+n/2),i.lineTo(t+n,e+n/2),i.moveTo(t,e),i.lineTo(t+n,e+n),i.moveTo(t+n,e),i.lineTo(t,e+n);i.stroke(),i.restore()}function k_(i,t,e){let n=Yu(t,8);i.beginPath(),i.moveTo(e.ox+n[0][0]*e.k,e.oy+n[0][1]*e.k);for(let s=1;s<n.length;s++)i.lineTo(e.ox+n[s][0]*e.k,e.oy+n[s][1]*e.k);i.closePath(),i.fill()}var Ai=null;function Un(i,t,e,{color:n="#151311",i0:s=0,i1:r=t.length,soft:a=0,alpha:o=1}={}){if(!(r<=s)){if(o<1&&typeof document!="undefined"){let l=i.canvas.width,c=i.canvas.height;Ai=Ai||document.createElement("canvas"),(Ai.width!==l||Ai.height!==c)&&(Ai.width=l,Ai.height=c);let u=Ai.getContext("2d");u.clearRect(0,0,l,c),Un(u,t,e,{color:n,i0:s,i1:r,soft:a}),i.save(),i.globalAlpha=o,i.drawImage(Ai,0,0),i.restore();return}i.save(),i.fillStyle=n,a>0&&(i.shadowColor="rgba(21,19,17,.55)",i.shadowBlur=a);for(let l=s;l<r;l++)k_(i,t[l],e);i.restore()}}function ju(i,t,e,n,s,r){let a=Ki(r),o=Array.from({length:6},(c,u)=>({k:3+u*2+Math.floor(a()*3),ph:a()*6.283,a:(.5+a())/(u+1.5)})),l=120;i.beginPath();for(let c=0;c<=l;c++){let u=c/l*Math.PI*2,d=0;for(let x of o)d+=x.a*Math.sin(x.k*u+x.ph);let h=n*(1+s*d*.55),f=t+Math.cos(u)*h,g=e+Math.sin(u)*h;c?i.lineTo(f,g):i.moveTo(f,g)}i.closePath()}function Bc(i,t,e,n,s,r=3){let a=n*s.r;i.save(),s.halo>.01&&(ju(i,t,e,a*(1+s.halo),s.feather*1.3+.05,r+11),i.fillStyle=`rgba(90,96,110,${.16*s.dark})`,i.fill()),ju(i,t,e,a,s.feather,r);let o=i.createRadialGradient(t,e,0,t,e,a*(1+s.feather*.4));if(o.addColorStop(0,`rgba(16,15,18,${s.dark})`),o.addColorStop(.55,`rgba(16,15,18,${s.dark*(1-s.feather*.35)})`),o.addColorStop(1,`rgba(30,30,36,${s.dark*(.62-s.feather*.4)})`),i.fillStyle=o,i.fill(),s.feather>.12){let l=Ki(r+5);i.strokeStyle=`rgba(20,20,26,${.35*s.dark})`,i.lineCap="round";let c=Math.round(40*s.feather+6);for(let u=0;u<c;u++){let d=l()*Math.PI*2,h=a*(.12+l()*.28)*s.feather*2.2;i.lineWidth=.6+l()*1.1,i.beginPath(),i.moveTo(t+Math.cos(d)*a*.92,e+Math.sin(d)*a*.92),i.lineTo(t+Math.cos(d+(l()-.5)*.2)*(a+h),e+Math.sin(d+(l()-.5)*.2)*(a+h)),i.stroke()}}s.gloss>.04&&(i.beginPath(),i.ellipse(t-a*.32,e-a*.36,a*.34,a*.18,-.6,0,Math.PI*2),i.fillStyle=`rgba(255,255,255,${.55*s.gloss})`,i.fill()),i.restore()}function Qu(i,t,e,n,{at:s=null,bounds:r=null,labels:a=null,color:o="#ffd36e"}={}){let h=x=>6+x*(t-6-6),f=x=>e-18-x*(e-10-18);if(i.clearRect(0,0,t,e),i.save(),r){let x=["rgba(79,209,197,.10)","rgba(255,255,255,.03)","rgba(255,143,184,.10)"],m=[0,r[0],r[1],1];for(let p=0;p<3;p++)i.fillStyle=x[p],i.fillRect(h(m[p]),4,h(m[p+1])-h(m[p]),e-10-18+6);if(a){i.fillStyle="rgba(207,216,234,.85)",i.font=`600 ${Math.round(e*.1)}px system-ui, sans-serif`,i.textAlign="center";for(let p=0;p<3;p++)i.fillText(a[p],(h(m[p])+h(m[p+1]))/2,e-5)}}i.strokeStyle="rgba(160,180,230,.18)",i.lineWidth=1;for(let x of[0,.5,1])i.beginPath(),i.moveTo(6,f(x)),i.lineTo(t-6,f(x)),i.stroke();i.beginPath(),i.moveTo(h(0),f(0));for(let[x,m]of n)i.lineTo(h(x),f(m));i.lineTo(h(1),f(0)),i.closePath();let g=i.createLinearGradient(0,10,0,e-18);if(g.addColorStop(0,"rgba(255,211,110,.55)"),g.addColorStop(1,"rgba(255,211,110,.05)"),i.fillStyle=g,i.fill(),i.beginPath(),n.forEach(([x,m],p)=>p?i.lineTo(h(x),f(m)):i.moveTo(h(x),f(m))),i.strokeStyle=o,i.lineWidth=2,i.stroke(),s!==null){let x=0;for(let m=1;m<n.length;m++)if(n[m][0]>=s){let p=n[m-1],S=n[m];x=p[1]+(S[1]-p[1])*((s-p[0])/Math.max(1e-9,S[0]-p[0]));break}i.strokeStyle="rgba(255,255,255,.55)",i.setLineDash([3,3]),i.beginPath(),i.moveTo(h(s),4),i.lineTo(h(s),e-18),i.stroke(),i.setLineDash([]),i.fillStyle="#fff",i.beginPath(),i.arc(h(s),f(x),4.5,0,Math.PI*2),i.fill()}i.restore()}var Ri=26,Ue=20;function td({L:i=.45,R:t=.07,handle:e=2,hair:n="goat"}={}){let s=new ln,r=new de({color:13214822,roughness:.55,metalness:.02}),a=new de({color:10254916,roughness:.6}),o=new de({color:3809814,roughness:.35,metalness:.1}),l=t*.78,c=new ae(new Vn(l*.92,l,e,24),r);c.position.y=.16+e/2,s.add(c);for(let I of[.38,.74]){let B=new ae(new Vn(l*1.06,l*1.06,.025,24),a);B.position.y=.16+e*I,s.add(B)}let u=new ae(new Vn(l*1.04,t*1.02,.18,24),o);u.position.y=.09,s.add(u);let d=new ae(new Vn(l*.95,l*.92,.1,24),o);d.position.y=.16+e+.05,s.add(d);let h=new ae(new Sr(.05,.008,8,24),new de({color:11549230,roughness:.7}));h.position.y=.16+e+.14,s.add(h);let f=Ri*Ue+1,g=new Float32Array(f*3),x=new Float32Array(f*3),m=[];for(let I=0;I<Ri-1;I++)for(let B=0;B<Ue;B++){let H=I*Ue+B,N=I*Ue+(B+1)%Ue,V=H+Ue,Z=N+Ue;m.push(H,V,N,N,V,Z)}let p=Ri*Ue;for(let I=0;I<Ue;I++)m.push((Ri-1)*Ue+I,p,(Ri-1)*Ue+(I+1)%Ue);let S=new Oe;S.setAttribute("position",new nn(g,3)),S.setAttribute("color",new nn(x,3)),S.setIndex(m);let A=new ae(S,new de({vertexColors:!0,roughness:.85,metalness:0,side:hn}));s.add(A);let v={d:0,dir:[-1,0],fan:0,ink:0,hair:n,wet:0},b=new te,w=new te(1315348),R=new te,y=new te(9067056),T=I=>t*(1+.35*Math.sin(Math.PI*I))*(1-I)**.65;function L(I={}){Object.assign(v,I);let B=He(v.d,0,i*.85),[H,N]=v.dir,V=i-B,Z=B>1e-5?Math.min(1.2*B,V*.9):0,D=V-Z,X=Math.PI/2*Z,G=B/i,k=-N,tt=H;b.setHex(Ji[v.hair].color);for(let Yt=0;Yt<Ri;Yt++){let K=Yt/(Ri-1),it=K*i,pt,Dt,xt,Vt,Zt;if(Z===0||it<=D)pt=0,Dt=-it,xt=0,Vt=-1,Zt=0;else if(it<=D+X){let _=(it-D)/Z;pt=Z*(1-Math.cos(_)),Dt=-D-Z*Math.sin(_),xt=Math.sin(_),Vt=-Math.cos(_),Zt=Math.sin(_)}else pt=Z+(it-D-X),Dt=-V,xt=1,Vt=0,Zt=1;let j=T(K),at=v.fan*K,dt=j*(1+1.1*G*Zt+2.6*at),ht=j*Math.max(.12,1-.62*G*Zt-.85*at);Dt+=ht*Zt*.9;let _t=H*xt,Xt=N*xt,Nt=Vt*tt-0,mt=Xt*k-_t*tt,$=0-Vt*k,C=Math.hypot(Nt,mt,$)||1;Nt/=C,mt/=C,$/=C;let ce=H*pt,ie=N*pt,E=1-v.ink*.72;for(let _=0;_<Ue;_++){let z=_/Ue*Math.PI*2,q=Math.cos(z),Q=Math.sin(z),lt=(Yt*Ue+_)*3;g[lt]=ce+k*q*dt+Nt*Q*ht,g[lt+1]=Dt+mt*Q*ht,g[lt+2]=ie+tt*q*dt+$*Q*ht,R.copy(b),v.hair==="mixed"&&Math.sin(z*7)>.2&&R.lerp(y,.55),v.hair==="weasel"&&R.multiplyScalar(.75+.35*K);let ft=He((K-E)/.08);R.lerp(w,ft*.96),x[lt]=R.r,x[lt+1]=R.g,x[lt+2]=R.b}}let Tt=(Ri-1)*Ue*3,yt=0,ee=0,Kt=0;for(let Yt=0;Yt<Ue;Yt++)yt+=g[Tt+Yt*3],ee+=g[Tt+Yt*3+1],Kt+=g[Tt+Yt*3+2];g[p*3]=yt/Ue,g[p*3+1]=ee/Ue-(B>0?0:t*.05),g[p*3+2]=Kt/Ue,x[p*3]=x[Tt],x[p*3+1]=x[Tt+1],x[p*3+2]=x[Tt+2],S.attributes.position.needsUpdate=!0,S.attributes.color.needsUpdate=!0,S.computeVertexNormals(),S.computeBoundingSphere()}return L(),{group:s,tuft:A,L:i,R:t,handle:e,state:v,setPose:L,setInk:I=>L({ink:He(I)}),setHair:I=>L({hair:I}),tipWorld:(I=new U)=>(A.updateWorldMatrix(!0,!1),I.set(g[p*3],g[p*3+1],g[p*3+2]).applyMatrix4(A.matrixWorld))}}function ed({w:i=3.2,h:t=3.8,x:e=0,y:n=.02,z:s=0,ppu:r=360,box:a=2.6,boxCenter:o=null,grid:l=!0,color:c="#f6f0e1"}={}){let u=Math.round(i*r),d=Math.round(t*r),h=document.createElement("canvas");h.width=u,h.height=d;let f=document.createElement("canvas");f.width=u,f.height=d;let g=document.createElement("canvas");g.width=u,g.height=d;let x=h.getContext("2d"),m=f.getContext("2d"),p=g.getContext("2d"),S=new kn(h);S.colorSpace=Ne,S.anisotropy=4;let A=new ae(new Pn(i,t),new de({map:S,roughness:.92,metalness:0}));A.rotation.x=-Math.PI/2,A.position.set(e,n,s);let v=o||[e,s],b={k:a*r/1e3,ox:(v[0]-a/2-(e-i/2))*r,oy:(v[1]-a/2-(s-t/2))*r},w=l;function R(){Ci(p,u,d,{color:c,seed:5,fiber:.45,edge:r*.04}),w&&jo(p,b.ox,b.oy,a*r,{lw:Math.max(2,r/110),color:"rgba(205,62,50,.72)"})}function y(){x.drawImage(g,0,0),x.drawImage(f,0,0),S.needsUpdate=!0}return R(),y(),{mesh:A,tex:S,canvas:h,T:b,y:n,box:a,world:(T,L,I=new U)=>I.set(v[0]+(T/1e3-.5)*a,n,v[1]+(L/1e3-.5)*a),stampMany(T,L,I){I<=L||(Un(m,T,b,{i0:L,i1:I,soft:r/150}),Un(x,T,b,{i0:L,i1:I,soft:r/150}),S.needsUpdate=!0)},clearInk(){m.clearRect(0,0,u,d),y()},setGrid(T){w=T,R(),y()}}}var Gr={up:.22,move:.4,down:.2};function nd(i,t){let e=t.strokes.map(a=>{let o=Jo(a);return{st:a,s:o,sts:Ko(o),trail:Nc(o),dur:Hu(o),drawn:0}}),n=[],s=0;e.forEach((a,o)=>{if(o>0){let l=Gr.up+Gr.move+Gr.down;n.push({air:!0,a:e[o-1],b:a,t0:s,t1:s+l}),s+=l}n.push({air:!1,k:a,i:o,t0:s,t1:s+a.dur}),s+=a.dur});function r(a,o){return a.trail[Math.min(o,a.trail.length-1)]}return{strokes:e,duration:s,reset(){e.forEach(a=>{a.drawn=0})},poseAt(a){let o=n.find(d=>a<d.t1)||n[n.length-1];if(o.air){let d=o.a.s[o.a.s.length-1],h=o.b.s[0],f=He((a-o.t0)/(o.t1-o.t0)),g=Gr.up/(o.t1-o.t0),x=1-Gr.down/(o.t1-o.t0),m=He((f-g)/(x-g)),p=m*m*(3-2*m),S=f<g?f/g:f>x?(1-f)/(1-x):1,A=r(o.a,o.a.trail.length-1);return{x:d.x+(h.x-d.x)*p,y:d.y+(h.y-d.y)*p,p:0,dir:[Math.cos(A),Math.sin(A)],hover:S,phase:-1,n:o.b.st.n-1,f:0}}let l=o.k,c=Wu(l.s,He(a-o.t0,0,l.dur)),u=r(l,c.i);return{x:c.x,y:c.y,p:c.p,dir:[Math.cos(u),Math.sin(u)],hover:0,phase:c.phase,n:o.i,f:c.s/(l.s[l.s.length-1].s||1)}},drawTo(a){for(let o of n){if(o.air)continue;let l=o.k,c=a-o.t0,u=l.drawn;for(;u<l.sts.length&&l.sts[u].t<=c;)u++;u>l.drawn&&(i.stampMany(l.sts,l.drawn,u),l.drawn=u)}}}}var zc=(i,t)=>t>1e-5?Math.min(1.2*t,(i-t)*.9):0;function id(i,t,e,n=0){let s=t.world(e.x,e.y),r=qu(e.p)*i.L,a=zc(i.L,r);return i.group.quaternion.identity(),i.group.position.set(s.x-e.dir[0]*a,t.y+.002+i.L-r+n,s.z-e.dir[1]*a),i.setPose({d:r,dir:e.dir,fan:0}),r}function sd(i,t,e){let n=new U;return{add(s,r){let a=document.createElement("span");return a.className=`al-lab ${s}`,a.innerHTML=r,i.appendChild(a),a},place(s,r,a=0){n.copy(r).project(e);let o=t.clientWidth,l=t.clientHeight,c=n.z>1||Math.abs(n.x)>1.1||Math.abs(n.y)>1.1;s.style.opacity=c?0:1;let u=s.offsetWidth/2+6,d=Math.min(o-u,Math.max(u,(n.x*.5+.5)*o));s.style.transform=`translate(${d}px, ${(-n.y*.5+.5)*l+a}px) translate(-50%, -50%)`}}}function rd(i,t,e={}){let n=()=>{let s=document.querySelector(i);if(!s)return;let r=null,a=!1,o=()=>(a||(a=!0,r=t(s)),r),l=new IntersectionObserver(c=>{c[0].isIntersecting&&(l.disconnect(),o())},{rootMargin:"600px"});l.observe(s);for(let[c,u]of Object.entries(e))document.querySelectorAll(`[data-lab-${c}]`).forEach(d=>d.addEventListener("click",h=>{let f=o();if(!f)return;h.preventDefault(),s.scrollIntoView({behavior:"smooth",block:"center"});let g=d.getAttribute(`data-lab-${c}`),x=()=>f.ready()?u(f,g):setTimeout(x,150);x()}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n):n()}function Qo(i,t=64,e=64){let n=document.createElement("canvas");n.width=t,n.height=e,i(n.getContext("2d"),t,e);let s=new kn(n);return s.colorSpace=Ne,s}var V_=2.5,G_=26;function ad(i,t){let e=i.querySelector(".cg-pad-cv"),n=e.getContext("2d"),s=i.querySelector(".cg-pad-meter i"),r=i.querySelector(".cg-pad-mode"),a=i.querySelector(".cg-pad-msg"),o={grid:!0,model:!0},l=t.strokes.map(D=>{let X=Jo(D);return{s:X,sts:Ko(X)}}),c=[],u={k:1,ox:0,oy:0},d=0,h=null,f=!1,g=null,x=null;function m(){let D=e.clientWidth||320,X=Math.min(window.devicePixelRatio||1,2),G=Math.round(D*X);(e.width!==G||e.height!==G)&&(e.width=G,e.height=G),d=G,u={k:G/1e3,ox:0,oy:0},x=null,S()}function p(){if(!x){x=document.createElement("canvas"),x.width=d,x.height=d;let D=x.getContext("2d");Ci(D,d,d,{seed:11,fiber:.35}),o.grid&&jo(D,d*.012,d*.012,d*.976,{lw:Math.max(1,d/360)}),o.model&&l.forEach(X=>Un(D,X.sts,u,{color:"rgb(214,72,60)",alpha:.3}))}n.drawImage(x,0,0)}function S(){if(d){p();for(let D of c)Un(n,D.sts,u,{soft:d/420});g&&L()}}let A=D=>{let X=e.getBoundingClientRect();return{x:(D.clientX-X.left)/X.width*1e3,y:(D.clientY-X.top)/X.height*1e3}};function v(D){g&&V();let X=A(D),G=D.pointerType==="pen"&&D.pressure>0;G&&!f&&(f=!0,i.classList.add("cg-pad-pen")),h={id:D.pointerId,pen:G,x:X.x,y:X.y,sx:X.x,sy:X.y,t:D.timeStamp,p:G?Uc(D.pressure):.32,a:Math.PI,sts:[]},c.push(h),b(h.x,h.y,h.p,h.a)}function b(D,X,G,k){let tt=Vr(G);if(!tt)return;let Tt={x:D,y:X,a:k,hw:tt.hw,len:tt.len,p:G};h.sts.push(Tt),Un(n,[Tt],u,{soft:d/420})}function w(D){if(!h||D.pointerId!==h.id)return;let X=typeof D.getCoalescedEvents=="function"?D.getCoalescedEvents():[];for(let G of X.length?X:[D])R(G)}function R(D){let X=A(D),G=h.sx+(X.x-h.sx)*.65,k=h.sy+(X.y-h.sy)*.65;h.sx=G,h.sy=k;let tt=G-h.x,Tt=k-h.y,yt=Math.hypot(tt,Tt),ee=Math.max(.001,(D.timeStamp-h.t)/1e3);if(yt<.5)return;let Kt=h.pen&&D.pressure>0?Uc(D.pressure):$u(yt/ee),Yt=Ju(h.p,Kt,ee,h.pen?.03:.08),K=Math.max(1,Math.ceil(yt/V_)),it=Math.atan2(-Tt,-tt);for(let pt=1;pt<=K;pt++){let Dt=pt/K,xt=it-h.a;for(;xt>Math.PI;)xt-=2*Math.PI;for(;xt<-Math.PI;)xt+=2*Math.PI;h.a+=xt*(1-Math.exp(-(yt/K)/G_)),b(h.x+tt*Dt,h.y+Tt*Dt,h.p+(Yt-h.p)*Dt,h.a)}h.x=G,h.y=k,h.t=D.timeStamp,h.p=Yt,s&&(s.style.width=`${Math.round(He(Yt)*100)}%`)}function y(D){!h||D&&D.pointerId!==h.id||(h.sts.length||c.pop(),h=null,a&&(a.textContent=""))}e.addEventListener("pointerdown",D=>{if(!(D.button!==void 0&&D.button>0)){D.preventDefault();try{e.setPointerCapture(D.pointerId)}catch{}v(D)}}),e.addEventListener("pointermove",D=>{h&&(D.preventDefault(),w(D))}),e.addEventListener("pointerup",y),e.addEventListener("pointercancel",y),e.addEventListener("lostpointercapture",y),e.addEventListener("touchstart",D=>D.preventDefault(),{passive:!1}),e.addEventListener("touchmove",D=>D.preventDefault(),{passive:!1});let T=l.reduce((D,X)=>D+X.s[X.s.length-1].t,0)+.45*(l.length-1);function L(){let D=g.t;for(let X of l){let G=X.s[X.s.length-1].t,k=0;for(;k<X.sts.length&&X.sts[k].t<=D;)k++;if(Un(n,X.sts,u,{i1:k,soft:d/420,color:"#1b2236"}),D>=0&&D<G&&k){let tt=X.sts[k-1];n.save(),n.strokeStyle="rgba(201,161,74,.95)",n.lineWidth=Math.max(2,d/260),n.beginPath(),n.arc(tt.x*u.k,tt.y*u.k,Math.max(8,tt.hw*u.k*.9),0,Math.PI*2),n.stroke(),n.restore()}D-=G+.45}}let I=0,B=0;function H(D){if(I=0,!g)return;let X=Math.min(.05,(D-(B||D))/1e3);if(B=D,g.t+=X,S(),g.t>T+1.6){V();return}I=requestAnimationFrame(H)}function N(){g={t:0},B=0,i.classList.add("cg-pad-demoing"),a&&(a.textContent="Watch the brush, then try it yourself. \xB7 \u770B\u5B8C\u793A\u7BC4\uFF0C\u63DB\u4F60\u5BEB\u5BEB\u770B\u3002"),I||(I=requestAnimationFrame(H))}function V(){g=null,i.classList.remove("cg-pad-demoing"),I&&(cancelAnimationFrame(I),I=0),S()}i.querySelectorAll("[data-pad]").forEach(D=>D.addEventListener("click",()=>{let X=D.getAttribute("data-pad");X==="demo"&&(g?V():N()),X==="undo"&&(c.pop(),S()),X==="clear"&&(c.length=0,S()),X==="save"&&Z()})),i.querySelectorAll("[data-pt]").forEach(D=>D.addEventListener("change",()=>{o[D.getAttribute("data-pt")]=D.checked,x=null,S()}));function Z(){S();let D=X=>{let G=document.createElement("a");G.href=X,G.download=`calligraphy-practice-${t.key}.png`,document.body.appendChild(G),G.click(),G.remove()};e.toBlob?e.toBlob(X=>{if(X){let G=URL.createObjectURL(X);D(G),setTimeout(()=>URL.revokeObjectURL(G),4e3)}}):D(e.toDataURL("image/png"))}return new ResizeObserver(m).observe(e),m(),r&&(r.hidden=!1),i.__pad={strokes:c,render:S,clear:()=>{c.length=0,S()},demo:N,stopDemo:V,setDemoTime:D=>{g=g||{t:0},g.t=D,S()},write(D,X="mouse",G=.5){let k=([tt,Tt,yt])=>({pointerId:99,pointerType:X,pressure:G,timeStamp:yt,clientX:e.getBoundingClientRect().left+tt/1e3*e.clientWidth,clientY:e.getBoundingClientRect().top+Tt/1e3*e.clientHeight});return v(k(D[0])),D.slice(1).forEach(tt=>R(k(tt))),y(),c[c.length-1].sts.length}},i.__pad}var kc={char:"\u4E00",key:"yi",en:"one",box:1e3,count:1,order_src:"\u6559\u80B2\u90E8\u300A\u570B\u5B57\u6A19\u6E96\u5B57\u9AD4\u7B46\u9806\u5B78\u7FD2\u7DB2\u300B\uFF1A\u300C\u4E00\u300D\u5171 1 \u756B\uFF08\u6A6B\uFF09",drawn_by:"\u4EBA\u5E2B\u6559\u80B2\u5354\u6703\u81EA\u7E6A\uFF1A\u4E2D\u5FC3\u7DDA\uFF0B\u6BCF\u4E00\u9EDE\u7684\u58D3\u529B\u8207\u901F\u5EA6\uFF08\u6977\u66F8\uFF0C\u85CF\u92D2\u8D77\u7B46\u3001\u4E2D\u92D2\u884C\u7B46\u3001\u56DE\u92D2\u6536\u7B46\uFF09",strokes:[{n:1,en:"Horizontal",zh:"\u6A6B",pts:[[212,494,.02,140],[186,497,.12,95],[184,513,.4,70],[210,525,.7,55],[262,517,.54,230],[400,507,.5,330],[560,498,.47,340],[700,491,.5,290],[776,487,.54,210],[802,485,.42,120],[828,494,.74,70],[838,512,.62,55],[816,509,.3,70],[796,499,.04,95]],phases:[3,9]}]};var Lt=(i,t,e)=>new U(i,t,e),on=(i,t,e,n)=>(i.position.set(t,e,n),i),yn=i=>Fs.smootherstep(He(i),0,1),qe={x:0,z:.35,w:3.2,h:3.8,box:2.6,bc:[0,.45]},ji=Lt(3.35,0,-.45),ti=Lt(3.35,.262,-.1),ei=Lt(3.35,.21,-1.17),ni=Lt(4.75,.11,-.5),Vs=Lt(-3.3,0,-.95),Pi=Lt(-4.55,.014,.85),bn=[Lt(-4.3,.014,2.4),Lt(-3,.014,2.4)],Vc=1.05;function W_(i){let t=P=>i.querySelector(P),e=P=>i.querySelectorAll(P),n=t(".al-space"),s=t(".al-space-cv"),r;try{r=new Xo({canvas:s,antialias:!0})}catch{return i.classList.add("al-nogl"),null}r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),r.shadowMap.enabled=!0,r.shadowMap.type=Hi;let a=new rr;a.background=new te(725798);let o=new Ke(34,1,.05,200),l=new $o(o,s);l.enableDamping=!0,l.dampingFactor=.08,l.minDistance=.6,l.maxDistance=40,l.maxPolarAngle=Math.PI*.47,a.add(new wr(16774368,2760728,.75)),a.add(new Ar(16777215,.12));let c=new Er(16773596,1.55);c.position.set(-4,9,5),c.castShadow=!0,c.shadow.mapSize.set(2048,2048),Object.assign(c.shadow.camera,{left:-7,right:7,top:5,bottom:-5,near:1,far:25}),c.shadow.bias=-4e-4,c.shadow.normalBias=.02,a.add(c);let u=[],d=(P,st)=>(P.traverse(ct=>{ct.isMesh&&(ct.userData.focus=st,ct.castShadow=!0,ct.receiveShadow=!0,u.push(ct))}),P),h=Qo((P,st,ct)=>{P.fillStyle="#6a4125",P.fillRect(0,0,st,ct);let zt=Ki(4);for(let qt=0;qt<140;qt++){let Se=zt()*ct,se=2+zt()*6,Wt=.004+zt()*.01,ne=zt()*6;P.strokeStyle=zt()<.5?`rgba(40,20,8,${.12+zt()*.2})`:`rgba(160,110,60,${.08+zt()*.12})`,P.lineWidth=.6+zt()*2.2,P.beginPath();for(let _e=0;_e<=st;_e+=8){let M=Se+Math.sin(_e*Wt+ne)*se;_e?P.lineTo(_e,M):P.moveTo(_e,M)}P.stroke()}},1024,512),f=new ae(new rn(12.4,.36,7.4),[new de({color:4860952,roughness:.6}),new de({color:4860952,roughness:.6}),new de({map:h,roughness:.55}),new de({color:3809811}),new de({color:4860952,roughness:.6}),new de({color:4860952,roughness:.6})]);f.receiveShadow=!0,a.add(on(f,0,-.18,.2));let g=new ae(new rn(4,.012,4.6),new de({roughness:1,map:Qo((P,st,ct)=>{P.fillStyle="#2c313d",P.fillRect(0,0,st,ct);let zt=Ki(9);for(let qt=0;qt<2600;qt++)P.fillStyle=`rgba(${zt()<.5?"255,255,255":"0,0,0"},${.03+zt()*.05})`,P.fillRect(zt()*st,zt()*ct,1+zt()*2,1+zt()*2)},256,256)}));g.receiveShadow=!0,a.add(on(g,qe.x,.006,qe.z)),d(g,"paper");let x=ed({w:qe.w,h:qe.h,x:qe.x,y:.016,z:qe.z,box:qe.box,boxCenter:qe.bc});x.mesh.receiveShadow=!0,a.add(x.mesh),d(x.mesh,"paper"),x.mesh.castShadow=!1;let m=new de({color:4859416,roughness:.42}),p=new ln;p.add(new ae(new rn(2.7,.13,.22),m)),p.add(on(new ae(new rn(2.2,.01,.06),new de({color:2757643,roughness:.5})),0,.066,0)),a.add(on(p,qe.x,.016+.065,qe.z-qe.h/2+.18)),d(p,"paper");let S=new ln;a.add(on(S,ji.x,ji.y,ji.z));let A=new de({color:3878714,roughness:.62}),v=new de({color:4865096,roughness:.42});S.add(on(new ae(new rn(1.5,.1,2.3),A),0,.05,0));for(let[P,st,ct,zt]of[[1.5,.12,0,-1.09],[1.5,.12,0,1.09],[.12,2.06,-.69,0],[.12,2.06,.69,0]])S.add(on(new ae(new rn(P,.22,st),A),ct,.21,zt));let b=new ki;b.moveTo(-1.03,.1),b.lineTo(-.45,.1),b.quadraticCurveTo(-.4,.23,-.3,.26),b.lineTo(1.03,.26),b.lineTo(1.03,.1),b.closePath();let w=new ae(new Cs(b,{depth:1.26,bevelEnabled:!1}),v);w.rotation.y=-Math.PI/2,w.position.x=.63,S.add(w);let R=new ae(new Pn(1.26,.7),new de({color:658448,roughness:.05,metalness:.2,transparent:!0,opacity:.9}));R.rotation.x=-Math.PI/2,S.add(on(R,0,.21,-.68));let y=new ae(new ur(.34,48),new de({color:5597562,roughness:.05,metalness:.2,transparent:!0,opacity:.3}));y.rotation.x=-Math.PI/2,S.add(on(y,0,.263,.35));let T=new ae(new Mr(.9,1,40),new de({color:16777215,transparent:!0,opacity:0,roughness:.2}));T.rotation.x=-Math.PI/2,S.add(on(T,0,.265,.35)),d(S,"stone"),y.castShadow=!1,R.castShadow=!1,T.castShadow=!1;let L=Qo((P,st,ct)=>{P.fillStyle="#121116",P.fillRect(0,0,st,ct),P.strokeStyle="#c9a14a",P.lineWidth=6,P.strokeRect(14,14,st-28,ct-28),P.lineWidth=3;for(let zt=0;zt<4;zt++){let qt=170+zt*230;P.beginPath(),P.arc(st/2-34,qt,30,Math.PI*.2,Math.PI*1.7),P.stroke(),P.beginPath(),P.arc(st/2+30,qt+26,40,Math.PI*1.1,Math.PI*2.6),P.stroke(),P.beginPath(),P.arc(st/2-8,qt+70,18,0,Math.PI*1.5),P.stroke()}},256,1024),I=[0,1,2,3,4,5].map(P=>new de(P===2?{map:L,roughness:.38}:{color:1315608,roughness:.45})),B=new ae(new rn(.22,.1,.95),I);B.castShadow=!0,a.add(B);let H=new ae(new rn(.44,.06,1.12),m);a.add(on(H,ni.x,.03,ni.z)),d(B,"ink"),d(H,"ink");let N=new ln;a.add(on(N,4.5,0,1.55));let V=[[0,0],[.24,0],[.33,.06],[.37,.16],[.34,.26],[.24,.33],[.12,.355],[.1,.34],[.09,.3]].map(([P,st])=>new ut(P,st));N.add(new ae(new vr(V,40),new de({color:10273714,roughness:.22,side:hn})));let Z=new ln;Z.rotation.z=-.9,Z.position.set(.02,.3,0),Z.add(on(new ae(new Vn(.012,.012,.5,8),new de({color:11569738,metalness:.7,roughness:.35})),0,.2,0)),N.add(Z),d(N,"stone");let D=new ki,X=[[-.95,0],[-.95,.3],[-.8,.5],[-.6,.36],[-.4,.62],[-.2,.42],[0,.74],[.2,.42],[.4,.62],[.6,.36],[.8,.5],[.95,.3],[.95,0]];D.moveTo(X[0][0],X[0][1]);for(let P=1;P<X.length;P++){let[st,ct]=X[P],[zt,qt]=X[P-1];P===1||P===X.length-1?D.lineTo(st,ct):D.quadraticCurveTo(zt+(st-zt)*.5,Math.max(qt,ct)+.04*(ct>qt?1:0),st,ct)}D.closePath();let G=new ae(new Cs(D,{depth:.16,bevelEnabled:!0,bevelThickness:.02,bevelSize:.02,bevelSegments:2}),new de({color:4008736,roughness:.4,metalness:.15}));G.position.set(Vs.x,0,Vs.z-.08),a.add(G),d(G,"brush");let k=td({hair:"goat"});k.group.traverse(P=>{P.isMesh&&(P.castShadow=!0)}),a.add(k.group),d(k.group,"brush");let tt=Lt(Vs.x-.2,.42+.06,-.2),Tt=new Ie().setFromAxisAngle(Lt(1,0,0),-Math.PI/2),yt=new Ie,ee=document.createElement("canvas");ee.width=ee.height=320;let Kt=new kn(ee);Kt.colorSpace=Ne;let Yt=new ae(new Pn(.9,.9),new de({map:Kt,roughness:.95}));Yt.rotation.x=-Math.PI/2,Yt.receiveShadow=!0,a.add(on(Yt,Pi.x,Pi.y,Pi.z)),d(Yt,"brush"),Yt.castShadow=!1;function K(){Ci(ee.getContext("2d"),320,320,{seed:21,fiber:.6,edge:6}),Kt.needsUpdate=!0}K();let it=bn.map((P,st)=>{let ct=document.createElement("canvas");ct.width=ct.height=300;let zt=new kn(ct);zt.colorSpace=Ne;let qt=new ae(new Pn(Vc,Vc),new de({map:zt,roughness:st?.55:.95}));qt.rotation.x=-Math.PI/2,qt.receiveShadow=!0,a.add(on(qt,P.x,P.y,P.z)),d(qt,"paper"),qt.castShadow=!1;let Se=new ae(new Gi(.05,20,12),new de({color:789262,roughness:.12,metalness:.2}));return Se.visible=!1,a.add(Se),{c:ct,t:zt,m:qt,drop:Se,key:st?"copy":"xuan",color:st?"#fbfbf7":"#f6f0e1"}}),pt=new ae(new Gi(1,28,14,0,Math.PI*2,0,Math.PI/2),new de({color:789262,roughness:.08,metalness:.25}));pt.visible=!1,a.add(pt);function Dt(P){it.forEach((st,ct)=>{let zt=st.c.getContext("2d");Ci(zt,300,300,{color:st.color,seed:30+ct,fiber:ct?.08:.6,edge:5}),P>=0&&Bc(zt,150,150,26,$i(st.key,"mid",P),7+ct),st.t.needsUpdate=!0})}Dt(-1);let xt=Array.from({length:3},()=>{let P=new ae(new Gi(.035,14,10),new de({color:13624575,transparent:!0,opacity:.8,roughness:.05}));return P.visible=!1,a.add(P),P}),Vt=sd(t(".al-labels"),s,o),Zt=(P,st,ct)=>Vt.add(`cg-lb ${P}`,`${st}<small>${ct}</small>`),j={brush:Zt("cg-lb-t","Brush","\u7B46"),ink:Zt("cg-lb-t","Ink stick","\u58A8"),paper:Zt("cg-lb-t","Paper","\u7D19"),stone:Zt("cg-lb-t","Inkstone","\u786F"),rack:Zt("","Brush rest","\u7B46\u67B6"),weight:Zt("","Paperweight","\u7D19\u93AE"),pot:Zt("","Water dropper","\u6C34\u76C2"),felt:Zt("","Felt pad","\u6BDB\u6C08"),tip:Zt("cg-lb-k","Tip","\u7B46\u5C16"),belly:Zt("cg-lb-k","Belly","\u7B46\u809A"),root:Zt("cg-lb-k","Root","\u7B46\u6839"),handle:Zt("","Handle","\u7B46\u687F"),hall:Zt("cg-lb-k","Grinding surface","\u786F\u5802"),well:Zt("cg-lb-k","Ink well","\u786F\u6C60"),xuan:Zt("cg-lb-k","Raw Xuan paper","\u751F\u5BA3\u7D19"),copy:Zt("cg-lb-k","Copy paper","\u5F71\u5370\u7D19"),phase:Zt("cg-lb-ph","","")};Object.values(j).forEach(P=>{P.hidden=!0});let at=nd(x,kc),dt=Zu(at.strokes[0].s),ht=at.strokes[0].s,_t=ht[ht.length-1].s,Xt=[ht.find(P=>P.phase>=1).s/_t,ht.find(P=>P.phase>=2).s/_t],Nt=JSON.parse(i.getAttribute("data-phases")||"[]"),mt={play:t(".al-play"),force:t(".cg-force"),phK:t(".cg-phase-k"),phT:t(".cg-phase-t"),press:t(".cg-press-out"),circles:t(".cg-circles"),dark:t(".cg-dark"),darkBar:t(".cg-dark-bar i"),hairOut:t(".cg-hair-out"),bendOut:t(".cg-bend-out"),sx:t(".cg-spread-xuan"),sc:t(".cg-spread-copy"),again:t(".cg-again"),grind:t(".cg-grind")},$={mode:"desk",playing:!0,labels:!0,speed:1,cam:"side",hair:"goat",act:"idle",actT:0,pressD0:0,circles:0,grinding:!1,dropT:-1,waterT:-1,seq:-1,seqFrom:null,t:0},C={up:1.1,down:1.7,hold:2.3,rise:2.8,travel:3.9,touch:4.4},ce=()=>C.touch+at.duration;function ie(P,st){let ct=Fs.degToRad(o.fov/2),zt=Math.atan(Math.tan(ct)*o.aspect);return Math.max(st/2/Math.tan(ct),P/2/Math.tan(zt))}let E={desk:()=>({t:Lt(.05,0,.3),d:Lt(.08,.68,.73),w:10.6,h:6.4}),brush:()=>({t:Lt(Pi.x+.08,.5,Pi.z),d:Lt(.42,.3,.86),w:1.45,h:1.3}),ink:()=>({t:Lt(3.55,.35,-.35),d:Lt(-.25,.6,.76),w:2.9,h:2.5}),paper:()=>({t:Lt((bn[0].x+bn[1].x)/2,0,bn[0].z-.05),d:Lt(0,.86,.5),w:2.9,h:1.6}),stone:()=>({t:Lt(ji.x,.15,ji.z),d:Lt(.38,.78,.5),w:2.1,h:2.9}),pre:()=>({t:Lt(1.55,0,.1),d:Lt(0,.78,.62),w:7.2,h:4.3}),top:()=>({t:Lt(qe.bc[0],0,qe.bc[1]),d:Lt(0,1,.02),w:2.9,h:2.9}),side:()=>({t:Lt(qe.bc[0],.3,qe.bc[1]),d:Lt(0,.2,1),w:2.5,h:1.4})},_={t:1,p0:Lt(0,0,0),p1:Lt(0,0,0),t0:Lt(0,0,0),t1:Lt(0,0,0)};function z(P,st,ct){if(ct){o.position.copy(P),l.target.copy(st),_.t=1;return}_.p0.copy(o.position),_.t0.copy(l.target),_.p1.copy(P),_.t1.copy(st),_.t=0}function q(){return $.mode!=="write"?$.mode:$.seq>=0&&$.seq<C.travel?"pre":$.cam==="tip"?"tip":$.cam}let Q="";function lt(P){let st=q();if(Q=st,st==="tip"){l.enabled=!1,_.t=1;return}l.enabled=!0;let ct=E[st]();z(ct.d.clone().normalize().multiplyScalar(ie(ct.w,ct.h)).add(ct.t),ct.t,P)}let ft={brush:{t:1,p:Lt(0,0,0),q:new Ie},stick:{t:1,p:Lt(0,0,0),q:new Ie}},et=(P,st)=>{st.t=0,st.p.copy(P.position),st.q.copy(P.quaternion)};function nt(P,st){P!==$.mode&&(et(k.group,ft.brush),et(B,ft.stick)),$.mode=P,e("[data-focus]").forEach(ct=>ct.setAttribute("aria-pressed",ct.getAttribute("data-focus")===P?"true":"false")),e(".cg-panel").forEach(ct=>{ct.hidden=ct.getAttribute("data-panel")!==P}),i.classList.toggle("cg-writing",P==="write"),$.act="idle",$.actT=0,Ut(P==="ink"),P==="paper"&&bt(),P==="brush"&&(K(),k.setPose({fan:0})),P==="write"&&jt(),P!=="write"&&($.seq=-1),st&&(ft.brush.t=1,ft.stick.t=1),lt(st),gt(!0)}function gt(P){$.playing=P,i.classList.toggle("is-playing",P),mt.play.setAttribute("aria-pressed",P?"true":"false"),mt.play.querySelector(".al-play-t").textContent=P?"Pause \xB7 \u66AB\u505C":"Play \xB7 \u64AD\u653E"}function Ut(P){$.grinding=P,mt.grind&&(mt.grind.setAttribute("aria-pressed",P?"true":"false"),mt.grind.querySelector(".t").textContent=P?"Stop grinding \xB7 \u505C\u4E0B\u4F86":"Grind \xB7 \u78E8\u58A8")}function bt(){$.dropT=-.45,it.forEach(P=>{P.drop.visible=!0})}function Mt(){$.waterT=0,$.circles*=.55}function Bt(P){$.hair=P,k.setHair(P),e("[data-hair]").forEach(st=>st.setAttribute("aria-pressed",st.getAttribute("data-hair")===P?"true":"false")),mt.hairOut&&(mt.hairOut.innerHTML=`${Ji[P].en}<small>${Ji[P].zh}</small>`)}function Ht(P){$.mode!=="brush"&&nt("brush"),$.act=P,$.actT=0,(P==="press"||P==="spring")&&K(),e("[data-virtue]").forEach(zt=>zt.setAttribute("aria-pressed",zt.getAttribute("data-virtue")===P?"true":"false"));let st=i.querySelector(`.cg-virtue[data-virtue="${P}"]`),ct=t(".cg-virtue-t");ct&&(ct.innerHTML=st?`<b>${st.querySelector("b").textContent} ${st.querySelector("span").textContent}</b> ${st.getAttribute("data-en")}<span class="zh">${st.getAttribute("data-zh")}</span>`:""),gt(!0)}function jt(){x.clearInk(),at.reset(),$.seq=0,$.travelFrom=null,$.seqFrom={p:k.group.position.clone(),q:k.group.quaternion.clone(),ink:k.state.ink},k.state.ink>.6&&$.seqFrom.q.angleTo(yt)<.05&&($.seq=C.rise,$.travelFrom=$.seqFrom.p),gt(!0)}function O(P){$.speed=P,e("[data-speed]").forEach(st=>st.setAttribute("aria-pressed",Number(st.getAttribute("data-speed"))===P?"true":"false"))}function vt(P){$.cam=P,e("[data-cam]").forEach(st=>st.setAttribute("aria-pressed",st.getAttribute("data-cam")===P?"true":"false")),lt(!1)}e("[data-focus]").forEach(P=>P.addEventListener("click",()=>nt(P.getAttribute("data-focus")))),e("[data-hair]").forEach(P=>P.addEventListener("click",()=>{Bt(P.getAttribute("data-hair")),Ht("press")})),e("[data-virtue]").forEach(P=>P.addEventListener("click",()=>Ht(P.getAttribute("data-virtue")))),e("[data-speed]").forEach(P=>P.addEventListener("click",()=>O(Number(P.getAttribute("data-speed"))))),e("[data-cam]").forEach(P=>P.addEventListener("click",()=>vt(P.getAttribute("data-cam")))),mt.again&&mt.again.addEventListener("click",()=>{$.mode!=="write"?nt("write"):jt()}),mt.grind&&mt.grind.addEventListener("click",()=>{Ut(!$.grinding),gt(!0)}),i.querySelectorAll(".cg-fresh-water").forEach(P=>P.addEventListener("click",()=>{$.circles=0,Ut(!0),gt(!0)})),i.querySelectorAll(".cg-redrop").forEach(P=>P.addEventListener("click",()=>{bt(),gt(!0)})),i.querySelectorAll(".cg-add-water").forEach(P=>P.addEventListener("click",()=>{Mt(),gt(!0)})),mt.play.addEventListener("click",()=>gt(!$.playing)),t(".al-home").addEventListener("click",()=>lt(!1));let rt=(P,st)=>{let ct=t(P);ct&&ct.addEventListener("change",()=>st(ct.checked))};rt('[data-t="labels"]',P=>{$.labels=P}),rt('[data-t="grid"]',P=>x.setGrid(P));let St=new Cr,Ct=new ut,ot=null;s.addEventListener("pointerdown",P=>{ot={x:P.clientX,y:P.clientY,t:performance.now()}}),s.addEventListener("pointerup",P=>{if(!ot||Math.hypot(P.clientX-ot.x,P.clientY-ot.y)>6||performance.now()-ot.t>500)return;let st=s.getBoundingClientRect();Ct.set((P.clientX-st.left)/st.width*2-1,-((P.clientY-st.top)/st.height)*2+1),St.setFromCamera(Ct,o);let ct=St.intersectObjects(u,!1)[0];ct&&ct.object.userData.focus&&ct.object.userData.focus!==$.mode&&$.mode!=="write"&&nt(ct.object.userData.focus)});let Gt=Lt(0,0,0),It=new Ie;function ge(P,st,ct,zt,qt,Se=.7){if(st.t<1){st.t=Math.min(1,st.t+qt/1);let se=yn(st.t);P.position.lerpVectors(st.p,ct,se),P.position.y+=Math.sin(Math.PI*se)*Se,P.quaternion.slerpQuaternions(st.q,zt,se)}else P.position.copy(ct),P.quaternion.copy(zt)}function fe(){let P=$.seq,st=k.L,ct=Lt(ei.x,ei.y+st+.5,ei.z),zt=Lt(ei.x,ei.y+st-.07,ei.z),qt=at.poseAt(0),Se=x.world(qt.x,qt.y).add(Lt(0,st+.42,0)),se=x.world(qt.x,qt.y).add(Lt(0,st+.002,0));if(P<C.up){let Wt=yn(P/C.up),ne=$.seqFrom;k.group.position.lerpVectors(ne.p,ct,Wt),k.group.position.y+=Math.sin(Math.PI*Wt)*.5,k.group.quaternion.slerpQuaternions(ne.q,yt,Wt),k.setPose({d:0,fan:0,ink:ne.ink*(1-Wt)})}else if(P<C.hold){let Wt=yn((P-C.up)/(C.down-C.up));k.group.quaternion.copy(yt),k.group.position.lerpVectors(ct,zt,Wt),P>C.down&&(k.group.position.x+=Math.sin((P-C.down)*9)*.04),k.setPose({d:0,ink:He((P-C.up-.3)/.9)})}else if(P<C.rise)k.group.quaternion.copy(yt),k.group.position.lerpVectors(zt,ct,yn((P-C.hold)/(C.rise-C.hold))),k.setPose({d:0,ink:1});else if(P<C.travel){k.group.quaternion.copy(yt);let Wt=$.travelFrom||ct;k.group.position.lerpVectors(Wt,Se,yn((P-C.rise)/(C.travel-C.rise))),k.setPose({d:0,ink:1,dir:qt.dir})}else if(P<C.touch)k.group.quaternion.copy(yt),k.group.position.lerpVectors(Se,se,yn((P-C.travel)/(C.touch-C.travel))),k.setPose({d:0,ink:1,dir:qt.dir});else{let Wt=P-C.touch,ne=at.poseAt(Math.min(Wt,at.duration)),_e=Wt>at.duration?yn((Wt-at.duration)/.7)*.5:0;return id(k,x,Wt>at.duration?{...ne,p:0}:ne,_e+ne.hover*.3),at.drawTo(Wt),ne}return null}function Ye(P){let st=$.playing?P:0;$.t+=st;let ct=null;if($.mode==="write"&&$.seq>=0)$.seq+=st*$.speed,ct=fe(),$.seq>ce()+.9&&($.seq=ce()+.9);else if($.mode==="brush"){let se=k.L;$.actT+=st;let Wt=$.actT,ne=.32,_e=0,M=0,F=0;if($.act==="press"||$.act==="spring"){let W=Ku($.hair,.75),wt=W*.6*se;if(Wt<.5?ne=.32*(1-yn(Wt/.5)):Wt<1.2?(ne=0,_e=wt*yn((Wt-.5)/.35)):Wt<1.6?(ne=.32*yn((Wt-1.2)/.4),_e=Oc($.hair,wt,Wt-1.2)):(ne=.32,_e=Oc($.hair,wt,Wt-1.2)),Wt>=1.2&&Wt-st<1.2){let Rt=Vr(He(wt/(.6*se))),Et=ee.getContext("2d");Un(Et,[{x:500,y:500,a:Math.PI,hw:Rt.hw*1.6,len:Rt.len*1.6}],{k:.32,ox:0,oy:0},{soft:1.5}),Kt.needsUpdate=!0}mt.bendOut&&(mt.bendOut.textContent=`${Math.round(W*100)}%`),ne-=_e}else $.act==="even"?(M=yn(Math.min(Wt,1.2)/1.2)*(Wt<3.4?1:1-yn((Wt-3.4)/.8)),ne=.32):$.act==="round"&&(F=Wt*1.6,ne=.32);let J=Lt(Pi.x+zc(se,Math.max(0,_e)),Pi.y+se+ne+.002,Pi.z);It.setFromAxisAngle(Lt(0,1,0),F),ge(k.group,ft.brush,J,It,P),k.setPose({d:Math.max(0,_e),dir:[-1,0],fan:M,ink:0})}else ge(k.group,ft.brush,tt,Tt,P),k.setPose({d:0,fan:0});if($.mode==="ink"||$.mode==="stone"){let se=$.mode==="ink";se&&$.grinding&&($.circles+=st/1.2);let Wt=$.circles*Math.PI*2,ne=se?Lt(ti.x+Math.cos(Wt)*.15,ti.y+.475,ti.z+Math.sin(Wt)*.12):Lt(ni.x,ni.y,ni.z);It.setFromAxisAngle(Lt(1,0,0),se?-Math.PI/2:0),se&&It.multiply(new Ie().setFromAxisAngle(Lt(0,1,0),.12)),ge(B,ft.stick,ne,It,P,se?.6:.4)}else ge(B,ft.stick,ni,new Ie,P,.4);let qt=Fc($.circles)**.7;if(y.material.color.setRGB(.09*(1-qt)+.004*qt,.13*(1-qt)+.004*qt,.17*(1-qt)+.006*qt),y.material.opacity=.3+.67*qt,R.material.color.setRGB(.02*(1-qt)+.003*qt,.026*(1-qt)+.003*qt,.034*(1-qt)+.004*qt),R.material.opacity=.82+.16*qt,$.waterT>=0){$.waterT+=st,xt.forEach((Wt,ne)=>{let _e=$.waterT-ne*.35;Wt.visible=_e>0&&_e<.45,Wt.visible&&Wt.position.set(ti.x+(ne-1)*.06,ti.y+1.1*(1-(_e/.45)**2),ti.z)});let se=$.waterT-.45;T.material.opacity=se>0&&se<1.6?.5*(1-se/1.6):0,T.scale.setScalar(.05+Math.max(0,se)*.2),$.waterT>2.4&&($.waterT=-1)}if($.dropT>-1&&$.dropT<12){let se=$.dropT;if($.dropT+=st,it.forEach((Wt,ne)=>{$.dropT<0?(Wt.drop.visible=!0,Wt.drop.position.set(bn[ne].x,.014+1*($.dropT/-.45)**2+.05,bn[ne].z)):Wt.drop.visible=!1}),$.dropT>=0&&(se<0||st>0)){Dt($.dropT*1.4);let Wt=$i("copy","mid",$.dropT*1.4);pt.visible=Wt.gloss>.05;let ne=26/300*Vc*Wt.r;pt.scale.set(ne,ne*.5*Wt.gloss,ne),pt.position.set(bn[1].x,.016,bn[1].z)}$.dropT>12&&($.dropT=12)}let Se=q();if(Se!==Q&&lt(!1),Se==="tip"){let se=k.tipWorld(Lt(0,0,0)),Wt=se.clone().add(Lt(-.62,.36,.82)),ne=se.clone().add(Lt(.12,.1,0)),_e=1-Math.exp(-P*5);o.position.lerp(Wt,_e),l.target.lerp(ne,_e),o.lookAt(l.target)}if(_.t<1){_.t=Math.min(1,_.t+P/1.1);let se=yn(_.t);o.position.lerpVectors(_.p0,_.p1,se),l.target.lerpVectors(_.t0,_.t1,se)}return ct}let Fe=!1,We=null;function Hr(){let P=$.labels,st=$.mode,ct=(ne,_e,M,F)=>{ne.hidden=!_e,_e&&Vt.place(ne,M,F)},zt=st==="desk";ct(j.brush,P&&(zt||st==="brush"),st==="brush"?k.group.localToWorld(Lt(0,1.3,0)):Lt(Vs.x-.2,.95,-.95)),ct(j.ink,P&&(zt||st==="ink"),st==="ink"?B.localToWorld(Lt(0,0,.62)):Lt(ni.x,.36,ni.z-.2)),ct(j.paper,P&&zt,Lt(-1.05,.05,1.85)),ct(j.stone,P&&zt,Lt(ji.x,.42,ji.z+1.3)),ct(j.rack,P&&zt&&!Fe,Lt(Vs.x+.55,.2,Vs.z-.3)),ct(j.weight,P&&zt&&!Fe,Lt(.9,.2,qe.z-qe.h/2+.18)),ct(j.pot,P&&(zt||st==="stone")&&!Fe,Lt(4.5,.05,2.15)),ct(j.felt,P&&zt&&!Fe,Lt(-1.75,.03,2.45));let qt=ne=>k.group.localToWorld(Lt(0,ne,0)),Se=P&&st==="brush";ct(j.tip,Se&&$.act!=="press",k.tipWorld(Lt(0,0,0)),0),ct(j.belly,Se&&!Fe,qt(-k.L*.38).add(Lt(.02,0,0)),0),ct(j.root,Se&&!Fe,qt(-.02)),ct(j.handle,Se,qt(.75)),ct(j.hall,P&&(st==="stone"||st==="ink"),Lt(ti.x-.15,ti.y+.05,ti.z+.42)),ct(j.well,P&&(st==="stone"||st==="ink"),Lt(ei.x,ei.y+.05,ei.z)),ct(j.xuan,P&&st==="paper",Lt(bn[0].x,.02,bn[0].z+.68)),ct(j.copy,P&&st==="paper",Lt(bn[1].x,.02,bn[1].z+.68));let se=We&&We.phase>=0&&$.seq<ce()+.2?Nt[We.phase]:null,Wt=se?`${se.short_en}<small>${se.short_zh}</small>`:"";j.phase.innerHTML!==Wt&&(j.phase.innerHTML=Wt),ct(j.phase,P&&st==="write"&&!!se&&$.cam!=="top",k.group.localToWorld(Lt(0,.9,0)))}let Gs=0;function Ii(){let P=Fc($.circles);if(mt.circles&&(mt.circles.textContent=String(Math.floor($.circles))),mt.dark&&(mt.dark.textContent=`${Math.round(P*100)}%`),mt.darkBar&&(mt.darkBar.style.width=`${(P*100).toFixed(1)}%`),mt.sx&&(mt.sx.textContent=`${$i("xuan","mid",99).rMax.toFixed(1)}\xD7`),mt.sc&&(mt.sc.textContent=`${$i("copy","mid",99).rMax.toFixed(1)}\xD7`),$.mode==="write"&&mt.force){let st=mt.force,ct=Math.min(window.devicePixelRatio||1,2),zt=Math.round(st.clientWidth*ct),qt=Math.round(st.clientHeight*ct);if(zt&&qt){(st.width!==zt||st.height!==qt)&&(st.width=zt,st.height=qt);let ne=We&&$.seq>=C.touch;Qu(st.getContext("2d"),zt,qt,dt,{at:ne?Math.min(1,We.f):null,bounds:Xt,labels:Nt.map(_e=>_e.short_zh)})}let Se=We&&$.seq>=C.touch&&$.seq<ce()+.1?Nt[We.phase]:null,se=Se?`${Se.en} \xB7 ${Se.zh}`:$.seq<C.touch?"Dipping the brush \xB7 \u8638\u58A8":"Done \xB7 \u5BEB\u5B8C\u4E86";mt.phK&&mt.phK.textContent!==se&&(mt.phK.textContent=se);let Wt=Se?`${Se.text_en}<span class="zh">${Se.text_zh}</span>`:$.seq<C.touch?'The brush dips into the ink well, then moves to the paper.<span class="zh">\u6BDB\u7B46\u5148\u5230\u786F\u6C60\u8638\u58A8\uFF0C\u518D\u79FB\u5230\u7D19\u4E0A\u3002</span>':'Tap Write again to watch once more, or try a slower speed.<span class="zh">\u6309\u300C\u518D\u5BEB\u4E00\u6B21\u300D\u91CD\u770B\uFF0C\u6216\u63DB\u6162\u4E00\u9EDE\u7684\u901F\u5EA6\u3002</span>';mt.phT&&mt.phT.innerHTML!==Wt&&(mt.phT.innerHTML=Wt),mt.press&&(mt.press.textContent=We&&$.seq>=C.touch&&$.seq<ce()?`${Math.round(We.p*100)}%`:"\u2014")}}function Wr(P){if(ii=0,!wn)return;let st=Math.min(.05,(P-(Qi||P))/1e3);Qi=P,We=Ye(st)||We,l.enabled&&l.update(),Hr(),P-Gs>120&&(Gs=P,Ii()),r.render(a,o),ii=requestAnimationFrame(Wr)}let Hs=null;function Ws(){let P=n.clientWidth,st=n.clientHeight;if(!P||!st)return;r.setSize(P,st,!1),o.aspect=P/st,o.fov=o.aspect<1.1?42:34,o.updateProjectionMatrix(),Fe=P<560,i.classList.toggle("cg-narrow",Fe);let ct=o.aspect<.9?0:o.aspect<1.25?1:2;ct!==Hs&&(Hs=ct,lt(!0))}new ResizeObserver(Ws).observe(n);let wn=!1,ii=0,Qi=0;new IntersectionObserver(P=>{wn=P[0].isIntersecting,wn&&!ii&&(Qi=0,ii=requestAnimationFrame(Wr))},{rootMargin:"120px"}).observe(i),k.group.position.copy(tt),k.group.quaternion.copy(Tt),B.position.copy(ni),Bt("goat"),O(1),vt("side"),nt("desk",!0),Ws(),Ye(.01),Ii(),i.classList.add("al-ready","al-fresh");let Li={brush:()=>{nt("brush"),Ht("press")},ink:()=>nt("ink"),paper:()=>nt("paper"),stone:()=>nt("stone"),write:()=>nt("write"),desk:()=>nt("desk")};return i.__lab={camera:o,controls:l,state:$,scene:a,brush:k,paper:x,writer:at,setMode:nt,setHair:Bt,act:Ht,setSpeed:O,setCam:vt,setPlaying:gt,drop:bt,addWater:Mt,demo:P=>Li[P]&&Li[P](),seek:P=>{$.seq=P,fe()},goCam:()=>{lt(!0)},run:P=>{for(let st=0;st<P;st+=.02)We=Ye(.02)||We},render:()=>{We=Ye(0)||We,l.enabled&&l.update(),Hr(),Ii(),r.render(a,o)},SEQ:C,writeEnd:ce},{ready:()=>!0,demo:P=>Li[P]&&Li[P]()}}var X_={xuan:"#f6f0e1",shu:"#f1ead6",news:"#e8e4d8",copy:"#fbfbf7"};function q_(i){if(!i)return;let t=[...i.querySelectorAll("[data-paper]")].map(d=>({el:d,key:d.getAttribute("data-paper"),cv:d.querySelector("canvas"),out:d.querySelector(".cg-drop-x")})),e="mid",n=-1,s=0,r=0;function a(d,h,f){if(Ci(d,h,h,{color:X_[f],seed:f.length*7,fiber:f==="copy"?.05:f==="news"?.25:.6}),f==="news"){let g=Ki(17);d.fillStyle="rgba(60,60,60,.22)";for(let x=h*.06;x<h;x+=h*.055)for(let m=h*.05;m<h*.95;){let p=h*(.03+g()*.08);d.fillRect(m,x,Math.min(p,h*.95-m),h*.018),m+=p+h*.015}}if(f==="shu"){let g=d.createLinearGradient(0,0,h,h);g.addColorStop(0,"rgba(255,255,255,.25)"),g.addColorStop(.5,"rgba(255,255,255,0)"),g.addColorStop(1,"rgba(255,255,255,.18)"),d.fillStyle=g,d.fillRect(0,0,h,h)}}function o(){for(let d of t){let h=d.cv.clientWidth||160,f=Math.min(window.devicePixelRatio||1,2),g=Math.round(h*f);(d.cv.width!==g||d.cv.height!==g)&&(d.cv.width=g,d.cv.height=g);let x=d.cv.getContext("2d");a(x,g,d.key);let m=g*.085;if(n<0&&n>-1){let S=1+n/.45;x.fillStyle=`rgba(0,0,0,${.12+.2*S})`,x.beginPath(),x.ellipse(g/2,g/2,m*(1.6-.6*S),m*(.9-.3*S),0,0,Math.PI*2),x.fill(),x.fillStyle="#121115",x.beginPath(),x.arc(g/2,g/2-g*.35*(1-S),m*.75,0,Math.PI*2),x.fill()}else n>=0&&Bc(x,g/2,g/2,m,$i(d.key,e,n),d.key.length*3);let p=$i(d.key,e,Math.max(0,n));d.out.textContent=n>=0?`${p.r.toFixed(1)}\xD7`:"\u2014"}}function l(d){s=0;let h=Math.min(.05,(d-(r||d))/1e3);r=d,n+=h,o(),n<8&&(s=requestAnimationFrame(l))}function c(){n=-.45,r=0,s||(s=requestAnimationFrame(l))}i.querySelectorAll("[data-ink]").forEach(d=>d.addEventListener("click",()=>{e=d.getAttribute("data-ink"),i.querySelectorAll("[data-ink]").forEach(h=>h.setAttribute("aria-pressed",h===d?"true":"false")),c()})),i.querySelectorAll("[data-drop]").forEach(d=>d.addEventListener("click",c)),new ResizeObserver(()=>o()).observe(i);let u=new IntersectionObserver(d=>{d[0].isIntersecting&&(u.disconnect(),c())},{threshold:.35});u.observe(i),o(),i.__drops={go:c,setT:d=>{n=d,o()},setInk:d=>{e=d,o()}}}function od(){q_(document.querySelector("[data-cal-drops]"));let i=document.querySelector("[data-cal-pad]");i&&ad(i,kc)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",od):od();rd("[data-calfour-lab]",W_,{demo:(i,t)=>i.demo(t)});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
