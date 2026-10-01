(()=>{var Kn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},jn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Oc=0,Yo=1,Fc=2;var Gs=1,Bc=2,Ki=3,Qn=0,Le=1,vn=2,yn=0,ji=1,In=2,Zo=3,$o=4,zc=5;var pi=100,Vc=101,kc=102,Gc=103,Hc=104,Wc=200,Xc=201,qc=202,Yc=203,Jo=204,Ko=205,Zc=206,$c=207,Jc=208,Kc=209,jc=210,Qc=211,th=212,eh=213,nh=214,Ur=0,Nr=1,Or=2,Vi=3,Fr=4,Br=5,zr=6,Vr=7,jo=0,ih=1,sh=2,on=0,Qo=1,tl=2,el=3,nl=4,il=5,sl=6,rl=7;var al=300,ti=301,mi=302,ma=303,ga=304,Hs=306,kr=1e3,gn=1001,Gr=1002,Ee=1003,rh=1004;var Ws=1005;var we=1006,_a=1007;var ei=1008;var Ze=1009,ol=1010,ll=1011,Qi=1012,xa=1013,ln=1014,cn=1015,hn=1016,va=1017,ya=1018,ts=1020,cl=35902,hl=35899,ul=1021,dl=1022,Ke=1023,_n=1026,ni=1027,fl=1028,Ma=1029,ii=1030,Sa=1031;var ba=1033,Xs=33776,qs=33777,Ys=33778,Zs=33779,Aa=35840,Ta=35841,Ea=35842,wa=35843,Ca=36196,Ra=37492,Pa=37496,Ia=37488,La=37489,$s=37490,Da=37491,Ua=37808,Na=37809,Oa=37810,Fa=37811,Ba=37812,za=37813,Va=37814,ka=37815,Ga=37816,Ha=37817,Wa=37818,Xa=37819,qa=37820,Ya=37821,Za=36492,$a=36494,Ja=36495,Ka=36283,ja=36284,Js=36285,Qa=36286;var ys=2300,Hr=2301,Lr=2302,Vo=2303,ko=2400,Go=2401,Ho=2402;var ah=3200;var pl=0,oh=1,Ln="",Oe="srgb",Ms="srgb-linear",Ss="linear",se="srgb";var Dr=7680;var lh=519,ch=512,hh=513,uh=514,to=515,dh=516,fh=517,eo=518,ph=519,ml=35044;var gl="300 es",rn=2e3,bs=2001;function Su(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function bu(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function As(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function mh(){let i=As("canvas");return i.style.display="block",i}var lc={},ki=null;function Ts(...i){let t="THREE."+i.shift();ki?ki("log",t,...i):console.log(t,...i)}function gh(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function It(...i){i=gh(i);let t="THREE."+i.shift();if(ki)ki("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Nt(...i){i=gh(i);let t="THREE."+i.shift();if(ki)ki("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function ui(...i){let t=i.join(" ");t in lc||(lc[t]=!0,It(...i))}function _h(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var xh={[Ur]:Nr,[Or]:zr,[Fr]:Vr,[Vi]:Br,[Nr]:Ur,[zr]:Or,[Vr]:Fr,[Br]:Vi},an=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Re=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],cc=1234567,xs=Math.PI/180,Gi=180/Math.PI;function Rn(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Re[i&255]+Re[i>>8&255]+Re[i>>16&255]+Re[i>>24&255]+"-"+Re[t&255]+Re[t>>8&255]+"-"+Re[t>>16&15|64]+Re[t>>24&255]+"-"+Re[e&63|128]+Re[e>>8&255]+"-"+Re[e>>16&255]+Re[e>>24&255]+Re[n&255]+Re[n>>8&255]+Re[n>>16&255]+Re[n>>24&255]).toLowerCase()}function Xt(i,t,e){return Math.max(t,Math.min(e,i))}function _l(i,t){return(i%t+t)%t}function Au(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Tu(i,t,e){return i!==t?(e-i)/(t-i):0}function vs(i,t,e){return(1-e)*i+e*t}function Eu(i,t,e,n){return vs(i,t,1-Math.exp(-e*n))}function wu(i,t=1){return t-Math.abs(_l(i,t*2)-t)}function Cu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Ru(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Pu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Iu(i,t){return i+Math.random()*(t-i)}function Lu(i){return i*(.5-Math.random())}function Du(i){i!==void 0&&(cc=i);let t=cc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Uu(i){return i*xs}function Nu(i){return i*Gi}function Ou(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Fu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Bu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function zu(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),u=a((t+n)/2),p=r((t-n)/2),h=a((t-n)/2),f=r((n-t)/2),_=a((n-t)/2);switch(s){case"XYX":i.set(o*u,c*p,c*h,o*l);break;case"YZY":i.set(c*h,o*u,c*p,o*l);break;case"ZXZ":i.set(c*p,c*h,o*u,o*l);break;case"XZX":i.set(o*u,c*_,c*f,o*l);break;case"YXY":i.set(c*f,o*u,c*_,o*l);break;case"ZYZ":i.set(c*_,c*f,o*u,o*l);break;default:It("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function sn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function re(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var je={DEG2RAD:xs,RAD2DEG:Gi,generateUUID:Rn,clamp:Xt,euclideanModulo:_l,mapLinear:Au,inverseLerp:Tu,lerp:vs,damp:Eu,pingpong:wu,smoothstep:Cu,smootherstep:Ru,randInt:Pu,randFloat:Iu,randFloatSpread:Lu,seededRandom:Du,degToRad:Uu,radToDeg:Nu,isPowerOfTwo:Ou,ceilPowerOfTwo:Fu,floorPowerOfTwo:Bu,setQuaternionFromProperEuler:zu,normalize:re,denormalize:sn},Sl=class Sl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Sl.prototype.isVector2=!0;var Lt=Sl,qe=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],p=n[s+3],h=r[a+0],f=r[a+1],_=r[a+2],y=r[a+3];if(p!==y||c!==h||l!==f||u!==_){let g=c*h+l*f+u*_+p*y;g<0&&(h=-h,f=-f,_=-_,y=-y,g=-g);let d=1-o;if(g<.9995){let E=Math.acos(g),L=Math.sin(E);d=Math.sin(d*E)/L,o=Math.sin(o*E)/L,c=c*d+h*o,l=l*d+f*o,u=u*d+_*o,p=p*d+y*o}else{c=c*d+h*o,l=l*d+f*o,u=u*d+_*o,p=p*d+y*o;let E=1/Math.sqrt(c*c+l*l+u*u+p*p);c*=E,l*=E,u*=E,p*=E}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],p=r[a],h=r[a+1],f=r[a+2],_=r[a+3];return t[e]=o*_+u*p+c*f-l*h,t[e+1]=c*_+u*h+l*p-o*f,t[e+2]=l*_+u*f+o*h-c*p,t[e+3]=u*_-o*p-c*h-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),p=o(r/2),h=c(n/2),f=c(s/2),_=c(r/2);switch(a){case"XYZ":this._x=h*u*p+l*f*_,this._y=l*f*p-h*u*_,this._z=l*u*_+h*f*p,this._w=l*u*p-h*f*_;break;case"YXZ":this._x=h*u*p+l*f*_,this._y=l*f*p-h*u*_,this._z=l*u*_-h*f*p,this._w=l*u*p+h*f*_;break;case"ZXY":this._x=h*u*p-l*f*_,this._y=l*f*p+h*u*_,this._z=l*u*_+h*f*p,this._w=l*u*p-h*f*_;break;case"ZYX":this._x=h*u*p-l*f*_,this._y=l*f*p+h*u*_,this._z=l*u*_-h*f*p,this._w=l*u*p+h*f*_;break;case"YZX":this._x=h*u*p+l*f*_,this._y=l*f*p+h*u*_,this._z=l*u*_-h*f*p,this._w=l*u*p-h*f*_;break;case"XZY":this._x=h*u*p-l*f*_,this._y=l*f*p-h*u*_,this._z=l*u*_+h*f*p,this._w=l*u*p+h*f*_;break;default:It("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],p=e[10],h=n+o+p;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>p){let f=2*Math.sqrt(1+n-o-p);this._w=(u-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>p){let f=2*Math.sqrt(1+o-n-p);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+u)/f}else{let f=2*Math.sqrt(1+p-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){let l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},bl=class bl{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(hc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(hc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),u=2*(o*e-r*s),p=2*(r*n-a*e);return this.x=e+c*l+a*p-o*u,this.y=n+c*u+o*l-r*p,this.z=s+c*p+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return xo.copy(this).projectOnVector(t),this.sub(xo)}reflect(t){return this.sub(xo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};bl.prototype.isVector3=!0;var R=bl,xo=new R,hc=new qe,Al=class Al{constructor(t,e,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){let u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],p=n[7],h=n[2],f=n[5],_=n[8],y=s[0],g=s[3],d=s[6],E=s[1],L=s[4],M=s[7],b=s[2],A=s[5],C=s[8];return r[0]=a*y+o*E+c*b,r[3]=a*g+o*L+c*A,r[6]=a*d+o*M+c*C,r[1]=l*y+u*E+p*b,r[4]=l*g+u*L+p*A,r[7]=l*d+u*M+p*C,r[2]=h*y+f*E+_*b,r[5]=h*g+f*L+_*A,r[8]=h*d+f*M+_*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],p=u*a-o*l,h=o*c-u*r,f=l*r-a*c,_=e*p+n*h+s*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/_;return t[0]=p*y,t[1]=(s*l-u*n)*y,t[2]=(o*n-s*a)*y,t[3]=h*y,t[4]=(u*e-s*c)*y,t[5]=(s*r-o*e)*y,t[6]=f*y,t[7]=(n*c-l*e)*y,t[8]=(a*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return ui("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(vo.makeScale(t,e)),this}rotate(t){return ui("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(vo.makeRotation(-t)),this}translate(t,e){return ui("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(vo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Al.prototype.isMatrix3=!0;var Ot=Al,vo=new Ot,uc=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dc=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Vu(){let i={enabled:!0,workingColorSpace:Ms,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===se&&(s.r=Pn(s.r),s.g=Pn(s.g),s.b=Pn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===se&&(s.r=zi(s.r),s.g=zi(s.g),s.b=zi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ln?Ss:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ui("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ui("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ms]:{primaries:t,whitePoint:n,transfer:Ss,toXYZ:uc,fromXYZ:dc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Oe},outputColorSpaceConfig:{drawingBufferColorSpace:Oe}},[Oe]:{primaries:t,whitePoint:n,transfer:se,toXYZ:uc,fromXYZ:dc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Oe}}}),i}var $t=Vu();function Pn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function zi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Si,Wr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Si===void 0&&(Si=As("canvas")),Si.width=t.width,Si.height=t.height;let s=Si.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Si}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=As("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Pn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Pn(e[n]/255)*255):e[n]=Pn(e[n]);return{data:e,width:t.width,height:t.height}}else return It("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},ku=0,Hi=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=Rn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(yo(s[a].image)):r.push(yo(s[a]))}else r=yo(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function yo(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?Wr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(It("Texture: Unable to serialize Texture."),{})}var Gu=0,Mo=new R,Fe=class i extends an{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=gn,s=gn,r=we,a=ei,o=Ke,c=Ze,l=i.DEFAULT_ANISOTROPY,u=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gu++}),this.uuid=Rn(),this.name="",this.source=new Hi(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Lt(0,0),this.repeat=new Lt(1,1),this.center=new Lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Mo).x}get height(){return this.source.getSize(Mo).y}get depth(){return this.source.getSize(Mo).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){It(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){It(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==al)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case kr:t.x=t.x-Math.floor(t.x);break;case gn:t.x=t.x<0?0:1;break;case Gr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case kr:t.y=t.y-Math.floor(t.y);break;case gn:t.y=t.y<0?0:1;break;case Gr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Fe.DEFAULT_IMAGE=null;Fe.DEFAULT_MAPPING=al;Fe.DEFAULT_ANISOTROPY=1;var Tl=class Tl{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],u=c[4],p=c[8],h=c[1],f=c[5],_=c[9],y=c[2],g=c[6],d=c[10];if(Math.abs(u-h)<.01&&Math.abs(p-y)<.01&&Math.abs(_-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(p+y)<.1&&Math.abs(_+g)<.1&&Math.abs(l+f+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let L=(l+1)/2,M=(f+1)/2,b=(d+1)/2,A=(u+h)/4,C=(p+y)/4,x=(_+g)/4;return L>M&&L>b?L<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(L),s=A/n,r=C/n):M>b?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=A/s,r=x/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=C/r,s=x/r),this.set(n,s,r,e),this}let E=Math.sqrt((g-_)*(g-_)+(p-y)*(p-y)+(h-u)*(h-u));return Math.abs(E)<.001&&(E=1),this.x=(g-_)/E,this.y=(p-y)/E,this.z=(h-u)/E,this.w=Math.acos((l+f+d-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this.w=Xt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this.w=Xt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Tl.prototype.isVector4=!0;var me=Tl,Xr=class extends an{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:we,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new Fe(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:we,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Hi(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ve=class extends Xr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Es=class extends Fe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ee,this.minFilter=Ee,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var qr=class extends Fe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ee,this.minFilter=Ee,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var pa=class pa{constructor(t,e,n,s,r,a,o,c,l,u,p,h,f,_,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,u,p,h,f,_,y,g)}set(t,e,n,s,r,a,o,c,l,u,p,h,f,_,y,g){let d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=u,d[10]=p,d[14]=h,d[3]=f,d[7]=_,d[11]=y,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pa().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/bi.setFromMatrixColumn(t,0).length(),r=1/bi.setFromMatrixColumn(t,1).length(),a=1/bi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),p=Math.sin(r);if(t.order==="XYZ"){let h=a*u,f=a*p,_=o*u,y=o*p;e[0]=c*u,e[4]=-c*p,e[8]=l,e[1]=f+_*l,e[5]=h-y*l,e[9]=-o*c,e[2]=y-h*l,e[6]=_+f*l,e[10]=a*c}else if(t.order==="YXZ"){let h=c*u,f=c*p,_=l*u,y=l*p;e[0]=h+y*o,e[4]=_*o-f,e[8]=a*l,e[1]=a*p,e[5]=a*u,e[9]=-o,e[2]=f*o-_,e[6]=y+h*o,e[10]=a*c}else if(t.order==="ZXY"){let h=c*u,f=c*p,_=l*u,y=l*p;e[0]=h-y*o,e[4]=-a*p,e[8]=_+f*o,e[1]=f+_*o,e[5]=a*u,e[9]=y-h*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let h=a*u,f=a*p,_=o*u,y=o*p;e[0]=c*u,e[4]=_*l-f,e[8]=h*l+y,e[1]=c*p,e[5]=y*l+h,e[9]=f*l-_,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let h=a*c,f=a*l,_=o*c,y=o*l;e[0]=c*u,e[4]=y-h*p,e[8]=_*p+f,e[1]=p,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=f*p+_,e[10]=h-y*p}else if(t.order==="XZY"){let h=a*c,f=a*l,_=o*c,y=o*l;e[0]=c*u,e[4]=-p,e[8]=l*u,e[1]=h*p+y,e[5]=a*u,e[9]=f*p-_,e[2]=_*p-f,e[6]=o*u,e[10]=y*p+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Hu,t,Wu)}lookAt(t,e,n){let s=this.elements;return Ge.subVectors(t,e),Ge.lengthSq()===0&&(Ge.z=1),Ge.normalize(),Fn.crossVectors(n,Ge),Fn.lengthSq()===0&&(Math.abs(n.z)===1?Ge.x+=1e-4:Ge.z+=1e-4,Ge.normalize(),Fn.crossVectors(n,Ge)),Fn.normalize(),ar.crossVectors(Ge,Fn),s[0]=Fn.x,s[4]=ar.x,s[8]=Ge.x,s[1]=Fn.y,s[5]=ar.y,s[9]=Ge.y,s[2]=Fn.z,s[6]=ar.z,s[10]=Ge.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],p=n[5],h=n[9],f=n[13],_=n[2],y=n[6],g=n[10],d=n[14],E=n[3],L=n[7],M=n[11],b=n[15],A=s[0],C=s[4],x=s[8],T=s[12],U=s[1],F=s[5],k=s[9],W=s[13],N=s[2],G=s[6],K=s[10],q=s[14],it=s[3],Y=s[7],tt=s[11],et=s[15];return r[0]=a*A+o*U+c*N+l*it,r[4]=a*C+o*F+c*G+l*Y,r[8]=a*x+o*k+c*K+l*tt,r[12]=a*T+o*W+c*q+l*et,r[1]=u*A+p*U+h*N+f*it,r[5]=u*C+p*F+h*G+f*Y,r[9]=u*x+p*k+h*K+f*tt,r[13]=u*T+p*W+h*q+f*et,r[2]=_*A+y*U+g*N+d*it,r[6]=_*C+y*F+g*G+d*Y,r[10]=_*x+y*k+g*K+d*tt,r[14]=_*T+y*W+g*q+d*et,r[3]=E*A+L*U+M*N+b*it,r[7]=E*C+L*F+M*G+b*Y,r[11]=E*x+L*k+M*K+b*tt,r[15]=E*T+L*W+M*q+b*et,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],p=t[6],h=t[10],f=t[14],_=t[3],y=t[7],g=t[11],d=t[15],E=c*f-l*h,L=o*f-l*p,M=o*h-c*p,b=a*f-l*u,A=a*h-c*u,C=a*p-o*u;return e*(y*E-g*L+d*M)-n*(_*E-g*b+d*A)+s*(_*L-y*b+d*C)-r*(_*M-y*A+g*C)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],u=t[10];return e*(a*u-o*l)-n*(r*u-o*c)+s*(r*l-a*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],p=t[9],h=t[10],f=t[11],_=t[12],y=t[13],g=t[14],d=t[15],E=e*o-n*a,L=e*c-s*a,M=e*l-r*a,b=n*c-s*o,A=n*l-r*o,C=s*l-r*c,x=u*y-p*_,T=u*g-h*_,U=u*d-f*_,F=p*g-h*y,k=p*d-f*y,W=h*d-f*g,N=E*W-L*k+M*F+b*U-A*T+C*x;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/N;return t[0]=(o*W-c*k+l*F)*G,t[1]=(s*k-n*W-r*F)*G,t[2]=(y*C-g*A+d*b)*G,t[3]=(h*A-p*C-f*b)*G,t[4]=(c*U-a*W-l*T)*G,t[5]=(e*W-s*U+r*T)*G,t[6]=(g*M-_*C-d*L)*G,t[7]=(u*C-h*M+f*L)*G,t[8]=(a*k-o*U+l*x)*G,t[9]=(n*U-e*k-r*x)*G,t[10]=(_*A-y*M+d*E)*G,t[11]=(p*M-u*A-f*E)*G,t[12]=(o*T-a*F-c*x)*G,t[13]=(e*F-n*T+s*x)*G,t[14]=(y*L-_*b-g*E)*G,t[15]=(u*b-p*L+h*E)*G,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,u=a+a,p=o+o,h=r*l,f=r*u,_=r*p,y=a*u,g=a*p,d=o*p,E=c*l,L=c*u,M=c*p,b=n.x,A=n.y,C=n.z;return s[0]=(1-(y+d))*b,s[1]=(f+M)*b,s[2]=(_-L)*b,s[3]=0,s[4]=(f-M)*A,s[5]=(1-(h+d))*A,s[6]=(g+E)*A,s[7]=0,s[8]=(_+L)*C,s[9]=(g-E)*C,s[10]=(1-(h+y))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=bi.set(s[0],s[1],s[2]).length(),o=bi.set(s[4],s[5],s[6]).length(),c=bi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),tn.copy(this);let l=1/a,u=1/o,p=1/c;return tn.elements[0]*=l,tn.elements[1]*=l,tn.elements[2]*=l,tn.elements[4]*=u,tn.elements[5]*=u,tn.elements[6]*=u,tn.elements[8]*=p,tn.elements[9]*=p,tn.elements[10]*=p,e.setFromRotationMatrix(tn),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,s,r,a,o=rn,c=!1){let l=this.elements,u=2*r/(e-t),p=2*r/(n-s),h=(e+t)/(e-t),f=(n+s)/(n-s),_,y;if(c)_=r/(a-r),y=a*r/(a-r);else if(o===rn)_=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===bs)_=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=p,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=rn,c=!1){let l=this.elements,u=2/(e-t),p=2/(n-s),h=-(e+t)/(e-t),f=-(n+s)/(n-s),_,y;if(c)_=1/(a-r),y=a/(a-r);else if(o===rn)_=-2/(a-r),y=-(a+r)/(a-r);else if(o===bs)_=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=p,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=_,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};pa.prototype.isMatrix4=!0;var pe=pa,bi=new R,tn=new pe,Hu=new R(0,0,0),Wu=new R(1,1,1),Fn=new R,ar=new R,Ge=new R,fc=new pe,pc=new qe,Gn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],p=s[2],h=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-p,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Xt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Xt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:It("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return fc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(fc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return pc.setFromEuler(this),this.setFromQuaternion(pc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Gn.DEFAULT_ORDER="XYZ";var ws=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Xu=0,mc=new R,Ai=new qe,bn=new pe,or=new R,hs=new R,qu=new R,Yu=new qe,gc=new R(1,0,0),_c=new R(0,1,0),xc=new R(0,0,1),vc={type:"added"},Zu={type:"removed"},Ti={type:"childadded",child:null},So={type:"childremoved",child:null},Be=class i extends an{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Xu++}),this.uuid=Rn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new R,e=new Gn,n=new qe,s=new R(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pe},normalMatrix:{value:new Ot}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ws,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ai.setFromAxisAngle(t,e),this.quaternion.multiply(Ai),this}rotateOnWorldAxis(t,e){return Ai.setFromAxisAngle(t,e),this.quaternion.premultiply(Ai),this}rotateX(t){return this.rotateOnAxis(gc,t)}rotateY(t){return this.rotateOnAxis(_c,t)}rotateZ(t){return this.rotateOnAxis(xc,t)}translateOnAxis(t,e){return mc.copy(t).applyQuaternion(this.quaternion),this.position.add(mc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(gc,t)}translateY(t){return this.translateOnAxis(_c,t)}translateZ(t){return this.translateOnAxis(xc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?or.copy(t):or.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),hs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bn.lookAt(hs,or,this.up):bn.lookAt(or,hs,this.up),this.quaternion.setFromRotationMatrix(bn),s&&(bn.extractRotation(s.matrixWorld),Ai.setFromRotationMatrix(bn),this.quaternion.premultiply(Ai.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Nt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(vc),Ti.child=t,this.dispatchEvent(Ti),Ti.child=null):Nt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Zu),So.child=t,this.dispatchEvent(So),So.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(vc),Ti.child=t,this.dispatchEvent(Ti),Ti.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hs,t,qu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hs,Yu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let p=c[l];r(t.shapes,p)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),p=a(t.shapes),h=a(t.skeletons),f=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),p.length>0&&(n.shapes=p),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Be.DEFAULT_UP=new R(0,1,0);Be.DEFAULT_MATRIX_AUTO_UPDATE=!0;Be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var hi=class extends Be{constructor(){super(),this.isGroup=!0,this.type="Group"}},$u={type:"move"},Wi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let y of t.hand.values()){let g=e.getJointPose(y,n),d=this._getHandJoint(l,y);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}let u=l.joints["index-finger-tip"],p=l.joints["thumb-tip"],h=u.position.distanceTo(p.position),f=.02,_=.005;l.inputState.pinching&&h>f+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=f-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($u)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new hi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},vh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bn={h:0,s:0,l:0},lr={h:0,s:0,l:0};function bo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var zt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Oe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=$t.workingColorSpace){return this.r=t,this.g=e,this.b=n,$t.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=$t.workingColorSpace){if(t=_l(t,1),e=Xt(e,0,1),n=Xt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=bo(a,r,t+1/3),this.g=bo(a,r,t),this.b=bo(a,r,t-1/3)}return $t.colorSpaceToWorking(this,s),this}setStyle(t,e=Oe){function n(r){r!==void 0&&parseFloat(r)<1&&It("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:It("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);It("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Oe){let n=vh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):It("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Pn(t.r),this.g=Pn(t.g),this.b=Pn(t.b),this}copyLinearToSRGB(t){return this.r=zi(t.r),this.g=zi(t.g),this.b=zi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Oe){return $t.workingToColorSpace(Pe.copy(this),t),Math.round(Xt(Pe.r*255,0,255))*65536+Math.round(Xt(Pe.g*255,0,255))*256+Math.round(Xt(Pe.b*255,0,255))}getHexString(t=Oe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.workingToColorSpace(Pe.copy(this),e);let n=Pe.r,s=Pe.g,r=Pe.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let p=a-o;switch(l=u<=.5?p/(a+o):p/(2-a-o),a){case n:c=(s-r)/p+(s<r?6:0);break;case s:c=(r-n)/p+2;break;case r:c=(n-s)/p+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=$t.workingColorSpace){return $t.workingToColorSpace(Pe.copy(this),e),t.r=Pe.r,t.g=Pe.g,t.b=Pe.b,t}getStyle(t=Oe){$t.workingToColorSpace(Pe.copy(this),t);let e=Pe.r,n=Pe.g,s=Pe.b;return t!==Oe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Bn),this.setHSL(Bn.h+t,Bn.s+e,Bn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Bn),t.getHSL(lr);let n=vs(Bn.h,lr.h,e),s=vs(Bn.s,lr.s,e),r=vs(Bn.l,lr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Pe=new zt;zt.NAMES=vh;var Xi=class extends Be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gn,this.environmentIntensity=1,this.environmentRotation=new Gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},en=new R,An=new R,Ao=new R,Tn=new R,Ei=new R,wi=new R,yc=new R,To=new R,Eo=new R,wo=new R,Co=new me,Ro=new me,Po=new me,Cn=class i{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),en.subVectors(t,e),s.cross(en);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){en.subVectors(s,e),An.subVectors(n,e),Ao.subVectors(t,e);let a=en.dot(en),o=en.dot(An),c=en.dot(Ao),l=An.dot(An),u=An.dot(Ao),p=a*l-o*o;if(p===0)return r.set(0,0,0),null;let h=1/p,f=(l*c-o*u)*h,_=(a*u-o*c)*h;return r.set(1-f-_,_,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Tn)===null?!1:Tn.x>=0&&Tn.y>=0&&Tn.x+Tn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,Tn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Tn.x),c.addScaledVector(a,Tn.y),c.addScaledVector(o,Tn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return Co.setScalar(0),Ro.setScalar(0),Po.setScalar(0),Co.fromBufferAttribute(t,e),Ro.fromBufferAttribute(t,n),Po.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Co,r.x),a.addScaledVector(Ro,r.y),a.addScaledVector(Po,r.z),a}static isFrontFacing(t,e,n,s){return en.subVectors(n,e),An.subVectors(t,e),en.cross(An).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return en.subVectors(this.c,this.b),An.subVectors(this.a,this.b),en.cross(An).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Ei.subVectors(s,n),wi.subVectors(r,n),To.subVectors(t,n);let c=Ei.dot(To),l=wi.dot(To);if(c<=0&&l<=0)return e.copy(n);Eo.subVectors(t,s);let u=Ei.dot(Eo),p=wi.dot(Eo);if(u>=0&&p<=u)return e.copy(s);let h=c*p-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(n).addScaledVector(Ei,a);wo.subVectors(t,r);let f=Ei.dot(wo),_=wi.dot(wo);if(_>=0&&f<=_)return e.copy(r);let y=f*l-c*_;if(y<=0&&l>=0&&_<=0)return o=l/(l-_),e.copy(n).addScaledVector(wi,o);let g=u*_-f*p;if(g<=0&&p-u>=0&&f-_>=0)return yc.subVectors(r,s),o=(p-u)/(p-u+(f-_)),e.copy(s).addScaledVector(yc,o);let d=1/(g+y+h);return a=y*d,o=h*d,e.copy(n).addScaledVector(Ei,a).addScaledVector(wi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Hn=class{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(nn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(nn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=nn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,nn):nn.fromBufferAttribute(r,a),nn.applyMatrix4(t.matrixWorld),this.expandByPoint(nn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),cr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),cr.copy(n.boundingBox)),cr.applyMatrix4(t.matrixWorld),this.union(cr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,nn),nn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(us),hr.subVectors(this.max,us),Ci.subVectors(t.a,us),Ri.subVectors(t.b,us),Pi.subVectors(t.c,us),zn.subVectors(Ri,Ci),Vn.subVectors(Pi,Ri),ai.subVectors(Ci,Pi);let e=[0,-zn.z,zn.y,0,-Vn.z,Vn.y,0,-ai.z,ai.y,zn.z,0,-zn.x,Vn.z,0,-Vn.x,ai.z,0,-ai.x,-zn.y,zn.x,0,-Vn.y,Vn.x,0,-ai.y,ai.x,0];return!Io(e,Ci,Ri,Pi,hr)||(e=[1,0,0,0,1,0,0,0,1],!Io(e,Ci,Ri,Pi,hr))?!1:(ur.crossVectors(zn,Vn),e=[ur.x,ur.y,ur.z],Io(e,Ci,Ri,Pi,hr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,nn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(nn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(En[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),En[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),En[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),En[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),En[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),En[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),En[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),En[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(En),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},En=[new R,new R,new R,new R,new R,new R,new R,new R],nn=new R,cr=new Hn,Ci=new R,Ri=new R,Pi=new R,zn=new R,Vn=new R,ai=new R,us=new R,hr=new R,ur=new R,oi=new R;function Io(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){oi.fromArray(i,r);let o=s.x*Math.abs(oi.x)+s.y*Math.abs(oi.y)+s.z*Math.abs(oi.z),c=t.dot(oi),l=e.dot(oi),u=n.dot(oi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var ve=new R,dr=new Lt,Ju=0,Xe=class extends an{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ju++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ml,this.updateRanges=[],this.gpuType=cn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)dr.fromBufferAttribute(this,e),dr.applyMatrix3(t),this.setXY(e,dr.x,dr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=sn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=sn(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=sn(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=sn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=sn(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Cs=class extends Xe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Rs=class extends Xe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ae=class extends Xe{constructor(t,e,n){super(new Float32Array(t),e,n)}},Ku=new Hn,ds=new R,Lo=new R,Wn=class{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Ku.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ds.subVectors(t,this.center);let e=ds.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ds,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Lo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ds.copy(t.center).add(Lo)),this.expandByPoint(ds.copy(t.center).sub(Lo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},ju=0,Je=new pe,Do=new Be,Ii=new R,He=new Hn,fs=new Hn,Te=new R,ye=class i extends an{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=Rn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Su(t)?Rs:Cs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ot().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Je.makeRotationFromQuaternion(t),this.applyMatrix4(Je),this}rotateX(t){return Je.makeRotationX(t),this.applyMatrix4(Je),this}rotateY(t){return Je.makeRotationY(t),this.applyMatrix4(Je),this}rotateZ(t){return Je.makeRotationZ(t),this.applyMatrix4(Je),this}translate(t,e,n){return Je.makeTranslation(t,e,n),this.applyMatrix4(Je),this}scale(t,e,n){return Je.makeScale(t,e,n),this.applyMatrix4(Je),this}lookAt(t){return Do.lookAt(t),Do.updateMatrix(),this.applyMatrix4(Do.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ii).negate(),this.translate(Ii.x,Ii.y,Ii.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ae(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&It("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Nt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];He.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,He.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,He.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(He.min),this.boundingBox.expandByPoint(He.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Nt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Nt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){let n=this.boundingSphere.center;if(He.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];fs.setFromBufferAttribute(o),this.morphTargetsRelative?(Te.addVectors(He.min,fs.min),He.expandByPoint(Te),Te.addVectors(He.max,fs.max),He.expandByPoint(Te)):(He.expandByPoint(fs.min),He.expandByPoint(fs.max))}He.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Te.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Te));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Te.fromBufferAttribute(o,l),c&&(Ii.fromBufferAttribute(t,l),Te.add(Ii)),s=Math.max(s,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Nt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Nt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Xe(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let x=0;x<n.count;x++)o[x]=new R,c[x]=new R;let l=new R,u=new R,p=new R,h=new Lt,f=new Lt,_=new Lt,y=new R,g=new R;function d(x,T,U){l.fromBufferAttribute(n,x),u.fromBufferAttribute(n,T),p.fromBufferAttribute(n,U),h.fromBufferAttribute(r,x),f.fromBufferAttribute(r,T),_.fromBufferAttribute(r,U),u.sub(l),p.sub(l),f.sub(h),_.sub(h);let F=1/(f.x*_.y-_.x*f.y);isFinite(F)&&(y.copy(u).multiplyScalar(_.y).addScaledVector(p,-f.y).multiplyScalar(F),g.copy(p).multiplyScalar(f.x).addScaledVector(u,-_.x).multiplyScalar(F),o[x].add(y),o[T].add(y),o[U].add(y),c[x].add(g),c[T].add(g),c[U].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let x=0,T=E.length;x<T;++x){let U=E[x],F=U.start,k=U.count;for(let W=F,N=F+k;W<N;W+=3)d(t.getX(W+0),t.getX(W+1),t.getX(W+2))}let L=new R,M=new R,b=new R,A=new R;function C(x){b.fromBufferAttribute(s,x),A.copy(b);let T=o[x];L.copy(T),L.sub(b.multiplyScalar(b.dot(T))).normalize(),M.crossVectors(A,T);let F=M.dot(c[x])<0?-1:1;a.setXYZW(x,L.x,L.y,L.z,F)}for(let x=0,T=E.length;x<T;++x){let U=E[x],F=U.start,k=U.count;for(let W=F,N=F+k;W<N;W+=3)C(t.getX(W+0)),C(t.getX(W+1)),C(t.getX(W+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Xe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);let s=new R,r=new R,a=new R,o=new R,c=new R,l=new R,u=new R,p=new R;if(t)for(let h=0,f=t.count;h<f;h+=3){let _=t.getX(h+0),y=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,g),u.subVectors(a,r),p.subVectors(s,r),u.cross(p),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,g),o.add(u),c.add(u),l.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let h=0,f=e.count;h<f;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),p.subVectors(s,r),u.cross(p),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(o,c){let l=o.array,u=o.itemSize,p=o.normalized,h=new l.constructor(c.length*u),f=0,_=0;for(let y=0,g=c.length;y<g;y++){o.isInterleavedBufferAttribute?f=c[y]*o.data.stride+o.offset:f=c[y]*u;for(let d=0;d<u;d++)h[_++]=l[f++]}return new Xe(h,u,p)}if(this.index===null)return It("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=t(c,n);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let u=0,p=l.length;u<p;u++){let h=l[u],f=t(h,n);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let p=0,h=l.length;p<h;p++){let f=l[p];u.push(f.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(e))}let r=t.morphAttributes;for(let l in r){let u=[],p=r[l];for(let h=0,f=p.length;h<f;h++)u.push(p[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,u=a.length;l<u;l++){let p=a[l];this.addGroup(p.start,p.count,p.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yr=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ml,this.updateRanges=[],this.version=0,this.uuid=Rn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Rn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Rn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}},Ne=new R,Ps=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=sn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=sn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=sn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=sn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=sn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Ts("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Xe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Ts("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Uo=new R,Qu=new R,td=new Ot,We=class{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Uo.subVectors(n,e).cross(Qu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Uo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||td.getNormalMatrix(t),s=this.coplanarPoint(Uo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},ed=0,xn=class extends an{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=Rn(),this.name="",this.type="Material",this.blending=ji,this.side=Qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Jo,this.blendDst=Ko,this.blendEquation=pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=Vi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=lh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Dr,this.stencilZFail=Dr,this.stencilZPass=Dr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){It(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){It(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new zt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new We().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Lt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Lt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},di=class extends xn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Li,ps=new R,Di=new R,Ui=new R,Ni=new Lt,ms=new Lt,yh=new pe,fr=new R,gs=new R,pr=new R,Mc=new Lt,No=new Lt,Sc=new Lt,qi=class extends Be{constructor(t=new di){if(super(),this.isSprite=!0,this.type="Sprite",Li===void 0){Li=new ye;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Yr(e,5);Li.setIndex([0,1,2,0,2,3]),Li.setAttribute("position",new Ps(n,3,0,!1)),Li.setAttribute("uv",new Ps(n,2,3,!1))}this.geometry=Li,this.material=t,this.center=new Lt(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Nt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Di.setFromMatrixScale(this.matrixWorld),yh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ui.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Di.multiplyScalar(-Ui.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;mr(fr.set(-.5,-.5,0),Ui,a,Di,s,r),mr(gs.set(.5,-.5,0),Ui,a,Di,s,r),mr(pr.set(.5,.5,0),Ui,a,Di,s,r),Mc.set(0,0),No.set(1,0),Sc.set(1,1);let o=t.ray.intersectTriangle(fr,gs,pr,!1,ps);if(o===null&&(mr(gs.set(-.5,.5,0),Ui,a,Di,s,r),No.set(0,1),o=t.ray.intersectTriangle(fr,pr,gs,!1,ps),o===null))return;let c=t.ray.origin.distanceTo(ps);c<t.near||c>t.far||e.push({distance:c,point:ps.clone(),uv:Cn.getInterpolation(ps,fr,gs,pr,Mc,No,Sc,new Lt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function mr(i,t,e,n,s,r){Ni.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(ms.x=r*Ni.x-s*Ni.y,ms.y=s*Ni.x+r*Ni.y):ms.copy(Ni),i.copy(t),i.x+=ms.x,i.y+=ms.y,i.applyMatrix4(yh)}var wn=new R,Oo=new R,gr=new R,_r=new R,Xn=class{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,wn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=wn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(wn.copy(this.origin).addScaledVector(this.direction,e),wn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Oo.copy(t).add(e).multiplyScalar(.5),gr.copy(e).sub(t).normalize(),_r.copy(this.origin).sub(Oo);let r=t.distanceTo(e)*.5,a=-this.direction.dot(gr),o=_r.dot(this.direction),c=-_r.dot(gr),l=_r.lengthSq(),u=Math.abs(1-a*a),p,h,f,_;if(u>0)if(p=a*c-o,h=a*o-c,_=r*u,p>=0)if(h>=-_)if(h<=_){let y=1/u;p*=y,h*=y,f=p*(p+a*h+2*o)+h*(a*p+h+2*c)+l}else h=r,p=Math.max(0,-(a*h+o)),f=-p*p+h*(h+2*c)+l;else h=-r,p=Math.max(0,-(a*h+o)),f=-p*p+h*(h+2*c)+l;else h<=-_?(p=Math.max(0,-(-a*r+o)),h=p>0?-r:Math.min(Math.max(-r,-c),r),f=-p*p+h*(h+2*c)+l):h<=_?(p=0,h=Math.min(Math.max(-r,-c),r),f=h*(h+2*c)+l):(p=Math.max(0,-(a*r+o)),h=p>0?r:Math.min(Math.max(-r,-c),r),f=-p*p+h*(h+2*c)+l);else h=a>0?-r:r,p=Math.max(0,-(a*h+o)),f=-p*p+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Oo).addScaledVector(gr,h),f}intersectSphere(t,e){if(t.radius<0)return null;wn.subVectors(t.center,this.origin);let n=wn.dot(this.direction),s=wn.dot(wn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c,l=1/this.direction.x,u=1/this.direction.y,p=1/this.direction.z,h=this.origin;return l>=0?(n=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(n=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),p>=0?(o=(t.min.z-h.z)*p,c=(t.max.z-h.z)*p):(o=(t.max.z-h.z)*p,c=(t.min.z-h.z)*p),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,wn)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,p=t.x-a.x,h=t.y-a.y,f=t.z-a.z,_=e.x-a.x,y=e.y-a.y,g=e.z-a.z,d=n.x-a.x,E=n.y-a.y,L=n.z-a.z,M=Math.abs(c),b=Math.abs(l),A=Math.abs(u),C,x,T,U,F,k,W,N,G,K,q,it;if(M>=b&&M>=A?(T=c,k=p,G=_,it=d,c>=0?(C=l,x=u,U=h,F=f,W=y,N=g,K=E,q=L):(C=u,x=l,U=f,F=h,W=g,N=y,K=L,q=E)):b>=A?(T=l,k=h,G=y,it=E,l>=0?(C=u,x=c,U=f,F=p,W=g,N=_,K=L,q=d):(C=c,x=u,U=p,F=f,W=_,N=g,K=d,q=L)):(T=u,k=f,G=g,it=L,u>=0?(C=c,x=l,U=p,F=h,W=_,N=y,K=d,q=E):(C=l,x=c,U=h,F=p,W=y,N=_,K=E,q=d)),T===0)return null;let Y=C/T,tt=x/T,et=1/T,Tt=U-Y*k,vt=F-tt*k,ee=W-Y*G,Ht=N-tt*G,Jt=K-Y*it,Z=q-tt*it,I=Jt*Ht-Z*ee,nt=Tt*Z-vt*Jt,J=ee*vt-Ht*Tt;if(s){if(I<0||nt<0||J<0)return null}else if((I<0||nt<0||J<0)&&(I>0||nt>0||J>0))return null;let rt=I+nt+J;if(rt===0)return null;let yt=et*(I*k+nt*G+J*it);return(rt>0?yt<0:yt>0)?null:this.at(yt/rt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Is=class extends xn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.combine=jo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},bc=new pe,li=new Xn,xr=new Wn,Ac=new R,vr=new R,yr=new R,Mr=new R,Fo=new R,Sr=new R,Tc=new R,br=new R,ze=class extends Be{constructor(t=new ye,e=new Is){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Sr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=o[c],p=r[c];u!==0&&(Fo.fromBufferAttribute(p,t),a?Sr.addScaledVector(Fo,u):Sr.addScaledVector(Fo.sub(e),u))}e.add(Sr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xr.copy(n.boundingSphere),xr.applyMatrix4(r),li.copy(t.ray).recast(t.near),!(xr.containsPoint(li.origin)===!1&&(li.intersectSphere(xr,Ac)===null||li.origin.distanceToSquared(Ac)>(t.far-t.near)**2))&&(bc.copy(r).invert(),li.copy(t.ray).applyMatrix4(bc),!(n.boundingBox!==null&&li.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,li)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,p=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,y=h.length;_<y;_++){let g=h[_],d=a[g.materialIndex],E=Math.max(g.start,f.start),L=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let M=E,b=L;M<b;M+=3){let A=o.getX(M),C=o.getX(M+1),x=o.getX(M+2);s=Ar(this,d,t,n,l,u,p,A,C,x),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let _=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let g=_,d=y;g<d;g+=3){let E=o.getX(g),L=o.getX(g+1),M=o.getX(g+2);s=Ar(this,a,t,n,l,u,p,E,L,M),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,y=h.length;_<y;_++){let g=h[_],d=a[g.materialIndex],E=Math.max(g.start,f.start),L=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let M=E,b=L;M<b;M+=3){let A=M,C=M+1,x=M+2;s=Ar(this,d,t,n,l,u,p,A,C,x),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let _=Math.max(0,f.start),y=Math.min(c.count,f.start+f.count);for(let g=_,d=y;g<d;g+=3){let E=g,L=g+1,M=g+2;s=Ar(this,a,t,n,l,u,p,E,L,M),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function nd(i,t,e,n,s,r,a,o){let c;if(t.side===Le?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===Qn,o),c===null)return null;br.copy(o),br.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(br);return l<e.near||l>e.far?null:{distance:l,point:br.clone(),object:i}}function Ar(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,vr),i.getVertexPosition(c,yr),i.getVertexPosition(l,Mr);let u=nd(i,t,e,n,vr,yr,Mr,Tc);if(u){let p=new R;Cn.getBarycoord(Tc,vr,yr,Mr,p),s&&(u.uv=Cn.getInterpolatedAttribute(s,o,c,l,p,new Lt)),r&&(u.uv1=Cn.getInterpolatedAttribute(r,o,c,l,p,new Lt)),a&&(u.normal=Cn.getInterpolatedAttribute(a,o,c,l,p,new R),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:c,c:l,normal:new R,materialIndex:0};Cn.getNormal(vr,yr,Mr,h.normal),u.face=h,u.barycoord=p}return u}var Zr=class extends Fe{constructor(t=null,e=1,n=1,s,r,a,o,c,l=Ee,u=Ee,p,h){super(null,a,o,c,l,u,s,r,p,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ci=new Wn,id=new Lt(.5,.5),Tr=new R,Ls=class{constructor(t=new We,e=new We,n=new We,s=new We,r=new We,a=new We){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=rn,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],p=r[5],h=r[6],f=r[7],_=r[8],y=r[9],g=r[10],d=r[11],E=r[12],L=r[13],M=r[14],b=r[15];if(s[0].setComponents(l-a,f-u,d-_,b-E).normalize(),s[1].setComponents(l+a,f+u,d+_,b+E).normalize(),s[2].setComponents(l+o,f+p,d+y,b+L).normalize(),s[3].setComponents(l-o,f-p,d-y,b-L).normalize(),n)s[4].setComponents(c,h,g,M).normalize(),s[5].setComponents(l-c,f-h,d-g,b-M).normalize();else if(s[4].setComponents(l-c,f-h,d-g,b-M).normalize(),e===rn)s[5].setComponents(l+c,f+h,d+g,b+M).normalize();else if(e===bs)s[5].setComponents(c,h,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ci.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ci.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ci)}intersectsSprite(t){ci.center.set(0,0,0);let e=id.distanceTo(t.center);return ci.radius=.7071067811865476+e,ci.applyMatrix4(t.matrixWorld),this.intersectsSphere(ci)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Tr.x=s.normal.x>0?t.max.x:t.min.x,Tr.y=s.normal.y>0?t.max.y:t.min.y,Tr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Tr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Yi=class extends xn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},$r=new R,Jr=new R,Ec=new pe,_s=new Xn,Er=new Wn,Bo=new R,wc=new R,Kr=class extends Be{constructor(t=new ye,e=new Yi){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)$r.fromBufferAttribute(e,s-1),Jr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=$r.distanceTo(Jr);t.setAttribute("lineDistance",new ae(n,1))}else It("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Er.copy(n.boundingSphere),Er.applyMatrix4(s),Er.radius+=r,t.ray.intersectsSphere(Er)===!1)return;Ec.copy(s).invert(),_s.copy(t.ray).applyMatrix4(Ec);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){let f=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let y=f,g=_-1;y<g;y+=l){let d=u.getX(y),E=u.getX(y+1),L=wr(this,t,_s,c,d,E,y);L&&e.push(L)}if(this.isLineLoop){let y=u.getX(_-1),g=u.getX(f),d=wr(this,t,_s,c,y,g,_-1);d&&e.push(d)}}else{let f=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let y=f,g=_-1;y<g;y+=l){let d=wr(this,t,_s,c,y,y+1,y);d&&e.push(d)}if(this.isLineLoop){let y=wr(this,t,_s,c,_-1,f,_-1);y&&e.push(y)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function wr(i,t,e,n,s,r,a){let o=i.geometry.attributes.position;if($r.fromBufferAttribute(o,s),Jr.fromBufferAttribute(o,r),e.distanceSqToSegment($r,Jr,Bo,wc)>n)return;Bo.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Bo);if(!(l<t.near||l>t.far))return{distance:l,point:wc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Cc=new R,Rc=new R,Ds=class extends Kr{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Cc.fromBufferAttribute(e,s),Rc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Cc.distanceTo(Rc);t.setAttribute("lineDistance",new ae(n,1))}else It("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Us=class extends xn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Pc=new pe,Wo=new Xn,Cr=new Wn,Rr=new R,qn=class extends Be{constructor(t=new ye,e=new Us){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Cr.copy(n.boundingSphere),Cr.applyMatrix4(s),Cr.radius+=r,t.ray.intersectsSphere(Cr)===!1)return;Pc.copy(s).invert(),Wo.copy(t.ray).applyMatrix4(Pc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,p=n.attributes.position;if(l!==null){let h=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let _=h,y=f;_<y;_++){let g=l.getX(_);Rr.fromBufferAttribute(p,g),Ic(Rr,g,c,s,t,e,this)}}else{let h=Math.max(0,a.start),f=Math.min(p.count,a.start+a.count);for(let _=h,y=f;_<y;_++)Rr.fromBufferAttribute(p,_),Ic(Rr,_,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ic(i,t,e,n,s,r,a){let o=Wo.distanceSqToPoint(i);if(o<e){let c=new R;Wo.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var Ns=class extends Fe{constructor(t=[],e=ti,n,s,r,a,o,c,l,u){super(t,e,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},fi=class extends Fe{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Yn=class extends Fe{constructor(t,e,n=ln,s,r,a,o=Ee,c=Ee,l,u=_n,p=1){if(u!==_n&&u!==ni)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:p};super(h,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Hi(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},jr=class extends Yn{constructor(t,e=ln,n=ti,s,r,a=Ee,o=Ee,c,l=_n){let u={width:t,height:t,depth:1},p=[u,u,u,u,u,u];super(t,t,e,n,s,r,a,o,c,l),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Os=class extends Fe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Zi=class i extends ye{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],u=[],p=[],h=0,f=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,s,a,2),_("x","z","y",1,-1,t,n,-e,s,a,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ae(l,3)),this.setAttribute("normal",new ae(u,3)),this.setAttribute("uv",new ae(p,2));function _(y,g,d,E,L,M,b,A,C,x,T){let U=M/C,F=b/x,k=M/2,W=b/2,N=A/2,G=C+1,K=x+1,q=0,it=0,Y=new R;for(let tt=0;tt<K;tt++){let et=tt*F-W;for(let Tt=0;Tt<G;Tt++){let vt=Tt*U-k;Y[y]=vt*E,Y[g]=et*L,Y[d]=N,l.push(Y.x,Y.y,Y.z),Y[y]=0,Y[g]=0,Y[d]=A>0?1:-1,u.push(Y.x,Y.y,Y.z),p.push(Tt/C),p.push(1-tt/x),q+=1}}for(let tt=0;tt<x;tt++)for(let et=0;et<C;et++){let Tt=h+et+G*tt,vt=h+et+G*(tt+1),ee=h+(et+1)+G*(tt+1),Ht=h+(et+1)+G*tt;c.push(Tt,vt,Ht),c.push(vt,ee,Ht),it+=6}o.addGroup(f,it,T),f+=it,h+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Fs=class i extends ye{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,p=t/o,h=e/c,f=[],_=[],y=[],g=[];for(let d=0;d<u;d++){let E=d*h-a;for(let L=0;L<l;L++){let M=L*p-r;_.push(M,-E,0),y.push(0,0,1),g.push(L/o),g.push(1-d/c)}}for(let d=0;d<c;d++)for(let E=0;E<o;E++){let L=E+l*d,M=E+l*(d+1),b=E+1+l*(d+1),A=E+1+l*d;f.push(L,M,A),f.push(M,b,A)}this.setIndex(f),this.setAttribute("position",new ae(_,3)),this.setAttribute("normal",new ae(y,3)),this.setAttribute("uv",new ae(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var $i=class i extends ye{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,u=[],p=new R,h=new R,f=[],_=[],y=[],g=[];for(let d=0;d<=n;d++){let E=[],L=d/n,M=a+L*o,b=t*Math.cos(M),A=Math.sqrt(t*t-b*b),C=0;d===0&&a===0?C=.5/e:d===n&&c===Math.PI&&(C=-.5/e);for(let x=0;x<=e;x++){let T=x/e,U=s+T*r;p.x=-A*Math.cos(U),p.y=b,p.z=A*Math.sin(U),_.push(p.x,p.y,p.z),h.copy(p).normalize(),y.push(h.x,h.y,h.z),g.push(T+C,1-L),E.push(l++)}u.push(E)}for(let d=0;d<n;d++)for(let E=0;E<e;E++){let L=u[d][E+1],M=u[d][E],b=u[d+1][E],A=u[d+1][E+1];(d!==0||a>0)&&f.push(L,M,A),(d!==n-1||c<Math.PI)&&f.push(M,b,A)}this.setIndex(f),this.setAttribute("position",new ae(_,3)),this.setAttribute("normal",new ae(y,3)),this.setAttribute("uv",new ae(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function gi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Lc(s))s.isRenderTargetTexture?(It("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Lc(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function De(i){let t={};for(let e=0;e<i.length;e++){let n=gi(i[e]);for(let s in n)t[s]=n[s]}return t}function Lc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function sd(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function xl(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}var Mh={clone:gi,merge:De},rd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ad=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Me=class extends xn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rd,this.fragmentShader=ad,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=gi(t.uniforms),this.uniformsGroups=sd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new zt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Lt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new R().fromArray(s.value);break;case"v4":this.uniforms[n].value=new me().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ot().fromArray(s.value);break;case"m4":this.uniforms[n].value=new pe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Qr=class extends Me{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var ta=class extends xn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ah,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ea=class extends xn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Oi(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function zo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Zn=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},na=class extends Zn{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ko,endingEnd:ko}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Go:r=t,o=2*e-n;break;case Ho:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Go:a=t,c=2*n-e;break;case Ho:a=1,c=n+s[1]-s[0];break;default:a=t-1,c=e}let l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=this._offsetPrev,p=this._offsetNext,h=this._weightPrev,f=this._weightNext,_=(n-e)/(s-e),y=_*_,g=y*_,d=-h*g+2*h*y-h*_,E=(1+h)*g+(-1.5-2*h)*y+(-.5+h)*_+1,L=(-1-f)*g+(1.5+f)*y+.5*_,M=f*g-f*y;for(let b=0;b!==o;++b)r[b]=d*a[u+b]+E*a[l+b]+L*a[c+b]+M*a[p+b];return r}},ia=class extends Zn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=(n-e)/(s-e),p=1-u;for(let h=0;h!==o;++h)r[h]=a[l+h]*p+a[c+h]*u;return r}},sa=class extends Zn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},ra=class extends Zn{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=this.inTangents,p=this.outTangents;if(!u||!p){let _=(n-e)/(s-e),y=1-_;for(let g=0;g!==o;++g)r[g]=a[l+g]*y+a[c+g]*_;return r}let h=o*2,f=t-1;for(let _=0;_!==o;++_){let y=a[l+_],g=a[c+_],d=f*h+_*2,E=p[d],L=p[d+1],M=t*h+_*2,b=u[M],A=u[M+1],C=ld(n,e,E,b,s);r[_]=Sh(C,y,L,A,g)}return r}};function Sh(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function od(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function ld(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=Sh(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let c=od(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var Ye=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Oi(e,this.TimeBufferType),this.values=Oi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Oi(t.times,Array),values:Oi(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),zo(t.settings)&&(n.settings={inTangents:Oi(t.settings.inTangents,Array),outTangents:Oi(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new sa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ia(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new na(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new ra(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case ys:e=this.InterpolantFactoryMethodDiscrete;break;case Hr:e=this.InterpolantFactoryMethodLinear;break;case Lr:e=this.InterpolantFactoryMethodSmooth;break;case Vo:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return It("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ys;case this.InterpolantFactoryMethodLinear:return Hr;case this.InterpolantFactoryMethodSmooth:return Lr;case this.InterpolantFactoryMethodBezier:return Vo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;zo(this.settings)&&(Dc(this.settings.inTangents,t),Dc(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Nt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Nt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Nt("KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){Nt("KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&bu(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Nt("KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Lr,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],u=t[o+1];if(l!==u&&(o!==1||l!==t[0]))if(s)c=!0;else{let p=o*n,h=p-n,f=p+n;for(let _=0;_!==n;++_){let y=e[p+_];if(y!==e[h+_]||y!==e[f+_]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let p=o*n,h=a*n;for(let f=0;f!==n;++f)e[h+f]=e[p+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,zo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Dc(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}Ye.prototype.ValueTypeName="";Ye.prototype.TimeBufferType=Float32Array;Ye.prototype.ValueBufferType=Float32Array;Ye.prototype.DefaultInterpolation=Hr;var $n=class extends Ye{constructor(t,e,n){super(t,e,n)}};$n.prototype.ValueTypeName="bool";$n.prototype.ValueBufferType=Array;$n.prototype.DefaultInterpolation=ys;$n.prototype.InterpolantFactoryMethodLinear=void 0;$n.prototype.InterpolantFactoryMethodSmooth=void 0;var aa=class extends Ye{constructor(t,e,n,s){super(t,e,n,s)}};aa.prototype.ValueTypeName="color";var oa=class extends Ye{constructor(t,e,n,s){super(t,e,n,s)}};oa.prototype.ValueTypeName="number";var la=class extends Zn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(s-e),l=t*o;for(let u=l+o;l!==u;l+=4)qe.slerpFlat(r,0,a,l-o,a,l,c);return r}},Bs=class extends Ye{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new la(this.times,this.values,this.getValueSize(),t)}};Bs.prototype.ValueTypeName="quaternion";Bs.prototype.InterpolantFactoryMethodSmooth=void 0;var Jn=class extends Ye{constructor(t,e,n){super(t,e,n)}};Jn.prototype.ValueTypeName="string";Jn.prototype.ValueBufferType=Array;Jn.prototype.DefaultInterpolation=ys;Jn.prototype.InterpolantFactoryMethodLinear=void 0;Jn.prototype.InterpolantFactoryMethodSmooth=void 0;var ca=class extends Ye{constructor(t,e,n,s){super(t,e,n,s)}};ca.prototype.ValueTypeName="vector";var ha=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,p){return l.push(u,p),this},this.removeHandler=function(u){let p=l.indexOf(u);return p!==-1&&l.splice(p,2),this},this.getHandler=function(u){for(let p=0,h=l.length;p<h;p+=2){let f=l[p],_=l[p+1];if(f.global&&(f.lastIndex=0),f.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},bh=new ha,ua=class{constructor(t){this.manager=t!==void 0?t:bh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};ua.DEFAULT_MATERIAL_NAME="__DEFAULT";var Pr=new R,Ir=new qe,mn=new R,zs=class extends Be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe,this.coordinateSystem=rn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Pr,Ir,mn),mn.x===1&&mn.y===1&&mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Pr,Ir,mn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Pr,Ir,mn),mn.x===1&&mn.y===1&&mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Pr,Ir,mn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},kn=new R,Uc=new Lt,Nc=new Lt,Ie=class extends zs{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Gi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(xs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Gi*2*Math.atan(Math.tan(xs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(kn.x,kn.y).multiplyScalar(-t/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(kn.x,kn.y).multiplyScalar(-t/kn.z)}getViewSize(t,e){return this.getViewBounds(t,Uc,Nc),e.subVectors(Nc,Uc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(xs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Vs=class extends zs{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var Fi=-90,Bi=1,da=class extends Be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ie(Fi,Bi,t,e);s.layers=this.layers,this.add(s);let r=new Ie(Fi,Bi,t,e);r.layers=this.layers,this.add(r);let a=new Ie(Fi,Bi,t,e);a.layers=this.layers,this.add(a);let o=new Ie(Fi,Bi,t,e);o.layers=this.layers,this.add(o);let c=new Ie(Fi,Bi,t,e);c.layers=this.layers,this.add(c);let l=new Ie(Fi,Bi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===rn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===bs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,u]=this.children,p=t.getRenderTarget(),h=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(p,h,f),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},fa=class extends Ie{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var vl="\\[\\]\\.:\\/",cd=new RegExp("["+vl+"]","g"),yl="[^"+vl+"]",hd="[^"+vl.replace("\\.","")+"]",ud=/((?:WC+[\/:])*)/.source.replace("WC",yl),dd=/(WCOD+)?/.source.replace("WCOD",hd),fd=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",yl),pd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",yl),md=new RegExp("^"+ud+dd+fd+pd+"$"),gd=["material","materials","bones","map"],Xo=class{constructor(t,e,n){let s=n||fe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},fe=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(cd,"")}static parseTrackName(t){let e=md.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);gd.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=n(o.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){It("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){Nt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Nt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Nt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Nt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Nt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Nt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){Nt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[s];if(a===void 0){let l=e.nodeName;Nt("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Nt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Nt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};fe.Composite=Xo;fe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};fe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};fe.prototype.GetterByBindingType=[fe.prototype._getValue_direct,fe.prototype._getValue_array,fe.prototype._getValue_arrayElement,fe.prototype._getValue_toArray];fe.prototype.SetterByBindingTypeAndVersioning=[[fe.prototype._setValue_direct,fe.prototype._setValue_direct_setNeedsUpdate,fe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[fe.prototype._setValue_array,fe.prototype._setValue_array_setNeedsUpdate,fe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[fe.prototype._setValue_arrayElement,fe.prototype._setValue_arrayElement_setNeedsUpdate,fe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[fe.prototype._setValue_fromArray,fe.prototype._setValue_fromArray_setNeedsUpdate,fe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var B1=new Float32Array(1);var Ji=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Xt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Xt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var El=class El{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};El.prototype.isMatrix2=!0;var qo=El;var ks=class extends an{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Ml(i,t,e,n){let s=_d(n);switch(e){case ul:return i*t;case fl:return i*t/s.components*s.byteLength;case Ma:return i*t/s.components*s.byteLength;case ii:return i*t*2/s.components*s.byteLength;case Sa:return i*t*2/s.components*s.byteLength;case dl:return i*t*3/s.components*s.byteLength;case Ke:return i*t*4/s.components*s.byteLength;case ba:return i*t*4/s.components*s.byteLength;case Xs:case qs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ys:case Zs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ta:case wa:return Math.max(i,16)*Math.max(t,8)/4;case Aa:case Ea:return Math.max(i,8)*Math.max(t,8)/2;case Ca:case Ra:case Ia:case La:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Pa:case $s:case Da:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ua:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Na:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Oa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Fa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ba:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case za:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Va:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ka:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ga:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ha:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Wa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Xa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case qa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ya:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Za:case $a:case Ja:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ka:case ja:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Js:case Qa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function _d(i){switch(i){case Ze:case ol:return{byteLength:1,components:1};case Qi:case ll:case hn:return{byteLength:2,components:1};case va:case ya:return{byteLength:2,components:4};case ln:case xa:case cn:return{byteLength:4,components:1};case cl:case hl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window!="undefined"&&(window.__THREE__?It("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Xh(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function vd(i){let t=new WeakMap;function e(o,c){let l=o.array,u=o.usage,p=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array!="undefined"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:p}}function n(o,c,l){let u=c.array,p=c.updateRanges;if(i.bindBuffer(l,o),p.length===0)i.bufferSubData(l,0,u);else{p.sort((f,_)=>f.start-_.start);let h=0;for(let f=1;f<p.length;f++){let _=p[h],y=p[f];y.start<=_.start+_.count+1?_.count=Math.max(_.count,y.start+y.count-_.start):(++h,p[h]=y)}p.length=h+1;for(let f=0,_=p.length;f<_;f++){let y=p[f];i.bufferSubData(l,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var yd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Md=`#ifdef USE_ALPHAHASH
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
#endif`,Sd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,bd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ad=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Td=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ed=`#ifdef USE_AOMAP
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
#endif`,wd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cd=`#ifdef USE_BATCHING
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
#endif`,Rd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Pd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Id=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ld=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Dd=`#ifdef USE_IRIDESCENCE
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
#endif`,Ud=`#ifdef USE_BUMPMAP
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
#endif`,Nd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Vd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,kd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Gd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Hd=`#define PI 3.141592653589793
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
} // validated`,Wd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Xd=`vec3 transformedNormal = objectNormal;
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
#endif`,qd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$d=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Kd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,jd=`#ifdef USE_ENVMAP
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
#endif`,Qd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,tf=`#ifdef USE_ENVMAP
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
#endif`,ef=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nf=`#ifdef USE_ENVMAP
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
#endif`,sf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,af=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,of=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lf=`#ifdef USE_GRADIENTMAP
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
}`,cf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,uf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,df=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ff=`#ifdef USE_ENVMAP
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
#endif`,pf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_f=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xf=`PhysicalMaterial material;
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
#endif`,vf=`uniform sampler2D dfgLUT;
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
}`,yf=`
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
#endif`,Mf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bf=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Af=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ef=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,If=`#if defined( USE_POINTS_UV )
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
#endif`,Lf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Df=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Uf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Of=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ff=`#ifdef USE_MORPHTARGETS
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
#endif`,Bf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Vf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,kf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Wf=`#ifdef USE_NORMALMAP
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
#endif`,Xf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$f=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Kf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ep=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,np=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ip=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ap=`float getShadowMask() {
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
}`,op=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lp=`#ifdef USE_SKINNING
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
#endif`,cp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hp=`#ifdef USE_SKINNING
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
#endif`,up=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,mp=`#ifdef USE_TRANSMISSION
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
#endif`,gp=`#ifdef USE_TRANSMISSION
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
#endif`,_p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Mp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sp=`uniform sampler2D t2D;
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
}`,bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ap=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ep=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wp=`#include <common>
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
}`,Cp=`#if DEPTH_PACKING == 3200
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
}`,Rp=`#define DISTANCE
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
}`,Pp=`#define DISTANCE
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
}`,Ip=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Lp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dp=`uniform float scale;
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
}`,Up=`uniform vec3 diffuse;
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
}`,Np=`#include <common>
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
}`,Op=`uniform vec3 diffuse;
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
}`,Fp=`#define LAMBERT
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
}`,Bp=`#define LAMBERT
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
}`,zp=`#define MATCAP
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
}`,Vp=`#define MATCAP
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
}`,kp=`#define NORMAL
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
}`,Gp=`#define NORMAL
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
}`,Hp=`#define PHONG
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
}`,Wp=`#define PHONG
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
}`,Xp=`#define STANDARD
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
}`,qp=`#define STANDARD
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
}`,Yp=`#define TOON
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
}`,Zp=`#define TOON
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
}`,$p=`uniform float size;
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
}`,Jp=`uniform vec3 diffuse;
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
}`,Kp=`#include <common>
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
}`,jp=`uniform vec3 color;
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
}`,Qp=`uniform float rotation;
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
}`,t0=`uniform vec3 diffuse;
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
}`,Gt={alphahash_fragment:yd,alphahash_pars_fragment:Md,alphamap_fragment:Sd,alphamap_pars_fragment:bd,alphatest_fragment:Ad,alphatest_pars_fragment:Td,aomap_fragment:Ed,aomap_pars_fragment:wd,batching_pars_vertex:Cd,batching_vertex:Rd,begin_vertex:Pd,beginnormal_vertex:Id,bsdfs:Ld,iridescence_fragment:Dd,bumpmap_pars_fragment:Ud,clipping_planes_fragment:Nd,clipping_planes_pars_fragment:Od,clipping_planes_pars_vertex:Fd,clipping_planes_vertex:Bd,color_fragment:zd,color_pars_fragment:Vd,color_pars_vertex:kd,color_vertex:Gd,common:Hd,cube_uv_reflection_fragment:Wd,defaultnormal_vertex:Xd,displacementmap_pars_vertex:qd,displacementmap_vertex:Yd,emissivemap_fragment:Zd,emissivemap_pars_fragment:$d,colorspace_fragment:Jd,colorspace_pars_fragment:Kd,envmap_fragment:jd,envmap_common_pars_fragment:Qd,envmap_pars_fragment:tf,envmap_pars_vertex:ef,envmap_physical_pars_fragment:ff,envmap_vertex:nf,fog_vertex:sf,fog_pars_vertex:rf,fog_fragment:af,fog_pars_fragment:of,gradientmap_pars_fragment:lf,lightmap_pars_fragment:cf,lights_lambert_fragment:hf,lights_lambert_pars_fragment:uf,lights_pars_begin:df,lights_toon_fragment:pf,lights_toon_pars_fragment:mf,lights_phong_fragment:gf,lights_phong_pars_fragment:_f,lights_physical_fragment:xf,lights_physical_pars_fragment:vf,lights_fragment_begin:yf,lights_fragment_maps:Mf,lights_fragment_end:Sf,lightprobes_pars_fragment:bf,logdepthbuf_fragment:Af,logdepthbuf_pars_fragment:Tf,logdepthbuf_pars_vertex:Ef,logdepthbuf_vertex:wf,map_fragment:Cf,map_pars_fragment:Rf,map_particle_fragment:Pf,map_particle_pars_fragment:If,metalnessmap_fragment:Lf,metalnessmap_pars_fragment:Df,morphinstance_vertex:Uf,morphcolor_vertex:Nf,morphnormal_vertex:Of,morphtarget_pars_vertex:Ff,morphtarget_vertex:Bf,normal_fragment_begin:zf,normal_fragment_maps:Vf,normal_pars_fragment:kf,normal_pars_vertex:Gf,normal_vertex:Hf,normalmap_pars_fragment:Wf,clearcoat_normal_fragment_begin:Xf,clearcoat_normal_fragment_maps:qf,clearcoat_pars_fragment:Yf,iridescence_pars_fragment:Zf,opaque_fragment:$f,packing:Jf,premultiplied_alpha_fragment:Kf,project_vertex:jf,dithering_fragment:Qf,dithering_pars_fragment:tp,roughnessmap_fragment:ep,roughnessmap_pars_fragment:np,shadowmap_pars_fragment:ip,shadowmap_pars_vertex:sp,shadowmap_vertex:rp,shadowmask_pars_fragment:ap,skinbase_vertex:op,skinning_pars_vertex:lp,skinning_vertex:cp,skinnormal_vertex:hp,specularmap_fragment:up,specularmap_pars_fragment:dp,tonemapping_fragment:fp,tonemapping_pars_fragment:pp,transmission_fragment:mp,transmission_pars_fragment:gp,uv_pars_fragment:_p,uv_pars_vertex:xp,uv_vertex:vp,worldpos_vertex:yp,background_vert:Mp,background_frag:Sp,backgroundCube_vert:bp,backgroundCube_frag:Ap,cube_vert:Tp,cube_frag:Ep,depth_vert:wp,depth_frag:Cp,distance_vert:Rp,distance_frag:Pp,equirect_vert:Ip,equirect_frag:Lp,linedashed_vert:Dp,linedashed_frag:Up,meshbasic_vert:Np,meshbasic_frag:Op,meshlambert_vert:Fp,meshlambert_frag:Bp,meshmatcap_vert:zp,meshmatcap_frag:Vp,meshnormal_vert:kp,meshnormal_frag:Gp,meshphong_vert:Hp,meshphong_frag:Wp,meshphysical_vert:Xp,meshphysical_frag:qp,meshtoon_vert:Yp,meshtoon_frag:Zp,points_vert:$p,points_frag:Jp,shadow_vert:Kp,shadow_frag:jp,sprite_vert:Qp,sprite_frag:t0},ft={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new Lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new Lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},Sn={basic:{uniforms:De([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:De([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new zt(0)},envMapIntensity:{value:1}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:De([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:De([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:De([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new zt(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:De([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:De([ft.points,ft.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:De([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:De([ft.common,ft.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:De([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:De([ft.sprite,ft.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distance:{uniforms:De([ft.common,ft.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distance_vert,fragmentShader:Gt.distance_frag},shadow:{uniforms:De([ft.lights,ft.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};Sn.physical={uniforms:De([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new Lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new Lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new Lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};var no={r:0,b:0,g:0},e0=new pe,qh=new Ot;qh.set(-1,0,0,0,1,0,0,0,1);function n0(i,t,e,n,s,r){let a=new zt(0),o=s===!0?0:1,c,l,u=null,p=0,h=null;function f(E){let L=E.isScene===!0?E.background:null;if(L&&L.isTexture){let M=E.backgroundBlurriness>0;L=t.get(L,M)}return L}function _(E){let L=!1,M=f(E);M===null?g(a,o):M&&M.isColor&&(g(M,1),L=!0);let b=i.xr.getEnvironmentBlendMode();b==="additive"?e.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||L)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(E,L){let M=f(L);M&&(M.isCubeTexture||M.mapping===Hs)?(l===void 0&&(l=new ze(new Zi(1,1,1),new Me({name:"BackgroundCubeMaterial",uniforms:gi(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:Le,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(b,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(e0.makeRotationFromEuler(L.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(qh),l.material.toneMapped=$t.getTransfer(M.colorSpace)!==se,(u!==M||p!==M.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=M,p=M.version,h=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new ze(new Fs(2,2),new Me({name:"BackgroundMaterial",uniforms:gi(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,c.material.toneMapped=$t.getTransfer(M.colorSpace)!==se,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||p!==M.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=M,p=M.version,h=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function g(E,L){E.getRGB(no,xl(i)),e.buffers.color.setClear(no.r,no.g,no.b,L,r)}function d(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,L=1){a.set(E),o=L,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,g(a,o)},render:_,addToRenderList:y,dispose:d}}function i0(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,a=!1;function o(F,k,W,N,G){let K=!1,q=p(F,N,W,k);r!==q&&(r=q,l(r.object)),K=f(F,N,W,G),K&&_(F,N,W,G),G!==null&&t.update(G,i.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,M(F,k,W,N),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function c(){return i.createVertexArray()}function l(F){return i.bindVertexArray(F)}function u(F){return i.deleteVertexArray(F)}function p(F,k,W,N){let G=N.wireframe===!0,K=n[k.id];K===void 0&&(K={},n[k.id]=K);let q=F.isInstancedMesh===!0?F.id:0,it=K[q];it===void 0&&(it={},K[q]=it);let Y=it[W.id];Y===void 0&&(Y={},it[W.id]=Y);let tt=Y[G];return tt===void 0&&(tt=h(c()),Y[G]=tt),tt}function h(F){let k=[],W=[],N=[];for(let G=0;G<e;G++)k[G]=0,W[G]=0,N[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:W,attributeDivisors:N,object:F,attributes:{},index:null}}function f(F,k,W,N){let G=r.attributes,K=k.attributes,q=0,it=W.getAttributes();for(let Y in it)if(it[Y].location>=0){let et=G[Y],Tt=K[Y];if(Tt===void 0&&(Y==="instanceMatrix"&&F.instanceMatrix&&(Tt=F.instanceMatrix),Y==="instanceColor"&&F.instanceColor&&(Tt=F.instanceColor)),et===void 0||et.attribute!==Tt||Tt&&et.data!==Tt.data)return!0;q++}return r.attributesNum!==q||r.index!==N}function _(F,k,W,N){let G={},K=k.attributes,q=0,it=W.getAttributes();for(let Y in it)if(it[Y].location>=0){let et=K[Y];et===void 0&&(Y==="instanceMatrix"&&F.instanceMatrix&&(et=F.instanceMatrix),Y==="instanceColor"&&F.instanceColor&&(et=F.instanceColor));let Tt={};Tt.attribute=et,et&&et.data&&(Tt.data=et.data),G[Y]=Tt,q++}r.attributes=G,r.attributesNum=q,r.index=N}function y(){let F=r.newAttributes;for(let k=0,W=F.length;k<W;k++)F[k]=0}function g(F){d(F,0)}function d(F,k){let W=r.newAttributes,N=r.enabledAttributes,G=r.attributeDivisors;W[F]=1,N[F]===0&&(i.enableVertexAttribArray(F),N[F]=1),G[F]!==k&&(i.vertexAttribDivisor(F,k),G[F]=k)}function E(){let F=r.newAttributes,k=r.enabledAttributes;for(let W=0,N=k.length;W<N;W++)k[W]!==F[W]&&(i.disableVertexAttribArray(W),k[W]=0)}function L(F,k,W,N,G,K,q){q===!0?i.vertexAttribIPointer(F,k,W,G,K):i.vertexAttribPointer(F,k,W,N,G,K)}function M(F,k,W,N){y();let G=N.attributes,K=W.getAttributes(),q=k.defaultAttributeValues;for(let it in K){let Y=K[it];if(Y.location>=0){let tt=G[it];if(tt===void 0&&(it==="instanceMatrix"&&F.instanceMatrix&&(tt=F.instanceMatrix),it==="instanceColor"&&F.instanceColor&&(tt=F.instanceColor)),tt!==void 0){let et=tt.normalized,Tt=tt.itemSize,vt=t.get(tt);if(vt===void 0)continue;let ee=vt.buffer,Ht=vt.type,Jt=vt.bytesPerElement,Z=Ht===i.INT||Ht===i.UNSIGNED_INT||tt.gpuType===xa;if(tt.isInterleavedBufferAttribute){let I=tt.data,nt=I.stride,J=tt.offset;if(I.isInstancedInterleavedBuffer){for(let rt=0;rt<Y.locationSize;rt++)d(Y.location+rt,I.meshPerAttribute);F.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=I.meshPerAttribute*I.count)}else for(let rt=0;rt<Y.locationSize;rt++)g(Y.location+rt);i.bindBuffer(i.ARRAY_BUFFER,ee);for(let rt=0;rt<Y.locationSize;rt++)L(Y.location+rt,Tt/Y.locationSize,Ht,et,nt*Jt,(J+Tt/Y.locationSize*rt)*Jt,Z)}else{if(tt.isInstancedBufferAttribute){for(let I=0;I<Y.locationSize;I++)d(Y.location+I,tt.meshPerAttribute);F.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let I=0;I<Y.locationSize;I++)g(Y.location+I);i.bindBuffer(i.ARRAY_BUFFER,ee);for(let I=0;I<Y.locationSize;I++)L(Y.location+I,Tt/Y.locationSize,Ht,et,Tt*Jt,Tt/Y.locationSize*I*Jt,Z)}}else if(q!==void 0){let et=q[it];if(et!==void 0)switch(et.length){case 2:i.vertexAttrib2fv(Y.location,et);break;case 3:i.vertexAttrib3fv(Y.location,et);break;case 4:i.vertexAttrib4fv(Y.location,et);break;default:i.vertexAttrib1fv(Y.location,et)}}}}E()}function b(){T();for(let F in n){let k=n[F];for(let W in k){let N=k[W];for(let G in N){let K=N[G];for(let q in K)u(K[q].object),delete K[q];delete N[G]}}delete n[F]}}function A(F){if(n[F.id]===void 0)return;let k=n[F.id];for(let W in k){let N=k[W];for(let G in N){let K=N[G];for(let q in K)u(K[q].object),delete K[q];delete N[G]}}delete n[F.id]}function C(F){for(let k in n){let W=n[k];for(let N in W){let G=W[N];if(G[F.id]===void 0)continue;let K=G[F.id];for(let q in K)u(K[q].object),delete K[q];delete G[F.id]}}}function x(F){for(let k in n){let W=n[k],N=F.isInstancedMesh===!0?F.id:0,G=W[N];if(G!==void 0){for(let K in G){let q=G[K];for(let it in q)u(q[it].object),delete q[it];delete G[K]}delete W[N],Object.keys(W).length===0&&delete n[k]}}}function T(){U(),a=!0,r!==s&&(r=s,l(r.object))}function U(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:U,dispose:b,releaseStatesOfGeometry:A,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:g,disableUnusedAttributes:E}}function s0(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),e.update(l,n,u))}function o(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let f=0;f<u;f++)h+=l[f];e.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function r0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Ke&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let x=C===hn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Ze&&C!==cn&&!x&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",u=c(l);u!==l&&(It("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let p=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&It("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),L=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=i.getParameter(i.MAX_SAMPLES),A=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:p,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:_,maxTextureSize:y,maxCubemapSize:g,maxAttributes:d,maxVertexUniforms:E,maxVaryings:L,maxFragmentUniforms:M,maxSamples:b,samples:A}}function a0(i){let t=this,e=null,n=0,s=!1,r=!1,a=new We,o=new Ot,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(p,h){let f=p.length!==0||h||n!==0||s;return s=h,n=p.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,h){e=u(p,h,0)},this.setState=function(p,h,f){let _=p.clippingPlanes,y=p.clipIntersection,g=p.clipShadows,d=i.get(p);if(!s||_===null||_.length===0||r&&!g)r?u(null):l();else{let E=r?0:n,L=E*4,M=d.clippingState||null;c.value=M,M=u(_,h,L,f);for(let b=0;b!==L;++b)M[b]=e[b];d.clippingState=M,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(p,h,f,_){let y=p!==null?p.length:0,g=null;if(y!==0){if(g=c.value,_!==!0||g===null){let d=f+y*4,E=h.matrixWorldInverse;o.getNormalMatrix(E),(g===null||g.length<d)&&(g=new Float32Array(d));for(let L=0,M=f;L!==y;++L,M+=4)a.copy(p[L]).applyMatrix4(E,o),a.normal.toArray(g,M),g[M+3]=a.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,g}}var ns=4,o0=6,l0=20,c0=256,Ks=new Vs,Ah=new zt,wl=null,Cl=0,Rl=0,Pl=!1,h0=new R,_i=new R,so=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=h0}=r;wl=this._renderer.getRenderTarget(),Cl=this._renderer.getActiveCubeFace(),Rl=this._renderer.getActiveMipmapLevel(),Pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Eh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(wl,Cl,Rl),this._renderer.xr.enabled=Pl,t.scissorTest=!1,es(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ti||t.mapping===mi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),wl=this._renderer.getRenderTarget(),Cl=this._renderer.getActiveCubeFace(),Rl=this._renderer.getActiveMipmapLevel(),Pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:we,minFilter:we,generateMipmaps:!1,type:hn,format:Ke,colorSpace:Ms,depthBuffer:!1},s=Th(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Th(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=u0(r)),this._blurMaterial=f0(r,t,e),this._ggxMaterial=d0(r,t,e)}return s}_compileMaterial(t){let e=new ze(new ye,t);this._renderer.compile(e,Ks)}_sceneToCubeUV(t,e,n,s,r){let c=new Ie(90,1,e,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],p=this._renderer,h=p.autoClear,f=p.toneMapping;p.getClearColor(Ah),p.toneMapping=on,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ze(new Zi,new Is({name:"PMREM.Background",side:Le,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,g=y.material,d=!1,E=t.background;E?E.isColor&&(g.color.copy(E),t.background=null,d=!0):(g.color.copy(Ah),d=!0);for(let L=0;L<6;L++){let M=L%3;M===0?(c.up.set(0,l[L],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[L],r.y,r.z)):M===1?(c.up.set(0,0,l[L]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[L],r.z)):(c.up.set(0,l[L],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[L]));let b=this._cubeSize;es(s,M*b,L>2?b:0,b,b),p.setRenderTarget(s),d&&p.render(y,c),p.render(t,c)}p.toneMapping=f,p.autoClear=h,t.background=E}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===ti||t.mapping===mi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=wh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Eh());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let c=this._cubeSize;es(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Ks)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),p=Math.sqrt(l*l-u*u),h=l*1.25,f=p*h,{_lodMax:_}=this,y=this._sizeLods[n],g=3*y*(n>_-ns?n-_+ns:0),d=4*(this._cubeSize-y);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=_-e,es(r,g,d,3*y,2*y),s.setRenderTarget(r),s.render(o,Ks),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=_-n,es(t,g,d,3*y,2*y),s.setRenderTarget(t),s.render(o,Ks)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],p=3*u*(s>this._lodMax-ns?s-this._lodMax+ns:0),h=4*(this._cubeSize-u);es(e,p,h,3*u,2*u),a.setRenderTarget(e),a.render(c,Ks)}};function u0(i){let t=[],e=[],n=i,s=i-ns+1+o0;for(let r=0;r<s;r++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],p=6,h=6,f=3,_=new Float32Array(f*h*p),y=new Float32Array(f*h*p);for(let d=0;d<p;d++){let E=d%3*2/3-1,L=d>2?0:-1,M=[E,L,0,E+2/3,L,0,E+2/3,L+1,0,E,L,0,E+2/3,L+1,0,E,L+1,0];_.set(M,f*h*d);for(let b=0;b<h;b++){let A=u[b*2]*2-1,C=u[b*2+1]*2-1;d===0?_i.set(1,C,A):d===1?_i.set(-A,1,-C):d===2?_i.set(-A,C,1):d===3?_i.set(-1,C,-A):d===4?_i.set(-A,-1,C):_i.set(A,C,-1),_i.toArray(y,(d*h+b)*f)}}let g=new ye;g.setAttribute("position",new Xe(_,f)),g.setAttribute("outputDirection",new Xe(y,f)),e.push(new ze(g,null)),n>ns&&n--}return{lodMeshes:e,sizeLods:t}}function Th(i,t,e){let n=new Ve(i,t,e);return n.texture.mapping=Hs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function es(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function d0(i,t,e){return new Me({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:c0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:oo(),fragmentShader:`

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
		`,blending:yn,depthTest:!1,depthWrite:!1})}function f0(i,t,e){return new Me({name:"SphericalGaussianBlur",defines:{SAMPLES:l0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:oo(),fragmentShader:`

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
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Eh(){return new Me({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oo(),fragmentShader:`

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
		`,blending:yn,depthTest:!1,depthWrite:!1})}function wh(){return new Me({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function oo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var ro=class extends Ve{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Ns(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Zi(5,5,5),r=new Me({name:"CubemapFromEquirect",uniforms:gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Le,blending:yn});r.uniforms.tEquirect.value=e;let a=new ze(s,r),o=e.minFilter;return e.minFilter===ei&&(e.minFilter=we),new da(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function p0(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,f=!1){return h==null?null:f?a(h):r(h)}function r(h){if(h&&h.isTexture){let f=h.mapping;if(f===ma||f===ga)if(t.has(h)){let _=t.get(h).texture;return o(_,h.mapping)}else{let _=h.image;if(_&&_.height>0){let y=new ro(_.height);return y.fromEquirectangularTexture(i,h),t.set(h,y),h.addEventListener("dispose",l),o(y.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let f=h.mapping,_=f===ma||f===ga,y=f===ti||f===mi;if(_||y){let g=e.get(h),d=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==d)return n===null&&(n=new so(i)),g=_?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),g.texture;if(g!==void 0)return g.texture;{let E=h.image;return _&&E&&E.height>0||y&&E&&c(E)?(n===null&&(n=new so(i)),g=_?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,f){return f===ma?h.mapping=ti:f===ga&&(h.mapping=mi),h}function c(h){let f=0,_=6;for(let y=0;y<_;y++)h[y]!==void 0&&f++;return f===_}function l(h){let f=h.target;f.removeEventListener("dispose",l);let _=t.get(f);_!==void 0&&(t.delete(f),_.dispose())}function u(h){let f=h.target;f.removeEventListener("dispose",u);let _=e.get(f);_!==void 0&&(e.delete(f),_.dispose())}function p(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:p}}function m0(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&ui("WebGLRenderer: "+n+" extension not supported."),s}}}function g0(i,t,e,n){let s={},r=new WeakMap;function a(p){let h=p.target;h.index!==null&&t.remove(h.index);for(let _ in h.attributes)t.remove(h.attributes[_]);h.removeEventListener("dispose",a),delete s[h.id];let f=r.get(h);f&&(t.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(p,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function c(p){let h=p.attributes;for(let f in h)t.update(h[f],i.ARRAY_BUFFER)}function l(p){let h=[],f=p.index,_=p.attributes.position,y=0;if(_===void 0)return;if(f!==null){let E=f.array;y=f.version;for(let L=0,M=E.length;L<M;L+=3){let b=E[L+0],A=E[L+1],C=E[L+2];h.push(b,A,A,C,C,b)}}else{let E=_.array;y=_.version;for(let L=0,M=E.length/3-1;L<M;L+=3){let b=L+0,A=L+1,C=L+2;h.push(b,A,A,C,C,b)}}let g=new(_.count>=65535?Rs:Cs)(h,1);g.version=y;let d=r.get(p);d&&t.remove(d),r.set(p,g)}function u(p){let h=r.get(p);if(h){let f=p.index;f!==null&&h.version<f.version&&l(p)}else l(p);return r.get(p)}return{get:o,update:c,getWireframeAttribute:u}}function _0(i,t,e){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function c(p,h){i.drawElements(n,h,r,p*a),e.update(h,n,1)}function l(p,h,f){f!==0&&(i.drawElementsInstanced(n,h,r,p*a,f),e.update(h,n,f))}function u(p,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,p,0,f);let y=0;for(let g=0;g<f;g++)y+=h[g];e.update(y,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function x0(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Nt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function v0(i,t,e){let n=new WeakMap,s=new me;function r(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==p){let T=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();let f=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],E=o.morphAttributes.color||[],L=0;f===!0&&(L=1),_===!0&&(L=2),y===!0&&(L=3);let M=o.attributes.position.count*L,b=1;M>t.maxTextureSize&&(b=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let A=new Float32Array(M*b*4*p),C=new Es(A,M,b,p);C.type=cn,C.needsUpdate=!0;let x=L*4;for(let U=0;U<p;U++){let F=g[U],k=d[U],W=E[U],N=M*b*4*U;for(let G=0;G<F.count;G++){let K=G*x;f===!0&&(s.fromBufferAttribute(F,G),A[N+K+0]=s.x,A[N+K+1]=s.y,A[N+K+2]=s.z,A[N+K+3]=0),_===!0&&(s.fromBufferAttribute(k,G),A[N+K+4]=s.x,A[N+K+5]=s.y,A[N+K+6]=s.z,A[N+K+7]=0),y===!0&&(s.fromBufferAttribute(W,G),A[N+K+8]=s.x,A[N+K+9]=s.y,A[N+K+10]=s.z,A[N+K+11]=W.itemSize===4?s.w:1)}}h={count:p,texture:C,size:new Lt(M,b)},n.set(o,h),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let f=0;for(let y=0;y<l.length;y++)f+=l[y];let _=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function y0(i,t,e,n,s){let r=new WeakMap;function a(l){let u=s.render.frame,p=l.geometry,h=t.get(l,p);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return h}function o(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}var M0={[Qo]:"LINEAR_TONE_MAPPING",[tl]:"REINHARD_TONE_MAPPING",[el]:"CINEON_TONE_MAPPING",[nl]:"ACES_FILMIC_TONE_MAPPING",[sl]:"AGX_TONE_MAPPING",[rl]:"NEUTRAL_TONE_MAPPING",[il]:"CUSTOM_TONE_MAPPING"};function S0(i,t,e,n,s,r){let a=new Ve(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new ye;l.setAttribute("position",new ae([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new ae([0,2,0,0,2,0],2));let u=new Qr({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new ze(l,u),h=new Vs(-1,1,1,-1,0,1),f=null,_=null,y=!1,g,d=null,E=[],L=!1;this.setSize=function(M,b){a.setSize(M,b),o!==null&&o.setSize(M,b),c!==null&&c.setSize(M,b);for(let A=0;A<E.length;A++){let C=E[A];C.setSize&&C.setSize(M,b)}},this.setEffects=function(M){E=M,L=E.length>0&&E[0].isRenderPass===!0;let b=a.width,A=a.height;E.length>0&&o===null&&(o=new Ve(b,A,{type:hn,depthBuffer:!1,stencilBuffer:!1}),c=new Ve(b,A,{type:hn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<E.length;C++){let x=E[C];x.setSize&&x.setSize(b,A)}},this.begin=function(M,b){if(y||M.toneMapping===on&&E.length===0)return!1;if(d=b,b!==null){let A=b.width,C=b.height;(a.width!==A||a.height!==C)&&this.setSize(A,C)}return L===!1&&M.setRenderTarget(a),g=M.toneMapping,M.toneMapping=on,!0},this.hasRenderPass=function(){return L},this.end=function(M,b){M.toneMapping=g,y=!0;let A=a,C=o;for(let x=0;x<E.length;x++){let T=E[x];T.enabled!==!1&&(T.render(M,C,A,b),T.needsSwap!==!1&&(A=C,C=C===o?c:o))}if(f!==M.outputColorSpace||_!==M.toneMapping){f=M.outputColorSpace,_=M.toneMapping,u.defines={},$t.getTransfer(f)===se&&(u.defines.SRGB_TRANSFER="");let x=M0[_];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=A.texture,M.setRenderTarget(d),M.render(p,h),d=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Yh=new Fe,Dl=new Yn(1,1),Zh=new Es,$h=new qr,Jh=new Ns,Ch=[],Rh=[],Ph=new Float32Array(16),Ih=new Float32Array(9),Lh=new Float32Array(4);function ss(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Ch[s];if(r===void 0&&(r=new Float32Array(s),Ch[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Se(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function be(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function lo(i,t){let e=Rh[t];e===void 0&&(e=new Int32Array(t),Rh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function b0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function A0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2fv(this.addr,t),be(e,t)}}function T0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Se(e,t))return;i.uniform3fv(this.addr,t),be(e,t)}}function E0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4fv(this.addr,t),be(e,t)}}function w0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(Se(e,n))return;Lh.set(n),i.uniformMatrix2fv(this.addr,!1,Lh),be(e,n)}}function C0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(Se(e,n))return;Ih.set(n),i.uniformMatrix3fv(this.addr,!1,Ih),be(e,n)}}function R0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(Se(e,n))return;Ph.set(n),i.uniformMatrix4fv(this.addr,!1,Ph),be(e,n)}}function P0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function I0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2iv(this.addr,t),be(e,t)}}function L0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;i.uniform3iv(this.addr,t),be(e,t)}}function D0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4iv(this.addr,t),be(e,t)}}function U0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function N0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2uiv(this.addr,t),be(e,t)}}function O0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;i.uniform3uiv(this.addr,t),be(e,t)}}function F0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4uiv(this.addr,t),be(e,t)}}function B0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Dl.compareFunction=e.isReversedDepthBuffer()?eo:to,r=Dl):r=Yh,e.setTexture2D(t||r,s)}function z0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||$h,s)}function V0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Jh,s)}function k0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Zh,s)}function G0(i){switch(i){case 5126:return b0;case 35664:return A0;case 35665:return T0;case 35666:return E0;case 35674:return w0;case 35675:return C0;case 35676:return R0;case 5124:case 35670:return P0;case 35667:case 35671:return I0;case 35668:case 35672:return L0;case 35669:case 35673:return D0;case 5125:return U0;case 36294:return N0;case 36295:return O0;case 36296:return F0;case 35678:case 36198:case 36298:case 36306:case 35682:return B0;case 35679:case 36299:case 36307:return z0;case 35680:case 36300:case 36308:case 36293:return V0;case 36289:case 36303:case 36311:case 36292:return k0}}function H0(i,t){i.uniform1fv(this.addr,t)}function W0(i,t){let e=ss(t,this.size,2);i.uniform2fv(this.addr,e)}function X0(i,t){let e=ss(t,this.size,3);i.uniform3fv(this.addr,e)}function q0(i,t){let e=ss(t,this.size,4);i.uniform4fv(this.addr,e)}function Y0(i,t){let e=ss(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Z0(i,t){let e=ss(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function $0(i,t){let e=ss(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function J0(i,t){i.uniform1iv(this.addr,t)}function K0(i,t){i.uniform2iv(this.addr,t)}function j0(i,t){i.uniform3iv(this.addr,t)}function Q0(i,t){i.uniform4iv(this.addr,t)}function tm(i,t){i.uniform1uiv(this.addr,t)}function em(i,t){i.uniform2uiv(this.addr,t)}function nm(i,t){i.uniform3uiv(this.addr,t)}function im(i,t){i.uniform4uiv(this.addr,t)}function sm(i,t,e){let n=this.cache,s=t.length,r=lo(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),be(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Dl:a=Yh;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function rm(i,t,e){let n=this.cache,s=t.length,r=lo(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),be(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||$h,r[a])}function am(i,t,e){let n=this.cache,s=t.length,r=lo(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),be(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Jh,r[a])}function om(i,t,e){let n=this.cache,s=t.length,r=lo(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),be(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Zh,r[a])}function lm(i){switch(i){case 5126:return H0;case 35664:return W0;case 35665:return X0;case 35666:return q0;case 35674:return Y0;case 35675:return Z0;case 35676:return $0;case 5124:case 35670:return J0;case 35667:case 35671:return K0;case 35668:case 35672:return j0;case 35669:case 35673:return Q0;case 5125:return tm;case 36294:return em;case 36295:return nm;case 36296:return im;case 35678:case 36198:case 36298:case 36306:case 35682:return sm;case 35679:case 36299:case 36307:return rm;case 35680:case 36300:case 36308:case 36293:return am;case 36289:case 36303:case 36311:case 36292:return om}}var Ul=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=G0(e.type)}},Nl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=lm(e.type)}},Ol=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},Il=/(\w+)(\])?(\[|\.)?/g;function Dh(i,t){i.seq.push(t),i.map[t.id]=t}function cm(i,t,e){let n=i.name,s=n.length;for(Il.lastIndex=0;;){let r=Il.exec(n),a=Il.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Dh(e,l===void 0?new Ul(o,i,t):new Nl(o,i,t));break}else{let p=e.map[o];p===void 0&&(p=new Ol(o),Dh(e,p)),e=p}}}var is=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);cm(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function Uh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var hm=37297,um=0;function dm(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Nh=new Ot;function fm(i){$t._getMatrix(Nh,$t.workingColorSpace,i);let t=`mat3( ${Nh.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(i)){case Ss:return[t,"LinearTransferOETF"];case se:return[t,"sRGBTransferOETF"];default:return It("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Oh(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+dm(i.getShaderSource(t),o)}else return r}function pm(i,t){let e=fm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var mm={[Qo]:"Linear",[tl]:"Reinhard",[el]:"Cineon",[nl]:"ACESFilmic",[sl]:"AgX",[rl]:"Neutral",[il]:"Custom"};function gm(i,t){let e=mm[t];return e===void 0?(It("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var io=new R;function _m(){$t.getLuminanceCoefficients(io);let i=io.x.toFixed(4),t=io.y.toFixed(4),e=io.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qs).join(`
`)}function vm(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ym(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Qs(i){return i!==""}function Fh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Bh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Mm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fl(i){return i.replace(Mm,bm)}var Sm=new Map;function bm(i,t){let e=Gt[t];if(e===void 0){let n=Sm.get(t);if(n!==void 0)e=Gt[n],It('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Fl(e)}var Am=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zh(i){return i.replace(Am,Tm)}function Tm(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Vh(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var Em={[Gs]:"SHADOWMAP_TYPE_PCF",[Ki]:"SHADOWMAP_TYPE_VSM"};function wm(i){return Em[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Cm={[ti]:"ENVMAP_TYPE_CUBE",[mi]:"ENVMAP_TYPE_CUBE",[Hs]:"ENVMAP_TYPE_CUBE_UV"};function Rm(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Cm[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Pm={[mi]:"ENVMAP_MODE_REFRACTION"};function Im(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Pm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Lm={[jo]:"ENVMAP_BLENDING_MULTIPLY",[ih]:"ENVMAP_BLENDING_MIX",[sh]:"ENVMAP_BLENDING_ADD"};function Dm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Lm[i.combine]||"ENVMAP_BLENDING_NONE"}function Um(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Nm(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=wm(e),l=Rm(e),u=Im(e),p=Dm(e),h=Um(e),f=xm(e),_=vm(r),y=s.createProgram(),g,d,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Qs).join(`
`),g.length>0&&(g+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Qs).join(`
`),d.length>0&&(d+=`
`)):(g=[Vh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qs).join(`
`),d=[Vh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+p:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==on?"#define TONE_MAPPING":"",e.toneMapping!==on?Gt.tonemapping_pars_fragment:"",e.toneMapping!==on?gm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,pm("linearToOutputTexel",e.outputColorSpace),_m(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Qs).join(`
`)),a=Fl(a),a=Fh(a,e),a=Bh(a,e),o=Fl(o),o=Fh(o,e),o=Bh(o,e),a=zh(a),o=zh(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,d=["#define varying in",e.glslVersion===gl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===gl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let L=E+g+a,M=E+d+o,b=Uh(s,s.VERTEX_SHADER,L),A=Uh(s,s.FRAGMENT_SHADER,M);s.attachShader(y,b),s.attachShader(y,A),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function C(F){if(i.debug.checkShaderErrors){let k=s.getProgramInfoLog(y)||"",W=s.getShaderInfoLog(b)||"",N=s.getShaderInfoLog(A)||"",G=k.trim(),K=W.trim(),q=N.trim(),it=!0,Y=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(it=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,b,A);else{let tt=Oh(s,b,"vertex"),et=Oh(s,A,"fragment");Nt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+G+`
`+tt+`
`+et)}else G!==""?It("WebGLProgram: Program Info Log:",G):(K===""||q==="")&&(Y=!1);Y&&(F.diagnostics={runnable:it,programLog:G,vertexShader:{log:K,prefix:g},fragmentShader:{log:q,prefix:d}})}s.deleteShader(b),s.deleteShader(A),x=new is(s,y),T=ym(s,y)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let U=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=s.getProgramParameter(y,hm)),U},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=um++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=b,this.fragmentShader=A,this}var Om=0,Bl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new zl(t),e.set(t,n)),n}},zl=class{constructor(t){this.id=Om++,this.code=t,this.usedTimes=0}};function Fm(i){return i===ii||i===$s||i===Js}function Bm(i,t,e,n,s,r){let a=new ws,o=new Bl,c=new Set,l=[],u=new Map,p=n.logarithmicDepthBuffer,h=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return c.add(x),x===0?"uv":`uv${x}`}function y(x,T,U,F,k,W){let N=F.fog,G=k.geometry,K=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?F.environment:null,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,it=t.get(x.envMap||K,q),Y=it&&it.mapping===Hs?it.image.height:null,tt=f[x.type];x.precision!==null&&(h=n.getMaxPrecision(x.precision),h!==x.precision&&It("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));let et=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Tt=et!==void 0?et.length:0,vt=0;G.morphAttributes.position!==void 0&&(vt=1),G.morphAttributes.normal!==void 0&&(vt=2),G.morphAttributes.color!==void 0&&(vt=3);let ee,Ht,Jt,Z;if(tt){let he=Sn[tt];ee=he.vertexShader,Ht=he.fragmentShader}else{ee=x.vertexShader,Ht=x.fragmentShader;let he=o.getVertexShaderStage(x),ne=o.getFragmentShaderStage(x);o.update(x,he,ne),Jt=he.id,Z=ne.id}let I=i.getRenderTarget(),nt=i.state.buffers.depth.getReversed(),J=k.isInstancedMesh===!0,rt=k.isBatchedMesh===!0,yt=!!x.map,Yt=!!x.matcap,Pt=!!it,Vt=!!x.aoMap,Qt=!!x.lightMap,Ft=!!x.bumpMap&&x.wireframe===!1,Zt=!!x.normalMap,Wt=!!x.displacementMap,_e=!!x.emissiveMap,Kt=!!x.metalnessMap,Ut=!!x.roughnessMap,w=x.anisotropy>0,te=x.clearcoat>0,Ct=x.dispersion>0,S=x.retroreflectivity>0,m=x.iridescence>0,O=x.sheen>0,V=x.transmission>0,X=w&&!!x.anisotropyMap,at=te&&!!x.clearcoatMap,ot=te&&!!x.clearcoatNormalMap,$=te&&!!x.clearcoatRoughnessMap,Q=m&&!!x.iridescenceMap,lt=m&&!!x.iridescenceThicknessMap,Et=O&&!!x.sheenColorMap,dt=O&&!!x.sheenRoughnessMap,ct=!!x.specularMap,wt=!!x.specularColorMap,Dt=!!x.specularIntensityMap,Bt=V&&!!x.transmissionMap,D=V&&!!x.thicknessMap,ht=!!x.gradientMap,j=!!x.alphaMap,ut=x.alphaTest>0,gt=!!x.alphaHash,st=!!x.extensions,Rt=on;x.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Rt=i.toneMapping);let bt={shaderID:tt,shaderType:x.type,shaderName:x.name,vertexShader:ee,fragmentShader:Ht,defines:x.defines,customVertexShaderID:Jt,customFragmentShaderID:Z,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:rt,batchingColor:rt&&k._colorsTexture!==null,instancing:J,instancingColor:J&&k.instanceColor!==null,instancingMorph:J&&k.morphTexture!==null,outputColorSpace:I===null?i.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:$t.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:yt,matcap:Yt,envMap:Pt,envMapMode:Pt&&it.mapping,envMapCubeUVHeight:Y,aoMap:Vt,lightMap:Qt,bumpMap:Ft,normalMap:Zt,displacementMap:Wt,emissiveMap:_e,normalMapObjectSpace:Zt&&x.normalMapType===oh,normalMapTangentSpace:Zt&&x.normalMapType===pl,packedNormalMap:Zt&&x.normalMapType===pl&&Fm(x.normalMap.format),metalnessMap:Kt,roughnessMap:Ut,anisotropy:w,anisotropyMap:X,clearcoat:te,clearcoatMap:at,clearcoatNormalMap:ot,clearcoatRoughnessMap:$,dispersion:Ct,retroreflection:S,iridescence:m,iridescenceMap:Q,iridescenceThicknessMap:lt,sheen:O,sheenColorMap:Et,sheenRoughnessMap:dt,specularMap:ct,specularColorMap:wt,specularIntensityMap:Dt,transmission:V,transmissionMap:Bt,thicknessMap:D,gradientMap:ht,opaque:x.transparent===!1&&x.blending===ji&&x.alphaToCoverage===!1,alphaMap:j,alphaTest:ut,alphaHash:gt,combine:x.combine,mapUv:yt&&_(x.map.channel),aoMapUv:Vt&&_(x.aoMap.channel),lightMapUv:Qt&&_(x.lightMap.channel),bumpMapUv:Ft&&_(x.bumpMap.channel),normalMapUv:Zt&&_(x.normalMap.channel),displacementMapUv:Wt&&_(x.displacementMap.channel),emissiveMapUv:_e&&_(x.emissiveMap.channel),metalnessMapUv:Kt&&_(x.metalnessMap.channel),roughnessMapUv:Ut&&_(x.roughnessMap.channel),anisotropyMapUv:X&&_(x.anisotropyMap.channel),clearcoatMapUv:at&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:ot&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:lt&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:Et&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:dt&&_(x.sheenRoughnessMap.channel),specularMapUv:ct&&_(x.specularMap.channel),specularColorMapUv:wt&&_(x.specularColorMap.channel),specularIntensityMapUv:Dt&&_(x.specularIntensityMap.channel),transmissionMapUv:Bt&&_(x.transmissionMap.channel),thicknessMapUv:D&&_(x.thicknessMap.channel),alphaMapUv:j&&_(x.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Zt||w),vertexNormals:!!G.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!G.attributes.uv&&(yt||j),fog:!!N,useFog:x.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||G.attributes.normal===void 0&&Zt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:nt,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Tt,morphTextureStride:vt,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:Rt,decodeVideoTexture:yt&&x.map.isVideoTexture===!0&&$t.getTransfer(x.map.colorSpace)===se,decodeVideoTextureEmissive:_e&&x.emissiveMap.isVideoTexture===!0&&$t.getTransfer(x.emissiveMap.colorSpace)===se,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===vn,flipSided:x.side===Le,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:st&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&x.extensions.multiDraw===!0||rt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return bt.vertexUv1s=c.has(1),bt.vertexUv2s=c.has(2),bt.vertexUv3s=c.has(3),c.clear(),bt}function g(x){let T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(let U in x.defines)T.push(U),T.push(x.defines[U]);return x.isRawShaderMaterial===!1&&(d(T,x),E(T,x),T.push(i.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function d(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numSunLights),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numSunLightShadows),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function E(x,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function L(x){let T=f[x.type],U;if(T){let F=Sn[T];U=Mh.clone(F.uniforms)}else U=x.uniforms;return U}function M(x,T){let U=u.get(T);return U!==void 0?++U.usedTimes:(U=new Nm(i,T,x,s),l.push(U),u.set(T,U)),U}function b(x){if(--x.usedTimes===0){let T=l.indexOf(x);l[T]=l[l.length-1],l.pop(),u.delete(x.cacheKey),x.destroy()}}function A(x){o.remove(x)}function C(){o.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:L,acquireProgram:M,releaseProgram:b,releaseShaderCache:A,programs:l,dispose:C}}function zm(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Vm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function kh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Gh(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function o(h,f,_,y,g,d){let E=i[t];return E===void 0?(E={id:h.id,object:h,geometry:f,material:_,materialVariant:a(h),groupOrder:y,renderOrder:h.renderOrder,z:g,group:d},i[t]=E):(E.id=h.id,E.object=h,E.geometry=f,E.material=_,E.materialVariant=a(h),E.groupOrder=y,E.renderOrder=h.renderOrder,E.z=g,E.group=d),t++,E}function c(h,f,_,y,g,d,E){E.reversedDepth===!0&&(g=-g);let L=o(h,f,_,y,g,d);_.transmission>0?n.push(L):_.transparent===!0?s.push(L):e.push(L)}function l(h,f,_,y,g,d){let E=o(h,f,_,y,g,d);_.transmission>0?n.unshift(E):_.transparent===!0?s.unshift(E):e.unshift(E)}function u(h,f){e.length>1&&e.sort(h||Vm),n.length>1&&n.sort(f||kh),s.length>1&&s.sort(f||kh)}function p(){for(let h=t,f=i.length;h<f;h++){let _=i[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:p,sort:u}}function km(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new Gh,i.set(n,[a])):s>=r.length?(a=new Gh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Gm(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new R,color:new zt};break;case"SpotLight":e={position:new R,direction:new R,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new R,halfWidth:new R,halfHeight:new R};break}return i[t.id]=e,e}}}function Hm(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Wm=0;function Xm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function qm(i){let t=new Gm,e=Hm(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new R);let s=new R,r=new pe,a=new pe;function o(l){let u=0,p=0,h=0;for(let k=0;k<9;k++)n.probe[k].set(0,0,0);let f=0,_=0,y=0,g=0,d=0,E=0,L=0,M=0,b=0,A=0,C=0,x=0,T=0,U=0;l.sort(Xm);for(let k=0,W=l.length;k<W;k++){let N=l[k],G=N.color,K=N.intensity,q=N.distance,it=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===ii?it=N.shadow.map.texture:it=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=G.r*K,p+=G.g*K,h+=G.b*K;else if(N.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(N.sh.coefficients[Y],K);U++}else if(N.isSunLight){let Y=t.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let tt=N.shadow,et=e.get(N);et.shadowIntensity=tt.intensity,et.shadowBias=tt.bias,et.shadowNormalBias=tt.normalBias,et.shadowRadius=tt.radius,et.shadowMapSize.copy(tt.mapSize).multiply(tt.getFrameExtents()),n.sunShadow[_]=et,n.sunShadowMap[_]=it;let Tt=tt.getViewportCount();for(let vt=0;vt<Tt;vt++)n.sunShadowMatrix[y+vt]=tt.getMatrix(vt),n.sunShadowCascade[y+vt]=tt._cascadeData[vt];y+=Tt,_++}n.sun[f]=Y,f++}else if(N.isDirectionalLight){let Y=t.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let tt=N.shadow,et=e.get(N);et.shadowIntensity=tt.intensity,et.shadowBias=tt.bias,et.shadowNormalBias=tt.normalBias,et.shadowRadius=tt.radius,et.shadowMapSize=tt.mapSize,n.directionalShadow[g]=et,n.directionalShadowMap[g]=it,n.directionalShadowMatrix[g]=N.shadow.matrix,b++}n.directional[g]=Y,g++}else if(N.isSpotLight){let Y=t.get(N);Y.position.setFromMatrixPosition(N.matrixWorld),Y.color.copy(G).multiplyScalar(K),Y.distance=q,Y.coneCos=Math.cos(N.angle),Y.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Y.decay=N.decay,n.spot[E]=Y;let tt=N.shadow;if(N.map&&(n.spotLightMap[x]=N.map,x++,tt.updateMatrices(N),N.castShadow&&T++),n.spotLightMatrix[E]=tt.matrix,N.castShadow){let et=e.get(N);et.shadowIntensity=tt.intensity,et.shadowBias=tt.bias,et.shadowNormalBias=tt.normalBias,et.shadowRadius=tt.radius,et.shadowMapSize=tt.mapSize,n.spotShadow[E]=et,n.spotShadowMap[E]=it,C++}E++}else if(N.isRectAreaLight){let Y=t.get(N);Y.color.copy(G).multiplyScalar(K),Y.halfWidth.set(N.width*.5,0,0),Y.halfHeight.set(0,N.height*.5,0),n.rectArea[L]=Y,L++}else if(N.isPointLight){let Y=t.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),Y.distance=N.distance,Y.decay=N.decay,N.castShadow){let tt=N.shadow,et=e.get(N);et.shadowIntensity=tt.intensity,et.shadowBias=tt.bias,et.shadowNormalBias=tt.normalBias,et.shadowRadius=tt.radius,et.shadowMapSize=tt.mapSize,et.shadowCameraNear=tt.camera.near,et.shadowCameraFar=tt.camera.far,n.pointShadow[d]=et,n.pointShadowMap[d]=it,n.pointShadowMatrix[d]=N.shadow.matrix,A++}n.point[d]=Y,d++}else if(N.isHemisphereLight){let Y=t.get(N);Y.skyColor.copy(N.color).multiplyScalar(K),Y.groundColor.copy(N.groundColor).multiplyScalar(K),n.hemi[M]=Y,M++}}L>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ft.LTC_FLOAT_1,n.rectAreaLTC2=ft.LTC_FLOAT_2):(n.rectAreaLTC1=ft.LTC_HALF_1,n.rectAreaLTC2=ft.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=p,n.ambient[2]=h;let F=n.hash;(F.sunLength!==f||F.directionalLength!==g||F.pointLength!==d||F.spotLength!==E||F.rectAreaLength!==L||F.hemiLength!==M||F.numSunShadows!==_||F.numDirectionalShadows!==b||F.numPointShadows!==A||F.numSpotShadows!==C||F.numSpotMaps!==x||F.numLightProbes!==U)&&(n.sun.length=f,n.directional.length=g,n.spot.length=E,n.rectArea.length=L,n.point.length=d,n.hemi.length=M,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=A,n.pointShadowMap.length=A,n.pointShadowMatrix.length=A,n.spotShadow.length=C,n.spotShadowMap.length=C,n.spotLightMatrix.length=C+x-T,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=U,F.sunLength=f,F.directionalLength=g,F.pointLength=d,F.spotLength=E,F.rectAreaLength=L,F.hemiLength=M,F.numSunShadows=_,F.numDirectionalShadows=b,F.numPointShadows=A,F.numSpotShadows=C,F.numSpotMaps=x,F.numLightProbes=U,n.version=Wm++)}function c(l,u){let p=0,h=0,f=0,_=0,y=0,g=0,d=u.matrixWorldInverse;for(let E=0,L=l.length;E<L;E++){let M=l[E];if(M.isSunLight){let b=n.sun[p];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(d),p++}else if(M.isDirectionalLight){let b=n.directional[h];b.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(d),h++}else if(M.isSpotLight){let b=n.spot[_];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(d),b.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(d),_++}else if(M.isRectAreaLight){let b=n.rectArea[y];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(d),a.identity(),r.copy(M.matrixWorld),r.premultiply(d),a.extractRotation(r),b.halfWidth.set(M.width*.5,0,0),b.halfHeight.set(0,M.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),y++}else if(M.isPointLight){let b=n.point[f];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(d),f++}else if(M.isHemisphereLight){let b=n.hemi[g];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(d),g++}}}return{setup:o,setupView:c,state:n}}function Hh(i){let t=new qm(i),e=[],n=[],s=[];function r(h){p.camera=h,e.length=0,n.length=0,s.length=0}function a(h){e.push(h)}function o(h){n.push(h)}function c(h){s.push(h)}function l(){t.setup(e)}function u(h){t.setupView(e,h)}let p={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Ym(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Hh(i),t.set(s,[o])):r>=a.length?(o=new Hh(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var Zm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$m=`uniform sampler2D shadow_pass;
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
}`,Jm=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],Km=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],Wh=new pe,js=new R,Ll=new R;function jm(i,t,e){let n=new Ls,s=new Lt,r=new Lt,a=new me,o=new ta,c=new ea,l={},u=e.maxTextureSize,p={[Qn]:Le,[Le]:Qn,[vn]:vn},h=new Me({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Lt},radius:{value:4}},vertexShader:Zm,fragmentShader:$m}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let _=new ye;_.setAttribute("position",new Xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ze(_,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gs;let d=this.type;this.render=function(A,C,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;this.type===Bc&&(It("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Gs);let T=i.getRenderTarget(),U=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),k=i.state;k.setBlending(yn),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let W=d!==this.type;W&&C.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(G=>G.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,G=A.length;N<G;N++){let K=A[N],q=K.shadow;if(q===void 0){It("WebGLShadowMap:",K,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let it=q.getFrameExtents();s.multiply(it),r.copy(q.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/it.x),s.x=r.x*it.x,q.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/it.y),s.y=r.y*it.y,q.mapSize.y=r.y));let Y=i.state.buffers.depth.getReversed();if(q.camera._reversedDepth=Y,q.map===null||W===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===Ki){if(K.isPointLight){It("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new Ve(s.x,s.y,{format:ii,type:hn,minFilter:we,magFilter:we,generateMipmaps:!1}),q.map.texture.name=K.name+".shadowMap",q.map.depthTexture=new Yn(s.x,s.y,cn),q.map.depthTexture.name=K.name+".shadowMapDepth",q.map.depthTexture.format=_n,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Ee,q.map.depthTexture.magFilter=Ee}else K.isPointLight?(q.map=new ro(s.x),q.map.depthTexture=new jr(s.x,ln)):(q.map=new Ve(s.x,s.y),q.map.depthTexture=new Yn(s.x,s.y,ln)),q.map.depthTexture.name=K.name+".shadowMap",q.map.depthTexture.format=_n,this.type===Gs?(q.map.depthTexture.compareFunction=Y?eo:to,q.map.depthTexture.minFilter=we,q.map.depthTexture.magFilter=we):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Ee,q.map.depthTexture.magFilter=Ee);q.camera.updateProjectionMatrix()}q.map.isWebGLCubeRenderTarget!==!0&&(q.map.width!==s.x||q.map.height!==s.y)&&q.map.setSize(s.x,s.y);let tt=q.map.isWebGLCubeRenderTarget?6:q.getViewportCount();K.isPointLight!==!0&&q.updateMatrices(K,x);for(let et=0;et<tt;et++){let Tt=q.getCamera(et);if(K.isPointLight){let vt=q.camera,ee=q.matrix,Ht=K.distance||vt.far;Ht!==vt.far&&(vt.far=Ht,vt.updateProjectionMatrix()),js.setFromMatrixPosition(K.matrixWorld),vt.position.copy(js),Ll.copy(vt.position),Ll.add(Jm[et]),vt.up.copy(Km[et]),vt.lookAt(Ll),vt.updateMatrixWorld(),ee.makeTranslation(-js.x,-js.y,-js.z),Wh.multiplyMatrices(vt.projectionMatrix,vt.matrixWorldInverse),q._frustum.setFromProjectionMatrix(Wh,vt.coordinateSystem,vt.reversedDepth)}if(q.map.isWebGLCubeRenderTarget)i.setRenderTarget(q.map,et),i.clear();else{et===0&&(i.setRenderTarget(q.map),i.clear());let vt=q.getViewport(et);a.set(r.x*vt.x,r.y*vt.y,r.x*vt.z,r.y*vt.w),k.viewport(a)}n=q.getFrustum(et),M(C,x,Tt,K,this.type)}q.isPointLightShadow!==!0&&this.type===Ki&&E(q,x),q.needsUpdate=!1}d=this.type,g.needsUpdate=!1,i.setRenderTarget(T,U,F)};function E(A,C){let x=t.update(y);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null?A.mapPass=new Ve(s.x,s.y,{format:ii,type:hn}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),h.uniforms.shadow_pass.value=A.map.depthTexture,h.uniforms.resolution.value.set(A.map.width,A.map.height),h.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(C,null,x,h,y,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value.set(A.map.width,A.map.height),f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(C,null,x,f,y,null)}function L(A,C,x,T){let U=null,F=x.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(F!==void 0)U=F;else if(U=x.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let k=U.uuid,W=C.uuid,N=l[k];N===void 0&&(N={},l[k]=N);let G=N[W];G===void 0&&(G=U.clone(),N[W]=G,C.addEventListener("dispose",b)),U=G}if(U.visible=C.visible,U.wireframe=C.wireframe,T===Ki?U.side=C.shadowSide!==null?C.shadowSide:C.side:U.side=C.shadowSide!==null?C.shadowSide:p[C.side],U.alphaMap=C.alphaMap,U.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,U.map=C.map,U.clipShadows=C.clipShadows,U.clippingPlanes=C.clippingPlanes,U.clipIntersection=C.clipIntersection,U.displacementMap=C.displacementMap,U.displacementScale=C.displacementScale,U.displacementBias=C.displacementBias,U.wireframeLinewidth=C.wireframeLinewidth,U.linewidth=C.linewidth,x.isPointLight===!0&&U.isMeshDistanceMaterial===!0){let k=i.properties.get(U);k.light=x}return U}function M(A,C,x,T,U){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&U===Ki)&&(!A.frustumCulled||A.intersectsFrustum(n))){A.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,A.matrixWorld);let W=t.update(A),N=A.material;if(Array.isArray(N)){let G=W.groups;for(let K=0,q=G.length;K<q;K++){let it=G[K],Y=N[it.materialIndex];if(Y&&Y.visible){let tt=L(A,Y,T,U);A.onBeforeShadow(i,A,C,x,W,tt,it),i.renderBufferDirect(x,null,W,tt,A,it),A.onAfterShadow(i,A,C,x,W,tt,it)}}}else if(N.visible){let G=L(A,N,T,U);A.onBeforeShadow(i,A,C,x,W,G,null),i.renderBufferDirect(x,null,W,G,A,null),A.onAfterShadow(i,A,C,x,W,G,null)}}let k=A.children;for(let W=0,N=k.length;W<N;W++)M(k[W],C,x,T,U)}function b(A){A.target.removeEventListener("dispose",b);for(let x in l){let T=l[x],U=A.target.uuid;U in T&&(T[U].dispose(),delete T[U])}}}function Qm(i,t){function e(){let D=!1,ht=new me,j=null,ut=new me(0,0,0,0);return{setMask:function(gt){j!==gt&&!D&&(i.colorMask(gt,gt,gt,gt),j=gt)},setLocked:function(gt){D=gt},setClear:function(gt,st,Rt,bt,he){he===!0&&(gt*=bt,st*=bt,Rt*=bt),ht.set(gt,st,Rt,bt),ut.equals(ht)===!1&&(i.clearColor(gt,st,Rt,bt),ut.copy(ht))},reset:function(){D=!1,j=null,ut.set(-1,0,0,0)}}}function n(){let D=!1,ht=!1,j=null,ut=null,gt=null;return{setReversed:function(st){if(ht!==st){let Rt=t.get("EXT_clip_control");st?Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.ZERO_TO_ONE_EXT):Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.NEGATIVE_ONE_TO_ONE_EXT),ht=st;let bt=gt;gt=null,this.setClear(bt)}},getReversed:function(){return ht},setTest:function(st){st?I(i.DEPTH_TEST):nt(i.DEPTH_TEST)},setMask:function(st){j!==st&&!D&&(i.depthMask(st),j=st)},setFunc:function(st){if(ht&&(st=xh[st]),ut!==st){switch(st){case Ur:i.depthFunc(i.NEVER);break;case Nr:i.depthFunc(i.ALWAYS);break;case Or:i.depthFunc(i.LESS);break;case Vi:i.depthFunc(i.LEQUAL);break;case Fr:i.depthFunc(i.EQUAL);break;case Br:i.depthFunc(i.GEQUAL);break;case zr:i.depthFunc(i.GREATER);break;case Vr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ut=st}},setLocked:function(st){D=st},setClear:function(st){gt!==st&&(gt=st,ht&&(st=1-st),i.clearDepth(st))},reset:function(){D=!1,j=null,ut=null,gt=null,ht=!1}}}function s(){let D=!1,ht=null,j=null,ut=null,gt=null,st=null,Rt=null,bt=null,he=null;return{setTest:function(ne){D||(ne?I(i.STENCIL_TEST):nt(i.STENCIL_TEST))},setMask:function(ne){ht!==ne&&!D&&(i.stencilMask(ne),ht=ne)},setFunc:function(ne,Qe,fn){(j!==ne||ut!==Qe||gt!==fn)&&(i.stencilFunc(ne,Qe,fn),j=ne,ut=Qe,gt=fn)},setOp:function(ne,Qe,fn){(st!==ne||Rt!==Qe||bt!==fn)&&(i.stencilOp(ne,Qe,fn),st=ne,Rt=Qe,bt=fn)},setLocked:function(ne){D=ne},setClear:function(ne){he!==ne&&(i.clearStencil(ne),he=ne)},reset:function(){D=!1,ht=null,j=null,ut=null,gt=null,st=null,Rt=null,bt=null,he=null}}}let r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap,u={},p={},h={},f=new WeakMap,_=[],y=null,g=!1,d=null,E=null,L=null,M=null,b=null,A=null,C=null,x=new zt(0,0,0),T=0,U=!1,F=null,k=null,W=null,N=null,G=null,K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,it=0,Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(Y)[1]),q=it>=1):Y.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),q=it>=2);let tt=null,et={},Tt=i.getParameter(i.SCISSOR_BOX),vt=i.getParameter(i.VIEWPORT),ee=new me().fromArray(Tt),Ht=new me().fromArray(vt);function Jt(D,ht,j,ut){let gt=new Uint8Array(4),st=i.createTexture();i.bindTexture(D,st),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Rt=0;Rt<j;Rt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(ht,0,i.RGBA,1,1,ut,0,i.RGBA,i.UNSIGNED_BYTE,gt):i.texImage2D(ht+Rt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,gt);return st}let Z={};Z[i.TEXTURE_2D]=Jt(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=Jt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=Jt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=Jt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),I(i.DEPTH_TEST),a.setFunc(Vi),Ft(!1),Zt(Yo),I(i.CULL_FACE),Vt(yn);function I(D){u[D]!==!0&&(i.enable(D),u[D]=!0)}function nt(D){u[D]!==!1&&(i.disable(D),u[D]=!1)}function J(D,ht){return h[D]!==ht?(i.bindFramebuffer(D,ht),h[D]=ht,D===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ht),D===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ht),!0):!1}function rt(D,ht){let j=_,ut=!1;if(D){j=f.get(ht),j===void 0&&(j=[],f.set(ht,j));let gt=D.textures;if(j.length!==gt.length||j[0]!==i.COLOR_ATTACHMENT0){for(let st=0,Rt=gt.length;st<Rt;st++)j[st]=i.COLOR_ATTACHMENT0+st;j.length=gt.length,ut=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,ut=!0);ut&&i.drawBuffers(j)}function yt(D){return y!==D?(i.useProgram(D),y=D,!0):!1}let Yt={[pi]:i.FUNC_ADD,[Vc]:i.FUNC_SUBTRACT,[kc]:i.FUNC_REVERSE_SUBTRACT};Yt[Gc]=i.MIN,Yt[Hc]=i.MAX;let Pt={[Wc]:i.ZERO,[Xc]:i.ONE,[qc]:i.SRC_COLOR,[Jo]:i.SRC_ALPHA,[jc]:i.SRC_ALPHA_SATURATE,[Jc]:i.DST_COLOR,[Zc]:i.DST_ALPHA,[Yc]:i.ONE_MINUS_SRC_COLOR,[Ko]:i.ONE_MINUS_SRC_ALPHA,[Kc]:i.ONE_MINUS_DST_COLOR,[$c]:i.ONE_MINUS_DST_ALPHA,[Qc]:i.CONSTANT_COLOR,[th]:i.ONE_MINUS_CONSTANT_COLOR,[eh]:i.CONSTANT_ALPHA,[nh]:i.ONE_MINUS_CONSTANT_ALPHA};function Vt(D,ht,j,ut,gt,st,Rt,bt,he,ne){if(D===yn){g===!0&&(nt(i.BLEND),g=!1);return}if(g===!1&&(I(i.BLEND),g=!0),D!==zc){if(D!==d||ne!==U){if((E!==pi||b!==pi)&&(i.blendEquation(i.FUNC_ADD),E=pi,b=pi),ne)switch(D){case ji:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case In:i.blendFunc(i.ONE,i.ONE);break;case Zo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case $o:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Nt("WebGLState: Invalid blending: ",D);break}else switch(D){case ji:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case In:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Zo:Nt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $o:Nt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Nt("WebGLState: Invalid blending: ",D);break}L=null,M=null,A=null,C=null,x.set(0,0,0),T=0,d=D,U=ne}return}gt=gt||ht,st=st||j,Rt=Rt||ut,(ht!==E||gt!==b)&&(i.blendEquationSeparate(Yt[ht],Yt[gt]),E=ht,b=gt),(j!==L||ut!==M||st!==A||Rt!==C)&&(i.blendFuncSeparate(Pt[j],Pt[ut],Pt[st],Pt[Rt]),L=j,M=ut,A=st,C=Rt),(bt.equals(x)===!1||he!==T)&&(i.blendColor(bt.r,bt.g,bt.b,he),x.copy(bt),T=he),d=D,U=!1}function Qt(D,ht){D.side===vn?nt(i.CULL_FACE):I(i.CULL_FACE);let j=D.side===Le;ht&&(j=!j),Ft(j),D.blending===ji&&D.transparent===!1?Vt(yn):Vt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let ut=D.stencilWrite;o.setTest(ut),ut&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),_e(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?I(i.SAMPLE_ALPHA_TO_COVERAGE):nt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ft(D){F!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),F=D)}function Zt(D){D!==Oc?(I(i.CULL_FACE),D!==k&&(D===Yo?i.cullFace(i.BACK):D===Fc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):nt(i.CULL_FACE),k=D}function Wt(D){D!==W&&(q&&i.lineWidth(D),W=D)}function _e(D,ht,j){D?(I(i.POLYGON_OFFSET_FILL),(N!==ht||G!==j)&&(N=ht,G=j,a.getReversed()&&(ht=-ht),i.polygonOffset(ht,j))):nt(i.POLYGON_OFFSET_FILL)}function Kt(D){D?I(i.SCISSOR_TEST):nt(i.SCISSOR_TEST)}function Ut(D){D===void 0&&(D=i.TEXTURE0+K-1),tt!==D&&(i.activeTexture(D),tt=D)}function w(D,ht,j){j===void 0&&(tt===null?j=i.TEXTURE0+K-1:j=tt);let ut=et[j];ut===void 0&&(ut={type:void 0,texture:void 0},et[j]=ut),(ut.type!==D||ut.texture!==ht)&&(tt!==j&&(i.activeTexture(j),tt=j),i.bindTexture(D,ht||Z[D]),ut.type=D,ut.texture=ht)}function te(){let D=et[tt];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Ct(){try{i.compressedTexImage2D(...arguments)}catch(D){Nt("WebGLState:",D)}}function S(){try{i.compressedTexImage3D(...arguments)}catch(D){Nt("WebGLState:",D)}}function m(){try{i.texSubImage2D(...arguments)}catch(D){Nt("WebGLState:",D)}}function O(){try{i.texSubImage3D(...arguments)}catch(D){Nt("WebGLState:",D)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(D){Nt("WebGLState:",D)}}function X(){try{i.compressedTexSubImage3D(...arguments)}catch(D){Nt("WebGLState:",D)}}function at(){try{i.texStorage2D(...arguments)}catch(D){Nt("WebGLState:",D)}}function ot(){try{i.texStorage3D(...arguments)}catch(D){Nt("WebGLState:",D)}}function $(){try{i.texImage2D(...arguments)}catch(D){Nt("WebGLState:",D)}}function Q(){try{i.texImage3D(...arguments)}catch(D){Nt("WebGLState:",D)}}function lt(D){return p[D]!==void 0?p[D]:i.getParameter(D)}function Et(D,ht){p[D]!==ht&&(i.pixelStorei(D,ht),p[D]=ht)}function dt(D){ee.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),ee.copy(D))}function ct(D){Ht.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),Ht.copy(D))}function wt(D,ht){let j=l.get(ht);j===void 0&&(j=new WeakMap,l.set(ht,j));let ut=j.get(D);ut===void 0&&(ut=i.getUniformBlockIndex(ht,D.name),j.set(D,ut))}function Dt(D,ht){let ut=l.get(ht).get(D);c.get(ht)!==ut&&(i.uniformBlockBinding(ht,ut,D.__bindingPointIndex),c.set(ht,ut))}function Bt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},p={},tt=null,et={},h={},f=new WeakMap,_=[],y=null,g=!1,d=null,E=null,L=null,M=null,b=null,A=null,C=null,x=new zt(0,0,0),T=0,U=!1,F=null,k=null,W=null,N=null,G=null,ee.set(0,0,i.canvas.width,i.canvas.height),Ht.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:I,disable:nt,bindFramebuffer:J,drawBuffers:rt,useProgram:yt,setBlending:Vt,setMaterial:Qt,setFlipSided:Ft,setCullFace:Zt,setLineWidth:Wt,setPolygonOffset:_e,setScissorTest:Kt,activeTexture:Ut,bindTexture:w,unbindTexture:te,compressedTexImage2D:Ct,compressedTexImage3D:S,texImage2D:$,texImage3D:Q,pixelStorei:Et,getParameter:lt,updateUBOMapping:wt,uniformBlockBinding:Dt,texStorage2D:at,texStorage3D:ot,texSubImage2D:m,texSubImage3D:O,compressedTexSubImage2D:V,compressedTexSubImage3D:X,scissor:dt,viewport:ct,reset:Bt}}function t1(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Lt,u=new WeakMap,p=new Set,h,f=new WeakMap,_=!1;try{_=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(S,m){return _?new OffscreenCanvas(S,m):As("canvas")}function g(S,m,O){let V=1,X=Ct(S);if((X.width>O||X.height>O)&&(V=O/Math.max(X.width,X.height)),V<1)if(typeof HTMLImageElement!="undefined"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&S instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&S instanceof ImageBitmap||typeof VideoFrame!="undefined"&&S instanceof VideoFrame){let at=Math.floor(V*X.width),ot=Math.floor(V*X.height);h===void 0&&(h=y(at,ot));let $=m?y(at,ot):h;return $.width=at,$.height=ot,$.getContext("2d").drawImage(S,0,0,at,ot),It("WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+at+"x"+ot+")."),$}else return"data"in S&&It("WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),S;return S}function d(S){return S.generateMipmaps}function E(S){i.generateMipmap(S)}function L(S){return S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?i.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(S,m,O,V,X,at=!1){if(S!==null){if(i[S]!==void 0)return i[S];It("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let ot;V&&(ot=t.get("EXT_texture_norm16"),ot||It("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=m;if(m===i.RED&&(O===i.FLOAT&&($=i.R32F),O===i.HALF_FLOAT&&($=i.R16F),O===i.UNSIGNED_BYTE&&($=i.R8),O===i.UNSIGNED_SHORT&&ot&&($=ot.R16_EXT),O===i.SHORT&&ot&&($=ot.R16_SNORM_EXT)),m===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.R8UI),O===i.UNSIGNED_SHORT&&($=i.R16UI),O===i.UNSIGNED_INT&&($=i.R32UI),O===i.BYTE&&($=i.R8I),O===i.SHORT&&($=i.R16I),O===i.INT&&($=i.R32I)),m===i.RG&&(O===i.FLOAT&&($=i.RG32F),O===i.HALF_FLOAT&&($=i.RG16F),O===i.UNSIGNED_BYTE&&($=i.RG8),O===i.UNSIGNED_SHORT&&ot&&($=ot.RG16_EXT),O===i.SHORT&&ot&&($=ot.RG16_SNORM_EXT)),m===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RG8UI),O===i.UNSIGNED_SHORT&&($=i.RG16UI),O===i.UNSIGNED_INT&&($=i.RG32UI),O===i.BYTE&&($=i.RG8I),O===i.SHORT&&($=i.RG16I),O===i.INT&&($=i.RG32I)),m===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RGB8UI),O===i.UNSIGNED_SHORT&&($=i.RGB16UI),O===i.UNSIGNED_INT&&($=i.RGB32UI),O===i.BYTE&&($=i.RGB8I),O===i.SHORT&&($=i.RGB16I),O===i.INT&&($=i.RGB32I)),m===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RGBA8UI),O===i.UNSIGNED_SHORT&&($=i.RGBA16UI),O===i.UNSIGNED_INT&&($=i.RGBA32UI),O===i.BYTE&&($=i.RGBA8I),O===i.SHORT&&($=i.RGBA16I),O===i.INT&&($=i.RGBA32I)),m===i.RGB&&(O===i.UNSIGNED_SHORT&&ot&&($=ot.RGB16_EXT),O===i.SHORT&&ot&&($=ot.RGB16_SNORM_EXT),O===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),m===i.RGBA){let Q=at?Ss:$t.getTransfer(X);O===i.FLOAT&&($=i.RGBA32F),O===i.HALF_FLOAT&&($=i.RGBA16F),O===i.UNSIGNED_BYTE&&($=Q===se?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT&&ot&&($=ot.RGBA16_EXT),O===i.SHORT&&ot&&($=ot.RGBA16_SNORM_EXT),O===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function b(S,m){let O;return S?m===null||m===ln||m===ts?O=i.DEPTH24_STENCIL8:m===cn?O=i.DEPTH32F_STENCIL8:m===Qi&&(O=i.DEPTH24_STENCIL8,It("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):m===null||m===ln||m===ts?O=i.DEPTH_COMPONENT24:m===cn?O=i.DEPTH_COMPONENT32F:m===Qi&&(O=i.DEPTH_COMPONENT16),O}function A(S,m){return d(S)===!0||S.isFramebufferTexture&&S.minFilter!==Ee&&S.minFilter!==we?Math.log2(Math.max(m.width,m.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?m.mipmaps.length:1}function C(S){let m=S.target;m.removeEventListener("dispose",C),T(m),m.isVideoTexture&&u.delete(m),m.isHTMLTexture&&p.delete(m)}function x(S){let m=S.target;m.removeEventListener("dispose",x),F(m)}function T(S){let m=n.get(S);if(m.__webglInit===void 0)return;let O=S.source,V=f.get(O);if(V){let X=V[m.__cacheKey];X.usedTimes--,X.usedTimes===0&&U(S),Object.keys(V).length===0&&f.delete(O)}n.remove(S)}function U(S){let m=n.get(S);i.deleteTexture(m.__webglTexture);let O=S.source,V=f.get(O);delete V[m.__cacheKey],a.memory.textures--}function F(S){let m=n.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),n.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(m.__webglFramebuffer[V]))for(let X=0;X<m.__webglFramebuffer[V].length;X++)i.deleteFramebuffer(m.__webglFramebuffer[V][X]);else i.deleteFramebuffer(m.__webglFramebuffer[V]);m.__webglDepthbuffer&&i.deleteRenderbuffer(m.__webglDepthbuffer[V])}else{if(Array.isArray(m.__webglFramebuffer))for(let V=0;V<m.__webglFramebuffer.length;V++)i.deleteFramebuffer(m.__webglFramebuffer[V]);else i.deleteFramebuffer(m.__webglFramebuffer);if(m.__webglDepthbuffer&&i.deleteRenderbuffer(m.__webglDepthbuffer),m.__webglMultisampledFramebuffer&&i.deleteFramebuffer(m.__webglMultisampledFramebuffer),m.__webglColorRenderbuffer)for(let V=0;V<m.__webglColorRenderbuffer.length;V++)m.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(m.__webglColorRenderbuffer[V]);m.__webglDepthRenderbuffer&&i.deleteRenderbuffer(m.__webglDepthRenderbuffer)}let O=S.textures;for(let V=0,X=O.length;V<X;V++){let at=n.get(O[V]);at.__webglTexture&&(i.deleteTexture(at.__webglTexture),a.memory.textures--),n.remove(O[V])}n.remove(S)}let k=0;function W(){k=0}function N(){return k}function G(S){k=S}function K(){let S=k;return S>=s.maxTextures&&It("WebGLTextures: Trying to use "+(S+1)+" texture units while this GPU supports only "+s.maxTextures),k+=1,S}function q(S){let m=[];return m.push(S.wrapS),m.push(S.wrapT),m.push(S.wrapR||0),m.push(S.magFilter),m.push(S.minFilter),m.push(S.anisotropy),m.push(S.internalFormat),m.push(S.format),m.push(S.type),m.push(S.generateMipmaps),m.push(S.premultiplyAlpha),m.push(S.flipY),m.push(S.unpackAlignment),m.push(S.colorSpace),m.join()}function it(S,m){let O=n.get(S);if(S.isVideoTexture&&w(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&O.__version!==S.version){let V=S.image;if(V===null)It("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)It("WebGLRenderer: Texture marked for update but image is incomplete");else{nt(O,S,m);return}}else S.isExternalTexture&&(O.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+m)}function Y(S,m){let O=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&O.__version!==S.version){nt(O,S,m);return}else S.isExternalTexture&&(O.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+m)}function tt(S,m){let O=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&O.__version!==S.version){nt(O,S,m);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+m)}function et(S,m){let O=n.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&O.__version!==S.version){J(O,S,m);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+m)}let Tt={[kr]:i.REPEAT,[gn]:i.CLAMP_TO_EDGE,[Gr]:i.MIRRORED_REPEAT},vt={[Ee]:i.NEAREST,[rh]:i.NEAREST_MIPMAP_NEAREST,[Ws]:i.NEAREST_MIPMAP_LINEAR,[we]:i.LINEAR,[_a]:i.LINEAR_MIPMAP_NEAREST,[ei]:i.LINEAR_MIPMAP_LINEAR},ee={[ch]:i.NEVER,[ph]:i.ALWAYS,[hh]:i.LESS,[to]:i.LEQUAL,[uh]:i.EQUAL,[eo]:i.GEQUAL,[dh]:i.GREATER,[fh]:i.NOTEQUAL};function Ht(S,m){if(m.type===cn&&t.has("OES_texture_float_linear")===!1&&(m.magFilter===we||m.magFilter===_a||m.magFilter===Ws||m.magFilter===ei||m.minFilter===we||m.minFilter===_a||m.minFilter===Ws||m.minFilter===ei)&&It("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(S,i.TEXTURE_WRAP_S,Tt[m.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,Tt[m.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,Tt[m.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,vt[m.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,vt[m.minFilter]),m.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,ee[m.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(m.magFilter===Ee||m.minFilter!==Ws&&m.minFilter!==ei||m.type===cn&&t.has("OES_texture_float_linear")===!1)return;if(m.anisotropy>1||n.get(m).__currentAnisotropy){let O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(S,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(m.anisotropy,s.getMaxAnisotropy())),n.get(m).__currentAnisotropy=m.anisotropy}}}function Jt(S,m){let O=!1;S.__webglInit===void 0&&(S.__webglInit=!0,m.addEventListener("dispose",C));let V=m.source,X=f.get(V);X===void 0&&(X={},f.set(V,X));let at=q(m);if(at!==S.__cacheKey){X[at]===void 0&&(X[at]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),X[at].usedTimes++;let ot=X[S.__cacheKey];ot!==void 0&&(X[S.__cacheKey].usedTimes--,ot.usedTimes===0&&U(m)),S.__cacheKey=at,S.__webglTexture=X[at].texture}return O}function Z(S,m,O){return Math.floor(Math.floor(S/O)/m)}function I(S,m,O,V){let at=S.updateRanges;if(at.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,m.width,m.height,O,V,m.data);else{at.sort((Et,dt)=>Et.start-dt.start);let ot=0;for(let Et=1;Et<at.length;Et++){let dt=at[ot],ct=at[Et],wt=dt.start+dt.count,Dt=Z(ct.start,m.width,4),Bt=Z(dt.start,m.width,4);ct.start<=wt+1&&Dt===Bt&&Z(ct.start+ct.count-1,m.width,4)===Dt?dt.count=Math.max(dt.count,ct.start+ct.count-dt.start):(++ot,at[ot]=ct)}at.length=ot+1;let $=e.getParameter(i.UNPACK_ROW_LENGTH),Q=e.getParameter(i.UNPACK_SKIP_PIXELS),lt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,m.width);for(let Et=0,dt=at.length;Et<dt;Et++){let ct=at[Et],wt=Math.floor(ct.start/4),Dt=Math.ceil(ct.count/4),Bt=wt%m.width,D=Math.floor(wt/m.width),ht=Dt,j=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Bt),e.pixelStorei(i.UNPACK_SKIP_ROWS,D),e.texSubImage2D(i.TEXTURE_2D,0,Bt,D,ht,j,O,V,m.data)}S.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,$),e.pixelStorei(i.UNPACK_SKIP_PIXELS,Q),e.pixelStorei(i.UNPACK_SKIP_ROWS,lt)}}function nt(S,m,O){let V=i.TEXTURE_2D;(m.isDataArrayTexture||m.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),m.isData3DTexture&&(V=i.TEXTURE_3D);let X=Jt(S,m),at=m.source;e.bindTexture(V,S.__webglTexture,i.TEXTURE0+O);let ot=n.get(at);if(at.version!==ot.__version||X===!0){if(e.activeTexture(i.TEXTURE0+O),(typeof ImageBitmap!="undefined"&&m.image instanceof ImageBitmap)===!1){let j=$t.getPrimaries($t.workingColorSpace),ut=m.colorSpace===Ln?null:$t.getPrimaries(m.colorSpace),gt=m.colorSpace===Ln||j===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,m.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,m.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt)}e.pixelStorei(i.UNPACK_ALIGNMENT,m.unpackAlignment);let Q=g(m.image,!1,s.maxTextureSize);Q=te(m,Q);let lt=r.convert(m.format,m.colorSpace),Et=r.convert(m.type),dt=M(m.internalFormat,lt,Et,m.normalized,m.colorSpace,m.isVideoTexture);Ht(V,m);let ct,wt=m.mipmaps,Dt=m.isVideoTexture!==!0,Bt=ot.__version===void 0||X===!0,D=at.dataReady,ht=A(m,Q);if(m.isDepthTexture)dt=b(m.format===ni,m.type),Bt&&(Dt?e.texStorage2D(i.TEXTURE_2D,1,dt,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,dt,Q.width,Q.height,0,lt,Et,null));else if(m.isDataTexture)if(wt.length>0){Dt&&Bt&&e.texStorage2D(i.TEXTURE_2D,ht,dt,wt[0].width,wt[0].height);for(let j=0,ut=wt.length;j<ut;j++)ct=wt[j],Dt?D&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,ct.width,ct.height,lt,Et,ct.data):e.texImage2D(i.TEXTURE_2D,j,dt,ct.width,ct.height,0,lt,Et,ct.data);m.generateMipmaps=!1}else Dt?(Bt&&e.texStorage2D(i.TEXTURE_2D,ht,dt,Q.width,Q.height),D&&I(m,Q,lt,Et)):e.texImage2D(i.TEXTURE_2D,0,dt,Q.width,Q.height,0,lt,Et,Q.data);else if(m.isCompressedTexture)if(m.isCompressedArrayTexture){Dt&&Bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ht,dt,wt[0].width,wt[0].height,Q.depth);for(let j=0,ut=wt.length;j<ut;j++)if(ct=wt[j],m.format!==Ke)if(lt!==null)if(Dt){if(D)if(m.layerUpdates.size>0){let gt=Ml(ct.width,ct.height,m.format,m.type);for(let st of m.layerUpdates){let Rt=ct.data.subarray(st*gt/ct.data.BYTES_PER_ELEMENT,(st+1)*gt/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,st,ct.width,ct.height,1,lt,Rt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,ct.width,ct.height,Q.depth,lt,ct.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,j,dt,ct.width,ct.height,Q.depth,0,ct.data,0,0);else It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Dt?D&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,ct.width,ct.height,Q.depth,lt,Et,ct.data):e.texImage3D(i.TEXTURE_2D_ARRAY,j,dt,ct.width,ct.height,Q.depth,0,lt,Et,ct.data);m.layerUpdates.size>0&&m.clearLayerUpdates()}else{Dt&&Bt&&e.texStorage2D(i.TEXTURE_2D,ht,dt,wt[0].width,wt[0].height);for(let j=0,ut=wt.length;j<ut;j++)ct=wt[j],m.format!==Ke?lt!==null?Dt?D&&e.compressedTexSubImage2D(i.TEXTURE_2D,j,0,0,ct.width,ct.height,lt,ct.data):e.compressedTexImage2D(i.TEXTURE_2D,j,dt,ct.width,ct.height,0,ct.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Dt?D&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,ct.width,ct.height,lt,Et,ct.data):e.texImage2D(i.TEXTURE_2D,j,dt,ct.width,ct.height,0,lt,Et,ct.data)}else if(m.isDataArrayTexture)if(Dt){if(Bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ht,dt,Q.width,Q.height,Q.depth),D)if(m.layerUpdates.size>0){let j=Ml(Q.width,Q.height,m.format,m.type);for(let ut of m.layerUpdates){let gt=Q.data.subarray(ut*j/Q.data.BYTES_PER_ELEMENT,(ut+1)*j/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ut,Q.width,Q.height,1,lt,Et,gt)}m.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,lt,Et,Q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,dt,Q.width,Q.height,Q.depth,0,lt,Et,Q.data);else if(m.isData3DTexture)Dt?(Bt&&e.texStorage3D(i.TEXTURE_3D,ht,dt,Q.width,Q.height,Q.depth),D&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,lt,Et,Q.data)):e.texImage3D(i.TEXTURE_3D,0,dt,Q.width,Q.height,Q.depth,0,lt,Et,Q.data);else if(m.isFramebufferTexture){if(Bt)if(Dt)e.texStorage2D(i.TEXTURE_2D,ht,dt,Q.width,Q.height);else{let j=Q.width,ut=Q.height;for(let gt=0;gt<ht;gt++)e.texImage2D(i.TEXTURE_2D,gt,dt,j,ut,0,lt,Et,null),j>>=1,ut>>=1}}else if(m.isHTMLTexture){if("texElementImage2D"in i){let j=i.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),Q.parentNode!==j){j.appendChild(Q),p.add(m),j.onpaint=ut=>{let gt=ut.changedElements;for(let st of p)gt.includes(st.image)&&(st.needsUpdate=!0)},j.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Q);else{let gt=i.RGBA,st=i.RGBA,Rt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,gt,st,Rt,Q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(wt.length>0){if(Dt&&Bt){let j=Ct(wt[0]);e.texStorage2D(i.TEXTURE_2D,ht,dt,j.width,j.height)}for(let j=0,ut=wt.length;j<ut;j++)ct=wt[j],Dt?D&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,lt,Et,ct):e.texImage2D(i.TEXTURE_2D,j,dt,lt,Et,ct);m.generateMipmaps=!1}else if(Dt){if(Bt){let j=Ct(Q);e.texStorage2D(i.TEXTURE_2D,ht,dt,j.width,j.height)}D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt,Et,Q)}else e.texImage2D(i.TEXTURE_2D,0,dt,lt,Et,Q);d(m)&&E(V),ot.__version=at.version,m.onUpdate&&m.onUpdate(m)}S.__version=m.version}function J(S,m,O){if(m.image.length!==6)return;let V=Jt(S,m),X=m.source;e.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+O);let at=n.get(X);if(X.version!==at.__version||V===!0){e.activeTexture(i.TEXTURE0+O);let ot=$t.getPrimaries($t.workingColorSpace),$=m.colorSpace===Ln?null:$t.getPrimaries(m.colorSpace),Q=m.colorSpace===Ln||ot===$?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,m.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,m.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,m.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let lt=m.isCompressedTexture||m.image[0].isCompressedTexture,Et=m.image[0]&&m.image[0].isDataTexture,dt=[];for(let st=0;st<6;st++)!lt&&!Et?dt[st]=g(m.image[st],!0,s.maxCubemapSize):dt[st]=Et?m.image[st].image:m.image[st],dt[st]=te(m,dt[st]);let ct=dt[0],wt=r.convert(m.format,m.colorSpace),Dt=r.convert(m.type),Bt=M(m.internalFormat,wt,Dt,m.normalized,m.colorSpace),D=m.isVideoTexture!==!0,ht=at.__version===void 0||V===!0,j=X.dataReady,ut=A(m,ct);Ht(i.TEXTURE_CUBE_MAP,m);let gt;if(lt){D&&ht&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ut,Bt,ct.width,ct.height);for(let st=0;st<6;st++){gt=dt[st].mipmaps;for(let Rt=0;Rt<gt.length;Rt++){let bt=gt[Rt];m.format!==Ke?wt!==null?D?j&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Rt,0,0,bt.width,bt.height,wt,bt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Rt,Bt,bt.width,bt.height,0,bt.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Rt,0,0,bt.width,bt.height,wt,Dt,bt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Rt,Bt,bt.width,bt.height,0,wt,Dt,bt.data)}}}else{if(gt=m.mipmaps,D&&ht){gt.length>0&&ut++;let st=Ct(dt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ut,Bt,st.width,st.height)}for(let st=0;st<6;st++)if(Et){D?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,dt[st].width,dt[st].height,wt,Dt,dt[st].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Bt,dt[st].width,dt[st].height,0,wt,Dt,dt[st].data);for(let Rt=0;Rt<gt.length;Rt++){let he=gt[Rt].image[st].image;D?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Rt+1,0,0,he.width,he.height,wt,Dt,he.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Rt+1,Bt,he.width,he.height,0,wt,Dt,he.data)}}else{D?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,wt,Dt,dt[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Bt,wt,Dt,dt[st]);for(let Rt=0;Rt<gt.length;Rt++){let bt=gt[Rt];D?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Rt+1,0,0,wt,Dt,bt.image[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Rt+1,Bt,wt,Dt,bt.image[st])}}}d(m)&&E(i.TEXTURE_CUBE_MAP),at.__version=X.version,m.onUpdate&&m.onUpdate(m)}S.__version=m.version}function rt(S,m,O,V,X,at){let ot=r.convert(O.format,O.colorSpace),$=r.convert(O.type),Q=M(O.internalFormat,ot,$,O.normalized,O.colorSpace),lt=n.get(m),Et=n.get(O);if(Et.__renderTarget=m,!lt.__hasExternalTextures){let dt=Math.max(1,m.width>>at),ct=Math.max(1,m.height>>at);X===i.TEXTURE_3D||X===i.TEXTURE_2D_ARRAY?e.texImage3D(X,at,Q,dt,ct,m.depth,0,ot,$,null):e.texImage2D(X,at,Q,dt,ct,0,ot,$,null)}e.bindFramebuffer(i.FRAMEBUFFER,S),Ut(m)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,X,Et.__webglTexture,0,Kt(m)):(X===i.TEXTURE_2D||X>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,X,Et.__webglTexture,at),e.bindFramebuffer(i.FRAMEBUFFER,null)}function yt(S,m,O){if(i.bindRenderbuffer(i.RENDERBUFFER,S),m.depthBuffer){let V=m.depthTexture,X=V&&V.isDepthTexture?V.type:null,at=b(m.stencilBuffer,X),ot=m.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ut(m)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Kt(m),at,m.width,m.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,Kt(m),at,m.width,m.height):i.renderbufferStorage(i.RENDERBUFFER,at,m.width,m.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ot,i.RENDERBUFFER,S)}else{let V=m.textures;for(let X=0;X<V.length;X++){let at=V[X],ot=r.convert(at.format,at.colorSpace),$=r.convert(at.type),Q=M(at.internalFormat,ot,$,at.normalized,at.colorSpace);Ut(m)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Kt(m),Q,m.width,m.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,Kt(m),Q,m.width,m.height):i.renderbufferStorage(i.RENDERBUFFER,Q,m.width,m.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Yt(S,m,O){let V=m.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,S),!(m.depthTexture&&m.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let X=n.get(m.depthTexture);if(X.__renderTarget=m,(!X.__webglTexture||m.depthTexture.image.width!==m.width||m.depthTexture.image.height!==m.height)&&(m.depthTexture.image.width=m.width,m.depthTexture.image.height=m.height,m.depthTexture.needsUpdate=!0),V){if(X.__webglInit===void 0&&(X.__webglInit=!0,m.depthTexture.addEventListener("dispose",C)),X.__webglTexture===void 0){X.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),Ht(i.TEXTURE_CUBE_MAP,m.depthTexture);let lt=r.convert(m.depthTexture.format),Et=r.convert(m.depthTexture.type),dt;m.depthTexture.format===_n?dt=i.DEPTH_COMPONENT24:m.depthTexture.format===ni&&(dt=i.DEPTH24_STENCIL8);for(let ct=0;ct<6;ct++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,dt,m.width,m.height,0,lt,Et,null)}}else it(m.depthTexture,0);let at=X.__webglTexture,ot=Kt(m),$=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+O:i.TEXTURE_2D,Q=m.depthTexture.format===ni?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(m.depthTexture.format===_n)Ut(m)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,$,at,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,Q,$,at,0);else if(m.depthTexture.format===ni)Ut(m)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,$,at,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,Q,$,at,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Pt(S){let m=n.get(S),O=S.isWebGLCubeRenderTarget===!0;if(m.__boundDepthTexture!==S.depthTexture){let V=S.depthTexture;if(m.__depthDisposeCallback&&m.__depthDisposeCallback(),V){let X=()=>{delete m.__boundDepthTexture,delete m.__depthDisposeCallback,V.removeEventListener("dispose",X)};V.addEventListener("dispose",X),m.__depthDisposeCallback=X}m.__boundDepthTexture=V}if(S.depthTexture&&!m.__autoAllocateDepthBuffer)if(O)for(let V=0;V<6;V++)Yt(m.__webglFramebuffer[V],S,V);else{let V=S.texture.mipmaps;V&&V.length>0?Yt(m.__webglFramebuffer[0],S,0):Yt(m.__webglFramebuffer,S,0)}else if(O){m.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(e.bindFramebuffer(i.FRAMEBUFFER,m.__webglFramebuffer[V]),m.__webglDepthbuffer[V]===void 0)m.__webglDepthbuffer[V]=i.createRenderbuffer(),yt(m.__webglDepthbuffer[V],S,!1);else{let X=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=m.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,at)}}else{let V=S.texture.mipmaps;if(V&&V.length>0?e.bindFramebuffer(i.FRAMEBUFFER,m.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,m.__webglFramebuffer),m.__webglDepthbuffer===void 0)m.__webglDepthbuffer=i.createRenderbuffer(),yt(m.__webglDepthbuffer,S,!1);else{let X=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=m.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,at)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Vt(S,m,O){let V=n.get(S);m!==void 0&&rt(V.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Pt(S)}function Qt(S){let m=S.texture,O=n.get(S),V=n.get(m);S.addEventListener("dispose",x);let X=S.textures,at=S.isWebGLCubeRenderTarget===!0,ot=X.length>1;if(ot||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=m.version,a.memory.textures++),at){O.__webglFramebuffer=[];for(let $=0;$<6;$++)if(m.mipmaps&&m.mipmaps.length>0){O.__webglFramebuffer[$]=[];for(let Q=0;Q<m.mipmaps.length;Q++)O.__webglFramebuffer[$][Q]=i.createFramebuffer()}else O.__webglFramebuffer[$]=i.createFramebuffer()}else{if(m.mipmaps&&m.mipmaps.length>0){O.__webglFramebuffer=[];for(let $=0;$<m.mipmaps.length;$++)O.__webglFramebuffer[$]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(ot)for(let $=0,Q=X.length;$<Q;$++){let lt=n.get(X[$]);lt.__webglTexture===void 0&&(lt.__webglTexture=i.createTexture(),a.memory.textures++)}if(S.samples>0&&Ut(S)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let $=0;$<X.length;$++){let Q=X[$];O.__webglColorRenderbuffer[$]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[$]);let lt=r.convert(Q.format,Q.colorSpace),Et=r.convert(Q.type),dt=M(Q.internalFormat,lt,Et,Q.normalized,Q.colorSpace,S.isXRRenderTarget===!0),ct=Kt(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,dt,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.RENDERBUFFER,O.__webglColorRenderbuffer[$])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),yt(O.__webglDepthRenderbuffer,S,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(at){e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),Ht(i.TEXTURE_CUBE_MAP,m);for(let $=0;$<6;$++)if(m.mipmaps&&m.mipmaps.length>0)for(let Q=0;Q<m.mipmaps.length;Q++)rt(O.__webglFramebuffer[$][Q],S,m,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Q);else rt(O.__webglFramebuffer[$],S,m,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);d(m)&&E(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ot){for(let $=0,Q=X.length;$<Q;$++){let lt=X[$],Et=n.get(lt),dt=i.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(dt=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(dt,Et.__webglTexture),Ht(dt,lt),rt(O.__webglFramebuffer,S,lt,i.COLOR_ATTACHMENT0+$,dt,0),d(lt)&&E(dt)}e.unbindTexture()}else{let $=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&($=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture($,V.__webglTexture),Ht($,m),m.mipmaps&&m.mipmaps.length>0)for(let Q=0;Q<m.mipmaps.length;Q++)rt(O.__webglFramebuffer[Q],S,m,i.COLOR_ATTACHMENT0,$,Q);else rt(O.__webglFramebuffer,S,m,i.COLOR_ATTACHMENT0,$,0);d(m)&&E($),e.unbindTexture()}S.depthBuffer&&Pt(S)}function Ft(S){let m=S.textures;for(let O=0,V=m.length;O<V;O++){let X=m[O];if(d(X)){let at=L(S),ot=n.get(X).__webglTexture;e.bindTexture(at,ot),E(at),e.unbindTexture()}}}let Zt=[],Wt=[];function _e(S){if(S.samples>0){if(Ut(S)===!1){let m=S.textures,O=S.width,V=S.height,X=i.COLOR_BUFFER_BIT,at=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=n.get(S),$=m.length>1;if($)for(let lt=0;lt<m.length;lt++)e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ot.__webglMultisampledFramebuffer);let Q=S.texture.mipmaps;Q&&Q.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglFramebuffer);for(let lt=0;lt<m.length;lt++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(X|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(X|=i.STENCIL_BUFFER_BIT)),$){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ot.__webglColorRenderbuffer[lt]);let Et=n.get(m[lt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Et,0)}i.blitFramebuffer(0,0,O,V,0,0,O,V,X,i.NEAREST),c===!0&&(Zt.length=0,Wt.length=0,Zt.push(i.COLOR_ATTACHMENT0+lt),S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&(Zt.push(at),Wt.push(at),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Wt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Zt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),$)for(let lt=0;lt<m.length;lt++){e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,ot.__webglColorRenderbuffer[lt]);let Et=n.get(m[lt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,Et,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&c){let m=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[m])}}}function Kt(S){return Math.min(s.maxSamples,S.samples)}function Ut(S){let m=n.get(S);return S.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&m.__useRenderToTexture!==!1}function w(S){let m=a.render.frame;u.get(S)!==m&&(u.set(S,m),S.update())}function te(S,m){let O=S.colorSpace,V=S.format,X=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||O!==Ms&&O!==Ln&&($t.getTransfer(O)===se?(V!==Ke||X!==Ze)&&It("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Nt("WebGLTextures: Unsupported texture color space:",O)),m}function Ct(S){return typeof HTMLImageElement!="undefined"&&S instanceof HTMLImageElement?(l.width=S.naturalWidth||S.width,l.height=S.naturalHeight||S.height):typeof VideoFrame!="undefined"&&S instanceof VideoFrame?(l.width=S.displayWidth,l.height=S.displayHeight):(l.width=S.width,l.height=S.height),l}this.allocateTextureUnit=K,this.resetTextureUnits=W,this.getTextureUnits=N,this.setTextureUnits=G,this.setTexture2D=it,this.setTexture2DArray=Y,this.setTexture3D=tt,this.setTextureCube=et,this.rebindTextures=Vt,this.setupRenderTarget=Qt,this.updateRenderTargetMipmap=Ft,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=Ut,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function e1(i,t){function e(n,s=Ln){let r,a=$t.getTransfer(s);if(n===Ze)return i.UNSIGNED_BYTE;if(n===va)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ya)return i.UNSIGNED_SHORT_5_5_5_1;if(n===cl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===hl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ol)return i.BYTE;if(n===ll)return i.SHORT;if(n===Qi)return i.UNSIGNED_SHORT;if(n===xa)return i.INT;if(n===ln)return i.UNSIGNED_INT;if(n===cn)return i.FLOAT;if(n===hn)return i.HALF_FLOAT;if(n===ul)return i.ALPHA;if(n===dl)return i.RGB;if(n===Ke)return i.RGBA;if(n===_n)return i.DEPTH_COMPONENT;if(n===ni)return i.DEPTH_STENCIL;if(n===fl)return i.RED;if(n===Ma)return i.RED_INTEGER;if(n===ii)return i.RG;if(n===Sa)return i.RG_INTEGER;if(n===ba)return i.RGBA_INTEGER;if(n===Xs||n===qs||n===Ys||n===Zs)if(a===se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Xs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Xs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===qs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ys)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Zs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Aa||n===Ta||n===Ea||n===wa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Aa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ta)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ea)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===wa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ca||n===Ra||n===Pa||n===Ia||n===La||n===$s||n===Da)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ca||n===Ra)return a===se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Pa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ia)return r.COMPRESSED_R11_EAC;if(n===La)return r.COMPRESSED_SIGNED_R11_EAC;if(n===$s)return r.COMPRESSED_RG11_EAC;if(n===Da)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ua||n===Na||n===Oa||n===Fa||n===Ba||n===za||n===Va||n===ka||n===Ga||n===Ha||n===Wa||n===Xa||n===qa||n===Ya)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ua)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Na)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Oa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Fa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ba)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===za)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Va)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ka)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ga)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ha)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Wa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Xa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===qa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ya)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Za||n===$a||n===Ja)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Za)return a===se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===$a)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ja)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ka||n===ja||n===Js||n===Qa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ka)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ja)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Js)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Qa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ts?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var n1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,i1=`
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

}`,Vl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Os(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Me({vertexShader:n1,fragmentShader:i1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ze(new Fs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},kl=class extends an{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,p=null,h=null,f=null,_=null,y=typeof XRWebGLBinding!="undefined",g=new Vl,d={},E=e.getContextAttributes(),L=null,M=null,b=[],A=[],C=new Lt,x=null,T=null,U=new Ie;U.viewport=new me;let F=new Ie;F.viewport=new me;let k=[U,F],W=new fa,N=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let I=b[Z];return I===void 0&&(I=new Wi,b[Z]=I),I.getTargetRaySpace()},this.getControllerGrip=function(Z){let I=b[Z];return I===void 0&&(I=new Wi,b[Z]=I),I.getGripSpace()},this.getHand=function(Z){let I=b[Z];return I===void 0&&(I=new Wi,b[Z]=I),I.getHandSpace()};function K(Z){let I=A.indexOf(Z.inputSource);if(I===-1)return;let nt=b[I];nt!==void 0&&(nt.update(Z.inputSource,Z.frame,l||a),nt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function q(){s.removeEventListener("select",K),s.removeEventListener("selectstart",K),s.removeEventListener("selectend",K),s.removeEventListener("squeeze",K),s.removeEventListener("squeezestart",K),s.removeEventListener("squeezeend",K),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",it);for(let Z=0;Z<b.length;Z++){let I=A[Z];I!==null&&(A[Z]=null,b[Z].disconnect(I))}N=null,G=null,g.reset();for(let Z in d)delete d[Z];if(t.setRenderTarget(L),f=null,h=null,p=null,s=null,M=null,Jt.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(C.width,C.height,!1),T!==null){let Z=T.camera;Z.fov=T.fov,Z.zoom=T.zoom,Z.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&It("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&It("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return p===null&&y&&(p=new XRWebGLBinding(s,e)),p},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(L=t.getRenderTarget(),s.addEventListener("select",K),s.addEventListener("selectstart",K),s.addEventListener("selectend",K),s.addEventListener("squeeze",K),s.addEventListener("squeezestart",K),s.addEventListener("squeezeend",K),s.addEventListener("end",q),s.addEventListener("inputsourceschange",it),E.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(C),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let nt=null,J=null,rt=null;E.depth&&(rt=E.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=E.stencil?ni:_n,J=E.stencil?ts:ln);let yt={colorFormat:e.RGBA8,depthFormat:rt,scaleFactor:r};p=this.getBinding(),h=p.createProjectionLayer(yt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),M=new Ve(h.textureWidth,h.textureHeight,{format:Ke,type:Ze,depthTexture:new Yn(h.textureWidth,h.textureHeight,J,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let nt={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Ve(f.framebufferWidth,f.framebufferHeight,{format:Ke,type:Ze,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Jt.setContext(s),Jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function it(Z){for(let I=0;I<Z.removed.length;I++){let nt=Z.removed[I],J=A.indexOf(nt);J>=0&&(A[J]=null,b[J].disconnect(nt))}for(let I=0;I<Z.added.length;I++){let nt=Z.added[I],J=A.indexOf(nt);if(J===-1){for(let yt=0;yt<b.length;yt++)if(yt>=A.length){A.push(nt),J=yt;break}else if(A[yt]===null){A[yt]=nt,J=yt;break}if(J===-1)break}let rt=b[J];rt&&rt.connect(nt)}}let Y=new R,tt=new R;function et(Z,I,nt){Y.setFromMatrixPosition(I.matrixWorld),tt.setFromMatrixPosition(nt.matrixWorld);let J=Y.distanceTo(tt),rt=I.projectionMatrix.elements,yt=nt.projectionMatrix.elements,Yt=rt[14]/(rt[10]-1),Pt=rt[14]/(rt[10]+1),Vt=(rt[9]+1)/rt[5],Qt=(rt[9]-1)/rt[5],Ft=(rt[8]-1)/rt[0],Zt=(yt[8]+1)/yt[0],Wt=Yt*Ft,_e=Yt*Zt,Kt=J/(-Ft+Zt),Ut=Kt*-Ft;if(I.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ut),Z.translateZ(Kt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),rt[10]===-1)Z.projectionMatrix.copy(I.projectionMatrix),Z.projectionMatrixInverse.copy(I.projectionMatrixInverse);else{let w=Yt+Kt,te=Pt+Kt,Ct=Wt-Ut,S=_e+(J-Ut),m=Vt*Pt/te*w,O=Qt*Pt/te*w;Z.projectionMatrix.makePerspective(Ct,S,m,O,w,te),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Tt(Z,I){I===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(I.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let I=Z.near,nt=Z.far;g.texture!==null&&(g.depthNear>0&&(I=g.depthNear),g.depthFar>0&&(nt=g.depthFar)),W.near=F.near=U.near=I,W.far=F.far=U.far=nt,(N!==W.near||G!==W.far)&&(s.updateRenderState({depthNear:W.near,depthFar:W.far}),N=W.near,G=W.far),W.layers.mask=Z.layers.mask|6,U.layers.mask=W.layers.mask&-5,F.layers.mask=W.layers.mask&-3;let J=Z.parent,rt=W.cameras;Tt(W,J);for(let yt=0;yt<rt.length;yt++)Tt(rt[yt],J);rt.length===2?et(W,U,F):W.projectionMatrix.copy(U.projectionMatrix),T===null&&Z.isPerspectiveCamera&&(T={camera:Z,fov:Z.fov,zoom:Z.zoom}),vt(Z,W,J)};function vt(Z,I,nt){nt===null?Z.matrix.copy(I.matrixWorld):(Z.matrix.copy(nt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(I.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(I.projectionMatrix),Z.projectionMatrixInverse.copy(I.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Gi*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(Z){c=Z,h!==null&&(h.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(W)},this.getCameraTexture=function(Z){return d[Z]};let ee=null;function Ht(Z,I){if(u=I.getViewerPose(l||a),_=I,u!==null){let nt=u.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let J=!1;nt.length!==W.cameras.length&&(W.cameras.length=0,J=!0);for(let Pt=0;Pt<nt.length;Pt++){let Vt=nt[Pt],Qt=null;if(f!==null)Qt=f.getViewport(Vt);else{let Zt=p.getViewSubImage(h,Vt);Qt=Zt.viewport,Pt===0&&(t.setRenderTargetTextures(M,Zt.colorTexture,Zt.depthStencilTexture),t.setRenderTarget(M))}let Ft=k[Pt];Ft===void 0&&(Ft=new Ie,Ft.layers.enable(Pt),Ft.viewport=new me,k[Pt]=Ft),Ft.matrix.fromArray(Vt.transform.matrix),Ft.matrix.decompose(Ft.position,Ft.quaternion,Ft.scale),Ft.projectionMatrix.fromArray(Vt.projectionMatrix),Ft.projectionMatrixInverse.copy(Ft.projectionMatrix).invert(),Ft.viewport.set(Qt.x,Qt.y,Qt.width,Qt.height),Pt===0&&(W.matrix.copy(Ft.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),J===!0&&W.cameras.push(Ft)}let rt=s.enabledFeatures;if(rt&&rt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){p=n.getBinding();let Pt=p.getDepthInformation(nt[0]);Pt&&Pt.isValid&&Pt.texture&&g.init(Pt,s.renderState)}if(rt&&rt.includes("camera-access")&&y){t.state.unbindTexture(),p=n.getBinding();for(let Pt=0;Pt<nt.length;Pt++){let Vt=nt[Pt].camera;if(Vt){let Qt=d[Vt];Qt||(Qt=new Os,d[Vt]=Qt);let Ft=p.getCameraImage(Vt);Qt.sourceTexture=Ft}}}}for(let nt=0;nt<b.length;nt++){let J=A[nt],rt=b[nt];J!==null&&rt!==void 0&&rt.update(J,I,l||a)}ee&&ee(Z,I),I.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:I}),_=null}let Jt=new Xh;Jt.setAnimationLoop(Ht),this.setAnimationLoop=function(Z){ee=Z},this.dispose=function(){}}},s1=new pe,Kh=new Ot;Kh.set(-1,0,0,0,1,0,0,0,1);function r1(i,t){function e(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function n(g,d){d.color.getRGB(g.fogColor.value,xl(i)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function s(g,d,E,L,M){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(g,d):d.isMeshLambertMaterial?(r(g,d),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(g,d),p(g,d)):d.isMeshPhongMaterial?(r(g,d),u(g,d),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(g,d),h(g,d),d.isMeshPhysicalMaterial&&f(g,d,M)):d.isMeshMatcapMaterial?(r(g,d),_(g,d)):d.isMeshDepthMaterial?r(g,d):d.isMeshDistanceMaterial?(r(g,d),y(g,d)):d.isMeshNormalMaterial?r(g,d):d.isLineBasicMaterial?(a(g,d),d.isLineDashedMaterial&&o(g,d)):d.isPointsMaterial?c(g,d,E,L):d.isSpriteMaterial?l(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,e(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,e(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===Le&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,e(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===Le&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,e(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,e(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);let E=t.get(d),L=E.envMap,M=E.envMapRotation;L&&(g.envMap.value=L,g.envMapRotation.value.setFromMatrix4(s1.makeRotationFromEuler(M)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Kh),g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap&&(g.lightMap.value=d.lightMap,g.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,g.lightMapTransform)),d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,g.aoMapTransform))}function a(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,e(d.map,g.mapTransform))}function o(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function c(g,d,E,L){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*E,g.scale.value=L*.5,d.map&&(g.map.value=d.map,e(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function l(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,e(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function u(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function p(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function h(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,g.roughnessMapTransform)),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function f(g,d,E){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Le&&g.clearcoatNormalScale.value.negate())),d.dispersion>0&&(g.dispersion.value=d.dispersion),d.retroreflectivity>0&&(g.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=E.texture,g.transmissionSamplerSize.value.set(E.width,E.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,d){d.matcap&&(g.matcap.value=d.matcap)}function y(g,d){let E=t.get(d).light;g.referencePosition.value.setFromMatrixPosition(E.matrixWorld),g.nearDistance.value=E.shadow.camera.near,g.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function a1(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,b){let A=b.program;n.uniformBlockBinding(M,A)}function l(M,b){let A=s[M.id];A===void 0&&(g(M),A=u(M),s[M.id]=A,M.addEventListener("dispose",E));let C=b.program;n.updateUBOMapping(M,C);let x=t.render.frame;r[M.id]!==x&&(h(M),r[M.id]=x)}function u(M){let b=p();M.__bindingPointIndex=b;let A=i.createBuffer(),C=M.__size,x=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,C,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,A),A}function p(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Nt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){let b=s[M.id],A=M.uniforms,C=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let x=0,T=A.length;x<T;x++){let U=A[x];if(Array.isArray(U))for(let F=0,k=U.length;F<k;F++)f(U[F],x,F,C);else f(U,x,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,b,A,C){if(y(M,b,A,C)===!0){let x=M.__offset,T=M.value;if(Array.isArray(T)){let U=0;for(let F=0;F<T.length;F++){let k=T[F],W=d(k);_(k,M.__data,U),typeof k!="number"&&typeof k!="boolean"&&!k.isMatrix3&&!ArrayBuffer.isView(k)&&(U+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(T,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,M.__data)}}function _(M,b,A){typeof M=="number"||typeof M=="boolean"?b[0]=M:M.isMatrix3?(b[0]=M.elements[0],b[1]=M.elements[1],b[2]=M.elements[2],b[3]=0,b[4]=M.elements[3],b[5]=M.elements[4],b[6]=M.elements[5],b[7]=0,b[8]=M.elements[6],b[9]=M.elements[7],b[10]=M.elements[8],b[11]=0):ArrayBuffer.isView(M)?b.set(new M.constructor(M.buffer,M.byteOffset,b.length)):M.toArray(b,A)}function y(M,b,A,C){let x=M.value,T=b+"_"+A;if(C[T]===void 0)return typeof x=="number"||typeof x=="boolean"?C[T]=x:ArrayBuffer.isView(x)?C[T]=x.slice():C[T]=x.clone(),!0;{let U=C[T];if(typeof x=="number"||typeof x=="boolean"){if(U!==x)return C[T]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(U.equals(x)===!1)return U.copy(x),!0}}return!1}function g(M){let b=M.uniforms,A=0,C=16;for(let T=0,U=b.length;T<U;T++){let F=Array.isArray(b[T])?b[T]:[b[T]];for(let k=0,W=F.length;k<W;k++){let N=F[k],G=Array.isArray(N.value)?N.value:[N.value];for(let K=0,q=G.length;K<q;K++){let it=G[K],Y=d(it),tt=A%C,et=tt%Y.boundary,Tt=tt+et;A+=et,Tt!==0&&C-Tt<Y.storage&&(A+=C-Tt),N.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=A,A+=Y.storage}}}let x=A%C;return x>0&&(A+=C-x),M.__size=A,M.__cache={},this}function d(M){let b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?It("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(b.boundary=16,b.storage=M.byteLength):It("WebGLRenderer: Unsupported uniform value type.",M),b}function E(M){let b=M.target;b.removeEventListener("dispose",E);let A=a.indexOf(b.__bindingPointIndex);a.splice(A,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function L(){for(let M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:c,update:l,dispose:L}}var o1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Mn=null;function l1(){return Mn===null&&(Mn=new Zr(o1,16,16,ii,hn),Mn.name="DFG_LUT",Mn.minFilter=we,Mn.magFilter=we,Mn.wrapS=gn,Mn.wrapT=gn,Mn.generateMipmaps=!1,Mn.needsUpdate=!0),Mn}var ao=class{constructor(t={}){let{canvas:e=mh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1,outputBufferType:f=Ze}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;let y=f,g=new Set([ba,Sa,Ma]),d=new Set([Ze,ln,Qi,ts,va,ya]),E=new Uint32Array(4),L=new Int32Array(4),M=new R,b=null,A=null,C=[],x=[],T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=on,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let U=this,F=!1,k=null,W=null,N=null,G=null;this._outputColorSpace=Oe;let K=0,q=0,it=null,Y=-1,tt=null,et=new me,Tt=new me,vt=null,ee=new zt(0),Ht=0,Jt=e.width,Z=e.height,I=1,nt=null,J=null,rt=new me(0,0,Jt,Z),yt=new me(0,0,Jt,Z),Yt=!1,Pt=new Ls,Vt=!1,Qt=!1,Ft=new pe,Zt=new R,Wt=new me,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Kt=!1;function Ut(){return it===null?I:1}let w=n;function te(v,P){return e.getContext(v,P)}let Ct,S,m,O,V,X,at,ot,$,Q,lt,Et,dt,ct,wt,Dt,Bt,D,ht,j,ut,gt,st;try{let v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",he,!1),e.addEventListener("webglcontextrestored",ne,!1),e.addEventListener("webglcontextcreationerror",Qe,!1),w===null){let P="webgl2";if(w=te(P,v),w===null)throw te(P)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Rt()}catch(v){throw e.removeEventListener("webglcontextlost",he,!1),e.removeEventListener("webglcontextrestored",ne,!1),e.removeEventListener("webglcontextcreationerror",Qe,!1),Nt("WebGLRenderer: "+v.message),v}function Rt(){Ct=new m0(w),Ct.init(),ut=new e1(w,Ct),S=new r0(w,Ct,t,ut),m=new Qm(w,Ct),S.reversedDepthBuffer&&h&&m.buffers.depth.setReversed(!0),W=w.createFramebuffer(),N=w.createFramebuffer(),G=w.createFramebuffer(),O=new x0(w),V=new zm,X=new t1(w,Ct,m,V,S,ut,O),at=new p0(U),ot=new vd(w),gt=new i0(w,ot),$=new g0(w,ot,O,gt),Q=new y0(w,$,ot,gt,O),D=new v0(w,S,X),wt=new a0(V),lt=new Bm(U,at,Ct,S,gt,wt),Et=new r1(U,V),dt=new km,ct=new Ym(Ct),Bt=new n0(U,at,m,Q,_,c),Dt=new jm(U,Q,S),st=new a1(w,O,S,m),ht=new s0(w,Ct,O),j=new _0(w,Ct,O),O.programs=lt.programs,U.capabilities=S,U.extensions=Ct,U.properties=V,U.renderLists=dt,U.shadowMap=Dt,U.state=m,U.info=O}y!==Ze&&(T=new S0(y,e.width,e.height,o,s,r));let bt=new kl(U,w);this.xr=bt,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){let v=Ct.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=Ct.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(v){v!==void 0&&(I=v,this.setSize(Jt,Z,!1))},this.getSize=function(v){return v.set(Jt,Z)},this.setSize=function(v,P,H=!0){if(bt.isPresenting){It("WebGLRenderer: Can't change size while VR device is presenting.");return}Jt=v,Z=P,e.width=Math.floor(v*I),e.height=Math.floor(P*I),H===!0&&(e.style.width=v+"px",e.style.height=P+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,v,P)},this.getDrawingBufferSize=function(v){return v.set(Jt*I,Z*I).floor()},this.setDrawingBufferSize=function(v,P,H){Jt=v,Z=P,I=H,e.width=Math.floor(v*H),e.height=Math.floor(P*H),this.setViewport(0,0,v,P)},this.setEffects=function(v){if(y===Ze){Nt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let P=0;P<v.length;P++)if(v[P].isOutputPass===!0){It("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(et)},this.getViewport=function(v){return v.copy(rt)},this.setViewport=function(v,P,H,B){v.isVector4?rt.set(v.x,v.y,v.z,v.w):rt.set(v,P,H,B),m.viewport(et.copy(rt).multiplyScalar(I).round())},this.getScissor=function(v){return v.copy(yt)},this.setScissor=function(v,P,H,B){v.isVector4?yt.set(v.x,v.y,v.z,v.w):yt.set(v,P,H,B),m.scissor(Tt.copy(yt).multiplyScalar(I).round())},this.getScissorTest=function(){return Yt},this.setScissorTest=function(v){m.setScissorTest(Yt=v)},this.setOpaqueSort=function(v){nt=v},this.setTransparentSort=function(v){J=v},this.getClearColor=function(v){return v.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor(...arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha(...arguments)},this.clear=function(v=!0,P=!0,H=!0){let B=0;if(v){let z=!1;if(it!==null){let mt=it.texture.format;z=g.has(mt)}if(z){let mt=it.texture.type,xt=d.has(mt),pt=Bt.getClearColor(),Mt=Bt.getClearAlpha(),At=pt.r,kt=pt.g,qt=pt.b;xt?(E[0]=At,E[1]=kt,E[2]=qt,E[3]=Mt,w.clearBufferuiv(w.COLOR,0,E)):(L[0]=At,L[1]=kt,L[2]=qt,L[3]=Mt,w.clearBufferiv(w.COLOR,0,L))}else B|=w.COLOR_BUFFER_BIT}P&&(B|=w.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(B|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&w.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),k=v},this.dispose=function(){e.removeEventListener("webglcontextlost",he,!1),e.removeEventListener("webglcontextrestored",ne,!1),e.removeEventListener("webglcontextcreationerror",Qe,!1),Bt.dispose(),dt.dispose(),ct.dispose(),V.dispose(),at.dispose(),Q.dispose(),gt.dispose(),st.dispose(),lt.dispose(),bt.dispose(),bt.removeEventListener("sessionstart",Ql),bt.removeEventListener("sessionend",tc),ri.stop()};function he(v){v.preventDefault(),Ts("WebGLRenderer: Context Lost."),F=!0}function ne(){Ts("WebGLRenderer: Context Restored."),F=!1;let v=O.autoReset,P=Dt.enabled,H=Dt.autoUpdate,B=Dt.needsUpdate,z=Dt.type;Rt(),O.autoReset=v,Dt.enabled=P,Dt.autoUpdate=H,Dt.needsUpdate=B,Dt.type=z}function Qe(v){Nt("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function fn(v){let P=v.target;P.removeEventListener("dispose",fn),mu(P)}function mu(v){gu(v),V.remove(v)}function gu(v){let P=V.get(v).programs;P!==void 0&&(P.forEach(function(H){lt.releaseProgram(H)}),v.isShaderMaterial&&lt.releaseShaderCache(v))}this.renderBufferDirect=function(v,P,H,B,z,mt){P===null&&(P=_e);let xt=z.isMesh&&z.matrixWorld.determinantAffine()<0,pt=vu(v,P,H,B,z);m.setMaterial(B,xt);let Mt=H.index,At=1;if(B.wireframe===!0){if(Mt=$.getWireframeAttribute(H),Mt===void 0)return;At=2}let kt=H.drawRange,qt=H.attributes.position,St=kt.start*At,ie=(kt.start+kt.count)*At;mt!==null&&(St=Math.max(St,mt.start*At),ie=Math.min(ie,(mt.start+mt.count)*At)),Mt!==null?(St=Math.max(St,0),ie=Math.min(ie,Mt.count)):qt!=null&&(St=Math.max(St,0),ie=Math.min(ie,qt.count));let xe=ie-St;if(xe<0||xe===1/0)return;gt.setup(z,B,pt,H,Mt);let de,ce=ht;if(Mt!==null&&(de=ot.get(Mt),ce=j,ce.setIndex(de)),z.isMesh)B.wireframe===!0?(m.setLineWidth(B.wireframeLinewidth*Ut()),ce.setMode(w.LINES)):ce.setMode(w.TRIANGLES);else if(z.isLine){let Ce=B.linewidth;Ce===void 0&&(Ce=1),m.setLineWidth(Ce*Ut()),z.isLineSegments?ce.setMode(w.LINES):z.isLineLoop?ce.setMode(w.LINE_LOOP):ce.setMode(w.LINE_STRIP)}else z.isPoints?ce.setMode(w.POINTS):z.isSprite&&ce.setMode(w.TRIANGLES);if(z.isBatchedMesh)if(Ct.get("WEBGL_multi_draw"))ce.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let Ce=z._multiDrawStarts,_t=z._multiDrawCounts,Ue=z._multiDrawCount,jt=Mt?ot.get(Mt).bytesPerElement:1,$e=V.get(B).currentProgram.getUniforms();for(let pn=0;pn<Ue;pn++)$e.setValue(w,"_gl_DrawID",pn),ce.render(Ce[pn]/jt,_t[pn])}else if(z.isInstancedMesh)ce.renderInstances(St,xe,z.count);else if(H.isInstancedBufferGeometry){let Ce=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,_t=Math.min(H.instanceCount,Ce);ce.renderInstances(St,xe,_t)}else ce.render(St,xe)};function jl(v,P,H,B){k!==null&&v.isNodeMaterial&&k.setObject(B,v),Vt===!0&&wt.setState(v,H,!1),v.transparent===!0&&v.side===vn&&v.forceSinglePass===!1?(v.side=Le,v.needsUpdate=!0,rr(v,P,B),v.side=Qn,v.needsUpdate=!0,rr(v,P,B),v.side=vn):rr(v,P,B)}this.compile=function(v,P,H=null){H===null&&(H=v),k!==null&&k.renderStart(v,P,H),A=ct.get(H),A.init(P),x.push(A),H.traverseVisible(function(z){z.isLight&&z.layers.test(P.layers)&&(A.pushLight(z),z.castShadow&&A.pushShadow(z))}),v!==H&&v.traverseVisible(function(z){z.isLight&&z.layers.test(P.layers)&&(A.pushLight(z),z.castShadow&&A.pushShadow(z))}),A.setupLights(),k!==null&&k.updateLights(A.state.lightsArray),Qt=this.localClippingEnabled,Vt=wt.init(this.clippingPlanes,Qt),Vt===!0&&wt.setGlobalState(this.clippingPlanes,P),k!==null&&Dt.render(A.state.shadowsArray,H,P);let B=new Set;return v.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let mt=z.material;if(mt)if(Array.isArray(mt))for(let xt=0;xt<mt.length;xt++){let pt=mt[xt];jl(pt,H,P,z),B.add(pt)}else jl(mt,H,P,z),B.add(mt)}),A=x.pop(),k!==null&&k.renderEnd(),B},this.compileAsync=function(v,P,H=null){let B=this.compile(v,P,H);return new Promise(z=>{function mt(){if(B.forEach(function(xt){let Mt=V.get(xt).currentProgram;(Mt===void 0||Mt.isReady())&&B.delete(xt)}),B.size===0){z(v);return}setTimeout(mt,10)}Ct.get("KHR_parallel_shader_compile")!==null?mt():setTimeout(mt,10)})};let go=null;function _u(v){go&&go(v)}function Ql(){ri.stop()}function tc(){ri.start()}let ri=new Xh;ri.setAnimationLoop(_u),typeof self!="undefined"&&ri.setContext(self),this.setAnimationLoop=function(v){go=v,bt.setAnimationLoop(v),v===null?ri.stop():ri.start()},bt.addEventListener("sessionstart",Ql),bt.addEventListener("sessionend",tc),this.render=function(v,P){if(P!==void 0&&P.isCamera!==!0){Nt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;k!==null&&k.renderStart(v,P);let H=bt.enabled===!0&&bt.isPresenting===!0,B=T!==null&&(it===null||H)&&T.begin(U,it);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),bt.enabled===!0&&bt.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(bt.cameraAutoUpdate===!0&&bt.updateCamera(P),P=bt.getCamera()),v.isScene===!0&&v.onBeforeRender(U,v,P,it),A=ct.get(v,x.length),A.init(P),A.state.textureUnits=X.getTextureUnits(),x.push(A),Ft.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),Pt.setFromProjectionMatrix(Ft,rn,P.reversedDepth),Qt=this.localClippingEnabled,Vt=wt.init(this.clippingPlanes,Qt),b=dt.get(v,C.length),b.init(),C.push(b),bt.enabled===!0&&bt.isPresenting===!0){let xt=U.xr.getDepthSensingMesh();xt!==null&&_o(xt,P,-1/0,U.sortObjects)}_o(v,P,0,U.sortObjects),b.finish(),k!==null&&k.updateLights(A.state.lightsArray),U.sortObjects===!0&&b.sort(nt,J),Kt=bt.enabled===!1||bt.isPresenting===!1||bt.hasDepthSensing()===!1,Kt&&Bt.addToRenderList(b,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Vt===!0&&wt.beginShadows();let z=A.state.shadowsArray;if(Dt.render(z,v,P),Vt===!0&&wt.endShadows(),(B&&T.hasRenderPass())===!1){let xt=b.opaque,pt=b.transmissive;if(A.setupLights(),P.isArrayCamera){let Mt=P.cameras;if(pt.length>0)for(let At=0,kt=Mt.length;At<kt;At++){let qt=Mt[At];nc(xt,pt,v,qt)}Kt&&Bt.render(v);for(let At=0,kt=Mt.length;At<kt;At++){let qt=Mt[At];ec(b,v,qt,qt.viewport)}}else pt.length>0&&nc(xt,pt,v,P),Kt&&Bt.render(v),ec(b,v,P)}it!==null&&q===0&&(X.updateMultisampleRenderTarget(it),X.updateRenderTargetMipmap(it)),B&&T.end(U),v.isScene===!0&&v.onAfterRender(U,v,P),gt.resetDefaultState(),Y=-1,tt=null,x.pop(),x.length>0?(A=x[x.length-1],X.setTextureUnits(A.state.textureUnits),Vt===!0&&wt.setGlobalState(U.clippingPlanes,A.state.camera)):A=null,C.pop(),C.length>0?b=C[C.length-1]:b=null,k!==null&&k.renderEnd()};function _o(v,P,H,B){if(v.visible===!1)return;if(v.layers.test(P.layers)){if(v.isGroup)H=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(P);else if(v.isLightProbeGrid)A.pushLightProbeGrid(v);else if(v.isLight)A.pushLight(v),v.castShadow&&A.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(Pt)){B&&Wt.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Ft);let xt=Q.update(v),pt=v.material;pt.visible&&b.push(v,xt,pt,H,Wt.z,null,P)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||v.intersectsFrustum(Pt))){let xt=Q.update(v),pt=v.material;if(B&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Wt.copy(v.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),Wt.copy(xt.boundingSphere.center)),Wt.applyMatrix4(v.matrixWorld).applyMatrix4(Ft)),Array.isArray(pt)){let Mt=xt.groups;for(let At=0,kt=Mt.length;At<kt;At++){let qt=Mt[At],St=pt[qt.materialIndex];St&&St.visible&&b.push(v,xt,St,H,Wt.z,qt,P)}}else pt.visible&&b.push(v,xt,pt,H,Wt.z,null,P)}}let mt=v.children;for(let xt=0,pt=mt.length;xt<pt;xt++)_o(mt[xt],P,H,B)}function ec(v,P,H,B){let{opaque:z,transmissive:mt,transparent:xt}=v;A.setupLightsView(H),Vt===!0&&wt.setGlobalState(U.clippingPlanes,H),B&&m.viewport(et.copy(B)),z.length>0&&sr(z,P,H),mt.length>0&&sr(mt,P,H),xt.length>0&&sr(xt,P,H),m.buffers.depth.setTest(!0),m.buffers.depth.setMask(!0),m.buffers.color.setMask(!0),m.setPolygonOffset(!1)}function nc(v,P,H,B){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[B.id]===void 0){let St=Ct.has("EXT_color_buffer_half_float")||Ct.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[B.id]=new Ve(1,1,{generateMipmaps:!0,type:St?hn:Ze,minFilter:ei,samples:Math.max(4,S.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:$t.workingColorSpace})}let mt=A.state.transmissionRenderTarget[B.id],xt=B.viewport||et;mt.setSize(xt.z*U.transmissionResolutionScale,xt.w*U.transmissionResolutionScale);let pt=U.getRenderTarget(),Mt=U.getActiveCubeFace(),At=U.getActiveMipmapLevel();U.setRenderTarget(mt),U.getClearColor(ee),Ht=U.getClearAlpha(),Ht<1&&U.setClearColor(16777215,.5),U.clear(),Kt&&Bt.render(H);let kt=U.toneMapping;U.toneMapping=on;let qt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),A.setupLightsView(B),Vt===!0&&wt.setGlobalState(U.clippingPlanes,B),sr(v,H,B),X.updateMultisampleRenderTarget(mt),X.updateRenderTargetMipmap(mt),Ct.has("WEBGL_multisampled_render_to_texture")===!1){let St=!1;for(let ie=0,xe=P.length;ie<xe;ie++){let de=P[ie],{object:ce,geometry:Ce,material:_t,group:Ue}=de;if(_t.side===vn&&ce.layers.test(B.layers)){let jt=_t.side;_t.side=Le,_t.needsUpdate=!0,ic(ce,H,B,Ce,_t,Ue),_t.side=jt,_t.needsUpdate=!0,St=!0}}St===!0&&(X.updateMultisampleRenderTarget(mt),X.updateRenderTargetMipmap(mt))}U.setRenderTarget(pt,Mt,At),U.setClearColor(ee,Ht),qt!==void 0&&(B.viewport=qt),U.toneMapping=kt}function sr(v,P,H){let B=P.isScene===!0?P.overrideMaterial:null;for(let z=0,mt=v.length;z<mt;z++){let xt=v[z],{object:pt,geometry:Mt,group:At}=xt,kt=xt.material;kt.allowOverride===!0&&B!==null&&(kt=B),pt.layers.test(H.layers)&&ic(pt,P,H,Mt,kt,At)}}function ic(v,P,H,B,z,mt){k!==null&&z.isNodeMaterial&&k.setObject(v,z),v.onBeforeRender(U,P,H,B,z,mt),v.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),z.onBeforeRender(U,P,H,B,v,mt),z.transparent===!0&&z.side===vn&&z.forceSinglePass===!1?(z.side=Le,z.needsUpdate=!0,U.renderBufferDirect(H,P,B,z,v,mt),z.side=Qn,z.needsUpdate=!0,U.renderBufferDirect(H,P,B,z,v,mt),z.side=vn):U.renderBufferDirect(H,P,B,z,v,mt),v.onAfterRender(U,P,H,B,z,mt)}function rr(v,P,H){P.isScene!==!0&&(P=_e);let B=V.get(v),z=A.state.lights,mt=A.state.shadowsArray,xt=z.state.version,pt=lt.getParameters(v,z.state,mt,P,H,A.state.lightProbeGridArray),Mt=lt.getProgramCacheKey(pt),At=B.programs;B.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,B.fog=P.fog;let kt=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;B.envMap=at.get(v.envMap||B.environment,kt),B.envMapRotation=B.environment!==null&&v.envMap===null?P.environmentRotation:v.envMapRotation,At===void 0&&(v.addEventListener("dispose",fn),At=new Map,B.programs=At);let qt=At.get(Mt);if(qt!==void 0){if(B.currentProgram===qt&&B.lightsStateVersion===xt)return rc(v,pt),qt}else pt.uniforms=lt.getUniforms(v),k!==null&&v.isNodeMaterial&&k.build(v,H,pt),v.onBeforeCompile(pt,U),qt=lt.acquireProgram(pt,Mt),At.set(Mt,qt),B.uniforms=pt.uniforms;let St=B.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(St.clippingPlanes=wt.uniform),rc(v,pt),B.needsLights=Mu(v),B.lightsStateVersion=xt,B.needsLights&&(St.ambientLightColor.value=z.state.ambient,St.lightProbe.value=z.state.probe,St.sunLights.value=z.state.sun,St.sunLightShadows.value=z.state.sunShadow,St.directionalLights.value=z.state.directional,St.directionalLightShadows.value=z.state.directionalShadow,St.spotLights.value=z.state.spot,St.spotLightShadows.value=z.state.spotShadow,St.rectAreaLights.value=z.state.rectArea,St.ltc_1.value=z.state.rectAreaLTC1,St.ltc_2.value=z.state.rectAreaLTC2,St.pointLights.value=z.state.point,St.pointLightShadows.value=z.state.pointShadow,St.hemisphereLights.value=z.state.hemi,St.sunShadowMatrix.value=z.state.sunShadowMatrix,St.sunShadowCascade.value=z.state.sunShadowCascade,St.directionalShadowMatrix.value=z.state.directionalShadowMatrix,St.spotLightMatrix.value=z.state.spotLightMatrix,St.spotLightMap.value=z.state.spotLightMap,St.pointShadowMatrix.value=z.state.pointShadowMatrix),B.lightProbeGrid=A.state.lightProbeGridArray.length>0,B.currentProgram=qt,B.uniformsList=null,qt}function sc(v){if(v.uniformsList===null){let P=v.currentProgram.getUniforms();v.uniformsList=is.seqWithValue(P.seq,v.uniforms)}return v.uniformsList}function rc(v,P){let H=V.get(v);H.outputColorSpace=P.outputColorSpace,H.batching=P.batching,H.batchingColor=P.batchingColor,H.instancing=P.instancing,H.instancingColor=P.instancingColor,H.instancingMorph=P.instancingMorph,H.skinning=P.skinning,H.morphTargets=P.morphTargets,H.morphNormals=P.morphNormals,H.morphColors=P.morphColors,H.morphTargetsCount=P.morphTargetsCount,H.numClippingPlanes=P.numClippingPlanes,H.numIntersection=P.numClipIntersection,H.vertexAlphas=P.vertexAlphas,H.vertexTangents=P.vertexTangents,H.toneMapping=P.toneMapping}function xu(v,P){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;M.setFromMatrixPosition(P.matrixWorld);for(let H=0,B=v.length;H<B;H++){let z=v[H];if(z.texture!==null&&z.boundingBox.containsPoint(M))return z}return null}function vu(v,P,H,B,z){P.isScene!==!0&&(P=_e),X.resetTextureUnits();let mt=P.fog,xt=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?P.environment:null,pt=it===null?U.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:$t.workingColorSpace,Mt=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,At=at.get(B.envMap||xt,Mt),kt=B.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,qt=!!H.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),St=!!H.morphAttributes.position,ie=!!H.morphAttributes.normal,xe=!!H.morphAttributes.color,de=on;B.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(de=U.toneMapping);let ce=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ce=ce!==void 0?ce.length:0,_t=V.get(B),Ue=A.state.lights;if(Vt===!0&&(Qt===!0||v!==tt)){let ue=v===tt&&B.id===Y;wt.setState(B,v,ue)}let jt=!1;B.version===_t.__version?(_t.needsLights&&_t.lightsStateVersion!==Ue.state.version||_t.outputColorSpace!==pt||z.isBatchedMesh&&_t.batching===!1||!z.isBatchedMesh&&_t.batching===!0||z.isBatchedMesh&&_t.batchingColor===!0&&z._colorsTexture===null||z.isBatchedMesh&&_t.batchingColor===!1&&z._colorsTexture!==null||z.isInstancedMesh&&_t.instancing===!1||!z.isInstancedMesh&&_t.instancing===!0||z.isSkinnedMesh&&_t.skinning===!1||!z.isSkinnedMesh&&_t.skinning===!0||z.isInstancedMesh&&_t.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&_t.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&_t.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&_t.instancingMorph===!1&&z.morphTexture!==null||_t.envMap!==At||B.fog===!0&&_t.fog!==mt||_t.numClippingPlanes!==void 0&&(_t.numClippingPlanes!==wt.numPlanes||_t.numIntersection!==wt.numIntersection)||_t.vertexAlphas!==kt||_t.vertexTangents!==qt||_t.morphTargets!==St||_t.morphNormals!==ie||_t.morphColors!==xe||_t.toneMapping!==de||_t.morphTargetsCount!==Ce||!!_t.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(jt=!0):(jt=!0,_t.__version=B.version);let $e=_t.currentProgram;jt===!0&&($e=rr(B,P,z),k&&B.isNodeMaterial&&k.onUpdateProgram(B,$e,_t));let pn=!1,Un=!1,yi=!1,le=$e.getUniforms(),ge=_t.uniforms;if(m.useProgram($e.program)&&(pn=!0,Un=!0,yi=!0),B.id!==Y&&(Y=B.id,Un=!0),_t.needsLights){let ue=xu(A.state.lightProbeGridArray,z);_t.lightProbeGrid!==ue&&(_t.lightProbeGrid=ue,Un=!0)}if(pn||tt!==v){m.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),le.setValue(w,"projectionMatrix",v.projectionMatrix),le.setValue(w,"viewMatrix",v.matrixWorldInverse);let On=le.map.cameraPosition;On!==void 0&&On.setValue(w,Zt.setFromMatrixPosition(v.matrixWorld)),S.logarithmicDepthBuffer&&le.setValue(w,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&le.setValue(w,"isOrthographic",v.isOrthographicCamera===!0),tt!==v&&(tt=v,Un=!0,yi=!0)}if(_t.needsLights&&(Ue.state.sunShadowMap.length>0&&le.setValue(w,"sunShadowMap",Ue.state.sunShadowMap,X),Ue.state.directionalShadowMap.length>0&&le.setValue(w,"directionalShadowMap",Ue.state.directionalShadowMap,X),Ue.state.spotShadowMap.length>0&&le.setValue(w,"spotShadowMap",Ue.state.spotShadowMap,X),Ue.state.pointShadowMap.length>0&&le.setValue(w,"pointShadowMap",Ue.state.pointShadowMap,X)),z.isSkinnedMesh){le.setOptional(w,z,"bindMatrix"),le.setOptional(w,z,"bindMatrixInverse");let ue=z.skeleton;ue&&(ue.boneTexture===null&&ue.computeBoneTexture(),le.setValue(w,"boneTexture",ue.boneTexture,X))}z.isBatchedMesh&&(le.setOptional(w,z,"batchingTexture"),le.setValue(w,"batchingTexture",z._matricesTexture,X),le.setOptional(w,z,"batchingIdTexture"),le.setValue(w,"batchingIdTexture",z._indirectTexture,X),le.setOptional(w,z,"batchingColorTexture"),z._colorsTexture!==null&&le.setValue(w,"batchingColorTexture",z._colorsTexture,X));let Nn=H.morphAttributes;if((Nn.position!==void 0||Nn.normal!==void 0||Nn.color!==void 0)&&D.update(z,H,$e),(Un||_t.receiveShadow!==z.receiveShadow)&&(_t.receiveShadow=z.receiveShadow,le.setValue(w,"receiveShadow",z.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&P.environment!==null&&(ge.envMapIntensity.value=P.environmentIntensity),ge.dfgLUT!==void 0&&(ge.dfgLUT.value=l1()),Un){if(le.setValue(w,"toneMappingExposure",U.toneMappingExposure),_t.needsLights&&yu(ge,yi),mt&&B.fog===!0&&Et.refreshFogUniforms(ge,mt),Et.refreshMaterialUniforms(ge,B,I,Z,A.state.transmissionRenderTarget[v.id]),_t.needsLights&&_t.lightProbeGrid){let ue=_t.lightProbeGrid;ge.probesSH.value=ue.texture,ge.probesMin.value.copy(ue.boundingBox.min),ge.probesMax.value.copy(ue.boundingBox.max),ge.probesResolution.value.copy(ue.resolution)}is.upload(w,sc(_t),ge,X)}if(B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(is.upload(w,sc(_t),ge,X),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&le.setValue(w,"center",z.center),le.setValue(w,"modelViewMatrix",z.modelViewMatrix),le.setValue(w,"normalMatrix",z.normalMatrix),le.setValue(w,"modelMatrix",z.matrixWorld),B.uniformsGroups!==void 0){let ue=B.uniformsGroups;for(let On=0,Mi=ue.length;On<Mi;On++){let oc=ue[On];st.update(oc,$e),st.bind(oc,$e)}}return $e}function yu(v,P){v.ambientLightColor.needsUpdate=P,v.lightProbe.needsUpdate=P,v.sunLights.needsUpdate=P,v.sunLightShadows.needsUpdate=P,v.directionalLights.needsUpdate=P,v.directionalLightShadows.needsUpdate=P,v.pointLights.needsUpdate=P,v.pointLightShadows.needsUpdate=P,v.spotLights.needsUpdate=P,v.spotLightShadows.needsUpdate=P,v.rectAreaLights.needsUpdate=P,v.hemisphereLights.needsUpdate=P}function Mu(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return it},this.setRenderTargetTextures=function(v,P,H){let B=V.get(v);B.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),V.get(v.texture).__webglTexture=P,V.get(v.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:H,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,P){let H=V.get(v);H.__webglFramebuffer=P,H.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(v,P=0,H=0){it=v,K=P,q=H;let B=null,z=!1,mt=!1;if(v){let pt=V.get(v);if(pt.__useDefaultFramebuffer!==void 0){m.bindFramebuffer(w.FRAMEBUFFER,pt.__webglFramebuffer),et.copy(v.viewport),Tt.copy(v.scissor),vt=v.scissorTest,m.viewport(et),m.scissor(Tt),m.setScissorTest(vt),Y=-1;return}else if(pt.__webglFramebuffer===void 0)X.setupRenderTarget(v);else if(pt.__hasExternalTextures)X.rebindTextures(v,V.get(v.texture).__webglTexture,V.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let kt=v.depthTexture;if(pt.__boundDepthTexture!==kt){if(kt!==null&&V.has(kt)&&(v.width!==kt.image.width||v.height!==kt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");X.setupDepthRenderbuffer(v)}}let Mt=v.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(mt=!0);let At=V.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(At[P])?B=At[P][H]:B=At[P],z=!0):v.samples>0&&X.useMultisampledRTT(v)===!1?B=V.get(v).__webglMultisampledFramebuffer:Array.isArray(At)?B=At[H]:B=At,et.copy(v.viewport),Tt.copy(v.scissor),vt=v.scissorTest}else et.copy(rt).multiplyScalar(I).floor(),Tt.copy(yt).multiplyScalar(I).floor(),vt=Yt;if(H!==0&&(B=W),m.bindFramebuffer(w.FRAMEBUFFER,B)&&m.drawBuffers(v,B),m.viewport(et),m.scissor(Tt),m.setScissorTest(vt),z){let pt=V.get(v.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+P,pt.__webglTexture,H)}else if(mt){let pt=P;for(let Mt=0;Mt<v.textures.length;Mt++){let At=V.get(v.textures[Mt]);w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0+Mt,At.__webglTexture,H,pt)}}else if(v!==null&&H!==0){let pt=V.get(v.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,pt.__webglTexture,H)}Y=-1};function ac(v){let P=V.get(v);return(P.__readFormat!==v.format||P.__readType!==v.type)&&(P.__readFormat=v.format,P.__readType=v.type,P.__formatReadable=S.textureFormatReadable(v.format),P.__typeReadable=S.textureTypeReadable(v.type)),P}this.readRenderTargetPixels=function(v,P,H,B,z,mt,xt,pt=0){if(!(v&&v.isWebGLRenderTarget)){Nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=V.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&xt!==void 0&&(Mt=Mt[xt]),Mt){m.bindFramebuffer(w.FRAMEBUFFER,Mt);try{let At=v.textures[pt],kt=At.format,qt=At.type;v.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+pt);let St=ac(At);if(St.__formatReadable===!1){Nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(St.__typeReadable===!1){Nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=v.width-B&&H>=0&&H<=v.height-z&&w.readPixels(P,H,B,z,ut.convert(kt),ut.convert(qt),mt)}finally{let At=it!==null?V.get(it).__webglFramebuffer:null;m.bindFramebuffer(w.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(v,P,H,B,z,mt,xt,pt=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=V.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&xt!==void 0&&(Mt=Mt[xt]),Mt)if(P>=0&&P<=v.width-B&&H>=0&&H<=v.height-z){m.bindFramebuffer(w.FRAMEBUFFER,Mt);let At=v.textures[pt],kt=At.format,qt=At.type;v.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+pt);let St=ac(At);if(St.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(St.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ie=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,ie),w.bufferData(w.PIXEL_PACK_BUFFER,mt.byteLength,w.STREAM_READ),w.readPixels(P,H,B,z,ut.convert(kt),ut.convert(qt),0),w.bindBuffer(w.PIXEL_PACK_BUFFER,null);let xe=it!==null?V.get(it).__webglFramebuffer:null;m.bindFramebuffer(w.FRAMEBUFFER,xe);let de=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await _h(w,de,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,ie),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,mt),w.bindBuffer(w.PIXEL_PACK_BUFFER,null),w.deleteBuffer(ie),w.deleteSync(de),mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,P=null,H=0){let B=Math.pow(2,-H),z=Math.floor(v.image.width*B),mt=Math.floor(v.image.height*B),xt=P!==null?P.x:0,pt=P!==null?P.y:0;X.setTexture2D(v,0),w.copyTexSubImage2D(w.TEXTURE_2D,H,0,0,xt,pt,z,mt),m.unbindTexture()},this.copyTextureToTexture=function(v,P,H=null,B=null,z=0,mt=0){let xt,pt,Mt,At,kt,qt,St,ie,xe,de=v.isCompressedTexture?v.mipmaps[mt]:v.image;if(H!==null)xt=H.max.x-H.min.x,pt=H.max.y-H.min.y,Mt=H.isBox3?H.max.z-H.min.z:1,At=H.min.x,kt=H.min.y,qt=H.isBox3?H.min.z:0;else{let ge=Math.pow(2,-z);xt=Math.floor(de.width*ge),pt=Math.floor(de.height*ge),v.isDataArrayTexture?Mt=de.depth:v.isData3DTexture?Mt=Math.floor(de.depth*ge):Mt=1,At=0,kt=0,qt=0}B!==null?(St=B.x,ie=B.y,xe=B.z):(St=0,ie=0,xe=0);let ce=ut.convert(P.format),Ce=ut.convert(P.type),_t;P.isData3DTexture?(X.setTexture3D(P,0),_t=w.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(X.setTexture2DArray(P,0),_t=w.TEXTURE_2D_ARRAY):(X.setTexture2D(P,0),_t=w.TEXTURE_2D),m.activeTexture(w.TEXTURE0),m.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,P.flipY),m.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),m.pixelStorei(w.UNPACK_ALIGNMENT,P.unpackAlignment);let Ue=m.getParameter(w.UNPACK_ROW_LENGTH),jt=m.getParameter(w.UNPACK_IMAGE_HEIGHT),$e=m.getParameter(w.UNPACK_SKIP_PIXELS),pn=m.getParameter(w.UNPACK_SKIP_ROWS),Un=m.getParameter(w.UNPACK_SKIP_IMAGES);m.pixelStorei(w.UNPACK_ROW_LENGTH,de.width),m.pixelStorei(w.UNPACK_IMAGE_HEIGHT,de.height),m.pixelStorei(w.UNPACK_SKIP_PIXELS,At),m.pixelStorei(w.UNPACK_SKIP_ROWS,kt),m.pixelStorei(w.UNPACK_SKIP_IMAGES,qt);let yi=v.isDataArrayTexture||v.isData3DTexture,le=P.isDataArrayTexture||P.isData3DTexture;if(v.isDepthTexture){let ge=V.get(v),Nn=V.get(P),ue=V.get(ge.__renderTarget),On=V.get(Nn.__renderTarget);m.bindFramebuffer(w.READ_FRAMEBUFFER,ue.__webglFramebuffer),m.bindFramebuffer(w.DRAW_FRAMEBUFFER,On.__webglFramebuffer);for(let Mi=0;Mi<Mt;Mi++)yi&&(w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,V.get(v).__webglTexture,z,qt+Mi),w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,V.get(P).__webglTexture,mt,xe+Mi)),w.blitFramebuffer(At,kt,xt,pt,St,ie,xt,pt,w.DEPTH_BUFFER_BIT,w.NEAREST);m.bindFramebuffer(w.READ_FRAMEBUFFER,null),m.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else if(z!==0||v.isRenderTargetTexture||V.has(v)){let ge=V.get(v),Nn=V.get(P);m.bindFramebuffer(w.READ_FRAMEBUFFER,N),m.bindFramebuffer(w.DRAW_FRAMEBUFFER,G);for(let ue=0;ue<Mt;ue++)yi?w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,ge.__webglTexture,z,qt+ue):w.framebufferTexture2D(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,ge.__webglTexture,z),le?w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Nn.__webglTexture,mt,xe+ue):w.framebufferTexture2D(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Nn.__webglTexture,mt),z!==0?w.blitFramebuffer(At,kt,xt,pt,St,ie,xt,pt,w.COLOR_BUFFER_BIT,w.NEAREST):le?w.copyTexSubImage3D(_t,mt,St,ie,xe+ue,At,kt,xt,pt):w.copyTexSubImage2D(_t,mt,St,ie,At,kt,xt,pt);m.bindFramebuffer(w.READ_FRAMEBUFFER,null),m.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else le?v.isDataTexture||v.isData3DTexture?w.texSubImage3D(_t,mt,St,ie,xe,xt,pt,Mt,ce,Ce,de.data):P.isCompressedArrayTexture?w.compressedTexSubImage3D(_t,mt,St,ie,xe,xt,pt,Mt,ce,de.data):w.texSubImage3D(_t,mt,St,ie,xe,xt,pt,Mt,ce,Ce,de):v.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,mt,St,ie,xt,pt,ce,Ce,de.data):v.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,mt,St,ie,de.width,de.height,ce,de.data):w.texSubImage2D(w.TEXTURE_2D,mt,St,ie,xt,pt,ce,Ce,de);m.pixelStorei(w.UNPACK_ROW_LENGTH,Ue),m.pixelStorei(w.UNPACK_IMAGE_HEIGHT,jt),m.pixelStorei(w.UNPACK_SKIP_PIXELS,$e),m.pixelStorei(w.UNPACK_SKIP_ROWS,pn),m.pixelStorei(w.UNPACK_SKIP_IMAGES,Un),mt===0&&P.generateMipmaps&&w.generateMipmap(_t),m.unbindTexture()},this.initRenderTarget=function(v){V.get(v).__webglFramebuffer===void 0&&X.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?X.setTextureCube(v,0):v.isData3DTexture?X.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?X.setTexture2DArray(v,0):X.setTexture2D(v,0),m.unbindTexture()},this.resetState=function(){K=0,q=0,it=null,m.reset(),gt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}};var jh={type:"change"},Hl={type:"start"},tu={type:"end"},co=new Xn,Qh=new We,c1=Math.cos(70*je.DEG2RAD),Ae=new R,ke=2*Math.PI,oe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Gl=1e-6,ho=class extends ks{constructor(t,e=null){super(t,e),this.state=oe.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Kn.ROTATE,MIDDLE:Kn.DOLLY,RIGHT:Kn.PAN},this.touches={ONE:jn.ROTATE,TWO:jn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new qe,this._lastTargetPosition=new R,this._quat=new qe().setFromUnitVectors(t.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ji,this._sphericalDelta=new Ji,this._scale=1,this._panOffset=new R,this._rotateStart=new Lt,this._rotateEnd=new Lt,this._rotateDelta=new Lt,this._panStart=new Lt,this._panEnd=new Lt,this._panDelta=new Lt,this._dollyStart=new Lt,this._dollyEnd=new Lt,this._dollyDelta=new Lt,this._dollyDirection=new R,this._mouse=new Lt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=u1.bind(this),this._onPointerDown=h1.bind(this),this._onPointerUp=d1.bind(this),this._onContextMenu=v1.bind(this),this._onMouseWheel=m1.bind(this),this._onKeyDown=g1.bind(this),this._onTouchStart=_1.bind(this),this._onTouchMove=x1.bind(this),this._onMouseDown=f1.bind(this),this._onMouseMove=p1.bind(this),this._interceptControlDown=y1.bind(this),this._interceptControlUp=M1.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=oe.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(jh),this.update(),this.state=oe.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Ae.copy(e).sub(this.target),Ae.applyQuaternion(this._quat),this._spherical.setFromVector3(Ae),this.autoRotate&&this.state===oe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=ke:n>Math.PI&&(n-=ke),s<-Math.PI?s+=ke:s>Math.PI&&(s-=ke),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ae.setFromSpherical(this._spherical),Ae.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ae),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Ae.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new R(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new R(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Ae.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(co.origin.copy(this.object.position),co.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(co.direction))<c1?this.object.lookAt(this.target):(Qh.setFromNormalAndCoplanarPoint(this.object.up,this.target),co.intersectPlane(Qh,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Gl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Gl||this._lastTargetPosition.distanceToSquared(this.target)>Gl?(this.dispatchEvent(jh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ke/60*this.autoRotateSpeed*t:ke/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ae.setFromMatrixColumn(e,0),Ae.multiplyScalar(-t),this._panOffset.add(Ae)}_panUp(t,e){this.screenSpacePanning===!0?Ae.setFromMatrixColumn(e,1):(Ae.setFromMatrixColumn(e,0),Ae.crossVectors(this.object.up,Ae)),Ae.multiplyScalar(t),this._panOffset.add(Ae)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ae.copy(s).sub(this.target);let r=Ae.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Lt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function h1(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function u1(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function d1(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(tu),this.state=oe.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function f1(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Kn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=oe.DOLLY;break;case Kn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=oe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=oe.ROTATE}break;case Kn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=oe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=oe.PAN}break;default:this.state=oe.NONE}this.state!==oe.NONE&&this.dispatchEvent(Hl)}function p1(i){switch(this.state){case oe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case oe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case oe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function m1(i){this.enabled===!1||this.enableZoom===!1||this.state!==oe.NONE||(i.preventDefault(),this.dispatchEvent(Hl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(tu))}function g1(i){this.enabled!==!1&&this._handleKeyDown(i)}function _1(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case jn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=oe.TOUCH_ROTATE;break;case jn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=oe.TOUCH_PAN;break;default:this.state=oe.NONE}break;case 2:switch(this.touches.TWO){case jn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=oe.TOUCH_DOLLY_PAN;break;case jn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=oe.TOUCH_DOLLY_ROTATE;break;default:this.state=oe.NONE}break;default:this.state=oe.NONE}this.state!==oe.NONE&&this.dispatchEvent(Hl)}function x1(i){switch(this._trackPointer(i),this.state){case oe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case oe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case oe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case oe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=oe.NONE}}function v1(i){this.enabled!==!1&&i.preventDefault()}function y1(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function M1(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var eu=Math.PI*2,tr=Math.PI/180;function nu(i){let t=document.createElement("canvas");t.width=t.height=256;let e=t.getContext("2d"),n=e.createRadialGradient(128,128,0,128,128,128);for(let[r,a]of i)n.addColorStop(r,a);e.fillStyle=n,e.fillRect(0,0,256,256);let s=new fi(t);return s.colorSpace=Oe,s}var xi=[101.287,-16.716,-1.46,0,95.988,-52.696,-.72,.15,213.915,19.183,-.04,1.23,219.9,-60.835,-.01,.71,279.235,38.784,.03,0,79.172,45.998,.08,.8,78.635,-8.202,.12,-.03,114.825,5.225,.38,.42,24.429,-57.237,.46,-.16,88.793,7.407,.5,1.85,210.956,-60.373,.61,-.23,297.696,8.868,.77,.22,68.98,16.509,.85,1.54,247.352,-26.432,.96,1.83,201.298,-11.161,.98,-.23,116.329,28.026,1.14,1,344.413,-29.622,1.16,.09,191.93,-59.689,1.25,-.23,310.358,45.28,1.25,.09,186.65,-63.099,1.33,-.24,219.9,-60.836,1.33,.88,152.093,11.967,1.35,-.11,104.656,-28.972,1.5,-.21,187.791,-57.113,1.63,1.59,263.402,-37.104,1.63,-.22,81.283,6.35,1.64,-.22,81.573,28.608,1.65,-.13,138.3,-69.717,1.68,0,84.053,-1.202,1.7,-.19,186.652,-63.099,1.73,-.26,332.058,-46.961,1.74,-.13,193.507,55.96,1.77,-.02,122.383,-47.337,1.78,-.22,51.081,49.861,1.79,.48,165.932,61.751,1.79,1.07,107.098,-26.393,1.84,.68,276.043,-34.385,1.85,-.03,125.628,-59.51,1.86,1.28,206.885,49.313,1.86,-.19,264.33,-42.998,1.87,.4,89.882,44.947,1.9,.03,252.166,-69.028,1.92,1.44,99.428,16.399,1.93,0,306.412,-56.735,1.94,-.2,131.176,-54.708,1.96,.04,95.675,-17.956,1.98,-.23,113.65,31.888,1.98,.03,141.897,-8.659,1.98,1.44,31.793,23.462,2,1.15,239.876,25.92,2,.1,37.953,89.264,2.02,.6,283.816,-26.297,2.02,-.22,10.898,-17.987,2.04,1.02,85.19,-1.943,2.05,-.21,2.097,29.091,2.06,-.11,17.433,35.621,2.06,1.58,86.939,-9.67,2.06,-.17,211.671,-36.37,2.06,1.01,222.676,74.156,2.08,1.47,263.734,12.56,2.08,.15,340.667,-46.885,2.1,1.6,47.042,40.956,2.12,-.05,177.265,14.572,2.14,.09,190.379,-48.96,2.17,-.01,305.557,40.257,2.2,.68,136.999,-43.432,2.21,1.66,10.127,56.537,2.23,1.17,83.002,-.299,2.23,-.22,233.672,26.715,2.23,-.02,269.152,51.489,2.23,1.52,120.896,-40.003,2.25,-.26,139.273,-59.275,2.25,.18,30.975,42.33,2.26,1.37,2.295,59.15,2.27,.34,200.981,54.925,2.27,.02,252.541,-34.293,2.29,1.15,204.972,-53.466,2.3,-.22,220.482,-47.388,2.3,-.2,218.877,-42.158,2.31,-.19,240.083,-22.622,2.32,-.12,165.46,56.383,2.37,-.02,6.571,-42.306,2.39,1.09,326.047,9.875,2.39,1.53,265.622,-39.03,2.41,-.22,345.944,28.083,2.42,1.67,257.595,-15.725,2.43,.06,178.457,53.695,2.44,0,319.645,62.586,2.44,.22,111.024,-29.303,2.45,-.08,311.553,33.97,2.46,1.03,14.177,60.717,2.47,-.15,346.19,15.205,2.49,-.04,140.528,-55.011,2.5,-.18,45.57,4.09,2.53,1.64,208.885,-47.288,2.55,-.22,168.527,20.524,2.56,.12,249.29,-10.567,2.56,.02,83.182,-17.822,2.58,.21,183.952,-17.542,2.59,-.11,182.09,-50.723,2.6,-.12,285.653,-29.88,2.6,.08,154.993,19.842,2.61,1.15,229.252,-9.383,2.61,-.11,89.93,37.213,2.62,-.08,241.359,-19.806,2.62,-.07,28.66,20.808,2.64,.13,84.912,-34.074,2.64,-.12,188.597,-23.397,2.65,.89,236.067,6.426,2.65,1.17,21.454,60.235,2.68,.13,208.671,18.398,2.68,.58,224.633,-43.134,2.68,-.22,74.248,33.166,2.69,1.53,161.692,-49.42,2.69,.9,189.296,-69.136,2.69,-.2,262.691,-37.296,2.69,-.22,109.286,-37.098,2.7,1.62,221.247,27.074,2.7,.97,275.249,-29.828,2.7,1.38,296.565,10.613,2.72,1.52,243.586,-3.694,2.74,1.58,245.998,61.514,2.74,.91,200.149,-36.712,2.75,.04,222.72,-16.042,2.75,.15,160.739,-64.394,2.76,-.22,83.858,-5.91,2.77,-.24,247.555,21.49,2.77,.94,265.868,4.567,2.77,1.16,233.785,-41.167,2.78,-.2,76.963,-5.086,2.79,.13,262.608,52.301,2.79,.98,6.438,-77.254,2.8,.62,183.786,-58.749,2.8,-.23,121.886,-24.304,2.81,.43,250.322,31.603,2.81,.65,276.993,-25.422,2.81,1.04,248.971,-28.216,2.82,-.25,3.309,15.184,2.83,-.23,195.544,10.959,2.83,.94,82.061,-20.759,2.84,.82,58.533,31.884,2.85,.12,238.785,-63.431,2.85,.29,261.325,-55.53,2.85,1.46,29.692,-61.57,2.86,.28,334.625,-60.26,2.86,1.39,56.871,24.105,2.87,-.09,296.244,45.131,2.87,-.03,326.76,-16.127,2.87,.29,95.74,22.514,2.88,1.64,113.65,31.889,2.88,.04,59.463,40.01,2.89,-.18,229.728,-68.679,2.89,0,239.713,-26.114,2.89,-.19,245.297,-25.593,2.89,.13,287.441,-21.024,2.89,.35,111.788,8.289,2.9,-.09,194.007,38.318,2.9,-.12,322.89,-5.571,2.91,.83,46.199,53.506,2.93,.7,102.484,-50.615,2.93,1.2,340.75,30.221,2.94,.86,59.508,-13.509,2.95,1.59,187.466,-16.516,2.95,-.05,262.96,-49.876,2.95,-.17,331.446,-.32,2.96,.98,100.983,25.131,2.98,1.4,146.463,23.774,2.98,.8,75.492,43.823,2.99,.54,271.452,-30.424,2.99,1,286.352,13.863,2.99,.01,32.386,34.987,3,.14,84.411,21.142,3,-.19,182.531,-22.62,3,1.33,199.73,-23.172,3,.92,55.731,47.788,3.01,-.13,146.775,-65.072,3.01,.28,167.416,44.499,3.01,1.14,328.482,-37.365,3.01,-.12,95.078,-30.063,3.02,-.19,105.756,-23.833,3.02,-.08,218.02,38.308,3.03,.19,266.896,-40.127,3.03,.51,34.836,-2.978,3.04,1.42,207.404,-42.474,3.04,-.17,155.582,41.499,3.05,1.59,191.57,-68.108,3.05,-.18,230.182,71.834,3.05,.05,288.139,67.662,3.07,1,252.968,-38.047,3.08,-.2,292.68,27.96,3.08,1.13,305.253,-14.781,3.08,.79,133.848,5.946,3.11,1,162.406,-16.194,3.11,1.25,274.407,-36.762,3.11,1.56,309.392,-47.291,3.11,1,87.74,-35.768,3.12,1.16,140.264,34.392,3.13,1.55,142.805,-57.034,3.13,1.55,173.945,-63.02,3.13,-.04,224.79,-42.104,3.13,-.2,254.655,-55.99,3.13,1.6,134.802,48.042,3.14,.19,258.758,24.839,3.14,.08,258.762,36.809,3.16,1.44,76.629,41.234,3.17,-.18,99.44,-43.196,3.17,-.11,143.214,51.677,3.17,.46,257.197,65.715,3.17,-.12,281.414,-26.991,3.17,-.11,72.46,6.961,3.19,.45,76.365,-22.371,3.19,1.46,220.627,-64.975,3.19,.24,254.417,9.375,3.2,1.15,318.234,30.227,3.2,.99,267.465,-37.043,3.21,1.17,354.837,77.632,3.21,1.03,230.343,-40.648,3.22,-.22,302.826,-.821,3.23,-.07,322.165,70.561,3.23,-.22,44.565,-40.305,3.24,.14,56.81,-74.239,3.24,1.62,244.58,-4.692,3.24,.96,284.736,32.689,3.24,-.05,112.308,-43.301,3.25,1.51,275.328,-2.899,3.26,.94,9.832,30.861,3.27,1.28,68.499,-55.045,3.27,-.1,102.047,-61.941,3.27,.21,211.593,-26.683,3.27,1.12,260.502,-24.999,3.27,-.22,343.662,-15.821,3.27,.05,93.719,22.507,3.28,1.6,226.017,-25.282,3.29,1.7,231.232,58.966,3.29,1.16,16.521,-46.719,3.31,.89,78.233,-16.206,3.31,-.11,183.857,57.032,3.31,.08,153.434,-70.038,3.32,-.08,158.006,-61.685,3.32,-.09,286.735,-27.671,3.32,1.19,258.038,-43.239,3.33,.41,117.324,-24.86,3.34,1.24,168.56,15.429,3.34,-.01,261.348,-56.377,3.34,-.13,269.757,-9.774,3.34,.99,63.606,-62.474,3.35,.91,332.714,58.201,3.35,1.57,81.119,-2.397,3.36,-.17,101.322,12.896,3.36,.43,127.566,60.718,3.36,.84,291.375,3.115,3.36,.32,203.673,-.596,3.37,.11,230.67,-44.689,3.37,-.18,28.599,63.67,3.38,-.15,131.694,6.419,3.38,.68,193.901,3.397,3.38,1.58,46.294,38.84,3.39,1.65,67.165,15.871,3.4,.18,154.271,-61.332,3.4,1.54,340.365,10.831,3.4,-.09,22.091,-43.318,3.41,1.57,28.27,29.579,3.41,.49,207.376,-41.688,3.41,-.22,228.071,-52.099,3.41,.92,240.03,-38.397,3.41,-.22,266.615,27.721,3.42,.75,311.24,-66.203,3.42,.16,311.322,61.839,3.43,.92,12.275,57.816,3.44,.57,137.742,-58.967,3.44,-.19,154.173,23.417,3.44,.31,286.562,-4.883,3.44,-.09,17.148,-10.182,3.45,1.16,154.274,42.914,3.45,.03,282.52,33.363,3.45,0,40.825,3.236,3.47,.09,60.17,12.49,3.47,-.12,105.43,-27.935,3.47,1.73,119.195,-52.982,3.47,-.18,228.876,33.315,3.47,.95,299.689,19.492,3.47,1.57,169.62,33.094,3.48,1.4,258.662,14.39,3.48,1.44,342.501,24.602,3.48,.93,342.139,-51.317,3.49,.08,26.017,-15.938,3.5,.72,225.487,40.391,3.5,.97,276.743,-45.968,3.51,-.17,284.432,-21.107,3.51,1.18,124.129,9.186,3.52,1.48,145.287,9.892,3.52,.49,151.833,16.763,3.52,-.03,342.42,66.201,3.52,1.05,67.154,19.18,3.53,1.01,110.031,21.982,3.53,.34,237.405,-3.43,3.53,-.04,250.724,38.922,3.53,.92,332.55,6.198,3.53,.08,55.812,-9.763,3.54,.92,83.785,9.934,3.54,-.18,149.216,-54.568,3.54,-.08,173.25,-31.858,3.54,.94,264.397,-15.399,3.54,.26,86.739,-14.822,3.55,.1,214.851,-46.058,3.55,-.18,4.857,-8.824,3.56,1.22,34.128,-51.512,3.56,-.12,64.474,-33.798,3.56,-.12,169.835,-14.779,3.56,1.12,230.452,-36.261,3.56,1.54,302.182,-66.182,3.56,.76,24.498,48.628,3.57,1.28,116.112,24.398,3.57,.93,253.084,-38.017,3.57,-.21,275.264,72.733,3.57,.49,304.514,-12.545,3.57,.94,109.523,16.54,3.58,.11,217.958,30.371,3.58,1.3,234.256,-28.135,3.58,1.38,185.34,-60.401,3.59,1.42,21.006,-8.183,3.6,1.06,51.203,9.029,3.6,.89,79.402,-6.844,3.6,-.11,86.116,-22.448,3.6,.47,103.197,33.961,3.6,.1,135.906,47.157,3.6,0,142.675,-40.467,3.6,.36,116.314,-37.969,3.61,1.73,152.647,-12.354,3.61,1.01,177.674,1.765,3.61,.55,22.871,15.346,3.62,.97,130.073,-52.922,3.62,-.18,195.567,-71.549,3.62,1.18,253.646,-42.361,3.62,1.37,262.775,-60.684,3.62,-.1,266.433,-64.724,3.62,1.19,345.48,42.326,3.62,-.09,42.496,27.261,3.63,-.1,57.29,24.053,3.63,-.09,309.387,14.595,3.63,.44,176.402,-66.729,3.64,.16,64.948,15.628,3.65,.99,190.415,-1.449,3.65,.36,211.097,64.376,3.65,-.05,313.702,-58.454,3.65,1.25,9.243,53.897,3.66,-.2,234.664,-29.778,3.66,-.17,271.658,-50.092,3.66,-.08,347.362,-21.172,3.66,1.22,142.882,63.062,3.67,.33,236.547,15.422,3.67,.06,130.898,-33.186,3.68,-.18,190.415,-1.449,3.68,.6,231.957,29.106,3.68,.28,325.023,-16.662,3.68,.32,49.879,-21.758,3.69,1.62,72.802,5.605,3.69,-.17,146.312,-62.508,3.69,1.22,349.291,3.282,3.69,.92,28.99,-51.609,3.7,.85,56.219,24.113,3.7,-.11,269.441,29.248,3.7,.94,89.101,-14.168,3.71,.33,176.512,47.779,3.71,1.18,237.704,4.478,3.71,.15,298.828,6.407,3.71,.86,73.563,2.441,3.72,-.18,89.882,54.285,3.72,1,221.562,1.893,3.72,-.01,316.233,43.928,3.72,1.65,318.698,38.046,3.72,.39,27.865,-10.335,3.73,1.14,53.232,-9.458,3.73,.88,118.054,-40.576,3.73,1.04,271.837,9.564,3.73,.12,51.793,9.733,3.74,-.09,321.667,-22.411,3.74,1,343.154,-7.58,3.74,1.64,75.62,41.076,3.75,1.22,136.039,-47.098,3.75,1.2,245.48,19.153,3.75,.27,266.973,2.707,3.75,.04,268.382,56.873,3.75,1.18,337.293,58.415,3.75,.6,42.674,55.896,3.76,1.68,65.734,17.543,3.76,.98,83.406,-62.49,3.76,.82,252.446,-59.041,3.76,1.57,325.369,-77.39,3.76,1,331.753,25.345,3.76,.44,56.298,42.579,3.77,.42,126.434,-66.137,3.77,1.13,286.171,-21.742,3.77,1.01,289.276,53.369,3.77,.96,309.91,15.912,3.77,-.06,311.919,-9.496,3.77,0,337.823,50.282,3.77,.01,107.187,-70.499,3.78,1.04,163.373,-58.853,3.78,.95,106.027,20.57,3.79,.79,111.432,27.798,3.79,1.03,292.426,51.73,3.79,.14,303.408,46.741,3.79,1.28,47.374,44.857,3.8,.98,147.748,59.039,3.8,.29,154.994,19.841,3.8,.6,233.7,10.537,3.8,.26,233.7,10.539,3.8,.26,264.866,46.006,3.8,-.18,84.687,-2.6,3.81,-.24,87.83,-20.879,3.81,.99,156.523,-16.836,3.81,1.48,68.887,-30.562,3.82,.98,139.711,36.802,3.82,.06,156.97,-58.739,3.82,.31,247.728,1.984,3.82,.01,296.847,18.534,3.82,1.41,354.391,46.458,3.82,1.01,56.08,32.288,3.83,.05,163.328,34.215,3.83,1.04,209.568,-42.101,3.83,-.21,221.965,-79.045,3.83,1.43,271.886,28.762,3.83,-.03,297.043,70.268,3.83,.89,67.144,15.962,3.84,.95,130.157,-46.649,3.84,.71,133.762,-60.645,3.84,-.1,159.325,-48.226,3.84,.3,172.851,69.331,3.84,1.62,235.686,26.296,3.84,0,275.925,21.77,3.84,1.18,335.414,-1.387,3.84,-.05,56.05,-64.807,3.85,1.13,86.821,-51.066,3.85,.17,95.528,-33.436,3.85,.88,108.703,-26.773,3.85,-.17,153.684,-42.122,3.85,.05,158.203,9.307,3.85,-.14,239.113,15.662,3.85,.48,243.86,-63.686,3.85,1.11,278.802,-8.244,3.85,1.33,63.5,-42.294,3.86,1.1,189.426,-48.541,3.86,.05,269.063,37.251,3.86,1.35,273.441,-21.059,3.86,.23,14.188,38.499,3.87,.13,48.018,-28.987,3.87,.52,56.457,24.368,3.87,-.07,69.545,-14.304,3.87,1.09,82.803,-35.471,3.87,1.14,103.533,-24.184,3.87,1.73,188.117,-72.133,3.87,-.15,188.371,69.788,3.87,-.13,209.67,-44.804,3.87,-.2,227.984,-48.738,3.87,-.05,2.353,-45.748,3.88,1.03,138.591,2.314,3.88,-.06,148.191,26.007,3.88,1.22,202.761,-39.407,3.88,1.17,220.765,-5.658,3.88,.38,239.221,-29.214,3.88,-.2,44.107,-8.898,3.89,1.11,170.252,-54.491,3.89,-.15,184.977,-.667,3.89,.02,244.935,46.313,3.89,-.15,248.363,-78.897,3.89,.91,299.077,35.083,3.89,1.02,126.415,-3.906,3.9,-.02,298.118,1.006,3.9,.89,347.59,-45.247,3.9,1.02,60.789,5.989,3.91,.03,131.507,-46.042,3.91,0,144.964,-1.143,3.91,1.32,167.147,-58.975,3.91,1.23,187.01,-50.231,3.91,-.19,233.882,-14.789,3.91,1.01,17.096,-55.246,3.92,-.08,255.073,30.926,3.92,-.01,318.956,5.248,3.92,.53,69.08,-3.353,3.93,-.21,115.312,-9.551,3.93,1.02,290.418,-17.847,3.93,.22,6.551,-43.68,3.94,.17,131.171,18.154,3.94,1.08,170.981,10.529,3.94,.41,314.293,41.167,3.94,.02,22.813,-49.073,3.95,.99,43.565,52.763,3.95,.74,99.171,-19.256,3.95,1.06,115.455,-72.606,3.95,1.04,200.985,54.922,3.95,.13,237.74,-33.627,3.95,-.04,341.633,23.566,3.95,1.07,66.009,-34.017,3.96,1.49,89.787,-42.815,3.96,1.14,102.46,-32.509,3.96,-.23,115.952,-28.955,3.96,.18,182.913,-52.369,3.96,-.15,241.702,-20.669,3.96,-.04,300.148,-72.911,3.96,-.03,87.873,39.149,3.97,1.13,130.026,-35.308,3.97,.94,135.16,41.783,3.97,.44,137.819,-62.317,3.97,-.18,270.161,2.932,3.97,.02,290.972,-40.616,3.97,-.1,337.317,-43.496,3.97,1.03,350.743,-20.101,3.97,1.1,30.859,72.421,3.98,-.01,93.714,-6.275,3.98,1.32,109.207,-67.957,3.98,.79,303.868,47.714,3.98,1.52,349.358,-58.236,3.99,.4,30.001,-21.078,4,1.57,43.47,-49.89,4,2.11,135.612,-66.396,4,.14,156.099,-74.032,4,.35,220.49,-37.794,4,-.17,34.329,33.847,4.01,.02,132.633,-27.71,4.01,1.27,201.306,54.988,4.01,.16,240.472,58.565,4.01,.52,242.999,-19.461,4.01,.04,280.759,-71.428,4.01,1.14,290.66,-44.459,4.01,-.1,307.349,30.369,4.01,.4,342.398,-13.593,4.01,1.57,359.828,6.863,4.01,.42,71.375,-3.255,4.02,-.15,131.674,28.76,4.02,1.01,182.103,-24.729,4.02,.32,244.96,-50.156,4.02,1.08,284.906,15.068,4.02,1.08,285.42,-5.739,4.02,1.09,323.495,45.592,4.02,.89,338.839,-.118,4.02,-.09,75.855,60.442,4.03,.92,176.465,6.529,4.03,1.51,193.648,-57.178,4.03,-.17,271.364,2.499,4.03,.86,308.303,11.303,4.03,-.13,59.741,35.791,4.04,.01,62.165,47.713,4.04,-.03,62.966,-6.837,4.04,.33,184.609,-64.003,4.04,-.17,283.834,43.946,4.04,1.59,47.267,49.613,4.05,.59,170.284,6.029,4.05,-.06,215.139,-37.885,4.05,-.03,216.299,51.851,4.05,.5,219.472,-49.426,4.05,-.15,220.914,-35.174,4.05,1.35,227.211,-45.28,4.05,-.18,11.835,24.267,4.06,1.12,113.98,26.896,4.06,1.54,254.896,-53.161,4.06,1.45,25.915,50.689,4.07,-.04,39.871,.329,4.07,-.22,74.093,13.514,4.07,1.15,103.548,-12.039,4.07,1.43,124.632,-76.92,4.07,.39,131.1,-42.649,4.07,.87,207.369,15.798,4.07,1.52,229.378,-58.801,4.07,.09,316.487,-17.233,4.07,-.01,143.611,-59.229,4.08,.01,164.944,-18.299,4.08,1.09,171.22,-17.684,4.08,.21,214.004,-6.001,4.08,.52,320.522,19.804,4.08,1.11,325.877,58.78,4.08,2.35,24.199,41.406,4.09,.54,35.437,-68.659,4.09,.03,45.598,-23.624,4.09,.16,84.226,9.291,4.09,.95,237.185,18.142,4.09,1.62,40.167,-39.856,4.11,1.02,39.898,-68.267,4.11,-.06,52.718,12.937,4.11,1.12,117.31,-46.373,4.11,-.18,158.867,-78.608,4.11,1.58,176.628,-61.178,4.11,.9,184.392,-67.961,4.11,1.58,234.18,-66.317,4.11,1.17,287.368,-37.904,4.11,.04,287.507,-39.341,4.11,1.2,312.955,-26.919,4.11,1.64,337.44,-43.749,4.11,1.57,41.05,49.228,4.12,.49,90.596,9.647,4.12,.16,105.94,-15.633,4.12,-.12,147.87,-14.847,4.12,.92,181.302,8.733,4.12,.98,345.22,-52.754,4.12,.98,277.208,-49.071,4.13,1.02,298.815,-41.868,4.13,1.08,326.161,25.645,4.13,.43,333.993,37.749,4.13,1.46,354.987,5.626,4.13,.51,63.725,48.409,4.14,.95,80.987,-7.808,4.14,.96,129.411,-42.989,4.14,.11,233.232,31.359,4.14,-.13,311.524,-25.271,4.14,.43,355.102,44.334,4.14,-.08,97.241,20.212,4.15,-.13,107.966,-.493,4.15,-.01,181.72,-64.614,4.15,.34,238.456,-16.729,4.15,1.02,239.397,26.878,4.15,1.23,341.514,-81.382,4.15,.2,8.25,62.932,4.16,.14,91.03,23.263,4.16,.82,129.414,5.704,4.16,0,249.094,-35.256,4.16,1.57,334.208,-7.783,4.16,.98,57.364,-36.2,4.17,.95,261.592,-24.175,4.17,.28,340.164,-27.044,4.17,-.11,56.582,23.948,4.18,-.06,112.278,31.784,4.18,.32,214.096,46.088,4.18,.08,207.361,-34.451,4.19,1.5,213.224,-10.274,4.19,1.33,281.415,20.546,4.19,.46,333.758,57.044,4.19,.28,341.673,12.173,4.19,.5,82.696,5.948,4.2,-.14,119.215,-22.88,4.2,.72,248.526,42.437,4.2,-.01,52.267,59.94,4.21,.41,85.19,-1.943,4.21,.6,156.971,36.707,4.21,.9,343.987,-32.54,4.21,.97,348.973,-9.088,4.21,1.11,66.342,22.294,4.22,.13,275.19,71.338,4.22,-.1,281.794,-4.748,4.22,1.1,283.054,-62.188,4.22,-.14,307.395,62.994,4.22,.2,311.415,30.72,4.22,1.05,321.611,-65.366,4.22,.49,348.581,-6.049,4.22,1.56,5.018,-64.875,4.23,.58,42.646,38.319,4.23,.34,54.123,48.193,4.23,-.06,56.712,-23.25,4.23,.42,206.422,-33.044,4.23,.38,241.648,-36.802,4.23,-.17,247.845,-34.704,4.23,-.16,251.492,82.037,4.23,.89,297.641,32.914,4.23,1.82,319.354,39.395,4.23,.12,326.698,49.309,4.23,-.12,118.326,-48.103,4.24,-.14,250.769,-77.517,4.24,1.06,304.412,-12.508,4.24,1.07,17.186,86.257,4.25,1.21,17.376,47.242,4.25,-.07,36.746,-47.704,4.25,-.14,41.031,-13.859,4.25,-.14,64.007,-51.487,4.25,.3,69.172,41.265,4.25,1.22,68.914,10.161,4.25,.18,125.709,43.188,4.25,1.55,134.622,11.858,4.25,.14,156.788,-31.068,4.25,1.45,216.881,75.696,4.25,1.44,26.348,9.158,4.26,.96,89.984,45.937,4.26,1.72,184.586,-79.312,4.26,-.12,188.435,41.358,4.26,.59,197.968,27.878,4.26,.57,210.412,1.544,4.26,.1,242.192,44.935,4.26,-.07,265.354,-12.875,4.26,.08,41.235,10.114,4.27,.31,49.982,-43.07,4.27,.71,53.447,-21.633,4.27,-.11,69.54,12.511,4.27,.12,77.287,-8.754,4.27,-.19,122.372,-47.346,4.27,-.23,193.359,-40.179,4.27,.21,196.728,-49.906,4.27,-.19,229.633,-47.875,4.27,-.08,311.665,16.124,4.27,1.04,331.609,-13.87,4.27,-.07,15.736,7.89,4.28,.96,37.04,8.46,4.28,-.06,54.218,.402,4.28,.58,66.577,22.814,4.28,.26,70.561,22.957,4.28,-.13,115.828,28.884,4.28,1.12,159.827,-55.603,4.28,1.04,178.228,-33.908,4.28,-.1,247.785,-16.613,4.28,.92,320.562,-16.834,4.28,.9,346.72,-43.521,4.28,.42,351.992,6.379,4.28,1.07,61.646,50.351,4.29,.02,63.884,8.892,4.29,-.06,66.373,17.928,4.29,.05,73.513,66.343,4.29,.03,79.894,-13.177,4.29,-.26,144.272,81.326,4.29,1.48,261.839,-29.867,4.29,.4,264.137,-38.635,4.29,1.09,290.805,-44.8,4.29,.34,326.362,61.121,4.29,.52,330.947,64.628,4.29,.34,332.497,33.178,4.29,.46,337.876,-32.346,4.29,.01,354.534,43.268,4.29,-.1,56.302,24.467,4.3,-.11,130.806,3.399,4.3,-.2,174.237,-.824,4.3,1,283.626,36.899,4.3,1.68,303.35,56.568,4.3,.11,14.652,-29.358,4.31,-.16,142.93,22.968,4.31,1.54,188.017,-16.196,4.31,.38,231.123,37.377,4.31,.31,70.11,-19.672,4.32,1.61,112.041,8.926,4.32,1.43,131.594,-13.548,4.32,.9,177.421,-63.788,4.32,-.15,216.729,-83.668,4.32,1.31,222.91,-43.576,4.32,-.15,236.015,77.794,4.32,.04,241.851,-20.869,4.32,.84,309.585,-1.105,4.32,.95,17.776,55.15,4.33,.17,30.512,2.764,4.33,.03,97.964,-23.418,4.33,-.24,130.154,-59.761,4.33,-.11,180.756,-63.313,4.33,.27,193.279,-48.943,4.33,1.37,215.081,-56.387,4.33,.12,234.513,-42.568,4.33,1.42,260.207,-12.847,4.33,.03,274.965,36.064,4.33,1.17,122.148,-2.984,4.34,.97,139.051,-57.541,4.34,1.63,210.431,-45.604,4.34,.6,229.458,-30.149,4.34,1.1,261.629,4.14,4.34,1.5,326.237,-33.026,4.34,-.05,326.128,17.35,4.34,1.17,44.568,-40.304,4.35,.08,47.907,19.727,4.35,1.03,86.193,-65.736,4.35,.21,93.845,29.498,4.35,1.02,104.319,58.422,4.35,.85,121.983,-68.617,4.35,-.11,125.16,-77.484,4.35,1.16,144.207,-49.355,4.35,.17,216.545,-45.379,4.35,.43,272.145,-63.668,4.35,.22,9.22,33.719,4.36,-.14,10.838,-57.463,4.36,0,52.644,47.995,4.36,1.35,61.174,22.082,4.36,1.07,72.653,8.9,4.36,.01,78.308,-12.941,4.36,-.1,89.384,-35.283,4.36,-.18,132.108,5.838,4.36,-.04,186.735,28.268,4.36,1.13,211.512,-41.18,4.36,-.19,272.19,20.814,4.36,-.16,263.054,86.586,4.36,.02,275.807,-61.494,4.36,1.48,281.193,37.605,4.36,.19,281.755,18.181,4.36,.13,289.092,38.134,4.36,1.26,294.18,-1.286,4.36,-.08,337.382,47.707,4.36,1.68,7.886,-62.958,4.37,-.07,9.639,29.312,4.37,.87,33.25,8.847,4.37,.89,94.138,-35.141,4.37,1,104.034,-17.054,4.37,-.07,151.976,9.997,4.37,1.45,295.024,18.014,4.37,.78,295.262,17.476,4.37,1.05,299.934,-35.276,4.37,-.15,353.243,-37.818,4.37,-.09,83.053,18.594,4.38,2.07,197.488,-5.539,4.38,-.01,253.502,10.165,4.38,-.08,73.224,-5.453,4.39,.25,98.744,-52.976,4.39,-.02,120.566,2.334,4.39,1.25,165.039,-42.226,4.39,.11,260.251,-21.113,4.39,.39,288.44,39.146,4.39,-.15,302.222,77.711,4.39,-.05,319.967,-53.45,4.39,.19,349.476,-9.182,4.39,-.15,351.512,-20.642,4.39,1.47,102.464,-53.622,4.4,.92,109.677,-24.954,4.4,-.15,122.257,-19.245,4.4,-.15,225.725,2.091,4.4,1.04,329.48,-54.992,4.4,.28,351.345,23.404,4.4,.61,28.412,-46.302,4.41,1.59,83.705,9.489,4.41,-.16,88.595,20.276,4.41,.59,107.785,30.245,4.41,1.26,119.56,-49.245,4.41,-.17,169.546,31.529,4.41,.59,222.572,-27.96,4.41,1.4,262.685,26.111,4.41,1.44,269.626,30.189,4.41,.39,346.975,75.388,4.41,.8,349.706,-32.532,4.41,1.13,.49,-6.014,4.41,1.63,14.302,23.418,4.42,.94,56.535,-12.102,4.42,1.63,91.893,14.768,4.42,-.17,165.582,20.18,4.42,.05,215.759,-39.512,4.42,-.18,218.154,-50.457,4.42,-.19,246.756,-18.456,4.42,.28,311.934,-5.028,4.42,1.65,337.209,-.02,4.42,.38,12.171,7.585,4.43,1.5,63.818,-7.653,4.43,.82,99.473,-18.238,4.43,1.15,220.287,13.728,4.43,.05,236.611,7.353,4.43,.6,305.965,32.19,4.43,1.33,310.865,15.074,4.43,.32,319.48,34.897,4.43,-.11,335.89,52.229,4.43,1.02,3.66,-18.933,4.44,1.66,25.358,5.487,4.44,1.36,64.12,-59.302,4.44,1.08,95.942,4.593,4.44,.18,123.512,-40.348,4.44,1.17,129.689,3.341,4.44,1.21,284.238,-67.234,4.44,.71,292.176,24.665,4.44,1.5,70.14,-41.864,4.45,.34,78.075,-11.869,4.45,-.1,113.513,-22.296,4.45,.51,122.84,-39.619,4.45,1.62,124.639,-36.659,4.45,.22,135.023,-41.254,4.45,.65,158.897,-57.558,4.45,1.62,161.445,-80.54,4.45,-.19,248.034,-21.466,4.45,.13,270.438,1.305,4.45,.02,288.887,73.356,4.45,1.25,293.522,7.379,4.45,1.17,42.272,-32.406,4.46,.99,78.323,2.861,4.46,1.19,141.164,26.182,4.46,1.23,177.786,-45.174,4.46,1.3,218.67,29.745,4.46,.36,331.529,-39.543,4.46,1.37,340.129,44.276,4.46,1.33,343.132,-32.876,4.46,-.04,41.276,-18.572,4.47,.48,50.085,29.048,4.47,1.55,57.38,65.526,4.47,1.88,74.322,53.752,4.47,-.02,74.637,1.714,4.47,1.4,101.965,2.412,4.47,1.11,169.165,-3.652,4.47,.21,182.022,-50.661,4.47,-.15,246.796,-47.555,4.47,-.07,346.67,-23.743,4.47,.9,92.985,14.209,4.48,-.18,94.906,59.011,4.48,.01,97.042,-32.58,4.48,-.17,137.218,51.605,4.48,.27,136.287,-72.603,4.48,.61,151.858,35.245,4.48,.18,167.915,-22.826,4.48,.03,294.11,50.221,4.48,.38,336.833,-64.966,4.48,-.03,66.587,15.618,4.49,.25,100.997,13.228,4.49,1.16,108.14,-46.759,4.49,.32,118.161,-38.863,4.49,-.19,131.677,-56.77,4.49,-.17,151.985,-.372,4.49,-.04,224.296,-4.346,4.49,.32,318.62,10.007,4.49,.5,333.47,39.715,4.49,1.39,355.68,-14.545,4.49,-.04,98.226,7.333,4.5,0,114.705,-26.802,4.5,-.17,117.022,-25.937,4.5,-.05,143.706,52.051,4.5,.01,155.228,-56.043,4.5,-.12,163.903,24.75,4.5,.01,206.815,17.457,4.5,.48,246.026,-20.038,4.5,1.01,316.782,-25.006,4.5,1.61,332.096,-32.989,4.5,.05,355.512,1.78,4.5,.2,359.979,-65.577,4.5,-.08,17.915,30.09,4.51,1.09,41.977,29.247,4.51,1.11,60.224,-62.159,4.51,1.65,68.377,-29.767,4.51,.98,87.457,-56.167,4.51,1.1,142.311,-35.951,4.51,1.44,230.845,-59.321,4.51,.19,300.705,67.874,4.51,1.32,311.01,-51.921,4.51,.27,311.338,57.58,4.51,.54,317.399,-11.372,4.51,.94,322.181,-21.807,4.51,.91,337.622,43.123,4.51,-.09,4.582,36.785,4.52,.05,37.267,67.403,4.52,.12,87.294,39.181,4.52,.94,144.838,-61.328,4.52,-.07,214.778,-13.371,4.52,.13,235.388,19.67,4.52,.04,260.921,37.146,4.52,-.03,299.237,-27.17,4.52,1.46,303.942,27.814,4.52,1.26,346.751,9.409,4.52,1.57,348.137,49.406,4.52,.29,12.453,41.079,4.53,-.15,42.878,35.06,4.53,1.56,90.014,-3.074,4.53,1.22,114.342,-34.969,4.53,-.09,176.996,20.219,4.53,.55,200.658,-60.988,4.53,-.13,201.002,-64.536,4.53,.85,272.808,-45.954,4.53,1.01,311.852,36.491,4.53,-.11,345.969,3.82,4.53,-.12,7.89,-62.966,4.54,.15,11.181,48.284,4.54,-.07,30.489,70.907,4.54,.16,52.479,58.879,4.54,.56,79.545,33.372,4.54,1.27,98.764,-22.965,4.54,-.05,112.449,12.007,4.54,1.28,213.371,51.79,4.54,.2,226.111,26.948,4.54,1.24,228.055,-19.792,4.54,-.08,230.789,-36.859,4.54,-.15,233.972,-44.959,4.54,-.18,261.658,-5.087,4.54,.39,266.89,-27.831,4.54,.8,358.596,57.499,4.54,1.22,76.102,-35.483,4.55,1.2,105.017,76.978,4.55,1.36,143.556,36.398,4.55,.92,222.847,19.101,4.55,.76,245.159,-24.169,4.55,.84,316.65,47.648,4.55,1.57,352.289,12.761,4.55,.94,.935,-17.336,4.55,-.05,59.686,-61.4,4.56,1.62,136.632,38.452,4.56,1.04,143.62,69.83,4.56,.77,207.957,-32.994,4.56,-.13,216.534,-45.221,4.56,-.15,325.48,71.311,4.56,1.1,84.796,4.121,4.57,-.11,142.995,-1.185,4.57,.1,154.903,-55.029,4.57,1.62,160.884,-60.567,4.57,1.71,246.354,14.033,4.57,0,272.021,-28.457,4.57,.94,322.487,23.639,4.57,1.62,335.257,46.537,4.57,-.1,336.129,49.476,4.57,.09,357.232,-28.13,4.57,.01,54.274,-40.275,4.58,1.04,88.332,27.612,4.58,-.02,137.012,-25.858,4.58,1.59,147.92,-46.548,4.58,1.2,265.485,72.149,4.58,.42,298.365,24.08,4.58,-.06,300.665,-27.71,4.58,1.65,10.332,-46.085,4.59,.97,55.709,-37.314,4.59,1.2,81.709,3.096,4.59,-.21,83.847,-4.838,4.59,-.19,115.885,-28.411,4.59,1.63,148.027,54.064,4.59,.03,238.403,-25.327,4.59,-.07,243.076,-27.926,4.59,-.16,263.915,-46.506,4.59,-.03,283.687,22.645,4.59,.78,287.087,-40.497,4.59,1.09,290.167,65.715,4.59,.02,313.032,27.097,4.59,.83,337.207,-.02,4.59,.6,97.204,-7.033,4.6,-.1,130.053,64.328,4.6,1.17,142.287,-2.769,4.6,.46,151.281,-13.065,4.6,-.09,164.18,-37.138,4.6,1.03,168.15,-60.318,4.6,.55,198.072,-59.921,4.6,-.08,221.31,16.964,4.6,.98,224.396,65.933,4.6,1.59,231.334,-38.734,4.6,0,294.177,-24.884,4.6,-.07,350.159,23.74,4.6,.17,1.334,-5.708,4.61,1.04,4.273,38.682,4.61,.06,64.561,50.296,4.61,.04,119.967,-18.399,4.61,.08,166.635,-62.424,4.61,1.03,290.432,-15.955,4.61,.1,308.476,35.251,4.61,1.6,28.389,3.188,4.62,.94,82.983,-7.301,4.62,-.26,114.707,-26.804,4.62,.6,130.918,-7.234,4.62,.84,138.938,-37.413,4.62,.45,173.69,-54.264,4.62,-.08,193.663,-59.147,4.62,-.15,233.545,-10.064,4.62,1.01,238.169,42.452,4.62,.56,264.461,-8.119,4.62,.11,270.121,-3.69,4.62,.38,284.055,4.204,4.62,.17,14.166,59.181,4.63,.96,44.803,21.34,4.63,.04,44.803,21.34,4.63,.04,47.822,39.612,4.63,1.11,57.59,71.332,4.63,.03,90.98,20.138,4.63,.28,118.265,-49.613,4.63,-.23,166.254,7.336,4.63,.33,168.801,23.096,4.63,1.66,237.399,26.068,4.63,.8,240.883,-57.775,4.63,.24,246.95,-8.372,4.63,.17,339.343,51.545,4.63,.24,75.774,21.59,4.64,.16,109.146,-27.881,4.64,1.6,111.678,49.211,4.64,-.02,113.845,-28.369,4.64,-.11,189.969,-39.988,4.64,-.08,235.297,-44.661,4.64,.4,237.745,-25.751,4.64,-.05,270.066,4.369,4.64,-.03,271.827,8.734,4.64,.96,277.843,-62.278,4.64,-.11,278.376,-42.313,4.64,1.01,300.275,27.754,4.64,.18,18.437,24.584,4.65,1.04,58.427,-24.613,4.65,-.13,68.462,14.844,4.65,.25,73.724,10.151,4.65,.09,88.525,-63.09,4.65,1.05,103.661,13.178,4.65,.3,112.677,-30.962,4.65,.93,191.595,-56.489,4.65,-.16,206.664,-51.433,4.65,.96,207.858,64.723,4.65,1.58,240.804,-49.23,4.65,.92,252.458,-10.783,4.65,.47,259.418,37.292,4.65,.05,274.513,-27.043,4.65,1.66,346.046,50.052,4.65,1.06,17.863,21.035,4.66,1.03,40.863,27.707,4.66,-.13,59.981,-24.016,4.66,-.13,100.245,9.896,4.66,-.25,108.563,-26.353,4.66,-.19,109.577,-36.734,4.66,-.1,130.821,21.469,4.66,.02,156.852,-57.639,4.66,.51,159.688,-59.183,4.66,1.48,180.218,6.614,4.66,.13,189.812,-7.996,4.66,1.23,190.647,-48.813,4.66,1.09,205.185,54.682,4.66,1.64,282.8,59.388,4.66,1.19,291.63,.339,4.66,.6,336.319,1.377,4.66,-.03,359.44,25.141,4.66,1.59,27.396,-10.686,4.67,.33,52.342,49.509,4.67,-.09,91.539,-14.935,4.67,.05,137.73,63.514,4.67,.35,234.942,-34.412,4.67,.99,270.014,16.751,4.67,1.26,315.323,-32.258,4.67,.89,325.524,51.19,4.67,-.12,76.142,15.404,4.68,-.06,103.906,-20.136,4.68,.37,120.305,-1.393,4.68,1.49,144.614,4.649,4.68,1.32,245.087,-78.696,4.68,1.69,275.915,-8.934,4.68,.95,293.09,69.661,4.68,.79,308.827,14.674,4.68,.11,324.27,-19.466,4.68,-.17,28.734,-67.647,4.69,.95,31.123,-29.297,4.69,-.17,66.652,14.714,4.69,.98,69.819,15.918,4.69,.15,134.081,-52.724,4.69,-.12,140.801,-28.834,4.69,.92,141.827,-22.344,4.69,1.14,191.408,-60.981,4.69,1.05,202.991,-6.256,4.69,1.62,271.255,-29.58,4.69,.78,294.844,30.153,4.69,.97,317.585,10.132,4.69,.26,324.438,-7.854,4.69,.17,330.84,-56.786,4.69,1.06,330.829,-2.155,4.69,-.06,340.897,-18.83,4.69,1.37,347.478,-22.457,4.69,.65,44.69,39.663,4.7,.06,44.929,8.908,4.7,-.12,114.575,-25.365,4.7,-.11,150.053,8.044,4.7,1.6,174.17,-9.802,4.7,-.08,175.053,-34.745,4.7,-.07,203.614,49.016,4.7,.12,277.3,-14.566,4.7,.06,298.96,-26.299,4.7,.75,23.483,59.232,4.71,1,36.406,50.279,4.71,1.53,63.722,40.484,4.71,1.01,79.785,40.099,4.71,.63,80.112,-21.239,4.71,-.05,82.433,-1.092,4.71,1.57,117.085,-47.078,4.71,1.06,136.41,-70.539,4.71,-.15,159.68,31.976,4.71,.81,163.495,43.19,4.71,-.05,196.57,-48.464,4.71,-.14,209.412,-63.687,4.71,1.11,298.562,8.461,4.71,1.05,319.485,-32.172,4.71,.06,343.603,84.346,4.71,1.43,353.319,-20.914,4.71,.02,353.769,-42.615,4.71,.08,52.345,-62.938,4.72,.4,76.377,-57.473,4.72,.52,122.818,-12.927,4.72,.95,140.373,-25.966,4.72,1.63,177.06,-66.815,4.72,1.54,181.08,-63.166,4.72,-.08,226.28,-47.051,4.72,-.14,241.623,-45.173,4.72,.23,280.568,-9.053,4.72,.35,7.943,54.522,4.73,-.1,52.655,-5.075,4.73,-.09,57.15,-37.621,4.73,-.03,80.44,-.382,4.73,-.17,176.191,-18.351,4.73,.97,199.385,40.573,4.73,.3,208.302,-31.928,4.73,-.14,253.499,-42.362,4.73,.49,259.153,-.445,4.73,1.14,313.163,-8.983,4.73,.32,324.48,62.082,4.73,.3,325.665,-18.866,4.73,.88,326.036,28.743,4.73,.48,21.483,68.13,4.74,1.05,73.133,14.251,4.74,1.84,87.76,37.306,4.74,1.62,156.479,33.796,4.74,.25,157.584,-71.993,4.74,.04,165.457,-2.485,4.74,1.62,185.179,17.793,4.74,1.01,199.601,-18.311,4.74,.71,207.948,34.444,4.74,1.66,235.487,-19.679,4.74,1.57,292.943,34.453,4.74,-.14,314.957,47.521,4.74,-.05,341.871,83.154,4.74,1.26,354.463,-45.492,4.74,.08,28.382,19.294,4.75,-.04,38.022,-15.245,4.75,.45,39.95,-42.892,4.75,.06,42.76,-21.004,4.75,.91,42.619,-75.067,4.75,1.33,122.858,-42.987,4.75,.18,158.308,40.426,4.75,.23,212.478,-53.439,4.75,.94,214.041,51.367,4.75,.2,235.671,-34.711,4.75,-.14,285.779,-42.095,4.75,-.02,349.656,68.112,4.75,.84,11.047,-10.609,4.76,1.01,19.867,27.264,4.76,.03,46.385,56.706,4.76,1.02,83.182,32.192,4.76,.34,108.659,-48.272,4.76,-.1,122.253,-61.302,4.76,.43,135.636,67.63,4.76,1.53,201.863,-15.974,4.76,1.09,225.948,47.654,4.76,.65,237.816,20.978,4.76,1.54,240.7,46.037,4.76,-.11,242.243,36.491,4.76,1.01,269.948,-23.816,4.76,-.04,305.166,-12.759,4.76,-.05,308.895,-60.582,4.76,.28,346.778,25.468,4.76,1.34,7.854,-48.804,4.77,.02,13.252,-1.144,4.77,1.57,101.832,8.037,4.77,1.4,130.305,-47.317,4.77,.12,145.321,-23.592,4.77,-.12,172.579,-3.004,4.77,1.54,215.177,-45.187,4.77,.31,215.774,-27.754,4.77,1.31,241.092,-11.373,4.77,.47,265.098,-49.416,4.77,.4,278.144,57.046,4.77,.61,289.054,21.39,4.77,-.05,300.89,-37.941,4.77,1.41,67.64,16.194,4.78,.17,73.158,36.703,4.78,1.41,83.761,-6.002,4.78,-.25,88.11,1.855,4.78,1.38,123.373,-35.9,4.78,-.11,169.783,38.186,4.78,.12,194.731,17.409,4.78,1.56,244.575,-28.614,4.78,.02,260.498,-67.771,4.78,1.21,303.816,25.592,4.78,-.18,307.215,-17.814,4.78,.38,313.312,44.387,4.78,-.14,.399,-77.066,4.78,1.27,29.482,23.596,4.79,.28,58.573,-2.955,4.79,.94,74.983,-12.537,4.79,.26,99.833,42.489,4.79,1.23,109.153,-23.316,4.79,1.71,119.417,-30.335,4.79,.15,139.943,-11.975,4.79,.93,146.05,-27.769,4.79,.51,154.934,19.471,4.79,.45,193.588,-9.539,4.79,1.6,247.552,-25.115,4.79,-.11,281.362,-64.871,4.79,.2,332.452,72.341,4.79,.92,333.904,-41.347,4.79,.8,336.965,4.696,4.79,1.05,340.439,29.308,4.79,-.01,3.651,20.207,4.8,1.57,10.516,50.513,4.8,-.11,48.958,-8.82,4.8,.23,56.51,63.345,4.8,.8,66.024,17.444,4.8,.15,84.721,-7.213,4.8,.13,94.712,69.32,4.8,.03,137.597,67.135,4.8,.49,140.121,-9.556,4.8,.93,186.006,51.562,4.8,.87,196.795,27.625,4.8,1.48,198.812,-67.894,4.8,-.08,199.401,5.47,4.8,1.67,264.238,68.758,4.8,.43,359.603,51.389,4.8,1.83,6.982,-33.007,4.81,1.64,75.36,-7.174,4.81,-.19,92.575,-54.969,4.81,-.23,140.237,-62.405,4.81,.94,143.766,39.621,4.81,.99,185.626,25.846,4.81,.49,188.713,22.629,4.81,0,214.499,35.509,4.81,1.06,217.05,-2.228,4.81,.7,220.856,26.528,4.81,1.66,225.527,25.008,4.81,1.5,262.854,-23.963,4.81,0,267.547,-40.091,4.81,.26,276.337,-20.542,4.81,1.31,304.447,38.033,4.81,.42,335.33,28.331,4.81,0,338.25,-61.982,4.81,1.61,13.267,61.124,4.82,.53,32.122,37.859,4.82,.12,49.682,34.223,4.82,1.49,77.425,15.597,4.82,.32,89.499,25.954,4.82,-.06,99.82,-14.146,4.82,1.5,120.083,-63.568,4.82,-.17,125.632,-48.49,4.82,-.15,159.388,-13.384,4.82,2.68,160.558,-64.466,4.82,-.14,161.029,-63.961,4.82,-.13,186.632,-51.451,4.82,-.14,204.365,36.295,4.82,.23,212.212,77.547,4.82,1.36,226.28,-47.051,4.82,.6,228.206,-44.501,4.82,-.17,237.808,35.657,4.82,1,245.518,1.029,4.82,.34,252.309,45.983,4.82,.09,255.265,-4.223,4.82,1.48,259.331,33.1,4.82,-.17,276.496,65.564,4.82,1.19,283.6,71.297,4.82,1.15,309.63,21.201,4.82,-.02,320.19,-40.81,4.82,.02,337.662,-10.678,4.82,-.06,355.441,-17.816,4.82,.82,13.75,58.973,4.83,1.21,21.914,45.407,4.83,.42,28.382,19.296,4.83,.6,29.292,-47.385,4.83,.88,33.305,44.232,4.83,1.48,49.84,3.37,4.83,.68,79.371,-34.895,4.83,1,78.439,-67.185,4.83,1.28,103.387,-20.224,4.83,-.21,107.213,-39.656,4.83,-.18,125.346,-33.054,4.83,1.45,139.047,54.022,4.83,.19,155.582,-41.65,4.83,1.12,171.153,-10.859,4.83,1.56,212.6,25.092,4.83,.54,220.287,13.728,4.83,.6,240.574,22.804,4.83,.07,250.23,64.589,4.83,1.22,267.294,-31.703,4.83,-.04,281.519,26.662,4.83,1.2,283.543,-22.745,4.83,1.41,284.265,-5.846,4.83,1.08,299.738,-26.196,4.83,.9,303.325,46.816,4.83,.09,22.546,6.144,4.84,1.37,30.978,42.331,4.84,.03,39.891,-11.872,4.84,.45,41.386,-67.617,4.84,.06,49.998,65.652,4.84,-.15,63.485,9.264,4.84,.8,114.864,-38.308,4.84,-.19,122.114,51.507,4.84,.05,157.657,55.981,4.84,.52,158.773,75.713,4.84,.96,165.14,3.618,4.84,1.16,248.151,11.488,4.84,1.49,312.235,46.114,4.84,.41,316.101,-19.855,4.84,.17,331.42,5.059,4.84,1.44,29.168,-22.527,4.85,1.42,65.388,46.499,4.85,-.03,112.464,-23.024,4.85,.23,161.713,-64.383,4.85,-.15,176.321,8.258,4.85,.18,195.888,-49.527,4.85,.02,198.013,-37.803,4.85,.7,245.524,30.892,4.85,.97,251.324,56.782,4.85,.38,288.885,-25.257,4.85,.56,340.875,-41.414,4.85,1.03,341.408,-53.5,4.85,1.18,346.654,59.42,4.85,-.03,349.436,49.015,4.85,1.67,18.942,-68.876,4.86,.47,38.969,5.593,4.86,.87,78.357,38.484,4.86,.18,85.324,16.534,4.86,-.13,87.254,24.567,4.86,1.01,128.832,-58.009,4.86,1,130.606,-53.114,4.86,-.17,152.235,-51.811,4.86,-.12,186.629,-63.123,4.86,-.12,214.938,16.307,4.86,1.23,220.412,8.162,4.86,1,229.412,-63.611,4.86,1.25,269.197,-44.342,4.86,1.21,275.217,3.377,4.86,.91,296.59,-19.761,4.86,.93,359.668,-3.556,4.86,.93,34.263,34.224,4.87,.61,47.985,74.394,4.87,.02,63.599,-10.256,4.87,1.17,88.279,-33.801,4.87,-.15,101.559,59.442,4.87,.08,169.545,31.529,4.87,.6,199.304,-66.784,4.87,1.5,256.206,-34.123,4.87,.26,263.067,55.173,4.87,.28,265.857,-21.683,4.87,.47,281.081,-35.642,4.87,-.18,284.615,-52.939,4.87,-.05,284.681,-37.108,4.87,.41,356.765,58.652,4.87,1.11,20.585,45.529,4.88,1.08,49.592,-22.511,4.88,.9,72.477,37.488,4.88,1.44,81.909,21.937,4.88,-.15,116.531,18.51,4.88,1.45,130.43,-15.943,4.88,1.06,148.551,-25.933,4.88,1.23,190.471,10.236,4.88,.09,239.548,-14.279,4.88,-.1,263.044,55.184,4.88,.26,269.449,-41.716,4.88,1.65,309.397,-61.53,4.88,.43,339.815,39.05,4.88,-.2,359.752,55.755,4.88,-.07,2.816,-15.468,4.89,.49,12.209,50.968,4.89,-.11,36.487,-12.291,4.89,-.03,48.725,21.044,4.89,-.01,108.306,-45.183,4.89,-.02,129.927,-29.561,4.89,.9,133.881,-27.682,4.89,.11,157.841,-53.716,4.89,.5,159.307,-27.412,4.89,1.62,240.851,-38.602,4.89,-.14,254.007,65.135,4.89,.48,296.069,37.354,4.89,.95,309.182,-2.55,4.89,1.6,312.371,-46.227,4.89,1.52,21.405,-14.599,4.9,1.23,38.461,-28.232,4.9,-.05,94.998,-2.944,4.9,1.6,104.405,45.094,4.9,.03,107.914,39.321,4.9,1.45,114.791,34.584,4.9,.4,177.963,-65.206,4.9,-.11,193.324,21.245,4.9,.9,195.069,30.785,4.9,1.17,249.687,48.928,4.9,1.55,280.88,-8.275,4.9,1.12,293.804,-48.099,4.9,1.09,312.492,-33.78,4.9,1,323.694,38.534,4.9,1.08,343.807,8.816,4.9,0,40.562,40.194,4.91,.59,67.97,-.044,4.91,1.32,75.357,-20.052,4.91,-.05,85.619,1.475,4.91,1.17,87.387,12.651,4.91,-.07,96.225,49.288,4.91,1.97,159.646,-16.877,4.91,.92,176.63,-40.501,4.91,.66,179.905,-78.222,4.91,-.06,192.672,-33.999,4.91,-.04,207.428,21.264,4.91,1.43,212.71,-16.302,4.91,1.72,214.558,-81.008,4.91,.25,228.655,-31.519,4.91,.37,247.117,-70.084,4.91,.55,256.345,12.741,4.91,.12,307.413,-2.886,4.91,1.15,311.219,25.271,4.91,1.18,329.163,63.626,4.91,1.77,352.508,58.549,4.91,-.12,107.557,-4.237,4.92,1.03,134.243,-59.229,4.92,-.19,198.562,-59.103,4.92,.48,198.429,40.153,4.92,1.06,215.654,-58.459,4.92,.86,221.247,-35.192,4.92,.01,225.243,-8.519,4.92,0,241.36,-19.802,4.92,-.02,283.307,50.708,4.92,.9,298.908,52.439,4.92,.12,311.795,34.374,4.92,1.32,332.537,-32.548,4.92,.48,44.765,35.183,4.93,1.23,62.711,-41.994,4.93,.33,65.103,34.567,4.93,.94,91.246,-16.484,4.93,.24,99.657,-48.22,4.93,.87,105.974,-49.584,4.93,.13,119.934,-3.68,4.93,1.21,132.449,-45.308,4.93,.05,157.758,-73.222,4.93,1.68,190.486,-59.686,4.93,-.04,195.183,56.366,4.93,.36,226.825,24.869,4.93,.43,285.004,32.146,4.93,1.47,286.605,-37.063,4.93,.52,302.357,36.84,4.93,-.13,355.998,29.362,4.93,.95,10.867,47.025,4.94,.18,25.145,40.577,4.94,-.09,33.093,30.303,4.94,.78,64.315,20.579,4.94,.26,74.814,37.89,4.94,.04,79.819,22.096,4.94,.93,113.915,-52.534,4.94,1.4,115.097,-15.264,4.94,1.56,120.88,27.794,4.94,1.12,138.903,-38.57,4.94,1.11,145.56,-23.916,4.94,.53,148.718,-19.009,4.94,1.57,166.333,-27.294,4.94,.36,175.223,-62.09,4.94,1.15,188.683,70.022,4.94,1.31,192.925,27.541,4.94,.67,203.533,3.659,4.94,.03,220.182,16.418,4.94,-.03,221.5,-25.443,4.94,.35,222.754,-2.299,4.94,.98,231.05,-10.322,4.94,.44,243.37,-54.631,4.94,1.04,243,-10.064,4.94,.09,248.521,-44.045,4.94,.05,298.965,38.487,4.94,-.08,301.847,-52.881,4.94,1.62,343.008,43.313,4.94,1.56,351.733,1.256,4.94,.03,1.125,-10.509,4.94,1.63,25.447,42.614,4.95,.62,50.36,43.329,4.95,.04,65.089,27.351,4.95,1.15,81.187,1.846,4.95,-.2,85.211,-1.129,4.95,-.21,90.46,-10.598,4.95,-.12,93.014,16.131,4.95,-.14,104.067,-48.721,4.95,1.69,171.984,2.856,4.95,1,184.085,23.945,4.95,.97,186.6,27.268,4.95,.27,187.528,69.201,4.95,1.62,197.264,-23.118,4.95,1.05,239.447,54.75,4.95,.26,244.376,75.755,4.95,.37,275.075,21.961,4.95,1.59,294.223,-7.027,4.95,0,297.767,22.61,4.95,-.14,303.569,15.197,4.95,.08,307.515,48.952,4.95,-.09,344.108,49.734,4.95,1.78,356.509,46.42,4.95,1.11,18.796,-45.531,4.96,.58,112.768,82.411,4.96,1.66,110.556,-19.017,4.96,-.04,185.088,3.313,4.96,1.16,235.07,-23.818,4.96,1.33,232.854,77.349,4.96,1.58,250.393,-17.742,4.96,1.11,270.377,21.596,4.96,.12,277.939,-45.915,4.96,-.11,289.409,-18.953,4.96,1.02,298.981,58.846,4.96,1.59,55.594,33.965,4.97,-.01,60.326,-61.079,4.97,1.42,67.11,16.36,4.97,1.13,88.875,-37.121,4.97,1.11,113.45,-14.524,4.97,1.41,118.374,26.766,4.97,.09,136.493,5.092,4.97,1.22,142.986,11.3,4.97,1.05,156.033,65.566,4.97,-.06,177.486,-70.226,4.97,1.4,202.428,-23.281,4.97,1.6,207.468,-18.134,4.97,1.06,217.043,-29.492,4.97,-.07,272.976,31.405,4.97,1.65,291.032,29.621,4.97,-.1,303.633,36.806,4.97,.14,20.02,58.232,4.98,.68,24.837,44.386,4.98,.89,32.355,25.94,4.98,.33,52.013,49.063,4.98,-.09,94.478,61.515,4.98,1.83,109.668,-24.559,4.98,-.15,130.006,-12.475,4.98,1.42,202.107,13.779,4.98,.71,203.699,37.182,4.98,.4,255.783,14.092,4.98,1.6,272.931,-23.701,4.98,1.05,275.977,58.801,4.98,.08,284.061,4.202,4.98,.2,349.74,-9.611,4.98,-.02,351.21,62.283,4.98,1.68,353.488,31.325,4.98,1.38,25.681,-3.69,4.99,1.38,29,68.685,4.99,-.1,44.699,-64.071,4.99,.13,81.163,37.386,4.99,1.42,81.106,17.383,4.99,.53,88.712,55.707,4.99,.05,102.718,-34.367,4.99,1.38,105.728,-4.239,4.99,-.2,111.412,9.276,4.99,1.01,115.752,58.71,4.99,.08,123.333,-15.788,4.99,1.07,127.365,-44.725,4.99,-.16,155.742,-66.902,4.99,-.13,165.187,6.101,4.99,.16,170.707,43.483,4.99,.99,191.283,45.44,4.99,2.54,239.876,-41.744,4.99,1,240.361,29.851,4.99,-.07,244.254,-50.068,4.99,.8,283.78,-22.671,4.99,1.33,286.605,-37.063,4.99,.52,288.48,57.705,4.99,1.16,296.607,33.728,4.99,.47,301.082,-32.056,4.99,1.21,332.108,-34.044,4.99,1.48,55.562,-31.938,5,-.16,59.285,61.109,5,1.45,76.669,51.598,5,.33,76.862,18.645,5,.65,80.708,3.544,5,-.15,104.028,-14.044,5,1.18,108.343,16.159,5,1.66,137.768,-44.868,5,.23,144.303,6.836,5,1.05,160.767,69.076,5,1.38,170.803,-36.165,5,1.46,184.125,33.061,5,1.14,184.749,-55.143,5,1.59,186.747,26.826,5,.08,230.535,-47.928,5,.5,240.836,-25.865,5,1.22,242.019,17.047,5,.95,246.996,68.768,5,-.06,260.079,18.057,5,1.62,271.87,43.462,5,.91,293.645,19.773,5,-.09,297.245,19.142,5,.1,319.613,43.946,5,-.01,345.021,56.945,5,1.42,354.946,-14.222,5,.24,359.397,-64.298,5,.06,83.785,9.935,5.61,.04,281.085,39.671,6.02,.6,18.439,7.578,6.3,.49,187.82,-57.081,6.42,.16];var un=Math.PI/180;var S1=i=>(i%360+360)%360;function iu(i){return i.getTime()/864e5+24405875e-1}function su(i){let t=iu(i),e=(t-2451545)/36525;return S1(280.46061837+360.98564736629*(t-2451545)+387933e-9*e*e)}var b1=23.4392911,ru=i=>(i%360+360)%360,uo=xi.length/4;function A1(i,t,e=b1){let n=i*un,s=t*un,r=e*un,a=Math.atan2(Math.sin(n)*Math.cos(r)+Math.tan(s)*Math.sin(r),Math.cos(n)),o=Math.asin(Math.sin(s)*Math.cos(r)-Math.cos(s)*Math.sin(r)*Math.sin(n));return{lon:ru(a/un),lat:o/un}}var Wl=(()=>{let i=new Float64Array(uo*2);for(let t=0;t<uo;t++){let e=A1(xi[t*4],xi[t*4+1]);i[t*2]=e.lon,i[t*2+1]=e.lat}return i})();function au(i,t,e,n,s=su(e)+n.lon){let r=(s-i)*un,a=n.lat*un,o=t*un,c=Math.asin(Math.sin(a)*Math.sin(o)+Math.cos(a)*Math.cos(o)*Math.cos(r)),l=Math.atan2(Math.sin(r),Math.cos(r)*Math.sin(a)-Math.tan(o)*Math.cos(a))/un+180;return{alt:c/un,az:ru(l)}}var si=[217.429,-62.6795,771.64,2.6,10.76,1.81,219.9021,-60.834,747.17,.61,.14,.71,269.4521,4.6934,548.31,1.51,9.49,1.57,165.8341,35.9699,392.64,.67,7.51,1.5,101.2872,-16.7161,379.21,1.58,-1.09,.01,282.4557,-23.8362,336.72,2.03,10.41,1.51,53.2327,-9.4583,310.94,.16,3.87,.88,346.4668,-35.8531,305.26,.7,7.42,1.48,176.935,.8046,298.04,2.3,11.07,1.75,280.6957,59.6268,289.48,3.21,10,1.56,316.7248,38.7494,286.82,6.78,5.37,1.07,316.7303,38.7421,285.88,.54,6.15,1.31,114.8255,5.225,284.56,1.26,.46,.43,280.6945,59.6304,280.18,2.18,8.92,1.5,4.5954,44.023,278.76,.77,8.15,1.56,330.8402,-56.786,276.06,.28,4.83,1.06,26.017,-15.9375,273.96,.17,3.63,.73,18.1277,-16.999,271.01,8.36,11.96,1.85,253.6339,-62.3997,270.53,43.44,11.96,1.73,111.8521,5.2258,262.98,1.39,9.81,1.57,77.9191,-45.0184,255.66,.91,8.93,1.54,319.3136,-38.8674,253.41,.8,6.75,1.4,336.9978,57.6959,249.94,1.87,9.57,1.61,222.3859,-26.1056,247.89,44.85,11.81,1.48,97.3475,-2.814,242.32,3.12,10.98,1.69,253.6354,-62.4033,241.17,33.78,11.87,0,12.2913,5.3886,234.6,5.9,12.56,.55,247.5752,-12.6626,232.98,1.6,10.03,1.6,1.3518,-37.3574,230.42,.9,8.62,1.46,264.1079,68.3391,220.84,.94,9.15,1.5,262.1664,-46.8952,220.24,1.42,9.4,1.55,176.4288,-64.8415,217.01,2.4,11.59,.2,195.8695,25.797,216.62,56.53,8.86,.46,222.3823,-26.1118,214.67,43.88,12.31,1.52,343.3197,-14.2637,213.28,2.12,10.15,1.6,346.6623,-14.8723,208.16,34.01,12.38,0,166.3691,43.5268,206.27,1,8.8,1.49,152.8423,49.4542,205.21,.54,6.67,1.33,323.3916,-49.009,201.87,1.01,8.7,1.52,63.818,-7.6529,200.62,.23,4.56,.82,3.8671,-16.1338,200.53,9.41,11.43,1.75,264.2653,-44.3192,196.9,2.15,10.9,1.66,271.3637,2.5001,196.72,.83,4.15,.86,341.7072,44.334,195.22,1.87,10.22,1.54,297.6958,8.8683,194.95,.57,.83,.22,207.7616,23.7767,187.76,66.41,13.21,0,175.7991,-39.4323,187.2,37.48,9.77,0,176.9224,78.6912,186.86,1.7,10.78,1.57,206.4324,14.8915,185.49,1.1,8.5,1.44,181.2033,-62.0024,181.26,44.81,7.81,.63,67.798,58.9771,179.27,3.23,10.79,1.17,103.704,33.2682,179.01,1.6,10.01,1.58,256.3373,-33.7676,178.08,46.98,10.54,.61,82.8641,-3.6772,176.77,1.18,8.01,1.47,313.1376,-16.9747,175.03,3.4,11.37,1.65,92.6442,-21.8646,173.81,.99,8.2,1.49,293.09,69.6612,173.77,.18,4.81,.79,138.595,52.6866,172.08,6.31,7.78,1.41,85.5386,12.4893,171.55,3.99,11.46,1.68,266.6426,-57.319,171.48,2.31,10.76,1.66,224.3667,-21.4155,171.22,.94,5.88,1.02,289.2302,5.1689,170.36,1,9.13,1.46,224.3606,-21.4115,168.77,21.54,8.18,1.52,233.0539,-41.2756,168.66,1.3,9.32,1.52,258.8374,-26.6028,168.54,.54,4.46,.85,12.2762,57.8152,167.98,.48,3.58,.59,116.1674,3.5525,167.88,2.31,11.2,1.6,259.0557,-26.5461,167.49,.6,6.44,1.14,258.033,45.6659,167.29,5.02,9.38,1.49,357.3022,2.4012,167.29,1.23,9.05,1.46,302.7997,-36.1012,166.25,.27,5.44,.87,49.9819,-43.0698,165.47,.19,4.39,.71,218.57,-12.5196,164.99,3.29,11.26,1.63,302.1817,-66.1821,163.71,.17,3.69,.75,348.3207,57.1684,152.76,.29,5.7,1,222.8474,19.1005,148.98,.48,4.68,.72,39.0204,6.8869,139.27,.45,5.95,.92,12.0957,5.2806,134.14,.51,5.88,.89,6.4378,-77.2542,134.07,.11,2.93,.62,25.624,20.2685,132.76,.5,5.39,.84,17.0683,54.9203,132.38,.82,5.29,.7,279.2347,38.7837,130.23,.36,.09,0,344.4127,-29.6222,129.81,.47,1.18,.14,24.9481,-56.1964,127.84,2.19,5.9,.88,275.2641,72.7328,124.11,.87,3.67,.49,72.46,6.9613,123.94,.17,3.29,.48,266.6147,27.7207,120.33,.16,3.56,.75,188.4356,41.3575,118.49,.2,4.37,.59,199.6013,-18.3112,116.89,.22,4.87,.71,5.0178,-64.8748,116.46,.16,4.34,.58,88.5958,20.2762,115.43,.27,4.52,.59,259.766,-46.6362,113.61,.69,5.61,.76,303.8225,-27.033,112.22,.3,5.88,.88,86.1158,-22.4484,112.02,.18,3.7,.48,55.8121,-9.7634,110.61,.22,3.68,.92,197.9683,27.8782,109.54,.17,4.36,.57,49.8404,3.3702,109.41,.27,4.98,.68,176.6295,-40.5004,108.45,.22,5.02,.66,321.6109,-65.3662,107.97,.19,4.33,.49,175.2626,34.2016,104.04,.26,5.45,.72,249.0894,-2.3246,102.55,.4,5.91,.83,26.9368,63.8525,99.33,.53,5.77,.8,92.5603,-74.753,98.06,.14,5.22,.71,116.329,28.0262,96.54,.27,1.29,.99,47.2667,49.6133,94.87,.23,4.18,.59,250.3215,31.6027,93.32,.47,2.93,.65,34.2635,34.2242,92.73,.39,4.98,.61,177.6738,1.7647,91.5,.22,3.71,.52,177.2649,14.5721,90.91,.52,2.16,.09,41.0499,49.2284,89.87,.22,4.21,.51,239.1133,15.6616,88.86,.18,3.95,.48,213.9153,19.1824,88.83,.54,.11,1.24,143.9146,35.8101,87.96,.32,5.54,.77,208.6712,18.3977,87.75,1.24,2.8,.58,76.3777,-57.4727,85.87,.18,4.82,.53,190.4152,-1.4494,85.58,.6,2.82,.37,331.7528,25.3451,85.28,.63,3.87,.43,326.7602,-16.1273,84.27,.19,2.94,.18,49.4423,-62.5753,83.28,.2,5.64,.64,49.5534,-62.5064,83.11,.19,5.35,.6,247.1173,-70.0844,82.53,.52,5.02,.56,236.6109,7.3531,82.48,.32,4.54,.6,.5423,27.0823,82.17,2.23,5.87,.69,238.7857,-63.4307,80.79,.16,2.91,.32,225.9471,47.6541,79.95,1.56,4.88,.65,79.7853,40.0991,79.17,.28,4.82,.63,25.4464,42.6134,78.5,.54,5.08,.62,180.1852,-10.446,78.35,.31,5.69,.76,246.0054,-39.193,78.26,.37,5.5,.63,157.6566,55.9805,78.25,.28,4.94,.54,279.7225,-21.0519,76.43,.47,5.98,.67,79.1723,45.998,76.2,.46,.24,.8,71.9012,-16.9345,75.32,.36,5.62,.63,143.2143,51.6773,74.19,.14,3.28,.47,24.1993,41.4055,74.12,.19,4.21,.54,298.8283,6.4068,73,.2,3.87,.85,354.9877,5.6263,72.92,.15,4.24,.51,334.5651,-53.6271,72.54,.36,5.5,.61,243.9053,-8.3694,71.94,.37,5.63,.65,54.2183,.4017,71.62,.54,4.41,.57,164.8666,40.4303,71.11,.25,5.16,.62,354.8369,77.6323,70.91,.4,3.38,1.03,263.7483,61.8746,70.47,.37,5.35,.6,41.2758,-18.5726,70.32,1.83,4.57,.48,48.0189,-28.9876,70.24,.45,3.98,.54,311.3224,61.8388,70.1,.11,3.57,.91,260.1649,32.4677,69.8,.25,5.51,.62,129.7988,65.0209,69.66,.37,5.76,.62,81.1061,17.3835,69.51,.38,5.11,.54,134.8019,48.0418,68.92,.16,3.19,.22,216.2992,51.8507,68.82,.14,4.15,.5,236.0076,2.5152,68.22,.66,6,.68,311.5239,-25.2709,68.13,.27,4.23,.43,230.4506,-48.3176,67.51,.39,5.78,.64,284.2567,32.9013,67.24,.37,5.33,.59,89.1012,-14.1677,67.21,.25,3.79,.34,263.7336,12.56,67.13,1.06,2.13,.15,182.1034,-24.7289,66.95,.15,4.1,.33,145.5601,-23.9156,66.61,.21,5.04,.53,319.6449,62.5856,66.5,.11,2.51,.26,150.2527,31.9237,66.46,.32,5.51,.68,18.7963,-45.5317,66.16,.24,5.09,.57,11.44,-47.552,65.97,.39,5.93,.64,291.2425,11.9444,65.89,.26,5.31,.76,116.3959,-34.1724,65.75,.51,5.48,.59,254.007,65.1348,65.54,.33,4.98,.48,9.3363,-24.7673,64.93,1.85,5.71,.71,76.8625,18.6451,64.79,.33,5.04,.66,266.0363,-51.8341,64.47,.31,5.26,.69,291.3746,3.1148,64.41,1,3.44,.32,113.6495,31.8883,64.12,3.75,1.58,.03,344.3666,20.7688,64.07,.38,5.59,.67,206.8156,17.4569,64.03,.19,4.59,.51,271.7564,30.5621,63.93,.34,5.16,.53,12.5316,-10.6443,63.48,.35,5.28,.51,218.6701,29.7451,63.16,.25,4.55,.36,300.9059,29.8968,63.06,.34,5.88,.75,238.1689,42.4515,62.92,.21,4.72,.56,327.0656,-47.3036,62.52,.35,5.7,.6,135.1599,41.7829,62.23,.68,4.06,.46,119.4455,-60.3031,61.71,.21,5.71,.57,156.0988,-74.0316,61.64,.12,4.08,.37,341.6733,12.1729,61.36,.19,4.31,.5,262.5992,-1.0629,61.19,.68,5.45,.71,117.9429,-13.898,60.59,.59,5.28,.6,105.9888,-43.608,60.55,1.04,5.7,.62,220.6267,-64.9751,60.35,.14,3.25,.26,101.6847,43.5774,59.82,.3,5.37,.57,2.2945,59.1498,59.58,.38,2.36,.38,108.9589,47.24,59.2,.33,5.67,.58,40.6394,-50.8003,58.25,.22,5.52,.56,240.2611,33.3035,58.02,.28,5.52,.61,103.8278,25.3757,58,.41,5.88,.57,286.6046,-37.0634,57.79,.75,4.31,.52,142.2871,-2.769,57.69,2.14,4.7,.41,260.2516,-21.1129,57.62,.26,4.47,.39,25.6221,-53.7408,57.36,.25,5.64,.55,235.2974,-44.6612,57.35,.16,4.74,.41,199.1938,9.4242,56.95,.26,5.31,.58,272.609,-62.0022,56.78,.52,5.59,.59,56.712,-23.2497,56.73,.19,4.32,.43,265.8575,-21.6832,56.65,.24,4.97,.47,301.0259,17.0702,56.28,.35,5.92,.6,197.497,17.5295,56.1,.89,4.43,.46,28.9895,-51.6089,56.02,.38,3.85,.84,230.8013,30.2878,55.98,.78,5.11,.58,101.559,79.5648,55.95,.27,5.55,.53,168.5271,20.5237,55.82,.25,2.59,.13,118.0653,-34.7054,55.73,.34,5.11,.47,28.66,20.808,55.6,.58,2.7,.17,202.1075,13.7788,55.6,.24,5.1,.71,101.3224,12.8956,55.56,.19,3.44,.44,200.1492,-36.7123,55.49,.17,2.77,.07,211.6706,-36.37,55.45,.2,2.22,1.01,214.7537,-25.8154,55.45,.82,5.97,.52,112.278,31.7845,55.41,.24,4.25,.32,222.5659,23.9118,55.03,.34,5.99,.58,198.5631,-59.1032,54.95,.3,5.01,.49,64.121,-59.3022,54.83,.15,4.6,1.08,125.0161,27.2177,54.73,.32,5.23,.49,220.7651,-5.6582,54.73,.2,3.96,.39,332.5366,-32.5484,54.71,.28,5.04,.49,188.0176,-16.196,54.7,.17,4.39,.39,84.2912,-80.4691,54.6,.21,5.79,.6,294.1106,50.2211,54.54,.15,4.58,.4,147.1474,46.021,54.44,.28,5.21,.62,318.6201,10.007,54.09,.66,4.59,.53,110.0307,21.9823,53.94,.66,3.6,.37,275.3275,-2.8988,53.93,.18,3.4,.94,13.2675,61.124,53.35,.33,4.91,.54,2.8161,-15.468,53.34,.64,5,.49,142.675,-40.4667,53.15,.37,3.66,.37,60.6531,-.2689,53.1,.32,5.49,.52,297.7568,10.4157,52.11,.29,5.24,.56,281.4155,20.5463,52.06,.25,4.3,.48,94.1109,12.2722,51.95,.27,5.14,.43,94.3172,5.1001,51.95,.4,5.83,.61,129.7829,-22.6619,51.55,.63,5.19,.72,206.4219,-33.0437,51.54,.19,4.32,.39,28.2704,29.5788,51.5,.23,3.52,.49,86.8212,-51.0665,51.44,.12,3.91,.17,121.886,-24.3043,51.33,.15,2.92,.46,252.5409,-34.2932,51.19,.22,2.45,1.14,226.8253,24.8692,51.14,.31,5.03,.43,124.6315,-76.9197,51.12,.12,4.15,.41,138.5856,61.4233,51.1,.32,5.31,.6,99.171,-19.2559,50.63,.23,4.12,1.04,181.7204,-64.6137,50.62,.12,4.22,.35,317.3435,-73.173,50.59,1.52,5.79,.59,122.2528,-61.3024,50.05,2.65,4.84,.44,70.1405,-41.8638,49.59,.14,4.53,.34,31.7934,23.4624,49.56,.25,2.17,1.15,336.6428,-16.7421,49.5,1.23,5.69,.62,112.4832,49.6725,49.41,.36,5.46,.47,318.6979,38.0453,49.16,.4,3.82,.39,137.5981,67.134,49.07,.37,4.89,.49,68.9802,16.5093,48.94,.77,1,1.54,64.0066,-51.4867,48.87,.36,4.33,.31,349.1763,53.2135,48.77,.26,5.7,.56,349.2404,-62.0012,48.69,.33,5.76,.52,336.235,-57.7974,48.63,.34,5.45,.67,198.0133,-37.803,48.38,.29,4.98,.69,93.712,19.1564,48.04,.34,5.3,.43,80.6397,79.2312,47.88,.21,5.19,.51,18.9423,-68.8759,47.72,.41,4.96,.48,62.1526,38.0397,47.63,.26,5.63,.52,134.6831,-16.1327,47.54,.31,5.92,.52,240.4723,58.5653,47.54,.12,4.12,.53,243.6702,33.8586,47.44,1.22,5.36,.6,349.7778,-13.4586,47.35,2.47,5.25,.79,325.3694,-77.39,47.17,1.93,3.9,1.01,296.6067,33.7276,47.1,.26,5.11,.48,300.0844,-33.7035,47.06,.41,5.76,.5,8.812,-3.5928,47.05,.67,5.32,.57,2.9334,-35.1331,47,.27,5.34,.46,154.934,19.4709,46.8,.24,4.89,.45,108.1401,-46.7593,46.67,.15,4.56,.32,265.0993,-49.4156,46.62,.33,4.85,.41,39.891,-11.8721,46.55,2.53,4.93,.45,157.7694,82.5586,46.51,1.39,5.35,.4,237.704,4.4777,46.3,.19,3.75,.15,86.7389,-14.8219,46.28,.16,3.58,.1,52.3445,-62.9375,46.12,.13,4.8,.41,40.0518,-9.4529,45.96,.41,5.9,.52,157.8409,-53.7155,45.85,.19,5,.5,35.6356,-23.8163,45.53,.82,5.32,.61,314.1972,-26.2964,45.52,.38,5.81,.51,29.6925,-61.5699,45.43,.44,2.93,.29,299.9473,-9.9583,45.04,.99,6,.6,214.0036,-6.0005,44.97,.19,4.19,.51,326.0357,28.7426,44.97,.43,4.6,.51,311.5528,33.9703,44.86,.12,2.64,1.02,122.6659,-13.7992,44.68,.3,5.64,.49,258.0383,-43.2392,44.39,.16,3.41,.44,48.1935,-1.1961,44.29,.28,5.19,.57,40.3083,-.6957,44.27,.84,5.84,.51,236.067,6.4256,44.1,.19,2.8,1.17,338.6735,-20.7082,44.09,.26,5.31,.45,203.6733,-.5958,44.03,.19,3.41,.11,154.3106,23.1062,43.85,.36,5.92,.5,265.4848,72.1488,43.79,.45,4.67,.43,273.4743,64.3973,43.63,.17,5.09,.44,222.6716,-15.9972,43.52,.43,5.24,.4,233.672,26.7147,43.46,.28,2.22,.03,258.758,24.8392,43.41,.15,3.15,.08,349.3574,-58.2357,43.37,.63,4.09,.41,265.4921,72.1569,43.36,.51,5.87,.53,264.2379,68.758,43.17,.17,4.87,.43,27.3963,-10.6864,43.13,.26,4.74,.33,222.7196,-16.0418,43.03,.19,2.79,.15,121.9411,21.5818,42.94,.3,5.42,.64,18.6002,-7.9228,42.76,.3,5.24,.45,12.2446,16.9406,42.64,.27,5.18,.5,270.1209,-3.6903,42.46,.34,4.71,.39,170.9811,10.5295,42.24,.83,4.03,.42,6.5508,-43.6798,42,.15,3.99,.17,142.8821,63.0619,41.99,.16,3.73,.36,301.5907,35.9725,41.76,.3,5.54,.85,276.9927,-25.4217,41.72,.16,2.98,1.02,192.1644,60.3198,41.59,2.69,5.94,.47,133.7991,-54.9658,41.4,.22,5.81,.48,311.0097,-51.921,41.37,.25,4.58,.28,40.5621,40.1939,41.34,.43,5.02,.58,152.093,11.9672,41.13,.35,1.32,-.09,34.506,1.7578,41.06,.49,5.72,.59,308.0987,-9.8534,40.98,.33,5.8,.69,40.8252,3.2358,40.97,.63,3.5,.09,165.4603,56.3824,40.9,.16,2.35,.03,288.0209,49.8558,40.9,.58,5.98,.67,348.1375,49.4062,40.67,.22,4.61,.3,310.011,-60.5489,40.55,.27,5.23,.54,115.7379,-45.1731,40.53,.6,5.19,.77,183.8565,57.0326,40.51,.15,3.34,.08,131.1759,-54.7088,40.49,.39,1.95,.04,89.8822,44.9474,40.21,.23,1.9,.08,201.3064,54.988,39.91,.13,4.05,.17,159.1349,-12.2301,39.88,.37,5.82,.53,123.053,17.6478,39.87,.82,4.78,.53,265.8681,4.5673,39.85,.17,2.93,1.17,224.096,49.6285,39.83,.26,5.75,.53,293.5825,51.2366,39.82,.2,5.83,.47,21.5636,19.1723,39.66,.25,5.44,.4,171.2205,-17.684,39.62,.2,4.13,.22,102.4776,-46.6146,39.59,.18,5.24,.46,113.5133,-22.2961,39.53,.27,4.55,.52,193.5073,55.9598,39.51,.2,1.75,-.02,180.9149,-42.4341,39.49,.28,5.24,.42,228.6598,67.3467,39.46,.17,5.27,.55,229.8283,1.7654,39.4,.29,5.16,.54,195.1821,56.3663,39.3,.38,5.01,.37,77.1821,-4.4562,39.28,.27,5.21,.46,286.3525,13.8635,39.28,.16,2.99,.01,8.616,-52.3731,39.24,.34,5.68,.47,261.5926,-24.1753,39.22,.24,4.23,.28,178.4577,53.6948,39.21,.4,2.43,.04,103.661,13.1778,39.02,1.56,4.73,.32,282.8956,52.9751,38.96,.19,5.66,.84,1.5799,-49.0752,38.89,.37,5.82,.52,41.2356,10.1141,38.8,.32,4.34,.31,39.2442,-34.578,38.79,.4,5.91,.65,6.571,-42.306,38.5,.73,2.55,1.08,298.9598,-26.2995,38.48,2.66,4.83,.75,75.7029,-49.1514,38.35,.18,5.47,.42,214.8178,13.0043,38.32,.28,5.49,.39,251.3242,56.7818,38.3,.55,4.93,.38,333.7591,57.0436,38.17,.97,4.26,.28,88.5252,-63.0896,38.1,.58,4.8,1.02,76.6693,51.5977,38.04,.34,5.06,.34,173.0684,-29.261,38.03,1.39,5.05,.54,200.9814,54.9254,38.01,1.71,2.25,.06,244.9798,39.7086,37.91,.21,5.57,.41,354.391,46.4581,37.87,.21,3.97,.98,72.1516,-5.674,37.85,.35,5.9,.63,134.8508,-59.0837,37.85,.22,5.26,.42,158.7904,57.0826,37.7,.35,5.24,.35,218.0195,38.3083,37.58,.14,3.1,.19,126.1459,-3.7512,37.57,.33,5.71,.48,328.324,-13.5518,37.57,.67,5.17,.38,187.4661,-16.5154,37.55,.16,2.94,-.01,271.8374,9.5638,37.55,.21,3.76,.16,38.0218,-15.2447,37.46,.25,4.84,.45,43.9872,61.5211,37.44,.31,5.69,.45,87.74,-35.7683,37.41,.12,3.28,1.15,174.6667,-13.2019,37.41,.3,5.6,.52,11.185,-22.0061,37.39,.22,5.3,.35,159.3256,-48.2256,37.26,.36,3.91,.3,224.2958,-4.3465,37.17,.32,4.55,.32,285.653,-29.8801,36.98,.87,2.62,.06,257.5945,-15.7249,36.91,.8,2.44,.06,323.7127,-20.0843,36.9,.4,5.79,.42,187.7915,-57.1132,36.83,.18,1.63,1.6,45.5979,-23.6245,36.8,.18,4.13,.16,171.4298,-63.9725,36.74,.2,5.28,.49,173.5915,3.0602,36.73,.36,5.86,.48,255.7863,-53.237,36.73,.63,5.38,.5,112.3568,-7.5512,36.71,2.4,5.97,.49,245.5181,1.029,36.67,.33,4.9,.34,343.1003,9.8357,36.66,.29,5.26,.49,311.338,57.5797,36.64,.48,4.63,.54,287.2912,76.5605,36.63,.19,5.19,.31,76.9624,-5.0864,36.5,.42,2.83,.16,256.3339,54.47,36.45,.46,5.02,.47,328.1247,28.7935,36.43,.32,5.62,.43,47.0422,40.9556,36.27,1.4,2.1,0,61.7519,29.0013,36.23,.35,5.3,.36,303.1078,-12.6175,36.1,.41,5.95,.48,152.5245,-12.8159,36.05,.65,5.38,.37,308.8952,-60.5818,35.98,.25,4.83,.29,27.1732,32.6902,35.9,.34,5.91,.57,195.5678,-71.5489,35.88,.44,3.77,1.19,297.6949,-10.7635,35.88,.35,5.47,.4,173.0864,61.0825,35.73,.54,5.57,.52,315.0895,-51.2653,35.7,.43,5.87,.48,254.4171,9.375,35.66,.2,3.36,1.16,26.4115,-25.0526,35.57,.52,5.38,.4,149.4211,41.0556,35.53,.71,5.21,.48,337.2079,-.0199,35.5,1.26,3.75,.41,195.9421,-20.5835,35.45,.92,5.69,.55,245.9979,61.5142,35.42,.09,2.87,.91,151.8573,35.2447,35.41,.18,4.54,.19,332.5499,6.1979,35.34,.85,3.55,.09,188.6766,-44.673,35.31,.33,5.9,.68,281.3621,-64.8713,35.03,.19,4.84,.2,116.9863,-12.1927,34.97,.48,5.58,.48,21.9141,45.4067,34.94,.31,4.92,.42,124.6388,-36.6593,34.93,.18,4.5,.22,70.5145,-37.1443,34.88,.42,5.13,.39,336.1537,-72.2554,34.84,.26,5.4,.66,137.2177,51.6046,34.7,.24,4.54,.29,33.2004,21.211,34.64,.33,5.33,.46,281.7553,18.1815,34.61,.46,4.39,.15,233.5446,-10.0645,34.57,.22,4.77,1,359.8721,33.7239,34.57,.51,5.92,.54,64.3153,20.5786,34.55,.38,5,.26,22.8073,70.2646,34.51,.37,5.93,.49,166.2543,7.336,34.49,.2,4.7,.33,214.0414,51.3672,34.4,.19,4.81,.24,163.3279,34.2149,34.38,.21,3.95,1.04,163.3736,-58.8532,34.33,.13,3.94,.94,253.2419,31.7017,34.26,.21,5.42,.32,193.869,65.4385,34.14,.22,5.31,.3,345.8742,-34.7494,33.99,.73,5.2,.3,69.4006,-2.4735,33.98,.34,5.29,.28,23.4285,-7.0253,33.88,.26,5.89,.64,10.8974,-17.9866,33.86,.16,2.21,1.02,103.906,-20.1365,33.8,.24,4.75,.37,330.9477,64.628,33.79,1.06,4.35,.38,102.0477,-61.9414,33.78,1.78,3.31,.23,35.5064,-10.7775,33.72,.29,5.52,.36,102.7076,-.5409,33.69,.42,5.87,.4,271.452,-30.4241,33.67,.18,3.14,.98,48.9903,-77.3885,33.66,.24,5.61,.44,244.3762,75.7553,33.63,.17,5.04,.39,2.0969,29.0904,33.62,.35,2.04,-.04,56.0499,-64.8069,33.49,.53,4,1.13,288.1388,67.6615,33.48,.1,3.23,.99,201.1385,-5.164,33.37,.66,5.86,.41,261.6578,-5.0866,33.25,.25,4.62,.39,309.7824,10.0862,33.2,.28,5.21,.7,309.3918,-47.2915,33.17,.18,3.27,1,284.6807,-37.1074,33.13,.33,4.92,.4,263.044,55.1842,33.06,.15,4.96,.25,307.2151,-17.8137,33.04,.46,4.85,.39,221.5003,-25.4432,33.02,.92,5.03,.32,319.9666,-53.4494,33.02,.49,4.45,.19,214.0959,46.0883,32.94,.16,4.21,.09,141.9449,-6.0712,32.88,.77,5.5,.64,21.454,60.2353,32.81,.14,2.71,.16,263.0668,55.173,32.8,.18,4.94,.28,237.808,35.6574,32.79,.21,4.96,1,229.3785,-58.8012,32.73,.19,4.1,.09,294.3934,-14.3018,32.72,.28,5.57,.5,332.0583,-46.961,32.29,.21,1.7,-.07,206.8852,49.3133,31.38,.24,1.8,-.1,99.428,16.3993,29.84,2.23,1.93,0,195.5442,10.9592,29.76,.14,3,.93,138.2999,-69.7172,28.82,.11,1.66,.07,194.0069,38.3184,28.41,.9,2.85,-.12,161.6924,-49.4203,27.84,.38,2.83,.9,165.932,61.751,26.54,.48,1.95,1.06,154.9931,19.8415,25.07,.52,2.17,1.13,190.3793,-48.9599,25.06,.28,2.15,-.02,222.6764,74.1555,24.91,.12,2.2,1.47,346.1902,15.2053,24.46,.19,2.48,0,81.573,28.6075,24.36,.34,1.62,-.13,247.555,21.4896,23.44,.58,2.94,.95,24.4285,-57.2368,23.39,.57,.42,-.16,276.043,-34.3846,22.76,.24,1.8,-.03,188.5968,-23.3968,22.39,.18,2.81,.89,183.9515,-17.5419,21.23,.2,2.55,-.11,269.1515,51.4889,21.14,.1,2.36,1.52,82.0613,-20.7594,20.34,.18,2.97,.81,44.5653,-40.3047,20.23,.55,2.94,.13,111.7877,8.2893,20.17,.2,2.85,-.1,296.2437,45.1308,19.77,.48,2.87,0,89.9303,37.2126,19.7,.16,2.61,-.08,243.5864,-3.6943,19.06,.16,2.83,1.58,340.6669,-46.8846,18.43,.42,2.07,1.61,306.4119,-56.7351,18.24,.52,1.86,-.12,141.8968,-8.6586,18.09,.18,2.13,1.44,229.7274,-68.6795,17.74,.12,2.88,.01,229.2517,-9.3829,17.62,.16,2.57,-.07,345.9436,28.0828,16.64,.15,2.49,1.66,17.433,35.6206,16.52,.56,2.17,1.58,221.2467,27.0742,16.1,.66,2.52,.97,328.4822,-37.3649,15.45,.67,2.98,-.08,283.8164,-26.2967,14.32,.29,2.01,-.13,10.1268,56.5373,14.29,.15,2.41,1.17,95.7401,22.5136,14.08,.71,2.91,1.62,45.5699,4.0897,13.09,.44,2.62,1.63,201.2982,-11.1613,13.06,.7,.89,-.23,81.2828,6.3497,12.92,.52,1.55,-.22,84.9123,-34.0741,12.48,.36,2.61,-.12,262.9604,-49.8761,12.2,.85,2.79,-.14,191.9303,-59.6888,11.71,.98,1.15,-.24,264.3297,-42.9978,10.86,1.49,1.93,.41,218.8768,-42.1578,10.67,.21,2.27,-.16,95.988,-52.6957,10.55,.56,-.55,.16,189.2959,-69.1356,10.34,.11,2.61,-.18,186.6496,-63.0991,10.13,.5,.67,-.24,191.57,-68.1081,9.55,.41,2.98,-.18,183.7863,-58.7489,9.45,.15,2.71,-.19,275.2485,-29.8281,9.38,.18,2.87,1.38,258.6619,14.3903,9.07,1.32,2.91,1.16,95.0783,-30.0634,9,.13,2.95,-.16,249.2897,-10.5671,8.91,.2,2.57,.04,262.6082,52.3014,8.58,.1,2.95,.95,208.8849,-47.2884,8.54,.13,2.44,-.18,224.633,-43.134,8.52,.18,2.6,-.18,252.1662,-69.0277,8.35,.15,2.07,1.45,3.309,15.1836,8.33,.53,2.75,-.19,210.9559,-60.373,8.32,.5,.54,-.23,30.9748,42.3297,8.3,1.04,2.24,1.37,296.5649,10.6133,8.26,.17,2.87,1.51,56.8712,24.1051,8.09,.42,2.85,-.09,241.3593,-19.8055,8.07,.78,2.59,-.07,104.6565,-28.9721,8.05,.14,1.42,-.21,182.0896,-50.7224,7.86,.47,2.52,-.13,233.7852,-41.1668,7.75,.5,2.7,-.22,204.9719,-53.4664,7.63,.48,2.21,-.17,37.9546,89.2641,7.54,.11,2.11,.64,84.4112,21.1425,7.33,.82,2.92,-.15,160.7392,-64.3945,7.16,.21,2.65,-.22,220.4823,-47.3882,7.02,.17,2.23,-.15,248.9706,-28.216,6.88,.53,2.74,-.21,265.622,-39.03,6.75,.17,2.32,-.17,240.0834,-22.6217,6.64,.89,2.26,-.12,95.6749,-17.9559,6.62,.22,1.89,-.24,74.2484,33.1661,6.61,.38,2.83,1.49,88.7929,7.4071,6.55,.83,.5,1.5,252.9676,-38.0474,6.51,.91,2.92,-.2,51.0807,49.8612,6.44,.17,1.9,.48,287.441,-21.0236,6.4,.43,2.97,.38,55.7313,47.7875,6.32,.47,2.97,-.13,136.999,-43.4326,5.99,.11,2.34,1.67,14.1772,60.7167,5.94,.12,2.14,-.05,247.3519,-26.432,5.89,1,.98,1.86,263.4022,-37.1038,5.71,.75,1.52,-.23,140.5284,-55.0107,5.7,.3,2.41,-.14,262.691,-37.2958,5.66,.18,2.6,-.18,239.713,-26.1141,5.57,.64,2.83,-.18,125.6285,-59.5095,5.39,.42,2,1.2,59.4635,40.0102,5.11,.23,2.83,-.2,261.325,-55.5299,5.05,.64,2.99,1.48,86.9391,-9.6696,5.04,.22,2.01,-.17,326.0465,9.875,4.73,.17,2.55,1.52,83.0017,-.2991,4.71,.58,2.14,-.17,245.2971,-25.5928,4.68,.6,2.92,.3,85.1897,-1.9426,4.43,.64,1.68,-.2,58.533,31.8836,4.34,.19,2.9,.27,139.2725,-59.2752,4.26,.1,2.28,.19,109.2857,-37.0975,4.04,.33,2.83,1.62,78.6345,-8.2016,3.78,.34,.19,-.03,120.896,-40.0031,3.01,.1,2.14,-.27,122.3831,-47.3366,2.92,.3,1.7,-.14,310.358,45.2803,2.31,.32,1.3,.09,107.0979,-26.3932,2.03,.38,1.96,.67,305.5571,40.2567,1.78,.27,2.35,.67,84.0534,-1.2019,1.65,.45,1.62,-.18,111.0238,-29.3031,1.64,.4,2.42,-.08,83.1826,-17.8223,1.47,.14,2.64,.21,83.8583,-5.9099,1.4,.22,2.67,-.21];var rs={proxima:[0,"Proxima Centauri","\u6BD4\u9130\u661F"],acen:[1,"Alpha Centauri","\u5357\u9580\u4E8C"],barnard:[2,"Barnard's Star","\u5DF4\u7D0D\u5FB7\u661F"],sirius:[4,"Sirius","\u5929\u72FC\u661F"],epseri:[6,"Epsilon Eridani","\u5929\u82D1\u56DB"],"61cyg":[10,"61 Cygni","\u5929\u9D5D\u5EA7 61"],procyon:[12,"Procyon","\u5357\u6CB3\u4E09"],taucet:[16,"Tau Ceti","\u5929\u5009\u4E94"],altair:[44,"Altair","\u725B\u90CE\u661F"],vega:[81,"Vega","\u7E54\u5973\u661F"],fomalhaut:[82,"Fomalhaut","\u5317\u843D\u5E2B\u9580"],pollux:[103,"Pollux","\u5317\u6CB3\u4E09"],denebola:[108,"Denebola","\u4E94\u5E1D\u5EA7\u4E00"],arcturus:[111,"Arcturus","\u5927\u89D2\u661F"],capella:[131,"Capella","\u4E94\u8ECA\u4E8C"],castor:[170,"Castor","\u5317\u6CB3\u4E8C"],aldebaran:[256,"Aldebaran","\u7562\u5BBF\u4E94"],regulus:[323,"Regulus","\u8ED2\u8F45\u5341\u56DB"],dubhe:[479,"Dubhe","\u5929\u6A1E"],kochab:[482,"Kochab","\u5E1D\u661F"],achernar:[486,"Achernar","\u6C34\u59D4\u4E00"],alphard:[499,"Alphard","\u661F\u5BBF\u4E00"],spica:[510,"Spica","\u89D2\u5BBF\u4E00"],bellatrix:[511,"Bellatrix","\u53C3\u5BBF\u4E94"],canopus:[517,"Canopus","\u8001\u4EBA\u661F"],acrux:[519,"Acrux","\u5341\u5B57\u67B6\u4E8C"],hadar:[531,"Hadar","\u99AC\u8179\u4E00"],alcyone:[534,"Alcyone (Pleiades)","\u6634\u5BBF\u516D"],polaris:[540,"Polaris","\u5317\u6975\u661F"],betelgeuse:[549,"Betelgeuse","\u53C3\u5BBF\u56DB"],antares:[556,"Antares","\u5FC3\u5BBF\u4E8C"],rigel:[572,"Rigel","\u53C3\u5BBF\u4E03"],deneb:[575,"Deneb","\u5929\u6D25\u56DB"],alnilam:[578,"Alnilam","\u53C3\u5BBF\u4E8C"]};var P4=Math.PI/180;var T1=1495978707e-1,I4=T1/299792.458;var E1=3.26156;var er=si.length/6,Xl=Math.PI/180,fo=23.4392911*Xl,po=i=>({i,ra:si[i*6],dec:si[i*6+1],plx:si[i*6+2],e:si[i*6+3],mag:si[i*6+4],bv:si[i*6+5]}),ou=i=>1e3/i*E1;var lu=(i,t)=>i+5+5*Math.log10(t/1e3);var cu=i=>{let t=rs[i];return t?{...po(t[0]),key:i,en:t[1],zh:t[2]}:null};function hu(i,t,e=1){let n=i*Xl,s=t*Xl;return[e*Math.cos(s)*Math.cos(n),e*Math.cos(s)*Math.sin(n),e*Math.sin(s)]}var uu=([i,t,e])=>[i,t*Math.cos(fo)+e*Math.sin(fo),-t*Math.sin(fo)+e*Math.cos(fo)];var F4=Object.fromEntries(Object.entries(rs).map(([i,[t,e,n]])=>[t,{key:i,en:e,zh:n}]));function nr(i,t){let e=i*1e-9;return 1/(Math.pow(e,5)*(Math.exp(662607015e-42*299792458/(e*1380649e-29*t))-1))}var as=i=>2897771955e-3/i,vi=(i,t,e,n)=>{let s=(i-t)/(i<t?e:n);return Math.exp(-.5*s*s)};function ql(i){return[1.056*vi(i,599.8,37.9,31)+.362*vi(i,442,16,26.7)-.065*vi(i,501.1,20.4,26.2),.821*vi(i,568.8,46.9,40.5)+.286*vi(i,530.9,16.3,31.1),1.217*vi(i,437,11.8,36)+.681*vi(i,459,26,13.8)]}var w1=i=>i<=.0031308?12.92*i:1.055*Math.pow(i,1/2.4)-.055;function dn(i){let t=0,e=0,n=0;for(let l=380;l<=780;l+=5){let u=nr(l,i),[p,h,f]=ql(l);t+=u*p,e+=u*h,n+=u*f}let s=3.2406*t-1.5372*e-.4986*n,r=-.9689*t+1.8758*e+.0415*n,a=.0557*t-.204*e+1.057*n,o=Math.min(s,r,a);o<0&&(s-=o,r-=o,a-=o);let c=Math.max(s,r,a);return[s,r,a].map(l=>Math.round(255*w1(l/c)))}var Yl=i=>4600*(1/(.92*i+1.7)+1/(.92*i+.62));function mo(i){return i>=3e4?"O":i>=1e4?"B":i>=7500?"A":i>=6e3?"F":i>=5200?"G":i>=3700?"K":"M"}function Zl(i){return i<3700?{en:"orange-red",zh:"\u6A59\u7D05\u8272"}:i<5200?{en:"orange",zh:"\u6A59\u8272"}:i<6e3?{en:"yellowish white",zh:"\u9EC3\u767D\u8272"}:i<1e4?{en:"white",zh:"\u767D\u8272"}:i<3e4?{en:"blue-white",zh:"\u85CD\u767D\u8272"}:{en:"blue",zh:"\u85CD\u8272"}}function du(i){let t=as(i);return t<380?{en:"ultraviolet",zh:"\u7D2B\u5916\u7DDA"}:t>750?{en:"infrared",zh:"\u7D05\u5916\u7DDA"}:t<450?{en:"violet-blue",zh:"\u85CD\u7D2B\u5149"}:t<495?{en:"blue",zh:"\u85CD\u5149"}:t<570?{en:"green",zh:"\u7DA0\u5149"}:t<590?{en:"yellow",zh:"\u9EC3\u5149"}:t<620?{en:"orange",zh:"\u6A59\u5149"}:{en:"red",zh:"\u7D05\u5149"}}var ir={sun:5772,proxima:3e3,acen:5800,barnard:3200,sirius:9900,"61cyg":4500,procyon:6500,epseri:5100,taucet:5300,altair:7700,vega:9600,fomalhaut:8600,pollux:4700,arcturus:4300,capella:5e3,castor:10300,aldebaran:3900,regulus:12500,denebola:8500,dubhe:4700,achernar:15e3,alphard:4100,spica:25300,bellatrix:22e3,canopus:7400,acrux:24e3,hadar:25e3,polaris:6e3,betelgeuse:3600,antares:3600,rigel:12100,alnilam:27e3,deneb:8500,alcyone:12300,kochab:4100};var P1={lat:24.08,lon:120.54},$l=600,os=2e3,Jl=3e4,I1=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Dn=i=>Math.round(i).toLocaleString("en-US"),pu=i=>Dn(Math.round((i-273.15)/100)*100),L1=i=>new R(i[0],i[2],-i[1]),Kl=i=>`rgb(${i.join(",")})`;function ls(i){if(i==="sun")return{key:"sun",en:"The Sun",zh:"\u592A\u967D",T:5772};let t=cu(i);return{key:i,en:t.en,zh:t.zh,T:ir[i]}}function D1(i){let[t,e,n]=ql(i),s=3.2406*t-1.5372*e-.4986*n,r=-.9689*t+1.8758*e+.0415*n,a=.0557*t-.204*e+1.057*n;s=Math.max(0,s),r=Math.max(0,r),a=Math.max(0,a);let o=Math.max(s,r,a,1e-6),c=i<420?(i-380)/40*.7+.3:i>700?(780-i)/80*.7+.3:1;return[s,r,a].map(l=>Math.round(255*Math.pow(l/o,.8)*c))}function U1(i){let t=I=>i.querySelector(I),e=I=>i.querySelectorAll(I),n=t(".al-space"),s=t(".al-space-cv"),r=t(".al-labels"),a=t(".cl-spec-cv"),o;try{o=new ao({canvas:s,antialias:!0})}catch{i.classList.add("al-nogl")}let c=Math.min(window.devicePixelRatio||1,2),l={view:"heat",key:"betelgeuse",T:ir.betelgeuse,sorted:!1,mix:0},u,p,h={},f={};if(o){o.setPixelRatio(c),u=new Ie(45,1.6,.1,5e3),p=new ho(u,s),p.enableDamping=!0,p.dampingFactor=.08,p.enablePan=!1;let I=(Ut,w,te)=>{let Ct=new ye;return Ct.setAttribute("position",new ae(Ut,3)),Ct.setAttribute("tint",new ae(w,3)),Ct.setAttribute("size",new ae(te,1)),Ct};h.scene=new Xi,h.scene.background=new zt(197901);{let Ut=[],w=[],te=[];for(let Ct=0;Ct<uo;Ct++){let S=Wl[Ct*2]*tr,m=Wl[Ct*2+1]*tr,O=xi[Ct*4+2],V=je.clamp(.7-O*.12,.1,.7);Ut.push($l*Math.cos(m)*Math.cos(S),$l*Math.sin(m),-$l*Math.cos(m)*Math.sin(S));let X=dn(Yl(xi[Ct*4+3]));w.push(X[0]/255*V,X[1]/255*V,X[2]/255*V),te.push(je.clamp(5-O,1.2,5))}h.scene.add(new qn(I(Ut,w,te),new Me({uniforms:{dpr:{value:c}},vertexShader:`attribute vec3 tint; attribute float size; uniform float dpr; varying vec3 vC;
          void main(){ vC = tint; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * dpr; }`,fragmentShader:"varying vec3 vC; void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; float a = smoothstep(1.0, 0.15, r); a *= a; gl_FragColor = vec4(vC * a, 1.0); }",blending:In,transparent:!0,depthWrite:!1})))}let nt=()=>new Me({uniforms:{col:{value:new zt(1,1,1)},time:{value:0}},vertexShader:"varying vec3 vN; varying vec3 vP; void main(){ vN = normalize(normalMatrix * normal); vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 col; uniform float time; varying vec3 vN; varying vec3 vP;
        float h(vec3 p){ return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }
        float n(vec3 p){ vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
          return mix(mix(mix(h(i), h(i+vec3(1,0,0)), f.x), mix(h(i+vec3(0,1,0)), h(i+vec3(1,1,0)), f.x), f.y),
                     mix(mix(h(i+vec3(0,0,1)), h(i+vec3(1,0,1)), f.x), mix(h(i+vec3(0,1,1)), h(i+vec3(1,1,1)), f.x), f.y), f.z); }
        void main(){ float mu = clamp(dot(normalize(vN), vec3(0,0,1)), 0.0, 1.0);
          float g = 0.88 + 0.12 * n(vP * 6.0 + vec3(time * 0.15));
          float limb = 0.45 + 0.55 * pow(mu, 0.6);
          gl_FragColor = vec4(col * limb * g, 1.0); }`});h.star=new ze(new $i(3,64,48),nt()),h.scene.add(h.star),h.glow=new qi(new di({map:nu([[0,"rgba(255,255,255,.9)"],[.3,"rgba(255,255,255,.35)"],[1,"rgba(255,255,255,0)"]]),blending:In,depthWrite:!1,transparent:!0})),h.glow.scale.setScalar(14),h.scene.add(h.glow),h.sun=new ze(new $i(.9,48,32),nt()),h.sun.position.set(7.5,-2.2,0),h.scene.add(h.sun),h.sun.material.uniforms.col.value.setRGB(...dn(5772).map(Ut=>Ut/255));let J=new qi(new di({map:h.glow.material.map,color:new zt(...dn(5772).map(Ut=>Ut/255)),blending:In,depthWrite:!1,transparent:!0,opacity:.6}));J.scale.setScalar(4),h.sun.add(J),f.scene=new Xi,f.scene.background=new zt(197901);let rt=er+1,yt=[],Yt=[],Pt=[],Vt=[],Qt=[];f.hr=[],f.sky=[];let Ft=Ut=>26-(je.clamp(Ut,-8,16)+8)/24*52,Zt=(Ut,w)=>new R(-30+(je.clamp(Ut,-.4,2)+.4)/2.4*60,Ft(w),0);for(let Ut=0;Ut<rt;Ut++){let w,te,Ct,S;if(Ut===er)w=new R(0,0,0),S=4.83,te=Zt(.65,S),Ct=5772;else{let O=po(Ut),V=ou(O.plx),X=16*Math.log10(1+V/2);w=L1(uu(hu(O.ra,O.dec))).multiplyScalar(X),S=lu(O.mag,O.plx),te=Zt(O.bv,S),Ct=Yl(O.bv),te.z=Math.sin(Ut*12.9898)*43758.5453%1*1.2}yt.push(w.x,w.y,w.z),Yt.push(te.x,te.y,te.z),f.sky.push(w),f.hr.push(te);let m=dn(Ct);Pt.push(m[0]/255,m[1]/255,m[2]/255),Vt.push(Ut===er?9:je.clamp(6.2-.32*S,2.2,9)),Qt.push(Math.min(1,(te.x+30)/60)*.35)}let Wt=new ye;Wt.setAttribute("position",new ae(yt,3)),Wt.setAttribute("hr",new ae(Yt,3)),Wt.setAttribute("tint",new ae(Pt,3)),Wt.setAttribute("size",new ae(Vt,1)),Wt.setAttribute("delay",new ae(Qt,1)),f.pts=new qn(Wt,new Me({uniforms:{dpr:{value:c},mixv:{value:0}},vertexShader:`attribute vec3 hr; attribute vec3 tint; attribute float size; attribute float delay; uniform float dpr; uniform float mixv; varying vec3 vC;
        void main(){ float k = smoothstep(delay, delay + 0.65, mixv); vec3 p = mix(position, hr, k);
          vC = tint; gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); gl_PointSize = size * dpr; }`,fragmentShader:"varying vec3 vC; void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; float a = smoothstep(1.0, 0.2, r); gl_FragColor = vec4(vC * a, 1.0); }",blending:In,transparent:!0,depthWrite:!1})),f.pts.frustumCulled=!1,f.scene.add(f.pts);let _e=[],Kt=(Ut,w)=>[Ut,w,-.5];_e.push(...Kt(-31,-27),...Kt(31,-27),...Kt(-31,-27),...Kt(-31,27));for(let Ut of[-5,0,5,10,15])_e.push(...Kt(-31,Ft(Ut)),...Kt(-30,Ft(Ut)));f.axes=new Ds(new ye().setAttribute("position",new ae(_e,3)),new Yi({color:10465487,transparent:!0,opacity:0})),f.scene.add(f.axes),f.idx=Object.fromEntries(Object.entries(rs).map(([Ut,w])=>[Ut,w[0]])),f.idx.sun=er}let _=(I,nt)=>{let J=document.createElement("span");return J.className=`al-lab ${I}`,J.innerHTML=nt,J.style.opacity=0,r.appendChild(J),J},y=o?{star:_("cl-star",""),sun:_("sun","&#9728; Sun for comparison \xB7 \u592A\u967D\u5C0D\u7167"),hot:_("cl-ax","&larr; Hotter, bluer \xB7 \u8D8A\u71B1\u8D8A\u85CD"),cool:_("cl-ax","Cooler, redder &rarr; \xB7 \u8D8A\u51B7\u8D8A\u7D05"),up:_("cl-ax","&uarr; Brighter \xB7 \u8D8A\u4EAE"),down:_("cl-ax","&darr; Fainter \xB7 \u8D8A\u6697"),ms:_("cl-grp","Main sequence \xB7 \u4E3B\u5E8F\u661F"),giants:_("cl-grp","Giants \xB7 \u5DE8\u661F"),wd:_("cl-grp","White dwarfs \xB7 \u767D\u77EE\u661F"),names:Object.fromEntries(["sun","proxima","betelgeuse","arcturus","procyon","sirius","rigel","spica","vega","aldebaran","antares","acen","barnard"].map(I=>[I,_("cl-nm",`${ls(I).en} \xB7 ${ls(I).zh}`)]))}:null,g=new R,d=new Set,E=new Set,L=0,M=0;function b(I,nt,J=6){return g.copy(nt).project(u),g.z>1||Math.abs(g.x)>1.02||Math.abs(g.y)>1.02?!1:(I.style.opacity=1,d.add(I),I.style.transform=`translate(${(g.x*.5+.5)*L}px, ${(-g.y*.5+.5)*M+J}px) translate(-50%, 0)`,!0)}let A=I=>{let nt=je.smoothstep(l.mix,0,1);return f.sky[I].clone().lerp(f.hr[I],nt)};function C(){if(L=s.clientWidth,M=s.clientHeight,E=d,d=new Set,l.view==="heat")y.star.innerHTML=`${l.key?`${ls(l.key).en} \xB7 ${ls(l.key).zh}<br>`:""}${Dn(l.T)} K`,b(y.star,new R(0,-3.3,0),6),b(y.sun,h.sun.position.clone().add(new R(0,-1,0)),6);else{l.mix>.6&&(b(y.hot,new R(-24,-29,0),0),b(y.cool,new R(24,-29,0),0),b(y.up,new R(-33,22,0),0),b(y.down,new R(-33,-22,0),0),b(y.ms,new R(-17,-7,0),0),b(y.giants,new R(20,18,0),0),b(y.wd,new R(-14,-19,0),0));let nt=L<520;for(let[J,rt]of Object.entries(y.names))nt&&!["sun","betelgeuse","sirius","rigel","proxima",l.key].includes(J)||(rt.classList.toggle("on",J===l.key),b(rt,A(f.idx[J]),8))}for(let I of E)d.has(I)||(I.style.opacity=0)}let x={name:t(".cl-name"),temp:t(".cl-temp"),color:t(".cl-color"),cls:t(".cl-class"),peak:t(".cl-peak"),flux:t(".cl-flux")};function T(){let I=l.T,nt=Zl(I),J=du(I),rt=l.key?ls(l.key):null;x.name.innerHTML=rt?`${rt.en} \xB7 ${rt.zh}`:"Your own star \xB7 \u81EA\u5DF1\u8ABF\u7684\u661F",x.temp.innerHTML=`${Dn(I)} K<span>\u7D04\u651D\u6C0F ${pu(I)} \u5EA6</span>`,x.color.innerHTML=`${nt.en[0].toUpperCase()}${nt.en.slice(1)}<span>${nt.zh}</span>`,x.cls.innerHTML=`${mo(I)} star<span>${mo(I)} \u578B\u661F</span>`,x.peak.innerHTML=`${Dn(as(I))} nm, ${J.en}<span>${Dn(as(I))} \u5948\u7C73\uFF0C${J.zh}\u6700\u5F37</span>`;let yt=Math.pow(I/5772,4);x.flux.innerHTML=yt>=1.05?`${yt<10?yt.toFixed(1):Dn(yt)} times the Sun's<span>\u6BCF\u5E73\u65B9\u516C\u5C3A\u767C\u51FA\u7684\u5149\u662F\u592A\u967D\u7684 ${yt<10?yt.toFixed(1):Dn(yt)} \u500D</span>`:yt>.95?"The same as the Sun<span>\u548C\u592A\u967D\u4E00\u6A23</span>":`${(yt*100).toFixed(0)}% of the Sun's<span>\u6BCF\u5E73\u65B9\u516C\u5C3A\u767C\u51FA\u7684\u5149\u53EA\u6709\u592A\u967D\u7684 ${(yt*100).toFixed(0)}%</span>`}function U(){let I=a.clientWidth||300,nt=Math.round(I*.62);a.width!==Math.round(I*c)&&(a.width=Math.round(I*c),a.height=Math.round(nt*c),a.style.height=`${nt}px`);let J=a.getContext("2d");J.setTransform(c,0,0,c,0,0),J.fillStyle="#02040c",J.fillRect(0,0,I,nt);let rt=100,yt=1600,Yt=Wt=>12+(Wt-rt)/(yt-rt)*(I-24),Pt=nt-30,Vt=18;for(let Wt=380;Wt<=780;Wt+=2)J.fillStyle=Kl(D1(Wt)),J.fillRect(Yt(Wt),Pt+4,Yt(Wt+2)-Yt(Wt)+.5,8);J.fillStyle="#9fb0cf",J.font=`600 ${Math.max(9,I*.032)}px system-ui, sans-serif`,J.textAlign="center",J.fillText("UV \u7D2B\u5916\u7DDA",Yt(240),Pt+24),J.fillText("Visible \u53EF\u898B\u5149",Yt(580),Pt+24),J.fillText("Infrared \u7D05\u5916\u7DDA",Yt(1200),Pt+24);let Qt=(Wt,_e,Kt,Ut)=>{let w=0;for(let Ct=rt;Ct<=yt;Ct+=5)w=Math.max(w,nr(Ct,Wt));let te=nr(as(Wt),Wt);w=Math.max(w,te),J.beginPath();for(let Ct=rt;Ct<=yt;Ct+=5){let S=Pt-nr(Ct,Wt)/w*(Pt-Vt);Ct===rt?J.moveTo(Yt(Ct),S):J.lineTo(Yt(Ct),S)}Kt&&(J.lineTo(Yt(yt),Pt),J.lineTo(Yt(rt),Pt),J.closePath(),J.fillStyle=Kt,J.fill()),J.setLineDash(Ut?[5,4]:[]),J.strokeStyle=_e,J.lineWidth=Ut?1.4:2.2,J.stroke(),J.setLineDash([])},Ft=dn(l.T);Qt(5772,"rgba(255,241,234,.55)",null,!0),Qt(l.T,Kl(Ft),`rgba(${Ft.join(",")},.18)`,!1);let Zt=as(l.T);Zt<=yt&&(J.strokeStyle="rgba(255,211,110,.8)",J.setLineDash([2,3]),J.beginPath(),J.moveTo(Yt(Zt),Vt-4),J.lineTo(Yt(Zt),Pt),J.stroke(),J.setLineDash([])),J.fillStyle="#ffd36e",J.textAlign=Zt>1100?"right":"left",J.font=`700 ${Math.max(9,I*.034)}px system-ui, sans-serif`,J.fillText(Zt<=yt?` peak ${Dn(Zt)} nm \u6700\u5F37 `:"\u2192 peak farther in the infrared",Zt<=yt?Yt(Zt):I-12,Vt+4),J.textAlign="right",J.fillStyle="rgba(255,241,234,.8)",J.fillText("- - Sun \u592A\u967D",I-14,Vt+22),J.textAlign="left",J.strokeStyle="rgba(160,180,230,.3)",J.beginPath(),J.moveTo(12,Pt),J.lineTo(I-12,Pt),J.stroke()}function F(I,nt=null){l.T=Math.round(I),l.key=nt;let J=Math.log(I/os)/Math.log(Jl/os);if(et.value=String(J),et.style.setProperty("--p",`${J*100}%`),et.style.setProperty("--grad",`linear-gradient(90deg, ${[0,.2,.4,.6,.8,1].map(rt=>`${Kl(dn(os*Math.pow(Jl/os,rt)))} ${rt*100}%`).join(", ")})`),e(".cl-chip").forEach(rt=>rt.classList.toggle("on",rt.dataset.star===nt)),o){let rt=dn(I).map(yt=>yt/255);h.star.material.uniforms.col.value.setRGB(rt[0],rt[1],rt[2]),h.glow.material.color.setRGB(rt[0],rt[1],rt[2])}T(),U()}function k(I){F(ls(I).T,I)}let W=new R,N=new R,G=1,K=()=>l.view==="heat"?{pos:new R(2.5,1.5,17),tgt:new R(1.5,0,0)}:l.sorted?{pos:new R(0,1,u.aspect<1.1?60:76),tgt:new R(0,1,0)}:{pos:new R(30,26,62),tgt:new R(0,0,0)};function q(I){if(o){if(I){let nt=K();u.position.copy(nt.pos),p.target.copy(nt.tgt),G=1;return}W.copy(u.position),N.copy(p.target),G=0}}function it(I){let nt=I!==l.view;l.view=I,i.dataset.view=I,e(".ec-view button").forEach(J=>J.setAttribute("aria-pressed",J.dataset.view===I?"true":"false")),q(nt)}function Y(I){l.sorted=I,Tt.innerHTML=I?"Back to the sky \xB7 \u56DE\u5230\u5929\u7A7A":"Sort them by color \xB7 \u4F9D\u984F\u8272\u6392\u6392\u7AD9",Tt.setAttribute("aria-pressed",I?"true":"false"),l.view!=="sort"&&it("sort"),q(!1)}function tt(){if(o){let I=n.clientWidth,nt=n.clientHeight;if(I&&nt){o.setSize(I,nt,!1),u.aspect=I/nt;let J=(u.aspect<1.1?70:58)*tr;u.fov=Math.max(42,2*Math.atan(Math.tan(J/2)/u.aspect)/tr),u.updateProjectionMatrix()}}U()}o&&new ResizeObserver(tt).observe(n),new ResizeObserver(U).observe(a);let et=t(".cl-temp-sl"),Tt=t(".cl-sort");et.addEventListener("input",()=>{F(os*Math.pow(Jl/os,parseFloat(et.value)),null),l.view!=="heat"&&it("heat"),i.classList.remove("al-fresh")}),e(".cl-chip").forEach(I=>I.addEventListener("click",()=>{k(I.dataset.star),i.classList.remove("al-fresh")})),e(".ec-view button").forEach(I=>I.addEventListener("click",()=>it(I.dataset.view))),Tt.addEventListener("click",()=>{Y(!l.sorted),i.classList.remove("al-fresh")}),o&&t(".al-home").addEventListener("click",()=>q(!1));let vt=null;if(o){let I=new ye;I.setAttribute("position",new ae([0,0,0],3));let nt=document.createElement("canvas");nt.width=nt.height=64;let J=nt.getContext("2d");J.strokeStyle="#ffd36e",J.lineWidth=5,J.beginPath(),J.arc(32,32,26,0,eu),J.stroke();let rt=new fi(nt);vt=new qn(I,new Me({uniforms:{map:{value:rt},dpr:{value:c}},vertexShader:"uniform float dpr; void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = 26.0 * dpr; }",fragmentShader:"uniform sampler2D map; void main(){ gl_FragColor = texture2D(map, gl_PointCoord); }",transparent:!0,depthWrite:!1})),vt.frustumCulled=!1,f.scene.add(vt)}let ee=!1,Ht=0,Jt=0;function Z(I){if(Ht=0,!ee)return;let nt=Math.min(.05,(I-(Jt||I))/1e3);if(Jt=I,o){let J=l.sorted?1:0;if(l.mix!==J&&(l.mix=J>l.mix?Math.min(1,l.mix+nt/2.4):Math.max(0,l.mix-nt/2.4)),f.pts.material.uniforms.mixv.value=l.mix*1.35,f.axes.material.opacity=Math.max(0,l.mix-.5)*1.2,h.star.material.uniforms.time.value=I/1e3,h.sun.material.uniforms.time.value=I/1e3,h.star.rotation.y+=nt*.05,vt){let rt=f.idx[l.key];vt.visible=l.view==="sort"&&rt!==void 0,vt.visible&&(vt.geometry.attributes.position.array.set(A(rt).toArray()),vt.geometry.attributes.position.needsUpdate=!0)}if(G<1){G=Math.min(1,G+nt/1.4);let rt=je.smootherstep(G,0,1),yt=K();u.position.lerpVectors(W,yt.pos,rt),p.target.lerpVectors(N,yt.tgt,rt)}p.update(),C(),o.render(l.view==="heat"?h.scene:f.scene,u)}Ht=requestAnimationFrame(Z)}return new IntersectionObserver(I=>{ee=I[0].isIntersecting,ee&&!Ht&&(Jt=0,Ht=requestAnimationFrame(Z))},{rootMargin:"120px"}).observe(i),i.dataset.view="heat",tt(),k("betelgeuse"),q(!0),i.classList.add("al-ready","al-fresh"),i.__lab={camera:u,controls:p,state:l,setStar:k,setTemp:F,setView:it,setSorted:Y,goCam:q,drawSpec:U,finish:()=>{l.mix=l.sorted?1:0,q(!0)},render:()=>{o&&(f.pts.material.uniforms.mixv.value=l.mix*1.35,f.axes.material.opacity=Math.max(0,l.mix-.5)*1.2,p.update(),C(),o.render(l.view==="heat"?h.scene:f.scene,u))}},{setStar:k,setView:it}}var N1=i=>{let t=new Date(i.getTime()+288e5);return{y:t.getUTCFullYear(),m:t.getUTCMonth()+1,d:t.getUTCDate()}},O1=[["north","\u5317"],["northeast","\u6771\u5317"],["east","\u6771"],["southeast","\u6771\u5357"],["south","\u5357"],["southwest","\u897F\u5357"],["west","\u897F"],["northwest","\u897F\u5317"]];function F1(i){let t=N1(new Date),e=new Date(Date.UTC(t.y,t.m-1,t.d,21)-8*36e5),n=[];for(let[o,[c,l,u]]of Object.entries(rs)){let p=po(c);if(p.mag>2.6||!ir[o])continue;let h=au(p.ra,p.dec,e,P1);h.alt<10||n.push({k:o,en:l,zh:u,T:ir[o],alt:h.alt,az:h.az})}n.sort((o,c)=>o.T-c.T);let s=o=>Math.max(1,Math.round(o/10)),r=n.map(o=>{let c=dn(o.T),l=Zl(o.T),[u,p]=O1[Math.round(o.az/45)%8];return`<div class="tn-item cl-tn"><span class="cl-sw" style="--c:rgb(${c.join(",")})" aria-hidden="true"></span><div><h3>${o.en}<span class="zh">${o.zh}</span></h3>
      <p><b>${Dn(o.T)} K \xB7 ${mo(o.T)}</b> \xB7 ${l.en}<span class="zh">\u7D04\u651D\u6C0F ${pu(o.T)} \u5EA6\uFF0C${l.zh}</span></p>
      <p class="cl-where">Look ${u}, about ${s(o.alt)} fist${s(o.alt)>1?"s":""} up<span class="zh">\u5F80${p}\u65B9\u770B\uFF0C\u7D04 ${s(o.alt)} \u500B\u62F3\u982D\u9AD8</span></p></div></div>`}).join(""),a=n.length?`<div class="cl-bar" aria-hidden="true">${n.map(o=>`<i style="background:rgb(${dn(o.T).join(",")})" title="${o.en}"></i>`).join("")}</div>`:"";i.innerHTML=`<p class="tn-when">${I1[t.m-1]} ${t.d}, ${t.y}, 9:00 p.m. over Changhua, coolest to hottest<span>${t.y} \u5E74 ${t.m} \u6708 ${t.d} \u65E5\u665A\u4E0A 9 \u9EDE\uFF0C\u5F70\u5316\uFF0C\u7531\u51B7\u5230\u71B1</span></p>${a}
    <div class="tn-grid cl-tn-grid">${r}</div>
    <p class="tn-note">Star colors are soft, because our eyes see color poorly in the dark. Compare two stars side by side, or look through binoculars slightly out of focus. \xB7 \u661F\u661F\u7684\u984F\u8272\u5F88\u6DE1\uFF0C\u56E0\u70BA\u773C\u775B\u5728\u6697\u8655\u5206\u8FA8\u984F\u8272\u7684\u80FD\u529B\u5F88\u5DEE\uFF1B\u628A\u5169\u9846\u661F\u4E26\u6392\u6BD4\u8F03\uFF0C\u6216\u7528\u96D9\u7B52\u671B\u9060\u93E1\u7A0D\u5FAE\u5931\u7126\u4F86\u770B\uFF0C\u984F\u8272\u6703\u6BD4\u8F03\u660E\u986F\u3002</p>`,i.setAttribute("aria-busy","false")}function fu(){let i=document.querySelector("[data-color-lab]"),t=null,e=!1,n=()=>(!e&&i&&(e=!0,t=U1(i)),t);if(i){let r=new IntersectionObserver(a=>{a[0].isIntersecting&&(r.disconnect(),n())},{rootMargin:"600px"});r.observe(i)}let s=document.querySelector("[data-starcolors]");s&&F1(s),document.querySelectorAll("[data-swatch]").forEach(r=>{r.style.setProperty("--c",`rgb(${dn(+r.getAttribute("data-swatch")).join(",")})`)}),document.querySelectorAll("[data-lab-color]").forEach(r=>r.addEventListener("click",()=>{let a=n();a&&(a.setView("heat"),a.setStar(r.getAttribute("data-lab-color")),i.scrollIntoView({behavior:"smooth",block:"center"}))}))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fu):fu();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
