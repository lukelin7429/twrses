(()=>{var Qn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Yn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ec=0,Ro=1,xc=2;var Is=1,Cc=2,Xi=3,qn=0,Oe=1,Ze=2,Mn=0,Qi=1,Po=2,Lo=3,Go=4,Mc=5;var di=100,Bc=101,yc=102,vc=103,Ac=104,Sc=200,bc=201,Dc=202,Ic=203,No=204,Oo=205,Tc=206,Fc=207,wc=208,Rc=209,Pc=210,Lc=211,Gc=212,Nc=213,Oc=214,xr=0,Cr=1,Mr=2,Pi=3,Br=4,yr=5,vr=6,Ar=7,ta=0,Uc=1,Hc=2,dn=0,Uo=1,Ho=2,Vo=3,ko=4,zo=5,Ko=6,Jo=7;var Wo=300,Zn=301,fi=302,ea=303,na=304,Ts=306,Sr=1e3,xn=1001,br=1002,ve=1003,Vc=1004;var Fs=1005;var Ae=1006,ia=1007;var jn=1008;var ze=1009,Xo=1010,Qo=1011,Yi=1012,sa=1013,fn=1014,pn=1015,mn=1016,ra=1017,aa=1018,qi=1020,Yo=35902,qo=35899,Zo=1021,jo=1022,en=1023,Cn=1026,$n=1027,$o=1028,oa=1029,ti=1030,la=1031;var ca=1033,ws=33776,Rs=33777,Ps=33778,Ls=33779,ha=35840,ua=35841,da=35842,fa=35843,pa=36196,ma=37492,ga=37496,_a=37488,Ea=37489,Gs=37490,xa=37491,Ca=37808,Ma=37809,Ba=37810,ya=37811,va=37812,Aa=37813,Sa=37814,ba=37815,Da=37816,Ia=37817,Ta=37818,Fa=37819,wa=37820,Ra=37821,Pa=36492,La=36494,Ga=36495,Na=36283,Oa=36284,Ns=36285,Ua=36286;var hs=2300,Dr=2301,_r=2302,Ao=2303,So=2400,bo=2401,Do=2402;var kc=3200;var Ha=0,zc=1,wn="",Ie="srgb",us="srgb-linear",ds="linear",ee="srgb";var Er=7680;var Kc=519,Jc=512,Wc=513,Xc=514,Va=515,Qc=516,Yc=517,ka=518,qc=519,Zc=35044;var tl="300 es",ln=2e3,Li=2001;function du(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function fu(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function fs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function jc(){let i=fs("canvas");return i.style.display="block",i}var Kl={},Gi=null;function el(...i){let t="THREE."+i.shift();Gi?Gi("log",t,...i):console.log(t,...i)}function $c(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Rt(...i){i=$c(i);let t="THREE."+i.shift();if(Gi)Gi("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Lt(...i){i=$c(i);let t="THREE."+i.shift();if(Gi)Gi("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function ci(...i){let t=i.join(" ");t in Kl||(Kl[t]=!0,Rt(...i))}function th(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var eh={[xr]:Cr,[Mr]:vr,[Br]:Ar,[Pi]:yr,[Cr]:xr,[vr]:Mr,[Ar]:Br,[yr]:Pi},hn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Jl=1234567,ls=Math.PI/180,Ni=180/Math.PI;function Zi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(be[i&255]+be[i>>8&255]+be[i>>16&255]+be[i>>24&255]+"-"+be[t&255]+be[t>>8&255]+"-"+be[t>>16&15|64]+be[t>>24&255]+"-"+be[e&63|128]+be[e>>8&255]+"-"+be[e>>16&255]+be[e>>24&255]+be[n&255]+be[n>>8&255]+be[n>>16&255]+be[n>>24&255]).toLowerCase()}function Wt(i,t,e){return Math.max(t,Math.min(e,i))}function nl(i,t){return(i%t+t)%t}function pu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function mu(i,t,e){return i!==t?(e-i)/(t-i):0}function cs(i,t,e){return(1-e)*i+e*t}function gu(i,t,e,n){return cs(i,t,1-Math.exp(-e*n))}function _u(i,t=1){return t-Math.abs(nl(i,t*2)-t)}function Eu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function xu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Cu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Mu(i,t){return i+Math.random()*(t-i)}function Bu(i){return i*(.5-Math.random())}function yu(i){i!==void 0&&(Jl=i);let t=Jl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function vu(i){return i*ls}function Au(i){return i*Ni}function Su(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function bu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Du(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Iu(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),p=r((t-n)/2),u=a((t-n)/2),f=r((n-t)/2),_=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*p,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*p,o*c);break;case"ZXZ":i.set(l*p,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*_,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*_,o*c);break;case"ZYZ":i.set(l*_,l*f,o*h,o*c);break;default:Rt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function wi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Le(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var ei={DEG2RAD:ls,RAD2DEG:Ni,generateUUID:Zi,clamp:Wt,euclideanModulo:nl,mapLinear:pu,inverseLerp:mu,lerp:cs,damp:gu,pingpong:_u,smoothstep:Eu,smootherstep:xu,randInt:Cu,randFloat:Mu,randFloatSpread:Bu,seededRandom:yu,degToRad:vu,radToDeg:Au,isPowerOfTwo:Su,ceilPowerOfTwo:bu,floorPowerOfTwo:Du,setQuaternionFromProperEuler:Iu,normalize:Le,denormalize:wi},ol=class ol{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Wt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ol.prototype.isVector2=!0;var Gt=ol,Qe=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],p=n[s+3],u=r[a+0],f=r[a+1],_=r[a+2],C=r[a+3];if(p!==C||l!==u||c!==f||h!==_){let m=l*u+c*f+h*_+p*C;m<0&&(u=-u,f=-f,_=-_,C=-C,m=-m);let d=1-o;if(m<.9995){let B=Math.acos(m),w=Math.sin(B);d=Math.sin(d*B)/w,o=Math.sin(o*B)/w,l=l*d+u*o,c=c*d+f*o,h=h*d+_*o,p=p*d+C*o}else{l=l*d+u*o,c=c*d+f*o,h=h*d+_*o,p=p*d+C*o;let B=1/Math.sqrt(l*l+c*c+h*h+p*p);l*=B,c*=B,h*=B,p*=B}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],p=r[a],u=r[a+1],f=r[a+2],_=r[a+3];return t[e]=o*_+h*p+l*f-c*u,t[e+1]=l*_+h*u+c*p-o*f,t[e+2]=c*_+h*f+o*u-l*p,t[e+3]=h*_-o*p-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),p=o(r/2),u=l(n/2),f=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=u*h*p+c*f*_,this._y=c*f*p-u*h*_,this._z=c*h*_+u*f*p,this._w=c*h*p-u*f*_;break;case"YXZ":this._x=u*h*p+c*f*_,this._y=c*f*p-u*h*_,this._z=c*h*_-u*f*p,this._w=c*h*p+u*f*_;break;case"ZXY":this._x=u*h*p-c*f*_,this._y=c*f*p+u*h*_,this._z=c*h*_+u*f*p,this._w=c*h*p-u*f*_;break;case"ZYX":this._x=u*h*p-c*f*_,this._y=c*f*p+u*h*_,this._z=c*h*_-u*f*p,this._w=c*h*p+u*f*_;break;case"YZX":this._x=u*h*p+c*f*_,this._y=c*f*p+u*h*_,this._z=c*h*_-u*f*p,this._w=c*h*p-u*f*_;break;case"XZY":this._x=u*h*p-c*f*_,this._y=c*f*p-u*h*_,this._z=c*h*_+u*f*p,this._w=c*h*p+u*f*_;break;default:Rt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],p=e[10],u=n+o+p;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>p){let f=2*Math.sqrt(1+n-o-p);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>p){let f=2*Math.sqrt(1+o-n-p);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+p-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Wt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},ll=class ll{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Wl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Wl.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),p=2*(r*n-a*e);return this.x=e+l*c+a*p-o*h,this.y=n+l*h+o*c-r*p,this.z=s+l*p+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return no.copy(this).projectOnVector(t),this.sub(no)}reflect(t){return this.sub(no.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Wt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ll.prototype.isVector3=!0;var N=ll,no=new N,Wl=new Qe,cl=class cl{constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],p=n[7],u=n[2],f=n[5],_=n[8],C=s[0],m=s[3],d=s[6],B=s[1],w=s[4],M=s[7],v=s[2],S=s[5],F=s[8];return r[0]=a*C+o*B+l*v,r[3]=a*m+o*w+l*S,r[6]=a*d+o*M+l*F,r[1]=c*C+h*B+p*v,r[4]=c*m+h*w+p*S,r[7]=c*d+h*M+p*F,r[2]=u*C+f*B+_*v,r[5]=u*m+f*w+_*S,r[8]=u*d+f*M+_*F,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],p=h*a-o*c,u=o*l-h*r,f=c*r-a*l,_=e*p+n*u+s*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let C=1/_;return t[0]=p*C,t[1]=(s*c-h*n)*C,t[2]=(o*n-s*a)*C,t[3]=u*C,t[4]=(h*e-s*l)*C,t[5]=(s*r-o*e)*C,t[6]=f*C,t[7]=(n*l-c*e)*C,t[8]=(a*e-n*r)*C,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return ci("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(io.makeScale(t,e)),this}rotate(t){return ci("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(io.makeRotation(-t)),this}translate(t,e){return ci("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(io.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};cl.prototype.isMatrix3=!0;var Ut=cl,io=new Ut,Xl=new Ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ql=new Ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Tu(){let i={enabled:!0,workingColorSpace:us,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ee&&(s.r=In(s.r),s.g=In(s.g),s.b=In(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ee&&(s.r=Ri(s.r),s.g=Ri(s.g),s.b=Ri(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===wn?ds:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ci("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ci("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[us]:{primaries:t,whitePoint:n,transfer:ds,toXYZ:Xl,fromXYZ:Ql,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:t,whitePoint:n,transfer:ee,toXYZ:Xl,fromXYZ:Ql,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}}),i}var qt=Tu();function In(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ri(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var xi,Ir=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{xi===void 0&&(xi=fs("canvas")),xi.width=t.width,xi.height=t.height;let s=xi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=xi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=fs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=In(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(In(e[n]/255)*255):e[n]=In(e[n]);return{data:e,width:t.width,height:t.height}}else return Rt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Fu=0,Oi=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Fu++}),this.uuid=Zi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(so(s[a].image)):r.push(so(s[a]))}else r=so(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function so(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?Ir.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Rt("Texture: Unable to serialize Texture."),{})}var wu=0,ro=new N,Ge=class i extends hn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=xn,s=xn,r=Ae,a=jn,o=en,l=ze,c=i.DEFAULT_ANISOTROPY,h=wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wu++}),this.uuid=Zi(),this.name="",this.source=new Oi(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Gt(0,0),this.repeat=new Gt(1,1),this.center=new Gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ro).x}get height(){return this.source.getSize(ro).y}get depth(){return this.source.getSize(ro).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Rt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Rt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Wo)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Sr:t.x=t.x-Math.floor(t.x);break;case xn:t.x=t.x<0?0:1;break;case br:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Sr:t.y=t.y-Math.floor(t.y);break;case xn:t.y=t.y<0?0:1;break;case br:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=Wo;Ge.DEFAULT_ANISOTROPY=1;var hl=class hl{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],p=l[8],u=l[1],f=l[5],_=l[9],C=l[2],m=l[6],d=l[10];if(Math.abs(h-u)<.01&&Math.abs(p-C)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(p+C)<.1&&Math.abs(_+m)<.1&&Math.abs(c+f+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let w=(c+1)/2,M=(f+1)/2,v=(d+1)/2,S=(h+u)/4,F=(p+C)/4,E=(_+m)/4;return w>M&&w>v?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=S/n,r=F/n):M>v?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=S/s,r=E/s):v<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(v),n=F/r,s=E/r),this.set(n,s,r,e),this}let B=Math.sqrt((m-_)*(m-_)+(p-C)*(p-C)+(u-h)*(u-h));return Math.abs(B)<.001&&(B=1),this.x=(m-_)/B,this.y=(p-C)/B,this.z=(u-h)/B,this.w=Math.acos((c+f+d-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this.w=Wt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this.w=Wt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};hl.prototype.isVector4=!0;var fe=hl,Tr=class extends hn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ae,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new Ge(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ae,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Oi(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ke=class extends Tr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},ps=class extends Ge{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ve,this.minFilter=ve,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Fr=class extends Ge{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ve,this.minFilter=ve,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var $r=class $r{constructor(t,e,n,s,r,a,o,l,c,h,p,u,f,_,C,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,p,u,f,_,C,m)}set(t,e,n,s,r,a,o,l,c,h,p,u,f,_,C,m){let d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=p,d[14]=u,d[3]=f,d[7]=_,d[11]=C,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $r().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Ci.setFromMatrixColumn(t,0).length(),r=1/Ci.setFromMatrixColumn(t,1).length(),a=1/Ci.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),p=Math.sin(r);if(t.order==="XYZ"){let u=a*h,f=a*p,_=o*h,C=o*p;e[0]=l*h,e[4]=-l*p,e[8]=c,e[1]=f+_*c,e[5]=u-C*c,e[9]=-o*l,e[2]=C-u*c,e[6]=_+f*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,f=l*p,_=c*h,C=c*p;e[0]=u+C*o,e[4]=_*o-f,e[8]=a*c,e[1]=a*p,e[5]=a*h,e[9]=-o,e[2]=f*o-_,e[6]=C+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,f=l*p,_=c*h,C=c*p;e[0]=u-C*o,e[4]=-a*p,e[8]=_+f*o,e[1]=f+_*o,e[5]=a*h,e[9]=C-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,f=a*p,_=o*h,C=o*p;e[0]=l*h,e[4]=_*c-f,e[8]=u*c+C,e[1]=l*p,e[5]=C*c+u,e[9]=f*c-_,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,f=a*c,_=o*l,C=o*c;e[0]=l*h,e[4]=C-u*p,e[8]=_*p+f,e[1]=p,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*p+_,e[10]=u-C*p}else if(t.order==="XZY"){let u=a*l,f=a*c,_=o*l,C=o*c;e[0]=l*h,e[4]=-p,e[8]=c*h,e[1]=u*p+C,e[5]=a*h,e[9]=f*p-_,e[2]=_*p-f,e[6]=o*h,e[10]=C*p+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ru,t,Pu)}lookAt(t,e,n){let s=this.elements;return Je.subVectors(t,e),Je.lengthSq()===0&&(Je.z=1),Je.normalize(),Gn.crossVectors(n,Je),Gn.lengthSq()===0&&(Math.abs(n.z)===1?Je.x+=1e-4:Je.z+=1e-4,Je.normalize(),Gn.crossVectors(n,Je)),Gn.normalize(),qs.crossVectors(Je,Gn),s[0]=Gn.x,s[4]=qs.x,s[8]=Je.x,s[1]=Gn.y,s[5]=qs.y,s[9]=Je.y,s[2]=Gn.z,s[6]=qs.z,s[10]=Je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],p=n[5],u=n[9],f=n[13],_=n[2],C=n[6],m=n[10],d=n[14],B=n[3],w=n[7],M=n[11],v=n[15],S=s[0],F=s[4],E=s[8],D=s[12],P=s[1],G=s[5],O=s[9],A=s[13],y=s[2],I=s[6],H=s[10],V=s[14],j=s[3],K=s[7],Q=s[11],it=s[15];return r[0]=a*S+o*P+l*y+c*j,r[4]=a*F+o*G+l*I+c*K,r[8]=a*E+o*O+l*H+c*Q,r[12]=a*D+o*A+l*V+c*it,r[1]=h*S+p*P+u*y+f*j,r[5]=h*F+p*G+u*I+f*K,r[9]=h*E+p*O+u*H+f*Q,r[13]=h*D+p*A+u*V+f*it,r[2]=_*S+C*P+m*y+d*j,r[6]=_*F+C*G+m*I+d*K,r[10]=_*E+C*O+m*H+d*Q,r[14]=_*D+C*A+m*V+d*it,r[3]=B*S+w*P+M*y+v*j,r[7]=B*F+w*G+M*I+v*K,r[11]=B*E+w*O+M*H+v*Q,r[15]=B*D+w*A+M*V+v*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],p=t[6],u=t[10],f=t[14],_=t[3],C=t[7],m=t[11],d=t[15],B=l*f-c*u,w=o*f-c*p,M=o*u-l*p,v=a*f-c*h,S=a*u-l*h,F=a*p-o*h;return e*(C*B-m*w+d*M)-n*(_*B-m*v+d*S)+s*(_*w-C*v+d*F)-r*(_*M-C*S+m*F)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],p=t[9],u=t[10],f=t[11],_=t[12],C=t[13],m=t[14],d=t[15],B=e*o-n*a,w=e*l-s*a,M=e*c-r*a,v=n*l-s*o,S=n*c-r*o,F=s*c-r*l,E=h*C-p*_,D=h*m-u*_,P=h*d-f*_,G=p*m-u*C,O=p*d-f*C,A=u*d-f*m,y=B*A-w*O+M*G+v*P-S*D+F*E;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/y;return t[0]=(o*A-l*O+c*G)*I,t[1]=(s*O-n*A-r*G)*I,t[2]=(C*F-m*S+d*v)*I,t[3]=(u*S-p*F-f*v)*I,t[4]=(l*P-a*A-c*D)*I,t[5]=(e*A-s*P+r*D)*I,t[6]=(m*M-_*F-d*w)*I,t[7]=(h*F-u*M+f*w)*I,t[8]=(a*O-o*P+c*E)*I,t[9]=(n*P-e*O-r*E)*I,t[10]=(_*S-C*M+d*B)*I,t[11]=(p*M-h*S-f*B)*I,t[12]=(o*D-a*G-l*E)*I,t[13]=(e*G-n*D+s*E)*I,t[14]=(C*w-_*v-m*B)*I,t[15]=(h*v-p*w+u*B)*I,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,p=o+o,u=r*c,f=r*h,_=r*p,C=a*h,m=a*p,d=o*p,B=l*c,w=l*h,M=l*p,v=n.x,S=n.y,F=n.z;return s[0]=(1-(C+d))*v,s[1]=(f+M)*v,s[2]=(_-w)*v,s[3]=0,s[4]=(f-M)*S,s[5]=(1-(u+d))*S,s[6]=(m+B)*S,s[7]=0,s[8]=(_+w)*F,s[9]=(m-B)*F,s[10]=(1-(u+C))*F,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Ci.set(s[0],s[1],s[2]).length(),o=Ci.set(s[4],s[5],s[6]).length(),l=Ci.set(s[8],s[9],s[10]).length();r<0&&(a=-a),rn.copy(this);let c=1/a,h=1/o,p=1/l;return rn.elements[0]*=c,rn.elements[1]*=c,rn.elements[2]*=c,rn.elements[4]*=h,rn.elements[5]*=h,rn.elements[6]*=h,rn.elements[8]*=p,rn.elements[9]*=p,rn.elements[10]*=p,e.setFromRotationMatrix(rn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=ln,l=!1){let c=this.elements,h=2*r/(e-t),p=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s),_,C;if(l)_=r/(a-r),C=a*r/(a-r);else if(o===ln)_=-(a+r)/(a-r),C=-2*a*r/(a-r);else if(o===Li)_=-a/(a-r),C=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=p,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=C,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=ln,l=!1){let c=this.elements,h=2/(e-t),p=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s),_,C;if(l)_=1/(a-r),C=a/(a-r);else if(o===ln)_=-2/(a-r),C=-(a+r)/(a-r);else if(o===Li)_=-1/(a-r),C=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=p,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=_,c[14]=C,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};$r.prototype.isMatrix4=!0;var de=$r,Ci=new N,rn=new de,Ru=new N(0,0,0),Pu=new N(1,1,1),Gn=new N,qs=new N,Je=new N,Yl=new de,ql=new Qe,Tn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],p=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Wt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Wt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Rt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Yl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Yl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ql.setFromEuler(this),this.setFromQuaternion(ql,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Tn.DEFAULT_ORDER="XYZ";var Ui=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Lu=0,Zl=new N,Mi=new Qe,vn=new de,Zs=new N,is=new N,Gu=new N,Nu=new Qe,jl=new N(1,0,0),$l=new N(0,1,0),tc=new N(0,0,1),ec={type:"added"},Ou={type:"removed"},Bi={type:"childadded",child:null},ao={type:"childremoved",child:null},Fe=class i extends hn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Lu++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new N,e=new Tn,n=new Qe,s=new N(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new de},normalMatrix:{value:new Ut}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ui,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.premultiply(Mi),this}rotateX(t){return this.rotateOnAxis(jl,t)}rotateY(t){return this.rotateOnAxis($l,t)}rotateZ(t){return this.rotateOnAxis(tc,t)}translateOnAxis(t,e){return Zl.copy(t).applyQuaternion(this.quaternion),this.position.add(Zl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(jl,t)}translateY(t){return this.translateOnAxis($l,t)}translateZ(t){return this.translateOnAxis(tc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Zs.copy(t):Zs.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(is,Zs,this.up):vn.lookAt(Zs,is,this.up),this.quaternion.setFromRotationMatrix(vn),s&&(vn.extractRotation(s.matrixWorld),Mi.setFromRotationMatrix(vn),this.quaternion.premultiply(Mi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Lt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ec),Bi.child=t,this.dispatchEvent(Bi),Bi.child=null):Lt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ou),ao.child=t,this.dispatchEvent(ao),ao.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),vn.multiply(t.parent.matrixWorld)),t.applyMatrix4(vn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ec),Bi.child=t,this.dispatchEvent(Bi),Bi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,t,Gu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,Nu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let p=l[c];r(t.shapes,p)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),p=a(t.shapes),u=a(t.skeletons),f=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Fe.DEFAULT_UP=new N(0,1,0);Fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var cn=class extends Fe{constructor(){super(),this.isGroup=!0,this.type="Group"}},Uu={type:"move"},Hi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new cn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new cn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new cn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let C of t.hand.values()){let m=e.getJointPose(C,n),d=this._getHandJoint(c,C);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let h=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],u=h.position.distanceTo(p.position),f=.02,_=.005;c.inputState.pinching&&u>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Uu)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new cn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},nh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},js={h:0,s:0,l:0};function oo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Yt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=qt.workingColorSpace){if(t=nl(t,1),e=Wt(e,0,1),n=Wt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=oo(a,r,t+1/3),this.g=oo(a,r,t),this.b=oo(a,r,t-1/3)}return qt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ie){function n(r){r!==void 0&&parseFloat(r)<1&&Rt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Rt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Rt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){let n=nh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Rt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=In(t.r),this.g=In(t.g),this.b=In(t.b),this}copyLinearToSRGB(t){return this.r=Ri(t.r),this.g=Ri(t.g),this.b=Ri(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return qt.workingToColorSpace(De.copy(this),t),Math.round(Wt(De.r*255,0,255))*65536+Math.round(Wt(De.g*255,0,255))*256+Math.round(Wt(De.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.workingToColorSpace(De.copy(this),e);let n=De.r,s=De.g,r=De.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let p=a-o;switch(c=h<=.5?p/(a+o):p/(2-a-o),a){case n:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-n)/p+2;break;case r:l=(n-s)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=qt.workingColorSpace){return qt.workingToColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=Ie){qt.workingToColorSpace(De.copy(this),t);let e=De.r,n=De.g,s=De.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Nn),this.setHSL(Nn.h+t,Nn.s+e,Nn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Nn),t.getHSL(js);let n=cs(Nn.h,js.h,e),s=cs(Nn.s,js.s,e),r=cs(Nn.l,js.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},De=new Yt;Yt.NAMES=nh;var ms=class extends Fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},an=new N,An=new N,lo=new N,Sn=new N,yi=new N,vi=new N,nc=new N,co=new N,ho=new N,uo=new N,fo=new fe,po=new fe,mo=new fe,Vn=class i{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),an.subVectors(t,e),s.cross(an);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){an.subVectors(s,e),An.subVectors(n,e),lo.subVectors(t,e);let a=an.dot(an),o=an.dot(An),l=an.dot(lo),c=An.dot(An),h=An.dot(lo),p=a*c-o*o;if(p===0)return r.set(0,0,0),null;let u=1/p,f=(c*l-o*h)*u,_=(a*h-o*l)*u;return r.set(1-f-_,_,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Sn)===null?!1:Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Sn.x),l.addScaledVector(a,Sn.y),l.addScaledVector(o,Sn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return fo.setScalar(0),po.setScalar(0),mo.setScalar(0),fo.fromBufferAttribute(t,e),po.fromBufferAttribute(t,n),mo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(fo,r.x),a.addScaledVector(po,r.y),a.addScaledVector(mo,r.z),a}static isFrontFacing(t,e,n,s){return an.subVectors(n,e),An.subVectors(t,e),an.cross(An).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return an.subVectors(this.c,this.b),An.subVectors(this.a,this.b),an.cross(An).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;yi.subVectors(s,n),vi.subVectors(r,n),co.subVectors(t,n);let l=yi.dot(co),c=vi.dot(co);if(l<=0&&c<=0)return e.copy(n);ho.subVectors(t,s);let h=yi.dot(ho),p=vi.dot(ho);if(h>=0&&p<=h)return e.copy(s);let u=l*p-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(yi,a);uo.subVectors(t,r);let f=yi.dot(uo),_=vi.dot(uo);if(_>=0&&f<=_)return e.copy(r);let C=f*c-l*_;if(C<=0&&c>=0&&_<=0)return o=c/(c-_),e.copy(n).addScaledVector(vi,o);let m=h*_-f*p;if(m<=0&&p-h>=0&&f-_>=0)return nc.subVectors(r,s),o=(p-h)/(p-h+(f-_)),e.copy(s).addScaledVector(nc,o);let d=1/(m+C+u);return a=C*d,o=u*d,e.copy(n).addScaledVector(yi,a).addScaledVector(vi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},kn=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(on.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(on.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=on.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,on):on.fromBufferAttribute(r,a),on.applyMatrix4(t.matrixWorld),this.expandByPoint(on);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),$s.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$s.copy(n.boundingBox)),$s.applyMatrix4(t.matrixWorld),this.union($s)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,on),on.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ss),tr.subVectors(this.max,ss),Ai.subVectors(t.a,ss),Si.subVectors(t.b,ss),bi.subVectors(t.c,ss),On.subVectors(Si,Ai),Un.subVectors(bi,Si),ri.subVectors(Ai,bi);let e=[0,-On.z,On.y,0,-Un.z,Un.y,0,-ri.z,ri.y,On.z,0,-On.x,Un.z,0,-Un.x,ri.z,0,-ri.x,-On.y,On.x,0,-Un.y,Un.x,0,-ri.y,ri.x,0];return!go(e,Ai,Si,bi,tr)||(e=[1,0,0,0,1,0,0,0,1],!go(e,Ai,Si,bi,tr))?!1:(er.crossVectors(On,Un),e=[er.x,er.y,er.z],go(e,Ai,Si,bi,tr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,on).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(on).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},bn=[new N,new N,new N,new N,new N,new N,new N,new N],on=new N,$s=new kn,Ai=new N,Si=new N,bi=new N,On=new N,Un=new N,ri=new N,ss=new N,tr=new N,er=new N,ai=new N;function go(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ai.fromArray(i,r);let o=s.x*Math.abs(ai.x)+s.y*Math.abs(ai.y)+s.z*Math.abs(ai.z),l=t.dot(ai),c=e.dot(ai),h=n.dot(ai);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Ee=new N,nr=new Gt,Hu=0,ye=class extends hn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Hu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Zc,this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)nr.fromBufferAttribute(this,e),nr.applyMatrix3(t),this.setXY(e,nr.x,nr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=wi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Le(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=wi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=wi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=wi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=wi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Le(e,this.array),n=Le(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Le(e,this.array),n=Le(n,this.array),s=Le(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Le(e,this.array),n=Le(n,this.array),s=Le(s,this.array),r=Le(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var gs=class extends ye{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var _s=class extends ye{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Ve=class extends ye{constructor(t,e,n){super(new Float32Array(t),e,n)}},Vu=new kn,rs=new N,_o=new N,un=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Vu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;rs.subVectors(t,this.center);let e=rs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(rs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(_o.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(rs.copy(t.center).add(_o)),this.expandByPoint(rs.copy(t.center).sub(_o))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},ku=0,tn=new de,Eo=new Fe,Di=new N,We=new kn,as=new kn,Be=new N,we=class i extends hn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(du(t)?_s:gs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ut().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return tn.makeRotationFromQuaternion(t),this.applyMatrix4(tn),this}rotateX(t){return tn.makeRotationX(t),this.applyMatrix4(tn),this}rotateY(t){return tn.makeRotationY(t),this.applyMatrix4(tn),this}rotateZ(t){return tn.makeRotationZ(t),this.applyMatrix4(tn),this}translate(t,e,n){return tn.makeTranslation(t,e,n),this.applyMatrix4(tn),this}scale(t,e,n){return tn.makeScale(t,e,n),this.applyMatrix4(tn),this}lookAt(t){return Eo.lookAt(t),Eo.updateMatrix(),this.applyMatrix4(Eo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Di).negate(),this.translate(Di.x,Di.y,Di.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ve(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Rt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];We.setFromBufferAttribute(r),this.morphTargetsRelative?(Be.addVectors(this.boundingBox.min,We.min),this.boundingBox.expandByPoint(Be),Be.addVectors(this.boundingBox.max,We.max),this.boundingBox.expandByPoint(Be)):(this.boundingBox.expandByPoint(We.min),this.boundingBox.expandByPoint(We.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new un);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let n=this.boundingSphere.center;if(We.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];as.setFromBufferAttribute(o),this.morphTargetsRelative?(Be.addVectors(We.min,as.min),We.expandByPoint(Be),Be.addVectors(We.max,as.max),We.expandByPoint(Be)):(We.expandByPoint(as.min),We.expandByPoint(as.max))}We.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Be.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Be));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Be.fromBufferAttribute(o,c),l&&(Di.fromBufferAttribute(t,c),Be.add(Di)),s=Math.max(s,n.distanceToSquared(Be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new ye(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let E=0;E<n.count;E++)o[E]=new N,l[E]=new N;let c=new N,h=new N,p=new N,u=new Gt,f=new Gt,_=new Gt,C=new N,m=new N;function d(E,D,P){c.fromBufferAttribute(n,E),h.fromBufferAttribute(n,D),p.fromBufferAttribute(n,P),u.fromBufferAttribute(r,E),f.fromBufferAttribute(r,D),_.fromBufferAttribute(r,P),h.sub(c),p.sub(c),f.sub(u),_.sub(u);let G=1/(f.x*_.y-_.x*f.y);isFinite(G)&&(C.copy(h).multiplyScalar(_.y).addScaledVector(p,-f.y).multiplyScalar(G),m.copy(p).multiplyScalar(f.x).addScaledVector(h,-_.x).multiplyScalar(G),o[E].add(C),o[D].add(C),o[P].add(C),l[E].add(m),l[D].add(m),l[P].add(m))}let B=this.groups;B.length===0&&(B=[{start:0,count:t.count}]);for(let E=0,D=B.length;E<D;++E){let P=B[E],G=P.start,O=P.count;for(let A=G,y=G+O;A<y;A+=3)d(t.getX(A+0),t.getX(A+1),t.getX(A+2))}let w=new N,M=new N,v=new N,S=new N;function F(E){v.fromBufferAttribute(s,E),S.copy(v);let D=o[E];w.copy(D),w.sub(v.multiplyScalar(v.dot(D))).normalize(),M.crossVectors(S,D);let G=M.dot(l[E])<0?-1:1;a.setXYZW(E,w.x,w.y,w.z,G)}for(let E=0,D=B.length;E<D;++E){let P=B[E],G=P.start,O=P.count;for(let A=G,y=G+O;A<y;A+=3)F(t.getX(A+0)),F(t.getX(A+1)),F(t.getX(A+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new ye(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new N,r=new N,a=new N,o=new N,l=new N,c=new N,h=new N,p=new N;if(t)for(let u=0,f=t.count;u<f;u+=3){let _=t.getX(u+0),C=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,C),a.fromBufferAttribute(e,m),h.subVectors(a,r),p.subVectors(s,r),h.cross(p),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,C),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(C,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),p.subVectors(s,r),h.cross(p),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Be.fromBufferAttribute(t,e),Be.normalize(),t.setXYZ(e,Be.x,Be.y,Be.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,p=o.normalized,u=new c.constructor(l.length*h),f=0,_=0;for(let C=0,m=l.length;C<m;C++){o.isInterleavedBufferAttribute?f=l[C]*o.data.stride+o.offset:f=l[C]*h;for(let d=0;d<h;d++)u[_++]=c[f++]}return new ye(u,h,p)}if(this.index===null)return Rt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,p=c.length;h<p;h++){let u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let p=0,u=c.length;p<u;p++){let f=c[p];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],p=r[c];for(let u=0,f=p.length;u<f;u++)h.push(p[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let p=a[c];this.addGroup(p.start,p.count,p.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var xo=new N,zu=new N,Ku=new Ut,Xe=class{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=xo.subVectors(n,e).cross(zu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(xo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Ku.getNormalMatrix(t),s=this.coplanarPoint(xo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Ju=0,Fn=class extends hn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ju++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=Qi,this.side=qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=No,this.blendDst=Oo,this.blendEquation=di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Yt(0,0,0),this.blendAlpha=0,this.depthFunc=Pi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Kc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Er,this.stencilZFail=Er,this.stencilZPass=Er,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Rt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Rt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Yt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Xe().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Gt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Gt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Dn=new N,Co=new N,ir=new N,sr=new N,zn=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Dn.copy(this.origin).addScaledVector(this.direction,e),Dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Co.copy(t).add(e).multiplyScalar(.5),ir.copy(e).sub(t).normalize(),sr.copy(this.origin).sub(Co);let r=t.distanceTo(e)*.5,a=-this.direction.dot(ir),o=sr.dot(this.direction),l=-sr.dot(ir),c=sr.lengthSq(),h=Math.abs(1-a*a),p,u,f,_;if(h>0)if(p=a*l-o,u=a*o-l,_=r*h,p>=0)if(u>=-_)if(u<=_){let C=1/h;p*=C,u*=C,f=p*(p+a*u+2*o)+u*(a*p+u+2*l)+c}else u=r,p=Math.max(0,-(a*u+o)),f=-p*p+u*(u+2*l)+c;else u=-r,p=Math.max(0,-(a*u+o)),f=-p*p+u*(u+2*l)+c;else u<=-_?(p=Math.max(0,-(-a*r+o)),u=p>0?-r:Math.min(Math.max(-r,-l),r),f=-p*p+u*(u+2*l)+c):u<=_?(p=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(p=Math.max(0,-(a*r+o)),u=p>0?r:Math.min(Math.max(-r,-l),r),f=-p*p+u*(u+2*l)+c);else u=a>0?-r:r,p=Math.max(0,-(a*u+o)),f=-p*p+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Co).addScaledVector(ir,u),f}intersectSphere(t,e){if(t.radius<0)return null;Dn.subVectors(t.center,this.origin);let n=Dn.dot(this.direction),s=Dn.dot(Dn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),p>=0?(o=(t.min.z-u.z)*p,l=(t.max.z-u.z)*p):(o=(t.max.z-u.z)*p,l=(t.min.z-u.z)*p),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Dn)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,p=t.x-a.x,u=t.y-a.y,f=t.z-a.z,_=e.x-a.x,C=e.y-a.y,m=e.z-a.z,d=n.x-a.x,B=n.y-a.y,w=n.z-a.z,M=Math.abs(l),v=Math.abs(c),S=Math.abs(h),F,E,D,P,G,O,A,y,I,H,V,j;if(M>=v&&M>=S?(D=l,O=p,I=_,j=d,l>=0?(F=c,E=h,P=u,G=f,A=C,y=m,H=B,V=w):(F=h,E=c,P=f,G=u,A=m,y=C,H=w,V=B)):v>=S?(D=c,O=u,I=C,j=B,c>=0?(F=h,E=l,P=f,G=p,A=m,y=_,H=w,V=d):(F=l,E=h,P=p,G=f,A=_,y=m,H=d,V=w)):(D=h,O=f,I=m,j=w,h>=0?(F=l,E=c,P=p,G=u,A=_,y=C,H=d,V=B):(F=c,E=l,P=u,G=p,A=C,y=_,H=B,V=d)),D===0)return null;let K=F/D,Q=E/D,it=1/D,vt=P-K*O,xt=G-Q*O,Kt=A-K*I,Ot=y-Q*I,Vt=H-K*j,X=V-Q*j,$=Vt*Ot-X*Kt,Et=vt*X-xt*Vt,Y=Kt*xt-Ot*vt;if(s){if($<0||Et<0||Y<0)return null}else if(($<0||Et<0||Y<0)&&($>0||Et>0||Y>0))return null;let tt=$+Et+Y;if(tt===0)return null;let at=it*($*O+Et*I+Y*j);return(tt>0?at<0:at>0)?null:this.at(at/tt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},hi=class extends Fn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=ta,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},ic=new de,oi=new zn,rr=new un,sc=new N,ar=new N,or=new N,lr=new N,Mo=new N,cr=new N,rc=new N,hr=new N,Ne=class extends Fe{constructor(t=new we,e=new hi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){cr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],p=r[l];h!==0&&(Mo.fromBufferAttribute(p,t),a?cr.addScaledVector(Mo,h):cr.addScaledVector(Mo.sub(e),h))}e.add(cr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),rr.copy(n.boundingSphere),rr.applyMatrix4(r),oi.copy(t.ray).recast(t.near),!(rr.containsPoint(oi.origin)===!1&&(oi.intersectSphere(rr,sc)===null||oi.origin.distanceToSquared(sc)>(t.far-t.near)**2))&&(ic.copy(r).invert(),oi.copy(t.ray).applyMatrix4(ic),!(n.boundingBox!==null&&oi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,oi)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,p=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,C=u.length;_<C;_++){let m=u[_],d=a[m.materialIndex],B=Math.max(m.start,f.start),w=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let M=B,v=w;M<v;M+=3){let S=o.getX(M),F=o.getX(M+1),E=o.getX(M+2);s=ur(this,d,t,n,c,h,p,S,F,E),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let _=Math.max(0,f.start),C=Math.min(o.count,f.start+f.count);for(let m=_,d=C;m<d;m+=3){let B=o.getX(m),w=o.getX(m+1),M=o.getX(m+2);s=ur(this,a,t,n,c,h,p,B,w,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,C=u.length;_<C;_++){let m=u[_],d=a[m.materialIndex],B=Math.max(m.start,f.start),w=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=B,v=w;M<v;M+=3){let S=M,F=M+1,E=M+2;s=ur(this,d,t,n,c,h,p,S,F,E),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let _=Math.max(0,f.start),C=Math.min(l.count,f.start+f.count);for(let m=_,d=C;m<d;m+=3){let B=m,w=m+1,M=m+2;s=ur(this,a,t,n,c,h,p,B,w,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Wu(i,t,e,n,s,r,a,o){let l;if(t.side===Oe?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===qn,o),l===null)return null;hr.copy(o),hr.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(hr);return c<e.near||c>e.far?null:{distance:c,point:hr.clone(),object:i}}function ur(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,ar),i.getVertexPosition(l,or),i.getVertexPosition(c,lr);let h=Wu(i,t,e,n,ar,or,lr,rc);if(h){let p=new N;Vn.getBarycoord(rc,ar,or,lr,p),s&&(h.uv=Vn.getInterpolatedAttribute(s,o,l,c,p,new Gt)),r&&(h.uv1=Vn.getInterpolatedAttribute(r,o,l,c,p,new Gt)),a&&(h.normal=Vn.getInterpolatedAttribute(a,o,l,c,p,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new N,materialIndex:0};Vn.getNormal(ar,or,lr,u.normal),h.face=u,h.barycoord=p}return h}var wr=class extends Ge{constructor(t=null,e=1,n=1,s,r,a,o,l,c=ve,h=ve,p,u){super(null,a,o,l,c,h,s,r,p,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var li=new un,Xu=new Gt(.5,.5),dr=new N,Vi=class{constructor(t=new Xe,e=new Xe,n=new Xe,s=new Xe,r=new Xe,a=new Xe){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ln,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],p=r[5],u=r[6],f=r[7],_=r[8],C=r[9],m=r[10],d=r[11],B=r[12],w=r[13],M=r[14],v=r[15];if(s[0].setComponents(c-a,f-h,d-_,v-B).normalize(),s[1].setComponents(c+a,f+h,d+_,v+B).normalize(),s[2].setComponents(c+o,f+p,d+C,v+w).normalize(),s[3].setComponents(c-o,f-p,d-C,v-w).normalize(),n)s[4].setComponents(l,u,m,M).normalize(),s[5].setComponents(c-l,f-u,d-m,v-M).normalize();else if(s[4].setComponents(c-l,f-u,d-m,v-M).normalize(),e===ln)s[5].setComponents(c+l,f+u,d+m,v+M).normalize();else if(e===Li)s[5].setComponents(l,u,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(li)}intersectsSprite(t){li.center.set(0,0,0);let e=Xu.distanceTo(t.center);return li.radius=.7071067811865476+e,li.applyMatrix4(t.matrixWorld),this.intersectsSphere(li)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(dr.x=s.normal.x>0?t.max.x:t.min.x,dr.y=s.normal.y>0?t.max.y:t.min.y,dr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(dr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ui=class extends Fn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Yt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Rr=new N,Pr=new N,ac=new de,os=new zn,fr=new un,Bo=new N,oc=new N,Lr=class extends Fe{constructor(t=new we,e=new ui){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Rr.fromBufferAttribute(e,s-1),Pr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Rr.distanceTo(Pr);t.setAttribute("lineDistance",new Ve(n,1))}else Rt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fr.copy(n.boundingSphere),fr.applyMatrix4(s),fr.radius+=r,t.ray.intersectsSphere(fr)===!1)return;ac.copy(s).invert(),os.copy(t.ray).applyMatrix4(ac);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let C=f,m=_-1;C<m;C+=c){let d=h.getX(C),B=h.getX(C+1),w=pr(this,t,os,l,d,B,C);w&&e.push(w)}if(this.isLineLoop){let C=h.getX(_-1),m=h.getX(f),d=pr(this,t,os,l,C,m,_-1);d&&e.push(d)}}else{let f=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let C=f,m=_-1;C<m;C+=c){let d=pr(this,t,os,l,C,C+1,C);d&&e.push(d)}if(this.isLineLoop){let C=pr(this,t,os,l,_-1,f,_-1);C&&e.push(C)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function pr(i,t,e,n,s,r,a){let o=i.geometry.attributes.position;if(Rr.fromBufferAttribute(o,s),Pr.fromBufferAttribute(o,r),e.distanceSqToSegment(Rr,Pr,Bo,oc)>n)return;Bo.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Bo);if(!(c<t.near||c>t.far))return{distance:c,point:oc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var lc=new N,cc=new N,ki=class extends Lr{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)lc.fromBufferAttribute(e,s),cc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+lc.distanceTo(cc);t.setAttribute("lineDistance",new Ve(n,1))}else Rt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Es=class extends Ge{constructor(t=[],e=Zn,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},zi=class extends Ge{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Kn=class extends Ge{constructor(t,e,n=fn,s,r,a,o=ve,l=ve,c,h=Cn,p=1){if(h!==Cn&&h!==$n)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:p};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Oi(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Gr=class extends Kn{constructor(t,e=fn,n=Zn,s,r,a=ve,o=ve,l,c=Cn){let h={width:t,height:t,depth:1},p=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},xs=class extends Ge{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ki=class i extends we{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],p=[],u=0,f=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,s,a,2),_("x","z","y",1,-1,t,n,-e,s,a,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Ve(c,3)),this.setAttribute("normal",new Ve(h,3)),this.setAttribute("uv",new Ve(p,2));function _(C,m,d,B,w,M,v,S,F,E,D){let P=M/F,G=v/E,O=M/2,A=v/2,y=S/2,I=F+1,H=E+1,V=0,j=0,K=new N;for(let Q=0;Q<H;Q++){let it=Q*G-A;for(let vt=0;vt<I;vt++){let xt=vt*P-O;K[C]=xt*B,K[m]=it*w,K[d]=y,c.push(K.x,K.y,K.z),K[C]=0,K[m]=0,K[d]=S>0?1:-1,h.push(K.x,K.y,K.z),p.push(vt/F),p.push(1-Q/E),V+=1}}for(let Q=0;Q<E;Q++)for(let it=0;it<F;it++){let vt=u+it+I*Q,xt=u+it+I*(Q+1),Kt=u+(it+1)+I*(Q+1),Ot=u+(it+1)+I*Q;l.push(vt,xt,Ot),l.push(xt,Kt,Ot),j+=6}o.addGroup(f,j,D),f+=j,u+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Cs=class i extends we{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,p=t/o,u=e/l,f=[],_=[],C=[],m=[];for(let d=0;d<h;d++){let B=d*u-a;for(let w=0;w<c;w++){let M=w*p-r;_.push(M,-B,0),C.push(0,0,1),m.push(w/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let B=0;B<o;B++){let w=B+c*d,M=B+c*(d+1),v=B+1+c*(d+1),S=B+1+c*d;f.push(w,M,S),f.push(M,v,S)}this.setIndex(f),this.setAttribute("position",new Ve(_,3)),this.setAttribute("normal",new Ve(C,3)),this.setAttribute("uv",new Ve(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};function pi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(hc(s))s.isRenderTargetTexture?(Rt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(hc(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Re(i){let t={};for(let e=0;e<i.length;e++){let n=pi(i[e]);for(let s in n)t[s]=n[s]}return t}function hc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Qu(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function il(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}var ih={clone:pi,merge:Re},Yu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ye=class extends Fn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yu,this.fragmentShader=qu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=pi(t.uniforms),this.uniformsGroups=Qu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Yt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Gt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new N().fromArray(s.value);break;case"v4":this.uniforms[n].value=new fe().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ut().fromArray(s.value);break;case"m4":this.uniforms[n].value=new de().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Nr=class extends Ye{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Ms=class extends Fn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ha,this.normalScale=new Gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=ta,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Or=class extends Fn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ur=class extends Fn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Ii(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function yo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Jn=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Hr=class extends Jn{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:So,endingEnd:So}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case bo:r=t,o=2*e-n;break;case Do:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case bo:a=t,l=2*n-e;break;case Do:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,p=this._offsetNext,u=this._weightPrev,f=this._weightNext,_=(n-e)/(s-e),C=_*_,m=C*_,d=-u*m+2*u*C-u*_,B=(1+u)*m+(-1.5-2*u)*C+(-.5+u)*_+1,w=(-1-f)*m+(1.5+f)*C+.5*_,M=f*m-f*C;for(let v=0;v!==o;++v)r[v]=d*a[h+v]+B*a[c+v]+w*a[l+v]+M*a[p+v];return r}},Vr=class extends Jn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),p=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*p+a[l+u]*h;return r}},kr=class extends Jn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},zr=class extends Jn{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,p=this.outTangents;if(!h||!p){let _=(n-e)/(s-e),C=1-_;for(let m=0;m!==o;++m)r[m]=a[c+m]*C+a[l+m]*_;return r}let u=o*2,f=t-1;for(let _=0;_!==o;++_){let C=a[c+_],m=a[l+_],d=f*u+_*2,B=p[d],w=p[d+1],M=t*u+_*2,v=h[M],S=h[M+1],F=ju(n,e,B,v,s);r[_]=sh(F,C,w,S,m)}return r}};function sh(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function Zu(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function ju(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=sh(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let l=Zu(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var qe=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ii(e,this.TimeBufferType),this.values=Ii(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ii(t.times,Array),values:Ii(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),yo(t.settings)&&(n.settings={inTangents:Ii(t.settings.inTangents,Array),outTangents:Ii(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new kr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Vr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Hr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new zr(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case hs:e=this.InterpolantFactoryMethodDiscrete;break;case Dr:e=this.InterpolantFactoryMethodLinear;break;case _r:e=this.InterpolantFactoryMethodSmooth;break;case Ao:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Rt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return hs;case this.InterpolantFactoryMethodLinear:return Dr;case this.InterpolantFactoryMethodSmooth:return _r;case this.InterpolantFactoryMethodBezier:return Ao}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;yo(this.settings)&&(uc(this.settings.inTangents,t),uc(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Lt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Lt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Lt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Lt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&fu(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Lt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===_r,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let p=o*n,u=p-n,f=p+n;for(let _=0;_!==n;++_){let C=e[p+_];if(C!==e[u+_]||C!==e[f+_]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let p=o*n,u=a*n;for(let f=0;f!==n;++f)e[u+f]=e[p+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,yo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function uc(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}qe.prototype.ValueTypeName="";qe.prototype.TimeBufferType=Float32Array;qe.prototype.ValueBufferType=Float32Array;qe.prototype.DefaultInterpolation=Dr;var Wn=class extends qe{constructor(t,e,n){super(t,e,n)}};Wn.prototype.ValueTypeName="bool";Wn.prototype.ValueBufferType=Array;Wn.prototype.DefaultInterpolation=hs;Wn.prototype.InterpolantFactoryMethodLinear=void 0;Wn.prototype.InterpolantFactoryMethodSmooth=void 0;var Kr=class extends qe{constructor(t,e,n,s){super(t,e,n,s)}};Kr.prototype.ValueTypeName="color";var Jr=class extends qe{constructor(t,e,n,s){super(t,e,n,s)}};Jr.prototype.ValueTypeName="number";var Wr=class extends Jn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)Qe.slerpFlat(r,0,a,c-o,a,c,l);return r}},Bs=class extends qe{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Wr(this.times,this.values,this.getValueSize(),t)}};Bs.prototype.ValueTypeName="quaternion";Bs.prototype.InterpolantFactoryMethodSmooth=void 0;var Xn=class extends qe{constructor(t,e,n){super(t,e,n)}};Xn.prototype.ValueTypeName="string";Xn.prototype.ValueBufferType=Array;Xn.prototype.DefaultInterpolation=hs;Xn.prototype.InterpolantFactoryMethodLinear=void 0;Xn.prototype.InterpolantFactoryMethodSmooth=void 0;var Xr=class extends qe{constructor(t,e,n,s){super(t,e,n,s)}};Xr.prototype.ValueTypeName="vector";var Qr=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,p){return c.push(h,p),this},this.removeHandler=function(h){let p=c.indexOf(h);return p!==-1&&c.splice(p,2),this},this.getHandler=function(h){for(let p=0,u=c.length;p<u;p+=2){let f=c[p],_=c[p+1];if(f.global&&(f.lastIndex=0),f.test(h))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},rh=new Qr,Yr=class{constructor(t){this.manager=t!==void 0?t:rh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Yr.DEFAULT_MATERIAL_NAME="__DEFAULT";var ys=class extends Fe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Yt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var vo=new de,dc=new N,fc=new N,qr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Gt(512,512),this.mapType=ze,this.map=null,this.mapPass=null,this.matrix=new de,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vi,this._frameExtents=new Gt(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;dc.setFromMatrixPosition(t.matrixWorld),e.position.copy(dc),fc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(fc),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){vo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(vo,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===Li||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(vo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},mr=new N,gr=new Qe,En=new N,vs=class extends Fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de,this.coordinateSystem=ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(mr,gr,En),En.x===1&&En.y===1&&En.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(mr,gr,En.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(mr,gr,En),En.x===1&&En.y===1&&En.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(mr,gr,En.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Hn=new N,pc=new Gt,mc=new Gt,Te=class extends vs{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ni*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(ls*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ni*2*Math.atan(Math.tan(ls*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Hn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Hn.x,Hn.y).multiplyScalar(-t/Hn.z),Hn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hn.x,Hn.y).multiplyScalar(-t/Hn.z)}getViewSize(t,e){return this.getViewBounds(t,pc,mc),e.subVectors(mc,pc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(ls*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Ji=class extends vs{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Io=class extends qr{constructor(){super(new Ji(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},As=class extends ys{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.shadow=new Io}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},Ss=class extends ys{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ti=-90,Fi=1,Zr=class extends Fe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Te(Ti,Fi,t,e);s.layers=this.layers,this.add(s);let r=new Te(Ti,Fi,t,e);r.layers=this.layers,this.add(r);let a=new Te(Ti,Fi,t,e);a.layers=this.layers,this.add(a);let o=new Te(Ti,Fi,t,e);o.layers=this.layers,this.add(o);let l=new Te(Ti,Fi,t,e);l.layers=this.layers,this.add(l);let c=new Te(Ti,Fi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Li)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,p=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let C=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=C,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(p,u,f),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},jr=class extends Te{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var sl="\\[\\]\\.:\\/",$u=new RegExp("["+sl+"]","g"),rl="[^"+sl+"]",td="[^"+sl.replace("\\.","")+"]",ed=/((?:WC+[\/:])*)/.source.replace("WC",rl),nd=/(WCOD+)?/.source.replace("WCOD",td),id=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",rl),sd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",rl),rd=new RegExp("^"+ed+nd+id+sd+"$"),ad=["material","materials","bones","map"],To=class{constructor(t,e,n){let s=n||ue.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ue=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace($u,"")}static parseTrackName(t){let e=rd.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);ad.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Rt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Lt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Lt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Lt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Lt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Lt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Lt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ue.Composite=To;ue.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ue.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ue.prototype.GetterByBindingType=[ue.prototype._getValue_direct,ue.prototype._getValue_array,ue.prototype._getValue_arrayElement,ue.prototype._getValue_toArray];ue.prototype.SetterByBindingTypeAndVersioning=[[ue.prototype._setValue_direct,ue.prototype._setValue_direct_setNeedsUpdate,ue.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_array,ue.prototype._setValue_array_setNeedsUpdate,ue.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_arrayElement,ue.prototype._setValue_arrayElement_setNeedsUpdate,ue.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_fromArray,ue.prototype._setValue_fromArray_setNeedsUpdate,ue.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var S0=new Float32Array(1);var gc=new de,bs=class{constructor(t,e,n=0,s=1/0){this.ray=new zn(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ui,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Lt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return gc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(gc),this}intersectObject(t,e=!0,n=[]){return Fo(t,this,n,e),n.sort(_c),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Fo(t[s],this,n,e);return n.sort(_c),n}};function _c(i,t){return i.distance-t.distance}function Fo(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Fo(r[a],t,e,!0)}}var Wi=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Wt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Wt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var ul=class ul{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};ul.prototype.isMatrix2=!0;var wo=ul;var Ds=class extends hn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function al(i,t,e,n){let s=od(n);switch(e){case Zo:return i*t;case $o:return i*t/s.components*s.byteLength;case oa:return i*t/s.components*s.byteLength;case ti:return i*t*2/s.components*s.byteLength;case la:return i*t*2/s.components*s.byteLength;case jo:return i*t*3/s.components*s.byteLength;case en:return i*t*4/s.components*s.byteLength;case ca:return i*t*4/s.components*s.byteLength;case ws:case Rs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ps:case Ls:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ua:case fa:return Math.max(i,16)*Math.max(t,8)/4;case ha:case da:return Math.max(i,8)*Math.max(t,8)/2;case pa:case ma:case _a:case Ea:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ga:case Gs:case xa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ca:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ma:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ba:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ya:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case va:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Aa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Sa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ba:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Da:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ia:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ta:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Fa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case wa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ra:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Pa:case La:case Ga:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Na:case Oa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ns:case Ua:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function od(i){switch(i){case ze:case Xo:return{byteLength:1,components:1};case Yi:case Qo:case mn:return{byteLength:2,components:1};case ra:case aa:return{byteLength:2,components:4};case fn:case sa:case pn:return{byteLength:4,components:1};case Yo:case qo:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window!="undefined"&&(window.__THREE__?Rt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function bh(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function cd(i){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,p=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array!="undefined"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function n(o,l,c){let h=l.array,p=l.updateRanges;if(i.bindBuffer(c,o),p.length===0)i.bufferSubData(c,0,h);else{p.sort((f,_)=>f.start-_.start);let u=0;for(let f=1;f<p.length;f++){let _=p[u],C=p[f];C.start<=_.start+_.count+1?_.count=Math.max(_.count,C.start+C.count-_.start):(++u,p[u]=C)}p.length=u+1;for(let f=0,_=p.length;f<_;f++){let C=p[f];i.bufferSubData(c,C.start*h.BYTES_PER_ELEMENT,h,C.start,C.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var hd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ud=`#ifdef USE_ALPHAHASH
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
#endif`,dd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,md=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gd=`#ifdef USE_AOMAP
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
#endif`,_d=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ed=`#ifdef USE_BATCHING
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
#endif`,xd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Cd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Md=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,yd=`#ifdef USE_IRIDESCENCE
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
#endif`,vd=`#ifdef USE_BUMPMAP
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
#endif`,Ad=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Sd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Id=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Td=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Fd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,wd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Rd=`#define PI 3.141592653589793
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
} // validated`,Pd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ld=`vec3 transformedNormal = objectNormal;
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
#endif`,Gd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Nd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Od=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ud=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,kd=`#ifdef USE_ENVMAP
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
#endif`,zd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Kd=`#ifdef USE_ENVMAP
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
#endif`,Jd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wd=`#ifdef USE_ENVMAP
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
#endif`,Xd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Yd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zd=`#ifdef USE_GRADIENTMAP
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
}`,jd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$d=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ef=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,nf=`#ifdef USE_ENVMAP
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
#endif`,sf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,af=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,of=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lf=`PhysicalMaterial material;
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
#endif`,cf=`uniform sampler2D dfgLUT;
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
}`,hf=`
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
#endif`,uf=`#if defined( RE_IndirectDiffuse )
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
#endif`,df=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ff=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,pf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,mf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_f=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ef=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Mf=`#if defined( USE_POINTS_UV )
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
#endif`,Bf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Af=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Sf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bf=`#ifdef USE_MORPHTARGETS
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
#endif`,Df=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,If=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Tf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ff=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Pf=`#ifdef USE_NORMALMAP
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
#endif`,Lf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Nf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Of=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Uf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Vf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Wf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Xf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,qf=`float getShadowMask() {
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
}`,Zf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jf=`#ifdef USE_SKINNING
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
#endif`,$f=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tp=`#ifdef USE_SKINNING
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
#endif`,ep=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,np=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ip=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,rp=`#ifdef USE_TRANSMISSION
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
#endif`,ap=`#ifdef USE_TRANSMISSION
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
#endif`,op=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,up=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dp=`uniform sampler2D t2D;
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
}`,fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_p=`#include <common>
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
}`,Ep=`#if DEPTH_PACKING == 3200
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
}`,xp=`#define DISTANCE
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
}`,Cp=`#define DISTANCE
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
}`,Mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yp=`uniform float scale;
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
}`,vp=`uniform vec3 diffuse;
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
}`,Ap=`#include <common>
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
}`,Sp=`uniform vec3 diffuse;
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
}`,bp=`#define LAMBERT
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
}`,Dp=`#define LAMBERT
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
}`,Ip=`#define MATCAP
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
}`,Tp=`#define MATCAP
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
}`,Fp=`#define NORMAL
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
}`,wp=`#define NORMAL
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
}`,Rp=`#define PHONG
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
}`,Pp=`#define PHONG
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
}`,Lp=`#define STANDARD
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
}`,Gp=`#define STANDARD
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
}`,Np=`#define TOON
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
}`,Op=`#define TOON
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
}`,Up=`uniform float size;
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
}`,Hp=`uniform vec3 diffuse;
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
}`,Vp=`#include <common>
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
}`,kp=`uniform vec3 color;
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
}`,zp=`uniform float rotation;
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
}`,Kp=`uniform vec3 diffuse;
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
}`,zt={alphahash_fragment:hd,alphahash_pars_fragment:ud,alphamap_fragment:dd,alphamap_pars_fragment:fd,alphatest_fragment:pd,alphatest_pars_fragment:md,aomap_fragment:gd,aomap_pars_fragment:_d,batching_pars_vertex:Ed,batching_vertex:xd,begin_vertex:Cd,beginnormal_vertex:Md,bsdfs:Bd,iridescence_fragment:yd,bumpmap_pars_fragment:vd,clipping_planes_fragment:Ad,clipping_planes_pars_fragment:Sd,clipping_planes_pars_vertex:bd,clipping_planes_vertex:Dd,color_fragment:Id,color_pars_fragment:Td,color_pars_vertex:Fd,color_vertex:wd,common:Rd,cube_uv_reflection_fragment:Pd,defaultnormal_vertex:Ld,displacementmap_pars_vertex:Gd,displacementmap_vertex:Nd,emissivemap_fragment:Od,emissivemap_pars_fragment:Ud,colorspace_fragment:Hd,colorspace_pars_fragment:Vd,envmap_fragment:kd,envmap_common_pars_fragment:zd,envmap_pars_fragment:Kd,envmap_pars_vertex:Jd,envmap_physical_pars_fragment:nf,envmap_vertex:Wd,fog_vertex:Xd,fog_pars_vertex:Qd,fog_fragment:Yd,fog_pars_fragment:qd,gradientmap_pars_fragment:Zd,lightmap_pars_fragment:jd,lights_lambert_fragment:$d,lights_lambert_pars_fragment:tf,lights_pars_begin:ef,lights_toon_fragment:sf,lights_toon_pars_fragment:rf,lights_phong_fragment:af,lights_phong_pars_fragment:of,lights_physical_fragment:lf,lights_physical_pars_fragment:cf,lights_fragment_begin:hf,lights_fragment_maps:uf,lights_fragment_end:df,lightprobes_pars_fragment:ff,logdepthbuf_fragment:pf,logdepthbuf_pars_fragment:mf,logdepthbuf_pars_vertex:gf,logdepthbuf_vertex:_f,map_fragment:Ef,map_pars_fragment:xf,map_particle_fragment:Cf,map_particle_pars_fragment:Mf,metalnessmap_fragment:Bf,metalnessmap_pars_fragment:yf,morphinstance_vertex:vf,morphcolor_vertex:Af,morphnormal_vertex:Sf,morphtarget_pars_vertex:bf,morphtarget_vertex:Df,normal_fragment_begin:If,normal_fragment_maps:Tf,normal_pars_fragment:Ff,normal_pars_vertex:wf,normal_vertex:Rf,normalmap_pars_fragment:Pf,clearcoat_normal_fragment_begin:Lf,clearcoat_normal_fragment_maps:Gf,clearcoat_pars_fragment:Nf,iridescence_pars_fragment:Of,opaque_fragment:Uf,packing:Hf,premultiplied_alpha_fragment:Vf,project_vertex:kf,dithering_fragment:zf,dithering_pars_fragment:Kf,roughnessmap_fragment:Jf,roughnessmap_pars_fragment:Wf,shadowmap_pars_fragment:Xf,shadowmap_pars_vertex:Qf,shadowmap_vertex:Yf,shadowmask_pars_fragment:qf,skinbase_vertex:Zf,skinning_pars_vertex:jf,skinning_vertex:$f,skinnormal_vertex:tp,specularmap_fragment:ep,specularmap_pars_fragment:np,tonemapping_fragment:ip,tonemapping_pars_fragment:sp,transmission_fragment:rp,transmission_pars_fragment:ap,uv_pars_fragment:op,uv_pars_vertex:lp,uv_vertex:cp,worldpos_vertex:hp,background_vert:up,background_frag:dp,backgroundCube_vert:fp,backgroundCube_frag:pp,cube_vert:mp,cube_frag:gp,depth_vert:_p,depth_frag:Ep,distance_vert:xp,distance_frag:Cp,equirect_vert:Mp,equirect_frag:Bp,linedashed_vert:yp,linedashed_frag:vp,meshbasic_vert:Ap,meshbasic_frag:Sp,meshlambert_vert:bp,meshlambert_frag:Dp,meshmatcap_vert:Ip,meshmatcap_frag:Tp,meshnormal_vert:Fp,meshnormal_frag:wp,meshphong_vert:Rp,meshphong_frag:Pp,meshphysical_vert:Lp,meshphysical_frag:Gp,meshtoon_vert:Np,meshtoon_frag:Op,points_vert:Up,points_frag:Hp,shadow_vert:Vp,shadow_frag:kp,sprite_vert:zp,sprite_frag:Kp},pt={common:{diffuse:{value:new Yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new Gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new Yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new Yt(16777215)},opacity:{value:1},center:{value:new Gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},yn={basic:{uniforms:Re([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:Re([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Yt(0)},envMapIntensity:{value:1}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:Re([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Yt(0)},specular:{value:new Yt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:Re([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:Re([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Yt(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:Re([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:Re([pt.points,pt.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:Re([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:Re([pt.common,pt.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:Re([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:Re([pt.sprite,pt.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distance:{uniforms:Re([pt.common,pt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distance_vert,fragmentShader:zt.distance_frag},shadow:{uniforms:Re([pt.lights,pt.fog,{color:{value:new Yt(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};yn.physical={uniforms:Re([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new Gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new Yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new Gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new Yt(0)},specularColor:{value:new Yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new Gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};var za={r:0,b:0,g:0},Jp=new de,Dh=new Ut;Dh.set(-1,0,0,0,1,0,0,0,1);function Wp(i,t,e,n,s,r){let a=new Yt(0),o=s===!0?0:1,l,c,h=null,p=0,u=null;function f(B){let w=B.isScene===!0?B.background:null;if(w&&w.isTexture){let M=B.backgroundBlurriness>0;w=t.get(w,M)}return w}function _(B){let w=!1,M=f(B);M===null?m(a,o):M&&M.isColor&&(m(M,1),w=!0);let v=i.xr.getEnvironmentBlendMode();v==="additive"?e.buffers.color.setClear(0,0,0,1,r):v==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function C(B,w){let M=f(w);M&&(M.isCubeTexture||M.mapping===Ts)?(c===void 0&&(c=new Ne(new Ki(1,1,1),new Ye({name:"BackgroundCubeMaterial",uniforms:pi(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:Oe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(v,S,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Jp.makeRotationFromEuler(w.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Dh),c.material.toneMapped=qt.getTransfer(M.colorSpace)!==ee,(h!==M||p!==M.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,p=M.version,u=i.toneMapping),c.layers.enableAll(),B.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Ne(new Cs(2,2),new Ye({name:"BackgroundMaterial",uniforms:pi(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=qt.getTransfer(M.colorSpace)!==ee,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||p!==M.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,p=M.version,u=i.toneMapping),l.layers.enableAll(),B.unshift(l,l.geometry,l.material,0,0,null))}function m(B,w){B.getRGB(za,il(i)),e.buffers.color.setClear(za.r,za.g,za.b,w,r)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(B,w=1){a.set(B),o=w,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(B){o=B,m(a,o)},render:_,addToRenderList:C,dispose:d}}function Xp(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(G,O,A,y,I){let H=!1,V=p(G,y,A,O);r!==V&&(r=V,c(r.object)),H=f(G,y,A,I),H&&_(G,y,A,I),I!==null&&t.update(I,i.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,M(G,O,A,y),I!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(I).buffer))}function l(){return i.createVertexArray()}function c(G){return i.bindVertexArray(G)}function h(G){return i.deleteVertexArray(G)}function p(G,O,A,y){let I=y.wireframe===!0,H=n[O.id];H===void 0&&(H={},n[O.id]=H);let V=G.isInstancedMesh===!0?G.id:0,j=H[V];j===void 0&&(j={},H[V]=j);let K=j[A.id];K===void 0&&(K={},j[A.id]=K);let Q=K[I];return Q===void 0&&(Q=u(l()),K[I]=Q),Q}function u(G){let O=[],A=[],y=[];for(let I=0;I<e;I++)O[I]=0,A[I]=0,y[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:A,attributeDivisors:y,object:G,attributes:{},index:null}}function f(G,O,A,y){let I=r.attributes,H=O.attributes,V=0,j=A.getAttributes();for(let K in j)if(j[K].location>=0){let it=I[K],vt=H[K];if(vt===void 0&&(K==="instanceMatrix"&&G.instanceMatrix&&(vt=G.instanceMatrix),K==="instanceColor"&&G.instanceColor&&(vt=G.instanceColor)),it===void 0||it.attribute!==vt||vt&&it.data!==vt.data)return!0;V++}return r.attributesNum!==V||r.index!==y}function _(G,O,A,y){let I={},H=O.attributes,V=0,j=A.getAttributes();for(let K in j)if(j[K].location>=0){let it=H[K];it===void 0&&(K==="instanceMatrix"&&G.instanceMatrix&&(it=G.instanceMatrix),K==="instanceColor"&&G.instanceColor&&(it=G.instanceColor));let vt={};vt.attribute=it,it&&it.data&&(vt.data=it.data),I[K]=vt,V++}r.attributes=I,r.attributesNum=V,r.index=y}function C(){let G=r.newAttributes;for(let O=0,A=G.length;O<A;O++)G[O]=0}function m(G){d(G,0)}function d(G,O){let A=r.newAttributes,y=r.enabledAttributes,I=r.attributeDivisors;A[G]=1,y[G]===0&&(i.enableVertexAttribArray(G),y[G]=1),I[G]!==O&&(i.vertexAttribDivisor(G,O),I[G]=O)}function B(){let G=r.newAttributes,O=r.enabledAttributes;for(let A=0,y=O.length;A<y;A++)O[A]!==G[A]&&(i.disableVertexAttribArray(A),O[A]=0)}function w(G,O,A,y,I,H,V){V===!0?i.vertexAttribIPointer(G,O,A,I,H):i.vertexAttribPointer(G,O,A,y,I,H)}function M(G,O,A,y){C();let I=y.attributes,H=A.getAttributes(),V=O.defaultAttributeValues;for(let j in H){let K=H[j];if(K.location>=0){let Q=I[j];if(Q===void 0&&(j==="instanceMatrix"&&G.instanceMatrix&&(Q=G.instanceMatrix),j==="instanceColor"&&G.instanceColor&&(Q=G.instanceColor)),Q!==void 0){let it=Q.normalized,vt=Q.itemSize,xt=t.get(Q);if(xt===void 0)continue;let Kt=xt.buffer,Ot=xt.type,Vt=xt.bytesPerElement,X=Ot===i.INT||Ot===i.UNSIGNED_INT||Q.gpuType===sa;if(Q.isInterleavedBufferAttribute){let $=Q.data,Et=$.stride,Y=Q.offset;if($.isInstancedInterleavedBuffer){for(let tt=0;tt<K.locationSize;tt++)d(K.location+tt,$.meshPerAttribute);G.isInstancedMesh!==!0&&y._maxInstanceCount===void 0&&(y._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let tt=0;tt<K.locationSize;tt++)m(K.location+tt);i.bindBuffer(i.ARRAY_BUFFER,Kt);for(let tt=0;tt<K.locationSize;tt++)w(K.location+tt,vt/K.locationSize,Ot,it,Et*Vt,(Y+vt/K.locationSize*tt)*Vt,X)}else{if(Q.isInstancedBufferAttribute){for(let $=0;$<K.locationSize;$++)d(K.location+$,Q.meshPerAttribute);G.isInstancedMesh!==!0&&y._maxInstanceCount===void 0&&(y._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let $=0;$<K.locationSize;$++)m(K.location+$);i.bindBuffer(i.ARRAY_BUFFER,Kt);for(let $=0;$<K.locationSize;$++)w(K.location+$,vt/K.locationSize,Ot,it,vt*Vt,vt/K.locationSize*$*Vt,X)}}else if(V!==void 0){let it=V[j];if(it!==void 0)switch(it.length){case 2:i.vertexAttrib2fv(K.location,it);break;case 3:i.vertexAttrib3fv(K.location,it);break;case 4:i.vertexAttrib4fv(K.location,it);break;default:i.vertexAttrib1fv(K.location,it)}}}}B()}function v(){D();for(let G in n){let O=n[G];for(let A in O){let y=O[A];for(let I in y){let H=y[I];for(let V in H)h(H[V].object),delete H[V];delete y[I]}}delete n[G]}}function S(G){if(n[G.id]===void 0)return;let O=n[G.id];for(let A in O){let y=O[A];for(let I in y){let H=y[I];for(let V in H)h(H[V].object),delete H[V];delete y[I]}}delete n[G.id]}function F(G){for(let O in n){let A=n[O];for(let y in A){let I=A[y];if(I[G.id]===void 0)continue;let H=I[G.id];for(let V in H)h(H[V].object),delete H[V];delete I[G.id]}}}function E(G){for(let O in n){let A=n[O],y=G.isInstancedMesh===!0?G.id:0,I=A[y];if(I!==void 0){for(let H in I){let V=I[H];for(let j in V)h(V[j].object),delete V[j];delete I[H]}delete A[y],Object.keys(A).length===0&&delete n[O]}}}function D(){P(),a=!0,r!==s&&(r=s,c(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:D,resetDefaultState:P,dispose:v,releaseStatesOfGeometry:S,releaseStatesOfObject:E,releaseStatesOfProgram:F,initAttributes:C,enableAttribute:m,disableUnusedAttributes:B}}function Qp(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Yp(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let F=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(F){return!(F!==en&&n.convert(F)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(F){let E=F===mn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(F!==ze&&F!==pn&&!E&&n.convert(F)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(F){if(F==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";F="mediump"}return F==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Rt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let p=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),C=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),B=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:_,maxTextureSize:C,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:B,maxVaryings:w,maxFragmentUniforms:M,maxSamples:v,samples:S}}function qp(i){let t=this,e=null,n=0,s=!1,r=!1,a=new Xe,o=new Ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){let f=p.length!==0||u||n!==0||s;return s=u,n=p.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,u){e=h(p,u,0)},this.setState=function(p,u,f){let _=p.clippingPlanes,C=p.clipIntersection,m=p.clipShadows,d=i.get(p);if(!s||_===null||_.length===0||r&&!m)r?h(null):c();else{let B=r?0:n,w=B*4,M=d.clippingState||null;l.value=M,M=h(_,u,w,f);for(let v=0;v!==w;++v)M[v]=e[v];d.clippingState=M,this.numIntersection=C?this.numPlanes:0,this.numPlanes+=B}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(p,u,f,_){let C=p!==null?p.length:0,m=null;if(C!==0){if(m=l.value,_!==!0||m===null){let d=f+C*4,B=u.matrixWorldInverse;o.getNormalMatrix(B),(m===null||m.length<d)&&(m=new Float32Array(d));for(let w=0,M=f;w!==C;++w,M+=4)a.copy(p[w]).applyMatrix4(B,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=C,t.numIntersection=0,m}}var $i=4,Zp=6,jp=20,$p=256,Os=new Ji,ah=new Yt,dl=null,fl=0,pl=0,ml=!1,tm=new N,mi=new N,Ja=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=tm}=r;dl=this._renderer.getRenderTarget(),fl=this._renderer.getActiveCubeFace(),pl=this._renderer.getActiveMipmapLevel(),ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ch(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(dl,fl,pl),this._renderer.xr.enabled=ml,t.scissorTest=!1,ji(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Zn||t.mapping===fi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),dl=this._renderer.getRenderTarget(),fl=this._renderer.getActiveCubeFace(),pl=this._renderer.getActiveMipmapLevel(),ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ae,minFilter:Ae,generateMipmaps:!1,type:mn,format:en,colorSpace:us,depthBuffer:!1},s=oh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=oh(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=em(r)),this._blurMaterial=im(r,t,e),this._ggxMaterial=nm(r,t,e)}return s}_compileMaterial(t){let e=new Ne(new we,t);this._renderer.compile(e,Os)}_sceneToCubeUV(t,e,n,s,r){let l=new Te(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,f=p.toneMapping;p.getClearColor(ah),p.toneMapping=dn,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ne(new Ki,new hi({name:"PMREM.Background",side:Oe,depthWrite:!1,depthTest:!1})));let C=this._backgroundBox,m=C.material,d=!1,B=t.background;B?B.isColor&&(m.color.copy(B),t.background=null,d=!0):(m.color.copy(ah),d=!0);for(let w=0;w<6;w++){let M=w%3;M===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):M===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));let v=this._cubeSize;ji(s,M*v,w>2?v:0,v,v),p.setRenderTarget(s),d&&p.render(C,l),p.render(t,l)}p.toneMapping=f,p.autoClear=u,t.background=B}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Zn||t.mapping===fi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ch()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lh());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;ji(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Os)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),p=Math.sqrt(c*c-h*h),u=c*1.25,f=p*u,{_lodMax:_}=this,C=this._sizeLods[n],m=3*C*(n>_-$i?n-_+$i:0),d=4*(this._cubeSize-C);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=_-e,ji(r,m,d,3*C,2*C),s.setRenderTarget(r),s.render(o,Os),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=_-n,ji(t,m,d,3*C,2*C),s.setRenderTarget(t),s.render(o,Os)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],p=3*h*(s>this._lodMax-$i?s-this._lodMax+$i:0),u=4*(this._cubeSize-h);ji(e,p,u,3*h,2*h),a.setRenderTarget(e),a.render(l,Os)}};function em(i){let t=[],e=[],n=i,s=i-$i+1+Zp;for(let r=0;r<s;r++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],p=6,u=6,f=3,_=new Float32Array(f*u*p),C=new Float32Array(f*u*p);for(let d=0;d<p;d++){let B=d%3*2/3-1,w=d>2?0:-1,M=[B,w,0,B+2/3,w,0,B+2/3,w+1,0,B,w,0,B+2/3,w+1,0,B,w+1,0];_.set(M,f*u*d);for(let v=0;v<u;v++){let S=h[v*2]*2-1,F=h[v*2+1]*2-1;d===0?mi.set(1,F,S):d===1?mi.set(-S,1,-F):d===2?mi.set(-S,F,1):d===3?mi.set(-1,F,-S):d===4?mi.set(-S,-1,F):mi.set(S,F,-1),mi.toArray(C,(d*u+v)*f)}}let m=new we;m.setAttribute("position",new ye(_,f)),m.setAttribute("outputDirection",new ye(C,f)),e.push(new Ne(m,null)),n>$i&&n--}return{lodMeshes:e,sizeLods:t}}function oh(i,t,e){let n=new ke(i,t,e);return n.texture.mapping=Ts,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ji(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function nm(i,t,e){return new Ye({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:$p,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Qa(),fragmentShader:`

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
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function im(i,t,e){return new Ye({name:"SphericalGaussianBlur",defines:{SAMPLES:jp,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Qa(),fragmentShader:`

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
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function lh(){return new Ye({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qa(),fragmentShader:`

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
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function ch(){return new Ye({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function Qa(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Wa=class extends ke{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Es(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ki(5,5,5),r=new Ye({name:"CubemapFromEquirect",uniforms:pi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Oe,blending:Mn});r.uniforms.tEquirect.value=e;let a=new Ne(s,r),o=e.minFilter;return e.minFilter===jn&&(e.minFilter=Ae),new Zr(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function sm(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===ea||f===na)if(t.has(u)){let _=t.get(u).texture;return o(_,u.mapping)}else{let _=u.image;if(_&&_.height>0){let C=new Wa(_.height);return C.fromEquirectangularTexture(i,u),t.set(u,C),u.addEventListener("dispose",c),o(C.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,_=f===ea||f===na,C=f===Zn||f===fi;if(_||C){let m=e.get(u),d=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return n===null&&(n=new Ja(i)),m=_?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let B=u.image;return _&&B&&B.height>0||C&&B&&l(B)?(n===null&&(n=new Ja(i)),m=_?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===ea?u.mapping=Zn:f===na&&(u.mapping=fi),u}function l(u){let f=0,_=6;for(let C=0;C<_;C++)u[C]!==void 0&&f++;return f===_}function c(u){let f=u.target;f.removeEventListener("dispose",c);let _=t.get(f);_!==void 0&&(t.delete(f),_.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let _=e.get(f);_!==void 0&&(e.delete(f),_.dispose())}function p(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:p}}function rm(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&ci("WebGLRenderer: "+n+" extension not supported."),s}}}function am(i,t,e,n){let s={},r=new WeakMap;function a(p){let u=p.target;u.index!==null&&t.remove(u.index);for(let _ in u.attributes)t.remove(u.attributes[_]);u.removeEventListener("dispose",a),delete s[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(p,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(p){let u=p.attributes;for(let f in u)t.update(u[f],i.ARRAY_BUFFER)}function c(p){let u=[],f=p.index,_=p.attributes.position,C=0;if(_===void 0)return;if(f!==null){let B=f.array;C=f.version;for(let w=0,M=B.length;w<M;w+=3){let v=B[w+0],S=B[w+1],F=B[w+2];u.push(v,S,S,F,F,v)}}else{let B=_.array;C=_.version;for(let w=0,M=B.length/3-1;w<M;w+=3){let v=w+0,S=w+1,F=w+2;u.push(v,S,S,F,F,v)}}let m=new(_.count>=65535?_s:gs)(u,1);m.version=C;let d=r.get(p);d&&t.remove(d),r.set(p,m)}function h(p){let u=r.get(p);if(u){let f=p.index;f!==null&&u.version<f.version&&c(p)}else c(p);return r.get(p)}return{get:o,update:l,getWireframeAttribute:h}}function om(i,t,e){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function l(p,u){i.drawElements(n,u,r,p*a),e.update(u,n,1)}function c(p,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,p*a,f),e.update(u,n,f))}function h(p,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,p,0,f);let C=0;for(let m=0;m<f;m++)C+=u[m];e.update(C,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function lm(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Lt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function cm(i,t,e){let n=new WeakMap,s=new fe;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==p){let D=function(){F.dispose(),n.delete(o),o.removeEventListener("dispose",D)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,C=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],B=o.morphAttributes.color||[],w=0;f===!0&&(w=1),_===!0&&(w=2),C===!0&&(w=3);let M=o.attributes.position.count*w,v=1;M>t.maxTextureSize&&(v=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let S=new Float32Array(M*v*4*p),F=new ps(S,M,v,p);F.type=pn,F.needsUpdate=!0;let E=w*4;for(let P=0;P<p;P++){let G=m[P],O=d[P],A=B[P],y=M*v*4*P;for(let I=0;I<G.count;I++){let H=I*E;f===!0&&(s.fromBufferAttribute(G,I),S[y+H+0]=s.x,S[y+H+1]=s.y,S[y+H+2]=s.z,S[y+H+3]=0),_===!0&&(s.fromBufferAttribute(O,I),S[y+H+4]=s.x,S[y+H+5]=s.y,S[y+H+6]=s.z,S[y+H+7]=0),C===!0&&(s.fromBufferAttribute(A,I),S[y+H+8]=s.x,S[y+H+9]=s.y,S[y+H+10]=s.z,S[y+H+11]=A.itemSize===4?s.w:1)}}u={count:p,texture:F,size:new Gt(M,v)},n.set(o,u),o.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let f=0;for(let C=0;C<c.length;C++)f+=c[C];let _=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function hm(i,t,e,n,s){let r=new WeakMap;function a(c){let h=s.render.frame,p=c.geometry,u=t.get(c,p);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var um={[Uo]:"LINEAR_TONE_MAPPING",[Ho]:"REINHARD_TONE_MAPPING",[Vo]:"CINEON_TONE_MAPPING",[ko]:"ACES_FILMIC_TONE_MAPPING",[Ko]:"AGX_TONE_MAPPING",[Jo]:"NEUTRAL_TONE_MAPPING",[zo]:"CUSTOM_TONE_MAPPING"};function dm(i,t,e,n,s,r){let a=new ke(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new we;c.setAttribute("position",new Ve([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ve([0,2,0,0,2,0],2));let h=new Nr({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new Ne(c,h),u=new Ji(-1,1,1,-1,0,1),f=null,_=null,C=!1,m,d=null,B=[],w=!1;this.setSize=function(M,v){a.setSize(M,v),o!==null&&o.setSize(M,v),l!==null&&l.setSize(M,v);for(let S=0;S<B.length;S++){let F=B[S];F.setSize&&F.setSize(M,v)}},this.setEffects=function(M){B=M,w=B.length>0&&B[0].isRenderPass===!0;let v=a.width,S=a.height;B.length>0&&o===null&&(o=new ke(v,S,{type:mn,depthBuffer:!1,stencilBuffer:!1}),l=new ke(v,S,{type:mn,depthBuffer:!1,stencilBuffer:!1}));for(let F=0;F<B.length;F++){let E=B[F];E.setSize&&E.setSize(v,S)}},this.begin=function(M,v){if(C||M.toneMapping===dn&&B.length===0)return!1;if(d=v,v!==null){let S=v.width,F=v.height;(a.width!==S||a.height!==F)&&this.setSize(S,F)}return w===!1&&M.setRenderTarget(a),m=M.toneMapping,M.toneMapping=dn,!0},this.hasRenderPass=function(){return w},this.end=function(M,v){M.toneMapping=m,C=!0;let S=a,F=o;for(let E=0;E<B.length;E++){let D=B[E];D.enabled!==!1&&(D.render(M,F,S,v),D.needsSwap!==!1&&(S=F,F=F===o?l:o))}if(f!==M.outputColorSpace||_!==M.toneMapping){f=M.outputColorSpace,_=M.toneMapping,h.defines={},qt.getTransfer(f)===ee&&(h.defines.SRGB_TRANSFER="");let E=um[_];E&&(h.defines[E]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,M.setRenderTarget(d),M.render(p,u),d=null,C=!1},this.isCompositing=function(){return C},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var Ih=new Ge,El=new Kn(1,1),Th=new ps,Fh=new Fr,wh=new Es,hh=[],uh=[],dh=new Float32Array(16),fh=new Float32Array(9),ph=new Float32Array(4);function es(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=hh[s];if(r===void 0&&(r=new Float32Array(s),hh[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function xe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ce(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ya(i,t){let e=uh[t];e===void 0&&(e=new Int32Array(t),uh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function fm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function pm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2fv(this.addr,t),Ce(e,t)}}function mm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(xe(e,t))return;i.uniform3fv(this.addr,t),Ce(e,t)}}function gm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4fv(this.addr,t),Ce(e,t)}}function _m(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(xe(e,n))return;ph.set(n),i.uniformMatrix2fv(this.addr,!1,ph),Ce(e,n)}}function Em(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(xe(e,n))return;fh.set(n),i.uniformMatrix3fv(this.addr,!1,fh),Ce(e,n)}}function xm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(xe(e,n))return;dh.set(n),i.uniformMatrix4fv(this.addr,!1,dh),Ce(e,n)}}function Cm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Mm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2iv(this.addr,t),Ce(e,t)}}function Bm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;i.uniform3iv(this.addr,t),Ce(e,t)}}function ym(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4iv(this.addr,t),Ce(e,t)}}function vm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Am(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2uiv(this.addr,t),Ce(e,t)}}function Sm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;i.uniform3uiv(this.addr,t),Ce(e,t)}}function bm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4uiv(this.addr,t),Ce(e,t)}}function Dm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(El.compareFunction=e.isReversedDepthBuffer()?ka:Va,r=El):r=Ih,e.setTexture2D(t||r,s)}function Im(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Fh,s)}function Tm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||wh,s)}function Fm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Th,s)}function wm(i){switch(i){case 5126:return fm;case 35664:return pm;case 35665:return mm;case 35666:return gm;case 35674:return _m;case 35675:return Em;case 35676:return xm;case 5124:case 35670:return Cm;case 35667:case 35671:return Mm;case 35668:case 35672:return Bm;case 35669:case 35673:return ym;case 5125:return vm;case 36294:return Am;case 36295:return Sm;case 36296:return bm;case 35678:case 36198:case 36298:case 36306:case 35682:return Dm;case 35679:case 36299:case 36307:return Im;case 35680:case 36300:case 36308:case 36293:return Tm;case 36289:case 36303:case 36311:case 36292:return Fm}}function Rm(i,t){i.uniform1fv(this.addr,t)}function Pm(i,t){let e=es(t,this.size,2);i.uniform2fv(this.addr,e)}function Lm(i,t){let e=es(t,this.size,3);i.uniform3fv(this.addr,e)}function Gm(i,t){let e=es(t,this.size,4);i.uniform4fv(this.addr,e)}function Nm(i,t){let e=es(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Om(i,t){let e=es(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Um(i,t){let e=es(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Hm(i,t){i.uniform1iv(this.addr,t)}function Vm(i,t){i.uniform2iv(this.addr,t)}function km(i,t){i.uniform3iv(this.addr,t)}function zm(i,t){i.uniform4iv(this.addr,t)}function Km(i,t){i.uniform1uiv(this.addr,t)}function Jm(i,t){i.uniform2uiv(this.addr,t)}function Wm(i,t){i.uniform3uiv(this.addr,t)}function Xm(i,t){i.uniform4uiv(this.addr,t)}function Qm(i,t,e){let n=this.cache,s=t.length,r=Ya(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=El:a=Ih;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Ym(i,t,e){let n=this.cache,s=t.length,r=Ya(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Fh,r[a])}function qm(i,t,e){let n=this.cache,s=t.length,r=Ya(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||wh,r[a])}function Zm(i,t,e){let n=this.cache,s=t.length,r=Ya(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Th,r[a])}function jm(i){switch(i){case 5126:return Rm;case 35664:return Pm;case 35665:return Lm;case 35666:return Gm;case 35674:return Nm;case 35675:return Om;case 35676:return Um;case 5124:case 35670:return Hm;case 35667:case 35671:return Vm;case 35668:case 35672:return km;case 35669:case 35673:return zm;case 5125:return Km;case 36294:return Jm;case 36295:return Wm;case 36296:return Xm;case 35678:case 36198:case 36298:case 36306:case 35682:return Qm;case 35679:case 36299:case 36307:return Ym;case 35680:case 36300:case 36308:case 36293:return qm;case 36289:case 36303:case 36311:case 36292:return Zm}}var xl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=wm(e.type)}},Cl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=jm(e.type)}},Ml=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},gl=/(\w+)(\])?(\[|\.)?/g;function mh(i,t){i.seq.push(t),i.map[t.id]=t}function $m(i,t,e){let n=i.name,s=n.length;for(gl.lastIndex=0;;){let r=gl.exec(n),a=gl.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){mh(e,c===void 0?new xl(o,i,t):new Cl(o,i,t));break}else{let p=e.map[o];p===void 0&&(p=new Ml(o),mh(e,p)),e=p}}}var ts=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);$m(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function gh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var tg=37297,eg=0;function ng(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var _h=new Ut;function ig(i){qt._getMatrix(_h,qt.workingColorSpace,i);let t=`mat3( ${_h.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(i)){case ds:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return Rt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Eh(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+ng(i.getShaderSource(t),o)}else return r}function sg(i,t){let e=ig(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var rg={[Uo]:"Linear",[Ho]:"Reinhard",[Vo]:"Cineon",[ko]:"ACESFilmic",[Ko]:"AgX",[Jo]:"Neutral",[zo]:"Custom"};function ag(i,t){let e=rg[t];return e===void 0?(Rt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ka=new N;function og(){qt.getLuminanceCoefficients(Ka);let i=Ka.x.toFixed(4),t=Ka.y.toFixed(4),e=Ka.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function lg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hs).join(`
`)}function cg(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function hg(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Hs(i){return i!==""}function xh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ch(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var ug=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bl(i){return i.replace(ug,fg)}var dg=new Map;function fg(i,t){let e=zt[t];if(e===void 0){let n=dg.get(t);if(n!==void 0)e=zt[n],Rt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Bl(e)}var pg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mh(i){return i.replace(pg,mg)}function mg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Bh(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var gg={[Is]:"SHADOWMAP_TYPE_PCF",[Xi]:"SHADOWMAP_TYPE_VSM"};function _g(i){return gg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Eg={[Zn]:"ENVMAP_TYPE_CUBE",[fi]:"ENVMAP_TYPE_CUBE",[Ts]:"ENVMAP_TYPE_CUBE_UV"};function xg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Eg[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Cg={[fi]:"ENVMAP_MODE_REFRACTION"};function Mg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Cg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Bg={[ta]:"ENVMAP_BLENDING_MULTIPLY",[Uc]:"ENVMAP_BLENDING_MIX",[Hc]:"ENVMAP_BLENDING_ADD"};function yg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Bg[i.combine]||"ENVMAP_BLENDING_NONE"}function vg(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Ag(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=_g(e),c=xg(e),h=Mg(e),p=yg(e),u=vg(e),f=lg(e),_=cg(r),C=s.createProgram(),m,d,B=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Hs).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Hs).join(`
`),d.length>0&&(d+=`
`)):(m=[Bh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hs).join(`
`),d=[Bh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==dn?"#define TONE_MAPPING":"",e.toneMapping!==dn?zt.tonemapping_pars_fragment:"",e.toneMapping!==dn?ag("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,sg("linearToOutputTexel",e.outputColorSpace),og(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Hs).join(`
`)),a=Bl(a),a=xh(a,e),a=Ch(a,e),o=Bl(o),o=xh(o,e),o=Ch(o,e),a=Mh(a),o=Mh(o),e.isRawShaderMaterial!==!0&&(B=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===tl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===tl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let w=B+m+a,M=B+d+o,v=gh(s,s.VERTEX_SHADER,w),S=gh(s,s.FRAGMENT_SHADER,M);s.attachShader(C,v),s.attachShader(C,S),e.index0AttributeName!==void 0?s.bindAttribLocation(C,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(C,0,"position"),s.linkProgram(C);function F(G){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(C)||"",A=s.getShaderInfoLog(v)||"",y=s.getShaderInfoLog(S)||"",I=O.trim(),H=A.trim(),V=y.trim(),j=!0,K=!0;if(s.getProgramParameter(C,s.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,C,v,S);else{let Q=Eh(s,v,"vertex"),it=Eh(s,S,"fragment");Lt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(C,s.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+I+`
`+Q+`
`+it)}else I!==""?Rt("WebGLProgram: Program Info Log:",I):(H===""||V==="")&&(K=!1);K&&(G.diagnostics={runnable:j,programLog:I,vertexShader:{log:H,prefix:m},fragmentShader:{log:V,prefix:d}})}s.deleteShader(v),s.deleteShader(S),E=new ts(s,C),D=hg(s,C)}let E;this.getUniforms=function(){return E===void 0&&F(this),E};let D;this.getAttributes=function(){return D===void 0&&F(this),D};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(C,tg)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(C),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=eg++,this.cacheKey=t,this.usedTimes=1,this.program=C,this.vertexShader=v,this.fragmentShader=S,this}var Sg=0,yl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new vl(t),e.set(t,n)),n}},vl=class{constructor(t){this.id=Sg++,this.code=t,this.usedTimes=0}};function bg(i){return i===ti||i===Gs||i===Ns}function Dg(i,t,e,n,s,r){let a=new Ui,o=new yl,l=new Set,c=[],h=new Map,p=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function C(E,D,P,G,O,A){let y=G.fog,I=O.geometry,H=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?G.environment:null,V=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,j=t.get(E.envMap||H,V),K=j&&j.mapping===Ts?j.image.height:null,Q=f[E.type];E.precision!==null&&(u=n.getMaxPrecision(E.precision),u!==E.precision&&Rt("WebGLProgram.getParameters:",E.precision,"not supported, using",u,"instead."));let it=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,vt=it!==void 0?it.length:0,xt=0;I.morphAttributes.position!==void 0&&(xt=1),I.morphAttributes.normal!==void 0&&(xt=2),I.morphAttributes.color!==void 0&&(xt=3);let Kt,Ot,Vt,X;if(Q){let le=yn[Q];Kt=le.vertexShader,Ot=le.fragmentShader}else{Kt=E.vertexShader,Ot=E.fragmentShader;let le=o.getVertexShaderStage(E),$t=o.getFragmentShaderStage(E);o.update(E,le,$t),Vt=le.id,X=$t.id}let $=i.getRenderTarget(),Et=i.state.buffers.depth.getReversed(),Y=O.isInstancedMesh===!0,tt=O.isBatchedMesh===!0,at=!!E.map,Ft=!!E.matcap,ot=!!j,It=!!E.aoMap,Nt=!!E.lightMap,wt=!!E.bumpMap&&E.wireframe===!1,Xt=!!E.normalMap,ne=!!E.displacementMap,oe=!!E.emissiveMap,re=!!E.metalnessMap,pe=!!E.roughnessMap,T=E.anisotropy>0,Zt=E.clearcoat>0,Jt=E.dispersion>0,b=E.retroreflectivity>0,g=E.iridescence>0,U=E.sheen>0,J=E.transmission>0,q=T&&!!E.anisotropyMap,rt=Zt&&!!E.clearcoatMap,lt=Zt&&!!E.clearcoatNormalMap,Z=Zt&&!!E.clearcoatRoughnessMap,nt=g&&!!E.iridescenceMap,ct=g&&!!E.iridescenceThicknessMap,bt=U&&!!E.sheenColorMap,ft=U&&!!E.sheenRoughnessMap,ht=!!E.specularMap,Dt=!!E.specularColorMap,Pt=!!E.specularIntensityMap,Ht=J&&!!E.transmissionMap,L=J&&!!E.thicknessMap,ut=!!E.gradientMap,et=!!E.alphaMap,dt=E.alphaTest>0,_t=!!E.alphaHash,st=!!E.extensions,Tt=dn;E.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Tt=i.toneMapping);let At={shaderID:Q,shaderType:E.type,shaderName:E.name,vertexShader:Kt,fragmentShader:Ot,defines:E.defines,customVertexShaderID:Vt,customFragmentShaderID:X,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:u,batching:tt,batchingColor:tt&&O._colorsTexture!==null,instancing:Y,instancingColor:Y&&O.instanceColor!==null,instancingMorph:Y&&O.morphTexture!==null,outputColorSpace:$===null?i.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:qt.workingColorSpace,alphaToCoverage:!!E.alphaToCoverage,map:at,matcap:Ft,envMap:ot,envMapMode:ot&&j.mapping,envMapCubeUVHeight:K,aoMap:It,lightMap:Nt,bumpMap:wt,normalMap:Xt,displacementMap:ne,emissiveMap:oe,normalMapObjectSpace:Xt&&E.normalMapType===zc,normalMapTangentSpace:Xt&&E.normalMapType===Ha,packedNormalMap:Xt&&E.normalMapType===Ha&&bg(E.normalMap.format),metalnessMap:re,roughnessMap:pe,anisotropy:T,anisotropyMap:q,clearcoat:Zt,clearcoatMap:rt,clearcoatNormalMap:lt,clearcoatRoughnessMap:Z,dispersion:Jt,retroreflection:b,iridescence:g,iridescenceMap:nt,iridescenceThicknessMap:ct,sheen:U,sheenColorMap:bt,sheenRoughnessMap:ft,specularMap:ht,specularColorMap:Dt,specularIntensityMap:Pt,transmission:J,transmissionMap:Ht,thicknessMap:L,gradientMap:ut,opaque:E.transparent===!1&&E.blending===Qi&&E.alphaToCoverage===!1,alphaMap:et,alphaTest:dt,alphaHash:_t,combine:E.combine,mapUv:at&&_(E.map.channel),aoMapUv:It&&_(E.aoMap.channel),lightMapUv:Nt&&_(E.lightMap.channel),bumpMapUv:wt&&_(E.bumpMap.channel),normalMapUv:Xt&&_(E.normalMap.channel),displacementMapUv:ne&&_(E.displacementMap.channel),emissiveMapUv:oe&&_(E.emissiveMap.channel),metalnessMapUv:re&&_(E.metalnessMap.channel),roughnessMapUv:pe&&_(E.roughnessMap.channel),anisotropyMapUv:q&&_(E.anisotropyMap.channel),clearcoatMapUv:rt&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:lt&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:ct&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:bt&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:ft&&_(E.sheenRoughnessMap.channel),specularMapUv:ht&&_(E.specularMap.channel),specularColorMapUv:Dt&&_(E.specularColorMap.channel),specularIntensityMapUv:Pt&&_(E.specularIntensityMap.channel),transmissionMapUv:Ht&&_(E.transmissionMap.channel),thicknessMapUv:L&&_(E.thicknessMap.channel),alphaMapUv:et&&_(E.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(Xt||T),vertexNormals:!!I.attributes.normal,vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!I.attributes.uv&&(at||et),fog:!!y,useFog:E.fog===!0,fogExp2:!!y&&y.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||I.attributes.normal===void 0&&Xt===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Et,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:vt,morphTextureStride:xt,numSunLights:D.sun.length,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numSunLightShadows:D.sunShadowMap.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numLightProbeGrids:A.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Tt,decodeVideoTexture:at&&E.map.isVideoTexture===!0&&qt.getTransfer(E.map.colorSpace)===ee,decodeVideoTextureEmissive:oe&&E.emissiveMap.isVideoTexture===!0&&qt.getTransfer(E.emissiveMap.colorSpace)===ee,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Ze,flipSided:E.side===Oe,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:st&&E.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&E.extensions.multiDraw===!0||tt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return At.vertexUv1s=l.has(1),At.vertexUv2s=l.has(2),At.vertexUv3s=l.has(3),l.clear(),At}function m(E){let D=[];if(E.shaderID?D.push(E.shaderID):(D.push(E.customVertexShaderID),D.push(E.customFragmentShaderID)),E.defines!==void 0)for(let P in E.defines)D.push(P),D.push(E.defines[P]);return E.isRawShaderMaterial===!1&&(d(D,E),B(D,E),D.push(i.outputColorSpace)),D.push(E.customProgramCacheKey),D.join()}function d(E,D){E.push(D.precision),E.push(D.outputColorSpace),E.push(D.envMapMode),E.push(D.envMapCubeUVHeight),E.push(D.mapUv),E.push(D.alphaMapUv),E.push(D.lightMapUv),E.push(D.aoMapUv),E.push(D.bumpMapUv),E.push(D.normalMapUv),E.push(D.displacementMapUv),E.push(D.emissiveMapUv),E.push(D.metalnessMapUv),E.push(D.roughnessMapUv),E.push(D.anisotropyMapUv),E.push(D.clearcoatMapUv),E.push(D.clearcoatNormalMapUv),E.push(D.clearcoatRoughnessMapUv),E.push(D.iridescenceMapUv),E.push(D.iridescenceThicknessMapUv),E.push(D.sheenColorMapUv),E.push(D.sheenRoughnessMapUv),E.push(D.specularMapUv),E.push(D.specularColorMapUv),E.push(D.specularIntensityMapUv),E.push(D.transmissionMapUv),E.push(D.thicknessMapUv),E.push(D.combine),E.push(D.fogExp2),E.push(D.sizeAttenuation),E.push(D.morphTargetsCount),E.push(D.morphAttributeCount),E.push(D.numSunLights),E.push(D.numDirLights),E.push(D.numPointLights),E.push(D.numSpotLights),E.push(D.numSpotLightMaps),E.push(D.numHemiLights),E.push(D.numRectAreaLights),E.push(D.numSunLightShadows),E.push(D.numDirLightShadows),E.push(D.numPointLightShadows),E.push(D.numSpotLightShadows),E.push(D.numSpotLightShadowsWithMaps),E.push(D.numLightProbes),E.push(D.shadowMapType),E.push(D.toneMapping),E.push(D.numClippingPlanes),E.push(D.numClipIntersection),E.push(D.depthPacking)}function B(E,D){a.disableAll(),D.instancing&&a.enable(0),D.instancingColor&&a.enable(1),D.instancingMorph&&a.enable(2),D.matcap&&a.enable(3),D.envMap&&a.enable(4),D.normalMapObjectSpace&&a.enable(5),D.normalMapTangentSpace&&a.enable(6),D.clearcoat&&a.enable(7),D.iridescence&&a.enable(8),D.alphaTest&&a.enable(9),D.vertexColors&&a.enable(10),D.vertexAlphas&&a.enable(11),D.vertexUv1s&&a.enable(12),D.vertexUv2s&&a.enable(13),D.vertexUv3s&&a.enable(14),D.vertexTangents&&a.enable(15),D.anisotropy&&a.enable(16),D.alphaHash&&a.enable(17),D.batching&&a.enable(18),D.dispersion&&a.enable(19),D.retroreflection&&a.enable(24),D.batchingColor&&a.enable(20),D.gradientMap&&a.enable(21),D.packedNormalMap&&a.enable(22),D.vertexNormals&&a.enable(23),E.push(a.mask),a.disableAll(),D.fog&&a.enable(0),D.useFog&&a.enable(1),D.flatShading&&a.enable(2),D.logarithmicDepthBuffer&&a.enable(3),D.reversedDepthBuffer&&a.enable(4),D.skinning&&a.enable(5),D.morphTargets&&a.enable(6),D.morphNormals&&a.enable(7),D.morphColors&&a.enable(8),D.premultipliedAlpha&&a.enable(9),D.shadowMapEnabled&&a.enable(10),D.doubleSided&&a.enable(11),D.flipSided&&a.enable(12),D.useDepthPacking&&a.enable(13),D.dithering&&a.enable(14),D.transmission&&a.enable(15),D.sheen&&a.enable(16),D.opaque&&a.enable(17),D.pointsUvs&&a.enable(18),D.decodeVideoTexture&&a.enable(19),D.decodeVideoTextureEmissive&&a.enable(20),D.alphaToCoverage&&a.enable(21),D.numLightProbeGrids>0&&a.enable(22),D.hasPositionAttribute&&a.enable(23),E.push(a.mask)}function w(E){let D=f[E.type],P;if(D){let G=yn[D];P=ih.clone(G.uniforms)}else P=E.uniforms;return P}function M(E,D){let P=h.get(D);return P!==void 0?++P.usedTimes:(P=new Ag(i,D,E,s),c.push(P),h.set(D,P)),P}function v(E){if(--E.usedTimes===0){let D=c.indexOf(E);c[D]=c[c.length-1],c.pop(),h.delete(E.cacheKey),E.destroy()}}function S(E){o.remove(E)}function F(){o.dispose()}return{getParameters:C,getProgramCacheKey:m,getUniforms:w,acquireProgram:M,releaseProgram:v,releaseShaderCache:S,programs:c,dispose:F}}function Ig(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Tg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function yh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function vh(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,_,C,m,d){let B=i[t];return B===void 0?(B={id:u.id,object:u,geometry:f,material:_,materialVariant:a(u),groupOrder:C,renderOrder:u.renderOrder,z:m,group:d},i[t]=B):(B.id=u.id,B.object=u,B.geometry=f,B.material=_,B.materialVariant=a(u),B.groupOrder=C,B.renderOrder=u.renderOrder,B.z=m,B.group=d),t++,B}function l(u,f,_,C,m,d,B){B.reversedDepth===!0&&(m=-m);let w=o(u,f,_,C,m,d);_.transmission>0?n.push(w):_.transparent===!0?s.push(w):e.push(w)}function c(u,f,_,C,m,d){let B=o(u,f,_,C,m,d);_.transmission>0?n.unshift(B):_.transparent===!0?s.unshift(B):e.unshift(B)}function h(u,f){e.length>1&&e.sort(u||Tg),n.length>1&&n.sort(f||yh),s.length>1&&s.sort(f||yh)}function p(){for(let u=t,f=i.length;u<f;u++){let _=i[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:p,sort:h}}function Fg(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new vh,i.set(n,[a])):s>=r.length?(a=new vh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function wg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new N,color:new Yt};break;case"SpotLight":e={position:new N,direction:new N,color:new Yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Yt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Yt,groundColor:new Yt};break;case"RectAreaLight":e={color:new Yt,position:new N,halfWidth:new N,halfHeight:new N};break}return i[t.id]=e,e}}}function Rg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Pg=0;function Lg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Gg(i){let t=new wg,e=Rg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);let s=new N,r=new de,a=new de;function o(c){let h=0,p=0,u=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let f=0,_=0,C=0,m=0,d=0,B=0,w=0,M=0,v=0,S=0,F=0,E=0,D=0,P=0;c.sort(Lg);for(let O=0,A=c.length;O<A;O++){let y=c[O],I=y.color,H=y.intensity,V=y.distance,j=null;if(y.shadow&&y.shadow.map&&(y.shadow.map.texture.format===ti?j=y.shadow.map.texture:j=y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)h+=I.r*H,p+=I.g*H,u+=I.b*H;else if(y.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(y.sh.coefficients[K],H);P++}else if(y.isSunLight){let K=t.get(y);if(K.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let Q=y.shadow,it=e.get(y);it.shadowIntensity=Q.intensity,it.shadowBias=Q.bias,it.shadowNormalBias=Q.normalBias,it.shadowRadius=Q.radius,it.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[_]=it,n.sunShadowMap[_]=j;let vt=Q.getViewportCount();for(let xt=0;xt<vt;xt++)n.sunShadowMatrix[C+xt]=Q.getMatrix(xt),n.sunShadowCascade[C+xt]=Q._cascadeData[xt];C+=vt,_++}n.sun[f]=K,f++}else if(y.isDirectionalLight){let K=t.get(y);if(K.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let Q=y.shadow,it=e.get(y);it.shadowIntensity=Q.intensity,it.shadowBias=Q.bias,it.shadowNormalBias=Q.normalBias,it.shadowRadius=Q.radius,it.shadowMapSize=Q.mapSize,n.directionalShadow[m]=it,n.directionalShadowMap[m]=j,n.directionalShadowMatrix[m]=y.shadow.matrix,v++}n.directional[m]=K,m++}else if(y.isSpotLight){let K=t.get(y);K.position.setFromMatrixPosition(y.matrixWorld),K.color.copy(I).multiplyScalar(H),K.distance=V,K.coneCos=Math.cos(y.angle),K.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),K.decay=y.decay,n.spot[B]=K;let Q=y.shadow;if(y.map&&(n.spotLightMap[E]=y.map,E++,Q.updateMatrices(y),y.castShadow&&D++),n.spotLightMatrix[B]=Q.matrix,y.castShadow){let it=e.get(y);it.shadowIntensity=Q.intensity,it.shadowBias=Q.bias,it.shadowNormalBias=Q.normalBias,it.shadowRadius=Q.radius,it.shadowMapSize=Q.mapSize,n.spotShadow[B]=it,n.spotShadowMap[B]=j,F++}B++}else if(y.isRectAreaLight){let K=t.get(y);K.color.copy(I).multiplyScalar(H),K.halfWidth.set(y.width*.5,0,0),K.halfHeight.set(0,y.height*.5,0),n.rectArea[w]=K,w++}else if(y.isPointLight){let K=t.get(y);if(K.color.copy(y.color).multiplyScalar(y.intensity),K.distance=y.distance,K.decay=y.decay,y.castShadow){let Q=y.shadow,it=e.get(y);it.shadowIntensity=Q.intensity,it.shadowBias=Q.bias,it.shadowNormalBias=Q.normalBias,it.shadowRadius=Q.radius,it.shadowMapSize=Q.mapSize,it.shadowCameraNear=Q.camera.near,it.shadowCameraFar=Q.camera.far,n.pointShadow[d]=it,n.pointShadowMap[d]=j,n.pointShadowMatrix[d]=y.shadow.matrix,S++}n.point[d]=K,d++}else if(y.isHemisphereLight){let K=t.get(y);K.skyColor.copy(y.color).multiplyScalar(H),K.groundColor.copy(y.groundColor).multiplyScalar(H),n.hemi[M]=K,M++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=p,n.ambient[2]=u;let G=n.hash;(G.sunLength!==f||G.directionalLength!==m||G.pointLength!==d||G.spotLength!==B||G.rectAreaLength!==w||G.hemiLength!==M||G.numSunShadows!==_||G.numDirectionalShadows!==v||G.numPointShadows!==S||G.numSpotShadows!==F||G.numSpotMaps!==E||G.numLightProbes!==P)&&(n.sun.length=f,n.directional.length=m,n.spot.length=B,n.rectArea.length=w,n.point.length=d,n.hemi.length=M,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=C,n.sunShadowCascade.length=C,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.directionalShadowMatrix.length=v,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=F,n.spotShadowMap.length=F,n.spotLightMatrix.length=F+E-D,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=D,n.numLightProbes=P,G.sunLength=f,G.directionalLength=m,G.pointLength=d,G.spotLength=B,G.rectAreaLength=w,G.hemiLength=M,G.numSunShadows=_,G.numDirectionalShadows=v,G.numPointShadows=S,G.numSpotShadows=F,G.numSpotMaps=E,G.numLightProbes=P,n.version=Pg++)}function l(c,h){let p=0,u=0,f=0,_=0,C=0,m=0,d=h.matrixWorldInverse;for(let B=0,w=c.length;B<w;B++){let M=c[B];if(M.isSunLight){let v=n.sun[p];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(d),p++}else if(M.isDirectionalLight){let v=n.directional[u];v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(d),u++}else if(M.isSpotLight){let v=n.spot[_];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(d),v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(d),_++}else if(M.isRectAreaLight){let v=n.rectArea[C];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(d),a.identity(),r.copy(M.matrixWorld),r.premultiply(d),a.extractRotation(r),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),C++}else if(M.isPointLight){let v=n.point[f];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(d),f++}else if(M.isHemisphereLight){let v=n.hemi[m];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(d),m++}}}return{setup:o,setupView:l,state:n}}function Ah(i){let t=new Gg(i),e=[],n=[],s=[];function r(u){p.camera=u,e.length=0,n.length=0,s.length=0}function a(u){e.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let p={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Ng(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Ah(i),t.set(s,[o])):r>=a.length?(o=new Ah(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var Og=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ug=`uniform sampler2D shadow_pass;
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
}`,Hg=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],Vg=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],Sh=new de,Us=new N,_l=new N;function kg(i,t,e){let n=new Vi,s=new Gt,r=new Gt,a=new fe,o=new Or,l=new Ur,c={},h=e.maxTextureSize,p={[qn]:Oe,[Oe]:qn,[Ze]:Ze},u=new Ye({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Gt},radius:{value:4}},vertexShader:Og,fragmentShader:Ug}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let _=new we;_.setAttribute("position",new ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let C=new Ne(_,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Is;let d=this.type;this.render=function(S,F,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;this.type===Cc&&(Rt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Is);let D=i.getRenderTarget(),P=i.getActiveCubeFace(),G=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Mn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let A=d!==this.type;A&&F.traverse(function(y){y.material&&(Array.isArray(y.material)?y.material.forEach(I=>I.needsUpdate=!0):y.material.needsUpdate=!0)});for(let y=0,I=S.length;y<I;y++){let H=S[y],V=H.shadow;if(V===void 0){Rt("WebGLShadowMap:",H,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let j=V.getFrameExtents();s.multiply(j),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/j.x),s.x=r.x*j.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/j.y),s.y=r.y*j.y,V.mapSize.y=r.y));let K=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=K,V.map===null||A===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Xi){if(H.isPointLight){Rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new ke(s.x,s.y,{format:ti,type:mn,minFilter:Ae,magFilter:Ae,generateMipmaps:!1}),V.map.texture.name=H.name+".shadowMap",V.map.depthTexture=new Kn(s.x,s.y,pn),V.map.depthTexture.name=H.name+".shadowMapDepth",V.map.depthTexture.format=Cn,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=ve,V.map.depthTexture.magFilter=ve}else H.isPointLight?(V.map=new Wa(s.x),V.map.depthTexture=new Gr(s.x,fn)):(V.map=new ke(s.x,s.y),V.map.depthTexture=new Kn(s.x,s.y,fn)),V.map.depthTexture.name=H.name+".shadowMap",V.map.depthTexture.format=Cn,this.type===Is?(V.map.depthTexture.compareFunction=K?ka:Va,V.map.depthTexture.minFilter=Ae,V.map.depthTexture.magFilter=Ae):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=ve,V.map.depthTexture.magFilter=ve);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y)&&V.map.setSize(s.x,s.y);let Q=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();H.isPointLight!==!0&&V.updateMatrices(H,E);for(let it=0;it<Q;it++){let vt=V.getCamera(it);if(H.isPointLight){let xt=V.camera,Kt=V.matrix,Ot=H.distance||xt.far;Ot!==xt.far&&(xt.far=Ot,xt.updateProjectionMatrix()),Us.setFromMatrixPosition(H.matrixWorld),xt.position.copy(Us),_l.copy(xt.position),_l.add(Hg[it]),xt.up.copy(Vg[it]),xt.lookAt(_l),xt.updateMatrixWorld(),Kt.makeTranslation(-Us.x,-Us.y,-Us.z),Sh.multiplyMatrices(xt.projectionMatrix,xt.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Sh,xt.coordinateSystem,xt.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,it),i.clear();else{it===0&&(i.setRenderTarget(V.map),i.clear());let xt=V.getViewport(it);a.set(r.x*xt.x,r.y*xt.y,r.x*xt.z,r.y*xt.w),O.viewport(a)}n=V.getFrustum(it),M(F,E,vt,H,this.type)}V.isPointLightShadow!==!0&&this.type===Xi&&B(V,E),V.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(D,P,G)};function B(S,F){let E=t.update(C);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null?S.mapPass=new ke(s.x,s.y,{format:ti,type:mn}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),u.uniforms.shadow_pass.value=S.map.depthTexture,u.uniforms.resolution.value.set(S.map.width,S.map.height),u.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(F,null,E,u,C,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value.set(S.map.width,S.map.height),f.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(F,null,E,f,C,null)}function w(S,F,E,D){let P=null,G=E.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(G!==void 0)P=G;else if(P=E.isPointLight===!0?l:o,i.localClippingEnabled&&F.clipShadows===!0&&Array.isArray(F.clippingPlanes)&&F.clippingPlanes.length!==0||F.displacementMap&&F.displacementScale!==0||F.alphaMap&&F.alphaTest>0||F.map&&F.alphaTest>0||F.alphaToCoverage===!0){let O=P.uuid,A=F.uuid,y=c[O];y===void 0&&(y={},c[O]=y);let I=y[A];I===void 0&&(I=P.clone(),y[A]=I,F.addEventListener("dispose",v)),P=I}if(P.visible=F.visible,P.wireframe=F.wireframe,D===Xi?P.side=F.shadowSide!==null?F.shadowSide:F.side:P.side=F.shadowSide!==null?F.shadowSide:p[F.side],P.alphaMap=F.alphaMap,P.alphaTest=F.alphaToCoverage===!0?.5:F.alphaTest,P.map=F.map,P.clipShadows=F.clipShadows,P.clippingPlanes=F.clippingPlanes,P.clipIntersection=F.clipIntersection,P.displacementMap=F.displacementMap,P.displacementScale=F.displacementScale,P.displacementBias=F.displacementBias,P.wireframeLinewidth=F.wireframeLinewidth,P.linewidth=F.linewidth,E.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let O=i.properties.get(P);O.light=E}return P}function M(S,F,E,D,P){if(S.visible===!1)return;if(S.layers.test(F.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&P===Xi)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,S.matrixWorld);let A=t.update(S),y=S.material;if(Array.isArray(y)){let I=A.groups;for(let H=0,V=I.length;H<V;H++){let j=I[H],K=y[j.materialIndex];if(K&&K.visible){let Q=w(S,K,D,P);S.onBeforeShadow(i,S,F,E,A,Q,j),i.renderBufferDirect(E,null,A,Q,S,j),S.onAfterShadow(i,S,F,E,A,Q,j)}}}else if(y.visible){let I=w(S,y,D,P);S.onBeforeShadow(i,S,F,E,A,I,null),i.renderBufferDirect(E,null,A,I,S,null),S.onAfterShadow(i,S,F,E,A,I,null)}}let O=S.children;for(let A=0,y=O.length;A<y;A++)M(O[A],F,E,D,P)}function v(S){S.target.removeEventListener("dispose",v);for(let E in c){let D=c[E],P=S.target.uuid;P in D&&(D[P].dispose(),delete D[P])}}}function zg(i,t){function e(){let L=!1,ut=new fe,et=null,dt=new fe(0,0,0,0);return{setMask:function(_t){et!==_t&&!L&&(i.colorMask(_t,_t,_t,_t),et=_t)},setLocked:function(_t){L=_t},setClear:function(_t,st,Tt,At,le){le===!0&&(_t*=At,st*=At,Tt*=At),ut.set(_t,st,Tt,At),dt.equals(ut)===!1&&(i.clearColor(_t,st,Tt,At),dt.copy(ut))},reset:function(){L=!1,et=null,dt.set(-1,0,0,0)}}}function n(){let L=!1,ut=!1,et=null,dt=null,_t=null;return{setReversed:function(st){if(ut!==st){let Tt=t.get("EXT_clip_control");st?Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.ZERO_TO_ONE_EXT):Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.NEGATIVE_ONE_TO_ONE_EXT),ut=st;let At=_t;_t=null,this.setClear(At)}},getReversed:function(){return ut},setTest:function(st){st?$(i.DEPTH_TEST):Et(i.DEPTH_TEST)},setMask:function(st){et!==st&&!L&&(i.depthMask(st),et=st)},setFunc:function(st){if(ut&&(st=eh[st]),dt!==st){switch(st){case xr:i.depthFunc(i.NEVER);break;case Cr:i.depthFunc(i.ALWAYS);break;case Mr:i.depthFunc(i.LESS);break;case Pi:i.depthFunc(i.LEQUAL);break;case Br:i.depthFunc(i.EQUAL);break;case yr:i.depthFunc(i.GEQUAL);break;case vr:i.depthFunc(i.GREATER);break;case Ar:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}dt=st}},setLocked:function(st){L=st},setClear:function(st){_t!==st&&(_t=st,ut&&(st=1-st),i.clearDepth(st))},reset:function(){L=!1,et=null,dt=null,_t=null,ut=!1}}}function s(){let L=!1,ut=null,et=null,dt=null,_t=null,st=null,Tt=null,At=null,le=null;return{setTest:function($t){L||($t?$(i.STENCIL_TEST):Et(i.STENCIL_TEST))},setMask:function($t){ut!==$t&&!L&&(i.stencilMask($t),ut=$t)},setFunc:function($t,sn,gn){(et!==$t||dt!==sn||_t!==gn)&&(i.stencilFunc($t,sn,gn),et=$t,dt=sn,_t=gn)},setOp:function($t,sn,gn){(st!==$t||Tt!==sn||At!==gn)&&(i.stencilOp($t,sn,gn),st=$t,Tt=sn,At=gn)},setLocked:function($t){L=$t},setClear:function($t){le!==$t&&(i.clearStencil($t),le=$t)},reset:function(){L=!1,ut=null,et=null,dt=null,_t=null,st=null,Tt=null,At=null,le=null}}}let r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},p={},u={},f=new WeakMap,_=[],C=null,m=!1,d=null,B=null,w=null,M=null,v=null,S=null,F=null,E=new Yt(0,0,0),D=0,P=!1,G=null,O=null,A=null,y=null,I=null,H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,j=0,K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(K)[1]),V=j>=1):K.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),V=j>=2);let Q=null,it={},vt=i.getParameter(i.SCISSOR_BOX),xt=i.getParameter(i.VIEWPORT),Kt=new fe().fromArray(vt),Ot=new fe().fromArray(xt);function Vt(L,ut,et,dt){let _t=new Uint8Array(4),st=i.createTexture();i.bindTexture(L,st),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Tt=0;Tt<et;Tt++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(ut,0,i.RGBA,1,1,dt,0,i.RGBA,i.UNSIGNED_BYTE,_t):i.texImage2D(ut+Tt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,_t);return st}let X={};X[i.TEXTURE_2D]=Vt(i.TEXTURE_2D,i.TEXTURE_2D,1),X[i.TEXTURE_CUBE_MAP]=Vt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[i.TEXTURE_2D_ARRAY]=Vt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),X[i.TEXTURE_3D]=Vt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),$(i.DEPTH_TEST),a.setFunc(Pi),wt(!1),Xt(Ro),$(i.CULL_FACE),It(Mn);function $(L){h[L]!==!0&&(i.enable(L),h[L]=!0)}function Et(L){h[L]!==!1&&(i.disable(L),h[L]=!1)}function Y(L,ut){return u[L]!==ut?(i.bindFramebuffer(L,ut),u[L]=ut,L===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ut),L===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ut),!0):!1}function tt(L,ut){let et=_,dt=!1;if(L){et=f.get(ut),et===void 0&&(et=[],f.set(ut,et));let _t=L.textures;if(et.length!==_t.length||et[0]!==i.COLOR_ATTACHMENT0){for(let st=0,Tt=_t.length;st<Tt;st++)et[st]=i.COLOR_ATTACHMENT0+st;et.length=_t.length,dt=!0}}else et[0]!==i.BACK&&(et[0]=i.BACK,dt=!0);dt&&i.drawBuffers(et)}function at(L){return C!==L?(i.useProgram(L),C=L,!0):!1}let Ft={[di]:i.FUNC_ADD,[Bc]:i.FUNC_SUBTRACT,[yc]:i.FUNC_REVERSE_SUBTRACT};Ft[vc]=i.MIN,Ft[Ac]=i.MAX;let ot={[Sc]:i.ZERO,[bc]:i.ONE,[Dc]:i.SRC_COLOR,[No]:i.SRC_ALPHA,[Pc]:i.SRC_ALPHA_SATURATE,[wc]:i.DST_COLOR,[Tc]:i.DST_ALPHA,[Ic]:i.ONE_MINUS_SRC_COLOR,[Oo]:i.ONE_MINUS_SRC_ALPHA,[Rc]:i.ONE_MINUS_DST_COLOR,[Fc]:i.ONE_MINUS_DST_ALPHA,[Lc]:i.CONSTANT_COLOR,[Gc]:i.ONE_MINUS_CONSTANT_COLOR,[Nc]:i.CONSTANT_ALPHA,[Oc]:i.ONE_MINUS_CONSTANT_ALPHA};function It(L,ut,et,dt,_t,st,Tt,At,le,$t){if(L===Mn){m===!0&&(Et(i.BLEND),m=!1);return}if(m===!1&&($(i.BLEND),m=!0),L!==Mc){if(L!==d||$t!==P){if((B!==di||v!==di)&&(i.blendEquation(i.FUNC_ADD),B=di,v=di),$t)switch(L){case Qi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Po:i.blendFunc(i.ONE,i.ONE);break;case Lo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Go:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Lt("WebGLState: Invalid blending: ",L);break}else switch(L){case Qi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Po:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Lo:Lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Go:Lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Lt("WebGLState: Invalid blending: ",L);break}w=null,M=null,S=null,F=null,E.set(0,0,0),D=0,d=L,P=$t}return}_t=_t||ut,st=st||et,Tt=Tt||dt,(ut!==B||_t!==v)&&(i.blendEquationSeparate(Ft[ut],Ft[_t]),B=ut,v=_t),(et!==w||dt!==M||st!==S||Tt!==F)&&(i.blendFuncSeparate(ot[et],ot[dt],ot[st],ot[Tt]),w=et,M=dt,S=st,F=Tt),(At.equals(E)===!1||le!==D)&&(i.blendColor(At.r,At.g,At.b,le),E.copy(At),D=le),d=L,P=!1}function Nt(L,ut){L.side===Ze?Et(i.CULL_FACE):$(i.CULL_FACE);let et=L.side===Oe;ut&&(et=!et),wt(et),L.blending===Qi&&L.transparent===!1?It(Mn):It(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);let dt=L.stencilWrite;o.setTest(dt),dt&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),oe(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?$(i.SAMPLE_ALPHA_TO_COVERAGE):Et(i.SAMPLE_ALPHA_TO_COVERAGE)}function wt(L){G!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),G=L)}function Xt(L){L!==Ec?($(i.CULL_FACE),L!==O&&(L===Ro?i.cullFace(i.BACK):L===xc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Et(i.CULL_FACE),O=L}function ne(L){L!==A&&(V&&i.lineWidth(L),A=L)}function oe(L,ut,et){L?($(i.POLYGON_OFFSET_FILL),(y!==ut||I!==et)&&(y=ut,I=et,a.getReversed()&&(ut=-ut),i.polygonOffset(ut,et))):Et(i.POLYGON_OFFSET_FILL)}function re(L){L?$(i.SCISSOR_TEST):Et(i.SCISSOR_TEST)}function pe(L){L===void 0&&(L=i.TEXTURE0+H-1),Q!==L&&(i.activeTexture(L),Q=L)}function T(L,ut,et){et===void 0&&(Q===null?et=i.TEXTURE0+H-1:et=Q);let dt=it[et];dt===void 0&&(dt={type:void 0,texture:void 0},it[et]=dt),(dt.type!==L||dt.texture!==ut)&&(Q!==et&&(i.activeTexture(et),Q=et),i.bindTexture(L,ut||X[L]),dt.type=L,dt.texture=ut)}function Zt(){let L=it[Q];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Jt(){try{i.compressedTexImage2D(...arguments)}catch(L){Lt("WebGLState:",L)}}function b(){try{i.compressedTexImage3D(...arguments)}catch(L){Lt("WebGLState:",L)}}function g(){try{i.texSubImage2D(...arguments)}catch(L){Lt("WebGLState:",L)}}function U(){try{i.texSubImage3D(...arguments)}catch(L){Lt("WebGLState:",L)}}function J(){try{i.compressedTexSubImage2D(...arguments)}catch(L){Lt("WebGLState:",L)}}function q(){try{i.compressedTexSubImage3D(...arguments)}catch(L){Lt("WebGLState:",L)}}function rt(){try{i.texStorage2D(...arguments)}catch(L){Lt("WebGLState:",L)}}function lt(){try{i.texStorage3D(...arguments)}catch(L){Lt("WebGLState:",L)}}function Z(){try{i.texImage2D(...arguments)}catch(L){Lt("WebGLState:",L)}}function nt(){try{i.texImage3D(...arguments)}catch(L){Lt("WebGLState:",L)}}function ct(L){return p[L]!==void 0?p[L]:i.getParameter(L)}function bt(L,ut){p[L]!==ut&&(i.pixelStorei(L,ut),p[L]=ut)}function ft(L){Kt.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),Kt.copy(L))}function ht(L){Ot.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),Ot.copy(L))}function Dt(L,ut){let et=c.get(ut);et===void 0&&(et=new WeakMap,c.set(ut,et));let dt=et.get(L);dt===void 0&&(dt=i.getUniformBlockIndex(ut,L.name),et.set(L,dt))}function Pt(L,ut){let dt=c.get(ut).get(L);l.get(ut)!==dt&&(i.uniformBlockBinding(ut,dt,L.__bindingPointIndex),l.set(ut,dt))}function Ht(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},p={},Q=null,it={},u={},f=new WeakMap,_=[],C=null,m=!1,d=null,B=null,w=null,M=null,v=null,S=null,F=null,E=new Yt(0,0,0),D=0,P=!1,G=null,O=null,A=null,y=null,I=null,Kt.set(0,0,i.canvas.width,i.canvas.height),Ot.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:$,disable:Et,bindFramebuffer:Y,drawBuffers:tt,useProgram:at,setBlending:It,setMaterial:Nt,setFlipSided:wt,setCullFace:Xt,setLineWidth:ne,setPolygonOffset:oe,setScissorTest:re,activeTexture:pe,bindTexture:T,unbindTexture:Zt,compressedTexImage2D:Jt,compressedTexImage3D:b,texImage2D:Z,texImage3D:nt,pixelStorei:bt,getParameter:ct,updateUBOMapping:Dt,uniformBlockBinding:Pt,texStorage2D:rt,texStorage3D:lt,texSubImage2D:g,texSubImage3D:U,compressedTexSubImage2D:J,compressedTexSubImage3D:q,scissor:ft,viewport:ht,reset:Ht}}function Kg(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Gt,h=new WeakMap,p=new Set,u,f=new WeakMap,_=!1;try{_=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function C(b,g){return _?new OffscreenCanvas(b,g):fs("canvas")}function m(b,g,U){let J=1,q=Jt(b);if((q.width>U||q.height>U)&&(J=U/Math.max(q.width,q.height)),J<1)if(typeof HTMLImageElement!="undefined"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&b instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&b instanceof ImageBitmap||typeof VideoFrame!="undefined"&&b instanceof VideoFrame){let rt=Math.floor(J*q.width),lt=Math.floor(J*q.height);u===void 0&&(u=C(rt,lt));let Z=g?C(rt,lt):u;return Z.width=rt,Z.height=lt,Z.getContext("2d").drawImage(b,0,0,rt,lt),Rt("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+rt+"x"+lt+")."),Z}else return"data"in b&&Rt("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),b;return b}function d(b){return b.generateMipmaps}function B(b){i.generateMipmap(b)}function w(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(b,g,U,J,q,rt=!1){if(b!==null){if(i[b]!==void 0)return i[b];Rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let lt;J&&(lt=t.get("EXT_texture_norm16"),lt||Rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=g;if(g===i.RED&&(U===i.FLOAT&&(Z=i.R32F),U===i.HALF_FLOAT&&(Z=i.R16F),U===i.UNSIGNED_BYTE&&(Z=i.R8),U===i.UNSIGNED_SHORT&&lt&&(Z=lt.R16_EXT),U===i.SHORT&&lt&&(Z=lt.R16_SNORM_EXT)),g===i.RED_INTEGER&&(U===i.UNSIGNED_BYTE&&(Z=i.R8UI),U===i.UNSIGNED_SHORT&&(Z=i.R16UI),U===i.UNSIGNED_INT&&(Z=i.R32UI),U===i.BYTE&&(Z=i.R8I),U===i.SHORT&&(Z=i.R16I),U===i.INT&&(Z=i.R32I)),g===i.RG&&(U===i.FLOAT&&(Z=i.RG32F),U===i.HALF_FLOAT&&(Z=i.RG16F),U===i.UNSIGNED_BYTE&&(Z=i.RG8),U===i.UNSIGNED_SHORT&&lt&&(Z=lt.RG16_EXT),U===i.SHORT&&lt&&(Z=lt.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(U===i.UNSIGNED_BYTE&&(Z=i.RG8UI),U===i.UNSIGNED_SHORT&&(Z=i.RG16UI),U===i.UNSIGNED_INT&&(Z=i.RG32UI),U===i.BYTE&&(Z=i.RG8I),U===i.SHORT&&(Z=i.RG16I),U===i.INT&&(Z=i.RG32I)),g===i.RGB_INTEGER&&(U===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),U===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),U===i.UNSIGNED_INT&&(Z=i.RGB32UI),U===i.BYTE&&(Z=i.RGB8I),U===i.SHORT&&(Z=i.RGB16I),U===i.INT&&(Z=i.RGB32I)),g===i.RGBA_INTEGER&&(U===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),U===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),U===i.UNSIGNED_INT&&(Z=i.RGBA32UI),U===i.BYTE&&(Z=i.RGBA8I),U===i.SHORT&&(Z=i.RGBA16I),U===i.INT&&(Z=i.RGBA32I)),g===i.RGB&&(U===i.UNSIGNED_SHORT&&lt&&(Z=lt.RGB16_EXT),U===i.SHORT&&lt&&(Z=lt.RGB16_SNORM_EXT),U===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),U===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),g===i.RGBA){let nt=rt?ds:qt.getTransfer(q);U===i.FLOAT&&(Z=i.RGBA32F),U===i.HALF_FLOAT&&(Z=i.RGBA16F),U===i.UNSIGNED_BYTE&&(Z=nt===ee?i.SRGB8_ALPHA8:i.RGBA8),U===i.UNSIGNED_SHORT&&lt&&(Z=lt.RGBA16_EXT),U===i.SHORT&&lt&&(Z=lt.RGBA16_SNORM_EXT),U===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),U===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function v(b,g){let U;return b?g===null||g===fn||g===qi?U=i.DEPTH24_STENCIL8:g===pn?U=i.DEPTH32F_STENCIL8:g===Yi&&(U=i.DEPTH24_STENCIL8,Rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===fn||g===qi?U=i.DEPTH_COMPONENT24:g===pn?U=i.DEPTH_COMPONENT32F:g===Yi&&(U=i.DEPTH_COMPONENT16),U}function S(b,g){return d(b)===!0||b.isFramebufferTexture&&b.minFilter!==ve&&b.minFilter!==Ae?Math.log2(Math.max(g.width,g.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?g.mipmaps.length:1}function F(b){let g=b.target;g.removeEventListener("dispose",F),D(g),g.isVideoTexture&&h.delete(g),g.isHTMLTexture&&p.delete(g)}function E(b){let g=b.target;g.removeEventListener("dispose",E),G(g)}function D(b){let g=n.get(b);if(g.__webglInit===void 0)return;let U=b.source,J=f.get(U);if(J){let q=J[g.__cacheKey];q.usedTimes--,q.usedTimes===0&&P(b),Object.keys(J).length===0&&f.delete(U)}n.remove(b)}function P(b){let g=n.get(b);i.deleteTexture(g.__webglTexture);let U=b.source,J=f.get(U);delete J[g.__cacheKey],a.memory.textures--}function G(b){let g=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(g.__webglFramebuffer[J]))for(let q=0;q<g.__webglFramebuffer[J].length;q++)i.deleteFramebuffer(g.__webglFramebuffer[J][q]);else i.deleteFramebuffer(g.__webglFramebuffer[J]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[J])}else{if(Array.isArray(g.__webglFramebuffer))for(let J=0;J<g.__webglFramebuffer.length;J++)i.deleteFramebuffer(g.__webglFramebuffer[J]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let J=0;J<g.__webglColorRenderbuffer.length;J++)g.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[J]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let U=b.textures;for(let J=0,q=U.length;J<q;J++){let rt=n.get(U[J]);rt.__webglTexture&&(i.deleteTexture(rt.__webglTexture),a.memory.textures--),n.remove(U[J])}n.remove(b)}let O=0;function A(){O=0}function y(){return O}function I(b){O=b}function H(){let b=O;return b>=s.maxTextures&&Rt("WebGLTextures: Trying to use "+(b+1)+" texture units while this GPU supports only "+s.maxTextures),O+=1,b}function V(b){let g=[];return g.push(b.wrapS),g.push(b.wrapT),g.push(b.wrapR||0),g.push(b.magFilter),g.push(b.minFilter),g.push(b.anisotropy),g.push(b.internalFormat),g.push(b.format),g.push(b.type),g.push(b.generateMipmaps),g.push(b.premultiplyAlpha),g.push(b.flipY),g.push(b.unpackAlignment),g.push(b.colorSpace),g.join()}function j(b,g){let U=n.get(b);if(b.isVideoTexture&&T(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&U.__version!==b.version){let J=b.image;if(J===null)Rt("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)Rt("WebGLRenderer: Texture marked for update but image is incomplete");else{Et(U,b,g);return}}else b.isExternalTexture&&(U.__webglTexture=b.sourceTexture?b.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,U.__webglTexture,i.TEXTURE0+g)}function K(b,g){let U=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&U.__version!==b.version){Et(U,b,g);return}else b.isExternalTexture&&(U.__webglTexture=b.sourceTexture?b.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,U.__webglTexture,i.TEXTURE0+g)}function Q(b,g){let U=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&U.__version!==b.version){Et(U,b,g);return}e.bindTexture(i.TEXTURE_3D,U.__webglTexture,i.TEXTURE0+g)}function it(b,g){let U=n.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&U.__version!==b.version){Y(U,b,g);return}e.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+g)}let vt={[Sr]:i.REPEAT,[xn]:i.CLAMP_TO_EDGE,[br]:i.MIRRORED_REPEAT},xt={[ve]:i.NEAREST,[Vc]:i.NEAREST_MIPMAP_NEAREST,[Fs]:i.NEAREST_MIPMAP_LINEAR,[Ae]:i.LINEAR,[ia]:i.LINEAR_MIPMAP_NEAREST,[jn]:i.LINEAR_MIPMAP_LINEAR},Kt={[Jc]:i.NEVER,[qc]:i.ALWAYS,[Wc]:i.LESS,[Va]:i.LEQUAL,[Xc]:i.EQUAL,[ka]:i.GEQUAL,[Qc]:i.GREATER,[Yc]:i.NOTEQUAL};function Ot(b,g){if(g.type===pn&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===Ae||g.magFilter===ia||g.magFilter===Fs||g.magFilter===jn||g.minFilter===Ae||g.minFilter===ia||g.minFilter===Fs||g.minFilter===jn)&&Rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,vt[g.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,vt[g.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,vt[g.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,xt[g.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,xt[g.minFilter]),g.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,Kt[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===ve||g.minFilter!==Fs&&g.minFilter!==jn||g.type===pn&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){let U=t.get("EXT_texture_filter_anisotropic");i.texParameterf(b,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function Vt(b,g){let U=!1;b.__webglInit===void 0&&(b.__webglInit=!0,g.addEventListener("dispose",F));let J=g.source,q=f.get(J);q===void 0&&(q={},f.set(J,q));let rt=V(g);if(rt!==b.__cacheKey){q[rt]===void 0&&(q[rt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,U=!0),q[rt].usedTimes++;let lt=q[b.__cacheKey];lt!==void 0&&(q[b.__cacheKey].usedTimes--,lt.usedTimes===0&&P(g)),b.__cacheKey=rt,b.__webglTexture=q[rt].texture}return U}function X(b,g,U){return Math.floor(Math.floor(b/U)/g)}function $(b,g,U,J){let rt=b.updateRanges;if(rt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,U,J,g.data);else{rt.sort((bt,ft)=>bt.start-ft.start);let lt=0;for(let bt=1;bt<rt.length;bt++){let ft=rt[lt],ht=rt[bt],Dt=ft.start+ft.count,Pt=X(ht.start,g.width,4),Ht=X(ft.start,g.width,4);ht.start<=Dt+1&&Pt===Ht&&X(ht.start+ht.count-1,g.width,4)===Pt?ft.count=Math.max(ft.count,ht.start+ht.count-ft.start):(++lt,rt[lt]=ht)}rt.length=lt+1;let Z=e.getParameter(i.UNPACK_ROW_LENGTH),nt=e.getParameter(i.UNPACK_SKIP_PIXELS),ct=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let bt=0,ft=rt.length;bt<ft;bt++){let ht=rt[bt],Dt=Math.floor(ht.start/4),Pt=Math.ceil(ht.count/4),Ht=Dt%g.width,L=Math.floor(Dt/g.width),ut=Pt,et=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Ht),e.pixelStorei(i.UNPACK_SKIP_ROWS,L),e.texSubImage2D(i.TEXTURE_2D,0,Ht,L,ut,et,U,J,g.data)}b.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Z),e.pixelStorei(i.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(i.UNPACK_SKIP_ROWS,ct)}}function Et(b,g,U){let J=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(J=i.TEXTURE_3D);let q=Vt(b,g),rt=g.source;e.bindTexture(J,b.__webglTexture,i.TEXTURE0+U);let lt=n.get(rt);if(rt.version!==lt.__version||q===!0){if(e.activeTexture(i.TEXTURE0+U),(typeof ImageBitmap!="undefined"&&g.image instanceof ImageBitmap)===!1){let et=qt.getPrimaries(qt.workingColorSpace),dt=g.colorSpace===wn?null:qt.getPrimaries(g.colorSpace),_t=g.colorSpace===wn||et===dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t)}e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let nt=m(g.image,!1,s.maxTextureSize);nt=Zt(g,nt);let ct=r.convert(g.format,g.colorSpace),bt=r.convert(g.type),ft=M(g.internalFormat,ct,bt,g.normalized,g.colorSpace,g.isVideoTexture);Ot(J,g);let ht,Dt=g.mipmaps,Pt=g.isVideoTexture!==!0,Ht=lt.__version===void 0||q===!0,L=rt.dataReady,ut=S(g,nt);if(g.isDepthTexture)ft=v(g.format===$n,g.type),Ht&&(Pt?e.texStorage2D(i.TEXTURE_2D,1,ft,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,ft,nt.width,nt.height,0,ct,bt,null));else if(g.isDataTexture)if(Dt.length>0){Pt&&Ht&&e.texStorage2D(i.TEXTURE_2D,ut,ft,Dt[0].width,Dt[0].height);for(let et=0,dt=Dt.length;et<dt;et++)ht=Dt[et],Pt?L&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,ht.width,ht.height,ct,bt,ht.data):e.texImage2D(i.TEXTURE_2D,et,ft,ht.width,ht.height,0,ct,bt,ht.data);g.generateMipmaps=!1}else Pt?(Ht&&e.texStorage2D(i.TEXTURE_2D,ut,ft,nt.width,nt.height),L&&$(g,nt,ct,bt)):e.texImage2D(i.TEXTURE_2D,0,ft,nt.width,nt.height,0,ct,bt,nt.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Pt&&Ht&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ut,ft,Dt[0].width,Dt[0].height,nt.depth);for(let et=0,dt=Dt.length;et<dt;et++)if(ht=Dt[et],g.format!==en)if(ct!==null)if(Pt){if(L)if(g.layerUpdates.size>0){let _t=al(ht.width,ht.height,g.format,g.type);for(let st of g.layerUpdates){let Tt=ht.data.subarray(st*_t/ht.data.BYTES_PER_ELEMENT,(st+1)*_t/ht.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,st,ht.width,ht.height,1,ct,Tt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,ht.width,ht.height,nt.depth,ct,ht.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,et,ft,ht.width,ht.height,nt.depth,0,ht.data,0,0);else Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pt?L&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,ht.width,ht.height,nt.depth,ct,bt,ht.data):e.texImage3D(i.TEXTURE_2D_ARRAY,et,ft,ht.width,ht.height,nt.depth,0,ct,bt,ht.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{Pt&&Ht&&e.texStorage2D(i.TEXTURE_2D,ut,ft,Dt[0].width,Dt[0].height);for(let et=0,dt=Dt.length;et<dt;et++)ht=Dt[et],g.format!==en?ct!==null?Pt?L&&e.compressedTexSubImage2D(i.TEXTURE_2D,et,0,0,ht.width,ht.height,ct,ht.data):e.compressedTexImage2D(i.TEXTURE_2D,et,ft,ht.width,ht.height,0,ht.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pt?L&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,ht.width,ht.height,ct,bt,ht.data):e.texImage2D(i.TEXTURE_2D,et,ft,ht.width,ht.height,0,ct,bt,ht.data)}else if(g.isDataArrayTexture)if(Pt){if(Ht&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ut,ft,nt.width,nt.height,nt.depth),L)if(g.layerUpdates.size>0){let et=al(nt.width,nt.height,g.format,g.type);for(let dt of g.layerUpdates){let _t=nt.data.subarray(dt*et/nt.data.BYTES_PER_ELEMENT,(dt+1)*et/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,dt,nt.width,nt.height,1,ct,bt,_t)}g.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,ct,bt,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,ft,nt.width,nt.height,nt.depth,0,ct,bt,nt.data);else if(g.isData3DTexture)Pt?(Ht&&e.texStorage3D(i.TEXTURE_3D,ut,ft,nt.width,nt.height,nt.depth),L&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,ct,bt,nt.data)):e.texImage3D(i.TEXTURE_3D,0,ft,nt.width,nt.height,nt.depth,0,ct,bt,nt.data);else if(g.isFramebufferTexture){if(Ht)if(Pt)e.texStorage2D(i.TEXTURE_2D,ut,ft,nt.width,nt.height);else{let et=nt.width,dt=nt.height;for(let _t=0;_t<ut;_t++)e.texImage2D(i.TEXTURE_2D,_t,ft,et,dt,0,ct,bt,null),et>>=1,dt>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){let et=i.canvas;if(et.hasAttribute("layoutsubtree")||et.setAttribute("layoutsubtree","true"),nt.parentNode!==et){et.appendChild(nt),p.add(g),et.onpaint=dt=>{let _t=dt.changedElements;for(let st of p)_t.includes(st.image)&&(st.needsUpdate=!0)},et.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,nt);else{let _t=i.RGBA,st=i.RGBA,Tt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,_t,st,Tt,nt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Dt.length>0){if(Pt&&Ht){let et=Jt(Dt[0]);e.texStorage2D(i.TEXTURE_2D,ut,ft,et.width,et.height)}for(let et=0,dt=Dt.length;et<dt;et++)ht=Dt[et],Pt?L&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,ct,bt,ht):e.texImage2D(i.TEXTURE_2D,et,ft,ct,bt,ht);g.generateMipmaps=!1}else if(Pt){if(Ht){let et=Jt(nt);e.texStorage2D(i.TEXTURE_2D,ut,ft,et.width,et.height)}L&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ct,bt,nt)}else e.texImage2D(i.TEXTURE_2D,0,ft,ct,bt,nt);d(g)&&B(J),lt.__version=rt.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function Y(b,g,U){if(g.image.length!==6)return;let J=Vt(b,g),q=g.source;e.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+U);let rt=n.get(q);if(q.version!==rt.__version||J===!0){e.activeTexture(i.TEXTURE0+U);let lt=qt.getPrimaries(qt.workingColorSpace),Z=g.colorSpace===wn?null:qt.getPrimaries(g.colorSpace),nt=g.colorSpace===wn||lt===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let ct=g.isCompressedTexture||g.image[0].isCompressedTexture,bt=g.image[0]&&g.image[0].isDataTexture,ft=[];for(let st=0;st<6;st++)!ct&&!bt?ft[st]=m(g.image[st],!0,s.maxCubemapSize):ft[st]=bt?g.image[st].image:g.image[st],ft[st]=Zt(g,ft[st]);let ht=ft[0],Dt=r.convert(g.format,g.colorSpace),Pt=r.convert(g.type),Ht=M(g.internalFormat,Dt,Pt,g.normalized,g.colorSpace),L=g.isVideoTexture!==!0,ut=rt.__version===void 0||J===!0,et=q.dataReady,dt=S(g,ht);Ot(i.TEXTURE_CUBE_MAP,g);let _t;if(ct){L&&ut&&e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Ht,ht.width,ht.height);for(let st=0;st<6;st++){_t=ft[st].mipmaps;for(let Tt=0;Tt<_t.length;Tt++){let At=_t[Tt];g.format!==en?Dt!==null?L?et&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Tt,0,0,At.width,At.height,Dt,At.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Tt,Ht,At.width,At.height,0,At.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Tt,0,0,At.width,At.height,Dt,Pt,At.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Tt,Ht,At.width,At.height,0,Dt,Pt,At.data)}}}else{if(_t=g.mipmaps,L&&ut){_t.length>0&&dt++;let st=Jt(ft[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Ht,st.width,st.height)}for(let st=0;st<6;st++)if(bt){L?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,ft[st].width,ft[st].height,Dt,Pt,ft[st].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Ht,ft[st].width,ft[st].height,0,Dt,Pt,ft[st].data);for(let Tt=0;Tt<_t.length;Tt++){let le=_t[Tt].image[st].image;L?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Tt+1,0,0,le.width,le.height,Dt,Pt,le.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Tt+1,Ht,le.width,le.height,0,Dt,Pt,le.data)}}else{L?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,Dt,Pt,ft[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Ht,Dt,Pt,ft[st]);for(let Tt=0;Tt<_t.length;Tt++){let At=_t[Tt];L?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Tt+1,0,0,Dt,Pt,At.image[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Tt+1,Ht,Dt,Pt,At.image[st])}}}d(g)&&B(i.TEXTURE_CUBE_MAP),rt.__version=q.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function tt(b,g,U,J,q,rt){let lt=r.convert(U.format,U.colorSpace),Z=r.convert(U.type),nt=M(U.internalFormat,lt,Z,U.normalized,U.colorSpace),ct=n.get(g),bt=n.get(U);if(bt.__renderTarget=g,!ct.__hasExternalTextures){let ft=Math.max(1,g.width>>rt),ht=Math.max(1,g.height>>rt);q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?e.texImage3D(q,rt,nt,ft,ht,g.depth,0,lt,Z,null):e.texImage2D(q,rt,nt,ft,ht,0,lt,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,b),pe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,q,bt.__webglTexture,0,re(g)):(q===i.TEXTURE_2D||q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,q,bt.__webglTexture,rt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function at(b,g,U){if(i.bindRenderbuffer(i.RENDERBUFFER,b),g.depthBuffer){let J=g.depthTexture,q=J&&J.isDepthTexture?J.type:null,rt=v(g.stencilBuffer,q),lt=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;pe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re(g),rt,g.width,g.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,re(g),rt,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,rt,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,b)}else{let J=g.textures;for(let q=0;q<J.length;q++){let rt=J[q],lt=r.convert(rt.format,rt.colorSpace),Z=r.convert(rt.type),nt=M(rt.internalFormat,lt,Z,rt.normalized,rt.colorSpace);pe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re(g),nt,g.width,g.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,re(g),nt,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,nt,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ft(b,g,U){let J=g.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,b),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let q=n.get(g.depthTexture);if(q.__renderTarget=g,(!q.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),J){if(q.__webglInit===void 0&&(q.__webglInit=!0,g.depthTexture.addEventListener("dispose",F)),q.__webglTexture===void 0){q.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Ot(i.TEXTURE_CUBE_MAP,g.depthTexture);let ct=r.convert(g.depthTexture.format),bt=r.convert(g.depthTexture.type),ft;g.depthTexture.format===Cn?ft=i.DEPTH_COMPONENT24:g.depthTexture.format===$n&&(ft=i.DEPTH24_STENCIL8);for(let ht=0;ht<6;ht++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,ft,g.width,g.height,0,ct,bt,null)}}else j(g.depthTexture,0);let rt=q.__webglTexture,lt=re(g),Z=J?i.TEXTURE_CUBE_MAP_POSITIVE_X+U:i.TEXTURE_2D,nt=g.depthTexture.format===$n?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===Cn)pe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,Z,rt,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,nt,Z,rt,0);else if(g.depthTexture.format===$n)pe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,Z,rt,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,nt,Z,rt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ot(b){let g=n.get(b),U=b.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==b.depthTexture){let J=b.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),J){let q=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,J.removeEventListener("dispose",q)};J.addEventListener("dispose",q),g.__depthDisposeCallback=q}g.__boundDepthTexture=J}if(b.depthTexture&&!g.__autoAllocateDepthBuffer)if(U)for(let J=0;J<6;J++)Ft(g.__webglFramebuffer[J],b,J);else{let J=b.texture.mipmaps;J&&J.length>0?Ft(g.__webglFramebuffer[0],b,0):Ft(g.__webglFramebuffer,b,0)}else if(U){g.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[J]),g.__webglDepthbuffer[J]===void 0)g.__webglDepthbuffer[J]=i.createRenderbuffer(),at(g.__webglDepthbuffer[J],b,!1);else{let q=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=g.__webglDepthbuffer[J];i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,rt)}}else{let J=b.texture.mipmaps;if(J&&J.length>0?e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),at(g.__webglDepthbuffer,b,!1);else{let q=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,rt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function It(b,g,U){let J=n.get(b);g!==void 0&&tt(J.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),U!==void 0&&ot(b)}function Nt(b){let g=b.texture,U=n.get(b),J=n.get(g);b.addEventListener("dispose",E);let q=b.textures,rt=b.isWebGLCubeRenderTarget===!0,lt=q.length>1;if(lt||(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=g.version,a.memory.textures++),rt){U.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(g.mipmaps&&g.mipmaps.length>0){U.__webglFramebuffer[Z]=[];for(let nt=0;nt<g.mipmaps.length;nt++)U.__webglFramebuffer[Z][nt]=i.createFramebuffer()}else U.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){U.__webglFramebuffer=[];for(let Z=0;Z<g.mipmaps.length;Z++)U.__webglFramebuffer[Z]=i.createFramebuffer()}else U.__webglFramebuffer=i.createFramebuffer();if(lt)for(let Z=0,nt=q.length;Z<nt;Z++){let ct=n.get(q[Z]);ct.__webglTexture===void 0&&(ct.__webglTexture=i.createTexture(),a.memory.textures++)}if(b.samples>0&&pe(b)===!1){U.__webglMultisampledFramebuffer=i.createFramebuffer(),U.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let Z=0;Z<q.length;Z++){let nt=q[Z];U.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,U.__webglColorRenderbuffer[Z]);let ct=r.convert(nt.format,nt.colorSpace),bt=r.convert(nt.type),ft=M(nt.internalFormat,ct,bt,nt.normalized,nt.colorSpace,b.isXRRenderTarget===!0),ht=re(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,ft,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,U.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(U.__webglDepthRenderbuffer=i.createRenderbuffer(),at(U.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(rt){e.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),Ot(i.TEXTURE_CUBE_MAP,g);for(let Z=0;Z<6;Z++)if(g.mipmaps&&g.mipmaps.length>0)for(let nt=0;nt<g.mipmaps.length;nt++)tt(U.__webglFramebuffer[Z][nt],b,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,nt);else tt(U.__webglFramebuffer[Z],b,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);d(g)&&B(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(lt){for(let Z=0,nt=q.length;Z<nt;Z++){let ct=q[Z],bt=n.get(ct),ft=i.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ft=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ft,bt.__webglTexture),Ot(ft,ct),tt(U.__webglFramebuffer,b,ct,i.COLOR_ATTACHMENT0+Z,ft,0),d(ct)&&B(ft)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(Z=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,J.__webglTexture),Ot(Z,g),g.mipmaps&&g.mipmaps.length>0)for(let nt=0;nt<g.mipmaps.length;nt++)tt(U.__webglFramebuffer[nt],b,g,i.COLOR_ATTACHMENT0,Z,nt);else tt(U.__webglFramebuffer,b,g,i.COLOR_ATTACHMENT0,Z,0);d(g)&&B(Z),e.unbindTexture()}b.depthBuffer&&ot(b)}function wt(b){let g=b.textures;for(let U=0,J=g.length;U<J;U++){let q=g[U];if(d(q)){let rt=w(b),lt=n.get(q).__webglTexture;e.bindTexture(rt,lt),B(rt),e.unbindTexture()}}}let Xt=[],ne=[];function oe(b){if(b.samples>0){if(pe(b)===!1){let g=b.textures,U=b.width,J=b.height,q=i.COLOR_BUFFER_BIT,rt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=n.get(b),Z=g.length>1;if(Z)for(let ct=0;ct<g.length;ct++)e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer);let nt=b.texture.mipmaps;nt&&nt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let ct=0;ct<g.length;ct++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(q|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(q|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ct]);let bt=n.get(g[ct]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,bt,0)}i.blitFramebuffer(0,0,U,J,0,0,U,J,q,i.NEAREST),l===!0&&(Xt.length=0,ne.length=0,Xt.push(i.COLOR_ATTACHMENT0+ct),b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&(Xt.push(rt),ne.push(rt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ne)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Xt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let ct=0;ct<g.length;ct++){e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ct]);let bt=n.get(g[ct]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,bt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&l){let g=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function re(b){return Math.min(s.maxSamples,b.samples)}function pe(b){let g=n.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function T(b){let g=a.render.frame;h.get(b)!==g&&(h.set(b,g),b.update())}function Zt(b,g){let U=b.colorSpace,J=b.format,q=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||U!==us&&U!==wn&&(qt.getTransfer(U)===ee?(J!==en||q!==ze)&&Rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Lt("WebGLTextures: Unsupported texture color space:",U)),g}function Jt(b){return typeof HTMLImageElement!="undefined"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame!="undefined"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=A,this.getTextureUnits=y,this.setTextureUnits=I,this.setTexture2D=j,this.setTexture2DArray=K,this.setTexture3D=Q,this.setTextureCube=it,this.rebindTextures=It,this.setupRenderTarget=Nt,this.updateRenderTargetMipmap=wt,this.updateMultisampleRenderTarget=oe,this.setupDepthRenderbuffer=ot,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=pe,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Jg(i,t){function e(n,s=wn){let r,a=qt.getTransfer(s);if(n===ze)return i.UNSIGNED_BYTE;if(n===ra)return i.UNSIGNED_SHORT_4_4_4_4;if(n===aa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Yo)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===qo)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Xo)return i.BYTE;if(n===Qo)return i.SHORT;if(n===Yi)return i.UNSIGNED_SHORT;if(n===sa)return i.INT;if(n===fn)return i.UNSIGNED_INT;if(n===pn)return i.FLOAT;if(n===mn)return i.HALF_FLOAT;if(n===Zo)return i.ALPHA;if(n===jo)return i.RGB;if(n===en)return i.RGBA;if(n===Cn)return i.DEPTH_COMPONENT;if(n===$n)return i.DEPTH_STENCIL;if(n===$o)return i.RED;if(n===oa)return i.RED_INTEGER;if(n===ti)return i.RG;if(n===la)return i.RG_INTEGER;if(n===ca)return i.RGBA_INTEGER;if(n===ws||n===Rs||n===Ps||n===Ls)if(a===ee)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ws)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Rs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ps)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ls)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ws)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Rs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ps)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ls)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ha||n===ua||n===da||n===fa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ha)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ua)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===da)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===fa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===pa||n===ma||n===ga||n===_a||n===Ea||n===Gs||n===xa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===pa||n===ma)return a===ee?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ga)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===_a)return r.COMPRESSED_R11_EAC;if(n===Ea)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Gs)return r.COMPRESSED_RG11_EAC;if(n===xa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ca||n===Ma||n===Ba||n===ya||n===va||n===Aa||n===Sa||n===ba||n===Da||n===Ia||n===Ta||n===Fa||n===wa||n===Ra)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ca)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ma)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ba)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ya)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===va)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Aa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Sa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ba)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Da)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ia)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ta)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Fa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===wa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ra)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Pa||n===La||n===Ga)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Pa)return a===ee?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===La)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ga)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Na||n===Oa||n===Ns||n===Ua)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Na)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Oa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ns)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ua)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Wg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xg=`
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

}`,Al=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new xs(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Ye({vertexShader:Wg,fragmentShader:Xg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ne(new Cs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Sl=class extends hn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,p=null,u=null,f=null,_=null,C=typeof XRWebGLBinding!="undefined",m=new Al,d={},B=e.getContextAttributes(),w=null,M=null,v=[],S=[],F=new Gt,E=null,D=null,P=new Te;P.viewport=new fe;let G=new Te;G.viewport=new fe;let O=[P,G],A=new jr,y=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let $=v[X];return $===void 0&&($=new Hi,v[X]=$),$.getTargetRaySpace()},this.getControllerGrip=function(X){let $=v[X];return $===void 0&&($=new Hi,v[X]=$),$.getGripSpace()},this.getHand=function(X){let $=v[X];return $===void 0&&($=new Hi,v[X]=$),$.getHandSpace()};function H(X){let $=S.indexOf(X.inputSource);if($===-1)return;let Et=v[$];Et!==void 0&&(Et.update(X.inputSource,X.frame,c||a),Et.dispatchEvent({type:X.type,data:X.inputSource}))}function V(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",j);for(let X=0;X<v.length;X++){let $=S[X];$!==null&&(S[X]=null,v[X].disconnect($))}y=null,I=null,m.reset();for(let X in d)delete d[X];if(t.setRenderTarget(w),f=null,u=null,p=null,s=null,M=null,Vt.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(F.width,F.height,!1),D!==null){let X=D.camera;X.fov=D.fov,X.zoom=D.zoom,X.updateProjectionMatrix(),D=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&Rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&Rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return p===null&&C&&(p=new XRWebGLBinding(s,e)),p},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(w=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",V),s.addEventListener("inputsourceschange",j),B.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(F),C&&"createProjectionLayer"in XRWebGLBinding.prototype){let Et=null,Y=null,tt=null;B.depth&&(tt=B.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Et=B.stencil?$n:Cn,Y=B.stencil?qi:fn);let at={colorFormat:e.RGBA8,depthFormat:tt,scaleFactor:r};p=this.getBinding(),u=p.createProjectionLayer(at),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),M=new ke(u.textureWidth,u.textureHeight,{format:en,type:ze,depthTexture:new Kn(u.textureWidth,u.textureHeight,Y,void 0,void 0,void 0,void 0,void 0,void 0,Et),stencilBuffer:B.stencil,colorSpace:t.outputColorSpace,samples:B.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let Et={antialias:B.antialias,alpha:!0,depth:B.depth,stencil:B.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,Et),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new ke(f.framebufferWidth,f.framebufferHeight,{format:en,type:ze,colorSpace:t.outputColorSpace,stencilBuffer:B.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Vt.setContext(s),Vt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(X){for(let $=0;$<X.removed.length;$++){let Et=X.removed[$],Y=S.indexOf(Et);Y>=0&&(S[Y]=null,v[Y].disconnect(Et))}for(let $=0;$<X.added.length;$++){let Et=X.added[$],Y=S.indexOf(Et);if(Y===-1){for(let at=0;at<v.length;at++)if(at>=S.length){S.push(Et),Y=at;break}else if(S[at]===null){S[at]=Et,Y=at;break}if(Y===-1)break}let tt=v[Y];tt&&tt.connect(Et)}}let K=new N,Q=new N;function it(X,$,Et){K.setFromMatrixPosition($.matrixWorld),Q.setFromMatrixPosition(Et.matrixWorld);let Y=K.distanceTo(Q),tt=$.projectionMatrix.elements,at=Et.projectionMatrix.elements,Ft=tt[14]/(tt[10]-1),ot=tt[14]/(tt[10]+1),It=(tt[9]+1)/tt[5],Nt=(tt[9]-1)/tt[5],wt=(tt[8]-1)/tt[0],Xt=(at[8]+1)/at[0],ne=Ft*wt,oe=Ft*Xt,re=Y/(-wt+Xt),pe=re*-wt;if($.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(pe),X.translateZ(re),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),tt[10]===-1)X.projectionMatrix.copy($.projectionMatrix),X.projectionMatrixInverse.copy($.projectionMatrixInverse);else{let T=Ft+re,Zt=ot+re,Jt=ne-pe,b=oe+(Y-pe),g=It*ot/Zt*T,U=Nt*ot/Zt*T;X.projectionMatrix.makePerspective(Jt,b,g,U,T,Zt),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function vt(X,$){$===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices($.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let $=X.near,Et=X.far;m.texture!==null&&(m.depthNear>0&&($=m.depthNear),m.depthFar>0&&(Et=m.depthFar)),A.near=G.near=P.near=$,A.far=G.far=P.far=Et,(y!==A.near||I!==A.far)&&(s.updateRenderState({depthNear:A.near,depthFar:A.far}),y=A.near,I=A.far),A.layers.mask=X.layers.mask|6,P.layers.mask=A.layers.mask&-5,G.layers.mask=A.layers.mask&-3;let Y=X.parent,tt=A.cameras;vt(A,Y);for(let at=0;at<tt.length;at++)vt(tt[at],Y);tt.length===2?it(A,P,G):A.projectionMatrix.copy(P.projectionMatrix),D===null&&X.isPerspectiveCamera&&(D={camera:X,fov:X.fov,zoom:X.zoom}),xt(X,A,Y)};function xt(X,$,Et){Et===null?X.matrix.copy($.matrixWorld):(X.matrix.copy(Et.matrixWorld),X.matrix.invert(),X.matrix.multiply($.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy($.projectionMatrix),X.projectionMatrixInverse.copy($.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Ni*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(X){l=X,u!==null&&(u.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(A)},this.getCameraTexture=function(X){return d[X]};let Kt=null;function Ot(X,$){if(h=$.getViewerPose(c||a),_=$,h!==null){let Et=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let Y=!1;Et.length!==A.cameras.length&&(A.cameras.length=0,Y=!0);for(let ot=0;ot<Et.length;ot++){let It=Et[ot],Nt=null;if(f!==null)Nt=f.getViewport(It);else{let Xt=p.getViewSubImage(u,It);Nt=Xt.viewport,ot===0&&(t.setRenderTargetTextures(M,Xt.colorTexture,Xt.depthStencilTexture),t.setRenderTarget(M))}let wt=O[ot];wt===void 0&&(wt=new Te,wt.layers.enable(ot),wt.viewport=new fe,O[ot]=wt),wt.matrix.fromArray(It.transform.matrix),wt.matrix.decompose(wt.position,wt.quaternion,wt.scale),wt.projectionMatrix.fromArray(It.projectionMatrix),wt.projectionMatrixInverse.copy(wt.projectionMatrix).invert(),wt.viewport.set(Nt.x,Nt.y,Nt.width,Nt.height),ot===0&&(A.matrix.copy(wt.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),Y===!0&&A.cameras.push(wt)}let tt=s.enabledFeatures;if(tt&&tt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&C){p=n.getBinding();let ot=p.getDepthInformation(Et[0]);ot&&ot.isValid&&ot.texture&&m.init(ot,s.renderState)}if(tt&&tt.includes("camera-access")&&C){t.state.unbindTexture(),p=n.getBinding();for(let ot=0;ot<Et.length;ot++){let It=Et[ot].camera;if(It){let Nt=d[It];Nt||(Nt=new xs,d[It]=Nt);let wt=p.getCameraImage(It);Nt.sourceTexture=wt}}}}for(let Et=0;Et<v.length;Et++){let Y=S[Et],tt=v[Et];Y!==null&&tt!==void 0&&tt.update(Y,$,c||a)}Kt&&Kt(X,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),_=null}let Vt=new bh;Vt.setAnimationLoop(Ot),this.setAnimationLoop=function(X){Kt=X},this.dispose=function(){}}},Qg=new de,Rh=new Ut;Rh.set(-1,0,0,0,1,0,0,0,1);function Yg(i,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,il(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,B,w,M){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(m,d):d.isMeshLambertMaterial?(r(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(m,d),p(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(m,d),u(m,d),d.isMeshPhysicalMaterial&&f(m,d,M)):d.isMeshMatcapMaterial?(r(m,d),_(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),C(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,B,w):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Oe&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Oe&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let B=t.get(d),w=B.envMap,M=B.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(Qg.makeRotationFromEuler(M)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Rh),m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,B,w){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*B,m.scale.value=w*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function p(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function u(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function f(m,d,B){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Oe&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.retroreflectivity>0&&(m.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=B.texture,m.transmissionSamplerSize.value.set(B.width,B.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,d){d.matcap&&(m.matcap.value=d.matcap)}function C(m,d){let B=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(B.matrixWorld),m.nearDistance.value=B.shadow.camera.near,m.farDistance.value=B.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function qg(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,v){let S=v.program;n.uniformBlockBinding(M,S)}function c(M,v){let S=s[M.id];S===void 0&&(m(M),S=h(M),s[M.id]=S,M.addEventListener("dispose",B));let F=v.program;n.updateUBOMapping(M,F);let E=t.render.frame;r[M.id]!==E&&(u(M),r[M.id]=E)}function h(M){let v=p();M.__bindingPointIndex=v;let S=i.createBuffer(),F=M.__size,E=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,F,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,S),S}function p(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Lt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){let v=s[M.id],S=M.uniforms,F=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let E=0,D=S.length;E<D;E++){let P=S[E];if(Array.isArray(P))for(let G=0,O=P.length;G<O;G++)f(P[G],E,G,F);else f(P,E,0,F)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,v,S,F){if(C(M,v,S,F)===!0){let E=M.__offset,D=M.value;if(Array.isArray(D)){let P=0;for(let G=0;G<D.length;G++){let O=D[G],A=d(O);_(O,M.__data,P),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(P+=A.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(D,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,E,M.__data)}}function _(M,v,S){typeof M=="number"||typeof M=="boolean"?v[0]=M:M.isMatrix3?(v[0]=M.elements[0],v[1]=M.elements[1],v[2]=M.elements[2],v[3]=0,v[4]=M.elements[3],v[5]=M.elements[4],v[6]=M.elements[5],v[7]=0,v[8]=M.elements[6],v[9]=M.elements[7],v[10]=M.elements[8],v[11]=0):ArrayBuffer.isView(M)?v.set(new M.constructor(M.buffer,M.byteOffset,v.length)):M.toArray(v,S)}function C(M,v,S,F){let E=M.value,D=v+"_"+S;if(F[D]===void 0)return typeof E=="number"||typeof E=="boolean"?F[D]=E:ArrayBuffer.isView(E)?F[D]=E.slice():F[D]=E.clone(),!0;{let P=F[D];if(typeof E=="number"||typeof E=="boolean"){if(P!==E)return F[D]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(P.equals(E)===!1)return P.copy(E),!0}}return!1}function m(M){let v=M.uniforms,S=0,F=16;for(let D=0,P=v.length;D<P;D++){let G=Array.isArray(v[D])?v[D]:[v[D]];for(let O=0,A=G.length;O<A;O++){let y=G[O],I=Array.isArray(y.value)?y.value:[y.value];for(let H=0,V=I.length;H<V;H++){let j=I[H],K=d(j),Q=S%F,it=Q%K.boundary,vt=Q+it;S+=it,vt!==0&&F-vt<K.storage&&(S+=F-vt),y.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),y.__offset=S,S+=K.storage}}}let E=S%F;return E>0&&(S+=F-E),M.__size=S,M.__cache={},this}function d(M){let v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?Rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(v.boundary=16,v.storage=M.byteLength):Rt("WebGLRenderer: Unsupported uniform value type.",M),v}function B(M){let v=M.target;v.removeEventListener("dispose",B);let S=a.indexOf(v.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function w(){for(let M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:w}}var Zg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Bn=null;function jg(){return Bn===null&&(Bn=new wr(Zg,16,16,ti,mn),Bn.name="DFG_LUT",Bn.minFilter=Ae,Bn.magFilter=Ae,Bn.wrapS=xn,Bn.wrapT=xn,Bn.generateMipmaps=!1,Bn.needsUpdate=!0),Bn}var Xa=class{constructor(t={}){let{canvas:e=jc(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:f=ze}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;let C=f,m=new Set([ca,la,oa]),d=new Set([ze,fn,Yi,qi,ra,aa]),B=new Uint32Array(4),w=new Int32Array(4),M=new N,v=null,S=null,F=[],E=[],D=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=dn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,G=!1,O=null,A=null,y=null,I=null;this._outputColorSpace=Ie;let H=0,V=0,j=null,K=-1,Q=null,it=new fe,vt=new fe,xt=null,Kt=new Yt(0),Ot=0,Vt=e.width,X=e.height,$=1,Et=null,Y=null,tt=new fe(0,0,Vt,X),at=new fe(0,0,Vt,X),Ft=!1,ot=new Vi,It=!1,Nt=!1,wt=new de,Xt=new N,ne=new fe,oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},re=!1;function pe(){return j===null?$:1}let T=n;function Zt(x,R){return e.getContext(x,R)}let Jt,b,g,U,J,q,rt,lt,Z,nt,ct,bt,ft,ht,Dt,Pt,Ht,L,ut,et,dt,_t,st;try{let x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",le,!1),e.addEventListener("webglcontextrestored",$t,!1),e.addEventListener("webglcontextcreationerror",sn,!1),T===null){let R="webgl2";if(T=Zt(R,x),T===null)throw Zt(R)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Tt()}catch(x){throw e.removeEventListener("webglcontextlost",le,!1),e.removeEventListener("webglcontextrestored",$t,!1),e.removeEventListener("webglcontextcreationerror",sn,!1),Lt("WebGLRenderer: "+x.message),x}function Tt(){Jt=new rm(T),Jt.init(),dt=new Jg(T,Jt),b=new Yp(T,Jt,t,dt),g=new zg(T,Jt),b.reversedDepthBuffer&&u&&g.buffers.depth.setReversed(!0),A=T.createFramebuffer(),y=T.createFramebuffer(),I=T.createFramebuffer(),U=new lm(T),J=new Ig,q=new Kg(T,Jt,g,J,b,dt,U),rt=new sm(P),lt=new cd(T),_t=new Xp(T,lt),Z=new am(T,lt,U,_t),nt=new hm(T,Z,lt,_t,U),L=new cm(T,b,q),Dt=new qp(J),ct=new Dg(P,rt,Jt,b,_t,Dt),bt=new Yg(P,J),ft=new Fg,ht=new Ng(Jt),Ht=new Wp(P,rt,g,nt,_,l),Pt=new kg(P,nt,b),st=new qg(T,U,b,g),ut=new Qp(T,Jt,U),et=new om(T,Jt,U),U.programs=ct.programs,P.capabilities=b,P.extensions=Jt,P.properties=J,P.renderLists=ft,P.shadowMap=Pt,P.state=g,P.info=U}C!==ze&&(D=new dm(C,e.width,e.height,o,s,r));let At=new Sl(P,T);this.xr=At,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){let x=Jt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=Jt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(x){x!==void 0&&($=x,this.setSize(Vt,X,!1))},this.getSize=function(x){return x.set(Vt,X)},this.setSize=function(x,R,W=!0){if(At.isPresenting){Rt("WebGLRenderer: Can't change size while VR device is presenting.");return}Vt=x,X=R,e.width=Math.floor(x*$),e.height=Math.floor(R*$),W===!0&&(e.style.width=x+"px",e.style.height=R+"px"),D!==null&&D.setSize(e.width,e.height),this.setViewport(0,0,x,R)},this.getDrawingBufferSize=function(x){return x.set(Vt*$,X*$).floor()},this.setDrawingBufferSize=function(x,R,W){Vt=x,X=R,$=W,e.width=Math.floor(x*W),e.height=Math.floor(R*W),this.setViewport(0,0,x,R)},this.setEffects=function(x){if(C===ze){Lt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let R=0;R<x.length;R++)if(x[R].isOutputPass===!0){Rt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}D.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(it)},this.getViewport=function(x){return x.copy(tt)},this.setViewport=function(x,R,W,k){x.isVector4?tt.set(x.x,x.y,x.z,x.w):tt.set(x,R,W,k),g.viewport(it.copy(tt).multiplyScalar($).round())},this.getScissor=function(x){return x.copy(at)},this.setScissor=function(x,R,W,k){x.isVector4?at.set(x.x,x.y,x.z,x.w):at.set(x,R,W,k),g.scissor(vt.copy(at).multiplyScalar($).round())},this.getScissorTest=function(){return Ft},this.setScissorTest=function(x){g.setScissorTest(Ft=x)},this.setOpaqueSort=function(x){Et=x},this.setTransparentSort=function(x){Y=x},this.getClearColor=function(x){return x.copy(Ht.getClearColor())},this.setClearColor=function(){Ht.setClearColor(...arguments)},this.getClearAlpha=function(){return Ht.getClearAlpha()},this.setClearAlpha=function(){Ht.setClearAlpha(...arguments)},this.clear=function(x=!0,R=!0,W=!0){let k=0;if(x){let z=!1;if(j!==null){let gt=j.texture.format;z=m.has(gt)}if(z){let gt=j.texture.type,Mt=d.has(gt),mt=Ht.getClearColor(),Bt=Ht.getClearAlpha(),St=mt.r,kt=mt.g,Qt=mt.b;Mt?(B[0]=St,B[1]=kt,B[2]=Qt,B[3]=Bt,T.clearBufferuiv(T.COLOR,0,B)):(w[0]=St,w[1]=kt,w[2]=Qt,w[3]=Bt,T.clearBufferiv(T.COLOR,0,w))}else k|=T.COLOR_BUFFER_BIT}R&&(k|=T.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(k|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&T.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(x){x.setRenderer(this),O=x},this.dispose=function(){e.removeEventListener("webglcontextlost",le,!1),e.removeEventListener("webglcontextrestored",$t,!1),e.removeEventListener("webglcontextcreationerror",sn,!1),Ht.dispose(),ft.dispose(),ht.dispose(),J.dispose(),rt.dispose(),nt.dispose(),_t.dispose(),st.dispose(),ct.dispose(),At.dispose(),At.removeEventListener("sessionstart",Ll),At.removeEventListener("sessionend",Gl),si.stop()};function le(x){x.preventDefault(),el("WebGLRenderer: Context Lost."),G=!0}function $t(){el("WebGLRenderer: Context Restored."),G=!1;let x=U.autoReset,R=Pt.enabled,W=Pt.autoUpdate,k=Pt.needsUpdate,z=Pt.type;Tt(),U.autoReset=x,Pt.enabled=R,Pt.autoUpdate=W,Pt.needsUpdate=k,Pt.type=z}function sn(x){Lt("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function gn(x){let R=x.target;R.removeEventListener("dispose",gn),ru(R)}function ru(x){au(x),J.remove(x)}function au(x){let R=J.get(x).programs;R!==void 0&&(R.forEach(function(W){ct.releaseProgram(W)}),x.isShaderMaterial&&ct.releaseShaderCache(x))}this.renderBufferDirect=function(x,R,W,k,z,gt){R===null&&(R=oe);let Mt=z.isMesh&&z.matrixWorld.determinantAffine()<0,mt=cu(x,R,W,k,z);g.setMaterial(k,Mt);let Bt=W.index,St=1;if(k.wireframe===!0){if(Bt=Z.getWireframeAttribute(W),Bt===void 0)return;St=2}let kt=W.drawRange,Qt=W.attributes.position,yt=kt.start*St,te=(kt.start+kt.count)*St;gt!==null&&(yt=Math.max(yt,gt.start*St),te=Math.min(te,(gt.start+gt.count)*St)),Bt!==null?(yt=Math.max(yt,0),te=Math.min(te,Bt.count)):Qt!=null&&(yt=Math.max(yt,0),te=Math.min(te,Qt.count));let _e=te-yt;if(_e<0||_e===1/0)return;_t.setup(z,k,mt,W,Bt);let he,ae=ut;if(Bt!==null&&(he=lt.get(Bt),ae=et,ae.setIndex(he)),z.isMesh)k.wireframe===!0?(g.setLineWidth(k.wireframeLinewidth*pe()),ae.setMode(T.LINES)):ae.setMode(T.TRIANGLES);else if(z.isLine){let Se=k.linewidth;Se===void 0&&(Se=1),g.setLineWidth(Se*pe()),z.isLineSegments?ae.setMode(T.LINES):z.isLineLoop?ae.setMode(T.LINE_LOOP):ae.setMode(T.LINE_STRIP)}else z.isPoints?ae.setMode(T.POINTS):z.isSprite&&ae.setMode(T.TRIANGLES);if(z.isBatchedMesh)if(Jt.get("WEBGL_multi_draw"))ae.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let Se=z._multiDrawStarts,Ct=z._multiDrawCounts,Pe=z._multiDrawCount,jt=Bt?lt.get(Bt).bytesPerElement:1,$e=J.get(k).currentProgram.getUniforms();for(let _n=0;_n<Pe;_n++)$e.setValue(T,"_gl_DrawID",_n),ae.render(Se[_n]/jt,Ct[_n])}else if(z.isInstancedMesh)ae.renderInstances(yt,_e,z.count);else if(W.isInstancedBufferGeometry){let Se=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Ct=Math.min(W.instanceCount,Se);ae.renderInstances(yt,_e,Ct)}else ae.render(yt,_e)};function Pl(x,R,W,k){O!==null&&x.isNodeMaterial&&O.setObject(k,x),It===!0&&Dt.setState(x,W,!1),x.transparent===!0&&x.side===Ze&&x.forceSinglePass===!1?(x.side=Oe,x.needsUpdate=!0,Ys(x,R,k),x.side=qn,x.needsUpdate=!0,Ys(x,R,k),x.side=Ze):Ys(x,R,k)}this.compile=function(x,R,W=null){W===null&&(W=x),O!==null&&O.renderStart(x,R,W),S=ht.get(W),S.init(R),E.push(S),W.traverseVisible(function(z){z.isLight&&z.layers.test(R.layers)&&(S.pushLight(z),z.castShadow&&S.pushShadow(z))}),x!==W&&x.traverseVisible(function(z){z.isLight&&z.layers.test(R.layers)&&(S.pushLight(z),z.castShadow&&S.pushShadow(z))}),S.setupLights(),O!==null&&O.updateLights(S.state.lightsArray),Nt=this.localClippingEnabled,It=Dt.init(this.clippingPlanes,Nt),It===!0&&Dt.setGlobalState(this.clippingPlanes,R),O!==null&&Pt.render(S.state.shadowsArray,W,R);let k=new Set;return x.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let gt=z.material;if(gt)if(Array.isArray(gt))for(let Mt=0;Mt<gt.length;Mt++){let mt=gt[Mt];Pl(mt,W,R,z),k.add(mt)}else Pl(gt,W,R,z),k.add(gt)}),S=E.pop(),O!==null&&O.renderEnd(),k},this.compileAsync=function(x,R,W=null){let k=this.compile(x,R,W);return new Promise(z=>{function gt(){if(k.forEach(function(Mt){let Bt=J.get(Mt).currentProgram;(Bt===void 0||Bt.isReady())&&k.delete(Mt)}),k.size===0){z(x);return}setTimeout(gt,10)}Jt.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let to=null;function ou(x){to&&to(x)}function Ll(){si.stop()}function Gl(){si.start()}let si=new bh;si.setAnimationLoop(ou),typeof self!="undefined"&&si.setContext(self),this.setAnimationLoop=function(x){to=x,At.setAnimationLoop(x),x===null?si.stop():si.start()},At.addEventListener("sessionstart",Ll),At.addEventListener("sessionend",Gl),this.render=function(x,R){if(R!==void 0&&R.isCamera!==!0){Lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;O!==null&&O.renderStart(x,R);let W=At.enabled===!0&&At.isPresenting===!0,k=D!==null&&(j===null||W)&&D.begin(P,j);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),R.parent===null&&R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),At.enabled===!0&&At.isPresenting===!0&&(D===null||D.isCompositing()===!1)&&(At.cameraAutoUpdate===!0&&At.updateCamera(R),R=At.getCamera()),x.isScene===!0&&x.onBeforeRender(P,x,R,j),S=ht.get(x,E.length),S.init(R),S.state.textureUnits=q.getTextureUnits(),E.push(S),wt.multiplyMatrices(R.projectionMatrix,R.matrixWorldInverse),ot.setFromProjectionMatrix(wt,ln,R.reversedDepth),Nt=this.localClippingEnabled,It=Dt.init(this.clippingPlanes,Nt),v=ft.get(x,F.length),v.init(),F.push(v),At.enabled===!0&&At.isPresenting===!0){let Mt=P.xr.getDepthSensingMesh();Mt!==null&&eo(Mt,R,-1/0,P.sortObjects)}eo(x,R,0,P.sortObjects),v.finish(),O!==null&&O.updateLights(S.state.lightsArray),P.sortObjects===!0&&v.sort(Et,Y),re=At.enabled===!1||At.isPresenting===!1||At.hasDepthSensing()===!1,re&&Ht.addToRenderList(v,x),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),It===!0&&Dt.beginShadows();let z=S.state.shadowsArray;if(Pt.render(z,x,R),It===!0&&Dt.endShadows(),(k&&D.hasRenderPass())===!1){let Mt=v.opaque,mt=v.transmissive;if(S.setupLights(),R.isArrayCamera){let Bt=R.cameras;if(mt.length>0)for(let St=0,kt=Bt.length;St<kt;St++){let Qt=Bt[St];Ol(Mt,mt,x,Qt)}re&&Ht.render(x);for(let St=0,kt=Bt.length;St<kt;St++){let Qt=Bt[St];Nl(v,x,Qt,Qt.viewport)}}else mt.length>0&&Ol(Mt,mt,x,R),re&&Ht.render(x),Nl(v,x,R)}j!==null&&V===0&&(q.updateMultisampleRenderTarget(j),q.updateRenderTargetMipmap(j)),k&&D.end(P),x.isScene===!0&&x.onAfterRender(P,x,R),_t.resetDefaultState(),K=-1,Q=null,E.pop(),E.length>0?(S=E[E.length-1],q.setTextureUnits(S.state.textureUnits),It===!0&&Dt.setGlobalState(P.clippingPlanes,S.state.camera)):S=null,F.pop(),F.length>0?v=F[F.length-1]:v=null,O!==null&&O.renderEnd()};function eo(x,R,W,k){if(x.visible===!1)return;if(x.layers.test(R.layers)){if(x.isGroup)W=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(R);else if(x.isLightProbeGrid)S.pushLightProbeGrid(x);else if(x.isLight)S.pushLight(x),x.castShadow&&S.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||x.intersectsFrustum(ot)){k&&ne.setFromMatrixPosition(x.matrixWorld).applyMatrix4(wt);let Mt=nt.update(x),mt=x.material;mt.visible&&v.push(x,Mt,mt,W,ne.z,null,R)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||x.intersectsFrustum(ot))){let Mt=nt.update(x),mt=x.material;if(k&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),ne.copy(x.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),ne.copy(Mt.boundingSphere.center)),ne.applyMatrix4(x.matrixWorld).applyMatrix4(wt)),Array.isArray(mt)){let Bt=Mt.groups;for(let St=0,kt=Bt.length;St<kt;St++){let Qt=Bt[St],yt=mt[Qt.materialIndex];yt&&yt.visible&&v.push(x,Mt,yt,W,ne.z,Qt,R)}}else mt.visible&&v.push(x,Mt,mt,W,ne.z,null,R)}}let gt=x.children;for(let Mt=0,mt=gt.length;Mt<mt;Mt++)eo(gt[Mt],R,W,k)}function Nl(x,R,W,k){let{opaque:z,transmissive:gt,transparent:Mt}=x;S.setupLightsView(W),It===!0&&Dt.setGlobalState(P.clippingPlanes,W),k&&g.viewport(it.copy(k)),z.length>0&&Qs(z,R,W),gt.length>0&&Qs(gt,R,W),Mt.length>0&&Qs(Mt,R,W),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function Ol(x,R,W,k){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[k.id]===void 0){let yt=Jt.has("EXT_color_buffer_half_float")||Jt.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[k.id]=new ke(1,1,{generateMipmaps:!0,type:yt?mn:ze,minFilter:jn,samples:Math.max(4,b.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:qt.workingColorSpace})}let gt=S.state.transmissionRenderTarget[k.id],Mt=k.viewport||it;gt.setSize(Mt.z*P.transmissionResolutionScale,Mt.w*P.transmissionResolutionScale);let mt=P.getRenderTarget(),Bt=P.getActiveCubeFace(),St=P.getActiveMipmapLevel();P.setRenderTarget(gt),P.getClearColor(Kt),Ot=P.getClearAlpha(),Ot<1&&P.setClearColor(16777215,.5),P.clear(),re&&Ht.render(W);let kt=P.toneMapping;P.toneMapping=dn;let Qt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),S.setupLightsView(k),It===!0&&Dt.setGlobalState(P.clippingPlanes,k),Qs(x,W,k),q.updateMultisampleRenderTarget(gt),q.updateRenderTargetMipmap(gt),Jt.has("WEBGL_multisampled_render_to_texture")===!1){let yt=!1;for(let te=0,_e=R.length;te<_e;te++){let he=R[te],{object:ae,geometry:Se,material:Ct,group:Pe}=he;if(Ct.side===Ze&&ae.layers.test(k.layers)){let jt=Ct.side;Ct.side=Oe,Ct.needsUpdate=!0,Ul(ae,W,k,Se,Ct,Pe),Ct.side=jt,Ct.needsUpdate=!0,yt=!0}}yt===!0&&(q.updateMultisampleRenderTarget(gt),q.updateRenderTargetMipmap(gt))}P.setRenderTarget(mt,Bt,St),P.setClearColor(Kt,Ot),Qt!==void 0&&(k.viewport=Qt),P.toneMapping=kt}function Qs(x,R,W){let k=R.isScene===!0?R.overrideMaterial:null;for(let z=0,gt=x.length;z<gt;z++){let Mt=x[z],{object:mt,geometry:Bt,group:St}=Mt,kt=Mt.material;kt.allowOverride===!0&&k!==null&&(kt=k),mt.layers.test(W.layers)&&Ul(mt,R,W,Bt,kt,St)}}function Ul(x,R,W,k,z,gt){O!==null&&z.isNodeMaterial&&O.setObject(x,z),x.onBeforeRender(P,R,W,k,z,gt),x.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),z.onBeforeRender(P,R,W,k,x,gt),z.transparent===!0&&z.side===Ze&&z.forceSinglePass===!1?(z.side=Oe,z.needsUpdate=!0,P.renderBufferDirect(W,R,k,z,x,gt),z.side=qn,z.needsUpdate=!0,P.renderBufferDirect(W,R,k,z,x,gt),z.side=Ze):P.renderBufferDirect(W,R,k,z,x,gt),x.onAfterRender(P,R,W,k,z,gt)}function Ys(x,R,W){R.isScene!==!0&&(R=oe);let k=J.get(x),z=S.state.lights,gt=S.state.shadowsArray,Mt=z.state.version,mt=ct.getParameters(x,z.state,gt,R,W,S.state.lightProbeGridArray),Bt=ct.getProgramCacheKey(mt),St=k.programs;k.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,k.fog=R.fog;let kt=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;k.envMap=rt.get(x.envMap||k.environment,kt),k.envMapRotation=k.environment!==null&&x.envMap===null?R.environmentRotation:x.envMapRotation,St===void 0&&(x.addEventListener("dispose",gn),St=new Map,k.programs=St);let Qt=St.get(Bt);if(Qt!==void 0){if(k.currentProgram===Qt&&k.lightsStateVersion===Mt)return Vl(x,mt),Qt}else mt.uniforms=ct.getUniforms(x),O!==null&&x.isNodeMaterial&&O.build(x,W,mt),x.onBeforeCompile(mt,P),Qt=ct.acquireProgram(mt,Bt),St.set(Bt,Qt),k.uniforms=mt.uniforms;let yt=k.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(yt.clippingPlanes=Dt.uniform),Vl(x,mt),k.needsLights=uu(x),k.lightsStateVersion=Mt,k.needsLights&&(yt.ambientLightColor.value=z.state.ambient,yt.lightProbe.value=z.state.probe,yt.sunLights.value=z.state.sun,yt.sunLightShadows.value=z.state.sunShadow,yt.directionalLights.value=z.state.directional,yt.directionalLightShadows.value=z.state.directionalShadow,yt.spotLights.value=z.state.spot,yt.spotLightShadows.value=z.state.spotShadow,yt.rectAreaLights.value=z.state.rectArea,yt.ltc_1.value=z.state.rectAreaLTC1,yt.ltc_2.value=z.state.rectAreaLTC2,yt.pointLights.value=z.state.point,yt.pointLightShadows.value=z.state.pointShadow,yt.hemisphereLights.value=z.state.hemi,yt.sunShadowMatrix.value=z.state.sunShadowMatrix,yt.sunShadowCascade.value=z.state.sunShadowCascade,yt.directionalShadowMatrix.value=z.state.directionalShadowMatrix,yt.spotLightMatrix.value=z.state.spotLightMatrix,yt.spotLightMap.value=z.state.spotLightMap,yt.pointShadowMatrix.value=z.state.pointShadowMatrix),k.lightProbeGrid=S.state.lightProbeGridArray.length>0,k.currentProgram=Qt,k.uniformsList=null,Qt}function Hl(x){if(x.uniformsList===null){let R=x.currentProgram.getUniforms();x.uniformsList=ts.seqWithValue(R.seq,x.uniforms)}return x.uniformsList}function Vl(x,R){let W=J.get(x);W.outputColorSpace=R.outputColorSpace,W.batching=R.batching,W.batchingColor=R.batchingColor,W.instancing=R.instancing,W.instancingColor=R.instancingColor,W.instancingMorph=R.instancingMorph,W.skinning=R.skinning,W.morphTargets=R.morphTargets,W.morphNormals=R.morphNormals,W.morphColors=R.morphColors,W.morphTargetsCount=R.morphTargetsCount,W.numClippingPlanes=R.numClippingPlanes,W.numIntersection=R.numClipIntersection,W.vertexAlphas=R.vertexAlphas,W.vertexTangents=R.vertexTangents,W.toneMapping=R.toneMapping}function lu(x,R){if(x.length===0)return null;if(x.length===1)return x[0].texture!==null?x[0]:null;M.setFromMatrixPosition(R.matrixWorld);for(let W=0,k=x.length;W<k;W++){let z=x[W];if(z.texture!==null&&z.boundingBox.containsPoint(M))return z}return null}function cu(x,R,W,k,z){R.isScene!==!0&&(R=oe),q.resetTextureUnits();let gt=R.fog,Mt=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?R.environment:null,mt=j===null?P.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:qt.workingColorSpace,Bt=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,St=rt.get(k.envMap||Mt,Bt),kt=k.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Qt=!!W.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),yt=!!W.morphAttributes.position,te=!!W.morphAttributes.normal,_e=!!W.morphAttributes.color,he=dn;k.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(he=P.toneMapping);let ae=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Se=ae!==void 0?ae.length:0,Ct=J.get(k),Pe=S.state.lights;if(It===!0&&(Nt===!0||x!==Q)){let ce=x===Q&&k.id===K;Dt.setState(k,x,ce)}let jt=!1;k.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==Pe.state.version||Ct.outputColorSpace!==mt||z.isBatchedMesh&&Ct.batching===!1||!z.isBatchedMesh&&Ct.batching===!0||z.isBatchedMesh&&Ct.batchingColor===!0&&z._colorsTexture===null||z.isBatchedMesh&&Ct.batchingColor===!1&&z._colorsTexture!==null||z.isInstancedMesh&&Ct.instancing===!1||!z.isInstancedMesh&&Ct.instancing===!0||z.isSkinnedMesh&&Ct.skinning===!1||!z.isSkinnedMesh&&Ct.skinning===!0||z.isInstancedMesh&&Ct.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ct.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Ct.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Ct.instancingMorph===!1&&z.morphTexture!==null||Ct.envMap!==St||k.fog===!0&&Ct.fog!==gt||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==Dt.numPlanes||Ct.numIntersection!==Dt.numIntersection)||Ct.vertexAlphas!==kt||Ct.vertexTangents!==Qt||Ct.morphTargets!==yt||Ct.morphNormals!==te||Ct.morphColors!==_e||Ct.toneMapping!==he||Ct.morphTargetsCount!==Se||!!Ct.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(jt=!0):(jt=!0,Ct.__version=k.version);let $e=Ct.currentProgram;jt===!0&&($e=Ys(k,R,z),O&&k.isNodeMaterial&&O.onUpdateProgram(k,$e,Ct));let _n=!1,Rn=!1,_i=!1,se=$e.getUniforms(),ge=Ct.uniforms;if(g.useProgram($e.program)&&(_n=!0,Rn=!0,_i=!0),k.id!==K&&(K=k.id,Rn=!0),Ct.needsLights){let ce=lu(S.state.lightProbeGridArray,z);Ct.lightProbeGrid!==ce&&(Ct.lightProbeGrid=ce,Rn=!0)}if(_n||Q!==x){g.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),se.setValue(T,"projectionMatrix",x.projectionMatrix),se.setValue(T,"viewMatrix",x.matrixWorldInverse);let Ln=se.map.cameraPosition;Ln!==void 0&&Ln.setValue(T,Xt.setFromMatrixPosition(x.matrixWorld)),b.logarithmicDepthBuffer&&se.setValue(T,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&se.setValue(T,"isOrthographic",x.isOrthographicCamera===!0),Q!==x&&(Q=x,Rn=!0,_i=!0)}if(Ct.needsLights&&(Pe.state.sunShadowMap.length>0&&se.setValue(T,"sunShadowMap",Pe.state.sunShadowMap,q),Pe.state.directionalShadowMap.length>0&&se.setValue(T,"directionalShadowMap",Pe.state.directionalShadowMap,q),Pe.state.spotShadowMap.length>0&&se.setValue(T,"spotShadowMap",Pe.state.spotShadowMap,q),Pe.state.pointShadowMap.length>0&&se.setValue(T,"pointShadowMap",Pe.state.pointShadowMap,q)),z.isSkinnedMesh){se.setOptional(T,z,"bindMatrix"),se.setOptional(T,z,"bindMatrixInverse");let ce=z.skeleton;ce&&(ce.boneTexture===null&&ce.computeBoneTexture(),se.setValue(T,"boneTexture",ce.boneTexture,q))}z.isBatchedMesh&&(se.setOptional(T,z,"batchingTexture"),se.setValue(T,"batchingTexture",z._matricesTexture,q),se.setOptional(T,z,"batchingIdTexture"),se.setValue(T,"batchingIdTexture",z._indirectTexture,q),se.setOptional(T,z,"batchingColorTexture"),z._colorsTexture!==null&&se.setValue(T,"batchingColorTexture",z._colorsTexture,q));let Pn=W.morphAttributes;if((Pn.position!==void 0||Pn.normal!==void 0||Pn.color!==void 0)&&L.update(z,W,$e),(Rn||Ct.receiveShadow!==z.receiveShadow)&&(Ct.receiveShadow=z.receiveShadow,se.setValue(T,"receiveShadow",z.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&R.environment!==null&&(ge.envMapIntensity.value=R.environmentIntensity),ge.dfgLUT!==void 0&&(ge.dfgLUT.value=jg()),Rn){if(se.setValue(T,"toneMappingExposure",P.toneMappingExposure),Ct.needsLights&&hu(ge,_i),gt&&k.fog===!0&&bt.refreshFogUniforms(ge,gt),bt.refreshMaterialUniforms(ge,k,$,X,S.state.transmissionRenderTarget[x.id]),Ct.needsLights&&Ct.lightProbeGrid){let ce=Ct.lightProbeGrid;ge.probesSH.value=ce.texture,ge.probesMin.value.copy(ce.boundingBox.min),ge.probesMax.value.copy(ce.boundingBox.max),ge.probesResolution.value.copy(ce.resolution)}ts.upload(T,Hl(Ct),ge,q)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(ts.upload(T,Hl(Ct),ge,q),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&se.setValue(T,"center",z.center),se.setValue(T,"modelViewMatrix",z.modelViewMatrix),se.setValue(T,"normalMatrix",z.normalMatrix),se.setValue(T,"modelMatrix",z.matrixWorld),k.uniformsGroups!==void 0){let ce=k.uniformsGroups;for(let Ln=0,Ei=ce.length;Ln<Ei;Ln++){let zl=ce[Ln];st.update(zl,$e),st.bind(zl,$e)}}return $e}function hu(x,R){x.ambientLightColor.needsUpdate=R,x.lightProbe.needsUpdate=R,x.sunLights.needsUpdate=R,x.sunLightShadows.needsUpdate=R,x.directionalLights.needsUpdate=R,x.directionalLightShadows.needsUpdate=R,x.pointLights.needsUpdate=R,x.pointLightShadows.needsUpdate=R,x.spotLights.needsUpdate=R,x.spotLightShadows.needsUpdate=R,x.rectAreaLights.needsUpdate=R,x.hemisphereLights.needsUpdate=R}function uu(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(x,R,W){let k=J.get(x);k.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),J.get(x.texture).__webglTexture=R,J.get(x.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:W,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,R){let W=J.get(x);W.__webglFramebuffer=R,W.__useDefaultFramebuffer=R===void 0},this.setRenderTarget=function(x,R=0,W=0){j=x,H=R,V=W;let k=null,z=!1,gt=!1;if(x){let mt=J.get(x);if(mt.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(T.FRAMEBUFFER,mt.__webglFramebuffer),it.copy(x.viewport),vt.copy(x.scissor),xt=x.scissorTest,g.viewport(it),g.scissor(vt),g.setScissorTest(xt),K=-1;return}else if(mt.__webglFramebuffer===void 0)q.setupRenderTarget(x);else if(mt.__hasExternalTextures)q.rebindTextures(x,J.get(x.texture).__webglTexture,J.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let kt=x.depthTexture;if(mt.__boundDepthTexture!==kt){if(kt!==null&&J.has(kt)&&(x.width!==kt.image.width||x.height!==kt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(x)}}let Bt=x.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(gt=!0);let St=J.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(St[R])?k=St[R][W]:k=St[R],z=!0):x.samples>0&&q.useMultisampledRTT(x)===!1?k=J.get(x).__webglMultisampledFramebuffer:Array.isArray(St)?k=St[W]:k=St,it.copy(x.viewport),vt.copy(x.scissor),xt=x.scissorTest}else it.copy(tt).multiplyScalar($).floor(),vt.copy(at).multiplyScalar($).floor(),xt=Ft;if(W!==0&&(k=A),g.bindFramebuffer(T.FRAMEBUFFER,k)&&g.drawBuffers(x,k),g.viewport(it),g.scissor(vt),g.setScissorTest(xt),z){let mt=J.get(x.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+R,mt.__webglTexture,W)}else if(gt){let mt=R;for(let Bt=0;Bt<x.textures.length;Bt++){let St=J.get(x.textures[Bt]);T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0+Bt,St.__webglTexture,W,mt)}}else if(x!==null&&W!==0){let mt=J.get(x.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,mt.__webglTexture,W)}K=-1};function kl(x){let R=J.get(x);return(R.__readFormat!==x.format||R.__readType!==x.type)&&(R.__readFormat=x.format,R.__readType=x.type,R.__formatReadable=b.textureFormatReadable(x.format),R.__typeReadable=b.textureTypeReadable(x.type)),R}this.readRenderTargetPixels=function(x,R,W,k,z,gt,Mt,mt=0){if(!(x&&x.isWebGLRenderTarget)){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Bt=J.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&Mt!==void 0&&(Bt=Bt[Mt]),Bt){g.bindFramebuffer(T.FRAMEBUFFER,Bt);try{let St=x.textures[mt],kt=St.format,Qt=St.type;x.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+mt);let yt=kl(St);if(yt.__formatReadable===!1){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(yt.__typeReadable===!1){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}R>=0&&R<=x.width-k&&W>=0&&W<=x.height-z&&T.readPixels(R,W,k,z,dt.convert(kt),dt.convert(Qt),gt)}finally{let St=j!==null?J.get(j).__webglFramebuffer:null;g.bindFramebuffer(T.FRAMEBUFFER,St)}}},this.readRenderTargetPixelsAsync=async function(x,R,W,k,z,gt,Mt,mt=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Bt=J.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&Mt!==void 0&&(Bt=Bt[Mt]),Bt)if(R>=0&&R<=x.width-k&&W>=0&&W<=x.height-z){g.bindFramebuffer(T.FRAMEBUFFER,Bt);let St=x.textures[mt],kt=St.format,Qt=St.type;x.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+mt);let yt=kl(St);if(yt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(yt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let te=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,te),T.bufferData(T.PIXEL_PACK_BUFFER,gt.byteLength,T.STREAM_READ),T.readPixels(R,W,k,z,dt.convert(kt),dt.convert(Qt),0),T.bindBuffer(T.PIXEL_PACK_BUFFER,null);let _e=j!==null?J.get(j).__webglFramebuffer:null;g.bindFramebuffer(T.FRAMEBUFFER,_e);let he=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await th(T,he,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,te),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,gt),T.bindBuffer(T.PIXEL_PACK_BUFFER,null),T.deleteBuffer(te),T.deleteSync(he),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,R=null,W=0){let k=Math.pow(2,-W),z=Math.floor(x.image.width*k),gt=Math.floor(x.image.height*k),Mt=R!==null?R.x:0,mt=R!==null?R.y:0;q.setTexture2D(x,0),T.copyTexSubImage2D(T.TEXTURE_2D,W,0,0,Mt,mt,z,gt),g.unbindTexture()},this.copyTextureToTexture=function(x,R,W=null,k=null,z=0,gt=0){let Mt,mt,Bt,St,kt,Qt,yt,te,_e,he=x.isCompressedTexture?x.mipmaps[gt]:x.image;if(W!==null)Mt=W.max.x-W.min.x,mt=W.max.y-W.min.y,Bt=W.isBox3?W.max.z-W.min.z:1,St=W.min.x,kt=W.min.y,Qt=W.isBox3?W.min.z:0;else{let ge=Math.pow(2,-z);Mt=Math.floor(he.width*ge),mt=Math.floor(he.height*ge),x.isDataArrayTexture?Bt=he.depth:x.isData3DTexture?Bt=Math.floor(he.depth*ge):Bt=1,St=0,kt=0,Qt=0}k!==null?(yt=k.x,te=k.y,_e=k.z):(yt=0,te=0,_e=0);let ae=dt.convert(R.format),Se=dt.convert(R.type),Ct;R.isData3DTexture?(q.setTexture3D(R,0),Ct=T.TEXTURE_3D):R.isDataArrayTexture||R.isCompressedArrayTexture?(q.setTexture2DArray(R,0),Ct=T.TEXTURE_2D_ARRAY):(q.setTexture2D(R,0),Ct=T.TEXTURE_2D),g.activeTexture(T.TEXTURE0),g.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,R.flipY),g.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),g.pixelStorei(T.UNPACK_ALIGNMENT,R.unpackAlignment);let Pe=g.getParameter(T.UNPACK_ROW_LENGTH),jt=g.getParameter(T.UNPACK_IMAGE_HEIGHT),$e=g.getParameter(T.UNPACK_SKIP_PIXELS),_n=g.getParameter(T.UNPACK_SKIP_ROWS),Rn=g.getParameter(T.UNPACK_SKIP_IMAGES);g.pixelStorei(T.UNPACK_ROW_LENGTH,he.width),g.pixelStorei(T.UNPACK_IMAGE_HEIGHT,he.height),g.pixelStorei(T.UNPACK_SKIP_PIXELS,St),g.pixelStorei(T.UNPACK_SKIP_ROWS,kt),g.pixelStorei(T.UNPACK_SKIP_IMAGES,Qt);let _i=x.isDataArrayTexture||x.isData3DTexture,se=R.isDataArrayTexture||R.isData3DTexture;if(x.isDepthTexture){let ge=J.get(x),Pn=J.get(R),ce=J.get(ge.__renderTarget),Ln=J.get(Pn.__renderTarget);g.bindFramebuffer(T.READ_FRAMEBUFFER,ce.__webglFramebuffer),g.bindFramebuffer(T.DRAW_FRAMEBUFFER,Ln.__webglFramebuffer);for(let Ei=0;Ei<Bt;Ei++)_i&&(T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,J.get(x).__webglTexture,z,Qt+Ei),T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,J.get(R).__webglTexture,gt,_e+Ei)),T.blitFramebuffer(St,kt,Mt,mt,yt,te,Mt,mt,T.DEPTH_BUFFER_BIT,T.NEAREST);g.bindFramebuffer(T.READ_FRAMEBUFFER,null),g.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else if(z!==0||x.isRenderTargetTexture||J.has(x)){let ge=J.get(x),Pn=J.get(R);g.bindFramebuffer(T.READ_FRAMEBUFFER,y),g.bindFramebuffer(T.DRAW_FRAMEBUFFER,I);for(let ce=0;ce<Bt;ce++)_i?T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,ge.__webglTexture,z,Qt+ce):T.framebufferTexture2D(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,ge.__webglTexture,z),se?T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Pn.__webglTexture,gt,_e+ce):T.framebufferTexture2D(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Pn.__webglTexture,gt),z!==0?T.blitFramebuffer(St,kt,Mt,mt,yt,te,Mt,mt,T.COLOR_BUFFER_BIT,T.NEAREST):se?T.copyTexSubImage3D(Ct,gt,yt,te,_e+ce,St,kt,Mt,mt):T.copyTexSubImage2D(Ct,gt,yt,te,St,kt,Mt,mt);g.bindFramebuffer(T.READ_FRAMEBUFFER,null),g.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else se?x.isDataTexture||x.isData3DTexture?T.texSubImage3D(Ct,gt,yt,te,_e,Mt,mt,Bt,ae,Se,he.data):R.isCompressedArrayTexture?T.compressedTexSubImage3D(Ct,gt,yt,te,_e,Mt,mt,Bt,ae,he.data):T.texSubImage3D(Ct,gt,yt,te,_e,Mt,mt,Bt,ae,Se,he):x.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,gt,yt,te,Mt,mt,ae,Se,he.data):x.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,gt,yt,te,he.width,he.height,ae,he.data):T.texSubImage2D(T.TEXTURE_2D,gt,yt,te,Mt,mt,ae,Se,he);g.pixelStorei(T.UNPACK_ROW_LENGTH,Pe),g.pixelStorei(T.UNPACK_IMAGE_HEIGHT,jt),g.pixelStorei(T.UNPACK_SKIP_PIXELS,$e),g.pixelStorei(T.UNPACK_SKIP_ROWS,_n),g.pixelStorei(T.UNPACK_SKIP_IMAGES,Rn),gt===0&&R.generateMipmaps&&T.generateMipmap(Ct),g.unbindTexture()},this.initRenderTarget=function(x){J.get(x).__webglFramebuffer===void 0&&q.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?q.setTextureCube(x,0):x.isData3DTexture?q.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?q.setTexture2DArray(x,0):q.setTexture2D(x,0),g.unbindTexture()},this.resetState=function(){H=0,V=0,j=null,g.reset(),_t.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}};var Ph={type:"change"},Dl={type:"start"},Gh={type:"end"},qa=new zn,Lh=new Xe,$g=Math.cos(70*ei.DEG2RAD),Me=new N,Ke=2*Math.PI,ie={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},bl=1e-6,Za=class extends Ds{constructor(t,e=null){super(t,e),this.state=ie.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Qn.ROTATE,MIDDLE:Qn.DOLLY,RIGHT:Qn.PAN},this.touches={ONE:Yn.ROTATE,TWO:Yn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new Qe,this._lastTargetPosition=new N,this._quat=new Qe().setFromUnitVectors(t.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Wi,this._sphericalDelta=new Wi,this._scale=1,this._panOffset=new N,this._rotateStart=new Gt,this._rotateEnd=new Gt,this._rotateDelta=new Gt,this._panStart=new Gt,this._panEnd=new Gt,this._panDelta=new Gt,this._dollyStart=new Gt,this._dollyEnd=new Gt,this._dollyDelta=new Gt,this._dollyDirection=new N,this._mouse=new Gt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=e0.bind(this),this._onPointerDown=t0.bind(this),this._onPointerUp=n0.bind(this),this._onContextMenu=c0.bind(this),this._onMouseWheel=r0.bind(this),this._onKeyDown=a0.bind(this),this._onTouchStart=o0.bind(this),this._onTouchMove=l0.bind(this),this._onMouseDown=i0.bind(this),this._onMouseMove=s0.bind(this),this._interceptControlDown=h0.bind(this),this._interceptControlUp=u0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ie.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ph),this.update(),this.state=ie.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Me.copy(e).sub(this.target),Me.applyQuaternion(this._quat),this._spherical.setFromVector3(Me),this.autoRotate&&this.state===ie.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Ke:n>Math.PI&&(n-=Ke),s<-Math.PI?s+=Ke:s>Math.PI&&(s-=Ke),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Me.setFromSpherical(this._spherical),Me.applyQuaternion(this._quatInverse),e.copy(this.target).add(Me),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Me.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new N(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Me.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(qa.origin.copy(this.object.position),qa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(qa.direction))<$g?this.object.lookAt(this.target):(Lh.setFromNormalAndCoplanarPoint(this.object.up,this.target),qa.intersectPlane(Lh,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>bl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>bl||this._lastTargetPosition.distanceToSquared(this.target)>bl?(this.dispatchEvent(Ph),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ke/60*this.autoRotateSpeed*t:Ke/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Me.setFromMatrixColumn(e,0),Me.multiplyScalar(-t),this._panOffset.add(Me)}_panUp(t,e){this.screenSpacePanning===!0?Me.setFromMatrixColumn(e,1):(Me.setFromMatrixColumn(e,0),Me.crossVectors(this.object.up,Me)),Me.multiplyScalar(t),this._panOffset.add(Me)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Me.copy(s).sub(this.target);let r=Me.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Gt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function t0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function e0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function n0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Gh),this.state=ie.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function i0(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Qn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ie.DOLLY;break;case Qn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ie.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ie.ROTATE}break;case Qn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ie.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ie.PAN}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(Dl)}function s0(i){switch(this.state){case ie.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ie.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ie.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function r0(i){this.enabled===!1||this.enableZoom===!1||this.state!==ie.NONE||(i.preventDefault(),this.dispatchEvent(Dl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Gh))}function a0(i){this.enabled!==!1&&this._handleKeyDown(i)}function o0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Yn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ie.TOUCH_ROTATE;break;case Yn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ie.TOUCH_PAN;break;default:this.state=ie.NONE}break;case 2:switch(this.touches.TWO){case Yn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ie.TOUCH_DOLLY_PAN;break;case Yn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ie.TOUCH_DOLLY_ROTATE;break;default:this.state=ie.NONE}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(Dl)}function l0(i){switch(this._trackPointer(i),this.state){case ie.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ie.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ie.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ie.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ie.NONE}}function c0(i){this.enabled!==!1&&i.preventDefault()}function h0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function u0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Nh(i,t,e){let n=new N;return{add(s,r){let a=document.createElement("span");return a.className=`al-lab ${s}`,a.innerHTML=r,i.appendChild(a),a},place(s,r,a=0){n.copy(r).project(e);let o=t.clientWidth,l=t.clientHeight,c=n.z>1||Math.abs(n.x)>1.1||Math.abs(n.y)>1.1;s.style.opacity=c?0:1;let h=s.offsetWidth/2+6,p=Math.min(o-h,Math.max(h,(n.x*.5+.5)*o));s.style.transform=`translate(${p}px, ${(-n.y*.5+.5)*l+a}px) translate(-50%, -50%)`}}}function Oh(i,t,e={}){let n=()=>{let s=document.querySelector(i);if(!s)return;let r=null,a=!1,o=()=>(a||(a=!0,r=t(s)),r),l=new IntersectionObserver(c=>{c[0].isIntersecting&&(l.disconnect(),o())},{rootMargin:"600px"});l.observe(s);for(let[c,h]of Object.entries(e))document.querySelectorAll(`[data-lab-${c}]`).forEach(p=>p.addEventListener("click",u=>{let f=o();if(!f)return;u.preventDefault(),s.scrollIntoView({behavior:"smooth",block:"center"});let _=p.getAttribute(`data-lab-${c}`),C=()=>f.ready()?h(f,_):setTimeout(C,150);C()}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n):n()}var me=Math.PI/180,ni=180/Math.PI;var Uh=Math.atan(Math.sinh(Math.PI))*ni,Vs=Math.SQRT2,ks=(i,t,e)=>Math.min(e,Math.max(t,i));function ns(i,t,e=1){let n=i*me,s=t*me,r=Math.cos(s);return[e*r*Math.sin(n),e*Math.sin(s),e*r*Math.cos(n)]}function Hh([i,t,e]){let n=Math.hypot(i,t,e)||1;return[Math.atan2(i,e)*ni,Math.asin(ks(t/n,-1,1))*ni]}function nn(i,t=12){let e=360/t,n=ks(Math.floor((i+180)/e),0,t-1);return{g:n,lon0:-180+(n+.5)*e,w:e}}function d0(i){if(Math.abs(Math.abs(i)-Math.PI/2)<1e-12)return Math.sign(i)*Math.PI/2;let t=i,e=Math.PI*Math.sin(i);for(let n=0;n<60;n++){let s=(2*t+Math.sin(2*t)-e)/(2+2*Math.cos(2*t));if(t-=s,Math.abs(s)<1e-13)break}return t}function Ue(i,t,e,n={}){let s=t*me,r=e*me;switch(i){case"equirect":return[s,r];case"mercator":{let a=ks(e,-Uh,Uh)*me;return[s,Math.log(Math.tan(Math.PI/4+a/2))]}case"gallpeters":{let a=Math.SQRT1_2;return[s*a,Math.sin(r)/a]}case"lambert":return[s,Math.sin(r)];case"sinusoidal":return[s*Math.cos(r),r];case"mollweide":{let a=d0(r);return[2*Vs/Math.PI*s*Math.cos(a),Vs*Math.sin(a)]}case"gores":{let a=n.n||12,o=360/a,c=(-180+((n.gore!=null?n.gore:nn(t,a).g)+.5)*o)*me;return[c+(s-c)*Math.cos(r),r]}case"polar_n":{let a=Math.PI/2-r;return[a*Math.sin(s),-a*Math.cos(s)]}case"polar_s":{let a=Math.PI/2+r;return[a*Math.sin(s),a*Math.cos(s)]}case"ortho":{let a=(n.lon0||0)*me,o=(n.lat0||0)*me;return Math.sin(o)*Math.sin(r)+Math.cos(o)*Math.cos(r)*Math.cos(s-a)<0?null:[Math.cos(r)*Math.sin(s-a),Math.cos(o)*Math.sin(r)-Math.sin(o)*Math.cos(r)*Math.cos(s-a)]}default:throw new Error("unknown projection "+i)}}function Vh(i,t){return[i*ni,(2*Math.atan(Math.exp(t))-Math.PI/2)*ni]}function gi(i){switch(i){case"equirect":case"sinusoidal":case"gores":return{w:2*Math.PI,h:Math.PI};case"mercator":return{w:2*Math.PI,h:2*Math.PI};case"gallpeters":return{w:2*Math.PI*Math.SQRT1_2,h:2*Vs};case"lambert":return{w:2*Math.PI,h:2};case"mollweide":return{w:4*Vs,h:2*Vs};case"polar_n":case"polar_s":return{w:2*Math.PI,h:2*Math.PI};case"ortho":return{w:2,h:2};default:throw new Error("unknown projection "+i)}}function Il(i,t,e,n={}){let r=ks(e,-89.9,89.9),a=i==="gores"?{...n,gore:n.gore!=null?n.gore:nn(t,n.n).g}:n,o=(G,O)=>Ue(i,G,O,a),[l,c]=o(t-1e-4,r),[h,p]=o(t+1e-4,r),[u,f]=o(t,r-1e-4),[_,C]=o(t,r+1e-4),m=1/(2*1e-4*me),d=(h-l)*m,B=(p-c)*m,w=(_-u)*m,M=(C-f)*m,v=Math.cos(r*me),S=Math.hypot(w,M),F=Math.hypot(d,B)/v,E=Math.abs(d*M-B*w)/v,D=Math.sqrt(S*S+F*F+2*E),P=Math.sqrt(Math.max(0,S*S+F*F-2*E));return{h:S,k:F,area:E,a:(D+P)/2,b:(D-P)/2,omega:2*Math.asin(ks(P/D,0,1))*ni}}function f0([i,t],[e,n],[s,r]){let[a,o,l]=ns(i-e,t),c=(r-n)*me,h=Math.cos(c),p=Math.sin(c),[u,f]=Hh([a,o*h+l*p,-o*p+l*h]),_=u+s;return _=((_+180)%360+360)%360-180,[_,f]}var kh=(i,t,e)=>i.map(n=>f0(n,t,e));function zh(i,t=1){let e=0;for(let n=0;n<i.length;n++){let[s,r]=i[n],[a,o]=i[(n+1)%i.length],l=a-s;l>180?l-=360:l<-180&&(l+=360),e+=l*me*(2+Math.sin(r*me)+Math.sin(o*me))}return Math.abs(e)/2*t*t}function Kh(i){let t=0;for(let e=0;e<i.length;e++){let[n,s]=i[e],[r,a]=i[(e+1)%i.length];t+=n*a-r*s}return Math.abs(t)/2}function Jh(i){let t=0,e=0,n=0;for(let[s,r]of i){let a=ns(s,r);t+=a[0],e+=a[1],n+=a[2]}return Hh([t,e,n])}function zs(i,t,e,n=48){let s=[],r=e*me,a=t*me;for(let o=0;o<n;o++){let l=o/n*2*Math.PI,c=Math.asin(Math.sin(a)*Math.cos(r)+Math.cos(a)*Math.sin(r)*Math.cos(l)),h=Math.atan2(Math.sin(l)*Math.sin(r)*Math.cos(a),Math.cos(r)-Math.sin(a)*Math.sin(c));s.push([i+h*ni,c*ni])}return s}var ja={greenland:2166086,africa:30365e3,australia:7656127,antarctica:142e5};var Wh={source:"Natural Earth, 1:50m Physical Vectors, Land (ne_50m_land)",version:"5.1.2",url:"https://www.naturalearthdata.com/downloads/50m-physical-vectors/50m-land/",license:"Public domain (Natural Earth terms of use: https://www.naturalearthdata.com/about/terms-of-use/)",processing:"Douglas-Peucker 0.07 deg; islands under 0.02 sq deg dropped; quantized to 0.05 deg; see tools/geo/scripts/build-land.mjs",q:.05,polys:[["ghHlURTADQKAJVBHEHHLDHIEIIBeQ"],["gzF9ODNMNIfBLIXIDUIIJaRG5BMTGAKdDXMLCRePKAONoBVGHFCBFUVKRKhBECGFCQWPCIGJEhBMNcLMTMHIPKJAJKJBxBUpBAPJZDXHZDjBPXDPLJABNFNXFDANHBGBPRBTJHNZJnBAbRH_BHpBbZDGFECBLJMHBFKPEGGBGHANJJGIAIKHITJKBrBXrBQdGDFHCPKXIXaCYDMfeKEEDAIfJLCMYAKPYPnBfDEOQAEeSWDQGEHUAHNPHRfPVXCNFGFDVOEEKDJaLMHQPEHQGAAIXORARKVBpBUNDpCDhCV3BBtBXTDPXNL1BDDGZA9BDPPVFdTLB1BCTIROVIAeOFOSA8BXuBJ4BbqBDehBuBEBCGKRKCAGJKHQCEKJALGGGLEDEEASf4BEYKSCUDKMeECCBAXKGMWeMWScQcBgBMWGOKUB4BSOMUgBUQHWEQSOKOYpBCSKBAINQGEBIGAEHIGKFSANEAGICCKFDDICKEAGKOHAGFABGIGMDFQQICKCBBJGEEFEECUIFGGGFKIAGECWLebFXEEEBBKQMSFGJCMQLAMIAJIEELGMQGSQKDGAIKKICAIKDAISMGJYAIEGDEGICBCAQFGRCJGGEIDIEOLKEKLcFUHOCMHGAcOHNMAEHGBAMMICHOHPRCHFJFENFAZVfCFeTEFQFEHIAcNWReHKRgBNSEOIW2BKoBFYEMFOIWBMIGEABIFEAGGOEBIsBMKGBBDMRAT"],["8-G1VMLCRbFZGBKKMMG"],["otGpZKBeRST0BhBAHHDLG7BmBfgBDO"],["2_EiBGACIIECKUGARPHBFOHMNjBKDFEVSZPINSAWFMCKFMIcQOFNEFANNN"],["w2Cr9BQGCFJDGBeIKFFJJEPDKFKCCBHDlBGLFBCCIBIEEFEEIIIEHDF"],["mvC8kDhBEYGoBCIIiBBMHjBH"],["uoCkkDXCJO2CFhBB"],["5f04CCJfHPE5BBOIAIEAoBAgBG"],["2nGxLIHQCSRFDhBIHMCG"],["0yEyKDDCEEKqCoCESKOANGRNFFLPFNZ"],["k5EwOOACFKEBJLLBHfNGwBHIGC"],["-5EqLFAFKLIFMCGQGBQIQKEKDCDPlBAJGN"],["27EmOQAEFBPKTDDFGCLJEBeDCHBFY"],["y8E2PCJKDBXCNIHTELOCKVQDKBG"],["82E8QUBMLCTFNFDNMJaLKCE"],["-iGrIJFNGFQROAUOFOVOJ"],["m_F9FBDFIDUNWxBeLEEIwBbmBhBGJ"],["mtFpKJFZASiBIESCKL"],["miFxDaFGFMPBLlBUNABDXINHNMJNAMMOgBAGDOG"],["y-E7DQNAHLDPATOCM"],["w5E3KtBLJEBDLBTGZBDGCMeGiBNUGOHWOCEFAEEGBAH"],["g2E1LMLKBKPNHLEVSVEDGKEeE"],["6zErKOAEDKEGRZDBIHHbFRDJECSMIQDKJGBMGRKBIOC"],["6xE3KFHEDNAPEKCBMOKMF"],["qwElKKJVRDMRGFKUBIG"],["ykEhCMfSDHNCFZKHYZGMUGAEHAIIC"],["ocopCcFVHPBNJIILEEGFE"],["gboiDSAKNcASDLBBDoCJdDPHlBFNAAGKElCDDEOCSMXGTMACLE"],["2tCilDEBFHpBH3BCNEQM"],["q7BilDoBBKDABnBEPFtBFHEpBC"],["8-BmlDUBkBHzDNDBKBCDxBBDAKGjBBNEyBKwBBGM"],["6-Bw2CBFDERLdDRCFKEMWG"],["yrCu3CAHdBHGVCTOYI"],["q4Cs7CdAEKOGaAaL"],["8zD0jDVArBMsBCiCF"],["4tEg9CXLzBKQAII"],["owFw8CXDHEDIiBCGD"],["6dusBMCBDKF4BACJUIFL1BBDGJChBEBMEBEG"],["od2wBEFaFGRKBCFJALQPCPONCOI"],["irBwsBTLELNBbPVIFIAGYECIaB"],["8XqoCLFAHEDdTGIHGCMQMOC"],["2P4lCAFNHIFLDBPHBHSNALUMCGIIACHEBGIDCOGQB"],["qNwlCGLAFHDXEFIAG"],["-D4xBMDPPJEDGHBFCWOMC"],["12El8CMJdFAHzBBZEIEFEMGdEOI"],["99Ez7CYDUJXFiBBSEUFDBOFBFxBCtBMNKXBJKIG"],["1yCjkDhCWoCBQFEH"],["poChwCOEMJHDEBPCHDBEJBDCMCFGLAIIQE"],["_uCxwCDDSAjBLTGeSKB"],["j8Cp4CGBFDrBH5BFJGKGsBEIGOHII"],["39Cl3CWHHHtBEEG"],["z6D75CBHKAEIIAGDFDKDUOeBHFbF4BGANTBCF9CC7ESGEuCGQHwBM"],["98Cr7CLHMFHF1BKHIgBERGOEqBDGD"],["_0Cp0CfLNKeaWKGDJFAHKDVH"],["z_Gw5CWBiBNLF1BDhBCAW"],["xpChgCQBBHKBAGOAEDFDGBBBhBJCFVEGFLBBDFCDEEIUKBI"],["ruBxjCQBCFMAMLGAAFEBLDfUdICEPC"],["l8Cl2BNALEIOGsBUDGLFDEFNFONLH"],["rrCpgCkBEGDZTNBJHRGcMNCOCLM"],["j9Ct9BCVFLFAFKIOJFDLTCCIGBCGFGOEDEKICIOA"],["n7C_3BJBFEBEIMSF"],["ntCs9BxBE5BcOC0BJqBPEF"],["rsCu5BKCHDEBDFMCMILASOCDQBDFEBfNZBFGCSWaOIGJFT"],["p2GyvCYBQEkBNiBBFFTANHDGpBOfDFGCI"],["1vGwrCQDGPVFnBKLIYAOI"],["rsG4kCQNJEJDRBVHHADGQOcG"],["xgDiXkBLGJLBNEDDFCDHFGPCLKJCBGUG"],["1yCiXUBCFNLxBCBOEG"],["j_FooCSCBFMDHFVCKFpBLEDLHDCKIRGFBIDFDNSGISEQNFOGAHGCCODMCCGMB"],["v-F-oCSBFFFEBDLANFREQIKADE"],["3jFslCHLHEBELJBCBIIICKOEKH"],["9mFumCOBEHUHSPNEFFKCKHBDIAARVIBIHDLMGCFECEZISEDGPDII"],["1mFonCOBCJDDLKINNBFCBMLI"],["1oF2nCOZDTLMEIREGKJINJAMOK"],["roF2oCSASTTQORCJVLFEEOFGLc"],["1pF6oCGDDDEBKEQDAHPBOBGDDDXGFJHCHIRMKKGDCE"],["1gFmiCCRHHBSFDLOGMQH"],["5lF2jCOBGFBDNHOCCOUENjBTBJEMCPGJUCG"],["1kFwiCELLAUHFDOHBDGABFlBaDGECPG"],["3vCi6BEEWFuBAVHAHRCECFECEHFREDGNCBGJCQQDJ"],["z6CozBYCzBPbDEEJAUKkBEQG"],["89FrFIEMFBRNJGLBDJDNAJNfNfBJILAdSEIkBFUEECGSCBDJGHcCSUMCBc"],["k_EvKfTrBPlBhBXHJEEGDGEOMKkBQMMYGgBCOG"],["q1F_yBKCoBPQCGBGGSAGGKAECKBG1BFGAEHLDPETHBFIGCJEDHFKBPJCEFJLLETBBGIENANOLcKJCGFIDBAITYDQCO"],["24DslD0BNdFBBOJHBtEJ1CO2BKQIZAeKiDK"],["i6DmkDOFNFADcGKGcBeHJFDNZAiBLRFrCAdGnCCNERKtBEuCYMB"],["0gEijDTPWIiBEiBLUBGFAFVFtCF_BArBJfEcMQQWCDEIIWKaDBEIEaD"],["ivF6-CeHGCCKUIuBLqBAiCLVFBBGDjBHhBCNGDIMIBCZAHBEJmBRbFRIlCFVENJJBnBGrBSAEMABQSAHGGEuBI"],["4xFs8CuBNEDAHvDIbDJEcCcO"],["w3Fm-CiCCGF4CDHJdD9BA1CQMOMB"],["y4G1rBIEADaHCFGCMVHAQTDVYFEHGAFaCCMJOjBuBNeSWFLhBJFDVPIPFFNGDJThBpBbPFIJABIHDUcEMDIFGpBSHIEGWIIGIkBGENcGDIEFGLALSIDAONGFIKRBBbiBKKJHLMEITWOADD"],["s4GzzBiBQFNIKMAJJMGLNEDBDIDrBxBXJGDHDGAEFKDAFVAEEDAHDJGGHlBNCBFXFAEFPZEFRFZVXDbCHKNALIHDTAFEIIFDDACGHBAGUEHCIEJACGEABEMDBEGAHEAEIADEKGCDCIMGEBBGUQcKGBBEcKQQGBDEMADEGCEDIOEFAGKKBCKYSKMgBQKMAHBBDMH"],["w9E0LIAENFNIDELANEFCRPPAVPqBDDLVIJCRLPDSLFdODGDYIQVQFADPLMJFBGHCRfHABKOeaIGMQKQJBPQIIOOBEQMDCIMBBe"],["s3EoXeLQGDfOVNjBVJALHNMVBFERSHECDGSGMDGRIEAIUHAFJBKPAFOBDTFGCIZGFQVSFAITBHHMXSLDFHJCJIHDBQMMCGNKAPFBHOFCN4BEEMLICA-BKiB"],["6mFdUAGDBFINFNEXKVCKGCCPGCCLIFQAeeGOaGECBIgBOsChBgBDGFSB2BVmBJWNSBYTKBQPAX0BTOBQNAPbAFJMTkBZERIFGNYACReHJDEHoBJPBIHNFLCJKvCMdaBOLEXiBrBMDGNENHTMMTRBEHrBDFGFBKFOAMDMLBHbPPIrBBtBoBEMFHVDFILJDEKWNOSCNCJIKEPUFQCEFCGEJABKdUbGXKfETOAGIAZADGHAJMGSFBBJFBDTFFLBHQEGDKPMNGBCMESDUOUFCGGCDEEIlBFZALKBSZGLAKWyBU"],["k8EoBRVbFTCJGvCBPEPLHRCNILKHGLUASUODOIYABEMEMJBHTEZZPFHHLAmBnBELFPSTGCANFCXHBLREDGEUbYGOAQPEPLIdBjBDVGRTAJDFEHMKyBFWRBFGBcMIIWAWIUIIGFFeGGBIEIOUODKQKEMDIHiBBQFIEkBDYQSSKH"],["mmEvHMHcDOTmCFQWEBKJOCWJSBEJGDAJIDUBWCOFAXIN1BSVDvBEjBGzBSVCVFjBOhBECMVIbAAEEEGFYkBeHII"],["04DyGqBBcfCL6BjBenBQJBMIASVUJQXWHEFBDRHgBMMHGJNJBFEDBFKLaFGdOLHTMKSBabHTEJDLChBFfPKJHRKCPDAdgBzBmBPWVSbkBBMVsBZkBTMV8BjBUDUZeTInBqBJSEMSAQL"],["gyEsIADECKMEACJMHEFBNFDUGEHFBADQEKHaJDJTFPCBFONADVFLEHHMRdDMFAJKFBDGBBBQVJJwBpBRHNCLKCHHFJTBVERZRFGALRREAAJDDKBAHADJBCNHDEFLRxBVFeDDDCAIDDFCPFDKJBLMDJHDFDLERJBUDGdFDCCEHDFELBFmBFGCYLMPECIHIEULMBSCOIEFAEKMQKGILUBiBLFGIYBKKACO8BQkBsBEOQCYOCDQCGKHIIIGBGCiB4BEB"],["20Cq_C_HlBpBLIDdFDFPEHHTACJhBJEFDDREKHjBNhCGbDFGCCRIkBIcSgBEVGkBMTCHEECaBOGBEeAUKBC6CSaBKKmCB8BG0BIsBMgBEiBBSJBF"],["klC07CuBDJFDJPBDFHBBFGHHJuBhBwBNTFdGFBMDDBtDKLCICAGWEdIDCEG5BDNEFKGKaEOGMONEgBGDCAK-BI"],["uyFgkCKJDNQhBANFJCPKTOtBWrBONAHZYLCZDVtBALQRKTMBEPFLFUbGTfJWIcDSKQNeMgBDsBGWTWECFGAMIWBWOGQBGSNQ"],["4zFk3BkBFaQHTAHINUElBPlBDTTHP3BYRBPHLIHAFJgBTFBNCPNHACSJQAMYOBOeDIECOKOEUCIHSCKMEmBhB"],["ywF2zBICAbOPITANDNJFDHDNNBFHCpBJNHTMVPHDLTLAQKMJCHJEFBDJGHAFRJJBOEEHCDAPTZCTBKGNEDDCMDAJNOJBFTDRZHBJCLSBMMMZGTBLFfJhBAFRPIhBBAKEGOA-BsBsBAuBKIHOBIEIGDKCEaaASGISECBRNEJKDKIgBKYaSKSgBKcBKJCKOBQOIEQKBENIEGBGMRBAEGK"],["-nF6qBMAERNHHNJILCNFLTHDFACGHABGCKDGNDYOMQKFQCAKOE"],["-jFgqBWAFNOABFGHNRLpBLCCHPJEKDOEEFADFCNPEBEGCAGDGAOIEKQFCCILODDCJGAAFLCLHEIFMMHPQAEKBAGUIGIIEKD"],["o3EocFZDAFQLIHWCWkB4BWKONVnC"],["0qEgZENNNHVPLVJfOBeaSDACGkBGSBCG"],["gkDoMKASRWhBEBUtBAPHRlBRRAFGJcF2BCECJGiBGMAQODPG"],["-9BxPQXMjCIPBTHLLUJBInBDLLRCZFR1ChIRNXDZLPApBWPcCeRuBCSIYMGY0BCSHOAOHSBkBQcEUQCMIGDKCEISCKFBIGISMGJAMKQECCLKOIAHMKQDGCGECIDWSEQDQGAKO"],["5mG3jDxBB9BGpCKXIGKkBMiBBsDZaL"],["93CzjD1BGDEOM-EgBeBjDfRJBF"],["v4BviD8BAGDYbDLbDKDBDhHRVFvFBHEAImBSsBBsCaECDENCKIAGKEFCIIsBW6CK6CJgBJBJ1BFFD"],["1qCtkDDPdHxCETKrBFjDSOEQHuFCSEPCDIQABEeGeBGDDHUD"],["x3Cv2CBDQAMLMTgBfCjBLNZP1BDnCARCLIOEsCBaE5BAJGiBCKGnBEVGXJhBCKFRFfEXICIKEcDBIICeHECHGGEyBBfGBCOEoBDUGgBCWHBKnBELGGEcIeBdKdBZGFGGUPIEIIC6BGMF"],["t2C5hCOCKDMPHCBHOBGJcTqBTqBFJHpBFjCKjBDPCHGfD3BIEGcAMEEAAFQBVSAIIEBCGEGNJAQNUCQFCDKElBOFICIeIBGfBJICGKEJISBSM"],["pmD-cYAEDUCMFWBUTYBqBVGADEEBOHHBEDGEKJuBJEDDLgBBQJODAFlBJBEFDhBE9BFYWFKhBEPMJWXAjBKJKVBFIDFVEJIQEFGjBCZTTBFHRFAGNDBCWGAOMKgBM"],["kaqkDaAeHGGAIWCMAHJ0BGiDHMDCFvBLNHjBBfFpBCHEGCvCAlBGFCeCMEpCAZEBEYElBE6BBICNIWDCEHE"],["gV8jDQCaFEDJFBFeIQFAFDBwBHKESBGBJBkBJjCFVHFFAFVBHVZDRNEDJFCFNB9CaNKcCIG2CEFEvDFLEDIYBBC6BIBCGCwBAGCbEOG3BHFGGGPDLCJAAHIDVFlBA3BSAEECTEqBAPEDEIEDCPADFLAROCGDEoBCYDAE4BCIBDDxBFgBACBWFECAIWIKBkBXYFTcQO"],["iMkzBGPFJCJFhBTEDLLAJKAMGOFCCQJOAKOBcQOJBB"],["8Lw1BCZNdPIEEHCCIFAEGDCEGFCKKUECM"],["wT4vBTdIPHNXEJK_BWHIMQGFQGUHkCMGB"],["9hCu3CcFGHHD7BJXGWCFElBCFEEKUAVIUGqBD"],["_-Eq_BkCNadiBNUXEEEJJFzBOLGMKCGFHVBNGIELCAGXAAIQCPCNKHBFKDDDEPABMQBCIXDLICEQC"],["95C0YICIGYAeJKAINUBNBADkBHMJCDNNJILCTAdJFGPDPXHEBKNKhBDXEPHVOCIgCFSGRSEQbIAGUG"],["h-BJWEcFRrBHDDEDHJEDHHDJERDJWAEGCHIGaQG"],["7DkpCDHfNBDIBLHeE2BAKJfjBbHQCKFbHRCeFSESFUNQhBYHWPDDMPdEOAWNEHLJKDKGUAYHELFNNFADBBRBGBAFTDoBDAFRJdHnBAXGCDFBVAEDDBlBEPBLPTGVDNJTABEeQMKEIICEGqBAcWhBNXINBGELETDJEDGCCoBOIKDCAMXDSOUGQCKDBGECMFLIEKDAAGIKLARQGIQITAPFhBCDFFCDKEAOUHICGKEJECERJCGEGLHAJFNHBCKIIDAAKQcRHTGQGDCMOJGACIEFEGKSAJGCIOADGEGWBwBGIA"],["_I6kCKGgBASPHFMAGFHCCLdJIPEZFPJHGDXDBErBPNCCDBDjBHVAKITDUKdBBCUKTCCCYCFGKGiBGHCHDbDSKGMOEVCXGAGQCHGMCAELBCKJCCE8BABESMXCOIGKYEEFDFGEAIIEOD"],["3gHm2CmBHMFHCCDYFCFKERIcJBD6CTEJDDOEGDDJILFHQBEHMECHMITIKGDGRGiBCWDFDBDEACGcBTEwBD0BXDDMCCFSACDfHAHDBdIOJDBdAjBISHBBGABFNBOBEFhBHKBDFUHNBFGAHJBJCCIPHfOjBEPIAKJIlBGRDjBAFECGRMIBIQLHJCBGHDAFNCDLSJAFZRA-E"],["tT6yCmBGTLQDFJSCEDFDMCWFHFGBDDIDBBJBAFHDNABHHFvBHfNtBFFFbF9BGLGEEJBRI9BDBKIDMCeOXDGEDACEOGTDHCCGHC1BBJEyBIkBAEGbAaKpBGnBHXGKCQBJKUDMCVEOCLEOAFEGEQDCDOCCHGCAGTGSCXEIESAqBPDDIBBFLBMDDFIBEFOQODEUGCcNEOWEcRCEHMQAOHQKMBOCCEDGMCKA"],["_6CwXADLEHG"],["gVi2BPCIEKB"],["m0C-2CDDFABAACGE"],["gtGx9CJCAESE"],["iuGt0CHCCKIF"],["yxG1hDJDrBBHCDGiBDaI"],["8wGzgD6CHhBHrBCZHVOSEJGECUA"],["q0G_7CNCMKGH"],["2rGt-CFFFABCECGCCA"],["o-DjyCdEMIOAOF"],["orD1zCFBNIUCGF"],["y1Cr6CIIIB"],["44DxyCOACDXBDAEE"],["g6Cp4CNGAGGEKJ"],["orGjzCLEAG"],["y7DhzCDBDCBCGCIB"],["ohE5xCHADGNGQB"],["x1Fz-CjBGQC"],["n3FlgDTBAGiBBEB"],["vlFh9CFBLCACMAIA"],["16F7_CqBBbDRE"],["5jFn9CrBGQGeD"],["t1Ez8CNAKEFIYAMD"],["9xE18CZCoBKKB"],["l_En9CVCHEBEkBDEB"],["v6F1gDKBTCHCGCEBGA"],["vqG7nDpBAdK4BBeF"],["57F__CXCaCEB"],["r3Fp_CbISB"],["v3F5_CDBREIC"],["xoG_lDrEIeEeA"],["_7F1gDrBEUC"],["tgGhkDnCIEE"],["x6FrgD9BEmBG"],["vlGzmDnBMuBJ"],["rHl4CJBLGUC"],["6Dn4CNADCYGAD"],["1D_4CNADG"],["0B53CFFHMSCCD"],["lDt4CSBJJRDAGHGVG"],["2Fj4CNCFGSCED"],["28BvzCJCOCED"],["oUv3CBBXIOEaC"],["yhB_3CTBNEBEOIMB"],["7mB3jDKCCEwBJfD3BGHEME"],["tqBjjDpDAqBI"],["jEl4CHCOISDBD"],["3Zr8CBJKFDHLCNMjBCkBGSMIB"],["jU76CHAHGGE"],["toBxjDJAIESA"],["j5BzrCWJfGAC"],["h0CpjDzBAKGYEaBHD"],["9kCvsCFBDIeB"],["tlC9uCQBCDBBbCVFDESI"],["5lCtvCPEUCCD"],["xnC1wCHEWE"],["voCrtCODTBBDJADDRCMI"],["vtCj3CVUMASHAD"],["9tCvwCRDMKDGGEQF"],["nuC5uCBAEGKCBBBB"],["nqChuCFABCBCGAEACB"],["hmC7uCLBJEEC"],["3rCluCeBNFHGZDDEOE"],["1nC3vCKBJBNE"],["9rCr4CFABGUABD"],["1rC54CPEOC"],["5rC5vCLAGAEIGB"],["9xDv7CNAGMLMOCUBAFDBEBAF"],["1iEt7CNBJIIC"],["52D56CFCaGEF"],["z5C53COBNFDG"],["_5Cj3CfCFEEEQA"],["r8C17CJCMIMA"],["pyCpyCNACEIIMA"],["nzC3yCJDCIIA"],["l0C10CNABEUCEB"],["l0CzzCJAGGID"],["whG09BHAAEIKEA"],["kqC0lDbCUC"],["gkCykDXCEE"],["usCmlDrBC4BEEB"],["8iCokDzBCoBGaF"],["snCukDAFDFzBCMEAG"],["0qC-jDfCaEOD"],["r-C98BDABGGKBMGCKRAF"],["j-Cr_BBBDAAKOA"],["_8CjiCeFULPCLIPARO"],["j3CzkCgBDSCCDHDMDBDKFCFfIBILEFFGFHAJINEEK"],["79Ch9BLLJBGEFGCE"],["jrCngCFABCACGCEBBB"],["mjC6PSAMDNHRBPKKG"],["spCoZBAAGKOCH"],["omC0hBJHZBSGAGSCEB"],["w0B8UCEEDAFJGDGCG"],["myB0TKDPABEEADCAG"],["o_BsgBBDDGAMGA"],["s8BglBDADIEIGH"],["syGtUNEIG"],["yyG9VGFDDNEEG"],["8xGpTBBFABCIGGA"],["uwGxSCLMIETDFNBDKDaCE"],["oyGlTBBAEBMCACH"],["oxGjUSNPDDQHCEI"],["8nG1KlBUTUoBTQL"],["8kGlJBDNGZaYJGJ"],["u3E0HKDDFPE"],["h8C_3BFGAEGB"],["l9C38BNBNYQIAF"],["1wCrkCeBhBFDC"],["j7C7iCADQAMHHHRFDEIILABFDADCAIVIQG"],["7zC9kCJFFEVAJIqBA"],["34CxkCIDQCEHHDbMHBAE"],["j0C3lCJEIE"],["l9CjgCBDRAJJGOWE"],["59C7-BPBEOSDCD"],["v9CxgCAFKFFNFCJS"],["n5CxjCQBAFFDLETBJKIG"],["l8Cv3BJHGJEPNDAGTWECAGQCEKMD"],["78Cj5BFBJEIOIGCR"],["97C64BPASK"],["rtCk7BGBJAEIUI"],["quE7IbDPGEGsBCGF"],["3tFjMGBHDDE"],["z6FjWEBADFEJABIKC"],["hvFjLFBBGIA"],["t3G5QGJADNAJM"],["p2GxRRCFGSB"],["-0FyQDIKGCB"],["8zGtYFBFECG"],["2zG1XNEAIGA"],["gyG5aGABFFBFKIC"],["oxGtaNGAEGEFEKB"],["2vGtNJDDCIG"],["4oG3OFARM"],["-oGrKKLBHIFIZXaFY"],["kqG_MQBKNRCNIBIHAAG"],["-pGhMADFCBO"],["mlGpKGJDDHGBINAMM"],["0lG7KFBBIIA"],["4kG7KHGIG"],["8jG7JHICGKF"],["ukGjKHECGID"],["n8G12BHDAEDBGJFBFCEILCME"],["4vGt_BCDNCIKGA"],["myGx6BDDIBABdHMOAIGA"],["82F5WAJHK"],["suF1UNHGMMCED"],["8qFnRIAFJIFBDVECOKG"],["ijFzOGDVAGGBGGG"],["ojFnOQCKGMJXTROFQ"],["wtExgBJKAK"],["m4Fn2BBDHCIG"],["-zFjyBDIGMGN"],["u5FryBEFBBPE"],["g5F1xBMJAFHDNQ"],["gsF1sBOAGDRBHFJCRBHGEGcGKA"],["-_FpiBDJBCAGCECA"],["s_FlgBDICOIIDIECEL"],["-8FrdEBAJHK"],["syE8JBDDECEACEA"],["81EkNDBBEEEEBCB"],["k2EmPGCCHLADM"],["i2E0ODADKIB"],["q5EiNDBAIGG"],["m6E6LCUa0BBhBLJ"],["47EoMTHFAFIWOKD"],["q2EyGRHOM"],["04EiIFBDKIEKD"],["y9EmMBECIEJ"],["k9EsMHIGO"],["s4E-QIDDJFG"],["04EuPDJDKEKGC"],["q5EsPJGIC"],["46EyPADBCFGAEEB"],["06EsPONAHXSLJEa"],["u7EiRFDFEGSIJ"],["44EyRBBHGACAC"],["y4E4SDNDQ"],["i5FpHJIAGKD"],["g4F5GHGGE"],["63FtCQBJHZAEK"],["qhG5GDOEEEH"],["i8FpDLAHIMCIB"],["88FvMICBJLEFQ"],["-7F7LJGEGEB"],["m8F1LKBEJRCCCBI"],["6-FlLMDAFJCHG"],["-_FrOIDNCHK"],["opFZUDUNJDJAFQDD"],["qpF_B6BHZD"],["0tFvKNEKG"],["-iFjCCJFDTI"],["4jFzBHCFMQC"],["wjFAUFCFDBLAJKBBKJFBBGFBLGEG"],["ygFyCFADKQMEFDJ"],["i_ETFACIGA"],["k_EfDABCCGCACF"],["u_ELGFDFMHFDFGFBAGFGCGEB"],["mgFhCXDFGKK"],["uoFjHBXJBLMGCCGFGGAIK"],["moFhIJPHAAQEADK"],["sgFxELDBCMI"],["g6E1FAJFCDPKHJBFJFABGGMEYII"],["q5ExGDFJEEKBMOGCNFH"],["y4E5GJIEIGD"],["i6EjFFFFIKC"],["y9EhDHOCG"],["w9EnCOAPDTBBE"],["m8EjCKAEHjBDBGCI"],["g6EtBCJIGEDBDJADFAMJLDGEK"],["w-EiFDAEIDECIGJ"],["i9EqEFABM"],["22E7HBFBKCQ"],["yjFrKGIIB"],["mkF_JJACMUYEDDBBP"],["qiF9JFDDKIA"],["4_EjKIBEADDHC"],["w-ExJNLPCJDIOIBQG"],["25EzNDAAGUMCH"],["47ElKSBEFbDDCCG"],["s7EtKFHHEMK"],["86EpKNLLAKKDAQE"],["q1E9KBACMEB"],["szEiFFBDEAGKB"],["sxE5EHHDOEOGE"],["kpEvBJDCMKB"],["snE0EHAGEJIKIGH"],["k_D0CALHBDK"],["igEoBFEBMIF"],["kgE6BADTK"],["6gEeVEAKUJ"],["-gEiBRICEKD"],["giEwBGBDFDC"],["4iEwBCFBHFIHBEI"],["gjEHIDDAREEI"],["yiENGDJHDI"],["onE3DFJHGJDBMEOIAOFEF"],["85D6BSTFPDCDKHELUKE"],["y9D_DAFDEFKAIKH"],["o9DtDHBAK"],["68D9CJEBI"],["-7DnCLIJQEKKAMb"],["i7DVFAGMFKKJ"],["y4D-CZMDIICUP"],["uyE-IBBBGIEAF"],["goB45BRCBE"],["0cypCNFFGNEYGKDEF"],["mdmpCDAHCCCCCIBAB"],["4sBwxCAHJG"],["qkB0iDYANB3BAYE"],["y-BikDTEcCCB"],["ogC-jDzBCiBE"],["2oBkkDpBA2CE"],["ooC-lDeFbBGDVDZErBBJEcAmBK"],["skCslDmCDyBH3BFhCEXEMC"],["u_BqlDPCWCCB"],["opCqlDOHLDbCdIiBE"],["yvCgmD9BEgCAEB"],["8oCkmDPAKGyBA"],["uXskDJBNCCCEAIA"],["iOoiDYFKHnBIRMDGQB"],["gYg9CPEQACB"],["uiCi5CCDHHJKTGWC"],["q9Ci7CVGMGWDHA"],["s-C67CDCGCUA"],["-_C67CDAPCFACCEA"],["ihDs6CfAkBOYF"],["sjD86ChBGUKQH"],["-pDi9CBBJCBAGCGAGA"],["qsD49CSBFDVAFCEC"],["2mDo-CCBHDTESCCEGA"],["24Ds_CCDLDnBEEE"],["s4DqgDpBB0BIAB"],["8vDwgDNCSCCB"],["q_CyjD2BFlBATEDC"],["ikDilDpBAIEYCaB"],["uyDulDNDzBE"],["0mE2hDHDrBE"],["6kE4hDHCaC"],["omEygDFCECOD"],["0sE4_CGDDBXI"],["-pFo-CTAKSSJ"],["u6F6_CdACCKCcCFBBB"],["oqFs8CfOaFID"],["usFs5CJDZGeC"],["wzGg3C3BKWGoBDCD"],["ysGopCHDAEMIAIgBICL"],["qwGykCAFjBYWABF"],["wjGq_BJEME"],["8iG8-BTJFCBGUGIMICAH"],["g-F06BHDDCYM"],["k7Fi5BJBIKaOKA"],["45F04BbLJAdXOSaQAGGFKCSKEH"],["usF8kCKBTPJIHBOQ"],["wrF8kCFFNA"],["42F03BOBBDXJLJBHDEAE"],["qgFqhBPHBLFBEOIGBEIBGKED"],["6hFojBDBHEWK"],["ojF6lBDABABGECGBAB"],["2jFgmBDCIQ"],["6gFgpBKFHB"],["0iFqoBFACKGCCH"],["2mFotBBBBCBCACECED"],["-sFovBDCCEBGKIBHGB"],["2oF8qBFDFEOK"],["shFipBDEEIEF"],["0hF0qBDAACAGGAAB"],["4hF-qBFAIO"],["-gFwrBDBFCACEECCCA"],["-9EwpBHEIGWCBF"],["69E-qBFEKE"],["q4EsnBNCLK"],["84EulBLCBGOD"],["41E6fDAAIGB"],["gqEsaEAAFHC"],["iiEgNBNFM"],["s9D0GBBBCAGCACACB"],["68DiICDFDDG"],["g7D8JDDAOGB"],["s1DyIBDHKCIEC"],["0zDmNFAAIGG"],["8zDuOFMGOECDMGgBIIANFJEPFD"],["m7D2OAHDABK"],["g7D4PCFFDAO"],["k2D-TDDAGII"],["k1DuYKDBDFADG"],["-xD4bDDCQCFCB"],["wxD0bLBIMHUEAKN"],["lLy4CFAeMOB"],["viG4XLCFcKKBMaLQT"],["vkGwaUBFDRC"],["zjGmaIAMHPFDIHECE"],["nlG6aEFLEDDFMME"],["lnGubJBHGIGKA"],["2gH8gCDADABCACGCGD"],["k5GuhCLCQE"],["g4GoiCaFTDRI"],["93GyrCUFPCPGGE"],["7oGklCGECHLBBIGC"],["5nG-kCPJEIKG"],["pvGyjCHABEICID"],["9xG2iCtBTQQMCEISA"],["nwGsjCKEEBLHIDtBNLAaKGGIBCCNECGQC"],["x3GqhCFAGGGB"],["94GmhCWBhBBFC"],["r6GihCXBoBICCHCMEGBHFEB"],["38G6gCGBABTFKQGB"],["t9G0gCTAUKEB"],["r-GygCFACEHGWB"],["k8CtiCJBHI"],["6iB-sBFAAIWMFP"],["giBqsBFGGI"],["-fmuBDADEIG"],["whBovBKDHBJC"],["ofmvBBBJKKB"],["0gB4vBHCEEFIMA"],["ghBmxBILDACBDBNGGEHDHEMG"],["6fgyBDHLCAG"],["-e4yBJEIE"],["ugBmyBHBDCECECCAEB"],["vVipBUDLDJE"],["tUwjBBJJFJOgBK"],["jRkkBFBCGOKBJ"],["3RmjBFDFCKEKUGCDT"],["1PqJPEOEEB"],["nTmjBBNHBFGEK"],["tfmVFABGMECD"],["vVgjBDECEGD"],["zcqUIDADJA"],["reySFABGGA"],["pW0jBFKCEIF"],["pd4SBDHCBQ"],["03BjPAJLI"],["w4BnQFECKED"],["q2B7OHGCQEB"],["0xB_JDCMM"],["sxB1HCJBBLMES"],["ioCzZNCEKKIGH"],["4lC1aREDICGOAIJ"],["u8B1QFBAGEC"],["6xBjGDVDEAQ"],["-K2EGACDJRJCAI"],["qIEFBBIKGCF"],["z8B1iBBBAKGG"],["2NkqBJCCGKD"],["vF4jCPFQOCF"],["rGqlCJCAGGC"],["nHumCTBGIFCIEOF"],["1H-lCCLHBAIHDEG"],["tH4lCDEMI"],["zB2rCKDJVAKNGMCHGIE"],["nF0iCEBJDHKKA"],["5D6pCMDRAFCCG"],["pI6tCAFHAEFPO"],["3H-oCNJEDTJFCKEHEAIMABEWI"],["1H8nCAHUBLHDGJARKQI"],["_IkoCEBDDLC"],["hJsnCFCAKGB"],["gZurCKBBDRDBGGBBI"],["-XsoCABBABCEEGACB"],["2UsmCFAAKYeEA"],["8S4kCPEAGSD"],["kRgkCADHCFDHECIIGKFBD"],["2P2kCRBGG"],["mO0kCQDADLBPEAI"],["uNukCFEOM"],["pBs_BHDLCKE"],["kGqiCDBBABCCCGE"],["gNy1BAFLE"],["sF6xBREAEQA"],["6B0wBJAGIKA"],["3iBmwBBAJCDCDEOD"],["5jBkwBDADEGCCBCAAB"],["hgBqvBSAJFLCDG"],["mS6sBABDADCAGEBEB"],["wSo4BNEEE"],["kS63BHKCKEH"],["4ZgwBGNJCBGDBIK"],["kaovBEDHBHIEE"],["kZqxBHAJMMADD"],["3_B-2CJADMKCQBHD"],["puB-xCFABCCEGAEBBB"],["9iC64CPEOGGF"],["3kCg7CVJZG"],["zgCy4CRCIE"],["55BgsCFFPGYG"],["l5Em8BGJNOEGEDFB"],["p-Eg-BLEAGIA"],["v8E0-BFICEIF"],["h2EsqBBABADEICCBAB"],["71E0qBOBJD"],["15DkiBBBAEEGGMEAHJ"],["t5D2gBJaAQ"],["hhDqeDDGCCBAPHAJS"],["xgDsgBFEGGAQJMRCQAUNAHDD"],["p7CwaDHVAAEIEKBIG"],["38C4bMOBGECAH"],["5_C8fUNATFGEACMHIRGEE"],["x9C0cNKCEFQ"],["j-CoeHBEENS"],["lhD8eAJLFDILGIAEW"],["lnD-aPDJGKAFIEGMB"],["jiDuhBYBhBHJIIDII"],["1sDsZBIKE"],["jsCoRBDDGGK"],["hsCkSHBCGHKKD"],["nsC2MjBDQIAOFEWGIAFH"],["5vC-NBJTEIEGD"],["zsCiTDABQGD"],["1sCqUFACKMJ"],["_sCgUFCAMID"],["91CiPJEFK"],["jpGopCJCSG"],["n_FsnCNBCG"],["_2FyrCMBTFDG"],["14F4qCDACEYSKB"],["_4FirCBAHAACGCIB"],["x4FyrCFJDEEG"],["hmF0kCKADHDAZYOD"],["vnFinCKHDBDRJBAMECHGBKIE"],["zmFulCNLDK"],["lkF8kCEHHAAEFCAIIB"],["9lF2mCHAEKMH"],["jlFkmCBFHALGBEMMOJ"],["_lFqmCJEQE"],["lhF0hCHEDIKF"],["5iFujCFDLCKI"],["piFuiCZQECSFIH"],["7_EqgCHCBGGC"],["tgFwhCDAAMIE"],["lkD1DDBCKEEID"],["5gC5BDAKOGSMEEDFN"],["l-BKFJRCEI"],["7-BuCFBBKGA"],["p_BFLHDEII"],["59BDPAOIGD"],["h_BGAFFCAGGGEKAN"],["1-BQDBBGKG"],["9wDdHCAEMECF"],["3vDjBHAMI"],["_lDmJJECGCA"],["pyDRFABGIC"],["hyDCSfDHJBJADGQMJKDMFAKG"],["ttEqkBNKDKQJ"],["9vEijBHCEK"],["nsEokBDJHEEOEC"],["hsE2eJKGUBR"],["o9E2IBBBGAGEB"],["47EsODAFGGC"],["w3CkzCFAPIaA"],["i5Do_CDAEGIB"],["m9DwjDJACCACEAEAGB"],["6pGk2CAELEBMQKEFJF"],["nsD44CmBGWAMDEYZCVMYKoBHVKKEdALMEGMEoBFvBMSKYEYBDGUEeEqBBKDILWHAFMHlBRaGNJKDHBBFeMMAHGKEKFMEMFAHQFJIGKwBFfGHEEEaGiBAwBFYFCFhBVeOkBACDDDjBFUALTUSaEGBTLUIULDKQGyBHQFCD5BPOAWIQBUEIBAFDDtBNYCFNSSSGYEgBDcFEDjCRyBGEBLFKBUGDEMEcJIJDDdCxBJeEyBFWFDFtBErBFaCWDEDFF3BCsBFKHwBBLDIFBFGEEDAGSEBJLHEAUIADEBOCBHGDAKUGCBHDCDOCgBLJBEFbAiBDKGWFZReGWBMGgBPJDVEUJJDbEGDFBWHXBIFJHTALICFJBMBANJLLGJBHEEKLLhBamBWVHhBDAEIEPBlBUDDHACJZGIHUHFDTAXMLBWDAJODDHQESHJDULGJCISFDBEDKIUFIDLFUBFFPAKBIHSADFIAIHFACRFAVUIPBDQNTCEJBBrBSBDFCJIBHvBcGNdOPBeVSBBDsBPOLMDFDEHJBtBMvBGTEROZAhBKGEPBZOQCIGjBGGGNDHIdQIIZAFHDILCJIHDKHBBnBABDrBFjBELGFGEMeKDGEE8BHOHDFGBEGRM6CIHKZQ2BYKMYIVWXSCETAAOLAEFJARKHAGEHCKErCNCMYCMGfKBGKCTDNEKGdCFQVAdONHSDIHBDbDxCIaJCDBAZIdDhBGbB_BGNBTEHIEE5BHnBKXWgCDcCrDUHSQKHCAGUQEMWMoBM0BG4BBCDtBRVTOLBNGHwBV"],["72C4nD8DBxCL-DGMEUDiBAIBHBWFFD-BCQDEBBB9CR5DJJDnCH2DIkBB3EdjBLtBGSLnCF8BAfHKBLDpBBtCGFBsBBKFFD1CD3BE0BJsBABHhFCcFiCCoCLRF7BBwBFdNxCBDRPFxCBrBKOHdBID-CAGBGHQBUEMFADLH_CNLAGGDEdChBIMJhCALKDNhBBlBGNGJHZCFGAHjBADODDCJnBECOsBKgCEfINIFEOGeCYDgBNiBDuBEmBSCEDBrBPpBBRCAIJImBKQAbCEMHJXHXAMKnBHZCCIcOoCGmCF8BKbDtCEFCGCgBBhCYtBIHKEGwDAwCVwBDQCjBCvCY2HWpCEQI4BM7CNVJxBHrCBcG1DJ3BEBCGEwBKuCGjDDrCP1BIHCECqDE-BK9CH7CBNEeEREqBGoBCjBAnCFJCeIrCAeI0DKqBFOEgCB9BIkCK0BDmBJMAPEIC-DP5DWeEPGyBDNIIC6CDrBELEKCgDB8BNOE5BOsDAmCLfIaIgBAqBHREMEuBA"],["71D25CUACDcLGLDHaHMNMCIFdCHFUBjBPYAQDcEJDqBDLAHHNCUHKHBRMHOKKUOKKAoBRITTACNmBdgBMGMSKKYIEaAJEKIVIDYwBAaF0BBPFSDCFiBBCDXHWBGDZLZAOLICBJeRFRtCbHCPOLCCCLELEJFOCWJOPADRENDlBOrBBAFeJtBZNDTAfOnBKhCAODCCsBDmBRsCFAFJHfZbHPECFREHGJBIHLCGHFDZDvBINA1BOGLMAFEyBJLFYGuBPDNZFjBAQHXBHFIJZIMFFFLAADJAMHXJAFHBCFRVJDEDFRAbFHaNBPKSkBAe5BNPkCOUBmCPeNYRoCPUJFJMIuBA8BJIJHVKRAVFHcXAFJDQAgBRINPJOGQAeVNOAKIIICKFGJGMJKWULQCIHIHYGIFEECJEECVUsCaqBcIUAcNWZUlBQCKcUDEEIQDFEGECILEGCJMIELEIIXBSOAMKETMFSgBK-BJEBDBSEcHAEmBKoBNCBDHKCKBIFFDOEIDHFIBDBOHsBDMHMCEGGBCFNNEPnBBkBFGHDNOBHRDBFGNHOBWIWAMFGJDNbJaGQSEHFFMKCPGIiBMOMKFEHEEFKICBCIEMCLGMEDGSBNGBKQBDGOSMDEDNFSCEDBHICMLHDGDKCGFVFcABHKCIJbLOEYAHJRHeGIHOBALVDYDCBFDaJALtBEeJHFUBJDOBCFFBOFOEIHICBFIFPRiBKCDKAPPYQKBILQDSGEHSDLHdFHHtBHNJJCMFJJkCecENAAEkBBKNNHGFUMOAWLGJDHENTDWDBDHCOH1Bd7BF_BpB_BFHGfClDAxBDRHPZlBFEBdLbZ1BKuBLEBJNxBlBlBJfNTRVJJCOHdNuBSQWyBa4BQqBkBwBciCUsBEaBYLCDLCKFDLjBPbIdHOCUFKJYIMFHNPJSBBFOZaDCBHDOFoBDBDKBWKGHMCGFCDFDQB5CZLCAHPGDFBEFBAHvBhBJCFKJABOOQJBiCeAEEBAFIFBGECeG7BAWUHBFGCFHFrBRHECEFBCDLFPBJEAJEBHFZDHHDELADJJEEEDACEHDDNHDJDBEBDBEFJFEJDZjBKJRJMDMTSEJIGCEFCJbFBGRHAKDBFEDP3BDrBVGMDIANLNMFFXAINXRRAIXOEMOIPHDLKVIFDHGAAFjBzBBKOWHACGFCEIHBHGAGKCHEFBIGHCIIBBBGIGGCDAGEHCNLFAEDDDGbJIMRTMBDDGJBIUJTKBgBRDHFAXSgBXCHFCBFLKSRDBJIXGYHGJUASrBPiBBHINNIAFDCADLDHKALcABJKKEDAHPLNCDGFDLEWLLJJGEDUBEBDDhBJDGAHNJHNAIBJPARHNRBGBJTNFAAFPFLAIDFDHGEJPLCDHJCAHHEDFDBNKnBezBDJGNFMAMDFAKFGENc_BDlBNXXDBGIBFEJUNGJUEIHFCQLDPaMOJGALHGIqBpBqBNGJBDFjBHDCAEEDBGNIEIHFZKOAFElBFIEAEFAFHHBCEFFPAICHQFNdCPBLHVIHBBFIDSEEBFDGDKGCJNHcPFHDEFDBIbOEDDLNGJFVGGADKJAPMJFCDFBlBKZBBCGGDCDHCDhBLIGJACIJBENNPXLPFKGRBHEKJLDBCDHLBADECADPFGHFLLECFIBBLERMRThCD5BDNETSVDLAMNUW1BehBGTUVDAKDBCUBQHONkBMaASKUACFODKGBMDAcSCQIIAYGSWK2BMSCeFCEFAMCKHAPXdBPJHCDKCJJADGCNpBHKAOFFFNIACDFZCDDhBXdMFAISJSIIDYBWCQGBCUDWEQHMASNLCADGAIHKAFGMDIJFHBEBBEDEPLXA1BFCCKFHCTBCDHGBCFHNUnBWZSHAJGABFGDMADIOLUBkBQWQUBYFaNoBlBBFEACOFKYSKOQEBMGSFBSaQMUDFFEDKWiBAqBYEMWKODELJLVHENIHDAGNThBUdOEGICORiBCQwBQGGMBAIPBDMEIIEObgBBSLERGHsCGQPcHMCaOSCTCBEgDETHTAIJBJIGKPEECDAICAONAGGEgBVHHJVNAMHUIaAmBVQLMPFlBKSQBSRMFCZKScDOHCK8BBMDDRMSmBNYTAHEEGFCNGMIXEKOHUtCKLUHCTPLRZVLbxBZHcBqBaIfMJQGMDQINjBIGKYICMOKDEEDEAKOQWEGDAEuCbENKKQLDBGCELHHEDIICHHHDZKKIUGBDLKIUECEuBPOCQFqBEUB6BhBSTQPODGHWHYCUDKPQ5BAlBTzBPRFAAFTZVLNXBGNhBVdJDAIHGFHEDNbEABREADXGvBL1BCTTVFzBHHPfPNFNDJCTbLLLCHDFjBAHIBJbDIEFEfFAFEBfNDHTAjBRtBfCDJJAEHCDHJECFMDJJCDAJFBIlBBjBHTRJTTVrBXftBhBAKOESKEQGACIKIAKEACIRDLMGLFPBEFRRLJTCJTnBdZPXNJdLdGVDZILKbBVYBIEUKKDUCTJFFVGVFDKPeLQNJVMPQDBVZfFNZNhCPxBFdCTGCRKDFBEBBPFBDLAJGHFJVHZBxBQHBDLGnBSFAFGBMCCGHCSEGHCPRHRQRFDDeHVJPNAdDHLFANVCdLZfEPcVmBFEHBHRLMAGDhCnBJLDXDFNDPOAHNBQAIFVJHRHHGCGVPBUDWXhBENJvBLHpBLDhBKJMSEEFBDEACKSIGGDEFCjBPJLTIGGAKGEMBOGYCdEHFJEPTJALIQGGIFDNDPCBKDADMQFGCAESBSIKJFFIEDKEGBGXKWNjBJJKREGEEAAOhBILOQCDIGEMFILOFCKGCBGNNHKAEKAbMMKQBNIAISAJGGSDBFRFEAgBOGRAFSwBFHGDOJLLAPKEGMFEENGOKAKFGFCBFTGAKVHGFBDHEBGgBWFMkBECKGEGBJTCDPFSCCMGCCJJTEAIKCQAEFEAIUGMDTICGCEYKCGCGXMCKGCCIDOIKGADQEGEADKECKHDQLESKCGJHPILLNCFAGGHEFQMuBKGGYJcCSHOAOCGQCESECIaIKAGQUImBOUDWMSJwCCMKIEUHcMWWyCBWKWDYGsBHMCIIIK2BDeCmBH4BnBcHQjBYzBU1BgBRUPKRgBGCCSZoBLMBQRODSReV8BZeXsBtBcAGICCIRoBEQSUeUMaDWDTDACILNZUIEAGFiBOKEKGAHKSUBawBQCKHGKKIDAYIGOAKIcwBFABGBDBMDBGICMBYHKMKHQEQfmBJUECGMQJNODDHEAFDMRMTCJFDHCBbPADSXRJPBHcHJJCJSPCDERAFBBHPYFCGLLEFEGIFOhBQDOVOAFOLHHTMJQIOAEJGGIbaPUfaCGKDFQLCADHFbGIDzBObOjBEhBWhC8BRKDBSJZICGHBDEDDIDNALJpBLbKVCdOJKlBGtBUpBefEdMRUpBSVcFQQIDGFCKMCQJEHQAOFMtByBfWIDCGRENUKBZODGJBGKPDFQKKEBHMHGJAHQVIDOCIVENSJCRWBKHENaNgBCQVGFIHEHFfQGJDTKZANkBfKPMFELKDEVQNUfGDDMKHKjBKJObCTMJEKiBhBDNTJNc1BmBDAJMAcNaXQFODFNDJKXKDKRMBEUBKCABKDDIDCIUjBkBbQFIAOHEBQJGBKLOBIEEJGHOPmBZQLCDKZERMjBCFGAUHEBKPKXaAIEMXODOCKQLNSECeChBEDBAJRIBBAKEBfcFkBTWMsBT2BQkBIsCBYgBBJEXCAMEFCIHIKEJEBDJcJMBScJwBAGJTVKCFAAEUQCFHFELFDDGHHQAMIBSGIFIADDCEGJGGCBKFCFKDAFBAGDABEMCCEPBEOFJHBPGDECEIFIEJCBKEEDCBJHDJALGNSIKAIHNRABGDHRCNEWEXAGGFAAIFFPBZMAIMKcEZALHHGEODACIOGICWNTQKKBGBHfPJRJOMGEKLHIWLBFMXIBIMGBFOFQAIFJKTCBIIEPAJHBJLFNMRGMSQERBNIEKgBgBFADEBJHJAiBDJENFNNHLCHOMGDCBQJIEGdHFNFADIOQMCNCLGLOLGAGZEAIHMWDRMOCTBNIAKGILJRGTSHWFDEDDAQlBRGNACIHIIEFBFICJFBdKCBDDSBIDDDMAGFBDTDlBOlBWxBQKGAKGBCLEIICRGlBLnBIEEDEJFzBGvBDCEDCbIIMVJZEKGjBEGCJECGMC_BHDCKKXFGAFHHAMFPHWEGDJDAJJFfAFEHNDGDFHCCDJFPANLJCVDHCCGUEOKPDPGSSCSkBM2BDlBKcOLANHXAnBLHFCDTHAFLFRCOFAFVFIBDDVBRLDHgBHCBDFhBREABFdFfRZHCFJHlCVFFKDHDDEHHbHFFBGBC5BRJACGIALCVRNDJIAJHBJEBFHBCKQEeUSIUEMADDIFEEQBJIKM4BYIDCKOKSKQBJIEOQGLCAGWODAKQNJpBLLKCGOALELFDAATFBbUJDRKjBJDFfASGDIGENCAGGMVcKMIEHAVRGBAH1BHdUPEAELCWOUFBFOGKFOGTEMC7BCKGRCCEFFFAFIFCAIJBBGOCLEUCFECGUOSCDEKEHDAMQGFEGCSCODFFKEIBcIMMgBDWIGGHSTIEESCEEBEJGLFLAlBPTKDBKDDDVIzBFtBGNGEIVIgBGxBEbKkCUeAHECC2BMgBBJCEBJNODmCBUKQDBGfCAELINEBEKCOFBFGDMD2BBDITCVDRGBEMIDApCEXUxBS3BMQEISsCCeIQKIOqBYGDLDqBGkBMGBFDEADDKBCIQAbGQGQEEBFBEB2BE6BWDBEBiBHVFIDgBKUDFDYDmBGmBDCBHFcDHDsDC-BLsCBwBF4BEoCR4CF2BPoDPHGREACMCLCIIQAGGcCCIUHJJoBIKIUAFCCCOBoBIUKqBACDDBvBNrBDPJNBbPKDHEeAFCCIgBIEGSACDKEEJSOQGwBKJFEDICWOYGRGGGeJWTSJeHOEHIGISGJCSEEBCNMBPJGDgBCOGGKoBAsBFgBJ0BFgCNwBBHESCgBFqBRFFZAPDLJMDqDD8BEmBIQJYBILKIYNEDDBTAyBbROBIYBHGCCJGDKLIAEIEBG4BGAEaMbDFFnBAFBAFTARGQM2CMSBMReFGHqBCuBNeBsBG-BDUCLGCEcNUDMGBEVGRDLIECJIiBCFEECUBOJWCJJeIPdIJSCDDQBAFnBCYRCELKaAGMPUIKcC0BWHCBKFEHHVACESIFCAGaEHFCAMGHEXBPIFBxBKRKBKMIOADCEERAHECOSKUBGGRCaOaE"],["9kD-hCzBMIGcAQL"],["_7C40CjBAJIOEkBDEH"],["rhDqvCOHPFXM"],["vmD2uCCDFHjBRbBHMUS"],["tjDguCMHPVFBRIAMKK"],["1iEugDZChBWeDOJQBED"],["r3DohDsCBSDPHhDCJECE"],["v7DgkDAHFDVITAFEQGeB"],["pwDygDPBdGFCBGOEcBSFAF"],["90D69CEHDHnBAxCQaQqBIoBJQJ"],["npEqiDSFAFFB3ECgDQ"],["9zEw-CRDXEmCUGAFF"],["zjEk7ChCYOIsBCiBFEBBJ"],["_8Du8CiBH8BGWDEFZFQDVDZNgBEWLBDYCEJNFIDFFGHnBHXADIFDKLRFTC5BgBXGTAlBQBEGIOEMBaNeCEKKDDILEcATGVBXIUEUFRKAEmBAECNC"],["jqDyxCQIQJYBMHuBLORHHqBEMFDBQDfN1BKBKXCAGJALDFJVHNLdHDCJW3BDBCKKcKDQMoBKMKCMDGHFD"],["z-Cs1CYFATDHXFjBBLAHKDICGUQ"],["tjDi8CyBAsBFkBPADID3CAnBFTEPOXGBO"],["j6Dy_CBDIJDDCFLDUDCJLEJDCFIDPCCF7CAHGOCVG8BMlEHJEaMwBDNAHECENCBCMGXCOGSB8BTGCPGWChBEQCfGBCqBGkBHDGME"],["phEkjDWBKFDFGBIEcEaFDFuBBQHJDEFeLFFfBZERM9BCFCACvBDfEJEEE2BACCDAPCaEhBCMEJEdHBCIIfAEK"],["7yDulDwBRCD4BDEBBHODaBPGBGGAiBBAFJDcBIFLLmBCOFOEYLrCNZJLCBGGGJBHNKDFBXEGHHHxBQURdINBMDJBzCKFCECkBC3BCPGUCnBI0BGMGyBC7BEtBFFAGEFAnBDZEEGyBI5BDXILM0CDQGtBBnBGiBCXIAGIAwCF9BMUIkCCCCFCfCAEuBA"],["71DkgDqBFCDNHWGkCEeHhBB0CFCBFBvCA0CPCDPFeDECBEICSFSEIDME0BHDEECwCKcBsBEqCHIDFBYBGHjBHeBKDVBPCIDFHhCFnBEFGAEPEGFHFjBDXEDDLENDnDAFCIKHCLFDEJBADNDnBCPECEJFPAPGHKCCLIAEOKFIjBU1CDfKQExBGUCNEACkBE"],["n4DmiD0BFRFQFJFnCFAEZIcCrBIJGKCLImBCkBF"],["hqE0hDiBBFDrBDeFDHTBhCDfICEHGEEkBE"],["twE2gDCBhBFWHRBMHpBFBHHBdEIQDAjBLIFPHXIFJIDNFTARONHbCTDJCCGLAUKiBCiDiB6CCGCNCWE"],["rnEi_CYBLHgBEMHAEIAFGGCqBBGJRVrBH3BAPExEZtBCXGFCEC6BMwBAWKnDHFCAGQGVCFHNCGFDBVDPENFdIrBEOIuBCmBIzBDbCOEoCGhCCECBEQE4BBnBEIIYCgBBQJsBAiBJHDUBUJuCBIEBEjBKQCAEhBMmBOUCQBHFWNLF"],["t0D28CmBHsBCcHhBTLBEDZPzCASDIFTRtBABSNQBgBmBBRKIG"],["55Di3CIAmBLWRUB1BPhBEhBMtBCDGEEWASIDIUDJIEGQCQD"],["jvE46CkBCMMWC8BLDFVHIB8BOAENEDGaAyBRWhBQBUKPKVoBMCFECC-BFsBPUfUPCHHJCDkBPUFCGqBNMAGFSAINFFLCFGFFXGNFCDBBhBEQHBJaMMAGBBHKBBHpBH3CEBCGGtBCHCBIJCfRjBBrBJzEHRODOvDIXQDKoDKuCBoBCzCQ5EBZKFCGE-COFACCcCpDDLCUIhBAPECKeKLIGEoCUsCMOAGDEL"],["11E08CWEEHWKqBAqCXKFzEhBPNbDJVFFhBDLCPHlBFjBYzBKVCEGGCBCaOCKQEJIoBYPGTSgEIuCL"],["l2D2-CHAFIQCIH"],["njD-gCJCQE"],["xiDmmCBAEKGCAH"],["1iDqmCJNBACMLNJBIONLDCUSCIDNGEGMMH"],["_jDomCDACESG"],["_4Dm7CLCCGICKF"],["15Dm9CPBOGEB"],["56Dq8CbBREgCIGBDB"],["z9Cu1CTKEEMBIH"],["3iDo1CFCAEMB"],["7_CovCZIIEUH"],["_wCmuCQBRDDC"],["ruC6zCFAIGKA"],["p1CqrCDCIKOD"],["93CmuCPCRKeDIF"],["hxC2sCXMaAGB"],["70C-2CLCOCEA"],["pjDo3CEDHBTACFfIQE"],["xhDk3CADfDKG"],["_iDi2CHEeMAEQBXP"],["ngDu2CLCBIaA"],["pxCstCIFLCBG"],["zsD03COACDJAVE"],["1oDoyCUDDBdEBGLIaF"],["nsD20CLECGDEKIMDAL"],["5pDgyCRGBKIAIFGH"],["5_Dg_CKBXFbBKGbAJCIEXCiCI"],["x-D4_CNAaGcA"],["_hE4_CmBFPDjBAJKWCEA"],["j_DkhDbCBEyBAID"],["lwD0_CPAPKYEKDDD"],["j4Ds-CdFFEaIQD"],["j3Dk9CVEOC"],["puEmhDdARIcGeJ"],["9tE-_CzBCmBEQB"],["jiE69CfESKQAKBGH"],["plCugCFFRBCFIAAFlBpBBPYUCFaCZPMCJHcCCFEGDPiBSCHUEOFCFXNMADDKBPJqBKDJRHCDLDIAHHIFOOSELNAJICGIGHPhBVBAUPLFCMWFMHELRBAEGPFRTTBFECCQGcUVADFFBVCMEAIjBJ_BIXFLCDMoBWfCMIBDIBMUQDDEEGHAAGIGIBFIUgBKEDEKGAGOOaIODCG"],["zjCm-BEDLBAE"],["pmCy6BFBCM"],["n9Dg2CPBAKKAGD"],["r9Dk4CLCDEQB"],["r3D-2CEBDFJAEEDEFHDCEI"],["p_D41CRESEGD"],["1iEw1CTGSAGD"],["7mEo0CBDHGAIGB"],["jnE4zCMAFF"],["4burCIBDBCDJG"],["vwCurCBBLEDE"],["2Y43CODLAHG"],["qdw4CXJTBNG"],["ga03CPAKGGB"],["ggB-4CWDVDLE"],["wdm4CCDPFNEaI"],["gem4CFAHGMAGB"],["qRq1CKABBfHCG"],["mQ60CFBGIGC"],["8Vg3CUDEDFBAFRAPHLCGECIOCDE"],["iYy3CODfNdAMGMCCEOGEI"],["2T21CMGEGOBAFTJlCHOIUCMGGKDCCGSKGDLHGJ"],["gTm2CIFHHhBEIEKACEIAAE"],["iOixCTAKG"],["sGsrCADDABK"],["5iD--CLDNCcKGB"],["x5C2gDhBCUCWB"],["h4B0mDrCKXKmBE8BHGD"],["pXqmDPAVGAEMA"],["_V6jDRFXATGuBIWACD"],["3XuhDFAFQOCCL"],["nXi_CDBPSCKMB"],["vWo-CEHQBED7BACK"],["tWihDHCSGBF"],["tlBuoDmFL3HFBD0CE2DBsCEaJuDHIDDB7BJjIFLDODkCEsDBWDMHgBCQKmCCIDDNnCZFDEBqEiBSACFkCD2BQqCAoCDoBJjCNzBDIFJD5CHgBDVH9BD3BEbJBFGDcACBDNKAGFbFNHrBHIDfhBOAWI2BHIDFBbGVDKFuBJiBCGDBJJFrCGrBHdEJDcFQLYCqBHDDSJEJAHFDlBEtBLXEWFcEIJJFIAKEIKQAcRCHrCJfGIKJCCFPDGDFFwCHFNFBjBAfHjBGjBOVFfKcNxBJvBIcHnBDIDuCKOEkBA0CTATJBAJlCQXWvCNqCIGLVHEBWCyCTGFQAVJADEFEIWCEZGLjBDBQJPZAXILQLG1BOvBEADyBBGFBFlBJjCCQDBHnBJiDAEBDBlBJDBKBOI8BGsCH2BAEBDBdFADfBEFVAEDDBjBHEDRDFFfHtDPXANDTCEFPB1BQGHFBIHlBNnBjBLDJHVHZIILdLAEFCDHPCbJJEIMUMhBEQFPNNEMFAFtCFWHBBXJhBAGHMCSPXLfEWHSCCPJHJBBJLHRALGUJJHpBBgBFFPILTFKDNhBNJhBEcHENHDZEMHJBHCCCNABEKKPJfICGQEIIZHZGDIMQnBP1BBAESGZABIREFIJEEEHIWIdDBGEEdIAKUOXJpBiBDEEGDE0BIJACErBHFESOQAAEGCOAOJDKPCRSKPTFCGDBZVHIFeLImBOUEXDhBJHGRABGGKLC4CiBpCbVBBKKKOIaCzBEHGEK0BOsCHVGIEfBXE3BLGMSO-BFQMACnBHvBEOMSEoBFSCOIRBGQgBAfCMSSGFGIEtCAdKnBEVMQE2BB0BLgBBXICKTGeAPE_BEDEIGsBKhCDBCOGHABILGDGGCLBUPNHHBCHdDZEJEBGOQSKdFBEOCLEcEGGAGLGJBNCBEOECGFELBNGGIEAPQnBAWCCEBGSE7CgBMGJIrDSzCIVFREpBFVEVDVCBBQFHB5BGvBM4BK9BEJEIGjBHVKWGgCAiBImCDBEGGTGjBHjBEdFvBKSGtBBjBGZKIEDCKGgBEqDKECFCaEmDEWMUWYEpDANEIIkDYgBCaFHIKE-BBOKDOeGuBAsDVpDa8FOkBHETUIEIFCEI0CP2BAhBIVMBCmBAwBBkFXICDKEGMEDEvBMoFA_FENEOEeBgDKkCFmBK4CNIGfIqBG"],["nnClvCIHBDJABGLAfJXRFAIDDBEFdGDJLGrBVZAEHNAHFQHJBLLSHyBGCBHDJAEDFFPIJDBHNKXBBBILDDXSTBEDRJOHLDZGHHEDJDKDbDEJHJGDHFeECDXHSBJHEAqBFBGKEmBCdFBDQDDJiBRGDCJSJBHHCHDQFUAHHLBCFaCOPnBPeEIDBFvBH-BBBPVAAFeBGNQCCDFJRENDrBGIDGJWBMFLJRCLFgBBfHqBCEBLHxBCQNTFNITCAHbDWBEDpBFoBBBD3DV1DNjBL_BDpEGtCBDBGFkBPUF0DHBDXJzBJnHSnBDmFXDHLDhDB7CQvBQEFSJRABBGFOFgCNePOACIOC-EFGJTJtBDtCA6BFoCCcLYRuBCkBD-CKmBLuBASHoDLgEFIBPB5DB6BDvCDMBCBDFIDgBBuFG3CNiBRcAADPJGBuCB0EmBoCMmEIwFCIHRL6BA4BIkDqBgDM-BFyBGYKiFIMG6BE0GGcEGEjBEhHGJEAIDGNC9CFvBGxCOCMcQmBMSM8BMWA8DgB8FYwDCmBIoBBwBERI0BiBoBEgBDsBSBE_BBDCOEVECIiBO6BAGELKsBBkCQWUBGtBGHIQEsBJOKSGLGECoBHYTmBEEOJKEEoCGOFTLAHsECYFmBIGDGLIBsBS2BK8GUMGgBDaKoCTeByBWLGQAKHUDwCCYGIBEH4BFOKWEIDFNOJiCCMOOKaJBHcDQEQMIAQFAFOHmCDsEc4BCwBKIEIMDINOEIgBIeBADRHCDgBAeXyBCUFcCsBPBGiBWGUOG4CSWKqEUDIKGgBDJHQHcCGLMIAMWKTCJGgBEeJWABQHCBGEG-BSmCGiCDqBPaDIFHDhBCOHbNOBYIkBCsBJUJyBE4CJoBG6FPwBGEDBHQPRLEHDBEJdDADMHDHjBAlBPcFqBCKDBJNNfNXXVlBPHgBFaIAOSKuBGmCeGSMOoBQCMUKaEYFsBCSOkCScQCKUI2DU0BEIGoBOwBB8COkCA-CMyCHeIcF-BGYDWGYHUA-BMUQyBE0FXaHOAKDqBFuBQAIMI4CMYFaPmBHOHPLxBFDFGDqDQwCD8BIzBNKB-CKcKmCKiBDYMSCgBFIJcLkBBgBCUYiBKyBBgCGeHEHEAmBOwBLgBEkBH0EJeHqBEGHSEKFZZCBIBmBKiBCiBNCFDFMD2BDkDEEBENGBKE-BFYEEQECgCbwCLSEqCLOJCHSFQHOVgBHEELUaGcLaBQG-DLYPwCRGIGCQRFDTAFFDLMCBHlCGOFqBHLLTFZGxBDbIQJiBHbFtBBKFdFHUNABFKPHDYThCANGJHVHBNFD7BD0BDCFWJNLMDCHFDEHLHaDUNAHGDMBADOBCFRFaDeKKJ4BHEDDDVAPG5BBvCLnBOFAAFSNrBANFGJZFODTDCBUBGDnCLHD0CBFFOFXBSDALJF-DdEDlDHGDkCBmCI-CRIHMBUEUDNHXASD2DDiBHsJVYFAhH_hOAAiHsKHoFL2FBkILnBMiBC1KS4BElBGcGDC5BI5CB1BOjGWHEwBDyBCoEPwDCcDSF2BEkBFuDBwCIQEZE6CGiDWjCUeKlBI1CIUGyKKECtBGBElBERGQIsCEFEMCBExDOpBIBG9CC_BMNEKE8BGQG1DCpBKHGKMCOICiBFmBG4BBkBDSFmCBwCN-BOXEDCCIyBJYEkBJSCHIMCRGMEDIpBKnCApBG2BKyDLlBMEEME0BCuBMwBC8BJNI8BO0CEmBBQMkBG-BFmCE6CFwDI6GBqCE2BK-DDYYsBHJJQDVHHNgDIECHIECDKYCkBFCHBFJFjBLEB0CAqDFkCKoCA4BBaJ8CEIEHCjCMSIDGtBARUpBEDECGQCkCFoCG9BKhDCRUKEeBEDJDEBoFAoCLuBEoBD4BGuCFSCIGBEUGSBIIOAYDNLGFoBCYFoBGgBLwDNkBEGEDOCCiBFJMGGmBFWHGHuCCEDPJEBmCI0BBqBKyEMiCMOKSUXWBUHObcBOJIWEgBBQKBEPIKEEMKINKKMIGhBACSSGGLMCEDAYIEWACIBEGGSCDEeCFIIBAGaEJGAEMKcDBIWECIKDYGWMKK2BKaK6BMMA"],["y_Gy4CHGCE0BSAV"],["wWmqCWCCBHBDHzBRfAcFJBEJBLFDELFJCHVhBFDtBCCDHANHGLHFxBACOTWOBFIIACGTMNWDABKFABKJGAKHADaCEIBVGHIBOBFFDCHJLNBLGEF7BfbFRADGFDHCEGXGRIDIEIUFKGJBHGCISKxBPEQIGMBSGRCQQOGCJGKMEhBFnBbCSUAPEFKUKPFFEDQoCEKHAGWEJEEGFJNBNGHFrBBLGAIOCPIAIqBDeC7BEFECEIAWKcARAIIwBBGCFCWE1BBIKYGWAUJRMEGQCLGKEWABDCBWGMHeCAIYGFEKEJCLFGBDDjBJLIFAAEmBYmBOCCJBIKaIGDSEGGTFLGYWOCJGyBIlBBBIGIeGLESI0BElBCUMaHEGRECGRDBGOGSALEcIMNBEGEHI2BGpBEkBKMMQCAIGEYFJIQCIIUCBPMQOGCNJJQIKBHICIWAMEUFFIRImBAQEaNBEEGoBSFGQGYFUAVNHLCD6BgBKBHHEABJQEMMKALEEEKEWBKBAFTFOBBPQUKEkBHMCIDBBeFAFbF5BCgBFEJQBGGIFKEiBDSEAGoBJDDbCDAMFYBADSEDLHDWK2CDsCTcNsBLKAAEYLWFIRIBFNrBV5BJ9DObILBBEzBILGEEpBCYFBDQHOAAFSDLDeDYLEHPNQPCHEBDHIDYBcPsBHUGEGDIdEXQBGKCEGKCiBLmCLMGQCZWAKkBOgBGcQqBDQFDFMCKFAKQQBMFGTGSeBKhBQcDqCBgBVADtBDZNaHOLYDuBIKSBGoBEDIQB-BS0BKQHMGNE6BQcAbDGBHHIHbHyBCODCGUIaEsBDoBOkBEMJJFAFaDGEAKYCSKDGHBTUeKkELeHBD0CPeNeFaYXARMDKPEVEFFDIGKMEDEGWFERBBEIGHCKI2BQgBmBOM4CBwBHJbbVeLEHATJHGRAhBoBRRLDRRFdXTBIJhBHLEMGPBPGjBBIHgBHyCFKEEI4BSKQcOAMNOIOUE2BGgBVDZYJuBCzBGBKEIOCNahCOXAXFnBEEINMCEKQUQdYTKWQ2BMEEBMJKWAKHGLTNAFKFHHSHwBDaAcHcATELIbCpBKPOgBGcHaCHITBBEqBKkBA2BLEFgBJ6BAGBJHbHBJEHHHCHQUQACLNPQDBISCKIXWQSAGNGVEVMxBKHIIKNGDGAEIEAE4FGkCIGDxBNADkBJdKAEuBGSINEZOVCQGUDOA5BMQGaDWKCCTCCEaAmDS8EMvBACIMA-CCUBRHiBEEADDoBEuBKsBHLJEAMGAInBOuDBZEGGHEEIgCU4BKkCHOFpCLuDBUDfPJCAD0BAUK0DBiBFGBFDaAIJFDSEDEKAMNMALNrBMULMCUFFFbL5DbCBDDbDjBNlBDVJTBTNVFWCgBMyBA4DWECFCnBBGIQCgBBEEQALDGDeFaCGEDEIBOJJHODBLLHGHOARGOKAIOEPGWE0BE8DDUDTBAH0BJwDDIAHEYBSKLKEIuBEqBJABaEEBBDKBUIcBUJiBFTHQBKFhBFkBDEFAFDBNAvBMuBZICAGEBKFXDMBYTgBHICKHWGUOBEKMQMUNWFoBBiBIWAqCRDESEPCOIWCQHgBCLIAINCiBKnBBBISG8BERKGC6GRAD5BCZFMDgDGdNDAKITEDHEDbABHIBiBEwBW6CHUJlBDDDiCHCBVHiBGaDULNAeFoEKwDFaFWLEHJREBqBHGTMHHJLDKASOAUYIqBEwEHqBKMFGNoBFMLmBCSIAEPSRCOIAKyCFeFGGiDBoBJuCJuBPA9E7BRdEhBQVBcBGFFBnBG7BJ8BIMHHDyBGCAALKFODIGSTCHLDIAEFCGEHSFCDFDMJRRnCMCINABFIDpDdjBDRLLCCFTFADnCXJTNEPQNGrBBjBFnBVDGIUxBPFJPIRFCEPCPJDTrBhBHNEHOHKKYFBFPLBDCRSDERLHHAHIQKPAFDCFRFPXELMRTJhBCbNHPIZREhBNLGADGDDRPX1BhBJSFsBJOV-CGiBMaiBYGGHMCCYAIIaAkBUaasCoBMMiCSFGSMHEIKIYQGYDIEnBKpBFNZADKDFFJGRBhCjBXDKQXDGIBGOOCKdHNKtBHXCNDPHBJXJNLdLZVFLgBDIDAFbARDLENAVJTEHFdAJIkBCKCDENARKhBBGCnBIXDGFPCBHIAHDJAJGdFlBITLTKjCAxBFVJRNfNNTRD1BdlBfhDvBAHYFmBADfSAEKDGUELHUFXPcCYOAFLLICIICWYDUCkBZaLCDHHNEQJALDDOJFLPLRfCZCBFHCLHVEDLVdTNTPNJTZdjBZZZLFNTNLtBXhBJRIPAAQNHDAGIHBZXRAGFDFTFTTBhBNDhBXlBNANFJQDWPqBhCAnBGAADNdbDBJPGNBBBCHLEEFHHFEEINLFCHHLOKCBCGCHADOMQDEKIHMBWLABCOKMBCFGGJKCEJQEELEJFNKPLBGLEIGTCOQUGPEKUBKVIFFLQJFRCfLTJNLLBBFTDBGYIBEGITABGKEAIMESWPOAEDDXCZZrBTPVbFJIJDJRELOHmBFGNDBBLOHSAGIQKBEUGkBPQEYFHNCDFDPEjBNJCEHHBBJJDBIFBDDIDhBbLRCDqBTYxBANUHCJSPADFANGPARKRFaCEHiBTKPTDXRNCJFMCGFYGSLQFXNQGCFBNHEJDKHFAEDFHENNDDGHLHBEDJLAHLLHRHBDKDDDCMRRLLCIFKCBPCHPCEHLBDJJDCDBFVCDFFBIHPPHADJBEHDHCBHHDCBFDDJHCPHHCFFLENHHGDHLAAJNEEEPOAMDBFHILAPPFBGFLFCHFJIBJNENLXBRLFGJPIDBHIFFHPABECCLSCKKOJAHICFRDAGNCFKDAAJHCBFRBPHBJHDRCCJHHBJTNPnBMRYVAJFC8B5BICelBU9BBVIbDGFDEJDACRBCALFDBJjBRDHdLJKBJHGFDGAAFLAOHHJROQVFDVSMPAHZLPRNBGGDCCgBCIIEBGPEPQPEJDBEGKFKHJHAAWVeBDhBYfBCgBNEXHELFNCVhBpCEpBYCGbGFACGJKnBJMBIDFKPYNUAMPWLILaXKXDjBEfONGNOdDFHKAFTDFIXM5BqBAOXcECHOJiCJSPSAIFECGJADKFEBIJGDIDEHFDCBUS6BFFBCBYKMCYGEJCCUDAEEDgBPiBDLASHUEAHIDqBDEGWNBHYNMCNFNLHJKELVLNRDCCOFJJBBQJLCYJPJDQ-BRwBEAHGAQDPJGHMMDIIPOEERGDHFICOHHCGFIBJPUJOHwBBBLYLJJBLSBWBHLCOHFTGPNTHCGKJFBEEODBDPJJBWAPFHJGBKDFELHEDFAQDEBRFBFGBFFCBCGSJIIJHJhBNJJGVJPNLFCCBDDXHDAAIJFBFKCbTZhBRJRRhBTDVTHRALXNGNHJZGVDLIbFIDDMJDZPbFbECCFAjBVBNbCHQFPCXFHHFTVLRITYJWBUGPCADOFITyBdwBVuCRWFOGAHGEEFCNeR4CEOBGDFBEAIIAHCFUKgBDSHKGEFAUMVBGKHCCGKEXAEBBDHLGBCHJPnBPTE9B6BEGKFkBKMWFFbHhBMPUQMVJDKBDJGHDAEDAJKFYREAQJOLDMBhCFFDXITBBFhBCNDDCLBNCFDdIFGDFlBIPDJGnBERGLoBLOZA5BZPIVCnBWHMRIRCLMJYHECIHEBKTUDMTFTMGEHCFRPDRCGRHCJHOBe5BAHSHBBIJeVFCIPBHDAcxBCBCEDUKYKGMJBPERFPHBGBDHMAGDEJKBWIuBDOEKGOUwBoBIQKGDbCZMVWVsBLMCGFchBOFAHRfRPRbJACIDALNFVEblBJRdjBFJJCLJJnBBRJnBLNLBTjBPtCXbXZAXPXHtBDXVRAZHLGFBJWCSHMFmBDIHEGEDMGQBQToBZWPcTqBZUNGRWHOCIFQCcXsBVUNENUCGDOtCuDTEBDM8BHLNxBHJRMTUDSRUFSDADLKNCNkBpBALMPEVyB1CYVJBBDIhBWLYZEPMTDAADCjBKzBsBdOXQ9BINMRCOORoBPSXYPGPEAMNMBKRALfVYCcdSNaAiBQeDiBQMBiBIUBqBMcSSFFTCbDHGEIFRBDjBdxBJJXtBHZpBhCtCvCtBbvBlBjCnCXjBPDHRTJHXJNNjBJFR3BCLcZJTALGAAHFRGTIJEfaNILDDEDHTGZBTEFFNEACrBEDBNEGCBCNJLBNVfHBCFdTlBLZLVRVdFCAFPFjBfLEEDBZMNKhBCdEBCOEHCZJhBIADNRThCXVPHNKJEGBdThCpBjB3BrCzClCxBZfBJLVEFHJAjBGRDbELBRLxBDVNbICEJGJADKJABJDGEUXiBEGIBIKFehB0BX6BJOfcNWHkBHIDyBNiBDyBEGBOnB-BLcbyBZmBB2CKOWyCSaQMMQGqBhBwCOOCOX4BTiBeKXFHIBUPe5B-BXUMBRILSIAJCHWKNIEHCCIFDFENcKDOOCcEHODIGREJKIEEBASHEQgBGuBLSECDADIICBIHABFRIDSJECDFAAIDAHGCNZADEJDHGCHJDFMENHABGBFLBAGBFDATODIFUIEFBHGKCDEJBJQPMnBEKGNHxCJHDFJbB5CnBxBOKCFCBGFHdGTBWAhBDPCBBMAhBFhCZbKjBStBqBTIBGRKRQdMAOHBFEDOHCDKGBIKLBAKGCHEHQJGAQDBJKPEFMAIDBHKDFBOFDAEHCBMQEHEFDDIQGhBFCGJBHGEIHBNKOGFEFBBcCEECKJmBInBDLWGGHBNaHEDDDEQGYiBEiBOmBAmBDULOIGFBKgBJQFALSDBBJBCGqBYcGUQcHFEIoBiBEcOeiBYQkBKK4BQ2BsBWcAOJKEcScESecgCcWiBSoBYEBFEFYPyBASIEJmBBoBWSIQAOMmBO2BEOIiBEmBAWJwBSSHMCBGKBSHkBGkBOGBAFCEMBEPEBWMEAEHZXENQJEPPVZTAFKLQBAHKGMNBBsBPSBWEsCTGJGTIH2CTsBZaEQQGQHYGQUQqBOWBkBLAJIFiBHeAORaCiBF8CXkBQKAIIUENFSCEGQFQEKHJGFHOHIEBEOJ0BGYQuBqDOMDiBFGISFMQOAGFEZLbInBXjBFPGPOdKXCHXdDTGJQZEHFDAEEVBDCWEKInBBCGKANKFKGECKlBMECCMILUEJCFIKIHCCGFIIKfDEWWQWCIFKCECDEEAGABFqBCHGGEkBEdIBCEI0CDIIiBSsBK2BBKEGABFIFKDUCGJIHQEKF2BLqBIgBFuBSMMCKNgB9BctBiBTENMNALKVIMGJCGEOHSGBGOSCCEDEGMAXMFKeABGgBKBIhCHdNlBDfTKIBGPJGTSPcGSBHNVBPENLZDVLRGGOBIpBMuBWBGFBJGbDZIGGREgBDKGVCLWGJBLLAAGFFXDFLRPVFENHTTDCKFBFPEAJJDfDDLAHHBRPLUPAHILiBLDJfEZFJJTHVPCIWObBJKdGLFLEPJNCENOBGHRIFAIJAFLKHCAFIFJCDIPIAIJDBRejBHBAGJCAFGDTHcHcPCDARTORFGLMFNDFGJCQrBRODAFLBILOFBBJLOEMXUMMKAGGsBPAEIACGdKlBFDIFFRUOCAGLBTORcRKDEGADKKuBPGVU_BWaFfWTGPBBGdUDEOAROFULIJCNTDAHKFQMGFERAlBLAHKLJJGTuBZShBWRYLoBBJPyChBURDPJGJORCHGJBRbYNCPVHBPTRNABEAGKMAEMGAITqBdKAIHIPBEGPCLSZARInBiBTEAGRQHAAKLe5BSdTdHbTRFbININDZKfPHNKVFFEHtBZpBJNJIDLDlBrBGRQLbRLVEDZDLFRX5CDLHTDHJLDPGNSAEIGHBTOCEnBLdEPBIQDoBKBFEPBBIKECKGENNHBFEGWIIMWGaBmBFCEIDAAGIGDCCEBKJBEILICGOIUCECAGWGaHwBE2BJkBEWFGEkBDUIKoBGGBCDDGkBKFMPJSPKGCDWZILOEIHECCQAdECGLCBG7BGPKOEJGOARCAI6BMWLKESBEEUBFGBQJUYAELoBDWGJCCIwBQIGAUGIkCSgBAfGMCUFJGIAJIEGSOKaMAUMyBIQFFEGKSCOAIJGGGDADEUYBYLTMLEDMJCAEMGJKFOEABKRIAoBUDKKGCGDCMFCNLLDHEOOiBCUSaGFHCLHJAPaFHHRBDNLAEDPJCJHHKBCHKFFHkBFKECDJHCDWBQIMAUMSBQJKAKNaFBGXEDKWJoCQOKcIiBEaFLCQPWCSKEKSCMGQUBJRNYBCUHOAiBAGMIEMMKgBGYPGHOFeMDWKWRDNEJMIGHABECMYEBCOEqBCCGgDJGGAKMDGGSAIGmBFCERKZAPIFGEBCEFEpBJJEZFAIFHRCEDLDDEvBNnBARHIILIFFLAGOtBIDOIWBCECNQEMJMOSIADGeEBGMIqBQmBeeCBEECDGEObGAI9BDNEHBFCFJbHCFHCGFPNONTJJNpBPNCLJRBLHIABDLDJCCFBBGBZFKHLPEFJABDEjBQFMCYNADKBIJ","s_B26BfNVDADFACDVHCHJChBNHEEFHNJPDEJJBHYNGVIOHhBMNadQLahBOHQDGHRANDJXCJHLHCDLAPKdKFgBDIJYNgBHwCOGAHDKBFuBCoBFKNGHDEOOBFECKTECJJMBOIaIJSAKFWCDGQAAIXSNaXBHDFLCTPcIaBIbELMLAAORcXIGIuBBVOQSoCARIQaDMEGJMPCNFlBK"]],pieces:{australia:"gzF9ODNMNIfBLIXIDUIIJaRG5BMTGAKdDXMLCRePKAONoBVGHFCBFUVKRKhBECGFCQWPCIGJEhBMNcLMTMHIPKJAJKJBxBUpBAPJZDXHZDjBPXDPLJABNFNXFDANHBGBPRBTJHNZJnBAbRH_BHpBbZDGFECBLJMHBFKPEGGBGHANJJGIAIKHITJKBrBXrBQdGDFHCPKXIXaCYDMfeKEEDAIfJLCMYAKPYPnBfDEOQAEeSWDQGEHUAHNPHRfPVXCNFGFDVOEEKDJaLMHQPEHQGAAIXORARKVBpBUNDpCDhCV3BBtBXTDPXNL1BDDGZA9BDPPVFdTLB1BCTIROVIAeOFOSA8BXuBJ4BbqBDehBuBEBCGKRKCAGJKHQCEKJALGGGLEDEEASf4BEYKSCUDKMeECCBAXKGMWeMWScQcBgBMWGOKUB4BSOMUgBUQHWEQSOKOYpBCSKBAINQGEBIGAEHIGKFSANEAGICCKFDDICKEAGKOHAGFABGIGMDFQQICKCBBJGEEFEECUIFGGGFKIAGECWLebFXEEEBBKQMSFGJCMQLAMIAJIEELGMQGSQKDGAIKKICAIKDAISMGJYAIEGDEGICBCAQFGRCJGGEIDIEOLKEKLcFUHOCMHGAcOHNMAEHGBAMMICHOHPRCHFJFENFAZVfCFeTEFQFEHIAcNWReHKRgBNSEOIW2BKoBFYEMFOIWBMIGEABIFEAGGOEBIsBMKGBBDMRAT",taiwan:"o3EocFZDAFQLIHWCWkB4BWKONVnC",greenland:"tlBuoDmFL3HFBD0CE2DBsCEaJuDHIDDB7BJjIFLDODkCEsDBWDMHgBCQKmCCIDDNnCZFDEBqEiBSACFkCD2BQqCAoCDoBJjCNzBDIFJD5CHgBDVH9BD3BEbJBFGDcACBDNKAGFbFNHrBHIDfhBOAWI2BHIDFBbGVDKFuBJiBCGDBJJFrCGrBHdEJDcFQLYCqBHDDSJEJAHFDlBEtBLXEWFcEIJJFIAKEIKQAcRCHrCJfGIKJCCFPDGDFFwCHFNFBjBAfHjBGjBOVFfKcNxBJvBIcHnBDIDuCKOEkBA0CTATJBAJlCQXWvCNqCIGLVHEBWCyCTGFQAVJADEFEIWCEZGLjBDBQJPZAXILQLG1BOvBEADyBBGFBFlBJjCCQDBHnBJiDAEBDBlBJDBKBOI8BGsCH2BAEBDBdFADfBEFVAEDDBjBHEDRDFFfHtDPXANDTCEFPB1BQGHFBIHlBNnBjBLDJHVHZIILdLAEFCDHPCbJJEIMUMhBEQFPNNEMFAFtCFWHBBXJhBAGHMCSPXLfEWHSCCPJHJBBJLHRALGUJJHpBBgBFFPILTFKDNhBNJhBEcHENHDZEMHJBHCCCNABEKKPJfICGQEIIZHZGDIMQnBP1BBAESGZABIREFIJEEEHIWIdDBGEEdIAKUOXJpBiBDEEGDE0BIJACErBHFESOQAAEGCOAOJDKPCRSKPTFCGDBZVHIFeLImBOUEXDhBJHGRABGGKLC4CiBpCbVBBKKKOIaCzBEHGEK0BOsCHVGIEfBXE3BLGMSO-BFQMACnBHvBEOMSEoBFSCOIRBGQgBAfCMSSGFGIEtCAdKnBEVMQE2BB0BLgBBXICKTGeAPE_BEDEIGsBKhCDBCOGHABILGDGGCLBUPNHHBCHdDZEJEBGOQSKdFBEOCLEcEGGAGLGJBNCBEOECGFELBNGGIEAPQnBAWCCEBGSE7CgBMGJIrDSzCIVFREpBFVEVDVCBBQFHB5BGvBM4BK9BEJEIGjBHVKWGgCAiBImCDBEGGTGjBHjBEdFvBKSGtBBjBGZKIEDCKGgBEqDKECFCaEmDEWMUWYEpDANEIIkDYgBCaFHIKE-BBOKDOeGuBAsDVpDa8FOkBHETUIEIFCEI0CP2BAhBIVMBCmBAwBBkFXICDKEGMEDEvBMoFA_FENEOEeBgDKkCFmBK4CNIGfIqBG",africa:"2oBulBHLKNCNkBpBALMPEVyB1CYVJBBDIhBWLYZEPMTDAADCjBKzBsBdUlBKvBUfCOORoBPSXYPGPEAMNMBKRALfVYCcdSNaAiBQeDiBQMBiBIUBqBMcSSFFTCbDHGEIFRBDjBdxBJJXtBHZpBhCtCvCtBbvBlBjCnCXjBPDHRTJHXJNNjBJFR3BCLcZJTALGAAHFRGTIJEfaNILDDEDHTGZBTEFFNEACrBEDBNEGCBCNJLBNVfHBCFdTlBLZLVRVdFCAFPFjBfLEEDBZMNKhBCdEBCOEHCZJhBIADNRThCXVPHNKJEGBdThCpBjB3BrCzClCxBZfBJLVEFHJAjBGRDbELBRLfARDVNNCNGBIPCDKJABJDGEUXiBEGIBIKFehB0BX6BJOfcNWHkBHIDyBNiBDyBEGBOnB-BLcbyBZmBB2CKOWyCSaQMMQGqBhBwCOOCOX4BTiBeKXFHIBUPe5B-BXUMBRILSIAJCHWKNIEHCCIFDFENcKDOOCcEHODIGREJKIEEBASHEQgBGuBLSECDADIICBIHABFRIDSJECDFAAIDAHGCNZADEJDHGCHJDFMENHABGBFLBAGBFDATODIFUIEFBHGKCDEJBJQPMnBEKGNHxCJHDFJbB5CnBxBOKCFCAGHHnBGJBWAhBDPCBBMAhBFhCZbKjBStBqBTIBGRKRQdMAOHBFEDOHCDKGBIKLBAKGCHEHQJGAQDBJKPEFMAIDBHKDFBOFDAEHCBMQEHEFDDIQGhBFCGJBHGEIHBNKOGFEFBBcCEECKJmBInBDLWGGHBNaHEDDDEQGYiBEiBQ0BFsBLOIGFBKgBJQFALSDBBJBCGqBYcGUQcHFEIoBiBEcQiBgBUQkBKKmBKWKmBaekBGQLOEcScESecgCcWiBSoBUGEBBFKLSJyBASIEJmBBoBWSIQAOMmBO2BEOIiBEmBAWJwBSSHMCBGKBSHkBGOIYGEHCEMBEPEBWMEAEHZXENQJEPPVZTAFKLQBAHKGMNBBsBPSBWEsCTGJGTIH2CTsBZaEQQGQHYGQUQsBOUBkBLAJIFiBHeAORaCiBF8CXkBQKAIIUENFSCEGQFQEKHJGFHOHIEDEEB"}};var Xh="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",qh={};for(let i=0;i<Xh.length;i++)qh[Xh[i]]=i;function Qh(i,t){let e=[],n=0,s=0,r=0,a=()=>{let o=0,l=0,c;do c=qh[i[n++]],o|=(c&31)<<l,l+=5;while(c&32);return o&1?-(o+1>>1):o>>1};for(;n<i.length;)s+=a(),r+=a(),e.push([s*t,r*t]);return e}function m0(i=Wh){let t={};for(let e of Object.keys(i.pieces))t[e]=Qh(i.pieces[e],i.q);return{polys:i.polys.map(e=>e.map(n=>Qh(n,i.q))),pieces:t,meta:{source:i.source,version:i.version,url:i.url,license:i.license,processing:i.processing}}}var Yh=null,Tl=()=>Yh||(Yh=m0());var je={sea:"#16335f",seaLite:"#1d4379",land:"#8fbf7a",landEdge:"#5d8f52",grat:"rgba(255,255,255,.22)",ice:"#e8eef5"};function Ks(i,t,e,n={}){let s=n.pad||0,r,a,o,l;if(n.box){let[C,m,d,B]=n.box,w=Ue(i,C,m,n.o),M=Ue(i,d,B,n.o);r=w[0],a=M[0],o=w[1],l=M[1]}else{let C=gi(i);r=-C.w/2,a=C.w/2,o=-C.h/2,l=C.h/2}let c=Math.min((t-2*s)/(a-r),(e-2*s)/(l-o)),h=t/2-c*(r+a)/2,p=e/2+c*(o+l)/2;return{toXY:(C,m,d)=>{let B=Ue(i,C,m,d||n.o);return B?[h+c*B[0],p-c*B[1]]:null},scale:c,cx:h,cy:p,toLonLatY:C=>(p-C)/c,toMapX:C=>(C-h)/c,w:t,h:e}}function Ws(i,t,e,n){let s=!0;for(let[r,a]of t){let o=e(r,a,n);o&&(s?(i.moveTo(o[0],o[1]),s=!1):i.lineTo(o[0],o[1]))}i.closePath()}function g0(i,t,e,n,s){let r=!0;for(let[a,o]of t){let l=Ue(e,a,o,s);if(!l){let p=(a-(s.lon0||0))*Math.PI/180,u=o*Math.PI/180,f=(s.lat0||0)*Math.PI/180,_=Math.cos(u)*Math.sin(p),C=Math.cos(f)*Math.sin(u)-Math.sin(f)*Math.cos(u)*Math.cos(p),m=Math.hypot(_,C)||1;l=[_/m,C/m]}let c=n.cx+n.scale*l[0],h=n.cy-n.scale*l[1];r?(i.moveTo(c,h),r=!1):i.lineTo(c,h)}i.closePath()}var _0=(i,t)=>i.every(([e,n])=>!Ue("ortho",e,n,t));function Xs(i,t,e,n={}){i.beginPath();for(let s of t.polys)for(let r of s)Ws(i,r,e);i.fillStyle=n.fill||je.land,i.fill("evenodd"),n.stroke&&(i.lineWidth=n.lineWidth||1,i.strokeStyle=n.stroke,i.lineJoin="round",i.stroke())}function E0(i,t,e,n={},s=12){for(let r=0;r<s;r++){let a=360/s,o=-180+r*a,l=o+a;i.save(),i.beginPath();for(let c=-90;c<=90;c+=3){let h=e.toXY(o,c,{gore:r,n:s});c===-90?i.moveTo(h[0],h[1]):i.lineTo(h[0],h[1])}for(let c=90;c>=-90;c-=3){let h=e.toXY(l,c,{gore:r,n:s});i.lineTo(h[0],h[1])}i.closePath(),i.fillStyle=n.sea||je.sea,i.fill(),i.clip(),i.beginPath();for(let c of t.polys){let h=c[0].map(p=>p[0]);if(!(Math.max(...h)<o-1||Math.min(...h)>l+1))for(let p of c)Ws(i,p,e.toXY,{gore:r,n:s})}i.fillStyle=n.fill||je.land,i.fill("evenodd"),i.restore()}}function Js(i,t,e,n=30,s={}){i.beginPath();let r=l=>{let c=!0;for(let h of l){if(!h){c=!0;continue}c?(i.moveTo(h[0],h[1]),c=!1):i.lineTo(h[0],h[1])}},a=s.latMax!=null?s.latMax:90,o=s.latMin!=null?s.latMin:-90;for(let l=-180;l<=180;l+=n){let c=[];for(let h=o;h<=a+1e-9;h+=2)c.push(e(l,Math.min(h,a)));r(c)}for(let l=-90+n;l<90;l+=n){if(l<o||l>a)continue;let c=[];for(let h=-180;h<=180;h+=3)c.push(e(h,l));r(c)}i.lineWidth=s.lineWidth||1,i.strokeStyle=s.stroke||je.grat,i.stroke()}function Fl(i,t,e){if(i.beginPath(),t==="mollweide"){let n=gi(t);i.ellipse(e.cx,e.cy,e.scale*n.w/2,e.scale*n.h/2,0,0,Math.PI*2)}else if(t==="ortho")i.arc(e.cx,e.cy,e.scale,0,Math.PI*2);else{let n=gi(t);i.rect(e.cx-e.scale*n.w/2,e.cy-e.scale*n.h/2,e.scale*n.w,e.scale*n.h)}}function Zh(i,t,e,n=Math.min(window.devicePixelRatio||1,2)){let s=i.clientWidth||150,r=i.clientHeight||100;i.width=Math.round(s*n),i.height=Math.round(r*n);let a=i.getContext("2d");a.setTransform(n,0,0,n,0,0),a.clearRect(0,0,s,r);let o=4;if(t==="globe"){let h={lon0:60,lat0:22},p=Ks("ortho",s,r,{pad:o,o:h});Fl(a,"ortho",p);let u=a.createRadialGradient(p.cx-p.scale*.35,p.cy-p.scale*.4,p.scale*.1,p.cx,p.cy,p.scale);u.addColorStop(0,"#2a5fa8"),u.addColorStop(1,"#0f2547"),a.fillStyle=u,a.fill(),a.save(),Fl(a,"ortho",p),a.clip(),a.beginPath();for(let f of e.polys)if(!_0(f[0],h))for(let _ of f)g0(a,_,"ortho",p,h);a.fillStyle=je.land,a.fill("evenodd"),Js(a,"ortho",(f,_)=>p.toXY(f,_,h),30,{stroke:"rgba(255,255,255,.18)"}),a.restore();return}if(t==="polar"){let h=Math.min(s,r)/2-o,p=s/2,u=r/2,f=h/(Math.PI/2),_=(C,m)=>{let d=Ue("polar_n",C,Math.max(m,-8));return[p+f*d[0],u-f*d[1]]};a.save(),a.beginPath(),a.arc(p,u,h,0,Math.PI*2),a.fillStyle=je.sea,a.fill(),a.clip(),a.beginPath();for(let C of e.polys)if(!(Math.max(...C[0].map(m=>m[1]))<0))for(let m of C)Ws(a,m,_);a.fillStyle=je.land,a.fill("evenodd"),Js(a,"polar_n",_,30,{latMin:0,stroke:"rgba(255,255,255,.2)"}),a.restore();return}if(t==="gores"){let h=Ks("gores",s,r,{pad:o});E0(a,e,h);return}let l={mercator:"mercator",equal:"mollweide",plate:"equirect",peters:"gallpeters"}[t],c=Ks(l,s,r,{pad:o});a.save(),Fl(a,l,c),a.fillStyle=je.sea,a.fill(),a.clip(),Xs(a,e,c.toXY),Js(a,l,c.toXY,30,{stroke:"rgba(255,255,255,.18)",latMax:l==="mercator"?85:90,latMin:l==="mercator"?-85:-90}),a.restore()}var He=12,ii=class{constructor(t){this.n=t,this.lon=new Float32Array(t),this.lat=new Float32Array(t),this.gore=new Int8Array(t),this.cache={},this.count=0}push(t,e,n){let s=this.count++;return this.lon[s]=t,this.lat[s]=e,this.gore[s]=n!=null?n:nn(t,He).g,s}plane(t){let e=this.cache[t];if(!e){e=this.cache[t]=new Float32Array(this.count*2);let n={gore:0,n:He};for(let s=0;s<this.count;s++){n.gore=this.gore[s];let r=Ue(t,this.lon[s],this.lat[s],n);e[2*s]=r[0],e[2*s+1]=r[1]}}return e}reset(){this.count=0,this.cache={}}write(t,e,n,s,r,a,o=0){let l=this.plane(s),c=s===r||a<=0?l:this.plane(r),h=1-n,p=h<1e-4,u=p?0:1/h;for(let f=0;f<this.count;f++){let _=this.lon[f]*me,C=this.lat[f]*me,m,d,B,w,M,v;if(p)m=_,d=C,B=h,w=0,M=0,v=1;else{let S=_*h,F=C*h,E=Math.cos(F);w=E*Math.sin(S),M=Math.sin(F),v=E*Math.cos(S),m=u*w,d=u*M,B=u*(v-1)+h}if(n>0){let S=l[2*f]+(c[2*f]-l[2*f])*a,F=l[2*f+1]+(c[2*f+1]-l[2*f+1])*a;m+=n*(S-_),d+=n*(F-C)}t[3*f]=m+o*w,t[3*f+1]=d+o*M,t[3*f+2]=B+o*v,e&&(e[3*f]=w,e[3*f+1]=M,e[3*f+2]=v)}}};function wl(i,t,e){let n=new we;n.setAttribute("position",new ye(new Float32Array(i.n*3),3)),n.boundingSphere=new un(new N,20);let s=new ki(n,new ui({color:t,transparent:e<1,opacity:e,depthWrite:!1}));return s.frustumCulled=!1,s}function jh({land:i,texWidth:t=4096,circleRadius:e=4.5}={}){let n=new cn,s={t:0,proj:"equirect",from:"equirect",u:1,lin:1,sel:{lon:0,lat:60},dirty:!0},r=t,a=t/2,o=document.createElement("canvas");o.width=r,o.height=a;let l=o.getContext("2d"),c=(Y,tt)=>[(Y+180)/360*r,(90-tt)/180*a],h=[{key:"land",on:!0,draw(Y){let tt=Y.createLinearGradient(0,0,0,a);tt.addColorStop(0,"#1a3d70"),tt.addColorStop(.5,"#1f4c8a"),tt.addColorStop(1,"#1a3d70"),Y.fillStyle=tt,Y.fillRect(0,0,r,a),Xs(Y,i,c,{fill:je.land,stroke:je.landEdge,lineWidth:Math.max(1,r/2048)})}}],p=new zi(o);p.colorSpace=Ie,p.anisotropy=4;let u=()=>{l.clearRect(0,0,r,a);for(let Y of h)Y.on&&Y.draw(l,r,a,c);p.needsUpdate=!0};u();let f=12,_=72,C=360/He,m=new ii(He*(f+1)*(_+1)),d=new Float32Array(m.n*2),B=[];for(let Y=0;Y<He;Y++){let tt=m.count;for(let at=0;at<=_;at++)for(let Ft=0;Ft<=f;Ft++){let ot=-180+Y*C+Ft/f*C,It=-90+at/_*180,Nt=m.push(ot,It,Y);d[2*Nt]=(ot+180)/360,d[2*Nt+1]=(It+90)/180}for(let at=0;at<_;at++)for(let Ft=0;Ft<f;Ft++){let ot=tt+at*(f+1)+Ft,It=ot+1,Nt=ot+f+1,wt=Nt+1;B.push(ot,It,Nt,It,wt,Nt)}}let w=new we;w.setAttribute("position",new ye(new Float32Array(m.n*3),3)),w.setAttribute("normal",new ye(new Float32Array(m.n*3),3)),w.setAttribute("uv",new ye(d,2)),w.setIndex(B),w.boundingSphere=new un(new N,20);let M=new Ne(w,new Ms({map:p,side:Ze}));M.frustumCulled=!1,n.add(M);let v=new ii(He*2*2*_+5*He*2*f+64);for(let Y=0;Y<He;Y++){for(let tt of[-180+Y*C,-180+(Y+1)*C])for(let at=0;at<_;at++)v.push(tt,-90+at*2.5,Y),v.push(tt,-90+(at+1)*2.5,Y);for(let tt of[-60,-30,30,60])for(let at=0;at<f;at++)v.push(-180+Y*C+at*C/f,tt,Y),v.push(-180+Y*C+(at+1)*C/f,tt,Y)}let S=wl(v,16777215,.3);n.add(S);let F=new ii(He*2*f);for(let Y=0;Y<He;Y++)for(let tt=0;tt<f;tt++)F.push(-180+Y*C+tt*C/f,0,Y),F.push(-180+Y*C+(tt+1)*C/f,0,Y);let E=wl(F,16751979,.9);n.add(E);let D=40,P=[];for(let Y=0;Y<He;Y++){let tt=-180+(Y+.5)*C;for(let at of[-60,-30,0,30,60])P.push([tt,at,Y]);Y%2===0&&(P.push([tt,75,Y]),P.push([tt,-75,Y]))}function G(Y,tt){let at=new ii(Y.length*(D+1)),Ft=[],ot=[];for(let[It,Nt,wt]of Y){let Xt=at.push(It,Nt,wt),ne=zs(It,Nt,tt,D).map(([oe,re])=>at.push(oe,re,wt));for(let oe=0;oe<D;oe++)Ft.push(Xt,ne[oe],ne[(oe+1)%D]),ot.push(ne[oe],ne[(oe+1)%D])}return{set:at,idx:Ft,rim:ot}}function O(Y,tt,at,Ft){let ot=new we;ot.setAttribute("position",new ye(new Float32Array(Y.set.n*3),3)),ot.setIndex(Y.idx),ot.boundingSphere=new un(new N,20);let It=new Ne(ot,new hi({color:tt,transparent:!0,opacity:at,side:Ze,depthWrite:!1}));It.frustumCulled=!1;let Nt=new we;Nt.setAttribute("position",ot.getAttribute("position")),Nt.setIndex(Y.rim),Nt.boundingSphere=ot.boundingSphere;let wt=new ki(Nt,new ui({color:Ft,transparent:!0,opacity:.95,depthWrite:!1}));wt.frustumCulled=!1;let Xt=new cn;return Xt.add(It),Xt.add(wt),{grp:Xt,geo:ot}}let A=G(P,e),y=O(A,16747069,.5,16765608);n.add(y.grp);let I=new ii(He*2*f),H=wl(I,16765806,1),V=G([[0,60,6]],e),j=O(V,7332095,.6,16777215),K=new cn;K.add(H),K.add(j.grp),n.add(K);function Q(){let{lon:Y,lat:tt}=s.sel;I.reset();for(let Ft=0;Ft<He;Ft++)for(let ot=0;ot<f;ot++)I.push(-180+Ft*C+ot*C/f,tt,Ft),I.push(-180+Ft*C+(ot+1)*C/f,tt,Ft);let at=nn(Y,He).g;V.set.reset(),V.set.push(Y,tt,at);for(let[Ft,ot]of zs(Y,tt,e,D))V.set.push(Ft,ot,at)}Q();let it=[];function vt(Y,tt,at=16731469,Ft=1.1){let ot=G([[Y,tt,nn(Y,He).g]],Ft),It=O(ot,at,.95,16777215);return it.push({f:ot,o:It}),n.add(It.grp),s.dirty=!0,It.grp}let xt=new ii(1),Kt=new Float32Array(3),Ot=new Float32Array(3);function Vt(Y,tt,at,Ft=0,ot){return xt.reset(),xt.push(Y,tt,ot),xt.write(Kt,Ot,s.t,s.from,s.proj,s.u,Ft),at.set(Kt[0],Kt[1],Kt[2])}function X(Y,tt,at){return xt.reset(),xt.push(Y,tt),xt.write(Kt,Ot,s.t,s.from,s.proj,s.u,0),at.set(Ot[0],Ot[1],Ot[2])}function $(){if(!s.dirty)return!1;s.dirty=!1;let{t:Y,from:tt,proj:at,u:Ft}=s,ot=(It,Nt,wt,Xt)=>{let ne=Nt.getAttribute("position");It.write(ne.array,Xt?Nt.getAttribute("normal").array:null,Y,tt,at,Ft,wt),ne.needsUpdate=!0,Xt&&(Nt.getAttribute("normal").needsUpdate=!0)};ot(m,w,0,!0),S.visible&&ot(v,S.geometry,.004),ot(F,E.geometry,.005),y.grp.visible&&ot(A.set,y.geo,.008),K.visible&&(ot(I,H.geometry,.006),H.geometry.setDrawRange(0,I.count),ot(V.set,j.geo,.012));for(let It of it)ot(It.f.set,It.o.geo,.014);return!0}return{group:n,mesh:M,texture:p,state:s,layers:h,setFlat(Y){Y=Math.min(1,Math.max(0,Y)),Y!==s.t&&(s.t=Y,s.dirty=!0)},setProjection(Y,tt){Y!==s.proj&&(tt||s.t<=0?(s.from=Y,s.proj=Y,s.u=1,s.lin=1):(s.from=s.proj,s.proj=Y,s.u=0,s.lin=0),s.dirty=!0)},tick(Y,tt=1.2){return s.lin>=1?!1:(s.lin=Math.min(1,s.lin+Y/tt),s.u=s.lin*s.lin*(3-2*s.lin),s.lin>=1&&(s.u=1,s.from=s.proj),s.dirty=!0,!0)},update:$,show(Y,tt){let at={graticule:S,circles:y.grp,select:K,equator:E}[Y];if(Y==="marks")for(let Ft of it)Ft.o.grp.visible=tt;else at&&(at.visible=tt);s.dirty=!0},setSelection(Y,tt){s.sel={lon:Y,lat:tt},Q(),s.dirty=!0},addMark:vt,pointAt:Vt,normalAt:X,uvToLonLat:Y=>[Y.x*360-180,Y.y*180-90],addLayer(Y){h.push(Y),u()},setLayer(Y,tt){let at=h.find(Ft=>Ft.key===Y);at&&(at.on=tt,u())},redraw:u}}var x0=[-180,-62,180,84.6],C0=[{key:"greenland",en:"Greenland",zh:"\u683C\u9675\u862D",color:"#ff9d3d"},{key:"africa",en:"Africa",zh:"\u975E\u6D32",color:"#3dd6c6"},{key:"australia",en:"Australia",zh:"\u6FB3\u6D32",color:"#c7a2ff"}],M0=84,B0=(i,t,e)=>{let n=!1;for(let s=0,r=e.length-1;s<e.length;r=s++){let[a,o]=e[s],[l,c]=e[r];o>t!=c>t&&i<(l-a)*(t-o)/(c-o)+a&&(n=!n)}return n};function $h(i,t){let e=A=>i.querySelector(A),n=e(".gg-dg-cv"),s=n.getContext("2d"),r=C0.map(A=>{let y=t.pieces[A.key],I=Jh(y),H=y.map(V=>V[1]);return{...A,ring:y,home:I,pos:I.slice(),cur:y,trueArea:zh(y),north:Math.max(...H)-I[1],south:I[1]-Math.min(...H)}}),a=Object.fromEntries(r.map(A=>[A.key,A])),o={active:"greenland",drag:null},l=A=>Kh(A.map(([y,I])=>Ue("mercator",y,I))),c=l(a.africa.ring),h=null,p=null,u=0,f=0,_=1;function C(A,y,I){let H=Math.max(A.home[1],M0-A.north-1),V=-(58-A.south);I=Math.min(H,Math.max(V,I));let j=A.home[0]===y&&A.home[1]===I?A.ring:kh(A.ring,A.home,[y,I]),K=j.map(Q=>Q[0]);return Math.max(...K)-Math.min(...K)>200?!1:(A.pos=[y,I],A.cur=j,!0)}function m(A){let y=a[A],I=l(y.cur);return{lat:y.pos[1],factor:I/y.trueArea,vsAfrica:I/c,trueVsAfrica:ja[A]/ja.africa}}function d(){let A=n.clientWidth,y=n.clientHeight;if(!A||!y)return;_=Math.min(window.devicePixelRatio||1,2),u=A,f=y,n.width=Math.round(A*_),n.height=Math.round(y*_),h=Ks("mercator",u,f,{box:x0}),p=document.createElement("canvas"),p.width=n.width,p.height=n.height;let I=p.getContext("2d");I.setTransform(_,0,0,_,0,0),I.fillStyle=je.sea,I.fillRect(0,0,u,f),Xs(I,t,h.toXY,{fill:"#6f8f6a"}),Js(I,"mercator",h.toXY,30,{latMax:84.6,latMin:-62,stroke:"rgba(255,255,255,.14)"});let[H,V]=h.toXY(-180,0),[j]=h.toXY(180,0);I.setLineDash([6,5]),I.strokeStyle="rgba(255,157,107,.95)",I.lineWidth=1.5,I.beginPath(),I.moveTo(H,V),I.lineTo(j,V),I.stroke(),I.setLineDash([]),I.font="700 11px system-ui, sans-serif",I.fillStyle="rgba(255,190,150,.95)",I.fillText("Equator \u8D64\u9053",8,V-6),B()}function B(){if(!h)return;s.setTransform(1,0,0,1,0,0),s.drawImage(p,0,0),s.setTransform(_,0,0,_,0,0);let A=r.slice().sort((y,I)=>(y.key===o.active)-(I.key===o.active));for(let y of A){let I=y.key===o.active;s.beginPath(),Ws(s,y.cur,h.toXY),s.globalAlpha=I?.86:.6,s.fillStyle=y.color,s.fill(),s.globalAlpha=1,s.lineWidth=I?2:1,s.strokeStyle=I?"#fff":"rgba(255,255,255,.55)",s.lineJoin="round",s.stroke();let[H,V]=h.toXY(y.pos[0],y.pos[1]);s.font=`${I?800:700} ${u<480?10:12}px system-ui, sans-serif`,s.textAlign="center",s.lineWidth=3,s.strokeStyle="rgba(5,12,28,.75)",s.strokeText(y.en,H,V+4),s.fillStyle="#fff",s.fillText(y.en,H,V+4),s.textAlign="start"}M()}let w=A=>A>=10||A>=.1?Math.round(A*100)+"%":(A*100).toFixed(1)+"%";function M(){let A=a[o.active],y=m(A.key);e(".gg-dg-name").innerHTML=`${A.en} <span class="zh">${A.zh}</span>`,e(".gg-dg-real").innerHTML=`${(ja[A.key]/1e6).toFixed(2)} <small>million km\xB2 \xB7 \u767E\u842C\u5E73\u65B9\u516C\u91CC</small>`;let I=y.lat;e(".gg-dg-lat").textContent=Math.abs(I)<.5?"0\xB0 (equator \xB7 \u8D64\u9053)":`${Math.abs(I).toFixed(0)}\xB0 ${I>0?"N \xB7 \u5317\u7DEF":"S \xB7 \u5357\u7DEF"}`,e(".gg-dg-factor").textContent="\xD7 "+(y.factor>=10?y.factor.toFixed(1):y.factor.toFixed(2)),e(".gg-dg-vs").textContent=w(y.vsAfrica),e(".gg-dg-true").textContent=w(y.trueVsAfrica),i.querySelectorAll("[data-piece]").forEach(j=>j.setAttribute("aria-pressed",String(j.dataset.piece===o.active)));let H=e(".gg-dg-msg"),V=Math.abs(I)<6?"eq":Math.abs(I-A.home[1])<1.5&&Math.abs(A.pos[0]-A.home[0])<3?"home":"move";H.querySelectorAll("[data-when]").forEach(j=>{j.hidden=j.dataset.when!==V})}let v=A=>{let y=n.getBoundingClientRect();return[(A.clientX-y.left)*(u/y.width),(A.clientY-y.top)*(f/y.height)]},S=(A,y)=>Vh(h.toMapX(A),h.toLonLatY(y));function F(A,y){return r.slice().sort((H,V)=>(V.key===o.active)-(H.key===o.active)).find(H=>B0(A,y,H.cur.map(([V,j])=>h.toXY(V,j))))}n.addEventListener("touchstart",A=>{let y=A.touches[0],I=n.getBoundingClientRect();F((y.clientX-I.left)*(u/I.width),(y.clientY-I.top)*(f/I.height))&&A.preventDefault()},{passive:!1}),n.addEventListener("touchmove",A=>{o.drag&&A.preventDefault()},{passive:!1}),n.addEventListener("pointerdown",A=>{let[y,I]=v(A),H=F(y,I);if(!H)return;o.active=H.key;let[V,j]=h.toXY(H.pos[0],H.pos[1]);o.drag={key:H.key,dx:V-y,dy:j-I};try{n.setPointerCapture(A.pointerId)}catch{}n.classList.add("is-drag"),B()}),n.addEventListener("pointermove",A=>{let[y,I]=v(A);if(!o.drag){n.style.cursor=F(y,I)?"grab":"";return}let[H,V]=S(y+o.drag.dx,I+o.drag.dy);C(a[o.drag.key],Math.max(-175,Math.min(175,H)),V)&&B()});let E=()=>{o.drag=null,n.classList.remove("is-drag")};n.addEventListener("pointerup",E),n.addEventListener("pointercancel",E);let D=0;function P(A,y){cancelAnimationFrame(D);let I=A.pos.slice(),H=performance.now(),V=j=>{let K=Math.min(1,(j-H)/900),Q=K*K*(3-2*K);C(A,I[0]+(y[0]-I[0])*Q,I[1]+(y[1]-I[1])*Q),B(),K<1&&(D=requestAnimationFrame(V))};D=requestAnimationFrame(V)}let G={greenland:[-25,0],africa:[20,0],australia:[80,0]},O={state:o,pieces:a,info:m,moveTo(A,y,I){let H=C(a[A],y,I);return o.active=A,B(),H},toEquator(A){let y=a[o.active];A?O.moveTo(y.key,...G[y.key]):P(y,G[y.key])},home(A){let y=a[o.active];A?O.moveTo(y.key,...y.home):P(y,y.home)},draw:B,resize:d};return i.querySelectorAll("[data-piece]").forEach(A=>A.addEventListener("click",()=>{o.active=A.dataset.piece,B()})),i.querySelector('[data-go="equator"]').addEventListener("click",()=>O.toEquator()),i.querySelector('[data-go="home"]').addEventListener("click",()=>O.home()),new ResizeObserver(d).observe(n),d(),i.__drag=O,O}function tu(i){let t={i:0,tries:0,first:0,done:!1,solved:!1,log:[]};return{state:t,total:i.length,question:()=>i[t.i],answer(e){if(t.done||t.solved)return null;let n=i[t.i];t.tries++;let s=e===n.answer;if(s){t.solved=!0;let r=t.tries===1;return r&&t.first++,t.log.push({q:t.i,tries:t.tries,first:r}),{correct:s,first:r}}return{correct:s,first:!1}},next(){return t.solved?(t.solved=!1,t.tries=0,t.i>=i.length-1?(t.done=!0,!1):(t.i++,!0)):!1},reset(){t.i=0,t.tries=0,t.first=0,t.done=!1,t.solved=!1,t.log=[]}}}function eu(i,t){let e=d=>i.querySelector(d),n=JSON.parse(e('script[type="application/json"]').textContent),s=tu(n.questions),r=[...i.querySelectorAll("[data-pick]")],a=e(".gg-ft-q-en"),o=e(".gg-ft-q-zh"),l=e(".gg-ft-k"),c=e(".gg-ft-score"),h=e(".gg-ft-msg"),p=e(".gg-ft-next"),u=e(".gg-ft-steps");u.innerHTML=n.questions.map(()=>"<i></i>").join("");let f=()=>i.querySelectorAll("canvas[data-thumb]").forEach(d=>Zh(d,d.dataset.thumb,t));new ResizeObserver(f).observe(i);function _(){let d=s.state,B=s.question();l.textContent=`Question ${d.i+1} of ${s.total} \xB7 \u7B2C ${d.i+1} \u984C\uFF08\u5171 ${s.total} \u984C\uFF09`,c.textContent=`${d.first} / ${d.log.length}`,a.textContent=B.en,o.textContent=B.zh,r.forEach(w=>{w.disabled=!1,w.classList.remove("is-right","is-wrong")}),h.innerHTML="",h.className="gg-ft-msg",p.hidden=!0,[...u.children].forEach((w,M)=>{w.className=M<d.log.length?d.log[M].first?"is-first":"is-later":M===d.i?"is-now":""})}function C(d){let B=s.question(),w=s.answer(d);if(!w)return null;let M=r.find(v=>v.dataset.pick===d);if(w.correct){M.classList.add("is-right"),r.forEach(S=>{S.disabled=!0}),h.className="gg-ft-msg is-right",h.innerHTML=`<b>${w.first?"Right on the first try. \xB7 \u7B2C\u4E00\u6B21\u5C31\u7B54\u5C0D\u3002":"That is the one. \xB7 \u5C31\u662F\u9019\u4E00\u7A2E\u3002"}</b> ${B.why_en}<span class="zh">${B.why_zh}</span>`;let v=s.state.i>=s.total-1;p.textContent=v?"See your result \xB7 \u770B\u7D50\u679C":"Next question \xB7 \u4E0B\u4E00\u984C",p.hidden=!1,c.textContent=`${s.state.first} / ${s.state.log.length}`,[...u.children][s.state.i].className=w.first?"is-first":"is-later"}else M.classList.add("is-wrong"),M.disabled=!0,h.className="gg-ft-msg is-wrong",h.innerHTML=`<b>Not the best fit. Try another. \xB7 \u4E0D\u592A\u9069\u5408\uFF0C\u518D\u9078\u9078\u770B\u3002</b> ${B.hint_en}<span class="zh">${B.hint_zh}</span>`;return w}function m(){if(s.next()){_();return}if(!s.state.done)return;let d=s.state.first;a.textContent=`You chose the fitting map on the first try for ${d} of ${s.total} questions.`,o.textContent=`${s.total} \u984C\u88E1\uFF0C\u4F60\u6709 ${d} \u984C\u7B2C\u4E00\u6B21\u5C31\u9078\u5230\u9069\u5408\u7684\u5730\u5716\u3002`,l.textContent="Finished \xB7 \u5B8C\u6210",r.forEach(B=>{B.disabled=!0,B.classList.remove("is-right","is-wrong")}),h.className="gg-ft-msg",h.innerHTML=`${n.end_en}<span class="zh">${n.end_zh}</span>`,p.textContent="Play again \xB7 \u518D\u73A9\u4E00\u6B21",p.hidden=!1}return r.forEach(d=>d.addEventListener("click",()=>C(d.dataset.pick))),p.addEventListener("click",()=>{s.state.done?(s.reset(),_()):m()}),_(),f(),i.__fit={game:s,pick:C,next:m,reset(){s.reset(),_()}},i.__fit}var nu=32,$a=[18,22],y0=5,v0=[{key:"greenland",lon:-41,lat:74,html:"Greenland <i>\u683C\u9675\u862D</i>"},{key:"africa",lon:20,lat:6,html:"Africa <i>\u975E\u6D32</i>"},{key:"australia",lon:134,lat:-25,html:"Australia <i>\u6FB3\u6D32</i>"},{key:"antarctica",lon:45,lat:-78,html:"Antarctica <i>\u5357\u6975\u6D32</i>"},{key:"taiwan",lon:121,lat:23.7,html:"Taiwan <i>\u53F0\u7063</i>",dy:-15,cls:"gg-lab-tw"},{key:"equator",lon:-28,lat:0,html:"Equator <i>\u8D64\u9053</i>",dy:-11,cls:"gg-lab-eq"}],Rl=i=>i>=100?i.toFixed(0):i>=10?i.toFixed(1):i.toFixed(2),iu=i=>i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2;function A0(i){let t=A=>i.querySelector(A),e=t(".al-space-cv"),n=t(".al-space"),s=Tl(),r={t:0,proj:"equirect",sel:{lon:0,lat:60},peel:null,labels:!0},a=t(".gg-flat"),o=t(".gg-lat"),l=t(".gg-peel"),c=t(".gg-k"),h=t(".gg-h"),p=t(".gg-a"),u=t(".gg-latv"),f=t(".gg-shape-note"),_=t(".gg-ell-shape"),C=t(".gg-ell-ref");function m(){let{lon:A,lat:y}=r.sel,I=Il(r.proj,A,y,{gore:nn(A).g});c.textContent="\xD7 "+Rl(I.k),h.textContent="\xD7 "+Rl(I.h),p.textContent="\xD7 "+Rl(I.area);let H=y>=0?"N":"S",V=A>=0?"E":"W",j=Math.abs(y).toFixed(0),K=Math.abs(A).toFixed(0);u.innerHTML=`${j}\xB0${j==="0"?"":" "+H}<small>${K}\xB0${K==="0"||K==="180"?"":" "+V}</small>`;let Q=Ue(r.proj,A,y,{gore:nn(A).g}),it=.5*me,vt=zs(A,y,.5,48).map(([X,$])=>{let Et=Ue(r.proj,X,$,{gore:nn(A).g});return[(Et[0]-Q[0])/it,(Et[1]-Q[1])/it]}),xt=Math.max(1,...vt.map(X=>Math.max(Math.abs(X[0]),Math.abs(X[1])))),Kt=Math.min(20,46/xt);_.setAttribute("points",vt.map(([X,$])=>`${(60+X*Kt).toFixed(1)},${(52-$*Kt).toFixed(1)}`).join(" ")),C.setAttribute("r",Kt.toFixed(1));let Ot=Math.abs(I.a/I.b-1)<.02,Vt=Math.abs(I.area-1)<.02;f.dataset.kind=Ot&&Vt?"true":Ot?"shape":Vt?"area":"none",i.querySelectorAll(".gg-shape-note span[data-kind]").forEach(X=>{X.hidden=X.dataset.kind!==f.dataset.kind})}function d(){i.querySelectorAll("[data-proj]").forEach(y=>{y.tagName==="BUTTON"&&y.setAttribute("aria-pressed",String(y.dataset.proj===r.proj))}),i.querySelectorAll(".gg-pinfo").forEach(y=>{y.hidden=y.dataset.pinfo!==r.proj}),a.value=Math.round(r.t*1e3),o.value=Math.round(r.sel.lat);let A=r.t>.5;l.setAttribute("aria-pressed",String(!!r.peel)),l.querySelector(".al-play-t").textContent=r.peel?"Pause \xB7 \u66AB\u505C":A?"Wrap it back \xB7 \u6372\u56DE\u5730\u7403":"Peel it flat \xB7 \u6524\u5E73",i.classList.toggle("gg-is-flat",r.t>=.999),m()}let B=null;try{B=w()}catch{B=null}B||i.classList.add("al-nogl");function w(){let A;try{A=new Xa({canvas:e,antialias:!0})}catch{return null}A.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),A.setClearColor(330004,1);let y=new ms,I=new Te(nu,1,.1,100);y.add(I),y.add(new Ss(16777215,1.15));let H=new As(16777215,2.3);H.position.set(-.6,.8,1.6),I.add(H);let V=Math.min(window.innerWidth,window.innerHeight)<700,j=A.capabilities.maxTextureSize||2048,K=jh({land:s,texWidth:V||j<4096?2048:4096});y.add(K.group),K.addMark(121,23.7),K.setSelection(r.sel.lon,r.sel.lat);let Q=new Za(I,e);Q.enablePan=!1,Q.enableDamping=!0,Q.dampingFactor=.12,Q.rotateSpeed=.6,Q.zoomSpeed=.7;let it=Nh(t(".al-labels"),e,I),vt=v0.map(T=>({...T,el:it.add(`gg-lab ${T.cls||""}`,T.html)})),xt=new N(...ns($a[0],$a[1])),Kt=new N(0,0,1),Ot=Math.tan(nu*me/2),Vt=1,X=1,$=(T,Zt)=>Math.max(Zt/2/Ot,T/2/(Ot*Vt))*1.12;function Et(){let T=K.state,Zt=gi(T.from),Jt=gi(T.proj);return{w:Zt.w+(Jt.w-Zt.w)*T.u,h:Zt.h+(Jt.h-Zt.h)*T.u}}function Y(){let T=Et();return ei.lerp($(2.15,2.15),$(T.w,T.h),iu(r.t))}let tt=new N;function at(){let T=ei.smoothstep(r.t,0,.4);tt.copy(xt).lerp(Kt,T).normalize(),I.position.copy(tt).multiplyScalar(Y()*X),I.up.set(0,1,0),Q.target.set(0,0,0),I.lookAt(0,0,0)}function Ft(){let T=r.t<=.001,Zt=r.t>=.999;Q.enableRotate=T,Q.enablePan=Zt,Q.screenSpacePanning=!0;let Jt=Y();Q.minDistance=Jt*.35,Q.maxDistance=Jt*1.6,Q.enabled=T||Zt}function ot(){let T=n.clientWidth,Zt=n.clientHeight;!T||!Zt||(A.setSize(T,Zt,!1),Vt=T/Zt,I.aspect=Vt,I.updateProjectionMatrix(),at(),Ft())}Q.addEventListener("change",()=>{r.t<=.001?(xt.copy(I.position).normalize(),X=I.position.length()/Y()):r.t>=.999&&(X=ei.clamp(I.position.z/Y(),.35,1.6))});let It=new bs,Nt=new Gt,wt=null;e.addEventListener("pointerdown",T=>{wt={x:T.clientX,y:T.clientY}}),e.addEventListener("pointerup",T=>{if(!wt||Math.hypot(T.clientX-wt.x,T.clientY-wt.y)>6){wt=null;return}wt=null;let Zt=e.getBoundingClientRect();Nt.set((T.clientX-Zt.left)/Zt.width*2-1,-((T.clientY-Zt.top)/Zt.height)*2+1),It.setFromCamera(Nt,I);let Jt=It.intersectObject(K.mesh,!1)[0];if(!Jt||!Jt.uv)return;let[b,g]=K.uvToLonLat(Jt.uv);v.select(b,ei.clamp(g,-85,85))});let Xt=new N,ne=new N,oe=new N;function re(){for(let T of vt){if(!r.labels){T.el.style.opacity=0;continue}K.pointAt(T.lon,T.lat,Xt,.02),K.normalAt(T.lon,T.lat,ne),oe.copy(I.position).sub(Xt).normalize(),it.place(T.el,Xt,T.dy||0),ne.dot(oe)<.12&&(T.el.style.opacity=0)}}function pe(){K.update(),A.render(y,I),re()}return new ResizeObserver(()=>{ot(),pe()}).observe(n),ot(),{renderer:A,scene:y,camera:I,controls:Q,globe:K,render:pe,placeCamera:at,setControls:Ft,globeDir:xt,resetZoom(){X=1},FRONT:Kt}}function M(A){r.t=Math.min(1,Math.max(0,A)),B&&(B.globe.setFlat(iu(r.t)),B.placeCamera(),B.setControls())}let v={state:r,ready:()=>!0,setFlat(A){r.peel=null,M(A),d()},setProj(A,y){r.proj=A,B&&(B.globe.setProjection(A,y),B.resetZoom(),B.placeCamera(),B.setControls()),A==="mercator"&&Math.abs(r.sel.lat)>80&&v.select(r.sel.lon,80*Math.sign(r.sel.lat)),d()},select(A,y){r.sel={lon:A,lat:y},B&&B.globe.setSelection(A,y),d()},peel(A){let y=A!=null?A:r.t>.5?0:1;if(Math.abs(r.t-y)<.001){r.peel=null,d();return}r.peel={to:y},B&&B.resetZoom(),d(),O()},look(A,y){B&&(B.globeDir.set(...ns(A,y)),B.placeCamera())},goHome(A){B&&(B.resetZoom(),r.t<=.001&&B.globeDir.set(...ns($a[0],$a[1])),B.placeCamera(),B.controls.update())},demo(A){let y=(I,H)=>{let V=i.querySelector(`[data-t="${I}"]`);V&&V.checked!==H&&(V.checked=H,V.dispatchEvent(new Event("change")))};A==="peel"?(y("circles",!1),v.setProj("equirect",r.t<.01),v.setFlat(0),v.goHome(),v.peel(1)):A==="mercator"?(y("circles",!0),v.setProj("mercator",r.t<.01),v.select(-45,60),r.t<.999&&v.peel(1)):A==="equal"?(y("circles",!0),v.setProj("gallpeters",r.t<.01),v.select(-45,60),r.t<.999&&v.peel(1)):A==="gores"&&(y("circles",!1),v.setProj("gores",r.t<.01),r.t<.999&&v.peel(1)),O()},info(){let{lon:A,lat:y}=r.sel;return{...Il(r.proj,A,y,{gore:nn(A).g}),t:r.t,proj:r.proj}},run(A){for(let y=0,I=Math.ceil(A*60);y<I;y++)P(1/60)},render(){B&&B.render()}};a.addEventListener("input",()=>{v.setFlat(a.value/1e3),O()}),o.addEventListener("input",()=>{v.select(r.sel.lon,+o.value),O()}),l.addEventListener("click",()=>{r.peel?(r.peel=null,d()):v.peel()}),i.querySelectorAll("button[data-proj]").forEach(A=>A.addEventListener("click",()=>{v.setProj(A.dataset.proj),O()})),i.querySelectorAll("[data-t]").forEach(A=>A.addEventListener("change",()=>{A.dataset.t==="labels"?r.labels=A.checked:B&&B.globe.show(A.dataset.t,A.checked),O()})),B&&t(".al-home").addEventListener("click",()=>{v.goHome(),O()});let S=0,F=0,E=!0,D=0;function P(A){let y=!1;if(r.peel){let I=Math.sign(r.peel.to-r.t),H=r.t+I*A/y0;(I>0&&H>=r.peel.to||I<0&&H<=r.peel.to)&&(H=r.peel.to,r.peel=null),M(H),d(),y=!0}return B&&(B.globe.tick(A)&&(B.placeCamera(),B.setControls(),y=!0),B.controls.enabled&&B.controls.update()&&(y=!0)),y}function G(A){S=0;let y=F?Math.min(.05,(A-F)/1e3):.016;F=A;let I=P(y);B&&B.render(),D=I?0:D+1,E&&D<90&&(S=requestAnimationFrame(G))}function O(){D=0,!S&&E&&(F=0,S=requestAnimationFrame(G))}return B&&(B.controls.addEventListener("start",O),B.controls.addEventListener("change",O),e.addEventListener("pointerdown",O),e.addEventListener("wheel",O,{passive:!0})),new IntersectionObserver(A=>{E=A[0].isIntersecting,E&&O()}).observe(i),d(),O(),i.__lab=v,v}function su(){let i=Tl();document.querySelectorAll("[data-gg-drag]").forEach(t=>$h(t,i)),document.querySelectorAll("[data-gg-fit]").forEach(t=>eu(t,i))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",su):su();Oh("[data-geoflat-lab]",A0,{demo:(i,t)=>i.demo(t)});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
