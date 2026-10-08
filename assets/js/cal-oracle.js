(()=>{var Ti={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ei={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ph=0,Vl=1,Ih=2;var qi=1,Lh=2,Os=3,Ai=0,sn=1,on=2,Xn=0,Bs=1,Gl=2,Hl=3,Wl=4,Dh=5;var Yi=100,Nh=101,Uh=102,Fh=103,Oh=104,Bh=200,zh=201,kh=202,Vh=203,Xl=204,ql=205,Gh=206,Hh=207,Wh=208,Xh=209,qh=210,Yh=211,$h=212,Zh=213,Jh=214,ga=0,_a=1,xa=2,Ss=3,ya=4,va=5,Ma=6,Sa=7,Yl=0,Kh=1,jh=2,Un=0,$l=1,Zl=2,Jl=3,Kl=4,jl=5,Ql=6,tc=7;var ec=300,Ci=301,$i=302,Qa=303,to=304,Nr=306,ba=1e3,Gn=1001,wa=1002,ke=1003,Qh=1004;var Ur=1005;var He=1006,eo=1007;var Ri=1008;var ln=1009,nc=1010,ic=1011,zs=1012,no=1013,Fn=1014,On=1015,Bn=1016,io=1017,so=1018,ks=1020,sc=35902,rc=35899,ac=1021,oc=1022,En=1023,Wn=1026,Pi=1027,lc=1028,ro=1029,Ii=1030,ao=1031;var oo=1033,Fr=33776,Or=33777,Br=33778,zr=33779,lo=35840,co=35841,ho=35842,uo=35843,fo=36196,po=37492,mo=37496,go=37488,_o=37489,kr=37490,xo=37491,yo=37808,vo=37809,Mo=37810,So=37811,bo=37812,wo=37813,To=37814,Eo=37815,Ao=37816,Co=37817,Ro=37818,Po=37819,Io=37820,Lo=37821,Do=36492,No=36494,Uo=36495,Fo=36283,Oo=36284,Vr=36285,Bo=36286;var sr=2300,Ta=2301,pa=2302,Rl=2303,Pl=2400,Il=2401,Ll=2402;var tu=3200;var zo=0,eu=1,ri="",Ae="srgb",rr="srgb-linear",ar="linear",pe="srgb";var ma=7680;var nu=519,iu=512,su=513,ru=514,ko=515,au=516,ou=517,Vo=518,lu=519,cu=35044;var cc="300 es",Ln=2e3,bs=2001;function Dd(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Nd(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function or(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function hu(){let n=or("canvas");return n.style.display="block",n}var nh={},ws=null;function hc(...n){let t="THREE."+n.shift();ws?ws("log",t,...n):console.log(t,...n)}function uu(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Xt(...n){n=uu(n);let t="THREE."+n.shift();if(ws)ws("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Yt(...n){n=uu(n);let t="THREE."+n.shift();if(ws)ws("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function Gi(...n){let t=n.join(" ");t in nh||(nh[t]=!0,Xt(...n))}function du(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var fu={[ga]:_a,[xa]:Ma,[ya]:Sa,[Ss]:va,[_a]:ga,[Ma]:xa,[Sa]:ya,[va]:Ss},Dn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Ye=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ih=1234567,tr=Math.PI/180,Ts=180/Math.PI;function Zi(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ye[n&255]+Ye[n>>8&255]+Ye[n>>16&255]+Ye[n>>24&255]+"-"+Ye[t&255]+Ye[t>>8&255]+"-"+Ye[t>>16&15|64]+Ye[t>>24&255]+"-"+Ye[e&63|128]+Ye[e>>8&255]+"-"+Ye[e>>16&255]+Ye[e>>24&255]+Ye[i&255]+Ye[i>>8&255]+Ye[i>>16&255]+Ye[i>>24&255]).toLowerCase()}function ne(n,t,e){return Math.max(t,Math.min(e,n))}function uc(n,t){return(n%t+t)%t}function Ud(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Fd(n,t,e){return n!==t?(e-n)/(t-n):0}function er(n,t,e){return(1-e)*n+e*t}function Od(n,t,e,i){return er(n,t,1-Math.exp(-e*i))}function Bd(n,t=1){return t-Math.abs(uc(n,t*2)-t)}function zd(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function kd(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Vd(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Gd(n,t){return n+Math.random()*(t-n)}function Hd(n){return n*(.5-Math.random())}function Wd(n){n!==void 0&&(ih=n);let t=ih+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Xd(n){return n*tr}function qd(n){return n*Ts}function Yd(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function $d(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Zd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Jd(n,t,e,i,s){let r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+i)/2),h=a((t+i)/2),f=r((t-i)/2),d=a((t-i)/2),u=r((i-t)/2),m=a((i-t)/2);switch(s){case"XYX":n.set(o*h,c*f,c*d,o*l);break;case"YZY":n.set(c*d,o*h,c*f,o*l);break;case"ZXZ":n.set(c*f,c*d,o*h,o*l);break;case"XZX":n.set(o*h,c*m,c*u,o*l);break;case"YXY":n.set(c*u,o*h,c*m,o*l);break;case"ZYZ":n.set(c*m,c*u,o*h,o*l);break;default:Xt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function vs(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function tn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Vs={DEG2RAD:tr,RAD2DEG:Ts,generateUUID:Zi,clamp:ne,euclideanModulo:uc,mapLinear:Ud,inverseLerp:Fd,lerp:er,damp:Od,pingpong:Bd,smoothstep:zd,smootherstep:kd,randInt:Vd,randFloat:Gd,randFloatSpread:Hd,seededRandom:Wd,degToRad:Xd,radToDeg:qd,isPowerOfTwo:Yd,ceilPowerOfTwo:$d,floorPowerOfTwo:Zd,setQuaternionFromProperEuler:Jd,normalize:tn,denormalize:vs},_c=class _c{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};_c.prototype.isVector2=!0;var ht=_c,mn=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let c=i[s+0],l=i[s+1],h=i[s+2],f=i[s+3],d=r[a+0],u=r[a+1],m=r[a+2],y=r[a+3];if(f!==y||c!==d||l!==u||h!==m){let g=c*d+l*u+h*m+f*y;g<0&&(d=-d,u=-u,m=-m,y=-y,g=-g);let p=1-o;if(g<.9995){let S=Math.acos(g),A=Math.sin(S);p=Math.sin(p*S)/A,o=Math.sin(o*S)/A,c=c*p+d*o,l=l*p+u*o,h=h*p+m*o,f=f*p+y*o}else{c=c*p+d*o,l=l*p+u*o,h=h*p+m*o,f=f*p+y*o;let S=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=S,l*=S,h*=S,f*=S}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],c=i[s+1],l=i[s+2],h=i[s+3],f=r[a],d=r[a+1],u=r[a+2],m=r[a+3];return t[e]=o*m+h*f+c*u-l*d,t[e+1]=c*m+h*d+l*f-o*u,t[e+2]=l*m+h*u+o*d-c*f,t[e+3]=h*m-o*f-c*d-l*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(s/2),f=o(r/2),d=c(i/2),u=c(s/2),m=c(r/2);switch(a){case"XYZ":this._x=d*h*f+l*u*m,this._y=l*u*f-d*h*m,this._z=l*h*m+d*u*f,this._w=l*h*f-d*u*m;break;case"YXZ":this._x=d*h*f+l*u*m,this._y=l*u*f-d*h*m,this._z=l*h*m-d*u*f,this._w=l*h*f+d*u*m;break;case"ZXY":this._x=d*h*f-l*u*m,this._y=l*u*f+d*h*m,this._z=l*h*m+d*u*f,this._w=l*h*f-d*u*m;break;case"ZYX":this._x=d*h*f-l*u*m,this._y=l*u*f+d*h*m,this._z=l*h*m-d*u*f,this._w=l*h*f+d*u*m;break;case"YZX":this._x=d*h*f+l*u*m,this._y=l*u*f+d*h*m,this._z=l*h*m-d*u*f,this._w=l*h*f-d*u*m;break;case"XZY":this._x=d*h*f-l*u*m,this._y=l*u*f-d*h*m,this._z=l*h*m+d*u*f,this._w=l*h*f+d*u*m;break;default:Xt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],f=e[10],d=i+o+f;if(d>0){let u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(h-c)*u,this._y=(r-l)*u,this._z=(a-s)*u}else if(i>o&&i>f){let u=2*Math.sqrt(1+i-o-f);this._w=(h-c)/u,this._x=.25*u,this._y=(s+a)/u,this._z=(r+l)/u}else if(o>f){let u=2*Math.sqrt(1+o-i-f);this._w=(r-l)/u,this._x=(s+a)/u,this._y=.25*u,this._z=(c+h)/u}else{let u=2*Math.sqrt(1+f-i-o);this._w=(a-s)/u,this._x=(r+l)/u,this._y=(c+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ne(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-i*l,this._z=r*h+a*l+i*c-s*o,this._w=a*h-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},xc=class xc{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(sh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(sh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*i),h=2*(o*e-r*s),f=2*(r*i-a*e);return this.x=e+c*l+a*f-o*h,this.y=i+c*h+o*l-r*f,this.z=s+c*f+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return rl.copy(this).projectOnVector(t),this.sub(rl)}reflect(t){return this.sub(rl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};xc.prototype.isVector3=!0;var N=xc,rl=new N,sh=new mn,yc=class yc{constructor(t,e,i,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l)}set(t,e,i,s,r,a,o,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],f=i[7],d=i[2],u=i[5],m=i[8],y=s[0],g=s[3],p=s[6],S=s[1],A=s[4],v=s[7],b=s[2],w=s[5],C=s[8];return r[0]=a*y+o*S+c*b,r[3]=a*g+o*A+c*w,r[6]=a*p+o*v+c*C,r[1]=l*y+h*S+f*b,r[4]=l*g+h*A+f*w,r[7]=l*p+h*v+f*C,r[2]=d*y+u*S+m*b,r[5]=d*g+u*A+m*w,r[8]=d*p+u*v+m*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-i*r*h+i*o*c+s*r*l-s*a*c}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],f=h*a-o*l,d=o*c-h*r,u=l*r-a*c,m=e*f+i*d+s*u;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return t[0]=f*y,t[1]=(s*l-h*i)*y,t[2]=(o*i-s*a)*y,t[3]=d*y,t[4]=(h*e-s*c)*y,t[5]=(s*r-o*e)*y,t[6]=u*y,t[7]=(i*c-l*e)*y,t[8]=(a*e-i*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return Gi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(al.makeScale(t,e)),this}rotate(t){return Gi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(al.makeRotation(-t)),this}translate(t,e){return Gi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(al.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};yc.prototype.isMatrix3=!0;var Zt=yc,al=new Zt,rh=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ah=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Kd(){let n={enabled:!0,workingColorSpace:rr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===pe&&(s.r=ei(s.r),s.g=ei(s.g),s.b=ei(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===pe&&(s.r=Ms(s.r),s.g=Ms(s.g),s.b=Ms(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ri?ar:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Gi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Gi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[rr]:{primaries:t,whitePoint:i,transfer:ar,toXYZ:rh,fromXYZ:ah,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ae},outputColorSpaceConfig:{drawingBufferColorSpace:Ae}},[Ae]:{primaries:t,whitePoint:i,transfer:pe,toXYZ:rh,fromXYZ:ah,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ae}}}),n}var oe=Kd();function ei(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ms(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var os,Ea=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{os===void 0&&(os=or("canvas")),os.width=t.width,os.height=t.height;let s=os.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=os}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=or("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ei(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ei(e[i]/255)*255):e[i]=ei(e[i]);return{data:e,width:t.width,height:t.height}}else return Xt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},jd=0,Es=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=Zi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ol(s[a].image)):r.push(ol(s[a]))}else r=ol(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function ol(n){return typeof HTMLImageElement!="undefined"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&n instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&n instanceof ImageBitmap?Ea.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Xt("Texture: Unable to serialize Texture."),{})}var Qd=0,ll=new N,nn=class n extends Dn{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=Gn,s=Gn,r=He,a=Ri,o=En,c=ln,l=n.DEFAULT_ANISOTROPY,h=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qd++}),this.uuid=Zi(),this.name="",this.source=new Es(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ht(0,0),this.repeat=new ht(1,1),this.center=new ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ll).x}get height(){return this.source.getSize(ll).y}get depth(){return this.source.getSize(ll).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Xt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Xt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ec)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ba:t.x=t.x-Math.floor(t.x);break;case Gn:t.x=t.x<0?0:1;break;case wa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ba:t.y=t.y-Math.floor(t.y);break;case Gn:t.y=t.y<0?0:1;break;case wa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};nn.DEFAULT_IMAGE=null;nn.DEFAULT_MAPPING=ec;nn.DEFAULT_ANISOTROPY=1;var vc=class vc{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,c=t.elements,l=c[0],h=c[4],f=c[8],d=c[1],u=c[5],m=c[9],y=c[2],g=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(f-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+y)<.1&&Math.abs(m+g)<.1&&Math.abs(l+u+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let A=(l+1)/2,v=(u+1)/2,b=(p+1)/2,w=(h+d)/4,C=(f+y)/4,x=(m+g)/4;return A>v&&A>b?A<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(A),s=w/i,r=C/i):v>b?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=w/s,r=x/s):b<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),i=C/r,s=x/r),this.set(i,s,r,e),this}let S=Math.sqrt((g-m)*(g-m)+(f-y)*(f-y)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(g-m)/S,this.y=(f-y)/S,this.z=(d-h)/S,this.w=Math.acos((l+u+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this.w=ne(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this.w=ne(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};vc.prototype.isVector4=!0;var we=vc,Aa=class extends Dn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:He,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new we(0,0,t,e),this.scissorTest=!1,this.viewport=new we(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:i.depth},r=new nn(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:He,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Es(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},an=class extends Aa{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},lr=class extends nn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ca=class extends nn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var ja=class ja{constructor(t,e,i,s,r,a,o,c,l,h,f,d,u,m,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l,h,f,d,u,m,y,g)}set(t,e,i,s,r,a,o,c,l,h,f,d,u,m,y,g){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=f,p[14]=d,p[3]=u,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ja().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,s=1/ls.setFromMatrixColumn(t,0).length(),r=1/ls.setFromMatrixColumn(t,1).length(),a=1/ls.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let d=a*h,u=a*f,m=o*h,y=o*f;e[0]=c*h,e[4]=-c*f,e[8]=l,e[1]=u+m*l,e[5]=d-y*l,e[9]=-o*c,e[2]=y-d*l,e[6]=m+u*l,e[10]=a*c}else if(t.order==="YXZ"){let d=c*h,u=c*f,m=l*h,y=l*f;e[0]=d+y*o,e[4]=m*o-u,e[8]=a*l,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=u*o-m,e[6]=y+d*o,e[10]=a*c}else if(t.order==="ZXY"){let d=c*h,u=c*f,m=l*h,y=l*f;e[0]=d-y*o,e[4]=-a*f,e[8]=m+u*o,e[1]=u+m*o,e[5]=a*h,e[9]=y-d*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let d=a*h,u=a*f,m=o*h,y=o*f;e[0]=c*h,e[4]=m*l-u,e[8]=d*l+y,e[1]=c*f,e[5]=y*l+d,e[9]=u*l-m,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let d=a*c,u=a*l,m=o*c,y=o*l;e[0]=c*h,e[4]=y-d*f,e[8]=m*f+u,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=u*f+m,e[10]=d-y*f}else if(t.order==="XZY"){let d=a*c,u=a*l,m=o*c,y=o*l;e[0]=c*h,e[4]=-f,e[8]=l*h,e[1]=d*f+y,e[5]=a*h,e[9]=u*f-m,e[2]=m*f-u,e[6]=o*h,e[10]=y*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(tf,t,ef)}lookAt(t,e,i){let s=this.elements;return dn.subVectors(t,e),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),fi.crossVectors(i,dn),fi.lengthSq()===0&&(Math.abs(i.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),fi.crossVectors(i,dn)),fi.normalize(),Yr.crossVectors(dn,fi),s[0]=fi.x,s[4]=Yr.x,s[8]=dn.x,s[1]=fi.y,s[5]=Yr.y,s[9]=dn.y,s[2]=fi.z,s[6]=Yr.z,s[10]=dn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],f=i[5],d=i[9],u=i[13],m=i[2],y=i[6],g=i[10],p=i[14],S=i[3],A=i[7],v=i[11],b=i[15],w=s[0],C=s[4],x=s[8],T=s[12],P=s[1],D=s[5],F=s[9],W=s[13],L=s[2],H=s[6],tt=s[10],j=s[14],it=s[3],J=s[7],rt=s[11],at=s[15];return r[0]=a*w+o*P+c*L+l*it,r[4]=a*C+o*D+c*H+l*J,r[8]=a*x+o*F+c*tt+l*rt,r[12]=a*T+o*W+c*j+l*at,r[1]=h*w+f*P+d*L+u*it,r[5]=h*C+f*D+d*H+u*J,r[9]=h*x+f*F+d*tt+u*rt,r[13]=h*T+f*W+d*j+u*at,r[2]=m*w+y*P+g*L+p*it,r[6]=m*C+y*D+g*H+p*J,r[10]=m*x+y*F+g*tt+p*rt,r[14]=m*T+y*W+g*j+p*at,r[3]=S*w+A*P+v*L+b*it,r[7]=S*C+A*D+v*H+b*J,r[11]=S*x+A*F+v*tt+b*rt,r[15]=S*T+A*W+v*j+b*at,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],f=t[6],d=t[10],u=t[14],m=t[3],y=t[7],g=t[11],p=t[15],S=c*u-l*d,A=o*u-l*f,v=o*d-c*f,b=a*u-l*h,w=a*d-c*h,C=a*f-o*h;return e*(y*S-g*A+p*v)-i*(m*S-g*b+p*w)+s*(m*A-y*b+p*C)-r*(m*v-y*w+g*C)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],h=t[10];return e*(a*h-o*l)-i*(r*h-o*c)+s*(r*l-a*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],f=t[9],d=t[10],u=t[11],m=t[12],y=t[13],g=t[14],p=t[15],S=e*o-i*a,A=e*c-s*a,v=e*l-r*a,b=i*c-s*o,w=i*l-r*o,C=s*l-r*c,x=h*y-f*m,T=h*g-d*m,P=h*p-u*m,D=f*g-d*y,F=f*p-u*y,W=d*p-u*g,L=S*W-A*F+v*D+b*P-w*T+C*x;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/L;return t[0]=(o*W-c*F+l*D)*H,t[1]=(s*F-i*W-r*D)*H,t[2]=(y*C-g*w+p*b)*H,t[3]=(d*w-f*C-u*b)*H,t[4]=(c*P-a*W-l*T)*H,t[5]=(e*W-s*P+r*T)*H,t[6]=(g*v-m*C-p*A)*H,t[7]=(h*C-d*v+u*A)*H,t[8]=(a*F-o*P+l*x)*H,t[9]=(i*P-e*F-r*x)*H,t[10]=(m*w-y*v+p*S)*H,t[11]=(f*v-h*w-u*S)*H,t[12]=(o*T-a*D-c*x)*H,t[13]=(e*D-i*T+s*x)*H,t[14]=(y*A-m*b-g*S)*H,t[15]=(h*b-f*A+d*S)*H,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+i,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,f=o+o,d=r*l,u=r*h,m=r*f,y=a*h,g=a*f,p=o*f,S=c*l,A=c*h,v=c*f,b=i.x,w=i.y,C=i.z;return s[0]=(1-(y+p))*b,s[1]=(u+v)*b,s[2]=(m-A)*b,s[3]=0,s[4]=(u-v)*w,s[5]=(1-(d+p))*w,s[6]=(g+S)*w,s[7]=0,s[8]=(m+A)*C,s[9]=(g-S)*C,s[10]=(1-(d+y))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=ls.set(s[0],s[1],s[2]).length(),o=ls.set(s[4],s[5],s[6]).length(),c=ls.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Rn.copy(this);let l=1/a,h=1/o,f=1/c;return Rn.elements[0]*=l,Rn.elements[1]*=l,Rn.elements[2]*=l,Rn.elements[4]*=h,Rn.elements[5]*=h,Rn.elements[6]*=h,Rn.elements[8]*=f,Rn.elements[9]*=f,Rn.elements[10]*=f,e.setFromRotationMatrix(Rn),i.x=a,i.y=o,i.z=c,this}makePerspective(t,e,i,s,r,a,o=Ln,c=!1){let l=this.elements,h=2*r/(e-t),f=2*r/(i-s),d=(e+t)/(e-t),u=(i+s)/(i-s),m,y;if(c)m=r/(a-r),y=a*r/(a-r);else if(o===Ln)m=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===bs)m=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=Ln,c=!1){let l=this.elements,h=2/(e-t),f=2/(i-s),d=-(e+t)/(e-t),u=-(i+s)/(i-s),m,y;if(c)m=1/(a-r),y=a/(a-r);else if(o===Ln)m=-2/(a-r),y=-(a+r)/(a-r);else if(o===bs)m=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=f,l[9]=0,l[13]=u,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};ja.prototype.isMatrix4=!0;var be=ja,ls=new N,Rn=new be,tf=new N(0,0,0),ef=new N(1,1,1),fi=new N,Yr=new N,dn=new N,oh=new be,lh=new mn,ni=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],f=s[2],d=s[6],u=s[10];switch(e){case"XYZ":this._y=Math.asin(ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ne(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,u),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ne(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ne(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,u),this._y=0);break;default:Xt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return oh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(oh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return lh.setFromEuler(this),this.setFromQuaternion(lh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ni.DEFAULT_ORDER="XYZ";var cr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},nf=0,ch=new N,cs=new mn,Jn=new be,$r=new N,Zs=new N,sf=new N,rf=new mn,hh=new N(1,0,0),uh=new N(0,1,0),dh=new N(0,0,1),fh={type:"added"},af={type:"removed"},hs={type:"childadded",child:null},cl={type:"childremoved",child:null},Ze=class n extends Dn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nf++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new N,e=new ni,i=new mn,s=new N(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new be},normalMatrix:{value:new Zt}}),this.matrix=new be,this.matrixWorld=new be,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return cs.setFromAxisAngle(t,e),this.quaternion.multiply(cs),this}rotateOnWorldAxis(t,e){return cs.setFromAxisAngle(t,e),this.quaternion.premultiply(cs),this}rotateX(t){return this.rotateOnAxis(hh,t)}rotateY(t){return this.rotateOnAxis(uh,t)}rotateZ(t){return this.rotateOnAxis(dh,t)}translateOnAxis(t,e){return ch.copy(t).applyQuaternion(this.quaternion),this.position.add(ch.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(hh,t)}translateY(t){return this.translateOnAxis(uh,t)}translateZ(t){return this.translateOnAxis(dh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?$r.copy(t):$r.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(Zs,$r,this.up):Jn.lookAt($r,Zs,this.up),this.quaternion.setFromRotationMatrix(Jn),s&&(Jn.extractRotation(s.matrixWorld),cs.setFromRotationMatrix(Jn),this.quaternion.premultiply(cs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Yt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(fh),hs.child=t,this.dispatchEvent(hs),hs.child=null):Yt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(af),cl.child=t,this.dispatchEvent(cl),cl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Jn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Jn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(fh),hs.child=t,this.dispatchEvent(hs),hs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,t,sf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,rf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),f=a(t.shapes),d=a(t.skeletons),u=a(t.animations),m=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),u.length>0&&(i.animations=u),m.length>0&&(i.nodes=m)}return i.object=s,i;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ze.DEFAULT_UP=new N(0,1,0);Ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ce=class extends Ze{constructor(){super(),this.isGroup=!0,this.type="Group"}},of={type:"move"},As=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ce,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ce,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ce,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let y of t.hand.values()){let g=e.getJointPose(y,i),p=this._getHandJoint(l,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=h.position.distanceTo(f.position),u=.02,m=.005;l.inputState.pinching&&d>u+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=u-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(of)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Ce;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},pu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pi={h:0,s:0,l:0},Zr={h:0,s:0,l:0};function hl(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Qt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ae){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=oe.workingColorSpace){return this.r=t,this.g=e,this.b=i,oe.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=oe.workingColorSpace){if(t=uc(t,1),e=ne(e,0,1),i=ne(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=hl(a,r,t+1/3),this.g=hl(a,r,t),this.b=hl(a,r,t-1/3)}return oe.colorSpaceToWorking(this,s),this}setStyle(t,e=Ae){function i(r){r!==void 0&&parseFloat(r)<1&&Xt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Xt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Xt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ae){let i=pu[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Xt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ei(t.r),this.g=ei(t.g),this.b=ei(t.b),this}copyLinearToSRGB(t){return this.r=Ms(t.r),this.g=Ms(t.g),this.b=Ms(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ae){return oe.workingToColorSpace($e.copy(this),t),Math.round(ne($e.r*255,0,255))*65536+Math.round(ne($e.g*255,0,255))*256+Math.round(ne($e.b*255,0,255))}getHexString(t=Ae){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.workingToColorSpace($e.copy(this),e);let i=$e.r,s=$e.g,r=$e.b,a=Math.max(i,s,r),o=Math.min(i,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let f=a-o;switch(l=h<=.5?f/(a+o):f/(2-a-o),a){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=oe.workingColorSpace){return oe.workingToColorSpace($e.copy(this),e),t.r=$e.r,t.g=$e.g,t.b=$e.b,t}getStyle(t=Ae){oe.workingToColorSpace($e.copy(this),t);let e=$e.r,i=$e.g,s=$e.b;return t!==Ae?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(pi),this.setHSL(pi.h+t,pi.s+e,pi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(pi),t.getHSL(Zr);let i=er(pi.h,Zr.h,e),s=er(pi.s,Zr.s,e),r=er(pi.l,Zr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$e=new Qt;Qt.NAMES=pu;var hr=class extends Ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ni,this.environmentIntensity=1,this.environmentRotation=new ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Pn=new N,Kn=new N,ul=new N,jn=new N,us=new N,ds=new N,ph=new N,dl=new N,fl=new N,pl=new N,ml=new we,gl=new we,_l=new we,xi=class n{constructor(t=new N,e=new N,i=new N){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Pn.subVectors(t,e),s.cross(Pn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Pn.subVectors(s,e),Kn.subVectors(i,e),ul.subVectors(t,e);let a=Pn.dot(Pn),o=Pn.dot(Kn),c=Pn.dot(ul),l=Kn.dot(Kn),h=Kn.dot(ul),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;let d=1/f,u=(l*c-o*h)*d,m=(a*h-o*c)*d;return r.set(1-u-m,m,u)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(t,e,i,s,r,a,o,c){return this.getBarycoord(t,e,i,s,jn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,jn.x),c.addScaledVector(a,jn.y),c.addScaledVector(o,jn.z),c)}static getInterpolatedAttribute(t,e,i,s,r,a){return ml.setScalar(0),gl.setScalar(0),_l.setScalar(0),ml.fromBufferAttribute(t,e),gl.fromBufferAttribute(t,i),_l.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(ml,r.x),a.addScaledVector(gl,r.y),a.addScaledVector(_l,r.z),a}static isFrontFacing(t,e,i,s){return Pn.subVectors(i,e),Kn.subVectors(t,e),Pn.cross(Kn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Pn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),Pn.cross(Kn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;us.subVectors(s,i),ds.subVectors(r,i),dl.subVectors(t,i);let c=us.dot(dl),l=ds.dot(dl);if(c<=0&&l<=0)return e.copy(i);fl.subVectors(t,s);let h=us.dot(fl),f=ds.dot(fl);if(h>=0&&f<=h)return e.copy(s);let d=c*f-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(i).addScaledVector(us,a);pl.subVectors(t,r);let u=us.dot(pl),m=ds.dot(pl);if(m>=0&&u<=m)return e.copy(r);let y=u*l-c*m;if(y<=0&&l>=0&&m<=0)return o=l/(l-m),e.copy(i).addScaledVector(ds,o);let g=h*m-u*f;if(g<=0&&f-h>=0&&u-m>=0)return ph.subVectors(r,s),o=(f-h)/(f-h+(u-m)),e.copy(s).addScaledVector(ph,o);let p=1/(g+y+d);return a=y*p,o=d*p,e.copy(i).addScaledVector(us,a).addScaledVector(ds,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},yi=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(In.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(In.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=In.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,In):In.fromBufferAttribute(r,a),In.applyMatrix4(t.matrixWorld),this.expandByPoint(In);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Jr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Jr.copy(i.boundingBox)),Jr.applyMatrix4(t.matrixWorld),this.union(Jr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,In),In.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Js),Kr.subVectors(this.max,Js),fs.subVectors(t.a,Js),ps.subVectors(t.b,Js),ms.subVectors(t.c,Js),mi.subVectors(ps,fs),gi.subVectors(ms,ps),Bi.subVectors(fs,ms);let e=[0,-mi.z,mi.y,0,-gi.z,gi.y,0,-Bi.z,Bi.y,mi.z,0,-mi.x,gi.z,0,-gi.x,Bi.z,0,-Bi.x,-mi.y,mi.x,0,-gi.y,gi.x,0,-Bi.y,Bi.x,0];return!xl(e,fs,ps,ms,Kr)||(e=[1,0,0,0,1,0,0,0,1],!xl(e,fs,ps,ms,Kr))?!1:(jr.crossVectors(mi,gi),e=[jr.x,jr.y,jr.z],xl(e,fs,ps,ms,Kr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,In).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(In).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Qn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Qn=[new N,new N,new N,new N,new N,new N,new N,new N],In=new N,Jr=new yi,fs=new N,ps=new N,ms=new N,mi=new N,gi=new N,Bi=new N,Js=new N,Kr=new N,jr=new N,zi=new N;function xl(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){zi.fromArray(n,r);let o=s.x*Math.abs(zi.x)+s.y*Math.abs(zi.y)+s.z*Math.abs(zi.z),c=t.dot(zi),l=e.dot(zi),h=i.dot(zi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Le=new N,Qr=new ht,lf=0,en=class extends Dn{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=cu,this.updateRanges=[],this.gpuType=On,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Qr.fromBufferAttribute(this,e),Qr.applyMatrix3(t),this.setXY(e,Qr.x,Qr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix3(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=vs(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=tn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=vs(e,this.array)),e}setX(t,e){return this.normalized&&(e=tn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=vs(e,this.array)),e}setY(t,e){return this.normalized&&(e=tn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=vs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=tn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=vs(e,this.array)),e}setW(t,e){return this.normalized&&(e=tn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=tn(e,this.array),i=tn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=tn(e,this.array),i=tn(i,this.array),s=tn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=tn(e,this.array),i=tn(i,this.array),s=tn(s,this.array),r=tn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var ur=class extends en{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var dr=class extends en{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var de=class extends en{constructor(t,e,i){super(new Float32Array(t),e,i)}},cf=new yi,Ks=new N,yl=new N,Cs=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):cf.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ks.subVectors(t,this.center);let e=Ks.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Ks,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(yl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ks.copy(t.center).add(yl)),this.expandByPoint(Ks.copy(t.center).sub(yl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},hf=0,bn=new be,vl=new Ze,gs=new N,fn=new yi,js=new yi,ze=new N,Ue=class n extends Dn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Dd(t)?dr:ur)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Zt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return bn.makeRotationFromQuaternion(t),this.applyMatrix4(bn),this}rotateX(t){return bn.makeRotationX(t),this.applyMatrix4(bn),this}rotateY(t){return bn.makeRotationY(t),this.applyMatrix4(bn),this}rotateZ(t){return bn.makeRotationZ(t),this.applyMatrix4(bn),this}translate(t,e,i){return bn.makeTranslation(t,e,i),this.applyMatrix4(bn),this}scale(t,e,i){return bn.makeScale(t,e,i),this.applyMatrix4(bn),this}lookAt(t){return vl.lookAt(t),vl.updateMatrix(),this.applyMatrix4(vl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gs).negate(),this.translate(gs.x,gs.y,gs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new de(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Xt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(ze.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(ze),ze.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(ze)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Yt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cs);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let i=this.boundingSphere.center;if(fn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];js.setFromBufferAttribute(o),this.morphTargetsRelative?(ze.addVectors(fn.min,js.min),fn.expandByPoint(ze),ze.addVectors(fn.max,js.max),fn.expandByPoint(ze)):(fn.expandByPoint(js.min),fn.expandByPoint(js.max))}fn.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)ze.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(ze));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)ze.fromBufferAttribute(o,l),c&&(gs.fromBufferAttribute(t,l),ze.add(gs)),s=Math.max(s,i.distanceToSquared(ze))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Yt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Yt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new en(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let x=0;x<i.count;x++)o[x]=new N,c[x]=new N;let l=new N,h=new N,f=new N,d=new ht,u=new ht,m=new ht,y=new N,g=new N;function p(x,T,P){l.fromBufferAttribute(i,x),h.fromBufferAttribute(i,T),f.fromBufferAttribute(i,P),d.fromBufferAttribute(r,x),u.fromBufferAttribute(r,T),m.fromBufferAttribute(r,P),h.sub(l),f.sub(l),u.sub(d),m.sub(d);let D=1/(u.x*m.y-m.x*u.y);isFinite(D)&&(y.copy(h).multiplyScalar(m.y).addScaledVector(f,-u.y).multiplyScalar(D),g.copy(f).multiplyScalar(u.x).addScaledVector(h,-m.x).multiplyScalar(D),o[x].add(y),o[T].add(y),o[P].add(y),c[x].add(g),c[T].add(g),c[P].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let x=0,T=S.length;x<T;++x){let P=S[x],D=P.start,F=P.count;for(let W=D,L=D+F;W<L;W+=3)p(t.getX(W+0),t.getX(W+1),t.getX(W+2))}let A=new N,v=new N,b=new N,w=new N;function C(x){b.fromBufferAttribute(s,x),w.copy(b);let T=o[x];A.copy(T),A.sub(b.multiplyScalar(b.dot(T))).normalize(),v.crossVectors(w,T);let D=v.dot(c[x])<0?-1:1;a.setXYZW(x,A.x,A.y,A.z,D)}for(let x=0,T=S.length;x<T;++x){let P=S[x],D=P.start,F=P.count;for(let W=D,L=D+F;W<L;W+=3)C(t.getX(W+0)),C(t.getX(W+1)),C(t.getX(W+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new en(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,u=i.count;d<u;d++)i.setXYZ(d,0,0,0);let s=new N,r=new N,a=new N,o=new N,c=new N,l=new N,h=new N,f=new N;if(t)for(let d=0,u=t.count;d<u;d+=3){let m=t.getX(d+0),y=t.getX(d+1),g=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,g),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(i,m),c.fromBufferAttribute(i,y),l.fromBufferAttribute(i,g),o.add(h),c.add(h),l.add(h),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(y,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,u=e.count;d<u;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)ze.fromBufferAttribute(t,e),ze.normalize(),t.setXYZ(e,ze.x,ze.y,ze.z)}toNonIndexed(){function t(o,c){let l=o.array,h=o.itemSize,f=o.normalized,d=new l.constructor(c.length*h),u=0,m=0;for(let y=0,g=c.length;y<g;y++){o.isInterleavedBufferAttribute?u=c[y]*o.data.stride+o.offset:u=c[y]*h;for(let p=0;p<h;p++)d[m++]=l[u++]}return new en(d,h,f)}if(this.index===null)return Xt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=t(c,i);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,f=l.length;h<f;h++){let d=l[h],u=t(d,i);c.push(u)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let c in i){let l=i[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let f=0,d=l.length;f<d;f++){let u=l[f];h.push(u.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],f=r[l];for(let d=0,u=f.length;d<u;d++)h.push(f[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,h=a.length;l<h;l++){let f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Ml=new N,uf=new N,df=new Zt,pn=class{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=Ml.subVectors(i,e).cross(uf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let s=t.delta(Ml),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||df.getNormalMatrix(t),s=this.coplanarPoint(Ml).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},ff=0,vi=class extends Dn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ff++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=Bs,this.side=Ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xl,this.blendDst=ql,this.blendEquation=Yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qt(0,0,0),this.blendAlpha=0,this.depthFunc=Ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ma,this.stencilZFail=ma,this.stencilZPass=ma,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Xt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Xt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Qt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new pn().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ht().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ht().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var ti=new N,Sl=new N,ta=new N,ea=new N,Rs=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ti)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ti.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ti.copy(this.origin).addScaledVector(this.direction,e),ti.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Sl.copy(t).add(e).multiplyScalar(.5),ta.copy(e).sub(t).normalize(),ea.copy(this.origin).sub(Sl);let r=t.distanceTo(e)*.5,a=-this.direction.dot(ta),o=ea.dot(this.direction),c=-ea.dot(ta),l=ea.lengthSq(),h=Math.abs(1-a*a),f,d,u,m;if(h>0)if(f=a*c-o,d=a*o-c,m=r*h,f>=0)if(d>=-m)if(d<=m){let y=1/h;f*=y,d*=y,u=f*(f+a*d+2*o)+d*(a*f+d+2*c)+l}else d=r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*c)+l;else d=-r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*c)+l;else d<=-m?(f=Math.max(0,-(-a*r+o)),d=f>0?-r:Math.min(Math.max(-r,-c),r),u=-f*f+d*(d+2*c)+l):d<=m?(f=0,d=Math.min(Math.max(-r,-c),r),u=d*(d+2*c)+l):(f=Math.max(0,-(a*r+o)),d=f>0?r:Math.min(Math.max(-r,-c),r),u=-f*f+d*(d+2*c)+l);else d=a>0?-r:r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Sl).addScaledVector(ta,d),u}intersectSphere(t,e){if(t.radius<0)return null;ti.subVectors(t.center,this.origin);let i=ti.dot(this.direction),s=ti.dot(ti)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-d.z)*f,c=(t.max.z-d.z)*f):(o=(t.max.z-d.z)*f,c=(t.min.z-d.z)*f),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,ti)!==null}intersectTriangle(t,e,i,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,f=t.x-a.x,d=t.y-a.y,u=t.z-a.z,m=e.x-a.x,y=e.y-a.y,g=e.z-a.z,p=i.x-a.x,S=i.y-a.y,A=i.z-a.z,v=Math.abs(c),b=Math.abs(l),w=Math.abs(h),C,x,T,P,D,F,W,L,H,tt,j,it;if(v>=b&&v>=w?(T=c,F=f,H=m,it=p,c>=0?(C=l,x=h,P=d,D=u,W=y,L=g,tt=S,j=A):(C=h,x=l,P=u,D=d,W=g,L=y,tt=A,j=S)):b>=w?(T=l,F=d,H=y,it=S,l>=0?(C=h,x=c,P=u,D=f,W=g,L=m,tt=A,j=p):(C=c,x=h,P=f,D=u,W=m,L=g,tt=p,j=A)):(T=h,F=u,H=g,it=A,h>=0?(C=c,x=l,P=f,D=d,W=m,L=y,tt=p,j=S):(C=l,x=c,P=d,D=f,W=y,L=m,tt=S,j=p)),T===0)return null;let J=C/T,rt=x/T,at=1/T,St=P-J*F,Ct=D-rt*F,Wt=W-J*H,qt=L-rt*H,te=tt-J*it,et=j-rt*it,nt=te*qt-et*Wt,pt=St*et-Ct*te,Gt=Wt*Ct-qt*St;if(s){if(nt<0||pt<0||Gt<0)return null}else if((nt<0||pt<0||Gt<0)&&(nt>0||pt>0||Gt>0))return null;let bt=nt+pt+Gt;if(bt===0)return null;let Ut=at*(nt*F+pt*H+Gt*it);return(bt>0?Ut<0:Ut>0)?null:this.at(Ut/bt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},fr=class extends vi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=Yl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},mh=new be,ki=new Rs,na=new Cs,gh=new N,ia=new N,sa=new N,ra=new N,bl=new N,aa=new N,_h=new N,oa=new N,Jt=class extends Ze{constructor(t=new Ue,e=new fr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){aa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],f=r[c];h!==0&&(bl.fromBufferAttribute(f,t),a?aa.addScaledVector(bl,h):aa.addScaledVector(bl.sub(e),h))}e.add(aa)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),na.copy(i.boundingSphere),na.applyMatrix4(r),ki.copy(t.ray).recast(t.near),!(na.containsPoint(ki.origin)===!1&&(ki.intersectSphere(na,gh)===null||ki.origin.distanceToSquared(gh)>(t.far-t.near)**2))&&(mh.copy(r).invert(),ki.copy(t.ray).applyMatrix4(mh),!(i.boundingBox!==null&&ki.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ki)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,d=r.groups,u=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,y=d.length;m<y;m++){let g=d[m],p=a[g.materialIndex],S=Math.max(g.start,u.start),A=Math.min(o.count,Math.min(g.start+g.count,u.start+u.count));for(let v=S,b=A;v<b;v+=3){let w=o.getX(v),C=o.getX(v+1),x=o.getX(v+2);s=la(this,p,t,i,l,h,f,w,C,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,u.start),y=Math.min(o.count,u.start+u.count);for(let g=m,p=y;g<p;g+=3){let S=o.getX(g),A=o.getX(g+1),v=o.getX(g+2);s=la(this,a,t,i,l,h,f,S,A,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,y=d.length;m<y;m++){let g=d[m],p=a[g.materialIndex],S=Math.max(g.start,u.start),A=Math.min(c.count,Math.min(g.start+g.count,u.start+u.count));for(let v=S,b=A;v<b;v+=3){let w=v,C=v+1,x=v+2;s=la(this,p,t,i,l,h,f,w,C,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,u.start),y=Math.min(c.count,u.start+u.count);for(let g=m,p=y;g<p;g+=3){let S=g,A=g+1,v=g+2;s=la(this,a,t,i,l,h,f,S,A,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function pf(n,t,e,i,s,r,a,o){let c;if(t.side===sn?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,t.side===Ai,o),c===null)return null;oa.copy(o),oa.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(oa);return l<e.near||l>e.far?null:{distance:l,point:oa.clone(),object:n}}function la(n,t,e,i,s,r,a,o,c,l){n.getVertexPosition(o,ia),n.getVertexPosition(c,sa),n.getVertexPosition(l,ra);let h=pf(n,t,e,i,ia,sa,ra,_h);if(h){let f=new N;xi.getBarycoord(_h,ia,sa,ra,f),s&&(h.uv=xi.getInterpolatedAttribute(s,o,c,l,f,new ht)),r&&(h.uv1=xi.getInterpolatedAttribute(r,o,c,l,f,new ht)),a&&(h.normal=xi.getInterpolatedAttribute(a,o,c,l,f,new N),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new N,materialIndex:0};xi.getNormal(ia,sa,ra,d.normal),h.face=d,h.barycoord=f}return h}var Ra=class extends nn{constructor(t=null,e=1,i=1,s,r,a,o,c,l=ke,h=ke,f,d){super(null,a,o,c,l,h,s,r,f,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Vi=new Cs,mf=new ht(.5,.5),ca=new N,Ps=class{constructor(t=new pn,e=new pn,i=new pn,s=new pn,r=new pn,a=new pn){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Ln,i=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],f=r[5],d=r[6],u=r[7],m=r[8],y=r[9],g=r[10],p=r[11],S=r[12],A=r[13],v=r[14],b=r[15];if(s[0].setComponents(l-a,u-h,p-m,b-S).normalize(),s[1].setComponents(l+a,u+h,p+m,b+S).normalize(),s[2].setComponents(l+o,u+f,p+y,b+A).normalize(),s[3].setComponents(l-o,u-f,p-y,b-A).normalize(),i)s[4].setComponents(c,d,g,v).normalize(),s[5].setComponents(l-c,u-d,p-g,b-v).normalize();else if(s[4].setComponents(l-c,u-d,p-g,b-v).normalize(),e===Ln)s[5].setComponents(l+c,u+d,p+g,b+v).normalize();else if(e===bs)s[5].setComponents(c,d,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Vi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Vi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Vi)}intersectsSprite(t){Vi.center.set(0,0,0);let e=mf.distanceTo(t.center);return Vi.radius=.7071067811865476+e,Vi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Vi)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(ca.x=s.normal.x>0?t.max.x:t.min.x,ca.y=s.normal.y>0?t.max.y:t.min.y,ca.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ca)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var pr=class extends nn{constructor(t=[],e=Ci,i,s,r,a,o,c,l,h){super(t,e,i,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},wn=class extends nn{constructor(t,e,i,s,r,a,o,c,l){super(t,e,i,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Mi=class extends nn{constructor(t,e,i=Fn,s,r,a,o=ke,c=ke,l,h=Wn,f=1){if(h!==Wn&&h!==Pi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:f};super(d,s,r,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Es(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Pa=class extends Mi{constructor(t,e=Fn,i=Ci,s,r,a=ke,o=ke,c,l=Wn){let h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,i,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},mr=class extends nn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Je=class n extends Ue{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],f=[],d=0,u=0;m("z","y","x",-1,-1,i,e,t,a,r,0),m("z","y","x",1,-1,i,e,-t,a,r,1),m("x","z","y",1,1,t,i,e,s,a,2),m("x","z","y",1,-1,t,i,-e,s,a,3),m("x","y","z",1,-1,t,e,i,s,r,4),m("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new de(l,3)),this.setAttribute("normal",new de(h,3)),this.setAttribute("uv",new de(f,2));function m(y,g,p,S,A,v,b,w,C,x,T){let P=v/C,D=b/x,F=v/2,W=b/2,L=w/2,H=C+1,tt=x+1,j=0,it=0,J=new N;for(let rt=0;rt<tt;rt++){let at=rt*D-W;for(let St=0;St<H;St++){let Ct=St*P-F;J[y]=Ct*S,J[g]=at*A,J[p]=L,l.push(J.x,J.y,J.z),J[y]=0,J[g]=0,J[p]=w>0?1:-1,h.push(J.x,J.y,J.z),f.push(St/C),f.push(1-rt/x),j+=1}}for(let rt=0;rt<x;rt++)for(let at=0;at<C;at++){let St=d+at+H*rt,Ct=d+at+H*(rt+1),Wt=d+(at+1)+H*(rt+1),qt=d+(at+1)+H*rt;c.push(St,Ct,qt),c.push(Ct,Wt,qt),it+=6}o.addGroup(u,it,T),u+=it,d+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Hi=class n extends Ue{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],c=[],l=new N,h=new ht;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let f=0,d=3;f<=e;f++,d+=3){let u=i+f/e*s;l.x=t*Math.cos(u),l.y=t*Math.sin(u),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,c.push(h.x,h.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new de(a,3)),this.setAttribute("normal",new de(o,3)),this.setAttribute("uv",new de(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Tn=class n extends Ue{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],f=[],d=[],u=[],m=0,y=[],g=i/2,p=0;S(),a===!1&&(t>0&&A(!0),e>0&&A(!1)),this.setIndex(h),this.setAttribute("position",new de(f,3)),this.setAttribute("normal",new de(d,3)),this.setAttribute("uv",new de(u,2));function S(){let v=new N,b=new N,w=0,C=(e-t)/i;for(let x=0;x<=r;x++){let T=[],P=x/r,D=P*(e-t)+t;for(let F=0;F<=s;F++){let W=F/s,L=W*c+o,H=Math.sin(L),tt=Math.cos(L);b.x=D*H,b.y=-P*i+g,b.z=D*tt,f.push(b.x,b.y,b.z),v.set(H,C,tt).normalize(),d.push(v.x,v.y,v.z),u.push(W,1-P),T.push(m++)}y.push(T)}for(let x=0;x<s;x++)for(let T=0;T<r;T++){let P=y[T][x],D=y[T+1][x],F=y[T+1][x+1],W=y[T][x+1];(t>0||T!==0)&&(h.push(P,D,W),w+=3),(e>0||T!==r-1)&&(h.push(D,F,W),w+=3)}l.addGroup(p,w,0),p+=w}function A(v){let b=m,w=new ht,C=new N,x=0,T=v===!0?t:e,P=v===!0?1:-1;for(let F=1;F<=s;F++)f.push(0,g*P,0),d.push(0,P,0),u.push(.5,.5),m++;let D=m;for(let F=0;F<=s;F++){let L=F/s*c+o,H=Math.cos(L),tt=Math.sin(L);C.x=T*tt,C.y=g*P,C.z=T*H,f.push(C.x,C.y,C.z),d.push(0,P,0),w.x=H*.5+.5,w.y=tt*.5*P+.5,u.push(w.x,w.y),m++}for(let F=0;F<s;F++){let W=b+F,L=D+F;v===!0?h.push(L,L+1,W):h.push(L+1,L,W),x+=3}l.addGroup(p,x,v===!0?1:2),p+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var gn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Xt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),s=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=i[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===a)return s/(r-1);let h=i[s],d=i[s+1]-h,u=(a-h)/d;return(s+u)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=e||(a.isVector2?new ht:new N);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new N,s=[],r=[],a=[],o=new N,c=new be;for(let u=0;u<=t;u++){let m=u/t;s[u]=this.getTangentAt(m,new N)}r[0]=new N,a[0]=new N;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),f=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),f<=l&&(l=f,i.set(0,1,0)),d<=l&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let u=1;u<=t;u++){if(r[u]=r[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(s[u-1],s[u]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(ne(s[u-1].dot(s[u]),-1,1));r[u].applyMatrix4(c.makeRotationAxis(o,m))}a[u].crossVectors(s[u],r[u])}if(e===!0){let u=Math.acos(ne(r[0].dot(r[t]),-1,1));u/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(u=-u);for(let m=1;m<=t;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],u*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Is=class extends gn{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new ht){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=c-this.aX,u=l-this.aY;c=d*h-u*f+this.aX,l=d*f+u*h+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Ia=class extends Is{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function dc(){let n=0,t=0,e=0,i=0;function s(r,a,o,c){n=r,t=o,e=-3*r+3*a-2*o-c,i=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,f){let d=(a-r)/l-(o-r)/(l+h)+(o-a)/h,u=(o-a)/h-(c-a)/(h+f)+(c-o)/f;d*=h,u*=h,s(a,o,d,u)},calc:function(r){let a=r*r,o=a*r;return n+t*r+e*a+i*o}}}var xh=new N,yh=new N,wl=new dc,Tl=new dc,El=new dc,La=class extends gn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new N){let i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(yh.subVectors(s[0],s[1]).add(s[0]),l=yh);let f=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(xh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=xh),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(f),u),y=Math.pow(f.distanceToSquared(d),u),g=Math.pow(d.distanceToSquared(h),u);y<1e-4&&(y=1),m<1e-4&&(m=y),g<1e-4&&(g=y),wl.initNonuniformCatmullRom(l.x,f.x,d.x,h.x,m,y,g),Tl.initNonuniformCatmullRom(l.y,f.y,d.y,h.y,m,y,g),El.initNonuniformCatmullRom(l.z,f.z,d.z,h.z,m,y,g)}else this.curveType==="catmullrom"&&(wl.initCatmullRom(l.x,f.x,d.x,h.x,this.tension),Tl.initCatmullRom(l.y,f.y,d.y,h.y,this.tension),El.initCatmullRom(l.z,f.z,d.z,h.z,this.tension));return i.set(wl.calc(c),Tl.calc(c),El.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new N().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function vh(n,t,e,i,s){let r=(i-t)*.5,a=(s-e)*.5,o=n*n,c=n*o;return(2*e-2*i+r+a)*c+(-3*e+3*i-2*r-a)*o+r*n+e}function gf(n,t){let e=1-n;return e*e*t}function _f(n,t){return 2*(1-n)*n*t}function xf(n,t){return n*n*t}function nr(n,t,e,i){return gf(n,t)+_f(n,e)+xf(n,i)}function yf(n,t){let e=1-n;return e*e*e*t}function vf(n,t){let e=1-n;return 3*e*e*n*t}function Mf(n,t){return 3*(1-n)*n*n*t}function Sf(n,t){return n*n*n*t}function ir(n,t,e,i,s){return yf(n,t)+vf(n,e)+Mf(n,i)+Sf(n,s)}var gr=class extends gn{constructor(t=new ht,e=new ht,i=new ht,s=new ht){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new ht){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ir(t,s.x,r.x,a.x,o.x),ir(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Da=class extends gn{constructor(t=new N,e=new N,i=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new N){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ir(t,s.x,r.x,a.x,o.x),ir(t,s.y,r.y,a.y,o.y),ir(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},_r=class extends gn{constructor(t=new ht,e=new ht){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ht){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ht){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Na=class extends gn{constructor(t=new N,e=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new N){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new N){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},xr=class extends gn{constructor(t=new ht,e=new ht,i=new ht){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new ht){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(nr(t,s.x,r.x,a.x),nr(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ua=class extends gn{constructor(t=new N,e=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new N){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(nr(t,s.x,r.x,a.x),nr(t,s.y,r.y,a.y),nr(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},yr=class extends gn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ht){let i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return i.set(vh(o,c.x,l.x,h.x,f.x),vh(o,c.y,l.y,h.y,f.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new ht().fromArray(s))}return this}},Dl=Object.freeze({__proto__:null,ArcCurve:Ia,CatmullRomCurve3:La,CubicBezierCurve:gr,CubicBezierCurve3:Da,EllipseCurve:Is,LineCurve:_r,LineCurve3:Na,QuadraticBezierCurve:xr,QuadraticBezierCurve3:Ua,SplineCurve:yr}),Fa=class extends gn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Dl[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let a=s[r]-i,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new Dl[s.type]().fromJSON(s))}return this}},vr=class extends Fa{constructor(t){super(),this.type="Path",this.currentPoint=new ht,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new _r(this.currentPoint.clone(),new ht(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new xr(this.currentPoint.clone(),new ht(t,e),new ht(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,a){let o=new gr(this.currentPoint.clone(),new ht(t,e),new ht(i,s),new ht(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new yr(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,i,s,r,a),this}absarc(t,e,i,s,r,a){return this.absellipse(t,e,i,i,s,r,a),this}ellipse(t,e,i,s,r,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,i,s,r,a,o,c),this}absellipse(t,e,i,s,r,a,o,c){let l=new Is(t,e,i,s,r,a,o,c);if(this.curves.length>0){let f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Nn=class extends vr{constructor(t){super(t),this.uuid=Zi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new vr().fromJSON(s))}return this}};function bf(n,t,e=2){let i=t&&t.length,s=i?t[0]*e:n.length,r=mu(n,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(i&&(r=Cf(n,t,r,e)),n.length>80*e){o=n[0],c=n[1];let h=o,f=c;for(let d=e;d<s;d+=e){let u=n[d],m=n[d+1];u<o&&(o=u),m<c&&(c=m),u>h&&(h=u),m>f&&(f=m)}l=Math.max(h-o,f-c),l=l!==0?32767/l:0}return Mr(r,a,e,o,c,l,0),a}function mu(n,t,e,i,s){let r;if(s===zf(n,t,e,i)>0)for(let a=t;a<e;a+=i)r=Mh(a/i|0,n[a],n[a+1],r);else for(let a=e-i;a>=t;a-=i)r=Mh(a/i|0,n[a],n[a+1],r);return r&&Ls(r,r.next)&&(br(r),r=r.next),r}function Wi(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Ls(e,e.next)||Ee(e.prev,e,e.next)===0)){if(br(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Mr(n,t,e,i,s,r,a){if(!n)return;!a&&r&&Df(n,i,s,r);let o=n;for(;n.prev!==n.next;){let c=n.prev,l=n.next;if(r?Tf(n,i,s,r):wf(n)){t.push(c.i,n.i,l.i),br(n),n=l.next,o=l.next;continue}if(n=l,n===o){a?a===1?(n=Ef(Wi(n),t),Mr(n,t,e,i,s,r,2)):a===2&&Af(n,t,e,i,s,r):Mr(Wi(n),t,e,i,s,r,1);break}}}function wf(n){let t=n.prev,e=n,i=n.next;if(Ee(t,e,i)>=0)return!1;let s=t.x,r=e.x,a=i.x,o=t.y,c=e.y,l=i.y,h=Math.min(s,r,a),f=Math.min(o,c,l),d=Math.max(s,r,a),u=Math.max(o,c,l),m=i.next;for(;m!==t;){if(m.x>=h&&m.x<=d&&m.y>=f&&m.y<=u&&Qs(s,o,r,c,a,l,m.x,m.y)&&Ee(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Tf(n,t,e,i){let s=n.prev,r=n,a=n.next;if(Ee(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,h=s.y,f=r.y,d=a.y,u=Math.min(o,c,l),m=Math.min(h,f,d),y=Math.max(o,c,l),g=Math.max(h,f,d),p=Nl(u,m,t,e,i),S=Nl(y,g,t,e,i),A=n.prevZ,v=n.nextZ;for(;A&&A.z>=p&&v&&v.z<=S;){if(A.x>=u&&A.x<=y&&A.y>=m&&A.y<=g&&A!==s&&A!==a&&Qs(o,h,c,f,l,d,A.x,A.y)&&Ee(A.prev,A,A.next)>=0||(A=A.prevZ,v.x>=u&&v.x<=y&&v.y>=m&&v.y<=g&&v!==s&&v!==a&&Qs(o,h,c,f,l,d,v.x,v.y)&&Ee(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;A&&A.z>=p;){if(A.x>=u&&A.x<=y&&A.y>=m&&A.y<=g&&A!==s&&A!==a&&Qs(o,h,c,f,l,d,A.x,A.y)&&Ee(A.prev,A,A.next)>=0)return!1;A=A.prevZ}for(;v&&v.z<=S;){if(v.x>=u&&v.x<=y&&v.y>=m&&v.y<=g&&v!==s&&v!==a&&Qs(o,h,c,f,l,d,v.x,v.y)&&Ee(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Ef(n,t){let e=n;do{let i=e.prev,s=e.next.next;!Ls(i,s)&&_u(i,e,e.next,s)&&Sr(i,s)&&Sr(s,i)&&(t.push(i.i,e.i,s.i),br(e),br(e.next),e=n=s),e=e.next}while(e!==n);return Wi(e)}function Af(n,t,e,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Ff(a,o)){let c=xu(a,o);a=Wi(a,a.next),c=Wi(c,c.next),Mr(a,t,e,i,s,r,0),Mr(c,t,e,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function Cf(n,t,e,i){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*i,c=r<a-1?t[r+1]*i:n.length,l=mu(n,o,c,i,!1);l===l.next&&(l.steiner=!0),s.push(Uf(l))}s.sort(Rf);for(let r=0;r<s.length;r++)e=Pf(s[r],e);return e}function Rf(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function Pf(n,t){let e=If(n,t);if(!e)return t;let i=xu(e,n);return Wi(i,i.next),Wi(e,e.next)}function If(n,t){let e=t,i=n.x,s=n.y,r=-1/0,a;if(Ls(n,e))return e;do{if(Ls(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let f=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=i&&f>r&&(r=f,a=e.x<e.next.x?e:e.next,f===i))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,c=a.x,l=a.y,h=1/0;e=a;do{if(i>=e.x&&e.x>=c&&i!==e.x&&gu(s<l?i:r,s,c,l,s<l?r:i,s,e.x,e.y)){let f=Math.abs(s-e.y)/(i-e.x);Sr(e,n)&&(f<h||f===h&&(e.x>a.x||e.x===a.x&&Lf(a,e)))&&(a=e,h=f)}e=e.next}while(e!==o);return a}function Lf(n,t){return Ee(n.prev,n,t.prev)<0&&Ee(t.next,n,n.next)<0}function Df(n,t,e,i){let s=n;do s.z===0&&(s.z=Nl(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Nf(s)}function Nf(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let a=i,o=0;for(let l=0;l<e&&(o++,a=a.nextZ,!!a);l++);let c=e;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||i.z<=a.z)?(s=i,i=i.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=a}r.nextZ=null,e*=2}while(t>1);return n}function Nl(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function Uf(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function gu(n,t,e,i,s,r,a,o){return(s-a)*(t-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(i-o)}function Qs(n,t,e,i,s,r,a,o){return!(n===a&&t===o)&&gu(n,t,e,i,s,r,a,o)}function Ff(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Of(n,t)&&(Sr(n,t)&&Sr(t,n)&&Bf(n,t)&&(Ee(n.prev,n,t.prev)||Ee(n,t.prev,t))||Ls(n,t)&&Ee(n.prev,n,n.next)>0&&Ee(t.prev,t,t.next)>0)}function Ee(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Ls(n,t){return n.x===t.x&&n.y===t.y}function _u(n,t,e,i){let s=ua(Ee(n,t,e)),r=ua(Ee(n,t,i)),a=ua(Ee(e,i,n)),o=ua(Ee(e,i,t));return!!(s!==r&&a!==o||s===0&&ha(n,e,t)||r===0&&ha(n,i,t)||a===0&&ha(e,n,i)||o===0&&ha(e,t,i))}function ha(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function ua(n){return n>0?1:n<0?-1:0}function Of(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&_u(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Sr(n,t){return Ee(n.prev,n,n.next)<0?Ee(n,t,n.next)>=0&&Ee(n,n.prev,t)>=0:Ee(n,t,n.prev)<0||Ee(n,n.next,t)<0}function Bf(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function xu(n,t){let e=Ul(n.i,n.x,n.y),i=Ul(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Mh(n,t,e,i){let s=Ul(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function br(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Ul(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function zf(n,t,e,i){let s=0;for(let r=t,a=e-i;r<e;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}var Fl=class{static triangulate(t,e,i=2){return bf(t,e,i)}},Hn=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];Sh(t),bh(i,t);let a=t.length;e.forEach(Sh);for(let c=0;c<e.length;c++)s.push(a),a+=e[c].length,bh(i,e[c]);let o=Fl.triangulate(i,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function Sh(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function bh(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var ii=class n extends Ue{constructor(t=new Nn([new ht(.5,.5),new ht(-.5,.5),new ht(-.5,-.5),new ht(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let o=0,c=t.length;o<c;o++){let l=t[o];a(l)}this.setAttribute("position",new de(s,3)),this.setAttribute("uv",new de(r,2)),this.computeVertexNormals();function a(o){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,u=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:u-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:kf,A,v=!1,b,w,C,x;if(p){A=p.getSpacedPoints(h),v=!0,d=!1;let R=p.isCatmullRomCurve3?p.closed:!1;b=p.computeFrenetFrames(h,R),w=new N,C=new N,x=new N}d||(g=0,u=0,m=0,y=0);let T=o.extractPoints(l),P=T.shape,D=T.holes;if(!Hn.isClockWise(P)){P=P.reverse();for(let R=0,V=D.length;R<V;R++){let K=D[R];Hn.isClockWise(K)&&(D[R]=K.reverse())}}function W(R){let K=10000000000000001e-36,st=R[0];for(let lt=1;lt<=R.length;lt++){let vt=lt%R.length,mt=R[vt],Pt=mt.x-st.x,kt=mt.y-st.y,I=Pt*Pt+kt*kt,ee=Math.max(Math.abs(mt.x),Math.abs(mt.y),Math.abs(st.x),Math.abs(st.y)),$t=K*ee*ee;if(I<=$t){R.splice(vt,1),lt--;continue}st=mt}}W(P),D.forEach(W);let L=D.length,H=P;for(let R=0;R<L;R++){let V=D[R];P=P.concat(V)}function tt(R,V,K){return V||Yt("ExtrudeGeometry: vec does not exist"),R.clone().addScaledVector(V,K)}let j=P.length;function it(R,V,K){let st,lt,vt,mt=R.x-V.x,Pt=R.y-V.y,kt=K.x-R.x,I=K.y-R.y,ee=mt*mt+Pt*Pt,$t=mt*I-Pt*kt;if(Math.abs($t)>Number.EPSILON){let E=Math.sqrt(ee),_=Math.sqrt(kt*kt+I*I),B=V.x-Pt/E,X=V.y+mt/E,$=K.x-I/_,ft=K.y+kt/_,ut=(($-B)*I-(ft-X)*kt)/(mt*I-Pt*kt);st=B+mt*ut-R.x,lt=X+Pt*ut-R.y;let Q=st*st+lt*lt;if(Q<=2)return new ht(st,lt);vt=Math.sqrt(Q/2)}else{let E=!1;mt>Number.EPSILON?kt>Number.EPSILON&&(E=!0):mt<-Number.EPSILON?kt<-Number.EPSILON&&(E=!0):Math.sign(Pt)===Math.sign(I)&&(E=!0),E?(st=-Pt,lt=mt,vt=Math.sqrt(ee)):(st=mt,lt=Pt,vt=Math.sqrt(ee/2))}return new ht(st/vt,lt/vt)}let J=[];for(let R=0,V=H.length,K=V-1,st=R+1;R<V;R++,K++,st++)K===V&&(K=0),st===V&&(st=0),J[R]=it(H[R],H[K],H[st]);let rt=[],at,St=J.concat();for(let R=0,V=L;R<V;R++){let K=D[R];at=[];for(let st=0,lt=K.length,vt=lt-1,mt=st+1;st<lt;st++,vt++,mt++)vt===lt&&(vt=0),mt===lt&&(mt=0),at[st]=it(K[st],K[vt],K[mt]);rt.push(at),St=St.concat(at)}let Ct;if(g===0)Ct=Hn.triangulateShape(H,D);else{let R=[],V=[];for(let K=0;K<g;K++){let st=K/g,lt=u*Math.cos(st*Math.PI/2),vt=m*Math.sin(st*Math.PI/2)+y;for(let mt=0,Pt=H.length;mt<Pt;mt++){let kt=tt(H[mt],J[mt],vt);pt(kt.x,kt.y,-lt),st===0&&R.push(kt)}for(let mt=0,Pt=L;mt<Pt;mt++){let kt=D[mt];at=rt[mt];let I=[];for(let ee=0,$t=kt.length;ee<$t;ee++){let E=tt(kt[ee],at[ee],vt);pt(E.x,E.y,-lt),st===0&&I.push(E)}st===0&&V.push(I)}}Ct=Hn.triangulateShape(R,V)}let Wt=Ct.length,qt=m+y;for(let R=0;R<j;R++){let V=d?tt(P[R],St[R],qt):P[R];v?(C.copy(b.normals[0]).multiplyScalar(V.x),w.copy(b.binormals[0]).multiplyScalar(V.y),x.copy(A[0]).add(C).add(w),pt(x.x,x.y,x.z)):pt(V.x,V.y,0)}for(let R=1;R<=h;R++)for(let V=0;V<j;V++){let K=d?tt(P[V],St[V],qt):P[V];v?(C.copy(b.normals[R]).multiplyScalar(K.x),w.copy(b.binormals[R]).multiplyScalar(K.y),x.copy(A[R]).add(C).add(w),pt(x.x,x.y,x.z)):pt(K.x,K.y,f/h*R)}for(let R=g-1;R>=0;R--){let V=R/g,K=u*Math.cos(V*Math.PI/2),st=m*Math.sin(V*Math.PI/2)+y;for(let lt=0,vt=H.length;lt<vt;lt++){let mt=tt(H[lt],J[lt],st);pt(mt.x,mt.y,f+K)}for(let lt=0,vt=D.length;lt<vt;lt++){let mt=D[lt];at=rt[lt];for(let Pt=0,kt=mt.length;Pt<kt;Pt++){let I=tt(mt[Pt],at[Pt],st);v?pt(I.x,I.y+A[h-1].y,A[h-1].x+K):pt(I.x,I.y,f+K)}}}te(),et();function te(){let R=s.length/3;if(d){let V=0,K=j*V;for(let st=0;st<Wt;st++){let lt=Ct[st];Gt(lt[2]+K,lt[1]+K,lt[0]+K)}V=h+g*2,K=j*V;for(let st=0;st<Wt;st++){let lt=Ct[st];Gt(lt[0]+K,lt[1]+K,lt[2]+K)}}else{for(let V=0;V<Wt;V++){let K=Ct[V];Gt(K[2],K[1],K[0])}for(let V=0;V<Wt;V++){let K=Ct[V];Gt(K[0]+j*h,K[1]+j*h,K[2]+j*h)}}i.addGroup(R,s.length/3-R,0)}function et(){let R=s.length/3,V=0;nt(H,V),V+=H.length;for(let K=0,st=D.length;K<st;K++){let lt=D[K];nt(lt,V),V+=lt.length}i.addGroup(R,s.length/3-R,1)}function nt(R,V){let K=R.length;for(;--K>=0;){let st=K,lt=K-1;lt<0&&(lt=R.length-1);for(let vt=0,mt=h+g*2;vt<mt;vt++){let Pt=j*vt,kt=j*(vt+1),I=V+st+Pt,ee=V+lt+Pt,$t=V+lt+kt,E=V+st+kt;bt(I,ee,$t,E)}}}function pt(R,V,K){c.push(R),c.push(V),c.push(K)}function Gt(R,V,K){Ut(R),Ut(V),Ut(K);let st=s.length/3,lt=S.generateTopUV(i,s,st-3,st-2,st-1);Kt(lt[0]),Kt(lt[1]),Kt(lt[2])}function bt(R,V,K,st){Ut(R),Ut(V),Ut(st),Ut(V),Ut(K),Ut(st);let lt=s.length/3,vt=S.generateSideWallUV(i,s,lt-6,lt-3,lt-2,lt-1);Kt(vt[0]),Kt(vt[1]),Kt(vt[3]),Kt(vt[1]),Kt(vt[2]),Kt(vt[3])}function Ut(R){s.push(c[R*3+0]),s.push(c[R*3+1]),s.push(c[R*3+2])}function Kt(R){r.push(R.x),r.push(R.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return Vf(e,i,t)}static fromJSON(t,e){let i=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];i.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Dl[s.type]().fromJSON(s)),new n(i,t.options)}},kf={generateTopUV:function(n,t,e,i,s){let r=t[e*3],a=t[e*3+1],o=t[i*3],c=t[i*3+1],l=t[s*3],h=t[s*3+1];return[new ht(r,a),new ht(o,c),new ht(l,h)]},generateSideWallUV:function(n,t,e,i,s,r){let a=t[e*3],o=t[e*3+1],c=t[e*3+2],l=t[i*3],h=t[i*3+1],f=t[i*3+2],d=t[s*3],u=t[s*3+1],m=t[s*3+2],y=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new ht(a,1-c),new ht(l,1-f),new ht(d,1-m),new ht(y,1-p)]:[new ht(o,1-c),new ht(h,1-f),new ht(u,1-m),new ht(g,1-p)]}};function Vf(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var wr=class n extends Ue{constructor(t=[new ht(0,-.5),new ht(.5,0),new ht(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=ne(s,0,Math.PI*2);let r=[],a=[],o=[],c=[],l=[],h=1/e,f=new N,d=new ht,u=new N,m=new N,y=new N,g=0,p=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:g=t[S+1].x-t[S].x,p=t[S+1].y-t[S].y,u.x=p*1,u.y=-g,u.z=p*0,y.copy(u),u.normalize(),c.push(u.x,u.y,u.z);break;case t.length-1:c.push(y.x,y.y,y.z);break;default:g=t[S+1].x-t[S].x,p=t[S+1].y-t[S].y,u.x=p*1,u.y=-g,u.z=p*0,m.copy(u),u.x+=y.x,u.y+=y.y,u.z+=y.z,u.normalize(),c.push(u.x,u.y,u.z),y.copy(m)}for(let S=0;S<=e;S++){let A=i+S*h*s,v=Math.sin(A),b=Math.cos(A);for(let w=0;w<=t.length-1;w++){f.x=t[w].x*v,f.y=t[w].y,f.z=t[w].x*b,a.push(f.x,f.y,f.z),d.x=S/e,d.y=w/(t.length-1),o.push(d.x,d.y);let C=c[3*w+0]*v,x=c[3*w+1],T=c[3*w+0]*b;l.push(C,x,T)}}for(let S=0;S<e;S++)for(let A=0;A<t.length-1;A++){let v=A+S*t.length,b=v,w=v+t.length,C=v+t.length+1,x=v+1;r.push(b,w,x),r.push(C,x,w)}this.setIndex(r),this.setAttribute("position",new de(a,3)),this.setAttribute("uv",new de(o,2)),this.setAttribute("normal",new de(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.points,t.segments,t.phiStart,t.phiLength)}};var si=class n extends Ue{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),c=Math.floor(s),l=o+1,h=c+1,f=t/o,d=e/c,u=[],m=[],y=[],g=[];for(let p=0;p<h;p++){let S=p*d-a;for(let A=0;A<l;A++){let v=A*f-r;m.push(v,-S,0),y.push(0,0,1),g.push(A/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<o;S++){let A=S+l*p,v=S+l*(p+1),b=S+1+l*(p+1),w=S+1+l*p;u.push(A,v,w),u.push(v,b,w)}this.setIndex(u),this.setAttribute("position",new de(m,3)),this.setAttribute("normal",new de(y,3)),this.setAttribute("uv",new de(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}};var Ds=class n extends Ue{constructor(t=new Nn([new ht(0,.5),new ht(-.5,-.5),new ht(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let i=[],s=[],r=[],a=[],o=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(o,c,h),o+=c,c=0;this.setIndex(i),this.setAttribute("position",new de(s,3)),this.setAttribute("normal",new de(r,3)),this.setAttribute("uv",new de(a,2));function l(h){let f=s.length/3,d=h.extractPoints(e),u=d.shape,m=d.holes;Hn.isClockWise(u)===!1&&(u=u.reverse());for(let g=0,p=m.length;g<p;g++){let S=m[g];Hn.isClockWise(S)===!0&&(m[g]=S.reverse())}let y=Hn.triangulateShape(u,m);for(let g=0,p=m.length;g<p;g++){let S=m[g];u=u.concat(S)}for(let g=0,p=u.length;g<p;g++){let S=u[g];s.push(S.x,S.y,0),r.push(0,0,1),a.push(S.x,S.y)}for(let g=0,p=y.length;g<p;g++){let S=y[g],A=S[0]+f,v=S[1]+f,b=S[2]+f;i.push(A,v,b),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return Gf(e,t)}static fromJSON(t,e){let i=[];for(let s=0,r=t.shapes.length;s<r;s++){let a=e[t.shapes[s]];i.push(a)}return new n(i,t.curveSegments)}};function Gf(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){let s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}var Ns=class n extends Ue{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let c=Math.min(a+o,Math.PI),l=0,h=[],f=new N,d=new N,u=[],m=[],y=[],g=[];for(let p=0;p<=i;p++){let S=[],A=p/i,v=a+A*o,b=t*Math.cos(v),w=Math.sqrt(t*t-b*b),C=0;p===0&&a===0?C=.5/e:p===i&&c===Math.PI&&(C=-.5/e);for(let x=0;x<=e;x++){let T=x/e,P=s+T*r;f.x=-w*Math.cos(P),f.y=b,f.z=w*Math.sin(P),m.push(f.x,f.y,f.z),d.copy(f).normalize(),y.push(d.x,d.y,d.z),g.push(T+C,1-A),S.push(l++)}h.push(S)}for(let p=0;p<i;p++)for(let S=0;S<e;S++){let A=h[p][S+1],v=h[p][S],b=h[p+1][S],w=h[p+1][S+1];(p!==0||a>0)&&u.push(A,v,w),(p!==i-1||c<Math.PI)&&u.push(v,b,w)}this.setIndex(u),this.setAttribute("position",new de(m,3)),this.setAttribute("normal",new de(y,3)),this.setAttribute("uv",new de(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Tr=class n extends Ue{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);let c=[],l=[],h=[],f=[],d=new N,u=new N,m=new N;for(let y=0;y<=i;y++){let g=a+y/i*o;for(let p=0;p<=s;p++){let S=p/s*r;u.x=(t+e*Math.cos(g))*Math.cos(S),u.y=(t+e*Math.cos(g))*Math.sin(S),u.z=e*Math.sin(g),l.push(u.x,u.y,u.z),d.x=t*Math.cos(S),d.y=t*Math.sin(S),m.subVectors(u,d).normalize(),h.push(m.x,m.y,m.z),f.push(p/s),f.push(y/i)}}for(let y=1;y<=i;y++)for(let g=1;g<=s;g++){let p=(s+1)*y+g-1,S=(s+1)*(y-1)+g-1,A=(s+1)*(y-1)+g,v=(s+1)*y+g;c.push(p,S,v),c.push(S,A,v)}this.setIndex(c),this.setAttribute("position",new de(l,3)),this.setAttribute("normal",new de(h,3)),this.setAttribute("uv",new de(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Ji(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];if(wh(s))s.isRenderTargetTexture?(Xt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(wh(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function Ke(n){let t={};for(let e=0;e<n.length;e++){let i=Ji(n[e]);for(let s in i)t[s]=i[s]}return t}function wh(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Hf(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function fc(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}var yu={clone:Ji,merge:Ke},Wf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,_n=class extends vi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wf,this.fragmentShader=Xf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ji(t.uniforms),this.uniformsGroups=Hf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new Qt().setHex(s.value);break;case"v2":this.uniforms[i].value=new ht().fromArray(s.value);break;case"v3":this.uniforms[i].value=new N().fromArray(s.value);break;case"v4":this.uniforms[i].value=new we().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Zt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new be().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Oa=class extends _n{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},le=class extends vi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zo,this.normalScale=new ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Ba=class extends vi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=tu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},za=class extends vi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function _s(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Al(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Si=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break n}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ka=class extends Si{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pl,endingEnd:Pl}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Il:r=t,o=2*e-i;break;case Ll:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Il:a=t,c=2*i-e;break;case Ll:a=1,c=i+s[1]-s[0];break;default:a=t-1,c=e}let l=(i-e)*.5,h=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,u=this._weightNext,m=(i-e)/(s-e),y=m*m,g=y*m,p=-d*g+2*d*y-d*m,S=(1+d)*g+(-1.5-2*d)*y+(-.5+d)*m+1,A=(-1-u)*g+(1.5+u)*y+.5*m,v=u*g-u*y;for(let b=0;b!==o;++b)r[b]=p*a[h+b]+S*a[l+b]+A*a[c+b]+v*a[f+b];return r}},Va=class extends Si{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=(i-e)/(s-e),f=1-h;for(let d=0;d!==o;++d)r[d]=a[l+d]*f+a[c+d]*h;return r}},Ga=class extends Si{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Ha=class extends Si{interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let m=(i-e)/(s-e),y=1-m;for(let g=0;g!==o;++g)r[g]=a[l+g]*y+a[c+g]*m;return r}let d=o*2,u=t-1;for(let m=0;m!==o;++m){let y=a[l+m],g=a[c+m],p=u*d+m*2,S=f[p],A=f[p+1],v=t*d+m*2,b=h[v],w=h[v+1],C=Yf(i,e,S,b,s);r[m]=vu(C,y,A,w,g)}return r}};function vu(n,t,e,i,s){let r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function qf(n,t,e,i,s){let r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function Yf(n,t,e,i,s){let r=(n-t)/(s-t);for(let a=0;a<8;a++){let o=vu(r,t,e,i,s)-n;if(Math.abs(o)<1e-10)break;let c=qf(r,t,e,i,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var xn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=_s(e,this.TimeBufferType),this.values=_s(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:_s(t.times,Array),values:_s(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),Al(t.settings)&&(i.settings={inTangents:_s(t.settings.inTangents,Array),outTangents:_s(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Ga(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Va(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ka(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Ha(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case sr:e=this.InterpolantFactoryMethodDiscrete;break;case Ta:e=this.InterpolantFactoryMethodLinear;break;case pa:e=this.InterpolantFactoryMethodSmooth;break;case Rl:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Xt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return sr;case this.InterpolantFactoryMethodLinear:return Ta;case this.InterpolantFactoryMethodSmooth:return pa;case this.InterpolantFactoryMethodBezier:return Rl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;Al(this.settings)&&(Th(this.settings.inTangents,t),Th(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Yt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Yt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=i[o];if(typeof c=="number"&&isNaN(c)){Yt("KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){Yt("KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&Nd(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Yt("KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===pa,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],h=t[o+1];if(l!==h&&(o!==1||l!==t[0]))if(s)c=!0;else{let f=o*i,d=f-i,u=f+i;for(let m=0;m!==i;++m){let y=e[f+m];if(y!==e[d+m]||y!==e[u+m]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let f=o*i,d=a*i;for(let u=0;u!==i;++u)e[d+u]=e[f+u]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,c=a*i,l=0;l!==i;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,Al(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Th(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}xn.prototype.ValueTypeName="";xn.prototype.TimeBufferType=Float32Array;xn.prototype.ValueBufferType=Float32Array;xn.prototype.DefaultInterpolation=Ta;var bi=class extends xn{constructor(t,e,i){super(t,e,i)}};bi.prototype.ValueTypeName="bool";bi.prototype.ValueBufferType=Array;bi.prototype.DefaultInterpolation=sr;bi.prototype.InterpolantFactoryMethodLinear=void 0;bi.prototype.InterpolantFactoryMethodSmooth=void 0;var Wa=class extends xn{constructor(t,e,i,s){super(t,e,i,s)}};Wa.prototype.ValueTypeName="color";var Xa=class extends xn{constructor(t,e,i,s){super(t,e,i,s)}};Xa.prototype.ValueTypeName="number";var qa=class extends Si{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(i-e)/(s-e),l=t*o;for(let h=l+o;l!==h;l+=4)mn.slerpFlat(r,0,a,l-o,a,l,c);return r}},Er=class extends xn{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new qa(this.times,this.values,this.getValueSize(),t)}};Er.prototype.ValueTypeName="quaternion";Er.prototype.InterpolantFactoryMethodSmooth=void 0;var wi=class extends xn{constructor(t,e,i){super(t,e,i)}};wi.prototype.ValueTypeName="string";wi.prototype.ValueBufferType=Array;wi.prototype.DefaultInterpolation=sr;wi.prototype.InterpolantFactoryMethodLinear=void 0;wi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ya=class extends xn{constructor(t,e,i,s){super(t,e,i,s)}};Ya.prototype.ValueTypeName="vector";var $a=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return l.push(h,f),this},this.removeHandler=function(h){let f=l.indexOf(h);return f!==-1&&l.splice(f,2),this},this.getHandler=function(h){for(let f=0,d=l.length;f<d;f+=2){let u=l[f],m=l[f+1];if(u.global&&(u.lastIndex=0),u.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Mu=new $a,Za=class{constructor(t){this.manager=t!==void 0?t:Mu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Za.DEFAULT_MATERIAL_NAME="__DEFAULT";var Xi=class extends Ze{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Qt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Ar=class extends Xi{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Cl=new be,Eh=new N,Ah=new N,Cr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ht(512,512),this.mapType=ln,this.map=null,this.mapPass=null,this.matrix=new be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ps,this._frameExtents=new ht(1,1),this._viewportCount=1,this._viewports=[new we(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Eh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Eh),Ah.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ah),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){Cl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(Cl,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===bs||t.reversedDepth?e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),e.multiply(Cl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},da=new N,fa=new mn,Vn=new N,Rr=class extends Ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new be,this.projectionMatrix=new be,this.projectionMatrixInverse=new be,this.coordinateSystem=Ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(da,fa,Vn),Vn.x===1&&Vn.y===1&&Vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(da,fa,Vn.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(da,fa,Vn),Vn.x===1&&Vn.y===1&&Vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(da,fa,Vn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},_i=new N,Ch=new ht,Rh=new ht,Ge=class extends Rr{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ts*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(tr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ts*2*Math.atan(Math.tan(tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){_i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(_i.x,_i.y).multiplyScalar(-t/_i.z),_i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(_i.x,_i.y).multiplyScalar(-t/_i.z)}getViewSize(t,e){return this.getViewBounds(t,Ch,Rh),e.subVectors(Rh,Ch)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(tr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Ol=class extends Cr{constructor(){super(new Ge(90,1,.5,500)),this.isPointLightShadow=!0}},Pr=class extends Xi{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Ol}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},Us=class extends Rr{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Bl=class extends Cr{constructor(){super(new Us(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ir=class extends Xi{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.target=new Ze,this.shadow=new Bl}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},Lr=class extends Xi{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var xs=-90,ys=1,Ja=class extends Ze{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ge(xs,ys,t,e);s.layers=this.layers,this.add(s);let r=new Ge(xs,ys,t,e);r.layers=this.layers,this.add(r);let a=new Ge(xs,ys,t,e);a.layers=this.layers,this.add(a);let o=new Ge(xs,ys,t,e);o.layers=this.layers,this.add(o);let c=new Ge(xs,ys,t,e);c.layers=this.layers,this.add(c);let l=new Ge(xs,ys,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===Ln)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===bs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),u=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=y,t.setRenderTarget(i,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,d,u),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},Ka=class extends Ge{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var pc="\\[\\]\\.:\\/",$f=new RegExp("["+pc+"]","g"),mc="[^"+pc+"]",Zf="[^"+pc.replace("\\.","")+"]",Jf=/((?:WC+[\/:])*)/.source.replace("WC",mc),Kf=/(WCOD+)?/.source.replace("WCOD",Zf),jf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",mc),Qf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",mc),tp=new RegExp("^"+Jf+Kf+jf+Qf+"$"),ep=["material","materials","bones","map"],zl=class{constructor(t,e,i){let s=i||Se.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Se=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace($f,"")}static parseTrackName(t){let e=tp.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);ep.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=i(o.children);if(c)return c}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Xt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=e.objectIndex;switch(i){case"materials":if(!t.material){Yt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Yt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Yt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Yt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Yt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Yt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(l!==void 0){if(t[l]===void 0){Yt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[s];if(a===void 0){let l=e.nodeName;Yt("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Yt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Yt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Se.Composite=zl;Se.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Se.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Se.prototype.GetterByBindingType=[Se.prototype._getValue_direct,Se.prototype._getValue_array,Se.prototype._getValue_arrayElement,Se.prototype._getValue_toArray];Se.prototype.SetterByBindingTypeAndVersioning=[[Se.prototype._setValue_direct,Se.prototype._setValue_direct_setNeedsUpdate,Se.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_array,Se.prototype._setValue_array_setNeedsUpdate,Se.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_arrayElement,Se.prototype._setValue_arrayElement_setNeedsUpdate,Se.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_fromArray,Se.prototype._setValue_fromArray_setNeedsUpdate,Se.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Dx=new Float32Array(1);var Fs=class{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ne(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(ne(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Mc=class Mc{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};Mc.prototype.isMatrix2=!0;var kl=Mc;var Dr=class extends Dn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function gc(n,t,e,i){let s=np(i);switch(e){case ac:return n*t;case lc:return n*t/s.components*s.byteLength;case ro:return n*t/s.components*s.byteLength;case Ii:return n*t*2/s.components*s.byteLength;case ao:return n*t*2/s.components*s.byteLength;case oc:return n*t*3/s.components*s.byteLength;case En:return n*t*4/s.components*s.byteLength;case oo:return n*t*4/s.components*s.byteLength;case Fr:case Or:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Br:case zr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case co:case uo:return Math.max(n,16)*Math.max(t,8)/4;case lo:case ho:return Math.max(n,8)*Math.max(t,8)/2;case fo:case po:case go:case _o:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case mo:case kr:case xo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case yo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case vo:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Mo:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case So:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case bo:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case wo:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case To:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Eo:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Ao:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Co:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ro:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Po:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Io:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Lo:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Do:case No:case Uo:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Fo:case Oo:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Vr:case Bo:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function np(n){switch(n){case ln:case nc:return{byteLength:1,components:1};case zs:case ic:case Bn:return{byteLength:2,components:1};case io:case so:return{byteLength:2,components:4};case Fn:case no:case On:return{byteLength:4,components:1};case sc:case rc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window!="undefined"&&(window.__THREE__?Xt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Hu(){let n=null,t=!1,e=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function sp(n){let t=new WeakMap;function e(o,c){let l=o.array,h=o.usage,f=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,h),o.onUploadCallback();let u;if(l instanceof Float32Array)u=n.FLOAT;else if(typeof Float16Array!="undefined"&&l instanceof Float16Array)u=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?u=n.HALF_FLOAT:u=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)u=n.SHORT;else if(l instanceof Uint32Array)u=n.UNSIGNED_INT;else if(l instanceof Int32Array)u=n.INT;else if(l instanceof Int8Array)u=n.BYTE;else if(l instanceof Uint8Array)u=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)u=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:u,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,l){let h=c.array,f=c.updateRanges;if(n.bindBuffer(l,o),f.length===0)n.bufferSubData(l,0,h);else{f.sort((u,m)=>u.start-m.start);let d=0;for(let u=1;u<f.length;u++){let m=f[d],y=f[u];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++d,f[d]=y)}f.length=d+1;for(let u=0,m=f.length;u<m;u++){let y=f[u];n.bufferSubData(l,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(n.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var rp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ap=`#ifdef USE_ALPHAHASH
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
#endif`,op=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,up=`#ifdef USE_AOMAP
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
#endif`,dp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fp=`#ifdef USE_BATCHING
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
#endif`,pp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,mp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_p=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,xp=`#ifdef USE_IRIDESCENCE
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
#endif`,yp=`#ifdef USE_BUMPMAP
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
#endif`,vp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Mp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Tp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ep=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ap=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Cp=`#define PI 3.141592653589793
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
} // validated`,Rp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Pp=`vec3 transformedNormal = objectNormal;
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
#endif`,Ip=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Np=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Up="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Op=`#ifdef USE_ENVMAP
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
#endif`,Bp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,zp=`#ifdef USE_ENVMAP
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
#endif`,kp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Vp=`#ifdef USE_ENVMAP
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
#endif`,Gp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Wp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qp=`#ifdef USE_GRADIENTMAP
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
}`,Yp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$p=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Kp=`#ifdef USE_ENVMAP
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
#endif`,jp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,t0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,e0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,n0=`PhysicalMaterial material;
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
#endif`,i0=`uniform sampler2D dfgLUT;
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
}`,s0=`
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
#endif`,r0=`#if defined( RE_IndirectDiffuse )
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
#endif`,a0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,o0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,l0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,c0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,h0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,u0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,d0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,f0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,p0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,m0=`#if defined( USE_POINTS_UV )
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
#endif`,g0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,x0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,y0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,v0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,M0=`#ifdef USE_MORPHTARGETS
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
#endif`,S0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,b0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,w0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,T0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,E0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,A0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,C0=`#ifdef USE_NORMALMAP
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
#endif`,R0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,P0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,I0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,L0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,D0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,N0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,U0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,F0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,O0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,B0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,z0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,k0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,V0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,G0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,H0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,W0=`float getShadowMask() {
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
}`,X0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,q0=`#ifdef USE_SKINNING
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
#endif`,Y0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$0=`#ifdef USE_SKINNING
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
#endif`,Z0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,J0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,K0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,j0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Q0=`#ifdef USE_TRANSMISSION
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
#endif`,tm=`#ifdef USE_TRANSMISSION
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
#endif`,em=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,rm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,am=`uniform sampler2D t2D;
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
}`,om=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,cm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,um=`#include <common>
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
}`,dm=`#if DEPTH_PACKING == 3200
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
}`,fm=`#define DISTANCE
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
}`,pm=`#define DISTANCE
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
}`,mm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_m=`uniform float scale;
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
}`,xm=`uniform vec3 diffuse;
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
}`,ym=`#include <common>
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
}`,vm=`uniform vec3 diffuse;
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
}`,Mm=`#define LAMBERT
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
}`,Sm=`#define LAMBERT
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
}`,bm=`#define MATCAP
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
}`,wm=`#define MATCAP
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
}`,Tm=`#define NORMAL
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
}`,Em=`#define NORMAL
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
}`,Am=`#define PHONG
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
}`,Cm=`#define PHONG
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
}`,Rm=`#define STANDARD
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
}`,Pm=`#define STANDARD
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
}`,Im=`#define TOON
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
}`,Lm=`#define TOON
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
}`,Dm=`uniform float size;
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
}`,Nm=`uniform vec3 diffuse;
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
}`,Um=`#include <common>
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
}`,Fm=`uniform vec3 color;
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
}`,Om=`uniform float rotation;
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
}`,Bm=`uniform vec3 diffuse;
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
}`,se={alphahash_fragment:rp,alphahash_pars_fragment:ap,alphamap_fragment:op,alphamap_pars_fragment:lp,alphatest_fragment:cp,alphatest_pars_fragment:hp,aomap_fragment:up,aomap_pars_fragment:dp,batching_pars_vertex:fp,batching_vertex:pp,begin_vertex:mp,beginnormal_vertex:gp,bsdfs:_p,iridescence_fragment:xp,bumpmap_pars_fragment:yp,clipping_planes_fragment:vp,clipping_planes_pars_fragment:Mp,clipping_planes_pars_vertex:Sp,clipping_planes_vertex:bp,color_fragment:wp,color_pars_fragment:Tp,color_pars_vertex:Ep,color_vertex:Ap,common:Cp,cube_uv_reflection_fragment:Rp,defaultnormal_vertex:Pp,displacementmap_pars_vertex:Ip,displacementmap_vertex:Lp,emissivemap_fragment:Dp,emissivemap_pars_fragment:Np,colorspace_fragment:Up,colorspace_pars_fragment:Fp,envmap_fragment:Op,envmap_common_pars_fragment:Bp,envmap_pars_fragment:zp,envmap_pars_vertex:kp,envmap_physical_pars_fragment:Kp,envmap_vertex:Vp,fog_vertex:Gp,fog_pars_vertex:Hp,fog_fragment:Wp,fog_pars_fragment:Xp,gradientmap_pars_fragment:qp,lightmap_pars_fragment:Yp,lights_lambert_fragment:$p,lights_lambert_pars_fragment:Zp,lights_pars_begin:Jp,lights_toon_fragment:jp,lights_toon_pars_fragment:Qp,lights_phong_fragment:t0,lights_phong_pars_fragment:e0,lights_physical_fragment:n0,lights_physical_pars_fragment:i0,lights_fragment_begin:s0,lights_fragment_maps:r0,lights_fragment_end:a0,lightprobes_pars_fragment:o0,logdepthbuf_fragment:l0,logdepthbuf_pars_fragment:c0,logdepthbuf_pars_vertex:h0,logdepthbuf_vertex:u0,map_fragment:d0,map_pars_fragment:f0,map_particle_fragment:p0,map_particle_pars_fragment:m0,metalnessmap_fragment:g0,metalnessmap_pars_fragment:_0,morphinstance_vertex:x0,morphcolor_vertex:y0,morphnormal_vertex:v0,morphtarget_pars_vertex:M0,morphtarget_vertex:S0,normal_fragment_begin:b0,normal_fragment_maps:w0,normal_pars_fragment:T0,normal_pars_vertex:E0,normal_vertex:A0,normalmap_pars_fragment:C0,clearcoat_normal_fragment_begin:R0,clearcoat_normal_fragment_maps:P0,clearcoat_pars_fragment:I0,iridescence_pars_fragment:L0,opaque_fragment:D0,packing:N0,premultiplied_alpha_fragment:U0,project_vertex:F0,dithering_fragment:O0,dithering_pars_fragment:B0,roughnessmap_fragment:z0,roughnessmap_pars_fragment:k0,shadowmap_pars_fragment:V0,shadowmap_pars_vertex:G0,shadowmap_vertex:H0,shadowmask_pars_fragment:W0,skinbase_vertex:X0,skinning_pars_vertex:q0,skinning_vertex:Y0,skinnormal_vertex:$0,specularmap_fragment:Z0,specularmap_pars_fragment:J0,tonemapping_fragment:K0,tonemapping_pars_fragment:j0,transmission_fragment:Q0,transmission_pars_fragment:tm,uv_pars_fragment:em,uv_pars_vertex:nm,uv_vertex:im,worldpos_vertex:sm,background_vert:rm,background_frag:am,backgroundCube_vert:om,backgroundCube_frag:lm,cube_vert:cm,cube_frag:hm,depth_vert:um,depth_frag:dm,distance_vert:fm,distance_frag:pm,equirect_vert:mm,equirect_frag:gm,linedashed_vert:_m,linedashed_frag:xm,meshbasic_vert:ym,meshbasic_frag:vm,meshlambert_vert:Mm,meshlambert_frag:Sm,meshmatcap_vert:bm,meshmatcap_frag:wm,meshnormal_vert:Tm,meshnormal_frag:Em,meshphong_vert:Am,meshphong_frag:Cm,meshphysical_vert:Rm,meshphysical_frag:Pm,meshtoon_vert:Im,meshtoon_frag:Lm,points_vert:Dm,points_frag:Nm,shadow_vert:Um,shadow_frag:Fm,sprite_vert:Om,sprite_frag:Bm},Tt={common:{diffuse:{value:new Qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new Qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new Qt(16777215)},opacity:{value:1},center:{value:new ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},Yn={basic:{uniforms:Ke([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:Ke([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new Qt(0)},envMapIntensity:{value:1}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:Ke([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new Qt(0)},specular:{value:new Qt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:Ke([Tt.common,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.roughnessmap,Tt.metalnessmap,Tt.fog,Tt.lights,{emissive:{value:new Qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:Ke([Tt.common,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.gradientmap,Tt.fog,Tt.lights,{emissive:{value:new Qt(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:Ke([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:Ke([Tt.points,Tt.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:Ke([Tt.common,Tt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:Ke([Tt.common,Tt.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:Ke([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:Ke([Tt.sprite,Tt.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distance:{uniforms:Ke([Tt.common,Tt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distance_vert,fragmentShader:se.distance_frag},shadow:{uniforms:Ke([Tt.lights,Tt.fog,{color:{value:new Qt(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};Yn.physical={uniforms:Ke([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new Qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new Qt(0)},specularColor:{value:new Qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};var Go={r:0,b:0,g:0},zm=new be,Wu=new Zt;Wu.set(-1,0,0,0,1,0,0,0,1);function km(n,t,e,i,s,r){let a=new Qt(0),o=s===!0?0:1,c,l,h=null,f=0,d=null;function u(S){let A=S.isScene===!0?S.background:null;if(A&&A.isTexture){let v=S.backgroundBlurriness>0;A=t.get(A,v)}return A}function m(S){let A=!1,v=u(S);v===null?g(a,o):v&&v.isColor&&(g(v,1),A=!0);let b=n.xr.getEnvironmentBlendMode();b==="additive"?e.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||A)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function y(S,A){let v=u(A);v&&(v.isCubeTexture||v.mapping===Nr)?(l===void 0&&(l=new Jt(new Je(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:Ji(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(b,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=v,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(zm.makeRotationFromEuler(A.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Wu),l.material.toneMapped=oe.getTransfer(v.colorSpace)!==pe,(h!==v||f!==v.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,h=v,f=v.version,d=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Jt(new si(2,2),new _n({name:"BackgroundMaterial",uniforms:Ji(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:Ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=oe.getTransfer(v.colorSpace)!==pe,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=v,f=v.version,d=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function g(S,A){S.getRGB(Go,fc(n)),e.buffers.color.setClear(Go.r,Go.g,Go.b,A,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,A=1){a.set(S),o=A,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,g(a,o)},render:m,addToRenderList:y,dispose:p}}function Vm(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,a=!1;function o(D,F,W,L,H){let tt=!1,j=f(D,L,W,F);r!==j&&(r=j,l(r.object)),tt=u(D,L,W,H),tt&&m(D,L,W,H),H!==null&&t.update(H,n.ELEMENT_ARRAY_BUFFER),(tt||a)&&(a=!1,v(D,F,W,L),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function c(){return n.createVertexArray()}function l(D){return n.bindVertexArray(D)}function h(D){return n.deleteVertexArray(D)}function f(D,F,W,L){let H=L.wireframe===!0,tt=i[F.id];tt===void 0&&(tt={},i[F.id]=tt);let j=D.isInstancedMesh===!0?D.id:0,it=tt[j];it===void 0&&(it={},tt[j]=it);let J=it[W.id];J===void 0&&(J={},it[W.id]=J);let rt=J[H];return rt===void 0&&(rt=d(c()),J[H]=rt),rt}function d(D){let F=[],W=[],L=[];for(let H=0;H<e;H++)F[H]=0,W[H]=0,L[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:W,attributeDivisors:L,object:D,attributes:{},index:null}}function u(D,F,W,L){let H=r.attributes,tt=F.attributes,j=0,it=W.getAttributes();for(let J in it)if(it[J].location>=0){let at=H[J],St=tt[J];if(St===void 0&&(J==="instanceMatrix"&&D.instanceMatrix&&(St=D.instanceMatrix),J==="instanceColor"&&D.instanceColor&&(St=D.instanceColor)),at===void 0||at.attribute!==St||St&&at.data!==St.data)return!0;j++}return r.attributesNum!==j||r.index!==L}function m(D,F,W,L){let H={},tt=F.attributes,j=0,it=W.getAttributes();for(let J in it)if(it[J].location>=0){let at=tt[J];at===void 0&&(J==="instanceMatrix"&&D.instanceMatrix&&(at=D.instanceMatrix),J==="instanceColor"&&D.instanceColor&&(at=D.instanceColor));let St={};St.attribute=at,at&&at.data&&(St.data=at.data),H[J]=St,j++}r.attributes=H,r.attributesNum=j,r.index=L}function y(){let D=r.newAttributes;for(let F=0,W=D.length;F<W;F++)D[F]=0}function g(D){p(D,0)}function p(D,F){let W=r.newAttributes,L=r.enabledAttributes,H=r.attributeDivisors;W[D]=1,L[D]===0&&(n.enableVertexAttribArray(D),L[D]=1),H[D]!==F&&(n.vertexAttribDivisor(D,F),H[D]=F)}function S(){let D=r.newAttributes,F=r.enabledAttributes;for(let W=0,L=F.length;W<L;W++)F[W]!==D[W]&&(n.disableVertexAttribArray(W),F[W]=0)}function A(D,F,W,L,H,tt,j){j===!0?n.vertexAttribIPointer(D,F,W,H,tt):n.vertexAttribPointer(D,F,W,L,H,tt)}function v(D,F,W,L){y();let H=L.attributes,tt=W.getAttributes(),j=F.defaultAttributeValues;for(let it in tt){let J=tt[it];if(J.location>=0){let rt=H[it];if(rt===void 0&&(it==="instanceMatrix"&&D.instanceMatrix&&(rt=D.instanceMatrix),it==="instanceColor"&&D.instanceColor&&(rt=D.instanceColor)),rt!==void 0){let at=rt.normalized,St=rt.itemSize,Ct=t.get(rt);if(Ct===void 0)continue;let Wt=Ct.buffer,qt=Ct.type,te=Ct.bytesPerElement,et=qt===n.INT||qt===n.UNSIGNED_INT||rt.gpuType===no;if(rt.isInterleavedBufferAttribute){let nt=rt.data,pt=nt.stride,Gt=rt.offset;if(nt.isInstancedInterleavedBuffer){for(let bt=0;bt<J.locationSize;bt++)p(J.location+bt,nt.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let bt=0;bt<J.locationSize;bt++)g(J.location+bt);n.bindBuffer(n.ARRAY_BUFFER,Wt);for(let bt=0;bt<J.locationSize;bt++)A(J.location+bt,St/J.locationSize,qt,at,pt*te,(Gt+St/J.locationSize*bt)*te,et)}else{if(rt.isInstancedBufferAttribute){for(let nt=0;nt<J.locationSize;nt++)p(J.location+nt,rt.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let nt=0;nt<J.locationSize;nt++)g(J.location+nt);n.bindBuffer(n.ARRAY_BUFFER,Wt);for(let nt=0;nt<J.locationSize;nt++)A(J.location+nt,St/J.locationSize,qt,at,St*te,St/J.locationSize*nt*te,et)}}else if(j!==void 0){let at=j[it];if(at!==void 0)switch(at.length){case 2:n.vertexAttrib2fv(J.location,at);break;case 3:n.vertexAttrib3fv(J.location,at);break;case 4:n.vertexAttrib4fv(J.location,at);break;default:n.vertexAttrib1fv(J.location,at)}}}}S()}function b(){T();for(let D in i){let F=i[D];for(let W in F){let L=F[W];for(let H in L){let tt=L[H];for(let j in tt)h(tt[j].object),delete tt[j];delete L[H]}}delete i[D]}}function w(D){if(i[D.id]===void 0)return;let F=i[D.id];for(let W in F){let L=F[W];for(let H in L){let tt=L[H];for(let j in tt)h(tt[j].object),delete tt[j];delete L[H]}}delete i[D.id]}function C(D){for(let F in i){let W=i[F];for(let L in W){let H=W[L];if(H[D.id]===void 0)continue;let tt=H[D.id];for(let j in tt)h(tt[j].object),delete tt[j];delete H[D.id]}}}function x(D){for(let F in i){let W=i[F],L=D.isInstancedMesh===!0?D.id:0,H=W[L];if(H!==void 0){for(let tt in H){let j=H[tt];for(let it in j)h(j[it].object),delete j[it];delete H[tt]}delete W[L],Object.keys(W).length===0&&delete i[F]}}}function T(){P(),a=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:P,dispose:b,releaseStatesOfGeometry:w,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:g,disableUnusedAttributes:S}}function Gm(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function a(c,l,h){h!==0&&(n.drawArraysInstanced(i,c,l,h),e.update(l,i,h))}function o(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let d=0;for(let u=0;u<h;u++)d+=l[u];e.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Hm(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==En&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let x=C===Bn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==ln&&C!==On&&!x&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(Xt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let f=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&d===!1&&Xt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),b=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:u,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:S,maxVaryings:A,maxFragmentUniforms:v,maxSamples:b,samples:w}}function Wm(n){let t=this,e=null,i=0,s=!1,r=!1,a=new pn,o=new Zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let u=f.length!==0||d||i!==0||s;return s=d,i=f.length,u},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){e=h(f,d,0)},this.setState=function(f,d,u){let m=f.clippingPlanes,y=f.clipIntersection,g=f.clipShadows,p=n.get(f);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{let S=r?0:i,A=S*4,v=p.clippingState||null;c.value=v,v=h(m,d,A,u);for(let b=0;b!==A;++b)v[b]=e[b];p.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(f,d,u,m){let y=f!==null?f.length:0,g=null;if(y!==0){if(g=c.value,m!==!0||g===null){let p=u+y*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(g===null||g.length<p)&&(g=new Float32Array(p));for(let A=0,v=u;A!==y;++A,v+=4)a.copy(f[A]).applyMatrix4(S,o),a.normal.toArray(g,v),g[v+3]=a.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,g}}var Hs=4,Xm=6,qm=20,Ym=256,Gr=new Us,Su=new Qt,Sc=null,bc=0,wc=0,Tc=!1,$m=new N,Ki=new N,Wo=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){let{size:a=256,position:o=$m}=r;Sc=this._renderer.getRenderTarget(),bc=this._renderer.getActiveCubeFace(),wc=this._renderer.getActiveMipmapLevel(),Tc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Sc,bc,wc),this._renderer.xr.enabled=Tc,t.scissorTest=!1,Gs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ci||t.mapping===$i?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Sc=this._renderer.getRenderTarget(),bc=this._renderer.getActiveCubeFace(),wc=this._renderer.getActiveMipmapLevel(),Tc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:He,minFilter:He,generateMipmaps:!1,type:Bn,format:En,colorSpace:rr,depthBuffer:!1},s=bu(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bu(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Zm(r)),this._blurMaterial=Km(r,t,e),this._ggxMaterial=Jm(r,t,e)}return s}_compileMaterial(t){let e=new Jt(new Ue,t);this._renderer.compile(e,Gr)}_sceneToCubeUV(t,e,i,s,r){let c=new Ge(90,1,e,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,u=f.toneMapping;f.getClearColor(Su),f.toneMapping=Un,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Jt(new Je,new fr({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,g=y.material,p=!1,S=t.background;S?S.isColor&&(g.color.copy(S),t.background=null,p=!0):(g.color.copy(Su),p=!0);for(let A=0;A<6;A++){let v=A%3;v===0?(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[A],r.y,r.z)):v===1?(c.up.set(0,0,l[A]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[A],r.z)):(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[A]));let b=this._cubeSize;Gs(s,v*b,A>2?b:0,b,b),f.setRenderTarget(s),p&&f.render(y,c),f.render(t,c)}f.toneMapping=u,f.autoClear=d,t.background=S}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===Ci||t.mapping===$i;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let c=this._cubeSize;Gs(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(a,Gr)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let c=a.uniforms,l=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-h*h),d=l*1.25,u=f*d,{_lodMax:m}=this,y=this._sizeLods[i],g=3*y*(i>m-Hs?i-m+Hs:0),p=4*(this._cubeSize-y);c.envMap.value=t.texture,c.roughness.value=u,c.mipInt.value=m-e,Gs(r,g,p,3*y,2*y),s.setRenderTarget(r),s.render(o,Gr),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-i,Gs(t,g,p,3*y,2*y),s.setRenderTarget(t),s.render(o,Gr)}_blur(t,e,i,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,a),this._blurPass(r,t,i,i,a)}_blurPass(t,e,i,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-i;let h=this._sizeLods[s],f=3*h*(s>this._lodMax-Hs?s-this._lodMax+Hs:0),d=4*(this._cubeSize-h);Gs(e,f,d,3*h,2*h),a.setRenderTarget(e),a.render(c,Gr)}};function Zm(n){let t=[],e=[],i=n,s=n-Hs+1+Xm;for(let r=0;r<s;r++){let a=Math.pow(2,i);t.push(a);let o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,d=6,u=3,m=new Float32Array(u*d*f),y=new Float32Array(u*d*f);for(let p=0;p<f;p++){let S=p%3*2/3-1,A=p>2?0:-1,v=[S,A,0,S+2/3,A,0,S+2/3,A+1,0,S,A,0,S+2/3,A+1,0,S,A+1,0];m.set(v,u*d*p);for(let b=0;b<d;b++){let w=h[b*2]*2-1,C=h[b*2+1]*2-1;p===0?Ki.set(1,C,w):p===1?Ki.set(-w,1,-C):p===2?Ki.set(-w,C,1):p===3?Ki.set(-1,C,-w):p===4?Ki.set(-w,-1,C):Ki.set(w,C,-1),Ki.toArray(y,(p*d+b)*u)}}let g=new Ue;g.setAttribute("position",new en(m,u)),g.setAttribute("outputDirection",new en(y,u)),e.push(new Jt(g,null)),i>Hs&&i--}return{lodMeshes:e,sizeLods:t}}function bu(n,t,e){let i=new an(n,t,e);return i.texture.mapping=Nr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Gs(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Jm(n,t,e){return new _n({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ym,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Yo(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Km(n,t,e){return new _n({name:"SphericalGaussianBlur",defines:{SAMPLES:qm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Yo(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function wu(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yo(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Tu(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Yo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Xo=class extends an{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new pr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Je(5,5,5),r=new _n({name:"CubemapFromEquirect",uniforms:Ji(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:sn,blending:Xn});r.uniforms.tEquirect.value=e;let a=new Jt(s,r),o=e.minFilter;return e.minFilter===Ri&&(e.minFilter=He),new Ja(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}};function jm(n){let t=new WeakMap,e=new WeakMap,i=null;function s(d,u=!1){return d==null?null:u?a(d):r(d)}function r(d){if(d&&d.isTexture){let u=d.mapping;if(u===Qa||u===to)if(t.has(d)){let m=t.get(d).texture;return o(m,d.mapping)}else{let m=d.image;if(m&&m.height>0){let y=new Xo(m.height);return y.fromEquirectangularTexture(n,d),t.set(d,y),d.addEventListener("dispose",l),o(y.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let u=d.mapping,m=u===Qa||u===to,y=u===Ci||u===$i;if(m||y){let g=e.get(d),p=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return i===null&&(i=new Wo(n)),g=m?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),g.texture;if(g!==void 0)return g.texture;{let S=d.image;return m&&S&&S.height>0||y&&S&&c(S)?(i===null&&(i=new Wo(n)),g=m?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function o(d,u){return u===Qa?d.mapping=Ci:u===to&&(d.mapping=$i),d}function c(d){let u=0,m=6;for(let y=0;y<m;y++)d[y]!==void 0&&u++;return u===m}function l(d){let u=d.target;u.removeEventListener("dispose",l);let m=t.get(u);m!==void 0&&(t.delete(u),m.dispose())}function h(d){let u=d.target;u.removeEventListener("dispose",h);let m=e.get(u);m!==void 0&&(e.delete(u),m.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function Qm(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&Gi("WebGLRenderer: "+i+" extension not supported."),s}}}function tg(n,t,e,i){let s={},r=new WeakMap;function a(f){let d=f.target;d.index!==null&&t.remove(d.index);for(let m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete s[d.id];let u=r.get(d);u&&(t.remove(u),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(f,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function c(f){let d=f.attributes;for(let u in d)t.update(d[u],n.ARRAY_BUFFER)}function l(f){let d=[],u=f.index,m=f.attributes.position,y=0;if(m===void 0)return;if(u!==null){let S=u.array;y=u.version;for(let A=0,v=S.length;A<v;A+=3){let b=S[A+0],w=S[A+1],C=S[A+2];d.push(b,w,w,C,C,b)}}else{let S=m.array;y=m.version;for(let A=0,v=S.length/3-1;A<v;A+=3){let b=A+0,w=A+1,C=A+2;d.push(b,w,w,C,C,b)}}let g=new(m.count>=65535?dr:ur)(d,1);g.version=y;let p=r.get(f);p&&t.remove(p),r.set(f,g)}function h(f){let d=r.get(f);if(d){let u=f.index;u!==null&&d.version<u.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:h}}function eg(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,d){n.drawElements(i,d,r,f*a),e.update(d,i,1)}function l(f,d,u){u!==0&&(n.drawElementsInstanced(i,d,r,f*a,u),e.update(d,i,u))}function h(f,d,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,u);let y=0;for(let g=0;g<u;g++)y+=d[g];e.update(y,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function ng(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:Yt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function ig(n,t,e){let i=new WeakMap,s=new we;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,d=i.get(o);if(d===void 0||d.count!==f){let T=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",T)};d!==void 0&&d.texture.dispose();let u=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],A=0;u===!0&&(A=1),m===!0&&(A=2),y===!0&&(A=3);let v=o.attributes.position.count*A,b=1;v>t.maxTextureSize&&(b=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let w=new Float32Array(v*b*4*f),C=new lr(w,v,b,f);C.type=On,C.needsUpdate=!0;let x=A*4;for(let P=0;P<f;P++){let D=g[P],F=p[P],W=S[P],L=v*b*4*P;for(let H=0;H<D.count;H++){let tt=H*x;u===!0&&(s.fromBufferAttribute(D,H),w[L+tt+0]=s.x,w[L+tt+1]=s.y,w[L+tt+2]=s.z,w[L+tt+3]=0),m===!0&&(s.fromBufferAttribute(F,H),w[L+tt+4]=s.x,w[L+tt+5]=s.y,w[L+tt+6]=s.z,w[L+tt+7]=0),y===!0&&(s.fromBufferAttribute(W,H),w[L+tt+8]=s.x,w[L+tt+9]=s.y,w[L+tt+10]=s.z,w[L+tt+11]=W.itemSize===4?s.w:1)}}d={count:f,texture:C,size:new ht(v,b)},i.set(o,d),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let u=0;for(let y=0;y<l.length;y++)u+=l[y];let m=o.morphTargetsRelative?1:1-u;c.getUniforms().setValue(n,"morphTargetBaseInfluence",m),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function sg(n,t,e,i,s){let r=new WeakMap;function a(l){let h=s.render.frame,f=l.geometry,d=t.get(l,f);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let u=l.skeleton;r.get(u)!==h&&(u.update(),r.set(u,h))}return d}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var rg={[$l]:"LINEAR_TONE_MAPPING",[Zl]:"REINHARD_TONE_MAPPING",[Jl]:"CINEON_TONE_MAPPING",[Kl]:"ACES_FILMIC_TONE_MAPPING",[Ql]:"AGX_TONE_MAPPING",[tc]:"NEUTRAL_TONE_MAPPING",[jl]:"CUSTOM_TONE_MAPPING"};function ag(n,t,e,i,s,r){let a=new an(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new Ue;l.setAttribute("position",new de([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new de([0,2,0,0,2,0],2));let h=new Oa({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Jt(l,h),d=new Us(-1,1,1,-1,0,1),u=null,m=null,y=!1,g,p=null,S=[],A=!1;this.setSize=function(v,b){a.setSize(v,b),o!==null&&o.setSize(v,b),c!==null&&c.setSize(v,b);for(let w=0;w<S.length;w++){let C=S[w];C.setSize&&C.setSize(v,b)}},this.setEffects=function(v){S=v,A=S.length>0&&S[0].isRenderPass===!0;let b=a.width,w=a.height;S.length>0&&o===null&&(o=new an(b,w,{type:Bn,depthBuffer:!1,stencilBuffer:!1}),c=new an(b,w,{type:Bn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<S.length;C++){let x=S[C];x.setSize&&x.setSize(b,w)}},this.begin=function(v,b){if(y||v.toneMapping===Un&&S.length===0)return!1;if(p=b,b!==null){let w=b.width,C=b.height;(a.width!==w||a.height!==C)&&this.setSize(w,C)}return A===!1&&v.setRenderTarget(a),g=v.toneMapping,v.toneMapping=Un,!0},this.hasRenderPass=function(){return A},this.end=function(v,b){v.toneMapping=g,y=!0;let w=a,C=o;for(let x=0;x<S.length;x++){let T=S[x];T.enabled!==!1&&(T.render(v,C,w,b),T.needsSwap!==!1&&(w=C,C=C===o?c:o))}if(u!==v.outputColorSpace||m!==v.toneMapping){u=v.outputColorSpace,m=v.toneMapping,h.defines={},oe.getTransfer(u)===pe&&(h.defines.SRGB_TRANSFER="");let x=rg[m];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=w.texture,v.setRenderTarget(p),v.render(f,d),p=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var Xu=new nn,Cc=new Mi(1,1),qu=new lr,Yu=new Ca,$u=new pr,Eu=[],Au=[],Cu=new Float32Array(16),Ru=new Float32Array(9),Pu=new Float32Array(4);function Xs(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Eu[s];if(r===void 0&&(r=new Float32Array(s),Eu[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Fe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Oe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function $o(n,t){let e=Au[t];e===void 0&&(e=new Int32Array(t),Au[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function og(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function lg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;n.uniform2fv(this.addr,t),Oe(e,t)}}function cg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Fe(e,t))return;n.uniform3fv(this.addr,t),Oe(e,t)}}function hg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;n.uniform4fv(this.addr,t),Oe(e,t)}}function ug(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Fe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,i))return;Pu.set(i),n.uniformMatrix2fv(this.addr,!1,Pu),Oe(e,i)}}function dg(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Fe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,i))return;Ru.set(i),n.uniformMatrix3fv(this.addr,!1,Ru),Oe(e,i)}}function fg(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Fe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,i))return;Cu.set(i),n.uniformMatrix4fv(this.addr,!1,Cu),Oe(e,i)}}function pg(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function mg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;n.uniform2iv(this.addr,t),Oe(e,t)}}function gg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;n.uniform3iv(this.addr,t),Oe(e,t)}}function _g(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;n.uniform4iv(this.addr,t),Oe(e,t)}}function xg(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function yg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;n.uniform2uiv(this.addr,t),Oe(e,t)}}function vg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;n.uniform3uiv(this.addr,t),Oe(e,t)}}function Mg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;n.uniform4uiv(this.addr,t),Oe(e,t)}}function Sg(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Cc.compareFunction=e.isReversedDepthBuffer()?Vo:ko,r=Cc):r=Xu,e.setTexture2D(t||r,s)}function bg(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Yu,s)}function wg(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||$u,s)}function Tg(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||qu,s)}function Eg(n){switch(n){case 5126:return og;case 35664:return lg;case 35665:return cg;case 35666:return hg;case 35674:return ug;case 35675:return dg;case 35676:return fg;case 5124:case 35670:return pg;case 35667:case 35671:return mg;case 35668:case 35672:return gg;case 35669:case 35673:return _g;case 5125:return xg;case 36294:return yg;case 36295:return vg;case 36296:return Mg;case 35678:case 36198:case 36298:case 36306:case 35682:return Sg;case 35679:case 36299:case 36307:return bg;case 35680:case 36300:case 36308:case 36293:return wg;case 36289:case 36303:case 36311:case 36292:return Tg}}function Ag(n,t){n.uniform1fv(this.addr,t)}function Cg(n,t){let e=Xs(t,this.size,2);n.uniform2fv(this.addr,e)}function Rg(n,t){let e=Xs(t,this.size,3);n.uniform3fv(this.addr,e)}function Pg(n,t){let e=Xs(t,this.size,4);n.uniform4fv(this.addr,e)}function Ig(n,t){let e=Xs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Lg(n,t){let e=Xs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Dg(n,t){let e=Xs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Ng(n,t){n.uniform1iv(this.addr,t)}function Ug(n,t){n.uniform2iv(this.addr,t)}function Fg(n,t){n.uniform3iv(this.addr,t)}function Og(n,t){n.uniform4iv(this.addr,t)}function Bg(n,t){n.uniform1uiv(this.addr,t)}function zg(n,t){n.uniform2uiv(this.addr,t)}function kg(n,t){n.uniform3uiv(this.addr,t)}function Vg(n,t){n.uniform4uiv(this.addr,t)}function Gg(n,t,e){let i=this.cache,s=t.length,r=$o(e,s);Fe(i,r)||(n.uniform1iv(this.addr,r),Oe(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Cc:a=Xu;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Hg(n,t,e){let i=this.cache,s=t.length,r=$o(e,s);Fe(i,r)||(n.uniform1iv(this.addr,r),Oe(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Yu,r[a])}function Wg(n,t,e){let i=this.cache,s=t.length,r=$o(e,s);Fe(i,r)||(n.uniform1iv(this.addr,r),Oe(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||$u,r[a])}function Xg(n,t,e){let i=this.cache,s=t.length,r=$o(e,s);Fe(i,r)||(n.uniform1iv(this.addr,r),Oe(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||qu,r[a])}function qg(n){switch(n){case 5126:return Ag;case 35664:return Cg;case 35665:return Rg;case 35666:return Pg;case 35674:return Ig;case 35675:return Lg;case 35676:return Dg;case 5124:case 35670:return Ng;case 35667:case 35671:return Ug;case 35668:case 35672:return Fg;case 35669:case 35673:return Og;case 5125:return Bg;case 36294:return zg;case 36295:return kg;case 36296:return Vg;case 35678:case 36198:case 36298:case 36306:case 35682:return Gg;case 35679:case 36299:case 36307:return Hg;case 35680:case 36300:case 36308:case 36293:return Wg;case 36289:case 36303:case 36311:case 36292:return Xg}}var Rc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Eg(e.type)}},Pc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=qg(e.type)}},Ic=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},Ec=/(\w+)(\])?(\[|\.)?/g;function Iu(n,t){n.seq.push(t),n.map[t.id]=t}function Yg(n,t,e){let i=n.name,s=i.length;for(Ec.lastIndex=0;;){let r=Ec.exec(i),a=Ec.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Iu(e,l===void 0?new Rc(o,n,t):new Pc(o,n,t));break}else{let f=e.map[o];f===void 0&&(f=new Ic(o),Iu(e,f)),e=f}}}var Ws=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);Yg(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function Lu(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var $g=37297,Zg=0;function Jg(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var Du=new Zt;function Kg(n){oe._getMatrix(Du,oe.workingColorSpace,n);let t=`mat3( ${Du.elements.map(e=>e.toFixed(4))} )`;switch(oe.getTransfer(n)){case ar:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return Xt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Nu(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Jg(n.getShaderSource(t),o)}else return r}function jg(n,t){let e=Kg(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var Qg={[$l]:"Linear",[Zl]:"Reinhard",[Jl]:"Cineon",[Kl]:"ACESFilmic",[Ql]:"AgX",[tc]:"Neutral",[jl]:"Custom"};function t_(n,t){let e=Qg[t];return e===void 0?(Xt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ho=new N;function e_(){oe.getLuminanceCoefficients(Ho);let n=Ho.x.toFixed(4),t=Ho.y.toFixed(4),e=Ho.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function n_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wr).join(`
`)}function i_(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function s_(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Wr(n){return n!==""}function Uu(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Fu(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var r_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lc(n){return n.replace(r_,o_)}var a_=new Map;function o_(n,t){let e=se[t];if(e===void 0){let i=a_.get(t);if(i!==void 0)e=se[i],Xt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Lc(e)}var l_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ou(n){return n.replace(l_,c_)}function c_(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Bu(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var h_={[qi]:"SHADOWMAP_TYPE_PCF",[Os]:"SHADOWMAP_TYPE_VSM"};function u_(n){return h_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var d_={[Ci]:"ENVMAP_TYPE_CUBE",[$i]:"ENVMAP_TYPE_CUBE",[Nr]:"ENVMAP_TYPE_CUBE_UV"};function f_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":d_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var p_={[$i]:"ENVMAP_MODE_REFRACTION"};function m_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":p_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var g_={[Yl]:"ENVMAP_BLENDING_MULTIPLY",[Kh]:"ENVMAP_BLENDING_MIX",[jh]:"ENVMAP_BLENDING_ADD"};function __(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":g_[n.combine]||"ENVMAP_BLENDING_NONE"}function x_(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function y_(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=u_(e),l=f_(e),h=m_(e),f=__(e),d=x_(e),u=n_(e),m=i_(r),y=s.createProgram(),g,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Wr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Wr).join(`
`),p.length>0&&(p+=`
`)):(g=[Bu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wr).join(`
`),p=[Bu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Un?"#define TONE_MAPPING":"",e.toneMapping!==Un?se.tonemapping_pars_fragment:"",e.toneMapping!==Un?t_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,jg("linearToOutputTexel",e.outputColorSpace),e_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Wr).join(`
`)),a=Lc(a),a=Uu(a,e),a=Fu(a,e),o=Lc(o),o=Uu(o,e),o=Fu(o,e),a=Ou(a),o=Ou(o),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===cc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===cc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let A=S+g+a,v=S+p+o,b=Lu(s,s.VERTEX_SHADER,A),w=Lu(s,s.FRAGMENT_SHADER,v);s.attachShader(y,b),s.attachShader(y,w),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function C(D){if(n.debug.checkShaderErrors){let F=s.getProgramInfoLog(y)||"",W=s.getShaderInfoLog(b)||"",L=s.getShaderInfoLog(w)||"",H=F.trim(),tt=W.trim(),j=L.trim(),it=!0,J=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(it=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,y,b,w);else{let rt=Nu(s,b,"vertex"),at=Nu(s,w,"fragment");Yt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+H+`
`+rt+`
`+at)}else H!==""?Xt("WebGLProgram: Program Info Log:",H):(tt===""||j==="")&&(J=!1);J&&(D.diagnostics={runnable:it,programLog:H,vertexShader:{log:tt,prefix:g},fragmentShader:{log:j,prefix:p}})}s.deleteShader(b),s.deleteShader(w),x=new Ws(s,y),T=s_(s,y)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(y,$g)),P},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Zg++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=b,this.fragmentShader=w,this}var v_=0,Dc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Nc(t),e.set(t,i)),i}},Nc=class{constructor(t){this.id=v_++,this.code=t,this.usedTimes=0}};function M_(n){return n===Ii||n===kr||n===Vr}function S_(n,t,e,i,s,r){let a=new cr,o=new Dc,c=new Set,l=[],h=new Map,f=i.logarithmicDepthBuffer,d=i.precision,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return c.add(x),x===0?"uv":`uv${x}`}function y(x,T,P,D,F,W){let L=D.fog,H=F.geometry,tt=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,j=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,it=t.get(x.envMap||tt,j),J=it&&it.mapping===Nr?it.image.height:null,rt=u[x.type];x.precision!==null&&(d=i.getMaxPrecision(x.precision),d!==x.precision&&Xt("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));let at=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,St=at!==void 0?at.length:0,Ct=0;H.morphAttributes.position!==void 0&&(Ct=1),H.morphAttributes.normal!==void 0&&(Ct=2),H.morphAttributes.color!==void 0&&(Ct=3);let Wt,qt,te,et;if(rt){let re=Yn[rt];Wt=re.vertexShader,qt=re.fragmentShader}else{Wt=x.vertexShader,qt=x.fragmentShader;let re=o.getVertexShaderStage(x),he=o.getFragmentShaderStage(x);o.update(x,re,he),te=re.id,et=he.id}let nt=n.getRenderTarget(),pt=n.state.buffers.depth.getReversed(),Gt=F.isInstancedMesh===!0,bt=F.isBatchedMesh===!0,Ut=!!x.map,Kt=!!x.matcap,R=!!it,V=!!x.aoMap,K=!!x.lightMap,st=!!x.bumpMap&&x.wireframe===!1,lt=!!x.normalMap,vt=!!x.displacementMap,mt=!!x.emissiveMap,Pt=!!x.metalnessMap,kt=!!x.roughnessMap,I=x.anisotropy>0,ee=x.clearcoat>0,$t=x.dispersion>0,E=x.retroreflectivity>0,_=x.iridescence>0,B=x.sheen>0,X=x.transmission>0,$=I&&!!x.anisotropyMap,ft=ee&&!!x.clearcoatMap,ut=ee&&!!x.clearcoatNormalMap,Q=ee&&!!x.clearcoatRoughnessMap,z=_&&!!x.iridescenceMap,_t=_&&!!x.iridescenceThicknessMap,Rt=B&&!!x.sheenColorMap,gt=B&&!!x.sheenRoughnessMap,yt=!!x.specularMap,zt=!!x.specularColorMap,Ht=!!x.specularIntensityMap,jt=X&&!!x.transmissionMap,U=X&&!!x.thicknessMap,Mt=!!x.gradientMap,ot=!!x.alphaMap,xt=x.alphaTest>0,wt=!!x.alphaHash,ct=!!x.extensions,It=Un;x.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(It=n.toneMapping);let Ft={shaderID:rt,shaderType:x.type,shaderName:x.name,vertexShader:Wt,fragmentShader:qt,defines:x.defines,customVertexShaderID:te,customFragmentShaderID:et,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:bt,batchingColor:bt&&F._colorsTexture!==null,instancing:Gt,instancingColor:Gt&&F.instanceColor!==null,instancingMorph:Gt&&F.morphTexture!==null,outputColorSpace:nt===null?n.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:oe.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ut,matcap:Kt,envMap:R,envMapMode:R&&it.mapping,envMapCubeUVHeight:J,aoMap:V,lightMap:K,bumpMap:st,normalMap:lt,displacementMap:vt,emissiveMap:mt,normalMapObjectSpace:lt&&x.normalMapType===eu,normalMapTangentSpace:lt&&x.normalMapType===zo,packedNormalMap:lt&&x.normalMapType===zo&&M_(x.normalMap.format),metalnessMap:Pt,roughnessMap:kt,anisotropy:I,anisotropyMap:$,clearcoat:ee,clearcoatMap:ft,clearcoatNormalMap:ut,clearcoatRoughnessMap:Q,dispersion:$t,retroreflection:E,iridescence:_,iridescenceMap:z,iridescenceThicknessMap:_t,sheen:B,sheenColorMap:Rt,sheenRoughnessMap:gt,specularMap:yt,specularColorMap:zt,specularIntensityMap:Ht,transmission:X,transmissionMap:jt,thicknessMap:U,gradientMap:Mt,opaque:x.transparent===!1&&x.blending===Bs&&x.alphaToCoverage===!1,alphaMap:ot,alphaTest:xt,alphaHash:wt,combine:x.combine,mapUv:Ut&&m(x.map.channel),aoMapUv:V&&m(x.aoMap.channel),lightMapUv:K&&m(x.lightMap.channel),bumpMapUv:st&&m(x.bumpMap.channel),normalMapUv:lt&&m(x.normalMap.channel),displacementMapUv:vt&&m(x.displacementMap.channel),emissiveMapUv:mt&&m(x.emissiveMap.channel),metalnessMapUv:Pt&&m(x.metalnessMap.channel),roughnessMapUv:kt&&m(x.roughnessMap.channel),anisotropyMapUv:$&&m(x.anisotropyMap.channel),clearcoatMapUv:ft&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:ut&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:z&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:_t&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:gt&&m(x.sheenRoughnessMap.channel),specularMapUv:yt&&m(x.specularMap.channel),specularColorMapUv:zt&&m(x.specularColorMap.channel),specularIntensityMapUv:Ht&&m(x.specularIntensityMap.channel),transmissionMapUv:jt&&m(x.transmissionMap.channel),thicknessMapUv:U&&m(x.thicknessMap.channel),alphaMapUv:ot&&m(x.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(lt||I),vertexNormals:!!H.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!H.attributes.uv&&(Ut||ot),fog:!!L,useFog:x.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||H.attributes.normal===void 0&&lt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:pt,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:Ct,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:It,decodeVideoTexture:Ut&&x.map.isVideoTexture===!0&&oe.getTransfer(x.map.colorSpace)===pe,decodeVideoTextureEmissive:mt&&x.emissiveMap.isVideoTexture===!0&&oe.getTransfer(x.emissiveMap.colorSpace)===pe,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===on,flipSided:x.side===sn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ct&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ct&&x.extensions.multiDraw===!0||bt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ft.vertexUv1s=c.has(1),Ft.vertexUv2s=c.has(2),Ft.vertexUv3s=c.has(3),c.clear(),Ft}function g(x){let T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(let P in x.defines)T.push(P),T.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(p(T,x),S(T,x),T.push(n.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function p(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numSunLights),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numSunLightShadows),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function S(x,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function A(x){let T=u[x.type],P;if(T){let D=Yn[T];P=yu.clone(D.uniforms)}else P=x.uniforms;return P}function v(x,T){let P=h.get(T);return P!==void 0?++P.usedTimes:(P=new y_(n,T,x,s),l.push(P),h.set(T,P)),P}function b(x){if(--x.usedTimes===0){let T=l.indexOf(x);l[T]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function w(x){o.remove(x)}function C(){o.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:A,acquireProgram:v,releaseProgram:b,releaseShaderCache:w,programs:l,dispose:C}}function b_(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function w_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function zu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function ku(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(d){let u=0;return d.isInstancedMesh&&(u+=2),d.isSkinnedMesh&&(u+=1),u}function o(d,u,m,y,g,p){let S=n[t];return S===void 0?(S={id:d.id,object:d,geometry:u,material:m,materialVariant:a(d),groupOrder:y,renderOrder:d.renderOrder,z:g,group:p},n[t]=S):(S.id=d.id,S.object=d,S.geometry=u,S.material=m,S.materialVariant=a(d),S.groupOrder=y,S.renderOrder=d.renderOrder,S.z=g,S.group=p),t++,S}function c(d,u,m,y,g,p,S){S.reversedDepth===!0&&(g=-g);let A=o(d,u,m,y,g,p);m.transmission>0?i.push(A):m.transparent===!0?s.push(A):e.push(A)}function l(d,u,m,y,g,p){let S=o(d,u,m,y,g,p);m.transmission>0?i.unshift(S):m.transparent===!0?s.unshift(S):e.unshift(S)}function h(d,u){e.length>1&&e.sort(d||w_),i.length>1&&i.sort(u||zu),s.length>1&&s.sort(u||zu)}function f(){for(let d=t,u=n.length;d<u;d++){let m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:f,sort:h}}function T_(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new ku,n.set(i,[a])):s>=r.length?(a=new ku,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function E_(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new N,color:new Qt};break;case"SpotLight":e={position:new N,direction:new N,color:new Qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Qt,groundColor:new Qt};break;case"RectAreaLight":e={color:new Qt,position:new N,halfWidth:new N,halfHeight:new N};break}return n[t.id]=e,e}}}function A_(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var C_=0;function R_(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function P_(n){let t=new E_,e=A_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new N);let s=new N,r=new be,a=new be;function o(l){let h=0,f=0,d=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let u=0,m=0,y=0,g=0,p=0,S=0,A=0,v=0,b=0,w=0,C=0,x=0,T=0,P=0;l.sort(R_);for(let F=0,W=l.length;F<W;F++){let L=l[F],H=L.color,tt=L.intensity,j=L.distance,it=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Ii?it=L.shadow.map.texture:it=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=H.r*tt,f+=H.g*tt,d+=H.b*tt;else if(L.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(L.sh.coefficients[J],tt);P++}else if(L.isSunLight){let J=t.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let rt=L.shadow,at=e.get(L);at.shadowIntensity=rt.intensity,at.shadowBias=rt.bias,at.shadowNormalBias=rt.normalBias,at.shadowRadius=rt.radius,at.shadowMapSize.copy(rt.mapSize).multiply(rt.getFrameExtents()),i.sunShadow[m]=at,i.sunShadowMap[m]=it;let St=rt.getViewportCount();for(let Ct=0;Ct<St;Ct++)i.sunShadowMatrix[y+Ct]=rt.getMatrix(Ct),i.sunShadowCascade[y+Ct]=rt._cascadeData[Ct];y+=St,m++}i.sun[u]=J,u++}else if(L.isDirectionalLight){let J=t.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let rt=L.shadow,at=e.get(L);at.shadowIntensity=rt.intensity,at.shadowBias=rt.bias,at.shadowNormalBias=rt.normalBias,at.shadowRadius=rt.radius,at.shadowMapSize=rt.mapSize,i.directionalShadow[g]=at,i.directionalShadowMap[g]=it,i.directionalShadowMatrix[g]=L.shadow.matrix,b++}i.directional[g]=J,g++}else if(L.isSpotLight){let J=t.get(L);J.position.setFromMatrixPosition(L.matrixWorld),J.color.copy(H).multiplyScalar(tt),J.distance=j,J.coneCos=Math.cos(L.angle),J.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),J.decay=L.decay,i.spot[S]=J;let rt=L.shadow;if(L.map&&(i.spotLightMap[x]=L.map,x++,rt.updateMatrices(L),L.castShadow&&T++),i.spotLightMatrix[S]=rt.matrix,L.castShadow){let at=e.get(L);at.shadowIntensity=rt.intensity,at.shadowBias=rt.bias,at.shadowNormalBias=rt.normalBias,at.shadowRadius=rt.radius,at.shadowMapSize=rt.mapSize,i.spotShadow[S]=at,i.spotShadowMap[S]=it,C++}S++}else if(L.isRectAreaLight){let J=t.get(L);J.color.copy(H).multiplyScalar(tt),J.halfWidth.set(L.width*.5,0,0),J.halfHeight.set(0,L.height*.5,0),i.rectArea[A]=J,A++}else if(L.isPointLight){let J=t.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity),J.distance=L.distance,J.decay=L.decay,L.castShadow){let rt=L.shadow,at=e.get(L);at.shadowIntensity=rt.intensity,at.shadowBias=rt.bias,at.shadowNormalBias=rt.normalBias,at.shadowRadius=rt.radius,at.shadowMapSize=rt.mapSize,at.shadowCameraNear=rt.camera.near,at.shadowCameraFar=rt.camera.far,i.pointShadow[p]=at,i.pointShadowMap[p]=it,i.pointShadowMatrix[p]=L.shadow.matrix,w++}i.point[p]=J,p++}else if(L.isHemisphereLight){let J=t.get(L);J.skyColor.copy(L.color).multiplyScalar(tt),J.groundColor.copy(L.groundColor).multiplyScalar(tt),i.hemi[v]=J,v++}}A>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Tt.LTC_FLOAT_1,i.rectAreaLTC2=Tt.LTC_FLOAT_2):(i.rectAreaLTC1=Tt.LTC_HALF_1,i.rectAreaLTC2=Tt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=d;let D=i.hash;(D.sunLength!==u||D.directionalLength!==g||D.pointLength!==p||D.spotLength!==S||D.rectAreaLength!==A||D.hemiLength!==v||D.numSunShadows!==m||D.numDirectionalShadows!==b||D.numPointShadows!==w||D.numSpotShadows!==C||D.numSpotMaps!==x||D.numLightProbes!==P)&&(i.sun.length=u,i.directional.length=g,i.spot.length=S,i.rectArea.length=A,i.point.length=p,i.hemi.length=v,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=y,i.sunShadowCascade.length=y,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.directionalShadowMatrix.length=b,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=C,i.spotShadowMap.length=C,i.spotLightMatrix.length=C+x-T,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=P,D.sunLength=u,D.directionalLength=g,D.pointLength=p,D.spotLength=S,D.rectAreaLength=A,D.hemiLength=v,D.numSunShadows=m,D.numDirectionalShadows=b,D.numPointShadows=w,D.numSpotShadows=C,D.numSpotMaps=x,D.numLightProbes=P,i.version=C_++)}function c(l,h){let f=0,d=0,u=0,m=0,y=0,g=0,p=h.matrixWorldInverse;for(let S=0,A=l.length;S<A;S++){let v=l[S];if(v.isSunLight){let b=i.sun[f];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(p),f++}else if(v.isDirectionalLight){let b=i.directional[d];b.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(p),d++}else if(v.isSpotLight){let b=i.spot[m];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(p),m++}else if(v.isRectAreaLight){let b=i.rectArea[y];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(p),a.identity(),r.copy(v.matrixWorld),r.premultiply(p),a.extractRotation(r),b.halfWidth.set(v.width*.5,0,0),b.halfHeight.set(0,v.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),y++}else if(v.isPointLight){let b=i.point[u];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(p),u++}else if(v.isHemisphereLight){let b=i.hemi[g];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(p),g++}}}return{setup:o,setupView:c,state:i}}function Vu(n){let t=new P_(n),e=[],i=[],s=[];function r(d){f.camera=d,e.length=0,i.length=0,s.length=0}function a(d){e.push(d)}function o(d){i.push(d)}function c(d){s.push(d)}function l(){t.setup(e)}function h(d){t.setupView(e,d)}let f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function I_(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Vu(n),t.set(s,[o])):r>=a.length?(o=new Vu(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var L_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,D_=`uniform sampler2D shadow_pass;
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
}`,N_=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],U_=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],Gu=new be,Hr=new N,Ac=new N;function F_(n,t,e){let i=new Ps,s=new ht,r=new ht,a=new we,o=new Ba,c=new za,l={},h=e.maxTextureSize,f={[Ai]:sn,[sn]:Ai,[on]:on},d=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ht},radius:{value:4}},vertexShader:L_,fragmentShader:D_}),u=d.clone();u.defines.HORIZONTAL_PASS=1;let m=new Ue;m.setAttribute("position",new en(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Jt(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qi;let p=this.type;this.render=function(w,C,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===Lh&&(Xt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=qi);let T=n.getRenderTarget(),P=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Xn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let W=p!==this.type;W&&C.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(H=>H.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,H=w.length;L<H;L++){let tt=w[L],j=tt.shadow;if(j===void 0){Xt("WebGLShadowMap:",tt,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;s.copy(j.mapSize);let it=j.getFrameExtents();s.multiply(it),r.copy(j.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/it.x),s.x=r.x*it.x,j.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/it.y),s.y=r.y*it.y,j.mapSize.y=r.y));let J=n.state.buffers.depth.getReversed();if(j.camera._reversedDepth=J,j.map===null||W===!0){if(j.map!==null&&(j.map.depthTexture!==null&&(j.map.depthTexture.dispose(),j.map.depthTexture=null),j.map.dispose()),this.type===Os){if(tt.isPointLight){Xt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}j.map=new an(s.x,s.y,{format:Ii,type:Bn,minFilter:He,magFilter:He,generateMipmaps:!1}),j.map.texture.name=tt.name+".shadowMap",j.map.depthTexture=new Mi(s.x,s.y,On),j.map.depthTexture.name=tt.name+".shadowMapDepth",j.map.depthTexture.format=Wn,j.map.depthTexture.compareFunction=null,j.map.depthTexture.minFilter=ke,j.map.depthTexture.magFilter=ke}else tt.isPointLight?(j.map=new Xo(s.x),j.map.depthTexture=new Pa(s.x,Fn)):(j.map=new an(s.x,s.y),j.map.depthTexture=new Mi(s.x,s.y,Fn)),j.map.depthTexture.name=tt.name+".shadowMap",j.map.depthTexture.format=Wn,this.type===qi?(j.map.depthTexture.compareFunction=J?Vo:ko,j.map.depthTexture.minFilter=He,j.map.depthTexture.magFilter=He):(j.map.depthTexture.compareFunction=null,j.map.depthTexture.minFilter=ke,j.map.depthTexture.magFilter=ke);j.camera.updateProjectionMatrix()}j.map.isWebGLCubeRenderTarget!==!0&&(j.map.width!==s.x||j.map.height!==s.y)&&j.map.setSize(s.x,s.y);let rt=j.map.isWebGLCubeRenderTarget?6:j.getViewportCount();tt.isPointLight!==!0&&j.updateMatrices(tt,x);for(let at=0;at<rt;at++){let St=j.getCamera(at);if(tt.isPointLight){let Ct=j.camera,Wt=j.matrix,qt=tt.distance||Ct.far;qt!==Ct.far&&(Ct.far=qt,Ct.updateProjectionMatrix()),Hr.setFromMatrixPosition(tt.matrixWorld),Ct.position.copy(Hr),Ac.copy(Ct.position),Ac.add(N_[at]),Ct.up.copy(U_[at]),Ct.lookAt(Ac),Ct.updateMatrixWorld(),Wt.makeTranslation(-Hr.x,-Hr.y,-Hr.z),Gu.multiplyMatrices(Ct.projectionMatrix,Ct.matrixWorldInverse),j._frustum.setFromProjectionMatrix(Gu,Ct.coordinateSystem,Ct.reversedDepth)}if(j.map.isWebGLCubeRenderTarget)n.setRenderTarget(j.map,at),n.clear();else{at===0&&(n.setRenderTarget(j.map),n.clear());let Ct=j.getViewport(at);a.set(r.x*Ct.x,r.y*Ct.y,r.x*Ct.z,r.y*Ct.w),F.viewport(a)}i=j.getFrustum(at),v(C,x,St,tt,this.type)}j.isPointLightShadow!==!0&&this.type===Os&&S(j,x),j.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(T,P,D)};function S(w,C){let x=t.update(y);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,u.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),w.mapPass===null?w.mapPass=new an(s.x,s.y,{format:Ii,type:Bn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(C,null,x,d,y,null),u.uniforms.shadow_pass.value=w.mapPass.texture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(C,null,x,u,y,null)}function A(w,C,x,T){let P=null,D=x.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(D!==void 0)P=D;else if(P=x.isPointLight===!0?c:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let F=P.uuid,W=C.uuid,L=l[F];L===void 0&&(L={},l[F]=L);let H=L[W];H===void 0&&(H=P.clone(),L[W]=H,C.addEventListener("dispose",b)),P=H}if(P.visible=C.visible,P.wireframe=C.wireframe,T===Os?P.side=C.shadowSide!==null?C.shadowSide:C.side:P.side=C.shadowSide!==null?C.shadowSide:f[C.side],P.alphaMap=C.alphaMap,P.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,P.map=C.map,P.clipShadows=C.clipShadows,P.clippingPlanes=C.clippingPlanes,P.clipIntersection=C.clipIntersection,P.displacementMap=C.displacementMap,P.displacementScale=C.displacementScale,P.displacementBias=C.displacementBias,P.wireframeLinewidth=C.wireframeLinewidth,P.linewidth=C.linewidth,x.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let F=n.properties.get(P);F.light=x}return P}function v(w,C,x,T,P){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&P===Os)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,w.matrixWorld);let W=t.update(w),L=w.material;if(Array.isArray(L)){let H=W.groups;for(let tt=0,j=H.length;tt<j;tt++){let it=H[tt],J=L[it.materialIndex];if(J&&J.visible){let rt=A(w,J,T,P);w.onBeforeShadow(n,w,C,x,W,rt,it),n.renderBufferDirect(x,null,W,rt,w,it),w.onAfterShadow(n,w,C,x,W,rt,it)}}}else if(L.visible){let H=A(w,L,T,P);w.onBeforeShadow(n,w,C,x,W,H,null),n.renderBufferDirect(x,null,W,H,w,null),w.onAfterShadow(n,w,C,x,W,H,null)}}let F=w.children;for(let W=0,L=F.length;W<L;W++)v(F[W],C,x,T,P)}function b(w){w.target.removeEventListener("dispose",b);for(let x in l){let T=l[x],P=w.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function O_(n,t){function e(){let U=!1,Mt=new we,ot=null,xt=new we(0,0,0,0);return{setMask:function(wt){ot!==wt&&!U&&(n.colorMask(wt,wt,wt,wt),ot=wt)},setLocked:function(wt){U=wt},setClear:function(wt,ct,It,Ft,re){re===!0&&(wt*=Ft,ct*=Ft,It*=Ft),Mt.set(wt,ct,It,Ft),xt.equals(Mt)===!1&&(n.clearColor(wt,ct,It,Ft),xt.copy(Mt))},reset:function(){U=!1,ot=null,xt.set(-1,0,0,0)}}}function i(){let U=!1,Mt=!1,ot=null,xt=null,wt=null;return{setReversed:function(ct){if(Mt!==ct){let It=t.get("EXT_clip_control");ct?It.clipControlEXT(It.LOWER_LEFT_EXT,It.ZERO_TO_ONE_EXT):It.clipControlEXT(It.LOWER_LEFT_EXT,It.NEGATIVE_ONE_TO_ONE_EXT),Mt=ct;let Ft=wt;wt=null,this.setClear(Ft)}},getReversed:function(){return Mt},setTest:function(ct){ct?nt(n.DEPTH_TEST):pt(n.DEPTH_TEST)},setMask:function(ct){ot!==ct&&!U&&(n.depthMask(ct),ot=ct)},setFunc:function(ct){if(Mt&&(ct=fu[ct]),xt!==ct){switch(ct){case ga:n.depthFunc(n.NEVER);break;case _a:n.depthFunc(n.ALWAYS);break;case xa:n.depthFunc(n.LESS);break;case Ss:n.depthFunc(n.LEQUAL);break;case ya:n.depthFunc(n.EQUAL);break;case va:n.depthFunc(n.GEQUAL);break;case Ma:n.depthFunc(n.GREATER);break;case Sa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xt=ct}},setLocked:function(ct){U=ct},setClear:function(ct){wt!==ct&&(wt=ct,Mt&&(ct=1-ct),n.clearDepth(ct))},reset:function(){U=!1,ot=null,xt=null,wt=null,Mt=!1}}}function s(){let U=!1,Mt=null,ot=null,xt=null,wt=null,ct=null,It=null,Ft=null,re=null;return{setTest:function(he){U||(he?nt(n.STENCIL_TEST):pt(n.STENCIL_TEST))},setMask:function(he){Mt!==he&&!U&&(n.stencilMask(he),Mt=he)},setFunc:function(he,rn,Mn){(ot!==he||xt!==rn||wt!==Mn)&&(n.stencilFunc(he,rn,Mn),ot=he,xt=rn,wt=Mn)},setOp:function(he,rn,Mn){(ct!==he||It!==rn||Ft!==Mn)&&(n.stencilOp(he,rn,Mn),ct=he,It=rn,Ft=Mn)},setLocked:function(he){U=he},setClear:function(he){re!==he&&(n.clearStencil(he),re=he)},reset:function(){U=!1,Mt=null,ot=null,xt=null,wt=null,ct=null,It=null,Ft=null,re=null}}}let r=new e,a=new i,o=new s,c=new WeakMap,l=new WeakMap,h={},f={},d={},u=new WeakMap,m=[],y=null,g=!1,p=null,S=null,A=null,v=null,b=null,w=null,C=null,x=new Qt(0,0,0),T=0,P=!1,D=null,F=null,W=null,L=null,H=null,tt=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,it=0,J=n.getParameter(n.VERSION);J.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(J)[1]),j=it>=1):J.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),j=it>=2);let rt=null,at={},St=n.getParameter(n.SCISSOR_BOX),Ct=n.getParameter(n.VIEWPORT),Wt=new we().fromArray(St),qt=new we().fromArray(Ct);function te(U,Mt,ot,xt){let wt=new Uint8Array(4),ct=n.createTexture();n.bindTexture(U,ct),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let It=0;It<ot;It++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(Mt,0,n.RGBA,1,1,xt,0,n.RGBA,n.UNSIGNED_BYTE,wt):n.texImage2D(Mt+It,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,wt);return ct}let et={};et[n.TEXTURE_2D]=te(n.TEXTURE_2D,n.TEXTURE_2D,1),et[n.TEXTURE_CUBE_MAP]=te(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),et[n.TEXTURE_2D_ARRAY]=te(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),et[n.TEXTURE_3D]=te(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),nt(n.DEPTH_TEST),a.setFunc(Ss),st(!1),lt(Vl),nt(n.CULL_FACE),V(Xn);function nt(U){h[U]!==!0&&(n.enable(U),h[U]=!0)}function pt(U){h[U]!==!1&&(n.disable(U),h[U]=!1)}function Gt(U,Mt){return d[U]!==Mt?(n.bindFramebuffer(U,Mt),d[U]=Mt,U===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=Mt),U===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=Mt),!0):!1}function bt(U,Mt){let ot=m,xt=!1;if(U){ot=u.get(Mt),ot===void 0&&(ot=[],u.set(Mt,ot));let wt=U.textures;if(ot.length!==wt.length||ot[0]!==n.COLOR_ATTACHMENT0){for(let ct=0,It=wt.length;ct<It;ct++)ot[ct]=n.COLOR_ATTACHMENT0+ct;ot.length=wt.length,xt=!0}}else ot[0]!==n.BACK&&(ot[0]=n.BACK,xt=!0);xt&&n.drawBuffers(ot)}function Ut(U){return y!==U?(n.useProgram(U),y=U,!0):!1}let Kt={[Yi]:n.FUNC_ADD,[Nh]:n.FUNC_SUBTRACT,[Uh]:n.FUNC_REVERSE_SUBTRACT};Kt[Fh]=n.MIN,Kt[Oh]=n.MAX;let R={[Bh]:n.ZERO,[zh]:n.ONE,[kh]:n.SRC_COLOR,[Xl]:n.SRC_ALPHA,[qh]:n.SRC_ALPHA_SATURATE,[Wh]:n.DST_COLOR,[Gh]:n.DST_ALPHA,[Vh]:n.ONE_MINUS_SRC_COLOR,[ql]:n.ONE_MINUS_SRC_ALPHA,[Xh]:n.ONE_MINUS_DST_COLOR,[Hh]:n.ONE_MINUS_DST_ALPHA,[Yh]:n.CONSTANT_COLOR,[$h]:n.ONE_MINUS_CONSTANT_COLOR,[Zh]:n.CONSTANT_ALPHA,[Jh]:n.ONE_MINUS_CONSTANT_ALPHA};function V(U,Mt,ot,xt,wt,ct,It,Ft,re,he){if(U===Xn){g===!0&&(pt(n.BLEND),g=!1);return}if(g===!1&&(nt(n.BLEND),g=!0),U!==Dh){if(U!==p||he!==P){if((S!==Yi||b!==Yi)&&(n.blendEquation(n.FUNC_ADD),S=Yi,b=Yi),he)switch(U){case Bs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Gl:n.blendFunc(n.ONE,n.ONE);break;case Hl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Wl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Yt("WebGLState: Invalid blending: ",U);break}else switch(U){case Bs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Gl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Hl:Yt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wl:Yt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Yt("WebGLState: Invalid blending: ",U);break}A=null,v=null,w=null,C=null,x.set(0,0,0),T=0,p=U,P=he}return}wt=wt||Mt,ct=ct||ot,It=It||xt,(Mt!==S||wt!==b)&&(n.blendEquationSeparate(Kt[Mt],Kt[wt]),S=Mt,b=wt),(ot!==A||xt!==v||ct!==w||It!==C)&&(n.blendFuncSeparate(R[ot],R[xt],R[ct],R[It]),A=ot,v=xt,w=ct,C=It),(Ft.equals(x)===!1||re!==T)&&(n.blendColor(Ft.r,Ft.g,Ft.b,re),x.copy(Ft),T=re),p=U,P=!1}function K(U,Mt){U.side===on?pt(n.CULL_FACE):nt(n.CULL_FACE);let ot=U.side===sn;Mt&&(ot=!ot),st(ot),U.blending===Bs&&U.transparent===!1?V(Xn):V(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);let xt=U.stencilWrite;o.setTest(xt),xt&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),mt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?nt(n.SAMPLE_ALPHA_TO_COVERAGE):pt(n.SAMPLE_ALPHA_TO_COVERAGE)}function st(U){D!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),D=U)}function lt(U){U!==Ph?(nt(n.CULL_FACE),U!==F&&(U===Vl?n.cullFace(n.BACK):U===Ih?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):pt(n.CULL_FACE),F=U}function vt(U){U!==W&&(j&&n.lineWidth(U),W=U)}function mt(U,Mt,ot){U?(nt(n.POLYGON_OFFSET_FILL),(L!==Mt||H!==ot)&&(L=Mt,H=ot,a.getReversed()&&(Mt=-Mt),n.polygonOffset(Mt,ot))):pt(n.POLYGON_OFFSET_FILL)}function Pt(U){U?nt(n.SCISSOR_TEST):pt(n.SCISSOR_TEST)}function kt(U){U===void 0&&(U=n.TEXTURE0+tt-1),rt!==U&&(n.activeTexture(U),rt=U)}function I(U,Mt,ot){ot===void 0&&(rt===null?ot=n.TEXTURE0+tt-1:ot=rt);let xt=at[ot];xt===void 0&&(xt={type:void 0,texture:void 0},at[ot]=xt),(xt.type!==U||xt.texture!==Mt)&&(rt!==ot&&(n.activeTexture(ot),rt=ot),n.bindTexture(U,Mt||et[U]),xt.type=U,xt.texture=Mt)}function ee(){let U=at[rt];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function $t(){try{n.compressedTexImage2D(...arguments)}catch(U){Yt("WebGLState:",U)}}function E(){try{n.compressedTexImage3D(...arguments)}catch(U){Yt("WebGLState:",U)}}function _(){try{n.texSubImage2D(...arguments)}catch(U){Yt("WebGLState:",U)}}function B(){try{n.texSubImage3D(...arguments)}catch(U){Yt("WebGLState:",U)}}function X(){try{n.compressedTexSubImage2D(...arguments)}catch(U){Yt("WebGLState:",U)}}function $(){try{n.compressedTexSubImage3D(...arguments)}catch(U){Yt("WebGLState:",U)}}function ft(){try{n.texStorage2D(...arguments)}catch(U){Yt("WebGLState:",U)}}function ut(){try{n.texStorage3D(...arguments)}catch(U){Yt("WebGLState:",U)}}function Q(){try{n.texImage2D(...arguments)}catch(U){Yt("WebGLState:",U)}}function z(){try{n.texImage3D(...arguments)}catch(U){Yt("WebGLState:",U)}}function _t(U){return f[U]!==void 0?f[U]:n.getParameter(U)}function Rt(U,Mt){f[U]!==Mt&&(n.pixelStorei(U,Mt),f[U]=Mt)}function gt(U){Wt.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),Wt.copy(U))}function yt(U){qt.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),qt.copy(U))}function zt(U,Mt){let ot=l.get(Mt);ot===void 0&&(ot=new WeakMap,l.set(Mt,ot));let xt=ot.get(U);xt===void 0&&(xt=n.getUniformBlockIndex(Mt,U.name),ot.set(U,xt))}function Ht(U,Mt){let xt=l.get(Mt).get(U);c.get(Mt)!==xt&&(n.uniformBlockBinding(Mt,xt,U.__bindingPointIndex),c.set(Mt,xt))}function jt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},f={},rt=null,at={},d={},u=new WeakMap,m=[],y=null,g=!1,p=null,S=null,A=null,v=null,b=null,w=null,C=null,x=new Qt(0,0,0),T=0,P=!1,D=null,F=null,W=null,L=null,H=null,Wt.set(0,0,n.canvas.width,n.canvas.height),qt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:nt,disable:pt,bindFramebuffer:Gt,drawBuffers:bt,useProgram:Ut,setBlending:V,setMaterial:K,setFlipSided:st,setCullFace:lt,setLineWidth:vt,setPolygonOffset:mt,setScissorTest:Pt,activeTexture:kt,bindTexture:I,unbindTexture:ee,compressedTexImage2D:$t,compressedTexImage3D:E,texImage2D:Q,texImage3D:z,pixelStorei:Rt,getParameter:_t,updateUBOMapping:zt,uniformBlockBinding:Ht,texStorage2D:ft,texStorage3D:ut,texSubImage2D:_,texSubImage3D:B,compressedTexSubImage2D:X,compressedTexSubImage3D:$,scissor:gt,viewport:yt,reset:jt}}function B_(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ht,h=new WeakMap,f=new Set,d,u=new WeakMap,m=!1;try{m=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(E,_){return m?new OffscreenCanvas(E,_):or("canvas")}function g(E,_,B){let X=1,$=$t(E);if(($.width>B||$.height>B)&&(X=B/Math.max($.width,$.height)),X<1)if(typeof HTMLImageElement!="undefined"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&E instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&E instanceof ImageBitmap||typeof VideoFrame!="undefined"&&E instanceof VideoFrame){let ft=Math.floor(X*$.width),ut=Math.floor(X*$.height);d===void 0&&(d=y(ft,ut));let Q=_?y(ft,ut):d;return Q.width=ft,Q.height=ut,Q.getContext("2d").drawImage(E,0,0,ft,ut),Xt("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+ft+"x"+ut+")."),Q}else return"data"in E&&Xt("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),E;return E}function p(E){return E.generateMipmaps}function S(E){n.generateMipmap(E)}function A(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(E,_,B,X,$,ft=!1){if(E!==null){if(n[E]!==void 0)return n[E];Xt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let ut;X&&(ut=t.get("EXT_texture_norm16"),ut||Xt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=_;if(_===n.RED&&(B===n.FLOAT&&(Q=n.R32F),B===n.HALF_FLOAT&&(Q=n.R16F),B===n.UNSIGNED_BYTE&&(Q=n.R8),B===n.UNSIGNED_SHORT&&ut&&(Q=ut.R16_EXT),B===n.SHORT&&ut&&(Q=ut.R16_SNORM_EXT)),_===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(Q=n.R8UI),B===n.UNSIGNED_SHORT&&(Q=n.R16UI),B===n.UNSIGNED_INT&&(Q=n.R32UI),B===n.BYTE&&(Q=n.R8I),B===n.SHORT&&(Q=n.R16I),B===n.INT&&(Q=n.R32I)),_===n.RG&&(B===n.FLOAT&&(Q=n.RG32F),B===n.HALF_FLOAT&&(Q=n.RG16F),B===n.UNSIGNED_BYTE&&(Q=n.RG8),B===n.UNSIGNED_SHORT&&ut&&(Q=ut.RG16_EXT),B===n.SHORT&&ut&&(Q=ut.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(Q=n.RG8UI),B===n.UNSIGNED_SHORT&&(Q=n.RG16UI),B===n.UNSIGNED_INT&&(Q=n.RG32UI),B===n.BYTE&&(Q=n.RG8I),B===n.SHORT&&(Q=n.RG16I),B===n.INT&&(Q=n.RG32I)),_===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),B===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),B===n.UNSIGNED_INT&&(Q=n.RGB32UI),B===n.BYTE&&(Q=n.RGB8I),B===n.SHORT&&(Q=n.RGB16I),B===n.INT&&(Q=n.RGB32I)),_===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),B===n.UNSIGNED_INT&&(Q=n.RGBA32UI),B===n.BYTE&&(Q=n.RGBA8I),B===n.SHORT&&(Q=n.RGBA16I),B===n.INT&&(Q=n.RGBA32I)),_===n.RGB&&(B===n.UNSIGNED_SHORT&&ut&&(Q=ut.RGB16_EXT),B===n.SHORT&&ut&&(Q=ut.RGB16_SNORM_EXT),B===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),_===n.RGBA){let z=ft?ar:oe.getTransfer($);B===n.FLOAT&&(Q=n.RGBA32F),B===n.HALF_FLOAT&&(Q=n.RGBA16F),B===n.UNSIGNED_BYTE&&(Q=z===pe?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT&&ut&&(Q=ut.RGBA16_EXT),B===n.SHORT&&ut&&(Q=ut.RGBA16_SNORM_EXT),B===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function b(E,_){let B;return E?_===null||_===Fn||_===ks?B=n.DEPTH24_STENCIL8:_===On?B=n.DEPTH32F_STENCIL8:_===zs&&(B=n.DEPTH24_STENCIL8,Xt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Fn||_===ks?B=n.DEPTH_COMPONENT24:_===On?B=n.DEPTH_COMPONENT32F:_===zs&&(B=n.DEPTH_COMPONENT16),B}function w(E,_){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==ke&&E.minFilter!==He?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function C(E){let _=E.target;_.removeEventListener("dispose",C),T(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&f.delete(_)}function x(E){let _=E.target;_.removeEventListener("dispose",x),D(_)}function T(E){let _=i.get(E);if(_.__webglInit===void 0)return;let B=E.source,X=u.get(B);if(X){let $=X[_.__cacheKey];$.usedTimes--,$.usedTimes===0&&P(E),Object.keys(X).length===0&&u.delete(B)}i.remove(E)}function P(E){let _=i.get(E);n.deleteTexture(_.__webglTexture);let B=E.source,X=u.get(B);delete X[_.__cacheKey],a.memory.textures--}function D(E){let _=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(_.__webglFramebuffer[X]))for(let $=0;$<_.__webglFramebuffer[X].length;$++)n.deleteFramebuffer(_.__webglFramebuffer[X][$]);else n.deleteFramebuffer(_.__webglFramebuffer[X]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[X])}else{if(Array.isArray(_.__webglFramebuffer))for(let X=0;X<_.__webglFramebuffer.length;X++)n.deleteFramebuffer(_.__webglFramebuffer[X]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let X=0;X<_.__webglColorRenderbuffer.length;X++)_.__webglColorRenderbuffer[X]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[X]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let B=E.textures;for(let X=0,$=B.length;X<$;X++){let ft=i.get(B[X]);ft.__webglTexture&&(n.deleteTexture(ft.__webglTexture),a.memory.textures--),i.remove(B[X])}i.remove(E)}let F=0;function W(){F=0}function L(){return F}function H(E){F=E}function tt(){let E=F;return E>=s.maxTextures&&Xt("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+s.maxTextures),F+=1,E}function j(E){let _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function it(E,_){let B=i.get(E);if(E.isVideoTexture&&I(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&B.__version!==E.version){let X=E.image;if(X===null)Xt("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Xt("WebGLRenderer: Texture marked for update but image is incomplete");else{pt(B,E,_);return}}else E.isExternalTexture&&(B.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+_)}function J(E,_){let B=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&B.__version!==E.version){pt(B,E,_);return}else E.isExternalTexture&&(B.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+_)}function rt(E,_){let B=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&B.__version!==E.version){pt(B,E,_);return}e.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+_)}function at(E,_){let B=i.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&B.__version!==E.version){Gt(B,E,_);return}e.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+_)}let St={[ba]:n.REPEAT,[Gn]:n.CLAMP_TO_EDGE,[wa]:n.MIRRORED_REPEAT},Ct={[ke]:n.NEAREST,[Qh]:n.NEAREST_MIPMAP_NEAREST,[Ur]:n.NEAREST_MIPMAP_LINEAR,[He]:n.LINEAR,[eo]:n.LINEAR_MIPMAP_NEAREST,[Ri]:n.LINEAR_MIPMAP_LINEAR},Wt={[iu]:n.NEVER,[lu]:n.ALWAYS,[su]:n.LESS,[ko]:n.LEQUAL,[ru]:n.EQUAL,[Vo]:n.GEQUAL,[au]:n.GREATER,[ou]:n.NOTEQUAL};function qt(E,_){if(_.type===On&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===He||_.magFilter===eo||_.magFilter===Ur||_.magFilter===Ri||_.minFilter===He||_.minFilter===eo||_.minFilter===Ur||_.minFilter===Ri)&&Xt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,St[_.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,St[_.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,St[_.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,Ct[_.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,Ct[_.minFilter]),_.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,Wt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===ke||_.minFilter!==Ur&&_.minFilter!==Ri||_.type===On&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");n.texParameterf(E,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function te(E,_){let B=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",C));let X=_.source,$=u.get(X);$===void 0&&($={},u.set(X,$));let ft=j(_);if(ft!==E.__cacheKey){$[ft]===void 0&&($[ft]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),$[ft].usedTimes++;let ut=$[E.__cacheKey];ut!==void 0&&($[E.__cacheKey].usedTimes--,ut.usedTimes===0&&P(_)),E.__cacheKey=ft,E.__webglTexture=$[ft].texture}return B}function et(E,_,B){return Math.floor(Math.floor(E/B)/_)}function nt(E,_,B,X){let ft=E.updateRanges;if(ft.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,B,X,_.data);else{ft.sort((Rt,gt)=>Rt.start-gt.start);let ut=0;for(let Rt=1;Rt<ft.length;Rt++){let gt=ft[ut],yt=ft[Rt],zt=gt.start+gt.count,Ht=et(yt.start,_.width,4),jt=et(gt.start,_.width,4);yt.start<=zt+1&&Ht===jt&&et(yt.start+yt.count-1,_.width,4)===Ht?gt.count=Math.max(gt.count,yt.start+yt.count-gt.start):(++ut,ft[ut]=yt)}ft.length=ut+1;let Q=e.getParameter(n.UNPACK_ROW_LENGTH),z=e.getParameter(n.UNPACK_SKIP_PIXELS),_t=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Rt=0,gt=ft.length;Rt<gt;Rt++){let yt=ft[Rt],zt=Math.floor(yt.start/4),Ht=Math.ceil(yt.count/4),jt=zt%_.width,U=Math.floor(zt/_.width),Mt=Ht,ot=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,jt),e.pixelStorei(n.UNPACK_SKIP_ROWS,U),e.texSubImage2D(n.TEXTURE_2D,0,jt,U,Mt,ot,B,X,_.data)}E.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,Q),e.pixelStorei(n.UNPACK_SKIP_PIXELS,z),e.pixelStorei(n.UNPACK_SKIP_ROWS,_t)}}function pt(E,_,B){let X=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(X=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(X=n.TEXTURE_3D);let $=te(E,_),ft=_.source;e.bindTexture(X,E.__webglTexture,n.TEXTURE0+B);let ut=i.get(ft);if(ft.version!==ut.__version||$===!0){if(e.activeTexture(n.TEXTURE0+B),(typeof ImageBitmap!="undefined"&&_.image instanceof ImageBitmap)===!1){let ot=oe.getPrimaries(oe.workingColorSpace),xt=_.colorSpace===ri?null:oe.getPrimaries(_.colorSpace),wt=_.colorSpace===ri||ot===xt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt)}e.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let z=g(_.image,!1,s.maxTextureSize);z=ee(_,z);let _t=r.convert(_.format,_.colorSpace),Rt=r.convert(_.type),gt=v(_.internalFormat,_t,Rt,_.normalized,_.colorSpace,_.isVideoTexture);qt(X,_);let yt,zt=_.mipmaps,Ht=_.isVideoTexture!==!0,jt=ut.__version===void 0||$===!0,U=ft.dataReady,Mt=w(_,z);if(_.isDepthTexture)gt=b(_.format===Pi,_.type),jt&&(Ht?e.texStorage2D(n.TEXTURE_2D,1,gt,z.width,z.height):e.texImage2D(n.TEXTURE_2D,0,gt,z.width,z.height,0,_t,Rt,null));else if(_.isDataTexture)if(zt.length>0){Ht&&jt&&e.texStorage2D(n.TEXTURE_2D,Mt,gt,zt[0].width,zt[0].height);for(let ot=0,xt=zt.length;ot<xt;ot++)yt=zt[ot],Ht?U&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,yt.width,yt.height,_t,Rt,yt.data):e.texImage2D(n.TEXTURE_2D,ot,gt,yt.width,yt.height,0,_t,Rt,yt.data);_.generateMipmaps=!1}else Ht?(jt&&e.texStorage2D(n.TEXTURE_2D,Mt,gt,z.width,z.height),U&&nt(_,z,_t,Rt)):e.texImage2D(n.TEXTURE_2D,0,gt,z.width,z.height,0,_t,Rt,z.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ht&&jt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Mt,gt,zt[0].width,zt[0].height,z.depth);for(let ot=0,xt=zt.length;ot<xt;ot++)if(yt=zt[ot],_.format!==En)if(_t!==null)if(Ht){if(U)if(_.layerUpdates.size>0){let wt=gc(yt.width,yt.height,_.format,_.type);for(let ct of _.layerUpdates){let It=yt.data.subarray(ct*wt/yt.data.BYTES_PER_ELEMENT,(ct+1)*wt/yt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,ct,yt.width,yt.height,1,_t,It)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,0,yt.width,yt.height,z.depth,_t,yt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ot,gt,yt.width,yt.height,z.depth,0,yt.data,0,0);else Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?U&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,0,yt.width,yt.height,z.depth,_t,Rt,yt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,ot,gt,yt.width,yt.height,z.depth,0,_t,Rt,yt.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Ht&&jt&&e.texStorage2D(n.TEXTURE_2D,Mt,gt,zt[0].width,zt[0].height);for(let ot=0,xt=zt.length;ot<xt;ot++)yt=zt[ot],_.format!==En?_t!==null?Ht?U&&e.compressedTexSubImage2D(n.TEXTURE_2D,ot,0,0,yt.width,yt.height,_t,yt.data):e.compressedTexImage2D(n.TEXTURE_2D,ot,gt,yt.width,yt.height,0,yt.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?U&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,yt.width,yt.height,_t,Rt,yt.data):e.texImage2D(n.TEXTURE_2D,ot,gt,yt.width,yt.height,0,_t,Rt,yt.data)}else if(_.isDataArrayTexture)if(Ht){if(jt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Mt,gt,z.width,z.height,z.depth),U)if(_.layerUpdates.size>0){let ot=gc(z.width,z.height,_.format,_.type);for(let xt of _.layerUpdates){let wt=z.data.subarray(xt*ot/z.data.BYTES_PER_ELEMENT,(xt+1)*ot/z.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,xt,z.width,z.height,1,_t,Rt,wt)}_.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,z.width,z.height,z.depth,_t,Rt,z.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,gt,z.width,z.height,z.depth,0,_t,Rt,z.data);else if(_.isData3DTexture)Ht?(jt&&e.texStorage3D(n.TEXTURE_3D,Mt,gt,z.width,z.height,z.depth),U&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,z.width,z.height,z.depth,_t,Rt,z.data)):e.texImage3D(n.TEXTURE_3D,0,gt,z.width,z.height,z.depth,0,_t,Rt,z.data);else if(_.isFramebufferTexture){if(jt)if(Ht)e.texStorage2D(n.TEXTURE_2D,Mt,gt,z.width,z.height);else{let ot=z.width,xt=z.height;for(let wt=0;wt<Mt;wt++)e.texImage2D(n.TEXTURE_2D,wt,gt,ot,xt,0,_t,Rt,null),ot>>=1,xt>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){let ot=n.canvas;if(ot.hasAttribute("layoutsubtree")||ot.setAttribute("layoutsubtree","true"),z.parentNode!==ot){ot.appendChild(z),f.add(_),ot.onpaint=xt=>{let wt=xt.changedElements;for(let ct of f)wt.includes(ct.image)&&(ct.needsUpdate=!0)},ot.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,z);else{let wt=n.RGBA,ct=n.RGBA,It=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,wt,ct,It,z)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(zt.length>0){if(Ht&&jt){let ot=$t(zt[0]);e.texStorage2D(n.TEXTURE_2D,Mt,gt,ot.width,ot.height)}for(let ot=0,xt=zt.length;ot<xt;ot++)yt=zt[ot],Ht?U&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,_t,Rt,yt):e.texImage2D(n.TEXTURE_2D,ot,gt,_t,Rt,yt);_.generateMipmaps=!1}else if(Ht){if(jt){let ot=$t(z);e.texStorage2D(n.TEXTURE_2D,Mt,gt,ot.width,ot.height)}U&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,_t,Rt,z)}else e.texImage2D(n.TEXTURE_2D,0,gt,_t,Rt,z);p(_)&&S(X),ut.__version=ft.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function Gt(E,_,B){if(_.image.length!==6)return;let X=te(E,_),$=_.source;e.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+B);let ft=i.get($);if($.version!==ft.__version||X===!0){e.activeTexture(n.TEXTURE0+B);let ut=oe.getPrimaries(oe.workingColorSpace),Q=_.colorSpace===ri?null:oe.getPrimaries(_.colorSpace),z=_.colorSpace===ri||ut===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,z);let _t=_.isCompressedTexture||_.image[0].isCompressedTexture,Rt=_.image[0]&&_.image[0].isDataTexture,gt=[];for(let ct=0;ct<6;ct++)!_t&&!Rt?gt[ct]=g(_.image[ct],!0,s.maxCubemapSize):gt[ct]=Rt?_.image[ct].image:_.image[ct],gt[ct]=ee(_,gt[ct]);let yt=gt[0],zt=r.convert(_.format,_.colorSpace),Ht=r.convert(_.type),jt=v(_.internalFormat,zt,Ht,_.normalized,_.colorSpace),U=_.isVideoTexture!==!0,Mt=ft.__version===void 0||X===!0,ot=$.dataReady,xt=w(_,yt);qt(n.TEXTURE_CUBE_MAP,_);let wt;if(_t){U&&Mt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,jt,yt.width,yt.height);for(let ct=0;ct<6;ct++){wt=gt[ct].mipmaps;for(let It=0;It<wt.length;It++){let Ft=wt[It];_.format!==En?zt!==null?U?ot&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,It,0,0,Ft.width,Ft.height,zt,Ft.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,It,jt,Ft.width,Ft.height,0,Ft.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?ot&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,It,0,0,Ft.width,Ft.height,zt,Ht,Ft.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,It,jt,Ft.width,Ft.height,0,zt,Ht,Ft.data)}}}else{if(wt=_.mipmaps,U&&Mt){wt.length>0&&xt++;let ct=$t(gt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,jt,ct.width,ct.height)}for(let ct=0;ct<6;ct++)if(Rt){U?ot&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,gt[ct].width,gt[ct].height,zt,Ht,gt[ct].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,jt,gt[ct].width,gt[ct].height,0,zt,Ht,gt[ct].data);for(let It=0;It<wt.length;It++){let re=wt[It].image[ct].image;U?ot&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,It+1,0,0,re.width,re.height,zt,Ht,re.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,It+1,jt,re.width,re.height,0,zt,Ht,re.data)}}else{U?ot&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,zt,Ht,gt[ct]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,jt,zt,Ht,gt[ct]);for(let It=0;It<wt.length;It++){let Ft=wt[It];U?ot&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,It+1,0,0,zt,Ht,Ft.image[ct]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,It+1,jt,zt,Ht,Ft.image[ct])}}}p(_)&&S(n.TEXTURE_CUBE_MAP),ft.__version=$.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function bt(E,_,B,X,$,ft){let ut=r.convert(B.format,B.colorSpace),Q=r.convert(B.type),z=v(B.internalFormat,ut,Q,B.normalized,B.colorSpace),_t=i.get(_),Rt=i.get(B);if(Rt.__renderTarget=_,!_t.__hasExternalTextures){let gt=Math.max(1,_.width>>ft),yt=Math.max(1,_.height>>ft);$===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY?e.texImage3D($,ft,z,gt,yt,_.depth,0,ut,Q,null):e.texImage2D($,ft,z,gt,yt,0,ut,Q,null)}e.bindFramebuffer(n.FRAMEBUFFER,E),kt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,X,$,Rt.__webglTexture,0,Pt(_)):($===n.TEXTURE_2D||$>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,X,$,Rt.__webglTexture,ft),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ut(E,_,B){if(n.bindRenderbuffer(n.RENDERBUFFER,E),_.depthBuffer){let X=_.depthTexture,$=X&&X.isDepthTexture?X.type:null,ft=b(_.stencilBuffer,$),ut=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;kt(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Pt(_),ft,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,Pt(_),ft,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ft,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ut,n.RENDERBUFFER,E)}else{let X=_.textures;for(let $=0;$<X.length;$++){let ft=X[$],ut=r.convert(ft.format,ft.colorSpace),Q=r.convert(ft.type),z=v(ft.internalFormat,ut,Q,ft.normalized,ft.colorSpace);kt(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Pt(_),z,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,Pt(_),z,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,z,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Kt(E,_,B){let X=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let $=i.get(_.depthTexture);if($.__renderTarget=_,(!$.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),X){if($.__webglInit===void 0&&($.__webglInit=!0,_.depthTexture.addEventListener("dispose",C)),$.__webglTexture===void 0){$.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),qt(n.TEXTURE_CUBE_MAP,_.depthTexture);let _t=r.convert(_.depthTexture.format),Rt=r.convert(_.depthTexture.type),gt;_.depthTexture.format===Wn?gt=n.DEPTH_COMPONENT24:_.depthTexture.format===Pi&&(gt=n.DEPTH24_STENCIL8);for(let yt=0;yt<6;yt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,gt,_.width,_.height,0,_t,Rt,null)}}else it(_.depthTexture,0);let ft=$.__webglTexture,ut=Pt(_),Q=X?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,z=_.depthTexture.format===Pi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Wn)kt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,z,Q,ft,0,ut):n.framebufferTexture2D(n.FRAMEBUFFER,z,Q,ft,0);else if(_.depthTexture.format===Pi)kt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,z,Q,ft,0,ut):n.framebufferTexture2D(n.FRAMEBUFFER,z,Q,ft,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function R(E){let _=i.get(E),B=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){let X=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),X){let $=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,X.removeEventListener("dispose",$)};X.addEventListener("dispose",$),_.__depthDisposeCallback=$}_.__boundDepthTexture=X}if(E.depthTexture&&!_.__autoAllocateDepthBuffer)if(B)for(let X=0;X<6;X++)Kt(_.__webglFramebuffer[X],E,X);else{let X=E.texture.mipmaps;X&&X.length>0?Kt(_.__webglFramebuffer[0],E,0):Kt(_.__webglFramebuffer,E,0)}else if(B){_.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[X]),_.__webglDepthbuffer[X]===void 0)_.__webglDepthbuffer[X]=n.createRenderbuffer(),Ut(_.__webglDepthbuffer[X],E,!1);else{let $=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ft=_.__webglDepthbuffer[X];n.bindRenderbuffer(n.RENDERBUFFER,ft),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,ft)}}else{let X=E.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Ut(_.__webglDepthbuffer,E,!1);else{let $=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ft=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ft),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,ft)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function V(E,_,B){let X=i.get(E);_!==void 0&&bt(X.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&R(E)}function K(E){let _=E.texture,B=i.get(E),X=i.get(_);E.addEventListener("dispose",x);let $=E.textures,ft=E.isWebGLCubeRenderTarget===!0,ut=$.length>1;if(ut||(X.__webglTexture===void 0&&(X.__webglTexture=n.createTexture()),X.__version=_.version,a.memory.textures++),ft){B.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[Q]=[];for(let z=0;z<_.mipmaps.length;z++)B.__webglFramebuffer[Q][z]=n.createFramebuffer()}else B.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let Q=0;Q<_.mipmaps.length;Q++)B.__webglFramebuffer[Q]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(ut)for(let Q=0,z=$.length;Q<z;Q++){let _t=i.get($[Q]);_t.__webglTexture===void 0&&(_t.__webglTexture=n.createTexture(),a.memory.textures++)}if(E.samples>0&&kt(E)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Q=0;Q<$.length;Q++){let z=$[Q];B.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[Q]);let _t=r.convert(z.format,z.colorSpace),Rt=r.convert(z.type),gt=v(z.internalFormat,_t,Rt,z.normalized,z.colorSpace,E.isXRRenderTarget===!0),yt=Pt(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,yt,gt,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,B.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),Ut(B.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ft){e.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture),qt(n.TEXTURE_CUBE_MAP,_);for(let Q=0;Q<6;Q++)if(_.mipmaps&&_.mipmaps.length>0)for(let z=0;z<_.mipmaps.length;z++)bt(B.__webglFramebuffer[Q][z],E,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,z);else bt(B.__webglFramebuffer[Q],E,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);p(_)&&S(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ut){for(let Q=0,z=$.length;Q<z;Q++){let _t=$[Q],Rt=i.get(_t),gt=n.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(gt=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(gt,Rt.__webglTexture),qt(gt,_t),bt(B.__webglFramebuffer,E,_t,n.COLOR_ATTACHMENT0+Q,gt,0),p(_t)&&S(gt)}e.unbindTexture()}else{let Q=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Q=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Q,X.__webglTexture),qt(Q,_),_.mipmaps&&_.mipmaps.length>0)for(let z=0;z<_.mipmaps.length;z++)bt(B.__webglFramebuffer[z],E,_,n.COLOR_ATTACHMENT0,Q,z);else bt(B.__webglFramebuffer,E,_,n.COLOR_ATTACHMENT0,Q,0);p(_)&&S(Q),e.unbindTexture()}E.depthBuffer&&R(E)}function st(E){let _=E.textures;for(let B=0,X=_.length;B<X;B++){let $=_[B];if(p($)){let ft=A(E),ut=i.get($).__webglTexture;e.bindTexture(ft,ut),S(ft),e.unbindTexture()}}}let lt=[],vt=[];function mt(E){if(E.samples>0){if(kt(E)===!1){let _=E.textures,B=E.width,X=E.height,$=n.COLOR_BUFFER_BIT,ft=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ut=i.get(E),Q=_.length>1;if(Q)for(let _t=0;_t<_.length;_t++)e.bindFramebuffer(n.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ut.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ut.__webglMultisampledFramebuffer);let z=E.texture.mipmaps;z&&z.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ut.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ut.__webglFramebuffer);for(let _t=0;_t<_.length;_t++){if(E.resolveDepthBuffer&&(E.depthBuffer&&($|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&($|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ut.__webglColorRenderbuffer[_t]);let Rt=i.get(_[_t]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Rt,0)}n.blitFramebuffer(0,0,B,X,0,0,B,X,$,n.NEAREST),c===!0&&(lt.length=0,vt.length=0,lt.push(n.COLOR_ATTACHMENT0+_t),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&(lt.push(ft),vt.push(ft),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,vt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,lt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let _t=0;_t<_.length;_t++){e.bindFramebuffer(n.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.RENDERBUFFER,ut.__webglColorRenderbuffer[_t]);let Rt=i.get(_[_t]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ut.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.TEXTURE_2D,Rt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ut.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&c){let _=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function Pt(E){return Math.min(s.maxSamples,E.samples)}function kt(E){let _=i.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function I(E){let _=a.render.frame;h.get(E)!==_&&(h.set(E,_),E.update())}function ee(E,_){let B=E.colorSpace,X=E.format,$=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||B!==rr&&B!==ri&&(oe.getTransfer(B)===pe?(X!==En||$!==ln)&&Xt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Yt("WebGLTextures: Unsupported texture color space:",B)),_}function $t(E){return typeof HTMLImageElement!="undefined"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame!="undefined"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=tt,this.resetTextureUnits=W,this.getTextureUnits=L,this.setTextureUnits=H,this.setTexture2D=it,this.setTexture2DArray=J,this.setTexture3D=rt,this.setTextureCube=at,this.rebindTextures=V,this.setupRenderTarget=K,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=mt,this.setupDepthRenderbuffer=R,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=kt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function z_(n,t){function e(i,s=ri){let r,a=oe.getTransfer(s);if(i===ln)return n.UNSIGNED_BYTE;if(i===io)return n.UNSIGNED_SHORT_4_4_4_4;if(i===so)return n.UNSIGNED_SHORT_5_5_5_1;if(i===sc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===rc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===nc)return n.BYTE;if(i===ic)return n.SHORT;if(i===zs)return n.UNSIGNED_SHORT;if(i===no)return n.INT;if(i===Fn)return n.UNSIGNED_INT;if(i===On)return n.FLOAT;if(i===Bn)return n.HALF_FLOAT;if(i===ac)return n.ALPHA;if(i===oc)return n.RGB;if(i===En)return n.RGBA;if(i===Wn)return n.DEPTH_COMPONENT;if(i===Pi)return n.DEPTH_STENCIL;if(i===lc)return n.RED;if(i===ro)return n.RED_INTEGER;if(i===Ii)return n.RG;if(i===ao)return n.RG_INTEGER;if(i===oo)return n.RGBA_INTEGER;if(i===Fr||i===Or||i===Br||i===zr)if(a===pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Fr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Fr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Or)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Br)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===zr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===lo||i===co||i===ho||i===uo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===lo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===co)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ho)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===uo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===fo||i===po||i===mo||i===go||i===_o||i===kr||i===xo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===fo||i===po)return a===pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===mo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===go)return r.COMPRESSED_R11_EAC;if(i===_o)return r.COMPRESSED_SIGNED_R11_EAC;if(i===kr)return r.COMPRESSED_RG11_EAC;if(i===xo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===yo||i===vo||i===Mo||i===So||i===bo||i===wo||i===To||i===Eo||i===Ao||i===Co||i===Ro||i===Po||i===Io||i===Lo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===yo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===vo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Mo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===So)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===bo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===wo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===To)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Eo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ao)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Co)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ro)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Po)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Io)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Lo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Do||i===No||i===Uo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Do)return a===pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===No)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Uo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Fo||i===Oo||i===Vr||i===Bo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Fo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Oo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Vr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Bo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ks?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var k_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,V_=`
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

}`,Uc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new mr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new _n({vertexShader:k_,fragmentShader:V_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Jt(new si(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Fc=class extends Dn{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,f=null,d=null,u=null,m=null,y=typeof XRWebGLBinding!="undefined",g=new Uc,p={},S=e.getContextAttributes(),A=null,v=null,b=[],w=[],C=new ht,x=null,T=null,P=new Ge;P.viewport=new we;let D=new Ge;D.viewport=new we;let F=[P,D],W=new Ka,L=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(et){let nt=b[et];return nt===void 0&&(nt=new As,b[et]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(et){let nt=b[et];return nt===void 0&&(nt=new As,b[et]=nt),nt.getGripSpace()},this.getHand=function(et){let nt=b[et];return nt===void 0&&(nt=new As,b[et]=nt),nt.getHandSpace()};function tt(et){let nt=w.indexOf(et.inputSource);if(nt===-1)return;let pt=b[nt];pt!==void 0&&(pt.update(et.inputSource,et.frame,l||a),pt.dispatchEvent({type:et.type,data:et.inputSource}))}function j(){s.removeEventListener("select",tt),s.removeEventListener("selectstart",tt),s.removeEventListener("selectend",tt),s.removeEventListener("squeeze",tt),s.removeEventListener("squeezestart",tt),s.removeEventListener("squeezeend",tt),s.removeEventListener("end",j),s.removeEventListener("inputsourceschange",it);for(let et=0;et<b.length;et++){let nt=w[et];nt!==null&&(w[et]=null,b[et].disconnect(nt))}L=null,H=null,g.reset();for(let et in p)delete p[et];if(t.setRenderTarget(A),u=null,d=null,f=null,s=null,v=null,te.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(C.width,C.height,!1),T!==null){let et=T.camera;et.fov=T.fov,et.zoom=T.zoom,et.updateProjectionMatrix(),T=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(et){r=et,i.isPresenting===!0&&Xt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(et){o=et,i.isPresenting===!0&&Xt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(et){l=et},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return f===null&&y&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(et){if(s=et,s!==null){if(A=t.getRenderTarget(),s.addEventListener("select",tt),s.addEventListener("selectstart",tt),s.addEventListener("selectend",tt),s.addEventListener("squeeze",tt),s.addEventListener("squeezestart",tt),s.addEventListener("squeezeend",tt),s.addEventListener("end",j),s.addEventListener("inputsourceschange",it),S.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(C),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let pt=null,Gt=null,bt=null;S.depth&&(bt=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=S.stencil?Pi:Wn,Gt=S.stencil?ks:Fn);let Ut={colorFormat:e.RGBA8,depthFormat:bt,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(Ut),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),v=new an(d.textureWidth,d.textureHeight,{format:En,type:ln,depthTexture:new Mi(d.textureWidth,d.textureHeight,Gt,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let pt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(s,e,pt),s.updateRenderState({baseLayer:u}),t.setPixelRatio(1),t.setSize(u.framebufferWidth,u.framebufferHeight,!1),v=new an(u.framebufferWidth,u.framebufferHeight,{format:En,type:ln,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),te.setContext(s),te.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function it(et){for(let nt=0;nt<et.removed.length;nt++){let pt=et.removed[nt],Gt=w.indexOf(pt);Gt>=0&&(w[Gt]=null,b[Gt].disconnect(pt))}for(let nt=0;nt<et.added.length;nt++){let pt=et.added[nt],Gt=w.indexOf(pt);if(Gt===-1){for(let Ut=0;Ut<b.length;Ut++)if(Ut>=w.length){w.push(pt),Gt=Ut;break}else if(w[Ut]===null){w[Ut]=pt,Gt=Ut;break}if(Gt===-1)break}let bt=b[Gt];bt&&bt.connect(pt)}}let J=new N,rt=new N;function at(et,nt,pt){J.setFromMatrixPosition(nt.matrixWorld),rt.setFromMatrixPosition(pt.matrixWorld);let Gt=J.distanceTo(rt),bt=nt.projectionMatrix.elements,Ut=pt.projectionMatrix.elements,Kt=bt[14]/(bt[10]-1),R=bt[14]/(bt[10]+1),V=(bt[9]+1)/bt[5],K=(bt[9]-1)/bt[5],st=(bt[8]-1)/bt[0],lt=(Ut[8]+1)/Ut[0],vt=Kt*st,mt=Kt*lt,Pt=Gt/(-st+lt),kt=Pt*-st;if(nt.matrixWorld.decompose(et.position,et.quaternion,et.scale),et.translateX(kt),et.translateZ(Pt),et.matrixWorld.compose(et.position,et.quaternion,et.scale),et.matrixWorldInverse.copy(et.matrixWorld).invert(),bt[10]===-1)et.projectionMatrix.copy(nt.projectionMatrix),et.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{let I=Kt+Pt,ee=R+Pt,$t=vt-kt,E=mt+(Gt-kt),_=V*R/ee*I,B=K*R/ee*I;et.projectionMatrix.makePerspective($t,E,_,B,I,ee),et.projectionMatrixInverse.copy(et.projectionMatrix).invert()}}function St(et,nt){nt===null?et.matrixWorld.copy(et.matrix):et.matrixWorld.multiplyMatrices(nt.matrixWorld,et.matrix),et.matrixWorldInverse.copy(et.matrixWorld).invert()}this.updateCamera=function(et){if(s===null)return;let nt=et.near,pt=et.far;g.texture!==null&&(g.depthNear>0&&(nt=g.depthNear),g.depthFar>0&&(pt=g.depthFar)),W.near=D.near=P.near=nt,W.far=D.far=P.far=pt,(L!==W.near||H!==W.far)&&(s.updateRenderState({depthNear:W.near,depthFar:W.far}),L=W.near,H=W.far),W.layers.mask=et.layers.mask|6,P.layers.mask=W.layers.mask&-5,D.layers.mask=W.layers.mask&-3;let Gt=et.parent,bt=W.cameras;St(W,Gt);for(let Ut=0;Ut<bt.length;Ut++)St(bt[Ut],Gt);bt.length===2?at(W,P,D):W.projectionMatrix.copy(P.projectionMatrix),T===null&&et.isPerspectiveCamera&&(T={camera:et,fov:et.fov,zoom:et.zoom}),Ct(et,W,Gt)};function Ct(et,nt,pt){pt===null?et.matrix.copy(nt.matrixWorld):(et.matrix.copy(pt.matrixWorld),et.matrix.invert(),et.matrix.multiply(nt.matrixWorld)),et.matrix.decompose(et.position,et.quaternion,et.scale),et.updateMatrixWorld(!0),et.projectionMatrix.copy(nt.projectionMatrix),et.projectionMatrixInverse.copy(nt.projectionMatrixInverse),et.isPerspectiveCamera&&(et.fov=Ts*2*Math.atan(1/et.projectionMatrix.elements[5]),et.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(d===null&&u===null))return c},this.setFoveation=function(et){c=et,d!==null&&(d.fixedFoveation=et),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=et)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(W)},this.getCameraTexture=function(et){return p[et]};let Wt=null;function qt(et,nt){if(h=nt.getViewerPose(l||a),m=nt,h!==null){let pt=h.views;u!==null&&(t.setRenderTargetFramebuffer(v,u.framebuffer),t.setRenderTarget(v));let Gt=!1;pt.length!==W.cameras.length&&(W.cameras.length=0,Gt=!0);for(let R=0;R<pt.length;R++){let V=pt[R],K=null;if(u!==null)K=u.getViewport(V);else{let lt=f.getViewSubImage(d,V);K=lt.viewport,R===0&&(t.setRenderTargetTextures(v,lt.colorTexture,lt.depthStencilTexture),t.setRenderTarget(v))}let st=F[R];st===void 0&&(st=new Ge,st.layers.enable(R),st.viewport=new we,F[R]=st),st.matrix.fromArray(V.transform.matrix),st.matrix.decompose(st.position,st.quaternion,st.scale),st.projectionMatrix.fromArray(V.projectionMatrix),st.projectionMatrixInverse.copy(st.projectionMatrix).invert(),st.viewport.set(K.x,K.y,K.width,K.height),R===0&&(W.matrix.copy(st.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Gt===!0&&W.cameras.push(st)}let bt=s.enabledFeatures;if(bt&&bt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){f=i.getBinding();let R=f.getDepthInformation(pt[0]);R&&R.isValid&&R.texture&&g.init(R,s.renderState)}if(bt&&bt.includes("camera-access")&&y){t.state.unbindTexture(),f=i.getBinding();for(let R=0;R<pt.length;R++){let V=pt[R].camera;if(V){let K=p[V];K||(K=new mr,p[V]=K);let st=f.getCameraImage(V);K.sourceTexture=st}}}}for(let pt=0;pt<b.length;pt++){let Gt=w[pt],bt=b[pt];Gt!==null&&bt!==void 0&&bt.update(Gt,nt,l||a)}Wt&&Wt(et,nt),nt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:nt}),m=null}let te=new Hu;te.setAnimationLoop(qt),this.setAnimationLoop=function(et){Wt=et},this.dispose=function(){}}},G_=new be,Zu=new Zt;Zu.set(-1,0,0,0,1,0,0,0,1);function H_(n,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,fc(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,S,A,v){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),f(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&u(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),y(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,S,A):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===sn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===sn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let S=t.get(p),A=S.envMap,v=S.envMapRotation;A&&(g.envMap.value=A,g.envMapRotation.value.setFromMatrix4(G_.makeRotationFromEuler(v)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Zu),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,S,A){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*S,g.scale.value=A*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function u(g,p,S){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===sn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let S=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function W_(n,t,e,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,b){let w=b.program;i.uniformBlockBinding(v,w)}function l(v,b){let w=s[v.id];w===void 0&&(g(v),w=h(v),s[v.id]=w,v.addEventListener("dispose",S));let C=b.program;i.updateUBOMapping(v,C);let x=t.render.frame;r[v.id]!==x&&(d(v),r[v.id]=x)}function h(v){let b=f();v.__bindingPointIndex=b;let w=n.createBuffer(),C=v.__size,x=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,C,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,w),w}function f(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Yt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){let b=s[v.id],w=v.uniforms,C=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let x=0,T=w.length;x<T;x++){let P=w[x];if(Array.isArray(P))for(let D=0,F=P.length;D<F;D++)u(P[D],x,D,C);else u(P,x,0,C)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function u(v,b,w,C){if(y(v,b,w,C)===!0){let x=v.__offset,T=v.value;if(Array.isArray(T)){let P=0;for(let D=0;D<T.length;D++){let F=T[D],W=p(F);m(F,v.__data,P),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(P+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(T,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,v.__data)}}function m(v,b,w){typeof v=="number"||typeof v=="boolean"?b[0]=v:v.isMatrix3?(b[0]=v.elements[0],b[1]=v.elements[1],b[2]=v.elements[2],b[3]=0,b[4]=v.elements[3],b[5]=v.elements[4],b[6]=v.elements[5],b[7]=0,b[8]=v.elements[6],b[9]=v.elements[7],b[10]=v.elements[8],b[11]=0):ArrayBuffer.isView(v)?b.set(new v.constructor(v.buffer,v.byteOffset,b.length)):v.toArray(b,w)}function y(v,b,w,C){let x=v.value,T=b+"_"+w;if(C[T]===void 0)return typeof x=="number"||typeof x=="boolean"?C[T]=x:ArrayBuffer.isView(x)?C[T]=x.slice():C[T]=x.clone(),!0;{let P=C[T];if(typeof x=="number"||typeof x=="boolean"){if(P!==x)return C[T]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(P.equals(x)===!1)return P.copy(x),!0}}return!1}function g(v){let b=v.uniforms,w=0,C=16;for(let T=0,P=b.length;T<P;T++){let D=Array.isArray(b[T])?b[T]:[b[T]];for(let F=0,W=D.length;F<W;F++){let L=D[F],H=Array.isArray(L.value)?L.value:[L.value];for(let tt=0,j=H.length;tt<j;tt++){let it=H[tt],J=p(it),rt=w%C,at=rt%J.boundary,St=rt+at;w+=at,St!==0&&C-St<J.storage&&(w+=C-St),L.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=w,w+=J.storage}}}let x=w%C;return x>0&&(w+=C-x),v.__size=w,v.__cache={},this}function p(v){let b={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(b.boundary=4,b.storage=4):v.isVector2?(b.boundary=8,b.storage=8):v.isVector3||v.isColor?(b.boundary=16,b.storage=12):v.isVector4?(b.boundary=16,b.storage=16):v.isMatrix3?(b.boundary=48,b.storage=48):v.isMatrix4?(b.boundary=64,b.storage=64):v.isTexture?Xt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(b.boundary=16,b.storage=v.byteLength):Xt("WebGLRenderer: Unsupported uniform value type.",v),b}function S(v){let b=v.target;b.removeEventListener("dispose",S);let w=a.indexOf(b.__bindingPointIndex);a.splice(w,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function A(){for(let v in s)n.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:c,update:l,dispose:A}}var X_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),qn=null;function q_(){return qn===null&&(qn=new Ra(X_,16,16,Ii,Bn),qn.name="DFG_LUT",qn.minFilter=He,qn.magFilter=He,qn.wrapS=Gn,qn.wrapT=Gn,qn.generateMipmaps=!1,qn.needsUpdate=!0),qn}var qo=class{constructor(t={}){let{canvas:e=hu(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:u=ln}=t;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext!="undefined"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;let y=u,g=new Set([oo,ao,ro]),p=new Set([ln,Fn,zs,ks,io,so]),S=new Uint32Array(4),A=new Int32Array(4),v=new N,b=null,w=null,C=[],x=[],T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Un,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,D=!1,F=null,W=null,L=null,H=null;this._outputColorSpace=Ae;let tt=0,j=0,it=null,J=-1,rt=null,at=new we,St=new we,Ct=null,Wt=new Qt(0),qt=0,te=e.width,et=e.height,nt=1,pt=null,Gt=null,bt=new we(0,0,te,et),Ut=new we(0,0,te,et),Kt=!1,R=new Ps,V=!1,K=!1,st=new be,lt=new N,vt=new we,mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Pt=!1;function kt(){return it===null?nt:1}let I=i;function ee(M,O){return e.getContext(M,O)}let $t,E,_,B,X,$,ft,ut,Q,z,_t,Rt,gt,yt,zt,Ht,jt,U,Mt,ot,xt,wt,ct;try{let M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",re,!1),e.addEventListener("webglcontextrestored",he,!1),e.addEventListener("webglcontextcreationerror",rn,!1),I===null){let O="webgl2";if(I=ee(O,M),I===null)throw ee(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}It()}catch(M){throw e.removeEventListener("webglcontextlost",re,!1),e.removeEventListener("webglcontextrestored",he,!1),e.removeEventListener("webglcontextcreationerror",rn,!1),Yt("WebGLRenderer: "+M.message),M}function It(){$t=new Qm(I),$t.init(),xt=new z_(I,$t),E=new Hm(I,$t,t,xt),_=new O_(I,$t),E.reversedDepthBuffer&&d&&_.buffers.depth.setReversed(!0),W=I.createFramebuffer(),L=I.createFramebuffer(),H=I.createFramebuffer(),B=new ng(I),X=new b_,$=new B_(I,$t,_,X,E,xt,B),ft=new jm(P),ut=new sp(I),wt=new Vm(I,ut),Q=new tg(I,ut,B,wt),z=new sg(I,Q,ut,wt,B),U=new ig(I,E,$),zt=new Wm(X),_t=new S_(P,ft,$t,E,wt,zt),Rt=new H_(P,X),gt=new T_,yt=new I_($t),jt=new km(P,ft,_,z,m,c),Ht=new F_(P,z,E),ct=new W_(I,B,E,_),Mt=new Gm(I,$t,B),ot=new eg(I,$t,B),B.programs=_t.programs,P.capabilities=E,P.extensions=$t,P.properties=X,P.renderLists=gt,P.shadowMap=Ht,P.state=_,P.info=B}y!==ln&&(T=new ag(y,e.width,e.height,o,s,r));let Ft=new Fc(P,I);this.xr=Ft,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let M=$t.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=$t.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return nt},this.setPixelRatio=function(M){M!==void 0&&(nt=M,this.setSize(te,et,!1))},this.getSize=function(M){return M.set(te,et)},this.setSize=function(M,O,Y=!0){if(Ft.isPresenting){Xt("WebGLRenderer: Can't change size while VR device is presenting.");return}te=M,et=O,e.width=Math.floor(M*nt),e.height=Math.floor(O*nt),Y===!0&&(e.style.width=M+"px",e.style.height=O+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,M,O)},this.getDrawingBufferSize=function(M){return M.set(te*nt,et*nt).floor()},this.setDrawingBufferSize=function(M,O,Y){te=M,et=O,nt=Y,e.width=Math.floor(M*Y),e.height=Math.floor(O*Y),this.setViewport(0,0,M,O)},this.setEffects=function(M){if(y===ln){Yt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let O=0;O<M.length;O++)if(M[O].isOutputPass===!0){Xt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(at)},this.getViewport=function(M){return M.copy(bt)},this.setViewport=function(M,O,Y,Z){M.isVector4?bt.set(M.x,M.y,M.z,M.w):bt.set(M,O,Y,Z),_.viewport(at.copy(bt).multiplyScalar(nt).round())},this.getScissor=function(M){return M.copy(Ut)},this.setScissor=function(M,O,Y,Z){M.isVector4?Ut.set(M.x,M.y,M.z,M.w):Ut.set(M,O,Y,Z),_.scissor(St.copy(Ut).multiplyScalar(nt).round())},this.getScissorTest=function(){return Kt},this.setScissorTest=function(M){_.setScissorTest(Kt=M)},this.setOpaqueSort=function(M){pt=M},this.setTransparentSort=function(M){Gt=M},this.getClearColor=function(M){return M.copy(jt.getClearColor())},this.setClearColor=function(){jt.setClearColor(...arguments)},this.getClearAlpha=function(){return jt.getClearAlpha()},this.setClearAlpha=function(){jt.setClearAlpha(...arguments)},this.clear=function(M=!0,O=!0,Y=!0){let Z=0;if(M){let q=!1;if(it!==null){let At=it.texture.format;q=g.has(At)}if(q){let At=it.texture.type,Nt=p.has(At),Et=jt.getClearColor(),Ot=jt.getClearAlpha(),Vt=Et.r,ie=Et.g,ae=Et.b;Nt?(S[0]=Vt,S[1]=ie,S[2]=ae,S[3]=Ot,I.clearBufferuiv(I.COLOR,0,S)):(A[0]=Vt,A[1]=ie,A[2]=ae,A[3]=Ot,I.clearBufferiv(I.COLOR,0,A))}else Z|=I.COLOR_BUFFER_BIT}O&&(Z|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(Z|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&I.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),F=M},this.dispose=function(){e.removeEventListener("webglcontextlost",re,!1),e.removeEventListener("webglcontextrestored",he,!1),e.removeEventListener("webglcontextcreationerror",rn,!1),jt.dispose(),gt.dispose(),yt.dispose(),X.dispose(),ft.dispose(),z.dispose(),wt.dispose(),ct.dispose(),_t.dispose(),Ft.dispose(),Ft.removeEventListener("sessionstart",ns),Ft.removeEventListener("sessionend",is),zn.stop()};function re(M){M.preventDefault(),hc("WebGLRenderer: Context Lost."),D=!0}function he(){hc("WebGLRenderer: Context Restored."),D=!1;let M=B.autoReset,O=Ht.enabled,Y=Ht.autoUpdate,Z=Ht.needsUpdate,q=Ht.type;It(),B.autoReset=M,Ht.enabled=O,Ht.autoUpdate=Y,Ht.needsUpdate=Z,Ht.type=q}function rn(M){Yt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Mn(M){let O=M.target;O.removeEventListener("dispose",Mn),il(O)}function il(M){sl(M),X.remove(M)}function sl(M){let O=X.get(M).programs;O!==void 0&&(O.forEach(function(Y){_t.releaseProgram(Y)}),M.isShaderMaterial&&_t.releaseShaderCache(M))}this.renderBufferDirect=function(M,O,Y,Z,q,At){O===null&&(O=mt);let Nt=q.isMesh&&q.matrixWorld.determinantAffine()<0,Et=ye(M,O,Y,Z,q);_.setMaterial(Z,Nt);let Ot=Y.index,Vt=1;if(Z.wireframe===!0){if(Ot=Q.getWireframeAttribute(Y),Ot===void 0)return;Vt=2}let ie=Y.drawRange,ae=Y.attributes.position,Bt=ie.start*Vt,fe=(ie.start+ie.count)*Vt;At!==null&&(Bt=Math.max(Bt,At.start*Vt),fe=Math.min(fe,(At.start+At.count)*Vt)),Ot!==null?(Bt=Math.max(Bt,0),fe=Math.min(fe,Ot.count)):ae!=null&&(Bt=Math.max(Bt,0),fe=Math.min(fe,ae.count));let Ie=fe-Bt;if(Ie<0||Ie===1/0)return;wt.setup(q,Z,Et,Y,Ot);let Me,_e=Mt;if(Ot!==null&&(Me=ut.get(Ot),_e=ot,_e.setIndex(Me)),q.isMesh)Z.wireframe===!0?(_.setLineWidth(Z.wireframeLinewidth*kt()),_e.setMode(I.LINES)):_e.setMode(I.TRIANGLES);else if(q.isLine){let qe=Z.linewidth;qe===void 0&&(qe=1),_.setLineWidth(qe*kt()),q.isLineSegments?_e.setMode(I.LINES):q.isLineLoop?_e.setMode(I.LINE_LOOP):_e.setMode(I.LINE_STRIP)}else q.isPoints?_e.setMode(I.POINTS):q.isSprite&&_e.setMode(I.TRIANGLES);if(q.isBatchedMesh)if($t.get("WEBGL_multi_draw"))_e.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let qe=q._multiDrawStarts,Dt=q._multiDrawCounts,Qe=q._multiDrawCount,ue=Ot?ut.get(Ot).bytesPerElement:1,Sn=X.get(Z).currentProgram.getUniforms();for(let kn=0;kn<Qe;kn++)Sn.setValue(I,"_gl_DrawID",kn),_e.render(qe[kn]/ue,Dt[kn])}else if(q.isInstancedMesh)_e.renderInstances(Bt,Ie,q.count);else if(Y.isInstancedBufferGeometry){let qe=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Dt=Math.min(Y.instanceCount,qe);_e.renderInstances(Bt,Ie,Dt)}else _e.render(Bt,Ie)};function Fi(M,O,Y,Z){F!==null&&M.isNodeMaterial&&F.setObject(Z,M),V===!0&&zt.setState(M,Y,!1),M.transparent===!0&&M.side===on&&M.forceSinglePass===!1?(M.side=sn,M.needsUpdate=!0,dt(M,O,Z),M.side=Ai,M.needsUpdate=!0,dt(M,O,Z),M.side=on):dt(M,O,Z)}this.compile=function(M,O,Y=null){Y===null&&(Y=M),F!==null&&F.renderStart(M,O,Y),w=yt.get(Y),w.init(O),x.push(w),Y.traverseVisible(function(q){q.isLight&&q.layers.test(O.layers)&&(w.pushLight(q),q.castShadow&&w.pushShadow(q))}),M!==Y&&M.traverseVisible(function(q){q.isLight&&q.layers.test(O.layers)&&(w.pushLight(q),q.castShadow&&w.pushShadow(q))}),w.setupLights(),F!==null&&F.updateLights(w.state.lightsArray),K=this.localClippingEnabled,V=zt.init(this.clippingPlanes,K),V===!0&&zt.setGlobalState(this.clippingPlanes,O),F!==null&&Ht.render(w.state.shadowsArray,Y,O);let Z=new Set;return M.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let At=q.material;if(At)if(Array.isArray(At))for(let Nt=0;Nt<At.length;Nt++){let Et=At[Nt];Fi(Et,Y,O,q),Z.add(Et)}else Fi(At,Y,O,q),Z.add(At)}),w=x.pop(),F!==null&&F.renderEnd(),Z},this.compileAsync=function(M,O,Y=null){let Z=this.compile(M,O,Y);return new Promise(q=>{function At(){if(Z.forEach(function(Nt){let Ot=X.get(Nt).currentProgram;(Ot===void 0||Ot.isReady())&&Z.delete(Nt)}),Z.size===0){q(M);return}setTimeout(At,10)}$t.get("KHR_parallel_shader_compile")!==null?At():setTimeout(At,10)})};let Ys=null;function es(M){Ys&&Ys(M)}function ns(){zn.stop()}function is(){zn.start()}let zn=new Hu;zn.setAnimationLoop(es),typeof self!="undefined"&&zn.setContext(self),this.setAnimationLoop=function(M){Ys=M,Ft.setAnimationLoop(M),M===null?zn.stop():zn.start()},Ft.addEventListener("sessionstart",ns),Ft.addEventListener("sessionend",is),this.render=function(M,O){if(O!==void 0&&O.isCamera!==!0){Yt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;F!==null&&F.renderStart(M,O);let Y=Ft.enabled===!0&&Ft.isPresenting===!0,Z=T!==null&&(it===null||Y)&&T.begin(P,it);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Ft.enabled===!0&&Ft.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Ft.cameraAutoUpdate===!0&&Ft.updateCamera(O),O=Ft.getCamera()),M.isScene===!0&&M.onBeforeRender(P,M,O,it),w=yt.get(M,x.length),w.init(O),w.state.textureUnits=$.getTextureUnits(),x.push(w),st.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),R.setFromProjectionMatrix(st,Ln,O.reversedDepth),K=this.localClippingEnabled,V=zt.init(this.clippingPlanes,K),b=gt.get(M,C.length),b.init(),C.push(b),Ft.enabled===!0&&Ft.isPresenting===!0){let Nt=P.xr.getDepthSensingMesh();Nt!==null&&ss(Nt,O,-1/0,P.sortObjects)}ss(M,O,0,P.sortObjects),b.finish(),F!==null&&F.updateLights(w.state.lightsArray),P.sortObjects===!0&&b.sort(pt,Gt),Pt=Ft.enabled===!1||Ft.isPresenting===!1||Ft.hasDepthSensing()===!1,Pt&&jt.addToRenderList(b,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),V===!0&&zt.beginShadows();let q=w.state.shadowsArray;if(Ht.render(q,M,O),V===!0&&zt.endShadows(),(Z&&T.hasRenderPass())===!1){let Nt=b.opaque,Et=b.transmissive;if(w.setupLights(),O.isArrayCamera){let Ot=O.cameras;if(Et.length>0)for(let Vt=0,ie=Ot.length;Vt<ie;Vt++){let ae=Ot[Vt];Oi(Nt,Et,M,ae)}Pt&&jt.render(M);for(let Vt=0,ie=Ot.length;Vt<ie;Vt++){let ae=Ot[Vt];$s(b,M,ae,ae.viewport)}}else Et.length>0&&Oi(Nt,Et,M,O),Pt&&jt.render(M),$s(b,M,O)}it!==null&&j===0&&($.updateMultisampleRenderTarget(it),$.updateRenderTargetMipmap(it)),Z&&T.end(P),M.isScene===!0&&M.onAfterRender(P,M,O),wt.resetDefaultState(),J=-1,rt=null,x.pop(),x.length>0?(w=x[x.length-1],$.setTextureUnits(w.state.textureUnits),V===!0&&zt.setGlobalState(P.clippingPlanes,w.state.camera)):w=null,C.pop(),C.length>0?b=C[C.length-1]:b=null,F!==null&&F.renderEnd()};function ss(M,O,Y,Z){if(M.visible===!1)return;if(M.layers.test(O.layers)){if(M.isGroup)Y=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(O);else if(M.isLightProbeGrid)w.pushLightProbeGrid(M);else if(M.isLight)w.pushLight(M),M.castShadow&&w.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(R)){Z&&vt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(st);let Nt=z.update(M),Et=M.material;Et.visible&&b.push(M,Nt,Et,Y,vt.z,null,O)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(R))){let Nt=z.update(M),Et=M.material;if(Z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),vt.copy(M.boundingSphere.center)):(Nt.boundingSphere===null&&Nt.computeBoundingSphere(),vt.copy(Nt.boundingSphere.center)),vt.applyMatrix4(M.matrixWorld).applyMatrix4(st)),Array.isArray(Et)){let Ot=Nt.groups;for(let Vt=0,ie=Ot.length;Vt<ie;Vt++){let ae=Ot[Vt],Bt=Et[ae.materialIndex];Bt&&Bt.visible&&b.push(M,Nt,Bt,Y,vt.z,ae,O)}}else Et.visible&&b.push(M,Nt,Et,Y,vt.z,null,O)}}let At=M.children;for(let Nt=0,Et=At.length;Nt<Et;Nt++)ss(At[Nt],O,Y,Z)}function $s(M,O,Y,Z){let{opaque:q,transmissive:At,transparent:Nt}=M;w.setupLightsView(Y),V===!0&&zt.setGlobalState(P.clippingPlanes,Y),Z&&_.viewport(at.copy(Z)),q.length>0&&G(q,O,Y),At.length>0&&G(At,O,Y),Nt.length>0&&G(Nt,O,Y),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Oi(M,O,Y,Z){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[Z.id]===void 0){let Bt=$t.has("EXT_color_buffer_half_float")||$t.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[Z.id]=new an(1,1,{generateMipmaps:!0,type:Bt?Bn:ln,minFilter:Ri,samples:Math.max(4,E.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:oe.workingColorSpace})}let At=w.state.transmissionRenderTarget[Z.id],Nt=Z.viewport||at;At.setSize(Nt.z*P.transmissionResolutionScale,Nt.w*P.transmissionResolutionScale);let Et=P.getRenderTarget(),Ot=P.getActiveCubeFace(),Vt=P.getActiveMipmapLevel();P.setRenderTarget(At),P.getClearColor(Wt),qt=P.getClearAlpha(),qt<1&&P.setClearColor(16777215,.5),P.clear(),Pt&&jt.render(Y);let ie=P.toneMapping;P.toneMapping=Un;let ae=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),w.setupLightsView(Z),V===!0&&zt.setGlobalState(P.clippingPlanes,Z),G(M,Y,Z),$.updateMultisampleRenderTarget(At),$.updateRenderTargetMipmap(At),$t.has("WEBGL_multisampled_render_to_texture")===!1){let Bt=!1;for(let fe=0,Ie=O.length;fe<Ie;fe++){let Me=O[fe],{object:_e,geometry:qe,material:Dt,group:Qe}=Me;if(Dt.side===on&&_e.layers.test(Z.layers)){let ue=Dt.side;Dt.side=sn,Dt.needsUpdate=!0,k(_e,Y,Z,qe,Dt,Qe),Dt.side=ue,Dt.needsUpdate=!0,Bt=!0}}Bt===!0&&($.updateMultisampleRenderTarget(At),$.updateRenderTargetMipmap(At))}P.setRenderTarget(Et,Ot,Vt),P.setClearColor(Wt,qt),ae!==void 0&&(Z.viewport=ae),P.toneMapping=ie}function G(M,O,Y){let Z=O.isScene===!0?O.overrideMaterial:null;for(let q=0,At=M.length;q<At;q++){let Nt=M[q],{object:Et,geometry:Ot,group:Vt}=Nt,ie=Nt.material;ie.allowOverride===!0&&Z!==null&&(ie=Z),Et.layers.test(Y.layers)&&k(Et,O,Y,Ot,ie,Vt)}}function k(M,O,Y,Z,q,At){F!==null&&q.isNodeMaterial&&F.setObject(M,q),M.onBeforeRender(P,O,Y,Z,q,At),M.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),q.onBeforeRender(P,O,Y,Z,M,At),q.transparent===!0&&q.side===on&&q.forceSinglePass===!1?(q.side=sn,q.needsUpdate=!0,P.renderBufferDirect(Y,O,Z,q,M,At),q.side=Ai,q.needsUpdate=!0,P.renderBufferDirect(Y,O,Z,q,M,At),q.side=on):P.renderBufferDirect(Y,O,Z,q,M,At),M.onAfterRender(P,O,Y,Z,q,At)}function dt(M,O,Y){O.isScene!==!0&&(O=mt);let Z=X.get(M),q=w.state.lights,At=w.state.shadowsArray,Nt=q.state.version,Et=_t.getParameters(M,q.state,At,O,Y,w.state.lightProbeGridArray),Ot=_t.getProgramCacheKey(Et),Vt=Z.programs;Z.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?O.environment:null,Z.fog=O.fog;let ie=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;Z.envMap=ft.get(M.envMap||Z.environment,ie),Z.envMapRotation=Z.environment!==null&&M.envMap===null?O.environmentRotation:M.envMapRotation,Vt===void 0&&(M.addEventListener("dispose",Mn),Vt=new Map,Z.programs=Vt);let ae=Vt.get(Ot);if(ae!==void 0){if(Z.currentProgram===ae&&Z.lightsStateVersion===Nt)return ce(M,Et),ae}else Et.uniforms=_t.getUniforms(M),F!==null&&M.isNodeMaterial&&F.build(M,Y,Et),M.onBeforeCompile(Et,P),ae=_t.acquireProgram(Et,Ot),Vt.set(Ot,ae),Z.uniforms=Et.uniforms;let Bt=Z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Bt.clippingPlanes=zt.uniform),ce(M,Et),Z.needsLights=Ne(M),Z.lightsStateVersion=Nt,Z.needsLights&&(Bt.ambientLightColor.value=q.state.ambient,Bt.lightProbe.value=q.state.probe,Bt.sunLights.value=q.state.sun,Bt.sunLightShadows.value=q.state.sunShadow,Bt.directionalLights.value=q.state.directional,Bt.directionalLightShadows.value=q.state.directionalShadow,Bt.spotLights.value=q.state.spot,Bt.spotLightShadows.value=q.state.spotShadow,Bt.rectAreaLights.value=q.state.rectArea,Bt.ltc_1.value=q.state.rectAreaLTC1,Bt.ltc_2.value=q.state.rectAreaLTC2,Bt.pointLights.value=q.state.point,Bt.pointLightShadows.value=q.state.pointShadow,Bt.hemisphereLights.value=q.state.hemi,Bt.sunShadowMatrix.value=q.state.sunShadowMatrix,Bt.sunShadowCascade.value=q.state.sunShadowCascade,Bt.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Bt.spotLightMatrix.value=q.state.spotLightMatrix,Bt.spotLightMap.value=q.state.spotLightMap,Bt.pointShadowMatrix.value=q.state.pointShadowMatrix),Z.lightProbeGrid=w.state.lightProbeGridArray.length>0,Z.currentProgram=ae,Z.uniformsList=null,ae}function Lt(M){if(M.uniformsList===null){let O=M.currentProgram.getUniforms();M.uniformsList=Ws.seqWithValue(O.seq,M.uniforms)}return M.uniformsList}function ce(M,O){let Y=X.get(M);Y.outputColorSpace=O.outputColorSpace,Y.batching=O.batching,Y.batchingColor=O.batchingColor,Y.instancing=O.instancing,Y.instancingColor=O.instancingColor,Y.instancingMorph=O.instancingMorph,Y.skinning=O.skinning,Y.morphTargets=O.morphTargets,Y.morphNormals=O.morphNormals,Y.morphColors=O.morphColors,Y.morphTargetsCount=O.morphTargetsCount,Y.numClippingPlanes=O.numClippingPlanes,Y.numIntersection=O.numClipIntersection,Y.vertexAlphas=O.vertexAlphas,Y.vertexTangents=O.vertexTangents,Y.toneMapping=O.toneMapping}function xe(M,O){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;v.setFromMatrixPosition(O.matrixWorld);for(let Y=0,Z=M.length;Y<Z;Y++){let q=M[Y];if(q.texture!==null&&q.boundingBox.containsPoint(v))return q}return null}function ye(M,O,Y,Z,q){O.isScene!==!0&&(O=mt),$.resetTextureUnits();let At=O.fog,Nt=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?O.environment:null,Et=it===null?P.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:oe.workingColorSpace,Ot=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,Vt=ft.get(Z.envMap||Nt,Ot),ie=Z.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,ae=!!Y.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Bt=!!Y.morphAttributes.position,fe=!!Y.morphAttributes.normal,Ie=!!Y.morphAttributes.color,Me=Un;Z.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(Me=P.toneMapping);let _e=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,qe=_e!==void 0?_e.length:0,Dt=X.get(Z),Qe=w.state.lights;if(V===!0&&(K===!0||M!==rt)){let ve=M===rt&&Z.id===J;zt.setState(Z,M,ve)}let ue=!1;Z.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==Qe.state.version||Dt.outputColorSpace!==Et||q.isBatchedMesh&&Dt.batching===!1||!q.isBatchedMesh&&Dt.batching===!0||q.isBatchedMesh&&Dt.batchingColor===!0&&q._colorsTexture===null||q.isBatchedMesh&&Dt.batchingColor===!1&&q._colorsTexture!==null||q.isInstancedMesh&&Dt.instancing===!1||!q.isInstancedMesh&&Dt.instancing===!0||q.isSkinnedMesh&&Dt.skinning===!1||!q.isSkinnedMesh&&Dt.skinning===!0||q.isInstancedMesh&&Dt.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Dt.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Dt.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Dt.instancingMorph===!1&&q.morphTexture!==null||Dt.envMap!==Vt||Z.fog===!0&&Dt.fog!==At||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==zt.numPlanes||Dt.numIntersection!==zt.numIntersection)||Dt.vertexAlphas!==ie||Dt.vertexTangents!==ae||Dt.morphTargets!==Bt||Dt.morphNormals!==fe||Dt.morphColors!==Ie||Dt.toneMapping!==Me||Dt.morphTargetsCount!==qe||!!Dt.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(ue=!0):(ue=!0,Dt.__version=Z.version);let Sn=Dt.currentProgram;ue===!0&&(Sn=dt(Z,O,q),F&&Z.isNodeMaterial&&F.onUpdateProgram(Z,Sn,Dt));let kn=!1,hi=!1,rs=!1,ge=Sn.getUniforms(),Re=Dt.uniforms;if(_.useProgram(Sn.program)&&(kn=!0,hi=!0,rs=!0),Z.id!==J&&(J=Z.id,hi=!0),Dt.needsLights){let ve=xe(w.state.lightProbeGridArray,q);Dt.lightProbeGrid!==ve&&(Dt.lightProbeGrid=ve,hi=!0)}if(kn||rt!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ge.setValue(I,"projectionMatrix",M.projectionMatrix),ge.setValue(I,"viewMatrix",M.matrixWorldInverse);let di=ge.map.cameraPosition;di!==void 0&&di.setValue(I,lt.setFromMatrixPosition(M.matrixWorld)),E.logarithmicDepthBuffer&&ge.setValue(I,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&ge.setValue(I,"isOrthographic",M.isOrthographicCamera===!0),rt!==M&&(rt=M,hi=!0,rs=!0)}if(Dt.needsLights&&(Qe.state.sunShadowMap.length>0&&ge.setValue(I,"sunShadowMap",Qe.state.sunShadowMap,$),Qe.state.directionalShadowMap.length>0&&ge.setValue(I,"directionalShadowMap",Qe.state.directionalShadowMap,$),Qe.state.spotShadowMap.length>0&&ge.setValue(I,"spotShadowMap",Qe.state.spotShadowMap,$),Qe.state.pointShadowMap.length>0&&ge.setValue(I,"pointShadowMap",Qe.state.pointShadowMap,$)),q.isSkinnedMesh){ge.setOptional(I,q,"bindMatrix"),ge.setOptional(I,q,"bindMatrixInverse");let ve=q.skeleton;ve&&(ve.boneTexture===null&&ve.computeBoneTexture(),ge.setValue(I,"boneTexture",ve.boneTexture,$))}q.isBatchedMesh&&(ge.setOptional(I,q,"batchingTexture"),ge.setValue(I,"batchingTexture",q._matricesTexture,$),ge.setOptional(I,q,"batchingIdTexture"),ge.setValue(I,"batchingIdTexture",q._indirectTexture,$),ge.setOptional(I,q,"batchingColorTexture"),q._colorsTexture!==null&&ge.setValue(I,"batchingColorTexture",q._colorsTexture,$));let ui=Y.morphAttributes;if((ui.position!==void 0||ui.normal!==void 0||ui.color!==void 0)&&U.update(q,Y,Sn),(hi||Dt.receiveShadow!==q.receiveShadow)&&(Dt.receiveShadow=q.receiveShadow,ge.setValue(I,"receiveShadow",q.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&O.environment!==null&&(Re.envMapIntensity.value=O.environmentIntensity),Re.dfgLUT!==void 0&&(Re.dfgLUT.value=q_()),hi){if(ge.setValue(I,"toneMappingExposure",P.toneMappingExposure),Dt.needsLights&&Xe(Re,rs),At&&Z.fog===!0&&Rt.refreshFogUniforms(Re,At),Rt.refreshMaterialUniforms(Re,Z,nt,et,w.state.transmissionRenderTarget[M.id]),Dt.needsLights&&Dt.lightProbeGrid){let ve=Dt.lightProbeGrid;Re.probesSH.value=ve.texture,Re.probesMin.value.copy(ve.boundingBox.min),Re.probesMax.value.copy(ve.boundingBox.max),Re.probesResolution.value.copy(ve.resolution)}Ws.upload(I,Lt(Dt),Re,$)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Ws.upload(I,Lt(Dt),Re,$),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&ge.setValue(I,"center",q.center),ge.setValue(I,"modelViewMatrix",q.modelViewMatrix),ge.setValue(I,"normalMatrix",q.normalMatrix),ge.setValue(I,"modelMatrix",q.matrixWorld),Z.uniformsGroups!==void 0){let ve=Z.uniformsGroups;for(let di=0,as=ve.length;di<as;di++){let eh=ve[di];ct.update(eh,Sn),ct.bind(eh,Sn)}}return Sn}function Xe(M,O){M.ambientLightColor.needsUpdate=O,M.lightProbe.needsUpdate=O,M.sunLights.needsUpdate=O,M.sunLightShadows.needsUpdate=O,M.directionalLights.needsUpdate=O,M.directionalLightShadows.needsUpdate=O,M.pointLights.needsUpdate=O,M.pointLightShadows.needsUpdate=O,M.spotLights.needsUpdate=O,M.spotLightShadows.needsUpdate=O,M.rectAreaLights.needsUpdate=O,M.hemisphereLights.needsUpdate=O}function Ne(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return tt},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return it},this.setRenderTargetTextures=function(M,O,Y){let Z=X.get(M);Z.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),X.get(M.texture).__webglTexture=O,X.get(M.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:Y,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,O){let Y=X.get(M);Y.__webglFramebuffer=O,Y.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(M,O=0,Y=0){it=M,tt=O,j=Y;let Z=null,q=!1,At=!1;if(M){let Et=X.get(M);if(Et.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(I.FRAMEBUFFER,Et.__webglFramebuffer),at.copy(M.viewport),St.copy(M.scissor),Ct=M.scissorTest,_.viewport(at),_.scissor(St),_.setScissorTest(Ct),J=-1;return}else if(Et.__webglFramebuffer===void 0)$.setupRenderTarget(M);else if(Et.__hasExternalTextures)$.rebindTextures(M,X.get(M.texture).__webglTexture,X.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let ie=M.depthTexture;if(Et.__boundDepthTexture!==ie){if(ie!==null&&X.has(ie)&&(M.width!==ie.image.width||M.height!==ie.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(M)}}let Ot=M.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(At=!0);let Vt=X.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Vt[O])?Z=Vt[O][Y]:Z=Vt[O],q=!0):M.samples>0&&$.useMultisampledRTT(M)===!1?Z=X.get(M).__webglMultisampledFramebuffer:Array.isArray(Vt)?Z=Vt[Y]:Z=Vt,at.copy(M.viewport),St.copy(M.scissor),Ct=M.scissorTest}else at.copy(bt).multiplyScalar(nt).floor(),St.copy(Ut).multiplyScalar(nt).floor(),Ct=Kt;if(Y!==0&&(Z=W),_.bindFramebuffer(I.FRAMEBUFFER,Z)&&_.drawBuffers(M,Z),_.viewport(at),_.scissor(St),_.setScissorTest(Ct),q){let Et=X.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+O,Et.__webglTexture,Y)}else if(At){let Et=O;for(let Ot=0;Ot<M.textures.length;Ot++){let Vt=X.get(M.textures[Ot]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Ot,Vt.__webglTexture,Y,Et)}}else if(M!==null&&Y!==0){let Et=X.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Et.__webglTexture,Y)}J=-1};function un(M){let O=X.get(M);return(O.__readFormat!==M.format||O.__readType!==M.type)&&(O.__readFormat=M.format,O.__readType=M.type,O.__formatReadable=E.textureFormatReadable(M.format),O.__typeReadable=E.textureTypeReadable(M.type)),O}this.readRenderTargetPixels=function(M,O,Y,Z,q,At,Nt,Et=0){if(!(M&&M.isWebGLRenderTarget)){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ot=X.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Nt!==void 0&&(Ot=Ot[Nt]),Ot){_.bindFramebuffer(I.FRAMEBUFFER,Ot);try{let Vt=M.textures[Et],ie=Vt.format,ae=Vt.type;M.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Et);let Bt=un(Vt);if(Bt.__formatReadable===!1){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Bt.__typeReadable===!1){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=M.width-Z&&Y>=0&&Y<=M.height-q&&I.readPixels(O,Y,Z,q,xt.convert(ie),xt.convert(ae),At)}finally{let Vt=it!==null?X.get(it).__webglFramebuffer:null;_.bindFramebuffer(I.FRAMEBUFFER,Vt)}}},this.readRenderTargetPixelsAsync=async function(M,O,Y,Z,q,At,Nt,Et=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ot=X.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Nt!==void 0&&(Ot=Ot[Nt]),Ot)if(O>=0&&O<=M.width-Z&&Y>=0&&Y<=M.height-q){_.bindFramebuffer(I.FRAMEBUFFER,Ot);let Vt=M.textures[Et],ie=Vt.format,ae=Vt.type;M.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Et);let Bt=un(Vt);if(Bt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Bt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let fe=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,fe),I.bufferData(I.PIXEL_PACK_BUFFER,At.byteLength,I.STREAM_READ),I.readPixels(O,Y,Z,q,xt.convert(ie),xt.convert(ae),0),I.bindBuffer(I.PIXEL_PACK_BUFFER,null);let Ie=it!==null?X.get(it).__webglFramebuffer:null;_.bindFramebuffer(I.FRAMEBUFFER,Ie);let Me=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await du(I,Me,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,fe),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,At),I.bindBuffer(I.PIXEL_PACK_BUFFER,null),I.deleteBuffer(fe),I.deleteSync(Me),At}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,O=null,Y=0){let Z=Math.pow(2,-Y),q=Math.floor(M.image.width*Z),At=Math.floor(M.image.height*Z),Nt=O!==null?O.x:0,Et=O!==null?O.y:0;$.setTexture2D(M,0),I.copyTexSubImage2D(I.TEXTURE_2D,Y,0,0,Nt,Et,q,At),_.unbindTexture()},this.copyTextureToTexture=function(M,O,Y=null,Z=null,q=0,At=0){let Nt,Et,Ot,Vt,ie,ae,Bt,fe,Ie,Me=M.isCompressedTexture?M.mipmaps[At]:M.image;if(Y!==null)Nt=Y.max.x-Y.min.x,Et=Y.max.y-Y.min.y,Ot=Y.isBox3?Y.max.z-Y.min.z:1,Vt=Y.min.x,ie=Y.min.y,ae=Y.isBox3?Y.min.z:0;else{let Re=Math.pow(2,-q);Nt=Math.floor(Me.width*Re),Et=Math.floor(Me.height*Re),M.isDataArrayTexture?Ot=Me.depth:M.isData3DTexture?Ot=Math.floor(Me.depth*Re):Ot=1,Vt=0,ie=0,ae=0}Z!==null?(Bt=Z.x,fe=Z.y,Ie=Z.z):(Bt=0,fe=0,Ie=0);let _e=xt.convert(O.format),qe=xt.convert(O.type),Dt;O.isData3DTexture?($.setTexture3D(O,0),Dt=I.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?($.setTexture2DArray(O,0),Dt=I.TEXTURE_2D_ARRAY):($.setTexture2D(O,0),Dt=I.TEXTURE_2D),_.activeTexture(I.TEXTURE0),_.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,O.flipY),_.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),_.pixelStorei(I.UNPACK_ALIGNMENT,O.unpackAlignment);let Qe=_.getParameter(I.UNPACK_ROW_LENGTH),ue=_.getParameter(I.UNPACK_IMAGE_HEIGHT),Sn=_.getParameter(I.UNPACK_SKIP_PIXELS),kn=_.getParameter(I.UNPACK_SKIP_ROWS),hi=_.getParameter(I.UNPACK_SKIP_IMAGES);_.pixelStorei(I.UNPACK_ROW_LENGTH,Me.width),_.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Me.height),_.pixelStorei(I.UNPACK_SKIP_PIXELS,Vt),_.pixelStorei(I.UNPACK_SKIP_ROWS,ie),_.pixelStorei(I.UNPACK_SKIP_IMAGES,ae);let rs=M.isDataArrayTexture||M.isData3DTexture,ge=O.isDataArrayTexture||O.isData3DTexture;if(M.isDepthTexture){let Re=X.get(M),ui=X.get(O),ve=X.get(Re.__renderTarget),di=X.get(ui.__renderTarget);_.bindFramebuffer(I.READ_FRAMEBUFFER,ve.__webglFramebuffer),_.bindFramebuffer(I.DRAW_FRAMEBUFFER,di.__webglFramebuffer);for(let as=0;as<Ot;as++)rs&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,X.get(M).__webglTexture,q,ae+as),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,X.get(O).__webglTexture,At,Ie+as)),I.blitFramebuffer(Vt,ie,Nt,Et,Bt,fe,Nt,Et,I.DEPTH_BUFFER_BIT,I.NEAREST);_.bindFramebuffer(I.READ_FRAMEBUFFER,null),_.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(q!==0||M.isRenderTargetTexture||X.has(M)){let Re=X.get(M),ui=X.get(O);_.bindFramebuffer(I.READ_FRAMEBUFFER,L),_.bindFramebuffer(I.DRAW_FRAMEBUFFER,H);for(let ve=0;ve<Ot;ve++)rs?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Re.__webglTexture,q,ae+ve):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Re.__webglTexture,q),ge?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ui.__webglTexture,At,Ie+ve):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ui.__webglTexture,At),q!==0?I.blitFramebuffer(Vt,ie,Nt,Et,Bt,fe,Nt,Et,I.COLOR_BUFFER_BIT,I.NEAREST):ge?I.copyTexSubImage3D(Dt,At,Bt,fe,Ie+ve,Vt,ie,Nt,Et):I.copyTexSubImage2D(Dt,At,Bt,fe,Vt,ie,Nt,Et);_.bindFramebuffer(I.READ_FRAMEBUFFER,null),_.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else ge?M.isDataTexture||M.isData3DTexture?I.texSubImage3D(Dt,At,Bt,fe,Ie,Nt,Et,Ot,_e,qe,Me.data):O.isCompressedArrayTexture?I.compressedTexSubImage3D(Dt,At,Bt,fe,Ie,Nt,Et,Ot,_e,Me.data):I.texSubImage3D(Dt,At,Bt,fe,Ie,Nt,Et,Ot,_e,qe,Me):M.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,At,Bt,fe,Nt,Et,_e,qe,Me.data):M.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,At,Bt,fe,Me.width,Me.height,_e,Me.data):I.texSubImage2D(I.TEXTURE_2D,At,Bt,fe,Nt,Et,_e,qe,Me);_.pixelStorei(I.UNPACK_ROW_LENGTH,Qe),_.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ue),_.pixelStorei(I.UNPACK_SKIP_PIXELS,Sn),_.pixelStorei(I.UNPACK_SKIP_ROWS,kn),_.pixelStorei(I.UNPACK_SKIP_IMAGES,hi),At===0&&O.generateMipmaps&&I.generateMipmap(Dt),_.unbindTexture()},this.initRenderTarget=function(M){X.get(M).__webglFramebuffer===void 0&&$.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?$.setTextureCube(M,0):M.isData3DTexture?$.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?$.setTexture2DArray(M,0):$.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){tt=0,j=0,it=null,_.reset(),wt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=oe._getDrawingBufferColorSpace(t),e.unpackColorSpace=oe._getUnpackColorSpace()}};var Ju={type:"change"},Bc={type:"start"},ju={type:"end"},Zo=new Rs,Ku=new pn,Y_=Math.cos(70*Vs.DEG2RAD),Be=new N,cn=2*Math.PI,me={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Oc=1e-6,Jo=class extends Dr{constructor(t,e=null){super(t,e),this.state=me.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ti.ROTATE,MIDDLE:Ti.DOLLY,RIGHT:Ti.PAN},this.touches={ONE:Ei.ROTATE,TWO:Ei.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new mn,this._lastTargetPosition=new N,this._quat=new mn().setFromUnitVectors(t.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Fs,this._sphericalDelta=new Fs,this._scale=1,this._panOffset=new N,this._rotateStart=new ht,this._rotateEnd=new ht,this._rotateDelta=new ht,this._panStart=new ht,this._panEnd=new ht,this._panDelta=new ht,this._dollyStart=new ht,this._dollyEnd=new ht,this._dollyDelta=new ht,this._dollyDirection=new N,this._mouse=new ht,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Z_.bind(this),this._onPointerDown=$_.bind(this),this._onPointerUp=J_.bind(this),this._onContextMenu=ix.bind(this),this._onMouseWheel=Q_.bind(this),this._onKeyDown=tx.bind(this),this._onTouchStart=ex.bind(this),this._onTouchMove=nx.bind(this),this._onMouseDown=K_.bind(this),this._onMouseMove=j_.bind(this),this._interceptControlDown=sx.bind(this),this._interceptControlUp=rx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=me.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ju),this.update(),this.state=me.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Be.copy(e).sub(this.target),Be.applyQuaternion(this._quat),this._spherical.setFromVector3(Be),this.autoRotate&&this.state===me.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=cn:i>Math.PI&&(i-=cn),s<-Math.PI?s+=cn:s>Math.PI&&(s-=cn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Be.setFromSpherical(this._spherical),Be.applyQuaternion(this._quatInverse),e.copy(this.target).add(Be),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Be.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new N(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new N(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Be.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Zo.origin.copy(this.object.position),Zo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Zo.direction))<Y_?this.object.lookAt(this.target):(Ku.setFromNormalAndCoplanarPoint(this.object.up,this.target),Zo.intersectPlane(Ku,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Oc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Oc||this._lastTargetPosition.distanceToSquared(this.target)>Oc?(this.dispatchEvent(Ju),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?cn/60*this.autoRotateSpeed*t:cn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Be.setFromMatrixColumn(e,0),Be.multiplyScalar(-t),this._panOffset.add(Be)}_panUp(t,e){this.screenSpacePanning===!0?Be.setFromMatrixColumn(e,1):(Be.setFromMatrixColumn(e,0),Be.crossVectors(this.object.up,Be)),Be.multiplyScalar(t),this._panOffset.add(Be)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Be.copy(s).sub(this.target);let r=Be.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/e.clientHeight),this._rotateUp(cn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/e.clientHeight),this._rotateUp(cn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ht,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function $_(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Z_(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function J_(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ju),this.state=me.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function K_(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ti.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=me.DOLLY;break;case Ti.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=me.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=me.ROTATE}break;case Ti.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=me.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=me.PAN}break;default:this.state=me.NONE}this.state!==me.NONE&&this.dispatchEvent(Bc)}function j_(n){switch(this.state){case me.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case me.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case me.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Q_(n){this.enabled===!1||this.enableZoom===!1||this.state!==me.NONE||(n.preventDefault(),this.dispatchEvent(Bc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(ju))}function tx(n){this.enabled!==!1&&this._handleKeyDown(n)}function ex(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Ei.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=me.TOUCH_ROTATE;break;case Ei.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=me.TOUCH_PAN;break;default:this.state=me.NONE}break;case 2:switch(this.touches.TWO){case Ei.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=me.TOUCH_DOLLY_PAN;break;case Ei.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=me.TOUCH_DOLLY_ROTATE;break;default:this.state=me.NONE}break;default:this.state=me.NONE}this.state!==me.NONE&&this.dispatchEvent(Bc)}function nx(n){switch(this._trackPointer(n),this.state){case me.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case me.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case me.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case me.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=me.NONE}}function ix(n){this.enabled!==!1&&n.preventDefault()}function sx(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function rx(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Te=(n,t=0,e=1)=>Math.min(e,Math.max(t,n)),ai=(n,t,e)=>n+(t-n)*e,Qu=n=>{for(;n>Math.PI;)n-=2*Math.PI;for(;n<-Math.PI;)n+=2*Math.PI;return n};function ax(n,t,e,i,s){let r=(p,S)=>Math.max(1e-6,Math.hypot(S[0]-p[0],S[1]-p[1])**.5),o=0+r(n,t),c=o+r(t,e),l=c+r(e,i),h=o+(c-o)*s,f=(p,S,A,v)=>[((v-h)*p[0]+(h-A)*S[0])/(v-A),((v-h)*p[1]+(h-A)*S[1])/(v-A)],d=f(n,t,0,o),u=f(t,e,o,c),m=f(e,i,c,l),y=f(d,u,0,c),g=f(u,m,o,l);return f(y,g,o,c)}function ox(n,t){return t?n<t[0]?0:n<t[1]?1:2:1}function Li(n,{step:t=3}={}){let e=n.pts,i=e.length;if(i<2)throw new Error("a stroke needs at least two points");let s=l=>l<0?[2*e[0][0]-e[1][0],2*e[0][1]-e[1][1]]:l>=i?[2*e[i-1][0]-e[i-2][0],2*e[i-1][1]-e[i-2][1]]:e[l],r=[];for(let l=0;l<i-1;l++){let h=Math.hypot(e[l+1][0]-e[l][0],e[l+1][1]-e[l][1]),f=Math.max(1,Math.ceil(h/t));for(let d=0;d<f;d++){let u=d/f,[m,y]=ax(s(l-1),e[l],e[l+1],s(l+2),u);r.push({x:m,y,p:ai(e[l][2],e[l+1][2],u),v:ai(e[l][3],e[l+1][3],u),ctrl:l+u})}}let a=e[i-1];r.push({x:a[0],y:a[1],p:a[2],v:a[3],ctrl:i-1});let o=0,c=0;return r.forEach((l,h)=>{if(h>0){let f=r[h-1],d=Math.hypot(l.x-f.x,l.y-f.y);o+=d,c+=d/Math.max(1,(l.v+f.v)/2)}l.s=o,l.t=c,l.phase=ox(l.ctrl,n.phases)}),r}var lx=n=>n[n.length-1].s,td=n=>n[n.length-1].t;function ed(n,t){let e=n.length-1;if(t<=0)return{...n[0],i:0};if(t>=n[e].t)return{...n[e],i:e};let i=0,s=e;for(;s-i>1;){let c=i+s>>1;n[c].t<=t?i=c:s=c}let r=n[i],a=n[s],o=(t-r.t)/Math.max(1e-9,a.t-r.t);return{x:ai(r.x,a.x,o),y:ai(r.y,a.y,o),p:ai(r.p,a.p,o),s:ai(r.s,a.s,o),t,ctrl:ai(r.ctrl,a.ctrl,o),phase:r.phase,i}}var nd={tipW:6,maxW:118,maxLen:56,gamma:1.12};function zc(n,t=nd){if(!(n>.001))return null;let e=Te(n);return{hw:(t.tipW+(t.maxW-t.tipW)*e**t.gamma)/2,len:t.tipW*.5+t.maxLen*e**.9}}var id=n=>.58*Te(n)**.95;function kc(n,{lag:t=26,start:e=null,side:i=0}={}){let s=new Array(n.length),r=e;if(r===null){let a=1;for(;a<n.length&&Math.hypot(n[a].x-n[0].x,n[a].y-n[0].y)<1e-6;)a++;let o=n[Math.min(a,n.length-1)];r=Math.atan2(n[0].y-o.y,n[0].x-o.x)+i}s[0]=r;for(let a=1;a<n.length;a++){let o=n[a].x-n[a-1].x,c=n[a].y-n[a-1].y,l=Math.hypot(o,c);if(l>1e-9){let h=Math.atan2(-c,-o)+i,f=Qu(h-r);Math.abs(Math.abs(f)-Math.PI)<1e-6&&(f=Math.PI-1e-6),r=Qu(r+f*(1-Math.exp(-l/t)))}s[a]=r}return s}function ji(n,t={}){let e=kc(n,t),i=[];return n.forEach((s,r)=>{let a=zc(s.p,t.foot||nd);a&&i.push({x:s.x,y:s.y,a:e[r],hw:a.hw,len:a.len,p:s.p,phase:s.phase,t:s.t,s:s.s})}),i}function sd(n,t=10){let e=Math.cos(n.a),i=Math.sin(n.a),s=-i,r=e,a=[];for(let o=t;o>=0;o--){let c=o/t,l=n.hw*(1-c*c)**.55;a.push([n.x+e*n.len*c+s*l,n.y+i*n.len*c+r*l])}for(let o=1;o<t*2;o++){let c=Math.PI/2+Math.PI*o/(t*2),l=Math.cos(c),h=Math.sin(c);a.push([n.x+(e*l-i*h)*n.hw,n.y+(i*l+e*h)*n.hw])}for(let o=0;o<=t;o++){let c=o/t,l=n.hw*(1-c*c)**.55;a.push([n.x+e*n.len*c-s*l,n.y+i*n.len*c-r*l])}return a}function Vc(n,t=120){let e=lx(n)||1,i=[],s=0;for(let r=0;r<=t;r++){let a=e*r/t;for(;s<n.length-2&&n[s+1].s<a;)s++;let o=n[s],c=n[s+1]||o,l=c.s>o.s?(a-o.s)/(c.s-o.s):0;i.push([r/t,ai(o.p,c.p,Te(l))])}return i}function Gc(n,t,e=0){let i=n-t,s=Math.cos(e),r=Math.sin(e),a=n-i/s;if(a<=1e-6)return{touch:!1,H:i,b0:n,rc:0,arc:0,flat:0,offset:0,tilt:e};let o=Math.min(1.2*a,.9*i/Math.max(1e-6,1-r)),c=(i-o*(1-r))/s,l=Math.PI/2-e,h=n-c-o*l;return h<0&&(o=(i/s-n)/((1-r)/s-l),c=(i-o*(1-r))/s,h=0),{touch:!0,H:i,b0:c,rc:o,arc:o*l,flat:h,offset:c*r+o*s,tilt:e}}var cx={pMin:.12,pMax:.92,vMid:700};function rd(n,t=cx){let e=Math.max(0,n)/t.vMid;return t.pMin+(t.pMax-t.pMin)/(1+e*e)}function Hc(n){return .06+.94*Te(n)**.85}function ad(n,t,e,i=.06){return n+(t-n)*(1-Math.exp(-Math.max(0,e)/i))}function od(n,t=120){if(!n.length)return[];let e=[0];for(let a=1;a<n.length;a++)e.push(e[a-1]+Math.hypot(n[a].x-n[a-1].x,n[a].y-n[a-1].y));let i=e[e.length-1]||1,s=[],r=0;for(let a=0;a<=t;a++){let o=i*a/t;for(;r<n.length-2&&e[r+1]<o;)r++;let c=Math.min(r+1,n.length-1),l=e[c]>e[r]?Te((o-e[r])/(e[c]-e[r])):0;s.push([a/t,ai(n[r].p,n[c].p,l)])}return s}function ld(n,t){if(!n.length||n.length!==t.length)return 0;let e=0;for(let i=0;i<n.length;i++)e+=Math.abs(n[i][1]-t[i][1]);return Te(1-e/n.length/.5)}var cd={goat:{en:"Goat hair",zh:"\u7F8A\u6BEB",soft:1,spring:2.2,color:15920088},mixed:{en:"Mixed hair",zh:"\u517C\u6BEB",soft:.72,spring:4.2,color:13215610},weasel:{en:"Weasel hair",zh:"\u72FC\u6BEB",soft:.48,spring:7.5,color:10185276}};function An(n=1){let t=n*2654435761>>>0||1;return()=>(t^=t<<13,t>>>=0,t^=t>>>17,t^=t<<5,t>>>=0,t/4294967296)}function qs(n,t,e,{color:i="#f6f0e1",seed:s=7,fiber:r=.5,edge:a=0}={}){n.save(),n.fillStyle=i,n.fillRect(0,0,t,e);let o=An(s),c=Math.round(t*e/900*r);n.lineCap="round";for(let l=0;l<c;l++){let h=o()*t,f=o()*e,d=4+o()*16,u=o()*Math.PI*2;n.strokeStyle=o()<.55?"rgba(150,120,70,0.10)":"rgba(255,255,255,0.38)",n.lineWidth=.5+o()*.9,n.beginPath(),n.moveTo(h,f),n.quadraticCurveTo(h+Math.cos(u+.7)*d*.5,f+Math.sin(u+.7)*d*.5,h+Math.cos(u)*d,f+Math.sin(u)*d),n.stroke()}if(a>0){let l=n.createLinearGradient(0,0,a,0);l.addColorStop(0,"rgba(120,100,60,.16)"),l.addColorStop(1,"rgba(120,100,60,0)"),n.fillStyle=l,n.fillRect(0,0,a,e),n.save(),n.translate(t,0),n.scale(-1,1),n.fillRect(0,0,a,e),n.restore()}n.restore()}function Ko(n,t,e,i,{kind:s="mi",color:r="rgba(205,62,50,.62)",lw:a=2}={}){if(n.save(),n.strokeStyle=r,n.lineWidth=a*1.5,n.strokeRect(t,e,i,i),n.lineWidth=a,n.setLineDash([a*5,a*4]),n.beginPath(),s==="jiu")for(let o of[1/3,2/3])n.moveTo(t+i*o,e),n.lineTo(t+i*o,e+i),n.moveTo(t,e+i*o),n.lineTo(t+i,e+i*o);else s==="tian"?(n.moveTo(t+i/2,e),n.lineTo(t+i/2,e+i),n.moveTo(t,e+i/2),n.lineTo(t+i,e+i/2)):(n.moveTo(t+i/2,e),n.lineTo(t+i/2,e+i),n.moveTo(t,e+i/2),n.lineTo(t+i,e+i/2),n.moveTo(t,e),n.lineTo(t+i,e+i),n.moveTo(t+i,e),n.lineTo(t,e+i));n.stroke(),n.restore()}function hx(n,t,e){let i=sd(t,8);n.beginPath(),n.moveTo(e.ox+i[0][0]*e.k,e.oy+i[0][1]*e.k);for(let s=1;s<i.length;s++)n.lineTo(e.ox+i[s][0]*e.k,e.oy+i[s][1]*e.k);n.closePath(),n.fill()}var Di=null;function $n(n,t,e,{color:i="#151311",i0:s=0,i1:r=t.length,soft:a=0,alpha:o=1}={}){if(!(r<=s)){if(o<1&&typeof document!="undefined"){let c=n.canvas.width,l=n.canvas.height;Di=Di||document.createElement("canvas"),(Di.width!==c||Di.height!==l)&&(Di.width=c,Di.height=l);let h=Di.getContext("2d");h.clearRect(0,0,c,l),$n(h,t,e,{color:i,i0:s,i1:r,soft:a}),n.save(),n.globalAlpha=o,n.drawImage(Di,0,0),n.restore();return}n.save(),n.fillStyle=i,a>0&&(n.shadowColor="rgba(21,19,17,.55)",n.shadowBlur=a);for(let c=s;c<r;c++)hx(n,t[c],e);n.restore()}}function hd(n,t,e,{i0:i=0,i1:s=t.length,bristles:r=[],color:a="#151311",dry:o=.55}={}){if(!(s<=i)){n.save(),n.fillStyle=a;for(let c=i;c<s;c++){let l=t[c],h=Math.cos(l.a),f=Math.sin(l.a),d=l.hw+l.len;for(let u of r){if(u.k>1-o*(1-u.u)**1.5)continue;let m=-l.hw+u.u*d,y=Math.max(.5,l.hw*(.045+.05*u.u)*u.w*e.k);n.beginPath(),n.arc(e.ox+(l.x+h*m)*e.k,e.oy+(l.y+f*m)*e.k,y,0,Math.PI*2),n.fill()}}n.restore()}}function Wc(n,t,e,i,s,{bounds:r=null,labels:a=null}={}){let f=u=>8+u*(t-8-8),d=u=>e-20-u*(e-10-20);if(n.clearRect(0,0,t,e),n.save(),n.fillStyle="#fbf8f1",n.fillRect(0,0,t,e),r){let u=["rgba(31,111,139,.07)","rgba(0,0,0,0)","rgba(201,161,74,.10)"],m=[0,r[0],r[1],1];for(let y=0;y<3;y++)n.fillStyle=u[y],n.fillRect(f(m[y]),4,f(m[y+1])-f(m[y]),e-10-20+6);if(a){n.fillStyle="rgba(60,60,60,.75)",n.font=`600 ${Math.max(10,Math.round(e*.085))}px system-ui, sans-serif`,n.textAlign="center";for(let y=0;y<3;y++)n.fillText(a[y],(f(m[y])+f(m[y+1]))/2,e-5)}}n.strokeStyle="rgba(0,0,0,.08)",n.lineWidth=1;for(let u of[0,.5,1])n.beginPath(),n.moveTo(8,d(u)),n.lineTo(t-8,d(u)),n.stroke();if(i.length){n.beginPath(),n.moveTo(f(0),d(0));for(let[u,m]of i)n.lineTo(f(u),d(m));n.lineTo(f(1),d(0)),n.closePath(),n.fillStyle="rgba(201,161,74,.32)",n.fill(),n.beginPath(),i.forEach(([u,m],y)=>y?n.lineTo(f(u),d(m)):n.moveTo(f(u),d(m))),n.strokeStyle="#b8902f",n.lineWidth=2,n.stroke()}s.length&&(n.beginPath(),s.forEach(([u,m],y)=>y?n.lineTo(f(u),d(m)):n.moveTo(f(u),d(m))),n.strokeStyle="#1f6f8b",n.lineWidth=2.5,n.stroke()),n.restore()}var Ni=26,De=20;function ud({L:n=.45,R:t=.07,handle:e=2,hair:i="goat"}={}){let s=new Ce,r=new Ce;s.add(r);let a=new le({color:13214822,roughness:.55,metalness:.02}),o=new le({color:10254916,roughness:.6}),c=new le({color:3809814,roughness:.35,metalness:.1}),l=t*.78,h=new Jt(new Tn(l*.92,l,e,24),a);h.position.y=.16+e/2,r.add(h);for(let L of[.38,.74]){let H=new Jt(new Tn(l*1.06,l*1.06,.025,24),o);H.position.y=.16+e*L,r.add(H)}let f=new Jt(new Tn(l*1.04,t*1.02,.18,24),c);f.position.y=.09,r.add(f);let d=new Jt(new Tn(l*.95,l*.92,.1,24),c);d.position.y=.16+e+.05,r.add(d);let u=new Jt(new Tr(.05,.008,8,24),new le({color:11549230,roughness:.7}));u.position.y=.16+e+.14,r.add(u);let m=Ni*De+1,y=new Float32Array(m*3),g=new Float32Array(m*3),p=[];for(let L=0;L<Ni-1;L++)for(let H=0;H<De;H++){let tt=L*De+H,j=L*De+(H+1)%De,it=tt+De,J=j+De;p.push(tt,it,j,j,it,J)}let S=Ni*De;for(let L=0;L<De;L++)p.push((Ni-1)*De+L,S,(Ni-1)*De+(L+1)%De);let A=new Ue;A.setAttribute("position",new en(y,3)),A.setAttribute("color",new en(g,3)),A.setIndex(p);let v=new Jt(A,new le({vertexColors:!0,roughness:.85,metalness:0,side:on}));s.add(v);let b={d:0,dir:[-1,0],fan:0,ink:0,hair:i,wet:0,tilt:0},w=new N(0,1,0),C=new N,x=new Qt,T=new Qt(1315348),P=new Qt,D=new Qt(9067056),F=L=>t*(1+.35*Math.sin(Math.PI*L))*(1-L)**.65;function W(L={}){Object.assign(b,L);let H=Te(b.d,0,n*.85),[tt,j]=b.dir,it=b.tilt||0,J=Gc(n,H,it),rt=Math.sin(it),at=Math.cos(it),St=J.touch?Math.min(1,(n-J.H/at)/n):0,Ct=-j,Wt=tt;C.set(-tt*rt,at,-j*rt),r.quaternion.setFromUnitVectors(w,C),x.setHex(cd[b.hair].color);let qt=-(Math.PI/2-it),te=J.b0*rt-J.rc*Math.sin(qt),et=-J.b0*at+J.rc*Math.cos(qt);for(let Ut=0;Ut<Ni;Ut++){let Kt=Ut/(Ni-1),R=Kt*n,V,K,st,lt,vt;if(!J.touch||R<=J.b0)V=R*rt,K=-R*at,st=rt,lt=-at,vt=0;else if(R<=J.b0+J.arc){let Q=qt+(R-J.b0)/J.rc;V=te+J.rc*Math.sin(Q),K=et-J.rc*Math.cos(Q),st=Math.cos(Q),lt=Math.sin(Q),vt=Math.sin((Q-qt)/-qt*Math.PI/2)}else V=J.offset+(R-J.b0-J.arc),K=-J.H,st=1,lt=0,vt=1;let mt=F(Kt),Pt=b.fan*Kt,kt=mt*(1+1.1*St*vt+2.6*Pt),I=mt*Math.max(.12,1-.62*St*vt-.85*Pt);K+=I*vt*.9;let ee=tt*st,$t=j*st,E=lt*Wt-0,_=$t*Ct-ee*Wt,B=0-lt*Ct,X=Math.hypot(E,_,B)||1;E/=X,_/=X,B/=X;let $=tt*V,ft=j*V,ut=1-b.ink*.72;for(let Q=0;Q<De;Q++){let z=Q/De*Math.PI*2,_t=Math.cos(z),Rt=Math.sin(z),gt=(Ut*De+Q)*3;y[gt]=$+Ct*_t*kt+E*Rt*I,y[gt+1]=K+_*Rt*I,y[gt+2]=ft+Wt*_t*kt+B*Rt*I,P.copy(x),b.hair==="mixed"&&Math.sin(z*7)>.2&&P.lerp(D,.55),b.hair==="weasel"&&P.multiplyScalar(.75+.35*Kt);let yt=Te((Kt-ut)/.08);P.lerp(T,yt*.96),g[gt]=P.r,g[gt+1]=P.g,g[gt+2]=P.b}}let nt=(Ni-1)*De*3,pt=0,Gt=0,bt=0;for(let Ut=0;Ut<De;Ut++)pt+=y[nt+Ut*3],Gt+=y[nt+Ut*3+1],bt+=y[nt+Ut*3+2];y[S*3]=pt/De,y[S*3+1]=Gt/De-(H>0?0:t*.05),y[S*3+2]=bt/De,g[S*3]=g[nt],g[S*3+1]=g[nt+1],g[S*3+2]=g[nt+2],A.attributes.position.needsUpdate=!0,A.attributes.color.needsUpdate=!0,A.computeVertexNormals(),A.computeBoundingSphere()}return W(),{group:s,tuft:v,L:n,R:t,handle:e,state:b,setPose:W,setInk:L=>W({ink:Te(L)}),setHair:L=>W({hair:L}),tipWorld:(L=new N)=>(v.updateWorldMatrix(!0,!1),L.set(y[S*3],y[S*3+1],y[S*3+2]).applyMatrix4(v.matrixWorld))}}function dd({w:n=3.2,h:t=3.8,x:e=0,y:i=.02,z:s=0,ppu:r=360,box:a=2.6,boxCenter:o=null,grid:c=!0,color:l="#f6f0e1",diamond:h=!1,gridColor:f="rgba(205,62,50,.72)"}={}){let d=Math.round(n*r),u=Math.round(t*r),m=document.createElement("canvas");m.width=d,m.height=u;let y=document.createElement("canvas");y.width=d,y.height=u;let g=document.createElement("canvas");g.width=d,g.height=u;let p=null,S=m.getContext("2d"),A=y.getContext("2d"),v=g.getContext("2d"),b=new wn(m);b.colorSpace=Ae,b.anisotropy=4;let w=new Jt(new si(n,t),new le({map:b,roughness:.92,metalness:0,transparent:h,alphaTest:h?.5:0}));w.rotation.x=-Math.PI/2,w.position.set(e,i,s);let C=o||[e,s],x={k:a*r/1e3,ox:(C[0]-a/2-(e-n/2))*r,oy:(C[1]-a/2-(s-t/2))*r},T=c;function P(){qs(v,d,u,{color:l,seed:5,fiber:.45,edge:r*.04}),T&&Ko(v,x.ox,x.oy,a*r,{kind:T==="jiu"||T==="tian"?T:"mi",lw:Math.max(2,r/110),color:f})}function D(){h&&(S.clearRect(0,0,d,u),S.save(),S.beginPath(),S.moveTo(d/2,0),S.lineTo(d,u/2),S.lineTo(d/2,u),S.lineTo(0,u/2),S.closePath(),S.clip()),S.drawImage(g,0,0),p&&S.drawImage(p,0,0),S.drawImage(y,0,0),h&&S.restore(),b.needsUpdate=!0}return P(),D(),{mesh:w,tex:b,canvas:m,T:x,y:i,box:a,world:(F,W,L=new N)=>L.set(C[0]+(F/1e3-.5)*a,i,C[1]+(W/1e3-.5)*a),stampMany(F,W,L,H={}){var tt;if(!(L<=W)){for(let j of[A,S])H.bristles?hd(j,F,x,{i0:W,i1:L,bristles:H.bristles,dry:(tt=H.dry)!=null?tt:.55}):$n(j,F,x,{i0:W,i1:L,soft:r/150});b.needsUpdate=!0}},clearInk(){A.clearRect(0,0,d,u),D()},setGrid(F){T=F,P(),D()},setUnder(F){if(!F){p=null,D();return}p||(p=document.createElement("canvas"),p.width=d,p.height=u);let W=p.getContext("2d");W.clearRect(0,0,d,u),F(W,x,d,u),D()}}}var Xr={up:.22,move:.4,down:.2};function fd(n,t,e={}){let i={side:e.side||0},r=(e.order||t.strokes.map((l,h)=>h)).map(l=>t.strokes[l]).map(l=>{let h=Li(l);return{st:l,s:h,sts:ji(h,i),trail:kc(h,i),dur:td(h),drawn:0}}),a=[],o=0;r.forEach((l,h)=>{if(h>0){let f=Xr.up+Xr.move+Xr.down;a.push({air:!0,a:r[h-1],b:l,t0:o,t1:o+f}),o+=f}a.push({air:!1,k:l,i:h,t0:o,t1:o+l.dur}),o+=l.dur});function c(l,h){return l.trail[Math.min(h,l.trail.length-1)]}return{strokes:r,duration:o,reset(){r.forEach(l=>{l.drawn=0})},spans:()=>a.filter(l=>!l.air).map(l=>({t0:l.t0,t1:l.t1,i:l.i})),poseAt(l){let h=a.find(m=>l<m.t1)||a[a.length-1];if(h.air){let m=h.a.s[h.a.s.length-1],y=h.b.s[0],g=Te((l-h.t0)/(h.t1-h.t0)),p=Xr.up/(h.t1-h.t0),S=1-Xr.down/(h.t1-h.t0),A=Te((g-p)/(S-p)),v=A*A*(3-2*A),b=g<p?g/p:g>S?(1-g)/(1-S):1,w=c(h.a,h.a.trail.length-1);return{x:m.x+(y.x-m.x)*v,y:m.y+(y.y-m.y)*v,p:0,dir:[Math.cos(w),Math.sin(w)],hover:b,phase:-1,n:h.b.st.n-1,f:0,tilt:e.tilt||0}}let f=h.k,d=ed(f.s,Te(l-h.t0,0,f.dur)),u=c(f,d.i);return{x:d.x,y:d.y,p:d.p,dir:[Math.cos(u),Math.sin(u)],hover:0,phase:d.phase,n:h.i,f:d.s/(f.s[f.s.length-1].s||1),tilt:e.tilt||0}},drawTo(l){for(let h of a){if(h.air)continue;let f=h.k,d=l-h.t0,u=f.drawn;for(;u<f.sts.length&&f.sts[u].t<=d;)u++;u>f.drawn&&(n.stampMany(f.sts,f.drawn,u,{bristles:e.bristles}),f.drawn=u)}}}}var ux=(n,t,e=0)=>Gc(n,t,e).offset;function Xc(n,t,e,i=0){let s=t.world(e.x,e.y),r=e.tilt||0,a=n.L,o=id(e.p)*a,c=a-(a*Math.cos(r)-o),l=ux(a,c,r);return n.group.quaternion.identity(),n.group.position.set(s.x-e.dir[0]*l,t.y+.002+(a-c)+i,s.z-e.dir[1]*l),n.setPose({d:c,dir:e.dir,fan:0,tilt:r}),o}function pd(n,t,e){let i=new N;return{add(s,r){let a=document.createElement("span");return a.className=`al-lab ${s}`,a.innerHTML=r,n.appendChild(a),a},place(s,r,a=0){i.copy(r).project(e);let o=t.clientWidth,c=t.clientHeight,l=i.z>1||Math.abs(i.x)>1.1||Math.abs(i.y)>1.1;s.style.opacity=l?0:1;let h=s.offsetWidth/2+6,f=Math.min(o-h,Math.max(h,(i.x*.5+.5)*o));s.style.transform=`translate(${f}px, ${(-i.y*.5+.5)*c+a}px) translate(-50%, -50%)`}}}function md(n,t,e={}){let i=()=>{let s=document.querySelector(n);if(!s)return;let r=null,a=!1,o=()=>(a||(a=!0,r=t(s)),r),c=new IntersectionObserver(l=>{l[0].isIntersecting&&(c.disconnect(),o())},{rootMargin:"600px"});c.observe(s);for(let[l,h]of Object.entries(e))document.querySelectorAll(`[data-lab-${l}]`).forEach(f=>f.addEventListener("click",d=>{let u=o();if(!u)return;d.preventDefault(),s.scrollIntoView({behavior:"smooth",block:"center"});let m=f.getAttribute(`data-lab-${l}`),y=()=>u.ready()?h(u,m):setTimeout(y,150);y()}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",i):i()}function qc(n,t=64,e=64){let i=document.createElement("canvas");i.width=t,i.height=e,n(i.getContext("2d"),t,e);let s=new wn(i);return s.colorSpace=Ae,s}function gd(n,{w:t=9,d:e=6,felt:i=[0,.35,4,4.6],weight:s=[0,-1.37,2.7],stone:r=[3.1,-.5]}={}){let a=qc((m,y,g)=>{m.fillStyle="#6a4125",m.fillRect(0,0,y,g);let p=An(4);for(let S=0;S<140;S++){let A=p()*g,v=2+p()*6,b=.004+p()*.01,w=p()*6;m.strokeStyle=p()<.5?`rgba(40,20,8,${.12+p()*.2})`:`rgba(160,110,60,${.08+p()*.12})`,m.lineWidth=.6+p()*2.2,m.beginPath();for(let C=0;C<=y;C+=8){let x=A+Math.sin(C*b+w)*v;C?m.lineTo(C,x):m.moveTo(C,x)}m.stroke()}},1024,512),o=new le({color:4860952,roughness:.6}),c=new Jt(new Je(t,.36,e),[o,o,new le({map:a,roughness:.55}),o,o,o]);c.receiveShadow=!0,c.position.set(0,-.18,.2),n.add(c);let l=new Jt(new Je(i[2],.012,i[3]),new le({roughness:1,map:qc((m,y,g)=>{m.fillStyle="#2c313d",m.fillRect(0,0,y,g);let p=An(9);for(let S=0;S<2600;S++)m.fillStyle=`rgba(${p()<.5?"255,255,255":"0,0,0"},${.03+p()*.05})`,m.fillRect(p()*y,p()*g,1+p()*2,1+p()*2)},256,256)}));l.receiveShadow=!0,l.position.set(i[0],.006,i[1]),n.add(l);let h=new le({color:4859416,roughness:.42}),f=new Ce;f.add(new Jt(new Je(s[2],.13,.22),h));let d=new Jt(new Je(s[2]*.8,.01,.06),new le({color:2757643,roughness:.5}));d.position.y=.066,f.add(d),f.position.set(s[0],.016+.065,s[1]),f.traverse(m=>{m.isMesh&&(m.castShadow=!0,m.receiveShadow=!0)}),n.add(f);let u=null;if(r){u=new Ce;let m=new le({color:3878714,roughness:.62}),y=new le({color:4865096,roughness:.42}),g=(b,w,C,x,T,P,D)=>{let F=new Jt(new Je(b,w,C),D);F.position.set(x,T,P),u.add(F)};g(1.2,.1,1.8,0,.05,0,m);for(let[b,w,C,x]of[[1.2,.1,0,-.85],[1.2,.1,0,.85],[.1,1.6,-.55,0],[.1,1.6,.55,0]])g(b,.2,w,C,.2,x,m);let p=new Nn;p.moveTo(-.8,.1),p.lineTo(-.35,.1),p.quadraticCurveTo(-.3,.22,-.22,.25),p.lineTo(.8,.25),p.lineTo(.8,.1),p.closePath();let S=new Jt(new ii(p,{depth:1,bevelEnabled:!1}),y);S.rotation.y=-Math.PI/2,S.position.x=.5,u.add(S);let A=new Jt(new Je(1,.002,.5),new le({color:460811,roughness:.05,metalness:.2}));A.position.set(0,.2,-.56),u.add(A);let v=new Jt(new Hi(.26,40),new le({color:657933,roughness:.05,metalness:.2}));v.rotation.x=-Math.PI/2,v.position.set(0,.252,.3),u.add(v),u.traverse(b=>{b.isMesh&&(b.castShadow=!0,b.receiveShadow=!0)}),A.castShadow=!1,v.castShadow=!1,u.position.set(r[0],0,r[1]),n.add(u)}return{desk:c,felt:l,weight:f,stone:u}}var Yc=12,$c="#3d4048";var dx=2.5,fx=26;function _d(n,t,e=null){let i=n.querySelector(".cg-pad-cv"),s=i.getContext("2d"),r=n.querySelector(".cg-pad-meter i"),a=n.querySelector(".cg-pad-mode"),o=n.querySelector(".cg-pad-msg"),c={grid:!0,model:!0,order:!1},l="brush",h="mi";n.querySelectorAll("[data-pt]").forEach(R=>{c[R.getAttribute("data-pt")]=R.checked});let f=t.strokes.map(R=>{let V=Li(R);return{s:V,sts:ji(V)}}),d=[],u={k:1,ox:0,oy:0},m=0,y=null,g=!1,p=null,S=null;function A(){let R=i.clientWidth||320,V=Math.min(window.devicePixelRatio||1,2),K=Math.round(R*V);(i.width!==K||i.height!==K)&&(i.width=K,i.height=K),m=K,u={k:K/1e3,ox:0,oy:0},S=null,b()}function v(){if(!S){S=document.createElement("canvas"),S.width=m,S.height=m;let R=S.getContext("2d");qs(R,m,m,{seed:11,fiber:.35}),c.grid&&Ko(R,m*.012,m*.012,m*.976,{kind:h,lw:Math.max(1,m/360)}),c.model&&f.forEach(V=>$n(R,V.sts,u,{color:"rgb(214,72,60)",alpha:.3})),c.order&&f.forEach((V,K)=>{let st,lt,vt=t.strokes[K].num;if(vt)[st,lt]=vt;else{let Pt=V.s[0],kt=V.s[Math.min(V.s.length-1,12)],I=Math.hypot(kt.x-Pt.x,kt.y-Pt.y)||1;st=Pt.x-(kt.x-Pt.x)/I*50,lt=Pt.y-(kt.y-Pt.y)/I*50}let mt=23*u.k;R.save(),R.fillStyle="rgba(31,111,139,.92)",R.beginPath(),R.arc(st*u.k,lt*u.k,mt,0,Math.PI*2),R.fill(),R.fillStyle="#fff",R.font=`800 ${Math.round(mt*1.25)}px system-ui, sans-serif`,R.textAlign="center",R.textBaseline="middle",R.fillText(String(K+1),st*u.k,lt*u.k+mt*.06),R.restore()})}s.drawImage(S,0,0)}function b(){if(m){v();for(let R of d)$n(s,R.sts,u,R.tool==="pencil"?{color:$c}:{soft:m/420});p&&Ct()}}let w=R=>{let V=i.getBoundingClientRect();return{x:(R.clientX-V.left)/V.width*1e3,y:(R.clientY-V.top)/V.height*1e3}};function C(R){p&&nt();let V=w(R),K=R.pointerType==="pen"&&R.pressure>0;K&&!g&&(g=!0,n.classList.add("cg-pad-pen")),y={id:R.pointerId,pen:K,x:V.x,y:V.y,sx:V.x,sy:V.y,t:R.timeStamp,t0:R.timeStamp,t1:R.timeStamp,p:K?Hc(R.pressure):.32,a:Math.PI,sts:[],tool:l},d.push(y),x(y.x,y.y,y.p,y.a)}function x(R,V,K,st){let lt=y.tool==="pencil"?{hw:Yc/2+1.5,len:Yc/2+1.5}:zc(K);if(!lt)return;let vt={x:R,y:V,a:st,hw:lt.hw,len:lt.len,p:K};y.sts.push(vt),$n(s,[vt],u,y.tool==="pencil"?{color:$c}:{soft:m/420})}function T(R){if(!y||R.pointerId!==y.id)return;let V=typeof R.getCoalescedEvents=="function"?R.getCoalescedEvents():[];for(let K of V.length?V:[R])P(K)}function P(R){let V=w(R),K=y.sx+(V.x-y.sx)*.65,st=y.sy+(V.y-y.sy)*.65;y.sx=K,y.sy=st;let lt=K-y.x,vt=st-y.y,mt=Math.hypot(lt,vt),Pt=Math.max(.001,(R.timeStamp-y.t)/1e3);if(mt<.5)return;let kt=y.pen&&R.pressure>0?Hc(R.pressure):rd(mt/Pt),I=ad(y.p,kt,Pt,y.pen?.03:.08),ee=Math.max(1,Math.ceil(mt/dx)),$t=Math.atan2(-vt,-lt);for(let E=1;E<=ee;E++){let _=E/ee,B=$t-y.a;for(;B>Math.PI;)B-=2*Math.PI;for(;B<-Math.PI;)B+=2*Math.PI;y.a+=B*(1-Math.exp(-(mt/ee)/fx)),x(y.x+lt*_,y.y+vt*_,y.p+(I-y.p)*_,y.a)}y.x=K,y.y=st,y.t=R.timeStamp,y.p=I,r&&(r.style.width=`${Math.round(Te(y.tool==="pencil"?.12:I)*100)}%`)}function D(R){!y||R&&R.pointerId!==y.id||(y.t1=Math.max(y.t,R&&R.timeStamp?R.timeStamp:y.t),y.sts.length||d.pop(),y=null,o&&(o.textContent=""),it(),St())}let F=n.querySelector(".cg-pad-curve"),W=n.querySelector(".cg-pad-score"),L=f.map(R=>Vc(R.s)),H=R=>{let V=R.s[R.s.length-1].s||1,K=R.s.find(lt=>lt.phase>=1),st=R.s.find(lt=>lt.phase>=2);return[K?K.s/V:.2,st?st.s/V:.8]},tt=f.map(H),j=null;function it(){if(!F)return;let R=F.clientWidth||300,V=Math.min(window.devicePixelRatio||1,2),K=Math.round(R*V),st=Math.round((F.clientHeight||120)*V);(F.width!==K||F.height!==st)&&(F.width=K,F.height=st);let lt=F.getContext("2d"),vt=d.filter(ee=>ee.sts.length>=8),mt=vt.length?(vt.length-1)%f.length:0,Pt=["\u8D77\u7B46","\u884C\u7B46","\u6536\u7B46"];if(!vt.length){Wc(lt,K,st,L[0],[],{bounds:tt[0],labels:Pt}),j=null,W&&(W.innerHTML=`Write stroke 1 (${t.strokes[0].en}) to see your curve.<span class="zh">\u5BEB\u7B2C 1 \u7B46\uFF08${t.strokes[0].zh}\uFF09\uFF0C\u770B\u770B\u4F60\u7684\u63D0\u6309\u66F2\u7DDA\u3002</span>`);return}let kt=od(vt[vt.length-1].sts),I=ld(L[mt],kt);j={k:mt,m:I},Wc(lt,K,st,L[mt],kt,{bounds:tt[mt],labels:Pt}),W&&(W.innerHTML=`Stroke ${mt+1} (${t.strokes[mt].en}): <b>${Math.round(I*100)}%</b> like the demo.<span class="zh">\u7B2C ${mt+1} \u7B46\uFF08${t.strokes[mt].zh}\uFF09\uFF1A\u548C\u793A\u7BC4\u7684\u63D0\u6309 <b>${Math.round(I*100)}%</b> \u76F8\u4F3C\u3002</span>`)}i.addEventListener("pointerdown",R=>{if(!(R.button!==void 0&&R.button>0)){R.preventDefault();try{i.setPointerCapture(R.pointerId)}catch{}C(R)}}),i.addEventListener("pointermove",R=>{y&&(R.preventDefault(),T(R))}),i.addEventListener("pointerup",D),i.addEventListener("pointercancel",D),i.addEventListener("lostpointercapture",D),i.addEventListener("touchstart",R=>R.preventDefault(),{passive:!1}),i.addEventListener("touchmove",R=>R.preventDefault(),{passive:!1});let J=f.reduce((R,V)=>R+V.s[V.s.length-1].t,0)+.45*(f.length-1),rt=n.querySelector(".cg-pad-time");function at(){let R=d.filter(K=>K.sts.length>=3),V=R.length?Math.max(0,(R[R.length-1].t1-R[0].t0)/1e3):0;return{strokes:R.length,lifts:Math.max(0,R.length-1),seconds:V,modelStrokes:f.length,modelSeconds:J}}function St(){if(!rt)return;let R=at(),V=R.strokes?`<b>${R.seconds.toFixed(1)} s</b> \xB7 ${R.strokes} ${R.strokes===1?"stroke":"strokes"}, ${R.lifts} ${R.lifts===1?"lift":"lifts"}`:"<b>\u2014</b>",K=R.strokes?`${R.seconds.toFixed(1)} \u79D2\u30FB${R.strokes} \u7B46\u30FB\u63D0\u7B46 ${R.lifts} \u6B21`:"\u9084\u6C92\u5BEB";rt.innerHTML=`<span class="cg-pad-you"><i>You \xB7 \u4F60</i>${V}<small>${K}</small></span><span class="cg-pad-brush"><i>Demo \xB7 \u793A\u7BC4</i><b>${R.modelSeconds.toFixed(1)} s</b> \xB7 ${R.modelStrokes} ${R.modelStrokes===1?"stroke":"strokes"}, ${R.modelStrokes-1} ${R.modelStrokes===2?"lift":"lifts"}<small>${R.modelSeconds.toFixed(1)} \u79D2\u30FB${R.modelStrokes} \u7B46\u30FB\u63D0\u7B46 ${R.modelStrokes-1} \u6B21</small></span>`}function Ct(){let R=p.t;for(let V of f){let K=V.s[V.s.length-1].t,st=0;for(;st<V.sts.length&&V.sts[st].t<=R;)st++;if($n(s,V.sts,u,{i1:st,soft:m/420,color:"#1b2236"}),R>=0&&R<K&&st){let lt=V.sts[st-1];s.save(),s.strokeStyle="rgba(201,161,74,.95)",s.lineWidth=Math.max(2,m/260),s.beginPath(),s.arc(lt.x*u.k,lt.y*u.k,Math.max(8,lt.hw*u.k*.9),0,Math.PI*2),s.stroke(),s.restore()}R-=K+.45}}let Wt=0,qt=0;function te(R){if(Wt=0,!p)return;let V=Math.min(.05,(R-(qt||R))/1e3);if(qt=R,p.t+=V,b(),p.t>J+1.6){nt();return}Wt=requestAnimationFrame(te)}function et(){p={t:0},qt=0,n.classList.add("cg-pad-demoing"),o&&(o.textContent="Watch the brush, then try it yourself. \xB7 \u770B\u5B8C\u793A\u7BC4\uFF0C\u63DB\u4F60\u5BEB\u5BEB\u770B\u3002"),Wt||(Wt=requestAnimationFrame(te))}function nt(){p=null,n.classList.remove("cg-pad-demoing"),Wt&&(cancelAnimationFrame(Wt),Wt=0),b()}n.querySelectorAll("[data-pad]").forEach(R=>R.addEventListener("click",()=>{let V=R.getAttribute("data-pad");V==="demo"&&(p?nt():et()),V==="undo"&&(d.pop(),b(),it(),St()),V==="clear"&&(d.length=0,b(),it(),St()),V==="save"&&pt()})),n.querySelectorAll("[data-pt]").forEach(R=>R.addEventListener("change",()=>{c[R.getAttribute("data-pt")]=R.checked,S=null,b()}));function pt(){b();let R=V=>{let K=document.createElement("a");K.href=V,K.download=`calligraphy-practice-${t.key}.png`,document.body.appendChild(K),K.click(),K.remove()};i.toBlob?i.toBlob(V=>{if(V){let K=URL.createObjectURL(V);R(K),setTimeout(()=>URL.revokeObjectURL(K),4e3)}}):R(i.toDataURL("image/png"))}function Gt(R){!e||!e[R]||(t=e[R],f=t.strokes.map(V=>{let K=Li(V);return{s:K,sts:ji(K)}}),J=f.reduce((V,K)=>V+K.s[K.s.length-1].t,0)+.45*(f.length-1),L=f.map(V=>Vc(V.s)),tt=f.map(H),d.length=0,p&&nt(),S=null,b(),it(),St(),n.querySelectorAll("[data-pad-char]").forEach(V=>V.setAttribute("aria-pressed",V.getAttribute("data-pad-char")===R?"true":"false")))}n.querySelectorAll("[data-pad-char]").forEach(R=>R.addEventListener("click",()=>Gt(R.getAttribute("data-pad-char"))));let bt=n.querySelector(".cg-pad-tool-out");function Ut(R){l=R==="pencil"?"pencil":"brush",n.classList.toggle("cg-pad-pencil",l==="pencil"),n.querySelectorAll("[data-pad-tool]").forEach(V=>V.setAttribute("aria-pressed",V.getAttribute("data-pad-tool")===l?"true":"false")),bt&&(bt.innerHTML=l==="pencil"?'Pencil: the line is the same width however fast you go. Only where you put it matters.<span class="zh">\u925B\u7B46\uFF1A\u4E0D\u7BA1\u5BEB\u5FEB\u5BEB\u6162\uFF0C\u7DDA\u90FD\u4E00\u6A23\u7C97\u3002\u91CD\u8981\u7684\u53EA\u6709\u7DDA\u653E\u5728\u54EA\u88E1\u3002</span>':'Brush: slow is thick and fast is thin, or press harder with a stylus.<span class="zh">\u6BDB\u7B46\uFF1A\u5BEB\u5F97\u6162\u5C31\u7C97\u3001\u5BEB\u5F97\u5FEB\u5C31\u7D30\uFF08\u7528\u89F8\u63A7\u7B46\u7684\u8A71\u662F\u8D8A\u7528\u529B\u8D8A\u7C97\uFF09\u3002</span>')}function Kt(R){h=["mi","jiu","tian"].includes(R)?R:"mi",n.querySelectorAll("[data-pad-grid]").forEach(V=>V.setAttribute("aria-pressed",V.getAttribute("data-pad-grid")===h?"true":"false")),S=null,b()}return n.querySelectorAll("[data-pad-tool]").forEach(R=>R.addEventListener("click",()=>Ut(R.getAttribute("data-pad-tool")))),n.querySelectorAll("[data-pad-grid]").forEach(R=>R.addEventListener("click",()=>Kt(R.getAttribute("data-pad-grid")))),n.querySelector("[data-pad-tool]")&&Ut(n.getAttribute("data-tool")||"brush"),n.querySelector("[data-pad-grid]")&&(h=n.getAttribute("data-grid")||"mi",Kt(h)),new ResizeObserver(A).observe(i),A(),F&&(new ResizeObserver(()=>it()).observe(F),it()),a&&(a.hidden=!1),St(),n.__pad={strokes:d,render:b,clear:()=>{d.length=0,b(),it(),St()},demo:et,stopDemo:nt,score:()=>j,setChar:Gt,timing:at,setTool:Ut,setGrid:Kt,tool:()=>l,setDemoTime:R=>{p=p||{t:0},p.t=R,b()},write(R,V="mouse",K=.5){let st=([lt,vt,mt])=>({pointerId:99,pointerType:V,pressure:K,timeStamp:mt,clientX:i.getBoundingClientRect().left+lt/1e3*i.clientWidth,clientY:i.getBoundingClientRect().top+vt/1e3*i.clientHeight});return C(st(R[0])),R.slice(1).forEach(lt=>P(st(lt))),D(),d[d.length-1].sts.length}},n.__pad}var jo={about:"\u7B2C\u4E94\u8AB2\uFF1A\u516D\u500B\u5B57\u7684\u53E4\u6587\u5B57\u5B57\u5F62\uFF08\u81EA\u5DF1\u63CF\u7684\u4E2D\u5FC3\u7DDA\uFF09\u3002\u7532\u9AA8\u6587\u3001\u91D1\u6587\u3001\u5C0F\u7BC6\u7684\u5C0D\u4F4D\u53C3\u8003 Wikimedia Commons\u300CAncient Chinese characters project\u300D\u7684\u516C\u6709\u9818\u57DF\u5B57\u5F62\uFF08\u65E5\u6708\u5C71\u6C34\u4EBA\u99AC -oracle / -bronze / -seal.svg\uFF09\uFF1B\u96B8\u66F8\u5728 clerical.json\uFF08\u7B2C\u516D\u8AB2\u91CD\u756B\uFF09\uFF0C\u6977\u66F8\u5728 <key>.json\uFF08\u7B46\u9806\u4F9D\u6559\u80B2\u90E8\uFF09\u3002",format:"oracle/bronze/seal\uFF1A\u6BCF\u4E00\u7B46 { pts: [[x, y] \u6216 [x, y, \u5BEC\u5EA6\u500D\u7387]], smooth: false \u8868\u793A\u5200\u523B\u7684\u76F4\u7DDA }\u3002\u5B57\u6846 1000\u3001y \u5F80\u4E0B\u3002",chars:{ri:{char:"\u65E5",en:"sun",oracle:[{pts:[[112,122],[96,480],[72,858]],smooth:!1},{pts:[[112,128],[480,118],[880,192]],smooth:!1},{pts:[[922,258],[906,520],[892,800]],smooth:!1},{pts:[[80,866],[480,872],[892,808]],smooth:!1},{pts:[[318,478],[520,470],[712,496]],smooth:!1}],bronze:[{pts:[[500,198],[574,206],[644,228],[708,263],[760,311],[800,368],[825,431],[833,498],[825,565],[800,628],[760,685],[708,733],[644,768],[574,790],[500,798],[426,790],[356,768],[292,733],[240,685],[200,628],[175,565],[167,498],[175,431],[200,368],[240,311],[292,263],[356,228],[426,206],[500,198]],smooth:!0},{pts:[[488,456,1.6],[512,456,1.6]],smooth:!0}],seal:[{pts:[[238,470],[236,200],[262,112],[340,86],[660,86],[738,112],[762,200],[762,560],[732,738],[640,858],[500,898],[360,858],[268,738],[238,560],[238,470]],smooth:!0},{pts:[[244,476],[500,478],[756,482]],smooth:!0}]},yue:{char:"\u6708",en:"moon",oracle:[{pts:[[364,64],[470,190],[588,330],[640,480],[606,640],[506,790],[338,944]],smooth:!1},{pts:[[484,204],[484,500],[484,778]],smooth:!1}],bronze:[{pts:[[132,166],[420,150],[700,140],[784,176],[846,330],[852,500],[790,646],[650,740],[470,780]],smooth:!0},{pts:[[452,206],[462,330],[426,560],[352,770],[250,846],[112,882]],smooth:!0},{pts:[[652,292,1.3],[628,450,1.2],[588,620,.8]],smooth:!0}],seal:[{pts:[[384,650],[300,520],[272,380],[300,224],[384,112],[500,62],[620,92],[698,200],[718,330],[688,452],[618,560],[548,652],[520,764],[530,880],[556,936]],smooth:!0},{pts:[[402,248],[490,252],[592,292]],smooth:!0},{pts:[[318,430],[470,440],[624,494]],smooth:!0}]},shan:{char:"\u5C71",en:"mountain",oracle:[{pts:[[60,832],[480,824],[924,812]],smooth:!1},{pts:[[96,816],[212,270],[352,560]],smooth:!1},{pts:[[300,800],[546,150],[646,790]],smooth:!1},{pts:[[612,540],[826,284],[902,810]],smooth:!1}],bronze:[{pts:[[72,692],[130,292],[338,522],[490,272],[640,560],[792,290],[884,690]],smooth:!0},{pts:[[62,716],[480,724],[900,726]],smooth:!0}],seal:[{pts:[[506,62],[506,360],[506,652]],smooth:!0},{pts:[[256,152],[256,500],[258,766],[296,862],[400,910],[600,910],[706,862],[744,766],[746,500],[746,152]],smooth:!0},{pts:[[296,842],[400,752],[506,668],[612,752],[716,834]],smooth:!0}]},shui:{char:"\u6C34",en:"water",oracle:[{pts:[[548,62],[472,196],[424,360],[470,470],[548,600],[560,700],[502,842],[440,922]],smooth:!1},{pts:[[282,198],[264,380]],smooth:!1},{pts:[[640,262],[652,440]],smooth:!1},{pts:[[380,650],[332,890]],smooth:!1},{pts:[[724,650],[706,910]],smooth:!1}],bronze:[{pts:[[332,52],[450,200],[480,350],[482,600],[490,800],[560,884],[664,930]],smooth:!0},{pts:[[294,312,1.2],[300,480,1.1]],smooth:!0},{pts:[[642,190,1.4],[640,320,1.3],[640,432,.7]],smooth:!0},{pts:[[298,666,1.1],[340,850,1]],smooth:!0},{pts:[[684,604,1.2],[708,780,1]],smooth:!0}],seal:[{pts:[[442,58],[500,122],[512,260],[500,450],[490,640],[540,782],[630,922]],smooth:!0},{pts:[[632,80],[682,172],[690,272],[640,352],[540,366],[506,370]],smooth:!0},{pts:[[330,150],[398,248],[380,322],[240,420]],smooth:!0},{pts:[[396,442],[378,560],[376,720],[410,920]],smooth:!0},{pts:[[652,410],[650,560],[690,750],[760,862]],smooth:!0}]},ren:{char:"\u4EBA",en:"person",oracle:[{pts:[[456,58],[492,170],[560,290],[600,400],[584,500],[566,650],[570,850],[580,930]],smooth:!1},{pts:[[508,196],[454,336],[404,500],[400,560]],smooth:!1}],bronze:[{pts:[[452,62,1.5],[486,160,1.3],[580,222],[656,286],[674,420],[670,700],[680,924]],smooth:!0},{pts:[[652,312],[520,432],[302,610]],smooth:!0}],seal:[{pts:[[182,90],[290,108],[500,110],[710,118],[790,170],[792,250],[716,340],[644,420],[634,520],[680,620],[810,860],[830,920]],smooth:!0},{pts:[[330,120],[328,400],[300,620],[232,800],[180,910]],smooth:!0}]},ma:{char:"\u99AC",en:"horse",oracle:[{pts:[[286,96],[500,108],[620,100],[734,52]],smooth:!1},{pts:[[736,58],[728,140],[662,200],[612,248]],smooth:!1},{pts:[[292,104],[284,170],[322,216],[420,218],[500,240]],smooth:!1},{pts:[[556,156],[576,163],[588,181],[588,203],[576,221],[556,228],[536,221],[524,203],[524,181],[536,163],[556,156]],smooth:!1},{pts:[[500,244],[560,262],[612,250]],smooth:!1},{pts:[[492,256],[482,450],[490,600],[540,740],[612,790]],smooth:!1},{pts:[[562,292],[590,400],[580,520],[600,640],[620,790]],smooth:!1},{pts:[[628,292],[720,330]],smooth:!1},{pts:[[640,368],[730,386]],smooth:!1},{pts:[[640,428],[740,440]],smooth:!1},{pts:[[640,476],[740,500]],smooth:!1},{pts:[[330,302],[320,380],[322,452]],smooth:!1},{pts:[[330,376],[484,402]],smooth:!1},{pts:[[310,582],[322,652],[342,690],[490,702]],smooth:!1},{pts:[[352,700],[362,792]],smooth:!1},{pts:[[620,792],[580,850],[520,880],[412,886]],smooth:!1},{pts:[[560,862],[520,940]],smooth:!1}],bronze:[{pts:[[300,118],[450,100],[570,84],[690,60]],smooth:!0},{pts:[[302,122],[256,190],[248,290],[320,318],[410,312]],smooth:!0},{pts:[[404,152],[560,142],[572,290],[414,302],[404,152]],smooth:!0},{pts:[[466,214,2],[480,216,2]],smooth:!0},{pts:[[684,64],[650,170],[620,250]],smooth:!0},{pts:[[640,150],[700,250],[790,380]],smooth:!0},{pts:[[600,300],[640,370],[680,420]],smooth:!0},{pts:[[530,330],[580,400],[610,470]],smooth:!0},{pts:[[452,330],[452,420],[520,500],[548,600],[500,690],[380,712],[300,706]],smooth:!0},{pts:[[410,350],[340,440],[280,540]],smooth:!0},{pts:[[468,716],[486,800],[590,826]],smooth:!0},{pts:[[468,780],[380,880]],smooth:!0},{pts:[[486,806],[504,924]],smooth:!0}],seal:[{pts:[[330,72],[500,64],[662,60]],smooth:!0},{pts:[[334,78],[322,160],[322,250],[338,300],[420,322],[470,334]],smooth:!0},{pts:[[352,132],[500,130],[640,156]],smooth:!0},{pts:[[352,218],[500,218],[640,240]],smooth:!0},{pts:[[500,66],[496,200],[488,300],[460,360],[400,400],[300,425],[222,455]],smooth:!0},{pts:[[470,334],[560,380],[602,460],[610,560],[588,720],[548,935]],smooth:!0},{pts:[[612,520],[660,452],[712,442],[740,500],[746,660],[700,850]],smooth:!0},{pts:[[548,410],[450,474],[360,556],[292,636]],smooth:!0},{pts:[[604,494],[520,566],[420,690],[330,868]],smooth:!0}]}}};var Zc={about:"\u7B2C\u516D\u8AB2\uFF1A\u96B8\u66F8\u7B46\u756B\u8CC7\u6599\uFF08\u4EBA\u5E2B\u6559\u80B2\u5354\u6703\u81EA\u7E6A\u7684\u793A\u610F\uFF0C\u53C3\u8003\u6F22\u7891\u96B8\u66F8\u7684\u5178\u578B\u5BEB\u6CD5\uFF1A\u6A6B\u756B\u8D77\u7B46\u56DE\u92D2\u5982\u8836\u982D\u3001\u6536\u7B46\u9813\u7B46\u6311\u8D77\u5982\u96C1\u5C3E\uFF0F\u71D5\u5C3E\uFF0C\u4E00\u500B\u5B57\u53EA\u653E\u4E00\u500B\u71D5\u5C3E\uFF09\u3002\u7B46\u9806\u7167\u6977\u66F8\u7684\u6559\u80B2\u90E8\u7B46\u9806\u3002seal\uFF1A\u4E00\u3001\u4E09\u3001\u571F\u7684\u5C0F\u7BC6\u4E2D\u5FC3\u7DDA\uFF08\u5C0D\u4F4D\u53C3\u8003 Wikimedia Commons \u516C\u6709\u9818\u57DF\u5B57\u5F62\uFF09\u3002",chars:{yi:{char:"\u4E00",key:"yi",en:"one",box:1e3,count:1,tail:0,order_src:"\u7B46\u9806\u7167\u6977\u66F8\uFF1A\u6559\u80B2\u90E8\u300A\u570B\u5B57\u6A19\u6E96\u5B57\u9AD4\u7B46\u9806\u5B78\u7FD2\u7DB2\u300B\u300C\u4E00\u300D\uFF08dictView.jsp?ID=19968\uFF09",seal:[{pts:[[140,500],[500,500],[840,500]],smooth:!0}],strokes:[{n:1,en:"Horizontal",zh:"\u6A6B",pts:[[160,482,0,110],[138,484,.3,80],[124,494,.5,55],[126,508,.6,50],[148,514,.6,60],[186,506,.5,150],[331,502,.5,260],[545.4,500,.5,280],[720,502,.5,200],[754,512,.7,110],[786,522,.8,70],[816,516,.7,90],[846,494,.4,150],[872,466,.2,200],[890,442,.1,230],[896,432,0,240]],phases:[5,8],tail:!0}]},san:{char:"\u4E09",key:"san",en:"three",box:1e3,count:3,tail:2,order_src:"\u7B46\u9806\u7167\u6977\u66F8\uFF1A\u6559\u80B2\u90E8\u300A\u570B\u5B57\u6A19\u6E96\u5B57\u9AD4\u7B46\u9806\u5B78\u7FD2\u7DB2\u300B\u300C\u4E09\u300D\uFF08dictView.jsp?ID=19977\uFF09",seal:[{pts:[[280,104],[500,104],[720,104]],smooth:!0},{pts:[[280,500],[500,500],[720,500]],smooth:!0},{pts:[[268,900],[500,900],[732,900]],smooth:!0}],strokes:[{n:1,en:"Horizontal",zh:"\u6A6B",pts:[[340,310,0,110],[318,312,.3,80],[304,322,.5,55],[306,336,.6,50],[328,342,.6,60],[366,334,.5,150],[421,330,.4,260],[539.4,328,.4,280],[650,328,.4,200],[680,330,.4,80],[690,338,.4,60],[678,346,.3,70],[658,338,0,90]],phases:[5,8]},{n:2,en:"Horizontal",zh:"\u6A6B",pts:[[370,464,0,110],[348,466,.3,80],[334,476,.5,55],[336,490,.6,50],[358,496,.6,60],[396,488,.5,150],[433,484,.4,260],[532.2,482,.4,280],[620,482,.4,200],[650,484,.4,80],[660,492,.4,60],[648,500,.3,70],[628,492,0,90]],phases:[5,8]},{n:3,en:"Horizontal",zh:"\u6A6B",pts:[[180,634,0,110],[158,636,.3,80],[144,646,.5,55],[146,660,.6,50],[168,666,.6,60],[206,658,.5,150],[342,654,.5,260],[546.8,652,.4,280],[710,654,.5,200],[744,664,.7,110],[776,674,.8,70],[806,668,.7,90],[836,646,.4,150],[862,618,.2,200],[880,594,.1,230],[886,584,0,240]],phases:[5,8],tail:!0}]},tu:{char:"\u571F",key:"tu",en:"earth",box:1e3,count:3,tail:2,order_src:"\u7B46\u9806\u7167\u6977\u66F8\uFF1A\u6559\u80B2\u90E8\u300A\u570B\u5B57\u6A19\u6E96\u5B57\u9AD4\u7B46\u9806\u5B78\u7FD2\u7DB2\u300B\u300C\u571F\u300D\uFF08dictView.jsp?ID=22303\uFF09",seal:[{pts:[[240,450],[500,448],[760,446]],smooth:!0},{pts:[[482,66],[482,480],[480,896]],smooth:!0},{pts:[[160,920],[500,920],[858,922]],smooth:!0}],strokes:[{n:1,en:"Horizontal",zh:"\u6A6B",pts:[[330,394,0,110],[308,396,.3,80],[294,406,.5,55],[296,420,.6,50],[318,426,.6,60],[356,418,.5,150],[417,414,.4,260],[541.8,412,.4,280],[660,412,.4,200],[690,414,.4,80],[700,422,.4,60],[688,430,.3,70],[668,422,0,90]],phases:[5,8]},{n:2,en:"Vertical",zh:"\u8C4E",pts:[[494,262,0,110],[492,240,.3,80],[504,234,.5,55],[510,256,.5,70],[502,306,.4,200],[500,438,.4,280],[500,600,.4,220],[502,636,.5,80],[492,648,.3,70],[480,634,0,90]],phases:[4,7]},{n:3,en:"Horizontal",zh:"\u6A6B",pts:[[170,644,0,110],[148,646,.3,80],[134,656,.5,55],[136,670,.6,50],[158,676,.6,60],[196,668,.5,150],[338,664,.5,260],[549.2,662,.4,280],[720,664,.5,200],[754,674,.7,110],[786,684,.8,70],[816,678,.7,90],[846,656,.4,150],[872,628,.2,200],[890,604,.1,230],[896,594,0,240]],phases:[5,8],tail:!0}]},shan:{char:"\u5C71",key:"shan",en:"mountain",box:1e3,count:3,tail:1,order_src:"\u7B46\u9806\u7167\u6977\u66F8\uFF1A\u6559\u80B2\u90E8\u300A\u570B\u5B57\u6A19\u6E96\u5B57\u9AD4\u7B46\u9806\u5B78\u7FD2\u7DB2\u300B\u300C\u5C71\u300D\uFF08dictView.jsp?ID=23665\uFF09",strokes:[{n:1,en:"Vertical",zh:"\u8C4E",pts:[[498,266,0,110],[496,244,.3,80],[508,238,.5,55],[514,260,.5,70],[506,310,.4,200],[504,420,.4,280],[504,560,.4,220],[506,596,.5,80],[496,608,.3,70],[484,594,0,90]],phases:[4,7]},{n:2,en:"Vertical-turn",zh:"\u8C4E\u6298",pts:[[244,404,0,110],[242,380,.3,80],[256,374,.6,55],[262,400,.6,70],[254,450,.4,200],[252,560,.4,260],[252,620,.5,120],[256,646,.7,60],[282,660,.5,90],[330,652,.4,200],[460,652,.4,260],[600,650,.4,280],[710,656,.5,200],[744,666,.7,110],[776,676,.8,70],[806,670,.7,90],[836,648,.4,150],[862,620,.2,200],[880,596,.1,230],[886,586,0,240]],phases:[4,11],tail:!0},{n:3,en:"Vertical",zh:"\u8C4E",pts:[[762,406,0,110],[760,384,.3,80],[772,378,.5,55],[778,400,.5,70],[770,450,.4,200],[768,495,.4,280],[768,570,.4,220],[770,606,.5,80],[760,618,.3,70],[748,604,0,90]],phases:[4,7]}]},ren:{char:"\u4EBA",key:"ren",en:"person",box:1e3,count:2,tail:1,order_src:"\u7B46\u9806\u7167\u6977\u66F8\uFF1A\u6559\u80B2\u90E8\u300A\u570B\u5B57\u6A19\u6E96\u5B57\u9AD4\u7B46\u9806\u5B78\u7FD2\u7DB2\u300B\u300C\u4EBA\u300D\uFF08dictView.jsp?ID=20154\uFF09",strokes:[{n:1,en:"Left-falling",zh:"\u6487",pts:[[500,262,0,110],[516,256,.3,80],[524,278,.6,60],[508,330,.5,200],[470,430,.5,260],[400,540,.4,280],[316,630,.4,240],[250,680,.5,120],[222,700,.6,60],[212,716,.4,70],[232,716,0,90]],phases:[3,7]},{n:2,en:"Right-falling",zh:"\u637A",pts:[[470,420,0,110],[488,436,.3,140],[540,500,.3,200],[610,570,.4,220],[690,630,.5,200],[784,674,.7,110],[816,684,.8,70],[846,678,.7,90],[876,656,.4,150],[902,628,.2,200],[920,604,.1,230],[926,594,0,240]],phases:[2,5],tail:!0}]},shui:{char:"\u6C34",key:"shui",en:"water",box:1e3,count:4,tail:3,order_src:"\u7B46\u9806\u7167\u6977\u66F8\uFF1A\u6559\u80B2\u90E8\u300A\u570B\u5B57\u6A19\u6E96\u5B57\u9AD4\u7B46\u9806\u5B78\u7FD2\u7DB2\u300B\u300C\u6C34\u300D\uFF08dictView.jsp?ID=27700\uFF09",strokes:[{n:1,en:"Vertical with hook",zh:"\u8C4E\u9264",pts:[[502,252,0,110],[500,226,.3,80],[514,220,.6,55],[520,246,.6,70],[510,300,.4,200],[508,460,.4,280],[508,640,.4,220],[510,700,.6,90],[498,720,.5,90],[460,716,.3,180],[430,704,0,220]],phases:[4,7]},{n:2,en:"Horizontal, left-falling",zh:"\u6A6B\u6487",pts:[[230,424,0,110],[214,416,.3,80],[222,438,.6,60],[300,430,.4,200],[370,420,.4,160],[394,432,.6,60],[380,480,.5,200],[330,560,.4,260],[266,630,.5,180],[236,660,.5,80],[226,676,.3,70],[246,676,0,90]],phases:[3,8]},{n:3,en:"Left-falling",zh:"\u6487",pts:[[748,318,0,110],[766,324,.4,70],[756,352,.5,150],[690,410,.4,240],[620,452,.4,220],[588,470,.4,100],[576,482,0,120]],phases:[2,5]},{n:4,en:"Right-falling",zh:"\u637A",pts:[[560,470,0,110],[578,486,.3,140],[630,540,.3,200],[700,600,.4,220],[760,640,.5,200],[824,686,.7,110],[856,696,.8,70],[886,690,.7,90],[916,668,.4,150],[942,640,.2,200],[960,616,.1,230],[966,606,0,240]],phases:[2,5],tail:!0}]},ri:{char:"\u65E5",key:"ri",en:"sun",box:1e3,count:4,tail:null,order_src:"\u7B46\u9806\u7167\u6977\u66F8\uFF1A\u6559\u80B2\u90E8\u300A\u570B\u5B57\u6A19\u6E96\u5B57\u9AD4\u7B46\u9806\u5B78\u7FD2\u7DB2\u300B\u300C\u65E5\u300D\uFF08dictView.jsp?ID=26085\uFF09",strokes:[{n:1,en:"Vertical",zh:"\u8C4E",pts:[[252,326,0,110],[250,304,.3,80],[262,298,.5,55],[268,320,.5,70],[260,370,.4,200],[258,500,.4,280],[258,660,.4,220],[260,696,.5,80],[250,708,.3,70],[238,694,0,90]],phases:[4,7]},{n:2,en:"Horizontal-turn",zh:"\u6A6B\u6298",pts:[[286,290,0,110],[264,292,.3,80],[250,302,.5,55],[252,316,.6,50],[274,322,.6,60],[312,314,.5,150],[500,306,.4,280],[720,300,.4,220],[752,304,.6,60],[758,330,.6,70],[756,500,.4,280],[756,680,.4,200],[758,700,.5,80],[746,712,.4,70],[730,704,0,90]],phases:[5,11]},{n:3,en:"Horizontal",zh:"\u6A6B",pts:[[302,486,0,110],[280,488,.3,80],[266,498,.5,55],[268,512,.6,50],[290,518,.6,60],[328,510,.5,150],[411.8,506,.4,260],[560.9,504,.4,280],[708,504,.4,200],[738,506,.4,80],[748,514,.4,60],[736,522,.3,70],[716,514,0,90]],phases:[5,8]},{n:4,en:"Horizontal",zh:"\u6A6B",pts:[[292,684,0,110],[270,686,.3,80],[256,696,.5,55],[258,710,.6,50],[280,716,.6,60],[318,708,.5,150],[407.8,704,.4,260],[563.3,702,.4,280],[718,702,.4,200],[748,704,.5,80],[758,712,.4,60],[746,720,.3,70],[726,712,0,90]],phases:[5,8]}]},yue:{char:"\u6708",key:"yue",en:"moon",box:1e3,count:4,tail:null,order_src:"\u7B46\u9806\u7167\u6977\u66F8\uFF1A\u6559\u80B2\u90E8\u300A\u570B\u5B57\u6A19\u6E96\u5B57\u9AD4\u7B46\u9806\u5B78\u7FD2\u7DB2\u300B\u300C\u6708\u300D\uFF08dictView.jsp?ID=26376\uFF09",strokes:[{n:1,en:"Vertical, left-falling",zh:"\u8C4E\u6487",pts:[[300,296,0,110],[296,272,.3,80],[312,266,.6,55],[318,292,.6,70],[312,360,.4,220],[308,520,.4,280],[290,620,.4,240],[250,700,.5,160],[220,730,.5,80],[212,746,.3,70],[232,744,0,90]],phases:[4,8]},{n:2,en:"Horizontal-turn",zh:"\u6A6B\u6298",pts:[[336,266,0,110],[314,268,.3,80],[300,278,.5,55],[302,292,.6,50],[324,298,.6,60],[362,290,.5,150],[520,282,.4,280],[700,276,.4,220],[726,280,.6,60],[732,306,.6,70],[730,480,.4,280],[728,680,.4,200],[730,710,.5,80],[714,724,.4,70],[696,716,0,90]],phases:[5,11]},{n:3,en:"Horizontal",zh:"\u6A6B",pts:[[360,424,0,110],[338,426,.3,80],[324,436,.5,55],[326,450,.6,50],[348,456,.6,60],[386,448,.5,150],[441.6,444,.4,260],[560.6,442,.4,280],[672,442,.4,200],[702,444,.4,80],[712,452,.4,60],[700,460,.3,70],[680,452,0,90]],phases:[5,8]},{n:4,en:"Horizontal",zh:"\u6A6B",pts:[[360,570,0,110],[338,572,.3,80],[324,582,.5,55],[326,596,.6,50],[348,602,.6,60],[386,594,.5,150],[441.6,590,.4,260],[560.6,588,.4,280],[672,588,.4,200],[702,590,.4,80],[712,598,.4,60],[700,606,.3,70],[680,598,0,90]],phases:[5,8]}]},ma:{char:"\u99AC",key:"ma",en:"horse",box:1e3,count:10,tail:null,order_src:"\u7B46\u9806\u7167\u6977\u66F8\uFF1A\u6559\u80B2\u90E8\u300A\u570B\u5B57\u6A19\u6E96\u5B57\u9AD4\u7B46\u9806\u5B78\u7FD2\u7DB2\u300B\u300C\u99AC\u300D\uFF08dictView.jsp?ID=39340\uFF09",strokes:[{n:1,en:"Vertical",zh:"\u8C4E",pts:[[302,276,0,110],[300,254,.3,80],[312,248,.5,55],[318,270,.5,70],[310,320,.4,200],[308,405,.4,280],[308,520,.4,220],[310,556,.5,80],[300,568,.3,70],[288,554,0,90]],phases:[4,7]},{n:2,en:"Horizontal",zh:"\u6A6B",pts:[[342,244,0,110],[320,246,.3,80],[306,256,.5,55],[308,270,.6,50],[330,276,.6,60],[368,268,.5,150],[428.4,264,.4,260],[552.6,262,.4,280],[670,262,.4,200],[700,264,.4,80],[710,272,.4,60],[698,280,.3,70],[678,272,0,90]],phases:[5,8]},{n:3,en:"Horizontal",zh:"\u6A6B",pts:[[342,339,0,110],[320,341,.3,80],[306,351,.5,55],[308,365,.6,50],[330,371,.6,60],[368,363,.5,150],[422.4,359,.4,260],[540.2,357,.3,280],[650,357,.3,200],[680,359,.4,80],[690,367,.4,60],[678,375,.3,70],[658,367,0,90]],phases:[5,8]},{n:4,en:"Horizontal",zh:"\u6A6B",pts:[[342,434,0,110],[320,436,.3,80],[306,446,.5,55],[308,460,.6,50],[330,466,.6,60],[368,458,.5,150],[425.4,454,.4,260],[546.4,452,.3,280],[660,452,.3,200],[690,454,.4,80],[700,462,.4,60],[688,470,.3,70],[668,462,0,90]],phases:[5,8]},{n:5,en:"Vertical",zh:"\u8C4E",pts:[[502,276,0,110],[500,254,.3,80],[512,248,.5,55],[518,270,.5,70],[510,320,.4,200],[508,395,.4,280],[508,500,.4,220],[510,536,.4,80],[500,548,.3,70],[488,534,0,90]],phases:[4,7]},{n:6,en:"Horizontal-turn-hook",zh:"\u6A6B\u6298\u9264",pts:[[338,554,0,110],[316,556,.3,80],[302,566,.5,55],[304,580,.6,50],[326,586,.6,60],[364,578,.5,150],[520,568,.4,280],[720,564,.4,220],[752,568,.6,60],[758,594,.6,70],[756,690,.4,240],[752,760,.5,120],[728,782,.3,160],[690,774,0,200]],phases:[5,11]},{n:7,en:"Dot",zh:"\u9EDE",pts:[[316,650,0,100],[322,660,.4,70],[320,700,.4,120],[312,724,.3,140],[306,732,0,160]],phases:[1,3]},{n:8,en:"Dot",zh:"\u9EDE",pts:[[426,650,0,100],[432,660,.4,70],[430,700,.4,120],[422,724,.3,140],[416,732,0,160]],phases:[1,3]},{n:9,en:"Dot",zh:"\u9EDE",pts:[[536,650,0,100],[542,660,.4,70],[540,700,.4,120],[532,724,.3,140],[526,732,0,160]],phases:[1,3]},{n:10,en:"Dot",zh:"\u9EDE",pts:[[646,650,0,100],[652,660,.4,70],[650,700,.4,120],[642,724,.3,140],[636,732,0,160]],phases:[1,3]}]}}};var xd={char:"\u65E5",key:"ri",en:"sun",box:1e3,count:4,rule:"box",order_src:"\u6559\u80B2\u90E8\u300A\u570B\u5B57\u6A19\u6E96\u5B57\u9AD4\u7B46\u9806\u5B78\u7FD2\u7DB2\u300B\uFF1A\u300C\u65E5\u300D\u5171 4 \u756B\uFF08dictView.jsp?ID=26085\uFF09",drawn_by:"\u4EBA\u5E2B\u6559\u80B2\u5354\u6703\u81EA\u7E6A\uFF1A\u4E2D\u5FC3\u7DDA\uFF0B\u6BCF\u4E00\u9EDE\u7684\u58D3\u529B\u8207\u901F\u5EA6\uFF08\u6977\u66F8\uFF09",strokes:[{n:1,en:"Vertical",zh:"\u8C4E",pts:[[302,238,0,120],[296,214,.1,90],[312,212,.4,70],[322,236,.6,55],[314,280,.5,180],[310,540,.5,300],[309,760,.5,260],[310,812,.6,140],[311,836,.3,120],[310,846,0,120]],phases:[3,7],num:[238,280]},{n:2,en:"Horizontal-turn-hook",zh:"\u6A6B\u6298\u9264",pts:[[322,236,0,140],[340,234,.3,120],[420,228,.5,240],[560,220,.5,300],[676,214,.4,200],[704,212,.4,110],[726,224,.7,50],[728,252,.6,60],[722,380,.6,240],[718,600,.5,300],[716,790,.6,240],[716,832,.7,80],[704,846,.4,90],[684,840,.1,260],[674,836,0,280]],phases:[2,11],num:[330,165]},{n:3,en:"Horizontal",zh:"\u6A6B",pts:[[356,518,0,130],[332,521,.1,90],[330,536,.4,70],[354,546,.5,55],[373.2,540,.4,220],[510,525,.4,320],[639.6,512,.4,240],[661.2,510,.3,120],[684,518,.5,70],[690,534,.4,55],[670,532,.3,70],[652,522,0,95]],phases:[3,7],num:[420,462]},{n:4,en:"Horizontal",zh:"\u6A6B",pts:[[352,804,0,130],[328,807,.1,90],[326,822,.4,70],[350,832,.6,55],[369.4,826,.4,220],[507,812,.4,320],[637.3,800,.4,240],[659,798,.3,120],[682,806,.5,70],[688,822,.4,55],[668,820,.3,70],[650,810,0,95]],phases:[3,7],num:[420,748]}]};var yd={char:"\u6708",key:"yue",en:"moon",box:1e3,count:4,order_src:"\u6559\u80B2\u90E8\u300A\u570B\u5B57\u6A19\u6E96\u5B57\u9AD4\u7B46\u9806\u5B78\u7FD2\u7DB2\u300B\uFF1A\u300C\u6708\u300D\u5171 4 \u756B\uFF08dictView.jsp?ID=26376\uFF09",drawn_by:"\u4EBA\u5E2B\u6559\u80B2\u5354\u6703\u81EA\u7E6A\uFF1A\u4E2D\u5FC3\u7DDA\uFF0B\u6BCF\u4E00\u9EDE\u7684\u58D3\u529B\u8207\u901F\u5EA6\uFF08\u6977\u66F8\uFF09",strokes:[{n:1,en:"Vertical, left-falling",zh:"\u8C4E\u6487",pts:[[318,160,0,120],[306,140,.1,90],[322,138,.4,70],[334,162,.6,55],[326,210,.6,180],[326,420,.5,300],[316,560,.5,280],[286,690,.4,300],[230,800,.2,340],[160,872,0,380],[140,884,0,380]],phases:[3,6]},{n:2,en:"Horizontal-turn-hook",zh:"\u6A6B\u6298\u9264",pts:[[334,160,0,140],[352,158,.3,120],[450,150,.4,240],[600,140,.4,300],[680,134,.4,200],[706,132,.4,110],[728,144,.7,50],[730,172,.6,60],[724,320,.6,240],[720,560,.5,300],[716,780,.6,260],[714,846,.6,160],[712,880,.7,60],[696,892,.5,90],[660,876,.2,260],[630,860,0,280]],phases:[2,11]},{n:3,en:"Horizontal",zh:"\u6A6B",pts:[[370,378,0,130],[346,381,.1,90],[344,396,.4,70],[368,406,.5,55],[385.5,400,.4,220],[517,386,.4,320],[641.6,374,.4,240],[662.3,372,.3,120],[684,380,.5,70],[690,396,.4,55],[670,394,.3,70],[652,384,0,95]],phases:[3,7]},{n:4,en:"Horizontal",zh:"\u6A6B",pts:[[366,598,0,130],[342,601,.1,90],[340,616,.4,70],[364,626,.5,55],[382,620,.4,220],[515,606,.4,320],[641,594,.4,240],[662,592,.3,120],[684,600,.5,70],[690,616,.4,55],[670,614,.3,70],[652,604,0,95]],phases:[3,7]}]};var vd={char:"\u5C71",key:"shan",en:"mountain",box:1e3,count:3,order_src:"\u6559\u80B2\u90E8\u300A\u570B\u5B57\u6A19\u6E96\u5B57\u9AD4\u7B46\u9806\u5B78\u7FD2\u7DB2\u300B\uFF1A\u300C\u5C71\u300D\u5171 3 \u756B\uFF08dictView.jsp?ID=23665\uFF09",drawn_by:"\u4EBA\u5E2B\u6559\u80B2\u5354\u6703\u81EA\u7E6A\uFF1A\u4E2D\u5FC3\u7DDA\uFF0B\u6BCF\u4E00\u9EDE\u7684\u58D3\u529B\u8207\u901F\u5EA6\uFF08\u6977\u66F8\uFF09",strokes:[{n:1,en:"Vertical",zh:"\u8C4E",pts:[[498,166,0,120],[493,142,.1,90],[508,140,.4,70],[518,164,.7,55],[506,210,.6,180],[503,455,.5,300],[502,690,.6,260],[503,740,.6,120],[508,764,.7,60],[498,774,.3,70],[488,760,0,90]],phases:[3,7]},{n:2,en:"Vertical-turn",zh:"\u8C4E\u6298",pts:[[196,410,0,120],[190,390,.1,90],[206,388,.4,70],[216,412,.6,55],[206,460,.5,180],[202,620,.5,260],[200,760,.5,200],[200,790,.6,80],[214,800,.5,80],[260,796,.4,200],[500,782,.4,320],[740,768,.5,240],[790,764,.5,100],[800,772,.4,80],[790,778,0,100]],phases:[3,8]},{n:3,en:"Vertical",zh:"\u8C4E",pts:[[804,406,0,120],[799,382,.1,90],[814,380,.4,70],[824,404,.7,55],[812,450,.5,180],[809,580,.5,300],[808,700,.5,260],[809,750,.6,120],[814,774,.6,60],[804,784,.3,70],[794,770,0,90]],phases:[3,7]}]};var Md={char:"\u6C34",key:"shui",en:"water",box:1e3,count:4,order_src:"\u6559\u80B2\u90E8\u300A\u570B\u5B57\u6A19\u6E96\u5B57\u9AD4\u7B46\u9806\u5B78\u7FD2\u7DB2\u300B\uFF1A\u300C\u6C34\u300D\u5171 4 \u756B\uFF08dictView.jsp?ID=27700\uFF09",drawn_by:"\u4EBA\u5E2B\u6559\u80B2\u5354\u6703\u81EA\u7E6A\uFF1A\u4E2D\u5FC3\u7DDA\uFF0B\u6BCF\u4E00\u9EDE\u7684\u58D3\u529B\u8207\u901F\u5EA6\uFF08\u6977\u66F8\uFF09",strokes:[{n:1,en:"Vertical with hook",zh:"\u8C4E\u9264",pts:[[506,110,0,120],[500,86,.1,90],[516,84,.4,70],[528,110,.7,55],[518,160,.6,180],[512,420,.5,300],[508,700,.5,280],[506,850,.6,160],[508,890,.7,50],[492,902,.5,90],[456,880,.3,320],[410,852,.1,420],[390,842,0,420]],phases:[3,9]},{n:2,en:"Horizontal, left-falling",zh:"\u6A6B\u6487",pts:[[124,412,0,130],[112,404,.1,90],[118,424,.4,70],[142,430,.5,60],[220,412,.4,260],[330,384,.4,220],[352,376,.4,110],[372,388,.7,50],[370,410,.6,60],[340,480,.5,240],[280,580,.4,300],[190,690,.3,340],[110,764,.1,380],[84,780,0,380]],phases:[3,8]},{n:3,en:"Left-falling",zh:"\u6487",pts:[[756,250,0,110],[772,256,.4,70],[766,276,.6,60],[730,320,.5,200],[660,380,.4,280],[600,420,.2,320],[560,446,0,340]],phases:[2,4]},{n:4,en:"Right-falling",zh:"\u637A",pts:[[540,470,0,120],[562,490,.2,150],[620,560,.3,190],[700,640,.5,200],[790,710,.6,170],[860,748,.8,110],[896,762,.8,70],[926,768,.6,110],[952,772,.2,190],[972,774,0,230]],phases:[2,6]}]};var Sd={char:"\u4EBA",key:"ren",en:"person",box:1e3,count:2,rule:"pn",order_src:"\u6559\u80B2\u90E8\u300A\u570B\u5B57\u6A19\u6E96\u5B57\u9AD4\u7B46\u9806\u5B78\u7FD2\u7DB2\u300B\uFF1A\u300C\u4EBA\u300D\u5171 2 \u756B\uFF08dictView.jsp?ID=20154\uFF09",drawn_by:"\u4EBA\u5E2B\u6559\u80B2\u5354\u6703\u81EA\u7E6A\uFF1A\u4E2D\u5FC3\u7DDA\uFF0B\u6BCF\u4E00\u9EDE\u7684\u58D3\u529B\u8207\u901F\u5EA6\uFF08\u6977\u66F8\uFF09",strokes:[{n:1,en:"Left-falling",zh:"\u6487",pts:[[512,160,0,120],[530,166,.3,80],[536,186,.6,55],[522,232,.6,180],[490,360,.6,260],[430,520,.5,300],[330,680,.3,340],[200,800,.1,380],[86,856,0,400]],phases:[2,5],num:[452,130]},{n:2,en:"Right-falling",zh:"\u637A",pts:[[468,436,0,120],[492,456,.2,150],[560,560,.3,190],[650,670,.5,200],[750,760,.6,170],[838,816,.8,110],[876,834,.8,70],[908,842,.6,110],[940,846,.2,190],[964,848,0,230]],phases:[2,6],num:[545,395]}]};var bd={char:"\u99AC",key:"ma",en:"horse",box:1e3,count:10,order_src:"\u6559\u80B2\u90E8\u300A\u570B\u5B57\u6A19\u6E96\u5B57\u9AD4\u7B46\u9806\u5B78\u7FD2\u7DB2\u300B\uFF1A\u300C\u99AC\u300D\u5171 10 \u756B\uFF08dictView.jsp?ID=39340\uFF09",drawn_by:"\u4EBA\u5E2B\u6559\u80B2\u5354\u6703\u81EA\u7E6A\uFF1A\u4E2D\u5FC3\u7DDA\uFF0B\u6BCF\u4E00\u9EDE\u7684\u58D3\u529B\u8207\u901F\u5EA6\uFF08\u6977\u66F8\uFF09",strokes:[{n:1,en:"Vertical",zh:"\u8C4E",pts:[[324,160,0,120],[316,138,.1,90],[332,136,.4,70],[342,160,.6,55],[334,206,.5,180],[328,380,.5,280],[322,520,.5,240],[320,556,.4,120],[318,566,0,120]],phases:[3,6]},{n:2,en:"Horizontal",zh:"\u6A6B",pts:[[368,148,0,130],[344,151,.1,90],[342,166,.4,70],[366,176,.6,55],[388.3,170,.4,220],[535,155,.4,320],[674,142,.4,240],[697.1,140,.3,120],[722,148,.5,70],[728,164,.4,55],[708,162,.3,70],[690,152,0,95]],phases:[3,7]},{n:3,en:"Horizontal",zh:"\u6A6B",pts:[[366,273,0,130],[342,276,.1,90],[340,291,.4,70],[364,301,.5,55],[383.2,295,.4,220],[520,281,.4,320],[649.6,269,.4,240],[671.2,267,.3,120],[694,275,.5,70],[700,291,.4,55],[680,289,.3,70],[662,279,0,95]],phases:[3,7]},{n:4,en:"Horizontal",zh:"\u6A6B",pts:[[364,388,0,130],[340,391,.1,90],[338,406,.4,70],[362,416,.5,55],[381.9,410,.4,220],[521,396,.4,320],[652.8,384,.4,240],[674.7,382,.3,120],[698,390,.5,70],[704,406,.4,55],[684,404,.3,70],[666,394,0,95]],phases:[3,7]},{n:5,en:"Vertical",zh:"\u8C4E",pts:[[514,168,0,120],[508,150,.1,90],[522,148,.4,70],[530,168,.6,55],[522,210,.5,180],[516,360,.5,260],[512,480,.5,200],[510,505,.3,120],[509,512,0,120]],phases:[3,6]},{n:6,en:"Horizontal-turn-hook",zh:"\u6A6B\u6298\u9264",pts:[[300,552,0,140],[318,548,.3,120],[420,530,.4,240],[600,500,.4,300],[740,474,.4,200],[772,468,.4,110],[800,480,.7,50],[804,506,.6,60],[796,620,.6,240],[786,760,.5,280],[770,860,.6,200],[762,900,.7,70],[744,908,.4,90],[700,880,.2,260],[660,856,0,280]],phases:[2,11]},{n:7,en:"Left-falling dot",zh:"\u6487\u9EDE",pts:[[196,594,0,110],[204,610,.4,70],[196,660,.5,120],[176,720,.4,180],[156,766,.2,220],[146,782,0,240]],phases:[2,4]},{n:8,en:"Dot",zh:"\u9EDE",pts:[[292,624,0,110],[302,640,.3,80],[326,668,.5,90],[354,696,.7,70],[368,716,.6,50],[358,728,.3,60],[344,722,0,80]],phases:[2,5]},{n:9,en:"Dot",zh:"\u9EDE",pts:[[432,604,0,110],[442,620,.3,80],[466,648,.5,90],[494,676,.7,70],[508,696,.6,50],[498,708,.3,60],[484,702,0,80]],phases:[2,5]},{n:10,en:"Dot",zh:"\u9EDE",pts:[[572,584,0,110],[582,600,.3,80],[606,628,.5,90],[634,656,.7,70],[648,676,.6,50],[638,688,.3,60],[624,682,0,80]],phases:[2,5]}]};var Sx={ri:xd,yue:yd,shan:vd,shui:Md,ren:Sd,ma:bd},yn=["ri","yue","shan","shui","ren","ma"];var Qi=[{key:"pic",en:"Picture",zh:"\u5716\u756B",note_en:"Illustration",note_zh:"\u793A\u610F\u5716"},{key:"oracle",en:"Oracle bone script",zh:"\u7532\u9AA8\u6587",note_en:"Carved with a knife",note_zh:"\u7528\u5200\u523B"},{key:"bronze",en:"Bronze script",zh:"\u91D1\u6587",note_en:"Cast in bronze (shown as a rubbing)",note_zh:"\u9444\u5728\u9752\u9285\u5668\u4E0A\uFF08\u9019\u88E1\u756B\u6210\u62D3\u7247\uFF09"},{key:"seal",en:"Small seal script",zh:"\u5C0F\u7BC6",note_en:"Brush, even lines",note_zh:"\u6BDB\u7B46\uFF0C\u7DDA\u689D\u4E00\u6A23\u7C97"},{key:"clerical",en:"Clerical script",zh:"\u96B8\u66F8",note_en:"Brush, flat and wide (sketch)",note_zh:"\u6BDB\u7B46\uFF0C\u5B57\u5F62\u6241\uFF08\u793A\u610F\uFF09"},{key:"regular",en:"Regular script",zh:"\u6977\u66F8",note_en:"Brush, the way we write today",note_zh:"\u6BDB\u7B46\uFF0C\u4ECA\u5929\u5BEB\u7684\u6A23\u5B50"}],PS=Object.fromEntries(Qi.map((n,t)=>[n.key,t])),Qo={oracle:34,bronze:64,seal:46};function ci(n,t){return t==="regular"?Sx[n].strokes:t==="clerical"?Zc.chars[n].strokes:t==="seal"&&!jo.chars[n]?Zc.chars[n].seal:jo.chars[n][t]}function wd(n){let t=jo.chars[n],e=t.seal.map((i,s)=>{let r=Td(i.pts,5),a=r.length,o=r.map(([c,l],h)=>{let f=Math.min(h,a-1-h),d=f===0?.34:f===1?.38:.4;return[Math.round(c),Math.round(l),d,f===0?150:230]});return{n:s+1,en:"Stroke",zh:"\u7B46",pts:o,phases:[1,a-2]}});return{char:t.char,key:n,en:t.en,box:1e3,count:e.length,strokes:e}}function Td(n,t=8){if(n.length<3)return n.map(s=>[s[0],s[1],s[2]||1]);let e=[];for(let s=0;s<n.length-1;s++){let r=n[Math.max(0,s-1)],a=n[s],o=n[s+1],c=n[Math.min(n.length-1,s+2)];for(let l=0;l<t;l++){let h=l/t,f=h*h,d=f*h,u=m=>.5*(2*a[m]+(-r[m]+o[m])*h+(2*r[m]-5*a[m]+4*o[m]-c[m])*f+(-r[m]+3*a[m]-3*o[m]+c[m])*d);e.push([u(0),u(1),(a[2]||1)+((o[2]||1)-(a[2]||1))*h])}}let i=n[n.length-1];return e.push([i[0],i[1],i[2]||1]),e}function Ed(n,t){if(t>=1)return n;let e=a=>a.reduce((o,c,l)=>l?o+Math.hypot(c[0]-a[l-1][0],c[1]-a[l-1][1]):0,0),s=n.reduce((a,o)=>a+e(o),0)*Math.max(0,t),r=[];for(let a of n){if(s<=0)break;let o=e(a);if(o<=s){r.push(a),s-=o;continue}let c=[a[0]];for(let l=1;l<a.length;l++){let h=Math.hypot(a[l][0]-a[l-1][0],a[l][1]-a[l-1][1]);if(h>=s){let f=s/h;c.push([a[l-1][0]+(a[l][0]-a[l-1][0])*f,a[l-1][1]+(a[l][1]-a[l-1][1])*f,a[l][2]]);break}c.push(a[l]),s-=h}r.push(c),s=0}return r}function tl(n,t,e,{seed:i=5,color:s="#e6d8b8"}={}){n.save(),n.fillStyle=s,n.fillRect(0,0,t,e);let r=An(i);for(let a=0;a<60;a++){let o=r()*t,c=r()*e,l=(.04+r()*.16)*Math.max(t,e),h=n.createRadialGradient(o,c,0,o,c,l),f=r()<.6?"160,120,70":"255,250,235";h.addColorStop(0,`rgba(${f},${.05+r()*.08})`),h.addColorStop(1,`rgba(${f},0)`),n.fillStyle=h,n.fillRect(o-l,c-l,l*2,l*2)}for(let a=0;a<t*e/500;a++)n.fillStyle=`rgba(110,80,45,${.08+r()*.18})`,n.fillRect(r()*t,r()*e,.6+r()*1.4,.6+r()*1.4);n.restore()}function Kc(n,t,e,{seed:i=8}={}){n.save(),n.fillStyle="#1f1f22",n.fillRect(0,0,t,e);let s=An(i);for(let r=0;r<90;r++){let a=s()*t,o=s()*e,c=(.03+s()*.12)*Math.max(t,e),l=n.createRadialGradient(a,o,0,a,o,c);l.addColorStop(0,`rgba(${s()<.5?"70,70,74":"8,8,10"},${.25+s()*.3})`),l.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=l,n.fillRect(a-c,o-c,c*2,c*2)}n.restore()}function el(n,t,e,{t:i=1,w:s=Qo.oracle,dark:r="#4b2f18",light:a="rgba(255,248,232,.75)",mid:o="#7d5a37"}={}){let c=Ed(t.map(d=>d.pts.map(u=>[u[0],u[1],u[2]||1])),i),l=d=>[e.ox+d[0]*e.k,e.oy+d[1]*e.k];n.save(),n.lineCap="round",n.lineJoin="miter",n.miterLimit=3;let h=(d,u,m,y)=>{n.strokeStyle=d,n.lineWidth=u;for(let g of c)g.length<2||(n.beginPath(),g.forEach((p,S)=>{let[A,v]=l(p);S?n.lineTo(A+m,v+y):n.moveTo(A+m,v+y)}),n.stroke())},f=s*e.k;h(a,f*.95,f*.16,f*.16),h(r,f,0,0),h(o,f*.42,f*.12,f*.12),n.restore()}function Ad(n,t,e,{t:i=1,w:s=Qo.seal,color:r="#151311",smoothIt:a=!0}={}){let o=Ed(t.map(c=>a&&c.smooth!==!1?Td(c.pts):c.pts.map(l=>[l[0],l[1],l[2]||1])),i);n.save(),n.lineCap="round",n.lineJoin="round",n.strokeStyle=r,n.fillStyle=r;for(let c of o)if(c.length!==1)for(let l=0;l<c.length-1;l++)n.lineWidth=s*e.k*(c[l][2]||1),n.beginPath(),n.moveTo(e.ox+c[l][0]*e.k,e.oy+c[l][1]*e.k),n.lineTo(e.ox+c[l+1][0]*e.k,e.oy+c[l+1][1]*e.k),n.stroke();n.restore()}var li=null;function bx(n,t,e,{t:i=1,seed:s=4}={}){let r=n.canvas.width,a=n.canvas.height;if(li=li||(typeof document!="undefined"?document.createElement("canvas"):null),!li)return;(li.width!==r||li.height!==a)&&(li.width=r,li.height=a);let o=li.getContext("2d");o.clearRect(0,0,r,a),Ad(o,t,e,{t:i,w:Qo.bronze,color:"#ece8dd"}),o.save(),o.globalCompositeOperation="source-atop";let c=An(s);for(let l=0;l<r*a/260;l++)o.fillStyle=`rgba(30,30,32,${.12+c()*.35})`,o.fillRect(c()*r,c()*a,.8+c()*2.2,.8+c()*2.2);o.restore(),n.drawImage(li,0,0)}var Jc=new Map;function wx(n,t){return Jc.has(n)||Jc.set(n,t.map(e=>ji(Li(e)))),Jc.get(n)}function Tx(n,t,e,i,{t:s=1,color:r="#151311"}={}){let a=wx(t,e),o=a.reduce((l,h)=>l+h.length,0),c=Math.round(o*Math.min(1,Math.max(0,s)));for(let l of a){if(c<=0)break;$n(n,l,i,{color:r,i1:Math.min(l.length,c)}),c-=l.length}}function Ex(n,t,e,{t:i=1}={}){n.save(),n.globalAlpha*=Math.min(1,Math.max(0,i*1.5));let s=(a,o)=>{let c=n.createLinearGradient(0,0,0,t);c.addColorStop(0,a),c.addColorStop(1,o),n.fillStyle=c,n.fillRect(0,0,t,t)},r=t/1e3;if(e==="ri"){s("#9fd3f2","#e8f4fb");let a=n.createRadialGradient(500*r,470*r,40*r,500*r,470*r,420*r);a.addColorStop(0,"rgba(255,214,90,.85)"),a.addColorStop(1,"rgba(255,214,90,0)"),n.fillStyle=a,n.fillRect(0,0,t,t),n.fillStyle="#ffb22e",n.beginPath(),n.arc(500*r,470*r,250*r,0,Math.PI*2),n.fill(),n.fillStyle="#ffd25a",n.beginPath(),n.arc(470*r,440*r,190*r,0,Math.PI*2),n.fill()}else if(e==="yue"){s("#141c3a","#2d3a66");let a=An(3);n.fillStyle="#fff";for(let o=0;o<40;o++)n.globalAlpha=.3+a()*.6,n.fillRect(a()*t,a()*t,2*r+a()*3*r,2*r+a()*3*r);n.globalAlpha=1,n.fillStyle="#f6e7a8",n.beginPath(),n.arc(470*r,500*r,300*r,0,Math.PI*2),n.fill(),n.fillStyle="#1d2850",n.beginPath(),n.arc(300*r,470*r,290*r,0,Math.PI*2),n.fill()}else if(e==="shan"){s("#bfe0f0","#eef6fa");let a=(o,c,l,h,f)=>{n.fillStyle=f,n.beginPath(),n.moveTo(o*r,860*r),n.lineTo(h*r,l*r),n.lineTo(c*r,860*r),n.closePath(),n.fill()};a(40,460,330,220,"#6f8a74"),a(560,960,360,800,"#6f8a74"),a(230,800,150,520,"#4f6b57"),n.fillStyle="#f4f7f8",n.beginPath(),n.moveTo(452*r,290*r),n.lineTo(520*r,150*r),n.lineTo(590*r,290*r),n.lineTo(545*r,260*r),n.lineTo(520*r,300*r),n.lineTo(490*r,262*r),n.closePath(),n.fill(),n.fillStyle="#86a36a",n.fillRect(0,850*r,t,150*r)}else if(e==="shui"){s("#d7eef7","#a9d6ea"),n.strokeStyle="#2f7fb4",n.lineCap="round",n.lineWidth=90*r,n.beginPath(),n.moveTo(560*r,40*r),n.bezierCurveTo(380*r,300*r,640*r,600*r,440*r,960*r),n.stroke(),n.strokeStyle="rgba(255,255,255,.6)",n.lineWidth=14*r,n.beginPath(),n.moveTo(540*r,120*r),n.bezierCurveTo(420*r,320*r,600*r,560*r,470*r,860*r),n.stroke(),n.fillStyle="#3d93c8";for(let[a,o]of[[270,290],[700,340],[300,740],[720,760]])n.beginPath(),n.moveTo(a*r,(o-70)*r),n.quadraticCurveTo((a+45)*r,(o+10)*r,a*r,(o+40)*r),n.quadraticCurveTo((a-45)*r,(o+10)*r,a*r,(o-70)*r),n.fill()}else if(e==="ren")s("#f3ead8","#e9dcc2"),n.fillStyle="#5b4636",n.beginPath(),n.arc(430*r,170*r,70*r,0,Math.PI*2),n.fill(),n.strokeStyle="#5b4636",n.lineCap="round",n.lineJoin="round",n.lineWidth=70*r,n.beginPath(),n.moveTo(470*r,250*r),n.quadraticCurveTo(600*r,400*r,580*r,560*r),n.stroke(),n.lineWidth=58*r,n.beginPath(),n.moveTo(580*r,560*r),n.lineTo(560*r,900*r),n.stroke(),n.beginPath(),n.moveTo(580*r,560*r),n.lineTo(650*r,880*r),n.stroke(),n.lineWidth=40*r,n.beginPath(),n.moveTo(500*r,300*r),n.quadraticCurveTo(430*r,420*r,380*r,540*r),n.stroke();else if(e==="ma"){s("#e3eed9","#cfe0bf"),n.fillStyle="#7a4a2a",n.beginPath(),n.moveTo(230*r,430*r),n.bezierCurveTo(260*r,360*r,520*r,350*r,640*r,380*r),n.bezierCurveTo(690*r,300*r,720*r,230*r,790*r,210*r),n.lineTo(880*r,300*r),n.lineTo(860*r,330*r),n.lineTo(780*r,300*r),n.bezierCurveTo(740*r,360*r,720*r,440*r,700*r,500*r),n.bezierCurveTo(690*r,560*r,600*r,580*r,520*r,580*r),n.bezierCurveTo(420*r,590*r,300*r,580*r,250*r,540*r),n.closePath(),n.fill(),n.strokeStyle="#7a4a2a",n.lineCap="round",n.lineWidth=34*r;for(let[a,o]of[[290,280],[360,370],[600,590],[670,690]])n.beginPath(),n.moveTo(a*r,540*r),n.lineTo(o*r,820*r),n.stroke();n.strokeStyle="#3d2414",n.lineWidth=26*r,n.beginPath(),n.moveTo(232*r,440*r),n.quadraticCurveTo(170*r,520*r,180*r,660*r),n.stroke(),n.lineWidth=18*r;for(let a=0;a<5;a++)n.beginPath(),n.moveTo((640+a*30)*r,(370-a*34)*r),n.lineTo((600+a*30)*r,(330-a*34)*r),n.stroke();n.fillStyle="#1b1008",n.beginPath(),n.arc(800*r,250*r,10*r,0,Math.PI*2),n.fill()}n.restore()}function Ui(n,t,e,i,{t:s=1,base:r=!0,margin:a=.08}={}){let o=t*(1-a*2)/1e3,c=t*a,l={k:o,ox:c,oy:c};if(i==="pic"){Ex(n,t,e,{t:s});return}if(i==="oracle"){r&&tl(n,t,t),el(n,ci(e,"oracle"),l,{t:s});return}if(i==="bronze"){r&&Kc(n,t,t),bx(n,ci(e,"bronze"),l,{t:s});return}if(r&&qs(n,t,t,{seed:11,fiber:.4}),i==="seal"){Ad(n,ci(e,"seal"),l,{t:s,w:Qo.seal});return}Tx(n,`${e}-${i}`,ci(e,i),l,{t:s})}var jc={ri:"\u65E5",yue:"\u6708",shan:"\u5C71",shui:"\u6C34",ren:"\u4EBA",ma:"\u99AC"};function qr(n){let t=n.clientWidth||300,e=Math.min(window.devicePixelRatio||1,2),i=Math.round(t*e);return(n.width!==i||n.height!==i)&&(n.width=i,n.height=i),i}var Qc=new Map;function Cd(n,t,e){let i=`${n}|${t}|${e}`;if(!Qc.has(i)){let s=document.createElement("canvas");s.width=e,s.height=e,Ui(s.getContext("2d"),e,n,t),Qc.set(i,s)}return Qc.get(i)}function Rd(n){let t=n.querySelector(".cg-time-cv"),e=t.getContext("2d"),i=n.querySelector(".cg-time-range"),s=n.querySelector(".cg-time-cap"),r=n.querySelector(".cg-time-note"),a=n.querySelector('[data-time="play"]'),o=JSON.parse(n.getAttribute("data-stages")||"[]"),c={key:"ri",v:Number(i.value)||0,playing:!1},l=0,h=0;function f(){if(!l)return;let v=Math.min(5,Math.max(0,c.v)),b=Math.min(4,Math.floor(v)),w=v-b;e.clearRect(0,0,l,l);let C=Cd(c.key,Qi[b].key,l),x=Cd(c.key,Qi[b+1].key,l),T=(W,L,H=0)=>{L<=.001||(e.save(),e.globalAlpha=L,H&&(e.translate(l/2,l/2),e.rotate(H),e.translate(-l/2,-l/2)),e.drawImage(W,0,0),e.restore())},P=c.key==="ma"&&b===0?-w*Math.PI/2:0;T(C,1-w,P),T(x,w);let D=Math.round(v),F=o[D]||Qi[D];s&&(s.innerHTML=`<b>${F.zh}</b> ${F.en}${F.when_en?`<small>${F.when_en} \xB7 ${F.when_zh}</small>`:""}`),r&&r.dataset.k!==`${c.key}|${D}`&&(r.dataset.k=`${c.key}|${D}`,r.innerHTML=F.text_en?`${F.text_en}<span class="zh">${F.text_zh}</span>`:""),i.style.setProperty("--p",`${v/5*100}%`),n.querySelectorAll("[data-stage]").forEach(W=>W.setAttribute("aria-pressed",Number(W.getAttribute("data-stage"))===D?"true":"false"))}function d(){n.querySelectorAll(".cg-time-mini").forEach((v,b)=>{let w=qr(v),C=v.getContext("2d");C.clearRect(0,0,w,w),Ui(C,w,c.key,Qi[b].key)})}function u(v,b=!1){c.v=b?Math.round(v):v,i.value=String(c.v),f()}function m(v){c.key=v,n.querySelectorAll("[data-tchar]").forEach(b=>b.setAttribute("aria-pressed",b.getAttribute("data-tchar")===v?"true":"false")),d(),f()}let y=0,g=0;function p(v){if(h=0,!c.playing)return;y||(y=v,g=Math.round(c.v)>=5?0:Math.round(c.v));let b=(v-y)/1e3,w=2.5,C=Math.floor(b/w),x=b/w-C,T=g+C+Math.min(1,Math.max(0,(x-.48)/.52));if(T>=5){u(5),A();return}let P=T-Math.floor(T);u(Math.floor(T)+P*P*(3-2*P)),h=requestAnimationFrame(p)}function S(){c.playing=!0,y=0,a&&(a.setAttribute("aria-pressed","true"),a.querySelector(".t").textContent="Pause \xB7 \u66AB\u505C"),h||(h=requestAnimationFrame(p))}function A(){c.playing=!1,a&&(a.setAttribute("aria-pressed","false"),a.querySelector(".t").textContent="Play 3,000 years \xB7 \u64AD\u653E\u4E09\u5343\u5E74")}return i.addEventListener("input",()=>{A(),u(Number(i.value))}),i.addEventListener("change",()=>u(Number(i.value),!0)),n.querySelectorAll("[data-stage]").forEach(v=>v.addEventListener("click",()=>{A(),u(Number(v.getAttribute("data-stage")))})),n.querySelectorAll(".cg-time-mini").forEach((v,b)=>v.addEventListener("click",()=>{A(),u(b)})),n.querySelectorAll("[data-tchar]").forEach(v=>v.addEventListener("click",()=>m(v.getAttribute("data-tchar")))),a&&a.addEventListener("click",()=>c.playing?A():S()),new ResizeObserver(()=>{l=qr(t),d(),f()}).observe(t),l=qr(t),m("ri"),n.__time={state:c,set:u,setKey:m,play:S,stop:A},n.__time}function Pd(n){let t=n.querySelector(".cg-which-cv"),e=t.getContext("2d"),i=n.querySelector(".cg-which-opts"),s=n.querySelector(".cg-which-msg"),r=n.querySelector(".cg-which-q"),a=n.querySelector(".cg-which-score"),o=n.querySelector(".cg-which-strip"),c=n.querySelector('[data-which="script"]'),l=JSON.parse(n.getAttribute("data-hints")||"{}"),h=Date.now()%2147483646+1,f=()=>(h=h*16807%2147483647,h/2147483647),d=w=>{let C=[...w];for(let x=C.length-1;x>0;x--){let T=Math.floor(f()*(x+1));[C[x],C[T]]=[C[T],C[x]]}return C},u={order:d(yn),i:0,right:0,tries:0,answered:!1,firstTry:!0,stage:"oracle",choices:[]},m=0;function y(){m&&(e.clearRect(0,0,m,m),Ui(e,m,u.order[u.i],u.stage))}function g(w){o&&(o.innerHTML="",Qi.forEach(C=>{let x=document.createElement("figure"),T=document.createElement("canvas");T.width=120,T.height=120,Ui(T.getContext("2d"),120,w,C.key);let P=document.createElement("figcaption");P.textContent=C.zh,x.append(T,P),o.append(x)}),o.hidden=!1)}function p(){let w=u.order[u.i];u.answered=!1,u.firstTry=!0;let C=d(yn.filter(T=>T!==w)).slice(0,3);u.choices=d([w,...C]),i.innerHTML=u.choices.map(T=>`<button type="button" data-ans="${T}">${jc[T]}</button>`).join(""),i.querySelectorAll("[data-ans]").forEach(T=>T.addEventListener("click",()=>A(T.getAttribute("data-ans"))));let x=u.stage==="oracle"?"oracle bone script \xB7 \u7532\u9AA8\u6587":"bronze script \xB7 \u91D1\u6587";r&&(r.innerHTML=`Question ${u.i+1} of ${yn.length}: which character is this ${x.split(" \xB7 ")[0]}?<span class="zh">\u7B2C ${u.i+1} \u984C\uFF08\u5171 ${yn.length} \u984C\uFF09\uFF1A\u9019\u500B${x.split(" \xB7 ")[1]}\u662F\u54EA\u500B\u5B57\uFF1F</span>`),s&&(s.innerHTML='Look at the shape, then choose.<span class="zh">\u770B\u5F62\u72C0\uFF0C\u518D\u9078\u4E00\u500B\u5B57\u3002</span>'),o&&(o.hidden=!0),y()}function S(){a&&(a.textContent=`${u.right} / ${Math.min(yn.length,u.i+(u.answered?1:0))}`)}function A(w){if(u.answered)return null;let C=u.order[u.i];u.tries++;let x=i.querySelector(`[data-ans="${w}"]`);if(w===C)u.firstTry&&u.right++,u.answered=!0,x&&x.classList.add("ok"),i.querySelectorAll("button").forEach(T=>{T.disabled=!0}),s&&(s.innerHTML=`Yes! It is ${jc[C]} (${l[C]?l[C].word:""}). Here is how it changed over 3,000 years:<span class="zh">\u7B54\u5C0D\u4E86\uFF01\u9019\u662F\u300C${jc[C]}\u300D\u3002\u770B\u770B\u5B83\u4E09\u5343\u5E74\u4F86\u600E\u9EBC\u8B8A\uFF1A</span>`),g(C),u.i===yn.length-1&&s&&(s.innerHTML+=`<span class="cg-which-end">That was the last one. Tap Play again for a new round${u.stage==="oracle"?", or try the bronze script":""}.<span class="zh">\u9019\u662F\u6700\u5F8C\u4E00\u984C\u3002\u6309\u300C\u518D\u73A9\u4E00\u6B21\u300D\u91CD\u65B0\u958B\u59CB${u.stage==="oracle"?"\uFF0C\u6216\u6539\u770B\u91D1\u6587":""}\u3002</span></span>`);else{u.firstTry=!1,x&&(x.classList.add("no"),x.disabled=!0);let T=l[C];s&&(s.innerHTML=`Not quite. ${T?T.en:""}<span class="zh">\u9084\u4E0D\u662F\u3002${T?T.zh:""}</span>`)}return S(),w===C}function v(){u.i>=yn.length-1?(u.order=d(yn),u.i=0,u.right=0,u.tries=0):u.i++,S(),p()}function b(w){u.stage=w,u.order=d(yn),u.i=0,u.right=0,u.tries=0,c&&(c.querySelector(".t").textContent=w==="oracle"?"Try the bronze script \xB7 \u6539\u770B\u91D1\u6587":"Back to oracle bones \xB7 \u6539\u56DE\u7532\u9AA8\u6587"),S(),p()}return n.querySelectorAll('[data-which="next"]').forEach(w=>w.addEventListener("click",v)),n.querySelectorAll('[data-which="again"]').forEach(w=>w.addEventListener("click",()=>b(u.stage))),c&&c.addEventListener("click",()=>b(u.stage==="oracle"?"bronze":"oracle")),new ResizeObserver(()=>{m=qr(t),y()}).observe(t),m=qr(t),p(),S(),n.__which={state:u,answer:A,next:v,setStage:b},n.__which}var je=(n,t,e)=>new N(n,t,e),ts=n=>Vs.smootherstep(Te(n),0,1),th=Object.fromEntries(yn.map(n=>[n,wd(n)])),Ve={x:-2.55,z:.25,w:1.6,h:2.5,t:.07},We={x:.2,z:.5,w:2.4,h:2.8,box:2,bc:[.2,.42]},Zn={x:2.75,z:-.55,r:.72},Cn={x:2.75,z:1.25,s:1.35},vn=420,hn={cx:.34,cy:-.18,s:.66},Pe={x:-.34,y:-.3},nl=[[0,-1.25],[.3,-1.21],[.5,-1.06],[.6,-.82],[.66,-.56],[.8,-.4],[.82,.12],[.7,.4],[.62,.72],[.52,1],[.34,1.22],[.14,1.17],[0,1.1]];function Ax(){let n=[...nl.map(([e,i])=>new ht(e,-i)),...nl.slice(1,-1).reverse().map(([e,i])=>new ht(-e,-i))],t=new Nn;return t.moveTo(n[0].x,n[0].y),t.splineThru([...n.slice(1),n[0]]),t}function Cx(){let n=[];for(let t of[-.82,-.3,.22,.7])for(let e of[-.34,.34])n.push({x:e,y:t});return n}function Rx(n){let t=G=>n.querySelector(G),e=G=>n.querySelectorAll(G),i=t(".al-space"),s=t(".al-space-cv"),r;try{r=new qo({canvas:s,antialias:!0})}catch{return n.classList.add("al-nogl"),null}r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),r.shadowMap.enabled=!0,r.shadowMap.type=qi;let a=new hr;a.background=new Qt(725798);let o=new Ge(34,1,.05,200),c=new Jo(o,s);c.enableDamping=!0,c.dampingFactor=.08,c.minDistance=.5,c.maxDistance=30,c.maxPolarAngle=Math.PI*.47,a.add(new Ar(16774368,2760728,.8)),a.add(new Lr(16777215,.14));let l=new Ir(16773596,1.5);l.position.set(-4,9,5),l.castShadow=!0,l.shadow.mapSize.set(2048,2048),Object.assign(l.shadow.camera,{left:-6,right:6,top:4,bottom:-4,near:1,far:25}),l.shadow.bias=-4e-4,l.shadow.normalBias=.02,a.add(l),gd(a,{w:10.4,d:6.2,felt:[We.x,We.z,3,3.6],weight:[We.x,We.z-We.h/2+.16,2.2],stone:null});let h=new Ce,f=Ax(),d=new le({color:14272931,roughness:.78}),u=new Jt(new ii(f,{depth:Ve.t,bevelEnabled:!0,bevelThickness:.012,bevelSize:.012,bevelSegments:2,curveSegments:40}),d),m=Ve.w+.1,y=Ve.h+.1,g=()=>{let G=document.createElement("canvas");G.width=Math.round(m*vn),G.height=Math.round(y*vn);let k=new wn(G);return k.colorSpace=Ae,k.anisotropy=4,k.repeat.set(1/m,1/y),k.offset.set(.5,.5),{c:G,g:G.getContext("2d"),tex:k}},p=g(),S=g(),A=new Jt(new Ds(f,40),new le({map:p.tex,roughness:.7}));A.position.z=Ve.t+.0135;let v=new Jt(new Ds(f,40),new le({map:S.tex,roughness:.75}));v.rotation.y=Math.PI,v.position.z=-.0135;let b=new Ce;b.add(u,A,v),b.rotation.x=-Math.PI/2,b.traverse(G=>{G.isMesh&&(G.castShadow=!0,G.receiveShadow=!0)});let w=new Ce;w.add(b),w.position.y=Ve.t/2+.03,b.position.y=-Ve.t/2,h.add(w);let C=new Jt(new Je(2.3,.02,3.1),new le({color:5974564,roughness:1}));C.position.y=.01,C.receiveShadow=!0,h.add(C),h.position.set(Ve.x,0,Ve.z),a.add(h);let x=(G,k)=>[(G+m/2)*vn,(k+y/2)*vn],T={k:hn.s*vn/1e3,ox:x(hn.cx-hn.s/2,0)[0],oy:x(0,hn.cy-hn.s/2)[1]},P=Cx(),D=P.find(G=>Math.abs(G.x-Pe.x)<1e-6&&Math.abs(G.y-Pe.y)<1e-6);function F(G){let k=[...nl,...nl.slice(1,-1).reverse().map(([dt,Lt])=>[-dt,Lt])];G.beginPath(),k.forEach(([dt,Lt],ce)=>{let[xe,ye]=x(dt,Lt);ce?G.lineTo(xe,ye):G.moveTo(xe,ye)}),G.closePath()}function W(G){G.save(),G.strokeStyle="rgba(120,90,50,.45)",G.lineWidth=3,G.lineCap="round";let k=dt=>{G.beginPath(),dt.forEach(([Lt,ce],xe)=>{let[ye,Xe]=x(Lt,ce);xe?G.lineTo(ye,Xe):G.moveTo(ye,Xe)}),G.stroke()};k([[0,-1.2],[.01,-.6],[-.01,0],[.01,.6],[0,1.1]]);for(let[dt,Lt]of[[-.95,.42],[-.62,.62],[-.05,.8],[.48,.66],[.86,.5]])k([[-Lt,dt+.03],[-Lt/2,dt-.01],[0,dt],[Lt/2,dt-.01],[Lt,dt+.03]]);G.restore()}function L(G){let k=[[Pe.x-.02,Pe.y-.2],[Pe.x+.01,Pe.y-.08],[Pe.x-.01,Pe.y+.06],[Pe.x+.01,Pe.y+.2]],dt=[[Pe.x,Pe.y-.02],[Pe.x+.08,Pe.y+.02],[Pe.x+.15,Pe.y+0],[Pe.x+.21,Pe.y+.05]];return{main:k,branch:dt,u:G}}function H(G,k){if(k<=0)return;let{main:dt,branch:Lt}=L(k);G.save(),G.strokeStyle="#2a1a0c",G.lineWidth=3.4,G.lineCap="round",G.lineJoin="round";let ce=(xe,ye)=>{let Xe=xe.length-1,Ne=ye*Xe;G.beginPath();for(let M=0;M<=Math.min(Xe,Math.floor(Ne));M++){let[O,Y]=x(...xe[M]);M?G.lineTo(O,Y):G.moveTo(O,Y)}let un=Math.floor(Ne);if(un<Xe){let M=xe[un],O=xe[un+1],Y=Ne-un;G.lineTo(...x(M[0]+(O[0]-M[0])*Y,M[1]+(O[1]-M[1])*Y))}G.stroke()};ce(dt,Te(k/.6)),k>.5&&ce(Lt,Te((k-.5)/.5)),G.restore()}function tt(G,k){let{g:dt,c:Lt,tex:ce}=p;dt.clearRect(0,0,Lt.width,Lt.height),dt.save(),tl(dt,Lt.width,Lt.height,{seed:5,color:"#e3d4b0"}),F(dt),dt.clip(),W(dt),H(dt,G),k>0&&el(dt,ci(z.char,"oracle"),T,{t:k,w:40}),dt.restore(),ce.needsUpdate=!0}function j(G){let{g:k,c:dt,tex:Lt}=S;k.clearRect(0,0,dt.width,dt.height),k.save(),k.translate(dt.width,0),k.scale(-1,1),tl(k,dt.width,dt.height,{seed:9,color:"#dccba5"}),F(k),k.clip(),W(k);for(let ce of P){let[xe,ye]=x(ce.x,ce.y),Xe=ce===D;k.fillStyle="rgba(92,64,34,.85)",k.beginPath(),k.ellipse(xe,ye,.045*vn,.15*vn,0,0,Math.PI*2),k.fill(),k.fillStyle="rgba(60,40,20,.55)",k.beginPath(),k.ellipse(xe+3,ye+3,.03*vn,.12*vn,0,0,Math.PI*2),k.fill();let Ne=xe+Math.sign(-ce.x)*.085*vn;k.fillStyle="rgba(92,64,34,.85)",k.beginPath(),k.arc(Ne,ye,.05*vn,0,Math.PI*2),k.fill();let un=Xe?G:ce.y<Pe.y?1:0;if(un>0){let M=k.createRadialGradient(Ne,ye,0,Ne,ye,.1*vn);M.addColorStop(0,`rgba(20,10,4,${.9*un})`),M.addColorStop(1,"rgba(20,10,4,0)"),k.fillStyle=M,k.beginPath(),k.arc(Ne,ye,.1*vn,0,Math.PI*2),k.fill()}}k.restore(),Lt.needsUpdate=!0}let it=new Ce,J=new Jt(new Tn(.025,.03,1.5,12),new le({color:4863268,roughness:.8}));J.position.y=.75,it.add(J);let rt=new Jt(new Ns(.045,16,12),new le({color:16738842,emissive:16730634,emissiveIntensity:2.2}));it.add(rt);let at=new Pr(16742954,0,1.6,2);at.position.y=.05,it.add(at),it.visible=!1,a.add(it);let St=new Ce,Ct=new le({color:11570519,metalness:.75,roughness:.35}),Wt=new Nn;Wt.moveTo(0,0),Wt.lineTo(.05,.12),Wt.lineTo(.05,.42),Wt.lineTo(-.035,.42),Wt.lineTo(-.02,.1),Wt.closePath();let qt=new Jt(new ii(Wt,{depth:.012,bevelEnabled:!1}),Ct);qt.position.z=-.006;let te=new Jt(new Je(.075,.42,.04),new le({color:7031340,roughness:.7}));te.position.set(.008,.62,0);let et=new Ce;et.add(qt,te),et.rotation.z=-.32,et.rotation.x=.18,St.add(et),St.visible=!1,St.traverse(G=>{G.isMesh&&(G.castShadow=!0)}),a.add(St);let nt=(G,k,dt=new N)=>dt.set(Ve.x+G,w.position.y+Ve.t/2+.014,Ve.z+k),pt=new Ce,Gt=new wn((()=>{let G=document.createElement("canvas");G.width=1024,G.height=256;let k=G.getContext("2d");k.fillStyle="#6f7d5a",k.fillRect(0,0,1024,256);let dt=An(12);for(let Lt=0;Lt<500;Lt++){k.fillStyle=dt()<.5?`rgba(60,110,90,${.1+dt()*.25})`:`rgba(120,90,50,${.08+dt()*.2})`;let ce=dt()*1024,xe=dt()*256,ye=4+dt()*26;k.beginPath(),k.arc(ce,xe,ye,0,Math.PI*2),k.fill()}k.strokeStyle="rgba(40,48,34,.75)",k.lineWidth=5;for(let Lt=0;Lt<1024;Lt+=64)k.beginPath(),k.moveTo(Lt+8,70),k.lineTo(Lt+56,70),k.lineTo(Lt+56,110),k.lineTo(Lt+20,110),k.lineTo(Lt+20,86),k.lineTo(Lt+40,86),k.lineTo(Lt+40,98),k.stroke();return k.fillStyle="rgba(40,48,34,.6)",k.fillRect(0,56,1024,4),k.fillRect(0,122,1024,4),G})());Gt.colorSpace=Ae;let bt=[[0,.3],[.3,.31],[.5,.38],[.64,.56],[.7,.8],[.7,.96],[.76,.99],[.76,1.03],[.66,1.03],[.64,.98],[.64,.8],[.58,.6],[.46,.46],[.26,.4],[0,.39]].map(([G,k])=>new ht(G*Zn.r/.72,k)),Ut=new Jt(new wr(bt,64),new le({map:Gt,metalness:.45,roughness:.62,side:on}));pt.add(Ut);for(let G=0;G<3;G++){let k=G/3*Math.PI*2+Math.PI/2,dt=new Jt(new Tn(.075,.1,.4,16),new le({color:6254156,metalness:.45,roughness:.6}));dt.position.set(Math.cos(k)*.4,.2,Math.sin(k)*.4),pt.add(dt)}for(let G of[-1,1]){let k=new Nn;k.moveTo(-.13,0),k.lineTo(-.13,.26),k.quadraticCurveTo(0,.3,.13,.26),k.lineTo(.13,0),k.lineTo(.08,0),k.lineTo(.08,.2),k.quadraticCurveTo(0,.23,-.08,.2),k.lineTo(-.08,0),k.closePath();let dt=new Jt(new ii(k,{depth:.04,bevelEnabled:!1}),new le({color:6517328,metalness:.45,roughness:.6}));dt.rotation.y=Math.PI/2,dt.position.set(G*.7,1.02,.02*G),pt.add(dt)}let Kt=document.createElement("canvas");Kt.width=512,Kt.height=512;let R=new wn(Kt);R.colorSpace=Ae;let V=new Jt(new Hi(.43*Zn.r/.72,48),new le({map:R,metalness:.4,roughness:.6}));V.rotation.x=-Math.PI/2,V.position.y=.462,pt.add(V),pt.traverse(G=>{G.isMesh&&(G.castShadow=!0,G.receiveShadow=!0)}),pt.position.set(Zn.x,0,Zn.z),a.add(pt);let K=document.createElement("canvas");K.width=640,K.height=640;let st=new wn(K);st.colorSpace=Ae;let lt=document.createElement("canvas");lt.width=640,lt.height=640;let vt=new Jt(new si(Cn.s,Cn.s),new le({map:st,roughness:.95}));vt.rotation.x=-Math.PI/2,vt.position.set(Cn.x,.012,Cn.z),vt.receiveShadow=!0,a.add(vt);let mt=new Ce,Pt=new Jt(new Ns(.13,20,14),new le({color:15524556,roughness:1}));Pt.scale.y=.6,Pt.position.y=.08,mt.add(Pt);let kt=new Jt(new Tn(.03,.05,.12,10),new le({color:14273712,roughness:1}));kt.position.y=.2,mt.add(kt),mt.visible=!1,mt.traverse(G=>{G.isMesh&&(G.castShadow=!0)}),a.add(mt);let I=(()=>{let G=[];for(let k=0;k<7;k++)for(let dt=0;dt<7;dt++)G.push([.1+(k%2?6-dt:dt)*.133,.1+k*.133]);return G})();function ee(){let G=Kt.getContext("2d");G.fillStyle="#56644a",G.fillRect(0,0,512,512);let k=An(21);for(let Lt=0;Lt<160;Lt++)G.fillStyle=`rgba(${k()<.5?"70,120,96":"40,46,32"},${.15+k()*.25})`,G.beginPath(),G.arc(k()*512,k()*512,3+k()*14,0,Math.PI*2),G.fill();let dt={k:.36,ox:76,oy:76};el(G,ci(z.char,"bronze").map(Lt=>({pts:Ix(Lt)})),dt,{w:64,dark:"#26301f",mid:"#3a4630",light:"rgba(190,200,160,.35)"}),R.needsUpdate=!0}function $t(G){let k=lt.getContext("2d");Kc(k,640,640,{seed:8}),Ui(k,640,z.char,"bronze",{base:!1,margin:.12});let dt=K.getContext("2d");dt.fillStyle="#f2ece0",dt.fillRect(0,0,640,640);let Lt=Math.floor(G*I.length);if(Lt>0){dt.save(),dt.beginPath();for(let ce=0;ce<Lt;ce++){let[xe,ye]=I[ce];dt.moveTo(xe*640+70,ye*640),dt.arc(xe*640,ye*640,70,0,Math.PI*2)}dt.clip(),dt.drawImage(lt,0,0),dt.restore()}st.needsUpdate=!0}let E=dd({w:We.w,h:We.h,x:We.x,y:.016,z:We.z,box:We.box,boxCenter:We.bc,grid:!1});E.mesh.receiveShadow=!0,a.add(E.mesh);let _=ud({hair:"goat"});_.group.traverse(G=>{G.isMesh&&(G.castShadow=!0)}),a.add(_.group),_.setInk(1);let B=null,X=pd(t(".al-labels"),s,o),$={hollow:X.add("cg-lb cg-lb-k","Hollows<small>\u947D\u947F</small>"),crack:X.add("cg-lb cg-lb-k","Crack<small>\u535C\u5146</small>"),carve:X.add("cg-lb cg-lb-k","Carved character<small>\u523B\u7684\u5B57</small>"),ding:X.add("cg-lb cg-lb-k","Bronze ding<small>\u9752\u9285\u9F0E</small>"),insc:X.add("cg-lb cg-lb-k","Inscription<small>\u9298\u6587</small>"),rub:X.add("cg-lb cg-lb-k","Rubbing<small>\u62D3\u7247</small>"),seal:X.add("cg-lb cg-lb-k","Small seal script<small>\u5C0F\u7BC6</small>")},ft=Object.fromEntries(JSON.parse(n.getAttribute("data-modes")||"[]").map(G=>[G.key,G])),ut={play:t(".al-play"),rk:t(".cg-mode-k"),rt:t(".cg-mode-t"),when:t(".cg-when-out"),tool:t(".cg-tool-out"),step:t(".cg-step-out"),stepT:t(".cg-step-t")},Q=[{key:"hollow",dur:2.2},{key:"heat",dur:3},{key:"crack",dur:2.6},{key:"carve",dur:0}],z={mode:"shell",char:"ri",playing:!0,labels:!0,speed:1,t:0,step:0,stepOnly:!1,cam:"near"},_t=()=>2+Ld(ci(z.char,"oracle"))/520;Q[3].dur=_t();let Rt=[];function gt(){Q[3].dur=_t();let G=0;return Rt=Q.map(k=>{let dt=G;return G+=k.dur,dt}),G}let yt=gt(),zt=5.5;function Ht(G,k){let dt=Vs.degToRad(o.fov/2),Lt=Math.atan(Math.tan(dt)*o.aspect);return Math.max(k/2/Math.tan(dt),G/2/Math.tan(Lt))}let jt={shell:()=>({t:je(Ve.x,.1,Ve.z+.05),d:je(.25,.95,.62),w:2.4,h:2.9}),bronze:()=>({t:je(Zn.x,.3,(Zn.z+Cn.z)/2-.08),d:je(-.12,1,.4),w:2.5,h:4}),seal:()=>({t:je(We.bc[0],.2,We.bc[1]+.02),d:je(-.18,.9,.55),w:2.7,h:3}),wide:()=>({t:je(.1,.3,.3),d:je(0,.8,.75),w:9.4,h:4.6})},U={t:1,p0:je(0,0,0),p1:je(0,0,0),t0:je(0,0,0),t1:je(0,0,0)};function Mt(G,k,dt){if(dt){o.position.copy(G),c.target.copy(k),U.t=1;return}U.p0.copy(o.position),U.t0.copy(c.target),U.p1.copy(G),U.t1.copy(k),U.t=0}function ot(G){let k=jt[z.cam==="wide"?"wide":z.mode]();Mt(k.d.clone().normalize().multiplyScalar(Ht(k.w,k.h)).add(k.t),k.t,G)}let xt=(G,k,dt)=>e(G).forEach(Lt=>Lt.setAttribute("aria-pressed",Lt.getAttribute(k)===String(dt)?"true":"false"));function wt(G){z.playing=G,n.classList.toggle("is-playing",G),ut.play.setAttribute("aria-pressed",G?"true":"false"),ut.play.querySelector(".al-play-t").textContent=G?"Pause \xB7 \u66AB\u505C":"Play \xB7 \u64AD\u653E",n.classList.remove("al-fresh")}function ct(G){z.speed=G,xt("[data-speed]","data-speed",G)}function It(G={}){var dt;G.mode&&(z.mode=G.mode),G.char&&(z.char=G.char),z.t=0,z.stepOnly=G.step!=null,z.mode==="shell"&&(yt=gt(),z.step=(dt=G.step)!=null?dt:0,z.t=Rt[z.step],z.stepOnly&&z.step>0&&(z.t=Rt[z.step])),z.mode==="bronze"&&(ee(),$t(0)),z.mode==="seal"&&(E.clearInk(),B=fd(E,th[z.char])),n.dataset.mode=z.mode,xt("[data-mode]","data-mode",z.mode),xt("[data-char]","data-char",z.char),xt("[data-step]","data-step",z.mode==="shell"?z.stepOnly?z.step:"all":""),e(".cg-panel[data-panel]").forEach(Lt=>{Lt.hidden=Lt.getAttribute("data-panel")!==z.mode});let k=ft[z.mode];k&&(ut.rk&&(ut.rk.innerHTML=`${k.zh}<small>${k.en}</small>`),ut.when&&(ut.when.innerHTML=`${k.when_en}<small>${k.when_zh}</small>`),ut.tool&&(ut.tool.innerHTML=`${k.tool_en}<small>${k.tool_zh}</small>`)),G.fly!==!1&&ot(!!G.instant),wt(!0),Fi(0)}e("[data-mode]").forEach(G=>G.addEventListener("click",()=>It({mode:G.getAttribute("data-mode")}))),e("[data-char]").forEach(G=>G.addEventListener("click",()=>It({char:G.getAttribute("data-char"),fly:!1}))),e("[data-step]").forEach(G=>G.addEventListener("click",()=>{let k=G.getAttribute("data-step");It({mode:"shell",step:k==="all"?void 0:Number(k),fly:z.mode!=="shell"})})),e("[data-speed]").forEach(G=>G.addEventListener("click",()=>ct(Number(G.getAttribute("data-speed"))))),e(".cg-again").forEach(G=>G.addEventListener("click",()=>It({fly:!1}))),e("[data-cam]").forEach(G=>G.addEventListener("click",()=>{z.cam=G.getAttribute("data-cam"),xt("[data-cam]","data-cam",z.cam),ot(!1)})),ut.play.addEventListener("click",()=>wt(!z.playing)),t(".al-home").addEventListener("click",()=>ot(!1));let Ft=t('[data-t="labels"]');Ft&&Ft.addEventListener("change",()=>{z.labels=Ft.checked});let re=je(0,0,0),he="",rn="";function Mn(){let G=z.t,k=0;for(;k<Q.length-1&&G>=Rt[k+1];)k++;z.stepOnly&&k>z.step&&(k=z.step);let dt=Te(G-Rt[k],0,Q[k].dur),Lt=Q[k].dur?dt/Q[k].dur:1;z.step=k;let ce=0;k===0?ce=Math.PI*ts(Lt/.6):k===1?ce=Math.PI:k===2&&(ce=Math.PI*(1-ts(Lt/.45))),w.rotation.z=ce,w.position.y=Ve.t/2+.03+Math.sin(ce)*.55;let xe=k===0?0:k===1?ts((Lt-.25)/.6):1,ye=`${xe.toFixed(2)}`;ye!==rn&&(j(xe),rn=ye);let Xe=k<2?0:k===2?Te((Lt-.45)/.5):1,Ne=k<3?0:Te((dt-.6)/(Q[3].dur-1.2)),un=`${z.char}|${Xe.toFixed(3)}|${Ne.toFixed(3)}`;if(un!==he&&(tt(Xe,Ne),he=un),it.visible=k===1,it.visible){let Y=Ve.x-(D.x+Math.sign(-D.x)*.085),Z=Ve.z+D.y,q=ts(Lt/.3)*(1-ts((Lt-.82)/.18));it.position.set(Y+.05,w.position.y+Ve.t/2+.07+(1-q)*.6,Z+.03),it.rotation.set(.25,0,-.35),at.intensity=2.5*q*(.8+.2*Math.sin(G*20)),rt.material.emissiveIntensity=1.2+1.4*q}if(St.visible=k===3&&Ne>0&&Ne<1,St.visible){let Y=Lx(ci(z.char,"oracle"),Ne);nt(hn.cx-hn.s/2+Y[0]/1e3*hn.s,hn.cy-hn.s/2+Y[1]/1e3*hn.s,re),St.position.copy(re)}let M=z.labels&&z.cam!=="wide";if(nt(D.x,D.y-.32,re),re.y+=.2,$.hollow.hidden=!(M&&k<=1),$.hollow.hidden||(re.x=Ve.x-D.x,X.place($.hollow,re)),$.crack.hidden=!(M&&k>=2&&Xe>.6),$.crack.hidden||(nt(Pe.x,Pe.y-.32,re),X.place($.crack,re)),$.carve.hidden=!(M&&k===3&&Ne>.15),$.carve.hidden||(nt(hn.cx,hn.cy-hn.s/2-.1,re),X.place($.carve,re)),ut.step){let Y=ft.shell&&ft.shell.steps?ft.shell.steps[k]:null;ut.step.innerHTML=Y?`${k+1} / 4 \xB7 ${Y.en}<small>${Y.zh}</small>`:"\u2014",ut.stepT&&Y&&ut.stepT.dataset.k!==String(k)&&(ut.stepT.dataset.k=String(k),ut.stepT.innerHTML=`${Y.text_en}<span class="zh">${Y.text_zh}</span>`)}let O=z.stepOnly?Rt[z.step]+Q[z.step].dur:yt;G>=O+1.6&&(z.t=O+1.6)}function il(){let G=Te((z.t-.8)/zt);if($t(G),mt.visible=G>0&&G<1,mt.visible){let dt=G*I.length,Lt=Math.min(I.length-1,Math.floor(dt)),ce=Math.min(I.length-1,Lt+1),xe=dt-Lt,ye=I[Lt][0]+(I[ce][0]-I[Lt][0])*xe,Xe=I[Lt][1]+(I[ce][1]-I[Lt][1])*xe,Ne=Math.abs(Math.sin(dt*Math.PI));mt.position.set(Cn.x+(ye-.5)*Cn.s,.02+Ne*.12,Cn.z+(Xe-.5)*Cn.s)}let k=z.labels&&z.cam!=="wide";$.ding.hidden=!k,$.insc.hidden=!k,$.rub.hidden=!k,k&&(X.place($.ding,je(Zn.x-.95,.7,Zn.z)),X.place($.insc,je(Zn.x+.5,1.15,Zn.z-.55)),X.place($.rub,je(Cn.x,.02,Cn.z+Cn.s/2+.12))),z.t>.8+zt+2&&(z.t=.8+zt+2)}function sl(G){let k=z.t-.5;if(k<0){Xc(_,E,B.poseAt(0),(1-z.t/.5)*.4);return}let dt=B.poseAt(Math.min(k,B.duration)),Lt=k>B.duration?ts((k-B.duration)/.7)*.45:0;Xc(_,E,k>B.duration?{...dt,p:0}:dt,Lt+dt.hover*.3),B.drawTo(k),k>B.duration+2&&(z.t=.5+B.duration+2);let ce=z.labels&&z.cam!=="wide";$.seal.hidden=!(ce&&k>B.duration*.6),$.seal.hidden||X.place($.seal,E.world(500,-40))}function Fi(G){z.t+=(z.playing?G:0)*z.speed;for(let k of Object.keys($))["hollow","crack","carve","ding","insc","rub","seal"].includes(k)||($[k].hidden=!0);if(z.mode!=="shell"&&($.hollow.hidden=$.crack.hidden=$.carve.hidden=!0,it.visible=!1,St.visible=!1,at.intensity=0),z.mode!=="bronze"&&($.ding.hidden=$.insc.hidden=$.rub.hidden=!0,mt.visible=!1),z.mode!=="seal"&&($.seal.hidden=!0),z.mode==="shell"?Mn():z.mode==="bronze"?il():sl(G),z.mode!=="seal"&&Ys(),U.t<1){U.t=Math.min(1,U.t+G/1.1);let k=ts(U.t);o.position.lerpVectors(U.p0,U.p1,k),c.target.lerpVectors(U.t0,U.t1,k)}}function Ys(){_.group.quaternion.identity(),_.group.position.set(We.x+We.w/2-.25,.75,We.z-We.h/2+.35),_.setPose({d:0,dir:[1,0],fan:0,tilt:0})}let es=0,ns=0,is=!1;function zn(G){if(es=0,!is)return;let k=Math.min(.05,(G-(ns||G))/1e3);ns=G,Fi(k),c.update(),r.render(a,o),es=requestAnimationFrame(zn)}let ss=null;function $s(){let G=i.clientWidth,k=i.clientHeight;if(!G||!k)return;r.setSize(G,k,!1),o.aspect=G/k,o.fov=o.aspect<1.1?42:34,o.updateProjectionMatrix(),n.classList.toggle("cg-narrow",G<520);let dt=o.aspect<.9?0:o.aspect<1.25?1:2;dt!==ss&&(ss=dt,ot(!0))}new ResizeObserver($s).observe(i),new IntersectionObserver(G=>{is=G[0].isIntersecting,is&&!es&&(ns=0,es=requestAnimationFrame(zn))},{rootMargin:"120px"}).observe(n),ct(1),ee(),$t(0),It({mode:"shell",char:"ri",instant:!0}),$s(),n.classList.add("al-ready","al-fresh");let Oi={...Object.fromEntries(yn.map(G=>[G,()=>It({char:G,fly:!1})])),shell:()=>It({mode:"shell"}),bronze:()=>It({mode:"bronze"}),seal:()=>It({mode:"seal"})};return n.__lab={camera:o,controls:c,state:z,scene:a,setSpeed:ct,setPlaying:wt,start:It,STEPS:Q,stepT0:()=>Rt,front:p,back:S,demo:G=>Oi[G]&&Oi[G](),goCam:()=>ot(!0),run:G=>{for(let k=0;k<G;k+=.02)Fi(.02)},render:()=>{Fi(0),c.update(),r.render(a,o)}},{ready:()=>!0,demo:G=>Oi[G]&&Oi[G]()}}function Px(n){if(n.smooth===!1||n.pts.length<3)return n.pts;let t=n.pts,e=[];for(let i=0;i<t.length-1;i++){let s=t[Math.max(0,i-1)],r=t[i],a=t[i+1],o=t[Math.min(t.length-1,i+2)];for(let c=0;c<6;c++){let l=c/6,h=l*l,f=h*l,d=u=>.5*(2*r[u]+(-s[u]+a[u])*l+(2*s[u]-5*r[u]+4*a[u]-o[u])*h+(-s[u]+3*r[u]-3*a[u]+o[u])*f);e.push([d(0),d(1),r[2]||1])}}return e.push(t[t.length-1]),e}var Ix=Px;function Ld(n){return n.reduce((t,e)=>t+e.pts.reduce((i,s,r)=>r?i+Math.hypot(s[0]-e.pts[r-1][0],s[1]-e.pts[r-1][1]):0,0),0)}function Lx(n,t){let e=Ld(n)*Te(t);for(let s of n)for(let r=1;r<s.pts.length;r++){let a=s.pts[r-1],o=s.pts[r],c=Math.hypot(o[0]-a[0],o[1]-a[1]);if(c>=e){let l=e/(c||1);return[a[0]+(o[0]-a[0])*l,a[1]+(o[1]-a[1])*l]}e-=c}let i=n[n.length-1].pts;return i[i.length-1]}function Id(){document.querySelectorAll("[data-cg-evo]").forEach(i=>{let s=i.getAttribute("data-cg-evo");i.querySelectorAll("canvas[data-stage]").forEach(r=>{r.width=160,r.height=160,Ui(r.getContext("2d"),160,s,r.getAttribute("data-stage"))})});let n=document.querySelector("[data-cal-time]");n&&Rd(n);let t=document.querySelector("[data-cal-which]");t&&Pd(t);let e=document.querySelector("[data-cal-pad]");e&&_d(e,th.ri,th)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Id):Id();md("[data-caloracle-lab]",Rx,{demo:(n,t)=>n.demo(t)});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
