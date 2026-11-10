(()=>{var Zn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},$n={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Rc=0,ko=1,Lc=2;var Gs=1,Gc=2,Xi=3,jn=0,Te=1,Ve=2,An=0,Yi=1,Ps=2,zo=3,Vo=4,Pc=5;var fi=100,Nc=101,Oc=102,Hc=103,Uc=104,kc=200,zc=201,Vc=202,Kc=203,Ko=204,Jo=205,Jc=206,Wc=207,Xc=208,Yc=209,qc=210,Qc=211,Zc=212,$c=213,jc=214,vr=0,Sr=1,Dr=2,Oi=3,br=4,Ir=5,Tr=6,Fr=7,Wo=0,th=1,eh=2,dn=0,Xo=1,Yo=2,qo=3,Qo=4,Zo=5,$o=6,jo=7;var tl=300,ti=301,pi=302,ra=303,aa=304,Ns=306,wr=1e3,xn=1001,Rr=1002,De=1003,nh=1004;var Os=1005;var Ie=1006,oa=1007;var ei=1008;var Ze=1009,el=1010,nl=1011,qi=1012,la=1013,fn=1014,pn=1015,mn=1016,ca=1017,ha=1018,Qi=1020,il=35902,sl=35899,rl=1021,al=1022,en=1023,Bn=1026,ni=1027,ol=1028,ua=1029,ii=1030,da=1031;var fa=1033,Hs=33776,Us=33777,ks=33778,zs=33779,pa=35840,ma=35841,ga=35842,_a=35843,Ea=36196,Ca=37492,xa=37496,Ba=37488,Aa=37489,Vs=37490,ya=37491,Ma=37808,va=37809,Sa=37810,Da=37811,ba=37812,Ia=37813,Ta=37814,Fa=37815,wa=37816,Ra=37817,La=37818,Ga=37819,Pa=37820,Na=37821,Oa=36492,Ha=36494,Ua=36495,ka=36283,za=36284,Ks=36285,Va=36286;var fs=2300,Lr=2301,yr=2302,Lo=2303,Go=2400,Po=2401,No=2402;var ih=3200;var ll=0,sh=1,wn="",Ue="srgb",ps="srgb-linear",ms="linear",re="srgb";var Mr=7680;var rh=519,ah=512,oh=513,lh=514,Ka=515,ch=516,hh=517,Ja=518,uh=519,dh=35044;var cl="300 es",cn=2e3,gs=2001;function Pu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Nu(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function _s(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function fh(){let i=_s("canvas");return i.style.display="block",i}var oc={},Hi=null;function hl(...i){let t="THREE."+i.shift();Hi?Hi("log",t,...i):console.log(t,...i)}function ph(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Rt(...i){i=ph(i);let t="THREE."+i.shift();if(Hi)Hi("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Pt(...i){i=ph(i);let t="THREE."+i.shift();if(Hi)Hi("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function hi(...i){let t=i.join(" ");t in oc||(oc[t]=!0,Rt(...i))}function mh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var gh={[vr]:Sr,[Dr]:Tr,[br]:Fr,[Oi]:Ir,[Sr]:vr,[Tr]:Dr,[Fr]:br,[Ir]:Oi},un=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},we=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],lc=1234567,us=Math.PI/180,Ui=180/Math.PI;function Zi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(we[i&255]+we[i>>8&255]+we[i>>16&255]+we[i>>24&255]+"-"+we[t&255]+we[t>>8&255]+"-"+we[t>>16&15|64]+we[t>>24&255]+"-"+we[e&63|128]+we[e>>8&255]+"-"+we[e>>16&255]+we[e>>24&255]+we[n&255]+we[n>>8&255]+we[n>>16&255]+we[n>>24&255]).toLowerCase()}function Wt(i,t,e){return Math.max(t,Math.min(e,i))}function ul(i,t){return(i%t+t)%t}function Ou(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Hu(i,t,e){return i!==t?(e-i)/(t-i):0}function ds(i,t,e){return(1-e)*i+e*t}function Uu(i,t,e,n){return ds(i,t,1-Math.exp(-e*n))}function ku(i,t=1){return t-Math.abs(ul(i,t*2)-t)}function zu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Vu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Ku(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Ju(i,t){return i+Math.random()*(t-i)}function Wu(i){return i*(.5-Math.random())}function Xu(i){i!==void 0&&(lc=i);let t=lc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Yu(i){return i*us}function qu(i){return i*Ui}function Qu(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Zu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function $u(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ju(i,t,e,n,s){let r=Math.cos,a=Math.sin,l=r(e/2),o=a(e/2),c=r((t+n)/2),d=a((t+n)/2),f=r((t-n)/2),h=a((t-n)/2),m=r((n-t)/2),_=a((n-t)/2);switch(s){case"XYX":i.set(l*d,o*f,o*h,l*c);break;case"YZY":i.set(o*h,l*d,o*f,l*c);break;case"ZXZ":i.set(o*f,o*h,l*d,l*c);break;case"XZX":i.set(l*d,o*_,o*m,l*c);break;case"YXY":i.set(o*m,l*d,o*_,l*c);break;case"ZYZ":i.set(o*_,o*m,l*d,l*c);break;default:Rt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Pi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function He(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var dl={DEG2RAD:us,RAD2DEG:Ui,generateUUID:Zi,clamp:Wt,euclideanModulo:ul,mapLinear:Ou,inverseLerp:Hu,lerp:ds,damp:Uu,pingpong:ku,smoothstep:zu,smootherstep:Vu,randInt:Ku,randFloat:Ju,randFloatSpread:Wu,seededRandom:Xu,degToRad:Yu,radToDeg:qu,isPowerOfTwo:Qu,ceilPowerOfTwo:Zu,floorPowerOfTwo:$u,setQuaternionFromProperEuler:ju,normalize:He,denormalize:Pi},_l=class _l{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Wt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};_l.prototype.isVector2=!0;var Ot=_l,Ye=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,l){let o=n[s+0],c=n[s+1],d=n[s+2],f=n[s+3],h=r[a+0],m=r[a+1],_=r[a+2],y=r[a+3];if(f!==y||o!==h||c!==m||d!==_){let p=o*h+c*m+d*_+f*y;p<0&&(h=-h,m=-m,_=-_,y=-y,p=-p);let u=1-l;if(p<.9995){let x=Math.acos(p),v=Math.sin(x);u=Math.sin(u*x)/v,l=Math.sin(l*x)/v,o=o*u+h*l,c=c*u+m*l,d=d*u+_*l,f=f*u+y*l}else{o=o*u+h*l,c=c*u+m*l,d=d*u+_*l,f=f*u+y*l;let x=1/Math.sqrt(o*o+c*c+d*d+f*f);o*=x,c*=x,d*=x,f*=x}}t[e]=o,t[e+1]=c,t[e+2]=d,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,a){let l=n[s],o=n[s+1],c=n[s+2],d=n[s+3],f=r[a],h=r[a+1],m=r[a+2],_=r[a+3];return t[e]=l*_+d*f+o*m-c*h,t[e+1]=o*_+d*h+c*f-l*m,t[e+2]=c*_+d*m+l*h-o*f,t[e+3]=d*_-l*f-o*h-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,l=Math.cos,o=Math.sin,c=l(n/2),d=l(s/2),f=l(r/2),h=o(n/2),m=o(s/2),_=o(r/2);switch(a){case"XYZ":this._x=h*d*f+c*m*_,this._y=c*m*f-h*d*_,this._z=c*d*_+h*m*f,this._w=c*d*f-h*m*_;break;case"YXZ":this._x=h*d*f+c*m*_,this._y=c*m*f-h*d*_,this._z=c*d*_-h*m*f,this._w=c*d*f+h*m*_;break;case"ZXY":this._x=h*d*f-c*m*_,this._y=c*m*f+h*d*_,this._z=c*d*_+h*m*f,this._w=c*d*f-h*m*_;break;case"ZYX":this._x=h*d*f-c*m*_,this._y=c*m*f+h*d*_,this._z=c*d*_-h*m*f,this._w=c*d*f+h*m*_;break;case"YZX":this._x=h*d*f+c*m*_,this._y=c*m*f+h*d*_,this._z=c*d*_-h*m*f,this._w=c*d*f-h*m*_;break;case"XZY":this._x=h*d*f-c*m*_,this._y=c*m*f-h*d*_,this._z=c*d*_+h*m*f,this._w=c*d*f+h*m*_;break;default:Rt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],l=e[5],o=e[9],c=e[2],d=e[6],f=e[10],h=n+l+f;if(h>0){let m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(d-o)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>l&&n>f){let m=2*Math.sqrt(1+n-l-f);this._w=(d-o)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(l>f){let m=2*Math.sqrt(1+l-n-f);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(o+d)/m}else{let m=2*Math.sqrt(1+f-n-l);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(o+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Wt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,l=e._x,o=e._y,c=e._z,d=e._w;return this._x=n*d+a*l+s*c-r*o,this._y=s*d+a*o+r*l-n*c,this._z=r*d+a*c+n*o-s*l,this._w=a*d-n*l-s*o-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,l=this.dot(t);l<0&&(n=-n,s=-s,r=-r,a=-a,l=-l);let o=1-e;if(l<.9995){let c=Math.acos(l),d=Math.sin(c);o=Math.sin(o*c)/d,e=Math.sin(e*c)/d,this._x=this._x*o+n*e,this._y=this._y*o+s*e,this._z=this._z*o+r*e,this._w=this._w*o+a*e,this._onChangeCallback()}else this._x=this._x*o+n*e,this._y=this._y*o+s*e,this._z=this._z*o+r*e,this._w=this._w*o+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},El=class El{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(cc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(cc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,l=t.z,o=t.w,c=2*(a*s-l*n),d=2*(l*e-r*s),f=2*(r*n-a*e);return this.x=e+o*c+a*f-l*d,this.y=n+o*d+l*c-r*f,this.z=s+o*f+r*d-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,l=e.y,o=e.z;return this.x=s*o-r*l,this.y=r*a-n*o,this.z=n*l-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return fo.copy(this).projectOnVector(t),this.sub(fo)}reflect(t){return this.sub(fo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Wt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};El.prototype.isVector3=!0;var H=El,fo=new H,cc=new Ye,Cl=class Cl{constructor(t,e,n,s,r,a,l,o,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,l,o,c)}set(t,e,n,s,r,a,l,o,c){let d=this.elements;return d[0]=t,d[1]=s,d[2]=l,d[3]=e,d[4]=r,d[5]=o,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],l=n[3],o=n[6],c=n[1],d=n[4],f=n[7],h=n[2],m=n[5],_=n[8],y=s[0],p=s[3],u=s[6],x=s[1],v=s[4],A=s[7],C=s[2],M=s[5],I=s[8];return r[0]=a*y+l*x+o*C,r[3]=a*p+l*v+o*M,r[6]=a*u+l*A+o*I,r[1]=c*y+d*x+f*C,r[4]=c*p+d*v+f*M,r[7]=c*u+d*A+f*I,r[2]=h*y+m*x+_*C,r[5]=h*p+m*v+_*M,r[8]=h*u+m*A+_*I,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],l=t[5],o=t[6],c=t[7],d=t[8];return e*a*d-e*l*c-n*r*d+n*l*o+s*r*c-s*a*o}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],l=t[5],o=t[6],c=t[7],d=t[8],f=d*a-l*c,h=l*o-d*r,m=c*r-a*o,_=e*f+n*h+s*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/_;return t[0]=f*y,t[1]=(s*c-d*n)*y,t[2]=(l*n-s*a)*y,t[3]=h*y,t[4]=(d*e-s*o)*y,t[5]=(s*r-l*e)*y,t[6]=m*y,t[7]=(n*o-c*e)*y,t[8]=(a*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,l){let o=Math.cos(r),c=Math.sin(r);return this.set(n*o,n*c,-n*(o*a+c*l)+a+t,-s*c,s*o,-s*(-c*a+o*l)+l+e,0,0,1),this}scale(t,e){return hi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(po.makeScale(t,e)),this}rotate(t){return hi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(po.makeRotation(-t)),this}translate(t,e){return hi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(po.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Cl.prototype.isMatrix3=!0;var Ht=Cl,po=new Ht,hc=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),uc=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function td(){let i={enabled:!0,workingColorSpace:ps,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===re&&(s.r=Fn(s.r),s.g=Fn(s.g),s.b=Fn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===re&&(s.r=Ni(s.r),s.g=Ni(s.g),s.b=Ni(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===wn?ms:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return hi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return hi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ps]:{primaries:t,whitePoint:n,transfer:ms,toXYZ:hc,fromXYZ:uc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ue},outputColorSpaceConfig:{drawingBufferColorSpace:Ue}},[Ue]:{primaries:t,whitePoint:n,transfer:re,toXYZ:hc,fromXYZ:uc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ue}}}),i}var qt=td();function Fn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ni(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var yi,Gr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{yi===void 0&&(yi=_s("canvas")),yi.width=t.width,yi.height=t.height;let s=yi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=yi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=_s("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Fn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Fn(e[n]/255)*255):e[n]=Fn(e[n]);return{data:e,width:t.width,height:t.height}}else return Rt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},ed=0,ki=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=Zi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,l=s.length;a<l;a++)s[a].isDataTexture?r.push(mo(s[a].image)):r.push(mo(s[a]))}else r=mo(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function mo(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?Gr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Rt("Texture: Unable to serialize Texture."),{})}var nd=0,go=new H,ke=class i extends un{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=xn,s=xn,r=Ie,a=ei,l=en,o=Ze,c=i.DEFAULT_ANISOTROPY,d=wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=Zi(),this.name="",this.source=new ki(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=o,this.offset=new Ot(0,0),this.repeat=new Ot(1,1),this.center=new Ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(go).x}get height(){return this.source.getSize(go).y}get depth(){return this.source.getSize(go).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Rt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Rt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==tl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case wr:t.x=t.x-Math.floor(t.x);break;case xn:t.x=t.x<0?0:1;break;case Rr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case wr:t.y=t.y-Math.floor(t.y);break;case xn:t.y=t.y<0?0:1;break;case Rr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ke.DEFAULT_IMAGE=null;ke.DEFAULT_MAPPING=tl;ke.DEFAULT_ANISOTROPY=1;var xl=class xl{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,o=t.elements,c=o[0],d=o[4],f=o[8],h=o[1],m=o[5],_=o[9],y=o[2],p=o[6],u=o[10];if(Math.abs(d-h)<.01&&Math.abs(f-y)<.01&&Math.abs(_-p)<.01){if(Math.abs(d+h)<.1&&Math.abs(f+y)<.1&&Math.abs(_+p)<.1&&Math.abs(c+m+u-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(c+1)/2,A=(m+1)/2,C=(u+1)/2,M=(d+h)/4,I=(f+y)/4,E=(_+p)/4;return v>A&&v>C?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=M/n,r=I/n):A>C?A<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(A),n=M/s,r=E/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=I/r,s=E/r),this.set(n,s,r,e),this}let x=Math.sqrt((p-_)*(p-_)+(f-y)*(f-y)+(h-d)*(h-d));return Math.abs(x)<.001&&(x=1),this.x=(p-_)/x,this.y=(f-y)/x,this.z=(h-d)/x,this.w=Math.acos((c+m+u-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this.w=Wt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this.w=Wt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};xl.prototype.isVector4=!0;var _e=xl,Pr=class extends un{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ie,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new ke(s),a=n.count;for(let l=0;l<a;l++)this.textures[l]=r.clone(),this.textures[l].isRenderTargetTexture=!0,this.textures[l].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ie,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new ki(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ze=class extends Pr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Es=class extends ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=De,this.minFilter=De,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Nr=class extends ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=De,this.minFilter=De,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var sa=class sa{constructor(t,e,n,s,r,a,l,o,c,d,f,h,m,_,y,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,l,o,c,d,f,h,m,_,y,p)}set(t,e,n,s,r,a,l,o,c,d,f,h,m,_,y,p){let u=this.elements;return u[0]=t,u[4]=e,u[8]=n,u[12]=s,u[1]=r,u[5]=a,u[9]=l,u[13]=o,u[2]=c,u[6]=d,u[10]=f,u[14]=h,u[3]=m,u[7]=_,u[11]=y,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new sa().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Mi.setFromMatrixColumn(t,0).length(),r=1/Mi.setFromMatrixColumn(t,1).length(),a=1/Mi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),l=Math.sin(n),o=Math.cos(s),c=Math.sin(s),d=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let h=a*d,m=a*f,_=l*d,y=l*f;e[0]=o*d,e[4]=-o*f,e[8]=c,e[1]=m+_*c,e[5]=h-y*c,e[9]=-l*o,e[2]=y-h*c,e[6]=_+m*c,e[10]=a*o}else if(t.order==="YXZ"){let h=o*d,m=o*f,_=c*d,y=c*f;e[0]=h+y*l,e[4]=_*l-m,e[8]=a*c,e[1]=a*f,e[5]=a*d,e[9]=-l,e[2]=m*l-_,e[6]=y+h*l,e[10]=a*o}else if(t.order==="ZXY"){let h=o*d,m=o*f,_=c*d,y=c*f;e[0]=h-y*l,e[4]=-a*f,e[8]=_+m*l,e[1]=m+_*l,e[5]=a*d,e[9]=y-h*l,e[2]=-a*c,e[6]=l,e[10]=a*o}else if(t.order==="ZYX"){let h=a*d,m=a*f,_=l*d,y=l*f;e[0]=o*d,e[4]=_*c-m,e[8]=h*c+y,e[1]=o*f,e[5]=y*c+h,e[9]=m*c-_,e[2]=-c,e[6]=l*o,e[10]=a*o}else if(t.order==="YZX"){let h=a*o,m=a*c,_=l*o,y=l*c;e[0]=o*d,e[4]=y-h*f,e[8]=_*f+m,e[1]=f,e[5]=a*d,e[9]=-l*d,e[2]=-c*d,e[6]=m*f+_,e[10]=h-y*f}else if(t.order==="XZY"){let h=a*o,m=a*c,_=l*o,y=l*c;e[0]=o*d,e[4]=-f,e[8]=c*d,e[1]=h*f+y,e[5]=a*d,e[9]=m*f-_,e[2]=_*f-m,e[6]=l*d,e[10]=y*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(id,t,sd)}lookAt(t,e,n){let s=this.elements;return Je.subVectors(t,e),Je.lengthSq()===0&&(Je.z=1),Je.normalize(),Nn.crossVectors(n,Je),Nn.lengthSq()===0&&(Math.abs(n.z)===1?Je.x+=1e-4:Je.z+=1e-4,Je.normalize(),Nn.crossVectors(n,Je)),Nn.normalize(),nr.crossVectors(Je,Nn),s[0]=Nn.x,s[4]=nr.x,s[8]=Je.x,s[1]=Nn.y,s[5]=nr.y,s[9]=Je.y,s[2]=Nn.z,s[6]=nr.z,s[10]=Je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],l=n[4],o=n[8],c=n[12],d=n[1],f=n[5],h=n[9],m=n[13],_=n[2],y=n[6],p=n[10],u=n[14],x=n[3],v=n[7],A=n[11],C=n[15],M=s[0],I=s[4],E=s[8],D=s[12],L=s[1],T=s[5],w=s[9],U=s[13],F=s[2],N=s[6],P=s[10],k=s[14],tt=s[3],Y=s[7],Z=s[11],et=s[15];return r[0]=a*M+l*L+o*F+c*tt,r[4]=a*I+l*T+o*N+c*Y,r[8]=a*E+l*w+o*P+c*Z,r[12]=a*D+l*U+o*k+c*et,r[1]=d*M+f*L+h*F+m*tt,r[5]=d*I+f*T+h*N+m*Y,r[9]=d*E+f*w+h*P+m*Z,r[13]=d*D+f*U+h*k+m*et,r[2]=_*M+y*L+p*F+u*tt,r[6]=_*I+y*T+p*N+u*Y,r[10]=_*E+y*w+p*P+u*Z,r[14]=_*D+y*U+p*k+u*et,r[3]=x*M+v*L+A*F+C*tt,r[7]=x*I+v*T+A*N+C*Y,r[11]=x*E+v*w+A*P+C*Z,r[15]=x*D+v*U+A*k+C*et,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],l=t[5],o=t[9],c=t[13],d=t[2],f=t[6],h=t[10],m=t[14],_=t[3],y=t[7],p=t[11],u=t[15],x=o*m-c*h,v=l*m-c*f,A=l*h-o*f,C=a*m-c*d,M=a*h-o*d,I=a*f-l*d;return e*(y*x-p*v+u*A)-n*(_*x-p*C+u*M)+s*(_*v-y*C+u*I)-r*(_*A-y*M+p*I)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],l=t[9],o=t[2],c=t[6],d=t[10];return e*(a*d-l*c)-n*(r*d-l*o)+s*(r*c-a*o)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],l=t[5],o=t[6],c=t[7],d=t[8],f=t[9],h=t[10],m=t[11],_=t[12],y=t[13],p=t[14],u=t[15],x=e*l-n*a,v=e*o-s*a,A=e*c-r*a,C=n*o-s*l,M=n*c-r*l,I=s*c-r*o,E=d*y-f*_,D=d*p-h*_,L=d*u-m*_,T=f*p-h*y,w=f*u-m*y,U=h*u-m*p,F=x*U-v*w+A*T+C*L-M*D+I*E;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/F;return t[0]=(l*U-o*w+c*T)*N,t[1]=(s*w-n*U-r*T)*N,t[2]=(y*I-p*M+u*C)*N,t[3]=(h*M-f*I-m*C)*N,t[4]=(o*L-a*U-c*D)*N,t[5]=(e*U-s*L+r*D)*N,t[6]=(p*A-_*I-u*v)*N,t[7]=(d*I-h*A+m*v)*N,t[8]=(a*w-l*L+c*E)*N,t[9]=(n*L-e*w-r*E)*N,t[10]=(_*M-y*A+u*x)*N,t[11]=(f*A-d*M-m*x)*N,t[12]=(l*D-a*T-o*E)*N,t[13]=(e*T-n*D+s*E)*N,t[14]=(y*v-_*C-p*x)*N,t[15]=(d*C-f*v+h*x)*N,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,l=t.y,o=t.z,c=r*a,d=r*l;return this.set(c*a+n,c*l-s*o,c*o+s*l,0,c*l+s*o,d*l+n,d*o-s*a,0,c*o-s*l,d*o+s*a,r*o*o+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,l=e._z,o=e._w,c=r+r,d=a+a,f=l+l,h=r*c,m=r*d,_=r*f,y=a*d,p=a*f,u=l*f,x=o*c,v=o*d,A=o*f,C=n.x,M=n.y,I=n.z;return s[0]=(1-(y+u))*C,s[1]=(m+A)*C,s[2]=(_-v)*C,s[3]=0,s[4]=(m-A)*M,s[5]=(1-(h+u))*M,s[6]=(p+x)*M,s[7]=0,s[8]=(_+v)*I,s[9]=(p-x)*I,s[10]=(1-(h+y))*I,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Mi.set(s[0],s[1],s[2]).length(),l=Mi.set(s[4],s[5],s[6]).length(),o=Mi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),an.copy(this);let c=1/a,d=1/l,f=1/o;return an.elements[0]*=c,an.elements[1]*=c,an.elements[2]*=c,an.elements[4]*=d,an.elements[5]*=d,an.elements[6]*=d,an.elements[8]*=f,an.elements[9]*=f,an.elements[10]*=f,e.setFromRotationMatrix(an),n.x=a,n.y=l,n.z=o,this}makePerspective(t,e,n,s,r,a,l=cn,o=!1){let c=this.elements,d=2*r/(e-t),f=2*r/(n-s),h=(e+t)/(e-t),m=(n+s)/(n-s),_,y;if(o)_=r/(a-r),y=a*r/(a-r);else if(l===cn)_=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(l===gs)_=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return c[0]=d,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,l=cn,o=!1){let c=this.elements,d=2/(e-t),f=2/(n-s),h=-(e+t)/(e-t),m=-(n+s)/(n-s),_,y;if(o)_=1/(a-r),y=a/(a-r);else if(l===cn)_=-2/(a-r),y=-(a+r)/(a-r);else if(l===gs)_=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return c[0]=d,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=_,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};sa.prototype.isMatrix4=!0;var me=sa,Mi=new H,an=new me,id=new H(0,0,0),sd=new H(1,1,1),Nn=new H,nr=new H,Je=new H,dc=new me,fc=new Ye,Vn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],l=s[8],o=s[1],c=s[5],d=s[9],f=s[2],h=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Wt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(l,m),this._z=Math.atan2(o,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Wt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-Wt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(l,m));break;case"XZY":this._z=Math.asin(-Wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(l,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:Rt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return dc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(dc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return fc.setFromEuler(this),this.setFromQuaternion(fc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Vn.DEFAULT_ORDER="XYZ";var zi=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},rd=0,pc=new H,vi=new Ye,Sn=new me,ir=new H,as=new H,ad=new H,od=new Ye,mc=new H(1,0,0),gc=new H(0,1,0),_c=new H(0,0,1),Ec={type:"added"},ld={type:"removed"},Si={type:"childadded",child:null},_o={type:"childremoved",child:null},qe=class i extends un{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rd++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new H,e=new Vn,n=new Ye,s=new H(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new me},normalMatrix:{value:new Ht}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zi,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return vi.setFromAxisAngle(t,e),this.quaternion.multiply(vi),this}rotateOnWorldAxis(t,e){return vi.setFromAxisAngle(t,e),this.quaternion.premultiply(vi),this}rotateX(t){return this.rotateOnAxis(mc,t)}rotateY(t){return this.rotateOnAxis(gc,t)}rotateZ(t){return this.rotateOnAxis(_c,t)}translateOnAxis(t,e){return pc.copy(t).applyQuaternion(this.quaternion),this.position.add(pc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(mc,t)}translateY(t){return this.translateOnAxis(gc,t)}translateZ(t){return this.translateOnAxis(_c,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Sn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ir.copy(t):ir.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),as.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sn.lookAt(as,ir,this.up):Sn.lookAt(ir,as,this.up),this.quaternion.setFromRotationMatrix(Sn),s&&(Sn.extractRotation(s.matrixWorld),vi.setFromRotationMatrix(Sn),this.quaternion.premultiply(vi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Pt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ec),Si.child=t,this.dispatchEvent(Si),Si.child=null):Pt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ld),_o.child=t,this.dispatchEvent(_o),_o.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Sn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Sn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Sn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ec),Si.child=t,this.dispatchEvent(Si),Si.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,t,ad),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,od,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,l=r.length;a<l;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(l=>({...l})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(l,o){return l[o.uuid]===void 0&&(l[o.uuid]=o.toJSON(t)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){let o=l.shapes;if(Array.isArray(o))for(let c=0,d=o.length;c<d;c++){let f=o[c];r(t.shapes,f)}else r(t.shapes,o)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let l=[];for(let o=0,c=this.material.length;o<c;o++)l.push(r(t.materials,this.material[o]));s.material=l}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let l=0;l<this.children.length;l++)s.children.push(this.children[l].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let l=0;l<this.animations.length;l++){let o=this.animations[l];s.animations.push(r(t.animations,o))}}if(e){let l=a(t.geometries),o=a(t.materials),c=a(t.textures),d=a(t.images),f=a(t.shapes),h=a(t.skeletons),m=a(t.animations),_=a(t.nodes);l.length>0&&(n.geometries=l),o.length>0&&(n.materials=o),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(l){let o=[];for(let c in l){let d=l[c];delete d.metadata,o.push(d)}return o}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};qe.DEFAULT_UP=new H(0,1,0);qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var hn=class extends qe{constructor(){super(),this.isGroup=!0,this.type="Group"}},cd={type:"move"},Vi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,l=this._targetRay,o=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let y of t.hand.values()){let p=e.getJointPose(y,n),u=this._getHandJoint(c,y);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}let d=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=d.position.distanceTo(f.position),m=.02,_=.005;c.inputState.pinching&&h>m+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=m-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else o!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:t,target:this})));l!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(cd)))}return l!==null&&(l.visible=s!==null),o!==null&&(o.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new hn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},_h={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},sr={h:0,s:0,l:0};function Eo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Xt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ue){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=qt.workingColorSpace){if(t=ul(t,1),e=Wt(e,0,1),n=Wt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Eo(a,r,t+1/3),this.g=Eo(a,r,t),this.b=Eo(a,r,t-1/3)}return qt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ue){function n(r){r!==void 0&&parseFloat(r)<1&&Rt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],l=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Rt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Rt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ue){let n=_h[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Rt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Fn(t.r),this.g=Fn(t.g),this.b=Fn(t.b),this}copyLinearToSRGB(t){return this.r=Ni(t.r),this.g=Ni(t.g),this.b=Ni(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ue){return qt.workingToColorSpace(Re.copy(this),t),Math.round(Wt(Re.r*255,0,255))*65536+Math.round(Wt(Re.g*255,0,255))*256+Math.round(Wt(Re.b*255,0,255))}getHexString(t=Ue){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.workingToColorSpace(Re.copy(this),e);let n=Re.r,s=Re.g,r=Re.b,a=Math.max(n,s,r),l=Math.min(n,s,r),o,c,d=(l+a)/2;if(l===a)o=0,c=0;else{let f=a-l;switch(c=d<=.5?f/(a+l):f/(2-a-l),a){case n:o=(s-r)/f+(s<r?6:0);break;case s:o=(r-n)/f+2;break;case r:o=(n-s)/f+4;break}o/=6}return t.h=o,t.s=c,t.l=d,t}getRGB(t,e=qt.workingColorSpace){return qt.workingToColorSpace(Re.copy(this),e),t.r=Re.r,t.g=Re.g,t.b=Re.b,t}getStyle(t=Ue){qt.workingToColorSpace(Re.copy(this),t);let e=Re.r,n=Re.g,s=Re.b;return t!==Ue?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(On),this.setHSL(On.h+t,On.s+e,On.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(On),t.getHSL(sr);let n=ds(On.h,sr.h,e),s=ds(On.s,sr.s,e),r=ds(On.l,sr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Re=new Xt;Xt.NAMES=_h;var Cs=class extends qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vn,this.environmentIntensity=1,this.environmentRotation=new Vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},on=new H,Dn=new H,Co=new H,bn=new H,Di=new H,bi=new H,Cc=new H,xo=new H,Bo=new H,Ao=new H,yo=new _e,Mo=new _e,vo=new _e,zn=class i{constructor(t=new H,e=new H,n=new H){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),on.subVectors(t,e),s.cross(on);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){on.subVectors(s,e),Dn.subVectors(n,e),Co.subVectors(t,e);let a=on.dot(on),l=on.dot(Dn),o=on.dot(Co),c=Dn.dot(Dn),d=Dn.dot(Co),f=a*c-l*l;if(f===0)return r.set(0,0,0),null;let h=1/f,m=(c*o-l*d)*h,_=(a*d-l*o)*h;return r.set(1-m-_,_,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(t,e,n,s,r,a,l,o){return this.getBarycoord(t,e,n,s,bn)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,bn.x),o.addScaledVector(a,bn.y),o.addScaledVector(l,bn.z),o)}static getInterpolatedAttribute(t,e,n,s,r,a){return yo.setScalar(0),Mo.setScalar(0),vo.setScalar(0),yo.fromBufferAttribute(t,e),Mo.fromBufferAttribute(t,n),vo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(yo,r.x),a.addScaledVector(Mo,r.y),a.addScaledVector(vo,r.z),a}static isFrontFacing(t,e,n,s){return on.subVectors(n,e),Dn.subVectors(t,e),on.cross(Dn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return on.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),on.cross(Dn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,l;Di.subVectors(s,n),bi.subVectors(r,n),xo.subVectors(t,n);let o=Di.dot(xo),c=bi.dot(xo);if(o<=0&&c<=0)return e.copy(n);Bo.subVectors(t,s);let d=Di.dot(Bo),f=bi.dot(Bo);if(d>=0&&f<=d)return e.copy(s);let h=o*f-d*c;if(h<=0&&o>=0&&d<=0)return a=o/(o-d),e.copy(n).addScaledVector(Di,a);Ao.subVectors(t,r);let m=Di.dot(Ao),_=bi.dot(Ao);if(_>=0&&m<=_)return e.copy(r);let y=m*c-o*_;if(y<=0&&c>=0&&_<=0)return l=c/(c-_),e.copy(n).addScaledVector(bi,l);let p=d*_-m*f;if(p<=0&&f-d>=0&&m-_>=0)return Cc.subVectors(r,s),l=(f-d)/(f-d+(m-_)),e.copy(s).addScaledVector(Cc,l);let u=1/(p+y+h);return a=y*u,l=h*u,e.copy(n).addScaledVector(Di,a).addScaledVector(bi,l)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Kn=class{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,l=r.count;a<l;a++)t.isMesh===!0?t.getVertexPosition(a,ln):ln.fromBufferAttribute(r,a),ln.applyMatrix4(t.matrixWorld),this.expandByPoint(ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),rr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),rr.copy(n.boundingBox)),rr.applyMatrix4(t.matrixWorld),this.union(rr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ln),ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(os),ar.subVectors(this.max,os),Ii.subVectors(t.a,os),Ti.subVectors(t.b,os),Fi.subVectors(t.c,os),Hn.subVectors(Ti,Ii),Un.subVectors(Fi,Ti),ai.subVectors(Ii,Fi);let e=[0,-Hn.z,Hn.y,0,-Un.z,Un.y,0,-ai.z,ai.y,Hn.z,0,-Hn.x,Un.z,0,-Un.x,ai.z,0,-ai.x,-Hn.y,Hn.x,0,-Un.y,Un.x,0,-ai.y,ai.x,0];return!So(e,Ii,Ti,Fi,ar)||(e=[1,0,0,0,1,0,0,0,1],!So(e,Ii,Ti,Fi,ar))?!1:(or.crossVectors(Hn,Un),e=[or.x,or.y,or.z],So(e,Ii,Ti,Fi,ar))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},In=[new H,new H,new H,new H,new H,new H,new H,new H],ln=new H,rr=new Kn,Ii=new H,Ti=new H,Fi=new H,Hn=new H,Un=new H,ai=new H,os=new H,ar=new H,or=new H,oi=new H;function So(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){oi.fromArray(i,r);let l=s.x*Math.abs(oi.x)+s.y*Math.abs(oi.y)+s.z*Math.abs(oi.z),o=t.dot(oi),c=e.dot(oi),d=n.dot(oi);if(Math.max(-Math.max(o,c,d),Math.min(o,c,d))>l)return!1}return!0}var Ae=new H,lr=new Ot,hd=0,Ce=class extends un{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=dh,this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)lr.fromBufferAttribute(this,e),lr.applyMatrix3(t),this.setXY(e,lr.x,lr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix3(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix4(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyNormalMatrix(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.transformDirection(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Pi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=He(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Pi(e,this.array)),e}setX(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Pi(e,this.array)),e}setY(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Pi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Pi(e,this.array)),e}setW(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=He(e,this.array),n=He(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=He(e,this.array),n=He(n,this.array),s=He(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=He(e,this.array),n=He(n,this.array),s=He(s,this.array),r=He(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var xs=class extends Ce{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Bs=class extends Ce{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ge=class extends Ce{constructor(t,e,n){super(new Float32Array(t),e,n)}},ud=new Kn,ls=new H,Do=new H,ui=class{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):ud.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ls.subVectors(t,this.center);let e=ls.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ls,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Do.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ls.copy(t.center).add(Do)),this.expandByPoint(ls.copy(t.center).sub(Do))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},dd=0,je=new me,bo=new qe,wi=new H,We=new Kn,cs=new Kn,Se=new H,be=class i extends un{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Pu(t)?Bs:xs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ht().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return je.makeRotationFromQuaternion(t),this.applyMatrix4(je),this}rotateX(t){return je.makeRotationX(t),this.applyMatrix4(je),this}rotateY(t){return je.makeRotationY(t),this.applyMatrix4(je),this}rotateZ(t){return je.makeRotationZ(t),this.applyMatrix4(je),this}translate(t,e,n){return je.makeTranslation(t,e,n),this.applyMatrix4(je),this}scale(t,e,n){return je.makeScale(t,e,n),this.applyMatrix4(je),this}lookAt(t){return bo.lookAt(t),bo.updateMatrix(),this.applyMatrix4(bo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ge(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Rt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Pt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];We.setFromBufferAttribute(r),this.morphTargetsRelative?(Se.addVectors(this.boundingBox.min,We.min),this.boundingBox.expandByPoint(Se),Se.addVectors(this.boundingBox.max,We.max),this.boundingBox.expandByPoint(Se)):(this.boundingBox.expandByPoint(We.min),this.boundingBox.expandByPoint(We.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Pt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ui);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Pt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){let n=this.boundingSphere.center;if(We.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let l=e[r];cs.setFromBufferAttribute(l),this.morphTargetsRelative?(Se.addVectors(We.min,cs.min),We.expandByPoint(Se),Se.addVectors(We.max,cs.max),We.expandByPoint(Se)):(We.expandByPoint(cs.min),We.expandByPoint(cs.max))}We.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Se.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Se));if(e)for(let r=0,a=e.length;r<a;r++){let l=e[r],o=this.morphTargetsRelative;for(let c=0,d=l.count;c<d;c++)Se.fromBufferAttribute(l,c),o&&(wi.fromBufferAttribute(t,c),Se.add(wi)),s=Math.max(s,n.distanceToSquared(Se))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Pt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Pt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Ce(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let l=[],o=[];for(let E=0;E<n.count;E++)l[E]=new H,o[E]=new H;let c=new H,d=new H,f=new H,h=new Ot,m=new Ot,_=new Ot,y=new H,p=new H;function u(E,D,L){c.fromBufferAttribute(n,E),d.fromBufferAttribute(n,D),f.fromBufferAttribute(n,L),h.fromBufferAttribute(r,E),m.fromBufferAttribute(r,D),_.fromBufferAttribute(r,L),d.sub(c),f.sub(c),m.sub(h),_.sub(h);let T=1/(m.x*_.y-_.x*m.y);isFinite(T)&&(y.copy(d).multiplyScalar(_.y).addScaledVector(f,-m.y).multiplyScalar(T),p.copy(f).multiplyScalar(m.x).addScaledVector(d,-_.x).multiplyScalar(T),l[E].add(y),l[D].add(y),l[L].add(y),o[E].add(p),o[D].add(p),o[L].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let E=0,D=x.length;E<D;++E){let L=x[E],T=L.start,w=L.count;for(let U=T,F=T+w;U<F;U+=3)u(t.getX(U+0),t.getX(U+1),t.getX(U+2))}let v=new H,A=new H,C=new H,M=new H;function I(E){C.fromBufferAttribute(s,E),M.copy(C);let D=l[E];v.copy(D),v.sub(C.multiplyScalar(C.dot(D))).normalize(),A.crossVectors(M,D);let T=A.dot(o[E])<0?-1:1;a.setXYZW(E,v.x,v.y,v.z,T)}for(let E=0,D=x.length;E<D;++E){let L=x[E],T=L.start,w=L.count;for(let U=T,F=T+w;U<F;U+=3)I(t.getX(U+0)),I(t.getX(U+1)),I(t.getX(U+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Ce(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,m=n.count;h<m;h++)n.setXYZ(h,0,0,0);let s=new H,r=new H,a=new H,l=new H,o=new H,c=new H,d=new H,f=new H;if(t)for(let h=0,m=t.count;h<m;h+=3){let _=t.getX(h+0),y=t.getX(h+1),p=t.getX(h+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,p),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),l.fromBufferAttribute(n,_),o.fromBufferAttribute(n,y),c.fromBufferAttribute(n,p),l.add(d),o.add(d),c.add(d),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(y,o.x,o.y,o.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,m=e.count;h<m;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Se.fromBufferAttribute(t,e),Se.normalize(),t.setXYZ(e,Se.x,Se.y,Se.z)}toNonIndexed(){function t(l,o){let c=l.array,d=l.itemSize,f=l.normalized,h=new c.constructor(o.length*d),m=0,_=0;for(let y=0,p=o.length;y<p;y++){l.isInterleavedBufferAttribute?m=o[y]*l.data.stride+l.offset:m=o[y]*d;for(let u=0;u<d;u++)h[_++]=c[m++]}return new Ce(h,d,f)}if(this.index===null)return Rt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let l in s){let o=s[l],c=t(o,n);e.setAttribute(l,c)}let r=this.morphAttributes;for(let l in r){let o=[],c=r[l];for(let d=0,f=c.length;d<f;d++){let h=c[d],m=t(h,n);o.push(m)}e.morphAttributes[l]=o}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let l=0,o=a.length;l<o;l++){let c=a[l];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let o=this.parameters;for(let c in o)o[c]!==void 0&&(t[c]=o[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let o in n){let c=n[o];t.data.attributes[o]=c.toJSON(t.data)}let s={},r=!1;for(let o in this.morphAttributes){let c=this.morphAttributes[o],d=[];for(let f=0,h=c.length;f<h;f++){let m=c[f];d.push(m.toJSON(t.data))}d.length>0&&(s[o]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let l=this.boundingSphere;return l!==null&&(t.data.boundingSphere=l.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let d=s[c];this.setAttribute(c,d.clone(e))}let r=t.morphAttributes;for(let c in r){let d=[],f=r[c];for(let h=0,m=f.length;h<m;h++)d.push(f[h].clone(e));this.morphAttributes[c]=d}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,d=a.length;c<d;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let l=t.boundingBox;l!==null&&(this.boundingBox=l.clone());let o=t.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Io=new H,fd=new H,pd=new Ht,Xe=class{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Io.subVectors(n,e).cross(fd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Io),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||pd.getNormalMatrix(t),s=this.coplanarPoint(Io).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},md=0,Jn=class extends un{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:md++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=Yi,this.side=jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ko,this.blendDst=Jo,this.blendEquation=fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=Oi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mr,this.stencilZFail=Mr,this.stencilZPass=Mr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Rt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Rt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let l in r){let o=r[l];delete o.metadata,a.push(o)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Xt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Xe().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ot().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ot().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Tn=new H,To=new H,cr=new H,hr=new H,Wn=class{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Tn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Tn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Tn.copy(this.origin).addScaledVector(this.direction,e),Tn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){To.copy(t).add(e).multiplyScalar(.5),cr.copy(e).sub(t).normalize(),hr.copy(this.origin).sub(To);let r=t.distanceTo(e)*.5,a=-this.direction.dot(cr),l=hr.dot(this.direction),o=-hr.dot(cr),c=hr.lengthSq(),d=Math.abs(1-a*a),f,h,m,_;if(d>0)if(f=a*o-l,h=a*l-o,_=r*d,f>=0)if(h>=-_)if(h<=_){let y=1/d;f*=y,h*=y,m=f*(f+a*h+2*l)+h*(a*f+h+2*o)+c}else h=r,f=Math.max(0,-(a*h+l)),m=-f*f+h*(h+2*o)+c;else h=-r,f=Math.max(0,-(a*h+l)),m=-f*f+h*(h+2*o)+c;else h<=-_?(f=Math.max(0,-(-a*r+l)),h=f>0?-r:Math.min(Math.max(-r,-o),r),m=-f*f+h*(h+2*o)+c):h<=_?(f=0,h=Math.min(Math.max(-r,-o),r),m=h*(h+2*o)+c):(f=Math.max(0,-(a*r+l)),h=f>0?r:Math.min(Math.max(-r,-o),r),m=-f*f+h*(h+2*o)+c);else h=a>0?-r:r,f=Math.max(0,-(a*h+l)),m=-f*f+h*(h+2*o)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(To).addScaledVector(cr,h),m}intersectSphere(t,e){if(t.radius<0)return null;Tn.subVectors(t.center,this.origin);let n=Tn.dot(this.direction),s=Tn.dot(Tn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),l=n-a,o=n+a;return o<0?null:l<0?this.at(o,e):this.at(l,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,l,o,c=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(n=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(n=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),d>=0?(r=(t.min.y-h.y)*d,a=(t.max.y-h.y)*d):(r=(t.max.y-h.y)*d,a=(t.min.y-h.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(l=(t.min.z-h.z)*f,o=(t.max.z-h.z)*f):(l=(t.max.z-h.z)*f,o=(t.min.z-h.z)*f),n>o||l>s)||((l>n||n!==n)&&(n=l),(o<s||s!==s)&&(s=o),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Tn)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,l=this.direction,o=l.x,c=l.y,d=l.z,f=t.x-a.x,h=t.y-a.y,m=t.z-a.z,_=e.x-a.x,y=e.y-a.y,p=e.z-a.z,u=n.x-a.x,x=n.y-a.y,v=n.z-a.z,A=Math.abs(o),C=Math.abs(c),M=Math.abs(d),I,E,D,L,T,w,U,F,N,P,k,tt;if(A>=C&&A>=M?(D=o,w=f,N=_,tt=u,o>=0?(I=c,E=d,L=h,T=m,U=y,F=p,P=x,k=v):(I=d,E=c,L=m,T=h,U=p,F=y,P=v,k=x)):C>=M?(D=c,w=h,N=y,tt=x,c>=0?(I=d,E=o,L=m,T=f,U=p,F=_,P=v,k=u):(I=o,E=d,L=f,T=m,U=_,F=p,P=u,k=v)):(D=d,w=m,N=p,tt=v,d>=0?(I=o,E=c,L=f,T=h,U=_,F=y,P=u,k=x):(I=c,E=o,L=h,T=f,U=y,F=_,P=x,k=u)),D===0)return null;let Y=I/D,Z=E/D,et=1/D,_t=L-Y*w,Ct=T-Z*w,kt=U-Y*N,wt=F-Z*N,W=P-Y*tt,O=k-Z*tt,J=W*wt-O*kt,it=_t*O-Ct*W,at=kt*Ct-wt*_t;if(s){if(J<0||it<0||at<0)return null}else if((J<0||it<0||at<0)&&(J>0||it>0||at>0))return null;let rt=J+it+at;if(rt===0)return null;let vt=et*(J*w+it*N+at*tt);return(rt>0?vt<0:vt>0)?null:this.at(vt/rt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},tn=class extends Jn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=Wo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},xc=new me,li=new Wn,ur=new ui,Bc=new H,dr=new H,fr=new H,pr=new H,Fo=new H,mr=new H,Ac=new H,gr=new H,xe=class extends qe{constructor(t=new be,e=new tn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let l=this.morphTargetInfluences;if(r&&l){mr.set(0,0,0);for(let o=0,c=r.length;o<c;o++){let d=l[o],f=r[o];d!==0&&(Fo.fromBufferAttribute(f,t),a?mr.addScaledVector(Fo,d):mr.addScaledVector(Fo.sub(e),d))}e.add(mr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ur.copy(n.boundingSphere),ur.applyMatrix4(r),li.copy(t.ray).recast(t.near),!(ur.containsPoint(li.origin)===!1&&(li.intersectSphere(ur,Bc)===null||li.origin.distanceToSquared(Bc)>(t.far-t.near)**2))&&(xc.copy(r).invert(),li.copy(t.ray).applyMatrix4(xc),!(n.boundingBox!==null&&li.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,li)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,l=r.index,o=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,f=r.attributes.normal,h=r.groups,m=r.drawRange;if(l!==null)if(Array.isArray(a))for(let _=0,y=h.length;_<y;_++){let p=h[_],u=a[p.materialIndex],x=Math.max(p.start,m.start),v=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let A=x,C=v;A<C;A+=3){let M=l.getX(A),I=l.getX(A+1),E=l.getX(A+2);s=_r(this,u,t,n,c,d,f,M,I,E),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let _=Math.max(0,m.start),y=Math.min(l.count,m.start+m.count);for(let p=_,u=y;p<u;p+=3){let x=l.getX(p),v=l.getX(p+1),A=l.getX(p+2);s=_r(this,a,t,n,c,d,f,x,v,A),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(o!==void 0)if(Array.isArray(a))for(let _=0,y=h.length;_<y;_++){let p=h[_],u=a[p.materialIndex],x=Math.max(p.start,m.start),v=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let A=x,C=v;A<C;A+=3){let M=A,I=A+1,E=A+2;s=_r(this,u,t,n,c,d,f,M,I,E),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let _=Math.max(0,m.start),y=Math.min(o.count,m.start+m.count);for(let p=_,u=y;p<u;p+=3){let x=p,v=p+1,A=p+2;s=_r(this,a,t,n,c,d,f,x,v,A),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function gd(i,t,e,n,s,r,a,l){let o;if(t.side===Te?o=n.intersectTriangle(a,r,s,!0,l):o=n.intersectTriangle(s,r,a,t.side===jn,l),o===null)return null;gr.copy(l),gr.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(gr);return c<e.near||c>e.far?null:{distance:c,point:gr.clone(),object:i}}function _r(i,t,e,n,s,r,a,l,o,c){i.getVertexPosition(l,dr),i.getVertexPosition(o,fr),i.getVertexPosition(c,pr);let d=gd(i,t,e,n,dr,fr,pr,Ac);if(d){let f=new H;zn.getBarycoord(Ac,dr,fr,pr,f),s&&(d.uv=zn.getInterpolatedAttribute(s,l,o,c,f,new Ot)),r&&(d.uv1=zn.getInterpolatedAttribute(r,l,o,c,f,new Ot)),a&&(d.normal=zn.getInterpolatedAttribute(a,l,o,c,f,new H),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));let h={a:l,b:o,c,normal:new H,materialIndex:0};zn.getNormal(dr,fr,pr,h.normal),d.face=h,d.barycoord=f}return d}var Or=class extends ke{constructor(t=null,e=1,n=1,s,r,a,l,o,c=De,d=De,f,h){super(null,a,l,o,c,d,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ci=new ui,_d=new Ot(.5,.5),Er=new H,As=class{constructor(t=new Xe,e=new Xe,n=new Xe,s=new Xe,r=new Xe,a=new Xe){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let l=this.planes;return l[0].copy(t),l[1].copy(e),l[2].copy(n),l[3].copy(s),l[4].copy(r),l[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=cn,n=!1){let s=this.planes,r=t.elements,a=r[0],l=r[1],o=r[2],c=r[3],d=r[4],f=r[5],h=r[6],m=r[7],_=r[8],y=r[9],p=r[10],u=r[11],x=r[12],v=r[13],A=r[14],C=r[15];if(s[0].setComponents(c-a,m-d,u-_,C-x).normalize(),s[1].setComponents(c+a,m+d,u+_,C+x).normalize(),s[2].setComponents(c+l,m+f,u+y,C+v).normalize(),s[3].setComponents(c-l,m-f,u-y,C-v).normalize(),n)s[4].setComponents(o,h,p,A).normalize(),s[5].setComponents(c-o,m-h,u-p,C-A).normalize();else if(s[4].setComponents(c-o,m-h,u-p,C-A).normalize(),e===cn)s[5].setComponents(c+o,m+h,u+p,C+A).normalize();else if(e===gs)s[5].setComponents(o,h,p,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ci.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ci.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ci)}intersectsSprite(t){ci.center.set(0,0,0);let e=_d.distanceTo(t.center);return ci.radius=.7071067811865476+e,ci.applyMatrix4(t.matrixWorld),this.intersectsSphere(ci)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Er.x=s.normal.x>0?t.max.x:t.min.x,Er.y=s.normal.y>0?t.max.y:t.min.y,Er.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Er)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ki=class extends Jn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Hr=new H,Ur=new H,yc=new me,hs=new Wn,Cr=new ui,wo=new H,Mc=new H,kr=class extends qe{constructor(t=new be,e=new Ki){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Hr.fromBufferAttribute(e,s-1),Ur.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Hr.distanceTo(Ur);t.setAttribute("lineDistance",new ge(n,1))}else Rt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Cr.copy(n.boundingSphere),Cr.applyMatrix4(s),Cr.radius+=r,t.ray.intersectsSphere(Cr)===!1)return;yc.copy(s).invert(),hs.copy(t.ray).applyMatrix4(yc);let l=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=l*l,c=this.isLineSegments?2:1,d=n.index,h=n.attributes.position;if(d!==null){let m=Math.max(0,a.start),_=Math.min(d.count,a.start+a.count);for(let y=m,p=_-1;y<p;y+=c){let u=d.getX(y),x=d.getX(y+1),v=xr(this,t,hs,o,u,x,y);v&&e.push(v)}if(this.isLineLoop){let y=d.getX(_-1),p=d.getX(m),u=xr(this,t,hs,o,y,p,_-1);u&&e.push(u)}}else{let m=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let y=m,p=_-1;y<p;y+=c){let u=xr(this,t,hs,o,y,y+1,y);u&&e.push(u)}if(this.isLineLoop){let y=xr(this,t,hs,o,_-1,m,_-1);y&&e.push(y)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}};function xr(i,t,e,n,s,r,a){let l=i.geometry.attributes.position;if(Hr.fromBufferAttribute(l,s),Ur.fromBufferAttribute(l,r),e.distanceSqToSegment(Hr,Ur,wo,Mc)>n)return;wo.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(wo);if(!(c<t.near||c>t.far))return{distance:c,point:Mc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var vc=new H,Sc=new H,ys=class extends kr{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)vc.fromBufferAttribute(e,s),Sc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+vc.distanceTo(Sc);t.setAttribute("lineDistance",new ge(n,1))}else Rt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ms=class extends ke{constructor(t=[],e=ti,n,s,r,a,l,o,c,d){super(t,e,n,s,r,a,l,o,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},vs=class extends ke{constructor(t,e,n,s,r,a,l,o,c){super(t,e,n,s,r,a,l,o,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Xn=class extends ke{constructor(t,e,n=fn,s,r,a,l=De,o=De,c,d=Bn,f=1){if(d!==Bn&&d!==ni)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:f};super(h,s,r,a,l,o,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ki(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},zr=class extends Xn{constructor(t,e=fn,n=ti,s,r,a=De,l=De,o,c=Bn){let d={width:t,height:t,depth:1},f=[d,d,d,d,d,d];super(t,t,e,n,s,r,a,l,o,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Ss=class extends ke{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ji=class i extends be{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let l=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let o=[],c=[],d=[],f=[],h=0,m=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,s,a,2),_("x","z","y",1,-1,t,n,-e,s,a,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(o),this.setAttribute("position",new ge(c,3)),this.setAttribute("normal",new ge(d,3)),this.setAttribute("uv",new ge(f,2));function _(y,p,u,x,v,A,C,M,I,E,D){let L=A/I,T=C/E,w=A/2,U=C/2,F=M/2,N=I+1,P=E+1,k=0,tt=0,Y=new H;for(let Z=0;Z<P;Z++){let et=Z*T-U;for(let _t=0;_t<N;_t++){let Ct=_t*L-w;Y[y]=Ct*x,Y[p]=et*v,Y[u]=F,c.push(Y.x,Y.y,Y.z),Y[y]=0,Y[p]=0,Y[u]=M>0?1:-1,d.push(Y.x,Y.y,Y.z),f.push(_t/I),f.push(1-Z/E),k+=1}}for(let Z=0;Z<E;Z++)for(let et=0;et<I;et++){let _t=h+et+N*Z,Ct=h+et+N*(Z+1),kt=h+(et+1)+N*(Z+1),wt=h+(et+1)+N*Z;o.push(_t,Ct,wt),o.push(Ct,kt,wt),tt+=6}l.addGroup(m,tt,D),m+=tt,h+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var di=class i extends be{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],a=[],l=[],o=[],c=new H,d=new Ot;a.push(0,0,0),l.push(0,0,1),o.push(.5,.5);for(let f=0,h=3;f<=e;f++,h+=3){let m=n+f/e*s;c.x=t*Math.cos(m),c.y=t*Math.sin(m),a.push(c.x,c.y,c.z),l.push(0,0,1),d.x=(a[h]/t+1)/2,d.y=(a[h+1]/t+1)/2,o.push(d.x,d.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new ge(a,3)),this.setAttribute("normal",new ge(l,3)),this.setAttribute("uv",new ge(o,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}};var Ds=class i extends be{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,l=Math.floor(n),o=Math.floor(s),c=l+1,d=o+1,f=t/l,h=e/o,m=[],_=[],y=[],p=[];for(let u=0;u<d;u++){let x=u*h-a;for(let v=0;v<c;v++){let A=v*f-r;_.push(A,-x,0),y.push(0,0,1),p.push(v/l),p.push(1-u/o)}}for(let u=0;u<o;u++)for(let x=0;x<l;x++){let v=x+c*u,A=x+c*(u+1),C=x+1+c*(u+1),M=x+1+c*u;m.push(v,A,M),m.push(A,C,M)}this.setIndex(m),this.setAttribute("position",new ge(_,3)),this.setAttribute("normal",new ge(y,3)),this.setAttribute("uv",new ge(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},bs=class i extends be{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let l=[],o=[],c=[],d=[],f=t,h=(e-t)/s,m=new H,_=new Ot;for(let y=0;y<=s;y++){for(let p=0;p<=n;p++){let u=r+p/n*a;m.x=f*Math.cos(u),m.y=f*Math.sin(u),o.push(m.x,m.y,m.z),c.push(0,0,1),_.x=(m.x/e+1)/2,_.y=(m.y/e+1)/2,d.push(_.x,_.y)}f+=h}for(let y=0;y<s;y++){let p=y*(n+1);for(let u=0;u<n;u++){let x=u+p,v=x,A=x+n+1,C=x+n+2,M=x+1;l.push(v,A,M),l.push(A,C,M)}}this.setIndex(l),this.setAttribute("position",new ge(o,3)),this.setAttribute("normal",new ge(c,3)),this.setAttribute("uv",new ge(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var Is=class i extends be{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:l},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let o=Math.min(a+l,Math.PI),c=0,d=[],f=new H,h=new H,m=[],_=[],y=[],p=[];for(let u=0;u<=n;u++){let x=[],v=u/n,A=a+v*l,C=t*Math.cos(A),M=Math.sqrt(t*t-C*C),I=0;u===0&&a===0?I=.5/e:u===n&&o===Math.PI&&(I=-.5/e);for(let E=0;E<=e;E++){let D=E/e,L=s+D*r;f.x=-M*Math.cos(L),f.y=C,f.z=M*Math.sin(L),_.push(f.x,f.y,f.z),h.copy(f).normalize(),y.push(h.x,h.y,h.z),p.push(D+I,1-v),x.push(c++)}d.push(x)}for(let u=0;u<n;u++)for(let x=0;x<e;x++){let v=d[u][x+1],A=d[u][x],C=d[u+1][x],M=d[u+1][x+1];(u!==0||a>0)&&m.push(v,A,M),(u!==n-1||o<Math.PI)&&m.push(A,C,M)}this.setIndex(m),this.setAttribute("position",new ge(_,3)),this.setAttribute("normal",new ge(y,3)),this.setAttribute("uv",new ge(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function mi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Dc(s))s.isRenderTargetTexture?(Rt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Dc(s[0])){let r=[];for(let a=0,l=s.length;a<l;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Pe(i){let t={};for(let e=0;e<i.length;e++){let n=mi(i[e]);for(let s in n)t[s]=n[s]}return t}function Dc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Ed(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function fl(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}var Eh={clone:mi,merge:Pe},Cd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ge=class extends Jn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cd,this.fragmentShader=xd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=mi(t.uniforms),this.uniformsGroups=Ed(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Xt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ot().fromArray(s.value);break;case"v3":this.uniforms[n].value=new H().fromArray(s.value);break;case"v4":this.uniforms[n].value=new _e().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ht().fromArray(s.value);break;case"m4":this.uniforms[n].value=new me().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Vr=class extends Ge{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Kr=class extends Jn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ih,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Jr=class extends Jn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Ri(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Ro(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Yn=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let l=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===l)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let l=e[1];t<l&&(n=2,r=l);for(let o=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===o)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let l=n+a>>>1;t<e[l]?a=l:n=l+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Wr=class extends Yn{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Go,endingEnd:Go}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,l=s[r],o=s[a];if(l===void 0)switch(this.getSettings_().endingStart){case Po:r=t,l=2*e-n;break;case No:r=s.length-2,l=e+s[r]-s[r+1];break;default:r=t,l=n}if(o===void 0)switch(this.getSettings_().endingEnd){case Po:a=t,o=2*n-e;break;case No:a=1,o=n+s[1]-s[0];break;default:a=t-1,o=e}let c=(n-e)*.5,d=this.valueSize;this._weightPrev=c/(e-l),this._weightNext=c/(o-n),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,l=this.valueSize,o=t*l,c=o-l,d=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,m=this._weightNext,_=(n-e)/(s-e),y=_*_,p=y*_,u=-h*p+2*h*y-h*_,x=(1+h)*p+(-1.5-2*h)*y+(-.5+h)*_+1,v=(-1-m)*p+(1.5+m)*y+.5*_,A=m*p-m*y;for(let C=0;C!==l;++C)r[C]=u*a[d+C]+x*a[c+C]+v*a[o+C]+A*a[f+C];return r}},Xr=class extends Yn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,l=this.valueSize,o=t*l,c=o-l,d=(n-e)/(s-e),f=1-d;for(let h=0;h!==l;++h)r[h]=a[c+h]*f+a[o+h]*d;return r}},Yr=class extends Yn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},qr=class extends Yn{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,l=this.valueSize,o=t*l,c=o-l,d=this.inTangents,f=this.outTangents;if(!d||!f){let _=(n-e)/(s-e),y=1-_;for(let p=0;p!==l;++p)r[p]=a[c+p]*y+a[o+p]*_;return r}let h=l*2,m=t-1;for(let _=0;_!==l;++_){let y=a[c+_],p=a[o+_],u=m*h+_*2,x=f[u],v=f[u+1],A=t*h+_*2,C=d[A],M=d[A+1],I=Ad(n,e,x,C,s);r[_]=Ch(I,y,v,M,p)}return r}};function Ch(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function Bd(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Ad(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let l=Ch(r,t,e,n,s)-i;if(Math.abs(l)<1e-10)break;let o=Bd(r,t,e,n,s);if(Math.abs(o)<1e-10)break;r=Math.max(0,Math.min(1,r-l/o))}return r}var Qe=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ri(e,this.TimeBufferType),this.values=Ri(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ri(t.times,Array),values:Ri(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),Ro(t.settings)&&(n.settings={inTangents:Ri(t.settings.inTangents,Array),outTangents:Ri(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Yr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Xr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Wr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new qr(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case fs:e=this.InterpolantFactoryMethodDiscrete;break;case Lr:e=this.InterpolantFactoryMethodLinear;break;case yr:e=this.InterpolantFactoryMethodSmooth;break;case Lo:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Rt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fs;case this.InterpolantFactoryMethodLinear:return Lr;case this.InterpolantFactoryMethodSmooth:return yr;case this.InterpolantFactoryMethodBezier:return Lo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;Ro(this.settings)&&(bc(this.settings.inTangents,t),bc(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let l=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*l,a*l)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Pt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Pt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let l=0;l!==r;l++){let o=n[l];if(typeof o=="number"&&isNaN(o)){Pt("KeyframeTrack: Time is not a valid number.",this,l,o),t=!1;break}if(a!==null&&a>o){Pt("KeyframeTrack: Out of order keys.",this,l,o,a),t=!1;break}a=o}if(s!==void 0&&Nu(s))for(let l=0,o=s.length;l!==o;++l){let c=s[l];if(isNaN(c)){Pt("KeyframeTrack: Value is not a valid number.",this,l,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===yr,r=t.length-1,a=1;for(let l=1;l<r;++l){let o=!1,c=t[l],d=t[l+1];if(c!==d&&(l!==1||c!==t[0]))if(s)o=!0;else{let f=l*n,h=f-n,m=f+n;for(let _=0;_!==n;++_){let y=e[f+_];if(y!==e[h+_]||y!==e[m+_]){o=!0;break}}}if(o){if(l!==a){t[a]=t[l];let f=l*n,h=a*n;for(let m=0;m!==n;++m)e[h+m]=e[f+m]}++a}}if(r>0){t[a]=t[r];for(let l=r*n,o=a*n,c=0;c!==n;++c)e[o+c]=e[l+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,Ro(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function bc(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}Qe.prototype.ValueTypeName="";Qe.prototype.TimeBufferType=Float32Array;Qe.prototype.ValueBufferType=Float32Array;Qe.prototype.DefaultInterpolation=Lr;var qn=class extends Qe{constructor(t,e,n){super(t,e,n)}};qn.prototype.ValueTypeName="bool";qn.prototype.ValueBufferType=Array;qn.prototype.DefaultInterpolation=fs;qn.prototype.InterpolantFactoryMethodLinear=void 0;qn.prototype.InterpolantFactoryMethodSmooth=void 0;var Qr=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};Qr.prototype.ValueTypeName="color";var Zr=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};Zr.prototype.ValueTypeName="number";var $r=class extends Yn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,l=this.valueSize,o=(n-e)/(s-e),c=t*l;for(let d=c+l;c!==d;c+=4)Ye.slerpFlat(r,0,a,c-l,a,c,o);return r}},Ts=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new $r(this.times,this.values,this.getValueSize(),t)}};Ts.prototype.ValueTypeName="quaternion";Ts.prototype.InterpolantFactoryMethodSmooth=void 0;var Qn=class extends Qe{constructor(t,e,n){super(t,e,n)}};Qn.prototype.ValueTypeName="string";Qn.prototype.ValueBufferType=Array;Qn.prototype.DefaultInterpolation=fs;Qn.prototype.InterpolantFactoryMethodLinear=void 0;Qn.prototype.InterpolantFactoryMethodSmooth=void 0;var jr=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};jr.prototype.ValueTypeName="vector";var ta=class{constructor(t,e,n){let s=this,r=!1,a=0,l=0,o,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(d){l++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,l),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,l),a===l&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),o?o(d):d},this.setURLModifier=function(d){return o=d,this},this.addHandler=function(d,f){return c.push(d,f),this},this.removeHandler=function(d){let f=c.indexOf(d);return f!==-1&&c.splice(f,2),this},this.getHandler=function(d){for(let f=0,h=c.length;f<h;f+=2){let m=c[f],_=c[f+1];if(m.global&&(m.lastIndex=0),m.test(d))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},xh=new ta,ea=class{constructor(t){this.manager=t!==void 0?t:xh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};ea.DEFAULT_MATERIAL_NAME="__DEFAULT";var Br=new H,Ar=new Ye,Cn=new H,Fs=class extends qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Br,Ar,Cn),Cn.x===1&&Cn.y===1&&Cn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Br,Ar,Cn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Br,Ar,Cn),Cn.x===1&&Cn.y===1&&Cn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Br,Ar,Cn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},kn=new H,Ic=new Ot,Tc=new Ot,Le=class extends Fs{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ui*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(us*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ui*2*Math.atan(Math.tan(us*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(kn.x,kn.y).multiplyScalar(-t/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(kn.x,kn.y).multiplyScalar(-t/kn.z)}getViewSize(t,e){return this.getViewBounds(t,Ic,Tc),e.subVectors(Tc,Ic)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(us*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let o=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/o,e-=a.offsetY*n/c,s*=a.width/o,n*=a.height/c}let l=this.filmOffset;l!==0&&(r+=t*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var ws=class extends Fs{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,l=s+e,o=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,l-=d*this.view.offsetY,o=l-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,l,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var Li=-90,Gi=1,na=class extends qe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Le(Li,Gi,t,e);s.layers=this.layers,this.add(s);let r=new Le(Li,Gi,t,e);r.layers=this.layers,this.add(r);let a=new Le(Li,Gi,t,e);a.layers=this.layers,this.add(a);let l=new Le(Li,Gi,t,e);l.layers=this.layers,this.add(l);let o=new Le(Li,Gi,t,e);o.layers=this.layers,this.add(o);let c=new Le(Li,Gi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,l,o]=e;for(let c of e)this.remove(c);if(t===cn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(t===gs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,l,o,c,d]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,d),t.setRenderTarget(f,h,m),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},ia=class extends Le{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var pl="\\[\\]\\.:\\/",yd=new RegExp("["+pl+"]","g"),ml="[^"+pl+"]",Md="[^"+pl.replace("\\.","")+"]",vd=/((?:WC+[\/:])*)/.source.replace("WC",ml),Sd=/(WCOD+)?/.source.replace("WCOD",Md),Dd=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ml),bd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ml),Id=new RegExp("^"+vd+Sd+Dd+bd+"$"),Td=["material","materials","bones","map"],Oo=class{constructor(t,e,n){let s=n||pe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},pe=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(yd,"")}static parseTrackName(t){let e=Id.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Td.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let l=r[a];if(l.name===e||l.uuid===e)return l;let o=n(l.children);if(o)return o}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Rt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Pt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Pt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Pt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===c){c=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Pt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Pt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Pt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Pt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Pt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let l=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?l=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let o=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Pt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Pt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}o=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(o=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(o=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[o],this.setValue=this.SetterByBindingTypeAndVersioning[o][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};pe.Composite=Oo;pe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pe.prototype.GetterByBindingType=[pe.prototype._getValue_direct,pe.prototype._getValue_array,pe.prototype._getValue_arrayElement,pe.prototype._getValue_toArray];pe.prototype.SetterByBindingTypeAndVersioning=[[pe.prototype._setValue_direct,pe.prototype._setValue_direct_setNeedsUpdate,pe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_array,pe.prototype._setValue_array_setNeedsUpdate,pe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_arrayElement,pe.prototype._setValue_arrayElement_setNeedsUpdate,pe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_fromArray,pe.prototype._setValue_fromArray_setNeedsUpdate,pe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var h_=new Float32Array(1);var Fc=new me,Rs=class{constructor(t,e,n=0,s=1/0){this.ray=new Wn(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new zi,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Pt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Fc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Fc),this}intersectObject(t,e=!0,n=[]){return Ho(t,this,n,e),n.sort(wc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Ho(t[s],this,n,e);return n.sort(wc),n}};function wc(i,t){return i.distance-t.distance}function Ho(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,l=r.length;a<l;a++)Ho(r[a],t,e,!0)}}var Wi=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Wt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Wt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Bl=class Bl{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Bl.prototype.isMatrix2=!0;var Uo=Bl;var Ls=class extends un{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function gl(i,t,e,n){let s=Fd(n);switch(e){case rl:return i*t;case ol:return i*t/s.components*s.byteLength;case ua:return i*t/s.components*s.byteLength;case ii:return i*t*2/s.components*s.byteLength;case da:return i*t*2/s.components*s.byteLength;case al:return i*t*3/s.components*s.byteLength;case en:return i*t*4/s.components*s.byteLength;case fa:return i*t*4/s.components*s.byteLength;case Hs:case Us:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ks:case zs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ma:case _a:return Math.max(i,16)*Math.max(t,8)/4;case pa:case ga:return Math.max(i,8)*Math.max(t,8)/2;case Ea:case Ca:case Ba:case Aa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case xa:case Vs:case ya:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ma:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case va:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Sa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Da:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ba:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ia:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ta:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Fa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case wa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ra:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case La:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ga:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Pa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Na:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Oa:case Ha:case Ua:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ka:case za:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ks:case Va:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Fd(i){switch(i){case Ze:case el:return{byteLength:1,components:1};case qi:case nl:case mn:return{byteLength:2,components:1};case ca:case ha:return{byteLength:2,components:4};case fn:case la:case pn:return{byteLength:4,components:1};case il:case sl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window!="undefined"&&(window.__THREE__?Rt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function zh(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Rd(i){let t=new WeakMap;function e(l,o){let c=l.array,d=l.usage,f=c.byteLength,h=i.createBuffer();i.bindBuffer(o,h),i.bufferData(o,c,d),l.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array!="undefined"&&c instanceof Float16Array)m=i.HALF_FLOAT;else if(c instanceof Uint16Array)l.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:l.version,size:f}}function n(l,o,c){let d=o.array,f=o.updateRanges;if(i.bindBuffer(c,l),f.length===0)i.bufferSubData(c,0,d);else{f.sort((m,_)=>m.start-_.start);let h=0;for(let m=1;m<f.length;m++){let _=f[h],y=f[m];y.start<=_.start+_.count+1?_.count=Math.max(_.count,y.start+y.count-_.start):(++h,f[h]=y)}f.length=h+1;for(let m=0,_=f.length;m<_;m++){let y=f[m];i.bufferSubData(c,y.start*d.BYTES_PER_ELEMENT,d,y.start,y.count)}o.clearUpdateRanges()}o.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),t.get(l)}function r(l){l.isInterleavedBufferAttribute&&(l=l.data);let o=t.get(l);o&&(i.deleteBuffer(o.buffer),t.delete(l))}function a(l,o){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){let d=t.get(l);(!d||d.version<l.version)&&t.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}let c=t.get(l);if(c===void 0)t.set(l,e(l,o));else if(c.version<l.version){if(c.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,l,o),c.version=l.version}}return{get:s,remove:r,update:a}}var Ld=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gd=`#ifdef USE_ALPHAHASH
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
#endif`,Pd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Nd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Od=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ud=`#ifdef USE_AOMAP
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
#endif`,kd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zd=`#ifdef USE_BATCHING
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
#endif`,Vd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Kd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Xd=`#ifdef USE_IRIDESCENCE
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
#endif`,Yd=`#ifdef USE_BUMPMAP
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
#endif`,qd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Qd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$d=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,tf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ef=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,nf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,sf=`#define PI 3.141592653589793
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
} // validated`,rf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,af=`vec3 transformedNormal = objectNormal;
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
#endif`,of=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uf="gl_FragColor = linearToOutputTexel( gl_FragColor );",df=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ff=`#ifdef USE_ENVMAP
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
#endif`,pf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,mf=`#ifdef USE_ENVMAP
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
#endif`,gf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_f=`#ifdef USE_ENVMAP
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
#endif`,Ef=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Af=`#ifdef USE_GRADIENTMAP
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
}`,yf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Mf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sf=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Df=`#ifdef USE_ENVMAP
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
#endif`,bf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,If=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Tf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ff=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wf=`PhysicalMaterial material;
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
#endif`,Rf=`uniform sampler2D dfgLUT;
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
}`,Lf=`
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
#endif`,Gf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Pf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Nf=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Of=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Hf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Uf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Kf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Jf=`#if defined( USE_POINTS_UV )
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
#endif`,Wf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Yf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zf=`#ifdef USE_MORPHTARGETS
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
#endif`,$f=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,tp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ep=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,np=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ip=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,sp=`#ifdef USE_NORMALMAP
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
#endif`,rp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ap=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,op=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,up=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_p=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ep=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Cp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,xp=`float getShadowMask() {
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
}`,Bp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ap=`#ifdef USE_SKINNING
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
#endif`,yp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mp=`#ifdef USE_SKINNING
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
#endif`,vp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Sp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ip=`#ifdef USE_TRANSMISSION
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
#endif`,Tp=`#ifdef USE_TRANSMISSION
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
#endif`,Fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Gp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pp=`uniform sampler2D t2D;
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
}`,Np=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Op=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Hp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Up=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kp=`#include <common>
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
}`,zp=`#if DEPTH_PACKING == 3200
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
}`,Vp=`#define DISTANCE
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
}`,Kp=`#define DISTANCE
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
}`,Jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xp=`uniform float scale;
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
}`,Yp=`uniform vec3 diffuse;
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
}`,qp=`#include <common>
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
}`,Qp=`uniform vec3 diffuse;
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
}`,Zp=`#define LAMBERT
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
}`,$p=`#define LAMBERT
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
}`,jp=`#define MATCAP
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
}`,tm=`#define MATCAP
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
}`,em=`#define NORMAL
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
}`,nm=`#define NORMAL
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
}`,im=`#define PHONG
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
}`,sm=`#define PHONG
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
}`,rm=`#define STANDARD
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
}`,am=`#define STANDARD
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
}`,om=`#define TOON
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
}`,lm=`#define TOON
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
}`,cm=`uniform float size;
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
}`,hm=`uniform vec3 diffuse;
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
}`,um=`#include <common>
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
}`,dm=`uniform vec3 color;
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
}`,fm=`uniform float rotation;
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
}`,pm=`uniform vec3 diffuse;
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
}`,Jt={alphahash_fragment:Ld,alphahash_pars_fragment:Gd,alphamap_fragment:Pd,alphamap_pars_fragment:Nd,alphatest_fragment:Od,alphatest_pars_fragment:Hd,aomap_fragment:Ud,aomap_pars_fragment:kd,batching_pars_vertex:zd,batching_vertex:Vd,begin_vertex:Kd,beginnormal_vertex:Jd,bsdfs:Wd,iridescence_fragment:Xd,bumpmap_pars_fragment:Yd,clipping_planes_fragment:qd,clipping_planes_pars_fragment:Qd,clipping_planes_pars_vertex:Zd,clipping_planes_vertex:$d,color_fragment:jd,color_pars_fragment:tf,color_pars_vertex:ef,color_vertex:nf,common:sf,cube_uv_reflection_fragment:rf,defaultnormal_vertex:af,displacementmap_pars_vertex:of,displacementmap_vertex:lf,emissivemap_fragment:cf,emissivemap_pars_fragment:hf,colorspace_fragment:uf,colorspace_pars_fragment:df,envmap_fragment:ff,envmap_common_pars_fragment:pf,envmap_pars_fragment:mf,envmap_pars_vertex:gf,envmap_physical_pars_fragment:Df,envmap_vertex:_f,fog_vertex:Ef,fog_pars_vertex:Cf,fog_fragment:xf,fog_pars_fragment:Bf,gradientmap_pars_fragment:Af,lightmap_pars_fragment:yf,lights_lambert_fragment:Mf,lights_lambert_pars_fragment:vf,lights_pars_begin:Sf,lights_toon_fragment:bf,lights_toon_pars_fragment:If,lights_phong_fragment:Tf,lights_phong_pars_fragment:Ff,lights_physical_fragment:wf,lights_physical_pars_fragment:Rf,lights_fragment_begin:Lf,lights_fragment_maps:Gf,lights_fragment_end:Pf,lightprobes_pars_fragment:Nf,logdepthbuf_fragment:Of,logdepthbuf_pars_fragment:Hf,logdepthbuf_pars_vertex:Uf,logdepthbuf_vertex:kf,map_fragment:zf,map_pars_fragment:Vf,map_particle_fragment:Kf,map_particle_pars_fragment:Jf,metalnessmap_fragment:Wf,metalnessmap_pars_fragment:Xf,morphinstance_vertex:Yf,morphcolor_vertex:qf,morphnormal_vertex:Qf,morphtarget_pars_vertex:Zf,morphtarget_vertex:$f,normal_fragment_begin:jf,normal_fragment_maps:tp,normal_pars_fragment:ep,normal_pars_vertex:np,normal_vertex:ip,normalmap_pars_fragment:sp,clearcoat_normal_fragment_begin:rp,clearcoat_normal_fragment_maps:ap,clearcoat_pars_fragment:op,iridescence_pars_fragment:lp,opaque_fragment:cp,packing:hp,premultiplied_alpha_fragment:up,project_vertex:dp,dithering_fragment:fp,dithering_pars_fragment:pp,roughnessmap_fragment:mp,roughnessmap_pars_fragment:gp,shadowmap_pars_fragment:_p,shadowmap_pars_vertex:Ep,shadowmap_vertex:Cp,shadowmask_pars_fragment:xp,skinbase_vertex:Bp,skinning_pars_vertex:Ap,skinning_vertex:yp,skinnormal_vertex:Mp,specularmap_fragment:vp,specularmap_pars_fragment:Sp,tonemapping_fragment:Dp,tonemapping_pars_fragment:bp,transmission_fragment:Ip,transmission_pars_fragment:Tp,uv_pars_fragment:Fp,uv_pars_vertex:wp,uv_vertex:Rp,worldpos_vertex:Lp,background_vert:Gp,background_frag:Pp,backgroundCube_vert:Np,backgroundCube_frag:Op,cube_vert:Hp,cube_frag:Up,depth_vert:kp,depth_frag:zp,distance_vert:Vp,distance_frag:Kp,equirect_vert:Jp,equirect_frag:Wp,linedashed_vert:Xp,linedashed_frag:Yp,meshbasic_vert:qp,meshbasic_frag:Qp,meshlambert_vert:Zp,meshlambert_frag:$p,meshmatcap_vert:jp,meshmatcap_frag:tm,meshnormal_vert:em,meshnormal_frag:nm,meshphong_vert:im,meshphong_frag:sm,meshphysical_vert:rm,meshphysical_frag:am,meshtoon_vert:om,meshtoon_frag:lm,points_vert:cm,points_frag:hm,shadow_vert:um,shadow_frag:dm,sprite_vert:fm,sprite_frag:pm},pt={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new Ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new Ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},Mn={basic:{uniforms:Pe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:Pe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Xt(0)},envMapIntensity:{value:1}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:Pe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:Pe([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:Pe([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:Pe([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:Pe([pt.points,pt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:Pe([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:Pe([pt.common,pt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:Pe([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:Pe([pt.sprite,pt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distance:{uniforms:Pe([pt.common,pt.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distance_vert,fragmentShader:Jt.distance_frag},shadow:{uniforms:Pe([pt.lights,pt.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};Mn.physical={uniforms:Pe([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new Ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new Ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new Ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};var Wa={r:0,b:0,g:0},mm=new me,Vh=new Ht;Vh.set(-1,0,0,0,1,0,0,0,1);function gm(i,t,e,n,s,r){let a=new Xt(0),l=s===!0?0:1,o,c,d=null,f=0,h=null;function m(x){let v=x.isScene===!0?x.background:null;if(v&&v.isTexture){let A=x.backgroundBlurriness>0;v=t.get(v,A)}return v}function _(x){let v=!1,A=m(x);A===null?p(a,l):A&&A.isColor&&(p(A,1),v=!0);let C=i.xr.getEnvironmentBlendMode();C==="additive"?e.buffers.color.setClear(0,0,0,1,r):C==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||v)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(x,v){let A=m(v);A&&(A.isCubeTexture||A.mapping===Ns)?(c===void 0&&(c=new xe(new Ji(1,1,1),new Ge({name:"BackgroundCubeMaterial",uniforms:mi(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:Te,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(C,M,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=A,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(mm.makeRotationFromEuler(v.backgroundRotation)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Vh),c.material.toneMapped=qt.getTransfer(A.colorSpace)!==re,(d!==A||f!==A.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,d=A,f=A.version,h=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):A&&A.isTexture&&(o===void 0&&(o=new xe(new Ds(2,2),new Ge({name:"BackgroundMaterial",uniforms:mi(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=A,o.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,o.material.toneMapped=qt.getTransfer(A.colorSpace)!==re,A.matrixAutoUpdate===!0&&A.updateMatrix(),o.material.uniforms.uvTransform.value.copy(A.matrix),(d!==A||f!==A.version||h!==i.toneMapping)&&(o.material.needsUpdate=!0,d=A,f=A.version,h=i.toneMapping),o.layers.enableAll(),x.unshift(o,o.geometry,o.material,0,0,null))}function p(x,v){x.getRGB(Wa,fl(i)),e.buffers.color.setClear(Wa.r,Wa.g,Wa.b,v,r)}function u(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,v=1){a.set(x),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(a,l)},render:_,addToRenderList:y,dispose:u}}function _m(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,a=!1;function l(T,w,U,F,N){let P=!1,k=f(T,F,U,w);r!==k&&(r=k,c(r.object)),P=m(T,F,U,N),P&&_(T,F,U,N),N!==null&&t.update(N,i.ELEMENT_ARRAY_BUFFER),(P||a)&&(a=!1,A(T,w,U,F),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function o(){return i.createVertexArray()}function c(T){return i.bindVertexArray(T)}function d(T){return i.deleteVertexArray(T)}function f(T,w,U,F){let N=F.wireframe===!0,P=n[w.id];P===void 0&&(P={},n[w.id]=P);let k=T.isInstancedMesh===!0?T.id:0,tt=P[k];tt===void 0&&(tt={},P[k]=tt);let Y=tt[U.id];Y===void 0&&(Y={},tt[U.id]=Y);let Z=Y[N];return Z===void 0&&(Z=h(o()),Y[N]=Z),Z}function h(T){let w=[],U=[],F=[];for(let N=0;N<e;N++)w[N]=0,U[N]=0,F[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:U,attributeDivisors:F,object:T,attributes:{},index:null}}function m(T,w,U,F){let N=r.attributes,P=w.attributes,k=0,tt=U.getAttributes();for(let Y in tt)if(tt[Y].location>=0){let et=N[Y],_t=P[Y];if(_t===void 0&&(Y==="instanceMatrix"&&T.instanceMatrix&&(_t=T.instanceMatrix),Y==="instanceColor"&&T.instanceColor&&(_t=T.instanceColor)),et===void 0||et.attribute!==_t||_t&&et.data!==_t.data)return!0;k++}return r.attributesNum!==k||r.index!==F}function _(T,w,U,F){let N={},P=w.attributes,k=0,tt=U.getAttributes();for(let Y in tt)if(tt[Y].location>=0){let et=P[Y];et===void 0&&(Y==="instanceMatrix"&&T.instanceMatrix&&(et=T.instanceMatrix),Y==="instanceColor"&&T.instanceColor&&(et=T.instanceColor));let _t={};_t.attribute=et,et&&et.data&&(_t.data=et.data),N[Y]=_t,k++}r.attributes=N,r.attributesNum=k,r.index=F}function y(){let T=r.newAttributes;for(let w=0,U=T.length;w<U;w++)T[w]=0}function p(T){u(T,0)}function u(T,w){let U=r.newAttributes,F=r.enabledAttributes,N=r.attributeDivisors;U[T]=1,F[T]===0&&(i.enableVertexAttribArray(T),F[T]=1),N[T]!==w&&(i.vertexAttribDivisor(T,w),N[T]=w)}function x(){let T=r.newAttributes,w=r.enabledAttributes;for(let U=0,F=w.length;U<F;U++)w[U]!==T[U]&&(i.disableVertexAttribArray(U),w[U]=0)}function v(T,w,U,F,N,P,k){k===!0?i.vertexAttribIPointer(T,w,U,N,P):i.vertexAttribPointer(T,w,U,F,N,P)}function A(T,w,U,F){y();let N=F.attributes,P=U.getAttributes(),k=w.defaultAttributeValues;for(let tt in P){let Y=P[tt];if(Y.location>=0){let Z=N[tt];if(Z===void 0&&(tt==="instanceMatrix"&&T.instanceMatrix&&(Z=T.instanceMatrix),tt==="instanceColor"&&T.instanceColor&&(Z=T.instanceColor)),Z!==void 0){let et=Z.normalized,_t=Z.itemSize,Ct=t.get(Z);if(Ct===void 0)continue;let kt=Ct.buffer,wt=Ct.type,W=Ct.bytesPerElement,O=wt===i.INT||wt===i.UNSIGNED_INT||Z.gpuType===la;if(Z.isInterleavedBufferAttribute){let J=Z.data,it=J.stride,at=Z.offset;if(J.isInstancedInterleavedBuffer){for(let rt=0;rt<Y.locationSize;rt++)u(Y.location+rt,J.meshPerAttribute);T.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let rt=0;rt<Y.locationSize;rt++)p(Y.location+rt);i.bindBuffer(i.ARRAY_BUFFER,kt);for(let rt=0;rt<Y.locationSize;rt++)v(Y.location+rt,_t/Y.locationSize,wt,et,it*W,(at+_t/Y.locationSize*rt)*W,O)}else{if(Z.isInstancedBufferAttribute){for(let J=0;J<Y.locationSize;J++)u(Y.location+J,Z.meshPerAttribute);T.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let J=0;J<Y.locationSize;J++)p(Y.location+J);i.bindBuffer(i.ARRAY_BUFFER,kt);for(let J=0;J<Y.locationSize;J++)v(Y.location+J,_t/Y.locationSize,wt,et,_t*W,_t/Y.locationSize*J*W,O)}}else if(k!==void 0){let et=k[tt];if(et!==void 0)switch(et.length){case 2:i.vertexAttrib2fv(Y.location,et);break;case 3:i.vertexAttrib3fv(Y.location,et);break;case 4:i.vertexAttrib4fv(Y.location,et);break;default:i.vertexAttrib1fv(Y.location,et)}}}}x()}function C(){D();for(let T in n){let w=n[T];for(let U in w){let F=w[U];for(let N in F){let P=F[N];for(let k in P)d(P[k].object),delete P[k];delete F[N]}}delete n[T]}}function M(T){if(n[T.id]===void 0)return;let w=n[T.id];for(let U in w){let F=w[U];for(let N in F){let P=F[N];for(let k in P)d(P[k].object),delete P[k];delete F[N]}}delete n[T.id]}function I(T){for(let w in n){let U=n[w];for(let F in U){let N=U[F];if(N[T.id]===void 0)continue;let P=N[T.id];for(let k in P)d(P[k].object),delete P[k];delete N[T.id]}}}function E(T){for(let w in n){let U=n[w],F=T.isInstancedMesh===!0?T.id:0,N=U[F];if(N!==void 0){for(let P in N){let k=N[P];for(let tt in k)d(k[tt].object),delete k[tt];delete N[P]}delete U[F],Object.keys(U).length===0&&delete n[w]}}}function D(){L(),a=!0,r!==s&&(r=s,c(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:l,reset:D,resetDefaultState:L,dispose:C,releaseStatesOfGeometry:M,releaseStatesOfObject:E,releaseStatesOfProgram:I,initAttributes:y,enableAttribute:p,disableUnusedAttributes:x}}function Em(i,t,e){let n;function s(o){n=o}function r(o,c){i.drawArrays(n,o,c),e.update(c,n,1)}function a(o,c,d){d!==0&&(i.drawArraysInstanced(n,o,c,d),e.update(c,n,d))}function l(o,c,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,o,0,c,0,d);let h=0;for(let m=0;m<d;m++)h+=c[m];e.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=l}function Cm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let I=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(I){return!(I!==en&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(I){let E=I===mn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==Ze&&I!==pn&&!E&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function o(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",d=o(c);d!==c&&(Rt("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);let f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),A=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=i.getParameter(i.MAX_SAMPLES),M=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,textureFormatReadable:a,textureTypeReadable:l,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:_,maxTextureSize:y,maxCubemapSize:p,maxAttributes:u,maxVertexUniforms:x,maxVaryings:v,maxFragmentUniforms:A,maxSamples:C,samples:M}}function xm(i){let t=this,e=null,n=0,s=!1,r=!1,a=new Xe,l=new Ht,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let m=f.length!==0||h||n!==0||s;return s=h,n=f.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=d(f,h,0)},this.setState=function(f,h,m){let _=f.clippingPlanes,y=f.clipIntersection,p=f.clipShadows,u=i.get(f);if(!s||_===null||_.length===0||r&&!p)r?d(null):c();else{let x=r?0:n,v=x*4,A=u.clippingState||null;o.value=A,A=d(_,h,v,m);for(let C=0;C!==v;++C)A[C]=e[C];u.clippingState=A,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=x}};function c(){o.value!==e&&(o.value=e,o.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function d(f,h,m,_){let y=f!==null?f.length:0,p=null;if(y!==0){if(p=o.value,_!==!0||p===null){let u=m+y*4,x=h.matrixWorldInverse;l.getNormalMatrix(x),(p===null||p.length<u)&&(p=new Float32Array(u));for(let v=0,A=m;v!==y;++v,A+=4)a.copy(f[v]).applyMatrix4(x,l),a.normal.toArray(p,A),p[A+3]=a.constant}o.value=p,o.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,p}}var ji=4,Bm=6,Am=20,ym=256,Js=new ws,Bh=new Xt,Al=null,yl=0,Ml=0,vl=!1,Mm=new H,gi=new H,Ya=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:l=Mm}=r;Al=this._renderer.getRenderTarget(),yl=this._renderer.getActiveCubeFace(),Ml=this._renderer.getActiveMipmapLevel(),vl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,s,o,l),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Al,yl,Ml),this._renderer.xr.enabled=vl,t.scissorTest=!1,$i(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ti||t.mapping===pi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Al=this._renderer.getRenderTarget(),yl=this._renderer.getActiveCubeFace(),Ml=this._renderer.getActiveMipmapLevel(),vl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ie,minFilter:Ie,generateMipmaps:!1,type:mn,format:en,colorSpace:ps,depthBuffer:!1},s=Ah(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ah(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=vm(r)),this._blurMaterial=Dm(r,t,e),this._ggxMaterial=Sm(r,t,e)}return s}_compileMaterial(t){let e=new xe(new be,t);this._renderer.compile(e,Js)}_sceneToCubeUV(t,e,n,s,r){let o=new Le(90,1,e,n),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,m=f.toneMapping;f.getClearColor(Bh),f.toneMapping=dn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new xe(new Ji,new tn({name:"PMREM.Background",side:Te,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,p=y.material,u=!1,x=t.background;x?x.isColor&&(p.color.copy(x),t.background=null,u=!0):(p.color.copy(Bh),u=!0);for(let v=0;v<6;v++){let A=v%3;A===0?(o.up.set(0,c[v],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x+d[v],r.y,r.z)):A===1?(o.up.set(0,0,c[v]),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y+d[v],r.z)):(o.up.set(0,c[v],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y,r.z+d[v]));let C=this._cubeSize;$i(s,A*C,v>2?C:0,C,C),f.setRenderTarget(s),u&&f.render(y,o),f.render(t,o)}f.toneMapping=m,f.autoClear=h,t.background=x}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===ti||t.mapping===pi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yh());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let l=r.uniforms;l.envMap.value=t;let o=this._cubeSize;$i(e,0,0,3*o,2*o),n.setRenderTarget(e),n.render(a,Js)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,l=this._lodMeshes[n];l.material=a;let o=a.uniforms,c=n/(this._lodMeshes.length-1),d=e/(this._lodMeshes.length-1),f=Math.sqrt(c*c-d*d),h=c*1.25,m=f*h,{_lodMax:_}=this,y=this._sizeLods[n],p=3*y*(n>_-ji?n-_+ji:0),u=4*(this._cubeSize-y);o.envMap.value=t.texture,o.roughness.value=m,o.mipInt.value=_-e,$i(r,p,u,3*y,2*y),s.setRenderTarget(r),s.render(l,Js),o.envMap.value=r.texture,o.roughness.value=0,o.mipInt.value=_-n,$i(t,p,u,3*y,2*y),s.setRenderTarget(t),s.render(l,Js)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){let a=this._renderer,l=this._blurMaterial,o=this._lodMeshes[s];o.material=l;let c=l.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let d=this._sizeLods[s],f=3*d*(s>this._lodMax-ji?s-this._lodMax+ji:0),h=4*(this._cubeSize-d);$i(e,f,h,3*d,2*d),a.setRenderTarget(e),a.render(o,Js)}};function vm(i){let t=[],e=[],n=i,s=i-ji+1+Bm;for(let r=0;r<s;r++){let a=Math.pow(2,n);t.push(a);let l=1/(a-2),o=-l,c=1+l,d=[o,o,c,o,c,c,o,o,c,c,o,c],f=6,h=6,m=3,_=new Float32Array(m*h*f),y=new Float32Array(m*h*f);for(let u=0;u<f;u++){let x=u%3*2/3-1,v=u>2?0:-1,A=[x,v,0,x+2/3,v,0,x+2/3,v+1,0,x,v,0,x+2/3,v+1,0,x,v+1,0];_.set(A,m*h*u);for(let C=0;C<h;C++){let M=d[C*2]*2-1,I=d[C*2+1]*2-1;u===0?gi.set(1,I,M):u===1?gi.set(-M,1,-I):u===2?gi.set(-M,I,1):u===3?gi.set(-1,I,-M):u===4?gi.set(-M,-1,I):gi.set(M,I,-1),gi.toArray(y,(u*h+C)*m)}}let p=new be;p.setAttribute("position",new Ce(_,m)),p.setAttribute("outputDirection",new Ce(y,m)),e.push(new xe(p,null)),n>ji&&n--}return{lodMeshes:e,sizeLods:t}}function Ah(i,t,e){let n=new ze(i,t,e);return n.texture.mapping=Ns,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $i(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Sm(i,t,e){return new Ge({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ym,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Za(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function Dm(i,t,e){return new Ge({name:"SphericalGaussianBlur",defines:{SAMPLES:Am,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Za(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function yh(){return new Ge({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Za(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function Mh(){return new Ge({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function Za(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var qa=class extends ze{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Ms(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ji(5,5,5),r=new Ge({name:"CubemapFromEquirect",uniforms:mi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Te,blending:An});r.uniforms.tEquirect.value=e;let a=new xe(s,r),l=e.minFilter;return e.minFilter===ei&&(e.minFilter=Ie),new na(1,10,this).update(t,a),e.minFilter=l,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function bm(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,m=!1){return h==null?null:m?a(h):r(h)}function r(h){if(h&&h.isTexture){let m=h.mapping;if(m===ra||m===aa)if(t.has(h)){let _=t.get(h).texture;return l(_,h.mapping)}else{let _=h.image;if(_&&_.height>0){let y=new qa(_.height);return y.fromEquirectangularTexture(i,h),t.set(h,y),h.addEventListener("dispose",c),l(y.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let m=h.mapping,_=m===ra||m===aa,y=m===ti||m===pi;if(_||y){let p=e.get(h),u=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==u)return n===null&&(n=new Ya(i)),p=_?n.fromEquirectangular(h,p):n.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),p.texture;if(p!==void 0)return p.texture;{let x=h.image;return _&&x&&x.height>0||y&&x&&o(x)?(n===null&&(n=new Ya(i)),p=_?n.fromEquirectangular(h):n.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),h.addEventListener("dispose",d),p.texture):null}}}return h}function l(h,m){return m===ra?h.mapping=ti:m===aa&&(h.mapping=pi),h}function o(h){let m=0,_=6;for(let y=0;y<_;y++)h[y]!==void 0&&m++;return m===_}function c(h){let m=h.target;m.removeEventListener("dispose",c);let _=t.get(m);_!==void 0&&(t.delete(m),_.dispose())}function d(h){let m=h.target;m.removeEventListener("dispose",d);let _=e.get(m);_!==void 0&&(e.delete(m),_.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function Im(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&hi("WebGLRenderer: "+n+" extension not supported."),s}}}function Tm(i,t,e,n){let s={},r=new WeakMap;function a(f){let h=f.target;h.index!==null&&t.remove(h.index);for(let _ in h.attributes)t.remove(h.attributes[_]);h.removeEventListener("dispose",a),delete s[h.id];let m=r.get(h);m&&(t.remove(m),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function l(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function o(f){let h=f.attributes;for(let m in h)t.update(h[m],i.ARRAY_BUFFER)}function c(f){let h=[],m=f.index,_=f.attributes.position,y=0;if(_===void 0)return;if(m!==null){let x=m.array;y=m.version;for(let v=0,A=x.length;v<A;v+=3){let C=x[v+0],M=x[v+1],I=x[v+2];h.push(C,M,M,I,I,C)}}else{let x=_.array;y=_.version;for(let v=0,A=x.length/3-1;v<A;v+=3){let C=v+0,M=v+1,I=v+2;h.push(C,M,M,I,I,C)}}let p=new(_.count>=65535?Bs:xs)(h,1);p.version=y;let u=r.get(f);u&&t.remove(u),r.set(f,p)}function d(f){let h=r.get(f);if(h){let m=f.index;m!==null&&h.version<m.version&&c(f)}else c(f);return r.get(f)}return{get:l,update:o,getWireframeAttribute:d}}function Fm(i,t,e){let n;function s(f){n=f}let r,a;function l(f){r=f.type,a=f.bytesPerElement}function o(f,h){i.drawElements(n,h,r,f*a),e.update(h,n,1)}function c(f,h,m){m!==0&&(i.drawElementsInstanced(n,h,r,f*a,m),e.update(h,n,m))}function d(f,h,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,m);let y=0;for(let p=0;p<m;p++)y+=h[p];e.update(y,n,1)}this.setMode=s,this.setIndex=l,this.render=o,this.renderInstances=c,this.renderMultiDraw=d}function wm(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,l){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=l*(r/3);break;case i.LINES:e.lines+=l*(r/2);break;case i.LINE_STRIP:e.lines+=l*(r-1);break;case i.LINE_LOOP:e.lines+=l*r;break;case i.POINTS:e.points+=l*r;break;default:Pt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Rm(i,t,e){let n=new WeakMap,s=new _e;function r(a,l,o){let c=a.morphTargetInfluences,d=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,f=d!==void 0?d.length:0,h=n.get(l);if(h===void 0||h.count!==f){let D=function(){I.dispose(),n.delete(l),l.removeEventListener("dispose",D)};h!==void 0&&h.texture.dispose();let m=l.morphAttributes.position!==void 0,_=l.morphAttributes.normal!==void 0,y=l.morphAttributes.color!==void 0,p=l.morphAttributes.position||[],u=l.morphAttributes.normal||[],x=l.morphAttributes.color||[],v=0;m===!0&&(v=1),_===!0&&(v=2),y===!0&&(v=3);let A=l.attributes.position.count*v,C=1;A>t.maxTextureSize&&(C=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);let M=new Float32Array(A*C*4*f),I=new Es(M,A,C,f);I.type=pn,I.needsUpdate=!0;let E=v*4;for(let L=0;L<f;L++){let T=p[L],w=u[L],U=x[L],F=A*C*4*L;for(let N=0;N<T.count;N++){let P=N*E;m===!0&&(s.fromBufferAttribute(T,N),M[F+P+0]=s.x,M[F+P+1]=s.y,M[F+P+2]=s.z,M[F+P+3]=0),_===!0&&(s.fromBufferAttribute(w,N),M[F+P+4]=s.x,M[F+P+5]=s.y,M[F+P+6]=s.z,M[F+P+7]=0),y===!0&&(s.fromBufferAttribute(U,N),M[F+P+8]=s.x,M[F+P+9]=s.y,M[F+P+10]=s.z,M[F+P+11]=U.itemSize===4?s.w:1)}}h={count:f,texture:I,size:new Ot(A,C)},n.set(l,h),l.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let m=0;for(let y=0;y<c.length;y++)m+=c[y];let _=l.morphTargetsRelative?1:1-m;o.getUniforms().setValue(i,"morphTargetBaseInfluence",_),o.getUniforms().setValue(i,"morphTargetInfluences",c)}o.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),o.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Lm(i,t,e,n,s){let r=new WeakMap;function a(c){let d=s.render.frame,f=c.geometry,h=t.get(c,f);if(r.get(h)!==d&&(t.update(h),r.set(h,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==d&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,d))),c.isSkinnedMesh){let m=c.skeleton;r.get(m)!==d&&(m.update(),r.set(m,d))}return h}function l(){r=new WeakMap}function o(c){let d=c.target;d.removeEventListener("dispose",o),n.releaseStatesOfObject(d),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:a,dispose:l}}var Gm={[Xo]:"LINEAR_TONE_MAPPING",[Yo]:"REINHARD_TONE_MAPPING",[qo]:"CINEON_TONE_MAPPING",[Qo]:"ACES_FILMIC_TONE_MAPPING",[$o]:"AGX_TONE_MAPPING",[jo]:"NEUTRAL_TONE_MAPPING",[Zo]:"CUSTOM_TONE_MAPPING"};function Pm(i,t,e,n,s,r){let a=new ze(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),l=null,o=null,c=new be;c.setAttribute("position",new ge([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ge([0,2,0,0,2,0],2));let d=new Vr({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new xe(c,d),h=new ws(-1,1,1,-1,0,1),m=null,_=null,y=!1,p,u=null,x=[],v=!1;this.setSize=function(A,C){a.setSize(A,C),l!==null&&l.setSize(A,C),o!==null&&o.setSize(A,C);for(let M=0;M<x.length;M++){let I=x[M];I.setSize&&I.setSize(A,C)}},this.setEffects=function(A){x=A,v=x.length>0&&x[0].isRenderPass===!0;let C=a.width,M=a.height;x.length>0&&l===null&&(l=new ze(C,M,{type:mn,depthBuffer:!1,stencilBuffer:!1}),o=new ze(C,M,{type:mn,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<x.length;I++){let E=x[I];E.setSize&&E.setSize(C,M)}},this.begin=function(A,C){if(y||A.toneMapping===dn&&x.length===0)return!1;if(u=C,C!==null){let M=C.width,I=C.height;(a.width!==M||a.height!==I)&&this.setSize(M,I)}return v===!1&&A.setRenderTarget(a),p=A.toneMapping,A.toneMapping=dn,!0},this.hasRenderPass=function(){return v},this.end=function(A,C){A.toneMapping=p,y=!0;let M=a,I=l;for(let E=0;E<x.length;E++){let D=x[E];D.enabled!==!1&&(D.render(A,I,M,C),D.needsSwap!==!1&&(M=I,I=I===l?o:l))}if(m!==A.outputColorSpace||_!==A.toneMapping){m=A.outputColorSpace,_=A.toneMapping,d.defines={},qt.getTransfer(m)===re&&(d.defines.SRGB_TRANSFER="");let E=Gm[_];E&&(d.defines[E]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=M.texture,A.setRenderTarget(u),A.render(f,h),u=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),l!==null&&l.dispose(),o!==null&&o.dispose(),c.dispose(),d.dispose()}}var Kh=new ke,bl=new Xn(1,1),Jh=new Es,Wh=new Nr,Xh=new Ms,vh=[],Sh=[],Dh=new Float32Array(16),bh=new Float32Array(9),Ih=new Float32Array(4);function es(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=vh[s];if(r===void 0&&(r=new Float32Array(s),vh[s]=r),t!==0){n.toArray(r,0);for(let a=1,l=0;a!==t;++a)l+=e,i[a].toArray(r,l)}return r}function ye(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Me(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function $a(i,t){let e=Sh[t];e===void 0&&(e=new Int32Array(t),Sh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Nm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Om(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2fv(this.addr,t),Me(e,t)}}function Hm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ye(e,t))return;i.uniform3fv(this.addr,t),Me(e,t)}}function Um(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4fv(this.addr,t),Me(e,t)}}function km(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Me(e,t)}else{if(ye(e,n))return;Ih.set(n),i.uniformMatrix2fv(this.addr,!1,Ih),Me(e,n)}}function zm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Me(e,t)}else{if(ye(e,n))return;bh.set(n),i.uniformMatrix3fv(this.addr,!1,bh),Me(e,n)}}function Vm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Me(e,t)}else{if(ye(e,n))return;Dh.set(n),i.uniformMatrix4fv(this.addr,!1,Dh),Me(e,n)}}function Km(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Jm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2iv(this.addr,t),Me(e,t)}}function Wm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;i.uniform3iv(this.addr,t),Me(e,t)}}function Xm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4iv(this.addr,t),Me(e,t)}}function Ym(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function qm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2uiv(this.addr,t),Me(e,t)}}function Qm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;i.uniform3uiv(this.addr,t),Me(e,t)}}function Zm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4uiv(this.addr,t),Me(e,t)}}function $m(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(bl.compareFunction=e.isReversedDepthBuffer()?Ja:Ka,r=bl):r=Kh,e.setTexture2D(t||r,s)}function jm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Wh,s)}function tg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Xh,s)}function eg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Jh,s)}function ng(i){switch(i){case 5126:return Nm;case 35664:return Om;case 35665:return Hm;case 35666:return Um;case 35674:return km;case 35675:return zm;case 35676:return Vm;case 5124:case 35670:return Km;case 35667:case 35671:return Jm;case 35668:case 35672:return Wm;case 35669:case 35673:return Xm;case 5125:return Ym;case 36294:return qm;case 36295:return Qm;case 36296:return Zm;case 35678:case 36198:case 36298:case 36306:case 35682:return $m;case 35679:case 36299:case 36307:return jm;case 35680:case 36300:case 36308:case 36293:return tg;case 36289:case 36303:case 36311:case 36292:return eg}}function ig(i,t){i.uniform1fv(this.addr,t)}function sg(i,t){let e=es(t,this.size,2);i.uniform2fv(this.addr,e)}function rg(i,t){let e=es(t,this.size,3);i.uniform3fv(this.addr,e)}function ag(i,t){let e=es(t,this.size,4);i.uniform4fv(this.addr,e)}function og(i,t){let e=es(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function lg(i,t){let e=es(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function cg(i,t){let e=es(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function hg(i,t){i.uniform1iv(this.addr,t)}function ug(i,t){i.uniform2iv(this.addr,t)}function dg(i,t){i.uniform3iv(this.addr,t)}function fg(i,t){i.uniform4iv(this.addr,t)}function pg(i,t){i.uniform1uiv(this.addr,t)}function mg(i,t){i.uniform2uiv(this.addr,t)}function gg(i,t){i.uniform3uiv(this.addr,t)}function _g(i,t){i.uniform4uiv(this.addr,t)}function Eg(i,t,e){let n=this.cache,s=t.length,r=$a(e,s);ye(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=bl:a=Kh;for(let l=0;l!==s;++l)e.setTexture2D(t[l]||a,r[l])}function Cg(i,t,e){let n=this.cache,s=t.length,r=$a(e,s);ye(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Wh,r[a])}function xg(i,t,e){let n=this.cache,s=t.length,r=$a(e,s);ye(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Xh,r[a])}function Bg(i,t,e){let n=this.cache,s=t.length,r=$a(e,s);ye(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Jh,r[a])}function Ag(i){switch(i){case 5126:return ig;case 35664:return sg;case 35665:return rg;case 35666:return ag;case 35674:return og;case 35675:return lg;case 35676:return cg;case 5124:case 35670:return hg;case 35667:case 35671:return ug;case 35668:case 35672:return dg;case 35669:case 35673:return fg;case 5125:return pg;case 36294:return mg;case 36295:return gg;case 36296:return _g;case 35678:case 36198:case 36298:case 36306:case 35682:return Eg;case 35679:case 36299:case 36307:return Cg;case 35680:case 36300:case 36308:case 36293:return xg;case 36289:case 36303:case 36311:case 36292:return Bg}}var Il=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ng(e.type)}},Tl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ag(e.type)}},Fl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let l=s[r];l.setValue(t,e[l.id],n)}}},Sl=/(\w+)(\])?(\[|\.)?/g;function Th(i,t){i.seq.push(t),i.map[t.id]=t}function yg(i,t,e){let n=i.name,s=n.length;for(Sl.lastIndex=0;;){let r=Sl.exec(n),a=Sl.lastIndex,l=r[1],o=r[2]==="]",c=r[3];if(o&&(l=l|0),c===void 0||c==="["&&a+2===s){Th(e,c===void 0?new Il(l,i,t):new Tl(l,i,t));break}else{let f=e.map[l];f===void 0&&(f=new Fl(l),Th(e,f)),e=f}}}var ts=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let l=t.getActiveUniform(e,a),o=t.getUniformLocation(e,l.name);yg(l,o,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let l=e[r],o=n[l.id];o.needsUpdate!==!1&&l.setValue(t,o.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function Fh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Mg=37297,vg=0;function Sg(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let l=a+1;n.push(`${l===t?">":" "} ${l}: ${e[a]}`)}return n.join(`
`)}var wh=new Ht;function Dg(i){qt._getMatrix(wh,qt.workingColorSpace,i);let t=`mat3( ${wh.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(i)){case ms:return[t,"LinearTransferOETF"];case re:return[t,"sRGBTransferOETF"];default:return Rt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Rh(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let l=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Sg(i.getShaderSource(t),l)}else return r}function bg(i,t){let e=Dg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var Ig={[Xo]:"Linear",[Yo]:"Reinhard",[qo]:"Cineon",[Qo]:"ACESFilmic",[$o]:"AgX",[jo]:"Neutral",[Zo]:"Custom"};function Tg(i,t){let e=Ig[t];return e===void 0?(Rt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Xa=new H;function Fg(){qt.getLuminanceCoefficients(Xa);let i=Xa.x.toFixed(4),t=Xa.y.toFixed(4),e=Xa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xs).join(`
`)}function Rg(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Lg(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,l=1;r.type===i.FLOAT_MAT2&&(l=2),r.type===i.FLOAT_MAT3&&(l=3),r.type===i.FLOAT_MAT4&&(l=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:l}}return e}function Xs(i){return i!==""}function Lh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Gh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Gg=/^[ \t]*#include +<([\w\d./]+)>/gm;function wl(i){return i.replace(Gg,Ng)}var Pg=new Map;function Ng(i,t){let e=Jt[t];if(e===void 0){let n=Pg.get(t);if(n!==void 0)e=Jt[n],Rt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return wl(e)}var Og=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ph(i){return i.replace(Og,Hg)}function Hg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Nh(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var Ug={[Gs]:"SHADOWMAP_TYPE_PCF",[Xi]:"SHADOWMAP_TYPE_VSM"};function kg(i){return Ug[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var zg={[ti]:"ENVMAP_TYPE_CUBE",[pi]:"ENVMAP_TYPE_CUBE",[Ns]:"ENVMAP_TYPE_CUBE_UV"};function Vg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":zg[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Kg={[pi]:"ENVMAP_MODE_REFRACTION"};function Jg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Kg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Wg={[Wo]:"ENVMAP_BLENDING_MULTIPLY",[th]:"ENVMAP_BLENDING_MIX",[eh]:"ENVMAP_BLENDING_ADD"};function Xg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Wg[i.combine]||"ENVMAP_BLENDING_NONE"}function Yg(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function qg(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,l=e.fragmentShader,o=kg(e),c=Vg(e),d=Jg(e),f=Xg(e),h=Yg(e),m=wg(e),_=Rg(r),y=s.createProgram(),p,u,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Xs).join(`
`),p.length>0&&(p+=`
`),u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Xs).join(`
`),u.length>0&&(u+=`
`)):(p=[Nh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+o:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xs).join(`
`),u=[Nh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+d:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+o:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==dn?"#define TONE_MAPPING":"",e.toneMapping!==dn?Jt.tonemapping_pars_fragment:"",e.toneMapping!==dn?Tg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,bg("linearToOutputTexel",e.outputColorSpace),Fg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Xs).join(`
`)),a=wl(a),a=Lh(a,e),a=Gh(a,e),l=wl(l),l=Lh(l,e),l=Gh(l,e),a=Ph(a),l=Ph(l),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,u=["#define varying in",e.glslVersion===cl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===cl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);let v=x+p+a,A=x+u+l,C=Fh(s,s.VERTEX_SHADER,v),M=Fh(s,s.FRAGMENT_SHADER,A);s.attachShader(y,C),s.attachShader(y,M),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function I(T){if(i.debug.checkShaderErrors){let w=s.getProgramInfoLog(y)||"",U=s.getShaderInfoLog(C)||"",F=s.getShaderInfoLog(M)||"",N=w.trim(),P=U.trim(),k=F.trim(),tt=!0,Y=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(tt=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,C,M);else{let Z=Rh(s,C,"vertex"),et=Rh(s,M,"fragment");Pt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+N+`
`+Z+`
`+et)}else N!==""?Rt("WebGLProgram: Program Info Log:",N):(P===""||k==="")&&(Y=!1);Y&&(T.diagnostics={runnable:tt,programLog:N,vertexShader:{log:P,prefix:p},fragmentShader:{log:k,prefix:u}})}s.deleteShader(C),s.deleteShader(M),E=new ts(s,y),D=Lg(s,y)}let E;this.getUniforms=function(){return E===void 0&&I(this),E};let D;this.getAttributes=function(){return D===void 0&&I(this),D};let L=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(y,Mg)),L},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=vg++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=C,this.fragmentShader=M,this}var Qg=0,Rl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Ll(t),e.set(t,n)),n}},Ll=class{constructor(t){this.id=Qg++,this.code=t,this.usedTimes=0}};function Zg(i){return i===ii||i===Vs||i===Ks}function $g(i,t,e,n,s,r){let a=new zi,l=new Rl,o=new Set,c=[],d=new Map,f=n.logarithmicDepthBuffer,h=n.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return o.add(E),E===0?"uv":`uv${E}`}function y(E,D,L,T,w,U){let F=T.fog,N=w.geometry,P=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?T.environment:null,k=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,tt=t.get(E.envMap||P,k),Y=tt&&tt.mapping===Ns?tt.image.height:null,Z=m[E.type];E.precision!==null&&(h=n.getMaxPrecision(E.precision),h!==E.precision&&Rt("WebGLProgram.getParameters:",E.precision,"not supported, using",h,"instead."));let et=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,_t=et!==void 0?et.length:0,Ct=0;N.morphAttributes.position!==void 0&&(Ct=1),N.morphAttributes.normal!==void 0&&(Ct=2),N.morphAttributes.color!==void 0&&(Ct=3);let kt,wt,W,O;if(Z){let ue=Mn[Z];kt=ue.vertexShader,wt=ue.fragmentShader}else{kt=E.vertexShader,wt=E.fragmentShader;let ue=l.getVertexShaderStage(E),ie=l.getFragmentShaderStage(E);l.update(E,ue,ie),W=ue.id,O=ie.id}let J=i.getRenderTarget(),it=i.state.buffers.depth.getReversed(),at=w.isInstancedMesh===!0,rt=w.isBatchedMesh===!0,vt=!!E.map,Gt=!!E.matcap,Tt=!!tt,Nt=!!E.aoMap,Qt=!!E.lightMap,Ut=!!E.bumpMap&&E.wireframe===!1,jt=!!E.normalMap,Vt=!!E.displacementMap,te=!!E.emissiveMap,ee=!!E.metalnessMap,ce=!!E.roughnessMap,b=E.anisotropy>0,ne=E.clearcoat>0,Zt=E.dispersion>0,S=E.retroreflectivity>0,g=E.iridescence>0,z=E.sheen>0,X=E.transmission>0,Q=b&&!!E.anisotropyMap,ot=ne&&!!E.clearcoatMap,lt=ne&&!!E.clearcoatNormalMap,$=ne&&!!E.clearcoatRoughnessMap,nt=g&&!!E.iridescenceMap,ct=g&&!!E.iridescenceThicknessMap,bt=z&&!!E.sheenColorMap,ft=z&&!!E.sheenRoughnessMap,ht=!!E.specularMap,It=!!E.specularColorMap,Lt=!!E.specularIntensityMap,zt=X&&!!E.transmissionMap,G=X&&!!E.thicknessMap,ut=!!E.gradientMap,j=!!E.alphaMap,dt=E.alphaTest>0,Et=!!E.alphaHash,st=!!E.extensions,Ft=dn;E.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Ft=i.toneMapping);let Mt={shaderID:Z,shaderType:E.type,shaderName:E.name,vertexShader:kt,fragmentShader:wt,defines:E.defines,customVertexShaderID:W,customFragmentShaderID:O,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:h,batching:rt,batchingColor:rt&&w._colorsTexture!==null,instancing:at,instancingColor:at&&w.instanceColor!==null,instancingMorph:at&&w.morphTexture!==null,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:qt.workingColorSpace,alphaToCoverage:!!E.alphaToCoverage,map:vt,matcap:Gt,envMap:Tt,envMapMode:Tt&&tt.mapping,envMapCubeUVHeight:Y,aoMap:Nt,lightMap:Qt,bumpMap:Ut,normalMap:jt,displacementMap:Vt,emissiveMap:te,normalMapObjectSpace:jt&&E.normalMapType===sh,normalMapTangentSpace:jt&&E.normalMapType===ll,packedNormalMap:jt&&E.normalMapType===ll&&Zg(E.normalMap.format),metalnessMap:ee,roughnessMap:ce,anisotropy:b,anisotropyMap:Q,clearcoat:ne,clearcoatMap:ot,clearcoatNormalMap:lt,clearcoatRoughnessMap:$,dispersion:Zt,retroreflection:S,iridescence:g,iridescenceMap:nt,iridescenceThicknessMap:ct,sheen:z,sheenColorMap:bt,sheenRoughnessMap:ft,specularMap:ht,specularColorMap:It,specularIntensityMap:Lt,transmission:X,transmissionMap:zt,thicknessMap:G,gradientMap:ut,opaque:E.transparent===!1&&E.blending===Yi&&E.alphaToCoverage===!1,alphaMap:j,alphaTest:dt,alphaHash:Et,combine:E.combine,mapUv:vt&&_(E.map.channel),aoMapUv:Nt&&_(E.aoMap.channel),lightMapUv:Qt&&_(E.lightMap.channel),bumpMapUv:Ut&&_(E.bumpMap.channel),normalMapUv:jt&&_(E.normalMap.channel),displacementMapUv:Vt&&_(E.displacementMap.channel),emissiveMapUv:te&&_(E.emissiveMap.channel),metalnessMapUv:ee&&_(E.metalnessMap.channel),roughnessMapUv:ce&&_(E.roughnessMap.channel),anisotropyMapUv:Q&&_(E.anisotropyMap.channel),clearcoatMapUv:ot&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:lt&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:ct&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:bt&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:ft&&_(E.sheenRoughnessMap.channel),specularMapUv:ht&&_(E.specularMap.channel),specularColorMapUv:It&&_(E.specularColorMap.channel),specularIntensityMapUv:Lt&&_(E.specularIntensityMap.channel),transmissionMapUv:zt&&_(E.transmissionMap.channel),thicknessMapUv:G&&_(E.thicknessMap.channel),alphaMapUv:j&&_(E.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(jt||b),vertexNormals:!!N.attributes.normal,vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:w.isPoints===!0&&!!N.attributes.uv&&(vt||j),fog:!!F,useFog:E.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||N.attributes.normal===void 0&&jt===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:it,skinning:w.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:Ct,numSunLights:D.sun.length,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numSunLightShadows:D.sunShadowMap.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ft,decodeVideoTexture:vt&&E.map.isVideoTexture===!0&&qt.getTransfer(E.map.colorSpace)===re,decodeVideoTextureEmissive:te&&E.emissiveMap.isVideoTexture===!0&&qt.getTransfer(E.emissiveMap.colorSpace)===re,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Ve,flipSided:E.side===Te,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:st&&E.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&E.extensions.multiDraw===!0||rt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Mt.vertexUv1s=o.has(1),Mt.vertexUv2s=o.has(2),Mt.vertexUv3s=o.has(3),o.clear(),Mt}function p(E){let D=[];if(E.shaderID?D.push(E.shaderID):(D.push(E.customVertexShaderID),D.push(E.customFragmentShaderID)),E.defines!==void 0)for(let L in E.defines)D.push(L),D.push(E.defines[L]);return E.isRawShaderMaterial===!1&&(u(D,E),x(D,E),D.push(i.outputColorSpace)),D.push(E.customProgramCacheKey),D.join()}function u(E,D){E.push(D.precision),E.push(D.outputColorSpace),E.push(D.envMapMode),E.push(D.envMapCubeUVHeight),E.push(D.mapUv),E.push(D.alphaMapUv),E.push(D.lightMapUv),E.push(D.aoMapUv),E.push(D.bumpMapUv),E.push(D.normalMapUv),E.push(D.displacementMapUv),E.push(D.emissiveMapUv),E.push(D.metalnessMapUv),E.push(D.roughnessMapUv),E.push(D.anisotropyMapUv),E.push(D.clearcoatMapUv),E.push(D.clearcoatNormalMapUv),E.push(D.clearcoatRoughnessMapUv),E.push(D.iridescenceMapUv),E.push(D.iridescenceThicknessMapUv),E.push(D.sheenColorMapUv),E.push(D.sheenRoughnessMapUv),E.push(D.specularMapUv),E.push(D.specularColorMapUv),E.push(D.specularIntensityMapUv),E.push(D.transmissionMapUv),E.push(D.thicknessMapUv),E.push(D.combine),E.push(D.fogExp2),E.push(D.sizeAttenuation),E.push(D.morphTargetsCount),E.push(D.morphAttributeCount),E.push(D.numSunLights),E.push(D.numDirLights),E.push(D.numPointLights),E.push(D.numSpotLights),E.push(D.numSpotLightMaps),E.push(D.numHemiLights),E.push(D.numRectAreaLights),E.push(D.numSunLightShadows),E.push(D.numDirLightShadows),E.push(D.numPointLightShadows),E.push(D.numSpotLightShadows),E.push(D.numSpotLightShadowsWithMaps),E.push(D.numLightProbes),E.push(D.shadowMapType),E.push(D.toneMapping),E.push(D.numClippingPlanes),E.push(D.numClipIntersection),E.push(D.depthPacking)}function x(E,D){a.disableAll(),D.instancing&&a.enable(0),D.instancingColor&&a.enable(1),D.instancingMorph&&a.enable(2),D.matcap&&a.enable(3),D.envMap&&a.enable(4),D.normalMapObjectSpace&&a.enable(5),D.normalMapTangentSpace&&a.enable(6),D.clearcoat&&a.enable(7),D.iridescence&&a.enable(8),D.alphaTest&&a.enable(9),D.vertexColors&&a.enable(10),D.vertexAlphas&&a.enable(11),D.vertexUv1s&&a.enable(12),D.vertexUv2s&&a.enable(13),D.vertexUv3s&&a.enable(14),D.vertexTangents&&a.enable(15),D.anisotropy&&a.enable(16),D.alphaHash&&a.enable(17),D.batching&&a.enable(18),D.dispersion&&a.enable(19),D.retroreflection&&a.enable(24),D.batchingColor&&a.enable(20),D.gradientMap&&a.enable(21),D.packedNormalMap&&a.enable(22),D.vertexNormals&&a.enable(23),E.push(a.mask),a.disableAll(),D.fog&&a.enable(0),D.useFog&&a.enable(1),D.flatShading&&a.enable(2),D.logarithmicDepthBuffer&&a.enable(3),D.reversedDepthBuffer&&a.enable(4),D.skinning&&a.enable(5),D.morphTargets&&a.enable(6),D.morphNormals&&a.enable(7),D.morphColors&&a.enable(8),D.premultipliedAlpha&&a.enable(9),D.shadowMapEnabled&&a.enable(10),D.doubleSided&&a.enable(11),D.flipSided&&a.enable(12),D.useDepthPacking&&a.enable(13),D.dithering&&a.enable(14),D.transmission&&a.enable(15),D.sheen&&a.enable(16),D.opaque&&a.enable(17),D.pointsUvs&&a.enable(18),D.decodeVideoTexture&&a.enable(19),D.decodeVideoTextureEmissive&&a.enable(20),D.alphaToCoverage&&a.enable(21),D.numLightProbeGrids>0&&a.enable(22),D.hasPositionAttribute&&a.enable(23),E.push(a.mask)}function v(E){let D=m[E.type],L;if(D){let T=Mn[D];L=Eh.clone(T.uniforms)}else L=E.uniforms;return L}function A(E,D){let L=d.get(D);return L!==void 0?++L.usedTimes:(L=new qg(i,D,E,s),c.push(L),d.set(D,L)),L}function C(E){if(--E.usedTimes===0){let D=c.indexOf(E);c[D]=c[c.length-1],c.pop(),d.delete(E.cacheKey),E.destroy()}}function M(E){l.remove(E)}function I(){l.dispose()}return{getParameters:y,getProgramCacheKey:p,getUniforms:v,acquireProgram:A,releaseProgram:C,releaseShaderCache:M,programs:c,dispose:I}}function jg(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let l=i.get(a);return l===void 0&&(l={},i.set(a,l)),l}function n(a){i.delete(a)}function s(a,l,o){i.get(a)[l]=o}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function t0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Oh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Hh(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h){let m=0;return h.isInstancedMesh&&(m+=2),h.isSkinnedMesh&&(m+=1),m}function l(h,m,_,y,p,u){let x=i[t];return x===void 0?(x={id:h.id,object:h,geometry:m,material:_,materialVariant:a(h),groupOrder:y,renderOrder:h.renderOrder,z:p,group:u},i[t]=x):(x.id=h.id,x.object=h,x.geometry=m,x.material=_,x.materialVariant=a(h),x.groupOrder=y,x.renderOrder=h.renderOrder,x.z=p,x.group=u),t++,x}function o(h,m,_,y,p,u,x){x.reversedDepth===!0&&(p=-p);let v=l(h,m,_,y,p,u);_.transmission>0?n.push(v):_.transparent===!0?s.push(v):e.push(v)}function c(h,m,_,y,p,u){let x=l(h,m,_,y,p,u);_.transmission>0?n.unshift(x):_.transparent===!0?s.unshift(x):e.unshift(x)}function d(h,m){e.length>1&&e.sort(h||t0),n.length>1&&n.sort(m||Oh),s.length>1&&s.sort(m||Oh)}function f(){for(let h=t,m=i.length;h<m;h++){let _=i[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:f,sort:d}}function e0(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new Hh,i.set(n,[a])):s>=r.length?(a=new Hh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function n0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new H,color:new Xt};break;case"SpotLight":e={position:new H,direction:new H,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new H,halfWidth:new H,halfHeight:new H};break}return i[t.id]=e,e}}}function i0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var s0=0;function r0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function a0(i){let t=new n0,e=i0(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new H);let s=new H,r=new me,a=new me;function l(c){let d=0,f=0,h=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let m=0,_=0,y=0,p=0,u=0,x=0,v=0,A=0,C=0,M=0,I=0,E=0,D=0,L=0;c.sort(r0);for(let w=0,U=c.length;w<U;w++){let F=c[w],N=F.color,P=F.intensity,k=F.distance,tt=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===ii?tt=F.shadow.map.texture:tt=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)d+=N.r*P,f+=N.g*P,h+=N.b*P;else if(F.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(F.sh.coefficients[Y],P);L++}else if(F.isSunLight){let Y=t.get(F);if(Y.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let Z=F.shadow,et=e.get(F);et.shadowIntensity=Z.intensity,et.shadowBias=Z.bias,et.shadowNormalBias=Z.normalBias,et.shadowRadius=Z.radius,et.shadowMapSize.copy(Z.mapSize).multiply(Z.getFrameExtents()),n.sunShadow[_]=et,n.sunShadowMap[_]=tt;let _t=Z.getViewportCount();for(let Ct=0;Ct<_t;Ct++)n.sunShadowMatrix[y+Ct]=Z.getMatrix(Ct),n.sunShadowCascade[y+Ct]=Z._cascadeData[Ct];y+=_t,_++}n.sun[m]=Y,m++}else if(F.isDirectionalLight){let Y=t.get(F);if(Y.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let Z=F.shadow,et=e.get(F);et.shadowIntensity=Z.intensity,et.shadowBias=Z.bias,et.shadowNormalBias=Z.normalBias,et.shadowRadius=Z.radius,et.shadowMapSize=Z.mapSize,n.directionalShadow[p]=et,n.directionalShadowMap[p]=tt,n.directionalShadowMatrix[p]=F.shadow.matrix,C++}n.directional[p]=Y,p++}else if(F.isSpotLight){let Y=t.get(F);Y.position.setFromMatrixPosition(F.matrixWorld),Y.color.copy(N).multiplyScalar(P),Y.distance=k,Y.coneCos=Math.cos(F.angle),Y.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),Y.decay=F.decay,n.spot[x]=Y;let Z=F.shadow;if(F.map&&(n.spotLightMap[E]=F.map,E++,Z.updateMatrices(F),F.castShadow&&D++),n.spotLightMatrix[x]=Z.matrix,F.castShadow){let et=e.get(F);et.shadowIntensity=Z.intensity,et.shadowBias=Z.bias,et.shadowNormalBias=Z.normalBias,et.shadowRadius=Z.radius,et.shadowMapSize=Z.mapSize,n.spotShadow[x]=et,n.spotShadowMap[x]=tt,I++}x++}else if(F.isRectAreaLight){let Y=t.get(F);Y.color.copy(N).multiplyScalar(P),Y.halfWidth.set(F.width*.5,0,0),Y.halfHeight.set(0,F.height*.5,0),n.rectArea[v]=Y,v++}else if(F.isPointLight){let Y=t.get(F);if(Y.color.copy(F.color).multiplyScalar(F.intensity),Y.distance=F.distance,Y.decay=F.decay,F.castShadow){let Z=F.shadow,et=e.get(F);et.shadowIntensity=Z.intensity,et.shadowBias=Z.bias,et.shadowNormalBias=Z.normalBias,et.shadowRadius=Z.radius,et.shadowMapSize=Z.mapSize,et.shadowCameraNear=Z.camera.near,et.shadowCameraFar=Z.camera.far,n.pointShadow[u]=et,n.pointShadowMap[u]=tt,n.pointShadowMatrix[u]=F.shadow.matrix,M++}n.point[u]=Y,u++}else if(F.isHemisphereLight){let Y=t.get(F);Y.skyColor.copy(F.color).multiplyScalar(P),Y.groundColor.copy(F.groundColor).multiplyScalar(P),n.hemi[A]=Y,A++}}v>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=f,n.ambient[2]=h;let T=n.hash;(T.sunLength!==m||T.directionalLength!==p||T.pointLength!==u||T.spotLength!==x||T.rectAreaLength!==v||T.hemiLength!==A||T.numSunShadows!==_||T.numDirectionalShadows!==C||T.numPointShadows!==M||T.numSpotShadows!==I||T.numSpotMaps!==E||T.numLightProbes!==L)&&(n.sun.length=m,n.directional.length=p,n.spot.length=x,n.rectArea.length=v,n.point.length=u,n.hemi.length=A,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=C,n.directionalShadowMap.length=C,n.directionalShadowMatrix.length=C,n.pointShadow.length=M,n.pointShadowMap.length=M,n.pointShadowMatrix.length=M,n.spotShadow.length=I,n.spotShadowMap.length=I,n.spotLightMatrix.length=I+E-D,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=D,n.numLightProbes=L,T.sunLength=m,T.directionalLength=p,T.pointLength=u,T.spotLength=x,T.rectAreaLength=v,T.hemiLength=A,T.numSunShadows=_,T.numDirectionalShadows=C,T.numPointShadows=M,T.numSpotShadows=I,T.numSpotMaps=E,T.numLightProbes=L,n.version=s0++)}function o(c,d){let f=0,h=0,m=0,_=0,y=0,p=0,u=d.matrixWorldInverse;for(let x=0,v=c.length;x<v;x++){let A=c[x];if(A.isSunLight){let C=n.sun[f];C.direction.setFromMatrixPosition(A.matrixWorld),C.direction.transformDirection(u),f++}else if(A.isDirectionalLight){let C=n.directional[h];C.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(u),h++}else if(A.isSpotLight){let C=n.spot[_];C.position.setFromMatrixPosition(A.matrixWorld),C.position.applyMatrix4(u),C.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(u),_++}else if(A.isRectAreaLight){let C=n.rectArea[y];C.position.setFromMatrixPosition(A.matrixWorld),C.position.applyMatrix4(u),a.identity(),r.copy(A.matrixWorld),r.premultiply(u),a.extractRotation(r),C.halfWidth.set(A.width*.5,0,0),C.halfHeight.set(0,A.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),y++}else if(A.isPointLight){let C=n.point[m];C.position.setFromMatrixPosition(A.matrixWorld),C.position.applyMatrix4(u),m++}else if(A.isHemisphereLight){let C=n.hemi[p];C.direction.setFromMatrixPosition(A.matrixWorld),C.direction.transformDirection(u),p++}}}return{setup:l,setupView:o,state:n}}function Uh(i){let t=new a0(i),e=[],n=[],s=[];function r(h){f.camera=h,e.length=0,n.length=0,s.length=0}function a(h){e.push(h)}function l(h){n.push(h)}function o(h){s.push(h)}function c(){t.setup(e)}function d(h){t.setupView(e,h)}let f={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:l,pushLightProbeGrid:o}}function o0(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),l;return a===void 0?(l=new Uh(i),t.set(s,[l])):r>=a.length?(l=new Uh(i),a.push(l)):l=a[r],l}function n(){t=new WeakMap}return{get:e,dispose:n}}var l0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,c0=`uniform sampler2D shadow_pass;
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
}`,h0=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],u0=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],kh=new me,Ws=new H,Dl=new H;function d0(i,t,e){let n=new As,s=new Ot,r=new Ot,a=new _e,l=new Kr,o=new Jr,c={},d=e.maxTextureSize,f={[jn]:Te,[Te]:jn,[Ve]:Ve},h=new Ge({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ot},radius:{value:4}},vertexShader:l0,fragmentShader:c0}),m=h.clone();m.defines.HORIZONTAL_PASS=1;let _=new be;_.setAttribute("position",new Ce(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new xe(_,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gs;let u=this.type;this.render=function(M,I,E){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||M.length===0)return;this.type===Gc&&(Rt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Gs);let D=i.getRenderTarget(),L=i.getActiveCubeFace(),T=i.getActiveMipmapLevel(),w=i.state;w.setBlending(An),w.buffers.depth.getReversed()===!0?w.buffers.color.setClear(0,0,0,0):w.buffers.color.setClear(1,1,1,1),w.buffers.depth.setTest(!0),w.setScissorTest(!1);let U=u!==this.type;U&&I.traverse(function(F){F.material&&(Array.isArray(F.material)?F.material.forEach(N=>N.needsUpdate=!0):F.material.needsUpdate=!0)});for(let F=0,N=M.length;F<N;F++){let P=M[F],k=P.shadow;if(k===void 0){Rt("WebGLShadowMap:",P,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);let tt=k.getFrameExtents();s.multiply(tt),r.copy(k.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/tt.x),s.x=r.x*tt.x,k.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/tt.y),s.y=r.y*tt.y,k.mapSize.y=r.y));let Y=i.state.buffers.depth.getReversed();if(k.camera._reversedDepth=Y,k.map===null||U===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===Xi){if(P.isPointLight){Rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new ze(s.x,s.y,{format:ii,type:mn,minFilter:Ie,magFilter:Ie,generateMipmaps:!1}),k.map.texture.name=P.name+".shadowMap",k.map.depthTexture=new Xn(s.x,s.y,pn),k.map.depthTexture.name=P.name+".shadowMapDepth",k.map.depthTexture.format=Bn,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=De,k.map.depthTexture.magFilter=De}else P.isPointLight?(k.map=new qa(s.x),k.map.depthTexture=new zr(s.x,fn)):(k.map=new ze(s.x,s.y),k.map.depthTexture=new Xn(s.x,s.y,fn)),k.map.depthTexture.name=P.name+".shadowMap",k.map.depthTexture.format=Bn,this.type===Gs?(k.map.depthTexture.compareFunction=Y?Ja:Ka,k.map.depthTexture.minFilter=Ie,k.map.depthTexture.magFilter=Ie):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=De,k.map.depthTexture.magFilter=De);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==s.x||k.map.height!==s.y)&&k.map.setSize(s.x,s.y);let Z=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();P.isPointLight!==!0&&k.updateMatrices(P,E);for(let et=0;et<Z;et++){let _t=k.getCamera(et);if(P.isPointLight){let Ct=k.camera,kt=k.matrix,wt=P.distance||Ct.far;wt!==Ct.far&&(Ct.far=wt,Ct.updateProjectionMatrix()),Ws.setFromMatrixPosition(P.matrixWorld),Ct.position.copy(Ws),Dl.copy(Ct.position),Dl.add(h0[et]),Ct.up.copy(u0[et]),Ct.lookAt(Dl),Ct.updateMatrixWorld(),kt.makeTranslation(-Ws.x,-Ws.y,-Ws.z),kh.multiplyMatrices(Ct.projectionMatrix,Ct.matrixWorldInverse),k._frustum.setFromProjectionMatrix(kh,Ct.coordinateSystem,Ct.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,et),i.clear();else{et===0&&(i.setRenderTarget(k.map),i.clear());let Ct=k.getViewport(et);a.set(r.x*Ct.x,r.y*Ct.y,r.x*Ct.z,r.y*Ct.w),w.viewport(a)}n=k.getFrustum(et),A(I,E,_t,P,this.type)}k.isPointLightShadow!==!0&&this.type===Xi&&x(k,E),k.needsUpdate=!1}u=this.type,p.needsUpdate=!1,i.setRenderTarget(D,L,T)};function x(M,I){let E=t.update(y);h.defines.VSM_SAMPLES!==M.blurSamples&&(h.defines.VSM_SAMPLES=M.blurSamples,m.defines.VSM_SAMPLES=M.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),M.mapPass===null?M.mapPass=new ze(s.x,s.y,{format:ii,type:mn}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),h.uniforms.shadow_pass.value=M.map.depthTexture,h.uniforms.resolution.value.set(M.map.width,M.map.height),h.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(I,null,E,h,y,null),m.uniforms.shadow_pass.value=M.mapPass.texture,m.uniforms.resolution.value.set(M.map.width,M.map.height),m.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(I,null,E,m,y,null)}function v(M,I,E,D){let L=null,T=E.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(T!==void 0)L=T;else if(L=E.isPointLight===!0?o:l,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let w=L.uuid,U=I.uuid,F=c[w];F===void 0&&(F={},c[w]=F);let N=F[U];N===void 0&&(N=L.clone(),F[U]=N,I.addEventListener("dispose",C)),L=N}if(L.visible=I.visible,L.wireframe=I.wireframe,D===Xi?L.side=I.shadowSide!==null?I.shadowSide:I.side:L.side=I.shadowSide!==null?I.shadowSide:f[I.side],L.alphaMap=I.alphaMap,L.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,L.map=I.map,L.clipShadows=I.clipShadows,L.clippingPlanes=I.clippingPlanes,L.clipIntersection=I.clipIntersection,L.displacementMap=I.displacementMap,L.displacementScale=I.displacementScale,L.displacementBias=I.displacementBias,L.wireframeLinewidth=I.wireframeLinewidth,L.linewidth=I.linewidth,E.isPointLight===!0&&L.isMeshDistanceMaterial===!0){let w=i.properties.get(L);w.light=E}return L}function A(M,I,E,D,L){if(M.visible===!1)return;if(M.layers.test(I.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&L===Xi)&&(!M.frustumCulled||M.intersectsFrustum(n))){M.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,M.matrixWorld);let U=t.update(M),F=M.material;if(Array.isArray(F)){let N=U.groups;for(let P=0,k=N.length;P<k;P++){let tt=N[P],Y=F[tt.materialIndex];if(Y&&Y.visible){let Z=v(M,Y,D,L);M.onBeforeShadow(i,M,I,E,U,Z,tt),i.renderBufferDirect(E,null,U,Z,M,tt),M.onAfterShadow(i,M,I,E,U,Z,tt)}}}else if(F.visible){let N=v(M,F,D,L);M.onBeforeShadow(i,M,I,E,U,N,null),i.renderBufferDirect(E,null,U,N,M,null),M.onAfterShadow(i,M,I,E,U,N,null)}}let w=M.children;for(let U=0,F=w.length;U<F;U++)A(w[U],I,E,D,L)}function C(M){M.target.removeEventListener("dispose",C);for(let E in c){let D=c[E],L=M.target.uuid;L in D&&(D[L].dispose(),delete D[L])}}}function f0(i,t){function e(){let G=!1,ut=new _e,j=null,dt=new _e(0,0,0,0);return{setMask:function(Et){j!==Et&&!G&&(i.colorMask(Et,Et,Et,Et),j=Et)},setLocked:function(Et){G=Et},setClear:function(Et,st,Ft,Mt,ue){ue===!0&&(Et*=Mt,st*=Mt,Ft*=Mt),ut.set(Et,st,Ft,Mt),dt.equals(ut)===!1&&(i.clearColor(Et,st,Ft,Mt),dt.copy(ut))},reset:function(){G=!1,j=null,dt.set(-1,0,0,0)}}}function n(){let G=!1,ut=!1,j=null,dt=null,Et=null;return{setReversed:function(st){if(ut!==st){let Ft=t.get("EXT_clip_control");st?Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.ZERO_TO_ONE_EXT):Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.NEGATIVE_ONE_TO_ONE_EXT),ut=st;let Mt=Et;Et=null,this.setClear(Mt)}},getReversed:function(){return ut},setTest:function(st){st?J(i.DEPTH_TEST):it(i.DEPTH_TEST)},setMask:function(st){j!==st&&!G&&(i.depthMask(st),j=st)},setFunc:function(st){if(ut&&(st=gh[st]),dt!==st){switch(st){case vr:i.depthFunc(i.NEVER);break;case Sr:i.depthFunc(i.ALWAYS);break;case Dr:i.depthFunc(i.LESS);break;case Oi:i.depthFunc(i.LEQUAL);break;case br:i.depthFunc(i.EQUAL);break;case Ir:i.depthFunc(i.GEQUAL);break;case Tr:i.depthFunc(i.GREATER);break;case Fr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}dt=st}},setLocked:function(st){G=st},setClear:function(st){Et!==st&&(Et=st,ut&&(st=1-st),i.clearDepth(st))},reset:function(){G=!1,j=null,dt=null,Et=null,ut=!1}}}function s(){let G=!1,ut=null,j=null,dt=null,Et=null,st=null,Ft=null,Mt=null,ue=null;return{setTest:function(ie){G||(ie?J(i.STENCIL_TEST):it(i.STENCIL_TEST))},setMask:function(ie){ut!==ie&&!G&&(i.stencilMask(ie),ut=ie)},setFunc:function(ie,rn,_n){(j!==ie||dt!==rn||Et!==_n)&&(i.stencilFunc(ie,rn,_n),j=ie,dt=rn,Et=_n)},setOp:function(ie,rn,_n){(st!==ie||Ft!==rn||Mt!==_n)&&(i.stencilOp(ie,rn,_n),st=ie,Ft=rn,Mt=_n)},setLocked:function(ie){G=ie},setClear:function(ie){ue!==ie&&(i.clearStencil(ie),ue=ie)},reset:function(){G=!1,ut=null,j=null,dt=null,Et=null,st=null,Ft=null,Mt=null,ue=null}}}let r=new e,a=new n,l=new s,o=new WeakMap,c=new WeakMap,d={},f={},h={},m=new WeakMap,_=[],y=null,p=!1,u=null,x=null,v=null,A=null,C=null,M=null,I=null,E=new Xt(0,0,0),D=0,L=!1,T=null,w=null,U=null,F=null,N=null,P=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,tt=0,Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(tt=parseFloat(/^WebGL (\d)/.exec(Y)[1]),k=tt>=1):Y.indexOf("OpenGL ES")!==-1&&(tt=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),k=tt>=2);let Z=null,et={},_t=i.getParameter(i.SCISSOR_BOX),Ct=i.getParameter(i.VIEWPORT),kt=new _e().fromArray(_t),wt=new _e().fromArray(Ct);function W(G,ut,j,dt){let Et=new Uint8Array(4),st=i.createTexture();i.bindTexture(G,st),i.texParameteri(G,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(G,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ft=0;Ft<j;Ft++)G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?i.texImage3D(ut,0,i.RGBA,1,1,dt,0,i.RGBA,i.UNSIGNED_BYTE,Et):i.texImage2D(ut+Ft,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Et);return st}let O={};O[i.TEXTURE_2D]=W(i.TEXTURE_2D,i.TEXTURE_2D,1),O[i.TEXTURE_CUBE_MAP]=W(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),O[i.TEXTURE_2D_ARRAY]=W(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),O[i.TEXTURE_3D]=W(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),l.setClear(0),J(i.DEPTH_TEST),a.setFunc(Oi),Ut(!1),jt(ko),J(i.CULL_FACE),Nt(An);function J(G){d[G]!==!0&&(i.enable(G),d[G]=!0)}function it(G){d[G]!==!1&&(i.disable(G),d[G]=!1)}function at(G,ut){return h[G]!==ut?(i.bindFramebuffer(G,ut),h[G]=ut,G===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ut),G===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ut),!0):!1}function rt(G,ut){let j=_,dt=!1;if(G){j=m.get(ut),j===void 0&&(j=[],m.set(ut,j));let Et=G.textures;if(j.length!==Et.length||j[0]!==i.COLOR_ATTACHMENT0){for(let st=0,Ft=Et.length;st<Ft;st++)j[st]=i.COLOR_ATTACHMENT0+st;j.length=Et.length,dt=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,dt=!0);dt&&i.drawBuffers(j)}function vt(G){return y!==G?(i.useProgram(G),y=G,!0):!1}let Gt={[fi]:i.FUNC_ADD,[Nc]:i.FUNC_SUBTRACT,[Oc]:i.FUNC_REVERSE_SUBTRACT};Gt[Hc]=i.MIN,Gt[Uc]=i.MAX;let Tt={[kc]:i.ZERO,[zc]:i.ONE,[Vc]:i.SRC_COLOR,[Ko]:i.SRC_ALPHA,[qc]:i.SRC_ALPHA_SATURATE,[Xc]:i.DST_COLOR,[Jc]:i.DST_ALPHA,[Kc]:i.ONE_MINUS_SRC_COLOR,[Jo]:i.ONE_MINUS_SRC_ALPHA,[Yc]:i.ONE_MINUS_DST_COLOR,[Wc]:i.ONE_MINUS_DST_ALPHA,[Qc]:i.CONSTANT_COLOR,[Zc]:i.ONE_MINUS_CONSTANT_COLOR,[$c]:i.CONSTANT_ALPHA,[jc]:i.ONE_MINUS_CONSTANT_ALPHA};function Nt(G,ut,j,dt,Et,st,Ft,Mt,ue,ie){if(G===An){p===!0&&(it(i.BLEND),p=!1);return}if(p===!1&&(J(i.BLEND),p=!0),G!==Pc){if(G!==u||ie!==L){if((x!==fi||C!==fi)&&(i.blendEquation(i.FUNC_ADD),x=fi,C=fi),ie)switch(G){case Yi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ps:i.blendFunc(i.ONE,i.ONE);break;case zo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Vo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Pt("WebGLState: Invalid blending: ",G);break}else switch(G){case Yi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ps:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case zo:Pt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Vo:Pt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Pt("WebGLState: Invalid blending: ",G);break}v=null,A=null,M=null,I=null,E.set(0,0,0),D=0,u=G,L=ie}return}Et=Et||ut,st=st||j,Ft=Ft||dt,(ut!==x||Et!==C)&&(i.blendEquationSeparate(Gt[ut],Gt[Et]),x=ut,C=Et),(j!==v||dt!==A||st!==M||Ft!==I)&&(i.blendFuncSeparate(Tt[j],Tt[dt],Tt[st],Tt[Ft]),v=j,A=dt,M=st,I=Ft),(Mt.equals(E)===!1||ue!==D)&&(i.blendColor(Mt.r,Mt.g,Mt.b,ue),E.copy(Mt),D=ue),u=G,L=!1}function Qt(G,ut){G.side===Ve?it(i.CULL_FACE):J(i.CULL_FACE);let j=G.side===Te;ut&&(j=!j),Ut(j),G.blending===Yi&&G.transparent===!1?Nt(An):Nt(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),a.setFunc(G.depthFunc),a.setTest(G.depthTest),a.setMask(G.depthWrite),r.setMask(G.colorWrite);let dt=G.stencilWrite;l.setTest(dt),dt&&(l.setMask(G.stencilWriteMask),l.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),l.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),te(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):it(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ut(G){T!==G&&(G?i.frontFace(i.CW):i.frontFace(i.CCW),T=G)}function jt(G){G!==Rc?(J(i.CULL_FACE),G!==w&&(G===ko?i.cullFace(i.BACK):G===Lc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):it(i.CULL_FACE),w=G}function Vt(G){G!==U&&(k&&i.lineWidth(G),U=G)}function te(G,ut,j){G?(J(i.POLYGON_OFFSET_FILL),(F!==ut||N!==j)&&(F=ut,N=j,a.getReversed()&&(ut=-ut),i.polygonOffset(ut,j))):it(i.POLYGON_OFFSET_FILL)}function ee(G){G?J(i.SCISSOR_TEST):it(i.SCISSOR_TEST)}function ce(G){G===void 0&&(G=i.TEXTURE0+P-1),Z!==G&&(i.activeTexture(G),Z=G)}function b(G,ut,j){j===void 0&&(Z===null?j=i.TEXTURE0+P-1:j=Z);let dt=et[j];dt===void 0&&(dt={type:void 0,texture:void 0},et[j]=dt),(dt.type!==G||dt.texture!==ut)&&(Z!==j&&(i.activeTexture(j),Z=j),i.bindTexture(G,ut||O[G]),dt.type=G,dt.texture=ut)}function ne(){let G=et[Z];G!==void 0&&G.type!==void 0&&(i.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function Zt(){try{i.compressedTexImage2D(...arguments)}catch(G){Pt("WebGLState:",G)}}function S(){try{i.compressedTexImage3D(...arguments)}catch(G){Pt("WebGLState:",G)}}function g(){try{i.texSubImage2D(...arguments)}catch(G){Pt("WebGLState:",G)}}function z(){try{i.texSubImage3D(...arguments)}catch(G){Pt("WebGLState:",G)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(G){Pt("WebGLState:",G)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(G){Pt("WebGLState:",G)}}function ot(){try{i.texStorage2D(...arguments)}catch(G){Pt("WebGLState:",G)}}function lt(){try{i.texStorage3D(...arguments)}catch(G){Pt("WebGLState:",G)}}function $(){try{i.texImage2D(...arguments)}catch(G){Pt("WebGLState:",G)}}function nt(){try{i.texImage3D(...arguments)}catch(G){Pt("WebGLState:",G)}}function ct(G){return f[G]!==void 0?f[G]:i.getParameter(G)}function bt(G,ut){f[G]!==ut&&(i.pixelStorei(G,ut),f[G]=ut)}function ft(G){kt.equals(G)===!1&&(i.scissor(G.x,G.y,G.z,G.w),kt.copy(G))}function ht(G){wt.equals(G)===!1&&(i.viewport(G.x,G.y,G.z,G.w),wt.copy(G))}function It(G,ut){let j=c.get(ut);j===void 0&&(j=new WeakMap,c.set(ut,j));let dt=j.get(G);dt===void 0&&(dt=i.getUniformBlockIndex(ut,G.name),j.set(G,dt))}function Lt(G,ut){let dt=c.get(ut).get(G);o.get(ut)!==dt&&(i.uniformBlockBinding(ut,dt,G.__bindingPointIndex),o.set(ut,dt))}function zt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},f={},Z=null,et={},h={},m=new WeakMap,_=[],y=null,p=!1,u=null,x=null,v=null,A=null,C=null,M=null,I=null,E=new Xt(0,0,0),D=0,L=!1,T=null,w=null,U=null,F=null,N=null,kt.set(0,0,i.canvas.width,i.canvas.height),wt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),l.reset()}return{buffers:{color:r,depth:a,stencil:l},enable:J,disable:it,bindFramebuffer:at,drawBuffers:rt,useProgram:vt,setBlending:Nt,setMaterial:Qt,setFlipSided:Ut,setCullFace:jt,setLineWidth:Vt,setPolygonOffset:te,setScissorTest:ee,activeTexture:ce,bindTexture:b,unbindTexture:ne,compressedTexImage2D:Zt,compressedTexImage3D:S,texImage2D:$,texImage3D:nt,pixelStorei:bt,getParameter:ct,updateUBOMapping:It,uniformBlockBinding:Lt,texStorage2D:ot,texStorage3D:lt,texSubImage2D:g,texSubImage3D:z,compressedTexSubImage2D:X,compressedTexSubImage3D:Q,scissor:ft,viewport:ht,reset:zt}}function p0(i,t,e,n,s,r,a){let l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ot,d=new WeakMap,f=new Set,h,m=new WeakMap,_=!1;try{_=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(S,g){return _?new OffscreenCanvas(S,g):_s("canvas")}function p(S,g,z){let X=1,Q=Zt(S);if((Q.width>z||Q.height>z)&&(X=z/Math.max(Q.width,Q.height)),X<1)if(typeof HTMLImageElement!="undefined"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&S instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&S instanceof ImageBitmap||typeof VideoFrame!="undefined"&&S instanceof VideoFrame){let ot=Math.floor(X*Q.width),lt=Math.floor(X*Q.height);h===void 0&&(h=y(ot,lt));let $=g?y(ot,lt):h;return $.width=ot,$.height=lt,$.getContext("2d").drawImage(S,0,0,ot,lt),Rt("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+ot+"x"+lt+")."),$}else return"data"in S&&Rt("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),S;return S}function u(S){return S.generateMipmaps}function x(S){i.generateMipmap(S)}function v(S){return S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?i.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function A(S,g,z,X,Q,ot=!1){if(S!==null){if(i[S]!==void 0)return i[S];Rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let lt;X&&(lt=t.get("EXT_texture_norm16"),lt||Rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=g;if(g===i.RED&&(z===i.FLOAT&&($=i.R32F),z===i.HALF_FLOAT&&($=i.R16F),z===i.UNSIGNED_BYTE&&($=i.R8),z===i.UNSIGNED_SHORT&&lt&&($=lt.R16_EXT),z===i.SHORT&&lt&&($=lt.R16_SNORM_EXT)),g===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&($=i.R8UI),z===i.UNSIGNED_SHORT&&($=i.R16UI),z===i.UNSIGNED_INT&&($=i.R32UI),z===i.BYTE&&($=i.R8I),z===i.SHORT&&($=i.R16I),z===i.INT&&($=i.R32I)),g===i.RG&&(z===i.FLOAT&&($=i.RG32F),z===i.HALF_FLOAT&&($=i.RG16F),z===i.UNSIGNED_BYTE&&($=i.RG8),z===i.UNSIGNED_SHORT&&lt&&($=lt.RG16_EXT),z===i.SHORT&&lt&&($=lt.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&($=i.RG8UI),z===i.UNSIGNED_SHORT&&($=i.RG16UI),z===i.UNSIGNED_INT&&($=i.RG32UI),z===i.BYTE&&($=i.RG8I),z===i.SHORT&&($=i.RG16I),z===i.INT&&($=i.RG32I)),g===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&($=i.RGB8UI),z===i.UNSIGNED_SHORT&&($=i.RGB16UI),z===i.UNSIGNED_INT&&($=i.RGB32UI),z===i.BYTE&&($=i.RGB8I),z===i.SHORT&&($=i.RGB16I),z===i.INT&&($=i.RGB32I)),g===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&($=i.RGBA8UI),z===i.UNSIGNED_SHORT&&($=i.RGBA16UI),z===i.UNSIGNED_INT&&($=i.RGBA32UI),z===i.BYTE&&($=i.RGBA8I),z===i.SHORT&&($=i.RGBA16I),z===i.INT&&($=i.RGBA32I)),g===i.RGB&&(z===i.UNSIGNED_SHORT&&lt&&($=lt.RGB16_EXT),z===i.SHORT&&lt&&($=lt.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),g===i.RGBA){let nt=ot?ms:qt.getTransfer(Q);z===i.FLOAT&&($=i.RGBA32F),z===i.HALF_FLOAT&&($=i.RGBA16F),z===i.UNSIGNED_BYTE&&($=nt===re?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&lt&&($=lt.RGBA16_EXT),z===i.SHORT&&lt&&($=lt.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function C(S,g){let z;return S?g===null||g===fn||g===Qi?z=i.DEPTH24_STENCIL8:g===pn?z=i.DEPTH32F_STENCIL8:g===qi&&(z=i.DEPTH24_STENCIL8,Rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===fn||g===Qi?z=i.DEPTH_COMPONENT24:g===pn?z=i.DEPTH_COMPONENT32F:g===qi&&(z=i.DEPTH_COMPONENT16),z}function M(S,g){return u(S)===!0||S.isFramebufferTexture&&S.minFilter!==De&&S.minFilter!==Ie?Math.log2(Math.max(g.width,g.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?g.mipmaps.length:1}function I(S){let g=S.target;g.removeEventListener("dispose",I),D(g),g.isVideoTexture&&d.delete(g),g.isHTMLTexture&&f.delete(g)}function E(S){let g=S.target;g.removeEventListener("dispose",E),T(g)}function D(S){let g=n.get(S);if(g.__webglInit===void 0)return;let z=S.source,X=m.get(z);if(X){let Q=X[g.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&L(S),Object.keys(X).length===0&&m.delete(z)}n.remove(S)}function L(S){let g=n.get(S);i.deleteTexture(g.__webglTexture);let z=S.source,X=m.get(z);delete X[g.__cacheKey],a.memory.textures--}function T(S){let g=n.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),n.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(g.__webglFramebuffer[X]))for(let Q=0;Q<g.__webglFramebuffer[X].length;Q++)i.deleteFramebuffer(g.__webglFramebuffer[X][Q]);else i.deleteFramebuffer(g.__webglFramebuffer[X]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[X])}else{if(Array.isArray(g.__webglFramebuffer))for(let X=0;X<g.__webglFramebuffer.length;X++)i.deleteFramebuffer(g.__webglFramebuffer[X]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let X=0;X<g.__webglColorRenderbuffer.length;X++)g.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[X]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let z=S.textures;for(let X=0,Q=z.length;X<Q;X++){let ot=n.get(z[X]);ot.__webglTexture&&(i.deleteTexture(ot.__webglTexture),a.memory.textures--),n.remove(z[X])}n.remove(S)}let w=0;function U(){w=0}function F(){return w}function N(S){w=S}function P(){let S=w;return S>=s.maxTextures&&Rt("WebGLTextures: Trying to use "+(S+1)+" texture units while this GPU supports only "+s.maxTextures),w+=1,S}function k(S){let g=[];return g.push(S.wrapS),g.push(S.wrapT),g.push(S.wrapR||0),g.push(S.magFilter),g.push(S.minFilter),g.push(S.anisotropy),g.push(S.internalFormat),g.push(S.format),g.push(S.type),g.push(S.generateMipmaps),g.push(S.premultiplyAlpha),g.push(S.flipY),g.push(S.unpackAlignment),g.push(S.colorSpace),g.join()}function tt(S,g){let z=n.get(S);if(S.isVideoTexture&&b(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&z.__version!==S.version){let X=S.image;if(X===null)Rt("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Rt("WebGLRenderer: Texture marked for update but image is incomplete");else{it(z,S,g);return}}else S.isExternalTexture&&(z.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+g)}function Y(S,g){let z=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&z.__version!==S.version){it(z,S,g);return}else S.isExternalTexture&&(z.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+g)}function Z(S,g){let z=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&z.__version!==S.version){it(z,S,g);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+g)}function et(S,g){let z=n.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&z.__version!==S.version){at(z,S,g);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+g)}let _t={[wr]:i.REPEAT,[xn]:i.CLAMP_TO_EDGE,[Rr]:i.MIRRORED_REPEAT},Ct={[De]:i.NEAREST,[nh]:i.NEAREST_MIPMAP_NEAREST,[Os]:i.NEAREST_MIPMAP_LINEAR,[Ie]:i.LINEAR,[oa]:i.LINEAR_MIPMAP_NEAREST,[ei]:i.LINEAR_MIPMAP_LINEAR},kt={[ah]:i.NEVER,[uh]:i.ALWAYS,[oh]:i.LESS,[Ka]:i.LEQUAL,[lh]:i.EQUAL,[Ja]:i.GEQUAL,[ch]:i.GREATER,[hh]:i.NOTEQUAL};function wt(S,g){if(g.type===pn&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===Ie||g.magFilter===oa||g.magFilter===Os||g.magFilter===ei||g.minFilter===Ie||g.minFilter===oa||g.minFilter===Os||g.minFilter===ei)&&Rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(S,i.TEXTURE_WRAP_S,_t[g.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,_t[g.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,_t[g.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,Ct[g.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,Ct[g.minFilter]),g.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,kt[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===De||g.minFilter!==Os&&g.minFilter!==ei||g.type===pn&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(S,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function W(S,g){let z=!1;S.__webglInit===void 0&&(S.__webglInit=!0,g.addEventListener("dispose",I));let X=g.source,Q=m.get(X);Q===void 0&&(Q={},m.set(X,Q));let ot=k(g);if(ot!==S.__cacheKey){Q[ot]===void 0&&(Q[ot]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Q[ot].usedTimes++;let lt=Q[S.__cacheKey];lt!==void 0&&(Q[S.__cacheKey].usedTimes--,lt.usedTimes===0&&L(g)),S.__cacheKey=ot,S.__webglTexture=Q[ot].texture}return z}function O(S,g,z){return Math.floor(Math.floor(S/z)/g)}function J(S,g,z,X){let ot=S.updateRanges;if(ot.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,z,X,g.data);else{ot.sort((bt,ft)=>bt.start-ft.start);let lt=0;for(let bt=1;bt<ot.length;bt++){let ft=ot[lt],ht=ot[bt],It=ft.start+ft.count,Lt=O(ht.start,g.width,4),zt=O(ft.start,g.width,4);ht.start<=It+1&&Lt===zt&&O(ht.start+ht.count-1,g.width,4)===Lt?ft.count=Math.max(ft.count,ht.start+ht.count-ft.start):(++lt,ot[lt]=ht)}ot.length=lt+1;let $=e.getParameter(i.UNPACK_ROW_LENGTH),nt=e.getParameter(i.UNPACK_SKIP_PIXELS),ct=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let bt=0,ft=ot.length;bt<ft;bt++){let ht=ot[bt],It=Math.floor(ht.start/4),Lt=Math.ceil(ht.count/4),zt=It%g.width,G=Math.floor(It/g.width),ut=Lt,j=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,zt),e.pixelStorei(i.UNPACK_SKIP_ROWS,G),e.texSubImage2D(i.TEXTURE_2D,0,zt,G,ut,j,z,X,g.data)}S.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,$),e.pixelStorei(i.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(i.UNPACK_SKIP_ROWS,ct)}}function it(S,g,z){let X=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(X=i.TEXTURE_3D);let Q=W(S,g),ot=g.source;e.bindTexture(X,S.__webglTexture,i.TEXTURE0+z);let lt=n.get(ot);if(ot.version!==lt.__version||Q===!0){if(e.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap!="undefined"&&g.image instanceof ImageBitmap)===!1){let j=qt.getPrimaries(qt.workingColorSpace),dt=g.colorSpace===wn?null:qt.getPrimaries(g.colorSpace),Et=g.colorSpace===wn||j===dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et)}e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let nt=p(g.image,!1,s.maxTextureSize);nt=ne(g,nt);let ct=r.convert(g.format,g.colorSpace),bt=r.convert(g.type),ft=A(g.internalFormat,ct,bt,g.normalized,g.colorSpace,g.isVideoTexture);wt(X,g);let ht,It=g.mipmaps,Lt=g.isVideoTexture!==!0,zt=lt.__version===void 0||Q===!0,G=ot.dataReady,ut=M(g,nt);if(g.isDepthTexture)ft=C(g.format===ni,g.type),zt&&(Lt?e.texStorage2D(i.TEXTURE_2D,1,ft,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,ft,nt.width,nt.height,0,ct,bt,null));else if(g.isDataTexture)if(It.length>0){Lt&&zt&&e.texStorage2D(i.TEXTURE_2D,ut,ft,It[0].width,It[0].height);for(let j=0,dt=It.length;j<dt;j++)ht=It[j],Lt?G&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,ht.width,ht.height,ct,bt,ht.data):e.texImage2D(i.TEXTURE_2D,j,ft,ht.width,ht.height,0,ct,bt,ht.data);g.generateMipmaps=!1}else Lt?(zt&&e.texStorage2D(i.TEXTURE_2D,ut,ft,nt.width,nt.height),G&&J(g,nt,ct,bt)):e.texImage2D(i.TEXTURE_2D,0,ft,nt.width,nt.height,0,ct,bt,nt.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Lt&&zt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ut,ft,It[0].width,It[0].height,nt.depth);for(let j=0,dt=It.length;j<dt;j++)if(ht=It[j],g.format!==en)if(ct!==null)if(Lt){if(G)if(g.layerUpdates.size>0){let Et=gl(ht.width,ht.height,g.format,g.type);for(let st of g.layerUpdates){let Ft=ht.data.subarray(st*Et/ht.data.BYTES_PER_ELEMENT,(st+1)*Et/ht.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,st,ht.width,ht.height,1,ct,Ft)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,ht.width,ht.height,nt.depth,ct,ht.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,j,ft,ht.width,ht.height,nt.depth,0,ht.data,0,0);else Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Lt?G&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,ht.width,ht.height,nt.depth,ct,bt,ht.data):e.texImage3D(i.TEXTURE_2D_ARRAY,j,ft,ht.width,ht.height,nt.depth,0,ct,bt,ht.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{Lt&&zt&&e.texStorage2D(i.TEXTURE_2D,ut,ft,It[0].width,It[0].height);for(let j=0,dt=It.length;j<dt;j++)ht=It[j],g.format!==en?ct!==null?Lt?G&&e.compressedTexSubImage2D(i.TEXTURE_2D,j,0,0,ht.width,ht.height,ct,ht.data):e.compressedTexImage2D(i.TEXTURE_2D,j,ft,ht.width,ht.height,0,ht.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Lt?G&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,ht.width,ht.height,ct,bt,ht.data):e.texImage2D(i.TEXTURE_2D,j,ft,ht.width,ht.height,0,ct,bt,ht.data)}else if(g.isDataArrayTexture)if(Lt){if(zt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ut,ft,nt.width,nt.height,nt.depth),G)if(g.layerUpdates.size>0){let j=gl(nt.width,nt.height,g.format,g.type);for(let dt of g.layerUpdates){let Et=nt.data.subarray(dt*j/nt.data.BYTES_PER_ELEMENT,(dt+1)*j/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,dt,nt.width,nt.height,1,ct,bt,Et)}g.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,ct,bt,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,ft,nt.width,nt.height,nt.depth,0,ct,bt,nt.data);else if(g.isData3DTexture)Lt?(zt&&e.texStorage3D(i.TEXTURE_3D,ut,ft,nt.width,nt.height,nt.depth),G&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,ct,bt,nt.data)):e.texImage3D(i.TEXTURE_3D,0,ft,nt.width,nt.height,nt.depth,0,ct,bt,nt.data);else if(g.isFramebufferTexture){if(zt)if(Lt)e.texStorage2D(i.TEXTURE_2D,ut,ft,nt.width,nt.height);else{let j=nt.width,dt=nt.height;for(let Et=0;Et<ut;Et++)e.texImage2D(i.TEXTURE_2D,Et,ft,j,dt,0,ct,bt,null),j>>=1,dt>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){let j=i.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),nt.parentNode!==j){j.appendChild(nt),f.add(g),j.onpaint=dt=>{let Et=dt.changedElements;for(let st of f)Et.includes(st.image)&&(st.needsUpdate=!0)},j.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,nt);else{let Et=i.RGBA,st=i.RGBA,Ft=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Et,st,Ft,nt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(It.length>0){if(Lt&&zt){let j=Zt(It[0]);e.texStorage2D(i.TEXTURE_2D,ut,ft,j.width,j.height)}for(let j=0,dt=It.length;j<dt;j++)ht=It[j],Lt?G&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,ct,bt,ht):e.texImage2D(i.TEXTURE_2D,j,ft,ct,bt,ht);g.generateMipmaps=!1}else if(Lt){if(zt){let j=Zt(nt);e.texStorage2D(i.TEXTURE_2D,ut,ft,j.width,j.height)}G&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ct,bt,nt)}else e.texImage2D(i.TEXTURE_2D,0,ft,ct,bt,nt);u(g)&&x(X),lt.__version=ot.version,g.onUpdate&&g.onUpdate(g)}S.__version=g.version}function at(S,g,z){if(g.image.length!==6)return;let X=W(S,g),Q=g.source;e.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+z);let ot=n.get(Q);if(Q.version!==ot.__version||X===!0){e.activeTexture(i.TEXTURE0+z);let lt=qt.getPrimaries(qt.workingColorSpace),$=g.colorSpace===wn?null:qt.getPrimaries(g.colorSpace),nt=g.colorSpace===wn||lt===$?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let ct=g.isCompressedTexture||g.image[0].isCompressedTexture,bt=g.image[0]&&g.image[0].isDataTexture,ft=[];for(let st=0;st<6;st++)!ct&&!bt?ft[st]=p(g.image[st],!0,s.maxCubemapSize):ft[st]=bt?g.image[st].image:g.image[st],ft[st]=ne(g,ft[st]);let ht=ft[0],It=r.convert(g.format,g.colorSpace),Lt=r.convert(g.type),zt=A(g.internalFormat,It,Lt,g.normalized,g.colorSpace),G=g.isVideoTexture!==!0,ut=ot.__version===void 0||X===!0,j=Q.dataReady,dt=M(g,ht);wt(i.TEXTURE_CUBE_MAP,g);let Et;if(ct){G&&ut&&e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,zt,ht.width,ht.height);for(let st=0;st<6;st++){Et=ft[st].mipmaps;for(let Ft=0;Ft<Et.length;Ft++){let Mt=Et[Ft];g.format!==en?It!==null?G?j&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ft,0,0,Mt.width,Mt.height,It,Mt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ft,zt,Mt.width,Mt.height,0,Mt.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ft,0,0,Mt.width,Mt.height,It,Lt,Mt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ft,zt,Mt.width,Mt.height,0,It,Lt,Mt.data)}}}else{if(Et=g.mipmaps,G&&ut){Et.length>0&&dt++;let st=Zt(ft[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,zt,st.width,st.height)}for(let st=0;st<6;st++)if(bt){G?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,ft[st].width,ft[st].height,It,Lt,ft[st].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,zt,ft[st].width,ft[st].height,0,It,Lt,ft[st].data);for(let Ft=0;Ft<Et.length;Ft++){let ue=Et[Ft].image[st].image;G?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ft+1,0,0,ue.width,ue.height,It,Lt,ue.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ft+1,zt,ue.width,ue.height,0,It,Lt,ue.data)}}else{G?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,It,Lt,ft[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,zt,It,Lt,ft[st]);for(let Ft=0;Ft<Et.length;Ft++){let Mt=Et[Ft];G?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ft+1,0,0,It,Lt,Mt.image[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ft+1,zt,It,Lt,Mt.image[st])}}}u(g)&&x(i.TEXTURE_CUBE_MAP),ot.__version=Q.version,g.onUpdate&&g.onUpdate(g)}S.__version=g.version}function rt(S,g,z,X,Q,ot){let lt=r.convert(z.format,z.colorSpace),$=r.convert(z.type),nt=A(z.internalFormat,lt,$,z.normalized,z.colorSpace),ct=n.get(g),bt=n.get(z);if(bt.__renderTarget=g,!ct.__hasExternalTextures){let ft=Math.max(1,g.width>>ot),ht=Math.max(1,g.height>>ot);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,ot,nt,ft,ht,g.depth,0,lt,$,null):e.texImage2D(Q,ot,nt,ft,ht,0,lt,$,null)}e.bindFramebuffer(i.FRAMEBUFFER,S),ce(g)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,Q,bt.__webglTexture,0,ee(g)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,Q,bt.__webglTexture,ot),e.bindFramebuffer(i.FRAMEBUFFER,null)}function vt(S,g,z){if(i.bindRenderbuffer(i.RENDERBUFFER,S),g.depthBuffer){let X=g.depthTexture,Q=X&&X.isDepthTexture?X.type:null,ot=C(g.stencilBuffer,Q),lt=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ce(g)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee(g),ot,g.width,g.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,ee(g),ot,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,ot,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,S)}else{let X=g.textures;for(let Q=0;Q<X.length;Q++){let ot=X[Q],lt=r.convert(ot.format,ot.colorSpace),$=r.convert(ot.type),nt=A(ot.internalFormat,lt,$,ot.normalized,ot.colorSpace);ce(g)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee(g),nt,g.width,g.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,ee(g),nt,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,nt,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Gt(S,g,z){let X=g.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,S),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Q=n.get(g.depthTexture);if(Q.__renderTarget=g,(!Q.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),X){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,g.depthTexture.addEventListener("dispose",I)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),wt(i.TEXTURE_CUBE_MAP,g.depthTexture);let ct=r.convert(g.depthTexture.format),bt=r.convert(g.depthTexture.type),ft;g.depthTexture.format===Bn?ft=i.DEPTH_COMPONENT24:g.depthTexture.format===ni&&(ft=i.DEPTH24_STENCIL8);for(let ht=0;ht<6;ht++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,ft,g.width,g.height,0,ct,bt,null)}}else tt(g.depthTexture,0);let ot=Q.__webglTexture,lt=ee(g),$=X?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,nt=g.depthTexture.format===ni?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===Bn)ce(g)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,$,ot,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,nt,$,ot,0);else if(g.depthTexture.format===ni)ce(g)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,$,ot,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,nt,$,ot,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Tt(S){let g=n.get(S),z=S.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==S.depthTexture){let X=S.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),X){let Q=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,X.removeEventListener("dispose",Q)};X.addEventListener("dispose",Q),g.__depthDisposeCallback=Q}g.__boundDepthTexture=X}if(S.depthTexture&&!g.__autoAllocateDepthBuffer)if(z)for(let X=0;X<6;X++)Gt(g.__webglFramebuffer[X],S,X);else{let X=S.texture.mipmaps;X&&X.length>0?Gt(g.__webglFramebuffer[0],S,0):Gt(g.__webglFramebuffer,S,0)}else if(z){g.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[X]),g.__webglDepthbuffer[X]===void 0)g.__webglDepthbuffer[X]=i.createRenderbuffer(),vt(g.__webglDepthbuffer[X],S,!1);else{let Q=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=g.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ot)}}else{let X=S.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),vt(g.__webglDepthbuffer,S,!1);else{let Q=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ot)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Nt(S,g,z){let X=n.get(S);g!==void 0&&rt(X.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Tt(S)}function Qt(S){let g=S.texture,z=n.get(S),X=n.get(g);S.addEventListener("dispose",E);let Q=S.textures,ot=S.isWebGLCubeRenderTarget===!0,lt=Q.length>1;if(lt||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=g.version,a.memory.textures++),ot){z.__webglFramebuffer=[];for(let $=0;$<6;$++)if(g.mipmaps&&g.mipmaps.length>0){z.__webglFramebuffer[$]=[];for(let nt=0;nt<g.mipmaps.length;nt++)z.__webglFramebuffer[$][nt]=i.createFramebuffer()}else z.__webglFramebuffer[$]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){z.__webglFramebuffer=[];for(let $=0;$<g.mipmaps.length;$++)z.__webglFramebuffer[$]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(lt)for(let $=0,nt=Q.length;$<nt;$++){let ct=n.get(Q[$]);ct.__webglTexture===void 0&&(ct.__webglTexture=i.createTexture(),a.memory.textures++)}if(S.samples>0&&ce(S)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let $=0;$<Q.length;$++){let nt=Q[$];z.__webglColorRenderbuffer[$]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[$]);let ct=r.convert(nt.format,nt.colorSpace),bt=r.convert(nt.type),ft=A(nt.internalFormat,ct,bt,nt.normalized,nt.colorSpace,S.isXRRenderTarget===!0),ht=ee(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,ft,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.RENDERBUFFER,z.__webglColorRenderbuffer[$])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),vt(z.__webglDepthRenderbuffer,S,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ot){e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),wt(i.TEXTURE_CUBE_MAP,g);for(let $=0;$<6;$++)if(g.mipmaps&&g.mipmaps.length>0)for(let nt=0;nt<g.mipmaps.length;nt++)rt(z.__webglFramebuffer[$][nt],S,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,nt);else rt(z.__webglFramebuffer[$],S,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);u(g)&&x(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(lt){for(let $=0,nt=Q.length;$<nt;$++){let ct=Q[$],bt=n.get(ct),ft=i.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(ft=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ft,bt.__webglTexture),wt(ft,ct),rt(z.__webglFramebuffer,S,ct,i.COLOR_ATTACHMENT0+$,ft,0),u(ct)&&x(ft)}e.unbindTexture()}else{let $=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&($=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture($,X.__webglTexture),wt($,g),g.mipmaps&&g.mipmaps.length>0)for(let nt=0;nt<g.mipmaps.length;nt++)rt(z.__webglFramebuffer[nt],S,g,i.COLOR_ATTACHMENT0,$,nt);else rt(z.__webglFramebuffer,S,g,i.COLOR_ATTACHMENT0,$,0);u(g)&&x($),e.unbindTexture()}S.depthBuffer&&Tt(S)}function Ut(S){let g=S.textures;for(let z=0,X=g.length;z<X;z++){let Q=g[z];if(u(Q)){let ot=v(S),lt=n.get(Q).__webglTexture;e.bindTexture(ot,lt),x(ot),e.unbindTexture()}}}let jt=[],Vt=[];function te(S){if(S.samples>0){if(ce(S)===!1){let g=S.textures,z=S.width,X=S.height,Q=i.COLOR_BUFFER_BIT,ot=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=n.get(S),$=g.length>1;if($)for(let ct=0;ct<g.length;ct++)e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer);let nt=S.texture.mipmaps;nt&&nt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let ct=0;ct<g.length;ct++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),$){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ct]);let bt=n.get(g[ct]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,bt,0)}i.blitFramebuffer(0,0,z,X,0,0,z,X,Q,i.NEAREST),o===!0&&(jt.length=0,Vt.length=0,jt.push(i.COLOR_ATTACHMENT0+ct),S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&(jt.push(ot),Vt.push(ot),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Vt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,jt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),$)for(let ct=0;ct<g.length;ct++){e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ct]);let bt=n.get(g[ct]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,bt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&o){let g=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function ee(S){return Math.min(s.maxSamples,S.samples)}function ce(S){let g=n.get(S);return S.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function b(S){let g=a.render.frame;d.get(S)!==g&&(d.set(S,g),S.update())}function ne(S,g){let z=S.colorSpace,X=S.format,Q=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||z!==ps&&z!==wn&&(qt.getTransfer(z)===re?(X!==en||Q!==Ze)&&Rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Pt("WebGLTextures: Unsupported texture color space:",z)),g}function Zt(S){return typeof HTMLImageElement!="undefined"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame!="undefined"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=P,this.resetTextureUnits=U,this.getTextureUnits=F,this.setTextureUnits=N,this.setTexture2D=tt,this.setTexture2DArray=Y,this.setTexture3D=Z,this.setTextureCube=et,this.rebindTextures=Nt,this.setupRenderTarget=Qt,this.updateRenderTargetMipmap=Ut,this.updateMultisampleRenderTarget=te,this.setupDepthRenderbuffer=Tt,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=ce,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function m0(i,t){function e(n,s=wn){let r,a=qt.getTransfer(s);if(n===Ze)return i.UNSIGNED_BYTE;if(n===ca)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ha)return i.UNSIGNED_SHORT_5_5_5_1;if(n===il)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===sl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===el)return i.BYTE;if(n===nl)return i.SHORT;if(n===qi)return i.UNSIGNED_SHORT;if(n===la)return i.INT;if(n===fn)return i.UNSIGNED_INT;if(n===pn)return i.FLOAT;if(n===mn)return i.HALF_FLOAT;if(n===rl)return i.ALPHA;if(n===al)return i.RGB;if(n===en)return i.RGBA;if(n===Bn)return i.DEPTH_COMPONENT;if(n===ni)return i.DEPTH_STENCIL;if(n===ol)return i.RED;if(n===ua)return i.RED_INTEGER;if(n===ii)return i.RG;if(n===da)return i.RG_INTEGER;if(n===fa)return i.RGBA_INTEGER;if(n===Hs||n===Us||n===ks||n===zs)if(a===re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Hs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Us)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Hs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Us)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ks)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===zs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===pa||n===ma||n===ga||n===_a)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===pa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ma)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ga)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_a)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ea||n===Ca||n===xa||n===Ba||n===Aa||n===Vs||n===ya)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ea||n===Ca)return a===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===xa)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ba)return r.COMPRESSED_R11_EAC;if(n===Aa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Vs)return r.COMPRESSED_RG11_EAC;if(n===ya)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ma||n===va||n===Sa||n===Da||n===ba||n===Ia||n===Ta||n===Fa||n===wa||n===Ra||n===La||n===Ga||n===Pa||n===Na)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ma)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===va)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Sa)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Da)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ba)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ia)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ta)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Fa)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===wa)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ra)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===La)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ga)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Pa)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Na)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Oa||n===Ha||n===Ua)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Oa)return a===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ha)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ua)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ka||n===za||n===Ks||n===Va)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ka)return r.COMPRESSED_RED_RGTC1_EXT;if(n===za)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ks)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Va)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Qi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var g0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_0=`
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

}`,Gl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Ss(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Ge({vertexShader:g0,fragmentShader:_0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new xe(new Ds(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Pl=class extends un{constructor(t,e){super();let n=this,s=null,r=1,a=null,l="local-floor",o=1,c=null,d=null,f=null,h=null,m=null,_=null,y=typeof XRWebGLBinding!="undefined",p=new Gl,u={},x=e.getContextAttributes(),v=null,A=null,C=[],M=[],I=new Ot,E=null,D=null,L=new Le;L.viewport=new _e;let T=new Le;T.viewport=new _e;let w=[L,T],U=new ia,F=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let J=C[O];return J===void 0&&(J=new Vi,C[O]=J),J.getTargetRaySpace()},this.getControllerGrip=function(O){let J=C[O];return J===void 0&&(J=new Vi,C[O]=J),J.getGripSpace()},this.getHand=function(O){let J=C[O];return J===void 0&&(J=new Vi,C[O]=J),J.getHandSpace()};function P(O){let J=M.indexOf(O.inputSource);if(J===-1)return;let it=C[J];it!==void 0&&(it.update(O.inputSource,O.frame,c||a),it.dispatchEvent({type:O.type,data:O.inputSource}))}function k(){s.removeEventListener("select",P),s.removeEventListener("selectstart",P),s.removeEventListener("selectend",P),s.removeEventListener("squeeze",P),s.removeEventListener("squeezestart",P),s.removeEventListener("squeezeend",P),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",tt);for(let O=0;O<C.length;O++){let J=M[O];J!==null&&(M[O]=null,C[O].disconnect(J))}F=null,N=null,p.reset();for(let O in u)delete u[O];if(t.setRenderTarget(v),m=null,h=null,f=null,s=null,A=null,W.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(I.width,I.height,!1),D!==null){let O=D.camera;O.fov=D.fov,O.zoom=D.zoom,O.updateProjectionMatrix(),D=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){r=O,n.isPresenting===!0&&Rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){l=O,n.isPresenting===!0&&Rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(O){c=O},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return f===null&&y&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(O){if(s=O,s!==null){if(v=t.getRenderTarget(),s.addEventListener("select",P),s.addEventListener("selectstart",P),s.addEventListener("selectend",P),s.addEventListener("squeeze",P),s.addEventListener("squeezestart",P),s.addEventListener("squeezeend",P),s.addEventListener("end",k),s.addEventListener("inputsourceschange",tt),x.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(I),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let it=null,at=null,rt=null;x.depth&&(rt=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=x.stencil?ni:Bn,at=x.stencil?Qi:fn);let vt={colorFormat:e.RGBA8,depthFormat:rt,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(vt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),A=new ze(h.textureWidth,h.textureHeight,{format:en,type:Ze,depthTexture:new Xn(h.textureWidth,h.textureHeight,at,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let it={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,it),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),A=new ze(m.framebufferWidth,m.framebufferHeight,{format:en,type:Ze,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(o),c=null,a=await s.requestReferenceSpace(l),W.setContext(s),W.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function tt(O){for(let J=0;J<O.removed.length;J++){let it=O.removed[J],at=M.indexOf(it);at>=0&&(M[at]=null,C[at].disconnect(it))}for(let J=0;J<O.added.length;J++){let it=O.added[J],at=M.indexOf(it);if(at===-1){for(let vt=0;vt<C.length;vt++)if(vt>=M.length){M.push(it),at=vt;break}else if(M[vt]===null){M[vt]=it,at=vt;break}if(at===-1)break}let rt=C[at];rt&&rt.connect(it)}}let Y=new H,Z=new H;function et(O,J,it){Y.setFromMatrixPosition(J.matrixWorld),Z.setFromMatrixPosition(it.matrixWorld);let at=Y.distanceTo(Z),rt=J.projectionMatrix.elements,vt=it.projectionMatrix.elements,Gt=rt[14]/(rt[10]-1),Tt=rt[14]/(rt[10]+1),Nt=(rt[9]+1)/rt[5],Qt=(rt[9]-1)/rt[5],Ut=(rt[8]-1)/rt[0],jt=(vt[8]+1)/vt[0],Vt=Gt*Ut,te=Gt*jt,ee=at/(-Ut+jt),ce=ee*-Ut;if(J.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(ce),O.translateZ(ee),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert(),rt[10]===-1)O.projectionMatrix.copy(J.projectionMatrix),O.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let b=Gt+ee,ne=Tt+ee,Zt=Vt-ce,S=te+(at-ce),g=Nt*Tt/ne*b,z=Qt*Tt/ne*b;O.projectionMatrix.makePerspective(Zt,S,g,z,b,ne),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}}function _t(O,J){J===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(J.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(s===null)return;let J=O.near,it=O.far;p.texture!==null&&(p.depthNear>0&&(J=p.depthNear),p.depthFar>0&&(it=p.depthFar)),U.near=T.near=L.near=J,U.far=T.far=L.far=it,(F!==U.near||N!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),F=U.near,N=U.far),U.layers.mask=O.layers.mask|6,L.layers.mask=U.layers.mask&-5,T.layers.mask=U.layers.mask&-3;let at=O.parent,rt=U.cameras;_t(U,at);for(let vt=0;vt<rt.length;vt++)_t(rt[vt],at);rt.length===2?et(U,L,T):U.projectionMatrix.copy(L.projectionMatrix),D===null&&O.isPerspectiveCamera&&(D={camera:O,fov:O.fov,zoom:O.zoom}),Ct(O,U,at)};function Ct(O,J,it){it===null?O.matrix.copy(J.matrixWorld):(O.matrix.copy(it.matrixWorld),O.matrix.invert(),O.matrix.multiply(J.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(J.projectionMatrix),O.projectionMatrixInverse.copy(J.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=Ui*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(h===null&&m===null))return o},this.setFoveation=function(O){o=O,h!==null&&(h.fixedFoveation=O),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=O)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(U)},this.getCameraTexture=function(O){return u[O]};let kt=null;function wt(O,J){if(d=J.getViewerPose(c||a),_=J,d!==null){let it=d.views;m!==null&&(t.setRenderTargetFramebuffer(A,m.framebuffer),t.setRenderTarget(A));let at=!1;it.length!==U.cameras.length&&(U.cameras.length=0,at=!0);for(let Tt=0;Tt<it.length;Tt++){let Nt=it[Tt],Qt=null;if(m!==null)Qt=m.getViewport(Nt);else{let jt=f.getViewSubImage(h,Nt);Qt=jt.viewport,Tt===0&&(t.setRenderTargetTextures(A,jt.colorTexture,jt.depthStencilTexture),t.setRenderTarget(A))}let Ut=w[Tt];Ut===void 0&&(Ut=new Le,Ut.layers.enable(Tt),Ut.viewport=new _e,w[Tt]=Ut),Ut.matrix.fromArray(Nt.transform.matrix),Ut.matrix.decompose(Ut.position,Ut.quaternion,Ut.scale),Ut.projectionMatrix.fromArray(Nt.projectionMatrix),Ut.projectionMatrixInverse.copy(Ut.projectionMatrix).invert(),Ut.viewport.set(Qt.x,Qt.y,Qt.width,Qt.height),Tt===0&&(U.matrix.copy(Ut.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),at===!0&&U.cameras.push(Ut)}let rt=s.enabledFeatures;if(rt&&rt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){f=n.getBinding();let Tt=f.getDepthInformation(it[0]);Tt&&Tt.isValid&&Tt.texture&&p.init(Tt,s.renderState)}if(rt&&rt.includes("camera-access")&&y){t.state.unbindTexture(),f=n.getBinding();for(let Tt=0;Tt<it.length;Tt++){let Nt=it[Tt].camera;if(Nt){let Qt=u[Nt];Qt||(Qt=new Ss,u[Nt]=Qt);let Ut=f.getCameraImage(Nt);Qt.sourceTexture=Ut}}}}for(let it=0;it<C.length;it++){let at=M[it],rt=C[it];at!==null&&rt!==void 0&&rt.update(at,J,c||a)}kt&&kt(O,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),_=null}let W=new zh;W.setAnimationLoop(wt),this.setAnimationLoop=function(O){kt=O},this.dispose=function(){}}},E0=new me,Yh=new Ht;Yh.set(-1,0,0,0,1,0,0,0,1);function C0(i,t){function e(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function n(p,u){u.color.getRGB(p.fogColor.value,fl(i)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function s(p,u,x,v,A){u.isNodeMaterial?u.uniformsNeedUpdate=!1:u.isMeshBasicMaterial?r(p,u):u.isMeshLambertMaterial?(r(p,u),u.envMap&&(p.envMapIntensity.value=u.envMapIntensity)):u.isMeshToonMaterial?(r(p,u),f(p,u)):u.isMeshPhongMaterial?(r(p,u),d(p,u),u.envMap&&(p.envMapIntensity.value=u.envMapIntensity)):u.isMeshStandardMaterial?(r(p,u),h(p,u),u.isMeshPhysicalMaterial&&m(p,u,A)):u.isMeshMatcapMaterial?(r(p,u),_(p,u)):u.isMeshDepthMaterial?r(p,u):u.isMeshDistanceMaterial?(r(p,u),y(p,u)):u.isMeshNormalMaterial?r(p,u):u.isLineBasicMaterial?(a(p,u),u.isLineDashedMaterial&&l(p,u)):u.isPointsMaterial?o(p,u,x,v):u.isSpriteMaterial?c(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,e(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,e(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===Te&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,e(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===Te&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,e(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,e(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,e(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);let x=t.get(u),v=x.envMap,A=x.envMapRotation;v&&(p.envMap.value=v,p.envMapRotation.value.setFromMatrix4(E0.makeRotationFromEuler(A)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Yh),p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap&&(p.lightMap.value=u.lightMap,p.lightMapIntensity.value=u.lightMapIntensity,e(u.lightMap,p.lightMapTransform)),u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,e(u.aoMap,p.aoMapTransform))}function a(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,e(u.map,p.mapTransform))}function l(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function o(p,u,x,v){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*x,p.scale.value=v*.5,u.map&&(p.map.value=u.map,e(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function c(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,e(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function d(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function f(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function h(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,e(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,e(u.roughnessMap,p.roughnessMapTransform)),u.envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function m(p,u,x){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,e(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,e(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,e(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,e(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,e(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Te&&p.clearcoatNormalScale.value.negate())),u.dispersion>0&&(p.dispersion.value=u.dispersion),u.retroreflectivity>0&&(p.retroreflectivity.value=u.retroreflectivity),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,e(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,e(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,e(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,e(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,e(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,e(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,e(u.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,u){u.matcap&&(p.matcap.value=u.matcap)}function y(p,u){let x=t.get(u).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function x0(i,t,e,n){let s={},r={},a=[],l=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function o(A,C){let M=C.program;n.uniformBlockBinding(A,M)}function c(A,C){let M=s[A.id];M===void 0&&(p(A),M=d(A),s[A.id]=M,A.addEventListener("dispose",x));let I=C.program;n.updateUBOMapping(A,I);let E=t.render.frame;r[A.id]!==E&&(h(A),r[A.id]=E)}function d(A){let C=f();A.__bindingPointIndex=C;let M=i.createBuffer(),I=A.__size,E=A.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,I,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,C,M),M}function f(){for(let A=0;A<l;A++)if(a.indexOf(A)===-1)return a.push(A),A;return Pt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(A){let C=s[A.id],M=A.uniforms,I=A.__cache;i.bindBuffer(i.UNIFORM_BUFFER,C);for(let E=0,D=M.length;E<D;E++){let L=M[E];if(Array.isArray(L))for(let T=0,w=L.length;T<w;T++)m(L[T],E,T,I);else m(L,E,0,I)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(A,C,M,I){if(y(A,C,M,I)===!0){let E=A.__offset,D=A.value;if(Array.isArray(D)){let L=0;for(let T=0;T<D.length;T++){let w=D[T],U=u(w);_(w,A.__data,L),typeof w!="number"&&typeof w!="boolean"&&!w.isMatrix3&&!ArrayBuffer.isView(w)&&(L+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(D,A.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,E,A.__data)}}function _(A,C,M){typeof A=="number"||typeof A=="boolean"?C[0]=A:A.isMatrix3?(C[0]=A.elements[0],C[1]=A.elements[1],C[2]=A.elements[2],C[3]=0,C[4]=A.elements[3],C[5]=A.elements[4],C[6]=A.elements[5],C[7]=0,C[8]=A.elements[6],C[9]=A.elements[7],C[10]=A.elements[8],C[11]=0):ArrayBuffer.isView(A)?C.set(new A.constructor(A.buffer,A.byteOffset,C.length)):A.toArray(C,M)}function y(A,C,M,I){let E=A.value,D=C+"_"+M;if(I[D]===void 0)return typeof E=="number"||typeof E=="boolean"?I[D]=E:ArrayBuffer.isView(E)?I[D]=E.slice():I[D]=E.clone(),!0;{let L=I[D];if(typeof E=="number"||typeof E=="boolean"){if(L!==E)return I[D]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(L.equals(E)===!1)return L.copy(E),!0}}return!1}function p(A){let C=A.uniforms,M=0,I=16;for(let D=0,L=C.length;D<L;D++){let T=Array.isArray(C[D])?C[D]:[C[D]];for(let w=0,U=T.length;w<U;w++){let F=T[w],N=Array.isArray(F.value)?F.value:[F.value];for(let P=0,k=N.length;P<k;P++){let tt=N[P],Y=u(tt),Z=M%I,et=Z%Y.boundary,_t=Z+et;M+=et,_t!==0&&I-_t<Y.storage&&(M+=I-_t),F.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=M,M+=Y.storage}}}let E=M%I;return E>0&&(M+=I-E),A.__size=M,A.__cache={},this}function u(A){let C={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(C.boundary=4,C.storage=4):A.isVector2?(C.boundary=8,C.storage=8):A.isVector3||A.isColor?(C.boundary=16,C.storage=12):A.isVector4?(C.boundary=16,C.storage=16):A.isMatrix3?(C.boundary=48,C.storage=48):A.isMatrix4?(C.boundary=64,C.storage=64):A.isTexture?Rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(A)?(C.boundary=16,C.storage=A.byteLength):Rt("WebGLRenderer: Unsupported uniform value type.",A),C}function x(A){let C=A.target;C.removeEventListener("dispose",x);let M=a.indexOf(C.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[C.id]),delete s[C.id],delete r[C.id]}function v(){for(let A in s)i.deleteBuffer(s[A]);a=[],s={},r={}}return{bind:o,update:c,dispose:v}}var B0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),yn=null;function A0(){return yn===null&&(yn=new Or(B0,16,16,ii,mn),yn.name="DFG_LUT",yn.minFilter=Ie,yn.magFilter=Ie,yn.wrapS=xn,yn.wrapT=xn,yn.generateMipmaps=!1,yn.needsUpdate=!0),yn}var Qa=class{constructor(t={}){let{canvas:e=fh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:l=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:m=Ze}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;let y=m,p=new Set([fa,da,ua]),u=new Set([Ze,fn,qi,Qi,ca,ha]),x=new Uint32Array(4),v=new Int32Array(4),A=new H,C=null,M=null,I=[],E=[],D=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=dn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let L=this,T=!1,w=null,U=null,F=null,N=null;this._outputColorSpace=Ue;let P=0,k=0,tt=null,Y=-1,Z=null,et=new _e,_t=new _e,Ct=null,kt=new Xt(0),wt=0,W=e.width,O=e.height,J=1,it=null,at=null,rt=new _e(0,0,W,O),vt=new _e(0,0,W,O),Gt=!1,Tt=new As,Nt=!1,Qt=!1,Ut=new me,jt=new H,Vt=new _e,te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ee=!1;function ce(){return tt===null?J:1}let b=n;function ne(B,R){return e.getContext(B,R)}let Zt,S,g,z,X,Q,ot,lt,$,nt,ct,bt,ft,ht,It,Lt,zt,G,ut,j,dt,Et,st;try{let B={alpha:!0,depth:s,stencil:r,antialias:l,premultipliedAlpha:o,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",ue,!1),e.addEventListener("webglcontextrestored",ie,!1),e.addEventListener("webglcontextcreationerror",rn,!1),b===null){let R="webgl2";if(b=ne(R,B),b===null)throw ne(R)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ft()}catch(B){throw e.removeEventListener("webglcontextlost",ue,!1),e.removeEventListener("webglcontextrestored",ie,!1),e.removeEventListener("webglcontextcreationerror",rn,!1),Pt("WebGLRenderer: "+B.message),B}function Ft(){Zt=new Im(b),Zt.init(),dt=new m0(b,Zt),S=new Cm(b,Zt,t,dt),g=new f0(b,Zt),S.reversedDepthBuffer&&h&&g.buffers.depth.setReversed(!0),U=b.createFramebuffer(),F=b.createFramebuffer(),N=b.createFramebuffer(),z=new wm(b),X=new jg,Q=new p0(b,Zt,g,X,S,dt,z),ot=new bm(L),lt=new Rd(b),Et=new _m(b,lt),$=new Tm(b,lt,z,Et),nt=new Lm(b,$,lt,Et,z),G=new Rm(b,S,Q),It=new xm(X),ct=new $g(L,ot,Zt,S,Et,It),bt=new C0(L,X),ft=new e0,ht=new o0(Zt),zt=new gm(L,ot,g,nt,_,o),Lt=new d0(L,nt,S),st=new x0(b,z,S,g),ut=new Em(b,Zt,z),j=new Fm(b,Zt,z),z.programs=ct.programs,L.capabilities=S,L.extensions=Zt,L.properties=X,L.renderLists=ft,L.shadowMap=Lt,L.state=g,L.info=z}y!==Ze&&(D=new Pm(y,e.width,e.height,l,s,r));let Mt=new Pl(L,b);this.xr=Mt,this.getContext=function(){return b},this.getContextAttributes=function(){return b.getContextAttributes()},this.forceContextLoss=function(){let B=Zt.get("WEBGL_lose_context");B&&B.loseContext()},this.forceContextRestore=function(){let B=Zt.get("WEBGL_lose_context");B&&B.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(B){B!==void 0&&(J=B,this.setSize(W,O,!1))},this.getSize=function(B){return B.set(W,O)},this.setSize=function(B,R,q=!0){if(Mt.isPresenting){Rt("WebGLRenderer: Can't change size while VR device is presenting.");return}W=B,O=R,e.width=Math.floor(B*J),e.height=Math.floor(R*J),q===!0&&(e.style.width=B+"px",e.style.height=R+"px"),D!==null&&D.setSize(e.width,e.height),this.setViewport(0,0,B,R)},this.getDrawingBufferSize=function(B){return B.set(W*J,O*J).floor()},this.setDrawingBufferSize=function(B,R,q){W=B,O=R,J=q,e.width=Math.floor(B*q),e.height=Math.floor(R*q),this.setViewport(0,0,B,R)},this.setEffects=function(B){if(y===Ze){Pt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(B){for(let R=0;R<B.length;R++)if(B[R].isOutputPass===!0){Rt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}D.setEffects(B||[])},this.getCurrentViewport=function(B){return B.copy(et)},this.getViewport=function(B){return B.copy(rt)},this.setViewport=function(B,R,q,V){B.isVector4?rt.set(B.x,B.y,B.z,B.w):rt.set(B,R,q,V),g.viewport(et.copy(rt).multiplyScalar(J).round())},this.getScissor=function(B){return B.copy(vt)},this.setScissor=function(B,R,q,V){B.isVector4?vt.set(B.x,B.y,B.z,B.w):vt.set(B,R,q,V),g.scissor(_t.copy(vt).multiplyScalar(J).round())},this.getScissorTest=function(){return Gt},this.setScissorTest=function(B){g.setScissorTest(Gt=B)},this.setOpaqueSort=function(B){it=B},this.setTransparentSort=function(B){at=B},this.getClearColor=function(B){return B.copy(zt.getClearColor())},this.setClearColor=function(){zt.setClearColor(...arguments)},this.getClearAlpha=function(){return zt.getClearAlpha()},this.setClearAlpha=function(){zt.setClearAlpha(...arguments)},this.clear=function(B=!0,R=!0,q=!0){let V=0;if(B){let K=!1;if(tt!==null){let gt=tt.texture.format;K=p.has(gt)}if(K){let gt=tt.texture.type,Bt=u.has(gt),mt=zt.getClearColor(),At=zt.getClearAlpha(),St=mt.r,Kt=mt.g,Yt=mt.b;Bt?(x[0]=St,x[1]=Kt,x[2]=Yt,x[3]=At,b.clearBufferuiv(b.COLOR,0,x)):(v[0]=St,v[1]=Kt,v[2]=Yt,v[3]=At,b.clearBufferiv(b.COLOR,0,v))}else V|=b.COLOR_BUFFER_BIT}R&&(V|=b.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(V|=b.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&b.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(B){B.setRenderer(this),w=B},this.dispose=function(){e.removeEventListener("webglcontextlost",ue,!1),e.removeEventListener("webglcontextrestored",ie,!1),e.removeEventListener("webglcontextcreationerror",rn,!1),zt.dispose(),ft.dispose(),ht.dispose(),X.dispose(),ot.dispose(),nt.dispose(),Et.dispose(),st.dispose(),ct.dispose(),Mt.dispose(),Mt.removeEventListener("sessionstart",$l),Mt.removeEventListener("sessionend",jl),ri.stop()};function ue(B){B.preventDefault(),hl("WebGLRenderer: Context Lost."),T=!0}function ie(){hl("WebGLRenderer: Context Restored."),T=!1;let B=z.autoReset,R=Lt.enabled,q=Lt.autoUpdate,V=Lt.needsUpdate,K=Lt.type;Ft(),z.autoReset=B,Lt.enabled=R,Lt.autoUpdate=q,Lt.needsUpdate=V,Lt.type=K}function rn(B){Pt("WebGLRenderer: A WebGL context could not be created. Reason: ",B.statusMessage)}function _n(B){let R=B.target;R.removeEventListener("dispose",_n),Iu(R)}function Iu(B){Tu(B),X.remove(B)}function Tu(B){let R=X.get(B).programs;R!==void 0&&(R.forEach(function(q){ct.releaseProgram(q)}),B.isShaderMaterial&&ct.releaseShaderCache(B))}this.renderBufferDirect=function(B,R,q,V,K,gt){R===null&&(R=te);let Bt=K.isMesh&&K.matrixWorld.determinantAffine()<0,mt=Ru(B,R,q,V,K);g.setMaterial(V,Bt);let At=q.index,St=1;if(V.wireframe===!0){if(At=$.getWireframeAttribute(q),At===void 0)return;St=2}let Kt=q.drawRange,Yt=q.attributes.position,yt=Kt.start*St,se=(Kt.start+Kt.count)*St;gt!==null&&(yt=Math.max(yt,gt.start*St),se=Math.min(se,(gt.start+gt.count)*St)),At!==null?(yt=Math.max(yt,0),se=Math.min(se,At.count)):Yt!=null&&(yt=Math.max(yt,0),se=Math.min(se,Yt.count));let Be=se-yt;if(Be<0||Be===1/0)return;Et.setup(K,V,mt,q,At);let fe,he=ut;if(At!==null&&(fe=lt.get(At),he=j,he.setIndex(fe)),K.isMesh)V.wireframe===!0?(g.setLineWidth(V.wireframeLinewidth*ce()),he.setMode(b.LINES)):he.setMode(b.TRIANGLES);else if(K.isLine){let Fe=V.linewidth;Fe===void 0&&(Fe=1),g.setLineWidth(Fe*ce()),K.isLineSegments?he.setMode(b.LINES):K.isLineLoop?he.setMode(b.LINE_LOOP):he.setMode(b.LINE_STRIP)}else K.isPoints?he.setMode(b.POINTS):K.isSprite&&he.setMode(b.TRIANGLES);if(K.isBatchedMesh)if(Zt.get("WEBGL_multi_draw"))he.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{let Fe=K._multiDrawStarts,xt=K._multiDrawCounts,Oe=K._multiDrawCount,$t=At?lt.get(At).bytesPerElement:1,$e=X.get(V).currentProgram.getUniforms();for(let En=0;En<Oe;En++)$e.setValue(b,"_gl_DrawID",En),he.render(Fe[En]/$t,xt[En])}else if(K.isInstancedMesh)he.renderInstances(yt,Be,K.count);else if(q.isInstancedBufferGeometry){let Fe=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,xt=Math.min(q.instanceCount,Fe);he.renderInstances(yt,Be,xt)}else he.render(yt,Be)};function Zl(B,R,q,V){w!==null&&B.isNodeMaterial&&w.setObject(V,B),Nt===!0&&It.setState(B,q,!1),B.transparent===!0&&B.side===Ve&&B.forceSinglePass===!1?(B.side=Te,B.needsUpdate=!0,er(B,R,V),B.side=jn,B.needsUpdate=!0,er(B,R,V),B.side=Ve):er(B,R,V)}this.compile=function(B,R,q=null){q===null&&(q=B),w!==null&&w.renderStart(B,R,q),M=ht.get(q),M.init(R),E.push(M),q.traverseVisible(function(K){K.isLight&&K.layers.test(R.layers)&&(M.pushLight(K),K.castShadow&&M.pushShadow(K))}),B!==q&&B.traverseVisible(function(K){K.isLight&&K.layers.test(R.layers)&&(M.pushLight(K),K.castShadow&&M.pushShadow(K))}),M.setupLights(),w!==null&&w.updateLights(M.state.lightsArray),Qt=this.localClippingEnabled,Nt=It.init(this.clippingPlanes,Qt),Nt===!0&&It.setGlobalState(this.clippingPlanes,R),w!==null&&Lt.render(M.state.shadowsArray,q,R);let V=new Set;return B.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;let gt=K.material;if(gt)if(Array.isArray(gt))for(let Bt=0;Bt<gt.length;Bt++){let mt=gt[Bt];Zl(mt,q,R,K),V.add(mt)}else Zl(gt,q,R,K),V.add(gt)}),M=E.pop(),w!==null&&w.renderEnd(),V},this.compileAsync=function(B,R,q=null){let V=this.compile(B,R,q);return new Promise(K=>{function gt(){if(V.forEach(function(Bt){let At=X.get(Bt).currentProgram;(At===void 0||At.isReady())&&V.delete(Bt)}),V.size===0){K(B);return}setTimeout(gt,10)}Zt.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let ho=null;function Fu(B){ho&&ho(B)}function $l(){ri.stop()}function jl(){ri.start()}let ri=new zh;ri.setAnimationLoop(Fu),typeof self!="undefined"&&ri.setContext(self),this.setAnimationLoop=function(B){ho=B,Mt.setAnimationLoop(B),B===null?ri.stop():ri.start()},Mt.addEventListener("sessionstart",$l),Mt.addEventListener("sessionend",jl),this.render=function(B,R){if(R!==void 0&&R.isCamera!==!0){Pt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;w!==null&&w.renderStart(B,R);let q=Mt.enabled===!0&&Mt.isPresenting===!0,V=D!==null&&(tt===null||q)&&D.begin(L,tt);if(B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),R.parent===null&&R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),Mt.enabled===!0&&Mt.isPresenting===!0&&(D===null||D.isCompositing()===!1)&&(Mt.cameraAutoUpdate===!0&&Mt.updateCamera(R),R=Mt.getCamera()),B.isScene===!0&&B.onBeforeRender(L,B,R,tt),M=ht.get(B,E.length),M.init(R),M.state.textureUnits=Q.getTextureUnits(),E.push(M),Ut.multiplyMatrices(R.projectionMatrix,R.matrixWorldInverse),Tt.setFromProjectionMatrix(Ut,cn,R.reversedDepth),Qt=this.localClippingEnabled,Nt=It.init(this.clippingPlanes,Qt),C=ft.get(B,I.length),C.init(),I.push(C),Mt.enabled===!0&&Mt.isPresenting===!0){let Bt=L.xr.getDepthSensingMesh();Bt!==null&&uo(Bt,R,-1/0,L.sortObjects)}uo(B,R,0,L.sortObjects),C.finish(),w!==null&&w.updateLights(M.state.lightsArray),L.sortObjects===!0&&C.sort(it,at),ee=Mt.enabled===!1||Mt.isPresenting===!1||Mt.hasDepthSensing()===!1,ee&&zt.addToRenderList(C,B),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Nt===!0&&It.beginShadows();let K=M.state.shadowsArray;if(Lt.render(K,B,R),Nt===!0&&It.endShadows(),(V&&D.hasRenderPass())===!1){let Bt=C.opaque,mt=C.transmissive;if(M.setupLights(),R.isArrayCamera){let At=R.cameras;if(mt.length>0)for(let St=0,Kt=At.length;St<Kt;St++){let Yt=At[St];ec(Bt,mt,B,Yt)}ee&&zt.render(B);for(let St=0,Kt=At.length;St<Kt;St++){let Yt=At[St];tc(C,B,Yt,Yt.viewport)}}else mt.length>0&&ec(Bt,mt,B,R),ee&&zt.render(B),tc(C,B,R)}tt!==null&&k===0&&(Q.updateMultisampleRenderTarget(tt),Q.updateRenderTargetMipmap(tt)),V&&D.end(L),B.isScene===!0&&B.onAfterRender(L,B,R),Et.resetDefaultState(),Y=-1,Z=null,E.pop(),E.length>0?(M=E[E.length-1],Q.setTextureUnits(M.state.textureUnits),Nt===!0&&It.setGlobalState(L.clippingPlanes,M.state.camera)):M=null,I.pop(),I.length>0?C=I[I.length-1]:C=null,w!==null&&w.renderEnd()};function uo(B,R,q,V){if(B.visible===!1)return;if(B.layers.test(R.layers)){if(B.isGroup)q=B.renderOrder;else if(B.isLOD)B.autoUpdate===!0&&B.update(R);else if(B.isLightProbeGrid)M.pushLightProbeGrid(B);else if(B.isLight)M.pushLight(B),B.castShadow&&M.pushShadow(B);else if(B.isSprite){if(!B.frustumCulled||B.intersectsFrustum(Tt)){V&&Vt.setFromMatrixPosition(B.matrixWorld).applyMatrix4(Ut);let Bt=nt.update(B),mt=B.material;mt.visible&&C.push(B,Bt,mt,q,Vt.z,null,R)}}else if((B.isMesh||B.isLine||B.isPoints)&&(!B.frustumCulled||B.intersectsFrustum(Tt))){let Bt=nt.update(B),mt=B.material;if(V&&(B.boundingSphere!==void 0?(B.boundingSphere===null&&B.computeBoundingSphere(),Vt.copy(B.boundingSphere.center)):(Bt.boundingSphere===null&&Bt.computeBoundingSphere(),Vt.copy(Bt.boundingSphere.center)),Vt.applyMatrix4(B.matrixWorld).applyMatrix4(Ut)),Array.isArray(mt)){let At=Bt.groups;for(let St=0,Kt=At.length;St<Kt;St++){let Yt=At[St],yt=mt[Yt.materialIndex];yt&&yt.visible&&C.push(B,Bt,yt,q,Vt.z,Yt,R)}}else mt.visible&&C.push(B,Bt,mt,q,Vt.z,null,R)}}let gt=B.children;for(let Bt=0,mt=gt.length;Bt<mt;Bt++)uo(gt[Bt],R,q,V)}function tc(B,R,q,V){let{opaque:K,transmissive:gt,transparent:Bt}=B;M.setupLightsView(q),Nt===!0&&It.setGlobalState(L.clippingPlanes,q),V&&g.viewport(et.copy(V)),K.length>0&&tr(K,R,q),gt.length>0&&tr(gt,R,q),Bt.length>0&&tr(Bt,R,q),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function ec(B,R,q,V){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[V.id]===void 0){let yt=Zt.has("EXT_color_buffer_half_float")||Zt.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[V.id]=new ze(1,1,{generateMipmaps:!0,type:yt?mn:Ze,minFilter:ei,samples:Math.max(4,S.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:qt.workingColorSpace})}let gt=M.state.transmissionRenderTarget[V.id],Bt=V.viewport||et;gt.setSize(Bt.z*L.transmissionResolutionScale,Bt.w*L.transmissionResolutionScale);let mt=L.getRenderTarget(),At=L.getActiveCubeFace(),St=L.getActiveMipmapLevel();L.setRenderTarget(gt),L.getClearColor(kt),wt=L.getClearAlpha(),wt<1&&L.setClearColor(16777215,.5),L.clear(),ee&&zt.render(q);let Kt=L.toneMapping;L.toneMapping=dn;let Yt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),M.setupLightsView(V),Nt===!0&&It.setGlobalState(L.clippingPlanes,V),tr(B,q,V),Q.updateMultisampleRenderTarget(gt),Q.updateRenderTargetMipmap(gt),Zt.has("WEBGL_multisampled_render_to_texture")===!1){let yt=!1;for(let se=0,Be=R.length;se<Be;se++){let fe=R[se],{object:he,geometry:Fe,material:xt,group:Oe}=fe;if(xt.side===Ve&&he.layers.test(V.layers)){let $t=xt.side;xt.side=Te,xt.needsUpdate=!0,nc(he,q,V,Fe,xt,Oe),xt.side=$t,xt.needsUpdate=!0,yt=!0}}yt===!0&&(Q.updateMultisampleRenderTarget(gt),Q.updateRenderTargetMipmap(gt))}L.setRenderTarget(mt,At,St),L.setClearColor(kt,wt),Yt!==void 0&&(V.viewport=Yt),L.toneMapping=Kt}function tr(B,R,q){let V=R.isScene===!0?R.overrideMaterial:null;for(let K=0,gt=B.length;K<gt;K++){let Bt=B[K],{object:mt,geometry:At,group:St}=Bt,Kt=Bt.material;Kt.allowOverride===!0&&V!==null&&(Kt=V),mt.layers.test(q.layers)&&nc(mt,R,q,At,Kt,St)}}function nc(B,R,q,V,K,gt){w!==null&&K.isNodeMaterial&&w.setObject(B,K),B.onBeforeRender(L,R,q,V,K,gt),B.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,B.matrixWorld),B.normalMatrix.getNormalMatrix(B.modelViewMatrix),K.onBeforeRender(L,R,q,V,B,gt),K.transparent===!0&&K.side===Ve&&K.forceSinglePass===!1?(K.side=Te,K.needsUpdate=!0,L.renderBufferDirect(q,R,V,K,B,gt),K.side=jn,K.needsUpdate=!0,L.renderBufferDirect(q,R,V,K,B,gt),K.side=Ve):L.renderBufferDirect(q,R,V,K,B,gt),B.onAfterRender(L,R,q,V,K,gt)}function er(B,R,q){R.isScene!==!0&&(R=te);let V=X.get(B),K=M.state.lights,gt=M.state.shadowsArray,Bt=K.state.version,mt=ct.getParameters(B,K.state,gt,R,q,M.state.lightProbeGridArray),At=ct.getProgramCacheKey(mt),St=V.programs;V.environment=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?R.environment:null,V.fog=R.fog;let Kt=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap;V.envMap=ot.get(B.envMap||V.environment,Kt),V.envMapRotation=V.environment!==null&&B.envMap===null?R.environmentRotation:B.envMapRotation,St===void 0&&(B.addEventListener("dispose",_n),St=new Map,V.programs=St);let Yt=St.get(At);if(Yt!==void 0){if(V.currentProgram===Yt&&V.lightsStateVersion===Bt)return sc(B,mt),Yt}else mt.uniforms=ct.getUniforms(B),w!==null&&B.isNodeMaterial&&w.build(B,q,mt),B.onBeforeCompile(mt,L),Yt=ct.acquireProgram(mt,At),St.set(At,Yt),V.uniforms=mt.uniforms;let yt=V.uniforms;return(!B.isShaderMaterial&&!B.isRawShaderMaterial||B.clipping===!0)&&(yt.clippingPlanes=It.uniform),sc(B,mt),V.needsLights=Gu(B),V.lightsStateVersion=Bt,V.needsLights&&(yt.ambientLightColor.value=K.state.ambient,yt.lightProbe.value=K.state.probe,yt.sunLights.value=K.state.sun,yt.sunLightShadows.value=K.state.sunShadow,yt.directionalLights.value=K.state.directional,yt.directionalLightShadows.value=K.state.directionalShadow,yt.spotLights.value=K.state.spot,yt.spotLightShadows.value=K.state.spotShadow,yt.rectAreaLights.value=K.state.rectArea,yt.ltc_1.value=K.state.rectAreaLTC1,yt.ltc_2.value=K.state.rectAreaLTC2,yt.pointLights.value=K.state.point,yt.pointLightShadows.value=K.state.pointShadow,yt.hemisphereLights.value=K.state.hemi,yt.sunShadowMatrix.value=K.state.sunShadowMatrix,yt.sunShadowCascade.value=K.state.sunShadowCascade,yt.directionalShadowMatrix.value=K.state.directionalShadowMatrix,yt.spotLightMatrix.value=K.state.spotLightMatrix,yt.spotLightMap.value=K.state.spotLightMap,yt.pointShadowMatrix.value=K.state.pointShadowMatrix),V.lightProbeGrid=M.state.lightProbeGridArray.length>0,V.currentProgram=Yt,V.uniformsList=null,Yt}function ic(B){if(B.uniformsList===null){let R=B.currentProgram.getUniforms();B.uniformsList=ts.seqWithValue(R.seq,B.uniforms)}return B.uniformsList}function sc(B,R){let q=X.get(B);q.outputColorSpace=R.outputColorSpace,q.batching=R.batching,q.batchingColor=R.batchingColor,q.instancing=R.instancing,q.instancingColor=R.instancingColor,q.instancingMorph=R.instancingMorph,q.skinning=R.skinning,q.morphTargets=R.morphTargets,q.morphNormals=R.morphNormals,q.morphColors=R.morphColors,q.morphTargetsCount=R.morphTargetsCount,q.numClippingPlanes=R.numClippingPlanes,q.numIntersection=R.numClipIntersection,q.vertexAlphas=R.vertexAlphas,q.vertexTangents=R.vertexTangents,q.toneMapping=R.toneMapping}function wu(B,R){if(B.length===0)return null;if(B.length===1)return B[0].texture!==null?B[0]:null;A.setFromMatrixPosition(R.matrixWorld);for(let q=0,V=B.length;q<V;q++){let K=B[q];if(K.texture!==null&&K.boundingBox.containsPoint(A))return K}return null}function Ru(B,R,q,V,K){R.isScene!==!0&&(R=te),Q.resetTextureUnits();let gt=R.fog,Bt=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?R.environment:null,mt=tt===null?L.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:qt.workingColorSpace,At=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,St=ot.get(V.envMap||Bt,At),Kt=V.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Yt=!!q.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),yt=!!q.morphAttributes.position,se=!!q.morphAttributes.normal,Be=!!q.morphAttributes.color,fe=dn;V.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(fe=L.toneMapping);let he=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Fe=he!==void 0?he.length:0,xt=X.get(V),Oe=M.state.lights;if(Nt===!0&&(Qt===!0||B!==Z)){let de=B===Z&&V.id===Y;It.setState(V,B,de)}let $t=!1;V.version===xt.__version?(xt.needsLights&&xt.lightsStateVersion!==Oe.state.version||xt.outputColorSpace!==mt||K.isBatchedMesh&&xt.batching===!1||!K.isBatchedMesh&&xt.batching===!0||K.isBatchedMesh&&xt.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&xt.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&xt.instancing===!1||!K.isInstancedMesh&&xt.instancing===!0||K.isSkinnedMesh&&xt.skinning===!1||!K.isSkinnedMesh&&xt.skinning===!0||K.isInstancedMesh&&xt.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&xt.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&xt.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&xt.instancingMorph===!1&&K.morphTexture!==null||xt.envMap!==St||V.fog===!0&&xt.fog!==gt||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==It.numPlanes||xt.numIntersection!==It.numIntersection)||xt.vertexAlphas!==Kt||xt.vertexTangents!==Yt||xt.morphTargets!==yt||xt.morphNormals!==se||xt.morphColors!==Be||xt.toneMapping!==fe||xt.morphTargetsCount!==Fe||!!xt.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&($t=!0):($t=!0,xt.__version=V.version);let $e=xt.currentProgram;$t===!0&&($e=er(V,R,K),w&&V.isNodeMaterial&&w.onUpdateProgram(V,$e,xt));let En=!1,Ln=!1,Bi=!1,le=$e.getUniforms(),Ee=xt.uniforms;if(g.useProgram($e.program)&&(En=!0,Ln=!0,Bi=!0),V.id!==Y&&(Y=V.id,Ln=!0),xt.needsLights){let de=wu(M.state.lightProbeGridArray,K);xt.lightProbeGrid!==de&&(xt.lightProbeGrid=de,Ln=!0)}if(En||Z!==B){g.buffers.depth.getReversed()&&B.reversedDepth!==!0&&(B._reversedDepth=!0,B.updateProjectionMatrix()),le.setValue(b,"projectionMatrix",B.projectionMatrix),le.setValue(b,"viewMatrix",B.matrixWorldInverse);let Pn=le.map.cameraPosition;Pn!==void 0&&Pn.setValue(b,jt.setFromMatrixPosition(B.matrixWorld)),S.logarithmicDepthBuffer&&le.setValue(b,"logDepthBufFC",2/(Math.log(B.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&le.setValue(b,"isOrthographic",B.isOrthographicCamera===!0),Z!==B&&(Z=B,Ln=!0,Bi=!0)}if(xt.needsLights&&(Oe.state.sunShadowMap.length>0&&le.setValue(b,"sunShadowMap",Oe.state.sunShadowMap,Q),Oe.state.directionalShadowMap.length>0&&le.setValue(b,"directionalShadowMap",Oe.state.directionalShadowMap,Q),Oe.state.spotShadowMap.length>0&&le.setValue(b,"spotShadowMap",Oe.state.spotShadowMap,Q),Oe.state.pointShadowMap.length>0&&le.setValue(b,"pointShadowMap",Oe.state.pointShadowMap,Q)),K.isSkinnedMesh){le.setOptional(b,K,"bindMatrix"),le.setOptional(b,K,"bindMatrixInverse");let de=K.skeleton;de&&(de.boneTexture===null&&de.computeBoneTexture(),le.setValue(b,"boneTexture",de.boneTexture,Q))}K.isBatchedMesh&&(le.setOptional(b,K,"batchingTexture"),le.setValue(b,"batchingTexture",K._matricesTexture,Q),le.setOptional(b,K,"batchingIdTexture"),le.setValue(b,"batchingIdTexture",K._indirectTexture,Q),le.setOptional(b,K,"batchingColorTexture"),K._colorsTexture!==null&&le.setValue(b,"batchingColorTexture",K._colorsTexture,Q));let Gn=q.morphAttributes;if((Gn.position!==void 0||Gn.normal!==void 0||Gn.color!==void 0)&&G.update(K,q,$e),(Ln||xt.receiveShadow!==K.receiveShadow)&&(xt.receiveShadow=K.receiveShadow,le.setValue(b,"receiveShadow",K.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&R.environment!==null&&(Ee.envMapIntensity.value=R.environmentIntensity),Ee.dfgLUT!==void 0&&(Ee.dfgLUT.value=A0()),Ln){if(le.setValue(b,"toneMappingExposure",L.toneMappingExposure),xt.needsLights&&Lu(Ee,Bi),gt&&V.fog===!0&&bt.refreshFogUniforms(Ee,gt),bt.refreshMaterialUniforms(Ee,V,J,O,M.state.transmissionRenderTarget[B.id]),xt.needsLights&&xt.lightProbeGrid){let de=xt.lightProbeGrid;Ee.probesSH.value=de.texture,Ee.probesMin.value.copy(de.boundingBox.min),Ee.probesMax.value.copy(de.boundingBox.max),Ee.probesResolution.value.copy(de.resolution)}ts.upload(b,ic(xt),Ee,Q)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(ts.upload(b,ic(xt),Ee,Q),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&le.setValue(b,"center",K.center),le.setValue(b,"modelViewMatrix",K.modelViewMatrix),le.setValue(b,"normalMatrix",K.normalMatrix),le.setValue(b,"modelMatrix",K.matrixWorld),V.uniformsGroups!==void 0){let de=V.uniformsGroups;for(let Pn=0,Ai=de.length;Pn<Ai;Pn++){let ac=de[Pn];st.update(ac,$e),st.bind(ac,$e)}}return $e}function Lu(B,R){B.ambientLightColor.needsUpdate=R,B.lightProbe.needsUpdate=R,B.sunLights.needsUpdate=R,B.sunLightShadows.needsUpdate=R,B.directionalLights.needsUpdate=R,B.directionalLightShadows.needsUpdate=R,B.pointLights.needsUpdate=R,B.pointLightShadows.needsUpdate=R,B.spotLights.needsUpdate=R,B.spotLightShadows.needsUpdate=R,B.rectAreaLights.needsUpdate=R,B.hemisphereLights.needsUpdate=R}function Gu(B){return B.isMeshLambertMaterial||B.isMeshToonMaterial||B.isMeshPhongMaterial||B.isMeshStandardMaterial||B.isShadowMaterial||B.isShaderMaterial&&B.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return tt},this.setRenderTargetTextures=function(B,R,q){let V=X.get(B);V.__autoAllocateDepthBuffer=B.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),X.get(B.texture).__webglTexture=R,X.get(B.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:q,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(B,R){let q=X.get(B);q.__webglFramebuffer=R,q.__useDefaultFramebuffer=R===void 0},this.setRenderTarget=function(B,R=0,q=0){tt=B,P=R,k=q;let V=null,K=!1,gt=!1;if(B){let mt=X.get(B);if(mt.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(b.FRAMEBUFFER,mt.__webglFramebuffer),et.copy(B.viewport),_t.copy(B.scissor),Ct=B.scissorTest,g.viewport(et),g.scissor(_t),g.setScissorTest(Ct),Y=-1;return}else if(mt.__webglFramebuffer===void 0)Q.setupRenderTarget(B);else if(mt.__hasExternalTextures)Q.rebindTextures(B,X.get(B.texture).__webglTexture,X.get(B.depthTexture).__webglTexture);else if(B.depthBuffer){let Kt=B.depthTexture;if(mt.__boundDepthTexture!==Kt){if(Kt!==null&&X.has(Kt)&&(B.width!==Kt.image.width||B.height!==Kt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(B)}}let At=B.texture;(At.isData3DTexture||At.isDataArrayTexture||At.isCompressedArrayTexture)&&(gt=!0);let St=X.get(B).__webglFramebuffer;B.isWebGLCubeRenderTarget?(Array.isArray(St[R])?V=St[R][q]:V=St[R],K=!0):B.samples>0&&Q.useMultisampledRTT(B)===!1?V=X.get(B).__webglMultisampledFramebuffer:Array.isArray(St)?V=St[q]:V=St,et.copy(B.viewport),_t.copy(B.scissor),Ct=B.scissorTest}else et.copy(rt).multiplyScalar(J).floor(),_t.copy(vt).multiplyScalar(J).floor(),Ct=Gt;if(q!==0&&(V=U),g.bindFramebuffer(b.FRAMEBUFFER,V)&&g.drawBuffers(B,V),g.viewport(et),g.scissor(_t),g.setScissorTest(Ct),K){let mt=X.get(B.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_CUBE_MAP_POSITIVE_X+R,mt.__webglTexture,q)}else if(gt){let mt=R;for(let At=0;At<B.textures.length;At++){let St=X.get(B.textures[At]);b.framebufferTextureLayer(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0+At,St.__webglTexture,q,mt)}}else if(B!==null&&q!==0){let mt=X.get(B.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,mt.__webglTexture,q)}Y=-1};function rc(B){let R=X.get(B);return(R.__readFormat!==B.format||R.__readType!==B.type)&&(R.__readFormat=B.format,R.__readType=B.type,R.__formatReadable=S.textureFormatReadable(B.format),R.__typeReadable=S.textureTypeReadable(B.type)),R}this.readRenderTargetPixels=function(B,R,q,V,K,gt,Bt,mt=0){if(!(B&&B.isWebGLRenderTarget)){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let At=X.get(B).__webglFramebuffer;if(B.isWebGLCubeRenderTarget&&Bt!==void 0&&(At=At[Bt]),At){g.bindFramebuffer(b.FRAMEBUFFER,At);try{let St=B.textures[mt],Kt=St.format,Yt=St.type;B.textures.length>1&&b.readBuffer(b.COLOR_ATTACHMENT0+mt);let yt=rc(St);if(yt.__formatReadable===!1){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(yt.__typeReadable===!1){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}R>=0&&R<=B.width-V&&q>=0&&q<=B.height-K&&b.readPixels(R,q,V,K,dt.convert(Kt),dt.convert(Yt),gt)}finally{let St=tt!==null?X.get(tt).__webglFramebuffer:null;g.bindFramebuffer(b.FRAMEBUFFER,St)}}},this.readRenderTargetPixelsAsync=async function(B,R,q,V,K,gt,Bt,mt=0){if(!(B&&B.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let At=X.get(B).__webglFramebuffer;if(B.isWebGLCubeRenderTarget&&Bt!==void 0&&(At=At[Bt]),At)if(R>=0&&R<=B.width-V&&q>=0&&q<=B.height-K){g.bindFramebuffer(b.FRAMEBUFFER,At);let St=B.textures[mt],Kt=St.format,Yt=St.type;B.textures.length>1&&b.readBuffer(b.COLOR_ATTACHMENT0+mt);let yt=rc(St);if(yt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(yt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let se=b.createBuffer();b.bindBuffer(b.PIXEL_PACK_BUFFER,se),b.bufferData(b.PIXEL_PACK_BUFFER,gt.byteLength,b.STREAM_READ),b.readPixels(R,q,V,K,dt.convert(Kt),dt.convert(Yt),0),b.bindBuffer(b.PIXEL_PACK_BUFFER,null);let Be=tt!==null?X.get(tt).__webglFramebuffer:null;g.bindFramebuffer(b.FRAMEBUFFER,Be);let fe=b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE,0);return b.flush(),await mh(b,fe,4),b.bindBuffer(b.PIXEL_PACK_BUFFER,se),b.getBufferSubData(b.PIXEL_PACK_BUFFER,0,gt),b.bindBuffer(b.PIXEL_PACK_BUFFER,null),b.deleteBuffer(se),b.deleteSync(fe),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(B,R=null,q=0){let V=Math.pow(2,-q),K=Math.floor(B.image.width*V),gt=Math.floor(B.image.height*V),Bt=R!==null?R.x:0,mt=R!==null?R.y:0;Q.setTexture2D(B,0),b.copyTexSubImage2D(b.TEXTURE_2D,q,0,0,Bt,mt,K,gt),g.unbindTexture()},this.copyTextureToTexture=function(B,R,q=null,V=null,K=0,gt=0){let Bt,mt,At,St,Kt,Yt,yt,se,Be,fe=B.isCompressedTexture?B.mipmaps[gt]:B.image;if(q!==null)Bt=q.max.x-q.min.x,mt=q.max.y-q.min.y,At=q.isBox3?q.max.z-q.min.z:1,St=q.min.x,Kt=q.min.y,Yt=q.isBox3?q.min.z:0;else{let Ee=Math.pow(2,-K);Bt=Math.floor(fe.width*Ee),mt=Math.floor(fe.height*Ee),B.isDataArrayTexture?At=fe.depth:B.isData3DTexture?At=Math.floor(fe.depth*Ee):At=1,St=0,Kt=0,Yt=0}V!==null?(yt=V.x,se=V.y,Be=V.z):(yt=0,se=0,Be=0);let he=dt.convert(R.format),Fe=dt.convert(R.type),xt;R.isData3DTexture?(Q.setTexture3D(R,0),xt=b.TEXTURE_3D):R.isDataArrayTexture||R.isCompressedArrayTexture?(Q.setTexture2DArray(R,0),xt=b.TEXTURE_2D_ARRAY):(Q.setTexture2D(R,0),xt=b.TEXTURE_2D),g.activeTexture(b.TEXTURE0),g.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,R.flipY),g.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),g.pixelStorei(b.UNPACK_ALIGNMENT,R.unpackAlignment);let Oe=g.getParameter(b.UNPACK_ROW_LENGTH),$t=g.getParameter(b.UNPACK_IMAGE_HEIGHT),$e=g.getParameter(b.UNPACK_SKIP_PIXELS),En=g.getParameter(b.UNPACK_SKIP_ROWS),Ln=g.getParameter(b.UNPACK_SKIP_IMAGES);g.pixelStorei(b.UNPACK_ROW_LENGTH,fe.width),g.pixelStorei(b.UNPACK_IMAGE_HEIGHT,fe.height),g.pixelStorei(b.UNPACK_SKIP_PIXELS,St),g.pixelStorei(b.UNPACK_SKIP_ROWS,Kt),g.pixelStorei(b.UNPACK_SKIP_IMAGES,Yt);let Bi=B.isDataArrayTexture||B.isData3DTexture,le=R.isDataArrayTexture||R.isData3DTexture;if(B.isDepthTexture){let Ee=X.get(B),Gn=X.get(R),de=X.get(Ee.__renderTarget),Pn=X.get(Gn.__renderTarget);g.bindFramebuffer(b.READ_FRAMEBUFFER,de.__webglFramebuffer),g.bindFramebuffer(b.DRAW_FRAMEBUFFER,Pn.__webglFramebuffer);for(let Ai=0;Ai<At;Ai++)Bi&&(b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,X.get(B).__webglTexture,K,Yt+Ai),b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,X.get(R).__webglTexture,gt,Be+Ai)),b.blitFramebuffer(St,Kt,Bt,mt,yt,se,Bt,mt,b.DEPTH_BUFFER_BIT,b.NEAREST);g.bindFramebuffer(b.READ_FRAMEBUFFER,null),g.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else if(K!==0||B.isRenderTargetTexture||X.has(B)){let Ee=X.get(B),Gn=X.get(R);g.bindFramebuffer(b.READ_FRAMEBUFFER,F),g.bindFramebuffer(b.DRAW_FRAMEBUFFER,N);for(let de=0;de<At;de++)Bi?b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,Ee.__webglTexture,K,Yt+de):b.framebufferTexture2D(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,Ee.__webglTexture,K),le?b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,Gn.__webglTexture,gt,Be+de):b.framebufferTexture2D(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,Gn.__webglTexture,gt),K!==0?b.blitFramebuffer(St,Kt,Bt,mt,yt,se,Bt,mt,b.COLOR_BUFFER_BIT,b.NEAREST):le?b.copyTexSubImage3D(xt,gt,yt,se,Be+de,St,Kt,Bt,mt):b.copyTexSubImage2D(xt,gt,yt,se,St,Kt,Bt,mt);g.bindFramebuffer(b.READ_FRAMEBUFFER,null),g.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else le?B.isDataTexture||B.isData3DTexture?b.texSubImage3D(xt,gt,yt,se,Be,Bt,mt,At,he,Fe,fe.data):R.isCompressedArrayTexture?b.compressedTexSubImage3D(xt,gt,yt,se,Be,Bt,mt,At,he,fe.data):b.texSubImage3D(xt,gt,yt,se,Be,Bt,mt,At,he,Fe,fe):B.isDataTexture?b.texSubImage2D(b.TEXTURE_2D,gt,yt,se,Bt,mt,he,Fe,fe.data):B.isCompressedTexture?b.compressedTexSubImage2D(b.TEXTURE_2D,gt,yt,se,fe.width,fe.height,he,fe.data):b.texSubImage2D(b.TEXTURE_2D,gt,yt,se,Bt,mt,he,Fe,fe);g.pixelStorei(b.UNPACK_ROW_LENGTH,Oe),g.pixelStorei(b.UNPACK_IMAGE_HEIGHT,$t),g.pixelStorei(b.UNPACK_SKIP_PIXELS,$e),g.pixelStorei(b.UNPACK_SKIP_ROWS,En),g.pixelStorei(b.UNPACK_SKIP_IMAGES,Ln),gt===0&&R.generateMipmaps&&b.generateMipmap(xt),g.unbindTexture()},this.initRenderTarget=function(B){X.get(B).__webglFramebuffer===void 0&&Q.setupRenderTarget(B)},this.initTexture=function(B){B.isCubeTexture?Q.setTextureCube(B,0):B.isData3DTexture?Q.setTexture3D(B,0):B.isDataArrayTexture||B.isCompressedArrayTexture?Q.setTexture2DArray(B,0):Q.setTexture2D(B,0),g.unbindTexture()},this.resetState=function(){P=0,k=0,tt=null,g.reset(),Et.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}};var qh={type:"change"},Ol={type:"start"},Zh={type:"end"},ja=new Wn,Qh=new Xe,y0=Math.cos(70*dl.DEG2RAD),ve=new H,Ke=2*Math.PI,ae={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Nl=1e-6,to=class extends Ls{constructor(t,e=null){super(t,e),this.state=ae.NONE,this.target=new H,this.cursor=new H,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Zn.ROTATE,MIDDLE:Zn.DOLLY,RIGHT:Zn.PAN},this.touches={ONE:$n.ROTATE,TWO:$n.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new H,this._lastQuaternion=new Ye,this._lastTargetPosition=new H,this._quat=new Ye().setFromUnitVectors(t.up,new H(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Wi,this._sphericalDelta=new Wi,this._scale=1,this._panOffset=new H,this._rotateStart=new Ot,this._rotateEnd=new Ot,this._rotateDelta=new Ot,this._panStart=new Ot,this._panEnd=new Ot,this._panDelta=new Ot,this._dollyStart=new Ot,this._dollyEnd=new Ot,this._dollyDelta=new Ot,this._dollyDirection=new H,this._mouse=new Ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=v0.bind(this),this._onPointerDown=M0.bind(this),this._onPointerUp=S0.bind(this),this._onContextMenu=R0.bind(this),this._onMouseWheel=I0.bind(this),this._onKeyDown=T0.bind(this),this._onTouchStart=F0.bind(this),this._onTouchMove=w0.bind(this),this._onMouseDown=D0.bind(this),this._onMouseMove=b0.bind(this),this._interceptControlDown=L0.bind(this),this._interceptControlUp=G0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ae.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(qh),this.update(),this.state=ae.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;ve.copy(e).sub(this.target),ve.applyQuaternion(this._quat),this._spherical.setFromVector3(ve),this.autoRotate&&this.state===ae.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Ke:n>Math.PI&&(n-=Ke),s<-Math.PI?s+=Ke:s>Math.PI&&(s-=Ke),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(ve.setFromSpherical(this._spherical),ve.applyQuaternion(this._quatInverse),e.copy(this.target).add(ve),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let l=ve.length();a=this._clampDistance(l*this._scale);let o=l-a;this.object.position.addScaledVector(this._dollyDirection,o),this.object.updateMatrixWorld(),r=!!o}else if(this.object.isOrthographicCamera){let l=new H(this._mouse.x,this._mouse.y,0);l.unproject(this.object);let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=o!==this.object.zoom;let c=new H(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(l),this.object.updateMatrixWorld(),a=ve.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ja.origin.copy(this.object.position),ja.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ja.direction))<y0?this.object.lookAt(this.target):(Qh.setFromNormalAndCoplanarPoint(this.object.up,this.target),ja.intersectPlane(Qh,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Nl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Nl||this._lastTargetPosition.distanceToSquared(this.target)>Nl?(this.dispatchEvent(qh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ke/60*this.autoRotateSpeed*t:Ke/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ve.setFromMatrixColumn(e,0),ve.multiplyScalar(-t),this._panOffset.add(ve)}_panUp(t,e){this.screenSpacePanning===!0?ve.setFromMatrixColumn(e,1):(ve.setFromMatrixColumn(e,0),ve.crossVectors(this.object.up,ve)),ve.multiplyScalar(t),this._panOffset.add(ve)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;ve.copy(s).sub(this.target);let r=ve.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,l=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/l)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,l=(t.pageY+e.y)*.5;this._updateZoomParameters(a,l)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ot,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function M0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function v0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function S0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Zh),this.state=ae.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function D0(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Zn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ae.DOLLY;break;case Zn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ae.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ae.ROTATE}break;case Zn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ae.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ae.PAN}break;default:this.state=ae.NONE}this.state!==ae.NONE&&this.dispatchEvent(Ol)}function b0(i){switch(this.state){case ae.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ae.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ae.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function I0(i){this.enabled===!1||this.enableZoom===!1||this.state!==ae.NONE||(i.preventDefault(),this.dispatchEvent(Ol),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Zh))}function T0(i){this.enabled!==!1&&this._handleKeyDown(i)}function F0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case $n.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ae.TOUCH_ROTATE;break;case $n.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ae.TOUCH_PAN;break;default:this.state=ae.NONE}break;case 2:switch(this.touches.TWO){case $n.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ae.TOUCH_DOLLY_PAN;break;case $n.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ae.TOUCH_DOLLY_ROTATE;break;default:this.state=ae.NONE}break;default:this.state=ae.NONE}this.state!==ae.NONE&&this.dispatchEvent(Ol)}function w0(i){switch(this._trackPointer(i),this.state){case ae.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ae.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ae.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ae.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ae.NONE}}function R0(i){this.enabled!==!1&&i.preventDefault()}function L0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function G0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function $h(i,t,e){let n=new H;return{add(s,r){let a=document.createElement("span");return a.className=`al-lab ${s}`,a.innerHTML=r,i.appendChild(a),a},place(s,r,a=!0,l=0){n.copy(r).project(e);let o=t.clientWidth,c=t.clientHeight,d=!a||n.z>1||Math.abs(n.x)>1.05||Math.abs(n.y)>1.05;if(s.style.opacity=d?0:1,s.style.pointerEvents=d?"none":"",d)return;let f=s.offsetWidth/2+4,h=Math.min(o-f,Math.max(f,(n.x*.5+.5)*o));s.style.transform=`translate(${h}px, ${(-n.y*.5+.5)*c+l}px) translate(-50%, -50%)`}}}function jh(i,t,e={}){let n=()=>{let s=document.querySelector(i);if(!s)return;let r=null,a=!1,l=()=>(a||(a=!0,r=t(s)),r),o=new IntersectionObserver(c=>{c[0].isIntersecting&&(o.disconnect(),l())},{rootMargin:"600px"});o.observe(s);for(let[c,d]of Object.entries(e))document.querySelectorAll(`[data-lab-${c}]`).forEach(f=>f.addEventListener("click",h=>{let m=l();m&&(h.preventDefault(),s.scrollIntoView({behavior:"smooth",block:"center"}),d(m,f.getAttribute(`data-lab-${c}`)))}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n):n()}function vn(i,t){let e=()=>document.querySelectorAll(i).forEach(n=>{n.__done||(n.__done=!0,t(n))});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var oe=i=>String(i).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),Dt=(i,t)=>`${oe(i)}<span class="zh">${oe(t)}</span>`,nn=i=>JSON.parse(i.querySelector('script[type="application/json"]').textContent);var eo={source:"Natural Earth 1:50m Land v5.1.2 (public domain) \xB7 naturalearthdata.com",q:.05,polys:[["ghHlURTADQKAJVBHEHHLDDIDAEIIBGGYK"],["gzF9ODNMNIfBLIXIDUIIJaRBVIVANMTGAKdDXMLBLEFePKAONoBVGHFCBFUVKRKhBECGFAKCGWPCIGJEhBMNcLMTMHIPKJAJKJBNAjBUpBAPAHJRDXHZDjBPXDPLJABNFNXFDANHBGBPRBTJHNZJnBAbRHxBDNDpBbZDGFECCHDDJMHBFKPEGGBGHANJJGIAIKHITJKBrBXrBQdGDFHCPKNCJGXaBIEQDMLOTQKEEDAIfJLCMYAKPYPnBfDEOQAEeSWDQGEHUAHNPHRfPVXCNFGFDNMHCEEKDJaLMHQPEHQGAAIXORARKVBTMVINDpCDhCV3BBtBXTDPXNLLDPEZDDGZA9BDHFHJVFdTLB1BCTIROVIAeIFGAGEIODWGKBcXuBJ4BbqBDehBuBEBCGKRGBEEAGJKHQCEKJALGGGLEDEEASf4BEYKSCUDKMeECCBAXKGMWeMWScQcBgBMWGOKUBiBIWKOMUgBUQHWEQSOKOYpBCSKBAINQGEBIGAEHIGKFSANEAGICCKBCDFDICKEAGKOHAGFABGIGMDCEFCBKEEMECKCBBJGEEFEEEQBEGACFGGGFKIAGECWLebFXEEEBBKQMSFGJCMIDIHAMIAJIEELGMQGSQKDGAIGCEIICAIKDAIGAAGIAEGGJYAIEGDEGICBCAQFGRCJGGEIDIEOLKEKLcFUHOCMHGAcOHNMAEHGBEGDGMICHMDCDPRCHFJFENFAZBHTXCFeTEFQFEHIAcNWReHKRgBNSEOIW2BKoBFYEMFOIWBMIGEABIFEAGGOEBIsBMKGBBDGFGLAT"],["8-G1VMLCRbFZGBKKMMGQE"],["otGpZKBeRST0BhBAHHDLG7BmBfgBDO"],["2_EiBGACIIECKUGARPHBFOHEHIFjBKDFEVSZPINSAWFMCKFMIcQOFNEFANNN"],["w2Cr9BQGCFJDGBeIIBCDFJJEPDKFKCCBHDlBGBDJBBCCIBIEEFEEIIIEHDF"],["mvC8kDhBEYGoBCIIiBBKDCDjBH"],["uoCkkDXCFKHCEC4BBeDhBB"],["5f04CADEDBBfHPE5BBOIAIEAoBAgBG"],["2nGxLIHQCMHGJFDhBIHMCG"],["0yEyKDDCEEKWWIEsBuBESIQCBANGRNFFLPFBFLT"],["k5EwOOAEBBDKEBJLLBHfNGwBHGACGC"],["-5EqLFAFKLIFMCGQGBQIQKEKDCDPlBAJGN"],["27EmOQAEFBPGFENDDFGCLJEBeDCHBFY"],["y8E2PCJKDDJCNCNIHDEPALOCKVQDKBG"],["82E8QUBMLCTFNFDNMJaLKCE"],["-iGrIBDHBNGFGAKROAUOFOVOJ"],["m_F9FBDFIDUNWxBeLEECAGQLgBPmBhBGJ"],["mtFpKJFZASiBIESCKLHN"],["miFxDKFQAGFMPBLlBUNABDXINHNMJNAMMOgBAGDOG"],["y-E7DIBILAHLDPATOCM"],["w5E3KtBLJEBDLBTGRAHBDGCMeGiBNUGOHWOCEFAEEGBAH"],["g2E1LMLKBKJAFNHLEVSVEDGKEYAGE"],["6zErKOAEDKEINBDLCBBEDPABIHHbFRDJECSMIQDKJGBMGRKBIOC"],["6xE3KFHEDNAPEKCBMOKMF"],["qwElKKJNHHJDMRGFKUBIG"],["ykEhCMfSDHNCFZKHYZGIKEKGAEHAIIC"],["ocopCOAOFVHPBHJFAIILEEGFE"],["gboiDSAKNcASDLBBDoCJdDPHlBFNAAGKElCDDEOCSMXGTMACLE"],["2tCilDEBFHpBHdEZBNEEGMG"],["q7BilDoBBKDABnBEPFtBFHEpBC"],["8-BmlDUBkBHdFrBBJDfBDBKBCDxBBDAOEDCjBBNEyBKwBBECBGEE"],["6-Bw2CBFDERLdDRCFKEMWGMA"],["yrCu3CAHdBHGVCTOYI"],["q4Cs7CdAEKOGaAaL"],["8zD0jDVArBMsBCiCF"],["4tEg9CXLbCXIQAII"],["owFw8CXDHEDIiBCGD"],["6dusBMCBDKFOCgBDKCCJUIFL1BBDGJChBEBMEBEG"],["od2wBEFaFGRKBCFJALQPCPONCOI"],["irBwsBTLBDGHNBLHNDBDVIFIAGYECIaB"],["8XqoCLFAHEDdTGIHGCMQMOC"],["2P4lCAFNHIFLDBPHBHSNAHQDEMCGIIACHEBGIDCOGQB"],["qNwlCGLAFHDXEFIAG"],["-D4xBMDHLHDJEDGHBFCWOMC"],["12El8CMJdFAHzBBZEACICFEMGdEOI"],["99Ez7CYDUJXFiBBSEUFDBOFBFxBCtBMNKXBBEHGIG"],["1yCjkDdIDEfKoCBGFKAEH"],["poChwCOEABKDCDHDEBPCHDBEJBDCMCFCAELAIIQE"],["_uCxwCDDSAjBLTGeSKB"],["j8Cp4CGBFDrBH5BFJGKGsBEIGOHII"],["39Cl3CWHHHXAVEEG"],["z6D75CBHKAEIIAGDFDKDUOeBHFbFMBsBICHBFTBCF9CCnCMnCCLEGEuCGQHwBMQB"],["98Cr7CLHMFHF1BKHIIEYARGOEqBDGD"],["_0Cp0CfLNKeaWKGDJFAHKDVH"],["z_Gw5CWBiBNLF1BDhBCAW"],["xpChgCQBCBDFKBAGOAEDFDGBBBhBJCFVEGFLBBDFCDEEIUKBI"],["ruBxjCQBEDBBMAMLGAAFEBLDPOPGdIBCECPCYA"],["l8Cl2BNALEIOGsBUDGLFDEFNFONLH"],["rrCpgCkBEGDZTNBJHRGcMNCOCLM"],["j9Ct9BARCDFLFAFKIOJFDLTCCIGBCGFGOEDEKIBGECOA"],["n7C_3BJBFEBEIMSF"],["ntCs9BxBETIJIbMOC0BJqBPEF"],["rsCu5BKCHDEBDFMCMILASOCDQBDFEBfNZBFGBKEIWaOIEACJFT"],["p2GyvCYBQEkBNiBBFFTANHDGpBOfDFGCI"],["1vGwrCQDCJEFTBBDnBKLIYAOI"],["rsG4kCEHMFJEJDRBVHHADGQOcG"],["xgDiXkBLGJLBNEDDFCDHFGPCLKJCBGUG"],["1yCiXUBCFNLxBCCIDGEG"],["j_FooCSCBFMDHFVCKFpBLEDLHDCKILACEHCFBIDFDNSGISEQNFOGAHGCCODMCCGMB"],["v-F-oCECODFFFEBDLANFREQIKADE"],["3jFslCHLHEBELJBCBIIICKOEKH"],["9mFumCOBEHUHSPNEFFKCKHBDIAARVIBIHDLMGCFECEJAPIMAGEDGPDII"],["1mFonCOBCJDDLKINNBFCBMLIGC"],["1oF2nCOZDTLMEIREGKJIHHFBAMOK"],["roF2oCSASTPODCCFMLCJVLFEEOFGLc"],["1pF6oCGDDDEBKEQDAHPBOBGDDDXGFJHCHIRMKKGDCE"],["1gFmiCCRHHBSFDLOGMQH"],["5lF2jCOBGFBDNHOCCOUENjBTBJEMCPGHMBICG"],["1kFwiCELLAUHFDGHIABDGABFlBaDGECPG"],["3vCi6BEEWFoBEGDVHAHRCECFECEJDCBREDGNCBGJCCEOMDJ"],["z6CozBDDEAYGzBPbDEEJAUKkBEQG"],["89FrFIEMFBRNJGLBDJDNAJNfNfBJILAdSEIkBFUEECGSCBDJGHcCSUMCBc"],["k_EvKfTrBPlBhBXHJEEGDGEOMKkBQMMYGgBCOG"],["q1F_yBKCoBPQCGBAEGCSAGGKAECKBEDCxBBBDIAEHLDPETHBFIGCJEDHFKCFDJJCEFJLLETBBGIENANOLcKJCGFIDBAITYDQCO"],["24DslDIFsBHABdDBBOJHBtEJvCKFE2BKQIZAeKiDK"],["i6DmkDOFNFADQGMAKGcBeHJFDNZAiBLRFrCAdGnBAJEVBNERKtBEuCYMBIC"],["0gEijDTPWIiBEiBLUBGFAFVFtCF_BArBJfEcMQQWCDEIIUGCEaDBEIEaD"],["ivF6-CeHGCCKUIuBLqBAiCLVFBBGDjBHhBCNGDICEKEBCZAHBEJQJWHbFRIlCFVENJJBnBGrBSAEMADICISAHGGEuBI"],["4xFs8CuBNEDAHpCClBGbDJEcCcO"],["w3Fm-CiCCCABFGA8BBSDKCHJdD9BA1CQMOMB"],["y4G1rBIEADaHCFGCMVHAQTBHCDDJYFEHGABUDGCCKJCAOjBuBNMESOWFLhBJFDVDGLCPFFNGDJThBpBbPFIJABIDFDCUcEMDIFGpBSHIEGWIIGKgBBEGENcGDIEFGLALSIDAONGFIKRBBbiBKKJHLMEITWOADD"],["s4GzzBiBQFNIIACMAJJMGLNEDBDIDrBxBXJGDHDGAEFKDAFVAEEDAHDJGGHlBNCBFXFAEFPZEFRFZVXDbCHKNALIHDTAFEIIFDDACGHBAGUEHCIEJACGEABEMDBEGAHEAEIADEKGCDCIMGEBBGUQcKGBBEcKAEQMGBDEGCGBDEGCEDIOEFAGKKBCKYSKMgBQKMAHBBDMH"],["w9E0LIAENFNIDELANEFCRFJJFAVPqBDDLVIJCRLPDGAMHHDCdODGDYIQJKLGFADPHGDGDFFABGHCFDLbHABKOeaIGMQKKDGFBPQIIOOBEQMDCIMBDaCESJ"],["s3EoXeLICEGEBCFDJBPKREDNjBVJALHNMVBFERGFMBECDGSGMDGRIEAIUHAFJBKPAFOBDTFGCILANGFQVSFAITBHHMXSLDFHJCJIHDBQMMCGNKAPFBHOFCN4BEEMLICBWGeDKKiB"],["6mFdUAGDBFINFNEXKVCKGCCPGCCLIFQAeeGOaGECBIgBOsChBgBDGFSB2BVmBJWNSBYTKBQPAX0BTOBQNAPbAFFADMTkBZERIFGNYACReHJDEHUHUBHDHCIHNFLCJKvCMdaBGAIDBHGXiBrBMDGNEBFLBTMMTDAADNCEHrBDFGFBGAEFOAMDMLBHbPPIrBBtBoBEMFHVDFILJDEKWNOSCNCJIKEPUFQCEFCGEJABKdUDBXIXKfETOAGIAZADGHAJMAKGIFBBJFBDTFFLBHQEGDKPMNGBCMESDUOUFCGGCAEDAEIlBFZALKBSZGLAIKCMWGOKOEOB"],["k8EoBRVbFTCJGvCBPEJDFHHRCNILKHGLUASUODOIYABEMEKDCFBHTEZZPFHHLAKJGDOTIFELFPSTGCANFCABXFBLREDGEUbYGOAQFEJAPLIdDPCTDVGRTAJDFEHMKgBASFWRBFGBcMIIWAWIUIIGFFeGGBIEIOUGDIAKQKEMDIHiBBQFIEkBDYQCGQMGBEF"],["mmEvHMHcDOTmCFQWEBKJOCWJSBEJGDAJIDUBWCOFAXIN1BSVDvBEjBGVKdIVCLFJAjBOhBEBEEIVIbAAEEEGFGOGACOKIeHII"],["04DyGqBBcfCL6BjBenBQJBMIASVMDIFQXWHEFBDRHOESIMHGJNJBFEDBFKLaFGdOLHNAFMKSBIDSXHTEJDLChBFfPKJHRKCPDAdgBzBmBPWVSbkBBMVsBZkBTMV8BjBUDUHGRYTInBqBJSEMSAQL"],["gyEsIADECKMEACJMHEFBNFDUGEHFBADQEKHaJAFDDTFPCBFONADVFLEHHMRFBFEBDPBMFAJKFBDGBBBGDKRJJwBpBRHNCLKCHHFJTBVERZRFGALRREAAJDDKBAHADJBCNHDEFLRxBVFeDDDCAIDDFCPFDKJBLMDJHDFDLERJBUDGBDLCPDDCCEHDFELBFmBFGEMBMLMPECIHIEULMBSCOIEFAEKMQKGILUBiBLFGIYBKKACO8BQkBsBEOQCYOCDQCGKHIIIGBGCiB4BEB"],["20Cq_C_HlBZJPBIDdFDFPEHHTAEHBBhBJEFDDREKHXLLBhCGbDFGCCRIkBIcSgBEVGkBMTCHEECaBOGBEeAIGMEBCwCOKEaBECAGGCmCB8BG0BIMGgBGgBEiBBSJBFdJ"],["klC07CuBDJFDJPBDFHBBFGHHJuBhBwBNTFdGFBMDDBLENBDEpBCBBjBELCICAGWEdIDCEG5BDNEFKAGGEaEOGMONEOGSADCBGCE-BI"],["uyFgkCKJDNQhBANFJCPENGFOtBWrBONAHFKTOLCZDVtBALQRKTMBEPFLFUbGHFLZFEDSIcDSKQBMLSMgBDsBGWTWECFGAMIWBWOGGDKCCEDCICAKNQ"],["4zFk3BkBFaQHTAHINUENJXFbBJBTTHP3BYRBPHLIHAFJgBTFBNCPNHACSJQAMYOCEDKeDIECOKOEUCIHSCKMEmBhB"],["ywF2zBICAbOPITANDNJFDHDNNBFHCpBJNHTMVPHDLTLAQKMJCHJEFBDJGHADFBLJJDECKEEHCDAPTZCTBKGNEAFDCCMDAJNOJBFTDRZHBJCLSBMIEEINCLETBLFfJTBNCFRPIhBBAKEGOA-BsBsBAuBKEBADEBOBIEIGDKCEaaASGISECBRNEJKDKIgBKOKKQSKGQMQKcBKJCGEEKBQOIEQKBENIEGBGEAIRBAEGK"],["-nF6qBMAERNHHNJILCNFLTHDFACGHABGCKDCAENDYOGMGEKFQCAKOE"],["-jFgqBWAFNOABFGHNRLpBLCCHPJEKDOEEFADFAFEFBBPEBEGCAGDGAOIEKQFCCILODDCJGAAFLCLHEIFGAGMHPQAEKBAGUIGIIEKD"],["o3EocFZDAFQLIHWCWkB4BWKONFFCJR3B"],["0qEgZENHDFJHVPLVJfOBeaSDACGkBGSBCG"],["gkDoMKASRWhBEBCLShBAPHRlBRRAFGJcF2BCECJGiBGMAQODPG"],["-9BxPQXInBEbIPBTHLHGDOJBInBDLFFFLCZFR5BjFN3BNlBRNXDZLPALIRELKPcAWCIFSHMDQCSIYMGY0BCSHOAOHSBkBQcEUQCMIGDKCEISCKFBIGISMEJCAAMKQECCLKOIAFEBIKQDGCGECIDWSEQDQGAKO"],["5mG3jDxBB9BGpCKXIGKkBMiBBsDZaL"],["93CzjD1BGDEGIIEkBK6DWeBjDfRJCBDD"],["v4BviD8BAGDYbDLbDKDBDhHRVFvFBHEAImBSOBYEGDsCaECDENCKIAGKEFCIIsBW6CK6CJgBJBJ1BFFD"],["1qCtkDDPdHxCELEHGjBBHDjDSOEQHuFCSEPCDIQABEeGeBGDDHUD"],["x3Cv2CBDQAMLMTgBfCjBLNXLBD1BDnCARCLIOEsCBaENErBDJGiBCKGnBEVGXJhBCKFRFfEXICIKEcDBIICeHECHGGEyBBfGBCOEoBDUGgBCWHBKnBELGGEcIeBdKdBZGFGGUPIEIIC6BGMF"],["t2C5hCOCKDMPHCBHOBGJcTqBTqBFJHpBFjCKjBDPCHGNDJCHB3BIBCGEIBKEKBMEEAAFQBVSAIIEBCGEGNJAQNUCQFCDKElBOFICIeIBGfBJICGKEJISBSM"],["pmD-cYAEDUCMFWBBBWRYBqBVGADEEBOHHBEDGEKHABuBJEDBDCBFBCDgBBQJODAFlBJBEFDhBE9BFGKSMFKhBEPMDOFIXAjBKJKVBFIDFVEJIQEAEFCjBCZTTBFHRFAGNDBCWGAOMKgBMuBK"],["kaqkDaAeHGGAIWCMAHJ0BG6BFoBBMDCFvBLNHjBBfFpBCHEGCvCAlBGFCeCMEpCAZEBEYElBEkBCWDICNIWDCEHEeB"],["gV8jDQCaFEDJFBFeIQFAFDBQDaAGDKESBGBJBkBJjCFVHFFAFVBDNDHZDRNEDJFCFNBtBMRIdGNKQEMBIG2CEFEvDFLEDIKCODBC6BIBCGCwBAGCPALEOG3BHFGGGPDLCJACDBDIDVFlBA3BSAEECTEqBAPEDEIEDCPAADDBLAROCGDESBWEYDDEEA4BCIBDDxBFgBACBWFECAIWIKBkBXYFRUBIKIAEGC"],["iMkzBGPFJCJFhBTEDLLAJKAMGOFCCQJOAKOBcQOJBB"],["8Lw1BCZNdPIEEHCCIFAEGDCEGFCKKUECMEA"],["wT4vBTdIPHHAFXEJKREjBQJCHIEKIGGFQGUH0BGQGGB"],["9hCu3CcFGHHD7BJXGWCFElBCFEEKUAVIGEOCqBD"],["_-Eq_BkCNadiBNUXEEEJJFzBOLGMKCGFHVBNGIELCAGXAAIQCPCNKHBFKDDDEPAAGDCCEQBCILAABLBLICEQC"],["95C0YICIGYAeJKAINUBNBADkBHMJCDNNJILCTAdJFGPDPXHEBKNKhBDXEJBFFVOCIgCFSGRSEQbIAGUG"],["h-BJWEcFFXLNAFHDDEDHJEDHHDJERDJWAEGCDADIGaQG"],["7DkpCDHfNBDIBLHeE2BAKJfjBbHQCKDABbHRCeFSESFUNQhBYHWPDDMPNGPBOAWNEHLJKDKGUAYHELFNNFADBBRBGBAFTDoBDAFNFDDdHnBAXGCDFBVAEDDBlBEPBLPTGVDNJTABEeQMKEIICEGqBAcWhBNJANINBGELETDJEDGCCoBOIKDCAMXDSOUGQCKDBGECGFGALIEKDAAGGCCILARQGIQITAPFLCJDLEDFFCDKEAOUHICGKEJECERJCGEGLHAJFNHBCKIIDAAKQcRHTGQGDCKICGJGACIEFEGKSAJGCIOADGEGWBwBGIA"],["_I6kCKGgBASPHFMAGFBBFEAFEBBDdJIPEZFPJHGDXDBEBDVBTJNCCDBDjBHVAKITDUKdBBCUKTCCCYCFGKGiBGHCHDbDSKCEBCGGOEVCFEJAECLAAGQCHCAEMCAELBCKJCCE8BABEOGEGXCOIAEGGYEEFDFGEAIICACOD"],["3gHm2CmBHMFHCCDYFCFKERIcJBDMAuCTEJDDOEGDDJILFHQBEHMECHMITIKGDGRGiBCWDFDBDEACAAGcBTEwBD0BXDDMCEDBBSACDfHAHDBdIOJDBdAVGNCSHBBGABFNBOBEFhBHKBDFQDEDNBFGAHJBJCCIPHfOjBEPIAKJIlBGRDjBAFECGRMIBIQLHJCBGHDAFNCDLSJAFNLLFA-E"],["tT6yCmBGLDHHQDADFFSCEDFDMCWFHFGBDDIDBBJBAFHDNABHHFvBHfNtBFFFbF9BGLGGCBCJBRI9BDBKIDMCeOXDGEDACEOGTDHCCGHCjBARBJEyBIkBAEGJBRCaKpBGnBHXGKCQBJKUDMCVEOCLEOAFEGEQDCDOCCHGCAGTGSCXEIESAqBPDDIBBFLBMDDFIBEFOQODEGAOGCcNEOWEcRCEHMQAOHQKMBOCCEDGMCKA"],["v0C7lCJCMA"],["_6CwXADLEHG"],["6U41BWDNA"],["gVi2BPCIEKBCB"],["vCy9BJBCC"],["9wCoWCBEADBHAAC"],["1gDofHCICEB"],["96GtaCABDHG"],["kuB4fNIAE"],["w6EjCDACI"],["k_Fk_CDAJCEAGCCAAB"],["m0C-2CDDFABAACGE"],["mzCm4CFCCG"],["gtGx9CJCAESE"],["iuGt0CHCCKIF"],["yxG1hDJDrBBHCDGiBDaI"],["ksGvzCBBFGGA"],["8wGzgD4CFCBhBHrBCZHVOSEJGECUA"],["q0G_7CNCMKGH"],["2rGt-CFFFABCECGCCA"],["o-DjyCRALEMIOAOF"],["orD1zCFBNIUCGF"],["4zDnyCNCKCGB"],["msDtzCLAKCGA"],["2qDnzCLAEE"],["s3C75CDFBABECCCA"],["y1Cr6CIIIB"],["44DxyCOACDXBDAEE"],["g6Cp4CNGAGGEKJ"],["orGjzCDAHEAG"],["q9D3yCDBBCCCGCAD"],["y7DhzCDBDCBCGCIB"],["ohE5xCHADGNGQBCF"],["x1Fz-CjBGQC"],["n3FlgDTBAGiBBEB"],["vlFh9CFBLCACMAIA"],["35FngDZABEgBB"],["16F7_CqBBbDRE"],["5jFn9CfCLEQGeD"],["t1Ez8CNAKEFIYAMD"],["9xE18CZCoBKKB"],["l_En9CVCHEBEkBDEB"],["v6F1gDKBTCHCGCEBGA"],["vqG7nDpBAdK4BBeF"],["57F__CXCaCEB"],["r3Fp_CHATISB"],["v3F5_CDBREIC"],["xoG_lDrEIeEeA8BF"],["_7F1gDrBEUC"],["tgGhkDnCIEE"],["x6FrgDvBANEmBG"],["vlGzmDnBMuBJ"],["rHl4CJBLGUC"],["6Dn4CNADCYGAD"],["1D_4CNADG"],["0B53CFFHMSCCD"],["lDt4CSBJJRDAGHGVGUC"],["2Fj4CNCFGSCED"],["28BvzCJCOCED"],["oUv3CBBXIOEaCJF"],["yhB_3CTBNEBEOIMB"],["7mB3jDKCCEwBJfD3BGHEME"],["tqBjjDpDACEoBE"],["jEl4CHCOIOAEDBD"],["3Zr8CBJKFDHLCHIFEjBCkBGMKGCIB"],["jU76CHAHGGE"],["zPl6CHBJGGC"],["toBxjDJAIESA"],["j5BzrCSFEDfGAC"],["xjCzsCFCIE"],["h0CpjDzBAKGYEaBHD"],["9kCvsCFBFGCCeB"],["tlC9uCQBCDBBbCVFDESI"],["5lCtvCPEUCCD"],["xnC1wCHAAEWE"],["voCrtCKAEDTBBDJADDRCMI"],["vtCj3CDBRWMASHADDB"],["jvChxCJBOG"],["9tCvwCRDMKDGGEQFFH"],["nuC5uCBAEGKCBBBB"],["nqChuCFABCBCGAEACB"],["hmC7uCLBJEECSA"],["3rCluCeBNFHGZDDEOE"],["1nC3vCKBJBNE"],["tsCv3CJCKC"],["9rCr4CFABGUABD"],["1rC54CPEOC"],["zrC1uCJAEC"],["5rC5vCLAGAEIGB"],["9xDv7CNAGMLMOCUBAFDBEBAF"],["1iEt7CNBJIIC"],["52D56CFAACaGEF"],["z5C53COBNFDG"],["_5Cj3CfCFEEEQA"],["r8C17CJCMIMA"],["pyCpyCNACEIIMAADFB"],["nzC3yCJDCIIA"],["l0C10CNABEUCEB"],["l0CzzCJAGGID"],["9gHjVBEGECB"],["ziDqKBICA"],["whG09BHAAEIKEA"],["kqC0lDbCUC"],["gkCykDXCEAAEUB"],["usCmlDrBC4BEEB"],["8iCokDzBCoBGaF"],["snCukDAFDFzBCMEAG"],["0qC-jDfCaEOD"],["r-C98BDABGGKBMGCKRAF"],["j-Cr_BBBDAAKOA"],["_8CjiCeFULPCLIPARO"],["j3CzkCgBDSCCDHDMDBDKFCFLGTCBILEDABFGFHAJGACNEEK"],["79Ch9BLLJBGEFGCEUE"],["jrCngCFABCACGCEBBB"],["mjC6PSAMDNHRBPKKG"],["2iCqeFCIE"],["spCoZBAAGKOCH"],["omC0hBJHVDDCSGAGSCEB"],["ujCoeLBIE"],["w0B8UCAAEEDAFJGDGCG"],["myB0TKDPABEEADCAGGB"],["o_BsgBBDDGAMGA"],["s8BglBDADIEIGH"],["yyG_UJABGCC"],["syGtUNEIG"],["yyG9VGFDDNEEG"],["8xGpTBBFABCIGGA"],["uwGxSCLMIETDFNBDKDaCE"],["oyG9TBUER"],["oyGlTBBAEBMCACH"],["oxGjUSNPDDQHCEI"],["8nG1KlBUTUMBOLOFQLBB"],["8kGlJBDNGZaYJGJ"],["u3E0HKDDFPEGG"],["79C57BFECAKC"],["h8C_3BFGAEGB"],["l9C38BNBNYQIAFKN"],["1wCrkCeBhBFDC"],["rtC9wBADHG"],["nsC3gCEABFHE"],["j7C7iCADQAMHHHRFDEIILABFDADCAIVIGEKCODCE"],["7zC9kCJFFEJBLCJIqBA"],["34CxkCIDQCEHHDDENCJGHBAE"],["j0C3lCJEIE"],["l9CjgCBDRAJJGOWE"],["59C7-BPBEOSDCD"],["v9CxgCAFKFFNFCJS"],["n8C52BFBHC"],["n5CxjCQBAFFDLETBJKIG"],["18C9gCHCFG"],["l8Cv3BJDADGJEPNDAGTWECAGQCAIECMD"],["78Cj5BFBJAAEIIAGIGCR"],["97C64BPASK"],["j8Cg5BDBBAGEGC"],["rtCk7BGBJAEIUI"],["n1Cu3BDDDCEG"],["quE7IbDPGEGsBCGF"],["1kGqCGDBANGGBEEDEGD"],["3tFjMGBHDDE"],["z6FjWEBADFEJABIKC"],["hvFjLFBBGIA"],["t3G5QGJADNAJM"],["p2GxRRCFGSB"],["n0G7XDBBECCCCCD"],["ooFoJBBBIGG"],["-0FyQDIKGCB"],["k_G1XVFQG"],["wxG5RFBBEEC"],["sxGrRDEEECD"],["8zGtYBDDCFECGEA"],["2zG1XNEAIGA"],["gyG5aGABFFBFKIC"],["oxGtaNGAEGEFEKB"],["2vGtNJDDCIGGB"],["4oG3OFARM"],["-oGrKKLBHIFIZXaDOCCDI"],["kqG_MQBKNRCNIBIHAAG"],["-pGhMADFCBO"],["gnGrLFCECEB"],["moGnLKFLC"],["mlGpKGJDDHGBIJDDEMMEBCH"],["0lG7KFBBIIA"],["4kG7KHGIG"],["8jG7JHICGKF"],["ukGjKDADECGID"],["6iG7IDABAAECCED"],["8lGwIDABGGA"],["u7GrtBHECE"],["s5GhzBDBAEGE"],["uwGh5BADHC"],["n8G12BHDAEDBGJFBFCEILCME"],["4vGt_BCDNCGECGGA"],["myGx6BDDIBABdHMOAIGA"],["srF3TFECE"],["4lFjODKEE"],["82F5WAJHK"],["6xFrNBBBAAECC"],["suF1UNHGMMCED"],["8qFnRIAFJIFBDVEECBMKG"],["qqFnRFAEG"],["4qFnODAMQ"],["ijFzOGDVAAEGCBGGG"],["ojFnOQCKGMJDFTNROFQ"],["qwE_ZBBDAACCCEEAB"],["wtExgBJKAK"],["m4Fn2BBDHCIG"],["-zFjyBDIGMEBCL"],["u5FryBEFBBPE"],["g5F1xBMJAFHDNQ"],["gsF1sBOAGDRBHFJCRBHGEGcGKA"],["-_FpiBDJBCAGCECA"],["6_FjiBDGEE"],["s_FlgBDICOIIDIECEL"],["-8FrdEBAJHK"],["syE8JBDDECEACEA"],["81EkNDBBEEEEBCB"],["k2EmPGCCHLADM"],["i2E0ODADKIB"],["q5EiNDBAIGG"],["m6E6LCUMUOgBBhBLJ"],["47EoMTHFAFIOOIAKD"],["g8EuLFAAE"],["06EyLADDBDE"],["q2EyGRHOM"],["04EiIFBDKIEKD"],["y9EmMBECIEJ"],["k9EsMHIAIGG"],["s4E-QIDDJFG"],["04EuPDJDKEKGC"],["q5EsPJGIC"],["k6EiQCFPQ"],["46EyPADBCFGAEEB"],["06EsPONAHXSLJEa"],["u7EiRFDFEGSIJ"],["y4E4SDNDQ"],["i5FpHJIAGKD"],["g4F5GHGGECB"],["w2F9FDEEE"],["63FtCQBJHZAEK"],["qhG5GDOEEEH"],["m7F9BHECE"],["i8FpDLAHIMCIB"],["88FvMICBJLEFQ"],["-7F7LJGEGEB"],["m8F1LKBEJRCCCBI"],["88F9KDKEE"],["6-FlLMDAFJCHG"],["8gGlOHDDE"],["-_FrOIDNCHK"],["wzFzKBAHEBCKBCAAB"],["opFZUDUNJDJAFQDD"],["qpF_B6BHZDdK"],["2oFrBDAAEGB"],["0tFvKNEKG"],["-iFjCCJFDNCFG"],["4jFzBHCFMQC"],["0jFfBBRBEC"],["wjFAUFCFDBLAJKBBKJFBBGFBBEJCEG"],["ygFyCFADKGGKGEFDJ"],["i_ETFACIGA"],["k_EfDABCCGCACF"],["u_ELGFDFMHFDFGFBAGFGCGEB"],["mgFhCXDFGKK"],["uoFjHBXJBLMGCCGFGGAIK"],["moFhIJPDBDCAQEADK"],["mmFrHDDEMIQBL"],["gmFpHDBBM"],["sgFxELDBCMIEA"],["g6E1FAJFCDPKHJBFJFABGGMEYII"],["q5ExGDFJEEKBMOGCNFH"],["y4E5GJIEIGD"],["i6EjFFFFIKC"],["y9EhDHOCG"],["w9EnCOAPDTBBE"],["m8EjCKAEHjBDBGCI"],["g6EtBCJIGEDBDFBDCDFAMJLDGEK"],["q4EPCDJB"],["w-EiFDAEIDECIGJ"],["i9EqEFABM"],["22E7HBFBKCQ"],["yjFrKGIIB"],["mkF_JJACMUYEDDBBP"],["qiF9JFDDGAEIA"],["4_EjKIBEADDHC"],["w-ExJADHBFFPCJDIOIBQG"],["25EzNDAAGUMCH"],["s4EnNHCME"],["47ElKSBEFbDDCCG"],["s7EtKFHHEMK"],["86EpKDBJJLAKKDAQE"],["k6EtKJBGGGA"],["q1E9KBACMEB"],["owE1IHACEKB"],["szEiFFBDEAGKB"],["izEkEABDEACACEACB"],["sxE5EHHDOEOGE"],["kpEvBJDCMKB"],["snE0EHAGEJIKIGH"],["mkEyDBIGB"],["k_D0CCFBFHBDKKG"],["igEoBFEBMIF"],["kgE6BADPGDE"],["6gEeVEAKUJ"],["-gEiBRICEKD"],["khEWFAAECCCACD"],["qhEaDGCCEF"],["giEwBGBDFDC"],["4iEwBCFBHFIHBEI"],["gjEHIDDAREEI"],["yiENGDJHDI"],["2hENLAEE"],["onE3DFJHGJDBMEOIAOFEF"],["85D6BSTFPDCDKHELUGBEG"],["-_D7GJIKB"],["y9D_DAFDEFKAIKH"],["o9DtDHBAK"],["68D9CJEBIGA"],["-7DnCLIJQEKKAMbAD"],["i7DVFAGMFKKJ"],["y4D-CZMDIICUP"],["orEgDDCCM"],["uyE-IBBBGIEAF"],["goB45BRCBE"],["0cypCNFFGNEQAIGKDEF"],["mdmpCDAHCCCCCIBAB"],["4sBwxCCDBDJG"],["0hBqiDTGYD"],["qkB0iDYANB3BAYE"],["y-BikDTEcCCB"],["ogC-jDzBCiBE"],["2oBkkDpBA2CE"],["ooC-lDeFbBGDVDZErBBJEcAmBK"],["skCslDmCDyBH3BFhCEXEMC"],["u_BqlDPCWCCB"],["opCqlDOHLDbCdIiBE"],["yvCgmD9BEgCAEB"],["8oCkmDPAKGyBABD"],["uXskDJBNCCCEAIA"],["iOoiDABYDKHnBIRMDGQB"],["gYg9CDBLGQACB"],["uiCi5CCDFDCBDBJKTGWC"],["q9Ci7CVGMGWDHA"],["s-C67CDCGCUA"],["-_C67CDAPCFACCEA"],["ihDs6CfAWKOEYF"],["sjD86CXCJEUKQH"],["uoDy8CdCOC"],["-pDi9CBBJCBAGCGAGA"],["qsD49CSBFDVAFCEC"],["2mDo-CCBHDTEIEKBBEEAGA"],["24Ds_CCDJABDnBEEE"],["g6D4_CBADADCBCEA"],["s4DqgDpBB0BIAB"],["8vDwgDNCSCCB"],["q_CyjD2BFlBATEDC"],["ikDilDpBAIEYCaB"],["uyDulDNDzBE"],["0mE2hDHDrBE"],["6kE4hDHCaC"],["omEygDFCECOD"],["0sE4_CGDDBXI"],["q2Es7CRBFCMC"],["27Eq8CHEMB"],["-pFo-CTAKSSJFDAB"],["u6F6_CdACCKCcCFBBB"],["oqFs8CfOaFID"],["usFs5CJDZGeC"],["8oGw4CHABE"],["wzGg3ChBCVIWGoBDCD"],["ysGopCHDAEMIAIgBICL"],["qwGykCAFjBYWABF"],["wjGq_BJEME"],["8iG8-BTJFCBGUGIMICAH"],["yiGw_BHEIA"],["g-F06BHDDCYM"],["k7Fi5BJBIKaOKA"],["45F04BbLJARRLFOSaQAGGFKCSKEH"],["o8F4pCFCKC"],["usF8kCKBTPJIHBOQ"],["wrF8kCFFNA"],["s3F22BDAACMA"],["42F03BOBBDXJLJBHDEAEaa"],["s7E0eBFDABEIG"],["86EseHACEIB"],["qgFqhBPHCDDDADFBEOIGBEIBGKED"],["ohF0iBDCAG"],["6hFojBDBHEWKAB"],["ojF6lBDABABGECGBAB"],["2jFgmBDCIQ"],["6gFgpBIBCDHB"],["0iFqoBFACKGCCH"],["2mFotBBBBCBCACECED"],["-sFovBDCCEBGKIBHGB"],["0wFs4BFEEC"],["2oF8qBFDFEOK"],["shFipBDEEIEF"],["0hF0qBDAACAGGAAB"],["4hF-qBFAEKEE"],["-gFwrBDBFCACEECCCA"],["igFwrBADHCAECC"],["-9EwpBHEIGWCBF"],["69E-qBFEKE"],["k-EmvBBFDG"],["q4EsnBNCLKKB"],["84EulBLCBGOD"],["41E6fDAAIGB"],["gqEsaEAAFHC"],["wmEwaFDBACGCACB"],["iiEgNBNFM"],["igEgPFAAG"],["-hE2BFDFEGE"],["s9D0GBBBCAGCACACB"],["68DiICDFDDG"],["i9DgMDHAG"],["g7D8JDDAOGB"],["s1DyIBDHKCIECGL"],["0zDmNFAAIGGCH"],["8zDuOFMGOECDMGgBIIANFJEPFD"],["46D2NCHFG"],["m7D2OAHDABK"],["g7D4PCFFDAO"],["g6DqUDCCI"],["k2D-TDDAGII"],["k1DsXHGKA"],["k1DuYKDBDFADG"],["-yD8aDCAGEA"],["-xD4bDDCQCFCB"],["uyDgcFECE"],["wxD0bLBIMHUEAKN"],["lLy4CFAeMOBAB"],["viG4XDBHEAOFOKKDGCGaLQT"],["vkGwaUBFDRC"],["zjGmaIAMHDDLBDIHECE"],["noGqbBBCEGE"],["nlG6aEAAFLEDDFMME"],["lnGubJBHGIGKA"],["hkG-ZDADGGA"],["2gH8gCDADABCACGCGD"],["49G8gCFAQIBF"],["k5GuhCLCQE"],["g4GoiCaFTDRI"],["93GyrCUFPCPGGE"],["10GwnCDBDABCMC"],["7oGklCGECHLBBIGC"],["7qGykCFEIC"],["lrGgkCDADABCACGBCA"],["5nG-kCPJEIKG"],["t1G4hCDAGEEB"],["pvGyjCHABEICID"],["9uG2jCDECCID"],["9xG2iCtBTQQMCAEEESA"],["nwGsjCEAGEEBLHIDtBNLAaKGGIBCCNECGQC"],["x3GqhCFAGGGB"],["94GmhCWBhBBFC"],["r6GihCXBoBICCHCMEGBHFEB"],["38G6gCGBABTFKQGB"],["_7GghCHCEC"],["t9G0gCTAQEEGEB"],["r-GygCFACEHGKAMB"],["k8CtiCJBHIYD"],["02Cp9BFGIA"],["qvB16BJCIC"],["6iB-sBFAAIIIOEFP"],["giBqsBDABGGI"],["2hB-tBKGGB"],["-fmuBDADEIG"],["0fquBDBDCGE"],["whBovBKDHBJC"],["ygB-uBCEKA"],["ofmvBBBJKKB"],["yfgvBDBFG"],["0gB4vBDBDEEEFIMA"],["ghBmxBILDACBDBNGGEHDHEMG"],["6ewwBDABI"],["kgByyBFBDEEACACB"],["6fgyBDHDEHBAG"],["-e4yBDAFEIE"],["ugBmyBHBDCECECCAEB"],["jU6NFCIE"],["tU0YDDACBCEEACCA"],["vVipBUDFDFAJE"],["tUwjBBJJFJOgBK"],["jRkkBFBCGOKBJ"],["3RmjBFDFCKEKUGCDT"],["1PqJPEOEEB"],["nTmjBBNHBFGEK"],["tfmVFABGMECD"],["jfgVHCGC"],["vVgjBDECEGD"],["rW4iBDFDCBCEAGE"],["zcqUIDADJA"],["reySFABGGA"],["pW0jBFKCEGACF"],["je4UCBHCBDDE"],["zc6UDCCG"],["_c-SBCCEEB"],["pd4SBDHCDGCK"],["03BjPAJLI"],["w4BnQFECKED"],["q2B7OHGCQEB"],["0xB_JDCMM"],["sxB1HCJBBLMES"],["ioCzZJADCEKKIGH"],["4lC1aREDICGOAIJ"],["u8B1QFBAGEC"],["u-BjVFHCGGK"],["6xBjGANDHDEAQ"],["-K2EGACDJRJCAIGC"],["qIEFBBIKGCF"],["l3B9cHAEE"],["38B_gBBEEGCBBDAD"],["z8B1iBBBAKGG"],["x4B7dHAGG"],["2NkqBJCCGKD"],["vF4jCHFHAQOCF"],["rGqlCJCAGGC"],["nHumCTBGIFCIEOF"],["1H-lCCLHBAIHDEG"],["tH4lCDEMI"],["pB0rCDECEEA"],["zB2rCGFECJVAKNGMCHGIE"],["dgsCDDBAAE"],["9DwpCFADE"],["nF0iCEBJDHEAGKA"],["5D6pCMDRAFCCGKB"],["rI6sCJIID"],["_I2tCGDFAHE"],["pI6tCAFHAEFPO"],["3H-oCFFHDEDTJFCKEHECCDCCEMABEWI"],["1H8nCAHUBLHDGJARKQI"],["_IkoCEBDDLC"],["hJsnCFCAKGB"],["tMsjCLEKA"],["gZurCKBBDFAADLABGGBBI"],["waivCIAFDFG"],["2UsmCDBBCAKYeEA"],["8S4kCPEAGCCQF"],["kRgkCADHCFDHECIIGKFBD"],["2P2kCRBGG"],["mO0kCQDADLBPEAI"],["yM0kCJABG"],["uNukCFEOM"],["oN4lCBAAIED"],["kOgkCLCEE"],["6NynCBAFAECGCCBBA"],["sKwkCEKAFKA"],["vBs5BADDEBCBEEB"],["pBs_BHDLCKE"],["kGqiCDBBABCCCGE"],["gNy1BAFLE"],["sF6xBREAEQA"],["6B0wBJAGIKA"],["9mBoxBBBBCBACECACA"],["7hBqwBHADEKCEB"],["3iBmwBBAJCDCDEOD"],["5jBkwBDADEGCCBCAAB"],["ljBiwBLBDE"],["hgBqvBSABDHBLCDG"],["mS6sBABDADCAGEBEB"],["wSo4BNEEE"],["kS63BHKCKEH"],["4ZgwBGNJCBGDBIK"],["kaovBEDHBHIEE"],["8ZowBFAGK"],["kZqxBHAJMMADDEH"],["6cotBFACIGF"],["-E2gCGDFAJC"],["3_B-2CJADMKCQBHD"],["puB-xCFABCCEGAEBBB"],["9iC64CPEOGGF"],["3kCg7CVJZGoBG"],["zgCy4CRCIE"],["55BgsCFFPGYG"],["l5Em8BGJFEHKEGEDFB"],["l7E-9BTIKA"],["p6E-8BBADI"],["p-Eg-BLEAGIA"],["v8E0-BFICEIF"],["5zEmkBFGCE"],["h2EsqBBABADEICCBAB"],["71E0qBOBJD"],["9zE4pBCDFADG"],["j4C4zBLBBAEAEECACB"],["t-CisBFBGECSCL"],["15DkiBBBAEEGGMEAHJ"],["t5D2gBJaAQ"],["3yD8kBHEECGD"],["hhDqeDDCBEECBAPHAJS"],["hhDubJGKB"],["xhD8bHEEC"],["piDmcMACDJADC"],["xgDsgBFEGGAQJMRCQAUNAHDD"],["x8CscHABG"],["p7CwaDHVAAEIEKBIG"],["38C4bMOBGECAH"],["5_C8fUNATFGEACMHIRGEE"],["x-CqdPGCC"],["x9C0cDGJECEFQ"],["j-CoeHBEENS"],["rhD2bFCCE"],["lhD8eAJLFDILGIABEEGCMGD"],["nkDkiBCDDIFKBICBCD"],["lnD-aPDJGKAFIEGMB"],["jiDuhBYBhBHJIIDGCCG"],["vkDufHHKOEC"],["1lDmYKBLA"],["1sDsZBEAEKE"],["jsCoRBDDGGK"],["hsCkSABHACGFCBIKD"],["nsC2MjBDQIAOFEWGIAFH"],["n1CmPBDDK"],["9rCgOBBACEEGAACAD"],["rqCsQDABIIF"],["5vC-NCFDDTEIEGD"],["jtCgPDAEIEA"],["jtCqVFBBEECEB"],["zsCiTDABQGD"],["1sCqUFACKMJ"],["_sCgUBBDEAMID"],["tsCuQDGEC"],["p7CicMDPC"],["91CiPJEFK"],["jpGopCFBDESG"],["n_FsnCLDBCCG"],["z-FkpCFCMC"],["tiG4lCHCGC"],["rhGymCBBAEMC"],["3gG0mCDCIC"],["_2FyrCMBTFDG"],["14F4qCDACEYSKB"],["_4FirCBAHAACGCIB"],["x4FyrCFJDEEG"],["94FisCFACC"],["hmF0kCKADHDAZYOD"],["vnFinCKHDBDRJBAMECHGBKIE"],["zmFulCNLAGDE"],["lkF8kCEHHAAEFCAIIB"],["9lF2mCHAEKMH"],["jlFkmCBFHADEHCBEMMOJ"],["_lFqmCJEGEKAAF"],["7nF6oCNCGC"],["lhF0hCHEDIKF"],["1jFkkCCGGB"],["5iFujCFDHEBDBCKI"],["piFuiCZQECSFIH"],["7_EqgCHCBGGC"],["tgFwhCDAAMIE"],["thFsiCFCCI"],["5tFg3CJAKCGB"],["nsCiLBEGECD"],["lkD1DDBCKEEID"],["5gC5BDAKOAKGIMEEDFN"],["z3B1DDDEO"],["twBrQEICD"],["l-BKCBHHRCEI"],["7-BuCFBBKGA"],["p_BFLHDECGGCIA"],["59BDPAOIGD"],["h_BGAFFCAGGGEKAN"],["1-BQDBBGKG"],["9wDdHCAEMECF"],["3vDjBHAMI"],["_lDmJJECGCA"],["pyDRFABGIC"],["hyDCSfDHJBJADGQMJKDMFAKG"],["lxDNLECE"],["jlEgbBBBABG"],["lqEofBDDI"],["ttEqkBNKDKIBCFGB"],["9vEijBHCEK"],["zrEweABLICAEA"],["nsEokBDJHEEOEC"],["hsE2eJKGUBR"],["o9E2IBBBGAGEB"],["47EsODAFGGC"],["45E1KBBBCEEGB"],["-yEtKBGGC"],["w3CkzCFAPIaAAF"],["i5Do_CDAEGIB"],["m9DwjDJACCACEAEAGB"],["6pGk2CAELEAKBCQKEBADJFCJEF"],["nsD44CmBGWAEABBCBIAGSBGZCVMYKoBHVKKEdAJIBEEGMEoBFvBMSKYEYBDGUEeEqBBKDILWHAFMHlBRaGNJKDHBBFeMMAHGKEKFMEMFAHQFJIGKwBFfGHEEEaGiBAwBFYFCFhBVeOkBACDDDjBFUALTKGKMaEGBTLUIULDKQGyBHQFCDLFRAbJOAMGKCQBUEIBAFDDtBNGBMGGBFNSSSGYEgBDcFEDjCRyBGEBLFKBUGDEMEcJIJDDdCxBJeEYFaAWFADDBtBErBFaCWDEDFF3BCsBFKHwBBLDIFBFGEEDAGSEBJLHEAUIADEBOCBHGDAKUGCBHDCDOCgBLJBEFbAiBDKGWFHJRHeGWBMGgBPJDNGHBUJJDbEGDFBWHXBIFJHTALICFJBMBANJLLGJBHEEKLLVOLMmBWVHhBDAEIEPBRGTOCDFAHAEDBFZGIHUHFDTAXMLBWDAJODDHQESHJDULGJCISFDBEDKIUFIDLFUBFFPAKBIHSADFIAIHFACRFALOJGIPBDQNTCEJBBrBSBDFCJIBHLKJCZQGNdOPBeVSBBDsBPOLMDFDEHJBtBMvBGTEROZAhBKGEPBZOQCIGRERCGGNDHIdQIIZAFHDILCJIHDKHBBnBABDrBFjBELGFGEMeKDGEE8BHOHDFGBEGRMaAuBISAHKVKDG2BYKMYIVWXSCENBFCAOLAEFJARKHAGEHCKErCNCMYCMGfKBGKCJCJFNEKGdCFQVAdONHSDIHBDbDxCIaJCDBAZIdDhBGbB_BGNBTEHIEE5BHnBKNKJMgCDcCbIxBEdIHSQKHCAGUQEMWMoBM0BG4BBCDtBRVTOLBNGHwBV"],["72C4nD8DBxCLsDISBMEUDiBAIBHBWFFD-BCQDEBBBlBJ3BH5DJJDnCH2DIkBB3EdjBLXAVGUJBBnCF8BAfHKBLDpBBtCGJAEBsBBKFFD1CD3BE0BJsBABHhFCcFiCCoCLRF7BBwBFdNxCBDRPFxCBrBKOHdBIDeCkBDcCGBCFEBQBUEMFADLH_CNLAGGDEdChBIMFADhCALKDNhBBlBGNGJHZCFGAHjBADODDCJnBECOsBKgCEfINIFEOGeCYDgBNiBDuBEmBSCEDBrBPpBBRCAIJImBKQAbCEMHJXHXAMKnBHZCCIcOoCGmCF8BKbDtCEFCGCgBBhCYfCNGHKEGICoDBwCVwBDQCjBCvCY2HWpCEQI4BM7CNVJxBHrCBcGvBBfFlBB3BEBCGEwBKuCGjDD9BPNA1BIHCECqDE-BK9CH7CBNEeEREqBGoBCjBAnCFJCeI7BDPEeI0DKqBFOEgCB9BIkCK0BDmBJMAPEIC-DP5DWeEPGyBDNIIC6CDrBELEKCgDB8BNOE5BOsDAmCLfIEEWEgBAqBHREMEuBA"],["71D25CUACDcLGLDHaHMNMCIFLBREHFUBjBPYAQDcEJDqBDLAHHNCUHKHBRMHOKKUOKKAoBRITTACNEHcPGFgBMGMSKKYIEaAJEKIVIDYwBAaF0BBPFSDCFiBBCDXHWBGDBDXHZAOLICBJeRFRTDLHtBPHCPOLCCCLELEJFOCWJOPADREHDFAlBOrBBAFeJtBZNDTAfOnBKHACD7BEODCCsBDmBRsCFAFJHfZbHPECFREHGJBIHLCGHFDZDvBINA1BOEDBDEDMAFEyBJLFYGuBPDNZFjBACDODXBHFIJZIMFFBADLAEDDAJAMHXJAFHBCFRVJDEDFRAbFHaNBPKSkBAe5BNPkCOUBmCPeNYRoCPUJFJMIuBAkBBYHIJHVKRAVFHcXAFJDQAgBRINPJOGQAKFUPNOAKIIICKFGJGMJKWULQCIHIHYCGECFEECJEECHENQsCaqBcIUAcNWZUlBQCKcUDEEIQDFEGEAGCCLEGCJMIELEIIXBSOAMKETMFSgBK-BJEBDBSEcHAEmBKgBLIBCBDHKCKBIFFDOEIDHFIBDBOHsBDMHMCEGGBCFJFDHELADnBBkBFGHDNOBHRDBFGNHOBWIWAMFGJDNbJaGQSEHFFMKCPGIiBMOMKFEHEEFKICBCIEMCLGIGEBDGSBNGDECGQBDGOSMDEDNFSCEDBHICMLHDGDKCGFVFcABHKCIJbLOEYAHJRHeGIHOBCBDDCFVDYDCBFDaJALtBEeJHFUBJDOBCFFBOFOEIHICBFIFPRiBKCDKAPPYQKBILQDSGEHSDLHdFHHtBHNJJCMFHDBFkCecENAAEkBBKNNHGFUMOAWLGJDHENTDWDBDHCOH1BdRApBFZTlBVbAjBFHGfCVBvCCxBDRHPZlBFEBdLbZ1BKuBLEBJNxBlBlBJfNTRHBNHJCMDCDdNuBSQWyBa4BQqBkBwBciCUsBEaBYLCDLCKFDLjBPbIdHOCUFKJYIBBODHNPJSBBFOZaDCBHDOFoBDBDKBWKGHMCGFCDFDQB5CZLCCFBBPGDFBEFBAHvBhBJCFKFBDCBOEIKIJBUIECJBECeOSGAEEBAFIFBGECeG7BAAGWOHBFGCFHFrBRHECEFBCDLFPBJEAJEBHFZDHHDEHBDCDJJEEEDACEHDDNHDJDBEBDBEDFBCAFFCACJDBDCAVXDHKJJBHHMDEJIJSEDIFAGCEFCJbFBGRHAKDBFEDP3BDbLPJGMDIANLNMFFXAIFPFBBFRRAIJCNMEMOIPHFFCFKVIFDHGAAFjBzBBKOWHACGFCEIHBHGAGKCHEFBIGDEDBCEEACEBBBGIGGCDAGEHCBDFABFBEBFFAEDADDACTEHJIMRPGDGBDDGJBIUJTKBGFaLDHFAXSWTKDBAEBAFFCBFLKSRDBJIXGYHGJUASrBPiBBHINNIAFDCADFCFFHKALcABJKKEDAHPLNCDGFDLEWLLJJGEDIDMCEBDDhBJDGAHNJHNAIBJPARHNRBGBJTNFAAFPFLAIDFDHGEJHJHBCDHJCAHHEDFDBNKnBezBDJGNFMAMDFAKFGENc_BDlBNXXDBGIBFEJUNGJUEIHFCQHAADDAPaMOJGALHGIaAQpBqBNGJBDFjBHDCAEEDBGNIEIHFZKOAFElBFIEAEFAFHHBCEFFPAICHQFNdCPBLHVIHBBFIDSEEBFDGDKGCJNHIHUHFHDEFDBIbOEDDLNGJFVGGADKJAPMJFCDFBlBKZBBCGGDCDHCDhBLIGJACIJBENNPXLPFKGRBHEKJLDBCDHLBADECADDDLBGHFLLECFIBBLERMRALNdFXD5BDNETSVDLAMNUERSjBehBGTUVDAKDBCUBQHONkBMaASKUACBADODKGBMDAcSCQIIAYGSWKkBGSGSCeFCEFAMCKHAPXdBPJHCDKCJJADGCNpBHKAOFFFNIACDFZCDDhBXZADMFCEBESJSIIDYBWCQGBCUDWEQHECBAKBSNLCADGAIHKAFGMDIJFHBEBBEDEPLXBRCjBFCCKFHEHBLBCDHGBCFHNUnBWZSHAJGABFGDMADIOLUBkBQWQUBGDSBaNoBlBBFEACOFKYSKOQEBMGSFBKSIIQMUDFFEDKWiBAYQSIEMWKODELJLVHENIHDAGNThBUdOEGICORiBBKEGwBQGGMBAIPBDMEIIEGFIVQAQBSLGJBHGHsCGQPcHMCaOSCTCBEgDETHTAIJBJIGKPEECDAICAONAGGEMJMDIHHHJVNAMHUIaAmBVQLMPFlBKSQBSRMFCZKScDMDCDAICCoBCUDMDDRMSQJWDYTAHEEGFEHBFGMIXEKOHUtCEBGJUHCTPLRZVLPZAJHHDFJAPHSDKCqBaCDBBIZMJQGMDQINjBIGKYICMOKDEEDEAKOQWEGDAEYFIFQDWLIAENKKQLDBGCELHHEDIICHDBDFDZKKIUGBDLKIUECESBcNOCQFqBEUB6BhBSTQPODGHWHYCUDKPQ5BAlBTzBPRFAAFTZVLJJDNBGNhBVdJDAIHGFHEDNbEABRCBCCDXGvBL1BCTTVFzBHHPfPNFNDJCTbLLLCHDFjBAHIDBCHbDBCKCFEfFAFEBfNDHTAjBRtBfEABDJJAEHCDHJECFMDFHDBCDAJFBEFBLGTDNCVHTRJTTVrBXftBhBAKGAIESKEQGACIKIAKEACIRDLMAHGDFPBEFRRLJTCJTnBdZPXNJdLdGVDZILKbBVYBIEUKKDUCTDFFAFVGVFDKPeLQNAFHHBHMPQDBVZfFNZNhCPxBFdCTGCRKDFBEBBPFBDLAJGHFJVHZBxBOACHBDLGnBSFAFGBMCCGHCSEGHCPDDNDRQRFDDeHVJPNAdDHLFANVCdLZfEPcVmBFEHBHDFNFMAGDhCnBJLDXDFNDPOAHNBQAIFVJHRHHGCGVPBUDWXhBEHBFHvBLHXARLDhBKJMEEOAEFBDEACKSIGGDEFCjBPHFBFTIGGAKGEMBOGYCdEHFJEPTJALIQGIGBCFDNDPCBKDADMQFGCAESBSIKJFFIEDKEGBGXKUJCDfJDAJKREGEEAAOhBILOQCDIGEMFILOFCKGCBGNNHKAEKAbMMKQBNIAISAJGGSDBFRFEAgBOGRAFSeBMFGCHGDOJLLAPKEGMFEENGOKAKFGFCBFTGAKVHGFBDHEBGgBWFGAGkBECCAIGEGBJTCDPFSCCMGCCJJTEAIKCQAEFEAIUGMDLIHACGCEYKCGCGXMCKGCCIDOIKGADQEGEADKECKHDQJABEGGMECGJHPILLNCFAGGHEFQMuBKGGYJcCSHOAOCGQCESECIaIKAGQUImBOUDWMSCKDIH-BCMKIEUHcMWWyCBWKWDYCeEOHMCIIIK2BDeCmBH4BnBcBMFEVMNMzBU1BgBRUPKRgBGCCSZoBLMBQRODSReV8BZeHWPWtBcAGICCIRoBEQSUeUMaDWDTDACILNZUIEAGFiBOKEKGAHKSUBaOIiBICKHGKKIDAYIGOAKIGIBGGCIKKWFABGBDBMDBGICMBYHKMKHQEQfmBJUECAGGGQJNODDHEAFDMRMTCJFDHCBbPADSXLBFHPBHcHJJCJSPCDERAFBBHPYFCGLLEFEGIFORMPEDOVOAFOLHHHILEJQIOAEJGGEAEbaPUfaCGKDFQLCADHFbGIDfMTCbOjBEhBWVYrBkBRKDBSJZICGHBDEDDIDNALJpBLbKVCPKNEJKlBGtBUdSLMfEdMRUpBSVcFQQIDGFCKMCQJEHQAOFMXWVcfWIDCGRENUKBZODGJBACGIHFHCFQKKEBHMHGJAHQNCHGDOCIVENSJCRWBKHEAINSNgBCQVGFIHEBDFBfQGJDTKZANMLYTKPEAEFEAELKDEVQNGLIDGPGDDMKHKjBKJObBJEJMJEKiBhBDNTJNc1BmBDAJMAcNaXQFODFNDJKXKDKRMBEUBKCABKDDIDCIUjBkBbQFIAOHEBQJGBKLOBIEEJGHODMDABSFIZQLCDKZERMjBCFGAUHEBKPKXaAIEIAENGJIDOAICCGHKDNSECeChBEDBAJRIBBAKEBfcFkBTWIYEUT2BIWGCDAGMIsCBYgBBJEXCAMEFCIHIKEJEBDJcJMBScJiBAIDGEGJPNDHKCFAAEUQCFHFGFBFDABDDGHHQAMIBSGIFIADDCAEECJGGCBKFCFKDAFBAGDABEMCCEPBEOFJHBPGDECEIFIEJCBKEEDCBCEFDFHDJALGNSIKAIHNRABGDHRCNEWEXAGGFAAIFFPBZMAIMKcEZALHHGAGEIDACIOGICWNTQKKBGBHfPJRJOMGAGEELHIWLBFMXIBIGGGABFOFQAIFJKTCBIIEFCJBJHBJLFNMRGMSQERBNIEKgBgBFADEBJHJCMDOCIDJENFJADNHLCHOMGDCBQJIEGdHFNFADIOQMCNCLGLKAELGAGZEAIHMECSFRMOCNAFBNIAKGILJRGTSHWFDEDDAShBBDRGNACIHIIEFBFICJFBLIRCCBDDSBIDDDMAGFBDTDlBOlBWxBQKGDGEEGBCLEIICRGlBLnBIEEDEBDHBzBGvBDCEDCbIIMVJZEKGjBEGCJECGMC_BHDCKKXFBBICFHHAMFBDNDWEGDJDAJJFfAFEHNDGDFHCCDJFPANLJCCBXBHCCGUEOKPDPGSSEIBKkBM2BDlBKcOLANHXAnBLHFCDTHAFLFRCOFAFVFIBDDJBBEJDDFNFDHgBHCBDFhBREABFdFfRZHCFJHfHFFRBBBGBRBFFKDHDDEHHbHFFBGBCdLPBLDJACGIALCVRNDJIAJHBJEBFHBCKQEeUSIUEABMCDDIFEEQBJIKM4BYIDCKOKSKQBJIEOCEOCLCAGWODAKQNJpBLLKCGOALELFDABJCJFBbUJDRKjBJDFfASGDIGENCAGGMPYFEKMIEHAVRGBAH1BHdUPEAELCWOUFCBDDOGKFOGTEMCFCJDrBEDAOGRCBCECFBADFAFIFCAIJBBGOCLEUCFECGUOSCDEKEHDAMEEMCFEGCSCODFFKEIBcIMMgBDWIGGHSTIEESCEEBEJGLFLAlBPTKDBKDDDVIzBFtBGNGEIVIQAEEMCxBEbKqBKaKeAEALECC2BMgBBJCEBDJFDODmCBUKQDBGfCAELINEBEKCOFBFGDMD2BBDITCVDRGBEMIDApCEXUxBS3BMQEISsCCeIQKIOqBYGDLDqBGkBMGBFDEADDKBCIQAbGQGQEEBFBEB2BE6BWDBEBiBHVFIDOCSIUDFDYDmBGmBDCBHFcDHDsDC-BLsCBwBF4BEoCR4CF2BPuBHYAiBHHGREACMCLCIIQAGGcCCIUHJJoBIKIUAFCCCOBcIMAUKcBOCCDDBvBNrBDPJNBbPKDHEeAFCCIgBIEGSACDKEEJSOQGwBKJFEDICSIEGYGRGGGeJWTSJeHOEHIGISGJCSEEBCNMBPJGDgBCOGGKoBAsBFgBJ0BFgCNwBBHESCgBFqBRFFZAPDAFLDMDqDD8BEmBIQJYBILKIYNEDDBTAyBbROBIYBHGCCJGDKLIAEIEBG4BGAESGIGHCTFFFnBAFBAFTARGQM2CMSBMReFADGDqBCuBNeBsBG-BDUCLGCEcNUDMGBEVGRDLIECJIiBCFEECUBOJWCJJeIPdIJSCDDQBAFnBCYRCELKaAGMHOHGIKcC0BWHCBKFEHHVACESIFCAGaEHFCAMGHEXBPIFBxBKRKBKMIOADCEERAHECOEEOGUBGGRCaOaE"],["9kD-hCzBMIGcAQL"],["_7C40CjBAJIOEkBDEH"],["rhDqvCIAGHPFXM"],["vmD2uCCDFHjBRbBHMUS"],["tjDguCMHPVFBRIAMKK"],["1iEugDZChBWSAMDOJQBED"],["r3DohDsCBSDHAHHhDCJECE"],["v7DgkDAHFDVITAFEEEMCeB"],["pwDygDPBdGFCBGOEcBSFAF"],["90D69CEHDHnBAxCQaQqBIoBJQJ"],["npEqiDSFAFFBjBAdENFZEtBAgDQ"],["9zEw-CRDXEeMoBIGAFF"],["zjEk7CjBQdIOIsBCiBFEBBJ"],["_8Du8CiBH8BGWDEFZFMAEDVDZNgBEWLBDYCEJNFIDFFGDADnBHXADIFDKLRFTCXQhBQXGTAlBQBEGIOEMBaNeCEKKDDILEICUBTGVBXIUEUFDGNEAEmBAECNC"],["jqDyxCQIQJYBMHuBLORHHqBEMFDBQDfN1BKBKXCAGJALDFJVHNLdHDCJW3BDBCKKcKDQMoBKMKCMDGHFD"],["z-Cs1CYFATDHXFjBBLAHKDICGUQ"],["tjDi8CyBAsBFkBPADIDLDrCEnBFTEHCHMXGAECCDEAESC"],["j6Dy_CBDIJDDCFLDUDCJLEJDCFIDPCCF7CAHGOCXECC8BMlEHJEaMwBDNAHECENCBCMGXCOGSBMFwBNGCPGWChBEQCfGDCCAqBGaHKADGME"],["phEkjDWBKFDFGBIEcEaFDFcASBQHJDEFYHGDFFfBZERM9BCFCACvBDfEJEEE2BACCDAPCaEhBCMEJEdHBCIIfAEK"],["7yDulDwBRCD4BDEBBHODaBPGBGGAiBBAFJDcBIFLLmBCOFOEYLrCNZJLCBGGGJBDBDLKBABFBXEGHHHLAlBQBBWPdINBMDJBzBEfGFCECkBC3BCPGUCdCJG0BGMGyBC7BEtBFFAGEFAnBDZEEGyBI5BDXILM0CDCEOCtBBnBGiBCXIAGIAcAOFmBA9BMKGKCkCCCCFCfCAEuBA"],["71DkgDUAWFCDNHWGkCEeHhBB0CFCBFBvCAuBFmBJEBBBPFeDECBEICSFSEIDME0BHCCFCEC2BEaGcBsBEkBDKDcAIDFBYBGHjBHeBKDVBPCIDFHhCFnBEFGAEPEGFHFjBDXEDDLENDnDAFCIKHCLFDEJBADNDnBCPECEJBADPAPGHKCCLIAEOKFIjBU1CDfKQExBGACUANEACkBE"],["n4DmiD0BFRFQFJFnCFAEZIcCrBIJGKCLImBCkBF"],["hqE0hDiBBFDrBDeFDHTBhCDfIBCECHGEEkBE"],["twE2gDCBhBFWHRBMHpBFBHHBdEIQDAPBFHNBIFPHFARIFJIDNFTAROFHHAbCTDJCEEBCLAUKiBCiDiB6CCGCNCWE"],["rnEi_CYBLHgBEMHAEIAFGGCqBBGJRVrBHdCZBPEZFjBDVF9BJtBCXGFCEC6BMwBAWIACrBDPCrBFFCAGQGVCFHNCGFDBVDPENFdITAXEOIuBCmBIzBDbCOEoCG1BALCECBEQE4BBnBEIIYCgBBQJsBAiBJHDUBUJuCBIEBEjBKQCAEdIDEmBOUCQBHFWNLF"],["t0D28CmBHsBCaDCDhBTLBEDZPzCASDIFTRtBABSNQBgBKCcDRKCEGC"],["55Di3CIAmBLWRUB1BPhBEfIBEPBHGHDNCDGEEWASIDIUDJIEGQCQD"],["jvE46CkBCMMWC8BLDFVHIBQGCDEAmBMAENEFECCaAyBRWhBQBUKPKVoBMCFECCmBFGESDcHQHUfUPCHHJCDkBPUFECBEqBNMAGFSAINFFLCFGFFXGNFCDBBhBEQHBJaMMAGBBHKBBHpBH3CEBCGGtBCHCBIJCfRjBBrBJzEHRODOrCEjBEXQDKoDKuCBoBCzCQ5CD_BCZKFCGE-COFACCcCLC9CFLCUIhBAPECKeKLIGEoCUsCMOAGDEL"],["11E08CWEEHWKqBAqCXKFzEhBPNbDJVFFhBDLCPHlBFjBYzBKVCEGGCBCaOCKQEJEAEoBYPGTSgEIuCL"],["l2D2-CHAFIQCIH"],["njD-gCJCQE"],["xiDmmCBAEKGCAH"],["1iDqmCJNBAEKBCLNJBIONLDCUSCIDNGEGMMH"],["_jDomCDACESG"],["hkD2qCDACEIA"],["_4Dm7CLCCGICKF"],["15Dm9CPBOGEB"],["56Dq8CbBREgCIGBDB"],["3wD42CDFHE"],["jxDw2CJGGA"],["z9Cu1CPEDGEEMBIH"],["liD-rCDBCCOC"],["3iDo1CFCAEMB"],["7_CovCZIIEUH"],["_wCmuCQBFDLADC"],["ruC6zCFAIGKA"],["p1CqrCDCIKGAID"],["93CmuCPCRKeDIF"],["hxC2sCVIBEaAGB"],["70C-2CLCOCEA"],["pjDo3CEDHBTACFfIQE"],["xhDk3CEBDBfDKG"],["7nD8yCGBDBFE"],["_iDi2CHEeMAEMCEDXP"],["ngDu2CLCBIaA"],["pxCstCIFLCBG"],["zsD03COACDJAVE"],["1oDoyCUDDBRAEEDCLBBGLIaFEB"],["nsD20CLECGDEKIMDAL"],["5pDgyCRGBKIAIFGH"],["5_Dg_CKBXFbBKGbAJCIEXCQEyBEGAEH"],["x-D4_CNAaGcA"],["_hE4_CMAaFPDjBAJKWCEA"],["3gE2hDJAOEEB"],["j_DkhDbCBEyBAID"],["lwD0_CPAPKYEKDDD"],["j4Ds-CdFFEaIQD"],["j3Dk9CVEOC"],["puEmhDdARIcGeJ"],["r3E2-CDCMG"],["9tE-_CzBCmBEQB"],["jiE69CfESKQAKBGH"],["plCugCFFRBCFIAAFlBpBBPYUCFICSAZPMCJHcCCFEGDPGGcMCHGCOCOFCFXNMADDKBDDLFqBKDJRHCDLDIAHHIFOOSELNAJCBGEGIGHPhBVBAUPLFCMWFMHELRBAEGPFRTTBFECCQGMMQIVADFFBVCMEAIjBJ_BIXFLCDMoBWfCMIBDIBMUQDDEEGHAAGIGIBFIUgBKEDEKGAGOOaIODCG"],["lkCg-BJDBE"],["zjCm-BEDLBAE"],["pmCy6BFBCMCB"],["n9Dg2CHDHCAKKAGD"],["_8Do2CFBDEEE"],["r9Dk4CLCDEQB"],["r3D-2CEBDFJAEEDEFHDCEI"],["t-D42CDACEFCMB"],["p_D41CREMGGBGD"],["1iEw1CTGSAGD"],["7mEo0CBDHGAIGB"],["jnE4zCMAFF"],["nsCimCHAEEGB"],["ltC-nCEFNG"],["t2C6pCHDCIEA"],["4burCIBDBCDJG"],["6a2rCFBDE"],["vwCurCBBLEDEIA"],["29EurBFEEC"],["ifoxCJAACOA"],["ulBo3CHAEEIB"],["mGssCDBBCAECACACB"],["kKmvCLCKC"],["yKyvCFCUC"],["0PsyCBCECKA"],["wPyyCBAEGGAAF"],["2Y43CODLAHG"],["qdw4CXJTBNG"],["ga03CPAKGGB"],["ggB-4CWDVDLE"],["wdm4CCDPFNEaI"],["gem4CFAHGGCGBGB"],["qRq1CKABBfHBEEC"],["mQ60CFBGIGC"],["8Vg3CUDEDFBAFRAPHLCGECIOCDE"],["iYy3CODXHHFdAMGMCCEOGEICA"],["2T21CMGEGOBAFTJlCHOIUCMGGKDCCGSKGDLHGJ"],["gTm2CIFHHbCFCIEKACEIAAE"],["iOixCTAKG"],["sGsrCADDABK"],["-OiyCHAGCEA"],["5iD--CLDNCcKGB"],["x5C2gDhBCUCWB"],["h4B0mDrCKXKmBE8BHGD"],["pXqmDPAVGAEMA"],["_V6jDRFXATGGEoBEWACD"],["3XuhDFAFQOCCL"],["nXi_CDBPSCKMB"],["vWo-CEHQBEDxBBJCCK"],["tWihDHAACKGIACBDD"],["tlBuoDmFL3HFBD0CE2DBsCEaJuDHIDDB7BJjIFLDEDKAkCEsDBWDMHgBCQKmCCIDDNRJ1BPFDEBKEuCQyBOSACFkCD2BQqCAoCDoBJjCNzBDIFJD5CHgBDVH9BD3BEbJBFGDcACBDNKAGFbFNHrBHIDfdADOAWI2BHIDFBbGVDKFuBJiBCGDBJJFrCGrBHdEJDcFGFKFYCqBHDDSJEJAHFDJBbGtBLXEWFcEIJJFIAKEIKQASPKBCHPDXCADjBDfGIKJCCFPDGDFFwCHFNFBjBAfHjBGjBOVFfKcNxBJvBIcHnBDIDuCKOEkBA0CTATJBAJlCQLILOvCNKBgCKGLVHEBWCyCTGFQAVJADEFEIWCEZGLjBDBQJPZAXILQLG1BOvBEBBCByBBGFBFlBJjCCQDBHnBJiDAEBDBlBJDBKBOI8BGsCH2BAEBDBdFADfBEFVAEDDBjBHEDRDFFfHtDPXANDTCEFPB1BQGHFBIHlBNPJBFVTLDJHVHZIILdLAEFCDHLADCJBDFNBJEIGAGUMhBEQFPNNEMFAFtCFWHBBXJPCRAABGHMCSPTFDFfEWHSCBHEHHDBDJBDFCDLHRALGUJJHpBBgBFFPGFCFTFMABDNhBNJhBEcHENHDZEMHJBHCCCNABEKKPJfICGQEIIZHZGDIMQFDhBL1BBAESGZABIREFIJEEEHIWIJATDBGEEdIAKUOXJpBiBDEEGDE0BIJACErBHFESOQAAEGCOAOJDKPCRSKPTFCGDBZVHIAMFSLImBOUEXDZJHAHGRABGGKLC4CiBpCbVBBKKKOIaCzBEHGEK0BOsCHVGKEBAfBXE3BLGMSO-BFQMACRFVBvBEOMSEoBFSCOIRBGQgBAJEVBMSSGFGIEtCAdKnBEVMQE2BB0BLgBBXICKTGeAPE_BEDEIGsBKhCDBCOGHABILGDGGCLBUPNHHBEDBDdDZEJEBGOQSKdFBEOCLEcEGGAGLGJBNCBEOECGFELBNGGIEAPQnBAWCCEBGSE7CgBMGJIrDSzCIVFREpBFVEVDVCBBQFHB5BGvBM4BK9BEJEIGjBHVKWGgCAQGSCmCDBEIEBCTGjBHjBEdFvBKSGtBBjBGZKIEDCKGgBEqDKECFCaEmDEWMUWYE_BDpBENEIIkDYgBCaFHIKE-BBOKDOeGuBAsDVpDa8FOkBHCDCPUIEIFCEI0CP2BAhBIVMBCmBAwBBkFXICDKEGMEDEvBMyEBWC_FENEOEeBgDKkCFmBK4CNIGfIqBG8FE"],["l0G6mCMBHB"],["nnClvCIHBDJABGLAfJXRFAIDDBEFdGDJDGHAPDbRZAEHNAHFQHJBLJABMHGAyBGCBHDJAEDFFDGLCJDBHNKXBBBILADDAXSTBEDRJMDCDLDZGHHEDJDKDbDEJHJGDHFeECDXHSBJHEAqBFBGKEmBCdFBDQDDJiBRGDCJSJBHHCHDQFUAABHFLBCFaCOPnBPQBOGIDCDDBjBDLDmBDYCCLDDVAAFODQCAHGFQCCDFJRENDrBGIDGJWBMFDFHDRCLFgBBfHUBWEEBLHxBCQNTFNITCCFBBbDWBIBDBpBFoBBCBDB3DV1DNjBL_BDpEGtCBDBGFkBPUF0DHBDXJzBJnHSnBDmFXDHLDhDB7CQvBQEFSJRABBGFOFgCNePOACIOC-EFGJTJtBDtCA6BFoCCcLYRuBCkBD-CKSHUDuBASHoDLgEFIBPB1CCjBD4BBCBvCDMBCBDFIDgBBuFG3CNiBRcAADPJGBuCB0EmBUC0BKmEI8CEoBDsBCIHPHBDMBuBC4BIkDqBgDM-BFyBGYKiFIMG6BE0GGcEGEjBEhHGJEAIDGNC9CFvBGxCOCMcQQIWESM8BMWA8DgB8FYwDCmBIoBBwBERIKIMEeWoBEgBDsBSBE_BBDCOEVECIiBO6BAGELKsBBkCQWUBGNBfIHIQEsBJOKSGLGECoBHYTeAIEEOJKEEkBAkBGKBEDTLAHsECYFaCMGGDGLIBsBS2BK8GUMGgBDaKoCTeByBWNECCQAKHUDwCCYGIBEH4BFOKWEIDFNIJGAiCCMOOKaJCBFDCBcDQEQMIAQFAFOHmCDsEc4BCwBKIEIMDINOEISGOCeBADRHCDgBAeXyBCUFcCsBPBGiBWGUOG4CSWK4BGiBIwBGCCFGKGgBDCBLFQHcCGLMIAMWKTCJGgBEeJWABQHCBGEG-BSmCGiCDqBPaDIFHDhBCOHDDXJOBYIkBCsBJUJyBE4CJoBG6FPwBGEDBHQPRLEHDBEJdDADMHDHNBVClBPcFqBCKDBJNNfNXXVlBPHCBeDaIAOSKuBGqBUcKGSMOoBQCMUKaEYFsBCKKIEKA6BScQCKUI2DU0BEIGoBOwBB8COkCA-CMyCHeIcF-BGYDWGSDGDUA-BMSKCGyBE0FXaHOAKDqBFuBQAIMI4CMYFaPmBHOHPLxBFDFGDqDQwCD8BIGB5BLKB-CKcKmCKiBDMCMKSCgBFIJcLkBBgBCUYiBKyBBgCGeHEHEAmBOwBLgBEkBHoBAyCLaCeHqBEEBCFSEIBCDZZCBIBmBKiBCiBNCFDFMD2BDkDEEBENGBKEoBBWDYEEQECgCboBHWASDSEqCLOJCHSFQHOVgBHEEJOBGIESCcLaBQG-DLYPwCRGIGCQRFDTAFFDLMCBHlCGOFqBHLLTFZGxBDbIQJiBHbFtBBKFdFHUNABFKPHDYThCANGJHVHBNFDbCfF0BDCFWJNLMDCHFDEHLHaDUNAHGDMBADOBEBBDRFaDeKEAGJWFiBBEDDDVAPG5BBvCLnBOFAAFSNdCNBNFGJZFODTDCBUBGBABnCLHBAB0CBFFOFXBSDALJF-BLgCREDlDHGDkCBmCI-CRIHMBUEUDNHXASD2DDiBHsJVYFAhH_hOAAiHgCA0CBSDmFB6DFuBF2FBkILnBMmBADC1KS4BElBGcGDC5BI5CB1BOjGWHEwBDyBCoEPwDCcDSF2BEkBFuDBwCIQEZE6CGiDWjCUeKlBI1CIUGyKKECtBGBElBERGQIsCEFEMCCCDCxDOpBIBG9CC_BMNEKE8BGQG1DCpBKHGKMCOICiBFmBG4BBkBDSFmCBwCN-BOXEDCCIyBJYEWHOBSCHIMCRGMEDIpBKVCxBBpBG2BKgDLSAlBMEEME0BCuBMwBC8BJNIeEeK0CEmBBQMkBG-BFmCE6CFwDI6GBqCE2BK-DDYYsBHABHDBDQDVHHNgDIECHIECDKGCSAkBFCHBFJFjBLEB0CAqDFkCKoCA4BBaJ8CEIEHCjCMSIDGtBARUpBEDECGQCkCFoCG9BKhDCRUKEeBEDJDEBoFAoCLuBEoBD4BGuCFSCIGBEUGSBIIOAYDNLGFoBCYFoBGgBLwDNkBEGEDOCCiBFJMAEGCmBFWHGHuCCEDPJEBmCI0BBqBKyEMiCMOKSUDITOBUHObcBOJIWEgBBQKBEPIKEEMKINKKMIGPCRBCSSGGLMCEDAYIEWACIBEGGSCDEeCFEAEIBCEBCaEJGAEMKcDBIWECIKDYGWMKK2BKaK6BMMA"],["y_Gy4CHGCE0BSAV"],["wWmqCWCCBHBDHzBRfAYBEDJBEJBLFDELFJCHVhBFDtBCCDHANHGLHFxBACOTWOBFIIACGTMNWDABKFABKJGAKHADaCEIBVGHIBOBFFDCHJLNBLGEFNDEBDBtBXbFRADGFDHCEGXGRIDIEIUFKGJBHGCISKxBPEQIGMBSGRCMKEGOGCJGKMEhBFJLdPCSUAPEFKUKPFFEDQoCEKHAGWEJEEGFJNBNGHFrBBLGAIOCPIAIUAWDeC7BEFECEIAIGOEIBUCECVBIIwBBGCFCWE1BBIKYGWAUJRMEGQCLGKEWABDCBWGMHeCDEEEYGFEKEJCLFGBDDjBJFAFIFAAEmBYmBOGCDAJBIKaIGDSEGGTFJEBCYWOCJGiBEQElBBBIGIQGOALESI0BElBCUMaHAEECRECGRDBAAGOGSALEcIMNBEGEFCBG2BGpBEkBKMMQCAIGEYFJIQCIIUCBPMQOGCNJJQIKBHICIWAEEIAUFFIRImBAQEKBEHMDBEEGoBSFGQGYFICMBVNHLCDOGCEqBWGCEDHHEABJQEMMKALEEEKEWBKBAFTFOBBPQUKEkBHMCIDBBeFAFbF5BCgBFEJQBGGIFKEiBDSEAGoBJDDbCDAMFYBADSEDLHDMEKG2CDsCTcNQBcJKABECAYLWFIRIBFNrBV5BJ9DObILBDCCCzBILGEEpBCYFBDQHOAAFSDLDeDYLEHHJHDQPCHEBDBAFIDYBUHIHsBHUGEGDIdEXQBGKCEGKCiBLmCLMGQCZWAKkBOgBGcQqBDQFDFMCKFAKQQBMFGTGSeBKhBQcDqBCgBDgBVADtBDZNaHOLYDuBIKSBGoBECCHECCQB-BS0BKMDDDIAMGNE6BQcAbDGBHHIHbHyBCODCGUIaEsBDoBOEBgBGMJJFAFaDGEAKYCSKDGHBTUeKiDFiBFeHBD0CPeNYHGCOIMQXARMDKPEVEFFDIGKMEDEGWFERBBEIGHCKI2BQOMSaOMMCBDEAqCAwBHJbJLRJeLEHATJHGRAhBmBPCBRLAJDHRFdXTBIJhBHLEMGPBPGjBBIHgBHyCFKEEI4BSKQcOAMNOIOUE2BGgBVDZYJuBCzBGBKEIOCNahCOXAXFfAHEEINMCEKQUQdYTKWQ2BMEEBMJKWAKHAFGFTNAFKFBDFDCDQDwBDaAcHcAECXCLIbCpBKPOgBGcHaCCCJGTBBEqBKkBA2BLEFgBJ6BAGBJHbHBJEHHHCHQUKCGBCLNPQDBISCKIXWQSAGNGVEVMxBKHIIKNGDGAEIEAE4FGkCIGDxBNADkBJdKAEuBGSINEZOVCQGUDOAfKZCQGSDIAWKCCTCCEaAmDS8EMvBACIGBGC-CCUBRHiBEEADDiBGGBuBKsBHLJEAMGAInBOwCCeDECdCGGHEEIgCU4BKkCHOFpCL6BAGDuBCUDfPJCAD0BAUK0DBiBFGBFDaAIJFDSECAFEKAMNMALNFGlBGULMCUFFFbL5DbCBDDbDjBNlBDVJTBTNVFWCgBMyBA4DWECFCnBBBCIGQCgBBEEQALDGDeFaCGEDEIBOJJHODBLLHGHOARGOKAIOEPGWE0BE8DDUDTBBDCD0BJwCBgBBIAHEYBSKLKEIuBEqBJABaEEBBDKBUIcBWFBDiBFTHQBKFhBFkBDEFAFDBNAvBMuBZICAGEBKFXDMBYTgBHICKHWGUOBEKMQMUNWFoBBiBIWAoBHiBJDESEPCOIWCQHgBCLIAINCiBKnBBBISG8BERKGCyBH6BAuDJAD5BCZFMDgDGdNDAKITEDHEDbABHIBiBEwBWuBBsBFSFCDlBDDDsBHWACBVHiBGaDULNAeFoEK-BByBDaFWLEHJREBqBHGTMHHJLDKASOBMCIYIqBEeCWF8CDiBKIAMFGNoBFMLmBCSIAEPSRCOIAKyCFeFGG2BDsBCoBJuCJuBPA9EVJlBHdEhBQVBcBGFFBnBGJDxBFuBEOEMHHDyBGCAALKFODIGKHBFIBCDCHLDIAEFCGEHSFCDFDMJBFLFDFnCMCINABFIDRB3CbbDHARLLCCFTFADnCXJTNEPQNGrBBjBFnBVBABGIUxBPBFDDPIRFCEPCPJDTLHADfVHNEHODADKKYFBFPLBDCRSDERLHHAHIQKPAFDCFRFPXELMRTJREPBbNHPIZREhBNLGADGDDHAJPX1BhBJSFsBJOV-CGiBMaiBYGGHMCCYAIIaAkBUaasCoBMMkBOeEFGSMHEIKIYQGYDAEIAnBKpBFNZADKDFFDAFGRBhCjBXDKQXDGIBGOOCKdHNKtBHXCNDPHBJXJNLdLZVFLgBDIDAFRBJCRDLENADDRFTEHFdAJIkBCKCDENARKhBBGCnBIXDGFPCBHIAHDJAJGdFlBILJHBTKjCAxBFVJRNfNNTRD1BdlBfhDvBAHYFmBADfSAEKFECCUELHUFXPcCYOAFLLICIICWYDUCQHGJOHaLCDHHNEQJALDDOJFLPLRfCZCBFHCLHVEDLVdTNTPNJTZdjBZZZLFNTNLtBXhBJRIPAAQNHDAGIHBZXRAGFDFTFTTBDCLBRNDhBXVFPHANFDAFQDWPqBhCAnBGAADNdbDDDCFNEBCNBBBCHLEEFHHFEEINLFCHHBIJGKCBCGCHADOMQDEKIHMBWLABCOKMBCFGGJKCEJQEELEJFBELGPLBGLEIGTCGEIMUGPEKUBKVIFFDIHEAEJFRCBDdHTJNLLBBFTDBGYIBEGITABGKEAIMESWDILGAEDDXCZZrBTHNHHbFJIJDJRELOHgBBGDGNDBBLOHSAGIQKBEUGkBPMAEEMFMAHNCDFDHEHAjBNJCEHHBBJJDBIFBDDIDhBbLRCDGAkBTKXOZANUHCJOHEHADFANGPARKRFaCEHiBTKPTDPJHHNCJFMCGFYGSLQFXNQGCFBNHEJDKHFAEDFHENNDBGBAHLHBEDJLAHLLHRHBDKDDDCMRRLLCIFKCBPCHPCEHLBDJJDCDBFVCDFFBGBCFPPHADJBEHDHCBHHDCBFDDJHCPHHCFFLENHHGDHLAEFDDNEEEPOAMDBFHILAPPFBGFLFCHFJICHDBNENLXBRLFGBHHHCDGABHIFFHPABECCLSCKKOJAHICFRDAGNCFKDAAJHCBFRBPHBJHDRCCJHHBJTNPnBMRYVAJFC8B5BICelBU9BBVGNCNDGFDEJDACRBCALFDBJjBRDHdLJKBJHGFDGAAFLAOHHJROQVFDVSMPAHZLPRNBGGDCCgBCIIEBGJGFBPQPEHFBCBEGKFKHJHAAWVeBDLMABVOfBCgBNEXHELFNCVNbFVNXEpBYCGbGFACGJKnBDCBKDABIDAAFKPIAQNUAMPWLILaXKXDjBEJAVONGNOdDFHKAFLAHDFIXM5BqBAOXcECHOJiCJSPSAIFECGJADKFEBIJGDIDEHFDCBUS6BFFBCBYKMCYGEJCCUDAEEDgBNYBKDLASHUEAHIDqBDECSEENBHYNMCNFNLHJKELVLNRDCCOFJJBBQDJFBCYBFHJJDCUOqBFaLWEAHGAQDPJGHMECIFIIPOEERGDACFBBFIEGDACIHHCGFIBJPUJOHwBBBLYLJJBLSBWBHLCOHADFDEFDFGPNTHCGKJFBEEODBDPJJBWAPFHJGBKAFDAELFABEDFAQDEBRFBFGBFFCBCGSJIADIFHJJHXFJJGVJPNLFCCBDDXHDACCBGJFBFGEEBbTZhBRJRRhBTDVTHRALXNGNHJZGVDLIbFIDDMJDZPbBVDFECCFAjBVBNbCHQFPCXFHHFTVLRITYJWBUEDCLCADOFITyBTcJUVuCRWFOGAHGEEFCNeHuBJqBEOBGDFBEAIIAHCFUKgBDSDEDGGEFAUMVBGKHCCGKEXAEBBDHLGBCHJPnBPTEROrBsBEGKFkBKMSAEFFJARHhBMPUQMVJDKBDJGHDAEDAJKFYREAQJOJABDMBhCFFDXITBBFhBCNDDCLBNCFDdIFGDFlBIPDJGnBERGLoBLOPCJBRFJJdJPIVCJIdOHMRIRCLMJYHECIHEBKTUDMTFTMICBCHCFRPDRCGRHCJHOBe5BAHSHBBIJeVFCIPBHDAcxBCBCEDUKYKGMJBPERFPHBGBDHMAGDEJKBWIuBDOEKGOUwBoBIQKGDbCZMVWVsBLMCGFchBOFAHRfRPRbJACIDALNFVEblBJHFDRFFjBFJJCLJJLDbCRJnBLNLBTjBPtCXbXZAXPXHtBDXVRAJFPBLGFBJWCSHMFmBDIHEGEDMGQBQDMLODOZWPcTqBZUNGRWHOCIFQCcXsBVUNENUCGDOtCuDTEBDM8BHLNxBHJRMTUDSRUFSDADLKNCNkBpBALMPEVyB1CYVJBBDIhBIHODYZEPMTABDCADERBRKzBSJMLECKJOXQ9BINMRCOIDGNoBPSXYPGPEAMNGBCEEDKRCFBFVLFHFACBYCMHQVSNaAiBQeDiBQMBiBIUBqBMcSSFFTCbDHGEIFHCJDDjBdxBJJHTPZHZpBhCtCvCtBbvBlBjCnCXjBPDBDBCAHDHFFNDHXJNNjBJFR3BCLcZJTALGAAHFRGTIJGbBDaNILDDEDHTGZBTEFFNEACrBEDBNEGCBCNJLBNVfHBCFdTlBLZLVRVdFCAFPFjBfLEEDBZMNKhBCdEBCOEHBNELJhBIADNRThCXVPHNKJEGBdN1BFLpBjBjBzBTXzClCxBZfBJLVEFHJAjBGRDbELBRLfARDVNbICEJGJADKJABJDGAKECAIXiBEGIBIKFehB0BX6BJOfcNWHYAMHIDWAcNiBDyBEGBOnB-BLcbyBPUJSDWEmBBaKOWyCOQEKQMMQGqBFQNaNmBOOCOVsBBMTiBeKXFHIDGCOPe5B-BXUMBRILSIBACJCHWKNIEHCCIFDFENcEDGAOOCcEHODIGREJKIEEBASHEQgBGuBLSECDADIICDECEHABFRIDSJECDFAAIDAHGCNZADEDDFAHGCHJDFMENHABGBFLBAGBFDATODIFUIEFBHGKCDEJBJQPMnBEKGJBDFpBBnBHHDFJbB5CnBxBOKCFCBGFHdGTBWAhBDPCBBMAhBFhCZbKjBStBqBTIBGRKRQdMAOHBFEDOHCDKGBIKLBAKGCHEAGHKJGAQDBJKPEFMAIDBDKDADFBOFDAEHCCIFACEQEHEFDDIQGhBFCGJBHGEIHBNKOGFEFBBcCEECEHGBICCEcCnBDLWGGHBNaHEDDDEQGYiBEiBOmBAmBDULOIGFBGOESJQDCADBCLSDBBJBCGqBYcGUQcHFEIoBiBEcOeiBYQkBKK4BQqBeMOWcAOJKEcScESecgCcWiBSoBYEBFEFYPMBaGMDSIEJmBBoBWSIQAOMmBO2BEOIWAMEmBAWJeISKSHMCBGKBSHkBGOIWGGBAFCEMBEPEBWMEAEHZXENQJEPPVZTAFKLQBAHKGMNBBYFUJSBWEiBHOHcDGJGTIHQHcBqBJsBZOAMEQQGQHYGQUQSIOAKGWBkBLAJIFUBOFeAORaCiBFwBNWBWHQEUMKAIIUENFSCEGQFQEKHJGFHKDEDIEBEOJ0BGYQuBqDOMDiBFGISFMQOAGFEZLbInBXjBFPGPOdKXCHXHCVFTGJQFATEHFDAEEVBDCWEKInBBCGKABELGFKGECKlBMECAKCCGDCHECQCJCFIKIHCCGFIIKfDEWWQWCIFKCECDEEAGABFqBCHGGEkBETCJGBCEI0CDIIiBSsBK2BBKEGABFIFKDUCGJIHQEKF2BLqBIgBFuBSMMCKNgB9BctBiBTENMNALKVIMGJCGEOHSGBGOSCCEDEGMAPMHAFKeABGgBKBIVDDAIEFAPFZBdNJCbFfTKIBGPJAHGLSPcGSBHNVBPENLZDFFPFRGGOBIZKLADCuBWBGFBJGbDZIBAIGREgBDKGJBLELWGJBLLAAGFFXDFLRPVFENHTTDCKFBFPEAJJDfDDLAHHBRPLUPAHILiBLDJfEZFJJTHVPCIWObBJKdGLFLEPJNCENOBGHRIFAIJAFLKHCAFIFJCDIPIAIJDBRejBHBAGJCBBCDCDEATHcHSLKDCDARTORFGLIAEFNDFGJCQrBRODADNBCBILOFBBJLOEMXUMMKAGGsBPAEIACGdKDDNCTDDIBFDARUOCAGLBTORcRKDEGADKEMASGQPGVU_BWaFfWTGPBBGdUDEOAROFULIJCNTDAHKFQMGFEHBJCFDfHAHKLDFDCBFGTuBZShBWRYLoBBAFJFADyChBURDPJGJORCHGJBLLFPYNCPVHBPJFJLNABEAGKMAEMGAITqBdKAIHIPBEGPCLSZARInBiBNEFAAGRQHAAKLejBOVEHBVRdHbTRFbININDZKfPHNCJILFBADEHtBZpBJNJIDLDlBrBGRQLbRLVEDZDLFRXNCNF9BALHTDHJLDPGHQFCAEIGHBTOCEDDVBNFdEPBIQDUEKDKKBFEPBBIKECKGEFDHJHBFEGWIIMWAGGUCOFSCGFCEIDAAGIGDCCEBKJBEILICGOIUCECAGWGaHwBE2BJkBEWFGEkBDUIKoBGGBCDDGkBKFGLGDJSPKGCDWZILOEIHECCQAJETACGLCBGrBIPBFGJEOEJGOARCAI6BMKBMJKESBEEUBFGBQJUYAELoBDWGJCCIwBQIGAUGIkCSgBAfGMCUFJGIAJIEGSOKaMAUMUGeCQFFEGKSCOAIJGGGDADCQCEYBYLTMLEDMJCAEMCAEJKFOEABKRIAoBUDKKGCGDCMFCDBJJLDHEOOiBCUSaGFHEDBHHJAPaFHHRBDNLAEDPJCJHHKBCHKFCBHFMCYHKECDJHCDWBQIMAUMSBQJKAKNaFBGXEDKWJoCQOKcIiBEaFLCILIDWCSKEKSCMGMMEIBJRNYBCUHOAiBAGMIEMMKgBGYPGHOFMCSKDWKWHCJFNEJMIGHABECEAIYEBCOEqBCCGgDJGGAKMDGGSAIGmBFCERKZAPIFGEBCEFEpBJJEZFAIFHRCEDLDDEvBNnBARHIILIFFLAAEGEDCEEdEBEHBFCDOIWBCECNQEMHEBIOSIADGeEBGMIqBQmBeeCBEECDGEObGBECEJBbCXDNEHBFCFJFACBJAAFNACFHCGFPNONTJJNhBJHFNCLJRBLHIABDLDJCCFBBGBPFJACDIDFDFLEFJABDEjBOBCDMCYNADKBIJ","s_B26BfNVDADFACDVHCHJCNHRBBDHEEFHNJPDEJJBHMDMJGVIOHhBKJCDadQLahBOHQDGHRANDJXCJHLFEBBDLAPKdKFgBDIJYNgBHwCOGAHDKBCGHoBCoBFKNGHDBIGGOBFECKTECJJMBOIaIJSAKFWCDGQAAIXSJYDCXBHDFLEBBRPcIaBIbELMLAAORcXICIEAuBBJCLMQSqBCeBRIQaDMEGJMPCNFlBK"]]};var sn=Math.PI/180;function Ne([i,t],e=1){let n=Math.cos(t*sn);return[e*n*Math.sin(i*sn),e*Math.sin(t*sn),e*n*Math.cos(i*sn)]}function Ys([i,t,e]){let n=Math.hypot(i,t,e);return[Math.atan2(i,e)/sn,Math.asin(Math.max(-1,Math.min(1,t/n)))/sn]}function Rn(i,t){let e=Math.sin((t[1]-i[1])*sn/2),n=Math.sin((t[0]-i[0])*sn/2),s=e*e+Math.cos(i[1]*sn)*Math.cos(t[1]*sn)*n*n;return 2*Math.asin(Math.min(1,Math.sqrt(s)))/sn}function tu(i,t,e){let n=Ne(i),s=Ne(t),r=Rn(i,t)*sn;if(r<1e-9)return i.slice();let a=Math.sin((1-e)*r)/Math.sin(r),l=Math.sin(e*r)/Math.sin(r);return Ys([n[0]*a+s[0]*l,n[1]*a+s[1]*l,n[2]*a+s[2]*l])}function N0(i,t=1){let e=[{p:i[0].slice(0,2),d:0}],n=0;for(let s=1;s<i.length;s++){let r=i[s-1],a=i[s],l=Rn(r,a),o=Math.max(1,Math.ceil(l/t));for(let c=1;c<=o;c++)e.push({p:tu(r,a,c/o),d:n+l*c/o});n+=l}return e}function eu(i,t=1){let e=N0(i,t),n=[],s=0;if(i.forEach((a,l)=>{l&&(s+=Rn(i[l-1],a)),a[2]!=null&&n.push({d:s,ago:a[2]})}),i[0][2]==null||i[i.length-1][2]==null)throw new Error("First and last waypoint need an age");for(let a=1;a<n.length;a++)if(n[a].ago>n[a-1].ago)throw new Error("Ages must not go back in time along a route");let r=0;return e.map(a=>{for(;r<n.length-2&&a.d>n[r+1].d+1e-9;)r++;let l=n[r],o=n[r+1],c=o.d>l.d?Math.min(1,Math.max(0,(a.d-l.d)/(o.d-l.d))):1;return{p:a.p,d:a.d,ago:l.ago+(o.ago-l.ago)*c}})}function nu(i,t){if(t>i[0].ago)return null;for(let n=1;n<i.length;n++){let s=i[n-1],r=i[n];if(t<=s.ago&&t>=r.ago){let a=s.ago===r.ago?1:(s.ago-t)/(s.ago-r.ago);return{p:tu(s.p,r.p,a),d:s.d+(r.d-s.d)*a,done:!1}}}let e=i[i.length-1];return{p:e.p.slice(),d:e.d,done:!0}}var O0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",H0=Object.fromEntries([...O0].map((i,t)=>[i,t]));function iu(i,t){let e=[],n=0,s=0,r=0,a=()=>{let l=0,o=1,c;do c=H0[i[n++]],l+=(c&31)*o,o*=32;while(c&32);return l%2?-(l+1)/2:l/2};for(;n<i.length;)s+=a(),r+=a(),e.push([s*t,r*t]);return e}var no=null;function su(){return no||(no=eo.polys.map(i=>{let t=i.map(a=>iu(a,eo.q)),e=180,n=90,s=-180,r=-90;for(let[a,l]of t[0])a<e&&(e=a),a>s&&(s=a),l<n&&(n=l),l>r&&(r=l);return{rings:t,box:[e,n,s,r]}}),no)}var tB=eo.source;var U0="#16406f",ru="#0f3159",au="#93bd7c",ou="#6c9a5c";function lu(i,t,e,n,s,r){let a=o=>(o+180)/360*t,l=o=>(90-o)/180*e;i.fillStyle=s,i.beginPath();for(let{rings:o}of n)for(let c of o){i.moveTo(a(c[0][0]),l(c[0][1]));for(let d=1;d<c.length;d++)i.lineTo(a(c[d][0]),l(c[d][1]));i.closePath()}i.fill("evenodd"),r&&(i.strokeStyle=r,i.lineWidth=Math.max(1,t/2600),i.lineJoin="round",i.stroke())}function cu(i,t,e){let n=i.createLinearGradient(0,0,0,e);n.addColorStop(0,ru),n.addColorStop(.5,U0),n.addColorStop(1,ru),i.fillStyle=n,i.fillRect(0,0,t,e)}function hu(i){let t=new vs(i);return t.colorSpace=Ue,t.anisotropy=4,t}function uu(i,t=96,e=48){let n=[],s=[],r=[];for(let l=0;l<=e;l++)for(let o=0;o<=t;o++){let c=-180+360*o/t,d=-90+180*l/e;n.push(...Ne([c,d],i)),s.push(o/t,l/e)}for(let l=0;l<e;l++)for(let o=0;o<t;o++){let c=l*(t+1)+o,d=c+1,f=c+t+1,h=f+1;r.push(c,d,h,c,h,f)}let a=new be;return a.setAttribute("position",new Ce(new Float32Array(n),3)),a.setAttribute("uv",new Ce(new Float32Array(s),2)),a.setIndex(r),a}var k0=`
attribute float aAgo; attribute float aDist; attribute float aSide; attribute float aSea;
varying float vAgo; varying float vDist; varying float vSide; varying float vSea;
void main() { vAgo = aAgo; vDist = aDist; vSide = aSide; vSea = aSea;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,z0=`
uniform float uAgo; uniform vec3 uColor; uniform vec3 uSea; uniform float uDash; uniform float uDim;
varying float vAgo; varying float vDist; varying float vSide; varying float vSea;
void main() {
  if (vAgo < uAgo) discard;
  float edge = 1.0 - smoothstep(0.55, 1.0, abs(vSide));
  float a = edge;
  vec3 col = uColor;
  if (vSea > 0.5) { col = uSea; if (fract(vDist * 0.9) > 0.55) discard; }
  else if (uDash > 0.5 && fract(vDist * 0.45) > 0.6) discard;
  gl_FragColor = vec4(col, a * uDim);
}`;function du({land:i,texWidth:t=4096}){let e=new hn,n=t,s=n/2,r=document.createElement("canvas");r.width=n,r.height=s;{let T=r.getContext("2d");cu(T,n,s),lu(T,n,s,i,au,ou)}let a=new xe(uu(1),new tn({map:hu(r)}));e.add(a);let l=new tn({transparent:!0,opacity:0,depthWrite:!1}),o=new xe(uu(1.0012),l);o.visible=!1,o.renderOrder=1,e.add(o);let c=null;function d(T){return c||(c=new Promise((w,U)=>{let F=new Image;F.onload=()=>{let N=F.naturalWidth,P=F.naturalHeight,k=document.createElement("canvas");k.width=N,k.height=P;let tt=k.getContext("2d",{willReadFrequently:!0});tt.drawImage(F,0,0);let Y=tt.getImageData(0,0,N,P),Z=Y.data,et=tt.createImageData(N,P),_t=tt.createImageData(N,P);for(let wt=0;wt<Z.length;wt+=4){if(Z[wt+3]<128)continue;let W=Z[wt]>215;Z[wt]<235&&(et.data[wt]=205,et.data[wt+1]=187,et.data[wt+2]=140,et.data[wt+3]=255),W&&(_t.data[wt]=244,_t.data[wt+1]=249,_t.data[wt+2]=255,_t.data[wt+3]=236)}let Ct=document.createElement("canvas");Ct.width=n,Ct.height=s;let kt=Ct.getContext("2d");cu(kt,n,s),kt.imageSmoothingEnabled=!0,kt.imageSmoothingQuality="high",tt.putImageData(et,0,0),kt.drawImage(k,0,0,n,s),lu(kt,n,s,i,au,ou),tt.putImageData(_t,0,0),kt.drawImage(k,0,0,n,s),l.map=hu(Ct),l.needsUpdate=!0,w(!0)},F.onerror=()=>{c=null,U(new Error("ice-age layer failed to load"))},F.src=T}),c)}function f(T){l.opacity=T,o.visible=T>.002&&!!l.map}e.add(new xe(new Is(1.045,48,24),new tn({color:6000598,transparent:!0,opacity:.16,side:Te,depthWrite:!1})));let h=new hn;{let T=[],w=[],U=(N,P,k)=>N.push(...Ne(P,1.003),...Ne(k,1.003));for(let N=-180;N<180;N+=30)for(let P=-80;P<80;P+=4)U(T,[N,P],[N,P+4]);for(let N=-60;N<=60;N+=30)for(let P=-180;P<180;P+=4)U(N===0?w:T,[P,N],[P+4,N]);let F=(N,P,k)=>{let tt=new be;return tt.setAttribute("position",new Ce(new Float32Array(N),3)),new ys(tt,new Ki({color:P,transparent:!0,opacity:k,depthWrite:!1}))};h.add(F(T,14674167,.16),F(w,16763304,.42)),h.renderOrder=2}e.add(h);let m={},_={value:1e9};function y({key:T,pts:w,color:U="#ffd36e",sea:F="#7fe3ff",dash:N=!1,width:P=.011}){let k=w.length,tt=1.0045,Y=new Float32Array(k*2*3),Z=new Float32Array(k*2),et=new Float32Array(k*2),_t=new Float32Array(k*2),Ct=new Float32Array(k*2),kt=new H,wt=new H,W=new H,O=new H;for(let Gt=0;Gt<k;Gt++){kt.fromArray(Ne(w[Gt].p)),wt.fromArray(Ne(w[Math.min(k-1,Gt+1)].p)).sub(new H().fromArray(Ne(w[Math.max(0,Gt-1)].p))),W.copy(wt).normalize(),O.crossVectors(kt,W).normalize().multiplyScalar(P);for(let Tt=0;Tt<2;Tt++){let Nt=Gt*2+Tt,Qt=Tt?1:-1;Y[Nt*3]=(kt.x+O.x*Qt)*tt,Y[Nt*3+1]=(kt.y+O.y*Qt)*tt,Y[Nt*3+2]=(kt.z+O.z*Qt)*tt,Z[Nt]=w[Gt].ago,et[Nt]=w[Gt].d,_t[Nt]=Qt,Ct[Nt]=w[Gt].sea?1:0}}let J=[];for(let Gt=0;Gt<k-1;Gt++){let Tt=Gt*2;J.push(Tt,Tt+1,Tt+3,Tt,Tt+3,Tt+2)}let it=new be;it.setAttribute("position",new Ce(Y,3)),it.setAttribute("aAgo",new Ce(Z,1)),it.setAttribute("aDist",new Ce(et,1)),it.setAttribute("aSide",new Ce(_t,1)),it.setAttribute("aSea",new Ce(Ct,1)),it.setIndex(J);let at=new Ge({vertexShader:k0,fragmentShader:z0,transparent:!0,depthWrite:!1,side:Ve,uniforms:{uAgo:_,uColor:{value:new Xt(U)},uSea:{value:new Xt(F)},uDash:{value:N?1:0},uDim:{value:1}}}),rt=new xe(it,at);rt.renderOrder=4,e.add(rt);let vt=new xe(new di(P*1.9,20),new tn({color:U,transparent:!0,opacity:.95,depthWrite:!1}));return vt.renderOrder=5,vt.visible=!1,e.add(vt),m[T]={key:T,pts:w,mesh:rt,mat:at,head:vt,on:!0},m[T]}function p(T,w,U){let F=new H().fromArray(Ne(w));T.position.copy(F).multiplyScalar(U),T.lookAt(F.clone().multiplyScalar(3))}function u(T,w){_.value=T;for(let U of Object.values(m)){let F=w?w[U.key]:null;U.head.visible=U.on&&!!F&&!F.done,U.head.visible&&p(U.head,F.p,1.006)}}function x(T,w){let U=m[T];U&&(U.on=w,U.mesh.visible=w,w||(U.head.visible=!1))}let v={};function A({key:T,at:w,color:U="#ffffff",r:F=.012}){let N=new hn,P=new xe(new di(F,24),new tn({color:U,transparent:!0,depthWrite:!1})),k=new xe(new bs(F*1.55,F*2.05,32),new tn({color:U,transparent:!0,opacity:.75,depthWrite:!1,side:Ve}));return N.add(P,k),N.renderOrder=6,P.renderOrder=6,k.renderOrder=6,p(N,w,1.0075),e.add(N),v[T]={key:T,at:w,g:N,core:P,ring:k},v[T]}function C(T,{on:w=!0,big:U=!1,dim:F=!1,k:N=1}={}){let P=v[T];P&&(P.g.visible=w,P.g.scale.setScalar((U?1.6:1)*N),P.core.material.opacity=F?.45:1,P.ring.material.opacity=F?.3:U?1:.75)}let M={};function I({key:T,at:w,r:U=.3,color:F="#ffd36e"}){let N=new Ge({transparent:!0,depthWrite:!1,blending:Ps,side:Ve,uniforms:{uColor:{value:new Xt(F)},uA:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uColor; uniform float uA; varying vec2 vUv; void main(){ float d = distance(vUv, vec2(0.5)) * 2.0; float a = smoothstep(1.0, 0.15, d); gl_FragColor = vec4(uColor, a * uA); }"}),P=new xe(new di(U,48),N);return P.renderOrder=3,p(P,w,1.02+U*U*.5),e.add(P),M[T]={key:T,mat:N,m:P},M[T]}function E(T,w){let U=M[T];U&&(U.mat.uniforms.uA.value=w,U.m.visible=w>.003)}let D=new H,L=new H;return{group:e,routes:m,dots:v,loadIceAge:d,setIceAge:f,addRoute:y,setRoute:x,setAgo:u,addDot:A,setDot:C,addArea:I,setArea:E,hasIceAge:()=>!!l.map,show(T,w){T==="graticule"&&(h.visible=w)},pos(T,w=1.01){return new H().fromArray(Ne(T,w)).applyMatrix4(e.matrixWorld)},facing(T,w,U=.12){return D.fromArray(Ne(T)).applyMatrix4(e.matrixWorld),L.copy(w.position).sub(D).normalize(),D.normalize().dot(L)>U},pick(T){let w=T.intersectObject(a,!1)[0];return w?Ys(e.worldToLocal(w.point.clone()).toArray()):null}}}function Hl(i,t=1){let e=i.pts.map(a=>[a[0],a[1],typeof a[2]=="number"?a[2]:null]),n=eu(e,t),s=[],r=0;return i.pts.forEach((a,l)=>{if(!l)return;let o=Rn(i.pts[l-1],a);a.includes("sea")&&s.push([r,r+o]),r+=o}),n.map(a=>({...a,sea:s.some(([l,o])=>a.d>l+1e-9&&a.d<=o+1e-9)}))}var V0=(i,t)=>i.older>=t.nearer&&t.older>=i.nearer;function fu(i,t){let e=Object.fromEntries(i.map(r=>[r.key,r]));if(t.length!==i.length||new Set(t).size!==i.length||t.some(r=>!e[r]))throw new Error("order must list every item once");let n=[],s=[];for(let r=0;r<t.length;r++)for(let a=r+1;a<t.length;a++){let l=e[t[r]],o=e[t[a]];V0(l,o)?s.push([l.key,o.key]):l.older<o.nearer&&n.push([o.key,l.key])}return{ok:n.length===0,wrong:n,open:s}}var Ul=i=>i.slice().sort((t,e)=>e.older+e.nearer-(t.older+t.nearer)).map(t=>t.key);function pu(i,t){let e={i:0,first:0,tried:[],done:!1};return{state:e,items:i,buckets:t,current:()=>e.done?null:i[e.i],pick(n){if(e.done)return null;if(!t.includes(n))throw new Error(`Unknown bucket: ${n}`);let s=i[e.i];if(e.tried.includes(n))return{right:!1,repeat:!0};let r=s.answer===n;return r&&e.tried.length===0&&(e.first+=1),e.tried.push(n),{right:r,firstTry:r&&e.tried.length===1}},next(){if(e.done)return!1;let n=i[e.i];return e.tried.includes(n.answer)?(e.tried=[],e.i+1>=i.length?(e.done=!0,!0):(e.i+=1,!0)):!1},reset(){e.i=0,e.first=0,e.tried=[],e.done=!1}}}var io=i=>2e3-i;function kl(i){let t=Math.round(i);return t<0?{en:`${-t} BCE`,zh:`\u897F\u5143\u524D ${-t} \u5E74`}:{en:`${t} CE`,zh:`\u897F\u5143 ${t} \u5E74`}}var ns=(i,t)=>t>=i.year?"yes":"not",qs=(i,t)=>i.filter(e=>ns(e,t)==="yes");function zl(i){return{...i,pts:i.pts.map(t=>{let e=[t[0],t[1],typeof t[2]=="number"?io(t[2]):null];return t.includes("sea")&&e.push("sea"),e})}}function mu(i,t,e=4,n=11){let s=(n*9301+t*49297)%233280,r=()=>(s=(s*9301+49297)%233280,s/233280),a=[...Array(i).keys()].filter(o=>o!==t);for(let o=a.length-1;o>0;o--){let c=Math.floor(r()*(o+1));[a[o],a[c]]=[a[c],a[o]]}let l=[t,...a.slice(0,Math.min(e,i)-1)];for(let o=l.length-1;o>0;o--){let c=Math.floor(r()*(o+1));[l[o],l[c]]=[l[c],l[o]]}return l}var _i=Math.PI/180,gu=([i,t])=>[Math.cos(t*_i)*Math.sin(i*_i),Math.sin(t*_i),Math.cos(t*_i)*Math.cos(i*_i)],K0=([i,t,e])=>[Math.atan2(i,e)/_i,Math.asin(Math.max(-1,Math.min(1,t)))/_i];function J0(i,t,e){let n=gu(i),s=gu(t),r=Math.max(-1,Math.min(1,n[0]*s[0]+n[1]*s[1]+n[2]*s[2])),a=Math.acos(r);if(a<1e-9)return i.slice();let l=Math.sin(a),o=Math.sin((1-e)*a)/l,c=Math.sin(e*a)/l;return K0([n[0]*o+s[0]*c,n[1]*o+s[1]*c,n[2]*o+s[2]*c])}function _u(i,t){let e=Object.fromEntries(t.map(n=>[n.key,n]));return i.stops.map(n=>e[n].at.slice())}function Vl(i,t){let e=i.length-1;if(e<1)return{at:i[0].slice(),leg:0};let n=Math.min(1,Math.max(0,t))*e,s=Math.min(e-1,Math.floor(n));return{at:J0(i[s],i[s+1],n-s),leg:s}}var Eu=i=>i.same?0:Math.max(0,i.legs.length-1);var is=[{key:"africa",en:"Africa",zh:"\u975E\u6D32"},{key:"wasia",en:"West Asia",zh:"\u897F\u4E9E"},{key:"europe",en:"Europe",zh:"\u6B50\u6D32"},{key:"sasia",en:"South Asia",zh:"\u5357\u4E9E"},{key:"easia",en:"East Asia",zh:"\u6771\u4E9E"},{key:"oceania",en:"Oceania",zh:"\u5927\u6D0B\u6D32"},{key:"americas",en:"The Americas",zh:"\u7F8E\u6D32"}],Jl=i=>is.findIndex(t=>t.key===i);function Cu(i){if(!Number.isInteger(i)||i===0)throw new RangeError("There is no year 0: 1 BCE is -1 and the next year is 1 CE")}function Wl(i,t=2e3){return Cu(i),i>0?t-i:t-i-1}function $s(i,t=2e3){let e=t-Math.round(i);return e>=1?e:e-1}var si=i=>String(Math.round(i)).replace(/\B(?=(\d{3})+(?!\d))/g,",");function Kl(i){let t=Math.abs(i);if(t<100)return Math.round(t);let e=10**(Math.floor(Math.log10(t))-1);return Math.round(t/e)*e}function Qs(i){return i>=1e4?`${Math.round(i/1e3)/10} \u842C`:si(i)}function ss(i){return Cu(i),i>0?{en:`${i} CE`,zh:`\u897F\u5143 ${i} \u5E74`}:{en:`${si(-i)} BCE`,zh:`\u897F\u5143\u524D ${si(-i)} \u5E74`}}function so(i){let t=Kl(i);if(t<=0)return{en:"the year 2000",zh:"\u897F\u5143 2000 \u5E74"};let e=Qs(t);return{en:`about ${si(t)} years ago`,zh:`\u5927\u7D04 ${e}${e.endsWith("\u842C")?"":" "}\u5E74\u524D`}}function ro(i,t){let e=Kl(Math.max(i,t)),n=Kl(Math.min(i,t));if(e===n)return so(e);let s=Qs(e),r=Qs(n);return{en:`about ${si(e)} to ${si(n)} years ago`,zh:`\u5927\u7D04 ${s}${s.endsWith("\u842C")?"":" "}\u5230 ${r}${r.endsWith("\u842C")?"":" "}\u5E74\u524D`}}function xu(i){let t=so(i);if(i>=1e4)return t;let e=ss(W0($s(i)));return{en:`${t.en} (around ${e.en})`,zh:`${t.zh}\uFF08${e.zh.replace(" \u5E74"," \u5E74\u524D\u5F8C")}\uFF09`}}function W0(i){let t=Math.abs(i),e=t>=2e3?100:t>=500?50:10,n=Math.round(t/e)*e||e;return i<0?-n:n}var gn=(i,t)=>i==="log"?Math.log10(Math.max(t,1)):t,Zs=(i,t)=>i==="log"?10**t:t,Ei=(i,t)=>i==="log"?Math.max(t,1):Math.max(t,0);function Bu(i,t,e){if(i!=="log"&&i!=="linear")throw new RangeError(`Unknown scale: ${i}`);let n=Ei(i,e);if(!(t>n))throw new RangeError("older must be farther back than nearer");let s=gn(i,t),r=gn(i,n);return{kind:i,older:t,nearer:n,pos:a=>(s-gn(i,a))/(s-r),ago:a=>Zs(i,s-a*(s-r)),has:a=>{let l=i==="log"?Math.max(a,1):a;return l<=t*(1+1e-9)&&l>=n*(1-1e-9)}}}function ao(i,t,e){let n=i.pos(Math.max(t,e)),s=i.pos(Math.min(t,e));return s<0||n>1?null:{from:Math.max(0,n),to:Math.min(1,s)}}function X0(i){let t=10**Math.floor(Math.log10(i)),e=i/t;return(e<=1?1:e<=2?2:e<=5?5:10)*t}function Au(i,t=6){let e=[];if(i.kind==="log"){let r=Math.log10(i.nearer),a=Math.log10(i.older);for(let l=Math.ceil(a);l>=Math.floor(r);l--)for(let o of a-r<3?[5,2,1]:[1]){let c=o*10**l;i.has(c)&&e.push({ago:c,major:o===1,en:si(c),zh:Qs(c),unit:"ago"})}return e}let n=i.older-i.nearer,s=X0(n/t);if(n<=5e3){let r=2e3-i.older,a=2e3-i.nearer;for(let l=Math.ceil(r/s)*s;l<=a+1e-9;l+=s){let o=l>=1?l:l===0?-1:l,c=l===0?{en:"1 BCE / 1 CE",zh:"\u524D 1\uFF0F\u897F\u5143 1"}:ss(o);e.push({ago:Wl(o),major:!0,year:o,en:c.en,zh:c.zh.replace(/ 年$/,"").replace("\u897F\u5143\u524D ","\u524D ").replace("\u897F\u5143 ",""),unit:"year"})}return e}for(let r=Math.floor(i.older/s)*s;r>=i.nearer-1e-9;r-=s)e.push({ago:r,major:!0,en:r===0?"2000 CE":si(r),zh:r===0?"\u897F\u5143 2000":Qs(r),unit:"ago"});return e}function yu(i,t,e,n,s){let r=gn(i,Ei(i,s.nearer)),a=gn(i,s.older),l=gn(i,t.older),o=gn(i,Ei(i,t.nearer)),c=s.minSpan||(i==="log"?.6:50),d=Math.min(a-r,Math.max(c,(l-o)/e)),h=l-n*(l-o)+n*d;return h=Math.min(a,Math.max(r+d,h)),{older:Zs(i,h),nearer:Zs(i,h-d)}}function Mu(i,t,e,n){let s=gn(i,Ei(i,n.nearer)),r=gn(i,n.older),a=gn(i,t.older),l=a-gn(i,Ei(i,t.nearer)),o=Math.min(r,Math.max(s+l,a-e*l));return{older:Zs(i,o),nearer:Zs(i,o-l)}}function js(i,t,e){let n=Math.min(e.older,t.older),s=Math.max(Ei(i,e.nearer),t.nearer);return n>s?{older:n,nearer:s}:{older:e.older,nearer:Ei(i,e.nearer)}}function vu(i,t=.01){let e=[];return i.map(n=>{let s=e.findIndex(r=>r+t<=n.from);return s<0&&(s=e.length,e.push(0)),e[s]=n.to,s})}var rs=i=>i&&typeof i=="object"?Wl(i.year):i;function Y0(i){if(i.to!=null&&i.to!==i.from){if(i.from>=1e4)return ro(i.from,i.to);let t=ss($s(i.from)),e=ss($s(i.to));return{en:`${t.en} to ${e.en}`,zh:`${t.zh}\u5230${e.zh}`}}return i.from>=1e4?so(i.from):i.exact?ss($s(i.from)):xu(i.from)}function q0(i){let t=nn(i),e={older:t.from,nearer:t.to||0},n=t.events.map((x,v)=>({...x,i:v,from:rs(x.from),to:x.to==null?null:rs(x.to)})),s=t.lesson?{...t.lesson,from:rs(t.lesson.from),to:rs(t.lesson.to)}:null,r=i.querySelector(".wh-tl-view"),a=i.querySelector(".wh-tl-read"),l=t.view?{older:rs(t.view.from),nearer:rs(t.view.to)}:e,o={kind:"log",view:js("log",l,e),sel:-1};r.innerHTML=`<div class="wh-tl-axis" aria-hidden="true"></div><div class="wh-tl-lanes">${is.map(x=>`<div class="wh-tl-lane" data-lane="${x.key}"><p class="wh-tl-name">${Dt(x.en,x.zh)}</p><div class="wh-tl-track"></div></div>`).join("")}</div><div class="wh-tl-over" aria-hidden="true"><div class="wh-tl-grid"></div><div class="wh-tl-lesson"><span></span></div></div>`;let c=r.querySelector(".wh-tl-axis"),d=r.querySelector(".wh-tl-grid"),f=r.querySelector(".wh-tl-lesson"),h=is.map(x=>r.querySelector(`[data-lane="${x.key}"] .wh-tl-track`));s&&(f.firstChild.innerHTML=Dt(s.en,s.zh));function m(){let x=Bu(o.kind,o.view.older,o.view.nearer),v=E=>`${(E*100).toFixed(3)}%`,A=r.clientWidth<560,C=Au(x,A?o.kind==="linear"?2:4:7);c.innerHTML=C.map(E=>`<span class="wh-tl-tick${E.major?"":" is-minor"}" style="left:${v(x.pos(E.ago))}"><b>${oe(E.en)}</b><i>${oe(E.zh)}</i></span>`).join("")+`<span class="wh-tl-unit">${C[0]&&C[0].unit==="year"?Dt("calendar years","\u66C6\u5E74"):Dt("years ago","\u5E74\u524D")}</span>`,d.innerHTML=C.map(E=>`<i style="left:${v(x.pos(E.ago))}"${E.major?"":' class="is-minor"'}></i>`).join("");let M=s&&ao(x,s.from,s.to);f.hidden=!M,M&&(f.style.left=v(M.from),f.style.width=v(Math.max(.004,M.to-M.from)));let I=Math.max(120,h[0].clientWidth);is.forEach((E,D)=>{let L=n.filter(P=>Jl(P.lane)===D).map(P=>{let k=P.to==null?ao(x,P.from,P.from):ao(x,P.from,P.to);return k&&{e:P,s:k}}).filter(Boolean).sort((P,k)=>P.s.from-k.s.from),T=L.map(({e:P,s:k})=>{let Y=(([...P.en].length*.56+1.5)*11.5+16)/I,Z=Math.max(k.to,k.from);return Z+Y>1&&k.from>.45?{from:k.from-Y,to:Z+.01,flip:!0}:{from:k.from,to:Z+Y}}),w=T.map((P,k)=>k).sort((P,k)=>T[P].from-T[k].from),U=vu(w.map(P=>T[P]),.012),F=[];w.forEach((P,k)=>{F[P]=U[k]});let N=F.length?Math.max(...F)+1:1;h[D].style.setProperty("--rows",N),h[D].innerHTML=L.map(({e:P,s:k},tt)=>{let Y=P.to==null||k.to-k.from<.004,Z=!!T[tt].flip,et=Z?`right:${v(1-(Y?k.from:k.to))}`:`left:${v(k.from)}`;return`<button type="button" class="wh-ev${Y?" is-point":""}${P.kind?` is-${P.kind}`:""}${Z?" is-flip":""}${o.sel===P.i?" is-on":""}" data-ev="${P.i}" style="${et};--w:${Y?12:Math.max(10,Math.round((k.to-k.from)*I))}px;--row:${F[tt]}" aria-pressed="${o.sel===P.i}"><span class="wh-ev-bar"></span><span class="wh-ev-t">${Dt(P.en,P.zh)}</span></button>`}).join("")}),i.querySelectorAll("[data-scale]").forEach(E=>E.setAttribute("aria-pressed",E.dataset.scale===o.kind))}function _(x){o.sel=x;let v=n[x];if(!v){a.innerHTML=a.dataset.idle||"";return}let A=Y0(v),C=is[Jl(v.lane)];a.innerHTML=`<b>${oe(v.en)}<span class="zh">${oe(v.zh)}</span></b><span class="wh-tl-when">${oe(C.en)} \xB7 ${oe(A.en)}<span class="zh">${oe(C.zh)}\u30FB${oe(A.zh)}</span></span>`+(v.note_en?`<span class="wh-tl-note">${Dt(v.note_en,v.note_zh)}</span>`:"")}a.dataset.idle=a.innerHTML;let y={state:o,events:n,setScale(x){o.kind=x,o.view=js(x,x==="linear"?{older:e.older,nearer:e.nearer}:o.view,e),m()},zoom(x,v=.5){o.view=yu(o.kind,o.view,x,v,e),m()},pan(x){o.view=Mu(o.kind,o.view,x,e),m()},fit(x,v){o.view=js(o.kind,{older:x,nearer:v},e),m()},all(){o.view=js(o.kind,e,e),m()},select(x){_(x),m()},draw:m};i.addEventListener("click",x=>{let v=x.target.closest("button");!v||!i.contains(v)||(v.dataset.scale?y.setScale(v.dataset.scale):v.dataset.zoom==="in"?y.zoom(1.8):v.dataset.zoom==="out"?y.zoom(1/1.8):v.dataset.zoom==="all"?y.all():v.dataset.zoom==="recent"?(o.kind!=="linear"&&(o.kind="linear"),y.fit(Number(v.dataset.older)||6e3,0)):v.dataset.ev&&y.select(o.sel===Number(v.dataset.ev)?-1:Number(v.dataset.ev)))}),r.addEventListener("keydown",x=>{if(x.key==="ArrowLeft")y.pan(-.15);else if(x.key==="ArrowRight")y.pan(.15);else if(x.key==="+"||x.key==="=")y.zoom(1.5);else if(x.key==="-")y.zoom(1/1.5);else return;x.preventDefault()});let p=null;r.addEventListener("pointerdown",x=>{x.button===0&&(p={x:x.clientX,moved:!1,id:x.pointerId})}),r.addEventListener("pointermove",x=>{if(!p||x.pointerId!==p.id)return;let v=x.clientX-p.x;!p.moved&&Math.abs(v)<6||(p.moved||(p.moved=!0,r.setPointerCapture(x.pointerId),r.classList.add("is-drag")),y.pan(-v/Math.max(120,h[0].clientWidth)),p.x=x.clientX)});let u=x=>{if(p){if(p.moved){r.classList.remove("is-drag");let v=A=>{A.stopPropagation(),A.preventDefault()};r.addEventListener("click",v,{capture:!0,once:!0}),setTimeout(()=>r.removeEventListener("click",v,{capture:!0}),60);try{r.releasePointerCapture(x.pointerId)}catch{}}p=null}};return r.addEventListener("pointerup",u),r.addEventListener("pointercancel",u),r.addEventListener("wheel",x=>{if(!(!x.ctrlKey&&!x.metaKey&&Math.abs(x.deltaX)<=Math.abs(x.deltaY)))if(x.preventDefault(),x.ctrlKey||x.metaKey){let v=h[0].getBoundingClientRect();y.zoom(x.deltaY<0?1.15:1/1.15,Math.min(1,Math.max(0,(x.clientX-v.left)/v.width)))}else y.pan(x.deltaX/600)},{passive:!1}),new ResizeObserver(m).observe(r),m(),i.__tl=y,y}vn("[data-wh-timeline]",q0);function Q0(i){let t=nn(i),e=pu(t.items,t.buckets.map(_=>_.key)),n=_=>i.querySelector(_),s=n(".wh-so-k"),r=n(".wh-so-score"),a=n(".wh-so-q"),l=n(".wh-so-msg"),o=n(".wh-so-next"),c=n(".wh-so-steps"),d=[...i.querySelectorAll("[data-pick]")],f=0;function h(){let _=e.state,y=t.items.length;if(c.innerHTML=t.items.map((u,x)=>`<i class="${x<_.i||_.done?"is-done":x===_.i?"is-now":""}"></i>`).join(""),r.textContent=`${_.first} / ${f}`,_.done){s.innerHTML=Dt("All done","\u5168\u90E8\u5B8C\u6210"),a.innerHTML=Dt(t.end_en,t.end_zh),d.forEach(u=>{u.disabled=!0,u.classList.remove("is-right","is-wrong")}),l.innerHTML=Dt(`You sorted ${_.first} of ${y} correctly on the first try.`,`${y} \u984C\u88E1\uFF0C\u4F60\u6709 ${_.first} \u984C\u7B2C\u4E00\u6B21\u5C31\u5206\u5C0D\u3002`),l.className="wh-so-msg is-ok",o.hidden=!1,o.innerHTML="Play again \xB7 \u518D\u73A9\u4E00\u6B21",o.dataset.act="reset";return}s.innerHTML=Dt(`Question ${_.i+1} of ${y}`,`\u7B2C ${_.i+1} \u984C\uFF08\u5171 ${y} \u984C\uFF09`);let p=e.current();a.innerHTML=Dt(p.en,p.zh),d.forEach(u=>{u.disabled=!1,u.classList.remove("is-right","is-wrong")}),l.innerHTML="",l.className="wh-so-msg",o.hidden=!0,o.dataset.act="next",o.innerHTML="Next \xB7 \u4E0B\u4E00\u984C"}function m(_){let y=e.current();if(!y)return null;let p=e.pick(_);if(!p||p.repeat)return p;let u=d.find(x=>x.dataset.pick===_);return p.right?(f+=1,u.classList.add("is-right"),d.forEach(x=>{x.disabled=!0}),l.className="wh-so-msg is-ok",l.innerHTML=Dt(y.why_en,y.why_zh),r.textContent=`${e.state.first} / ${f}`,o.hidden=!1,o.focus()):(u.classList.add("is-wrong"),u.disabled=!0,l.className="wh-so-msg is-bad",l.innerHTML=Dt(y.hint_en||"Not that one. Try another.",y.hint_zh||"\u4E0D\u662F\u9019\u4E00\u7A2E\uFF0C\u518D\u8A66\u8A66\u5225\u7684\u3002")),p}return i.addEventListener("click",_=>{let y=_.target.closest("button");y&&(y.dataset.pick?m(y.dataset.pick):y.dataset.act==="next"?(e.next(),h()):y.dataset.act==="reset"&&(e.reset(),f=0,h()))}),h(),i.__sort={game:e,pick:m,next(){e.next(),h()},reset(){e.reset(),f=0,h()}},i.__sort}vn("[data-wh-sort]",Q0);function Z0(i,t){let e=i.slice();for(let n=e.length-1,s=7;n>0;n--){s=(s*31+11)%97;let r=s%(n+1);[e[n],e[r]]=[e[r],e[n]]}return e.join()===t.join()&&e.reverse(),e}function $0(i){let t=nn(i),e=t.items,n=Object.fromEntries(e.map(u=>[u.key,u])),s=i.querySelector(".wh-or-list"),r=i.querySelector(".wh-or-msg"),a=i.querySelector(".wh-or-chart"),l=Z0(e.map(u=>u.key),Ul(e)),o=l.slice(),c=null,d=0;function f(){s.innerHTML=o.map((u,x)=>{let v=n[u],A=c&&c.wrong.some(I=>I.includes(u)),C=c&&c.ok,M=v.when_en?{en:v.when_en,zh:v.when_zh}:ro(v.older,v.nearer);return`<li class="wh-or-it${A?" is-bad":""}${C?" is-ok":""}" data-key="${u}" draggable="true"><span class="wh-or-n">${x+1}</span><span class="wh-or-name">${Dt(v.en,v.zh)}`+(C?`<span class="wh-or-when">${Dt(M.en,M.zh)}</span>`:"")+`</span><span class="wh-or-btns"><button type="button" data-move="-1" aria-label="Move ${oe(v.en)} earlier \xB7 \u5F80\u524D\u79FB"${x===0?" disabled":""}>&uarr;</button><button type="button" data-move="1" aria-label="Move ${oe(v.en)} later \xB7 \u5F80\u5F8C\u79FB"${x===o.length-1?" disabled":""}>&darr;</button></span></li>`}).join("")}function h(){let u=Math.log10(Math.max(...e.map(A=>A.older))*1.3),x=Math.log10(Math.min(...e.map(A=>A.nearer))/1.4),v=A=>`${((u-Math.log10(A))/(u-x)*100).toFixed(2)}%`;a.hidden=!1,a.innerHTML=`<p class="wh-or-ck">${Dt("The ranges, drawn on one line (each step to the left is ten times longer ago)","\u628A\u9019\u4E9B\u7BC4\u570D\u756B\u5728\u540C\u4E00\u689D\u7DDA\u4E0A\uFF08\u6BCF\u5F80\u5DE6\u4E00\u683C\uFF0C\u662F\u5341\u500D\u90A3\u9EBC\u4E45\u4EE5\u524D\uFF09")}</p>`+o.map(A=>{let C=n[A];return`<div class="wh-or-row"><span>${Dt(C.en,C.zh)}</span><div><i style="left:${v(C.older)};right:calc(100% - ${v(C.nearer)})"></i></div></div>`}).join("")}function m(u,x,v){r.className=`wh-or-msg ${v||""}`,r.innerHTML=Dt(u,x)}function _(){if(c=fu(e,o),d+=1,f(),!c.ok){let[A,C]=c.wrong[0];return m(`Not yet. The evidence so far says people reached ${n[A].en} before ${n[C].en}. Move them and check again.`,`\u9084\u6C92\u5C0D\u3002\u76EE\u524D\u7684\u8B49\u64DA\u986F\u793A\uFF0C\u4EBA\u5230\u300C${n[A].zh}\u300D\u6BD4\u5230\u300C${n[C].zh}\u300D\u65E9\u3002\u8ABF\u6574\u4E00\u4E0B\u518D\u6AA2\u67E5\u3002`,"is-bad"),a.hidden=!0,c}let u=c.open.map(([A,C])=>[n[A],n[C]]),x=u.length?` ${t.open_en} (${u.map(([A,C])=>`${A.en} and ${C.en}`).join("; ")}.)`:"",v=u.length?`${t.open_zh}\uFF08${u.map(([A,C])=>`${A.zh}\u548C${C.zh}`).join("\uFF1B")}\u3002\uFF09`:"";return m(`${t.done_en}${x}`,`${t.done_zh}${v}`,"is-ok"),h(),c}function y(u,x){let v=o.indexOf(u),A=v+x;if(v<0||A<0||A>=o.length)return;[o[v],o[A]]=[o[A],o[v]],c=null,a.hidden=!0,m(t.hint_en,t.hint_zh),f();let C=s.querySelector(`[data-key="${u}"] [data-move="${x}"]`);if(C&&!C.disabled)C.focus();else{let M=s.querySelector(`[data-key="${u}"] button:not([disabled])`);M&&M.focus()}}i.addEventListener("click",u=>{let x=u.target.closest("button");x&&(x.dataset.move?y(x.closest("[data-key]").dataset.key,Number(x.dataset.move)):x.dataset.act==="check"?_():x.dataset.act==="reset"&&(o=l.slice(),c=null,a.hidden=!0,m(t.hint_en,t.hint_zh),f()))});let p=null;return s.addEventListener("dragstart",u=>{let x=u.target.closest("[data-key]");x&&(p=x.dataset.key,u.dataTransfer.effectAllowed="move",u.dataTransfer.setData("text/plain",p))}),s.addEventListener("dragover",u=>{p&&u.preventDefault()}),s.addEventListener("drop",u=>{let x=u.target.closest("[data-key]");if(!p||!x)return;u.preventDefault();let v=o.indexOf(p),A=o.indexOf(x.dataset.key);o.splice(A,0,o.splice(v,1)[0]),p=null,c=null,a.hidden=!0,m(t.hint_en,t.hint_zh),f()}),s.addEventListener("dragend",()=>{p=null}),m(t.hint_en,t.hint_zh),f(),i.__order={get order(){return o.slice()},set(u){o=u.slice(),c=null,f()},move:y,check:_,solve(){return o=Ul(e),_()},get tries(){return d}},i.__order}vn("[data-wh-order]",$0);var j0=i=>i.orig?`<b>${oe(i.orig)}</b> <small>${oe(i.lang)}</small><span class="wh-ma-en">${oe(i.en)}</span>`:`${i.pali?`<b>${oe(i.pali)}</b> <small>P\u0101li</small>`:""}${i.pali&&i.skt?" \xB7 ":""}${i.skt?`<b>${oe(i.skt)}</b> <small>Skt.</small>`:""}<span class="wh-ma-en">${oe(i.en)}</span>`;function t_(i){let t=nn(i),e=t.items,n=e.length,s=u=>i.querySelector(u),r={i:0,first:0,tried:!1,done:!1},a=s(".wh-ma-k"),l=s(".wh-ma-q"),o=s(".wh-ma-opts"),c=s(".wh-ma-msg"),d=s(".wh-ma-next"),f=s(".wh-ma-score"),h=[];function m(){if(f.textContent=`${r.first} / ${Math.min(n,r.i+(r.done,0))}`,r.done){a.innerHTML=Dt("All done","\u5168\u90E8\u5B8C\u6210"),l.innerHTML=Dt(t.end_en,t.end_zh),o.innerHTML="",c.className="wh-ma-msg is-ok",c.innerHTML=Dt(`You matched ${r.first} of ${n} on the first try.`,`${n} \u984C\u88E1\uFF0C\u4F60\u6709 ${r.first} \u984C\u7B2C\u4E00\u6B21\u5C31\u914D\u5C0D\u6B63\u78BA\u3002`),d.hidden=!1,d.dataset.act="reset",d.innerHTML="Play again \xB7 \u518D\u73A9\u4E00\u6B21";return}let u=e[r.i];a.innerHTML=Dt(`Term ${r.i+1} of ${n}`,`\u7B2C ${r.i+1} \u500B\uFF08\u5171 ${n} \u500B\uFF09`),l.innerHTML=`<span class="wh-ma-zh">${oe(u.zh)}</span>`,h=mu(n,r.i),o.innerHTML=h.map(x=>`<button type="button" class="wh-ma-opt" data-opt="${x}">${j0(e[x])}</button>`).join(""),c.innerHTML="",c.className="wh-ma-msg",d.hidden=!0,d.dataset.act="next",d.innerHTML="Next \xB7 \u4E0B\u4E00\u500B",r.tried=!1}function _(u){if(r.done)return null;let x=e[r.i],v=o.querySelector(`[data-opt="${u}"]`),A=u===r.i;return A?(r.tried||(r.first+=1),v.classList.add("is-right"),o.querySelectorAll("button").forEach(C=>{C.disabled=!0}),c.className="wh-ma-msg is-ok",c.innerHTML=Dt(x.note_en,x.note_zh),f.textContent=`${r.first} / ${r.i+1}`,d.hidden=!1,d.focus()):(r.tried=!0,v.classList.add("is-wrong"),v.disabled=!0,c.className="wh-ma-msg is-bad",c.innerHTML=Dt("Not this one. Look at the English meaning and try again.","\u4E0D\u662F\u9019\u4E00\u500B\u3002\u770B\u770B\u82F1\u6587\u7684\u610F\u601D\uFF0C\u518D\u8A66\u4E00\u6B21\u3002")),A}function y(){r.i+=1,r.i>=n&&(r.done=!0),m()}function p(){Object.assign(r,{i:0,first:0,tried:!1,done:!1}),m()}return i.addEventListener("click",u=>{let x=u.target.closest("button");x&&(x.dataset.opt!=null?_(+x.dataset.opt):x.dataset.act==="next"?y():x.dataset.act==="reset"&&p())}),m(),i.__match={state:r,pick:_,next:y,reset:p,options:()=>h},i.__match}vn("[data-wh-match]",t_);function Xl(i){if(!Number.isInteger(i)||i<0||i>19)throw new Error(`digit out of range: ${i}`);return i===0?{zero:!0,bars:0,dots:0}:{zero:!1,bars:Math.floor(i/5),dots:i%5}}function Su(i){if(!Number.isInteger(i)||i<0||i>399)throw new Error(`number out of range: ${i}`);return i<20?[Xl(i)]:[Xl(Math.floor(i/20)),Xl(i%20)]}function e_(i){return i?i.zero?i.bars||i.dots?null:0:i.dots>4||i.bars>3||i.dots<0||i.bars<0||!i.bars&&!i.dots?null:i.bars*5+i.dots:null}function n_(i){let t=0;for(let e of i){let n=e_(e);if(n==null)return null;t=t*20+n}return t}var co=i=>!i||!i.zero&&!i.bars&&!i.dots;function Du(i,t){let e=i.filter((s,r)=>!(r===0&&i.length>1&&co(s)));return e.every(co)?"empty":e.some(s=>s.dots>4)?"too-many-dots":e.some(s=>s.bars>3)?"too-many-bars":e.some(co)?"need-zero":n_(e)===t?"ok":"wrong"}var xi=96,Ci=58,oo=14,i_=7,Yl=11,lo=17;function s_(i,t,e){if(i.zero){let l=xi/2,o=t+Ci/2;return`<g class="${e} mn-zero"><ellipse cx="${l}" cy="${o}" rx="30" ry="15" class="mn-ink-fill"/><path d="M${l-20} ${o-7} Q${l} ${o-15} ${l+20} ${o-7} M${l-24} ${o} Q${l} ${o-8} ${l+24} ${o} M${l-20} ${o+7} Q${l} ${o} ${l+20} ${o+7}" class="mn-line"/></g>`}let s=((i.dots?1:0)+i.bars)*lo-(lo-Yl),r=t+(Ci-s)/2,a="";if(i.dots){let o=xi/2-(i.dots-1)*18/2;for(let c=0;c<i.dots;c++)a+=`<circle cx="${o+c*18}" cy="${r+Yl/2}" r="${i_}" class="mn-ink"/>`;r+=lo}for(let l=0;l<i.bars;l++)a+=`<rect x="${xi/2-34}" y="${r}" width="68" height="${Yl}" rx="4" class="mn-ink"/>`,r+=lo;return`<g class="${e}">${a}</g>`}function ql(i,{label:t=""}={}){let e=i.length,n=e*Ci+(e-1)*oo,s=i.map((r,a)=>{let l=a*(Ci+oo),o=a<e-1?`<line x1="8" x2="${xi-8}" y1="${l+Ci+oo/2}" y2="${l+Ci+oo/2}" class="mn-sep"/>`:"";return(co(r)?`<rect x="10" y="${l+4}" width="${xi-20}" height="${Ci-8}" rx="8" class="mn-empty"/>`:s_(r,l,"mn-lv"))+o}).join("");return`<svg class="mn-svg" viewBox="0 0 ${xi} ${n}" width="${xi}" height="${n}" role="img" aria-label="${t}">${s}</svg>`}function bu(i){let t=[i];for(let e of[1,5,20,-1,-5,-20,2,10]){let n=i+e;if(n>=0&&n<=399&&!t.includes(n)&&t.push(n),t.length===4)break}return t.sort((e,n)=>(e*7+i)%11-(n*7+i)%11||e-n)}var r_={empty:["Nothing written yet. Add dots, bars, or a zero sign.","\u9084\u6C92\u6709\u5BEB\u6771\u897F\u3002\u52A0\u4E0A\u9EDE\u3001\u6A6B\u6216\u96F6\u7684\u7B26\u865F\u3002"],"need-zero":["A place is empty. When a place has nothing in it, the Maya wrote a zero sign there.","\u6709\u4E00\u500B\u4F4D\u662F\u7A7A\u7684\u3002\u67D0\u4E00\u4F4D\u6C92\u6709\u6578\u91CF\u6642\uFF0C\u99AC\u96C5\u4EBA\u6703\u5728\u90A3\u88E1\u5BEB\u96F6\u7684\u7B26\u865F\u3002"],"too-many-dots":["Too many dots in one place. Five dots become one bar.","\u540C\u4E00\u4F4D\u7684\u9EDE\u592A\u591A\u4E86\u3002\u4E94\u500B\u9EDE\u8981\u63DB\u6210\u4E00\u6A6B\u3002"],"too-many-bars":["Too many bars in one place. Four bars make 20, which moves up to the next place.","\u540C\u4E00\u4F4D\u7684\u6A6B\u592A\u591A\u4E86\u3002\u56DB\u6A6B\u5C31\u662F 20\uFF0C\u8981\u9032\u5230\u4E0A\u9762\u4E00\u4F4D\u3002"],wrong:["Not yet. Count the twenties on top and the ones below, then try again.","\u9084\u4E0D\u5C0D\u3002\u6578\u4E00\u6578\u4E0A\u9762\u6709\u5E7E\u500B\u4E8C\u5341\u3001\u4E0B\u9762\u6709\u5E7E\u500B\u4E00\uFF0C\u518D\u8A66\u4E00\u6B21\u3002"]};function a_(i){let t=nn(i),e=t.items,n=e.length,s=C=>i.querySelector(C),r=s(".wh-mn-k"),a=s(".wh-mn-q"),l=s(".wh-mn-body"),o=s(".wh-mn-msg"),c=s(".wh-mn-next"),d=s(".wh-mn-score"),f={i:0,first:0,tried:!1,done:!1,solved:!1,lv:null},h=()=>[{zero:!1,bars:0,dots:0},{zero:!1,bars:0,dots:0}];function m(){let C=l.querySelector(".wh-mn-pic");C&&(C.innerHTML=ql(f.lv,{label:"Your Maya number \xB7 \u4F60\u5BEB\u7684\u99AC\u96C5\u6578\u5B57"}))}function _(){if(f.done){r.innerHTML=Dt("All done","\u5168\u90E8\u5B8C\u6210"),a.innerHTML=Dt(t.end_en,t.end_zh),l.innerHTML="",o.className="wh-mn-msg is-ok",o.innerHTML=Dt(`You got ${f.first} of ${n} right on the first try.`,`${n} \u984C\u88E1\uFF0C\u4F60\u6709 ${f.first} \u984C\u7B2C\u4E00\u6B21\u5C31\u5C0D\u3002`),c.hidden=!1,c.dataset.act="reset",c.innerHTML="Play again \xB7 \u518D\u73A9\u4E00\u6B21";return}let C=e[f.i];if(Object.assign(f,{tried:!1,solved:!1}),r.innerHTML=Dt(`Number ${f.i+1} of ${n}`,`\u7B2C ${f.i+1} \u984C\uFF08\u5171 ${n} \u984C\uFF09`),o.innerHTML="",o.className="wh-mn-msg",c.hidden=!0,c.dataset.act="next",c.innerHTML="Next \xB7 \u4E0B\u4E00\u984C",C.mode==="read")a.innerHTML=Dt("What number is this?","\u9019\u662F\u591A\u5C11\uFF1F"),l.innerHTML=`<div class="wh-mn-pic">${ql(Su(C.n),{label:"A Maya number \xB7 \u4E00\u500B\u99AC\u96C5\u6578\u5B57"})}</div><div class="wh-mn-opts">${bu(C.n).map(M=>`<button type="button" class="wh-mn-opt" data-val="${M}">${M}</button>`).join("")}</div>`;else{f.lv=h(),a.innerHTML=`<b class="wh-mn-n">${C.n}</b>`+Dt("Write this number in Maya numbers.","\u7528\u99AC\u96C5\u6578\u5B57\u5BEB\u51FA\u9019\u500B\u6578\u3002");let M=(I,E,D)=>`<div class="wh-mn-row" data-lv="${I}"><span class="wh-mn-place">${Dt(E,D)}</span><button type="button" data-add="dot" aria-label="Add a dot (1) \xB7 \u52A0\u4E00\u9EDE\uFF081\uFF09"><i class="wh-mn-dot"></i>+1</button><button type="button" data-add="bar" aria-label="Add a bar (5) \xB7 \u52A0\u4E00\u6A6B\uFF085\uFF09"><i class="wh-mn-bar"></i>+5</button><button type="button" data-add="zero" aria-label="Zero sign \xB7 \u96F6\u7684\u7B26\u865F"><i class="wh-mn-shell"></i>0</button><button type="button" data-add="clear" class="wh-mn-clear">Clear \xB7 \u6E05\u6389</button></div>`;l.innerHTML='<div class="wh-mn-write"><div class="wh-mn-pic"></div><div class="wh-mn-tools">'+M(0,"Top place: twenties","\u4E0A\u9762\u4E00\u4F4D\uFF1A\u5E7E\u500B\u4E8C\u5341")+M(1,"Bottom place: ones","\u4E0B\u9762\u4E00\u4F4D\uFF1A\u5E7E\u500B\u4E00")+'<button type="button" class="wh-btn wh-btn-gold" data-act="check">Check \xB7 \u6AA2\u67E5</button></div></div>',m()}}function y(C){f.tried||(f.first+=1),f.solved=!0,o.className="wh-mn-msg is-ok",o.innerHTML=Dt(C.note_en,C.note_zh),d.textContent=`${f.first} / ${f.i+1}`,l.querySelectorAll("button").forEach(M=>{M.disabled=!0}),c.hidden=!1,c.focus()}function p(C){let M=e[f.i];if(f.done||M.mode!=="read"||f.solved)return null;let I=l.querySelector(`[data-val="${C}"]`),E=C===M.n;return E?(I==null||I.classList.add("is-right"),y(M)):(f.tried=!0,I&&(I.classList.add("is-wrong"),I.disabled=!0),o.className="wh-mn-msg is-bad",o.innerHTML=Dt("Not this one. A dot is 1, a bar is 5; the top place counts twenties.","\u4E0D\u662F\u9019\u500B\u3002\u4E00\u9EDE\u662F 1\u3001\u4E00\u6A6B\u662F 5\uFF1B\u4E0A\u9762\u90A3\u4E00\u4F4D\u6578\u7684\u662F\u5E7E\u500B\u4E8C\u5341\u3002")),E}function u(C,M){let I=e[f.i];if(f.done||I.mode!=="write"||f.solved)return;let E=f.lv[C];M==="clear"?Object.assign(E,{zero:!1,bars:0,dots:0}):M==="zero"?Object.assign(E,{zero:!0,bars:0,dots:0}):(E.zero=!1,E[M==="dot"?"dots":"bars"]+=1),o.innerHTML="",o.className="wh-mn-msg",m()}function x(){let C=e[f.i];if(f.done||C.mode!=="write"||f.solved)return null;let M=Du(f.lv,C.n);return M==="ok"?y(C):(M!=="empty"&&(f.tried=!0),o.className="wh-mn-msg is-bad",o.innerHTML=Dt(...r_[M])),M}function v(){f.i+=1,f.i>=n&&(f.done=!0),_()}function A(){Object.assign(f,{i:0,first:0,done:!1}),d.textContent="0 / 0",_()}return i.addEventListener("click",C=>{let M=C.target.closest("button");!M||M.disabled||(M.dataset.val!=null?p(+M.dataset.val):M.dataset.add?u(+M.closest("[data-lv]").dataset.lv,M.dataset.add):M.dataset.act==="check"?x():M.dataset.act==="next"?v():M.dataset.act==="reset"&&A())}),_(),i.__mayanum={state:f,pick:p,add:u,clear:C=>u(C,"clear"),levels:()=>f.lv,check:x,next:v,reset:A},i.__mayanum}vn("[data-wh-mayanum]",a_);var Ql={land:{color:"#ffd36e",dash:!1,width:.0085},sea:{color:"#7fe3ff",dash:!1,width:.0085},good:{color:"#ff8fd8",sea:"#ff8fd8",dash:!1,width:.0125}},o_={at:[75,30],dist:3.6},l_=2.4;function c_(i){var wt;let t=nn(i),e=t.home||o_,n=W=>i.querySelector(W),s=n(".al-space-cv"),r=n(".al-space"),a=n(".wh-time"),l=n(".al-play"),o={year:(wt=t.start)!=null?wt:t.from,playing:!1,site:null,good:null,t:0,walking:!1},c=t.routes.map(W=>({...W,timed:Hl(zl(W),.8)})),d=[...i.querySelectorAll("[data-site]")],f=[...i.querySelectorAll("[data-good]")],h=n(".wh-site"),m=n(".wh-sk-good"),_=40,y=t.to-t.from,p=Object.fromEntries(t.goods.map(W=>[W.key,{...W,path:_u(W,t.cities)}])),u=0,x=0,v=0,A=!0,C=null;try{let jt=function(){let b=r.clientWidth,ne=r.clientHeight;!b||!ne||(W.setSize(b,ne,!1),it.aspect=b/ne,it.fov=b/ne<.9?40:34,it.updateProjectionMatrix())},W=new Qa({canvas:s,antialias:!0,alpha:!0}),O=Math.min(window.innerWidth,window.innerHeight)<700;W.setPixelRatio(Math.min(window.devicePixelRatio||1,2));let J=new Cs,it=new Le(34,1,.1,50),at=du({land:su(),texWidth:O?2048:4096});J.add(at.group);let rt=new to(it,s);rt.enablePan=!1,rt.enableDamping=!0,rt.dampingFactor=.12,rt.minDistance=1.5,rt.maxDistance=6,rt.zoomSpeed=.7;let vt=$h(n(".al-labels"),s,it);for(let b of c)at.addRoute({key:b.key,pts:b.timed,...Ql[b.kind]||Ql.land});for(let b of Object.values(p)){let ne=b.path.map((Zt,S)=>[Zt[0],Zt[1],t.from-1,...b.sea&&b.sea[S]?["sea"]:[]]);at.addRoute({key:`good-${b.key}`,pts:Hl(zl({pts:ne}),.8),...Ql.good}),at.setRoute(`good-${b.key}`,!1),at.routes[`good-${b.key}`].mesh.renderOrder=5}for(let b of t.cities)at.addDot({key:b.key,at:b.at,color:b.port?"#bff3ff":"#ffffff",r:.0105});let Gt=at.addDot({key:"token",at:[0,0],color:"#ff8fd8",r:.016});Gt.g.visible=!1;let Tt=t.cities.map(b=>({c:b,el:vt.add("wh-lab wh-lab-sk",`${oe(b.short_en||b.en)}<i>${oe(b.short_zh||b.zh)}</i>`)})),Nt={dir:new H,dist:e.dist,on:!1},Qt=new H,Ut=(b,ne)=>{it.position.fromArray(Ne(b,ne)),it.lookAt(0,0,0),rt.update()};new ResizeObserver(()=>{jt(),T()}).observe(r);let Vt=0;rt.addEventListener("start",()=>{Vt=performance.now(),Nt.on=!1}),rt.addEventListener("change",()=>_t());let te=new Rs,ee=new Ot,ce=null;s.addEventListener("pointerdown",b=>{ce=[b.clientX,b.clientY]}),s.addEventListener("pointerup",b=>{if(!ce||Math.hypot(b.clientX-ce[0],b.clientY-ce[1])>6){ce=null;return}ce=null;let ne=s.getBoundingClientRect();ee.set((b.clientX-ne.left)/ne.width*2-1,-((b.clientY-ne.top)/ne.height*2-1)),te.setFromCamera(ee,it);let Zt=at.pick(te);if(!Zt)return;let S=null,g=Math.max(1.2,it.position.length()*1.2);for(let z of qs(t.cities,o.year)){let X=Rn(Zt,z.at);X<g&&(g=X,S=z)}k(S?S.key:null)}),C={renderer:W,scene:J,camera:it,globe:at,controls:rt,labs:vt,cityLabs:Tt,token:Gt,want:Nt,lookDir:Qt,setCam:Ut,get userAt(){return Vt}},jt(),Ut(e.at,it.aspect<1?e.dist*Math.min(1.5,1/it.aspect)*.92:e.dist)}catch(W){C=null,window.console&&console.warn("World History Silk Road globe: 3D is off",W)}C||i.classList.add("al-nogl","wh-nogl");let M=W=>C&&C.camera.aspect<1?W*Math.min(1.5,1/C.camera.aspect)*.92:W;function I(){let W={};for(let O of c)W[O.key]=nu(O.timed,io(o.year));return W}function E(){let W=kl(o.year);n(".wh-when-en").textContent=`Around ${W.en}`,n(".wh-when-zh").textContent=`\u5927\u7D04${W.zh}`,a.setAttribute("aria-valuetext",`${W.en} \xB7 ${W.zh}`);let O=qs(t.cities,o.year);n(".wh-count").textContent=`${O.length} / ${t.cities.length}`;for(let J of d){let it=t.cities.find(at=>at.key===J.dataset.site);J.classList.toggle("is-later",ns(it,o.year)==="not"),J.setAttribute("aria-pressed",o.site===it.key)}for(let J of f)J.setAttribute("aria-pressed",o.good===J.dataset.good);C&&C.globe.setAgo(io(o.year),I())}function D(){if(!C)return;let W=o.good&&p[o.good];if(C.token.g.visible=!!W,!W)return;let{at:O,leg:J}=Vl(W.path,o.t),it=new H().fromArray(Ne(O));C.token.g.position.copy(it).multiplyScalar(1.009),C.token.g.lookAt(it.clone().multiplyScalar(3)),m.querySelectorAll("li").forEach((at,rt)=>{at.classList.toggle("is-now",rt===J&&o.t<1),at.classList.toggle("is-done",rt<J||o.t>=1)})}function L(){var jt;if(!C)return;let{globe:W,camera:O,labs:J}=C,it=Math.min(1.15,Math.max(.32,(O.position.length()-1)/2.6)),at=o.good&&p[o.good],rt=new Set(at?at.stops:[]);for(let Vt of t.cities)W.setDot(Vt.key,{on:ns(Vt,o.year)==="yes",big:o.site===Vt.key||rt.has(Vt.key),dim:!!at&&!rt.has(Vt.key),k:it});let vt=O.position.length()<2.3,Gt=i.clientWidth<600,Tt=(jt=qs(t.cities,o.year).sort((Vt,te)=>te.year-Vt.year)[0])==null?void 0:jt.key,Nt=[];if(at){let Vt=Vl(at.path,o.t).leg;for(let te of[at.stops[Vt+1],at.stops[Vt],at.stops[at.stops.length-1],at.stops[0],...Gt?[]:at.stops])Nt.push(te)}else{o.site&&Nt.push(o.site);for(let Vt of t.cities)(!Gt&&vt||(Gt?Vt.key===Tt:o.year-Vt.year<200))&&Nt.push(Vt.key)}let Qt=(Gt?14:9.5)*(O.position.length()-1)/2.6,Ut=[];for(let Vt of Nt){let te=t.cities.find(ee=>ee.key===Vt);!te||Ut.includes(te)||ns(te,o.year)!=="yes"||!W.facing(te.at,O,.2)||Ut.some(ee=>Rn(ee.at,te.at)<Qt)||Ut.push(te)}for(let{c:Vt,el:te}of C.cityLabs)J.place(te,W.pos(Vt.at,1.03),Ut.includes(Vt),-16)}function T(){C&&(C.controls.update(),D(),L(),C.renderer.render(C.scene,C.camera))}function w(W,O,J,it){C&&(C.want.dir.fromArray(Ne([W,O])),C.want.dist=J?M(J):C.camera.position.length(),C.want.on=!0,it&&(C.setCam([W,O],C.want.dist),C.want.on=!1),_t())}function U(W,O){let{camera:J,want:it,lookDir:at}=C;if(!it.on)return!1;let rt=J.position.length();at.copy(J.position).normalize();let vt=1-Math.exp(-W*O);at.lerp(it.dir,vt).normalize();let Gt=rt+(it.dist-rt)*vt;return J.position.copy(at).multiplyScalar(Gt),J.lookAt(0,0,0),at.angleTo(it.dir)<.002&&Math.abs(Gt-it.dist)<.003&&(it.on=!1),!0}function F(W,O){o.year=Math.min(t.to,Math.max(t.from,W)),O||(a.value=Math.round(o.year)),o.good&&o.year<p[o.good].year&&Y(null),E(),_t()}function N(W){o.playing=W,W&&o.year>=t.to-1&&F(t.from),W&&Y(null),i.classList.toggle("is-playing",W),l.setAttribute("aria-pressed",W),l.querySelector(".al-play-t").textContent=W?"Pause \xB7 \u66AB\u505C":"Play \xB7 \u64AD\u653E",_t()}function P(W){return`<p class="wh-site-k">${Dt(W.port?"Port":"City",W.port?"\u6E2F\u53E3":"\u57CE\u5E02")}</p><h3>${Dt(W.en,W.zh)}</h3><dl><div><dt>${Dt("Why it mattered","\u70BA\u4EC0\u9EBC\u91CD\u8981")}</dt><dd>${Dt(W.what_en,W.what_zh)}</dd></div><div><dt>${Dt("When","\u4EC0\u9EBC\u6642\u5019")}</dt><dd>${Dt(W.when_en,W.when_zh)}</dd></div><div><dt>${Dt("How we know","\u600E\u9EBC\u77E5\u9053")}</dt><dd>${Dt(W.how_en,W.how_zh)}</dd></div></dl>`+(W.url?`<a class="wh-py-src" href="${oe(W.url)}" target="_blank" rel="noopener">${oe(W.src)} &#8599;</a>`:"")}function k(W){o.site=W;let O=W&&t.cities.find(J=>J.key===W);h.hidden=!O,O&&(h.innerHTML=P(O),C&&!C.globe.facing(O.at,C.camera,.5)&&w(O.at[0],O.at[1],Math.min(C.camera.position.length(),3.2))),E(),_t()}function tt(W){let O=rt=>{let vt=t.cities.find(Gt=>Gt.key===rt);return[vt.short_en||vt.en,vt.short_zh||vt.zh]},J=Eu(W),it=kl(W.year),at=W.legs.map((rt,vt)=>{let[Gt,Tt]=[O(W.stops[vt]),O(W.stops[vt+1])];return`<li><b>${Dt(`${Gt[0]} \u2192 ${Tt[0]}`,`${Gt[1]} \u2192 ${Tt[1]}`)}</b>${Dt(rt.en,rt.zh)}</li>`}).join("");return`<p class="wh-site-k">${Dt("Follow one thing","\u8DDF\u8457\u4E00\u4EF6\u6771\u897F\u8D70")} \xB7 ${Dt(`around ${it.en}`,`\u5927\u7D04${it.zh}`)}</p><h3><span aria-hidden="true">${W.icon}</span> ${Dt(W.en,W.zh)}</h3><ol class="wh-sk-legs">${at}</ol><p class="wh-sk-hands">${W.hands_en?Dt(W.hands_en,W.hands_zh):J?Dt(J===1?"Changed hands once on the way":`Changed hands about ${J} times on the way`,J===1?"\u4E00\u8DEF\u4E0A\u63DB\u4E86\u4E00\u6B21\u624B":`\u4E00\u8DEF\u4E0A\u5927\u7D04\u63DB\u4E86 ${J} \u6B21\u624B`):W.same_en?Dt(W.same_en,W.same_zh):Dt("Carried the whole way by the same group, which was unusual","\u4E00\u8DEF\u7531\u540C\u4E00\u6279\u4EBA\u5E36\uFF0C\u9019\u5F88\u5C11\u898B")}</p><p class="wh-sk-note">${Dt(W.note_en,W.note_zh)}</p>`+(W.url?`<a class="wh-py-src" href="${oe(W.url)}" target="_blank" rel="noopener">${oe(W.src)} &#8599;</a>`:"")+`<button type="button" class="wh-btn wh-sk-again" data-act="again">${Dt("Watch again","\u518D\u770B\u4E00\u6B21")}</button>`}function Y(W){let O=W&&p[W];if(o.good&&C&&C.globe.setRoute(`good-${o.good}`,!1),o.good=O?W:null,o.t=0,o.walking=!!O,m.hidden=!O,O&&(o.playing&&N(!1),o.year<O.year&&(o.year=O.year,a.value=O.year),k(null),m.innerHTML=tt(O),C)){C.globe.setRoute(`good-${W}`,!0);let J=O.path[Math.floor(O.path.length/2)];w(J[0],J[1],O.dist||3.6)}E(),_t()}function Z(W){if(!o.walking||!o.good)return!1;let O=p[o.good].stops.length-1;return o.t=Math.min(1,o.t+W/(l_*O)),o.t>=1&&(o.walking=!1),!0}function et(W){u=0;let O=Math.min(.05,x?(W-x)/1e3:.016);x=W;let J=!1;if(o.playing){let it=o.year;o.year=Math.min(t.to,o.year+O/_*y),a.value=Math.round(o.year);let at=t.cities.filter(rt=>rt.year>it&&rt.year<=o.year);if(C&&at.length&&performance.now()-C.userAt>2500){let rt=at[at.length-1];w(rt.at[0],rt.at[1],rt.dist||3.4)}E(),J=!0,o.year>=t.to&&N(!1)}Z(O)&&(J=!0),C&&U(O,o.playing?1.8:4.5)&&(J=!0),T(),v=J?0:v+1,A&&v<80&&(u=requestAnimationFrame(et))}function _t(){v=0,!u&&A&&(x=0,u=requestAnimationFrame(et))}new IntersectionObserver(W=>{A=W[0].isIntersecting,A&&_t()}).observe(i),a.addEventListener("input",()=>{o.playing&&N(!1),F(+a.value,!0)}),l.addEventListener("click",()=>N(!o.playing)),i.addEventListener("click",W=>{let O=W.target.closest("[data-site]");if(O){Y(null);let it=t.cities.find(at=>at.key===O.dataset.site);ns(it,o.year)==="not"&&F(it.year),k(o.site===it.key?null:it.key);return}let J=W.target.closest("[data-good]");if(J){Y(o.good===J.dataset.good?null:J.dataset.good);return}W.target.closest('[data-act="again"]')&&(o.t=0,o.walking=!0,_t())}),C&&n(".al-home").addEventListener("click",()=>{Y(null),k(null),w(e.at[0],e.at[1],e.dist)});let Ct=Object.fromEntries((t.demos||[]).map(W=>[W.key,()=>{Y(null),k(null),F(W.year),W.good&&(Y(W.good),W.t!=null&&(o.t=W.t,o.walking=!1)),W.site&&k(W.site),W.look&&w(W.look[0],W.look[1],W.look[2])}])),kt={state:o,data:t,routes:c,setYear:F,play:N,select:k,follow:Y,look:w,step(W){Z(W),T()},demo(W){o.playing&&N(!1),Ct[W]&&Ct[W]()},info(){return{year:Math.round(o.year),cities:qs(t.cities,o.year).length,site:o.site,good:o.good,t:o.t,webgl:!!C,cam:C?Ys(C.camera.position.toArray()).concat(C.camera.position.length()):null}},render(){E(),T()},ready:()=>!0};return F(o.year),i.__lab=kt,kt}jh("[data-wh-silk-lab]",c_,{demo:(i,t)=>i.demo(t)});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
