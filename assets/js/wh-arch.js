(()=>{var Qn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Zn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Qc=0,cl=1,Zc=2;var Xs=1,jc=2,ji=3,jn=0,Pe=1,xn=2,Bn=0,$i=1,hl=2,ul=3,dl=4,$c=5;var pi=100,th=101,eh=102,nh=103,ih=104,sh=200,rh=201,ah=202,oh=203,fl=204,pl=205,lh=206,ch=207,hh=208,uh=209,dh=210,fh=211,ph=212,mh=213,gh=214,Lr=0,Pr=1,Nr=2,Ni=3,Or=4,Hr=5,Ur=6,kr=7,Ca=0,_h=1,Eh=2,cn=0,ml=1,gl=2,_l=3,El=4,Cl=5,xl=6,Bl=7;var Al=300,$n=301,mi=302,xa=303,Ba=304,Ys=306,Vr=1e3,_n=1001,zr=1002,ve=1003,Ch=1004;var qs=1005;var De=1006,Aa=1007;var ti=1008;var ke=1009,Ml=1010,yl=1011,ts=1012,Ma=1013,hn=1014,un=1015,dn=1016,ya=1017,va=1018,es=1020,vl=35902,Sl=35899,Dl=1021,bl=1022,en=1023,Cn=1026,ei=1027,Il=1028,Sa=1029,ni=1030,Da=1031;var ba=1033,Qs=33776,Zs=33777,js=33778,$s=33779,Ia=35840,Ta=35841,Fa=35842,wa=35843,Ra=36196,Ga=37492,La=37496,Pa=37488,Na=37489,tr=37490,Oa=37491,Ha=37808,Ua=37809,ka=37810,Va=37811,za=37812,Ka=37813,Ja=37814,Wa=37815,Xa=37816,Ya=37817,qa=37818,Qa=37819,Za=37820,ja=37821,$a=36492,to=36494,eo=36495,no=36283,io=36284,er=36285,so=36286;var Cs=2300,Kr=2301,Rr=2302,jo=2303,$o=2400,tl=2401,el=2402;var xh=3200;var ro=0,Bh=1,wn="",Je="srgb",xs="srgb-linear",Bs="linear",re="srgb";var Gr=7680;var Ah=519,Mh=512,yh=513,vh=514,ao=515,Sh=516,Dh=517,oo=518,bh=519,Ih=35044;var Tl="300 es",on=2e3,Oi=2001;function zu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ku(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function As(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Th(){let i=As("canvas");return i.style.display="block",i}var Ac={},Hi=null;function Fl(...i){let t="THREE."+i.shift();Hi?Hi("log",t,...i):console.log(t,...i)}function Fh(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Vt(...i){i=Fh(i);let t="THREE."+i.shift();if(Hi)Hi("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Kt(...i){i=Fh(i);let t="THREE."+i.shift();if(Hi)Hi("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function di(...i){let t=i.join(" ");t in Ac||(Ac[t]=!0,Vt(...i))}function wh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Rh={[Lr]:Pr,[Nr]:Ur,[Or]:kr,[Ni]:Hr,[Pr]:Lr,[Ur]:Nr,[kr]:Or,[Hr]:Ni},ln=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Ie=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Mc=1234567,ms=Math.PI/180,Ui=180/Math.PI;function gi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ie[i&255]+Ie[i>>8&255]+Ie[i>>16&255]+Ie[i>>24&255]+"-"+Ie[t&255]+Ie[t>>8&255]+"-"+Ie[t>>16&15|64]+Ie[t>>24&255]+"-"+Ie[e&63|128]+Ie[e>>8&255]+"-"+Ie[e>>16&255]+Ie[e>>24&255]+Ie[n&255]+Ie[n>>8&255]+Ie[n>>16&255]+Ie[n>>24&255]).toLowerCase()}function Qt(i,t,e){return Math.max(t,Math.min(e,i))}function wl(i,t){return(i%t+t)%t}function Ju(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Wu(i,t,e){return i!==t?(e-i)/(t-i):0}function gs(i,t,e){return(1-e)*i+e*t}function Xu(i,t,e,n){return gs(i,t,1-Math.exp(-e*n))}function Yu(i,t=1){return t-Math.abs(wl(i,t*2)-t)}function qu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Qu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Zu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function ju(i,t){return i+Math.random()*(t-i)}function $u(i){return i*(.5-Math.random())}function td(i){i!==void 0&&(Mc=i);let t=Mc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ed(i){return i*ms}function nd(i){return i*Ui}function id(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function sd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function rd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ad(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),u=a((t+n)/2),f=r((t-n)/2),h=a((t-n)/2),p=r((n-t)/2),_=a((n-t)/2);switch(s){case"XYX":i.set(o*u,l*f,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*f,o*c);break;case"ZXZ":i.set(l*f,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*_,l*p,o*c);break;case"YXY":i.set(l*p,o*u,l*_,o*c);break;case"ZYZ":i.set(l*_,l*p,o*u,o*c);break;default:Vt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Li(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Le(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Rl={DEG2RAD:ms,RAD2DEG:Ui,generateUUID:gi,clamp:Qt,euclideanModulo:wl,mapLinear:Ju,inverseLerp:Wu,lerp:gs,damp:Xu,pingpong:Yu,smoothstep:qu,smootherstep:Qu,randInt:Zu,randFloat:ju,randFloatSpread:$u,seededRandom:td,degToRad:ed,radToDeg:nd,isPowerOfTwo:id,ceilPowerOfTwo:sd,floorPowerOfTwo:rd,setQuaternionFromProperEuler:ad,normalize:Le,denormalize:Li},Hl=class Hl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Hl.prototype.isVector2=!0;var ut=Hl,Xe=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],f=n[s+3],h=r[a+0],p=r[a+1],_=r[a+2],A=r[a+3];if(f!==A||l!==h||c!==p||u!==_){let m=l*h+c*p+u*_+f*A;m<0&&(h=-h,p=-p,_=-_,A=-A,m=-m);let d=1-o;if(m<.9995){let C=Math.acos(m),S=Math.sin(C);d=Math.sin(d*C)/S,o=Math.sin(o*C)/S,l=l*d+h*o,c=c*d+p*o,u=u*d+_*o,f=f*d+A*o}else{l=l*d+h*o,c=c*d+p*o,u=u*d+_*o,f=f*d+A*o;let C=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=C,c*=C,u*=C,f*=C}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],f=r[a],h=r[a+1],p=r[a+2],_=r[a+3];return t[e]=o*_+u*f+l*p-c*h,t[e+1]=l*_+u*h+c*f-o*p,t[e+2]=c*_+u*p+o*h-l*f,t[e+3]=u*_-o*f-l*h-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),f=o(r/2),h=l(n/2),p=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=h*u*f+c*p*_,this._y=c*p*f-h*u*_,this._z=c*u*_+h*p*f,this._w=c*u*f-h*p*_;break;case"YXZ":this._x=h*u*f+c*p*_,this._y=c*p*f-h*u*_,this._z=c*u*_-h*p*f,this._w=c*u*f+h*p*_;break;case"ZXY":this._x=h*u*f-c*p*_,this._y=c*p*f+h*u*_,this._z=c*u*_+h*p*f,this._w=c*u*f-h*p*_;break;case"ZYX":this._x=h*u*f-c*p*_,this._y=c*p*f+h*u*_,this._z=c*u*_-h*p*f,this._w=c*u*f+h*p*_;break;case"YZX":this._x=h*u*f+c*p*_,this._y=c*p*f+h*u*_,this._z=c*u*_-h*p*f,this._w=c*u*f-h*p*_;break;case"XZY":this._x=h*u*f-c*p*_,this._y=c*p*f-h*u*_,this._z=c*u*_+h*p*f,this._w=c*u*f+h*p*_;break;default:Vt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],f=e[10],h=n+o+f;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>f){let p=2*Math.sqrt(1+n-o-f);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>f){let p=2*Math.sqrt(1+o-n-f);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+f-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Ul=class Ul{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(yc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(yc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),u=2*(o*e-r*s),f=2*(r*n-a*e);return this.x=e+l*c+a*f-o*u,this.y=n+l*u+o*c-r*f,this.z=s+l*f+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return bo.copy(this).projectOnVector(t),this.sub(bo)}reflect(t){return this.sub(bo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ul.prototype.isVector3=!0;var R=Ul,bo=new R,yc=new Xe,kl=class kl{constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],f=n[7],h=n[2],p=n[5],_=n[8],A=s[0],m=s[3],d=s[6],C=s[1],S=s[4],B=s[7],y=s[2],M=s[5],b=s[8];return r[0]=a*A+o*C+l*y,r[3]=a*m+o*S+l*M,r[6]=a*d+o*B+l*b,r[1]=c*A+u*C+f*y,r[4]=c*m+u*S+f*M,r[7]=c*d+u*B+f*b,r[2]=h*A+p*C+_*y,r[5]=h*m+p*S+_*M,r[8]=h*d+p*B+_*b,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=u*a-o*c,h=o*l-u*r,p=c*r-a*l,_=e*f+n*h+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let A=1/_;return t[0]=f*A,t[1]=(s*c-u*n)*A,t[2]=(o*n-s*a)*A,t[3]=h*A,t[4]=(u*e-s*l)*A,t[5]=(s*r-o*e)*A,t[6]=p*A,t[7]=(n*l-c*e)*A,t[8]=(a*e-n*r)*A,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return di("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Io.makeScale(t,e)),this}rotate(t){return di("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Io.makeRotation(-t)),this}translate(t,e){return di("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Io.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};kl.prototype.isMatrix3=!0;var Xt=kl,Io=new Xt,vc=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sc=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function od(){let i={enabled:!0,workingColorSpace:xs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===re&&(s.r=In(s.r),s.g=In(s.g),s.b=In(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===re&&(s.r=Pi(s.r),s.g=Pi(s.g),s.b=Pi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===wn?Bs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return di("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return di("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[xs]:{primaries:t,whitePoint:n,transfer:Bs,toXYZ:vc,fromXYZ:Sc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Je},outputColorSpaceConfig:{drawingBufferColorSpace:Je}},[Je]:{primaries:t,whitePoint:n,transfer:re,toXYZ:vc,fromXYZ:Sc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Je}}}),i}var ee=od();function In(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Pi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ai,Jr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ai===void 0&&(Ai=As("canvas")),Ai.width=t.width,Ai.height=t.height;let s=Ai.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ai}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=As("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=In(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(In(e[n]/255)*255):e[n]=In(e[n]);return{data:e,width:t.width,height:t.height}}else return Vt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},ld=0,ki=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=gi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(To(s[a].image)):r.push(To(s[a]))}else r=To(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function To(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?Jr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Vt("Texture: Unable to serialize Texture."),{})}var cd=0,Fo=new R,He=class i extends ln{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=_n,s=_n,r=De,a=ti,o=en,l=ke,c=i.DEFAULT_ANISOTROPY,u=wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cd++}),this.uuid=gi(),this.name="",this.source=new ki(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Fo).x}get height(){return this.source.getSize(Fo).y}get depth(){return this.source.getSize(Fo).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Vt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Vt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Al)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Vr:t.x=t.x-Math.floor(t.x);break;case _n:t.x=t.x<0?0:1;break;case zr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Vr:t.y=t.y-Math.floor(t.y);break;case _n:t.y=t.y<0?0:1;break;case zr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};He.DEFAULT_IMAGE=null;He.DEFAULT_MAPPING=Al;He.DEFAULT_ANISOTROPY=1;var Vl=class Vl{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],u=l[4],f=l[8],h=l[1],p=l[5],_=l[9],A=l[2],m=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-A)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+A)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let S=(c+1)/2,B=(p+1)/2,y=(d+1)/2,M=(u+h)/4,b=(f+A)/4,E=(_+m)/4;return S>B&&S>y?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=M/n,r=b/n):B>y?B<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(B),n=M/s,r=E/s):y<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(y),n=b/r,s=E/r),this.set(n,s,r,e),this}let C=Math.sqrt((m-_)*(m-_)+(f-A)*(f-A)+(h-u)*(h-u));return Math.abs(C)<.001&&(C=1),this.x=(m-_)/C,this.y=(f-A)/C,this.z=(h-u)/C,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this.w=Qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this.w=Qt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Vl.prototype.isVector4=!0;var me=Vl,Wr=class extends ln{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:De,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new He(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:De,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new ki(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ue=class extends Wr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ms=class extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ve,this.minFilter=ve,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Xr=class extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ve,this.minFilter=ve,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Ea=class Ea{constructor(t,e,n,s,r,a,o,l,c,u,f,h,p,_,A,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,u,f,h,p,_,A,m)}set(t,e,n,s,r,a,o,l,c,u,f,h,p,_,A,m){let d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=_,d[11]=A,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ea().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Mi.setFromMatrixColumn(t,0).length(),r=1/Mi.setFromMatrixColumn(t,1).length(),a=1/Mi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let h=a*u,p=a*f,_=o*u,A=o*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=p+_*c,e[5]=h-A*c,e[9]=-o*l,e[2]=A-h*c,e[6]=_+p*c,e[10]=a*l}else if(t.order==="YXZ"){let h=l*u,p=l*f,_=c*u,A=c*f;e[0]=h+A*o,e[4]=_*o-p,e[8]=a*c,e[1]=a*f,e[5]=a*u,e[9]=-o,e[2]=p*o-_,e[6]=A+h*o,e[10]=a*l}else if(t.order==="ZXY"){let h=l*u,p=l*f,_=c*u,A=c*f;e[0]=h-A*o,e[4]=-a*f,e[8]=_+p*o,e[1]=p+_*o,e[5]=a*u,e[9]=A-h*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let h=a*u,p=a*f,_=o*u,A=o*f;e[0]=l*u,e[4]=_*c-p,e[8]=h*c+A,e[1]=l*f,e[5]=A*c+h,e[9]=p*c-_,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let h=a*l,p=a*c,_=o*l,A=o*c;e[0]=l*u,e[4]=A-h*f,e[8]=_*f+p,e[1]=f,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=p*f+_,e[10]=h-A*f}else if(t.order==="XZY"){let h=a*l,p=a*c,_=o*l,A=o*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=h*f+A,e[5]=a*u,e[9]=p*f-_,e[2]=_*f-p,e[6]=o*u,e[10]=A*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(hd,t,ud)}lookAt(t,e,n){let s=this.elements;return ze.subVectors(t,e),ze.lengthSq()===0&&(ze.z=1),ze.normalize(),Pn.crossVectors(n,ze),Pn.lengthSq()===0&&(Math.abs(n.z)===1?ze.x+=1e-4:ze.z+=1e-4,ze.normalize(),Pn.crossVectors(n,ze)),Pn.normalize(),dr.crossVectors(ze,Pn),s[0]=Pn.x,s[4]=dr.x,s[8]=ze.x,s[1]=Pn.y,s[5]=dr.y,s[9]=ze.y,s[2]=Pn.z,s[6]=dr.z,s[10]=ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],f=n[5],h=n[9],p=n[13],_=n[2],A=n[6],m=n[10],d=n[14],C=n[3],S=n[7],B=n[11],y=n[15],M=s[0],b=s[4],E=s[8],D=s[12],T=s[1],F=s[5],O=s[9],V=s[13],w=s[2],H=s[6],U=s[10],k=s[14],it=s[3],X=s[7],$=s[11],L=s[15];return r[0]=a*M+o*T+l*w+c*it,r[4]=a*b+o*F+l*H+c*X,r[8]=a*E+o*O+l*U+c*$,r[12]=a*D+o*V+l*k+c*L,r[1]=u*M+f*T+h*w+p*it,r[5]=u*b+f*F+h*H+p*X,r[9]=u*E+f*O+h*U+p*$,r[13]=u*D+f*V+h*k+p*L,r[2]=_*M+A*T+m*w+d*it,r[6]=_*b+A*F+m*H+d*X,r[10]=_*E+A*O+m*U+d*$,r[14]=_*D+A*V+m*k+d*L,r[3]=C*M+S*T+B*w+y*it,r[7]=C*b+S*F+B*H+y*X,r[11]=C*E+S*O+B*U+y*$,r[15]=C*D+S*V+B*k+y*L,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],f=t[6],h=t[10],p=t[14],_=t[3],A=t[7],m=t[11],d=t[15],C=l*p-c*h,S=o*p-c*f,B=o*h-l*f,y=a*p-c*u,M=a*h-l*u,b=a*f-o*u;return e*(A*C-m*S+d*B)-n*(_*C-m*y+d*M)+s*(_*S-A*y+d*b)-r*(_*B-A*M+m*b)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],u=t[10];return e*(a*u-o*c)-n*(r*u-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=t[9],h=t[10],p=t[11],_=t[12],A=t[13],m=t[14],d=t[15],C=e*o-n*a,S=e*l-s*a,B=e*c-r*a,y=n*l-s*o,M=n*c-r*o,b=s*c-r*l,E=u*A-f*_,D=u*m-h*_,T=u*d-p*_,F=f*m-h*A,O=f*d-p*A,V=h*d-p*m,w=C*V-S*O+B*F+y*T-M*D+b*E;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/w;return t[0]=(o*V-l*O+c*F)*H,t[1]=(s*O-n*V-r*F)*H,t[2]=(A*b-m*M+d*y)*H,t[3]=(h*M-f*b-p*y)*H,t[4]=(l*T-a*V-c*D)*H,t[5]=(e*V-s*T+r*D)*H,t[6]=(m*B-_*b-d*S)*H,t[7]=(u*b-h*B+p*S)*H,t[8]=(a*O-o*T+c*E)*H,t[9]=(n*T-e*O-r*E)*H,t[10]=(_*M-A*B+d*C)*H,t[11]=(f*B-u*M-p*C)*H,t[12]=(o*D-a*F-l*E)*H,t[13]=(e*F-n*D+s*E)*H,t[14]=(A*S-_*y-m*C)*H,t[15]=(u*y-f*S+h*C)*H,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,f=o+o,h=r*c,p=r*u,_=r*f,A=a*u,m=a*f,d=o*f,C=l*c,S=l*u,B=l*f,y=n.x,M=n.y,b=n.z;return s[0]=(1-(A+d))*y,s[1]=(p+B)*y,s[2]=(_-S)*y,s[3]=0,s[4]=(p-B)*M,s[5]=(1-(h+d))*M,s[6]=(m+C)*M,s[7]=0,s[8]=(_+S)*b,s[9]=(m-C)*b,s[10]=(1-(h+A))*b,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Mi.set(s[0],s[1],s[2]).length(),o=Mi.set(s[4],s[5],s[6]).length(),l=Mi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),sn.copy(this);let c=1/a,u=1/o,f=1/l;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=u,sn.elements[5]*=u,sn.elements[6]*=u,sn.elements[8]*=f,sn.elements[9]*=f,sn.elements[10]*=f,e.setFromRotationMatrix(sn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=on,l=!1){let c=this.elements,u=2*r/(e-t),f=2*r/(n-s),h=(e+t)/(e-t),p=(n+s)/(n-s),_,A;if(l)_=r/(a-r),A=a*r/(a-r);else if(o===on)_=-(a+r)/(a-r),A=-2*a*r/(a-r);else if(o===Oi)_=-a/(a-r),A=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=A,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=on,l=!1){let c=this.elements,u=2/(e-t),f=2/(n-s),h=-(e+t)/(e-t),p=-(n+s)/(n-s),_,A;if(l)_=1/(a-r),A=a/(a-r);else if(o===on)_=-2/(a-r),A=-(a+r)/(a-r);else if(o===Oi)_=-1/(a-r),A=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=_,c[14]=A,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Ea.prototype.isMatrix4=!0;var pe=Ea,Mi=new R,sn=new pe,hd=new R(0,0,0),ud=new R(1,1,1),Pn=new R,dr=new R,ze=new R,Dc=new pe,bc=new Xe,Tn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],f=s[2],h=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Qt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Vt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Dc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Dc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return bc.setFromEuler(this),this.setFromQuaternion(bc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Tn.DEFAULT_ORDER="XYZ";var ys=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},dd=0,Ic=new R,yi=new Xe,yn=new pe,fr=new R,hs=new R,fd=new R,pd=new Xe,Tc=new R(1,0,0),Fc=new R(0,1,0),wc=new R(0,0,1),Rc={type:"added"},md={type:"removed"},vi={type:"childadded",child:null},wo={type:"childremoved",child:null},we=class i extends ln{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new R,e=new Tn,n=new Xe,s=new R(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pe},normalMatrix:{value:new Xt}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ys,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return yi.setFromAxisAngle(t,e),this.quaternion.multiply(yi),this}rotateOnWorldAxis(t,e){return yi.setFromAxisAngle(t,e),this.quaternion.premultiply(yi),this}rotateX(t){return this.rotateOnAxis(Tc,t)}rotateY(t){return this.rotateOnAxis(Fc,t)}rotateZ(t){return this.rotateOnAxis(wc,t)}translateOnAxis(t,e){return Ic.copy(t).applyQuaternion(this.quaternion),this.position.add(Ic.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Tc,t)}translateY(t){return this.translateOnAxis(Fc,t)}translateZ(t){return this.translateOnAxis(wc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?fr.copy(t):fr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),hs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(hs,fr,this.up):yn.lookAt(fr,hs,this.up),this.quaternion.setFromRotationMatrix(yn),s&&(yn.extractRotation(s.matrixWorld),yi.setFromRotationMatrix(yn),this.quaternion.premultiply(yi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Kt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Rc),vi.child=t,this.dispatchEvent(vi),vi.child=null):Kt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(md),wo.child=t,this.dispatchEvent(wo),wo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Rc),vi.child=t,this.dispatchEvent(vi),vi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hs,t,fd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hs,pd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),f=a(t.shapes),h=a(t.skeletons),p=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};we.DEFAULT_UP=new R(0,1,0);we.DEFAULT_MATRIX_AUTO_UPDATE=!0;we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var En=class extends we{constructor(){super(),this.isGroup=!0,this.type="Group"}},gd={type:"move"},Vi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new En,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new En,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new En,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let A of t.hand.values()){let m=e.getJointPose(A,n),d=this._getHandJoint(c,A);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,_=.005;c.inputState.pinching&&h>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gd)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new En;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Gh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},pr={h:0,s:0,l:0};function Ro(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var te=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ee.workingColorSpace){if(t=wl(t,1),e=Qt(e,0,1),n=Qt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Ro(a,r,t+1/3),this.g=Ro(a,r,t),this.b=Ro(a,r,t-1/3)}return ee.colorSpaceToWorking(this,s),this}setStyle(t,e=Je){function n(r){r!==void 0&&parseFloat(r)<1&&Vt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Vt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Vt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Je){let n=Gh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Vt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=In(t.r),this.g=In(t.g),this.b=In(t.b),this}copyLinearToSRGB(t){return this.r=Pi(t.r),this.g=Pi(t.g),this.b=Pi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Je){return ee.workingToColorSpace(Te.copy(this),t),Math.round(Qt(Te.r*255,0,255))*65536+Math.round(Qt(Te.g*255,0,255))*256+Math.round(Qt(Te.b*255,0,255))}getHexString(t=Je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.workingToColorSpace(Te.copy(this),e);let n=Te.r,s=Te.g,r=Te.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case n:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-n)/f+2;break;case r:l=(n-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=ee.workingColorSpace){return ee.workingToColorSpace(Te.copy(this),e),t.r=Te.r,t.g=Te.g,t.b=Te.b,t}getStyle(t=Je){ee.workingToColorSpace(Te.copy(this),t);let e=Te.r,n=Te.g,s=Te.b;return t!==Je?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Nn),this.setHSL(Nn.h+t,Nn.s+e,Nn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Nn),t.getHSL(pr);let n=gs(Nn.h,pr.h,e),s=gs(Nn.s,pr.s,e),r=gs(Nn.l,pr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Te=new te;te.NAMES=Gh;var vs=class extends we{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},rn=new R,vn=new R,Go=new R,Sn=new R,Si=new R,Di=new R,Gc=new R,Lo=new R,Po=new R,No=new R,Oo=new me,Ho=new me,Uo=new me,kn=class i{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),rn.subVectors(t,e),s.cross(rn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){rn.subVectors(s,e),vn.subVectors(n,e),Go.subVectors(t,e);let a=rn.dot(rn),o=rn.dot(vn),l=rn.dot(Go),c=vn.dot(vn),u=vn.dot(Go),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;let h=1/f,p=(c*l-o*u)*h,_=(a*u-o*l)*h;return r.set(1-p-_,_,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Sn)===null?!1:Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Sn.x),l.addScaledVector(a,Sn.y),l.addScaledVector(o,Sn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return Oo.setScalar(0),Ho.setScalar(0),Uo.setScalar(0),Oo.fromBufferAttribute(t,e),Ho.fromBufferAttribute(t,n),Uo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Oo,r.x),a.addScaledVector(Ho,r.y),a.addScaledVector(Uo,r.z),a}static isFrontFacing(t,e,n,s){return rn.subVectors(n,e),vn.subVectors(t,e),rn.cross(vn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return rn.subVectors(this.c,this.b),vn.subVectors(this.a,this.b),rn.cross(vn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Si.subVectors(s,n),Di.subVectors(r,n),Lo.subVectors(t,n);let l=Si.dot(Lo),c=Di.dot(Lo);if(l<=0&&c<=0)return e.copy(n);Po.subVectors(t,s);let u=Si.dot(Po),f=Di.dot(Po);if(u>=0&&f<=u)return e.copy(s);let h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(Si,a);No.subVectors(t,r);let p=Si.dot(No),_=Di.dot(No);if(_>=0&&p<=_)return e.copy(r);let A=p*c-l*_;if(A<=0&&c>=0&&_<=0)return o=c/(c-_),e.copy(n).addScaledVector(Di,o);let m=u*_-p*f;if(m<=0&&f-u>=0&&p-_>=0)return Gc.subVectors(r,s),o=(f-u)/(f-u+(p-_)),e.copy(s).addScaledVector(Gc,o);let d=1/(m+A+h);return a=A*d,o=h*d,e.copy(n).addScaledVector(Si,a).addScaledVector(Di,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Vn=class{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(an.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(an.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=an.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,an):an.fromBufferAttribute(r,a),an.applyMatrix4(t.matrixWorld),this.expandByPoint(an);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),mr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),mr.copy(n.boundingBox)),mr.applyMatrix4(t.matrixWorld),this.union(mr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,an),an.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(us),gr.subVectors(this.max,us),bi.subVectors(t.a,us),Ii.subVectors(t.b,us),Ti.subVectors(t.c,us),On.subVectors(Ii,bi),Hn.subVectors(Ti,Ii),oi.subVectors(bi,Ti);let e=[0,-On.z,On.y,0,-Hn.z,Hn.y,0,-oi.z,oi.y,On.z,0,-On.x,Hn.z,0,-Hn.x,oi.z,0,-oi.x,-On.y,On.x,0,-Hn.y,Hn.x,0,-oi.y,oi.x,0];return!ko(e,bi,Ii,Ti,gr)||(e=[1,0,0,0,1,0,0,0,1],!ko(e,bi,Ii,Ti,gr))?!1:(_r.crossVectors(On,Hn),e=[_r.x,_r.y,_r.z],ko(e,bi,Ii,Ti,gr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,an).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(an).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Dn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Dn=[new R,new R,new R,new R,new R,new R,new R,new R],an=new R,mr=new Vn,bi=new R,Ii=new R,Ti=new R,On=new R,Hn=new R,oi=new R,us=new R,gr=new R,_r=new R,li=new R;function ko(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){li.fromArray(i,r);let o=s.x*Math.abs(li.x)+s.y*Math.abs(li.y)+s.z*Math.abs(li.z),l=t.dot(li),c=e.dot(li),u=n.dot(li);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Ce=new R,Er=new ut,_d=0,$e=class extends ln{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_d++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ih,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Er.fromBufferAttribute(this,e),Er.applyMatrix3(t),this.setXY(e,Er.x,Er.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.applyMatrix3(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.applyMatrix4(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.applyNormalMatrix(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.transformDirection(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Li(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Le(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Li(e,this.array)),e}setX(t,e){return this.normalized&&(e=Le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Li(e,this.array)),e}setY(t,e){return this.normalized&&(e=Le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Li(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Li(e,this.array)),e}setW(t,e){return this.normalized&&(e=Le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Le(e,this.array),n=Le(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Le(e,this.array),n=Le(n,this.array),s=Le(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Le(e,this.array),n=Le(n,this.array),s=Le(s,this.array),r=Le(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Ss=class extends $e{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ds=class extends $e{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Se=class extends $e{constructor(t,e,n){super(new Float32Array(t),e,n)}},Ed=new Vn,ds=new R,Vo=new R,zi=class{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Ed.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ds.subVectors(t,this.center);let e=ds.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ds,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Vo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ds.copy(t.center).add(Vo)),this.expandByPoint(ds.copy(t.center).sub(Vo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Cd=0,je=new pe,zo=new we,Fi=new R,Ke=new Vn,fs=new Vn,ye=new R,tn=class i extends ln{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=gi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(zu(t)?Ds:Ss)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Xt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return je.makeRotationFromQuaternion(t),this.applyMatrix4(je),this}rotateX(t){return je.makeRotationX(t),this.applyMatrix4(je),this}rotateY(t){return je.makeRotationY(t),this.applyMatrix4(je),this}rotateZ(t){return je.makeRotationZ(t),this.applyMatrix4(je),this}translate(t,e,n){return je.makeTranslation(t,e,n),this.applyMatrix4(je),this}scale(t,e,n){return je.makeScale(t,e,n),this.applyMatrix4(je),this}lookAt(t){return zo.lookAt(t),zo.updateMatrix(),this.applyMatrix4(zo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fi).negate(),this.translate(Fi.x,Fi.y,Fi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Se(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Vt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Kt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Ke.setFromBufferAttribute(r),this.morphTargetsRelative?(ye.addVectors(this.boundingBox.min,Ke.min),this.boundingBox.expandByPoint(ye),ye.addVectors(this.boundingBox.max,Ke.max),this.boundingBox.expandByPoint(ye)):(this.boundingBox.expandByPoint(Ke.min),this.boundingBox.expandByPoint(Ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Kt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Kt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){let n=this.boundingSphere.center;if(Ke.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];fs.setFromBufferAttribute(o),this.morphTargetsRelative?(ye.addVectors(Ke.min,fs.min),Ke.expandByPoint(ye),ye.addVectors(Ke.max,fs.max),Ke.expandByPoint(ye)):(Ke.expandByPoint(fs.min),Ke.expandByPoint(fs.max))}Ke.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)ye.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ye));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)ye.fromBufferAttribute(o,c),l&&(Fi.fromBufferAttribute(t,c),ye.add(Fi)),s=Math.max(s,n.distanceToSquared(ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Kt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Kt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new $e(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let E=0;E<n.count;E++)o[E]=new R,l[E]=new R;let c=new R,u=new R,f=new R,h=new ut,p=new ut,_=new ut,A=new R,m=new R;function d(E,D,T){c.fromBufferAttribute(n,E),u.fromBufferAttribute(n,D),f.fromBufferAttribute(n,T),h.fromBufferAttribute(r,E),p.fromBufferAttribute(r,D),_.fromBufferAttribute(r,T),u.sub(c),f.sub(c),p.sub(h),_.sub(h);let F=1/(p.x*_.y-_.x*p.y);isFinite(F)&&(A.copy(u).multiplyScalar(_.y).addScaledVector(f,-p.y).multiplyScalar(F),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(F),o[E].add(A),o[D].add(A),o[T].add(A),l[E].add(m),l[D].add(m),l[T].add(m))}let C=this.groups;C.length===0&&(C=[{start:0,count:t.count}]);for(let E=0,D=C.length;E<D;++E){let T=C[E],F=T.start,O=T.count;for(let V=F,w=F+O;V<w;V+=3)d(t.getX(V+0),t.getX(V+1),t.getX(V+2))}let S=new R,B=new R,y=new R,M=new R;function b(E){y.fromBufferAttribute(s,E),M.copy(y);let D=o[E];S.copy(D),S.sub(y.multiplyScalar(y.dot(D))).normalize(),B.crossVectors(M,D);let F=B.dot(l[E])<0?-1:1;a.setXYZW(E,S.x,S.y,S.z,F)}for(let E=0,D=C.length;E<D;++E){let T=C[E],F=T.start,O=T.count;for(let V=F,w=F+O;V<w;V+=3)b(t.getX(V+0)),b(t.getX(V+1)),b(t.getX(V+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new $e(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);let s=new R,r=new R,a=new R,o=new R,l=new R,c=new R,u=new R,f=new R;if(t)for(let h=0,p=t.count;h<p;h+=3){let _=t.getX(h+0),A=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,A),a.fromBufferAttribute(e,m),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,A),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(A,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=e.count;h<p;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ye.fromBufferAttribute(t,e),ye.normalize(),t.setXYZ(e,ye.x,ye.y,ye.z)}toNonIndexed(){function t(o,l){let c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u),p=0,_=0;for(let A=0,m=l.length;A<m;A++){o.isInterleavedBufferAttribute?p=l[A]*o.data.stride+o.offset:p=l[A]*u;for(let d=0;d<u;d++)h[_++]=c[p++]}return new $e(h,u,f)}if(this.index===null)return Vt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,f=c.length;u<f;u++){let h=c[u],p=t(h,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){let p=c[f];u.push(p.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(e))}let r=t.morphAttributes;for(let c in r){let u=[],f=r[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,u=a.length;c<u;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Ko=new R,xd=new R,Bd=new Xt,We=class{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Ko.subVectors(n,e).cross(xd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Ko),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Bd.getNormalMatrix(t),s=this.coplanarPoint(Ko).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Ad=0,zn=class extends ln{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=gi(),this.name="",this.type="Material",this.blending=$i,this.side=jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fl,this.blendDst=pl,this.blendEquation=pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=Ni,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ah,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gr,this.stencilZFail=Gr,this.stencilZPass=Gr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Vt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Vt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new te().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new We().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ut().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ut().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var bn=new R,Jo=new R,Cr=new R,xr=new R,Ki=class{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,bn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=bn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(bn.copy(this.origin).addScaledVector(this.direction,e),bn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Jo.copy(t).add(e).multiplyScalar(.5),Cr.copy(e).sub(t).normalize(),xr.copy(this.origin).sub(Jo);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Cr),o=xr.dot(this.direction),l=-xr.dot(Cr),c=xr.lengthSq(),u=Math.abs(1-a*a),f,h,p,_;if(u>0)if(f=a*l-o,h=a*o-l,_=r*u,f>=0)if(h>=-_)if(h<=_){let A=1/u;f*=A,h*=A,p=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h=-r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h<=-_?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+c):h<=_?(f=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+c):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+c);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Jo).addScaledVector(Cr,h),p}intersectSphere(t,e){if(t.radius<0)return null;bn.subVectors(t.center,this.origin);let n=bn.dot(this.direction),s=bn.dot(bn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(n=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(n=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-h.z)*f,l=(t.max.z-h.z)*f):(o=(t.max.z-h.z)*f,l=(t.min.z-h.z)*f),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,bn)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,f=t.x-a.x,h=t.y-a.y,p=t.z-a.z,_=e.x-a.x,A=e.y-a.y,m=e.z-a.z,d=n.x-a.x,C=n.y-a.y,S=n.z-a.z,B=Math.abs(l),y=Math.abs(c),M=Math.abs(u),b,E,D,T,F,O,V,w,H,U,k,it;if(B>=y&&B>=M?(D=l,O=f,H=_,it=d,l>=0?(b=c,E=u,T=h,F=p,V=A,w=m,U=C,k=S):(b=u,E=c,T=p,F=h,V=m,w=A,U=S,k=C)):y>=M?(D=c,O=h,H=A,it=C,c>=0?(b=u,E=l,T=p,F=f,V=m,w=_,U=S,k=d):(b=l,E=u,T=f,F=p,V=_,w=m,U=d,k=S)):(D=u,O=p,H=m,it=S,u>=0?(b=l,E=c,T=f,F=h,V=_,w=A,U=d,k=C):(b=c,E=l,T=h,F=f,V=A,w=_,U=C,k=d)),D===0)return null;let X=b/D,$=E/D,L=1/D,lt=T-X*O,at=F-$*O,Gt=V-X*H,Ot=w-$*H,Jt=U-X*it,Y=k-$*it,Z=Jt*Ot-Y*Gt,ft=lt*Y-at*Jt,vt=Gt*at-Ot*lt;if(s){if(Z<0||ft<0||vt<0)return null}else if((Z<0||ft<0||vt<0)&&(Z>0||ft>0||vt>0))return null;let dt=Z+ft+vt;if(dt===0)return null;let Dt=L*(Z*O+ft*H+vt*it);return(dt>0?Dt<0:Dt>0)?null:this.at(Dt/dt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},bs=class extends zn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=Ca,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Lc=new pe,ci=new Ki,Br=new zi,Pc=new R,Ar=new R,Mr=new R,yr=new R,Wo=new R,vr=new R,Nc=new R,Sr=new R,xe=class extends we{constructor(t=new tn,e=new bs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){vr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],f=r[l];u!==0&&(Wo.fromBufferAttribute(f,t),a?vr.addScaledVector(Wo,u):vr.addScaledVector(Wo.sub(e),u))}e.add(vr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Br.copy(n.boundingSphere),Br.applyMatrix4(r),ci.copy(t.ray).recast(t.near),!(Br.containsPoint(ci.origin)===!1&&(ci.intersectSphere(Br,Pc)===null||ci.origin.distanceToSquared(Pc)>(t.far-t.near)**2))&&(Lc.copy(r).invert(),ci.copy(t.ray).applyMatrix4(Lc),!(n.boundingBox!==null&&ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ci)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,A=h.length;_<A;_++){let m=h[_],d=a[m.materialIndex],C=Math.max(m.start,p.start),S=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let B=C,y=S;B<y;B+=3){let M=o.getX(B),b=o.getX(B+1),E=o.getX(B+2);s=Dr(this,d,t,n,c,u,f,M,b,E),s&&(s.faceIndex=Math.floor(B/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let _=Math.max(0,p.start),A=Math.min(o.count,p.start+p.count);for(let m=_,d=A;m<d;m+=3){let C=o.getX(m),S=o.getX(m+1),B=o.getX(m+2);s=Dr(this,a,t,n,c,u,f,C,S,B),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,A=h.length;_<A;_++){let m=h[_],d=a[m.materialIndex],C=Math.max(m.start,p.start),S=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let B=C,y=S;B<y;B+=3){let M=B,b=B+1,E=B+2;s=Dr(this,d,t,n,c,u,f,M,b,E),s&&(s.faceIndex=Math.floor(B/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let _=Math.max(0,p.start),A=Math.min(l.count,p.start+p.count);for(let m=_,d=A;m<d;m+=3){let C=m,S=m+1,B=m+2;s=Dr(this,a,t,n,c,u,f,C,S,B),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Md(i,t,e,n,s,r,a,o){let l;if(t.side===Pe?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===jn,o),l===null)return null;Sr.copy(o),Sr.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Sr);return c<e.near||c>e.far?null:{distance:c,point:Sr.clone(),object:i}}function Dr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Ar),i.getVertexPosition(l,Mr),i.getVertexPosition(c,yr);let u=Md(i,t,e,n,Ar,Mr,yr,Nc);if(u){let f=new R;kn.getBarycoord(Nc,Ar,Mr,yr,f),s&&(u.uv=kn.getInterpolatedAttribute(s,o,l,c,f,new ut)),r&&(u.uv1=kn.getInterpolatedAttribute(r,o,l,c,f,new ut)),a&&(u.normal=kn.getInterpolatedAttribute(a,o,l,c,f,new R),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new R,materialIndex:0};kn.getNormal(Ar,Mr,yr,h.normal),u.face=h,u.barycoord=f}return u}var Yr=class extends He{constructor(t=null,e=1,n=1,s,r,a,o,l,c=ve,u=ve,f,h){super(null,a,o,l,c,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var hi=new zi,yd=new ut(.5,.5),br=new R,Ji=class{constructor(t=new We,e=new We,n=new We,s=new We,r=new We,a=new We){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=on,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],f=r[5],h=r[6],p=r[7],_=r[8],A=r[9],m=r[10],d=r[11],C=r[12],S=r[13],B=r[14],y=r[15];if(s[0].setComponents(c-a,p-u,d-_,y-C).normalize(),s[1].setComponents(c+a,p+u,d+_,y+C).normalize(),s[2].setComponents(c+o,p+f,d+A,y+S).normalize(),s[3].setComponents(c-o,p-f,d-A,y-S).normalize(),n)s[4].setComponents(l,h,m,B).normalize(),s[5].setComponents(c-l,p-h,d-m,y-B).normalize();else if(s[4].setComponents(c-l,p-h,d-m,y-B).normalize(),e===on)s[5].setComponents(c+l,p+h,d+m,y+B).normalize();else if(e===Oi)s[5].setComponents(l,h,m,B).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),hi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),hi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(hi)}intersectsSprite(t){hi.center.set(0,0,0);let e=yd.distanceTo(t.center);return hi.radius=.7071067811865476+e,hi.applyMatrix4(t.matrixWorld),this.intersectsSphere(hi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(br.x=s.normal.x>0?t.max.x:t.min.x,br.y=s.normal.y>0?t.max.y:t.min.y,br.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(br)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Is=class extends He{constructor(t=[],e=$n,n,s,r,a,o,l,c,u){super(t,e,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Kn=class extends He{constructor(t,e,n=hn,s,r,a,o=ve,l=ve,c,u=Cn,f=1){if(u!==Cn&&u!==ei)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:f};super(h,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ki(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},qr=class extends Kn{constructor(t,e=hn,n=$n,s,r,a=ve,o=ve,l,c=Cn){let u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,n,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Ts=class extends He{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Jn=class i extends tn{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],f=[],h=0,p=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,s,a,2),_("x","z","y",1,-1,t,n,-e,s,a,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Se(c,3)),this.setAttribute("normal",new Se(u,3)),this.setAttribute("uv",new Se(f,2));function _(A,m,d,C,S,B,y,M,b,E,D){let T=B/b,F=y/E,O=B/2,V=y/2,w=M/2,H=b+1,U=E+1,k=0,it=0,X=new R;for(let $=0;$<U;$++){let L=$*F-V;for(let lt=0;lt<H;lt++){let at=lt*T-O;X[A]=at*C,X[m]=L*S,X[d]=w,c.push(X.x,X.y,X.z),X[A]=0,X[m]=0,X[d]=M>0?1:-1,u.push(X.x,X.y,X.z),f.push(lt/b),f.push(1-$/E),k+=1}}for(let $=0;$<E;$++)for(let L=0;L<b;L++){let lt=h+L+H*$,at=h+L+H*($+1),Gt=h+(L+1)+H*($+1),Ot=h+(L+1)+H*$;l.push(lt,at,Ot),l.push(at,Gt,Ot),it+=6}o.addGroup(p,it,D),p+=it,h+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Fs=class i extends tn{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],f=[],h=[],p=[],_=0,A=[],m=n/2,d=0;C(),a===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new Se(f,3)),this.setAttribute("normal",new Se(h,3)),this.setAttribute("uv",new Se(p,2));function C(){let B=new R,y=new R,M=0,b=(e-t)/n;for(let E=0;E<=r;E++){let D=[],T=E/r,F=T*(e-t)+t;for(let O=0;O<=s;O++){let V=O/s,w=V*l+o,H=Math.sin(w),U=Math.cos(w);y.x=F*H,y.y=-T*n+m,y.z=F*U,f.push(y.x,y.y,y.z),B.set(H,b,U).normalize(),h.push(B.x,B.y,B.z),p.push(V,1-T),D.push(_++)}A.push(D)}for(let E=0;E<s;E++)for(let D=0;D<r;D++){let T=A[D][E],F=A[D+1][E],O=A[D+1][E+1],V=A[D][E+1];(t>0||D!==0)&&(u.push(T,F,V),M+=3),(e>0||D!==r-1)&&(u.push(F,O,V),M+=3)}c.addGroup(d,M,0),d+=M}function S(B){let y=_,M=new ut,b=new R,E=0,D=B===!0?t:e,T=B===!0?1:-1;for(let O=1;O<=s;O++)f.push(0,m*T,0),h.push(0,T,0),p.push(.5,.5),_++;let F=_;for(let O=0;O<=s;O++){let w=O/s*l+o,H=Math.cos(w),U=Math.sin(w);b.x=D*U,b.y=m*T,b.z=D*H,f.push(b.x,b.y,b.z),h.push(0,T,0),M.x=H*.5+.5,M.y=U*.5*T+.5,p.push(M.x,M.y),_++}for(let O=0;O<s;O++){let V=y+O,w=F+O;B===!0?u.push(w,w+1,V):u.push(w+1,w,V),E+=3}c.addGroup(d,E,B===!0?1:2),d+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Ye=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Vt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let u=n[s],h=n[s+1]-u,p=(a-u)/h;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new ut:new R);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new R,s=[],r=[],a=[],o=new R,l=new pe;for(let p=0;p<=t;p++){let _=p/t;s[p]=this.getTangentAt(_,new R)}r[0]=new R,a[0]=new R;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),f=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();let _=Math.acos(Qt(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,_))}a[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Qt(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let _=1;_<=t;_++)r[_].applyMatrix4(l.makeRotationAxis(s[_],p*_)),a[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Wi=class extends Ye{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ut){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=l-this.aX,p=c-this.aY;l=h*u-p*f+this.aX,c=h*f+p*u+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Qr=class extends Wi{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Gl(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,f){let h=(a-r)/c-(o-r)/(c+u)+(o-a)/u,p=(o-a)/u-(l-a)/(u+f)+(l-o)/f;h*=u,p*=u,s(a,o,h,p)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var Oc=new R,Hc=new R,Xo=new Gl,Yo=new Gl,qo=new Gl,Zr=class extends Ye{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new R){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(Hc.subVectors(s[0],s[1]).add(s[0]),c=Hc);let f=s[o%r],h=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(Oc.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Oc),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,_=Math.pow(c.distanceToSquared(f),p),A=Math.pow(f.distanceToSquared(h),p),m=Math.pow(h.distanceToSquared(u),p);A<1e-4&&(A=1),_<1e-4&&(_=A),m<1e-4&&(m=A),Xo.initNonuniformCatmullRom(c.x,f.x,h.x,u.x,_,A,m),Yo.initNonuniformCatmullRom(c.y,f.y,h.y,u.y,_,A,m),qo.initNonuniformCatmullRom(c.z,f.z,h.z,u.z,_,A,m)}else this.curveType==="catmullrom"&&(Xo.initCatmullRom(c.x,f.x,h.x,u.x,this.tension),Yo.initCatmullRom(c.y,f.y,h.y,u.y,this.tension),qo.initCatmullRom(c.z,f.z,h.z,u.z,this.tension));return n.set(Xo.calc(l),Yo.calc(l),qo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new R().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Uc(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function vd(i,t){let e=1-i;return e*e*t}function Sd(i,t){return 2*(1-i)*i*t}function Dd(i,t){return i*i*t}function _s(i,t,e,n){return vd(i,t)+Sd(i,e)+Dd(i,n)}function bd(i,t){let e=1-i;return e*e*e*t}function Id(i,t){let e=1-i;return 3*e*e*i*t}function Td(i,t){return 3*(1-i)*i*i*t}function Fd(i,t){return i*i*i*t}function Es(i,t,e,n,s){return bd(i,t)+Id(i,e)+Td(i,n)+Fd(i,s)}var ws=class extends Ye{constructor(t=new ut,e=new ut,n=new ut,s=new ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ut){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Es(t,s.x,r.x,a.x,o.x),Es(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},jr=class extends Ye{constructor(t=new R,e=new R,n=new R,s=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new R){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Es(t,s.x,r.x,a.x,o.x),Es(t,s.y,r.y,a.y,o.y),Es(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Rs=class extends Ye{constructor(t=new ut,e=new ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ut){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},$r=class extends Ye{constructor(t=new R,e=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new R){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new R){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Gs=class extends Ye{constructor(t=new ut,e=new ut,n=new ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ut){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(_s(t,s.x,r.x,a.x),_s(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ta=class extends Ye{constructor(t=new R,e=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new R){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(_s(t,s.x,r.x,a.x),_s(t,s.y,r.y,a.y),_s(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ls=class extends Ye{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ut){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(Uc(o,l.x,c.x,u.x,f.x),Uc(o,l.y,c.y,u.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new ut().fromArray(s))}return this}},nl=Object.freeze({__proto__:null,ArcCurve:Qr,CatmullRomCurve3:Zr,CubicBezierCurve:ws,CubicBezierCurve3:jr,EllipseCurve:Wi,LineCurve:Rs,LineCurve3:$r,QuadraticBezierCurve:Gs,QuadraticBezierCurve3:ta,SplineCurve:Ls}),ea=class extends Ye{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new nl[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let u=l[c];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new nl[s.type]().fromJSON(s))}return this}},Ps=class extends ea{constructor(t){super(),this.type="Path",this.currentPoint=new ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Rs(this.currentPoint.clone(),new ut(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Gs(this.currentPoint.clone(),new ut(t,e),new ut(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new ws(this.currentPoint.clone(),new ut(t,e),new ut(n,s),new ut(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Ls(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){let c=new Wi(t,e,n,s,r,a,o,l);if(this.curves.length>0){let f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Xi=class extends Ps{constructor(t){super(t),this.uuid=gi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Ps().fromJSON(s))}return this}};function wd(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Lh(i,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Nd(i,t,r,e)),i.length>80*e){o=i[0],l=i[1];let u=o,f=l;for(let h=e;h<s;h+=e){let p=i[h],_=i[h+1];p<o&&(o=p),_<l&&(l=_),p>u&&(u=p),_>f&&(f=_)}c=Math.max(u-o,f-l),c=c!==0?32767/c:0}return Ns(r,a,e,o,l,c,0),a}function Lh(i,t,e,n,s){let r;if(s===Yd(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=kc(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=kc(a/n|0,i[a],i[a+1],r);return r&&Yi(r,r.next)&&(Hs(r),r=r.next),r}function fi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Yi(e,e.next)||ge(e.prev,e,e.next)===0)){if(Hs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ns(i,t,e,n,s,r,a){if(!i)return;!a&&r&&Vd(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Gd(i,n,s,r):Rd(i)){t.push(l.i,i.i,c.i),Hs(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Ld(fi(i),t),Ns(i,t,e,n,s,r,2)):a===2&&Pd(i,t,e,n,s,r):Ns(fi(i),t,e,n,s,r,1);break}}}function Rd(i){let t=i.prev,e=i,n=i.next;if(ge(t,e,n)>=0)return!1;let s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,u=Math.min(s,r,a),f=Math.min(o,l,c),h=Math.max(s,r,a),p=Math.max(o,l,c),_=n.next;for(;_!==t;){if(_.x>=u&&_.x<=h&&_.y>=f&&_.y<=p&&ps(s,o,r,l,a,c,_.x,_.y)&&ge(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function Gd(i,t,e,n){let s=i.prev,r=i,a=i.next;if(ge(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,u=s.y,f=r.y,h=a.y,p=Math.min(o,l,c),_=Math.min(u,f,h),A=Math.max(o,l,c),m=Math.max(u,f,h),d=il(p,_,t,e,n),C=il(A,m,t,e,n),S=i.prevZ,B=i.nextZ;for(;S&&S.z>=d&&B&&B.z<=C;){if(S.x>=p&&S.x<=A&&S.y>=_&&S.y<=m&&S!==s&&S!==a&&ps(o,u,l,f,c,h,S.x,S.y)&&ge(S.prev,S,S.next)>=0||(S=S.prevZ,B.x>=p&&B.x<=A&&B.y>=_&&B.y<=m&&B!==s&&B!==a&&ps(o,u,l,f,c,h,B.x,B.y)&&ge(B.prev,B,B.next)>=0))return!1;B=B.nextZ}for(;S&&S.z>=d;){if(S.x>=p&&S.x<=A&&S.y>=_&&S.y<=m&&S!==s&&S!==a&&ps(o,u,l,f,c,h,S.x,S.y)&&ge(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;B&&B.z<=C;){if(B.x>=p&&B.x<=A&&B.y>=_&&B.y<=m&&B!==s&&B!==a&&ps(o,u,l,f,c,h,B.x,B.y)&&ge(B.prev,B,B.next)>=0)return!1;B=B.nextZ}return!0}function Ld(i,t){let e=i;do{let n=e.prev,s=e.next.next;!Yi(n,s)&&Nh(n,e,e.next,s)&&Os(n,s)&&Os(s,n)&&(t.push(n.i,e.i,s.i),Hs(e),Hs(e.next),e=i=s),e=e.next}while(e!==i);return fi(e)}function Pd(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Jd(a,o)){let l=Oh(a,o);a=fi(a,a.next),l=fi(l,l.next),Ns(a,t,e,n,s,r,0),Ns(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Nd(i,t,e,n){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=Lh(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Kd(c))}s.sort(Od);for(let r=0;r<s.length;r++)e=Hd(s[r],e);return e}function Od(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function Hd(i,t){let e=Ud(i,t);if(!e)return t;let n=Oh(e,i);return fi(n,n.next),fi(e,e.next)}function Ud(i,t){let e=t,n=i.x,s=i.y,r=-1/0,a;if(Yi(i,e))return e;do{if(Yi(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let f=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=n&&f>r&&(r=f,a=e.x<e.next.x?e:e.next,f===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,u=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Ph(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){let f=Math.abs(s-e.y)/(n-e.x);Os(e,i)&&(f<u||f===u&&(e.x>a.x||e.x===a.x&&kd(a,e)))&&(a=e,u=f)}e=e.next}while(e!==o);return a}function kd(i,t){return ge(i.prev,i,t.prev)<0&&ge(t.next,i,i.next)<0}function Vd(i,t,e,n){let s=i;do s.z===0&&(s.z=il(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,zd(s)}function zd(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function il(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Kd(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Ph(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function ps(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&Ph(i,t,e,n,s,r,a,o)}function Jd(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Wd(i,t)&&(Os(i,t)&&Os(t,i)&&Xd(i,t)&&(ge(i.prev,i,t.prev)||ge(i,t.prev,t))||Yi(i,t)&&ge(i.prev,i,i.next)>0&&ge(t.prev,t,t.next)>0)}function ge(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Yi(i,t){return i.x===t.x&&i.y===t.y}function Nh(i,t,e,n){let s=Tr(ge(i,t,e)),r=Tr(ge(i,t,n)),a=Tr(ge(e,n,i)),o=Tr(ge(e,n,t));return!!(s!==r&&a!==o||s===0&&Ir(i,e,t)||r===0&&Ir(i,n,t)||a===0&&Ir(e,i,n)||o===0&&Ir(e,t,n))}function Ir(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Tr(i){return i>0?1:i<0?-1:0}function Wd(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Nh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Os(i,t){return ge(i.prev,i,i.next)<0?ge(i,t,i.next)>=0&&ge(i,i.prev,t)>=0:ge(i,t,i.prev)<0||ge(i,i.next,t)<0}function Xd(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Oh(i,t){let e=sl(i.i,i.x,i.y),n=sl(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function kc(i,t,e,n){let s=sl(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Hs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function sl(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Yd(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var rl=class{static triangulate(t,e,n=2){return wd(t,e,n)}},ui=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Vc(t),zc(n,t);let a=t.length;e.forEach(Vc);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,zc(n,e[l]);let o=rl.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Vc(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function zc(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Us=class i extends tn{constructor(t=new Xi([new ut(.5,.5),new ut(-.5,.5),new ut(-.5,-.5),new ut(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new Se(s,3)),this.setAttribute("uv",new Se(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1,h=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,_=e.bevelSize!==void 0?e.bevelSize:p-.1,A=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,d=e.extrudePath,C=e.UVGenerator!==void 0?e.UVGenerator:qd,S,B=!1,y,M,b,E;if(d){S=d.getSpacedPoints(u),B=!0,h=!1;let q=d.isCatmullRomCurve3?d.closed:!1;y=d.computeFrenetFrames(u,q),M=new R,b=new R,E=new R}h||(m=0,p=0,_=0,A=0);let D=o.extractPoints(c),T=D.shape,F=D.holes;if(!ui.isClockWise(T)){T=T.reverse();for(let q=0,tt=F.length;q<tt;q++){let ot=F[q];ui.isClockWise(ot)&&(F[q]=ot.reverse())}}function V(q){let ot=10000000000000001e-36,st=q[0];for(let ct=1;ct<=q.length;ct++){let Ct=ct%q.length,Tt=q[Ct],It=Tt.x-st.x,Ut=Tt.y-st.y,I=It*It+Ut*Ut,jt=Math.max(Math.abs(Tt.x),Math.abs(Tt.y),Math.abs(st.x),Math.abs(st.y)),Wt=ot*jt*jt;if(I<=Wt){q.splice(Ct,1),ct--;continue}st=Tt}}V(T),F.forEach(V);let w=F.length,H=T;for(let q=0;q<w;q++){let tt=F[q];T=T.concat(tt)}function U(q,tt,ot){return tt||Kt("ExtrudeGeometry: vec does not exist"),q.clone().addScaledVector(tt,ot)}let k=T.length;function it(q,tt,ot){let st,ct,Ct,Tt=q.x-tt.x,It=q.y-tt.y,Ut=ot.x-q.x,I=ot.y-q.y,jt=Tt*Tt+It*It,Wt=Tt*I-It*Ut;if(Math.abs(Wt)>Number.EPSILON){let v=Math.sqrt(jt),g=Math.sqrt(Ut*Ut+I*I),N=tt.x-It/v,z=tt.y+Tt/v,Q=ot.x-I/g,ht=ot.y+Ut/g,pt=((Q-N)*I-(ht-z)*Ut)/(Tt*I-It*Ut);st=N+Tt*pt-q.x,ct=z+It*pt-q.y;let j=st*st+ct*ct;if(j<=2)return new ut(st,ct);Ct=Math.sqrt(j/2)}else{let v=!1;Tt>Number.EPSILON?Ut>Number.EPSILON&&(v=!0):Tt<-Number.EPSILON?Ut<-Number.EPSILON&&(v=!0):Math.sign(It)===Math.sign(I)&&(v=!0),v?(st=-It,ct=Tt,Ct=Math.sqrt(jt)):(st=Tt,ct=It,Ct=Math.sqrt(jt/2))}return new ut(st/Ct,ct/Ct)}let X=[];for(let q=0,tt=H.length,ot=tt-1,st=q+1;q<tt;q++,ot++,st++)ot===tt&&(ot=0),st===tt&&(st=0),X[q]=it(H[q],H[ot],H[st]);let $=[],L,lt=X.concat();for(let q=0,tt=w;q<tt;q++){let ot=F[q];L=[];for(let st=0,ct=ot.length,Ct=ct-1,Tt=st+1;st<ct;st++,Ct++,Tt++)Ct===ct&&(Ct=0),Tt===ct&&(Tt=0),L[st]=it(ot[st],ot[Ct],ot[Tt]);$.push(L),lt=lt.concat(L)}let at;if(m===0)at=ui.triangulateShape(H,F);else{let q=[],tt=[];for(let ot=0;ot<m;ot++){let st=ot/m,ct=p*Math.cos(st*Math.PI/2),Ct=_*Math.sin(st*Math.PI/2)+A;for(let Tt=0,It=H.length;Tt<It;Tt++){let Ut=U(H[Tt],X[Tt],Ct);ft(Ut.x,Ut.y,-ct),st===0&&q.push(Ut)}for(let Tt=0,It=w;Tt<It;Tt++){let Ut=F[Tt];L=$[Tt];let I=[];for(let jt=0,Wt=Ut.length;jt<Wt;jt++){let v=U(Ut[jt],L[jt],Ct);ft(v.x,v.y,-ct),st===0&&I.push(v)}st===0&&tt.push(I)}}at=ui.triangulateShape(q,tt)}let Gt=at.length,Ot=_+A;for(let q=0;q<k;q++){let tt=h?U(T[q],lt[q],Ot):T[q];B?(b.copy(y.normals[0]).multiplyScalar(tt.x),M.copy(y.binormals[0]).multiplyScalar(tt.y),E.copy(S[0]).add(b).add(M),ft(E.x,E.y,E.z)):ft(tt.x,tt.y,0)}for(let q=1;q<=u;q++)for(let tt=0;tt<k;tt++){let ot=h?U(T[tt],lt[tt],Ot):T[tt];B?(b.copy(y.normals[q]).multiplyScalar(ot.x),M.copy(y.binormals[q]).multiplyScalar(ot.y),E.copy(S[q]).add(b).add(M),ft(E.x,E.y,E.z)):ft(ot.x,ot.y,f/u*q)}for(let q=m-1;q>=0;q--){let tt=q/m,ot=p*Math.cos(tt*Math.PI/2),st=_*Math.sin(tt*Math.PI/2)+A;for(let ct=0,Ct=H.length;ct<Ct;ct++){let Tt=U(H[ct],X[ct],st);ft(Tt.x,Tt.y,f+ot)}for(let ct=0,Ct=F.length;ct<Ct;ct++){let Tt=F[ct];L=$[ct];for(let It=0,Ut=Tt.length;It<Ut;It++){let I=U(Tt[It],L[It],st);B?ft(I.x,I.y+S[u-1].y,S[u-1].x+ot):ft(I.x,I.y,f+ot)}}}Jt(),Y();function Jt(){let q=s.length/3;if(h){let tt=0,ot=k*tt;for(let st=0;st<Gt;st++){let ct=at[st];vt(ct[2]+ot,ct[1]+ot,ct[0]+ot)}tt=u+m*2,ot=k*tt;for(let st=0;st<Gt;st++){let ct=at[st];vt(ct[0]+ot,ct[1]+ot,ct[2]+ot)}}else{for(let tt=0;tt<Gt;tt++){let ot=at[tt];vt(ot[2],ot[1],ot[0])}for(let tt=0;tt<Gt;tt++){let ot=at[tt];vt(ot[0]+k*u,ot[1]+k*u,ot[2]+k*u)}}n.addGroup(q,s.length/3-q,0)}function Y(){let q=s.length/3,tt=0;Z(H,tt),tt+=H.length;for(let ot=0,st=F.length;ot<st;ot++){let ct=F[ot];Z(ct,tt),tt+=ct.length}n.addGroup(q,s.length/3-q,1)}function Z(q,tt){let ot=q.length;for(;--ot>=0;){let st=ot,ct=ot-1;ct<0&&(ct=q.length-1);for(let Ct=0,Tt=u+m*2;Ct<Tt;Ct++){let It=k*Ct,Ut=k*(Ct+1),I=tt+st+It,jt=tt+ct+It,Wt=tt+ct+Ut,v=tt+st+Ut;dt(I,jt,Wt,v)}}}function ft(q,tt,ot){l.push(q),l.push(tt),l.push(ot)}function vt(q,tt,ot){Dt(q),Dt(tt),Dt(ot);let st=s.length/3,ct=C.generateTopUV(n,s,st-3,st-2,st-1);zt(ct[0]),zt(ct[1]),zt(ct[2])}function dt(q,tt,ot,st){Dt(q),Dt(tt),Dt(st),Dt(tt),Dt(ot),Dt(st);let ct=s.length/3,Ct=C.generateSideWallUV(n,s,ct-6,ct-3,ct-2,ct-1);zt(Ct[0]),zt(Ct[1]),zt(Ct[3]),zt(Ct[1]),zt(Ct[2]),zt(Ct[3])}function Dt(q){s.push(l[q*3+0]),s.push(l[q*3+1]),s.push(l[q*3+2])}function zt(q){r.push(q.x),r.push(q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Qd(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new nl[s.type]().fromJSON(s)),new i(n,t.options)}},qd={generateTopUV:function(i,t,e,n,s){let r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],u=t[s*3+1];return[new ut(r,a),new ut(o,l),new ut(c,u)]},generateSideWallUV:function(i,t,e,n,s,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],u=t[n*3+1],f=t[n*3+2],h=t[s*3],p=t[s*3+1],_=t[s*3+2],A=t[r*3],m=t[r*3+1],d=t[r*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new ut(a,1-l),new ut(c,1-f),new ut(h,1-_),new ut(A,1-d)]:[new ut(o,1-l),new ut(u,1-f),new ut(p,1-_),new ut(m,1-d)]}};function Qd(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Wn=class i extends tn{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,f=t/o,h=e/l,p=[],_=[],A=[],m=[];for(let d=0;d<u;d++){let C=d*h-a;for(let S=0;S<c;S++){let B=S*f-r;_.push(B,-C,0),A.push(0,0,1),m.push(S/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let C=0;C<o;C++){let S=C+c*d,B=C+c*(d+1),y=C+1+c*(d+1),M=C+1+c*d;p.push(S,B,M),p.push(B,y,M)}this.setIndex(p),this.setAttribute("position",new Se(_,3)),this.setAttribute("normal",new Se(A,3)),this.setAttribute("uv",new Se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};function _i(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Kc(s))s.isRenderTargetTexture?(Vt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Kc(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Re(i){let t={};for(let e=0;e<i.length;e++){let n=_i(i[e]);for(let s in n)t[s]=n[s]}return t}function Kc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Zd(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Ll(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}var Hh={clone:_i,merge:Re},jd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$d=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,qe=class extends zn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jd,this.fragmentShader=$d,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=_i(t.uniforms),this.uniformsGroups=Zd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new te().setHex(s.value);break;case"v2":this.uniforms[n].value=new ut().fromArray(s.value);break;case"v3":this.uniforms[n].value=new R().fromArray(s.value);break;case"v4":this.uniforms[n].value=new me().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Xt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new pe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},na=class extends qe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Fn=class extends zn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ro,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=Ca,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},ia=class extends zn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},sa=class extends zn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function wi(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Qo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Xn=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ra=class extends Xn{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:$o,endingEnd:$o}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case tl:r=t,o=2*e-n;break;case el:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case tl:a=t,l=2*n-e;break;case el:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,u=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,p=this._weightNext,_=(n-e)/(s-e),A=_*_,m=A*_,d=-h*m+2*h*A-h*_,C=(1+h)*m+(-1.5-2*h)*A+(-.5+h)*_+1,S=(-1-p)*m+(1.5+p)*A+.5*_,B=p*m-p*A;for(let y=0;y!==o;++y)r[y]=d*a[u+y]+C*a[c+y]+S*a[l+y]+B*a[f+y];return r}},aa=class extends Xn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=(n-e)/(s-e),f=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*f+a[l+h]*u;return r}},oa=class extends Xn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},la=class extends Xn{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this.inTangents,f=this.outTangents;if(!u||!f){let _=(n-e)/(s-e),A=1-_;for(let m=0;m!==o;++m)r[m]=a[c+m]*A+a[l+m]*_;return r}let h=o*2,p=t-1;for(let _=0;_!==o;++_){let A=a[c+_],m=a[l+_],d=p*h+_*2,C=f[d],S=f[d+1],B=t*h+_*2,y=u[B],M=u[B+1],b=ef(n,e,C,y,s);r[_]=Uh(b,A,S,M,m)}return r}};function Uh(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function tf(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function ef(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=Uh(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let l=tf(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Qe=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=wi(e,this.TimeBufferType),this.values=wi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:wi(t.times,Array),values:wi(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),Qo(t.settings)&&(n.settings={inTangents:wi(t.settings.inTangents,Array),outTangents:wi(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new oa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new aa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ra(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new la(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Cs:e=this.InterpolantFactoryMethodDiscrete;break;case Kr:e=this.InterpolantFactoryMethodLinear;break;case Rr:e=this.InterpolantFactoryMethodSmooth;break;case jo:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Vt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Cs;case this.InterpolantFactoryMethodLinear:return Kr;case this.InterpolantFactoryMethodSmooth:return Rr;case this.InterpolantFactoryMethodBezier:return jo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;Qo(this.settings)&&(Jc(this.settings.inTangents,t),Jc(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Kt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Kt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Kt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Kt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&Ku(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Kt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Rr,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],u=t[o+1];if(c!==u&&(o!==1||c!==t[0]))if(s)l=!0;else{let f=o*n,h=f-n,p=f+n;for(let _=0;_!==n;++_){let A=e[f+_];if(A!==e[h+_]||A!==e[p+_]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let f=o*n,h=a*n;for(let p=0;p!==n;++p)e[h+p]=e[f+p]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,Qo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Jc(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}Qe.prototype.ValueTypeName="";Qe.prototype.TimeBufferType=Float32Array;Qe.prototype.ValueBufferType=Float32Array;Qe.prototype.DefaultInterpolation=Kr;var Yn=class extends Qe{constructor(t,e,n){super(t,e,n)}};Yn.prototype.ValueTypeName="bool";Yn.prototype.ValueBufferType=Array;Yn.prototype.DefaultInterpolation=Cs;Yn.prototype.InterpolantFactoryMethodLinear=void 0;Yn.prototype.InterpolantFactoryMethodSmooth=void 0;var ca=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};ca.prototype.ValueTypeName="color";var ha=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};ha.prototype.ValueTypeName="number";var ua=class extends Xn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let u=c+o;c!==u;c+=4)Xe.slerpFlat(r,0,a,c-o,a,c,l);return r}},ks=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new ua(this.times,this.values,this.getValueSize(),t)}};ks.prototype.ValueTypeName="quaternion";ks.prototype.InterpolantFactoryMethodSmooth=void 0;var qn=class extends Qe{constructor(t,e,n){super(t,e,n)}};qn.prototype.ValueTypeName="string";qn.prototype.ValueBufferType=Array;qn.prototype.DefaultInterpolation=Cs;qn.prototype.InterpolantFactoryMethodLinear=void 0;qn.prototype.InterpolantFactoryMethodSmooth=void 0;var da=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};da.prototype.ValueTypeName="vector";var fa=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){let f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){let p=c[f],_=c[f+1];if(p.global&&(p.lastIndex=0),p.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},kh=new fa,pa=class{constructor(t){this.manager=t!==void 0?t:kh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};pa.DEFAULT_MATERIAL_NAME="__DEFAULT";var qi=class extends we{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new te(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Vs=class extends qi{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.groundColor=new te(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Zo=new pe,Wc=new R,Xc=new R,ma=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.mapType=ke,this.map=null,this.mapPass=null,this.matrix=new pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ji,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Wc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Wc),Xc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Xc),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Zo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Zo,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===Oi||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Zo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Fr=new R,wr=new Xe,gn=new R,zs=class extends we{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe,this.coordinateSystem=on,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Fr,wr,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fr,wr,gn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Fr,wr,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fr,wr,gn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Un=new R,Yc=new ut,qc=new ut,Fe=class extends zs{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ui*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(ms*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ui*2*Math.atan(Math.tan(ms*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Un.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Un.x,Un.y).multiplyScalar(-t/Un.z),Un.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Un.x,Un.y).multiplyScalar(-t/Un.z)}getViewSize(t,e){return this.getViewBounds(t,Yc,qc),e.subVectors(qc,Yc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(ms*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Qi=class extends zs{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},al=class extends ma{constructor(){super(new Qi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ks=class extends qi{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.shadow=new al}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},Js=class extends qi{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ri=-90,Gi=1,ga=class extends we{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Fe(Ri,Gi,t,e);s.layers=this.layers,this.add(s);let r=new Fe(Ri,Gi,t,e);r.layers=this.layers,this.add(r);let a=new Fe(Ri,Gi,t,e);a.layers=this.layers,this.add(a);let o=new Fe(Ri,Gi,t,e);o.layers=this.layers,this.add(o);let l=new Fe(Ri,Gi,t,e);l.layers=this.layers,this.add(l);let c=new Fe(Ri,Gi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===on)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Oi)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let A=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=A,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,h,p),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},_a=class extends Fe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Pl="\\[\\]\\.:\\/",nf=new RegExp("["+Pl+"]","g"),Nl="[^"+Pl+"]",sf="[^"+Pl.replace("\\.","")+"]",rf=/((?:WC+[\/:])*)/.source.replace("WC",Nl),af=/(WCOD+)?/.source.replace("WCOD",sf),of=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Nl),lf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Nl),cf=new RegExp("^"+rf+af+of+lf+"$"),hf=["material","materials","bones","map"],ol=class{constructor(t,e,n){let s=n||fe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},fe=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(nf,"")}static parseTrackName(t){let e=cf.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);hf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Vt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Kt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Kt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Kt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Kt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Kt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Kt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Kt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Kt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Kt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Kt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};fe.Composite=ol;fe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};fe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};fe.prototype.GetterByBindingType=[fe.prototype._getValue_direct,fe.prototype._getValue_array,fe.prototype._getValue_arrayElement,fe.prototype._getValue_toArray];fe.prototype.SetterByBindingTypeAndVersioning=[[fe.prototype._setValue_direct,fe.prototype._setValue_direct_setNeedsUpdate,fe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[fe.prototype._setValue_array,fe.prototype._setValue_array_setNeedsUpdate,fe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[fe.prototype._setValue_arrayElement,fe.prototype._setValue_arrayElement_setNeedsUpdate,fe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[fe.prototype._setValue_fromArray,fe.prototype._setValue_fromArray_setNeedsUpdate,fe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var S0=new Float32Array(1);var Zi=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var zl=class zl{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};zl.prototype.isMatrix2=!0;var ll=zl;var Ws=class extends ln{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Ol(i,t,e,n){let s=uf(n);switch(e){case Dl:return i*t;case Il:return i*t/s.components*s.byteLength;case Sa:return i*t/s.components*s.byteLength;case ni:return i*t*2/s.components*s.byteLength;case Da:return i*t*2/s.components*s.byteLength;case bl:return i*t*3/s.components*s.byteLength;case en:return i*t*4/s.components*s.byteLength;case ba:return i*t*4/s.components*s.byteLength;case Qs:case Zs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case js:case $s:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ta:case wa:return Math.max(i,16)*Math.max(t,8)/4;case Ia:case Fa:return Math.max(i,8)*Math.max(t,8)/2;case Ra:case Ga:case Pa:case Na:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case La:case tr:case Oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ha:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ua:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ka:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Va:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case za:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ka:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ja:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Wa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Xa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case qa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Za:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ja:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case $a:case to:case eo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case no:case io:return Math.ceil(i/4)*Math.ceil(t/4)*8;case er:case so:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function uf(i){switch(i){case ke:case Ml:return{byteLength:1,components:1};case ts:case yl:case dn:return{byteLength:2,components:1};case ya:case va:return{byteLength:2,components:4};case hn:case Ma:case un:return{byteLength:4,components:1};case vl:case Sl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window!="undefined"&&(window.__THREE__?Vt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function cu(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function ff(i){let t=new WeakMap;function e(o,l){let c=o.array,u=o.usage,f=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array!="undefined"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){let u=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,u);else{f.sort((p,_)=>p.start-_.start);let h=0;for(let p=1;p<f.length;p++){let _=f[h],A=f[p];A.start<=_.start+_.count+1?_.count=Math.max(_.count,A.start+A.count-_.start):(++h,f[h]=A)}f.length=h+1;for(let p=0,_=f.length;p<_;p++){let A=f[p];i.bufferSubData(c,A.start*u.BYTES_PER_ELEMENT,u,A.start,A.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var pf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mf=`#ifdef USE_ALPHAHASH
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
#endif`,gf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_f=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ef=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Cf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xf=`#ifdef USE_AOMAP
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
#endif`,Bf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Af=`#ifdef USE_BATCHING
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
#endif`,Mf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Df=`#ifdef USE_IRIDESCENCE
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
#endif`,bf=`#ifdef USE_BUMPMAP
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
#endif`,If=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Tf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ff=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Gf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Lf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Pf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Nf=`#define PI 3.141592653589793
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
} // validated`,Of=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Hf=`vec3 transformedNormal = objectNormal;
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
#endif`,Uf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Kf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Jf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Wf=`#ifdef USE_ENVMAP
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
#endif`,Xf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Yf=`#ifdef USE_ENVMAP
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
#endif`,qf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qf=`#ifdef USE_ENVMAP
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
#endif`,Zf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$f=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ep=`#ifdef USE_GRADIENTMAP
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
}`,np=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ip=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ap=`#ifdef USE_ENVMAP
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
#endif`,op=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,up=`PhysicalMaterial material;
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
#endif`,dp=`uniform sampler2D dfgLUT;
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
}`,fp=`
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
#endif`,pp=`#if defined( RE_IndirectDiffuse )
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
#endif`,mp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,_p=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ep=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Bp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ap=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,yp=`#if defined( USE_POINTS_UV )
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
#endif`,vp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Sp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ip=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Tp=`#ifdef USE_MORPHTARGETS
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
#endif`,Fp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Rp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Gp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Np=`#ifdef USE_NORMALMAP
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
#endif`,Op=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Up=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Kp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,$p=`float getShadowMask() {
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
}`,tm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,em=`#ifdef USE_SKINNING
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
#endif`,nm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,im=`#ifdef USE_SKINNING
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
#endif`,sm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,am=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,om=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,lm=`#ifdef USE_TRANSMISSION
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
#endif`,cm=`#ifdef USE_TRANSMISSION
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
#endif`,hm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,pm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mm=`uniform sampler2D t2D;
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
}`,gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_m=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xm=`#include <common>
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
}`,Bm=`#if DEPTH_PACKING == 3200
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
}`,Am=`#define DISTANCE
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
}`,Mm=`#define DISTANCE
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
}`,ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sm=`uniform float scale;
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
}`,Dm=`uniform vec3 diffuse;
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
}`,bm=`#include <common>
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
}`,Im=`uniform vec3 diffuse;
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
}`,Tm=`#define LAMBERT
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
}`,Fm=`#define LAMBERT
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
}`,wm=`#define MATCAP
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
}`,Rm=`#define MATCAP
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
}`,Gm=`#define NORMAL
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
}`,Lm=`#define NORMAL
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
}`,Pm=`#define PHONG
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
}`,Nm=`#define PHONG
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
}`,Om=`#define STANDARD
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
}`,Hm=`#define STANDARD
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
}`,Um=`#define TOON
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
}`,km=`#define TOON
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
}`,Vm=`uniform float size;
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
}`,zm=`uniform vec3 diffuse;
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
}`,Km=`#include <common>
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
}`,Jm=`uniform vec3 color;
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
}`,Wm=`uniform float rotation;
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
}`,Xm=`uniform vec3 diffuse;
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
}`,Zt={alphahash_fragment:pf,alphahash_pars_fragment:mf,alphamap_fragment:gf,alphamap_pars_fragment:_f,alphatest_fragment:Ef,alphatest_pars_fragment:Cf,aomap_fragment:xf,aomap_pars_fragment:Bf,batching_pars_vertex:Af,batching_vertex:Mf,begin_vertex:yf,beginnormal_vertex:vf,bsdfs:Sf,iridescence_fragment:Df,bumpmap_pars_fragment:bf,clipping_planes_fragment:If,clipping_planes_pars_fragment:Tf,clipping_planes_pars_vertex:Ff,clipping_planes_vertex:wf,color_fragment:Rf,color_pars_fragment:Gf,color_pars_vertex:Lf,color_vertex:Pf,common:Nf,cube_uv_reflection_fragment:Of,defaultnormal_vertex:Hf,displacementmap_pars_vertex:Uf,displacementmap_vertex:kf,emissivemap_fragment:Vf,emissivemap_pars_fragment:zf,colorspace_fragment:Kf,colorspace_pars_fragment:Jf,envmap_fragment:Wf,envmap_common_pars_fragment:Xf,envmap_pars_fragment:Yf,envmap_pars_vertex:qf,envmap_physical_pars_fragment:ap,envmap_vertex:Qf,fog_vertex:Zf,fog_pars_vertex:jf,fog_fragment:$f,fog_pars_fragment:tp,gradientmap_pars_fragment:ep,lightmap_pars_fragment:np,lights_lambert_fragment:ip,lights_lambert_pars_fragment:sp,lights_pars_begin:rp,lights_toon_fragment:op,lights_toon_pars_fragment:lp,lights_phong_fragment:cp,lights_phong_pars_fragment:hp,lights_physical_fragment:up,lights_physical_pars_fragment:dp,lights_fragment_begin:fp,lights_fragment_maps:pp,lights_fragment_end:mp,lightprobes_pars_fragment:gp,logdepthbuf_fragment:_p,logdepthbuf_pars_fragment:Ep,logdepthbuf_pars_vertex:Cp,logdepthbuf_vertex:xp,map_fragment:Bp,map_pars_fragment:Ap,map_particle_fragment:Mp,map_particle_pars_fragment:yp,metalnessmap_fragment:vp,metalnessmap_pars_fragment:Sp,morphinstance_vertex:Dp,morphcolor_vertex:bp,morphnormal_vertex:Ip,morphtarget_pars_vertex:Tp,morphtarget_vertex:Fp,normal_fragment_begin:wp,normal_fragment_maps:Rp,normal_pars_fragment:Gp,normal_pars_vertex:Lp,normal_vertex:Pp,normalmap_pars_fragment:Np,clearcoat_normal_fragment_begin:Op,clearcoat_normal_fragment_maps:Hp,clearcoat_pars_fragment:Up,iridescence_pars_fragment:kp,opaque_fragment:Vp,packing:zp,premultiplied_alpha_fragment:Kp,project_vertex:Jp,dithering_fragment:Wp,dithering_pars_fragment:Xp,roughnessmap_fragment:Yp,roughnessmap_pars_fragment:qp,shadowmap_pars_fragment:Qp,shadowmap_pars_vertex:Zp,shadowmap_vertex:jp,shadowmask_pars_fragment:$p,skinbase_vertex:tm,skinning_pars_vertex:em,skinning_vertex:nm,skinnormal_vertex:im,specularmap_fragment:sm,specularmap_pars_fragment:rm,tonemapping_fragment:am,tonemapping_pars_fragment:om,transmission_fragment:lm,transmission_pars_fragment:cm,uv_pars_fragment:hm,uv_pars_vertex:um,uv_vertex:dm,worldpos_vertex:fm,background_vert:pm,background_frag:mm,backgroundCube_vert:gm,backgroundCube_frag:_m,cube_vert:Em,cube_frag:Cm,depth_vert:xm,depth_frag:Bm,distance_vert:Am,distance_frag:Mm,equirect_vert:ym,equirect_frag:vm,linedashed_vert:Sm,linedashed_frag:Dm,meshbasic_vert:bm,meshbasic_frag:Im,meshlambert_vert:Tm,meshlambert_frag:Fm,meshmatcap_vert:wm,meshmatcap_frag:Rm,meshnormal_vert:Gm,meshnormal_frag:Lm,meshphong_vert:Pm,meshphong_frag:Nm,meshphysical_vert:Om,meshphysical_frag:Hm,meshtoon_vert:Um,meshtoon_frag:km,points_vert:Vm,points_frag:zm,shadow_vert:Km,shadow_frag:Jm,sprite_vert:Wm,sprite_frag:Xm},Bt={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},Mn={basic:{uniforms:Re([Bt.common,Bt.specularmap,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:Re([Bt.common,Bt.specularmap,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.fog,Bt.lights,{emissive:{value:new te(0)},envMapIntensity:{value:1}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:Re([Bt.common,Bt.specularmap,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.fog,Bt.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:Re([Bt.common,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.roughnessmap,Bt.metalnessmap,Bt.fog,Bt.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:Re([Bt.common,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.gradientmap,Bt.fog,Bt.lights,{emissive:{value:new te(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:Re([Bt.common,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:Re([Bt.points,Bt.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:Re([Bt.common,Bt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:Re([Bt.common,Bt.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:Re([Bt.common,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:Re([Bt.sprite,Bt.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distance:{uniforms:Re([Bt.common,Bt.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distance_vert,fragmentShader:Zt.distance_frag},shadow:{uniforms:Re([Bt.lights,Bt.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};Mn.physical={uniforms:Re([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};var lo={r:0,b:0,g:0},Ym=new pe,hu=new Xt;hu.set(-1,0,0,0,1,0,0,0,1);function qm(i,t,e,n,s,r){let a=new te(0),o=s===!0?0:1,l,c,u=null,f=0,h=null;function p(C){let S=C.isScene===!0?C.background:null;if(S&&S.isTexture){let B=C.backgroundBlurriness>0;S=t.get(S,B)}return S}function _(C){let S=!1,B=p(C);B===null?m(a,o):B&&B.isColor&&(m(B,1),S=!0);let y=i.xr.getEnvironmentBlendMode();y==="additive"?e.buffers.color.setClear(0,0,0,1,r):y==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||S)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function A(C,S){let B=p(S);B&&(B.isCubeTexture||B.mapping===Ys)?(c===void 0&&(c=new xe(new Jn(1,1,1),new qe({name:"BackgroundCubeMaterial",uniforms:_i(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:Pe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,M,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=B,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Ym.makeRotationFromEuler(S.backgroundRotation)).transpose(),B.isCubeTexture&&B.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(hu),c.material.toneMapped=ee.getTransfer(B.colorSpace)!==re,(u!==B||f!==B.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=B,f=B.version,h=i.toneMapping),c.layers.enableAll(),C.unshift(c,c.geometry,c.material,0,0,null)):B&&B.isTexture&&(l===void 0&&(l=new xe(new Wn(2,2),new qe({name:"BackgroundMaterial",uniforms:_i(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=B,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=ee.getTransfer(B.colorSpace)!==re,B.matrixAutoUpdate===!0&&B.updateMatrix(),l.material.uniforms.uvTransform.value.copy(B.matrix),(u!==B||f!==B.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=B,f=B.version,h=i.toneMapping),l.layers.enableAll(),C.unshift(l,l.geometry,l.material,0,0,null))}function m(C,S){C.getRGB(lo,Ll(i)),e.buffers.color.setClear(lo.r,lo.g,lo.b,S,r)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(C,S=1){a.set(C),o=S,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(C){o=C,m(a,o)},render:_,addToRenderList:A,dispose:d}}function Qm(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,a=!1;function o(F,O,V,w,H){let U=!1,k=f(F,w,V,O);r!==k&&(r=k,c(r.object)),U=p(F,w,V,H),U&&_(F,w,V,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),(U||a)&&(a=!1,B(F,O,V,w),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return i.createVertexArray()}function c(F){return i.bindVertexArray(F)}function u(F){return i.deleteVertexArray(F)}function f(F,O,V,w){let H=w.wireframe===!0,U=n[O.id];U===void 0&&(U={},n[O.id]=U);let k=F.isInstancedMesh===!0?F.id:0,it=U[k];it===void 0&&(it={},U[k]=it);let X=it[V.id];X===void 0&&(X={},it[V.id]=X);let $=X[H];return $===void 0&&($=h(l()),X[H]=$),$}function h(F){let O=[],V=[],w=[];for(let H=0;H<e;H++)O[H]=0,V[H]=0,w[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:V,attributeDivisors:w,object:F,attributes:{},index:null}}function p(F,O,V,w){let H=r.attributes,U=O.attributes,k=0,it=V.getAttributes();for(let X in it)if(it[X].location>=0){let L=H[X],lt=U[X];if(lt===void 0&&(X==="instanceMatrix"&&F.instanceMatrix&&(lt=F.instanceMatrix),X==="instanceColor"&&F.instanceColor&&(lt=F.instanceColor)),L===void 0||L.attribute!==lt||lt&&L.data!==lt.data)return!0;k++}return r.attributesNum!==k||r.index!==w}function _(F,O,V,w){let H={},U=O.attributes,k=0,it=V.getAttributes();for(let X in it)if(it[X].location>=0){let L=U[X];L===void 0&&(X==="instanceMatrix"&&F.instanceMatrix&&(L=F.instanceMatrix),X==="instanceColor"&&F.instanceColor&&(L=F.instanceColor));let lt={};lt.attribute=L,L&&L.data&&(lt.data=L.data),H[X]=lt,k++}r.attributes=H,r.attributesNum=k,r.index=w}function A(){let F=r.newAttributes;for(let O=0,V=F.length;O<V;O++)F[O]=0}function m(F){d(F,0)}function d(F,O){let V=r.newAttributes,w=r.enabledAttributes,H=r.attributeDivisors;V[F]=1,w[F]===0&&(i.enableVertexAttribArray(F),w[F]=1),H[F]!==O&&(i.vertexAttribDivisor(F,O),H[F]=O)}function C(){let F=r.newAttributes,O=r.enabledAttributes;for(let V=0,w=O.length;V<w;V++)O[V]!==F[V]&&(i.disableVertexAttribArray(V),O[V]=0)}function S(F,O,V,w,H,U,k){k===!0?i.vertexAttribIPointer(F,O,V,H,U):i.vertexAttribPointer(F,O,V,w,H,U)}function B(F,O,V,w){A();let H=w.attributes,U=V.getAttributes(),k=O.defaultAttributeValues;for(let it in U){let X=U[it];if(X.location>=0){let $=H[it];if($===void 0&&(it==="instanceMatrix"&&F.instanceMatrix&&($=F.instanceMatrix),it==="instanceColor"&&F.instanceColor&&($=F.instanceColor)),$!==void 0){let L=$.normalized,lt=$.itemSize,at=t.get($);if(at===void 0)continue;let Gt=at.buffer,Ot=at.type,Jt=at.bytesPerElement,Y=Ot===i.INT||Ot===i.UNSIGNED_INT||$.gpuType===Ma;if($.isInterleavedBufferAttribute){let Z=$.data,ft=Z.stride,vt=$.offset;if(Z.isInstancedInterleavedBuffer){for(let dt=0;dt<X.locationSize;dt++)d(X.location+dt,Z.meshPerAttribute);F.isInstancedMesh!==!0&&w._maxInstanceCount===void 0&&(w._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let dt=0;dt<X.locationSize;dt++)m(X.location+dt);i.bindBuffer(i.ARRAY_BUFFER,Gt);for(let dt=0;dt<X.locationSize;dt++)S(X.location+dt,lt/X.locationSize,Ot,L,ft*Jt,(vt+lt/X.locationSize*dt)*Jt,Y)}else{if($.isInstancedBufferAttribute){for(let Z=0;Z<X.locationSize;Z++)d(X.location+Z,$.meshPerAttribute);F.isInstancedMesh!==!0&&w._maxInstanceCount===void 0&&(w._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Z=0;Z<X.locationSize;Z++)m(X.location+Z);i.bindBuffer(i.ARRAY_BUFFER,Gt);for(let Z=0;Z<X.locationSize;Z++)S(X.location+Z,lt/X.locationSize,Ot,L,lt*Jt,lt/X.locationSize*Z*Jt,Y)}}else if(k!==void 0){let L=k[it];if(L!==void 0)switch(L.length){case 2:i.vertexAttrib2fv(X.location,L);break;case 3:i.vertexAttrib3fv(X.location,L);break;case 4:i.vertexAttrib4fv(X.location,L);break;default:i.vertexAttrib1fv(X.location,L)}}}}C()}function y(){D();for(let F in n){let O=n[F];for(let V in O){let w=O[V];for(let H in w){let U=w[H];for(let k in U)u(U[k].object),delete U[k];delete w[H]}}delete n[F]}}function M(F){if(n[F.id]===void 0)return;let O=n[F.id];for(let V in O){let w=O[V];for(let H in w){let U=w[H];for(let k in U)u(U[k].object),delete U[k];delete w[H]}}delete n[F.id]}function b(F){for(let O in n){let V=n[O];for(let w in V){let H=V[w];if(H[F.id]===void 0)continue;let U=H[F.id];for(let k in U)u(U[k].object),delete U[k];delete H[F.id]}}}function E(F){for(let O in n){let V=n[O],w=F.isInstancedMesh===!0?F.id:0,H=V[w];if(H!==void 0){for(let U in H){let k=H[U];for(let it in k)u(k[it].object),delete k[it];delete H[U]}delete V[w],Object.keys(V).length===0&&delete n[O]}}}function D(){T(),a=!0,r!==s&&(r=s,c(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:D,resetDefaultState:T,dispose:y,releaseStatesOfGeometry:M,releaseStatesOfObject:E,releaseStatesOfProgram:b,initAttributes:A,enableAttribute:m,disableUnusedAttributes:C}}function Zm(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),e.update(c,n,u))}function o(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let h=0;for(let p=0;p<u;p++)h+=c[p];e.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function jm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let b=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(b){return!(b!==en&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){let E=b===dn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==ke&&b!==un&&!E&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",u=l(c);u!==c&&(Vt("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Vt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),C=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),B=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=i.getParameter(i.MAX_SAMPLES),M=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:_,maxTextureSize:A,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:C,maxVaryings:S,maxFragmentUniforms:B,maxSamples:y,samples:M}}function $m(i){let t=this,e=null,n=0,s=!1,r=!1,a=new We,o=new Xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let p=f.length!==0||h||n!==0||s;return s=h,n=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,p){let _=f.clippingPlanes,A=f.clipIntersection,m=f.clipShadows,d=i.get(f);if(!s||_===null||_.length===0||r&&!m)r?u(null):c();else{let C=r?0:n,S=C*4,B=d.clippingState||null;l.value=B,B=u(_,h,S,p);for(let y=0;y!==S;++y)B[y]=e[y];d.clippingState=B,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=C}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,h,p,_){let A=f!==null?f.length:0,m=null;if(A!==0){if(m=l.value,_!==!0||m===null){let d=p+A*4,C=h.matrixWorldInverse;o.getNormalMatrix(C),(m===null||m.length<d)&&(m=new Float32Array(d));for(let S=0,B=p;S!==A;++S,B+=4)a.copy(f[S]).applyMatrix4(C,o),a.normal.toArray(m,B),m[B+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=A,t.numIntersection=0,m}}var is=4,tg=6,eg=20,ng=256,nr=new Qi,Vh=new te,Kl=null,Jl=0,Wl=0,Xl=!1,ig=new R,Ei=new R,ho=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=ig}=r;Kl=this._renderer.getRenderTarget(),Jl=this._renderer.getActiveCubeFace(),Wl=this._renderer.getActiveMipmapLevel(),Xl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Kl,Jl,Wl),this._renderer.xr.enabled=Xl,t.scissorTest=!1,ns(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===$n||t.mapping===mi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Kl=this._renderer.getRenderTarget(),Jl=this._renderer.getActiveCubeFace(),Wl=this._renderer.getActiveMipmapLevel(),Xl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:De,minFilter:De,generateMipmaps:!1,type:dn,format:en,colorSpace:xs,depthBuffer:!1},s=zh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zh(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=sg(r)),this._blurMaterial=ag(r,t,e),this._ggxMaterial=rg(r,t,e)}return s}_compileMaterial(t){let e=new xe(new tn,t);this._renderer.compile(e,nr)}_sceneToCubeUV(t,e,n,s,r){let l=new Fe(90,1,e,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,p=f.toneMapping;f.getClearColor(Vh),f.toneMapping=cn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new xe(new Jn,new bs({name:"PMREM.Background",side:Pe,depthWrite:!1,depthTest:!1})));let A=this._backgroundBox,m=A.material,d=!1,C=t.background;C?C.isColor&&(m.color.copy(C),t.background=null,d=!0):(m.color.copy(Vh),d=!0);for(let S=0;S<6;S++){let B=S%3;B===0?(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[S],r.y,r.z)):B===1?(l.up.set(0,0,c[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[S],r.z)):(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[S]));let y=this._cubeSize;ns(s,B*y,S>2?y:0,y,y),f.setRenderTarget(s),d&&f.render(A,l),f.render(t,l)}f.toneMapping=p,f.autoClear=h,t.background=C}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===$n||t.mapping===mi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kh());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;ns(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,nr)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=c*1.25,p=f*h,{_lodMax:_}=this,A=this._sizeLods[n],m=3*A*(n>_-is?n-_+is:0),d=4*(this._cubeSize-A);l.envMap.value=t.texture,l.roughness.value=p,l.mipInt.value=_-e,ns(r,m,d,3*A,2*A),s.setRenderTarget(r),s.render(o,nr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=_-n,ns(t,m,d,3*A,2*A),s.setRenderTarget(t),s.render(o,nr)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],f=3*u*(s>this._lodMax-is?s-this._lodMax+is:0),h=4*(this._cubeSize-u);ns(e,f,h,3*u,2*u),a.setRenderTarget(e),a.render(l,nr)}};function sg(i){let t=[],e=[],n=i,s=i-is+1+tg;for(let r=0;r<s;r++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,h=6,p=3,_=new Float32Array(p*h*f),A=new Float32Array(p*h*f);for(let d=0;d<f;d++){let C=d%3*2/3-1,S=d>2?0:-1,B=[C,S,0,C+2/3,S,0,C+2/3,S+1,0,C,S,0,C+2/3,S+1,0,C,S+1,0];_.set(B,p*h*d);for(let y=0;y<h;y++){let M=u[y*2]*2-1,b=u[y*2+1]*2-1;d===0?Ei.set(1,b,M):d===1?Ei.set(-M,1,-b):d===2?Ei.set(-M,b,1):d===3?Ei.set(-1,b,-M):d===4?Ei.set(-M,-1,b):Ei.set(M,b,-1),Ei.toArray(A,(d*h+y)*p)}}let m=new tn;m.setAttribute("position",new $e(_,p)),m.setAttribute("outputDirection",new $e(A,p)),e.push(new xe(m,null)),n>is&&n--}return{lodMeshes:e,sizeLods:t}}function zh(i,t,e){let n=new Ue(i,t,e);return n.texture.mapping=Ys,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ns(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function rg(i,t,e){return new qe({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ng,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:po(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function ag(i,t,e){return new qe({name:"SphericalGaussianBlur",defines:{SAMPLES:eg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:po(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Kh(){return new qe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:po(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Jh(){return new qe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:po(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function po(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var uo=class extends Ue{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Is(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Jn(5,5,5),r=new qe({name:"CubemapFromEquirect",uniforms:_i(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pe,blending:Bn});r.uniforms.tEquirect.value=e;let a=new xe(s,r),o=e.minFilter;return e.minFilter===ti&&(e.minFilter=De),new ga(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function og(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,p=!1){return h==null?null:p?a(h):r(h)}function r(h){if(h&&h.isTexture){let p=h.mapping;if(p===xa||p===Ba)if(t.has(h)){let _=t.get(h).texture;return o(_,h.mapping)}else{let _=h.image;if(_&&_.height>0){let A=new uo(_.height);return A.fromEquirectangularTexture(i,h),t.set(h,A),h.addEventListener("dispose",c),o(A.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let p=h.mapping,_=p===xa||p===Ba,A=p===$n||p===mi;if(_||A){let m=e.get(h),d=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==d)return n===null&&(n=new ho(i)),m=_?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),m.texture;if(m!==void 0)return m.texture;{let C=h.image;return _&&C&&C.height>0||A&&C&&l(C)?(n===null&&(n=new ho(i)),m=_?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,p){return p===xa?h.mapping=$n:p===Ba&&(h.mapping=mi),h}function l(h){let p=0,_=6;for(let A=0;A<_;A++)h[A]!==void 0&&p++;return p===_}function c(h){let p=h.target;p.removeEventListener("dispose",c);let _=t.get(p);_!==void 0&&(t.delete(p),_.dispose())}function u(h){let p=h.target;p.removeEventListener("dispose",u);let _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function lg(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&di("WebGLRenderer: "+n+" extension not supported."),s}}}function cg(i,t,e,n){let s={},r=new WeakMap;function a(f){let h=f.target;h.index!==null&&t.remove(h.index);for(let _ in h.attributes)t.remove(h.attributes[_]);h.removeEventListener("dispose",a),delete s[h.id];let p=r.get(h);p&&(t.remove(p),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function l(f){let h=f.attributes;for(let p in h)t.update(h[p],i.ARRAY_BUFFER)}function c(f){let h=[],p=f.index,_=f.attributes.position,A=0;if(_===void 0)return;if(p!==null){let C=p.array;A=p.version;for(let S=0,B=C.length;S<B;S+=3){let y=C[S+0],M=C[S+1],b=C[S+2];h.push(y,M,M,b,b,y)}}else{let C=_.array;A=_.version;for(let S=0,B=C.length/3-1;S<B;S+=3){let y=S+0,M=S+1,b=S+2;h.push(y,M,M,b,b,y)}}let m=new(_.count>=65535?Ds:Ss)(h,1);m.version=A;let d=r.get(f);d&&t.remove(d),r.set(f,m)}function u(f){let h=r.get(f);if(h){let p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function hg(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,h){i.drawElements(n,h,r,f*a),e.update(h,n,1)}function c(f,h,p){p!==0&&(i.drawElementsInstanced(n,h,r,f*a,p),e.update(h,n,p))}function u(f,h,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,p);let A=0;for(let m=0;m<p;m++)A+=h[m];e.update(A,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function ug(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Kt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function dg(i,t,e){let n=new WeakMap,s=new me;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==f){let D=function(){b.dispose(),n.delete(o),o.removeEventListener("dispose",D)};h!==void 0&&h.texture.dispose();let p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,A=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],C=o.morphAttributes.color||[],S=0;p===!0&&(S=1),_===!0&&(S=2),A===!0&&(S=3);let B=o.attributes.position.count*S,y=1;B>t.maxTextureSize&&(y=Math.ceil(B/t.maxTextureSize),B=t.maxTextureSize);let M=new Float32Array(B*y*4*f),b=new Ms(M,B,y,f);b.type=un,b.needsUpdate=!0;let E=S*4;for(let T=0;T<f;T++){let F=m[T],O=d[T],V=C[T],w=B*y*4*T;for(let H=0;H<F.count;H++){let U=H*E;p===!0&&(s.fromBufferAttribute(F,H),M[w+U+0]=s.x,M[w+U+1]=s.y,M[w+U+2]=s.z,M[w+U+3]=0),_===!0&&(s.fromBufferAttribute(O,H),M[w+U+4]=s.x,M[w+U+5]=s.y,M[w+U+6]=s.z,M[w+U+7]=0),A===!0&&(s.fromBufferAttribute(V,H),M[w+U+8]=s.x,M[w+U+9]=s.y,M[w+U+10]=s.z,M[w+U+11]=V.itemSize===4?s.w:1)}}h={count:f,texture:b,size:new ut(B,y)},n.set(o,h),o.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let p=0;for(let A=0;A<c.length;A++)p+=c[A];let _=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function fg(i,t,e,n,s){let r=new WeakMap;function a(c){let u=s.render.frame,f=c.geometry,h=t.get(c,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return h}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}var pg={[ml]:"LINEAR_TONE_MAPPING",[gl]:"REINHARD_TONE_MAPPING",[_l]:"CINEON_TONE_MAPPING",[El]:"ACES_FILMIC_TONE_MAPPING",[xl]:"AGX_TONE_MAPPING",[Bl]:"NEUTRAL_TONE_MAPPING",[Cl]:"CUSTOM_TONE_MAPPING"};function mg(i,t,e,n,s,r){let a=new Ue(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new tn;c.setAttribute("position",new Se([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Se([0,2,0,0,2,0],2));let u=new na({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new xe(c,u),h=new Qi(-1,1,1,-1,0,1),p=null,_=null,A=!1,m,d=null,C=[],S=!1;this.setSize=function(B,y){a.setSize(B,y),o!==null&&o.setSize(B,y),l!==null&&l.setSize(B,y);for(let M=0;M<C.length;M++){let b=C[M];b.setSize&&b.setSize(B,y)}},this.setEffects=function(B){C=B,S=C.length>0&&C[0].isRenderPass===!0;let y=a.width,M=a.height;C.length>0&&o===null&&(o=new Ue(y,M,{type:dn,depthBuffer:!1,stencilBuffer:!1}),l=new Ue(y,M,{type:dn,depthBuffer:!1,stencilBuffer:!1}));for(let b=0;b<C.length;b++){let E=C[b];E.setSize&&E.setSize(y,M)}},this.begin=function(B,y){if(A||B.toneMapping===cn&&C.length===0)return!1;if(d=y,y!==null){let M=y.width,b=y.height;(a.width!==M||a.height!==b)&&this.setSize(M,b)}return S===!1&&B.setRenderTarget(a),m=B.toneMapping,B.toneMapping=cn,!0},this.hasRenderPass=function(){return S},this.end=function(B,y){B.toneMapping=m,A=!0;let M=a,b=o;for(let E=0;E<C.length;E++){let D=C[E];D.enabled!==!1&&(D.render(B,b,M,y),D.needsSwap!==!1&&(M=b,b=b===o?l:o))}if(p!==B.outputColorSpace||_!==B.toneMapping){p=B.outputColorSpace,_=B.toneMapping,u.defines={},ee.getTransfer(p)===re&&(u.defines.SRGB_TRANSFER="");let E=pg[_];E&&(u.defines[E]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=M.texture,B.setRenderTarget(d),B.render(f,h),d=null,A=!1},this.isCompositing=function(){return A},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}var uu=new He,Ql=new Kn(1,1),du=new Ms,fu=new Xr,pu=new Is,Wh=[],Xh=[],Yh=new Float32Array(16),qh=new Float32Array(9),Qh=new Float32Array(4);function rs(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Wh[s];if(r===void 0&&(r=new Float32Array(s),Wh[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Be(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ae(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function mo(i,t){let e=Xh[t];e===void 0&&(e=new Int32Array(t),Xh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function gg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function _g(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2fv(this.addr,t),Ae(e,t)}}function Eg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Be(e,t))return;i.uniform3fv(this.addr,t),Ae(e,t)}}function Cg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4fv(this.addr,t),Ae(e,t)}}function xg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ae(e,t)}else{if(Be(e,n))return;Qh.set(n),i.uniformMatrix2fv(this.addr,!1,Qh),Ae(e,n)}}function Bg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ae(e,t)}else{if(Be(e,n))return;qh.set(n),i.uniformMatrix3fv(this.addr,!1,qh),Ae(e,n)}}function Ag(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ae(e,t)}else{if(Be(e,n))return;Yh.set(n),i.uniformMatrix4fv(this.addr,!1,Yh),Ae(e,n)}}function Mg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function yg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2iv(this.addr,t),Ae(e,t)}}function vg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;i.uniform3iv(this.addr,t),Ae(e,t)}}function Sg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4iv(this.addr,t),Ae(e,t)}}function Dg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function bg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2uiv(this.addr,t),Ae(e,t)}}function Ig(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;i.uniform3uiv(this.addr,t),Ae(e,t)}}function Tg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4uiv(this.addr,t),Ae(e,t)}}function Fg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ql.compareFunction=e.isReversedDepthBuffer()?oo:ao,r=Ql):r=uu,e.setTexture2D(t||r,s)}function wg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||fu,s)}function Rg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||pu,s)}function Gg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||du,s)}function Lg(i){switch(i){case 5126:return gg;case 35664:return _g;case 35665:return Eg;case 35666:return Cg;case 35674:return xg;case 35675:return Bg;case 35676:return Ag;case 5124:case 35670:return Mg;case 35667:case 35671:return yg;case 35668:case 35672:return vg;case 35669:case 35673:return Sg;case 5125:return Dg;case 36294:return bg;case 36295:return Ig;case 36296:return Tg;case 35678:case 36198:case 36298:case 36306:case 35682:return Fg;case 35679:case 36299:case 36307:return wg;case 35680:case 36300:case 36308:case 36293:return Rg;case 36289:case 36303:case 36311:case 36292:return Gg}}function Pg(i,t){i.uniform1fv(this.addr,t)}function Ng(i,t){let e=rs(t,this.size,2);i.uniform2fv(this.addr,e)}function Og(i,t){let e=rs(t,this.size,3);i.uniform3fv(this.addr,e)}function Hg(i,t){let e=rs(t,this.size,4);i.uniform4fv(this.addr,e)}function Ug(i,t){let e=rs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function kg(i,t){let e=rs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Vg(i,t){let e=rs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function zg(i,t){i.uniform1iv(this.addr,t)}function Kg(i,t){i.uniform2iv(this.addr,t)}function Jg(i,t){i.uniform3iv(this.addr,t)}function Wg(i,t){i.uniform4iv(this.addr,t)}function Xg(i,t){i.uniform1uiv(this.addr,t)}function Yg(i,t){i.uniform2uiv(this.addr,t)}function qg(i,t){i.uniform3uiv(this.addr,t)}function Qg(i,t){i.uniform4uiv(this.addr,t)}function Zg(i,t,e){let n=this.cache,s=t.length,r=mo(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ql:a=uu;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function jg(i,t,e){let n=this.cache,s=t.length,r=mo(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||fu,r[a])}function $g(i,t,e){let n=this.cache,s=t.length,r=mo(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||pu,r[a])}function t_(i,t,e){let n=this.cache,s=t.length,r=mo(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||du,r[a])}function e_(i){switch(i){case 5126:return Pg;case 35664:return Ng;case 35665:return Og;case 35666:return Hg;case 35674:return Ug;case 35675:return kg;case 35676:return Vg;case 5124:case 35670:return zg;case 35667:case 35671:return Kg;case 35668:case 35672:return Jg;case 35669:case 35673:return Wg;case 5125:return Xg;case 36294:return Yg;case 36295:return qg;case 36296:return Qg;case 35678:case 36198:case 36298:case 36306:case 35682:return Zg;case 35679:case 36299:case 36307:return jg;case 35680:case 36300:case 36308:case 36293:return $g;case 36289:case 36303:case 36311:case 36292:return t_}}var Zl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Lg(e.type)}},jl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=e_(e.type)}},$l=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},Yl=/(\w+)(\])?(\[|\.)?/g;function Zh(i,t){i.seq.push(t),i.map[t.id]=t}function n_(i,t,e){let n=i.name,s=n.length;for(Yl.lastIndex=0;;){let r=Yl.exec(n),a=Yl.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Zh(e,c===void 0?new Zl(o,i,t):new jl(o,i,t));break}else{let f=e.map[o];f===void 0&&(f=new $l(o),Zh(e,f)),e=f}}}var ss=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);n_(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function jh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var i_=37297,s_=0;function r_(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var $h=new Xt;function a_(i){ee._getMatrix($h,ee.workingColorSpace,i);let t=`mat3( ${$h.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(i)){case Bs:return[t,"LinearTransferOETF"];case re:return[t,"sRGBTransferOETF"];default:return Vt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function tu(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+r_(i.getShaderSource(t),o)}else return r}function o_(i,t){let e=a_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var l_={[ml]:"Linear",[gl]:"Reinhard",[_l]:"Cineon",[El]:"ACESFilmic",[xl]:"AgX",[Bl]:"Neutral",[Cl]:"Custom"};function c_(i,t){let e=l_[t];return e===void 0?(Vt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var co=new R;function h_(){ee.getLuminanceCoefficients(co);let i=co.x.toFixed(4),t=co.y.toFixed(4),e=co.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function u_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(sr).join(`
`)}function d_(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function f_(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function sr(i){return i!==""}function eu(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function nu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var p_=/^[ \t]*#include +<([\w\d./]+)>/gm;function tc(i){return i.replace(p_,g_)}var m_=new Map;function g_(i,t){let e=Zt[t];if(e===void 0){let n=m_.get(t);if(n!==void 0)e=Zt[n],Vt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return tc(e)}var __=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function iu(i){return i.replace(__,E_)}function E_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function su(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var C_={[Xs]:"SHADOWMAP_TYPE_PCF",[ji]:"SHADOWMAP_TYPE_VSM"};function x_(i){return C_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var B_={[$n]:"ENVMAP_TYPE_CUBE",[mi]:"ENVMAP_TYPE_CUBE",[Ys]:"ENVMAP_TYPE_CUBE_UV"};function A_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":B_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var M_={[mi]:"ENVMAP_MODE_REFRACTION"};function y_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":M_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var v_={[Ca]:"ENVMAP_BLENDING_MULTIPLY",[_h]:"ENVMAP_BLENDING_MIX",[Eh]:"ENVMAP_BLENDING_ADD"};function S_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":v_[i.combine]||"ENVMAP_BLENDING_NONE"}function D_(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function b_(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=x_(e),c=A_(e),u=y_(e),f=S_(e),h=D_(e),p=u_(e),_=d_(r),A=s.createProgram(),m,d,C=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(sr).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(sr).join(`
`),d.length>0&&(d+=`
`)):(m=[su(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(sr).join(`
`),d=[su(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==cn?"#define TONE_MAPPING":"",e.toneMapping!==cn?Zt.tonemapping_pars_fragment:"",e.toneMapping!==cn?c_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,o_("linearToOutputTexel",e.outputColorSpace),h_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(sr).join(`
`)),a=tc(a),a=eu(a,e),a=nu(a,e),o=tc(o),o=eu(o,e),o=nu(o,e),a=iu(a),o=iu(o),e.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===Tl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Tl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let S=C+m+a,B=C+d+o,y=jh(s,s.VERTEX_SHADER,S),M=jh(s,s.FRAGMENT_SHADER,B);s.attachShader(A,y),s.attachShader(A,M),e.index0AttributeName!==void 0?s.bindAttribLocation(A,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(A,0,"position"),s.linkProgram(A);function b(F){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(A)||"",V=s.getShaderInfoLog(y)||"",w=s.getShaderInfoLog(M)||"",H=O.trim(),U=V.trim(),k=w.trim(),it=!0,X=!0;if(s.getProgramParameter(A,s.LINK_STATUS)===!1)if(it=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,A,y,M);else{let $=tu(s,y,"vertex"),L=tu(s,M,"fragment");Kt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(A,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+H+`
`+$+`
`+L)}else H!==""?Vt("WebGLProgram: Program Info Log:",H):(U===""||k==="")&&(X=!1);X&&(F.diagnostics={runnable:it,programLog:H,vertexShader:{log:U,prefix:m},fragmentShader:{log:k,prefix:d}})}s.deleteShader(y),s.deleteShader(M),E=new ss(s,A),D=f_(s,A)}let E;this.getUniforms=function(){return E===void 0&&b(this),E};let D;this.getAttributes=function(){return D===void 0&&b(this),D};let T=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=s.getProgramParameter(A,i_)),T},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(A),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=s_++,this.cacheKey=t,this.usedTimes=1,this.program=A,this.vertexShader=y,this.fragmentShader=M,this}var I_=0,ec=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new nc(t),e.set(t,n)),n}},nc=class{constructor(t){this.id=I_++,this.code=t,this.usedTimes=0}};function T_(i){return i===ni||i===tr||i===er}function F_(i,t,e,n,s,r){let a=new ys,o=new ec,l=new Set,c=[],u=new Map,f=n.logarithmicDepthBuffer,h=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function A(E,D,T,F,O,V){let w=F.fog,H=O.geometry,U=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?F.environment:null,k=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,it=t.get(E.envMap||U,k),X=it&&it.mapping===Ys?it.image.height:null,$=p[E.type];E.precision!==null&&(h=n.getMaxPrecision(E.precision),h!==E.precision&&Vt("WebGLProgram.getParameters:",E.precision,"not supported, using",h,"instead."));let L=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,lt=L!==void 0?L.length:0,at=0;H.morphAttributes.position!==void 0&&(at=1),H.morphAttributes.normal!==void 0&&(at=2),H.morphAttributes.color!==void 0&&(at=3);let Gt,Ot,Jt,Y;if($){let he=Mn[$];Gt=he.vertexShader,Ot=he.fragmentShader}else{Gt=E.vertexShader,Ot=E.fragmentShader;let he=o.getVertexShaderStage(E),ie=o.getFragmentShaderStage(E);o.update(E,he,ie),Jt=he.id,Y=ie.id}let Z=i.getRenderTarget(),ft=i.state.buffers.depth.getReversed(),vt=O.isInstancedMesh===!0,dt=O.isBatchedMesh===!0,Dt=!!E.map,zt=!!E.matcap,q=!!it,tt=!!E.aoMap,ot=!!E.lightMap,st=!!E.bumpMap&&E.wireframe===!1,ct=!!E.normalMap,Ct=!!E.displacementMap,Tt=!!E.emissiveMap,It=!!E.metalnessMap,Ut=!!E.roughnessMap,I=E.anisotropy>0,jt=E.clearcoat>0,Wt=E.dispersion>0,v=E.retroreflectivity>0,g=E.iridescence>0,N=E.sheen>0,z=E.transmission>0,Q=I&&!!E.anisotropyMap,ht=jt&&!!E.clearcoatMap,pt=jt&&!!E.clearcoatNormalMap,j=jt&&!!E.clearcoatRoughnessMap,nt=g&&!!E.iridescenceMap,mt=g&&!!E.iridescenceThicknessMap,Pt=N&&!!E.sheenColorMap,xt=N&&!!E.sheenRoughnessMap,gt=!!E.specularMap,Nt=!!E.specularColorMap,kt=!!E.specularIntensityMap,Yt=z&&!!E.transmissionMap,P=z&&!!E.thicknessMap,_t=!!E.gradientMap,et=!!E.alphaMap,Et=E.alphaTest>0,yt=!!E.alphaHash,rt=!!E.extensions,Ht=cn;E.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Ht=i.toneMapping);let Rt={shaderID:$,shaderType:E.type,shaderName:E.name,vertexShader:Gt,fragmentShader:Ot,defines:E.defines,customVertexShaderID:Jt,customFragmentShaderID:Y,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:h,batching:dt,batchingColor:dt&&O._colorsTexture!==null,instancing:vt,instancingColor:vt&&O.instanceColor!==null,instancingMorph:vt&&O.morphTexture!==null,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:ee.workingColorSpace,alphaToCoverage:!!E.alphaToCoverage,map:Dt,matcap:zt,envMap:q,envMapMode:q&&it.mapping,envMapCubeUVHeight:X,aoMap:tt,lightMap:ot,bumpMap:st,normalMap:ct,displacementMap:Ct,emissiveMap:Tt,normalMapObjectSpace:ct&&E.normalMapType===Bh,normalMapTangentSpace:ct&&E.normalMapType===ro,packedNormalMap:ct&&E.normalMapType===ro&&T_(E.normalMap.format),metalnessMap:It,roughnessMap:Ut,anisotropy:I,anisotropyMap:Q,clearcoat:jt,clearcoatMap:ht,clearcoatNormalMap:pt,clearcoatRoughnessMap:j,dispersion:Wt,retroreflection:v,iridescence:g,iridescenceMap:nt,iridescenceThicknessMap:mt,sheen:N,sheenColorMap:Pt,sheenRoughnessMap:xt,specularMap:gt,specularColorMap:Nt,specularIntensityMap:kt,transmission:z,transmissionMap:Yt,thicknessMap:P,gradientMap:_t,opaque:E.transparent===!1&&E.blending===$i&&E.alphaToCoverage===!1,alphaMap:et,alphaTest:Et,alphaHash:yt,combine:E.combine,mapUv:Dt&&_(E.map.channel),aoMapUv:tt&&_(E.aoMap.channel),lightMapUv:ot&&_(E.lightMap.channel),bumpMapUv:st&&_(E.bumpMap.channel),normalMapUv:ct&&_(E.normalMap.channel),displacementMapUv:Ct&&_(E.displacementMap.channel),emissiveMapUv:Tt&&_(E.emissiveMap.channel),metalnessMapUv:It&&_(E.metalnessMap.channel),roughnessMapUv:Ut&&_(E.roughnessMap.channel),anisotropyMapUv:Q&&_(E.anisotropyMap.channel),clearcoatMapUv:ht&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:pt&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:Pt&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:xt&&_(E.sheenRoughnessMap.channel),specularMapUv:gt&&_(E.specularMap.channel),specularColorMapUv:Nt&&_(E.specularColorMap.channel),specularIntensityMapUv:kt&&_(E.specularIntensityMap.channel),transmissionMapUv:Yt&&_(E.transmissionMap.channel),thicknessMapUv:P&&_(E.thicknessMap.channel),alphaMapUv:et&&_(E.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(ct||I),vertexNormals:!!H.attributes.normal,vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!H.attributes.uv&&(Dt||et),fog:!!w,useFog:E.fog===!0,fogExp2:!!w&&w.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||H.attributes.normal===void 0&&ct===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ft,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:lt,morphTextureStride:at,numSunLights:D.sun.length,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numSunLightShadows:D.sunShadowMap.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&T.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ht,decodeVideoTexture:Dt&&E.map.isVideoTexture===!0&&ee.getTransfer(E.map.colorSpace)===re,decodeVideoTextureEmissive:Tt&&E.emissiveMap.isVideoTexture===!0&&ee.getTransfer(E.emissiveMap.colorSpace)===re,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===xn,flipSided:E.side===Pe,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:rt&&E.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(rt&&E.extensions.multiDraw===!0||dt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Rt.vertexUv1s=l.has(1),Rt.vertexUv2s=l.has(2),Rt.vertexUv3s=l.has(3),l.clear(),Rt}function m(E){let D=[];if(E.shaderID?D.push(E.shaderID):(D.push(E.customVertexShaderID),D.push(E.customFragmentShaderID)),E.defines!==void 0)for(let T in E.defines)D.push(T),D.push(E.defines[T]);return E.isRawShaderMaterial===!1&&(d(D,E),C(D,E),D.push(i.outputColorSpace)),D.push(E.customProgramCacheKey),D.join()}function d(E,D){E.push(D.precision),E.push(D.outputColorSpace),E.push(D.envMapMode),E.push(D.envMapCubeUVHeight),E.push(D.mapUv),E.push(D.alphaMapUv),E.push(D.lightMapUv),E.push(D.aoMapUv),E.push(D.bumpMapUv),E.push(D.normalMapUv),E.push(D.displacementMapUv),E.push(D.emissiveMapUv),E.push(D.metalnessMapUv),E.push(D.roughnessMapUv),E.push(D.anisotropyMapUv),E.push(D.clearcoatMapUv),E.push(D.clearcoatNormalMapUv),E.push(D.clearcoatRoughnessMapUv),E.push(D.iridescenceMapUv),E.push(D.iridescenceThicknessMapUv),E.push(D.sheenColorMapUv),E.push(D.sheenRoughnessMapUv),E.push(D.specularMapUv),E.push(D.specularColorMapUv),E.push(D.specularIntensityMapUv),E.push(D.transmissionMapUv),E.push(D.thicknessMapUv),E.push(D.combine),E.push(D.fogExp2),E.push(D.sizeAttenuation),E.push(D.morphTargetsCount),E.push(D.morphAttributeCount),E.push(D.numSunLights),E.push(D.numDirLights),E.push(D.numPointLights),E.push(D.numSpotLights),E.push(D.numSpotLightMaps),E.push(D.numHemiLights),E.push(D.numRectAreaLights),E.push(D.numSunLightShadows),E.push(D.numDirLightShadows),E.push(D.numPointLightShadows),E.push(D.numSpotLightShadows),E.push(D.numSpotLightShadowsWithMaps),E.push(D.numLightProbes),E.push(D.shadowMapType),E.push(D.toneMapping),E.push(D.numClippingPlanes),E.push(D.numClipIntersection),E.push(D.depthPacking)}function C(E,D){a.disableAll(),D.instancing&&a.enable(0),D.instancingColor&&a.enable(1),D.instancingMorph&&a.enable(2),D.matcap&&a.enable(3),D.envMap&&a.enable(4),D.normalMapObjectSpace&&a.enable(5),D.normalMapTangentSpace&&a.enable(6),D.clearcoat&&a.enable(7),D.iridescence&&a.enable(8),D.alphaTest&&a.enable(9),D.vertexColors&&a.enable(10),D.vertexAlphas&&a.enable(11),D.vertexUv1s&&a.enable(12),D.vertexUv2s&&a.enable(13),D.vertexUv3s&&a.enable(14),D.vertexTangents&&a.enable(15),D.anisotropy&&a.enable(16),D.alphaHash&&a.enable(17),D.batching&&a.enable(18),D.dispersion&&a.enable(19),D.retroreflection&&a.enable(24),D.batchingColor&&a.enable(20),D.gradientMap&&a.enable(21),D.packedNormalMap&&a.enable(22),D.vertexNormals&&a.enable(23),E.push(a.mask),a.disableAll(),D.fog&&a.enable(0),D.useFog&&a.enable(1),D.flatShading&&a.enable(2),D.logarithmicDepthBuffer&&a.enable(3),D.reversedDepthBuffer&&a.enable(4),D.skinning&&a.enable(5),D.morphTargets&&a.enable(6),D.morphNormals&&a.enable(7),D.morphColors&&a.enable(8),D.premultipliedAlpha&&a.enable(9),D.shadowMapEnabled&&a.enable(10),D.doubleSided&&a.enable(11),D.flipSided&&a.enable(12),D.useDepthPacking&&a.enable(13),D.dithering&&a.enable(14),D.transmission&&a.enable(15),D.sheen&&a.enable(16),D.opaque&&a.enable(17),D.pointsUvs&&a.enable(18),D.decodeVideoTexture&&a.enable(19),D.decodeVideoTextureEmissive&&a.enable(20),D.alphaToCoverage&&a.enable(21),D.numLightProbeGrids>0&&a.enable(22),D.hasPositionAttribute&&a.enable(23),E.push(a.mask)}function S(E){let D=p[E.type],T;if(D){let F=Mn[D];T=Hh.clone(F.uniforms)}else T=E.uniforms;return T}function B(E,D){let T=u.get(D);return T!==void 0?++T.usedTimes:(T=new b_(i,D,E,s),c.push(T),u.set(D,T)),T}function y(E){if(--E.usedTimes===0){let D=c.indexOf(E);c[D]=c[c.length-1],c.pop(),u.delete(E.cacheKey),E.destroy()}}function M(E){o.remove(E)}function b(){o.dispose()}return{getParameters:A,getProgramCacheKey:m,getUniforms:S,acquireProgram:B,releaseProgram:y,releaseShaderCache:M,programs:c,dispose:b}}function w_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function R_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function ru(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function au(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,_,A,m,d){let C=i[t];return C===void 0?(C={id:h.id,object:h,geometry:p,material:_,materialVariant:a(h),groupOrder:A,renderOrder:h.renderOrder,z:m,group:d},i[t]=C):(C.id=h.id,C.object=h,C.geometry=p,C.material=_,C.materialVariant=a(h),C.groupOrder=A,C.renderOrder=h.renderOrder,C.z=m,C.group=d),t++,C}function l(h,p,_,A,m,d,C){C.reversedDepth===!0&&(m=-m);let S=o(h,p,_,A,m,d);_.transmission>0?n.push(S):_.transparent===!0?s.push(S):e.push(S)}function c(h,p,_,A,m,d){let C=o(h,p,_,A,m,d);_.transmission>0?n.unshift(C):_.transparent===!0?s.unshift(C):e.unshift(C)}function u(h,p){e.length>1&&e.sort(h||R_),n.length>1&&n.sort(p||ru),s.length>1&&s.sort(p||ru)}function f(){for(let h=t,p=i.length;h<p;h++){let _=i[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:f,sort:u}}function G_(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new au,i.set(n,[a])):s>=r.length?(a=new au,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function L_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new R,color:new te};break;case"SpotLight":e={position:new R,direction:new R,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new te,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new te,groundColor:new te};break;case"RectAreaLight":e={color:new te,position:new R,halfWidth:new R,halfHeight:new R};break}return i[t.id]=e,e}}}function P_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var N_=0;function O_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function H_(i){let t=new L_,e=P_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);let s=new R,r=new pe,a=new pe;function o(c){let u=0,f=0,h=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let p=0,_=0,A=0,m=0,d=0,C=0,S=0,B=0,y=0,M=0,b=0,E=0,D=0,T=0;c.sort(O_);for(let O=0,V=c.length;O<V;O++){let w=c[O],H=w.color,U=w.intensity,k=w.distance,it=null;if(w.shadow&&w.shadow.map&&(w.shadow.map.texture.format===ni?it=w.shadow.map.texture:it=w.shadow.map.depthTexture||w.shadow.map.texture),w.isAmbientLight)u+=H.r*U,f+=H.g*U,h+=H.b*U;else if(w.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(w.sh.coefficients[X],U);T++}else if(w.isSunLight){let X=t.get(w);if(X.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){let $=w.shadow,L=e.get(w);L.shadowIntensity=$.intensity,L.shadowBias=$.bias,L.shadowNormalBias=$.normalBias,L.shadowRadius=$.radius,L.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),n.sunShadow[_]=L,n.sunShadowMap[_]=it;let lt=$.getViewportCount();for(let at=0;at<lt;at++)n.sunShadowMatrix[A+at]=$.getMatrix(at),n.sunShadowCascade[A+at]=$._cascadeData[at];A+=lt,_++}n.sun[p]=X,p++}else if(w.isDirectionalLight){let X=t.get(w);if(X.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){let $=w.shadow,L=e.get(w);L.shadowIntensity=$.intensity,L.shadowBias=$.bias,L.shadowNormalBias=$.normalBias,L.shadowRadius=$.radius,L.shadowMapSize=$.mapSize,n.directionalShadow[m]=L,n.directionalShadowMap[m]=it,n.directionalShadowMatrix[m]=w.shadow.matrix,y++}n.directional[m]=X,m++}else if(w.isSpotLight){let X=t.get(w);X.position.setFromMatrixPosition(w.matrixWorld),X.color.copy(H).multiplyScalar(U),X.distance=k,X.coneCos=Math.cos(w.angle),X.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),X.decay=w.decay,n.spot[C]=X;let $=w.shadow;if(w.map&&(n.spotLightMap[E]=w.map,E++,$.updateMatrices(w),w.castShadow&&D++),n.spotLightMatrix[C]=$.matrix,w.castShadow){let L=e.get(w);L.shadowIntensity=$.intensity,L.shadowBias=$.bias,L.shadowNormalBias=$.normalBias,L.shadowRadius=$.radius,L.shadowMapSize=$.mapSize,n.spotShadow[C]=L,n.spotShadowMap[C]=it,b++}C++}else if(w.isRectAreaLight){let X=t.get(w);X.color.copy(H).multiplyScalar(U),X.halfWidth.set(w.width*.5,0,0),X.halfHeight.set(0,w.height*.5,0),n.rectArea[S]=X,S++}else if(w.isPointLight){let X=t.get(w);if(X.color.copy(w.color).multiplyScalar(w.intensity),X.distance=w.distance,X.decay=w.decay,w.castShadow){let $=w.shadow,L=e.get(w);L.shadowIntensity=$.intensity,L.shadowBias=$.bias,L.shadowNormalBias=$.normalBias,L.shadowRadius=$.radius,L.shadowMapSize=$.mapSize,L.shadowCameraNear=$.camera.near,L.shadowCameraFar=$.camera.far,n.pointShadow[d]=L,n.pointShadowMap[d]=it,n.pointShadowMatrix[d]=w.shadow.matrix,M++}n.point[d]=X,d++}else if(w.isHemisphereLight){let X=t.get(w);X.skyColor.copy(w.color).multiplyScalar(U),X.groundColor.copy(w.groundColor).multiplyScalar(U),n.hemi[B]=X,B++}}S>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Bt.LTC_FLOAT_1,n.rectAreaLTC2=Bt.LTC_FLOAT_2):(n.rectAreaLTC1=Bt.LTC_HALF_1,n.rectAreaLTC2=Bt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;let F=n.hash;(F.sunLength!==p||F.directionalLength!==m||F.pointLength!==d||F.spotLength!==C||F.rectAreaLength!==S||F.hemiLength!==B||F.numSunShadows!==_||F.numDirectionalShadows!==y||F.numPointShadows!==M||F.numSpotShadows!==b||F.numSpotMaps!==E||F.numLightProbes!==T)&&(n.sun.length=p,n.directional.length=m,n.spot.length=C,n.rectArea.length=S,n.point.length=d,n.hemi.length=B,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=A,n.sunShadowCascade.length=A,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.directionalShadowMatrix.length=y,n.pointShadow.length=M,n.pointShadowMap.length=M,n.pointShadowMatrix.length=M,n.spotShadow.length=b,n.spotShadowMap.length=b,n.spotLightMatrix.length=b+E-D,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=D,n.numLightProbes=T,F.sunLength=p,F.directionalLength=m,F.pointLength=d,F.spotLength=C,F.rectAreaLength=S,F.hemiLength=B,F.numSunShadows=_,F.numDirectionalShadows=y,F.numPointShadows=M,F.numSpotShadows=b,F.numSpotMaps=E,F.numLightProbes=T,n.version=N_++)}function l(c,u){let f=0,h=0,p=0,_=0,A=0,m=0,d=u.matrixWorldInverse;for(let C=0,S=c.length;C<S;C++){let B=c[C];if(B.isSunLight){let y=n.sun[f];y.direction.setFromMatrixPosition(B.matrixWorld),y.direction.transformDirection(d),f++}else if(B.isDirectionalLight){let y=n.directional[h];y.direction.setFromMatrixPosition(B.matrixWorld),s.setFromMatrixPosition(B.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(d),h++}else if(B.isSpotLight){let y=n.spot[_];y.position.setFromMatrixPosition(B.matrixWorld),y.position.applyMatrix4(d),y.direction.setFromMatrixPosition(B.matrixWorld),s.setFromMatrixPosition(B.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(d),_++}else if(B.isRectAreaLight){let y=n.rectArea[A];y.position.setFromMatrixPosition(B.matrixWorld),y.position.applyMatrix4(d),a.identity(),r.copy(B.matrixWorld),r.premultiply(d),a.extractRotation(r),y.halfWidth.set(B.width*.5,0,0),y.halfHeight.set(0,B.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),A++}else if(B.isPointLight){let y=n.point[p];y.position.setFromMatrixPosition(B.matrixWorld),y.position.applyMatrix4(d),p++}else if(B.isHemisphereLight){let y=n.hemi[m];y.direction.setFromMatrixPosition(B.matrixWorld),y.direction.transformDirection(d),m++}}}return{setup:o,setupView:l,state:n}}function ou(i){let t=new H_(i),e=[],n=[],s=[];function r(h){f.camera=h,e.length=0,n.length=0,s.length=0}function a(h){e.push(h)}function o(h){n.push(h)}function l(h){s.push(h)}function c(){t.setup(e)}function u(h){t.setupView(e,h)}let f={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function U_(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new ou(i),t.set(s,[o])):r>=a.length?(o=new ou(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var k_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,V_=`uniform sampler2D shadow_pass;
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
}`,z_=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],K_=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],lu=new pe,ir=new R,ql=new R;function J_(i,t,e){let n=new Ji,s=new ut,r=new ut,a=new me,o=new ia,l=new sa,c={},u=e.maxTextureSize,f={[jn]:Pe,[Pe]:jn,[xn]:xn},h=new qe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:k_,fragmentShader:V_}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let _=new tn;_.setAttribute("position",new $e(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let A=new xe(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xs;let d=this.type;this.render=function(M,b,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;this.type===jc&&(Vt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Xs);let D=i.getRenderTarget(),T=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Bn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let V=d!==this.type;V&&b.traverse(function(w){w.material&&(Array.isArray(w.material)?w.material.forEach(H=>H.needsUpdate=!0):w.material.needsUpdate=!0)});for(let w=0,H=M.length;w<H;w++){let U=M[w],k=U.shadow;if(k===void 0){Vt("WebGLShadowMap:",U,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);let it=k.getFrameExtents();s.multiply(it),r.copy(k.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/it.x),s.x=r.x*it.x,k.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/it.y),s.y=r.y*it.y,k.mapSize.y=r.y));let X=i.state.buffers.depth.getReversed();if(k.camera._reversedDepth=X,k.map===null||V===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===ji){if(U.isPointLight){Vt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Ue(s.x,s.y,{format:ni,type:dn,minFilter:De,magFilter:De,generateMipmaps:!1}),k.map.texture.name=U.name+".shadowMap",k.map.depthTexture=new Kn(s.x,s.y,un),k.map.depthTexture.name=U.name+".shadowMapDepth",k.map.depthTexture.format=Cn,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=ve,k.map.depthTexture.magFilter=ve}else U.isPointLight?(k.map=new uo(s.x),k.map.depthTexture=new qr(s.x,hn)):(k.map=new Ue(s.x,s.y),k.map.depthTexture=new Kn(s.x,s.y,hn)),k.map.depthTexture.name=U.name+".shadowMap",k.map.depthTexture.format=Cn,this.type===Xs?(k.map.depthTexture.compareFunction=X?oo:ao,k.map.depthTexture.minFilter=De,k.map.depthTexture.magFilter=De):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=ve,k.map.depthTexture.magFilter=ve);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==s.x||k.map.height!==s.y)&&k.map.setSize(s.x,s.y);let $=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();U.isPointLight!==!0&&k.updateMatrices(U,E);for(let L=0;L<$;L++){let lt=k.getCamera(L);if(U.isPointLight){let at=k.camera,Gt=k.matrix,Ot=U.distance||at.far;Ot!==at.far&&(at.far=Ot,at.updateProjectionMatrix()),ir.setFromMatrixPosition(U.matrixWorld),at.position.copy(ir),ql.copy(at.position),ql.add(z_[L]),at.up.copy(K_[L]),at.lookAt(ql),at.updateMatrixWorld(),Gt.makeTranslation(-ir.x,-ir.y,-ir.z),lu.multiplyMatrices(at.projectionMatrix,at.matrixWorldInverse),k._frustum.setFromProjectionMatrix(lu,at.coordinateSystem,at.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,L),i.clear();else{L===0&&(i.setRenderTarget(k.map),i.clear());let at=k.getViewport(L);a.set(r.x*at.x,r.y*at.y,r.x*at.z,r.y*at.w),O.viewport(a)}n=k.getFrustum(L),B(b,E,lt,U,this.type)}k.isPointLightShadow!==!0&&this.type===ji&&C(k,E),k.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(D,T,F)};function C(M,b){let E=t.update(A);h.defines.VSM_SAMPLES!==M.blurSamples&&(h.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null?M.mapPass=new Ue(s.x,s.y,{format:ni,type:dn}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),h.uniforms.shadow_pass.value=M.map.depthTexture,h.uniforms.resolution.value.set(M.map.width,M.map.height),h.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(b,null,E,h,A,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value.set(M.map.width,M.map.height),p.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(b,null,E,p,A,null)}function S(M,b,E,D){let T=null,F=E.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(F!==void 0)T=F;else if(T=E.isPointLight===!0?l:o,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){let O=T.uuid,V=b.uuid,w=c[O];w===void 0&&(w={},c[O]=w);let H=w[V];H===void 0&&(H=T.clone(),w[V]=H,b.addEventListener("dispose",y)),T=H}if(T.visible=b.visible,T.wireframe=b.wireframe,D===ji?T.side=b.shadowSide!==null?b.shadowSide:b.side:T.side=b.shadowSide!==null?b.shadowSide:f[b.side],T.alphaMap=b.alphaMap,T.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,T.map=b.map,T.clipShadows=b.clipShadows,T.clippingPlanes=b.clippingPlanes,T.clipIntersection=b.clipIntersection,T.displacementMap=b.displacementMap,T.displacementScale=b.displacementScale,T.displacementBias=b.displacementBias,T.wireframeLinewidth=b.wireframeLinewidth,T.linewidth=b.linewidth,E.isPointLight===!0&&T.isMeshDistanceMaterial===!0){let O=i.properties.get(T);O.light=E}return T}function B(M,b,E,D,T){if(M.visible===!1)return;if(M.layers.test(b.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&T===ji)&&(!M.frustumCulled||M.intersectsFrustum(n))){M.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,M.matrixWorld);let V=t.update(M),w=M.material;if(Array.isArray(w)){let H=V.groups;for(let U=0,k=H.length;U<k;U++){let it=H[U],X=w[it.materialIndex];if(X&&X.visible){let $=S(M,X,D,T);M.onBeforeShadow(i,M,b,E,V,$,it),i.renderBufferDirect(E,null,V,$,M,it),M.onAfterShadow(i,M,b,E,V,$,it)}}}else if(w.visible){let H=S(M,w,D,T);M.onBeforeShadow(i,M,b,E,V,H,null),i.renderBufferDirect(E,null,V,H,M,null),M.onAfterShadow(i,M,b,E,V,H,null)}}let O=M.children;for(let V=0,w=O.length;V<w;V++)B(O[V],b,E,D,T)}function y(M){M.target.removeEventListener("dispose",y);for(let E in c){let D=c[E],T=M.target.uuid;T in D&&(D[T].dispose(),delete D[T])}}}function W_(i,t){function e(){let P=!1,_t=new me,et=null,Et=new me(0,0,0,0);return{setMask:function(yt){et!==yt&&!P&&(i.colorMask(yt,yt,yt,yt),et=yt)},setLocked:function(yt){P=yt},setClear:function(yt,rt,Ht,Rt,he){he===!0&&(yt*=Rt,rt*=Rt,Ht*=Rt),_t.set(yt,rt,Ht,Rt),Et.equals(_t)===!1&&(i.clearColor(yt,rt,Ht,Rt),Et.copy(_t))},reset:function(){P=!1,et=null,Et.set(-1,0,0,0)}}}function n(){let P=!1,_t=!1,et=null,Et=null,yt=null;return{setReversed:function(rt){if(_t!==rt){let Ht=t.get("EXT_clip_control");rt?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT),_t=rt;let Rt=yt;yt=null,this.setClear(Rt)}},getReversed:function(){return _t},setTest:function(rt){rt?Z(i.DEPTH_TEST):ft(i.DEPTH_TEST)},setMask:function(rt){et!==rt&&!P&&(i.depthMask(rt),et=rt)},setFunc:function(rt){if(_t&&(rt=Rh[rt]),Et!==rt){switch(rt){case Lr:i.depthFunc(i.NEVER);break;case Pr:i.depthFunc(i.ALWAYS);break;case Nr:i.depthFunc(i.LESS);break;case Ni:i.depthFunc(i.LEQUAL);break;case Or:i.depthFunc(i.EQUAL);break;case Hr:i.depthFunc(i.GEQUAL);break;case Ur:i.depthFunc(i.GREATER);break;case kr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Et=rt}},setLocked:function(rt){P=rt},setClear:function(rt){yt!==rt&&(yt=rt,_t&&(rt=1-rt),i.clearDepth(rt))},reset:function(){P=!1,et=null,Et=null,yt=null,_t=!1}}}function s(){let P=!1,_t=null,et=null,Et=null,yt=null,rt=null,Ht=null,Rt=null,he=null;return{setTest:function(ie){P||(ie?Z(i.STENCIL_TEST):ft(i.STENCIL_TEST))},setMask:function(ie){_t!==ie&&!P&&(i.stencilMask(ie),_t=ie)},setFunc:function(ie,nn,pn){(et!==ie||Et!==nn||yt!==pn)&&(i.stencilFunc(ie,nn,pn),et=ie,Et=nn,yt=pn)},setOp:function(ie,nn,pn){(rt!==ie||Ht!==nn||Rt!==pn)&&(i.stencilOp(ie,nn,pn),rt=ie,Ht=nn,Rt=pn)},setLocked:function(ie){P=ie},setClear:function(ie){he!==ie&&(i.clearStencil(ie),he=ie)},reset:function(){P=!1,_t=null,et=null,Et=null,yt=null,rt=null,Ht=null,Rt=null,he=null}}}let r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap,u={},f={},h={},p=new WeakMap,_=[],A=null,m=!1,d=null,C=null,S=null,B=null,y=null,M=null,b=null,E=new te(0,0,0),D=0,T=!1,F=null,O=null,V=null,w=null,H=null,U=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,it=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(X)[1]),k=it>=1):X.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),k=it>=2);let $=null,L={},lt=i.getParameter(i.SCISSOR_BOX),at=i.getParameter(i.VIEWPORT),Gt=new me().fromArray(lt),Ot=new me().fromArray(at);function Jt(P,_t,et,Et){let yt=new Uint8Array(4),rt=i.createTexture();i.bindTexture(P,rt),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ht=0;Ht<et;Ht++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(_t,0,i.RGBA,1,1,Et,0,i.RGBA,i.UNSIGNED_BYTE,yt):i.texImage2D(_t+Ht,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,yt);return rt}let Y={};Y[i.TEXTURE_2D]=Jt(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=Jt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=Jt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=Jt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Z(i.DEPTH_TEST),a.setFunc(Ni),st(!1),ct(cl),Z(i.CULL_FACE),tt(Bn);function Z(P){u[P]!==!0&&(i.enable(P),u[P]=!0)}function ft(P){u[P]!==!1&&(i.disable(P),u[P]=!1)}function vt(P,_t){return h[P]!==_t?(i.bindFramebuffer(P,_t),h[P]=_t,P===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=_t),P===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=_t),!0):!1}function dt(P,_t){let et=_,Et=!1;if(P){et=p.get(_t),et===void 0&&(et=[],p.set(_t,et));let yt=P.textures;if(et.length!==yt.length||et[0]!==i.COLOR_ATTACHMENT0){for(let rt=0,Ht=yt.length;rt<Ht;rt++)et[rt]=i.COLOR_ATTACHMENT0+rt;et.length=yt.length,Et=!0}}else et[0]!==i.BACK&&(et[0]=i.BACK,Et=!0);Et&&i.drawBuffers(et)}function Dt(P){return A!==P?(i.useProgram(P),A=P,!0):!1}let zt={[pi]:i.FUNC_ADD,[th]:i.FUNC_SUBTRACT,[eh]:i.FUNC_REVERSE_SUBTRACT};zt[nh]=i.MIN,zt[ih]=i.MAX;let q={[sh]:i.ZERO,[rh]:i.ONE,[ah]:i.SRC_COLOR,[fl]:i.SRC_ALPHA,[dh]:i.SRC_ALPHA_SATURATE,[hh]:i.DST_COLOR,[lh]:i.DST_ALPHA,[oh]:i.ONE_MINUS_SRC_COLOR,[pl]:i.ONE_MINUS_SRC_ALPHA,[uh]:i.ONE_MINUS_DST_COLOR,[ch]:i.ONE_MINUS_DST_ALPHA,[fh]:i.CONSTANT_COLOR,[ph]:i.ONE_MINUS_CONSTANT_COLOR,[mh]:i.CONSTANT_ALPHA,[gh]:i.ONE_MINUS_CONSTANT_ALPHA};function tt(P,_t,et,Et,yt,rt,Ht,Rt,he,ie){if(P===Bn){m===!0&&(ft(i.BLEND),m=!1);return}if(m===!1&&(Z(i.BLEND),m=!0),P!==$c){if(P!==d||ie!==T){if((C!==pi||y!==pi)&&(i.blendEquation(i.FUNC_ADD),C=pi,y=pi),ie)switch(P){case $i:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case hl:i.blendFunc(i.ONE,i.ONE);break;case ul:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case dl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Kt("WebGLState: Invalid blending: ",P);break}else switch(P){case $i:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case hl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ul:Kt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case dl:Kt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Kt("WebGLState: Invalid blending: ",P);break}S=null,B=null,M=null,b=null,E.set(0,0,0),D=0,d=P,T=ie}return}yt=yt||_t,rt=rt||et,Ht=Ht||Et,(_t!==C||yt!==y)&&(i.blendEquationSeparate(zt[_t],zt[yt]),C=_t,y=yt),(et!==S||Et!==B||rt!==M||Ht!==b)&&(i.blendFuncSeparate(q[et],q[Et],q[rt],q[Ht]),S=et,B=Et,M=rt,b=Ht),(Rt.equals(E)===!1||he!==D)&&(i.blendColor(Rt.r,Rt.g,Rt.b,he),E.copy(Rt),D=he),d=P,T=!1}function ot(P,_t){P.side===xn?ft(i.CULL_FACE):Z(i.CULL_FACE);let et=P.side===Pe;_t&&(et=!et),st(et),P.blending===$i&&P.transparent===!1?tt(Bn):tt(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);let Et=P.stencilWrite;o.setTest(Et),Et&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Tt(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):ft(i.SAMPLE_ALPHA_TO_COVERAGE)}function st(P){F!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),F=P)}function ct(P){P!==Qc?(Z(i.CULL_FACE),P!==O&&(P===cl?i.cullFace(i.BACK):P===Zc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ft(i.CULL_FACE),O=P}function Ct(P){P!==V&&(k&&i.lineWidth(P),V=P)}function Tt(P,_t,et){P?(Z(i.POLYGON_OFFSET_FILL),(w!==_t||H!==et)&&(w=_t,H=et,a.getReversed()&&(_t=-_t),i.polygonOffset(_t,et))):ft(i.POLYGON_OFFSET_FILL)}function It(P){P?Z(i.SCISSOR_TEST):ft(i.SCISSOR_TEST)}function Ut(P){P===void 0&&(P=i.TEXTURE0+U-1),$!==P&&(i.activeTexture(P),$=P)}function I(P,_t,et){et===void 0&&($===null?et=i.TEXTURE0+U-1:et=$);let Et=L[et];Et===void 0&&(Et={type:void 0,texture:void 0},L[et]=Et),(Et.type!==P||Et.texture!==_t)&&($!==et&&(i.activeTexture(et),$=et),i.bindTexture(P,_t||Y[P]),Et.type=P,Et.texture=_t)}function jt(){let P=L[$];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Wt(){try{i.compressedTexImage2D(...arguments)}catch(P){Kt("WebGLState:",P)}}function v(){try{i.compressedTexImage3D(...arguments)}catch(P){Kt("WebGLState:",P)}}function g(){try{i.texSubImage2D(...arguments)}catch(P){Kt("WebGLState:",P)}}function N(){try{i.texSubImage3D(...arguments)}catch(P){Kt("WebGLState:",P)}}function z(){try{i.compressedTexSubImage2D(...arguments)}catch(P){Kt("WebGLState:",P)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(P){Kt("WebGLState:",P)}}function ht(){try{i.texStorage2D(...arguments)}catch(P){Kt("WebGLState:",P)}}function pt(){try{i.texStorage3D(...arguments)}catch(P){Kt("WebGLState:",P)}}function j(){try{i.texImage2D(...arguments)}catch(P){Kt("WebGLState:",P)}}function nt(){try{i.texImage3D(...arguments)}catch(P){Kt("WebGLState:",P)}}function mt(P){return f[P]!==void 0?f[P]:i.getParameter(P)}function Pt(P,_t){f[P]!==_t&&(i.pixelStorei(P,_t),f[P]=_t)}function xt(P){Gt.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),Gt.copy(P))}function gt(P){Ot.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),Ot.copy(P))}function Nt(P,_t){let et=c.get(_t);et===void 0&&(et=new WeakMap,c.set(_t,et));let Et=et.get(P);Et===void 0&&(Et=i.getUniformBlockIndex(_t,P.name),et.set(P,Et))}function kt(P,_t){let Et=c.get(_t).get(P);l.get(_t)!==Et&&(i.uniformBlockBinding(_t,Et,P.__bindingPointIndex),l.set(_t,Et))}function Yt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},$=null,L={},h={},p=new WeakMap,_=[],A=null,m=!1,d=null,C=null,S=null,B=null,y=null,M=null,b=null,E=new te(0,0,0),D=0,T=!1,F=null,O=null,V=null,w=null,H=null,Gt.set(0,0,i.canvas.width,i.canvas.height),Ot.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Z,disable:ft,bindFramebuffer:vt,drawBuffers:dt,useProgram:Dt,setBlending:tt,setMaterial:ot,setFlipSided:st,setCullFace:ct,setLineWidth:Ct,setPolygonOffset:Tt,setScissorTest:It,activeTexture:Ut,bindTexture:I,unbindTexture:jt,compressedTexImage2D:Wt,compressedTexImage3D:v,texImage2D:j,texImage3D:nt,pixelStorei:Pt,getParameter:mt,updateUBOMapping:Nt,uniformBlockBinding:kt,texStorage2D:ht,texStorage3D:pt,texSubImage2D:g,texSubImage3D:N,compressedTexSubImage2D:z,compressedTexSubImage3D:Q,scissor:xt,viewport:gt,reset:Yt}}function X_(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ut,u=new WeakMap,f=new Set,h,p=new WeakMap,_=!1;try{_=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(v,g){return _?new OffscreenCanvas(v,g):As("canvas")}function m(v,g,N){let z=1,Q=Wt(v);if((Q.width>N||Q.height>N)&&(z=N/Math.max(Q.width,Q.height)),z<1)if(typeof HTMLImageElement!="undefined"&&v instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&v instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&v instanceof ImageBitmap||typeof VideoFrame!="undefined"&&v instanceof VideoFrame){let ht=Math.floor(z*Q.width),pt=Math.floor(z*Q.height);h===void 0&&(h=A(ht,pt));let j=g?A(ht,pt):h;return j.width=ht,j.height=pt,j.getContext("2d").drawImage(v,0,0,ht,pt),Vt("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+ht+"x"+pt+")."),j}else return"data"in v&&Vt("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),v;return v}function d(v){return v.generateMipmaps}function C(v){i.generateMipmap(v)}function S(v){return v.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:v.isWebGL3DRenderTarget?i.TEXTURE_3D:v.isWebGLArrayRenderTarget||v.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function B(v,g,N,z,Q,ht=!1){if(v!==null){if(i[v]!==void 0)return i[v];Vt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+v+"'")}let pt;z&&(pt=t.get("EXT_texture_norm16"),pt||Vt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=g;if(g===i.RED&&(N===i.FLOAT&&(j=i.R32F),N===i.HALF_FLOAT&&(j=i.R16F),N===i.UNSIGNED_BYTE&&(j=i.R8),N===i.UNSIGNED_SHORT&&pt&&(j=pt.R16_EXT),N===i.SHORT&&pt&&(j=pt.R16_SNORM_EXT)),g===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(j=i.R8UI),N===i.UNSIGNED_SHORT&&(j=i.R16UI),N===i.UNSIGNED_INT&&(j=i.R32UI),N===i.BYTE&&(j=i.R8I),N===i.SHORT&&(j=i.R16I),N===i.INT&&(j=i.R32I)),g===i.RG&&(N===i.FLOAT&&(j=i.RG32F),N===i.HALF_FLOAT&&(j=i.RG16F),N===i.UNSIGNED_BYTE&&(j=i.RG8),N===i.UNSIGNED_SHORT&&pt&&(j=pt.RG16_EXT),N===i.SHORT&&pt&&(j=pt.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(j=i.RG8UI),N===i.UNSIGNED_SHORT&&(j=i.RG16UI),N===i.UNSIGNED_INT&&(j=i.RG32UI),N===i.BYTE&&(j=i.RG8I),N===i.SHORT&&(j=i.RG16I),N===i.INT&&(j=i.RG32I)),g===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(j=i.RGB8UI),N===i.UNSIGNED_SHORT&&(j=i.RGB16UI),N===i.UNSIGNED_INT&&(j=i.RGB32UI),N===i.BYTE&&(j=i.RGB8I),N===i.SHORT&&(j=i.RGB16I),N===i.INT&&(j=i.RGB32I)),g===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),N===i.UNSIGNED_INT&&(j=i.RGBA32UI),N===i.BYTE&&(j=i.RGBA8I),N===i.SHORT&&(j=i.RGBA16I),N===i.INT&&(j=i.RGBA32I)),g===i.RGB&&(N===i.UNSIGNED_SHORT&&pt&&(j=pt.RGB16_EXT),N===i.SHORT&&pt&&(j=pt.RGB16_SNORM_EXT),N===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),N===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),g===i.RGBA){let nt=ht?Bs:ee.getTransfer(Q);N===i.FLOAT&&(j=i.RGBA32F),N===i.HALF_FLOAT&&(j=i.RGBA16F),N===i.UNSIGNED_BYTE&&(j=nt===re?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT&&pt&&(j=pt.RGBA16_EXT),N===i.SHORT&&pt&&(j=pt.RGBA16_SNORM_EXT),N===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function y(v,g){let N;return v?g===null||g===hn||g===es?N=i.DEPTH24_STENCIL8:g===un?N=i.DEPTH32F_STENCIL8:g===ts&&(N=i.DEPTH24_STENCIL8,Vt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===hn||g===es?N=i.DEPTH_COMPONENT24:g===un?N=i.DEPTH_COMPONENT32F:g===ts&&(N=i.DEPTH_COMPONENT16),N}function M(v,g){return d(v)===!0||v.isFramebufferTexture&&v.minFilter!==ve&&v.minFilter!==De?Math.log2(Math.max(g.width,g.height))+1:v.mipmaps!==void 0&&v.mipmaps.length>0?v.mipmaps.length:v.isCompressedTexture&&Array.isArray(v.image)?g.mipmaps.length:1}function b(v){let g=v.target;g.removeEventListener("dispose",b),D(g),g.isVideoTexture&&u.delete(g),g.isHTMLTexture&&f.delete(g)}function E(v){let g=v.target;g.removeEventListener("dispose",E),F(g)}function D(v){let g=n.get(v);if(g.__webglInit===void 0)return;let N=v.source,z=p.get(N);if(z){let Q=z[g.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&T(v),Object.keys(z).length===0&&p.delete(N)}n.remove(v)}function T(v){let g=n.get(v);i.deleteTexture(g.__webglTexture);let N=v.source,z=p.get(N);delete z[g.__cacheKey],a.memory.textures--}function F(v){let g=n.get(v);if(v.depthTexture&&(v.depthTexture.dispose(),n.remove(v.depthTexture)),v.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(g.__webglFramebuffer[z]))for(let Q=0;Q<g.__webglFramebuffer[z].length;Q++)i.deleteFramebuffer(g.__webglFramebuffer[z][Q]);else i.deleteFramebuffer(g.__webglFramebuffer[z]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[z])}else{if(Array.isArray(g.__webglFramebuffer))for(let z=0;z<g.__webglFramebuffer.length;z++)i.deleteFramebuffer(g.__webglFramebuffer[z]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let z=0;z<g.__webglColorRenderbuffer.length;z++)g.__webglColorRenderbuffer[z]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[z]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let N=v.textures;for(let z=0,Q=N.length;z<Q;z++){let ht=n.get(N[z]);ht.__webglTexture&&(i.deleteTexture(ht.__webglTexture),a.memory.textures--),n.remove(N[z])}n.remove(v)}let O=0;function V(){O=0}function w(){return O}function H(v){O=v}function U(){let v=O;return v>=s.maxTextures&&Vt("WebGLTextures: Trying to use "+(v+1)+" texture units while this GPU supports only "+s.maxTextures),O+=1,v}function k(v){let g=[];return g.push(v.wrapS),g.push(v.wrapT),g.push(v.wrapR||0),g.push(v.magFilter),g.push(v.minFilter),g.push(v.anisotropy),g.push(v.internalFormat),g.push(v.format),g.push(v.type),g.push(v.generateMipmaps),g.push(v.premultiplyAlpha),g.push(v.flipY),g.push(v.unpackAlignment),g.push(v.colorSpace),g.join()}function it(v,g){let N=n.get(v);if(v.isVideoTexture&&I(v),v.isRenderTargetTexture===!1&&v.isExternalTexture!==!0&&v.version>0&&N.__version!==v.version){let z=v.image;if(z===null)Vt("WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)Vt("WebGLRenderer: Texture marked for update but image is incomplete");else{ft(N,v,g);return}}else v.isExternalTexture&&(N.__webglTexture=v.sourceTexture?v.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+g)}function X(v,g){let N=n.get(v);if(v.isRenderTargetTexture===!1&&v.version>0&&N.__version!==v.version){ft(N,v,g);return}else v.isExternalTexture&&(N.__webglTexture=v.sourceTexture?v.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+g)}function $(v,g){let N=n.get(v);if(v.isRenderTargetTexture===!1&&v.version>0&&N.__version!==v.version){ft(N,v,g);return}e.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+g)}function L(v,g){let N=n.get(v);if(v.isCubeDepthTexture!==!0&&v.version>0&&N.__version!==v.version){vt(N,v,g);return}e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+g)}let lt={[Vr]:i.REPEAT,[_n]:i.CLAMP_TO_EDGE,[zr]:i.MIRRORED_REPEAT},at={[ve]:i.NEAREST,[Ch]:i.NEAREST_MIPMAP_NEAREST,[qs]:i.NEAREST_MIPMAP_LINEAR,[De]:i.LINEAR,[Aa]:i.LINEAR_MIPMAP_NEAREST,[ti]:i.LINEAR_MIPMAP_LINEAR},Gt={[Mh]:i.NEVER,[bh]:i.ALWAYS,[yh]:i.LESS,[ao]:i.LEQUAL,[vh]:i.EQUAL,[oo]:i.GEQUAL,[Sh]:i.GREATER,[Dh]:i.NOTEQUAL};function Ot(v,g){if(g.type===un&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===De||g.magFilter===Aa||g.magFilter===qs||g.magFilter===ti||g.minFilter===De||g.minFilter===Aa||g.minFilter===qs||g.minFilter===ti)&&Vt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(v,i.TEXTURE_WRAP_S,lt[g.wrapS]),i.texParameteri(v,i.TEXTURE_WRAP_T,lt[g.wrapT]),(v===i.TEXTURE_3D||v===i.TEXTURE_2D_ARRAY)&&i.texParameteri(v,i.TEXTURE_WRAP_R,lt[g.wrapR]),i.texParameteri(v,i.TEXTURE_MAG_FILTER,at[g.magFilter]),i.texParameteri(v,i.TEXTURE_MIN_FILTER,at[g.minFilter]),g.compareFunction&&(i.texParameteri(v,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(v,i.TEXTURE_COMPARE_FUNC,Gt[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===ve||g.minFilter!==qs&&g.minFilter!==ti||g.type===un&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){let N=t.get("EXT_texture_filter_anisotropic");i.texParameterf(v,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function Jt(v,g){let N=!1;v.__webglInit===void 0&&(v.__webglInit=!0,g.addEventListener("dispose",b));let z=g.source,Q=p.get(z);Q===void 0&&(Q={},p.set(z,Q));let ht=k(g);if(ht!==v.__cacheKey){Q[ht]===void 0&&(Q[ht]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),Q[ht].usedTimes++;let pt=Q[v.__cacheKey];pt!==void 0&&(Q[v.__cacheKey].usedTimes--,pt.usedTimes===0&&T(g)),v.__cacheKey=ht,v.__webglTexture=Q[ht].texture}return N}function Y(v,g,N){return Math.floor(Math.floor(v/N)/g)}function Z(v,g,N,z){let ht=v.updateRanges;if(ht.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,N,z,g.data);else{ht.sort((Pt,xt)=>Pt.start-xt.start);let pt=0;for(let Pt=1;Pt<ht.length;Pt++){let xt=ht[pt],gt=ht[Pt],Nt=xt.start+xt.count,kt=Y(gt.start,g.width,4),Yt=Y(xt.start,g.width,4);gt.start<=Nt+1&&kt===Yt&&Y(gt.start+gt.count-1,g.width,4)===kt?xt.count=Math.max(xt.count,gt.start+gt.count-xt.start):(++pt,ht[pt]=gt)}ht.length=pt+1;let j=e.getParameter(i.UNPACK_ROW_LENGTH),nt=e.getParameter(i.UNPACK_SKIP_PIXELS),mt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let Pt=0,xt=ht.length;Pt<xt;Pt++){let gt=ht[Pt],Nt=Math.floor(gt.start/4),kt=Math.ceil(gt.count/4),Yt=Nt%g.width,P=Math.floor(Nt/g.width),_t=kt,et=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Yt),e.pixelStorei(i.UNPACK_SKIP_ROWS,P),e.texSubImage2D(i.TEXTURE_2D,0,Yt,P,_t,et,N,z,g.data)}v.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,j),e.pixelStorei(i.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(i.UNPACK_SKIP_ROWS,mt)}}function ft(v,g,N){let z=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(z=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(z=i.TEXTURE_3D);let Q=Jt(v,g),ht=g.source;e.bindTexture(z,v.__webglTexture,i.TEXTURE0+N);let pt=n.get(ht);if(ht.version!==pt.__version||Q===!0){if(e.activeTexture(i.TEXTURE0+N),(typeof ImageBitmap!="undefined"&&g.image instanceof ImageBitmap)===!1){let et=ee.getPrimaries(ee.workingColorSpace),Et=g.colorSpace===wn?null:ee.getPrimaries(g.colorSpace),yt=g.colorSpace===wn||et===Et?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt)}e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let nt=m(g.image,!1,s.maxTextureSize);nt=jt(g,nt);let mt=r.convert(g.format,g.colorSpace),Pt=r.convert(g.type),xt=B(g.internalFormat,mt,Pt,g.normalized,g.colorSpace,g.isVideoTexture);Ot(z,g);let gt,Nt=g.mipmaps,kt=g.isVideoTexture!==!0,Yt=pt.__version===void 0||Q===!0,P=ht.dataReady,_t=M(g,nt);if(g.isDepthTexture)xt=y(g.format===ei,g.type),Yt&&(kt?e.texStorage2D(i.TEXTURE_2D,1,xt,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,xt,nt.width,nt.height,0,mt,Pt,null));else if(g.isDataTexture)if(Nt.length>0){kt&&Yt&&e.texStorage2D(i.TEXTURE_2D,_t,xt,Nt[0].width,Nt[0].height);for(let et=0,Et=Nt.length;et<Et;et++)gt=Nt[et],kt?P&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,gt.width,gt.height,mt,Pt,gt.data):e.texImage2D(i.TEXTURE_2D,et,xt,gt.width,gt.height,0,mt,Pt,gt.data);g.generateMipmaps=!1}else kt?(Yt&&e.texStorage2D(i.TEXTURE_2D,_t,xt,nt.width,nt.height),P&&Z(g,nt,mt,Pt)):e.texImage2D(i.TEXTURE_2D,0,xt,nt.width,nt.height,0,mt,Pt,nt.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){kt&&Yt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,_t,xt,Nt[0].width,Nt[0].height,nt.depth);for(let et=0,Et=Nt.length;et<Et;et++)if(gt=Nt[et],g.format!==en)if(mt!==null)if(kt){if(P)if(g.layerUpdates.size>0){let yt=Ol(gt.width,gt.height,g.format,g.type);for(let rt of g.layerUpdates){let Ht=gt.data.subarray(rt*yt/gt.data.BYTES_PER_ELEMENT,(rt+1)*yt/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,rt,gt.width,gt.height,1,mt,Ht)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,gt.width,gt.height,nt.depth,mt,gt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,et,xt,gt.width,gt.height,nt.depth,0,gt.data,0,0);else Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else kt?P&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,gt.width,gt.height,nt.depth,mt,Pt,gt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,et,xt,gt.width,gt.height,nt.depth,0,mt,Pt,gt.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{kt&&Yt&&e.texStorage2D(i.TEXTURE_2D,_t,xt,Nt[0].width,Nt[0].height);for(let et=0,Et=Nt.length;et<Et;et++)gt=Nt[et],g.format!==en?mt!==null?kt?P&&e.compressedTexSubImage2D(i.TEXTURE_2D,et,0,0,gt.width,gt.height,mt,gt.data):e.compressedTexImage2D(i.TEXTURE_2D,et,xt,gt.width,gt.height,0,gt.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?P&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,gt.width,gt.height,mt,Pt,gt.data):e.texImage2D(i.TEXTURE_2D,et,xt,gt.width,gt.height,0,mt,Pt,gt.data)}else if(g.isDataArrayTexture)if(kt){if(Yt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,_t,xt,nt.width,nt.height,nt.depth),P)if(g.layerUpdates.size>0){let et=Ol(nt.width,nt.height,g.format,g.type);for(let Et of g.layerUpdates){let yt=nt.data.subarray(Et*et/nt.data.BYTES_PER_ELEMENT,(Et+1)*et/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Et,nt.width,nt.height,1,mt,Pt,yt)}g.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,mt,Pt,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,xt,nt.width,nt.height,nt.depth,0,mt,Pt,nt.data);else if(g.isData3DTexture)kt?(Yt&&e.texStorage3D(i.TEXTURE_3D,_t,xt,nt.width,nt.height,nt.depth),P&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,mt,Pt,nt.data)):e.texImage3D(i.TEXTURE_3D,0,xt,nt.width,nt.height,nt.depth,0,mt,Pt,nt.data);else if(g.isFramebufferTexture){if(Yt)if(kt)e.texStorage2D(i.TEXTURE_2D,_t,xt,nt.width,nt.height);else{let et=nt.width,Et=nt.height;for(let yt=0;yt<_t;yt++)e.texImage2D(i.TEXTURE_2D,yt,xt,et,Et,0,mt,Pt,null),et>>=1,Et>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){let et=i.canvas;if(et.hasAttribute("layoutsubtree")||et.setAttribute("layoutsubtree","true"),nt.parentNode!==et){et.appendChild(nt),f.add(g),et.onpaint=Et=>{let yt=Et.changedElements;for(let rt of f)yt.includes(rt.image)&&(rt.needsUpdate=!0)},et.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,nt);else{let yt=i.RGBA,rt=i.RGBA,Ht=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,yt,rt,Ht,nt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Nt.length>0){if(kt&&Yt){let et=Wt(Nt[0]);e.texStorage2D(i.TEXTURE_2D,_t,xt,et.width,et.height)}for(let et=0,Et=Nt.length;et<Et;et++)gt=Nt[et],kt?P&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,mt,Pt,gt):e.texImage2D(i.TEXTURE_2D,et,xt,mt,Pt,gt);g.generateMipmaps=!1}else if(kt){if(Yt){let et=Wt(nt);e.texStorage2D(i.TEXTURE_2D,_t,xt,et.width,et.height)}P&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,mt,Pt,nt)}else e.texImage2D(i.TEXTURE_2D,0,xt,mt,Pt,nt);d(g)&&C(z),pt.__version=ht.version,g.onUpdate&&g.onUpdate(g)}v.__version=g.version}function vt(v,g,N){if(g.image.length!==6)return;let z=Jt(v,g),Q=g.source;e.bindTexture(i.TEXTURE_CUBE_MAP,v.__webglTexture,i.TEXTURE0+N);let ht=n.get(Q);if(Q.version!==ht.__version||z===!0){e.activeTexture(i.TEXTURE0+N);let pt=ee.getPrimaries(ee.workingColorSpace),j=g.colorSpace===wn?null:ee.getPrimaries(g.colorSpace),nt=g.colorSpace===wn||pt===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let mt=g.isCompressedTexture||g.image[0].isCompressedTexture,Pt=g.image[0]&&g.image[0].isDataTexture,xt=[];for(let rt=0;rt<6;rt++)!mt&&!Pt?xt[rt]=m(g.image[rt],!0,s.maxCubemapSize):xt[rt]=Pt?g.image[rt].image:g.image[rt],xt[rt]=jt(g,xt[rt]);let gt=xt[0],Nt=r.convert(g.format,g.colorSpace),kt=r.convert(g.type),Yt=B(g.internalFormat,Nt,kt,g.normalized,g.colorSpace),P=g.isVideoTexture!==!0,_t=ht.__version===void 0||z===!0,et=Q.dataReady,Et=M(g,gt);Ot(i.TEXTURE_CUBE_MAP,g);let yt;if(mt){P&&_t&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Et,Yt,gt.width,gt.height);for(let rt=0;rt<6;rt++){yt=xt[rt].mipmaps;for(let Ht=0;Ht<yt.length;Ht++){let Rt=yt[Ht];g.format!==en?Nt!==null?P?et&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ht,0,0,Rt.width,Rt.height,Nt,Rt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ht,Yt,Rt.width,Rt.height,0,Rt.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ht,0,0,Rt.width,Rt.height,Nt,kt,Rt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ht,Yt,Rt.width,Rt.height,0,Nt,kt,Rt.data)}}}else{if(yt=g.mipmaps,P&&_t){yt.length>0&&Et++;let rt=Wt(xt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Et,Yt,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(Pt){P?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,xt[rt].width,xt[rt].height,Nt,kt,xt[rt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,Yt,xt[rt].width,xt[rt].height,0,Nt,kt,xt[rt].data);for(let Ht=0;Ht<yt.length;Ht++){let he=yt[Ht].image[rt].image;P?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ht+1,0,0,he.width,he.height,Nt,kt,he.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ht+1,Yt,he.width,he.height,0,Nt,kt,he.data)}}else{P?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,Nt,kt,xt[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,Yt,Nt,kt,xt[rt]);for(let Ht=0;Ht<yt.length;Ht++){let Rt=yt[Ht];P?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ht+1,0,0,Nt,kt,Rt.image[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ht+1,Yt,Nt,kt,Rt.image[rt])}}}d(g)&&C(i.TEXTURE_CUBE_MAP),ht.__version=Q.version,g.onUpdate&&g.onUpdate(g)}v.__version=g.version}function dt(v,g,N,z,Q,ht){let pt=r.convert(N.format,N.colorSpace),j=r.convert(N.type),nt=B(N.internalFormat,pt,j,N.normalized,N.colorSpace),mt=n.get(g),Pt=n.get(N);if(Pt.__renderTarget=g,!mt.__hasExternalTextures){let xt=Math.max(1,g.width>>ht),gt=Math.max(1,g.height>>ht);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,ht,nt,xt,gt,g.depth,0,pt,j,null):e.texImage2D(Q,ht,nt,xt,gt,0,pt,j,null)}e.bindFramebuffer(i.FRAMEBUFFER,v),Ut(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,z,Q,Pt.__webglTexture,0,It(g)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,z,Q,Pt.__webglTexture,ht),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(v,g,N){if(i.bindRenderbuffer(i.RENDERBUFFER,v),g.depthBuffer){let z=g.depthTexture,Q=z&&z.isDepthTexture?z.type:null,ht=y(g.stencilBuffer,Q),pt=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ut(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,It(g),ht,g.width,g.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,It(g),ht,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,ht,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,pt,i.RENDERBUFFER,v)}else{let z=g.textures;for(let Q=0;Q<z.length;Q++){let ht=z[Q],pt=r.convert(ht.format,ht.colorSpace),j=r.convert(ht.type),nt=B(ht.internalFormat,pt,j,ht.normalized,ht.colorSpace);Ut(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,It(g),nt,g.width,g.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,It(g),nt,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,nt,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function zt(v,g,N){let z=g.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,v),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Q=n.get(g.depthTexture);if(Q.__renderTarget=g,(!Q.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),z){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,g.depthTexture.addEventListener("dispose",b)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),Ot(i.TEXTURE_CUBE_MAP,g.depthTexture);let mt=r.convert(g.depthTexture.format),Pt=r.convert(g.depthTexture.type),xt;g.depthTexture.format===Cn?xt=i.DEPTH_COMPONENT24:g.depthTexture.format===ei&&(xt=i.DEPTH24_STENCIL8);for(let gt=0;gt<6;gt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,xt,g.width,g.height,0,mt,Pt,null)}}else it(g.depthTexture,0);let ht=Q.__webglTexture,pt=It(g),j=z?i.TEXTURE_CUBE_MAP_POSITIVE_X+N:i.TEXTURE_2D,nt=g.depthTexture.format===ei?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===Cn)Ut(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,j,ht,0,pt):i.framebufferTexture2D(i.FRAMEBUFFER,nt,j,ht,0);else if(g.depthTexture.format===ei)Ut(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,j,ht,0,pt):i.framebufferTexture2D(i.FRAMEBUFFER,nt,j,ht,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function q(v){let g=n.get(v),N=v.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==v.depthTexture){let z=v.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),z){let Q=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,z.removeEventListener("dispose",Q)};z.addEventListener("dispose",Q),g.__depthDisposeCallback=Q}g.__boundDepthTexture=z}if(v.depthTexture&&!g.__autoAllocateDepthBuffer)if(N)for(let z=0;z<6;z++)zt(g.__webglFramebuffer[z],v,z);else{let z=v.texture.mipmaps;z&&z.length>0?zt(g.__webglFramebuffer[0],v,0):zt(g.__webglFramebuffer,v,0)}else if(N){g.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[z]),g.__webglDepthbuffer[z]===void 0)g.__webglDepthbuffer[z]=i.createRenderbuffer(),Dt(g.__webglDepthbuffer[z],v,!1);else{let Q=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=g.__webglDepthbuffer[z];i.bindRenderbuffer(i.RENDERBUFFER,ht),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ht)}}else{let z=v.texture.mipmaps;if(z&&z.length>0?e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),Dt(g.__webglDepthbuffer,v,!1);else{let Q=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ht),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ht)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function tt(v,g,N){let z=n.get(v);g!==void 0&&dt(z.__webglFramebuffer,v,v.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&q(v)}function ot(v){let g=v.texture,N=n.get(v),z=n.get(g);v.addEventListener("dispose",E);let Q=v.textures,ht=v.isWebGLCubeRenderTarget===!0,pt=Q.length>1;if(pt||(z.__webglTexture===void 0&&(z.__webglTexture=i.createTexture()),z.__version=g.version,a.memory.textures++),ht){N.__webglFramebuffer=[];for(let j=0;j<6;j++)if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer[j]=[];for(let nt=0;nt<g.mipmaps.length;nt++)N.__webglFramebuffer[j][nt]=i.createFramebuffer()}else N.__webglFramebuffer[j]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer=[];for(let j=0;j<g.mipmaps.length;j++)N.__webglFramebuffer[j]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(pt)for(let j=0,nt=Q.length;j<nt;j++){let mt=n.get(Q[j]);mt.__webglTexture===void 0&&(mt.__webglTexture=i.createTexture(),a.memory.textures++)}if(v.samples>0&&Ut(v)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let j=0;j<Q.length;j++){let nt=Q[j];N.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[j]);let mt=r.convert(nt.format,nt.colorSpace),Pt=r.convert(nt.type),xt=B(nt.internalFormat,mt,Pt,nt.normalized,nt.colorSpace,v.isXRRenderTarget===!0),gt=It(v);i.renderbufferStorageMultisample(i.RENDERBUFFER,gt,xt,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,N.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),v.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),Dt(N.__webglDepthRenderbuffer,v,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ht){e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture),Ot(i.TEXTURE_CUBE_MAP,g);for(let j=0;j<6;j++)if(g.mipmaps&&g.mipmaps.length>0)for(let nt=0;nt<g.mipmaps.length;nt++)dt(N.__webglFramebuffer[j][nt],v,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,nt);else dt(N.__webglFramebuffer[j],v,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);d(g)&&C(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(pt){for(let j=0,nt=Q.length;j<nt;j++){let mt=Q[j],Pt=n.get(mt),xt=i.TEXTURE_2D;(v.isWebGL3DRenderTarget||v.isWebGLArrayRenderTarget)&&(xt=v.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(xt,Pt.__webglTexture),Ot(xt,mt),dt(N.__webglFramebuffer,v,mt,i.COLOR_ATTACHMENT0+j,xt,0),d(mt)&&C(xt)}e.unbindTexture()}else{let j=i.TEXTURE_2D;if((v.isWebGL3DRenderTarget||v.isWebGLArrayRenderTarget)&&(j=v.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(j,z.__webglTexture),Ot(j,g),g.mipmaps&&g.mipmaps.length>0)for(let nt=0;nt<g.mipmaps.length;nt++)dt(N.__webglFramebuffer[nt],v,g,i.COLOR_ATTACHMENT0,j,nt);else dt(N.__webglFramebuffer,v,g,i.COLOR_ATTACHMENT0,j,0);d(g)&&C(j),e.unbindTexture()}v.depthBuffer&&q(v)}function st(v){let g=v.textures;for(let N=0,z=g.length;N<z;N++){let Q=g[N];if(d(Q)){let ht=S(v),pt=n.get(Q).__webglTexture;e.bindTexture(ht,pt),C(ht),e.unbindTexture()}}}let ct=[],Ct=[];function Tt(v){if(v.samples>0){if(Ut(v)===!1){let g=v.textures,N=v.width,z=v.height,Q=i.COLOR_BUFFER_BIT,ht=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=n.get(v),j=g.length>1;if(j)for(let mt=0;mt<g.length;mt++)e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer);let nt=v.texture.mipmaps;nt&&nt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let mt=0;mt<g.length;mt++){if(v.resolveDepthBuffer&&(v.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),v.stencilBuffer&&v.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,pt.__webglColorRenderbuffer[mt]);let Pt=n.get(g[mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Pt,0)}i.blitFramebuffer(0,0,N,z,0,0,N,z,Q,i.NEAREST),l===!0&&(ct.length=0,Ct.length=0,ct.push(i.COLOR_ATTACHMENT0+mt),v.depthBuffer&&v.storeMultisampledDepthBuffer===!1&&(ct.push(ht),Ct.push(ht),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ct)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ct))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let mt=0;mt<g.length;mt++){e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,pt.__webglColorRenderbuffer[mt]);let Pt=n.get(g[mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,Pt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}else if(v.depthBuffer&&v.storeMultisampledDepthBuffer===!1&&l){let g=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function It(v){return Math.min(s.maxSamples,v.samples)}function Ut(v){let g=n.get(v);return v.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function I(v){let g=a.render.frame;u.get(v)!==g&&(u.set(v,g),v.update())}function jt(v,g){let N=v.colorSpace,z=v.format,Q=v.type;return v.isCompressedTexture===!0||v.isVideoTexture===!0||N!==xs&&N!==wn&&(ee.getTransfer(N)===re?(z!==en||Q!==ke)&&Vt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Kt("WebGLTextures: Unsupported texture color space:",N)),g}function Wt(v){return typeof HTMLImageElement!="undefined"&&v instanceof HTMLImageElement?(c.width=v.naturalWidth||v.width,c.height=v.naturalHeight||v.height):typeof VideoFrame!="undefined"&&v instanceof VideoFrame?(c.width=v.displayWidth,c.height=v.displayHeight):(c.width=v.width,c.height=v.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=V,this.getTextureUnits=w,this.setTextureUnits=H,this.setTexture2D=it,this.setTexture2DArray=X,this.setTexture3D=$,this.setTextureCube=L,this.rebindTextures=tt,this.setupRenderTarget=ot,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=q,this.setupFrameBufferTexture=dt,this.useMultisampledRTT=Ut,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Y_(i,t){function e(n,s=wn){let r,a=ee.getTransfer(s);if(n===ke)return i.UNSIGNED_BYTE;if(n===ya)return i.UNSIGNED_SHORT_4_4_4_4;if(n===va)return i.UNSIGNED_SHORT_5_5_5_1;if(n===vl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Sl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ml)return i.BYTE;if(n===yl)return i.SHORT;if(n===ts)return i.UNSIGNED_SHORT;if(n===Ma)return i.INT;if(n===hn)return i.UNSIGNED_INT;if(n===un)return i.FLOAT;if(n===dn)return i.HALF_FLOAT;if(n===Dl)return i.ALPHA;if(n===bl)return i.RGB;if(n===en)return i.RGBA;if(n===Cn)return i.DEPTH_COMPONENT;if(n===ei)return i.DEPTH_STENCIL;if(n===Il)return i.RED;if(n===Sa)return i.RED_INTEGER;if(n===ni)return i.RG;if(n===Da)return i.RG_INTEGER;if(n===ba)return i.RGBA_INTEGER;if(n===Qs||n===Zs||n===js||n===$s)if(a===re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Qs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===$s)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Qs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Zs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===$s)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ia||n===Ta||n===Fa||n===wa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ia)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ta)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Fa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===wa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ra||n===Ga||n===La||n===Pa||n===Na||n===tr||n===Oa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ra||n===Ga)return a===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===La)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Pa)return r.COMPRESSED_R11_EAC;if(n===Na)return r.COMPRESSED_SIGNED_R11_EAC;if(n===tr)return r.COMPRESSED_RG11_EAC;if(n===Oa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ha||n===Ua||n===ka||n===Va||n===za||n===Ka||n===Ja||n===Wa||n===Xa||n===Ya||n===qa||n===Qa||n===Za||n===ja)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ha)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ua)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ka)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Va)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===za)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ka)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ja)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Wa)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Xa)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ya)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===qa)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Qa)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Za)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ja)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===$a||n===to||n===eo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===$a)return a===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===to)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===eo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===no||n===io||n===er||n===so)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===no)return r.COMPRESSED_RED_RGTC1_EXT;if(n===io)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===er)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===so)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===es?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var q_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Q_=`
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

}`,ic=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Ts(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new qe({vertexShader:q_,fragmentShader:Q_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new xe(new Wn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},sc=class extends ln{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,p=null,_=null,A=typeof XRWebGLBinding!="undefined",m=new ic,d={},C=e.getContextAttributes(),S=null,B=null,y=[],M=[],b=new ut,E=null,D=null,T=new Fe;T.viewport=new me;let F=new Fe;F.viewport=new me;let O=[T,F],V=new _a,w=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Z=y[Y];return Z===void 0&&(Z=new Vi,y[Y]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(Y){let Z=y[Y];return Z===void 0&&(Z=new Vi,y[Y]=Z),Z.getGripSpace()},this.getHand=function(Y){let Z=y[Y];return Z===void 0&&(Z=new Vi,y[Y]=Z),Z.getHandSpace()};function U(Y){let Z=M.indexOf(Y.inputSource);if(Z===-1)return;let ft=y[Z];ft!==void 0&&(ft.update(Y.inputSource,Y.frame,c||a),ft.dispatchEvent({type:Y.type,data:Y.inputSource}))}function k(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",it);for(let Y=0;Y<y.length;Y++){let Z=M[Y];Z!==null&&(M[Y]=null,y[Y].disconnect(Z))}w=null,H=null,m.reset();for(let Y in d)delete d[Y];if(t.setRenderTarget(S),p=null,h=null,f=null,s=null,B=null,Jt.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(b.width,b.height,!1),D!==null){let Y=D.camera;Y.fov=D.fov,Y.zoom=D.zoom,Y.updateProjectionMatrix(),D=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&Vt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&Vt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f===null&&A&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(S=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",k),s.addEventListener("inputsourceschange",it),C.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(b),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let ft=null,vt=null,dt=null;C.depth&&(dt=C.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ft=C.stencil?ei:Cn,vt=C.stencil?es:hn);let Dt={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Dt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),B=new Ue(h.textureWidth,h.textureHeight,{format:en,type:ke,depthTexture:new Kn(h.textureWidth,h.textureHeight,vt,void 0,void 0,void 0,void 0,void 0,void 0,ft),stencilBuffer:C.stencil,colorSpace:t.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let ft={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,ft),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),B=new Ue(p.framebufferWidth,p.framebufferHeight,{format:en,type:ke,colorSpace:t.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}B.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Jt.setContext(s),Jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function it(Y){for(let Z=0;Z<Y.removed.length;Z++){let ft=Y.removed[Z],vt=M.indexOf(ft);vt>=0&&(M[vt]=null,y[vt].disconnect(ft))}for(let Z=0;Z<Y.added.length;Z++){let ft=Y.added[Z],vt=M.indexOf(ft);if(vt===-1){for(let Dt=0;Dt<y.length;Dt++)if(Dt>=M.length){M.push(ft),vt=Dt;break}else if(M[Dt]===null){M[Dt]=ft,vt=Dt;break}if(vt===-1)break}let dt=y[vt];dt&&dt.connect(ft)}}let X=new R,$=new R;function L(Y,Z,ft){X.setFromMatrixPosition(Z.matrixWorld),$.setFromMatrixPosition(ft.matrixWorld);let vt=X.distanceTo($),dt=Z.projectionMatrix.elements,Dt=ft.projectionMatrix.elements,zt=dt[14]/(dt[10]-1),q=dt[14]/(dt[10]+1),tt=(dt[9]+1)/dt[5],ot=(dt[9]-1)/dt[5],st=(dt[8]-1)/dt[0],ct=(Dt[8]+1)/Dt[0],Ct=zt*st,Tt=zt*ct,It=vt/(-st+ct),Ut=It*-st;if(Z.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ut),Y.translateZ(It),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),dt[10]===-1)Y.projectionMatrix.copy(Z.projectionMatrix),Y.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{let I=zt+It,jt=q+It,Wt=Ct-Ut,v=Tt+(vt-Ut),g=tt*q/jt*I,N=ot*q/jt*I;Y.projectionMatrix.makePerspective(Wt,v,g,N,I,jt),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function lt(Y,Z){Z===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Z.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let Z=Y.near,ft=Y.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(ft=m.depthFar)),V.near=F.near=T.near=Z,V.far=F.far=T.far=ft,(w!==V.near||H!==V.far)&&(s.updateRenderState({depthNear:V.near,depthFar:V.far}),w=V.near,H=V.far),V.layers.mask=Y.layers.mask|6,T.layers.mask=V.layers.mask&-5,F.layers.mask=V.layers.mask&-3;let vt=Y.parent,dt=V.cameras;lt(V,vt);for(let Dt=0;Dt<dt.length;Dt++)lt(dt[Dt],vt);dt.length===2?L(V,T,F):V.projectionMatrix.copy(T.projectionMatrix),D===null&&Y.isPerspectiveCamera&&(D={camera:Y,fov:Y.fov,zoom:Y.zoom}),at(Y,V,vt)};function at(Y,Z,ft){ft===null?Y.matrix.copy(Z.matrixWorld):(Y.matrix.copy(ft.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Z.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Z.projectionMatrix),Y.projectionMatrixInverse.copy(Z.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ui*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(V)},this.getCameraTexture=function(Y){return d[Y]};let Gt=null;function Ot(Y,Z){if(u=Z.getViewerPose(c||a),_=Z,u!==null){let ft=u.views;p!==null&&(t.setRenderTargetFramebuffer(B,p.framebuffer),t.setRenderTarget(B));let vt=!1;ft.length!==V.cameras.length&&(V.cameras.length=0,vt=!0);for(let q=0;q<ft.length;q++){let tt=ft[q],ot=null;if(p!==null)ot=p.getViewport(tt);else{let ct=f.getViewSubImage(h,tt);ot=ct.viewport,q===0&&(t.setRenderTargetTextures(B,ct.colorTexture,ct.depthStencilTexture),t.setRenderTarget(B))}let st=O[q];st===void 0&&(st=new Fe,st.layers.enable(q),st.viewport=new me,O[q]=st),st.matrix.fromArray(tt.transform.matrix),st.matrix.decompose(st.position,st.quaternion,st.scale),st.projectionMatrix.fromArray(tt.projectionMatrix),st.projectionMatrixInverse.copy(st.projectionMatrix).invert(),st.viewport.set(ot.x,ot.y,ot.width,ot.height),q===0&&(V.matrix.copy(st.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),vt===!0&&V.cameras.push(st)}let dt=s.enabledFeatures;if(dt&&dt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&A){f=n.getBinding();let q=f.getDepthInformation(ft[0]);q&&q.isValid&&q.texture&&m.init(q,s.renderState)}if(dt&&dt.includes("camera-access")&&A){t.state.unbindTexture(),f=n.getBinding();for(let q=0;q<ft.length;q++){let tt=ft[q].camera;if(tt){let ot=d[tt];ot||(ot=new Ts,d[tt]=ot);let st=f.getCameraImage(tt);ot.sourceTexture=st}}}}for(let ft=0;ft<y.length;ft++){let vt=M[ft],dt=y[ft];vt!==null&&dt!==void 0&&dt.update(vt,Z,c||a)}Gt&&Gt(Y,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),_=null}let Jt=new cu;Jt.setAnimationLoop(Ot),this.setAnimationLoop=function(Y){Gt=Y},this.dispose=function(){}}},Z_=new pe,mu=new Xt;mu.set(-1,0,0,0,1,0,0,0,1);function j_(i,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,Ll(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,C,S,B){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(m,d):d.isMeshLambertMaterial?(r(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(m,d),f(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,B)):d.isMeshMatcapMaterial?(r(m,d),_(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),A(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,C,S):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Pe&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Pe&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let C=t.get(d),S=C.envMap,B=C.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(Z_.makeRotationFromEuler(B)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(mu),m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,C,S){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*C,m.scale.value=S*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,C){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Pe&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.retroreflectivity>0&&(m.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=C.texture,m.transmissionSamplerSize.value.set(C.width,C.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,d){d.matcap&&(m.matcap.value=d.matcap)}function A(m,d){let C=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(C.matrixWorld),m.nearDistance.value=C.shadow.camera.near,m.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function $_(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(B,y){let M=y.program;n.uniformBlockBinding(B,M)}function c(B,y){let M=s[B.id];M===void 0&&(m(B),M=u(B),s[B.id]=M,B.addEventListener("dispose",C));let b=y.program;n.updateUBOMapping(B,b);let E=t.render.frame;r[B.id]!==E&&(h(B),r[B.id]=E)}function u(B){let y=f();B.__bindingPointIndex=y;let M=i.createBuffer(),b=B.__size,E=B.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,b,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,M),M}function f(){for(let B=0;B<o;B++)if(a.indexOf(B)===-1)return a.push(B),B;return Kt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(B){let y=s[B.id],M=B.uniforms,b=B.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let E=0,D=M.length;E<D;E++){let T=M[E];if(Array.isArray(T))for(let F=0,O=T.length;F<O;F++)p(T[F],E,F,b);else p(T,E,0,b)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(B,y,M,b){if(A(B,y,M,b)===!0){let E=B.__offset,D=B.value;if(Array.isArray(D)){let T=0;for(let F=0;F<D.length;F++){let O=D[F],V=d(O);_(O,B.__data,T),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(T+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(D,B.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,E,B.__data)}}function _(B,y,M){typeof B=="number"||typeof B=="boolean"?y[0]=B:B.isMatrix3?(y[0]=B.elements[0],y[1]=B.elements[1],y[2]=B.elements[2],y[3]=0,y[4]=B.elements[3],y[5]=B.elements[4],y[6]=B.elements[5],y[7]=0,y[8]=B.elements[6],y[9]=B.elements[7],y[10]=B.elements[8],y[11]=0):ArrayBuffer.isView(B)?y.set(new B.constructor(B.buffer,B.byteOffset,y.length)):B.toArray(y,M)}function A(B,y,M,b){let E=B.value,D=y+"_"+M;if(b[D]===void 0)return typeof E=="number"||typeof E=="boolean"?b[D]=E:ArrayBuffer.isView(E)?b[D]=E.slice():b[D]=E.clone(),!0;{let T=b[D];if(typeof E=="number"||typeof E=="boolean"){if(T!==E)return b[D]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(T.equals(E)===!1)return T.copy(E),!0}}return!1}function m(B){let y=B.uniforms,M=0,b=16;for(let D=0,T=y.length;D<T;D++){let F=Array.isArray(y[D])?y[D]:[y[D]];for(let O=0,V=F.length;O<V;O++){let w=F[O],H=Array.isArray(w.value)?w.value:[w.value];for(let U=0,k=H.length;U<k;U++){let it=H[U],X=d(it),$=M%b,L=$%X.boundary,lt=$+L;M+=L,lt!==0&&b-lt<X.storage&&(M+=b-lt),w.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),w.__offset=M,M+=X.storage}}}let E=M%b;return E>0&&(M+=b-E),B.__size=M,B.__cache={},this}function d(B){let y={boundary:0,storage:0};return typeof B=="number"||typeof B=="boolean"?(y.boundary=4,y.storage=4):B.isVector2?(y.boundary=8,y.storage=8):B.isVector3||B.isColor?(y.boundary=16,y.storage=12):B.isVector4?(y.boundary=16,y.storage=16):B.isMatrix3?(y.boundary=48,y.storage=48):B.isMatrix4?(y.boundary=64,y.storage=64):B.isTexture?Vt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(B)?(y.boundary=16,y.storage=B.byteLength):Vt("WebGLRenderer: Unsupported uniform value type.",B),y}function C(B){let y=B.target;y.removeEventListener("dispose",C);let M=a.indexOf(y.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function S(){for(let B in s)i.deleteBuffer(s[B]);a=[],s={},r={}}return{bind:l,update:c,dispose:S}}var t0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),An=null;function e0(){return An===null&&(An=new Yr(t0,16,16,ni,dn),An.name="DFG_LUT",An.minFilter=De,An.magFilter=De,An.wrapS=_n,An.wrapT=_n,An.generateMipmaps=!1,An.needsUpdate=!0),An}var fo=class{constructor(t={}){let{canvas:e=Th(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:p=ke}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;let A=p,m=new Set([ba,Da,Sa]),d=new Set([ke,hn,ts,es,ya,va]),C=new Uint32Array(4),S=new Int32Array(4),B=new R,y=null,M=null,b=[],E=[],D=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=cn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,F=!1,O=null,V=null,w=null,H=null;this._outputColorSpace=Je;let U=0,k=0,it=null,X=-1,$=null,L=new me,lt=new me,at=null,Gt=new te(0),Ot=0,Jt=e.width,Y=e.height,Z=1,ft=null,vt=null,dt=new me(0,0,Jt,Y),Dt=new me(0,0,Jt,Y),zt=!1,q=new Ji,tt=!1,ot=!1,st=new pe,ct=new R,Ct=new me,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},It=!1;function Ut(){return it===null?Z:1}let I=n;function jt(x,G){return e.getContext(x,G)}let Wt,v,g,N,z,Q,ht,pt,j,nt,mt,Pt,xt,gt,Nt,kt,Yt,P,_t,et,Et,yt,rt;try{let x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",he,!1),e.addEventListener("webglcontextrestored",ie,!1),e.addEventListener("webglcontextcreationerror",nn,!1),I===null){let G="webgl2";if(I=jt(G,x),I===null)throw jt(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ht()}catch(x){throw e.removeEventListener("webglcontextlost",he,!1),e.removeEventListener("webglcontextrestored",ie,!1),e.removeEventListener("webglcontextcreationerror",nn,!1),Kt("WebGLRenderer: "+x.message),x}function Ht(){Wt=new lg(I),Wt.init(),Et=new Y_(I,Wt),v=new jm(I,Wt,t,Et),g=new W_(I,Wt),v.reversedDepthBuffer&&h&&g.buffers.depth.setReversed(!0),V=I.createFramebuffer(),w=I.createFramebuffer(),H=I.createFramebuffer(),N=new ug(I),z=new w_,Q=new X_(I,Wt,g,z,v,Et,N),ht=new og(T),pt=new ff(I),yt=new Qm(I,pt),j=new cg(I,pt,N,yt),nt=new fg(I,j,pt,yt,N),P=new dg(I,v,Q),Nt=new $m(z),mt=new F_(T,ht,Wt,v,yt,Nt),Pt=new j_(T,z),xt=new G_,gt=new U_(Wt),Yt=new qm(T,ht,g,nt,_,l),kt=new J_(T,nt,v),rt=new $_(I,N,v,g),_t=new Zm(I,Wt,N),et=new hg(I,Wt,N),N.programs=mt.programs,T.capabilities=v,T.extensions=Wt,T.properties=z,T.renderLists=xt,T.shadowMap=kt,T.state=g,T.info=N}A!==ke&&(D=new mg(A,e.width,e.height,o,s,r));let Rt=new sc(T,I);this.xr=Rt,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let x=Wt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=Wt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(x){x!==void 0&&(Z=x,this.setSize(Jt,Y,!1))},this.getSize=function(x){return x.set(Jt,Y)},this.setSize=function(x,G,W=!0){if(Rt.isPresenting){Vt("WebGLRenderer: Can't change size while VR device is presenting.");return}Jt=x,Y=G,e.width=Math.floor(x*Z),e.height=Math.floor(G*Z),W===!0&&(e.style.width=x+"px",e.style.height=G+"px"),D!==null&&D.setSize(e.width,e.height),this.setViewport(0,0,x,G)},this.getDrawingBufferSize=function(x){return x.set(Jt*Z,Y*Z).floor()},this.setDrawingBufferSize=function(x,G,W){Jt=x,Y=G,Z=W,e.width=Math.floor(x*W),e.height=Math.floor(G*W),this.setViewport(0,0,x,G)},this.setEffects=function(x){if(A===ke){Kt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let G=0;G<x.length;G++)if(x[G].isOutputPass===!0){Vt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}D.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(L)},this.getViewport=function(x){return x.copy(dt)},this.setViewport=function(x,G,W,K){x.isVector4?dt.set(x.x,x.y,x.z,x.w):dt.set(x,G,W,K),g.viewport(L.copy(dt).multiplyScalar(Z).round())},this.getScissor=function(x){return x.copy(Dt)},this.setScissor=function(x,G,W,K){x.isVector4?Dt.set(x.x,x.y,x.z,x.w):Dt.set(x,G,W,K),g.scissor(lt.copy(Dt).multiplyScalar(Z).round())},this.getScissorTest=function(){return zt},this.setScissorTest=function(x){g.setScissorTest(zt=x)},this.setOpaqueSort=function(x){ft=x},this.setTransparentSort=function(x){vt=x},this.getClearColor=function(x){return x.copy(Yt.getClearColor())},this.setClearColor=function(){Yt.setClearColor(...arguments)},this.getClearAlpha=function(){return Yt.getClearAlpha()},this.setClearAlpha=function(){Yt.setClearAlpha(...arguments)},this.clear=function(x=!0,G=!0,W=!0){let K=0;if(x){let J=!1;if(it!==null){let Mt=it.texture.format;J=m.has(Mt)}if(J){let Mt=it.texture.type,bt=d.has(Mt),At=Yt.getClearColor(),Ft=Yt.getClearAlpha(),Lt=At.r,qt=At.g,$t=At.b;bt?(C[0]=Lt,C[1]=qt,C[2]=$t,C[3]=Ft,I.clearBufferuiv(I.COLOR,0,C)):(S[0]=Lt,S[1]=qt,S[2]=$t,S[3]=Ft,I.clearBufferiv(I.COLOR,0,S))}else K|=I.COLOR_BUFFER_BIT}G&&(K|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(K|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&I.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(x){x.setRenderer(this),O=x},this.dispose=function(){e.removeEventListener("webglcontextlost",he,!1),e.removeEventListener("webglcontextrestored",ie,!1),e.removeEventListener("webglcontextcreationerror",nn,!1),Yt.dispose(),xt.dispose(),gt.dispose(),z.dispose(),ht.dispose(),nt.dispose(),yt.dispose(),rt.dispose(),mt.dispose(),Rt.dispose(),Rt.removeEventListener("sessionstart",fc),Rt.removeEventListener("sessionend",pc),ai.stop()};function he(x){x.preventDefault(),Fl("WebGLRenderer: Context Lost."),F=!0}function ie(){Fl("WebGLRenderer: Context Restored."),F=!1;let x=N.autoReset,G=kt.enabled,W=kt.autoUpdate,K=kt.needsUpdate,J=kt.type;Ht(),N.autoReset=x,kt.enabled=G,kt.autoUpdate=W,kt.needsUpdate=K,kt.type=J}function nn(x){Kt("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function pn(x){let G=x.target;G.removeEventListener("dispose",pn),Pu(G)}function Pu(x){Nu(x),z.remove(x)}function Nu(x){let G=z.get(x).programs;G!==void 0&&(G.forEach(function(W){mt.releaseProgram(W)}),x.isShaderMaterial&&mt.releaseShaderCache(x))}this.renderBufferDirect=function(x,G,W,K,J,Mt){G===null&&(G=Tt);let bt=J.isMesh&&J.matrixWorld.determinantAffine()<0,At=Uu(x,G,W,K,J);g.setMaterial(K,bt);let Ft=W.index,Lt=1;if(K.wireframe===!0){if(Ft=j.getWireframeAttribute(W),Ft===void 0)return;Lt=2}let qt=W.drawRange,$t=W.attributes.position,wt=qt.start*Lt,se=(qt.start+qt.count)*Lt;Mt!==null&&(wt=Math.max(wt,Mt.start*Lt),se=Math.min(se,(Mt.start+Mt.count)*Lt)),Ft!==null?(wt=Math.max(wt,0),se=Math.min(se,Ft.count)):$t!=null&&(wt=Math.max(wt,0),se=Math.min(se,$t.count));let Ee=se-wt;if(Ee<0||Ee===1/0)return;yt.setup(J,K,At,W,Ft);let de,le=_t;if(Ft!==null&&(de=pt.get(Ft),le=et,le.setIndex(de)),J.isMesh)K.wireframe===!0?(g.setLineWidth(K.wireframeLinewidth*Ut()),le.setMode(I.LINES)):le.setMode(I.TRIANGLES);else if(J.isLine){let be=K.linewidth;be===void 0&&(be=1),g.setLineWidth(be*Ut()),J.isLineSegments?le.setMode(I.LINES):J.isLineLoop?le.setMode(I.LINE_LOOP):le.setMode(I.LINE_STRIP)}else J.isPoints?le.setMode(I.POINTS):J.isSprite&&le.setMode(I.TRIANGLES);if(J.isBatchedMesh)if(Wt.get("WEBGL_multi_draw"))le.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{let be=J._multiDrawStarts,St=J._multiDrawCounts,Ge=J._multiDrawCount,ne=Ft?pt.get(Ft).bytesPerElement:1,Ze=z.get(K).currentProgram.getUniforms();for(let mn=0;mn<Ge;mn++)Ze.setValue(I,"_gl_DrawID",mn),le.render(be[mn]/ne,St[mn])}else if(J.isInstancedMesh)le.renderInstances(wt,Ee,J.count);else if(W.isInstancedBufferGeometry){let be=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,St=Math.min(W.instanceCount,be);le.renderInstances(wt,Ee,St)}else le.render(wt,Ee)};function dc(x,G,W,K){O!==null&&x.isNodeMaterial&&O.setObject(K,x),tt===!0&&Nt.setState(x,W,!1),x.transparent===!0&&x.side===xn&&x.forceSinglePass===!1?(x.side=Pe,x.needsUpdate=!0,ur(x,G,K),x.side=jn,x.needsUpdate=!0,ur(x,G,K),x.side=xn):ur(x,G,K)}this.compile=function(x,G,W=null){W===null&&(W=x),O!==null&&O.renderStart(x,G,W),M=gt.get(W),M.init(G),E.push(M),W.traverseVisible(function(J){J.isLight&&J.layers.test(G.layers)&&(M.pushLight(J),J.castShadow&&M.pushShadow(J))}),x!==W&&x.traverseVisible(function(J){J.isLight&&J.layers.test(G.layers)&&(M.pushLight(J),J.castShadow&&M.pushShadow(J))}),M.setupLights(),O!==null&&O.updateLights(M.state.lightsArray),ot=this.localClippingEnabled,tt=Nt.init(this.clippingPlanes,ot),tt===!0&&Nt.setGlobalState(this.clippingPlanes,G),O!==null&&kt.render(M.state.shadowsArray,W,G);let K=new Set;return x.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;let Mt=J.material;if(Mt)if(Array.isArray(Mt))for(let bt=0;bt<Mt.length;bt++){let At=Mt[bt];dc(At,W,G,J),K.add(At)}else dc(Mt,W,G,J),K.add(Mt)}),M=E.pop(),O!==null&&O.renderEnd(),K},this.compileAsync=function(x,G,W=null){let K=this.compile(x,G,W);return new Promise(J=>{function Mt(){if(K.forEach(function(bt){let Ft=z.get(bt).currentProgram;(Ft===void 0||Ft.isReady())&&K.delete(bt)}),K.size===0){J(x);return}setTimeout(Mt,10)}Wt.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let So=null;function Ou(x){So&&So(x)}function fc(){ai.stop()}function pc(){ai.start()}let ai=new cu;ai.setAnimationLoop(Ou),typeof self!="undefined"&&ai.setContext(self),this.setAnimationLoop=function(x){So=x,Rt.setAnimationLoop(x),x===null?ai.stop():ai.start()},Rt.addEventListener("sessionstart",fc),Rt.addEventListener("sessionend",pc),this.render=function(x,G){if(G!==void 0&&G.isCamera!==!0){Kt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;O!==null&&O.renderStart(x,G);let W=Rt.enabled===!0&&Rt.isPresenting===!0,K=D!==null&&(it===null||W)&&D.begin(T,it);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),Rt.enabled===!0&&Rt.isPresenting===!0&&(D===null||D.isCompositing()===!1)&&(Rt.cameraAutoUpdate===!0&&Rt.updateCamera(G),G=Rt.getCamera()),x.isScene===!0&&x.onBeforeRender(T,x,G,it),M=gt.get(x,E.length),M.init(G),M.state.textureUnits=Q.getTextureUnits(),E.push(M),st.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),q.setFromProjectionMatrix(st,on,G.reversedDepth),ot=this.localClippingEnabled,tt=Nt.init(this.clippingPlanes,ot),y=xt.get(x,b.length),y.init(),b.push(y),Rt.enabled===!0&&Rt.isPresenting===!0){let bt=T.xr.getDepthSensingMesh();bt!==null&&Do(bt,G,-1/0,T.sortObjects)}Do(x,G,0,T.sortObjects),y.finish(),O!==null&&O.updateLights(M.state.lightsArray),T.sortObjects===!0&&y.sort(ft,vt),It=Rt.enabled===!1||Rt.isPresenting===!1||Rt.hasDepthSensing()===!1,It&&Yt.addToRenderList(y,x),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),tt===!0&&Nt.beginShadows();let J=M.state.shadowsArray;if(kt.render(J,x,G),tt===!0&&Nt.endShadows(),(K&&D.hasRenderPass())===!1){let bt=y.opaque,At=y.transmissive;if(M.setupLights(),G.isArrayCamera){let Ft=G.cameras;if(At.length>0)for(let Lt=0,qt=Ft.length;Lt<qt;Lt++){let $t=Ft[Lt];gc(bt,At,x,$t)}It&&Yt.render(x);for(let Lt=0,qt=Ft.length;Lt<qt;Lt++){let $t=Ft[Lt];mc(y,x,$t,$t.viewport)}}else At.length>0&&gc(bt,At,x,G),It&&Yt.render(x),mc(y,x,G)}it!==null&&k===0&&(Q.updateMultisampleRenderTarget(it),Q.updateRenderTargetMipmap(it)),K&&D.end(T),x.isScene===!0&&x.onAfterRender(T,x,G),yt.resetDefaultState(),X=-1,$=null,E.pop(),E.length>0?(M=E[E.length-1],Q.setTextureUnits(M.state.textureUnits),tt===!0&&Nt.setGlobalState(T.clippingPlanes,M.state.camera)):M=null,b.pop(),b.length>0?y=b[b.length-1]:y=null,O!==null&&O.renderEnd()};function Do(x,G,W,K){if(x.visible===!1)return;if(x.layers.test(G.layers)){if(x.isGroup)W=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(G);else if(x.isLightProbeGrid)M.pushLightProbeGrid(x);else if(x.isLight)M.pushLight(x),x.castShadow&&M.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||x.intersectsFrustum(q)){K&&Ct.setFromMatrixPosition(x.matrixWorld).applyMatrix4(st);let bt=nt.update(x),At=x.material;At.visible&&y.push(x,bt,At,W,Ct.z,null,G)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||x.intersectsFrustum(q))){let bt=nt.update(x),At=x.material;if(K&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Ct.copy(x.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),Ct.copy(bt.boundingSphere.center)),Ct.applyMatrix4(x.matrixWorld).applyMatrix4(st)),Array.isArray(At)){let Ft=bt.groups;for(let Lt=0,qt=Ft.length;Lt<qt;Lt++){let $t=Ft[Lt],wt=At[$t.materialIndex];wt&&wt.visible&&y.push(x,bt,wt,W,Ct.z,$t,G)}}else At.visible&&y.push(x,bt,At,W,Ct.z,null,G)}}let Mt=x.children;for(let bt=0,At=Mt.length;bt<At;bt++)Do(Mt[bt],G,W,K)}function mc(x,G,W,K){let{opaque:J,transmissive:Mt,transparent:bt}=x;M.setupLightsView(W),tt===!0&&Nt.setGlobalState(T.clippingPlanes,W),K&&g.viewport(L.copy(K)),J.length>0&&hr(J,G,W),Mt.length>0&&hr(Mt,G,W),bt.length>0&&hr(bt,G,W),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function gc(x,G,W,K){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[K.id]===void 0){let wt=Wt.has("EXT_color_buffer_half_float")||Wt.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[K.id]=new Ue(1,1,{generateMipmaps:!0,type:wt?dn:ke,minFilter:ti,samples:Math.max(4,v.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ee.workingColorSpace})}let Mt=M.state.transmissionRenderTarget[K.id],bt=K.viewport||L;Mt.setSize(bt.z*T.transmissionResolutionScale,bt.w*T.transmissionResolutionScale);let At=T.getRenderTarget(),Ft=T.getActiveCubeFace(),Lt=T.getActiveMipmapLevel();T.setRenderTarget(Mt),T.getClearColor(Gt),Ot=T.getClearAlpha(),Ot<1&&T.setClearColor(16777215,.5),T.clear(),It&&Yt.render(W);let qt=T.toneMapping;T.toneMapping=cn;let $t=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),M.setupLightsView(K),tt===!0&&Nt.setGlobalState(T.clippingPlanes,K),hr(x,W,K),Q.updateMultisampleRenderTarget(Mt),Q.updateRenderTargetMipmap(Mt),Wt.has("WEBGL_multisampled_render_to_texture")===!1){let wt=!1;for(let se=0,Ee=G.length;se<Ee;se++){let de=G[se],{object:le,geometry:be,material:St,group:Ge}=de;if(St.side===xn&&le.layers.test(K.layers)){let ne=St.side;St.side=Pe,St.needsUpdate=!0,_c(le,W,K,be,St,Ge),St.side=ne,St.needsUpdate=!0,wt=!0}}wt===!0&&(Q.updateMultisampleRenderTarget(Mt),Q.updateRenderTargetMipmap(Mt))}T.setRenderTarget(At,Ft,Lt),T.setClearColor(Gt,Ot),$t!==void 0&&(K.viewport=$t),T.toneMapping=qt}function hr(x,G,W){let K=G.isScene===!0?G.overrideMaterial:null;for(let J=0,Mt=x.length;J<Mt;J++){let bt=x[J],{object:At,geometry:Ft,group:Lt}=bt,qt=bt.material;qt.allowOverride===!0&&K!==null&&(qt=K),At.layers.test(W.layers)&&_c(At,G,W,Ft,qt,Lt)}}function _c(x,G,W,K,J,Mt){O!==null&&J.isNodeMaterial&&O.setObject(x,J),x.onBeforeRender(T,G,W,K,J,Mt),x.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),J.onBeforeRender(T,G,W,K,x,Mt),J.transparent===!0&&J.side===xn&&J.forceSinglePass===!1?(J.side=Pe,J.needsUpdate=!0,T.renderBufferDirect(W,G,K,J,x,Mt),J.side=jn,J.needsUpdate=!0,T.renderBufferDirect(W,G,K,J,x,Mt),J.side=xn):T.renderBufferDirect(W,G,K,J,x,Mt),x.onAfterRender(T,G,W,K,J,Mt)}function ur(x,G,W){G.isScene!==!0&&(G=Tt);let K=z.get(x),J=M.state.lights,Mt=M.state.shadowsArray,bt=J.state.version,At=mt.getParameters(x,J.state,Mt,G,W,M.state.lightProbeGridArray),Ft=mt.getProgramCacheKey(At),Lt=K.programs;K.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?G.environment:null,K.fog=G.fog;let qt=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;K.envMap=ht.get(x.envMap||K.environment,qt),K.envMapRotation=K.environment!==null&&x.envMap===null?G.environmentRotation:x.envMapRotation,Lt===void 0&&(x.addEventListener("dispose",pn),Lt=new Map,K.programs=Lt);let $t=Lt.get(Ft);if($t!==void 0){if(K.currentProgram===$t&&K.lightsStateVersion===bt)return Cc(x,At),$t}else At.uniforms=mt.getUniforms(x),O!==null&&x.isNodeMaterial&&O.build(x,W,At),x.onBeforeCompile(At,T),$t=mt.acquireProgram(At,Ft),Lt.set(Ft,$t),K.uniforms=At.uniforms;let wt=K.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(wt.clippingPlanes=Nt.uniform),Cc(x,At),K.needsLights=Vu(x),K.lightsStateVersion=bt,K.needsLights&&(wt.ambientLightColor.value=J.state.ambient,wt.lightProbe.value=J.state.probe,wt.sunLights.value=J.state.sun,wt.sunLightShadows.value=J.state.sunShadow,wt.directionalLights.value=J.state.directional,wt.directionalLightShadows.value=J.state.directionalShadow,wt.spotLights.value=J.state.spot,wt.spotLightShadows.value=J.state.spotShadow,wt.rectAreaLights.value=J.state.rectArea,wt.ltc_1.value=J.state.rectAreaLTC1,wt.ltc_2.value=J.state.rectAreaLTC2,wt.pointLights.value=J.state.point,wt.pointLightShadows.value=J.state.pointShadow,wt.hemisphereLights.value=J.state.hemi,wt.sunShadowMatrix.value=J.state.sunShadowMatrix,wt.sunShadowCascade.value=J.state.sunShadowCascade,wt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,wt.spotLightMatrix.value=J.state.spotLightMatrix,wt.spotLightMap.value=J.state.spotLightMap,wt.pointShadowMatrix.value=J.state.pointShadowMatrix),K.lightProbeGrid=M.state.lightProbeGridArray.length>0,K.currentProgram=$t,K.uniformsList=null,$t}function Ec(x){if(x.uniformsList===null){let G=x.currentProgram.getUniforms();x.uniformsList=ss.seqWithValue(G.seq,x.uniforms)}return x.uniformsList}function Cc(x,G){let W=z.get(x);W.outputColorSpace=G.outputColorSpace,W.batching=G.batching,W.batchingColor=G.batchingColor,W.instancing=G.instancing,W.instancingColor=G.instancingColor,W.instancingMorph=G.instancingMorph,W.skinning=G.skinning,W.morphTargets=G.morphTargets,W.morphNormals=G.morphNormals,W.morphColors=G.morphColors,W.morphTargetsCount=G.morphTargetsCount,W.numClippingPlanes=G.numClippingPlanes,W.numIntersection=G.numClipIntersection,W.vertexAlphas=G.vertexAlphas,W.vertexTangents=G.vertexTangents,W.toneMapping=G.toneMapping}function Hu(x,G){if(x.length===0)return null;if(x.length===1)return x[0].texture!==null?x[0]:null;B.setFromMatrixPosition(G.matrixWorld);for(let W=0,K=x.length;W<K;W++){let J=x[W];if(J.texture!==null&&J.boundingBox.containsPoint(B))return J}return null}function Uu(x,G,W,K,J){G.isScene!==!0&&(G=Tt),Q.resetTextureUnits();let Mt=G.fog,bt=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?G.environment:null,At=it===null?T.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:ee.workingColorSpace,Ft=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,Lt=ht.get(K.envMap||bt,Ft),qt=K.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,$t=!!W.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),wt=!!W.morphAttributes.position,se=!!W.morphAttributes.normal,Ee=!!W.morphAttributes.color,de=cn;K.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(de=T.toneMapping);let le=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,be=le!==void 0?le.length:0,St=z.get(K),Ge=M.state.lights;if(tt===!0&&(ot===!0||x!==$)){let ue=x===$&&K.id===X;Nt.setState(K,x,ue)}let ne=!1;K.version===St.__version?(St.needsLights&&St.lightsStateVersion!==Ge.state.version||St.outputColorSpace!==At||J.isBatchedMesh&&St.batching===!1||!J.isBatchedMesh&&St.batching===!0||J.isBatchedMesh&&St.batchingColor===!0&&J._colorsTexture===null||J.isBatchedMesh&&St.batchingColor===!1&&J._colorsTexture!==null||J.isInstancedMesh&&St.instancing===!1||!J.isInstancedMesh&&St.instancing===!0||J.isSkinnedMesh&&St.skinning===!1||!J.isSkinnedMesh&&St.skinning===!0||J.isInstancedMesh&&St.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&St.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&St.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&St.instancingMorph===!1&&J.morphTexture!==null||St.envMap!==Lt||K.fog===!0&&St.fog!==Mt||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==Nt.numPlanes||St.numIntersection!==Nt.numIntersection)||St.vertexAlphas!==qt||St.vertexTangents!==$t||St.morphTargets!==wt||St.morphNormals!==se||St.morphColors!==Ee||St.toneMapping!==de||St.morphTargetsCount!==be||!!St.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(ne=!0):(ne=!0,St.__version=K.version);let Ze=St.currentProgram;ne===!0&&(Ze=ur(K,G,J),O&&K.isNodeMaterial&&O.onUpdateProgram(K,Ze,St));let mn=!1,Rn=!1,xi=!1,oe=Ze.getUniforms(),_e=St.uniforms;if(g.useProgram(Ze.program)&&(mn=!0,Rn=!0,xi=!0),K.id!==X&&(X=K.id,Rn=!0),St.needsLights){let ue=Hu(M.state.lightProbeGridArray,J);St.lightProbeGrid!==ue&&(St.lightProbeGrid=ue,Rn=!0)}if(mn||$!==x){g.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),oe.setValue(I,"projectionMatrix",x.projectionMatrix),oe.setValue(I,"viewMatrix",x.matrixWorldInverse);let Ln=oe.map.cameraPosition;Ln!==void 0&&Ln.setValue(I,ct.setFromMatrixPosition(x.matrixWorld)),v.logarithmicDepthBuffer&&oe.setValue(I,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&oe.setValue(I,"isOrthographic",x.isOrthographicCamera===!0),$!==x&&($=x,Rn=!0,xi=!0)}if(St.needsLights&&(Ge.state.sunShadowMap.length>0&&oe.setValue(I,"sunShadowMap",Ge.state.sunShadowMap,Q),Ge.state.directionalShadowMap.length>0&&oe.setValue(I,"directionalShadowMap",Ge.state.directionalShadowMap,Q),Ge.state.spotShadowMap.length>0&&oe.setValue(I,"spotShadowMap",Ge.state.spotShadowMap,Q),Ge.state.pointShadowMap.length>0&&oe.setValue(I,"pointShadowMap",Ge.state.pointShadowMap,Q)),J.isSkinnedMesh){oe.setOptional(I,J,"bindMatrix"),oe.setOptional(I,J,"bindMatrixInverse");let ue=J.skeleton;ue&&(ue.boneTexture===null&&ue.computeBoneTexture(),oe.setValue(I,"boneTexture",ue.boneTexture,Q))}J.isBatchedMesh&&(oe.setOptional(I,J,"batchingTexture"),oe.setValue(I,"batchingTexture",J._matricesTexture,Q),oe.setOptional(I,J,"batchingIdTexture"),oe.setValue(I,"batchingIdTexture",J._indirectTexture,Q),oe.setOptional(I,J,"batchingColorTexture"),J._colorsTexture!==null&&oe.setValue(I,"batchingColorTexture",J._colorsTexture,Q));let Gn=W.morphAttributes;if((Gn.position!==void 0||Gn.normal!==void 0||Gn.color!==void 0)&&P.update(J,W,Ze),(Rn||St.receiveShadow!==J.receiveShadow)&&(St.receiveShadow=J.receiveShadow,oe.setValue(I,"receiveShadow",J.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&G.environment!==null&&(_e.envMapIntensity.value=G.environmentIntensity),_e.dfgLUT!==void 0&&(_e.dfgLUT.value=e0()),Rn){if(oe.setValue(I,"toneMappingExposure",T.toneMappingExposure),St.needsLights&&ku(_e,xi),Mt&&K.fog===!0&&Pt.refreshFogUniforms(_e,Mt),Pt.refreshMaterialUniforms(_e,K,Z,Y,M.state.transmissionRenderTarget[x.id]),St.needsLights&&St.lightProbeGrid){let ue=St.lightProbeGrid;_e.probesSH.value=ue.texture,_e.probesMin.value.copy(ue.boundingBox.min),_e.probesMax.value.copy(ue.boundingBox.max),_e.probesResolution.value.copy(ue.resolution)}ss.upload(I,Ec(St),_e,Q)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(ss.upload(I,Ec(St),_e,Q),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&oe.setValue(I,"center",J.center),oe.setValue(I,"modelViewMatrix",J.modelViewMatrix),oe.setValue(I,"normalMatrix",J.normalMatrix),oe.setValue(I,"modelMatrix",J.matrixWorld),K.uniformsGroups!==void 0){let ue=K.uniformsGroups;for(let Ln=0,Bi=ue.length;Ln<Bi;Ln++){let Bc=ue[Ln];rt.update(Bc,Ze),rt.bind(Bc,Ze)}}return Ze}function ku(x,G){x.ambientLightColor.needsUpdate=G,x.lightProbe.needsUpdate=G,x.sunLights.needsUpdate=G,x.sunLightShadows.needsUpdate=G,x.directionalLights.needsUpdate=G,x.directionalLightShadows.needsUpdate=G,x.pointLights.needsUpdate=G,x.pointLightShadows.needsUpdate=G,x.spotLights.needsUpdate=G,x.spotLightShadows.needsUpdate=G,x.rectAreaLights.needsUpdate=G,x.hemisphereLights.needsUpdate=G}function Vu(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return it},this.setRenderTargetTextures=function(x,G,W){let K=z.get(x);K.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),z.get(x.texture).__webglTexture=G,z.get(x.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:W,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,G){let W=z.get(x);W.__webglFramebuffer=G,W.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(x,G=0,W=0){it=x,U=G,k=W;let K=null,J=!1,Mt=!1;if(x){let At=z.get(x);if(At.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(I.FRAMEBUFFER,At.__webglFramebuffer),L.copy(x.viewport),lt.copy(x.scissor),at=x.scissorTest,g.viewport(L),g.scissor(lt),g.setScissorTest(at),X=-1;return}else if(At.__webglFramebuffer===void 0)Q.setupRenderTarget(x);else if(At.__hasExternalTextures)Q.rebindTextures(x,z.get(x.texture).__webglTexture,z.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let qt=x.depthTexture;if(At.__boundDepthTexture!==qt){if(qt!==null&&z.has(qt)&&(x.width!==qt.image.width||x.height!==qt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(x)}}let Ft=x.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(Mt=!0);let Lt=z.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Lt[G])?K=Lt[G][W]:K=Lt[G],J=!0):x.samples>0&&Q.useMultisampledRTT(x)===!1?K=z.get(x).__webglMultisampledFramebuffer:Array.isArray(Lt)?K=Lt[W]:K=Lt,L.copy(x.viewport),lt.copy(x.scissor),at=x.scissorTest}else L.copy(dt).multiplyScalar(Z).floor(),lt.copy(Dt).multiplyScalar(Z).floor(),at=zt;if(W!==0&&(K=V),g.bindFramebuffer(I.FRAMEBUFFER,K)&&g.drawBuffers(x,K),g.viewport(L),g.scissor(lt),g.setScissorTest(at),J){let At=z.get(x.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+G,At.__webglTexture,W)}else if(Mt){let At=G;for(let Ft=0;Ft<x.textures.length;Ft++){let Lt=z.get(x.textures[Ft]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Ft,Lt.__webglTexture,W,At)}}else if(x!==null&&W!==0){let At=z.get(x.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,At.__webglTexture,W)}X=-1};function xc(x){let G=z.get(x);return(G.__readFormat!==x.format||G.__readType!==x.type)&&(G.__readFormat=x.format,G.__readType=x.type,G.__formatReadable=v.textureFormatReadable(x.format),G.__typeReadable=v.textureTypeReadable(x.type)),G}this.readRenderTargetPixels=function(x,G,W,K,J,Mt,bt,At=0){if(!(x&&x.isWebGLRenderTarget)){Kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ft=z.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&bt!==void 0&&(Ft=Ft[bt]),Ft){g.bindFramebuffer(I.FRAMEBUFFER,Ft);try{let Lt=x.textures[At],qt=Lt.format,$t=Lt.type;x.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+At);let wt=xc(Lt);if(wt.__formatReadable===!1){Kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(wt.__typeReadable===!1){Kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=x.width-K&&W>=0&&W<=x.height-J&&I.readPixels(G,W,K,J,Et.convert(qt),Et.convert($t),Mt)}finally{let Lt=it!==null?z.get(it).__webglFramebuffer:null;g.bindFramebuffer(I.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(x,G,W,K,J,Mt,bt,At=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ft=z.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&bt!==void 0&&(Ft=Ft[bt]),Ft)if(G>=0&&G<=x.width-K&&W>=0&&W<=x.height-J){g.bindFramebuffer(I.FRAMEBUFFER,Ft);let Lt=x.textures[At],qt=Lt.format,$t=Lt.type;x.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+At);let wt=xc(Lt);if(wt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(wt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let se=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,se),I.bufferData(I.PIXEL_PACK_BUFFER,Mt.byteLength,I.STREAM_READ),I.readPixels(G,W,K,J,Et.convert(qt),Et.convert($t),0),I.bindBuffer(I.PIXEL_PACK_BUFFER,null);let Ee=it!==null?z.get(it).__webglFramebuffer:null;g.bindFramebuffer(I.FRAMEBUFFER,Ee);let de=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await wh(I,de,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,se),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,Mt),I.bindBuffer(I.PIXEL_PACK_BUFFER,null),I.deleteBuffer(se),I.deleteSync(de),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,G=null,W=0){let K=Math.pow(2,-W),J=Math.floor(x.image.width*K),Mt=Math.floor(x.image.height*K),bt=G!==null?G.x:0,At=G!==null?G.y:0;Q.setTexture2D(x,0),I.copyTexSubImage2D(I.TEXTURE_2D,W,0,0,bt,At,J,Mt),g.unbindTexture()},this.copyTextureToTexture=function(x,G,W=null,K=null,J=0,Mt=0){let bt,At,Ft,Lt,qt,$t,wt,se,Ee,de=x.isCompressedTexture?x.mipmaps[Mt]:x.image;if(W!==null)bt=W.max.x-W.min.x,At=W.max.y-W.min.y,Ft=W.isBox3?W.max.z-W.min.z:1,Lt=W.min.x,qt=W.min.y,$t=W.isBox3?W.min.z:0;else{let _e=Math.pow(2,-J);bt=Math.floor(de.width*_e),At=Math.floor(de.height*_e),x.isDataArrayTexture?Ft=de.depth:x.isData3DTexture?Ft=Math.floor(de.depth*_e):Ft=1,Lt=0,qt=0,$t=0}K!==null?(wt=K.x,se=K.y,Ee=K.z):(wt=0,se=0,Ee=0);let le=Et.convert(G.format),be=Et.convert(G.type),St;G.isData3DTexture?(Q.setTexture3D(G,0),St=I.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(Q.setTexture2DArray(G,0),St=I.TEXTURE_2D_ARRAY):(Q.setTexture2D(G,0),St=I.TEXTURE_2D),g.activeTexture(I.TEXTURE0),g.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,G.flipY),g.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),g.pixelStorei(I.UNPACK_ALIGNMENT,G.unpackAlignment);let Ge=g.getParameter(I.UNPACK_ROW_LENGTH),ne=g.getParameter(I.UNPACK_IMAGE_HEIGHT),Ze=g.getParameter(I.UNPACK_SKIP_PIXELS),mn=g.getParameter(I.UNPACK_SKIP_ROWS),Rn=g.getParameter(I.UNPACK_SKIP_IMAGES);g.pixelStorei(I.UNPACK_ROW_LENGTH,de.width),g.pixelStorei(I.UNPACK_IMAGE_HEIGHT,de.height),g.pixelStorei(I.UNPACK_SKIP_PIXELS,Lt),g.pixelStorei(I.UNPACK_SKIP_ROWS,qt),g.pixelStorei(I.UNPACK_SKIP_IMAGES,$t);let xi=x.isDataArrayTexture||x.isData3DTexture,oe=G.isDataArrayTexture||G.isData3DTexture;if(x.isDepthTexture){let _e=z.get(x),Gn=z.get(G),ue=z.get(_e.__renderTarget),Ln=z.get(Gn.__renderTarget);g.bindFramebuffer(I.READ_FRAMEBUFFER,ue.__webglFramebuffer),g.bindFramebuffer(I.DRAW_FRAMEBUFFER,Ln.__webglFramebuffer);for(let Bi=0;Bi<Ft;Bi++)xi&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,z.get(x).__webglTexture,J,$t+Bi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,z.get(G).__webglTexture,Mt,Ee+Bi)),I.blitFramebuffer(Lt,qt,bt,At,wt,se,bt,At,I.DEPTH_BUFFER_BIT,I.NEAREST);g.bindFramebuffer(I.READ_FRAMEBUFFER,null),g.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(J!==0||x.isRenderTargetTexture||z.has(x)){let _e=z.get(x),Gn=z.get(G);g.bindFramebuffer(I.READ_FRAMEBUFFER,w),g.bindFramebuffer(I.DRAW_FRAMEBUFFER,H);for(let ue=0;ue<Ft;ue++)xi?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,_e.__webglTexture,J,$t+ue):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,_e.__webglTexture,J),oe?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Gn.__webglTexture,Mt,Ee+ue):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Gn.__webglTexture,Mt),J!==0?I.blitFramebuffer(Lt,qt,bt,At,wt,se,bt,At,I.COLOR_BUFFER_BIT,I.NEAREST):oe?I.copyTexSubImage3D(St,Mt,wt,se,Ee+ue,Lt,qt,bt,At):I.copyTexSubImage2D(St,Mt,wt,se,Lt,qt,bt,At);g.bindFramebuffer(I.READ_FRAMEBUFFER,null),g.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else oe?x.isDataTexture||x.isData3DTexture?I.texSubImage3D(St,Mt,wt,se,Ee,bt,At,Ft,le,be,de.data):G.isCompressedArrayTexture?I.compressedTexSubImage3D(St,Mt,wt,se,Ee,bt,At,Ft,le,de.data):I.texSubImage3D(St,Mt,wt,se,Ee,bt,At,Ft,le,be,de):x.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,Mt,wt,se,bt,At,le,be,de.data):x.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,Mt,wt,se,de.width,de.height,le,de.data):I.texSubImage2D(I.TEXTURE_2D,Mt,wt,se,bt,At,le,be,de);g.pixelStorei(I.UNPACK_ROW_LENGTH,Ge),g.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ne),g.pixelStorei(I.UNPACK_SKIP_PIXELS,Ze),g.pixelStorei(I.UNPACK_SKIP_ROWS,mn),g.pixelStorei(I.UNPACK_SKIP_IMAGES,Rn),Mt===0&&G.generateMipmaps&&I.generateMipmap(St),g.unbindTexture()},this.initRenderTarget=function(x){z.get(x).__webglFramebuffer===void 0&&Q.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?Q.setTextureCube(x,0):x.isData3DTexture?Q.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?Q.setTexture2DArray(x,0):Q.setTexture2D(x,0),g.unbindTexture()},this.resetState=function(){U=0,k=0,it=null,g.reset(),yt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return on}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}};var gu={type:"change"},ac={type:"start"},Eu={type:"end"},go=new Ki,_u=new We,n0=Math.cos(70*Rl.DEG2RAD),Me=new R,Ve=2*Math.PI,ae={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},rc=1e-6,_o=class extends Ws{constructor(t,e=null){super(t,e),this.state=ae.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Qn.ROTATE,MIDDLE:Qn.DOLLY,RIGHT:Qn.PAN},this.touches={ONE:Zn.ROTATE,TWO:Zn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new Xe,this._lastTargetPosition=new R,this._quat=new Xe().setFromUnitVectors(t.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Zi,this._sphericalDelta=new Zi,this._scale=1,this._panOffset=new R,this._rotateStart=new ut,this._rotateEnd=new ut,this._rotateDelta=new ut,this._panStart=new ut,this._panEnd=new ut,this._panDelta=new ut,this._dollyStart=new ut,this._dollyEnd=new ut,this._dollyDelta=new ut,this._dollyDirection=new R,this._mouse=new ut,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=s0.bind(this),this._onPointerDown=i0.bind(this),this._onPointerUp=r0.bind(this),this._onContextMenu=d0.bind(this),this._onMouseWheel=l0.bind(this),this._onKeyDown=c0.bind(this),this._onTouchStart=h0.bind(this),this._onTouchMove=u0.bind(this),this._onMouseDown=a0.bind(this),this._onMouseMove=o0.bind(this),this._interceptControlDown=f0.bind(this),this._interceptControlUp=p0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ae.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(gu),this.update(),this.state=ae.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Me.copy(e).sub(this.target),Me.applyQuaternion(this._quat),this._spherical.setFromVector3(Me),this.autoRotate&&this.state===ae.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Ve:n>Math.PI&&(n-=Ve),s<-Math.PI?s+=Ve:s>Math.PI&&(s-=Ve),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Me.setFromSpherical(this._spherical),Me.applyQuaternion(this._quatInverse),e.copy(this.target).add(Me),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Me.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new R(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new R(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Me.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(go.origin.copy(this.object.position),go.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(go.direction))<n0?this.object.lookAt(this.target):(_u.setFromNormalAndCoplanarPoint(this.object.up,this.target),go.intersectPlane(_u,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>rc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>rc||this._lastTargetPosition.distanceToSquared(this.target)>rc?(this.dispatchEvent(gu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ve/60*this.autoRotateSpeed*t:Ve/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Me.setFromMatrixColumn(e,0),Me.multiplyScalar(-t),this._panOffset.add(Me)}_panUp(t,e){this.screenSpacePanning===!0?Me.setFromMatrixColumn(e,1):(Me.setFromMatrixColumn(e,0),Me.crossVectors(this.object.up,Me)),Me.multiplyScalar(t),this._panOffset.add(Me)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Me.copy(s).sub(this.target);let r=Me.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ve*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ve*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Ve*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Ve*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Ve*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Ve*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ve*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ve*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ut,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function i0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function s0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function r0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Eu),this.state=ae.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function a0(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Qn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ae.DOLLY;break;case Qn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ae.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ae.ROTATE}break;case Qn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ae.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ae.PAN}break;default:this.state=ae.NONE}this.state!==ae.NONE&&this.dispatchEvent(ac)}function o0(i){switch(this.state){case ae.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ae.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ae.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function l0(i){this.enabled===!1||this.enableZoom===!1||this.state!==ae.NONE||(i.preventDefault(),this.dispatchEvent(ac),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Eu))}function c0(i){this.enabled!==!1&&this._handleKeyDown(i)}function h0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Zn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ae.TOUCH_ROTATE;break;case Zn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ae.TOUCH_PAN;break;default:this.state=ae.NONE}break;case 2:switch(this.touches.TWO){case Zn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ae.TOUCH_DOLLY_PAN;break;case Zn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ae.TOUCH_DOLLY_ROTATE;break;default:this.state=ae.NONE}break;default:this.state=ae.NONE}this.state!==ae.NONE&&this.dispatchEvent(ac)}function u0(i){switch(this._trackPointer(i),this.state){case ae.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ae.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ae.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ae.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ae.NONE}}function d0(i){this.enabled!==!1&&i.preventDefault()}function f0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function p0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Cu(i,t,e){let n=new R;return{add(s,r){let a=document.createElement("span");return a.className=`al-lab ${s}`,a.innerHTML=r,i.appendChild(a),a},place(s,r,a=!0,o=0){n.copy(r).project(e);let l=t.clientWidth,c=t.clientHeight,u=!a||n.z>1||Math.abs(n.x)>1.05||Math.abs(n.y)>1.05;if(s.style.opacity=u?0:1,s.style.pointerEvents=u?"none":"",u)return;let f=s.offsetWidth/2+4,h=Math.min(l-f,Math.max(f,(n.x*.5+.5)*l));s.style.transform=`translate(${h}px, ${(-n.y*.5+.5)*c+o}px) translate(-50%, -50%)`}}}function xu(i,t,e={}){let n=()=>{let s=document.querySelector(i);if(!s)return;let r=null,a=!1,o=()=>(a||(a=!0,r=t(s)),r),l=new IntersectionObserver(c=>{c[0].isIntersecting&&(l.disconnect(),o())},{rootMargin:"600px"});l.observe(s);for(let[c,u]of Object.entries(e))document.querySelectorAll(`[data-lab-${c}]`).forEach(f=>f.addEventListener("click",h=>{let p=o();p&&(h.preventDefault(),s.scrollIntoView({behavior:"smooth",block:"center"}),u(p,f.getAttribute(`data-lab-${c}`)))}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n):n()}function as(i,t){let e=()=>document.querySelectorAll(i).forEach(n=>{n.__done||(n.__done=!0,t(n))});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var Ne=i=>String(i).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),ce=(i,t)=>`${Ne(i)}<span class="zh">${Ne(t)}</span>`,ii=i=>JSON.parse(i.querySelector('script[type="application/json"]').textContent);function Eo(i){if(!Number.isInteger(i)||i<3||i%2===0)throw new RangeError("n must be an odd integer \u2265 3");return(i-1)/2}function Bu(i,t,e){let n=Eo(e),s=[];for(let r=0;r<e;r++){let a=Math.PI-r/e*Math.PI,o=Math.PI-(r+1)/e*Math.PI,l=(a+o)/2,c=i+t/2;s.push({i:r,a0:a,a1:o,mid:l,cx:Math.cos(l)*c,cy:Math.sin(l)*c,key:r===n})}return s}function m0(i){let t=Eo(i),e=[];for(let n=0;n<t;n++)e.push(n,i-1-n);return e.push(t),e}function oc(i,t){return new Set(m0(i).slice(0,Math.max(0,Math.min(i,t))))}function lc({n:i,placed:t,t:e,R:n,centering:s,minRatio:r}){return s?"centering":t<i?"missing":rr(e,n)<r?"thin":"ok"}var rr=(i,t)=>i/(t+i/2);function Au(i){let t=lc(i);return t==="centering"||t==="ok"}var os=[{key:"africa",en:"Africa",zh:"\u975E\u6D32"},{key:"wasia",en:"West Asia",zh:"\u897F\u4E9E"},{key:"europe",en:"Europe",zh:"\u6B50\u6D32"},{key:"sasia",en:"South Asia",zh:"\u5357\u4E9E"},{key:"easia",en:"East Asia",zh:"\u6771\u4E9E"},{key:"oceania",en:"Oceania",zh:"\u5927\u6D0B\u6D32"},{key:"americas",en:"The Americas",zh:"\u7F8E\u6D32"}],hc=i=>os.findIndex(t=>t.key===i);function Mu(i){if(!Number.isInteger(i)||i===0)throw new RangeError("There is no year 0: 1 BCE is -1 and the next year is 1 CE")}function uc(i,t=2e3){return Mu(i),i>0?t-i:t-i-1}function lr(i,t=2e3){let e=t-Math.round(i);return e>=1?e:e-1}var si=i=>String(Math.round(i)).replace(/\B(?=(\d{3})+(?!\d))/g,",");function cc(i){let t=Math.abs(i);if(t<100)return Math.round(t);let e=10**(Math.floor(Math.log10(t))-1);return Math.round(t/e)*e}function ar(i){return i>=1e4?`${Math.round(i/1e3)/10} \u842C`:si(i)}function ls(i){return Mu(i),i>0?{en:`${i} CE`,zh:`\u897F\u5143 ${i} \u5E74`}:{en:`${si(-i)} BCE`,zh:`\u897F\u5143\u524D ${si(-i)} \u5E74`}}function Co(i){let t=cc(i);if(t<=0)return{en:"the year 2000",zh:"\u897F\u5143 2000 \u5E74"};let e=ar(t);return{en:`about ${si(t)} years ago`,zh:`\u5927\u7D04 ${e}${e.endsWith("\u842C")?"":" "}\u5E74\u524D`}}function xo(i,t){let e=cc(Math.max(i,t)),n=cc(Math.min(i,t));if(e===n)return Co(e);let s=ar(e),r=ar(n);return{en:`about ${si(e)} to ${si(n)} years ago`,zh:`\u5927\u7D04 ${s}${s.endsWith("\u842C")?"":" "}\u5230 ${r}${r.endsWith("\u842C")?"":" "}\u5E74\u524D`}}function Bo(i){let t=Co(i);if(i>=1e4)return t;let e=ls(g0(lr(i)));return{en:`${t.en} (around ${e.en})`,zh:`${t.zh}\uFF08${e.zh.replace(" \u5E74"," \u5E74\u524D\u5F8C")}\uFF09`}}function g0(i){let t=Math.abs(i),e=t>=2e3?100:t>=500?50:10,n=Math.round(t/e)*e||e;return i<0?-n:n}var fn=(i,t)=>i==="log"?Math.log10(Math.max(t,1)):t,or=(i,t)=>i==="log"?10**t:t,Ci=(i,t)=>i==="log"?Math.max(t,1):Math.max(t,0);function yu(i,t,e){if(i!=="log"&&i!=="linear")throw new RangeError(`Unknown scale: ${i}`);let n=Ci(i,e);if(!(t>n))throw new RangeError("older must be farther back than nearer");let s=fn(i,t),r=fn(i,n);return{kind:i,older:t,nearer:n,pos:a=>(s-fn(i,a))/(s-r),ago:a=>or(i,s-a*(s-r)),has:a=>{let o=i==="log"?Math.max(a,1):a;return o<=t*(1+1e-9)&&o>=n*(1-1e-9)}}}function Ao(i,t,e){let n=i.pos(Math.max(t,e)),s=i.pos(Math.min(t,e));return s<0||n>1?null:{from:Math.max(0,n),to:Math.min(1,s)}}function _0(i){let t=10**Math.floor(Math.log10(i)),e=i/t;return(e<=1?1:e<=2?2:e<=5?5:10)*t}function vu(i,t=6){let e=[];if(i.kind==="log"){let r=Math.log10(i.nearer),a=Math.log10(i.older);for(let o=Math.ceil(a);o>=Math.floor(r);o--)for(let l of a-r<3?[5,2,1]:[1]){let c=l*10**o;i.has(c)&&e.push({ago:c,major:l===1,en:si(c),zh:ar(c),unit:"ago"})}return e}let n=i.older-i.nearer,s=_0(n/t);if(n<=5e3){let r=2e3-i.older,a=2e3-i.nearer;for(let o=Math.ceil(r/s)*s;o<=a+1e-9;o+=s){let l=o>=1?o:o===0?-1:o,c=o===0?{en:"1 BCE / 1 CE",zh:"\u524D 1\uFF0F\u897F\u5143 1"}:ls(l);e.push({ago:uc(l),major:!0,year:l,en:c.en,zh:c.zh.replace(/ 年$/,"").replace("\u897F\u5143\u524D ","\u524D ").replace("\u897F\u5143 ",""),unit:"year"})}return e}for(let r=Math.floor(i.older/s)*s;r>=i.nearer-1e-9;r-=s)e.push({ago:r,major:!0,en:r===0?"2000 CE":si(r),zh:r===0?"\u897F\u5143 2000":ar(r),unit:"ago"});return e}function Su(i,t,e,n,s){let r=fn(i,Ci(i,s.nearer)),a=fn(i,s.older),o=fn(i,t.older),l=fn(i,Ci(i,t.nearer)),c=s.minSpan||(i==="log"?.6:50),u=Math.min(a-r,Math.max(c,(o-l)/e)),h=o-n*(o-l)+n*u;return h=Math.min(a,Math.max(r+u,h)),{older:or(i,h),nearer:or(i,h-u)}}function Du(i,t,e,n){let s=fn(i,Ci(i,n.nearer)),r=fn(i,n.older),a=fn(i,t.older),o=a-fn(i,Ci(i,t.nearer)),l=Math.min(r,Math.max(s+o,a-e*o));return{older:or(i,l),nearer:or(i,l-o)}}function cr(i,t,e){let n=Math.min(e.older,t.older),s=Math.max(Ci(i,e.nearer),t.nearer);return n>s?{older:n,nearer:s}:{older:e.older,nearer:Ci(i,e.nearer)}}function bu(i,t=.01){let e=[];return i.map(n=>{let s=e.findIndex(r=>r+t<=n.from);return s<0&&(s=e.length,e.push(0)),e[s]=n.to,s})}var cs=i=>i&&typeof i=="object"?uc(i.year):i;function E0(i){if(i.to!=null&&i.to!==i.from){if(i.from>=1e4)return xo(i.from,i.to);let t=ls(lr(i.from)),e=ls(lr(i.to));return{en:`${t.en} to ${e.en}`,zh:`${t.zh}\u5230${e.zh}`}}return i.from>=1e4?Co(i.from):i.exact?ls(lr(i.from)):Bo(i.from)}function C0(i){let t=ii(i),e={older:t.from,nearer:t.to||0},n=t.events.map((C,S)=>({...C,i:S,from:cs(C.from),to:C.to==null?null:cs(C.to)})),s=t.lesson?{...t.lesson,from:cs(t.lesson.from),to:cs(t.lesson.to)}:null,r=i.querySelector(".wh-tl-view"),a=i.querySelector(".wh-tl-read"),o=t.view?{older:cs(t.view.from),nearer:cs(t.view.to)}:e,l={kind:"log",view:cr("log",o,e),sel:-1};r.innerHTML=`<div class="wh-tl-axis" aria-hidden="true"></div><div class="wh-tl-lanes">${os.map(C=>`<div class="wh-tl-lane" data-lane="${C.key}"><p class="wh-tl-name">${ce(C.en,C.zh)}</p><div class="wh-tl-track"></div></div>`).join("")}</div><div class="wh-tl-over" aria-hidden="true"><div class="wh-tl-grid"></div><div class="wh-tl-lesson"><span></span></div></div>`;let c=r.querySelector(".wh-tl-axis"),u=r.querySelector(".wh-tl-grid"),f=r.querySelector(".wh-tl-lesson"),h=os.map(C=>r.querySelector(`[data-lane="${C.key}"] .wh-tl-track`));s&&(f.firstChild.innerHTML=ce(s.en,s.zh));function p(){let C=yu(l.kind,l.view.older,l.view.nearer),S=E=>`${(E*100).toFixed(3)}%`,B=r.clientWidth<560,y=vu(C,B?l.kind==="linear"?2:4:7);c.innerHTML=y.map(E=>`<span class="wh-tl-tick${E.major?"":" is-minor"}" style="left:${S(C.pos(E.ago))}"><b>${Ne(E.en)}</b><i>${Ne(E.zh)}</i></span>`).join("")+`<span class="wh-tl-unit">${y[0]&&y[0].unit==="year"?ce("calendar years","\u66C6\u5E74"):ce("years ago","\u5E74\u524D")}</span>`,u.innerHTML=y.map(E=>`<i style="left:${S(C.pos(E.ago))}"${E.major?"":' class="is-minor"'}></i>`).join("");let M=s&&Ao(C,s.from,s.to);f.hidden=!M,M&&(f.style.left=S(M.from),f.style.width=S(Math.max(.004,M.to-M.from)));let b=Math.max(120,h[0].clientWidth);os.forEach((E,D)=>{let T=n.filter(U=>hc(U.lane)===D).map(U=>{let k=U.to==null?Ao(C,U.from,U.from):Ao(C,U.from,U.to);return k&&{e:U,s:k}}).filter(Boolean).sort((U,k)=>U.s.from-k.s.from),F=T.map(({e:U,s:k})=>{let X=(([...U.en].length*.56+1.5)*11.5+16)/b,$=Math.max(k.to,k.from);return $+X>1&&k.from>.45?{from:k.from-X,to:$+.01,flip:!0}:{from:k.from,to:$+X}}),O=F.map((U,k)=>k).sort((U,k)=>F[U].from-F[k].from),V=bu(O.map(U=>F[U]),.012),w=[];O.forEach((U,k)=>{w[U]=V[k]});let H=w.length?Math.max(...w)+1:1;h[D].style.setProperty("--rows",H),h[D].innerHTML=T.map(({e:U,s:k},it)=>{let X=U.to==null||k.to-k.from<.004,$=!!F[it].flip,L=$?`right:${S(1-(X?k.from:k.to))}`:`left:${S(k.from)}`;return`<button type="button" class="wh-ev${X?" is-point":""}${U.kind?` is-${U.kind}`:""}${$?" is-flip":""}${l.sel===U.i?" is-on":""}" data-ev="${U.i}" style="${L};--w:${X?12:Math.max(10,Math.round((k.to-k.from)*b))}px;--row:${w[it]}" aria-pressed="${l.sel===U.i}"><span class="wh-ev-bar"></span><span class="wh-ev-t">${ce(U.en,U.zh)}</span></button>`}).join("")}),i.querySelectorAll("[data-scale]").forEach(E=>E.setAttribute("aria-pressed",E.dataset.scale===l.kind))}function _(C){l.sel=C;let S=n[C];if(!S){a.innerHTML=a.dataset.idle||"";return}let B=E0(S),y=os[hc(S.lane)];a.innerHTML=`<b>${Ne(S.en)}<span class="zh">${Ne(S.zh)}</span></b><span class="wh-tl-when">${Ne(y.en)} \xB7 ${Ne(B.en)}<span class="zh">${Ne(y.zh)}\u30FB${Ne(B.zh)}</span></span>`+(S.note_en?`<span class="wh-tl-note">${ce(S.note_en,S.note_zh)}</span>`:"")}a.dataset.idle=a.innerHTML;let A={state:l,events:n,setScale(C){l.kind=C,l.view=cr(C,C==="linear"?{older:e.older,nearer:e.nearer}:l.view,e),p()},zoom(C,S=.5){l.view=Su(l.kind,l.view,C,S,e),p()},pan(C){l.view=Du(l.kind,l.view,C,e),p()},fit(C,S){l.view=cr(l.kind,{older:C,nearer:S},e),p()},all(){l.view=cr(l.kind,e,e),p()},select(C){_(C),p()},draw:p};i.addEventListener("click",C=>{let S=C.target.closest("button");!S||!i.contains(S)||(S.dataset.scale?A.setScale(S.dataset.scale):S.dataset.zoom==="in"?A.zoom(1.8):S.dataset.zoom==="out"?A.zoom(1/1.8):S.dataset.zoom==="all"?A.all():S.dataset.zoom==="recent"?(l.kind!=="linear"&&(l.kind="linear"),A.fit(Number(S.dataset.older)||6e3,0)):S.dataset.ev&&A.select(l.sel===Number(S.dataset.ev)?-1:Number(S.dataset.ev)))}),r.addEventListener("keydown",C=>{if(C.key==="ArrowLeft")A.pan(-.15);else if(C.key==="ArrowRight")A.pan(.15);else if(C.key==="+"||C.key==="=")A.zoom(1.5);else if(C.key==="-")A.zoom(1/1.5);else return;C.preventDefault()});let m=null;r.addEventListener("pointerdown",C=>{C.button===0&&(m={x:C.clientX,moved:!1,id:C.pointerId})}),r.addEventListener("pointermove",C=>{if(!m||C.pointerId!==m.id)return;let S=C.clientX-m.x;!m.moved&&Math.abs(S)<6||(m.moved||(m.moved=!0,r.setPointerCapture(C.pointerId),r.classList.add("is-drag")),A.pan(-S/Math.max(120,h[0].clientWidth)),m.x=C.clientX)});let d=C=>{if(m){if(m.moved){r.classList.remove("is-drag");let S=B=>{B.stopPropagation(),B.preventDefault()};r.addEventListener("click",S,{capture:!0,once:!0}),setTimeout(()=>r.removeEventListener("click",S,{capture:!0}),60);try{r.releasePointerCapture(C.pointerId)}catch{}}m=null}};return r.addEventListener("pointerup",d),r.addEventListener("pointercancel",d),r.addEventListener("wheel",C=>{if(!(!C.ctrlKey&&!C.metaKey&&Math.abs(C.deltaX)<=Math.abs(C.deltaY)))if(C.preventDefault(),C.ctrlKey||C.metaKey){let S=h[0].getBoundingClientRect();A.zoom(C.deltaY<0?1.15:1/1.15,Math.min(1,Math.max(0,(C.clientX-S.left)/S.width)))}else A.pan(C.deltaX/600)},{passive:!1}),new ResizeObserver(p).observe(r),p(),i.__tl=A,A}as("[data-wh-timeline]",C0);var Mo={source:"Natural Earth 1:50m Land v5.1.2 (public domain) \xB7 naturalearthdata.com",q:.05,polys:[["ghHlURTADQKAJVBHEHHLDDIDAEIIBGGYK"],["gzF9ODNMNIfBLIXIDUIIJaRBVIVANMTGAKdDXMLBLEFePKAONoBVGHFCBFUVKRKhBECGFAKCGWPCIGJEhBMNcLMTMHIPKJAJKJBNAjBUpBAPAHJRDXHZDjBPXDPLJABNFNXFDANHBGBPRBTJHNZJnBAbRHxBDNDpBbZDGFECCHDDJMHBFKPEGGBGHANJJGIAIKHITJKBrBXrBQdGDFHCPKNCJGXaBIEQDMLOTQKEEDAIfJLCMYAKPYPnBfDEOQAEeSWDQGEHUAHNPHRfPVXCNFGFDNMHCEEKDJaLMHQPEHQGAAIXORARKVBTMVINDpCDhCV3BBtBXTDPXNLLDPEZDDGZA9BDHFHJVFdTLB1BCTIROVIAeIFGAGEIODWGKBcXuBJ4BbqBDehBuBEBCGKRGBEEAGJKHQCEKJALGGGLEDEEASf4BEYKSCUDKMeECCBAXKGMWeMWScQcBgBMWGOKUBiBIWKOMUgBUQHWEQSOKOYpBCSKBAINQGEBIGAEHIGKFSANEAGICCKBCDFDICKEAGKOHAGFABGIGMDCEFCBKEEMECKCBBJGEEFEEEQBEGACFGGGFKIAGECWLebFXEEEBBKQMSFGJCMIDIHAMIAJIEELGMQGSQKDGAIGCEIICAIKDAIGAAGIAEGGJYAIEGDEGICBCAQFGRCJGGEIDIEOLKEKLcFUHOCMHGAcOHNMAEHGBEGDGMICHMDCDPRCHFJFENFAZBHTXCFeTEFQFEHIAcNWReHKRgBNSEOIW2BKoBFYEMFOIWBMIGEABIFEAGGOEBIsBMKGBBDGFGLAT"],["8-G1VMLCRbFZGBKKMMGQE"],["otGpZKBeRST0BhBAHHDLG7BmBfgBDO"],["2_EiBGACIIECKUGARPHBFOHEHIFjBKDFEVSZPINSAWFMCKFMIcQOFNEFANNN"],["w2Cr9BQGCFJDGBeIIBCDFJJEPDKFKCCBHDlBGBDJBBCCIBIEEFEEIIIEHDF"],["mvC8kDhBEYGoBCIIiBBKDCDjBH"],["uoCkkDXCFKHCEC4BBeDhBB"],["5f04CADEDBBfHPE5BBOIAIEAoBAgBG"],["2nGxLIHQCMHGJFDhBIHMCG"],["0yEyKDDCEEKWWIEsBuBESIQCBANGRNFFLPFBFLT"],["k5EwOOAEBBDKEBJLLBHfNGwBHGACGC"],["-5EqLFAFKLIFMCGQGBQIQKEKDCDPlBAJGN"],["27EmOQAEFBPGFENDDFGCLJEBeDCHBFY"],["y8E2PCJKDDJCNCNIHDEPALOCKVQDKBG"],["82E8QUBMLCTFNFDNMJaLKCE"],["-iGrIBDHBNGFGAKROAUOFOVOJ"],["m_F9FBDFIDUNWxBeLEECAGQLgBPmBhBGJ"],["mtFpKJFZASiBIESCKLHN"],["miFxDKFQAGFMPBLlBUNABDXINHNMJNAMMOgBAGDOG"],["y-E7DIBILAHLDPATOCM"],["w5E3KtBLJEBDLBTGRAHBDGCMeGiBNUGOHWOCEFAEEGBAH"],["g2E1LMLKBKJAFNHLEVSVEDGKEYAGE"],["6zErKOAEDKEINBDLCBBEDPABIHHbFRDJECSMIQDKJGBMGRKBIOC"],["6xE3KFHEDNAPEKCBMOKMF"],["qwElKKJNHHJDMRGFKUBIG"],["ykEhCMfSDHNCFZKHYZGIKEKGAEHAIIC"],["ocopCOAOFVHPBHJFAIILEEGFE"],["gboiDSAKNcASDLBBDoCJdDPHlBFNAAGKElCDDEOCSMXGTMACLE"],["2tCilDEBFHpBHdEZBNEEGMG"],["q7BilDoBBKDABnBEPFtBFHEpBC"],["8-BmlDUBkBHdFrBBJDfBDBKBCDxBBDAOEDCjBBNEyBKwBBECBGEE"],["6-Bw2CBFDERLdDRCFKEMWGMA"],["yrCu3CAHdBHGVCTOYI"],["q4Cs7CdAEKOGaAaL"],["8zD0jDVArBMsBCiCF"],["4tEg9CXLbCXIQAII"],["owFw8CXDHEDIiBCGD"],["6dusBMCBDKFOCgBDKCCJUIFL1BBDGJChBEBMEBEG"],["od2wBEFaFGRKBCFJALQPCPONCOI"],["irBwsBTLBDGHNBLHNDBDVIFIAGYECIaB"],["8XqoCLFAHEDdTGIHGCMQMOC"],["2P4lCAFNHIFLDBPHBHSNAHQDEMCGIIACHEBGIDCOGQB"],["qNwlCGLAFHDXEFIAG"],["-D4xBMDHLHDJEDGHBFCWOMC"],["12El8CMJdFAHzBBZEACICFEMGdEOI"],["99Ez7CYDUJXFiBBSEUFDBOFBFxBCtBMNKXBBEHGIG"],["1yCjkDdIDEfKoCBGFKAEH"],["poChwCOEABKDCDHDEBPCHDBEJBDCMCFCAELAIIQE"],["_uCxwCDDSAjBLTGeSKB"],["j8Cp4CGBFDrBH5BFJGKGsBEIGOHII"],["39Cl3CWHHHXAVEEG"],["z6D75CBHKAEIIAGDFDKDUOeBHFbFMBsBICHBFTBCF9CCnCMnCCLEGEuCGQHwBMQB"],["98Cr7CLHMFHF1BKHIIEYARGOEqBDGD"],["_0Cp0CfLNKeaWKGDJFAHKDVH"],["z_Gw5CWBiBNLF1BDhBCAW"],["xpChgCQBCBDFKBAGOAEDFDGBBBhBJCFVEGFLBBDFCDEEIUKBI"],["ruBxjCQBEDBBMAMLGAAFEBLDPOPGdIBCECPCYA"],["l8Cl2BNALEIOGsBUDGLFDEFNFONLH"],["rrCpgCkBEGDZTNBJHRGcMNCOCLM"],["j9Ct9BARCDFLFAFKIOJFDLTCCIGBCGFGOEDEKIBGECOA"],["n7C_3BJBFEBEIMSF"],["ntCs9BxBETIJIbMOC0BJqBPEF"],["rsCu5BKCHDEBDFMCMILASOCDQBDFEBfNZBFGBKEIWaOIEACJFT"],["p2GyvCYBQEkBNiBBFFTANHDGpBOfDFGCI"],["1vGwrCQDCJEFTBBDnBKLIYAOI"],["rsG4kCEHMFJEJDRBVHHADGQOcG"],["xgDiXkBLGJLBNEDDFCDHFGPCLKJCBGUG"],["1yCiXUBCFNLxBCCIDGEG"],["j_FooCSCBFMDHFVCKFpBLEDLHDCKILACEHCFBIDFDNSGISEQNFOGAHGCCODMCCGMB"],["v-F-oCECODFFFEBDLANFREQIKADE"],["3jFslCHLHEBELJBCBIIICKOEKH"],["9mFumCOBEHUHSPNEFFKCKHBDIAARVIBIHDLMGCFECEJAPIMAGEDGPDII"],["1mFonCOBCJDDLKINNBFCBMLIGC"],["1oF2nCOZDTLMEIREGKJIHHFBAMOK"],["roF2oCSASTPODCCFMLCJVLFEEOFGLc"],["1pF6oCGDDDEBKEQDAHPBOBGDDDXGFJHCHIRMKKGDCE"],["1gFmiCCRHHBSFDLOGMQH"],["5lF2jCOBGFBDNHOCCOUENjBTBJEMCPGHMBICG"],["1kFwiCELLAUHFDGHIABDGABFlBaDGECPG"],["3vCi6BEEWFoBEGDVHAHRCECFECEJDCBREDGNCBGJCCEOMDJ"],["z6CozBDDEAYGzBPbDEEJAUKkBEQG"],["89FrFIEMFBRNJGLBDJDNAJNfNfBJILAdSEIkBFUEECGSCBDJGHcCSUMCBc"],["k_EvKfTrBPlBhBXHJEEGDGEOMKkBQMMYGgBCOG"],["q1F_yBKCoBPQCGBAEGCSAGGKAECKBEDCxBBBDIAEHLDPETHBFIGCJEDHFKCFDJJCEFJLLETBBGIENANOLcKJCGFIDBAITYDQCO"],["24DslDIFsBHABdDBBOJHBtEJvCKFE2BKQIZAeKiDK"],["i6DmkDOFNFADQGMAKGcBeHJFDNZAiBLRFrCAdGnBAJEVBNERKtBEuCYMBIC"],["0gEijDTPWIiBEiBLUBGFAFVFtCF_BArBJfEcMQQWCDEIIUGCEaDBEIEaD"],["ivF6-CeHGCCKUIuBLqBAiCLVFBBGDjBHhBCNGDICEKEBCZAHBEJQJWHbFRIlCFVENJJBnBGrBSAEMADICISAHGGEuBI"],["4xFs8CuBNEDAHpCClBGbDJEcCcO"],["w3Fm-CiCCCABFGA8BBSDKCHJdD9BA1CQMOMB"],["y4G1rBIEADaHCFGCMVHAQTBHCDDJYFEHGABUDGCCKJCAOjBuBNMESOWFLhBJFDVDGLCPFFNGDJThBpBbPFIJABIDFDCUcEMDIFGpBSHIEGWIIGKgBBEGENcGDIEFGLALSIDAONGFIKRBBbiBKKJHLMEITWOADD"],["s4GzzBiBQFNIIACMAJJMGLNEDBDIDrBxBXJGDHDGAEFKDAFVAEEDAHDJGGHlBNCBFXFAEFPZEFRFZVXDbCHKNALIHDTAFEIIFDDACGHBAGUEHCIEJACGEABEMDBEGAHEAEIADEKGCDCIMGEBBGUQcKGBBEcKAEQMGBDEGCGBDEGCEDIOEFAGKKBCKYSKMgBQKMAHBBDMH"],["w9E0LIAENFNIDELANEFCRFJJFAVPqBDDLVIJCRLPDGAMHHDCdODGDYIQJKLGFADPHGDGDFFABGHCFDLbHABKOeaIGMQKKDGFBPQIIOOBEQMDCIMBDaCESJ"],["s3EoXeLICEGEBCFDJBPKREDNjBVJALHNMVBFERGFMBECDGSGMDGRIEAIUHAFJBKPAFOBDTFGCILANGFQVSFAITBHHMXSLDFHJCJIHDBQMMCGNKAPFBHOFCN4BEEMLICBWGeDKKiB"],["6mFdUAGDBFINFNEXKVCKGCCPGCCLIFQAeeGOaGECBIgBOsChBgBDGFSB2BVmBJWNSBYTKBQPAX0BTOBQNAPbAFFADMTkBZERIFGNYACReHJDEHUHUBHDHCIHNFLCJKvCMdaBGAIDBHGXiBrBMDGNEBFLBTMMTDAADNCEHrBDFGFBGAEFOAMDMLBHbPPIrBBtBoBEMFHVDFILJDEKWNOSCNCJIKEPUFQCEFCGEJABKdUDBXIXKfETOAGIAZADGHAJMAKGIFBBJFBDTFFLBHQEGDKPMNGBCMESDUOUFCGGCAEDAEIlBFZALKBSZGLAIKCMWGOKOEOB"],["k8EoBRVbFTCJGvCBPEJDFHHRCNILKHGLUASUODOIYABEMEKDCFBHTEZZPFHHLAKJGDOTIFELFPSTGCANFCABXFBLREDGEUbYGOAQFEJAPLIdDPCTDVGRTAJDFEHMKgBASFWRBFGBcMIIWAWIUIIGFFeGGBIEIOUGDIAKQKEMDIHiBBQFIEkBDYQCGQMGBEF"],["mmEvHMHcDOTmCFQWEBKJOCWJSBEJGDAJIDUBWCOFAXIN1BSVDvBEjBGVKdIVCLFJAjBOhBEBEEIVIbAAEEEGFGOGACOKIeHII"],["04DyGqBBcfCL6BjBenBQJBMIASVMDIFQXWHEFBDRHOESIMHGJNJBFEDBFKLaFGdOLHNAFMKSBIDSXHTEJDLChBFfPKJHRKCPDAdgBzBmBPWVSbkBBMVsBZkBTMV8BjBUDUHGRYTInBqBJSEMSAQL"],["gyEsIADECKMEACJMHEFBNFDUGEHFBADQEKHaJAFDDTFPCBFONADVFLEHHMRFBFEBDPBMFAJKFBDGBBBGDKRJJwBpBRHNCLKCHHFJTBVERZRFGALRREAAJDDKBAHADJBCNHDEFLRxBVFeDDDCAIDDFCPFDKJBLMDJHDFDLERJBUDGBDLCPDDCCEHDFELBFmBFGEMBMLMPECIHIEULMBSCOIEFAEKMQKGILUBiBLFGIYBKKACO8BQkBsBEOQCYOCDQCGKHIIIGBGCiB4BEB"],["20Cq_C_HlBZJPBIDdFDFPEHHTAEHBBhBJEFDDREKHXLLBhCGbDFGCCRIkBIcSgBEVGkBMTCHEECaBOGBEeAIGMEBCwCOKEaBECAGGCmCB8BG0BIMGgBGgBEiBBSJBFdJ"],["klC07CuBDJFDJPBDFHBBFGHHJuBhBwBNTFdGFBMDDBLENBDEpBCBBjBELCICAGWEdIDCEG5BDNEFKAGGEaEOGMONEOGSADCBGCE-BI"],["uyFgkCKJDNQhBANFJCPENGFOtBWrBONAHFKTOLCZDVtBALQRKTMBEPFLFUbGHFLZFEDSIcDSKQBMLSMgBDsBGWTWECFGAMIWBWOGGDKCCEDCICAKNQ"],["4zFk3BkBFaQHTAHINUENJXFbBJBTTHP3BYRBPHLIHAFJgBTFBNCPNHACSJQAMYOCEDKeDIECOKOEUCIHSCKMEmBhB"],["ywF2zBICAbOPITANDNJFDHDNNBFHCpBJNHTMVPHDLTLAQKMJCHJEFBDJGHADFBLJJDECKEEHCDAPTZCTBKGNEAFDCCMDAJNOJBFTDRZHBJCLSBMIEEINCLETBLFfJTBNCFRPIhBBAKEGOA-BsBsBAuBKEBADEBOBIEIGDKCEaaASGISECBRNEJKDKIgBKOKKQSKGQMQKcBKJCGEEKBQOIEQKBENIEGBGEAIRBAEGK"],["-nF6qBMAERNHHNJILCNFLTHDFACGHABGCKDCAENDYOGMGEKFQCAKOE"],["-jFgqBWAFNOABFGHNRLpBLCCHPJEKDOEEFADFAFEFBBPEBEGCAGDGAOIEKQFCCILODDCJGAAFLCLHEIFGAGMHPQAEKBAGUIGIIEKD"],["o3EocFZDAFQLIHWCWkB4BWKONFFCJR3B"],["0qEgZENHDFJHVPLVJfOBeaSDACGkBGSBCG"],["gkDoMKASRWhBEBCLShBAPHRlBRRAFGJcF2BCECJGiBGMAQODPG"],["-9BxPQXInBEbIPBTHLHGDOJBInBDLFFFLCZFR5BjFN3BNlBRNXDZLPALIRELKPcAWCIFSHMDQCSIYMGY0BCSHOAOHSBkBQcEUQCMIGDKCEISCKFBIGISMEJCAAMKQECCLKOIAFEBIKQDGCGECIDWSEQDQGAKO"],["5mG3jDxBB9BGpCKXIGKkBMiBBsDZaL"],["93CzjD1BGDEGIIEkBK6DWeBjDfRJCBDD"],["v4BviD8BAGDYbDLbDKDBDhHRVFvFBHEAImBSOBYEGDsCaECDENCKIAGKEFCIIsBW6CK6CJgBJBJ1BFFD"],["1qCtkDDPdHxCELEHGjBBHDjDSOEQHuFCSEPCDIQABEeGeBGDDHUD"],["x3Cv2CBDQAMLMTgBfCjBLNXLBD1BDnCARCLIOEsCBaENErBDJGiBCKGnBEVGXJhBCKFRFfEXICIKEcDBIICeHECHGGEyBBfGBCOEoBDUGgBCWHBKnBELGGEcIeBdKdBZGFGGUPIEIIC6BGMF"],["t2C5hCOCKDMPHCBHOBGJcTqBTqBFJHpBFjCKjBDPCHGNDJCHB3BIBCGEIBKEKBMEEAAFQBVSAIIEBCGEGNJAQNUCQFCDKElBOFICIeIBGfBJICGKEJISBSM"],["pmD-cYAEDUCMFWBBBWRYBqBVGADEEBOHHBEDGEKHABuBJEDBDCBFBCDgBBQJODAFlBJBEFDhBE9BFGKSMFKhBEPMDOFIXAjBKJKVBFIDFVEJIQEAEFCjBCZTTBFHRFAGNDBCWGAOMKgBMuBK"],["kaqkDaAeHGGAIWCMAHJ0BG6BFoBBMDCFvBLNHjBBfFpBCHEGCvCAlBGFCeCMEpCAZEBEYElBEkBCWDICNIWDCEHEeB"],["gV8jDQCaFEDJFBFeIQFAFDBQDaAGDKESBGBJBkBJjCFVHFFAFVBDNDHZDRNEDJFCFNBtBMRIdGNKQEMBIG2CEFEvDFLEDIKCODBC6BIBCGCwBAGCPALEOG3BHFGGGPDLCJACDBDIDVFlBA3BSAEECTEqBAPEDEIEDCPAADDBLAROCGDESBWEYDDEEA4BCIBDDxBFgBACBWFECAIWIKBkBXYFRUBIKIAEGC"],["iMkzBGPFJCJFhBTEDLLAJKAMGOFCCQJOAKOBcQOJBB"],["8Lw1BCZNdPIEEHCCIFAEGDCEGFCKKUECMEA"],["wT4vBTdIPHHAFXEJKREjBQJCHIEKIGGFQGUH0BGQGGB"],["9hCu3CcFGHHD7BJXGWCFElBCFEEKUAVIGEOCqBD"],["_-Eq_BkCNadiBNUXEEEJJFzBOLGMKCGFHVBNGIELCAGXAAIQCPCNKHBFKDDDEPAAGDCCEQBCILAABLBLICEQC"],["95C0YICIGYAeJKAINUBNBADkBHMJCDNNJILCTAdJFGPDPXHEBKNKhBDXEJBFFVOCIgCFSGRSEQbIAGUG"],["h-BJWEcFFXLNAFHDDEDHJEDHHDJERDJWAEGCDADIGaQG"],["7DkpCDHfNBDIBLHeE2BAKJfjBbHQCKDABbHRCeFSESFUNQhBYHWPDDMPNGPBOAWNEHLJKDKGUAYHELFNNFADBBRBGBAFTDoBDAFNFDDdHnBAXGCDFBVAEDDBlBEPBLPTGVDNJTABEeQMKEIICEGqBAcWhBNJANINBGELETDJEDGCCoBOIKDCAMXDSOUGQCKDBGECGFGALIEKDAAGGCCILARQGIQITAPFLCJDLEDFFCDKEAOUHICGKEJECERJCGEGLHAJFNHBCKIIDAAKQcRHTGQGDCKICGJGACIEFEGKSAJGCIOADGEGWBwBGIA"],["_I6kCKGgBASPHFMAGFBBFEAFEBBDdJIPEZFPJHGDXDBEBDVBTJNCCDBDjBHVAKITDUKdBBCUKTCCCYCFGKGiBGHCHDbDSKCEBCGGOEVCFEJAECLAAGQCHCAEMCAELBCKJCCE8BABEOGEGXCOIAEGGYEEFDFGEAIICACOD"],["3gHm2CmBHMFHCCDYFCFKERIcJBDMAuCTEJDDOEGDDJILFHQBEHMECHMITIKGDGRGiBCWDFDBDEACAAGcBTEwBD0BXDDMCEDBBSACDfHAHDBdIOJDBdAVGNCSHBBGABFNBOBEFhBHKBDFQDEDNBFGAHJBJCCIPHfOjBEPIAKJIlBGRDjBAFECGRMIBIQLHJCBGHDAFNCDLSJAFNLLFA-E"],["tT6yCmBGLDHHQDADFFSCEDFDMCWFHFGBDDIDBBJBAFHDNABHHFvBHfNtBFFFbF9BGLGGCBCJBRI9BDBKIDMCeOXDGEDACEOGTDHCCGHCjBARBJEyBIkBAEGJBRCaKpBGnBHXGKCQBJKUDMCVEOCLEOAFEGEQDCDOCCHGCAGTGSCXEIESAqBPDDIBBFLBMDDFIBEFOQODEGAOGCcNEOWEcRCEHMQAOHQKMBOCCEDGMCKA"],["v0C7lCJCMA"],["_6CwXADLEHG"],["6U41BWDNA"],["gVi2BPCIEKBCB"],["vCy9BJBCC"],["9wCoWCBEADBHAAC"],["1gDofHCICEB"],["96GtaCABDHG"],["kuB4fNIAE"],["w6EjCDACI"],["k_Fk_CDAJCEAGCCAAB"],["m0C-2CDDFABAACGE"],["mzCm4CFCCG"],["gtGx9CJCAESE"],["iuGt0CHCCKIF"],["yxG1hDJDrBBHCDGiBDaI"],["ksGvzCBBFGGA"],["8wGzgD4CFCBhBHrBCZHVOSEJGECUA"],["q0G_7CNCMKGH"],["2rGt-CFFFABCECGCCA"],["o-DjyCRALEMIOAOF"],["orD1zCFBNIUCGF"],["4zDnyCNCKCGB"],["msDtzCLAKCGA"],["2qDnzCLAEE"],["s3C75CDFBABECCCA"],["y1Cr6CIIIB"],["44DxyCOACDXBDAEE"],["g6Cp4CNGAGGEKJ"],["orGjzCDAHEAG"],["q9D3yCDBBCCCGCAD"],["y7DhzCDBDCBCGCIB"],["ohE5xCHADGNGQBCF"],["x1Fz-CjBGQC"],["n3FlgDTBAGiBBEB"],["vlFh9CFBLCACMAIA"],["35FngDZABEgBB"],["16F7_CqBBbDRE"],["5jFn9CfCLEQGeD"],["t1Ez8CNAKEFIYAMD"],["9xE18CZCoBKKB"],["l_En9CVCHEBEkBDEB"],["v6F1gDKBTCHCGCEBGA"],["vqG7nDpBAdK4BBeF"],["57F__CXCaCEB"],["r3Fp_CHATISB"],["v3F5_CDBREIC"],["xoG_lDrEIeEeA8BF"],["_7F1gDrBEUC"],["tgGhkDnCIEE"],["x6FrgDvBANEmBG"],["vlGzmDnBMuBJ"],["rHl4CJBLGUC"],["6Dn4CNADCYGAD"],["1D_4CNADG"],["0B53CFFHMSCCD"],["lDt4CSBJJRDAGHGVGUC"],["2Fj4CNCFGSCED"],["28BvzCJCOCED"],["oUv3CBBXIOEaCJF"],["yhB_3CTBNEBEOIMB"],["7mB3jDKCCEwBJfD3BGHEME"],["tqBjjDpDACEoBE"],["jEl4CHCOIOAEDBD"],["3Zr8CBJKFDHLCHIFEjBCkBGMKGCIB"],["jU76CHAHGGE"],["zPl6CHBJGGC"],["toBxjDJAIESA"],["j5BzrCSFEDfGAC"],["xjCzsCFCIE"],["h0CpjDzBAKGYEaBHD"],["9kCvsCFBFGCCeB"],["tlC9uCQBCDBBbCVFDESI"],["5lCtvCPEUCCD"],["xnC1wCHAAEWE"],["voCrtCKAEDTBBDJADDRCMI"],["vtCj3CDBRWMASHADDB"],["jvChxCJBOG"],["9tCvwCRDMKDGGEQFFH"],["nuC5uCBAEGKCBBBB"],["nqChuCFABCBCGAEACB"],["hmC7uCLBJEECSA"],["3rCluCeBNFHGZDDEOE"],["1nC3vCKBJBNE"],["tsCv3CJCKC"],["9rCr4CFABGUABD"],["1rC54CPEOC"],["zrC1uCJAEC"],["5rC5vCLAGAEIGB"],["9xDv7CNAGMLMOCUBAFDBEBAF"],["1iEt7CNBJIIC"],["52D56CFAACaGEF"],["z5C53COBNFDG"],["_5Cj3CfCFEEEQA"],["r8C17CJCMIMA"],["pyCpyCNACEIIMAADFB"],["nzC3yCJDCIIA"],["l0C10CNABEUCEB"],["l0CzzCJAGGID"],["9gHjVBEGECB"],["ziDqKBICA"],["whG09BHAAEIKEA"],["kqC0lDbCUC"],["gkCykDXCEAAEUB"],["usCmlDrBC4BEEB"],["8iCokDzBCoBGaF"],["snCukDAFDFzBCMEAG"],["0qC-jDfCaEOD"],["r-C98BDABGGKBMGCKRAF"],["j-Cr_BBBDAAKOA"],["_8CjiCeFULPCLIPARO"],["j3CzkCgBDSCCDHDMDBDKFCFLGTCBILEDABFGFHAJGACNEEK"],["79Ch9BLLJBGEFGCEUE"],["jrCngCFABCACGCEBBB"],["mjC6PSAMDNHRBPKKG"],["2iCqeFCIE"],["spCoZBAAGKOCH"],["omC0hBJHVDDCSGAGSCEB"],["ujCoeLBIE"],["w0B8UCAAEEDAFJGDGCG"],["myB0TKDPABEEADCAGGB"],["o_BsgBBDDGAMGA"],["s8BglBDADIEIGH"],["yyG_UJABGCC"],["syGtUNEIG"],["yyG9VGFDDNEEG"],["8xGpTBBFABCIGGA"],["uwGxSCLMIETDFNBDKDaCE"],["oyG9TBUER"],["oyGlTBBAEBMCACH"],["oxGjUSNPDDQHCEI"],["8nG1KlBUTUMBOLOFQLBB"],["8kGlJBDNGZaYJGJ"],["u3E0HKDDFPEGG"],["79C57BFECAKC"],["h8C_3BFGAEGB"],["l9C38BNBNYQIAFKN"],["1wCrkCeBhBFDC"],["rtC9wBADHG"],["nsC3gCEABFHE"],["j7C7iCADQAMHHHRFDEIILABFDADCAIVIGEKCODCE"],["7zC9kCJFFEJBLCJIqBA"],["34CxkCIDQCEHHDDENCJGHBAE"],["j0C3lCJEIE"],["l9CjgCBDRAJJGOWE"],["59C7-BPBEOSDCD"],["v9CxgCAFKFFNFCJS"],["n8C52BFBHC"],["n5CxjCQBAFFDLETBJKIG"],["18C9gCHCFG"],["l8Cv3BJDADGJEPNDAGTWECAGQCAIECMD"],["78Cj5BFBJAAEIIAGIGCR"],["97C64BPASK"],["j8Cg5BDBBAGEGC"],["rtCk7BGBJAEIUI"],["n1Cu3BDDDCEG"],["quE7IbDPGEGsBCGF"],["1kGqCGDBANGGBEEDEGD"],["3tFjMGBHDDE"],["z6FjWEBADFEJABIKC"],["hvFjLFBBGIA"],["t3G5QGJADNAJM"],["p2GxRRCFGSB"],["n0G7XDBBECCCCCD"],["ooFoJBBBIGG"],["-0FyQDIKGCB"],["k_G1XVFQG"],["wxG5RFBBEEC"],["sxGrRDEEECD"],["8zGtYBDDCFECGEA"],["2zG1XNEAIGA"],["gyG5aGABFFBFKIC"],["oxGtaNGAEGEFEKB"],["2vGtNJDDCIGGB"],["4oG3OFARM"],["-oGrKKLBHIFIZXaDOCCDI"],["kqG_MQBKNRCNIBIHAAG"],["-pGhMADFCBO"],["gnGrLFCECEB"],["moGnLKFLC"],["mlGpKGJDDHGBIJDDEMMEBCH"],["0lG7KFBBIIA"],["4kG7KHGIG"],["8jG7JHICGKF"],["ukGjKDADECGID"],["6iG7IDABAAECCED"],["8lGwIDABGGA"],["u7GrtBHECE"],["s5GhzBDBAEGE"],["uwGh5BADHC"],["n8G12BHDAEDBGJFBFCEILCME"],["4vGt_BCDNCGECGGA"],["myGx6BDDIBABdHMOAIGA"],["srF3TFECE"],["4lFjODKEE"],["82F5WAJHK"],["6xFrNBBBAAECC"],["suF1UNHGMMCED"],["8qFnRIAFJIFBDVEECBMKG"],["qqFnRFAEG"],["4qFnODAMQ"],["ijFzOGDVAAEGCBGGG"],["ojFnOQCKGMJDFTNROFQ"],["qwE_ZBBDAACCCEEAB"],["wtExgBJKAK"],["m4Fn2BBDHCIG"],["-zFjyBDIGMEBCL"],["u5FryBEFBBPE"],["g5F1xBMJAFHDNQ"],["gsF1sBOAGDRBHFJCRBHGEGcGKA"],["-_FpiBDJBCAGCECA"],["6_FjiBDGEE"],["s_FlgBDICOIIDIECEL"],["-8FrdEBAJHK"],["syE8JBDDECEACEA"],["81EkNDBBEEEEBCB"],["k2EmPGCCHLADM"],["i2E0ODADKIB"],["q5EiNDBAIGG"],["m6E6LCUMUOgBBhBLJ"],["47EoMTHFAFIOOIAKD"],["g8EuLFAAE"],["06EyLADDBDE"],["q2EyGRHOM"],["04EiIFBDKIEKD"],["y9EmMBECIEJ"],["k9EsMHIAIGG"],["s4E-QIDDJFG"],["04EuPDJDKEKGC"],["q5EsPJGIC"],["k6EiQCFPQ"],["46EyPADBCFGAEEB"],["06EsPONAHXSLJEa"],["u7EiRFDFEGSIJ"],["y4E4SDNDQ"],["i5FpHJIAGKD"],["g4F5GHGGECB"],["w2F9FDEEE"],["63FtCQBJHZAEK"],["qhG5GDOEEEH"],["m7F9BHECE"],["i8FpDLAHIMCIB"],["88FvMICBJLEFQ"],["-7F7LJGEGEB"],["m8F1LKBEJRCCCBI"],["88F9KDKEE"],["6-FlLMDAFJCHG"],["8gGlOHDDE"],["-_FrOIDNCHK"],["wzFzKBAHEBCKBCAAB"],["opFZUDUNJDJAFQDD"],["qpF_B6BHZDdK"],["2oFrBDAAEGB"],["0tFvKNEKG"],["-iFjCCJFDNCFG"],["4jFzBHCFMQC"],["0jFfBBRBEC"],["wjFAUFCFDBLAJKBBKJFBBGFBBEJCEG"],["ygFyCFADKGGKGEFDJ"],["i_ETFACIGA"],["k_EfDABCCGCACF"],["u_ELGFDFMHFDFGFBAGFGCGEB"],["mgFhCXDFGKK"],["uoFjHBXJBLMGCCGFGGAIK"],["moFhIJPDBDCAQEADK"],["mmFrHDDEMIQBL"],["gmFpHDBBM"],["sgFxELDBCMIEA"],["g6E1FAJFCDPKHJBFJFABGGMEYII"],["q5ExGDFJEEKBMOGCNFH"],["y4E5GJIEIGD"],["i6EjFFFFIKC"],["y9EhDHOCG"],["w9EnCOAPDTBBE"],["m8EjCKAEHjBDBGCI"],["g6EtBCJIGEDBDFBDCDFAMJLDGEK"],["q4EPCDJB"],["w-EiFDAEIDECIGJ"],["i9EqEFABM"],["22E7HBFBKCQ"],["yjFrKGIIB"],["mkF_JJACMUYEDDBBP"],["qiF9JFDDGAEIA"],["4_EjKIBEADDHC"],["w-ExJADHBFFPCJDIOIBQG"],["25EzNDAAGUMCH"],["s4EnNHCME"],["47ElKSBEFbDDCCG"],["s7EtKFHHEMK"],["86EpKDBJJLAKKDAQE"],["k6EtKJBGGGA"],["q1E9KBACMEB"],["owE1IHACEKB"],["szEiFFBDEAGKB"],["izEkEABDEACACEACB"],["sxE5EHHDOEOGE"],["kpEvBJDCMKB"],["snE0EHAGEJIKIGH"],["mkEyDBIGB"],["k_D0CCFBFHBDKKG"],["igEoBFEBMIF"],["kgE6BADPGDE"],["6gEeVEAKUJ"],["-gEiBRICEKD"],["khEWFAAECCCACD"],["qhEaDGCCEF"],["giEwBGBDFDC"],["4iEwBCFBHFIHBEI"],["gjEHIDDAREEI"],["yiENGDJHDI"],["2hENLAEE"],["onE3DFJHGJDBMEOIAOFEF"],["85D6BSTFPDCDKHELUGBEG"],["-_D7GJIKB"],["y9D_DAFDEFKAIKH"],["o9DtDHBAK"],["68D9CJEBIGA"],["-7DnCLIJQEKKAMbAD"],["i7DVFAGMFKKJ"],["y4D-CZMDIICUP"],["orEgDDCCM"],["uyE-IBBBGIEAF"],["goB45BRCBE"],["0cypCNFFGNEQAIGKDEF"],["mdmpCDAHCCCCCIBAB"],["4sBwxCCDBDJG"],["0hBqiDTGYD"],["qkB0iDYANB3BAYE"],["y-BikDTEcCCB"],["ogC-jDzBCiBE"],["2oBkkDpBA2CE"],["ooC-lDeFbBGDVDZErBBJEcAmBK"],["skCslDmCDyBH3BFhCEXEMC"],["u_BqlDPCWCCB"],["opCqlDOHLDbCdIiBE"],["yvCgmD9BEgCAEB"],["8oCkmDPAKGyBABD"],["uXskDJBNCCCEAIA"],["iOoiDABYDKHnBIRMDGQB"],["gYg9CDBLGQACB"],["uiCi5CCDFDCBDBJKTGWC"],["q9Ci7CVGMGWDHA"],["s-C67CDCGCUA"],["-_C67CDAPCFACCEA"],["ihDs6CfAWKOEYF"],["sjD86CXCJEUKQH"],["uoDy8CdCOC"],["-pDi9CBBJCBAGCGAGA"],["qsD49CSBFDVAFCEC"],["2mDo-CCBHDTEIEKBBEEAGA"],["24Ds_CCDJABDnBEEE"],["g6D4_CBADADCBCEA"],["s4DqgDpBB0BIAB"],["8vDwgDNCSCCB"],["q_CyjD2BFlBATEDC"],["ikDilDpBAIEYCaB"],["uyDulDNDzBE"],["0mE2hDHDrBE"],["6kE4hDHCaC"],["omEygDFCECOD"],["0sE4_CGDDBXI"],["q2Es7CRBFCMC"],["27Eq8CHEMB"],["-pFo-CTAKSSJFDAB"],["u6F6_CdACCKCcCFBBB"],["oqFs8CfOaFID"],["usFs5CJDZGeC"],["8oGw4CHABE"],["wzGg3ChBCVIWGoBDCD"],["ysGopCHDAEMIAIgBICL"],["qwGykCAFjBYWABF"],["wjGq_BJEME"],["8iG8-BTJFCBGUGIMICAH"],["yiGw_BHEIA"],["g-F06BHDDCYM"],["k7Fi5BJBIKaOKA"],["45F04BbLJARRLFOSaQAGGFKCSKEH"],["o8F4pCFCKC"],["usF8kCKBTPJIHBOQ"],["wrF8kCFFNA"],["s3F22BDAACMA"],["42F03BOBBDXJLJBHDEAEaa"],["s7E0eBFDABEIG"],["86EseHACEIB"],["qgFqhBPHCDDDADFBEOIGBEIBGKED"],["ohF0iBDCAG"],["6hFojBDBHEWKAB"],["ojF6lBDABABGECGBAB"],["2jFgmBDCIQ"],["6gFgpBIBCDHB"],["0iFqoBFACKGCCH"],["2mFotBBBBCBCACECED"],["-sFovBDCCEBGKIBHGB"],["0wFs4BFEEC"],["2oF8qBFDFEOK"],["shFipBDEEIEF"],["0hF0qBDAACAGGAAB"],["4hF-qBFAEKEE"],["-gFwrBDBFCACEECCCA"],["igFwrBADHCAECC"],["-9EwpBHEIGWCBF"],["69E-qBFEKE"],["k-EmvBBFDG"],["q4EsnBNCLKKB"],["84EulBLCBGOD"],["41E6fDAAIGB"],["gqEsaEAAFHC"],["wmEwaFDBACGCACB"],["iiEgNBNFM"],["igEgPFAAG"],["-hE2BFDFEGE"],["s9D0GBBBCAGCACACB"],["68DiICDFDDG"],["i9DgMDHAG"],["g7D8JDDAOGB"],["s1DyIBDHKCIECGL"],["0zDmNFAAIGGCH"],["8zDuOFMGOECDMGgBIIANFJEPFD"],["46D2NCHFG"],["m7D2OAHDABK"],["g7D4PCFFDAO"],["g6DqUDCCI"],["k2D-TDDAGII"],["k1DsXHGKA"],["k1DuYKDBDFADG"],["-yD8aDCAGEA"],["-xD4bDDCQCFCB"],["uyDgcFECE"],["wxD0bLBIMHUEAKN"],["lLy4CFAeMOBAB"],["viG4XDBHEAOFOKKDGCGaLQT"],["vkGwaUBFDRC"],["zjGmaIAMHDDLBDIHECE"],["noGqbBBCEGE"],["nlG6aEAAFLEDDFMME"],["lnGubJBHGIGKA"],["hkG-ZDADGGA"],["2gH8gCDADABCACGCGD"],["49G8gCFAQIBF"],["k5GuhCLCQE"],["g4GoiCaFTDRI"],["93GyrCUFPCPGGE"],["10GwnCDBDABCMC"],["7oGklCGECHLBBIGC"],["7qGykCFEIC"],["lrGgkCDADABCACGBCA"],["5nG-kCPJEIKG"],["t1G4hCDAGEEB"],["pvGyjCHABEICID"],["9uG2jCDECCID"],["9xG2iCtBTQQMCAEEESA"],["nwGsjCEAGEEBLHIDtBNLAaKGGIBCCNECGQC"],["x3GqhCFAGGGB"],["94GmhCWBhBBFC"],["r6GihCXBoBICCHCMEGBHFEB"],["38G6gCGBABTFKQGB"],["_7GghCHCEC"],["t9G0gCTAQEEGEB"],["r-GygCFACEHGKAMB"],["k8CtiCJBHIYD"],["02Cp9BFGIA"],["qvB16BJCIC"],["6iB-sBFAAIIIOEFP"],["giBqsBDABGGI"],["2hB-tBKGGB"],["-fmuBDADEIG"],["0fquBDBDCGE"],["whBovBKDHBJC"],["ygB-uBCEKA"],["ofmvBBBJKKB"],["yfgvBDBFG"],["0gB4vBDBDEEEFIMA"],["ghBmxBILDACBDBNGGEHDHEMG"],["6ewwBDABI"],["kgByyBFBDEEACACB"],["6fgyBDHDEHBAG"],["-e4yBDAFEIE"],["ugBmyBHBDCECECCAEB"],["jU6NFCIE"],["tU0YDDACBCEEACCA"],["vVipBUDFDFAJE"],["tUwjBBJJFJOgBK"],["jRkkBFBCGOKBJ"],["3RmjBFDFCKEKUGCDT"],["1PqJPEOEEB"],["nTmjBBNHBFGEK"],["tfmVFABGMECD"],["jfgVHCGC"],["vVgjBDECEGD"],["rW4iBDFDCBCEAGE"],["zcqUIDADJA"],["reySFABGGA"],["pW0jBFKCEGACF"],["je4UCBHCBDDE"],["zc6UDCCG"],["_c-SBCCEEB"],["pd4SBDHCDGCK"],["03BjPAJLI"],["w4BnQFECKED"],["q2B7OHGCQEB"],["0xB_JDCMM"],["sxB1HCJBBLMES"],["ioCzZJADCEKKIGH"],["4lC1aREDICGOAIJ"],["u8B1QFBAGEC"],["u-BjVFHCGGK"],["6xBjGANDHDEAQ"],["-K2EGACDJRJCAIGC"],["qIEFBBIKGCF"],["l3B9cHAEE"],["38B_gBBEEGCBBDAD"],["z8B1iBBBAKGG"],["x4B7dHAGG"],["2NkqBJCCGKD"],["vF4jCHFHAQOCF"],["rGqlCJCAGGC"],["nHumCTBGIFCIEOF"],["1H-lCCLHBAIHDEG"],["tH4lCDEMI"],["pB0rCDECEEA"],["zB2rCGFECJVAKNGMCHGIE"],["dgsCDDBAAE"],["9DwpCFADE"],["nF0iCEBJDHEAGKA"],["5D6pCMDRAFCCGKB"],["rI6sCJIID"],["_I2tCGDFAHE"],["pI6tCAFHAEFPO"],["3H-oCFFHDEDTJFCKEHECCDCCEMABEWI"],["1H8nCAHUBLHDGJARKQI"],["_IkoCEBDDLC"],["hJsnCFCAKGB"],["tMsjCLEKA"],["gZurCKBBDFAADLABGGBBI"],["waivCIAFDFG"],["2UsmCDBBCAKYeEA"],["8S4kCPEAGCCQF"],["kRgkCADHCFDHECIIGKFBD"],["2P2kCRBGG"],["mO0kCQDADLBPEAI"],["yM0kCJABG"],["uNukCFEOM"],["oN4lCBAAIED"],["kOgkCLCEE"],["6NynCBAFAECGCCBBA"],["sKwkCEKAFKA"],["vBs5BADDEBCBEEB"],["pBs_BHDLCKE"],["kGqiCDBBABCCCGE"],["gNy1BAFLE"],["sF6xBREAEQA"],["6B0wBJAGIKA"],["9mBoxBBBBCBACECACA"],["7hBqwBHADEKCEB"],["3iBmwBBAJCDCDEOD"],["5jBkwBDADEGCCBCAAB"],["ljBiwBLBDE"],["hgBqvBSABDHBLCDG"],["mS6sBABDADCAGEBEB"],["wSo4BNEEE"],["kS63BHKCKEH"],["4ZgwBGNJCBGDBIK"],["kaovBEDHBHIEE"],["8ZowBFAGK"],["kZqxBHAJMMADDEH"],["6cotBFACIGF"],["-E2gCGDFAJC"],["3_B-2CJADMKCQBHD"],["puB-xCFABCCEGAEBBB"],["9iC64CPEOGGF"],["3kCg7CVJZGoBG"],["zgCy4CRCIE"],["55BgsCFFPGYG"],["l5Em8BGJFEHKEGEDFB"],["l7E-9BTIKA"],["p6E-8BBADI"],["p-Eg-BLEAGIA"],["v8E0-BFICEIF"],["5zEmkBFGCE"],["h2EsqBBABADEICCBAB"],["71E0qBOBJD"],["9zE4pBCDFADG"],["j4C4zBLBBAEAEECACB"],["t-CisBFBGECSCL"],["15DkiBBBAEEGGMEAHJ"],["t5D2gBJaAQ"],["3yD8kBHEECGD"],["hhDqeDDCBEECBAPHAJS"],["hhDubJGKB"],["xhD8bHEEC"],["piDmcMACDJADC"],["xgDsgBFEGGAQJMRCQAUNAHDD"],["x8CscHABG"],["p7CwaDHVAAEIEKBIG"],["38C4bMOBGECAH"],["5_C8fUNATFGEACMHIRGEE"],["x-CqdPGCC"],["x9C0cDGJECEFQ"],["j-CoeHBEENS"],["rhD2bFCCE"],["lhD8eAJLFDILGIABEEGCMGD"],["nkDkiBCDDIFKBICBCD"],["lnD-aPDJGKAFIEGMB"],["jiDuhBYBhBHJIIDGCCG"],["vkDufHHKOEC"],["1lDmYKBLA"],["1sDsZBEAEKE"],["jsCoRBDDGGK"],["hsCkSABHACGFCBIKD"],["nsC2MjBDQIAOFEWGIAFH"],["n1CmPBDDK"],["9rCgOBBACEEGAACAD"],["rqCsQDABIIF"],["5vC-NCFDDTEIEGD"],["jtCgPDAEIEA"],["jtCqVFBBEECEB"],["zsCiTDABQGD"],["1sCqUFACKMJ"],["_sCgUBBDEAMID"],["tsCuQDGEC"],["p7CicMDPC"],["91CiPJEFK"],["jpGopCFBDESG"],["n_FsnCLDBCCG"],["z-FkpCFCMC"],["tiG4lCHCGC"],["rhGymCBBAEMC"],["3gG0mCDCIC"],["_2FyrCMBTFDG"],["14F4qCDACEYSKB"],["_4FirCBAHAACGCIB"],["x4FyrCFJDEEG"],["94FisCFACC"],["hmF0kCKADHDAZYOD"],["vnFinCKHDBDRJBAMECHGBKIE"],["zmFulCNLAGDE"],["lkF8kCEHHAAEFCAIIB"],["9lF2mCHAEKMH"],["jlFkmCBFHADEHCBEMMOJ"],["_lFqmCJEGEKAAF"],["7nF6oCNCGC"],["lhF0hCHEDIKF"],["1jFkkCCGGB"],["5iFujCFDHEBDBCKI"],["piFuiCZQECSFIH"],["7_EqgCHCBGGC"],["tgFwhCDAAMIE"],["thFsiCFCCI"],["5tFg3CJAKCGB"],["nsCiLBEGECD"],["lkD1DDBCKEEID"],["5gC5BDAKOAKGIMEEDFN"],["z3B1DDDEO"],["twBrQEICD"],["l-BKCBHHRCEI"],["7-BuCFBBKGA"],["p_BFLHDECGGCIA"],["59BDPAOIGD"],["h_BGAFFCAGGGEKAN"],["1-BQDBBGKG"],["9wDdHCAEMECF"],["3vDjBHAMI"],["_lDmJJECGCA"],["pyDRFABGIC"],["hyDCSfDHJBJADGQMJKDMFAKG"],["lxDNLECE"],["jlEgbBBBABG"],["lqEofBDDI"],["ttEqkBNKDKIBCFGB"],["9vEijBHCEK"],["zrEweABLICAEA"],["nsEokBDJHEEOEC"],["hsE2eJKGUBR"],["o9E2IBBBGAGEB"],["47EsODAFGGC"],["45E1KBBBCEEGB"],["-yEtKBGGC"],["w3CkzCFAPIaAAF"],["i5Do_CDAEGIB"],["m9DwjDJACCACEAEAGB"],["6pGk2CAELEAKBCQKEBADJFCJEF"],["nsD44CmBGWAEABBCBIAGSBGZCVMYKoBHVKKEdAJIBEEGMEoBFvBMSKYEYBDGUEeEqBBKDILWHAFMHlBRaGNJKDHBBFeMMAHGKEKFMEMFAHQFJIGKwBFfGHEEEaGiBAwBFYFCFhBVeOkBACDDDjBFUALTKGKMaEGBTLUIULDKQGyBHQFCDLFRAbJOAMGKCQBUEIBAFDDtBNGBMGGBFNSSSGYEgBDcFEDjCRyBGEBLFKBUGDEMEcJIJDDdCxBJeEYFaAWFADDBtBErBFaCWDEDFF3BCsBFKHwBBLDIFBFGEEDAGSEBJLHEAUIADEBOCBHGDAKUGCBHDCDOCgBLJBEFbAiBDKGWFHJRHeGWBMGgBPJDNGHBUJJDbEGDFBWHXBIFJHTALICFJBMBANJLLGJBHEEKLLVOLMmBWVHhBDAEIEPBRGTOCDFAHAEDBFZGIHUHFDTAXMLBWDAJODDHQESHJDULGJCISFDBEDKIUFIDLFUBFFPAKBIHSADFIAIHFACRFALOJGIPBDQNTCEJBBrBSBDFCJIBHLKJCZQGNdOPBeVSBBDsBPOLMDFDEHJBtBMvBGTEROZAhBKGEPBZOQCIGRERCGGNDHIdQIIZAFHDILCJIHDKHBBnBABDrBFjBELGFGEMeKDGEE8BHOHDFGBEGRMaAuBISAHKVKDG2BYKMYIVWXSCENBFCAOLAEFJARKHAGEHCKErCNCMYCMGfKBGKCJCJFNEKGdCFQVAdONHSDIHBDbDxCIaJCDBAZIdDhBGbB_BGNBTEHIEE5BHnBKNKJMgCDcCbIxBEdIHSQKHCAGUQEMWMoBM0BG4BBCDtBRVTOLBNGHwBV"],["72C4nD8DBxCLsDISBMEUDiBAIBHBWFFD-BCQDEBBBlBJ3BH5DJJDnCH2DIkBB3EdjBLXAVGUJBBnCF8BAfHKBLDpBBtCGJAEBsBBKFFD1CD3BE0BJsBABHhFCcFiCCoCLRF7BBwBFdNxCBDRPFxCBrBKOHdBIDeCkBDcCGBCFEBQBUEMFADLH_CNLAGGDEdChBIMFADhCALKDNhBBlBGNGJHZCFGAHjBADODDCJnBECOsBKgCEfINIFEOGeCYDgBNiBDuBEmBSCEDBrBPpBBRCAIJImBKQAbCEMHJXHXAMKnBHZCCIcOoCGmCF8BKbDtCEFCGCgBBhCYfCNGHKEGICoDBwCVwBDQCjBCvCY2HWpCEQI4BM7CNVJxBHrCBcGvBBfFlBB3BEBCGEwBKuCGjDD9BPNA1BIHCECqDE-BK9CH7CBNEeEREqBGoBCjBAnCFJCeI7BDPEeI0DKqBFOEgCB9BIkCK0BDmBJMAPEIC-DP5DWeEPGyBDNIIC6CDrBELEKCgDB8BNOE5BOsDAmCLfIEEWEgBAqBHREMEuBA"],["71D25CUACDcLGLDHaHMNMCIFLBREHFUBjBPYAQDcEJDqBDLAHHNCUHKHBRMHOKKUOKKAoBRITTACNEHcPGFgBMGMSKKYIEaAJEKIVIDYwBAaF0BBPFSDCFiBBCDXHWBGDBDXHZAOLICBJeRFRTDLHtBPHCPOLCCCLELEJFOCWJOPADREHDFAlBOrBBAFeJtBZNDTAfOnBKHACD7BEODCCsBDmBRsCFAFJHfZbHPECFREHGJBIHLCGHFDZDvBINA1BOEDBDEDMAFEyBJLFYGuBPDNZFjBACDODXBHFIJZIMFFBADLAEDDAJAMHXJAFHBCFRVJDEDFRAbFHaNBPKSkBAe5BNPkCOUBmCPeNYRoCPUJFJMIuBAkBBYHIJHVKRAVFHcXAFJDQAgBRINPJOGQAKFUPNOAKIIICKFGJGMJKWULQCIHIHYCGECFEECJEECHENQsCaqBcIUAcNWZUlBQCKcUDEEIQDFEGEAGCCLEGCJMIELEIIXBSOAMKETMFSgBK-BJEBDBSEcHAEmBKgBLIBCBDHKCKBIFFDOEIDHFIBDBOHsBDMHMCEGGBCFJFDHELADnBBkBFGHDNOBHRDBFGNHOBWIWAMFGJDNbJaGQSEHFFMKCPGIiBMOMKFEHEEFKICBCIEMCLGIGEBDGSBNGDECGQBDGOSMDEDNFSCEDBHICMLHDGDKCGFVFcABHKCIJbLOEYAHJRHeGIHOBCBDDCFVDYDCBFDaJALtBEeJHFUBJDOBCFFBOFOEIHICBFIFPRiBKCDKAPPYQKBILQDSGEHSDLHdFHHtBHNJJCMFHDBFkCecENAAEkBBKNNHGFUMOAWLGJDHENTDWDBDHCOH1BdRApBFZTlBVbAjBFHGfCVBvCCxBDRHPZlBFEBdLbZ1BKuBLEBJNxBlBlBJfNTRHBNHJCMDCDdNuBSQWyBa4BQqBkBwBciCUsBEaBYLCDLCKFDLjBPbIdHOCUFKJYIBBODHNPJSBBFOZaDCBHDOFoBDBDKBWKGHMCGFCDFDQB5CZLCCFBBPGDFBEFBAHvBhBJCFKFBDCBOEIKIJBUIECJBECeOSGAEEBAFIFBGECeG7BAAGWOHBFGCFHFrBRHECEFBCDLFPBJEAJEBHFZDHHDEHBDCDJJEEEDACEHDDNHDJDBEBDBEDFBCAFFCACJDBDCAVXDHKJJBHHMDEJIJSEDIFAGCEFCJbFBGRHAKDBFEDP3BDbLPJGMDIANLNMFFXAIFPFBBFRRAIJCNMEMOIPHFFCFKVIFDHGAAFjBzBBKOWHACGFCEIHBHGAGKCHEFBIGDEDBCEEACEBBBGIGGCDAGEHCBDFABFBEBFFAEDADDACTEHJIMRPGDGBDDGJBIUJTKBGFaLDHFAXSWTKDBAEBAFFCBFLKSRDBJIXGYHGJUASrBPiBBHINNIAFDCADFCFFHKALcABJKKEDAHPLNCDGFDLEWLLJJGEDIDMCEBDDhBJDGAHNJHNAIBJPARHNRBGBJTNFAAFPFLAIDFDHGEJHJHBCDHJCAHHEDFDBNKnBezBDJGNFMAMDFAKFGENc_BDlBNXXDBGIBFEJUNGJUEIHFCQHAADDAPaMOJGALHGIaAQpBqBNGJBDFjBHDCAEEDBGNIEIHFZKOAFElBFIEAEFAFHHBCEFFPAICHQFNdCPBLHVIHBBFIDSEEBFDGDKGCJNHIHUHFHDEFDBIbOEDDLNGJFVGGADKJAPMJFCDFBlBKZBBCGGDCDHCDhBLIGJACIJBENNPXLPFKGRBHEKJLDBCDHLBADECADDDLBGHFLLECFIBBLERMRALNdFXD5BDNETSVDLAMNUERSjBehBGTUVDAKDBCUBQHONkBMaASKUACBADODKGBMDAcSCQIIAYGSWKkBGSGSCeFCEFAMCKHAPXdBPJHCDKCJJADGCNpBHKAOFFFNIACDFZCDDhBXZADMFCEBESJSIIDYBWCQGBCUDWEQHECBAKBSNLCADGAIHKAFGMDIJFHBEBBEDEPLXBRCjBFCCKFHEHBLBCDHGBCFHNUnBWZSHAJGABFGDMADIOLUBkBQWQUBGDSBaNoBlBBFEACOFKYSKOQEBMGSFBKSIIQMUDFFEDKWiBAYQSIEMWKODELJLVHENIHDAGNThBUdOEGICORiBBKEGwBQGGMBAIPBDMEIIEGFIVQAQBSLGJBHGHsCGQPcHMCaOSCTCBEgDETHTAIJBJIGKPEECDAICAONAGGEMJMDIHHHJVNAMHUIaAmBVQLMPFlBKSQBSRMFCZKScDMDCDAICCoBCUDMDDRMSQJWDYTAHEEGFEHBFGMIXEKOHUtCEBGJUHCTPLRZVLPZAJHHDFJAPHSDKCqBaCDBBIZMJQGMDQINjBIGKYICMOKDEEDEAKOQWEGDAEYFIFQDWLIAENKKQLDBGCELHHEDIICHDBDFDZKKIUGBDLKIUECESBcNOCQFqBEUB6BhBSTQPODGHWHYCUDKPQ5BAlBTzBPRFAAFTZVLJJDNBGNhBVdJDAIHGFHEDNbEABRCBCCDXGvBL1BCTTVFzBHHPfPNFNDJCTbLLLCHDFjBAHIDBCHbDBCKCFEfFAFEBfNDHTAjBRtBfEABDJJAEHCDHJECFMDFHDBCDAJFBEFBLGTDNCVHTRJTTVrBXftBhBAKGAIESKEQGACIKIAKEACIRDLMAHGDFPBEFRRLJTCJTnBdZPXNJdLdGVDZILKbBVYBIEUKKDUCTDFFAFVGVFDKPeLQNAFHHBHMPQDBVZfFNZNhCPxBFdCTGCRKDFBEBBPFBDLAJGHFJVHZBxBOACHBDLGnBSFAFGBMCCGHCSEGHCPDDNDRQRFDDeHVJPNAdDHLFANVCdLZfEPcVmBFEHBHDFNFMAGDhCnBJLDXDFNDPOAHNBQAIFVJHRHHGCGVPBUDWXhBEHBFHvBLHXARLDhBKJMEEOAEFBDEACKSIGGDEFCjBPHFBFTIGGAKGEMBOGYCdEHFJEPTJALIQGIGBCFDNDPCBKDADMQFGCAESBSIKJFFIEDKEGBGXKUJCDfJDAJKREGEEAAOhBILOQCDIGEMFILOFCKGCBGNNHKAEKAbMMKQBNIAISAJGGSDBFRFEAgBOGRAFSeBMFGCHGDOJLLAPKEGMFEENGOKAKFGFCBFTGAKVHGFBDHEBGgBWFGAGkBECCAIGEGBJTCDPFSCCMGCCJJTEAIKCQAEFEAIUGMDLIHACGCEYKCGCGXMCKGCCIDOIKGADQEGEADKECKHDQJABEGGMECGJHPILLNCFAGGHEFQMuBKGGYJcCSHOAOCGQCESECIaIKAGQUImBOUDWMSCKDIH-BCMKIEUHcMWWyCBWKWDYCeEOHMCIIIK2BDeCmBH4BnBcBMFEVMNMzBU1BgBRUPKRgBGCCSZoBLMBQRODSReV8BZeHWPWtBcAGICCIRoBEQSUeUMaDWDTDACILNZUIEAGFiBOKEKGAHKSUBaOIiBICKHGKKIDAYIGOAKIGIBGGCIKKWFABGBDBMDBGICMBYHKMKHQEQfmBJUECAGGGQJNODDHEAFDMRMTCJFDHCBbPADSXLBFHPBHcHJJCJSPCDERAFBBHPYFCGLLEFEGIFORMPEDOVOAFOLHHHILEJQIOAEJGGEAEbaPUfaCGKDFQLCADHFbGIDfMTCbOjBEhBWVYrBkBRKDBSJZICGHBDEDDIDNALJpBLbKVCPKNEJKlBGtBUdSLMfEdMRUpBSVcFQQIDGFCKMCQJEHQAOFMXWVcfWIDCGRENUKBZODGJBACGIHFHCFQKKEBHMHGJAHQNCHGDOCIVENSJCRWBKHEAINSNgBCQVGFIHEBDFBfQGJDTKZANMLYTKPEAEFEAELKDEVQNGLIDGPGDDMKHKjBKJObBJEJMJEKiBhBDNTJNc1BmBDAJMAcNaXQFODFNDJKXKDKRMBEUBKCABKDDIDCIUjBkBbQFIAOHEBQJGBKLOBIEEJGHODMDABSFIZQLCDKZERMjBCFGAUHEBKPKXaAIEIAENGJIDOAICCGHKDNSECeChBEDBAJRIBBAKEBfcFkBTWIYEUT2BIWGCDAGMIsCBYgBBJEXCAMEFCIHIKEJEBDJcJMBScJiBAIDGEGJPNDHKCFAAEUQCFHFGFBFDABDDGHHQAMIBSGIFIADDCAEECJGGCBKFCFKDAFBAGDABEMCCEPBEOFJHBPGDECEIFIEJCBKEEDCBCEFDFHDJALGNSIKAIHNRABGDHRCNEWEXAGGFAAIFFPBZMAIMKcEZALHHGAGEIDACIOGICWNTQKKBGBHfPJRJOMGAGEELHIWLBFMXIBIGGGABFOFQAIFJKTCBIIEFCJBJHBJLFNMRGMSQERBNIEKgBgBFADEBJHJCMDOCIDJENFJADNHLCHOMGDCBQJIEGdHFNFADIOQMCNCLGLKAELGAGZEAIHMECSFRMOCNAFBNIAKGILJRGTSHWFDEDDAShBBDRGNACIHIIEFBFICJFBLIRCCBDDSBIDDDMAGFBDTDlBOlBWxBQKGDGEEGBCLEIICRGlBLnBIEEDEBDHBzBGvBDCEDCbIIMVJZEKGjBEGCJECGMC_BHDCKKXFBBICFHHAMFBDNDWEGDJDAJJFfAFEHNDGDFHCCDJFPANLJCCBXBHCCGUEOKPDPGSSEIBKkBM2BDlBKcOLANHXAnBLHFCDTHAFLFRCOFAFVFIBDDJBBEJDDFNFDHgBHCBDFhBREABFdFfRZHCFJHfHFFRBBBGBRBFFKDHDDEHHbHFFBGBCdLPBLDJACGIALCVRNDJIAJHBJEBFHBCKQEeUSIUEABMCDDIFEEQBJIKM4BYIDCKOKSKQBJIEOCEOCLCAGWODAKQNJpBLLKCGOALELFDABJCJFBbUJDRKjBJDFfASGDIGENCAGGMPYFEKMIEHAVRGBAH1BHdUPEAELCWOUFCBDDOGKFOGTEMCFCJDrBEDAOGRCBCECFBADFAFIFCAIJBBGOCLEUCFECGUOSCDEKEHDAMEEMCFEGCSCODFFKEIBcIMMgBDWIGGHSTIEESCEEBEJGLFLAlBPTKDBKDDDVIzBFtBGNGEIVIQAEEMCxBEbKqBKaKeAEALECC2BMgBBJCEBDJFDODmCBUKQDBGfCAELINEBEKCOFBFGDMD2BBDITCVDRGBEMIDApCEXUxBS3BMQEISsCCeIQKIOqBYGDLDqBGkBMGBFDEADDKBCIQAbGQGQEEBFBEB2BE6BWDBEBiBHVFIDOCSIUDFDYDmBGmBDCBHFcDHDsDC-BLsCBwBF4BEoCR4CF2BPuBHYAiBHHGREACMCLCIIQAGGcCCIUHJJoBIKIUAFCCCOBcIMAUKcBOCCDDBvBNrBDPJNBbPKDHEeAFCCIgBIEGSACDKEEJSOQGwBKJFEDICSIEGYGRGGGeJWTSJeHOEHIGISGJCSEEBCNMBPJGDgBCOGGKoBAsBFgBJ0BFgCNwBBHESCgBFqBRFFZAPDAFLDMDqDD8BEmBIQJYBILKIYNEDDBTAyBbROBIYBHGCCJGDKLIAEIEBG4BGAESGIGHCTFFFnBAFBAFTARGQM2CMSBMReFADGDqBCuBNeBsBG-BDUCLGCEcNUDMGBEVGRDLIECJIiBCFEECUBOJWCJJeIPdIJSCDDQBAFnBCYRCELKaAGMHOHGIKcC0BWHCBKFEHHVACESIFCAGaEHFCAMGHEXBPIFBxBKRKBKMIOADCEERAHECOEEOGUBGGRCaOaE"],["9kD-hCzBMIGcAQL"],["_7C40CjBAJIOEkBDEH"],["rhDqvCIAGHPFXM"],["vmD2uCCDFHjBRbBHMUS"],["tjDguCMHPVFBRIAMKK"],["1iEugDZChBWSAMDOJQBED"],["r3DohDsCBSDHAHHhDCJECE"],["v7DgkDAHFDVITAFEEEMCeB"],["pwDygDPBdGFCBGOEcBSFAF"],["90D69CEHDHnBAxCQaQqBIoBJQJ"],["npEqiDSFAFFBjBAdENFZEtBAgDQ"],["9zEw-CRDXEeMoBIGAFF"],["zjEk7CjBQdIOIsBCiBFEBBJ"],["_8Du8CiBH8BGWDEFZFMAEDVDZNgBEWLBDYCEJNFIDFFGDADnBHXADIFDKLRFTCXQhBQXGTAlBQBEGIOEMBaNeCEKKDDILEICUBTGVBXIUEUFDGNEAEmBAECNC"],["jqDyxCQIQJYBMHuBLORHHqBEMFDBQDfN1BKBKXCAGJALDFJVHNLdHDCJW3BDBCKKcKDQMoBKMKCMDGHFD"],["z-Cs1CYFATDHXFjBBLAHKDICGUQ"],["tjDi8CyBAsBFkBPADIDLDrCEnBFTEHCHMXGAECCDEAESC"],["j6Dy_CBDIJDDCFLDUDCJLEJDCFIDPCCF7CAHGOCXECC8BMlEHJEaMwBDNAHECENCBCMGXCOGSBMFwBNGCPGWChBEQCfGDCCAqBGaHKADGME"],["phEkjDWBKFDFGBIEcEaFDFcASBQHJDEFYHGDFFfBZERM9BCFCACvBDfEJEEE2BACCDAPCaEhBCMEJEdHBCIIfAEK"],["7yDulDwBRCD4BDEBBHODaBPGBGGAiBBAFJDcBIFLLmBCOFOEYLrCNZJLCBGGGJBDBDLKBABFBXEGHHHLAlBQBBWPdINBMDJBzBEfGFCECkBC3BCPGUCdCJG0BGMGyBC7BEtBFFAGEFAnBDZEEGyBI5BDXILM0CDCEOCtBBnBGiBCXIAGIAcAOFmBA9BMKGKCkCCCCFCfCAEuBA"],["71DkgDUAWFCDNHWGkCEeHhBB0CFCBFBvCAuBFmBJEBBBPFeDECBEICSFSEIDME0BHCCFCEC2BEaGcBsBEkBDKDcAIDFBYBGHjBHeBKDVBPCIDFHhCFnBEFGAEPEGFHFjBDXEDDLENDnDAFCIKHCLFDEJBADNDnBCPECEJBADPAPGHKCCLIAEOKFIjBU1CDfKQExBGACUANEACkBE"],["n4DmiD0BFRFQFJFnCFAEZIcCrBIJGKCLImBCkBF"],["hqE0hDiBBFDrBDeFDHTBhCDfIBCECHGEEkBE"],["twE2gDCBhBFWHRBMHpBFBHHBdEIQDAPBFHNBIFPHFARIFJIDNFTAROFHHAbCTDJCEEBCLAUKiBCiDiB6CCGCNCWE"],["rnEi_CYBLHgBEMHAEIAFGGCqBBGJRVrBHdCZBPEZFjBDVF9BJtBCXGFCEC6BMwBAWIACrBDPCrBFFCAGQGVCFHNCGFDBVDPENFdITAXEOIuBCmBIzBDbCOEoCG1BALCECBEQE4BBnBEIIYCgBBQJsBAiBJHDUBUJuCBIEBEjBKQCAEdIDEmBOUCQBHFWNLF"],["t0D28CmBHsBCaDCDhBTLBEDZPzCASDIFTRtBABSNQBgBKCcDRKCEGC"],["55Di3CIAmBLWRUB1BPhBEfIBEPBHGHDNCDGEEWASIDIUDJIEGQCQD"],["jvE46CkBCMMWC8BLDFVHIBQGCDEAmBMAENEFECCaAyBRWhBQBUKPKVoBMCFECCmBFGESDcHQHUfUPCHHJCDkBPUFECBEqBNMAGFSAINFFLCFGFFXGNFCDBBhBEQHBJaMMAGBBHKBBHpBH3CEBCGGtBCHCBIJCfRjBBrBJzEHRODOrCEjBEXQDKoDKuCBoBCzCQ5CD_BCZKFCGE-COFACCcCLC9CFLCUIhBAPECKeKLIGEoCUsCMOAGDEL"],["11E08CWEEHWKqBAqCXKFzEhBPNbDJVFFhBDLCPHlBFjBYzBKVCEGGCBCaOCKQEJEAEoBYPGTSgEIuCL"],["l2D2-CHAFIQCIH"],["njD-gCJCQE"],["xiDmmCBAEKGCAH"],["1iDqmCJNBAEKBCLNJBIONLDCUSCIDNGEGMMH"],["_jDomCDACESG"],["hkD2qCDACEIA"],["_4Dm7CLCCGICKF"],["15Dm9CPBOGEB"],["56Dq8CbBREgCIGBDB"],["3wD42CDFHE"],["jxDw2CJGGA"],["z9Cu1CPEDGEEMBIH"],["liD-rCDBCCOC"],["3iDo1CFCAEMB"],["7_CovCZIIEUH"],["_wCmuCQBFDLADC"],["ruC6zCFAIGKA"],["p1CqrCDCIKGAID"],["93CmuCPCRKeDIF"],["hxC2sCVIBEaAGB"],["70C-2CLCOCEA"],["pjDo3CEDHBTACFfIQE"],["xhDk3CEBDBfDKG"],["7nD8yCGBDBFE"],["_iDi2CHEeMAEMCEDXP"],["ngDu2CLCBIaA"],["pxCstCIFLCBG"],["zsD03COACDJAVE"],["1oDoyCUDDBRAEEDCLBBGLIaFEB"],["nsD20CLECGDEKIMDAL"],["5pDgyCRGBKIAIFGH"],["5_Dg_CKBXFbBKGbAJCIEXCQEyBEGAEH"],["x-D4_CNAaGcA"],["_hE4_CMAaFPDjBAJKWCEA"],["3gE2hDJAOEEB"],["j_DkhDbCBEyBAID"],["lwD0_CPAPKYEKDDD"],["j4Ds-CdFFEaIQD"],["j3Dk9CVEOC"],["puEmhDdARIcGeJ"],["r3E2-CDCMG"],["9tE-_CzBCmBEQB"],["jiE69CfESKQAKBGH"],["plCugCFFRBCFIAAFlBpBBPYUCFICSAZPMCJHcCCFEGDPGGcMCHGCOCOFCFXNMADDKBDDLFqBKDJRHCDLDIAHHIFOOSELNAJCBGEGIGHPhBVBAUPLFCMWFMHELRBAEGPFRTTBFECCQGMMQIVADFFBVCMEAIjBJ_BIXFLCDMoBWfCMIBDIBMUQDDEEGHAAGIGIBFIUgBKEDEKGAGOOaIODCG"],["lkCg-BJDBE"],["zjCm-BEDLBAE"],["pmCy6BFBCMCB"],["n9Dg2CHDHCAKKAGD"],["_8Do2CFBDEEE"],["r9Dk4CLCDEQB"],["r3D-2CEBDFJAEEDEFHDCEI"],["t-D42CDACEFCMB"],["p_D41CREMGGBGD"],["1iEw1CTGSAGD"],["7mEo0CBDHGAIGB"],["jnE4zCMAFF"],["nsCimCHAEEGB"],["ltC-nCEFNG"],["t2C6pCHDCIEA"],["4burCIBDBCDJG"],["6a2rCFBDE"],["vwCurCBBLEDEIA"],["29EurBFEEC"],["ifoxCJAACOA"],["ulBo3CHAEEIB"],["mGssCDBBCAECACACB"],["kKmvCLCKC"],["yKyvCFCUC"],["0PsyCBCECKA"],["wPyyCBAEGGAAF"],["2Y43CODLAHG"],["qdw4CXJTBNG"],["ga03CPAKGGB"],["ggB-4CWDVDLE"],["wdm4CCDPFNEaI"],["gem4CFAHGGCGBGB"],["qRq1CKABBfHBEEC"],["mQ60CFBGIGC"],["8Vg3CUDEDFBAFRAPHLCGECIOCDE"],["iYy3CODXHHFdAMGMCCEOGEICA"],["2T21CMGEGOBAFTJlCHOIUCMGGKDCCGSKGDLHGJ"],["gTm2CIFHHbCFCIEKACEIAAE"],["iOixCTAKG"],["sGsrCADDABK"],["-OiyCHAGCEA"],["5iD--CLDNCcKGB"],["x5C2gDhBCUCWB"],["h4B0mDrCKXKmBE8BHGD"],["pXqmDPAVGAEMA"],["_V6jDRFXATGGEoBEWACD"],["3XuhDFAFQOCCL"],["nXi_CDBPSCKMB"],["vWo-CEHQBEDxBBJCCK"],["tWihDHAACKGIACBDD"],["tlBuoDmFL3HFBD0CE2DBsCEaJuDHIDDB7BJjIFLDEDKAkCEsDBWDMHgBCQKmCCIDDNRJ1BPFDEBKEuCQyBOSACFkCD2BQqCAoCDoBJjCNzBDIFJD5CHgBDVH9BD3BEbJBFGDcACBDNKAGFbFNHrBHIDfdADOAWI2BHIDFBbGVDKFuBJiBCGDBJJFrCGrBHdEJDcFGFKFYCqBHDDSJEJAHFDJBbGtBLXEWFcEIJJFIAKEIKQASPKBCHPDXCADjBDfGIKJCCFPDGDFFwCHFNFBjBAfHjBGjBOVFfKcNxBJvBIcHnBDIDuCKOEkBA0CTATJBAJlCQLILOvCNKBgCKGLVHEBWCyCTGFQAVJADEFEIWCEZGLjBDBQJPZAXILQLG1BOvBEBBCByBBGFBFlBJjCCQDBHnBJiDAEBDBlBJDBKBOI8BGsCH2BAEBDBdFADfBEFVAEDDBjBHEDRDFFfHtDPXANDTCEFPB1BQGHFBIHlBNPJBFVTLDJHVHZIILdLAEFCDHLADCJBDFNBJEIGAGUMhBEQFPNNEMFAFtCFWHBBXJPCRAABGHMCSPTFDFfEWHSCBHEHHDBDJBDFCDLHRALGUJJHpBBgBFFPGFCFTFMABDNhBNJhBEcHENHDZEMHJBHCCCNABEKKPJfICGQEIIZHZGDIMQFDhBL1BBAESGZABIREFIJEEEHIWIJATDBGEEdIAKUOXJpBiBDEEGDE0BIJACErBHFESOQAAEGCOAOJDKPCRSKPTFCGDBZVHIAMFSLImBOUEXDZJHAHGRABGGKLC4CiBpCbVBBKKKOIaCzBEHGEK0BOsCHVGKEBAfBXE3BLGMSO-BFQMACRFVBvBEOMSEoBFSCOIRBGQgBAJEVBMSSGFGIEtCAdKnBEVMQE2BB0BLgBBXICKTGeAPE_BEDEIGsBKhCDBCOGHABILGDGGCLBUPNHHBEDBDdDZEJEBGOQSKdFBEOCLEcEGGAGLGJBNCBEOECGFELBNGGIEAPQnBAWCCEBGSE7CgBMGJIrDSzCIVFREpBFVEVDVCBBQFHB5BGvBM4BK9BEJEIGjBHVKWGgCAQGSCmCDBEIEBCTGjBHjBEdFvBKSGtBBjBGZKIEDCKGgBEqDKECFCaEmDEWMUWYE_BDpBENEIIkDYgBCaFHIKE-BBOKDOeGuBAsDVpDa8FOkBHCDCPUIEIFCEI0CP2BAhBIVMBCmBAwBBkFXICDKEGMEDEvBMyEBWC_FENEOEeBgDKkCFmBK4CNIGfIqBG8FE"],["l0G6mCMBHB"],["nnClvCIHBDJABGLAfJXRFAIDDBEFdGDJDGHAPDbRZAEHNAHFQHJBLJABMHGAyBGCBHDJAEDFFDGLCJDBHNKXBBBILADDAXSTBEDRJMDCDLDZGHHEDJDKDbDEJHJGDHFeECDXHSBJHEAqBFBGKEmBCdFBDQDDJiBRGDCJSJBHHCHDQFUAABHFLBCFaCOPnBPQBOGIDCDDBjBDLDmBDYCCLDDVAAFODQCAHGFQCCDFJRENDrBGIDGJWBMFDFHDRCLFgBBfHUBWEEBLHxBCQNTFNITCCFBBbDWBIBDBpBFoBBCBDB3DV1DNjBL_BDpEGtCBDBGFkBPUF0DHBDXJzBJnHSnBDmFXDHLDhDB7CQvBQEFSJRABBGFOFgCNePOACIOC-EFGJTJtBDtCA6BFoCCcLYRuBCkBD-CKSHUDuBASHoDLgEFIBPB1CCjBD4BBCBvCDMBCBDFIDgBBuFG3CNiBRcAADPJGBuCB0EmBUC0BKmEI8CEoBDsBCIHPHBDMBuBC4BIkDqBgDM-BFyBGYKiFIMG6BE0GGcEGEjBEhHGJEAIDGNC9CFvBGxCOCMcQQIWESM8BMWA8DgB8FYwDCmBIoBBwBERIKIMEeWoBEgBDsBSBE_BBDCOEVECIiBO6BAGELKsBBkCQWUBGNBfIHIQEsBJOKSGLGECoBHYTeAIEEOJKEEkBAkBGKBEDTLAHsECYFaCMGGDGLIBsBS2BK8GUMGgBDaKoCTeByBWNECCQAKHUDwCCYGIBEH4BFOKWEIDFNIJGAiCCMOOKaJCBFDCBcDQEQMIAQFAFOHmCDsEc4BCwBKIEIMDINOEISGOCeBADRHCDgBAeXyBCUFcCsBPBGiBWGUOG4CSWK4BGiBIwBGCCFGKGgBDCBLFQHcCGLMIAMWKTCJGgBEeJWABQHCBGEG-BSmCGiCDqBPaDIFHDhBCOHDDXJOBYIkBCsBJUJyBE4CJoBG6FPwBGEDBHQPRLEHDBEJdDADMHDHNBVClBPcFqBCKDBJNNfNXXVlBPHCBeDaIAOSKuBGqBUcKGSMOoBQCMUKaEYFsBCKKIEKA6BScQCKUI2DU0BEIGoBOwBB8COkCA-CMyCHeIcF-BGYDWGSDGDUA-BMSKCGyBE0FXaHOAKDqBFuBQAIMI4CMYFaPmBHOHPLxBFDFGDqDQwCD8BIGB5BLKB-CKcKmCKiBDMCMKSCgBFIJcLkBBgBCUYiBKyBBgCGeHEHEAmBOwBLgBEkBHoBAyCLaCeHqBEEBCFSEIBCDZZCBIBmBKiBCiBNCFDFMD2BDkDEEBENGBKEoBBWDYEEQECgCboBHWASDSEqCLOJCHSFQHOVgBHEEJOBGIESCcLaBQG-DLYPwCRGIGCQRFDTAFFDLMCBHlCGOFqBHLLTFZGxBDbIQJiBHbFtBBKFdFHUNABFKPHDYThCANGJHVHBNFDbCfF0BDCFWJNLMDCHFDEHLHaDUNAHGDMBADOBEBBDRFaDeKEAGJWFiBBEDDDVAPG5BBvCLnBOFAAFSNdCNBNFGJZFODTDCBUBGBABnCLHBAB0CBFFOFXBSDALJF-BLgCREDlDHGDkCBmCI-CRIHMBUEUDNHXASD2DDiBHsJVYFAhH_hOAAiHgCA0CBSDmFB6DFuBF2FBkILnBMmBADC1KS4BElBGcGDC5BI5CB1BOjGWHEwBDyBCoEPwDCcDSF2BEkBFuDBwCIQEZE6CGiDWjCUeKlBI1CIUGyKKECtBGBElBERGQIsCEFEMCCCDCxDOpBIBG9CC_BMNEKE8BGQG1DCpBKHGKMCOICiBFmBG4BBkBDSFmCBwCN-BOXEDCCIyBJYEWHOBSCHIMCRGMEDIpBKVCxBBpBG2BKgDLSAlBMEEME0BCuBMwBC8BJNIeEeK0CEmBBQMkBG-BFmCE6CFwDI6GBqCE2BK-DDYYsBHABHDBDQDVHHNgDIECHIECDKGCSAkBFCHBFJFjBLEB0CAqDFkCKoCA4BBaJ8CEIEHCjCMSIDGtBARUpBEDECGQCkCFoCG9BKhDCRUKEeBEDJDEBoFAoCLuBEoBD4BGuCFSCIGBEUGSBIIOAYDNLGFoBCYFoBGgBLwDNkBEGEDOCCiBFJMAEGCmBFWHGHuCCEDPJEBmCI0BBqBKyEMiCMOKSUDITOBUHObcBOJIWEgBBQKBEPIKEEMKINKKMIGPCRBCSSGGLMCEDAYIEWACIBEGGSCDEeCFEAEIBCEBCaEJGAEMKcDBIWECIKDYGWMKK2BKaK6BMMA"],["y_Gy4CHGCE0BSAV"],["wWmqCWCCBHBDHzBRfAYBEDJBEJBLFDELFJCHVhBFDtBCCDHANHGLHFxBACOTWOBFIIACGTMNWDABKFABKJGAKHADaCEIBVGHIBOBFFDCHJLNBLGEFNDEBDBtBXbFRADGFDHCEGXGRIDIEIUFKGJBHGCISKxBPEQIGMBSGRCMKEGOGCJGKMEhBFJLdPCSUAPEFKUKPFFEDQoCEKHAGWEJEEGFJNBNGHFrBBLGAIOCPIAIUAWDeC7BEFECEIAIGOEIBUCECVBIIwBBGCFCWE1BBIKYGWAUJRMEGQCLGKEWABDCBWGMHeCDEEEYGFEKEJCLFGBDDjBJFAFIFAAEmBYmBOGCDAJBIKaIGDSEGGTFJEBCYWOCJGiBEQElBBBIGIQGOALESI0BElBCUMaHAEECRECGRDBAAGOGSALEcIMNBEGEFCBG2BGpBEkBKMMQCAIGEYFJIQCIIUCBPMQOGCNJJQIKBHICIWAEEIAUFFIRImBAQEKBEHMDBEEGoBSFGQGYFICMBVNHLCDOGCEqBWGCEDHHEABJQEMMKALEEEKEWBKBAFTFOBBPQUKEkBHMCIDBBeFAFbF5BCgBFEJQBGGIFKEiBDSEAGoBJDDbCDAMFYBADSEDLHDMEKG2CDsCTcNQBcJKABECAYLWFIRIBFNrBV5BJ9DObILBDCCCzBILGEEpBCYFBDQHOAAFSDLDeDYLEHHJHDQPCHEBDBAFIDYBUHIHsBHUGEGDIdEXQBGKCEGKCiBLmCLMGQCZWAKkBOgBGcQqBDQFDFMCKFAKQQBMFGTGSeBKhBQcDqBCgBDgBVADtBDZNaHOLYDuBIKSBGoBECCHECCQB-BS0BKMDDDIAMGNE6BQcAbDGBHHIHbHyBCODCGUIaEsBDoBOEBgBGMJJFAFaDGEAKYCSKDGHBTUeKiDFiBFeHBD0CPeNYHGCOIMQXARMDKPEVEFFDIGKMEDEGWFERBBEIGHCKI2BQOMSaOMMCBDEAqCAwBHJbJLRJeLEHATJHGRAhBmBPCBRLAJDHRFdXTBIJhBHLEMGPBPGjBBIHgBHyCFKEEI4BSKQcOAMNOIOUE2BGgBVDZYJuBCzBGBKEIOCNahCOXAXFfAHEEINMCEKQUQdYTKWQ2BMEEBMJKWAKHAFGFTNAFKFBDFDCDQDwBDaAcHcAECXCLIbCpBKPOgBGcHaCCCJGTBBEqBKkBA2BLEFgBJ6BAGBJHbHBJEHHHCHQUKCGBCLNPQDBISCKIXWQSAGNGVEVMxBKHIIKNGDGAEIEAE4FGkCIGDxBNADkBJdKAEuBGSINEZOVCQGUDOAfKZCQGSDIAWKCCTCCEaAmDS8EMvBACIGBGC-CCUBRHiBEEADDiBGGBuBKsBHLJEAMGAInBOwCCeDECdCGGHEEIgCU4BKkCHOFpCL6BAGDuBCUDfPJCAD0BAUK0DBiBFGBFDaAIJFDSECAFEKAMNMALNFGlBGULMCUFFFbL5DbCBDDbDjBNlBDVJTBTNVFWCgBMyBA4DWECFCnBBBCIGQCgBBEEQALDGDeFaCGEDEIBOJJHODBLLHGHOARGOKAIOEPGWE0BE8DDUDTBBDCD0BJwCBgBBIAHEYBSKLKEIuBEqBJABaEEBBDKBUIcBWFBDiBFTHQBKFhBFkBDEFAFDBNAvBMuBZICAGEBKFXDMBYTgBHICKHWGUOBEKMQMUNWFoBBiBIWAoBHiBJDESEPCOIWCQHgBCLIAINCiBKnBBBISG8BERKGCyBH6BAuDJAD5BCZFMDgDGdNDAKITEDHEDbABHIBiBEwBWuBBsBFSFCDlBDDDsBHWACBVHiBGaDULNAeFoEK-BByBDaFWLEHJREBqBHGTMHHJLDKASOBMCIYIqBEeCWF8CDiBKIAMFGNoBFMLmBCSIAEPSRCOIAKyCFeFGG2BDsBCoBJuCJuBPA9EVJlBHdEhBQVBcBGFFBnBGJDxBFuBEOEMHHDyBGCAALKFODIGKHBFIBCDCHLDIAEFCGEHSFCDFDMJBFLFDFnCMCINABFIDRB3CbbDHARLLCCFTFADnCXJTNEPQNGrBBjBFnBVBABGIUxBPBFDDPIRFCEPCPJDTLHADfVHNEHODADKKYFBFPLBDCRSDERLHHAHIQKPAFDCFRFPXELMRTJREPBbNHPIZREhBNLGADGDDHAJPX1BhBJSFsBJOV-CGiBMaiBYGGHMCCYAIIaAkBUaasCoBMMkBOeEFGSMHEIKIYQGYDAEIAnBKpBFNZADKDFFDAFGRBhCjBXDKQXDGIBGOOCKdHNKtBHXCNDPHBJXJNLdLZVFLgBDIDAFRBJCRDLENADDRFTEHFdAJIkBCKCDENARKhBBGCnBIXDGFPCBHIAHDJAJGdFlBILJHBTKjCAxBFVJRNfNNTRD1BdlBfhDvBAHYFmBADfSAEKFECCUELHUFXPcCYOAFLLICIICWYDUCQHGJOHaLCDHHNEQJALDDOJFLPLRfCZCBFHCLHVEDLVdTNTPNJTZdjBZZZLFNTNLtBXhBJRIPAAQNHDAGIHBZXRAGFDFTFTTBDCLBRNDhBXVFPHANFDAFQDWPqBhCAnBGAADNdbDDDCFNEBCNBBBCHLEEFHHFEEINLFCHHBIJGKCBCGCHADOMQDEKIHMBWLABCOKMBCFGGJKCEJQEELEJFBELGPLBGLEIGTCGEIMUGPEKUBKVIFFDIHEAEJFRCBDdHTJNLLBBFTDBGYIBEGITABGKEAIMESWDILGAEDDXCZZrBTHNHHbFJIJDJRELOHgBBGDGNDBBLOHSAGIQKBEUGkBPMAEEMFMAHNCDFDHEHAjBNJCEHHBBJJDBIFBDDIDhBbLRCDGAkBTKXOZANUHCJOHEHADFANGPARKRFaCEHiBTKPTDPJHHNCJFMCGFYGSLQFXNQGCFBNHEJDKHFAEDFHENNDBGBAHLHBEDJLAHLLHRHBDKDDDCMRRLLCIFKCBPCHPCEHLBDJJDCDBFVCDFFBGBCFPPHADJBEHDHCBHHDCBFDDJHCPHHCFFLENHHGDHLAEFDDNEEEPOAMDBFHILAPPFBGFLFCHFJICHDBNENLXBRLFGBHHHCDGABHIFFHPABECCLSCKKOJAHICFRDAGNCFKDAAJHCBFRBPHBJHDRCCJHHBJTNPnBMRYVAJFC8B5BICelBU9BBVGNCNDGFDEJDACRBCALFDBJjBRDHdLJKBJHGFDGAAFLAOHHJROQVFDVSMPAHZLPRNBGGDCCgBCIIEBGJGFBPQPEHFBCBEGKFKHJHAAWVeBDLMABVOfBCgBNEXHELFNCVNbFVNXEpBYCGbGFACGJKnBDCBKDABIDAAFKPIAQNUAMPWLILaXKXDjBEJAVONGNOdDFHKAFLAHDFIXM5BqBAOXcECHOJiCJSPSAIFECGJADKFEBIJGDIDEHFDCBUS6BFFBCBYKMCYGEJCCUDAEEDgBNYBKDLASHUEAHIDqBDECSEENBHYNMCNFNLHJKELVLNRDCCOFJJBBQDJFBCYBFHJJDCUOqBFaLWEAHGAQDPJGHMECIFIIPOEERGDACFBBFIEGDACIHHCGFIBJPUJOHwBBBLYLJJBLSBWBHLCOHADFDEFDFGPNTHCGKJFBEEODBDPJJBWAPFHJGBKAFDAELFABEDFAQDEBRFBFGBFFCBCGSJIADIFHJJHXFJJGVJPNLFCCBDDXHDACCBGJFBFGEEBbTZhBRJRRhBTDVTHRALXNGNHJZGVDLIbFIDDMJDZPbBVDFECCFAjBVBNbCHQFPCXFHHFTVLRITYJWBUEDCLCADOFITyBTcJUVuCRWFOGAHGEEFCNeHuBJqBEOBGDFBEAIIAHCFUKgBDSDEDGGEFAUMVBGKHCCGKEXAEBBDHLGBCHJPnBPTEROrBsBEGKFkBKMSAEFFJARHhBMPUQMVJDKBDJGHDAEDAJKFYREAQJOJABDMBhCFFDXITBBFhBCNDDCLBNCFDdIFGDFlBIPDJGnBERGLoBLOPCJBRFJJdJPIVCJIdOHMRIRCLMJYHECIHEBKTUDMTFTMICBCHCFRPDRCGRHCJHOBe5BAHSHBBIJeVFCIPBHDAcxBCBCEDUKYKGMJBPERFPHBGBDHMAGDEJKBWIuBDOEKGOUwBoBIQKGDbCZMVWVsBLMCGFchBOFAHRfRPRbJACIDALNFVEblBJHFDRFFjBFJJCLJJLDbCRJnBLNLBTjBPtCXbXZAXPXHtBDXVRAJFPBLGFBJWCSHMFmBDIHEGEDMGQBQDMLODOZWPcTqBZUNGRWHOCIFQCcXsBVUNENUCGDOtCuDTEBDM8BHLNxBHJRMTUDSRUFSDADLKNCNkBpBALMPEVyB1CYVJBBDIhBIHODYZEPMTABDCADERBRKzBSJMLECKJOXQ9BINMRCOIDGNoBPSXYPGPEAMNGBCEEDKRCFBFVLFHFACBYCMHQVSNaAiBQeDiBQMBiBIUBqBMcSSFFTCbDHGEIFHCJDDjBdxBJJHTPZHZpBhCtCvCtBbvBlBjCnCXjBPDBDBCAHDHFFNDHXJNNjBJFR3BCLcZJTALGAAHFRGTIJGbBDaNILDDEDHTGZBTEFFNEACrBEDBNEGCBCNJLBNVfHBCFdTlBLZLVRVdFCAFPFjBfLEEDBZMNKhBCdEBCOEHBNELJhBIADNRThCXVPHNKJEGBdN1BFLpBjBjBzBTXzClCxBZfBJLVEFHJAjBGRDbELBRLfARDVNbICEJGJADKJABJDGAKECAIXiBEGIBIKFehB0BX6BJOfcNWHYAMHIDWAcNiBDyBEGBOnB-BLcbyBPUJSDWEmBBaKOWyCOQEKQMMQGqBFQNaNmBOOCOVsBBMTiBeKXFHIDGCOPe5B-BXUMBRILSIBACJCHWKNIEHCCIFDFENcEDGAOOCcEHODIGREJKIEEBASHEQgBGuBLSECDADIICDECEHABFRIDSJECDFAAIDAHGCNZADEDDFAHGCHJDFMENHABGBFLBAGBFDATODIFUIEFBHGKCDEJBJQPMnBEKGJBDFpBBnBHHDFJbB5CnBxBOKCFCBGFHdGTBWAhBDPCBBMAhBFhCZbKjBStBqBTIBGRKRQdMAOHBFEDOHCDKGBIKLBAKGCHEAGHKJGAQDBJKPEFMAIDBDKDADFBOFDAEHCCIFACEQEHEFDDIQGhBFCGJBHGEIHBNKOGFEFBBcCEECEHGBICCEcCnBDLWGGHBNaHEDDDEQGYiBEiBOmBAmBDULOIGFBGOESJQDCADBCLSDBBJBCGqBYcGUQcHFEIoBiBEcOeiBYQkBKK4BQqBeMOWcAOJKEcScESecgCcWiBSoBYEBFEFYPMBaGMDSIEJmBBoBWSIQAOMmBO2BEOIWAMEmBAWJeISKSHMCBGKBSHkBGOIWGGBAFCEMBEPEBWMEAEHZXENQJEPPVZTAFKLQBAHKGMNBBYFUJSBWEiBHOHcDGJGTIHQHcBqBJsBZOAMEQQGQHYGQUQSIOAKGWBkBLAJIFUBOFeAORaCiBFwBNWBWHQEUMKAIIUENFSCEGQFQEKHJGFHKDEDIEBEOJ0BGYQuBqDOMDiBFGISFMQOAGFEZLbInBXjBFPGPOdKXCHXHCVFTGJQFATEHFDAEEVBDCWEKInBBCGKABELGFKGECKlBMECAKCCGDCHECQCJCFIKIHCCGFIIKfDEWWQWCIFKCECDEEAGABFqBCHGGEkBETCJGBCEI0CDIIiBSsBK2BBKEGABFIFKDUCGJIHQEKF2BLqBIgBFuBSMMCKNgB9BctBiBTENMNALKVIMGJCGEOHSGBGOSCCEDEGMAPMHAFKeABGgBKBIVDDAIEFAPFZBdNJCbFfTKIBGPJAHGLSPcGSBHNVBPENLZDFFPFRGGOBIZKLADCuBWBGFBJGbDZIBAIGREgBDKGJBLELWGJBLLAAGFFXDFLRPVFENHTTDCKFBFPEAJJDfDDLAHHBRPLUPAHILiBLDJfEZFJJTHVPCIWObBJKdGLFLEPJNCENOBGHRIFAIJAFLKHCAFIFJCDIPIAIJDBRejBHBAGJCBBCDCDEATHcHSLKDCDARTORFGLIAEFNDFGJCQrBRODADNBCBILOFBBJLOEMXUMMKAGGsBPAEIACGdKDDNCTDDIBFDARUOCAGLBTORcRKDEGADKEMASGQPGVU_BWaFfWTGPBBGdUDEOAROFULIJCNTDAHKFQMGFEHBJCFDfHAHKLDFDCBFGTuBZShBWRYLoBBAFJFADyChBURDPJGJORCHGJBLLFPYNCPVHBPJFJLNABEAGKMAEMGAITqBdKAIHIPBEGPCLSZARInBiBNEFAAGRQHAAKLejBOVEHBVRdHbTRFbININDZKfPHNCJILFBADEHtBZpBJNJIDLDlBrBGRQLbRLVEDZDLFRXNCNF9BALHTDHJLDPGHQFCAEIGHBTOCEDDVBNFdEPBIQDUEKDKKBFEPBBIKECKGEFDHJHBFEGWIIMWAGGUCOFSCGFCEIDAAGIGDCCEBKJBEILICGOIUCECAGWGaHwBE2BJkBEWFGEkBDUIKoBGGBCDDGkBKFGLGDJSPKGCDWZILOEIHECCQAJETACGLCBGrBIPBFGJEOEJGOARCAI6BMKBMJKESBEEUBFGBQJUYAELoBDWGJCCIwBQIGAUGIkCSgBAfGMCUFJGIAJIEGSOKaMAUMUGeCQFFEGKSCOAIJGGGDADCQCEYBYLTMLEDMJCAEMCAEJKFOEABKRIAoBUDKKGCGDCMFCDBJJLDHEOOiBCUSaGFHEDBHHJAPaFHHRBDNLAEDPJCJHHKBCHKFCBHFMCYHKECDJHCDWBQIMAUMSBQJKAKNaFBGXEDKWJoCQOKcIiBEaFLCILIDWCSKEKSCMGMMEIBJRNYBCUHOAiBAGMIEMMKgBGYPGHOFMCSKDWKWHCJFNEJMIGHABECEAIYEBCOEqBCCGgDJGGAKMDGGSAIGmBFCERKZAPIFGEBCEFEpBJJEZFAIFHRCEDLDDEvBNnBARHIILIFFLAAEGEDCEEdEBEHBFCDOIWBCECNQEMHEBIOSIADGeEBGMIqBQmBeeCBEECDGEObGBECEJBbCXDNEHBFCFJFACBJAAFNACFHCGFPNONTJJNhBJHFNCLJRBLHIABDLDJCCFBBGBPFJACDIDFDFLEFJABDEjBOBCDMCYNADKBIJ","s_B26BfNVDADFACDVHCHJCNHRBBDHEEFHNJPDEJJBHMDMJGVIOHhBKJCDadQLahBOHQDGHRANDJXCJHLFEBBDLAPKdKFgBDIJYNgBHwCOGAHDKBCGHoBCoBFKNGHDBIGGOBFECKTECJJMBOIaIJSAKFWCDGQAAIXSJYDCXBHDFLEBBRPcIaBIbELMLAAORcXICIEAuBBJCLMQSqBCeBRIQaDMEGJMPCNFlBK"]]};var tB=Math.PI/180;var B0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",A0=Object.fromEntries([...B0].map((i,t)=>[i,t]));function Iu(i,t){let e=[],n=0,s=0,r=0,a=()=>{let o=0,l=1,c;do c=A0[i[n++]],o+=(c&31)*l,l*=32;while(c&32);return o%2?-(o+1)/2:o/2};for(;n<i.length;)s+=a(),r+=a(),e.push([s*t,r*t]);return e}var yo=null;function Tu(){return yo||(yo=Mo.polys.map(i=>{let t=i.map(a=>Iu(a,Mo.q)),e=180,n=90,s=-180,r=-90;for(let[a,o]of t[0])a<e&&(e=a),a>s&&(s=a),o<n&&(n=o),o>r&&(r=o);return{rings:t,box:[e,n,s,r]}}),yo)}var oB=Mo.source;function Fu(i,t,e={}){let{south:n=-58,north:s=74,west:r=-180,east:a=180}=e;return{w:i,h:t,south:n,north:s,west:r,east:a,x:c=>(c-r)/(a-r)*i,y:c=>(s-c)/(s-n)*t,lonLat:(c,u)=>[r+c/i*(a-r),s-u/t*(s-n)],k:i/(a-r)}}var wu=(i={})=>{let{south:t=-58,north:e=74,west:n=-180,east:s=180}=i;return(s-n)/(e-t)};function Ru(i,t,e,{sea:n="#dbe9f4",fill:s="#c9d8b6",stroke:r="#9db386"}={}){i.fillStyle=n,i.fillRect(0,0,t.w,t.h),i.beginPath();for(let{rings:a,box:o}of e)if(!(o[3]<t.south||o[1]>t.north))for(let l of a){i.moveTo(t.x(l[0][0]),t.y(l[0][1]));for(let c=1;c<l.length;c++)i.lineTo(t.x(l[c][0]),t.y(l[c][1]));i.closePath()}i.fillStyle=s,i.fill("evenodd"),r&&(i.strokeStyle=r,i.lineWidth=.6,i.lineJoin="round",i.stroke())}function Gu(i,t,e,n,s,r=1){let a=t.x(e[0]),o=t.y(e[1]),l=n*t.k,c=i.createRadialGradient(a,o,0,a,o,l);c.addColorStop(0,s),c.addColorStop(.45,s),c.addColorStop(1,"rgba(255,255,255,0)"),i.save(),i.globalAlpha=r,i.fillStyle=c,i.beginPath(),i.arc(a,o,l,0,Math.PI*2),i.fill(),i.restore()}function vo(i,t){return t>i.older?"not":t>i.nearer?"maybe":"yes"}function Lu(i,t){let e={i:0,first:0,tried:[],done:!1};return{state:e,items:i,buckets:t,current:()=>e.done?null:i[e.i],pick(n){if(e.done)return null;if(!t.includes(n))throw new Error(`Unknown bucket: ${n}`);let s=i[e.i];if(e.tried.includes(n))return{right:!1,repeat:!0};let r=s.answer===n;return r&&e.tried.length===0&&(e.first+=1),e.tried.push(n),{right:r,firstTry:r&&e.tried.length===1}},next(){if(e.done)return!1;let n=i[e.i];return e.tried.includes(n.answer)?(e.tried=[],e.i+1>=i.length?(e.done=!0,!0):(e.i+=1,!0)):!1},reset(){e.i=0,e.first=0,e.tried=[],e.done=!1}}}function M0(i){let t=ii(i),e=t.centers,n=i.querySelector("canvas"),s=n.getContext("2d"),r=i.querySelector(".wh-ce-slider"),a=i.querySelector(".wh-ce-when"),o=i.querySelector(".wh-ce-count"),l=i.querySelector(".wh-ce-list"),c=i.querySelector(".wh-ce-card"),u={ago:t.from,sel:null},f={what_en:"First farmed here",what_zh:"\u9019\u88E1\u6700\u65E9\u683D\u57F9\u3001\u755C\u990A\u7684",when_en:"Roughly when",when_zh:"\u5927\u7D04\u4EC0\u9EBC\u6642\u5019",...t.labels||{}},h=t.box||{south:-58,north:72},p=null;l.innerHTML=e.map((d,C)=>`<button type="button" data-center="${d.key}" aria-pressed="false"><b>${C+1}</b><span>${ce(d.en,d.zh)}</span></button>`).join("");function _(){let d=n.clientWidth,C=Math.round(d/wu(h)),S=Math.min(2,window.devicePixelRatio||1);if(!d)return;n.width!==Math.round(d*S)&&(n.width=Math.round(d*S),n.height=Math.round(C*S),n.style.height=`${C}px`),s.setTransform(S,0,0,S,0,0),p=Fu(d,C,h),Ru(s,p,Tu());let B=0;e.forEach((M,b)=>{let E=vo(M,u.ago);E!=="not"&&(B+=1,Gu(s,p,M.at,M.r||9,E==="yes"?"#e89a1c":"#f1c56b",E==="yes"?.78:.42));let D=p.x(M.at[0]),T=p.y(M.at[1]),F=u.sel===M.key,O=F?12:9.5;s.beginPath(),s.arc(D,T,O,0,Math.PI*2),s.fillStyle=E==="not"?"#ffffff":E==="yes"?"#0e6b5c":"#c4861a",s.fill(),s.lineWidth=F?3:1.5,s.strokeStyle=F?"#1b1405":E==="not"?"#8fa0a8":"#ffffff",s.stroke(),s.fillStyle=E==="not"?"#5b6b73":"#ffffff",s.font=`800 ${F?13:11}px system-ui, sans-serif`,s.textAlign="center",s.textBaseline="middle",s.fillText(String(b+1),D,T+.5)});let y=Bo(u.ago);a.innerHTML=ce(y.en.replace(/^about /,"About "),y.zh),o.textContent=`${B} / ${e.length}`,r.setAttribute("aria-valuetext",`${y.en} \xB7 ${y.zh}`),l.querySelectorAll("[data-center]").forEach(M=>{let b=e.find(E=>E.key===M.dataset.center);M.dataset.state=vo(b,u.ago),M.setAttribute("aria-pressed",u.sel===b.key)})}function A(d){u.sel=u.sel===d?null:d;let C=e.find(S=>S.key===u.sel);if(!C)c.innerHTML=c.dataset.idle;else{let S=xo(C.older,C.nearer);u.ago>C.older&&m(C.older,!0),c.innerHTML=`<h3>${ce(C.en,C.zh)}</h3><dl><div><dt>${ce(f.what_en,f.what_zh)}</dt><dd>${ce(C.crops_en,C.crops_zh)}</dd></div><div><dt>${ce(f.when_en,f.when_zh)}</dt><dd>${ce(C.when_en||S.en,C.when_zh||S.zh)}</dd></div></dl>`+(C.note_en?`<p class="wh-ce-note">${ce(C.note_en,C.note_zh)}</p>`:"")+(C.url?`<a class="wh-ce-src" href="${Ne(C.url)}" target="_blank" rel="noopener">${Ne(C.src)} &#8599;</a>`:C.src?`<p class="wh-ce-src">${Ne(C.src)}</p>`:"")}_()}function m(d,C){u.ago=Math.min(t.from,Math.max(t.to,d)),r.value=Math.round((t.from-u.ago)/(t.from-t.to)*1e3),C||_()}return c.dataset.idle=c.innerHTML,r.addEventListener("input",()=>{u.ago=t.from-r.value/1e3*(t.from-t.to),_()}),l.addEventListener("click",d=>{let C=d.target.closest("[data-center]");C&&A(C.dataset.center)}),n.addEventListener("click",d=>{if(!p)return;let C=n.getBoundingClientRect(),S=d.clientX-C.left,B=d.clientY-C.top,y=null,M=22;for(let b of e){let E=Math.hypot(p.x(b.at[0])-S,p.y(b.at[1])-B);E<M&&(M=E,y=b)}y&&A(y.key)}),i.querySelectorAll("[data-ce-jump]").forEach(d=>d.addEventListener("click",()=>m(Number(d.dataset.ceJump)))),new ResizeObserver(_).observe(n),m(t.start||t.from),i.__centers={state:u,setAgo:m,select:A,info:()=>({ago:u.ago,sel:u.sel,lit:e.filter(d=>vo(d,u.ago)!=="not").map(d=>d.key)})},i.__centers}as("[data-wh-centers]",M0);function y0(i){let t=ii(i),e=Lu(t.items,t.buckets.map(_=>_.key)),n=_=>i.querySelector(_),s=n(".wh-so-k"),r=n(".wh-so-score"),a=n(".wh-so-q"),o=n(".wh-so-msg"),l=n(".wh-so-next"),c=n(".wh-so-steps"),u=[...i.querySelectorAll("[data-pick]")],f=0;function h(){let _=e.state,A=t.items.length;if(c.innerHTML=t.items.map((d,C)=>`<i class="${C<_.i||_.done?"is-done":C===_.i?"is-now":""}"></i>`).join(""),r.textContent=`${_.first} / ${f}`,_.done){s.innerHTML=ce("All done","\u5168\u90E8\u5B8C\u6210"),a.innerHTML=ce(t.end_en,t.end_zh),u.forEach(d=>{d.disabled=!0,d.classList.remove("is-right","is-wrong")}),o.innerHTML=ce(`You sorted ${_.first} of ${A} correctly on the first try.`,`${A} \u984C\u88E1\uFF0C\u4F60\u6709 ${_.first} \u984C\u7B2C\u4E00\u6B21\u5C31\u5206\u5C0D\u3002`),o.className="wh-so-msg is-ok",l.hidden=!1,l.innerHTML="Play again \xB7 \u518D\u73A9\u4E00\u6B21",l.dataset.act="reset";return}s.innerHTML=ce(`Question ${_.i+1} of ${A}`,`\u7B2C ${_.i+1} \u984C\uFF08\u5171 ${A} \u984C\uFF09`);let m=e.current();a.innerHTML=ce(m.en,m.zh),u.forEach(d=>{d.disabled=!1,d.classList.remove("is-right","is-wrong")}),o.innerHTML="",o.className="wh-so-msg",l.hidden=!0,l.dataset.act="next",l.innerHTML="Next \xB7 \u4E0B\u4E00\u984C"}function p(_){let A=e.current();if(!A)return null;let m=e.pick(_);if(!m||m.repeat)return m;let d=u.find(C=>C.dataset.pick===_);return m.right?(f+=1,d.classList.add("is-right"),u.forEach(C=>{C.disabled=!0}),o.className="wh-so-msg is-ok",o.innerHTML=ce(A.why_en,A.why_zh),r.textContent=`${e.state.first} / ${f}`,l.hidden=!1,l.focus()):(d.classList.add("is-wrong"),d.disabled=!0,o.className="wh-so-msg is-bad",o.innerHTML=ce(A.hint_en||"Not that one. Try another.",A.hint_zh||"\u4E0D\u662F\u9019\u4E00\u7A2E\uFF0C\u518D\u8A66\u8A66\u5225\u7684\u3002")),m}return i.addEventListener("click",_=>{let A=_.target.closest("button");A&&(A.dataset.pick?p(A.dataset.pick):A.dataset.act==="next"?(e.next(),h()):A.dataset.act==="reset"&&(e.reset(),f=0,h()))}),h(),i.__sort={game:e,pick:p,next(){e.next(),h()},reset(){e.reset(),f=0,h()}},i.__sort}as("[data-wh-sort]",y0);var Oe=2.2,ri=3;function v0(i){let t=ii(i),e=t.R,n=t.n,s=Eo(n),r=L=>i.querySelector(L),a=r(".al-space-cv"),o=r(".al-space"),l=r(".wh-ar-k"),c=r(".wh-ar-t"),u=r(".al-play"),f=r('[data-act="centering"]'),h={k:n,t:t.t,centering:!0,building:!1,fall:0,fallen:!1},p=0,_=0,A=0,m=!0,d=0,C=null;try{let st=function(){let ct=o.clientWidth,Ct=o.clientHeight;!ct||!Ct||(L.setSize(ct,Ct,!1),at.aspect=ct/Ct,at.fov=ct/Ct<1.1?46:36,at.updateProjectionMatrix())},L=new fo({canvas:a,antialias:!0,alpha:!0});L.setPixelRatio(Math.min(window.devicePixelRatio||1,2));let lt=new vs,at=new Fe(36,1,.3,300),Gt=new _o(at,a);Gt.enablePan=!1,Gt.enableDamping=!0,Gt.minDistance=8,Gt.maxDistance=60,Gt.maxPolarAngle=Math.PI*.49,Gt.target.set(0,4,0),at.position.set(9,7.5,17),lt.add(new Vs(16774884,8022602,1),new Js(16777215,.25));let Ot=new Ks(16777215,1.6);Ot.position.set(-12,20,14),lt.add(Ot);let Jt=new xe(new Wn(120,120),new Fn({color:"#b9b073"}));Jt.rotation.x=-Math.PI/2,lt.add(Jt);let Y=new xe(new Wn(2*e-1.2,120),new Fn({color:"#4b8cc8"}));Y.rotation.x=-Math.PI/2,Y.position.y=.02,lt.add(Y);let Z=new Fn({color:"#d8c7a3"}),ft=new Fn({color:"#e9b85a"}),vt=new Fn({color:"#8a5a2b"}),dt=new xe(new Jn(3,Oe,ri+.6),Z),Dt=dt.clone();lt.add(dt,Dt);let zt=new En;lt.add(zt);let q=new En;lt.add(q);let tt=Cu(r(".al-labels"),a,at),ot={key:tt.add("wh-lab wh-lab-fb","Keystone<i>\u62F1\u5FC3\u77F3</i>"),frame:tt.add("wh-lab","Wooden centering<i>\u6728\u982D\u62F1\u67B6</i>"),abut:tt.add("wh-lab","Abutment<i>\u62F1\u5EA7</i>"),status:tt.add("wh-lab wh-lab-fa","")};new ResizeObserver(()=>{st(),F()}).observe(o),Gt.addEventListener("change",()=>V()),C={renderer:L,scene:lt,camera:at,controls:Gt,blocks:zt,frame:q,abutL:dt,abutR:Dt,stoneMat:Z,keyMat:ft,woodMat:vt,labs:tt,L:ot},st(),Gt.update()}catch(L){C=null,window.console&&console.warn("World History arch model: 3D is off",L)}C||i.classList.add("al-nogl","wh-nogl");function S(L,lt,at,Gt,Ot){let Jt=Math.min(at,Gt),Y=Math.max(at,Gt),Z=new Xi;Z.absarc(0,0,lt,Jt,Y,!1),Z.absarc(0,0,L,Y,Jt,!0);let ft=new Us(Z,{depth:Ot,bevelEnabled:!1,curveSegments:6});return ft.translate(0,0,-Ot/2),ft}let B=[];function y(){if(!C)return;let{blocks:L,frame:lt,abutL:at,abutR:Gt,stoneMat:Ot,keyMat:Jt,woodMat:Y}=C;for(;L.children.length;)L.children.pop().geometry.dispose();for(;lt.children.length;)lt.children.pop().geometry.dispose();let Z=h.t,ft=.012;B=Bu(e,Z,n).map(vt=>{let dt=S(e,e+Z,vt.a1+ft,vt.a0-ft,ri);dt.translate(-vt.cx,-vt.cy,0);let Dt=new xe(dt,vt.key?Jt:Ot);return Dt.userData={home:new R(vt.cx,Oe+vt.cy,0),b:vt,v:new R,w:0},Dt.position.copy(Dt.userData.home),L.add(Dt),Dt}),at.position.set(-(e+Z/2),Oe/2,0),Gt.position.set(e+Z/2,Oe/2,0),at.scale.x=Gt.scale.x=Math.max(1,(Z+1.6)/3),lt.add(new xe(S(e-.32,e-.02,.02,Math.PI-.02,ri-.4),Y));for(let vt of[.35,.9,Math.PI/2,Math.PI-.9,Math.PI-.35]){let dt=Math.cos(vt)*(e-.3),Dt=Oe+Math.sin(vt)*(e-.3);for(let zt of[-(ri-.8)/2,(ri-.8)/2]){let q=new xe(new Fs(.09,.09,Dt,6),Y);q.position.set(dt,Dt/2,zt),lt.add(q)}}}let M=L=>L<0?0:L>1?1:L*L*(3-2*L);function b(L=1){if(!C)return;let lt=oc(n,h.k);B.forEach((at,Gt)=>{var Y;let Ot=at.userData;if(!lt.has(Gt)){at.visible=!1;return}if(at.visible=!0,h.fallen)return;let Jt=Ot.age=Math.min(1,((Y=Ot.age)!=null?Y:0)+L/.5);at.position.copy(Ot.home),at.position.y+=(1-M(Jt))*3,at.rotation.set(0,0,0)}),C.frame.visible=h.frameY>-Oe-e,C.frame.position.y=h.frameY}function E(L){if(!C)return!1;let lt=h.t,at=e+lt/2,Gt=Math.max(1,Math.round(n/6)),Ot=Math.PI-Gt/n*Math.PI,Jt=Math.max(.3,lt*.5),Y=h.fold;h.foldV=(h.foldV||0)+L*6,h.fold=h.fold+h.foldV*L;let Z=(dt,Dt)=>{var Q,ht;let zt={x:dt*(e+lt/2),y:Oe},q={x:dt*-Math.cos(Ot)*at*-1,y:Oe+Math.sin(Ot)*at},tt={x:0,y:Oe+at};q.x=dt*Math.abs(Math.cos(Ot))*at;let ot={x:0,y:tt.y-Dt},st=Math.hypot(q.x-zt.x,q.y-zt.y),ct=Math.hypot(tt.x-q.x,tt.y-q.y),Ct=ot.x-zt.x,Tt=ot.y-zt.y,It=Math.hypot(Ct,Tt);if(It>st+ct||It<Math.abs(st-ct))return null;let Ut=(st*st-ct*ct+It*It)/(2*It),I=Math.sqrt(Math.max(0,st*st-Ut*Ut)),jt=zt.x+Ut*Ct/It,Wt=zt.y+Ut*Tt/It,v={x:jt+I*Tt/It,y:Wt-I*Ct/It},g={x:jt-I*Tt/It,y:Wt+I*Ct/It},N=(ht=(Q=h.prevB)==null?void 0:Q[dt])!=null?ht:q,z=Math.hypot(v.x-N.x,v.y-N.y)<Math.hypot(g.x-N.x,g.y-N.y)?v:g;return{A:zt,B0:q,C0:tt,B:z,C:ot,rotL:Math.atan2(z.y-zt.y,z.x-zt.x)-Math.atan2(q.y-zt.y,q.x-zt.x),rotU:Math.atan2(ot.y-z.y,ot.x-z.x)-Math.atan2(tt.y-q.y,tt.x-q.x)}},ft=dt=>{let Dt=Z(-1,dt),zt=Z(1,dt);if(!Dt||!zt||dt>e*.85)return!1;h.prevB={[-1]:Dt.B,1:zt.B};let q=!0;return B.forEach(tt=>{if(!tt.visible)return;let ot=tt.userData,st=ot.b,ct=st.i<s?-1:1,Ct=ct<0?Dt:zt,Tt=ot.home.x,It=ot.home.y;if(st.i===s)tt.position.set(Tt,It-dt,0),tt.rotation.set(0,0,0);else if(ct<0&&st.i<Gt||ct>0&&st.i>n-1-Gt){let Ut=Math.cos(Ct.rotL),I=Math.sin(Ct.rotL),jt=Tt-Ct.A.x,Wt=It-Ct.A.y;tt.position.set(Ct.A.x+jt*Ut-Wt*I,Ct.A.y+jt*I+Wt*Ut,0),tt.rotation.set(0,0,Ct.rotL)}else{let Ut=Math.cos(Ct.rotU),I=Math.sin(Ct.rotU),jt=Tt-Ct.B0.x,Wt=It-Ct.B0.y;tt.position.set(Ct.B.x+jt*Ut-Wt*I,Ct.B.y+jt*I+Wt*Ut,0),tt.rotation.set(0,0,Ct.rotU)}tt.position.y<Jt&&(q=!1)}),q},vt=h.prevB;return ft(h.fold)?!0:(h.fold=Y,h.foldV=0,h.prevB=vt,ft(h.fold),!1)}function D(){let L={n,placed:h.k,t:h.t,R:e,centering:h.centering,minRatio:t.min_ratio};return{ok:Au(L),why:lc(L)}}function T(){let L=D(),lt=t.status[L.why];r(".wh-ar-n").textContent=`${h.k} / ${n}`,r(".wh-ar-ratio").textContent=rr(h.t,e).toFixed(4),r(".wh-ar-min").textContent=t.min_ratio.toFixed(4);let at=r(".wh-ar-status");at.innerHTML=ce(lt.en,lt.zh),at.dataset.ok=L.ok,r(".wh-ar-tm").textContent=`${h.t.toFixed(2)} m`,i.querySelector(".wh-ar-ratio").closest("div").classList.toggle("is-bad",rr(h.t,e)<t.min_ratio),f.innerHTML=h.centering?"Remove the centering<small>\u62C6\u6389\u62F1\u67B6</small>":"Put the centering back<small>\u628A\u62F1\u67B6\u653E\u56DE\u53BB</small>",f.setAttribute("aria-pressed",!h.centering),l.setAttribute("aria-valuetext",`${h.k} of ${n} stones placed \xB7 \u653E\u4E86 ${h.k} \u584A`),c.setAttribute("aria-valuetext",`${h.t.toFixed(2)} meters thick \xB7 \u539A ${h.t.toFixed(2)} \u516C\u5C3A`),C&&(C.L.status.innerHTML=ce(lt.short_en,lt.short_zh))}function F(){if(!C)return;let{labs:L,L:lt,camera:at}=C,Gt=oc(n,h.k);L.place(lt.key,new R(0,Oe+e+h.t+.9,ri/2),Gt.has(s)&&!h.fallen),L.place(lt.frame,new R(-e*.45,Oe+h.frameY+.6,ri/2),h.centering),L.place(lt.abut,new R(e+h.t/2,Oe+.5,ri/2+.4),!0),L.place(lt.status,new R(0,Oe+e+h.t+2.4,0),!h.centering),C.renderer.render(C.scene,at)}h.frameY=0,h.fold=0,h.foldV=0;function O(L){p=0;let lt=Math.min(.05,_?(L-_)/1e3:.016);_=L;let at=!1;h.building&&L-d>450&&(h.k>=n?it(!1):(h.k+=1,l.value=h.k,w(),T(),d=L),at=!0);let Gt=h.centering?0:-(Oe+e+1);Math.abs(h.frameY-Gt)>.001&&(h.frameY+=Math.sign(Gt-h.frameY)*Math.min(Math.abs(Gt-h.frameY),lt*3),at=!0),!h.centering&&!D().ok&&h.frameY<-.6&&!h.fallen&&(h.fallen=!0),h.fallen&&E(lt)&&(at=!0),b(lt),B.some(Ot=>{var Jt;return Ot.visible&&((Jt=Ot.userData.age)!=null?Jt:1)<1})&&(at=!0),C&&C.controls.update(),F(),A=at?0:A+1,m&&A<60&&(p=requestAnimationFrame(O))}function V(){A=0,!p&&m&&(_=0,p=requestAnimationFrame(O))}new IntersectionObserver(L=>{m=L[0].isIntersecting,m&&V()}).observe(i);function w(){h.fallen=!1,h.fold=0,h.foldV=0,h.prevB=null,B.forEach(L=>{L.position.copy(L.userData.home),L.rotation.set(0,0,0)})}function H(L){h.k=Math.max(0,Math.min(n,Math.round(L))),l.value=h.k,w(),T(),V()}function U(L){h.t=Math.max(t.t_min,Math.min(t.t_max,L)),c.value=Math.round(h.t*100),w(),y(),B.forEach(lt=>{lt.userData.age=1}),T(),V()}function k(L){h.centering=L,L&&w(),T(),V()}function it(L){h.building=L,d=performance.now(),L&&(h.k=0,l.value=0,k(!0)),u.setAttribute("aria-pressed",L),u.querySelector(".al-play-t").textContent=L?"Pause \xB7 \u66AB\u505C":"Build it \xB7 \u84CB\u8D77\u4F86",i.classList.toggle("is-playing",L),V()}l.addEventListener("input",()=>{h.building&&it(!1),H(+l.value)}),c.addEventListener("input",()=>U(c.value/100)),u.addEventListener("click",()=>it(!h.building)),f.addEventListener("click",()=>k(!h.centering)),C&&r(".al-home").addEventListener("click",()=>{C.camera.position.set(9,7.5,17),C.controls.target.set(0,4,0),C.controls.update(),V()});let X={build:()=>{U(t.t),it(!0)},remove:()=>{it(!1),U(t.t),H(n),k(!1)},nokey:()=>{it(!1),U(t.t),H(n-1),k(!1)},thin:()=>{it(!1),H(n),U(t.t_min),k(!1)}},$={state:h,place:H,thick:U,centering:k,build:it,demo(L){X[L]&&X[L]()},info(){let L=D();return{k:h.k,n,t:h.t,ratio:rr(h.t,e),centering:h.centering,stands:L.ok,why:L.why,webgl:!!C}},settle(){if(h.frameY=h.centering?0:-(Oe+e+1),B.forEach(L=>{L.userData.age=1}),!h.centering&&!D().ok){h.fallen=!0;for(let L=0;L<400&&E(.02);L++);}b(0),F()},render(){b(0),T(),F()},dbg(){return{kids:C?C.blocks.children.length:0,pieces:B.map(L=>[L.userData.b.i,+L.position.x.toFixed(2),+L.position.y.toFixed(2),+L.rotation.z.toFixed(2),L.visible])}},cam(L,lt,at){C&&(C.camera.position.set(L,lt,at),C.controls.target.set(0,4,0),C.controls.update(),F())},ready:()=>!0};return y(),B.forEach(L=>{L.userData.age=1}),T(),b(0),i.__lab=$,$}xu("[data-wh-arch-lab]",v0,{demo:(i,t)=>i.demo(t)});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
