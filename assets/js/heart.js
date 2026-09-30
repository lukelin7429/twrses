(()=>{var jn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Qn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},jc=0,pl=1,Qc=2;var ir=1,th=2,Qi=3,ti=0,ze=1,je=2,bn=0,ts=1,sr=2,ml=3,gl=4,eh=5;var fi=100,nh=101,ih=102,sh=103,rh=104,ah=200,oh=201,lh=202,ch=203,_l=204,xl=205,hh=206,uh=207,dh=208,fh=209,ph=210,mh=211,gh=212,_h=213,xh=214,Xr=0,qr=1,Yr=2,zi=3,$r=4,Zr=5,Jr=6,Kr=7,yl=0,yh=1,vh=2,pn=0,vl=1,Sl=2,Ml=3,bl=4,Tl=5,El=6,wl=7;var Al=300,ei=301,pi=302,La=303,Da=304,rr=306,jr=1e3,vn=1001,Qr=1002,Ae=1003,Sh=1004;var ar=1005;var Pe=1006,Na=1007;var ni=1008;var Ge=1009,Cl=1010,Rl=1011,es=1012,Ua=1013,mn=1014,nn=1015,gn=1016,Fa=1017,Oa=1018,ns=1020,Pl=35902,Il=35899,Ll=1021,Dl=1022,sn=1023,Sn=1026,ii=1027,Ba=1028,za=1029,si=1030,ka=1031;var Va=1033,or=33776,lr=33777,cr=33778,hr=33779,Ga=35840,Ha=35841,Wa=35842,Xa=35843,qa=36196,Ya=37492,$a=37496,Za=37488,Ja=37489,ur=37490,Ka=37491,ja=37808,Qa=37809,to=37810,eo=37811,no=37812,io=37813,so=37814,ro=37815,ao=37816,oo=37817,lo=37818,co=37819,ho=37820,uo=37821,fo=36492,po=36494,mo=36495,go=36283,_o=36284,dr=36285,xo=36286;var ws=2300,ta=2301,Hr=2302,ol=2303,ll=2400,cl=2401,hl=2402;var Mh=3200;var yo=0,bh=1,zn="",qe="srgb",As="srgb-linear",Cs="linear",Kt="srgb";var Wr=7680;var Th=519,Eh=512,wh=513,Ah=514,vo=515,Ch=516,Rh=517,So=518,Ph=519,Nl=35044;var Ul="300 es",hn=2e3,ki=2001;function Du(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Nu(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Rs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ih(){let i=Rs("canvas");return i.style.display="block",i}var Sc={},Vi=null;function Ps(...i){let t="THREE."+i.shift();Vi?Vi("log",t,...i):console.log(t,...i)}function Lh(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function It(...i){i=Lh(i);let t="THREE."+i.shift();if(Vi)Vi("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Lt(...i){i=Lh(i);let t="THREE."+i.shift();if(Vi)Vi("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function hi(...i){let t=i.join(" ");t in Sc||(Sc[t]=!0,It(...i))}function Dh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Nh={[Xr]:qr,[Yr]:Jr,[$r]:Kr,[zi]:Zr,[qr]:Xr,[Jr]:Yr,[Kr]:$r,[Zr]:zi},dn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Mc=1234567,Ms=Math.PI/180,Gi=180/Math.PI;function Nn(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]).toLowerCase()}function zt(i,t,e){return Math.max(t,Math.min(e,i))}function Fl(i,t){return(i%t+t)%t}function Uu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Fu(i,t,e){return i!==t?(e-i)/(t-i):0}function bs(i,t,e){return(1-e)*i+e*t}function Ou(i,t,e,n){return bs(i,t,1-Math.exp(-e*n))}function Bu(i,t=1){return t-Math.abs(Fl(i,t*2)-t)}function zu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function ku(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Vu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Gu(i,t){return i+Math.random()*(t-i)}function Hu(i){return i*(.5-Math.random())}function Wu(i){i!==void 0&&(Mc=i);let t=Mc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Xu(i){return i*Ms}function qu(i){return i*Gi}function Yu(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function $u(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Zu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ju(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),u=a((t+n)/2),p=r((t-n)/2),h=a((t-n)/2),d=r((n-t)/2),m=a((n-t)/2);switch(s){case"XYX":i.set(o*u,l*p,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*p,o*c);break;case"ZXZ":i.set(l*p,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*m,l*d,o*c);break;case"YXY":i.set(l*d,o*u,l*m,o*c);break;case"ZYZ":i.set(l*m,l*d,o*u,o*c);break;default:It("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function cn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function te(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Tn={DEG2RAD:Ms,RAD2DEG:Gi,generateUUID:Nn,clamp:zt,euclideanModulo:Fl,mapLinear:Uu,inverseLerp:Fu,lerp:bs,damp:Ou,pingpong:Bu,smoothstep:zu,smootherstep:ku,randInt:Vu,randFloat:Gu,randFloatSpread:Hu,seededRandom:Wu,degToRad:Xu,radToDeg:qu,isPowerOfTwo:Yu,ceilPowerOfTwo:$u,floorPowerOfTwo:Zu,setQuaternionFromProperEuler:Ju,normalize:te,denormalize:cn},Gl=class Gl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Gl.prototype.isVector2=!0;var _t=Gl,$e=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],p=n[s+3],h=r[a+0],d=r[a+1],m=r[a+2],v=r[a+3];if(p!==v||l!==h||c!==d||u!==m){let g=l*h+c*d+u*m+p*v;g<0&&(h=-h,d=-d,m=-m,v=-v,g=-g);let f=1-o;if(g<.9995){let E=Math.acos(g),C=Math.sin(E);f=Math.sin(f*E)/C,o=Math.sin(o*E)/C,l=l*f+h*o,c=c*f+d*o,u=u*f+m*o,p=p*f+v*o}else{l=l*f+h*o,c=c*f+d*o,u=u*f+m*o,p=p*f+v*o;let E=1/Math.sqrt(l*l+c*c+u*u+p*p);l*=E,c*=E,u*=E,p*=E}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],p=r[a],h=r[a+1],d=r[a+2],m=r[a+3];return t[e]=o*m+u*p+l*d-c*h,t[e+1]=l*m+u*h+c*p-o*d,t[e+2]=c*m+u*d+o*h-l*p,t[e+3]=u*m-o*p-l*h-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),p=o(r/2),h=l(n/2),d=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=h*u*p+c*d*m,this._y=c*d*p-h*u*m,this._z=c*u*m+h*d*p,this._w=c*u*p-h*d*m;break;case"YXZ":this._x=h*u*p+c*d*m,this._y=c*d*p-h*u*m,this._z=c*u*m-h*d*p,this._w=c*u*p+h*d*m;break;case"ZXY":this._x=h*u*p-c*d*m,this._y=c*d*p+h*u*m,this._z=c*u*m+h*d*p,this._w=c*u*p-h*d*m;break;case"ZYX":this._x=h*u*p-c*d*m,this._y=c*d*p+h*u*m,this._z=c*u*m-h*d*p,this._w=c*u*p+h*d*m;break;case"YZX":this._x=h*u*p+c*d*m,this._y=c*d*p+h*u*m,this._z=c*u*m-h*d*p,this._w=c*u*p-h*d*m;break;case"XZY":this._x=h*u*p-c*d*m,this._y=c*d*p-h*u*m,this._z=c*u*m+h*d*p,this._w=c*u*p+h*d*m;break;default:It("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],p=e[10],h=n+o+p;if(h>0){let d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(n>o&&n>p){let d=2*Math.sqrt(1+n-o-p);this._w=(u-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>p){let d=2*Math.sqrt(1+o-n-p);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+u)/d}else{let d=2*Math.sqrt(1+p-n-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(zt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Hl=class Hl{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(bc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(bc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),u=2*(o*e-r*s),p=2*(r*n-a*e);return this.x=e+l*c+a*p-o*u,this.y=n+l*u+o*c-r*p,this.z=s+l*p+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this.z=zt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this.z=zt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Uo.copy(this).projectOnVector(t),this.sub(Uo)}reflect(t){return this.sub(Uo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Hl.prototype.isVector3=!0;var I=Hl,Uo=new I,bc=new $e,Wl=class Wl{constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],p=n[7],h=n[2],d=n[5],m=n[8],v=s[0],g=s[3],f=s[6],E=s[1],C=s[4],S=s[7],M=s[2],b=s[5],P=s[8];return r[0]=a*v+o*E+l*M,r[3]=a*g+o*C+l*b,r[6]=a*f+o*S+l*P,r[1]=c*v+u*E+p*M,r[4]=c*g+u*C+p*b,r[7]=c*f+u*S+p*P,r[2]=h*v+d*E+m*M,r[5]=h*g+d*C+m*b,r[8]=h*f+d*S+m*P,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],p=u*a-o*c,h=o*l-u*r,d=c*r-a*l,m=e*p+n*h+s*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/m;return t[0]=p*v,t[1]=(s*c-u*n)*v,t[2]=(o*n-s*a)*v,t[3]=h*v,t[4]=(u*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=d*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return hi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Fo.makeScale(t,e)),this}rotate(t){return hi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Fo.makeRotation(-t)),this}translate(t,e){return hi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Fo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Wl.prototype.isMatrix3=!0;var Ut=Wl,Fo=new Ut,Tc=new Ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ec=new Ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ku(){let i={enabled:!0,workingColorSpace:As,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Kt&&(s.r=Un(s.r),s.g=Un(s.g),s.b=Un(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Kt&&(s.r=Bi(s.r),s.g=Bi(s.g),s.b=Bi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===zn?Cs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return hi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return hi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[As]:{primaries:t,whitePoint:n,transfer:Cs,toXYZ:Tc,fromXYZ:Ec,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:qe},outputColorSpaceConfig:{drawingBufferColorSpace:qe}},[qe]:{primaries:t,whitePoint:n,transfer:Kt,toXYZ:Tc,fromXYZ:Ec,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:qe}}}),i}var Wt=Ku();function Un(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Bi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var vi,ea=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{vi===void 0&&(vi=Rs("canvas")),vi.width=t.width,vi.height=t.height;let s=vi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=vi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=Rs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Un(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Un(e[n]/255)*255):e[n]=Un(e[n]);return{data:e,width:t.width,height:t.height}}else return It("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},ju=0,Hi=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=Nn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Oo(s[a].image)):r.push(Oo(s[a]))}else r=Oo(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Oo(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?ea.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(It("Texture: Unable to serialize Texture."),{})}var Qu=0,Bo=new I,Be=class i extends dn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=vn,s=vn,r=Pe,a=ni,o=sn,l=Ge,c=i.DEFAULT_ANISOTROPY,u=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=Nn(),this.name="",this.source=new Hi(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new _t(0,0),this.repeat=new _t(1,1),this.center=new _t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Bo).x}get height(){return this.source.getSize(Bo).y}get depth(){return this.source.getSize(Bo).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){It(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){It(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Al)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case jr:t.x=t.x-Math.floor(t.x);break;case vn:t.x=t.x<0?0:1;break;case Qr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case jr:t.y=t.y-Math.floor(t.y);break;case vn:t.y=t.y<0?0:1;break;case Qr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Be.DEFAULT_IMAGE=null;Be.DEFAULT_MAPPING=Al;Be.DEFAULT_ANISOTROPY=1;var Xl=class Xl{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],u=l[4],p=l[8],h=l[1],d=l[5],m=l[9],v=l[2],g=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(p-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(p+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+d+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let C=(c+1)/2,S=(d+1)/2,M=(f+1)/2,b=(u+h)/4,P=(p+v)/4,x=(m+g)/4;return C>S&&C>M?C<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(C),s=b/n,r=P/n):S>M?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=b/s,r=x/s):M<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),n=P/r,s=x/r),this.set(n,s,r,e),this}let E=Math.sqrt((g-m)*(g-m)+(p-v)*(p-v)+(h-u)*(h-u));return Math.abs(E)<.001&&(E=1),this.x=(g-m)/E,this.y=(p-v)/E,this.z=(h-u)/E,this.w=Math.acos((c+d+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this.z=zt(this.z,t.z,e.z),this.w=zt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this.z=zt(this.z,t,e),this.w=zt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Xl.prototype.isVector4=!0;var de=Xl,na=class extends dn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new de(0,0,t,e),this.scissorTest=!1,this.viewport=new de(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new Be(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Pe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Hi(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ve=class extends na{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Is=class extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ae,this.minFilter=Ae,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var ia=class extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ae,this.minFilter=Ae,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Ia=class Ia{constructor(t,e,n,s,r,a,o,l,c,u,p,h,d,m,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,u,p,h,d,m,v,g)}set(t,e,n,s,r,a,o,l,c,u,p,h,d,m,v,g){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=p,f[14]=h,f[3]=d,f[7]=m,f[11]=v,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ia().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Si.setFromMatrixColumn(t,0).length(),r=1/Si.setFromMatrixColumn(t,1).length(),a=1/Si.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),p=Math.sin(r);if(t.order==="XYZ"){let h=a*u,d=a*p,m=o*u,v=o*p;e[0]=l*u,e[4]=-l*p,e[8]=c,e[1]=d+m*c,e[5]=h-v*c,e[9]=-o*l,e[2]=v-h*c,e[6]=m+d*c,e[10]=a*l}else if(t.order==="YXZ"){let h=l*u,d=l*p,m=c*u,v=c*p;e[0]=h+v*o,e[4]=m*o-d,e[8]=a*c,e[1]=a*p,e[5]=a*u,e[9]=-o,e[2]=d*o-m,e[6]=v+h*o,e[10]=a*l}else if(t.order==="ZXY"){let h=l*u,d=l*p,m=c*u,v=c*p;e[0]=h-v*o,e[4]=-a*p,e[8]=m+d*o,e[1]=d+m*o,e[5]=a*u,e[9]=v-h*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let h=a*u,d=a*p,m=o*u,v=o*p;e[0]=l*u,e[4]=m*c-d,e[8]=h*c+v,e[1]=l*p,e[5]=v*c+h,e[9]=d*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let h=a*l,d=a*c,m=o*l,v=o*c;e[0]=l*u,e[4]=v-h*p,e[8]=m*p+d,e[1]=p,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=d*p+m,e[10]=h-v*p}else if(t.order==="XZY"){let h=a*l,d=a*c,m=o*l,v=o*c;e[0]=l*u,e[4]=-p,e[8]=c*u,e[1]=h*p+v,e[5]=a*u,e[9]=d*p-m,e[2]=m*p-d,e[6]=o*u,e[10]=v*p+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(td,t,ed)}lookAt(t,e,n){let s=this.elements;return We.subVectors(t,e),We.lengthSq()===0&&(We.z=1),We.normalize(),Hn.crossVectors(n,We),Hn.lengthSq()===0&&(Math.abs(n.z)===1?We.x+=1e-4:We.z+=1e-4,We.normalize(),Hn.crossVectors(n,We)),Hn.normalize(),xr.crossVectors(We,Hn),s[0]=Hn.x,s[4]=xr.x,s[8]=We.x,s[1]=Hn.y,s[5]=xr.y,s[9]=We.y,s[2]=Hn.z,s[6]=xr.z,s[10]=We.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],p=n[5],h=n[9],d=n[13],m=n[2],v=n[6],g=n[10],f=n[14],E=n[3],C=n[7],S=n[11],M=n[15],b=s[0],P=s[4],x=s[8],w=s[12],N=s[1],F=s[5],H=s[9],W=s[13],U=s[2],z=s[6],j=s[10],K=s[14],rt=s[3],Y=s[7],et=s[11],it=s[15];return r[0]=a*b+o*N+l*U+c*rt,r[4]=a*P+o*F+l*z+c*Y,r[8]=a*x+o*H+l*j+c*et,r[12]=a*w+o*W+l*K+c*it,r[1]=u*b+p*N+h*U+d*rt,r[5]=u*P+p*F+h*z+d*Y,r[9]=u*x+p*H+h*j+d*et,r[13]=u*w+p*W+h*K+d*it,r[2]=m*b+v*N+g*U+f*rt,r[6]=m*P+v*F+g*z+f*Y,r[10]=m*x+v*H+g*j+f*et,r[14]=m*w+v*W+g*K+f*it,r[3]=E*b+C*N+S*U+M*rt,r[7]=E*P+C*F+S*z+M*Y,r[11]=E*x+C*H+S*j+M*et,r[15]=E*w+C*W+S*K+M*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],p=t[6],h=t[10],d=t[14],m=t[3],v=t[7],g=t[11],f=t[15],E=l*d-c*h,C=o*d-c*p,S=o*h-l*p,M=a*d-c*u,b=a*h-l*u,P=a*p-o*u;return e*(v*E-g*C+f*S)-n*(m*E-g*M+f*b)+s*(m*C-v*M+f*P)-r*(m*S-v*b+g*P)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],u=t[10];return e*(a*u-o*c)-n*(r*u-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],p=t[9],h=t[10],d=t[11],m=t[12],v=t[13],g=t[14],f=t[15],E=e*o-n*a,C=e*l-s*a,S=e*c-r*a,M=n*l-s*o,b=n*c-r*o,P=s*c-r*l,x=u*v-p*m,w=u*g-h*m,N=u*f-d*m,F=p*g-h*v,H=p*f-d*v,W=h*f-d*g,U=E*W-C*H+S*F+M*N-b*w+P*x;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/U;return t[0]=(o*W-l*H+c*F)*z,t[1]=(s*H-n*W-r*F)*z,t[2]=(v*P-g*b+f*M)*z,t[3]=(h*b-p*P-d*M)*z,t[4]=(l*N-a*W-c*w)*z,t[5]=(e*W-s*N+r*w)*z,t[6]=(g*S-m*P-f*C)*z,t[7]=(u*P-h*S+d*C)*z,t[8]=(a*H-o*N+c*x)*z,t[9]=(n*N-e*H-r*x)*z,t[10]=(m*b-v*S+f*E)*z,t[11]=(p*S-u*b-d*E)*z,t[12]=(o*w-a*F-l*x)*z,t[13]=(e*F-n*w+s*x)*z,t[14]=(v*C-m*M-g*E)*z,t[15]=(u*M-p*C+h*E)*z,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,p=o+o,h=r*c,d=r*u,m=r*p,v=a*u,g=a*p,f=o*p,E=l*c,C=l*u,S=l*p,M=n.x,b=n.y,P=n.z;return s[0]=(1-(v+f))*M,s[1]=(d+S)*M,s[2]=(m-C)*M,s[3]=0,s[4]=(d-S)*b,s[5]=(1-(h+f))*b,s[6]=(g+E)*b,s[7]=0,s[8]=(m+C)*P,s[9]=(g-E)*P,s[10]=(1-(h+v))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Si.set(s[0],s[1],s[2]).length(),o=Si.set(s[4],s[5],s[6]).length(),l=Si.set(s[8],s[9],s[10]).length();r<0&&(a=-a),an.copy(this);let c=1/a,u=1/o,p=1/l;return an.elements[0]*=c,an.elements[1]*=c,an.elements[2]*=c,an.elements[4]*=u,an.elements[5]*=u,an.elements[6]*=u,an.elements[8]*=p,an.elements[9]*=p,an.elements[10]*=p,e.setFromRotationMatrix(an),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=hn,l=!1){let c=this.elements,u=2*r/(e-t),p=2*r/(n-s),h=(e+t)/(e-t),d=(n+s)/(n-s),m,v;if(l)m=r/(a-r),v=a*r/(a-r);else if(o===hn)m=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===ki)m=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=p,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=hn,l=!1){let c=this.elements,u=2/(e-t),p=2/(n-s),h=-(e+t)/(e-t),d=-(n+s)/(n-s),m,v;if(l)m=1/(a-r),v=a/(a-r);else if(o===hn)m=-2/(a-r),v=-(a+r)/(a-r);else if(o===ki)m=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=p,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Ia.prototype.isMatrix4=!0;var ee=Ia,Si=new I,an=new ee,td=new I(0,0,0),ed=new I(1,1,1),Hn=new I,xr=new I,We=new I,wc=new ee,Ac=new $e,Fn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],p=s[2],h=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-zt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-p,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-zt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:It("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return wc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(wc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ac.setFromEuler(this),this.setFromQuaternion(Ac,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Fn.DEFAULT_ORDER="XYZ";var Ls=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},nd=0,Cc=new I,Mi=new $e,Cn=new ee,yr=new I,ds=new I,id=new I,sd=new $e,Rc=new I(1,0,0),Pc=new I(0,1,0),Ic=new I(0,0,1),Lc={type:"added"},rd={type:"removed"},bi={type:"childadded",child:null},zo={type:"childremoved",child:null},Se=class i extends dn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=Nn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new I,e=new Fn,n=new $e,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ee},normalMatrix:{value:new Ut}}),this.matrix=new ee,this.matrixWorld=new ee,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ls,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.premultiply(Mi),this}rotateX(t){return this.rotateOnAxis(Rc,t)}rotateY(t){return this.rotateOnAxis(Pc,t)}rotateZ(t){return this.rotateOnAxis(Ic,t)}translateOnAxis(t,e){return Cc.copy(t).applyQuaternion(this.quaternion),this.position.add(Cc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Rc,t)}translateY(t){return this.translateOnAxis(Pc,t)}translateZ(t){return this.translateOnAxis(Ic,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Cn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?yr.copy(t):yr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Cn.lookAt(ds,yr,this.up):Cn.lookAt(yr,ds,this.up),this.quaternion.setFromRotationMatrix(Cn),s&&(Cn.extractRotation(s.matrixWorld),Mi.setFromRotationMatrix(Cn),this.quaternion.premultiply(Mi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Lt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Lc),bi.child=t,this.dispatchEvent(bi),bi.child=null):Lt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(rd),zo.child=t,this.dispatchEvent(zo),zo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Cn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Cn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Cn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Lc),bi.child=t,this.dispatchEvent(bi),bi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,t,id),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,sd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let p=l[c];r(t.shapes,p)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),p=a(t.shapes),h=a(t.skeletons),d=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),p.length>0&&(n.shapes=p),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Se.DEFAULT_UP=new I(0,1,0);Se.DEFAULT_MATRIX_AUTO_UPDATE=!0;Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var un=class extends Se{constructor(){super(),this.isGroup=!0,this.type="Group"}},ad={type:"move"},Wi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new un,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new un,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new un,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let v of t.hand.values()){let g=e.getJointPose(v,n),f=this._getHandJoint(c,v);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}let u=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],h=u.position.distanceTo(p.position),d=.02,m=.005;c.inputState.pinching&&h>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ad)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new un;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Uh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wn={h:0,s:0,l:0},vr={h:0,s:0,l:0};function ko(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Nt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Wt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Wt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Wt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Wt.workingColorSpace){if(t=Fl(t,1),e=zt(e,0,1),n=zt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ko(a,r,t+1/3),this.g=ko(a,r,t),this.b=ko(a,r,t-1/3)}return Wt.colorSpaceToWorking(this,s),this}setStyle(t,e=qe){function n(r){r!==void 0&&parseFloat(r)<1&&It("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:It("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);It("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=qe){let n=Uh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):It("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Un(t.r),this.g=Un(t.g),this.b=Un(t.b),this}copyLinearToSRGB(t){return this.r=Bi(t.r),this.g=Bi(t.g),this.b=Bi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=qe){return Wt.workingToColorSpace(De.copy(this),t),Math.round(zt(De.r*255,0,255))*65536+Math.round(zt(De.g*255,0,255))*256+Math.round(zt(De.b*255,0,255))}getHexString(t=qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Wt.workingColorSpace){Wt.workingToColorSpace(De.copy(this),e);let n=De.r,s=De.g,r=De.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let p=a-o;switch(c=u<=.5?p/(a+o):p/(2-a-o),a){case n:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-n)/p+2;break;case r:l=(n-s)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Wt.workingColorSpace){return Wt.workingToColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=qe){Wt.workingToColorSpace(De.copy(this),t);let e=De.r,n=De.g,s=De.b;return t!==qe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Wn),this.setHSL(Wn.h+t,Wn.s+e,Wn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Wn),t.getHSL(vr);let n=bs(Wn.h,vr.h,e),s=bs(Wn.s,vr.s,e),r=bs(Wn.l,vr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},De=new Nt;Nt.NAMES=Uh;var Ds=class extends Se{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fn,this.environmentIntensity=1,this.environmentRotation=new Fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},on=new I,Rn=new I,Vo=new I,Pn=new I,Ti=new I,Ei=new I,Dc=new I,Go=new I,Ho=new I,Wo=new I,Xo=new de,qo=new de,Yo=new de,Dn=class i{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),on.subVectors(t,e),s.cross(on);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){on.subVectors(s,e),Rn.subVectors(n,e),Vo.subVectors(t,e);let a=on.dot(on),o=on.dot(Rn),l=on.dot(Vo),c=Rn.dot(Rn),u=Rn.dot(Vo),p=a*c-o*o;if(p===0)return r.set(0,0,0),null;let h=1/p,d=(c*l-o*u)*h,m=(a*u-o*l)*h;return r.set(1-d-m,m,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Pn)===null?!1:Pn.x>=0&&Pn.y>=0&&Pn.x+Pn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Pn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Pn.x),l.addScaledVector(a,Pn.y),l.addScaledVector(o,Pn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return Xo.setScalar(0),qo.setScalar(0),Yo.setScalar(0),Xo.fromBufferAttribute(t,e),qo.fromBufferAttribute(t,n),Yo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Xo,r.x),a.addScaledVector(qo,r.y),a.addScaledVector(Yo,r.z),a}static isFrontFacing(t,e,n,s){return on.subVectors(n,e),Rn.subVectors(t,e),on.cross(Rn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return on.subVectors(this.c,this.b),Rn.subVectors(this.a,this.b),on.cross(Rn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Ti.subVectors(s,n),Ei.subVectors(r,n),Go.subVectors(t,n);let l=Ti.dot(Go),c=Ei.dot(Go);if(l<=0&&c<=0)return e.copy(n);Ho.subVectors(t,s);let u=Ti.dot(Ho),p=Ei.dot(Ho);if(u>=0&&p<=u)return e.copy(s);let h=l*p-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(Ti,a);Wo.subVectors(t,r);let d=Ti.dot(Wo),m=Ei.dot(Wo);if(m>=0&&d<=m)return e.copy(r);let v=d*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(Ei,o);let g=u*m-d*p;if(g<=0&&p-u>=0&&d-m>=0)return Dc.subVectors(r,s),o=(p-u)/(p-u+(d-m)),e.copy(s).addScaledVector(Dc,o);let f=1/(g+v+h);return a=v*f,o=h*f,e.copy(n).addScaledVector(Ti,a).addScaledVector(Ei,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},fn=class{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ln):ln.fromBufferAttribute(r,a),ln.applyMatrix4(t.matrixWorld),this.expandByPoint(ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Sr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Sr.copy(n.boundingBox)),Sr.applyMatrix4(t.matrixWorld),this.union(Sr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ln),ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(fs),Mr.subVectors(this.max,fs),wi.subVectors(t.a,fs),Ai.subVectors(t.b,fs),Ci.subVectors(t.c,fs),Xn.subVectors(Ai,wi),qn.subVectors(Ci,Ai),ai.subVectors(wi,Ci);let e=[0,-Xn.z,Xn.y,0,-qn.z,qn.y,0,-ai.z,ai.y,Xn.z,0,-Xn.x,qn.z,0,-qn.x,ai.z,0,-ai.x,-Xn.y,Xn.x,0,-qn.y,qn.x,0,-ai.y,ai.x,0];return!$o(e,wi,Ai,Ci,Mr)||(e=[1,0,0,0,1,0,0,0,1],!$o(e,wi,Ai,Ci,Mr))?!1:(br.crossVectors(Xn,qn),e=[br.x,br.y,br.z],$o(e,wi,Ai,Ci,Mr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},In=[new I,new I,new I,new I,new I,new I,new I,new I],ln=new I,Sr=new fn,wi=new I,Ai=new I,Ci=new I,Xn=new I,qn=new I,ai=new I,fs=new I,Mr=new I,br=new I,oi=new I;function $o(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){oi.fromArray(i,r);let o=s.x*Math.abs(oi.x)+s.y*Math.abs(oi.y)+s.z*Math.abs(oi.z),l=t.dot(oi),c=e.dot(oi),u=n.dot(oi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var ve=new I,Tr=new _t,od=0,ke=class extends dn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:od++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Nl,this.updateRanges=[],this.gpuType=nn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Tr.fromBufferAttribute(this,e),Tr.applyMatrix3(t),this.setXY(e,Tr.x,Tr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=cn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=te(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=cn(e,this.array)),e}setX(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=cn(e,this.array)),e}setY(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=cn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=cn(e,this.array)),e}setW(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=te(e,this.array),n=te(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=te(e,this.array),n=te(n,this.array),s=te(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=te(e,this.array),n=te(n,this.array),s=te(s,this.array),r=te(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Ns=class extends ke{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Us=class extends ke{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ue=class extends ke{constructor(t,e,n){super(new Float32Array(t),e,n)}},ld=new fn,ps=new I,Zo=new I,On=class{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):ld.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ps.subVectors(t,this.center);let e=ps.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ps,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Zo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ps.copy(t.center).add(Zo)),this.expandByPoint(ps.copy(t.center).sub(Zo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},cd=0,tn=new ee,Jo=new Se,Ri=new I,Xe=new fn,ms=new fn,we=new I,Ce=class i extends dn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cd++}),this.uuid=Nn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Du(t)?Us:Ns)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ut().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return tn.makeRotationFromQuaternion(t),this.applyMatrix4(tn),this}rotateX(t){return tn.makeRotationX(t),this.applyMatrix4(tn),this}rotateY(t){return tn.makeRotationY(t),this.applyMatrix4(tn),this}rotateZ(t){return tn.makeRotationZ(t),this.applyMatrix4(tn),this}translate(t,e,n){return tn.makeTranslation(t,e,n),this.applyMatrix4(tn),this}scale(t,e,n){return tn.makeScale(t,e,n),this.applyMatrix4(tn),this}lookAt(t){return Jo.lookAt(t),Jo.updateMatrix(),this.applyMatrix4(Jo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ue(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&It("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Xe.setFromBufferAttribute(r),this.morphTargetsRelative?(we.addVectors(this.boundingBox.min,Xe.min),this.boundingBox.expandByPoint(we),we.addVectors(this.boundingBox.max,Xe.max),this.boundingBox.expandByPoint(we)):(this.boundingBox.expandByPoint(Xe.min),this.boundingBox.expandByPoint(Xe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new On);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){let n=this.boundingSphere.center;if(Xe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];ms.setFromBufferAttribute(o),this.morphTargetsRelative?(we.addVectors(Xe.min,ms.min),Xe.expandByPoint(we),we.addVectors(Xe.max,ms.max),Xe.expandByPoint(we)):(Xe.expandByPoint(ms.min),Xe.expandByPoint(ms.max))}Xe.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)we.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(we));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)we.fromBufferAttribute(o,c),l&&(Ri.fromBufferAttribute(t,c),we.add(Ri)),s=Math.max(s,n.distanceToSquared(we))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new ke(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let x=0;x<n.count;x++)o[x]=new I,l[x]=new I;let c=new I,u=new I,p=new I,h=new _t,d=new _t,m=new _t,v=new I,g=new I;function f(x,w,N){c.fromBufferAttribute(n,x),u.fromBufferAttribute(n,w),p.fromBufferAttribute(n,N),h.fromBufferAttribute(r,x),d.fromBufferAttribute(r,w),m.fromBufferAttribute(r,N),u.sub(c),p.sub(c),d.sub(h),m.sub(h);let F=1/(d.x*m.y-m.x*d.y);isFinite(F)&&(v.copy(u).multiplyScalar(m.y).addScaledVector(p,-d.y).multiplyScalar(F),g.copy(p).multiplyScalar(d.x).addScaledVector(u,-m.x).multiplyScalar(F),o[x].add(v),o[w].add(v),o[N].add(v),l[x].add(g),l[w].add(g),l[N].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let x=0,w=E.length;x<w;++x){let N=E[x],F=N.start,H=N.count;for(let W=F,U=F+H;W<U;W+=3)f(t.getX(W+0),t.getX(W+1),t.getX(W+2))}let C=new I,S=new I,M=new I,b=new I;function P(x){M.fromBufferAttribute(s,x),b.copy(M);let w=o[x];C.copy(w),C.sub(M.multiplyScalar(M.dot(w))).normalize(),S.crossVectors(b,w);let F=S.dot(l[x])<0?-1:1;a.setXYZW(x,C.x,C.y,C.z,F)}for(let x=0,w=E.length;x<w;++x){let N=E[x],F=N.start,H=N.count;for(let W=F,U=F+H;W<U;W+=3)P(t.getX(W+0)),P(t.getX(W+1)),P(t.getX(W+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new ke(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);let s=new I,r=new I,a=new I,o=new I,l=new I,c=new I,u=new I,p=new I;if(t)for(let h=0,d=t.count;h<d;h+=3){let m=t.getX(h+0),v=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,g),u.subVectors(a,r),p.subVectors(s,r),u.cross(p),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,d=e.count;h<d;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),p.subVectors(s,r),u.cross(p),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)we.fromBufferAttribute(t,e),we.normalize(),t.setXYZ(e,we.x,we.y,we.z)}toNonIndexed(){function t(o,l){let c=o.array,u=o.itemSize,p=o.normalized,h=new c.constructor(l.length*u),d=0,m=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*u;for(let f=0;f<u;f++)h[m++]=c[d++]}return new ke(h,u,p)}if(this.index===null)return It("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,p=c.length;u<p;u++){let h=c[u],d=t(h,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let p=0,h=c.length;p<h;p++){let d=c[p];u.push(d.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(e))}let r=t.morphAttributes;for(let c in r){let u=[],p=r[c];for(let h=0,d=p.length;h<d;h++)u.push(p[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,u=a.length;c<u;c++){let p=a[c];this.addGroup(p.start,p.count,p.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},sa=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Nl,this.updateRanges=[],this.version=0,this.uuid=Nn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}},Oe=new I,Fs=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=cn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=te(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=te(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=te(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=te(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=te(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=cn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=cn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=cn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=cn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=te(e,this.array),n=te(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=te(e,this.array),n=te(n,this.array),s=te(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=te(e,this.array),n=te(n,this.array),s=te(s,this.array),r=te(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Ps("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new ke(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Ps("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ko=new I,hd=new I,ud=new Ut,Ye=class{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Ko.subVectors(n,e).cross(hd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Ko),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||ud.getNormalMatrix(t),s=this.coplanarPoint(Ko).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},dd=0,Mn=class extends dn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=Nn(),this.name="",this.type="Material",this.blending=ts,this.side=ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_l,this.blendDst=xl,this.blendEquation=fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Nt(0,0,0),this.blendAlpha=0,this.depthFunc=zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Th,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wr,this.stencilZFail=Wr,this.stencilZPass=Wr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){It(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){It(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Nt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Ye().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new _t().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new _t().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Xi=class extends Mn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Nt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Pi,gs=new I,Ii=new I,Li=new I,Di=new _t,_s=new _t,Fh=new ee,Er=new I,xs=new I,wr=new I,Nc=new _t,jo=new _t,Uc=new _t,Os=class extends Se{constructor(t=new Xi){if(super(),this.isSprite=!0,this.type="Sprite",Pi===void 0){Pi=new Ce;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new sa(e,5);Pi.setIndex([0,1,2,0,2,3]),Pi.setAttribute("position",new Fs(n,3,0,!1)),Pi.setAttribute("uv",new Fs(n,2,3,!1))}this.geometry=Pi,this.material=t,this.center=new _t(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Lt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ii.setFromMatrixScale(this.matrixWorld),Fh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Li.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ii.multiplyScalar(-Li.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Ar(Er.set(-.5,-.5,0),Li,a,Ii,s,r),Ar(xs.set(.5,-.5,0),Li,a,Ii,s,r),Ar(wr.set(.5,.5,0),Li,a,Ii,s,r),Nc.set(0,0),jo.set(1,0),Uc.set(1,1);let o=t.ray.intersectTriangle(Er,xs,wr,!1,gs);if(o===null&&(Ar(xs.set(-.5,.5,0),Li,a,Ii,s,r),jo.set(0,1),o=t.ray.intersectTriangle(Er,wr,xs,!1,gs),o===null))return;let l=t.ray.origin.distanceTo(gs);l<t.near||l>t.far||e.push({distance:l,point:gs.clone(),uv:Dn.getInterpolation(gs,Er,xs,wr,Nc,jo,Uc,new _t),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Ar(i,t,e,n,s,r){Di.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(_s.x=r*Di.x-s*Di.y,_s.y=s*Di.x+r*Di.y):_s.copy(Di),i.copy(t),i.x+=_s.x,i.y+=_s.y,i.applyMatrix4(Fh)}var Ln=new I,Qo=new I,Cr=new I,Rr=new I,ui=class{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ln)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Ln.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ln.copy(this.origin).addScaledVector(this.direction,e),Ln.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Qo.copy(t).add(e).multiplyScalar(.5),Cr.copy(e).sub(t).normalize(),Rr.copy(this.origin).sub(Qo);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Cr),o=Rr.dot(this.direction),l=-Rr.dot(Cr),c=Rr.lengthSq(),u=Math.abs(1-a*a),p,h,d,m;if(u>0)if(p=a*l-o,h=a*o-l,m=r*u,p>=0)if(h>=-m)if(h<=m){let v=1/u;p*=v,h*=v,d=p*(p+a*h+2*o)+h*(a*p+h+2*l)+c}else h=r,p=Math.max(0,-(a*h+o)),d=-p*p+h*(h+2*l)+c;else h=-r,p=Math.max(0,-(a*h+o)),d=-p*p+h*(h+2*l)+c;else h<=-m?(p=Math.max(0,-(-a*r+o)),h=p>0?-r:Math.min(Math.max(-r,-l),r),d=-p*p+h*(h+2*l)+c):h<=m?(p=0,h=Math.min(Math.max(-r,-l),r),d=h*(h+2*l)+c):(p=Math.max(0,-(a*r+o)),h=p>0?r:Math.min(Math.max(-r,-l),r),d=-p*p+h*(h+2*l)+c);else h=a>0?-r:r,p=Math.max(0,-(a*h+o)),d=-p*p+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Qo).addScaledVector(Cr,h),d}intersectSphere(t,e){if(t.radius<0)return null;Ln.subVectors(t.center,this.origin);let n=Ln.dot(this.direction),s=Ln.dot(Ln)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,p=1/this.direction.z,h=this.origin;return c>=0?(n=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(n=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),p>=0?(o=(t.min.z-h.z)*p,l=(t.max.z-h.z)*p):(o=(t.max.z-h.z)*p,l=(t.min.z-h.z)*p),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Ln)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,p=t.x-a.x,h=t.y-a.y,d=t.z-a.z,m=e.x-a.x,v=e.y-a.y,g=e.z-a.z,f=n.x-a.x,E=n.y-a.y,C=n.z-a.z,S=Math.abs(l),M=Math.abs(c),b=Math.abs(u),P,x,w,N,F,H,W,U,z,j,K,rt;if(S>=M&&S>=b?(w=l,H=p,z=m,rt=f,l>=0?(P=c,x=u,N=h,F=d,W=v,U=g,j=E,K=C):(P=u,x=c,N=d,F=h,W=g,U=v,j=C,K=E)):M>=b?(w=c,H=h,z=v,rt=E,c>=0?(P=u,x=l,N=d,F=p,W=g,U=m,j=C,K=f):(P=l,x=u,N=p,F=d,W=m,U=g,j=f,K=C)):(w=u,H=d,z=g,rt=C,u>=0?(P=l,x=c,N=p,F=h,W=m,U=v,j=f,K=E):(P=c,x=l,N=h,F=p,W=v,U=m,j=E,K=f)),w===0)return null;let Y=P/w,et=x/w,it=1/w,Pt=N-Y*H,At=F-et*H,jt=W-Y*z,Gt=U-et*z,qt=j-Y*rt,Z=K-et*rt,J=qt*Gt-Z*jt,yt=Pt*Z-At*qt,Dt=jt*At-Gt*Pt;if(s){if(J<0||yt<0||Dt<0)return null}else if((J<0||yt<0||Dt<0)&&(J>0||yt>0||Dt>0))return null;let vt=J+yt+Dt;if(vt===0)return null;let Ft=it*(J*H+yt*z+Dt*rt);return(vt>0?Ft<0:Ft>0)?null:this.at(Ft/vt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Bs=class extends Mn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=yl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Fc=new ee,li=new ui,Pr=new On,Oc=new I,Ir=new I,Lr=new I,Dr=new I,tl=new I,Nr=new I,Bc=new I,Ur=new I,ge=class extends Se{constructor(t=new Ce,e=new Bs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Nr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],p=r[l];u!==0&&(tl.fromBufferAttribute(p,t),a?Nr.addScaledVector(tl,u):Nr.addScaledVector(tl.sub(e),u))}e.add(Nr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Pr.copy(n.boundingSphere),Pr.applyMatrix4(r),li.copy(t.ray).recast(t.near),!(Pr.containsPoint(li.origin)===!1&&(li.intersectSphere(Pr,Oc)===null||li.origin.distanceToSquared(Oc)>(t.far-t.near)**2))&&(Fc.copy(r).invert(),li.copy(t.ray).applyMatrix4(Fc),!(n.boundingBox!==null&&li.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,li)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,p=r.attributes.normal,h=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=h.length;m<v;m++){let g=h[m],f=a[g.materialIndex],E=Math.max(g.start,d.start),C=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let S=E,M=C;S<M;S+=3){let b=o.getX(S),P=o.getX(S+1),x=o.getX(S+2);s=Fr(this,f,t,n,c,u,p,b,P,x),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let g=m,f=v;g<f;g+=3){let E=o.getX(g),C=o.getX(g+1),S=o.getX(g+2);s=Fr(this,a,t,n,c,u,p,E,C,S),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=h.length;m<v;m++){let g=h[m],f=a[g.materialIndex],E=Math.max(g.start,d.start),C=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let S=E,M=C;S<M;S+=3){let b=S,P=S+1,x=S+2;s=Fr(this,f,t,n,c,u,p,b,P,x),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let g=m,f=v;g<f;g+=3){let E=g,C=g+1,S=g+2;s=Fr(this,a,t,n,c,u,p,E,C,S),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function fd(i,t,e,n,s,r,a,o){let l;if(t.side===ze?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===ti,o),l===null)return null;Ur.copy(o),Ur.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Ur);return c<e.near||c>e.far?null:{distance:c,point:Ur.clone(),object:i}}function Fr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Ir),i.getVertexPosition(l,Lr),i.getVertexPosition(c,Dr);let u=fd(i,t,e,n,Ir,Lr,Dr,Bc);if(u){let p=new I;Dn.getBarycoord(Bc,Ir,Lr,Dr,p),s&&(u.uv=Dn.getInterpolatedAttribute(s,o,l,c,p,new _t)),r&&(u.uv1=Dn.getInterpolatedAttribute(r,o,l,c,p,new _t)),a&&(u.normal=Dn.getInterpolatedAttribute(a,o,l,c,p,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new I,materialIndex:0};Dn.getNormal(Ir,Lr,Dr,h.normal),u.face=h,u.barycoord=p}return u}var zs=class extends Be{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Ae,u=Ae,p,h){super(null,a,o,l,c,u,s,r,p,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ks=class extends ke{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Ni=new ee,zc=new ee,Or=[],kc=new fn,pd=new ee,ys=new ge,vs=new On,Vs=class extends ge{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ks(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,pd)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new fn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ni),kc.copy(t.boundingBox).applyMatrix4(Ni),this.boundingBox.union(kc)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new On),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ni),vs.copy(t.boundingSphere).applyMatrix4(Ni),this.boundingSphere.union(vs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(ys.geometry=this.geometry,ys.material=this.material,ys.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vs.copy(this.boundingSphere),vs.applyMatrix4(n),t.ray.intersectsSphere(vs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ni),zc.multiplyMatrices(n,Ni),ys.matrixWorld=zc,ys.raycast(t,Or);for(let a=0,o=Or.length;a<o;a++){let l=Or[a];l.instanceId=r,l.object=this,e.push(l)}Or.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new ks(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new zs(new Float32Array(s*this.count),s,this.count,Ba,nn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ci=new On,md=new _t(.5,.5),Br=new I,qi=class{constructor(t=new Ye,e=new Ye,n=new Ye,s=new Ye,r=new Ye,a=new Ye){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=hn,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],p=r[5],h=r[6],d=r[7],m=r[8],v=r[9],g=r[10],f=r[11],E=r[12],C=r[13],S=r[14],M=r[15];if(s[0].setComponents(c-a,d-u,f-m,M-E).normalize(),s[1].setComponents(c+a,d+u,f+m,M+E).normalize(),s[2].setComponents(c+o,d+p,f+v,M+C).normalize(),s[3].setComponents(c-o,d-p,f-v,M-C).normalize(),n)s[4].setComponents(l,h,g,S).normalize(),s[5].setComponents(c-l,d-h,f-g,M-S).normalize();else if(s[4].setComponents(c-l,d-h,f-g,M-S).normalize(),e===hn)s[5].setComponents(c+l,d+h,f+g,M+S).normalize();else if(e===ki)s[5].setComponents(l,h,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ci.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ci.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ci)}intersectsSprite(t){ci.center.set(0,0,0);let e=md.distanceTo(t.center);return ci.radius=.7071067811865476+e,ci.applyMatrix4(t.matrixWorld),this.intersectsSphere(ci)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Br.x=s.normal.x>0?t.max.x:t.min.x,Br.y=s.normal.y>0?t.max.y:t.min.y,Br.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Br)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Yi=class extends Mn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},ra=new I,aa=new I,Vc=new ee,Ss=new ui,zr=new On,el=new I,Gc=new I,Gs=class extends Se{constructor(t=new Ce,e=new Yi){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)ra.fromBufferAttribute(e,s-1),aa.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=ra.distanceTo(aa);t.setAttribute("lineDistance",new ue(n,1))}else It("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zr.copy(n.boundingSphere),zr.applyMatrix4(s),zr.radius+=r,t.ray.intersectsSphere(zr)===!1)return;Vc.copy(s).invert(),Ss.copy(t.ray).applyMatrix4(Vc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){let d=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let v=d,g=m-1;v<g;v+=c){let f=u.getX(v),E=u.getX(v+1),C=kr(this,t,Ss,l,f,E,v);C&&e.push(C)}if(this.isLineLoop){let v=u.getX(m-1),g=u.getX(d),f=kr(this,t,Ss,l,v,g,m-1);f&&e.push(f)}}else{let d=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let v=d,g=m-1;v<g;v+=c){let f=kr(this,t,Ss,l,v,v+1,v);f&&e.push(f)}if(this.isLineLoop){let v=kr(this,t,Ss,l,m-1,d,m-1);v&&e.push(v)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function kr(i,t,e,n,s,r,a){let o=i.geometry.attributes.position;if(ra.fromBufferAttribute(o,s),aa.fromBufferAttribute(o,r),e.distanceSqToSegment(ra,aa,el,Gc)>n)return;el.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(el);if(!(c<t.near||c>t.far))return{distance:c,point:Gc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Hs=class extends Be{constructor(t=[],e=ei,n,s,r,a,o,l,c,u){super(t,e,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ws=class extends Be{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var $n=class extends Be{constructor(t,e,n=mn,s,r,a,o=Ae,l=Ae,c,u=Sn,p=1){if(u!==Sn&&u!==ii)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:p};super(h,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Hi(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},oa=class extends $n{constructor(t,e=mn,n=ei,s,r,a=Ae,o=Ae,l,c=Sn){let u={width:t,height:t,depth:1},p=[u,u,u,u,u,u];super(t,t,e,n,s,r,a,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Xs=class extends Be{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},$i=class i extends Ce{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],p=[],h=0,d=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,s,a,2),m("x","z","y",1,-1,t,n,-e,s,a,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ue(c,3)),this.setAttribute("normal",new ue(u,3)),this.setAttribute("uv",new ue(p,2));function m(v,g,f,E,C,S,M,b,P,x,w){let N=S/P,F=M/x,H=S/2,W=M/2,U=b/2,z=P+1,j=x+1,K=0,rt=0,Y=new I;for(let et=0;et<j;et++){let it=et*F-W;for(let Pt=0;Pt<z;Pt++){let At=Pt*N-H;Y[v]=At*E,Y[g]=it*C,Y[f]=U,c.push(Y.x,Y.y,Y.z),Y[v]=0,Y[g]=0,Y[f]=b>0?1:-1,u.push(Y.x,Y.y,Y.z),p.push(Pt/P),p.push(1-et/x),K+=1}}for(let et=0;et<x;et++)for(let it=0;it<P;it++){let Pt=h+it+z*et,At=h+it+z*(et+1),jt=h+(it+1)+z*(et+1),Gt=h+(it+1)+z*et;l.push(Pt,At,Gt),l.push(At,jt,Gt),rt+=6}o.addGroup(d,rt,w),d+=rt,h+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var qs=class i extends Ce{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new I,u=new _t;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let p=0,h=3;p<=e;p++,h+=3){let d=n+p/e*s;c.x=t*Math.cos(d),c.y=t*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/t+1)/2,u.y=(a[h+1]/t+1)/2,l.push(u.x,u.y)}for(let p=1;p<=e;p++)r.push(p,p+1,0);this.setIndex(r),this.setAttribute("position",new ue(a,3)),this.setAttribute("normal",new ue(o,3)),this.setAttribute("uv",new ue(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}};var en=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){It("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let u=n[s],h=n[s+1]-u,d=(a-u)/h;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new _t:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new I,s=[],r=[],a=[],o=new I,l=new ee;for(let d=0;d<=t;d++){let m=d/t;s[d]=this.getTangentAt(m,new I)}r[0]=new I,a[0]=new I;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),p=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),p<=c&&(c=p,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(zt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,m))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(zt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],d*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Ys=class extends en{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new _t){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),p=Math.sin(this.aRotation),h=l-this.aX,d=c-this.aY;l=h*u-d*p+this.aX,c=h*p+d*u+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},la=class extends Ys{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Ol(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,p){let h=(a-r)/c-(o-r)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+p)+(l-o)/p;h*=u,d*=u,s(a,o,h,d)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var Hc=new I,Wc=new I,nl=new Ol,il=new Ol,sl=new Ol,di=class extends en{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new I){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(Wc.subVectors(s[0],s[1]).add(s[0]),c=Wc);let p=s[o%r],h=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(Hc.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Hc),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(p),d),v=Math.pow(p.distanceToSquared(h),d),g=Math.pow(h.distanceToSquared(u),d);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),nl.initNonuniformCatmullRom(c.x,p.x,h.x,u.x,m,v,g),il.initNonuniformCatmullRom(c.y,p.y,h.y,u.y,m,v,g),sl.initNonuniformCatmullRom(c.z,p.z,h.z,u.z,m,v,g)}else this.curveType==="catmullrom"&&(nl.initCatmullRom(c.x,p.x,h.x,u.x,this.tension),il.initCatmullRom(c.y,p.y,h.y,u.y,this.tension),sl.initCatmullRom(c.z,p.z,h.z,u.z,this.tension));return n.set(nl.calc(l),il.calc(l),sl.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Xc(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function gd(i,t){let e=1-i;return e*e*t}function _d(i,t){return 2*(1-i)*i*t}function xd(i,t){return i*i*t}function Ts(i,t,e,n){return gd(i,t)+_d(i,e)+xd(i,n)}function yd(i,t){let e=1-i;return e*e*e*t}function vd(i,t){let e=1-i;return 3*e*e*i*t}function Sd(i,t){return 3*(1-i)*i*i*t}function Md(i,t){return i*i*i*t}function Es(i,t,e,n,s){return yd(i,t)+vd(i,e)+Sd(i,n)+Md(i,s)}var ca=class extends en{constructor(t=new _t,e=new _t,n=new _t,s=new _t){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new _t){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Es(t,s.x,r.x,a.x,o.x),Es(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ha=class extends en{constructor(t=new I,e=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new I){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Es(t,s.x,r.x,a.x,o.x),Es(t,s.y,r.y,a.y,o.y),Es(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ua=class extends en{constructor(t=new _t,e=new _t){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new _t){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new _t){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},da=class extends en{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},fa=class extends en{constructor(t=new _t,e=new _t,n=new _t){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new _t){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ts(t,s.x,r.x,a.x),Ts(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},$s=class extends en{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ts(t,s.x,r.x,a.x),Ts(t,s.y,r.y,a.y),Ts(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},pa=class extends en{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new _t){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],p=s[a>s.length-3?s.length-1:a+2];return n.set(Xc(o,l.x,c.x,u.x,p.x),Xc(o,l.y,c.y,u.y,p.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new _t().fromArray(s))}return this}},bd=Object.freeze({__proto__:null,ArcCurve:la,CatmullRomCurve3:di,CubicBezierCurve:ca,CubicBezierCurve3:ha,EllipseCurve:Ys,LineCurve:ua,LineCurve3:da,QuadraticBezierCurve:fa,QuadraticBezierCurve3:$s,SplineCurve:pa});var Zs=class i extends Ce{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,p=t/o,h=e/l,d=[],m=[],v=[],g=[];for(let f=0;f<u;f++){let E=f*h-a;for(let C=0;C<c;C++){let S=C*p-r;m.push(S,-E,0),v.push(0,0,1),g.push(C/o),g.push(1-f/l)}}for(let f=0;f<l;f++)for(let E=0;E<o;E++){let C=E+c*f,S=E+c*(f+1),M=E+1+c*(f+1),b=E+1+c*f;d.push(C,S,b),d.push(S,M,b)}this.setIndex(d),this.setAttribute("position",new ue(m,3)),this.setAttribute("normal",new ue(v,3)),this.setAttribute("uv",new ue(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var Bn=class i extends Ce{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],p=new I,h=new I,d=[],m=[],v=[],g=[];for(let f=0;f<=n;f++){let E=[],C=f/n,S=a+C*o,M=t*Math.cos(S),b=Math.sqrt(t*t-M*M),P=0;f===0&&a===0?P=.5/e:f===n&&l===Math.PI&&(P=-.5/e);for(let x=0;x<=e;x++){let w=x/e,N=s+w*r;p.x=-b*Math.cos(N),p.y=M,p.z=b*Math.sin(N),m.push(p.x,p.y,p.z),h.copy(p).normalize(),v.push(h.x,h.y,h.z),g.push(w+P,1-C),E.push(c++)}u.push(E)}for(let f=0;f<n;f++)for(let E=0;E<e;E++){let C=u[f][E+1],S=u[f][E],M=u[f+1][E],b=u[f+1][E+1];(f!==0||a>0)&&d.push(C,S,b),(f!==n-1||l<Math.PI)&&d.push(S,M,b)}this.setIndex(d),this.setAttribute("position",new ue(m,3)),this.setAttribute("normal",new ue(v,3)),this.setAttribute("uv",new ue(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Js=class i extends Ce{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],u=[],p=[],h=new I,d=new I,m=new I;for(let v=0;v<=n;v++){let g=a+v/n*o;for(let f=0;f<=s;f++){let E=f/s*r;d.x=(t+e*Math.cos(g))*Math.cos(E),d.y=(t+e*Math.cos(g))*Math.sin(E),d.z=e*Math.sin(g),c.push(d.x,d.y,d.z),h.x=t*Math.cos(E),h.y=t*Math.sin(E),m.subVectors(d,h).normalize(),u.push(m.x,m.y,m.z),p.push(f/s),p.push(v/n)}}for(let v=1;v<=n;v++)for(let g=1;g<=s;g++){let f=(s+1)*v+g-1,E=(s+1)*(v-1)+g-1,C=(s+1)*(v-1)+g,S=(s+1)*v+g;l.push(f,E,S),l.push(E,C,S)}this.setIndex(l),this.setAttribute("position",new ue(c,3)),this.setAttribute("normal",new ue(u,3)),this.setAttribute("uv",new ue(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};var Ks=class i extends Ce{constructor(t=new $s(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new I,l=new I,c=new _t,u=new I,p=[],h=[],d=[],m=[];v(),this.setIndex(m),this.setAttribute("position",new ue(p,3)),this.setAttribute("normal",new ue(h,3)),this.setAttribute("uv",new ue(d,2));function v(){for(let C=0;C<e;C++)g(C);g(r===!1?e:0),E(),f()}function g(C){u=t.getPointAt(C/e,u);let S=a.normals[C],M=a.binormals[C];for(let b=0;b<=s;b++){let P=b/s*Math.PI*2,x=Math.sin(P),w=-Math.cos(P);l.x=w*S.x+x*M.x,l.y=w*S.y+x*M.y,l.z=w*S.z+x*M.z,l.normalize(),h.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,p.push(o.x,o.y,o.z)}}function f(){for(let C=1;C<=e;C++)for(let S=1;S<=s;S++){let M=(s+1)*(C-1)+(S-1),b=(s+1)*C+(S-1),P=(s+1)*C+S,x=(s+1)*(C-1)+S;m.push(M,b,x),m.push(b,P,x)}}function E(){for(let C=0;C<=e;C++)for(let S=0;S<=s;S++)c.x=C/e,c.y=S/s,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new bd[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function mi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(qc(s))s.isRenderTargetTexture?(It("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(qc(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Ue(i){let t={};for(let e=0;e<i.length;e++){let n=mi(i[e]);for(let s in n)t[s]=n[s]}return t}function qc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Td(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Bl(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Wt.workingColorSpace}var Oh={clone:mi,merge:Ue},Ed=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ze=class extends Mn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ed,this.fragmentShader=wd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=mi(t.uniforms),this.uniformsGroups=Td(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Nt().setHex(s.value);break;case"v2":this.uniforms[n].value=new _t().fromArray(s.value);break;case"v3":this.uniforms[n].value=new I().fromArray(s.value);break;case"v4":this.uniforms[n].value=new de().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ut().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ee().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},ma=class extends Ze{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Je=class extends Mn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yo,this.normalScale=new _t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var ga=class extends Mn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Mh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},_a=class extends Mn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Ui(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function rl(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Zn=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},xa=class extends Zn{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ll,endingEnd:ll}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case cl:r=t,o=2*e-n;break;case hl:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case cl:a=t,l=2*n-e;break;case hl:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,u=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this._offsetPrev,p=this._offsetNext,h=this._weightPrev,d=this._weightNext,m=(n-e)/(s-e),v=m*m,g=v*m,f=-h*g+2*h*v-h*m,E=(1+h)*g+(-1.5-2*h)*v+(-.5+h)*m+1,C=(-1-d)*g+(1.5+d)*v+.5*m,S=d*g-d*v;for(let M=0;M!==o;++M)r[M]=f*a[u+M]+E*a[c+M]+C*a[l+M]+S*a[p+M];return r}},ya=class extends Zn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=(n-e)/(s-e),p=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*p+a[l+h]*u;return r}},va=class extends Zn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Sa=class extends Zn{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this.inTangents,p=this.outTangents;if(!u||!p){let m=(n-e)/(s-e),v=1-m;for(let g=0;g!==o;++g)r[g]=a[c+g]*v+a[l+g]*m;return r}let h=o*2,d=t-1;for(let m=0;m!==o;++m){let v=a[c+m],g=a[l+m],f=d*h+m*2,E=p[f],C=p[f+1],S=t*h+m*2,M=u[S],b=u[S+1],P=Cd(n,e,E,M,s);r[m]=Bh(P,v,C,b,g)}return r}};function Bh(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function Ad(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Cd(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=Bh(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let l=Ad(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Ke=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ui(e,this.TimeBufferType),this.values=Ui(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ui(t.times,Array),values:Ui(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),rl(t.settings)&&(n.settings={inTangents:Ui(t.settings.inTangents,Array),outTangents:Ui(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new va(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ya(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new xa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Sa(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case ws:e=this.InterpolantFactoryMethodDiscrete;break;case ta:e=this.InterpolantFactoryMethodLinear;break;case Hr:e=this.InterpolantFactoryMethodSmooth;break;case ol:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return It("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ws;case this.InterpolantFactoryMethodLinear:return ta;case this.InterpolantFactoryMethodSmooth:return Hr;case this.InterpolantFactoryMethodBezier:return ol}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;rl(this.settings)&&(Yc(this.settings.inTangents,t),Yc(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Lt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Lt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Lt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Lt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&Nu(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Lt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Hr,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],u=t[o+1];if(c!==u&&(o!==1||c!==t[0]))if(s)l=!0;else{let p=o*n,h=p-n,d=p+n;for(let m=0;m!==n;++m){let v=e[p+m];if(v!==e[h+m]||v!==e[d+m]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let p=o*n,h=a*n;for(let d=0;d!==n;++d)e[h+d]=e[p+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,rl(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Yc(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}Ke.prototype.ValueTypeName="";Ke.prototype.TimeBufferType=Float32Array;Ke.prototype.ValueBufferType=Float32Array;Ke.prototype.DefaultInterpolation=ta;var Jn=class extends Ke{constructor(t,e,n){super(t,e,n)}};Jn.prototype.ValueTypeName="bool";Jn.prototype.ValueBufferType=Array;Jn.prototype.DefaultInterpolation=ws;Jn.prototype.InterpolantFactoryMethodLinear=void 0;Jn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ma=class extends Ke{constructor(t,e,n,s){super(t,e,n,s)}};Ma.prototype.ValueTypeName="color";var ba=class extends Ke{constructor(t,e,n,s){super(t,e,n,s)}};ba.prototype.ValueTypeName="number";var Ta=class extends Zn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let u=c+o;c!==u;c+=4)$e.slerpFlat(r,0,a,c-o,a,c,l);return r}},js=class extends Ke{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Ta(this.times,this.values,this.getValueSize(),t)}};js.prototype.ValueTypeName="quaternion";js.prototype.InterpolantFactoryMethodSmooth=void 0;var Kn=class extends Ke{constructor(t,e,n){super(t,e,n)}};Kn.prototype.ValueTypeName="string";Kn.prototype.ValueBufferType=Array;Kn.prototype.DefaultInterpolation=ws;Kn.prototype.InterpolantFactoryMethodLinear=void 0;Kn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ea=class extends Ke{constructor(t,e,n,s){super(t,e,n,s)}};Ea.prototype.ValueTypeName="vector";var wa=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,p){return c.push(u,p),this},this.removeHandler=function(u){let p=c.indexOf(u);return p!==-1&&c.splice(p,2),this},this.getHandler=function(u){for(let p=0,h=c.length;p<h;p+=2){let d=c[p],m=c[p+1];if(d.global&&(d.lastIndex=0),d.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},zh=new wa,Aa=class{constructor(t){this.manager=t!==void 0?t:zh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Aa.DEFAULT_MATERIAL_NAME="__DEFAULT";var Zi=class extends Se{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Nt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Qs=class extends Zi{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Nt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},al=new ee,$c=new I,Zc=new I,Ca=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _t(512,512),this.mapType=Ge,this.map=null,this.mapPass=null,this.matrix=new ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qi,this._frameExtents=new _t(1,1),this._viewportCount=1,this._viewports=[new de(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;$c.setFromMatrixPosition(t.matrixWorld),e.position.copy($c),Zc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Zc),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){al.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(al,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===ki||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(al)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Vr=new I,Gr=new $e,yn=new I,tr=class extends Se{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ee,this.projectionMatrix=new ee,this.projectionMatrixInverse=new ee,this.coordinateSystem=hn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Vr,Gr,yn),yn.x===1&&yn.y===1&&yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vr,Gr,yn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Vr,Gr,yn),yn.x===1&&yn.y===1&&yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vr,Gr,yn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Yn=new I,Jc=new _t,Kc=new _t,Ne=class extends tr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Gi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ms*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Gi*2*Math.atan(Math.tan(Ms*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z),Yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z)}getViewSize(t,e){return this.getViewBounds(t,Jc,Kc),e.subVectors(Kc,Jc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ms*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Ji=class extends tr{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ul=class extends Ca{constructor(){super(new Ji(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ki=class extends Zi{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.target=new Se,this.shadow=new ul}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},er=class extends Zi{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Fi=-90,Oi=1,Ra=class extends Se{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ne(Fi,Oi,t,e);s.layers=this.layers,this.add(s);let r=new Ne(Fi,Oi,t,e);r.layers=this.layers,this.add(r);let a=new Ne(Fi,Oi,t,e);a.layers=this.layers,this.add(a);let o=new Ne(Fi,Oi,t,e);o.layers=this.layers,this.add(o);let l=new Ne(Fi,Oi,t,e);l.layers=this.layers,this.add(l);let c=new Ne(Fi,Oi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===hn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ki)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,p=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(p,h,d),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Pa=class extends Ne{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var zl="\\[\\]\\.:\\/",Rd=new RegExp("["+zl+"]","g"),kl="[^"+zl+"]",Pd="[^"+zl.replace("\\.","")+"]",Id=/((?:WC+[\/:])*)/.source.replace("WC",kl),Ld=/(WCOD+)?/.source.replace("WCOD",Pd),Dd=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",kl),Nd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",kl),Ud=new RegExp("^"+Id+Ld+Dd+Nd+"$"),Fd=["material","materials","bones","map"],dl=class{constructor(t,e,n){let s=n||he.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},he=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Rd,"")}static parseTrackName(t){let e=Ud.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Fd.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){It("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Lt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Lt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Lt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Lt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Lt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Lt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};he.Composite=dl;he.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};he.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};he.prototype.GetterByBindingType=[he.prototype._getValue_direct,he.prototype._getValue_array,he.prototype._getValue_arrayElement,he.prototype._getValue_toArray];he.prototype.SetterByBindingTypeAndVersioning=[[he.prototype._setValue_direct,he.prototype._setValue_direct_setNeedsUpdate,he.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[he.prototype._setValue_array,he.prototype._setValue_array_setNeedsUpdate,he.prototype._setValue_array_setMatrixWorldNeedsUpdate],[he.prototype._setValue_arrayElement,he.prototype._setValue_arrayElement_setNeedsUpdate,he.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[he.prototype._setValue_fromArray,he.prototype._setValue_fromArray_setNeedsUpdate,he.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var $0=new Float32Array(1);var ji=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=zt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(zt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var ql=class ql{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};ql.prototype.isMatrix2=!0;var fl=ql;var nr=class extends dn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Vl(i,t,e,n){let s=Od(n);switch(e){case Ll:return i*t;case Ba:return i*t/s.components*s.byteLength;case za:return i*t/s.components*s.byteLength;case si:return i*t*2/s.components*s.byteLength;case ka:return i*t*2/s.components*s.byteLength;case Dl:return i*t*3/s.components*s.byteLength;case sn:return i*t*4/s.components*s.byteLength;case Va:return i*t*4/s.components*s.byteLength;case or:case lr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case cr:case hr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ha:case Xa:return Math.max(i,16)*Math.max(t,8)/4;case Ga:case Wa:return Math.max(i,8)*Math.max(t,8)/2;case qa:case Ya:case Za:case Ja:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case $a:case ur:case Ka:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ja:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Qa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case to:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case eo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case no:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case io:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case so:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ro:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ao:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case oo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case lo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case co:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ho:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case uo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case fo:case po:case mo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case go:case _o:return Math.ceil(i/4)*Math.ceil(t/4)*8;case dr:case xo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Od(i){switch(i){case Ge:case Cl:return{byteLength:1,components:1};case es:case Rl:case gn:return{byteLength:2,components:1};case Fa:case Oa:return{byteLength:2,components:4};case mn:case Ua:case nn:return{byteLength:4,components:1};case Pl:case Il:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window!="undefined"&&(window.__THREE__?It("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function ou(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function zd(i){let t=new WeakMap;function e(o,l){let c=o.array,u=o.usage,p=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array!="undefined"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function n(o,l,c){let u=l.array,p=l.updateRanges;if(i.bindBuffer(c,o),p.length===0)i.bufferSubData(c,0,u);else{p.sort((d,m)=>d.start-m.start);let h=0;for(let d=1;d<p.length;d++){let m=p[h],v=p[d];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++h,p[h]=v)}p.length=h+1;for(let d=0,m=p.length;d<m;d++){let v=p[d];i.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var kd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vd=`#ifdef USE_ALPHAHASH
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
#endif`,Gd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qd=`#ifdef USE_AOMAP
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
#endif`,Yd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$d=`#ifdef USE_BATCHING
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
#endif`,Zd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Jd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Kd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Qd=`#ifdef USE_IRIDESCENCE
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
#endif`,tf=`#ifdef USE_BUMPMAP
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
#endif`,ef=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,nf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,af=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,of=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,lf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,cf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,hf=`#define PI 3.141592653589793
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
} // validated`,uf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,df=`vec3 transformedNormal = objectNormal;
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
#endif`,ff=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_f="gl_FragColor = linearToOutputTexel( gl_FragColor );",xf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yf=`#ifdef USE_ENVMAP
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
#endif`,vf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Sf=`#ifdef USE_ENVMAP
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
#endif`,Mf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bf=`#ifdef USE_ENVMAP
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
#endif`,Tf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ef=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Af=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Cf=`#ifdef USE_GRADIENTMAP
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
}`,Rf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,If=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lf=`uniform bool receiveShadow;
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
#endif`,Nf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Uf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ff=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Of=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bf=`PhysicalMaterial material;
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
#endif`,zf=`uniform sampler2D dfgLUT;
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
}`,kf=`
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
#endif`,Vf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Gf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hf=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Wf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$f=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Zf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Jf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Kf=`#if defined( USE_POINTS_UV )
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
#endif`,jf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ep=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,np=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ip=`#ifdef USE_MORPHTARGETS
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
#endif`,sp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ap=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,op=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,hp=`#ifdef USE_NORMALMAP
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
#endif`,up=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,_p=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,yp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Tp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ep=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,wp=`float getShadowMask() {
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
}`,Ap=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Cp=`#ifdef USE_SKINNING
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
#endif`,Rp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pp=`#ifdef USE_SKINNING
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
#endif`,Ip=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Np=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Up=`#ifdef USE_TRANSMISSION
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
#endif`,Fp=`#ifdef USE_TRANSMISSION
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
#endif`,Op=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Vp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gp=`uniform sampler2D t2D;
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
}`,Hp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yp=`#include <common>
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
}`,$p=`#if DEPTH_PACKING == 3200
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
}`,Zp=`#define DISTANCE
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
}`,Jp=`#define DISTANCE
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
}`,Kp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qp=`uniform float scale;
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
}`,tm=`uniform vec3 diffuse;
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
}`,em=`#include <common>
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
}`,nm=`uniform vec3 diffuse;
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
}`,im=`#define LAMBERT
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
}`,sm=`#define LAMBERT
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
}`,rm=`#define MATCAP
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
}`,am=`#define MATCAP
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
}`,om=`#define NORMAL
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
}`,lm=`#define NORMAL
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
}`,cm=`#define PHONG
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
}`,hm=`#define PHONG
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
}`,um=`#define STANDARD
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
}`,dm=`#define STANDARD
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
}`,fm=`#define TOON
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
}`,pm=`#define TOON
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
}`,mm=`uniform float size;
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
}`,gm=`uniform vec3 diffuse;
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
}`,_m=`#include <common>
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
}`,xm=`uniform vec3 color;
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
}`,ym=`uniform float rotation;
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
}`,vm=`uniform vec3 diffuse;
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
}`,kt={alphahash_fragment:kd,alphahash_pars_fragment:Vd,alphamap_fragment:Gd,alphamap_pars_fragment:Hd,alphatest_fragment:Wd,alphatest_pars_fragment:Xd,aomap_fragment:qd,aomap_pars_fragment:Yd,batching_pars_vertex:$d,batching_vertex:Zd,begin_vertex:Jd,beginnormal_vertex:Kd,bsdfs:jd,iridescence_fragment:Qd,bumpmap_pars_fragment:tf,clipping_planes_fragment:ef,clipping_planes_pars_fragment:nf,clipping_planes_pars_vertex:sf,clipping_planes_vertex:rf,color_fragment:af,color_pars_fragment:of,color_pars_vertex:lf,color_vertex:cf,common:hf,cube_uv_reflection_fragment:uf,defaultnormal_vertex:df,displacementmap_pars_vertex:ff,displacementmap_vertex:pf,emissivemap_fragment:mf,emissivemap_pars_fragment:gf,colorspace_fragment:_f,colorspace_pars_fragment:xf,envmap_fragment:yf,envmap_common_pars_fragment:vf,envmap_pars_fragment:Sf,envmap_pars_vertex:Mf,envmap_physical_pars_fragment:Df,envmap_vertex:bf,fog_vertex:Tf,fog_pars_vertex:Ef,fog_fragment:wf,fog_pars_fragment:Af,gradientmap_pars_fragment:Cf,lightmap_pars_fragment:Rf,lights_lambert_fragment:Pf,lights_lambert_pars_fragment:If,lights_pars_begin:Lf,lights_toon_fragment:Nf,lights_toon_pars_fragment:Uf,lights_phong_fragment:Ff,lights_phong_pars_fragment:Of,lights_physical_fragment:Bf,lights_physical_pars_fragment:zf,lights_fragment_begin:kf,lights_fragment_maps:Vf,lights_fragment_end:Gf,lightprobes_pars_fragment:Hf,logdepthbuf_fragment:Wf,logdepthbuf_pars_fragment:Xf,logdepthbuf_pars_vertex:qf,logdepthbuf_vertex:Yf,map_fragment:$f,map_pars_fragment:Zf,map_particle_fragment:Jf,map_particle_pars_fragment:Kf,metalnessmap_fragment:jf,metalnessmap_pars_fragment:Qf,morphinstance_vertex:tp,morphcolor_vertex:ep,morphnormal_vertex:np,morphtarget_pars_vertex:ip,morphtarget_vertex:sp,normal_fragment_begin:rp,normal_fragment_maps:ap,normal_pars_fragment:op,normal_pars_vertex:lp,normal_vertex:cp,normalmap_pars_fragment:hp,clearcoat_normal_fragment_begin:up,clearcoat_normal_fragment_maps:dp,clearcoat_pars_fragment:fp,iridescence_pars_fragment:pp,opaque_fragment:mp,packing:gp,premultiplied_alpha_fragment:_p,project_vertex:xp,dithering_fragment:yp,dithering_pars_fragment:vp,roughnessmap_fragment:Sp,roughnessmap_pars_fragment:Mp,shadowmap_pars_fragment:bp,shadowmap_pars_vertex:Tp,shadowmap_vertex:Ep,shadowmask_pars_fragment:wp,skinbase_vertex:Ap,skinning_pars_vertex:Cp,skinning_vertex:Rp,skinnormal_vertex:Pp,specularmap_fragment:Ip,specularmap_pars_fragment:Lp,tonemapping_fragment:Dp,tonemapping_pars_fragment:Np,transmission_fragment:Up,transmission_pars_fragment:Fp,uv_pars_fragment:Op,uv_pars_vertex:Bp,uv_vertex:zp,worldpos_vertex:kp,background_vert:Vp,background_frag:Gp,backgroundCube_vert:Hp,backgroundCube_frag:Wp,cube_vert:Xp,cube_frag:qp,depth_vert:Yp,depth_frag:$p,distance_vert:Zp,distance_frag:Jp,equirect_vert:Kp,equirect_frag:jp,linedashed_vert:Qp,linedashed_frag:tm,meshbasic_vert:em,meshbasic_frag:nm,meshlambert_vert:im,meshlambert_frag:sm,meshmatcap_vert:rm,meshmatcap_frag:am,meshnormal_vert:om,meshnormal_frag:lm,meshphong_vert:cm,meshphong_frag:hm,meshphysical_vert:um,meshphysical_frag:dm,meshtoon_vert:fm,meshtoon_frag:pm,points_vert:mm,points_frag:gm,shadow_vert:_m,shadow_frag:xm,sprite_vert:ym,sprite_frag:vm},pt={common:{diffuse:{value:new Nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new _t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new Nt(16777215)},opacity:{value:1},center:{value:new _t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},wn={basic:{uniforms:Ue([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:Ue([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Nt(0)},envMapIntensity:{value:1}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:Ue([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Nt(0)},specular:{value:new Nt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:Ue([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:Ue([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Nt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:Ue([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:Ue([pt.points,pt.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:Ue([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:Ue([pt.common,pt.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:Ue([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:Ue([pt.sprite,pt.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distance:{uniforms:Ue([pt.common,pt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distance_vert,fragmentShader:kt.distance_frag},shadow:{uniforms:Ue([pt.lights,pt.fog,{color:{value:new Nt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};wn.physical={uniforms:Ue([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new _t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new Nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new _t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new Nt(0)},specularColor:{value:new Nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new _t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};var Mo={r:0,b:0,g:0},Sm=new ee,lu=new Ut;lu.set(-1,0,0,0,1,0,0,0,1);function Mm(i,t,e,n,s,r){let a=new Nt(0),o=s===!0?0:1,l,c,u=null,p=0,h=null;function d(E){let C=E.isScene===!0?E.background:null;if(C&&C.isTexture){let S=E.backgroundBlurriness>0;C=t.get(C,S)}return C}function m(E){let C=!1,S=d(E);S===null?g(a,o):S&&S.isColor&&(g(S,1),C=!0);let M=i.xr.getEnvironmentBlendMode();M==="additive"?e.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||C)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(E,C){let S=d(C);S&&(S.isCubeTexture||S.mapping===rr)?(c===void 0&&(c=new ge(new $i(1,1,1),new Ze({name:"BackgroundCubeMaterial",uniforms:mi(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:ze,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,b,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Sm.makeRotationFromEuler(C.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(lu),c.material.toneMapped=Wt.getTransfer(S.colorSpace)!==Kt,(u!==S||p!==S.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=S,p=S.version,h=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new ge(new Zs(2,2),new Ze({name:"BackgroundMaterial",uniforms:mi(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=Wt.getTransfer(S.colorSpace)!==Kt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||p!==S.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=S,p=S.version,h=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function g(E,C){E.getRGB(Mo,Bl(i)),e.buffers.color.setClear(Mo.r,Mo.g,Mo.b,C,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,C=1){a.set(E),o=C,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,g(a,o)},render:m,addToRenderList:v,dispose:f}}function bm(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,a=!1;function o(F,H,W,U,z){let j=!1,K=p(F,U,W,H);r!==K&&(r=K,c(r.object)),j=d(F,U,W,z),j&&m(F,U,W,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,S(F,H,W,U),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return i.createVertexArray()}function c(F){return i.bindVertexArray(F)}function u(F){return i.deleteVertexArray(F)}function p(F,H,W,U){let z=U.wireframe===!0,j=n[H.id];j===void 0&&(j={},n[H.id]=j);let K=F.isInstancedMesh===!0?F.id:0,rt=j[K];rt===void 0&&(rt={},j[K]=rt);let Y=rt[W.id];Y===void 0&&(Y={},rt[W.id]=Y);let et=Y[z];return et===void 0&&(et=h(l()),Y[z]=et),et}function h(F){let H=[],W=[],U=[];for(let z=0;z<e;z++)H[z]=0,W[z]=0,U[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:W,attributeDivisors:U,object:F,attributes:{},index:null}}function d(F,H,W,U){let z=r.attributes,j=H.attributes,K=0,rt=W.getAttributes();for(let Y in rt)if(rt[Y].location>=0){let it=z[Y],Pt=j[Y];if(Pt===void 0&&(Y==="instanceMatrix"&&F.instanceMatrix&&(Pt=F.instanceMatrix),Y==="instanceColor"&&F.instanceColor&&(Pt=F.instanceColor)),it===void 0||it.attribute!==Pt||Pt&&it.data!==Pt.data)return!0;K++}return r.attributesNum!==K||r.index!==U}function m(F,H,W,U){let z={},j=H.attributes,K=0,rt=W.getAttributes();for(let Y in rt)if(rt[Y].location>=0){let it=j[Y];it===void 0&&(Y==="instanceMatrix"&&F.instanceMatrix&&(it=F.instanceMatrix),Y==="instanceColor"&&F.instanceColor&&(it=F.instanceColor));let Pt={};Pt.attribute=it,it&&it.data&&(Pt.data=it.data),z[Y]=Pt,K++}r.attributes=z,r.attributesNum=K,r.index=U}function v(){let F=r.newAttributes;for(let H=0,W=F.length;H<W;H++)F[H]=0}function g(F){f(F,0)}function f(F,H){let W=r.newAttributes,U=r.enabledAttributes,z=r.attributeDivisors;W[F]=1,U[F]===0&&(i.enableVertexAttribArray(F),U[F]=1),z[F]!==H&&(i.vertexAttribDivisor(F,H),z[F]=H)}function E(){let F=r.newAttributes,H=r.enabledAttributes;for(let W=0,U=H.length;W<U;W++)H[W]!==F[W]&&(i.disableVertexAttribArray(W),H[W]=0)}function C(F,H,W,U,z,j,K){K===!0?i.vertexAttribIPointer(F,H,W,z,j):i.vertexAttribPointer(F,H,W,U,z,j)}function S(F,H,W,U){v();let z=U.attributes,j=W.getAttributes(),K=H.defaultAttributeValues;for(let rt in j){let Y=j[rt];if(Y.location>=0){let et=z[rt];if(et===void 0&&(rt==="instanceMatrix"&&F.instanceMatrix&&(et=F.instanceMatrix),rt==="instanceColor"&&F.instanceColor&&(et=F.instanceColor)),et!==void 0){let it=et.normalized,Pt=et.itemSize,At=t.get(et);if(At===void 0)continue;let jt=At.buffer,Gt=At.type,qt=At.bytesPerElement,Z=Gt===i.INT||Gt===i.UNSIGNED_INT||et.gpuType===Ua;if(et.isInterleavedBufferAttribute){let J=et.data,yt=J.stride,Dt=et.offset;if(J.isInstancedInterleavedBuffer){for(let vt=0;vt<Y.locationSize;vt++)f(Y.location+vt,J.meshPerAttribute);F.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let vt=0;vt<Y.locationSize;vt++)g(Y.location+vt);i.bindBuffer(i.ARRAY_BUFFER,jt);for(let vt=0;vt<Y.locationSize;vt++)C(Y.location+vt,Pt/Y.locationSize,Gt,it,yt*qt,(Dt+Pt/Y.locationSize*vt)*qt,Z)}else{if(et.isInstancedBufferAttribute){for(let J=0;J<Y.locationSize;J++)f(Y.location+J,et.meshPerAttribute);F.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let J=0;J<Y.locationSize;J++)g(Y.location+J);i.bindBuffer(i.ARRAY_BUFFER,jt);for(let J=0;J<Y.locationSize;J++)C(Y.location+J,Pt/Y.locationSize,Gt,it,Pt*qt,Pt/Y.locationSize*J*qt,Z)}}else if(K!==void 0){let it=K[rt];if(it!==void 0)switch(it.length){case 2:i.vertexAttrib2fv(Y.location,it);break;case 3:i.vertexAttrib3fv(Y.location,it);break;case 4:i.vertexAttrib4fv(Y.location,it);break;default:i.vertexAttrib1fv(Y.location,it)}}}}E()}function M(){w();for(let F in n){let H=n[F];for(let W in H){let U=H[W];for(let z in U){let j=U[z];for(let K in j)u(j[K].object),delete j[K];delete U[z]}}delete n[F]}}function b(F){if(n[F.id]===void 0)return;let H=n[F.id];for(let W in H){let U=H[W];for(let z in U){let j=U[z];for(let K in j)u(j[K].object),delete j[K];delete U[z]}}delete n[F.id]}function P(F){for(let H in n){let W=n[H];for(let U in W){let z=W[U];if(z[F.id]===void 0)continue;let j=z[F.id];for(let K in j)u(j[K].object),delete j[K];delete z[F.id]}}}function x(F){for(let H in n){let W=n[H],U=F.isInstancedMesh===!0?F.id:0,z=W[U];if(z!==void 0){for(let j in z){let K=z[j];for(let rt in K)u(K[rt].object),delete K[rt];delete z[j]}delete W[U],Object.keys(W).length===0&&delete n[H]}}}function w(){N(),a=!0,r!==s&&(r=s,c(r.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:N,dispose:M,releaseStatesOfGeometry:b,releaseStatesOfObject:x,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:g,disableUnusedAttributes:E}}function Tm(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),e.update(c,n,u))}function o(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let h=0;for(let d=0;d<u;d++)h+=c[d];e.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Em(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==sn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let x=P===gn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==Ge&&P!==nn&&!x&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",u=l(c);u!==c&&(It("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let p=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&It("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),C=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:E,maxVaryings:C,maxFragmentUniforms:S,maxSamples:M,samples:b}}function wm(i){let t=this,e=null,n=0,s=!1,r=!1,a=new Ye,o=new Ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,h){let d=p.length!==0||h||n!==0||s;return s=h,n=p.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,h){e=u(p,h,0)},this.setState=function(p,h,d){let m=p.clippingPlanes,v=p.clipIntersection,g=p.clipShadows,f=i.get(p);if(!s||m===null||m.length===0||r&&!g)r?u(null):c();else{let E=r?0:n,C=E*4,S=f.clippingState||null;l.value=S,S=u(m,h,C,d);for(let M=0;M!==C;++M)S[M]=e[M];f.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(p,h,d,m){let v=p!==null?p.length:0,g=null;if(v!==0){if(g=l.value,m!==!0||g===null){let f=d+v*4,E=h.matrixWorldInverse;o.getNormalMatrix(E),(g===null||g.length<f)&&(g=new Float32Array(f));for(let C=0,S=d;C!==v;++C,S+=4)a.copy(p[C]).applyMatrix4(E,o),a.normal.toArray(g,S),g[S+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}var ss=4,Am=6,Cm=20,Rm=256,fr=new Ji,kh=new Nt,Yl=null,$l=0,Zl=0,Jl=!1,Pm=new I,gi=new I,To=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=Pm}=r;Yl=this._renderer.getRenderTarget(),$l=this._renderer.getActiveCubeFace(),Zl=this._renderer.getActiveMipmapLevel(),Jl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Yl,$l,Zl),this._renderer.xr.enabled=Jl,t.scissorTest=!1,is(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ei||t.mapping===pi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Yl=this._renderer.getRenderTarget(),$l=this._renderer.getActiveCubeFace(),Zl=this._renderer.getActiveMipmapLevel(),Jl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Pe,minFilter:Pe,generateMipmaps:!1,type:gn,format:sn,colorSpace:As,depthBuffer:!1},s=Vh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vh(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Im(r)),this._blurMaterial=Dm(r,t,e),this._ggxMaterial=Lm(r,t,e)}return s}_compileMaterial(t){let e=new ge(new Ce,t);this._renderer.compile(e,fr)}_sceneToCubeUV(t,e,n,s,r){let l=new Ne(90,1,e,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],p=this._renderer,h=p.autoClear,d=p.toneMapping;p.getClearColor(kh),p.toneMapping=pn,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ge(new $i,new Bs({name:"PMREM.Background",side:ze,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,g=v.material,f=!1,E=t.background;E?E.isColor&&(g.color.copy(E),t.background=null,f=!0):(g.color.copy(kh),f=!0);for(let C=0;C<6;C++){let S=C%3;S===0?(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[C],r.y,r.z)):S===1?(l.up.set(0,0,c[C]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[C],r.z)):(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[C]));let M=this._cubeSize;is(s,S*M,C>2?M:0,M,M),p.setRenderTarget(s),f&&p.render(v,l),p.render(t,l)}p.toneMapping=d,p.autoClear=h,t.background=E}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===ei||t.mapping===pi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gh());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;is(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,fr)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),p=Math.sqrt(c*c-u*u),h=c*1.25,d=p*h,{_lodMax:m}=this,v=this._sizeLods[n],g=3*v*(n>m-ss?n-m+ss:0),f=4*(this._cubeSize-v);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=m-e,is(r,g,f,3*v,2*v),s.setRenderTarget(r),s.render(o,fr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-n,is(t,g,f,3*v,2*v),s.setRenderTarget(t),s.render(o,fr)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],p=3*u*(s>this._lodMax-ss?s-this._lodMax+ss:0),h=4*(this._cubeSize-u);is(e,p,h,3*u,2*u),a.setRenderTarget(e),a.render(l,fr)}};function Im(i){let t=[],e=[],n=i,s=i-ss+1+Am;for(let r=0;r<s;r++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],p=6,h=6,d=3,m=new Float32Array(d*h*p),v=new Float32Array(d*h*p);for(let f=0;f<p;f++){let E=f%3*2/3-1,C=f>2?0:-1,S=[E,C,0,E+2/3,C,0,E+2/3,C+1,0,E,C,0,E+2/3,C+1,0,E,C+1,0];m.set(S,d*h*f);for(let M=0;M<h;M++){let b=u[M*2]*2-1,P=u[M*2+1]*2-1;f===0?gi.set(1,P,b):f===1?gi.set(-b,1,-P):f===2?gi.set(-b,P,1):f===3?gi.set(-1,P,-b):f===4?gi.set(-b,-1,P):gi.set(b,P,-1),gi.toArray(v,(f*h+M)*d)}}let g=new Ce;g.setAttribute("position",new ke(m,d)),g.setAttribute("outputDirection",new ke(v,d)),e.push(new ge(g,null)),n>ss&&n--}return{lodMeshes:e,sizeLods:t}}function Vh(i,t,e){let n=new Ve(i,t,e);return n.texture.mapping=rr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function is(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Lm(i,t,e){return new Ze({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Rm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ao(),fragmentShader:`

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
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Dm(i,t,e){return new Ze({name:"SphericalGaussianBlur",defines:{SAMPLES:Cm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ao(),fragmentShader:`

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
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Gh(){return new Ze({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ao(),fragmentShader:`

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
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Hh(){return new Ze({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ao(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Ao(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Eo=class extends Ve{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Hs(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new $i(5,5,5),r=new Ze({name:"CubemapFromEquirect",uniforms:mi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ze,blending:bn});r.uniforms.tEquirect.value=e;let a=new ge(s,r),o=e.minFilter;return e.minFilter===ni&&(e.minFilter=Pe),new Ra(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function Nm(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,d=!1){return h==null?null:d?a(h):r(h)}function r(h){if(h&&h.isTexture){let d=h.mapping;if(d===La||d===Da)if(t.has(h)){let m=t.get(h).texture;return o(m,h.mapping)}else{let m=h.image;if(m&&m.height>0){let v=new Eo(m.height);return v.fromEquirectangularTexture(i,h),t.set(h,v),h.addEventListener("dispose",c),o(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let d=h.mapping,m=d===La||d===Da,v=d===ei||d===pi;if(m||v){let g=e.get(h),f=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return n===null&&(n=new To(i)),g=m?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),g.texture;if(g!==void 0)return g.texture;{let E=h.image;return m&&E&&E.height>0||v&&E&&l(E)?(n===null&&(n=new To(i)),g=m?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,d){return d===La?h.mapping=ei:d===Da&&(h.mapping=pi),h}function l(h){let d=0,m=6;for(let v=0;v<m;v++)h[v]!==void 0&&d++;return d===m}function c(h){let d=h.target;d.removeEventListener("dispose",c);let m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function u(h){let d=h.target;d.removeEventListener("dispose",u);let m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function p(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:p}}function Um(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&hi("WebGLRenderer: "+n+" extension not supported."),s}}}function Fm(i,t,e,n){let s={},r=new WeakMap;function a(p){let h=p.target;h.index!==null&&t.remove(h.index);for(let m in h.attributes)t.remove(h.attributes[m]);h.removeEventListener("dispose",a),delete s[h.id];let d=r.get(h);d&&(t.remove(d),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(p,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function l(p){let h=p.attributes;for(let d in h)t.update(h[d],i.ARRAY_BUFFER)}function c(p){let h=[],d=p.index,m=p.attributes.position,v=0;if(m===void 0)return;if(d!==null){let E=d.array;v=d.version;for(let C=0,S=E.length;C<S;C+=3){let M=E[C+0],b=E[C+1],P=E[C+2];h.push(M,b,b,P,P,M)}}else{let E=m.array;v=m.version;for(let C=0,S=E.length/3-1;C<S;C+=3){let M=C+0,b=C+1,P=C+2;h.push(M,b,b,P,P,M)}}let g=new(m.count>=65535?Us:Ns)(h,1);g.version=v;let f=r.get(p);f&&t.remove(f),r.set(p,g)}function u(p){let h=r.get(p);if(h){let d=p.index;d!==null&&h.version<d.version&&c(p)}else c(p);return r.get(p)}return{get:o,update:l,getWireframeAttribute:u}}function Om(i,t,e){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function l(p,h){i.drawElements(n,h,r,p*a),e.update(h,n,1)}function c(p,h,d){d!==0&&(i.drawElementsInstanced(n,h,r,p*a,d),e.update(h,n,d))}function u(p,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,p,0,d);let v=0;for(let g=0;g<d;g++)v+=h[g];e.update(v,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Bm(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Lt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function zm(i,t,e){let n=new WeakMap,s=new de;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==p){let w=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();let d=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],E=o.morphAttributes.color||[],C=0;d===!0&&(C=1),m===!0&&(C=2),v===!0&&(C=3);let S=o.attributes.position.count*C,M=1;S>t.maxTextureSize&&(M=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);let b=new Float32Array(S*M*4*p),P=new Is(b,S,M,p);P.type=nn,P.needsUpdate=!0;let x=C*4;for(let N=0;N<p;N++){let F=g[N],H=f[N],W=E[N],U=S*M*4*N;for(let z=0;z<F.count;z++){let j=z*x;d===!0&&(s.fromBufferAttribute(F,z),b[U+j+0]=s.x,b[U+j+1]=s.y,b[U+j+2]=s.z,b[U+j+3]=0),m===!0&&(s.fromBufferAttribute(H,z),b[U+j+4]=s.x,b[U+j+5]=s.y,b[U+j+6]=s.z,b[U+j+7]=0),v===!0&&(s.fromBufferAttribute(W,z),b[U+j+8]=s.x,b[U+j+9]=s.y,b[U+j+10]=s.z,b[U+j+11]=W.itemSize===4?s.w:1)}}h={count:p,texture:P,size:new _t(S,M)},n.set(o,h),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let d=0;for(let v=0;v<c.length;v++)d+=c[v];let m=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function km(i,t,e,n,s){let r=new WeakMap;function a(c){let u=s.render.frame,p=c.geometry,h=t.get(c,p);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return h}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}var Vm={[vl]:"LINEAR_TONE_MAPPING",[Sl]:"REINHARD_TONE_MAPPING",[Ml]:"CINEON_TONE_MAPPING",[bl]:"ACES_FILMIC_TONE_MAPPING",[El]:"AGX_TONE_MAPPING",[wl]:"NEUTRAL_TONE_MAPPING",[Tl]:"CUSTOM_TONE_MAPPING"};function Gm(i,t,e,n,s,r){let a=new Ve(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Ce;c.setAttribute("position",new ue([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ue([0,2,0,0,2,0],2));let u=new ma({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new ge(c,u),h=new Ji(-1,1,1,-1,0,1),d=null,m=null,v=!1,g,f=null,E=[],C=!1;this.setSize=function(S,M){a.setSize(S,M),o!==null&&o.setSize(S,M),l!==null&&l.setSize(S,M);for(let b=0;b<E.length;b++){let P=E[b];P.setSize&&P.setSize(S,M)}},this.setEffects=function(S){E=S,C=E.length>0&&E[0].isRenderPass===!0;let M=a.width,b=a.height;E.length>0&&o===null&&(o=new Ve(M,b,{type:gn,depthBuffer:!1,stencilBuffer:!1}),l=new Ve(M,b,{type:gn,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<E.length;P++){let x=E[P];x.setSize&&x.setSize(M,b)}},this.begin=function(S,M){if(v||S.toneMapping===pn&&E.length===0)return!1;if(f=M,M!==null){let b=M.width,P=M.height;(a.width!==b||a.height!==P)&&this.setSize(b,P)}return C===!1&&S.setRenderTarget(a),g=S.toneMapping,S.toneMapping=pn,!0},this.hasRenderPass=function(){return C},this.end=function(S,M){S.toneMapping=g,v=!0;let b=a,P=o;for(let x=0;x<E.length;x++){let w=E[x];w.enabled!==!1&&(w.render(S,P,b,M),w.needsSwap!==!1&&(b=P,P=P===o?l:o))}if(d!==S.outputColorSpace||m!==S.toneMapping){d=S.outputColorSpace,m=S.toneMapping,u.defines={},Wt.getTransfer(d)===Kt&&(u.defines.SRGB_TRANSFER="");let x=Vm[m];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=b.texture,S.setRenderTarget(f),S.render(p,h),f=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}var cu=new Be,Ql=new $n(1,1),hu=new Is,uu=new ia,du=new Hs,Wh=[],Xh=[],qh=new Float32Array(16),Yh=new Float32Array(9),$h=new Float32Array(4);function as(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Wh[s];if(r===void 0&&(r=new Float32Array(s),Wh[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Me(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function be(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Co(i,t){let e=Xh[t];e===void 0&&(e=new Int32Array(t),Xh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Hm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Wm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2fv(this.addr,t),be(e,t)}}function Xm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Me(e,t))return;i.uniform3fv(this.addr,t),be(e,t)}}function qm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4fv(this.addr,t),be(e,t)}}function Ym(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(Me(e,n))return;$h.set(n),i.uniformMatrix2fv(this.addr,!1,$h),be(e,n)}}function $m(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(Me(e,n))return;Yh.set(n),i.uniformMatrix3fv(this.addr,!1,Yh),be(e,n)}}function Zm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(Me(e,n))return;qh.set(n),i.uniformMatrix4fv(this.addr,!1,qh),be(e,n)}}function Jm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Km(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2iv(this.addr,t),be(e,t)}}function jm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;i.uniform3iv(this.addr,t),be(e,t)}}function Qm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4iv(this.addr,t),be(e,t)}}function tg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function eg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2uiv(this.addr,t),be(e,t)}}function ng(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;i.uniform3uiv(this.addr,t),be(e,t)}}function ig(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4uiv(this.addr,t),be(e,t)}}function sg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ql.compareFunction=e.isReversedDepthBuffer()?So:vo,r=Ql):r=cu,e.setTexture2D(t||r,s)}function rg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||uu,s)}function ag(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||du,s)}function og(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||hu,s)}function lg(i){switch(i){case 5126:return Hm;case 35664:return Wm;case 35665:return Xm;case 35666:return qm;case 35674:return Ym;case 35675:return $m;case 35676:return Zm;case 5124:case 35670:return Jm;case 35667:case 35671:return Km;case 35668:case 35672:return jm;case 35669:case 35673:return Qm;case 5125:return tg;case 36294:return eg;case 36295:return ng;case 36296:return ig;case 35678:case 36198:case 36298:case 36306:case 35682:return sg;case 35679:case 36299:case 36307:return rg;case 35680:case 36300:case 36308:case 36293:return ag;case 36289:case 36303:case 36311:case 36292:return og}}function cg(i,t){i.uniform1fv(this.addr,t)}function hg(i,t){let e=as(t,this.size,2);i.uniform2fv(this.addr,e)}function ug(i,t){let e=as(t,this.size,3);i.uniform3fv(this.addr,e)}function dg(i,t){let e=as(t,this.size,4);i.uniform4fv(this.addr,e)}function fg(i,t){let e=as(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function pg(i,t){let e=as(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function mg(i,t){let e=as(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function gg(i,t){i.uniform1iv(this.addr,t)}function _g(i,t){i.uniform2iv(this.addr,t)}function xg(i,t){i.uniform3iv(this.addr,t)}function yg(i,t){i.uniform4iv(this.addr,t)}function vg(i,t){i.uniform1uiv(this.addr,t)}function Sg(i,t){i.uniform2uiv(this.addr,t)}function Mg(i,t){i.uniform3uiv(this.addr,t)}function bg(i,t){i.uniform4uiv(this.addr,t)}function Tg(i,t,e){let n=this.cache,s=t.length,r=Co(e,s);Me(n,r)||(i.uniform1iv(this.addr,r),be(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ql:a=cu;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Eg(i,t,e){let n=this.cache,s=t.length,r=Co(e,s);Me(n,r)||(i.uniform1iv(this.addr,r),be(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||uu,r[a])}function wg(i,t,e){let n=this.cache,s=t.length,r=Co(e,s);Me(n,r)||(i.uniform1iv(this.addr,r),be(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||du,r[a])}function Ag(i,t,e){let n=this.cache,s=t.length,r=Co(e,s);Me(n,r)||(i.uniform1iv(this.addr,r),be(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||hu,r[a])}function Cg(i){switch(i){case 5126:return cg;case 35664:return hg;case 35665:return ug;case 35666:return dg;case 35674:return fg;case 35675:return pg;case 35676:return mg;case 5124:case 35670:return gg;case 35667:case 35671:return _g;case 35668:case 35672:return xg;case 35669:case 35673:return yg;case 5125:return vg;case 36294:return Sg;case 36295:return Mg;case 36296:return bg;case 35678:case 36198:case 36298:case 36306:case 35682:return Tg;case 35679:case 36299:case 36307:return Eg;case 35680:case 36300:case 36308:case 36293:return wg;case 36289:case 36303:case 36311:case 36292:return Ag}}var tc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=lg(e.type)}},ec=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Cg(e.type)}},nc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},Kl=/(\w+)(\])?(\[|\.)?/g;function Zh(i,t){i.seq.push(t),i.map[t.id]=t}function Rg(i,t,e){let n=i.name,s=n.length;for(Kl.lastIndex=0;;){let r=Kl.exec(n),a=Kl.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Zh(e,c===void 0?new tc(o,i,t):new ec(o,i,t));break}else{let p=e.map[o];p===void 0&&(p=new nc(o),Zh(e,p)),e=p}}}var rs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Rg(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function Jh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Pg=37297,Ig=0;function Lg(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Kh=new Ut;function Dg(i){Wt._getMatrix(Kh,Wt.workingColorSpace,i);let t=`mat3( ${Kh.elements.map(e=>e.toFixed(4))} )`;switch(Wt.getTransfer(i)){case Cs:return[t,"LinearTransferOETF"];case Kt:return[t,"sRGBTransferOETF"];default:return It("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function jh(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Lg(i.getShaderSource(t),o)}else return r}function Ng(i,t){let e=Dg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var Ug={[vl]:"Linear",[Sl]:"Reinhard",[Ml]:"Cineon",[bl]:"ACESFilmic",[El]:"AgX",[wl]:"Neutral",[Tl]:"Custom"};function Fg(i,t){let e=Ug[t];return e===void 0?(It("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var bo=new I;function Og(){Wt.getLuminanceCoefficients(bo);let i=bo.x.toFixed(4),t=bo.y.toFixed(4),e=bo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Bg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(mr).join(`
`)}function zg(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function kg(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function mr(i){return i!==""}function Qh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function tu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Vg=/^[ \t]*#include +<([\w\d./]+)>/gm;function ic(i){return i.replace(Vg,Hg)}var Gg=new Map;function Hg(i,t){let e=kt[t];if(e===void 0){let n=Gg.get(t);if(n!==void 0)e=kt[n],It('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return ic(e)}var Wg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function eu(i){return i.replace(Wg,Xg)}function Xg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function nu(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var qg={[ir]:"SHADOWMAP_TYPE_PCF",[Qi]:"SHADOWMAP_TYPE_VSM"};function Yg(i){return qg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var $g={[ei]:"ENVMAP_TYPE_CUBE",[pi]:"ENVMAP_TYPE_CUBE",[rr]:"ENVMAP_TYPE_CUBE_UV"};function Zg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":$g[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Jg={[pi]:"ENVMAP_MODE_REFRACTION"};function Kg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Jg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var jg={[yl]:"ENVMAP_BLENDING_MULTIPLY",[yh]:"ENVMAP_BLENDING_MIX",[vh]:"ENVMAP_BLENDING_ADD"};function Qg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":jg[i.combine]||"ENVMAP_BLENDING_NONE"}function t0(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function e0(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=Yg(e),c=Zg(e),u=Kg(e),p=Qg(e),h=t0(e),d=Bg(e),m=zg(r),v=s.createProgram(),g,f,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(mr).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(mr).join(`
`),f.length>0&&(f+=`
`)):(g=[nu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(mr).join(`
`),f=[nu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+p:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==pn?"#define TONE_MAPPING":"",e.toneMapping!==pn?kt.tonemapping_pars_fragment:"",e.toneMapping!==pn?Fg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,Ng("linearToOutputTexel",e.outputColorSpace),Og(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(mr).join(`
`)),a=ic(a),a=Qh(a,e),a=tu(a,e),o=ic(o),o=Qh(o,e),o=tu(o,e),a=eu(a),o=eu(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",e.glslVersion===Ul?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ul?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let C=E+g+a,S=E+f+o,M=Jh(s,s.VERTEX_SHADER,C),b=Jh(s,s.FRAGMENT_SHADER,S);s.attachShader(v,M),s.attachShader(v,b),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function P(F){if(i.debug.checkShaderErrors){let H=s.getProgramInfoLog(v)||"",W=s.getShaderInfoLog(M)||"",U=s.getShaderInfoLog(b)||"",z=H.trim(),j=W.trim(),K=U.trim(),rt=!0,Y=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(rt=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,M,b);else{let et=jh(s,M,"vertex"),it=jh(s,b,"fragment");Lt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+z+`
`+et+`
`+it)}else z!==""?It("WebGLProgram: Program Info Log:",z):(j===""||K==="")&&(Y=!1);Y&&(F.diagnostics={runnable:rt,programLog:z,vertexShader:{log:j,prefix:g},fragmentShader:{log:K,prefix:f}})}s.deleteShader(M),s.deleteShader(b),x=new rs(s,v),w=kg(s,v)}let x;this.getUniforms=function(){return x===void 0&&P(this),x};let w;this.getAttributes=function(){return w===void 0&&P(this),w};let N=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(v,Pg)),N},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ig++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=M,this.fragmentShader=b,this}var n0=0,sc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new rc(t),e.set(t,n)),n}},rc=class{constructor(t){this.id=n0++,this.code=t,this.usedTimes=0}};function i0(i){return i===si||i===ur||i===dr}function s0(i,t,e,n,s,r){let a=new Ls,o=new sc,l=new Set,c=[],u=new Map,p=n.logarithmicDepthBuffer,h=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return l.add(x),x===0?"uv":`uv${x}`}function v(x,w,N,F,H,W){let U=F.fog,z=H.geometry,j=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?F.environment:null,K=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,rt=t.get(x.envMap||j,K),Y=rt&&rt.mapping===rr?rt.image.height:null,et=d[x.type];x.precision!==null&&(h=n.getMaxPrecision(x.precision),h!==x.precision&&It("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));let it=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Pt=it!==void 0?it.length:0,At=0;z.morphAttributes.position!==void 0&&(At=1),z.morphAttributes.normal!==void 0&&(At=2),z.morphAttributes.color!==void 0&&(At=3);let jt,Gt,qt,Z;if(et){let ae=wn[et];jt=ae.vertexShader,Gt=ae.fragmentShader}else{jt=x.vertexShader,Gt=x.fragmentShader;let ae=o.getVertexShaderStage(x),Zt=o.getFragmentShaderStage(x);o.update(x,ae,Zt),qt=ae.id,Z=Zt.id}let J=i.getRenderTarget(),yt=i.state.buffers.depth.getReversed(),Dt=H.isInstancedMesh===!0,vt=H.isBatchedMesh===!0,Ft=!!x.map,fe=!!x.matcap,Ot=!!rt,Xt=!!x.aoMap,Qt=!!x.lightMap,Vt=!!x.bumpMap&&x.wireframe===!1,ie=!!x.normalMap,pe=!!x.displacementMap,Re=!!x.emissiveMap,le=!!x.metalnessMap,me=!!x.roughnessMap,D=x.anisotropy>0,_e=x.clearcoat>0,$t=x.dispersion>0,T=x.retroreflectivity>0,_=x.iridescence>0,O=x.sheen>0,B=x.transmission>0,q=D&&!!x.anisotropyMap,ot=_e&&!!x.clearcoatMap,ct=_e&&!!x.clearcoatNormalMap,$=_e&&!!x.clearcoatRoughnessMap,Q=_&&!!x.iridescenceMap,ht=_&&!!x.iridescenceThicknessMap,Et=O&&!!x.sheenColorMap,dt=O&&!!x.sheenRoughnessMap,R=!!x.specularMap,G=!!x.specularColorMap,nt=!!x.specularIntensityMap,at=B&&!!x.transmissionMap,A=B&&!!x.thicknessMap,lt=!!x.gradientMap,tt=!!x.alphaMap,ft=x.alphaTest>0,xt=!!x.alphaHash,st=!!x.extensions,Rt=pn;x.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Rt=i.toneMapping);let wt={shaderID:et,shaderType:x.type,shaderName:x.name,vertexShader:jt,fragmentShader:Gt,defines:x.defines,customVertexShaderID:qt,customFragmentShaderID:Z,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:vt,batchingColor:vt&&H._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&H.instanceColor!==null,instancingMorph:Dt&&H.morphTexture!==null,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Wt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ft,matcap:fe,envMap:Ot,envMapMode:Ot&&rt.mapping,envMapCubeUVHeight:Y,aoMap:Xt,lightMap:Qt,bumpMap:Vt,normalMap:ie,displacementMap:pe,emissiveMap:Re,normalMapObjectSpace:ie&&x.normalMapType===bh,normalMapTangentSpace:ie&&x.normalMapType===yo,packedNormalMap:ie&&x.normalMapType===yo&&i0(x.normalMap.format),metalnessMap:le,roughnessMap:me,anisotropy:D,anisotropyMap:q,clearcoat:_e,clearcoatMap:ot,clearcoatNormalMap:ct,clearcoatRoughnessMap:$,dispersion:$t,retroreflection:T,iridescence:_,iridescenceMap:Q,iridescenceThicknessMap:ht,sheen:O,sheenColorMap:Et,sheenRoughnessMap:dt,specularMap:R,specularColorMap:G,specularIntensityMap:nt,transmission:B,transmissionMap:at,thicknessMap:A,gradientMap:lt,opaque:x.transparent===!1&&x.blending===ts&&x.alphaToCoverage===!1,alphaMap:tt,alphaTest:ft,alphaHash:xt,combine:x.combine,mapUv:Ft&&m(x.map.channel),aoMapUv:Xt&&m(x.aoMap.channel),lightMapUv:Qt&&m(x.lightMap.channel),bumpMapUv:Vt&&m(x.bumpMap.channel),normalMapUv:ie&&m(x.normalMap.channel),displacementMapUv:pe&&m(x.displacementMap.channel),emissiveMapUv:Re&&m(x.emissiveMap.channel),metalnessMapUv:le&&m(x.metalnessMap.channel),roughnessMapUv:me&&m(x.roughnessMap.channel),anisotropyMapUv:q&&m(x.anisotropyMap.channel),clearcoatMapUv:ot&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:ct&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:ht&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Et&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:dt&&m(x.sheenRoughnessMap.channel),specularMapUv:R&&m(x.specularMap.channel),specularColorMapUv:G&&m(x.specularColorMap.channel),specularIntensityMapUv:nt&&m(x.specularIntensityMap.channel),transmissionMapUv:at&&m(x.transmissionMap.channel),thicknessMapUv:A&&m(x.thicknessMap.channel),alphaMapUv:tt&&m(x.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(ie||D),vertexNormals:!!z.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!z.attributes.uv&&(Ft||tt),fog:!!U,useFog:x.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||z.attributes.normal===void 0&&ie===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:yt,skinning:H.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Pt,morphTextureStride:At,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:Rt,decodeVideoTexture:Ft&&x.map.isVideoTexture===!0&&Wt.getTransfer(x.map.colorSpace)===Kt,decodeVideoTextureEmissive:Re&&x.emissiveMap.isVideoTexture===!0&&Wt.getTransfer(x.emissiveMap.colorSpace)===Kt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===je,flipSided:x.side===ze,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:st&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&x.extensions.multiDraw===!0||vt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return wt.vertexUv1s=l.has(1),wt.vertexUv2s=l.has(2),wt.vertexUv3s=l.has(3),l.clear(),wt}function g(x){let w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(let N in x.defines)w.push(N),w.push(x.defines[N]);return x.isRawShaderMaterial===!1&&(f(w,x),E(w,x),w.push(i.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function f(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numSunLights),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numSunLightShadows),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function E(x,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function C(x){let w=d[x.type],N;if(w){let F=wn[w];N=Oh.clone(F.uniforms)}else N=x.uniforms;return N}function S(x,w){let N=u.get(w);return N!==void 0?++N.usedTimes:(N=new e0(i,w,x,s),c.push(N),u.set(w,N)),N}function M(x){if(--x.usedTimes===0){let w=c.indexOf(x);c[w]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function b(x){o.remove(x)}function P(){o.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:C,acquireProgram:S,releaseProgram:M,releaseShaderCache:b,programs:c,dispose:P}}function r0(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function a0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function iu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function su(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function o(h,d,m,v,g,f){let E=i[t];return E===void 0?(E={id:h.id,object:h,geometry:d,material:m,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:g,group:f},i[t]=E):(E.id=h.id,E.object=h,E.geometry=d,E.material=m,E.materialVariant=a(h),E.groupOrder=v,E.renderOrder=h.renderOrder,E.z=g,E.group=f),t++,E}function l(h,d,m,v,g,f,E){E.reversedDepth===!0&&(g=-g);let C=o(h,d,m,v,g,f);m.transmission>0?n.push(C):m.transparent===!0?s.push(C):e.push(C)}function c(h,d,m,v,g,f){let E=o(h,d,m,v,g,f);m.transmission>0?n.unshift(E):m.transparent===!0?s.unshift(E):e.unshift(E)}function u(h,d){e.length>1&&e.sort(h||a0),n.length>1&&n.sort(d||iu),s.length>1&&s.sort(d||iu)}function p(){for(let h=t,d=i.length;h<d;h++){let m=i[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:p,sort:u}}function o0(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new su,i.set(n,[a])):s>=r.length?(a=new su,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function l0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new I,color:new Nt};break;case"SpotLight":e={position:new I,direction:new I,color:new Nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Nt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Nt,groundColor:new Nt};break;case"RectAreaLight":e={color:new Nt,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function c0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var h0=0;function u0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function d0(i){let t=new l0,e=c0(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);let s=new I,r=new ee,a=new ee;function o(c){let u=0,p=0,h=0;for(let H=0;H<9;H++)n.probe[H].set(0,0,0);let d=0,m=0,v=0,g=0,f=0,E=0,C=0,S=0,M=0,b=0,P=0,x=0,w=0,N=0;c.sort(u0);for(let H=0,W=c.length;H<W;H++){let U=c[H],z=U.color,j=U.intensity,K=U.distance,rt=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===si?rt=U.shadow.map.texture:rt=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)u+=z.r*j,p+=z.g*j,h+=z.b*j;else if(U.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(U.sh.coefficients[Y],j);N++}else if(U.isSunLight){let Y=t.get(U);if(Y.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let et=U.shadow,it=e.get(U);it.shadowIntensity=et.intensity,it.shadowBias=et.bias,it.shadowNormalBias=et.normalBias,it.shadowRadius=et.radius,it.shadowMapSize.copy(et.mapSize).multiply(et.getFrameExtents()),n.sunShadow[m]=it,n.sunShadowMap[m]=rt;let Pt=et.getViewportCount();for(let At=0;At<Pt;At++)n.sunShadowMatrix[v+At]=et.getMatrix(At),n.sunShadowCascade[v+At]=et._cascadeData[At];v+=Pt,m++}n.sun[d]=Y,d++}else if(U.isDirectionalLight){let Y=t.get(U);if(Y.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let et=U.shadow,it=e.get(U);it.shadowIntensity=et.intensity,it.shadowBias=et.bias,it.shadowNormalBias=et.normalBias,it.shadowRadius=et.radius,it.shadowMapSize=et.mapSize,n.directionalShadow[g]=it,n.directionalShadowMap[g]=rt,n.directionalShadowMatrix[g]=U.shadow.matrix,M++}n.directional[g]=Y,g++}else if(U.isSpotLight){let Y=t.get(U);Y.position.setFromMatrixPosition(U.matrixWorld),Y.color.copy(z).multiplyScalar(j),Y.distance=K,Y.coneCos=Math.cos(U.angle),Y.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),Y.decay=U.decay,n.spot[E]=Y;let et=U.shadow;if(U.map&&(n.spotLightMap[x]=U.map,x++,et.updateMatrices(U),U.castShadow&&w++),n.spotLightMatrix[E]=et.matrix,U.castShadow){let it=e.get(U);it.shadowIntensity=et.intensity,it.shadowBias=et.bias,it.shadowNormalBias=et.normalBias,it.shadowRadius=et.radius,it.shadowMapSize=et.mapSize,n.spotShadow[E]=it,n.spotShadowMap[E]=rt,P++}E++}else if(U.isRectAreaLight){let Y=t.get(U);Y.color.copy(z).multiplyScalar(j),Y.halfWidth.set(U.width*.5,0,0),Y.halfHeight.set(0,U.height*.5,0),n.rectArea[C]=Y,C++}else if(U.isPointLight){let Y=t.get(U);if(Y.color.copy(U.color).multiplyScalar(U.intensity),Y.distance=U.distance,Y.decay=U.decay,U.castShadow){let et=U.shadow,it=e.get(U);it.shadowIntensity=et.intensity,it.shadowBias=et.bias,it.shadowNormalBias=et.normalBias,it.shadowRadius=et.radius,it.shadowMapSize=et.mapSize,it.shadowCameraNear=et.camera.near,it.shadowCameraFar=et.camera.far,n.pointShadow[f]=it,n.pointShadowMap[f]=rt,n.pointShadowMatrix[f]=U.shadow.matrix,b++}n.point[f]=Y,f++}else if(U.isHemisphereLight){let Y=t.get(U);Y.skyColor.copy(U.color).multiplyScalar(j),Y.groundColor.copy(U.groundColor).multiplyScalar(j),n.hemi[S]=Y,S++}}C>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=p,n.ambient[2]=h;let F=n.hash;(F.sunLength!==d||F.directionalLength!==g||F.pointLength!==f||F.spotLength!==E||F.rectAreaLength!==C||F.hemiLength!==S||F.numSunShadows!==m||F.numDirectionalShadows!==M||F.numPointShadows!==b||F.numSpotShadows!==P||F.numSpotMaps!==x||F.numLightProbes!==N)&&(n.sun.length=d,n.directional.length=g,n.spot.length=E,n.rectArea.length=C,n.point.length=f,n.hemi.length=S,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=P,n.spotShadowMap.length=P,n.spotLightMatrix.length=P+x-w,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=N,F.sunLength=d,F.directionalLength=g,F.pointLength=f,F.spotLength=E,F.rectAreaLength=C,F.hemiLength=S,F.numSunShadows=m,F.numDirectionalShadows=M,F.numPointShadows=b,F.numSpotShadows=P,F.numSpotMaps=x,F.numLightProbes=N,n.version=h0++)}function l(c,u){let p=0,h=0,d=0,m=0,v=0,g=0,f=u.matrixWorldInverse;for(let E=0,C=c.length;E<C;E++){let S=c[E];if(S.isSunLight){let M=n.sun[p];M.direction.setFromMatrixPosition(S.matrixWorld),M.direction.transformDirection(f),p++}else if(S.isDirectionalLight){let M=n.directional[h];M.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(f),h++}else if(S.isSpotLight){let M=n.spot[m];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(f),M.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(f),m++}else if(S.isRectAreaLight){let M=n.rectArea[v];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(f),a.identity(),r.copy(S.matrixWorld),r.premultiply(f),a.extractRotation(r),M.halfWidth.set(S.width*.5,0,0),M.halfHeight.set(0,S.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),v++}else if(S.isPointLight){let M=n.point[d];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(f),d++}else if(S.isHemisphereLight){let M=n.hemi[g];M.direction.setFromMatrixPosition(S.matrixWorld),M.direction.transformDirection(f),g++}}}return{setup:o,setupView:l,state:n}}function ru(i){let t=new d0(i),e=[],n=[],s=[];function r(h){p.camera=h,e.length=0,n.length=0,s.length=0}function a(h){e.push(h)}function o(h){n.push(h)}function l(h){s.push(h)}function c(){t.setup(e)}function u(h){t.setupView(e,h)}let p={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function f0(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new ru(i),t.set(s,[o])):r>=a.length?(o=new ru(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var p0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,m0=`uniform sampler2D shadow_pass;
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
}`,g0=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],_0=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],au=new ee,pr=new I,jl=new I;function x0(i,t,e){let n=new qi,s=new _t,r=new _t,a=new de,o=new ga,l=new _a,c={},u=e.maxTextureSize,p={[ti]:ze,[ze]:ti,[je]:je},h=new Ze({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _t},radius:{value:4}},vertexShader:p0,fragmentShader:m0}),d=h.clone();d.defines.HORIZONTAL_PASS=1;let m=new Ce;m.setAttribute("position",new ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new ge(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ir;let f=this.type;this.render=function(b,P,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===th&&(It("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ir);let w=i.getRenderTarget(),N=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),H=i.state;H.setBlending(bn),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let W=f!==this.type;W&&P.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(z=>z.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,z=b.length;U<z;U++){let j=b[U],K=j.shadow;if(K===void 0){It("WebGLShadowMap:",j,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);let rt=K.getFrameExtents();s.multiply(rt),r.copy(K.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/rt.x),s.x=r.x*rt.x,K.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/rt.y),s.y=r.y*rt.y,K.mapSize.y=r.y));let Y=i.state.buffers.depth.getReversed();if(K.camera._reversedDepth=Y,K.map===null||W===!0){if(K.map!==null&&(K.map.depthTexture!==null&&(K.map.depthTexture.dispose(),K.map.depthTexture=null),K.map.dispose()),this.type===Qi){if(j.isPointLight){It("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}K.map=new Ve(s.x,s.y,{format:si,type:gn,minFilter:Pe,magFilter:Pe,generateMipmaps:!1}),K.map.texture.name=j.name+".shadowMap",K.map.depthTexture=new $n(s.x,s.y,nn),K.map.depthTexture.name=j.name+".shadowMapDepth",K.map.depthTexture.format=Sn,K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Ae,K.map.depthTexture.magFilter=Ae}else j.isPointLight?(K.map=new Eo(s.x),K.map.depthTexture=new oa(s.x,mn)):(K.map=new Ve(s.x,s.y),K.map.depthTexture=new $n(s.x,s.y,mn)),K.map.depthTexture.name=j.name+".shadowMap",K.map.depthTexture.format=Sn,this.type===ir?(K.map.depthTexture.compareFunction=Y?So:vo,K.map.depthTexture.minFilter=Pe,K.map.depthTexture.magFilter=Pe):(K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Ae,K.map.depthTexture.magFilter=Ae);K.camera.updateProjectionMatrix()}K.map.isWebGLCubeRenderTarget!==!0&&(K.map.width!==s.x||K.map.height!==s.y)&&K.map.setSize(s.x,s.y);let et=K.map.isWebGLCubeRenderTarget?6:K.getViewportCount();j.isPointLight!==!0&&K.updateMatrices(j,x);for(let it=0;it<et;it++){let Pt=K.getCamera(it);if(j.isPointLight){let At=K.camera,jt=K.matrix,Gt=j.distance||At.far;Gt!==At.far&&(At.far=Gt,At.updateProjectionMatrix()),pr.setFromMatrixPosition(j.matrixWorld),At.position.copy(pr),jl.copy(At.position),jl.add(g0[it]),At.up.copy(_0[it]),At.lookAt(jl),At.updateMatrixWorld(),jt.makeTranslation(-pr.x,-pr.y,-pr.z),au.multiplyMatrices(At.projectionMatrix,At.matrixWorldInverse),K._frustum.setFromProjectionMatrix(au,At.coordinateSystem,At.reversedDepth)}if(K.map.isWebGLCubeRenderTarget)i.setRenderTarget(K.map,it),i.clear();else{it===0&&(i.setRenderTarget(K.map),i.clear());let At=K.getViewport(it);a.set(r.x*At.x,r.y*At.y,r.x*At.z,r.y*At.w),H.viewport(a)}n=K.getFrustum(it),S(P,x,Pt,j,this.type)}K.isPointLightShadow!==!0&&this.type===Qi&&E(K,x),K.needsUpdate=!1}f=this.type,g.needsUpdate=!1,i.setRenderTarget(w,N,F)};function E(b,P){let x=t.update(v);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null?b.mapPass=new Ve(s.x,s.y,{format:si,type:gn}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),h.uniforms.shadow_pass.value=b.map.depthTexture,h.uniforms.resolution.value.set(b.map.width,b.map.height),h.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(P,null,x,h,v,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(P,null,x,d,v,null)}function C(b,P,x,w){let N=null,F=x.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(F!==void 0)N=F;else if(N=x.isPointLight===!0?l:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let H=N.uuid,W=P.uuid,U=c[H];U===void 0&&(U={},c[H]=U);let z=U[W];z===void 0&&(z=N.clone(),U[W]=z,P.addEventListener("dispose",M)),N=z}if(N.visible=P.visible,N.wireframe=P.wireframe,w===Qi?N.side=P.shadowSide!==null?P.shadowSide:P.side:N.side=P.shadowSide!==null?P.shadowSide:p[P.side],N.alphaMap=P.alphaMap,N.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,N.map=P.map,N.clipShadows=P.clipShadows,N.clippingPlanes=P.clippingPlanes,N.clipIntersection=P.clipIntersection,N.displacementMap=P.displacementMap,N.displacementScale=P.displacementScale,N.displacementBias=P.displacementBias,N.wireframeLinewidth=P.wireframeLinewidth,N.linewidth=P.linewidth,x.isPointLight===!0&&N.isMeshDistanceMaterial===!0){let H=i.properties.get(N);H.light=x}return N}function S(b,P,x,w,N){if(b.visible===!1)return;if(b.layers.test(P.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&N===Qi)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,b.matrixWorld);let W=t.update(b),U=b.material;if(Array.isArray(U)){let z=W.groups;for(let j=0,K=z.length;j<K;j++){let rt=z[j],Y=U[rt.materialIndex];if(Y&&Y.visible){let et=C(b,Y,w,N);b.onBeforeShadow(i,b,P,x,W,et,rt),i.renderBufferDirect(x,null,W,et,b,rt),b.onAfterShadow(i,b,P,x,W,et,rt)}}}else if(U.visible){let z=C(b,U,w,N);b.onBeforeShadow(i,b,P,x,W,z,null),i.renderBufferDirect(x,null,W,z,b,null),b.onAfterShadow(i,b,P,x,W,z,null)}}let H=b.children;for(let W=0,U=H.length;W<U;W++)S(H[W],P,x,w,N)}function M(b){b.target.removeEventListener("dispose",M);for(let x in c){let w=c[x],N=b.target.uuid;N in w&&(w[N].dispose(),delete w[N])}}}function y0(i,t){function e(){let A=!1,lt=new de,tt=null,ft=new de(0,0,0,0);return{setMask:function(xt){tt!==xt&&!A&&(i.colorMask(xt,xt,xt,xt),tt=xt)},setLocked:function(xt){A=xt},setClear:function(xt,st,Rt,wt,ae){ae===!0&&(xt*=wt,st*=wt,Rt*=wt),lt.set(xt,st,Rt,wt),ft.equals(lt)===!1&&(i.clearColor(xt,st,Rt,wt),ft.copy(lt))},reset:function(){A=!1,tt=null,ft.set(-1,0,0,0)}}}function n(){let A=!1,lt=!1,tt=null,ft=null,xt=null;return{setReversed:function(st){if(lt!==st){let Rt=t.get("EXT_clip_control");st?Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.ZERO_TO_ONE_EXT):Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.NEGATIVE_ONE_TO_ONE_EXT),lt=st;let wt=xt;xt=null,this.setClear(wt)}},getReversed:function(){return lt},setTest:function(st){st?J(i.DEPTH_TEST):yt(i.DEPTH_TEST)},setMask:function(st){tt!==st&&!A&&(i.depthMask(st),tt=st)},setFunc:function(st){if(lt&&(st=Nh[st]),ft!==st){switch(st){case Xr:i.depthFunc(i.NEVER);break;case qr:i.depthFunc(i.ALWAYS);break;case Yr:i.depthFunc(i.LESS);break;case zi:i.depthFunc(i.LEQUAL);break;case $r:i.depthFunc(i.EQUAL);break;case Zr:i.depthFunc(i.GEQUAL);break;case Jr:i.depthFunc(i.GREATER);break;case Kr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ft=st}},setLocked:function(st){A=st},setClear:function(st){xt!==st&&(xt=st,lt&&(st=1-st),i.clearDepth(st))},reset:function(){A=!1,tt=null,ft=null,xt=null,lt=!1}}}function s(){let A=!1,lt=null,tt=null,ft=null,xt=null,st=null,Rt=null,wt=null,ae=null;return{setTest:function(Zt){A||(Zt?J(i.STENCIL_TEST):yt(i.STENCIL_TEST))},setMask:function(Zt){lt!==Zt&&!A&&(i.stencilMask(Zt),lt=Zt)},setFunc:function(Zt,rn,_n){(tt!==Zt||ft!==rn||xt!==_n)&&(i.stencilFunc(Zt,rn,_n),tt=Zt,ft=rn,xt=_n)},setOp:function(Zt,rn,_n){(st!==Zt||Rt!==rn||wt!==_n)&&(i.stencilOp(Zt,rn,_n),st=Zt,Rt=rn,wt=_n)},setLocked:function(Zt){A=Zt},setClear:function(Zt){ae!==Zt&&(i.clearStencil(Zt),ae=Zt)},reset:function(){A=!1,lt=null,tt=null,ft=null,xt=null,st=null,Rt=null,wt=null,ae=null}}}let r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap,u={},p={},h={},d=new WeakMap,m=[],v=null,g=!1,f=null,E=null,C=null,S=null,M=null,b=null,P=null,x=new Nt(0,0,0),w=0,N=!1,F=null,H=null,W=null,U=null,z=null,j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),K=!1,rt=0,Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(rt=parseFloat(/^WebGL (\d)/.exec(Y)[1]),K=rt>=1):Y.indexOf("OpenGL ES")!==-1&&(rt=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),K=rt>=2);let et=null,it={},Pt=i.getParameter(i.SCISSOR_BOX),At=i.getParameter(i.VIEWPORT),jt=new de().fromArray(Pt),Gt=new de().fromArray(At);function qt(A,lt,tt,ft){let xt=new Uint8Array(4),st=i.createTexture();i.bindTexture(A,st),i.texParameteri(A,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(A,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Rt=0;Rt<tt;Rt++)A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY?i.texImage3D(lt,0,i.RGBA,1,1,ft,0,i.RGBA,i.UNSIGNED_BYTE,xt):i.texImage2D(lt+Rt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xt);return st}let Z={};Z[i.TEXTURE_2D]=qt(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=qt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=qt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=qt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),J(i.DEPTH_TEST),a.setFunc(zi),Vt(!1),ie(pl),J(i.CULL_FACE),Xt(bn);function J(A){u[A]!==!0&&(i.enable(A),u[A]=!0)}function yt(A){u[A]!==!1&&(i.disable(A),u[A]=!1)}function Dt(A,lt){return h[A]!==lt?(i.bindFramebuffer(A,lt),h[A]=lt,A===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=lt),A===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=lt),!0):!1}function vt(A,lt){let tt=m,ft=!1;if(A){tt=d.get(lt),tt===void 0&&(tt=[],d.set(lt,tt));let xt=A.textures;if(tt.length!==xt.length||tt[0]!==i.COLOR_ATTACHMENT0){for(let st=0,Rt=xt.length;st<Rt;st++)tt[st]=i.COLOR_ATTACHMENT0+st;tt.length=xt.length,ft=!0}}else tt[0]!==i.BACK&&(tt[0]=i.BACK,ft=!0);ft&&i.drawBuffers(tt)}function Ft(A){return v!==A?(i.useProgram(A),v=A,!0):!1}let fe={[fi]:i.FUNC_ADD,[nh]:i.FUNC_SUBTRACT,[ih]:i.FUNC_REVERSE_SUBTRACT};fe[sh]=i.MIN,fe[rh]=i.MAX;let Ot={[ah]:i.ZERO,[oh]:i.ONE,[lh]:i.SRC_COLOR,[_l]:i.SRC_ALPHA,[ph]:i.SRC_ALPHA_SATURATE,[dh]:i.DST_COLOR,[hh]:i.DST_ALPHA,[ch]:i.ONE_MINUS_SRC_COLOR,[xl]:i.ONE_MINUS_SRC_ALPHA,[fh]:i.ONE_MINUS_DST_COLOR,[uh]:i.ONE_MINUS_DST_ALPHA,[mh]:i.CONSTANT_COLOR,[gh]:i.ONE_MINUS_CONSTANT_COLOR,[_h]:i.CONSTANT_ALPHA,[xh]:i.ONE_MINUS_CONSTANT_ALPHA};function Xt(A,lt,tt,ft,xt,st,Rt,wt,ae,Zt){if(A===bn){g===!0&&(yt(i.BLEND),g=!1);return}if(g===!1&&(J(i.BLEND),g=!0),A!==eh){if(A!==f||Zt!==N){if((E!==fi||M!==fi)&&(i.blendEquation(i.FUNC_ADD),E=fi,M=fi),Zt)switch(A){case ts:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case sr:i.blendFunc(i.ONE,i.ONE);break;case ml:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case gl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Lt("WebGLState: Invalid blending: ",A);break}else switch(A){case ts:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case sr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ml:Lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gl:Lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Lt("WebGLState: Invalid blending: ",A);break}C=null,S=null,b=null,P=null,x.set(0,0,0),w=0,f=A,N=Zt}return}xt=xt||lt,st=st||tt,Rt=Rt||ft,(lt!==E||xt!==M)&&(i.blendEquationSeparate(fe[lt],fe[xt]),E=lt,M=xt),(tt!==C||ft!==S||st!==b||Rt!==P)&&(i.blendFuncSeparate(Ot[tt],Ot[ft],Ot[st],Ot[Rt]),C=tt,S=ft,b=st,P=Rt),(wt.equals(x)===!1||ae!==w)&&(i.blendColor(wt.r,wt.g,wt.b,ae),x.copy(wt),w=ae),f=A,N=!1}function Qt(A,lt){A.side===je?yt(i.CULL_FACE):J(i.CULL_FACE);let tt=A.side===ze;lt&&(tt=!tt),Vt(tt),A.blending===ts&&A.transparent===!1?Xt(bn):Xt(A.blending,A.blendEquation,A.blendSrc,A.blendDst,A.blendEquationAlpha,A.blendSrcAlpha,A.blendDstAlpha,A.blendColor,A.blendAlpha,A.premultipliedAlpha),a.setFunc(A.depthFunc),a.setTest(A.depthTest),a.setMask(A.depthWrite),r.setMask(A.colorWrite);let ft=A.stencilWrite;o.setTest(ft),ft&&(o.setMask(A.stencilWriteMask),o.setFunc(A.stencilFunc,A.stencilRef,A.stencilFuncMask),o.setOp(A.stencilFail,A.stencilZFail,A.stencilZPass)),Re(A.polygonOffset,A.polygonOffsetFactor,A.polygonOffsetUnits),A.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):yt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Vt(A){F!==A&&(A?i.frontFace(i.CW):i.frontFace(i.CCW),F=A)}function ie(A){A!==jc?(J(i.CULL_FACE),A!==H&&(A===pl?i.cullFace(i.BACK):A===Qc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):yt(i.CULL_FACE),H=A}function pe(A){A!==W&&(K&&i.lineWidth(A),W=A)}function Re(A,lt,tt){A?(J(i.POLYGON_OFFSET_FILL),(U!==lt||z!==tt)&&(U=lt,z=tt,a.getReversed()&&(lt=-lt),i.polygonOffset(lt,tt))):yt(i.POLYGON_OFFSET_FILL)}function le(A){A?J(i.SCISSOR_TEST):yt(i.SCISSOR_TEST)}function me(A){A===void 0&&(A=i.TEXTURE0+j-1),et!==A&&(i.activeTexture(A),et=A)}function D(A,lt,tt){tt===void 0&&(et===null?tt=i.TEXTURE0+j-1:tt=et);let ft=it[tt];ft===void 0&&(ft={type:void 0,texture:void 0},it[tt]=ft),(ft.type!==A||ft.texture!==lt)&&(et!==tt&&(i.activeTexture(tt),et=tt),i.bindTexture(A,lt||Z[A]),ft.type=A,ft.texture=lt)}function _e(){let A=it[et];A!==void 0&&A.type!==void 0&&(i.bindTexture(A.type,null),A.type=void 0,A.texture=void 0)}function $t(){try{i.compressedTexImage2D(...arguments)}catch(A){Lt("WebGLState:",A)}}function T(){try{i.compressedTexImage3D(...arguments)}catch(A){Lt("WebGLState:",A)}}function _(){try{i.texSubImage2D(...arguments)}catch(A){Lt("WebGLState:",A)}}function O(){try{i.texSubImage3D(...arguments)}catch(A){Lt("WebGLState:",A)}}function B(){try{i.compressedTexSubImage2D(...arguments)}catch(A){Lt("WebGLState:",A)}}function q(){try{i.compressedTexSubImage3D(...arguments)}catch(A){Lt("WebGLState:",A)}}function ot(){try{i.texStorage2D(...arguments)}catch(A){Lt("WebGLState:",A)}}function ct(){try{i.texStorage3D(...arguments)}catch(A){Lt("WebGLState:",A)}}function $(){try{i.texImage2D(...arguments)}catch(A){Lt("WebGLState:",A)}}function Q(){try{i.texImage3D(...arguments)}catch(A){Lt("WebGLState:",A)}}function ht(A){return p[A]!==void 0?p[A]:i.getParameter(A)}function Et(A,lt){p[A]!==lt&&(i.pixelStorei(A,lt),p[A]=lt)}function dt(A){jt.equals(A)===!1&&(i.scissor(A.x,A.y,A.z,A.w),jt.copy(A))}function R(A){Gt.equals(A)===!1&&(i.viewport(A.x,A.y,A.z,A.w),Gt.copy(A))}function G(A,lt){let tt=c.get(lt);tt===void 0&&(tt=new WeakMap,c.set(lt,tt));let ft=tt.get(A);ft===void 0&&(ft=i.getUniformBlockIndex(lt,A.name),tt.set(A,ft))}function nt(A,lt){let ft=c.get(lt).get(A);l.get(lt)!==ft&&(i.uniformBlockBinding(lt,ft,A.__bindingPointIndex),l.set(lt,ft))}function at(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},p={},et=null,it={},h={},d=new WeakMap,m=[],v=null,g=!1,f=null,E=null,C=null,S=null,M=null,b=null,P=null,x=new Nt(0,0,0),w=0,N=!1,F=null,H=null,W=null,U=null,z=null,jt.set(0,0,i.canvas.width,i.canvas.height),Gt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:J,disable:yt,bindFramebuffer:Dt,drawBuffers:vt,useProgram:Ft,setBlending:Xt,setMaterial:Qt,setFlipSided:Vt,setCullFace:ie,setLineWidth:pe,setPolygonOffset:Re,setScissorTest:le,activeTexture:me,bindTexture:D,unbindTexture:_e,compressedTexImage2D:$t,compressedTexImage3D:T,texImage2D:$,texImage3D:Q,pixelStorei:Et,getParameter:ht,updateUBOMapping:G,uniformBlockBinding:nt,texStorage2D:ot,texStorage3D:ct,texSubImage2D:_,texSubImage3D:O,compressedTexSubImage2D:B,compressedTexSubImage3D:q,scissor:dt,viewport:R,reset:at}}function v0(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new _t,u=new WeakMap,p=new Set,h,d=new WeakMap,m=!1;try{m=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(T,_){return m?new OffscreenCanvas(T,_):Rs("canvas")}function g(T,_,O){let B=1,q=$t(T);if((q.width>O||q.height>O)&&(B=O/Math.max(q.width,q.height)),B<1)if(typeof HTMLImageElement!="undefined"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&T instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&T instanceof ImageBitmap||typeof VideoFrame!="undefined"&&T instanceof VideoFrame){let ot=Math.floor(B*q.width),ct=Math.floor(B*q.height);h===void 0&&(h=v(ot,ct));let $=_?v(ot,ct):h;return $.width=ot,$.height=ct,$.getContext("2d").drawImage(T,0,0,ot,ct),It("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+ot+"x"+ct+")."),$}else return"data"in T&&It("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),T;return T}function f(T){return T.generateMipmaps}function E(T){i.generateMipmap(T)}function C(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(T,_,O,B,q,ot=!1){if(T!==null){if(i[T]!==void 0)return i[T];It("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ct;B&&(ct=t.get("EXT_texture_norm16"),ct||It("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=_;if(_===i.RED&&(O===i.FLOAT&&($=i.R32F),O===i.HALF_FLOAT&&($=i.R16F),O===i.UNSIGNED_BYTE&&($=i.R8),O===i.UNSIGNED_SHORT&&ct&&($=ct.R16_EXT),O===i.SHORT&&ct&&($=ct.R16_SNORM_EXT)),_===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.R8UI),O===i.UNSIGNED_SHORT&&($=i.R16UI),O===i.UNSIGNED_INT&&($=i.R32UI),O===i.BYTE&&($=i.R8I),O===i.SHORT&&($=i.R16I),O===i.INT&&($=i.R32I)),_===i.RG&&(O===i.FLOAT&&($=i.RG32F),O===i.HALF_FLOAT&&($=i.RG16F),O===i.UNSIGNED_BYTE&&($=i.RG8),O===i.UNSIGNED_SHORT&&ct&&($=ct.RG16_EXT),O===i.SHORT&&ct&&($=ct.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RG8UI),O===i.UNSIGNED_SHORT&&($=i.RG16UI),O===i.UNSIGNED_INT&&($=i.RG32UI),O===i.BYTE&&($=i.RG8I),O===i.SHORT&&($=i.RG16I),O===i.INT&&($=i.RG32I)),_===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RGB8UI),O===i.UNSIGNED_SHORT&&($=i.RGB16UI),O===i.UNSIGNED_INT&&($=i.RGB32UI),O===i.BYTE&&($=i.RGB8I),O===i.SHORT&&($=i.RGB16I),O===i.INT&&($=i.RGB32I)),_===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RGBA8UI),O===i.UNSIGNED_SHORT&&($=i.RGBA16UI),O===i.UNSIGNED_INT&&($=i.RGBA32UI),O===i.BYTE&&($=i.RGBA8I),O===i.SHORT&&($=i.RGBA16I),O===i.INT&&($=i.RGBA32I)),_===i.RGB&&(O===i.UNSIGNED_SHORT&&ct&&($=ct.RGB16_EXT),O===i.SHORT&&ct&&($=ct.RGB16_SNORM_EXT),O===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),_===i.RGBA){let Q=ot?Cs:Wt.getTransfer(q);O===i.FLOAT&&($=i.RGBA32F),O===i.HALF_FLOAT&&($=i.RGBA16F),O===i.UNSIGNED_BYTE&&($=Q===Kt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT&&ct&&($=ct.RGBA16_EXT),O===i.SHORT&&ct&&($=ct.RGBA16_SNORM_EXT),O===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function M(T,_){let O;return T?_===null||_===mn||_===ns?O=i.DEPTH24_STENCIL8:_===nn?O=i.DEPTH32F_STENCIL8:_===es&&(O=i.DEPTH24_STENCIL8,It("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===mn||_===ns?O=i.DEPTH_COMPONENT24:_===nn?O=i.DEPTH_COMPONENT32F:_===es&&(O=i.DEPTH_COMPONENT16),O}function b(T,_){return f(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ae&&T.minFilter!==Pe?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function P(T){let _=T.target;_.removeEventListener("dispose",P),w(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&p.delete(_)}function x(T){let _=T.target;_.removeEventListener("dispose",x),F(_)}function w(T){let _=n.get(T);if(_.__webglInit===void 0)return;let O=T.source,B=d.get(O);if(B){let q=B[_.__cacheKey];q.usedTimes--,q.usedTimes===0&&N(T),Object.keys(B).length===0&&d.delete(O)}n.remove(T)}function N(T){let _=n.get(T);i.deleteTexture(_.__webglTexture);let O=T.source,B=d.get(O);delete B[_.__cacheKey],a.memory.textures--}function F(T){let _=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let B=0;B<6;B++){if(Array.isArray(_.__webglFramebuffer[B]))for(let q=0;q<_.__webglFramebuffer[B].length;q++)i.deleteFramebuffer(_.__webglFramebuffer[B][q]);else i.deleteFramebuffer(_.__webglFramebuffer[B]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[B])}else{if(Array.isArray(_.__webglFramebuffer))for(let B=0;B<_.__webglFramebuffer.length;B++)i.deleteFramebuffer(_.__webglFramebuffer[B]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let B=0;B<_.__webglColorRenderbuffer.length;B++)_.__webglColorRenderbuffer[B]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[B]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let O=T.textures;for(let B=0,q=O.length;B<q;B++){let ot=n.get(O[B]);ot.__webglTexture&&(i.deleteTexture(ot.__webglTexture),a.memory.textures--),n.remove(O[B])}n.remove(T)}let H=0;function W(){H=0}function U(){return H}function z(T){H=T}function j(){let T=H;return T>=s.maxTextures&&It("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),H+=1,T}function K(T){let _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function rt(T,_){let O=n.get(T);if(T.isVideoTexture&&D(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&O.__version!==T.version){let B=T.image;if(B===null)It("WebGLRenderer: Texture marked for update but no image data found.");else if(B.complete===!1)It("WebGLRenderer: Texture marked for update but image is incomplete");else{yt(O,T,_);return}}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+_)}function Y(T,_){let O=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){yt(O,T,_);return}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+_)}function et(T,_){let O=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){yt(O,T,_);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+_)}function it(T,_){let O=n.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&O.__version!==T.version){Dt(O,T,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+_)}let Pt={[jr]:i.REPEAT,[vn]:i.CLAMP_TO_EDGE,[Qr]:i.MIRRORED_REPEAT},At={[Ae]:i.NEAREST,[Sh]:i.NEAREST_MIPMAP_NEAREST,[ar]:i.NEAREST_MIPMAP_LINEAR,[Pe]:i.LINEAR,[Na]:i.LINEAR_MIPMAP_NEAREST,[ni]:i.LINEAR_MIPMAP_LINEAR},jt={[Eh]:i.NEVER,[Ph]:i.ALWAYS,[wh]:i.LESS,[vo]:i.LEQUAL,[Ah]:i.EQUAL,[So]:i.GEQUAL,[Ch]:i.GREATER,[Rh]:i.NOTEQUAL};function Gt(T,_){if(_.type===nn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Pe||_.magFilter===Na||_.magFilter===ar||_.magFilter===ni||_.minFilter===Pe||_.minFilter===Na||_.minFilter===ar||_.minFilter===ni)&&It("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,Pt[_.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,Pt[_.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,Pt[_.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,At[_.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,At[_.minFilter]),_.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,jt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ae||_.minFilter!==ar&&_.minFilter!==ni||_.type===nn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function qt(T,_){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",P));let B=_.source,q=d.get(B);q===void 0&&(q={},d.set(B,q));let ot=K(_);if(ot!==T.__cacheKey){q[ot]===void 0&&(q[ot]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),q[ot].usedTimes++;let ct=q[T.__cacheKey];ct!==void 0&&(q[T.__cacheKey].usedTimes--,ct.usedTimes===0&&N(_)),T.__cacheKey=ot,T.__webglTexture=q[ot].texture}return O}function Z(T,_,O){return Math.floor(Math.floor(T/O)/_)}function J(T,_,O,B){let ot=T.updateRanges;if(ot.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,O,B,_.data);else{ot.sort((Et,dt)=>Et.start-dt.start);let ct=0;for(let Et=1;Et<ot.length;Et++){let dt=ot[ct],R=ot[Et],G=dt.start+dt.count,nt=Z(R.start,_.width,4),at=Z(dt.start,_.width,4);R.start<=G+1&&nt===at&&Z(R.start+R.count-1,_.width,4)===nt?dt.count=Math.max(dt.count,R.start+R.count-dt.start):(++ct,ot[ct]=R)}ot.length=ct+1;let $=e.getParameter(i.UNPACK_ROW_LENGTH),Q=e.getParameter(i.UNPACK_SKIP_PIXELS),ht=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Et=0,dt=ot.length;Et<dt;Et++){let R=ot[Et],G=Math.floor(R.start/4),nt=Math.ceil(R.count/4),at=G%_.width,A=Math.floor(G/_.width),lt=nt,tt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,at),e.pixelStorei(i.UNPACK_SKIP_ROWS,A),e.texSubImage2D(i.TEXTURE_2D,0,at,A,lt,tt,O,B,_.data)}T.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,$),e.pixelStorei(i.UNPACK_SKIP_PIXELS,Q),e.pixelStorei(i.UNPACK_SKIP_ROWS,ht)}}function yt(T,_,O){let B=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(B=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(B=i.TEXTURE_3D);let q=qt(T,_),ot=_.source;e.bindTexture(B,T.__webglTexture,i.TEXTURE0+O);let ct=n.get(ot);if(ot.version!==ct.__version||q===!0){if(e.activeTexture(i.TEXTURE0+O),(typeof ImageBitmap!="undefined"&&_.image instanceof ImageBitmap)===!1){let tt=Wt.getPrimaries(Wt.workingColorSpace),ft=_.colorSpace===zn?null:Wt.getPrimaries(_.colorSpace),xt=_.colorSpace===zn||tt===ft?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt)}e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let Q=g(_.image,!1,s.maxTextureSize);Q=_e(_,Q);let ht=r.convert(_.format,_.colorSpace),Et=r.convert(_.type),dt=S(_.internalFormat,ht,Et,_.normalized,_.colorSpace,_.isVideoTexture);Gt(B,_);let R,G=_.mipmaps,nt=_.isVideoTexture!==!0,at=ct.__version===void 0||q===!0,A=ot.dataReady,lt=b(_,Q);if(_.isDepthTexture)dt=M(_.format===ii,_.type),at&&(nt?e.texStorage2D(i.TEXTURE_2D,1,dt,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,dt,Q.width,Q.height,0,ht,Et,null));else if(_.isDataTexture)if(G.length>0){nt&&at&&e.texStorage2D(i.TEXTURE_2D,lt,dt,G[0].width,G[0].height);for(let tt=0,ft=G.length;tt<ft;tt++)R=G[tt],nt?A&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,R.width,R.height,ht,Et,R.data):e.texImage2D(i.TEXTURE_2D,tt,dt,R.width,R.height,0,ht,Et,R.data);_.generateMipmaps=!1}else nt?(at&&e.texStorage2D(i.TEXTURE_2D,lt,dt,Q.width,Q.height),A&&J(_,Q,ht,Et)):e.texImage2D(i.TEXTURE_2D,0,dt,Q.width,Q.height,0,ht,Et,Q.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){nt&&at&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,dt,G[0].width,G[0].height,Q.depth);for(let tt=0,ft=G.length;tt<ft;tt++)if(R=G[tt],_.format!==sn)if(ht!==null)if(nt){if(A)if(_.layerUpdates.size>0){let xt=Vl(R.width,R.height,_.format,_.type);for(let st of _.layerUpdates){let Rt=R.data.subarray(st*xt/R.data.BYTES_PER_ELEMENT,(st+1)*xt/R.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,st,R.width,R.height,1,ht,Rt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,R.width,R.height,Q.depth,ht,R.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,tt,dt,R.width,R.height,Q.depth,0,R.data,0,0);else It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else nt?A&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,R.width,R.height,Q.depth,ht,Et,R.data):e.texImage3D(i.TEXTURE_2D_ARRAY,tt,dt,R.width,R.height,Q.depth,0,ht,Et,R.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{nt&&at&&e.texStorage2D(i.TEXTURE_2D,lt,dt,G[0].width,G[0].height);for(let tt=0,ft=G.length;tt<ft;tt++)R=G[tt],_.format!==sn?ht!==null?nt?A&&e.compressedTexSubImage2D(i.TEXTURE_2D,tt,0,0,R.width,R.height,ht,R.data):e.compressedTexImage2D(i.TEXTURE_2D,tt,dt,R.width,R.height,0,R.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):nt?A&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,R.width,R.height,ht,Et,R.data):e.texImage2D(i.TEXTURE_2D,tt,dt,R.width,R.height,0,ht,Et,R.data)}else if(_.isDataArrayTexture)if(nt){if(at&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,dt,Q.width,Q.height,Q.depth),A)if(_.layerUpdates.size>0){let tt=Vl(Q.width,Q.height,_.format,_.type);for(let ft of _.layerUpdates){let xt=Q.data.subarray(ft*tt/Q.data.BYTES_PER_ELEMENT,(ft+1)*tt/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ft,Q.width,Q.height,1,ht,Et,xt)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ht,Et,Q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,dt,Q.width,Q.height,Q.depth,0,ht,Et,Q.data);else if(_.isData3DTexture)nt?(at&&e.texStorage3D(i.TEXTURE_3D,lt,dt,Q.width,Q.height,Q.depth),A&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ht,Et,Q.data)):e.texImage3D(i.TEXTURE_3D,0,dt,Q.width,Q.height,Q.depth,0,ht,Et,Q.data);else if(_.isFramebufferTexture){if(at)if(nt)e.texStorage2D(i.TEXTURE_2D,lt,dt,Q.width,Q.height);else{let tt=Q.width,ft=Q.height;for(let xt=0;xt<lt;xt++)e.texImage2D(i.TEXTURE_2D,xt,dt,tt,ft,0,ht,Et,null),tt>>=1,ft>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let tt=i.canvas;if(tt.hasAttribute("layoutsubtree")||tt.setAttribute("layoutsubtree","true"),Q.parentNode!==tt){tt.appendChild(Q),p.add(_),tt.onpaint=ft=>{let xt=ft.changedElements;for(let st of p)xt.includes(st.image)&&(st.needsUpdate=!0)},tt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Q);else{let xt=i.RGBA,st=i.RGBA,Rt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,xt,st,Rt,Q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(G.length>0){if(nt&&at){let tt=$t(G[0]);e.texStorage2D(i.TEXTURE_2D,lt,dt,tt.width,tt.height)}for(let tt=0,ft=G.length;tt<ft;tt++)R=G[tt],nt?A&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,ht,Et,R):e.texImage2D(i.TEXTURE_2D,tt,dt,ht,Et,R);_.generateMipmaps=!1}else if(nt){if(at){let tt=$t(Q);e.texStorage2D(i.TEXTURE_2D,lt,dt,tt.width,tt.height)}A&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ht,Et,Q)}else e.texImage2D(i.TEXTURE_2D,0,dt,ht,Et,Q);f(_)&&E(B),ct.__version=ot.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Dt(T,_,O){if(_.image.length!==6)return;let B=qt(T,_),q=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+O);let ot=n.get(q);if(q.version!==ot.__version||B===!0){e.activeTexture(i.TEXTURE0+O);let ct=Wt.getPrimaries(Wt.workingColorSpace),$=_.colorSpace===zn?null:Wt.getPrimaries(_.colorSpace),Q=_.colorSpace===zn||ct===$?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let ht=_.isCompressedTexture||_.image[0].isCompressedTexture,Et=_.image[0]&&_.image[0].isDataTexture,dt=[];for(let st=0;st<6;st++)!ht&&!Et?dt[st]=g(_.image[st],!0,s.maxCubemapSize):dt[st]=Et?_.image[st].image:_.image[st],dt[st]=_e(_,dt[st]);let R=dt[0],G=r.convert(_.format,_.colorSpace),nt=r.convert(_.type),at=S(_.internalFormat,G,nt,_.normalized,_.colorSpace),A=_.isVideoTexture!==!0,lt=ot.__version===void 0||B===!0,tt=q.dataReady,ft=b(_,R);Gt(i.TEXTURE_CUBE_MAP,_);let xt;if(ht){A&&lt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,at,R.width,R.height);for(let st=0;st<6;st++){xt=dt[st].mipmaps;for(let Rt=0;Rt<xt.length;Rt++){let wt=xt[Rt];_.format!==sn?G!==null?A?tt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Rt,0,0,wt.width,wt.height,G,wt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Rt,at,wt.width,wt.height,0,wt.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):A?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Rt,0,0,wt.width,wt.height,G,nt,wt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Rt,at,wt.width,wt.height,0,G,nt,wt.data)}}}else{if(xt=_.mipmaps,A&&lt){xt.length>0&&ft++;let st=$t(dt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,at,st.width,st.height)}for(let st=0;st<6;st++)if(Et){A?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,dt[st].width,dt[st].height,G,nt,dt[st].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,at,dt[st].width,dt[st].height,0,G,nt,dt[st].data);for(let Rt=0;Rt<xt.length;Rt++){let ae=xt[Rt].image[st].image;A?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Rt+1,0,0,ae.width,ae.height,G,nt,ae.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Rt+1,at,ae.width,ae.height,0,G,nt,ae.data)}}else{A?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,G,nt,dt[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,at,G,nt,dt[st]);for(let Rt=0;Rt<xt.length;Rt++){let wt=xt[Rt];A?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Rt+1,0,0,G,nt,wt.image[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Rt+1,at,G,nt,wt.image[st])}}}f(_)&&E(i.TEXTURE_CUBE_MAP),ot.__version=q.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function vt(T,_,O,B,q,ot){let ct=r.convert(O.format,O.colorSpace),$=r.convert(O.type),Q=S(O.internalFormat,ct,$,O.normalized,O.colorSpace),ht=n.get(_),Et=n.get(O);if(Et.__renderTarget=_,!ht.__hasExternalTextures){let dt=Math.max(1,_.width>>ot),R=Math.max(1,_.height>>ot);q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?e.texImage3D(q,ot,Q,dt,R,_.depth,0,ct,$,null):e.texImage2D(q,ot,Q,dt,R,0,ct,$,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),me(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,B,q,Et.__webglTexture,0,le(_)):(q===i.TEXTURE_2D||q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,B,q,Et.__webglTexture,ot),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ft(T,_,O){if(i.bindRenderbuffer(i.RENDERBUFFER,T),_.depthBuffer){let B=_.depthTexture,q=B&&B.isDepthTexture?B.type:null,ot=M(_.stencilBuffer,q),ct=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;me(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,le(_),ot,_.width,_.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,le(_),ot,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ot,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ct,i.RENDERBUFFER,T)}else{let B=_.textures;for(let q=0;q<B.length;q++){let ot=B[q],ct=r.convert(ot.format,ot.colorSpace),$=r.convert(ot.type),Q=S(ot.internalFormat,ct,$,ot.normalized,ot.colorSpace);me(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,le(_),Q,_.width,_.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,le(_),Q,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Q,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function fe(T,_,O){let B=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let q=n.get(_.depthTexture);if(q.__renderTarget=_,(!q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),B){if(q.__webglInit===void 0&&(q.__webglInit=!0,_.depthTexture.addEventListener("dispose",P)),q.__webglTexture===void 0){q.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Gt(i.TEXTURE_CUBE_MAP,_.depthTexture);let ht=r.convert(_.depthTexture.format),Et=r.convert(_.depthTexture.type),dt;_.depthTexture.format===Sn?dt=i.DEPTH_COMPONENT24:_.depthTexture.format===ii&&(dt=i.DEPTH24_STENCIL8);for(let R=0;R<6;R++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+R,0,dt,_.width,_.height,0,ht,Et,null)}}else rt(_.depthTexture,0);let ot=q.__webglTexture,ct=le(_),$=B?i.TEXTURE_CUBE_MAP_POSITIVE_X+O:i.TEXTURE_2D,Q=_.depthTexture.format===ii?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Sn)me(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,$,ot,0,ct):i.framebufferTexture2D(i.FRAMEBUFFER,Q,$,ot,0);else if(_.depthTexture.format===ii)me(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,$,ot,0,ct):i.framebufferTexture2D(i.FRAMEBUFFER,Q,$,ot,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ot(T){let _=n.get(T),O=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){let B=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),B){let q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,B.removeEventListener("dispose",q)};B.addEventListener("dispose",q),_.__depthDisposeCallback=q}_.__boundDepthTexture=B}if(T.depthTexture&&!_.__autoAllocateDepthBuffer)if(O)for(let B=0;B<6;B++)fe(_.__webglFramebuffer[B],T,B);else{let B=T.texture.mipmaps;B&&B.length>0?fe(_.__webglFramebuffer[0],T,0):fe(_.__webglFramebuffer,T,0)}else if(O){_.__webglDepthbuffer=[];for(let B=0;B<6;B++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[B]),_.__webglDepthbuffer[B]===void 0)_.__webglDepthbuffer[B]=i.createRenderbuffer(),Ft(_.__webglDepthbuffer[B],T,!1);else{let q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=_.__webglDepthbuffer[B];i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,ot)}}else{let B=T.texture.mipmaps;if(B&&B.length>0?e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Ft(_.__webglDepthbuffer,T,!1);else{let q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,ot)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Xt(T,_,O){let B=n.get(T);_!==void 0&&vt(B.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Ot(T)}function Qt(T){let _=T.texture,O=n.get(T),B=n.get(_);T.addEventListener("dispose",x);let q=T.textures,ot=T.isWebGLCubeRenderTarget===!0,ct=q.length>1;if(ct||(B.__webglTexture===void 0&&(B.__webglTexture=i.createTexture()),B.__version=_.version,a.memory.textures++),ot){O.__webglFramebuffer=[];for(let $=0;$<6;$++)if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer[$]=[];for(let Q=0;Q<_.mipmaps.length;Q++)O.__webglFramebuffer[$][Q]=i.createFramebuffer()}else O.__webglFramebuffer[$]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer=[];for(let $=0;$<_.mipmaps.length;$++)O.__webglFramebuffer[$]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(ct)for(let $=0,Q=q.length;$<Q;$++){let ht=n.get(q[$]);ht.__webglTexture===void 0&&(ht.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&me(T)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let $=0;$<q.length;$++){let Q=q[$];O.__webglColorRenderbuffer[$]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[$]);let ht=r.convert(Q.format,Q.colorSpace),Et=r.convert(Q.type),dt=S(Q.internalFormat,ht,Et,Q.normalized,Q.colorSpace,T.isXRRenderTarget===!0),R=le(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,R,dt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.RENDERBUFFER,O.__webglColorRenderbuffer[$])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Ft(O.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ot){e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture),Gt(i.TEXTURE_CUBE_MAP,_);for(let $=0;$<6;$++)if(_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)vt(O.__webglFramebuffer[$][Q],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Q);else vt(O.__webglFramebuffer[$],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);f(_)&&E(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ct){for(let $=0,Q=q.length;$<Q;$++){let ht=q[$],Et=n.get(ht),dt=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(dt=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(dt,Et.__webglTexture),Gt(dt,ht),vt(O.__webglFramebuffer,T,ht,i.COLOR_ATTACHMENT0+$,dt,0),f(ht)&&E(dt)}e.unbindTexture()}else{let $=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&($=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture($,B.__webglTexture),Gt($,_),_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)vt(O.__webglFramebuffer[Q],T,_,i.COLOR_ATTACHMENT0,$,Q);else vt(O.__webglFramebuffer,T,_,i.COLOR_ATTACHMENT0,$,0);f(_)&&E($),e.unbindTexture()}T.depthBuffer&&Ot(T)}function Vt(T){let _=T.textures;for(let O=0,B=_.length;O<B;O++){let q=_[O];if(f(q)){let ot=C(T),ct=n.get(q).__webglTexture;e.bindTexture(ot,ct),E(ot),e.unbindTexture()}}}let ie=[],pe=[];function Re(T){if(T.samples>0){if(me(T)===!1){let _=T.textures,O=T.width,B=T.height,q=i.COLOR_BUFFER_BIT,ot=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=n.get(T),$=_.length>1;if($)for(let ht=0;ht<_.length;ht++)e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ct.__webglMultisampledFramebuffer);let Q=T.texture.mipmaps;Q&&Q.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ct.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ct.__webglFramebuffer);for(let ht=0;ht<_.length;ht++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(q|=i.STENCIL_BUFFER_BIT)),$){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ct.__webglColorRenderbuffer[ht]);let Et=n.get(_[ht]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Et,0)}i.blitFramebuffer(0,0,O,B,0,0,O,B,q,i.NEAREST),l===!0&&(ie.length=0,pe.length=0,ie.push(i.COLOR_ATTACHMENT0+ht),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&(ie.push(ot),pe.push(ot),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,pe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ie))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),$)for(let ht=0;ht<_.length;ht++){e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,ct.__webglColorRenderbuffer[ht]);let Et=n.get(_[ht]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,Et,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ct.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&l){let _=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function le(T){return Math.min(s.maxSamples,T.samples)}function me(T){let _=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function D(T){let _=a.render.frame;u.get(T)!==_&&(u.set(T,_),T.update())}function _e(T,_){let O=T.colorSpace,B=T.format,q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||O!==As&&O!==zn&&(Wt.getTransfer(O)===Kt?(B!==sn||q!==Ge)&&It("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Lt("WebGLTextures: Unsupported texture color space:",O)),_}function $t(T){return typeof HTMLImageElement!="undefined"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame!="undefined"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=j,this.resetTextureUnits=W,this.getTextureUnits=U,this.setTextureUnits=z,this.setTexture2D=rt,this.setTexture2DArray=Y,this.setTexture3D=et,this.setTextureCube=it,this.rebindTextures=Xt,this.setupRenderTarget=Qt,this.updateRenderTargetMipmap=Vt,this.updateMultisampleRenderTarget=Re,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=me,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function S0(i,t){function e(n,s=zn){let r,a=Wt.getTransfer(s);if(n===Ge)return i.UNSIGNED_BYTE;if(n===Fa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Oa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Pl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Il)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Cl)return i.BYTE;if(n===Rl)return i.SHORT;if(n===es)return i.UNSIGNED_SHORT;if(n===Ua)return i.INT;if(n===mn)return i.UNSIGNED_INT;if(n===nn)return i.FLOAT;if(n===gn)return i.HALF_FLOAT;if(n===Ll)return i.ALPHA;if(n===Dl)return i.RGB;if(n===sn)return i.RGBA;if(n===Sn)return i.DEPTH_COMPONENT;if(n===ii)return i.DEPTH_STENCIL;if(n===Ba)return i.RED;if(n===za)return i.RED_INTEGER;if(n===si)return i.RG;if(n===ka)return i.RG_INTEGER;if(n===Va)return i.RGBA_INTEGER;if(n===or||n===lr||n===cr||n===hr)if(a===Kt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===or)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===or)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===lr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===cr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===hr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ga||n===Ha||n===Wa||n===Xa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ga)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ha)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Wa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Xa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===qa||n===Ya||n===$a||n===Za||n===Ja||n===ur||n===Ka)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===qa||n===Ya)return a===Kt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===$a)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Za)return r.COMPRESSED_R11_EAC;if(n===Ja)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ur)return r.COMPRESSED_RG11_EAC;if(n===Ka)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ja||n===Qa||n===to||n===eo||n===no||n===io||n===so||n===ro||n===ao||n===oo||n===lo||n===co||n===ho||n===uo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ja)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Qa)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===to)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===eo)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===no)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===io)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===so)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ro)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ao)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===oo)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===lo)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===co)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ho)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===uo)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fo||n===po||n===mo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===fo)return a===Kt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===po)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===mo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===go||n===_o||n===dr||n===xo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===go)return r.COMPRESSED_RED_RGTC1_EXT;if(n===_o)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===dr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===xo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ns?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var M0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,b0=`
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

}`,ac=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Xs(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Ze({vertexShader:M0,fragmentShader:b0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ge(new Zs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},oc=class extends dn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,p=null,h=null,d=null,m=null,v=typeof XRWebGLBinding!="undefined",g=new ac,f={},E=e.getContextAttributes(),C=null,S=null,M=[],b=[],P=new _t,x=null,w=null,N=new Ne;N.viewport=new de;let F=new Ne;F.viewport=new de;let H=[N,F],W=new Pa,U=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let J=M[Z];return J===void 0&&(J=new Wi,M[Z]=J),J.getTargetRaySpace()},this.getControllerGrip=function(Z){let J=M[Z];return J===void 0&&(J=new Wi,M[Z]=J),J.getGripSpace()},this.getHand=function(Z){let J=M[Z];return J===void 0&&(J=new Wi,M[Z]=J),J.getHandSpace()};function j(Z){let J=b.indexOf(Z.inputSource);if(J===-1)return;let yt=M[J];yt!==void 0&&(yt.update(Z.inputSource,Z.frame,c||a),yt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function K(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",rt);for(let Z=0;Z<M.length;Z++){let J=b[Z];J!==null&&(b[Z]=null,M[Z].disconnect(J))}U=null,z=null,g.reset();for(let Z in f)delete f[Z];if(t.setRenderTarget(C),d=null,h=null,p=null,s=null,S=null,qt.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(P.width,P.height,!1),w!==null){let Z=w.camera;Z.fov=w.fov,Z.zoom=w.zoom,Z.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&It("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&It("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return p===null&&v&&(p=new XRWebGLBinding(s,e)),p},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(C=t.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",K),s.addEventListener("inputsourceschange",rt),E.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let yt=null,Dt=null,vt=null;E.depth&&(vt=E.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,yt=E.stencil?ii:Sn,Dt=E.stencil?ns:mn);let Ft={colorFormat:e.RGBA8,depthFormat:vt,scaleFactor:r};p=this.getBinding(),h=p.createProjectionLayer(Ft),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),S=new Ve(h.textureWidth,h.textureHeight,{format:sn,type:Ge,depthTexture:new $n(h.textureWidth,h.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,yt),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let yt={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,yt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),S=new Ve(d.framebufferWidth,d.framebufferHeight,{format:sn,type:Ge,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),qt.setContext(s),qt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function rt(Z){for(let J=0;J<Z.removed.length;J++){let yt=Z.removed[J],Dt=b.indexOf(yt);Dt>=0&&(b[Dt]=null,M[Dt].disconnect(yt))}for(let J=0;J<Z.added.length;J++){let yt=Z.added[J],Dt=b.indexOf(yt);if(Dt===-1){for(let Ft=0;Ft<M.length;Ft++)if(Ft>=b.length){b.push(yt),Dt=Ft;break}else if(b[Ft]===null){b[Ft]=yt,Dt=Ft;break}if(Dt===-1)break}let vt=M[Dt];vt&&vt.connect(yt)}}let Y=new I,et=new I;function it(Z,J,yt){Y.setFromMatrixPosition(J.matrixWorld),et.setFromMatrixPosition(yt.matrixWorld);let Dt=Y.distanceTo(et),vt=J.projectionMatrix.elements,Ft=yt.projectionMatrix.elements,fe=vt[14]/(vt[10]-1),Ot=vt[14]/(vt[10]+1),Xt=(vt[9]+1)/vt[5],Qt=(vt[9]-1)/vt[5],Vt=(vt[8]-1)/vt[0],ie=(Ft[8]+1)/Ft[0],pe=fe*Vt,Re=fe*ie,le=Dt/(-Vt+ie),me=le*-Vt;if(J.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(me),Z.translateZ(le),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),vt[10]===-1)Z.projectionMatrix.copy(J.projectionMatrix),Z.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let D=fe+le,_e=Ot+le,$t=pe-me,T=Re+(Dt-me),_=Xt*Ot/_e*D,O=Qt*Ot/_e*D;Z.projectionMatrix.makePerspective($t,T,_,O,D,_e),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Pt(Z,J){J===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(J.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let J=Z.near,yt=Z.far;g.texture!==null&&(g.depthNear>0&&(J=g.depthNear),g.depthFar>0&&(yt=g.depthFar)),W.near=F.near=N.near=J,W.far=F.far=N.far=yt,(U!==W.near||z!==W.far)&&(s.updateRenderState({depthNear:W.near,depthFar:W.far}),U=W.near,z=W.far),W.layers.mask=Z.layers.mask|6,N.layers.mask=W.layers.mask&-5,F.layers.mask=W.layers.mask&-3;let Dt=Z.parent,vt=W.cameras;Pt(W,Dt);for(let Ft=0;Ft<vt.length;Ft++)Pt(vt[Ft],Dt);vt.length===2?it(W,N,F):W.projectionMatrix.copy(N.projectionMatrix),w===null&&Z.isPerspectiveCamera&&(w={camera:Z,fov:Z.fov,zoom:Z.zoom}),At(Z,W,Dt)};function At(Z,J,yt){yt===null?Z.matrix.copy(J.matrixWorld):(Z.matrix.copy(yt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(J.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(J.projectionMatrix),Z.projectionMatrixInverse.copy(J.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Gi*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(Z){l=Z,h!==null&&(h.fixedFoveation=Z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(W)},this.getCameraTexture=function(Z){return f[Z]};let jt=null;function Gt(Z,J){if(u=J.getViewerPose(c||a),m=J,u!==null){let yt=u.views;d!==null&&(t.setRenderTargetFramebuffer(S,d.framebuffer),t.setRenderTarget(S));let Dt=!1;yt.length!==W.cameras.length&&(W.cameras.length=0,Dt=!0);for(let Ot=0;Ot<yt.length;Ot++){let Xt=yt[Ot],Qt=null;if(d!==null)Qt=d.getViewport(Xt);else{let ie=p.getViewSubImage(h,Xt);Qt=ie.viewport,Ot===0&&(t.setRenderTargetTextures(S,ie.colorTexture,ie.depthStencilTexture),t.setRenderTarget(S))}let Vt=H[Ot];Vt===void 0&&(Vt=new Ne,Vt.layers.enable(Ot),Vt.viewport=new de,H[Ot]=Vt),Vt.matrix.fromArray(Xt.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(Xt.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(Qt.x,Qt.y,Qt.width,Qt.height),Ot===0&&(W.matrix.copy(Vt.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Dt===!0&&W.cameras.push(Vt)}let vt=s.enabledFeatures;if(vt&&vt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){p=n.getBinding();let Ot=p.getDepthInformation(yt[0]);Ot&&Ot.isValid&&Ot.texture&&g.init(Ot,s.renderState)}if(vt&&vt.includes("camera-access")&&v){t.state.unbindTexture(),p=n.getBinding();for(let Ot=0;Ot<yt.length;Ot++){let Xt=yt[Ot].camera;if(Xt){let Qt=f[Xt];Qt||(Qt=new Xs,f[Xt]=Qt);let Vt=p.getCameraImage(Xt);Qt.sourceTexture=Vt}}}}for(let yt=0;yt<M.length;yt++){let Dt=b[yt],vt=M[yt];Dt!==null&&vt!==void 0&&vt.update(Dt,J,c||a)}jt&&jt(Z,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),m=null}let qt=new ou;qt.setAnimationLoop(Gt),this.setAnimationLoop=function(Z){jt=Z},this.dispose=function(){}}},T0=new ee,fu=new Ut;fu.set(-1,0,0,0,1,0,0,0,1);function E0(i,t){function e(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function n(g,f){f.color.getRGB(g.fogColor.value,Bl(i)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function s(g,f,E,C,S){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(g,f):f.isMeshLambertMaterial?(r(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(g,f),p(g,f)):f.isMeshPhongMaterial?(r(g,f),u(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(g,f),h(g,f),f.isMeshPhysicalMaterial&&d(g,f,S)):f.isMeshMatcapMaterial?(r(g,f),m(g,f)):f.isMeshDepthMaterial?r(g,f):f.isMeshDistanceMaterial?(r(g,f),v(g,f)):f.isMeshNormalMaterial?r(g,f):f.isLineBasicMaterial?(a(g,f),f.isLineDashedMaterial&&o(g,f)):f.isPointsMaterial?l(g,f,E,C):f.isSpriteMaterial?c(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,e(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,e(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,e(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===ze&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,e(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===ze&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,e(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,e(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);let E=t.get(f),C=E.envMap,S=E.envMapRotation;C&&(g.envMap.value=C,g.envMapRotation.value.setFromMatrix4(T0.makeRotationFromEuler(S)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(fu),g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,g.aoMapTransform))}function a(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,e(f.map,g.mapTransform))}function o(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function l(g,f,E,C){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*E,g.scale.value=C*.5,f.map&&(g.map.value=f.map,e(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,e(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function c(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,e(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,e(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function u(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function p(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function h(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function d(g,f,E){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===ze&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.retroreflectivity>0&&(g.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=E.texture,g.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,f){f.matcap&&(g.matcap.value=f.matcap)}function v(g,f){let E=t.get(f).light;g.referencePosition.value.setFromMatrixPosition(E.matrixWorld),g.nearDistance.value=E.shadow.camera.near,g.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function w0(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,M){let b=M.program;n.uniformBlockBinding(S,b)}function c(S,M){let b=s[S.id];b===void 0&&(g(S),b=u(S),s[S.id]=b,S.addEventListener("dispose",E));let P=M.program;n.updateUBOMapping(S,P);let x=t.render.frame;r[S.id]!==x&&(h(S),r[S.id]=x)}function u(S){let M=p();S.__bindingPointIndex=M;let b=i.createBuffer(),P=S.__size,x=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,P,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,b),b}function p(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return Lt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){let M=s[S.id],b=S.uniforms,P=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let x=0,w=b.length;x<w;x++){let N=b[x];if(Array.isArray(N))for(let F=0,H=N.length;F<H;F++)d(N[F],x,F,P);else d(N,x,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(S,M,b,P){if(v(S,M,b,P)===!0){let x=S.__offset,w=S.value;if(Array.isArray(w)){let N=0;for(let F=0;F<w.length;F++){let H=w[F],W=f(H);m(H,S.__data,N),typeof H!="number"&&typeof H!="boolean"&&!H.isMatrix3&&!ArrayBuffer.isView(H)&&(N+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(w,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,S.__data)}}function m(S,M,b){typeof S=="number"||typeof S=="boolean"?M[0]=S:S.isMatrix3?(M[0]=S.elements[0],M[1]=S.elements[1],M[2]=S.elements[2],M[3]=0,M[4]=S.elements[3],M[5]=S.elements[4],M[6]=S.elements[5],M[7]=0,M[8]=S.elements[6],M[9]=S.elements[7],M[10]=S.elements[8],M[11]=0):ArrayBuffer.isView(S)?M.set(new S.constructor(S.buffer,S.byteOffset,M.length)):S.toArray(M,b)}function v(S,M,b,P){let x=S.value,w=M+"_"+b;if(P[w]===void 0)return typeof x=="number"||typeof x=="boolean"?P[w]=x:ArrayBuffer.isView(x)?P[w]=x.slice():P[w]=x.clone(),!0;{let N=P[w];if(typeof x=="number"||typeof x=="boolean"){if(N!==x)return P[w]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(N.equals(x)===!1)return N.copy(x),!0}}return!1}function g(S){let M=S.uniforms,b=0,P=16;for(let w=0,N=M.length;w<N;w++){let F=Array.isArray(M[w])?M[w]:[M[w]];for(let H=0,W=F.length;H<W;H++){let U=F[H],z=Array.isArray(U.value)?U.value:[U.value];for(let j=0,K=z.length;j<K;j++){let rt=z[j],Y=f(rt),et=b%P,it=et%Y.boundary,Pt=et+it;b+=it,Pt!==0&&P-Pt<Y.storage&&(b+=P-Pt),U.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=b,b+=Y.storage}}}let x=b%P;return x>0&&(b+=P-x),S.__size=b,S.__cache={},this}function f(S){let M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?It("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(M.boundary=16,M.storage=S.byteLength):It("WebGLRenderer: Unsupported uniform value type.",S),M}function E(S){let M=S.target;M.removeEventListener("dispose",E);let b=a.indexOf(M.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function C(){for(let S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:l,update:c,dispose:C}}var A0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),En=null;function C0(){return En===null&&(En=new zs(A0,16,16,si,gn),En.name="DFG_LUT",En.minFilter=Pe,En.magFilter=Pe,En.wrapS=vn,En.wrapT=vn,En.generateMipmaps=!1,En.needsUpdate=!0),En}var wo=class{constructor(t={}){let{canvas:e=Ih(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1,outputBufferType:d=Ge}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let v=d,g=new Set([Va,ka,za]),f=new Set([Ge,mn,es,ns,Fa,Oa]),E=new Uint32Array(4),C=new Int32Array(4),S=new I,M=null,b=null,P=[],x=[],w=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,F=!1,H=null,W=null,U=null,z=null;this._outputColorSpace=qe;let j=0,K=0,rt=null,Y=-1,et=null,it=new de,Pt=new de,At=null,jt=new Nt(0),Gt=0,qt=e.width,Z=e.height,J=1,yt=null,Dt=null,vt=new de(0,0,qt,Z),Ft=new de(0,0,qt,Z),fe=!1,Ot=new qi,Xt=!1,Qt=!1,Vt=new ee,ie=new I,pe=new de,Re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},le=!1;function me(){return rt===null?J:1}let D=n;function _e(y,L){return e.getContext(y,L)}let $t,T,_,O,B,q,ot,ct,$,Q,ht,Et,dt,R,G,nt,at,A,lt,tt,ft,xt,st;try{let y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",ae,!1),e.addEventListener("webglcontextrestored",Zt,!1),e.addEventListener("webglcontextcreationerror",rn,!1),D===null){let L="webgl2";if(D=_e(L,y),D===null)throw _e(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Rt()}catch(y){throw e.removeEventListener("webglcontextlost",ae,!1),e.removeEventListener("webglcontextrestored",Zt,!1),e.removeEventListener("webglcontextcreationerror",rn,!1),Lt("WebGLRenderer: "+y.message),y}function Rt(){$t=new Um(D),$t.init(),ft=new S0(D,$t),T=new Em(D,$t,t,ft),_=new y0(D,$t),T.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),W=D.createFramebuffer(),U=D.createFramebuffer(),z=D.createFramebuffer(),O=new Bm(D),B=new r0,q=new v0(D,$t,_,B,T,ft,O),ot=new Nm(N),ct=new zd(D),xt=new bm(D,ct),$=new Fm(D,ct,O,xt),Q=new km(D,$,ct,xt,O),A=new zm(D,T,q),G=new wm(B),ht=new s0(N,ot,$t,T,xt,G),Et=new E0(N,B),dt=new o0,R=new f0($t),at=new Mm(N,ot,_,Q,m,l),nt=new x0(N,Q,T),st=new w0(D,O,T,_),lt=new Tm(D,$t,O),tt=new Om(D,$t,O),O.programs=ht.programs,N.capabilities=T,N.extensions=$t,N.properties=B,N.renderLists=dt,N.shadowMap=nt,N.state=_,N.info=O}v!==Ge&&(w=new Gm(v,e.width,e.height,o,s,r));let wt=new oc(N,D);this.xr=wt,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let y=$t.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=$t.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(y){y!==void 0&&(J=y,this.setSize(qt,Z,!1))},this.getSize=function(y){return y.set(qt,Z)},this.setSize=function(y,L,X=!0){if(wt.isPresenting){It("WebGLRenderer: Can't change size while VR device is presenting.");return}qt=y,Z=L,e.width=Math.floor(y*J),e.height=Math.floor(L*J),X===!0&&(e.style.width=y+"px",e.style.height=L+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,y,L)},this.getDrawingBufferSize=function(y){return y.set(qt*J,Z*J).floor()},this.setDrawingBufferSize=function(y,L,X){qt=y,Z=L,J=X,e.width=Math.floor(y*X),e.height=Math.floor(L*X),this.setViewport(0,0,y,L)},this.setEffects=function(y){if(v===Ge){Lt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let L=0;L<y.length;L++)if(y[L].isOutputPass===!0){It("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(it)},this.getViewport=function(y){return y.copy(vt)},this.setViewport=function(y,L,X,k){y.isVector4?vt.set(y.x,y.y,y.z,y.w):vt.set(y,L,X,k),_.viewport(it.copy(vt).multiplyScalar(J).round())},this.getScissor=function(y){return y.copy(Ft)},this.setScissor=function(y,L,X,k){y.isVector4?Ft.set(y.x,y.y,y.z,y.w):Ft.set(y,L,X,k),_.scissor(Pt.copy(Ft).multiplyScalar(J).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(y){_.setScissorTest(fe=y)},this.setOpaqueSort=function(y){yt=y},this.setTransparentSort=function(y){Dt=y},this.getClearColor=function(y){return y.copy(at.getClearColor())},this.setClearColor=function(){at.setClearColor(...arguments)},this.getClearAlpha=function(){return at.getClearAlpha()},this.setClearAlpha=function(){at.setClearAlpha(...arguments)},this.clear=function(y=!0,L=!0,X=!0){let k=0;if(y){let V=!1;if(rt!==null){let gt=rt.texture.format;V=g.has(gt)}if(V){let gt=rt.texture.type,Mt=f.has(gt),mt=at.getClearColor(),bt=at.getClearAlpha(),Ct=mt.r,Bt=mt.g,Ht=mt.b;Mt?(E[0]=Ct,E[1]=Bt,E[2]=Ht,E[3]=bt,D.clearBufferuiv(D.COLOR,0,E)):(C[0]=Ct,C[1]=Bt,C[2]=Ht,C[3]=bt,D.clearBufferiv(D.COLOR,0,C))}else k|=D.COLOR_BUFFER_BIT}L&&(k|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(k|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&D.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),H=y},this.dispose=function(){e.removeEventListener("webglcontextlost",ae,!1),e.removeEventListener("webglcontextrestored",Zt,!1),e.removeEventListener("webglcontextcreationerror",rn,!1),at.dispose(),dt.dispose(),R.dispose(),B.dispose(),ot.dispose(),Q.dispose(),xt.dispose(),st.dispose(),ht.dispose(),wt.dispose(),wt.removeEventListener("sessionstart",dc),wt.removeEventListener("sessionend",fc),ri.stop()};function ae(y){y.preventDefault(),Ps("WebGLRenderer: Context Lost."),F=!0}function Zt(){Ps("WebGLRenderer: Context Restored."),F=!1;let y=O.autoReset,L=nt.enabled,X=nt.autoUpdate,k=nt.needsUpdate,V=nt.type;Rt(),O.autoReset=y,nt.enabled=L,nt.autoUpdate=X,nt.needsUpdate=k,nt.type=V}function rn(y){Lt("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function _n(y){let L=y.target;L.removeEventListener("dispose",_n),wu(L)}function wu(y){Au(y),B.remove(y)}function Au(y){let L=B.get(y).programs;L!==void 0&&(L.forEach(function(X){ht.releaseProgram(X)}),y.isShaderMaterial&&ht.releaseShaderCache(y))}this.renderBufferDirect=function(y,L,X,k,V,gt){L===null&&(L=Re);let Mt=V.isMesh&&V.matrixWorld.determinantAffine()<0,mt=Pu(y,L,X,k,V);_.setMaterial(k,Mt);let bt=X.index,Ct=1;if(k.wireframe===!0){if(bt=$.getWireframeAttribute(X),bt===void 0)return;Ct=2}let Bt=X.drawRange,Ht=X.attributes.position,Tt=Bt.start*Ct,Jt=(Bt.start+Bt.count)*Ct;gt!==null&&(Tt=Math.max(Tt,gt.start*Ct),Jt=Math.min(Jt,(gt.start+gt.count)*Ct)),bt!==null?(Tt=Math.max(Tt,0),Jt=Math.min(Jt,bt.count)):Ht!=null&&(Tt=Math.max(Tt,0),Jt=Math.min(Jt,Ht.count));let ye=Jt-Tt;if(ye<0||ye===1/0)return;xt.setup(V,k,mt,X,bt);let ce,re=lt;if(bt!==null&&(ce=ct.get(bt),re=tt,re.setIndex(ce)),V.isMesh)k.wireframe===!0?(_.setLineWidth(k.wireframeLinewidth*me()),re.setMode(D.LINES)):re.setMode(D.TRIANGLES);else if(V.isLine){let Ie=k.linewidth;Ie===void 0&&(Ie=1),_.setLineWidth(Ie*me()),V.isLineSegments?re.setMode(D.LINES):V.isLineLoop?re.setMode(D.LINE_LOOP):re.setMode(D.LINE_STRIP)}else V.isPoints?re.setMode(D.POINTS):V.isSprite&&re.setMode(D.TRIANGLES);if(V.isBatchedMesh)if($t.get("WEBGL_multi_draw"))re.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let Ie=V._multiDrawStarts,St=V._multiDrawCounts,Fe=V._multiDrawCount,Yt=bt?ct.get(bt).bytesPerElement:1,Qe=B.get(k).currentProgram.getUniforms();for(let xn=0;xn<Fe;xn++)Qe.setValue(D,"_gl_DrawID",xn),re.render(Ie[xn]/Yt,St[xn])}else if(V.isInstancedMesh)re.renderInstances(Tt,ye,V.count);else if(X.isInstancedBufferGeometry){let Ie=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,St=Math.min(X.instanceCount,Ie);re.renderInstances(Tt,ye,St)}else re.render(Tt,ye)};function uc(y,L,X,k){H!==null&&y.isNodeMaterial&&H.setObject(k,y),Xt===!0&&G.setState(y,X,!1),y.transparent===!0&&y.side===je&&y.forceSinglePass===!1?(y.side=ze,y.needsUpdate=!0,_r(y,L,k),y.side=ti,y.needsUpdate=!0,_r(y,L,k),y.side=je):_r(y,L,k)}this.compile=function(y,L,X=null){X===null&&(X=y),H!==null&&H.renderStart(y,L,X),b=R.get(X),b.init(L),x.push(b),X.traverseVisible(function(V){V.isLight&&V.layers.test(L.layers)&&(b.pushLight(V),V.castShadow&&b.pushShadow(V))}),y!==X&&y.traverseVisible(function(V){V.isLight&&V.layers.test(L.layers)&&(b.pushLight(V),V.castShadow&&b.pushShadow(V))}),b.setupLights(),H!==null&&H.updateLights(b.state.lightsArray),Qt=this.localClippingEnabled,Xt=G.init(this.clippingPlanes,Qt),Xt===!0&&G.setGlobalState(this.clippingPlanes,L),H!==null&&nt.render(b.state.shadowsArray,X,L);let k=new Set;return y.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let gt=V.material;if(gt)if(Array.isArray(gt))for(let Mt=0;Mt<gt.length;Mt++){let mt=gt[Mt];uc(mt,X,L,V),k.add(mt)}else uc(gt,X,L,V),k.add(gt)}),b=x.pop(),H!==null&&H.renderEnd(),k},this.compileAsync=function(y,L,X=null){let k=this.compile(y,L,X);return new Promise(V=>{function gt(){if(k.forEach(function(Mt){let bt=B.get(Mt).currentProgram;(bt===void 0||bt.isReady())&&k.delete(Mt)}),k.size===0){V(y);return}setTimeout(gt,10)}$t.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let Do=null;function Cu(y){Do&&Do(y)}function dc(){ri.stop()}function fc(){ri.start()}let ri=new ou;ri.setAnimationLoop(Cu),typeof self!="undefined"&&ri.setContext(self),this.setAnimationLoop=function(y){Do=y,wt.setAnimationLoop(y),y===null?ri.stop():ri.start()},wt.addEventListener("sessionstart",dc),wt.addEventListener("sessionend",fc),this.render=function(y,L){if(L!==void 0&&L.isCamera!==!0){Lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;H!==null&&H.renderStart(y,L);let X=wt.enabled===!0&&wt.isPresenting===!0,k=w!==null&&(rt===null||X)&&w.begin(N,rt);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),wt.enabled===!0&&wt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(wt.cameraAutoUpdate===!0&&wt.updateCamera(L),L=wt.getCamera()),y.isScene===!0&&y.onBeforeRender(N,y,L,rt),b=R.get(y,x.length),b.init(L),b.state.textureUnits=q.getTextureUnits(),x.push(b),Vt.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),Ot.setFromProjectionMatrix(Vt,hn,L.reversedDepth),Qt=this.localClippingEnabled,Xt=G.init(this.clippingPlanes,Qt),M=dt.get(y,P.length),M.init(),P.push(M),wt.enabled===!0&&wt.isPresenting===!0){let Mt=N.xr.getDepthSensingMesh();Mt!==null&&No(Mt,L,-1/0,N.sortObjects)}No(y,L,0,N.sortObjects),M.finish(),H!==null&&H.updateLights(b.state.lightsArray),N.sortObjects===!0&&M.sort(yt,Dt),le=wt.enabled===!1||wt.isPresenting===!1||wt.hasDepthSensing()===!1,le&&at.addToRenderList(M,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Xt===!0&&G.beginShadows();let V=b.state.shadowsArray;if(nt.render(V,y,L),Xt===!0&&G.endShadows(),(k&&w.hasRenderPass())===!1){let Mt=M.opaque,mt=M.transmissive;if(b.setupLights(),L.isArrayCamera){let bt=L.cameras;if(mt.length>0)for(let Ct=0,Bt=bt.length;Ct<Bt;Ct++){let Ht=bt[Ct];mc(Mt,mt,y,Ht)}le&&at.render(y);for(let Ct=0,Bt=bt.length;Ct<Bt;Ct++){let Ht=bt[Ct];pc(M,y,Ht,Ht.viewport)}}else mt.length>0&&mc(Mt,mt,y,L),le&&at.render(y),pc(M,y,L)}rt!==null&&K===0&&(q.updateMultisampleRenderTarget(rt),q.updateRenderTargetMipmap(rt)),k&&w.end(N),y.isScene===!0&&y.onAfterRender(N,y,L),xt.resetDefaultState(),Y=-1,et=null,x.pop(),x.length>0?(b=x[x.length-1],q.setTextureUnits(b.state.textureUnits),Xt===!0&&G.setGlobalState(N.clippingPlanes,b.state.camera)):b=null,P.pop(),P.length>0?M=P[P.length-1]:M=null,H!==null&&H.renderEnd()};function No(y,L,X,k){if(y.visible===!1)return;if(y.layers.test(L.layers)){if(y.isGroup)X=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(L);else if(y.isLightProbeGrid)b.pushLightProbeGrid(y);else if(y.isLight)b.pushLight(y),y.castShadow&&b.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||y.intersectsFrustum(Ot)){k&&pe.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Vt);let Mt=Q.update(y),mt=y.material;mt.visible&&M.push(y,Mt,mt,X,pe.z,null,L)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||y.intersectsFrustum(Ot))){let Mt=Q.update(y),mt=y.material;if(k&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),pe.copy(y.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),pe.copy(Mt.boundingSphere.center)),pe.applyMatrix4(y.matrixWorld).applyMatrix4(Vt)),Array.isArray(mt)){let bt=Mt.groups;for(let Ct=0,Bt=bt.length;Ct<Bt;Ct++){let Ht=bt[Ct],Tt=mt[Ht.materialIndex];Tt&&Tt.visible&&M.push(y,Mt,Tt,X,pe.z,Ht,L)}}else mt.visible&&M.push(y,Mt,mt,X,pe.z,null,L)}}let gt=y.children;for(let Mt=0,mt=gt.length;Mt<mt;Mt++)No(gt[Mt],L,X,k)}function pc(y,L,X,k){let{opaque:V,transmissive:gt,transparent:Mt}=y;b.setupLightsView(X),Xt===!0&&G.setGlobalState(N.clippingPlanes,X),k&&_.viewport(it.copy(k)),V.length>0&&gr(V,L,X),gt.length>0&&gr(gt,L,X),Mt.length>0&&gr(Mt,L,X),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function mc(y,L,X,k){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[k.id]===void 0){let Tt=$t.has("EXT_color_buffer_half_float")||$t.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[k.id]=new Ve(1,1,{generateMipmaps:!0,type:Tt?gn:Ge,minFilter:ni,samples:Math.max(4,T.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Wt.workingColorSpace})}let gt=b.state.transmissionRenderTarget[k.id],Mt=k.viewport||it;gt.setSize(Mt.z*N.transmissionResolutionScale,Mt.w*N.transmissionResolutionScale);let mt=N.getRenderTarget(),bt=N.getActiveCubeFace(),Ct=N.getActiveMipmapLevel();N.setRenderTarget(gt),N.getClearColor(jt),Gt=N.getClearAlpha(),Gt<1&&N.setClearColor(16777215,.5),N.clear(),le&&at.render(X);let Bt=N.toneMapping;N.toneMapping=pn;let Ht=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),b.setupLightsView(k),Xt===!0&&G.setGlobalState(N.clippingPlanes,k),gr(y,X,k),q.updateMultisampleRenderTarget(gt),q.updateRenderTargetMipmap(gt),$t.has("WEBGL_multisampled_render_to_texture")===!1){let Tt=!1;for(let Jt=0,ye=L.length;Jt<ye;Jt++){let ce=L[Jt],{object:re,geometry:Ie,material:St,group:Fe}=ce;if(St.side===je&&re.layers.test(k.layers)){let Yt=St.side;St.side=ze,St.needsUpdate=!0,gc(re,X,k,Ie,St,Fe),St.side=Yt,St.needsUpdate=!0,Tt=!0}}Tt===!0&&(q.updateMultisampleRenderTarget(gt),q.updateRenderTargetMipmap(gt))}N.setRenderTarget(mt,bt,Ct),N.setClearColor(jt,Gt),Ht!==void 0&&(k.viewport=Ht),N.toneMapping=Bt}function gr(y,L,X){let k=L.isScene===!0?L.overrideMaterial:null;for(let V=0,gt=y.length;V<gt;V++){let Mt=y[V],{object:mt,geometry:bt,group:Ct}=Mt,Bt=Mt.material;Bt.allowOverride===!0&&k!==null&&(Bt=k),mt.layers.test(X.layers)&&gc(mt,L,X,bt,Bt,Ct)}}function gc(y,L,X,k,V,gt){H!==null&&V.isNodeMaterial&&H.setObject(y,V),y.onBeforeRender(N,L,X,k,V,gt),y.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),V.onBeforeRender(N,L,X,k,y,gt),V.transparent===!0&&V.side===je&&V.forceSinglePass===!1?(V.side=ze,V.needsUpdate=!0,N.renderBufferDirect(X,L,k,V,y,gt),V.side=ti,V.needsUpdate=!0,N.renderBufferDirect(X,L,k,V,y,gt),V.side=je):N.renderBufferDirect(X,L,k,V,y,gt),y.onAfterRender(N,L,X,k,V,gt)}function _r(y,L,X){L.isScene!==!0&&(L=Re);let k=B.get(y),V=b.state.lights,gt=b.state.shadowsArray,Mt=V.state.version,mt=ht.getParameters(y,V.state,gt,L,X,b.state.lightProbeGridArray),bt=ht.getProgramCacheKey(mt),Ct=k.programs;k.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?L.environment:null,k.fog=L.fog;let Bt=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;k.envMap=ot.get(y.envMap||k.environment,Bt),k.envMapRotation=k.environment!==null&&y.envMap===null?L.environmentRotation:y.envMapRotation,Ct===void 0&&(y.addEventListener("dispose",_n),Ct=new Map,k.programs=Ct);let Ht=Ct.get(bt);if(Ht!==void 0){if(k.currentProgram===Ht&&k.lightsStateVersion===Mt)return xc(y,mt),Ht}else mt.uniforms=ht.getUniforms(y),H!==null&&y.isNodeMaterial&&H.build(y,X,mt),y.onBeforeCompile(mt,N),Ht=ht.acquireProgram(mt,bt),Ct.set(bt,Ht),k.uniforms=mt.uniforms;let Tt=k.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Tt.clippingPlanes=G.uniform),xc(y,mt),k.needsLights=Lu(y),k.lightsStateVersion=Mt,k.needsLights&&(Tt.ambientLightColor.value=V.state.ambient,Tt.lightProbe.value=V.state.probe,Tt.sunLights.value=V.state.sun,Tt.sunLightShadows.value=V.state.sunShadow,Tt.directionalLights.value=V.state.directional,Tt.directionalLightShadows.value=V.state.directionalShadow,Tt.spotLights.value=V.state.spot,Tt.spotLightShadows.value=V.state.spotShadow,Tt.rectAreaLights.value=V.state.rectArea,Tt.ltc_1.value=V.state.rectAreaLTC1,Tt.ltc_2.value=V.state.rectAreaLTC2,Tt.pointLights.value=V.state.point,Tt.pointLightShadows.value=V.state.pointShadow,Tt.hemisphereLights.value=V.state.hemi,Tt.sunShadowMatrix.value=V.state.sunShadowMatrix,Tt.sunShadowCascade.value=V.state.sunShadowCascade,Tt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Tt.spotLightMatrix.value=V.state.spotLightMatrix,Tt.spotLightMap.value=V.state.spotLightMap,Tt.pointShadowMatrix.value=V.state.pointShadowMatrix),k.lightProbeGrid=b.state.lightProbeGridArray.length>0,k.currentProgram=Ht,k.uniformsList=null,Ht}function _c(y){if(y.uniformsList===null){let L=y.currentProgram.getUniforms();y.uniformsList=rs.seqWithValue(L.seq,y.uniforms)}return y.uniformsList}function xc(y,L){let X=B.get(y);X.outputColorSpace=L.outputColorSpace,X.batching=L.batching,X.batchingColor=L.batchingColor,X.instancing=L.instancing,X.instancingColor=L.instancingColor,X.instancingMorph=L.instancingMorph,X.skinning=L.skinning,X.morphTargets=L.morphTargets,X.morphNormals=L.morphNormals,X.morphColors=L.morphColors,X.morphTargetsCount=L.morphTargetsCount,X.numClippingPlanes=L.numClippingPlanes,X.numIntersection=L.numClipIntersection,X.vertexAlphas=L.vertexAlphas,X.vertexTangents=L.vertexTangents,X.toneMapping=L.toneMapping}function Ru(y,L){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;S.setFromMatrixPosition(L.matrixWorld);for(let X=0,k=y.length;X<k;X++){let V=y[X];if(V.texture!==null&&V.boundingBox.containsPoint(S))return V}return null}function Pu(y,L,X,k,V){L.isScene!==!0&&(L=Re),q.resetTextureUnits();let gt=L.fog,Mt=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?L.environment:null,mt=rt===null?N.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:Wt.workingColorSpace,bt=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Ct=ot.get(k.envMap||Mt,bt),Bt=k.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ht=!!X.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Tt=!!X.morphAttributes.position,Jt=!!X.morphAttributes.normal,ye=!!X.morphAttributes.color,ce=pn;k.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(ce=N.toneMapping);let re=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Ie=re!==void 0?re.length:0,St=B.get(k),Fe=b.state.lights;if(Xt===!0&&(Qt===!0||y!==et)){let oe=y===et&&k.id===Y;G.setState(k,y,oe)}let Yt=!1;k.version===St.__version?(St.needsLights&&St.lightsStateVersion!==Fe.state.version||St.outputColorSpace!==mt||V.isBatchedMesh&&St.batching===!1||!V.isBatchedMesh&&St.batching===!0||V.isBatchedMesh&&St.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&St.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&St.instancing===!1||!V.isInstancedMesh&&St.instancing===!0||V.isSkinnedMesh&&St.skinning===!1||!V.isSkinnedMesh&&St.skinning===!0||V.isInstancedMesh&&St.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&St.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&St.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&St.instancingMorph===!1&&V.morphTexture!==null||St.envMap!==Ct||k.fog===!0&&St.fog!==gt||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==G.numPlanes||St.numIntersection!==G.numIntersection)||St.vertexAlphas!==Bt||St.vertexTangents!==Ht||St.morphTargets!==Tt||St.morphNormals!==Jt||St.morphColors!==ye||St.toneMapping!==ce||St.morphTargetsCount!==Ie||!!St.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Yt=!0):(Yt=!0,St.__version=k.version);let Qe=St.currentProgram;Yt===!0&&(Qe=_r(k,L,V),H&&k.isNodeMaterial&&H.onUpdateProgram(k,Qe,St));let xn=!1,kn=!1,xi=!1,se=Qe.getUniforms(),xe=St.uniforms;if(_.useProgram(Qe.program)&&(xn=!0,kn=!0,xi=!0),k.id!==Y&&(Y=k.id,kn=!0),St.needsLights){let oe=Ru(b.state.lightProbeGridArray,V);St.lightProbeGrid!==oe&&(St.lightProbeGrid=oe,kn=!0)}if(xn||et!==y){_.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),se.setValue(D,"projectionMatrix",y.projectionMatrix),se.setValue(D,"viewMatrix",y.matrixWorldInverse);let Gn=se.map.cameraPosition;Gn!==void 0&&Gn.setValue(D,ie.setFromMatrixPosition(y.matrixWorld)),T.logarithmicDepthBuffer&&se.setValue(D,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&se.setValue(D,"isOrthographic",y.isOrthographicCamera===!0),et!==y&&(et=y,kn=!0,xi=!0)}if(St.needsLights&&(Fe.state.sunShadowMap.length>0&&se.setValue(D,"sunShadowMap",Fe.state.sunShadowMap,q),Fe.state.directionalShadowMap.length>0&&se.setValue(D,"directionalShadowMap",Fe.state.directionalShadowMap,q),Fe.state.spotShadowMap.length>0&&se.setValue(D,"spotShadowMap",Fe.state.spotShadowMap,q),Fe.state.pointShadowMap.length>0&&se.setValue(D,"pointShadowMap",Fe.state.pointShadowMap,q)),V.isSkinnedMesh){se.setOptional(D,V,"bindMatrix"),se.setOptional(D,V,"bindMatrixInverse");let oe=V.skeleton;oe&&(oe.boneTexture===null&&oe.computeBoneTexture(),se.setValue(D,"boneTexture",oe.boneTexture,q))}V.isBatchedMesh&&(se.setOptional(D,V,"batchingTexture"),se.setValue(D,"batchingTexture",V._matricesTexture,q),se.setOptional(D,V,"batchingIdTexture"),se.setValue(D,"batchingIdTexture",V._indirectTexture,q),se.setOptional(D,V,"batchingColorTexture"),V._colorsTexture!==null&&se.setValue(D,"batchingColorTexture",V._colorsTexture,q));let Vn=X.morphAttributes;if((Vn.position!==void 0||Vn.normal!==void 0||Vn.color!==void 0)&&A.update(V,X,Qe),(kn||St.receiveShadow!==V.receiveShadow)&&(St.receiveShadow=V.receiveShadow,se.setValue(D,"receiveShadow",V.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&L.environment!==null&&(xe.envMapIntensity.value=L.environmentIntensity),xe.dfgLUT!==void 0&&(xe.dfgLUT.value=C0()),kn){if(se.setValue(D,"toneMappingExposure",N.toneMappingExposure),St.needsLights&&Iu(xe,xi),gt&&k.fog===!0&&Et.refreshFogUniforms(xe,gt),Et.refreshMaterialUniforms(xe,k,J,Z,b.state.transmissionRenderTarget[y.id]),St.needsLights&&St.lightProbeGrid){let oe=St.lightProbeGrid;xe.probesSH.value=oe.texture,xe.probesMin.value.copy(oe.boundingBox.min),xe.probesMax.value.copy(oe.boundingBox.max),xe.probesResolution.value.copy(oe.resolution)}rs.upload(D,_c(St),xe,q)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(rs.upload(D,_c(St),xe,q),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&se.setValue(D,"center",V.center),se.setValue(D,"modelViewMatrix",V.modelViewMatrix),se.setValue(D,"normalMatrix",V.normalMatrix),se.setValue(D,"modelMatrix",V.matrixWorld),k.uniformsGroups!==void 0){let oe=k.uniformsGroups;for(let Gn=0,yi=oe.length;Gn<yi;Gn++){let vc=oe[Gn];st.update(vc,Qe),st.bind(vc,Qe)}}return Qe}function Iu(y,L){y.ambientLightColor.needsUpdate=L,y.lightProbe.needsUpdate=L,y.sunLights.needsUpdate=L,y.sunLightShadows.needsUpdate=L,y.directionalLights.needsUpdate=L,y.directionalLightShadows.needsUpdate=L,y.pointLights.needsUpdate=L,y.pointLightShadows.needsUpdate=L,y.spotLights.needsUpdate=L,y.spotLightShadows.needsUpdate=L,y.rectAreaLights.needsUpdate=L,y.hemisphereLights.needsUpdate=L}function Lu(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return K},this.getRenderTarget=function(){return rt},this.setRenderTargetTextures=function(y,L,X){let k=B.get(y);k.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),B.get(y.texture).__webglTexture=L,B.get(y.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:X,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,L){let X=B.get(y);X.__webglFramebuffer=L,X.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(y,L=0,X=0){rt=y,j=L,K=X;let k=null,V=!1,gt=!1;if(y){let mt=B.get(y);if(mt.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(D.FRAMEBUFFER,mt.__webglFramebuffer),it.copy(y.viewport),Pt.copy(y.scissor),At=y.scissorTest,_.viewport(it),_.scissor(Pt),_.setScissorTest(At),Y=-1;return}else if(mt.__webglFramebuffer===void 0)q.setupRenderTarget(y);else if(mt.__hasExternalTextures)q.rebindTextures(y,B.get(y.texture).__webglTexture,B.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let Bt=y.depthTexture;if(mt.__boundDepthTexture!==Bt){if(Bt!==null&&B.has(Bt)&&(y.width!==Bt.image.width||y.height!==Bt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(y)}}let bt=y.texture;(bt.isData3DTexture||bt.isDataArrayTexture||bt.isCompressedArrayTexture)&&(gt=!0);let Ct=B.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ct[L])?k=Ct[L][X]:k=Ct[L],V=!0):y.samples>0&&q.useMultisampledRTT(y)===!1?k=B.get(y).__webglMultisampledFramebuffer:Array.isArray(Ct)?k=Ct[X]:k=Ct,it.copy(y.viewport),Pt.copy(y.scissor),At=y.scissorTest}else it.copy(vt).multiplyScalar(J).floor(),Pt.copy(Ft).multiplyScalar(J).floor(),At=fe;if(X!==0&&(k=W),_.bindFramebuffer(D.FRAMEBUFFER,k)&&_.drawBuffers(y,k),_.viewport(it),_.scissor(Pt),_.setScissorTest(At),V){let mt=B.get(y.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+L,mt.__webglTexture,X)}else if(gt){let mt=L;for(let bt=0;bt<y.textures.length;bt++){let Ct=B.get(y.textures[bt]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+bt,Ct.__webglTexture,X,mt)}}else if(y!==null&&X!==0){let mt=B.get(y.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,mt.__webglTexture,X)}Y=-1};function yc(y){let L=B.get(y);return(L.__readFormat!==y.format||L.__readType!==y.type)&&(L.__readFormat=y.format,L.__readType=y.type,L.__formatReadable=T.textureFormatReadable(y.format),L.__typeReadable=T.textureTypeReadable(y.type)),L}this.readRenderTargetPixels=function(y,L,X,k,V,gt,Mt,mt=0){if(!(y&&y.isWebGLRenderTarget)){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let bt=B.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Mt!==void 0&&(bt=bt[Mt]),bt){_.bindFramebuffer(D.FRAMEBUFFER,bt);try{let Ct=y.textures[mt],Bt=Ct.format,Ht=Ct.type;y.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+mt);let Tt=yc(Ct);if(Tt.__formatReadable===!1){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Tt.__typeReadable===!1){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=y.width-k&&X>=0&&X<=y.height-V&&D.readPixels(L,X,k,V,ft.convert(Bt),ft.convert(Ht),gt)}finally{let Ct=rt!==null?B.get(rt).__webglFramebuffer:null;_.bindFramebuffer(D.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(y,L,X,k,V,gt,Mt,mt=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let bt=B.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Mt!==void 0&&(bt=bt[Mt]),bt)if(L>=0&&L<=y.width-k&&X>=0&&X<=y.height-V){_.bindFramebuffer(D.FRAMEBUFFER,bt);let Ct=y.textures[mt],Bt=Ct.format,Ht=Ct.type;y.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+mt);let Tt=yc(Ct);if(Tt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Tt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Jt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Jt),D.bufferData(D.PIXEL_PACK_BUFFER,gt.byteLength,D.STREAM_READ),D.readPixels(L,X,k,V,ft.convert(Bt),ft.convert(Ht),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);let ye=rt!==null?B.get(rt).__webglFramebuffer:null;_.bindFramebuffer(D.FRAMEBUFFER,ye);let ce=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Dh(D,ce,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Jt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,gt),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(Jt),D.deleteSync(ce),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,L=null,X=0){let k=Math.pow(2,-X),V=Math.floor(y.image.width*k),gt=Math.floor(y.image.height*k),Mt=L!==null?L.x:0,mt=L!==null?L.y:0;q.setTexture2D(y,0),D.copyTexSubImage2D(D.TEXTURE_2D,X,0,0,Mt,mt,V,gt),_.unbindTexture()},this.copyTextureToTexture=function(y,L,X=null,k=null,V=0,gt=0){let Mt,mt,bt,Ct,Bt,Ht,Tt,Jt,ye,ce=y.isCompressedTexture?y.mipmaps[gt]:y.image;if(X!==null)Mt=X.max.x-X.min.x,mt=X.max.y-X.min.y,bt=X.isBox3?X.max.z-X.min.z:1,Ct=X.min.x,Bt=X.min.y,Ht=X.isBox3?X.min.z:0;else{let xe=Math.pow(2,-V);Mt=Math.floor(ce.width*xe),mt=Math.floor(ce.height*xe),y.isDataArrayTexture?bt=ce.depth:y.isData3DTexture?bt=Math.floor(ce.depth*xe):bt=1,Ct=0,Bt=0,Ht=0}k!==null?(Tt=k.x,Jt=k.y,ye=k.z):(Tt=0,Jt=0,ye=0);let re=ft.convert(L.format),Ie=ft.convert(L.type),St;L.isData3DTexture?(q.setTexture3D(L,0),St=D.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(q.setTexture2DArray(L,0),St=D.TEXTURE_2D_ARRAY):(q.setTexture2D(L,0),St=D.TEXTURE_2D),_.activeTexture(D.TEXTURE0),_.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,L.flipY),_.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),_.pixelStorei(D.UNPACK_ALIGNMENT,L.unpackAlignment);let Fe=_.getParameter(D.UNPACK_ROW_LENGTH),Yt=_.getParameter(D.UNPACK_IMAGE_HEIGHT),Qe=_.getParameter(D.UNPACK_SKIP_PIXELS),xn=_.getParameter(D.UNPACK_SKIP_ROWS),kn=_.getParameter(D.UNPACK_SKIP_IMAGES);_.pixelStorei(D.UNPACK_ROW_LENGTH,ce.width),_.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ce.height),_.pixelStorei(D.UNPACK_SKIP_PIXELS,Ct),_.pixelStorei(D.UNPACK_SKIP_ROWS,Bt),_.pixelStorei(D.UNPACK_SKIP_IMAGES,Ht);let xi=y.isDataArrayTexture||y.isData3DTexture,se=L.isDataArrayTexture||L.isData3DTexture;if(y.isDepthTexture){let xe=B.get(y),Vn=B.get(L),oe=B.get(xe.__renderTarget),Gn=B.get(Vn.__renderTarget);_.bindFramebuffer(D.READ_FRAMEBUFFER,oe.__webglFramebuffer),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,Gn.__webglFramebuffer);for(let yi=0;yi<bt;yi++)xi&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,B.get(y).__webglTexture,V,Ht+yi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,B.get(L).__webglTexture,gt,ye+yi)),D.blitFramebuffer(Ct,Bt,Mt,mt,Tt,Jt,Mt,mt,D.DEPTH_BUFFER_BIT,D.NEAREST);_.bindFramebuffer(D.READ_FRAMEBUFFER,null),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(V!==0||y.isRenderTargetTexture||B.has(y)){let xe=B.get(y),Vn=B.get(L);_.bindFramebuffer(D.READ_FRAMEBUFFER,U),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,z);for(let oe=0;oe<bt;oe++)xi?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,xe.__webglTexture,V,Ht+oe):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,xe.__webglTexture,V),se?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Vn.__webglTexture,gt,ye+oe):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Vn.__webglTexture,gt),V!==0?D.blitFramebuffer(Ct,Bt,Mt,mt,Tt,Jt,Mt,mt,D.COLOR_BUFFER_BIT,D.NEAREST):se?D.copyTexSubImage3D(St,gt,Tt,Jt,ye+oe,Ct,Bt,Mt,mt):D.copyTexSubImage2D(St,gt,Tt,Jt,Ct,Bt,Mt,mt);_.bindFramebuffer(D.READ_FRAMEBUFFER,null),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else se?y.isDataTexture||y.isData3DTexture?D.texSubImage3D(St,gt,Tt,Jt,ye,Mt,mt,bt,re,Ie,ce.data):L.isCompressedArrayTexture?D.compressedTexSubImage3D(St,gt,Tt,Jt,ye,Mt,mt,bt,re,ce.data):D.texSubImage3D(St,gt,Tt,Jt,ye,Mt,mt,bt,re,Ie,ce):y.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,gt,Tt,Jt,Mt,mt,re,Ie,ce.data):y.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,gt,Tt,Jt,ce.width,ce.height,re,ce.data):D.texSubImage2D(D.TEXTURE_2D,gt,Tt,Jt,Mt,mt,re,Ie,ce);_.pixelStorei(D.UNPACK_ROW_LENGTH,Fe),_.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Yt),_.pixelStorei(D.UNPACK_SKIP_PIXELS,Qe),_.pixelStorei(D.UNPACK_SKIP_ROWS,xn),_.pixelStorei(D.UNPACK_SKIP_IMAGES,kn),gt===0&&L.generateMipmaps&&D.generateMipmap(St),_.unbindTexture()},this.initRenderTarget=function(y){B.get(y).__webglFramebuffer===void 0&&q.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?q.setTextureCube(y,0):y.isData3DTexture?q.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?q.setTexture2DArray(y,0):q.setTexture2D(y,0),_.unbindTexture()},this.resetState=function(){j=0,K=0,rt=null,_.reset(),xt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Wt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Wt._getUnpackColorSpace()}};var pu={type:"change"},cc={type:"start"},gu={type:"end"},Ro=new ui,mu=new Ye,R0=Math.cos(70*Tn.DEG2RAD),Te=new I,He=2*Math.PI,ne={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},lc=1e-6,Po=class extends nr{constructor(t,e=null){super(t,e),this.state=ne.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:jn.ROTATE,MIDDLE:jn.DOLLY,RIGHT:jn.PAN},this.touches={ONE:Qn.ROTATE,TWO:Qn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new $e,this._lastTargetPosition=new I,this._quat=new $e().setFromUnitVectors(t.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ji,this._sphericalDelta=new ji,this._scale=1,this._panOffset=new I,this._rotateStart=new _t,this._rotateEnd=new _t,this._rotateDelta=new _t,this._panStart=new _t,this._panEnd=new _t,this._panDelta=new _t,this._dollyStart=new _t,this._dollyEnd=new _t,this._dollyDelta=new _t,this._dollyDirection=new I,this._mouse=new _t,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=I0.bind(this),this._onPointerDown=P0.bind(this),this._onPointerUp=L0.bind(this),this._onContextMenu=z0.bind(this),this._onMouseWheel=U0.bind(this),this._onKeyDown=F0.bind(this),this._onTouchStart=O0.bind(this),this._onTouchMove=B0.bind(this),this._onMouseDown=D0.bind(this),this._onMouseMove=N0.bind(this),this._interceptControlDown=k0.bind(this),this._interceptControlUp=V0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ne.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(pu),this.update(),this.state=ne.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Te.copy(e).sub(this.target),Te.applyQuaternion(this._quat),this._spherical.setFromVector3(Te),this.autoRotate&&this.state===ne.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=He:n>Math.PI&&(n-=He),s<-Math.PI?s+=He:s>Math.PI&&(s-=He),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Te.setFromSpherical(this._spherical),Te.applyQuaternion(this._quatInverse),e.copy(this.target).add(Te),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Te.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new I(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new I(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Te.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ro.origin.copy(this.object.position),Ro.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ro.direction))<R0?this.object.lookAt(this.target):(mu.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ro.intersectPlane(mu,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>lc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>lc||this._lastTargetPosition.distanceToSquared(this.target)>lc?(this.dispatchEvent(pu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?He/60*this.autoRotateSpeed*t:He/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Te.setFromMatrixColumn(e,0),Te.multiplyScalar(-t),this._panOffset.add(Te)}_panUp(t,e){this.screenSpacePanning===!0?Te.setFromMatrixColumn(e,1):(Te.setFromMatrixColumn(e,0),Te.crossVectors(this.object.up,Te)),Te.multiplyScalar(t),this._panOffset.add(Te)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Te.copy(s).sub(this.target);let r=Te.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(He*this._rotateDelta.x/e.clientHeight),this._rotateUp(He*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(He*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-He*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(He*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-He*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(He*this._rotateDelta.x/e.clientHeight),this._rotateUp(He*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new _t,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function P0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function I0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function L0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(gu),this.state=ne.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function D0(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case jn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ne.DOLLY;break;case jn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ne.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ne.ROTATE}break;case jn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ne.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ne.PAN}break;default:this.state=ne.NONE}this.state!==ne.NONE&&this.dispatchEvent(cc)}function N0(i){switch(this.state){case ne.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ne.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ne.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function U0(i){this.enabled===!1||this.enableZoom===!1||this.state!==ne.NONE||(i.preventDefault(),this.dispatchEvent(cc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(gu))}function F0(i){this.enabled!==!1&&this._handleKeyDown(i)}function O0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Qn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ne.TOUCH_ROTATE;break;case Qn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ne.TOUCH_PAN;break;default:this.state=ne.NONE}break;case 2:switch(this.touches.TWO){case Qn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ne.TOUCH_DOLLY_PAN;break;case Qn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ne.TOUCH_DOLLY_ROTATE;break;default:this.state=ne.NONE}break;default:this.state=ne.NONE}this.state!==ne.NONE&&this.dispatchEvent(cc)}function B0(i){switch(this._trackPointer(i),this.state){case ne.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ne.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ne.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ne.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ne.NONE}}function z0(i){this.enabled!==!1&&i.preventDefault()}function k0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function V0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var os=["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh","twelfth"],ls=["\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D","\u4E03","\u516B","\u4E5D","\u5341","\u5341\u4E00","\u5341\u4E8C"],hc=[["r","right","\u53F3"],["l","left","\u5DE6"]],An=i=>i[0].toUpperCase()+i.slice(1);function _u(){let i=[],t=(r,a,o,l,c,u="")=>i.push({id:r,src:Array.isArray(a)?a:[a],en:o,zh:l,region:c,nick:u});t("frontal","frontal bone","Frontal bone","\u984D\u9AA8","skull","forehead bone"),t("occipital","occipital bone","Occipital bone","\u6795\u9AA8","skull"),t("sphenoid","sphenoid bone","Sphenoid bone","\u8776\u9AA8","skull"),t("ethmoid","ethmoid","Ethmoid bone","\u7BE9\u9AA8","skull"),t("vomer","vomer","Vomer","\u7281\u9AA8","skull"),t("mandible","mandible","Mandible","\u4E0B\u9837\u9AA8","skull","jawbone"),t("hyoid","hyoid bone","Hyoid bone","\u820C\u9AA8","skull");for(let[r,a,o]of hc)t(`${r}-parietal`,`${a} parietal bone`,`${An(a)} parietal bone`,`${o}\u9802\u9AA8`,"skull"),t(`${r}-temporal`,`${a} temporal bone`,`${An(a)} temporal bone`,`${o}\u9873\u9AA8`,"skull"),t(`${r}-nasal`,`${a} nasal bone`,`${An(a)} nasal bone`,`${o}\u9F3B\u9AA8`,"skull"),t(`${r}-maxilla`,`${a} maxilla`,`${An(a)} maxilla`,`${o}\u4E0A\u9837\u9AA8`,"skull","upper jawbone"),t(`${r}-lacrimal`,`${a} lacrimal bone`,`${An(a)} lacrimal bone`,`${o}\u6DDA\u9AA8`,"skull"),t(`${r}-zygomatic`,`${a} zygomatic bone`,`${An(a)} zygomatic bone`,`${o}\u9874\u9AA8`,"skull","cheekbone"),t(`${r}-palatine`,`${a} palatine bone`,`${An(a)} palatine bone`,`${o}\u816D\u9AA8`,"skull"),t(`${r}-concha`,`${a} inferior nasal concha`,`${An(a)} inferior nasal concha`,`${o}\u4E0B\u9F3B\u7532`,"skull");t("c1","atlas","Atlas (1st neck vertebra)","\u5BF0\u690E\uFF08\u7B2C\u4E00\u9838\u690E\uFF09","spine"),t("c2","axis","Axis (2nd neck vertebra)","\u6A1E\u690E\uFF08\u7B2C\u4E8C\u9838\u690E\uFF09","spine");for(let r=3;r<=7;r++)t(`c${r}`,`${os[r-1]} cervical vertebra`,`Cervical vertebra ${r} (neck)`,`\u7B2C${ls[r-1]}\u9838\u690E`,"spine");for(let r=1;r<=12;r++)t(`t${r}`,`${os[r-1]} thoracic vertebra`,`Thoracic vertebra ${r} (chest)`,`\u7B2C${ls[r-1]}\u80F8\u690E`,"spine");for(let r=1;r<=5;r++)t(`l${r}`,`${os[r-1]} lumbar vertebra`,`Lumbar vertebra ${r} (lower back)`,`\u7B2C${ls[r-1]}\u8170\u690E`,"spine");t("sacrum","sacrum","Sacrum","\u85A6\u9AA8","spine"),t("sternum","sternum","Sternum","\u80F8\u9AA8","chest","breastbone");for(let[r,a,o]of hc)for(let l=1;l<=12;l++)t(`${r}-rib-${l}`,`${a} ${os[l-1]} rib`,`${An(a)} rib ${l}`,`${o}\u5074\u7B2C${ls[l-1]}\u808B\u9AA8`,"chest");let e=[["thumb","\u62C7\u6307"],["index finger","\u98DF\u6307"],["middle finger","\u4E2D\u6307"],["ring finger","\u7121\u540D\u6307"],["little finger","\u5C0F\u6307"]],n=[["big toe","\u5927\u8173\u8DBE"],["second toe","\u7B2C\u4E8C\u8DBE"],["third toe","\u7B2C\u4E09\u8DBE"],["fourth toe","\u7B2C\u56DB\u8DBE"],["little toe","\u5C0F\u8DBE"]],s=[["scaphoid","\u821F\u72C0\u9AA8"],["lunate","\u6708\u72C0\u9AA8"],["triquetral","\u4E09\u89D2\u9AA8"],["pisiform","\u8C46\u72C0\u9AA8"],["trapezium","\u5927\u591A\u89D2\u9AA8"],["trapezoid","\u5C0F\u591A\u89D2\u9AA8"],["capitate","\u982D\u72C0\u9AA8"],["hamate","\u9264\u72C0\u9AA8"]];for(let[r,a,o]of hc){let l=An(a);t(`${r}-clavicle`,`${a} clavicle`,`${l} clavicle`,`${o}\u9396\u9AA8`,"shoulder","collarbone"),t(`${r}-scapula`,`${a} scapula`,`${l} scapula`,`${o}\u80A9\u80DB\u9AA8`,"shoulder","shoulder blade"),t(`${r}-humerus`,`${a} humerus`,`${l} humerus`,`${o}\u80B1\u9AA8`,"arm","upper arm bone"),t(`${r}-radius`,`${a} radius`,`${l} radius`,`${o}\u6A48\u9AA8`,"arm","forearm bone, thumb side"),t(`${r}-ulna`,`${a} ulna`,`${l} ulna`,`${o}\u5C3A\u9AA8`,"arm","forearm bone, little-finger side");for(let[c,u]of s)t(`${r}-${c}`,`${a} ${c}`,`${l} ${c}`,`${o}${u}`,"hand","wrist bone");for(let c=1;c<=5;c++)t(`${r}-mc${c}`,`${a} ${os[c-1]} metacarpal bone`,`${l} metacarpal ${c}`,`${o}\u624B\u7B2C${ls[c-1]}\u638C\u9AA8`,"hand",`palm bone of the ${e[c-1][0]}`);e.forEach(([c,u],p)=>{for(let[h,d]of[["proximal","\u8FD1\u7BC0"],["middle","\u4E2D\u7BC0"],["distal","\u9060\u7BC0"]])p===0&&h==="middle"||t(`${r}-f${p+1}-${h[0]}`,`${h} phalanx of ${a} ${c}`,`${l} ${c}, ${h} phalanx`,`${o}\u624B${u}${d}\u6307\u9AA8`,"hand","finger bone")}),t(`${r}-hip`,`${a} hip bone`,`${l} hip bone`,`${o}\u9AD6\u9AA8`,"pelvis"),t(`${r}-femur`,`${a} femur`,`${l} femur`,`${o}\u80A1\u9AA8`,"leg","thighbone"),t(`${r}-patella`,`${a} patella`,`${l} patella`,`${o}\u9AD5\u9AA8`,"leg","kneecap"),t(`${r}-tibia`,`${a} tibia`,`${l} tibia`,`${o}\u811B\u9AA8`,"leg","shinbone"),t(`${r}-fibula`,`${a} fibula`,`${l} fibula`,`${o}\u8153\u9AA8`,"leg","calf bone"),t(`${r}-talus`,`${a} talus`,`${l} talus`,`${o}\u8DDD\u9AA8`,"foot","ankle bone"),t(`${r}-calcaneus`,`${a} calcaneus`,`${l} calcaneus`,`${o}\u8DDF\u9AA8`,"foot","heel bone"),t(`${r}-navicular`,`navicular bone of ${a} foot`,`${l} navicular`,`${o}\u8DB3\u821F\u9AA8`,"foot"),t(`${r}-cuboid`,`${a} cuboid bone`,`${l} cuboid`,`${o}\u9AB0\u9AA8`,"foot");for(let[c,u]of[["medial","\u5167\u5074"],["intermediate","\u4E2D\u9593"],["lateral","\u5916\u5074"]])t(`${r}-cun-${c[0]}`,`${a} ${c} cuneiform bone`,`${l} ${c} cuneiform`,`${o}${u}\u6954\u9AA8`,"foot");for(let c=1;c<=5;c++)t(`${r}-mt${c}`,`${a} ${os[c-1]} metatarsal bone`,`${l} metatarsal ${c}`,`${o}\u8173\u7B2C${ls[c-1]}\u8E60\u9AA8`,"foot");n.forEach(([c,u],p)=>{for(let[h,d]of[["proximal","\u8FD1\u7BC0"],["middle","\u4E2D\u7BC0"],["distal","\u9060\u7BC0"]])p===0&&h==="middle"||t(`${r}-t${p+1}-${h[0]}`,`${h} phalanx of ${a} ${c}`,`${l} ${c}, ${h} phalanx`,`${o}\u8173${u}${d}\u8DBE\u9AA8`,"foot","toe bone")})}return i}var hv=new Nt(15656143),uv=new Map(_u().map(i=>[i.id,i]));function xu(i,t,e){let n=new I;return{add(s,r){let a=document.createElement("span");return a.className=`al-lab ${s}`,a.innerHTML=r,i.appendChild(a),a},place(s,r,a=0){n.copy(r).project(e);let o=t.clientWidth,l=t.clientHeight,c=n.z>1||Math.abs(n.x)>1.1||Math.abs(n.y)>1.1;s.style.opacity=c?0:1;let u=s.offsetWidth/2+6,p=Math.min(o-u,Math.max(u,(n.x*.5+.5)*o));s.style.transform=`translate(${p}px, ${(-n.y*.5+.5)*l+a}px) translate(-50%, -50%)`}}}function yu(i,t,e={}){let n=()=>{let s=document.querySelector(i);if(!s)return;let r=null,a=!1,o=()=>(a||(a=!0,r=t(s)),r),l=new IntersectionObserver(c=>{c[0].isIntersecting&&(l.disconnect(),o())},{rootMargin:"600px"});l.observe(s);for(let[c,u]of Object.entries(e))document.querySelectorAll(`[data-lab-${c}]`).forEach(p=>p.addEventListener("click",h=>{let d=o();if(!d)return;h.preventDefault(),s.scrollIntoView({behavior:"smooth",block:"center"});let m=p.getAttribute(`data-lab-${c}`),v=()=>d.ready()?u(d,m):setTimeout(v,150);v()}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n):n()}var cs=new Nt(8006246),hs=new Nt(16725044),G0=.07,vu=i=>String(i).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),ut=(i,t,e)=>new I(i,t,e),Ee={ra:{c:ut(-.62,.5,.05),s:ut(.42,.4,.4),side:"r",en:"Right atrium",zh:"\u53F3\u5FC3\u623F"},rv:{c:ut(-.34,-.42,.22),s:ut(.5,.62,.42),side:"r",en:"Right ventricle",zh:"\u53F3\u5FC3\u5BA4"},la:{c:ut(.56,.56,-.2),s:ut(.4,.36,.38),side:"l",en:"Left atrium",zh:"\u5DE6\u5FC3\u623F"},lv:{c:ut(.36,-.48,0),s:ut(.52,.72,.5),side:"l",en:"Left ventricle",zh:"\u5DE6\u5FC3\u5BA4"}};function Io(i,t,e,n,s=!0){let r=[];for(let a=0;a<=n*8;a++){let o=a/(n*8),l=o*n*Math.PI*2;s?r.push(ut(i.x+Math.sin(l)*t*.5,i.y+e*.5-o*e,i.z+Math.cos(l)*t*.25)):r.push(ut(i.x-t*.5+o*t,i.y+Math.sin(l)*e*.5,i.z+Math.cos(l)*e*.25))}return r}var Mu=ut(-2.35,.55,-.1),bu=ut(2.35,.55,-.1),Tu=ut(0,2.75,-.1),Eu=ut(0,-2.75,-.1);function H0(){let i=Io(Mu,.9,1.5,3),t=Io(bu,.9,1.5,3),e=Io(Tu,1.3,.5,3,!1),n=Io(Eu,1.6,.6,3,!1).reverse(),s=ut(-.02,1.15,.38);return{inR:[Ee.ra.c,ut(-.55,.05,.18),Ee.rv.c],inL:[Ee.la.c,ut(.5,.05,-.08),Ee.lv.c],pulm:[{key:"lungR",out:[Ee.rv.c,ut(-.18,.25,.42),s,ut(-.8,1.35,.25),ut(-1.7,1.45,.05),i[0]],cap:i,back:[i[i.length-1],ut(-1.6,-.1,-.35),ut(-.6,.3,-.62),ut(.2,.5,-.55),Ee.la.c]},{key:"lungL",out:[Ee.rv.c,ut(-.18,.25,.42),s,ut(.8,1.35,.25),ut(1.7,1.45,.05),t[0]],cap:t,back:[t[t.length-1],ut(1.7,-.1,-.35),ut(1.1,.35,-.45),Ee.la.c]}],sys:[{key:"head",out:[Ee.lv.c,ut(.18,.2,.12),ut(.12,1.3,.02),ut(-.05,1.75,-.12),ut(.35,2.3,-.1),e[0]],cap:e,back:[e[e.length-1],ut(-.9,2.3,.05),ut(-.72,1.5,.1),ut(-.66,.95,.08),Ee.ra.c]},{key:"lower",out:[Ee.lv.c,ut(.18,.2,.12),ut(.12,1.3,.02),ut(-.05,1.75,-.12),ut(-.35,1.3,-.5),ut(-.15,-.9,-.6),ut(.4,-2,-.3),n[0]],cap:n,back:[n[n.length-1],ut(-.7,-1.9,.12),ut(-.78,-.6,.12),ut(-.7,.1,.08),Ee.ra.c]}]}}function W0(i,t,e){let n=i.pulm[t],s=i.sys[e],r=a=>new di(a,!1,"centripetal");return[{curve:r(i.inR),w:1,flow:"dia",stop:0,o2:"poor"},{curve:r(n.out),w:1.4,flow:"sys",stop:1,o2:"poor"},{curve:r(n.cap),w:1.6,flow:"sys",stop:3,o2:"lung"},{curve:r(n.back),w:1.2,flow:"sys",stop:4,o2:"rich"},{curve:r(i.inL),w:1,flow:"dia",stop:4,o2:"rich"},{curve:r(s.out),w:1.6,flow:"sys",stop:5,o2:"rich"},{curve:r(s.cap),w:1.8,flow:"sys",stop:7,o2:"body"},{curve:r(s.back),w:1.8,flow:"sys",stop:8,o2:"poor"}]}var _i=.12,us=.45;function Lo(i,t,e){return i>t&&i<e?Math.sin(Math.PI*(i-t)/(e-t)):0}function Su(i){let t=0,e=400;for(let n=0;n<e;n++)t+=i((n+.5)/e)/e;return n=>i(n)/t}var X0={sys:Su(i=>.18+Lo(i,_i,us+.05)*1.6),dia:Su(i=>.18+Lo(i,us,1)*1.1+Lo(i,0,_i)*1.4)};function q0(){let i=document.createElement("canvas");i.width=i.height=64;let t=i.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.3,"rgba(255,230,160,.7)"),e.addColorStop(1,"rgba(255,200,80,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new Ws(i)}function Y0(i){let t=R=>i.querySelector(R),e=t(".al-space"),n=t(".al-space-cv"),s;try{s=new wo({canvas:n,antialias:!0})}catch{return i.classList.add("al-nogl"),null}s.setPixelRatio(Math.min(window.devicePixelRatio||1,2));let r=new Ds;r.background=new Nt(660004);let a=new Ne(32,1,.1,100),o=ut(0,.1,0),l=()=>ut(1.6,.9,12.6).multiplyScalar(a.aspect<.9?1.35:1),c=new Po(a,n);c.enableDamping=!0,c.dampingFactor=.08,c.minDistance=3,c.maxDistance=26,c.target.copy(o),r.add(new Qs(14674175,2759200,1)),r.add(new er(16777215,.2));let u=new Ki(16774112,2);u.position.set(3,4,6),r.add(u);let p=new Ki(10470655,.9);p.position.set(-4,2,-4),r.add(p);let h={bpm:t(".hr-bpm"),src:t(".hr-src"),day:t(".hr-day"),lmin:t(".hr-lmin"),lday:t(".hr-lday"),tubs:t(".hr-tubs"),stops:[...i.querySelectorAll(".hr-stops li")],play:t(".al-play"),measure:t(".hr-measure"),tap:t(".hr-tap"),tapN:t(".hr-tap-n"),tapS:t(".hr-tap-s"),tapBox:t(".hr-tapbox"),tapMsg:t(".hr-tap-msg")},d=xu(t(".al-labels"),n,a),m={bpm:72,phase:0,playing:!0,speed:1,labels:!0,follow:!0,wall:!0,sound:!1,src:"rest",measuring:null,focus:null,focusT:0},v=new un;r.add(v);let g={};for(let[R,G]of Object.entries(Ee)){let nt=new Je({color:G.side==="r"?cs:hs,roughness:.45,transparent:!0,opacity:.9,emissive:0}),at=new ge(new Bn(1,40,28),nt);at.position.copy(G.c),at.scale.copy(G.s),v.add(at),g[R]=at}let f=new ge(new Bn(1,48,32),new Je({color:14251887,transparent:!0,opacity:.16,roughness:.6,depthWrite:!1,side:je}));f.position.set(.02,-.05,.02),f.scale.set(1.3,1.35,.95),f.rotation.z=.35,f.renderOrder=3,v.add(f);let E=new ge(new Bn(1,24,16),new Je({color:13134434,roughness:.7}));E.position.set(.02,-.1,.05),E.scale.set(.05,1.05,.45),v.add(E);let C={},S=(R,G,nt)=>{let at=new un;at.add(new ge(new Js(.13,.025,10,28),new Je({color:16181192,roughness:.4})));let A=new ge(new qs(.12,24),new Je({color:nt,side:je,transparent:!0,opacity:.85}));return at.add(A),at.position.copy(R),at.lookAt(R.clone().add(G)),at.userData.leaf=A,v.add(at),at};C.tri=S(ut(-.55,.05,.18),ut(.2,1,0),16181192),C.mit=S(ut(.5,.05,-.08),ut(-.2,1,0),16181192),C.pul=S(ut(-.12,.62,.44),ut(.1,1,.2),16181192),C.aor=S(ut(.16,.55,.1),ut(0,1,0),16181192);let M=H0(),b=new un;r.add(b);let P=(R,G,nt=.07,at=.28)=>{let A=new ge(new Ks(new di(R,!1,"centripetal"),96,nt,12,!1),new Je({color:G,transparent:!0,opacity:at,roughness:.5,depthWrite:!1}));return A.renderOrder=2,b.add(A),A};for(let R of M.pulm)P(R.out,cs,.08),P(R.cap,12606072,.035,.35),P(R.back,hs,.075);for(let R of M.sys)P(R.out,hs,.09),P(R.cap,12606072,.035,.35),P(R.back,cs,.085);let x=(R,G,nt,at=.14)=>{let A=new ge(new Bn(1,36,24),new Je({color:nt,transparent:!0,opacity:at,roughness:.8,depthWrite:!1}));return A.position.copy(R),A.scale.copy(G),A.renderOrder=1,r.add(A),A},w=[x(Mu,ut(.72,1.15,.55),15902648,.18),x(bu,ut(.72,1.15,.55),15902648,.18)];x(Tu,ut(1.05,.55,.45),10470655,.1),x(Eu,ut(1.25,.6,.45),10470655,.1);let N=[];for(let R=0;R<2;R++)for(let G=0;G<2;G++)N.push(W0(M,R,G));let F=280,H=new Vs(new Bn(.045,10,8),new Je({roughness:.35}),F);r.add(H);let W=[],U=N[0].reduce((R,G)=>R+G.w,0);for(let R=0;R<F;R++){let G=R%4===0?0:1,nt=R%2;W.push({circ:N[nt*2+G],seg:0,u:0,pos:R/F*U})}for(let R of W){let G=R.pos;for(let nt=0;nt<R.circ.length;nt++){if(G<R.circ[nt].w||nt===R.circ.length-1){R.seg=nt,R.u=Math.min(.999,G/R.circ[nt].w);break}G-=R.circ[nt].w}}let z=W[Math.floor(F*.37)];z.circ=N[1];let j=new Os(new Xi({map:q0(),blending:sr,depthWrite:!1,transparent:!0}));j.scale.set(.5,.5,1),r.add(j);let rt=Array.from({length:60},()=>ut(0,0,0)),Y=new Gs(new Ce().setFromPoints(rt),new Yi({color:16765806,transparent:!0,opacity:.8}));r.add(Y);let et=new Se,it=new Nt;function Pt(R,G){let nt=R.o2;return nt==="lung"?it.copy(cs).lerp(hs,Tn.smoothstep(G,.25,.75)):nt==="body"?it.copy(hs).lerp(cs,Tn.smoothstep(G,.25,.75)):nt==="rich"?it.copy(hs):it.copy(cs)}let At=ut(0,0,0);function jt(){for(let G=0;G<F;G++){let nt=W[G],at=nt.circ[nt.seg];at.curve.getPointAt(Math.min(1,nt.u),At),et.position.copy(At);let A=nt===z?1.9:1;et.scale.set(A,A,A),et.updateMatrix(),H.setMatrixAt(G,et.matrix),H.setColorAt(G,Pt(at,nt.u))}H.instanceMatrix.needsUpdate=!0,H.instanceColor&&(H.instanceColor.needsUpdate=!0),z.circ[z.seg].curve.getPointAt(Math.min(1,z.u),j.position)}function Gt(R){let G=m.bpm/60*m.speed,nt=U/8;for(let at of W){let A=at.circ[at.seg];for(at.u+=X0[A.flow](m.phase)*G*nt*R/A.w;at.u>=1;){if(at.u-=1,at.seg=(at.seg+1)%at.circ.length,at.seg===0&&at!==z){let lt=Math.random()<.25?0:1,tt=Math.random()<.5?0:1;at.circ=N[tt*2+lt]}A=at.circ[at.seg]}}}function qt(R){let G=1-.14*Lo(R,0,_i+.02),nt=1-.2*Tn.smoothstep(R,_i,_i+.1)*(1-Tn.smoothstep(R,us-.05,us+.12));return{atria:G,vent:nt}}function Z(){let{atria:R,vent:G}=qt(m.phase);for(let at of["ra","la"])g[at].scale.copy(Ee[at].s).multiplyScalar(R);for(let at of["rv","lv"])g[at].scale.copy(Ee[at].s).multiplyScalar(G);f.scale.set(1.3,1.35,.95).multiplyScalar(.94+.06*G);let nt=m.phase>_i&&m.phase<us;C.tri.userData.leaf.visible=nt,C.mit.userData.leaf.visible=nt,C.pul.userData.leaf.visible=!nt,C.aor.userData.leaf.visible=!nt;for(let[at,A]of Object.entries(g)){let lt=m.focus===at&&m.focusT>0;A.material.emissive.setHex(lt?16762967:0),A.material.emissiveIntensity=lt?.35+.35*Math.sin(m.focusT*9):0}}let J=null;function yt(R,G,nt){if(!J)return;let at=J.createOscillator(),A=J.createGain();at.type="sine",at.frequency.setValueAtTime(R,J.currentTime),at.frequency.exponentialRampToValueAtTime(R*.6,J.currentTime+G),A.gain.setValueAtTime(1e-4,J.currentTime),A.gain.exponentialRampToValueAtTime(nt,J.currentTime+.012),A.gain.exponentialRampToValueAtTime(1e-4,J.currentTime+G),at.connect(A).connect(J.destination),at.start(),at.stop(J.currentTime+G+.02)}let Dt={};for(let[R,G]of Object.entries(Ee))Dt[R]=d.add(`hr-lb hr-lb-${G.side}`,`${G.en} \xB7 ${G.zh}`);let Ft=[["lungR","Lung \xB7 \u80BA",ut(-2.35,1.95,0)],["lungL","Lung \xB7 \u80BA",ut(2.35,1.95,0)],["head","Head and arms \xB7 \u982D\u8207\u624B\u81C2",ut(0,3.35,0)],["lower","Body and legs \xB7 \u8EAB\u9AD4\u8207\u817F",ut(0,-3.4,0)],["aorta","Aorta \xB7 \u4E3B\u52D5\u8108",ut(.55,1.8,0)],["pa","Pulmonary artery \xB7 \u80BA\u52D5\u8108",ut(-1.05,1.7,.25)],["vc","Vena cava \xB7 \u8154\u975C\u8108",ut(-1.3,-1.2,.2)],["pv","Pulmonary veins \xB7 \u80BA\u975C\u8108",ut(1.45,-.25,-.2)],["valve","Valves \xB7 \u74E3\u819C",ut(-.2,.05,.55)]].map(([R,G,nt])=>({k:R,el:d.add(`hr-lb hr-lb-x hr-lb-${R}`,G),at:nt})),fe=d.add("hr-side hr-side-r","Right side \u2192 lungs<small>\u53F3\u5FC3\uFF1A\u9001\u5230\u80BA</small>"),Ot=d.add("hr-side hr-side-l","Left side \u2192 body<small>\u5DE6\u5FC3\uFF1A\u9001\u5230\u5168\u8EAB</small>"),Xt={ra:ut(-.72,.28,.2),rv:ut(-.78,-.35,.3),la:ut(.72,.3,0),lv:ut(.8,-.42,.2)};function Qt(){let R=m.labels;for(let[G,nt]of Object.entries(Dt))nt.hidden=!R&&m.focus!==G,nt.hidden||d.place(nt,Ee[G].c.clone().add(Xt[G]));for(let G of Ft)G.el.hidden=!R,R&&d.place(G.el,G.at);fe.hidden=Ot.hidden=!R,R&&(d.place(fe,ut(-1.05,-1.35,.4)),d.place(Ot,ut(1.1,-1.45,.3)))}let Vt={rest:["Adult at rest","\u6210\u4EBA\u5B89\u975C\u6642"],sleep:["Asleep","\u7761\u89BA\u6642"],child:["Child at rest","\u5B69\u5B50\u5B89\u975C\u6642"],run:["Running","\u8DD1\u6B65\u6642"],you:["Your pulse","\u4F60\u7684\u8108\u640F"]},ie=R=>Math.round(R).toLocaleString("en-US");function pe(){h.bpm.textContent=String(Math.round(m.bpm));let R=Vt[m.src];h.src.innerHTML=`${vu(R[0])}<small>${vu(R[1])}</small>`;let G=m.bpm*G0;h.day.textContent=ie(m.bpm*1440),h.lmin.textContent=G.toFixed(1),h.lday.textContent=ie(G*1440),h.tubs.textContent=ie(G*1440/150),i.querySelectorAll("[data-rate]").forEach(nt=>nt.setAttribute("aria-pressed",nt.getAttribute("data-rate")===m.src?"true":"false"))}let Re=-1;function le(){let G=z.circ[z.seg].stop;z.seg===1&&z.u<.12?G=1:z.seg===1&&(G=2),z.seg===4&&(G=z.u<.5?4:5),z.seg===5&&(G=z.u<.1?5:6),z.seg===0&&(G=z.u<.5?0:1),G!==Re&&(Re=G,h.stops.forEach((nt,at)=>nt.classList.toggle("on",at===G)))}let me={sleep:55,rest:72,child:90,run:150};i.querySelectorAll("[data-rate]").forEach(R=>R.addEventListener("click",()=>{m.src=R.getAttribute("data-rate"),m.bpm=me[m.src],pe()}));function D(R){m.playing=R,i.classList.toggle("is-playing",R),i.classList.remove("al-fresh"),h.play.setAttribute("aria-pressed",R?"true":"false"),h.play.querySelector(".al-play-t").textContent=R?"Pause \xB7 \u66AB\u505C":"Play \xB7 \u64AD\u653E"}h.play.addEventListener("click",()=>D(!m.playing)),i.querySelectorAll(".al-speed button").forEach(R=>R.addEventListener("click",()=>{m.speed=parseFloat(R.getAttribute("data-speed")),i.querySelectorAll(".al-speed button").forEach(G=>G.setAttribute("aria-pressed",G===R?"true":"false")),m.playing||D(!0)}));let _e=(R,G)=>{let nt=t(R);nt&&nt.addEventListener("change",()=>G(nt.checked))};_e('[data-t="labels"]',R=>{m.labels=R}),_e('[data-t="follow"]',R=>{m.follow=R,j.visible=Y.visible=R,i.classList.toggle("hr-nofollow",!R)}),_e('[data-t="wall"]',R=>{f.visible=R}),_e('[data-t="sound"]',R=>{if(m.sound=R,R&&!J)try{J=new(window.AudioContext||window.webkitAudioContext)}catch{J=null}J&&J.state==="suspended"&&J.resume()}),t(".al-home").addEventListener("click",()=>q(l(),o));let $t=15;function T(){m.measuring={t0:performance.now(),n:0},h.tapBox.classList.add("on"),h.measure.hidden=!0,h.tapN.textContent="0",h.tapS.textContent=String($t),h.tapMsg.innerHTML='Tap the big button (or press the space bar) every time you feel a beat.<span class="zh">\u6BCF\u6478\u5230\u4E00\u4E0B\u8108\u640F\uFF0C\u5C31\u6309\u4E00\u6B21\u5927\u6309\u9215\uFF08\u6216\u7A7A\u767D\u9375\uFF09\u3002</span>',h.tap.focus({preventScroll:!0})}function _(){m.measuring&&(m.measuring.n+=1,h.tapN.textContent=String(m.measuring.n),h.tap.classList.remove("hit"),h.tap.offsetWidth,h.tap.classList.add("hit"))}function O(){let R=m.measuring.n;if(m.measuring=null,h.tapBox.classList.remove("on"),h.measure.hidden=!1,h.measure.querySelector("span").innerHTML="Measure again<small>\u518D\u91CF\u4E00\u6B21</small>",R<5){h.tapMsg.innerHTML='Only a few taps. Find your pulse first, then try again.<span class="zh">\u6309\u7684\u6B21\u6578\u592A\u5C11\uFF0C\u5148\u627E\u5230\u8108\u640F\u518D\u8A66\u4E00\u6B21\u3002</span>';return}let G=Tn.clamp(R*4,40,220);m.bpm=G,m.src="you",pe(),h.tapMsg.innerHTML=`${R} beats in 15 seconds \xD7 4 = <b>${G}</b> beats a minute. The heart in the model now beats with yours.<span class="zh">15 \u79D2 ${R} \u4E0B \xD7 4 \uFF1D \u6BCF\u5206\u9418 <b>${G}</b> \u4E0B\u3002\u6A21\u578B\u88E1\u7684\u5FC3\u81DF\u73FE\u5728\u8DDF\u8457\u4F60\u7684\u5FC3\u8DF3\u8DF3\u52D5\u3002</span>`}h.measure.addEventListener("click",T),h.tap.addEventListener("pointerdown",R=>{R.preventDefault(),_()}),h.tap.addEventListener("keydown",R=>{(R.key===" "||R.key==="Enter")&&(R.preventDefault(),_())});let B={t:1,p0:ut(0,0,0),p1:ut(0,0,0),t0:ut(0,0,0),t1:ut(0,0,0)};function q(R,G){B.p0.copy(a.position),B.t0.copy(c.target),B.p1.copy(R),B.t1.copy(G),B.t=0}function ot(R){m.focus=R,m.focusT=3,q(Ee[R].c.clone().multiplyScalar(.5).add(ut(.9,.6,6.2)),Ee[R].c.clone().multiplyScalar(.5))}function ct(){let R=e.clientWidth,G=e.clientHeight;!R||!G||(s.setSize(R,G,!1),a.aspect=R/G,a.fov=a.aspect<.9?40:32,a.updateProjectionMatrix())}if(new ResizeObserver(ct).observe(e),ct(),a.position.copy(l()),e.clientWidth<520){m.labels=!1;let R=t('[data-t="labels"]');R&&(R.checked=!1)}let $=!1,Q=0,ht=0;function Et(R){if(m.playing){let G=m.phase;m.phase=(m.phase+R*m.bpm/60*m.speed)%1;let nt=at=>G<at&&m.phase>=at||m.phase<G&&(G<at||m.phase>=at);m.sound&&m.speed>=1&&(nt(_i)&&yt(62,.16,.9),nt(us)&&yt(90,.1,.55)),Gt(R)}if(m.focusT>0&&(m.focusT-=R),m.measuring){let G=$t-(performance.now()-m.measuring.t0)/1e3;h.tapS.textContent=String(Math.max(0,Math.ceil(G))),G<=0&&O()}if(Z(),jt(),m.follow&&(rt.pop(),rt.unshift(j.position.clone()),Y.geometry.setFromPoints(rt),le()),w.forEach((G,nt)=>{let at=1+.03*Math.sin(performance.now()/700+nt);G.scale.set(.72*at,1.15*at,.55*at)}),B.t<1){B.t=Math.min(1,B.t+R/.9);let G=Tn.smootherstep(B.t,0,1);a.position.lerpVectors(B.p0,B.p1,G),c.target.lerpVectors(B.t0,B.t1,G)}}function dt(R){if(Q=0,!$)return;let G=Math.min(.05,(R-(ht||R))/1e3);ht=R,Et(G),c.update(),Qt(),s.render(r,a),Q=requestAnimationFrame(dt)}new IntersectionObserver(R=>{$=R[0].isIntersecting,$&&!Q&&(ht=0,Q=requestAnimationFrame(dt))},{rootMargin:"120px"}).observe(i),document.addEventListener("keydown",R=>{m.measuring&&R.key===" "&&document.activeElement!==h.tap&&(R.preventDefault(),_())});for(let R=0;R<40;R++)m.phase=(m.phase+.025)%1,Gt(.025*60/m.bpm);return pe(),Z(),jt(),i.classList.add("al-ready","al-fresh","is-playing"),i.__lab={camera:a,controls:c,state:m,focusChamber:ot,run:R=>{for(let G=0;G<R;G+=.02)Et(.02)},render:()=>{c.update(),Qt(),s.render(r,a)}},{ready:()=>!0,focus:ot,measure:T}}yu("[data-heart-lab]",Y0,{focus:(i,t)=>i.focus(t),measure:i=>i.measure()});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
