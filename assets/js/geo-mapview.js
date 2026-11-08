(()=>{var Qn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ti={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ic=0,So=1,sc=2;var Es=1,rc=2,Wi=3,ei=0,ze=1,we=2,yn=0,Xi=1,bo=2,To=3,wo=4,ac=5;var fi=100,oc=101,lc=102,cc=103,hc=104,uc=200,dc=201,fc=202,pc=203,Eo=204,Ao=205,mc=206,gc=207,_c=208,xc=209,yc=210,vc=211,Mc=212,Sc=213,bc=214,or=0,lr=1,cr=2,Ni=3,hr=4,ur=5,dr=6,fr=7,zr=0,Tc=1,wc=2,cn=0,Co=1,Ro=2,Po=3,Io=4,Lo=5,Do=6,No=7;var Uo=300,ni=301,pi=302,kr=303,Vr=304,As=306,pr=1e3,_n=1001,mr=1002,Te=1003,Ec=1004;var Cs=1005;var Ae=1006,Gr=1007;var ii=1008;var He=1009,Fo=1010,Oo=1011,qi=1012,Hr=1013,hn=1014,un=1015,dn=1016,Wr=1017,Xr=1018,Yi=1020,Bo=35902,zo=35899,ko=1021,Vo=1022,en=1023,xn=1026,si=1027,Go=1028,qr=1029,ri=1030,Yr=1031;var Zr=1033,Rs=33776,Ps=33777,Is=33778,Ls=33779,$r=35840,Jr=35841,Kr=35842,jr=35843,Qr=36196,ta=37492,ea=37496,na=37488,ia=37489,Ds=37490,sa=37491,ra=37808,aa=37809,oa=37810,la=37811,ca=37812,ha=37813,ua=37814,da=37815,fa=37816,pa=37817,ma=37818,ga=37819,_a=37820,xa=37821,ya=36492,va=36494,Ma=36495,Sa=36283,ba=36284,Ns=36285,Ta=36286;var cs=2300,gr=2301,rr=2302,mo=2303,go=2400,_o=2401,xo=2402;var Ac=3200;var wa=0,Cc=1,Pn="",ke="srgb",hs="srgb-linear",us="linear",ee="srgb";var ar=7680;var Rc=519,Pc=512,Ic=513,Lc=514,Ea=515,Dc=516,Nc=517,Aa=518,Uc=519,Fc=35044;var Ho="300 es",on=2e3,Ui=2001;function Gh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Hh(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ds(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Oc(){let i=ds("canvas");return i.style.display="block",i}var Ul={},Fi=null;function Wo(...i){let t="THREE."+i.shift();Fi?Fi("log",t,...i):console.log(t,...i)}function Bc(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Nt(...i){i=Bc(i);let t="THREE."+i.shift();if(Fi)Fi("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Ft(...i){i=Bc(i);let t="THREE."+i.shift();if(Fi)Fi("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function di(...i){let t=i.join(" ");t in Ul||(Ul[t]=!0,Nt(...i))}function zc(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var kc={[or]:lr,[cr]:dr,[hr]:fr,[Ni]:ur,[lr]:or,[dr]:cr,[fr]:hr,[ur]:Ni},ln=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Pe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Fl=1234567,os=Math.PI/180,Oi=180/Math.PI;function Zi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pe[i&255]+Pe[i>>8&255]+Pe[i>>16&255]+Pe[i>>24&255]+"-"+Pe[t&255]+Pe[t>>8&255]+"-"+Pe[t>>16&15|64]+Pe[t>>24&255]+"-"+Pe[e&63|128]+Pe[e>>8&255]+"-"+Pe[e>>16&255]+Pe[e>>24&255]+Pe[n&255]+Pe[n>>8&255]+Pe[n>>16&255]+Pe[n>>24&255]).toLowerCase()}function Wt(i,t,e){return Math.max(t,Math.min(e,i))}function Xo(i,t){return(i%t+t)%t}function Wh(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Xh(i,t,e){return i!==t?(e-i)/(t-i):0}function ls(i,t,e){return(1-e)*i+e*t}function qh(i,t,e,n){return ls(i,t,1-Math.exp(-e*n))}function Yh(i,t=1){return t-Math.abs(Xo(i,t*2)-t)}function Zh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function $h(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Jh(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Kh(i,t){return i+Math.random()*(t-i)}function jh(i){return i*(.5-Math.random())}function Qh(i){i!==void 0&&(Fl=i);let t=Fl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function tu(i){return i*os}function eu(i){return i*Oi}function nu(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function iu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function su(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ru(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),d=a((t+n)/2),m=r((t-n)/2),u=a((t-n)/2),g=r((n-t)/2),x=a((n-t)/2);switch(s){case"XYX":i.set(o*d,c*m,c*u,o*l);break;case"YZY":i.set(c*u,o*d,c*m,o*l);break;case"ZXZ":i.set(c*m,c*u,o*d,o*l);break;case"XZX":i.set(o*d,c*x,c*g,o*l);break;case"YXY":i.set(c*g,o*d,c*x,o*l);break;case"ZYZ":i.set(c*x,c*g,o*d,o*l);break;default:Nt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Li(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Fe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var fn={DEG2RAD:os,RAD2DEG:Oi,generateUUID:Zi,clamp:Wt,euclideanModulo:Xo,mapLinear:Wh,inverseLerp:Xh,lerp:ls,damp:qh,pingpong:Yh,smoothstep:Zh,smootherstep:$h,randInt:Jh,randFloat:Kh,randFloatSpread:jh,seededRandom:Qh,degToRad:tu,radToDeg:eu,isPowerOfTwo:nu,ceilPowerOfTwo:iu,floorPowerOfTwo:su,setQuaternionFromProperEuler:ru,normalize:Fe,denormalize:Li},Jo=class Jo{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Wt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Jo.prototype.isVector2=!0;var Ot=Jo,$e=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],d=n[s+2],m=n[s+3],u=r[a+0],g=r[a+1],x=r[a+2],E=r[a+3];if(m!==E||c!==u||l!==g||d!==x){let f=c*u+l*g+d*x+m*E;f<0&&(u=-u,g=-g,x=-x,E=-E,f=-f);let h=1-o;if(f<.9995){let M=Math.acos(f),b=Math.sin(M);h=Math.sin(h*M)/b,o=Math.sin(o*M)/b,c=c*h+u*o,l=l*h+g*o,d=d*h+x*o,m=m*h+E*o}else{c=c*h+u*o,l=l*h+g*o,d=d*h+x*o,m=m*h+E*o;let M=1/Math.sqrt(c*c+l*l+d*d+m*m);c*=M,l*=M,d*=M,m*=M}}t[e]=c,t[e+1]=l,t[e+2]=d,t[e+3]=m}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],d=n[s+3],m=r[a],u=r[a+1],g=r[a+2],x=r[a+3];return t[e]=o*x+d*m+c*g-l*u,t[e+1]=c*x+d*u+l*m-o*g,t[e+2]=l*x+d*g+o*u-c*m,t[e+3]=d*x-o*m-c*u-l*g,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),d=o(s/2),m=o(r/2),u=c(n/2),g=c(s/2),x=c(r/2);switch(a){case"XYZ":this._x=u*d*m+l*g*x,this._y=l*g*m-u*d*x,this._z=l*d*x+u*g*m,this._w=l*d*m-u*g*x;break;case"YXZ":this._x=u*d*m+l*g*x,this._y=l*g*m-u*d*x,this._z=l*d*x-u*g*m,this._w=l*d*m+u*g*x;break;case"ZXY":this._x=u*d*m-l*g*x,this._y=l*g*m+u*d*x,this._z=l*d*x+u*g*m,this._w=l*d*m-u*g*x;break;case"ZYX":this._x=u*d*m-l*g*x,this._y=l*g*m+u*d*x,this._z=l*d*x-u*g*m,this._w=l*d*m+u*g*x;break;case"YZX":this._x=u*d*m+l*g*x,this._y=l*g*m+u*d*x,this._z=l*d*x-u*g*m,this._w=l*d*m-u*g*x;break;case"XZY":this._x=u*d*m-l*g*x,this._y=l*g*m-u*d*x,this._z=l*d*x+u*g*m,this._w=l*d*m+u*g*x;break;default:Nt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],d=e[6],m=e[10],u=n+o+m;if(u>0){let g=.5/Math.sqrt(u+1);this._w=.25/g,this._x=(d-c)*g,this._y=(r-l)*g,this._z=(a-s)*g}else if(n>o&&n>m){let g=2*Math.sqrt(1+n-o-m);this._w=(d-c)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+l)/g}else if(o>m){let g=2*Math.sqrt(1+o-n-m);this._w=(r-l)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(c+d)/g}else{let g=2*Math.sqrt(1+m-n-o);this._w=(a-s)/g,this._x=(r+l)/g,this._y=(c+d)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Wt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,d=e._w;return this._x=n*d+a*o+s*l-r*c,this._y=s*d+a*c+r*o-n*l,this._z=r*d+a*l+n*c-s*o,this._w=a*d-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){let l=Math.acos(o),d=Math.sin(l);c=Math.sin(c*l)/d,e=Math.sin(e*l)/d,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Ko=class Ko{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ol.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ol.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),d=2*(o*e-r*s),m=2*(r*n-a*e);return this.x=e+c*l+a*m-o*d,this.y=n+c*d+o*l-r*m,this.z=s+c*m+r*d-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ya.copy(this).projectOnVector(t),this.sub(Ya)}reflect(t){return this.sub(Ya.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Wt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ko.prototype.isVector3=!0;var B=Ko,Ya=new B,Ol=new $e,jo=class jo{constructor(t,e,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){let d=this.elements;return d[0]=t,d[1]=s,d[2]=o,d[3]=e,d[4]=r,d[5]=c,d[6]=n,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],d=n[4],m=n[7],u=n[2],g=n[5],x=n[8],E=s[0],f=s[3],h=s[6],M=s[1],b=s[4],y=s[7],T=s[2],w=s[5],C=s[8];return r[0]=a*E+o*M+c*T,r[3]=a*f+o*b+c*w,r[6]=a*h+o*y+c*C,r[1]=l*E+d*M+m*T,r[4]=l*f+d*b+m*w,r[7]=l*h+d*y+m*C,r[2]=u*E+g*M+x*T,r[5]=u*f+g*b+x*w,r[8]=u*h+g*y+x*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8];return e*a*d-e*o*l-n*r*d+n*o*c+s*r*l-s*a*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8],m=d*a-o*l,u=o*c-d*r,g=l*r-a*c,x=e*m+n*u+s*g;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let E=1/x;return t[0]=m*E,t[1]=(s*l-d*n)*E,t[2]=(o*n-s*a)*E,t[3]=u*E,t[4]=(d*e-s*c)*E,t[5]=(s*r-o*e)*E,t[6]=g*E,t[7]=(n*c-l*e)*E,t[8]=(a*e-n*r)*E,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return di("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Za.makeScale(t,e)),this}rotate(t){return di("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Za.makeRotation(-t)),this}translate(t,e){return di("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Za.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};jo.prototype.isMatrix3=!0;var zt=jo,Za=new zt,Bl=new zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zl=new zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function au(){let i={enabled:!0,workingColorSpace:hs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ee&&(s.r=An(s.r),s.g=An(s.g),s.b=An(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ee&&(s.r=Di(s.r),s.g=Di(s.g),s.b=Di(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Pn?us:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return di("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return di("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[hs]:{primaries:t,whitePoint:n,transfer:us,toXYZ:Bl,fromXYZ:zl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ke},outputColorSpaceConfig:{drawingBufferColorSpace:ke}},[ke]:{primaries:t,whitePoint:n,transfer:ee,toXYZ:Bl,fromXYZ:zl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ke}}}),i}var Yt=au();function An(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Di(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var yi,_r=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{yi===void 0&&(yi=ds("canvas")),yi.width=t.width,yi.height=t.height;let s=yi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=yi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=ds("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=An(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(An(e[n]/255)*255):e[n]=An(e[n]);return{data:e,width:t.width,height:t.height}}else return Nt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},ou=0,Bi=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=Zi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push($a(s[a].image)):r.push($a(s[a]))}else r=$a(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function $a(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?_r.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Nt("Texture: Unable to serialize Texture."),{})}var lu=0,Ja=new B,Ve=class i extends ln{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=_n,s=_n,r=Ae,a=ii,o=en,c=He,l=i.DEFAULT_ANISOTROPY,d=Pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lu++}),this.uuid=Zi(),this.name="",this.source=new Bi(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ot(0,0),this.repeat=new Ot(1,1),this.center=new Ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ja).x}get height(){return this.source.getSize(Ja).y}get depth(){return this.source.getSize(Ja).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Nt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Nt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Uo)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case pr:t.x=t.x-Math.floor(t.x);break;case _n:t.x=t.x<0?0:1;break;case mr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case pr:t.y=t.y-Math.floor(t.y);break;case _n:t.y=t.y<0?0:1;break;case mr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ve.DEFAULT_IMAGE=null;Ve.DEFAULT_MAPPING=Uo;Ve.DEFAULT_ANISOTROPY=1;var Qo=class Qo{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],d=c[4],m=c[8],u=c[1],g=c[5],x=c[9],E=c[2],f=c[6],h=c[10];if(Math.abs(d-u)<.01&&Math.abs(m-E)<.01&&Math.abs(x-f)<.01){if(Math.abs(d+u)<.1&&Math.abs(m+E)<.1&&Math.abs(x+f)<.1&&Math.abs(l+g+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let b=(l+1)/2,y=(g+1)/2,T=(h+1)/2,w=(d+u)/4,C=(m+E)/4,_=(x+f)/4;return b>y&&b>T?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=w/n,r=C/n):y>T?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=w/s,r=_/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=C/r,s=_/r),this.set(n,s,r,e),this}let M=Math.sqrt((f-x)*(f-x)+(m-E)*(m-E)+(u-d)*(u-d));return Math.abs(M)<.001&&(M=1),this.x=(f-x)/M,this.y=(m-E)/M,this.z=(u-d)/M,this.w=Math.acos((l+g+h-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this.w=Wt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this.w=Wt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Qo.prototype.isVector4=!0;var he=Qo,xr=class extends ln{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ae,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new Ve(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ae,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Bi(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ge=class extends xr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},fs=class extends Ve{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Te,this.minFilter=Te,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var yr=class extends Ve{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Te,this.minFilter=Te,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Br=class Br{constructor(t,e,n,s,r,a,o,c,l,d,m,u,g,x,E,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,d,m,u,g,x,E,f)}set(t,e,n,s,r,a,o,c,l,d,m,u,g,x,E,f){let h=this.elements;return h[0]=t,h[4]=e,h[8]=n,h[12]=s,h[1]=r,h[5]=a,h[9]=o,h[13]=c,h[2]=l,h[6]=d,h[10]=m,h[14]=u,h[3]=g,h[7]=x,h[11]=E,h[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Br().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/vi.setFromMatrixColumn(t,0).length(),r=1/vi.setFromMatrixColumn(t,1).length(),a=1/vi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),m=Math.sin(r);if(t.order==="XYZ"){let u=a*d,g=a*m,x=o*d,E=o*m;e[0]=c*d,e[4]=-c*m,e[8]=l,e[1]=g+x*l,e[5]=u-E*l,e[9]=-o*c,e[2]=E-u*l,e[6]=x+g*l,e[10]=a*c}else if(t.order==="YXZ"){let u=c*d,g=c*m,x=l*d,E=l*m;e[0]=u+E*o,e[4]=x*o-g,e[8]=a*l,e[1]=a*m,e[5]=a*d,e[9]=-o,e[2]=g*o-x,e[6]=E+u*o,e[10]=a*c}else if(t.order==="ZXY"){let u=c*d,g=c*m,x=l*d,E=l*m;e[0]=u-E*o,e[4]=-a*m,e[8]=x+g*o,e[1]=g+x*o,e[5]=a*d,e[9]=E-u*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let u=a*d,g=a*m,x=o*d,E=o*m;e[0]=c*d,e[4]=x*l-g,e[8]=u*l+E,e[1]=c*m,e[5]=E*l+u,e[9]=g*l-x,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let u=a*c,g=a*l,x=o*c,E=o*l;e[0]=c*d,e[4]=E-u*m,e[8]=x*m+g,e[1]=m,e[5]=a*d,e[9]=-o*d,e[2]=-l*d,e[6]=g*m+x,e[10]=u-E*m}else if(t.order==="XZY"){let u=a*c,g=a*l,x=o*c,E=o*l;e[0]=c*d,e[4]=-m,e[8]=l*d,e[1]=u*m+E,e[5]=a*d,e[9]=g*m-x,e[2]=x*m-g,e[6]=o*d,e[10]=E*m+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(cu,t,hu)}lookAt(t,e,n){let s=this.elements;return Xe.subVectors(t,e),Xe.lengthSq()===0&&(Xe.z=1),Xe.normalize(),On.crossVectors(n,Xe),On.lengthSq()===0&&(Math.abs(n.z)===1?Xe.x+=1e-4:Xe.z+=1e-4,Xe.normalize(),On.crossVectors(n,Xe)),On.normalize(),ks.crossVectors(Xe,On),s[0]=On.x,s[4]=ks.x,s[8]=Xe.x,s[1]=On.y,s[5]=ks.y,s[9]=Xe.y,s[2]=On.z,s[6]=ks.z,s[10]=Xe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],d=n[1],m=n[5],u=n[9],g=n[13],x=n[2],E=n[6],f=n[10],h=n[14],M=n[3],b=n[7],y=n[11],T=n[15],w=s[0],C=s[4],_=s[8],A=s[12],R=s[1],P=s[5],L=s[9],D=s[13],I=s[2],k=s[6],Y=s[10],$=s[14],et=s[3],q=s[7],tt=s[11],nt=s[15];return r[0]=a*w+o*R+c*I+l*et,r[4]=a*C+o*P+c*k+l*q,r[8]=a*_+o*L+c*Y+l*tt,r[12]=a*A+o*D+c*$+l*nt,r[1]=d*w+m*R+u*I+g*et,r[5]=d*C+m*P+u*k+g*q,r[9]=d*_+m*L+u*Y+g*tt,r[13]=d*A+m*D+u*$+g*nt,r[2]=x*w+E*R+f*I+h*et,r[6]=x*C+E*P+f*k+h*q,r[10]=x*_+E*L+f*Y+h*tt,r[14]=x*A+E*D+f*$+h*nt,r[3]=M*w+b*R+y*I+T*et,r[7]=M*C+b*P+y*k+T*q,r[11]=M*_+b*L+y*Y+T*tt,r[15]=M*A+b*D+y*$+T*nt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],d=t[2],m=t[6],u=t[10],g=t[14],x=t[3],E=t[7],f=t[11],h=t[15],M=c*g-l*u,b=o*g-l*m,y=o*u-c*m,T=a*g-l*d,w=a*u-c*d,C=a*m-o*d;return e*(E*M-f*b+h*y)-n*(x*M-f*T+h*w)+s*(x*b-E*T+h*C)-r*(x*y-E*w+f*C)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],d=t[10];return e*(a*d-o*l)-n*(r*d-o*c)+s*(r*l-a*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8],m=t[9],u=t[10],g=t[11],x=t[12],E=t[13],f=t[14],h=t[15],M=e*o-n*a,b=e*c-s*a,y=e*l-r*a,T=n*c-s*o,w=n*l-r*o,C=s*l-r*c,_=d*E-m*x,A=d*f-u*x,R=d*h-g*x,P=m*f-u*E,L=m*h-g*E,D=u*h-g*f,I=M*D-b*L+y*P+T*R-w*A+C*_;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/I;return t[0]=(o*D-c*L+l*P)*k,t[1]=(s*L-n*D-r*P)*k,t[2]=(E*C-f*w+h*T)*k,t[3]=(u*w-m*C-g*T)*k,t[4]=(c*R-a*D-l*A)*k,t[5]=(e*D-s*R+r*A)*k,t[6]=(f*y-x*C-h*b)*k,t[7]=(d*C-u*y+g*b)*k,t[8]=(a*L-o*R+l*_)*k,t[9]=(n*R-e*L-r*_)*k,t[10]=(x*w-E*y+h*M)*k,t[11]=(m*y-d*w-g*M)*k,t[12]=(o*A-a*P-c*_)*k,t[13]=(e*P-n*A+s*_)*k,t[14]=(E*b-x*T-f*M)*k,t[15]=(d*T-m*b+u*M)*k,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,d=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,d*o+n,d*c-s*a,0,l*c-s*o,d*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,d=a+a,m=o+o,u=r*l,g=r*d,x=r*m,E=a*d,f=a*m,h=o*m,M=c*l,b=c*d,y=c*m,T=n.x,w=n.y,C=n.z;return s[0]=(1-(E+h))*T,s[1]=(g+y)*T,s[2]=(x-b)*T,s[3]=0,s[4]=(g-y)*w,s[5]=(1-(u+h))*w,s[6]=(f+M)*w,s[7]=0,s[8]=(x+b)*C,s[9]=(f-M)*C,s[10]=(1-(u+E))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=vi.set(s[0],s[1],s[2]).length(),o=vi.set(s[4],s[5],s[6]).length(),c=vi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),sn.copy(this);let l=1/a,d=1/o,m=1/c;return sn.elements[0]*=l,sn.elements[1]*=l,sn.elements[2]*=l,sn.elements[4]*=d,sn.elements[5]*=d,sn.elements[6]*=d,sn.elements[8]*=m,sn.elements[9]*=m,sn.elements[10]*=m,e.setFromRotationMatrix(sn),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,s,r,a,o=on,c=!1){let l=this.elements,d=2*r/(e-t),m=2*r/(n-s),u=(e+t)/(e-t),g=(n+s)/(n-s),x,E;if(c)x=r/(a-r),E=a*r/(a-r);else if(o===on)x=-(a+r)/(a-r),E=-2*a*r/(a-r);else if(o===Ui)x=-a/(a-r),E=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=m,l[9]=g,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=E,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=on,c=!1){let l=this.elements,d=2/(e-t),m=2/(n-s),u=-(e+t)/(e-t),g=-(n+s)/(n-s),x,E;if(c)x=1/(a-r),E=a/(a-r);else if(o===on)x=-2/(a-r),E=-(a+r)/(a-r);else if(o===Ui)x=-1/(a-r),E=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=m,l[9]=0,l[13]=g,l[2]=0,l[6]=0,l[10]=x,l[14]=E,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Br.prototype.isMatrix4=!0;var ue=Br,vi=new B,sn=new ue,cu=new B(0,0,0),hu=new B(1,1,1),On=new B,ks=new B,Xe=new B,kl=new ue,Vl=new $e,Cn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],d=s[9],m=s[2],u=s[6],g=s[10];switch(e){case"XYZ":this._y=Math.asin(Wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Wt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-m,r),this._z=0);break;case"ZXY":this._x=Math.asin(Wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-m,g),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Wt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(u,g),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Wt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-m,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-Wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,g),this._y=0);break;default:Nt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return kl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(kl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Vl.setFromEuler(this),this.setFromQuaternion(Vl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Cn.DEFAULT_ORDER="XYZ";var ps=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},uu=0,Gl=new B,Mi=new $e,Sn=new ue,Vs=new B,is=new B,du=new B,fu=new $e,Hl=new B(1,0,0),Wl=new B(0,1,0),Xl=new B(0,0,1),ql={type:"added"},pu={type:"removed"},Si={type:"childadded",child:null},Ka={type:"childremoved",child:null},Be=class i extends ln{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new B,e=new Cn,n=new $e,s=new B(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ue},normalMatrix:{value:new zt}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ps,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.premultiply(Mi),this}rotateX(t){return this.rotateOnAxis(Hl,t)}rotateY(t){return this.rotateOnAxis(Wl,t)}rotateZ(t){return this.rotateOnAxis(Xl,t)}translateOnAxis(t,e){return Gl.copy(t).applyQuaternion(this.quaternion),this.position.add(Gl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Hl,t)}translateY(t){return this.translateOnAxis(Wl,t)}translateZ(t){return this.translateOnAxis(Xl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Sn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Vs.copy(t):Vs.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sn.lookAt(is,Vs,this.up):Sn.lookAt(Vs,is,this.up),this.quaternion.setFromRotationMatrix(Sn),s&&(Sn.extractRotation(s.matrixWorld),Mi.setFromRotationMatrix(Sn),this.quaternion.premultiply(Mi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Ft("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ql),Si.child=t,this.dispatchEvent(Si),Si.child=null):Ft("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(pu),Ka.child=t,this.dispatchEvent(Ka),Ka.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Sn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Sn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Sn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ql),Si.child=t,this.dispatchEvent(Si),Si.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,t,du),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,fu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){let m=c[l];r(t.shapes,m)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),d=a(t.images),m=a(t.shapes),u=a(t.skeletons),g=a(t.animations),x=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),m.length>0&&(n.shapes=m),u.length>0&&(n.skeletons=u),g.length>0&&(n.animations=g),x.length>0&&(n.nodes=x)}return n.object=s,n;function a(o){let c=[];for(let l in o){let d=o[l];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Be.DEFAULT_UP=new B(0,1,0);Be.DEFAULT_MATRIX_AUTO_UPDATE=!0;Be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ze=class extends Be{constructor(){super(),this.isGroup=!0,this.type="Group"}},mu={type:"move"},zi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ze,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ze,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ze,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let E of t.hand.values()){let f=e.getJointPose(E,n),h=this._getHandJoint(l,E);f!==null&&(h.matrix.fromArray(f.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=f.radius),h.visible=f!==null}let d=l.joints["index-finger-tip"],m=l.joints["thumb-tip"],u=d.position.distanceTo(m.position),g=.02,x=.005;l.inputState.pinching&&u>g+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=g-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(mu)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ze;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Vc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bn={h:0,s:0,l:0},Gs={h:0,s:0,l:0};function ja(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var qt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Yt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Yt.workingColorSpace){if(t=Xo(t,1),e=Wt(e,0,1),n=Wt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ja(a,r,t+1/3),this.g=ja(a,r,t),this.b=ja(a,r,t-1/3)}return Yt.colorSpaceToWorking(this,s),this}setStyle(t,e=ke){function n(r){r!==void 0&&parseFloat(r)<1&&Nt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Nt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Nt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ke){let n=Vc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Nt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=An(t.r),this.g=An(t.g),this.b=An(t.b),this}copyLinearToSRGB(t){return this.r=Di(t.r),this.g=Di(t.g),this.b=Di(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ke){return Yt.workingToColorSpace(Ie.copy(this),t),Math.round(Wt(Ie.r*255,0,255))*65536+Math.round(Wt(Ie.g*255,0,255))*256+Math.round(Wt(Ie.b*255,0,255))}getHexString(t=ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.workingToColorSpace(Ie.copy(this),e);let n=Ie.r,s=Ie.g,r=Ie.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,d=(o+a)/2;if(o===a)c=0,l=0;else{let m=a-o;switch(l=d<=.5?m/(a+o):m/(2-a-o),a){case n:c=(s-r)/m+(s<r?6:0);break;case s:c=(r-n)/m+2;break;case r:c=(n-s)/m+4;break}c/=6}return t.h=c,t.s=l,t.l=d,t}getRGB(t,e=Yt.workingColorSpace){return Yt.workingToColorSpace(Ie.copy(this),e),t.r=Ie.r,t.g=Ie.g,t.b=Ie.b,t}getStyle(t=ke){Yt.workingToColorSpace(Ie.copy(this),t);let e=Ie.r,n=Ie.g,s=Ie.b;return t!==ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Bn),this.setHSL(Bn.h+t,Bn.s+e,Bn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Bn),t.getHSL(Gs);let n=ls(Bn.h,Gs.h,e),s=ls(Bn.s,Gs.s,e),r=ls(Bn.l,Gs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ie=new qt;qt.NAMES=Vc;var ms=class extends Be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Cn,this.environmentIntensity=1,this.environmentRotation=new Cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},rn=new B,bn=new B,Qa=new B,Tn=new B,bi=new B,Ti=new B,Yl=new B,to=new B,eo=new B,no=new B,io=new he,so=new he,ro=new he,Gn=class i{constructor(t=new B,e=new B,n=new B){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),rn.subVectors(t,e),s.cross(rn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){rn.subVectors(s,e),bn.subVectors(n,e),Qa.subVectors(t,e);let a=rn.dot(rn),o=rn.dot(bn),c=rn.dot(Qa),l=bn.dot(bn),d=bn.dot(Qa),m=a*l-o*o;if(m===0)return r.set(0,0,0),null;let u=1/m,g=(l*c-o*d)*u,x=(a*d-o*c)*u;return r.set(1-g-x,x,g)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Tn)===null?!1:Tn.x>=0&&Tn.y>=0&&Tn.x+Tn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,Tn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Tn.x),c.addScaledVector(a,Tn.y),c.addScaledVector(o,Tn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return io.setScalar(0),so.setScalar(0),ro.setScalar(0),io.fromBufferAttribute(t,e),so.fromBufferAttribute(t,n),ro.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(io,r.x),a.addScaledVector(so,r.y),a.addScaledVector(ro,r.z),a}static isFrontFacing(t,e,n,s){return rn.subVectors(n,e),bn.subVectors(t,e),rn.cross(bn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return rn.subVectors(this.c,this.b),bn.subVectors(this.a,this.b),rn.cross(bn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;bi.subVectors(s,n),Ti.subVectors(r,n),to.subVectors(t,n);let c=bi.dot(to),l=Ti.dot(to);if(c<=0&&l<=0)return e.copy(n);eo.subVectors(t,s);let d=bi.dot(eo),m=Ti.dot(eo);if(d>=0&&m<=d)return e.copy(s);let u=c*m-d*l;if(u<=0&&c>=0&&d<=0)return a=c/(c-d),e.copy(n).addScaledVector(bi,a);no.subVectors(t,r);let g=bi.dot(no),x=Ti.dot(no);if(x>=0&&g<=x)return e.copy(r);let E=g*l-c*x;if(E<=0&&l>=0&&x<=0)return o=l/(l-x),e.copy(n).addScaledVector(Ti,o);let f=d*x-g*m;if(f<=0&&m-d>=0&&g-x>=0)return Yl.subVectors(r,s),o=(m-d)/(m-d+(g-x)),e.copy(s).addScaledVector(Yl,o);let h=1/(f+E+u);return a=E*h,o=u*h,e.copy(n).addScaledVector(bi,a).addScaledVector(Ti,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Hn=class{constructor(t=new B(1/0,1/0,1/0),e=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(an.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(an.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=an.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,an):an.fromBufferAttribute(r,a),an.applyMatrix4(t.matrixWorld),this.expandByPoint(an);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Hs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Hs.copy(n.boundingBox)),Hs.applyMatrix4(t.matrixWorld),this.union(Hs)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,an),an.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ss),Ws.subVectors(this.max,ss),wi.subVectors(t.a,ss),Ei.subVectors(t.b,ss),Ai.subVectors(t.c,ss),zn.subVectors(Ei,wi),kn.subVectors(Ai,Ei),li.subVectors(wi,Ai);let e=[0,-zn.z,zn.y,0,-kn.z,kn.y,0,-li.z,li.y,zn.z,0,-zn.x,kn.z,0,-kn.x,li.z,0,-li.x,-zn.y,zn.x,0,-kn.y,kn.x,0,-li.y,li.x,0];return!ao(e,wi,Ei,Ai,Ws)||(e=[1,0,0,0,1,0,0,0,1],!ao(e,wi,Ei,Ai,Ws))?!1:(Xs.crossVectors(zn,kn),e=[Xs.x,Xs.y,Xs.z],ao(e,wi,Ei,Ai,Ws))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,an).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(an).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(wn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},wn=[new B,new B,new B,new B,new B,new B,new B,new B],an=new B,Hs=new Hn,wi=new B,Ei=new B,Ai=new B,zn=new B,kn=new B,li=new B,ss=new B,Ws=new B,Xs=new B,ci=new B;function ao(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ci.fromArray(i,r);let o=s.x*Math.abs(ci.x)+s.y*Math.abs(ci.y)+s.z*Math.abs(ci.z),c=t.dot(ci),l=e.dot(ci),d=n.dot(ci);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}var _e=new B,qs=new Ot,gu=0,ye=class extends ln{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Fc,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)qs.fromBufferAttribute(this,e),qs.applyMatrix3(t),this.setXY(e,qs.x,qs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Li(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Fe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Li(e,this.array)),e}setX(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Li(e,this.array)),e}setY(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Li(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Li(e,this.array)),e}setW(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array),s=Fe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array),s=Fe(s,this.array),r=Fe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var gs=class extends ye{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var _s=class extends ye{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Oe=class extends ye{constructor(t,e,n){super(new Float32Array(t),e,n)}},_u=new Hn,rs=new B,oo=new B,Rn=class{constructor(t=new B,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):_u.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;rs.subVectors(t,this.center);let e=rs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(rs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(oo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(rs.copy(t.center).add(oo)),this.expandByPoint(rs.copy(t.center).sub(oo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},xu=0,tn=new ue,lo=new Be,Ci=new B,qe=new Hn,as=new Hn,be=new B,Ce=class i extends ln{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Gh(t)?_s:gs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return tn.makeRotationFromQuaternion(t),this.applyMatrix4(tn),this}rotateX(t){return tn.makeRotationX(t),this.applyMatrix4(tn),this}rotateY(t){return tn.makeRotationY(t),this.applyMatrix4(tn),this}rotateZ(t){return tn.makeRotationZ(t),this.applyMatrix4(tn),this}translate(t,e,n){return tn.makeTranslation(t,e,n),this.applyMatrix4(tn),this}scale(t,e,n){return tn.makeScale(t,e,n),this.applyMatrix4(tn),this}lookAt(t){return lo.lookAt(t),lo.updateMatrix(),this.applyMatrix4(lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ci).negate(),this.translate(Ci.x,Ci.y,Ci.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Oe(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Nt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ft("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];qe.setFromBufferAttribute(r),this.morphTargetsRelative?(be.addVectors(this.boundingBox.min,qe.min),this.boundingBox.expandByPoint(be),be.addVectors(this.boundingBox.max,qe.max),this.boundingBox.expandByPoint(be)):(this.boundingBox.expandByPoint(qe.min),this.boundingBox.expandByPoint(qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ft('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ft("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(t){let n=this.boundingSphere.center;if(qe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];as.setFromBufferAttribute(o),this.morphTargetsRelative?(be.addVectors(qe.min,as.min),qe.expandByPoint(be),be.addVectors(qe.max,as.max),qe.expandByPoint(be)):(qe.expandByPoint(as.min),qe.expandByPoint(as.max))}qe.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)be.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(be));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)be.fromBufferAttribute(o,l),c&&(Ci.fromBufferAttribute(t,l),be.add(Ci)),s=Math.max(s,n.distanceToSquared(be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ft('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Ft("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new ye(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let _=0;_<n.count;_++)o[_]=new B,c[_]=new B;let l=new B,d=new B,m=new B,u=new Ot,g=new Ot,x=new Ot,E=new B,f=new B;function h(_,A,R){l.fromBufferAttribute(n,_),d.fromBufferAttribute(n,A),m.fromBufferAttribute(n,R),u.fromBufferAttribute(r,_),g.fromBufferAttribute(r,A),x.fromBufferAttribute(r,R),d.sub(l),m.sub(l),g.sub(u),x.sub(u);let P=1/(g.x*x.y-x.x*g.y);isFinite(P)&&(E.copy(d).multiplyScalar(x.y).addScaledVector(m,-g.y).multiplyScalar(P),f.copy(m).multiplyScalar(g.x).addScaledVector(d,-x.x).multiplyScalar(P),o[_].add(E),o[A].add(E),o[R].add(E),c[_].add(f),c[A].add(f),c[R].add(f))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let _=0,A=M.length;_<A;++_){let R=M[_],P=R.start,L=R.count;for(let D=P,I=P+L;D<I;D+=3)h(t.getX(D+0),t.getX(D+1),t.getX(D+2))}let b=new B,y=new B,T=new B,w=new B;function C(_){T.fromBufferAttribute(s,_),w.copy(T);let A=o[_];b.copy(A),b.sub(T.multiplyScalar(T.dot(A))).normalize(),y.crossVectors(w,A);let P=y.dot(c[_])<0?-1:1;a.setXYZW(_,b.x,b.y,b.z,P)}for(let _=0,A=M.length;_<A;++_){let R=M[_],P=R.start,L=R.count;for(let D=P,I=P+L;D<I;D+=3)C(t.getX(D+0)),C(t.getX(D+1)),C(t.getX(D+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new ye(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,g=n.count;u<g;u++)n.setXYZ(u,0,0,0);let s=new B,r=new B,a=new B,o=new B,c=new B,l=new B,d=new B,m=new B;if(t)for(let u=0,g=t.count;u<g;u+=3){let x=t.getX(u+0),E=t.getX(u+1),f=t.getX(u+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,E),a.fromBufferAttribute(e,f),d.subVectors(a,r),m.subVectors(s,r),d.cross(m),o.fromBufferAttribute(n,x),c.fromBufferAttribute(n,E),l.fromBufferAttribute(n,f),o.add(d),c.add(d),l.add(d),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(E,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let u=0,g=e.count;u<g;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),d.subVectors(a,r),m.subVectors(s,r),d.cross(m),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)be.fromBufferAttribute(t,e),be.normalize(),t.setXYZ(e,be.x,be.y,be.z)}toNonIndexed(){function t(o,c){let l=o.array,d=o.itemSize,m=o.normalized,u=new l.constructor(c.length*d),g=0,x=0;for(let E=0,f=c.length;E<f;E++){o.isInterleavedBufferAttribute?g=c[E]*o.data.stride+o.offset:g=c[E]*d;for(let h=0;h<d;h++)u[x++]=l[g++]}return new ye(u,d,m)}if(this.index===null)return Nt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=t(c,n);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let d=0,m=l.length;d<m;d++){let u=l[d],g=t(u,n);c.push(g)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],d=[];for(let m=0,u=l.length;m<u;m++){let g=l[m];d.push(g.toJSON(t.data))}d.length>0&&(s[c]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let d=s[l];this.setAttribute(l,d.clone(e))}let r=t.morphAttributes;for(let l in r){let d=[],m=r[l];for(let u=0,g=m.length;u<g;u++)d.push(m[u].clone(e));this.morphAttributes[l]=d}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,d=a.length;l<d;l++){let m=a[l];this.addGroup(m.start,m.count,m.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var co=new B,yu=new B,vu=new zt,Ye=class{constructor(t=new B(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=co.subVectors(n,e).cross(yu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(co),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||vu.getNormalMatrix(t),s=this.coplanarPoint(co).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Mu=0,Wn=class extends ln{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mu++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=Xi,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Eo,this.blendDst=Ao,this.blendEquation=fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=Ni,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Rc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ar,this.stencilZFail=ar,this.stencilZPass=ar,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Nt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Nt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new qt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Ye().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ot().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ot().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var En=new B,ho=new B,Ys=new B,Zs=new B,ki=class{constructor(t=new B,e=new B(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,En)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=En.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(En.copy(this.origin).addScaledVector(this.direction,e),En.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ho.copy(t).add(e).multiplyScalar(.5),Ys.copy(e).sub(t).normalize(),Zs.copy(this.origin).sub(ho);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Ys),o=Zs.dot(this.direction),c=-Zs.dot(Ys),l=Zs.lengthSq(),d=Math.abs(1-a*a),m,u,g,x;if(d>0)if(m=a*c-o,u=a*o-c,x=r*d,m>=0)if(u>=-x)if(u<=x){let E=1/d;m*=E,u*=E,g=m*(m+a*u+2*o)+u*(a*m+u+2*c)+l}else u=r,m=Math.max(0,-(a*u+o)),g=-m*m+u*(u+2*c)+l;else u=-r,m=Math.max(0,-(a*u+o)),g=-m*m+u*(u+2*c)+l;else u<=-x?(m=Math.max(0,-(-a*r+o)),u=m>0?-r:Math.min(Math.max(-r,-c),r),g=-m*m+u*(u+2*c)+l):u<=x?(m=0,u=Math.min(Math.max(-r,-c),r),g=u*(u+2*c)+l):(m=Math.max(0,-(a*r+o)),u=m>0?r:Math.min(Math.max(-r,-c),r),g=-m*m+u*(u+2*c)+l);else u=a>0?-r:r,m=Math.max(0,-(a*u+o)),g=-m*m+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,m),s&&s.copy(ho).addScaledVector(Ys,u),g}intersectSphere(t,e){if(t.radius<0)return null;En.subVectors(t.center,this.origin);let n=En.dot(this.direction),s=En.dot(En)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c,l=1/this.direction.x,d=1/this.direction.y,m=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),d>=0?(r=(t.min.y-u.y)*d,a=(t.max.y-u.y)*d):(r=(t.max.y-u.y)*d,a=(t.min.y-u.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),m>=0?(o=(t.min.z-u.z)*m,c=(t.max.z-u.z)*m):(o=(t.max.z-u.z)*m,c=(t.min.z-u.z)*m),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,En)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,d=o.z,m=t.x-a.x,u=t.y-a.y,g=t.z-a.z,x=e.x-a.x,E=e.y-a.y,f=e.z-a.z,h=n.x-a.x,M=n.y-a.y,b=n.z-a.z,y=Math.abs(c),T=Math.abs(l),w=Math.abs(d),C,_,A,R,P,L,D,I,k,Y,$,et;if(y>=T&&y>=w?(A=c,L=m,k=x,et=h,c>=0?(C=l,_=d,R=u,P=g,D=E,I=f,Y=M,$=b):(C=d,_=l,R=g,P=u,D=f,I=E,Y=b,$=M)):T>=w?(A=l,L=u,k=E,et=M,l>=0?(C=d,_=c,R=g,P=m,D=f,I=x,Y=b,$=h):(C=c,_=d,R=m,P=g,D=x,I=f,Y=h,$=b)):(A=d,L=g,k=f,et=b,d>=0?(C=c,_=l,R=m,P=u,D=x,I=E,Y=h,$=M):(C=l,_=c,R=u,P=m,D=E,I=x,Y=M,$=h)),A===0)return null;let q=C/A,tt=_/A,nt=1/A,ot=R-q*L,rt=P-tt*L,It=D-q*k,bt=I-tt*k,Lt=Y-q*et,X=$-tt*et,K=Lt*bt-X*It,dt=ot*X-rt*Lt,Tt=It*rt-bt*ot;if(s){if(K<0||dt<0||Tt<0)return null}else if((K<0||dt<0||Tt<0)&&(K>0||dt>0||Tt>0))return null;let ft=K+dt+Tt;if(ft===0)return null;let Dt=nt*(K*L+dt*k+Tt*et);return(ft>0?Dt<0:Dt>0)?null:this.at(Dt/ft,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Je=class extends Wn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=zr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Zl=new ue,hi=new ki,$s=new Rn,$l=new B,Js=new B,Ks=new B,js=new B,uo=new B,Qs=new B,Jl=new B,tr=new B,Zt=class extends Be{constructor(t=new Ce,e=new Je){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Qs.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let d=o[c],m=r[c];d!==0&&(uo.fromBufferAttribute(m,t),a?Qs.addScaledVector(uo,d):Qs.addScaledVector(uo.sub(e),d))}e.add(Qs)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$s.copy(n.boundingSphere),$s.applyMatrix4(r),hi.copy(t.ray).recast(t.near),!($s.containsPoint(hi.origin)===!1&&(hi.intersectSphere($s,$l)===null||hi.origin.distanceToSquared($l)>(t.far-t.near)**2))&&(Zl.copy(r).invert(),hi.copy(t.ray).applyMatrix4(Zl),!(n.boundingBox!==null&&hi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,hi)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,m=r.attributes.normal,u=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,E=u.length;x<E;x++){let f=u[x],h=a[f.materialIndex],M=Math.max(f.start,g.start),b=Math.min(o.count,Math.min(f.start+f.count,g.start+g.count));for(let y=M,T=b;y<T;y+=3){let w=o.getX(y),C=o.getX(y+1),_=o.getX(y+2);s=er(this,h,t,n,l,d,m,w,C,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{let x=Math.max(0,g.start),E=Math.min(o.count,g.start+g.count);for(let f=x,h=E;f<h;f+=3){let M=o.getX(f),b=o.getX(f+1),y=o.getX(f+2);s=er(this,a,t,n,l,d,m,M,b,y),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,E=u.length;x<E;x++){let f=u[x],h=a[f.materialIndex],M=Math.max(f.start,g.start),b=Math.min(c.count,Math.min(f.start+f.count,g.start+g.count));for(let y=M,T=b;y<T;y+=3){let w=y,C=y+1,_=y+2;s=er(this,h,t,n,l,d,m,w,C,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{let x=Math.max(0,g.start),E=Math.min(c.count,g.start+g.count);for(let f=x,h=E;f<h;f+=3){let M=f,b=f+1,y=f+2;s=er(this,a,t,n,l,d,m,M,b,y),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}}};function Su(i,t,e,n,s,r,a,o){let c;if(t.side===ze?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===ei,o),c===null)return null;tr.copy(o),tr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(tr);return l<e.near||l>e.far?null:{distance:l,point:tr.clone(),object:i}}function er(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,Js),i.getVertexPosition(c,Ks),i.getVertexPosition(l,js);let d=Su(i,t,e,n,Js,Ks,js,Jl);if(d){let m=new B;Gn.getBarycoord(Jl,Js,Ks,js,m),s&&(d.uv=Gn.getInterpolatedAttribute(s,o,c,l,m,new Ot)),r&&(d.uv1=Gn.getInterpolatedAttribute(r,o,c,l,m,new Ot)),a&&(d.normal=Gn.getInterpolatedAttribute(a,o,c,l,m,new B),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new B,materialIndex:0};Gn.getNormal(Js,Ks,js,u.normal),d.face=u,d.barycoord=m}return d}var vr=class extends Ve{constructor(t=null,e=1,n=1,s,r,a,o,c,l=Te,d=Te,m,u){super(null,a,o,c,l,d,s,r,m,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ui=new Rn,bu=new Ot(.5,.5),nr=new B,Vi=class{constructor(t=new Ye,e=new Ye,n=new Ye,s=new Ye,r=new Ye,a=new Ye){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=on,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],d=r[4],m=r[5],u=r[6],g=r[7],x=r[8],E=r[9],f=r[10],h=r[11],M=r[12],b=r[13],y=r[14],T=r[15];if(s[0].setComponents(l-a,g-d,h-x,T-M).normalize(),s[1].setComponents(l+a,g+d,h+x,T+M).normalize(),s[2].setComponents(l+o,g+m,h+E,T+b).normalize(),s[3].setComponents(l-o,g-m,h-E,T-b).normalize(),n)s[4].setComponents(c,u,f,y).normalize(),s[5].setComponents(l-c,g-u,h-f,T-y).normalize();else if(s[4].setComponents(l-c,g-u,h-f,T-y).normalize(),e===on)s[5].setComponents(l+c,g+u,h+f,T+y).normalize();else if(e===Ui)s[5].setComponents(c,u,f,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ui.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ui.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ui)}intersectsSprite(t){ui.center.set(0,0,0);let e=bu.distanceTo(t.center);return ui.radius=.7071067811865476+e,ui.applyMatrix4(t.matrixWorld),this.intersectsSphere(ui)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(nr.x=s.normal.x>0?t.max.x:t.min.x,nr.y=s.normal.y>0?t.max.y:t.min.y,nr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(nr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var xs=class extends Ve{constructor(t=[],e=ni,n,s,r,a,o,c,l,d){super(t,e,n,s,r,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Xn=class extends Ve{constructor(t,e,n=hn,s,r,a,o=Te,c=Te,l,d=xn,m=1){if(d!==xn&&d!==si)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:m};super(u,s,r,a,o,c,d,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Bi(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Mr=class extends Xn{constructor(t,e=hn,n=ni,s,r,a=Te,o=Te,c,l=xn){let d={width:t,height:t,depth:1},m=[d,d,d,d,d,d];super(t,t,e,n,s,r,a,o,c,l),this.image=m,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},ys=class extends Ve{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},De=class i extends Ce{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],d=[],m=[],u=0,g=0;x("z","y","x",-1,-1,n,e,t,a,r,0),x("z","y","x",1,-1,n,e,-t,a,r,1),x("x","z","y",1,1,t,n,e,s,a,2),x("x","z","y",1,-1,t,n,-e,s,a,3),x("x","y","z",1,-1,t,e,n,s,r,4),x("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Oe(l,3)),this.setAttribute("normal",new Oe(d,3)),this.setAttribute("uv",new Oe(m,2));function x(E,f,h,M,b,y,T,w,C,_,A){let R=y/C,P=T/_,L=y/2,D=T/2,I=w/2,k=C+1,Y=_+1,$=0,et=0,q=new B;for(let tt=0;tt<Y;tt++){let nt=tt*P-D;for(let ot=0;ot<k;ot++){let rt=ot*R-L;q[E]=rt*M,q[f]=nt*b,q[h]=I,l.push(q.x,q.y,q.z),q[E]=0,q[f]=0,q[h]=w>0?1:-1,d.push(q.x,q.y,q.z),m.push(ot/C),m.push(1-tt/_),$+=1}}for(let tt=0;tt<_;tt++)for(let nt=0;nt<C;nt++){let ot=u+nt+k*tt,rt=u+nt+k*(tt+1),It=u+(nt+1)+k*(tt+1),bt=u+(nt+1)+k*tt;c.push(ot,rt,bt),c.push(rt,It,bt),et+=6}o.addGroup(g,et,A),g+=et,u+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var qn=class i extends Ce{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let d=[],m=[],u=[],g=[],x=0,E=[],f=n/2,h=0;M(),a===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(d),this.setAttribute("position",new Oe(m,3)),this.setAttribute("normal",new Oe(u,3)),this.setAttribute("uv",new Oe(g,2));function M(){let y=new B,T=new B,w=0,C=(e-t)/n;for(let _=0;_<=r;_++){let A=[],R=_/r,P=R*(e-t)+t;for(let L=0;L<=s;L++){let D=L/s,I=D*c+o,k=Math.sin(I),Y=Math.cos(I);T.x=P*k,T.y=-R*n+f,T.z=P*Y,m.push(T.x,T.y,T.z),y.set(k,C,Y).normalize(),u.push(y.x,y.y,y.z),g.push(D,1-R),A.push(x++)}E.push(A)}for(let _=0;_<s;_++)for(let A=0;A<r;A++){let R=E[A][_],P=E[A+1][_],L=E[A+1][_+1],D=E[A][_+1];(t>0||A!==0)&&(d.push(R,P,D),w+=3),(e>0||A!==r-1)&&(d.push(P,L,D),w+=3)}l.addGroup(h,w,0),h+=w}function b(y){let T=x,w=new Ot,C=new B,_=0,A=y===!0?t:e,R=y===!0?1:-1;for(let L=1;L<=s;L++)m.push(0,f*R,0),u.push(0,R,0),g.push(.5,.5),x++;let P=x;for(let L=0;L<=s;L++){let I=L/s*c+o,k=Math.cos(I),Y=Math.sin(I);C.x=A*Y,C.y=f*R,C.z=A*k,m.push(C.x,C.y,C.z),u.push(0,R,0),w.x=k*.5+.5,w.y=Y*.5*R+.5,g.push(w.x,w.y),x++}for(let L=0;L<s;L++){let D=T+L,I=P+L;y===!0?d.push(I,I+1,D):d.push(I+1,I,D),_+=3}l.addGroup(h,_,y===!0?1:2),h+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Yn=class i extends qn{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Zn=class i extends Ce{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,d=c+1,m=t/o,u=e/c,g=[],x=[],E=[],f=[];for(let h=0;h<d;h++){let M=h*u-a;for(let b=0;b<l;b++){let y=b*m-r;x.push(y,-M,0),E.push(0,0,1),f.push(b/o),f.push(1-h/c)}}for(let h=0;h<c;h++)for(let M=0;M<o;M++){let b=M+l*h,y=M+l*(h+1),T=M+1+l*(h+1),w=M+1+l*h;g.push(b,y,w),g.push(y,T,w)}this.setIndex(g),this.setAttribute("position",new Oe(x,3)),this.setAttribute("normal",new Oe(E,3)),this.setAttribute("uv",new Oe(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};function mi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Kl(s))s.isRenderTargetTexture?(Nt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Kl(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Ne(i){let t={};for(let e=0;e<i.length;e++){let n=mi(i[e]);for(let s in n)t[s]=n[s]}return t}function Kl(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Tu(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function qo(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}var Gc={clone:mi,merge:Ne},wu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Eu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ke=class extends Wn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wu,this.fragmentShader=Eu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=mi(t.uniforms),this.uniformsGroups=Tu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new qt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ot().fromArray(s.value);break;case"v3":this.uniforms[n].value=new B().fromArray(s.value);break;case"v4":this.uniforms[n].value=new he().fromArray(s.value);break;case"m3":this.uniforms[n].value=new zt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ue().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Sr=class extends Ke{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var $n=class extends Wn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wa,this.normalScale=new Ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=zr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},br=class extends Wn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ac,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Tr=class extends Wn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Ri(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function fo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Jn=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},wr=class extends Jn{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:go,endingEnd:go}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case _o:r=t,o=2*e-n;break;case xo:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case _o:a=t,c=2*n-e;break;case xo:a=1,c=n+s[1]-s[0];break;default:a=t-1,c=e}let l=(n-e)*.5,d=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,d=this._offsetPrev,m=this._offsetNext,u=this._weightPrev,g=this._weightNext,x=(n-e)/(s-e),E=x*x,f=E*x,h=-u*f+2*u*E-u*x,M=(1+u)*f+(-1.5-2*u)*E+(-.5+u)*x+1,b=(-1-g)*f+(1.5+g)*E+.5*x,y=g*f-g*E;for(let T=0;T!==o;++T)r[T]=h*a[d+T]+M*a[l+T]+b*a[c+T]+y*a[m+T];return r}},Er=class extends Jn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,d=(n-e)/(s-e),m=1-d;for(let u=0;u!==o;++u)r[u]=a[l+u]*m+a[c+u]*d;return r}},Ar=class extends Jn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Cr=class extends Jn{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,d=this.inTangents,m=this.outTangents;if(!d||!m){let x=(n-e)/(s-e),E=1-x;for(let f=0;f!==o;++f)r[f]=a[l+f]*E+a[c+f]*x;return r}let u=o*2,g=t-1;for(let x=0;x!==o;++x){let E=a[l+x],f=a[c+x],h=g*u+x*2,M=m[h],b=m[h+1],y=t*u+x*2,T=d[y],w=d[y+1],C=Cu(n,e,M,T,s);r[x]=Hc(C,E,b,w,f)}return r}};function Hc(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function Au(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Cu(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=Hc(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let c=Au(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var je=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ri(e,this.TimeBufferType),this.values=Ri(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ri(t.times,Array),values:Ri(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),fo(t.settings)&&(n.settings={inTangents:Ri(t.settings.inTangents,Array),outTangents:Ri(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ar(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Er(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new wr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Cr(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case cs:e=this.InterpolantFactoryMethodDiscrete;break;case gr:e=this.InterpolantFactoryMethodLinear;break;case rr:e=this.InterpolantFactoryMethodSmooth;break;case mo:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Nt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return cs;case this.InterpolantFactoryMethodLinear:return gr;case this.InterpolantFactoryMethodSmooth:return rr;case this.InterpolantFactoryMethodBezier:return mo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;fo(this.settings)&&(jl(this.settings.inTangents,t),jl(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Ft("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ft("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Ft("KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){Ft("KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&Hh(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Ft("KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===rr,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],d=t[o+1];if(l!==d&&(o!==1||l!==t[0]))if(s)c=!0;else{let m=o*n,u=m-n,g=m+n;for(let x=0;x!==n;++x){let E=e[m+x];if(E!==e[u+x]||E!==e[g+x]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let m=o*n,u=a*n;for(let g=0;g!==n;++g)e[u+g]=e[m+g]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,fo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function jl(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}je.prototype.ValueTypeName="";je.prototype.TimeBufferType=Float32Array;je.prototype.ValueBufferType=Float32Array;je.prototype.DefaultInterpolation=gr;var Kn=class extends je{constructor(t,e,n){super(t,e,n)}};Kn.prototype.ValueTypeName="bool";Kn.prototype.ValueBufferType=Array;Kn.prototype.DefaultInterpolation=cs;Kn.prototype.InterpolantFactoryMethodLinear=void 0;Kn.prototype.InterpolantFactoryMethodSmooth=void 0;var Rr=class extends je{constructor(t,e,n,s){super(t,e,n,s)}};Rr.prototype.ValueTypeName="color";var Pr=class extends je{constructor(t,e,n,s){super(t,e,n,s)}};Pr.prototype.ValueTypeName="number";var Ir=class extends Jn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(s-e),l=t*o;for(let d=l+o;l!==d;l+=4)$e.slerpFlat(r,0,a,l-o,a,l,c);return r}},vs=class extends je{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Ir(this.times,this.values,this.getValueSize(),t)}};vs.prototype.ValueTypeName="quaternion";vs.prototype.InterpolantFactoryMethodSmooth=void 0;var jn=class extends je{constructor(t,e,n){super(t,e,n)}};jn.prototype.ValueTypeName="string";jn.prototype.ValueBufferType=Array;jn.prototype.DefaultInterpolation=cs;jn.prototype.InterpolantFactoryMethodLinear=void 0;jn.prototype.InterpolantFactoryMethodSmooth=void 0;var Lr=class extends je{constructor(t,e,n,s){super(t,e,n,s)}};Lr.prototype.ValueTypeName="vector";var Dr=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,m){return l.push(d,m),this},this.removeHandler=function(d){let m=l.indexOf(d);return m!==-1&&l.splice(m,2),this},this.getHandler=function(d){for(let m=0,u=l.length;m<u;m+=2){let g=l[m],x=l[m+1];if(g.global&&(g.lastIndex=0),g.test(d))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Wc=new Dr,Nr=class{constructor(t){this.manager=t!==void 0?t:Wc,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Nr.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ms=class extends Be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var po=new ue,Ql=new B,tc=new B,Ur=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ot(512,512),this.mapType=He,this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vi,this._frameExtents=new Ot(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Ql.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ql),tc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(tc),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){po.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(po,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Ui||t.reversedDepth?e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),e.multiply(po)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},ir=new B,sr=new $e,gn=new B,Ss=class extends Be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=on,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ir,sr,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ir,sr,gn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(ir,sr,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ir,sr,gn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Vn=new B,ec=new Ot,nc=new Ot,Le=class extends Ss{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Oi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(os*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Oi*2*Math.atan(Math.tan(os*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z),Vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z)}getViewSize(t,e){return this.getViewBounds(t,ec,nc),e.subVectors(nc,ec)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(os*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Gi=class extends Ss{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},yo=class extends Ur{constructor(){super(new Gi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},bs=class extends Ms{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Be.DEFAULT_UP),this.updateMatrix(),this.target=new Be,this.shadow=new yo}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},Ts=class extends Ms{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Pi=-90,Ii=1,Fr=class extends Be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Le(Pi,Ii,t,e);s.layers=this.layers,this.add(s);let r=new Le(Pi,Ii,t,e);r.layers=this.layers,this.add(r);let a=new Le(Pi,Ii,t,e);a.layers=this.layers,this.add(a);let o=new Le(Pi,Ii,t,e);o.layers=this.layers,this.add(o);let c=new Le(Pi,Ii,t,e);c.layers=this.layers,this.add(c);let l=new Le(Pi,Ii,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===on)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ui)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,d]=this.children,m=t.getRenderTarget(),u=t.getActiveCubeFace(),g=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;let E=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let f=!1;t.isWebGLRenderer===!0?f=t.state.buffers.depth.getReversed():f=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=E,t.setRenderTarget(n,5,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,d),t.setRenderTarget(m,u,g),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}},Or=class extends Le{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Yo="\\[\\]\\.:\\/",Ru=new RegExp("["+Yo+"]","g"),Zo="[^"+Yo+"]",Pu="[^"+Yo.replace("\\.","")+"]",Iu=/((?:WC+[\/:])*)/.source.replace("WC",Zo),Lu=/(WCOD+)?/.source.replace("WCOD",Pu),Du=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Zo),Nu=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Zo),Uu=new RegExp("^"+Iu+Lu+Du+Nu+"$"),Fu=["material","materials","bones","map"],vo=class{constructor(t,e,n){let s=n||ce.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ce=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Ru,"")}static parseTrackName(t){let e=Uu.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Fu.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=n(o.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Nt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){Ft("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ft("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ft("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===l){l=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ft("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ft("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Ft("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){Ft("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[s];if(a===void 0){let l=e.nodeName;Ft("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ft("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ft("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ce.Composite=vo;ce.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ce.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ce.prototype.GetterByBindingType=[ce.prototype._getValue_direct,ce.prototype._getValue_array,ce.prototype._getValue_arrayElement,ce.prototype._getValue_toArray];ce.prototype.SetterByBindingTypeAndVersioning=[[ce.prototype._setValue_direct,ce.prototype._setValue_direct_setNeedsUpdate,ce.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_array,ce.prototype._setValue_array_setNeedsUpdate,ce.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_arrayElement,ce.prototype._setValue_arrayElement_setNeedsUpdate,ce.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_fromArray,ce.prototype._setValue_fromArray_setNeedsUpdate,ce.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Jg=new Float32Array(1);var Hi=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Wt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Wt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var tl=class tl{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};tl.prototype.isMatrix2=!0;var Mo=tl;var ws=class extends ln{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function $o(i,t,e,n){let s=Ou(n);switch(e){case ko:return i*t;case Go:return i*t/s.components*s.byteLength;case qr:return i*t/s.components*s.byteLength;case ri:return i*t*2/s.components*s.byteLength;case Yr:return i*t*2/s.components*s.byteLength;case Vo:return i*t*3/s.components*s.byteLength;case en:return i*t*4/s.components*s.byteLength;case Zr:return i*t*4/s.components*s.byteLength;case Rs:case Ps:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Is:case Ls:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Jr:case jr:return Math.max(i,16)*Math.max(t,8)/4;case $r:case Kr:return Math.max(i,8)*Math.max(t,8)/2;case Qr:case ta:case na:case ia:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ea:case Ds:case sa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ra:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case aa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case oa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case la:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ca:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ha:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ua:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case da:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case fa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case pa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ma:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ga:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case _a:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case xa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ya:case va:case Ma:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Sa:case ba:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ns:case Ta:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ou(i){switch(i){case He:case Fo:return{byteLength:1,components:1};case qi:case Oo:case dn:return{byteLength:2,components:1};case Wr:case Xr:return{byteLength:2,components:4};case hn:case Hr:case un:return{byteLength:4,components:1};case Bo:case zo:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window!="undefined"&&(window.__THREE__?Nt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function dh(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function ku(i){let t=new WeakMap;function e(o,c){let l=o.array,d=o.usage,m=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,d),o.onUploadCallback();let g;if(l instanceof Float32Array)g=i.FLOAT;else if(typeof Float16Array!="undefined"&&l instanceof Float16Array)g=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)g=i.SHORT;else if(l instanceof Uint32Array)g=i.UNSIGNED_INT;else if(l instanceof Int32Array)g=i.INT;else if(l instanceof Int8Array)g=i.BYTE;else if(l instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:g,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:m}}function n(o,c,l){let d=c.array,m=c.updateRanges;if(i.bindBuffer(l,o),m.length===0)i.bufferSubData(l,0,d);else{m.sort((g,x)=>g.start-x.start);let u=0;for(let g=1;g<m.length;g++){let x=m[u],E=m[g];E.start<=x.start+x.count+1?x.count=Math.max(x.count,E.start+E.count-x.start):(++u,m[u]=E)}m.length=u+1;for(let g=0,x=m.length;g<x;g++){let E=m[g];i.bufferSubData(l,E.start*d.BYTES_PER_ELEMENT,d,E.start,E.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Vu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gu=`#ifdef USE_ALPHAHASH
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
#endif`,Hu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,qu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yu=`#ifdef USE_AOMAP
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
#endif`,Zu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$u=`#ifdef USE_BATCHING
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
#endif`,Ju=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ku=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ju=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,td=`#ifdef USE_IRIDESCENCE
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
#endif`,ed=`#ifdef USE_BUMPMAP
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
#endif`,nd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,id=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ad=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,od=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ld=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,cd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,hd=`#define PI 3.141592653589793
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
} // validated`,ud=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,dd=`vec3 transformedNormal = objectNormal;
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
#endif`,fd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,md=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_d="gl_FragColor = linearToOutputTexel( gl_FragColor );",xd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yd=`#ifdef USE_ENVMAP
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
#endif`,vd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Md=`#ifdef USE_ENVMAP
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
#endif`,Sd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bd=`#ifdef USE_ENVMAP
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
#endif`,Td=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ed=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ad=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Cd=`#ifdef USE_GRADIENTMAP
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
}`,Rd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Id=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ld=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Dd=`#ifdef USE_ENVMAP
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
#endif`,Nd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ud=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Od=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bd=`PhysicalMaterial material;
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
#endif`,zd=`uniform sampler2D dfgLUT;
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
}`,kd=`
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
#endif`,Vd=`#if defined( RE_IndirectDiffuse )
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
#endif`,Gd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hd=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Wd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Zd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$d=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Jd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Kd=`#if defined( USE_POINTS_UV )
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
#endif`,jd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ef=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sf=`#ifdef USE_MORPHTARGETS
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
#endif`,rf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,af=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,of=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,lf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,uf=`#ifdef USE_NORMALMAP
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
#endif`,df=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ff=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,pf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_f=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,xf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Tf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,wf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ef=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Af=`float getShadowMask() {
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
}`,Cf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rf=`#ifdef USE_SKINNING
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
#endif`,Pf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,If=`#ifdef USE_SKINNING
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
#endif`,Lf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Df=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Nf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Uf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ff=`#ifdef USE_TRANSMISSION
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
#endif`,Of=`#ifdef USE_TRANSMISSION
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
#endif`,Bf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Gf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hf=`uniform sampler2D t2D;
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
}`,Wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zf=`#include <common>
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
}`,$f=`#if DEPTH_PACKING == 3200
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
}`,Jf=`#define DISTANCE
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
}`,Kf=`#define DISTANCE
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
}`,jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Qf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tp=`uniform float scale;
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
}`,ep=`uniform vec3 diffuse;
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
}`,np=`#include <common>
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
}`,ip=`uniform vec3 diffuse;
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
}`,sp=`#define LAMBERT
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
}`,rp=`#define LAMBERT
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
}`,ap=`#define MATCAP
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
}`,op=`#define MATCAP
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
}`,lp=`#define NORMAL
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
}`,cp=`#define NORMAL
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
}`,hp=`#define PHONG
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
}`,up=`#define PHONG
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
}`,dp=`#define STANDARD
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
}`,fp=`#define STANDARD
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
}`,pp=`#define TOON
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
}`,mp=`#define TOON
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
}`,gp=`uniform float size;
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
}`,_p=`uniform vec3 diffuse;
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
}`,xp=`#include <common>
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
}`,yp=`uniform vec3 color;
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
}`,vp=`uniform float rotation;
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
}`,Mp=`uniform vec3 diffuse;
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
}`,Gt={alphahash_fragment:Vu,alphahash_pars_fragment:Gu,alphamap_fragment:Hu,alphamap_pars_fragment:Wu,alphatest_fragment:Xu,alphatest_pars_fragment:qu,aomap_fragment:Yu,aomap_pars_fragment:Zu,batching_pars_vertex:$u,batching_vertex:Ju,begin_vertex:Ku,beginnormal_vertex:ju,bsdfs:Qu,iridescence_fragment:td,bumpmap_pars_fragment:ed,clipping_planes_fragment:nd,clipping_planes_pars_fragment:id,clipping_planes_pars_vertex:sd,clipping_planes_vertex:rd,color_fragment:ad,color_pars_fragment:od,color_pars_vertex:ld,color_vertex:cd,common:hd,cube_uv_reflection_fragment:ud,defaultnormal_vertex:dd,displacementmap_pars_vertex:fd,displacementmap_vertex:pd,emissivemap_fragment:md,emissivemap_pars_fragment:gd,colorspace_fragment:_d,colorspace_pars_fragment:xd,envmap_fragment:yd,envmap_common_pars_fragment:vd,envmap_pars_fragment:Md,envmap_pars_vertex:Sd,envmap_physical_pars_fragment:Dd,envmap_vertex:bd,fog_vertex:Td,fog_pars_vertex:wd,fog_fragment:Ed,fog_pars_fragment:Ad,gradientmap_pars_fragment:Cd,lightmap_pars_fragment:Rd,lights_lambert_fragment:Pd,lights_lambert_pars_fragment:Id,lights_pars_begin:Ld,lights_toon_fragment:Nd,lights_toon_pars_fragment:Ud,lights_phong_fragment:Fd,lights_phong_pars_fragment:Od,lights_physical_fragment:Bd,lights_physical_pars_fragment:zd,lights_fragment_begin:kd,lights_fragment_maps:Vd,lights_fragment_end:Gd,lightprobes_pars_fragment:Hd,logdepthbuf_fragment:Wd,logdepthbuf_pars_fragment:Xd,logdepthbuf_pars_vertex:qd,logdepthbuf_vertex:Yd,map_fragment:Zd,map_pars_fragment:$d,map_particle_fragment:Jd,map_particle_pars_fragment:Kd,metalnessmap_fragment:jd,metalnessmap_pars_fragment:Qd,morphinstance_vertex:tf,morphcolor_vertex:ef,morphnormal_vertex:nf,morphtarget_pars_vertex:sf,morphtarget_vertex:rf,normal_fragment_begin:af,normal_fragment_maps:of,normal_pars_fragment:lf,normal_pars_vertex:cf,normal_vertex:hf,normalmap_pars_fragment:uf,clearcoat_normal_fragment_begin:df,clearcoat_normal_fragment_maps:ff,clearcoat_pars_fragment:pf,iridescence_pars_fragment:mf,opaque_fragment:gf,packing:_f,premultiplied_alpha_fragment:xf,project_vertex:yf,dithering_fragment:vf,dithering_pars_fragment:Mf,roughnessmap_fragment:Sf,roughnessmap_pars_fragment:bf,shadowmap_pars_fragment:Tf,shadowmap_pars_vertex:wf,shadowmap_vertex:Ef,shadowmask_pars_fragment:Af,skinbase_vertex:Cf,skinning_pars_vertex:Rf,skinning_vertex:Pf,skinnormal_vertex:If,specularmap_fragment:Lf,specularmap_pars_fragment:Df,tonemapping_fragment:Nf,tonemapping_pars_fragment:Uf,transmission_fragment:Ff,transmission_pars_fragment:Of,uv_pars_fragment:Bf,uv_pars_vertex:zf,uv_vertex:kf,worldpos_vertex:Vf,background_vert:Gf,background_frag:Hf,backgroundCube_vert:Wf,backgroundCube_frag:Xf,cube_vert:qf,cube_frag:Yf,depth_vert:Zf,depth_frag:$f,distance_vert:Jf,distance_frag:Kf,equirect_vert:jf,equirect_frag:Qf,linedashed_vert:tp,linedashed_frag:ep,meshbasic_vert:np,meshbasic_frag:ip,meshlambert_vert:sp,meshlambert_frag:rp,meshmatcap_vert:ap,meshmatcap_frag:op,meshnormal_vert:lp,meshnormal_frag:cp,meshphong_vert:hp,meshphong_frag:up,meshphysical_vert:dp,meshphysical_frag:fp,meshtoon_vert:pp,meshtoon_frag:mp,points_vert:gp,points_frag:_p,shadow_vert:xp,shadow_frag:yp,sprite_vert:vp,sprite_frag:Mp},mt={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new Ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new Ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},Mn={basic:{uniforms:Ne([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:Ne([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new qt(0)},envMapIntensity:{value:1}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:Ne([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:Ne([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:Ne([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:Ne([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:Ne([mt.points,mt.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:Ne([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:Ne([mt.common,mt.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:Ne([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:Ne([mt.sprite,mt.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distance:{uniforms:Ne([mt.common,mt.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distance_vert,fragmentShader:Gt.distance_frag},shadow:{uniforms:Ne([mt.lights,mt.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};Mn.physical={uniforms:Ne([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new Ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new Ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new Ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};var Ca={r:0,b:0,g:0},Sp=new ue,fh=new zt;fh.set(-1,0,0,0,1,0,0,0,1);function bp(i,t,e,n,s,r){let a=new qt(0),o=s===!0?0:1,c,l,d=null,m=0,u=null;function g(M){let b=M.isScene===!0?M.background:null;if(b&&b.isTexture){let y=M.backgroundBlurriness>0;b=t.get(b,y)}return b}function x(M){let b=!1,y=g(M);y===null?f(a,o):y&&y.isColor&&(f(y,1),b=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||b)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function E(M,b){let y=g(b);y&&(y.isCubeTexture||y.mapping===As)?(l===void 0&&(l=new Zt(new De(1,1,1),new Ke({name:"BackgroundCubeMaterial",uniforms:mi(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:ze,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Sp.makeRotationFromEuler(b.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(fh),l.material.toneMapped=Yt.getTransfer(y.colorSpace)!==ee,(d!==y||m!==y.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,d=y,m=y.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Zt(new Zn(2,2),new Ke({name:"BackgroundMaterial",uniforms:mi(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=Yt.getTransfer(y.colorSpace)!==ee,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||m!==y.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,d=y,m=y.version,u=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function f(M,b){M.getRGB(Ca,qo(i)),e.buffers.color.setClear(Ca.r,Ca.g,Ca.b,b,r)}function h(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,b=1){a.set(M),o=b,f(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,f(a,o)},render:x,addToRenderList:E,dispose:h}}function Tp(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(P,L,D,I,k){let Y=!1,$=m(P,I,D,L);r!==$&&(r=$,l(r.object)),Y=g(P,I,D,k),Y&&x(P,I,D,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,y(P,L,D,I),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function c(){return i.createVertexArray()}function l(P){return i.bindVertexArray(P)}function d(P){return i.deleteVertexArray(P)}function m(P,L,D,I){let k=I.wireframe===!0,Y=n[L.id];Y===void 0&&(Y={},n[L.id]=Y);let $=P.isInstancedMesh===!0?P.id:0,et=Y[$];et===void 0&&(et={},Y[$]=et);let q=et[D.id];q===void 0&&(q={},et[D.id]=q);let tt=q[k];return tt===void 0&&(tt=u(c()),q[k]=tt),tt}function u(P){let L=[],D=[],I=[];for(let k=0;k<e;k++)L[k]=0,D[k]=0,I[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:D,attributeDivisors:I,object:P,attributes:{},index:null}}function g(P,L,D,I){let k=r.attributes,Y=L.attributes,$=0,et=D.getAttributes();for(let q in et)if(et[q].location>=0){let nt=k[q],ot=Y[q];if(ot===void 0&&(q==="instanceMatrix"&&P.instanceMatrix&&(ot=P.instanceMatrix),q==="instanceColor"&&P.instanceColor&&(ot=P.instanceColor)),nt===void 0||nt.attribute!==ot||ot&&nt.data!==ot.data)return!0;$++}return r.attributesNum!==$||r.index!==I}function x(P,L,D,I){let k={},Y=L.attributes,$=0,et=D.getAttributes();for(let q in et)if(et[q].location>=0){let nt=Y[q];nt===void 0&&(q==="instanceMatrix"&&P.instanceMatrix&&(nt=P.instanceMatrix),q==="instanceColor"&&P.instanceColor&&(nt=P.instanceColor));let ot={};ot.attribute=nt,nt&&nt.data&&(ot.data=nt.data),k[q]=ot,$++}r.attributes=k,r.attributesNum=$,r.index=I}function E(){let P=r.newAttributes;for(let L=0,D=P.length;L<D;L++)P[L]=0}function f(P){h(P,0)}function h(P,L){let D=r.newAttributes,I=r.enabledAttributes,k=r.attributeDivisors;D[P]=1,I[P]===0&&(i.enableVertexAttribArray(P),I[P]=1),k[P]!==L&&(i.vertexAttribDivisor(P,L),k[P]=L)}function M(){let P=r.newAttributes,L=r.enabledAttributes;for(let D=0,I=L.length;D<I;D++)L[D]!==P[D]&&(i.disableVertexAttribArray(D),L[D]=0)}function b(P,L,D,I,k,Y,$){$===!0?i.vertexAttribIPointer(P,L,D,k,Y):i.vertexAttribPointer(P,L,D,I,k,Y)}function y(P,L,D,I){E();let k=I.attributes,Y=D.getAttributes(),$=L.defaultAttributeValues;for(let et in Y){let q=Y[et];if(q.location>=0){let tt=k[et];if(tt===void 0&&(et==="instanceMatrix"&&P.instanceMatrix&&(tt=P.instanceMatrix),et==="instanceColor"&&P.instanceColor&&(tt=P.instanceColor)),tt!==void 0){let nt=tt.normalized,ot=tt.itemSize,rt=t.get(tt);if(rt===void 0)continue;let It=rt.buffer,bt=rt.type,Lt=rt.bytesPerElement,X=bt===i.INT||bt===i.UNSIGNED_INT||tt.gpuType===Hr;if(tt.isInterleavedBufferAttribute){let K=tt.data,dt=K.stride,Tt=tt.offset;if(K.isInstancedInterleavedBuffer){for(let ft=0;ft<q.locationSize;ft++)h(q.location+ft,K.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ft=0;ft<q.locationSize;ft++)f(q.location+ft);i.bindBuffer(i.ARRAY_BUFFER,It);for(let ft=0;ft<q.locationSize;ft++)b(q.location+ft,ot/q.locationSize,bt,nt,dt*Lt,(Tt+ot/q.locationSize*ft)*Lt,X)}else{if(tt.isInstancedBufferAttribute){for(let K=0;K<q.locationSize;K++)h(q.location+K,tt.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let K=0;K<q.locationSize;K++)f(q.location+K);i.bindBuffer(i.ARRAY_BUFFER,It);for(let K=0;K<q.locationSize;K++)b(q.location+K,ot/q.locationSize,bt,nt,ot*Lt,ot/q.locationSize*K*Lt,X)}}else if($!==void 0){let nt=$[et];if(nt!==void 0)switch(nt.length){case 2:i.vertexAttrib2fv(q.location,nt);break;case 3:i.vertexAttrib3fv(q.location,nt);break;case 4:i.vertexAttrib4fv(q.location,nt);break;default:i.vertexAttrib1fv(q.location,nt)}}}}M()}function T(){A();for(let P in n){let L=n[P];for(let D in L){let I=L[D];for(let k in I){let Y=I[k];for(let $ in Y)d(Y[$].object),delete Y[$];delete I[k]}}delete n[P]}}function w(P){if(n[P.id]===void 0)return;let L=n[P.id];for(let D in L){let I=L[D];for(let k in I){let Y=I[k];for(let $ in Y)d(Y[$].object),delete Y[$];delete I[k]}}delete n[P.id]}function C(P){for(let L in n){let D=n[L];for(let I in D){let k=D[I];if(k[P.id]===void 0)continue;let Y=k[P.id];for(let $ in Y)d(Y[$].object),delete Y[$];delete k[P.id]}}}function _(P){for(let L in n){let D=n[L],I=P.isInstancedMesh===!0?P.id:0,k=D[I];if(k!==void 0){for(let Y in k){let $=k[Y];for(let et in $)d($[et].object),delete $[et];delete k[Y]}delete D[I],Object.keys(D).length===0&&delete n[L]}}}function A(){R(),a=!0,r!==s&&(r=s,l(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:R,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:_,releaseStatesOfProgram:C,initAttributes:E,enableAttribute:f,disableUnusedAttributes:M}}function wp(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,d){d!==0&&(i.drawArraysInstanced(n,c,l,d),e.update(l,n,d))}function o(c,l,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,d);let u=0;for(let g=0;g<d;g++)u+=l[g];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Ep(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==en&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let _=C===dn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==He&&C!==un&&!_&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",d=c(l);d!==l&&(Nt("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);let m=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Nt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:m,reversedDepthBuffer:u,maxTextures:g,maxVertexTextures:x,maxTextureSize:E,maxCubemapSize:f,maxAttributes:h,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:y,maxSamples:T,samples:w}}function Ap(i){let t=this,e=null,n=0,s=!1,r=!1,a=new Ye,o=new zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(m,u){let g=m.length!==0||u||n!==0||s;return s=u,n=m.length,g},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(m,u){e=d(m,u,0)},this.setState=function(m,u,g){let x=m.clippingPlanes,E=m.clipIntersection,f=m.clipShadows,h=i.get(m);if(!s||x===null||x.length===0||r&&!f)r?d(null):l();else{let M=r?0:n,b=M*4,y=h.clippingState||null;c.value=y,y=d(x,u,b,g);for(let T=0;T!==b;++T)y[T]=e[T];h.clippingState=y,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function d(m,u,g,x){let E=m!==null?m.length:0,f=null;if(E!==0){if(f=c.value,x!==!0||f===null){let h=g+E*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(f===null||f.length<h)&&(f=new Float32Array(h));for(let b=0,y=g;b!==E;++b,y+=4)a.copy(m[b]).applyMatrix4(M,o),a.normal.toArray(f,y),f[y+3]=a.constant}c.value=f,c.needsUpdate=!0}return t.numPlanes=E,t.numIntersection=0,f}}var Ji=4,Cp=6,Rp=20,Pp=256,Us=new Gi,Xc=new qt,el=null,nl=0,il=0,sl=!1,Ip=new B,gi=new B,Pa=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=Ip}=r;el=this._renderer.getRenderTarget(),nl=this._renderer.getActiveCubeFace(),il=this._renderer.getActiveMipmapLevel(),sl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(el,nl,il),this._renderer.xr.enabled=sl,t.scissorTest=!1,$i(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ni||t.mapping===pi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),el=this._renderer.getRenderTarget(),nl=this._renderer.getActiveCubeFace(),il=this._renderer.getActiveMipmapLevel(),sl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ae,minFilter:Ae,generateMipmaps:!1,type:dn,format:en,colorSpace:hs,depthBuffer:!1},s=qc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qc(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Lp(r)),this._blurMaterial=Np(r,t,e),this._ggxMaterial=Dp(r,t,e)}return s}_compileMaterial(t){let e=new Zt(new Ce,t);this._renderer.compile(e,Us)}_sceneToCubeUV(t,e,n,s,r){let c=new Le(90,1,e,n),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],m=this._renderer,u=m.autoClear,g=m.toneMapping;m.getClearColor(Xc),m.toneMapping=cn,m.autoClear=!1,m.state.buffers.depth.getReversed()&&(m.setRenderTarget(s),m.clearDepth(),m.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Zt(new De,new Je({name:"PMREM.Background",side:ze,depthWrite:!1,depthTest:!1})));let E=this._backgroundBox,f=E.material,h=!1,M=t.background;M?M.isColor&&(f.color.copy(M),t.background=null,h=!0):(f.color.copy(Xc),h=!0);for(let b=0;b<6;b++){let y=b%3;y===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+d[b],r.y,r.z)):y===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+d[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+d[b]));let T=this._cubeSize;$i(s,y*T,b>2?T:0,T,T),m.setRenderTarget(s),h&&m.render(E,c),m.render(t,c)}m.toneMapping=g,m.autoClear=u,t.background=M}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===ni||t.mapping===pi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yc());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let c=this._cubeSize;$i(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Us)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),d=e/(this._lodMeshes.length-1),m=Math.sqrt(l*l-d*d),u=l*1.25,g=m*u,{_lodMax:x}=this,E=this._sizeLods[n],f=3*E*(n>x-Ji?n-x+Ji:0),h=4*(this._cubeSize-E);c.envMap.value=t.texture,c.roughness.value=g,c.mipInt.value=x-e,$i(r,f,h,3*E,2*E),s.setRenderTarget(r),s.render(o,Us),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=x-n,$i(t,f,h,3*E,2*E),s.setRenderTarget(t),s.render(o,Us)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let d=this._sizeLods[s],m=3*d*(s>this._lodMax-Ji?s-this._lodMax+Ji:0),u=4*(this._cubeSize-d);$i(e,m,u,3*d,2*d),a.setRenderTarget(e),a.render(c,Us)}};function Lp(i){let t=[],e=[],n=i,s=i-Ji+1+Cp;for(let r=0;r<s;r++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),c=-o,l=1+o,d=[c,c,l,c,l,l,c,c,l,l,c,l],m=6,u=6,g=3,x=new Float32Array(g*u*m),E=new Float32Array(g*u*m);for(let h=0;h<m;h++){let M=h%3*2/3-1,b=h>2?0:-1,y=[M,b,0,M+2/3,b,0,M+2/3,b+1,0,M,b,0,M+2/3,b+1,0,M,b+1,0];x.set(y,g*u*h);for(let T=0;T<u;T++){let w=d[T*2]*2-1,C=d[T*2+1]*2-1;h===0?gi.set(1,C,w):h===1?gi.set(-w,1,-C):h===2?gi.set(-w,C,1):h===3?gi.set(-1,C,-w):h===4?gi.set(-w,-1,C):gi.set(w,C,-1),gi.toArray(E,(h*u+T)*g)}}let f=new Ce;f.setAttribute("position",new ye(x,g)),f.setAttribute("outputDirection",new ye(E,g)),e.push(new Zt(f,null)),n>Ji&&n--}return{lodMeshes:e,sizeLods:t}}function qc(i,t,e){let n=new Ge(i,t,e);return n.texture.mapping=As,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $i(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Dp(i,t,e){return new Ke({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Pp,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Da(),fragmentShader:`

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
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Np(i,t,e){return new Ke({name:"SphericalGaussianBlur",defines:{SAMPLES:Rp,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Da(),fragmentShader:`

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
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Yc(){return new Ke({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Da(),fragmentShader:`

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
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Zc(){return new Ke({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Da(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Da(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ia=class extends Ge{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new xs(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new De(5,5,5),r=new Ke({name:"CubemapFromEquirect",uniforms:mi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ze,blending:yn});r.uniforms.tEquirect.value=e;let a=new Zt(s,r),o=e.minFilter;return e.minFilter===ii&&(e.minFilter=Ae),new Fr(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function Up(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,g=!1){return u==null?null:g?a(u):r(u)}function r(u){if(u&&u.isTexture){let g=u.mapping;if(g===kr||g===Vr)if(t.has(u)){let x=t.get(u).texture;return o(x,u.mapping)}else{let x=u.image;if(x&&x.height>0){let E=new Ia(x.height);return E.fromEquirectangularTexture(i,u),t.set(u,E),u.addEventListener("dispose",l),o(E.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let g=u.mapping,x=g===kr||g===Vr,E=g===ni||g===pi;if(x||E){let f=e.get(u),h=f!==void 0?f.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==h)return n===null&&(n=new Pa(i)),f=x?n.fromEquirectangular(u,f):n.fromCubemap(u,f),f.texture.pmremVersion=u.pmremVersion,e.set(u,f),f.texture;if(f!==void 0)return f.texture;{let M=u.image;return x&&M&&M.height>0||E&&M&&c(M)?(n===null&&(n=new Pa(i)),f=x?n.fromEquirectangular(u):n.fromCubemap(u),f.texture.pmremVersion=u.pmremVersion,e.set(u,f),u.addEventListener("dispose",d),f.texture):null}}}return u}function o(u,g){return g===kr?u.mapping=ni:g===Vr&&(u.mapping=pi),u}function c(u){let g=0,x=6;for(let E=0;E<x;E++)u[E]!==void 0&&g++;return g===x}function l(u){let g=u.target;g.removeEventListener("dispose",l);let x=t.get(g);x!==void 0&&(t.delete(g),x.dispose())}function d(u){let g=u.target;g.removeEventListener("dispose",d);let x=e.get(g);x!==void 0&&(e.delete(g),x.dispose())}function m(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:m}}function Fp(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&di("WebGLRenderer: "+n+" extension not supported."),s}}}function Op(i,t,e,n){let s={},r=new WeakMap;function a(m){let u=m.target;u.index!==null&&t.remove(u.index);for(let x in u.attributes)t.remove(u.attributes[x]);u.removeEventListener("dispose",a),delete s[u.id];let g=r.get(u);g&&(t.remove(g),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(m,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function c(m){let u=m.attributes;for(let g in u)t.update(u[g],i.ARRAY_BUFFER)}function l(m){let u=[],g=m.index,x=m.attributes.position,E=0;if(x===void 0)return;if(g!==null){let M=g.array;E=g.version;for(let b=0,y=M.length;b<y;b+=3){let T=M[b+0],w=M[b+1],C=M[b+2];u.push(T,w,w,C,C,T)}}else{let M=x.array;E=x.version;for(let b=0,y=M.length/3-1;b<y;b+=3){let T=b+0,w=b+1,C=b+2;u.push(T,w,w,C,C,T)}}let f=new(x.count>=65535?_s:gs)(u,1);f.version=E;let h=r.get(m);h&&t.remove(h),r.set(m,f)}function d(m){let u=r.get(m);if(u){let g=m.index;g!==null&&u.version<g.version&&l(m)}else l(m);return r.get(m)}return{get:o,update:c,getWireframeAttribute:d}}function Bp(i,t,e){let n;function s(m){n=m}let r,a;function o(m){r=m.type,a=m.bytesPerElement}function c(m,u){i.drawElements(n,u,r,m*a),e.update(u,n,1)}function l(m,u,g){g!==0&&(i.drawElementsInstanced(n,u,r,m*a,g),e.update(u,n,g))}function d(m,u,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,m,0,g);let E=0;for(let f=0;f<g;f++)E+=u[f];e.update(E,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function zp(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Ft("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function kp(i,t,e){let n=new WeakMap,s=new he;function r(a,o,c){let l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,m=d!==void 0?d.length:0,u=n.get(o);if(u===void 0||u.count!==m){let A=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();let g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,E=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],b=0;g===!0&&(b=1),x===!0&&(b=2),E===!0&&(b=3);let y=o.attributes.position.count*b,T=1;y>t.maxTextureSize&&(T=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let w=new Float32Array(y*T*4*m),C=new fs(w,y,T,m);C.type=un,C.needsUpdate=!0;let _=b*4;for(let R=0;R<m;R++){let P=f[R],L=h[R],D=M[R],I=y*T*4*R;for(let k=0;k<P.count;k++){let Y=k*_;g===!0&&(s.fromBufferAttribute(P,k),w[I+Y+0]=s.x,w[I+Y+1]=s.y,w[I+Y+2]=s.z,w[I+Y+3]=0),x===!0&&(s.fromBufferAttribute(L,k),w[I+Y+4]=s.x,w[I+Y+5]=s.y,w[I+Y+6]=s.z,w[I+Y+7]=0),E===!0&&(s.fromBufferAttribute(D,k),w[I+Y+8]=s.x,w[I+Y+9]=s.y,w[I+Y+10]=s.z,w[I+Y+11]=D.itemSize===4?s.w:1)}}u={count:m,texture:C,size:new Ot(y,T)},n.set(o,u),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let E=0;E<l.length;E++)g+=l[E];let x=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Vp(i,t,e,n,s){let r=new WeakMap;function a(l){let d=s.render.frame,m=l.geometry,u=t.get(l,m);if(r.get(u)!==d&&(t.update(u),r.set(u,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==d&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,d))),l.isSkinnedMesh){let g=l.skeleton;r.get(g)!==d&&(g.update(),r.set(g,d))}return u}function o(){r=new WeakMap}function c(l){let d=l.target;d.removeEventListener("dispose",c),n.releaseStatesOfObject(d),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:a,dispose:o}}var Gp={[Co]:"LINEAR_TONE_MAPPING",[Ro]:"REINHARD_TONE_MAPPING",[Po]:"CINEON_TONE_MAPPING",[Io]:"ACES_FILMIC_TONE_MAPPING",[Do]:"AGX_TONE_MAPPING",[No]:"NEUTRAL_TONE_MAPPING",[Lo]:"CUSTOM_TONE_MAPPING"};function Hp(i,t,e,n,s,r){let a=new Ge(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new Ce;l.setAttribute("position",new Oe([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Oe([0,2,0,0,2,0],2));let d=new Sr({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),m=new Zt(l,d),u=new Gi(-1,1,1,-1,0,1),g=null,x=null,E=!1,f,h=null,M=[],b=!1;this.setSize=function(y,T){a.setSize(y,T),o!==null&&o.setSize(y,T),c!==null&&c.setSize(y,T);for(let w=0;w<M.length;w++){let C=M[w];C.setSize&&C.setSize(y,T)}},this.setEffects=function(y){M=y,b=M.length>0&&M[0].isRenderPass===!0;let T=a.width,w=a.height;M.length>0&&o===null&&(o=new Ge(T,w,{type:dn,depthBuffer:!1,stencilBuffer:!1}),c=new Ge(T,w,{type:dn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<M.length;C++){let _=M[C];_.setSize&&_.setSize(T,w)}},this.begin=function(y,T){if(E||y.toneMapping===cn&&M.length===0)return!1;if(h=T,T!==null){let w=T.width,C=T.height;(a.width!==w||a.height!==C)&&this.setSize(w,C)}return b===!1&&y.setRenderTarget(a),f=y.toneMapping,y.toneMapping=cn,!0},this.hasRenderPass=function(){return b},this.end=function(y,T){y.toneMapping=f,E=!0;let w=a,C=o;for(let _=0;_<M.length;_++){let A=M[_];A.enabled!==!1&&(A.render(y,C,w,T),A.needsSwap!==!1&&(w=C,C=C===o?c:o))}if(g!==y.outputColorSpace||x!==y.toneMapping){g=y.outputColorSpace,x=y.toneMapping,d.defines={},Yt.getTransfer(g)===ee&&(d.defines.SRGB_TRANSFER="");let _=Gp[x];_&&(d.defines[_]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=w.texture,y.setRenderTarget(h),y.render(m,u),h=null,E=!1},this.isCompositing=function(){return E},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),d.dispose()}}var ph=new Ve,ol=new Xn(1,1),mh=new fs,gh=new yr,_h=new xs,$c=[],Jc=[],Kc=new Float32Array(16),jc=new Float32Array(9),Qc=new Float32Array(4);function ji(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=$c[s];if(r===void 0&&(r=new Float32Array(s),$c[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function ve(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Me(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Na(i,t){let e=Jc[t];e===void 0&&(e=new Int32Array(t),Jc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Wp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Xp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2fv(this.addr,t),Me(e,t)}}function qp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ve(e,t))return;i.uniform3fv(this.addr,t),Me(e,t)}}function Yp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4fv(this.addr,t),Me(e,t)}}function Zp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Me(e,t)}else{if(ve(e,n))return;Qc.set(n),i.uniformMatrix2fv(this.addr,!1,Qc),Me(e,n)}}function $p(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Me(e,t)}else{if(ve(e,n))return;jc.set(n),i.uniformMatrix3fv(this.addr,!1,jc),Me(e,n)}}function Jp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Me(e,t)}else{if(ve(e,n))return;Kc.set(n),i.uniformMatrix4fv(this.addr,!1,Kc),Me(e,n)}}function Kp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function jp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2iv(this.addr,t),Me(e,t)}}function Qp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;i.uniform3iv(this.addr,t),Me(e,t)}}function tm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4iv(this.addr,t),Me(e,t)}}function em(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function nm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2uiv(this.addr,t),Me(e,t)}}function im(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;i.uniform3uiv(this.addr,t),Me(e,t)}}function sm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4uiv(this.addr,t),Me(e,t)}}function rm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ol.compareFunction=e.isReversedDepthBuffer()?Aa:Ea,r=ol):r=ph,e.setTexture2D(t||r,s)}function am(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||gh,s)}function om(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||_h,s)}function lm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||mh,s)}function cm(i){switch(i){case 5126:return Wp;case 35664:return Xp;case 35665:return qp;case 35666:return Yp;case 35674:return Zp;case 35675:return $p;case 35676:return Jp;case 5124:case 35670:return Kp;case 35667:case 35671:return jp;case 35668:case 35672:return Qp;case 35669:case 35673:return tm;case 5125:return em;case 36294:return nm;case 36295:return im;case 36296:return sm;case 35678:case 36198:case 36298:case 36306:case 35682:return rm;case 35679:case 36299:case 36307:return am;case 35680:case 36300:case 36308:case 36293:return om;case 36289:case 36303:case 36311:case 36292:return lm}}function hm(i,t){i.uniform1fv(this.addr,t)}function um(i,t){let e=ji(t,this.size,2);i.uniform2fv(this.addr,e)}function dm(i,t){let e=ji(t,this.size,3);i.uniform3fv(this.addr,e)}function fm(i,t){let e=ji(t,this.size,4);i.uniform4fv(this.addr,e)}function pm(i,t){let e=ji(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function mm(i,t){let e=ji(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function gm(i,t){let e=ji(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function _m(i,t){i.uniform1iv(this.addr,t)}function xm(i,t){i.uniform2iv(this.addr,t)}function ym(i,t){i.uniform3iv(this.addr,t)}function vm(i,t){i.uniform4iv(this.addr,t)}function Mm(i,t){i.uniform1uiv(this.addr,t)}function Sm(i,t){i.uniform2uiv(this.addr,t)}function bm(i,t){i.uniform3uiv(this.addr,t)}function Tm(i,t){i.uniform4uiv(this.addr,t)}function wm(i,t,e){let n=this.cache,s=t.length,r=Na(e,s);ve(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=ol:a=ph;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Em(i,t,e){let n=this.cache,s=t.length,r=Na(e,s);ve(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||gh,r[a])}function Am(i,t,e){let n=this.cache,s=t.length,r=Na(e,s);ve(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||_h,r[a])}function Cm(i,t,e){let n=this.cache,s=t.length,r=Na(e,s);ve(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||mh,r[a])}function Rm(i){switch(i){case 5126:return hm;case 35664:return um;case 35665:return dm;case 35666:return fm;case 35674:return pm;case 35675:return mm;case 35676:return gm;case 5124:case 35670:return _m;case 35667:case 35671:return xm;case 35668:case 35672:return ym;case 35669:case 35673:return vm;case 5125:return Mm;case 36294:return Sm;case 36295:return bm;case 36296:return Tm;case 35678:case 36198:case 36298:case 36306:case 35682:return wm;case 35679:case 36299:case 36307:return Em;case 35680:case 36300:case 36308:case 36293:return Am;case 36289:case 36303:case 36311:case 36292:return Cm}}var ll=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=cm(e.type)}},cl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Rm(e.type)}},hl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},rl=/(\w+)(\])?(\[|\.)?/g;function th(i,t){i.seq.push(t),i.map[t.id]=t}function Pm(i,t,e){let n=i.name,s=n.length;for(rl.lastIndex=0;;){let r=rl.exec(n),a=rl.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){th(e,l===void 0?new ll(o,i,t):new cl(o,i,t));break}else{let m=e.map[o];m===void 0&&(m=new hl(o),th(e,m)),e=m}}}var Ki=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);Pm(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function eh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Im=37297,Lm=0;function Dm(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var nh=new zt;function Nm(i){Yt._getMatrix(nh,Yt.workingColorSpace,i);let t=`mat3( ${nh.elements.map(e=>e.toFixed(4))} )`;switch(Yt.getTransfer(i)){case us:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return Nt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function ih(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Dm(i.getShaderSource(t),o)}else return r}function Um(i,t){let e=Nm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var Fm={[Co]:"Linear",[Ro]:"Reinhard",[Po]:"Cineon",[Io]:"ACESFilmic",[Do]:"AgX",[No]:"Neutral",[Lo]:"Custom"};function Om(i,t){let e=Fm[t];return e===void 0?(Nt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ra=new B;function Bm(){Yt.getLuminanceCoefficients(Ra);let i=Ra.x.toFixed(4),t=Ra.y.toFixed(4),e=Ra.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function zm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Os).join(`
`)}function km(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Vm(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Os(i){return i!==""}function sh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function rh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Gm=/^[ \t]*#include +<([\w\d./]+)>/gm;function ul(i){return i.replace(Gm,Wm)}var Hm=new Map;function Wm(i,t){let e=Gt[t];if(e===void 0){let n=Hm.get(t);if(n!==void 0)e=Gt[n],Nt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return ul(e)}var Xm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ah(i){return i.replace(Xm,qm)}function qm(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function oh(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var Ym={[Es]:"SHADOWMAP_TYPE_PCF",[Wi]:"SHADOWMAP_TYPE_VSM"};function Zm(i){return Ym[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var $m={[ni]:"ENVMAP_TYPE_CUBE",[pi]:"ENVMAP_TYPE_CUBE",[As]:"ENVMAP_TYPE_CUBE_UV"};function Jm(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":$m[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Km={[pi]:"ENVMAP_MODE_REFRACTION"};function jm(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Km[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Qm={[zr]:"ENVMAP_BLENDING_MULTIPLY",[Tc]:"ENVMAP_BLENDING_MIX",[wc]:"ENVMAP_BLENDING_ADD"};function tg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Qm[i.combine]||"ENVMAP_BLENDING_NONE"}function eg(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function ng(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=Zm(e),l=Jm(e),d=jm(e),m=tg(e),u=eg(e),g=zm(e),x=km(r),E=s.createProgram(),f,h,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Os).join(`
`),f.length>0&&(f+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Os).join(`
`),h.length>0&&(h+=`
`)):(f=[oh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Os).join(`
`),h=[oh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+d:"",e.envMap?"#define "+m:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==cn?"#define TONE_MAPPING":"",e.toneMapping!==cn?Gt.tonemapping_pars_fragment:"",e.toneMapping!==cn?Om("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,Um("linearToOutputTexel",e.outputColorSpace),Bm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Os).join(`
`)),a=ul(a),a=sh(a,e),a=rh(a,e),o=ul(o),o=sh(o,e),o=rh(o,e),a=ah(a),o=ah(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,f=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,h=["#define varying in",e.glslVersion===Ho?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ho?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);let b=M+f+a,y=M+h+o,T=eh(s,s.VERTEX_SHADER,b),w=eh(s,s.FRAGMENT_SHADER,y);s.attachShader(E,T),s.attachShader(E,w),e.index0AttributeName!==void 0?s.bindAttribLocation(E,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(E,0,"position"),s.linkProgram(E);function C(P){if(i.debug.checkShaderErrors){let L=s.getProgramInfoLog(E)||"",D=s.getShaderInfoLog(T)||"",I=s.getShaderInfoLog(w)||"",k=L.trim(),Y=D.trim(),$=I.trim(),et=!0,q=!0;if(s.getProgramParameter(E,s.LINK_STATUS)===!1)if(et=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,E,T,w);else{let tt=ih(s,T,"vertex"),nt=ih(s,w,"fragment");Ft("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(E,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+k+`
`+tt+`
`+nt)}else k!==""?Nt("WebGLProgram: Program Info Log:",k):(Y===""||$==="")&&(q=!1);q&&(P.diagnostics={runnable:et,programLog:k,vertexShader:{log:Y,prefix:f},fragmentShader:{log:$,prefix:h}})}s.deleteShader(T),s.deleteShader(w),_=new Ki(s,E),A=Vm(s,E)}let _;this.getUniforms=function(){return _===void 0&&C(this),_};let A;this.getAttributes=function(){return A===void 0&&C(this),A};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(E,Im)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(E),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Lm++,this.cacheKey=t,this.usedTimes=1,this.program=E,this.vertexShader=T,this.fragmentShader=w,this}var ig=0,dl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new fl(t),e.set(t,n)),n}},fl=class{constructor(t){this.id=ig++,this.code=t,this.usedTimes=0}};function sg(i){return i===ri||i===Ds||i===Ns}function rg(i,t,e,n,s,r){let a=new ps,o=new dl,c=new Set,l=[],d=new Map,m=n.logarithmicDepthBuffer,u=n.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(_){return c.add(_),_===0?"uv":`uv${_}`}function E(_,A,R,P,L,D){let I=P.fog,k=L.geometry,Y=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,$=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,et=t.get(_.envMap||Y,$),q=et&&et.mapping===As?et.image.height:null,tt=g[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&Nt("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));let nt=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ot=nt!==void 0?nt.length:0,rt=0;k.morphAttributes.position!==void 0&&(rt=1),k.morphAttributes.normal!==void 0&&(rt=2),k.morphAttributes.color!==void 0&&(rt=3);let It,bt,Lt,X;if(tt){let ae=Mn[tt];It=ae.vertexShader,bt=ae.fragmentShader}else{It=_.vertexShader,bt=_.fragmentShader;let ae=o.getVertexShaderStage(_),Qt=o.getFragmentShaderStage(_);o.update(_,ae,Qt),Lt=ae.id,X=Qt.id}let K=i.getRenderTarget(),dt=i.state.buffers.depth.getReversed(),Tt=L.isInstancedMesh===!0,ft=L.isBatchedMesh===!0,Dt=!!_.map,ne=!!_.matcap,Ut=!!et,Ht=!!_.aoMap,$t=!!_.lightMap,kt=!!_.bumpMap&&_.wireframe===!1,Jt=!!_.normalMap,pe=!!_.displacementMap,me=!!_.emissiveMap,jt=!!_.metalnessMap,de=!!_.roughnessMap,O=_.anisotropy>0,xe=_.clearcoat>0,j=_.dispersion>0,S=_.retroreflectivity>0,p=_.iridescence>0,N=_.sheen>0,z=_.transmission>0,H=O&&!!_.anisotropyMap,st=xe&&!!_.clearcoatMap,lt=xe&&!!_.clearcoatNormalMap,Z=xe&&!!_.clearcoatRoughnessMap,J=p&&!!_.iridescenceMap,at=p&&!!_.iridescenceThicknessMap,Mt=N&&!!_.sheenColorMap,ut=N&&!!_.sheenRoughnessMap,ht=!!_.specularMap,St=!!_.specularColorMap,Ct=!!_.specularIntensityMap,Bt=z&&!!_.transmissionMap,U=z&&!!_.thicknessMap,ct=!!_.gradientMap,Q=!!_.alphaMap,pt=_.alphaTest>0,xt=!!_.alphaHash,it=!!_.extensions,Pt=cn;_.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Pt=i.toneMapping);let At={shaderID:tt,shaderType:_.type,shaderName:_.name,vertexShader:It,fragmentShader:bt,defines:_.defines,customVertexShaderID:Lt,customFragmentShaderID:X,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:ft,batchingColor:ft&&L._colorsTexture!==null,instancing:Tt,instancingColor:Tt&&L.instanceColor!==null,instancingMorph:Tt&&L.morphTexture!==null,outputColorSpace:K===null?i.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Yt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Dt,matcap:ne,envMap:Ut,envMapMode:Ut&&et.mapping,envMapCubeUVHeight:q,aoMap:Ht,lightMap:$t,bumpMap:kt,normalMap:Jt,displacementMap:pe,emissiveMap:me,normalMapObjectSpace:Jt&&_.normalMapType===Cc,normalMapTangentSpace:Jt&&_.normalMapType===wa,packedNormalMap:Jt&&_.normalMapType===wa&&sg(_.normalMap.format),metalnessMap:jt,roughnessMap:de,anisotropy:O,anisotropyMap:H,clearcoat:xe,clearcoatMap:st,clearcoatNormalMap:lt,clearcoatRoughnessMap:Z,dispersion:j,retroreflection:S,iridescence:p,iridescenceMap:J,iridescenceThicknessMap:at,sheen:N,sheenColorMap:Mt,sheenRoughnessMap:ut,specularMap:ht,specularColorMap:St,specularIntensityMap:Ct,transmission:z,transmissionMap:Bt,thicknessMap:U,gradientMap:ct,opaque:_.transparent===!1&&_.blending===Xi&&_.alphaToCoverage===!1,alphaMap:Q,alphaTest:pt,alphaHash:xt,combine:_.combine,mapUv:Dt&&x(_.map.channel),aoMapUv:Ht&&x(_.aoMap.channel),lightMapUv:$t&&x(_.lightMap.channel),bumpMapUv:kt&&x(_.bumpMap.channel),normalMapUv:Jt&&x(_.normalMap.channel),displacementMapUv:pe&&x(_.displacementMap.channel),emissiveMapUv:me&&x(_.emissiveMap.channel),metalnessMapUv:jt&&x(_.metalnessMap.channel),roughnessMapUv:de&&x(_.roughnessMap.channel),anisotropyMapUv:H&&x(_.anisotropyMap.channel),clearcoatMapUv:st&&x(_.clearcoatMap.channel),clearcoatNormalMapUv:lt&&x(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&x(_.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&x(_.iridescenceMap.channel),iridescenceThicknessMapUv:at&&x(_.iridescenceThicknessMap.channel),sheenColorMapUv:Mt&&x(_.sheenColorMap.channel),sheenRoughnessMapUv:ut&&x(_.sheenRoughnessMap.channel),specularMapUv:ht&&x(_.specularMap.channel),specularColorMapUv:St&&x(_.specularColorMap.channel),specularIntensityMapUv:Ct&&x(_.specularIntensityMap.channel),transmissionMapUv:Bt&&x(_.transmissionMap.channel),thicknessMapUv:U&&x(_.thicknessMap.channel),alphaMapUv:Q&&x(_.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Jt||O),vertexNormals:!!k.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!k.attributes.uv&&(Dt||Q),fog:!!I,useFog:_.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||k.attributes.normal===void 0&&Jt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:dt,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ot,morphTextureStride:rt,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:D.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:Pt,decodeVideoTexture:Dt&&_.map.isVideoTexture===!0&&Yt.getTransfer(_.map.colorSpace)===ee,decodeVideoTextureEmissive:me&&_.emissiveMap.isVideoTexture===!0&&Yt.getTransfer(_.emissiveMap.colorSpace)===ee,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===we,flipSided:_.side===ze,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:it&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(it&&_.extensions.multiDraw===!0||ft)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return At.vertexUv1s=c.has(1),At.vertexUv2s=c.has(2),At.vertexUv3s=c.has(3),c.clear(),At}function f(_){let A=[];if(_.shaderID?A.push(_.shaderID):(A.push(_.customVertexShaderID),A.push(_.customFragmentShaderID)),_.defines!==void 0)for(let R in _.defines)A.push(R),A.push(_.defines[R]);return _.isRawShaderMaterial===!1&&(h(A,_),M(A,_),A.push(i.outputColorSpace)),A.push(_.customProgramCacheKey),A.join()}function h(_,A){_.push(A.precision),_.push(A.outputColorSpace),_.push(A.envMapMode),_.push(A.envMapCubeUVHeight),_.push(A.mapUv),_.push(A.alphaMapUv),_.push(A.lightMapUv),_.push(A.aoMapUv),_.push(A.bumpMapUv),_.push(A.normalMapUv),_.push(A.displacementMapUv),_.push(A.emissiveMapUv),_.push(A.metalnessMapUv),_.push(A.roughnessMapUv),_.push(A.anisotropyMapUv),_.push(A.clearcoatMapUv),_.push(A.clearcoatNormalMapUv),_.push(A.clearcoatRoughnessMapUv),_.push(A.iridescenceMapUv),_.push(A.iridescenceThicknessMapUv),_.push(A.sheenColorMapUv),_.push(A.sheenRoughnessMapUv),_.push(A.specularMapUv),_.push(A.specularColorMapUv),_.push(A.specularIntensityMapUv),_.push(A.transmissionMapUv),_.push(A.thicknessMapUv),_.push(A.combine),_.push(A.fogExp2),_.push(A.sizeAttenuation),_.push(A.morphTargetsCount),_.push(A.morphAttributeCount),_.push(A.numSunLights),_.push(A.numDirLights),_.push(A.numPointLights),_.push(A.numSpotLights),_.push(A.numSpotLightMaps),_.push(A.numHemiLights),_.push(A.numRectAreaLights),_.push(A.numSunLightShadows),_.push(A.numDirLightShadows),_.push(A.numPointLightShadows),_.push(A.numSpotLightShadows),_.push(A.numSpotLightShadowsWithMaps),_.push(A.numLightProbes),_.push(A.shadowMapType),_.push(A.toneMapping),_.push(A.numClippingPlanes),_.push(A.numClipIntersection),_.push(A.depthPacking)}function M(_,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.retroreflection&&a.enable(24),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function b(_){let A=g[_.type],R;if(A){let P=Mn[A];R=Gc.clone(P.uniforms)}else R=_.uniforms;return R}function y(_,A){let R=d.get(A);return R!==void 0?++R.usedTimes:(R=new ng(i,A,_,s),l.push(R),d.set(A,R)),R}function T(_){if(--_.usedTimes===0){let A=l.indexOf(_);l[A]=l[l.length-1],l.pop(),d.delete(_.cacheKey),_.destroy()}}function w(_){o.remove(_)}function C(){o.dispose()}return{getParameters:E,getProgramCacheKey:f,getUniforms:b,acquireProgram:y,releaseProgram:T,releaseShaderCache:w,programs:l,dispose:C}}function ag(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function og(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function lh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function ch(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u){let g=0;return u.isInstancedMesh&&(g+=2),u.isSkinnedMesh&&(g+=1),g}function o(u,g,x,E,f,h){let M=i[t];return M===void 0?(M={id:u.id,object:u,geometry:g,material:x,materialVariant:a(u),groupOrder:E,renderOrder:u.renderOrder,z:f,group:h},i[t]=M):(M.id=u.id,M.object=u,M.geometry=g,M.material=x,M.materialVariant=a(u),M.groupOrder=E,M.renderOrder=u.renderOrder,M.z=f,M.group=h),t++,M}function c(u,g,x,E,f,h,M){M.reversedDepth===!0&&(f=-f);let b=o(u,g,x,E,f,h);x.transmission>0?n.push(b):x.transparent===!0?s.push(b):e.push(b)}function l(u,g,x,E,f,h){let M=o(u,g,x,E,f,h);x.transmission>0?n.unshift(M):x.transparent===!0?s.unshift(M):e.unshift(M)}function d(u,g){e.length>1&&e.sort(u||og),n.length>1&&n.sort(g||lh),s.length>1&&s.sort(g||lh)}function m(){for(let u=t,g=i.length;u<g;u++){let x=i[u];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:m,sort:d}}function lg(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new ch,i.set(n,[a])):s>=r.length?(a=new ch,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function cg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new B,color:new qt};break;case"SpotLight":e={position:new B,direction:new B,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new B,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new B,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new B,halfWidth:new B,halfHeight:new B};break}return i[t.id]=e,e}}}function hg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var ug=0;function dg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function fg(i){let t=new cg,e=hg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new B);let s=new B,r=new ue,a=new ue;function o(l){let d=0,m=0,u=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let g=0,x=0,E=0,f=0,h=0,M=0,b=0,y=0,T=0,w=0,C=0,_=0,A=0,R=0;l.sort(dg);for(let L=0,D=l.length;L<D;L++){let I=l[L],k=I.color,Y=I.intensity,$=I.distance,et=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===ri?et=I.shadow.map.texture:et=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)d+=k.r*Y,m+=k.g*Y,u+=k.b*Y;else if(I.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(I.sh.coefficients[q],Y);R++}else if(I.isSunLight){let q=t.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let tt=I.shadow,nt=e.get(I);nt.shadowIntensity=tt.intensity,nt.shadowBias=tt.bias,nt.shadowNormalBias=tt.normalBias,nt.shadowRadius=tt.radius,nt.shadowMapSize.copy(tt.mapSize).multiply(tt.getFrameExtents()),n.sunShadow[x]=nt,n.sunShadowMap[x]=et;let ot=tt.getViewportCount();for(let rt=0;rt<ot;rt++)n.sunShadowMatrix[E+rt]=tt.getMatrix(rt),n.sunShadowCascade[E+rt]=tt._cascadeData[rt];E+=ot,x++}n.sun[g]=q,g++}else if(I.isDirectionalLight){let q=t.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let tt=I.shadow,nt=e.get(I);nt.shadowIntensity=tt.intensity,nt.shadowBias=tt.bias,nt.shadowNormalBias=tt.normalBias,nt.shadowRadius=tt.radius,nt.shadowMapSize=tt.mapSize,n.directionalShadow[f]=nt,n.directionalShadowMap[f]=et,n.directionalShadowMatrix[f]=I.shadow.matrix,T++}n.directional[f]=q,f++}else if(I.isSpotLight){let q=t.get(I);q.position.setFromMatrixPosition(I.matrixWorld),q.color.copy(k).multiplyScalar(Y),q.distance=$,q.coneCos=Math.cos(I.angle),q.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),q.decay=I.decay,n.spot[M]=q;let tt=I.shadow;if(I.map&&(n.spotLightMap[_]=I.map,_++,tt.updateMatrices(I),I.castShadow&&A++),n.spotLightMatrix[M]=tt.matrix,I.castShadow){let nt=e.get(I);nt.shadowIntensity=tt.intensity,nt.shadowBias=tt.bias,nt.shadowNormalBias=tt.normalBias,nt.shadowRadius=tt.radius,nt.shadowMapSize=tt.mapSize,n.spotShadow[M]=nt,n.spotShadowMap[M]=et,C++}M++}else if(I.isRectAreaLight){let q=t.get(I);q.color.copy(k).multiplyScalar(Y),q.halfWidth.set(I.width*.5,0,0),q.halfHeight.set(0,I.height*.5,0),n.rectArea[b]=q,b++}else if(I.isPointLight){let q=t.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),q.distance=I.distance,q.decay=I.decay,I.castShadow){let tt=I.shadow,nt=e.get(I);nt.shadowIntensity=tt.intensity,nt.shadowBias=tt.bias,nt.shadowNormalBias=tt.normalBias,nt.shadowRadius=tt.radius,nt.shadowMapSize=tt.mapSize,nt.shadowCameraNear=tt.camera.near,nt.shadowCameraFar=tt.camera.far,n.pointShadow[h]=nt,n.pointShadowMap[h]=et,n.pointShadowMatrix[h]=I.shadow.matrix,w++}n.point[h]=q,h++}else if(I.isHemisphereLight){let q=t.get(I);q.skyColor.copy(I.color).multiplyScalar(Y),q.groundColor.copy(I.groundColor).multiplyScalar(Y),n.hemi[y]=q,y++}}b>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=mt.LTC_FLOAT_1,n.rectAreaLTC2=mt.LTC_FLOAT_2):(n.rectAreaLTC1=mt.LTC_HALF_1,n.rectAreaLTC2=mt.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=m,n.ambient[2]=u;let P=n.hash;(P.sunLength!==g||P.directionalLength!==f||P.pointLength!==h||P.spotLength!==M||P.rectAreaLength!==b||P.hemiLength!==y||P.numSunShadows!==x||P.numDirectionalShadows!==T||P.numPointShadows!==w||P.numSpotShadows!==C||P.numSpotMaps!==_||P.numLightProbes!==R)&&(n.sun.length=g,n.directional.length=f,n.spot.length=M,n.rectArea.length=b,n.point.length=h,n.hemi.length=y,n.sunShadow.length=x,n.sunShadowMap.length=x,n.sunShadowMatrix.length=E,n.sunShadowCascade.length=E,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=C,n.spotShadowMap.length=C,n.spotLightMatrix.length=C+_-A,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,P.sunLength=g,P.directionalLength=f,P.pointLength=h,P.spotLength=M,P.rectAreaLength=b,P.hemiLength=y,P.numSunShadows=x,P.numDirectionalShadows=T,P.numPointShadows=w,P.numSpotShadows=C,P.numSpotMaps=_,P.numLightProbes=R,n.version=ug++)}function c(l,d){let m=0,u=0,g=0,x=0,E=0,f=0,h=d.matrixWorldInverse;for(let M=0,b=l.length;M<b;M++){let y=l[M];if(y.isSunLight){let T=n.sun[m];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(h),m++}else if(y.isDirectionalLight){let T=n.directional[u];T.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(h),u++}else if(y.isSpotLight){let T=n.spot[x];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(h),T.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(h),x++}else if(y.isRectAreaLight){let T=n.rectArea[E];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(h),a.identity(),r.copy(y.matrixWorld),r.premultiply(h),a.extractRotation(r),T.halfWidth.set(y.width*.5,0,0),T.halfHeight.set(0,y.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),E++}else if(y.isPointLight){let T=n.point[g];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(h),g++}else if(y.isHemisphereLight){let T=n.hemi[f];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(h),f++}}}return{setup:o,setupView:c,state:n}}function hh(i){let t=new fg(i),e=[],n=[],s=[];function r(u){m.camera=u,e.length=0,n.length=0,s.length=0}function a(u){e.push(u)}function o(u){n.push(u)}function c(u){s.push(u)}function l(){t.setup(e)}function d(u){t.setupView(e,u)}let m={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:m,setupLights:l,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function pg(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new hh(i),t.set(s,[o])):r>=a.length?(o=new hh(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var mg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gg=`uniform sampler2D shadow_pass;
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
}`,_g=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],xg=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],uh=new ue,Fs=new B,al=new B;function yg(i,t,e){let n=new Vi,s=new Ot,r=new Ot,a=new he,o=new br,c=new Tr,l={},d=e.maxTextureSize,m={[ei]:ze,[ze]:ei,[we]:we},u=new Ke({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ot},radius:{value:4}},vertexShader:mg,fragmentShader:gg}),g=u.clone();g.defines.HORIZONTAL_PASS=1;let x=new Ce;x.setAttribute("position",new ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let E=new Zt(x,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Es;let h=this.type;this.render=function(w,C,_){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||w.length===0)return;this.type===rc&&(Nt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Es);let A=i.getRenderTarget(),R=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),L=i.state;L.setBlending(yn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let D=h!==this.type;D&&C.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(k=>k.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,k=w.length;I<k;I++){let Y=w[I],$=Y.shadow;if($===void 0){Nt("WebGLShadowMap:",Y,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);let et=$.getFrameExtents();s.multiply(et),r.copy($.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/et.x),s.x=r.x*et.x,$.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/et.y),s.y=r.y*et.y,$.mapSize.y=r.y));let q=i.state.buffers.depth.getReversed();if($.camera._reversedDepth=q,$.map===null||D===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===Wi){if(Y.isPointLight){Nt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new Ge(s.x,s.y,{format:ri,type:dn,minFilter:Ae,magFilter:Ae,generateMipmaps:!1}),$.map.texture.name=Y.name+".shadowMap",$.map.depthTexture=new Xn(s.x,s.y,un),$.map.depthTexture.name=Y.name+".shadowMapDepth",$.map.depthTexture.format=xn,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Te,$.map.depthTexture.magFilter=Te}else Y.isPointLight?($.map=new Ia(s.x),$.map.depthTexture=new Mr(s.x,hn)):($.map=new Ge(s.x,s.y),$.map.depthTexture=new Xn(s.x,s.y,hn)),$.map.depthTexture.name=Y.name+".shadowMap",$.map.depthTexture.format=xn,this.type===Es?($.map.depthTexture.compareFunction=q?Aa:Ea,$.map.depthTexture.minFilter=Ae,$.map.depthTexture.magFilter=Ae):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Te,$.map.depthTexture.magFilter=Te);$.camera.updateProjectionMatrix()}$.map.isWebGLCubeRenderTarget!==!0&&($.map.width!==s.x||$.map.height!==s.y)&&$.map.setSize(s.x,s.y);let tt=$.map.isWebGLCubeRenderTarget?6:$.getViewportCount();Y.isPointLight!==!0&&$.updateMatrices(Y,_);for(let nt=0;nt<tt;nt++){let ot=$.getCamera(nt);if(Y.isPointLight){let rt=$.camera,It=$.matrix,bt=Y.distance||rt.far;bt!==rt.far&&(rt.far=bt,rt.updateProjectionMatrix()),Fs.setFromMatrixPosition(Y.matrixWorld),rt.position.copy(Fs),al.copy(rt.position),al.add(_g[nt]),rt.up.copy(xg[nt]),rt.lookAt(al),rt.updateMatrixWorld(),It.makeTranslation(-Fs.x,-Fs.y,-Fs.z),uh.multiplyMatrices(rt.projectionMatrix,rt.matrixWorldInverse),$._frustum.setFromProjectionMatrix(uh,rt.coordinateSystem,rt.reversedDepth)}if($.map.isWebGLCubeRenderTarget)i.setRenderTarget($.map,nt),i.clear();else{nt===0&&(i.setRenderTarget($.map),i.clear());let rt=$.getViewport(nt);a.set(r.x*rt.x,r.y*rt.y,r.x*rt.z,r.y*rt.w),L.viewport(a)}n=$.getFrustum(nt),y(C,_,ot,Y,this.type)}$.isPointLightShadow!==!0&&this.type===Wi&&M($,_),$.needsUpdate=!1}h=this.type,f.needsUpdate=!1,i.setRenderTarget(A,R,P)};function M(w,C){let _=t.update(E);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,g.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,g.needsUpdate=!0),w.mapPass===null?w.mapPass=new Ge(s.x,s.y,{format:ri,type:dn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(C,null,_,u,E,null),g.uniforms.shadow_pass.value=w.mapPass.texture,g.uniforms.resolution.value.set(w.map.width,w.map.height),g.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(C,null,_,g,E,null)}function b(w,C,_,A){let R=null,P=_.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)R=P;else if(R=_.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let L=R.uuid,D=C.uuid,I=l[L];I===void 0&&(I={},l[L]=I);let k=I[D];k===void 0&&(k=R.clone(),I[D]=k,C.addEventListener("dispose",T)),R=k}if(R.visible=C.visible,R.wireframe=C.wireframe,A===Wi?R.side=C.shadowSide!==null?C.shadowSide:C.side:R.side=C.shadowSide!==null?C.shadowSide:m[C.side],R.alphaMap=C.alphaMap,R.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,R.map=C.map,R.clipShadows=C.clipShadows,R.clippingPlanes=C.clippingPlanes,R.clipIntersection=C.clipIntersection,R.displacementMap=C.displacementMap,R.displacementScale=C.displacementScale,R.displacementBias=C.displacementBias,R.wireframeLinewidth=C.wireframeLinewidth,R.linewidth=C.linewidth,_.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let L=i.properties.get(R);L.light=_}return R}function y(w,C,_,A,R){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&R===Wi)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,w.matrixWorld);let D=t.update(w),I=w.material;if(Array.isArray(I)){let k=D.groups;for(let Y=0,$=k.length;Y<$;Y++){let et=k[Y],q=I[et.materialIndex];if(q&&q.visible){let tt=b(w,q,A,R);w.onBeforeShadow(i,w,C,_,D,tt,et),i.renderBufferDirect(_,null,D,tt,w,et),w.onAfterShadow(i,w,C,_,D,tt,et)}}}else if(I.visible){let k=b(w,I,A,R);w.onBeforeShadow(i,w,C,_,D,k,null),i.renderBufferDirect(_,null,D,k,w,null),w.onAfterShadow(i,w,C,_,D,k,null)}}let L=w.children;for(let D=0,I=L.length;D<I;D++)y(L[D],C,_,A,R)}function T(w){w.target.removeEventListener("dispose",T);for(let _ in l){let A=l[_],R=w.target.uuid;R in A&&(A[R].dispose(),delete A[R])}}}function vg(i,t){function e(){let U=!1,ct=new he,Q=null,pt=new he(0,0,0,0);return{setMask:function(xt){Q!==xt&&!U&&(i.colorMask(xt,xt,xt,xt),Q=xt)},setLocked:function(xt){U=xt},setClear:function(xt,it,Pt,At,ae){ae===!0&&(xt*=At,it*=At,Pt*=At),ct.set(xt,it,Pt,At),pt.equals(ct)===!1&&(i.clearColor(xt,it,Pt,At),pt.copy(ct))},reset:function(){U=!1,Q=null,pt.set(-1,0,0,0)}}}function n(){let U=!1,ct=!1,Q=null,pt=null,xt=null;return{setReversed:function(it){if(ct!==it){let Pt=t.get("EXT_clip_control");it?Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.ZERO_TO_ONE_EXT):Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.NEGATIVE_ONE_TO_ONE_EXT),ct=it;let At=xt;xt=null,this.setClear(At)}},getReversed:function(){return ct},setTest:function(it){it?K(i.DEPTH_TEST):dt(i.DEPTH_TEST)},setMask:function(it){Q!==it&&!U&&(i.depthMask(it),Q=it)},setFunc:function(it){if(ct&&(it=kc[it]),pt!==it){switch(it){case or:i.depthFunc(i.NEVER);break;case lr:i.depthFunc(i.ALWAYS);break;case cr:i.depthFunc(i.LESS);break;case Ni:i.depthFunc(i.LEQUAL);break;case hr:i.depthFunc(i.EQUAL);break;case ur:i.depthFunc(i.GEQUAL);break;case dr:i.depthFunc(i.GREATER);break;case fr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pt=it}},setLocked:function(it){U=it},setClear:function(it){xt!==it&&(xt=it,ct&&(it=1-it),i.clearDepth(it))},reset:function(){U=!1,Q=null,pt=null,xt=null,ct=!1}}}function s(){let U=!1,ct=null,Q=null,pt=null,xt=null,it=null,Pt=null,At=null,ae=null;return{setTest:function(Qt){U||(Qt?K(i.STENCIL_TEST):dt(i.STENCIL_TEST))},setMask:function(Qt){ct!==Qt&&!U&&(i.stencilMask(Qt),ct=Qt)},setFunc:function(Qt,nn,pn){(Q!==Qt||pt!==nn||xt!==pn)&&(i.stencilFunc(Qt,nn,pn),Q=Qt,pt=nn,xt=pn)},setOp:function(Qt,nn,pn){(it!==Qt||Pt!==nn||At!==pn)&&(i.stencilOp(Qt,nn,pn),it=Qt,Pt=nn,At=pn)},setLocked:function(Qt){U=Qt},setClear:function(Qt){ae!==Qt&&(i.clearStencil(Qt),ae=Qt)},reset:function(){U=!1,ct=null,Q=null,pt=null,xt=null,it=null,Pt=null,At=null,ae=null}}}let r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap,d={},m={},u={},g=new WeakMap,x=[],E=null,f=!1,h=null,M=null,b=null,y=null,T=null,w=null,C=null,_=new qt(0,0,0),A=0,R=!1,P=null,L=null,D=null,I=null,k=null,Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),$=!1,et=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(q)[1]),$=et>=1):q.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),$=et>=2);let tt=null,nt={},ot=i.getParameter(i.SCISSOR_BOX),rt=i.getParameter(i.VIEWPORT),It=new he().fromArray(ot),bt=new he().fromArray(rt);function Lt(U,ct,Q,pt){let xt=new Uint8Array(4),it=i.createTexture();i.bindTexture(U,it),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Pt=0;Pt<Q;Pt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ct,0,i.RGBA,1,1,pt,0,i.RGBA,i.UNSIGNED_BYTE,xt):i.texImage2D(ct+Pt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xt);return it}let X={};X[i.TEXTURE_2D]=Lt(i.TEXTURE_2D,i.TEXTURE_2D,1),X[i.TEXTURE_CUBE_MAP]=Lt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[i.TEXTURE_2D_ARRAY]=Lt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),X[i.TEXTURE_3D]=Lt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(i.DEPTH_TEST),a.setFunc(Ni),kt(!1),Jt(So),K(i.CULL_FACE),Ht(yn);function K(U){d[U]!==!0&&(i.enable(U),d[U]=!0)}function dt(U){d[U]!==!1&&(i.disable(U),d[U]=!1)}function Tt(U,ct){return u[U]!==ct?(i.bindFramebuffer(U,ct),u[U]=ct,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ct),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ct),!0):!1}function ft(U,ct){let Q=x,pt=!1;if(U){Q=g.get(ct),Q===void 0&&(Q=[],g.set(ct,Q));let xt=U.textures;if(Q.length!==xt.length||Q[0]!==i.COLOR_ATTACHMENT0){for(let it=0,Pt=xt.length;it<Pt;it++)Q[it]=i.COLOR_ATTACHMENT0+it;Q.length=xt.length,pt=!0}}else Q[0]!==i.BACK&&(Q[0]=i.BACK,pt=!0);pt&&i.drawBuffers(Q)}function Dt(U){return E!==U?(i.useProgram(U),E=U,!0):!1}let ne={[fi]:i.FUNC_ADD,[oc]:i.FUNC_SUBTRACT,[lc]:i.FUNC_REVERSE_SUBTRACT};ne[cc]=i.MIN,ne[hc]=i.MAX;let Ut={[uc]:i.ZERO,[dc]:i.ONE,[fc]:i.SRC_COLOR,[Eo]:i.SRC_ALPHA,[yc]:i.SRC_ALPHA_SATURATE,[_c]:i.DST_COLOR,[mc]:i.DST_ALPHA,[pc]:i.ONE_MINUS_SRC_COLOR,[Ao]:i.ONE_MINUS_SRC_ALPHA,[xc]:i.ONE_MINUS_DST_COLOR,[gc]:i.ONE_MINUS_DST_ALPHA,[vc]:i.CONSTANT_COLOR,[Mc]:i.ONE_MINUS_CONSTANT_COLOR,[Sc]:i.CONSTANT_ALPHA,[bc]:i.ONE_MINUS_CONSTANT_ALPHA};function Ht(U,ct,Q,pt,xt,it,Pt,At,ae,Qt){if(U===yn){f===!0&&(dt(i.BLEND),f=!1);return}if(f===!1&&(K(i.BLEND),f=!0),U!==ac){if(U!==h||Qt!==R){if((M!==fi||T!==fi)&&(i.blendEquation(i.FUNC_ADD),M=fi,T=fi),Qt)switch(U){case Xi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bo:i.blendFunc(i.ONE,i.ONE);break;case To:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case wo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ft("WebGLState: Invalid blending: ",U);break}else switch(U){case Xi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case To:Ft("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wo:Ft("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ft("WebGLState: Invalid blending: ",U);break}b=null,y=null,w=null,C=null,_.set(0,0,0),A=0,h=U,R=Qt}return}xt=xt||ct,it=it||Q,Pt=Pt||pt,(ct!==M||xt!==T)&&(i.blendEquationSeparate(ne[ct],ne[xt]),M=ct,T=xt),(Q!==b||pt!==y||it!==w||Pt!==C)&&(i.blendFuncSeparate(Ut[Q],Ut[pt],Ut[it],Ut[Pt]),b=Q,y=pt,w=it,C=Pt),(At.equals(_)===!1||ae!==A)&&(i.blendColor(At.r,At.g,At.b,ae),_.copy(At),A=ae),h=U,R=!1}function $t(U,ct){U.side===we?dt(i.CULL_FACE):K(i.CULL_FACE);let Q=U.side===ze;ct&&(Q=!Q),kt(Q),U.blending===Xi&&U.transparent===!1?Ht(yn):Ht(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);let pt=U.stencilWrite;o.setTest(pt),pt&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),me(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?K(i.SAMPLE_ALPHA_TO_COVERAGE):dt(i.SAMPLE_ALPHA_TO_COVERAGE)}function kt(U){P!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),P=U)}function Jt(U){U!==ic?(K(i.CULL_FACE),U!==L&&(U===So?i.cullFace(i.BACK):U===sc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):dt(i.CULL_FACE),L=U}function pe(U){U!==D&&($&&i.lineWidth(U),D=U)}function me(U,ct,Q){U?(K(i.POLYGON_OFFSET_FILL),(I!==ct||k!==Q)&&(I=ct,k=Q,a.getReversed()&&(ct=-ct),i.polygonOffset(ct,Q))):dt(i.POLYGON_OFFSET_FILL)}function jt(U){U?K(i.SCISSOR_TEST):dt(i.SCISSOR_TEST)}function de(U){U===void 0&&(U=i.TEXTURE0+Y-1),tt!==U&&(i.activeTexture(U),tt=U)}function O(U,ct,Q){Q===void 0&&(tt===null?Q=i.TEXTURE0+Y-1:Q=tt);let pt=nt[Q];pt===void 0&&(pt={type:void 0,texture:void 0},nt[Q]=pt),(pt.type!==U||pt.texture!==ct)&&(tt!==Q&&(i.activeTexture(Q),tt=Q),i.bindTexture(U,ct||X[U]),pt.type=U,pt.texture=ct)}function xe(){let U=nt[tt];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function j(){try{i.compressedTexImage2D(...arguments)}catch(U){Ft("WebGLState:",U)}}function S(){try{i.compressedTexImage3D(...arguments)}catch(U){Ft("WebGLState:",U)}}function p(){try{i.texSubImage2D(...arguments)}catch(U){Ft("WebGLState:",U)}}function N(){try{i.texSubImage3D(...arguments)}catch(U){Ft("WebGLState:",U)}}function z(){try{i.compressedTexSubImage2D(...arguments)}catch(U){Ft("WebGLState:",U)}}function H(){try{i.compressedTexSubImage3D(...arguments)}catch(U){Ft("WebGLState:",U)}}function st(){try{i.texStorage2D(...arguments)}catch(U){Ft("WebGLState:",U)}}function lt(){try{i.texStorage3D(...arguments)}catch(U){Ft("WebGLState:",U)}}function Z(){try{i.texImage2D(...arguments)}catch(U){Ft("WebGLState:",U)}}function J(){try{i.texImage3D(...arguments)}catch(U){Ft("WebGLState:",U)}}function at(U){return m[U]!==void 0?m[U]:i.getParameter(U)}function Mt(U,ct){m[U]!==ct&&(i.pixelStorei(U,ct),m[U]=ct)}function ut(U){It.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),It.copy(U))}function ht(U){bt.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),bt.copy(U))}function St(U,ct){let Q=l.get(ct);Q===void 0&&(Q=new WeakMap,l.set(ct,Q));let pt=Q.get(U);pt===void 0&&(pt=i.getUniformBlockIndex(ct,U.name),Q.set(U,pt))}function Ct(U,ct){let pt=l.get(ct).get(U);c.get(ct)!==pt&&(i.uniformBlockBinding(ct,pt,U.__bindingPointIndex),c.set(ct,pt))}function Bt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},m={},tt=null,nt={},u={},g=new WeakMap,x=[],E=null,f=!1,h=null,M=null,b=null,y=null,T=null,w=null,C=null,_=new qt(0,0,0),A=0,R=!1,P=null,L=null,D=null,I=null,k=null,It.set(0,0,i.canvas.width,i.canvas.height),bt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:K,disable:dt,bindFramebuffer:Tt,drawBuffers:ft,useProgram:Dt,setBlending:Ht,setMaterial:$t,setFlipSided:kt,setCullFace:Jt,setLineWidth:pe,setPolygonOffset:me,setScissorTest:jt,activeTexture:de,bindTexture:O,unbindTexture:xe,compressedTexImage2D:j,compressedTexImage3D:S,texImage2D:Z,texImage3D:J,pixelStorei:Mt,getParameter:at,updateUBOMapping:St,uniformBlockBinding:Ct,texStorage2D:st,texStorage3D:lt,texSubImage2D:p,texSubImage3D:N,compressedTexSubImage2D:z,compressedTexSubImage3D:H,scissor:ut,viewport:ht,reset:Bt}}function Mg(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ot,d=new WeakMap,m=new Set,u,g=new WeakMap,x=!1;try{x=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(S,p){return x?new OffscreenCanvas(S,p):ds("canvas")}function f(S,p,N){let z=1,H=j(S);if((H.width>N||H.height>N)&&(z=N/Math.max(H.width,H.height)),z<1)if(typeof HTMLImageElement!="undefined"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&S instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&S instanceof ImageBitmap||typeof VideoFrame!="undefined"&&S instanceof VideoFrame){let st=Math.floor(z*H.width),lt=Math.floor(z*H.height);u===void 0&&(u=E(st,lt));let Z=p?E(st,lt):u;return Z.width=st,Z.height=lt,Z.getContext("2d").drawImage(S,0,0,st,lt),Nt("WebGLRenderer: Texture has been resized from ("+H.width+"x"+H.height+") to ("+st+"x"+lt+")."),Z}else return"data"in S&&Nt("WebGLRenderer: Image in DataTexture is too big ("+H.width+"x"+H.height+")."),S;return S}function h(S){return S.generateMipmaps}function M(S){i.generateMipmap(S)}function b(S){return S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?i.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(S,p,N,z,H,st=!1){if(S!==null){if(i[S]!==void 0)return i[S];Nt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let lt;z&&(lt=t.get("EXT_texture_norm16"),lt||Nt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=p;if(p===i.RED&&(N===i.FLOAT&&(Z=i.R32F),N===i.HALF_FLOAT&&(Z=i.R16F),N===i.UNSIGNED_BYTE&&(Z=i.R8),N===i.UNSIGNED_SHORT&&lt&&(Z=lt.R16_EXT),N===i.SHORT&&lt&&(Z=lt.R16_SNORM_EXT)),p===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(Z=i.R8UI),N===i.UNSIGNED_SHORT&&(Z=i.R16UI),N===i.UNSIGNED_INT&&(Z=i.R32UI),N===i.BYTE&&(Z=i.R8I),N===i.SHORT&&(Z=i.R16I),N===i.INT&&(Z=i.R32I)),p===i.RG&&(N===i.FLOAT&&(Z=i.RG32F),N===i.HALF_FLOAT&&(Z=i.RG16F),N===i.UNSIGNED_BYTE&&(Z=i.RG8),N===i.UNSIGNED_SHORT&&lt&&(Z=lt.RG16_EXT),N===i.SHORT&&lt&&(Z=lt.RG16_SNORM_EXT)),p===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(Z=i.RG8UI),N===i.UNSIGNED_SHORT&&(Z=i.RG16UI),N===i.UNSIGNED_INT&&(Z=i.RG32UI),N===i.BYTE&&(Z=i.RG8I),N===i.SHORT&&(Z=i.RG16I),N===i.INT&&(Z=i.RG32I)),p===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),N===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),N===i.UNSIGNED_INT&&(Z=i.RGB32UI),N===i.BYTE&&(Z=i.RGB8I),N===i.SHORT&&(Z=i.RGB16I),N===i.INT&&(Z=i.RGB32I)),p===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),N===i.UNSIGNED_INT&&(Z=i.RGBA32UI),N===i.BYTE&&(Z=i.RGBA8I),N===i.SHORT&&(Z=i.RGBA16I),N===i.INT&&(Z=i.RGBA32I)),p===i.RGB&&(N===i.UNSIGNED_SHORT&&lt&&(Z=lt.RGB16_EXT),N===i.SHORT&&lt&&(Z=lt.RGB16_SNORM_EXT),N===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),N===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),p===i.RGBA){let J=st?us:Yt.getTransfer(H);N===i.FLOAT&&(Z=i.RGBA32F),N===i.HALF_FLOAT&&(Z=i.RGBA16F),N===i.UNSIGNED_BYTE&&(Z=J===ee?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT&&lt&&(Z=lt.RGBA16_EXT),N===i.SHORT&&lt&&(Z=lt.RGBA16_SNORM_EXT),N===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function T(S,p){let N;return S?p===null||p===hn||p===Yi?N=i.DEPTH24_STENCIL8:p===un?N=i.DEPTH32F_STENCIL8:p===qi&&(N=i.DEPTH24_STENCIL8,Nt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):p===null||p===hn||p===Yi?N=i.DEPTH_COMPONENT24:p===un?N=i.DEPTH_COMPONENT32F:p===qi&&(N=i.DEPTH_COMPONENT16),N}function w(S,p){return h(S)===!0||S.isFramebufferTexture&&S.minFilter!==Te&&S.minFilter!==Ae?Math.log2(Math.max(p.width,p.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?p.mipmaps.length:1}function C(S){let p=S.target;p.removeEventListener("dispose",C),A(p),p.isVideoTexture&&d.delete(p),p.isHTMLTexture&&m.delete(p)}function _(S){let p=S.target;p.removeEventListener("dispose",_),P(p)}function A(S){let p=n.get(S);if(p.__webglInit===void 0)return;let N=S.source,z=g.get(N);if(z){let H=z[p.__cacheKey];H.usedTimes--,H.usedTimes===0&&R(S),Object.keys(z).length===0&&g.delete(N)}n.remove(S)}function R(S){let p=n.get(S);i.deleteTexture(p.__webglTexture);let N=S.source,z=g.get(N);delete z[p.__cacheKey],a.memory.textures--}function P(S){let p=n.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),n.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(p.__webglFramebuffer[z]))for(let H=0;H<p.__webglFramebuffer[z].length;H++)i.deleteFramebuffer(p.__webglFramebuffer[z][H]);else i.deleteFramebuffer(p.__webglFramebuffer[z]);p.__webglDepthbuffer&&i.deleteRenderbuffer(p.__webglDepthbuffer[z])}else{if(Array.isArray(p.__webglFramebuffer))for(let z=0;z<p.__webglFramebuffer.length;z++)i.deleteFramebuffer(p.__webglFramebuffer[z]);else i.deleteFramebuffer(p.__webglFramebuffer);if(p.__webglDepthbuffer&&i.deleteRenderbuffer(p.__webglDepthbuffer),p.__webglMultisampledFramebuffer&&i.deleteFramebuffer(p.__webglMultisampledFramebuffer),p.__webglColorRenderbuffer)for(let z=0;z<p.__webglColorRenderbuffer.length;z++)p.__webglColorRenderbuffer[z]&&i.deleteRenderbuffer(p.__webglColorRenderbuffer[z]);p.__webglDepthRenderbuffer&&i.deleteRenderbuffer(p.__webglDepthRenderbuffer)}let N=S.textures;for(let z=0,H=N.length;z<H;z++){let st=n.get(N[z]);st.__webglTexture&&(i.deleteTexture(st.__webglTexture),a.memory.textures--),n.remove(N[z])}n.remove(S)}let L=0;function D(){L=0}function I(){return L}function k(S){L=S}function Y(){let S=L;return S>=s.maxTextures&&Nt("WebGLTextures: Trying to use "+(S+1)+" texture units while this GPU supports only "+s.maxTextures),L+=1,S}function $(S){let p=[];return p.push(S.wrapS),p.push(S.wrapT),p.push(S.wrapR||0),p.push(S.magFilter),p.push(S.minFilter),p.push(S.anisotropy),p.push(S.internalFormat),p.push(S.format),p.push(S.type),p.push(S.generateMipmaps),p.push(S.premultiplyAlpha),p.push(S.flipY),p.push(S.unpackAlignment),p.push(S.colorSpace),p.join()}function et(S,p){let N=n.get(S);if(S.isVideoTexture&&O(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&N.__version!==S.version){let z=S.image;if(z===null)Nt("WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)Nt("WebGLRenderer: Texture marked for update but image is incomplete");else{dt(N,S,p);return}}else S.isExternalTexture&&(N.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+p)}function q(S,p){let N=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&N.__version!==S.version){dt(N,S,p);return}else S.isExternalTexture&&(N.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+p)}function tt(S,p){let N=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&N.__version!==S.version){dt(N,S,p);return}e.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+p)}function nt(S,p){let N=n.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&N.__version!==S.version){Tt(N,S,p);return}e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+p)}let ot={[pr]:i.REPEAT,[_n]:i.CLAMP_TO_EDGE,[mr]:i.MIRRORED_REPEAT},rt={[Te]:i.NEAREST,[Ec]:i.NEAREST_MIPMAP_NEAREST,[Cs]:i.NEAREST_MIPMAP_LINEAR,[Ae]:i.LINEAR,[Gr]:i.LINEAR_MIPMAP_NEAREST,[ii]:i.LINEAR_MIPMAP_LINEAR},It={[Pc]:i.NEVER,[Uc]:i.ALWAYS,[Ic]:i.LESS,[Ea]:i.LEQUAL,[Lc]:i.EQUAL,[Aa]:i.GEQUAL,[Dc]:i.GREATER,[Nc]:i.NOTEQUAL};function bt(S,p){if(p.type===un&&t.has("OES_texture_float_linear")===!1&&(p.magFilter===Ae||p.magFilter===Gr||p.magFilter===Cs||p.magFilter===ii||p.minFilter===Ae||p.minFilter===Gr||p.minFilter===Cs||p.minFilter===ii)&&Nt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(S,i.TEXTURE_WRAP_S,ot[p.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,ot[p.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,ot[p.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,rt[p.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,rt[p.minFilter]),p.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,It[p.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(p.magFilter===Te||p.minFilter!==Cs&&p.minFilter!==ii||p.type===un&&t.has("OES_texture_float_linear")===!1)return;if(p.anisotropy>1||n.get(p).__currentAnisotropy){let N=t.get("EXT_texture_filter_anisotropic");i.texParameterf(S,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(p.anisotropy,s.getMaxAnisotropy())),n.get(p).__currentAnisotropy=p.anisotropy}}}function Lt(S,p){let N=!1;S.__webglInit===void 0&&(S.__webglInit=!0,p.addEventListener("dispose",C));let z=p.source,H=g.get(z);H===void 0&&(H={},g.set(z,H));let st=$(p);if(st!==S.__cacheKey){H[st]===void 0&&(H[st]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),H[st].usedTimes++;let lt=H[S.__cacheKey];lt!==void 0&&(H[S.__cacheKey].usedTimes--,lt.usedTimes===0&&R(p)),S.__cacheKey=st,S.__webglTexture=H[st].texture}return N}function X(S,p,N){return Math.floor(Math.floor(S/N)/p)}function K(S,p,N,z){let st=S.updateRanges;if(st.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,p.width,p.height,N,z,p.data);else{st.sort((Mt,ut)=>Mt.start-ut.start);let lt=0;for(let Mt=1;Mt<st.length;Mt++){let ut=st[lt],ht=st[Mt],St=ut.start+ut.count,Ct=X(ht.start,p.width,4),Bt=X(ut.start,p.width,4);ht.start<=St+1&&Ct===Bt&&X(ht.start+ht.count-1,p.width,4)===Ct?ut.count=Math.max(ut.count,ht.start+ht.count-ut.start):(++lt,st[lt]=ht)}st.length=lt+1;let Z=e.getParameter(i.UNPACK_ROW_LENGTH),J=e.getParameter(i.UNPACK_SKIP_PIXELS),at=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,p.width);for(let Mt=0,ut=st.length;Mt<ut;Mt++){let ht=st[Mt],St=Math.floor(ht.start/4),Ct=Math.ceil(ht.count/4),Bt=St%p.width,U=Math.floor(St/p.width),ct=Ct,Q=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Bt),e.pixelStorei(i.UNPACK_SKIP_ROWS,U),e.texSubImage2D(i.TEXTURE_2D,0,Bt,U,ct,Q,N,z,p.data)}S.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Z),e.pixelStorei(i.UNPACK_SKIP_PIXELS,J),e.pixelStorei(i.UNPACK_SKIP_ROWS,at)}}function dt(S,p,N){let z=i.TEXTURE_2D;(p.isDataArrayTexture||p.isCompressedArrayTexture)&&(z=i.TEXTURE_2D_ARRAY),p.isData3DTexture&&(z=i.TEXTURE_3D);let H=Lt(S,p),st=p.source;e.bindTexture(z,S.__webglTexture,i.TEXTURE0+N);let lt=n.get(st);if(st.version!==lt.__version||H===!0){if(e.activeTexture(i.TEXTURE0+N),(typeof ImageBitmap!="undefined"&&p.image instanceof ImageBitmap)===!1){let Q=Yt.getPrimaries(Yt.workingColorSpace),pt=p.colorSpace===Pn?null:Yt.getPrimaries(p.colorSpace),xt=p.colorSpace===Pn||Q===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,p.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt)}e.pixelStorei(i.UNPACK_ALIGNMENT,p.unpackAlignment);let J=f(p.image,!1,s.maxTextureSize);J=xe(p,J);let at=r.convert(p.format,p.colorSpace),Mt=r.convert(p.type),ut=y(p.internalFormat,at,Mt,p.normalized,p.colorSpace,p.isVideoTexture);bt(z,p);let ht,St=p.mipmaps,Ct=p.isVideoTexture!==!0,Bt=lt.__version===void 0||H===!0,U=st.dataReady,ct=w(p,J);if(p.isDepthTexture)ut=T(p.format===si,p.type),Bt&&(Ct?e.texStorage2D(i.TEXTURE_2D,1,ut,J.width,J.height):e.texImage2D(i.TEXTURE_2D,0,ut,J.width,J.height,0,at,Mt,null));else if(p.isDataTexture)if(St.length>0){Ct&&Bt&&e.texStorage2D(i.TEXTURE_2D,ct,ut,St[0].width,St[0].height);for(let Q=0,pt=St.length;Q<pt;Q++)ht=St[Q],Ct?U&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,ht.width,ht.height,at,Mt,ht.data):e.texImage2D(i.TEXTURE_2D,Q,ut,ht.width,ht.height,0,at,Mt,ht.data);p.generateMipmaps=!1}else Ct?(Bt&&e.texStorage2D(i.TEXTURE_2D,ct,ut,J.width,J.height),U&&K(p,J,at,Mt)):e.texImage2D(i.TEXTURE_2D,0,ut,J.width,J.height,0,at,Mt,J.data);else if(p.isCompressedTexture)if(p.isCompressedArrayTexture){Ct&&Bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ct,ut,St[0].width,St[0].height,J.depth);for(let Q=0,pt=St.length;Q<pt;Q++)if(ht=St[Q],p.format!==en)if(at!==null)if(Ct){if(U)if(p.layerUpdates.size>0){let xt=$o(ht.width,ht.height,p.format,p.type);for(let it of p.layerUpdates){let Pt=ht.data.subarray(it*xt/ht.data.BYTES_PER_ELEMENT,(it+1)*xt/ht.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,it,ht.width,ht.height,1,at,Pt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,ht.width,ht.height,J.depth,at,ht.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,ut,ht.width,ht.height,J.depth,0,ht.data,0,0);else Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ct?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,ht.width,ht.height,J.depth,at,Mt,ht.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Q,ut,ht.width,ht.height,J.depth,0,at,Mt,ht.data);p.layerUpdates.size>0&&p.clearLayerUpdates()}else{Ct&&Bt&&e.texStorage2D(i.TEXTURE_2D,ct,ut,St[0].width,St[0].height);for(let Q=0,pt=St.length;Q<pt;Q++)ht=St[Q],p.format!==en?at!==null?Ct?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,ht.width,ht.height,at,ht.data):e.compressedTexImage2D(i.TEXTURE_2D,Q,ut,ht.width,ht.height,0,ht.data):Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ct?U&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,ht.width,ht.height,at,Mt,ht.data):e.texImage2D(i.TEXTURE_2D,Q,ut,ht.width,ht.height,0,at,Mt,ht.data)}else if(p.isDataArrayTexture)if(Ct){if(Bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ct,ut,J.width,J.height,J.depth),U)if(p.layerUpdates.size>0){let Q=$o(J.width,J.height,p.format,p.type);for(let pt of p.layerUpdates){let xt=J.data.subarray(pt*Q/J.data.BYTES_PER_ELEMENT,(pt+1)*Q/J.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,pt,J.width,J.height,1,at,Mt,xt)}p.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,at,Mt,J.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,ut,J.width,J.height,J.depth,0,at,Mt,J.data);else if(p.isData3DTexture)Ct?(Bt&&e.texStorage3D(i.TEXTURE_3D,ct,ut,J.width,J.height,J.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,at,Mt,J.data)):e.texImage3D(i.TEXTURE_3D,0,ut,J.width,J.height,J.depth,0,at,Mt,J.data);else if(p.isFramebufferTexture){if(Bt)if(Ct)e.texStorage2D(i.TEXTURE_2D,ct,ut,J.width,J.height);else{let Q=J.width,pt=J.height;for(let xt=0;xt<ct;xt++)e.texImage2D(i.TEXTURE_2D,xt,ut,Q,pt,0,at,Mt,null),Q>>=1,pt>>=1}}else if(p.isHTMLTexture){if("texElementImage2D"in i){let Q=i.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),J.parentNode!==Q){Q.appendChild(J),m.add(p),Q.onpaint=pt=>{let xt=pt.changedElements;for(let it of m)xt.includes(it.image)&&(it.needsUpdate=!0)},Q.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,J);else{let xt=i.RGBA,it=i.RGBA,Pt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,xt,it,Pt,J)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(St.length>0){if(Ct&&Bt){let Q=j(St[0]);e.texStorage2D(i.TEXTURE_2D,ct,ut,Q.width,Q.height)}for(let Q=0,pt=St.length;Q<pt;Q++)ht=St[Q],Ct?U&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,at,Mt,ht):e.texImage2D(i.TEXTURE_2D,Q,ut,at,Mt,ht);p.generateMipmaps=!1}else if(Ct){if(Bt){let Q=j(J);e.texStorage2D(i.TEXTURE_2D,ct,ut,Q.width,Q.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,at,Mt,J)}else e.texImage2D(i.TEXTURE_2D,0,ut,at,Mt,J);h(p)&&M(z),lt.__version=st.version,p.onUpdate&&p.onUpdate(p)}S.__version=p.version}function Tt(S,p,N){if(p.image.length!==6)return;let z=Lt(S,p),H=p.source;e.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+N);let st=n.get(H);if(H.version!==st.__version||z===!0){e.activeTexture(i.TEXTURE0+N);let lt=Yt.getPrimaries(Yt.workingColorSpace),Z=p.colorSpace===Pn?null:Yt.getPrimaries(p.colorSpace),J=p.colorSpace===Pn||lt===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,p.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,p.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);let at=p.isCompressedTexture||p.image[0].isCompressedTexture,Mt=p.image[0]&&p.image[0].isDataTexture,ut=[];for(let it=0;it<6;it++)!at&&!Mt?ut[it]=f(p.image[it],!0,s.maxCubemapSize):ut[it]=Mt?p.image[it].image:p.image[it],ut[it]=xe(p,ut[it]);let ht=ut[0],St=r.convert(p.format,p.colorSpace),Ct=r.convert(p.type),Bt=y(p.internalFormat,St,Ct,p.normalized,p.colorSpace),U=p.isVideoTexture!==!0,ct=st.__version===void 0||z===!0,Q=H.dataReady,pt=w(p,ht);bt(i.TEXTURE_CUBE_MAP,p);let xt;if(at){U&&ct&&e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,Bt,ht.width,ht.height);for(let it=0;it<6;it++){xt=ut[it].mipmaps;for(let Pt=0;Pt<xt.length;Pt++){let At=xt[Pt];p.format!==en?St!==null?U?Q&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Pt,0,0,At.width,At.height,St,At.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Pt,Bt,At.width,At.height,0,At.data):Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?Q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Pt,0,0,At.width,At.height,St,Ct,At.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Pt,Bt,At.width,At.height,0,St,Ct,At.data)}}}else{if(xt=p.mipmaps,U&&ct){xt.length>0&&pt++;let it=j(ut[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,Bt,it.width,it.height)}for(let it=0;it<6;it++)if(Mt){U?Q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,ut[it].width,ut[it].height,St,Ct,ut[it].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Bt,ut[it].width,ut[it].height,0,St,Ct,ut[it].data);for(let Pt=0;Pt<xt.length;Pt++){let ae=xt[Pt].image[it].image;U?Q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Pt+1,0,0,ae.width,ae.height,St,Ct,ae.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Pt+1,Bt,ae.width,ae.height,0,St,Ct,ae.data)}}else{U?Q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,St,Ct,ut[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Bt,St,Ct,ut[it]);for(let Pt=0;Pt<xt.length;Pt++){let At=xt[Pt];U?Q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Pt+1,0,0,St,Ct,At.image[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Pt+1,Bt,St,Ct,At.image[it])}}}h(p)&&M(i.TEXTURE_CUBE_MAP),st.__version=H.version,p.onUpdate&&p.onUpdate(p)}S.__version=p.version}function ft(S,p,N,z,H,st){let lt=r.convert(N.format,N.colorSpace),Z=r.convert(N.type),J=y(N.internalFormat,lt,Z,N.normalized,N.colorSpace),at=n.get(p),Mt=n.get(N);if(Mt.__renderTarget=p,!at.__hasExternalTextures){let ut=Math.max(1,p.width>>st),ht=Math.max(1,p.height>>st);H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?e.texImage3D(H,st,J,ut,ht,p.depth,0,lt,Z,null):e.texImage2D(H,st,J,ut,ht,0,lt,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,S),de(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,z,H,Mt.__webglTexture,0,jt(p)):(H===i.TEXTURE_2D||H>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&H<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,z,H,Mt.__webglTexture,st),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(S,p,N){if(i.bindRenderbuffer(i.RENDERBUFFER,S),p.depthBuffer){let z=p.depthTexture,H=z&&z.isDepthTexture?z.type:null,st=T(p.stencilBuffer,H),lt=p.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;de(p)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,jt(p),st,p.width,p.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,jt(p),st,p.width,p.height):i.renderbufferStorage(i.RENDERBUFFER,st,p.width,p.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,S)}else{let z=p.textures;for(let H=0;H<z.length;H++){let st=z[H],lt=r.convert(st.format,st.colorSpace),Z=r.convert(st.type),J=y(st.internalFormat,lt,Z,st.normalized,st.colorSpace);de(p)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,jt(p),J,p.width,p.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,jt(p),J,p.width,p.height):i.renderbufferStorage(i.RENDERBUFFER,J,p.width,p.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ne(S,p,N){let z=p.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,S),!(p.depthTexture&&p.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let H=n.get(p.depthTexture);if(H.__renderTarget=p,(!H.__webglTexture||p.depthTexture.image.width!==p.width||p.depthTexture.image.height!==p.height)&&(p.depthTexture.image.width=p.width,p.depthTexture.image.height=p.height,p.depthTexture.needsUpdate=!0),z){if(H.__webglInit===void 0&&(H.__webglInit=!0,p.depthTexture.addEventListener("dispose",C)),H.__webglTexture===void 0){H.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture),bt(i.TEXTURE_CUBE_MAP,p.depthTexture);let at=r.convert(p.depthTexture.format),Mt=r.convert(p.depthTexture.type),ut;p.depthTexture.format===xn?ut=i.DEPTH_COMPONENT24:p.depthTexture.format===si&&(ut=i.DEPTH24_STENCIL8);for(let ht=0;ht<6;ht++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,ut,p.width,p.height,0,at,Mt,null)}}else et(p.depthTexture,0);let st=H.__webglTexture,lt=jt(p),Z=z?i.TEXTURE_CUBE_MAP_POSITIVE_X+N:i.TEXTURE_2D,J=p.depthTexture.format===si?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(p.depthTexture.format===xn)de(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,Z,st,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,J,Z,st,0);else if(p.depthTexture.format===si)de(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,Z,st,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,J,Z,st,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ut(S){let p=n.get(S),N=S.isWebGLCubeRenderTarget===!0;if(p.__boundDepthTexture!==S.depthTexture){let z=S.depthTexture;if(p.__depthDisposeCallback&&p.__depthDisposeCallback(),z){let H=()=>{delete p.__boundDepthTexture,delete p.__depthDisposeCallback,z.removeEventListener("dispose",H)};z.addEventListener("dispose",H),p.__depthDisposeCallback=H}p.__boundDepthTexture=z}if(S.depthTexture&&!p.__autoAllocateDepthBuffer)if(N)for(let z=0;z<6;z++)ne(p.__webglFramebuffer[z],S,z);else{let z=S.texture.mipmaps;z&&z.length>0?ne(p.__webglFramebuffer[0],S,0):ne(p.__webglFramebuffer,S,0)}else if(N){p.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(e.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer[z]),p.__webglDepthbuffer[z]===void 0)p.__webglDepthbuffer[z]=i.createRenderbuffer(),Dt(p.__webglDepthbuffer[z],S,!1);else{let H=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=p.__webglDepthbuffer[z];i.bindRenderbuffer(i.RENDERBUFFER,st),i.framebufferRenderbuffer(i.FRAMEBUFFER,H,i.RENDERBUFFER,st)}}else{let z=S.texture.mipmaps;if(z&&z.length>0?e.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer),p.__webglDepthbuffer===void 0)p.__webglDepthbuffer=i.createRenderbuffer(),Dt(p.__webglDepthbuffer,S,!1);else{let H=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=p.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,st),i.framebufferRenderbuffer(i.FRAMEBUFFER,H,i.RENDERBUFFER,st)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ht(S,p,N){let z=n.get(S);p!==void 0&&ft(z.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Ut(S)}function $t(S){let p=S.texture,N=n.get(S),z=n.get(p);S.addEventListener("dispose",_);let H=S.textures,st=S.isWebGLCubeRenderTarget===!0,lt=H.length>1;if(lt||(z.__webglTexture===void 0&&(z.__webglTexture=i.createTexture()),z.__version=p.version,a.memory.textures++),st){N.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(p.mipmaps&&p.mipmaps.length>0){N.__webglFramebuffer[Z]=[];for(let J=0;J<p.mipmaps.length;J++)N.__webglFramebuffer[Z][J]=i.createFramebuffer()}else N.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(p.mipmaps&&p.mipmaps.length>0){N.__webglFramebuffer=[];for(let Z=0;Z<p.mipmaps.length;Z++)N.__webglFramebuffer[Z]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(lt)for(let Z=0,J=H.length;Z<J;Z++){let at=n.get(H[Z]);at.__webglTexture===void 0&&(at.__webglTexture=i.createTexture(),a.memory.textures++)}if(S.samples>0&&de(S)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let Z=0;Z<H.length;Z++){let J=H[Z];N.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[Z]);let at=r.convert(J.format,J.colorSpace),Mt=r.convert(J.type),ut=y(J.internalFormat,at,Mt,J.normalized,J.colorSpace,S.isXRRenderTarget===!0),ht=jt(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,ut,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,N.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),Dt(N.__webglDepthRenderbuffer,S,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(st){e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture),bt(i.TEXTURE_CUBE_MAP,p);for(let Z=0;Z<6;Z++)if(p.mipmaps&&p.mipmaps.length>0)for(let J=0;J<p.mipmaps.length;J++)ft(N.__webglFramebuffer[Z][J],S,p,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,J);else ft(N.__webglFramebuffer[Z],S,p,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);h(p)&&M(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(lt){for(let Z=0,J=H.length;Z<J;Z++){let at=H[Z],Mt=n.get(at),ut=i.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(ut=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ut,Mt.__webglTexture),bt(ut,at),ft(N.__webglFramebuffer,S,at,i.COLOR_ATTACHMENT0+Z,ut,0),h(at)&&M(ut)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(Z=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,z.__webglTexture),bt(Z,p),p.mipmaps&&p.mipmaps.length>0)for(let J=0;J<p.mipmaps.length;J++)ft(N.__webglFramebuffer[J],S,p,i.COLOR_ATTACHMENT0,Z,J);else ft(N.__webglFramebuffer,S,p,i.COLOR_ATTACHMENT0,Z,0);h(p)&&M(Z),e.unbindTexture()}S.depthBuffer&&Ut(S)}function kt(S){let p=S.textures;for(let N=0,z=p.length;N<z;N++){let H=p[N];if(h(H)){let st=b(S),lt=n.get(H).__webglTexture;e.bindTexture(st,lt),M(st),e.unbindTexture()}}}let Jt=[],pe=[];function me(S){if(S.samples>0){if(de(S)===!1){let p=S.textures,N=S.width,z=S.height,H=i.COLOR_BUFFER_BIT,st=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=n.get(S),Z=p.length>1;if(Z)for(let at=0;at<p.length;at++)e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer);let J=S.texture.mipmaps;J&&J.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let at=0;at<p.length;at++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(H|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(H|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,lt.__webglColorRenderbuffer[at]);let Mt=n.get(p[at]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Mt,0)}i.blitFramebuffer(0,0,N,z,0,0,N,z,H,i.NEAREST),c===!0&&(Jt.length=0,pe.length=0,Jt.push(i.COLOR_ATTACHMENT0+at),S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&(Jt.push(st),pe.push(st),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,pe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Jt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let at=0;at<p.length;at++){e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,lt.__webglColorRenderbuffer[at]);let Mt=n.get(p[at]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.TEXTURE_2D,Mt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&c){let p=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[p])}}}function jt(S){return Math.min(s.maxSamples,S.samples)}function de(S){let p=n.get(S);return S.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&p.__useRenderToTexture!==!1}function O(S){let p=a.render.frame;d.get(S)!==p&&(d.set(S,p),S.update())}function xe(S,p){let N=S.colorSpace,z=S.format,H=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||N!==hs&&N!==Pn&&(Yt.getTransfer(N)===ee?(z!==en||H!==He)&&Nt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ft("WebGLTextures: Unsupported texture color space:",N)),p}function j(S){return typeof HTMLImageElement!="undefined"&&S instanceof HTMLImageElement?(l.width=S.naturalWidth||S.width,l.height=S.naturalHeight||S.height):typeof VideoFrame!="undefined"&&S instanceof VideoFrame?(l.width=S.displayWidth,l.height=S.displayHeight):(l.width=S.width,l.height=S.height),l}this.allocateTextureUnit=Y,this.resetTextureUnits=D,this.getTextureUnits=I,this.setTextureUnits=k,this.setTexture2D=et,this.setTexture2DArray=q,this.setTexture3D=tt,this.setTextureCube=nt,this.rebindTextures=Ht,this.setupRenderTarget=$t,this.updateRenderTargetMipmap=kt,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=Ut,this.setupFrameBufferTexture=ft,this.useMultisampledRTT=de,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Sg(i,t){function e(n,s=Pn){let r,a=Yt.getTransfer(s);if(n===He)return i.UNSIGNED_BYTE;if(n===Wr)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Xr)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Bo)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===zo)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Fo)return i.BYTE;if(n===Oo)return i.SHORT;if(n===qi)return i.UNSIGNED_SHORT;if(n===Hr)return i.INT;if(n===hn)return i.UNSIGNED_INT;if(n===un)return i.FLOAT;if(n===dn)return i.HALF_FLOAT;if(n===ko)return i.ALPHA;if(n===Vo)return i.RGB;if(n===en)return i.RGBA;if(n===xn)return i.DEPTH_COMPONENT;if(n===si)return i.DEPTH_STENCIL;if(n===Go)return i.RED;if(n===qr)return i.RED_INTEGER;if(n===ri)return i.RG;if(n===Yr)return i.RG_INTEGER;if(n===Zr)return i.RGBA_INTEGER;if(n===Rs||n===Ps||n===Is||n===Ls)if(a===ee)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Rs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ps)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Is)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ls)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Rs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ps)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Is)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ls)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$r||n===Jr||n===Kr||n===jr)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===$r)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Jr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Kr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===jr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Qr||n===ta||n===ea||n===na||n===ia||n===Ds||n===sa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Qr||n===ta)return a===ee?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ea)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===na)return r.COMPRESSED_R11_EAC;if(n===ia)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ds)return r.COMPRESSED_RG11_EAC;if(n===sa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ra||n===aa||n===oa||n===la||n===ca||n===ha||n===ua||n===da||n===fa||n===pa||n===ma||n===ga||n===_a||n===xa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ra)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===aa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===oa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===la)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ca)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ha)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ua)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===da)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===fa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===pa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ma)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ga)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_a)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ya||n===va||n===Ma)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ya)return a===ee?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===va)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ma)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Sa||n===ba||n===Ns||n===Ta)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Sa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ba)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ns)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ta)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Yi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var bg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Tg=`
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

}`,pl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new ys(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Ke({vertexShader:bg,fragmentShader:Tg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Zt(new Zn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ml=class extends ln{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,d=null,m=null,u=null,g=null,x=null,E=typeof XRWebGLBinding!="undefined",f=new pl,h={},M=e.getContextAttributes(),b=null,y=null,T=[],w=[],C=new Ot,_=null,A=null,R=new Le;R.viewport=new he;let P=new Le;P.viewport=new he;let L=[R,P],D=new Or,I=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let K=T[X];return K===void 0&&(K=new zi,T[X]=K),K.getTargetRaySpace()},this.getControllerGrip=function(X){let K=T[X];return K===void 0&&(K=new zi,T[X]=K),K.getGripSpace()},this.getHand=function(X){let K=T[X];return K===void 0&&(K=new zi,T[X]=K),K.getHandSpace()};function Y(X){let K=w.indexOf(X.inputSource);if(K===-1)return;let dt=T[K];dt!==void 0&&(dt.update(X.inputSource,X.frame,l||a),dt.dispatchEvent({type:X.type,data:X.inputSource}))}function $(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",et);for(let X=0;X<T.length;X++){let K=w[X];K!==null&&(w[X]=null,T[X].disconnect(K))}I=null,k=null,f.reset();for(let X in h)delete h[X];if(t.setRenderTarget(b),g=null,u=null,m=null,s=null,y=null,Lt.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(C.width,C.height,!1),A!==null){let X=A.camera;X.fov=A.fov,X.zoom=A.zoom,X.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&Nt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&Nt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return u!==null?u:g},this.getBinding=function(){return m===null&&E&&(m=new XRWebGLBinding(s,e)),m},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",$),s.addEventListener("inputsourceschange",et),M.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(C),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let dt=null,Tt=null,ft=null;M.depth&&(ft=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,dt=M.stencil?si:xn,Tt=M.stencil?Yi:hn);let Dt={colorFormat:e.RGBA8,depthFormat:ft,scaleFactor:r};m=this.getBinding(),u=m.createProjectionLayer(Dt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new Ge(u.textureWidth,u.textureHeight,{format:en,type:He,depthTexture:new Xn(u.textureWidth,u.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,dt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let dt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,e,dt),s.updateRenderState({baseLayer:g}),t.setPixelRatio(1),t.setSize(g.framebufferWidth,g.framebufferHeight,!1),y=new Ge(g.framebufferWidth,g.framebufferHeight,{format:en,type:He,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Lt.setContext(s),Lt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function et(X){for(let K=0;K<X.removed.length;K++){let dt=X.removed[K],Tt=w.indexOf(dt);Tt>=0&&(w[Tt]=null,T[Tt].disconnect(dt))}for(let K=0;K<X.added.length;K++){let dt=X.added[K],Tt=w.indexOf(dt);if(Tt===-1){for(let Dt=0;Dt<T.length;Dt++)if(Dt>=w.length){w.push(dt),Tt=Dt;break}else if(w[Dt]===null){w[Dt]=dt,Tt=Dt;break}if(Tt===-1)break}let ft=T[Tt];ft&&ft.connect(dt)}}let q=new B,tt=new B;function nt(X,K,dt){q.setFromMatrixPosition(K.matrixWorld),tt.setFromMatrixPosition(dt.matrixWorld);let Tt=q.distanceTo(tt),ft=K.projectionMatrix.elements,Dt=dt.projectionMatrix.elements,ne=ft[14]/(ft[10]-1),Ut=ft[14]/(ft[10]+1),Ht=(ft[9]+1)/ft[5],$t=(ft[9]-1)/ft[5],kt=(ft[8]-1)/ft[0],Jt=(Dt[8]+1)/Dt[0],pe=ne*kt,me=ne*Jt,jt=Tt/(-kt+Jt),de=jt*-kt;if(K.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(de),X.translateZ(jt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),ft[10]===-1)X.projectionMatrix.copy(K.projectionMatrix),X.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{let O=ne+jt,xe=Ut+jt,j=pe-de,S=me+(Tt-de),p=Ht*Ut/xe*O,N=$t*Ut/xe*O;X.projectionMatrix.makePerspective(j,S,p,N,O,xe),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ot(X,K){K===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(K.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let K=X.near,dt=X.far;f.texture!==null&&(f.depthNear>0&&(K=f.depthNear),f.depthFar>0&&(dt=f.depthFar)),D.near=P.near=R.near=K,D.far=P.far=R.far=dt,(I!==D.near||k!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),I=D.near,k=D.far),D.layers.mask=X.layers.mask|6,R.layers.mask=D.layers.mask&-5,P.layers.mask=D.layers.mask&-3;let Tt=X.parent,ft=D.cameras;ot(D,Tt);for(let Dt=0;Dt<ft.length;Dt++)ot(ft[Dt],Tt);ft.length===2?nt(D,R,P):D.projectionMatrix.copy(R.projectionMatrix),A===null&&X.isPerspectiveCamera&&(A={camera:X,fov:X.fov,zoom:X.zoom}),rt(X,D,Tt)};function rt(X,K,dt){dt===null?X.matrix.copy(K.matrixWorld):(X.matrix.copy(dt.matrixWorld),X.matrix.invert(),X.matrix.multiply(K.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(K.projectionMatrix),X.projectionMatrixInverse.copy(K.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Oi*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(u===null&&g===null))return c},this.setFoveation=function(X){c=X,u!==null&&(u.fixedFoveation=X),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=X)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(D)},this.getCameraTexture=function(X){return h[X]};let It=null;function bt(X,K){if(d=K.getViewerPose(l||a),x=K,d!==null){let dt=d.views;g!==null&&(t.setRenderTargetFramebuffer(y,g.framebuffer),t.setRenderTarget(y));let Tt=!1;dt.length!==D.cameras.length&&(D.cameras.length=0,Tt=!0);for(let Ut=0;Ut<dt.length;Ut++){let Ht=dt[Ut],$t=null;if(g!==null)$t=g.getViewport(Ht);else{let Jt=m.getViewSubImage(u,Ht);$t=Jt.viewport,Ut===0&&(t.setRenderTargetTextures(y,Jt.colorTexture,Jt.depthStencilTexture),t.setRenderTarget(y))}let kt=L[Ut];kt===void 0&&(kt=new Le,kt.layers.enable(Ut),kt.viewport=new he,L[Ut]=kt),kt.matrix.fromArray(Ht.transform.matrix),kt.matrix.decompose(kt.position,kt.quaternion,kt.scale),kt.projectionMatrix.fromArray(Ht.projectionMatrix),kt.projectionMatrixInverse.copy(kt.projectionMatrix).invert(),kt.viewport.set($t.x,$t.y,$t.width,$t.height),Ut===0&&(D.matrix.copy(kt.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Tt===!0&&D.cameras.push(kt)}let ft=s.enabledFeatures;if(ft&&ft.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&E){m=n.getBinding();let Ut=m.getDepthInformation(dt[0]);Ut&&Ut.isValid&&Ut.texture&&f.init(Ut,s.renderState)}if(ft&&ft.includes("camera-access")&&E){t.state.unbindTexture(),m=n.getBinding();for(let Ut=0;Ut<dt.length;Ut++){let Ht=dt[Ut].camera;if(Ht){let $t=h[Ht];$t||($t=new ys,h[Ht]=$t);let kt=m.getCameraImage(Ht);$t.sourceTexture=kt}}}}for(let dt=0;dt<T.length;dt++){let Tt=w[dt],ft=T[dt];Tt!==null&&ft!==void 0&&ft.update(Tt,K,l||a)}It&&It(X,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),x=null}let Lt=new dh;Lt.setAnimationLoop(bt),this.setAnimationLoop=function(X){It=X},this.dispose=function(){}}},wg=new ue,xh=new zt;xh.set(-1,0,0,0,1,0,0,0,1);function Eg(i,t){function e(f,h){f.matrixAutoUpdate===!0&&f.updateMatrix(),h.value.copy(f.matrix)}function n(f,h){h.color.getRGB(f.fogColor.value,qo(i)),h.isFog?(f.fogNear.value=h.near,f.fogFar.value=h.far):h.isFogExp2&&(f.fogDensity.value=h.density)}function s(f,h,M,b,y){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?r(f,h):h.isMeshLambertMaterial?(r(f,h),h.envMap&&(f.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(r(f,h),m(f,h)):h.isMeshPhongMaterial?(r(f,h),d(f,h),h.envMap&&(f.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(r(f,h),u(f,h),h.isMeshPhysicalMaterial&&g(f,h,y)):h.isMeshMatcapMaterial?(r(f,h),x(f,h)):h.isMeshDepthMaterial?r(f,h):h.isMeshDistanceMaterial?(r(f,h),E(f,h)):h.isMeshNormalMaterial?r(f,h):h.isLineBasicMaterial?(a(f,h),h.isLineDashedMaterial&&o(f,h)):h.isPointsMaterial?c(f,h,M,b):h.isSpriteMaterial?l(f,h):h.isShadowMaterial?(f.color.value.copy(h.color),f.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(f,h){f.opacity.value=h.opacity,h.color&&f.diffuse.value.copy(h.color),h.emissive&&f.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(f.map.value=h.map,e(h.map,f.mapTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,e(h.alphaMap,f.alphaMapTransform)),h.bumpMap&&(f.bumpMap.value=h.bumpMap,e(h.bumpMap,f.bumpMapTransform),f.bumpScale.value=h.bumpScale,h.side===ze&&(f.bumpScale.value*=-1)),h.normalMap&&(f.normalMap.value=h.normalMap,e(h.normalMap,f.normalMapTransform),f.normalScale.value.copy(h.normalScale),h.side===ze&&f.normalScale.value.negate()),h.displacementMap&&(f.displacementMap.value=h.displacementMap,e(h.displacementMap,f.displacementMapTransform),f.displacementScale.value=h.displacementScale,f.displacementBias.value=h.displacementBias),h.emissiveMap&&(f.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,f.emissiveMapTransform)),h.specularMap&&(f.specularMap.value=h.specularMap,e(h.specularMap,f.specularMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest);let M=t.get(h),b=M.envMap,y=M.envMapRotation;b&&(f.envMap.value=b,f.envMapRotation.value.setFromMatrix4(wg.makeRotationFromEuler(y)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(xh),f.reflectivity.value=h.reflectivity,f.ior.value=h.ior,f.refractionRatio.value=h.refractionRatio),h.lightMap&&(f.lightMap.value=h.lightMap,f.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,f.lightMapTransform)),h.aoMap&&(f.aoMap.value=h.aoMap,f.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,f.aoMapTransform))}function a(f,h){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,h.map&&(f.map.value=h.map,e(h.map,f.mapTransform))}function o(f,h){f.dashSize.value=h.dashSize,f.totalSize.value=h.dashSize+h.gapSize,f.scale.value=h.scale}function c(f,h,M,b){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,f.size.value=h.size*M,f.scale.value=b*.5,h.map&&(f.map.value=h.map,e(h.map,f.uvTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,e(h.alphaMap,f.alphaMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest)}function l(f,h){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,f.rotation.value=h.rotation,h.map&&(f.map.value=h.map,e(h.map,f.mapTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,e(h.alphaMap,f.alphaMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest)}function d(f,h){f.specular.value.copy(h.specular),f.shininess.value=Math.max(h.shininess,1e-4)}function m(f,h){h.gradientMap&&(f.gradientMap.value=h.gradientMap)}function u(f,h){f.metalness.value=h.metalness,h.metalnessMap&&(f.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,f.metalnessMapTransform)),f.roughness.value=h.roughness,h.roughnessMap&&(f.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,f.roughnessMapTransform)),h.envMap&&(f.envMapIntensity.value=h.envMapIntensity)}function g(f,h,M){f.ior.value=h.ior,h.sheen>0&&(f.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),f.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(f.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,f.sheenColorMapTransform)),h.sheenRoughnessMap&&(f.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,f.sheenRoughnessMapTransform))),h.clearcoat>0&&(f.clearcoat.value=h.clearcoat,f.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(f.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,f.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(f.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===ze&&f.clearcoatNormalScale.value.negate())),h.dispersion>0&&(f.dispersion.value=h.dispersion),h.retroreflectivity>0&&(f.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(f.iridescence.value=h.iridescence,f.iridescenceIOR.value=h.iridescenceIOR,f.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(f.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,f.iridescenceMapTransform)),h.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),h.transmission>0&&(f.transmission.value=h.transmission,f.transmissionSamplerMap.value=M.texture,f.transmissionSamplerSize.value.set(M.width,M.height),h.transmissionMap&&(f.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,f.transmissionMapTransform)),f.thickness.value=h.thickness,h.thicknessMap&&(f.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=h.attenuationDistance,f.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(f.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(f.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=h.specularIntensity,f.specularColor.value.copy(h.specularColor),h.specularColorMap&&(f.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,f.specularColorMapTransform)),h.specularIntensityMap&&(f.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,f.specularIntensityMapTransform))}function x(f,h){h.matcap&&(f.matcap.value=h.matcap)}function E(f,h){let M=t.get(h).light;f.referencePosition.value.setFromMatrixPosition(M.matrixWorld),f.nearDistance.value=M.shadow.camera.near,f.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Ag(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,T){let w=T.program;n.uniformBlockBinding(y,w)}function l(y,T){let w=s[y.id];w===void 0&&(f(y),w=d(y),s[y.id]=w,y.addEventListener("dispose",M));let C=T.program;n.updateUBOMapping(y,C);let _=t.render.frame;r[y.id]!==_&&(u(y),r[y.id]=_)}function d(y){let T=m();y.__bindingPointIndex=T;let w=i.createBuffer(),C=y.__size,_=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,C,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,w),w}function m(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Ft("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let T=s[y.id],w=y.uniforms,C=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let _=0,A=w.length;_<A;_++){let R=w[_];if(Array.isArray(R))for(let P=0,L=R.length;P<L;P++)g(R[P],_,P,C);else g(R,_,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function g(y,T,w,C){if(E(y,T,w,C)===!0){let _=y.__offset,A=y.value;if(Array.isArray(A)){let R=0;for(let P=0;P<A.length;P++){let L=A[P],D=h(L);x(L,y.__data,R),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(R+=D.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(A,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,y.__data)}}function x(y,T,w){typeof y=="number"||typeof y=="boolean"?T[0]=y:y.isMatrix3?(T[0]=y.elements[0],T[1]=y.elements[1],T[2]=y.elements[2],T[3]=0,T[4]=y.elements[3],T[5]=y.elements[4],T[6]=y.elements[5],T[7]=0,T[8]=y.elements[6],T[9]=y.elements[7],T[10]=y.elements[8],T[11]=0):ArrayBuffer.isView(y)?T.set(new y.constructor(y.buffer,y.byteOffset,T.length)):y.toArray(T,w)}function E(y,T,w,C){let _=y.value,A=T+"_"+w;if(C[A]===void 0)return typeof _=="number"||typeof _=="boolean"?C[A]=_:ArrayBuffer.isView(_)?C[A]=_.slice():C[A]=_.clone(),!0;{let R=C[A];if(typeof _=="number"||typeof _=="boolean"){if(R!==_)return C[A]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(R.equals(_)===!1)return R.copy(_),!0}}return!1}function f(y){let T=y.uniforms,w=0,C=16;for(let A=0,R=T.length;A<R;A++){let P=Array.isArray(T[A])?T[A]:[T[A]];for(let L=0,D=P.length;L<D;L++){let I=P[L],k=Array.isArray(I.value)?I.value:[I.value];for(let Y=0,$=k.length;Y<$;Y++){let et=k[Y],q=h(et),tt=w%C,nt=tt%q.boundary,ot=tt+nt;w+=nt,ot!==0&&C-ot<q.storage&&(w+=C-ot),I.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=w,w+=q.storage}}}let _=w%C;return _>0&&(w+=C-_),y.__size=w,y.__cache={},this}function h(y){let T={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(T.boundary=4,T.storage=4):y.isVector2?(T.boundary=8,T.storage=8):y.isVector3||y.isColor?(T.boundary=16,T.storage=12):y.isVector4?(T.boundary=16,T.storage=16):y.isMatrix3?(T.boundary=48,T.storage=48):y.isMatrix4?(T.boundary=64,T.storage=64):y.isTexture?Nt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(T.boundary=16,T.storage=y.byteLength):Nt("WebGLRenderer: Unsupported uniform value type.",y),T}function M(y){let T=y.target;T.removeEventListener("dispose",M);let w=a.indexOf(T.__bindingPointIndex);a.splice(w,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function b(){for(let y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:c,update:l,dispose:b}}var Cg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),vn=null;function Rg(){return vn===null&&(vn=new vr(Cg,16,16,ri,dn),vn.name="DFG_LUT",vn.minFilter=Ae,vn.magFilter=Ae,vn.wrapS=_n,vn.wrapT=_n,vn.generateMipmaps=!1,vn.needsUpdate=!0),vn}var La=class{constructor(t={}){let{canvas:e=Oc(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:u=!1,outputBufferType:g=He}=t;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=a;let E=g,f=new Set([Zr,Yr,qr]),h=new Set([He,hn,qi,Yi,Wr,Xr]),M=new Uint32Array(4),b=new Int32Array(4),y=new B,T=null,w=null,C=[],_=[],A=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=cn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,P=!1,L=null,D=null,I=null,k=null;this._outputColorSpace=ke;let Y=0,$=0,et=null,q=-1,tt=null,nt=new he,ot=new he,rt=null,It=new qt(0),bt=0,Lt=e.width,X=e.height,K=1,dt=null,Tt=null,ft=new he(0,0,Lt,X),Dt=new he(0,0,Lt,X),ne=!1,Ut=new Vi,Ht=!1,$t=!1,kt=new ue,Jt=new B,pe=new he,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},jt=!1;function de(){return et===null?K:1}let O=n;function xe(v,F){return e.getContext(v,F)}let j,S,p,N,z,H,st,lt,Z,J,at,Mt,ut,ht,St,Ct,Bt,U,ct,Q,pt,xt,it;try{let v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:m};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",ae,!1),e.addEventListener("webglcontextrestored",Qt,!1),e.addEventListener("webglcontextcreationerror",nn,!1),O===null){let F="webgl2";if(O=xe(F,v),O===null)throw xe(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Pt()}catch(v){throw e.removeEventListener("webglcontextlost",ae,!1),e.removeEventListener("webglcontextrestored",Qt,!1),e.removeEventListener("webglcontextcreationerror",nn,!1),Ft("WebGLRenderer: "+v.message),v}function Pt(){j=new Fp(O),j.init(),pt=new Sg(O,j),S=new Ep(O,j,t,pt),p=new vg(O,j),S.reversedDepthBuffer&&u&&p.buffers.depth.setReversed(!0),D=O.createFramebuffer(),I=O.createFramebuffer(),k=O.createFramebuffer(),N=new zp(O),z=new ag,H=new Mg(O,j,p,z,S,pt,N),st=new Up(R),lt=new ku(O),xt=new Tp(O,lt),Z=new Op(O,lt,N,xt),J=new Vp(O,Z,lt,xt,N),U=new kp(O,S,H),St=new Ap(z),at=new rg(R,st,j,S,xt,St),Mt=new Eg(R,z),ut=new lg,ht=new pg(j),Bt=new bp(R,st,p,J,x,c),Ct=new yg(R,J,S),it=new Ag(O,N,S,p),ct=new wp(O,j,N),Q=new Bp(O,j,N),N.programs=at.programs,R.capabilities=S,R.extensions=j,R.properties=z,R.renderLists=ut,R.shadowMap=Ct,R.state=p,R.info=N}E!==He&&(A=new Hp(E,e.width,e.height,o,s,r));let At=new ml(R,O);this.xr=At,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let v=j.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=j.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(v){v!==void 0&&(K=v,this.setSize(Lt,X,!1))},this.getSize=function(v){return v.set(Lt,X)},this.setSize=function(v,F,W=!0){if(At.isPresenting){Nt("WebGLRenderer: Can't change size while VR device is presenting.");return}Lt=v,X=F,e.width=Math.floor(v*K),e.height=Math.floor(F*K),W===!0&&(e.style.width=v+"px",e.style.height=F+"px"),A!==null&&A.setSize(e.width,e.height),this.setViewport(0,0,v,F)},this.getDrawingBufferSize=function(v){return v.set(Lt*K,X*K).floor()},this.setDrawingBufferSize=function(v,F,W){Lt=v,X=F,K=W,e.width=Math.floor(v*W),e.height=Math.floor(F*W),this.setViewport(0,0,v,F)},this.setEffects=function(v){if(E===He){Ft("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let F=0;F<v.length;F++)if(v[F].isOutputPass===!0){Nt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(nt)},this.getViewport=function(v){return v.copy(ft)},this.setViewport=function(v,F,W,V){v.isVector4?ft.set(v.x,v.y,v.z,v.w):ft.set(v,F,W,V),p.viewport(nt.copy(ft).multiplyScalar(K).round())},this.getScissor=function(v){return v.copy(Dt)},this.setScissor=function(v,F,W,V){v.isVector4?Dt.set(v.x,v.y,v.z,v.w):Dt.set(v,F,W,V),p.scissor(ot.copy(Dt).multiplyScalar(K).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(v){p.setScissorTest(ne=v)},this.setOpaqueSort=function(v){dt=v},this.setTransparentSort=function(v){Tt=v},this.getClearColor=function(v){return v.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor(...arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha(...arguments)},this.clear=function(v=!0,F=!0,W=!0){let V=0;if(v){let G=!1;if(et!==null){let _t=et.texture.format;G=f.has(_t)}if(G){let _t=et.texture.type,vt=h.has(_t),gt=Bt.getClearColor(),wt=Bt.getClearAlpha(),Rt=gt.r,Vt=gt.g,Xt=gt.b;vt?(M[0]=Rt,M[1]=Vt,M[2]=Xt,M[3]=wt,O.clearBufferuiv(O.COLOR,0,M)):(b[0]=Rt,b[1]=Vt,b[2]=Xt,b[3]=wt,O.clearBufferiv(O.COLOR,0,b))}else V|=O.COLOR_BUFFER_BIT}F&&(V|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(V|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&O.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),L=v},this.dispose=function(){e.removeEventListener("webglcontextlost",ae,!1),e.removeEventListener("webglcontextrestored",Qt,!1),e.removeEventListener("webglcontextcreationerror",nn,!1),Bt.dispose(),ut.dispose(),ht.dispose(),z.dispose(),st.dispose(),J.dispose(),xt.dispose(),it.dispose(),at.dispose(),At.dispose(),At.removeEventListener("sessionstart",El),At.removeEventListener("sessionend",Al),oi.stop()};function ae(v){v.preventDefault(),Wo("WebGLRenderer: Context Lost."),P=!0}function Qt(){Wo("WebGLRenderer: Context Restored."),P=!1;let v=N.autoReset,F=Ct.enabled,W=Ct.autoUpdate,V=Ct.needsUpdate,G=Ct.type;Pt(),N.autoReset=v,Ct.enabled=F,Ct.autoUpdate=W,Ct.needsUpdate=V,Ct.type=G}function nn(v){Ft("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function pn(v){let F=v.target;F.removeEventListener("dispose",pn),Uh(F)}function Uh(v){Fh(v),z.remove(v)}function Fh(v){let F=z.get(v).programs;F!==void 0&&(F.forEach(function(W){at.releaseProgram(W)}),v.isShaderMaterial&&at.releaseShaderCache(v))}this.renderBufferDirect=function(v,F,W,V,G,_t){F===null&&(F=me);let vt=G.isMesh&&G.matrixWorld.determinantAffine()<0,gt=zh(v,F,W,V,G);p.setMaterial(V,vt);let wt=W.index,Rt=1;if(V.wireframe===!0){if(wt=Z.getWireframeAttribute(W),wt===void 0)return;Rt=2}let Vt=W.drawRange,Xt=W.attributes.position,Et=Vt.start*Rt,te=(Vt.start+Vt.count)*Rt;_t!==null&&(Et=Math.max(Et,_t.start*Rt),te=Math.min(te,(_t.start+_t.count)*Rt)),wt!==null?(Et=Math.max(Et,0),te=Math.min(te,wt.count)):Xt!=null&&(Et=Math.max(Et,0),te=Math.min(te,Xt.count));let ge=te-Et;if(ge<0||ge===1/0)return;xt.setup(G,V,gt,W,wt);let le,re=ct;if(wt!==null&&(le=lt.get(wt),re=Q,re.setIndex(le)),G.isMesh)V.wireframe===!0?(p.setLineWidth(V.wireframeLinewidth*de()),re.setMode(O.LINES)):re.setMode(O.TRIANGLES);else if(G.isLine){let Re=V.linewidth;Re===void 0&&(Re=1),p.setLineWidth(Re*de()),G.isLineSegments?re.setMode(O.LINES):G.isLineLoop?re.setMode(O.LINE_LOOP):re.setMode(O.LINE_STRIP)}else G.isPoints?re.setMode(O.POINTS):G.isSprite&&re.setMode(O.TRIANGLES);if(G.isBatchedMesh)if(j.get("WEBGL_multi_draw"))re.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let Re=G._multiDrawStarts,yt=G._multiDrawCounts,Ue=G._multiDrawCount,Kt=wt?lt.get(wt).bytesPerElement:1,Qe=z.get(V).currentProgram.getUniforms();for(let mn=0;mn<Ue;mn++)Qe.setValue(O,"_gl_DrawID",mn),re.render(Re[mn]/Kt,yt[mn])}else if(G.isInstancedMesh)re.renderInstances(Et,ge,G.count);else if(W.isInstancedBufferGeometry){let Re=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,yt=Math.min(W.instanceCount,Re);re.renderInstances(Et,ge,yt)}else re.render(Et,ge)};function wl(v,F,W,V){L!==null&&v.isNodeMaterial&&L.setObject(V,v),Ht===!0&&St.setState(v,W,!1),v.transparent===!0&&v.side===we&&v.forceSinglePass===!1?(v.side=ze,v.needsUpdate=!0,zs(v,F,V),v.side=ei,v.needsUpdate=!0,zs(v,F,V),v.side=we):zs(v,F,V)}this.compile=function(v,F,W=null){W===null&&(W=v),L!==null&&L.renderStart(v,F,W),w=ht.get(W),w.init(F),_.push(w),W.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(w.pushLight(G),G.castShadow&&w.pushShadow(G))}),v!==W&&v.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(w.pushLight(G),G.castShadow&&w.pushShadow(G))}),w.setupLights(),L!==null&&L.updateLights(w.state.lightsArray),$t=this.localClippingEnabled,Ht=St.init(this.clippingPlanes,$t),Ht===!0&&St.setGlobalState(this.clippingPlanes,F),L!==null&&Ct.render(w.state.shadowsArray,W,F);let V=new Set;return v.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let _t=G.material;if(_t)if(Array.isArray(_t))for(let vt=0;vt<_t.length;vt++){let gt=_t[vt];wl(gt,W,F,G),V.add(gt)}else wl(_t,W,F,G),V.add(_t)}),w=_.pop(),L!==null&&L.renderEnd(),V},this.compileAsync=function(v,F,W=null){let V=this.compile(v,F,W);return new Promise(G=>{function _t(){if(V.forEach(function(vt){let wt=z.get(vt).currentProgram;(wt===void 0||wt.isReady())&&V.delete(vt)}),V.size===0){G(v);return}setTimeout(_t,10)}j.get("KHR_parallel_shader_compile")!==null?_t():setTimeout(_t,10)})};let Xa=null;function Oh(v){Xa&&Xa(v)}function El(){oi.stop()}function Al(){oi.start()}let oi=new dh;oi.setAnimationLoop(Oh),typeof self!="undefined"&&oi.setContext(self),this.setAnimationLoop=function(v){Xa=v,At.setAnimationLoop(v),v===null?oi.stop():oi.start()},At.addEventListener("sessionstart",El),At.addEventListener("sessionend",Al),this.render=function(v,F){if(F!==void 0&&F.isCamera!==!0){Ft("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;L!==null&&L.renderStart(v,F);let W=At.enabled===!0&&At.isPresenting===!0,V=A!==null&&(et===null||W)&&A.begin(R,et);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),At.enabled===!0&&At.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(At.cameraAutoUpdate===!0&&At.updateCamera(F),F=At.getCamera()),v.isScene===!0&&v.onBeforeRender(R,v,F,et),w=ht.get(v,_.length),w.init(F),w.state.textureUnits=H.getTextureUnits(),_.push(w),kt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Ut.setFromProjectionMatrix(kt,on,F.reversedDepth),$t=this.localClippingEnabled,Ht=St.init(this.clippingPlanes,$t),T=ut.get(v,C.length),T.init(),C.push(T),At.enabled===!0&&At.isPresenting===!0){let vt=R.xr.getDepthSensingMesh();vt!==null&&qa(vt,F,-1/0,R.sortObjects)}qa(v,F,0,R.sortObjects),T.finish(),L!==null&&L.updateLights(w.state.lightsArray),R.sortObjects===!0&&T.sort(dt,Tt),jt=At.enabled===!1||At.isPresenting===!1||At.hasDepthSensing()===!1,jt&&Bt.addToRenderList(T,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ht===!0&&St.beginShadows();let G=w.state.shadowsArray;if(Ct.render(G,v,F),Ht===!0&&St.endShadows(),(V&&A.hasRenderPass())===!1){let vt=T.opaque,gt=T.transmissive;if(w.setupLights(),F.isArrayCamera){let wt=F.cameras;if(gt.length>0)for(let Rt=0,Vt=wt.length;Rt<Vt;Rt++){let Xt=wt[Rt];Rl(vt,gt,v,Xt)}jt&&Bt.render(v);for(let Rt=0,Vt=wt.length;Rt<Vt;Rt++){let Xt=wt[Rt];Cl(T,v,Xt,Xt.viewport)}}else gt.length>0&&Rl(vt,gt,v,F),jt&&Bt.render(v),Cl(T,v,F)}et!==null&&$===0&&(H.updateMultisampleRenderTarget(et),H.updateRenderTargetMipmap(et)),V&&A.end(R),v.isScene===!0&&v.onAfterRender(R,v,F),xt.resetDefaultState(),q=-1,tt=null,_.pop(),_.length>0?(w=_[_.length-1],H.setTextureUnits(w.state.textureUnits),Ht===!0&&St.setGlobalState(R.clippingPlanes,w.state.camera)):w=null,C.pop(),C.length>0?T=C[C.length-1]:T=null,L!==null&&L.renderEnd()};function qa(v,F,W,V){if(v.visible===!1)return;if(v.layers.test(F.layers)){if(v.isGroup)W=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(F);else if(v.isLightProbeGrid)w.pushLightProbeGrid(v);else if(v.isLight)w.pushLight(v),v.castShadow&&w.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(Ut)){V&&pe.setFromMatrixPosition(v.matrixWorld).applyMatrix4(kt);let vt=J.update(v),gt=v.material;gt.visible&&T.push(v,vt,gt,W,pe.z,null,F)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||v.intersectsFrustum(Ut))){let vt=J.update(v),gt=v.material;if(V&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),pe.copy(v.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),pe.copy(vt.boundingSphere.center)),pe.applyMatrix4(v.matrixWorld).applyMatrix4(kt)),Array.isArray(gt)){let wt=vt.groups;for(let Rt=0,Vt=wt.length;Rt<Vt;Rt++){let Xt=wt[Rt],Et=gt[Xt.materialIndex];Et&&Et.visible&&T.push(v,vt,Et,W,pe.z,Xt,F)}}else gt.visible&&T.push(v,vt,gt,W,pe.z,null,F)}}let _t=v.children;for(let vt=0,gt=_t.length;vt<gt;vt++)qa(_t[vt],F,W,V)}function Cl(v,F,W,V){let{opaque:G,transmissive:_t,transparent:vt}=v;w.setupLightsView(W),Ht===!0&&St.setGlobalState(R.clippingPlanes,W),V&&p.viewport(nt.copy(V)),G.length>0&&Bs(G,F,W),_t.length>0&&Bs(_t,F,W),vt.length>0&&Bs(vt,F,W),p.buffers.depth.setTest(!0),p.buffers.depth.setMask(!0),p.buffers.color.setMask(!0),p.setPolygonOffset(!1)}function Rl(v,F,W,V){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[V.id]===void 0){let Et=j.has("EXT_color_buffer_half_float")||j.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[V.id]=new Ge(1,1,{generateMipmaps:!0,type:Et?dn:He,minFilter:ii,samples:Math.max(4,S.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Yt.workingColorSpace})}let _t=w.state.transmissionRenderTarget[V.id],vt=V.viewport||nt;_t.setSize(vt.z*R.transmissionResolutionScale,vt.w*R.transmissionResolutionScale);let gt=R.getRenderTarget(),wt=R.getActiveCubeFace(),Rt=R.getActiveMipmapLevel();R.setRenderTarget(_t),R.getClearColor(It),bt=R.getClearAlpha(),bt<1&&R.setClearColor(16777215,.5),R.clear(),jt&&Bt.render(W);let Vt=R.toneMapping;R.toneMapping=cn;let Xt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),w.setupLightsView(V),Ht===!0&&St.setGlobalState(R.clippingPlanes,V),Bs(v,W,V),H.updateMultisampleRenderTarget(_t),H.updateRenderTargetMipmap(_t),j.has("WEBGL_multisampled_render_to_texture")===!1){let Et=!1;for(let te=0,ge=F.length;te<ge;te++){let le=F[te],{object:re,geometry:Re,material:yt,group:Ue}=le;if(yt.side===we&&re.layers.test(V.layers)){let Kt=yt.side;yt.side=ze,yt.needsUpdate=!0,Pl(re,W,V,Re,yt,Ue),yt.side=Kt,yt.needsUpdate=!0,Et=!0}}Et===!0&&(H.updateMultisampleRenderTarget(_t),H.updateRenderTargetMipmap(_t))}R.setRenderTarget(gt,wt,Rt),R.setClearColor(It,bt),Xt!==void 0&&(V.viewport=Xt),R.toneMapping=Vt}function Bs(v,F,W){let V=F.isScene===!0?F.overrideMaterial:null;for(let G=0,_t=v.length;G<_t;G++){let vt=v[G],{object:gt,geometry:wt,group:Rt}=vt,Vt=vt.material;Vt.allowOverride===!0&&V!==null&&(Vt=V),gt.layers.test(W.layers)&&Pl(gt,F,W,wt,Vt,Rt)}}function Pl(v,F,W,V,G,_t){L!==null&&G.isNodeMaterial&&L.setObject(v,G),v.onBeforeRender(R,F,W,V,G,_t),v.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),G.onBeforeRender(R,F,W,V,v,_t),G.transparent===!0&&G.side===we&&G.forceSinglePass===!1?(G.side=ze,G.needsUpdate=!0,R.renderBufferDirect(W,F,V,G,v,_t),G.side=ei,G.needsUpdate=!0,R.renderBufferDirect(W,F,V,G,v,_t),G.side=we):R.renderBufferDirect(W,F,V,G,v,_t),v.onAfterRender(R,F,W,V,G,_t)}function zs(v,F,W){F.isScene!==!0&&(F=me);let V=z.get(v),G=w.state.lights,_t=w.state.shadowsArray,vt=G.state.version,gt=at.getParameters(v,G.state,_t,F,W,w.state.lightProbeGridArray),wt=at.getProgramCacheKey(gt),Rt=V.programs;V.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?F.environment:null,V.fog=F.fog;let Vt=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;V.envMap=st.get(v.envMap||V.environment,Vt),V.envMapRotation=V.environment!==null&&v.envMap===null?F.environmentRotation:v.envMapRotation,Rt===void 0&&(v.addEventListener("dispose",pn),Rt=new Map,V.programs=Rt);let Xt=Rt.get(wt);if(Xt!==void 0){if(V.currentProgram===Xt&&V.lightsStateVersion===vt)return Ll(v,gt),Xt}else gt.uniforms=at.getUniforms(v),L!==null&&v.isNodeMaterial&&L.build(v,W,gt),v.onBeforeCompile(gt,R),Xt=at.acquireProgram(gt,wt),Rt.set(wt,Xt),V.uniforms=gt.uniforms;let Et=V.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Et.clippingPlanes=St.uniform),Ll(v,gt),V.needsLights=Vh(v),V.lightsStateVersion=vt,V.needsLights&&(Et.ambientLightColor.value=G.state.ambient,Et.lightProbe.value=G.state.probe,Et.sunLights.value=G.state.sun,Et.sunLightShadows.value=G.state.sunShadow,Et.directionalLights.value=G.state.directional,Et.directionalLightShadows.value=G.state.directionalShadow,Et.spotLights.value=G.state.spot,Et.spotLightShadows.value=G.state.spotShadow,Et.rectAreaLights.value=G.state.rectArea,Et.ltc_1.value=G.state.rectAreaLTC1,Et.ltc_2.value=G.state.rectAreaLTC2,Et.pointLights.value=G.state.point,Et.pointLightShadows.value=G.state.pointShadow,Et.hemisphereLights.value=G.state.hemi,Et.sunShadowMatrix.value=G.state.sunShadowMatrix,Et.sunShadowCascade.value=G.state.sunShadowCascade,Et.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Et.spotLightMatrix.value=G.state.spotLightMatrix,Et.spotLightMap.value=G.state.spotLightMap,Et.pointShadowMatrix.value=G.state.pointShadowMatrix),V.lightProbeGrid=w.state.lightProbeGridArray.length>0,V.currentProgram=Xt,V.uniformsList=null,Xt}function Il(v){if(v.uniformsList===null){let F=v.currentProgram.getUniforms();v.uniformsList=Ki.seqWithValue(F.seq,v.uniforms)}return v.uniformsList}function Ll(v,F){let W=z.get(v);W.outputColorSpace=F.outputColorSpace,W.batching=F.batching,W.batchingColor=F.batchingColor,W.instancing=F.instancing,W.instancingColor=F.instancingColor,W.instancingMorph=F.instancingMorph,W.skinning=F.skinning,W.morphTargets=F.morphTargets,W.morphNormals=F.morphNormals,W.morphColors=F.morphColors,W.morphTargetsCount=F.morphTargetsCount,W.numClippingPlanes=F.numClippingPlanes,W.numIntersection=F.numClipIntersection,W.vertexAlphas=F.vertexAlphas,W.vertexTangents=F.vertexTangents,W.toneMapping=F.toneMapping}function Bh(v,F){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;y.setFromMatrixPosition(F.matrixWorld);for(let W=0,V=v.length;W<V;W++){let G=v[W];if(G.texture!==null&&G.boundingBox.containsPoint(y))return G}return null}function zh(v,F,W,V,G){F.isScene!==!0&&(F=me),H.resetTextureUnits();let _t=F.fog,vt=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?F.environment:null,gt=et===null?R.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Yt.workingColorSpace,wt=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Rt=st.get(V.envMap||vt,wt),Vt=V.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Xt=!!W.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Et=!!W.morphAttributes.position,te=!!W.morphAttributes.normal,ge=!!W.morphAttributes.color,le=cn;V.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(le=R.toneMapping);let re=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Re=re!==void 0?re.length:0,yt=z.get(V),Ue=w.state.lights;if(Ht===!0&&($t===!0||v!==tt)){let oe=v===tt&&V.id===q;St.setState(V,v,oe)}let Kt=!1;V.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==Ue.state.version||yt.outputColorSpace!==gt||G.isBatchedMesh&&yt.batching===!1||!G.isBatchedMesh&&yt.batching===!0||G.isBatchedMesh&&yt.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&yt.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&yt.instancing===!1||!G.isInstancedMesh&&yt.instancing===!0||G.isSkinnedMesh&&yt.skinning===!1||!G.isSkinnedMesh&&yt.skinning===!0||G.isInstancedMesh&&yt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&yt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&yt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&yt.instancingMorph===!1&&G.morphTexture!==null||yt.envMap!==Rt||V.fog===!0&&yt.fog!==_t||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==St.numPlanes||yt.numIntersection!==St.numIntersection)||yt.vertexAlphas!==Vt||yt.vertexTangents!==Xt||yt.morphTargets!==Et||yt.morphNormals!==te||yt.morphColors!==ge||yt.toneMapping!==le||yt.morphTargetsCount!==Re||!!yt.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(Kt=!0):(Kt=!0,yt.__version=V.version);let Qe=yt.currentProgram;Kt===!0&&(Qe=zs(V,F,G),L&&V.isNodeMaterial&&L.onUpdateProgram(V,Qe,yt));let mn=!1,Nn=!1,_i=!1,se=Qe.getUniforms(),fe=yt.uniforms;if(p.useProgram(Qe.program)&&(mn=!0,Nn=!0,_i=!0),V.id!==q&&(q=V.id,Nn=!0),yt.needsLights){let oe=Bh(w.state.lightProbeGridArray,G);yt.lightProbeGrid!==oe&&(yt.lightProbeGrid=oe,Nn=!0)}if(mn||tt!==v){p.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),se.setValue(O,"projectionMatrix",v.projectionMatrix),se.setValue(O,"viewMatrix",v.matrixWorldInverse);let Fn=se.map.cameraPosition;Fn!==void 0&&Fn.setValue(O,Jt.setFromMatrixPosition(v.matrixWorld)),S.logarithmicDepthBuffer&&se.setValue(O,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&se.setValue(O,"isOrthographic",v.isOrthographicCamera===!0),tt!==v&&(tt=v,Nn=!0,_i=!0)}if(yt.needsLights&&(Ue.state.sunShadowMap.length>0&&se.setValue(O,"sunShadowMap",Ue.state.sunShadowMap,H),Ue.state.directionalShadowMap.length>0&&se.setValue(O,"directionalShadowMap",Ue.state.directionalShadowMap,H),Ue.state.spotShadowMap.length>0&&se.setValue(O,"spotShadowMap",Ue.state.spotShadowMap,H),Ue.state.pointShadowMap.length>0&&se.setValue(O,"pointShadowMap",Ue.state.pointShadowMap,H)),G.isSkinnedMesh){se.setOptional(O,G,"bindMatrix"),se.setOptional(O,G,"bindMatrixInverse");let oe=G.skeleton;oe&&(oe.boneTexture===null&&oe.computeBoneTexture(),se.setValue(O,"boneTexture",oe.boneTexture,H))}G.isBatchedMesh&&(se.setOptional(O,G,"batchingTexture"),se.setValue(O,"batchingTexture",G._matricesTexture,H),se.setOptional(O,G,"batchingIdTexture"),se.setValue(O,"batchingIdTexture",G._indirectTexture,H),se.setOptional(O,G,"batchingColorTexture"),G._colorsTexture!==null&&se.setValue(O,"batchingColorTexture",G._colorsTexture,H));let Un=W.morphAttributes;if((Un.position!==void 0||Un.normal!==void 0||Un.color!==void 0)&&U.update(G,W,Qe),(Nn||yt.receiveShadow!==G.receiveShadow)&&(yt.receiveShadow=G.receiveShadow,se.setValue(O,"receiveShadow",G.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&F.environment!==null&&(fe.envMapIntensity.value=F.environmentIntensity),fe.dfgLUT!==void 0&&(fe.dfgLUT.value=Rg()),Nn){if(se.setValue(O,"toneMappingExposure",R.toneMappingExposure),yt.needsLights&&kh(fe,_i),_t&&V.fog===!0&&Mt.refreshFogUniforms(fe,_t),Mt.refreshMaterialUniforms(fe,V,K,X,w.state.transmissionRenderTarget[v.id]),yt.needsLights&&yt.lightProbeGrid){let oe=yt.lightProbeGrid;fe.probesSH.value=oe.texture,fe.probesMin.value.copy(oe.boundingBox.min),fe.probesMax.value.copy(oe.boundingBox.max),fe.probesResolution.value.copy(oe.resolution)}Ki.upload(O,Il(yt),fe,H)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Ki.upload(O,Il(yt),fe,H),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&se.setValue(O,"center",G.center),se.setValue(O,"modelViewMatrix",G.modelViewMatrix),se.setValue(O,"normalMatrix",G.normalMatrix),se.setValue(O,"modelMatrix",G.matrixWorld),V.uniformsGroups!==void 0){let oe=V.uniformsGroups;for(let Fn=0,xi=oe.length;Fn<xi;Fn++){let Nl=oe[Fn];it.update(Nl,Qe),it.bind(Nl,Qe)}}return Qe}function kh(v,F){v.ambientLightColor.needsUpdate=F,v.lightProbe.needsUpdate=F,v.sunLights.needsUpdate=F,v.sunLightShadows.needsUpdate=F,v.directionalLights.needsUpdate=F,v.directionalLightShadows.needsUpdate=F,v.pointLights.needsUpdate=F,v.pointLightShadows.needsUpdate=F,v.spotLights.needsUpdate=F,v.spotLightShadows.needsUpdate=F,v.rectAreaLights.needsUpdate=F,v.hemisphereLights.needsUpdate=F}function Vh(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return et},this.setRenderTargetTextures=function(v,F,W){let V=z.get(v);V.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),z.get(v.texture).__webglTexture=F,z.get(v.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:W,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,F){let W=z.get(v);W.__webglFramebuffer=F,W.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(v,F=0,W=0){et=v,Y=F,$=W;let V=null,G=!1,_t=!1;if(v){let gt=z.get(v);if(gt.__useDefaultFramebuffer!==void 0){p.bindFramebuffer(O.FRAMEBUFFER,gt.__webglFramebuffer),nt.copy(v.viewport),ot.copy(v.scissor),rt=v.scissorTest,p.viewport(nt),p.scissor(ot),p.setScissorTest(rt),q=-1;return}else if(gt.__webglFramebuffer===void 0)H.setupRenderTarget(v);else if(gt.__hasExternalTextures)H.rebindTextures(v,z.get(v.texture).__webglTexture,z.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let Vt=v.depthTexture;if(gt.__boundDepthTexture!==Vt){if(Vt!==null&&z.has(Vt)&&(v.width!==Vt.image.width||v.height!==Vt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");H.setupDepthRenderbuffer(v)}}let wt=v.texture;(wt.isData3DTexture||wt.isDataArrayTexture||wt.isCompressedArrayTexture)&&(_t=!0);let Rt=z.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Rt[F])?V=Rt[F][W]:V=Rt[F],G=!0):v.samples>0&&H.useMultisampledRTT(v)===!1?V=z.get(v).__webglMultisampledFramebuffer:Array.isArray(Rt)?V=Rt[W]:V=Rt,nt.copy(v.viewport),ot.copy(v.scissor),rt=v.scissorTest}else nt.copy(ft).multiplyScalar(K).floor(),ot.copy(Dt).multiplyScalar(K).floor(),rt=ne;if(W!==0&&(V=D),p.bindFramebuffer(O.FRAMEBUFFER,V)&&p.drawBuffers(v,V),p.viewport(nt),p.scissor(ot),p.setScissorTest(rt),G){let gt=z.get(v.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+F,gt.__webglTexture,W)}else if(_t){let gt=F;for(let wt=0;wt<v.textures.length;wt++){let Rt=z.get(v.textures[wt]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+wt,Rt.__webglTexture,W,gt)}}else if(v!==null&&W!==0){let gt=z.get(v.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,gt.__webglTexture,W)}q=-1};function Dl(v){let F=z.get(v);return(F.__readFormat!==v.format||F.__readType!==v.type)&&(F.__readFormat=v.format,F.__readType=v.type,F.__formatReadable=S.textureFormatReadable(v.format),F.__typeReadable=S.textureTypeReadable(v.type)),F}this.readRenderTargetPixels=function(v,F,W,V,G,_t,vt,gt=0){if(!(v&&v.isWebGLRenderTarget)){Ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=z.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&vt!==void 0&&(wt=wt[vt]),wt){p.bindFramebuffer(O.FRAMEBUFFER,wt);try{let Rt=v.textures[gt],Vt=Rt.format,Xt=Rt.type;v.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+gt);let Et=Dl(Rt);if(Et.__formatReadable===!1){Ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Et.__typeReadable===!1){Ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=v.width-V&&W>=0&&W<=v.height-G&&O.readPixels(F,W,V,G,pt.convert(Vt),pt.convert(Xt),_t)}finally{let Rt=et!==null?z.get(et).__webglFramebuffer:null;p.bindFramebuffer(O.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(v,F,W,V,G,_t,vt,gt=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=z.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&vt!==void 0&&(wt=wt[vt]),wt)if(F>=0&&F<=v.width-V&&W>=0&&W<=v.height-G){p.bindFramebuffer(O.FRAMEBUFFER,wt);let Rt=v.textures[gt],Vt=Rt.format,Xt=Rt.type;v.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+gt);let Et=Dl(Rt);if(Et.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Et.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let te=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,te),O.bufferData(O.PIXEL_PACK_BUFFER,_t.byteLength,O.STREAM_READ),O.readPixels(F,W,V,G,pt.convert(Vt),pt.convert(Xt),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let ge=et!==null?z.get(et).__webglFramebuffer:null;p.bindFramebuffer(O.FRAMEBUFFER,ge);let le=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await zc(O,le,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,te),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,_t),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(te),O.deleteSync(le),_t}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,F=null,W=0){let V=Math.pow(2,-W),G=Math.floor(v.image.width*V),_t=Math.floor(v.image.height*V),vt=F!==null?F.x:0,gt=F!==null?F.y:0;H.setTexture2D(v,0),O.copyTexSubImage2D(O.TEXTURE_2D,W,0,0,vt,gt,G,_t),p.unbindTexture()},this.copyTextureToTexture=function(v,F,W=null,V=null,G=0,_t=0){let vt,gt,wt,Rt,Vt,Xt,Et,te,ge,le=v.isCompressedTexture?v.mipmaps[_t]:v.image;if(W!==null)vt=W.max.x-W.min.x,gt=W.max.y-W.min.y,wt=W.isBox3?W.max.z-W.min.z:1,Rt=W.min.x,Vt=W.min.y,Xt=W.isBox3?W.min.z:0;else{let fe=Math.pow(2,-G);vt=Math.floor(le.width*fe),gt=Math.floor(le.height*fe),v.isDataArrayTexture?wt=le.depth:v.isData3DTexture?wt=Math.floor(le.depth*fe):wt=1,Rt=0,Vt=0,Xt=0}V!==null?(Et=V.x,te=V.y,ge=V.z):(Et=0,te=0,ge=0);let re=pt.convert(F.format),Re=pt.convert(F.type),yt;F.isData3DTexture?(H.setTexture3D(F,0),yt=O.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(H.setTexture2DArray(F,0),yt=O.TEXTURE_2D_ARRAY):(H.setTexture2D(F,0),yt=O.TEXTURE_2D),p.activeTexture(O.TEXTURE0),p.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,F.flipY),p.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),p.pixelStorei(O.UNPACK_ALIGNMENT,F.unpackAlignment);let Ue=p.getParameter(O.UNPACK_ROW_LENGTH),Kt=p.getParameter(O.UNPACK_IMAGE_HEIGHT),Qe=p.getParameter(O.UNPACK_SKIP_PIXELS),mn=p.getParameter(O.UNPACK_SKIP_ROWS),Nn=p.getParameter(O.UNPACK_SKIP_IMAGES);p.pixelStorei(O.UNPACK_ROW_LENGTH,le.width),p.pixelStorei(O.UNPACK_IMAGE_HEIGHT,le.height),p.pixelStorei(O.UNPACK_SKIP_PIXELS,Rt),p.pixelStorei(O.UNPACK_SKIP_ROWS,Vt),p.pixelStorei(O.UNPACK_SKIP_IMAGES,Xt);let _i=v.isDataArrayTexture||v.isData3DTexture,se=F.isDataArrayTexture||F.isData3DTexture;if(v.isDepthTexture){let fe=z.get(v),Un=z.get(F),oe=z.get(fe.__renderTarget),Fn=z.get(Un.__renderTarget);p.bindFramebuffer(O.READ_FRAMEBUFFER,oe.__webglFramebuffer),p.bindFramebuffer(O.DRAW_FRAMEBUFFER,Fn.__webglFramebuffer);for(let xi=0;xi<wt;xi++)_i&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,z.get(v).__webglTexture,G,Xt+xi),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,z.get(F).__webglTexture,_t,ge+xi)),O.blitFramebuffer(Rt,Vt,vt,gt,Et,te,vt,gt,O.DEPTH_BUFFER_BIT,O.NEAREST);p.bindFramebuffer(O.READ_FRAMEBUFFER,null),p.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(G!==0||v.isRenderTargetTexture||z.has(v)){let fe=z.get(v),Un=z.get(F);p.bindFramebuffer(O.READ_FRAMEBUFFER,I),p.bindFramebuffer(O.DRAW_FRAMEBUFFER,k);for(let oe=0;oe<wt;oe++)_i?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,fe.__webglTexture,G,Xt+oe):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,fe.__webglTexture,G),se?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Un.__webglTexture,_t,ge+oe):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Un.__webglTexture,_t),G!==0?O.blitFramebuffer(Rt,Vt,vt,gt,Et,te,vt,gt,O.COLOR_BUFFER_BIT,O.NEAREST):se?O.copyTexSubImage3D(yt,_t,Et,te,ge+oe,Rt,Vt,vt,gt):O.copyTexSubImage2D(yt,_t,Et,te,Rt,Vt,vt,gt);p.bindFramebuffer(O.READ_FRAMEBUFFER,null),p.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else se?v.isDataTexture||v.isData3DTexture?O.texSubImage3D(yt,_t,Et,te,ge,vt,gt,wt,re,Re,le.data):F.isCompressedArrayTexture?O.compressedTexSubImage3D(yt,_t,Et,te,ge,vt,gt,wt,re,le.data):O.texSubImage3D(yt,_t,Et,te,ge,vt,gt,wt,re,Re,le):v.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,_t,Et,te,vt,gt,re,Re,le.data):v.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,_t,Et,te,le.width,le.height,re,le.data):O.texSubImage2D(O.TEXTURE_2D,_t,Et,te,vt,gt,re,Re,le);p.pixelStorei(O.UNPACK_ROW_LENGTH,Ue),p.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Kt),p.pixelStorei(O.UNPACK_SKIP_PIXELS,Qe),p.pixelStorei(O.UNPACK_SKIP_ROWS,mn),p.pixelStorei(O.UNPACK_SKIP_IMAGES,Nn),_t===0&&F.generateMipmaps&&O.generateMipmap(yt),p.unbindTexture()},this.initRenderTarget=function(v){z.get(v).__webglFramebuffer===void 0&&H.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?H.setTextureCube(v,0):v.isData3DTexture?H.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?H.setTexture2DArray(v,0):H.setTexture2D(v,0),p.unbindTexture()},this.resetState=function(){Y=0,$=0,et=null,p.reset(),xt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return on}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Yt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Yt._getUnpackColorSpace()}};var yh={type:"change"},_l={type:"start"},Mh={type:"end"},Ua=new ki,vh=new Ye,Pg=Math.cos(70*fn.DEG2RAD),Se=new B,We=2*Math.PI,ie={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},gl=1e-6,Fa=class extends ws{constructor(t,e=null){super(t,e),this.state=ie.NONE,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Qn.ROTATE,MIDDLE:Qn.DOLLY,RIGHT:Qn.PAN},this.touches={ONE:ti.ROTATE,TWO:ti.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new B,this._lastQuaternion=new $e,this._lastTargetPosition=new B,this._quat=new $e().setFromUnitVectors(t.up,new B(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Hi,this._sphericalDelta=new Hi,this._scale=1,this._panOffset=new B,this._rotateStart=new Ot,this._rotateEnd=new Ot,this._rotateDelta=new Ot,this._panStart=new Ot,this._panEnd=new Ot,this._panDelta=new Ot,this._dollyStart=new Ot,this._dollyEnd=new Ot,this._dollyDelta=new Ot,this._dollyDirection=new B,this._mouse=new Ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Lg.bind(this),this._onPointerDown=Ig.bind(this),this._onPointerUp=Dg.bind(this),this._onContextMenu=kg.bind(this),this._onMouseWheel=Fg.bind(this),this._onKeyDown=Og.bind(this),this._onTouchStart=Bg.bind(this),this._onTouchMove=zg.bind(this),this._onMouseDown=Ng.bind(this),this._onMouseMove=Ug.bind(this),this._interceptControlDown=Vg.bind(this),this._interceptControlUp=Gg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ie.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(yh),this.update(),this.state=ie.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Se.copy(e).sub(this.target),Se.applyQuaternion(this._quat),this._spherical.setFromVector3(Se),this.autoRotate&&this.state===ie.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=We:n>Math.PI&&(n-=We),s<-Math.PI?s+=We:s>Math.PI&&(s-=We),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Se.setFromSpherical(this._spherical),Se.applyQuaternion(this._quatInverse),e.copy(this.target).add(Se),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Se.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new B(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new B(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Se.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ua.origin.copy(this.object.position),Ua.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ua.direction))<Pg?this.object.lookAt(this.target):(vh.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ua.intersectPlane(vh,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>gl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>gl||this._lastTargetPosition.distanceToSquared(this.target)>gl?(this.dispatchEvent(yh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?We/60*this.autoRotateSpeed*t:We/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Se.setFromMatrixColumn(e,0),Se.multiplyScalar(-t),this._panOffset.add(Se)}_panUp(t,e){this.screenSpacePanning===!0?Se.setFromMatrixColumn(e,1):(Se.setFromMatrixColumn(e,0),Se.crossVectors(this.object.up,Se)),Se.multiplyScalar(t),this._panOffset.add(Se)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Se.copy(s).sub(this.target);let r=Se.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(We*this._rotateDelta.x/e.clientHeight),this._rotateUp(We*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(We*this._rotateDelta.x/e.clientHeight),this._rotateUp(We*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ot,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Ig(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Lg(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Dg(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Mh),this.state=ie.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Ng(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Qn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ie.DOLLY;break;case Qn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ie.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ie.ROTATE}break;case Qn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ie.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ie.PAN}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(_l)}function Ug(i){switch(this.state){case ie.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ie.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ie.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Fg(i){this.enabled===!1||this.enableZoom===!1||this.state!==ie.NONE||(i.preventDefault(),this.dispatchEvent(_l),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Mh))}function Og(i){this.enabled!==!1&&this._handleKeyDown(i)}function Bg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ti.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ie.TOUCH_ROTATE;break;case ti.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ie.TOUCH_PAN;break;default:this.state=ie.NONE}break;case 2:switch(this.touches.TWO){case ti.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ie.TOUCH_DOLLY_PAN;break;case ti.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ie.TOUCH_DOLLY_ROTATE;break;default:this.state=ie.NONE}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(_l)}function zg(i){switch(this._trackPointer(i),this.state){case ie.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ie.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ie.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ie.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ie.NONE}}function kg(i){this.enabled!==!1&&i.preventDefault()}function Vg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Gg(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Sh(i,t,e){let n=new B;return{add(s,r){let a=document.createElement("span");return a.className=`al-lab ${s}`,a.innerHTML=r,i.appendChild(a),a},place(s,r,a=0){n.copy(r).project(e);let o=t.clientWidth,c=t.clientHeight,l=n.z>1||Math.abs(n.x)>1.1||Math.abs(n.y)>1.1;s.style.opacity=l?0:1;let d=s.offsetWidth/2+6,m=Math.min(o-d,Math.max(d,(n.x*.5+.5)*o));s.style.transform=`translate(${m}px, ${(-n.y*.5+.5)*c+a}px) translate(-50%, -50%)`}}}function bh(i,t,e={}){let n=()=>{let s=document.querySelector(i);if(!s)return;let r=null,a=!1,o=()=>(a||(a=!0,r=t(s)),r),c=new IntersectionObserver(l=>{l[0].isIntersecting&&(c.disconnect(),o())},{rootMargin:"600px"});c.observe(s);for(let[l,d]of Object.entries(e))document.querySelectorAll(`[data-lab-${l}]`).forEach(m=>m.addEventListener("click",u=>{let g=o();if(!g)return;u.preventDefault(),s.scrollIntoView({behavior:"smooth",block:"center"});let x=m.getAttribute(`data-lab-${l}`),E=()=>g.ready()?d(g,x):setTimeout(E,150);E()}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n):n()}var Dy=Math.PI/180,Hg=(i,t,e,n,s,r)=>Math.exp(-(((i-e)/s)**2+((t-n)/r)**2));function Th(){let t=[-.2,.15],e=[.25,-.2],n=[.04,-.1],s=[-.3,-.62];return{h:(a,o)=>{let c=a/5,l=o/5,d=c-t[0],m=1080*Math.exp(-((d/(d>0?.2:.55))**2+((l-t[1])/.3)**2)),u=600*Hg(c,l,e[0],e[1],.19,.19),g=s[0]-n[0],x=s[1]-n[1],E=g*g+x*x,f=Math.max(0,Math.min(1,((c-n[0])*g+(l-n[1])*x)/E)),h=Math.hypot(c-(n[0]+g*f),l-(n[1]+x*f)),M=.45*Math.exp(-((h/.055)**2))*Math.min(1,f/.15),b=Math.max(Math.abs(c),Math.abs(l)),y=b<.6?1:b>.9?0:.5+.5*Math.cos(Math.PI*(b-.6)/.3);return(m+u)*(1-M)*y-60},box:[-5,-5,5,5],peak:{x:t[0]*5,y:t[1]*5},second:{x:e[0]*5,y:e[1]*5},valley:{x:(n[0]+.3*(s[0]-n[0]))*5,y:(n[1]+.3*(s[1]-n[1]))*5}}}function Oa(i,t,e){let[n,s,r,a]=t,o=new Float64Array(e*e);for(let c=0;c<e;c++)for(let l=0;l<e;l++)o[c*e+l]=i(n+(r-n)*l/(e-1),s+(a-s)*c/(e-1));return{n:e,box:t,z:o}}function xl(i,t,e){let n=[];for(let s=Math.ceil(i/e)*e;s<=t;s+=e)n.push(s+0);return n}function Qi(i,t){let{n:e,box:[n,s,r,a],z:o}=i,c=(r-n)/(e-1),l=(a-s)/(e-1),d=(b,y)=>o[y*e+b]-t,m=(b,y)=>d(b,y)>0,u=new Map,g=b=>{let y=u.get(b);if(y)return y;let T=b>>1,w=T%e,C=(T-w)/e,_,A,R,P,L,D;b&1?(_=d(w,C),A=d(w,C+1),R=w,P=C,L=w,D=C+1):(_=d(w,C),A=d(w+1,C),R=w,P=C,L=w+1,D=C);let I=_/(_-A);return y=[n+(R+(L-R)*I)*c,s+(P+(D-P)*I)*l],u.set(b,y),y},x=[];for(let b=0;b<e-1;b++)for(let y=0;y<e-1;y++){let T=(m(y,b)?1:0)|(m(y+1,b)?2:0)|(m(y+1,b+1)?4:0)|(m(y,b+1)?8:0);if(T===0||T===15)continue;let w=2*(b*e+y),C=2*((b+1)*e+y),_=2*(b*e+y)+1,A=2*(b*e+y+1)+1,R=(P,L)=>x.push([P,L]);switch(T){case 1:case 14:R(_,w);break;case 2:case 13:R(w,A);break;case 3:case 12:R(_,A);break;case 4:case 11:R(A,C);break;case 6:case 9:R(w,C);break;case 7:case 8:R(_,C);break;case 5:case 10:{let P=(d(y,b)+d(y+1,b)+d(y+1,b+1)+d(y,b+1))/4>0;T===5===P?(R(_,C),R(w,A)):(R(_,w),R(A,C));break}default:break}}let E=new Map;x.forEach(([b,y],T)=>{for(let w of[b,y]){let C=E.get(w);C?C.push(T):E.set(w,[T])}});let f=new Uint8Array(x.length),h=[],M=(b,y)=>x[b][0]===y?x[b][1]:x[b][0];for(let b=0;b<x.length;b++){if(f[b])continue;f[b]=1;let y=[x[b][0],x[b][1]];for(let T of[1,0])for(;;){let w=T?y[y.length-1]:y[0],C=(E.get(w)||[]).find(A=>!f[A]);if(C==null)break;f[C]=1;let _=M(C,w);if(T?y.push(_):y.unshift(_),_===(T?y[0]:y[y.length-1]))break}h.push(y.map(g))}return h}var ts=[[-200,[24,62,118]],[-.01,[36,88,150]],[0,[150,196,136]],[150,[184,212,146]],[350,[222,214,156]],[600,[214,182,134]],[850,[190,150,116]],[1100,[236,228,218]]];function Ba(i){for(let t=1;t<ts.length;t++)if(i<=ts[t][0]){let[e,n]=ts[t-1],[s,r]=ts[t],a=Math.max(0,Math.min(1,(i-e)/(s-e)));return[0,1,2].map(o=>Math.round(n[o]+(r[o]-n[o])*a))}return ts[ts.length-1][1]}function wh({M:i,n:t=160,ny:e=t,exag:n=1.5,color:s=Ba,sea:r=-80}={}){let[a,o,c,l]=i.box,d=n/1e3,m=(ot,rt,It)=>new B(ot,It*d,-rt),u=ot=>[ot.x,-ot.z],g=new Ze,x=Oa(i.h,i.box,t+1),E=new Zn(c-a,l-o,t,e);E.rotateX(-Math.PI/2);let f=E.getAttribute("position"),h=new Float32Array(f.count*3);for(let ot=0;ot<f.count;ot++){let rt=f.getX(ot)+(a+c)/2,It=-f.getZ(ot)+(o+l)/2,bt=i.h(rt,It);f.setXYZ(ot,rt,Math.max(bt,r)*d,-It);let Lt=bt<0?[70,110,150]:s(bt);h[3*ot]=Lt[0]/255,h[3*ot+1]=Lt[1]/255,h[3*ot+2]=Lt[2]/255}E.setAttribute("color",new ye(h,3)),E.computeVertexNormals(),E.boundingSphere=new Rn(new B,Math.max(10,Math.hypot(c-a,l-o)/2+1));let M=new Zt(E,new $n({vertexColors:!0}));g.add(M);let b=-.35,y=[],T=[],w=ot=>{let rt=y.length/3;ot.forEach(([It,bt])=>{let Lt=Math.max(i.h(It,bt),r)*d;y.push(It,Lt,-bt,It,b,-bt)});for(let It=0;It+1<ot.length;It++){let bt=rt+2*It;T.push(bt,bt+1,bt+2,bt+1,bt+3,bt+2)}},C=80,_=(ot,rt,It,bt)=>Array.from({length:C+1},(Lt,X)=>[ot+(It-ot)*X/C,rt+(bt-rt)*X/C]);w(_(a,o,c,o)),w(_(c,o,c,l)),w(_(c,l,a,l)),w(_(a,l,a,o));let A=new Ce;A.setAttribute("position",new ye(new Float32Array(y),3)),A.setIndex(T);let R=new Zt(A,new Je({color:7031343,side:we}));g.add(R);let P=new Zt(new Zn(c-a,l-o),new Je({color:4165600,transparent:!0,opacity:.42,depthWrite:!1,side:we}));P.rotateX(-Math.PI/2),P.renderOrder=2,g.add(P);let L=new Ce;L.setAttribute("position",new ye(new Float32Array(72),3));let D=new Zt(L,new Je({color:3108789,transparent:!0,opacity:.35,depthWrite:!1,side:we}));g.add(D);function I(ot){let rt=ot*d;P.position.y=rt;let It=[[a,-o],[c,-o],[c,-l],[a,-l]],bt=L.getAttribute("position");for(let Lt=0;Lt<4;Lt++){let[X,K]=It[Lt],[dt,Tt]=It[(Lt+1)%4],ft=Lt*6;[[X,b,K],[dt,b,Tt],[dt,rt,Tt],[X,b,K],[dt,rt,Tt],[X,rt,K]].forEach((ne,Ut)=>bt.setXYZ(ft+Ut,ne[0],ne[1],ne[2]))}bt.needsUpdate=!0,L.computeBoundingSphere()}I(0);let k=.032,Y=new Je({color:16765806,side:we,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),$=new Je({color:16777215,side:we,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),et=new Ze;g.add(et);let q=new Map,tt=ot=>{let rt=q.get(ot);if(!rt){let It=[],bt=[],Lt=ot*d+.012;for(let X of Qi(x,ot))for(let K=0;K+1<X.length;K++){let[dt,Tt]=X[K],[ft,Dt]=X[K+1],ne=ft-dt,Ut=-(Dt-Tt),Ht=Math.hypot(ne,Ut)||1,$t=-Ut/Ht*k/2,kt=ne/Ht*k/2,Jt=It.length/3;It.push(dt+$t,Lt,-Tt+kt,dt-$t,Lt,-Tt-kt,ft+$t,Lt,-Dt+kt,ft-$t,Lt,-Dt-kt),bt.push(Jt,Jt+1,Jt+2,Jt+1,Jt+3,Jt+2)}rt=new Ce,rt.setAttribute("position",new ye(new Float32Array(It),3)),rt.setIndex(bt),rt.boundingSphere=new Rn(new B,10),q.set(ot,rt)}return rt};function nt(ot,rt){et.clear();for(let It of ot){let bt=new Zt(tt(It),It===rt?$:Y);bt.renderOrder=3,et.add(bt)}}return{group:g,mesh:M,grid:x,toWorld:m,fromWorld:u,setWater:I,setContours:nt,k:d,show(ot,rt){({water:[P,D],lines:[et],skirt:[R]})[ot].forEach(It=>{It.visible=rt})},heightAt:(ot,rt)=>i.h(ot,rt)}}var Eh=(i,t,e)=>{let n=Math.max(0,Math.min(1,(e-i)/(t-i)));return n*n*(3-2*n)};function za(){let i=Th();return{h:(e,n)=>{let s=i.h(e-1.3,n-1.1),r=Math.hypot((e+1.6)/2.6,(n+1.7)/1.9),a=22-16*Eh(.3,1.25,Math.hypot((e-.2)/3,(n-.6)/3))-70*Eh(.85,1.05,r);return Math.max(s,a)},box:[-5,-5,5,5],peak:{x:i.peak.x+1.3,y:i.peak.y+1.1}}}var Ee={school:{x:-1.8,y:-1.15,en:"School",zh:"\u5B78\u6821"},temple:{x:-2.6,y:-.85,en:"Temple",zh:"\u5EDF"},harbor:{x:.3,y:-1.05,en:"Harbor",zh:"\u6E2F\u53E3"},lighthouse:{x:-1.45,y:-3.15,en:"Lighthouse",zh:"\u71C8\u5854"},bridge:{x:-1.27,y:-1.5,en:"Bridge",zh:"\u6A4B"},trailhead:{x:-1.9,y:-.4,en:"Trailhead",zh:"\u767B\u5C71\u53E3"},summit:{x:.3,y:1.85,en:"Summit",zh:"\u5C71\u9802"},hut:{x:-.95,y:.85,en:"Mountain hut",zh:"\u5C71\u5C4B"}},In={river:{en:"River",zh:"\u6CB3",pts:[[-.95,.35],[-1.05,-.3],[-1.3,-1],[-1.25,-1.8],[-1.05,-2.6],[-.85,-3.25]]},road:{en:"Road",zh:"\u516C\u8DEF",pts:[[-3.5,-1.6],[-2.5,-1.5],[-1.27,-1.5],[-.3,-1.3],[.3,-1.05]]},lane:{en:"Road",zh:"\u516C\u8DEF",pts:[[-1.8,-1.5],[-1.8,-1.15],[-1.9,-.4]]},coast:{en:"Road",zh:"\u516C\u8DEF",pts:[[-1.27,-1.5],[-1.5,-2.4],[-1.45,-3.15]]},trail:{en:"Hiking trail",zh:"\u767B\u5C71\u6B65\u9053",pts:[[-1.9,-.4],[-1.6,.2],[-.95,.85],[-.4,1.4],[.3,1.85]]}},Ln={rice:{en:"Rice field",zh:"\u7A3B\u7530",polys:[[[-3.3,-1.9],[-2,-1.85],[-2,-2.75],[-3,-2.75]],[[-.9,-1.85],[-.15,-1.75],[-.25,-2.55],[-.85,-2.55]]]},forest:{en:"Forest",zh:"\u68EE\u6797",polys:[[[-2.3,.35],[-1.6,.6],[-.9,1.6],[-.8,2.6],[-1.6,3],[-2.4,2]]]},town:{en:"Buildings",zh:"\u623F\u5C4B",polys:[[[-2.3,-1.3],[-1.4,-1.25],[-1.4,-1],[-2.3,-1]]]}};var Ah=([i,t],[e,n])=>Math.hypot(e-i,n-t);var yl=(i,t)=>i*t/100;var Ch=(i,t)=>t*1e5/i;var ai="#2b2118";function ka(i,t,e,n,s,r){i.beginPath(),i.arc(t,e,n,0,Math.PI*2),s&&(i.fillStyle=s,i.fill()),r&&(i.strokeStyle=r,i.stroke())}var es={school:{en:"School",zh:"\u5B78\u6821",kind:"point",draw(i,t,e,n){let s=n*.7,r=n*.45;i.fillStyle="#fff",i.strokeStyle=ai,i.lineWidth=Math.max(1,n/14),i.fillRect(t-s/2,e-r/2+n*.1,s,r),i.strokeRect(t-s/2,e-r/2+n*.1,s,r),i.beginPath(),i.moveTo(t,e-r/2+n*.1),i.lineTo(t,e-n*.5),i.stroke(),i.fillStyle="#d63a3a",i.beginPath(),i.moveTo(t,e-n*.5),i.lineTo(t+n*.28,e-n*.4),i.lineTo(t,e-n*.3),i.closePath(),i.fill()}},temple:{en:"Temple",zh:"\u5EDF",kind:"point",draw(i,t,e,n){i.lineWidth=Math.max(1,n/14),i.strokeStyle=ai,i.fillStyle="#c0392b",i.beginPath(),i.moveTo(t-n*.48,e-n*.05),i.quadraticCurveTo(t,e-n*.32,t+n*.48,e-n*.05),i.lineTo(t+n*.36,e-n*.2),i.quadraticCurveTo(t,e-n*.48,t-n*.36,e-n*.2),i.closePath(),i.fill(),i.stroke(),i.fillStyle="#fff",i.fillRect(t-n*.3,e-n*.05,n*.6,n*.38),i.strokeRect(t-n*.3,e-n*.05,n*.6,n*.38)}},harbor:{en:"Harbor",zh:"\u6E2F\u53E3",kind:"point",draw(i,t,e,n){i.strokeStyle="#1d4f91",i.lineWidth=Math.max(1.4,n/9),i.lineCap="round",ka(i,t,e-n*.32,n*.1,null,"#1d4f91"),i.beginPath(),i.moveTo(t,e-n*.22),i.lineTo(t,e+n*.4),i.moveTo(t-n*.2,e-n*.08),i.lineTo(t+n*.2,e-n*.08),i.moveTo(t-n*.36,e+n*.12),i.quadraticCurveTo(t-n*.3,e+n*.42,t,e+n*.42),i.quadraticCurveTo(t+n*.3,e+n*.42,t+n*.36,e+n*.12),i.stroke(),i.lineCap="butt"}},lighthouse:{en:"Lighthouse",zh:"\u71C8\u5854",kind:"point",draw(i,t,e,n){i.strokeStyle="#e8b400",i.lineWidth=Math.max(1,n/14);for(let s=0;s<8;s++){let r=s*Math.PI/4;i.beginPath(),i.moveTo(t+Math.cos(r)*n*.2,e-n*.2+Math.sin(r)*n*.2),i.lineTo(t+Math.cos(r)*n*.42,e-n*.2+Math.sin(r)*n*.42),i.stroke()}i.fillStyle="#fff",i.strokeStyle=ai,i.beginPath(),i.moveTo(t-n*.1,e-n*.15),i.lineTo(t+n*.1,e-n*.15),i.lineTo(t+n*.17,e+n*.45),i.lineTo(t-n*.17,e+n*.45),i.closePath(),i.fill(),i.stroke(),ka(i,t,e-n*.2,n*.1,"#ffd23a",ai)}},bridge:{en:"Bridge",zh:"\u6A4B",kind:"point",draw(i,t,e,n){i.strokeStyle=ai,i.lineWidth=Math.max(1.4,n/9),i.beginPath(),i.moveTo(t-n*.4,e-n*.35),i.lineTo(t-n*.2,e-n*.18),i.lineTo(t-n*.2,e+n*.18),i.lineTo(t-n*.4,e+n*.35),i.moveTo(t+n*.4,e-n*.35),i.lineTo(t+n*.2,e-n*.18),i.lineTo(t+n*.2,e+n*.18),i.lineTo(t+n*.4,e+n*.35),i.stroke()}},summit:{en:"Summit (height in meters)",zh:"\u5C71\u9802\uFF08\u6A19\u9AD8\uFF0C\u516C\u5C3A\uFF09",kind:"point",draw(i,t,e,n){i.fillStyle=ai,i.beginPath(),i.moveTo(t,e-n*.32),i.lineTo(t+n*.3,e+n*.2),i.lineTo(t-n*.3,e+n*.2),i.closePath(),i.fill()}},trailhead:{en:"Trailhead",zh:"\u767B\u5C71\u53E3",kind:"point",draw(i,t,e,n){ka(i,t,e,n*.36,"#fff","#c0392b"),i.lineWidth=Math.max(1.2,n/10),i.strokeStyle="#c0392b",i.beginPath(),i.moveTo(t-n*.2,e+n*.18),i.lineTo(t,e-n*.16),i.lineTo(t+n*.2,e+n*.18),i.stroke()}},hut:{en:"Mountain hut",zh:"\u5C71\u5C4B",kind:"point",draw(i,t,e,n){i.fillStyle="#fff",i.strokeStyle=ai,i.lineWidth=Math.max(1,n/14),i.beginPath(),i.moveTo(t-n*.32,e+n*.32),i.lineTo(t-n*.32,e-n*.02),i.lineTo(t,e-n*.32),i.lineTo(t+n*.32,e-n*.02),i.lineTo(t+n*.32,e+n*.32),i.closePath(),i.fill(),i.stroke()}},river:{en:"River",zh:"\u6CB3\u6D41",kind:"line",draw(i,t,e,n){i.strokeStyle="#2f7fd6",i.lineWidth=Math.max(2,n/7),i.beginPath(),i.moveTo(t-n*.45,e+n*.1),i.bezierCurveTo(t-n*.15,e-n*.3,t+n*.15,e+n*.3,t+n*.45,e-n*.1),i.stroke()}},road:{en:"Road",zh:"\u516C\u8DEF",kind:"line",draw(i,t,e,n){i.strokeStyle=ai,i.lineWidth=Math.max(4,n/3.4),i.beginPath(),i.moveTo(t-n*.45,e),i.lineTo(t+n*.45,e),i.stroke(),i.strokeStyle="#ffd36e",i.lineWidth=Math.max(2,n/6),i.stroke()}},trail:{en:"Hiking trail",zh:"\u767B\u5C71\u6B65\u9053",kind:"line",draw(i,t,e,n){i.strokeStyle="#c0392b",i.lineWidth=Math.max(1.5,n/9),i.setLineDash([n*.14,n*.1]),i.beginPath(),i.moveTo(t-n*.45,e),i.lineTo(t+n*.45,e),i.stroke(),i.setLineDash([])}},rice:{en:"Rice field",zh:"\u7A3B\u7530",kind:"area",draw(i,t,e,n){i.fillStyle="#d9ec9a",i.fillRect(t-n*.45,e-n*.3,n*.9,n*.6),i.strokeStyle="#6a9a2a",i.lineWidth=1;for(let s=-1;s<=1;s++)i.beginPath(),i.moveTo(t-n*.3,e+s*n*.15),i.lineTo(t-n*.05,e+s*n*.15),i.moveTo(t+n*.05,e+s*n*.15),i.lineTo(t+n*.3,e+s*n*.15),i.stroke()}},forest:{en:"Forest",zh:"\u68EE\u6797",kind:"area",draw(i,t,e,n){i.fillStyle="#9fd18a",i.fillRect(t-n*.45,e-n*.3,n*.9,n*.6);for(let[s,r]of[[-.22,-.08],[.18,-.1],[0,.12]])ka(i,t+s*n,e+r*n,n*.11,"#3f7d32")}},town:{en:"Buildings",zh:"\u623F\u5C4B",kind:"area",draw(i,t,e,n){i.fillStyle="#5b4a3a";for(let[s,r]of[[-.3,-.2],[.05,-.22],[-.15,.1],[.2,.08]])i.fillRect(t+s*n,e+r*n,n*.22,n*.18)}}},vl=new Map;function ns(i,t=28){let e=i+t;if(vl.has(e))return vl.get(e);let n=Math.min(globalThis.devicePixelRatio||1,2),s=document.createElement("canvas");s.width=s.height=Math.round(t*n);let r=s.getContext("2d");r.setTransform(n,0,0,n,0,0),es[i].draw(r,t/2,t/2,t);let a=s.toDataURL();return vl.set(e,a),a}var Va=za(),Rh=Oa(Va.h,Va.box,161),Wg=xl(100,1100,100).map(i=>({L:i,lines:Qi(Rh,i)})),Xg=Qi(Rh,0);function qg(){let i=[],[[t,e],[n],[,s]]=[Ln.town.polys[0][0],Ln.town.polys[0][1],Ln.town.polys[0][2]],r=7,a=()=>(r=r*16807%2147483647,r/2147483647);for(let o=Math.min(e,s)+.03;o<Math.max(e,s)-.03;o+=.07)for(let c=t+.03;c<n-.03;c+=.075)a()<.18||i.push([c+(a()-.5)*.02,o+(a()-.5)*.02,.035+a()*.02,.03+a()*.015]);return i}var Ml=qg();function Ga(i,t,e,{view:n={cx:0,cy:0,km:10},dpr:s=1,labels:r=!0,sym:a=22}={}){let o=Math.min(t,e)/n.km,c=(f,h)=>[t/2+(f-n.cx)*o,e/2-(h-n.cy)*o],l=(f,h)=>[n.cx+(f-t/2)/o,n.cy-(h-e/2)/o],d=Math.round(t*s),m=Math.round(e*s),u=i.createImageData(d,m);for(let f=0;f<m;f++)for(let h=0;h<d;h++){let[M,b]=l((h+.5)/s,(f+.5)/s),y=Va.h(M,b),T=y<0?[170,206,236]:Ba(y).map(C=>Math.round(C*.45+255*.55)),w=4*(f*d+h);u.data[w]=T[0],u.data[w+1]=T[1],u.data[w+2]=T[2],u.data[w+3]=255}i.save(),i.setTransform(1,0,0,1,0,0),i.putImageData(u,0,0),i.restore();let g=(f,h)=>{f.forEach((M,b)=>{let[y,T]=c(M[0],M[1]);b?i.lineTo(y,T):i.moveTo(y,T)}),h&&i.closePath()};i.lineJoin="round",i.lineCap="round",i.strokeStyle="rgba(140,96,60,.45)",i.lineWidth=.8;for(let{L:f,lines:h}of Wg){i.beginPath();for(let M of h)g(M);i.lineWidth=f%500===0?1.4:.8,i.stroke()}i.strokeStyle="#3d74b5",i.lineWidth=1.4,i.beginPath();for(let f of Xg)g(f);i.stroke();for(let f of["rice","forest"])for(let h of Ln[f].polys){i.beginPath(),g(h,!0),i.fillStyle=f==="rice"?"rgba(217,236,154,.9)":"rgba(159,209,138,.85)",i.fill(),i.save(),i.clip();let M=h.map(_=>c(..._)),b=Math.min(...M.map(_=>_[0])),y=Math.max(...M.map(_=>_[0])),T=Math.min(...M.map(_=>_[1])),w=Math.max(...M.map(_=>_[1])),C=Math.max(9,Math.min(22,o*.12));for(let _=T+C/2,A=0;_<w;_+=C,A++)for(let R=b+A%2*C/2;R<y;R+=C)f==="rice"?(i.strokeStyle="#6a9a2a",i.lineWidth=1,i.beginPath(),i.moveTo(R-C*.3,_),i.lineTo(R+C*.3,_),i.stroke()):(i.fillStyle="#3f7d32",i.beginPath(),i.arc(R,_,Math.max(1.4,C*.16),0,Math.PI*2),i.fill());i.restore()}if(n.km>4)i.beginPath(),g(Ln.town.polys[0],!0),i.fillStyle="rgba(91,74,58,.75)",i.fill();else{i.fillStyle="#5b4a3a";for(let[f,h,M,b]of Ml){let[y,T]=c(f,h);i.fillRect(y-M*o/2,T-b*o/2,M*o,b*o)}}let x=Math.max(3,Math.min(14,o*.012+2.4));i.strokeStyle="#2f7fd6",i.lineWidth=Math.max(2,x*.6),i.beginPath(),g(In.river.pts),i.stroke();for(let f of["road","lane","coast"])i.beginPath(),g(In[f].pts),i.strokeStyle="#2b2118",i.lineWidth=x+2,i.stroke(),i.strokeStyle="#ffd36e",i.lineWidth=x,i.stroke();i.setLineDash([6,4]),i.strokeStyle="#c0392b",i.lineWidth=1.8,i.beginPath(),g(In.trail.pts),i.stroke(),i.setLineDash([]);let E=a*Math.max(.8,Math.min(1.6,o/70));for(let[f,h]of Object.entries(Ee)){let[M,b]=c(h.x,h.y);M<-E||b<-E||M>t+E||b>e+E||(f!=="bridge"&&(i.beginPath(),i.arc(M,b,E*.55,0,Math.PI*2),i.fillStyle="rgba(255,255,255,.75)",i.fill()),es[f].draw(i,M,b,E),f==="summit"&&(i.font="800 11px system-ui, sans-serif",i.fillStyle="#2b2118",i.textAlign="left",i.fillText(`${Math.round(Va.h(h.x,h.y))}`,M+E*.45,b+4)),r&&o>120&&(i.font="700 11px system-ui, sans-serif",i.textAlign="center",i.lineWidth=3,i.strokeStyle="rgba(255,255,255,.9)",i.strokeText(h.en,M,b+E*.95),i.fillStyle="#2b2118",i.fillText(h.en,M,b+E*.95)))}return i.lineCap="butt",{toXY:c,toKm:l,pxPerKm:o}}function Ha(i,t,e,n=16){i.fillStyle="rgba(255,255,255,.85)",i.beginPath(),i.arc(t,e,n+6,0,Math.PI*2),i.fill(),i.fillStyle="#2b2118",i.beginPath(),i.moveTo(t,e-n),i.lineTo(t+n*.45,e+n*.6),i.lineTo(t,e+n*.25),i.closePath(),i.fill(),i.fillStyle="#fff",i.strokeStyle="#2b2118",i.lineWidth=1,i.beginPath(),i.moveTo(t,e-n),i.lineTo(t-n*.45,e+n*.6),i.lineTo(t,e+n*.25),i.closePath(),i.fill(),i.stroke(),i.fillStyle="#2b2118",i.font="800 11px system-ui, sans-serif",i.textAlign="center",i.fillText("N",t,e-n-3)}function Sl(i,t){let e=[.05,.1,.2,.25,.5,1,2,5],n=e[0];for(let s of e)s*i<=t&&(n=s);return{km:n,px:n*i,label:n<1?`${Math.round(n*1e3)} m`:`${n} km`}}function Wa(i,t,e,n,s){let r=Sl(n,s);return i.fillStyle="rgba(255,255,255,.88)",i.fillRect(t-6,e-18,r.px+12,26),i.fillStyle="#2b2118",i.fillRect(t,e,r.px,4),i.fillStyle="#fff",i.fillRect(t+r.px/2,e+1,r.px/2-1,2),i.fillStyle="#2b2118",i.fillRect(t,e-4,1.5,8),i.fillRect(t+r.px-1.5,e-4,1.5,8),i.font="700 10px system-ui, sans-serif",i.textAlign="left",i.fillText("0",t-2,e-7),i.textAlign="right",i.fillText(r.label,t+r.px+2,e-7),r}var bl=20,Dn={island:{cx:-.6,cy:-.3,km:10},town:{cx:-1.45,cy:-1.55,km:2.5},street:{cx:-1.6,cy:-1.25,km:1}};function Ph(i){let t=M=>i.querySelector(M),e=t(".gg-ms-cv"),n=e.getContext("2d"),s=M=>[Ee[M].x,Ee[M].y],r={view:"island",a:s("school"),b:s("harbor"),drag:null},a=null,o=null,c=0,l=0,d=1;function m(){if(c=e.clientWidth,l=e.clientHeight,!c||!l)return;d=Math.min(window.devicePixelRatio||1,2),e.width=Math.round(c*d),e.height=Math.round(l*d),a=document.createElement("canvas"),a.width=e.width,a.height=e.height;let M=a.getContext("2d");M.setTransform(d,0,0,d,0,0),o=Ga(M,c,l,{view:Dn[r.view],dpr:d}),Ha(M,c-30,34),Wa(M,14,l-16,o.pxPerKm,c*.32),g()}let u=()=>{let M=Dn[r.view],b=Ch(bl,M.km),y=Ah(r.a,r.b),T=y/M.km*bl;return{scale:b,cm:T,meters:yl(T,b),km:y}};function g(){if(!a)return;n.setTransform(1,0,0,1,0,0),n.drawImage(a,0,0),n.setTransform(d,0,0,d,0,0);let[M,b]=o.toXY(...r.a),[y,T]=o.toXY(...r.b),w=Math.atan2(T-b,y-M),C=Math.hypot(y-M,T-b);n.save(),n.translate(M,b),n.rotate(w),n.fillStyle="rgba(255,248,220,.82)",n.strokeStyle="#7a5a12",n.lineWidth=1,n.fillRect(0,-9,C,18),n.strokeRect(0,-9,C,18);let _=c/bl;n.fillStyle="#7a5a12",n.font="700 9px system-ui, sans-serif",n.textAlign="center";for(let D=0,I=0;D<=C+.5;D+=_/2,I++)n.fillRect(D-.5,-9,1,I%2?4:8),I%2===0&&I>0&&_>14&&n.fillText(String(I/2),D,8);n.restore();for(let[D,I,k]of[[M,b,"A"],[y,T,"B"]])n.beginPath(),n.arc(D,I,10,0,Math.PI*2),n.fillStyle="#b8860b",n.fill(),n.strokeStyle="#fff",n.lineWidth=2,n.stroke(),n.fillStyle="#fff",n.font="800 11px system-ui, sans-serif",n.textAlign="center",n.fillText(k,D,I+4);let A=u(),R=D=>Math.round(D).toLocaleString("en-US");t(".gg-ms-scale").textContent=`1 : ${R(A.scale)}`,t(".gg-ms-means").textContent=`1 cm = ${A.scale/100>=1e3?A.scale/1e5+" km":R(A.scale/100)+" m"}`;let P=Math.round(A.cm*10)/10,L=yl(P,A.scale);t(".gg-ms-cm").textContent=`${P.toFixed(1)} cm`,t(".gg-ms-calc").textContent=`${P.toFixed(1)} \xD7 ${R(A.scale)} = ${R(P*A.scale)} cm`,t(".gg-ms-ground").textContent=L>=1e3?`${(L/1e3).toFixed(2)} km`:`${R(L)} m`,i.querySelectorAll("[data-mv]").forEach(D=>D.setAttribute("aria-pressed",String(D.dataset.mv===r.view)))}let x=M=>{let b=e.getBoundingClientRect();return[(M.clientX-b.left)*(c/b.width),(M.clientY-b.top)*(l/b.height)]},E=(M,b)=>["a","b"].find(y=>{let[T,w]=o.toXY(...r[y]);return Math.hypot(M-T,b-w)<18});e.addEventListener("touchstart",M=>{let b=M.touches[0],y=e.getBoundingClientRect();E((b.clientX-y.left)*(c/y.width),(b.clientY-y.top)*(l/y.height))&&M.preventDefault()},{passive:!1}),e.addEventListener("pointerdown",M=>{let[b,y]=x(M),T=E(b,y);if(T){r.drag=T;try{e.setPointerCapture(M.pointerId)}catch{}}}),e.addEventListener("pointermove",M=>{let[b,y]=x(M);if(!r.drag){e.style.cursor=E(b,y)?"grab":"";return}r[r.drag]=o.toKm(Math.max(4,Math.min(c-4,b)),Math.max(4,Math.min(l-4,y))),g()});let f=()=>{r.drag=null};e.addEventListener("pointerup",f),e.addEventListener("pointercancel",f);let h={state:r,info:u,setView(M){r.view=M;let b=Dn[M],y=T=>Math.abs(T[0]-b.cx)<b.km*.45&&Math.abs(T[1]-b.cy)<b.km*.45;(!y(r.a)||!y(r.b))&&(r.a=[b.cx-b.km*.3,b.cy-b.km*.15],r.b=[b.cx+b.km*.25,b.cy+b.km*.2]),m()},setRuler(M,b){r.a=M,r.b=b,g()}};return i.querySelectorAll("[data-mv]").forEach(M=>M.addEventListener("click",()=>h.setView(M.dataset.mv))),i.querySelectorAll("[data-pair]").forEach(M=>M.addEventListener("click",()=>{let[b,y]=M.dataset.pair.split(",");h.setView("island"),h.setRuler(s(b),s(y))})),new ResizeObserver(m).observe(e),m(),i.__measure=h,h}function Ih(i){let t={i:0,tries:0,first:0,done:!1,solved:!1,log:[]};return{state:t,total:i.length,question:()=>i[t.i],answer(e){if(t.done||t.solved)return null;let n=i[t.i];t.tries++;let s=e===n.answer;if(s){t.solved=!0;let r=t.tries===1;return r&&t.first++,t.log.push({q:t.i,tries:t.tries,first:r}),{correct:s,first:r}}return{correct:s,first:!1}},next(){return t.solved?(t.solved=!1,t.tries=0,t.i>=i.length-1?(t.done=!0,!1):(t.i++,!0)):!1},reset(){t.i=0,t.tries=0,t.first=0,t.done=!1,t.solved=!1,t.log=[]}}}var Yg={cx:-.6,cy:-.3,km:10};function Lh(i){let t=P=>i.querySelector(P),e=JSON.parse(t('script[type="application/json"]').textContent),n=Ih(e.questions),s=t(".gg-lg-map"),r=s.getContext("2d"),a=t(".gg-lg-opts"),o=t(".gg-ft-k"),c=t(".gg-ft-score"),l=t(".gg-ft-msg"),d=t(".gg-ft-next"),m=t(".gg-ft-steps");m.innerHTML=e.questions.map(()=>"<i></i>").join("");let u=null,g=null,x=0,E=0,f=1,h=!1,M=0,b=0;function y(){if(x=s.clientWidth,E=s.clientHeight,!x||!E)return;f=Math.min(window.devicePixelRatio||1,2),s.width=Math.round(x*f),s.height=Math.round(E*f),u=document.createElement("canvas"),u.width=s.width,u.height=s.height;let P=u.getContext("2d");P.setTransform(f,0,0,f,0,0),g=Ga(P,x,E,{view:Yg,dpr:f,labels:!1}),Ha(P,x-30,34),Wa(P,14,E-16,g.pxPerKm,x*.3),T()}function T(P=performance.now()){if(!u||(r.setTransform(1,0,0,1,0,0),r.drawImage(u,0,0),r.setTransform(f,0,0,f,0,0),n.state.done))return;let L=n.question(),D=Ee[L.from||L.at||"trailhead"],[I,k]=g.toXY(D.x,D.y),Y=(Math.sin((P-M)/260)+1)/2;if(r.beginPath(),r.arc(I,k,16+Y*6,0,Math.PI*2),r.strokeStyle=`rgba(255,77,138,${.9-Y*.5})`,r.lineWidth=3,r.stroke(),r.font="800 11px system-ui, sans-serif",r.textAlign="center",r.lineWidth=3,r.strokeStyle="#fff",r.strokeText("START \xB7 \u8D77\u9EDE",I,k-24),r.fillStyle="#d8336b",r.fillText("START \xB7 \u8D77\u9EDE",I,k-24),h&&L.show){let[$,et]=L.show.map(q=>g.toXY(Ee[q].x,Ee[q].y));r.setLineDash([6,5]),r.strokeStyle="#d8336b",r.lineWidth=2.4,r.beginPath(),r.moveTo($[0],$[1]),r.lineTo(et[0],et[1]),r.stroke(),r.setLineDash([]),r.beginPath(),r.arc(et[0],et[1],15,0,Math.PI*2),r.strokeStyle="#2f9e63",r.lineWidth=3,r.stroke()}}function w(P){T(P),b=requestAnimationFrame(w)}new IntersectionObserver(P=>{P[0].isIntersecting?b||(b=requestAnimationFrame(w)):(cancelAnimationFrame(b),b=0)}).observe(i);let C=P=>e.labels[P]||{en:P,zh:P};function _(){let P=n.state,L=n.question();h=!1,M=performance.now(),o.textContent=`Question ${P.i+1} of ${n.total} \xB7 \u7B2C ${P.i+1} \u984C\uFF08\u5171 ${n.total} \u984C\uFF09`,c.textContent=`${P.first} / ${P.log.length}`,t(".gg-lg-q-en").textContent=L.en,t(".gg-lg-q-zh").textContent=L.zh,a.innerHTML=L.options.map(D=>{let I=C(D),k=Ee[D]?`<img src="${ns(D,26)}" alt="">`:`<b class="gg-lg-d">${I.icon||""}</b>`;return`<button type="button" class="gg-ft-opt gg-lg-opt" data-pick="${D}">${k}<span class="gg-ft-lab">${I.en}<span class="zh">${I.zh}</span></span></button>`}).join(""),a.querySelectorAll("[data-pick]").forEach(D=>D.addEventListener("click",()=>A(D.dataset.pick))),l.className="gg-ft-msg",l.innerHTML=`${e.start_en}<span class="zh">${e.start_zh}</span>`,d.hidden=!0,[...m.children].forEach((D,I)=>{D.className=I<P.log.length?P.log[I].first?"is-first":"is-later":I===P.i?"is-now":""}),T()}function A(P){let L=n.question(),D=n.answer(String(P)===String(L.answer)?L.answer:P);if(!D)return null;let I=a.querySelector(`[data-pick="${P}"]`),k=[...a.querySelectorAll("[data-pick]")];return D.correct?(h=!0,I.classList.add("is-right"),k.forEach(Y=>{Y.disabled=!0}),l.className="gg-ft-msg is-right",l.innerHTML=`<b>${D.first?"Right on the first try. \xB7 \u7B2C\u4E00\u6B21\u5C31\u7B54\u5C0D\u3002":"That is it. \xB7 \u7B54\u5C0D\u4E86\u3002"}</b> ${L.why_en}<span class="zh">${L.why_zh}</span>`,d.textContent=n.state.i>=n.total-1?"See your result \xB7 \u770B\u7D50\u679C":"Next question \xB7 \u4E0B\u4E00\u984C",d.hidden=!1,c.textContent=`${n.state.first} / ${n.state.log.length}`,[...m.children][n.state.i].className=D.first?"is-first":"is-later"):(I.classList.add("is-wrong"),I.disabled=!0,l.className="gg-ft-msg is-wrong",l.innerHTML=`<b>Not that one. Look at the map again. \xB7 \u4E0D\u662F\u9019\u500B\uFF0C\u518D\u770B\u4E00\u6B21\u5730\u5716\u3002</b> ${e.hint[L.type].en}<span class="zh">${e.hint[L.type].zh}</span>`),T(),D}function R(){if(n.next()){_();return}if(!n.state.done)return;let P=n.state.first;t(".gg-lg-q-en").textContent=`You answered ${P} of ${n.total} questions right on the first try.`,t(".gg-lg-q-zh").textContent=`${n.total} \u984C\u88E1\uFF0C\u4F60\u6709 ${P} \u984C\u7B2C\u4E00\u6B21\u5C31\u7B54\u5C0D\u3002`,o.textContent="Finished \xB7 \u5B8C\u6210",a.innerHTML="",l.className="gg-ft-msg",l.innerHTML=`${e.end_en}<span class="zh">${e.end_zh}</span>`,d.textContent="Play again \xB7 \u518D\u73A9\u4E00\u6B21",d.hidden=!1,T()}return d.addEventListener("click",()=>{n.state.done?(n.reset(),_()):R()}),new ResizeObserver(y).observe(s),y(),_(),i.__legend={game:n,pick:A,next:R,reset(){n.reset(),_()}},i.__legend}var Tl=za(),Zg=1.5,Dh=([i,t],e)=>{let n=!1;for(let s=0,r=e.length-1;s<e.length;r=s++){let[a,o]=e[s],[c,l]=e[r];o>t!=l>t&&i<(c-a)*(t-o)/(l-o)+a&&(n=!n)}return n};function $g(i){let t=h=>i.querySelector(h),e=t(".al-space-cv"),n=t(".al-space"),s={t:0,view:"island",playing:!1,dir:1,hot:null},r=t(".gg-mv-t");function a(){r.value=Math.round(s.t*100);let h=s.t<.15?"side":s.t>.9?"map":"mid";i.querySelectorAll(".gg-mv-note [data-when]").forEach(b=>{b.hidden=b.dataset.when!==h}),i.querySelectorAll("[data-mview]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.mview===s.view)));let M=Dn[s.view];t(".gg-mv-ratio").textContent=`1 : ${Math.round(M.km*1e5/20).toLocaleString("en-US")}`,t(".gg-mv-wide").textContent=M.km>=1?`${M.km} km`:`${M.km*1e3} m`,t(".gg-mv-play .al-play-t").textContent=s.playing?"Pause \xB7 \u66AB\u505C":s.t>.5?"Back to the side view \xB7 \u56DE\u5230\u5074\u9762":"Look straight down \xB7 \u8F49\u5230\u6B63\u4E0A\u65B9"}let o=null;try{o=c()}catch{o=null}o||i.classList.add("al-nogl");function c(){let h;try{h=new La({canvas:e,antialias:!0})}catch{return null}h.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),h.setClearColor(659746,1);let M=new ms,b=new Le(34,1,.05,200);M.add(new Ts(16777215,.95));let y=new bs(16777215,1.8);y.position.set(-5,8,4),M.add(y);let T=wh({M:Tl,n:200,exag:Zg});T.show("water",!1),M.add(T.group);let w=T.k,C=(j,S,p=0)=>Math.max(0,Tl.h(j,S))*w+p;function _(j,S,p,N=.004,z=!1){let H=[];for(let J=0;J+1<j.length;J++){let[at,Mt]=j[J],[ut,ht]=j[J+1],St=Math.max(2,Math.ceil(Math.hypot(ut-at,ht-Mt)/.03));for(let Ct=0;Ct<St;Ct++)H.push([at+(ut-at)*Ct/St,Mt+(ht-Mt)*Ct/St])}H.push(j[j.length-1]);let st=[],lt=[];for(let J=0;J<H.length;J++){let at=H[J],Mt=H[Math.min(J+1,H.length-1)],ut=H[Math.max(J-1,0)],ht=Mt[0]-ut[0],St=Mt[1]-ut[1],Ct=Math.hypot(ht,St)||1,Bt=-St/Ct*S/2,U=ht/Ct*S/2;if(st.push(at[0]+Bt,C(at[0]+Bt,at[1]+U,N),-(at[1]+U),at[0]-Bt,C(at[0]-Bt,at[1]-U,N),-(at[1]-U)),J+1<H.length&&(!z||J%3!==2)){let ct=2*J;lt.push(ct,ct+1,ct+2,ct+1,ct+3,ct+2)}}let Z=new Ce;return Z.setAttribute("position",new ye(new Float32Array(st),3)),Z.setIndex(lt),Z.computeBoundingSphere(),new Zt(Z,new Je({color:p,side:we,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}))}let A=new Ze;M.add(A),A.add(_(In.river.pts,.07,3112918));for(let j of["road","lane","coast"])A.add(_(In[j].pts,.06,3812900,.005)),A.add(_(In[j].pts,.034,16765806,.007));A.add(_(In.trail.pts,.03,12597547,.006,!0));for(let j of Ln.rice.polys){let S=j.map(N=>N[1]),p=j.map(N=>N[0]);for(let N=Math.min(...S)+.06;N<Math.max(...S)-.04;N+=.12)for(let z=Math.min(...p)+.06;z<Math.max(...p)-.04;z+=.16){if(!Dh([z,N],j))continue;let H=new Zt(new De(.14,.004,.1),new $n({color:(Math.round(z*10)+Math.round(N*10))%2?12574858:10473322}));H.position.set(z,C(z,N,.004),-N),A.add(H)}}let R=new Ze;M.add(R);let P=[],L=j=>{let S=new $n({color:j,transparent:!0});return P.push(S),S},D=(j,S,p,N=0)=>(j.position.set(S,C(S,p)+N,-p),R.add(j),j),I=L(15986404),k=L(11876395),Y=L(5982778),$=L(16777215),et=L(9067051),q=L(4160818),tt=L(5937726),nt=L(3108789),ot=L(16765498);for(let[j,S,p,N]of Ml){let z=.03+Math.abs(Math.sin(j*37+S*17))*.03;D(new Zt(new De(p,z,N),[I,Y][Math.abs(Math.round(j*50+S*30))%2?0:1]),j,S,z/2)}{let j=Ee.school;D(new Zt(new De(.22,.06,.1),I),j.x,j.y,.03),D(new Zt(new qn(.004,.004,.16),$),j.x+.12,j.y,.08),D(new Zt(new De(.05,.03,.004),k),j.x+.145,j.y,.145)}{let j=Ee.temple;D(new Zt(new De(.14,.05,.1),I),j.x,j.y,.025);let S=D(new Zt(new Yn(.12,.06,4),k),j.x,j.y,.08);S.rotation.y=Math.PI/4}{let j=Ee.lighthouse;D(new Zt(new qn(.025,.035,.22,16),$),j.x,j.y,.11),D(new Zt(new qn(.03,.03,.03,16),ot),j.x,j.y,.235),D(new Zt(new Yn(.035,.04,16),k),j.x,j.y,.27)}{let j=Ee.harbor,S=D(new Zt(new De(.34,.02,.05),et),j.x+.2,j.y+.02,.01);S.position.y=.01;for(let[p,N]of[[.22,.09],[.32,-.06]]){let z=D(new Zt(new De(.1,.025,.04),nt),j.x+p,j.y+N,0);z.position.y=.012}}{let j=Ee.hut;D(new Zt(new De(.07,.04,.06),I),j.x,j.y,.02);let S=D(new Zt(new Yn(.06,.04,4),k),j.x,j.y,.06);S.rotation.y=Math.PI/4}{let j=Ee.bridge,S=D(new Zt(new De(.1,.012,.07),L(10132122)),j.x,j.y,.015);S.rotation.y=0}{let j=Ln.forest.polys[0],S=j.map(H=>H[0]),p=j.map(H=>H[1]),N=3,z=()=>(N=N*16807%2147483647,N/2147483647);for(let H=0;H<260;H++){let st=Math.min(...S)+z()*(Math.max(...S)-Math.min(...S)),lt=Math.min(...p)+z()*(Math.max(...p)-Math.min(...p));if(!Dh([st,lt],j))continue;let Z=.06+z()*.05;D(new Zt(new Yn(.03,Z,6),z()>.5?q:tt),st,lt,Z/2)}}let rt=Sh(t(".al-labels"),e,b),It=Object.entries(Ee).map(([j,S])=>{let p=rt.add(`gg-sym gg-sym-${j}`,`<img src="${ns(j,26)}" alt=""><span>${S.en}<i>${S.zh}</i></span>`);return p.style.opacity=0,{key:j,p:S,el:p}}),bt=[["rice",-2.65,-2.3],["forest",-1.7,1.8],["town",-1.85,-1.15]].map(([j,S,p])=>({key:j,x:S,y:p,el:(()=>{let N=rt.add("gg-sym gg-sym-area",`<img src="${ns(j,22)}" alt=""><span>${es[j].en}<i>${es[j].zh}</i></span>`);return N.style.opacity=0,N})()})),Lt=new B;function X(){let j=fn.smoothstep(s.t,.45,.9);for(let S of It)Lt.set(S.p.x,C(S.p.x,S.p.y,.02),-S.p.y),rt.place(S.el,Lt,0),S.el.style.opacity=j,S.el.classList.toggle("is-hot",s.hot===S.key);for(let S of bt)Lt.set(S.x,C(S.x,S.y,.02),-S.y),rt.place(S.el,Lt,0),S.el.style.opacity=j*.95,S.el.classList.toggle("is-hot",s.hot===S.key)}let K=new Fa(b,e);K.enableDamping=!0,K.dampingFactor=.12,K.enablePan=!1,K.enableZoom=!1;let dt=-.6,Tt=new B,ft={cx:Dn.island.cx,cy:Dn.island.cy,km:10},Dt={...ft};function ne(){let j=fn.lerp(1,.012,fn.smoothstep(s.t,0,1)),S=b.aspect||1,p=Dt.km/2/Math.tan(34*Math.PI/360)/Math.min(1,S)*1.05;Tt.set(Dt.cx,Math.max(0,Tl.h(Dt.cx,Dt.cy))*w*(1-s.t),-Dt.cy),b.position.set(Tt.x+Math.sin(dt)*Math.sin(j)*p,Tt.y+Math.cos(j)*p,Tt.z+Math.cos(dt)*Math.sin(j)*p),b.up.set(0,1,0),b.lookAt(Tt),K.target.copy(Tt);let N=1-fn.smoothstep(s.t,.4,.85);for(let z of P)z.opacity=N;R.visible=N>.01}K.enableRotate=!1;let Ut=null;e.addEventListener("pointerdown",j=>{Ut={x:j.clientX,az:dt};try{e.setPointerCapture(j.pointerId)}catch{}}),e.addEventListener("pointermove",j=>{Ut&&(dt=Ut.az-(j.clientX-Ut.x)*.008,f())});let Ht=()=>{Ut=null};e.addEventListener("pointerup",Ht),e.addEventListener("pointercancel",Ht);let $t=t(".gg-mv-north i"),kt=t(".gg-mv-bar"),Jt=t(".gg-mv-bar i"),pe=t(".gg-mv-bar b"),me=new B,jt=new B;function de(){let j=e.clientWidth,S=e.clientHeight;me.copy(Tt).project(b),jt.copy(Tt).add(new B(0,0,-.5)).project(b);let p=Math.atan2((jt.x-me.x)*j,(jt.y-me.y)*S);$t.style.transform=`rotate(${p}rad)`,jt.copy(Tt).add(new B(1,0,0)).project(b);let N=Math.hypot((jt.x-me.x)*j/2,(jt.y-me.y)*S/2),z=Sl(N,j*.3);Jt.style.width=`${z.px}px`,pe.textContent=z.label,kt.style.opacity=fn.smoothstep(s.t,.75,.95)}function O(){let j=n.clientWidth,S=n.clientHeight;!j||!S||(h.setSize(j,S,!1),b.aspect=j/S,b.updateProjectionMatrix(),ne())}function xe(){h.render(M,b),X(),de()}return new ResizeObserver(()=>{O(),xe()}).observe(n),O(),{renderer:h,camera:b,render:xe,placeCamera:ne,cur:Dt,want:ft,setAz(j){dt=j},getAz:()=>dt,step(j){let S=!1;for(let p of["cx","cy","km"]){let N=ft[p]-Dt[p];Math.abs(N)>1e-4?(Dt[p]+=N*Math.min(1,j*4),S=!0):Dt[p]=ft[p]}return S}}}let l={state:s,ready:()=>!0,setT(h){s.t=fn.clamp(h,0,1),o&&o.placeCamera(),a(),f()},setView(h,M){s.view=h,o&&(Object.assign(o.want,Dn[h]),M&&Object.assign(o.cur,Dn[h]),o.placeCamera()),a(),f()},spin(h){o&&(o.setAz(h*Math.PI/180),o.placeCamera(),f())},play(){s.playing=!s.playing,s.dir=s.t>.5?-1:1,a(),f()},hot(h){s.hot=s.hot===h?null:h,i.querySelectorAll("[data-sym]").forEach(M=>M.classList.toggle("is-hot",M.dataset.sym===s.hot)),f()},demo(h){h==="down"?(l.setView("island"),s.t=0,s.dir=1,s.playing=!0):h==="symbols"?(l.setT(1),l.setView("town"),l.hot("school"),s.hot="school"):h==="scale"?(l.setT(1),l.setView("street")):h==="north"&&(l.setT(.2),l.setView("island"),s.spinTo=(o?o.getAz():0)+Math.PI),a(),f()},info(){return{t:s.t,view:s.view,az:o?o.getAz():null,northDeg:o?parseFloat((t(".gg-mv-north i").style.transform.match(/-?[\d.e-]+/)||[0])[0])*180/Math.PI:null}},run(h){for(let M=0,b=Math.ceil(h*60);M<b;M++)x(1/60)},render(){o&&o.render()}};r.addEventListener("input",()=>{s.playing=!1,l.setT(r.value/100)}),t(".gg-mv-play").addEventListener("click",()=>l.play()),i.querySelectorAll("[data-mview]").forEach(h=>h.addEventListener("click",()=>l.setView(h.dataset.mview))),i.querySelectorAll("[data-sym]").forEach(h=>{h.querySelector("img").src=ns(h.dataset.sym,26),h.addEventListener("click",()=>{s.t<.9&&l.setT(1),l.hot(h.dataset.sym)})}),o&&t(".al-home").addEventListener("click",()=>{o.setAz(-.6),l.setView(s.view)});let d=0,m=0,u=!0,g=0;function x(h){let M=!1;if(s.playing&&(s.t=fn.clamp(s.t+s.dir*h/4,0,1),(s.t===0||s.t===1)&&(s.playing=!1),a(),M=!0),o&&s.spinTo!=null){let b=o.getAz(),y=s.spinTo-b;Math.abs(y)<.01?s.spinTo=null:o.setAz(b+y*Math.min(1,h*1.6)),M=!0}return o&&(o.step(h)&&(M=!0),o.placeCamera()),M}function E(h){d=0;let M=m?Math.min(.05,(h-m)/1e3):.016;m=h;let b=x(M);o&&o.render(),g=b?0:g+1,u&&g<60&&(d=requestAnimationFrame(E))}function f(){g=0,!d&&u&&(m=0,d=requestAnimationFrame(E))}return new IntersectionObserver(h=>{u=h[0].isIntersecting,u&&f()}).observe(i),a(),f(),i.__lab=l,l}function Nh(){document.querySelectorAll("[data-gg-measure]").forEach(i=>Ph(i)),document.querySelectorAll("[data-gg-legend]").forEach(i=>Lh(i))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Nh):Nh();bh("[data-geomapview-lab]",$g,{demo:(i,t)=>i.demo(t)});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
