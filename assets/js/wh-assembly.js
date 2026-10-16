(()=>{var ti={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ei={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ch=0,Cl=1,hh=2;var er=1,uh=2,ss=3,ni=0,He=1,Bn=2,An=0,rs=1,xl=2,Bl=3,Al=4,dh=5;var _i=100,fh=101,ph=102,mh=103,gh=104,_h=200,Eh=201,Ch=202,xh=203,Ml=204,yl=205,Bh=206,Ah=207,Mh=208,yh=209,vh=210,Sh=211,Dh=212,bh=213,Ih=214,kr=0,Kr=1,Jr=2,zi=3,Wr=4,Xr=5,qr=6,Yr=7,Sa=0,Th=1,Fh=2,hn=0,vl=1,Sl=2,Dl=3,bl=4,Il=5,Tl=6,Fl=7;var wl=300,ii=301,Ei=302,Da=303,ba=304,nr=306,Qr=1e3,_n=1001,Zr=1002,Se=1003,wh=1004;var ir=1005;var Ie=1006,Ia=1007;var si=1008;var Ve=1009,Rl=1010,Gl=1011,as=1012,Ta=1013,un=1014,en=1015,dn=1016,Fa=1017,wa=1018,os=1020,Ll=35902,Pl=35899,Nl=1021,Ol=1022,nn=1023,Cn=1026,ri=1027,Ra=1028,Ga=1029,ai=1030,La=1031;var Pa=1033,sr=33776,rr=33777,ar=33778,or=33779,Na=35840,Oa=35841,Ha=35842,Ua=35843,za=36196,Va=37492,ka=37496,Ka=37488,Ja=37489,lr=37490,Wa=37491,Xa=37808,qa=37809,Ya=37810,Qa=37811,Za=37812,ja=37813,$a=37814,to=37815,eo=37816,no=37817,io=37818,so=37819,ro=37820,ao=37821,oo=36492,lo=36494,co=36495,ho=36283,uo=36284,cr=36285,fo=36286;var Ss=2300,jr=2301,zr=2302,ll=2303,cl=2400,hl=2401,ul=2402;var Rh=3200;var po=0,Gh=1,Gn="",We="srgb",Ds="srgb-linear",bs="linear",ae="srgb";var Vr=7680;var Lh=519,Ph=512,Nh=513,Oh=514,mo=515,Hh=516,Uh=517,go=518,zh=519,Vh=35044;var Hl="300 es",ln=2e3,Vi=2001;function sd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function rd(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Is(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function kh(){let i=Is("canvas");return i.style.display="block",i}var Rc={},ki=null;function Ul(...i){let t="THREE."+i.shift();ki?ki("log",t,...i):console.log(t,...i)}function Kh(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function zt(...i){i=Kh(i);let t="THREE."+i.shift();if(ki)ki("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Vt(...i){i=Kh(i);let t="THREE."+i.shift();if(ki)ki("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function mi(...i){let t=i.join(" ");t in Rc||(Rc[t]=!0,zt(...i))}function Jh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Wh={[kr]:Kr,[Jr]:qr,[Wr]:Yr,[zi]:Xr,[Kr]:kr,[qr]:Jr,[Yr]:Wr,[Xr]:zi},cn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Fe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Gc=1234567,As=Math.PI/180,Ki=180/Math.PI;function Ci(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Fe[i&255]+Fe[i>>8&255]+Fe[i>>16&255]+Fe[i>>24&255]+"-"+Fe[t&255]+Fe[t>>8&255]+"-"+Fe[t>>16&15|64]+Fe[t>>24&255]+"-"+Fe[e&63|128]+Fe[e>>8&255]+"-"+Fe[e>>16&255]+Fe[e>>24&255]+Fe[n&255]+Fe[n>>8&255]+Fe[n>>16&255]+Fe[n>>24&255]).toLowerCase()}function Yt(i,t,e){return Math.max(t,Math.min(e,i))}function zl(i,t){return(i%t+t)%t}function ad(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function od(i,t,e){return i!==t?(e-i)/(t-i):0}function Ms(i,t,e){return(1-e)*i+e*t}function ld(i,t,e,n){return Ms(i,t,1-Math.exp(-e*n))}function cd(i,t=1){return t-Math.abs(zl(i,t*2)-t)}function hd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function ud(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function dd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function fd(i,t){return i+Math.random()*(t-i)}function pd(i){return i*(.5-Math.random())}function md(i){i!==void 0&&(Gc=i);let t=Gc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function gd(i){return i*As}function _d(i){return i*Ki}function Ed(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Cd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function xd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Bd(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),u=a((t-n)/2),f=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*h,o*c);break;default:zt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Hi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Pe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Vl={DEG2RAD:As,RAD2DEG:Ki,generateUUID:Ci,clamp:Yt,euclideanModulo:zl,mapLinear:ad,inverseLerp:od,lerp:Ms,damp:ld,pingpong:cd,smoothstep:hd,smootherstep:ud,randInt:dd,randFloat:fd,randFloatSpread:pd,seededRandom:md,degToRad:gd,radToDeg:_d,isPowerOfTwo:Ed,ceilPowerOfTwo:Cd,floorPowerOfTwo:xd,setQuaternionFromProperEuler:Bd,normalize:Pe,denormalize:Hi},ql=class ql{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ql.prototype.isVector2=!0;var ut=ql,qe=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],g=r[a+2],A=r[a+3];if(d!==A||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+d*A;m<0&&(u=-u,f=-f,g=-g,A=-A,m=-m);let p=1-o;if(m<.9995){let B=Math.acos(m),v=Math.sin(B);p=Math.sin(p*B)/v,o=Math.sin(o*B)/v,l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+A*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+A*o;let B=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=B,c*=B,h*=B,d*=B}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-o*f,t[e+2]=c*g+h*f+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:zt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Yt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Yl=class Yl{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Lc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Lc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Oo.copy(this).projectOnVector(t),this.sub(Oo)}reflect(t){return this.sub(Oo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Yl.prototype.isVector3=!0;var F=Yl,Oo=new F,Lc=new qe,Ql=class Ql{constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],A=s[0],m=s[3],p=s[6],B=s[1],v=s[4],x=s[7],y=s[2],M=s[5],b=s[8];return r[0]=a*A+o*B+l*y,r[3]=a*m+o*v+l*M,r[6]=a*p+o*x+l*b,r[1]=c*A+h*B+d*y,r[4]=c*m+h*v+d*M,r[7]=c*p+h*x+d*b,r[2]=u*A+f*B+g*y,r[5]=u*m+f*v+g*M,r[8]=u*p+f*x+g*b,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=e*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let A=1/g;return t[0]=d*A,t[1]=(s*c-h*n)*A,t[2]=(o*n-s*a)*A,t[3]=u*A,t[4]=(h*e-s*l)*A,t[5]=(s*r-o*e)*A,t[6]=f*A,t[7]=(n*l-c*e)*A,t[8]=(a*e-n*r)*A,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return mi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ho.makeScale(t,e)),this}rotate(t){return mi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ho.makeRotation(-t)),this}translate(t,e){return mi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ho.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Ql.prototype.isMatrix3=!0;var Jt=Ql,Ho=new Jt,Pc=new Jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nc=new Jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ad(){let i={enabled:!0,workingColorSpace:Ds,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ae&&(s.r=Fn(s.r),s.g=Fn(s.g),s.b=Fn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ae&&(s.r=Ui(s.r),s.g=Ui(s.g),s.b=Ui(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Gn?bs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return mi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return mi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ds]:{primaries:t,whitePoint:n,transfer:bs,toXYZ:Pc,fromXYZ:Nc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:We},outputColorSpaceConfig:{drawingBufferColorSpace:We}},[We]:{primaries:t,whitePoint:n,transfer:ae,toXYZ:Pc,fromXYZ:Nc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:We}}}),i}var te=Ad();function Fn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ui(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var vi,$r=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{vi===void 0&&(vi=Is("canvas")),vi.width=t.width,vi.height=t.height;let s=vi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=vi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=Is("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Fn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Fn(e[n]/255)*255):e[n]=Fn(e[n]);return{data:e,width:t.width,height:t.height}}else return zt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Md=0,Ji=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Md++}),this.uuid=Ci(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Uo(s[a].image)):r.push(Uo(s[a]))}else r=Uo(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Uo(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?$r.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(zt("Texture: Unable to serialize Texture."),{})}var yd=0,zo=new F,Ue=class i extends cn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=_n,s=_n,r=Ie,a=si,o=nn,l=Ve,c=i.DEFAULT_ANISOTROPY,h=Gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yd++}),this.uuid=Ci(),this.name="",this.source=new Ji(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(zo).x}get height(){return this.source.getSize(zo).y}get depth(){return this.source.getSize(zo).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){zt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){zt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Qr:t.x=t.x-Math.floor(t.x);break;case _n:t.x=t.x<0?0:1;break;case Zr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Qr:t.y=t.y-Math.floor(t.y);break;case _n:t.y=t.y<0?0:1;break;case Zr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ue.DEFAULT_IMAGE=null;Ue.DEFAULT_MAPPING=wl;Ue.DEFAULT_ANISOTROPY=1;var Zl=class Zl{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],A=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-A)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+A)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(c+1)/2,x=(f+1)/2,y=(p+1)/2,M=(h+u)/4,b=(d+A)/4,E=(g+m)/4;return v>x&&v>y?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=M/n,r=b/n):x>y?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=M/s,r=E/s):y<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(y),n=b/r,s=E/r),this.set(n,s,r,e),this}let B=Math.sqrt((m-g)*(m-g)+(d-A)*(d-A)+(u-h)*(u-h));return Math.abs(B)<.001&&(B=1),this.x=(m-g)/B,this.y=(d-A)/B,this.z=(u-h)/B,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this.w=Yt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this.w=Yt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Zl.prototype.isVector4=!0;var me=Zl,ta=class extends cn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ie,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new Ue(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ie,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ji(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ze=class extends ta{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ts=class extends Ue{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Se,this.minFilter=Se,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var ea=class extends Ue{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Se,this.minFilter=Se,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var va=class va{constructor(t,e,n,s,r,a,o,l,c,h,d,u,f,g,A,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,u,f,g,A,m)}set(t,e,n,s,r,a,o,l,c,h,d,u,f,g,A,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=A,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new va().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Si.setFromMatrixColumn(t,0).length(),r=1/Si.setFromMatrixColumn(t,1).length(),a=1/Si.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=a*h,f=a*d,g=o*h,A=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-A*c,e[9]=-o*l,e[2]=A-u*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,g=c*h,A=c*d;e[0]=u+A*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=A+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,g=c*h,A=c*d;e[0]=u-A*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=A-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,f=a*d,g=o*h,A=o*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+A,e[1]=l*d,e[5]=A*c+u,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,f=a*c,g=o*l,A=o*c;e[0]=l*h,e[4]=A-u*d,e[8]=g*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-A*d}else if(t.order==="XZY"){let u=a*l,f=a*c,g=o*l,A=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+A,e[5]=a*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*h,e[10]=A*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(vd,t,Sd)}lookAt(t,e,n){let s=this.elements;return Ke.subVectors(t,e),Ke.lengthSq()===0&&(Ke.z=1),Ke.normalize(),Un.crossVectors(n,Ke),Un.lengthSq()===0&&(Math.abs(n.z)===1?Ke.x+=1e-4:Ke.z+=1e-4,Ke.normalize(),Un.crossVectors(n,Ke)),Un.normalize(),Cr.crossVectors(Ke,Un),s[0]=Un.x,s[4]=Cr.x,s[8]=Ke.x,s[1]=Un.y,s[5]=Cr.y,s[9]=Ke.y,s[2]=Un.z,s[6]=Cr.z,s[10]=Ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],A=n[6],m=n[10],p=n[14],B=n[3],v=n[7],x=n[11],y=n[15],M=s[0],b=s[4],E=s[8],D=s[12],I=s[1],R=s[5],P=s[9],V=s[13],w=s[2],z=s[6],H=s[10],U=s[14],it=s[3],X=s[7],j=s[11],nt=s[15];return r[0]=a*M+o*I+l*w+c*it,r[4]=a*b+o*R+l*z+c*X,r[8]=a*E+o*P+l*H+c*j,r[12]=a*D+o*V+l*U+c*nt,r[1]=h*M+d*I+u*w+f*it,r[5]=h*b+d*R+u*z+f*X,r[9]=h*E+d*P+u*H+f*j,r[13]=h*D+d*V+u*U+f*nt,r[2]=g*M+A*I+m*w+p*it,r[6]=g*b+A*R+m*z+p*X,r[10]=g*E+A*P+m*H+p*j,r[14]=g*D+A*V+m*U+p*nt,r[3]=B*M+v*I+x*w+y*it,r[7]=B*b+v*R+x*z+y*X,r[11]=B*E+v*P+x*H+y*j,r[15]=B*D+v*V+x*U+y*nt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],A=t[7],m=t[11],p=t[15],B=l*f-c*u,v=o*f-c*d,x=o*u-l*d,y=a*f-c*h,M=a*u-l*h,b=a*d-o*h;return e*(A*B-m*v+p*x)-n*(g*B-m*y+p*M)+s*(g*v-A*y+p*b)-r*(g*x-A*M+m*b)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],A=t[13],m=t[14],p=t[15],B=e*o-n*a,v=e*l-s*a,x=e*c-r*a,y=n*l-s*o,M=n*c-r*o,b=s*c-r*l,E=h*A-d*g,D=h*m-u*g,I=h*p-f*g,R=d*m-u*A,P=d*p-f*A,V=u*p-f*m,w=B*V-v*P+x*R+y*I-M*D+b*E;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/w;return t[0]=(o*V-l*P+c*R)*z,t[1]=(s*P-n*V-r*R)*z,t[2]=(A*b-m*M+p*y)*z,t[3]=(u*M-d*b-f*y)*z,t[4]=(l*I-a*V-c*D)*z,t[5]=(e*V-s*I+r*D)*z,t[6]=(m*x-g*b-p*v)*z,t[7]=(h*b-u*x+f*v)*z,t[8]=(a*P-o*I+c*E)*z,t[9]=(n*I-e*P-r*E)*z,t[10]=(g*M-A*x+p*B)*z,t[11]=(d*x-h*M-f*B)*z,t[12]=(o*D-a*R-l*E)*z,t[13]=(e*R-n*D+s*E)*z,t[14]=(A*v-g*y-m*B)*z,t[15]=(h*y-d*v+u*B)*z,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,A=a*h,m=a*d,p=o*d,B=l*c,v=l*h,x=l*d,y=n.x,M=n.y,b=n.z;return s[0]=(1-(A+p))*y,s[1]=(f+x)*y,s[2]=(g-v)*y,s[3]=0,s[4]=(f-x)*M,s[5]=(1-(u+p))*M,s[6]=(m+B)*M,s[7]=0,s[8]=(g+v)*b,s[9]=(m-B)*b,s[10]=(1-(u+A))*b,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Si.set(s[0],s[1],s[2]).length(),o=Si.set(s[4],s[5],s[6]).length(),l=Si.set(s[8],s[9],s[10]).length();r<0&&(a=-a),rn.copy(this);let c=1/a,h=1/o,d=1/l;return rn.elements[0]*=c,rn.elements[1]*=c,rn.elements[2]*=c,rn.elements[4]*=h,rn.elements[5]*=h,rn.elements[6]*=h,rn.elements[8]*=d,rn.elements[9]*=d,rn.elements[10]*=d,e.setFromRotationMatrix(rn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=ln,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s),g,A;if(l)g=r/(a-r),A=a*r/(a-r);else if(o===ln)g=-(a+r)/(a-r),A=-2*a*r/(a-r);else if(o===Vi)g=-a/(a-r),A=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=A,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=ln,l=!1){let c=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s),g,A;if(l)g=1/(a-r),A=a/(a-r);else if(o===ln)g=-2/(a-r),A=-(a+r)/(a-r);else if(o===Vi)g=-1/(a-r),A=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=A,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};va.prototype.isMatrix4=!0;var he=va,Si=new F,rn=new he,vd=new F(0,0,0),Sd=new F(1,1,1),Un=new F,Cr=new F,Ke=new F,Oc=new he,Hc=new qe,wn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Yt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:zt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Oc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Oc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Hc.setFromEuler(this),this.setFromQuaternion(Hc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};wn.DEFAULT_ORDER="XYZ";var Fs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Dd=0,Uc=new F,Di=new qe,Sn=new he,xr=new F,ms=new F,bd=new F,Id=new qe,zc=new F(1,0,0),Vc=new F(0,1,0),kc=new F(0,0,1),Kc={type:"added"},Td={type:"removed"},bi={type:"childadded",child:null},Vo={type:"childremoved",child:null},De=class i extends cn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Dd++}),this.uuid=Ci(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new F,e=new wn,n=new qe,s=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new Jt}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Di.setFromAxisAngle(t,e),this.quaternion.multiply(Di),this}rotateOnWorldAxis(t,e){return Di.setFromAxisAngle(t,e),this.quaternion.premultiply(Di),this}rotateX(t){return this.rotateOnAxis(zc,t)}rotateY(t){return this.rotateOnAxis(Vc,t)}rotateZ(t){return this.rotateOnAxis(kc,t)}translateOnAxis(t,e){return Uc.copy(t).applyQuaternion(this.quaternion),this.position.add(Uc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(zc,t)}translateY(t){return this.translateOnAxis(Vc,t)}translateZ(t){return this.translateOnAxis(kc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Sn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?xr.copy(t):xr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sn.lookAt(ms,xr,this.up):Sn.lookAt(xr,ms,this.up),this.quaternion.setFromRotationMatrix(Sn),s&&(Sn.extractRotation(s.matrixWorld),Di.setFromRotationMatrix(Sn),this.quaternion.premultiply(Di.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Vt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Kc),bi.child=t,this.dispatchEvent(bi),bi.child=null):Vt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Td),Vo.child=t,this.dispatchEvent(Vo),Vo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Sn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Sn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Sn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Kc),bi.child=t,this.dispatchEvent(bi),bi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,t,bd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,Id,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};De.DEFAULT_UP=new F(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var En=class extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}},Fd={type:"move"},Wi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new En,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new En,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new En,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let A of t.hand.values()){let m=e.getJointPose(A,n),p=this._getHandJoint(c,A);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Fd)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new En;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Xh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},Br={h:0,s:0,l:0};function ko(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Xt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=We){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=te.workingColorSpace){return this.r=t,this.g=e,this.b=n,te.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=te.workingColorSpace){if(t=zl(t,1),e=Yt(e,0,1),n=Yt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ko(a,r,t+1/3),this.g=ko(a,r,t),this.b=ko(a,r,t-1/3)}return te.colorSpaceToWorking(this,s),this}setStyle(t,e=We){function n(r){r!==void 0&&parseFloat(r)<1&&zt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:zt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);zt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=We){let n=Xh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):zt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Fn(t.r),this.g=Fn(t.g),this.b=Fn(t.b),this}copyLinearToSRGB(t){return this.r=Ui(t.r),this.g=Ui(t.g),this.b=Ui(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=We){return te.workingToColorSpace(we.copy(this),t),Math.round(Yt(we.r*255,0,255))*65536+Math.round(Yt(we.g*255,0,255))*256+Math.round(Yt(we.b*255,0,255))}getHexString(t=We){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.workingToColorSpace(we.copy(this),e);let n=we.r,s=we.g,r=we.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=te.workingColorSpace){return te.workingToColorSpace(we.copy(this),e),t.r=we.r,t.g=we.g,t.b=we.b,t}getStyle(t=We){te.workingToColorSpace(we.copy(this),t);let e=we.r,n=we.g,s=we.b;return t!==We?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(zn),this.setHSL(zn.h+t,zn.s+e,zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(zn),t.getHSL(Br);let n=Ms(zn.h,Br.h,e),s=Ms(zn.s,Br.s,e),r=Ms(zn.l,Br.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},we=new Xt;Xt.NAMES=Xh;var ws=class extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wn,this.environmentIntensity=1,this.environmentRotation=new wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},an=new F,Dn=new F,Ko=new F,bn=new F,Ii=new F,Ti=new F,Jc=new F,Jo=new F,Wo=new F,Xo=new F,qo=new me,Yo=new me,Qo=new me,Jn=class i{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),an.subVectors(t,e),s.cross(an);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){an.subVectors(s,e),Dn.subVectors(n,e),Ko.subVectors(t,e);let a=an.dot(an),o=an.dot(Dn),l=an.dot(Ko),c=Dn.dot(Dn),h=Dn.dot(Ko),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,bn.x),l.addScaledVector(a,bn.y),l.addScaledVector(o,bn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return qo.setScalar(0),Yo.setScalar(0),Qo.setScalar(0),qo.fromBufferAttribute(t,e),Yo.fromBufferAttribute(t,n),Qo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(qo,r.x),a.addScaledVector(Yo,r.y),a.addScaledVector(Qo,r.z),a}static isFrontFacing(t,e,n,s){return an.subVectors(n,e),Dn.subVectors(t,e),an.cross(Dn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return an.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),an.cross(Dn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Ii.subVectors(s,n),Ti.subVectors(r,n),Jo.subVectors(t,n);let l=Ii.dot(Jo),c=Ti.dot(Jo);if(l<=0&&c<=0)return e.copy(n);Wo.subVectors(t,s);let h=Ii.dot(Wo),d=Ti.dot(Wo);if(h>=0&&d<=h)return e.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Ii,a);Xo.subVectors(t,r);let f=Ii.dot(Xo),g=Ti.dot(Xo);if(g>=0&&f<=g)return e.copy(r);let A=f*c-l*g;if(A<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Ti,o);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Jc.subVectors(r,s),o=(d-h)/(d-h+(f-g)),e.copy(s).addScaledVector(Jc,o);let p=1/(m+A+u);return a=A*p,o=u*p,e.copy(n).addScaledVector(Ii,a).addScaledVector(Ti,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},xn=class{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(on.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(on.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=on.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,on):on.fromBufferAttribute(r,a),on.applyMatrix4(t.matrixWorld),this.expandByPoint(on);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ar.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ar.copy(n.boundingBox)),Ar.applyMatrix4(t.matrixWorld),this.union(Ar)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,on),on.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(gs),Mr.subVectors(this.max,gs),Fi.subVectors(t.a,gs),wi.subVectors(t.b,gs),Ri.subVectors(t.c,gs),Vn.subVectors(wi,Fi),kn.subVectors(Ri,wi),hi.subVectors(Fi,Ri);let e=[0,-Vn.z,Vn.y,0,-kn.z,kn.y,0,-hi.z,hi.y,Vn.z,0,-Vn.x,kn.z,0,-kn.x,hi.z,0,-hi.x,-Vn.y,Vn.x,0,-kn.y,kn.x,0,-hi.y,hi.x,0];return!Zo(e,Fi,wi,Ri,Mr)||(e=[1,0,0,0,1,0,0,0,1],!Zo(e,Fi,wi,Ri,Mr))?!1:(yr.crossVectors(Vn,kn),e=[yr.x,yr.y,yr.z],Zo(e,Fi,wi,Ri,Mr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,on).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(on).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},In=[new F,new F,new F,new F,new F,new F,new F,new F],on=new F,Ar=new xn,Fi=new F,wi=new F,Ri=new F,Vn=new F,kn=new F,hi=new F,gs=new F,Mr=new F,yr=new F,ui=new F;function Zo(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ui.fromArray(i,r);let o=s.x*Math.abs(ui.x)+s.y*Math.abs(ui.y)+s.z*Math.abs(ui.z),l=t.dot(ui),c=e.dot(ui),h=n.dot(ui);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Be=new F,vr=new ut,wd=0,Ne=class extends cn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Vh,this.updateRanges=[],this.gpuType=en,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)vr.fromBufferAttribute(this,e),vr.applyMatrix3(t),this.setXY(e,vr.x,vr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix3(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Hi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Pe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Hi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Hi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Hi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Hi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array),s=Pe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array),s=Pe(s,this.array),r=Pe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Rs=class extends Ne{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Gs=class extends Ne{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Ce=class extends Ne{constructor(t,e,n){super(new Float32Array(t),e,n)}},Rd=new xn,_s=new F,jo=new F,Wn=class{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Rd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;_s.subVectors(t,this.center);let e=_s.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(_s,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(jo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(_s.copy(t.center).add(jo)),this.expandByPoint(_s.copy(t.center).sub(jo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Gd=0,tn=new he,$o=new De,Gi=new F,Je=new xn,Es=new xn,ve=new F,Oe=class i extends cn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gd++}),this.uuid=Ci(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(sd(t)?Gs:Rs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return tn.makeRotationFromQuaternion(t),this.applyMatrix4(tn),this}rotateX(t){return tn.makeRotationX(t),this.applyMatrix4(tn),this}rotateY(t){return tn.makeRotationY(t),this.applyMatrix4(tn),this}rotateZ(t){return tn.makeRotationZ(t),this.applyMatrix4(tn),this}translate(t,e,n){return tn.makeTranslation(t,e,n),this.applyMatrix4(tn),this}scale(t,e,n){return tn.makeScale(t,e,n),this.applyMatrix4(tn),this}lookAt(t){return $o.lookAt(t),$o.updateMatrix(),this.applyMatrix4($o.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gi).negate(),this.translate(Gi.x,Gi.y,Gi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ce(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&zt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Je.setFromBufferAttribute(r),this.morphTargetsRelative?(ve.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(ve),ve.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(ve)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){let n=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Es.setFromBufferAttribute(o),this.morphTargetsRelative?(ve.addVectors(Je.min,Es.min),Je.expandByPoint(ve),ve.addVectors(Je.max,Es.max),Je.expandByPoint(ve)):(Je.expandByPoint(Es.min),Je.expandByPoint(Es.max))}Je.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)ve.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ve));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)ve.fromBufferAttribute(o,c),l&&(Gi.fromBufferAttribute(t,c),ve.add(Gi)),s=Math.max(s,n.distanceToSquared(ve))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Ne(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let E=0;E<n.count;E++)o[E]=new F,l[E]=new F;let c=new F,h=new F,d=new F,u=new ut,f=new ut,g=new ut,A=new F,m=new F;function p(E,D,I){c.fromBufferAttribute(n,E),h.fromBufferAttribute(n,D),d.fromBufferAttribute(n,I),u.fromBufferAttribute(r,E),f.fromBufferAttribute(r,D),g.fromBufferAttribute(r,I),h.sub(c),d.sub(c),f.sub(u),g.sub(u);let R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(A.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(R),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(R),o[E].add(A),o[D].add(A),o[I].add(A),l[E].add(m),l[D].add(m),l[I].add(m))}let B=this.groups;B.length===0&&(B=[{start:0,count:t.count}]);for(let E=0,D=B.length;E<D;++E){let I=B[E],R=I.start,P=I.count;for(let V=R,w=R+P;V<w;V+=3)p(t.getX(V+0),t.getX(V+1),t.getX(V+2))}let v=new F,x=new F,y=new F,M=new F;function b(E){y.fromBufferAttribute(s,E),M.copy(y);let D=o[E];v.copy(D),v.sub(y.multiplyScalar(y.dot(D))).normalize(),x.crossVectors(M,D);let R=x.dot(l[E])<0?-1:1;a.setXYZW(E,v.x,v.y,v.z,R)}for(let E=0,D=B.length;E<D;++E){let I=B[E],R=I.start,P=I.count;for(let V=R,w=R+P;V<w;V+=3)b(t.getX(V+0)),b(t.getX(V+1)),b(t.getX(V+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Ne(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new F,r=new F,a=new F,o=new F,l=new F,c=new F,h=new F,d=new F;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),A=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,A),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,A),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(A,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ve.fromBufferAttribute(t,e),ve.normalize(),t.setXYZ(e,ve.x,ve.y,ve.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let A=0,m=l.length;A<m;A++){o.isInterleavedBufferAttribute?f=l[A]*o.data.stride+o.offset:f=l[A]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new Ne(u,h,d)}if(this.index===null)return zt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var tl=new F,Ld=new F,Pd=new Jt,Xe=class{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=tl.subVectors(n,e).cross(Ld.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(tl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Pd.getNormalMatrix(t),s=this.coplanarPoint(tl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Nd=0,Xn=class extends cn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nd++}),this.uuid=Ci(),this.name="",this.type="Material",this.blending=rs,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ml,this.blendDst=yl,this.blendEquation=_i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Lh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vr,this.stencilZFail=Vr,this.stencilZPass=Vr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){zt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){zt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Xt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Xe().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ut().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ut().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Tn=new F,el=new F,Sr=new F,Dr=new F,Xi=class{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Tn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Tn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Tn.copy(this.origin).addScaledVector(this.direction,e),Tn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){el.copy(t).add(e).multiplyScalar(.5),Sr.copy(e).sub(t).normalize(),Dr.copy(this.origin).sub(el);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Sr),o=Dr.dot(this.direction),l=-Dr.dot(Sr),c=Dr.lengthSq(),h=Math.abs(1-a*a),d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let A=1/h;d*=A,u*=A,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(el).addScaledVector(Sr,u),f}intersectSphere(t,e){if(t.radius<0)return null;Tn.subVectors(t.center,this.origin);let n=Tn.dot(this.direction),s=Tn.dot(Tn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Tn)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=t.x-a.x,u=t.y-a.y,f=t.z-a.z,g=e.x-a.x,A=e.y-a.y,m=e.z-a.z,p=n.x-a.x,B=n.y-a.y,v=n.z-a.z,x=Math.abs(l),y=Math.abs(c),M=Math.abs(h),b,E,D,I,R,P,V,w,z,H,U,it;if(x>=y&&x>=M?(D=l,P=d,z=g,it=p,l>=0?(b=c,E=h,I=u,R=f,V=A,w=m,H=B,U=v):(b=h,E=c,I=f,R=u,V=m,w=A,H=v,U=B)):y>=M?(D=c,P=u,z=A,it=B,c>=0?(b=h,E=l,I=f,R=d,V=m,w=g,H=v,U=p):(b=l,E=h,I=d,R=f,V=g,w=m,H=p,U=v)):(D=h,P=f,z=m,it=v,h>=0?(b=l,E=c,I=d,R=u,V=g,w=A,H=p,U=B):(b=c,E=l,I=u,R=d,V=A,w=g,H=B,U=p)),D===0)return null;let X=b/D,j=E/D,nt=1/D,Z=I-X*P,rt=R-j*P,yt=V-X*z,Dt=w-j*z,Kt=H-X*it,J=U-j*it,W=Kt*Dt-J*yt,ot=Z*J-rt*Kt,mt=yt*rt-Dt*Z;if(s){if(W<0||ot<0||mt<0)return null}else if((W<0||ot<0||mt<0)&&(W>0||ot>0||mt>0))return null;let pt=W+ot+mt;if(pt===0)return null;let Ot=nt*(W*P+ot*z+mt*it);return(pt>0?Ot<0:Ot>0)?null:this.at(Ot/pt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ls=class extends Xn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.combine=Sa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Wc=new he,di=new Xi,br=new Wn,Xc=new F,Ir=new F,Tr=new F,Fr=new F,nl=new F,wr=new F,qc=new F,Rr=new F,_e=class extends De{constructor(t=new Oe,e=new Ls){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){wr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(nl.fromBufferAttribute(d,t),a?wr.addScaledVector(nl,h):wr.addScaledVector(nl.sub(e),h))}e.add(wr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),br.copy(n.boundingSphere),br.applyMatrix4(r),di.copy(t.ray).recast(t.near),!(br.containsPoint(di.origin)===!1&&(di.intersectSphere(br,Xc)===null||di.origin.distanceToSquared(Xc)>(t.far-t.near)**2))&&(Wc.copy(r).invert(),di.copy(t.ray).applyMatrix4(Wc),!(n.boundingBox!==null&&di.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,di)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,A=u.length;g<A;g++){let m=u[g],p=a[m.materialIndex],B=Math.max(m.start,f.start),v=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=B,y=v;x<y;x+=3){let M=o.getX(x),b=o.getX(x+1),E=o.getX(x+2);s=Gr(this,p,t,n,c,h,d,M,b,E),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),A=Math.min(o.count,f.start+f.count);for(let m=g,p=A;m<p;m+=3){let B=o.getX(m),v=o.getX(m+1),x=o.getX(m+2);s=Gr(this,a,t,n,c,h,d,B,v,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,A=u.length;g<A;g++){let m=u[g],p=a[m.materialIndex],B=Math.max(m.start,f.start),v=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=B,y=v;x<y;x+=3){let M=x,b=x+1,E=x+2;s=Gr(this,p,t,n,c,h,d,M,b,E),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),A=Math.min(l.count,f.start+f.count);for(let m=g,p=A;m<p;m+=3){let B=m,v=m+1,x=m+2;s=Gr(this,a,t,n,c,h,d,B,v,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Od(i,t,e,n,s,r,a,o){let l;if(t.side===He?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===ni,o),l===null)return null;Rr.copy(o),Rr.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Rr);return c<e.near||c>e.far?null:{distance:c,point:Rr.clone(),object:i}}function Gr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Ir),i.getVertexPosition(l,Tr),i.getVertexPosition(c,Fr);let h=Od(i,t,e,n,Ir,Tr,Fr,qc);if(h){let d=new F;Jn.getBarycoord(qc,Ir,Tr,Fr,d),s&&(h.uv=Jn.getInterpolatedAttribute(s,o,l,c,d,new ut)),r&&(h.uv1=Jn.getInterpolatedAttribute(r,o,l,c,d,new ut)),a&&(h.normal=Jn.getInterpolatedAttribute(a,o,l,c,d,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new F,materialIndex:0};Jn.getNormal(Ir,Tr,Fr,u.normal),h.face=u,h.barycoord=d}return h}var Ps=class extends Ue{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Se,h=Se,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var qi=class extends Ne{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Li=new he,Yc=new he,Lr=[],Qc=new xn,Hd=new he,Cs=new _e,xs=new Wn,Yi=class extends _e{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new qi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Hd)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new xn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Li),Qc.copy(t.boundingBox).applyMatrix4(Li),this.boundingBox.union(Qc)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Wn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Li),xs.copy(t.boundingSphere).applyMatrix4(Li),this.boundingSphere.union(xs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Cs.geometry=this.geometry,Cs.material=this.material,Cs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xs.copy(this.boundingSphere),xs.applyMatrix4(n),t.ray.intersectsSphere(xs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Li),Yc.multiplyMatrices(n,Li),Cs.matrixWorld=Yc,Cs.raycast(t,Lr);for(let a=0,o=Lr.length;a<o;a++){let l=Lr[a];l.instanceId=r,l.object=this,e.push(l)}Lr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new qi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ps(new Float32Array(s*this.count),s,this.count,Ra,en));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},fi=new Wn,Ud=new ut(.5,.5),Pr=new F,Qi=class{constructor(t=new Xe,e=new Xe,n=new Xe,s=new Xe,r=new Xe,a=new Xe){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ln,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],A=r[9],m=r[10],p=r[11],B=r[12],v=r[13],x=r[14],y=r[15];if(s[0].setComponents(c-a,f-h,p-g,y-B).normalize(),s[1].setComponents(c+a,f+h,p+g,y+B).normalize(),s[2].setComponents(c+o,f+d,p+A,y+v).normalize(),s[3].setComponents(c-o,f-d,p-A,y-v).normalize(),n)s[4].setComponents(l,u,m,x).normalize(),s[5].setComponents(c-l,f-u,p-m,y-x).normalize();else if(s[4].setComponents(c-l,f-u,p-m,y-x).normalize(),e===ln)s[5].setComponents(c+l,f+u,p+m,y+x).normalize();else if(e===Vi)s[5].setComponents(l,u,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(fi)}intersectsSprite(t){fi.center.set(0,0,0);let e=Ud.distanceTo(t.center);return fi.radius=.7071067811865476+e,fi.applyMatrix4(t.matrixWorld),this.intersectsSphere(fi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Pr.x=s.normal.x>0?t.max.x:t.min.x,Pr.y=s.normal.y>0?t.max.y:t.min.y,Pr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Pr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ns=class extends Ue{constructor(t=[],e=ii,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var qn=class extends Ue{constructor(t,e,n=un,s,r,a,o=Se,l=Se,c,h=Cn,d=1){if(h!==Cn&&h!==ri)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ji(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},na=class extends qn{constructor(t,e=un,n=ii,s,r,a=Se,o=Se,l,c=Cn){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Os=class extends Ue{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Rn=class i extends Oe{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Ce(c,3)),this.setAttribute("normal",new Ce(h,3)),this.setAttribute("uv",new Ce(d,2));function g(A,m,p,B,v,x,y,M,b,E,D){let I=x/b,R=y/E,P=x/2,V=y/2,w=M/2,z=b+1,H=E+1,U=0,it=0,X=new F;for(let j=0;j<H;j++){let nt=j*R-V;for(let Z=0;Z<z;Z++){let rt=Z*I-P;X[A]=rt*B,X[m]=nt*v,X[p]=w,c.push(X.x,X.y,X.z),X[A]=0,X[m]=0,X[p]=M>0?1:-1,h.push(X.x,X.y,X.z),d.push(Z/b),d.push(1-j/E),U+=1}}for(let j=0;j<E;j++)for(let nt=0;nt<b;nt++){let Z=u+nt+z*j,rt=u+nt+z*(j+1),yt=u+(nt+1)+z*(j+1),Dt=u+(nt+1)+z*j;l.push(Z,rt,Dt),l.push(rt,yt,Dt),it+=6}o.addGroup(f,it,D),f+=it,u+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Yn=class i extends Oe{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,A=[],m=n/2,p=0;B(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Ce(d,3)),this.setAttribute("normal",new Ce(u,3)),this.setAttribute("uv",new Ce(f,2));function B(){let x=new F,y=new F,M=0,b=(e-t)/n;for(let E=0;E<=r;E++){let D=[],I=E/r,R=I*(e-t)+t;for(let P=0;P<=s;P++){let V=P/s,w=V*l+o,z=Math.sin(w),H=Math.cos(w);y.x=R*z,y.y=-I*n+m,y.z=R*H,d.push(y.x,y.y,y.z),x.set(z,b,H).normalize(),u.push(x.x,x.y,x.z),f.push(V,1-I),D.push(g++)}A.push(D)}for(let E=0;E<s;E++)for(let D=0;D<r;D++){let I=A[D][E],R=A[D+1][E],P=A[D+1][E+1],V=A[D][E+1];(t>0||D!==0)&&(h.push(I,R,V),M+=3),(e>0||D!==r-1)&&(h.push(R,P,V),M+=3)}c.addGroup(p,M,0),p+=M}function v(x){let y=g,M=new ut,b=new F,E=0,D=x===!0?t:e,I=x===!0?1:-1;for(let P=1;P<=s;P++)d.push(0,m*I,0),u.push(0,I,0),f.push(.5,.5),g++;let R=g;for(let P=0;P<=s;P++){let w=P/s*l+o,z=Math.cos(w),H=Math.sin(w);b.x=D*H,b.y=m*I,b.z=D*z,d.push(b.x,b.y,b.z),u.push(0,I,0),M.x=z*.5+.5,M.y=H*.5*I+.5,f.push(M.x,M.y),g++}for(let P=0;P<s;P++){let V=y+P,w=R+P;x===!0?h.push(w,w+1,V):h.push(w+1,w,V),E+=3}c.addGroup(p,E,x===!0?1:2),p+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Hs=class i extends Yn{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Ye=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){zt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new ut:new F);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new F,s=[],r=[],a=[],o=new F,l=new he;for(let f=0;f<=t;f++){let g=f/t;s[f]=this.getTangentAt(g,new F)}r[0]=new F,a[0]=new F;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Yt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Yt(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Zi=class extends Ye{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ut){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},ia=class extends Zi{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function kl(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var Zc=new F,jc=new F,il=new kl,sl=new kl,rl=new kl,sa=class extends Ye{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new F){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(jc.subVectors(s[0],s[1]).add(s[0]),c=jc);let d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Zc.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Zc),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),f),A=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);A<1e-4&&(A=1),g<1e-4&&(g=A),m<1e-4&&(m=A),il.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,A,m),sl.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,A,m),rl.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,A,m)}else this.curveType==="catmullrom"&&(il.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),sl.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),rl.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(il.calc(l),sl.calc(l),rl.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new F().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function $c(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function zd(i,t){let e=1-i;return e*e*t}function Vd(i,t){return 2*(1-i)*i*t}function kd(i,t){return i*i*t}function ys(i,t,e,n){return zd(i,t)+Vd(i,e)+kd(i,n)}function Kd(i,t){let e=1-i;return e*e*e*t}function Jd(i,t){let e=1-i;return 3*e*e*i*t}function Wd(i,t){return 3*(1-i)*i*i*t}function Xd(i,t){return i*i*i*t}function vs(i,t,e,n,s){return Kd(i,t)+Jd(i,e)+Wd(i,n)+Xd(i,s)}var Us=class extends Ye{constructor(t=new ut,e=new ut,n=new ut,s=new ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ut){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(vs(t,s.x,r.x,a.x,o.x),vs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ra=class extends Ye{constructor(t=new F,e=new F,n=new F,s=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new F){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(vs(t,s.x,r.x,a.x,o.x),vs(t,s.y,r.y,a.y,o.y),vs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},zs=class extends Ye{constructor(t=new ut,e=new ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ut){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},aa=class extends Ye{constructor(t=new F,e=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new F){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new F){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Vs=class extends Ye{constructor(t=new ut,e=new ut,n=new ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ut){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(ys(t,s.x,r.x,a.x),ys(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},oa=class extends Ye{constructor(t=new F,e=new F,n=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new F){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(ys(t,s.x,r.x,a.x),ys(t,s.y,r.y,a.y),ys(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ks=class extends Ye{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ut){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set($c(o,l.x,c.x,h.x,d.x),$c(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new ut().fromArray(s))}return this}},dl=Object.freeze({__proto__:null,ArcCurve:ia,CatmullRomCurve3:sa,CubicBezierCurve:Us,CubicBezierCurve3:ra,EllipseCurve:Zi,LineCurve:zs,LineCurve3:aa,QuadraticBezierCurve:Vs,QuadraticBezierCurve3:oa,SplineCurve:ks}),la=class extends Ye{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new dl[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new dl[s.type]().fromJSON(s))}return this}},Ks=class extends la{constructor(t){super(),this.type="Path",this.currentPoint=new ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new zs(this.currentPoint.clone(),new ut(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Vs(this.currentPoint.clone(),new ut(t,e),new ut(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new Us(this.currentPoint.clone(),new ut(t,e),new ut(n,s),new ut(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new ks(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){let c=new Zi(t,e,n,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},ji=class extends Ks{constructor(t){super(t),this.uuid=Ci(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Ks().fromJSON(s))}return this}};function qd(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=qh(i,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=$d(i,t,r,e)),i.length>80*e){o=i[0],l=i[1];let h=o,d=l;for(let u=e;u<s;u+=e){let f=i[u],g=i[u+1];f<o&&(o=f),g<l&&(l=g),f>h&&(h=f),g>d&&(d=g)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return Js(r,a,e,o,l,c,0),a}function qh(i,t,e,n,s){let r;if(s===uf(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=th(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=th(a/n|0,i[a],i[a+1],r);return r&&$i(r,r.next)&&(Xs(r),r=r.next),r}function gi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&($i(e,e.next)||ge(e.prev,e,e.next)===0)){if(Xs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Js(i,t,e,n,s,r,a){if(!i)return;!a&&r&&rf(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Qd(i,n,s,r):Yd(i)){t.push(l.i,i.i,c.i),Xs(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Zd(gi(i),t),Js(i,t,e,n,s,r,2)):a===2&&jd(i,t,e,n,s,r):Js(gi(i),t,e,n,s,r,1);break}}}function Yd(i){let t=i.prev,e=i,n=i.next;if(ge(t,e,n)>=0)return!1;let s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(s,r,a),d=Math.min(o,l,c),u=Math.max(s,r,a),f=Math.max(o,l,c),g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&Bs(s,o,r,l,a,c,g.x,g.y)&&ge(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Qd(i,t,e,n){let s=i.prev,r=i,a=i.next;if(ge(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,d=r.y,u=a.y,f=Math.min(o,l,c),g=Math.min(h,d,u),A=Math.max(o,l,c),m=Math.max(h,d,u),p=fl(f,g,t,e,n),B=fl(A,m,t,e,n),v=i.prevZ,x=i.nextZ;for(;v&&v.z>=p&&x&&x.z<=B;){if(v.x>=f&&v.x<=A&&v.y>=g&&v.y<=m&&v!==s&&v!==a&&Bs(o,h,l,d,c,u,v.x,v.y)&&ge(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=f&&x.x<=A&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&Bs(o,h,l,d,c,u,x.x,x.y)&&ge(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=A&&v.y>=g&&v.y<=m&&v!==s&&v!==a&&Bs(o,h,l,d,c,u,v.x,v.y)&&ge(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=B;){if(x.x>=f&&x.x<=A&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&Bs(o,h,l,d,c,u,x.x,x.y)&&ge(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Zd(i,t){let e=i;do{let n=e.prev,s=e.next.next;!$i(n,s)&&Qh(n,e,e.next,s)&&Ws(n,s)&&Ws(s,n)&&(t.push(n.i,e.i,s.i),Xs(e),Xs(e.next),e=i=s),e=e.next}while(e!==i);return gi(e)}function jd(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&lf(a,o)){let l=Zh(a,o);a=gi(a,a.next),l=gi(l,l.next),Js(a,t,e,n,s,r,0),Js(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function $d(i,t,e,n){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=qh(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(of(c))}s.sort(tf);for(let r=0;r<s.length;r++)e=ef(s[r],e);return e}function tf(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function ef(i,t){let e=nf(i,t);if(!e)return t;let n=Zh(e,i);return gi(n,n.next),gi(e,e.next)}function nf(i,t){let e=t,n=i.x,s=i.y,r=-1/0,a;if($i(i,e))return e;do{if($i(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let d=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>r&&(r=d,a=e.x<e.next.x?e:e.next,d===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Yh(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){let d=Math.abs(s-e.y)/(n-e.x);Ws(e,i)&&(d<h||d===h&&(e.x>a.x||e.x===a.x&&sf(a,e)))&&(a=e,h=d)}e=e.next}while(e!==o);return a}function sf(i,t){return ge(i.prev,i,t.prev)<0&&ge(t.next,i,i.next)<0}function rf(i,t,e,n){let s=i;do s.z===0&&(s.z=fl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,af(s)}function af(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function fl(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function of(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Yh(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function Bs(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&Yh(i,t,e,n,s,r,a,o)}function lf(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!cf(i,t)&&(Ws(i,t)&&Ws(t,i)&&hf(i,t)&&(ge(i.prev,i,t.prev)||ge(i,t.prev,t))||$i(i,t)&&ge(i.prev,i,i.next)>0&&ge(t.prev,t,t.next)>0)}function ge(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function $i(i,t){return i.x===t.x&&i.y===t.y}function Qh(i,t,e,n){let s=Or(ge(i,t,e)),r=Or(ge(i,t,n)),a=Or(ge(e,n,i)),o=Or(ge(e,n,t));return!!(s!==r&&a!==o||s===0&&Nr(i,e,t)||r===0&&Nr(i,n,t)||a===0&&Nr(e,i,n)||o===0&&Nr(e,t,n))}function Nr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Or(i){return i>0?1:i<0?-1:0}function cf(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Qh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Ws(i,t){return ge(i.prev,i,i.next)<0?ge(i,t,i.next)>=0&&ge(i,i.prev,t)>=0:ge(i,t,i.prev)<0||ge(i,i.next,t)<0}function hf(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Zh(i,t){let e=pl(i.i,i.x,i.y),n=pl(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function th(i,t,e,n){let s=pl(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Xs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function pl(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function uf(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var ml=class{static triangulate(t,e,n=2){return qd(t,e,n)}},pi=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];eh(t),nh(n,t);let a=t.length;e.forEach(eh);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,nh(n,e[l]);let o=ml.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function eh(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function nh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var qs=class i extends Oe{constructor(t=new ji([new ut(.5,.5),new ut(-.5,.5),new ut(-.5,-.5),new ut(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new Ce(s,3)),this.setAttribute("uv",new Ce(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,A=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,B=e.UVGenerator!==void 0?e.UVGenerator:df,v,x=!1,y,M,b,E;if(p){v=p.getSpacedPoints(h),x=!0,u=!1;let $=p.isCatmullRomCurve3?p.closed:!1;y=p.computeFrenetFrames(h,$),M=new F,b=new F,E=new F}u||(m=0,f=0,g=0,A=0);let D=o.extractPoints(c),I=D.shape,R=D.holes;if(!pi.isClockWise(I)){I=I.reverse();for(let $=0,at=R.length;$<at;$++){let ct=R[$];pi.isClockWise(ct)&&(R[$]=ct.reverse())}}function V($){let ct=10000000000000001e-36,lt=$[0];for(let ft=1;ft<=$.length;ft++){let Nt=ft%$.length,Lt=$[Nt],Ht=Lt.x-lt.x,kt=Lt.y-lt.y,T=Ht*Ht+kt*kt,ee=Math.max(Math.abs(Lt.x),Math.abs(Lt.y),Math.abs(lt.x),Math.abs(lt.y)),Zt=ct*ee*ee;if(T<=Zt){$.splice(Nt,1),ft--;continue}lt=Lt}}V(I),R.forEach(V);let w=R.length,z=I;for(let $=0;$<w;$++){let at=R[$];I=I.concat(at)}function H($,at,ct){return at||Vt("ExtrudeGeometry: vec does not exist"),$.clone().addScaledVector(at,ct)}let U=I.length;function it($,at,ct){let lt,ft,Nt,Lt=$.x-at.x,Ht=$.y-at.y,kt=ct.x-$.x,T=ct.y-$.y,ee=Lt*Lt+Ht*Ht,Zt=Lt*T-Ht*kt;if(Math.abs(Zt)>Number.EPSILON){let S=Math.sqrt(ee),_=Math.sqrt(kt*kt+T*T),N=at.x-Ht/S,O=at.y+Lt/S,Y=ct.x-T/_,ht=ct.y+kt/_,dt=((Y-N)*T-(ht-O)*kt)/(Lt*T-Ht*kt);lt=N+Lt*dt-$.x,ft=O+Ht*dt-$.y;let Q=lt*lt+ft*ft;if(Q<=2)return new ut(lt,ft);Nt=Math.sqrt(Q/2)}else{let S=!1;Lt>Number.EPSILON?kt>Number.EPSILON&&(S=!0):Lt<-Number.EPSILON?kt<-Number.EPSILON&&(S=!0):Math.sign(Ht)===Math.sign(T)&&(S=!0),S?(lt=-Ht,ft=Lt,Nt=Math.sqrt(ee)):(lt=Lt,ft=Ht,Nt=Math.sqrt(ee/2))}return new ut(lt/Nt,ft/Nt)}let X=[];for(let $=0,at=z.length,ct=at-1,lt=$+1;$<at;$++,ct++,lt++)ct===at&&(ct=0),lt===at&&(lt=0),X[$]=it(z[$],z[ct],z[lt]);let j=[],nt,Z=X.concat();for(let $=0,at=w;$<at;$++){let ct=R[$];nt=[];for(let lt=0,ft=ct.length,Nt=ft-1,Lt=lt+1;lt<ft;lt++,Nt++,Lt++)Nt===ft&&(Nt=0),Lt===ft&&(Lt=0),nt[lt]=it(ct[lt],ct[Nt],ct[Lt]);j.push(nt),Z=Z.concat(nt)}let rt;if(m===0)rt=pi.triangulateShape(z,R);else{let $=[],at=[];for(let ct=0;ct<m;ct++){let lt=ct/m,ft=f*Math.cos(lt*Math.PI/2),Nt=g*Math.sin(lt*Math.PI/2)+A;for(let Lt=0,Ht=z.length;Lt<Ht;Lt++){let kt=H(z[Lt],X[Lt],Nt);ot(kt.x,kt.y,-ft),lt===0&&$.push(kt)}for(let Lt=0,Ht=w;Lt<Ht;Lt++){let kt=R[Lt];nt=j[Lt];let T=[];for(let ee=0,Zt=kt.length;ee<Zt;ee++){let S=H(kt[ee],nt[ee],Nt);ot(S.x,S.y,-ft),lt===0&&T.push(S)}lt===0&&at.push(T)}}rt=pi.triangulateShape($,at)}let yt=rt.length,Dt=g+A;for(let $=0;$<U;$++){let at=u?H(I[$],Z[$],Dt):I[$];x?(b.copy(y.normals[0]).multiplyScalar(at.x),M.copy(y.binormals[0]).multiplyScalar(at.y),E.copy(v[0]).add(b).add(M),ot(E.x,E.y,E.z)):ot(at.x,at.y,0)}for(let $=1;$<=h;$++)for(let at=0;at<U;at++){let ct=u?H(I[at],Z[at],Dt):I[at];x?(b.copy(y.normals[$]).multiplyScalar(ct.x),M.copy(y.binormals[$]).multiplyScalar(ct.y),E.copy(v[$]).add(b).add(M),ot(E.x,E.y,E.z)):ot(ct.x,ct.y,d/h*$)}for(let $=m-1;$>=0;$--){let at=$/m,ct=f*Math.cos(at*Math.PI/2),lt=g*Math.sin(at*Math.PI/2)+A;for(let ft=0,Nt=z.length;ft<Nt;ft++){let Lt=H(z[ft],X[ft],lt);ot(Lt.x,Lt.y,d+ct)}for(let ft=0,Nt=R.length;ft<Nt;ft++){let Lt=R[ft];nt=j[ft];for(let Ht=0,kt=Lt.length;Ht<kt;Ht++){let T=H(Lt[Ht],nt[Ht],lt);x?ot(T.x,T.y+v[h-1].y,v[h-1].x+ct):ot(T.x,T.y,d+ct)}}}Kt(),J();function Kt(){let $=s.length/3;if(u){let at=0,ct=U*at;for(let lt=0;lt<yt;lt++){let ft=rt[lt];mt(ft[2]+ct,ft[1]+ct,ft[0]+ct)}at=h+m*2,ct=U*at;for(let lt=0;lt<yt;lt++){let ft=rt[lt];mt(ft[0]+ct,ft[1]+ct,ft[2]+ct)}}else{for(let at=0;at<yt;at++){let ct=rt[at];mt(ct[2],ct[1],ct[0])}for(let at=0;at<yt;at++){let ct=rt[at];mt(ct[0]+U*h,ct[1]+U*h,ct[2]+U*h)}}n.addGroup($,s.length/3-$,0)}function J(){let $=s.length/3,at=0;W(z,at),at+=z.length;for(let ct=0,lt=R.length;ct<lt;ct++){let ft=R[ct];W(ft,at),at+=ft.length}n.addGroup($,s.length/3-$,1)}function W($,at){let ct=$.length;for(;--ct>=0;){let lt=ct,ft=ct-1;ft<0&&(ft=$.length-1);for(let Nt=0,Lt=h+m*2;Nt<Lt;Nt++){let Ht=U*Nt,kt=U*(Nt+1),T=at+lt+Ht,ee=at+ft+Ht,Zt=at+ft+kt,S=at+lt+kt;pt(T,ee,Zt,S)}}}function ot($,at,ct){l.push($),l.push(at),l.push(ct)}function mt($,at,ct){Ot($),Ot(at),Ot(ct);let lt=s.length/3,ft=B.generateTopUV(n,s,lt-3,lt-2,lt-1);$t(ft[0]),$t(ft[1]),$t(ft[2])}function pt($,at,ct,lt){Ot($),Ot(at),Ot(lt),Ot(at),Ot(ct),Ot(lt);let ft=s.length/3,Nt=B.generateSideWallUV(n,s,ft-6,ft-3,ft-2,ft-1);$t(Nt[0]),$t(Nt[1]),$t(Nt[3]),$t(Nt[1]),$t(Nt[2]),$t(Nt[3])}function Ot($){s.push(l[$*3+0]),s.push(l[$*3+1]),s.push(l[$*3+2])}function $t($){r.push($.x),r.push($.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return ff(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new dl[s.type]().fromJSON(s)),new i(n,t.options)}},df={generateTopUV:function(i,t,e,n,s){let r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new ut(r,a),new ut(o,l),new ut(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[s*3],f=t[s*3+1],g=t[s*3+2],A=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ut(a,1-l),new ut(c,1-d),new ut(u,1-g),new ut(A,1-p)]:[new ut(o,1-l),new ut(h,1-d),new ut(f,1-g),new ut(m,1-p)]}};function ff(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Qn=class i extends Oe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,u=e/l,f=[],g=[],A=[],m=[];for(let p=0;p<h;p++){let B=p*u-a;for(let v=0;v<c;v++){let x=v*d-r;g.push(x,-B,0),A.push(0,0,1),m.push(v/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let B=0;B<o;B++){let v=B+c*p,x=B+c*(p+1),y=B+1+c*(p+1),M=B+1+c*p;f.push(v,x,M),f.push(x,y,M)}this.setIndex(f),this.setAttribute("position",new Ce(g,3)),this.setAttribute("normal",new Ce(A,3)),this.setAttribute("uv",new Ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var ts=class i extends Oe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new F,u=new F,f=[],g=[],A=[],m=[];for(let p=0;p<=n;p++){let B=[],v=p/n,x=a+v*o,y=t*Math.cos(x),M=Math.sqrt(t*t-y*y),b=0;p===0&&a===0?b=.5/e:p===n&&l===Math.PI&&(b=-.5/e);for(let E=0;E<=e;E++){let D=E/e,I=s+D*r;d.x=-M*Math.cos(I),d.y=y,d.z=M*Math.sin(I),g.push(d.x,d.y,d.z),u.copy(d).normalize(),A.push(u.x,u.y,u.z),m.push(D+b,1-v),B.push(c++)}h.push(B)}for(let p=0;p<n;p++)for(let B=0;B<e;B++){let v=h[p][B+1],x=h[p][B],y=h[p+1][B],M=h[p+1][B+1];(p!==0||a>0)&&f.push(v,x,M),(p!==n-1||l<Math.PI)&&f.push(x,y,M)}this.setIndex(f),this.setAttribute("position",new Ce(g,3)),this.setAttribute("normal",new Ce(A,3)),this.setAttribute("uv",new Ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function xi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(ih(s))s.isRenderTargetTexture?(zt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(ih(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Ge(i){let t={};for(let e=0;e<i.length;e++){let n=xi(i[e]);for(let s in n)t[s]=n[s]}return t}function ih(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function pf(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Kl(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}var jh={clone:xi,merge:Ge},mf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Qe=class extends Xn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mf,this.fragmentShader=gf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=xi(t.uniforms),this.uniformsGroups=pf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Xt().setHex(s.value);break;case"v2":this.uniforms[n].value=new ut().fromArray(s.value);break;case"v3":this.uniforms[n].value=new F().fromArray(s.value);break;case"v4":this.uniforms[n].value=new me().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Jt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new he().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},ca=class extends Qe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Ze=class extends Xn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=po,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.combine=Sa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},ha=class extends Xn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Rh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ua=class extends Xn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Pi(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function al(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Zn=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},da=class extends Zn{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:cl,endingEnd:cl}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case hl:r=t,o=2*e-n;break;case ul:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case hl:a=t,l=2*n-e;break;case ul:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),A=g*g,m=A*g,p=-u*m+2*u*A-u*g,B=(1+u)*m+(-1.5-2*u)*A+(-.5+u)*g+1,v=(-1-f)*m+(1.5+f)*A+.5*g,x=f*m-f*A;for(let y=0;y!==o;++y)r[y]=p*a[h+y]+B*a[c+y]+v*a[l+y]+x*a[d+y];return r}},fa=class extends Zn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},pa=class extends Zn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},ma=class extends Zn{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(n-e)/(s-e),A=1-g;for(let m=0;m!==o;++m)r[m]=a[c+m]*A+a[l+m]*g;return r}let u=o*2,f=t-1;for(let g=0;g!==o;++g){let A=a[c+g],m=a[l+g],p=f*u+g*2,B=d[p],v=d[p+1],x=t*u+g*2,y=h[x],M=h[x+1],b=Ef(n,e,B,y,s);r[g]=$h(b,A,v,M,m)}return r}};function $h(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function _f(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Ef(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=$h(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let l=_f(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var je=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Pi(e,this.TimeBufferType),this.values=Pi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Pi(t.times,Array),values:Pi(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),al(t.settings)&&(n.settings={inTangents:Pi(t.settings.inTangents,Array),outTangents:Pi(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new pa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new fa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new da(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new ma(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Ss:e=this.InterpolantFactoryMethodDiscrete;break;case jr:e=this.InterpolantFactoryMethodLinear;break;case zr:e=this.InterpolantFactoryMethodSmooth;break;case ll:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return zt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ss;case this.InterpolantFactoryMethodLinear:return jr;case this.InterpolantFactoryMethodSmooth:return zr;case this.InterpolantFactoryMethodBezier:return ll}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;al(this.settings)&&(sh(this.settings.inTangents,t),sh(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Vt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Vt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Vt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Vt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&rd(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Vt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===zr,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){let A=e[d+g];if(A!==e[u+g]||A!==e[f+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*n,u=a*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,al(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function sh(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}je.prototype.ValueTypeName="";je.prototype.TimeBufferType=Float32Array;je.prototype.ValueBufferType=Float32Array;je.prototype.DefaultInterpolation=jr;var jn=class extends je{constructor(t,e,n){super(t,e,n)}};jn.prototype.ValueTypeName="bool";jn.prototype.ValueBufferType=Array;jn.prototype.DefaultInterpolation=Ss;jn.prototype.InterpolantFactoryMethodLinear=void 0;jn.prototype.InterpolantFactoryMethodSmooth=void 0;var ga=class extends je{constructor(t,e,n,s){super(t,e,n,s)}};ga.prototype.ValueTypeName="color";var _a=class extends je{constructor(t,e,n,s){super(t,e,n,s)}};_a.prototype.ValueTypeName="number";var Ea=class extends Zn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)qe.slerpFlat(r,0,a,c-o,a,c,l);return r}},Ys=class extends je{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Ea(this.times,this.values,this.getValueSize(),t)}};Ys.prototype.ValueTypeName="quaternion";Ys.prototype.InterpolantFactoryMethodSmooth=void 0;var $n=class extends je{constructor(t,e,n){super(t,e,n)}};$n.prototype.ValueTypeName="string";$n.prototype.ValueBufferType=Array;$n.prototype.DefaultInterpolation=Ss;$n.prototype.InterpolantFactoryMethodLinear=void 0;$n.prototype.InterpolantFactoryMethodSmooth=void 0;var Ca=class extends je{constructor(t,e,n,s){super(t,e,n,s)}};Ca.prototype.ValueTypeName="vector";var xa=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},tu=new xa,Ba=class{constructor(t){this.manager=t!==void 0?t:tu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ba.DEFAULT_MATERIAL_NAME="__DEFAULT";var es=class extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Xt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Qs=class extends es{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},ol=new he,rh=new F,ah=new F,Aa=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.mapType=Ve,this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qi,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;rh.setFromMatrixPosition(t.matrixWorld),e.position.copy(rh),ah.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ah),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){ol.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(ol,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===Vi||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(ol)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Hr=new F,Ur=new qe,gn=new F,Zs=class extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Hr,Ur,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hr,Ur,gn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Hr,Ur,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hr,Ur,gn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Kn=new F,oh=new ut,lh=new ut,Re=class extends Zs{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ki*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(As*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ki*2*Math.atan(Math.tan(As*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Kn.x,Kn.y).multiplyScalar(-t/Kn.z),Kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Kn.x,Kn.y).multiplyScalar(-t/Kn.z)}getViewSize(t,e){return this.getViewBounds(t,oh,lh),e.subVectors(lh,oh)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(As*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var ns=class extends Zs{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},gl=class extends Aa{constructor(){super(new ns(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},js=class extends es{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new gl}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},$s=class extends es{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ni=-90,Oi=1,Ma=class extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Re(Ni,Oi,t,e);s.layers=this.layers,this.add(s);let r=new Re(Ni,Oi,t,e);r.layers=this.layers,this.add(r);let a=new Re(Ni,Oi,t,e);a.layers=this.layers,this.add(a);let o=new Re(Ni,Oi,t,e);o.layers=this.layers,this.add(o);let l=new Re(Ni,Oi,t,e);l.layers=this.layers,this.add(l);let c=new Re(Ni,Oi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Vi)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let A=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=A,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},ya=class extends Re{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Jl="\\[\\]\\.:\\/",Cf=new RegExp("["+Jl+"]","g"),Wl="[^"+Jl+"]",xf="[^"+Jl.replace("\\.","")+"]",Bf=/((?:WC+[\/:])*)/.source.replace("WC",Wl),Af=/(WCOD+)?/.source.replace("WCOD",xf),Mf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Wl),yf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Wl),vf=new RegExp("^"+Bf+Af+Mf+yf+"$"),Sf=["material","materials","bones","map"],_l=class{constructor(t,e,n){let s=n||pe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},pe=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Cf,"")}static parseTrackName(t){let e=vf.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Sf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){zt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Vt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Vt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Vt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Vt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Vt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Vt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};pe.Composite=_l;pe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pe.prototype.GetterByBindingType=[pe.prototype._getValue_direct,pe.prototype._getValue_array,pe.prototype._getValue_arrayElement,pe.prototype._getValue_toArray];pe.prototype.SetterByBindingTypeAndVersioning=[[pe.prototype._setValue_direct,pe.prototype._setValue_direct_setNeedsUpdate,pe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_array,pe.prototype._setValue_array_setNeedsUpdate,pe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_arrayElement,pe.prototype._setValue_arrayElement_setNeedsUpdate,pe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_fromArray,pe.prototype._setValue_fromArray_setNeedsUpdate,pe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Y_=new Float32Array(1);var is=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Yt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Yt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var jl=class jl{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};jl.prototype.isMatrix2=!0;var El=jl;var tr=class extends cn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Xl(i,t,e,n){let s=Df(n);switch(e){case Nl:return i*t;case Ra:return i*t/s.components*s.byteLength;case Ga:return i*t/s.components*s.byteLength;case ai:return i*t*2/s.components*s.byteLength;case La:return i*t*2/s.components*s.byteLength;case Ol:return i*t*3/s.components*s.byteLength;case nn:return i*t*4/s.components*s.byteLength;case Pa:return i*t*4/s.components*s.byteLength;case sr:case rr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ar:case or:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Oa:case Ua:return Math.max(i,16)*Math.max(t,8)/4;case Na:case Ha:return Math.max(i,8)*Math.max(t,8)/2;case za:case Va:case Ka:case Ja:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ka:case lr:case Wa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Xa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case qa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ya:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Qa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Za:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ja:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case $a:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case to:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case eo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case no:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case io:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case so:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ro:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ao:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case oo:case lo:case co:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ho:case uo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case cr:case fo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Df(i){switch(i){case Ve:case Rl:return{byteLength:1,components:1};case as:case Gl:case dn:return{byteLength:2,components:1};case Fa:case wa:return{byteLength:2,components:4};case un:case Ta:case en:return{byteLength:4,components:1};case Ll:case Pl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window!="undefined"&&(window.__THREE__?zt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Au(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Gf(i){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array!="undefined"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],A=d[f];A.start<=g.start+g.count+1?g.count=Math.max(g.count,A.start+A.count-g.start):(++u,d[u]=A)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let A=d[f];i.bufferSubData(c,A.start*h.BYTES_PER_ELEMENT,h,A.start,A.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Lf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pf=`#ifdef USE_ALPHAHASH
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
#endif`,Nf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Of=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Uf=`#ifdef USE_ALPHATEST
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
#endif`,Vf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kf=`#ifdef USE_BATCHING
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
#endif`,Kf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Jf=`vec3 transformed = vec3( position );
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
#endif`,Qf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Zf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,jf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$f=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,tp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ep=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,np=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ip=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,sp=`#define PI 3.141592653589793
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
} // validated`,rp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ap=`vec3 transformedNormal = objectNormal;
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
#endif`,op=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,up="gl_FragColor = linearToOutputTexel( gl_FragColor );",dp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fp=`#ifdef USE_ENVMAP
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
#endif`,pp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,mp=`#ifdef USE_ENVMAP
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
#endif`,gp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_p=`#ifdef USE_ENVMAP
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
#endif`,Ep=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ap=`#ifdef USE_GRADIENTMAP
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
#endif`,yp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Dp=`#ifdef USE_ENVMAP
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
#endif`,bp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ip=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Tp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wp=`PhysicalMaterial material;
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
#endif`,Rp=`uniform sampler2D dfgLUT;
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
}`,Gp=`
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
#endif`,Lp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Pp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Np=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Op=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Hp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Up=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Kp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Jp=`#if defined( USE_POINTS_UV )
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
#endif`,Qp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zp=`#ifdef USE_MORPHTARGETS
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
#endif`,jp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$p=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,tm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,em=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,im=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,sm=`#ifdef USE_NORMALMAP
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
#endif`,rm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,am=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,om=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,um=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_m=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Em=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Cm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
}`,Bm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Am=`#ifdef USE_SKINNING
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
#endif`,ym=`#ifdef USE_SKINNING
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
#endif`,vm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Sm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Im=`#ifdef USE_TRANSMISSION
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
#endif`,Tm=`#ifdef USE_TRANSMISSION
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
#endif`,Fm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Lm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pm=`uniform sampler2D t2D;
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
}`,Nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Om=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Um=`uniform samplerCube tCube;
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
}`,Vm=`#if DEPTH_PACKING == 3200
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
}`,km=`#define DISTANCE
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
}`,Km=`#define DISTANCE
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
}`,Jm=`varying vec3 vWorldDirection;
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
}`,Qm=`uniform vec3 diffuse;
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
}`,Zm=`#define LAMBERT
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
}`,jm=`#define LAMBERT
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
}`,$m=`#define MATCAP
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
}`,tg=`#define MATCAP
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
}`,eg=`#define NORMAL
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
}`,ng=`#define NORMAL
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
}`,ig=`#define PHONG
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
}`,sg=`#define PHONG
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
}`,rg=`#define STANDARD
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
}`,ag=`#define STANDARD
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
}`,og=`#define TOON
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
}`,lg=`#define TOON
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
}`,cg=`uniform float size;
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
}`,hg=`uniform vec3 diffuse;
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
}`,ug=`#include <common>
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
}`,dg=`uniform vec3 color;
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
}`,fg=`uniform float rotation;
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
}`,pg=`uniform vec3 diffuse;
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
}`,Qt={alphahash_fragment:Lf,alphahash_pars_fragment:Pf,alphamap_fragment:Nf,alphamap_pars_fragment:Of,alphatest_fragment:Hf,alphatest_pars_fragment:Uf,aomap_fragment:zf,aomap_pars_fragment:Vf,batching_pars_vertex:kf,batching_vertex:Kf,begin_vertex:Jf,beginnormal_vertex:Wf,bsdfs:Xf,iridescence_fragment:qf,bumpmap_pars_fragment:Yf,clipping_planes_fragment:Qf,clipping_planes_pars_fragment:Zf,clipping_planes_pars_vertex:jf,clipping_planes_vertex:$f,color_fragment:tp,color_pars_fragment:ep,color_pars_vertex:np,color_vertex:ip,common:sp,cube_uv_reflection_fragment:rp,defaultnormal_vertex:ap,displacementmap_pars_vertex:op,displacementmap_vertex:lp,emissivemap_fragment:cp,emissivemap_pars_fragment:hp,colorspace_fragment:up,colorspace_pars_fragment:dp,envmap_fragment:fp,envmap_common_pars_fragment:pp,envmap_pars_fragment:mp,envmap_pars_vertex:gp,envmap_physical_pars_fragment:Dp,envmap_vertex:_p,fog_vertex:Ep,fog_pars_vertex:Cp,fog_fragment:xp,fog_pars_fragment:Bp,gradientmap_pars_fragment:Ap,lightmap_pars_fragment:Mp,lights_lambert_fragment:yp,lights_lambert_pars_fragment:vp,lights_pars_begin:Sp,lights_toon_fragment:bp,lights_toon_pars_fragment:Ip,lights_phong_fragment:Tp,lights_phong_pars_fragment:Fp,lights_physical_fragment:wp,lights_physical_pars_fragment:Rp,lights_fragment_begin:Gp,lights_fragment_maps:Lp,lights_fragment_end:Pp,lightprobes_pars_fragment:Np,logdepthbuf_fragment:Op,logdepthbuf_pars_fragment:Hp,logdepthbuf_pars_vertex:Up,logdepthbuf_vertex:zp,map_fragment:Vp,map_pars_fragment:kp,map_particle_fragment:Kp,map_particle_pars_fragment:Jp,metalnessmap_fragment:Wp,metalnessmap_pars_fragment:Xp,morphinstance_vertex:qp,morphcolor_vertex:Yp,morphnormal_vertex:Qp,morphtarget_pars_vertex:Zp,morphtarget_vertex:jp,normal_fragment_begin:$p,normal_fragment_maps:tm,normal_pars_fragment:em,normal_pars_vertex:nm,normal_vertex:im,normalmap_pars_fragment:sm,clearcoat_normal_fragment_begin:rm,clearcoat_normal_fragment_maps:am,clearcoat_pars_fragment:om,iridescence_pars_fragment:lm,opaque_fragment:cm,packing:hm,premultiplied_alpha_fragment:um,project_vertex:dm,dithering_fragment:fm,dithering_pars_fragment:pm,roughnessmap_fragment:mm,roughnessmap_pars_fragment:gm,shadowmap_pars_fragment:_m,shadowmap_pars_vertex:Em,shadowmap_vertex:Cm,shadowmask_pars_fragment:xm,skinbase_vertex:Bm,skinning_pars_vertex:Am,skinning_vertex:Mm,skinnormal_vertex:ym,specularmap_fragment:vm,specularmap_pars_fragment:Sm,tonemapping_fragment:Dm,tonemapping_pars_fragment:bm,transmission_fragment:Im,transmission_pars_fragment:Tm,uv_pars_fragment:Fm,uv_pars_vertex:wm,uv_vertex:Rm,worldpos_vertex:Gm,background_vert:Lm,background_frag:Pm,backgroundCube_vert:Nm,backgroundCube_frag:Om,cube_vert:Hm,cube_frag:Um,depth_vert:zm,depth_frag:Vm,distance_vert:km,distance_frag:Km,equirect_vert:Jm,equirect_frag:Wm,linedashed_vert:Xm,linedashed_frag:qm,meshbasic_vert:Ym,meshbasic_frag:Qm,meshlambert_vert:Zm,meshlambert_frag:jm,meshmatcap_vert:$m,meshmatcap_frag:tg,meshnormal_vert:eg,meshnormal_frag:ng,meshphong_vert:ig,meshphong_frag:sg,meshphysical_vert:rg,meshphysical_frag:ag,meshtoon_vert:og,meshtoon_frag:lg,points_vert:cg,points_frag:hg,shadow_vert:ug,shadow_frag:dg,sprite_vert:fg,sprite_frag:pg},Bt={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},yn={basic:{uniforms:Ge([Bt.common,Bt.specularmap,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.fog]),vertexShader:Qt.meshbasic_vert,fragmentShader:Qt.meshbasic_frag},lambert:{uniforms:Ge([Bt.common,Bt.specularmap,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.fog,Bt.lights,{emissive:{value:new Xt(0)},envMapIntensity:{value:1}}]),vertexShader:Qt.meshlambert_vert,fragmentShader:Qt.meshlambert_frag},phong:{uniforms:Ge([Bt.common,Bt.specularmap,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.fog,Bt.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphong_vert,fragmentShader:Qt.meshphong_frag},standard:{uniforms:Ge([Bt.common,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.roughnessmap,Bt.metalnessmap,Bt.fog,Bt.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag},toon:{uniforms:Ge([Bt.common,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.gradientmap,Bt.fog,Bt.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Qt.meshtoon_vert,fragmentShader:Qt.meshtoon_frag},matcap:{uniforms:Ge([Bt.common,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.fog,{matcap:{value:null}}]),vertexShader:Qt.meshmatcap_vert,fragmentShader:Qt.meshmatcap_frag},points:{uniforms:Ge([Bt.points,Bt.fog]),vertexShader:Qt.points_vert,fragmentShader:Qt.points_frag},dashed:{uniforms:Ge([Bt.common,Bt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qt.linedashed_vert,fragmentShader:Qt.linedashed_frag},depth:{uniforms:Ge([Bt.common,Bt.displacementmap]),vertexShader:Qt.depth_vert,fragmentShader:Qt.depth_frag},normal:{uniforms:Ge([Bt.common,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,{opacity:{value:1}}]),vertexShader:Qt.meshnormal_vert,fragmentShader:Qt.meshnormal_frag},sprite:{uniforms:Ge([Bt.sprite,Bt.fog]),vertexShader:Qt.sprite_vert,fragmentShader:Qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qt.background_vert,fragmentShader:Qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:Qt.backgroundCube_vert,fragmentShader:Qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qt.cube_vert,fragmentShader:Qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qt.equirect_vert,fragmentShader:Qt.equirect_frag},distance:{uniforms:Ge([Bt.common,Bt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qt.distance_vert,fragmentShader:Qt.distance_frag},shadow:{uniforms:Ge([Bt.lights,Bt.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:Qt.shadow_vert,fragmentShader:Qt.shadow_frag}};yn.physical={uniforms:Ge([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag};var _o={r:0,b:0,g:0},mg=new he,Mu=new Jt;Mu.set(-1,0,0,0,1,0,0,0,1);function gg(i,t,e,n,s,r){let a=new Xt(0),o=s===!0?0:1,l,c,h=null,d=0,u=null;function f(B){let v=B.isScene===!0?B.background:null;if(v&&v.isTexture){let x=B.backgroundBlurriness>0;v=t.get(v,x)}return v}function g(B){let v=!1,x=f(B);x===null?m(a,o):x&&x.isColor&&(m(x,1),v=!0);let y=i.xr.getEnvironmentBlendMode();y==="additive"?e.buffers.color.setClear(0,0,0,1,r):y==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||v)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function A(B,v){let x=f(v);x&&(x.isCubeTexture||x.mapping===nr)?(c===void 0&&(c=new _e(new Rn(1,1,1),new Qe({name:"BackgroundCubeMaterial",uniforms:xi(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:He,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,M,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(mg.makeRotationFromEuler(v.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Mu),c.material.toneMapped=te.getTransfer(x.colorSpace)!==ae,(h!==x||d!==x.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=x,d=x.version,u=i.toneMapping),c.layers.enableAll(),B.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new _e(new Qn(2,2),new Qe({name:"BackgroundMaterial",uniforms:xi(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=te.getTransfer(x.colorSpace)!==ae,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||d!==x.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=x,d=x.version,u=i.toneMapping),l.layers.enableAll(),B.unshift(l,l.geometry,l.material,0,0,null))}function m(B,v){B.getRGB(_o,Kl(i)),e.buffers.color.setClear(_o.r,_o.g,_o.b,v,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(B,v=1){a.set(B),o=v,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(B){o=B,m(a,o)},render:g,addToRenderList:A,dispose:p}}function _g(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(R,P,V,w,z){let H=!1,U=d(R,w,V,P);r!==U&&(r=U,c(r.object)),H=f(R,w,V,z),H&&g(R,w,V,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,x(R,P,V,w),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return i.createVertexArray()}function c(R){return i.bindVertexArray(R)}function h(R){return i.deleteVertexArray(R)}function d(R,P,V,w){let z=w.wireframe===!0,H=n[P.id];H===void 0&&(H={},n[P.id]=H);let U=R.isInstancedMesh===!0?R.id:0,it=H[U];it===void 0&&(it={},H[U]=it);let X=it[V.id];X===void 0&&(X={},it[V.id]=X);let j=X[z];return j===void 0&&(j=u(l()),X[z]=j),j}function u(R){let P=[],V=[],w=[];for(let z=0;z<e;z++)P[z]=0,V[z]=0,w[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:V,attributeDivisors:w,object:R,attributes:{},index:null}}function f(R,P,V,w){let z=r.attributes,H=P.attributes,U=0,it=V.getAttributes();for(let X in it)if(it[X].location>=0){let nt=z[X],Z=H[X];if(Z===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(Z=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(Z=R.instanceColor)),nt===void 0||nt.attribute!==Z||Z&&nt.data!==Z.data)return!0;U++}return r.attributesNum!==U||r.index!==w}function g(R,P,V,w){let z={},H=P.attributes,U=0,it=V.getAttributes();for(let X in it)if(it[X].location>=0){let nt=H[X];nt===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(nt=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(nt=R.instanceColor));let Z={};Z.attribute=nt,nt&&nt.data&&(Z.data=nt.data),z[X]=Z,U++}r.attributes=z,r.attributesNum=U,r.index=w}function A(){let R=r.newAttributes;for(let P=0,V=R.length;P<V;P++)R[P]=0}function m(R){p(R,0)}function p(R,P){let V=r.newAttributes,w=r.enabledAttributes,z=r.attributeDivisors;V[R]=1,w[R]===0&&(i.enableVertexAttribArray(R),w[R]=1),z[R]!==P&&(i.vertexAttribDivisor(R,P),z[R]=P)}function B(){let R=r.newAttributes,P=r.enabledAttributes;for(let V=0,w=P.length;V<w;V++)P[V]!==R[V]&&(i.disableVertexAttribArray(V),P[V]=0)}function v(R,P,V,w,z,H,U){U===!0?i.vertexAttribIPointer(R,P,V,z,H):i.vertexAttribPointer(R,P,V,w,z,H)}function x(R,P,V,w){A();let z=w.attributes,H=V.getAttributes(),U=P.defaultAttributeValues;for(let it in H){let X=H[it];if(X.location>=0){let j=z[it];if(j===void 0&&(it==="instanceMatrix"&&R.instanceMatrix&&(j=R.instanceMatrix),it==="instanceColor"&&R.instanceColor&&(j=R.instanceColor)),j!==void 0){let nt=j.normalized,Z=j.itemSize,rt=t.get(j);if(rt===void 0)continue;let yt=rt.buffer,Dt=rt.type,Kt=rt.bytesPerElement,J=Dt===i.INT||Dt===i.UNSIGNED_INT||j.gpuType===Ta;if(j.isInterleavedBufferAttribute){let W=j.data,ot=W.stride,mt=j.offset;if(W.isInstancedInterleavedBuffer){for(let pt=0;pt<X.locationSize;pt++)p(X.location+pt,W.meshPerAttribute);R.isInstancedMesh!==!0&&w._maxInstanceCount===void 0&&(w._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let pt=0;pt<X.locationSize;pt++)m(X.location+pt);i.bindBuffer(i.ARRAY_BUFFER,yt);for(let pt=0;pt<X.locationSize;pt++)v(X.location+pt,Z/X.locationSize,Dt,nt,ot*Kt,(mt+Z/X.locationSize*pt)*Kt,J)}else{if(j.isInstancedBufferAttribute){for(let W=0;W<X.locationSize;W++)p(X.location+W,j.meshPerAttribute);R.isInstancedMesh!==!0&&w._maxInstanceCount===void 0&&(w._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let W=0;W<X.locationSize;W++)m(X.location+W);i.bindBuffer(i.ARRAY_BUFFER,yt);for(let W=0;W<X.locationSize;W++)v(X.location+W,Z/X.locationSize,Dt,nt,Z*Kt,Z/X.locationSize*W*Kt,J)}}else if(U!==void 0){let nt=U[it];if(nt!==void 0)switch(nt.length){case 2:i.vertexAttrib2fv(X.location,nt);break;case 3:i.vertexAttrib3fv(X.location,nt);break;case 4:i.vertexAttrib4fv(X.location,nt);break;default:i.vertexAttrib1fv(X.location,nt)}}}}B()}function y(){D();for(let R in n){let P=n[R];for(let V in P){let w=P[V];for(let z in w){let H=w[z];for(let U in H)h(H[U].object),delete H[U];delete w[z]}}delete n[R]}}function M(R){if(n[R.id]===void 0)return;let P=n[R.id];for(let V in P){let w=P[V];for(let z in w){let H=w[z];for(let U in H)h(H[U].object),delete H[U];delete w[z]}}delete n[R.id]}function b(R){for(let P in n){let V=n[P];for(let w in V){let z=V[w];if(z[R.id]===void 0)continue;let H=z[R.id];for(let U in H)h(H[U].object),delete H[U];delete z[R.id]}}}function E(R){for(let P in n){let V=n[P],w=R.isInstancedMesh===!0?R.id:0,z=V[w];if(z!==void 0){for(let H in z){let U=z[H];for(let it in U)h(U[it].object),delete U[it];delete z[H]}delete V[w],Object.keys(V).length===0&&delete n[P]}}}function D(){I(),a=!0,r!==s&&(r=s,c(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:D,resetDefaultState:I,dispose:y,releaseStatesOfGeometry:M,releaseStatesOfObject:E,releaseStatesOfProgram:b,initAttributes:A,enableAttribute:m,disableUnusedAttributes:B}}function Eg(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Cg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let b=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(b){return!(b!==nn&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){let E=b===dn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==Ve&&b!==en&&!E&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(zt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&zt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),B=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=i.getParameter(i.MAX_SAMPLES),M=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:A,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:B,maxVaryings:v,maxFragmentUniforms:x,maxSamples:y,samples:M}}function xg(i){let t=this,e=null,n=0,s=!1,r=!1,a=new Xe,o=new Jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,A=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let B=r?0:n,v=B*4,x=p.clippingState||null;l.value=x,x=h(g,u,v,f);for(let y=0;y!==v;++y)x[y]=e[y];p.clippingState=x,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=B}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){let A=d!==null?d.length:0,m=null;if(A!==0){if(m=l.value,g!==!0||m===null){let p=f+A*4,B=u.matrixWorldInverse;o.getNormalMatrix(B),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,x=f;v!==A;++v,x+=4)a.copy(d[v]).applyMatrix4(B,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=A,t.numIntersection=0,m}}var cs=4,Bg=6,Ag=20,Mg=256,hr=new ns,eu=new Xt,$l=null,tc=0,ec=0,nc=!1,yg=new F,Bi=new F,Co=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=yg}=r;$l=this._renderer.getRenderTarget(),tc=this._renderer.getActiveCubeFace(),ec=this._renderer.getActiveMipmapLevel(),nc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=su(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=iu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget($l,tc,ec),this._renderer.xr.enabled=nc,t.scissorTest=!1,ls(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ii||t.mapping===Ei?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),$l=this._renderer.getRenderTarget(),tc=this._renderer.getActiveCubeFace(),ec=this._renderer.getActiveMipmapLevel(),nc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ie,minFilter:Ie,generateMipmaps:!1,type:dn,format:nn,colorSpace:Ds,depthBuffer:!1},s=nu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nu(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=vg(r)),this._blurMaterial=Dg(r,t,e),this._ggxMaterial=Sg(r,t,e)}return s}_compileMaterial(t){let e=new _e(new Oe,t);this._renderer.compile(e,hr)}_sceneToCubeUV(t,e,n,s,r){let l=new Re(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(eu),d.toneMapping=hn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new _e(new Rn,new Ls({name:"PMREM.Background",side:He,depthWrite:!1,depthTest:!1})));let A=this._backgroundBox,m=A.material,p=!1,B=t.background;B?B.isColor&&(m.color.copy(B),t.background=null,p=!0):(m.color.copy(eu),p=!0);for(let v=0;v<6;v++){let x=v%3;x===0?(l.up.set(0,c[v],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[v],r.y,r.z)):x===1?(l.up.set(0,0,c[v]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[v],r.z)):(l.up.set(0,c[v],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[v]));let y=this._cubeSize;ls(s,x*y,v>2?y:0,y,y),d.setRenderTarget(s),p&&d.render(A,l),d.render(t,l)}d.toneMapping=f,d.autoClear=u,t.background=B}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===ii||t.mapping===Ei;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=su()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=iu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;ls(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,hr)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:g}=this,A=this._sizeLods[n],m=3*A*(n>g-cs?n-g+cs:0),p=4*(this._cubeSize-A);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=g-e,ls(r,m,p,3*A,2*A),s.setRenderTarget(r),s.render(o,hr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,ls(t,m,p,3*A,2*A),s.setRenderTarget(t),s.render(o,hr)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],d=3*h*(s>this._lodMax-cs?s-this._lodMax+cs:0),u=4*(this._cubeSize-h);ls(e,d,u,3*h,2*h),a.setRenderTarget(e),a.render(l,hr)}};function vg(i){let t=[],e=[],n=i,s=i-cs+1+Bg;for(let r=0;r<s;r++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,g=new Float32Array(f*u*d),A=new Float32Array(f*u*d);for(let p=0;p<d;p++){let B=p%3*2/3-1,v=p>2?0:-1,x=[B,v,0,B+2/3,v,0,B+2/3,v+1,0,B,v,0,B+2/3,v+1,0,B,v+1,0];g.set(x,f*u*p);for(let y=0;y<u;y++){let M=h[y*2]*2-1,b=h[y*2+1]*2-1;p===0?Bi.set(1,b,M):p===1?Bi.set(-M,1,-b):p===2?Bi.set(-M,b,1):p===3?Bi.set(-1,b,-M):p===4?Bi.set(-M,-1,b):Bi.set(M,b,-1),Bi.toArray(A,(p*u+y)*f)}}let m=new Oe;m.setAttribute("position",new Ne(g,f)),m.setAttribute("outputDirection",new Ne(A,f)),e.push(new _e(m,null)),n>cs&&n--}return{lodMeshes:e,sizeLods:t}}function nu(i,t,e){let n=new ze(i,t,e);return n.texture.mapping=nr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ls(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Sg(i,t,e){return new Qe({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Mg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ao(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function Dg(i,t,e){return new Qe({name:"SphericalGaussianBlur",defines:{SAMPLES:Ag,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ao(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function iu(){return new Qe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ao(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function su(){return new Qe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ao(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function Ao(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var xo=class extends ze{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Ns(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Rn(5,5,5),r=new Qe({name:"CubemapFromEquirect",uniforms:xi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:He,blending:An});r.uniforms.tEquirect.value=e;let a=new _e(s,r),o=e.minFilter;return e.minFilter===si&&(e.minFilter=Ie),new Ma(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function bg(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===Da||f===ba)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let A=new xo(g.height);return A.fromEquirectangularTexture(i,u),t.set(u,A),u.addEventListener("dispose",c),o(A.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,g=f===Da||f===ba,A=f===ii||f===Ei;if(g||A){let m=e.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new Co(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let B=u.image;return g&&B&&B.height>0||A&&B&&l(B)?(n===null&&(n=new Co(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===Da?u.mapping=ii:f===ba&&(u.mapping=Ei),u}function l(u){let f=0,g=6;for(let A=0;A<g;A++)u[A]!==void 0&&f++;return f===g}function c(u){let f=u.target;f.removeEventListener("dispose",c);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Ig(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&mi("WebGLRenderer: "+n+" extension not supported."),s}}}function Tg(i,t,e,n){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)t.update(u[f],i.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,g=d.attributes.position,A=0;if(g===void 0)return;if(f!==null){let B=f.array;A=f.version;for(let v=0,x=B.length;v<x;v+=3){let y=B[v+0],M=B[v+1],b=B[v+2];u.push(y,M,M,b,b,y)}}else{let B=g.array;A=g.version;for(let v=0,x=B.length/3-1;v<x;v+=3){let y=v+0,M=v+1,b=v+2;u.push(y,M,M,b,b,y)}}let m=new(g.count>=65535?Gs:Rs)(u,1);m.version=A;let p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Fg(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),e.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*a,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let A=0;for(let m=0;m<f;m++)A+=u[m];e.update(A,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function wg(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Vt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Rg(i,t,e){let n=new WeakMap,s=new me;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let D=function(){b.dispose(),n.delete(o),o.removeEventListener("dispose",D)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,A=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],B=o.morphAttributes.color||[],v=0;f===!0&&(v=1),g===!0&&(v=2),A===!0&&(v=3);let x=o.attributes.position.count*v,y=1;x>t.maxTextureSize&&(y=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let M=new Float32Array(x*y*4*d),b=new Ts(M,x,y,d);b.type=en,b.needsUpdate=!0;let E=v*4;for(let I=0;I<d;I++){let R=m[I],P=p[I],V=B[I],w=x*y*4*I;for(let z=0;z<R.count;z++){let H=z*E;f===!0&&(s.fromBufferAttribute(R,z),M[w+H+0]=s.x,M[w+H+1]=s.y,M[w+H+2]=s.z,M[w+H+3]=0),g===!0&&(s.fromBufferAttribute(P,z),M[w+H+4]=s.x,M[w+H+5]=s.y,M[w+H+6]=s.z,M[w+H+7]=0),A===!0&&(s.fromBufferAttribute(V,z),M[w+H+8]=s.x,M[w+H+9]=s.y,M[w+H+10]=s.z,M[w+H+11]=V.itemSize===4?s.w:1)}}u={count:d,texture:b,size:new ut(x,y)},n.set(o,u),o.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let f=0;for(let A=0;A<c.length;A++)f+=c[A];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Gg(i,t,e,n,s){let r=new WeakMap;function a(c){let h=s.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var Lg={[vl]:"LINEAR_TONE_MAPPING",[Sl]:"REINHARD_TONE_MAPPING",[Dl]:"CINEON_TONE_MAPPING",[bl]:"ACES_FILMIC_TONE_MAPPING",[Tl]:"AGX_TONE_MAPPING",[Fl]:"NEUTRAL_TONE_MAPPING",[Il]:"CUSTOM_TONE_MAPPING"};function Pg(i,t,e,n,s,r){let a=new ze(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Oe;c.setAttribute("position",new Ce([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ce([0,2,0,0,2,0],2));let h=new ca({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new _e(c,h),u=new ns(-1,1,1,-1,0,1),f=null,g=null,A=!1,m,p=null,B=[],v=!1;this.setSize=function(x,y){a.setSize(x,y),o!==null&&o.setSize(x,y),l!==null&&l.setSize(x,y);for(let M=0;M<B.length;M++){let b=B[M];b.setSize&&b.setSize(x,y)}},this.setEffects=function(x){B=x,v=B.length>0&&B[0].isRenderPass===!0;let y=a.width,M=a.height;B.length>0&&o===null&&(o=new ze(y,M,{type:dn,depthBuffer:!1,stencilBuffer:!1}),l=new ze(y,M,{type:dn,depthBuffer:!1,stencilBuffer:!1}));for(let b=0;b<B.length;b++){let E=B[b];E.setSize&&E.setSize(y,M)}},this.begin=function(x,y){if(A||x.toneMapping===hn&&B.length===0)return!1;if(p=y,y!==null){let M=y.width,b=y.height;(a.width!==M||a.height!==b)&&this.setSize(M,b)}return v===!1&&x.setRenderTarget(a),m=x.toneMapping,x.toneMapping=hn,!0},this.hasRenderPass=function(){return v},this.end=function(x,y){x.toneMapping=m,A=!0;let M=a,b=o;for(let E=0;E<B.length;E++){let D=B[E];D.enabled!==!1&&(D.render(x,b,M,y),D.needsSwap!==!1&&(M=b,b=b===o?l:o))}if(f!==x.outputColorSpace||g!==x.toneMapping){f=x.outputColorSpace,g=x.toneMapping,h.defines={},te.getTransfer(f)===ae&&(h.defines.SRGB_TRANSFER="");let E=Lg[g];E&&(h.defines[E]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=M.texture,x.setRenderTarget(p),x.render(d,u),p=null,A=!1},this.isCompositing=function(){return A},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var yu=new Ue,rc=new qn(1,1),vu=new Ts,Su=new ea,Du=new Ns,ru=[],au=[],ou=new Float32Array(16),lu=new Float32Array(9),cu=new Float32Array(4);function us(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=ru[s];if(r===void 0&&(r=new Float32Array(s),ru[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Me(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Mo(i,t){let e=au[t];e===void 0&&(e=new Int32Array(t),au[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Ng(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Og(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2fv(this.addr,t),Me(e,t)}}function Hg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;i.uniform3fv(this.addr,t),Me(e,t)}}function Ug(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4fv(this.addr,t),Me(e,t)}}function zg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Me(e,t)}else{if(Ae(e,n))return;cu.set(n),i.uniformMatrix2fv(this.addr,!1,cu),Me(e,n)}}function Vg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Me(e,t)}else{if(Ae(e,n))return;lu.set(n),i.uniformMatrix3fv(this.addr,!1,lu),Me(e,n)}}function kg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Me(e,t)}else{if(Ae(e,n))return;ou.set(n),i.uniformMatrix4fv(this.addr,!1,ou),Me(e,n)}}function Kg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Jg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2iv(this.addr,t),Me(e,t)}}function Wg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3iv(this.addr,t),Me(e,t)}}function Xg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4iv(this.addr,t),Me(e,t)}}function qg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Yg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2uiv(this.addr,t),Me(e,t)}}function Qg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3uiv(this.addr,t),Me(e,t)}}function Zg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4uiv(this.addr,t),Me(e,t)}}function jg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(rc.compareFunction=e.isReversedDepthBuffer()?go:mo,r=rc):r=yu,e.setTexture2D(t||r,s)}function $g(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Su,s)}function t0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Du,s)}function e0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||vu,s)}function n0(i){switch(i){case 5126:return Ng;case 35664:return Og;case 35665:return Hg;case 35666:return Ug;case 35674:return zg;case 35675:return Vg;case 35676:return kg;case 5124:case 35670:return Kg;case 35667:case 35671:return Jg;case 35668:case 35672:return Wg;case 35669:case 35673:return Xg;case 5125:return qg;case 36294:return Yg;case 36295:return Qg;case 36296:return Zg;case 35678:case 36198:case 36298:case 36306:case 35682:return jg;case 35679:case 36299:case 36307:return $g;case 35680:case 36300:case 36308:case 36293:return t0;case 36289:case 36303:case 36311:case 36292:return e0}}function i0(i,t){i.uniform1fv(this.addr,t)}function s0(i,t){let e=us(t,this.size,2);i.uniform2fv(this.addr,e)}function r0(i,t){let e=us(t,this.size,3);i.uniform3fv(this.addr,e)}function a0(i,t){let e=us(t,this.size,4);i.uniform4fv(this.addr,e)}function o0(i,t){let e=us(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function l0(i,t){let e=us(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function c0(i,t){let e=us(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function h0(i,t){i.uniform1iv(this.addr,t)}function u0(i,t){i.uniform2iv(this.addr,t)}function d0(i,t){i.uniform3iv(this.addr,t)}function f0(i,t){i.uniform4iv(this.addr,t)}function p0(i,t){i.uniform1uiv(this.addr,t)}function m0(i,t){i.uniform2uiv(this.addr,t)}function g0(i,t){i.uniform3uiv(this.addr,t)}function _0(i,t){i.uniform4uiv(this.addr,t)}function E0(i,t,e){let n=this.cache,s=t.length,r=Mo(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=rc:a=yu;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function C0(i,t,e){let n=this.cache,s=t.length,r=Mo(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Su,r[a])}function x0(i,t,e){let n=this.cache,s=t.length,r=Mo(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Du,r[a])}function B0(i,t,e){let n=this.cache,s=t.length,r=Mo(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||vu,r[a])}function A0(i){switch(i){case 5126:return i0;case 35664:return s0;case 35665:return r0;case 35666:return a0;case 35674:return o0;case 35675:return l0;case 35676:return c0;case 5124:case 35670:return h0;case 35667:case 35671:return u0;case 35668:case 35672:return d0;case 35669:case 35673:return f0;case 5125:return p0;case 36294:return m0;case 36295:return g0;case 36296:return _0;case 35678:case 36198:case 36298:case 36306:case 35682:return E0;case 35679:case 36299:case 36307:return C0;case 35680:case 36300:case 36308:case 36293:return x0;case 36289:case 36303:case 36311:case 36292:return B0}}var ac=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=n0(e.type)}},oc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=A0(e.type)}},lc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},ic=/(\w+)(\])?(\[|\.)?/g;function hu(i,t){i.seq.push(t),i.map[t.id]=t}function M0(i,t,e){let n=i.name,s=n.length;for(ic.lastIndex=0;;){let r=ic.exec(n),a=ic.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){hu(e,c===void 0?new ac(o,i,t):new oc(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new lc(o),hu(e,d)),e=d}}}var hs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);M0(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function uu(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var y0=37297,v0=0;function S0(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var du=new Jt;function D0(i){te._getMatrix(du,te.workingColorSpace,i);let t=`mat3( ${du.elements.map(e=>e.toFixed(4))} )`;switch(te.getTransfer(i)){case bs:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return zt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function fu(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+S0(i.getShaderSource(t),o)}else return r}function b0(i,t){let e=D0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var I0={[vl]:"Linear",[Sl]:"Reinhard",[Dl]:"Cineon",[bl]:"ACESFilmic",[Tl]:"AgX",[Fl]:"Neutral",[Il]:"Custom"};function T0(i,t){let e=I0[t];return e===void 0?(zt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Eo=new F;function F0(){te.getLuminanceCoefficients(Eo);let i=Eo.x.toFixed(4),t=Eo.y.toFixed(4),e=Eo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function w0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(dr).join(`
`)}function R0(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function G0(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function dr(i){return i!==""}function pu(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function mu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var L0=/^[ \t]*#include +<([\w\d./]+)>/gm;function cc(i){return i.replace(L0,N0)}var P0=new Map;function N0(i,t){let e=Qt[t];if(e===void 0){let n=P0.get(t);if(n!==void 0)e=Qt[n],zt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return cc(e)}var O0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gu(i){return i.replace(O0,H0)}function H0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function _u(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var U0={[er]:"SHADOWMAP_TYPE_PCF",[ss]:"SHADOWMAP_TYPE_VSM"};function z0(i){return U0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var V0={[ii]:"ENVMAP_TYPE_CUBE",[Ei]:"ENVMAP_TYPE_CUBE",[nr]:"ENVMAP_TYPE_CUBE_UV"};function k0(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":V0[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var K0={[Ei]:"ENVMAP_MODE_REFRACTION"};function J0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":K0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var W0={[Sa]:"ENVMAP_BLENDING_MULTIPLY",[Th]:"ENVMAP_BLENDING_MIX",[Fh]:"ENVMAP_BLENDING_ADD"};function X0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":W0[i.combine]||"ENVMAP_BLENDING_NONE"}function q0(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Y0(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=z0(e),c=k0(e),h=J0(e),d=X0(e),u=q0(e),f=w0(e),g=R0(r),A=s.createProgram(),m,p,B=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(dr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(dr).join(`
`),p.length>0&&(p+=`
`)):(m=[_u(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(dr).join(`
`),p=[_u(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==hn?"#define TONE_MAPPING":"",e.toneMapping!==hn?Qt.tonemapping_pars_fragment:"",e.toneMapping!==hn?T0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Qt.colorspace_pars_fragment,b0("linearToOutputTexel",e.outputColorSpace),F0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(dr).join(`
`)),a=cc(a),a=pu(a,e),a=mu(a,e),o=cc(o),o=pu(o,e),o=mu(o,e),a=gu(a),o=gu(o),e.isRawShaderMaterial!==!0&&(B=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Hl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Hl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=B+m+a,x=B+p+o,y=uu(s,s.VERTEX_SHADER,v),M=uu(s,s.FRAGMENT_SHADER,x);s.attachShader(A,y),s.attachShader(A,M),e.index0AttributeName!==void 0?s.bindAttribLocation(A,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(A,0,"position"),s.linkProgram(A);function b(R){if(i.debug.checkShaderErrors){let P=s.getProgramInfoLog(A)||"",V=s.getShaderInfoLog(y)||"",w=s.getShaderInfoLog(M)||"",z=P.trim(),H=V.trim(),U=w.trim(),it=!0,X=!0;if(s.getProgramParameter(A,s.LINK_STATUS)===!1)if(it=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,A,y,M);else{let j=fu(s,y,"vertex"),nt=fu(s,M,"fragment");Vt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(A,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+z+`
`+j+`
`+nt)}else z!==""?zt("WebGLProgram: Program Info Log:",z):(H===""||U==="")&&(X=!1);X&&(R.diagnostics={runnable:it,programLog:z,vertexShader:{log:H,prefix:m},fragmentShader:{log:U,prefix:p}})}s.deleteShader(y),s.deleteShader(M),E=new hs(s,A),D=G0(s,A)}let E;this.getUniforms=function(){return E===void 0&&b(this),E};let D;this.getAttributes=function(){return D===void 0&&b(this),D};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(A,y0)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(A),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=v0++,this.cacheKey=t,this.usedTimes=1,this.program=A,this.vertexShader=y,this.fragmentShader=M,this}var Q0=0,hc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new uc(t),e.set(t,n)),n}},uc=class{constructor(t){this.id=Q0++,this.code=t,this.usedTimes=0}};function Z0(i){return i===ai||i===lr||i===cr}function j0(i,t,e,n,s,r){let a=new Fs,o=new hc,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(E){return l.add(E),E===0?"uv":`uv${E}`}function A(E,D,I,R,P,V){let w=R.fog,z=P.geometry,H=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?R.environment:null,U=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,it=t.get(E.envMap||H,U),X=it&&it.mapping===nr?it.image.height:null,j=f[E.type];E.precision!==null&&(u=n.getMaxPrecision(E.precision),u!==E.precision&&zt("WebGLProgram.getParameters:",E.precision,"not supported, using",u,"instead."));let nt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Z=nt!==void 0?nt.length:0,rt=0;z.morphAttributes.position!==void 0&&(rt=1),z.morphAttributes.normal!==void 0&&(rt=2),z.morphAttributes.color!==void 0&&(rt=3);let yt,Dt,Kt,J;if(j){let ue=yn[j];yt=ue.vertexShader,Dt=ue.fragmentShader}else{yt=E.vertexShader,Dt=E.fragmentShader;let ue=o.getVertexShaderStage(E),se=o.getFragmentShaderStage(E);o.update(E,ue,se),Kt=ue.id,J=se.id}let W=i.getRenderTarget(),ot=i.state.buffers.depth.getReversed(),mt=P.isInstancedMesh===!0,pt=P.isBatchedMesh===!0,Ot=!!E.map,$t=!!E.matcap,$=!!it,at=!!E.aoMap,ct=!!E.lightMap,lt=!!E.bumpMap&&E.wireframe===!1,ft=!!E.normalMap,Nt=!!E.displacementMap,Lt=!!E.emissiveMap,Ht=!!E.metalnessMap,kt=!!E.roughnessMap,T=E.anisotropy>0,ee=E.clearcoat>0,Zt=E.dispersion>0,S=E.retroreflectivity>0,_=E.iridescence>0,N=E.sheen>0,O=E.transmission>0,Y=T&&!!E.anisotropyMap,ht=ee&&!!E.clearcoatMap,dt=ee&&!!E.clearcoatNormalMap,Q=ee&&!!E.clearcoatRoughnessMap,tt=_&&!!E.iridescenceMap,gt=_&&!!E.iridescenceThicknessMap,Ft=N&&!!E.sheenColorMap,xt=N&&!!E.sheenRoughnessMap,_t=!!E.specularMap,Gt=!!E.specularColorMap,Ut=!!E.specularIntensityMap,Wt=O&&!!E.transmissionMap,L=O&&!!E.thicknessMap,Et=!!E.gradientMap,et=!!E.alphaMap,Ct=E.alphaTest>0,vt=!!E.alphaHash,st=!!E.extensions,Pt=hn;E.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(Pt=i.toneMapping);let wt={shaderID:j,shaderType:E.type,shaderName:E.name,vertexShader:yt,fragmentShader:Dt,defines:E.defines,customVertexShaderID:Kt,customFragmentShaderID:J,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:u,batching:pt,batchingColor:pt&&P._colorsTexture!==null,instancing:mt,instancingColor:mt&&P.instanceColor!==null,instancingMorph:mt&&P.morphTexture!==null,outputColorSpace:W===null?i.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:te.workingColorSpace,alphaToCoverage:!!E.alphaToCoverage,map:Ot,matcap:$t,envMap:$,envMapMode:$&&it.mapping,envMapCubeUVHeight:X,aoMap:at,lightMap:ct,bumpMap:lt,normalMap:ft,displacementMap:Nt,emissiveMap:Lt,normalMapObjectSpace:ft&&E.normalMapType===Gh,normalMapTangentSpace:ft&&E.normalMapType===po,packedNormalMap:ft&&E.normalMapType===po&&Z0(E.normalMap.format),metalnessMap:Ht,roughnessMap:kt,anisotropy:T,anisotropyMap:Y,clearcoat:ee,clearcoatMap:ht,clearcoatNormalMap:dt,clearcoatRoughnessMap:Q,dispersion:Zt,retroreflection:S,iridescence:_,iridescenceMap:tt,iridescenceThicknessMap:gt,sheen:N,sheenColorMap:Ft,sheenRoughnessMap:xt,specularMap:_t,specularColorMap:Gt,specularIntensityMap:Ut,transmission:O,transmissionMap:Wt,thicknessMap:L,gradientMap:Et,opaque:E.transparent===!1&&E.blending===rs&&E.alphaToCoverage===!1,alphaMap:et,alphaTest:Ct,alphaHash:vt,combine:E.combine,mapUv:Ot&&g(E.map.channel),aoMapUv:at&&g(E.aoMap.channel),lightMapUv:ct&&g(E.lightMap.channel),bumpMapUv:lt&&g(E.bumpMap.channel),normalMapUv:ft&&g(E.normalMap.channel),displacementMapUv:Nt&&g(E.displacementMap.channel),emissiveMapUv:Lt&&g(E.emissiveMap.channel),metalnessMapUv:Ht&&g(E.metalnessMap.channel),roughnessMapUv:kt&&g(E.roughnessMap.channel),anisotropyMapUv:Y&&g(E.anisotropyMap.channel),clearcoatMapUv:ht&&g(E.clearcoatMap.channel),clearcoatNormalMapUv:dt&&g(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&g(E.clearcoatRoughnessMap.channel),iridescenceMapUv:tt&&g(E.iridescenceMap.channel),iridescenceThicknessMapUv:gt&&g(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ft&&g(E.sheenColorMap.channel),sheenRoughnessMapUv:xt&&g(E.sheenRoughnessMap.channel),specularMapUv:_t&&g(E.specularMap.channel),specularColorMapUv:Gt&&g(E.specularColorMap.channel),specularIntensityMapUv:Ut&&g(E.specularIntensityMap.channel),transmissionMapUv:Wt&&g(E.transmissionMap.channel),thicknessMapUv:L&&g(E.thicknessMap.channel),alphaMapUv:et&&g(E.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(ft||T),vertexNormals:!!z.attributes.normal,vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!z.attributes.uv&&(Ot||et),fog:!!w,useFog:E.fog===!0,fogExp2:!!w&&w.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||z.attributes.normal===void 0&&ft===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ot,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:rt,numSunLights:D.sun.length,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numSunLightShadows:D.sunShadowMap.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Pt,decodeVideoTexture:Ot&&E.map.isVideoTexture===!0&&te.getTransfer(E.map.colorSpace)===ae,decodeVideoTextureEmissive:Lt&&E.emissiveMap.isVideoTexture===!0&&te.getTransfer(E.emissiveMap.colorSpace)===ae,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Bn,flipSided:E.side===He,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:st&&E.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&E.extensions.multiDraw===!0||pt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return wt.vertexUv1s=l.has(1),wt.vertexUv2s=l.has(2),wt.vertexUv3s=l.has(3),l.clear(),wt}function m(E){let D=[];if(E.shaderID?D.push(E.shaderID):(D.push(E.customVertexShaderID),D.push(E.customFragmentShaderID)),E.defines!==void 0)for(let I in E.defines)D.push(I),D.push(E.defines[I]);return E.isRawShaderMaterial===!1&&(p(D,E),B(D,E),D.push(i.outputColorSpace)),D.push(E.customProgramCacheKey),D.join()}function p(E,D){E.push(D.precision),E.push(D.outputColorSpace),E.push(D.envMapMode),E.push(D.envMapCubeUVHeight),E.push(D.mapUv),E.push(D.alphaMapUv),E.push(D.lightMapUv),E.push(D.aoMapUv),E.push(D.bumpMapUv),E.push(D.normalMapUv),E.push(D.displacementMapUv),E.push(D.emissiveMapUv),E.push(D.metalnessMapUv),E.push(D.roughnessMapUv),E.push(D.anisotropyMapUv),E.push(D.clearcoatMapUv),E.push(D.clearcoatNormalMapUv),E.push(D.clearcoatRoughnessMapUv),E.push(D.iridescenceMapUv),E.push(D.iridescenceThicknessMapUv),E.push(D.sheenColorMapUv),E.push(D.sheenRoughnessMapUv),E.push(D.specularMapUv),E.push(D.specularColorMapUv),E.push(D.specularIntensityMapUv),E.push(D.transmissionMapUv),E.push(D.thicknessMapUv),E.push(D.combine),E.push(D.fogExp2),E.push(D.sizeAttenuation),E.push(D.morphTargetsCount),E.push(D.morphAttributeCount),E.push(D.numSunLights),E.push(D.numDirLights),E.push(D.numPointLights),E.push(D.numSpotLights),E.push(D.numSpotLightMaps),E.push(D.numHemiLights),E.push(D.numRectAreaLights),E.push(D.numSunLightShadows),E.push(D.numDirLightShadows),E.push(D.numPointLightShadows),E.push(D.numSpotLightShadows),E.push(D.numSpotLightShadowsWithMaps),E.push(D.numLightProbes),E.push(D.shadowMapType),E.push(D.toneMapping),E.push(D.numClippingPlanes),E.push(D.numClipIntersection),E.push(D.depthPacking)}function B(E,D){a.disableAll(),D.instancing&&a.enable(0),D.instancingColor&&a.enable(1),D.instancingMorph&&a.enable(2),D.matcap&&a.enable(3),D.envMap&&a.enable(4),D.normalMapObjectSpace&&a.enable(5),D.normalMapTangentSpace&&a.enable(6),D.clearcoat&&a.enable(7),D.iridescence&&a.enable(8),D.alphaTest&&a.enable(9),D.vertexColors&&a.enable(10),D.vertexAlphas&&a.enable(11),D.vertexUv1s&&a.enable(12),D.vertexUv2s&&a.enable(13),D.vertexUv3s&&a.enable(14),D.vertexTangents&&a.enable(15),D.anisotropy&&a.enable(16),D.alphaHash&&a.enable(17),D.batching&&a.enable(18),D.dispersion&&a.enable(19),D.retroreflection&&a.enable(24),D.batchingColor&&a.enable(20),D.gradientMap&&a.enable(21),D.packedNormalMap&&a.enable(22),D.vertexNormals&&a.enable(23),E.push(a.mask),a.disableAll(),D.fog&&a.enable(0),D.useFog&&a.enable(1),D.flatShading&&a.enable(2),D.logarithmicDepthBuffer&&a.enable(3),D.reversedDepthBuffer&&a.enable(4),D.skinning&&a.enable(5),D.morphTargets&&a.enable(6),D.morphNormals&&a.enable(7),D.morphColors&&a.enable(8),D.premultipliedAlpha&&a.enable(9),D.shadowMapEnabled&&a.enable(10),D.doubleSided&&a.enable(11),D.flipSided&&a.enable(12),D.useDepthPacking&&a.enable(13),D.dithering&&a.enable(14),D.transmission&&a.enable(15),D.sheen&&a.enable(16),D.opaque&&a.enable(17),D.pointsUvs&&a.enable(18),D.decodeVideoTexture&&a.enable(19),D.decodeVideoTextureEmissive&&a.enable(20),D.alphaToCoverage&&a.enable(21),D.numLightProbeGrids>0&&a.enable(22),D.hasPositionAttribute&&a.enable(23),E.push(a.mask)}function v(E){let D=f[E.type],I;if(D){let R=yn[D];I=jh.clone(R.uniforms)}else I=E.uniforms;return I}function x(E,D){let I=h.get(D);return I!==void 0?++I.usedTimes:(I=new Y0(i,D,E,s),c.push(I),h.set(D,I)),I}function y(E){if(--E.usedTimes===0){let D=c.indexOf(E);c[D]=c[c.length-1],c.pop(),h.delete(E.cacheKey),E.destroy()}}function M(E){o.remove(E)}function b(){o.dispose()}return{getParameters:A,getProgramCacheKey:m,getUniforms:v,acquireProgram:x,releaseProgram:y,releaseShaderCache:M,programs:c,dispose:b}}function $0(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function t_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Eu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Cu(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,A,m,p){let B=i[t];return B===void 0?(B={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:A,renderOrder:u.renderOrder,z:m,group:p},i[t]=B):(B.id=u.id,B.object=u,B.geometry=f,B.material=g,B.materialVariant=a(u),B.groupOrder=A,B.renderOrder=u.renderOrder,B.z=m,B.group=p),t++,B}function l(u,f,g,A,m,p,B){B.reversedDepth===!0&&(m=-m);let v=o(u,f,g,A,m,p);g.transmission>0?n.push(v):g.transparent===!0?s.push(v):e.push(v)}function c(u,f,g,A,m,p){let B=o(u,f,g,A,m,p);g.transmission>0?n.unshift(B):g.transparent===!0?s.unshift(B):e.unshift(B)}function h(u,f){e.length>1&&e.sort(u||t_),n.length>1&&n.sort(f||Eu),s.length>1&&s.sort(f||Eu)}function d(){for(let u=t,f=i.length;u<f;u++){let g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function e_(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new Cu,i.set(n,[a])):s>=r.length?(a=new Cu,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function n_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new F,color:new Xt};break;case"SpotLight":e={position:new F,direction:new F,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function i_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var s_=0;function r_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function a_(i){let t=new n_,e=i_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new F);let s=new F,r=new he,a=new he;function o(c){let h=0,d=0,u=0;for(let P=0;P<9;P++)n.probe[P].set(0,0,0);let f=0,g=0,A=0,m=0,p=0,B=0,v=0,x=0,y=0,M=0,b=0,E=0,D=0,I=0;c.sort(r_);for(let P=0,V=c.length;P<V;P++){let w=c[P],z=w.color,H=w.intensity,U=w.distance,it=null;if(w.shadow&&w.shadow.map&&(w.shadow.map.texture.format===ai?it=w.shadow.map.texture:it=w.shadow.map.depthTexture||w.shadow.map.texture),w.isAmbientLight)h+=z.r*H,d+=z.g*H,u+=z.b*H;else if(w.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(w.sh.coefficients[X],H);I++}else if(w.isSunLight){let X=t.get(w);if(X.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){let j=w.shadow,nt=e.get(w);nt.shadowIntensity=j.intensity,nt.shadowBias=j.bias,nt.shadowNormalBias=j.normalBias,nt.shadowRadius=j.radius,nt.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[g]=nt,n.sunShadowMap[g]=it;let Z=j.getViewportCount();for(let rt=0;rt<Z;rt++)n.sunShadowMatrix[A+rt]=j.getMatrix(rt),n.sunShadowCascade[A+rt]=j._cascadeData[rt];A+=Z,g++}n.sun[f]=X,f++}else if(w.isDirectionalLight){let X=t.get(w);if(X.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){let j=w.shadow,nt=e.get(w);nt.shadowIntensity=j.intensity,nt.shadowBias=j.bias,nt.shadowNormalBias=j.normalBias,nt.shadowRadius=j.radius,nt.shadowMapSize=j.mapSize,n.directionalShadow[m]=nt,n.directionalShadowMap[m]=it,n.directionalShadowMatrix[m]=w.shadow.matrix,y++}n.directional[m]=X,m++}else if(w.isSpotLight){let X=t.get(w);X.position.setFromMatrixPosition(w.matrixWorld),X.color.copy(z).multiplyScalar(H),X.distance=U,X.coneCos=Math.cos(w.angle),X.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),X.decay=w.decay,n.spot[B]=X;let j=w.shadow;if(w.map&&(n.spotLightMap[E]=w.map,E++,j.updateMatrices(w),w.castShadow&&D++),n.spotLightMatrix[B]=j.matrix,w.castShadow){let nt=e.get(w);nt.shadowIntensity=j.intensity,nt.shadowBias=j.bias,nt.shadowNormalBias=j.normalBias,nt.shadowRadius=j.radius,nt.shadowMapSize=j.mapSize,n.spotShadow[B]=nt,n.spotShadowMap[B]=it,b++}B++}else if(w.isRectAreaLight){let X=t.get(w);X.color.copy(z).multiplyScalar(H),X.halfWidth.set(w.width*.5,0,0),X.halfHeight.set(0,w.height*.5,0),n.rectArea[v]=X,v++}else if(w.isPointLight){let X=t.get(w);if(X.color.copy(w.color).multiplyScalar(w.intensity),X.distance=w.distance,X.decay=w.decay,w.castShadow){let j=w.shadow,nt=e.get(w);nt.shadowIntensity=j.intensity,nt.shadowBias=j.bias,nt.shadowNormalBias=j.normalBias,nt.shadowRadius=j.radius,nt.shadowMapSize=j.mapSize,nt.shadowCameraNear=j.camera.near,nt.shadowCameraFar=j.camera.far,n.pointShadow[p]=nt,n.pointShadowMap[p]=it,n.pointShadowMatrix[p]=w.shadow.matrix,M++}n.point[p]=X,p++}else if(w.isHemisphereLight){let X=t.get(w);X.skyColor.copy(w.color).multiplyScalar(H),X.groundColor.copy(w.groundColor).multiplyScalar(H),n.hemi[x]=X,x++}}v>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Bt.LTC_FLOAT_1,n.rectAreaLTC2=Bt.LTC_FLOAT_2):(n.rectAreaLTC1=Bt.LTC_HALF_1,n.rectAreaLTC2=Bt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let R=n.hash;(R.sunLength!==f||R.directionalLength!==m||R.pointLength!==p||R.spotLength!==B||R.rectAreaLength!==v||R.hemiLength!==x||R.numSunShadows!==g||R.numDirectionalShadows!==y||R.numPointShadows!==M||R.numSpotShadows!==b||R.numSpotMaps!==E||R.numLightProbes!==I)&&(n.sun.length=f,n.directional.length=m,n.spot.length=B,n.rectArea.length=v,n.point.length=p,n.hemi.length=x,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=A,n.sunShadowCascade.length=A,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.directionalShadowMatrix.length=y,n.pointShadow.length=M,n.pointShadowMap.length=M,n.pointShadowMatrix.length=M,n.spotShadow.length=b,n.spotShadowMap.length=b,n.spotLightMatrix.length=b+E-D,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=D,n.numLightProbes=I,R.sunLength=f,R.directionalLength=m,R.pointLength=p,R.spotLength=B,R.rectAreaLength=v,R.hemiLength=x,R.numSunShadows=g,R.numDirectionalShadows=y,R.numPointShadows=M,R.numSpotShadows=b,R.numSpotMaps=E,R.numLightProbes=I,n.version=s_++)}function l(c,h){let d=0,u=0,f=0,g=0,A=0,m=0,p=h.matrixWorldInverse;for(let B=0,v=c.length;B<v;B++){let x=c[B];if(x.isSunLight){let y=n.sun[d];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(p),d++}else if(x.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),u++}else if(x.isSpotLight){let y=n.spot[g];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),g++}else if(x.isRectAreaLight){let y=n.rectArea[A];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(p),a.identity(),r.copy(x.matrixWorld),r.premultiply(p),a.extractRotation(r),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),A++}else if(x.isPointLight){let y=n.point[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(p),f++}else if(x.isHemisphereLight){let y=n.hemi[m];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:n}}function xu(i){let t=new a_(i),e=[],n=[],s=[];function r(u){d.camera=u,e.length=0,n.length=0,s.length=0}function a(u){e.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function o_(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new xu(i),t.set(s,[o])):r>=a.length?(o=new xu(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var l_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,c_=`uniform sampler2D shadow_pass;
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
}`,h_=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],u_=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Bu=new he,ur=new F,sc=new F;function d_(i,t,e){let n=new Qi,s=new ut,r=new ut,a=new me,o=new ha,l=new ua,c={},h=e.maxTextureSize,d={[ni]:He,[He]:ni,[Bn]:Bn},u=new Qe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:l_,fragmentShader:c_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new Oe;g.setAttribute("position",new Ne(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let A=new _e(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=er;let p=this.type;this.render=function(M,b,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;this.type===uh&&(zt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=er);let D=i.getRenderTarget(),I=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),P=i.state;P.setBlending(An),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);let V=p!==this.type;V&&b.traverse(function(w){w.material&&(Array.isArray(w.material)?w.material.forEach(z=>z.needsUpdate=!0):w.material.needsUpdate=!0)});for(let w=0,z=M.length;w<z;w++){let H=M[w],U=H.shadow;if(U===void 0){zt("WebGLShadowMap:",H,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;s.copy(U.mapSize);let it=U.getFrameExtents();s.multiply(it),r.copy(U.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/it.x),s.x=r.x*it.x,U.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/it.y),s.y=r.y*it.y,U.mapSize.y=r.y));let X=i.state.buffers.depth.getReversed();if(U.camera._reversedDepth=X,U.map===null||V===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===ss){if(H.isPointLight){zt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new ze(s.x,s.y,{format:ai,type:dn,minFilter:Ie,magFilter:Ie,generateMipmaps:!1}),U.map.texture.name=H.name+".shadowMap",U.map.depthTexture=new qn(s.x,s.y,en),U.map.depthTexture.name=H.name+".shadowMapDepth",U.map.depthTexture.format=Cn,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Se,U.map.depthTexture.magFilter=Se}else H.isPointLight?(U.map=new xo(s.x),U.map.depthTexture=new na(s.x,un)):(U.map=new ze(s.x,s.y),U.map.depthTexture=new qn(s.x,s.y,un)),U.map.depthTexture.name=H.name+".shadowMap",U.map.depthTexture.format=Cn,this.type===er?(U.map.depthTexture.compareFunction=X?go:mo,U.map.depthTexture.minFilter=Ie,U.map.depthTexture.magFilter=Ie):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Se,U.map.depthTexture.magFilter=Se);U.camera.updateProjectionMatrix()}U.map.isWebGLCubeRenderTarget!==!0&&(U.map.width!==s.x||U.map.height!==s.y)&&U.map.setSize(s.x,s.y);let j=U.map.isWebGLCubeRenderTarget?6:U.getViewportCount();H.isPointLight!==!0&&U.updateMatrices(H,E);for(let nt=0;nt<j;nt++){let Z=U.getCamera(nt);if(H.isPointLight){let rt=U.camera,yt=U.matrix,Dt=H.distance||rt.far;Dt!==rt.far&&(rt.far=Dt,rt.updateProjectionMatrix()),ur.setFromMatrixPosition(H.matrixWorld),rt.position.copy(ur),sc.copy(rt.position),sc.add(h_[nt]),rt.up.copy(u_[nt]),rt.lookAt(sc),rt.updateMatrixWorld(),yt.makeTranslation(-ur.x,-ur.y,-ur.z),Bu.multiplyMatrices(rt.projectionMatrix,rt.matrixWorldInverse),U._frustum.setFromProjectionMatrix(Bu,rt.coordinateSystem,rt.reversedDepth)}if(U.map.isWebGLCubeRenderTarget)i.setRenderTarget(U.map,nt),i.clear();else{nt===0&&(i.setRenderTarget(U.map),i.clear());let rt=U.getViewport(nt);a.set(r.x*rt.x,r.y*rt.y,r.x*rt.z,r.y*rt.w),P.viewport(a)}n=U.getFrustum(nt),x(b,E,Z,H,this.type)}U.isPointLightShadow!==!0&&this.type===ss&&B(U,E),U.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(D,I,R)};function B(M,b){let E=t.update(A);u.defines.VSM_SAMPLES!==M.blurSamples&&(u.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null?M.mapPass=new ze(s.x,s.y,{format:ai,type:dn}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),u.uniforms.shadow_pass.value=M.map.depthTexture,u.uniforms.resolution.value.set(M.map.width,M.map.height),u.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(b,null,E,u,A,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value.set(M.map.width,M.map.height),f.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(b,null,E,f,A,null)}function v(M,b,E,D){let I=null,R=E.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(R!==void 0)I=R;else if(I=E.isPointLight===!0?l:o,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){let P=I.uuid,V=b.uuid,w=c[P];w===void 0&&(w={},c[P]=w);let z=w[V];z===void 0&&(z=I.clone(),w[V]=z,b.addEventListener("dispose",y)),I=z}if(I.visible=b.visible,I.wireframe=b.wireframe,D===ss?I.side=b.shadowSide!==null?b.shadowSide:b.side:I.side=b.shadowSide!==null?b.shadowSide:d[b.side],I.alphaMap=b.alphaMap,I.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,I.map=b.map,I.clipShadows=b.clipShadows,I.clippingPlanes=b.clippingPlanes,I.clipIntersection=b.clipIntersection,I.displacementMap=b.displacementMap,I.displacementScale=b.displacementScale,I.displacementBias=b.displacementBias,I.wireframeLinewidth=b.wireframeLinewidth,I.linewidth=b.linewidth,E.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let P=i.properties.get(I);P.light=E}return I}function x(M,b,E,D,I){if(M.visible===!1)return;if(M.layers.test(b.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&I===ss)&&(!M.frustumCulled||M.intersectsFrustum(n))){M.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,M.matrixWorld);let V=t.update(M),w=M.material;if(Array.isArray(w)){let z=V.groups;for(let H=0,U=z.length;H<U;H++){let it=z[H],X=w[it.materialIndex];if(X&&X.visible){let j=v(M,X,D,I);M.onBeforeShadow(i,M,b,E,V,j,it),i.renderBufferDirect(E,null,V,j,M,it),M.onAfterShadow(i,M,b,E,V,j,it)}}}else if(w.visible){let z=v(M,w,D,I);M.onBeforeShadow(i,M,b,E,V,z,null),i.renderBufferDirect(E,null,V,z,M,null),M.onAfterShadow(i,M,b,E,V,z,null)}}let P=M.children;for(let V=0,w=P.length;V<w;V++)x(P[V],b,E,D,I)}function y(M){M.target.removeEventListener("dispose",y);for(let E in c){let D=c[E],I=M.target.uuid;I in D&&(D[I].dispose(),delete D[I])}}}function f_(i,t){function e(){let L=!1,Et=new me,et=null,Ct=new me(0,0,0,0);return{setMask:function(vt){et!==vt&&!L&&(i.colorMask(vt,vt,vt,vt),et=vt)},setLocked:function(vt){L=vt},setClear:function(vt,st,Pt,wt,ue){ue===!0&&(vt*=wt,st*=wt,Pt*=wt),Et.set(vt,st,Pt,wt),Ct.equals(Et)===!1&&(i.clearColor(vt,st,Pt,wt),Ct.copy(Et))},reset:function(){L=!1,et=null,Ct.set(-1,0,0,0)}}}function n(){let L=!1,Et=!1,et=null,Ct=null,vt=null;return{setReversed:function(st){if(Et!==st){let Pt=t.get("EXT_clip_control");st?Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.ZERO_TO_ONE_EXT):Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.NEGATIVE_ONE_TO_ONE_EXT),Et=st;let wt=vt;vt=null,this.setClear(wt)}},getReversed:function(){return Et},setTest:function(st){st?W(i.DEPTH_TEST):ot(i.DEPTH_TEST)},setMask:function(st){et!==st&&!L&&(i.depthMask(st),et=st)},setFunc:function(st){if(Et&&(st=Wh[st]),Ct!==st){switch(st){case kr:i.depthFunc(i.NEVER);break;case Kr:i.depthFunc(i.ALWAYS);break;case Jr:i.depthFunc(i.LESS);break;case zi:i.depthFunc(i.LEQUAL);break;case Wr:i.depthFunc(i.EQUAL);break;case Xr:i.depthFunc(i.GEQUAL);break;case qr:i.depthFunc(i.GREATER);break;case Yr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ct=st}},setLocked:function(st){L=st},setClear:function(st){vt!==st&&(vt=st,Et&&(st=1-st),i.clearDepth(st))},reset:function(){L=!1,et=null,Ct=null,vt=null,Et=!1}}}function s(){let L=!1,Et=null,et=null,Ct=null,vt=null,st=null,Pt=null,wt=null,ue=null;return{setTest:function(se){L||(se?W(i.STENCIL_TEST):ot(i.STENCIL_TEST))},setMask:function(se){Et!==se&&!L&&(i.stencilMask(se),Et=se)},setFunc:function(se,sn,pn){(et!==se||Ct!==sn||vt!==pn)&&(i.stencilFunc(se,sn,pn),et=se,Ct=sn,vt=pn)},setOp:function(se,sn,pn){(st!==se||Pt!==sn||wt!==pn)&&(i.stencilOp(se,sn,pn),st=se,Pt=sn,wt=pn)},setLocked:function(se){L=se},setClear:function(se){ue!==se&&(i.clearStencil(se),ue=se)},reset:function(){L=!1,Et=null,et=null,Ct=null,vt=null,st=null,Pt=null,wt=null,ue=null}}}let r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,g=[],A=null,m=!1,p=null,B=null,v=null,x=null,y=null,M=null,b=null,E=new Xt(0,0,0),D=0,I=!1,R=null,P=null,V=null,w=null,z=null,H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),U=!1,it=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(X)[1]),U=it>=1):X.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),U=it>=2);let j=null,nt={},Z=i.getParameter(i.SCISSOR_BOX),rt=i.getParameter(i.VIEWPORT),yt=new me().fromArray(Z),Dt=new me().fromArray(rt);function Kt(L,Et,et,Ct){let vt=new Uint8Array(4),st=i.createTexture();i.bindTexture(L,st),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Pt=0;Pt<et;Pt++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(Et,0,i.RGBA,1,1,Ct,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(Et+Pt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return st}let J={};J[i.TEXTURE_2D]=Kt(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=Kt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=Kt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=Kt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),W(i.DEPTH_TEST),a.setFunc(zi),lt(!1),ft(Cl),W(i.CULL_FACE),at(An);function W(L){h[L]!==!0&&(i.enable(L),h[L]=!0)}function ot(L){h[L]!==!1&&(i.disable(L),h[L]=!1)}function mt(L,Et){return u[L]!==Et?(i.bindFramebuffer(L,Et),u[L]=Et,L===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Et),L===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Et),!0):!1}function pt(L,Et){let et=g,Ct=!1;if(L){et=f.get(Et),et===void 0&&(et=[],f.set(Et,et));let vt=L.textures;if(et.length!==vt.length||et[0]!==i.COLOR_ATTACHMENT0){for(let st=0,Pt=vt.length;st<Pt;st++)et[st]=i.COLOR_ATTACHMENT0+st;et.length=vt.length,Ct=!0}}else et[0]!==i.BACK&&(et[0]=i.BACK,Ct=!0);Ct&&i.drawBuffers(et)}function Ot(L){return A!==L?(i.useProgram(L),A=L,!0):!1}let $t={[_i]:i.FUNC_ADD,[fh]:i.FUNC_SUBTRACT,[ph]:i.FUNC_REVERSE_SUBTRACT};$t[mh]=i.MIN,$t[gh]=i.MAX;let $={[_h]:i.ZERO,[Eh]:i.ONE,[Ch]:i.SRC_COLOR,[Ml]:i.SRC_ALPHA,[vh]:i.SRC_ALPHA_SATURATE,[Mh]:i.DST_COLOR,[Bh]:i.DST_ALPHA,[xh]:i.ONE_MINUS_SRC_COLOR,[yl]:i.ONE_MINUS_SRC_ALPHA,[yh]:i.ONE_MINUS_DST_COLOR,[Ah]:i.ONE_MINUS_DST_ALPHA,[Sh]:i.CONSTANT_COLOR,[Dh]:i.ONE_MINUS_CONSTANT_COLOR,[bh]:i.CONSTANT_ALPHA,[Ih]:i.ONE_MINUS_CONSTANT_ALPHA};function at(L,Et,et,Ct,vt,st,Pt,wt,ue,se){if(L===An){m===!0&&(ot(i.BLEND),m=!1);return}if(m===!1&&(W(i.BLEND),m=!0),L!==dh){if(L!==p||se!==I){if((B!==_i||y!==_i)&&(i.blendEquation(i.FUNC_ADD),B=_i,y=_i),se)switch(L){case rs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xl:i.blendFunc(i.ONE,i.ONE);break;case Bl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Al:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Vt("WebGLState: Invalid blending: ",L);break}else switch(L){case rs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Bl:Vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Al:Vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Vt("WebGLState: Invalid blending: ",L);break}v=null,x=null,M=null,b=null,E.set(0,0,0),D=0,p=L,I=se}return}vt=vt||Et,st=st||et,Pt=Pt||Ct,(Et!==B||vt!==y)&&(i.blendEquationSeparate($t[Et],$t[vt]),B=Et,y=vt),(et!==v||Ct!==x||st!==M||Pt!==b)&&(i.blendFuncSeparate($[et],$[Ct],$[st],$[Pt]),v=et,x=Ct,M=st,b=Pt),(wt.equals(E)===!1||ue!==D)&&(i.blendColor(wt.r,wt.g,wt.b,ue),E.copy(wt),D=ue),p=L,I=!1}function ct(L,Et){L.side===Bn?ot(i.CULL_FACE):W(i.CULL_FACE);let et=L.side===He;Et&&(et=!et),lt(et),L.blending===rs&&L.transparent===!1?at(An):at(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);let Ct=L.stencilWrite;o.setTest(Ct),Ct&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Lt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?W(i.SAMPLE_ALPHA_TO_COVERAGE):ot(i.SAMPLE_ALPHA_TO_COVERAGE)}function lt(L){R!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),R=L)}function ft(L){L!==ch?(W(i.CULL_FACE),L!==P&&(L===Cl?i.cullFace(i.BACK):L===hh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ot(i.CULL_FACE),P=L}function Nt(L){L!==V&&(U&&i.lineWidth(L),V=L)}function Lt(L,Et,et){L?(W(i.POLYGON_OFFSET_FILL),(w!==Et||z!==et)&&(w=Et,z=et,a.getReversed()&&(Et=-Et),i.polygonOffset(Et,et))):ot(i.POLYGON_OFFSET_FILL)}function Ht(L){L?W(i.SCISSOR_TEST):ot(i.SCISSOR_TEST)}function kt(L){L===void 0&&(L=i.TEXTURE0+H-1),j!==L&&(i.activeTexture(L),j=L)}function T(L,Et,et){et===void 0&&(j===null?et=i.TEXTURE0+H-1:et=j);let Ct=nt[et];Ct===void 0&&(Ct={type:void 0,texture:void 0},nt[et]=Ct),(Ct.type!==L||Ct.texture!==Et)&&(j!==et&&(i.activeTexture(et),j=et),i.bindTexture(L,Et||J[L]),Ct.type=L,Ct.texture=Et)}function ee(){let L=nt[j];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Zt(){try{i.compressedTexImage2D(...arguments)}catch(L){Vt("WebGLState:",L)}}function S(){try{i.compressedTexImage3D(...arguments)}catch(L){Vt("WebGLState:",L)}}function _(){try{i.texSubImage2D(...arguments)}catch(L){Vt("WebGLState:",L)}}function N(){try{i.texSubImage3D(...arguments)}catch(L){Vt("WebGLState:",L)}}function O(){try{i.compressedTexSubImage2D(...arguments)}catch(L){Vt("WebGLState:",L)}}function Y(){try{i.compressedTexSubImage3D(...arguments)}catch(L){Vt("WebGLState:",L)}}function ht(){try{i.texStorage2D(...arguments)}catch(L){Vt("WebGLState:",L)}}function dt(){try{i.texStorage3D(...arguments)}catch(L){Vt("WebGLState:",L)}}function Q(){try{i.texImage2D(...arguments)}catch(L){Vt("WebGLState:",L)}}function tt(){try{i.texImage3D(...arguments)}catch(L){Vt("WebGLState:",L)}}function gt(L){return d[L]!==void 0?d[L]:i.getParameter(L)}function Ft(L,Et){d[L]!==Et&&(i.pixelStorei(L,Et),d[L]=Et)}function xt(L){yt.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),yt.copy(L))}function _t(L){Dt.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),Dt.copy(L))}function Gt(L,Et){let et=c.get(Et);et===void 0&&(et=new WeakMap,c.set(Et,et));let Ct=et.get(L);Ct===void 0&&(Ct=i.getUniformBlockIndex(Et,L.name),et.set(L,Ct))}function Ut(L,Et){let Ct=c.get(Et).get(L);l.get(Et)!==Ct&&(i.uniformBlockBinding(Et,Ct,L.__bindingPointIndex),l.set(Et,Ct))}function Wt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},j=null,nt={},u={},f=new WeakMap,g=[],A=null,m=!1,p=null,B=null,v=null,x=null,y=null,M=null,b=null,E=new Xt(0,0,0),D=0,I=!1,R=null,P=null,V=null,w=null,z=null,yt.set(0,0,i.canvas.width,i.canvas.height),Dt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:W,disable:ot,bindFramebuffer:mt,drawBuffers:pt,useProgram:Ot,setBlending:at,setMaterial:ct,setFlipSided:lt,setCullFace:ft,setLineWidth:Nt,setPolygonOffset:Lt,setScissorTest:Ht,activeTexture:kt,bindTexture:T,unbindTexture:ee,compressedTexImage2D:Zt,compressedTexImage3D:S,texImage2D:Q,texImage3D:tt,pixelStorei:Ft,getParameter:gt,updateUBOMapping:Gt,uniformBlockBinding:Ut,texStorage2D:ht,texStorage3D:dt,texSubImage2D:_,texSubImage3D:N,compressedTexSubImage2D:O,compressedTexSubImage3D:Y,scissor:xt,viewport:_t,reset:Wt}}function p_(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ut,h=new WeakMap,d=new Set,u,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(S,_){return g?new OffscreenCanvas(S,_):Is("canvas")}function m(S,_,N){let O=1,Y=Zt(S);if((Y.width>N||Y.height>N)&&(O=N/Math.max(Y.width,Y.height)),O<1)if(typeof HTMLImageElement!="undefined"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&S instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&S instanceof ImageBitmap||typeof VideoFrame!="undefined"&&S instanceof VideoFrame){let ht=Math.floor(O*Y.width),dt=Math.floor(O*Y.height);u===void 0&&(u=A(ht,dt));let Q=_?A(ht,dt):u;return Q.width=ht,Q.height=dt,Q.getContext("2d").drawImage(S,0,0,ht,dt),zt("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+ht+"x"+dt+")."),Q}else return"data"in S&&zt("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),S;return S}function p(S){return S.generateMipmaps}function B(S){i.generateMipmap(S)}function v(S){return S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?i.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(S,_,N,O,Y,ht=!1){if(S!==null){if(i[S]!==void 0)return i[S];zt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let dt;O&&(dt=t.get("EXT_texture_norm16"),dt||zt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=_;if(_===i.RED&&(N===i.FLOAT&&(Q=i.R32F),N===i.HALF_FLOAT&&(Q=i.R16F),N===i.UNSIGNED_BYTE&&(Q=i.R8),N===i.UNSIGNED_SHORT&&dt&&(Q=dt.R16_EXT),N===i.SHORT&&dt&&(Q=dt.R16_SNORM_EXT)),_===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(Q=i.R8UI),N===i.UNSIGNED_SHORT&&(Q=i.R16UI),N===i.UNSIGNED_INT&&(Q=i.R32UI),N===i.BYTE&&(Q=i.R8I),N===i.SHORT&&(Q=i.R16I),N===i.INT&&(Q=i.R32I)),_===i.RG&&(N===i.FLOAT&&(Q=i.RG32F),N===i.HALF_FLOAT&&(Q=i.RG16F),N===i.UNSIGNED_BYTE&&(Q=i.RG8),N===i.UNSIGNED_SHORT&&dt&&(Q=dt.RG16_EXT),N===i.SHORT&&dt&&(Q=dt.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(Q=i.RG8UI),N===i.UNSIGNED_SHORT&&(Q=i.RG16UI),N===i.UNSIGNED_INT&&(Q=i.RG32UI),N===i.BYTE&&(Q=i.RG8I),N===i.SHORT&&(Q=i.RG16I),N===i.INT&&(Q=i.RG32I)),_===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),N===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),N===i.UNSIGNED_INT&&(Q=i.RGB32UI),N===i.BYTE&&(Q=i.RGB8I),N===i.SHORT&&(Q=i.RGB16I),N===i.INT&&(Q=i.RGB32I)),_===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),N===i.UNSIGNED_INT&&(Q=i.RGBA32UI),N===i.BYTE&&(Q=i.RGBA8I),N===i.SHORT&&(Q=i.RGBA16I),N===i.INT&&(Q=i.RGBA32I)),_===i.RGB&&(N===i.UNSIGNED_SHORT&&dt&&(Q=dt.RGB16_EXT),N===i.SHORT&&dt&&(Q=dt.RGB16_SNORM_EXT),N===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),N===i.UNSIGNED_INT_10F_11F_11F_REV&&(Q=i.R11F_G11F_B10F)),_===i.RGBA){let tt=ht?bs:te.getTransfer(Y);N===i.FLOAT&&(Q=i.RGBA32F),N===i.HALF_FLOAT&&(Q=i.RGBA16F),N===i.UNSIGNED_BYTE&&(Q=tt===ae?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT&&dt&&(Q=dt.RGBA16_EXT),N===i.SHORT&&dt&&(Q=dt.RGBA16_SNORM_EXT),N===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function y(S,_){let N;return S?_===null||_===un||_===os?N=i.DEPTH24_STENCIL8:_===en?N=i.DEPTH32F_STENCIL8:_===as&&(N=i.DEPTH24_STENCIL8,zt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===un||_===os?N=i.DEPTH_COMPONENT24:_===en?N=i.DEPTH_COMPONENT32F:_===as&&(N=i.DEPTH_COMPONENT16),N}function M(S,_){return p(S)===!0||S.isFramebufferTexture&&S.minFilter!==Se&&S.minFilter!==Ie?Math.log2(Math.max(_.width,_.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?_.mipmaps.length:1}function b(S){let _=S.target;_.removeEventListener("dispose",b),D(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&d.delete(_)}function E(S){let _=S.target;_.removeEventListener("dispose",E),R(_)}function D(S){let _=n.get(S);if(_.__webglInit===void 0)return;let N=S.source,O=f.get(N);if(O){let Y=O[_.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&I(S),Object.keys(O).length===0&&f.delete(N)}n.remove(S)}function I(S){let _=n.get(S);i.deleteTexture(_.__webglTexture);let N=S.source,O=f.get(N);delete O[_.__cacheKey],a.memory.textures--}function R(S){let _=n.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),n.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let O=0;O<6;O++){if(Array.isArray(_.__webglFramebuffer[O]))for(let Y=0;Y<_.__webglFramebuffer[O].length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[O][Y]);else i.deleteFramebuffer(_.__webglFramebuffer[O]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[O])}else{if(Array.isArray(_.__webglFramebuffer))for(let O=0;O<_.__webglFramebuffer.length;O++)i.deleteFramebuffer(_.__webglFramebuffer[O]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let O=0;O<_.__webglColorRenderbuffer.length;O++)_.__webglColorRenderbuffer[O]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[O]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let N=S.textures;for(let O=0,Y=N.length;O<Y;O++){let ht=n.get(N[O]);ht.__webglTexture&&(i.deleteTexture(ht.__webglTexture),a.memory.textures--),n.remove(N[O])}n.remove(S)}let P=0;function V(){P=0}function w(){return P}function z(S){P=S}function H(){let S=P;return S>=s.maxTextures&&zt("WebGLTextures: Trying to use "+(S+1)+" texture units while this GPU supports only "+s.maxTextures),P+=1,S}function U(S){let _=[];return _.push(S.wrapS),_.push(S.wrapT),_.push(S.wrapR||0),_.push(S.magFilter),_.push(S.minFilter),_.push(S.anisotropy),_.push(S.internalFormat),_.push(S.format),_.push(S.type),_.push(S.generateMipmaps),_.push(S.premultiplyAlpha),_.push(S.flipY),_.push(S.unpackAlignment),_.push(S.colorSpace),_.join()}function it(S,_){let N=n.get(S);if(S.isVideoTexture&&T(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&N.__version!==S.version){let O=S.image;if(O===null)zt("WebGLRenderer: Texture marked for update but no image data found.");else if(O.complete===!1)zt("WebGLRenderer: Texture marked for update but image is incomplete");else{ot(N,S,_);return}}else S.isExternalTexture&&(N.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+_)}function X(S,_){let N=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&N.__version!==S.version){ot(N,S,_);return}else S.isExternalTexture&&(N.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+_)}function j(S,_){let N=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&N.__version!==S.version){ot(N,S,_);return}e.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+_)}function nt(S,_){let N=n.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&N.__version!==S.version){mt(N,S,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+_)}let Z={[Qr]:i.REPEAT,[_n]:i.CLAMP_TO_EDGE,[Zr]:i.MIRRORED_REPEAT},rt={[Se]:i.NEAREST,[wh]:i.NEAREST_MIPMAP_NEAREST,[ir]:i.NEAREST_MIPMAP_LINEAR,[Ie]:i.LINEAR,[Ia]:i.LINEAR_MIPMAP_NEAREST,[si]:i.LINEAR_MIPMAP_LINEAR},yt={[Ph]:i.NEVER,[zh]:i.ALWAYS,[Nh]:i.LESS,[mo]:i.LEQUAL,[Oh]:i.EQUAL,[go]:i.GEQUAL,[Hh]:i.GREATER,[Uh]:i.NOTEQUAL};function Dt(S,_){if(_.type===en&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Ie||_.magFilter===Ia||_.magFilter===ir||_.magFilter===si||_.minFilter===Ie||_.minFilter===Ia||_.minFilter===ir||_.minFilter===si)&&zt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(S,i.TEXTURE_WRAP_S,Z[_.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,Z[_.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,Z[_.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,rt[_.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,rt[_.minFilter]),_.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,yt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Se||_.minFilter!==ir&&_.minFilter!==si||_.type===en&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let N=t.get("EXT_texture_filter_anisotropic");i.texParameterf(S,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Kt(S,_){let N=!1;S.__webglInit===void 0&&(S.__webglInit=!0,_.addEventListener("dispose",b));let O=_.source,Y=f.get(O);Y===void 0&&(Y={},f.set(O,Y));let ht=U(_);if(ht!==S.__cacheKey){Y[ht]===void 0&&(Y[ht]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),Y[ht].usedTimes++;let dt=Y[S.__cacheKey];dt!==void 0&&(Y[S.__cacheKey].usedTimes--,dt.usedTimes===0&&I(_)),S.__cacheKey=ht,S.__webglTexture=Y[ht].texture}return N}function J(S,_,N){return Math.floor(Math.floor(S/N)/_)}function W(S,_,N,O){let ht=S.updateRanges;if(ht.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,N,O,_.data);else{ht.sort((Ft,xt)=>Ft.start-xt.start);let dt=0;for(let Ft=1;Ft<ht.length;Ft++){let xt=ht[dt],_t=ht[Ft],Gt=xt.start+xt.count,Ut=J(_t.start,_.width,4),Wt=J(xt.start,_.width,4);_t.start<=Gt+1&&Ut===Wt&&J(_t.start+_t.count-1,_.width,4)===Ut?xt.count=Math.max(xt.count,_t.start+_t.count-xt.start):(++dt,ht[dt]=_t)}ht.length=dt+1;let Q=e.getParameter(i.UNPACK_ROW_LENGTH),tt=e.getParameter(i.UNPACK_SKIP_PIXELS),gt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Ft=0,xt=ht.length;Ft<xt;Ft++){let _t=ht[Ft],Gt=Math.floor(_t.start/4),Ut=Math.ceil(_t.count/4),Wt=Gt%_.width,L=Math.floor(Gt/_.width),Et=Ut,et=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Wt),e.pixelStorei(i.UNPACK_SKIP_ROWS,L),e.texSubImage2D(i.TEXTURE_2D,0,Wt,L,Et,et,N,O,_.data)}S.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Q),e.pixelStorei(i.UNPACK_SKIP_PIXELS,tt),e.pixelStorei(i.UNPACK_SKIP_ROWS,gt)}}function ot(S,_,N){let O=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(O=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(O=i.TEXTURE_3D);let Y=Kt(S,_),ht=_.source;e.bindTexture(O,S.__webglTexture,i.TEXTURE0+N);let dt=n.get(ht);if(ht.version!==dt.__version||Y===!0){if(e.activeTexture(i.TEXTURE0+N),(typeof ImageBitmap!="undefined"&&_.image instanceof ImageBitmap)===!1){let et=te.getPrimaries(te.workingColorSpace),Ct=_.colorSpace===Gn?null:te.getPrimaries(_.colorSpace),vt=_.colorSpace===Gn||et===Ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt)}e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let tt=m(_.image,!1,s.maxTextureSize);tt=ee(_,tt);let gt=r.convert(_.format,_.colorSpace),Ft=r.convert(_.type),xt=x(_.internalFormat,gt,Ft,_.normalized,_.colorSpace,_.isVideoTexture);Dt(O,_);let _t,Gt=_.mipmaps,Ut=_.isVideoTexture!==!0,Wt=dt.__version===void 0||Y===!0,L=ht.dataReady,Et=M(_,tt);if(_.isDepthTexture)xt=y(_.format===ri,_.type),Wt&&(Ut?e.texStorage2D(i.TEXTURE_2D,1,xt,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,xt,tt.width,tt.height,0,gt,Ft,null));else if(_.isDataTexture)if(Gt.length>0){Ut&&Wt&&e.texStorage2D(i.TEXTURE_2D,Et,xt,Gt[0].width,Gt[0].height);for(let et=0,Ct=Gt.length;et<Ct;et++)_t=Gt[et],Ut?L&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,_t.width,_t.height,gt,Ft,_t.data):e.texImage2D(i.TEXTURE_2D,et,xt,_t.width,_t.height,0,gt,Ft,_t.data);_.generateMipmaps=!1}else Ut?(Wt&&e.texStorage2D(i.TEXTURE_2D,Et,xt,tt.width,tt.height),L&&W(_,tt,gt,Ft)):e.texImage2D(i.TEXTURE_2D,0,xt,tt.width,tt.height,0,gt,Ft,tt.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ut&&Wt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Et,xt,Gt[0].width,Gt[0].height,tt.depth);for(let et=0,Ct=Gt.length;et<Ct;et++)if(_t=Gt[et],_.format!==nn)if(gt!==null)if(Ut){if(L)if(_.layerUpdates.size>0){let vt=Xl(_t.width,_t.height,_.format,_.type);for(let st of _.layerUpdates){let Pt=_t.data.subarray(st*vt/_t.data.BYTES_PER_ELEMENT,(st+1)*vt/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,st,_t.width,_t.height,1,gt,Pt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,_t.width,_t.height,tt.depth,gt,_t.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,et,xt,_t.width,_t.height,tt.depth,0,_t.data,0,0);else zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ut?L&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,_t.width,_t.height,tt.depth,gt,Ft,_t.data):e.texImage3D(i.TEXTURE_2D_ARRAY,et,xt,_t.width,_t.height,tt.depth,0,gt,Ft,_t.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Ut&&Wt&&e.texStorage2D(i.TEXTURE_2D,Et,xt,Gt[0].width,Gt[0].height);for(let et=0,Ct=Gt.length;et<Ct;et++)_t=Gt[et],_.format!==nn?gt!==null?Ut?L&&e.compressedTexSubImage2D(i.TEXTURE_2D,et,0,0,_t.width,_t.height,gt,_t.data):e.compressedTexImage2D(i.TEXTURE_2D,et,xt,_t.width,_t.height,0,_t.data):zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ut?L&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,_t.width,_t.height,gt,Ft,_t.data):e.texImage2D(i.TEXTURE_2D,et,xt,_t.width,_t.height,0,gt,Ft,_t.data)}else if(_.isDataArrayTexture)if(Ut){if(Wt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Et,xt,tt.width,tt.height,tt.depth),L)if(_.layerUpdates.size>0){let et=Xl(tt.width,tt.height,_.format,_.type);for(let Ct of _.layerUpdates){let vt=tt.data.subarray(Ct*et/tt.data.BYTES_PER_ELEMENT,(Ct+1)*et/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ct,tt.width,tt.height,1,gt,Ft,vt)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,gt,Ft,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,xt,tt.width,tt.height,tt.depth,0,gt,Ft,tt.data);else if(_.isData3DTexture)Ut?(Wt&&e.texStorage3D(i.TEXTURE_3D,Et,xt,tt.width,tt.height,tt.depth),L&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,gt,Ft,tt.data)):e.texImage3D(i.TEXTURE_3D,0,xt,tt.width,tt.height,tt.depth,0,gt,Ft,tt.data);else if(_.isFramebufferTexture){if(Wt)if(Ut)e.texStorage2D(i.TEXTURE_2D,Et,xt,tt.width,tt.height);else{let et=tt.width,Ct=tt.height;for(let vt=0;vt<Et;vt++)e.texImage2D(i.TEXTURE_2D,vt,xt,et,Ct,0,gt,Ft,null),et>>=1,Ct>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let et=i.canvas;if(et.hasAttribute("layoutsubtree")||et.setAttribute("layoutsubtree","true"),tt.parentNode!==et){et.appendChild(tt),d.add(_),et.onpaint=Ct=>{let vt=Ct.changedElements;for(let st of d)vt.includes(st.image)&&(st.needsUpdate=!0)},et.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,tt);else{let vt=i.RGBA,st=i.RGBA,Pt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,vt,st,Pt,tt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Gt.length>0){if(Ut&&Wt){let et=Zt(Gt[0]);e.texStorage2D(i.TEXTURE_2D,Et,xt,et.width,et.height)}for(let et=0,Ct=Gt.length;et<Ct;et++)_t=Gt[et],Ut?L&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,gt,Ft,_t):e.texImage2D(i.TEXTURE_2D,et,xt,gt,Ft,_t);_.generateMipmaps=!1}else if(Ut){if(Wt){let et=Zt(tt);e.texStorage2D(i.TEXTURE_2D,Et,xt,et.width,et.height)}L&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt,Ft,tt)}else e.texImage2D(i.TEXTURE_2D,0,xt,gt,Ft,tt);p(_)&&B(O),dt.__version=ht.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function mt(S,_,N){if(_.image.length!==6)return;let O=Kt(S,_),Y=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+N);let ht=n.get(Y);if(Y.version!==ht.__version||O===!0){e.activeTexture(i.TEXTURE0+N);let dt=te.getPrimaries(te.workingColorSpace),Q=_.colorSpace===Gn?null:te.getPrimaries(_.colorSpace),tt=_.colorSpace===Gn||dt===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);let gt=_.isCompressedTexture||_.image[0].isCompressedTexture,Ft=_.image[0]&&_.image[0].isDataTexture,xt=[];for(let st=0;st<6;st++)!gt&&!Ft?xt[st]=m(_.image[st],!0,s.maxCubemapSize):xt[st]=Ft?_.image[st].image:_.image[st],xt[st]=ee(_,xt[st]);let _t=xt[0],Gt=r.convert(_.format,_.colorSpace),Ut=r.convert(_.type),Wt=x(_.internalFormat,Gt,Ut,_.normalized,_.colorSpace),L=_.isVideoTexture!==!0,Et=ht.__version===void 0||O===!0,et=Y.dataReady,Ct=M(_,_t);Dt(i.TEXTURE_CUBE_MAP,_);let vt;if(gt){L&&Et&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ct,Wt,_t.width,_t.height);for(let st=0;st<6;st++){vt=xt[st].mipmaps;for(let Pt=0;Pt<vt.length;Pt++){let wt=vt[Pt];_.format!==nn?Gt!==null?L?et&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Pt,0,0,wt.width,wt.height,Gt,wt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Pt,Wt,wt.width,wt.height,0,wt.data):zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Pt,0,0,wt.width,wt.height,Gt,Ut,wt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Pt,Wt,wt.width,wt.height,0,Gt,Ut,wt.data)}}}else{if(vt=_.mipmaps,L&&Et){vt.length>0&&Ct++;let st=Zt(xt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ct,Wt,st.width,st.height)}for(let st=0;st<6;st++)if(Ft){L?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,xt[st].width,xt[st].height,Gt,Ut,xt[st].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Wt,xt[st].width,xt[st].height,0,Gt,Ut,xt[st].data);for(let Pt=0;Pt<vt.length;Pt++){let ue=vt[Pt].image[st].image;L?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Pt+1,0,0,ue.width,ue.height,Gt,Ut,ue.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Pt+1,Wt,ue.width,ue.height,0,Gt,Ut,ue.data)}}else{L?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,Gt,Ut,xt[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Wt,Gt,Ut,xt[st]);for(let Pt=0;Pt<vt.length;Pt++){let wt=vt[Pt];L?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Pt+1,0,0,Gt,Ut,wt.image[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Pt+1,Wt,Gt,Ut,wt.image[st])}}}p(_)&&B(i.TEXTURE_CUBE_MAP),ht.__version=Y.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function pt(S,_,N,O,Y,ht){let dt=r.convert(N.format,N.colorSpace),Q=r.convert(N.type),tt=x(N.internalFormat,dt,Q,N.normalized,N.colorSpace),gt=n.get(_),Ft=n.get(N);if(Ft.__renderTarget=_,!gt.__hasExternalTextures){let xt=Math.max(1,_.width>>ht),_t=Math.max(1,_.height>>ht);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?e.texImage3D(Y,ht,tt,xt,_t,_.depth,0,dt,Q,null):e.texImage2D(Y,ht,tt,xt,_t,0,dt,Q,null)}e.bindFramebuffer(i.FRAMEBUFFER,S),kt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,O,Y,Ft.__webglTexture,0,Ht(_)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,O,Y,Ft.__webglTexture,ht),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ot(S,_,N){if(i.bindRenderbuffer(i.RENDERBUFFER,S),_.depthBuffer){let O=_.depthTexture,Y=O&&O.isDepthTexture?O.type:null,ht=y(_.stencilBuffer,Y),dt=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;kt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ht(_),ht,_.width,_.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ht(_),ht,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ht,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,dt,i.RENDERBUFFER,S)}else{let O=_.textures;for(let Y=0;Y<O.length;Y++){let ht=O[Y],dt=r.convert(ht.format,ht.colorSpace),Q=r.convert(ht.type),tt=x(ht.internalFormat,dt,Q,ht.normalized,ht.colorSpace);kt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ht(_),tt,_.width,_.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ht(_),tt,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,tt,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function $t(S,_,N){let O=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,S),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=n.get(_.depthTexture);if(Y.__renderTarget=_,(!Y.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),O){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,_.depthTexture.addEventListener("dispose",b)),Y.__webglTexture===void 0){Y.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Dt(i.TEXTURE_CUBE_MAP,_.depthTexture);let gt=r.convert(_.depthTexture.format),Ft=r.convert(_.depthTexture.type),xt;_.depthTexture.format===Cn?xt=i.DEPTH_COMPONENT24:_.depthTexture.format===ri&&(xt=i.DEPTH24_STENCIL8);for(let _t=0;_t<6;_t++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,xt,_.width,_.height,0,gt,Ft,null)}}else it(_.depthTexture,0);let ht=Y.__webglTexture,dt=Ht(_),Q=O?i.TEXTURE_CUBE_MAP_POSITIVE_X+N:i.TEXTURE_2D,tt=_.depthTexture.format===ri?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Cn)kt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,Q,ht,0,dt):i.framebufferTexture2D(i.FRAMEBUFFER,tt,Q,ht,0);else if(_.depthTexture.format===ri)kt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,Q,ht,0,dt):i.framebufferTexture2D(i.FRAMEBUFFER,tt,Q,ht,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function $(S){let _=n.get(S),N=S.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==S.depthTexture){let O=S.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),O){let Y=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,O.removeEventListener("dispose",Y)};O.addEventListener("dispose",Y),_.__depthDisposeCallback=Y}_.__boundDepthTexture=O}if(S.depthTexture&&!_.__autoAllocateDepthBuffer)if(N)for(let O=0;O<6;O++)$t(_.__webglFramebuffer[O],S,O);else{let O=S.texture.mipmaps;O&&O.length>0?$t(_.__webglFramebuffer[0],S,0):$t(_.__webglFramebuffer,S,0)}else if(N){_.__webglDepthbuffer=[];for(let O=0;O<6;O++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[O]),_.__webglDepthbuffer[O]===void 0)_.__webglDepthbuffer[O]=i.createRenderbuffer(),Ot(_.__webglDepthbuffer[O],S,!1);else{let Y=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=_.__webglDepthbuffer[O];i.bindRenderbuffer(i.RENDERBUFFER,ht),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,ht)}}else{let O=S.texture.mipmaps;if(O&&O.length>0?e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Ot(_.__webglDepthbuffer,S,!1);else{let Y=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ht),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,ht)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function at(S,_,N){let O=n.get(S);_!==void 0&&pt(O.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&$(S)}function ct(S){let _=S.texture,N=n.get(S),O=n.get(_);S.addEventListener("dispose",E);let Y=S.textures,ht=S.isWebGLCubeRenderTarget===!0,dt=Y.length>1;if(dt||(O.__webglTexture===void 0&&(O.__webglTexture=i.createTexture()),O.__version=_.version,a.memory.textures++),ht){N.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer[Q]=[];for(let tt=0;tt<_.mipmaps.length;tt++)N.__webglFramebuffer[Q][tt]=i.createFramebuffer()}else N.__webglFramebuffer[Q]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer=[];for(let Q=0;Q<_.mipmaps.length;Q++)N.__webglFramebuffer[Q]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(dt)for(let Q=0,tt=Y.length;Q<tt;Q++){let gt=n.get(Y[Q]);gt.__webglTexture===void 0&&(gt.__webglTexture=i.createTexture(),a.memory.textures++)}if(S.samples>0&&kt(S)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let Q=0;Q<Y.length;Q++){let tt=Y[Q];N.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[Q]);let gt=r.convert(tt.format,tt.colorSpace),Ft=r.convert(tt.type),xt=x(tt.internalFormat,gt,Ft,tt.normalized,tt.colorSpace,S.isXRRenderTarget===!0),_t=Ht(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,_t,xt,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,N.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),Ot(N.__webglDepthRenderbuffer,S,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ht){e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture),Dt(i.TEXTURE_CUBE_MAP,_);for(let Q=0;Q<6;Q++)if(_.mipmaps&&_.mipmaps.length>0)for(let tt=0;tt<_.mipmaps.length;tt++)pt(N.__webglFramebuffer[Q][tt],S,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,tt);else pt(N.__webglFramebuffer[Q],S,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);p(_)&&B(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(dt){for(let Q=0,tt=Y.length;Q<tt;Q++){let gt=Y[Q],Ft=n.get(gt),xt=i.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(xt=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(xt,Ft.__webglTexture),Dt(xt,gt),pt(N.__webglFramebuffer,S,gt,i.COLOR_ATTACHMENT0+Q,xt,0),p(gt)&&B(xt)}e.unbindTexture()}else{let Q=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(Q=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Q,O.__webglTexture),Dt(Q,_),_.mipmaps&&_.mipmaps.length>0)for(let tt=0;tt<_.mipmaps.length;tt++)pt(N.__webglFramebuffer[tt],S,_,i.COLOR_ATTACHMENT0,Q,tt);else pt(N.__webglFramebuffer,S,_,i.COLOR_ATTACHMENT0,Q,0);p(_)&&B(Q),e.unbindTexture()}S.depthBuffer&&$(S)}function lt(S){let _=S.textures;for(let N=0,O=_.length;N<O;N++){let Y=_[N];if(p(Y)){let ht=v(S),dt=n.get(Y).__webglTexture;e.bindTexture(ht,dt),B(ht),e.unbindTexture()}}}let ft=[],Nt=[];function Lt(S){if(S.samples>0){if(kt(S)===!1){let _=S.textures,N=S.width,O=S.height,Y=i.COLOR_BUFFER_BIT,ht=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=n.get(S),Q=_.length>1;if(Q)for(let gt=0;gt<_.length;gt++)e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,dt.__webglMultisampledFramebuffer);let tt=S.texture.mipmaps;tt&&tt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglFramebuffer);for(let gt=0;gt<_.length;gt++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),Q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,dt.__webglColorRenderbuffer[gt]);let Ft=n.get(_[gt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ft,0)}i.blitFramebuffer(0,0,N,O,0,0,N,O,Y,i.NEAREST),l===!0&&(ft.length=0,Nt.length=0,ft.push(i.COLOR_ATTACHMENT0+gt),S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&(ft.push(ht),Nt.push(ht),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Nt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ft))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Q)for(let gt=0;gt<_.length;gt++){e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,dt.__webglColorRenderbuffer[gt]);let Ft=n.get(_[gt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,Ft,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&l){let _=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function Ht(S){return Math.min(s.maxSamples,S.samples)}function kt(S){let _=n.get(S);return S.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function T(S){let _=a.render.frame;h.get(S)!==_&&(h.set(S,_),S.update())}function ee(S,_){let N=S.colorSpace,O=S.format,Y=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||N!==Ds&&N!==Gn&&(te.getTransfer(N)===ae?(O!==nn||Y!==Ve)&&zt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Vt("WebGLTextures: Unsupported texture color space:",N)),_}function Zt(S){return typeof HTMLImageElement!="undefined"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame!="undefined"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=V,this.getTextureUnits=w,this.setTextureUnits=z,this.setTexture2D=it,this.setTexture2DArray=X,this.setTexture3D=j,this.setTextureCube=nt,this.rebindTextures=at,this.setupRenderTarget=ct,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=$,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=kt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function m_(i,t){function e(n,s=Gn){let r,a=te.getTransfer(s);if(n===Ve)return i.UNSIGNED_BYTE;if(n===Fa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===wa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ll)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Pl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Rl)return i.BYTE;if(n===Gl)return i.SHORT;if(n===as)return i.UNSIGNED_SHORT;if(n===Ta)return i.INT;if(n===un)return i.UNSIGNED_INT;if(n===en)return i.FLOAT;if(n===dn)return i.HALF_FLOAT;if(n===Nl)return i.ALPHA;if(n===Ol)return i.RGB;if(n===nn)return i.RGBA;if(n===Cn)return i.DEPTH_COMPONENT;if(n===ri)return i.DEPTH_STENCIL;if(n===Ra)return i.RED;if(n===Ga)return i.RED_INTEGER;if(n===ai)return i.RG;if(n===La)return i.RG_INTEGER;if(n===Pa)return i.RGBA_INTEGER;if(n===sr||n===rr||n===ar||n===or)if(a===ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===sr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===sr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===rr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ar)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===or)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Na||n===Oa||n===Ha||n===Ua)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Na)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Oa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ha)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ua)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===za||n===Va||n===ka||n===Ka||n===Ja||n===lr||n===Wa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===za||n===Va)return a===ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ka)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ka)return r.COMPRESSED_R11_EAC;if(n===Ja)return r.COMPRESSED_SIGNED_R11_EAC;if(n===lr)return r.COMPRESSED_RG11_EAC;if(n===Wa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Xa||n===qa||n===Ya||n===Qa||n===Za||n===ja||n===$a||n===to||n===eo||n===no||n===io||n===so||n===ro||n===ao)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Xa)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===qa)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ya)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Qa)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Za)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ja)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===$a)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===to)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===eo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===no)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===io)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===so)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ro)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ao)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===oo||n===lo||n===co)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===oo)return a===ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===lo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===co)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ho||n===uo||n===cr||n===fo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ho)return r.COMPRESSED_RED_RGTC1_EXT;if(n===uo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===cr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===fo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===os?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var g_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,__=`
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

}`,dc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Os(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Qe({vertexShader:g_,fragmentShader:__,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new _e(new Qn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},fc=class extends cn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,A=typeof XRWebGLBinding!="undefined",m=new dc,p={},B=e.getContextAttributes(),v=null,x=null,y=[],M=[],b=new ut,E=null,D=null,I=new Re;I.viewport=new me;let R=new Re;R.viewport=new me;let P=[I,R],V=new ya,w=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let W=y[J];return W===void 0&&(W=new Wi,y[J]=W),W.getTargetRaySpace()},this.getControllerGrip=function(J){let W=y[J];return W===void 0&&(W=new Wi,y[J]=W),W.getGripSpace()},this.getHand=function(J){let W=y[J];return W===void 0&&(W=new Wi,y[J]=W),W.getHandSpace()};function H(J){let W=M.indexOf(J.inputSource);if(W===-1)return;let ot=y[W];ot!==void 0&&(ot.update(J.inputSource,J.frame,c||a),ot.dispatchEvent({type:J.type,data:J.inputSource}))}function U(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",U),s.removeEventListener("inputsourceschange",it);for(let J=0;J<y.length;J++){let W=M[J];W!==null&&(M[J]=null,y[J].disconnect(W))}w=null,z=null,m.reset();for(let J in p)delete p[J];if(t.setRenderTarget(v),f=null,u=null,d=null,s=null,x=null,Kt.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(b.width,b.height,!1),D!==null){let J=D.camera;J.fov=D.fov,J.zoom=D.zoom,J.updateProjectionMatrix(),D=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&zt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&zt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&A&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(v=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",U),s.addEventListener("inputsourceschange",it),B.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(b),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let ot=null,mt=null,pt=null;B.depth&&(pt=B.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=B.stencil?ri:Cn,mt=B.stencil?os:un);let Ot={colorFormat:e.RGBA8,depthFormat:pt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Ot),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),x=new ze(u.textureWidth,u.textureHeight,{format:nn,type:Ve,depthTexture:new qn(u.textureWidth,u.textureHeight,mt,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:B.stencil,colorSpace:t.outputColorSpace,samples:B.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let ot={antialias:B.antialias,alpha:!0,depth:B.depth,stencil:B.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,ot),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new ze(f.framebufferWidth,f.framebufferHeight,{format:nn,type:Ve,colorSpace:t.outputColorSpace,stencilBuffer:B.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Kt.setContext(s),Kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function it(J){for(let W=0;W<J.removed.length;W++){let ot=J.removed[W],mt=M.indexOf(ot);mt>=0&&(M[mt]=null,y[mt].disconnect(ot))}for(let W=0;W<J.added.length;W++){let ot=J.added[W],mt=M.indexOf(ot);if(mt===-1){for(let Ot=0;Ot<y.length;Ot++)if(Ot>=M.length){M.push(ot),mt=Ot;break}else if(M[Ot]===null){M[Ot]=ot,mt=Ot;break}if(mt===-1)break}let pt=y[mt];pt&&pt.connect(ot)}}let X=new F,j=new F;function nt(J,W,ot){X.setFromMatrixPosition(W.matrixWorld),j.setFromMatrixPosition(ot.matrixWorld);let mt=X.distanceTo(j),pt=W.projectionMatrix.elements,Ot=ot.projectionMatrix.elements,$t=pt[14]/(pt[10]-1),$=pt[14]/(pt[10]+1),at=(pt[9]+1)/pt[5],ct=(pt[9]-1)/pt[5],lt=(pt[8]-1)/pt[0],ft=(Ot[8]+1)/Ot[0],Nt=$t*lt,Lt=$t*ft,Ht=mt/(-lt+ft),kt=Ht*-lt;if(W.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(kt),J.translateZ(Ht),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),pt[10]===-1)J.projectionMatrix.copy(W.projectionMatrix),J.projectionMatrixInverse.copy(W.projectionMatrixInverse);else{let T=$t+Ht,ee=$+Ht,Zt=Nt-kt,S=Lt+(mt-kt),_=at*$/ee*T,N=ct*$/ee*T;J.projectionMatrix.makePerspective(Zt,S,_,N,T,ee),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Z(J,W){W===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(W.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let W=J.near,ot=J.far;m.texture!==null&&(m.depthNear>0&&(W=m.depthNear),m.depthFar>0&&(ot=m.depthFar)),V.near=R.near=I.near=W,V.far=R.far=I.far=ot,(w!==V.near||z!==V.far)&&(s.updateRenderState({depthNear:V.near,depthFar:V.far}),w=V.near,z=V.far),V.layers.mask=J.layers.mask|6,I.layers.mask=V.layers.mask&-5,R.layers.mask=V.layers.mask&-3;let mt=J.parent,pt=V.cameras;Z(V,mt);for(let Ot=0;Ot<pt.length;Ot++)Z(pt[Ot],mt);pt.length===2?nt(V,I,R):V.projectionMatrix.copy(I.projectionMatrix),D===null&&J.isPerspectiveCamera&&(D={camera:J,fov:J.fov,zoom:J.zoom}),rt(J,V,mt)};function rt(J,W,ot){ot===null?J.matrix.copy(W.matrixWorld):(J.matrix.copy(ot.matrixWorld),J.matrix.invert(),J.matrix.multiply(W.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(W.projectionMatrix),J.projectionMatrixInverse.copy(W.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Ki*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(V)},this.getCameraTexture=function(J){return p[J]};let yt=null;function Dt(J,W){if(h=W.getViewerPose(c||a),g=W,h!==null){let ot=h.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let mt=!1;ot.length!==V.cameras.length&&(V.cameras.length=0,mt=!0);for(let $=0;$<ot.length;$++){let at=ot[$],ct=null;if(f!==null)ct=f.getViewport(at);else{let ft=d.getViewSubImage(u,at);ct=ft.viewport,$===0&&(t.setRenderTargetTextures(x,ft.colorTexture,ft.depthStencilTexture),t.setRenderTarget(x))}let lt=P[$];lt===void 0&&(lt=new Re,lt.layers.enable($),lt.viewport=new me,P[$]=lt),lt.matrix.fromArray(at.transform.matrix),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.projectionMatrix.fromArray(at.projectionMatrix),lt.projectionMatrixInverse.copy(lt.projectionMatrix).invert(),lt.viewport.set(ct.x,ct.y,ct.width,ct.height),$===0&&(V.matrix.copy(lt.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),mt===!0&&V.cameras.push(lt)}let pt=s.enabledFeatures;if(pt&&pt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&A){d=n.getBinding();let $=d.getDepthInformation(ot[0]);$&&$.isValid&&$.texture&&m.init($,s.renderState)}if(pt&&pt.includes("camera-access")&&A){t.state.unbindTexture(),d=n.getBinding();for(let $=0;$<ot.length;$++){let at=ot[$].camera;if(at){let ct=p[at];ct||(ct=new Os,p[at]=ct);let lt=d.getCameraImage(at);ct.sourceTexture=lt}}}}for(let ot=0;ot<y.length;ot++){let mt=M[ot],pt=y[ot];mt!==null&&pt!==void 0&&pt.update(mt,W,c||a)}yt&&yt(J,W),W.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:W}),g=null}let Kt=new Au;Kt.setAnimationLoop(Dt),this.setAnimationLoop=function(J){yt=J},this.dispose=function(){}}},E_=new he,bu=new Jt;bu.set(-1,0,0,0,1,0,0,0,1);function C_(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Kl(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,B,v,x){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),A(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,B,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===He&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===He&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let B=t.get(p),v=B.envMap,x=B.envMapRotation;v&&(m.envMap.value=v,m.envMapRotation.value.setFromMatrix4(E_.makeRotationFromEuler(x)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(bu),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,B,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*B,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,B){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===He&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=B.texture,m.transmissionSamplerSize.value.set(B.width,B.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function A(m,p){let B=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(B.matrixWorld),m.nearDistance.value=B.shadow.camera.near,m.farDistance.value=B.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function x_(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,y){let M=y.program;n.uniformBlockBinding(x,M)}function c(x,y){let M=s[x.id];M===void 0&&(m(x),M=h(x),s[x.id]=M,x.addEventListener("dispose",B));let b=y.program;n.updateUBOMapping(x,b);let E=t.render.frame;r[x.id]!==E&&(u(x),r[x.id]=E)}function h(x){let y=d();x.__bindingPointIndex=y;let M=i.createBuffer(),b=x.__size,E=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,b,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,M),M}function d(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Vt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){let y=s[x.id],M=x.uniforms,b=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let E=0,D=M.length;E<D;E++){let I=M[E];if(Array.isArray(I))for(let R=0,P=I.length;R<P;R++)f(I[R],E,R,b);else f(I,E,0,b)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(x,y,M,b){if(A(x,y,M,b)===!0){let E=x.__offset,D=x.value;if(Array.isArray(D)){let I=0;for(let R=0;R<D.length;R++){let P=D[R],V=p(P);g(P,x.__data,I),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(I+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(D,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,E,x.__data)}}function g(x,y,M){typeof x=="number"||typeof x=="boolean"?y[0]=x:x.isMatrix3?(y[0]=x.elements[0],y[1]=x.elements[1],y[2]=x.elements[2],y[3]=0,y[4]=x.elements[3],y[5]=x.elements[4],y[6]=x.elements[5],y[7]=0,y[8]=x.elements[6],y[9]=x.elements[7],y[10]=x.elements[8],y[11]=0):ArrayBuffer.isView(x)?y.set(new x.constructor(x.buffer,x.byteOffset,y.length)):x.toArray(y,M)}function A(x,y,M,b){let E=x.value,D=y+"_"+M;if(b[D]===void 0)return typeof E=="number"||typeof E=="boolean"?b[D]=E:ArrayBuffer.isView(E)?b[D]=E.slice():b[D]=E.clone(),!0;{let I=b[D];if(typeof E=="number"||typeof E=="boolean"){if(I!==E)return b[D]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(I.equals(E)===!1)return I.copy(E),!0}}return!1}function m(x){let y=x.uniforms,M=0,b=16;for(let D=0,I=y.length;D<I;D++){let R=Array.isArray(y[D])?y[D]:[y[D]];for(let P=0,V=R.length;P<V;P++){let w=R[P],z=Array.isArray(w.value)?w.value:[w.value];for(let H=0,U=z.length;H<U;H++){let it=z[H],X=p(it),j=M%b,nt=j%X.boundary,Z=j+nt;M+=nt,Z!==0&&b-Z<X.storage&&(M+=b-Z),w.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),w.__offset=M,M+=X.storage}}}let E=M%b;return E>0&&(M+=b-E),x.__size=M,x.__cache={},this}function p(x){let y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?zt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(y.boundary=16,y.storage=x.byteLength):zt("WebGLRenderer: Unsupported uniform value type.",x),y}function B(x){let y=x.target;y.removeEventListener("dispose",B);let M=a.indexOf(y.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function v(){for(let x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:l,update:c,dispose:v}}var B_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Mn=null;function A_(){return Mn===null&&(Mn=new Ps(B_,16,16,ai,dn),Mn.name="DFG_LUT",Mn.minFilter=Ie,Mn.magFilter=Ie,Mn.wrapS=_n,Mn.wrapT=_n,Mn.generateMipmaps=!1,Mn.needsUpdate=!0),Mn}var Bo=class{constructor(t={}){let{canvas:e=kh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Ve}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let A=f,m=new Set([Pa,La,Ga]),p=new Set([Ve,un,as,os,Fa,wa]),B=new Uint32Array(4),v=new Int32Array(4),x=new F,y=null,M=null,b=[],E=[],D=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,R=!1,P=null,V=null,w=null,z=null;this._outputColorSpace=We;let H=0,U=0,it=null,X=-1,j=null,nt=new me,Z=new me,rt=null,yt=new Xt(0),Dt=0,Kt=e.width,J=e.height,W=1,ot=null,mt=null,pt=new me(0,0,Kt,J),Ot=new me(0,0,Kt,J),$t=!1,$=new Qi,at=!1,ct=!1,lt=new he,ft=new F,Nt=new me,Lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ht=!1;function kt(){return it===null?W:1}let T=n;function ee(C,G){return e.getContext(C,G)}let Zt,S,_,N,O,Y,ht,dt,Q,tt,gt,Ft,xt,_t,Gt,Ut,Wt,L,Et,et,Ct,vt,st;try{let C={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",ue,!1),e.addEventListener("webglcontextrestored",se,!1),e.addEventListener("webglcontextcreationerror",sn,!1),T===null){let G="webgl2";if(T=ee(G,C),T===null)throw ee(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Pt()}catch(C){throw e.removeEventListener("webglcontextlost",ue,!1),e.removeEventListener("webglcontextrestored",se,!1),e.removeEventListener("webglcontextcreationerror",sn,!1),Vt("WebGLRenderer: "+C.message),C}function Pt(){Zt=new Ig(T),Zt.init(),Ct=new m_(T,Zt),S=new Cg(T,Zt,t,Ct),_=new f_(T,Zt),S.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),V=T.createFramebuffer(),w=T.createFramebuffer(),z=T.createFramebuffer(),N=new wg(T),O=new $0,Y=new p_(T,Zt,_,O,S,Ct,N),ht=new bg(I),dt=new Gf(T),vt=new _g(T,dt),Q=new Tg(T,dt,N,vt),tt=new Gg(T,Q,dt,vt,N),L=new Rg(T,S,Y),Gt=new xg(O),gt=new j0(I,ht,Zt,S,vt,Gt),Ft=new C_(I,O),xt=new e_,_t=new o_(Zt),Wt=new gg(I,ht,_,tt,g,l),Ut=new d_(I,tt,S),st=new x_(T,N,S,_),Et=new Eg(T,Zt,N),et=new Fg(T,Zt,N),N.programs=gt.programs,I.capabilities=S,I.extensions=Zt,I.properties=O,I.renderLists=xt,I.shadowMap=Ut,I.state=_,I.info=N}A!==Ve&&(D=new Pg(A,e.width,e.height,o,s,r));let wt=new fc(I,T);this.xr=wt,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){let C=Zt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){let C=Zt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(C){C!==void 0&&(W=C,this.setSize(Kt,J,!1))},this.getSize=function(C){return C.set(Kt,J)},this.setSize=function(C,G,q=!0){if(wt.isPresenting){zt("WebGLRenderer: Can't change size while VR device is presenting.");return}Kt=C,J=G,e.width=Math.floor(C*W),e.height=Math.floor(G*W),q===!0&&(e.style.width=C+"px",e.style.height=G+"px"),D!==null&&D.setSize(e.width,e.height),this.setViewport(0,0,C,G)},this.getDrawingBufferSize=function(C){return C.set(Kt*W,J*W).floor()},this.setDrawingBufferSize=function(C,G,q){Kt=C,J=G,W=q,e.width=Math.floor(C*q),e.height=Math.floor(G*q),this.setViewport(0,0,C,G)},this.setEffects=function(C){if(A===Ve){Vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let G=0;G<C.length;G++)if(C[G].isOutputPass===!0){zt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}D.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(nt)},this.getViewport=function(C){return C.copy(pt)},this.setViewport=function(C,G,q,k){C.isVector4?pt.set(C.x,C.y,C.z,C.w):pt.set(C,G,q,k),_.viewport(nt.copy(pt).multiplyScalar(W).round())},this.getScissor=function(C){return C.copy(Ot)},this.setScissor=function(C,G,q,k){C.isVector4?Ot.set(C.x,C.y,C.z,C.w):Ot.set(C,G,q,k),_.scissor(Z.copy(Ot).multiplyScalar(W).round())},this.getScissorTest=function(){return $t},this.setScissorTest=function(C){_.setScissorTest($t=C)},this.setOpaqueSort=function(C){ot=C},this.setTransparentSort=function(C){mt=C},this.getClearColor=function(C){return C.copy(Wt.getClearColor())},this.setClearColor=function(){Wt.setClearColor(...arguments)},this.getClearAlpha=function(){return Wt.getClearAlpha()},this.setClearAlpha=function(){Wt.setClearAlpha(...arguments)},this.clear=function(C=!0,G=!0,q=!0){let k=0;if(C){let K=!1;if(it!==null){let Mt=it.texture.format;K=m.has(Mt)}if(K){let Mt=it.texture.type,bt=p.has(Mt),At=Wt.getClearColor(),It=Wt.getClearAlpha(),Rt=At.r,qt=At.g,jt=At.b;bt?(B[0]=Rt,B[1]=qt,B[2]=jt,B[3]=It,T.clearBufferuiv(T.COLOR,0,B)):(v[0]=Rt,v[1]=qt,v[2]=jt,v[3]=It,T.clearBufferiv(T.COLOR,0,v))}else k|=T.COLOR_BUFFER_BIT}G&&(k|=T.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(k|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&T.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),P=C},this.dispose=function(){e.removeEventListener("webglcontextlost",ue,!1),e.removeEventListener("webglcontextrestored",se,!1),e.removeEventListener("webglcontextcreationerror",sn,!1),Wt.dispose(),xt.dispose(),_t.dispose(),O.dispose(),ht.dispose(),tt.dispose(),vt.dispose(),st.dispose(),gt.dispose(),wt.dispose(),wt.removeEventListener("sessionstart",yc),wt.removeEventListener("sessionend",vc),ci.stop()};function ue(C){C.preventDefault(),Ul("WebGLRenderer: Context Lost."),R=!0}function se(){Ul("WebGLRenderer: Context Restored."),R=!1;let C=N.autoReset,G=Ut.enabled,q=Ut.autoUpdate,k=Ut.needsUpdate,K=Ut.type;Pt(),N.autoReset=C,Ut.enabled=G,Ut.autoUpdate=q,Ut.needsUpdate=k,Ut.type=K}function sn(C){Vt("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function pn(C){let G=C.target;G.removeEventListener("dispose",pn),Zu(G)}function Zu(C){ju(C),O.remove(C)}function ju(C){let G=O.get(C).programs;G!==void 0&&(G.forEach(function(q){gt.releaseProgram(q)}),C.isShaderMaterial&&gt.releaseShaderCache(C))}this.renderBufferDirect=function(C,G,q,k,K,Mt){G===null&&(G=Lt);let bt=K.isMesh&&K.matrixWorld.determinantAffine()<0,At=ed(C,G,q,k,K);_.setMaterial(k,bt);let It=q.index,Rt=1;if(k.wireframe===!0){if(It=Q.getWireframeAttribute(q),It===void 0)return;Rt=2}let qt=q.drawRange,jt=q.attributes.position,Tt=qt.start*Rt,re=(qt.start+qt.count)*Rt;Mt!==null&&(Tt=Math.max(Tt,Mt.start*Rt),re=Math.min(re,(Mt.start+Mt.count)*Rt)),It!==null?(Tt=Math.max(Tt,0),re=Math.min(re,It.count)):jt!=null&&(Tt=Math.max(Tt,0),re=Math.min(re,jt.count));let xe=re-Tt;if(xe<0||xe===1/0)return;vt.setup(K,k,At,q,It);let fe,ce=Et;if(It!==null&&(fe=dt.get(It),ce=et,ce.setIndex(fe)),K.isMesh)k.wireframe===!0?(_.setLineWidth(k.wireframeLinewidth*kt()),ce.setMode(T.LINES)):ce.setMode(T.TRIANGLES);else if(K.isLine){let Te=k.linewidth;Te===void 0&&(Te=1),_.setLineWidth(Te*kt()),K.isLineSegments?ce.setMode(T.LINES):K.isLineLoop?ce.setMode(T.LINE_LOOP):ce.setMode(T.LINE_STRIP)}else K.isPoints?ce.setMode(T.POINTS):K.isSprite&&ce.setMode(T.TRIANGLES);if(K.isBatchedMesh)if(Zt.get("WEBGL_multi_draw"))ce.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{let Te=K._multiDrawStarts,St=K._multiDrawCounts,Le=K._multiDrawCount,ne=It?dt.get(It).bytesPerElement:1,$e=O.get(k).currentProgram.getUniforms();for(let mn=0;mn<Le;mn++)$e.setValue(T,"_gl_DrawID",mn),ce.render(Te[mn]/ne,St[mn])}else if(K.isInstancedMesh)ce.renderInstances(Tt,xe,K.count);else if(q.isInstancedBufferGeometry){let Te=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,St=Math.min(q.instanceCount,Te);ce.renderInstances(Tt,xe,St)}else ce.render(Tt,xe)};function Mc(C,G,q,k){P!==null&&C.isNodeMaterial&&P.setObject(k,C),at===!0&&Gt.setState(C,q,!1),C.transparent===!0&&C.side===Bn&&C.forceSinglePass===!1?(C.side=He,C.needsUpdate=!0,Er(C,G,k),C.side=ni,C.needsUpdate=!0,Er(C,G,k),C.side=Bn):Er(C,G,k)}this.compile=function(C,G,q=null){q===null&&(q=C),P!==null&&P.renderStart(C,G,q),M=_t.get(q),M.init(G),E.push(M),q.traverseVisible(function(K){K.isLight&&K.layers.test(G.layers)&&(M.pushLight(K),K.castShadow&&M.pushShadow(K))}),C!==q&&C.traverseVisible(function(K){K.isLight&&K.layers.test(G.layers)&&(M.pushLight(K),K.castShadow&&M.pushShadow(K))}),M.setupLights(),P!==null&&P.updateLights(M.state.lightsArray),ct=this.localClippingEnabled,at=Gt.init(this.clippingPlanes,ct),at===!0&&Gt.setGlobalState(this.clippingPlanes,G),P!==null&&Ut.render(M.state.shadowsArray,q,G);let k=new Set;return C.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;let Mt=K.material;if(Mt)if(Array.isArray(Mt))for(let bt=0;bt<Mt.length;bt++){let At=Mt[bt];Mc(At,q,G,K),k.add(At)}else Mc(Mt,q,G,K),k.add(Mt)}),M=E.pop(),P!==null&&P.renderEnd(),k},this.compileAsync=function(C,G,q=null){let k=this.compile(C,G,q);return new Promise(K=>{function Mt(){if(k.forEach(function(bt){let It=O.get(bt).currentProgram;(It===void 0||It.isReady())&&k.delete(bt)}),k.size===0){K(C);return}setTimeout(Mt,10)}Zt.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let Po=null;function $u(C){Po&&Po(C)}function yc(){ci.stop()}function vc(){ci.start()}let ci=new Au;ci.setAnimationLoop($u),typeof self!="undefined"&&ci.setContext(self),this.setAnimationLoop=function(C){Po=C,wt.setAnimationLoop(C),C===null?ci.stop():ci.start()},wt.addEventListener("sessionstart",yc),wt.addEventListener("sessionend",vc),this.render=function(C,G){if(G!==void 0&&G.isCamera!==!0){Vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;P!==null&&P.renderStart(C,G);let q=wt.enabled===!0&&wt.isPresenting===!0,k=D!==null&&(it===null||q)&&D.begin(I,it);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),wt.enabled===!0&&wt.isPresenting===!0&&(D===null||D.isCompositing()===!1)&&(wt.cameraAutoUpdate===!0&&wt.updateCamera(G),G=wt.getCamera()),C.isScene===!0&&C.onBeforeRender(I,C,G,it),M=_t.get(C,E.length),M.init(G),M.state.textureUnits=Y.getTextureUnits(),E.push(M),lt.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),$.setFromProjectionMatrix(lt,ln,G.reversedDepth),ct=this.localClippingEnabled,at=Gt.init(this.clippingPlanes,ct),y=xt.get(C,b.length),y.init(),b.push(y),wt.enabled===!0&&wt.isPresenting===!0){let bt=I.xr.getDepthSensingMesh();bt!==null&&No(bt,G,-1/0,I.sortObjects)}No(C,G,0,I.sortObjects),y.finish(),P!==null&&P.updateLights(M.state.lightsArray),I.sortObjects===!0&&y.sort(ot,mt),Ht=wt.enabled===!1||wt.isPresenting===!1||wt.hasDepthSensing()===!1,Ht&&Wt.addToRenderList(y,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),at===!0&&Gt.beginShadows();let K=M.state.shadowsArray;if(Ut.render(K,C,G),at===!0&&Gt.endShadows(),(k&&D.hasRenderPass())===!1){let bt=y.opaque,At=y.transmissive;if(M.setupLights(),G.isArrayCamera){let It=G.cameras;if(At.length>0)for(let Rt=0,qt=It.length;Rt<qt;Rt++){let jt=It[Rt];Dc(bt,At,C,jt)}Ht&&Wt.render(C);for(let Rt=0,qt=It.length;Rt<qt;Rt++){let jt=It[Rt];Sc(y,C,jt,jt.viewport)}}else At.length>0&&Dc(bt,At,C,G),Ht&&Wt.render(C),Sc(y,C,G)}it!==null&&U===0&&(Y.updateMultisampleRenderTarget(it),Y.updateRenderTargetMipmap(it)),k&&D.end(I),C.isScene===!0&&C.onAfterRender(I,C,G),vt.resetDefaultState(),X=-1,j=null,E.pop(),E.length>0?(M=E[E.length-1],Y.setTextureUnits(M.state.textureUnits),at===!0&&Gt.setGlobalState(I.clippingPlanes,M.state.camera)):M=null,b.pop(),b.length>0?y=b[b.length-1]:y=null,P!==null&&P.renderEnd()};function No(C,G,q,k){if(C.visible===!1)return;if(C.layers.test(G.layers)){if(C.isGroup)q=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(G);else if(C.isLightProbeGrid)M.pushLightProbeGrid(C);else if(C.isLight)M.pushLight(C),C.castShadow&&M.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||C.intersectsFrustum($)){k&&Nt.setFromMatrixPosition(C.matrixWorld).applyMatrix4(lt);let bt=tt.update(C),At=C.material;At.visible&&y.push(C,bt,At,q,Nt.z,null,G)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||C.intersectsFrustum($))){let bt=tt.update(C),At=C.material;if(k&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Nt.copy(C.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),Nt.copy(bt.boundingSphere.center)),Nt.applyMatrix4(C.matrixWorld).applyMatrix4(lt)),Array.isArray(At)){let It=bt.groups;for(let Rt=0,qt=It.length;Rt<qt;Rt++){let jt=It[Rt],Tt=At[jt.materialIndex];Tt&&Tt.visible&&y.push(C,bt,Tt,q,Nt.z,jt,G)}}else At.visible&&y.push(C,bt,At,q,Nt.z,null,G)}}let Mt=C.children;for(let bt=0,At=Mt.length;bt<At;bt++)No(Mt[bt],G,q,k)}function Sc(C,G,q,k){let{opaque:K,transmissive:Mt,transparent:bt}=C;M.setupLightsView(q),at===!0&&Gt.setGlobalState(I.clippingPlanes,q),k&&_.viewport(nt.copy(k)),K.length>0&&_r(K,G,q),Mt.length>0&&_r(Mt,G,q),bt.length>0&&_r(bt,G,q),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Dc(C,G,q,k){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[k.id]===void 0){let Tt=Zt.has("EXT_color_buffer_half_float")||Zt.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[k.id]=new ze(1,1,{generateMipmaps:!0,type:Tt?dn:Ve,minFilter:si,samples:Math.max(4,S.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:te.workingColorSpace})}let Mt=M.state.transmissionRenderTarget[k.id],bt=k.viewport||nt;Mt.setSize(bt.z*I.transmissionResolutionScale,bt.w*I.transmissionResolutionScale);let At=I.getRenderTarget(),It=I.getActiveCubeFace(),Rt=I.getActiveMipmapLevel();I.setRenderTarget(Mt),I.getClearColor(yt),Dt=I.getClearAlpha(),Dt<1&&I.setClearColor(16777215,.5),I.clear(),Ht&&Wt.render(q);let qt=I.toneMapping;I.toneMapping=hn;let jt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),M.setupLightsView(k),at===!0&&Gt.setGlobalState(I.clippingPlanes,k),_r(C,q,k),Y.updateMultisampleRenderTarget(Mt),Y.updateRenderTargetMipmap(Mt),Zt.has("WEBGL_multisampled_render_to_texture")===!1){let Tt=!1;for(let re=0,xe=G.length;re<xe;re++){let fe=G[re],{object:ce,geometry:Te,material:St,group:Le}=fe;if(St.side===Bn&&ce.layers.test(k.layers)){let ne=St.side;St.side=He,St.needsUpdate=!0,bc(ce,q,k,Te,St,Le),St.side=ne,St.needsUpdate=!0,Tt=!0}}Tt===!0&&(Y.updateMultisampleRenderTarget(Mt),Y.updateRenderTargetMipmap(Mt))}I.setRenderTarget(At,It,Rt),I.setClearColor(yt,Dt),jt!==void 0&&(k.viewport=jt),I.toneMapping=qt}function _r(C,G,q){let k=G.isScene===!0?G.overrideMaterial:null;for(let K=0,Mt=C.length;K<Mt;K++){let bt=C[K],{object:At,geometry:It,group:Rt}=bt,qt=bt.material;qt.allowOverride===!0&&k!==null&&(qt=k),At.layers.test(q.layers)&&bc(At,G,q,It,qt,Rt)}}function bc(C,G,q,k,K,Mt){P!==null&&K.isNodeMaterial&&P.setObject(C,K),C.onBeforeRender(I,G,q,k,K,Mt),C.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),K.onBeforeRender(I,G,q,k,C,Mt),K.transparent===!0&&K.side===Bn&&K.forceSinglePass===!1?(K.side=He,K.needsUpdate=!0,I.renderBufferDirect(q,G,k,K,C,Mt),K.side=ni,K.needsUpdate=!0,I.renderBufferDirect(q,G,k,K,C,Mt),K.side=Bn):I.renderBufferDirect(q,G,k,K,C,Mt),C.onAfterRender(I,G,q,k,K,Mt)}function Er(C,G,q){G.isScene!==!0&&(G=Lt);let k=O.get(C),K=M.state.lights,Mt=M.state.shadowsArray,bt=K.state.version,At=gt.getParameters(C,K.state,Mt,G,q,M.state.lightProbeGridArray),It=gt.getProgramCacheKey(At),Rt=k.programs;k.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?G.environment:null,k.fog=G.fog;let qt=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;k.envMap=ht.get(C.envMap||k.environment,qt),k.envMapRotation=k.environment!==null&&C.envMap===null?G.environmentRotation:C.envMapRotation,Rt===void 0&&(C.addEventListener("dispose",pn),Rt=new Map,k.programs=Rt);let jt=Rt.get(It);if(jt!==void 0){if(k.currentProgram===jt&&k.lightsStateVersion===bt)return Tc(C,At),jt}else At.uniforms=gt.getUniforms(C),P!==null&&C.isNodeMaterial&&P.build(C,q,At),C.onBeforeCompile(At,I),jt=gt.acquireProgram(At,It),Rt.set(It,jt),k.uniforms=At.uniforms;let Tt=k.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Tt.clippingPlanes=Gt.uniform),Tc(C,At),k.needsLights=id(C),k.lightsStateVersion=bt,k.needsLights&&(Tt.ambientLightColor.value=K.state.ambient,Tt.lightProbe.value=K.state.probe,Tt.sunLights.value=K.state.sun,Tt.sunLightShadows.value=K.state.sunShadow,Tt.directionalLights.value=K.state.directional,Tt.directionalLightShadows.value=K.state.directionalShadow,Tt.spotLights.value=K.state.spot,Tt.spotLightShadows.value=K.state.spotShadow,Tt.rectAreaLights.value=K.state.rectArea,Tt.ltc_1.value=K.state.rectAreaLTC1,Tt.ltc_2.value=K.state.rectAreaLTC2,Tt.pointLights.value=K.state.point,Tt.pointLightShadows.value=K.state.pointShadow,Tt.hemisphereLights.value=K.state.hemi,Tt.sunShadowMatrix.value=K.state.sunShadowMatrix,Tt.sunShadowCascade.value=K.state.sunShadowCascade,Tt.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Tt.spotLightMatrix.value=K.state.spotLightMatrix,Tt.spotLightMap.value=K.state.spotLightMap,Tt.pointShadowMatrix.value=K.state.pointShadowMatrix),k.lightProbeGrid=M.state.lightProbeGridArray.length>0,k.currentProgram=jt,k.uniformsList=null,jt}function Ic(C){if(C.uniformsList===null){let G=C.currentProgram.getUniforms();C.uniformsList=hs.seqWithValue(G.seq,C.uniforms)}return C.uniformsList}function Tc(C,G){let q=O.get(C);q.outputColorSpace=G.outputColorSpace,q.batching=G.batching,q.batchingColor=G.batchingColor,q.instancing=G.instancing,q.instancingColor=G.instancingColor,q.instancingMorph=G.instancingMorph,q.skinning=G.skinning,q.morphTargets=G.morphTargets,q.morphNormals=G.morphNormals,q.morphColors=G.morphColors,q.morphTargetsCount=G.morphTargetsCount,q.numClippingPlanes=G.numClippingPlanes,q.numIntersection=G.numClipIntersection,q.vertexAlphas=G.vertexAlphas,q.vertexTangents=G.vertexTangents,q.toneMapping=G.toneMapping}function td(C,G){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;x.setFromMatrixPosition(G.matrixWorld);for(let q=0,k=C.length;q<k;q++){let K=C[q];if(K.texture!==null&&K.boundingBox.containsPoint(x))return K}return null}function ed(C,G,q,k,K){G.isScene!==!0&&(G=Lt),Y.resetTextureUnits();let Mt=G.fog,bt=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?G.environment:null,At=it===null?I.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:te.workingColorSpace,It=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Rt=ht.get(k.envMap||bt,It),qt=k.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,jt=!!q.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Tt=!!q.morphAttributes.position,re=!!q.morphAttributes.normal,xe=!!q.morphAttributes.color,fe=hn;k.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(fe=I.toneMapping);let ce=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Te=ce!==void 0?ce.length:0,St=O.get(k),Le=M.state.lights;if(at===!0&&(ct===!0||C!==j)){let de=C===j&&k.id===X;Gt.setState(k,C,de)}let ne=!1;k.version===St.__version?(St.needsLights&&St.lightsStateVersion!==Le.state.version||St.outputColorSpace!==At||K.isBatchedMesh&&St.batching===!1||!K.isBatchedMesh&&St.batching===!0||K.isBatchedMesh&&St.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&St.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&St.instancing===!1||!K.isInstancedMesh&&St.instancing===!0||K.isSkinnedMesh&&St.skinning===!1||!K.isSkinnedMesh&&St.skinning===!0||K.isInstancedMesh&&St.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&St.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&St.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&St.instancingMorph===!1&&K.morphTexture!==null||St.envMap!==Rt||k.fog===!0&&St.fog!==Mt||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==Gt.numPlanes||St.numIntersection!==Gt.numIntersection)||St.vertexAlphas!==qt||St.vertexTangents!==jt||St.morphTargets!==Tt||St.morphNormals!==re||St.morphColors!==xe||St.toneMapping!==fe||St.morphTargetsCount!==Te||!!St.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(ne=!0):(ne=!0,St.__version=k.version);let $e=St.currentProgram;ne===!0&&($e=Er(k,G,K),P&&k.isNodeMaterial&&P.onUpdateProgram(k,$e,St));let mn=!1,Nn=!1,Mi=!1,le=$e.getUniforms(),Ee=St.uniforms;if(_.useProgram($e.program)&&(mn=!0,Nn=!0,Mi=!0),k.id!==X&&(X=k.id,Nn=!0),St.needsLights){let de=td(M.state.lightProbeGridArray,K);St.lightProbeGrid!==de&&(St.lightProbeGrid=de,Nn=!0)}if(mn||j!==C){_.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),le.setValue(T,"projectionMatrix",C.projectionMatrix),le.setValue(T,"viewMatrix",C.matrixWorldInverse);let Hn=le.map.cameraPosition;Hn!==void 0&&Hn.setValue(T,ft.setFromMatrixPosition(C.matrixWorld)),S.logarithmicDepthBuffer&&le.setValue(T,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&le.setValue(T,"isOrthographic",C.isOrthographicCamera===!0),j!==C&&(j=C,Nn=!0,Mi=!0)}if(St.needsLights&&(Le.state.sunShadowMap.length>0&&le.setValue(T,"sunShadowMap",Le.state.sunShadowMap,Y),Le.state.directionalShadowMap.length>0&&le.setValue(T,"directionalShadowMap",Le.state.directionalShadowMap,Y),Le.state.spotShadowMap.length>0&&le.setValue(T,"spotShadowMap",Le.state.spotShadowMap,Y),Le.state.pointShadowMap.length>0&&le.setValue(T,"pointShadowMap",Le.state.pointShadowMap,Y)),K.isSkinnedMesh){le.setOptional(T,K,"bindMatrix"),le.setOptional(T,K,"bindMatrixInverse");let de=K.skeleton;de&&(de.boneTexture===null&&de.computeBoneTexture(),le.setValue(T,"boneTexture",de.boneTexture,Y))}K.isBatchedMesh&&(le.setOptional(T,K,"batchingTexture"),le.setValue(T,"batchingTexture",K._matricesTexture,Y),le.setOptional(T,K,"batchingIdTexture"),le.setValue(T,"batchingIdTexture",K._indirectTexture,Y),le.setOptional(T,K,"batchingColorTexture"),K._colorsTexture!==null&&le.setValue(T,"batchingColorTexture",K._colorsTexture,Y));let On=q.morphAttributes;if((On.position!==void 0||On.normal!==void 0||On.color!==void 0)&&L.update(K,q,$e),(Nn||St.receiveShadow!==K.receiveShadow)&&(St.receiveShadow=K.receiveShadow,le.setValue(T,"receiveShadow",K.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&G.environment!==null&&(Ee.envMapIntensity.value=G.environmentIntensity),Ee.dfgLUT!==void 0&&(Ee.dfgLUT.value=A_()),Nn){if(le.setValue(T,"toneMappingExposure",I.toneMappingExposure),St.needsLights&&nd(Ee,Mi),Mt&&k.fog===!0&&Ft.refreshFogUniforms(Ee,Mt),Ft.refreshMaterialUniforms(Ee,k,W,J,M.state.transmissionRenderTarget[C.id]),St.needsLights&&St.lightProbeGrid){let de=St.lightProbeGrid;Ee.probesSH.value=de.texture,Ee.probesMin.value.copy(de.boundingBox.min),Ee.probesMax.value.copy(de.boundingBox.max),Ee.probesResolution.value.copy(de.resolution)}hs.upload(T,Ic(St),Ee,Y)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(hs.upload(T,Ic(St),Ee,Y),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&le.setValue(T,"center",K.center),le.setValue(T,"modelViewMatrix",K.modelViewMatrix),le.setValue(T,"normalMatrix",K.normalMatrix),le.setValue(T,"modelMatrix",K.matrixWorld),k.uniformsGroups!==void 0){let de=k.uniformsGroups;for(let Hn=0,yi=de.length;Hn<yi;Hn++){let wc=de[Hn];st.update(wc,$e),st.bind(wc,$e)}}return $e}function nd(C,G){C.ambientLightColor.needsUpdate=G,C.lightProbe.needsUpdate=G,C.sunLights.needsUpdate=G,C.sunLightShadows.needsUpdate=G,C.directionalLights.needsUpdate=G,C.directionalLightShadows.needsUpdate=G,C.pointLights.needsUpdate=G,C.pointLightShadows.needsUpdate=G,C.spotLights.needsUpdate=G,C.spotLightShadows.needsUpdate=G,C.rectAreaLights.needsUpdate=G,C.hemisphereLights.needsUpdate=G}function id(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return it},this.setRenderTargetTextures=function(C,G,q){let k=O.get(C);k.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),O.get(C.texture).__webglTexture=G,O.get(C.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:q,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,G){let q=O.get(C);q.__webglFramebuffer=G,q.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(C,G=0,q=0){it=C,H=G,U=q;let k=null,K=!1,Mt=!1;if(C){let At=O.get(C);if(At.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(T.FRAMEBUFFER,At.__webglFramebuffer),nt.copy(C.viewport),Z.copy(C.scissor),rt=C.scissorTest,_.viewport(nt),_.scissor(Z),_.setScissorTest(rt),X=-1;return}else if(At.__webglFramebuffer===void 0)Y.setupRenderTarget(C);else if(At.__hasExternalTextures)Y.rebindTextures(C,O.get(C.texture).__webglTexture,O.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){let qt=C.depthTexture;if(At.__boundDepthTexture!==qt){if(qt!==null&&O.has(qt)&&(C.width!==qt.image.width||C.height!==qt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(C)}}let It=C.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(Mt=!0);let Rt=O.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Rt[G])?k=Rt[G][q]:k=Rt[G],K=!0):C.samples>0&&Y.useMultisampledRTT(C)===!1?k=O.get(C).__webglMultisampledFramebuffer:Array.isArray(Rt)?k=Rt[q]:k=Rt,nt.copy(C.viewport),Z.copy(C.scissor),rt=C.scissorTest}else nt.copy(pt).multiplyScalar(W).floor(),Z.copy(Ot).multiplyScalar(W).floor(),rt=$t;if(q!==0&&(k=V),_.bindFramebuffer(T.FRAMEBUFFER,k)&&_.drawBuffers(C,k),_.viewport(nt),_.scissor(Z),_.setScissorTest(rt),K){let At=O.get(C.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+G,At.__webglTexture,q)}else if(Mt){let At=G;for(let It=0;It<C.textures.length;It++){let Rt=O.get(C.textures[It]);T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0+It,Rt.__webglTexture,q,At)}}else if(C!==null&&q!==0){let At=O.get(C.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,At.__webglTexture,q)}X=-1};function Fc(C){let G=O.get(C);return(G.__readFormat!==C.format||G.__readType!==C.type)&&(G.__readFormat=C.format,G.__readType=C.type,G.__formatReadable=S.textureFormatReadable(C.format),G.__typeReadable=S.textureTypeReadable(C.type)),G}this.readRenderTargetPixels=function(C,G,q,k,K,Mt,bt,At=0){if(!(C&&C.isWebGLRenderTarget)){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let It=O.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&bt!==void 0&&(It=It[bt]),It){_.bindFramebuffer(T.FRAMEBUFFER,It);try{let Rt=C.textures[At],qt=Rt.format,jt=Rt.type;C.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+At);let Tt=Fc(Rt);if(Tt.__formatReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Tt.__typeReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=C.width-k&&q>=0&&q<=C.height-K&&T.readPixels(G,q,k,K,Ct.convert(qt),Ct.convert(jt),Mt)}finally{let Rt=it!==null?O.get(it).__webglFramebuffer:null;_.bindFramebuffer(T.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(C,G,q,k,K,Mt,bt,At=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let It=O.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&bt!==void 0&&(It=It[bt]),It)if(G>=0&&G<=C.width-k&&q>=0&&q<=C.height-K){_.bindFramebuffer(T.FRAMEBUFFER,It);let Rt=C.textures[At],qt=Rt.format,jt=Rt.type;C.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+At);let Tt=Fc(Rt);if(Tt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Tt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let re=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,re),T.bufferData(T.PIXEL_PACK_BUFFER,Mt.byteLength,T.STREAM_READ),T.readPixels(G,q,k,K,Ct.convert(qt),Ct.convert(jt),0),T.bindBuffer(T.PIXEL_PACK_BUFFER,null);let xe=it!==null?O.get(it).__webglFramebuffer:null;_.bindFramebuffer(T.FRAMEBUFFER,xe);let fe=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await Jh(T,fe,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,re),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,Mt),T.bindBuffer(T.PIXEL_PACK_BUFFER,null),T.deleteBuffer(re),T.deleteSync(fe),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,G=null,q=0){let k=Math.pow(2,-q),K=Math.floor(C.image.width*k),Mt=Math.floor(C.image.height*k),bt=G!==null?G.x:0,At=G!==null?G.y:0;Y.setTexture2D(C,0),T.copyTexSubImage2D(T.TEXTURE_2D,q,0,0,bt,At,K,Mt),_.unbindTexture()},this.copyTextureToTexture=function(C,G,q=null,k=null,K=0,Mt=0){let bt,At,It,Rt,qt,jt,Tt,re,xe,fe=C.isCompressedTexture?C.mipmaps[Mt]:C.image;if(q!==null)bt=q.max.x-q.min.x,At=q.max.y-q.min.y,It=q.isBox3?q.max.z-q.min.z:1,Rt=q.min.x,qt=q.min.y,jt=q.isBox3?q.min.z:0;else{let Ee=Math.pow(2,-K);bt=Math.floor(fe.width*Ee),At=Math.floor(fe.height*Ee),C.isDataArrayTexture?It=fe.depth:C.isData3DTexture?It=Math.floor(fe.depth*Ee):It=1,Rt=0,qt=0,jt=0}k!==null?(Tt=k.x,re=k.y,xe=k.z):(Tt=0,re=0,xe=0);let ce=Ct.convert(G.format),Te=Ct.convert(G.type),St;G.isData3DTexture?(Y.setTexture3D(G,0),St=T.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(Y.setTexture2DArray(G,0),St=T.TEXTURE_2D_ARRAY):(Y.setTexture2D(G,0),St=T.TEXTURE_2D),_.activeTexture(T.TEXTURE0),_.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,G.flipY),_.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),_.pixelStorei(T.UNPACK_ALIGNMENT,G.unpackAlignment);let Le=_.getParameter(T.UNPACK_ROW_LENGTH),ne=_.getParameter(T.UNPACK_IMAGE_HEIGHT),$e=_.getParameter(T.UNPACK_SKIP_PIXELS),mn=_.getParameter(T.UNPACK_SKIP_ROWS),Nn=_.getParameter(T.UNPACK_SKIP_IMAGES);_.pixelStorei(T.UNPACK_ROW_LENGTH,fe.width),_.pixelStorei(T.UNPACK_IMAGE_HEIGHT,fe.height),_.pixelStorei(T.UNPACK_SKIP_PIXELS,Rt),_.pixelStorei(T.UNPACK_SKIP_ROWS,qt),_.pixelStorei(T.UNPACK_SKIP_IMAGES,jt);let Mi=C.isDataArrayTexture||C.isData3DTexture,le=G.isDataArrayTexture||G.isData3DTexture;if(C.isDepthTexture){let Ee=O.get(C),On=O.get(G),de=O.get(Ee.__renderTarget),Hn=O.get(On.__renderTarget);_.bindFramebuffer(T.READ_FRAMEBUFFER,de.__webglFramebuffer),_.bindFramebuffer(T.DRAW_FRAMEBUFFER,Hn.__webglFramebuffer);for(let yi=0;yi<It;yi++)Mi&&(T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,O.get(C).__webglTexture,K,jt+yi),T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,O.get(G).__webglTexture,Mt,xe+yi)),T.blitFramebuffer(Rt,qt,bt,At,Tt,re,bt,At,T.DEPTH_BUFFER_BIT,T.NEAREST);_.bindFramebuffer(T.READ_FRAMEBUFFER,null),_.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else if(K!==0||C.isRenderTargetTexture||O.has(C)){let Ee=O.get(C),On=O.get(G);_.bindFramebuffer(T.READ_FRAMEBUFFER,w),_.bindFramebuffer(T.DRAW_FRAMEBUFFER,z);for(let de=0;de<It;de++)Mi?T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Ee.__webglTexture,K,jt+de):T.framebufferTexture2D(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Ee.__webglTexture,K),le?T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,On.__webglTexture,Mt,xe+de):T.framebufferTexture2D(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,On.__webglTexture,Mt),K!==0?T.blitFramebuffer(Rt,qt,bt,At,Tt,re,bt,At,T.COLOR_BUFFER_BIT,T.NEAREST):le?T.copyTexSubImage3D(St,Mt,Tt,re,xe+de,Rt,qt,bt,At):T.copyTexSubImage2D(St,Mt,Tt,re,Rt,qt,bt,At);_.bindFramebuffer(T.READ_FRAMEBUFFER,null),_.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else le?C.isDataTexture||C.isData3DTexture?T.texSubImage3D(St,Mt,Tt,re,xe,bt,At,It,ce,Te,fe.data):G.isCompressedArrayTexture?T.compressedTexSubImage3D(St,Mt,Tt,re,xe,bt,At,It,ce,fe.data):T.texSubImage3D(St,Mt,Tt,re,xe,bt,At,It,ce,Te,fe):C.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,Mt,Tt,re,bt,At,ce,Te,fe.data):C.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,Mt,Tt,re,fe.width,fe.height,ce,fe.data):T.texSubImage2D(T.TEXTURE_2D,Mt,Tt,re,bt,At,ce,Te,fe);_.pixelStorei(T.UNPACK_ROW_LENGTH,Le),_.pixelStorei(T.UNPACK_IMAGE_HEIGHT,ne),_.pixelStorei(T.UNPACK_SKIP_PIXELS,$e),_.pixelStorei(T.UNPACK_SKIP_ROWS,mn),_.pixelStorei(T.UNPACK_SKIP_IMAGES,Nn),Mt===0&&G.generateMipmaps&&T.generateMipmap(St),_.unbindTexture()},this.initRenderTarget=function(C){O.get(C).__webglFramebuffer===void 0&&Y.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?Y.setTextureCube(C,0):C.isData3DTexture?Y.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?Y.setTexture2DArray(C,0):Y.setTexture2D(C,0),_.unbindTexture()},this.resetState=function(){H=0,U=0,it=null,_.reset(),vt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=te._getDrawingBufferColorSpace(t),e.unpackColorSpace=te._getUnpackColorSpace()}};var Iu={type:"change"},mc={type:"start"},Fu={type:"end"},yo=new Xi,Tu=new Xe,M_=Math.cos(70*Vl.DEG2RAD),ye=new F,ke=2*Math.PI,oe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},pc=1e-6,vo=class extends tr{constructor(t,e=null){super(t,e),this.state=oe.NONE,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ti.ROTATE,MIDDLE:ti.DOLLY,RIGHT:ti.PAN},this.touches={ONE:ei.ROTATE,TWO:ei.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new qe,this._lastTargetPosition=new F,this._quat=new qe().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new is,this._sphericalDelta=new is,this._scale=1,this._panOffset=new F,this._rotateStart=new ut,this._rotateEnd=new ut,this._rotateDelta=new ut,this._panStart=new ut,this._panEnd=new ut,this._panDelta=new ut,this._dollyStart=new ut,this._dollyEnd=new ut,this._dollyDelta=new ut,this._dollyDirection=new F,this._mouse=new ut,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=v_.bind(this),this._onPointerDown=y_.bind(this),this._onPointerUp=S_.bind(this),this._onContextMenu=R_.bind(this),this._onMouseWheel=I_.bind(this),this._onKeyDown=T_.bind(this),this._onTouchStart=F_.bind(this),this._onTouchMove=w_.bind(this),this._onMouseDown=D_.bind(this),this._onMouseMove=b_.bind(this),this._interceptControlDown=G_.bind(this),this._interceptControlUp=L_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=oe.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Iu),this.update(),this.state=oe.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;ye.copy(e).sub(this.target),ye.applyQuaternion(this._quat),this._spherical.setFromVector3(ye),this.autoRotate&&this.state===oe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=ke:n>Math.PI&&(n-=ke),s<-Math.PI?s+=ke:s>Math.PI&&(s-=ke),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(ye.setFromSpherical(this._spherical),ye.applyQuaternion(this._quatInverse),e.copy(this.target).add(ye),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=ye.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new F(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new F(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=ye.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(yo.origin.copy(this.object.position),yo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(yo.direction))<M_?this.object.lookAt(this.target):(Tu.setFromNormalAndCoplanarPoint(this.object.up,this.target),yo.intersectPlane(Tu,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>pc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>pc||this._lastTargetPosition.distanceToSquared(this.target)>pc?(this.dispatchEvent(Iu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ke/60*this.autoRotateSpeed*t:ke/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ye.setFromMatrixColumn(e,0),ye.multiplyScalar(-t),this._panOffset.add(ye)}_panUp(t,e){this.screenSpacePanning===!0?ye.setFromMatrixColumn(e,1):(ye.setFromMatrixColumn(e,0),ye.crossVectors(this.object.up,ye)),ye.multiplyScalar(t),this._panOffset.add(ye)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;ye.copy(s).sub(this.target);let r=ye.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ut,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function y_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function v_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function S_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Fu),this.state=oe.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function D_(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ti.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=oe.DOLLY;break;case ti.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=oe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=oe.ROTATE}break;case ti.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=oe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=oe.PAN}break;default:this.state=oe.NONE}this.state!==oe.NONE&&this.dispatchEvent(mc)}function b_(i){switch(this.state){case oe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case oe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case oe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function I_(i){this.enabled===!1||this.enableZoom===!1||this.state!==oe.NONE||(i.preventDefault(),this.dispatchEvent(mc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Fu))}function T_(i){this.enabled!==!1&&this._handleKeyDown(i)}function F_(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ei.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=oe.TOUCH_ROTATE;break;case ei.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=oe.TOUCH_PAN;break;default:this.state=oe.NONE}break;case 2:switch(this.touches.TWO){case ei.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=oe.TOUCH_DOLLY_PAN;break;case ei.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=oe.TOUCH_DOLLY_ROTATE;break;default:this.state=oe.NONE}break;default:this.state=oe.NONE}this.state!==oe.NONE&&this.dispatchEvent(mc)}function w_(i){switch(this._trackPointer(i),this.state){case oe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case oe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case oe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case oe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=oe.NONE}}function R_(i){this.enabled!==!1&&i.preventDefault()}function G_(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function L_(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function gc(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Oe,c=0;for(let h=0;h<i.length;++h){let d=i[h],u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0,d=[];for(let u=0;u<i.length;++u){let f=i[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(let h in r){let d=wu(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(let h in a){let d=a[h][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){let f=[];for(let A=0;A<a[h].length;++A)f.push(a[h][A][u]);let g=wu(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}}return l}function wu(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let a=new t(r),o=new Ne(a,e,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let d=l/e;for(let u=0,f=h.count;u<f;u++)for(let g=0;g<e;g++){let A=h.getComponent(u,g);o.setComponent(u+d,g,A)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}function Ru(i,t,e){let n=new F;return{add(s,r){let a=document.createElement("span");return a.className=`al-lab ${s}`,a.innerHTML=r,i.appendChild(a),a},place(s,r,a=!0,o=0){n.copy(r).project(e);let l=t.clientWidth,c=t.clientHeight,h=!a||n.z>1||Math.abs(n.x)>1.05||Math.abs(n.y)>1.05;if(s.style.opacity=h?0:1,s.style.pointerEvents=h?"none":"",h)return;let d=s.offsetWidth/2+4,u=Math.min(l-d,Math.max(d,(n.x*.5+.5)*l));s.style.transform=`translate(${u}px, ${(-n.y*.5+.5)*c+o}px) translate(-50%, -50%)`}}}function Gu(i,t,e={}){let n=()=>{let s=document.querySelector(i);if(!s)return;let r=null,a=!1,o=()=>(a||(a=!0,r=t(s)),r),l=new IntersectionObserver(c=>{c[0].isIntersecting&&(l.disconnect(),o())},{rootMargin:"600px"});l.observe(s);for(let[c,h]of Object.entries(e))document.querySelectorAll(`[data-lab-${c}]`).forEach(d=>d.addEventListener("click",u=>{let f=o();f&&(u.preventDefault(),s.scrollIntoView({behavior:"smooth",block:"center"}),h(f,d.getAttribute(`data-lab-${c}`)))}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n):n()}function oi(i,t){let e=()=>document.querySelectorAll(i).forEach(n=>{n.__done||(n.__done=!0,t(n))});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var be=i=>String(i).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),ie=(i,t)=>`${be(i)}<span class="zh">${be(t)}</span>`,vn=i=>JSON.parse(i.querySelector('script[type="application/json"]').textContent);function Lu(i,t){return i.map(e=>Math.max(1,Math.round(e.use/t)))}function Pu(i,t,e=1){let n=Math.ceil(i/t),s=[];for(let r=0;r<i;r++){let a=Math.floor(r/t),o=r%t,l=a===n-1?i-a*t:t;s.push({x:(o-(l-1)/2)*e,z:(a-(n-1)/2)*e})}return s}function _c(i,{r0:t=6,r1:e=20,angle:n=2.4,gap:s=.9,rise:r=.35}={}){let a=[],o=t,l=0;for(;a.length<i&&o<=e+1e-9;){let c=o*n,h=Math.max(1,Math.floor(c/s));for(let d=0;d<h&&a.length<i;d++){let u=h===1?.5:d/(h-1),f=-n/2+u*n;a.push({x:Math.sin(f)*o,y:l*r,z:-Math.cos(f)*o,row:l})}o+=s,l+=1}return a}function P_(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ec(i,t,e=7){let n=Math.round(i*Math.min(1,Math.max(0,t))),s=Array.from({length:i},(o,l)=>l),r=P_(e);for(let o=i-1;o>0;o--){let l=Math.floor(r()*(o+1));[s[o],s[l]]=[s[l],s[o]]}let a=new Array(i).fill(!1);for(let o=0;o<n;o++)a[s[o]]=!0;return a}function Cc(i,t,e=.1){let n=i+t;if(n<=0)return"close";let s=(i-t)/n;return Math.abs(s)<e?"close":s>0?"yes":"no"}var N_=["quorum","against"];function Nu(i,t,e=6e3){var d;if(!N_.includes(t))throw new RangeError(`Unknown rule: ${t}`);let n=Object.keys(i),s=n.reduce((u,f)=>u+i[f],0),r=n.slice().sort((u,f)=>i[f]-i[u]),a=(d=r[0])!=null?d:null,o=a?i[a]:0,l=r.length>1&&i[r[1]]===o&&o>0,c=null,h;return t==="quorum"?s<e?h="too-few":l?h="tie":(c=a,h="most"):o<e?h="too-few":l?h="tie":(c=a,h="enough"),{total:s,top:a,topVotes:o,exiled:c,reason:h}}var ds=[{key:"africa",en:"Africa",zh:"\u975E\u6D32"},{key:"wasia",en:"West Asia",zh:"\u897F\u4E9E"},{key:"europe",en:"Europe",zh:"\u6B50\u6D32"},{key:"sasia",en:"South Asia",zh:"\u5357\u4E9E"},{key:"easia",en:"East Asia",zh:"\u6771\u4E9E"},{key:"oceania",en:"Oceania",zh:"\u5927\u6D0B\u6D32"},{key:"americas",en:"The Americas",zh:"\u7F8E\u6D32"}],Bc=i=>ds.findIndex(t=>t.key===i);function Ou(i){if(!Number.isInteger(i)||i===0)throw new RangeError("There is no year 0: 1 BCE is -1 and the next year is 1 CE")}function Ac(i,t=2e3){return Ou(i),i>0?t-i:t-i-1}function mr(i,t=2e3){let e=t-Math.round(i);return e>=1?e:e-1}var li=i=>String(Math.round(i)).replace(/\B(?=(\d{3})+(?!\d))/g,",");function xc(i){let t=Math.abs(i);if(t<100)return Math.round(t);let e=10**(Math.floor(Math.log10(t))-1);return Math.round(t/e)*e}function fr(i){return i>=1e4?`${Math.round(i/1e3)/10} \u842C`:li(i)}function fs(i){return Ou(i),i>0?{en:`${i} CE`,zh:`\u897F\u5143 ${i} \u5E74`}:{en:`${li(-i)} BCE`,zh:`\u897F\u5143\u524D ${li(-i)} \u5E74`}}function So(i){let t=xc(i);if(t<=0)return{en:"the year 2000",zh:"\u897F\u5143 2000 \u5E74"};let e=fr(t);return{en:`about ${li(t)} years ago`,zh:`\u5927\u7D04 ${e}${e.endsWith("\u842C")?"":" "}\u5E74\u524D`}}function Do(i,t){let e=xc(Math.max(i,t)),n=xc(Math.min(i,t));if(e===n)return So(e);let s=fr(e),r=fr(n);return{en:`about ${li(e)} to ${li(n)} years ago`,zh:`\u5927\u7D04 ${s}${s.endsWith("\u842C")?"":" "}\u5230 ${r}${r.endsWith("\u842C")?"":" "}\u5E74\u524D`}}function bo(i){let t=So(i);if(i>=1e4)return t;let e=fs(O_(mr(i)));return{en:`${t.en} (around ${e.en})`,zh:`${t.zh}\uFF08${e.zh.replace(" \u5E74"," \u5E74\u524D\u5F8C")}\uFF09`}}function O_(i){let t=Math.abs(i),e=t>=2e3?100:t>=500?50:10,n=Math.round(t/e)*e||e;return i<0?-n:n}var fn=(i,t)=>i==="log"?Math.log10(Math.max(t,1)):t,pr=(i,t)=>i==="log"?10**t:t,Ai=(i,t)=>i==="log"?Math.max(t,1):Math.max(t,0);function Hu(i,t,e){if(i!=="log"&&i!=="linear")throw new RangeError(`Unknown scale: ${i}`);let n=Ai(i,e);if(!(t>n))throw new RangeError("older must be farther back than nearer");let s=fn(i,t),r=fn(i,n);return{kind:i,older:t,nearer:n,pos:a=>(s-fn(i,a))/(s-r),ago:a=>pr(i,s-a*(s-r)),has:a=>{let o=i==="log"?Math.max(a,1):a;return o<=t*(1+1e-9)&&o>=n*(1-1e-9)}}}function Io(i,t,e){let n=i.pos(Math.max(t,e)),s=i.pos(Math.min(t,e));return s<0||n>1?null:{from:Math.max(0,n),to:Math.min(1,s)}}function H_(i){let t=10**Math.floor(Math.log10(i)),e=i/t;return(e<=1?1:e<=2?2:e<=5?5:10)*t}function Uu(i,t=6){let e=[];if(i.kind==="log"){let r=Math.log10(i.nearer),a=Math.log10(i.older);for(let o=Math.ceil(a);o>=Math.floor(r);o--)for(let l of a-r<3?[5,2,1]:[1]){let c=l*10**o;i.has(c)&&e.push({ago:c,major:l===1,en:li(c),zh:fr(c),unit:"ago"})}return e}let n=i.older-i.nearer,s=H_(n/t);if(n<=5e3){let r=2e3-i.older,a=2e3-i.nearer;for(let o=Math.ceil(r/s)*s;o<=a+1e-9;o+=s){let l=o>=1?o:o===0?-1:o,c=o===0?{en:"1 BCE / 1 CE",zh:"\u524D 1\uFF0F\u897F\u5143 1"}:fs(l);e.push({ago:Ac(l),major:!0,year:l,en:c.en,zh:c.zh.replace(/ 年$/,"").replace("\u897F\u5143\u524D ","\u524D ").replace("\u897F\u5143 ",""),unit:"year"})}return e}for(let r=Math.floor(i.older/s)*s;r>=i.nearer-1e-9;r-=s)e.push({ago:r,major:!0,en:r===0?"2000 CE":li(r),zh:r===0?"\u897F\u5143 2000":fr(r),unit:"ago"});return e}function zu(i,t,e,n,s){let r=fn(i,Ai(i,s.nearer)),a=fn(i,s.older),o=fn(i,t.older),l=fn(i,Ai(i,t.nearer)),c=s.minSpan||(i==="log"?.6:50),h=Math.min(a-r,Math.max(c,(o-l)/e)),u=o-n*(o-l)+n*h;return u=Math.min(a,Math.max(r+h,u)),{older:pr(i,u),nearer:pr(i,u-h)}}function Vu(i,t,e,n){let s=fn(i,Ai(i,n.nearer)),r=fn(i,n.older),a=fn(i,t.older),o=a-fn(i,Ai(i,t.nearer)),l=Math.min(r,Math.max(s+o,a-e*o));return{older:pr(i,l),nearer:pr(i,l-o)}}function gr(i,t,e){let n=Math.min(e.older,t.older),s=Math.max(Ai(i,e.nearer),t.nearer);return n>s?{older:n,nearer:s}:{older:e.older,nearer:Ai(i,e.nearer)}}function ku(i,t=.01){let e=[];return i.map(n=>{let s=e.findIndex(r=>r+t<=n.from);return s<0&&(s=e.length,e.push(0)),e[s]=n.to,s})}var ps=i=>i&&typeof i=="object"?Ac(i.year):i;function U_(i){if(i.to!=null&&i.to!==i.from){if(i.from>=1e4)return Do(i.from,i.to);let t=fs(mr(i.from)),e=fs(mr(i.to));return{en:`${t.en} to ${e.en}`,zh:`${t.zh}\u5230${e.zh}`}}return i.from>=1e4?So(i.from):i.exact?fs(mr(i.from)):bo(i.from)}function z_(i){let t=vn(i),e={older:t.from,nearer:t.to||0},n=t.events.map((B,v)=>({...B,i:v,from:ps(B.from),to:B.to==null?null:ps(B.to)})),s=t.lesson?{...t.lesson,from:ps(t.lesson.from),to:ps(t.lesson.to)}:null,r=i.querySelector(".wh-tl-view"),a=i.querySelector(".wh-tl-read"),o=t.view?{older:ps(t.view.from),nearer:ps(t.view.to)}:e,l={kind:"log",view:gr("log",o,e),sel:-1};r.innerHTML=`<div class="wh-tl-axis" aria-hidden="true"></div><div class="wh-tl-lanes">${ds.map(B=>`<div class="wh-tl-lane" data-lane="${B.key}"><p class="wh-tl-name">${ie(B.en,B.zh)}</p><div class="wh-tl-track"></div></div>`).join("")}</div><div class="wh-tl-over" aria-hidden="true"><div class="wh-tl-grid"></div><div class="wh-tl-lesson"><span></span></div></div>`;let c=r.querySelector(".wh-tl-axis"),h=r.querySelector(".wh-tl-grid"),d=r.querySelector(".wh-tl-lesson"),u=ds.map(B=>r.querySelector(`[data-lane="${B.key}"] .wh-tl-track`));s&&(d.firstChild.innerHTML=ie(s.en,s.zh));function f(){let B=Hu(l.kind,l.view.older,l.view.nearer),v=E=>`${(E*100).toFixed(3)}%`,x=r.clientWidth<560,y=Uu(B,x?l.kind==="linear"?2:4:7);c.innerHTML=y.map(E=>`<span class="wh-tl-tick${E.major?"":" is-minor"}" style="left:${v(B.pos(E.ago))}"><b>${be(E.en)}</b><i>${be(E.zh)}</i></span>`).join("")+`<span class="wh-tl-unit">${y[0]&&y[0].unit==="year"?ie("calendar years","\u66C6\u5E74"):ie("years ago","\u5E74\u524D")}</span>`,h.innerHTML=y.map(E=>`<i style="left:${v(B.pos(E.ago))}"${E.major?"":' class="is-minor"'}></i>`).join("");let M=s&&Io(B,s.from,s.to);d.hidden=!M,M&&(d.style.left=v(M.from),d.style.width=v(Math.max(.004,M.to-M.from)));let b=Math.max(120,u[0].clientWidth);ds.forEach((E,D)=>{let I=n.filter(H=>Bc(H.lane)===D).map(H=>{let U=H.to==null?Io(B,H.from,H.from):Io(B,H.from,H.to);return U&&{e:H,s:U}}).filter(Boolean).sort((H,U)=>H.s.from-U.s.from),R=I.map(({e:H,s:U})=>{let X=(([...H.en].length*.56+1.5)*11.5+16)/b,j=Math.max(U.to,U.from);return j+X>1&&U.from>.45?{from:U.from-X,to:j+.01,flip:!0}:{from:U.from,to:j+X}}),P=R.map((H,U)=>U).sort((H,U)=>R[H].from-R[U].from),V=ku(P.map(H=>R[H]),.012),w=[];P.forEach((H,U)=>{w[H]=V[U]});let z=w.length?Math.max(...w)+1:1;u[D].style.setProperty("--rows",z),u[D].innerHTML=I.map(({e:H,s:U},it)=>{let X=H.to==null||U.to-U.from<.004,j=!!R[it].flip,nt=j?`right:${v(1-(X?U.from:U.to))}`:`left:${v(U.from)}`;return`<button type="button" class="wh-ev${X?" is-point":""}${H.kind?` is-${H.kind}`:""}${j?" is-flip":""}${l.sel===H.i?" is-on":""}" data-ev="${H.i}" style="${nt};--w:${X?12:Math.max(10,Math.round((U.to-U.from)*b))}px;--row:${w[it]}" aria-pressed="${l.sel===H.i}"><span class="wh-ev-bar"></span><span class="wh-ev-t">${ie(H.en,H.zh)}</span></button>`}).join("")}),i.querySelectorAll("[data-scale]").forEach(E=>E.setAttribute("aria-pressed",E.dataset.scale===l.kind))}function g(B){l.sel=B;let v=n[B];if(!v){a.innerHTML=a.dataset.idle||"";return}let x=U_(v),y=ds[Bc(v.lane)];a.innerHTML=`<b>${be(v.en)}<span class="zh">${be(v.zh)}</span></b><span class="wh-tl-when">${be(y.en)} \xB7 ${be(x.en)}<span class="zh">${be(y.zh)}\u30FB${be(x.zh)}</span></span>`+(v.note_en?`<span class="wh-tl-note">${ie(v.note_en,v.note_zh)}</span>`:"")}a.dataset.idle=a.innerHTML;let A={state:l,events:n,setScale(B){l.kind=B,l.view=gr(B,B==="linear"?{older:e.older,nearer:e.nearer}:l.view,e),f()},zoom(B,v=.5){l.view=zu(l.kind,l.view,B,v,e),f()},pan(B){l.view=Vu(l.kind,l.view,B,e),f()},fit(B,v){l.view=gr(l.kind,{older:B,nearer:v},e),f()},all(){l.view=gr(l.kind,e,e),f()},select(B){g(B),f()},draw:f};i.addEventListener("click",B=>{let v=B.target.closest("button");!v||!i.contains(v)||(v.dataset.scale?A.setScale(v.dataset.scale):v.dataset.zoom==="in"?A.zoom(1.8):v.dataset.zoom==="out"?A.zoom(1/1.8):v.dataset.zoom==="all"?A.all():v.dataset.zoom==="recent"?(l.kind!=="linear"&&(l.kind="linear"),A.fit(Number(v.dataset.older)||6e3,0)):v.dataset.ev&&A.select(l.sel===Number(v.dataset.ev)?-1:Number(v.dataset.ev)))}),r.addEventListener("keydown",B=>{if(B.key==="ArrowLeft")A.pan(-.15);else if(B.key==="ArrowRight")A.pan(.15);else if(B.key==="+"||B.key==="=")A.zoom(1.5);else if(B.key==="-")A.zoom(1/1.5);else return;B.preventDefault()});let m=null;r.addEventListener("pointerdown",B=>{B.button===0&&(m={x:B.clientX,moved:!1,id:B.pointerId})}),r.addEventListener("pointermove",B=>{if(!m||B.pointerId!==m.id)return;let v=B.clientX-m.x;!m.moved&&Math.abs(v)<6||(m.moved||(m.moved=!0,r.setPointerCapture(B.pointerId),r.classList.add("is-drag")),A.pan(-v/Math.max(120,u[0].clientWidth)),m.x=B.clientX)});let p=B=>{if(m){if(m.moved){r.classList.remove("is-drag");let v=x=>{x.stopPropagation(),x.preventDefault()};r.addEventListener("click",v,{capture:!0,once:!0}),setTimeout(()=>r.removeEventListener("click",v,{capture:!0}),60);try{r.releasePointerCapture(B.pointerId)}catch{}}m=null}};return r.addEventListener("pointerup",p),r.addEventListener("pointercancel",p),r.addEventListener("wheel",B=>{if(!(!B.ctrlKey&&!B.metaKey&&Math.abs(B.deltaX)<=Math.abs(B.deltaY)))if(B.preventDefault(),B.ctrlKey||B.metaKey){let v=u[0].getBoundingClientRect();A.zoom(B.deltaY<0?1.15:1/1.15,Math.min(1,Math.max(0,(B.clientX-v.left)/v.width)))}else A.pan(B.deltaX/600)},{passive:!1}),new ResizeObserver(f).observe(r),f(),i.__tl=A,A}oi("[data-wh-timeline]",z_);var To={source:"Natural Earth 1:50m Land v5.1.2 (public domain) \xB7 naturalearthdata.com",q:.05,polys:[["ghHlURTADQKAJVBHEHHLDDIDAEIIBGGYK"],["gzF9ODNMNIfBLIXIDUIIJaRBVIVANMTGAKdDXMLBLEFePKAONoBVGHFCBFUVKRKhBECGFAKCGWPCIGJEhBMNcLMTMHIPKJAJKJBNAjBUpBAPAHJRDXHZDjBPXDPLJABNFNXFDANHBGBPRBTJHNZJnBAbRHxBDNDpBbZDGFECCHDDJMHBFKPEGGBGHANJJGIAIKHITJKBrBXrBQdGDFHCPKNCJGXaBIEQDMLOTQKEEDAIfJLCMYAKPYPnBfDEOQAEeSWDQGEHUAHNPHRfPVXCNFGFDNMHCEEKDJaLMHQPEHQGAAIXORARKVBTMVINDpCDhCV3BBtBXTDPXNLLDPEZDDGZA9BDHFHJVFdTLB1BCTIROVIAeIFGAGEIODWGKBcXuBJ4BbqBDehBuBEBCGKRGBEEAGJKHQCEKJALGGGLEDEEASf4BEYKSCUDKMeECCBAXKGMWeMWScQcBgBMWGOKUBiBIWKOMUgBUQHWEQSOKOYpBCSKBAINQGEBIGAEHIGKFSANEAGICCKBCDFDICKEAGKOHAGFABGIGMDCEFCBKEEMECKCBBJGEEFEEEQBEGACFGGGFKIAGECWLebFXEEEBBKQMSFGJCMIDIHAMIAJIEELGMQGSQKDGAIGCEIICAIKDAIGAAGIAEGGJYAIEGDEGICBCAQFGRCJGGEIDIEOLKEKLcFUHOCMHGAcOHNMAEHGBEGDGMICHMDCDPRCHFJFENFAZBHTXCFeTEFQFEHIAcNWReHKRgBNSEOIW2BKoBFYEMFOIWBMIGEABIFEAGGOEBIsBMKGBBDGFGLAT"],["8-G1VMLCRbFZGBKKMMGQE"],["otGpZKBeRST0BhBAHHDLG7BmBfgBDO"],["2_EiBGACIIECKUGARPHBFOHEHIFjBKDFEVSZPINSAWFMCKFMIcQOFNEFANNN"],["w2Cr9BQGCFJDGBeIIBCDFJJEPDKFKCCBHDlBGBDJBBCCIBIEEFEEIIIEHDF"],["mvC8kDhBEYGoBCIIiBBKDCDjBH"],["uoCkkDXCFKHCEC4BBeDhBB"],["5f04CADEDBBfHPE5BBOIAIEAoBAgBG"],["2nGxLIHQCMHGJFDhBIHMCG"],["0yEyKDDCEEKWWIEsBuBESIQCBANGRNFFLPFBFLT"],["k5EwOOAEBBDKEBJLLBHfNGwBHGACGC"],["-5EqLFAFKLIFMCGQGBQIQKEKDCDPlBAJGN"],["27EmOQAEFBPGFENDDFGCLJEBeDCHBFY"],["y8E2PCJKDDJCNCNIHDEPALOCKVQDKBG"],["82E8QUBMLCTFNFDNMJaLKCE"],["-iGrIBDHBNGFGAKROAUOFOVOJ"],["m_F9FBDFIDUNWxBeLEECAGQLgBPmBhBGJ"],["mtFpKJFZASiBIESCKLHN"],["miFxDKFQAGFMPBLlBUNABDXINHNMJNAMMOgBAGDOG"],["y-E7DIBILAHLDPATOCM"],["w5E3KtBLJEBDLBTGRAHBDGCMeGiBNUGOHWOCEFAEEGBAH"],["g2E1LMLKBKJAFNHLEVSVEDGKEYAGE"],["6zErKOAEDKEINBDLCBBEDPABIHHbFRDJECSMIQDKJGBMGRKBIOC"],["6xE3KFHEDNAPEKCBMOKMF"],["qwElKKJNHHJDMRGFKUBIG"],["ykEhCMfSDHNCFZKHYZGIKEKGAEHAIIC"],["ocopCOAOFVHPBHJFAIILEEGFE"],["gboiDSAKNcASDLBBDoCJdDPHlBFNAAGKElCDDEOCSMXGTMACLE"],["2tCilDEBFHpBHdEZBNEEGMG"],["q7BilDoBBKDABnBEPFtBFHEpBC"],["8-BmlDUBkBHdFrBBJDfBDBKBCDxBBDAOEDCjBBNEyBKwBBECBGEE"],["6-Bw2CBFDERLdDRCFKEMWGMA"],["yrCu3CAHdBHGVCTOYI"],["q4Cs7CdAEKOGaAaL"],["8zD0jDVArBMsBCiCF"],["4tEg9CXLbCXIQAII"],["owFw8CXDHEDIiBCGD"],["6dusBMCBDKFOCgBDKCCJUIFL1BBDGJChBEBMEBEG"],["od2wBEFaFGRKBCFJALQPCPONCOI"],["irBwsBTLBDGHNBLHNDBDVIFIAGYECIaB"],["8XqoCLFAHEDdTGIHGCMQMOC"],["2P4lCAFNHIFLDBPHBHSNAHQDEMCGIIACHEBGIDCOGQB"],["qNwlCGLAFHDXEFIAG"],["-D4xBMDHLHDJEDGHBFCWOMC"],["12El8CMJdFAHzBBZEACICFEMGdEOI"],["99Ez7CYDUJXFiBBSEUFDBOFBFxBCtBMNKXBBEHGIG"],["1yCjkDdIDEfKoCBGFKAEH"],["poChwCOEABKDCDHDEBPCHDBEJBDCMCFCAELAIIQE"],["_uCxwCDDSAjBLTGeSKB"],["j8Cp4CGBFDrBH5BFJGKGsBEIGOHII"],["39Cl3CWHHHXAVEEG"],["z6D75CBHKAEIIAGDFDKDUOeBHFbFMBsBICHBFTBCF9CCnCMnCCLEGEuCGQHwBMQB"],["98Cr7CLHMFHF1BKHIIEYARGOEqBDGD"],["_0Cp0CfLNKeaWKGDJFAHKDVH"],["z_Gw5CWBiBNLF1BDhBCAW"],["xpChgCQBCBDFKBAGOAEDFDGBBBhBJCFVEGFLBBDFCDEEIUKBI"],["ruBxjCQBEDBBMAMLGAAFEBLDPOPGdIBCECPCYA"],["l8Cl2BNALEIOGsBUDGLFDEFNFONLH"],["rrCpgCkBEGDZTNBJHRGcMNCOCLM"],["j9Ct9BARCDFLFAFKIOJFDLTCCIGBCGFGOEDEKIBGECOA"],["n7C_3BJBFEBEIMSF"],["ntCs9BxBETIJIbMOC0BJqBPEF"],["rsCu5BKCHDEBDFMCMILASOCDQBDFEBfNZBFGBKEIWaOIEACJFT"],["p2GyvCYBQEkBNiBBFFTANHDGpBOfDFGCI"],["1vGwrCQDCJEFTBBDnBKLIYAOI"],["rsG4kCEHMFJEJDRBVHHADGQOcG"],["xgDiXkBLGJLBNEDDFCDHFGPCLKJCBGUG"],["1yCiXUBCFNLxBCCIDGEG"],["j_FooCSCBFMDHFVCKFpBLEDLHDCKILACEHCFBIDFDNSGISEQNFOGAHGCCODMCCGMB"],["v-F-oCECODFFFEBDLANFREQIKADE"],["3jFslCHLHEBELJBCBIIICKOEKH"],["9mFumCOBEHUHSPNEFFKCKHBDIAARVIBIHDLMGCFECEJAPIMAGEDGPDII"],["1mFonCOBCJDDLKINNBFCBMLIGC"],["1oF2nCOZDTLMEIREGKJIHHFBAMOK"],["roF2oCSASTPODCCFMLCJVLFEEOFGLc"],["1pF6oCGDDDEBKEQDAHPBOBGDDDXGFJHCHIRMKKGDCE"],["1gFmiCCRHHBSFDLOGMQH"],["5lF2jCOBGFBDNHOCCOUENjBTBJEMCPGHMBICG"],["1kFwiCELLAUHFDGHIABDGABFlBaDGECPG"],["3vCi6BEEWFoBEGDVHAHRCECFECEJDCBREDGNCBGJCCEOMDJ"],["z6CozBDDEAYGzBPbDEEJAUKkBEQG"],["89FrFIEMFBRNJGLBDJDNAJNfNfBJILAdSEIkBFUEECGSCBDJGHcCSUMCBc"],["k_EvKfTrBPlBhBXHJEEGDGEOMKkBQMMYGgBCOG"],["q1F_yBKCoBPQCGBAEGCSAGGKAECKBEDCxBBBDIAEHLDPETHBFIGCJEDHFKCFDJJCEFJLLETBBGIENANOLcKJCGFIDBAITYDQCO"],["24DslDIFsBHABdDBBOJHBtEJvCKFE2BKQIZAeKiDK"],["i6DmkDOFNFADQGMAKGcBeHJFDNZAiBLRFrCAdGnBAJEVBNERKtBEuCYMBIC"],["0gEijDTPWIiBEiBLUBGFAFVFtCF_BArBJfEcMQQWCDEIIUGCEaDBEIEaD"],["ivF6-CeHGCCKUIuBLqBAiCLVFBBGDjBHhBCNGDICEKEBCZAHBEJQJWHbFRIlCFVENJJBnBGrBSAEMADICISAHGGEuBI"],["4xFs8CuBNEDAHpCClBGbDJEcCcO"],["w3Fm-CiCCCABFGA8BBSDKCHJdD9BA1CQMOMB"],["y4G1rBIEADaHCFGCMVHAQTBHCDDJYFEHGABUDGCCKJCAOjBuBNMESOWFLhBJFDVDGLCPFFNGDJThBpBbPFIJABIDFDCUcEMDIFGpBSHIEGWIIGKgBBEGENcGDIEFGLALSIDAONGFIKRBBbiBKKJHLMEITWOADD"],["s4GzzBiBQFNIIACMAJJMGLNEDBDIDrBxBXJGDHDGAEFKDAFVAEEDAHDJGGHlBNCBFXFAEFPZEFRFZVXDbCHKNALIHDTAFEIIFDDACGHBAGUEHCIEJACGEABEMDBEGAHEAEIADEKGCDCIMGEBBGUQcKGBBEcKAEQMGBDEGCGBDEGCEDIOEFAGKKBCKYSKMgBQKMAHBBDMH"],["w9E0LIAENFNIDELANEFCRFJJFAVPqBDDLVIJCRLPDGAMHHDCdODGDYIQJKLGFADPHGDGDFFABGHCFDLbHABKOeaIGMQKKDGFBPQIIOOBEQMDCIMBDaCESJ"],["s3EoXeLICEGEBCFDJBPKREDNjBVJALHNMVBFERGFMBECDGSGMDGRIEAIUHAFJBKPAFOBDTFGCILANGFQVSFAITBHHMXSLDFHJCJIHDBQMMCGNKAPFBHOFCN4BEEMLICBWGeDKKiB"],["6mFdUAGDBFINFNEXKVCKGCCPGCCLIFQAeeGOaGECBIgBOsChBgBDGFSB2BVmBJWNSBYTKBQPAX0BTOBQNAPbAFFADMTkBZERIFGNYACReHJDEHUHUBHDHCIHNFLCJKvCMdaBGAIDBHGXiBrBMDGNEBFLBTMMTDAADNCEHrBDFGFBGAEFOAMDMLBHbPPIrBBtBoBEMFHVDFILJDEKWNOSCNCJIKEPUFQCEFCGEJABKdUDBXIXKfETOAGIAZADGHAJMAKGIFBBJFBDTFFLBHQEGDKPMNGBCMESDUOUFCGGCAEDAEIlBFZALKBSZGLAIKCMWGOKOEOB"],["k8EoBRVbFTCJGvCBPEJDFHHRCNILKHGLUASUODOIYABEMEKDCFBHTEZZPFHHLAKJGDOTIFELFPSTGCANFCABXFBLREDGEUbYGOAQFEJAPLIdDPCTDVGRTAJDFEHMKgBASFWRBFGBcMIIWAWIUIIGFFeGGBIEIOUGDIAKQKEMDIHiBBQFIEkBDYQCGQMGBEF"],["mmEvHMHcDOTmCFQWEBKJOCWJSBEJGDAJIDUBWCOFAXIN1BSVDvBEjBGVKdIVCLFJAjBOhBEBEEIVIbAAEEEGFGOGACOKIeHII"],["04DyGqBBcfCL6BjBenBQJBMIASVMDIFQXWHEFBDRHOESIMHGJNJBFEDBFKLaFGdOLHNAFMKSBIDSXHTEJDLChBFfPKJHRKCPDAdgBzBmBPWVSbkBBMVsBZkBTMV8BjBUDUHGRYTInBqBJSEMSAQL"],["gyEsIADECKMEACJMHEFBNFDUGEHFBADQEKHaJAFDDTFPCBFONADVFLEHHMRFBFEBDPBMFAJKFBDGBBBGDKRJJwBpBRHNCLKCHHFJTBVERZRFGALRREAAJDDKBAHADJBCNHDEFLRxBVFeDDDCAIDDFCPFDKJBLMDJHDFDLERJBUDGBDLCPDDCCEHDFELBFmBFGEMBMLMPECIHIEULMBSCOIEFAEKMQKGILUBiBLFGIYBKKACO8BQkBsBEOQCYOCDQCGKHIIIGBGCiB4BEB"],["20Cq_C_HlBZJPBIDdFDFPEHHTAEHBBhBJEFDDREKHXLLBhCGbDFGCCRIkBIcSgBEVGkBMTCHEECaBOGBEeAIGMEBCwCOKEaBECAGGCmCB8BG0BIMGgBGgBEiBBSJBFdJ"],["klC07CuBDJFDJPBDFHBBFGHHJuBhBwBNTFdGFBMDDBLENBDEpBCBBjBELCICAGWEdIDCEG5BDNEFKAGGEaEOGMONEOGSADCBGCE-BI"],["uyFgkCKJDNQhBANFJCPENGFOtBWrBONAHFKTOLCZDVtBALQRKTMBEPFLFUbGHFLZFEDSIcDSKQBMLSMgBDsBGWTWECFGAMIWBWOGGDKCCEDCICAKNQ"],["4zFk3BkBFaQHTAHINUENJXFbBJBTTHP3BYRBPHLIHAFJgBTFBNCPNHACSJQAMYOCEDKeDIECOKOEUCIHSCKMEmBhB"],["ywF2zBICAbOPITANDNJFDHDNNBFHCpBJNHTMVPHDLTLAQKMJCHJEFBDJGHADFBLJJDECKEEHCDAPTZCTBKGNEAFDCCMDAJNOJBFTDRZHBJCLSBMIEEINCLETBLFfJTBNCFRPIhBBAKEGOA-BsBsBAuBKEBADEBOBIEIGDKCEaaASGISECBRNEJKDKIgBKOKKQSKGQMQKcBKJCGEEKBQOIEQKBENIEGBGEAIRBAEGK"],["-nF6qBMAERNHHNJILCNFLTHDFACGHABGCKDCAENDYOGMGEKFQCAKOE"],["-jFgqBWAFNOABFGHNRLpBLCCHPJEKDOEEFADFAFEFBBPEBEGCAGDGAOIEKQFCCILODDCJGAAFLCLHEIFGAGMHPQAEKBAGUIGIIEKD"],["o3EocFZDAFQLIHWCWkB4BWKONFFCJR3B"],["0qEgZENHDFJHVPLVJfOBeaSDACGkBGSBCG"],["gkDoMKASRWhBEBCLShBAPHRlBRRAFGJcF2BCECJGiBGMAQODPG"],["-9BxPQXInBEbIPBTHLHGDOJBInBDLFFFLCZFR5BjFN3BNlBRNXDZLPALIRELKPcAWCIFSHMDQCSIYMGY0BCSHOAOHSBkBQcEUQCMIGDKCEISCKFBIGISMEJCAAMKQECCLKOIAFEBIKQDGCGECIDWSEQDQGAKO"],["5mG3jDxBB9BGpCKXIGKkBMiBBsDZaL"],["93CzjD1BGDEGIIEkBK6DWeBjDfRJCBDD"],["v4BviD8BAGDYbDLbDKDBDhHRVFvFBHEAImBSOBYEGDsCaECDENCKIAGKEFCIIsBW6CK6CJgBJBJ1BFFD"],["1qCtkDDPdHxCELEHGjBBHDjDSOEQHuFCSEPCDIQABEeGeBGDDHUD"],["x3Cv2CBDQAMLMTgBfCjBLNXLBD1BDnCARCLIOEsCBaENErBDJGiBCKGnBEVGXJhBCKFRFfEXICIKEcDBIICeHECHGGEyBBfGBCOEoBDUGgBCWHBKnBELGGEcIeBdKdBZGFGGUPIEIIC6BGMF"],["t2C5hCOCKDMPHCBHOBGJcTqBTqBFJHpBFjCKjBDPCHGNDJCHB3BIBCGEIBKEKBMEEAAFQBVSAIIEBCGEGNJAQNUCQFCDKElBOFICIeIBGfBJICGKEJISBSM"],["pmD-cYAEDUCMFWBBBWRYBqBVGADEEBOHHBEDGEKHABuBJEDBDCBFBCDgBBQJODAFlBJBEFDhBE9BFGKSMFKhBEPMDOFIXAjBKJKVBFIDFVEJIQEAEFCjBCZTTBFHRFAGNDBCWGAOMKgBMuBK"],["kaqkDaAeHGGAIWCMAHJ0BG6BFoBBMDCFvBLNHjBBfFpBCHEGCvCAlBGFCeCMEpCAZEBEYElBEkBCWDICNIWDCEHEeB"],["gV8jDQCaFEDJFBFeIQFAFDBQDaAGDKESBGBJBkBJjCFVHFFAFVBDNDHZDRNEDJFCFNBtBMRIdGNKQEMBIG2CEFEvDFLEDIKCODBC6BIBCGCwBAGCPALEOG3BHFGGGPDLCJACDBDIDVFlBA3BSAEECTEqBAPEDEIEDCPAADDBLAROCGDESBWEYDDEEA4BCIBDDxBFgBACBWFECAIWIKBkBXYFRUBIKIAEGC"],["iMkzBGPFJCJFhBTEDLLAJKAMGOFCCQJOAKOBcQOJBB"],["8Lw1BCZNdPIEEHCCIFAEGDCEGFCKKUECMEA"],["wT4vBTdIPHHAFXEJKREjBQJCHIEKIGGFQGUH0BGQGGB"],["9hCu3CcFGHHD7BJXGWCFElBCFEEKUAVIGEOCqBD"],["_-Eq_BkCNadiBNUXEEEJJFzBOLGMKCGFHVBNGIELCAGXAAIQCPCNKHBFKDDDEPAAGDCCEQBCILAABLBLICEQC"],["95C0YICIGYAeJKAINUBNBADkBHMJCDNNJILCTAdJFGPDPXHEBKNKhBDXEJBFFVOCIgCFSGRSEQbIAGUG"],["h-BJWEcFFXLNAFHDDEDHJEDHHDJERDJWAEGCDADIGaQG"],["7DkpCDHfNBDIBLHeE2BAKJfjBbHQCKDABbHRCeFSESFUNQhBYHWPDDMPNGPBOAWNEHLJKDKGUAYHELFNNFADBBRBGBAFTDoBDAFNFDDdHnBAXGCDFBVAEDDBlBEPBLPTGVDNJTABEeQMKEIICEGqBAcWhBNJANINBGELETDJEDGCCoBOIKDCAMXDSOUGQCKDBGECGFGALIEKDAAGGCCILARQGIQITAPFLCJDLEDFFCDKEAOUHICGKEJECERJCGEGLHAJFNHBCKIIDAAKQcRHTGQGDCKICGJGACIEFEGKSAJGCIOADGEGWBwBGIA"],["_I6kCKGgBASPHFMAGFBBFEAFEBBDdJIPEZFPJHGDXDBEBDVBTJNCCDBDjBHVAKITDUKdBBCUKTCCCYCFGKGiBGHCHDbDSKCEBCGGOEVCFEJAECLAAGQCHCAEMCAELBCKJCCE8BABEOGEGXCOIAEGGYEEFDFGEAIICACOD"],["3gHm2CmBHMFHCCDYFCFKERIcJBDMAuCTEJDDOEGDDJILFHQBEHMECHMITIKGDGRGiBCWDFDBDEACAAGcBTEwBD0BXDDMCEDBBSACDfHAHDBdIOJDBdAVGNCSHBBGABFNBOBEFhBHKBDFQDEDNBFGAHJBJCCIPHfOjBEPIAKJIlBGRDjBAFECGRMIBIQLHJCBGHDAFNCDLSJAFNLLFA-E"],["tT6yCmBGLDHHQDADFFSCEDFDMCWFHFGBDDIDBBJBAFHDNABHHFvBHfNtBFFFbF9BGLGGCBCJBRI9BDBKIDMCeOXDGEDACEOGTDHCCGHCjBARBJEyBIkBAEGJBRCaKpBGnBHXGKCQBJKUDMCVEOCLEOAFEGEQDCDOCCHGCAGTGSCXEIESAqBPDDIBBFLBMDDFIBEFOQODEGAOGCcNEOWEcRCEHMQAOHQKMBOCCEDGMCKA"],["v0C7lCJCMA"],["_6CwXADLEHG"],["6U41BWDNA"],["gVi2BPCIEKBCB"],["vCy9BJBCC"],["9wCoWCBEADBHAAC"],["1gDofHCICEB"],["96GtaCABDHG"],["kuB4fNIAE"],["w6EjCDACI"],["k_Fk_CDAJCEAGCCAAB"],["m0C-2CDDFABAACGE"],["mzCm4CFCCG"],["gtGx9CJCAESE"],["iuGt0CHCCKIF"],["yxG1hDJDrBBHCDGiBDaI"],["ksGvzCBBFGGA"],["8wGzgD4CFCBhBHrBCZHVOSEJGECUA"],["q0G_7CNCMKGH"],["2rGt-CFFFABCECGCCA"],["o-DjyCRALEMIOAOF"],["orD1zCFBNIUCGF"],["4zDnyCNCKCGB"],["msDtzCLAKCGA"],["2qDnzCLAEE"],["s3C75CDFBABECCCA"],["y1Cr6CIIIB"],["44DxyCOACDXBDAEE"],["g6Cp4CNGAGGEKJ"],["orGjzCDAHEAG"],["q9D3yCDBBCCCGCAD"],["y7DhzCDBDCBCGCIB"],["ohE5xCHADGNGQBCF"],["x1Fz-CjBGQC"],["n3FlgDTBAGiBBEB"],["vlFh9CFBLCACMAIA"],["35FngDZABEgBB"],["16F7_CqBBbDRE"],["5jFn9CfCLEQGeD"],["t1Ez8CNAKEFIYAMD"],["9xE18CZCoBKKB"],["l_En9CVCHEBEkBDEB"],["v6F1gDKBTCHCGCEBGA"],["vqG7nDpBAdK4BBeF"],["57F__CXCaCEB"],["r3Fp_CHATISB"],["v3F5_CDBREIC"],["xoG_lDrEIeEeA8BF"],["_7F1gDrBEUC"],["tgGhkDnCIEE"],["x6FrgDvBANEmBG"],["vlGzmDnBMuBJ"],["rHl4CJBLGUC"],["6Dn4CNADCYGAD"],["1D_4CNADG"],["0B53CFFHMSCCD"],["lDt4CSBJJRDAGHGVGUC"],["2Fj4CNCFGSCED"],["28BvzCJCOCED"],["oUv3CBBXIOEaCJF"],["yhB_3CTBNEBEOIMB"],["7mB3jDKCCEwBJfD3BGHEME"],["tqBjjDpDACEoBE"],["jEl4CHCOIOAEDBD"],["3Zr8CBJKFDHLCHIFEjBCkBGMKGCIB"],["jU76CHAHGGE"],["zPl6CHBJGGC"],["toBxjDJAIESA"],["j5BzrCSFEDfGAC"],["xjCzsCFCIE"],["h0CpjDzBAKGYEaBHD"],["9kCvsCFBFGCCeB"],["tlC9uCQBCDBBbCVFDESI"],["5lCtvCPEUCCD"],["xnC1wCHAAEWE"],["voCrtCKAEDTBBDJADDRCMI"],["vtCj3CDBRWMASHADDB"],["jvChxCJBOG"],["9tCvwCRDMKDGGEQFFH"],["nuC5uCBAEGKCBBBB"],["nqChuCFABCBCGAEACB"],["hmC7uCLBJEECSA"],["3rCluCeBNFHGZDDEOE"],["1nC3vCKBJBNE"],["tsCv3CJCKC"],["9rCr4CFABGUABD"],["1rC54CPEOC"],["zrC1uCJAEC"],["5rC5vCLAGAEIGB"],["9xDv7CNAGMLMOCUBAFDBEBAF"],["1iEt7CNBJIIC"],["52D56CFAACaGEF"],["z5C53COBNFDG"],["_5Cj3CfCFEEEQA"],["r8C17CJCMIMA"],["pyCpyCNACEIIMAADFB"],["nzC3yCJDCIIA"],["l0C10CNABEUCEB"],["l0CzzCJAGGID"],["9gHjVBEGECB"],["ziDqKBICA"],["whG09BHAAEIKEA"],["kqC0lDbCUC"],["gkCykDXCEAAEUB"],["usCmlDrBC4BEEB"],["8iCokDzBCoBGaF"],["snCukDAFDFzBCMEAG"],["0qC-jDfCaEOD"],["r-C98BDABGGKBMGCKRAF"],["j-Cr_BBBDAAKOA"],["_8CjiCeFULPCLIPARO"],["j3CzkCgBDSCCDHDMDBDKFCFLGTCBILEDABFGFHAJGACNEEK"],["79Ch9BLLJBGEFGCEUE"],["jrCngCFABCACGCEBBB"],["mjC6PSAMDNHRBPKKG"],["2iCqeFCIE"],["spCoZBAAGKOCH"],["omC0hBJHVDDCSGAGSCEB"],["ujCoeLBIE"],["w0B8UCAAEEDAFJGDGCG"],["myB0TKDPABEEADCAGGB"],["o_BsgBBDDGAMGA"],["s8BglBDADIEIGH"],["yyG_UJABGCC"],["syGtUNEIG"],["yyG9VGFDDNEEG"],["8xGpTBBFABCIGGA"],["uwGxSCLMIETDFNBDKDaCE"],["oyG9TBUER"],["oyGlTBBAEBMCACH"],["oxGjUSNPDDQHCEI"],["8nG1KlBUTUMBOLOFQLBB"],["8kGlJBDNGZaYJGJ"],["u3E0HKDDFPEGG"],["79C57BFECAKC"],["h8C_3BFGAEGB"],["l9C38BNBNYQIAFKN"],["1wCrkCeBhBFDC"],["rtC9wBADHG"],["nsC3gCEABFHE"],["j7C7iCADQAMHHHRFDEIILABFDADCAIVIGEKCODCE"],["7zC9kCJFFEJBLCJIqBA"],["34CxkCIDQCEHHDDENCJGHBAE"],["j0C3lCJEIE"],["l9CjgCBDRAJJGOWE"],["59C7-BPBEOSDCD"],["v9CxgCAFKFFNFCJS"],["n8C52BFBHC"],["n5CxjCQBAFFDLETBJKIG"],["18C9gCHCFG"],["l8Cv3BJDADGJEPNDAGTWECAGQCAIECMD"],["78Cj5BFBJAAEIIAGIGCR"],["97C64BPASK"],["j8Cg5BDBBAGEGC"],["rtCk7BGBJAEIUI"],["n1Cu3BDDDCEG"],["quE7IbDPGEGsBCGF"],["1kGqCGDBANGGBEEDEGD"],["3tFjMGBHDDE"],["z6FjWEBADFEJABIKC"],["hvFjLFBBGIA"],["t3G5QGJADNAJM"],["p2GxRRCFGSB"],["n0G7XDBBECCCCCD"],["ooFoJBBBIGG"],["-0FyQDIKGCB"],["k_G1XVFQG"],["wxG5RFBBEEC"],["sxGrRDEEECD"],["8zGtYBDDCFECGEA"],["2zG1XNEAIGA"],["gyG5aGABFFBFKIC"],["oxGtaNGAEGEFEKB"],["2vGtNJDDCIGGB"],["4oG3OFARM"],["-oGrKKLBHIFIZXaDOCCDI"],["kqG_MQBKNRCNIBIHAAG"],["-pGhMADFCBO"],["gnGrLFCECEB"],["moGnLKFLC"],["mlGpKGJDDHGBIJDDEMMEBCH"],["0lG7KFBBIIA"],["4kG7KHGIG"],["8jG7JHICGKF"],["ukGjKDADECGID"],["6iG7IDABAAECCED"],["8lGwIDABGGA"],["u7GrtBHECE"],["s5GhzBDBAEGE"],["uwGh5BADHC"],["n8G12BHDAEDBGJFBFCEILCME"],["4vGt_BCDNCGECGGA"],["myGx6BDDIBABdHMOAIGA"],["srF3TFECE"],["4lFjODKEE"],["82F5WAJHK"],["6xFrNBBBAAECC"],["suF1UNHGMMCED"],["8qFnRIAFJIFBDVEECBMKG"],["qqFnRFAEG"],["4qFnODAMQ"],["ijFzOGDVAAEGCBGGG"],["ojFnOQCKGMJDFTNROFQ"],["qwE_ZBBDAACCCEEAB"],["wtExgBJKAK"],["m4Fn2BBDHCIG"],["-zFjyBDIGMEBCL"],["u5FryBEFBBPE"],["g5F1xBMJAFHDNQ"],["gsF1sBOAGDRBHFJCRBHGEGcGKA"],["-_FpiBDJBCAGCECA"],["6_FjiBDGEE"],["s_FlgBDICOIIDIECEL"],["-8FrdEBAJHK"],["syE8JBDDECEACEA"],["81EkNDBBEEEEBCB"],["k2EmPGCCHLADM"],["i2E0ODADKIB"],["q5EiNDBAIGG"],["m6E6LCUMUOgBBhBLJ"],["47EoMTHFAFIOOIAKD"],["g8EuLFAAE"],["06EyLADDBDE"],["q2EyGRHOM"],["04EiIFBDKIEKD"],["y9EmMBECIEJ"],["k9EsMHIAIGG"],["s4E-QIDDJFG"],["04EuPDJDKEKGC"],["q5EsPJGIC"],["k6EiQCFPQ"],["46EyPADBCFGAEEB"],["06EsPONAHXSLJEa"],["u7EiRFDFEGSIJ"],["y4E4SDNDQ"],["i5FpHJIAGKD"],["g4F5GHGGECB"],["w2F9FDEEE"],["63FtCQBJHZAEK"],["qhG5GDOEEEH"],["m7F9BHECE"],["i8FpDLAHIMCIB"],["88FvMICBJLEFQ"],["-7F7LJGEGEB"],["m8F1LKBEJRCCCBI"],["88F9KDKEE"],["6-FlLMDAFJCHG"],["8gGlOHDDE"],["-_FrOIDNCHK"],["wzFzKBAHEBCKBCAAB"],["opFZUDUNJDJAFQDD"],["qpF_B6BHZDdK"],["2oFrBDAAEGB"],["0tFvKNEKG"],["-iFjCCJFDNCFG"],["4jFzBHCFMQC"],["0jFfBBRBEC"],["wjFAUFCFDBLAJKBBKJFBBGFBBEJCEG"],["ygFyCFADKGGKGEFDJ"],["i_ETFACIGA"],["k_EfDABCCGCACF"],["u_ELGFDFMHFDFGFBAGFGCGEB"],["mgFhCXDFGKK"],["uoFjHBXJBLMGCCGFGGAIK"],["moFhIJPDBDCAQEADK"],["mmFrHDDEMIQBL"],["gmFpHDBBM"],["sgFxELDBCMIEA"],["g6E1FAJFCDPKHJBFJFABGGMEYII"],["q5ExGDFJEEKBMOGCNFH"],["y4E5GJIEIGD"],["i6EjFFFFIKC"],["y9EhDHOCG"],["w9EnCOAPDTBBE"],["m8EjCKAEHjBDBGCI"],["g6EtBCJIGEDBDFBDCDFAMJLDGEK"],["q4EPCDJB"],["w-EiFDAEIDECIGJ"],["i9EqEFABM"],["22E7HBFBKCQ"],["yjFrKGIIB"],["mkF_JJACMUYEDDBBP"],["qiF9JFDDGAEIA"],["4_EjKIBEADDHC"],["w-ExJADHBFFPCJDIOIBQG"],["25EzNDAAGUMCH"],["s4EnNHCME"],["47ElKSBEFbDDCCG"],["s7EtKFHHEMK"],["86EpKDBJJLAKKDAQE"],["k6EtKJBGGGA"],["q1E9KBACMEB"],["owE1IHACEKB"],["szEiFFBDEAGKB"],["izEkEABDEACACEACB"],["sxE5EHHDOEOGE"],["kpEvBJDCMKB"],["snE0EHAGEJIKIGH"],["mkEyDBIGB"],["k_D0CCFBFHBDKKG"],["igEoBFEBMIF"],["kgE6BADPGDE"],["6gEeVEAKUJ"],["-gEiBRICEKD"],["khEWFAAECCCACD"],["qhEaDGCCEF"],["giEwBGBDFDC"],["4iEwBCFBHFIHBEI"],["gjEHIDDAREEI"],["yiENGDJHDI"],["2hENLAEE"],["onE3DFJHGJDBMEOIAOFEF"],["85D6BSTFPDCDKHELUGBEG"],["-_D7GJIKB"],["y9D_DAFDEFKAIKH"],["o9DtDHBAK"],["68D9CJEBIGA"],["-7DnCLIJQEKKAMbAD"],["i7DVFAGMFKKJ"],["y4D-CZMDIICUP"],["orEgDDCCM"],["uyE-IBBBGIEAF"],["goB45BRCBE"],["0cypCNFFGNEQAIGKDEF"],["mdmpCDAHCCCCCIBAB"],["4sBwxCCDBDJG"],["0hBqiDTGYD"],["qkB0iDYANB3BAYE"],["y-BikDTEcCCB"],["ogC-jDzBCiBE"],["2oBkkDpBA2CE"],["ooC-lDeFbBGDVDZErBBJEcAmBK"],["skCslDmCDyBH3BFhCEXEMC"],["u_BqlDPCWCCB"],["opCqlDOHLDbCdIiBE"],["yvCgmD9BEgCAEB"],["8oCkmDPAKGyBABD"],["uXskDJBNCCCEAIA"],["iOoiDABYDKHnBIRMDGQB"],["gYg9CDBLGQACB"],["uiCi5CCDFDCBDBJKTGWC"],["q9Ci7CVGMGWDHA"],["s-C67CDCGCUA"],["-_C67CDAPCFACCEA"],["ihDs6CfAWKOEYF"],["sjD86CXCJEUKQH"],["uoDy8CdCOC"],["-pDi9CBBJCBAGCGAGA"],["qsD49CSBFDVAFCEC"],["2mDo-CCBHDTEIEKBBEEAGA"],["24Ds_CCDJABDnBEEE"],["g6D4_CBADADCBCEA"],["s4DqgDpBB0BIAB"],["8vDwgDNCSCCB"],["q_CyjD2BFlBATEDC"],["ikDilDpBAIEYCaB"],["uyDulDNDzBE"],["0mE2hDHDrBE"],["6kE4hDHCaC"],["omEygDFCECOD"],["0sE4_CGDDBXI"],["q2Es7CRBFCMC"],["27Eq8CHEMB"],["-pFo-CTAKSSJFDAB"],["u6F6_CdACCKCcCFBBB"],["oqFs8CfOaFID"],["usFs5CJDZGeC"],["8oGw4CHABE"],["wzGg3ChBCVIWGoBDCD"],["ysGopCHDAEMIAIgBICL"],["qwGykCAFjBYWABF"],["wjGq_BJEME"],["8iG8-BTJFCBGUGIMICAH"],["yiGw_BHEIA"],["g-F06BHDDCYM"],["k7Fi5BJBIKaOKA"],["45F04BbLJARRLFOSaQAGGFKCSKEH"],["o8F4pCFCKC"],["usF8kCKBTPJIHBOQ"],["wrF8kCFFNA"],["s3F22BDAACMA"],["42F03BOBBDXJLJBHDEAEaa"],["s7E0eBFDABEIG"],["86EseHACEIB"],["qgFqhBPHCDDDADFBEOIGBEIBGKED"],["ohF0iBDCAG"],["6hFojBDBHEWKAB"],["ojF6lBDABABGECGBAB"],["2jFgmBDCIQ"],["6gFgpBIBCDHB"],["0iFqoBFACKGCCH"],["2mFotBBBBCBCACECED"],["-sFovBDCCEBGKIBHGB"],["0wFs4BFEEC"],["2oF8qBFDFEOK"],["shFipBDEEIEF"],["0hF0qBDAACAGGAAB"],["4hF-qBFAEKEE"],["-gFwrBDBFCACEECCCA"],["igFwrBADHCAECC"],["-9EwpBHEIGWCBF"],["69E-qBFEKE"],["k-EmvBBFDG"],["q4EsnBNCLKKB"],["84EulBLCBGOD"],["41E6fDAAIGB"],["gqEsaEAAFHC"],["wmEwaFDBACGCACB"],["iiEgNBNFM"],["igEgPFAAG"],["-hE2BFDFEGE"],["s9D0GBBBCAGCACACB"],["68DiICDFDDG"],["i9DgMDHAG"],["g7D8JDDAOGB"],["s1DyIBDHKCIECGL"],["0zDmNFAAIGGCH"],["8zDuOFMGOECDMGgBIIANFJEPFD"],["46D2NCHFG"],["m7D2OAHDABK"],["g7D4PCFFDAO"],["g6DqUDCCI"],["k2D-TDDAGII"],["k1DsXHGKA"],["k1DuYKDBDFADG"],["-yD8aDCAGEA"],["-xD4bDDCQCFCB"],["uyDgcFECE"],["wxD0bLBIMHUEAKN"],["lLy4CFAeMOBAB"],["viG4XDBHEAOFOKKDGCGaLQT"],["vkGwaUBFDRC"],["zjGmaIAMHDDLBDIHECE"],["noGqbBBCEGE"],["nlG6aEAAFLEDDFMME"],["lnGubJBHGIGKA"],["hkG-ZDADGGA"],["2gH8gCDADABCACGCGD"],["49G8gCFAQIBF"],["k5GuhCLCQE"],["g4GoiCaFTDRI"],["93GyrCUFPCPGGE"],["10GwnCDBDABCMC"],["7oGklCGECHLBBIGC"],["7qGykCFEIC"],["lrGgkCDADABCACGBCA"],["5nG-kCPJEIKG"],["t1G4hCDAGEEB"],["pvGyjCHABEICID"],["9uG2jCDECCID"],["9xG2iCtBTQQMCAEEESA"],["nwGsjCEAGEEBLHIDtBNLAaKGGIBCCNECGQC"],["x3GqhCFAGGGB"],["94GmhCWBhBBFC"],["r6GihCXBoBICCHCMEGBHFEB"],["38G6gCGBABTFKQGB"],["_7GghCHCEC"],["t9G0gCTAQEEGEB"],["r-GygCFACEHGKAMB"],["k8CtiCJBHIYD"],["02Cp9BFGIA"],["qvB16BJCIC"],["6iB-sBFAAIIIOEFP"],["giBqsBDABGGI"],["2hB-tBKGGB"],["-fmuBDADEIG"],["0fquBDBDCGE"],["whBovBKDHBJC"],["ygB-uBCEKA"],["ofmvBBBJKKB"],["yfgvBDBFG"],["0gB4vBDBDEEEFIMA"],["ghBmxBILDACBDBNGGEHDHEMG"],["6ewwBDABI"],["kgByyBFBDEEACACB"],["6fgyBDHDEHBAG"],["-e4yBDAFEIE"],["ugBmyBHBDCECECCAEB"],["jU6NFCIE"],["tU0YDDACBCEEACCA"],["vVipBUDFDFAJE"],["tUwjBBJJFJOgBK"],["jRkkBFBCGOKBJ"],["3RmjBFDFCKEKUGCDT"],["1PqJPEOEEB"],["nTmjBBNHBFGEK"],["tfmVFABGMECD"],["jfgVHCGC"],["vVgjBDECEGD"],["rW4iBDFDCBCEAGE"],["zcqUIDADJA"],["reySFABGGA"],["pW0jBFKCEGACF"],["je4UCBHCBDDE"],["zc6UDCCG"],["_c-SBCCEEB"],["pd4SBDHCDGCK"],["03BjPAJLI"],["w4BnQFECKED"],["q2B7OHGCQEB"],["0xB_JDCMM"],["sxB1HCJBBLMES"],["ioCzZJADCEKKIGH"],["4lC1aREDICGOAIJ"],["u8B1QFBAGEC"],["u-BjVFHCGGK"],["6xBjGANDHDEAQ"],["-K2EGACDJRJCAIGC"],["qIEFBBIKGCF"],["l3B9cHAEE"],["38B_gBBEEGCBBDAD"],["z8B1iBBBAKGG"],["x4B7dHAGG"],["2NkqBJCCGKD"],["vF4jCHFHAQOCF"],["rGqlCJCAGGC"],["nHumCTBGIFCIEOF"],["1H-lCCLHBAIHDEG"],["tH4lCDEMI"],["pB0rCDECEEA"],["zB2rCGFECJVAKNGMCHGIE"],["dgsCDDBAAE"],["9DwpCFADE"],["nF0iCEBJDHEAGKA"],["5D6pCMDRAFCCGKB"],["rI6sCJIID"],["_I2tCGDFAHE"],["pI6tCAFHAEFPO"],["3H-oCFFHDEDTJFCKEHECCDCCEMABEWI"],["1H8nCAHUBLHDGJARKQI"],["_IkoCEBDDLC"],["hJsnCFCAKGB"],["tMsjCLEKA"],["gZurCKBBDFAADLABGGBBI"],["waivCIAFDFG"],["2UsmCDBBCAKYeEA"],["8S4kCPEAGCCQF"],["kRgkCADHCFDHECIIGKFBD"],["2P2kCRBGG"],["mO0kCQDADLBPEAI"],["yM0kCJABG"],["uNukCFEOM"],["oN4lCBAAIED"],["kOgkCLCEE"],["6NynCBAFAECGCCBBA"],["sKwkCEKAFKA"],["vBs5BADDEBCBEEB"],["pBs_BHDLCKE"],["kGqiCDBBABCCCGE"],["gNy1BAFLE"],["sF6xBREAEQA"],["6B0wBJAGIKA"],["9mBoxBBBBCBACECACA"],["7hBqwBHADEKCEB"],["3iBmwBBAJCDCDEOD"],["5jBkwBDADEGCCBCAAB"],["ljBiwBLBDE"],["hgBqvBSABDHBLCDG"],["mS6sBABDADCAGEBEB"],["wSo4BNEEE"],["kS63BHKCKEH"],["4ZgwBGNJCBGDBIK"],["kaovBEDHBHIEE"],["8ZowBFAGK"],["kZqxBHAJMMADDEH"],["6cotBFACIGF"],["-E2gCGDFAJC"],["3_B-2CJADMKCQBHD"],["puB-xCFABCCEGAEBBB"],["9iC64CPEOGGF"],["3kCg7CVJZGoBG"],["zgCy4CRCIE"],["55BgsCFFPGYG"],["l5Em8BGJFEHKEGEDFB"],["l7E-9BTIKA"],["p6E-8BBADI"],["p-Eg-BLEAGIA"],["v8E0-BFICEIF"],["5zEmkBFGCE"],["h2EsqBBABADEICCBAB"],["71E0qBOBJD"],["9zE4pBCDFADG"],["j4C4zBLBBAEAEECACB"],["t-CisBFBGECSCL"],["15DkiBBBAEEGGMEAHJ"],["t5D2gBJaAQ"],["3yD8kBHEECGD"],["hhDqeDDCBEECBAPHAJS"],["hhDubJGKB"],["xhD8bHEEC"],["piDmcMACDJADC"],["xgDsgBFEGGAQJMRCQAUNAHDD"],["x8CscHABG"],["p7CwaDHVAAEIEKBIG"],["38C4bMOBGECAH"],["5_C8fUNATFGEACMHIRGEE"],["x-CqdPGCC"],["x9C0cDGJECEFQ"],["j-CoeHBEENS"],["rhD2bFCCE"],["lhD8eAJLFDILGIABEEGCMGD"],["nkDkiBCDDIFKBICBCD"],["lnD-aPDJGKAFIEGMB"],["jiDuhBYBhBHJIIDGCCG"],["vkDufHHKOEC"],["1lDmYKBLA"],["1sDsZBEAEKE"],["jsCoRBDDGGK"],["hsCkSABHACGFCBIKD"],["nsC2MjBDQIAOFEWGIAFH"],["n1CmPBDDK"],["9rCgOBBACEEGAACAD"],["rqCsQDABIIF"],["5vC-NCFDDTEIEGD"],["jtCgPDAEIEA"],["jtCqVFBBEECEB"],["zsCiTDABQGD"],["1sCqUFACKMJ"],["_sCgUBBDEAMID"],["tsCuQDGEC"],["p7CicMDPC"],["91CiPJEFK"],["jpGopCFBDESG"],["n_FsnCLDBCCG"],["z-FkpCFCMC"],["tiG4lCHCGC"],["rhGymCBBAEMC"],["3gG0mCDCIC"],["_2FyrCMBTFDG"],["14F4qCDACEYSKB"],["_4FirCBAHAACGCIB"],["x4FyrCFJDEEG"],["94FisCFACC"],["hmF0kCKADHDAZYOD"],["vnFinCKHDBDRJBAMECHGBKIE"],["zmFulCNLAGDE"],["lkF8kCEHHAAEFCAIIB"],["9lF2mCHAEKMH"],["jlFkmCBFHADEHCBEMMOJ"],["_lFqmCJEGEKAAF"],["7nF6oCNCGC"],["lhF0hCHEDIKF"],["1jFkkCCGGB"],["5iFujCFDHEBDBCKI"],["piFuiCZQECSFIH"],["7_EqgCHCBGGC"],["tgFwhCDAAMIE"],["thFsiCFCCI"],["5tFg3CJAKCGB"],["nsCiLBEGECD"],["lkD1DDBCKEEID"],["5gC5BDAKOAKGIMEEDFN"],["z3B1DDDEO"],["twBrQEICD"],["l-BKCBHHRCEI"],["7-BuCFBBKGA"],["p_BFLHDECGGCIA"],["59BDPAOIGD"],["h_BGAFFCAGGGEKAN"],["1-BQDBBGKG"],["9wDdHCAEMECF"],["3vDjBHAMI"],["_lDmJJECGCA"],["pyDRFABGIC"],["hyDCSfDHJBJADGQMJKDMFAKG"],["lxDNLECE"],["jlEgbBBBABG"],["lqEofBDDI"],["ttEqkBNKDKIBCFGB"],["9vEijBHCEK"],["zrEweABLICAEA"],["nsEokBDJHEEOEC"],["hsE2eJKGUBR"],["o9E2IBBBGAGEB"],["47EsODAFGGC"],["45E1KBBBCEEGB"],["-yEtKBGGC"],["w3CkzCFAPIaAAF"],["i5Do_CDAEGIB"],["m9DwjDJACCACEAEAGB"],["6pGk2CAELEAKBCQKEBADJFCJEF"],["nsD44CmBGWAEABBCBIAGSBGZCVMYKoBHVKKEdAJIBEEGMEoBFvBMSKYEYBDGUEeEqBBKDILWHAFMHlBRaGNJKDHBBFeMMAHGKEKFMEMFAHQFJIGKwBFfGHEEEaGiBAwBFYFCFhBVeOkBACDDDjBFUALTKGKMaEGBTLUIULDKQGyBHQFCDLFRAbJOAMGKCQBUEIBAFDDtBNGBMGGBFNSSSGYEgBDcFEDjCRyBGEBLFKBUGDEMEcJIJDDdCxBJeEYFaAWFADDBtBErBFaCWDEDFF3BCsBFKHwBBLDIFBFGEEDAGSEBJLHEAUIADEBOCBHGDAKUGCBHDCDOCgBLJBEFbAiBDKGWFHJRHeGWBMGgBPJDNGHBUJJDbEGDFBWHXBIFJHTALICFJBMBANJLLGJBHEEKLLVOLMmBWVHhBDAEIEPBRGTOCDFAHAEDBFZGIHUHFDTAXMLBWDAJODDHQESHJDULGJCISFDBEDKIUFIDLFUBFFPAKBIHSADFIAIHFACRFALOJGIPBDQNTCEJBBrBSBDFCJIBHLKJCZQGNdOPBeVSBBDsBPOLMDFDEHJBtBMvBGTEROZAhBKGEPBZOQCIGRERCGGNDHIdQIIZAFHDILCJIHDKHBBnBABDrBFjBELGFGEMeKDGEE8BHOHDFGBEGRMaAuBISAHKVKDG2BYKMYIVWXSCENBFCAOLAEFJARKHAGEHCKErCNCMYCMGfKBGKCJCJFNEKGdCFQVAdONHSDIHBDbDxCIaJCDBAZIdDhBGbB_BGNBTEHIEE5BHnBKNKJMgCDcCbIxBEdIHSQKHCAGUQEMWMoBM0BG4BBCDtBRVTOLBNGHwBV"],["72C4nD8DBxCLsDISBMEUDiBAIBHBWFFD-BCQDEBBBlBJ3BH5DJJDnCH2DIkBB3EdjBLXAVGUJBBnCF8BAfHKBLDpBBtCGJAEBsBBKFFD1CD3BE0BJsBABHhFCcFiCCoCLRF7BBwBFdNxCBDRPFxCBrBKOHdBIDeCkBDcCGBCFEBQBUEMFADLH_CNLAGGDEdChBIMFADhCALKDNhBBlBGNGJHZCFGAHjBADODDCJnBECOsBKgCEfINIFEOGeCYDgBNiBDuBEmBSCEDBrBPpBBRCAIJImBKQAbCEMHJXHXAMKnBHZCCIcOoCGmCF8BKbDtCEFCGCgBBhCYfCNGHKEGICoDBwCVwBDQCjBCvCY2HWpCEQI4BM7CNVJxBHrCBcGvBBfFlBB3BEBCGEwBKuCGjDD9BPNA1BIHCECqDE-BK9CH7CBNEeEREqBGoBCjBAnCFJCeI7BDPEeI0DKqBFOEgCB9BIkCK0BDmBJMAPEIC-DP5DWeEPGyBDNIIC6CDrBELEKCgDB8BNOE5BOsDAmCLfIEEWEgBAqBHREMEuBA"],["71D25CUACDcLGLDHaHMNMCIFLBREHFUBjBPYAQDcEJDqBDLAHHNCUHKHBRMHOKKUOKKAoBRITTACNEHcPGFgBMGMSKKYIEaAJEKIVIDYwBAaF0BBPFSDCFiBBCDXHWBGDBDXHZAOLICBJeRFRTDLHtBPHCPOLCCCLELEJFOCWJOPADREHDFAlBOrBBAFeJtBZNDTAfOnBKHACD7BEODCCsBDmBRsCFAFJHfZbHPECFREHGJBIHLCGHFDZDvBINA1BOEDBDEDMAFEyBJLFYGuBPDNZFjBACDODXBHFIJZIMFFBADLAEDDAJAMHXJAFHBCFRVJDEDFRAbFHaNBPKSkBAe5BNPkCOUBmCPeNYRoCPUJFJMIuBAkBBYHIJHVKRAVFHcXAFJDQAgBRINPJOGQAKFUPNOAKIIICKFGJGMJKWULQCIHIHYCGECFEECJEECHENQsCaqBcIUAcNWZUlBQCKcUDEEIQDFEGEAGCCLEGCJMIELEIIXBSOAMKETMFSgBK-BJEBDBSEcHAEmBKgBLIBCBDHKCKBIFFDOEIDHFIBDBOHsBDMHMCEGGBCFJFDHELADnBBkBFGHDNOBHRDBFGNHOBWIWAMFGJDNbJaGQSEHFFMKCPGIiBMOMKFEHEEFKICBCIEMCLGIGEBDGSBNGDECGQBDGOSMDEDNFSCEDBHICMLHDGDKCGFVFcABHKCIJbLOEYAHJRHeGIHOBCBDDCFVDYDCBFDaJALtBEeJHFUBJDOBCFFBOFOEIHICBFIFPRiBKCDKAPPYQKBILQDSGEHSDLHdFHHtBHNJJCMFHDBFkCecENAAEkBBKNNHGFUMOAWLGJDHENTDWDBDHCOH1BdRApBFZTlBVbAjBFHGfCVBvCCxBDRHPZlBFEBdLbZ1BKuBLEBJNxBlBlBJfNTRHBNHJCMDCDdNuBSQWyBa4BQqBkBwBciCUsBEaBYLCDLCKFDLjBPbIdHOCUFKJYIBBODHNPJSBBFOZaDCBHDOFoBDBDKBWKGHMCGFCDFDQB5CZLCCFBBPGDFBEFBAHvBhBJCFKFBDCBOEIKIJBUIECJBECeOSGAEEBAFIFBGECeG7BAAGWOHBFGCFHFrBRHECEFBCDLFPBJEAJEBHFZDHHDEHBDCDJJEEEDACEHDDNHDJDBEBDBEDFBCAFFCACJDBDCAVXDHKJJBHHMDEJIJSEDIFAGCEFCJbFBGRHAKDBFEDP3BDbLPJGMDIANLNMFFXAIFPFBBFRRAIJCNMEMOIPHFFCFKVIFDHGAAFjBzBBKOWHACGFCEIHBHGAGKCHEFBIGDEDBCEEACEBBBGIGGCDAGEHCBDFABFBEBFFAEDADDACTEHJIMRPGDGBDDGJBIUJTKBGFaLDHFAXSWTKDBAEBAFFCBFLKSRDBJIXGYHGJUASrBPiBBHINNIAFDCADFCFFHKALcABJKKEDAHPLNCDGFDLEWLLJJGEDIDMCEBDDhBJDGAHNJHNAIBJPARHNRBGBJTNFAAFPFLAIDFDHGEJHJHBCDHJCAHHEDFDBNKnBezBDJGNFMAMDFAKFGENc_BDlBNXXDBGIBFEJUNGJUEIHFCQHAADDAPaMOJGALHGIaAQpBqBNGJBDFjBHDCAEEDBGNIEIHFZKOAFElBFIEAEFAFHHBCEFFPAICHQFNdCPBLHVIHBBFIDSEEBFDGDKGCJNHIHUHFHDEFDBIbOEDDLNGJFVGGADKJAPMJFCDFBlBKZBBCGGDCDHCDhBLIGJACIJBENNPXLPFKGRBHEKJLDBCDHLBADECADDDLBGHFLLECFIBBLERMRALNdFXD5BDNETSVDLAMNUERSjBehBGTUVDAKDBCUBQHONkBMaASKUACBADODKGBMDAcSCQIIAYGSWKkBGSGSCeFCEFAMCKHAPXdBPJHCDKCJJADGCNpBHKAOFFFNIACDFZCDDhBXZADMFCEBESJSIIDYBWCQGBCUDWEQHECBAKBSNLCADGAIHKAFGMDIJFHBEBBEDEPLXBRCjBFCCKFHEHBLBCDHGBCFHNUnBWZSHAJGABFGDMADIOLUBkBQWQUBGDSBaNoBlBBFEACOFKYSKOQEBMGSFBKSIIQMUDFFEDKWiBAYQSIEMWKODELJLVHENIHDAGNThBUdOEGICORiBBKEGwBQGGMBAIPBDMEIIEGFIVQAQBSLGJBHGHsCGQPcHMCaOSCTCBEgDETHTAIJBJIGKPEECDAICAONAGGEMJMDIHHHJVNAMHUIaAmBVQLMPFlBKSQBSRMFCZKScDMDCDAICCoBCUDMDDRMSQJWDYTAHEEGFEHBFGMIXEKOHUtCEBGJUHCTPLRZVLPZAJHHDFJAPHSDKCqBaCDBBIZMJQGMDQINjBIGKYICMOKDEEDEAKOQWEGDAEYFIFQDWLIAENKKQLDBGCELHHEDIICHDBDFDZKKIUGBDLKIUECESBcNOCQFqBEUB6BhBSTQPODGHWHYCUDKPQ5BAlBTzBPRFAAFTZVLJJDNBGNhBVdJDAIHGFHEDNbEABRCBCCDXGvBL1BCTTVFzBHHPfPNFNDJCTbLLLCHDFjBAHIDBCHbDBCKCFEfFAFEBfNDHTAjBRtBfEABDJJAEHCDHJECFMDFHDBCDAJFBEFBLGTDNCVHTRJTTVrBXftBhBAKGAIESKEQGACIKIAKEACIRDLMAHGDFPBEFRRLJTCJTnBdZPXNJdLdGVDZILKbBVYBIEUKKDUCTDFFAFVGVFDKPeLQNAFHHBHMPQDBVZfFNZNhCPxBFdCTGCRKDFBEBBPFBDLAJGHFJVHZBxBOACHBDLGnBSFAFGBMCCGHCSEGHCPDDNDRQRFDDeHVJPNAdDHLFANVCdLZfEPcVmBFEHBHDFNFMAGDhCnBJLDXDFNDPOAHNBQAIFVJHRHHGCGVPBUDWXhBEHBFHvBLHXARLDhBKJMEEOAEFBDEACKSIGGDEFCjBPHFBFTIGGAKGEMBOGYCdEHFJEPTJALIQGIGBCFDNDPCBKDADMQFGCAESBSIKJFFIEDKEGBGXKUJCDfJDAJKREGEEAAOhBILOQCDIGEMFILOFCKGCBGNNHKAEKAbMMKQBNIAISAJGGSDBFRFEAgBOGRAFSeBMFGCHGDOJLLAPKEGMFEENGOKAKFGFCBFTGAKVHGFBDHEBGgBWFGAGkBECCAIGEGBJTCDPFSCCMGCCJJTEAIKCQAEFEAIUGMDLIHACGCEYKCGCGXMCKGCCIDOIKGADQEGEADKECKHDQJABEGGMECGJHPILLNCFAGGHEFQMuBKGGYJcCSHOAOCGQCESECIaIKAGQUImBOUDWMSCKDIH-BCMKIEUHcMWWyCBWKWDYCeEOHMCIIIK2BDeCmBH4BnBcBMFEVMNMzBU1BgBRUPKRgBGCCSZoBLMBQRODSReV8BZeHWPWtBcAGICCIRoBEQSUeUMaDWDTDACILNZUIEAGFiBOKEKGAHKSUBaOIiBICKHGKKIDAYIGOAKIGIBGGCIKKWFABGBDBMDBGICMBYHKMKHQEQfmBJUECAGGGQJNODDHEAFDMRMTCJFDHCBbPADSXLBFHPBHcHJJCJSPCDERAFBBHPYFCGLLEFEGIFORMPEDOVOAFOLHHHILEJQIOAEJGGEAEbaPUfaCGKDFQLCADHFbGIDfMTCbOjBEhBWVYrBkBRKDBSJZICGHBDEDDIDNALJpBLbKVCPKNEJKlBGtBUdSLMfEdMRUpBSVcFQQIDGFCKMCQJEHQAOFMXWVcfWIDCGRENUKBZODGJBACGIHFHCFQKKEBHMHGJAHQNCHGDOCIVENSJCRWBKHEAINSNgBCQVGFIHEBDFBfQGJDTKZANMLYTKPEAEFEAELKDEVQNGLIDGPGDDMKHKjBKJObBJEJMJEKiBhBDNTJNc1BmBDAJMAcNaXQFODFNDJKXKDKRMBEUBKCABKDDIDCIUjBkBbQFIAOHEBQJGBKLOBIEEJGHODMDABSFIZQLCDKZERMjBCFGAUHEBKPKXaAIEIAENGJIDOAICCGHKDNSECeChBEDBAJRIBBAKEBfcFkBTWIYEUT2BIWGCDAGMIsCBYgBBJEXCAMEFCIHIKEJEBDJcJMBScJiBAIDGEGJPNDHKCFAAEUQCFHFGFBFDABDDGHHQAMIBSGIFIADDCAEECJGGCBKFCFKDAFBAGDABEMCCEPBEOFJHBPGDECEIFIEJCBKEEDCBCEFDFHDJALGNSIKAIHNRABGDHRCNEWEXAGGFAAIFFPBZMAIMKcEZALHHGAGEIDACIOGICWNTQKKBGBHfPJRJOMGAGEELHIWLBFMXIBIGGGABFOFQAIFJKTCBIIEFCJBJHBJLFNMRGMSQERBNIEKgBgBFADEBJHJCMDOCIDJENFJADNHLCHOMGDCBQJIEGdHFNFADIOQMCNCLGLKAELGAGZEAIHMECSFRMOCNAFBNIAKGILJRGTSHWFDEDDAShBBDRGNACIHIIEFBFICJFBLIRCCBDDSBIDDDMAGFBDTDlBOlBWxBQKGDGEEGBCLEIICRGlBLnBIEEDEBDHBzBGvBDCEDCbIIMVJZEKGjBEGCJECGMC_BHDCKKXFBBICFHHAMFBDNDWEGDJDAJJFfAFEHNDGDFHCCDJFPANLJCCBXBHCCGUEOKPDPGSSEIBKkBM2BDlBKcOLANHXAnBLHFCDTHAFLFRCOFAFVFIBDDJBBEJDDFNFDHgBHCBDFhBREABFdFfRZHCFJHfHFFRBBBGBRBFFKDHDDEHHbHFFBGBCdLPBLDJACGIALCVRNDJIAJHBJEBFHBCKQEeUSIUEABMCDDIFEEQBJIKM4BYIDCKOKSKQBJIEOCEOCLCAGWODAKQNJpBLLKCGOALELFDABJCJFBbUJDRKjBJDFfASGDIGENCAGGMPYFEKMIEHAVRGBAH1BHdUPEAELCWOUFCBDDOGKFOGTEMCFCJDrBEDAOGRCBCECFBADFAFIFCAIJBBGOCLEUCFECGUOSCDEKEHDAMEEMCFEGCSCODFFKEIBcIMMgBDWIGGHSTIEESCEEBEJGLFLAlBPTKDBKDDDVIzBFtBGNGEIVIQAEEMCxBEbKqBKaKeAEALECC2BMgBBJCEBDJFDODmCBUKQDBGfCAELINEBEKCOFBFGDMD2BBDITCVDRGBEMIDApCEXUxBS3BMQEISsCCeIQKIOqBYGDLDqBGkBMGBFDEADDKBCIQAbGQGQEEBFBEB2BE6BWDBEBiBHVFIDOCSIUDFDYDmBGmBDCBHFcDHDsDC-BLsCBwBF4BEoCR4CF2BPuBHYAiBHHGREACMCLCIIQAGGcCCIUHJJoBIKIUAFCCCOBcIMAUKcBOCCDDBvBNrBDPJNBbPKDHEeAFCCIgBIEGSACDKEEJSOQGwBKJFEDICSIEGYGRGGGeJWTSJeHOEHIGISGJCSEEBCNMBPJGDgBCOGGKoBAsBFgBJ0BFgCNwBBHESCgBFqBRFFZAPDAFLDMDqDD8BEmBIQJYBILKIYNEDDBTAyBbROBIYBHGCCJGDKLIAEIEBG4BGAESGIGHCTFFFnBAFBAFTARGQM2CMSBMReFADGDqBCuBNeBsBG-BDUCLGCEcNUDMGBEVGRDLIECJIiBCFEECUBOJWCJJeIPdIJSCDDQBAFnBCYRCELKaAGMHOHGIKcC0BWHCBKFEHHVACESIFCAGaEHFCAMGHEXBPIFBxBKRKBKMIOADCEERAHECOEEOGUBGGRCaOaE"],["9kD-hCzBMIGcAQL"],["_7C40CjBAJIOEkBDEH"],["rhDqvCIAGHPFXM"],["vmD2uCCDFHjBRbBHMUS"],["tjDguCMHPVFBRIAMKK"],["1iEugDZChBWSAMDOJQBED"],["r3DohDsCBSDHAHHhDCJECE"],["v7DgkDAHFDVITAFEEEMCeB"],["pwDygDPBdGFCBGOEcBSFAF"],["90D69CEHDHnBAxCQaQqBIoBJQJ"],["npEqiDSFAFFBjBAdENFZEtBAgDQ"],["9zEw-CRDXEeMoBIGAFF"],["zjEk7CjBQdIOIsBCiBFEBBJ"],["_8Du8CiBH8BGWDEFZFMAEDVDZNgBEWLBDYCEJNFIDFFGDADnBHXADIFDKLRFTCXQhBQXGTAlBQBEGIOEMBaNeCEKKDDILEICUBTGVBXIUEUFDGNEAEmBAECNC"],["jqDyxCQIQJYBMHuBLORHHqBEMFDBQDfN1BKBKXCAGJALDFJVHNLdHDCJW3BDBCKKcKDQMoBKMKCMDGHFD"],["z-Cs1CYFATDHXFjBBLAHKDICGUQ"],["tjDi8CyBAsBFkBPADIDLDrCEnBFTEHCHMXGAECCDEAESC"],["j6Dy_CBDIJDDCFLDUDCJLEJDCFIDPCCF7CAHGOCXECC8BMlEHJEaMwBDNAHECENCBCMGXCOGSBMFwBNGCPGWChBEQCfGDCCAqBGaHKADGME"],["phEkjDWBKFDFGBIEcEaFDFcASBQHJDEFYHGDFFfBZERM9BCFCACvBDfEJEEE2BACCDAPCaEhBCMEJEdHBCIIfAEK"],["7yDulDwBRCD4BDEBBHODaBPGBGGAiBBAFJDcBIFLLmBCOFOEYLrCNZJLCBGGGJBDBDLKBABFBXEGHHHLAlBQBBWPdINBMDJBzBEfGFCECkBC3BCPGUCdCJG0BGMGyBC7BEtBFFAGEFAnBDZEEGyBI5BDXILM0CDCEOCtBBnBGiBCXIAGIAcAOFmBA9BMKGKCkCCCCFCfCAEuBA"],["71DkgDUAWFCDNHWGkCEeHhBB0CFCBFBvCAuBFmBJEBBBPFeDECBEICSFSEIDME0BHCCFCEC2BEaGcBsBEkBDKDcAIDFBYBGHjBHeBKDVBPCIDFHhCFnBEFGAEPEGFHFjBDXEDDLENDnDAFCIKHCLFDEJBADNDnBCPECEJBADPAPGHKCCLIAEOKFIjBU1CDfKQExBGACUANEACkBE"],["n4DmiD0BFRFQFJFnCFAEZIcCrBIJGKCLImBCkBF"],["hqE0hDiBBFDrBDeFDHTBhCDfIBCECHGEEkBE"],["twE2gDCBhBFWHRBMHpBFBHHBdEIQDAPBFHNBIFPHFARIFJIDNFTAROFHHAbCTDJCEEBCLAUKiBCiDiB6CCGCNCWE"],["rnEi_CYBLHgBEMHAEIAFGGCqBBGJRVrBHdCZBPEZFjBDVF9BJtBCXGFCEC6BMwBAWIACrBDPCrBFFCAGQGVCFHNCGFDBVDPENFdITAXEOIuBCmBIzBDbCOEoCG1BALCECBEQE4BBnBEIIYCgBBQJsBAiBJHDUBUJuCBIEBEjBKQCAEdIDEmBOUCQBHFWNLF"],["t0D28CmBHsBCaDCDhBTLBEDZPzCASDIFTRtBABSNQBgBKCcDRKCEGC"],["55Di3CIAmBLWRUB1BPhBEfIBEPBHGHDNCDGEEWASIDIUDJIEGQCQD"],["jvE46CkBCMMWC8BLDFVHIBQGCDEAmBMAENEFECCaAyBRWhBQBUKPKVoBMCFECCmBFGESDcHQHUfUPCHHJCDkBPUFECBEqBNMAGFSAINFFLCFGFFXGNFCDBBhBEQHBJaMMAGBBHKBBHpBH3CEBCGGtBCHCBIJCfRjBBrBJzEHRODOrCEjBEXQDKoDKuCBoBCzCQ5CD_BCZKFCGE-COFACCcCLC9CFLCUIhBAPECKeKLIGEoCUsCMOAGDEL"],["11E08CWEEHWKqBAqCXKFzEhBPNbDJVFFhBDLCPHlBFjBYzBKVCEGGCBCaOCKQEJEAEoBYPGTSgEIuCL"],["l2D2-CHAFIQCIH"],["njD-gCJCQE"],["xiDmmCBAEKGCAH"],["1iDqmCJNBAEKBCLNJBIONLDCUSCIDNGEGMMH"],["_jDomCDACESG"],["hkD2qCDACEIA"],["_4Dm7CLCCGICKF"],["15Dm9CPBOGEB"],["56Dq8CbBREgCIGBDB"],["3wD42CDFHE"],["jxDw2CJGGA"],["z9Cu1CPEDGEEMBIH"],["liD-rCDBCCOC"],["3iDo1CFCAEMB"],["7_CovCZIIEUH"],["_wCmuCQBFDLADC"],["ruC6zCFAIGKA"],["p1CqrCDCIKGAID"],["93CmuCPCRKeDIF"],["hxC2sCVIBEaAGB"],["70C-2CLCOCEA"],["pjDo3CEDHBTACFfIQE"],["xhDk3CEBDBfDKG"],["7nD8yCGBDBFE"],["_iDi2CHEeMAEMCEDXP"],["ngDu2CLCBIaA"],["pxCstCIFLCBG"],["zsD03COACDJAVE"],["1oDoyCUDDBRAEEDCLBBGLIaFEB"],["nsD20CLECGDEKIMDAL"],["5pDgyCRGBKIAIFGH"],["5_Dg_CKBXFbBKGbAJCIEXCQEyBEGAEH"],["x-D4_CNAaGcA"],["_hE4_CMAaFPDjBAJKWCEA"],["3gE2hDJAOEEB"],["j_DkhDbCBEyBAID"],["lwD0_CPAPKYEKDDD"],["j4Ds-CdFFEaIQD"],["j3Dk9CVEOC"],["puEmhDdARIcGeJ"],["r3E2-CDCMG"],["9tE-_CzBCmBEQB"],["jiE69CfESKQAKBGH"],["plCugCFFRBCFIAAFlBpBBPYUCFICSAZPMCJHcCCFEGDPGGcMCHGCOCOFCFXNMADDKBDDLFqBKDJRHCDLDIAHHIFOOSELNAJCBGEGIGHPhBVBAUPLFCMWFMHELRBAEGPFRTTBFECCQGMMQIVADFFBVCMEAIjBJ_BIXFLCDMoBWfCMIBDIBMUQDDEEGHAAGIGIBFIUgBKEDEKGAGOOaIODCG"],["lkCg-BJDBE"],["zjCm-BEDLBAE"],["pmCy6BFBCMCB"],["n9Dg2CHDHCAKKAGD"],["_8Do2CFBDEEE"],["r9Dk4CLCDEQB"],["r3D-2CEBDFJAEEDEFHDCEI"],["t-D42CDACEFCMB"],["p_D41CREMGGBGD"],["1iEw1CTGSAGD"],["7mEo0CBDHGAIGB"],["jnE4zCMAFF"],["nsCimCHAEEGB"],["ltC-nCEFNG"],["t2C6pCHDCIEA"],["4burCIBDBCDJG"],["6a2rCFBDE"],["vwCurCBBLEDEIA"],["29EurBFEEC"],["ifoxCJAACOA"],["ulBo3CHAEEIB"],["mGssCDBBCAECACACB"],["kKmvCLCKC"],["yKyvCFCUC"],["0PsyCBCECKA"],["wPyyCBAEGGAAF"],["2Y43CODLAHG"],["qdw4CXJTBNG"],["ga03CPAKGGB"],["ggB-4CWDVDLE"],["wdm4CCDPFNEaI"],["gem4CFAHGGCGBGB"],["qRq1CKABBfHBEEC"],["mQ60CFBGIGC"],["8Vg3CUDEDFBAFRAPHLCGECIOCDE"],["iYy3CODXHHFdAMGMCCEOGEICA"],["2T21CMGEGOBAFTJlCHOIUCMGGKDCCGSKGDLHGJ"],["gTm2CIFHHbCFCIEKACEIAAE"],["iOixCTAKG"],["sGsrCADDABK"],["-OiyCHAGCEA"],["5iD--CLDNCcKGB"],["x5C2gDhBCUCWB"],["h4B0mDrCKXKmBE8BHGD"],["pXqmDPAVGAEMA"],["_V6jDRFXATGGEoBEWACD"],["3XuhDFAFQOCCL"],["nXi_CDBPSCKMB"],["vWo-CEHQBEDxBBJCCK"],["tWihDHAACKGIACBDD"],["tlBuoDmFL3HFBD0CE2DBsCEaJuDHIDDB7BJjIFLDEDKAkCEsDBWDMHgBCQKmCCIDDNRJ1BPFDEBKEuCQyBOSACFkCD2BQqCAoCDoBJjCNzBDIFJD5CHgBDVH9BD3BEbJBFGDcACBDNKAGFbFNHrBHIDfdADOAWI2BHIDFBbGVDKFuBJiBCGDBJJFrCGrBHdEJDcFGFKFYCqBHDDSJEJAHFDJBbGtBLXEWFcEIJJFIAKEIKQASPKBCHPDXCADjBDfGIKJCCFPDGDFFwCHFNFBjBAfHjBGjBOVFfKcNxBJvBIcHnBDIDuCKOEkBA0CTATJBAJlCQLILOvCNKBgCKGLVHEBWCyCTGFQAVJADEFEIWCEZGLjBDBQJPZAXILQLG1BOvBEBBCByBBGFBFlBJjCCQDBHnBJiDAEBDBlBJDBKBOI8BGsCH2BAEBDBdFADfBEFVAEDDBjBHEDRDFFfHtDPXANDTCEFPB1BQGHFBIHlBNPJBFVTLDJHVHZIILdLAEFCDHLADCJBDFNBJEIGAGUMhBEQFPNNEMFAFtCFWHBBXJPCRAABGHMCSPTFDFfEWHSCBHEHHDBDJBDFCDLHRALGUJJHpBBgBFFPGFCFTFMABDNhBNJhBEcHENHDZEMHJBHCCCNABEKKPJfICGQEIIZHZGDIMQFDhBL1BBAESGZABIREFIJEEEHIWIJATDBGEEdIAKUOXJpBiBDEEGDE0BIJACErBHFESOQAAEGCOAOJDKPCRSKPTFCGDBZVHIAMFSLImBOUEXDZJHAHGRABGGKLC4CiBpCbVBBKKKOIaCzBEHGEK0BOsCHVGKEBAfBXE3BLGMSO-BFQMACRFVBvBEOMSEoBFSCOIRBGQgBAJEVBMSSGFGIEtCAdKnBEVMQE2BB0BLgBBXICKTGeAPE_BEDEIGsBKhCDBCOGHABILGDGGCLBUPNHHBEDBDdDZEJEBGOQSKdFBEOCLEcEGGAGLGJBNCBEOECGFELBNGGIEAPQnBAWCCEBGSE7CgBMGJIrDSzCIVFREpBFVEVDVCBBQFHB5BGvBM4BK9BEJEIGjBHVKWGgCAQGSCmCDBEIEBCTGjBHjBEdFvBKSGtBBjBGZKIEDCKGgBEqDKECFCaEmDEWMUWYE_BDpBENEIIkDYgBCaFHIKE-BBOKDOeGuBAsDVpDa8FOkBHCDCPUIEIFCEI0CP2BAhBIVMBCmBAwBBkFXICDKEGMEDEvBMyEBWC_FENEOEeBgDKkCFmBK4CNIGfIqBG8FE"],["l0G6mCMBHB"],["nnClvCIHBDJABGLAfJXRFAIDDBEFdGDJDGHAPDbRZAEHNAHFQHJBLJABMHGAyBGCBHDJAEDFFDGLCJDBHNKXBBBILADDAXSTBEDRJMDCDLDZGHHEDJDKDbDEJHJGDHFeECDXHSBJHEAqBFBGKEmBCdFBDQDDJiBRGDCJSJBHHCHDQFUAABHFLBCFaCOPnBPQBOGIDCDDBjBDLDmBDYCCLDDVAAFODQCAHGFQCCDFJRENDrBGIDGJWBMFDFHDRCLFgBBfHUBWEEBLHxBCQNTFNITCCFBBbDWBIBDBpBFoBBCBDB3DV1DNjBL_BDpEGtCBDBGFkBPUF0DHBDXJzBJnHSnBDmFXDHLDhDB7CQvBQEFSJRABBGFOFgCNePOACIOC-EFGJTJtBDtCA6BFoCCcLYRuBCkBD-CKSHUDuBASHoDLgEFIBPB1CCjBD4BBCBvCDMBCBDFIDgBBuFG3CNiBRcAADPJGBuCB0EmBUC0BKmEI8CEoBDsBCIHPHBDMBuBC4BIkDqBgDM-BFyBGYKiFIMG6BE0GGcEGEjBEhHGJEAIDGNC9CFvBGxCOCMcQQIWESM8BMWA8DgB8FYwDCmBIoBBwBERIKIMEeWoBEgBDsBSBE_BBDCOEVECIiBO6BAGELKsBBkCQWUBGNBfIHIQEsBJOKSGLGECoBHYTeAIEEOJKEEkBAkBGKBEDTLAHsECYFaCMGGDGLIBsBS2BK8GUMGgBDaKoCTeByBWNECCQAKHUDwCCYGIBEH4BFOKWEIDFNIJGAiCCMOOKaJCBFDCBcDQEQMIAQFAFOHmCDsEc4BCwBKIEIMDINOEISGOCeBADRHCDgBAeXyBCUFcCsBPBGiBWGUOG4CSWK4BGiBIwBGCCFGKGgBDCBLFQHcCGLMIAMWKTCJGgBEeJWABQHCBGEG-BSmCGiCDqBPaDIFHDhBCOHDDXJOBYIkBCsBJUJyBE4CJoBG6FPwBGEDBHQPRLEHDBEJdDADMHDHNBVClBPcFqBCKDBJNNfNXXVlBPHCBeDaIAOSKuBGqBUcKGSMOoBQCMUKaEYFsBCKKIEKA6BScQCKUI2DU0BEIGoBOwBB8COkCA-CMyCHeIcF-BGYDWGSDGDUA-BMSKCGyBE0FXaHOAKDqBFuBQAIMI4CMYFaPmBHOHPLxBFDFGDqDQwCD8BIGB5BLKB-CKcKmCKiBDMCMKSCgBFIJcLkBBgBCUYiBKyBBgCGeHEHEAmBOwBLgBEkBHoBAyCLaCeHqBEEBCFSEIBCDZZCBIBmBKiBCiBNCFDFMD2BDkDEEBENGBKEoBBWDYEEQECgCboBHWASDSEqCLOJCHSFQHOVgBHEEJOBGIESCcLaBQG-DLYPwCRGIGCQRFDTAFFDLMCBHlCGOFqBHLLTFZGxBDbIQJiBHbFtBBKFdFHUNABFKPHDYThCANGJHVHBNFDbCfF0BDCFWJNLMDCHFDEHLHaDUNAHGDMBADOBEBBDRFaDeKEAGJWFiBBEDDDVAPG5BBvCLnBOFAAFSNdCNBNFGJZFODTDCBUBGBABnCLHBAB0CBFFOFXBSDALJF-BLgCREDlDHGDkCBmCI-CRIHMBUEUDNHXASD2DDiBHsJVYFAhH_hOAAiHgCA0CBSDmFB6DFuBF2FBkILnBMmBADC1KS4BElBGcGDC5BI5CB1BOjGWHEwBDyBCoEPwDCcDSF2BEkBFuDBwCIQEZE6CGiDWjCUeKlBI1CIUGyKKECtBGBElBERGQIsCEFEMCCCDCxDOpBIBG9CC_BMNEKE8BGQG1DCpBKHGKMCOICiBFmBG4BBkBDSFmCBwCN-BOXEDCCIyBJYEWHOBSCHIMCRGMEDIpBKVCxBBpBG2BKgDLSAlBMEEME0BCuBMwBC8BJNIeEeK0CEmBBQMkBG-BFmCE6CFwDI6GBqCE2BK-DDYYsBHABHDBDQDVHHNgDIECHIECDKGCSAkBFCHBFJFjBLEB0CAqDFkCKoCA4BBaJ8CEIEHCjCMSIDGtBARUpBEDECGQCkCFoCG9BKhDCRUKEeBEDJDEBoFAoCLuBEoBD4BGuCFSCIGBEUGSBIIOAYDNLGFoBCYFoBGgBLwDNkBEGEDOCCiBFJMAEGCmBFWHGHuCCEDPJEBmCI0BBqBKyEMiCMOKSUDITOBUHObcBOJIWEgBBQKBEPIKEEMKINKKMIGPCRBCSSGGLMCEDAYIEWACIBEGGSCDEeCFEAEIBCEBCaEJGAEMKcDBIWECIKDYGWMKK2BKaK6BMMA"],["y_Gy4CHGCE0BSAV"],["wWmqCWCCBHBDHzBRfAYBEDJBEJBLFDELFJCHVhBFDtBCCDHANHGLHFxBACOTWOBFIIACGTMNWDABKFABKJGAKHADaCEIBVGHIBOBFFDCHJLNBLGEFNDEBDBtBXbFRADGFDHCEGXGRIDIEIUFKGJBHGCISKxBPEQIGMBSGRCMKEGOGCJGKMEhBFJLdPCSUAPEFKUKPFFEDQoCEKHAGWEJEEGFJNBNGHFrBBLGAIOCPIAIUAWDeC7BEFECEIAIGOEIBUCECVBIIwBBGCFCWE1BBIKYGWAUJRMEGQCLGKEWABDCBWGMHeCDEEEYGFEKEJCLFGBDDjBJFAFIFAAEmBYmBOGCDAJBIKaIGDSEGGTFJEBCYWOCJGiBEQElBBBIGIQGOALESI0BElBCUMaHAEECRECGRDBAAGOGSALEcIMNBEGEFCBG2BGpBEkBKMMQCAIGEYFJIQCIIUCBPMQOGCNJJQIKBHICIWAEEIAUFFIRImBAQEKBEHMDBEEGoBSFGQGYFICMBVNHLCDOGCEqBWGCEDHHEABJQEMMKALEEEKEWBKBAFTFOBBPQUKEkBHMCIDBBeFAFbF5BCgBFEJQBGGIFKEiBDSEAGoBJDDbCDAMFYBADSEDLHDMEKG2CDsCTcNQBcJKABECAYLWFIRIBFNrBV5BJ9DObILBDCCCzBILGEEpBCYFBDQHOAAFSDLDeDYLEHHJHDQPCHEBDBAFIDYBUHIHsBHUGEGDIdEXQBGKCEGKCiBLmCLMGQCZWAKkBOgBGcQqBDQFDFMCKFAKQQBMFGTGSeBKhBQcDqBCgBDgBVADtBDZNaHOLYDuBIKSBGoBECCHECCQB-BS0BKMDDDIAMGNE6BQcAbDGBHHIHbHyBCODCGUIaEsBDoBOEBgBGMJJFAFaDGEAKYCSKDGHBTUeKiDFiBFeHBD0CPeNYHGCOIMQXARMDKPEVEFFDIGKMEDEGWFERBBEIGHCKI2BQOMSaOMMCBDEAqCAwBHJbJLRJeLEHATJHGRAhBmBPCBRLAJDHRFdXTBIJhBHLEMGPBPGjBBIHgBHyCFKEEI4BSKQcOAMNOIOUE2BGgBVDZYJuBCzBGBKEIOCNahCOXAXFfAHEEINMCEKQUQdYTKWQ2BMEEBMJKWAKHAFGFTNAFKFBDFDCDQDwBDaAcHcAECXCLIbCpBKPOgBGcHaCCCJGTBBEqBKkBA2BLEFgBJ6BAGBJHbHBJEHHHCHQUKCGBCLNPQDBISCKIXWQSAGNGVEVMxBKHIIKNGDGAEIEAE4FGkCIGDxBNADkBJdKAEuBGSINEZOVCQGUDOAfKZCQGSDIAWKCCTCCEaAmDS8EMvBACIGBGC-CCUBRHiBEEADDiBGGBuBKsBHLJEAMGAInBOwCCeDECdCGGHEEIgCU4BKkCHOFpCL6BAGDuBCUDfPJCAD0BAUK0DBiBFGBFDaAIJFDSECAFEKAMNMALNFGlBGULMCUFFFbL5DbCBDDbDjBNlBDVJTBTNVFWCgBMyBA4DWECFCnBBBCIGQCgBBEEQALDGDeFaCGEDEIBOJJHODBLLHGHOARGOKAIOEPGWE0BE8DDUDTBBDCD0BJwCBgBBIAHEYBSKLKEIuBEqBJABaEEBBDKBUIcBWFBDiBFTHQBKFhBFkBDEFAFDBNAvBMuBZICAGEBKFXDMBYTgBHICKHWGUOBEKMQMUNWFoBBiBIWAoBHiBJDESEPCOIWCQHgBCLIAINCiBKnBBBISG8BERKGCyBH6BAuDJAD5BCZFMDgDGdNDAKITEDHEDbABHIBiBEwBWuBBsBFSFCDlBDDDsBHWACBVHiBGaDULNAeFoEK-BByBDaFWLEHJREBqBHGTMHHJLDKASOBMCIYIqBEeCWF8CDiBKIAMFGNoBFMLmBCSIAEPSRCOIAKyCFeFGG2BDsBCoBJuCJuBPA9EVJlBHdEhBQVBcBGFFBnBGJDxBFuBEOEMHHDyBGCAALKFODIGKHBFIBCDCHLDIAEFCGEHSFCDFDMJBFLFDFnCMCINABFIDRB3CbbDHARLLCCFTFADnCXJTNEPQNGrBBjBFnBVBABGIUxBPBFDDPIRFCEPCPJDTLHADfVHNEHODADKKYFBFPLBDCRSDERLHHAHIQKPAFDCFRFPXELMRTJREPBbNHPIZREhBNLGADGDDHAJPX1BhBJSFsBJOV-CGiBMaiBYGGHMCCYAIIaAkBUaasCoBMMkBOeEFGSMHEIKIYQGYDAEIAnBKpBFNZADKDFFDAFGRBhCjBXDKQXDGIBGOOCKdHNKtBHXCNDPHBJXJNLdLZVFLgBDIDAFRBJCRDLENADDRFTEHFdAJIkBCKCDENARKhBBGCnBIXDGFPCBHIAHDJAJGdFlBILJHBTKjCAxBFVJRNfNNTRD1BdlBfhDvBAHYFmBADfSAEKFECCUELHUFXPcCYOAFLLICIICWYDUCQHGJOHaLCDHHNEQJALDDOJFLPLRfCZCBFHCLHVEDLVdTNTPNJTZdjBZZZLFNTNLtBXhBJRIPAAQNHDAGIHBZXRAGFDFTFTTBDCLBRNDhBXVFPHANFDAFQDWPqBhCAnBGAADNdbDDDCFNEBCNBBBCHLEEFHHFEEINLFCHHBIJGKCBCGCHADOMQDEKIHMBWLABCOKMBCFGGJKCEJQEELEJFBELGPLBGLEIGTCGEIMUGPEKUBKVIFFDIHEAEJFRCBDdHTJNLLBBFTDBGYIBEGITABGKEAIMESWDILGAEDDXCZZrBTHNHHbFJIJDJRELOHgBBGDGNDBBLOHSAGIQKBEUGkBPMAEEMFMAHNCDFDHEHAjBNJCEHHBBJJDBIFBDDIDhBbLRCDGAkBTKXOZANUHCJOHEHADFANGPARKRFaCEHiBTKPTDPJHHNCJFMCGFYGSLQFXNQGCFBNHEJDKHFAEDFHENNDBGBAHLHBEDJLAHLLHRHBDKDDDCMRRLLCIFKCBPCHPCEHLBDJJDCDBFVCDFFBGBCFPPHADJBEHDHCBHHDCBFDDJHCPHHCFFLENHHGDHLAEFDDNEEEPOAMDBFHILAPPFBGFLFCHFJICHDBNENLXBRLFGBHHHCDGABHIFFHPABECCLSCKKOJAHICFRDAGNCFKDAAJHCBFRBPHBJHDRCCJHHBJTNPnBMRYVAJFC8B5BICelBU9BBVGNCNDGFDEJDACRBCALFDBJjBRDHdLJKBJHGFDGAAFLAOHHJROQVFDVSMPAHZLPRNBGGDCCgBCIIEBGJGFBPQPEHFBCBEGKFKHJHAAWVeBDLMABVOfBCgBNEXHELFNCVNbFVNXEpBYCGbGFACGJKnBDCBKDABIDAAFKPIAQNUAMPWLILaXKXDjBEJAVONGNOdDFHKAFLAHDFIXM5BqBAOXcECHOJiCJSPSAIFECGJADKFEBIJGDIDEHFDCBUS6BFFBCBYKMCYGEJCCUDAEEDgBNYBKDLASHUEAHIDqBDECSEENBHYNMCNFNLHJKELVLNRDCCOFJJBBQDJFBCYBFHJJDCUOqBFaLWEAHGAQDPJGHMECIFIIPOEERGDACFBBFIEGDACIHHCGFIBJPUJOHwBBBLYLJJBLSBWBHLCOHADFDEFDFGPNTHCGKJFBEEODBDPJJBWAPFHJGBKAFDAELFABEDFAQDEBRFBFGBFFCBCGSJIADIFHJJHXFJJGVJPNLFCCBDDXHDACCBGJFBFGEEBbTZhBRJRRhBTDVTHRALXNGNHJZGVDLIbFIDDMJDZPbBVDFECCFAjBVBNbCHQFPCXFHHFTVLRITYJWBUEDCLCADOFITyBTcJUVuCRWFOGAHGEEFCNeHuBJqBEOBGDFBEAIIAHCFUKgBDSDEDGGEFAUMVBGKHCCGKEXAEBBDHLGBCHJPnBPTEROrBsBEGKFkBKMSAEFFJARHhBMPUQMVJDKBDJGHDAEDAJKFYREAQJOJABDMBhCFFDXITBBFhBCNDDCLBNCFDdIFGDFlBIPDJGnBERGLoBLOPCJBRFJJdJPIVCJIdOHMRIRCLMJYHECIHEBKTUDMTFTMICBCHCFRPDRCGRHCJHOBe5BAHSHBBIJeVFCIPBHDAcxBCBCEDUKYKGMJBPERFPHBGBDHMAGDEJKBWIuBDOEKGOUwBoBIQKGDbCZMVWVsBLMCGFchBOFAHRfRPRbJACIDALNFVEblBJHFDRFFjBFJJCLJJLDbCRJnBLNLBTjBPtCXbXZAXPXHtBDXVRAJFPBLGFBJWCSHMFmBDIHEGEDMGQBQDMLODOZWPcTqBZUNGRWHOCIFQCcXsBVUNENUCGDOtCuDTEBDM8BHLNxBHJRMTUDSRUFSDADLKNCNkBpBALMPEVyB1CYVJBBDIhBIHODYZEPMTABDCADERBRKzBSJMLECKJOXQ9BINMRCOIDGNoBPSXYPGPEAMNGBCEEDKRCFBFVLFHFACBYCMHQVSNaAiBQeDiBQMBiBIUBqBMcSSFFTCbDHGEIFHCJDDjBdxBJJHTPZHZpBhCtCvCtBbvBlBjCnCXjBPDBDBCAHDHFFNDHXJNNjBJFR3BCLcZJTALGAAHFRGTIJGbBDaNILDDEDHTGZBTEFFNEACrBEDBNEGCBCNJLBNVfHBCFdTlBLZLVRVdFCAFPFjBfLEEDBZMNKhBCdEBCOEHBNELJhBIADNRThCXVPHNKJEGBdN1BFLpBjBjBzBTXzClCxBZfBJLVEFHJAjBGRDbELBRLfARDVNbICEJGJADKJABJDGAKECAIXiBEGIBIKFehB0BX6BJOfcNWHYAMHIDWAcNiBDyBEGBOnB-BLcbyBPUJSDWEmBBaKOWyCOQEKQMMQGqBFQNaNmBOOCOVsBBMTiBeKXFHIDGCOPe5B-BXUMBRILSIBACJCHWKNIEHCCIFDFENcEDGAOOCcEHODIGREJKIEEBASHEQgBGuBLSECDADIICDECEHABFRIDSJECDFAAIDAHGCNZADEDDFAHGCHJDFMENHABGBFLBAGBFDATODIFUIEFBHGKCDEJBJQPMnBEKGJBDFpBBnBHHDFJbB5CnBxBOKCFCBGFHdGTBWAhBDPCBBMAhBFhCZbKjBStBqBTIBGRKRQdMAOHBFEDOHCDKGBIKLBAKGCHEAGHKJGAQDBJKPEFMAIDBDKDADFBOFDAEHCCIFACEQEHEFDDIQGhBFCGJBHGEIHBNKOGFEFBBcCEECEHGBICCEcCnBDLWGGHBNaHEDDDEQGYiBEiBOmBAmBDULOIGFBGOESJQDCADBCLSDBBJBCGqBYcGUQcHFEIoBiBEcOeiBYQkBKK4BQqBeMOWcAOJKEcScESecgCcWiBSoBYEBFEFYPMBaGMDSIEJmBBoBWSIQAOMmBO2BEOIWAMEmBAWJeISKSHMCBGKBSHkBGOIWGGBAFCEMBEPEBWMEAEHZXENQJEPPVZTAFKLQBAHKGMNBBYFUJSBWEiBHOHcDGJGTIHQHcBqBJsBZOAMEQQGQHYGQUQSIOAKGWBkBLAJIFUBOFeAORaCiBFwBNWBWHQEUMKAIIUENFSCEGQFQEKHJGFHKDEDIEBEOJ0BGYQuBqDOMDiBFGISFMQOAGFEZLbInBXjBFPGPOdKXCHXHCVFTGJQFATEHFDAEEVBDCWEKInBBCGKABELGFKGECKlBMECAKCCGDCHECQCJCFIKIHCCGFIIKfDEWWQWCIFKCECDEEAGABFqBCHGGEkBETCJGBCEI0CDIIiBSsBK2BBKEGABFIFKDUCGJIHQEKF2BLqBIgBFuBSMMCKNgB9BctBiBTENMNALKVIMGJCGEOHSGBGOSCCEDEGMAPMHAFKeABGgBKBIVDDAIEFAPFZBdNJCbFfTKIBGPJAHGLSPcGSBHNVBPENLZDFFPFRGGOBIZKLADCuBWBGFBJGbDZIBAIGREgBDKGJBLELWGJBLLAAGFFXDFLRPVFENHTTDCKFBFPEAJJDfDDLAHHBRPLUPAHILiBLDJfEZFJJTHVPCIWObBJKdGLFLEPJNCENOBGHRIFAIJAFLKHCAFIFJCDIPIAIJDBRejBHBAGJCBBCDCDEATHcHSLKDCDARTORFGLIAEFNDFGJCQrBRODADNBCBILOFBBJLOEMXUMMKAGGsBPAEIACGdKDDNCTDDIBFDARUOCAGLBTORcRKDEGADKEMASGQPGVU_BWaFfWTGPBBGdUDEOAROFULIJCNTDAHKFQMGFEHBJCFDfHAHKLDFDCBFGTuBZShBWRYLoBBAFJFADyChBURDPJGJORCHGJBLLFPYNCPVHBPJFJLNABEAGKMAEMGAITqBdKAIHIPBEGPCLSZARInBiBNEFAAGRQHAAKLejBOVEHBVRdHbTRFbININDZKfPHNCJILFBADEHtBZpBJNJIDLDlBrBGRQLbRLVEDZDLFRXNCNF9BALHTDHJLDPGHQFCAEIGHBTOCEDDVBNFdEPBIQDUEKDKKBFEPBBIKECKGEFDHJHBFEGWIIMWAGGUCOFSCGFCEIDAAGIGDCCEBKJBEILICGOIUCECAGWGaHwBE2BJkBEWFGEkBDUIKoBGGBCDDGkBKFGLGDJSPKGCDWZILOEIHECCQAJETACGLCBGrBIPBFGJEOEJGOARCAI6BMKBMJKESBEEUBFGBQJUYAELoBDWGJCCIwBQIGAUGIkCSgBAfGMCUFJGIAJIEGSOKaMAUMUGeCQFFEGKSCOAIJGGGDADCQCEYBYLTMLEDMJCAEMCAEJKFOEABKRIAoBUDKKGCGDCMFCDBJJLDHEOOiBCUSaGFHEDBHHJAPaFHHRBDNLAEDPJCJHHKBCHKFCBHFMCYHKECDJHCDWBQIMAUMSBQJKAKNaFBGXEDKWJoCQOKcIiBEaFLCILIDWCSKEKSCMGMMEIBJRNYBCUHOAiBAGMIEMMKgBGYPGHOFMCSKDWKWHCJFNEJMIGHABECEAIYEBCOEqBCCGgDJGGAKMDGGSAIGmBFCERKZAPIFGEBCEFEpBJJEZFAIFHRCEDLDDEvBNnBARHIILIFFLAAEGEDCEEdEBEHBFCDOIWBCECNQEMHEBIOSIADGeEBGMIqBQmBeeCBEECDGEObGBECEJBbCXDNEHBFCFJFACBJAAFNACFHCGFPNONTJJNhBJHFNCLJRBLHIABDLDJCCFBBGBPFJACDIDFDFLEFJABDEjBOBCDMCYNADKBIJ","s_B26BfNVDADFACDVHCHJCNHRBBDHEEFHNJPDEJJBHMDMJGVIOHhBKJCDadQLahBOHQDGHRANDJXCJHLFEBBDLAPKdKFgBDIJYNgBHwCOGAHDKBCGHoBCoBFKNGHDBIGGOBFECKTECJJMBOIaIJSAKFWCDGQAAIXSJYDCXBHDFLEBBRPcIaBIbELMLAAORcXICIEAuBBJCLMQSqBCeBRIQaDMEGJMPCNFlBK"]]};var gB=Math.PI/180;var k_="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",K_=Object.fromEntries([...k_].map((i,t)=>[i,t]));function Ku(i,t){let e=[],n=0,s=0,r=0,a=()=>{let o=0,l=1,c;do c=K_[i[n++]],o+=(c&31)*l,l*=32;while(c&32);return o%2?-(o+1)/2:o/2};for(;n<i.length;)s+=a(),r+=a(),e.push([s*t,r*t]);return e}var Fo=null;function Ju(){return Fo||(Fo=To.polys.map(i=>{let t=i.map(a=>Ku(a,To.q)),e=180,n=90,s=-180,r=-90;for(let[a,o]of t[0])a<e&&(e=a),a>s&&(s=a),o<n&&(n=o),o>r&&(r=o);return{rings:t,box:[e,n,s,r]}}),Fo)}var MB=To.source;function Wu(i,t,e={}){let{south:n=-58,north:s=74,west:r=-180,east:a=180}=e;return{w:i,h:t,south:n,north:s,west:r,east:a,x:c=>(c-r)/(a-r)*i,y:c=>(s-c)/(s-n)*t,lonLat:(c,h)=>[r+c/i*(a-r),s-h/t*(s-n)],k:i/(a-r)}}var Xu=(i={})=>{let{south:t=-58,north:e=74,west:n=-180,east:s=180}=i;return(s-n)/(e-t)};function qu(i,t,e,{sea:n="#dbe9f4",fill:s="#c9d8b6",stroke:r="#9db386"}={}){i.fillStyle=n,i.fillRect(0,0,t.w,t.h),i.beginPath();for(let{rings:a,box:o}of e)if(!(o[3]<t.south||o[1]>t.north))for(let l of a){i.moveTo(t.x(l[0][0]),t.y(l[0][1]));for(let c=1;c<l.length;c++)i.lineTo(t.x(l[c][0]),t.y(l[c][1]));i.closePath()}i.fillStyle=s,i.fill("evenodd"),r&&(i.strokeStyle=r,i.lineWidth=.6,i.lineJoin="round",i.stroke())}function Yu(i,t,e,n,s,r=1){let a=t.x(e[0]),o=t.y(e[1]),l=n*t.k,c=i.createRadialGradient(a,o,0,a,o,l);c.addColorStop(0,s),c.addColorStop(.45,s),c.addColorStop(1,"rgba(255,255,255,0)"),i.save(),i.globalAlpha=r,i.fillStyle=c,i.beginPath(),i.arc(a,o,l,0,Math.PI*2),i.fill(),i.restore()}function wo(i,t){return t>i.older?"not":t>i.nearer?"maybe":"yes"}function Qu(i,t){let e={i:0,first:0,tried:[],done:!1};return{state:e,items:i,buckets:t,current:()=>e.done?null:i[e.i],pick(n){if(e.done)return null;if(!t.includes(n))throw new Error(`Unknown bucket: ${n}`);let s=i[e.i];if(e.tried.includes(n))return{right:!1,repeat:!0};let r=s.answer===n;return r&&e.tried.length===0&&(e.first+=1),e.tried.push(n),{right:r,firstTry:r&&e.tried.length===1}},next(){if(e.done)return!1;let n=i[e.i];return e.tried.includes(n.answer)?(e.tried=[],e.i+1>=i.length?(e.done=!0,!0):(e.i+=1,!0)):!1},reset(){e.i=0,e.first=0,e.tried=[],e.done=!1}}}function J_(i){let t=vn(i),e=t.centers,n=i.querySelector("canvas"),s=n.getContext("2d"),r=i.querySelector(".wh-ce-slider"),a=i.querySelector(".wh-ce-when"),o=i.querySelector(".wh-ce-count"),l=i.querySelector(".wh-ce-list"),c=i.querySelector(".wh-ce-card"),h={ago:t.from,sel:null},d={what_en:"First farmed here",what_zh:"\u9019\u88E1\u6700\u65E9\u683D\u57F9\u3001\u755C\u990A\u7684",when_en:"Roughly when",when_zh:"\u5927\u7D04\u4EC0\u9EBC\u6642\u5019",...t.labels||{}},u={south:-58,north:72},f=null;l.innerHTML=e.map((p,B)=>`<button type="button" data-center="${p.key}" aria-pressed="false"><b>${B+1}</b><span>${ie(p.en,p.zh)}</span></button>`).join("");function g(){let p=n.clientWidth,B=Math.round(p/Xu(u)),v=Math.min(2,window.devicePixelRatio||1);if(!p)return;n.width!==Math.round(p*v)&&(n.width=Math.round(p*v),n.height=Math.round(B*v),n.style.height=`${B}px`),s.setTransform(v,0,0,v,0,0),f=Wu(p,B,u),qu(s,f,Ju());let x=0;e.forEach((M,b)=>{let E=wo(M,h.ago);E!=="not"&&(x+=1,Yu(s,f,M.at,M.r||9,E==="yes"?"#e89a1c":"#f1c56b",E==="yes"?.78:.42));let D=f.x(M.at[0]),I=f.y(M.at[1]),R=h.sel===M.key,P=R?12:9.5;s.beginPath(),s.arc(D,I,P,0,Math.PI*2),s.fillStyle=E==="not"?"#ffffff":E==="yes"?"#0e6b5c":"#c4861a",s.fill(),s.lineWidth=R?3:1.5,s.strokeStyle=R?"#1b1405":E==="not"?"#8fa0a8":"#ffffff",s.stroke(),s.fillStyle=E==="not"?"#5b6b73":"#ffffff",s.font=`800 ${R?13:11}px system-ui, sans-serif`,s.textAlign="center",s.textBaseline="middle",s.fillText(String(b+1),D,I+.5)});let y=bo(h.ago);a.innerHTML=ie(y.en.replace(/^about /,"About "),y.zh),o.textContent=`${x} / ${e.length}`,r.setAttribute("aria-valuetext",`${y.en} \xB7 ${y.zh}`),l.querySelectorAll("[data-center]").forEach(M=>{let b=e.find(E=>E.key===M.dataset.center);M.dataset.state=wo(b,h.ago),M.setAttribute("aria-pressed",h.sel===b.key)})}function A(p){h.sel=h.sel===p?null:p;let B=e.find(v=>v.key===h.sel);if(!B)c.innerHTML=c.dataset.idle;else{let v=Do(B.older,B.nearer);h.ago>B.older&&m(B.older,!0),c.innerHTML=`<h3>${ie(B.en,B.zh)}</h3><dl><div><dt>${ie(d.what_en,d.what_zh)}</dt><dd>${ie(B.crops_en,B.crops_zh)}</dd></div><div><dt>${ie(d.when_en,d.when_zh)}</dt><dd>${ie(B.when_en||v.en,B.when_zh||v.zh)}</dd></div></dl>`+(B.note_en?`<p class="wh-ce-note">${ie(B.note_en,B.note_zh)}</p>`:"")+(B.url?`<a class="wh-ce-src" href="${be(B.url)}" target="_blank" rel="noopener">${be(B.src)} &#8599;</a>`:B.src?`<p class="wh-ce-src">${be(B.src)}</p>`:"")}g()}function m(p,B){h.ago=Math.min(t.from,Math.max(t.to,p)),r.value=Math.round((t.from-h.ago)/(t.from-t.to)*1e3),B||g()}return c.dataset.idle=c.innerHTML,r.addEventListener("input",()=>{h.ago=t.from-r.value/1e3*(t.from-t.to),g()}),l.addEventListener("click",p=>{let B=p.target.closest("[data-center]");B&&A(B.dataset.center)}),n.addEventListener("click",p=>{if(!f)return;let B=n.getBoundingClientRect(),v=p.clientX-B.left,x=p.clientY-B.top,y=null,M=22;for(let b of e){let E=Math.hypot(f.x(b.at[0])-v,f.y(b.at[1])-x);E<M&&(M=E,y=b)}y&&A(y.key)}),i.querySelectorAll("[data-ce-jump]").forEach(p=>p.addEventListener("click",()=>m(Number(p.dataset.ceJump)))),new ResizeObserver(g).observe(n),m(t.start||t.from),i.__centers={state:h,setAgo:m,select:A,info:()=>({ago:h.ago,sel:h.sel,lit:e.filter(p=>wo(p,h.ago)!=="not").map(p=>p.key)})},i.__centers}oi("[data-wh-centers]",J_);function W_(i){let t=vn(i),e=Qu(t.items,t.buckets.map(g=>g.key)),n=g=>i.querySelector(g),s=n(".wh-so-k"),r=n(".wh-so-score"),a=n(".wh-so-q"),o=n(".wh-so-msg"),l=n(".wh-so-next"),c=n(".wh-so-steps"),h=[...i.querySelectorAll("[data-pick]")],d=0;function u(){let g=e.state,A=t.items.length;if(c.innerHTML=t.items.map((p,B)=>`<i class="${B<g.i||g.done?"is-done":B===g.i?"is-now":""}"></i>`).join(""),r.textContent=`${g.first} / ${d}`,g.done){s.innerHTML=ie("All done","\u5168\u90E8\u5B8C\u6210"),a.innerHTML=ie(t.end_en,t.end_zh),h.forEach(p=>{p.disabled=!0,p.classList.remove("is-right","is-wrong")}),o.innerHTML=ie(`You sorted ${g.first} of ${A} correctly on the first try.`,`${A} \u984C\u88E1\uFF0C\u4F60\u6709 ${g.first} \u984C\u7B2C\u4E00\u6B21\u5C31\u5206\u5C0D\u3002`),o.className="wh-so-msg is-ok",l.hidden=!1,l.innerHTML="Play again \xB7 \u518D\u73A9\u4E00\u6B21",l.dataset.act="reset";return}s.innerHTML=ie(`Question ${g.i+1} of ${A}`,`\u7B2C ${g.i+1} \u984C\uFF08\u5171 ${A} \u984C\uFF09`);let m=e.current();a.innerHTML=ie(m.en,m.zh),h.forEach(p=>{p.disabled=!1,p.classList.remove("is-right","is-wrong")}),o.innerHTML="",o.className="wh-so-msg",l.hidden=!0,l.dataset.act="next",l.innerHTML="Next \xB7 \u4E0B\u4E00\u984C"}function f(g){let A=e.current();if(!A)return null;let m=e.pick(g);if(!m||m.repeat)return m;let p=h.find(B=>B.dataset.pick===g);return m.right?(d+=1,p.classList.add("is-right"),h.forEach(B=>{B.disabled=!0}),o.className="wh-so-msg is-ok",o.innerHTML=ie(A.why_en,A.why_zh),r.textContent=`${e.state.first} / ${d}`,l.hidden=!1,l.focus()):(p.classList.add("is-wrong"),p.disabled=!0,o.className="wh-so-msg is-bad",o.innerHTML=ie(A.hint_en||"Not that one. Try another.",A.hint_zh||"\u4E0D\u662F\u9019\u4E00\u7A2E\uFF0C\u518D\u8A66\u8A66\u5225\u7684\u3002")),m}return i.addEventListener("click",g=>{let A=g.target.closest("button");A&&(A.dataset.pick?f(A.dataset.pick):A.dataset.act==="next"?(e.next(),u()):A.dataset.act==="reset"&&(e.reset(),d=0,u()))}),u(),i.__sort={game:e,pick:f,next(){e.next(),u()},reset(){e.reset(),d=0,u()}},i.__sort}oi("[data-wh-sort]",W_);function X_(i){let t=vn(i),e=Object.fromEntries(t.names.map(f=>[f.key,f.start])),n=t.max||9e3,s=f=>i.querySelector(f),r=s(".wh-ost-names"),a=s(".wh-ost-total"),o=f=>f.toLocaleString("en-US"),l=f=>t.names.find(g=>g.key===f);r.innerHTML=t.names.map(f=>`<li data-name="${f.key}">
      <span class="wh-ost-who">${ie(f.en,f.zh)}</span>
      <span class="wh-ost-bar"><i aria-hidden="true"></i><b aria-hidden="true" style="left:${t.need/n*100}%"></b>
        <input type="range" min="0" max="${n}" step="100" value="${f.start}" aria-label="${be(`Ostraka with the name ${f.en}`)} \xB7 ${be(`\u5BEB\u8457${f.zh}\u7684\u9676\u7247`)}"></span>
      <output class="wh-ost-n"></output></li>`).join("");function c(){return t.rules.map(f=>({rule:f.key,...Nu(e,f.key,t.need)}))}function h(){t.names.forEach(m=>{let p=r.querySelector(`[data-name="${m.key}"]`);p.querySelector(".wh-ost-n").textContent=o(e[m.key]),p.querySelector(".wh-ost-bar i").style.width=`${e[m.key]/n*100}%`,p.querySelector(".wh-ost-bar").classList.toggle("is-over",e[m.key]>=t.need)});let f=c();a.textContent=o(f[0].total),f.forEach(m=>{let p=i.querySelector(`[data-rule="${m.rule}"]`),B=p.querySelector(".wh-ost-out"),v=t.result[m.reason],x=m.exiled?l(m.exiled):null;B.innerHTML=x?ie(v.en.replace("{name}",x.en),v.zh.replace("{name}",x.zh)):ie(v.en,v.zh),p.dataset.out=m.exiled?"exiled":"none"});let g=f[0].exiled===f[1].exiled,A=s(".wh-ost-diff");A.innerHTML=g?ie(t.same_en,t.same_zh):ie(t.differ_en,t.differ_zh),A.dataset.same=g}function d(f,g){if(f in e){e[f]=Math.max(0,Math.min(n,Math.round(g/100)*100));let A=r.querySelector(`[data-name="${f}"] input`);A.value=e[f],h()}}function u(f){let g=t.scenarios[f];g&&(Object.keys(e).forEach(A=>{var m;e[A]=(m=g.votes[A])!=null?m:0,r.querySelector(`[data-name="${A}"] input`).value=e[A]}),h())}return r.addEventListener("input",f=>{let g=f.target.closest("[data-name]");g&&(e[g.dataset.name]=+f.target.value,h())}),i.addEventListener("click",f=>{let g=f.target.closest("[data-scenario]");g&&u(+g.dataset.scenario)}),h(),i.__ost={set:d,scenario:u,results:c,votes:e},i.__ost}oi("[data-wh-ostraka]",X_);var Ro=["people","citizens","pnyx","vote"],Go=.85,Ln=new F(-30,0,-26),Pn={r0:3.2,r1:16,angle:2.3,gap:.95,rise:.32},Lo={people:[[4,62,96],[0,0,4]],citizens:[[4,62,96],[0,0,4]],pnyx:[[-30,11,-14],[-30,.8,-31]],vote:[[-30,8.5,-16],[-30,1.2,-30.5]]};function q_(i){let t=vn(i),e=Z=>i.querySelector(Z),n=e(".al-space-cv"),s=e(".al-space"),r=e(".wh-as-share"),a=e(".al-play"),o=Lu(t.groups,t.per),l=o.reduce((Z,rt)=>Z+rt,0),c=t.groups.findIndex(Z=>Z.vote),h=Math.min(o[c],Math.round(t.seats/t.per)),d={mode:"people",share:.6,touring:!1,t:0},u=0,f=0,g=0,A=!0,m=0,p=[],B=[],v=[];{let Z=0,rt=[];o.forEach(J=>{let W=Math.max(4,Math.ceil(Math.sqrt(J*.55))),ot=Pu(J,W,Go),mt=(W-1)*Go;rt.push({b:ot,w:mt}),Z+=mt+6});let yt=-(Z-6)/2;rt.forEach(({b:J,w:W},ot)=>{J.forEach(mt=>{p.push(new F(yt+W/2+mt.x,0,14+mt.z)),B.push(ot)}),rt[ot].cx=yt+W/2,yt+=W+6});let Dt=_c(h,Pn),Kt=0;p.forEach((J,W)=>{if(B[W]===c&&Kt<Dt.length){let ot=Dt[Kt++];v.push(new F(Ln.x+ot.x,ot.y+.5,Ln.z+ot.z))}else v.push(null)}),d.blocks=rt.map(J=>J.cx)}let x=v.map((Z,rt)=>Z?rt:-1).filter(Z=>Z>=0),y=Ec(x.length,d.share),M=null;try{let ot=function(){return Math.max(60,...p.map(O=>Math.abs(O.x)*2+8))},N=function(){let O=s.clientWidth,Y=s.clientHeight;!O||!Y||(Z.setSize(O,Y,!1),yt.aspect=O/Y,yt.fov=O/Y<1.1?44:36,yt.updateProjectionMatrix())},Z=new Bo({canvas:n,antialias:!0,alpha:!0});Z.setPixelRatio(Math.min(window.devicePixelRatio||1,2));let rt=new ws,yt=new Re(36,1,.5,600),Dt=new vo(yt,n);Dt.enablePan=!1,Dt.enableDamping=!0,Dt.minDistance=8,Dt.maxDistance=170,Dt.maxPolarAngle=Math.PI*.46,yt.position.set(...Lo.people[0]),Dt.target.set(...Lo.people[1]),rt.add(new Qs(16774884,8022602,1),new $s(16777215,.25));let Kt=new js(16777215,1.6);Kt.position.set(-40,60,30),rt.add(Kt);let J=new _e(new Qn(300,300),new Ze({color:"#cdbb84"}));J.rotation.x=-Math.PI/2,rt.add(J);let W=new _e(new Qn(ot(),40),new Ze({color:"#b9b073"}));W.rotation.x=-Math.PI/2,W.position.set(0,.01,14),rt.add(W);let mt=new En;mt.position.copy(Ln),rt.add(mt);let pt=new Ze({color:"#b9a98a"}),Ot=Math.max(..._c(h,Pn).map(O=>O.row))+2;for(let O=0;O<Ot;O++){let Y=Pn.r0-Pn.gap/2+O*Pn.gap,ht=Y+Pn.gap,dt=Math.PI/2-Pn.angle/2-.05,Q=Math.PI/2+Pn.angle/2+.05,tt=new ji;tt.absarc(0,0,ht,dt,Q,!1),tt.absarc(0,0,Math.max(.1,Y),Q,dt,!0);let gt=new qs(tt,{depth:.5+O*Pn.rise,bevelEnabled:!1,curveSegments:24}),Ft=new _e(gt,pt);Ft.rotation.x=-Math.PI/2,mt.add(Ft)}let $t=new _e(new Rn(2.2,1.3,1.6),new Ze({color:"#9e8f72"}));$t.position.set(0,.65,.4),mt.add($t);let $=new En;$.position.set(34,0,-44),rt.add($);let at=new _e(new Yn(9,13,7,9),new Ze({color:"#a89878"}));at.position.y=3.5,$.add(at);let ct=new _e(new Rn(6,2.2,3),new Ze({color:"#efe6d2"}));ct.position.y=8.1,$.add(ct);let lt=new _e(new Hs(2.4,1.2,4),new Ze({color:"#d9c9a6"}));lt.scale.set(1.35,1,.75),lt.rotation.y=Math.PI/4,lt.position.y=9.8,$.add(lt);let ft=new Yn(.17,.26,.62,7);ft.translate(0,.31,0);let Nt=new ts(.15,8,6);Nt.translate(0,.78,0);let Lt=gc([ft,Nt]),Ht=new Yi(Lt,new Ze({color:"#ffffff"}),l);rt.add(Ht);let kt=new Yn(.05,.05,.5,5);kt.translate(0,.25,0);let T=new ts(.09,6,5);T.translate(0,.52,0);let ee=new Yi(gc([kt,T]),new Ze({color:"#f4d3b0"}),Math.max(1,x.length));rt.add(ee);let Zt=t.groups.map(O=>new Xt(O.color)),S=Ru(e(".al-labels"),n,yt),_={groups:t.groups.map(O=>S.add("wh-lab wh-lab-region",ie(O.short_en||O.en,O.short_zh||O.zh))),pnyx:S.add("wh-lab wh-lab-fa","The Pnyx<i>\u666E\u5C3C\u514B\u65AF\u5C71</i>"),acro:S.add("wh-lab","Toward the Acropolis<i>\u5F80\u885B\u57CE\uFF08\u4E0D\u7167\u6BD4\u4F8B\uFF09</i>"),bema:S.add("wh-lab","Speakers\u2019 platform<i>\u8B1B\u53F0</i>")};new ResizeObserver(()=>{N(),V()}).observe(s),Dt.addEventListener("change",()=>H()),M={renderer:Z,scene:rt,camera:yt,controls:Dt,people:Ht,hands:ee,colors:Zt,labs:S,L:_,dummy:new De,camFrom:null,camTo:null,camT:1},N(),Dt.update()}catch(Z){M=null,window.console&&console.warn("World History assembly model: 3D is off",Z)}M||i.classList.add("al-nogl","wh-nogl");let b=Z=>Z<0?0:Z>1?1:Z*Z*(3-2*Z),E=new Xt("#8d8a80"),D=new Xt;function I(){if(!M)return;let{people:Z,hands:rt,dummy:yt,colors:Dt}=M,Kt=d.mode==="pnyx"||d.mode==="vote";for(let W=0;W<l;W++){let ot=p[W],mt=v[W],pt=mt&&Kt?b(d.t*1.6-W%37/60):0;if(mt&&pt>0){let $t=ot.clone().lerp(mt,pt);$t.y=ot.y*(1-pt)+mt.y*pt+Math.sin(pt*Math.PI)*2.5,yt.position.copy($t),yt.lookAt(Ln.x,$t.y,Ln.z)}else yt.position.copy(ot),yt.rotation.set(0,0,0);yt.scale.setScalar(1),yt.updateMatrix(),Z.setMatrixAt(W,yt.matrix);let Ot=d.mode!=="people"&&B[W]!==c;D.copy(Dt[B[W]]),Ot&&D.lerp(E,.75).multiplyScalar(.8),Z.setColorAt(W,D)}Z.instanceMatrix.needsUpdate=!0,Z.instanceColor&&(Z.instanceColor.needsUpdate=!0);let J=d.mode==="vote";x.forEach((W,ot)=>{let mt=v[W],pt=J&&y[ot]&&b(d.t*1.6-W%37/60)>=.98;yt.position.set(mt.x+.2,mt.y+.6,mt.z),yt.rotation.set(0,0,0),yt.scale.setScalar(pt?1:1e-4),yt.updateMatrix(),rt.setMatrixAt(ot,yt.matrix)}),rt.instanceMatrix.needsUpdate=!0}let R=Z=>Math.round(Z).toLocaleString("en-US");function P(){let Z=t.groups,rt=Z.reduce((mt,pt)=>mt+pt.use,0),yt=Z[c].use;e(".wh-as-voters").textContent=`${Math.round(yt/rt*100)}%`,e(".wh-as-seats").textContent=`${Math.round(t.seats/yt*100)}%`;let Dt=Math.round(x.length*d.share),Kt=x.length-Dt;e(".wh-as-yes").textContent=`${Math.round(d.share*100)}%`;let J=Cc(Dt,Kt,t.margin),W=t.judge[J],ot=e(".wh-as-judge");ot.innerHTML=ie(W.en,W.zh),ot.dataset.result=J,r.setAttribute("aria-valuetext",`${Math.round(d.share*100)}% raise their hands \xB7 ${Math.round(d.share*100)}% \u8209\u624B`),i.querySelectorAll("[data-mode]").forEach(mt=>mt.setAttribute("aria-pressed",mt.dataset.mode===d.mode)),i.querySelectorAll("[data-mode-card]").forEach(mt=>{mt.hidden=mt.dataset.modeCard!==d.mode}),e(".wh-as-voterow").hidden=d.mode!=="vote",i.dataset.mode=d.mode,I()}function V(){if(!M)return;let{labs:Z,L:rt,camera:yt}=M,Dt=d.mode==="people"||d.mode==="citizens";t.groups.forEach((Kt,J)=>{let W=o[J],ot=Math.max(4,Math.ceil(Math.sqrt(W*.55))),mt=Math.ceil(W/ot),pt=yt.aspect<1.1&&J%2===1;Z.place(rt.groups[J],new F(d.blocks[J],1.5,pt?14+mt*Go/2+2.2:14-mt*Go/2-1.2),Dt),rt.groups[J].dataset.state=d.mode!=="people"&&J!==c?"maybe":""}),Z.place(rt.pnyx,new F(Ln.x,6.5,Ln.z-12),!0),Z.place(rt.acro,new F(34,12,-44),Dt),Z.place(rt.bema,new F(Ln.x,2.2,Ln.z+1.6),!Dt),M.renderer.render(M.scene,yt)}function w(Z){if(!M)return;let[rt,yt]=Lo[Z];M.camFrom=[M.camera.position.clone(),M.controls.target.clone()],M.camTo=[new F(...rt),new F(...yt)],M.camT=0}function z(Z){u=0;let rt=Math.min(.05,f?(Z-f)/1e3:.016);f=Z;let yt=!1;if(M&&M.camT<1){M.camT=Math.min(1,M.camT+rt/1.6);let Dt=b(M.camT);M.camera.position.lerpVectors(M.camFrom[0],M.camTo[0],Dt),M.controls.target.lerpVectors(M.camFrom[1],M.camTo[1],Dt),yt=!0}if(d.t<1.2&&(d.t=Math.min(1.2,d.t+rt/3),I(),yt=!0),d.touring&&Z-m>6500){let Dt=Ro.indexOf(d.mode);Dt===Ro.length-1?X(!1):(U(Ro[Dt+1]),m=Z),yt=!0}M&&M.controls.update(),V(),g=yt||d.touring?0:g+1,A&&g<90&&(u=requestAnimationFrame(z))}function H(){g=0,!u&&A&&(f=0,u=requestAnimationFrame(z))}new IntersectionObserver(Z=>{A=Z[0].isIntersecting,A&&H()}).observe(i);function U(Z,rt=!1){if(!Ro.includes(Z))return;let yt=d.mode==="pnyx"||d.mode==="vote";if((Z==="pnyx"||Z==="vote")&&!yt&&(d.t=0),Z==="vote"&&d.mode!=="vote"&&(d.t=Math.min(d.t,.6)),d.mode=Z,rt){if(d.t=1.2,M){let[Kt,J]=Lo[Z];M.camera.position.set(...Kt),M.controls.target.set(...J),M.camT=1,M.controls.update()}}else w(Z);P(),H()}function it(Z){d.share=Math.min(1,Math.max(0,Z)),r.value=Math.round(d.share*100),y=Ec(x.length,d.share),P(),H()}function X(Z){d.touring=Z,m=performance.now(),a.setAttribute("aria-pressed",Z),a.querySelector(".al-play-t").textContent=Z?"Stop \xB7 \u505C":"Take the tour \xB7 \u5F9E\u982D\u770B\u4E00\u904D",i.classList.toggle("is-playing",Z),Z&&U("people"),H()}r.addEventListener("input",()=>it(r.value/100)),a.addEventListener("click",()=>X(!d.touring)),i.addEventListener("click",Z=>{let rt=Z.target.closest("[data-mode]");rt&&(d.touring&&X(!1),U(rt.dataset.mode))}),M&&e(".al-home").addEventListener("click",()=>{w(d.mode),H()});let j={people:()=>U("people"),citizens:()=>U("citizens"),pnyx:()=>U("pnyx"),vote:()=>{U("vote"),it(.52)}},nt={state:d,mode:U,share:it,tour:X,demo(Z){j[Z]&&j[Z]()},info(){let Z=Math.round(x.length*d.share);return{mode:d.mode,figures:l,per:t.per,attend:x.length,share:d.share,judge:Cc(Z,x.length-Z,t.margin),webgl:!!M}},render(){I(),P(),V()},settle(){d.t=1.2,M&&(M.camT=.999),I(),H()},ready:()=>!0};return P(),i.__lab=nt,nt}Gu("[data-wh-assembly-lab]",q_,{demo:(i,t)=>i.demo(t)});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
