(()=>{var Wn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Jn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},pc=0,Sa=1,gc=2;var Ss=1,mc=2,Hi=3,Kn=0,Ue=1,Te=2,wn=0,ki=1,ba=2,Ia=3,Da=4,Bc=5;var ai=100,wc=101,Cc=102,Ec=103,_c=104,Mc=200,xc=201,yc=202,vc=203,Ta=204,Qa=205,Sc=206,bc=207,Ic=208,Dc=209,Tc=210,Qc=211,Fc=212,Rc=213,Uc=214,ur=0,dr=1,fr=2,bi=3,pr=4,gr=5,mr=6,Br=7,Wr=0,Pc=1,Lc=2,An=0,Fa=1,Ra=2,Ua=3,Pa=4,La=5,Na=6,Ga=7;var Oa=300,Xn=301,Ai=302,Jr=303,Kr=304,bs=306,wr=1e3,pn=1001,Cr=1002,_e=1003,Nc=1004;var Is=1005;var xe=1006,Xr=1007;var Zn=1008;var He=1009,Ha=1010,ka=1011,Vi=1012,Zr=1013,cn=1014,ln=1015,hn=1016,qr=1017,jr=1018,zi=1020,Va=35902,za=35899,Ya=1021,Wa=1022,je=1023,mn=1026,qn=1027,Ja=1028,$r=1029,jn=1030,to=1031;var eo=1033,Ds=33776,Ts=33777,Qs=33778,Fs=33779,no=35840,io=35841,so=35842,ro=35843,oo=36196,ao=37492,Ao=37496,co=37488,lo=37489,Rs=37490,ho=37491,uo=37808,fo=37809,po=37810,go=37811,mo=37812,Bo=37813,wo=37814,Co=37815,Eo=37816,_o=37817,Mo=37818,xo=37819,yo=37820,vo=37821,So=36492,bo=36494,Io=36495,Do=36283,To=36284,Us=36285,Qo=36286;var As=2300,Er=2301,lr=2302,Ba=2303,wa=2400,Ca=2401,Ea=2402;var Gc=3200;var Fo=0,Oc=1,Dn="",Le="srgb",cs="srgb-linear",ls="linear",jt="srgb";var hr=7680;var Hc=519,kc=512,Vc=513,zc=514,Ro=515,Yc=516,Wc=517,Uo=518,Jc=519,Kc=35044;var Ka="300 es",sn=2e3,Ii=2001;function rh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function oh(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function hs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Xc(){let i=hs("canvas");return i.style.display="block",i}var GA={},Di=null;function Xa(...i){let t="THREE."+i.shift();Di?Di("log",t,...i):console.log(t,...i)}function Zc(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Tt(...i){i=Zc(i);let t="THREE."+i.shift();if(Di)Di("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Ft(...i){i=Zc(i);let t="THREE."+i.shift();if(Di)Di("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function si(...i){let t=i.join(" ");t in GA||(GA[t]=!0,Tt(...i))}function qc(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var jc={[ur]:dr,[fr]:mr,[pr]:Br,[bi]:gr,[dr]:ur,[mr]:fr,[Br]:pr,[gr]:bi},rn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],OA=1234567,os=Math.PI/180,Ti=180/Math.PI;function Yi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(be[i&255]+be[i>>8&255]+be[i>>16&255]+be[i>>24&255]+"-"+be[t&255]+be[t>>8&255]+"-"+be[t>>16&15|64]+be[t>>24&255]+"-"+be[e&63|128]+be[e>>8&255]+"-"+be[e>>16&255]+be[e>>24&255]+be[n&255]+be[n>>8&255]+be[n>>16&255]+be[n>>24&255]).toLowerCase()}function Vt(i,t,e){return Math.max(t,Math.min(e,i))}function Za(i,t){return(i%t+t)%t}function ah(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Ah(i,t,e){return i!==t?(e-i)/(t-i):0}function as(i,t,e){return(1-e)*i+e*t}function ch(i,t,e,n){return as(i,t,1-Math.exp(-e*n))}function lh(i,t=1){return t-Math.abs(Za(i,t*2)-t)}function hh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function uh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function dh(i,t){return i+Math.floor(Math.random()*(t-i+1))}function fh(i,t){return i+Math.random()*(t-i)}function ph(i){return i*(.5-Math.random())}function gh(i){i!==void 0&&(OA=i);let t=OA+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function mh(i){return i*os}function Bh(i){return i*Ti}function wh(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Ch(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Eh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function _h(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),A=r((t+n)/2),u=o((t+n)/2),d=r((t-n)/2),l=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*u,c*d,c*l,a*A);break;case"YZY":i.set(c*l,a*u,c*d,a*A);break;case"ZXZ":i.set(c*d,c*l,a*u,a*A);break;case"XZX":i.set(a*u,c*m,c*f,a*A);break;case"YXY":i.set(c*f,a*u,c*m,a*A);break;case"ZYZ":i.set(c*m,c*f,a*u,a*A);break;default:Tt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function vi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Re(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var qa={DEG2RAD:os,RAD2DEG:Ti,generateUUID:Yi,clamp:Vt,euclideanModulo:Za,mapLinear:ah,inverseLerp:Ah,lerp:as,damp:ch,pingpong:lh,smoothstep:hh,smootherstep:uh,randInt:dh,randFloat:fh,randFloatSpread:ph,seededRandom:gh,degToRad:mh,radToDeg:Bh,isPowerOfTwo:wh,ceilPowerOfTwo:Ch,floorPowerOfTwo:Eh,setQuaternionFromProperEuler:_h,normalize:Re,denormalize:vi},nA=class nA{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};nA.prototype.isVector2=!0;var Rt=nA,We=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],A=n[s+1],u=n[s+2],d=n[s+3],l=r[o+0],f=r[o+1],m=r[o+2],_=r[o+3];if(d!==_||c!==l||A!==f||u!==m){let p=c*l+A*f+u*m+d*_;p<0&&(l=-l,f=-f,m=-m,_=-_,p=-p);let h=1-a;if(p<.9995){let E=Math.acos(p),y=Math.sin(E);h=Math.sin(h*E)/y,a=Math.sin(a*E)/y,c=c*h+l*a,A=A*h+f*a,u=u*h+m*a,d=d*h+_*a}else{c=c*h+l*a,A=A*h+f*a,u=u*h+m*a,d=d*h+_*a;let E=1/Math.sqrt(c*c+A*A+u*u+d*d);c*=E,A*=E,u*=E,d*=E}}t[e]=c,t[e+1]=A,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],A=n[s+2],u=n[s+3],d=r[o],l=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+u*d+c*f-A*l,t[e+1]=c*m+u*l+A*d-a*f,t[e+2]=A*m+u*f+a*l-c*d,t[e+3]=u*m-a*d-c*l-A*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,A=a(n/2),u=a(s/2),d=a(r/2),l=c(n/2),f=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=l*u*d+A*f*m,this._y=A*f*d-l*u*m,this._z=A*u*m+l*f*d,this._w=A*u*d-l*f*m;break;case"YXZ":this._x=l*u*d+A*f*m,this._y=A*f*d-l*u*m,this._z=A*u*m-l*f*d,this._w=A*u*d+l*f*m;break;case"ZXY":this._x=l*u*d-A*f*m,this._y=A*f*d+l*u*m,this._z=A*u*m+l*f*d,this._w=A*u*d-l*f*m;break;case"ZYX":this._x=l*u*d-A*f*m,this._y=A*f*d+l*u*m,this._z=A*u*m-l*f*d,this._w=A*u*d+l*f*m;break;case"YZX":this._x=l*u*d+A*f*m,this._y=A*f*d+l*u*m,this._z=A*u*m-l*f*d,this._w=A*u*d-l*f*m;break;case"XZY":this._x=l*u*d-A*f*m,this._y=A*f*d-l*u*m,this._z=A*u*m+l*f*d,this._w=A*u*d+l*f*m;break;default:Tt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],A=e[2],u=e[6],d=e[10],l=n+a+d;if(l>0){let f=.5/Math.sqrt(l+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-A)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(u-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+A)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-A)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+u)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+A)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Vt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,A=e._z,u=e._w;return this._x=n*u+o*a+s*A-r*c,this._y=s*u+o*c+r*a-n*A,this._z=r*u+o*A+n*c-s*a,this._w=o*u-n*a-s*c-r*A,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){let A=Math.acos(a),u=Math.sin(A);c=Math.sin(c*A)/u,e=Math.sin(e*A)/u,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},iA=class iA{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(HA.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(HA.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,A=2*(o*s-a*n),u=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+c*A+o*d-a*u,this.y=n+c*u+a*A-r*d,this.z=s+c*d+r*u-o*A,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Zo.copy(this).projectOnVector(t),this.sub(Zo)}reflect(t){return this.sub(Zo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};iA.prototype.isVector3=!0;var P=iA,Zo=new P,HA=new We,sA=class sA{constructor(t,e,n,s,r,o,a,c,A){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,A)}set(t,e,n,s,r,o,a,c,A){let u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=A,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],A=n[1],u=n[4],d=n[7],l=n[2],f=n[5],m=n[8],_=s[0],p=s[3],h=s[6],E=s[1],y=s[4],w=s[7],M=s[2],x=s[5],S=s[8];return r[0]=o*_+a*E+c*M,r[3]=o*p+a*y+c*x,r[6]=o*h+a*w+c*S,r[1]=A*_+u*E+d*M,r[4]=A*p+u*y+d*x,r[7]=A*h+u*w+d*S,r[2]=l*_+f*E+m*M,r[5]=l*p+f*y+m*x,r[8]=l*h+f*w+m*S,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],A=t[7],u=t[8];return e*o*u-e*a*A-n*r*u+n*a*c+s*r*A-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],A=t[7],u=t[8],d=u*o-a*A,l=a*c-u*r,f=A*r-o*c,m=e*d+n*l+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return t[0]=d*_,t[1]=(s*A-u*n)*_,t[2]=(a*n-s*o)*_,t[3]=l*_,t[4]=(u*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*c-A*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),A=Math.sin(r);return this.set(n*c,n*A,-n*(c*o+A*a)+o+t,-s*A,s*c,-s*(-A*o+c*a)+a+e,0,0,1),this}scale(t,e){return si("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(qo.makeScale(t,e)),this}rotate(t){return si("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(qo.makeRotation(-t)),this}translate(t,e){return si("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(qo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};sA.prototype.isMatrix3=!0;var Pt=sA,qo=new Pt,kA=new Pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),VA=new Pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mh(){let i={enabled:!0,workingColorSpace:cs,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===jt&&(s.r=Sn(s.r),s.g=Sn(s.g),s.b=Sn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===jt&&(s.r=Si(s.r),s.g=Si(s.g),s.b=Si(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Dn?ls:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return si("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return si("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[cs]:{primaries:t,whitePoint:n,transfer:ls,toXYZ:kA,fromXYZ:VA,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Le},outputColorSpaceConfig:{drawingBufferColorSpace:Le}},[Le]:{primaries:t,whitePoint:n,transfer:jt,toXYZ:kA,fromXYZ:VA,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Le}}}),i}var Yt=Mh();function Sn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Si(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var di,_r=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{di===void 0&&(di=hs("canvas")),di.width=t.width,di.height=t.height;let s=di.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=di}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=hs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Sn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Sn(e[n]/255)*255):e[n]=Sn(e[n]);return{data:e,width:t.width,height:t.height}}else return Tt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},xh=0,Qi=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:xh++}),this.uuid=Yi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(jo(s[o].image)):r.push(jo(s[o]))}else r=jo(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function jo(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?_r.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Tt("Texture: Unable to serialize Texture."),{})}var yh=0,$o=new P,Ge=class i extends rn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=pn,s=pn,r=xe,o=Zn,a=je,c=He,A=i.DEFAULT_ANISOTROPY,u=Dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yh++}),this.uuid=Yi(),this.name="",this.source=new Qi(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=A,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Rt(0,0),this.repeat=new Rt(1,1),this.center=new Rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize($o).x}get height(){return this.source.getSize($o).y}get depth(){return this.source.getSize($o).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Tt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Tt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Oa)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case wr:t.x=t.x-Math.floor(t.x);break;case pn:t.x=t.x<0?0:1;break;case Cr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case wr:t.y=t.y-Math.floor(t.y);break;case pn:t.y=t.y<0?0:1;break;case Cr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=Oa;Ge.DEFAULT_ANISOTROPY=1;var rA=class rA{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,A=c[0],u=c[4],d=c[8],l=c[1],f=c[5],m=c[9],_=c[2],p=c[6],h=c[10];if(Math.abs(u-l)<.01&&Math.abs(d-_)<.01&&Math.abs(m-p)<.01){if(Math.abs(u+l)<.1&&Math.abs(d+_)<.1&&Math.abs(m+p)<.1&&Math.abs(A+f+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(A+1)/2,w=(f+1)/2,M=(h+1)/2,x=(u+l)/4,S=(d+_)/4,B=(m+p)/4;return y>w&&y>M?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=x/n,r=S/n):w>M?w<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(w),n=x/s,r=B/s):M<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),n=S/r,s=B/r),this.set(n,s,r,e),this}let E=Math.sqrt((p-m)*(p-m)+(d-_)*(d-_)+(l-u)*(l-u));return Math.abs(E)<.001&&(E=1),this.x=(p-m)/E,this.y=(d-_)/E,this.z=(l-u)/E,this.w=Math.acos((A+f+h-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this.w=Vt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this.w=Vt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};rA.prototype.isVector4=!0;var ce=rA,Mr=class extends rn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new Ge(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:xe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Qi(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Oe=class extends Mr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},us=class extends Ge{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=_e,this.minFilter=_e,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var xr=class extends Ge{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=_e,this.minFilter=_e,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Yr=class Yr{constructor(t,e,n,s,r,o,a,c,A,u,d,l,f,m,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,A,u,d,l,f,m,_,p)}set(t,e,n,s,r,o,a,c,A,u,d,l,f,m,_,p){let h=this.elements;return h[0]=t,h[4]=e,h[8]=n,h[12]=s,h[1]=r,h[5]=o,h[9]=a,h[13]=c,h[2]=A,h[6]=u,h[10]=d,h[14]=l,h[3]=f,h[7]=m,h[11]=_,h[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Yr().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/fi.setFromMatrixColumn(t,0).length(),r=1/fi.setFromMatrixColumn(t,1).length(),o=1/fi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),A=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let l=o*u,f=o*d,m=a*u,_=a*d;e[0]=c*u,e[4]=-c*d,e[8]=A,e[1]=f+m*A,e[5]=l-_*A,e[9]=-a*c,e[2]=_-l*A,e[6]=m+f*A,e[10]=o*c}else if(t.order==="YXZ"){let l=c*u,f=c*d,m=A*u,_=A*d;e[0]=l+_*a,e[4]=m*a-f,e[8]=o*A,e[1]=o*d,e[5]=o*u,e[9]=-a,e[2]=f*a-m,e[6]=_+l*a,e[10]=o*c}else if(t.order==="ZXY"){let l=c*u,f=c*d,m=A*u,_=A*d;e[0]=l-_*a,e[4]=-o*d,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*u,e[9]=_-l*a,e[2]=-o*A,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let l=o*u,f=o*d,m=a*u,_=a*d;e[0]=c*u,e[4]=m*A-f,e[8]=l*A+_,e[1]=c*d,e[5]=_*A+l,e[9]=f*A-m,e[2]=-A,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let l=o*c,f=o*A,m=a*c,_=a*A;e[0]=c*u,e[4]=_-l*d,e[8]=m*d+f,e[1]=d,e[5]=o*u,e[9]=-a*u,e[2]=-A*u,e[6]=f*d+m,e[10]=l-_*d}else if(t.order==="XZY"){let l=o*c,f=o*A,m=a*c,_=a*A;e[0]=c*u,e[4]=-d,e[8]=A*u,e[1]=l*d+_,e[5]=o*u,e[9]=f*d-m,e[2]=m*d-f,e[6]=a*u,e[10]=_*d+l}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(vh,t,Sh)}lookAt(t,e,n){let s=this.elements;return Ve.subVectors(t,e),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),Rn.crossVectors(n,Ve),Rn.lengthSq()===0&&(Math.abs(n.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),Rn.crossVectors(n,Ve)),Rn.normalize(),Hs.crossVectors(Ve,Rn),s[0]=Rn.x,s[4]=Hs.x,s[8]=Ve.x,s[1]=Rn.y,s[5]=Hs.y,s[9]=Ve.y,s[2]=Rn.z,s[6]=Hs.z,s[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],A=n[12],u=n[1],d=n[5],l=n[9],f=n[13],m=n[2],_=n[6],p=n[10],h=n[14],E=n[3],y=n[7],w=n[11],M=n[15],x=s[0],S=s[4],B=s[8],v=s[12],D=s[1],Q=s[5],N=s[9],G=s[13],I=s[2],U=s[6],z=s[10],V=s[14],j=s[3],K=s[7],et=s[11],J=s[15];return r[0]=o*x+a*D+c*I+A*j,r[4]=o*S+a*Q+c*U+A*K,r[8]=o*B+a*N+c*z+A*et,r[12]=o*v+a*G+c*V+A*J,r[1]=u*x+d*D+l*I+f*j,r[5]=u*S+d*Q+l*U+f*K,r[9]=u*B+d*N+l*z+f*et,r[13]=u*v+d*G+l*V+f*J,r[2]=m*x+_*D+p*I+h*j,r[6]=m*S+_*Q+p*U+h*K,r[10]=m*B+_*N+p*z+h*et,r[14]=m*v+_*G+p*V+h*J,r[3]=E*x+y*D+w*I+M*j,r[7]=E*S+y*Q+w*U+M*K,r[11]=E*B+y*N+w*z+M*et,r[15]=E*v+y*G+w*V+M*J,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],A=t[13],u=t[2],d=t[6],l=t[10],f=t[14],m=t[3],_=t[7],p=t[11],h=t[15],E=c*f-A*l,y=a*f-A*d,w=a*l-c*d,M=o*f-A*u,x=o*l-c*u,S=o*d-a*u;return e*(_*E-p*y+h*w)-n*(m*E-p*M+h*x)+s*(m*y-_*M+h*S)-r*(m*w-_*x+p*S)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],A=t[6],u=t[10];return e*(o*u-a*A)-n*(r*u-a*c)+s*(r*A-o*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],A=t[7],u=t[8],d=t[9],l=t[10],f=t[11],m=t[12],_=t[13],p=t[14],h=t[15],E=e*a-n*o,y=e*c-s*o,w=e*A-r*o,M=n*c-s*a,x=n*A-r*a,S=s*A-r*c,B=u*_-d*m,v=u*p-l*m,D=u*h-f*m,Q=d*p-l*_,N=d*h-f*_,G=l*h-f*p,I=E*G-y*N+w*Q+M*D-x*v+S*B;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/I;return t[0]=(a*G-c*N+A*Q)*U,t[1]=(s*N-n*G-r*Q)*U,t[2]=(_*S-p*x+h*M)*U,t[3]=(l*x-d*S-f*M)*U,t[4]=(c*D-o*G-A*v)*U,t[5]=(e*G-s*D+r*v)*U,t[6]=(p*w-m*S-h*y)*U,t[7]=(u*S-l*w+f*y)*U,t[8]=(o*N-a*D+A*B)*U,t[9]=(n*D-e*N-r*B)*U,t[10]=(m*x-_*w+h*E)*U,t[11]=(d*w-u*x-f*E)*U,t[12]=(a*v-o*Q-c*B)*U,t[13]=(e*Q-n*v+s*B)*U,t[14]=(_*y-m*M-p*E)*U,t[15]=(u*M-d*y+l*E)*U,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,A=r*o,u=r*a;return this.set(A*o+n,A*a-s*c,A*c+s*a,0,A*a+s*c,u*a+n,u*c-s*o,0,A*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,A=r+r,u=o+o,d=a+a,l=r*A,f=r*u,m=r*d,_=o*u,p=o*d,h=a*d,E=c*A,y=c*u,w=c*d,M=n.x,x=n.y,S=n.z;return s[0]=(1-(_+h))*M,s[1]=(f+w)*M,s[2]=(m-y)*M,s[3]=0,s[4]=(f-w)*x,s[5]=(1-(l+h))*x,s[6]=(p+E)*x,s[7]=0,s[8]=(m+y)*S,s[9]=(p-E)*S,s[10]=(1-(l+_))*S,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=fi.set(s[0],s[1],s[2]).length(),a=fi.set(s[4],s[5],s[6]).length(),c=fi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),tn.copy(this);let A=1/o,u=1/a,d=1/c;return tn.elements[0]*=A,tn.elements[1]*=A,tn.elements[2]*=A,tn.elements[4]*=u,tn.elements[5]*=u,tn.elements[6]*=u,tn.elements[8]*=d,tn.elements[9]*=d,tn.elements[10]*=d,e.setFromRotationMatrix(tn),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=sn,c=!1){let A=this.elements,u=2*r/(e-t),d=2*r/(n-s),l=(e+t)/(e-t),f=(n+s)/(n-s),m,_;if(c)m=r/(o-r),_=o*r/(o-r);else if(a===sn)m=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Ii)m=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return A[0]=u,A[4]=0,A[8]=l,A[12]=0,A[1]=0,A[5]=d,A[9]=f,A[13]=0,A[2]=0,A[6]=0,A[10]=m,A[14]=_,A[3]=0,A[7]=0,A[11]=-1,A[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=sn,c=!1){let A=this.elements,u=2/(e-t),d=2/(n-s),l=-(e+t)/(e-t),f=-(n+s)/(n-s),m,_;if(c)m=1/(o-r),_=o/(o-r);else if(a===sn)m=-2/(o-r),_=-(o+r)/(o-r);else if(a===Ii)m=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return A[0]=u,A[4]=0,A[8]=0,A[12]=l,A[1]=0,A[5]=d,A[9]=0,A[13]=f,A[2]=0,A[6]=0,A[10]=m,A[14]=_,A[3]=0,A[7]=0,A[11]=0,A[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Yr.prototype.isMatrix4=!0;var oe=Yr,fi=new P,tn=new oe,vh=new P(0,0,0),Sh=new P(1,1,1),Rn=new P,Hs=new P,Ve=new P,zA=new oe,YA=new We,bn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],A=s[5],u=s[9],d=s[2],l=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(l,A),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,A)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,A)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Vt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(l,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,A));break;case"YZX":this._z=Math.asin(Vt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,A),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(l,A),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Tt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return zA.makeRotationFromQuaternion(t),this.setFromRotationMatrix(zA,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return YA.setFromEuler(this),this.setFromQuaternion(YA,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};bn.DEFAULT_ORDER="XYZ";var Fi=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},bh=0,WA=new P,pi=new We,_n=new oe,ks=new P,es=new P,Ih=new P,Dh=new We,JA=new P(1,0,0),KA=new P(0,1,0),XA=new P(0,0,1),ZA={type:"added"},Th={type:"removed"},gi={type:"childadded",child:null},ta={type:"childremoved",child:null},ye=class i extends rn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bh++}),this.uuid=Yi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new P,e=new bn,n=new We,s=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new oe},normalMatrix:{value:new Pt}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fi,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return pi.setFromAxisAngle(t,e),this.quaternion.multiply(pi),this}rotateOnWorldAxis(t,e){return pi.setFromAxisAngle(t,e),this.quaternion.premultiply(pi),this}rotateX(t){return this.rotateOnAxis(JA,t)}rotateY(t){return this.rotateOnAxis(KA,t)}rotateZ(t){return this.rotateOnAxis(XA,t)}translateOnAxis(t,e){return WA.copy(t).applyQuaternion(this.quaternion),this.position.add(WA.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(JA,t)}translateY(t){return this.translateOnAxis(KA,t)}translateZ(t){return this.translateOnAxis(XA,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ks.copy(t):ks.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt(es,ks,this.up):_n.lookAt(ks,es,this.up),this.quaternion.setFromRotationMatrix(_n),s&&(_n.extractRotation(s.matrixWorld),pi.setFromRotationMatrix(_n),this.quaternion.premultiply(pi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Ft("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ZA),gi.child=t,this.dispatchEvent(gi),gi.child=null):Ft("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Th),ta.child=t,this.dispatchEvent(ta),ta.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_n.multiply(t.parent.matrixWorld)),t.applyMatrix4(_n),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ZA),gi.child=t,this.dispatchEvent(gi),gi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,t,Ih),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,Dh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let A=0,u=c.length;A<u;A++){let d=c[A];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,A=this.material.length;c<A;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),A=o(t.textures),u=o(t.images),d=o(t.shapes),l=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),A.length>0&&(n.textures=A),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),l.length>0&&(n.skeletons=l),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let c=[];for(let A in a){let u=a[A];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};ye.DEFAULT_UP=new P(0,1,0);ye.DEFAULT_MATRIX_AUTO_UPDATE=!0;ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var gn=class extends ye{constructor(){super(),this.isGroup=!0,this.type="Group"}},Qh={type:"move"},Ri=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,A=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(A&&t.hand){o=!0;for(let _ of t.hand.values()){let p=e.getJointPose(_,n),h=this._getHandJoint(A,_);p!==null&&(h.matrix.fromArray(p.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=p.radius),h.visible=p!==null}let u=A.joints["index-finger-tip"],d=A.joints["thumb-tip"],l=u.position.distanceTo(d.position),f=.02,m=.005;A.inputState.pinching&&l>f+m?(A.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!A.inputState.pinching&&l<=f-m&&(A.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Qh)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),A!==null&&(A.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new gn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},$c={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Un={h:0,s:0,l:0},Vs={h:0,s:0,l:0};function ea(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var kt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Le){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Yt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Yt.workingColorSpace){if(t=Za(t,1),e=Vt(e,0,1),n=Vt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=ea(o,r,t+1/3),this.g=ea(o,r,t),this.b=ea(o,r,t-1/3)}return Yt.colorSpaceToWorking(this,s),this}setStyle(t,e=Le){function n(r){r!==void 0&&parseFloat(r)<1&&Tt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Tt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Tt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Le){let n=$c[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Tt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Sn(t.r),this.g=Sn(t.g),this.b=Sn(t.b),this}copyLinearToSRGB(t){return this.r=Si(t.r),this.g=Si(t.g),this.b=Si(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Le){return Yt.workingToColorSpace(Ie.copy(this),t),Math.round(Vt(Ie.r*255,0,255))*65536+Math.round(Vt(Ie.g*255,0,255))*256+Math.round(Vt(Ie.b*255,0,255))}getHexString(t=Le){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.workingToColorSpace(Ie.copy(this),e);let n=Ie.r,s=Ie.g,r=Ie.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,A,u=(a+o)/2;if(a===o)c=0,A=0;else{let d=o-a;switch(A=u<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=A,t.l=u,t}getRGB(t,e=Yt.workingColorSpace){return Yt.workingToColorSpace(Ie.copy(this),e),t.r=Ie.r,t.g=Ie.g,t.b=Ie.b,t}getStyle(t=Le){Yt.workingToColorSpace(Ie.copy(this),t);let e=Ie.r,n=Ie.g,s=Ie.b;return t!==Le?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Un),this.setHSL(Un.h+t,Un.s+e,Un.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Un),t.getHSL(Vs);let n=as(Un.h,Vs.h,e),s=as(Un.s,Vs.s,e),r=as(Un.l,Vs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ie=new kt;kt.NAMES=$c;var ds=class extends ye{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bn,this.environmentIntensity=1,this.environmentRotation=new bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},en=new P,Mn=new P,na=new P,xn=new P,mi=new P,Bi=new P,qA=new P,ia=new P,sa=new P,ra=new P,oa=new ce,aa=new ce,Aa=new ce,Gn=class i{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),en.subVectors(t,e),s.cross(en);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){en.subVectors(s,e),Mn.subVectors(n,e),na.subVectors(t,e);let o=en.dot(en),a=en.dot(Mn),c=en.dot(na),A=Mn.dot(Mn),u=Mn.dot(na),d=o*A-a*a;if(d===0)return r.set(0,0,0),null;let l=1/d,f=(A*c-a*u)*l,m=(o*u-a*c)*l;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,xn)===null?!1:xn.x>=0&&xn.y>=0&&xn.x+xn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,xn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,xn.x),c.addScaledVector(o,xn.y),c.addScaledVector(a,xn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return oa.setScalar(0),aa.setScalar(0),Aa.setScalar(0),oa.fromBufferAttribute(t,e),aa.fromBufferAttribute(t,n),Aa.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(oa,r.x),o.addScaledVector(aa,r.y),o.addScaledVector(Aa,r.z),o}static isFrontFacing(t,e,n,s){return en.subVectors(n,e),Mn.subVectors(t,e),en.cross(Mn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return en.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),en.cross(Mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;mi.subVectors(s,n),Bi.subVectors(r,n),ia.subVectors(t,n);let c=mi.dot(ia),A=Bi.dot(ia);if(c<=0&&A<=0)return e.copy(n);sa.subVectors(t,s);let u=mi.dot(sa),d=Bi.dot(sa);if(u>=0&&d<=u)return e.copy(s);let l=c*d-u*A;if(l<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(mi,o);ra.subVectors(t,r);let f=mi.dot(ra),m=Bi.dot(ra);if(m>=0&&f<=m)return e.copy(r);let _=f*A-c*m;if(_<=0&&A>=0&&m<=0)return a=A/(A-m),e.copy(n).addScaledVector(Bi,a);let p=u*m-f*d;if(p<=0&&d-u>=0&&f-m>=0)return qA.subVectors(r,s),a=(d-u)/(d-u+(f-m)),e.copy(s).addScaledVector(qA,a);let h=1/(p+_+l);return o=_*h,a=l*h,e.copy(n).addScaledVector(mi,o).addScaledVector(Bi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},On=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(nn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(nn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=nn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,nn):nn.fromBufferAttribute(r,o),nn.applyMatrix4(t.matrixWorld),this.expandByPoint(nn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),zs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zs.copy(n.boundingBox)),zs.applyMatrix4(t.matrixWorld),this.union(zs)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,nn),nn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ns),Ys.subVectors(this.max,ns),wi.subVectors(t.a,ns),Ci.subVectors(t.b,ns),Ei.subVectors(t.c,ns),Pn.subVectors(Ci,wi),Ln.subVectors(Ei,Ci),ti.subVectors(wi,Ei);let e=[0,-Pn.z,Pn.y,0,-Ln.z,Ln.y,0,-ti.z,ti.y,Pn.z,0,-Pn.x,Ln.z,0,-Ln.x,ti.z,0,-ti.x,-Pn.y,Pn.x,0,-Ln.y,Ln.x,0,-ti.y,ti.x,0];return!ca(e,wi,Ci,Ei,Ys)||(e=[1,0,0,0,1,0,0,0,1],!ca(e,wi,Ci,Ei,Ys))?!1:(Ws.crossVectors(Pn,Ln),e=[Ws.x,Ws.y,Ws.z],ca(e,wi,Ci,Ei,Ys))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,nn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(nn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(yn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},yn=[new P,new P,new P,new P,new P,new P,new P,new P],nn=new P,zs=new On,wi=new P,Ci=new P,Ei=new P,Pn=new P,Ln=new P,ti=new P,ns=new P,Ys=new P,Ws=new P,ei=new P;function ca(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ei.fromArray(i,r);let a=s.x*Math.abs(ei.x)+s.y*Math.abs(ei.y)+s.z*Math.abs(ei.z),c=t.dot(ei),A=e.dot(ei),u=n.dot(ei);if(Math.max(-Math.max(c,A,u),Math.min(c,A,u))>a)return!1}return!0}var pe=new P,Js=new Rt,Fh=0,ue=class extends rn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Fh++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Kc,this.updateRanges=[],this.gpuType=ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Js.fromBufferAttribute(this,e),Js.applyMatrix3(t),this.setXY(e,Js.x,Js.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix3(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix4(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyNormalMatrix(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.transformDirection(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=vi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=vi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=vi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=vi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=vi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),n=Re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),n=Re(n,this.array),s=Re(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),n=Re(n,this.array),s=Re(s,this.array),r=Re(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var fs=class extends ue{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ps=class extends ue{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Ne=class extends ue{constructor(t,e,n){super(new Float32Array(t),e,n)}},Rh=new On,is=new P,la=new P,on=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Rh.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;is.subVectors(t,this.center);let e=is.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(is,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(la.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(is.copy(t.center).add(la)),this.expandByPoint(is.copy(t.center).sub(la))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Uh=0,qe=new oe,ha=new ye,_i=new P,ze=new On,ss=new On,Ee=new P,ge=class i extends rn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=Yi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(rh(t)?ps:fs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Pt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return qe.makeRotationFromQuaternion(t),this.applyMatrix4(qe),this}rotateX(t){return qe.makeRotationX(t),this.applyMatrix4(qe),this}rotateY(t){return qe.makeRotationY(t),this.applyMatrix4(qe),this}rotateZ(t){return qe.makeRotationZ(t),this.applyMatrix4(qe),this}translate(t,e,n){return qe.makeTranslation(t,e,n),this.applyMatrix4(qe),this}scale(t,e,n){return qe.makeScale(t,e,n),this.applyMatrix4(qe),this}lookAt(t){return ha.lookAt(t),ha.updateMatrix(),this.applyMatrix4(ha.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_i).negate(),this.translate(_i.x,_i.y,_i.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ne(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Tt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new On);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ft("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];ze.setFromBufferAttribute(r),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,ze.min),this.boundingBox.expandByPoint(Ee),Ee.addVectors(this.boundingBox.max,ze.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint(ze.min),this.boundingBox.expandByPoint(ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ft('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new on);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ft("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let n=this.boundingSphere.center;if(ze.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];ss.setFromBufferAttribute(a),this.morphTargetsRelative?(Ee.addVectors(ze.min,ss.min),ze.expandByPoint(Ee),Ee.addVectors(ze.max,ss.max),ze.expandByPoint(Ee)):(ze.expandByPoint(ss.min),ze.expandByPoint(ss.max))}ze.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ee.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ee));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let A=0,u=a.count;A<u;A++)Ee.fromBufferAttribute(a,A),c&&(_i.fromBufferAttribute(t,A),Ee.add(_i)),s=Math.max(s,n.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ft('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Ft("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new ue(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let B=0;B<n.count;B++)a[B]=new P,c[B]=new P;let A=new P,u=new P,d=new P,l=new Rt,f=new Rt,m=new Rt,_=new P,p=new P;function h(B,v,D){A.fromBufferAttribute(n,B),u.fromBufferAttribute(n,v),d.fromBufferAttribute(n,D),l.fromBufferAttribute(r,B),f.fromBufferAttribute(r,v),m.fromBufferAttribute(r,D),u.sub(A),d.sub(A),f.sub(l),m.sub(l);let Q=1/(f.x*m.y-m.x*f.y);isFinite(Q)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(Q),p.copy(d).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(Q),a[B].add(_),a[v].add(_),a[D].add(_),c[B].add(p),c[v].add(p),c[D].add(p))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let B=0,v=E.length;B<v;++B){let D=E[B],Q=D.start,N=D.count;for(let G=Q,I=Q+N;G<I;G+=3)h(t.getX(G+0),t.getX(G+1),t.getX(G+2))}let y=new P,w=new P,M=new P,x=new P;function S(B){M.fromBufferAttribute(s,B),x.copy(M);let v=a[B];y.copy(v),y.sub(M.multiplyScalar(M.dot(v))).normalize(),w.crossVectors(x,v);let Q=w.dot(c[B])<0?-1:1;o.setXYZW(B,y.x,y.y,y.z,Q)}for(let B=0,v=E.length;B<v;++B){let D=E[B],Q=D.start,N=D.count;for(let G=Q,I=Q+N;G<I;G+=3)S(t.getX(G+0)),S(t.getX(G+1)),S(t.getX(G+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new ue(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let l=0,f=n.count;l<f;l++)n.setXYZ(l,0,0,0);let s=new P,r=new P,o=new P,a=new P,c=new P,A=new P,u=new P,d=new P;if(t)for(let l=0,f=t.count;l<f;l+=3){let m=t.getX(l+0),_=t.getX(l+1),p=t.getX(l+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,p),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),A.fromBufferAttribute(n,p),a.add(u),c.add(u),A.add(u),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,A.x,A.y,A.z)}else for(let l=0,f=e.count;l<f;l+=3)s.fromBufferAttribute(e,l+0),r.fromBufferAttribute(e,l+1),o.fromBufferAttribute(e,l+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(l+0,u.x,u.y,u.z),n.setXYZ(l+1,u.x,u.y,u.z),n.setXYZ(l+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ee.fromBufferAttribute(t,e),Ee.normalize(),t.setXYZ(e,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function t(a,c){let A=a.array,u=a.itemSize,d=a.normalized,l=new A.constructor(c.length*u),f=0,m=0;for(let _=0,p=c.length;_<p;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*u;for(let h=0;h<u;h++)l[m++]=A[f++]}return new ue(l,u,d)}if(this.index===null)return Tt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],A=t(c,n);e.setAttribute(a,A)}let r=this.morphAttributes;for(let a in r){let c=[],A=r[a];for(let u=0,d=A.length;u<d;u++){let l=A[u],f=t(l,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let A=o[a];e.addGroup(A.start,A.count,A.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let A in c)c[A]!==void 0&&(t[A]=c[A]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let A=n[c];t.data.attributes[c]=A.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let A=this.morphAttributes[c],u=[];for(let d=0,l=A.length;d<l;d++){let f=A[d];u.push(f.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let A in s){let u=s[A];this.setAttribute(A,u.clone(e))}let r=t.morphAttributes;for(let A in r){let u=[],d=r[A];for(let l=0,f=d.length;l<f;l++)u.push(d[l].clone(e));this.morphAttributes[A]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let A=0,u=o.length;A<u;A++){let d=o[A];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var ua=new P,Ph=new P,Lh=new Pt,Ye=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=ua.subVectors(n,e).cross(Ph.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(ua),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Lh.getNormalMatrix(t),s=this.coplanarPoint(ua).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Nh=0,Bn=class extends rn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=Yi(),this.name="",this.type="Material",this.blending=ki,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ta,this.blendDst=Qa,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=bi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hr,this.stencilZFail=hr,this.stencilZPass=hr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Tt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Tt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new kt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Ye().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Rt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Rt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var vn=new P,da=new P,Ks=new P,Xs=new P,In=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,vn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=vn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(vn.copy(this.origin).addScaledVector(this.direction,e),vn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){da.copy(t).add(e).multiplyScalar(.5),Ks.copy(e).sub(t).normalize(),Xs.copy(this.origin).sub(da);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Ks),a=Xs.dot(this.direction),c=-Xs.dot(Ks),A=Xs.lengthSq(),u=Math.abs(1-o*o),d,l,f,m;if(u>0)if(d=o*c-a,l=o*a-c,m=r*u,d>=0)if(l>=-m)if(l<=m){let _=1/u;d*=_,l*=_,f=d*(d+o*l+2*a)+l*(o*d+l+2*c)+A}else l=r,d=Math.max(0,-(o*l+a)),f=-d*d+l*(l+2*c)+A;else l=-r,d=Math.max(0,-(o*l+a)),f=-d*d+l*(l+2*c)+A;else l<=-m?(d=Math.max(0,-(-o*r+a)),l=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+l*(l+2*c)+A):l<=m?(d=0,l=Math.min(Math.max(-r,-c),r),f=l*(l+2*c)+A):(d=Math.max(0,-(o*r+a)),l=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+l*(l+2*c)+A);else l=o>0?-r:r,d=Math.max(0,-(o*l+a)),f=-d*d+l*(l+2*c)+A;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(da).addScaledVector(Ks,l),f}intersectSphere(t,e){if(t.radius<0)return null;vn.subVectors(t.center,this.origin);let n=vn.dot(this.direction),s=vn.dot(vn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,A=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,l=this.origin;return A>=0?(n=(t.min.x-l.x)*A,s=(t.max.x-l.x)*A):(n=(t.max.x-l.x)*A,s=(t.min.x-l.x)*A),u>=0?(r=(t.min.y-l.y)*u,o=(t.max.y-l.y)*u):(r=(t.max.y-l.y)*u,o=(t.min.y-l.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-l.z)*d,c=(t.max.z-l.z)*d):(a=(t.max.z-l.z)*d,c=(t.min.z-l.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,vn)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,c=a.x,A=a.y,u=a.z,d=t.x-o.x,l=t.y-o.y,f=t.z-o.z,m=e.x-o.x,_=e.y-o.y,p=e.z-o.z,h=n.x-o.x,E=n.y-o.y,y=n.z-o.z,w=Math.abs(c),M=Math.abs(A),x=Math.abs(u),S,B,v,D,Q,N,G,I,U,z,V,j;if(w>=M&&w>=x?(v=c,N=d,U=m,j=h,c>=0?(S=A,B=u,D=l,Q=f,G=_,I=p,z=E,V=y):(S=u,B=A,D=f,Q=l,G=p,I=_,z=y,V=E)):M>=x?(v=A,N=l,U=_,j=E,A>=0?(S=u,B=c,D=f,Q=d,G=p,I=m,z=y,V=h):(S=c,B=u,D=d,Q=f,G=m,I=p,z=h,V=y)):(v=u,N=f,U=p,j=y,u>=0?(S=c,B=A,D=d,Q=l,G=m,I=_,z=h,V=E):(S=A,B=c,D=l,Q=d,G=_,I=m,z=E,V=h)),v===0)return null;let K=S/v,et=B/v,J=1/v,st=D-K*N,nt=Q-et*N,Et=G-K*U,gt=I-et*U,Dt=z-K*j,Y=V-et*j,Z=Dt*gt-Y*Et,at=st*Y-nt*Dt,It=Et*nt-gt*st;if(s){if(Z<0||at<0||It<0)return null}else if((Z<0||at<0||It<0)&&(Z>0||at>0||It>0))return null;let ut=Z+at+It;if(ut===0)return null;let Ut=J*(Z*N+at*U+It*j);return(ut>0?Ut<0:Ut>0)?null:this.at(Ut/ut,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},an=class extends Bn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=Wr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},jA=new oe,ni=new In,Zs=new on,$A=new P,qs=new P,js=new P,$s=new P,fa=new P,tr=new P,tc=new P,er=new P,Me=class extends ye{constructor(t=new ge,e=new an){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){tr.set(0,0,0);for(let c=0,A=r.length;c<A;c++){let u=a[c],d=r[c];u!==0&&(fa.fromBufferAttribute(d,t),o?tr.addScaledVector(fa,u):tr.addScaledVector(fa.sub(e),u))}e.add(tr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Zs.copy(n.boundingSphere),Zs.applyMatrix4(r),ni.copy(t.ray).recast(t.near),!(Zs.containsPoint(ni.origin)===!1&&(ni.intersectSphere(Zs,$A)===null||ni.origin.distanceToSquared($A)>(t.far-t.near)**2))&&(jA.copy(r).invert(),ni.copy(t.ray).applyMatrix4(jA),!(n.boundingBox!==null&&ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ni)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,A=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,l=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=l.length;m<_;m++){let p=l[m],h=o[p.materialIndex],E=Math.max(p.start,f.start),y=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let w=E,M=y;w<M;w+=3){let x=a.getX(w),S=a.getX(w+1),B=a.getX(w+2);s=nr(this,h,t,n,A,u,d,x,S,B),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let p=m,h=_;p<h;p+=3){let E=a.getX(p),y=a.getX(p+1),w=a.getX(p+2);s=nr(this,o,t,n,A,u,d,E,y,w),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=l.length;m<_;m++){let p=l[m],h=o[p.materialIndex],E=Math.max(p.start,f.start),y=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let w=E,M=y;w<M;w+=3){let x=w,S=w+1,B=w+2;s=nr(this,h,t,n,A,u,d,x,S,B),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let p=m,h=_;p<h;p+=3){let E=p,y=p+1,w=p+2;s=nr(this,o,t,n,A,u,d,E,y,w),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function Gh(i,t,e,n,s,r,o,a){let c;if(t.side===Ue?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Kn,a),c===null)return null;er.copy(a),er.applyMatrix4(i.matrixWorld);let A=e.ray.origin.distanceTo(er);return A<e.near||A>e.far?null:{distance:A,point:er.clone(),object:i}}function nr(i,t,e,n,s,r,o,a,c,A){i.getVertexPosition(a,qs),i.getVertexPosition(c,js),i.getVertexPosition(A,$s);let u=Gh(i,t,e,n,qs,js,$s,tc);if(u){let d=new P;Gn.getBarycoord(tc,qs,js,$s,d),s&&(u.uv=Gn.getInterpolatedAttribute(s,a,c,A,d,new Rt)),r&&(u.uv1=Gn.getInterpolatedAttribute(r,a,c,A,d,new Rt)),o&&(u.normal=Gn.getInterpolatedAttribute(o,a,c,A,d,new P),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let l={a,b:c,c:A,normal:new P,materialIndex:0};Gn.getNormal(qs,js,$s,l.normal),u.face=l,u.barycoord=d}return u}var yr=class extends Ge{constructor(t=null,e=1,n=1,s,r,o,a,c,A=_e,u=_e,d,l){super(null,o,a,c,A,u,s,r,d,l),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ii=new on,Oh=new Rt(.5,.5),ir=new P,Ui=class{constructor(t=new Ye,e=new Ye,n=new Ye,s=new Ye,r=new Ye,o=new Ye){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=sn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],A=r[3],u=r[4],d=r[5],l=r[6],f=r[7],m=r[8],_=r[9],p=r[10],h=r[11],E=r[12],y=r[13],w=r[14],M=r[15];if(s[0].setComponents(A-o,f-u,h-m,M-E).normalize(),s[1].setComponents(A+o,f+u,h+m,M+E).normalize(),s[2].setComponents(A+a,f+d,h+_,M+y).normalize(),s[3].setComponents(A-a,f-d,h-_,M-y).normalize(),n)s[4].setComponents(c,l,p,w).normalize(),s[5].setComponents(A-c,f-l,h-p,M-w).normalize();else if(s[4].setComponents(A-c,f-l,h-p,M-w).normalize(),e===sn)s[5].setComponents(A+c,f+l,h+p,M+w).normalize();else if(e===Ii)s[5].setComponents(c,l,p,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ii.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ii.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ii)}intersectsSprite(t){ii.center.set(0,0,0);let e=Oh.distanceTo(t.center);return ii.radius=.7071067811865476+e,ii.applyMatrix4(t.matrixWorld),this.intersectsSphere(ii)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(ir.x=s.normal.x>0?t.max.x:t.min.x,ir.y=s.normal.y>0?t.max.y:t.min.y,ir.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ir)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ri=class extends Bn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},vr=new P,Sr=new P,ec=new oe,rs=new In,sr=new on,pa=new P,nc=new P,Pi=class extends ye{constructor(t=new ge,e=new ri){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)vr.fromBufferAttribute(e,s-1),Sr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=vr.distanceTo(Sr);t.setAttribute("lineDistance",new Ne(n,1))}else Tt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),sr.copy(n.boundingSphere),sr.applyMatrix4(s),sr.radius+=r,t.ray.intersectsSphere(sr)===!1)return;ec.copy(s).invert(),rs.copy(t.ray).applyMatrix4(ec);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,A=this.isLineSegments?2:1,u=n.index,l=n.attributes.position;if(u!==null){let f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let _=f,p=m-1;_<p;_+=A){let h=u.getX(_),E=u.getX(_+1),y=rr(this,t,rs,c,h,E,_);y&&e.push(y)}if(this.isLineLoop){let _=u.getX(m-1),p=u.getX(f),h=rr(this,t,rs,c,_,p,m-1);h&&e.push(h)}}else{let f=Math.max(0,o.start),m=Math.min(l.count,o.start+o.count);for(let _=f,p=m-1;_<p;_+=A){let h=rr(this,t,rs,c,_,_+1,_);h&&e.push(h)}if(this.isLineLoop){let _=rr(this,t,rs,c,m-1,f,m-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function rr(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(vr.fromBufferAttribute(a,s),Sr.fromBufferAttribute(a,r),e.distanceSqToSegment(vr,Sr,pa,nc)>n)return;pa.applyMatrix4(i.matrixWorld);let A=t.ray.origin.distanceTo(pa);if(!(A<t.near||A>t.far))return{distance:A,point:nc.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var ic=new P,sc=new P,gs=class extends Pi{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)ic.fromBufferAttribute(e,s),sc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+ic.distanceTo(sc);t.setAttribute("lineDistance",new Ne(n,1))}else Tt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var oi=class extends Bn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new kt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},rc=new oe,_a=new In,or=new on,ar=new P,Li=class extends ye{constructor(t=new ge,e=new oi){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),or.copy(n.boundingSphere),or.applyMatrix4(s),or.radius+=r,t.ray.intersectsSphere(or)===!1)return;rc.copy(s).invert(),_a.copy(t.ray).applyMatrix4(rc);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,A=n.index,d=n.attributes.position;if(A!==null){let l=Math.max(0,o.start),f=Math.min(A.count,o.start+o.count);for(let m=l,_=f;m<_;m++){let p=A.getX(m);ar.fromBufferAttribute(d,p),oc(ar,p,c,s,t,e,this)}}else{let l=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let m=l,_=f;m<_;m++)ar.fromBufferAttribute(d,m),oc(ar,m,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function oc(i,t,e,n,s,r,o){let a=_a.distanceSqToPoint(i);if(a<e){let c=new P;_a.closestPointToPoint(i,c),c.applyMatrix4(n);let A=s.ray.origin.distanceTo(c);if(A<s.near||A>s.far)return;r.push({distance:A,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var ms=class extends Ge{constructor(t=[],e=Xn,n,s,r,o,a,c,A,u){super(t,e,n,s,r,o,a,c,A,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Hn=class extends Ge{constructor(t,e,n=cn,s,r,o,a=_e,c=_e,A,u=mn,d=1){if(u!==mn&&u!==qn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let l={width:t,height:e,depth:d};super(l,s,r,o,a,c,u,n,A),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Qi(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},br=class extends Hn{constructor(t,e=cn,n=Xn,s,r,o=_e,a=_e,c,A=mn){let u={width:t,height:t,depth:1},d=[u,u,u,u,u,u];super(t,t,e,n,s,r,o,a,c,A),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Bs=class extends Ge{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ni=class i extends ge{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],A=[],u=[],d=[],l=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ne(A,3)),this.setAttribute("normal",new Ne(u,3)),this.setAttribute("uv",new Ne(d,2));function m(_,p,h,E,y,w,M,x,S,B,v){let D=w/S,Q=M/B,N=w/2,G=M/2,I=x/2,U=S+1,z=B+1,V=0,j=0,K=new P;for(let et=0;et<z;et++){let J=et*Q-G;for(let st=0;st<U;st++){let nt=st*D-N;K[_]=nt*E,K[p]=J*y,K[h]=I,A.push(K.x,K.y,K.z),K[_]=0,K[p]=0,K[h]=x>0?1:-1,u.push(K.x,K.y,K.z),d.push(st/S),d.push(1-et/B),V+=1}}for(let et=0;et<B;et++)for(let J=0;J<S;J++){let st=l+J+U*et,nt=l+J+U*(et+1),Et=l+(J+1)+U*(et+1),gt=l+(J+1)+U*et;c.push(st,nt,gt),c.push(nt,Et,gt),j+=6}a.addGroup(f,j,v),f+=j,l+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var kn=class i extends ge{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),A=a+1,u=c+1,d=t/a,l=e/c,f=[],m=[],_=[],p=[];for(let h=0;h<u;h++){let E=h*l-o;for(let y=0;y<A;y++){let w=y*d-r;m.push(w,-E,0),_.push(0,0,1),p.push(y/a),p.push(1-h/c)}}for(let h=0;h<c;h++)for(let E=0;E<a;E++){let y=E+A*h,w=E+A*(h+1),M=E+1+A*(h+1),x=E+1+A*h;f.push(y,w,x),f.push(w,M,x)}this.setIndex(f),this.setAttribute("position",new Ne(m,3)),this.setAttribute("normal",new Ne(_,3)),this.setAttribute("uv",new Ne(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};function ci(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(ac(s))s.isRenderTargetTexture?(Tt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(ac(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Qe(i){let t={};for(let e=0;e<i.length;e++){let n=ci(i[e]);for(let s in n)t[s]=n[s]}return t}function ac(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Hh(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ja(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}var tl={clone:ci,merge:Qe},kh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Je=class extends Bn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=kh,this.fragmentShader=Vh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ci(t.uniforms),this.uniformsGroups=Hh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new kt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Rt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new P().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ce().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Pt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new oe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Ir=class extends Je{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var ws=class extends Bn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fo,this.normalScale=new Rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=Wr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Dr=class extends Bn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Tr=class extends Bn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Mi(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function ga(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Vn=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Qr=class extends Vn{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wa,endingEnd:wa}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ca:r=t,a=2*e-n;break;case Ea:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ca:o=t,c=2*n-e;break;case Ea:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let A=(n-e)*.5,u=this.valueSize;this._weightPrev=A/(e-a),this._weightNext=A/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,A=c-a,u=this._offsetPrev,d=this._offsetNext,l=this._weightPrev,f=this._weightNext,m=(n-e)/(s-e),_=m*m,p=_*m,h=-l*p+2*l*_-l*m,E=(1+l)*p+(-1.5-2*l)*_+(-.5+l)*m+1,y=(-1-f)*p+(1.5+f)*_+.5*m,w=f*p-f*_;for(let M=0;M!==a;++M)r[M]=h*o[u+M]+E*o[A+M]+y*o[c+M]+w*o[d+M];return r}},Fr=class extends Vn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,A=c-a,u=(n-e)/(s-e),d=1-u;for(let l=0;l!==a;++l)r[l]=o[A+l]*d+o[c+l]*u;return r}},Rr=class extends Vn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Ur=class extends Vn{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,A=c-a,u=this.inTangents,d=this.outTangents;if(!u||!d){let m=(n-e)/(s-e),_=1-m;for(let p=0;p!==a;++p)r[p]=o[A+p]*_+o[c+p]*m;return r}let l=a*2,f=t-1;for(let m=0;m!==a;++m){let _=o[A+m],p=o[c+m],h=f*l+m*2,E=d[h],y=d[h+1],w=t*l+m*2,M=u[w],x=u[w+1],S=Yh(n,e,E,M,s);r[m]=el(S,_,y,x,p)}return r}};function el(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function zh(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Yh(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=el(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let c=zh(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var Ke=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Mi(e,this.TimeBufferType),this.values=Mi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Mi(t.times,Array),values:Mi(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),ga(t.settings)&&(n.settings={inTangents:Mi(t.settings.inTangents,Array),outTangents:Mi(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Rr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Fr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Qr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Ur(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case As:e=this.InterpolantFactoryMethodDiscrete;break;case Er:e=this.InterpolantFactoryMethodLinear;break;case lr:e=this.InterpolantFactoryMethodSmooth;break;case Ba:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Tt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return As;case this.InterpolantFactoryMethodLinear:return Er;case this.InterpolantFactoryMethodSmooth:return lr;case this.InterpolantFactoryMethodBezier:return Ba}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;ga(this.settings)&&(Ac(this.settings.inTangents,t),Ac(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Ft("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ft("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){Ft("KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){Ft("KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&oh(s))for(let a=0,c=s.length;a!==c;++a){let A=s[a];if(isNaN(A)){Ft("KeyframeTrack: Value is not a valid number.",this,a,A),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===lr,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,A=t[a],u=t[a+1];if(A!==u&&(a!==1||A!==t[0]))if(s)c=!0;else{let d=a*n,l=d-n,f=d+n;for(let m=0;m!==n;++m){let _=e[d+m];if(_!==e[l+m]||_!==e[f+m]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let d=a*n,l=o*n;for(let f=0;f!==n;++f)e[l+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,A=0;A!==n;++A)e[c+A]=e[a+A];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,ga(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Ac(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}Ke.prototype.ValueTypeName="";Ke.prototype.TimeBufferType=Float32Array;Ke.prototype.ValueBufferType=Float32Array;Ke.prototype.DefaultInterpolation=Er;var zn=class extends Ke{constructor(t,e,n){super(t,e,n)}};zn.prototype.ValueTypeName="bool";zn.prototype.ValueBufferType=Array;zn.prototype.DefaultInterpolation=As;zn.prototype.InterpolantFactoryMethodLinear=void 0;zn.prototype.InterpolantFactoryMethodSmooth=void 0;var Pr=class extends Ke{constructor(t,e,n,s){super(t,e,n,s)}};Pr.prototype.ValueTypeName="color";var Lr=class extends Ke{constructor(t,e,n,s){super(t,e,n,s)}};Lr.prototype.ValueTypeName="number";var Nr=class extends Vn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),A=t*a;for(let u=A+a;A!==u;A+=4)We.slerpFlat(r,0,o,A-a,o,A,c);return r}},Cs=class extends Ke{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Nr(this.times,this.values,this.getValueSize(),t)}};Cs.prototype.ValueTypeName="quaternion";Cs.prototype.InterpolantFactoryMethodSmooth=void 0;var Yn=class extends Ke{constructor(t,e,n){super(t,e,n)}};Yn.prototype.ValueTypeName="string";Yn.prototype.ValueBufferType=Array;Yn.prototype.DefaultInterpolation=As;Yn.prototype.InterpolantFactoryMethodLinear=void 0;Yn.prototype.InterpolantFactoryMethodSmooth=void 0;var Gr=class extends Ke{constructor(t,e,n,s){super(t,e,n,s)}};Gr.prototype.ValueTypeName="vector";var Or=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,A=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return A.push(u,d),this},this.removeHandler=function(u){let d=A.indexOf(u);return d!==-1&&A.splice(d,2),this},this.getHandler=function(u){for(let d=0,l=A.length;d<l;d+=2){let f=A[d],m=A[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},nl=new Or,Hr=class{constructor(t){this.manager=t!==void 0?t:nl,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Hr.DEFAULT_MATERIAL_NAME="__DEFAULT";var Es=class extends ye{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new kt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var ma=new oe,cc=new P,lc=new P,kr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Rt(512,512),this.mapType=He,this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ui,this._frameExtents=new Rt(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;cc.setFromMatrixPosition(t.matrixWorld),e.position.copy(cc),lc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(lc),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){ma.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(ma,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,A=s?s.y/r.y:0;t.coordinateSystem===Ii||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+A,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+A,0,0,.5,.5,0,0,0,1),e.multiply(ma)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Ar=new P,cr=new We,fn=new P,_s=class extends ye{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=sn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Ar,cr,fn),fn.x===1&&fn.y===1&&fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ar,cr,fn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Ar,cr,fn),fn.x===1&&fn.y===1&&fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ar,cr,fn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Nn=new P,hc=new Rt,uc=new Rt,De=class extends _s{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ti*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(os*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ti*2*Math.atan(Math.tan(os*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Nn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Nn.x,Nn.y).multiplyScalar(-t/Nn.z),Nn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Nn.x,Nn.y).multiplyScalar(-t/Nn.z)}getViewSize(t,e){return this.getViewBounds(t,hc,uc),e.subVectors(uc,hc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(os*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,A=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/A,s*=o.width/c,n*=o.height/A}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Gi=class extends _s{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let A=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=A*this.view.offsetX,o=r+A*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ma=class extends kr{constructor(){super(new Gi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ms=class extends Es{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ye.DEFAULT_UP),this.updateMatrix(),this.target=new ye,this.shadow=new Ma}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},xs=class extends Es{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var xi=-90,yi=1,Vr=class extends ye{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new De(xi,yi,t,e);s.layers=this.layers,this.add(s);let r=new De(xi,yi,t,e);r.layers=this.layers,this.add(r);let o=new De(xi,yi,t,e);o.layers=this.layers,this.add(o);let a=new De(xi,yi,t,e);a.layers=this.layers,this.add(a);let c=new De(xi,yi,t,e);c.layers=this.layers,this.add(c);let A=new De(xi,yi,t,e);A.layers=this.layers,this.add(A)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let A of e)this.remove(A);if(t===sn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ii)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let A of e)this.add(A),A.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,A,u]=this.children,d=t.getRenderTarget(),l=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,A),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(d,l,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},zr=class extends De{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var $a="\\[\\]\\.:\\/",Wh=new RegExp("["+$a+"]","g"),tA="[^"+$a+"]",Jh="[^"+$a.replace("\\.","")+"]",Kh=/((?:WC+[\/:])*)/.source.replace("WC",tA),Xh=/(WCOD+)?/.source.replace("WCOD",Jh),Zh=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",tA),qh=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",tA),jh=new RegExp("^"+Kh+Xh+Zh+qh+"$"),$h=["material","materials","bones","map"],xa=class{constructor(t,e,n){let s=n||Ae.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ae=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Wh,"")}static parseTrackName(t){let e=jh.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);$h.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Tt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let A=e.objectIndex;switch(n){case"materials":if(!t.material){Ft("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ft("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ft("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===A){A=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ft("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ft("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Ft("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(A!==void 0){if(t[A]===void 0){Ft("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[A]}}let o=t[s];if(o===void 0){let A=e.nodeName;Ft("PropertyBinding: Trying to update property for track: "+A+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ft("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ft("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ae.Composite=xa;Ae.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ae.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ae.prototype.GetterByBindingType=[Ae.prototype._getValue_direct,Ae.prototype._getValue_array,Ae.prototype._getValue_arrayElement,Ae.prototype._getValue_toArray];Ae.prototype.SetterByBindingTypeAndVersioning=[[Ae.prototype._setValue_direct,Ae.prototype._setValue_direct_setNeedsUpdate,Ae.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_array,Ae.prototype._setValue_array_setNeedsUpdate,Ae.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_arrayElement,Ae.prototype._setValue_arrayElement_setNeedsUpdate,Ae.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_fromArray,Ae.prototype._setValue_fromArray_setNeedsUpdate,Ae.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var mm=new Float32Array(1);var dc=new oe,ys=class{constructor(t,e,n=0,s=1/0){this.ray=new In(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Fi,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Ft("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return dc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(dc),this}intersectObject(t,e=!0,n=[]){return ya(t,this,n,e),n.sort(fc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)ya(t[s],this,n,e);return n.sort(fc),n}};function fc(i,t){return i.distance-t.distance}function ya(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)ya(r[o],t,e,!0)}}var Oi=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Vt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Vt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var oA=class oA{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};oA.prototype.isMatrix2=!0;var va=oA;var vs=class extends rn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function eA(i,t,e,n){let s=tu(n);switch(e){case Ya:return i*t;case Ja:return i*t/s.components*s.byteLength;case $r:return i*t/s.components*s.byteLength;case jn:return i*t*2/s.components*s.byteLength;case to:return i*t*2/s.components*s.byteLength;case Wa:return i*t*3/s.components*s.byteLength;case je:return i*t*4/s.components*s.byteLength;case eo:return i*t*4/s.components*s.byteLength;case Ds:case Ts:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Qs:case Fs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case io:case ro:return Math.max(i,16)*Math.max(t,8)/4;case no:case so:return Math.max(i,8)*Math.max(t,8)/2;case oo:case ao:case co:case lo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ao:case Rs:case ho:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case uo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case fo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case po:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case go:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case mo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Bo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case wo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Co:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Eo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case _o:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Mo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case xo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case yo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case vo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case So:case bo:case Io:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Do:case To:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Us:case Qo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function tu(i){switch(i){case He:case Ha:return{byteLength:1,components:1};case Vi:case ka:case hn:return{byteLength:2,components:1};case qr:case jr:return{byteLength:2,components:4};case cn:case Zr:case ln:return{byteLength:4,components:1};case Va:case za:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window!="undefined"&&(window.__THREE__?Tt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function xl(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function iu(i){let t=new WeakMap;function e(a,c){let A=a.array,u=a.usage,d=A.byteLength,l=i.createBuffer();i.bindBuffer(c,l),i.bufferData(c,A,u),a.onUploadCallback();let f;if(A instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array!="undefined"&&A instanceof Float16Array)f=i.HALF_FLOAT;else if(A instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(A instanceof Int16Array)f=i.SHORT;else if(A instanceof Uint32Array)f=i.UNSIGNED_INT;else if(A instanceof Int32Array)f=i.INT;else if(A instanceof Int8Array)f=i.BYTE;else if(A instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(A instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+A);return{buffer:l,type:f,bytesPerElement:A.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,A){let u=c.array,d=c.updateRanges;if(i.bindBuffer(A,a),d.length===0)i.bufferSubData(A,0,u);else{d.sort((f,m)=>f.start-m.start);let l=0;for(let f=1;f<d.length;f++){let m=d[l],_=d[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++l,d[l]=_)}d.length=l+1;for(let f=0,m=d.length;f<m;f++){let _=d[f];i.bufferSubData(A,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let A=t.get(a);if(A===void 0)t.set(a,e(a,c));else if(A.version<a.version){if(A.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(A.buffer,a,c),A.version=a.version}}return{get:s,remove:r,update:o}}var su=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ru=`#ifdef USE_ALPHAHASH
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
#endif`,ou=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,au=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Au=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lu=`#ifdef USE_AOMAP
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
#endif`,hu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uu=`#ifdef USE_BATCHING
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
#endif`,du=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,mu=`#ifdef USE_IRIDESCENCE
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
#endif`,Bu=`#ifdef USE_BUMPMAP
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
#endif`,wu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Cu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Eu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_u=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Mu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,xu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,yu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,vu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Su=`#define PI 3.141592653589793
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
} // validated`,bu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Iu=`vec3 transformedNormal = objectNormal;
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
#endif`,Du=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Tu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ru="gl_FragColor = linearToOutputTexel( gl_FragColor );",Uu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Pu=`#ifdef USE_ENVMAP
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
#endif`,Lu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Nu=`#ifdef USE_ENVMAP
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
#endif`,Gu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ou=`#ifdef USE_ENVMAP
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
#endif`,Hu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ku=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Yu=`#ifdef USE_GRADIENTMAP
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
}`,Wu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ju=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ku=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Xu=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Zu=`#ifdef USE_ENVMAP
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
#endif`,qu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ju=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$u=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,td=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ed=`PhysicalMaterial material;
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
#endif`,nd=`uniform sampler2D dfgLUT;
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
}`,id=`
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
#endif`,sd=`#if defined( RE_IndirectDiffuse )
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
#endif`,rd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,od=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,ad=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ad=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ld=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ud=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,fd=`#if defined( USE_POINTS_UV )
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
#endif`,pd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,md=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Bd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cd=`#ifdef USE_MORPHTARGETS
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
#endif`,Ed=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_d=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Md=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,xd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Sd=`#ifdef USE_NORMALMAP
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
#endif`,bd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Id=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Dd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Td=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Fd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Rd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ud=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Pd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ld=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Nd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Od=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Hd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Vd=`float getShadowMask() {
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
}`,zd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yd=`#ifdef USE_SKINNING
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
#endif`,Wd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jd=`#ifdef USE_SKINNING
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
#endif`,Kd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,jd=`#ifdef USE_TRANSMISSION
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
#endif`,$d=`#ifdef USE_TRANSMISSION
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
#endif`,tf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ef=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,rf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,of=`uniform sampler2D t2D;
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
}`,af=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Af=`#ifdef ENVMAP_TYPE_CUBE
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
}`,cf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hf=`#include <common>
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
}`,uf=`#if DEPTH_PACKING == 3200
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
}`,df=`#define DISTANCE
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
}`,ff=`#define DISTANCE
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
}`,pf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mf=`uniform float scale;
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
}`,Bf=`uniform vec3 diffuse;
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
}`,wf=`#include <common>
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
}`,Cf=`uniform vec3 diffuse;
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
}`,Ef=`#define LAMBERT
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
}`,_f=`#define LAMBERT
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
}`,Mf=`#define MATCAP
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
}`,xf=`#define MATCAP
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
}`,yf=`#define NORMAL
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
}`,vf=`#define NORMAL
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
}`,Sf=`#define PHONG
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
}`,bf=`#define PHONG
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
}`,If=`#define STANDARD
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
}`,Df=`#define STANDARD
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
}`,Tf=`#define TOON
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
}`,Qf=`#define TOON
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
}`,Ff=`uniform float size;
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
}`,Rf=`uniform vec3 diffuse;
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
}`,Uf=`#include <common>
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
}`,Pf=`uniform vec3 color;
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
}`,Lf=`uniform float rotation;
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
}`,Nf=`uniform vec3 diffuse;
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
}`,Ht={alphahash_fragment:su,alphahash_pars_fragment:ru,alphamap_fragment:ou,alphamap_pars_fragment:au,alphatest_fragment:Au,alphatest_pars_fragment:cu,aomap_fragment:lu,aomap_pars_fragment:hu,batching_pars_vertex:uu,batching_vertex:du,begin_vertex:fu,beginnormal_vertex:pu,bsdfs:gu,iridescence_fragment:mu,bumpmap_pars_fragment:Bu,clipping_planes_fragment:wu,clipping_planes_pars_fragment:Cu,clipping_planes_pars_vertex:Eu,clipping_planes_vertex:_u,color_fragment:Mu,color_pars_fragment:xu,color_pars_vertex:yu,color_vertex:vu,common:Su,cube_uv_reflection_fragment:bu,defaultnormal_vertex:Iu,displacementmap_pars_vertex:Du,displacementmap_vertex:Tu,emissivemap_fragment:Qu,emissivemap_pars_fragment:Fu,colorspace_fragment:Ru,colorspace_pars_fragment:Uu,envmap_fragment:Pu,envmap_common_pars_fragment:Lu,envmap_pars_fragment:Nu,envmap_pars_vertex:Gu,envmap_physical_pars_fragment:Zu,envmap_vertex:Ou,fog_vertex:Hu,fog_pars_vertex:ku,fog_fragment:Vu,fog_pars_fragment:zu,gradientmap_pars_fragment:Yu,lightmap_pars_fragment:Wu,lights_lambert_fragment:Ju,lights_lambert_pars_fragment:Ku,lights_pars_begin:Xu,lights_toon_fragment:qu,lights_toon_pars_fragment:ju,lights_phong_fragment:$u,lights_phong_pars_fragment:td,lights_physical_fragment:ed,lights_physical_pars_fragment:nd,lights_fragment_begin:id,lights_fragment_maps:sd,lights_fragment_end:rd,lightprobes_pars_fragment:od,logdepthbuf_fragment:ad,logdepthbuf_pars_fragment:Ad,logdepthbuf_pars_vertex:cd,logdepthbuf_vertex:ld,map_fragment:hd,map_pars_fragment:ud,map_particle_fragment:dd,map_particle_pars_fragment:fd,metalnessmap_fragment:pd,metalnessmap_pars_fragment:gd,morphinstance_vertex:md,morphcolor_vertex:Bd,morphnormal_vertex:wd,morphtarget_pars_vertex:Cd,morphtarget_vertex:Ed,normal_fragment_begin:_d,normal_fragment_maps:Md,normal_pars_fragment:xd,normal_pars_vertex:yd,normal_vertex:vd,normalmap_pars_fragment:Sd,clearcoat_normal_fragment_begin:bd,clearcoat_normal_fragment_maps:Id,clearcoat_pars_fragment:Dd,iridescence_pars_fragment:Td,opaque_fragment:Qd,packing:Fd,premultiplied_alpha_fragment:Rd,project_vertex:Ud,dithering_fragment:Pd,dithering_pars_fragment:Ld,roughnessmap_fragment:Nd,roughnessmap_pars_fragment:Gd,shadowmap_pars_fragment:Od,shadowmap_pars_vertex:Hd,shadowmap_vertex:kd,shadowmask_pars_fragment:Vd,skinbase_vertex:zd,skinning_pars_vertex:Yd,skinning_vertex:Wd,skinnormal_vertex:Jd,specularmap_fragment:Kd,specularmap_pars_fragment:Xd,tonemapping_fragment:Zd,tonemapping_pars_fragment:qd,transmission_fragment:jd,transmission_pars_fragment:$d,uv_pars_fragment:tf,uv_pars_vertex:ef,uv_vertex:nf,worldpos_vertex:sf,background_vert:rf,background_frag:of,backgroundCube_vert:af,backgroundCube_frag:Af,cube_vert:cf,cube_frag:lf,depth_vert:hf,depth_frag:uf,distance_vert:df,distance_frag:ff,equirect_vert:pf,equirect_frag:gf,linedashed_vert:mf,linedashed_frag:Bf,meshbasic_vert:wf,meshbasic_frag:Cf,meshlambert_vert:Ef,meshlambert_frag:_f,meshmatcap_vert:Mf,meshmatcap_frag:xf,meshnormal_vert:yf,meshnormal_frag:vf,meshphong_vert:Sf,meshphong_frag:bf,meshphysical_vert:If,meshphysical_frag:Df,meshtoon_vert:Tf,meshtoon_frag:Qf,points_vert:Ff,points_frag:Rf,shadow_vert:Uf,shadow_frag:Pf,sprite_vert:Lf,sprite_frag:Nf},ft={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Pt}},envmap:{envMap:{value:null},envMapRotation:{value:new Pt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Pt},normalScale:{value:new Rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0},uvTransform:{value:new Pt}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new Rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}}},En={basic:{uniforms:Qe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:Qe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new kt(0)},envMapIntensity:{value:1}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:Qe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:Qe([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:Qe([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new kt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:Qe([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:Qe([ft.points,ft.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:Qe([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:Qe([ft.common,ft.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:Qe([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:Qe([ft.sprite,ft.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Pt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distance:{uniforms:Qe([ft.common,ft.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distance_vert,fragmentShader:Ht.distance_frag},shadow:{uniforms:Qe([ft.lights,ft.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};En.physical={uniforms:Qe([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Pt},clearcoatNormalScale:{value:new Rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Pt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Pt},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Pt},transmissionSamplerSize:{value:new Rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Pt},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Pt},anisotropyVector:{value:new Rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Pt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};var Po={r:0,b:0,g:0},Gf=new oe,yl=new Pt;yl.set(-1,0,0,0,1,0,0,0,1);function Of(i,t,e,n,s,r){let o=new kt(0),a=s===!0?0:1,c,A,u=null,d=0,l=null;function f(E){let y=E.isScene===!0?E.background:null;if(y&&y.isTexture){let w=E.backgroundBlurriness>0;y=t.get(y,w)}return y}function m(E){let y=!1,w=f(E);w===null?p(o,a):w&&w.isColor&&(p(w,1),y=!0);let M=i.xr.getEnvironmentBlendMode();M==="additive"?e.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||y)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(E,y){let w=f(y);w&&(w.isCubeTexture||w.mapping===bs)?(A===void 0&&(A=new Me(new Ni(1,1,1),new Je({name:"BackgroundCubeMaterial",uniforms:ci(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:Ue,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),A.geometry.deleteAttribute("normal"),A.geometry.deleteAttribute("uv"),A.onBeforeRender=function(M,x,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(A.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(A)),A.material.uniforms.envMap.value=w,A.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,A.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,A.material.uniforms.backgroundRotation.value.setFromMatrix4(Gf.makeRotationFromEuler(y.backgroundRotation)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&A.material.uniforms.backgroundRotation.value.premultiply(yl),A.material.toneMapped=Yt.getTransfer(w.colorSpace)!==jt,(u!==w||d!==w.version||l!==i.toneMapping)&&(A.material.needsUpdate=!0,u=w,d=w.version,l=i.toneMapping),A.layers.enableAll(),E.unshift(A,A.geometry,A.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new Me(new kn(2,2),new Je({name:"BackgroundMaterial",uniforms:ci(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Yt.getTransfer(w.colorSpace)!==jt,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||d!==w.version||l!==i.toneMapping)&&(c.material.needsUpdate=!0,u=w,d=w.version,l=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function p(E,y){E.getRGB(Po,ja(i)),e.buffers.color.setClear(Po.r,Po.g,Po.b,y,r)}function h(){A!==void 0&&(A.geometry.dispose(),A.material.dispose(),A=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,y=1){o.set(E),a=y,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(E){a=E,p(o,a)},render:m,addToRenderList:_,dispose:h}}function Hf(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=l(null),r=s,o=!1;function a(Q,N,G,I,U){let z=!1,V=d(Q,I,G,N);r!==V&&(r=V,A(r.object)),z=f(Q,I,G,U),z&&m(Q,I,G,U),U!==null&&t.update(U,i.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,w(Q,N,G,I),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function c(){return i.createVertexArray()}function A(Q){return i.bindVertexArray(Q)}function u(Q){return i.deleteVertexArray(Q)}function d(Q,N,G,I){let U=I.wireframe===!0,z=n[N.id];z===void 0&&(z={},n[N.id]=z);let V=Q.isInstancedMesh===!0?Q.id:0,j=z[V];j===void 0&&(j={},z[V]=j);let K=j[G.id];K===void 0&&(K={},j[G.id]=K);let et=K[U];return et===void 0&&(et=l(c()),K[U]=et),et}function l(Q){let N=[],G=[],I=[];for(let U=0;U<e;U++)N[U]=0,G[U]=0,I[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:G,attributeDivisors:I,object:Q,attributes:{},index:null}}function f(Q,N,G,I){let U=r.attributes,z=N.attributes,V=0,j=G.getAttributes();for(let K in j)if(j[K].location>=0){let J=U[K],st=z[K];if(st===void 0&&(K==="instanceMatrix"&&Q.instanceMatrix&&(st=Q.instanceMatrix),K==="instanceColor"&&Q.instanceColor&&(st=Q.instanceColor)),J===void 0||J.attribute!==st||st&&J.data!==st.data)return!0;V++}return r.attributesNum!==V||r.index!==I}function m(Q,N,G,I){let U={},z=N.attributes,V=0,j=G.getAttributes();for(let K in j)if(j[K].location>=0){let J=z[K];J===void 0&&(K==="instanceMatrix"&&Q.instanceMatrix&&(J=Q.instanceMatrix),K==="instanceColor"&&Q.instanceColor&&(J=Q.instanceColor));let st={};st.attribute=J,J&&J.data&&(st.data=J.data),U[K]=st,V++}r.attributes=U,r.attributesNum=V,r.index=I}function _(){let Q=r.newAttributes;for(let N=0,G=Q.length;N<G;N++)Q[N]=0}function p(Q){h(Q,0)}function h(Q,N){let G=r.newAttributes,I=r.enabledAttributes,U=r.attributeDivisors;G[Q]=1,I[Q]===0&&(i.enableVertexAttribArray(Q),I[Q]=1),U[Q]!==N&&(i.vertexAttribDivisor(Q,N),U[Q]=N)}function E(){let Q=r.newAttributes,N=r.enabledAttributes;for(let G=0,I=N.length;G<I;G++)N[G]!==Q[G]&&(i.disableVertexAttribArray(G),N[G]=0)}function y(Q,N,G,I,U,z,V){V===!0?i.vertexAttribIPointer(Q,N,G,U,z):i.vertexAttribPointer(Q,N,G,I,U,z)}function w(Q,N,G,I){_();let U=I.attributes,z=G.getAttributes(),V=N.defaultAttributeValues;for(let j in z){let K=z[j];if(K.location>=0){let et=U[j];if(et===void 0&&(j==="instanceMatrix"&&Q.instanceMatrix&&(et=Q.instanceMatrix),j==="instanceColor"&&Q.instanceColor&&(et=Q.instanceColor)),et!==void 0){let J=et.normalized,st=et.itemSize,nt=t.get(et);if(nt===void 0)continue;let Et=nt.buffer,gt=nt.type,Dt=nt.bytesPerElement,Y=gt===i.INT||gt===i.UNSIGNED_INT||et.gpuType===Zr;if(et.isInterleavedBufferAttribute){let Z=et.data,at=Z.stride,It=et.offset;if(Z.isInstancedInterleavedBuffer){for(let ut=0;ut<K.locationSize;ut++)h(K.location+ut,Z.meshPerAttribute);Q.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let ut=0;ut<K.locationSize;ut++)p(K.location+ut);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let ut=0;ut<K.locationSize;ut++)y(K.location+ut,st/K.locationSize,gt,J,at*Dt,(It+st/K.locationSize*ut)*Dt,Y)}else{if(et.isInstancedBufferAttribute){for(let Z=0;Z<K.locationSize;Z++)h(K.location+Z,et.meshPerAttribute);Q.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let Z=0;Z<K.locationSize;Z++)p(K.location+Z);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let Z=0;Z<K.locationSize;Z++)y(K.location+Z,st/K.locationSize,gt,J,st*Dt,st/K.locationSize*Z*Dt,Y)}}else if(V!==void 0){let J=V[j];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(K.location,J);break;case 3:i.vertexAttrib3fv(K.location,J);break;case 4:i.vertexAttrib4fv(K.location,J);break;default:i.vertexAttrib1fv(K.location,J)}}}}E()}function M(){v();for(let Q in n){let N=n[Q];for(let G in N){let I=N[G];for(let U in I){let z=I[U];for(let V in z)u(z[V].object),delete z[V];delete I[U]}}delete n[Q]}}function x(Q){if(n[Q.id]===void 0)return;let N=n[Q.id];for(let G in N){let I=N[G];for(let U in I){let z=I[U];for(let V in z)u(z[V].object),delete z[V];delete I[U]}}delete n[Q.id]}function S(Q){for(let N in n){let G=n[N];for(let I in G){let U=G[I];if(U[Q.id]===void 0)continue;let z=U[Q.id];for(let V in z)u(z[V].object),delete z[V];delete U[Q.id]}}}function B(Q){for(let N in n){let G=n[N],I=Q.isInstancedMesh===!0?Q.id:0,U=G[I];if(U!==void 0){for(let z in U){let V=U[z];for(let j in V)u(V[j].object),delete V[j];delete U[z]}delete G[I],Object.keys(G).length===0&&delete n[N]}}}function v(){D(),o=!0,r!==s&&(r=s,A(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:v,resetDefaultState:D,dispose:M,releaseStatesOfGeometry:x,releaseStatesOfObject:B,releaseStatesOfProgram:S,initAttributes:_,enableAttribute:p,disableUnusedAttributes:E}}function kf(i,t,e){let n;function s(c){n=c}function r(c,A){i.drawArrays(n,c,A),e.update(A,n,1)}function o(c,A,u){u!==0&&(i.drawArraysInstanced(n,c,A,u),e.update(A,n,u))}function a(c,A,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,A,0,u);let l=0;for(let f=0;f<u;f++)l+=A[f];e.update(l,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Vf(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let S=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(S){return!(S!==je&&n.convert(S)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(S){let B=S===hn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(S!==He&&S!==ln&&!B&&n.convert(S)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(S){if(S==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let A=e.precision!==void 0?e.precision:"highp",u=c(A);u!==A&&(Tt("WebGLRenderer:",A,"not supported, using",u,"instead."),A=u);let d=e.logarithmicDepthBuffer===!0,l=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&l===!1&&Tt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),w=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),x=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:A,logarithmicDepthBuffer:d,reversedDepthBuffer:l,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:p,maxAttributes:h,maxVertexUniforms:E,maxVaryings:y,maxFragmentUniforms:w,maxSamples:M,samples:x}}function zf(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Ye,a=new Pt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,l){let f=d.length!==0||l||n!==0||s;return s=l,n=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,l){e=u(d,l,0)},this.setState=function(d,l,f){let m=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,h=i.get(d);if(!s||m===null||m.length===0||r&&!p)r?u(null):A();else{let E=r?0:n,y=E*4,w=h.clippingState||null;c.value=w,w=u(m,l,y,f);for(let M=0;M!==y;++M)w[M]=e[M];h.clippingState=w,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function A(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,l,f,m){let _=d!==null?d.length:0,p=null;if(_!==0){if(p=c.value,m!==!0||p===null){let h=f+_*4,E=l.matrixWorldInverse;a.getNormalMatrix(E),(p===null||p.length<h)&&(p=new Float32Array(h));for(let y=0,w=f;y!==_;++y,w+=4)o.copy(d[y]).applyMatrix4(E,a),o.normal.toArray(p,w),p[w+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}var Ji=4,Yf=6,Wf=20,Jf=256,Ps=new Gi,il=new kt,aA=null,AA=0,cA=0,lA=!1,Kf=new P,li=new P,No=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=Kf}=r;aA=this._renderer.getRenderTarget(),AA=this._renderer.getActiveCubeFace(),cA=this._renderer.getActiveMipmapLevel(),lA=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ol(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(aA,AA,cA),this._renderer.xr.enabled=lA,t.scissorTest=!1,Wi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Xn||t.mapping===Ai?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),aA=this._renderer.getRenderTarget(),AA=this._renderer.getActiveCubeFace(),cA=this._renderer.getActiveMipmapLevel(),lA=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:xe,minFilter:xe,generateMipmaps:!1,type:hn,format:je,colorSpace:cs,depthBuffer:!1},s=sl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sl(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Xf(r)),this._blurMaterial=qf(r,t,e),this._ggxMaterial=Zf(r,t,e)}return s}_compileMaterial(t){let e=new Me(new ge,t);this._renderer.compile(e,Ps)}_sceneToCubeUV(t,e,n,s,r){let c=new De(90,1,e,n),A=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,l=d.autoClear,f=d.toneMapping;d.getClearColor(il),d.toneMapping=An,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Me(new Ni,new an({name:"PMREM.Background",side:Ue,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,p=_.material,h=!1,E=t.background;E?E.isColor&&(p.color.copy(E),t.background=null,h=!0):(p.color.copy(il),h=!0);for(let y=0;y<6;y++){let w=y%3;w===0?(c.up.set(0,A[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[y],r.y,r.z)):w===1?(c.up.set(0,0,A[y]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[y],r.z)):(c.up.set(0,A[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[y]));let M=this._cubeSize;Wi(s,w*M,y>2?M:0,M,M),d.setRenderTarget(s),h&&d.render(_,c),d.render(t,c)}d.toneMapping=f,d.autoClear=l,t.background=E}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Xn||t.mapping===Ai;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ol()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rl());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Wi(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Ps)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let c=o.uniforms,A=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),d=Math.sqrt(A*A-u*u),l=A*1.25,f=d*l,{_lodMax:m}=this,_=this._sizeLods[n],p=3*_*(n>m-Ji?n-m+Ji:0),h=4*(this._cubeSize-_);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=m-e,Wi(r,p,h,3*_,2*_),s.setRenderTarget(r),s.render(a,Ps),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-n,Wi(t,p,h,3*_,2*_),s.setRenderTarget(t),s.render(a,Ps)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,s,r){let o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[s];c.material=a;let A=a.uniforms;A.envMap.value=t.texture,A.sigma.value=r,A.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],d=3*u*(s>this._lodMax-Ji?s-this._lodMax+Ji:0),l=4*(this._cubeSize-u);Wi(e,d,l,3*u,2*u),o.setRenderTarget(e),o.render(c,Ps)}};function Xf(i){let t=[],e=[],n=i,s=i-Ji+1+Yf;for(let r=0;r<s;r++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),c=-a,A=1+a,u=[c,c,A,c,A,A,c,c,A,A,c,A],d=6,l=6,f=3,m=new Float32Array(f*l*d),_=new Float32Array(f*l*d);for(let h=0;h<d;h++){let E=h%3*2/3-1,y=h>2?0:-1,w=[E,y,0,E+2/3,y,0,E+2/3,y+1,0,E,y,0,E+2/3,y+1,0,E,y+1,0];m.set(w,f*l*h);for(let M=0;M<l;M++){let x=u[M*2]*2-1,S=u[M*2+1]*2-1;h===0?li.set(1,S,x):h===1?li.set(-x,1,-S):h===2?li.set(-x,S,1):h===3?li.set(-1,S,-x):h===4?li.set(-x,-1,S):li.set(x,S,-1),li.toArray(_,(h*l+M)*f)}}let p=new ge;p.setAttribute("position",new ue(m,f)),p.setAttribute("outputDirection",new ue(_,f)),e.push(new Me(p,null)),n>Ji&&n--}return{lodMeshes:e,sizeLods:t}}function sl(i,t,e){let n=new Oe(i,t,e);return n.texture.mapping=bs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Wi(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Zf(i,t,e){return new Je({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Jf,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ho(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function qf(i,t,e){return new Je({name:"SphericalGaussianBlur",defines:{SAMPLES:Wf,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ho(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function rl(){return new Je({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ho(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function ol(){return new Je({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ho(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Ho(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Go=class extends Oe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ms(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ni(5,5,5),r=new Je({name:"CubemapFromEquirect",uniforms:ci(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ue,blending:wn});r.uniforms.tEquirect.value=e;let o=new Me(s,r),a=e.minFilter;return e.minFilter===Zn&&(e.minFilter=xe),new Vr(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}};function jf(i){let t=new WeakMap,e=new WeakMap,n=null;function s(l,f=!1){return l==null?null:f?o(l):r(l)}function r(l){if(l&&l.isTexture){let f=l.mapping;if(f===Jr||f===Kr)if(t.has(l)){let m=t.get(l).texture;return a(m,l.mapping)}else{let m=l.image;if(m&&m.height>0){let _=new Go(m.height);return _.fromEquirectangularTexture(i,l),t.set(l,_),l.addEventListener("dispose",A),a(_.texture,l.mapping)}else return null}}return l}function o(l){if(l&&l.isTexture){let f=l.mapping,m=f===Jr||f===Kr,_=f===Xn||f===Ai;if(m||_){let p=e.get(l),h=p!==void 0?p.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==h)return n===null&&(n=new No(i)),p=m?n.fromEquirectangular(l,p):n.fromCubemap(l,p),p.texture.pmremVersion=l.pmremVersion,e.set(l,p),p.texture;if(p!==void 0)return p.texture;{let E=l.image;return m&&E&&E.height>0||_&&E&&c(E)?(n===null&&(n=new No(i)),p=m?n.fromEquirectangular(l):n.fromCubemap(l),p.texture.pmremVersion=l.pmremVersion,e.set(l,p),l.addEventListener("dispose",u),p.texture):null}}}return l}function a(l,f){return f===Jr?l.mapping=Xn:f===Kr&&(l.mapping=Ai),l}function c(l){let f=0,m=6;for(let _=0;_<m;_++)l[_]!==void 0&&f++;return f===m}function A(l){let f=l.target;f.removeEventListener("dispose",A);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function u(l){let f=l.target;f.removeEventListener("dispose",u);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function $f(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&si("WebGLRenderer: "+n+" extension not supported."),s}}}function tp(i,t,e,n){let s={},r=new WeakMap;function o(d){let l=d.target;l.index!==null&&t.remove(l.index);for(let m in l.attributes)t.remove(l.attributes[m]);l.removeEventListener("dispose",o),delete s[l.id];let f=r.get(l);f&&(t.remove(f),r.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,e.memory.geometries--}function a(d,l){return s[l.id]===!0||(l.addEventListener("dispose",o),s[l.id]=!0,e.memory.geometries++),l}function c(d){let l=d.attributes;for(let f in l)t.update(l[f],i.ARRAY_BUFFER)}function A(d){let l=[],f=d.index,m=d.attributes.position,_=0;if(m===void 0)return;if(f!==null){let E=f.array;_=f.version;for(let y=0,w=E.length;y<w;y+=3){let M=E[y+0],x=E[y+1],S=E[y+2];l.push(M,x,x,S,S,M)}}else{let E=m.array;_=m.version;for(let y=0,w=E.length/3-1;y<w;y+=3){let M=y+0,x=y+1,S=y+2;l.push(M,x,x,S,S,M)}}let p=new(m.count>=65535?ps:fs)(l,1);p.version=_;let h=r.get(d);h&&t.remove(h),r.set(d,p)}function u(d){let l=r.get(d);if(l){let f=d.index;f!==null&&l.version<f.version&&A(d)}else A(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function ep(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,l){i.drawElements(n,l,r,d*o),e.update(l,n,1)}function A(d,l,f){f!==0&&(i.drawElementsInstanced(n,l,r,d*o,f),e.update(l,n,f))}function u(d,l,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,l,0,r,d,0,f);let _=0;for(let p=0;p<f;p++)_+=l[p];e.update(_,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=A,this.renderMultiDraw=u}function np(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Ft("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function ip(i,t,e){let n=new WeakMap,s=new ce;function r(o,a,c){let A=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,l=n.get(a);if(l===void 0||l.count!==d){let v=function(){S.dispose(),n.delete(a),a.removeEventListener("dispose",v)};l!==void 0&&l.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],h=a.morphAttributes.normal||[],E=a.morphAttributes.color||[],y=0;f===!0&&(y=1),m===!0&&(y=2),_===!0&&(y=3);let w=a.attributes.position.count*y,M=1;w>t.maxTextureSize&&(M=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);let x=new Float32Array(w*M*4*d),S=new us(x,w,M,d);S.type=ln,S.needsUpdate=!0;let B=y*4;for(let D=0;D<d;D++){let Q=p[D],N=h[D],G=E[D],I=w*M*4*D;for(let U=0;U<Q.count;U++){let z=U*B;f===!0&&(s.fromBufferAttribute(Q,U),x[I+z+0]=s.x,x[I+z+1]=s.y,x[I+z+2]=s.z,x[I+z+3]=0),m===!0&&(s.fromBufferAttribute(N,U),x[I+z+4]=s.x,x[I+z+5]=s.y,x[I+z+6]=s.z,x[I+z+7]=0),_===!0&&(s.fromBufferAttribute(G,U),x[I+z+8]=s.x,x[I+z+9]=s.y,x[I+z+10]=s.z,x[I+z+11]=G.itemSize===4?s.w:1)}}l={count:d,texture:S,size:new Rt(w,M)},n.set(a,l),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<A.length;_++)f+=A[_];let m=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",A)}c.getUniforms().setValue(i,"morphTargetsTexture",l.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",l.size)}return{update:r}}function sp(i,t,e,n,s){let r=new WeakMap;function o(A){let u=s.render.frame,d=A.geometry,l=t.get(A,d);if(r.get(l)!==u&&(t.update(l),r.set(l,u)),A.isInstancedMesh&&(A.hasEventListener("dispose",c)===!1&&A.addEventListener("dispose",c),r.get(A)!==u&&(e.update(A.instanceMatrix,i.ARRAY_BUFFER),A.instanceColor!==null&&e.update(A.instanceColor,i.ARRAY_BUFFER),r.set(A,u))),A.isSkinnedMesh){let f=A.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return l}function a(){r=new WeakMap}function c(A){let u=A.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}var rp={[Fa]:"LINEAR_TONE_MAPPING",[Ra]:"REINHARD_TONE_MAPPING",[Ua]:"CINEON_TONE_MAPPING",[Pa]:"ACES_FILMIC_TONE_MAPPING",[Na]:"AGX_TONE_MAPPING",[Ga]:"NEUTRAL_TONE_MAPPING",[La]:"CUSTOM_TONE_MAPPING"};function op(i,t,e,n,s,r){let o=new Oe(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,A=new ge;A.setAttribute("position",new Ne([-1,3,0,-1,-1,0,3,-1,0],3)),A.setAttribute("uv",new Ne([0,2,0,0,2,0],2));let u=new Ir({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Me(A,u),l=new Gi(-1,1,1,-1,0,1),f=null,m=null,_=!1,p,h=null,E=[],y=!1;this.setSize=function(w,M){o.setSize(w,M),a!==null&&a.setSize(w,M),c!==null&&c.setSize(w,M);for(let x=0;x<E.length;x++){let S=E[x];S.setSize&&S.setSize(w,M)}},this.setEffects=function(w){E=w,y=E.length>0&&E[0].isRenderPass===!0;let M=o.width,x=o.height;E.length>0&&a===null&&(a=new Oe(M,x,{type:hn,depthBuffer:!1,stencilBuffer:!1}),c=new Oe(M,x,{type:hn,depthBuffer:!1,stencilBuffer:!1}));for(let S=0;S<E.length;S++){let B=E[S];B.setSize&&B.setSize(M,x)}},this.begin=function(w,M){if(_||w.toneMapping===An&&E.length===0)return!1;if(h=M,M!==null){let x=M.width,S=M.height;(o.width!==x||o.height!==S)&&this.setSize(x,S)}return y===!1&&w.setRenderTarget(o),p=w.toneMapping,w.toneMapping=An,!0},this.hasRenderPass=function(){return y},this.end=function(w,M){w.toneMapping=p,_=!0;let x=o,S=a;for(let B=0;B<E.length;B++){let v=E[B];v.enabled!==!1&&(v.render(w,S,x,M),v.needsSwap!==!1&&(x=S,S=S===a?c:a))}if(f!==w.outputColorSpace||m!==w.toneMapping){f=w.outputColorSpace,m=w.toneMapping,u.defines={},Yt.getTransfer(f)===jt&&(u.defines.SRGB_TRANSFER="");let B=rp[m];B&&(u.defines[B]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=x.texture,w.setRenderTarget(h),w.render(d,l),h=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),A.dispose(),u.dispose()}}var vl=new Ge,dA=new Hn(1,1),Sl=new us,bl=new xr,Il=new ms,al=[],Al=[],cl=new Float32Array(16),ll=new Float32Array(9),hl=new Float32Array(4);function Xi(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=al[s];if(r===void 0&&(r=new Float32Array(s),al[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function me(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Be(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ko(i,t){let e=Al[t];e===void 0&&(e=new Int32Array(t),Al[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function ap(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Ap(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;i.uniform2fv(this.addr,t),Be(e,t)}}function cp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(me(e,t))return;i.uniform3fv(this.addr,t),Be(e,t)}}function lp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;i.uniform4fv(this.addr,t),Be(e,t)}}function hp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Be(e,t)}else{if(me(e,n))return;hl.set(n),i.uniformMatrix2fv(this.addr,!1,hl),Be(e,n)}}function up(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Be(e,t)}else{if(me(e,n))return;ll.set(n),i.uniformMatrix3fv(this.addr,!1,ll),Be(e,n)}}function dp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Be(e,t)}else{if(me(e,n))return;cl.set(n),i.uniformMatrix4fv(this.addr,!1,cl),Be(e,n)}}function fp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function pp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;i.uniform2iv(this.addr,t),Be(e,t)}}function gp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(me(e,t))return;i.uniform3iv(this.addr,t),Be(e,t)}}function mp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;i.uniform4iv(this.addr,t),Be(e,t)}}function Bp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function wp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;i.uniform2uiv(this.addr,t),Be(e,t)}}function Cp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(me(e,t))return;i.uniform3uiv(this.addr,t),Be(e,t)}}function Ep(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;i.uniform4uiv(this.addr,t),Be(e,t)}}function _p(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(dA.compareFunction=e.isReversedDepthBuffer()?Uo:Ro,r=dA):r=vl,e.setTexture2D(t||r,s)}function Mp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||bl,s)}function xp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Il,s)}function yp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Sl,s)}function vp(i){switch(i){case 5126:return ap;case 35664:return Ap;case 35665:return cp;case 35666:return lp;case 35674:return hp;case 35675:return up;case 35676:return dp;case 5124:case 35670:return fp;case 35667:case 35671:return pp;case 35668:case 35672:return gp;case 35669:case 35673:return mp;case 5125:return Bp;case 36294:return wp;case 36295:return Cp;case 36296:return Ep;case 35678:case 36198:case 36298:case 36306:case 35682:return _p;case 35679:case 36299:case 36307:return Mp;case 35680:case 36300:case 36308:case 36293:return xp;case 36289:case 36303:case 36311:case 36292:return yp}}function Sp(i,t){i.uniform1fv(this.addr,t)}function bp(i,t){let e=Xi(t,this.size,2);i.uniform2fv(this.addr,e)}function Ip(i,t){let e=Xi(t,this.size,3);i.uniform3fv(this.addr,e)}function Dp(i,t){let e=Xi(t,this.size,4);i.uniform4fv(this.addr,e)}function Tp(i,t){let e=Xi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Qp(i,t){let e=Xi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Fp(i,t){let e=Xi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Rp(i,t){i.uniform1iv(this.addr,t)}function Up(i,t){i.uniform2iv(this.addr,t)}function Pp(i,t){i.uniform3iv(this.addr,t)}function Lp(i,t){i.uniform4iv(this.addr,t)}function Np(i,t){i.uniform1uiv(this.addr,t)}function Gp(i,t){i.uniform2uiv(this.addr,t)}function Op(i,t){i.uniform3uiv(this.addr,t)}function Hp(i,t){i.uniform4uiv(this.addr,t)}function kp(i,t,e){let n=this.cache,s=t.length,r=ko(e,s);me(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=dA:o=vl;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function Vp(i,t,e){let n=this.cache,s=t.length,r=ko(e,s);me(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||bl,r[o])}function zp(i,t,e){let n=this.cache,s=t.length,r=ko(e,s);me(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Il,r[o])}function Yp(i,t,e){let n=this.cache,s=t.length,r=ko(e,s);me(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Sl,r[o])}function Wp(i){switch(i){case 5126:return Sp;case 35664:return bp;case 35665:return Ip;case 35666:return Dp;case 35674:return Tp;case 35675:return Qp;case 35676:return Fp;case 5124:case 35670:return Rp;case 35667:case 35671:return Up;case 35668:case 35672:return Pp;case 35669:case 35673:return Lp;case 5125:return Np;case 36294:return Gp;case 36295:return Op;case 36296:return Hp;case 35678:case 36198:case 36298:case 36306:case 35682:return kp;case 35679:case 36299:case 36307:return Vp;case 35680:case 36300:case 36308:case 36293:return zp;case 36289:case 36303:case 36311:case 36292:return Yp}}var fA=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=vp(e.type)}},pA=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Wp(e.type)}},gA=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},hA=/(\w+)(\])?(\[|\.)?/g;function ul(i,t){i.seq.push(t),i.map[t.id]=t}function Jp(i,t,e){let n=i.name,s=n.length;for(hA.lastIndex=0;;){let r=hA.exec(n),o=hA.lastIndex,a=r[1],c=r[2]==="]",A=r[3];if(c&&(a=a|0),A===void 0||A==="["&&o+2===s){ul(e,A===void 0?new fA(a,i,t):new pA(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new gA(a),ul(e,d)),e=d}}}var Ki=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);Jp(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function dl(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Kp=37297,Xp=0;function Zp(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var fl=new Pt;function qp(i){Yt._getMatrix(fl,Yt.workingColorSpace,i);let t=`mat3( ${fl.elements.map(e=>e.toFixed(4))} )`;switch(Yt.getTransfer(i)){case ls:return[t,"LinearTransferOETF"];case jt:return[t,"sRGBTransferOETF"];default:return Tt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function pl(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Zp(i.getShaderSource(t),a)}else return r}function jp(i,t){let e=qp(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var $p={[Fa]:"Linear",[Ra]:"Reinhard",[Ua]:"Cineon",[Pa]:"ACESFilmic",[Na]:"AgX",[Ga]:"Neutral",[La]:"Custom"};function tg(i,t){let e=$p[t];return e===void 0?(Tt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Lo=new P;function eg(){Yt.getLuminanceCoefficients(Lo);let i=Lo.x.toFixed(4),t=Lo.y.toFixed(4),e=Lo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ng(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ns).join(`
`)}function ig(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function sg(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ns(i){return i!==""}function gl(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ml(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var rg=/^[ \t]*#include +<([\w\d./]+)>/gm;function mA(i){return i.replace(rg,ag)}var og=new Map;function ag(i,t){let e=Ht[t];if(e===void 0){let n=og.get(t);if(n!==void 0)e=Ht[n],Tt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return mA(e)}var Ag=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bl(i){return i.replace(Ag,cg)}function cg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function wl(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var lg={[Ss]:"SHADOWMAP_TYPE_PCF",[Hi]:"SHADOWMAP_TYPE_VSM"};function hg(i){return lg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ug={[Xn]:"ENVMAP_TYPE_CUBE",[Ai]:"ENVMAP_TYPE_CUBE",[bs]:"ENVMAP_TYPE_CUBE_UV"};function dg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":ug[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var fg={[Ai]:"ENVMAP_MODE_REFRACTION"};function pg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":fg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var gg={[Wr]:"ENVMAP_BLENDING_MULTIPLY",[Pc]:"ENVMAP_BLENDING_MIX",[Lc]:"ENVMAP_BLENDING_ADD"};function mg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":gg[i.combine]||"ENVMAP_BLENDING_NONE"}function Bg(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function wg(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=hg(e),A=dg(e),u=pg(e),d=mg(e),l=Bg(e),f=ng(e),m=ig(r),_=s.createProgram(),p,h,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ns).join(`
`),p.length>0&&(p+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ns).join(`
`),h.length>0&&(h+=`
`)):(p=[wl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ns).join(`
`),h=[wl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+A:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",l?"#define CUBEUV_TEXEL_WIDTH "+l.texelWidth:"",l?"#define CUBEUV_TEXEL_HEIGHT "+l.texelHeight:"",l?"#define CUBEUV_MAX_MIP "+l.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==An?"#define TONE_MAPPING":"",e.toneMapping!==An?Ht.tonemapping_pars_fragment:"",e.toneMapping!==An?tg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,jp("linearToOutputTexel",e.outputColorSpace),eg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ns).join(`
`)),o=mA(o),o=gl(o,e),o=ml(o,e),a=mA(a),a=gl(a,e),a=ml(a,e),o=Bl(o),a=Bl(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,h=["#define varying in",e.glslVersion===Ka?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ka?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);let y=E+p+o,w=E+h+a,M=dl(s,s.VERTEX_SHADER,y),x=dl(s,s.FRAGMENT_SHADER,w);s.attachShader(_,M),s.attachShader(_,x),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function S(Q){if(i.debug.checkShaderErrors){let N=s.getProgramInfoLog(_)||"",G=s.getShaderInfoLog(M)||"",I=s.getShaderInfoLog(x)||"",U=N.trim(),z=G.trim(),V=I.trim(),j=!0,K=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,M,x);else{let et=pl(s,M,"vertex"),J=pl(s,x,"fragment");Ft("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+Q.name+`
Material Type: `+Q.type+`

Program Info Log: `+U+`
`+et+`
`+J)}else U!==""?Tt("WebGLProgram: Program Info Log:",U):(z===""||V==="")&&(K=!1);K&&(Q.diagnostics={runnable:j,programLog:U,vertexShader:{log:z,prefix:p},fragmentShader:{log:V,prefix:h}})}s.deleteShader(M),s.deleteShader(x),B=new Ki(s,_),v=sg(s,_)}let B;this.getUniforms=function(){return B===void 0&&S(this),B};let v;this.getAttributes=function(){return v===void 0&&S(this),v};let D=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(_,Kp)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Xp++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=M,this.fragmentShader=x,this}var Cg=0,BA=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new wA(t),e.set(t,n)),n}},wA=class{constructor(t){this.id=Cg++,this.code=t,this.usedTimes=0}};function Eg(i){return i===jn||i===Rs||i===Us}function _g(i,t,e,n,s,r){let o=new Fi,a=new BA,c=new Set,A=[],u=new Map,d=n.logarithmicDepthBuffer,l=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(B){return c.add(B),B===0?"uv":`uv${B}`}function _(B,v,D,Q,N,G){let I=Q.fog,U=N.geometry,z=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?Q.environment:null,V=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,j=t.get(B.envMap||z,V),K=j&&j.mapping===bs?j.image.height:null,et=f[B.type];B.precision!==null&&(l=n.getMaxPrecision(B.precision),l!==B.precision&&Tt("WebGLProgram.getParameters:",B.precision,"not supported, using",l,"instead."));let J=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,st=J!==void 0?J.length:0,nt=0;U.morphAttributes.position!==void 0&&(nt=1),U.morphAttributes.normal!==void 0&&(nt=2),U.morphAttributes.color!==void 0&&(nt=3);let Et,gt,Dt,Y;if(et){let se=En[et];Et=se.vertexShader,gt=se.fragmentShader}else{Et=B.vertexShader,gt=B.fragmentShader;let se=a.getVertexShaderStage(B),Zt=a.getFragmentShaderStage(B);a.update(B,se,Zt),Dt=se.id,Y=Zt.id}let Z=i.getRenderTarget(),at=i.state.buffers.depth.getReversed(),It=N.isInstancedMesh===!0,ut=N.isBatchedMesh===!0,Ut=!!B.map,ie=!!B.matcap,Lt=!!j,Wt=!!B.aoMap,Kt=!!B.lightMap,Gt=!!B.bumpMap&&B.wireframe===!1,Xt=!!B.normalMap,Ce=!!B.displacementMap,Pe=!!B.emissiveMap,le=!!B.metalnessMap,de=!!B.roughnessMap,R=B.anisotropy>0,ve=B.clearcoat>0,$t=B.dispersion>0,b=B.retroreflectivity>0,g=B.iridescence>0,L=B.sheen>0,k=B.transmission>0,X=R&&!!B.anisotropyMap,rt=ve&&!!B.clearcoatMap,ot=ve&&!!B.clearcoatNormalMap,q=ve&&!!B.clearcoatRoughnessMap,tt=g&&!!B.iridescenceMap,At=g&&!!B.iridescenceThicknessMap,vt=L&&!!B.sheenColorMap,dt=L&&!!B.sheenRoughnessMap,ct=!!B.specularMap,St=!!B.specularColorMap,Qt=!!B.specularIntensityMap,Nt=k&&!!B.transmissionMap,F=k&&!!B.thicknessMap,lt=!!B.gradientMap,$=!!B.alphaMap,ht=B.alphaTest>0,Bt=!!B.alphaHash,it=!!B.extensions,bt=An;B.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(bt=i.toneMapping);let xt={shaderID:et,shaderType:B.type,shaderName:B.name,vertexShader:Et,fragmentShader:gt,defines:B.defines,customVertexShaderID:Dt,customFragmentShaderID:Y,isRawShaderMaterial:B.isRawShaderMaterial===!0,glslVersion:B.glslVersion,precision:l,batching:ut,batchingColor:ut&&N._colorsTexture!==null,instancing:It,instancingColor:It&&N.instanceColor!==null,instancingMorph:It&&N.morphTexture!==null,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Yt.workingColorSpace,alphaToCoverage:!!B.alphaToCoverage,map:Ut,matcap:ie,envMap:Lt,envMapMode:Lt&&j.mapping,envMapCubeUVHeight:K,aoMap:Wt,lightMap:Kt,bumpMap:Gt,normalMap:Xt,displacementMap:Ce,emissiveMap:Pe,normalMapObjectSpace:Xt&&B.normalMapType===Oc,normalMapTangentSpace:Xt&&B.normalMapType===Fo,packedNormalMap:Xt&&B.normalMapType===Fo&&Eg(B.normalMap.format),metalnessMap:le,roughnessMap:de,anisotropy:R,anisotropyMap:X,clearcoat:ve,clearcoatMap:rt,clearcoatNormalMap:ot,clearcoatRoughnessMap:q,dispersion:$t,retroreflection:b,iridescence:g,iridescenceMap:tt,iridescenceThicknessMap:At,sheen:L,sheenColorMap:vt,sheenRoughnessMap:dt,specularMap:ct,specularColorMap:St,specularIntensityMap:Qt,transmission:k,transmissionMap:Nt,thicknessMap:F,gradientMap:lt,opaque:B.transparent===!1&&B.blending===ki&&B.alphaToCoverage===!1,alphaMap:$,alphaTest:ht,alphaHash:Bt,combine:B.combine,mapUv:Ut&&m(B.map.channel),aoMapUv:Wt&&m(B.aoMap.channel),lightMapUv:Kt&&m(B.lightMap.channel),bumpMapUv:Gt&&m(B.bumpMap.channel),normalMapUv:Xt&&m(B.normalMap.channel),displacementMapUv:Ce&&m(B.displacementMap.channel),emissiveMapUv:Pe&&m(B.emissiveMap.channel),metalnessMapUv:le&&m(B.metalnessMap.channel),roughnessMapUv:de&&m(B.roughnessMap.channel),anisotropyMapUv:X&&m(B.anisotropyMap.channel),clearcoatMapUv:rt&&m(B.clearcoatMap.channel),clearcoatNormalMapUv:ot&&m(B.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:q&&m(B.clearcoatRoughnessMap.channel),iridescenceMapUv:tt&&m(B.iridescenceMap.channel),iridescenceThicknessMapUv:At&&m(B.iridescenceThicknessMap.channel),sheenColorMapUv:vt&&m(B.sheenColorMap.channel),sheenRoughnessMapUv:dt&&m(B.sheenRoughnessMap.channel),specularMapUv:ct&&m(B.specularMap.channel),specularColorMapUv:St&&m(B.specularColorMap.channel),specularIntensityMapUv:Qt&&m(B.specularIntensityMap.channel),transmissionMapUv:Nt&&m(B.transmissionMap.channel),thicknessMapUv:F&&m(B.thicknessMap.channel),alphaMapUv:$&&m(B.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Xt||R),vertexNormals:!!U.attributes.normal,vertexColors:B.vertexColors,vertexAlphas:B.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!U.attributes.uv&&(Ut||$),fog:!!I,useFog:B.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:B.wireframe===!1&&(B.flatShading===!0||U.attributes.normal===void 0&&Xt===!1&&(B.isMeshLambertMaterial||B.isMeshPhongMaterial||B.isMeshStandardMaterial||B.isMeshPhysicalMaterial)),sizeAttenuation:B.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:at,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:st,morphTextureStride:nt,numSunLights:v.sun.length,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numSunLightShadows:v.sunShadowMap.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:B.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:bt,decodeVideoTexture:Ut&&B.map.isVideoTexture===!0&&Yt.getTransfer(B.map.colorSpace)===jt,decodeVideoTextureEmissive:Pe&&B.emissiveMap.isVideoTexture===!0&&Yt.getTransfer(B.emissiveMap.colorSpace)===jt,premultipliedAlpha:B.premultipliedAlpha,doubleSided:B.side===Te,flipSided:B.side===Ue,useDepthPacking:B.depthPacking>=0,depthPacking:B.depthPacking||0,index0AttributeName:B.index0AttributeName,extensionClipCullDistance:it&&B.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(it&&B.extensions.multiDraw===!0||ut)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:B.customProgramCacheKey()};return xt.vertexUv1s=c.has(1),xt.vertexUv2s=c.has(2),xt.vertexUv3s=c.has(3),c.clear(),xt}function p(B){let v=[];if(B.shaderID?v.push(B.shaderID):(v.push(B.customVertexShaderID),v.push(B.customFragmentShaderID)),B.defines!==void 0)for(let D in B.defines)v.push(D),v.push(B.defines[D]);return B.isRawShaderMaterial===!1&&(h(v,B),E(v,B),v.push(i.outputColorSpace)),v.push(B.customProgramCacheKey),v.join()}function h(B,v){B.push(v.precision),B.push(v.outputColorSpace),B.push(v.envMapMode),B.push(v.envMapCubeUVHeight),B.push(v.mapUv),B.push(v.alphaMapUv),B.push(v.lightMapUv),B.push(v.aoMapUv),B.push(v.bumpMapUv),B.push(v.normalMapUv),B.push(v.displacementMapUv),B.push(v.emissiveMapUv),B.push(v.metalnessMapUv),B.push(v.roughnessMapUv),B.push(v.anisotropyMapUv),B.push(v.clearcoatMapUv),B.push(v.clearcoatNormalMapUv),B.push(v.clearcoatRoughnessMapUv),B.push(v.iridescenceMapUv),B.push(v.iridescenceThicknessMapUv),B.push(v.sheenColorMapUv),B.push(v.sheenRoughnessMapUv),B.push(v.specularMapUv),B.push(v.specularColorMapUv),B.push(v.specularIntensityMapUv),B.push(v.transmissionMapUv),B.push(v.thicknessMapUv),B.push(v.combine),B.push(v.fogExp2),B.push(v.sizeAttenuation),B.push(v.morphTargetsCount),B.push(v.morphAttributeCount),B.push(v.numSunLights),B.push(v.numDirLights),B.push(v.numPointLights),B.push(v.numSpotLights),B.push(v.numSpotLightMaps),B.push(v.numHemiLights),B.push(v.numRectAreaLights),B.push(v.numSunLightShadows),B.push(v.numDirLightShadows),B.push(v.numPointLightShadows),B.push(v.numSpotLightShadows),B.push(v.numSpotLightShadowsWithMaps),B.push(v.numLightProbes),B.push(v.shadowMapType),B.push(v.toneMapping),B.push(v.numClippingPlanes),B.push(v.numClipIntersection),B.push(v.depthPacking)}function E(B,v){o.disableAll(),v.instancing&&o.enable(0),v.instancingColor&&o.enable(1),v.instancingMorph&&o.enable(2),v.matcap&&o.enable(3),v.envMap&&o.enable(4),v.normalMapObjectSpace&&o.enable(5),v.normalMapTangentSpace&&o.enable(6),v.clearcoat&&o.enable(7),v.iridescence&&o.enable(8),v.alphaTest&&o.enable(9),v.vertexColors&&o.enable(10),v.vertexAlphas&&o.enable(11),v.vertexUv1s&&o.enable(12),v.vertexUv2s&&o.enable(13),v.vertexUv3s&&o.enable(14),v.vertexTangents&&o.enable(15),v.anisotropy&&o.enable(16),v.alphaHash&&o.enable(17),v.batching&&o.enable(18),v.dispersion&&o.enable(19),v.retroreflection&&o.enable(24),v.batchingColor&&o.enable(20),v.gradientMap&&o.enable(21),v.packedNormalMap&&o.enable(22),v.vertexNormals&&o.enable(23),B.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reversedDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.decodeVideoTextureEmissive&&o.enable(20),v.alphaToCoverage&&o.enable(21),v.numLightProbeGrids>0&&o.enable(22),v.hasPositionAttribute&&o.enable(23),B.push(o.mask)}function y(B){let v=f[B.type],D;if(v){let Q=En[v];D=tl.clone(Q.uniforms)}else D=B.uniforms;return D}function w(B,v){let D=u.get(v);return D!==void 0?++D.usedTimes:(D=new wg(i,v,B,s),A.push(D),u.set(v,D)),D}function M(B){if(--B.usedTimes===0){let v=A.indexOf(B);A[v]=A[A.length-1],A.pop(),u.delete(B.cacheKey),B.destroy()}}function x(B){a.remove(B)}function S(){a.dispose()}return{getParameters:_,getProgramCacheKey:p,getUniforms:y,acquireProgram:w,releaseProgram:M,releaseShaderCache:x,programs:A,dispose:S}}function Mg(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function xg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Cl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function El(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(l){let f=0;return l.isInstancedMesh&&(f+=2),l.isSkinnedMesh&&(f+=1),f}function a(l,f,m,_,p,h){let E=i[t];return E===void 0?(E={id:l.id,object:l,geometry:f,material:m,materialVariant:o(l),groupOrder:_,renderOrder:l.renderOrder,z:p,group:h},i[t]=E):(E.id=l.id,E.object=l,E.geometry=f,E.material=m,E.materialVariant=o(l),E.groupOrder=_,E.renderOrder=l.renderOrder,E.z=p,E.group=h),t++,E}function c(l,f,m,_,p,h,E){E.reversedDepth===!0&&(p=-p);let y=a(l,f,m,_,p,h);m.transmission>0?n.push(y):m.transparent===!0?s.push(y):e.push(y)}function A(l,f,m,_,p,h){let E=a(l,f,m,_,p,h);m.transmission>0?n.unshift(E):m.transparent===!0?s.unshift(E):e.unshift(E)}function u(l,f){e.length>1&&e.sort(l||xg),n.length>1&&n.sort(f||Cl),s.length>1&&s.sort(f||Cl)}function d(){for(let l=t,f=i.length;l<f;l++){let m=i[l];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:A,finish:d,sort:u}}function yg(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new El,i.set(n,[o])):s>=r.length?(o=new El,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function vg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new P,color:new kt};break;case"SpotLight":e={position:new P,direction:new P,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new P,halfWidth:new P,halfHeight:new P};break}return i[t.id]=e,e}}}function Sg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var bg=0;function Ig(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Dg(i){let t=new vg,e=Sg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let A=0;A<9;A++)n.probe.push(new P);let s=new P,r=new oe,o=new oe;function a(A){let u=0,d=0,l=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let f=0,m=0,_=0,p=0,h=0,E=0,y=0,w=0,M=0,x=0,S=0,B=0,v=0,D=0;A.sort(Ig);for(let N=0,G=A.length;N<G;N++){let I=A[N],U=I.color,z=I.intensity,V=I.distance,j=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===jn?j=I.shadow.map.texture:j=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=U.r*z,d+=U.g*z,l+=U.b*z;else if(I.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(I.sh.coefficients[K],z);D++}else if(I.isSunLight){let K=t.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let et=I.shadow,J=e.get(I);J.shadowIntensity=et.intensity,J.shadowBias=et.bias,J.shadowNormalBias=et.normalBias,J.shadowRadius=et.radius,J.shadowMapSize.copy(et.mapSize).multiply(et.getFrameExtents()),n.sunShadow[m]=J,n.sunShadowMap[m]=j;let st=et.getViewportCount();for(let nt=0;nt<st;nt++)n.sunShadowMatrix[_+nt]=et.getMatrix(nt),n.sunShadowCascade[_+nt]=et._cascadeData[nt];_+=st,m++}n.sun[f]=K,f++}else if(I.isDirectionalLight){let K=t.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let et=I.shadow,J=e.get(I);J.shadowIntensity=et.intensity,J.shadowBias=et.bias,J.shadowNormalBias=et.normalBias,J.shadowRadius=et.radius,J.shadowMapSize=et.mapSize,n.directionalShadow[p]=J,n.directionalShadowMap[p]=j,n.directionalShadowMatrix[p]=I.shadow.matrix,M++}n.directional[p]=K,p++}else if(I.isSpotLight){let K=t.get(I);K.position.setFromMatrixPosition(I.matrixWorld),K.color.copy(U).multiplyScalar(z),K.distance=V,K.coneCos=Math.cos(I.angle),K.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),K.decay=I.decay,n.spot[E]=K;let et=I.shadow;if(I.map&&(n.spotLightMap[B]=I.map,B++,et.updateMatrices(I),I.castShadow&&v++),n.spotLightMatrix[E]=et.matrix,I.castShadow){let J=e.get(I);J.shadowIntensity=et.intensity,J.shadowBias=et.bias,J.shadowNormalBias=et.normalBias,J.shadowRadius=et.radius,J.shadowMapSize=et.mapSize,n.spotShadow[E]=J,n.spotShadowMap[E]=j,S++}E++}else if(I.isRectAreaLight){let K=t.get(I);K.color.copy(U).multiplyScalar(z),K.halfWidth.set(I.width*.5,0,0),K.halfHeight.set(0,I.height*.5,0),n.rectArea[y]=K,y++}else if(I.isPointLight){let K=t.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),K.distance=I.distance,K.decay=I.decay,I.castShadow){let et=I.shadow,J=e.get(I);J.shadowIntensity=et.intensity,J.shadowBias=et.bias,J.shadowNormalBias=et.normalBias,J.shadowRadius=et.radius,J.shadowMapSize=et.mapSize,J.shadowCameraNear=et.camera.near,J.shadowCameraFar=et.camera.far,n.pointShadow[h]=J,n.pointShadowMap[h]=j,n.pointShadowMatrix[h]=I.shadow.matrix,x++}n.point[h]=K,h++}else if(I.isHemisphereLight){let K=t.get(I);K.skyColor.copy(I.color).multiplyScalar(z),K.groundColor.copy(I.groundColor).multiplyScalar(z),n.hemi[w]=K,w++}}y>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ft.LTC_FLOAT_1,n.rectAreaLTC2=ft.LTC_FLOAT_2):(n.rectAreaLTC1=ft.LTC_HALF_1,n.rectAreaLTC2=ft.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=l;let Q=n.hash;(Q.sunLength!==f||Q.directionalLength!==p||Q.pointLength!==h||Q.spotLength!==E||Q.rectAreaLength!==y||Q.hemiLength!==w||Q.numSunShadows!==m||Q.numDirectionalShadows!==M||Q.numPointShadows!==x||Q.numSpotShadows!==S||Q.numSpotMaps!==B||Q.numLightProbes!==D)&&(n.sun.length=f,n.directional.length=p,n.spot.length=E,n.rectArea.length=y,n.point.length=h,n.hemi.length=w,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=x,n.pointShadowMap.length=x,n.pointShadowMatrix.length=x,n.spotShadow.length=S,n.spotShadowMap.length=S,n.spotLightMatrix.length=S+B-v,n.spotLightMap.length=B,n.numSpotLightShadowsWithMaps=v,n.numLightProbes=D,Q.sunLength=f,Q.directionalLength=p,Q.pointLength=h,Q.spotLength=E,Q.rectAreaLength=y,Q.hemiLength=w,Q.numSunShadows=m,Q.numDirectionalShadows=M,Q.numPointShadows=x,Q.numSpotShadows=S,Q.numSpotMaps=B,Q.numLightProbes=D,n.version=bg++)}function c(A,u){let d=0,l=0,f=0,m=0,_=0,p=0,h=u.matrixWorldInverse;for(let E=0,y=A.length;E<y;E++){let w=A[E];if(w.isSunLight){let M=n.sun[d];M.direction.setFromMatrixPosition(w.matrixWorld),M.direction.transformDirection(h),d++}else if(w.isDirectionalLight){let M=n.directional[l];M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(h),l++}else if(w.isSpotLight){let M=n.spot[m];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(h),M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(h),m++}else if(w.isRectAreaLight){let M=n.rectArea[_];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(h),o.identity(),r.copy(w.matrixWorld),r.premultiply(h),o.extractRotation(r),M.halfWidth.set(w.width*.5,0,0),M.halfHeight.set(0,w.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),_++}else if(w.isPointLight){let M=n.point[f];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(h),f++}else if(w.isHemisphereLight){let M=n.hemi[p];M.direction.setFromMatrixPosition(w.matrixWorld),M.direction.transformDirection(h),p++}}}return{setup:a,setupView:c,state:n}}function _l(i){let t=new Dg(i),e=[],n=[],s=[];function r(l){d.camera=l,e.length=0,n.length=0,s.length=0}function o(l){e.push(l)}function a(l){n.push(l)}function c(l){s.push(l)}function A(){t.setup(e)}function u(l){t.setupView(e,l)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:A,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function Tg(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new _l(i),t.set(s,[a])):r>=o.length?(a=new _l(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Qg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fg=`uniform sampler2D shadow_pass;
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
}`,Rg=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],Ug=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],Ml=new oe,Ls=new P,uA=new P;function Pg(i,t,e){let n=new Ui,s=new Rt,r=new Rt,o=new ce,a=new Dr,c=new Tr,A={},u=e.maxTextureSize,d={[Kn]:Ue,[Ue]:Kn,[Te]:Te},l=new Je({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Rt},radius:{value:4}},vertexShader:Qg,fragmentShader:Fg}),f=l.clone();f.defines.HORIZONTAL_PASS=1;let m=new ge;m.setAttribute("position",new ue(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Me(m,l),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ss;let h=this.type;this.render=function(x,S,B){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||x.length===0)return;this.type===mc&&(Tt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ss);let v=i.getRenderTarget(),D=i.getActiveCubeFace(),Q=i.getActiveMipmapLevel(),N=i.state;N.setBlending(wn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let G=h!==this.type;G&&S.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(U=>U.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,U=x.length;I<U;I++){let z=x[I],V=z.shadow;if(V===void 0){Tt("WebGLShadowMap:",z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let j=V.getFrameExtents();s.multiply(j),r.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/j.x),s.x=r.x*j.x,V.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/j.y),s.y=r.y*j.y,V.mapSize.y=r.y));let K=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=K,V.map===null||G===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Hi){if(z.isPointLight){Tt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Oe(s.x,s.y,{format:jn,type:hn,minFilter:xe,magFilter:xe,generateMipmaps:!1}),V.map.texture.name=z.name+".shadowMap",V.map.depthTexture=new Hn(s.x,s.y,ln),V.map.depthTexture.name=z.name+".shadowMapDepth",V.map.depthTexture.format=mn,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=_e,V.map.depthTexture.magFilter=_e}else z.isPointLight?(V.map=new Go(s.x),V.map.depthTexture=new br(s.x,cn)):(V.map=new Oe(s.x,s.y),V.map.depthTexture=new Hn(s.x,s.y,cn)),V.map.depthTexture.name=z.name+".shadowMap",V.map.depthTexture.format=mn,this.type===Ss?(V.map.depthTexture.compareFunction=K?Uo:Ro,V.map.depthTexture.minFilter=xe,V.map.depthTexture.magFilter=xe):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=_e,V.map.depthTexture.magFilter=_e);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y)&&V.map.setSize(s.x,s.y);let et=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();z.isPointLight!==!0&&V.updateMatrices(z,B);for(let J=0;J<et;J++){let st=V.getCamera(J);if(z.isPointLight){let nt=V.camera,Et=V.matrix,gt=z.distance||nt.far;gt!==nt.far&&(nt.far=gt,nt.updateProjectionMatrix()),Ls.setFromMatrixPosition(z.matrixWorld),nt.position.copy(Ls),uA.copy(nt.position),uA.add(Rg[J]),nt.up.copy(Ug[J]),nt.lookAt(uA),nt.updateMatrixWorld(),Et.makeTranslation(-Ls.x,-Ls.y,-Ls.z),Ml.multiplyMatrices(nt.projectionMatrix,nt.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Ml,nt.coordinateSystem,nt.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,J),i.clear();else{J===0&&(i.setRenderTarget(V.map),i.clear());let nt=V.getViewport(J);o.set(r.x*nt.x,r.y*nt.y,r.x*nt.z,r.y*nt.w),N.viewport(o)}n=V.getFrustum(J),w(S,B,st,z,this.type)}V.isPointLightShadow!==!0&&this.type===Hi&&E(V,B),V.needsUpdate=!1}h=this.type,p.needsUpdate=!1,i.setRenderTarget(v,D,Q)};function E(x,S){let B=t.update(_);l.defines.VSM_SAMPLES!==x.blurSamples&&(l.defines.VSM_SAMPLES=x.blurSamples,f.defines.VSM_SAMPLES=x.blurSamples,l.needsUpdate=!0,f.needsUpdate=!0),x.mapPass===null?x.mapPass=new Oe(s.x,s.y,{format:jn,type:hn}):(x.mapPass.width!==x.map.width||x.mapPass.height!==x.map.height)&&x.mapPass.setSize(x.map.width,x.map.height),l.uniforms.shadow_pass.value=x.map.depthTexture,l.uniforms.resolution.value.set(x.map.width,x.map.height),l.uniforms.radius.value=x.radius,i.setRenderTarget(x.mapPass),i.clear(),i.renderBufferDirect(S,null,B,l,_,null),f.uniforms.shadow_pass.value=x.mapPass.texture,f.uniforms.resolution.value.set(x.map.width,x.map.height),f.uniforms.radius.value=x.radius,i.setRenderTarget(x.map),i.clear(),i.renderBufferDirect(S,null,B,f,_,null)}function y(x,S,B,v){let D=null,Q=B.isPointLight===!0?x.customDistanceMaterial:x.customDepthMaterial;if(Q!==void 0)D=Q;else if(D=B.isPointLight===!0?c:a,i.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0||S.alphaToCoverage===!0){let N=D.uuid,G=S.uuid,I=A[N];I===void 0&&(I={},A[N]=I);let U=I[G];U===void 0&&(U=D.clone(),I[G]=U,S.addEventListener("dispose",M)),D=U}if(D.visible=S.visible,D.wireframe=S.wireframe,v===Hi?D.side=S.shadowSide!==null?S.shadowSide:S.side:D.side=S.shadowSide!==null?S.shadowSide:d[S.side],D.alphaMap=S.alphaMap,D.alphaTest=S.alphaToCoverage===!0?.5:S.alphaTest,D.map=S.map,D.clipShadows=S.clipShadows,D.clippingPlanes=S.clippingPlanes,D.clipIntersection=S.clipIntersection,D.displacementMap=S.displacementMap,D.displacementScale=S.displacementScale,D.displacementBias=S.displacementBias,D.wireframeLinewidth=S.wireframeLinewidth,D.linewidth=S.linewidth,B.isPointLight===!0&&D.isMeshDistanceMaterial===!0){let N=i.properties.get(D);N.light=B}return D}function w(x,S,B,v,D){if(x.visible===!1)return;if(x.layers.test(S.layers)&&(x.isMesh||x.isLine||x.isPoints)&&(x.castShadow||x.receiveShadow&&D===Hi)&&(!x.frustumCulled||x.intersectsFrustum(n))){x.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,x.matrixWorld);let G=t.update(x),I=x.material;if(Array.isArray(I)){let U=G.groups;for(let z=0,V=U.length;z<V;z++){let j=U[z],K=I[j.materialIndex];if(K&&K.visible){let et=y(x,K,v,D);x.onBeforeShadow(i,x,S,B,G,et,j),i.renderBufferDirect(B,null,G,et,x,j),x.onAfterShadow(i,x,S,B,G,et,j)}}}else if(I.visible){let U=y(x,I,v,D);x.onBeforeShadow(i,x,S,B,G,U,null),i.renderBufferDirect(B,null,G,U,x,null),x.onAfterShadow(i,x,S,B,G,U,null)}}let N=x.children;for(let G=0,I=N.length;G<I;G++)w(N[G],S,B,v,D)}function M(x){x.target.removeEventListener("dispose",M);for(let B in A){let v=A[B],D=x.target.uuid;D in v&&(v[D].dispose(),delete v[D])}}}function Lg(i,t){function e(){let F=!1,lt=new ce,$=null,ht=new ce(0,0,0,0);return{setMask:function(Bt){$!==Bt&&!F&&(i.colorMask(Bt,Bt,Bt,Bt),$=Bt)},setLocked:function(Bt){F=Bt},setClear:function(Bt,it,bt,xt,se){se===!0&&(Bt*=xt,it*=xt,bt*=xt),lt.set(Bt,it,bt,xt),ht.equals(lt)===!1&&(i.clearColor(Bt,it,bt,xt),ht.copy(lt))},reset:function(){F=!1,$=null,ht.set(-1,0,0,0)}}}function n(){let F=!1,lt=!1,$=null,ht=null,Bt=null;return{setReversed:function(it){if(lt!==it){let bt=t.get("EXT_clip_control");it?bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.ZERO_TO_ONE_EXT):bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.NEGATIVE_ONE_TO_ONE_EXT),lt=it;let xt=Bt;Bt=null,this.setClear(xt)}},getReversed:function(){return lt},setTest:function(it){it?Z(i.DEPTH_TEST):at(i.DEPTH_TEST)},setMask:function(it){$!==it&&!F&&(i.depthMask(it),$=it)},setFunc:function(it){if(lt&&(it=jc[it]),ht!==it){switch(it){case ur:i.depthFunc(i.NEVER);break;case dr:i.depthFunc(i.ALWAYS);break;case fr:i.depthFunc(i.LESS);break;case bi:i.depthFunc(i.LEQUAL);break;case pr:i.depthFunc(i.EQUAL);break;case gr:i.depthFunc(i.GEQUAL);break;case mr:i.depthFunc(i.GREATER);break;case Br:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ht=it}},setLocked:function(it){F=it},setClear:function(it){Bt!==it&&(Bt=it,lt&&(it=1-it),i.clearDepth(it))},reset:function(){F=!1,$=null,ht=null,Bt=null,lt=!1}}}function s(){let F=!1,lt=null,$=null,ht=null,Bt=null,it=null,bt=null,xt=null,se=null;return{setTest:function(Zt){F||(Zt?Z(i.STENCIL_TEST):at(i.STENCIL_TEST))},setMask:function(Zt){lt!==Zt&&!F&&(i.stencilMask(Zt),lt=Zt)},setFunc:function(Zt,$e,un){($!==Zt||ht!==$e||Bt!==un)&&(i.stencilFunc(Zt,$e,un),$=Zt,ht=$e,Bt=un)},setOp:function(Zt,$e,un){(it!==Zt||bt!==$e||xt!==un)&&(i.stencilOp(Zt,$e,un),it=Zt,bt=$e,xt=un)},setLocked:function(Zt){F=Zt},setClear:function(Zt){se!==Zt&&(i.clearStencil(Zt),se=Zt)},reset:function(){F=!1,lt=null,$=null,ht=null,Bt=null,it=null,bt=null,xt=null,se=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,A=new WeakMap,u={},d={},l={},f=new WeakMap,m=[],_=null,p=!1,h=null,E=null,y=null,w=null,M=null,x=null,S=null,B=new kt(0,0,0),v=0,D=!1,Q=null,N=null,G=null,I=null,U=null,z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,j=0,K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(K)[1]),V=j>=1):K.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),V=j>=2);let et=null,J={},st=i.getParameter(i.SCISSOR_BOX),nt=i.getParameter(i.VIEWPORT),Et=new ce().fromArray(st),gt=new ce().fromArray(nt);function Dt(F,lt,$,ht){let Bt=new Uint8Array(4),it=i.createTexture();i.bindTexture(F,it),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let bt=0;bt<$;bt++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(lt,0,i.RGBA,1,1,ht,0,i.RGBA,i.UNSIGNED_BYTE,Bt):i.texImage2D(lt+bt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Bt);return it}let Y={};Y[i.TEXTURE_2D]=Dt(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=Dt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=Dt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=Dt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Z(i.DEPTH_TEST),o.setFunc(bi),Gt(!1),Xt(Sa),Z(i.CULL_FACE),Wt(wn);function Z(F){u[F]!==!0&&(i.enable(F),u[F]=!0)}function at(F){u[F]!==!1&&(i.disable(F),u[F]=!1)}function It(F,lt){return l[F]!==lt?(i.bindFramebuffer(F,lt),l[F]=lt,F===i.DRAW_FRAMEBUFFER&&(l[i.FRAMEBUFFER]=lt),F===i.FRAMEBUFFER&&(l[i.DRAW_FRAMEBUFFER]=lt),!0):!1}function ut(F,lt){let $=m,ht=!1;if(F){$=f.get(lt),$===void 0&&($=[],f.set(lt,$));let Bt=F.textures;if($.length!==Bt.length||$[0]!==i.COLOR_ATTACHMENT0){for(let it=0,bt=Bt.length;it<bt;it++)$[it]=i.COLOR_ATTACHMENT0+it;$.length=Bt.length,ht=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,ht=!0);ht&&i.drawBuffers($)}function Ut(F){return _!==F?(i.useProgram(F),_=F,!0):!1}let ie={[ai]:i.FUNC_ADD,[wc]:i.FUNC_SUBTRACT,[Cc]:i.FUNC_REVERSE_SUBTRACT};ie[Ec]=i.MIN,ie[_c]=i.MAX;let Lt={[Mc]:i.ZERO,[xc]:i.ONE,[yc]:i.SRC_COLOR,[Ta]:i.SRC_ALPHA,[Tc]:i.SRC_ALPHA_SATURATE,[Ic]:i.DST_COLOR,[Sc]:i.DST_ALPHA,[vc]:i.ONE_MINUS_SRC_COLOR,[Qa]:i.ONE_MINUS_SRC_ALPHA,[Dc]:i.ONE_MINUS_DST_COLOR,[bc]:i.ONE_MINUS_DST_ALPHA,[Qc]:i.CONSTANT_COLOR,[Fc]:i.ONE_MINUS_CONSTANT_COLOR,[Rc]:i.CONSTANT_ALPHA,[Uc]:i.ONE_MINUS_CONSTANT_ALPHA};function Wt(F,lt,$,ht,Bt,it,bt,xt,se,Zt){if(F===wn){p===!0&&(at(i.BLEND),p=!1);return}if(p===!1&&(Z(i.BLEND),p=!0),F!==Bc){if(F!==h||Zt!==D){if((E!==ai||M!==ai)&&(i.blendEquation(i.FUNC_ADD),E=ai,M=ai),Zt)switch(F){case ki:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ba:i.blendFunc(i.ONE,i.ONE);break;case Ia:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Da:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ft("WebGLState: Invalid blending: ",F);break}else switch(F){case ki:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ba:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ia:Ft("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Da:Ft("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ft("WebGLState: Invalid blending: ",F);break}y=null,w=null,x=null,S=null,B.set(0,0,0),v=0,h=F,D=Zt}return}Bt=Bt||lt,it=it||$,bt=bt||ht,(lt!==E||Bt!==M)&&(i.blendEquationSeparate(ie[lt],ie[Bt]),E=lt,M=Bt),($!==y||ht!==w||it!==x||bt!==S)&&(i.blendFuncSeparate(Lt[$],Lt[ht],Lt[it],Lt[bt]),y=$,w=ht,x=it,S=bt),(xt.equals(B)===!1||se!==v)&&(i.blendColor(xt.r,xt.g,xt.b,se),B.copy(xt),v=se),h=F,D=!1}function Kt(F,lt){F.side===Te?at(i.CULL_FACE):Z(i.CULL_FACE);let $=F.side===Ue;lt&&($=!$),Gt($),F.blending===ki&&F.transparent===!1?Wt(wn):Wt(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);let ht=F.stencilWrite;a.setTest(ht),ht&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Pe(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):at(i.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(F){Q!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),Q=F)}function Xt(F){F!==pc?(Z(i.CULL_FACE),F!==N&&(F===Sa?i.cullFace(i.BACK):F===gc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):at(i.CULL_FACE),N=F}function Ce(F){F!==G&&(V&&i.lineWidth(F),G=F)}function Pe(F,lt,$){F?(Z(i.POLYGON_OFFSET_FILL),(I!==lt||U!==$)&&(I=lt,U=$,o.getReversed()&&(lt=-lt),i.polygonOffset(lt,$))):at(i.POLYGON_OFFSET_FILL)}function le(F){F?Z(i.SCISSOR_TEST):at(i.SCISSOR_TEST)}function de(F){F===void 0&&(F=i.TEXTURE0+z-1),et!==F&&(i.activeTexture(F),et=F)}function R(F,lt,$){$===void 0&&(et===null?$=i.TEXTURE0+z-1:$=et);let ht=J[$];ht===void 0&&(ht={type:void 0,texture:void 0},J[$]=ht),(ht.type!==F||ht.texture!==lt)&&(et!==$&&(i.activeTexture($),et=$),i.bindTexture(F,lt||Y[F]),ht.type=F,ht.texture=lt)}function ve(){let F=J[et];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function $t(){try{i.compressedTexImage2D(...arguments)}catch(F){Ft("WebGLState:",F)}}function b(){try{i.compressedTexImage3D(...arguments)}catch(F){Ft("WebGLState:",F)}}function g(){try{i.texSubImage2D(...arguments)}catch(F){Ft("WebGLState:",F)}}function L(){try{i.texSubImage3D(...arguments)}catch(F){Ft("WebGLState:",F)}}function k(){try{i.compressedTexSubImage2D(...arguments)}catch(F){Ft("WebGLState:",F)}}function X(){try{i.compressedTexSubImage3D(...arguments)}catch(F){Ft("WebGLState:",F)}}function rt(){try{i.texStorage2D(...arguments)}catch(F){Ft("WebGLState:",F)}}function ot(){try{i.texStorage3D(...arguments)}catch(F){Ft("WebGLState:",F)}}function q(){try{i.texImage2D(...arguments)}catch(F){Ft("WebGLState:",F)}}function tt(){try{i.texImage3D(...arguments)}catch(F){Ft("WebGLState:",F)}}function At(F){return d[F]!==void 0?d[F]:i.getParameter(F)}function vt(F,lt){d[F]!==lt&&(i.pixelStorei(F,lt),d[F]=lt)}function dt(F){Et.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),Et.copy(F))}function ct(F){gt.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),gt.copy(F))}function St(F,lt){let $=A.get(lt);$===void 0&&($=new WeakMap,A.set(lt,$));let ht=$.get(F);ht===void 0&&(ht=i.getUniformBlockIndex(lt,F.name),$.set(F,ht))}function Qt(F,lt){let ht=A.get(lt).get(F);c.get(lt)!==ht&&(i.uniformBlockBinding(lt,ht,F.__bindingPointIndex),c.set(lt,ht))}function Nt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},et=null,J={},l={},f=new WeakMap,m=[],_=null,p=!1,h=null,E=null,y=null,w=null,M=null,x=null,S=null,B=new kt(0,0,0),v=0,D=!1,Q=null,N=null,G=null,I=null,U=null,Et.set(0,0,i.canvas.width,i.canvas.height),gt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Z,disable:at,bindFramebuffer:It,drawBuffers:ut,useProgram:Ut,setBlending:Wt,setMaterial:Kt,setFlipSided:Gt,setCullFace:Xt,setLineWidth:Ce,setPolygonOffset:Pe,setScissorTest:le,activeTexture:de,bindTexture:R,unbindTexture:ve,compressedTexImage2D:$t,compressedTexImage3D:b,texImage2D:q,texImage3D:tt,pixelStorei:vt,getParameter:At,updateUBOMapping:St,uniformBlockBinding:Qt,texStorage2D:rt,texStorage3D:ot,texSubImage2D:g,texSubImage3D:L,compressedTexSubImage2D:k,compressedTexSubImage3D:X,scissor:dt,viewport:ct,reset:Nt}}function Ng(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),A=new Rt,u=new WeakMap,d=new Set,l,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(b,g){return m?new OffscreenCanvas(b,g):hs("canvas")}function p(b,g,L){let k=1,X=$t(b);if((X.width>L||X.height>L)&&(k=L/Math.max(X.width,X.height)),k<1)if(typeof HTMLImageElement!="undefined"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&b instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&b instanceof ImageBitmap||typeof VideoFrame!="undefined"&&b instanceof VideoFrame){let rt=Math.floor(k*X.width),ot=Math.floor(k*X.height);l===void 0&&(l=_(rt,ot));let q=g?_(rt,ot):l;return q.width=rt,q.height=ot,q.getContext("2d").drawImage(b,0,0,rt,ot),Tt("WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+rt+"x"+ot+")."),q}else return"data"in b&&Tt("WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),b;return b}function h(b){return b.generateMipmaps}function E(b){i.generateMipmap(b)}function y(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(b,g,L,k,X,rt=!1){if(b!==null){if(i[b]!==void 0)return i[b];Tt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ot;k&&(ot=t.get("EXT_texture_norm16"),ot||Tt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=g;if(g===i.RED&&(L===i.FLOAT&&(q=i.R32F),L===i.HALF_FLOAT&&(q=i.R16F),L===i.UNSIGNED_BYTE&&(q=i.R8),L===i.UNSIGNED_SHORT&&ot&&(q=ot.R16_EXT),L===i.SHORT&&ot&&(q=ot.R16_SNORM_EXT)),g===i.RED_INTEGER&&(L===i.UNSIGNED_BYTE&&(q=i.R8UI),L===i.UNSIGNED_SHORT&&(q=i.R16UI),L===i.UNSIGNED_INT&&(q=i.R32UI),L===i.BYTE&&(q=i.R8I),L===i.SHORT&&(q=i.R16I),L===i.INT&&(q=i.R32I)),g===i.RG&&(L===i.FLOAT&&(q=i.RG32F),L===i.HALF_FLOAT&&(q=i.RG16F),L===i.UNSIGNED_BYTE&&(q=i.RG8),L===i.UNSIGNED_SHORT&&ot&&(q=ot.RG16_EXT),L===i.SHORT&&ot&&(q=ot.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(L===i.UNSIGNED_BYTE&&(q=i.RG8UI),L===i.UNSIGNED_SHORT&&(q=i.RG16UI),L===i.UNSIGNED_INT&&(q=i.RG32UI),L===i.BYTE&&(q=i.RG8I),L===i.SHORT&&(q=i.RG16I),L===i.INT&&(q=i.RG32I)),g===i.RGB_INTEGER&&(L===i.UNSIGNED_BYTE&&(q=i.RGB8UI),L===i.UNSIGNED_SHORT&&(q=i.RGB16UI),L===i.UNSIGNED_INT&&(q=i.RGB32UI),L===i.BYTE&&(q=i.RGB8I),L===i.SHORT&&(q=i.RGB16I),L===i.INT&&(q=i.RGB32I)),g===i.RGBA_INTEGER&&(L===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),L===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),L===i.UNSIGNED_INT&&(q=i.RGBA32UI),L===i.BYTE&&(q=i.RGBA8I),L===i.SHORT&&(q=i.RGBA16I),L===i.INT&&(q=i.RGBA32I)),g===i.RGB&&(L===i.UNSIGNED_SHORT&&ot&&(q=ot.RGB16_EXT),L===i.SHORT&&ot&&(q=ot.RGB16_SNORM_EXT),L===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),L===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),g===i.RGBA){let tt=rt?ls:Yt.getTransfer(X);L===i.FLOAT&&(q=i.RGBA32F),L===i.HALF_FLOAT&&(q=i.RGBA16F),L===i.UNSIGNED_BYTE&&(q=tt===jt?i.SRGB8_ALPHA8:i.RGBA8),L===i.UNSIGNED_SHORT&&ot&&(q=ot.RGBA16_EXT),L===i.SHORT&&ot&&(q=ot.RGBA16_SNORM_EXT),L===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),L===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function M(b,g){let L;return b?g===null||g===cn||g===zi?L=i.DEPTH24_STENCIL8:g===ln?L=i.DEPTH32F_STENCIL8:g===Vi&&(L=i.DEPTH24_STENCIL8,Tt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===cn||g===zi?L=i.DEPTH_COMPONENT24:g===ln?L=i.DEPTH_COMPONENT32F:g===Vi&&(L=i.DEPTH_COMPONENT16),L}function x(b,g){return h(b)===!0||b.isFramebufferTexture&&b.minFilter!==_e&&b.minFilter!==xe?Math.log2(Math.max(g.width,g.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?g.mipmaps.length:1}function S(b){let g=b.target;g.removeEventListener("dispose",S),v(g),g.isVideoTexture&&u.delete(g),g.isHTMLTexture&&d.delete(g)}function B(b){let g=b.target;g.removeEventListener("dispose",B),Q(g)}function v(b){let g=n.get(b);if(g.__webglInit===void 0)return;let L=b.source,k=f.get(L);if(k){let X=k[g.__cacheKey];X.usedTimes--,X.usedTimes===0&&D(b),Object.keys(k).length===0&&f.delete(L)}n.remove(b)}function D(b){let g=n.get(b);i.deleteTexture(g.__webglTexture);let L=b.source,k=f.get(L);delete k[g.__cacheKey],o.memory.textures--}function Q(b){let g=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(g.__webglFramebuffer[k]))for(let X=0;X<g.__webglFramebuffer[k].length;X++)i.deleteFramebuffer(g.__webglFramebuffer[k][X]);else i.deleteFramebuffer(g.__webglFramebuffer[k]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[k])}else{if(Array.isArray(g.__webglFramebuffer))for(let k=0;k<g.__webglFramebuffer.length;k++)i.deleteFramebuffer(g.__webglFramebuffer[k]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let k=0;k<g.__webglColorRenderbuffer.length;k++)g.__webglColorRenderbuffer[k]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[k]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let L=b.textures;for(let k=0,X=L.length;k<X;k++){let rt=n.get(L[k]);rt.__webglTexture&&(i.deleteTexture(rt.__webglTexture),o.memory.textures--),n.remove(L[k])}n.remove(b)}let N=0;function G(){N=0}function I(){return N}function U(b){N=b}function z(){let b=N;return b>=s.maxTextures&&Tt("WebGLTextures: Trying to use "+(b+1)+" texture units while this GPU supports only "+s.maxTextures),N+=1,b}function V(b){let g=[];return g.push(b.wrapS),g.push(b.wrapT),g.push(b.wrapR||0),g.push(b.magFilter),g.push(b.minFilter),g.push(b.anisotropy),g.push(b.internalFormat),g.push(b.format),g.push(b.type),g.push(b.generateMipmaps),g.push(b.premultiplyAlpha),g.push(b.flipY),g.push(b.unpackAlignment),g.push(b.colorSpace),g.join()}function j(b,g){let L=n.get(b);if(b.isVideoTexture&&R(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&L.__version!==b.version){let k=b.image;if(k===null)Tt("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)Tt("WebGLRenderer: Texture marked for update but image is incomplete");else{at(L,b,g);return}}else b.isExternalTexture&&(L.__webglTexture=b.sourceTexture?b.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,L.__webglTexture,i.TEXTURE0+g)}function K(b,g){let L=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&L.__version!==b.version){at(L,b,g);return}else b.isExternalTexture&&(L.__webglTexture=b.sourceTexture?b.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,L.__webglTexture,i.TEXTURE0+g)}function et(b,g){let L=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&L.__version!==b.version){at(L,b,g);return}e.bindTexture(i.TEXTURE_3D,L.__webglTexture,i.TEXTURE0+g)}function J(b,g){let L=n.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&L.__version!==b.version){It(L,b,g);return}e.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+g)}let st={[wr]:i.REPEAT,[pn]:i.CLAMP_TO_EDGE,[Cr]:i.MIRRORED_REPEAT},nt={[_e]:i.NEAREST,[Nc]:i.NEAREST_MIPMAP_NEAREST,[Is]:i.NEAREST_MIPMAP_LINEAR,[xe]:i.LINEAR,[Xr]:i.LINEAR_MIPMAP_NEAREST,[Zn]:i.LINEAR_MIPMAP_LINEAR},Et={[kc]:i.NEVER,[Jc]:i.ALWAYS,[Vc]:i.LESS,[Ro]:i.LEQUAL,[zc]:i.EQUAL,[Uo]:i.GEQUAL,[Yc]:i.GREATER,[Wc]:i.NOTEQUAL};function gt(b,g){if(g.type===ln&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===xe||g.magFilter===Xr||g.magFilter===Is||g.magFilter===Zn||g.minFilter===xe||g.minFilter===Xr||g.minFilter===Is||g.minFilter===Zn)&&Tt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,st[g.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,st[g.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,st[g.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,nt[g.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,nt[g.minFilter]),g.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,Et[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===_e||g.minFilter!==Is&&g.minFilter!==Zn||g.type===ln&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){let L=t.get("EXT_texture_filter_anisotropic");i.texParameterf(b,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function Dt(b,g){let L=!1;b.__webglInit===void 0&&(b.__webglInit=!0,g.addEventListener("dispose",S));let k=g.source,X=f.get(k);X===void 0&&(X={},f.set(k,X));let rt=V(g);if(rt!==b.__cacheKey){X[rt]===void 0&&(X[rt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,L=!0),X[rt].usedTimes++;let ot=X[b.__cacheKey];ot!==void 0&&(X[b.__cacheKey].usedTimes--,ot.usedTimes===0&&D(g)),b.__cacheKey=rt,b.__webglTexture=X[rt].texture}return L}function Y(b,g,L){return Math.floor(Math.floor(b/L)/g)}function Z(b,g,L,k){let rt=b.updateRanges;if(rt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,L,k,g.data);else{rt.sort((vt,dt)=>vt.start-dt.start);let ot=0;for(let vt=1;vt<rt.length;vt++){let dt=rt[ot],ct=rt[vt],St=dt.start+dt.count,Qt=Y(ct.start,g.width,4),Nt=Y(dt.start,g.width,4);ct.start<=St+1&&Qt===Nt&&Y(ct.start+ct.count-1,g.width,4)===Qt?dt.count=Math.max(dt.count,ct.start+ct.count-dt.start):(++ot,rt[ot]=ct)}rt.length=ot+1;let q=e.getParameter(i.UNPACK_ROW_LENGTH),tt=e.getParameter(i.UNPACK_SKIP_PIXELS),At=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let vt=0,dt=rt.length;vt<dt;vt++){let ct=rt[vt],St=Math.floor(ct.start/4),Qt=Math.ceil(ct.count/4),Nt=St%g.width,F=Math.floor(St/g.width),lt=Qt,$=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Nt),e.pixelStorei(i.UNPACK_SKIP_ROWS,F),e.texSubImage2D(i.TEXTURE_2D,0,Nt,F,lt,$,L,k,g.data)}b.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,q),e.pixelStorei(i.UNPACK_SKIP_PIXELS,tt),e.pixelStorei(i.UNPACK_SKIP_ROWS,At)}}function at(b,g,L){let k=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(k=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(k=i.TEXTURE_3D);let X=Dt(b,g),rt=g.source;e.bindTexture(k,b.__webglTexture,i.TEXTURE0+L);let ot=n.get(rt);if(rt.version!==ot.__version||X===!0){if(e.activeTexture(i.TEXTURE0+L),(typeof ImageBitmap!="undefined"&&g.image instanceof ImageBitmap)===!1){let $=Yt.getPrimaries(Yt.workingColorSpace),ht=g.colorSpace===Dn?null:Yt.getPrimaries(g.colorSpace),Bt=g.colorSpace===Dn||$===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Bt)}e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let tt=p(g.image,!1,s.maxTextureSize);tt=ve(g,tt);let At=r.convert(g.format,g.colorSpace),vt=r.convert(g.type),dt=w(g.internalFormat,At,vt,g.normalized,g.colorSpace,g.isVideoTexture);gt(k,g);let ct,St=g.mipmaps,Qt=g.isVideoTexture!==!0,Nt=ot.__version===void 0||X===!0,F=rt.dataReady,lt=x(g,tt);if(g.isDepthTexture)dt=M(g.format===qn,g.type),Nt&&(Qt?e.texStorage2D(i.TEXTURE_2D,1,dt,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,dt,tt.width,tt.height,0,At,vt,null));else if(g.isDataTexture)if(St.length>0){Qt&&Nt&&e.texStorage2D(i.TEXTURE_2D,lt,dt,St[0].width,St[0].height);for(let $=0,ht=St.length;$<ht;$++)ct=St[$],Qt?F&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,ct.width,ct.height,At,vt,ct.data):e.texImage2D(i.TEXTURE_2D,$,dt,ct.width,ct.height,0,At,vt,ct.data);g.generateMipmaps=!1}else Qt?(Nt&&e.texStorage2D(i.TEXTURE_2D,lt,dt,tt.width,tt.height),F&&Z(g,tt,At,vt)):e.texImage2D(i.TEXTURE_2D,0,dt,tt.width,tt.height,0,At,vt,tt.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Qt&&Nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,dt,St[0].width,St[0].height,tt.depth);for(let $=0,ht=St.length;$<ht;$++)if(ct=St[$],g.format!==je)if(At!==null)if(Qt){if(F)if(g.layerUpdates.size>0){let Bt=eA(ct.width,ct.height,g.format,g.type);for(let it of g.layerUpdates){let bt=ct.data.subarray(it*Bt/ct.data.BYTES_PER_ELEMENT,(it+1)*Bt/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,it,ct.width,ct.height,1,At,bt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ct.width,ct.height,tt.depth,At,ct.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,dt,ct.width,ct.height,tt.depth,0,ct.data,0,0);else Tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Qt?F&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ct.width,ct.height,tt.depth,At,vt,ct.data):e.texImage3D(i.TEXTURE_2D_ARRAY,$,dt,ct.width,ct.height,tt.depth,0,At,vt,ct.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{Qt&&Nt&&e.texStorage2D(i.TEXTURE_2D,lt,dt,St[0].width,St[0].height);for(let $=0,ht=St.length;$<ht;$++)ct=St[$],g.format!==je?At!==null?Qt?F&&e.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,ct.width,ct.height,At,ct.data):e.compressedTexImage2D(i.TEXTURE_2D,$,dt,ct.width,ct.height,0,ct.data):Tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qt?F&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,ct.width,ct.height,At,vt,ct.data):e.texImage2D(i.TEXTURE_2D,$,dt,ct.width,ct.height,0,At,vt,ct.data)}else if(g.isDataArrayTexture)if(Qt){if(Nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,dt,tt.width,tt.height,tt.depth),F)if(g.layerUpdates.size>0){let $=eA(tt.width,tt.height,g.format,g.type);for(let ht of g.layerUpdates){let Bt=tt.data.subarray(ht*$/tt.data.BYTES_PER_ELEMENT,(ht+1)*$/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ht,tt.width,tt.height,1,At,vt,Bt)}g.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,At,vt,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,dt,tt.width,tt.height,tt.depth,0,At,vt,tt.data);else if(g.isData3DTexture)Qt?(Nt&&e.texStorage3D(i.TEXTURE_3D,lt,dt,tt.width,tt.height,tt.depth),F&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,At,vt,tt.data)):e.texImage3D(i.TEXTURE_3D,0,dt,tt.width,tt.height,tt.depth,0,At,vt,tt.data);else if(g.isFramebufferTexture){if(Nt)if(Qt)e.texStorage2D(i.TEXTURE_2D,lt,dt,tt.width,tt.height);else{let $=tt.width,ht=tt.height;for(let Bt=0;Bt<lt;Bt++)e.texImage2D(i.TEXTURE_2D,Bt,dt,$,ht,0,At,vt,null),$>>=1,ht>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){let $=i.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),tt.parentNode!==$){$.appendChild(tt),d.add(g),$.onpaint=ht=>{let Bt=ht.changedElements;for(let it of d)Bt.includes(it.image)&&(it.needsUpdate=!0)},$.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,tt);else{let Bt=i.RGBA,it=i.RGBA,bt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Bt,it,bt,tt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(St.length>0){if(Qt&&Nt){let $=$t(St[0]);e.texStorage2D(i.TEXTURE_2D,lt,dt,$.width,$.height)}for(let $=0,ht=St.length;$<ht;$++)ct=St[$],Qt?F&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,At,vt,ct):e.texImage2D(i.TEXTURE_2D,$,dt,At,vt,ct);g.generateMipmaps=!1}else if(Qt){if(Nt){let $=$t(tt);e.texStorage2D(i.TEXTURE_2D,lt,dt,$.width,$.height)}F&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,At,vt,tt)}else e.texImage2D(i.TEXTURE_2D,0,dt,At,vt,tt);h(g)&&E(k),ot.__version=rt.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function It(b,g,L){if(g.image.length!==6)return;let k=Dt(b,g),X=g.source;e.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+L);let rt=n.get(X);if(X.version!==rt.__version||k===!0){e.activeTexture(i.TEXTURE0+L);let ot=Yt.getPrimaries(Yt.workingColorSpace),q=g.colorSpace===Dn?null:Yt.getPrimaries(g.colorSpace),tt=g.colorSpace===Dn||ot===q?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);let At=g.isCompressedTexture||g.image[0].isCompressedTexture,vt=g.image[0]&&g.image[0].isDataTexture,dt=[];for(let it=0;it<6;it++)!At&&!vt?dt[it]=p(g.image[it],!0,s.maxCubemapSize):dt[it]=vt?g.image[it].image:g.image[it],dt[it]=ve(g,dt[it]);let ct=dt[0],St=r.convert(g.format,g.colorSpace),Qt=r.convert(g.type),Nt=w(g.internalFormat,St,Qt,g.normalized,g.colorSpace),F=g.isVideoTexture!==!0,lt=rt.__version===void 0||k===!0,$=X.dataReady,ht=x(g,ct);gt(i.TEXTURE_CUBE_MAP,g);let Bt;if(At){F&&lt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,Nt,ct.width,ct.height);for(let it=0;it<6;it++){Bt=dt[it].mipmaps;for(let bt=0;bt<Bt.length;bt++){let xt=Bt[bt];g.format!==je?St!==null?F?$&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,bt,0,0,xt.width,xt.height,St,xt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,bt,Nt,xt.width,xt.height,0,xt.data):Tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,bt,0,0,xt.width,xt.height,St,Qt,xt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,bt,Nt,xt.width,xt.height,0,St,Qt,xt.data)}}}else{if(Bt=g.mipmaps,F&&lt){Bt.length>0&&ht++;let it=$t(dt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,Nt,it.width,it.height)}for(let it=0;it<6;it++)if(vt){F?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,dt[it].width,dt[it].height,St,Qt,dt[it].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Nt,dt[it].width,dt[it].height,0,St,Qt,dt[it].data);for(let bt=0;bt<Bt.length;bt++){let se=Bt[bt].image[it].image;F?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,bt+1,0,0,se.width,se.height,St,Qt,se.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,bt+1,Nt,se.width,se.height,0,St,Qt,se.data)}}else{F?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,St,Qt,dt[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Nt,St,Qt,dt[it]);for(let bt=0;bt<Bt.length;bt++){let xt=Bt[bt];F?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,bt+1,0,0,St,Qt,xt.image[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,bt+1,Nt,St,Qt,xt.image[it])}}}h(g)&&E(i.TEXTURE_CUBE_MAP),rt.__version=X.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function ut(b,g,L,k,X,rt){let ot=r.convert(L.format,L.colorSpace),q=r.convert(L.type),tt=w(L.internalFormat,ot,q,L.normalized,L.colorSpace),At=n.get(g),vt=n.get(L);if(vt.__renderTarget=g,!At.__hasExternalTextures){let dt=Math.max(1,g.width>>rt),ct=Math.max(1,g.height>>rt);X===i.TEXTURE_3D||X===i.TEXTURE_2D_ARRAY?e.texImage3D(X,rt,tt,dt,ct,g.depth,0,ot,q,null):e.texImage2D(X,rt,tt,dt,ct,0,ot,q,null)}e.bindFramebuffer(i.FRAMEBUFFER,b),de(g)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,k,X,vt.__webglTexture,0,le(g)):(X===i.TEXTURE_2D||X>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,k,X,vt.__webglTexture,rt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(b,g,L){if(i.bindRenderbuffer(i.RENDERBUFFER,b),g.depthBuffer){let k=g.depthTexture,X=k&&k.isDepthTexture?k.type:null,rt=M(g.stencilBuffer,X),ot=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;de(g)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,le(g),rt,g.width,g.height):L?i.renderbufferStorageMultisample(i.RENDERBUFFER,le(g),rt,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,rt,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ot,i.RENDERBUFFER,b)}else{let k=g.textures;for(let X=0;X<k.length;X++){let rt=k[X],ot=r.convert(rt.format,rt.colorSpace),q=r.convert(rt.type),tt=w(rt.internalFormat,ot,q,rt.normalized,rt.colorSpace);de(g)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,le(g),tt,g.width,g.height):L?i.renderbufferStorageMultisample(i.RENDERBUFFER,le(g),tt,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,tt,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ie(b,g,L){let k=g.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,b),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let X=n.get(g.depthTexture);if(X.__renderTarget=g,(!X.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),k){if(X.__webglInit===void 0&&(X.__webglInit=!0,g.depthTexture.addEventListener("dispose",S)),X.__webglTexture===void 0){X.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),gt(i.TEXTURE_CUBE_MAP,g.depthTexture);let At=r.convert(g.depthTexture.format),vt=r.convert(g.depthTexture.type),dt;g.depthTexture.format===mn?dt=i.DEPTH_COMPONENT24:g.depthTexture.format===qn&&(dt=i.DEPTH24_STENCIL8);for(let ct=0;ct<6;ct++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,dt,g.width,g.height,0,At,vt,null)}}else j(g.depthTexture,0);let rt=X.__webglTexture,ot=le(g),q=k?i.TEXTURE_CUBE_MAP_POSITIVE_X+L:i.TEXTURE_2D,tt=g.depthTexture.format===qn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===mn)de(g)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,q,rt,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,tt,q,rt,0);else if(g.depthTexture.format===qn)de(g)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,q,rt,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,tt,q,rt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Lt(b){let g=n.get(b),L=b.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==b.depthTexture){let k=b.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),k){let X=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,k.removeEventListener("dispose",X)};k.addEventListener("dispose",X),g.__depthDisposeCallback=X}g.__boundDepthTexture=k}if(b.depthTexture&&!g.__autoAllocateDepthBuffer)if(L)for(let k=0;k<6;k++)ie(g.__webglFramebuffer[k],b,k);else{let k=b.texture.mipmaps;k&&k.length>0?ie(g.__webglFramebuffer[0],b,0):ie(g.__webglFramebuffer,b,0)}else if(L){g.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[k]),g.__webglDepthbuffer[k]===void 0)g.__webglDepthbuffer[k]=i.createRenderbuffer(),Ut(g.__webglDepthbuffer[k],b,!1);else{let X=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=g.__webglDepthbuffer[k];i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,rt)}}else{let k=b.texture.mipmaps;if(k&&k.length>0?e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),Ut(g.__webglDepthbuffer,b,!1);else{let X=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,rt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Wt(b,g,L){let k=n.get(b);g!==void 0&&ut(k.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),L!==void 0&&Lt(b)}function Kt(b){let g=b.texture,L=n.get(b),k=n.get(g);b.addEventListener("dispose",B);let X=b.textures,rt=b.isWebGLCubeRenderTarget===!0,ot=X.length>1;if(ot||(k.__webglTexture===void 0&&(k.__webglTexture=i.createTexture()),k.__version=g.version,o.memory.textures++),rt){L.__webglFramebuffer=[];for(let q=0;q<6;q++)if(g.mipmaps&&g.mipmaps.length>0){L.__webglFramebuffer[q]=[];for(let tt=0;tt<g.mipmaps.length;tt++)L.__webglFramebuffer[q][tt]=i.createFramebuffer()}else L.__webglFramebuffer[q]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){L.__webglFramebuffer=[];for(let q=0;q<g.mipmaps.length;q++)L.__webglFramebuffer[q]=i.createFramebuffer()}else L.__webglFramebuffer=i.createFramebuffer();if(ot)for(let q=0,tt=X.length;q<tt;q++){let At=n.get(X[q]);At.__webglTexture===void 0&&(At.__webglTexture=i.createTexture(),o.memory.textures++)}if(b.samples>0&&de(b)===!1){L.__webglMultisampledFramebuffer=i.createFramebuffer(),L.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let q=0;q<X.length;q++){let tt=X[q];L.__webglColorRenderbuffer[q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,L.__webglColorRenderbuffer[q]);let At=r.convert(tt.format,tt.colorSpace),vt=r.convert(tt.type),dt=w(tt.internalFormat,At,vt,tt.normalized,tt.colorSpace,b.isXRRenderTarget===!0),ct=le(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,dt,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+q,i.RENDERBUFFER,L.__webglColorRenderbuffer[q])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(L.__webglDepthRenderbuffer=i.createRenderbuffer(),Ut(L.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(rt){e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture),gt(i.TEXTURE_CUBE_MAP,g);for(let q=0;q<6;q++)if(g.mipmaps&&g.mipmaps.length>0)for(let tt=0;tt<g.mipmaps.length;tt++)ut(L.__webglFramebuffer[q][tt],b,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+q,tt);else ut(L.__webglFramebuffer[q],b,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);h(g)&&E(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ot){for(let q=0,tt=X.length;q<tt;q++){let At=X[q],vt=n.get(At),dt=i.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(dt=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(dt,vt.__webglTexture),gt(dt,At),ut(L.__webglFramebuffer,b,At,i.COLOR_ATTACHMENT0+q,dt,0),h(At)&&E(dt)}e.unbindTexture()}else{let q=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(q=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(q,k.__webglTexture),gt(q,g),g.mipmaps&&g.mipmaps.length>0)for(let tt=0;tt<g.mipmaps.length;tt++)ut(L.__webglFramebuffer[tt],b,g,i.COLOR_ATTACHMENT0,q,tt);else ut(L.__webglFramebuffer,b,g,i.COLOR_ATTACHMENT0,q,0);h(g)&&E(q),e.unbindTexture()}b.depthBuffer&&Lt(b)}function Gt(b){let g=b.textures;for(let L=0,k=g.length;L<k;L++){let X=g[L];if(h(X)){let rt=y(b),ot=n.get(X).__webglTexture;e.bindTexture(rt,ot),E(rt),e.unbindTexture()}}}let Xt=[],Ce=[];function Pe(b){if(b.samples>0){if(de(b)===!1){let g=b.textures,L=b.width,k=b.height,X=i.COLOR_BUFFER_BIT,rt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=n.get(b),q=g.length>1;if(q)for(let At=0;At<g.length;At++)e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ot.__webglMultisampledFramebuffer);let tt=b.texture.mipmaps;tt&&tt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglFramebuffer);for(let At=0;At<g.length;At++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(X|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(X|=i.STENCIL_BUFFER_BIT)),q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ot.__webglColorRenderbuffer[At]);let vt=n.get(g[At]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,vt,0)}i.blitFramebuffer(0,0,L,k,0,0,L,k,X,i.NEAREST),c===!0&&(Xt.length=0,Ce.length=0,Xt.push(i.COLOR_ATTACHMENT0+At),b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&(Xt.push(rt),Ce.push(rt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ce)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Xt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),q)for(let At=0;At<g.length;At++){e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,ot.__webglColorRenderbuffer[At]);let vt=n.get(g[At]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,vt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&c){let g=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function le(b){return Math.min(s.maxSamples,b.samples)}function de(b){let g=n.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function R(b){let g=o.render.frame;u.get(b)!==g&&(u.set(b,g),b.update())}function ve(b,g){let L=b.colorSpace,k=b.format,X=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||L!==cs&&L!==Dn&&(Yt.getTransfer(L)===jt?(k!==je||X!==He)&&Tt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ft("WebGLTextures: Unsupported texture color space:",L)),g}function $t(b){return typeof HTMLImageElement!="undefined"&&b instanceof HTMLImageElement?(A.width=b.naturalWidth||b.width,A.height=b.naturalHeight||b.height):typeof VideoFrame!="undefined"&&b instanceof VideoFrame?(A.width=b.displayWidth,A.height=b.displayHeight):(A.width=b.width,A.height=b.height),A}this.allocateTextureUnit=z,this.resetTextureUnits=G,this.getTextureUnits=I,this.setTextureUnits=U,this.setTexture2D=j,this.setTexture2DArray=K,this.setTexture3D=et,this.setTextureCube=J,this.rebindTextures=Wt,this.setupRenderTarget=Kt,this.updateRenderTargetMipmap=Gt,this.updateMultisampleRenderTarget=Pe,this.setupDepthRenderbuffer=Lt,this.setupFrameBufferTexture=ut,this.useMultisampledRTT=de,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Gg(i,t){function e(n,s=Dn){let r,o=Yt.getTransfer(s);if(n===He)return i.UNSIGNED_BYTE;if(n===qr)return i.UNSIGNED_SHORT_4_4_4_4;if(n===jr)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Va)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===za)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ha)return i.BYTE;if(n===ka)return i.SHORT;if(n===Vi)return i.UNSIGNED_SHORT;if(n===Zr)return i.INT;if(n===cn)return i.UNSIGNED_INT;if(n===ln)return i.FLOAT;if(n===hn)return i.HALF_FLOAT;if(n===Ya)return i.ALPHA;if(n===Wa)return i.RGB;if(n===je)return i.RGBA;if(n===mn)return i.DEPTH_COMPONENT;if(n===qn)return i.DEPTH_STENCIL;if(n===Ja)return i.RED;if(n===$r)return i.RED_INTEGER;if(n===jn)return i.RG;if(n===to)return i.RG_INTEGER;if(n===eo)return i.RGBA_INTEGER;if(n===Ds||n===Ts||n===Qs||n===Fs)if(o===jt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ds)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ts)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ds)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ts)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Qs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===no||n===io||n===so||n===ro)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===no)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===io)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===so)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ro)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===oo||n===ao||n===Ao||n===co||n===lo||n===Rs||n===ho)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===oo||n===ao)return o===jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ao)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===co)return r.COMPRESSED_R11_EAC;if(n===lo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Rs)return r.COMPRESSED_RG11_EAC;if(n===ho)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===uo||n===fo||n===po||n===go||n===mo||n===Bo||n===wo||n===Co||n===Eo||n===_o||n===Mo||n===xo||n===yo||n===vo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===uo)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===fo)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===po)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===go)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===mo)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Bo)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wo)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Co)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Eo)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_o)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Mo)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xo)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yo)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vo)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===So||n===bo||n===Io)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===So)return o===jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Io)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Do||n===To||n===Us||n===Qo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Do)return r.COMPRESSED_RED_RGTC1_EXT;if(n===To)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Us)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Qo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Og=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hg=`
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

}`,CA=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Bs(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Je({vertexShader:Og,fragmentShader:Hg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Me(new kn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},EA=class extends rn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,A=null,u=null,d=null,l=null,f=null,m=null,_=typeof XRWebGLBinding!="undefined",p=new CA,h={},E=e.getContextAttributes(),y=null,w=null,M=[],x=[],S=new Rt,B=null,v=null,D=new De;D.viewport=new ce;let Q=new De;Q.viewport=new ce;let N=[D,Q],G=new zr,I=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Z=M[Y];return Z===void 0&&(Z=new Ri,M[Y]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(Y){let Z=M[Y];return Z===void 0&&(Z=new Ri,M[Y]=Z),Z.getGripSpace()},this.getHand=function(Y){let Z=M[Y];return Z===void 0&&(Z=new Ri,M[Y]=Z),Z.getHandSpace()};function z(Y){let Z=x.indexOf(Y.inputSource);if(Z===-1)return;let at=M[Z];at!==void 0&&(at.update(Y.inputSource,Y.frame,A||o),at.dispatchEvent({type:Y.type,data:Y.inputSource}))}function V(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",j);for(let Y=0;Y<M.length;Y++){let Z=x[Y];Z!==null&&(x[Y]=null,M[Y].disconnect(Z))}I=null,U=null,p.reset();for(let Y in h)delete h[Y];if(t.setRenderTarget(y),f=null,l=null,d=null,s=null,w=null,Dt.stop(),n.isPresenting=!1,t.setPixelRatio(B),t.setSize(S.width,S.height,!1),v!==null){let Y=v.camera;Y.fov=v.fov,Y.zoom=v.zoom,Y.updateProjectionMatrix(),v=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&Tt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&Tt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return A||o},this.setReferenceSpace=function(Y){A=Y},this.getBaseLayer=function(){return l!==null?l:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",V),s.addEventListener("inputsourceschange",j),E.xrCompatible!==!0&&await e.makeXRCompatible(),B=t.getPixelRatio(),t.getSize(S),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let at=null,It=null,ut=null;E.depth&&(ut=E.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,at=E.stencil?qn:mn,It=E.stencil?zi:cn);let Ut={colorFormat:e.RGBA8,depthFormat:ut,scaleFactor:r};d=this.getBinding(),l=d.createProjectionLayer(Ut),s.updateRenderState({layers:[l]}),t.setPixelRatio(1),t.setSize(l.textureWidth,l.textureHeight,!1),w=new Oe(l.textureWidth,l.textureHeight,{format:je,type:He,depthTexture:new Hn(l.textureWidth,l.textureHeight,It,void 0,void 0,void 0,void 0,void 0,void 0,at),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:l.ignoreDepthValues===!1,resolveStencilBuffer:l.ignoreDepthValues===!1,storeMultisampledDepthBuffer:l.ignoreDepthValues===!1,storeMultisampledStencilBuffer:l.ignoreDepthValues===!1})}else{let at={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,at),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),w=new Oe(f.framebufferWidth,f.framebufferHeight,{format:je,type:He,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(c),A=null,o=await s.requestReferenceSpace(a),Dt.setContext(s),Dt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function j(Y){for(let Z=0;Z<Y.removed.length;Z++){let at=Y.removed[Z],It=x.indexOf(at);It>=0&&(x[It]=null,M[It].disconnect(at))}for(let Z=0;Z<Y.added.length;Z++){let at=Y.added[Z],It=x.indexOf(at);if(It===-1){for(let Ut=0;Ut<M.length;Ut++)if(Ut>=x.length){x.push(at),It=Ut;break}else if(x[Ut]===null){x[Ut]=at,It=Ut;break}if(It===-1)break}let ut=M[It];ut&&ut.connect(at)}}let K=new P,et=new P;function J(Y,Z,at){K.setFromMatrixPosition(Z.matrixWorld),et.setFromMatrixPosition(at.matrixWorld);let It=K.distanceTo(et),ut=Z.projectionMatrix.elements,Ut=at.projectionMatrix.elements,ie=ut[14]/(ut[10]-1),Lt=ut[14]/(ut[10]+1),Wt=(ut[9]+1)/ut[5],Kt=(ut[9]-1)/ut[5],Gt=(ut[8]-1)/ut[0],Xt=(Ut[8]+1)/Ut[0],Ce=ie*Gt,Pe=ie*Xt,le=It/(-Gt+Xt),de=le*-Gt;if(Z.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(de),Y.translateZ(le),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),ut[10]===-1)Y.projectionMatrix.copy(Z.projectionMatrix),Y.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{let R=ie+le,ve=Lt+le,$t=Ce-de,b=Pe+(It-de),g=Wt*Lt/ve*R,L=Kt*Lt/ve*R;Y.projectionMatrix.makePerspective($t,b,g,L,R,ve),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function st(Y,Z){Z===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Z.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let Z=Y.near,at=Y.far;p.texture!==null&&(p.depthNear>0&&(Z=p.depthNear),p.depthFar>0&&(at=p.depthFar)),G.near=Q.near=D.near=Z,G.far=Q.far=D.far=at,(I!==G.near||U!==G.far)&&(s.updateRenderState({depthNear:G.near,depthFar:G.far}),I=G.near,U=G.far),G.layers.mask=Y.layers.mask|6,D.layers.mask=G.layers.mask&-5,Q.layers.mask=G.layers.mask&-3;let It=Y.parent,ut=G.cameras;st(G,It);for(let Ut=0;Ut<ut.length;Ut++)st(ut[Ut],It);ut.length===2?J(G,D,Q):G.projectionMatrix.copy(D.projectionMatrix),v===null&&Y.isPerspectiveCamera&&(v={camera:Y,fov:Y.fov,zoom:Y.zoom}),nt(Y,G,It)};function nt(Y,Z,at){at===null?Y.matrix.copy(Z.matrixWorld):(Y.matrix.copy(at.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Z.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Z.projectionMatrix),Y.projectionMatrixInverse.copy(Z.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ti*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(l===null&&f===null))return c},this.setFoveation=function(Y){c=Y,l!==null&&(l.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(G)},this.getCameraTexture=function(Y){return h[Y]};let Et=null;function gt(Y,Z){if(u=Z.getViewerPose(A||o),m=Z,u!==null){let at=u.views;f!==null&&(t.setRenderTargetFramebuffer(w,f.framebuffer),t.setRenderTarget(w));let It=!1;at.length!==G.cameras.length&&(G.cameras.length=0,It=!0);for(let Lt=0;Lt<at.length;Lt++){let Wt=at[Lt],Kt=null;if(f!==null)Kt=f.getViewport(Wt);else{let Xt=d.getViewSubImage(l,Wt);Kt=Xt.viewport,Lt===0&&(t.setRenderTargetTextures(w,Xt.colorTexture,Xt.depthStencilTexture),t.setRenderTarget(w))}let Gt=N[Lt];Gt===void 0&&(Gt=new De,Gt.layers.enable(Lt),Gt.viewport=new ce,N[Lt]=Gt),Gt.matrix.fromArray(Wt.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(Wt.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(Kt.x,Kt.y,Kt.width,Kt.height),Lt===0&&(G.matrix.copy(Gt.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),It===!0&&G.cameras.push(Gt)}let ut=s.enabledFeatures;if(ut&&ut.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let Lt=d.getDepthInformation(at[0]);Lt&&Lt.isValid&&Lt.texture&&p.init(Lt,s.renderState)}if(ut&&ut.includes("camera-access")&&_){t.state.unbindTexture(),d=n.getBinding();for(let Lt=0;Lt<at.length;Lt++){let Wt=at[Lt].camera;if(Wt){let Kt=h[Wt];Kt||(Kt=new Bs,h[Wt]=Kt);let Gt=d.getCameraImage(Wt);Kt.sourceTexture=Gt}}}}for(let at=0;at<M.length;at++){let It=x[at],ut=M[at];It!==null&&ut!==void 0&&ut.update(It,Z,A||o)}Et&&Et(Y,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),m=null}let Dt=new xl;Dt.setAnimationLoop(gt),this.setAnimationLoop=function(Y){Et=Y},this.dispose=function(){}}},kg=new oe,Dl=new Pt;Dl.set(-1,0,0,0,1,0,0,0,1);function Vg(i,t){function e(p,h){p.matrixAutoUpdate===!0&&p.updateMatrix(),h.value.copy(p.matrix)}function n(p,h){h.color.getRGB(p.fogColor.value,ja(i)),h.isFog?(p.fogNear.value=h.near,p.fogFar.value=h.far):h.isFogExp2&&(p.fogDensity.value=h.density)}function s(p,h,E,y,w){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?r(p,h):h.isMeshLambertMaterial?(r(p,h),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(r(p,h),d(p,h)):h.isMeshPhongMaterial?(r(p,h),u(p,h),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(r(p,h),l(p,h),h.isMeshPhysicalMaterial&&f(p,h,w)):h.isMeshMatcapMaterial?(r(p,h),m(p,h)):h.isMeshDepthMaterial?r(p,h):h.isMeshDistanceMaterial?(r(p,h),_(p,h)):h.isMeshNormalMaterial?r(p,h):h.isLineBasicMaterial?(o(p,h),h.isLineDashedMaterial&&a(p,h)):h.isPointsMaterial?c(p,h,E,y):h.isSpriteMaterial?A(p,h):h.isShadowMaterial?(p.color.value.copy(h.color),p.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(p,h){p.opacity.value=h.opacity,h.color&&p.diffuse.value.copy(h.color),h.emissive&&p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(p.map.value=h.map,e(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,e(h.alphaMap,p.alphaMapTransform)),h.bumpMap&&(p.bumpMap.value=h.bumpMap,e(h.bumpMap,p.bumpMapTransform),p.bumpScale.value=h.bumpScale,h.side===Ue&&(p.bumpScale.value*=-1)),h.normalMap&&(p.normalMap.value=h.normalMap,e(h.normalMap,p.normalMapTransform),p.normalScale.value.copy(h.normalScale),h.side===Ue&&p.normalScale.value.negate()),h.displacementMap&&(p.displacementMap.value=h.displacementMap,e(h.displacementMap,p.displacementMapTransform),p.displacementScale.value=h.displacementScale,p.displacementBias.value=h.displacementBias),h.emissiveMap&&(p.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,p.emissiveMapTransform)),h.specularMap&&(p.specularMap.value=h.specularMap,e(h.specularMap,p.specularMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest);let E=t.get(h),y=E.envMap,w=E.envMapRotation;y&&(p.envMap.value=y,p.envMapRotation.value.setFromMatrix4(kg.makeRotationFromEuler(w)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Dl),p.reflectivity.value=h.reflectivity,p.ior.value=h.ior,p.refractionRatio.value=h.refractionRatio),h.lightMap&&(p.lightMap.value=h.lightMap,p.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,p.lightMapTransform)),h.aoMap&&(p.aoMap.value=h.aoMap,p.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,p.aoMapTransform))}function o(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,h.map&&(p.map.value=h.map,e(h.map,p.mapTransform))}function a(p,h){p.dashSize.value=h.dashSize,p.totalSize.value=h.dashSize+h.gapSize,p.scale.value=h.scale}function c(p,h,E,y){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.size.value=h.size*E,p.scale.value=y*.5,h.map&&(p.map.value=h.map,e(h.map,p.uvTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,e(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function A(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.rotation.value=h.rotation,h.map&&(p.map.value=h.map,e(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,e(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function u(p,h){p.specular.value.copy(h.specular),p.shininess.value=Math.max(h.shininess,1e-4)}function d(p,h){h.gradientMap&&(p.gradientMap.value=h.gradientMap)}function l(p,h){p.metalness.value=h.metalness,h.metalnessMap&&(p.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,p.metalnessMapTransform)),p.roughness.value=h.roughness,h.roughnessMap&&(p.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,p.roughnessMapTransform)),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)}function f(p,h,E){p.ior.value=h.ior,h.sheen>0&&(p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),p.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(p.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,p.sheenColorMapTransform)),h.sheenRoughnessMap&&(p.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,p.sheenRoughnessMapTransform))),h.clearcoat>0&&(p.clearcoat.value=h.clearcoat,p.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(p.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,p.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(p.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Ue&&p.clearcoatNormalScale.value.negate())),h.dispersion>0&&(p.dispersion.value=h.dispersion),h.retroreflectivity>0&&(p.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(p.iridescence.value=h.iridescence,p.iridescenceIOR.value=h.iridescenceIOR,p.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(p.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,p.iridescenceMapTransform)),h.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),h.transmission>0&&(p.transmission.value=h.transmission,p.transmissionSamplerMap.value=E.texture,p.transmissionSamplerSize.value.set(E.width,E.height),h.transmissionMap&&(p.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,p.transmissionMapTransform)),p.thickness.value=h.thickness,h.thicknessMap&&(p.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=h.attenuationDistance,p.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(p.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(p.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=h.specularIntensity,p.specularColor.value.copy(h.specularColor),h.specularColorMap&&(p.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,p.specularColorMapTransform)),h.specularIntensityMap&&(p.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,h){h.matcap&&(p.matcap.value=h.matcap)}function _(p,h){let E=t.get(h).light;p.referencePosition.value.setFromMatrixPosition(E.matrixWorld),p.nearDistance.value=E.shadow.camera.near,p.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function zg(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,M){let x=M.program;n.uniformBlockBinding(w,x)}function A(w,M){let x=s[w.id];x===void 0&&(p(w),x=u(w),s[w.id]=x,w.addEventListener("dispose",E));let S=M.program;n.updateUBOMapping(w,S);let B=t.render.frame;r[w.id]!==B&&(l(w),r[w.id]=B)}function u(w){let M=d();w.__bindingPointIndex=M;let x=i.createBuffer(),S=w.__size,B=w.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,S,B),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,x),x}function d(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return Ft("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function l(w){let M=s[w.id],x=w.uniforms,S=w.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let B=0,v=x.length;B<v;B++){let D=x[B];if(Array.isArray(D))for(let Q=0,N=D.length;Q<N;Q++)f(D[Q],B,Q,S);else f(D,B,0,S)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(w,M,x,S){if(_(w,M,x,S)===!0){let B=w.__offset,v=w.value;if(Array.isArray(v)){let D=0;for(let Q=0;Q<v.length;Q++){let N=v[Q],G=h(N);m(N,w.__data,D),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(D+=G.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(v,w.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,B,w.__data)}}function m(w,M,x){typeof w=="number"||typeof w=="boolean"?M[0]=w:w.isMatrix3?(M[0]=w.elements[0],M[1]=w.elements[1],M[2]=w.elements[2],M[3]=0,M[4]=w.elements[3],M[5]=w.elements[4],M[6]=w.elements[5],M[7]=0,M[8]=w.elements[6],M[9]=w.elements[7],M[10]=w.elements[8],M[11]=0):ArrayBuffer.isView(w)?M.set(new w.constructor(w.buffer,w.byteOffset,M.length)):w.toArray(M,x)}function _(w,M,x,S){let B=w.value,v=M+"_"+x;if(S[v]===void 0)return typeof B=="number"||typeof B=="boolean"?S[v]=B:ArrayBuffer.isView(B)?S[v]=B.slice():S[v]=B.clone(),!0;{let D=S[v];if(typeof B=="number"||typeof B=="boolean"){if(D!==B)return S[v]=B,!0}else{if(ArrayBuffer.isView(B))return!0;if(D.equals(B)===!1)return D.copy(B),!0}}return!1}function p(w){let M=w.uniforms,x=0,S=16;for(let v=0,D=M.length;v<D;v++){let Q=Array.isArray(M[v])?M[v]:[M[v]];for(let N=0,G=Q.length;N<G;N++){let I=Q[N],U=Array.isArray(I.value)?I.value:[I.value];for(let z=0,V=U.length;z<V;z++){let j=U[z],K=h(j),et=x%S,J=et%K.boundary,st=et+J;x+=J,st!==0&&S-st<K.storage&&(x+=S-st),I.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=x,x+=K.storage}}}let B=x%S;return B>0&&(x+=S-B),w.__size=x,w.__cache={},this}function h(w){let M={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(M.boundary=4,M.storage=4):w.isVector2?(M.boundary=8,M.storage=8):w.isVector3||w.isColor?(M.boundary=16,M.storage=12):w.isVector4?(M.boundary=16,M.storage=16):w.isMatrix3?(M.boundary=48,M.storage=48):w.isMatrix4?(M.boundary=64,M.storage=64):w.isTexture?Tt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(w)?(M.boundary=16,M.storage=w.byteLength):Tt("WebGLRenderer: Unsupported uniform value type.",w),M}function E(w){let M=w.target;M.removeEventListener("dispose",E);let x=o.indexOf(M.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function y(){for(let w in s)i.deleteBuffer(s[w]);o=[],s={},r={}}return{bind:c,update:A,dispose:y}}var Yg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Cn=null;function Wg(){return Cn===null&&(Cn=new yr(Yg,16,16,jn,hn),Cn.name="DFG_LUT",Cn.minFilter=xe,Cn.magFilter=xe,Cn.wrapS=pn,Cn.wrapT=pn,Cn.generateMipmaps=!1,Cn.needsUpdate=!0),Cn}var Oo=class{constructor(t={}){let{canvas:e=Xc(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:A=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:l=!1,outputBufferType:f=He}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;let _=f,p=new Set([eo,to,$r]),h=new Set([He,cn,Vi,zi,qr,jr]),E=new Uint32Array(4),y=new Int32Array(4),w=new P,M=null,x=null,S=[],B=[],v=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=An,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,Q=!1,N=null,G=null,I=null,U=null;this._outputColorSpace=Le;let z=0,V=0,j=null,K=-1,et=null,J=new ce,st=new ce,nt=null,Et=new kt(0),gt=0,Dt=e.width,Y=e.height,Z=1,at=null,It=null,ut=new ce(0,0,Dt,Y),Ut=new ce(0,0,Dt,Y),ie=!1,Lt=new Ui,Wt=!1,Kt=!1,Gt=new oe,Xt=new P,Ce=new ce,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},le=!1;function de(){return j===null?Z:1}let R=n;function ve(C,T){return e.getContext(C,T)}let $t,b,g,L,k,X,rt,ot,q,tt,At,vt,dt,ct,St,Qt,Nt,F,lt,$,ht,Bt,it;try{let C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:A,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",se,!1),e.addEventListener("webglcontextrestored",Zt,!1),e.addEventListener("webglcontextcreationerror",$e,!1),R===null){let T="webgl2";if(R=ve(T,C),R===null)throw ve(T)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}bt()}catch(C){throw e.removeEventListener("webglcontextlost",se,!1),e.removeEventListener("webglcontextrestored",Zt,!1),e.removeEventListener("webglcontextcreationerror",$e,!1),Ft("WebGLRenderer: "+C.message),C}function bt(){$t=new $f(R),$t.init(),ht=new Gg(R,$t),b=new Vf(R,$t,t,ht),g=new Lg(R,$t),b.reversedDepthBuffer&&l&&g.buffers.depth.setReversed(!0),G=R.createFramebuffer(),I=R.createFramebuffer(),U=R.createFramebuffer(),L=new np(R),k=new Mg,X=new Ng(R,$t,g,k,b,ht,L),rt=new jf(D),ot=new iu(R),Bt=new Hf(R,ot),q=new tp(R,ot,L,Bt),tt=new sp(R,q,ot,Bt,L),F=new ip(R,b,X),St=new zf(k),At=new _g(D,rt,$t,b,Bt,St),vt=new Vg(D,k),dt=new yg,ct=new Tg($t),Nt=new Of(D,rt,g,tt,m,c),Qt=new Pg(D,tt,b),it=new zg(R,L,b,g),lt=new kf(R,$t,L),$=new ep(R,$t,L),L.programs=At.programs,D.capabilities=b,D.extensions=$t,D.properties=k,D.renderLists=dt,D.shadowMap=Qt,D.state=g,D.info=L}_!==He&&(v=new op(_,e.width,e.height,a,s,r));let xt=new EA(D,R);this.xr=xt,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let C=$t.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){let C=$t.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(C){C!==void 0&&(Z=C,this.setSize(Dt,Y,!1))},this.getSize=function(C){return C.set(Dt,Y)},this.setSize=function(C,T,W=!0){if(xt.isPresenting){Tt("WebGLRenderer: Can't change size while VR device is presenting.");return}Dt=C,Y=T,e.width=Math.floor(C*Z),e.height=Math.floor(T*Z),W===!0&&(e.style.width=C+"px",e.style.height=T+"px"),v!==null&&v.setSize(e.width,e.height),this.setViewport(0,0,C,T)},this.getDrawingBufferSize=function(C){return C.set(Dt*Z,Y*Z).floor()},this.setDrawingBufferSize=function(C,T,W){Dt=C,Y=T,Z=W,e.width=Math.floor(C*W),e.height=Math.floor(T*W),this.setViewport(0,0,C,T)},this.setEffects=function(C){if(_===He){Ft("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let T=0;T<C.length;T++)if(C[T].isOutputPass===!0){Tt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(J)},this.getViewport=function(C){return C.copy(ut)},this.setViewport=function(C,T,W,O){C.isVector4?ut.set(C.x,C.y,C.z,C.w):ut.set(C,T,W,O),g.viewport(J.copy(ut).multiplyScalar(Z).round())},this.getScissor=function(C){return C.copy(Ut)},this.setScissor=function(C,T,W,O){C.isVector4?Ut.set(C.x,C.y,C.z,C.w):Ut.set(C,T,W,O),g.scissor(st.copy(Ut).multiplyScalar(Z).round())},this.getScissorTest=function(){return ie},this.setScissorTest=function(C){g.setScissorTest(ie=C)},this.setOpaqueSort=function(C){at=C},this.setTransparentSort=function(C){It=C},this.getClearColor=function(C){return C.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor(...arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha(...arguments)},this.clear=function(C=!0,T=!0,W=!0){let O=0;if(C){let H=!1;if(j!==null){let mt=j.texture.format;H=p.has(mt)}if(H){let mt=j.texture.type,Ct=h.has(mt),pt=Nt.getClearColor(),_t=Nt.getClearAlpha(),yt=pt.r,Ot=pt.g,zt=pt.b;Ct?(E[0]=yt,E[1]=Ot,E[2]=zt,E[3]=_t,R.clearBufferuiv(R.COLOR,0,E)):(y[0]=yt,y[1]=Ot,y[2]=zt,y[3]=_t,R.clearBufferiv(R.COLOR,0,y))}else O|=R.COLOR_BUFFER_BIT}T&&(O|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(O|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&R.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),N=C},this.dispose=function(){e.removeEventListener("webglcontextlost",se,!1),e.removeEventListener("webglcontextrestored",Zt,!1),e.removeEventListener("webglcontextcreationerror",$e,!1),Nt.dispose(),dt.dispose(),ct.dispose(),k.dispose(),rt.dispose(),tt.dispose(),Bt.dispose(),it.dispose(),At.dispose(),xt.dispose(),xt.removeEventListener("sessionstart",DA),xt.removeEventListener("sessionend",TA),$n.stop()};function se(C){C.preventDefault(),Xa("WebGLRenderer: Context Lost."),Q=!0}function Zt(){Xa("WebGLRenderer: Context Restored."),Q=!1;let C=L.autoReset,T=Qt.enabled,W=Qt.autoUpdate,O=Qt.needsUpdate,H=Qt.type;bt(),L.autoReset=C,Qt.enabled=T,Qt.autoUpdate=W,Qt.needsUpdate=O,Qt.type=H}function $e(C){Ft("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function un(C){let T=C.target;T.removeEventListener("dispose",un),jl(T)}function jl(C){$l(C),k.remove(C)}function $l(C){let T=k.get(C).programs;T!==void 0&&(T.forEach(function(W){At.releaseProgram(W)}),C.isShaderMaterial&&At.releaseShaderCache(C))}this.renderBufferDirect=function(C,T,W,O,H,mt){T===null&&(T=Pe);let Ct=H.isMesh&&H.matrixWorld.determinantAffine()<0,pt=nh(C,T,W,O,H);g.setMaterial(O,Ct);let _t=W.index,yt=1;if(O.wireframe===!0){if(_t=q.getWireframeAttribute(W),_t===void 0)return;yt=2}let Ot=W.drawRange,zt=W.attributes.position,Mt=Ot.start*yt,qt=(Ot.start+Ot.count)*yt;mt!==null&&(Mt=Math.max(Mt,mt.start*yt),qt=Math.min(qt,(mt.start+mt.count)*yt)),_t!==null?(Mt=Math.max(Mt,0),qt=Math.min(qt,_t.count)):zt!=null&&(Mt=Math.max(Mt,0),qt=Math.min(qt,zt.count));let fe=qt-Mt;if(fe<0||fe===1/0)return;Bt.setup(H,O,pt,W,_t);let ae,ne=lt;if(_t!==null&&(ae=ot.get(_t),ne=$,ne.setIndex(ae)),H.isMesh)O.wireframe===!0?(g.setLineWidth(O.wireframeLinewidth*de()),ne.setMode(R.LINES)):ne.setMode(R.TRIANGLES);else if(H.isLine){let Se=O.linewidth;Se===void 0&&(Se=1),g.setLineWidth(Se*de()),H.isLineSegments?ne.setMode(R.LINES):H.isLineLoop?ne.setMode(R.LINE_LOOP):ne.setMode(R.LINE_STRIP)}else H.isPoints?ne.setMode(R.POINTS):H.isSprite&&ne.setMode(R.TRIANGLES);if(H.isBatchedMesh)if($t.get("WEBGL_multi_draw"))ne.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Se=H._multiDrawStarts,wt=H._multiDrawCounts,Fe=H._multiDrawCount,Jt=_t?ot.get(_t).bytesPerElement:1,Ze=k.get(O).currentProgram.getUniforms();for(let dn=0;dn<Fe;dn++)Ze.setValue(R,"_gl_DrawID",dn),ne.render(Se[dn]/Jt,wt[dn])}else if(H.isInstancedMesh)ne.renderInstances(Mt,fe,H.count);else if(W.isInstancedBufferGeometry){let Se=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,wt=Math.min(W.instanceCount,Se);ne.renderInstances(Mt,fe,wt)}else ne.render(Mt,fe)};function IA(C,T,W,O){N!==null&&C.isNodeMaterial&&N.setObject(O,C),Wt===!0&&St.setState(C,W,!1),C.transparent===!0&&C.side===Te&&C.forceSinglePass===!1?(C.side=Ue,C.needsUpdate=!0,Os(C,T,O),C.side=Kn,C.needsUpdate=!0,Os(C,T,O),C.side=Te):Os(C,T,O)}this.compile=function(C,T,W=null){W===null&&(W=C),N!==null&&N.renderStart(C,T,W),x=ct.get(W),x.init(T),B.push(x),W.traverseVisible(function(H){H.isLight&&H.layers.test(T.layers)&&(x.pushLight(H),H.castShadow&&x.pushShadow(H))}),C!==W&&C.traverseVisible(function(H){H.isLight&&H.layers.test(T.layers)&&(x.pushLight(H),H.castShadow&&x.pushShadow(H))}),x.setupLights(),N!==null&&N.updateLights(x.state.lightsArray),Kt=this.localClippingEnabled,Wt=St.init(this.clippingPlanes,Kt),Wt===!0&&St.setGlobalState(this.clippingPlanes,T),N!==null&&Qt.render(x.state.shadowsArray,W,T);let O=new Set;return C.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let mt=H.material;if(mt)if(Array.isArray(mt))for(let Ct=0;Ct<mt.length;Ct++){let pt=mt[Ct];IA(pt,W,T,H),O.add(pt)}else IA(mt,W,T,H),O.add(mt)}),x=B.pop(),N!==null&&N.renderEnd(),O},this.compileAsync=function(C,T,W=null){let O=this.compile(C,T,W);return new Promise(H=>{function mt(){if(O.forEach(function(Ct){let _t=k.get(Ct).currentProgram;(_t===void 0||_t.isReady())&&O.delete(Ct)}),O.size===0){H(C);return}setTimeout(mt,10)}$t.get("KHR_parallel_shader_compile")!==null?mt():setTimeout(mt,10)})};let Ko=null;function th(C){Ko&&Ko(C)}function DA(){$n.stop()}function TA(){$n.start()}let $n=new xl;$n.setAnimationLoop(th),typeof self!="undefined"&&$n.setContext(self),this.setAnimationLoop=function(C){Ko=C,xt.setAnimationLoop(C),C===null?$n.stop():$n.start()},xt.addEventListener("sessionstart",DA),xt.addEventListener("sessionend",TA),this.render=function(C,T){if(T!==void 0&&T.isCamera!==!0){Ft("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(Q===!0)return;N!==null&&N.renderStart(C,T);let W=xt.enabled===!0&&xt.isPresenting===!0,O=v!==null&&(j===null||W)&&v.begin(D,j);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),T.parent===null&&T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),xt.enabled===!0&&xt.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(xt.cameraAutoUpdate===!0&&xt.updateCamera(T),T=xt.getCamera()),C.isScene===!0&&C.onBeforeRender(D,C,T,j),x=ct.get(C,B.length),x.init(T),x.state.textureUnits=X.getTextureUnits(),B.push(x),Gt.multiplyMatrices(T.projectionMatrix,T.matrixWorldInverse),Lt.setFromProjectionMatrix(Gt,sn,T.reversedDepth),Kt=this.localClippingEnabled,Wt=St.init(this.clippingPlanes,Kt),M=dt.get(C,S.length),M.init(),S.push(M),xt.enabled===!0&&xt.isPresenting===!0){let Ct=D.xr.getDepthSensingMesh();Ct!==null&&Xo(Ct,T,-1/0,D.sortObjects)}Xo(C,T,0,D.sortObjects),M.finish(),N!==null&&N.updateLights(x.state.lightsArray),D.sortObjects===!0&&M.sort(at,It),le=xt.enabled===!1||xt.isPresenting===!1||xt.hasDepthSensing()===!1,le&&Nt.addToRenderList(M,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Wt===!0&&St.beginShadows();let H=x.state.shadowsArray;if(Qt.render(H,C,T),Wt===!0&&St.endShadows(),(O&&v.hasRenderPass())===!1){let Ct=M.opaque,pt=M.transmissive;if(x.setupLights(),T.isArrayCamera){let _t=T.cameras;if(pt.length>0)for(let yt=0,Ot=_t.length;yt<Ot;yt++){let zt=_t[yt];FA(Ct,pt,C,zt)}le&&Nt.render(C);for(let yt=0,Ot=_t.length;yt<Ot;yt++){let zt=_t[yt];QA(M,C,zt,zt.viewport)}}else pt.length>0&&FA(Ct,pt,C,T),le&&Nt.render(C),QA(M,C,T)}j!==null&&V===0&&(X.updateMultisampleRenderTarget(j),X.updateRenderTargetMipmap(j)),O&&v.end(D),C.isScene===!0&&C.onAfterRender(D,C,T),Bt.resetDefaultState(),K=-1,et=null,B.pop(),B.length>0?(x=B[B.length-1],X.setTextureUnits(x.state.textureUnits),Wt===!0&&St.setGlobalState(D.clippingPlanes,x.state.camera)):x=null,S.pop(),S.length>0?M=S[S.length-1]:M=null,N!==null&&N.renderEnd()};function Xo(C,T,W,O){if(C.visible===!1)return;if(C.layers.test(T.layers)){if(C.isGroup)W=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(T);else if(C.isLightProbeGrid)x.pushLightProbeGrid(C);else if(C.isLight)x.pushLight(C),C.castShadow&&x.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||C.intersectsFrustum(Lt)){O&&Ce.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Gt);let Ct=tt.update(C),pt=C.material;pt.visible&&M.push(C,Ct,pt,W,Ce.z,null,T)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||C.intersectsFrustum(Lt))){let Ct=tt.update(C),pt=C.material;if(O&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ce.copy(C.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),Ce.copy(Ct.boundingSphere.center)),Ce.applyMatrix4(C.matrixWorld).applyMatrix4(Gt)),Array.isArray(pt)){let _t=Ct.groups;for(let yt=0,Ot=_t.length;yt<Ot;yt++){let zt=_t[yt],Mt=pt[zt.materialIndex];Mt&&Mt.visible&&M.push(C,Ct,Mt,W,Ce.z,zt,T)}}else pt.visible&&M.push(C,Ct,pt,W,Ce.z,null,T)}}let mt=C.children;for(let Ct=0,pt=mt.length;Ct<pt;Ct++)Xo(mt[Ct],T,W,O)}function QA(C,T,W,O){let{opaque:H,transmissive:mt,transparent:Ct}=C;x.setupLightsView(W),Wt===!0&&St.setGlobalState(D.clippingPlanes,W),O&&g.viewport(J.copy(O)),H.length>0&&Gs(H,T,W),mt.length>0&&Gs(mt,T,W),Ct.length>0&&Gs(Ct,T,W),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function FA(C,T,W,O){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[O.id]===void 0){let Mt=$t.has("EXT_color_buffer_half_float")||$t.has("EXT_color_buffer_float");x.state.transmissionRenderTarget[O.id]=new Oe(1,1,{generateMipmaps:!0,type:Mt?hn:He,minFilter:Zn,samples:Math.max(4,b.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Yt.workingColorSpace})}let mt=x.state.transmissionRenderTarget[O.id],Ct=O.viewport||J;mt.setSize(Ct.z*D.transmissionResolutionScale,Ct.w*D.transmissionResolutionScale);let pt=D.getRenderTarget(),_t=D.getActiveCubeFace(),yt=D.getActiveMipmapLevel();D.setRenderTarget(mt),D.getClearColor(Et),gt=D.getClearAlpha(),gt<1&&D.setClearColor(16777215,.5),D.clear(),le&&Nt.render(W);let Ot=D.toneMapping;D.toneMapping=An;let zt=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),x.setupLightsView(O),Wt===!0&&St.setGlobalState(D.clippingPlanes,O),Gs(C,W,O),X.updateMultisampleRenderTarget(mt),X.updateRenderTargetMipmap(mt),$t.has("WEBGL_multisampled_render_to_texture")===!1){let Mt=!1;for(let qt=0,fe=T.length;qt<fe;qt++){let ae=T[qt],{object:ne,geometry:Se,material:wt,group:Fe}=ae;if(wt.side===Te&&ne.layers.test(O.layers)){let Jt=wt.side;wt.side=Ue,wt.needsUpdate=!0,RA(ne,W,O,Se,wt,Fe),wt.side=Jt,wt.needsUpdate=!0,Mt=!0}}Mt===!0&&(X.updateMultisampleRenderTarget(mt),X.updateRenderTargetMipmap(mt))}D.setRenderTarget(pt,_t,yt),D.setClearColor(Et,gt),zt!==void 0&&(O.viewport=zt),D.toneMapping=Ot}function Gs(C,T,W){let O=T.isScene===!0?T.overrideMaterial:null;for(let H=0,mt=C.length;H<mt;H++){let Ct=C[H],{object:pt,geometry:_t,group:yt}=Ct,Ot=Ct.material;Ot.allowOverride===!0&&O!==null&&(Ot=O),pt.layers.test(W.layers)&&RA(pt,T,W,_t,Ot,yt)}}function RA(C,T,W,O,H,mt){N!==null&&H.isNodeMaterial&&N.setObject(C,H),C.onBeforeRender(D,T,W,O,H,mt),C.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),H.onBeforeRender(D,T,W,O,C,mt),H.transparent===!0&&H.side===Te&&H.forceSinglePass===!1?(H.side=Ue,H.needsUpdate=!0,D.renderBufferDirect(W,T,O,H,C,mt),H.side=Kn,H.needsUpdate=!0,D.renderBufferDirect(W,T,O,H,C,mt),H.side=Te):D.renderBufferDirect(W,T,O,H,C,mt),C.onAfterRender(D,T,W,O,H,mt)}function Os(C,T,W){T.isScene!==!0&&(T=Pe);let O=k.get(C),H=x.state.lights,mt=x.state.shadowsArray,Ct=H.state.version,pt=At.getParameters(C,H.state,mt,T,W,x.state.lightProbeGridArray),_t=At.getProgramCacheKey(pt),yt=O.programs;O.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?T.environment:null,O.fog=T.fog;let Ot=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;O.envMap=rt.get(C.envMap||O.environment,Ot),O.envMapRotation=O.environment!==null&&C.envMap===null?T.environmentRotation:C.envMapRotation,yt===void 0&&(C.addEventListener("dispose",un),yt=new Map,O.programs=yt);let zt=yt.get(_t);if(zt!==void 0){if(O.currentProgram===zt&&O.lightsStateVersion===Ct)return PA(C,pt),zt}else pt.uniforms=At.getUniforms(C),N!==null&&C.isNodeMaterial&&N.build(C,W,pt),C.onBeforeCompile(pt,D),zt=At.acquireProgram(pt,_t),yt.set(_t,zt),O.uniforms=pt.uniforms;let Mt=O.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Mt.clippingPlanes=St.uniform),PA(C,pt),O.needsLights=sh(C),O.lightsStateVersion=Ct,O.needsLights&&(Mt.ambientLightColor.value=H.state.ambient,Mt.lightProbe.value=H.state.probe,Mt.sunLights.value=H.state.sun,Mt.sunLightShadows.value=H.state.sunShadow,Mt.directionalLights.value=H.state.directional,Mt.directionalLightShadows.value=H.state.directionalShadow,Mt.spotLights.value=H.state.spot,Mt.spotLightShadows.value=H.state.spotShadow,Mt.rectAreaLights.value=H.state.rectArea,Mt.ltc_1.value=H.state.rectAreaLTC1,Mt.ltc_2.value=H.state.rectAreaLTC2,Mt.pointLights.value=H.state.point,Mt.pointLightShadows.value=H.state.pointShadow,Mt.hemisphereLights.value=H.state.hemi,Mt.sunShadowMatrix.value=H.state.sunShadowMatrix,Mt.sunShadowCascade.value=H.state.sunShadowCascade,Mt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Mt.spotLightMatrix.value=H.state.spotLightMatrix,Mt.spotLightMap.value=H.state.spotLightMap,Mt.pointShadowMatrix.value=H.state.pointShadowMatrix),O.lightProbeGrid=x.state.lightProbeGridArray.length>0,O.currentProgram=zt,O.uniformsList=null,zt}function UA(C){if(C.uniformsList===null){let T=C.currentProgram.getUniforms();C.uniformsList=Ki.seqWithValue(T.seq,C.uniforms)}return C.uniformsList}function PA(C,T){let W=k.get(C);W.outputColorSpace=T.outputColorSpace,W.batching=T.batching,W.batchingColor=T.batchingColor,W.instancing=T.instancing,W.instancingColor=T.instancingColor,W.instancingMorph=T.instancingMorph,W.skinning=T.skinning,W.morphTargets=T.morphTargets,W.morphNormals=T.morphNormals,W.morphColors=T.morphColors,W.morphTargetsCount=T.morphTargetsCount,W.numClippingPlanes=T.numClippingPlanes,W.numIntersection=T.numClipIntersection,W.vertexAlphas=T.vertexAlphas,W.vertexTangents=T.vertexTangents,W.toneMapping=T.toneMapping}function eh(C,T){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;w.setFromMatrixPosition(T.matrixWorld);for(let W=0,O=C.length;W<O;W++){let H=C[W];if(H.texture!==null&&H.boundingBox.containsPoint(w))return H}return null}function nh(C,T,W,O,H){T.isScene!==!0&&(T=Pe),X.resetTextureUnits();let mt=T.fog,Ct=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?T.environment:null,pt=j===null?D.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Yt.workingColorSpace,_t=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,yt=rt.get(O.envMap||Ct,_t),Ot=O.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,zt=!!W.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Mt=!!W.morphAttributes.position,qt=!!W.morphAttributes.normal,fe=!!W.morphAttributes.color,ae=An;O.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(ae=D.toneMapping);let ne=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Se=ne!==void 0?ne.length:0,wt=k.get(O),Fe=x.state.lights;if(Wt===!0&&(Kt===!0||C!==et)){let re=C===et&&O.id===K;St.setState(O,C,re)}let Jt=!1;O.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==Fe.state.version||wt.outputColorSpace!==pt||H.isBatchedMesh&&wt.batching===!1||!H.isBatchedMesh&&wt.batching===!0||H.isBatchedMesh&&wt.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&wt.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&wt.instancing===!1||!H.isInstancedMesh&&wt.instancing===!0||H.isSkinnedMesh&&wt.skinning===!1||!H.isSkinnedMesh&&wt.skinning===!0||H.isInstancedMesh&&wt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&wt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&wt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&wt.instancingMorph===!1&&H.morphTexture!==null||wt.envMap!==yt||O.fog===!0&&wt.fog!==mt||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==St.numPlanes||wt.numIntersection!==St.numIntersection)||wt.vertexAlphas!==Ot||wt.vertexTangents!==zt||wt.morphTargets!==Mt||wt.morphNormals!==qt||wt.morphColors!==fe||wt.toneMapping!==ae||wt.morphTargetsCount!==Se||!!wt.lightProbeGrid!=x.state.lightProbeGridArray.length>0)&&(Jt=!0):(Jt=!0,wt.__version=O.version);let Ze=wt.currentProgram;Jt===!0&&(Ze=Os(O,T,H),N&&O.isNodeMaterial&&N.onUpdateProgram(O,Ze,wt));let dn=!1,Tn=!1,hi=!1,ee=Ze.getUniforms(),he=wt.uniforms;if(g.useProgram(Ze.program)&&(dn=!0,Tn=!0,hi=!0),O.id!==K&&(K=O.id,Tn=!0),wt.needsLights){let re=eh(x.state.lightProbeGridArray,H);wt.lightProbeGrid!==re&&(wt.lightProbeGrid=re,Tn=!0)}if(dn||et!==C){g.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),ee.setValue(R,"projectionMatrix",C.projectionMatrix),ee.setValue(R,"viewMatrix",C.matrixWorldInverse);let Fn=ee.map.cameraPosition;Fn!==void 0&&Fn.setValue(R,Xt.setFromMatrixPosition(C.matrixWorld)),b.logarithmicDepthBuffer&&ee.setValue(R,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&ee.setValue(R,"isOrthographic",C.isOrthographicCamera===!0),et!==C&&(et=C,Tn=!0,hi=!0)}if(wt.needsLights&&(Fe.state.sunShadowMap.length>0&&ee.setValue(R,"sunShadowMap",Fe.state.sunShadowMap,X),Fe.state.directionalShadowMap.length>0&&ee.setValue(R,"directionalShadowMap",Fe.state.directionalShadowMap,X),Fe.state.spotShadowMap.length>0&&ee.setValue(R,"spotShadowMap",Fe.state.spotShadowMap,X),Fe.state.pointShadowMap.length>0&&ee.setValue(R,"pointShadowMap",Fe.state.pointShadowMap,X)),H.isSkinnedMesh){ee.setOptional(R,H,"bindMatrix"),ee.setOptional(R,H,"bindMatrixInverse");let re=H.skeleton;re&&(re.boneTexture===null&&re.computeBoneTexture(),ee.setValue(R,"boneTexture",re.boneTexture,X))}H.isBatchedMesh&&(ee.setOptional(R,H,"batchingTexture"),ee.setValue(R,"batchingTexture",H._matricesTexture,X),ee.setOptional(R,H,"batchingIdTexture"),ee.setValue(R,"batchingIdTexture",H._indirectTexture,X),ee.setOptional(R,H,"batchingColorTexture"),H._colorsTexture!==null&&ee.setValue(R,"batchingColorTexture",H._colorsTexture,X));let Qn=W.morphAttributes;if((Qn.position!==void 0||Qn.normal!==void 0||Qn.color!==void 0)&&F.update(H,W,Ze),(Tn||wt.receiveShadow!==H.receiveShadow)&&(wt.receiveShadow=H.receiveShadow,ee.setValue(R,"receiveShadow",H.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&T.environment!==null&&(he.envMapIntensity.value=T.environmentIntensity),he.dfgLUT!==void 0&&(he.dfgLUT.value=Wg()),Tn){if(ee.setValue(R,"toneMappingExposure",D.toneMappingExposure),wt.needsLights&&ih(he,hi),mt&&O.fog===!0&&vt.refreshFogUniforms(he,mt),vt.refreshMaterialUniforms(he,O,Z,Y,x.state.transmissionRenderTarget[C.id]),wt.needsLights&&wt.lightProbeGrid){let re=wt.lightProbeGrid;he.probesSH.value=re.texture,he.probesMin.value.copy(re.boundingBox.min),he.probesMax.value.copy(re.boundingBox.max),he.probesResolution.value.copy(re.resolution)}Ki.upload(R,UA(wt),he,X)}if(O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Ki.upload(R,UA(wt),he,X),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&ee.setValue(R,"center",H.center),ee.setValue(R,"modelViewMatrix",H.modelViewMatrix),ee.setValue(R,"normalMatrix",H.normalMatrix),ee.setValue(R,"modelMatrix",H.matrixWorld),O.uniformsGroups!==void 0){let re=O.uniformsGroups;for(let Fn=0,ui=re.length;Fn<ui;Fn++){let NA=re[Fn];it.update(NA,Ze),it.bind(NA,Ze)}}return Ze}function ih(C,T){C.ambientLightColor.needsUpdate=T,C.lightProbe.needsUpdate=T,C.sunLights.needsUpdate=T,C.sunLightShadows.needsUpdate=T,C.directionalLights.needsUpdate=T,C.directionalLightShadows.needsUpdate=T,C.pointLights.needsUpdate=T,C.pointLightShadows.needsUpdate=T,C.spotLights.needsUpdate=T,C.spotLightShadows.needsUpdate=T,C.rectAreaLights.needsUpdate=T,C.hemisphereLights.needsUpdate=T}function sh(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(C,T,W){let O=k.get(C);O.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),k.get(C.texture).__webglTexture=T,k.get(C.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:W,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,T){let W=k.get(C);W.__webglFramebuffer=T,W.__useDefaultFramebuffer=T===void 0},this.setRenderTarget=function(C,T=0,W=0){j=C,z=T,V=W;let O=null,H=!1,mt=!1;if(C){let pt=k.get(C);if(pt.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(R.FRAMEBUFFER,pt.__webglFramebuffer),J.copy(C.viewport),st.copy(C.scissor),nt=C.scissorTest,g.viewport(J),g.scissor(st),g.setScissorTest(nt),K=-1;return}else if(pt.__webglFramebuffer===void 0)X.setupRenderTarget(C);else if(pt.__hasExternalTextures)X.rebindTextures(C,k.get(C.texture).__webglTexture,k.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){let Ot=C.depthTexture;if(pt.__boundDepthTexture!==Ot){if(Ot!==null&&k.has(Ot)&&(C.width!==Ot.image.width||C.height!==Ot.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");X.setupDepthRenderbuffer(C)}}let _t=C.texture;(_t.isData3DTexture||_t.isDataArrayTexture||_t.isCompressedArrayTexture)&&(mt=!0);let yt=k.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(yt[T])?O=yt[T][W]:O=yt[T],H=!0):C.samples>0&&X.useMultisampledRTT(C)===!1?O=k.get(C).__webglMultisampledFramebuffer:Array.isArray(yt)?O=yt[W]:O=yt,J.copy(C.viewport),st.copy(C.scissor),nt=C.scissorTest}else J.copy(ut).multiplyScalar(Z).floor(),st.copy(Ut).multiplyScalar(Z).floor(),nt=ie;if(W!==0&&(O=G),g.bindFramebuffer(R.FRAMEBUFFER,O)&&g.drawBuffers(C,O),g.viewport(J),g.scissor(st),g.setScissorTest(nt),H){let pt=k.get(C.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+T,pt.__webglTexture,W)}else if(mt){let pt=T;for(let _t=0;_t<C.textures.length;_t++){let yt=k.get(C.textures[_t]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+_t,yt.__webglTexture,W,pt)}}else if(C!==null&&W!==0){let pt=k.get(C.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,pt.__webglTexture,W)}K=-1};function LA(C){let T=k.get(C);return(T.__readFormat!==C.format||T.__readType!==C.type)&&(T.__readFormat=C.format,T.__readType=C.type,T.__formatReadable=b.textureFormatReadable(C.format),T.__typeReadable=b.textureTypeReadable(C.type)),T}this.readRenderTargetPixels=function(C,T,W,O,H,mt,Ct,pt=0){if(!(C&&C.isWebGLRenderTarget)){Ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=k.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ct!==void 0&&(_t=_t[Ct]),_t){g.bindFramebuffer(R.FRAMEBUFFER,_t);try{let yt=C.textures[pt],Ot=yt.format,zt=yt.type;C.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+pt);let Mt=LA(yt);if(Mt.__formatReadable===!1){Ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Mt.__typeReadable===!1){Ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}T>=0&&T<=C.width-O&&W>=0&&W<=C.height-H&&R.readPixels(T,W,O,H,ht.convert(Ot),ht.convert(zt),mt)}finally{let yt=j!==null?k.get(j).__webglFramebuffer:null;g.bindFramebuffer(R.FRAMEBUFFER,yt)}}},this.readRenderTargetPixelsAsync=async function(C,T,W,O,H,mt,Ct,pt=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _t=k.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ct!==void 0&&(_t=_t[Ct]),_t)if(T>=0&&T<=C.width-O&&W>=0&&W<=C.height-H){g.bindFramebuffer(R.FRAMEBUFFER,_t);let yt=C.textures[pt],Ot=yt.format,zt=yt.type;C.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+pt);let Mt=LA(yt);if(Mt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Mt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let qt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,qt),R.bufferData(R.PIXEL_PACK_BUFFER,mt.byteLength,R.STREAM_READ),R.readPixels(T,W,O,H,ht.convert(Ot),ht.convert(zt),0),R.bindBuffer(R.PIXEL_PACK_BUFFER,null);let fe=j!==null?k.get(j).__webglFramebuffer:null;g.bindFramebuffer(R.FRAMEBUFFER,fe);let ae=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await qc(R,ae,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,qt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,mt),R.bindBuffer(R.PIXEL_PACK_BUFFER,null),R.deleteBuffer(qt),R.deleteSync(ae),mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,T=null,W=0){let O=Math.pow(2,-W),H=Math.floor(C.image.width*O),mt=Math.floor(C.image.height*O),Ct=T!==null?T.x:0,pt=T!==null?T.y:0;X.setTexture2D(C,0),R.copyTexSubImage2D(R.TEXTURE_2D,W,0,0,Ct,pt,H,mt),g.unbindTexture()},this.copyTextureToTexture=function(C,T,W=null,O=null,H=0,mt=0){let Ct,pt,_t,yt,Ot,zt,Mt,qt,fe,ae=C.isCompressedTexture?C.mipmaps[mt]:C.image;if(W!==null)Ct=W.max.x-W.min.x,pt=W.max.y-W.min.y,_t=W.isBox3?W.max.z-W.min.z:1,yt=W.min.x,Ot=W.min.y,zt=W.isBox3?W.min.z:0;else{let he=Math.pow(2,-H);Ct=Math.floor(ae.width*he),pt=Math.floor(ae.height*he),C.isDataArrayTexture?_t=ae.depth:C.isData3DTexture?_t=Math.floor(ae.depth*he):_t=1,yt=0,Ot=0,zt=0}O!==null?(Mt=O.x,qt=O.y,fe=O.z):(Mt=0,qt=0,fe=0);let ne=ht.convert(T.format),Se=ht.convert(T.type),wt;T.isData3DTexture?(X.setTexture3D(T,0),wt=R.TEXTURE_3D):T.isDataArrayTexture||T.isCompressedArrayTexture?(X.setTexture2DArray(T,0),wt=R.TEXTURE_2D_ARRAY):(X.setTexture2D(T,0),wt=R.TEXTURE_2D),g.activeTexture(R.TEXTURE0),g.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,T.flipY),g.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),g.pixelStorei(R.UNPACK_ALIGNMENT,T.unpackAlignment);let Fe=g.getParameter(R.UNPACK_ROW_LENGTH),Jt=g.getParameter(R.UNPACK_IMAGE_HEIGHT),Ze=g.getParameter(R.UNPACK_SKIP_PIXELS),dn=g.getParameter(R.UNPACK_SKIP_ROWS),Tn=g.getParameter(R.UNPACK_SKIP_IMAGES);g.pixelStorei(R.UNPACK_ROW_LENGTH,ae.width),g.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ae.height),g.pixelStorei(R.UNPACK_SKIP_PIXELS,yt),g.pixelStorei(R.UNPACK_SKIP_ROWS,Ot),g.pixelStorei(R.UNPACK_SKIP_IMAGES,zt);let hi=C.isDataArrayTexture||C.isData3DTexture,ee=T.isDataArrayTexture||T.isData3DTexture;if(C.isDepthTexture){let he=k.get(C),Qn=k.get(T),re=k.get(he.__renderTarget),Fn=k.get(Qn.__renderTarget);g.bindFramebuffer(R.READ_FRAMEBUFFER,re.__webglFramebuffer),g.bindFramebuffer(R.DRAW_FRAMEBUFFER,Fn.__webglFramebuffer);for(let ui=0;ui<_t;ui++)hi&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,k.get(C).__webglTexture,H,zt+ui),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,k.get(T).__webglTexture,mt,fe+ui)),R.blitFramebuffer(yt,Ot,Ct,pt,Mt,qt,Ct,pt,R.DEPTH_BUFFER_BIT,R.NEAREST);g.bindFramebuffer(R.READ_FRAMEBUFFER,null),g.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(H!==0||C.isRenderTargetTexture||k.has(C)){let he=k.get(C),Qn=k.get(T);g.bindFramebuffer(R.READ_FRAMEBUFFER,I),g.bindFramebuffer(R.DRAW_FRAMEBUFFER,U);for(let re=0;re<_t;re++)hi?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,he.__webglTexture,H,zt+re):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,he.__webglTexture,H),ee?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Qn.__webglTexture,mt,fe+re):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Qn.__webglTexture,mt),H!==0?R.blitFramebuffer(yt,Ot,Ct,pt,Mt,qt,Ct,pt,R.COLOR_BUFFER_BIT,R.NEAREST):ee?R.copyTexSubImage3D(wt,mt,Mt,qt,fe+re,yt,Ot,Ct,pt):R.copyTexSubImage2D(wt,mt,Mt,qt,yt,Ot,Ct,pt);g.bindFramebuffer(R.READ_FRAMEBUFFER,null),g.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else ee?C.isDataTexture||C.isData3DTexture?R.texSubImage3D(wt,mt,Mt,qt,fe,Ct,pt,_t,ne,Se,ae.data):T.isCompressedArrayTexture?R.compressedTexSubImage3D(wt,mt,Mt,qt,fe,Ct,pt,_t,ne,ae.data):R.texSubImage3D(wt,mt,Mt,qt,fe,Ct,pt,_t,ne,Se,ae):C.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,mt,Mt,qt,Ct,pt,ne,Se,ae.data):C.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,mt,Mt,qt,ae.width,ae.height,ne,ae.data):R.texSubImage2D(R.TEXTURE_2D,mt,Mt,qt,Ct,pt,ne,Se,ae);g.pixelStorei(R.UNPACK_ROW_LENGTH,Fe),g.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Jt),g.pixelStorei(R.UNPACK_SKIP_PIXELS,Ze),g.pixelStorei(R.UNPACK_SKIP_ROWS,dn),g.pixelStorei(R.UNPACK_SKIP_IMAGES,Tn),mt===0&&T.generateMipmaps&&R.generateMipmap(wt),g.unbindTexture()},this.initRenderTarget=function(C){k.get(C).__webglFramebuffer===void 0&&X.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?X.setTextureCube(C,0):C.isData3DTexture?X.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?X.setTexture2DArray(C,0):X.setTexture2D(C,0),g.unbindTexture()},this.resetState=function(){z=0,V=0,j=null,g.reset(),Bt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Yt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Yt._getUnpackColorSpace()}};function Tl(i,t,e){let n=new P;return{add(s,r){let o=document.createElement("span");return o.className=`al-lab ${s}`,o.innerHTML=r,i.appendChild(o),o},place(s,r,o=0){n.copy(r).project(e);let a=t.clientWidth,c=t.clientHeight,A=n.z>1||Math.abs(n.x)>1.1||Math.abs(n.y)>1.1;s.style.opacity=A?0:1;let u=s.offsetWidth/2+6,d=Math.min(a-u,Math.max(u,(n.x*.5+.5)*a));s.style.transform=`translate(${d}px, ${(-n.y*.5+.5)*c+o}px) translate(-50%, -50%)`}}}function Ql(i,t,e={}){let n=()=>{let s=document.querySelector(i);if(!s)return;let r=null,o=!1,a=()=>(o||(o=!0,r=t(s)),r),c=new IntersectionObserver(A=>{A[0].isIntersecting&&(c.disconnect(),a())},{rootMargin:"600px"});c.observe(s);for(let[A,u]of Object.entries(e))document.querySelectorAll(`[data-lab-${A}]`).forEach(d=>d.addEventListener("click",l=>{let f=a();if(!f)return;l.preventDefault(),s.scrollIntoView({behavior:"smooth",block:"center"});let m=d.getAttribute(`data-lab-${A}`),_=()=>f.ready()?u(f,m):setTimeout(_,150);_()}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n):n()}var Fl={meta:{source:"\u5167\u653F\u90E8 2026\u5E74\u7248\u5168\u81FA\u706320\u516C\u5C3A\u7DB2\u683C\u6578\u503C\u5730\u5F62\u6A21\u578BDTM\u8CC7\u6599\uFF08DEMg_tawiwan_20m_20260228_g14_update\uFF09",dataset:"https://data.gov.tw/dataset/178729",license:"\u653F\u5E9C\u8CC7\u6599\u958B\u653E\u6388\u6B0A\u689D\u6B3E\uFF0D\u7B2C1\u7248 Open Government Data License, version 1.0 (https://data.gov.tw/license)",attribution:"\u5167\u653F\u90E8 2026\u5E74\u7248\u5168\u81FA\u706320\u516C\u5C3A\u7DB2\u683C\u6578\u503C\u5730\u5F62\u6A21\u578BDTM\u8CC7\u6599 \u6B64\u958B\u653E\u8CC7\u6599\u4F9D\u653F\u5E9C\u8CC7\u6599\u958B\u653E\u6388\u6B0A\u689D\u6B3E (Open Government Data License) \u9032\u884C\u516C\u773E\u91CB\u51FA\uFF0C\u4F7F\u7528\u8005\u65BC\u9075\u5B88\u672C\u689D\u6B3E\u5404\u9805\u898F\u5B9A\u4E4B\u524D\u63D0\u4E0B\uFF0C\u5F97\u5229\u7528\u4E4B\u3002\u653F\u5E9C\u8CC7\u6599\u958B\u653E\u6388\u6B0A\u689D\u6B3E\uFF1Ahttps://data.gov.tw/license",changes:"Averaged 50 \xD7 50 cells (20 m) into 1 km cells; cells with less than half valid data are treated as sea; a small area with no data in the northern mountains was filled by averaging the squares around it.",filled:141,crs:"TWD97 / TM2 (EPSG:3826), km",cell:1,e0:150.98,n0:2422.16,nx:200,ny:377},h:"/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xEAFwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8oAC0A////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////GwD//////////////////////////zMAUQD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8eACsA////////////////////////LwBiAEEA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////x4ANwAzAB0A////////////////LAAhAFIATAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8vAFoAOgAWAP///////xIADQAWADgAdgBwADAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////KQBhADUAKAAOAP//NgAoAEYAdQCSALsAZgAmAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ysAWgAlAB8AHgA7AIcAgABcAKoA6ADtAIAANAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yoAGgATABQAUACzAJQAlQCJALIAAAGiACoA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////JAAwABIAEAAXAHUAzACMAL4AWQCGAHAARAAWAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0gALwASABAAHACQALkAdQBPADQAUAASABoAJwBRADIA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////QwBOACkADwATAB0AUABaAGoAVQArAB0AFgBMAJUAEgGKAIYA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9NAH4AQwAZAA4AEwAiAFUAsQCdAFUALgA3ACQALwA8AM8AMwHRAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2QAEwErAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////cgBmADIAEAAPABYAQADCAGUBKgGmAHcAYwBgAE0AJgBPAKoAsQBuAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////iAAtAQgBuQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////3wASgAgAAoADwAbAD0AvgBaAbQBdQHsAM0AdwA9ADIAcAD9APoA1QBUAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0UAMABAAMkAmgBWAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8iACMAGwAIAAwAIQBZAHIAugCNATUC4AHrAFoAOgBBAIwAKAE3AeoAhgBDAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////QgABAbkAugBYAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8XABcACAANACAAhgAEAcwAdgEEAo8B3ABtAE8AoAB6ANUAMwH0AG4A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////81APAAeQFNASQBLQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////CwAFAAcAEwAzAFMA2QAFAQkBLQHiAJIAbACdACYB8QAOAfcAmwCDAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////rwANAaUBGgF5AP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAAHAC4AagBVAJcAmQCcAN4A3QCKAF8AwACTAWEBOwHaAOkAhQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0IBhgFnAR0BnQAsAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wUACgAUAE8AagCFAHkAmwARAYsB9AB4AJAANgGOAS0B8wArAYIA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VgDjAPQAqgDYACIBVwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwAEABcAMQApAGEAzgCbAJ0AFwEFAm8BsgCVAMUANgFTASsBIQFsAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////00A//8LABkARwBCADMA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAA6AM8AaQBMAF4AfwABARIBpgGeAdkAoQAKAcEAHQFFARUBcQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////SQADAZMAQAA6AJ8ADAFZAbgBWgENAbYAzQBxAIcA9QDjALAAOwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8bAJgAMQG7AMgAdQDxACoB3wDyADcBVgH/AO8AsQCCAEEALQAbAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////IADmANEB8wCuAIkAewCsAJUAEAF0ATEBKgEuAXgAXwBjAD4A/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0AASwFnAlIBqwDFAGsAbgCzABIBfAFuAXkBMgGgAMYAUQAcAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////LgCGADkBRgICAv0AVAERAZUAvwDgAIcBsQGaAQ0BCQH1AHcATQBRAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////1AA5gB9AY4CuAIyAXMBNAGpAEMBNQEIAS4BaQGGAWUBJgFnAGAAdAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////94AEkBogGzAsMCgwFOAREByABrAc0BpgFGAZIBwQFAAc4AoAB2ADcA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////lABhAUUCbAOsAsIB4gFbAcQAIQFwAbMBhwE7AZ8BewEUAdoAgQA2AP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9IAAgB1AFwAlEDpwJJAj4CugFFAf8AfwEAAt4BUAFRAWMBGQHbAKUAWQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////LQCwALsBdwL9AhICGQK+AgECmQGgATgBzwEbArgBXAEuAfAAhABQAEcA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////x8AhgDyAGkBQgJxAWYBEAIPAkgCMAKGAZcBugGmAZ4BOQHbAGgAKQAqAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////CAAYAD0AfADHABkB4ADRAF4BfgFFAkMCJAIcAucBtAGPATkBDwGUAGcAUQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////NgAgAEUARQBsAIMAgQCnACABLAFTAeIB6wEvAuoBuAFlAUoBEgGyAJAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9kAJsATACyALYAegBKASMB+wChANoA0QDvADwBWQFtAYgBUwFdAVoB1QBIAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////TwDWALYACQFcAdUA2QCIAdYBGwFkAXsBKwHSAVYBSAFoAWgBcgFNAdYAmwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9SAHEAhAC3APcAwQGqAR4BqAFYAr4BUQHlATUB5QHPAX0BVAFmAYsBNgHoAO8AewD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xUAsQBeAUEB+AAzAbcBhgGQAQoChQK6AcIBVQLrAbUBlQG0AaQBeQFdAQkBmgBqAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BgAwAGoAIAEjAVwBbwEXAUQBBAK9Ar8CowKeAuYC0wJaAuYB4gGIAQ4BxQCQAIUAcAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wwALABCAEwAagCEAIYA3gCxAUECyAFVAnMCMQKqAsMCpAI4AoQB9QBhARMBjABLAC8A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////93AAUB2gBuAK4A6QCSALwA4gANASsBpwGQAcIBAAKAAvgBrwFIAdgAwwC/AOEAtQBnAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xAA5AX0B5wCxAIkB3QCgAEIBzwGEAa4BpwGlAfABlAIuAkwByQAVAcYAZAB0AJgAQAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9EAHMA0gAXAVwB6wCIASQCvQHiAMoBWQI2AmsC6AKaAuMBagEeAaQAagB2AEgALgA7ABcA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////KgCmAB0BTQEQAvMBxAH9AhQCRwEZAYMCrQLYAiYDPAJ9AS0BIAECASwB5gCMAJoAcgAuAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xoAhQAIAVIBvgGcAnAC2AIVAykCNAGeAYMCBAOXA/EC+QEHAlMBmwFrAdsAwQDvAIQAIwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////HgB9AIYApQBUAYoBYQJWA6EDJwM1AoMBXgEQAkUC0QIbA+cCQwL3ASoCzwFUAV0B3wCUAGAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8cAP////////////////////////////////////////////////////////////////////8IADcAAAHcAAQB9ABwASEC/AKgA9ICpAIYAsEBcgJrAlkCVwOTAtYBhwHZAb0BEgHxAOsAxABbAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////MAAQAP///////////////////////////////////////////////////////////////wYAEABRAFcBgQGpAeABAAKbAmEDZgTYA1ADKwKcApwDzwO9AhgDFAKWATYBVgGLAUkBpgBwAD0ARwD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xsAMAAoAP//////////////////////////////////////////////////////////BQALAB0AjgC/ANEA8ABIAYABSgLvAkYEwgNKA24C7QK7AzME4AOfA+8CHgL8AUUB8gDyAAkBzAA7ABwAGgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ygAEQD//////////////////////////////////////////////////////////wgAEAAYADQAVwA6AZYBPwKwArcCOQNpBKAE7AMdA1ADtwT9A3sD9wK2AjQCQAIJAqEBCwGXAMcAmgAxACkA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAAJABMAMAB3AIQAsQEiAvEBLQM+BKsEIwRMBMcEZgSdBJ8EfwP9AvUBPAIEAkUBCQEFAUIBqgBYAEYASQAnAAwA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAQACQAXAD4A4ACkALMANgFqAYkCZQMYBBkDygO1BMkEPgQiA18CSgLbAWUBVgFxAeMBbAGvADkBywDdABUBzgCAAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIABQAHAAwAGAB/AC0BJgGaAPYAAwL5AdkCIgOCApwDcQPwA6UEdAMRA0ICRwLPAmoCBQJ0AfYAJwGlAWMBFAHBAHUAPgD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgAFAAkADgARAB4AYwCPABcB+QDzAIMBTgHoAeMBpAKfAiMDagRuBVwEFwMBA+YD8QK/AeABaQF7AeMBswFiAS4BTgHTALcA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQADAAYACgAOABUAGQAbACkAcAD0ADwBAgEeAdMBwQGTATQCDwI8A04EaQXEBPUDLwR1A3EC4wJWAqYBZQI3AlcCMgIvAgAClwG3AbAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAIABQAKAA8AFgAdACMAJQA5AJUAawGnAeoBuwESA7EC7QGwAhUDwwN3BOYFeAVEBfgEegQWBHYDvgJHAs8CvgKOAmUCZgK1ATUBSAHKAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAAAAgADAAYADAATABwAJgAvAEMASQCxAH8B5QF6AvACiwNqAwADqgPGA7wDZgSkBGEEsgQnBZcFHgUqBKQDWQP8AgsDywKgAp0CLwKjAScBpQBUAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAQABAAEABQAJAA4AFgAfACoANQBBAF0AnQD/AHoB/gHDAtgD6QIVAkICMwImAr8CSgM7BNUEaQUvBfkDngM0A6YDAwNeAmoCMgI9ApMCxgJZAr4B6gD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAQABAAEAAgADAAYACgAQABgAIQArADYAQABHAFwAfgA/AREB3QFrAqABgQG3AY0BdgJ2AoQCCAPWAxoFNgUpBKwCHALTAu4C3wFrAfcBUwErApACjQIeAj8BXwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAEAAAABAAEAAQABAAMABAAGAAoADwAWAB8AKQAyAEIAeACbANEAywDIAOYANgE7AfgB1QL3AjMEsgToA60DngTPBPIDEQOdAt8BiQG+AW0BJAHYAAMB3gGnAXMBHgFIAaIA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQAAAAEAAQABAAEAAgAEAAUACAALAA4AFAAcACQAKgA3AHEA0QChAbsBewHGAYMBIAFSAYMBIALcA6kFIgW7BA4FFwVuBCIDNwLaAVYBiQGYASoCVQHGAKwAygDdAOkAoQCDAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgABAAEAAQACAAMAAgACAAIABQAGAAgACQAMABEAFwAdACEAMQCoAHYBogHeAdkBDwM2AvsBnwJBApoBCgO9BGgFmwR6A/wCqQKmAr4CtALMAQMCAgPgAtYBfAFsARcBzABLADcALQAkAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAQACAAIAAQACAAIAAwAEAAUABwAKAAwADwASABcAGwAfADUAnwAPAfwBpgIhAlcDwQKwAukDqgLUAc8C9APABOEDjgOyAwYECwTkAwED5QKzApcDZQN9AlQCXQLlAS4BuAD3AAgBwgD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgACAAAAAQACAAEAAQABAAEAAgACAAMABQAHAAkADAAPABEAFgAbACEAJgA4AHkAGAHYAfICGQOpA1YEuwN5BPYCkwKJAnQEqAWHBHYEIgXWBCEF2wQbBP8DJAP6AwEEJQMwAsQBYAEBAS4BxgFxAeoA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8DAAMAAwAAAAEAAgABAAIAAgACAAMAAwAFAAYACAALAA0AEAAUABoAHwAnAC0AOAB6AP8AFALdAZ0CqgPUBCIFdgSsAxkEFQOlA6UEWAUkBQ8GKwaxBroFRgTiAlUCawJlA74DCAPuAn8CjAF8AXcC9gESAf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQAAwADAAQAAQADAAMAAgACAAIAAgADAAQABQAHAAkACwAPABIAFwAeACUAKwAyADoAhwA4AU4BlQE7AwIEfwTZBFYFHAVwBIMDTQS6BOAF8AV8BoYGqAZJBWgE/AJSApwBiAI3A2AC+wInA2QC8AHsAuYBUwGWAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wgABQAEAAUABAADAAEABAADAAMAAgACAAMAAwAFAAUABwAKAAwADwATABkAIQAqADIAOQA+AFwAogAwAZcCXwMaA7MChwOMBVEFHAWxBMUFiQbKBhAG5QWdBVMFuwS8A+ECOgKmAXkBuAGjAaYB0AE3Ar0CWwJeAg4CsAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BwASABYACgAFAAUAAwABAAQABAAEAAMAAwADAAQABQAHAAkACwAOABEAFQAbACMALAA2AEAASQBXAKkAOwE5AmUCjALwAUYDuwOYA+MDWwQeBS4HDwaeBbYGkwYLBgAFCgSTA6MCpQFXAQoB6wDyAOAACAEaAVYB3QH4ASYB//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8EAAMA//8FAAcACQAvAFMAEwAGAAQAAwAEAAYABQAEAAMAAwAEAAUABgAIAAsADgASABYAGwAjACsANQBAAEoAVgBtAIwAsQAeAToBFwG/AbQB1QGGAj8DaAUVB98FWARMBR4F3gM8A1ACFQLaAW4BPwKpAYcBogG7ARkBCwGFAHgAwwBiABwA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQABAAEAAQAAwAEAAYAEABbADIACQAGAAUAAwAHAAYABQAEAAQABAAFAAYACAALAA0AEAAUABoAIQApADIAPABFAG0A+gBhAQcB0ABZAaQBQAESAskChwTEA8MFjAdeBkYEhQOJA4wDzQJ7AzkDGwJTAhkDZQIiAsYCZwJhAk8CgQGmAIkAXgA6AP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQABAABAAEABAAFAAcAHQAwABQABwAHAAUABQAHAAYABQAGAAYABQAHAAgACgAMAA8AEwAYAB4AJgAtADQAOgB0AAYB2QEAAYUBxgIyA44C2AK6BCEGLQXQBqsGrQW0BMIDFQWYBSsFAgWXAwkDswLFAz0DNwMyA9wCKgNKA70CqgEHAkUBpgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAEAAQACAAUABgAJABwAPwApAAwACAAIAAQACgAJAAgABwAHAAcABgAIAAoADAAPABMAFgAcACEAJwAsADAAQQCDACwB0gDXAQEDtQKsAqUDCAX9BcEG4gcFBz8HvgW+BDkGQQcqBv0ECAQyA4YDVwQEBJoD/wJHAmQCaQOAAjgCqAJ/AVEBkAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgACAAMABAAGAAcADAAwAEkAGAALAAgACQAGAAgACwAKAAkACAAHAAcACAAJAAsADgAQABQAGAAcACEAJAAmADAAlABvAf8AJgFYAUsBxQFBAiwDNgQDBnYI+QgSCIwGVwaFBh8GXgS8A/gD1QLUAj8DcwPqAkcC4AFAAjMDDAMqA3ECTgJPAtIA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAEAAwAEAAUABwAIAA8AKwBDACUADAAJAAoABwAIAAoACgALAAkACAAJAAoACgALAAoADgASABYAGAAdAB0AIAAyAJQAJQF9AV4BPwF8Ac0CiQMzBGIFBQeRCRoKWQjGBpgFnwTLBLkDeAJaAgwClwEWAuIBawGKAX0BsgEuAoQCJgMiAwYDgwI5ATgA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAAgADAAMABQAGAAgACQAOACUAIQAeAAsACgAKAAgACQALAAsADQAMAAoACgALAAsADAAMAAwAEAATABYAGQAZAB8AKwBQACABCgIWAogBZQGvAf0C6wR/BVYGZQiQCcIHHgZ0BKUD1wKVAvgB0wKmAocBiQFjAXUBKQH5AOAAQAHkAdgCAwKYAvUBtAF+AAgA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAIAAgADAAYABwAIAAoAFgAUABIAEAALAAsACwAIAAsACwAMAA4ADgAMAAsACwAMAA0ADgAPAA8AEQAUABYAGQAdAC0AjQAXAXkCqQI4Am4C+wEFA6EDAwTCBXwIVQhkBo4F9wT3A5UC+wFKAnYD0ALcAU4CJwKnAuEBAAI8AQQBEQENASIBIwHOAK0AfgAWAAgA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAgACAAMABQAHAAgACQALAB0AKAAeAA8ADAAMAA0ACQAMAAwADQAOAA8ADQANAAwADgAOAA8AEQASABIAFwAZABwAIQA0ANUAJwI0A3ADWgNgA2ACHwKiAmcDogRxBrIIVQjcBqsFUgTdAoACUAOxAu8BYgLJAuICbwPAAnQCnwHCAUICXQEYAaUAdgBvADUAFwAKAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwABAAEAAwAEAAYACAAKAAoADAAlADAAGwANAA0ADQANAAoADQANAA4ADwAQAA4ADgAOABAAEAARABMAFQAUABYAGwAfACUARQAPAS8CTQKYAoUCJQOsAxMDLwM9BKUEQgbeCUYJawftBb4EJwO5Ak8DzQJtApQCpwMVA90DvAOEAk8CCwI5A6sCfwKJASkBUQFDAWEAEQD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8EAAAAAQACAAMABQAGAAgACgALAAwAFgAbABAADgAOAA4ADQALAA4ADgAQABAAEQAPAA8AEAARABMAEwAVABgAGAAYABwAIgApADQAsQAQAUEBiAFUAUYCvQNWBNwDswVmBgIIcQqmCdAHuQZIBa8D5QJuBDYEtgK9AtADkAOeBCwEvAIxA5UCWQMRBB4DhgKEAVYCkwHeACYA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////DAAJAAEAAgADAAUABgAIAAoADAAMAA8AEQAPAA4ADwAPAA4ACwAPAA8AEAASABIAEgAQABEAEwAUABYAGAAaABsAHQAdACIAKgAyAFIAfADQACYBDAKdAt0DggWLBXQGwAWAB8AJ5wpRCVMHXQWcA0YD9AQuBOYCawPbA1QEDAWVBIYDDgR3A6QDjgQKBKkCAgLwAgICDQFOAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////1gAUAAEAAIAAwAFAAYACQAKAAwADgAOAA4ADwAQABAAEAAOAAwAEQAQABEAEwATABQAEgATABMAFQAYABoAHQAgACEAIwAmACsAQgCSANcALAH7AVgD/QNEBbsFSwVdBbME3wVGCIMKpgjQBj8FzAOFA/UE6gSWA+ADCwXrBBsFIwR8A/ECeQMNBMUEWwSgA6gCFwP9ARcBgABjAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////YADyAEgAAgADAAQABQAHAAkACgAOABEADwAOABAAEQASABMADwAMABIAEQASABUAFgAVABQAFgAXABcAGQAcAB8AIwAmACcAQgBIADwA6wBcAfgAVwH6ArMD2gQPBQgE0gNiBHcGkQhGCG8ILgedBZIELwR8BVgFIATbBBgFZgR9BFYDcwNXAvcCIQPZAwcEXgRtA0EDAgIPARcBsQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////5AA8gAVAAMABAAEAAYABwAJAAwAFAATAA0AEgAVABYAFwAXABAADgASABIAEgAUABcAGAAXABcAGgAaABsAHgAiACYAKgAsAD4AZQBBAM0ADAK9Ac8BBAIgAw0FjgTQAy4D9gRrBvIGugVcBoEHVwb5BboFcgXRBIkEkQSqBJkDRANBAhMCwAG4AT4CjwIGAzQEmANbAzsCwwGwAQQB//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+CAH0AFgAFAAUABgAGAAcACgAWABIAEAAQABsAIgAoACIAHQARABEAEwATABQAFQAXABkAGwAaABsAHQAeACEAJgAqAC4AMgA5AGMAYACtAAEC3AIhAz4DjAQFBVgEMQORAmEEKgU3Bt8EjwRjBzgI1Qa6BfUEswSBBA4E3AN7A1YEeQMkA6oCwQEsAt0BNwJpA5oCZQMNA7oCUQI5AU4A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9VADUADQAHAAcABwAJABQAHgAUABEAHQAwAD4APgAsACIAEgASABUAFAAVABgAGAAZABsAHQAeAB8AIgAlACkALgAzADcAPABYAH8AmQCrAZMC5QNZBLEDOQPSAwQD7QFhA3IDYwRmA1IEBQcACAEHgwa8BZoF2wXPBPsDNgSVBVkFBwSbAkwC1wLQAysCWAHkAYsCcwLYAkACdQHqAEcA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BQAMAAsACwAJAAgACQALAA0ADwAWACEAOwBfAEkAPQAvABsAEgAVABYAFwAZABoAGwAcAB8AIgAkACUAKQAtADIANwA9AEIAWACCAHcAEgFnAsQCxwMNAxIC4QJmArIBvAI1AkICugIVBFUGrAgBCAAH7QV1BrUFrQSfBEQFOgYpBs8EqAOcA7cC8wPtAyACngEqAQoB6QFNAtQBngHIAAsABwD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEABAAPAAwACwALAAsADAANAA8AFgAmADYAXwBmAEMALwAcABEAFQAWABgAGgAcAB0AHgAgACMAJwAqAC0AMQA2ADsAQQBHAE0AawBkAOMAwAFiAuACOALuAYYBPAFpAeEBFAIJA28EiwVoB4gJqwgfBy0HjgZwBZkFvgRKBbsFSgYaBSoELANkA4cEGwT0AmMCOwJmAcQARQETAXUBDwEoAA4ABwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAMADgARACQAIgANAA0ADQASABgAHgArAFgAZgBFAC8AKAAWABMAFwAYABoAHAAfACAAIQAkACgALAAxADUAOgA/AEUASwBSAFkAZQCmAHUBjQLlASABJQFTAeMBSgJvA0cDwAPZBbQG+QiECUEIGAcIB+MGyAY8Bv0EzQURBkoGKAUjBA4ETAQmBYcFIQQcA/oCjQEQAbsAlABLAEgALgAUAAwABgD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQACAAkAEwASADkAEAANAA8AFQAdACIAKgBFAF8AVwBDADIAGQAVABUAGAAaABwAHgAgACMAJQApAC0AMQA3AD0AQgBIAE8AVgBdAGQAkADjAAoB4wAyAU4CiwIXA+wDuQTdBI4F8AZTB3oHwwe4B4gGyQXsBX4GPQbbBewFtwa3BmAGVQUOBYsExQSnBbQE6AOZAlsC4gEaAn4BxABHACwAHwASAA0ACQAGAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAwAEAA4AEAAOAAwADQARABcAHwAxADUAOgByAGMAWABEAB0AGAAVABgAGwAdAB4AIAAiACUAKQAuADIAOAA+AEQASwBRAFgAXwBmAH8AvQC7ACUBggG5A7sDkARtBSMGfQa/BpgFFQYgBmIF9gY1BgEFYwUKBrgG7QaaBiYHiwczB10GgQUwBJwDoARCBLkDuQN8AwkD8gJXAg8BlgBEACoAHQAYABQADgAKAAYA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgACAAMABAAJABIADwAMAA4AEAAUABwATABTAEEAbgB/AGkAQAApABkAFQAaABsAHQAfACAAIgAmACoALgAyADgAPgBEAEoAUQBXAFwAdADAACIBwAEYARACaQOiBKwElQSFBisHDQZ8BNEEqAU7BAEFGgWQBEIF+QWkBlYG4QbJBxMI1AfEBuwE1QPmAjQDpwJMAg4DuAPnAwIEmgIbAmcBlgA+ACwAJgAfABgAEQAMAAcABQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMAAgADAAQACQATAA8ADgARABEAFAAbADYAawBWAHcAYgBVAFoAOAAaABYAGgAeACAAIAAhACMAJgAqAC0AMgA3ADwAQgBIAE8AUQBiAHcA+wCNAWMChAEXAdUBvwNvAywDAAU4BQ4FlgOLAyMEYgOUA7cDCgXTBdUFnwUuBu0GdQcZCBMIUAc1BacDJgPAAhADsAI+AgsCugJnA0gDEgMZAgsBUgA8ADQAKgAgABkAEwANAAkA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////CQAHAAMAAgACAAYADwARABAAEAASABUAGwAlAD8AWQBXAIMAgABwAEIAGwAYABwAHwAhACIAIgAkACYAKgAuADIANwA8AEEARgBKAE4AbABzAPoAZwJrA90CmwGCAQYCEAIuAoYD1QNsA4kCJgJFAkoC0gIYBP4FggWJBPwEdAVeBiQHBAg/CLcHIQYwBZ4E6AMbA6QDxAOsAp4BwgFAAjwDigKnAb8ASgA/ADMAKQAgABoAEwAOAAgABQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////w4ACgAGAAMABAAEAAcADwANAA8AEgAXAB0AIgApADUATgCMAKoAgwBSACEAGwAdAB4AIgAkACQAJQAnACoALQAxADUAOgA/AEQARABJAFAAWgAYAdIBZALTAk4CiwFzAXUBzwGaAvQCHgLXAUkCJQNbA6QCKgN0BP8ETgR8BS8GMgbLBkYHqAd1B8oGBQVPBBsEXQPnA2wE7QLoARICTwH+ASgChAGgAFUASgA9ADEAJwAfABgAEQAPAAkABgD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAAOAA0ABwADAAQABQAGAAkACwAQABEAFgAaACMAKAA6AFQAggCdAH4AVAAhAB0AHgAgACIAJAAlACUAKAAqAC0AMAA0ADgAPAA+AEEARwBOAFQA1gDLANwAagHAAmYDngIJAm0BkAHAAeEBTwI0AwgEygSkAxADVgPJA1oEJAV9BfMFagaGB8UHIgcDB/4F0wTaAxsEyQTPBCUDUQMQA5QBSAENAacAcABfAFMAQwA2ACsAIwAbABQAEgAOAAkABAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEACQAWAAcABAAFAAYABwAIAAoAFAAWABcAHAAkAC0AMABFAFsAswCbAGUAJwAeAB8AIQAjACQAJgAmACkAKwAtADAAMwA1ADgAPQBCAEkAUQBZAHQAEwE4AVgBAQL7Ax4D5QEkAlUCKwLhApUDDgR2BQQFxQP8AiUEBQWNBR8GhAbiBh0HtgcoCB0IqwezBfcEtQRABYYG+AVcBHUDOQKyASUBvgDeAIsAaABUAEUAOQAuACUAHQAYABUAEQALAAUA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAMACQAIAAUABAAFAAYACAAKABEAGAAfACoAMQA+AEIARgBGAHEAggBeADMAGgAfACIAIwAlACcAKQArACwALgAvADEANQA4ADwAQwBJAFIAdwAXASMCPwK7AbYBTAPdAmkCeQM1A3kDDQTVBCcF3AXjBDIERwOTA+oDdQWhBs4GIAYBBiEHVAjuCCYIrQb6BdIFJAaLBukF7ASvA9MC6wK7ARYBywE2AaQAWwBKAD4AMQAoACEAHQAZABIADwAKAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQADAAYACQAIAAcABgAHAAkADQATABwAJAAuAEYAbACJAHMASwBUAKUAjABTABwAGwAbAB8AJAAnACkAKQAqAC4AMgA0ADcAOgA8AEEARgBSAIYAJgGjAnMCZgFtAvkCMAP+AigE2gNNBBAFFAa2BvAFXQVeBNQDiASxAxMF6gWFBTsFdAV7BrgH8wd7B6EHGweEBjoHbAY+BXMEHATBA8gCdAF8AYoCCAIqAXEAYABMADsAMgAoACMAGwAZACkAEAALAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAwAGAAkACQAIAAYABwALAA8AFQAeACcALgA1AEAAcQCRAJQAbwB5AIEATgAqACEAIgAhACAAIQAjACYALAAxADMANwA6AD4AQABDAEYAUgBwAIIBtwKTAWIBcwGYAXECMQPFA8EEEgVyBnYH7Ab0BcYEJgSaBD4FEARoBN8EhQVZBlcG3QYiCOMHUAaJBgIHkgdfBwMGGwWkA4sCNwL2AZcBogK0AtoB7QCJAHAAVQBPAIUAOQAoACEAZwB1ADYAHwAeAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAAQACAAUACwALAAgABwAGAAcACgAQABgAHAAlACoAMgA7AFsAZgDHAM4AcwCGAIsANgAhACMAJAAmACcAJwAnACoAMAA3ADsAPwBCAEUASABMAFwAiAAVAaICIAJ/ARkC7gH4AXkD6AQeBeMF8wbrB8sGBwZABc0EhQU/BSoEaQU3BtQGcQe8B8UHvQg/CKAGhQVzBjIH3AZxB6wG3wT8AjgCnQLJAmADYQJ3AcoAmgB5AGcAmwD4AFwALgBEAKYAkgBYAEAAKAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAwABAAIAAQAGAAsACwAKAAcABQAFAAgAFQBsAC4AKAAxAD8ASgBVAF8AjgAQAb4AeQCWAEcAIQAjACUAJgAoACsALgAtAC0ANgA/AEMASABMAE4AUQBaAIMAAwFWAqwCtgK/AsYBswKNA9gEwwUXB1oH2QfpBuEF7gUnBjQGRgV4BLUFPAdlB7gHEAh0CEAIBAjmBhwFfAXZBUMGbQb/Bj8FhgN4A2UDygP1AuIBZgE/ASQBgQCWAOYA+QBjACwAdADNAIUAiABNACAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAMACAALAAsACgAHAAUABQAJABMAVABWACwALgA1ADkASgBaAGYApwAjAX4AWQA+ACMAJAAmACcAKQArADAANAAzADUAQABJAE0AUQBVAFgAXQCLANEAUQHrAq4DKgMTAiQCLgMEBZ4GzQeICCUHXQbhBoQHggcVBk8FuAQ5BngHRgjSB/QGPAepB0gHiQa/BMkEAQYCBrYFZwYvBm0E+AOuBK4DfwIRAmoCLALLAdAAoQAIAdUAbwA7AHQA1wCIAE0ANAARAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAQAFAAsADgAMAAoACAAFAAUABwAPACEANQA1AC0ANwA+AEMARABPAH8ACgHqAG8AUQAjACQAJQAnACkALAAxADcAOwA8AEAATQBSAFcAXABfAGEAmQA2AUwB6QGbA90DkAJCArID2ATjBJIGwgdHB20HdgiHCIkHYAZcBSMFrgVyBtUHHgjDBjEG8wYMB7YGiQRoBBMFvQR0BSIFOAa0Bc4EUgUMBPMDAANAAyoCVgHWAK0A+ADaALAAQQCOAP4AkgBtAEgA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAAAAAABgANABAADQALAAkABQAFAAYADAAdAKAAdwAtAC8ANQA6AEIATQBYAIoA+gC3AE4AJQAkACUAJwApAC0AMgA4AD8ARQBHAE0AVgBdAGIAZgBoAJgAGAEZAkoCQAPpA4cCbwKyAl0DDgT2BToGDQcMCAMIhgj0B9sG4QX3BQgGIgf8BxwIDgemBQUG0wVyBdQDlARbBA4EVwQABYsFiQUPBLsEdQXpBOoDFgNwArYBAAG7AOsAPAG9AEQAgAD5AM8AjQBaAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8DAAIAAAABAAkADgAQAA4ADQALAAYABQAGAAoAGQDDALIAKQAwADwANgA4ADwASQBcAGwApwB6AC0AJgAkACcAKQAsADEAOAA/AEcAUABQAFUAYABoAG0AcQCQAC4BsgIpAzEERwRGAy0D+AINBMcE0wSRBTsHpAfgBm0IXAi4B/YGewbpBhwIVwj+B9AGWQXGBJgEEwRiA0kETgMEBPIDBwQ4BMsD1AITBKEECwSbA4EDZgKTARIB0wAKAUABBQFjAF8AwAAcAaQAUgAgAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwABAAAAAgAKAA8AEQASAA8ADAAIAAYABwALABYAmQDhADIAKAAuAC0AMwBAAEsAbACFAGMAXAA+ACcAJgAnACkALAAwADYAPQBGAE4AbABnAF8AaQBzAHgAewAIAcoC/gOTBHAEDAQfA3oD1wMGBGEFmgZSByIGhwbgBzIHtgf3B0IHKwhzCIYIIQdNBoYFmwXNBbMF3wMjA6kChwLHAkICUwL+ARwCwgIcA7ECtAJvA/ICeAJmAeYAMAE8AeQAjQBQAKQANwHrAJ8AgAArAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQAAAAIACgARABIAFAARAA8ADgAKAAsADQAVAEgAuAA8ABkAJwA4ADwASABMAFUAcgBaAEgAQQAoACkAJwAoACoALgAzADkAQABFAEwAYwCQAG0AcgB8AIEAuQAlApoCuQLbA2AEJANDA+gDoAQcBiUHuAZSBVsG/wfnBowGRggsCAYIBgiZCBcI4wYwBjcG2wbhBSMFhwTBA54CYAJIAvkCBQN7AscByQF1AZ4BiQEYAu4CEgI7AR0BVwE+AfUAlQBrAEEB+wGJAfUAiQBSADQAGwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAIAAgADAAkAEAAVABcAEwAQABEADwAQABIAFQAdAC0AHAAmAB4AIwA3AEAAPwBTAGAAcgBWAE4AMgApACoAKAArAC0AMAA0ADgAPwBLAHkAngCEAHoAfgCEAKUA+gAlAbIBYwLTAgkEsgSWBasFYwVvBQ0FwASzBggIqwYCBuwGawePB3wINwmfCIsHvQYvB1wH4wbeBd0EBASlAssCywPrA6MDJALjAgMD3QKGAkIBugEIA7oCgQEKATgB6gD3ALoAcgBmAYYCZwKBAeEAmwBlADEAEAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAAgACAAIAAwAFAA0AEwAUABIAEQARABAAEQAUABgAGgAXAB0APAAxACMALgAzAE0AZQB5AGwAaQBrAEIAMAA0ACoAKwAsAC8AMgA2AEkARgBgAMQAjwCNAI0AiQCVAAYB/ABAAakBCAPNA7wEbAXXBIwDWwNnA7kEvgahBxkGWgWuBTwHKwipCFAJYQmJCFIH+AeIB88FvwOBA0ADuwP4AlsE8wQ+BJEC2AL+AxIEiQMNAlYBiAEsAjoBwQCNAHkAcABqAKQASgErAnYDTgJwAegAiABPACMADgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAEAAQACAAQABQAIAAoACgALAA4AEgASABEAEAAQABUAGQAjAEIAOgAuACwAOwBPAFkAVwBPAGoAhQBJADIAcgAyACwALQAvADEANwBZAEoAbQDQAK0AmQClAJMAmQDYAQYC6wCNAZwBtAJdBAYERQPjApEDcQSOBe0GrwbzBbcEKgZlCPgIDwkACfMIvAjLB/wHBAdeBZQDeARdBEoF0QMWBcwFagStA78C8QMBBScErQJfAfYAHgGuAJUAjgCSAI0AcACiACoBxAHwAsIDSwLSAQoBfgBTACIA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgABAAIAAwAEAAUABQAIAAsADQAJAAsACwAQAA0AFwAeACYAIwArAEEASQAxACwAPQBXAEgAQwBkAHgATQAzAFgAuQBZADIAMAAxADUARgBYAJcAKwEBAaoAswCfAJsAnQHFApQB+wALATMCAQPuApACHgNKBJwFLQbEBYMEkwRRBfgG1QhzCGEIFgjIB/YHAAe3ByAH6QUWBHoEeQXqBeMEzgVZBmYFNwT2AkYDpAS/A3wCygEoAfMA1QDGAMYAwgCuAHQAlQD/AHoBNAINA/IC0QIPAusAkQBLABsA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAAgADAAMABAAEAAUABwAOABIAEgAUABEAFwASABYAHQAoADEAKAA/AD8AOgAyADoAOwA5ADoARQBYAGcAQwA2AFIAxgDDAEkANwA3ADsAQgBoANwABwHsALsAyACjAFcBwgLhAnQBLgG1Ad0BugF9AlgEigVMBjsGfQS2A04FxgaHB6cI4QcBB5cGcAanBgkGnQYuBvIE+AP/BGAGrAarBmwGawdnBbQDhAM+BA4FGAR0A3oCugGCARUBWAEAARgBywB5AJcA4QBeAQ8CQAJRApYC/QFuAu8AcgA0AAsA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgACAAIAAwADAAQABAAFAAcADAATABcAGAAWABkAFQAXACAANgA3ADYAMAA0AEMASgBkAE8ASQBEAD0ASQCSAFoAQAA/AEEA0QAyAbgAcwBMAEYAYADaAM0AHQHXAAMBrwBIAQsDdgPOAaYBTAGAATcC1AKUBA0EfwS1BIUDlASZBTIHzwcfCVcIaAe8BvsFigVqBeEFOgUrBTEE9AQjBq8HBwj0BhUIiQYiBf8D8wMkBb8E9ALrAmQC6wEtAlUCigE7AQABmACHANEAKQGKAf4BnwEvAoIC8gKvAfsASwAYAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAAwAEAAQAAwAEAAUABgAIAAsAEQAXABkAGQAcABkAHgAkADEAQgBAAEQAMgA8AFgAjQB3AF0ASwA/AEYAjABoAE8ARwBDAFYANQGJASUB0wCVAGIAngCxADcBFAESAckANQG8ArADdQKXAtYBqQFdAssDqAO7AowC3QKJAz0Fxga9B4cImgiVB7UGHQY8BoAFHAW+BIIEhgTgBCUG/AZ8CHUIkAcBCKUFxQS5BIYFOgYCBXsDAASeA6kCGwO3Ao4BFwHzALUAjACeAOQAbQHnAWYBlAFcASECowIuAhMBQwARAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAMABwAIAAkACQAFAAUACAALAA4AEgAUABgAHAAfACAAKgAvADgASQBTAEgAPABXAIgAxgBrAFEASABDAH8AiwBeAFIASQBNAJUAgQHwAYEBGgGtAMUA1ABtAYEBCgHSAGsBZQNuBF4DlgPyAtMBRAL5AUwCCAKxAkAE9ASVBQYGIQfKCFgIiQetBjAGtQUwBdUE7QTwBJgEugXdBoUHzAjmCHkIvwY7BmgGfAYcBocGfwVkBC4FVQSOA3UDQgLKASQB7gCzAJ4AnACeAC0BqQHPAUABBQFFAX0BOAK6AcoAMAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgADAAcADQARABAADgAFAAkACwAQABIAFgAZABwAIgAlAC4AOwBCAEoAXQBUAEUAWAB6AOcAigBfAE4ASQBbAIYAbABmAFQAUwBmALYAGwH5AGEB7wDjAOsAOwGIAQ4B0wCOAWADdgSDBIwETQOrAewBkwLBAnoCegPJA8YEogXiBjcHQAhRCBwIBQdEB9sGAQZHBewEoQSjBXkFaQbZB7EIhAmbCB8HjQglCFEHSQYnB84GkQUkBg4FNgTXA0EDYwJiAdwAtwCyAKUAowDvAC8B3gGYAUYBPgHuACcC9QFcAa4A/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAgAGABAAFQAVABUABwAIAAsAEAAUABYAGwAfACUAKgAyAEIATgBXAFQAagBeAFUAhgDcAMcAZgBRAFQAZACsAF8AawBbAFwAaACHALMAFgHRAU8BwgDBAPUAmAE3AdkANwHNAb4CDwSVBEcDpQJpAgYEpQK3Ar8EywMjBFMFlAeQBwQIgAhiCA4IaQdTBqIF/ARVBR4FKgbNBiMGBQcwCNYI7AekBzEJoQiBB9wG6Qb5BiIGbAXcA8QCHgN/AtUBVgHeAMcAwgCqAJcA1QAbAU8B5QHkAVgB6QBdAagCBAJ5AXAAEQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAgACAAIABQAQABUAFgAYAAgACAALABAAFAAYABsAHQAoACcAKgA2AEkAPwBSAFkAdABjAHsAqgDvAHgAWABkAJQA5wBhAHgAZgBiAG8AiACuAPoA3gHUAfkAIAGVAfwBbgHbAE4BpQL2AYQCmwNxBPADwAIdBJkC2gPNBf4E4wRPBpYHXQhqCHUJjgm+CLcHuAZ+BW0FeAalBUYGggfLBl0H1wh+CUcIQAi/CawJrggFB9EFOgWPBZUEDwPHAawBVwFCAfwA3gDeAMoArQCcAM4A6gAiAa4BiwH7AK4AkwA7AU0CqwHtAFkA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8DAAEAAgACAAUADwATABUAGAAMAAcACwAPABMAFwAXACAAKAAmAC0AMgA1AFMAVgBpAG0AagBfAIYAxACWAF8AZQDTAPcAYgB0AHoAbABwAIEAmADLAC8BeQFAAX0B9gGQAnYB4gA3AeQCGgPeApMDogR3BIEDPgS9AjAE+gVxBukFSQa9BywJlgkpCrcJTwgwB6kG9gWqBakGGwZmBqUHRAdtB8YIQQm9CKoIVAp3CoUIqwUEBHMEWgQdAy8CbwJ9AjECqwGuAToB4QDIAK8AqgD8AGYBFQFbAdwBQgHfAJ4AhgAlAeMB2AGpACkA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgACAAIAAgAEAA4AEgAWABkAEAAHAAkADQARABUAFgAmADMAKQA1AD8APgBKAFYAcABwAGgAVwBtAG8AiABqAGsA8QCoAGQAcgB/AIMAfAB4AI0AwQAXARUBLgF+AZoB4QEdAe8AOgGvAoUD8gIBBDwFagWwBM8ENQP1ArQEEAdEB0EGwAdACZ8IlwisCa8IfAdNB48G1QUxB+0GyQY9COMHMgjsCMkJuQnDCagKrgnyB+AF/gO7AzkDIwIbAwYEJgQvAykDQwKCAeEAxgCuAK4A8QBNAX4BiAEmAmcB5wDRAJAAgwDYACgBgABeAA8A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAEAAgACAAIAAgALABIAFgAZABIABwAJAAwAEAATABQAIgA1AC0AOQBIAE8ATQBUAF4AawBvAEwAVQBNAFgAcgB2AB8BqABtAHcAhACeAKEAiACIAJQAswDnABcBFQGDAXMBAAH8ACIBvwEGArUCvQPwBOwF4AW6BVgE6QLuA9UFyAcpB9YHrAggB6wHhQjFCLIIYAjDBikGfAY8B6EHQwhcCDIJjAk7Co8KLwoiCVkJ0QdNBTwD7wJkAlMDuQRsBTkF5gNHA+MBRQHvAM0AtAC4ABUBDgFSAcsBRAK+AWkB1wCZAGkAYwBvAJsAbQAWAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQABAAEAAgACAAIABwAQABUAGAAVAAgACQAKAA0AEAASABkALAAhADAAQgBcAFkAYQBlAFwAYABBAEMASwBmAHcAgABFAcgAfAB+AJcAugC8AKoAsQCdAJ8AuQDdADUBewGMAQ4B/QARAW0BoAIoAgoDMwTGBb4G+gXIBOYCqANhBNQFwgcZCOkHpAbUBv4HtgncCXcILAc7B/wG5gZCB60HJAkyCrUJ3AkACt4I7QcoCLYGgQU9BKEDngLBAxQFLwbMBDoDPAKzATkB9QDLALgAvwAfAVQBUwE9AvkCuQEvAdYAowCCAGkAUgDnAG8BQwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAAAAQABAAEAAgADAAUADQASABYAFwAJAAkACgAMAA4AEAAWACMAHQAmADkARwBRAGwAfQBgAEcANwA6AE8AXQBqAGoALAEpAcEAtQCjALkA3QDiANYAqQCiAOwAiQFBAb4BuwFoAScBOgE5AbsBwgKEAkMDvgS8BaIFGQRKA0IDrwRbBT0FhQUcBpEGJgbpB0gJVAlsCNcHgwhNCKIHjQeiCAcJggqdCZQJrQjwB0wHngaZBkEFUAQxA+kCbwPdBCMG/wSKBEUDAALZATIByQC/AMMAGQGNAXMBJQJPA2IC3gE6AegAmQBdAIUAmwHwAaAAFAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAQAAAAAAAQABAAIAAwADAAcADQAUABgADwAJAAoACwANABAAFQAaABoAJwA4AD4AWgBnAGsAVgBLADYAPgBMAEkAWQBWAL0AnwGjAU0B9ADfAPsA6gC1AKwAzAATAdIBCALlAdkBpgFnAXQBRAFWAl8CQgP0AjcD0QMVBZcEOgROAyQDBQTkA7cEOQbTBfkFFgcMCEEJ/gh9Cf0JOwlzCDEIXAnBCSUKcAl2CWYICwdSBgsFigTvA/oDAQX1A/kD4gSBBiwGMAVQAykDiwJ8AdkAxwDHAA4BcgF6Ac0B5QLbAsABLwHjAKQAZQCTAEIBLgI9ATEA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAQABAAEAAAABAAEAAQACAAIAAwADAAYADgARABAACgAKAAoACwAMABEAFAAcACkAMQA+AFAAXABfAEkAOwArAEAARQBBAEcAVQB3AOIAqgE1ApABJgEyAQMBugDQAOMAKgHkAfACuALcARcC2AF1ATsBcQJuA5kD+gMlA20DpQSzBSoFjgNKAw8DpwO6BJ0FNwV8Br4HsAjtCSkKHQvPClsJsQhJCSYK9wlKCegIxgksCYsIEwf5BbIFsQQrBVQGDAUbBWAFMAYUBjgG7wRABNECBAIQAdgAzQDfACUBVgF1AUcCEQMSAq0B+gCzAIAAmQDfALQBtQFOAA4A/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAAAAAAAAAAgACAAIAAwABAAEAAgACAAIAAwAEAAgACwAMAAgACAAJAAkACgANABEAGgAlAC0APQBOAE0AVwBAADIALgAzADkAPABQAFcAcwCtACoByQFYArEBGAHAAOMADAELAUIBAwLiAgwDXwIvAosCtwE+AfUBHwPpA88ElASdAysEkAXmBOUDuwMqA8sDyQN2BMoFCQYHCA8KiAoAC2YLpAoXCugJAwp4CoAKYQmPCCIJ8AnfCIIHSwfOBk4FiwZmB9AGjgYMBrIFqQV2BtYFuQNyAn8BGAHjANUA1wAZAXUBcAGtAZUCvAL5AWUB+gCeAI0AugCwAQMCuAAUAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAgAAAAEAAQABAAEAAgACAAIAAgACAAIAAgACAAMAAwAEAAUABgAGAAcACAAJAAoADAARABgAIwA0ADwARQBNAE4AJgAnADkAPAA1ADsASgBdAG8AhwDJADYBAAJbAmAB2ADiABMBSgFEAZIB/wGPAiMDpAJKA2ICdwFwAV4CBAO4AxkFqATUA9YE9gShBD8EpANyA8oERAV2BUkGWAh5CRsL0wssDF4LXguQCqwJrgqxCvMJiQjTCA8K6ghXCPcH9QemBpgHAgjTBtIFawV0BeYEewWYBXIDdAICAkwB4gDfAOAA5AAeASwBbQH3AUADUwKNARAB0QDNAKAAsgGTAc8AMwD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAEAAQABAAEAAQABAAIAAgACAAIAAwADAAMAAwADAAMABAAEAAUABgAGAAcACAAKAAsADwAXACYAOQA4ADoAQAAqACkAKwAyAEMARQBBAFUAZABuAI8ArQDjACYB/gH3AWUB8wDeABEBdAFiAUYCvgJBA58C1gJTApYBTQEJAgMDjgM4BBIFRQXYBD8FcAXPBAIERgT4BKkGKAbfBUMHtwi7CgEMeAtnClgKIwpwCbAJbgo5CQcIfwjyCR0Jiwn7CCAJYwidB+oGcga6BvMGJQaPBMIEvQVfBOIDDQP3ARUB6wDrAOwA7wAmAWMBogGrAssCCAIqAfIA7AC1AKgBAgIQAU4A////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAEAAQABAAEAAQABAAEAAgACAAIAAgADAAQABAAEAAMAAwADAAQABAAEAAUABgAIAAkACgANABEAFgAfAC8AMAA7ACIAKgA7ADgAQwBEAFkATwBNAF0AbAB8AHUAmQCnAAYBdgG9AUcBMQH2AAgBPAHuAcQCWwJeAgwC3QGtAWkBaQGAAnoDdQRnBGIE8wSXBTYGYgWWBDQF6gUjBlcHWAd3ByYJSAs3C90L4QrzCQYJdggfCUcKEgntB/gH3AlWCgUKrQnbCGoIVgjDBzEHyQewB94FXAQOBLwEpQUCBVwD5QE3AfkA9gD3APUAFgE4AXcBAQJbAzwCggEiAeUA5ACmAboCxgGAACsA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAAABAAEAAQABAAEAAgACAAIAAgACAAMAAwAEAAQABAAEAAQABAADAAIAAwAEAAQABgAJAAsADQARABcAHwAlADAAPAAgADIAVQBZAEIASABiAGAAYABoAG0AVwBXAGMAaQC1AOYA2QBcAa4BWQH3AE0BiQH2AfEBVAJjAkUC6wGlAWgB5wF8A6UEmwMJA/wDwgTuBR0GHgWEBQEH6AYxCIQJ+QjDCcEKxglTCzIL5Ar4CZAILgitCUkJ1AeoB0kJ2wkYCfsIMgmZBwAHswfqBnAGDgc1BrMFNAToA/8EbgTZAuoBVgEFAQIBAQH/AP0AFwFdAecBTQN3ArgBIQEGAVIBDAJiA90BlABKAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAQABAAEAAQABAAEAAgACAAIAAwADAAMAAwAEAAQABAAEAAQAAwACAAMAAgADAAUABwAKAAwAEgAYABgAIwA3ADQAJgAhAEoAawBSAFMAVwBcAGYAXABUAFgAfQCbAIsAlwCzAL4AIgEpAgsCDQEkAUoBeAEuAggDKwPnAk4CEAKlAYgBlgICA4kCUAK9AtQDYwWYBu0FfwYGCNEILgkpCjgJJQnKCT8JZgouC24KBQqkCJ0HeAjyB9gG2gbBB6oHQAi8B2kIcgimBvAFawZTBQcGSwbeBMcDHwOvA7kEDAQaA7sBMgEOAQsBCQEGARUBTgHJAZ8CygLLATgBCwGLATkCRwMiAsAAdQAqAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAAAAAAAQABAAIAAgACAAEAAgADAAMAAwADAAMAAwAEAAQABAAEAAQAAwADAAMABQAHAAcACQANABIAEwAUABUAHwAaABwAHwA1AG8AbQBgAFsAWwBVAFQARQBfAHYAvAADAaEApwC4ANYAiwFNAlwBJAFlAXwBLAINA50DwwPnAj4CwAGWAU0CDwL2Ah8DpgIiA4IEwgVZBksHHwk8CckItwiWB08IVwlFCPUIBwuOCrEJjgi/ByEHaAeqB0MGKgbjBQsGAAZUB68IZwecBSkFDgWOBKoFdQQNAz8DDgQrBUMFVQTWAp0BGQEVARIBCwEdAUYBpQGbAgQD1gGZAW8BrQGlAsoDYwLyAMkASgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAAAAAAEAAQABAAEAAQACAAIAAgADAAMAAwAEAAQAAwAFAAUABQAEAAMABAAFAAUABgAIAAoADgASABUAFAAUABYAEgATACYAPABbALUAZwBJAEEAQgBEAEQAbgB4AKEAbgEFAd0A9QDEABgB5wHzATcBaAF7AboBMAJAA+4D/QKQAgICpgH1Ad0BwQLuAwUE4QJ+A3QEUgUmBjAHWwjPBxcHKAY4BqwHrgaWCP0KUQojCckIFAngB7cGgQYUBlQGAwa5BdQEoQWTB08GrAU1BOcE0wOvBKwDnwLHAnQDwgMBBMoENAPmASQBHgEbAQ8BEgFDAX8ByQGbAtMCIwLbAQIC/gJSBLkCnQECAZgAPwAgAAsA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAEAAQABAAEAAQABAAIAAgACAAMAAwAEAAUABAAEAAUABQAEAAMABgAGAAcACAALAA4AEgAVABUAEgARACAAIAAXACwASQCIAFMAOAAwADgAPQBOAGAAbgCNADcBvgETAYcB7QD1AFcBAQJXAV0BnAGuAQYCzgIWBPIDlQOWAgACswHQATkCDwNYBMED3AJnA5UEAwWNBa4G1wZyBVEFOAbhBdIG2wgGC4cKIApNCX0ITQesBigGTwcBCCEIQgccBWEEygWmBXcEpwOtBLcDswMwA5QCagL9AbICOATrA9ECngEtASwBJQEVAQkBMQFIAX8BIwI0A/EB9QFeAp8DPgXQA8ECnQHVAHEARgAWAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAAABAAEAAQABAAEAAQACAAIAAgADAAMABAAEAAUABQAEAAYABgAHAAoABwAIAAkADAAPABIAEwAQAA4AGQAqABQAJgA2AFIAYgBnACgALAA1AEYAdACZAIYAjgDuAI8BWwHaAV0B0wAhARECvAE4AZAB0wH0AbMC0gOSBCcEvgNDA64CAQJwAnQDSASoBK0DHwPYA1gDyQOSBNcEnQQrBlQHDgcgB3oJ/ArTCV0JpAhAB+8GAwgDBwAI1AjsCF8HpAUcBMQDWwSzA/4CFgO6AqQCKAPQA20CPQKMA+YDbALzAUEBOAE8ASsBGQEKARQBOAFdAc8BogLgAacB5gGFA/YEewSHApgB2wCjAHQAVwAwABUA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAAAAAAEAAQABAAIAAgACAAMAAwADAAMAAwAEAAUABgAFAAYACAAIAAcACQAMAA4AEAATABQADQAQACsALwAaABcAIwBRAGwAVwAyADUANABDAHkAoQBuAIAAqgDjAHoB5gGgAeoALAHRAWECZwFRAY8B0AFWAuwCxgP7BLgE6APzAlEC/wEhAsUCzAN5BMYDRwMBBB4E5wOSBFUFXQZIBzIIPggjCRoLBgoqCSsIaAfJB/cI3AfhCGIJaAiLB6QG6gV6BFcDzwPDA1gEiwSHBFEE8wMrAgMCWwJDAowBXAGBAU4BPQEtARsBCwEMAVMBwAFzAaoBzwHNASgClAM9BdoE/gKaAUIBxACOAGYAKAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAEAAQABAAIAAgACAAMAAwAEAAQABQAGAAcACAAGAAUACAAJAAsADQAOABAAEwAUAA4AEAAyADkAMwAmACIALgAvADUARABQADgAPQBHAFIAbAB/AK0AGgEdAnkCngF6Ad4AMwE8AhACXgFuAdMBVALYAqIDrQTuBOoDkAPgAtQCUQIwArMCnAOqBFMEuQROBfUESgW6BvgHWgjMCNEJHAoLC3cKcgmCCI0I/gjNCRsJ/gm8CcAI/gchCPAHVAa6BQkG2QVZBScE8QJzAncCWgLkAdQBsgEaAjQCvwLkAcgBLAEZAQsBAQEZAW8BXAFHAZIBhAFfAl0EvwUdBZ4DqgKjAbUAgABkACAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAAAAAAAQABAAEAAQABAAIAAgACAAMABQAFAAYABwAHAAcABgAFAAcACgAMAA0ADgAQABMAFAARABQAKwAyADsAPAAvACQAOgBbAFwAXQBoAEcAQABWAIEAtgC8ADgBpAHGAlQC/AEHARMBpgGrAkwCcQGsAQ8CXAJVA7EEjQWNBPgDugMFAwID9AKOAlgCUAOOBJ8FhwYcBl0GzQZQB3sILQmlCsELCws0CpUJaAk5CjsKKQoBClQJ0gijBysHrAcoB1wHOgYuBf8EzAMcA0gCtwJlA5YC4AJLA/MC9wNLBNcD5wLuASwBTQEUAf0AAwE5AVQBJgGUAeoBOAOOBJYFiQUkBGkCPQHbAMgAkwAiAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAEAAQABAAEAAQACAAIAAwAFAAYABQAGAAcABgAIAAgABQAIAAgACwAMAA0ADwAQAA4ADwAZACYAMwBBAEYAVQBCAGIAXQB4AHUAyQCbAEMAVgCUAJoAyAAQAXkBJgLuAjkCegH+ADMB9AESAz8ChQGkAVsCJgP3A0cFAwUPBbYEYQMmBB4EEwNbAmkCeAM4BM0F9wbIBy8IHAjDCKsJnwrtCngLdQtRCk4KxAocCr8IMAn4CAsIYwfYBeYFugWsBV8FOARZA7kC7AJEA24EGwSXAm8DXARSBE4FoQQCAwECaAGRASACZAH6APUAOAEoAREBbQEkAggDSQSuBW8F5wNPAuwBYwF5AdcAQAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAABAAEAAAABAAIAAgACAAQABQAGAAYABQAFAAcACAAJAAcACAAJAAkACQAKAAsACQANABIAGQAiAC8APQBMAGgAWwBVAH0AowDFAJoAfgBJAFcAbgCTANwAEwEwAcMB2AKdAjwCSQH1AKgBgQJLA4YCrAE8An0DqgR2BdYF5wWrBB0EDwVDBEgDJQOWAsICvgPFBBYG+gaTB3kI6QmuCR8KUQlbCrQLiwqVCqsJnQjGB20IWAnKCD4HoQXLBEwEEgShA2kD9QIuBF4FEAajBHIDLgOnBEAEiAUbBkUEiAKuAccBZAKTAlsBBgHpAB0BEwEjAUwBWQLeA+cEvAWVBOACvgKvAjoCIgI9AXAADQD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAAABAAIAAwAFAAUABQAFAAYABgAGAAYACAAKAAgACQAKAAoACQAKABIAEgAUABgAIAAqADcAVQBkAHwAZACAALwAIAG9AHAASQBeAG0AjACvABQBXQGnAW0CfwPOArsBDAFJAbsBjwI7AzcCAwLkAlUEcQWGBaoFbAVfBbIFcQQIBOkDnQKaAk8DEQT8BKcFzAZWCLYJHAirCHQIBgp3CzYLbQoQCfsHRAfEBgEIZwioB+MGQQZIBboDWgMYAwUE2QUzBzgGswVzBOMD3wS1BIYFiQaABccDbQKfAnADaQKbAUsB5AD0APwAHgFDAbIBLQMVBMoEiAQkBPADjAOiA6ACYAFoAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAEAAQADAAQABAAEAAUABQAFAAUABAAFAAYACAAKAAkABwAIAAsAEAAWABgAFwAYAB8ALgBCAEsAWwBcAG4AiQC5APsA3wCnAFIAXAB7AKsAvADjAAcBeQEaAjwD6gLhAX8BFwFjAa0BpALkAiUCiAOsBIoFOgStBHAFCgbFBQgFQAVYBEMDcwIVA4wDLAQyBi8IogjyCL0G5AeoB90IMgpbC6ALYwr2CIgHfQbDBvYGKQZLBcwE1APaA/8D4ANpBa4G7wfdBloGyAQLBZ4F/wW2BeUGaAYOBfICPwP/A60CMwLWAR0B3QDwAPgAFgFoAY8CeANsBKQE+AT5AxkDwQLIAbgATAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAQAAAAAAAAABAAIAAwAEAAQAAwAEAAQABAAEAAQAAwAEAAUABwAKAAsADAANABAAFAAWABgAHAAcAC4AOwA7AEwARgBfAFoAkACuAA8BowBoAF0AdwDNAN8A7QAYAXEB2AF6ApcDWwKGAR8BZQF5AWQCowLZAa8C1QOpBH0D5gNiBC0FeAZFBtAF/ASsAxUDqgKcA5gEygWGB9AGSAcPBvgGMwd0CHcJ2Qq9CjMKQAn4B9AGoQUqBdAElQRsBAMEbAWXBAIFnQYpB1QITQexBlYFSgXNBsQH7gfiB0wGxwSxAzsETAR+A1gDVAJ2AekA0gDuAPEAPwEuAtsCPgN3BF0FswQoA6UBAAFMAB4A/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAQACAAIAAwAEAAMAAwADAAMAAwADAAIAAwAEAAUACAAKAAoADAAPABMAFgAaAB4AHwAvAD4ARAA/AEEATABMAF4AlAC3AOMAiwCLAGUAhACeAL0ABQEaAXsBHgJnA/kC7wEsAZ0BfwEMAsYCdwIXAvsCZgPgAggD9AP9BNkFSQdHBkEFrQTtA9wC5QJHBHYFWgZdBUUFNwUUBlIHDAmHCRgLvgp3CUkI7QZyBrUFfwaSBgUGOgVyBOkFYAXbBIUGjwerCLAH8gerBmkFkwbFB60INAiAB5YGcAVKBRUEhAIvAmICxwEaAdUA0gDgAAsBZgHjAegCNwPfA1sE0AKoAR4BegAsAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAQABAAEAAgADAAQABAADAAMAAwACAAIAAgACAAMAAwAEAAYACAAHAAoADgASABYAGgAeACMAOQA7AEAASgBJAE8AVQBRAGMAsQBLAawAogBvAOUAyACdAL4A/wBGAccB+gL8AhgCaQF3AbwB4gGoAmADzAIvAjcCWAJPA5UEuAWWBgAHwAavBYcERASyA9cCYAM6BFcFagQ4BIsFdAfOCPoJmwqCC60LWQoACa4HKwckBn4HBwegBbwElgV0BpMFegX0BhsIRwnBCIcIdQeeBv4GjAgMCBEHugevB+4GzwSNA+QCFQK2AXEBCAHiAM4A3QD+AG8B0wGBAocCjgPIBGgDhAENAYIAMQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgABAAEAAQABAAIAAwADAAQAAgADAAMAAgACAAIAAwAEAAMAAwAEAAYABgAJAA0AEQAVABgAGwAgAD0AQwA/AFgATgBbAEwASgBcAIwABAFaAc4AewDSAAoBDwHvABcBggHCAaoCcAPAArsBYAGuAeoBbgJpAxwDkQLeAiwCIAOYBJ0FgAaMB1MHBQZ0BXoEFwQWAwIDTAP4A9cDJQUMB3sIwwnPCQ4LsAy4DIgLQwrZCHsHLQcvBwcGjQWJBdYGGgbABUMGjAZvB/8IkAlDCfsITwgXCBEJbAeBBu4GvQbMBi0GfgRkBPEC7AF6AWgBBAHIANAABAHIAfMCWwOsAs0C7QOrA50BrAByAE0ANQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAAAAAAEAAQABAAIAAwACAAIAAwADAAIAAgADAAMABAAEAAQABAAEAAYACAAMABAAEwAXABkAGgA5AEcAWAB3AGsAVgBZAF4AVABrAKgAhgFyAeQAxQBuAW0BVgEkATUBfAH0AQEDNwNfAtkBjQHgAZgC/gJaA3wD9gIwAs4CmAMiBUwGcgaNB/oGYgV7BDQFkAMTA7gDeQNOBMgF/Qd9CS8J/QkdC8wMGQ2OC4QK7AmDCFEHXgaFBjAGnwZuB6IHUgdKB4EHkggkCpoKsQozCoYIogjOCCAIfAYVBuIFygUFBusFJwTtAoUC6QKMApwB0QDGANoAMQExAjUDBgPRAY8CWAOxAbsAjgBkAE4AGAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAQABAAEAAQABAAEAAQACAAIAAgACAAIAAgADAAQABQAFAAUABQAGAAkADAAQABIAFQAXABkAJQBIAFYAdgB7AH4AZwBuAGMAbACjABsBSQLwAfsAvAAfAVgB7wALAf4AewGnAuUDQwNxAv0B1QF2AjwCLwP5A2EDWgLwAvgDxgR1BSgGBQdEBwUGlwX1BV8EKQMXBNYEMQVMBmYHOQiKCPcJqQttC8sMGAxKC4IKgQieB+EGMAg8B+kHyAivCPQH2gflCKgJpQp9CokKcgmsB0gH/wdUB1UGggVTBRQF/AQwBVIFlwSkA8ADmgKWAeYAuQDgAPsAuQF8AqMCgAENAi0DHgINAbAAggBUABwA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAEAAQABAAEAAQABAAIAAgACAAIAAgACAAIAAwADAAUABgAGAAYABwAKAA0ADwASABMAEwAVABsALQBAAFUAXwB1AH0AWABjAGIAdgDAAI0BnQLPAaMB3gDtAOYA6gAzAYkBYwJxA1wDzQI6Ai4CXQIjAu4CoQOTA2ICCQMHBHIE5ASgBZ0GhAd0BlYGXgbEBFgDgwM4BXQGeAa1BYAGZweUCNQJWApsC/8LswvECjsJsAf7Bx0JoghcCdsIQAjJCEYJiwkuCpsKLQlICX0I+gZ/BlsHDwYiBf8ElARhBPUDAQQWBeAFswTGAwUD3QEKAbAAsQDEAAoBUQFQAS8BsgH1AqQCbgHkAJUAbAAhAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAAAAAAAAAAAAAAAQABAAIAAQACAAMAAwAEAAQABQAFAAYABwAHAAkACwANAA4AEAAQABEAFAAXACIAMwA/AFoArgCFAE4AWQBVAGcAwACDAUACCAKSAo8BSAE4AeUAAAGKAfYBIgJCAiQC6QI2ArEBTwJLA7UDRAOEApMCPwNtBO0EoAWsBtEHYQcSB+0F0ATsA1ADxASjBY8ElAVYB2sIHAknCvcKJgocCk4KQguTCjcJ/wiICiwK5QmuCbAJlQliCuwKTwvMCu4InAj1B0UGegXuBekEMgQjBNUDmANpA/cC3APEBG8E7QKuA1ACPAG2AKkAsgDUAPoAQgErAXwBqQJGA0QCIAHRAIEAKAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAAAAAAAAAAAAAAAAAQABAAEAAgACAAMAAwAEAAUABgAGAAcABwAIAAoACwAMAA0ADwARABIAFgAbACgAMwB2AI8AnAA/AEoAXAByALoADgHUAakCbgIFArcBcQHsAA0BVAF+AVMBnAGZAiYDJQKaAbICkwPOA1sDQAPzAocCJAMjBDkFZwaHB/IHpQeVBt8FVwRLAw0EPwRfBDAGtgjNCZgJwwqWCg0JWwh5CbUJDguLCvgJsgucC4YK8wn8CkwK9wm/ClQLtwl3CMoHAQg9Bj8F1gTtBKAFSgUMBPUCqQIyAqYCVQNhAy8CtgJ7AukB+QCkAKgAsgDNABABBQE7Ab0BAwPzAssB6ACFAEAA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAEAAAAAAAEAAQABAAIAAQACAAMABAAEAAUABgAHAAgACQAJAAoADAAOAA8AEAAUABYAGgAbAB8ALwA+AFAAUABaAGIAfgCjAOcAWgHTAWoCmQKxAWQBFQHhAPcA/wBDAdoB8ALaAgkCeAGaAn8CQQOxAsQD6QOyAuYCcQQ2Br0GPgclCO0G5QUSBSUF5AN6A1IEWwUSBzUIcQhoCNoIfgmJCB0HwwcFCV0LrQsQC20MzAtNC3cKmgt9C74KywpzC3YKEwmjBwoHIwZrBuMGQwfUBvQEfwRHA4ICPgLIAcsB4QGGAUMBKQFEAR4BpQCdAJoApwABAfEAJQFcAd4BBgMMAgABiwBvABsA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAAABAAEAAQACAAIAAgADAAQABQAFAAcACAAIAAkACgALAAwADwAQABMAFQAWABkAGgAiAD0AhABTAEAAZwCGAIgAqQD0AGUBwAGQAvYC4AHOAYoB8ADhAP8AgwFOAhQDiAIOAlQBOQIKAngCVAJwA3wELQPEAgEEiwVABS4GoAdPB0gHnAZbBUsEcgPoBB8G6QbgBZIG6AafB20HOwj6BsUG/gg8CtUKagzgDDANGQxGC+YLIQyBC4YLcQv1CegIzwdtCGQIEQhtB/MIZQdvBZYFpASVA+gDcgOqAn4CVgI9AvwB6AARAbUApACaAJIAwgDwABIBGwGsAdkCrwHqAKYAkwAmAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAABAAAAAAABAAEAAgADAAQAAwADAAQABQAGAAcACAAJAAsADAANAA8AEAARABMAFQAVABkAIgA1AGYAfwBgAGsAjQC3AA8BOwE+AbwBVwIjA8ICRwIEAgcB3gDqADQBDQJ0AloCiwFBAVABjwHIAZsCiAOUBM8D+AJIAyUEGQXKBqQHsgiKCEwHagbrBMwDygNYBJcESQSeBG4FFwayBdoF3wVxBhoIQwiaCqYLmwsqDIQMhQzPDNoMVQzsC/kK9wlyCdAITwjHCRUJSwh8CS0I/Aa1BtQFlwWjBT8FVQSdBBgEWQNwAcsAvwCuAKYAmwCRAJMAtABCAZ0B/gEsA/gBSAENAY0APAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAEAAQACAAIAAwAEAAQABAAEAAUABgAGAAgACQALAAwADQANAA8AEAARABQAFwAaABwAJQA6AEkAWgBsAJAAmADCACYBbQHxAZ0CAwRiA1oCzAFjAeQA4QD3AIABrQFNAS4BSgG+AU4B7wGxApYD5gQZBd8DPwPCBNIF2wVNB38IzgheB8wFhwTcBIwFTwQnBYAF1wRUBIkEuwTLBaAGJgblBlcIfgrWCWAKQwrOCqILgAw8DagMQwxnC1UL8AqkCW4Jewm8CnUKeArcCEUInge6BsgGFgcDB9QFmgSwA3ECBgFmAVMB+ACkAJkAkQCKAL8AIgEhAvwBAQNwAkoB0wCLAG4AOAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAQABAAEAAQABAAIAAwAEAAUABAAFAAUABgAHAAkACgALAA4ADgAOABEAEwAVABUAGAAbACAAJgAzAEIAVABdAHQAqwAKAXEBGAIAA0AEbwOXAr0C1wEFAfEA4AALAQsBPgGgAbkB7QG5AZMBYwKpA8MEQgVCBDEDQQR7BIgF1wbiB5sHNwevBTMFRgbvBTAFogavBycG2AVyBUEFUwUZB2oGfgaGB10IHQg0CDYI7gg0CjIMswxpDFQL+gpNC70KjQpkCz4KBgtvC7EKDQqmCasH3AWiBWgGkwYBBlQEvgJTATgBagJ6AqUBrACWAI0AhgCjACcBZgGFARECMAPoARoBCgHWAFsAJwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAAABAAEAAAABAAAAAQACAAIABAAFAAUABQAFAAYABwAIAAkACwANAA8ADwAQABAAEQAWABkAHQAhACUAIwArAEYAZwCRAAYBcwGLARQCnQJYAwwEyAM0A88BZAEJAT4BEgH7ATcCYgJ2AikCCQJ7AXICWAO1A1IE2wQQBFkDxAPyBBAGfAeTBiMHgwYQBgEHkAaCBkYHZQj7BhoHigZ0BhgFfgZ+CIAHkgbuBpYHLwieCA4JswqRC8MLcQuyCokJWAljCZMJjgpkC3IL7AoEClYKAAmIBjMFqwQxBd4FpwSJAw8DtAGZATADNAJOAcMAkwCHAIEAiwDSABEBJwFlAZsCRAM8AlIB0QCLAFIAOQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAAAAAAAQAAAAAAAAAAAAAAAQACAAMABQAGAAYABwAHAAcACQAKAAsADQAPABAAEgARABQAEwAYABwAHwAgACcALQA+AGgAdQD5APYBowGtASICvAJ0A6ADuAIrAr8BdwEMApoBYwFDAvUCGwOTAs8BpwHwAW4CuQLqA3MFtwVgBMEDNQTzBW8G3AUZBk8HyAanByYHdwcKCCIJmQgqCeEIrwfiBaIFMgiOCEEHnggDCpgKLgoZCooK5AoLCwwL+QkhCSEIqgiuCNgIUQrTCdcIMgiLCLkIXwYABecDbAT6BKYD7AGgAUwBbQLMA/sCCgILAZIAgQB7AI8A/AC8AWoBeQHNATID9wLoASEBuwBtAD8AHAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAEAAgADAAQABgAHAAcACAAIAAoACwANAA0ADgAPABEAEwAVABYAFgAZABoAHgAjACsASgBnAIcAtwBFAUgBUgHIAfsBqALJAzID/QL1AfIBBAN5ApABvAFmAiEDRAMEA5oBFwK7AhgDbAOGBOIFvgWfBJkDnwSmBAQFdgbwBuIHVAgUCL0IggndCVMKNgloCDgH/QUJB4MIcgkvCKcJxwtnC9cKHQvvC3gL5QqYCbQIugdjB54H7wfXB2MJPgkYB/EGeQd4CBEHcwXqA4oDTQSJAs8B2gJwAi4DKQOSAqIBKQGqAIIAdwB8AAgBvQErAj8B0AGAAscDvQK7AfsAfgA6ABkA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAABAAIAAwAEAAUABwAHAAgACQAJAAsADAANAA4ADwARABMAFQAXABoAHAAfAB4AIAAoAD8AYgCJAIgAowAAATsBeAHNAWkCUwN1A9ECaQIzAloDSAPwAcMBTAJIAt4CVAPIAQkC8wIBBAYElQRoBWgGpgUyBDQERARNBLIF1gW4B4cHowbvBx8JLwnnCdUJcQlsB9MGAwnLCZUKOglcCngMJwybC7gLkAzeC4kKngktCQcI+AZjBkwGBQdcCAMJZgaaBXMGGgguBgAFnQMKA0MD6AFHAsMDWQTfAzsCkQEFAeMAswCNAHcAcgCjAHcBlgLVAZQBbAJ4A7cDuwLSAaUAWQAjAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAABAAMABAAFAAcACAAIAAkACQAKAAsADAAOAA8AEQATABUAFwAaAB0AIAAjACUAIwApAEQAWQBvAIAAyQBAAcAB3AHWARoCyQKEAwgDzQJiA70C9QHLAfQC5QL1AqcCwgGHAsED3ATaBEIF7AXqBlwHWwZ5BaEFDQRwBPwF+QaWBusFCwdFB0AIuQlPCjMKFAiwBqsIBQugCgMKdgsBDfwMGgyFC5kLDwxfCwALDArUCOcHqgacBQ4HCAhdCJgFpwSTBksHhAXLAxUDFAJRAiMC2wJ/BKoFDgSzAiMCUwHNAVgBtQByAG0AlgB9AYECtAKpATEC+wLcA+UDDAJTAa4ANAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAQACAAQABQAGAAcACQAKAAoACgALAAsADgAPABEAEwAVABgAGwAeACEAJAAoACsAKwAyAFcAeABxAJEA2AALAToBmgGZASMCawLsAoYDCgQqA/cBNgJfAkwDeAIPAuABQQOuBHME+AO7BGMFDAYfB6kHPAeSBVwFfwT8BDAFPAWDBZkG9AeqCIEIbwjACYUIygZWCDsKdAnxCaILRQvoC5cLggplCrcKRgoCCsEJhglQCBMHdQUbBvMGIwjhBSIE3QU8BQkFsgKWAloCEQRcBCgFwQU9BY4DowICAuIBrwKtAccAbQBpAH0AWgH4AQwDugJWAjMDbgMiBCQDKALiAFgA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAAAAAAAAAAAAAAAAAAAAEAAgADAAQABgAHAAkACgAKAAoADAANAA0ADwARABQAFgAZABwAHgAhACMAJwArAC8ANwBUAGkAgAB3AIsAuwARAQ0BlgHwAagBAQL7Au0DlwM7Ah4DRQN7A60CUALbAUADRQOCA/sDfATvBIgFVwamB3IH6wVyBtoE6AT4BMQEKQaRBqUG3gZnBxwI/gkSCZUHOweBCKUIVwmhCrsJvAuQCzYKdAkrCREJBAmHCLQHrQZKBrIFCQWbBngHrASBA3EDywNrAzIDIATHAloEagU1Bi4HFga/BPEDFgNyApUCDQLkAGoAZgBoANYALQEGAkoD8wIFA6YCnQMgBB8DWQFyAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQABAAAAAAAAAAAAAAABAAIAAwAFAAYABwAIAAkACgALAAsADAAMAA8ADwATABcAGQAdAB4AHwAjACIAJwApAC8APABJAGsAewCOALsAwADOAAMBTgF/AQ4ChAJKA7QDyALdAjoDrgM8A3YCMQIGAj4DwwR6BUkFWwaLBj4HxwelBzIHXAbHBRwGCAa1BDQFHwYtB+kHBAkJCSYKwAmmCKYHSQeUB7AHwAjICOsKTAtZC1EKMglbCAMIzwc/B/QHgQc0BuoELAZjBsMDzAR+BDsD5QIzBQ0FHwPZAyQFrAbEB+YGbQWsA/oBTgFfAaUBPgFyAGMAZQB9AMoAoAEKAxMEUANNAiQCLgOwAhACyQAQAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAEAAgACAAMABgAGAAcABwAIAAoADAAMAAwADAANAA0ADwATABYAFwAcAB8AHwAhACIALgA3ADsAWABVAHAAfACMAKwAsQD2AIQBsQGIARECOAMoBL0DcQOQA5UDuwO8AlcDXQIDBPoE8gQIBZ4FqgUOBqcHrAh/B4oGWwfcBoYGNgX3BBAGWgbZBtgHIglNCl4J0QhMCL0HogiRCK8IdghgCo0L2QvXCkYKXQmUCeEJFwmDCIYHsQYyBSoFewQDBO0EQgWLBb4EwQYFB44E/wOZBdgG0QflBj0F6gOVAg8CHAG9AN4AcwBjAF8AcgDhAB4CJAO3Az8EAgPOAagCSwIgASoBNQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAABAAIAAwAEAAUABgAHAAgACQALAAwADQANAAwADgAOAA8AEAARABUAGQAbABsAHgAgAC4ARQBiAHEAagBzAHkAfACVAM0ABQEsATQBhAELAvYCEgQSBDIElgPkA7oDjQMKBHMCBgO8A90DEgShBPUEJwZzB6YIFwgNCGgIbgdXBpMGYgWsBSgHzgdPCAcJKgr1CUkJRghDCBUKUAryCVUIrglxCoMLLwvxCpwKgQp+CowJPwk8CBkH3wQtBb0EGAYtB9UGCAbaBrEHZAjWBR4EFwWdBmUGxQZ3BmQFcwQUA34CLAF8AJsAYwBdAF8AmAAyAVwCRwObA2kD/wHcAekBzwCpAIsA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAQACAAMABAAFAAYABwAIAAoACgAMAA0ADgAPABAAEAASABQAEwATABQAFgAYABsAIAApADYARgBtAHwAbgBgAGwAjwCyANAA+QBZAasByAFqAkEDnQKmAyADbANLBAME5gJjA6oDagQ+Bc8ELAUFBvIFbgfOBzoHLQgmCAgIMQfLB04GTwW3BggIRQloCWAJ4Qi2CYAJ1Qi9CbMKuglICeYIqwkdCgkK3wo+CgAKqQkzCRcItgbqBZ8FkwZEBUwGywdBCFgGuwZJCG0IyAU2BfEFzwaDBZgFoQUUBZME6wIsAnsBlADhAGcAWgBbAHcAxgBrAZECwgLXAz0CKgHyAK0AfwCJAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAEAAgADAAMABQAGAAcACAAJAAoADAANAA0ADwAQABEAEwAVABYAFgAWABQAGAAeACEAKgBAAFUAcABfAFYAUgBkAHwAnACtAMwAEgFHAY4B/QGaAhoCOAKQAnkDqQRYBHUDEwMPBMcErwXLBbEFeAayBmYHhQa0BtkGAQdxB4YIFgjJBmUFGwbPBpsHQwjzB/4HTwkqC3EKLgqBC0ELdAouCToJnQlDCqAKwQmzCBwIgQfSBgwHKQf/BRkHzwUvBs8HNQmQCEgHkwiyCFsGfAYZB58GDgV8BFgEDgRHA2wCJQH+APMAsACHAFgAVgBeAJMA4wBnAQMCVgMQA+gBhAElAb8AowA1AP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAABAAIAAgADAAQABQAGAAgACQAKAAsACwAMAA4AEAARABMAFAAVABgAGQAXABQAFwAbACEAJgArADoARQBEAFwAaAB5AJYAjACjANAAAAE6AZQBTwKbAd8BTQILA6sElwQWBOACawOjBAcFcQUQBVIFlgVcBnsFpAVmBUQGEwdECBYIiAamBQ8GDgZrBmcHEwdaCPoJZAycCxULiwxYDOIK/AmECcUKdwvjCs4J0wiqCCYJ7QcZCbUHhQYgBwkGjAd5CBUKSAosCAUIOgmNB9cH0QftBS4FnQWCBDgDiALCAW4B+QC1ALAArwBkAFQAUwBwAJ0AHAGSAUwCrQOJA4ACUwEJAaUAcQD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAQABAAEAAgADAAUABgAHAAgACAAHAAkACwANAA8AEQATABUAFgAXABoAGwAbABcAGAAYAB0AIgArADQAQABPAGAAcAB/AJEAvwDkAO4ADgEbATkBeAHkAWAC3QJTBP0EbAThAwQDtANBBKUERwRnBIoF5QXLBMEErQWSBrUHlQjEB6AGUQaFB1IHrQZKBs4HygiPCsgL9gxVDFANtw1vDPIKewmiCrILMwuxCukJ/wk3CtgJMwmTBy4HLAjYBjAHoQh+CjEKTQh7CNoIbwlPCQwIewbGBhEG/APeAsgBqAF4Ad4BKAHkAMgAgwBaAFAAVQB5ALgAmQFbAtQCtgM1AygCEwL0AIMAIAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAABAAIAAgAEAAMABQAGAAYACQAJAAoADQAPABEAEwAVABYAGAAZABsAHQAdABwAGwAgACcALgA5AEYAVABgAG8AfwCTALQAzQDIANMAHgGDAaUBBwLJAswCCwMEBOUEFQQjA+0CIQNAA2gDywOjBOEERARZBfkGVQcACNEITAj0Bt4G0AcsCREI3gYeBy0IYglIC3oMlQ0gDrINXgw2C/IJcQotCzEL0QuXCwMM0wurCrsIfQeqCO0IxwcDBwsJEAuwCtQI3AlICrMKfgnDCPIHHgdYBbkDeAKVAWUCaAL/AvIBnQExAZ0AmgBOAFAAXwCCAFYBpgHnAYAClwNiAvsB8gBoAB0A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAAAAAAAAAAAAAAEAAQACAAMAAwAEAAQABQAHAAkACwALAA0ADwARABIAFAAVABcAGgAbAB0AHgAfAB8AHwAmAC8ANQBCAFEAWwBtAIAAkgCpAMgA8gAmAVwB4wGhAccBAQJsAhsDdANCBGQEGQRXA9gDmATOA4gDtAPxA70E9AUbB+IHfQgmCZMIagcxB1YIPwpkCRUIMAeGB5gIsAkhCw8N+A3KDNkL/goGCtgJRAp7CkAL1wujDE4L9AmKCK8IPAm/B4YHPgilCRwLOQuUCWAKnAu2CvcJKAnPBnwFoQTrAjMCnwGnAn0DegOqAhMCWQHWALQAXABLAFAAXQCpABYBTQEzAjsD2QE8AUcBnQAzAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAABAAEAAQABAAIAAwADAAQABQAGAAcACQAKAAsADAANAA4AEAARABIAEwAVABgAGgAcAB4AIAAhACEAKAAxADkATABjAGIAfQCVAMEA0gDeAO4AKgGCATYCcwKuAQQCagJvApQCCwMtBNUEWARnBH0FLAVCBPID+wOxBFgF/gXnBqkHzwhSCS4IHAjCCGYKkwoiCZgIhggaCagKtAv8DDgOqQ2/DBMM3go4Cv4JLQsTDKYMmgx8C9IJDQmGCcgIygfVB+cIzwkGCxIMlgorCyUMLQtoCsUINwc2Bb0DnQLhAb4CUgMSBKsDUQM8AqkB3ADaALAAVQBMAGAAhgDAAGsBPALLAmUB1wDGAJYAEgD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQD/////////////////////AAAAAAAAAAABAAEAAQACAAMABAAFAAUABgAIAAkACgAKAAoADAANAA8ADwARABIAFQAXABgAGgAcAB4AIAAjAC8ASQBHAFMAbwBwAJEAqACzAN4AtQDfAC8BnQFDAjcDhwJDAhACpAKMAxUDwwPABCkFNwXjBTwGSgX/BBkEPAUnBsIGfQdxCE0JpQk5Ce0IrwknCjoKYwokCoAKjwv1C8oMDQzqDekNiw0uDKYKjwomC44LFQ2IDX4McQsZCr0KhgqJCUwIewgmCdMJUwspDKUL9QuLC7kKkwk6CfgH0wXuA0oCjANrBNkErQQlA08CXwLSAboAmwDCALAATgBRAJEAqQDLALYBTgIKAVkATQBQAGEAIAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQD//////////////////wAAAAAAAAAAAAABAAIAAgACAAQABQAFAAYABwAIAAgACAAJAAoADQAOAA8AEQASABMAFgAXABkAGwAdAB8AIQAxAFEAaQB6AIQAeACJAI0AgQCEAKIA4gACAVIB9wEtAywDjQNLA58CtAMqBLMDugTMBc4F2QXgBhEGmgX8BLAETQU4BuIGvgdUCP8IAwhGCOkIKAkBCSsKtQnjCUEKiAruCvIKXQ17DWkM3gvICi4L/AqFC1MMSw05DbsLdQsODPQKUwm3CK4InAkQCiYL3QvTDLALmQolCgwI7Qf6B/UFLATZAnkDXQQMBdcEnwMbAp4BYwGhAIoAgACRAFgARgBuAFEASgAKAaEB5wBaABQBJQH6AGIA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQD//////////wAA/////wAAAAAAAAAAAQACAAIAAgADAAQABgAGAAcACAAJAAkACQALAA0ADQAQABIAEwAVABYAGAAZABsAHQAeACAALgBIAFsAWABBAD4AVABlAGkAggCQAMkANAGUATAC5QLSAz4EcARjA10DMwRgBIkElgV/BoQGcAa/BfEFPgZ+BpYGvgZ4B4cHpQjUCDUH6wfTB0wITQiNCXEJ8AddCE4KOAlfC7gNjg2JDD0LswrMC+0Lrgs7DPQMAQ7YDFcNQAyyClIJaAkQCqgKCAu3C0MLcwz7CtcJ/QirBqsGWwbrBG4D8gJqA3oECwWyBAIEJwIRAckAogCNAHkAZgBWAEsATQBMAGUAqgBKAFMAjgCRAJoBDwFNAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEA////////AAAAAAAAAAAAAAAAAAAAAAEAAQACAAMAAwADAAQABQAGAAgACAAKAAsADAANAA0AEAASABQAFgAWABQAGAAaABwAHAAfACAANAA5ADIANgBSAEoAVQByAJwA1ADEAC0BsgE4AmkDWgMFBPkDcARmBFkERAUWBXsFdgaQBnYFIgUzBSYGjwY+B9IHfgh7CMsIGwiKBsIGfwYMBy8I4wjFCUYHUgcnCH8IaAqPDG4MuwqkCToJ6QlNCl8K5QqzC2MNKw4zDcQLdApRCgUKKwqlCjULTAsNCpALMgsLCloJDgc3BSkFzgNLA2IDagQWBegE7QOFA3wCFQFsATUBpgB0AGIAUQBVAGoAtgDiAF8AXQBhADYBDwG0AdABRQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEA/////wAAAAAAAAAAAAAAAAAAAQABAAEAAgADAAMABAAEAAUABgAIAAkACwALAAwADAANAA8ADgAQABIAEQATABYAGAAaABwAHAAcAB4AIQAnADQAVgBeAFgAaACeAOUA9gAPAUMBUAHeAWUCCgOzA9gEpgTzBOsFYwYwBk0GwwW0BG0EkAQ5BYMF3AaRB1wICwk8CWYI5wbCBdkFbgdOB3oIYgl/B/sF4galCA0KSAu5CxkKiQjLCSUJpwjoCDoJIApPCyQNqAyWC1sMXQttCzALwwv6C3wKAglLCjMK9Ag/CVwHrgTRA0sEwQTqBEoE/ATlBFMDSwKqAVkBNgIQAvoAbABcAFMAegCsAOAABAGAALoAnwBJAfkBNQKbAXgA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEA//8AAAAAAAAAAAAAAQABAAAAAAABAAEAAgADAAQABAAEAAUABwAIAAoACwAMAA0ADgAOABAAEQASABUAGAAZABsAGQAeAB4AJgAlACcAMABDAFcAWwBwAG0AiQCuAMUA2QDrAEgBWAIXA+YDLATOBCYE3wR8BSMG7gUhBdUEmAS+A9oD2QRgBbEFwgaYB2UIAwnMB00GjgVbBQEGAgdFCPkIWQfRBc8FtgZyCPkJsAmBCNsInwleCHAITwkHCuIK4QtzDZUNbAzwDEIM3wy0DJAMiAvACYMImgh2CMYHSgeRBVMErgT6BdEG/AXwBPcF7wV/BNEC6QETAhwDewJfAYcAWwBcAHMAxQBCASoBuQDgAC8BQwEeApgCrgH///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAA////////AAAAAAAAAAAAAAAAAAABAAIAAwAEAAQABQAFAAYABgAIAAkACwAMAA4ADwAQABEAEwAVABYAGQAaABwAIwArADYAOwA5AD0AOgBCAFUAbAB+AIcAmAC2APoATAF4Ad0B+gL8A4oEMwTlA9QDHQSYBZgFpQQBBMoDUwNDBF4FhQf4B/0HzQdkCNYIaAi1BnAF3QQpBjsG7wZfCEkHzAWTBRgIywmBCfUHcQeQCfIIygejCGMKYQtPDHIM/QzjDFwLLwzLCxgMkgzDC18LtQrqCNoHpgZRBtQF8AV3BSQFkwUCBwUH0wU5BqEG3ASeA2ICYgL0A18DKALSAGQAaQCyAMwAUAH2ADEBFQEoAUoBdwEyAr8BbwD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAQACAAMABAAEAAQABQAGAAYABwAJAAsADAANAA4ADwARABEAEwAWABcAGQAiACMALQBCAGQATwBFAE8AVwBUAGQAewCcAMcAEAGKAQoCmgJDAtgCigNpAwYDLwOeAxYEYQUABW4EsgMsAzMDWgSSBZYH1ggeCWIJnAlHCKIHAQZIBYYEKwXzBesHGAjoBnkF8ASAB10IAwewBn8IVAozCYgHEAjPCA8KkAv1CpELBQzOCj4L8goDC6MLwwoSC2YKnAjlCCEHvQaLB54HkgbrBY8HpgcoCOQGPwbIBkMGlgTjAg8DRwTAA3MCLQF2AHUA0ADuACkBNgFjAcwBbwEdAWEBEwIMAqIA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAEAAgADAAQABAAEAAUABgAGAAYACAAJAAoACwAMAA8AEAARABQAFQAXABgAGwAfACsAPgBYAG0AbgBdAGsAawBxAIIAugDQAFUBBgIpA6EDLAM/A7YCPALcAoMDPgROBAEEsgRmBNMDwAIyA+gDNgb5BwMIEAisCAoJdweoBtYFZwVjBFEE7AWyBsUH2AZYBYUEowZBBvcFsAf4CUwKnQg4BwgIrglKC2QLKAo2C3wL+Al7Cp4KTQpRC5UKoQpzCm0Jmgg3CNsHGwkACHgGtQZoByIIbQjUBlcGwQb5BZ8EWwMqBDAEXgOlAnsBiQCEANkAQAEMAV8BzQHjAfYBLQFNAacCjwIiAf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAABAAIAAwAEAAUABQAGAAYABwAHAAcACQAJAAsADAAOABAAEQATABQAFQAYABoAHQAlADsAXgB5AHkAVwBQAF4AcQCHAJcA0AA7AdkBxgL8A90D9QJNAiwCCgNvAycEnARyA9QDmgMaA6MC9QOMBFkFzwbKBg0H3AfHCKUIeweoBngGjAT4A+4EbQU2BykG8QRVBH0F9gX3BvAIoAp7CToI+wYICJcJ5AoECpoJUApSCisJjQmDCQsKTQqSCjMLmwoQCoIIhwmQCVoJXQg7CEEHTwczCGsI/AafBWYGjQY/BbEE/gTbA7oCVgJpAZkAiwDEABABVQGOAYQBhAElAfQA0ACyAb4BqwH///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAQACAAIAAwAEAAUABgAGAAcABwAIAAkACgAMAAwADQAOAA8AEAASABUAFwAbAB4AIgAyAFIARwA5AEoAYwBvAHsAkQC5AOgAYgHiAfMC6gPFA0cDdwLUAb8ClQMbBOwDcgPfAp0DcwIQA2YDegMKBKkFWAU4Bg8HDQgzCYkHaAcoBtIExQP0AxgFWQZOBfYDoQThBV8I4wguCl4KawkxCNcGfwclCOgI6Ai8CAAI/Qf6B5QI1QiPCVoKjgqwCukKcwrTCMYJ4woLCo8JCAoaCXYIrQktCGwGCgU/Ba4F8QUOBtYFLAR0AqcB8ACQAJgAuQAeAYEBmQFCAf4A5AC/AI8ArwAFAWYBsgD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAQABAAEAAgADAAQABAAFAAUABgAHAAgACAAIAAoACgALAAwADQAOAA8AEQAUABcAGwAfACIAJwAmAC0APwBFAFEAXwB6AKEAtADYABABYgEUAvgCJQQABC8D9gHYAScCUQIoAnECQwJ3ApQCwgK/AtwCBwRgBIsF2AZ7Bx8I3QioB9sG+gVJBXAEfgMBBCUFBwQaBKYFEwfzB2sK2At/Cm4JzAjuBkcGeQbJBugGYwc3B78HIQhdCGkJcgolC1wLHgtnC0kKGQrkCooL0ArrCvgJ8AiRCYgKZQi2BrwFdAS6BGYEGAXMBPsDrQI1AakAngCkAL8AFQG3AZ0BNQEcAeQAmQCLAIoAeACSAOcA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQD//wAAAAAAAAAAAAABAAEAAQABAAIAAwAEAAQABQAGAAYABwAIAAkACQAJAAoACwALAAwADgAQABEAFAAWABoAHgAfACEAJQAqADQATgByAHAAfACYAKIAsAAiAWQBrwFbAp0DPQRdAxQCFwKLAj4C6QLQAm4CxwI9AzEExwM/A3EDHwRpBSEG/QaOB88IBAhQBj8GIwYGBdsDQAOpA/UD7gSeBocIAQkjC64LJArnCMgHagaZBrMHEAjNCHkJOwlKCbgKXgpYCfkJnwpSC2ALpQt4CjkLHwwnDOcLkgoCCoMJpwqDCjAJCwjgBT8ExQPEAmQD0QJ0AvIBDwHAALUAqwDGAPsAeQHBAaABTAH/AN8AuQC1AKUAPACyAIIA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEA//8AAAAAAAAAAAEAAQABAAEAAQACAAMABAAEAAUABgAGAAcACAAJAAkACgAKAAsACwANAA4ADgAQABQAFgAYABsAHQAhACUAKAAxAEMAVwBsAHoAdQCFAKEA7QBcAckBDgLbAlkEigNJAvEBTgO5A9QDqgPgAsMDqgM3BVsE8ANgBJkF7gYAB78HogdGCDEIOAfrBRAF7QSmBEQDpAO8BP8F5QeuCfAK1QtIC6kJRghwB4YGIwbJB6YJswqTC1kLeQunDHsLugmACoQLRAz1CxgMUAtNC60LmQt3Cw0L2AoJCh8LKQrxB5gHCgb1A08DvgIYAvQB2wGQAR8BbAEAAaoAtgD5AEIB4QH4AZoBPwEUAcsAqwCzAF0AMwBgAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAP//AAAAAAAAAAABAAEAAQACAAIAAwADAAQABQAGAAYABwAHAAgACAAJAAoACgALAAsADAAMAA0AEAASABMAFwAaAB4AIgAlACoAMAA6AEsAVQBdAIQApgC/AAcBIAGMAQ8CfgIXAwUDVwKXAd8BVQLVAsUDwgMhBBIFwAXABF8E+gUTB54HVAgYCE4I3weKBo4GIwahBUMEMgRSA6sDZQWgBgkISQnFCmAKvQr/CKoIAwjIBuEFSgdeCMoIoAn0Cd0KEwzZCy8Ktgr1C5YMWAxlC84KCgpnClULagv9C+ULtQryCq4JagdFBpoFHgQJBB8EGQMYBA4EjwJEAhkC8AC2AKwAwAAAAV4B9AFrAawBeQHcAJ4AtABzAGsAGwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAAAAAAAAAQABAAIAAgADAAMABAAEAAUABgAGAAcABwAIAAgACQAKAAoACwALAAwADQAOAA8AEQATABcAGgAdACEAJgArADEANwA8AEYAbACIAJEAmgDBABEBXwGGAeUBQgLUAjUChwHAAioDIgObAzwFywRaBT8GlAWbBeQFpgcvCFMIxAfNB+0HsAaEBfkE0QX0BOEDQwMqA1kEOwX7BtIIUwrhCAcKzQhXB8YGPAa9BSAG9QYVCAsJhAoHC3AMKgyXClILVwzJDCEMAAvkCSUJowluCs4JPgtzC0sLIwvqCW8HYwebBRQFLgVpBUIEmwUeBZgD4ALZAfcAwQCrALUA1gAHAaYBoAEgAUcBuwCHAJ4AewBHAFMA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAAAAQABAAEAAQACAAIAAwADAAQABQAGAAYABgAGAAYABwAIAAoACgALAAsADAAMAA0ADgAPABEAFAAXABkAHQAhACUAKgAwADMAMwBFAFkAaQB8AJYAxwDzADQBbAGBAeQBnwJYAoIBJwKVApsDYgTNBcsFXwXhBTEFAQaLBn8HvAf+B00HTAfxB+YHEgbVBNUEwATfAzcD9wKyBIsGpQjfCekItQfyCdoIMQhNB6cFXwWLBsQHAQkNCl0KuAqkC1UMLAv2C9oMPwwQDLgKrAm5CNgIaAn4CJUKZgsDCpkKhgreCN0IiwfbBuQF+AZKBiIGtgQyA9sBcAFEAcoAqQCiALIAxwAxAZ4BcQE+AQUBowBjAFgAzwBRAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQAAAAEAAQABAAIAAgACAAMAAwAEAAUABgAGAAUABQAGAAcACQAKAAoACwAMAAwADQANAA4ADwASABQAFwAZABwAHwAjACgALgArADMAPwBNAFwAbgCEAKEA4QA5AS8BQAGOAe8B+AE+AVIBTAL2AxMFfQULBssFDQViBAQFBgWiBpEHXQfPBi4HtAehB58GowX3A88DggP5AuUCCwUxB+cIsQgbB2UIdArQCQMJlweABgcF8AVNBuoGvwfWCD8KQQxwDacMFg2VDO4L7wusChIKhQn+B94HnwiUCZgK3AlmCYwKcwrqCEgIKQgGB5MHtgYFBacD9wIOA90CfgJRAZ0AkwCXAKEAswD+AM0BPAE+AcMAfgCLABUBhgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAAABAAIAAgACAAMAAwADAAMABAAFAAUABQAFAAUABgAHAAkACgALAAsADAAMAA0ADgAOABAAEgAVABgAGgAdACAAIgAjACgAKQAvADcAQQBNAFsAbQCJAN4A1AD7AB8BUgGLAYEBlQEjAYIC0QOOBAoEjwSdBfIE7gP8A7QEQgaQBqAG+wZ5B4cHsQYuBjAFoASLA0UDqwJmA40FzAVaBu8G3wb3CO4KGQoYCMUG6AX7BP0FOQcPCMwI8wleCkYM8gyJDBwM8QtNC5gLWAulClkJHQgiB8wH5gjXCugJNQj4CCkKzwnECW4JhwdaBsQGLQahBJcElwOnAtUB+wCbAJAAhwCLAIsAlwAIAQkB8wDQACQBPgFGAc8A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAQACAAMAAwADAAQABAAEAAQABAAFAAUABgAGAAYABwAJAAoACwALAAsADQAOAA8ADwAQABIAFQAYABoAHQAgACMAJwAqACwAMQA0ADoAQwBNAF0AdQCnALcA/gD3ABsBfAGBARwB/gC9Aa0CkAMtA2cENQWKBJYDkQMEBJIEzgUQB0sHhwfZBlUFswWxBLkDQgP9As4C6wMBBDYEjASNBeMGgwlGCzQKSgivBtMFyARLBfcFwwauBxkJEQvVDOIMugv2CgYLKgp3CboJYwlHCOUH3wYkCJkJHQrbCSMICQjnCD8KcQrNCUkIbQaaBb4GpQZoBXADCwJsAXUBEQEWAYEAfQB8AH0AiQCpANgA/wBFAQ0CsQHoAC0A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAgADAAMABAAEAAQABAAFAAUABgAGAAYABgAGAAcACAAKAAsADAALAA0ADgAPABAAEQASABQAFwAaABwAHgAhACQAJwAsAC8AMwA4AD4ASQBaAG4AkAC6AMcA0gAJAXYBfgHsAAoBiwFVAnoCywIqBF4ExwMyAx8EogXhBTcG0QbhBuAG2AVpBOAEBwWQBC4DlQLIAu8D1ARvBaQFkgbtB4YJGwkuCWwIlwdtBvEEzATWBTsH+QjyCiYLSgy0C+oKzQqqCZcJRgi/CPgIqgezBjcHQQgZCQYKvArPCDIHpQfDCKcILQlCCJ4G8QSCBVsG3gXwA1oDGwMDA9kB6QB7AHgAdABzAHgAnADhAMoAEgGoAS0CBAFYAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAEAAQACAAMAAwADAAQABAAFAAYABgAGAAcABwAGAAgACgALAAwADAANAA4ADwARABIAEwAVABcAGQAcAB4AIAAiACcAKgAsADAANAA6AEUAUwBkAJMAkgCiAMoA+wBGAZIB/ADTACIBfQGEAf0BUgM5A8sChQN6BEcFQwb1BT8FPgVkBjQFvAPOA50EsAOPAmsCkQO/BdoGPge1BywI8wjvCSII9QZWBt4FyQSDBPcEHwaCB8MIQwr3CewKAgqXCUsJjgiDCKUHswe4CIMHSwYxB+MHlQiACYAKCQqRB8cGtwdMB1UIEweHBuEEggTTBJoFUAWHBBUERAMZAvgAeAB1AHEAbgBuAHgAowDBAP4AKAEzApwBuAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAQABAAEAAgADAAMAAwADAAQABQAFAAYABgAHAAcABwAIAAoACwAMAAwADQAPABAAEQASABMAFQAXABkAHAAdACEAIwAlACYAKwAvADQAOQBBAEwAVwBmAHMAhQCyAOQABwFvATMBxgD3AC4BvgEPAh4CvwJrAwIEUAQPBZgF9ASOBKgEKgbRBMIDNAMSBC0DQALVAsEEvQYICCoIZQiZCDMKyArUCE0HDgf2BQIFFgQfBaUG/AZYCBQIJQg3Ce0I6gfCCCkIhQYzBzMIDQjGBjUG8gYRCE8JHgq8ChEKhwclBmoGCQcmCPMGaAVGBc0DyAM2BOoEmgPEAh4C5wG5Ad8AfABzAG4AagBrAIAAqgDRABMBxAEuAiwBkgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAEAAQABAAEAAgACAAMAAwAEAAUABQAGAAYABwAIAAgACQAKAAsADAANAA0ADgAQABEAEwATABUAFwAZABsAHQAgACEAIgAlACkALQAxADgAQABGAE8AVwBhAHMAkQDPAOIAFwEFAcMAOAFxAeAB5wIIAyQE9wMSBOUEeAUWBZQEKQR+BPsF0wR6A7sCBQNoAjcCSgMlBRAHWgY0Bn4GvAfXCe0JPwglBxMH3gaoBUAEVQXBBTkG2warBWkGGQewB34IQQnLB0cGowaLB7sG4AXTBtQHZggZCT8K5QqtCTAI3AaoBQoGggafBpQEEgQ6A6AC1QIYBOACCwImAfgARwG3AIYAfABzAGwAZgBqAJwAvwDkAGcBfQJ3AYkA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAEAAQAAAAEAAwADAAQABAAEAAUABQAGAAcACAAIAAkACwALAAwADQAOAA8AEAARABMAFAAVABYAGAAaABwAHgAgACEAIwAoACsALwA3ADwAQwBGAEsAVQBlAH4AqwDQAPEAywC/AFMBsgEpAioDtQOrAyYD6AN3BEoEpgTRA7ADqQTdBbQE3wPOAjECCAK6AjMDgQTSBesEaAU5ByMJ0gpOCl4JhAgDCNMGagUJBMcEkgSNBPkEXgWMB68Idgn/CfwICAiBBgsG+QYBBsUFZwa8B4EIxwhHCUIKxQqRCcIH0QUTBRoFXwWNA48DyANPAx0CLQK3AS4B6AC9AK4AmwCMAH4AdABtAGcAYgBvAIwAswAnAcgBwAGfAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAAAAAAAAABAAIAAwADAAQABAAFAAUABgAGAAcACAAJAAoACwAMAA0ADgAQABEAEgATABQAFgAWABcAGAAaABwAHgAhACQAJgApAC8ANAA4AD0APwBGAFEAXwB1AJcAyAD9AMYAtwBIAagBzwFhArgCqALhAmgDYwPYA/kDJgO3AwEFgQV5BJoDGwMGAnUCwQNKA+EDfwRiBLgFXAeACccKmgrhCc0HKwaZBWEEvAPzAwwFyQX9BR8HeQjuCWoKmAlFCEgHIgZVBVYGkQWMBWoGmwdvCKYH1QgjCjALMArPCJkHbAaFBOUDhgQ1BaQFLAVjAw8D4QIEA0MCWgHMAJMAhwB8AHUAbgBnAGEAcgCNAKMALAEYAWQBzQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAAAAAAAAAAACAAMAAwAEAAUABQAGAAcABwAHAAgACQAKAAsADAAOAA8AEQASABMAFAAVABcAGAAaABsAGwAbAB0AHwAhACQAKQAuADIANwA5ADoAQgBPAGUAmADTAOYACAHKAKkAFgFsAXUBmgFGApYCRwKoArICSgNWA+MCrwNCBQkF+gPRAogC0QFtArMCxwJmA78DewVkBhwHcwhiCCMJeAn6BxcHUwb5BKUDxwTbBRoGhAfnCD4JKQnzCPYIfghuB4AGIQV2BQgFowU4BpoG7wZeB54IaAl/ChUKJAqGCU8I/AVXBH0F0wYjBs4GWQWzBNIDBwPEAvsBNwGOAIUAfgB3AG8AZwBgAFsAiQDtAFsBLwGpAEYA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAQADAAQABAAFAAUABgAHAAcABwAIAAkACgALAAwADQAOABAAEQATABQAFgAYABoAGwAcAB4AHgAeAB8AIgAkACgALAAwADQANgA2AEAAUABpAJsAywD5AB4B2gCaAO8AJwEYAT8BKwLWAu4BEwIyAokCtAKmAkcDsgSDBIYDRQOmAsIBIAK1AmIDXwQ2BVAFkwXoBNYFIgf3CE4JaAd9BtQFoARcA0IEtwT7BDwHDAigB6EHjweLB0IHHAaRBbgE6wTHBRsGzQanBqUHXwiyCOQJ2ArSCQcJsQmzCf8GKAXWBU8HHgfxBuMERgNyAmoBOAH6AM8AkwCJAIAAeQBwAGcAYABZAHQAxgBlAXMB0QBtAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwAAAAAAAAAAAAEAAgADAAQABQAFAAYABgAHAAcACAAJAAoACwAMAA0ADwAQABEAEgAUABYAGAAZABsAHAAdAB8AIAAhACEAJAAnACkAKgAtAC8AMwA9AEsAXwCIAJ4AxgDwAL8AkwDAANAA7gBhAVYCyALmAcQBGwIjAkECrQJQA6wDfANaA+8DlQKlATsC+wKOA2IFrAVrBHUE9AN4Be8HSgiNCEsJVgjjBvQEewNCA40DiQQpBokGWwb5BfIFaQZHBU4E8wRiBqAG+QX/BsUHUgdgCBIJ2wnvCi0LfgruCMMIlgnNCCMH0AYUBpYGHQYeBRADegHJAYQBuQEJAbwA0ACXAHcAbgBmAF0AVQBeAIUAzwBuAecAtQBrAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMAAQAAAAAAAAAAAAEAAwAEAAQABQAGAAYABwAHAAgACQAKAAwADQAOAA8AEAARABQAFQAWABcAGQAaABwAHQAfACAAIgAjACQAJgAoACwALgAxADQAOgBFAFcAgACvANAA+wC5AI0AsgDlAOAAQgHhAUUCmgG7AbwB6gEyAqUC0AKOAnsDOgRkBJ8CmgHjAXECCwRCBQsENgN5A0QEEQZvB7UG+wcuCogIPgdzBc0EYwSOA+gCqQRiBJ0ESwTQAxwEEASABT4GnAfkBvsGtQdfCF8IAwlbCeYJCwt+CjYKzwl5CH4I2Qg5B7YGDgXcBeQF9ARKBHACtAGTAkcDRAISAmoBnQBxAGoAYQBaAFMAbQDBANgAGwEsAS4BjAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAABAAMABAAEAAUABgAGAAcACAAJAAoACgAMAA0ADQAOAA8AEQATABQAFgAXABgAGgAcAB0AHwAgACIAJAAmACgAKQAtAC8AMwA2ADoAPwBMAGcAjwC+AAEBsACIAJkAvADWAOgASgHFAXsBYwHEAR0ChQKiAlYCEwIRA4wEggQDA+MBmQGpAh4EKAQBA+0CkQT0BdQG/gUxBmMInAkqCiMI9QY0BskEBgOZA50DRANGA0QEfwSoBe8EuQZdCIkIFQiHCLwIygjiCEYJ9QkxCuQKhQqSCQsJfAfIB1cHMQeWBrgEswTNBEwEJANCAp4BpQJHBJYDgAIaAXYAagBlAF4AVgBQAG4A7ABBARIB6wDhAMAArAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAQADAAMABAAFAAUABQAHAAgACQAKAAsADAANAA4ADwAQABIAEwAUABYAFwAYABoAHAAdAB8AIQAjACUAJgAoACsALQAwADQAOAA9AEIASABcAKEA7gAJAYwAggCRAKMAoQCzAB4BNwFpAT4B1AEpAocCgQLRAdUBnQKKA/YDgANFAnABZgLyA1gDagIPA5YEigbfBQkFxgZMBzkIuQjNCJoHQQZABbwDuwK5AuQD1gRlBgAG+AZmBs8HdQlsCdMIYQlnCWYJVAnnCdAKHQtHC8wKkgnaCIwH3waGBeAFjQUtBZQDFARRAxUCjAKgA+EEwASnAnwB3wBxAGQAXgBZAFMATQBUANEAygEvARkB1ADMALMA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgACAAEAAQAAAAEAAgADAAQABAAFAAUABgAHAAgACgAKAAwADQAOAA8AEQASABMAFQAWABcAGAAaABsAHQAfACEAJAAnACgAKQArAC4AMQA1ADoAPwBEAEkATwBtALkA5QB7AHsAkgCWAJgAoQDNAOQAGgGIAbYBvAHwAeoBcwHyAawCbwNvBGADdAJ3AeIBWgNtAwMCJgM6BMIEOAV4BMMFdgVbBvkGpQduBuQFRATyAqMCzwN3BRsG9QcCCJIIrghrCXwJfAjIB0sIDgmiCcAJRQqKCk8Kowr/CWgIwQfJBscG4AUOBHAEaAQeBLQC+QH/ApEEuwUtB8wFMQSqAo0BAQGtAF0AVABQAEsASQCnAIkBSwG9AMQAxQBdAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMAAwAEAAIAAQABAAIAAgADAAQABQAFAAYABwAIAAkACgALAA0ADgAPABAAEgAUABUAFgAWABgAGQAbAB0AHwAiACQAJgApACsALQAvADMANwA7AEEARgBMAFIAVwBnAI0AbgBzAIQAlwC9AKAAsADuAE0BcwGWAWUBdAFjAV4BGgJXAxUEGwQQA3ECiAGsAfoC/AIBApUCBQNOA6UEAATyAwwEBwVZBQ4GcgWJBHUEnwLgAkIFGwc0B1kH1weeB0MIIwljCN4HKQdpCD4JWwpXCngKYwrrCVcJdgicB4gGngUbBYUFvgMoA7oCoAM/AtICTwMwBTUGxgbtBAkErQP5AkgCJgFnAFoAUgBMAEYAXQDeAFYBjABkAFgAZQD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAMAAwADAAEAAAABAAIAAwAEAAUABQAGAAcACAAJAAoACwANAA4ADwAQABEAEwAVABYAFwAYABoAGwAdACAAIQAjACUAKAArACwALwAzADgAPQBDAEkATgBUAFoAXgBhAGUAawB2AJEApwCWAJ8A+QBuAXEBvAFVAS8BJgF5AdYBbQIBA4kDPgNQAooBTwHOAdsBsAGrAWoCYwLuAuICdQLTAjoEsAM2A2gDBAOCAq4CzQN5Bc8FwwVgBR0G0gRGBSsH/gfABu8G+gdSCfUJIwohCs0K6ArjCcIJ5wj3B5UGoAS/A50D2AMEA3kC2gLuAiEEnAUcB3wGMgTaAkUCBgLKAa4AcgBjAFoAUwBKAEIAWwArAb4AjAA9ACsA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAADAAQABAACAAEAAQACAAMABAAFAAYABgAHAAgACQALAAwADAANAA4AEAARABMAFAAVABgAGQAbABwAHQAgACEAIwAkACUAJwApAC0AMQA2ADoAPgBEAEcATQBUAFsAYwBoAG8AdAB3AIIAigCrABoBOwGGAcUBrQFdAQMBWAF2AdkBHgJiAn0CpgEjATMByAGvAWQBdwGEAXYBgQGvAcQB0gETA3YC4AEvAoECtAOZBBMFbwQVBDYEkwNMBBoEwwRHBckFDAaXB7cI5QgYCfQJCwqDCowK4QqfCWoHlwYvBYAE8AMiBfkFHQRwBEwF2AMNBdkFoQYdB+wFEASIAk0BdgGyAHoAbwBmAFsAUQBHAD0AyQD5AHwAVgAuAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAEAAMABAADAAIAAwADAAQABQAGAAcABwAJAAkACwAMAAwADQAOABAAEQASABQAFgAYABkAGwAcAB4AHwAgACAAIQAiACIAJAAnACsALwA1ADsAQABIAFIAVwBfAGgAcAB1AHsAfwCDAI0AlgAOARYBFwFXAfwBhwEpAQUBegGmAc0BjgG1AUYBJAGIARoC0QJJAhACiAGTAdQBLgL4AoACKwIQApcCxwKBAuoDlwNWAwgDTwOgAy8EJgXwBI8GGQacBXcG4QaGCBQIuwgaCWUJ9gk0CiMK7wj7BmkF6wSlBQcGeAWyBvIFJAXuBqsGxQUZBdsFMwbtBcgDlgKFAdwAmACKAH4AcQBjAFYASAA8AI0AXgHkAFYAbQD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAIABAAEAAMAAwACAAIAAwAEAAUABgAHAAgACQAKAAsADAANAA0ADwAQABEAEwAUABUAFgAYABoAHAAbABoAGwAcAB4AIQAkACcAKwAuADAANgA8AEMASgBPAFcAaACaAO4A3QCAAIYAiwCOAKAAugDPANgAPAHAATIB8QDhAAsBUQFcARoBGQERAS8BowERArgC5ALIAlECAgJjArUCdAQsBEIErwNKAzECgQKAAmECtgIEBEoFMgbWBQUHwwavB8MGgQZUB74HyQfYB/wHDwh8CI0JHwobCmoJ7gcPB18FKwasBzwHLQjIBzYGogZiB2IFOASJBKoFtAUCBW8DSwIrAaIAlACFAHYAZgBXAEoAPQBRAHMBYQGPACQBdAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAEABQADAAQAAwADAAYABwAHAAcABwAHAAgACQALAAsADQAOAA8AEAASABMAFAAVABcAGAAVABUAFwAaAB8AIQAjACUAJwArAC0AMQA1ADkAPQBCAEcATQBwANUAMAGCAVABxwCIAJAAlgCdAKwAtwC/AMYA4gDbANcA3QDkAOsA9AD9AAMBGgFPAQkCXgKfAjMD8wLDAiYCoAJEA2cEpQUmBiQFygOBA2UEQwOFAuACAAQcBSIG7AY5CN0IoQmMCQEJ2QhCCRcJlggACeMIewjkCMQJUAoFChEJZgfEBbgGbgi1CSUK1AmzBwgIuAf7BHUD9wNEBagETARSA74BzgCyAMUAqQBzAGMAUwBFADoAOgALAc0BBgEqAYMA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAEAAgACAAEAAgAEAAQABQAGAAYABwAHAAcACAAJAAoACwALAA4AEQATABQAEwASABIAFQAZABwAHQAfACEAIgAlACcAKgAsAC8AMgA2ADoAPgBCAGAAygAnAZ0BfwFEAQ8BwACSAJkAngCkALAAtgC8AOIA8ADeAOUA7gAKAUoBNQFrAbUBbQHfAYICpQKhAp0C9AKDAh0DeQP1BFUGAwegBc8EpgUYBQAD0QLLA7YDuwPDBD0G8wfYCZoLCAtkCoYJFgraCX4JFQq4CSIJQAn8CYgJ+Qk/CNUGFQb7B2oJPQqJCWwJ9QhaCAEHYgUnA5kDHQRaAx0DzAIiAQABkAHTAbQAYgBaAE0AQAA1ADEAmgBTAaoBHgG5AEYA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAEAAgACAAMABAAFAAQABAAFAAYABwAIAAkACgALAAsADAANAA0ADwAPAA8AEgAVABkAGgAcAB0AHwAhACMAJAAmACgAKgAsAC8AMwA2ADoAPwClACMBdwGLAV0BJAH/AOAAuQCcALEAwQDEANQA2AADASsBCwH5APsAQgGKAdcBbQLRAgcCgQHWAoQCkgK6AgYD6wKYAxkEOQVNBmoHYwYuBjYGTAUEBMoCMwSQBdkERgV1BisIYwpRDAIMCwtaCuwKHQtZCqUJ7glcCd4J1wnlCNwJ8wf6BtgG0ge9CPEJfAjAB38HBAdMBbUFSwPGAmMC/AFCAkoCLQExApoCOAIvAVcATABDADkALwArAFcAugDEAXsBHwGHAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAEAAgACAAMAAwAEAAMABAAFAAYABwAIAAoACwAMAA0ADwAQABEAEgAUABUAFgAYABoAHAAdAB4AIAAiACQAJQAlACcAKgAtADAAMgA2ADwAwQBkAY8BcgE3AREB7QDMALMAogAJATEBIAEoAfwAGgEoAScBQQEhAWcB/QG7AkgDnAMUApgB8gFRAtgC9QIYAz4DewNpBF0F/QYTBxQGhQZ5BagEwgPoAsoDSQUGB0EH4gd1CcgKfgraCkULqwuAC7cK9wmiCpcKZgpxCpEJawisCTkJjwh6Bx4IsQgMCsUIXQfTBa8FsgSYBJsD5wE+AikCWAE0AcYBPQOHAxcCzwBOAD0AOAAyACoAKAAoAHoAZAENAX4B1gD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAQABAAEAAgACAAMAAwACAAIABAAGAAcACAAJAAoACwAMAA0ADgAQABIAEwAUABYAGAAZABsAHAAeACAAIQAiACIAJAAlACgAKgAtADAAMgA6AJMAIgFeAUABGwH0ANgAvQChAJMA4gAYAUcBMgEWATABJAExATwBVgGtAbsC6gNqBLMDfALLAZ8CmAISA/MC8gLxAicDLwRoBNwFxwTPBJYGGgbnBSsE8QJsA2cFnQYYB0QIBwnwCM4Ibwh4CdIKTQuXCuwK5Qt+C7cKiQl7CNsH/QjLCWcJeAigCI4IbAl8CE0HMAaABOcDKQOiAjkC4gNKBP4BSgIwA/YDCgQPA9kBhwAyAC8AKwAnACUAIgBWAOwATQHtAKUAVgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAABAAIAAgACAAIAAQACAAMABQAGAAcABwAJAAoADAAMAA4AEAARABIAFAAVABcAGAAZABsAHQAeAB8AHwAgACIAJAAmACgAKgAuADAANwCNAA4BPQEfAf8A4wDHAKwAkAB/ALgA+QAYAUQBDwHjAOMA9AD7AE0BxAGCArQD6wP8AwgDBwKEAjgDLAPtAuwC7AL1Al0D6gPKBKMD4gS1BvYFLgUpBC0DYAM9BXYFpQb5BVEGfganBlEHDghYCYkLAgzuC0IL8ApLCkkJYAiZB0QI8AlnCrkJhAnFCH8IKgfzB1MIhAbIBbsDsAJbA7YEKwQAApIDmgSRBJADwwIhAmsBhAA6ACYAJAAiACAAJABsAP0ARwHeAGAA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAQABAAIAAQACAAEAAQACAAQABQAGAAgACQALAAwADAAOAA8AEAASABMAFQAWABcAGAAaABwAHAAcAB4AIAAiACQAJAAnACoALAAtADMAjQANASoBFAH+AOkAzwCnAIEAbgClANsA/wDxAPIAxADEAMQA5QAPAZgBXQLPArkC0QNxAz0CVwL/AtYCHwMJAwUDAgMAA1QDXgNEAyIFMQWhBQgGqAT+AkADLgQ2BaoF/QSmBAcG/wdvCU4KMAt/C2sLewt+C90K6gnSCN4HMQctCM4JFwsnC/4J3AifBwgGpwYgCCwGzQTpAkMEoQWRBYYDbALNA+8EEwV7A34C/wE3AZ0BEwEvACIAIAAeABsAJgBnAB0B2ABzAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAEAAgADAAUABgAIAAoACwAMAA0ADgAPABAAEQASABMAFAAWABgAGQAaABsAGwAeAB8AIAAhACIAJgAoACoAKgAxAHYA5QA5ASABCgH0AM8AnQByAGEAaQC2ACIBtgDGAKUAqADAAM4A7gAwAVwBsAGZAgUEbgNZAh0CfQL7An0DDQO7AvQCtwLeAqwCiQOXBAAEHAV2BEsEeQP+AuUDqgPaAxgEvwTeBqgIZQqZC+sLFAsICpQJewlkCdwI3QdPB+UGGwhdCcUKIQt/Cj0JCAgzBskFHQjcBjUE1ALxA/wFfgYDBbEDmwMnBRAG/QRAA/ACpQHPAMAAPgAoACMAHAAZABcAJADUAHcBzwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAABAAIAAwAFAAcACAAJAAoACwAMAA0ADgAPABEAEgATABQAFQAXABgAGQAZABoAGwAdACEAIQAjACUAJgAnACgALQBfAO8AawF1AUsBDgHSAJAAZQBcAGQApQDQAIMAmwCnAMwA4ADnAAMBZAHIARwCYALnA6EDcAI6AisCgQIIA+wCqwLPAo4CfwKVAoUDwwOxAycF/AQ8BfcD7AIjA3kEAQRWBH8EkAWcB8QJ3AmICkAKTQoGChEJDwh4BzcHhAZMB9sHTAm7Cg4LBAqkCQEICAboBO4FoAVRA60DkgOkBG4GwwUCBecD2gW3B6MGDgRvAlMCBAK1AHMAUgAnAB8AGwAXABIAPQADAQcB////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAACAAMABQAHAAgACAAJAAsADAANAA4ADwAQABEAEgASABQAFgAXABcAFwAZABsAHQAgAB8AIAAhACMAJgAmACoAVADUAGABigFDAQEBuAB9AF0AWQBtAI8AigCnAKoAsgDKANoAKgFhAV0BRALnAt8C2wN0A4gC2gJ3ArMCvAKaAqkClAJ6AmECfwLfAhgDJgNgBOwEagVnBCID+gNRBR0GvQVdBo0HKgknCXIIdAjKCKUJKwpFCY0IvAeWBnQGWwc9CJYJDws0C50KJwqyCfgHWQbLBMQDfQP1BC8FVAQUBiIHAQVOBPUF/QbvBjYEFQP5AdUBTQFyAIQAJQAlACMAHwAaABMAaAD6AFIA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAQADAAQABgAHAAgACQAKAAsADAANAA4ADwAQABAAEQATABQAFQAVABcAGQAaABwAHgAeAB4AHgAfACMAIwAlAEYA1ABxAYkBOgHvAKUAcQBaAFkArADgANcA8QDOAMMAzQDnAEwBzQE9AdMBSwL4At4D7QKpAi0DiAKxAg8DiwJ8AnkCZQJPAkUCWwJ+AkADnQMTBCQFwwPjAqYDVAQbBWQFQQZBCCsIrAcjB3kHDQk+CEMIOwnSCJMHawZsBtAHZggZCaAKTwuSCyYLBQqyCSUIogWdBRQFOQWBBq4GvgbuBtYFlAVjBgUHAghDBWUE+AKEAUABjADkAEUALwAtACgAIQAYABUAkgBHAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAEAAgAEAAYABwAHAAgACQAKAAsADAANAA4ADgAPABAAEQASABMAFAAWABgAGQAaABwAHQAcAB0AHQAhACIAJABKAMMAbAGDATAB2gCQAGQAVgBZALMAtwDcAPoA5ADcAOIA7QBKAQUCkAHPAewBzwL3A8gCVAIgA5YCjwK0AmACggJ9AlMCKAITAj4CpAKSA8UCxAO5BGAEEAMZAz0DgQR6BDAFHwcHByUGvQYpCAUJaAhHB5kHcgdVBywGrQbaB5oHpwh3CXYK4wreCQIJEgikBqEFPQYMBocFZAeYCC8IewhsB2MHzwciCL0IAwejBeUDsgICAa0AjAHNADoANwAwACcAHAASACoAYgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAQABAAEAAwAFAAUABgAHAAkACQALAAsADAANAA0ADwAQABEAEQASABQAFgAYABcAGgAcABsAHAAdAB4AIAAhACUAVwDIAFwBiwEeAbkAegBZAFQAVgBnALYAoQC5ANUA2ADcAAUBSwH6AT8CxAKcAjED7gPNAhsC3wLPAtUCkAJTApACqQKiAmUCLQJ+AjsCcAJjAjYDxwRkBC4ELARrA00DJQSJBR0GcwUcBtgGGgfVCHgIoAfEBhkG1wVoBqcGrwcHB2oHzQj5CXQKNwkMCH8HDwhaB/MGyAcDBz4IwgmnCakHLgeDB0wGKwc+CGMGrQW+BOgClwGnAAwBYQFYAD8ANQArACIAFwAMACMA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAMABAAFAAYABwAIAAgACgAKAAwADAANAA4ADwAQAA8AEQATABQAFwAVABcAGQAZABsAHAAdAB4AHwAnAGUA6wBpAXsB/ACYAGQAUgBWAFsAkwCVAKAAxgC8AMcA3ADyAFwB1wH1ARID2wOuA70DzwLlAZMCkQLFAp0CTAIyAnkCvwJRAgoCVwL0AS0CLANaA7MERwXjBLIEygM+A3AEbgXyBEMF2QUsBT8Glgc9By8HDwczBoAF1AYQB18HpQYmB/gIeQpwCgUKtQk1Cb8J1wgUCJYIywjfCCoJygj2BuEFPQa5BVIGowe1BX8EFwVIA4IBwgDrALQAWABFADsAMAAlABoADwAKAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAABAAMABAAFAAYABwAIAAkACgALAAwADAANAA4ADgAPABAAEgASABQAFQAVABYAFwAZABoAGwAcAB4ALgB3AOcAWAFhAdsAdgBUAFQAWQBkAL4A5gDIAOkA4gDgANoA6wAWAWYBCgK3Ar8DQQMGA6kCwwGJAkECpAJHAlEC+wHsARYCzAHIAdMB1gEVAnID4AQwBXQFVQUPBTIEMAP8A04F3QStBFME3gR7BuAGvgb1BVgFGwVkBSIG2gX4BWIGNAcjCTALxwtXCxsLygpuClcKxAlyCYYIrAh2CEsIPwdeBY0FFQWtBXAGpwQ8A3sEnAPoAacAjgBdAFcATAA+ADIAJgAaABAABAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAAACAAQABQAFAAYABwAJAAoACgALAAsADAANAA0ADgAQABEAEgATABQAFAAVABYAGAAZABoAGwAdACgAfgDrAEsBKAGjAFYAVQBYAGYAjADLAOAA/wArAQoBEAECATUBNgFhAR4CNQPtA1EDYAICAo4BFwIMAvoBagJvAj0CAAL4AcUBvQG9AdIBdwIbA30ELgQYBPgEaQVUBD8DsQPHBCgEEQRMBHAEcQUVBScF+wT4BMkFjQWVBSsG+AVpBmQHDgnZCrsLCgvQCpwK9QnACcAJNwk+CNoHPwe9BtYFzATlBAEFWwRpBO8DbAKjA/ICdgGxALAAjwBdAEwAPgAxACUAGgAPAAcA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAABAAEAAQACAAQABQAGAAcACQAJAAkACgAKAAsACwANAA0ADwAQABAAEQASABIAEwAVABcAGAAZABkAGwAlAHkA9QA7AdgAWwBSAFYAXAClAOQAxwD3ACEBQwF8AXMBNgFJAXQBxQHnAYUCaAPYA88CbALLAbYB6gHUAUYCpwI+AvEB0gGwAbUBvAHwAU0CkAI+A1UDcAO7BKMFnQSSA1wDGgR+BCYE2QNlBLkEHgV7BZsFsQXqBpsGoQZzBrAGSQfOB6IIAwrhC7ILGAtIC6cKeQngCFQIdgclB9YG8gVuBfYEDARmBIkDQAOJAtMBjwL8AdsAswCRAfABLAFtADoALgAjABgADgAHAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAEAAgADAAQABQAGAAgACAAIAAkACQAKAAsADAANAA0ADwAQABAAEQARABIAFQAWABYAFwAXABkALwB7APIA7AB6AE0AVABaAGAAfADYALcA5QACATgBcwFvARYBEwGSAf4BfwKVAlMD3ANDA1kC1AF5AboB8wEyAigC1QGcAaoBsAG+AcoBBQIdAkECjgI5Aw4E6QTwBWsFqATGA2cDgwOBA6UDLQTpBDAGDgeyBmsGuAdzCMwH+wZhB6IIRAk8CtYK/QsjC0EKGwpvCo4JHQmcCBAI1gYyBx8HpQYiBqcEgwQkA7oCqAFdAXEBBwHyAPQBPQKzAmsC9AA0ACgAHwAXAA4ABwD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAQABAAEAAgADAAQABQAHAAgACAAIAAkACgALAAsADAANAA4ADwAQABAAEQASABMAFAAUABUAFgAgAFIAlgDYAJ4AUQBKAFQAWwBiAHIAjACbAJMApQDGAPIA6ADBAM8ABwFRARQC9gHNAvoCcwLJAWoBaQGGAYQBzQGpAZABngGoAbMBwQHQAeEB9gEtAq4CCwQGBQIF8gRwBRkFLQVoBAUEPARgBOwDGgQ3BQcHowcmB40IKwk3CAAIEwiICQcKOgtGCygLIgp+Cd4IMQnCB+kHUgh8B30FjwUWBj8FkAXlBa4E0gIxAqYCkwH3AI8CgQJWAhwErQN2Ah0BNwAmAB4AFwAPAAcACQAEAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAQABAAEAAgADAAQABQAHAAcABwAIAAkACgAKAAsADQAOAA8ADQAQABAAEAARABIAEwATABgAOwB+AM8AtQBqAEQASQBRAFcAXwBvAIYAkACYAKQArgCiAKIAyADQAM0A3wAZAc8BeQKCAvABSQGZAZ8BWwG0AfkBwQGZAZgBpQGzAb8BzAHcAVUCywJnAsUCawMdBC4EAgQ8BG8EPwU/BVQFXwUeBHEEMgUlBsUHJAh3CN0IighcCLUIxgnaCr8LoArSCR8JsQigB/0HOgdeBtkGBAdLBbgEEAU2BKsEgwTQAy4DSgKNAckBOwKNA3cETgOxBMIDAgLZAD4ALwAkABkADwAJACcAHAAHAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAABAAIAAwAEAAQABQAGAAcABwAIAAkACQAKAAwADQANAA4ADwAPAA8AEAARABIAEwAjAFkAngDPAI8ASwA/AEYATgBVAFsAagCuAKMAjACZAJcAlgC7ACABhgFOARkBzgC3AYcC/gFeAWAB6wEQAr8BCQK+AuwB0wHrAcQBtQG7AckBAwInA4AD8wIGA5QCqgLzAjgD3wIwAycE4wRmBB0FPQScBMoF8wbfB60HegciB+gH3AiUCGwJJQqTC7EKmQnVCOYH8AaBBpwH4AXYBaEGcAUUBCwELwPEA9gCawLxAeoBBANXA0cDgQWeBtUFUQRoA0QCIwFvADgAKQAcABEACwAiAB8ACwD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQACAAMAAwAEAAUABQAGAAcABwAIAAkACgAKAAwADAANAA4ADgAOAA8AEAASABYAMQBzALUAsgBvAD4AOwBDAEoATgBVAFsAbQB4AHQAewCJAN8A+gBrAakBBwKQAekABAHRAf0BPwHRAXcCaAIgAl0CqAIWAhcC6AHdAcMBuAHhAbYCuwNnBKMDiwTWA1oD4gLYAm0DHwM0A/gDuAO7BDIEtAQWBlUGbQaDBt8FswXyBjoIiAcsCFcKRApmC20KqglyCD8H3gXiBq8F6QTnBKwENgPdAt4CtAKRAukB6gL8A8QEiwQrBHEFqgYEBjwEJgLHAZ0AdgBCACkAGgARAAwADQAXAAsABwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAEAAgACAAMABAAEAAUABQAGAAcACAAJAAkACgALAAwADQANAA0ADgAPABEAFAAdAEcAgwDJAKMAYQA4ADcAPgBFAEkATwBXAHMAjQCNAKsA4wAeAS8BigE5AmcC9wEfAeUAXwHRATQB9wFMAo4CqAK9Ao4CXQJZAh4CAQLmAcoB9AF7AmMD6QS0BDsF8QQYBIQEZAT4AwIErwNqAx4E7AM1BGsE2AQZBUQFXQXvBEwGogdKCAcHFAgeCSkJoAoRCl4IGAdyBn0FMwW1BNwDAATdA1gDUgOaBKgEQQNfAoEDygS/BVAFnAW6BhkHFwVvA34BWQEHAdUBPAGBABcADwANAAwAFQAXABYA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAEAAgACAAMABAAEAAUABQAHAAcACAAJAAkACgALAAwADAAMAA0ADwAUACYAMgBbAJkAvACMAFIAMgA1ADsAPQBFAE0AUQByAMoAyQDbAPwANAFSAYgBEAI7AsQBMQHnAAUBdAEoAdkBrgFEApQCnQJ4AkkCkQI4Av8B9AFJAmsCmgP6A8IEbQakBvEFxQWCBsMFzQTIA0MEQwRqBHsELARyBIIEQwRqBJgEswTOBfoGBgeaBnMGBQfbBywJNgq6CDYIgQejBqAGWgUwBCoFrQV8BKQEigWCBVkE0AMpA1cEfAbIBugF2QbHB7UF0QMvA8UCxgGFA9oCEAFDABAADgANABEAHgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAEAAgADAAMABAAEAAUABgAGAAcABwAIAAoACwALAAsADAAMAA4AIwA7AFAAaQCoAKYAdgBIAC0AMQAzADoAQQBGAEgAegC6AMUAtgDcAAUBKgFQAZYBRwITAkcBkAGHAXMBGQFcAbYBQwIdAhkCsgJqApgCcwIWAigCmgJEAzgDJQPmAyIFxwb2BtQHFQc2BToEaARVBSkFigQ4BRsEHAWoBS0FgQRYBQgFGAWKBa0FIQalBroHFgjFCMAKwQo1Cj0J3geDBkIG1ATmBWoHzwVkBhEGNQa1BVQFmgQRBeEGdgeBBo4HBQi+BjIG+QRJA0ICUQP6A0ECkgASABIADwANAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAIAAgADAAMAAwAEAAUABQAGAAcACAAJAAoACwALAAoADAAQACwATgB4AIgAsgCTAGkAPAAqACsALwA2ADoAPgBCAGUAiwCeAMUA4AAGASMBVgGDAa4BCAJjARQCnwJKAlQBLAE2AXsBjAEmAogCjQKXArYCYgLtAt4C3gKvAoADEQUpBqkGXAZFCNUHHgZKBV0FVAbZBRMFqQXIBNAEXQbUBQ4FzgT6BXsG/AYkB+4H9gcWCXQJbwoPC8kLfQocCbEHnAfyBloFgwYoCMQG7QaHBiEHrQeGB3oGtQV1BlQHwwfBB5AGwgVxBrkG2AReBO4EBwT0Ad4AGgAVABEADAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAEAAgACAAIAAwAEAAUABgAHAAgACQAJAAkACgAKAAsAEAAxAFQAcQCjALYAfwBdADMAJwAkAC0AMAAzADcAOgBiAIkArgDUAOkA7QAGATkBagGLAbwBkwEdAjkDfAKUAV4BOAGZAWsBMALAARkCPgI7AooCtQLrApYCugICBMgEtQX8BQYGIweHCL8HXAY7BjoGhAYyBhkGpAWDBPIFzAbOBUIF8QTyBgUIdgg4CTMJJQrbCucL9wubC/IKJwqiCCgJuwcLBu8GoQi/B1EHtQiqCEMJLgiAB7EG7wUnB50IEAgEBuQEPwVgBlkGQwWEBJoESAKgACcAFwARAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAgACAAIAAgACAAMAAwAEAAUABgAHAAcACAAJAAoACgAKAA8AMABiAHsAgQCSAHYAUQAnAB0AJAApACsALQAwADIARACWAM4A7wCsANUACwEpAV0BaAGjAfgBOAJKA2ICMAJDArYBWwFlAW4BewGAAYcBmQHXASQCTQKOAswCygPJA0QF5QU0BXgFFwdlBxsGEgWnBMkFBgcYB8oFsgRwBfoG6AbQBRoFMQaqB9IIXgmbCVgJkgm4CosMcQxcDOMK3QnMCAYImwa+B8sIiAc8CD4K+QlzCVEJuwibB3MGzQZDCKUHZgaGBYQEVQXJBZUEaQMsBGgDxgFnABMADQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQABAAEAAMAAgACAAMAAwAFAAYABwAHAAgACAAJAAoACwANAC4ASABlAGYAZgBoADsAHAAdACMAJQAmACgAKgAtADsAcwCVAK4ArQDZAAABHQElAVQBmgEiAp8CgQM6A9wCeQKsAVwB9wFKAisC5gHhAe4BsAHJAfcBwgGjAqgCpAO2BH0FUQVYBLcFkAeuBlQFGQQ9BZQGNgeqBoUFPAXLBk4HJQZnBRwGegcfB2UIAwkUCAwJUArrCtAL9AvHC0wKdwmsCNYH9wh4CLYIAAjyCMMKpwqUCpYJFgjwBr8GCggMCF0HMgeGBfQDVQQSBIACcwNxA+ICPwEjAA4A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8DAAQABAAEAAMAAgACAAMABAAFAAYABwAHAAgACQALAAwADgAvADgAUwBFADsALgAeABYAHgAgACEAIgAkACgALwA4AEMAWACjAOkAFwHYAPsARwGJAaAB1gGMArkD0gJEAtEBlQFdAe8BZQKwAkoCUwIyAqQCGQLtAiIC6AEeAnUCtgL4AxYEywNWBRoHLgaeBNoD4wQDBkgHcwesBrQFswYOCE4HEgaTBfkFCwcpCEcIbgdHCMsIVAniCr4K9AsyDOAK+Ar4CYgJVQnqCSIJoQgRCwAMGwskCYgH9QZxBxEImgeyBtIFDgU1BNsCKQL4Af8BxQEpAgcCSAAOAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAEAAQABAAEAAgADAAQABAAFAAcABwAIAAkACgAMAA4AEQASABkAGgAaABoAGAAXABwAHgAeACEAJQAnAC4ANwBDAFAAcgCiANAABQFBAUYBRwGLAf0BgQKMA6YCLgL9AQgClQGKAR4CbwK5AnACXwLsAkYCYwMDBJACgALZAl8CrgIQAw0ERQWsBWgFJwSDA9MEqgVJBosGvgUgBsIGFghQB3sGKwbjBQgGlAb+BpQGuwbfBpAIIAqsCboKqgzaDKULDQrGCbgK2Qq4CeUIigqPCxoKcQjSB2kItQh9CHMHtAUZBJkDpALzAlcEawMCAgoBVwExArEADgD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwACAAAAAAAAAAIAAgADAAQABQAGAAcACAAJAAoADQAPABEAEgAVABUAFgAWABQAGQAbABwAHwAjACcAKwAuADUAQQBOAF8AxwA5ATsBDwEtAVwBZgHFAQgCIgPIAtYCzwJgAg8CmwEwAt8CKQOsAqQCXQONAhEDYwTSAx4ESQMoA9oCjwK4AiID7wMgBGoD5QOSA7YEtAVWBikFVgXYBU4H8gdRCGsHBgejBjwGbQb6BigHPgemB1EI9Ai+CoYMFQw6C4IK1gp7C0sLTwr0Ce0KvgrzCmkJgQjbCawKZwl9B3AFeQSfA0AEogSXBjwFUAKbAbwAkQERARgA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAAEAAEAAAACAAIAAwAEAAUABgAHAAgACQALAA0ADgAQABEAEQAQABEAFAAYABoAHAAfACIAJgAqAC8AMgA3AD4ASQBYALUAWgH5ANwA5gAKAVwBvwF0AlwDEgPtAngDuwKmAhYCyAHZAngDGgMQA3EDSwNRA0YEWAX+BBoEYwMqBKEDsQM4A1kDdQPxA1sF1APEA7UE3wRIBKwEVQV6Bp8HZgibCKAIHAg+CMQHjQgTCcMIgAnaCVoJBgpxC5sMcQtVC1EMAQx5C2oLCgtGCk0JggqQCcAIHwqNCtcH9AV5BQkGDQbqBVwHSwZ9BDoDNQMvAbQARQAfAAsA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQABAACAAAAAQADAAMAAwAFAAYABwAIAAoACwAMAAoACQANABMAGQAfACsAHgAeACIAJQApAC0ALwAzADgAOwBDAEoAUQCPABoB2QDnABIBEwFcAakBRgKOAi8DLwPUA4ADDwMLAvABqALMAgwD7QOiAwkE8QO4BAQGyAUbBJIE6gVCBcsDGQSYBTsFAAQoBnsFDQTQA+4D8wPnA1cEIgXnBZoHNQiJCfgJ+QmtCSgKHgpOCvAKKArECUkKUAsHDdQMVgwhDOsKQwr8CTYJQwj7CEkJ+wlqCUgKTglfBy8GOgZEB94H7wiHCKYGNwUfBFMCTwEtAccBrAAbAAwA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQABAABAAIAAgADAAMABQAGAAcACAAJAAoACQAFABEAGQAeADIAZgBJACYAJQApAC0AMgA0ADcAOgA9AEEASQBSAFkAfQCjAL8A5wD/ACEBPgF6AdQBtwJNA4kDzQP7AocCEAJKAloCBgM4A6ADcgQSBX0EoASsBSMGgAXaBEkGMwamBFUEWAboBVcEbgayBm4FAgW7BTUFRwQaBB0FlgZGB7oGhggvCRIJEwo4Cs8K0QssC5AKVwvcCnQKuguLDDYLaAqyCYUIygjbB7YH2AhWCIkJ4QpyCoMJwggZCKQHoQfUB48HFAjeBqUEuwOKAvECswIfA6kBgAAdABIACgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEABAAEAAIAAwAEAAUABgAGAAcACQAJAAQABwARAC8AUQB+AJMAXQA0ACwALwA0ADkAPQBBAEMARgBJAE0AVwBiAHoAuwAqAeAAHgFKAXkBFgLDAogCOwMuA+UDjgP3AnMCyQK/AncD2AOpA6sEcQTnA4sEHgVLBg8HvwVXBhEHlgVLBVIHdgZWBZ8FrwdiB+8G3gUCBZcFUAR4BN8FEwbQBRQHbAekB4cIfgmcChAMSwy5C50LZAqxCd4KHwugCYcIvAc0BxcH2wZmBxkItAdDCAEKBwqmCBIIrQhlCNAGBAYbBscHKAcSBr8FQQVhBJ4EsgQvA20BRgAZAAwA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAMABAADAAMAAwAEAAUABgAHAAgABQAFAAgAHABbAJsAzAChAGUAPwA0ADcAPABCAEYASQBNAFAAUwBWAFsAZgCWACsBawEPAR8BOAFmARcC4AJmA34D1QKJAzYDRwMbA48DcQO/A7YEVQRCBSUEogPlBLUFlwbXB8kGxAZDCIAGlAatByMIAQdyBbEH0ghOB/AFRAbwBmkFSQS5BAsFzwWaBoIH7giICcgKPwunDHYMjQtyCpUJVQl1CtoLCgspChsJqQd8BkQGDAcNBhAHJgepCBQJ1AhyB9wHvghfBx0FzAUCBy4IMgiFBv8F2gXsAy0EVQMdAVMAFAAKAAMA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAQABAADAAMABAAFAAYABgAIAAQABgAJAC4AhwDxAOsApQB0AE4AOwA+AEMASgBQAFIAVwBaAF4AYQBmAHEAlwAvAUcBHwEyATMBZQGGASgCjgLRAswCuwK0At8CsQJxAzYEtAQpBTkF5QSEA7wDvgSWBQcGcAcNCKEHjwhbB1UIVAhJCbwHLAYcCNoJLAhsB4cHFwZCBbQElQT3BVAH3wfxCFUKywrYC/8LxgsiDJALiQpwCcYIdgloC24L+glOCQIIPAfGBQQGBgXtBS0HZAb2BywIiwaaB5cIMQeFBDIEcAWbBp0GtgXVBBQG8ANZAgsCkAAwAD8AGwAOAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAMAAwADAAMABAAFAAYABwADAAYACwBRALQABAHsALQAggBbAEQARQBMAFEAVwBdAGAAZQBoAGsAcgB7AJcA2QDwABQBTAF2AdwB9gHpAQ8CNAIdAvQBJwJyAmICwgKjA4EEvgQ2BL0DBwPZAyAElARJBmwHiQjcCLoI8QiwCQ8KhwkuCFUHQwhkCpYIzgYjBlQFmQUIBboEpgVCBqYGtAccCQkLCwspC5YLJwwqC8wJOgkzCOAIDgpBCoQJHQgHB98F4QUaBgwF9AQUBmgF6wb+BtsFJQdBBy8GAAUOAy8E7gTtA+EE+AOEBI0DIgGrALcAtwFZASUA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAABAAEAAgADAAMABAAGAAUAAwAGAA4AVgCmAO8A8gDDAJAAZwBOAEwAUgBZAGAAZgBqAG8AdAB2AH4AiQDBANwA6QAYAVkBwAFvAmICLQIBAtUBMgKoAhcC+AH9AR0CVAJHA7QD3gKfAqwC1QImA28EAAVABtcGnAccCNYHHgnUCsUKkAkICcIJCArzBwwGZwbwBkwGjgXaBHUFsAZ7B0kIgwlCCjoL8QoBC1oLkgtbCp0JSQgZCCMINAiMBwUHDgdpB7UHyQZ1BbAEmASNBNYFKAbkBA8FGQWfBAkEnAKkAkwDCwKWAhUCywHEAd4AQQGMAmED1AI+AP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAABAAIAAgADAAMABQADAAQABQAIAFMArwDmAPQA1AClAHYAWgBVAFgAYABnAG8AdAB5AH8AggCHAKAAwgDqAPcAOAFtAdsBxAK/AkAC9gHQAXwCtwLbAqICZgKjAqoCowKnAjMD7gNIBG0D3gIWA3EEqQVgBYMGewYuB44IYAl3CZ0KoQriCUcIWAcLBzcIGgiXBr0GsgU5BRkGXAepCGQJVAsDDNwL3AudDGEM8gqwCfUIGAjOB78HGQhACXcJtgjPCKYHgAabBTIEIQSNBMQD8QLgAqACGQIGAuAC2gPlArMC/gHHAQsBRgFHAoQBYgHtAtgD7QD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAABAAEAAgADAAMAAwAEAAQABQAsAH0AvADmAOsAuwCIAGgAXQBhAGcAbwB3AH0AgwCJAI0AlQDbAPoA6QAKAToBbAHxAbgCewIXAs0BrwEVAmUCvAIwA+8CIQP2AnwCywL4Ar4DPwU1BdAD3QJqA6sEXgTcBJQF+gXKBp8Hrgg4CroLGgpiCdAIzwhzCbAIswf7BhwG6wW7BT0HzQgoCQcKbwp2C+EKQAxfDPkKEAplClMJEgnNCHMKNAoSCcYHdQfRBtAGbAXTA7YDSwN0AysDdgJSAvMCFAOyAnUEqAWBBCoEjgPNAgoD7wPeA2YB2QIdBKQB/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAEAAgACAAQABAAEAAQAJABZAHwAwwAFAdwAmgB2AGcAaABvAHcAfgCGAIwAkgCXAKMA6AA6AewAGAEkAUkBlQExAhwCCALBAacBFQIyAt8ChgN4A8YD9gI/A9YD9AOtA0IEmwWCBBcEFQNoA7UDjgU+B7UHZAj4CIUJhQp9C7MLRguTCusKhApQCZoIkwf2BuUG0wUXB4sIUgkNCW0JwQq3CRQLHgtfCnAJVwqzClMKfQqcCsQJ1ggmCM0HyQcqBx8GnwX6BD4EcQPHAwwDywJCBLQEFAQiBKQEJga2BooFgQUZBR8G4gTpAfwCYQRBA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAABAAMAAwADAAQAAwAEAB8AOwBRAJkACQEJAa8AiABzAHEAdgB+AIYAjgCUAJsAoQCqAOAASwFCASQBWAF+AaMB7QH7Af0BngGYAQAClQIbA6cDBAQWBGkDwwMZBOMEqAQ8BJAF0QWZBHAEIgNYAzoEAAVGBrcHqwekCHcJFAovCxEMtApSCjALsQl0CL8HggiwB0AGlwbTB1kJzAhqCZkJEgmmCsgK1gkXCckJygl1CocLxArVCl8K+gliCcwHwAaVBcgEbwRYBN8E+QQlA3IDmQR/Bc4FdgUnBQMFnQZ7CEQIoAezBrcDywEWA+cEwAP4AP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQABgAEAAMABAADAAMAAwAQACYANgB8APYAIAHEAJkAgQB6AH8AhQCOAJUAnQCkAKsAsADpAFMBfwFtAdoBLwLwAeIB8QHkAYwBlAHpAVwCnAIMAxAD6ANmAywEGQWaBQAFLwXvBUUGsAUfBesDugOHA5IDSgW7BowGWQjVB1kIJAoOCi8JIwmCCqQKpAnxCGAJRQgMB9sG+QdlCckIagg2CKMIpAqUChsK7AgQCbQJzAp/DPcLQQtvCrcIXgd0BvkFcQVaBmIFEAYJBmgEQgMVBFsEowR4BU0GiQazBmgGeQf2CFoI2AYfBDUCXQNMBZUDagKBAf////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8GAAQABgADAAMAAwADAAMACQAmADAAZADaACEB2ACpAJEAhQCIAI4AlQCeAKUArQC0ALkA4gB9AYUBgAHvAWYCBALTAdcBzgF5AY0B2AENAjcCeQLaAp0DmQOpBO8FUAb2BdgFCAcmB2AGzATzBHEFwARNBNgDbgScBRgGmwb5BrAI5ggpB8YH8QmCCQoKCQrnCJIIAggGCFIIWQmvCfQIxAe2CIIJBAmyCakIRwlMCnkLSAtMCm8JjgjmBwoHIAiYBosGAge5BiwGYgRgA1YDhAR5BU0FswX3BdQGwQfZBmsHNQjmBoMGzASpAnYDewUCBQ4F0wOvAfwA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BgACAAUAAwAEAAQAAwADAAYAHwAyAFgAvgATAe8AuACgAJMAkACWAJ0ApQCuALYAvQDDANcANQEuAWQBqQEIAhgCyQHAAbYBbQGaAc8ByAFPAkUCnQI7A9YD3wTxBfcG8AZ6BmwHPgi5BpMFmAURBtwFWwWhBIQE9wMDBPwElwWWBikHvAW0B9oJawhWCcMJhAjGB64H4Ae1CGsI5QgiCHoHeQjSB/sHggiiCLgJFwv7Co0LcAo8CewIJggcCYkIbwdiB/AHOAaNBNcDZgS5A+YEoQWPBg8GkwYEB4oHHgeDBxAHggWJBSgE0gK5AwcGXQeCBqoDAAMtAzcB////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwABAAIABgAEAAQAAwAEAAwAJABSAJ4A4gDaALwArwCkAJoAnQCkAKsAtAC+AMYAzQDXABQBeQGFAZMBCAIkArABsQGcAWMBjQGdAa8BzwH6ATkC7AKwA3QECwXkBcoGpAfLBwkICgcbBigHAAbCBooFhQZxBgIFiwRdBDkEGgXPBOME7QZjCKsHcQfICHUHmwc4B18H1wd0B5IIOgj6Bp0HDwmNCY0ILwlYCcYJTgqiCzoLJgo2CcAJ2QkNCdYIRAgZB6wFrgSEBK0EjANzBKoF4wakB6oHEwiuB4UINAjABgkGRATkA6YDkwV5B3UIdwdzBkUEmgJhAf//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgACAAUABAAEAAQABAAGACsAXwCUAMQA1ADJAL0AsgCoAKQAqACvALcAwQDMANUA4AD5AEABfwHQAe4BDAK9AakBdQFcAXIBmgHJAf8BCAJIAg4DwQOoBPcFnAazBj4GRwZLB9cHvQacBzwHFAcmB1QHKweYBdMGzwVrBFcEzwX+BSEFhAWcBc0F3Ab1BjkH9gZ9BvEGwgYwCDMIDwc1B3oIFArcCXYK8QnvCWcLwAttCyULugrBCwIL9AqOCeUHUAdEBtoEFwapBT0EBwQbBTYGSgdzBxgIXAjUCFUIlgZ3BekEgwXoBbsHTAdvBg8GgAZfBa8CcABCAKcA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wUAAwAEAAQABAAEAAQABQARAGEAogDDAM0AywDDALwAsQCsAK0AsgC0ALoAxQDQAOAA7wAoAZEBxgG9AbYBfwGHAU4BWwF6AZgBoAHOAeQBKwK2Ai0DEQQwBeoFJQUcBfEF6QZmCLYHKwjYCOsH3QhJCFAHCwZxB4YG3wSWBVQG2AXuBtUG7gb5BdQF9gWABhQGygUkBmEGDwf7BoYHvAYdCM4J4wrBCwELlAogC0YKOAohC6ELegyMC5cKVwmlB4IGxgVdBiEH9wU7BQoEPgR2BV8GzwbFB4EISwnPCFIIJAe9BYcG0AdsCOcFmAVyBBIEMwTZAb4ALAJeAnkB/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQAAwADAAQABAAEAAUABwBBAKAAyQDJAMgAxwDEALoAsACvAKYArAC5AMUA0QDbAOoA+wCFAaMBWAFzAVwBRAE9AVYBfQGnAcYBAgIxAicCeQJLA4ADzQPKBOsDkgUsBt0GaAisCAwJzwlnCcIJIQhQB1EIyAh2B7gF9wX4BskF0wZACB8JUwg/BxEGDgbeBS8GrAWmBdIF7QX3Bp8GeweaCEEKhwuOCxEKkAnuCVsJbglBC7YLkApxCYYIvQZ3BnYHowjzB0IHkwXuBJ0EzwXtBq8HFQhiCFEIwQegB+sHrge1B/UItwfaBCsEbARXAzMDJwI2AeMDIQRbASgA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAAgAEAAQABQAGAAgAFQB0AMUA1ADHAMIAwQC9AK0AnACeAKsAuADDAM4A2QDlAO8ABgEbARwBKAExATUBQAFiAaQB1gHoAQACHQJpAmECjAL6AgUEwwNoA1AEDQUfB8IHkQfsB8YIAwpICX4IcgijCdwINQe/BYkGfAhjB1oG9gYxCfMJ5giIB88HpwYLB5EG5QY8BuwFUAZ3BhAH9gccCUwKLguPChgJjAgACf8JXAtqCh4JMgh8BywHnAfeCRAK1AibB0EG/ATdBPkFzAaECFcIawe6B40GawbXBgMIgQnkCOMHkwRFA4cCOwKkATEB5wEhBCoEOQEwAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAIAAwADAAQABQAJABAAOgCXAMoAxQC6ALYArACKAI0AmgCnALUAvwDMAOAAEgE9ASkBMgEdASkBMAFFAX8BtwGcAYYBlAG2Af4BGAJgAioCBwPEAxgDCwNEBGMFBAeSBpUGTQb4B5YJxQnMCZwJfgkwCLIG5wamBhgJCAnDBvAGpggeCusJcgkoCbgHUwe0B8gHNgdYBuIFrQZyBlMH1gcHCdAKHQoHCTsITgmICtMKQQtLChkJVAjnCBIIKgrgCXEIPQeqBSgFaAVGBoMHiwhAB4sGWgejBc8F+QbGB/kHzgbBB4YGKgSpA54CAQONA+wDqQRABFcDUQH/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAAEAAUABQAEAAYADgAYACEAawC6AL0AqQCeAHgAgACcALEAugDBAMYA1gDsABEBPAGDAZwBYAFUAWwBhAGyAW4BegGJAZwBqAG1AcMB1QH8AUUCjAK1AjED4AMiBeEGbgUdBbwFvAccCcYK7QrHClMJ+gciCDgImgd4CdEIzgd9B0YH+QmoC5AKcglECdQHkgieCE4H+QYPBhIGFwbHBu8HgwjkCe4JlAjCB0sI4whyCSwL9gpQCp8JhgqTCTsKGQkZBwAGQQboBdkGSAcfCFoI3gYBBqIFmwQ4BdgFAwZeBrYFKgfUB1UGuQVBBBQFBwUNBBsE2APTA1cCVAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEABAAFAAQABAAJABIAHQApADwAfQCMAHEAZAB0AJwArAC0ALoAwwDPANsA7QAaAUYBmAG0AWABUQFQAU8BTwFZAXkBmgHvARkCDAIMApsCrwKnAkwCIQMkBIEESgVlBW4EgAU+BjsHKwnpCZ8JZwpTCfMIPArNCb0IVQpECbgJDwmCB6cIVgqeC3ELigkdCY4JAghsByAI6QY8Bi0GPAbgBsAHZAi8CYYIpgfgB0gIbAmRCSoLuQslDJQMQQu4CloJWQd+BrgHhQY0B0UICQh7B94FMAU2BTMFIgQHBL8EsgTiBaIHiwf6BuUF5wXEBCsEjgMsBIMDMgPtAA4AAgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAAwABAAQACwAVACAAKwA3AEIASwBWAHMApQC5AMcAzADGAMgA0wDjAPAACAEwAV8BWQE8AR8BKwE2AUIBTAF0Aa4BnQG9AdcBGQLGArwD8AKPAgcDEQReBPADuwNjBDMFZAY/CJYIxwgUCCgKkgpECsoKawqPCdIKxAqdClcJTAhECMsIeQp1CwgL0grJCWkIvghaCXEIbQcBB0gGTgaUBqQHhgjJB+UHOAmXCOoINQr4C1EMJw1NDGkKiQlyCIQHiAeQCLsHKQiXCLcHmgbCBWEGPwY4BcUEZgSUAwQFxwbCBuoFdwZJBEUE3QNUA/QCKAPgAloCqgAUAAoABAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAQADAAsAFAAeACcAMgBAAF8AgQCVAKAArgDDAOAA7QDdANEA4QDpAOQACwEXAfYABgETASEBLgE5AVoBsQHiAfUB9gEJAjAC5gL2A5wCdQKMA+sDbgNeAxMEdgVJBj0HJwjtBsUHWQdTCcEKTwuJC2AL2ArDC2MMQgsCCuwJuAkPCf4IYwogDKsLlwrnCbUJIwlpCMgH2AZjBvcG5QanBiAHUweGBy0IbgiqCfkK3QrfCoIL7wvgCrgJRQk3CAUJpwlmCKsHUQcPB7IGcgZgB+cGOwaNBD4EjgPiBHcFdQTNBNoF1gTZAu4C+gGyAY0BHwGxAC4ARwAcAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAgAJABEAGwAnADEAPgB1AHcAfgCKAJQApwC/AN4A/ADhAL4AvwDOANkA+ABKAVIBegFQAVoBigG+AaoBrgHIAfgB0gE4ArMClQOKAqwCFgP4AsMDfAQlBUQGDwc+CFwHJgbYBpwGEQiICcsKOAtiCuwLtAwcDcgL6woWC/EKhQnkCT4L4wvmC6sKkwnECHIHPQftBjUHmgaeBmoHXAf9BsIHWQi5B7gHaQnMCW8JYgpcCpsLKQuuCtQJYQkWCoMJ1QhnCBMIlgcZCL0H4QekBUcESAPHAs0CYwNqA90COQRuBKYDKALdAcoAdQB+AKsAmQBKAOEAqQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAABgAMABUAHwAmACoANABTAGgAbAB3AIsAnwCrALQApQCrALsAxgDWABIBBwEZAUoBVQFRAWwBWwFgAYsBpAHFAbcBHgKkAnwDdwJFAncCgQOTBEQEXwVuBdQFCgcrB6oFvgUNB4sIOwrHCkMKuwnlCp4L6AxJDBsMewtiCrIJ9wkNDAkNBAt2CTQInwcNCOII3QcHCJ0HxAZaBwsIaggrCegJVAnmB48IwghtCWYJ/wmdC2cM3QpNC9gKIQoVCnQKfAlvCZcIcgipCHoGgwTpA9YE1ANbA5MCaAJgAlID3QLxAd4AqgCZAQECqALiAiwBnQCfAVwB/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIABwAOABQAGgAgACsAPQBbAGgAbQBsAHEAfgCLAJcApACwALwA2wDiACQBSAFpAY0BbAEzAUEBTwFfAXYBdAHPAUEC0QK9AwYDpQK2AsICDAR8A1wEQwTIBSMHnQW3BN8FowfHCNMJMQnzCE4I5Qn0C3cMqwzEDEIL5Qo8CgsKzAtHDdoL1glTCDIJ+QkECgEJ8giTCIgH5QY2B6AHiQjXCUgKtggACEMIuQiDCf8KIwy+DBIMxQz6C0gL4gsjC+oJHwkUCOQGSgeKBfwEXgWoBUsGzwQQA4ICOQJaAmYB6ABWAdAB0gL5A/cELwP7ABwCFwMhApwA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMABwAMABEAGgAlADAAYwC1AGQAXgBpAHUAggCOAKoA0gDPAAwBNgEhASgBbgH3AQACkgFhAWQBjAGZAZ4B2AE6AgAD5wPPA7UDYgOUAs0C+ALUA48E/wWKBuMEwgS+Br8HxwhTCTEIiggICEIK1QpjC2gM4AwbDDwMhgtSCiELiwwADA8KQQkmCysM2Qr/CWsJvgjNBwYHhwdbBz4I0Aj2CdQJLQnPCHQJdwrQCl4MoA1+Df4Mkgx4C+0KpgrPCZoILwdxBowFKgWeBugG0gYWB08G8wMyAp8CbQERAWUByAE0A38DXQSEBd8DqAFbAkADIAN5Af////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAMABwANABcAIQAsADoATABNAFoAZwBzAH8AkQAFAZsBMgE0AYYBpgFNAXUB/AGMAiICsQFqAXUBYwFvAbUBPwIMAx4ErQSQBMQDegMNAwIDKARKBT4GNAZhBP8EMQe6Bq0HfggtB5IHsAdGCckJkQrgC9kLzgoxC+IL1ArMCkwMfAymCpgKQQwLDPwJpAgdCLEH2wdRB20I9gdnBx0IsgjmCTcK2AkWCYUJ+QpEDEENpw2bDA8LLwsJCqcJqAh8CH0HfQaBBXAF3wUZBpUFGwYmBhYD0wGPAccBaQEVA8ICzwInBEgFQgbGBOYDVQPRA/4CTAH/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAACAAYADAAUAB8AKgAyAD8ASgBVAF8AaQB0AJUAHgHjAaYBSgFtAa4BjwGFASgC1QK2AiwCpAFsAVEBQQGNAQkCjAKxA+UDLQRKBHwEWAOmAlgDvgOeBI0F4APmBFIG8QX5BqYHOAaHBjUHFQj7CKgKyguBCnQJqAqBC7QLIgt1DB4N6gtwDL8MQAv6CQcJUQnJCFcITweaCC0IkAdICAgJdAnaCIcJvQmmClwL9AsfDSwNnwuGCgUKGwpvCaUIOgijBz4G2QWdBF4EugSxBNsEswVkBM0CSAJfARUDAQRSBBYDNQQWBesFyQUzBVYEfQQFBMMCCwH/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAEAAoAEgAcACQALQA5AEMATQBVAF8AaACnAPsAhgECApIBewGMAawBqwHlAR0CkQKqAvYBZgFNATIBfAHHAYMCkwPGAvICjQNoBM0DCgPvAhkDZQMmBKYDbQQOBRwFDwdVBo0FPgeUCLMJHgqYCUoKQglMCR8LmgsPC2gLyAsFDZoNbw6QDUsMJAtBC38KbgkOCGoHOQizCBoIzgdfCEgIZwdACP0IVApdC5IMCg3aC7oLlAqNCWEJYAgOCPkG1wYeBkMF1wMyA00D0QMmBCsE1wOGAnsBqQFdA4EEWwUgBd8ESgVuBbUEPQSFBGQEwAOuAiIB////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwAHAA8AFgAeACgAMgA7AEQATABUAGEAmgDWACQBtgHrAXsBZQF6AbEBmQExAjUCzwJBArEBPwEqAZEBAgLLAu4CKgJDAmIDOgT0BD8EqANdBPID9APkA6cDrwOJBXkHCwdkBR0GmQcsCVMJYwhJCO8HqQlCCr4J6QmcCxwMEgxzDBoOSA2QDIMLFgtAC8IJXQibBxkJngmMCL8H4AfHB4AG4Ab1B84IzgmCC0MM6wrqCS0IeQeoB48H6gfZBqoGNwUPBI4D/QJsAokCOAMUA6ICHAI8AkECPgPOBG8FWgZJBn4FmwVxBH4D9gPQA6QCEAIYAf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAABAALABEAGAAhACoAMwA7AEIASgBdAIwAugDnAEUB2gGbAUQBUAFsAVsBfgGsATUCegLuAU0BJwFlAeMBZQLeAaAC9AKzAr4DwgS3BJgEUQWsBTMGYQXXA/AE4AW3BuwFBQXjBfgHgQhWCAoI1AaQBwMJ8AhRCJcJNgsUC5MK6QrjDKANvQx+CzAKXAnrCAEI9QeRCZwJLwgcB4UGqAbIBR8G3AaAB8MI1QpSC8EKmgmlCMAGcAZdBs4GYgVhBYkFFAT3AhwDBQNIAgcCEwIYArYBLQLjAtcDpwRjBS8GeAXJAyUEsAMRA7UDVgOuAq4BiwH//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIABgALABIAGwAjACkAMgA5AEUAaQCFAKUA4QAXAZIBsgFAASoBUwEwAQoBYgHbATMCyQFXARwBZwEQAvcB4wHqAmsD8QIzA7cD7AM1BC4FOgaXBjEFCwQbBGAEiQRTBOgEeAWfBt0HVQfBBjwGQwbDB1sHbAjKCe8JWQmiCMcJPAuSDZUMMgsYCkYK+AgbCaEISQnkCf8INAcGBoUFUAW3BYkG0gfRCGQKXQqICokKQwkPB7kFaAUtBc8EFgRSBEwDvANzBC4ERQPeArQCEAJlAogDCQMLBGIFdwTGBN8D6QKfAycC8wEvAjkC7wF9AZsB/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIABwANABQAGwAiACoAMwBFAGAAfADCAL8A7wB8AXABVgFEAcUBNQHwADYBqAFJAkMCjAEOAUYBvwGNAegBvgJmA2oDAQTqBO8EGgWLBGgFiQaCBmAFQQQqBG0EiASCBIwEGgWeBkwGmgUUBg0GQwarBrQHiAj8CKgImgiyCqkLGA31DMcLhgtcC4MKrArLCVcJ2wmvCCUHQgY3BdAE7wXHBkcHdgeWCL8JLAkJCo0IKwd8BpwFUQUrBRsEgAP7A6sEhAUqBY0ENgTsAiwCRAJYA60DFwRHBF8DHwMlArwBHAJOAeMA6QBzAQUBzgFwAbQA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQACQAPABcAIAAmADgARQBUAHkAugCYAMYAPwFzAUcBKQHKAUYB3wADAXcBIQINAoMBCgExAWoB6QGZAuQCDwOkAuQDkgXGBRwGlAUsBSIGHAdeBqEFigSmBCkGjwV/BQIFuwX8BWcG4QfJB6IHPAeqBikHUgevBxMJwwl4CgoLEQy0DMcMCQwNDNsLHwsPCpEJugfLBrwFKwWKBO0EKwZXBkEGoweTCG4IlQmqCH4IkQcyBlEF0gTeBE4E9AQxBWIGfQV1BHIDsQLHAnICfwK1A5oEowPEAi0ClAFiAVEBmgHeAdwA1ADBAEgBtwDWAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wUACwAUABoAIgAvAEgAaACJAI4AgQCwABABcAFAAQoBtwFbAekA1gBHAdkBJQL3AVIBEwFrAfIBTgIXAvgBqgK/A0gFAwUKBbAFFQYcBhgHigeQBl4FlQREBk0HDAdyBf8ELAXBBeYHgQm8CH4ItQcOCEUIvwcvCB4IvQgaCr0LRwxBC68K/AoUC78LUQvuCRsJywcNBzEGoAQ4BBUF9wW5BeEGYAeEB1YIKwk0CBQHBAZPBWYFBgV5BRUGqAVgBqMFKAQrA34DlgIWAz0DNwOJBMgD3ALtAUECdgIRAjUDhQLCAGwAlQBWAGUAugAPAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wcADgAWAC8ARgBQAGoAhQBgAHUAmADbAGEBMgHrAHcBawHjAMYAIgGpAfQBkwGpAfoANgGBAWwBvQGSApMCbgPWBOgDwwOvBBgGQwZLBygIEAeUBb0EggW8BloHQAa4BTgFUwYBCCEJ0QmRCcoIkwlHCeUIhAm7CUAJqgp/C/ELxQrCCVYJuAlKCosL6AnQCA4H2QapBTsFBARzBJAFBgWXBecGtwZOB3cIcggMCAkHoQZEBh0G7gX0BroG5wUUBe0DtQQwBAgDswPbAw0ErgRMBC8D9gH5Ao4DsAKGA6gCQgK2AYcAcgBaAGYACQADAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wYADQBGAEEAaABvAGwATwBvAH8AyQBEARgB0gANAToBuAC/AOQATAGEARMBVwECATsB5QEnAqkBcwJ+AgYDxgOuA2EDHQVtBaoE2gV+BksGyAWABcgFRwaGBkEGDQYMBqEGkQeVCNwIogkXCkEKMgpGCj4LNAsfCowKSAySDCoMCAuDCWoIcAkLC8EJ7QfkBvgFAwaLBYcEoQNfBHoETwULBhwGRAcVCDgJeQjsB3wHWwcrB+EGdgcpB+wFxAQJBTIG5wRfAwwEfwTcBC4E6gMgAwAC7wInBKED1QN6A/UC+gGEAe8AHwAPAAsAOAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAYANQAwAE4ASwA4AEQAYACLAOQAJAEEAcAAzwAVAZwAmQCcAMUA+AAWAeUAAAEYAaQBXAKoAbEB0AH0AUoCXALcAokDiwOVA/cEqgXVBcAFtQXYBRIGNgYyBi8GSQaWBvIGZwffBxgJrAniCBEJ3wnMCp4LwAu6C1YM8wvvCjMLUAkaCJYIxwlmCmYJzAdmBl8FoQQ8BMoDbwNeBGcF/wRuBfEGTQgKCUwIxgfzB2YHFwf6BukG+waeBeAE4AUsBgQFwwOiBCcFjgQXBCoDjALHAvACdATDBKoD3wIoAuwAsQB7AC4AGgAXACIAbwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8DAA4AFwAZACgAOgBDAFwAggCzAP4A5ACtAK0AwQB/AIgAkADuAH0B4AF9Ab0BKAFhARICJALvAUgCRAIMA3UDzAIrA3cDewPBBGAFnwWvBbkF0gXzBQ8GIQY0BlIGewacBsAG+Qe2B30IVwgMCNIIXwnkCekKvQsLC+0K/wm8CfoI+Qe/B7QI9AkZCrwIJAdSBogFGQWvBGwDagObBCAEugQ8BqAHvQhuCCkIgwhCCDsHwwbXBZ0FeQW/BXYGhAanBWMEwASSBf4ERQR0A3sD9QPVA14ERQVRBIcD+QL3AUUBtAArAM0AvACkAB0BYQH///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8EAAkAHQAhAC0AOwBRAGgAlwDBANQAmgCYAIAAeAB8AIEA4gA4AdABLQIpAnUBJgGJAfQBNAJ3AtEC1gOUBM4D2AMABdEEMwV2BZcFpQWwBcEF2QXzBQ4GLgZSBmYGGQZyBqMGAAdWB0UHVgcVCJQISQkRCoQKnwlFCggKOwnICM8HGQfYB20JkgrwCc0IeQfpBigG/QQJBPcCZgM0BDgFMwYJBzsI8QflBlwHQgg6CBAHJwYOBncGkQaSBvMGTgX0BCgFpgV3BbEE4AMRBOEEZgQCBdgFjAUWBbAE9wPYAm8BYwC7AR4CugFcASgCVgH/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAALABMAFAAhADUARQBgAHcArADMAIsAlQBtAGwAbwBzAKsA1ABIAe0BRQLTAU8BYQEtAt4CsAKlAnQDqgQTBeUE6QXiBcMFrgWiBZ4FoAWrBb0F1gX2BSMGYQa0BhgHwgdhB2AHZQd/B/8HIwm3CVkKJwplCY8I1An7CssKWQoRCT4HSQejCGUJaAlYCWMI1QYxBcAEfgRmA/sCOgRJBfUFpAaYBvwGsQYwBrMHPwhHB4gHvwY+B5IGaAdiBqcFdAUZBlQGwAU+BdkEAwXqBSoFMgV+BRQGiAQnA24DtgGUACcBBAL8AvYCbgJMAQIB////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAAYABsALgAvAEoAWABwAKEAnQB3AI8AYABhAGQAZgB9ANMAIAGtAWMCPgKJAVgB0gGXAtUCVANYAz4EYgUHBtoGPQdKBtwFpwWPBYgFjQWbBbEF0wUHBlsG8gYvCMAI1AjJCCAJ8AiRCB0J/AnACtIJuwgaCEYJaQqmCoEJYwhuB24GdwciCK0IswgGCUsHJQYXBmoFHATgAnQDNwTuBUkG/wW3BfIFyAW7Bq0HxgYoB6AH9QfLBqMHIQfPBpMGwQbxBvMG5AXhBTkGiQZ6BRIFSgUNBRIErQFbAesAUgF3AkwD9wJHAv0BHgH//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIAEAAgACMAMQBCAFQAcwCbAIUAawCOAFkAVwBYAFsAYQCwANAAUQHxAW4C/wE2AWUBxAGiApsCEAPkA1QEVgUGBlQHTgbPBY8FcQVlBWYFbwWBBZ0FygUSBokGXwfeB10IDwg5CKQIjQhmCaQJ2gnUCYUIfAe8CGAJzAkRCvQI/wehBhYGcwd4B5sHWggbCMgHdwatBasEKgOzAu4DWgTJBVEFDgXnBMcECQZjBrYFvQWXB0sIkQcFCLEHTgeFB2wGwAW5BbQG7wVKBhsG5gQiBH0EeAN/A3wBhwFHAUUCqAOaA+cBDQHWAGoA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wkAMgAwACoAOwBYAHsAcwBeAGwAnQByAE0ATgBQAFIAhwCJAOwAhQEeAggCWgEVAaYB7AFGAvMCBQPAA0sEBQUfBsoFgwVWBT4FNQU1BTsFRgVYBXMFmQXABbwFWQZhBgAH2AbgBp8HrAjyCNMIzwgCCCgHTgj5B44IagnFCTsJIAg9BvIFPgZLBw4IlgdeB/EFywShBIoDbgLQAjIEiAVqBWQEMQQGBSQGhQVHBMoEfwYLCOMHJwjGB1EHrAaEBZkEgwRoBcUE+QQnBUcFewP7Aj8C1AGdAesBEQPyAQcD4AM7Ar4ANwAUAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8EADMARgA4AD8AVQBJAE8AXAB2AKoAngBqAEQARgBJAGsAWQCjAP8AnQF2AagB+gAkAZ4BwQKuAooC+wKNA3cEsgU6BRwFCQX+BPwEAAUDBQQFCAUSBSAFIQUEBbkFuAVoBrYFPwZRB34I+QdkCEwHHQe0BlYHGAjdCAwJJgkKCbUIvgdKB7UFsgYeB80GLQf2BkEF+wOUA/UCWQKVA+YE0wQVBJgDbAT2BCsEawNsBOcE2gbeBngHRQd6BuMF+AURBQQEdgScBGYEPQQpBaUDbwLrARIC2AIqAxwEvALxA2UDqgG0AJkAUAAgAekA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8lAGYAUgBIAFEAOgB5AGIAaACwAJYAlgBFADoAPwBgAEcAaQCrAP4AiAGxAQIB+wBvAUAC2QIHAlICEwPuA9gETgSqBLIEswS/BMoEzAS/BLEErgSyBKIEYQRtBH8FLQVzBf8GLwhtCIwHdgdCBk8GAwgsCHIItQjjBzwI6gj5BzcIdgehBVgGzgamB1YIiwf8BSEFswTbA0oC3gIOBO0D+QMAAxQD3ANGAwEDkAPDBAcGIgY6BvQGUgYbBeYEbQRIBLMD0AS7AwIE9wSPAx8C3AIOA7IDmATaBFoD7AN0AlEBKgFwAcEA5gFdAsoB////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////EABIAEcAZwBfAC4AUQBDAGIAiACOAIgAQQA1ADQAVQBUAFsAawDaAEoBpwE1AdcAUQEVAtMCLwLNAZoC8wLiA6cEiwRkBF4EgwSdBKMEfARRBEMEWARSBK8D8wNKBL0EBQanBoIHJggtBysG4QUbBwwIsAgVCYkI2AYjB0wIGAj1BgsGJQXjBWsHIQjcB1cHgwadBaADBwNrAmYCvgJRA9ID4wJjApsCxwLKA/wDZwR+BUIGNAUuBsMGzwXSBBoEnQNXA9UD+ALtAzoEWQO9Av4BCAPAA74EVwRtBIQEUgNaAokC9AG4AbkBsAHiAf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQAGABQAI4AawAsACgASQBjAIQAggBnAD0AMAAsAEkARgBNAGIAkgDVAFMBegHkAOMAZwFSAm8CmgHSAcMCPAPJA3kE8wPgA08EhQSnBD4E0QO2AxgEoATABBwFQAU6BbAFfgbgB1IHOAaaBaYF/AbhBl0HvwhCCLwGKQb8BkgHKgdJBTgFlgUfBpkGeQcxB5MFqARrBAwEkwM+Au4BYwJHAwwCXgJJAlYDlATeBIcEdwSXBcgEcwXiBZwGpAU9BeAE6gNHA90C0QL/AqYCOAI3AocCFQMwBDkDSgSbA+wC5QIbA0kCzAHoAKwBLQH//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wwANgBuAFgAIQAvAE8AdgCEAGEATAAyACwAJwAqAE8AXgBmAGAAjwD2AFIBOgGtAAABsgFTAhQCbgEvAkUCcwNbBBAD3gJWBIEENwUEBAADrAKxA1cFRQYmBmcGVQbeBg8HtQeYB8cG/QX9BLsFlwbqB9wH7QesBrIFUAWXBQQG5gQpBbQFsgZwBvEGSAefBhwGvQVABDID9AIwAsQCkgLQAQQCjwLoAzcEHQRCAxwEGAUxBPYDmAQmBawEGAQFBTwEcwP9AlADvgJFAvgCGgNRA74DoQOCAoUDTAMIArUBawJkAQkBdADiAMEA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8FABoARgBUAB4AGgBHAHEAcgBhAEgAKgAnACQAIgA3AD4AVABeAG0AmAASAfoApwDXACoB9gE9AkcBbwEEAj0DjwNzAzsCIAOoAxIFagSxA24COgOoBOAF0gTEBAIF4QWdBmUHcAdoBqEFGgXFBPcFeAe7BlcHuQfNBgcGzgTbBG4FiwYaB9YGfQfxBs0G6wYqBvsEuQMQBB8EcgL4AUwCkQEDAjgD2wMGA+oCAwPmAxUFIAQ9A8oD6QNxA/wC1AOVA4gCBgIjAxwD2AJRAwwD0AIsA7UC/wF6AqgCIgIlAf0BCwFhADsAXgB8AP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8gAEMAWAAWACQAQgBIAEAANQBnACsAHwAdACMAOQA4AD0AQABOAHAAkgC0AMMAvQD5AHEBQgKsASkByAGBAo0CGwNAAroCVQQbBckEzgOHAnsCGAT7BJIDmgTyBYcGYwexB8cHagetBgQG6wQHBRMGrwVmBosHGQbABMgE6gU4B/QGNAiRBygIPghuB+MGlgUkBS4FuARmA8ECEgLhAZ8BbAErAg0DSwJiAmYDxQTCBKAD1AKtAtgD6wJSApACDwPxApAB+QEDA9IC/AEYAgECXQPgAtQBmQGrAUgB2gBHAQ4BxgBMADcAQgAOAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////GgBIADsACAAmAD0AJQAiAD8ATQAfABYAFgAnAE4AVABlAFgATgBJAGMAmQD+ANwAqAAAAfMB1AEWATQBaAG0AQkCzAFeAiEDEQRDBXwEEANGAqEDDAQiA4QEqwUcB8IHxgbmBrsHpwchBjoFSARXBBAFXgbfBhUGjAS1BHsFrQbZBoIHrghYCPAH1wdSB6AGrAYXBrgERAQkBHEDIQOrAooBUQHKAcMBFAOWA1EEtgNcAyIDeAIwA0kDTQLSAcAC7wK7AWcBAQJbAlABUgEAAuEC4wIgAiwB1QDMAJ0AyAA7AU8AGAAXAA0AAAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQAJwAaAAUAMAA7ABQAHgAiAA4ADwATABoARABWAEwAZABYAGYAQgA9AGMAgADHAI4AwgBuAfEBAAECAXoBawGNAZ0BiQKZAw0FHwXqA8cC/QFTApMCxQIpBB4FNAabBicG2wUqB8QHlgZiBTsFGgQ4BOQE5AUmBUwEYAWiBY4FOwadBzIIRgdxBkEGiQd/B3sGjAWjBVgFnQTuAw8DRQLBAUoBNQGZAaMCpgLkA3oDAANGAloCUwIPAn0BgQFzAlACXAEiAUAB0wEFAdYB+wFpAQECvgG3ATsBAAGtAHUArgApAFUAKgAAAAQA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAAFABQACQAFAAcACgANABMAHAAoADcAQQA3AEgAQgBFADwAJABDAEkAawBpAHoAxQCNAYsB3ABuAU0CEQIeAnsCjgMxBbcElwOOAmoCJANxA2kDTQOXBLUEPAVZBcoFFge3BisHCAc3Bj0FTATWA9wE/AQ3BAIGRQfuBiIH9wc1B6oGJQU7BYgGdwbTBrMFHgXKBbsE1gNNAxMDjQLwASYBHAGdATYCgANLAysC7gEMAnoC8wEwAcwB3AF9ARgBswARARUB+wB5AVABpAAmAZEBLgEYAaoAxAAyADgAIAA+ADYAIwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAABAAMABgAIAA8AGgAmADkAPQA+ADoAKwA5ADYALwA4ACYANwBNAE4AWQB+ALAA8ABaAcYAFAHvAZUCTQK2AjAD4wPxAy0D6AFYApwCHgPsAzUD3AOgBI4EfQVzBicG4wW0BtAGeganBVYFKwTDAxYEyASHBaoHNAgNCD4IZgf1BacEqQQDBWsFrQZYBsUEgwXUBfEElQS9A84CtgGwAQ4BYAHfAeQBLwI2Aq8BVQGSAXgBXQFbAuoBFwHfAKgAmgCaAMAAsADMAIwAigCBAJAAbwA3ADIAEwAMAAgAAwADAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AgADAAYADAAXAC8AOwA5AEoARAAtACEAJwAcADEAOQA2ADwAOgBeAH0AhQCgALIA8ADMAN8AUQECAqECQwJFAs0CGgPdAgcCsAGkAcUCFQN6AzEEjgXrBWwGxwW4BBYF6QXPBcYGAAY9BfcD5gPgBAYG5QZoBw8H+gapB0QHRgYpBfEDqQMIBccFyQWYBFUFsQWCBWgEAAPkAYQCpgKOARYBXwFVATUBeQE1AQYB7wA6Ab4BLwI9AoYBbgEmAZ4AcQC0AKgAVAA3AFAALwAsABAABgAJAAkABwAEAAIA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BAAGAAsAFQAlACwAIgAqAC8AKwAcABcAHQAtAFIASQBeAFUAXwBtAGkAdACNAJoAwgAaAToBXgEUAkECygEgAqgCeAP/Ak4CcwEOAhEDOwO0A6cE8gV/BVIEbATdBL8E5gUcBgUFRQSNA/gDigUPBrQFbgW8BYgGzwYrByIH+wUpBYkDqAMkBGcEVASQBNsE4AS3AwIDOgIQAxgDlwJwAQoB/ADkABYBFgG+AAcB9AFjAm4CZQL0Ae4BVAGmAFwAUgB0AKQAPwARAAkABAADAAQABAAEAAQABAAEAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMABQAJABEAHwAkACAAIgAiACoAIAAMACAAOwBDAF0AZACHAHkAZQCCAHoArgCfABMBTQEbAREBkwEfAvABtwHmAVwCbgIvAlIBAAJAAjgCOgNEBBAFCQVfA4cDRwQoBUYGJwYcBkoFwgS4A6oEIAToA+QD6QSrBBwFLgZTBroE+wM6A+8DEwRoBA4FjwTIBIkEHwTJA7sCygK0A2ICpAHIAfQAxAC4ALoA1gAQAWwBXgFnAc4BZQEIAQIBxAB+AEcASgBNACIADQAJAAQAAwACAAIAAQACAAUABgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQACQATABQAFwAlABUAFwAPAAsACQAYAC4AUABSAFEAcQB8AFsAegBiAHEAhAC3AMgArQDsADIBbwH2AWIB1gHLAZUBlQE6AYgBUQLcAn4DuwMOBAME0gLGAyIF1ARDBQ8FXAWyBVkEaAMfAwsDDwMyAyIE5wNJBO4EHQXaBEYD3ANIBZIFyQUXBiYFMQX+BMMEhwSuAxUD0gPQApwCdwKUAeQAswCqAOAAvwCYANQAmADJAMoAXwCtAK8AaAA8ADQAKgAcAA8ACQAFAAIAAQABAAAAAgAGAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BwAHAAkADwAJAAIAAwADAAcAFwAqAEkAQQBXAGoAbwBfAE8AVgBUAGEAgwCbALYAwwDrAPsAXwE7ATsC8gEmARIBEQEiAhkDjgPxA8gDMQNLA7wCwgL6A4sDawTOA+4D9wQXBTkErgOfBMED0gIBA+MC/gJDA9ADjwR0A64DUAVCBUQFMgbgBXQGhQbJBYEF3gSFA28EbgPSAtgBSgFlAeUAoACPAI4AfgBwAGIAXgBRAD0ARgBWAC4ALgAqACQAGwARAAkABAADAAIAAQAAAAMABwD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEABAADAAMABQAGAAgACgAPABwANwA1ADIAOwBLAG0AUQBnAHsAbQCeAOcAxQDUAOgAUQEdAqkBJgFoAVUBsAGdAjwDjQOyA0ED/gKZAioCYAP5AusC9QJiA/MDgQVHBVUEFAUrBO4DWgNgA5QCZQKvAuUC0AJ6A9ID1QM4BFUFvgYnB6EHDwfRBsEFfwSLBDwDKAICAioCDAJDAecAqwCAAHgAbABfAFMASAA9ADMAKgAiACAAHwAbABUADgAIAAUAAwACAAEAAQACAAYA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQABAAFAAUABwAKAA0AEQATABkALABRAE0AUwB5AFQAVwBrAGAAWwCDAKkAvwDXAB0BkwGrAf0ACQIdAr0B1wFgAqMC8gL5AiUD+AL3ATcCfgK8AsYC9wOLBPoE+AU5BWoFfATwBJwEmgTaA5cDTwJgA8sDvwNvBG8EVQWzBIUFNAaWBu8FbwbYBv0F5wQfBPkCEANuApoBOgE0AckAsQBvAGgAXgBTAEcAPAAyACkAIAAZABUAEgAPAAoABwAFAAQAAgABAAEAAQAEAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMABgAHAAkACwAOABEAFwAdADAAgQB4AG0AfQBgAFwAVwBgAG8AWwB8AIwAngCrANgAEwHYAJsBDAIJAmcBhAE4AkYC+wHrAZMCnwK/AX0CzwOBAx4EKgWKBQsGtQYSBqsFfQVYBQUFsAScAz8CGwOiA3IEcgVDBVwG0wX2BUYGHAa7BI4EogUZBicF2wQOBFMDWAIWAtYBnQFlAcsAjQBhAFkAUABFADoAMAAnAB8AGAASAA8ACwAJAAcABQAEAAMAAgAAAAEAAgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMABwAOABEAEwAaAB0AJQBCAGMAcQBoAHsAdgBdAFwAZgB4AH8AbgB5AJsApAC+AMEAqwDsAGYBvQE2AQ0BoAGSAToBYgFrAaYBQAJAA9IDdQRYBNEDZwRwBR8GKgbBBdoFhASTA9wCSAJLAkgDbgSBBCwFXwY+B5IHNQcnBmgGPgXHAzkEXQX8BFEFygTMA4kCFwOEAmICJgEQARQBlABiAEkAQAA2AC0AJAAcABUAEQANAAoACAAGAAUABAADAAIAAQABAAIA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wkAFQAdACUALwA0ADsASQBRAEgAWwB1AIUAjQB0AHIAegCKAIMAiACZALYA1ADDAJgAswDKANEAwwD1ANsAFgFfAS4CpAF/Ad8CcwPEAzoE1gMbA9kDZARjBfoEYATaBDsEggOKAsYCeAP8A6EF4AUNBfEFrgarB3cGHAV6BfIEiAP1AzAFpAQDBVIFNASOA5gDgwLWAZcBDgKQAQABaQBkAD4AMwArACIAGgAUAA8ACgAJAAcABgAFAAQAAwACAAIAAgABAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8LACgAPQBBADAAKQAmAC4AKgAxADgASABJAIwAjwB9AHQAewCJAJIAnwDdANEAoACNAJkAoACiALwA3gDvABkBqAEKAnUCkAHTAVAC7gI7A9QCuwI7A8kDpgQ4BUIElgMYAzQCTgLLA7cEswTmBVQGHgZCBpYGlgYXBpEEawTEAx4DogOYBLwE9gMgBHQDewORAw8DIgOYAvoBpwH5APkA2wCoAGIAJwAfABgAEgANAAoACAAGAAUABQAEAAMAAgABAAIA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8aAEEAOgAbAA4AEwAWABkAIgAvADkASABzAHEAggB7AHwAhwCRALMA3ACnAIEAfwCDAJUAvwDtANQAxwAKASIBkQEcAlYCngGrAdMBHAKIAhEDvQNEBa8FmAVbBeAETAT4Aj0C+wMEBTMFQQUGBXAFEAfcBkUFhQS+A5UDOQNwA8MD7ARCBW8E2gO1A9sCJQOSA68DAwP7ASYBlAGzAWsBEQGVAEkAGwATAA8ADAAJAAgABgAEAAMAAgABAAEAAQADAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8LABYACQAWACYAJgAmACsAMQAzAE8AVQBhAHAAaAB7AIkAoACrAJ8AkAB0AHYAlACwANwAQAH3ALYA5AAPATIBYQEUAncCXQJQAioCfQJcA0oEbQWvBUAE3wOwAzYDNgLdAjgDQgOSA3gD3APiBEgGTQagBcEEpgPLArACqwNqBBoFUQVJBMUD6APXAuwCSAN+AxEDJAJQASgChgIeAoQB/ACTACcADwANAAwABwAFAAUAAwACAAIAAgACAAIABAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAkAFAAZAB0AKwA7AEYAPwBQAFEAWQBTAGYAigCTAKUAvACaAGwAaQCNANkACAEGARIBGwG7AMIA5wAiASkBagH5AYsCywLAAnAC8ALOA1wEpgV1BGsD9QLLAiEC5wF4Av0CRgOjBEoF9gT2BfAEnwREBX0EggOdAoICRgP7A54E4gNuA2ADwgKWAjQDIANaAt0BwgEeAggC9AEPAV8AKgAQAA0ACgAKAAgABQAEAAQAAwADAAIAAgADAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAEABsAJQAxADoATgBZAEoATQBGAEUAYAB+AI0AoQCnAJYAdgBeAGsAygAjAREBTgElAUQB1QCdAMQA0gAqAQcBaAGuASoCUwJJA2YDuAMXBBEF+gRsBK0DKQPvAeABoQObBBgF7AWSBvIFLgbjBLEDDAS3BE0EjANXAn4CxgP6A/cCGgN6AnECkgKgAmcCKQL/Af8B2wGDASsBzwBNADEAHQA8AAwACQAIAAcABgAFAAQABAADAAIAAwD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAgAOADMAPgBLAFAAVABFADQANwBEAGoAegB/AIwAhABuAFUAXAB/ALgAWgFsAXgBfQE5AfsAlgDJAM0A9AAZAQYBIAFWAewBcwLAAkIDdASsBO8DsgNOA6ICxgG6AfkCJASQBDAFfAaKBjUG0QQVBAwDFAPTAy0D3QL/ASsD+wJBAo4CUAKTAtQCugLaAtoCawJqAj8CGwLjAWgBvACzANgAogAaABEACAAHAAYABQAEAAMAAgACAAMA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAEACQBBADgAPABPADwAPABgAGYAYgBhAGAAbAB/AG0ATwBRAGMAfgCmANMA7gDsAPQA9gDPAJQAqQDGAMAACQEdAQ0BJQGKAboBNALTAkEDvwNZA7sCUAODA9ICpwE8AgcDrwPCBMgEyQSmBaoFdwT5A/4CbgJAAgQC0gEnAj8CSwKRAusCSAMiA34DeQN6A9ACvQKvAqoCWgKhAXsBdAHMAH8ALAAZAA0ACAAGAAUABAADAAIAAgAEAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAUAJwAuAE4AYwAyAFsAdABuAFwATQBHAEYASwBMAEUAVgCEAH4AjACmAK8AsgC3ALEA3gCuAJkAtADWAAoBlwGgAUEBTAGUAbMB/gFQAt0CIAMkAkwCowLcAp0B9gGjAukC8wInA6UDaARRBccF0AShAzEDmQLhAUoCYgPsA6sDdQN0AyIEmgNVBFAEJQQiA5IDVwMaA7ACvwElAeEAbwBZADUAIAAZAAsABgAFAAMAAwABAAEABAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEAAQADAAgAFQAoADQAIAA0AFEARgA/AD0ANQAzADUAOgBCAFoAigCrAL8A2wCrAJcAogDIAKcAggCZAK0A4AAUASoBnQGzAdQBtAFgAYYBAQLxAZAChgK4Ab4BdgLSAUMBzAH3ASsC2wKSA1gEEwX8BckFQgReAwsCwwG3AiEDbQTlBIEEXgS3BDAE0AQTBZwEGQThA/oCSQJrAT0BXQEvAQ8BAAG5AEQAKwAbAAUABAADAAIAAQABAAMA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEABQAFAAkADgARABUAGQAgACgAKQAoACcALAA0ADgARACSAI0AqgCjAK4AyQCJAHwAdgB5ALAA0wDNAOQAOgGtAZABMgF8AWQBcgEvAUsBUgFdAT8BMwE/AbMBVAFCAVYCnwLCAgoDnwM2BJgE8QRRBSUEMQNRAvABowFwAoED+wSfBOoEIwUuBIIDMASzA+MDpwNgAvsBOAKcAngCIAK+AYcBwwB5AFMAXAAHAAMAAgACAAEAAQADAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAQABAAHAAwADwARABIAFgAZABsAHgAmACsALwA6AHoAkAByAHQAYwBlAF0AWwCFAKUAzAD+APsA/QAAASsBZAGoAf0A7AD+ADwBMQHxAOIABwGsAdcBZAEwAX8BigHIAfABMgJ8AsICogPsA44DvgSCBXkEiAP7AggCDAJyA5YEmwMQBK4EowOmAgMD2QIqBD0EdAOJA5EDfQMQAysCeAEBAfMAFwG3AGoAGAAEAAIAAQABAAEAAwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAMABQAIAAsADQAPABEAFAAVAB4AIwAnAD4AdQBkAD8APQA/AFYAWgCEALQA+gDmAAMBNgEqASsBCgEcARYBKgHJALMAPwFBAQ0BIwEnAQQBIQFuAYYBjgFNAosC0wEKAhEDoAOAA6IDdwONAm8DtQRvBeYE4AOXAp4B5gLhAuoCvwMABDwDLQI7AkwDMQR4AzED/ANiAwoEigPXAlQCvwGaAUoBsQBEABUADQACAAEAAAABAAIA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwADAAUABgAIAAkACwANABEAGAAcACAAKQA5ACwALgA8AEQAWQCtAKIAmgDcAAMBKgE+AUEBMwEnAR4BJAEeAfAAwwCUAIsACAGAAVEBIgElAT8BQAGxAfwBBgK3Ar8CLwLPArgDLQRyA0oCMQJgA5EDqQRfBIYDJAPkAYoBtQK8Ax4EiQNAAhMC/QILBCAEbAN6AtoC+gKbAx0DCgNJA88CIwKFAfsAnAA9AB4ABQACAAEAAAABAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQAAwAEAAUABAAHAAsADgASABcAGgAdAB8AJAA0AEsAbwCPAGoAbACfAM4A2wAEAREB8wAMASQBLAEsASYBAAH3ANwAmgB1AJ4A+QA5ATgBWgFMAU4BewHFASMCtQJTA98CswKEAyUDQANJAusBjALoAlME6gQTBM8CqAFIAecB6AIsA+4CxwFJAnEDWAP0AvwCHgIBAjsCegK+AsUDIQS0A7gCxQEHAQ0BFgHfACkABwADAAEAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAMAAgADAAUABwAKAA0AEQAVABgAHQAzAEsAeQBkAGwAmACdAGYAZwCGAJsAnwCuANUA8AAaASoBLwH/AO8A8gDcAK0AcgCDAMUA/AAeAY0BkQFyAVoBSwFeAQMCZQLGAscC6gJLAvEB1AFoAdIByAJtA7ADCgQHAyUCwwGAAXkBMQI6Ap4BXAGfAbcB7AHsARICpgLwAg8DGQPSA8MDwQOXA6AC2wExAjsCpAHuAEQACgAFAAIAAgD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQABAAEAAwAEAAUACAANABIAIwA+AFoAcgCOAJIAowCeAI0AowCSAJQAjQDYANQA3AD+AAMBCgEpAQ0B6ADpAOoA5gDWAIUAaACaANIA3gCLAe4B0QFcAQwBAgFhAScCQgKnAQ4COALCAUIBKQIQAgsCeAIyA2IDcQOTAwgDWwIjAXABGAE3ATYBAwLhAeoBBgKsAv0CZgNWA2cDjQMUA5YCSwMoA9ECAQOgAjYCdwHnAE0ADgAJAAMA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMABQAHABQAOQA8AEEATQBeAHUAlQCyAMoA8QDvAN0AzQC5AKkApQDrAAUB/QA6AVcBPwHwAOUA5wDjAOUA0gCpAGEAfwDCAL4A4gBOAecB8gGBAf0ABAF1AY0BuQENAQUBJgGpAd8CCQOmAj8DFANQAlcC0gKKAukB1AA9Ad8BOALqAbcC4QKVAqgC5QL0AjYCeAJBAmACngIAAm8CUQOmArkCdwJHAswBhgGwAD0AEwAFAAQA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8DAAgAKwBeAEUANwA+AEgAVQBgAH8AhwCmANwA5QD7AAkB5ADhAMEAygAaAVABZwFHAQsB8QDgAOAA4QDeAMwAvABwAGgAlADBAJ8A0QBYAYgB5gHBARgBxgDNANQA3AApAcsBKQLEAiMDIgPRAhQCLgLEAbABpAFIAdQAOwLZAtMCZAL0AVQCyAHHAUUCkAIFAj4CSQLVAfcB1wGBAtcCkwIBAgUC7AEiAt0BIgHEAJkATAARAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8XAFwATgA0ADgAPQBKAGAATwBYAGMAcgCWALMAzADbAAsBHgEEAf0ALQEiAVkBDwHmAOAA2wDUANUA1gDHAL8ArwBdAHUArgCEAJYAuQDYAEkBigFMAcEAdQGtAe0BvQE3ApcCLgJcAgoDcwKoAUkByAG4AUYBwAAHAfkBswJhAsoBTgEaAm8BUQGAAQgCBAKqAQcCLALHAYoB5AEKAkMCsAH5AUACWgIcAvQBKgEEAcwAbQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////CwAtAB4AGwAhACcALwA4AEUAUQBeAGsAewCSAK4A2gDgANgA2gD2ABYBHAE0AQEB0ADUANMAygDKAMwAwQC3ALAAXQBTAHcAgQCYAJwAmgCGALwArAD0AOABPwKCAvIB2wHqAW0BLwJhApoCIQJmARIB7gBgAQsBmQBvAYoBxQF9AfUAhwEGAQYBRwHaAcQBfgGqAVkCJwLWAUoBdQGdAZYBeQIBAxUDGwNeAoABgAFXAegAUwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BgAMAA0AFgAfACcAMwA/AEwAWQBmAHQAhgCgALoAywC/ALgAvADRAPcA+QDwAMMA0ADMAMAAwQDCALsArQCtAKUAWABiAKkAkgCNAHYAYwBlAE4ApABAAZcBGAKxARUB/ABtAUoC6gFsAq8CRwJhAqQBvwAVAYAAnwDUAJwBIgHpAEoBxQBJAYYB3wHDAXsBaQHPAcoBUQEhAZQBjAGOAaUBEgJQAicDVQPIAjYCxAEbAaYATAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wEABQAHABAAGgAlADIAPgBLAFgAZwB0AIMAkACbAKwAywC9AKcArgC4ALwAyQCuALIAtQCxALEAtQCxAKUAowCiAGsARABgALoAjwBpAGoASwA8AGEAhwDFAPsAFwG5ANoAnAGvAVgBvgGJAgwC3AGYARgBogCIAMcAsADHAPYArgDIALcA9gAyAScBZAGZASMBvwEDAhYBQgEXAnQCCwIoAugBMwLPAtACBQPcAlACxQHBAF8ALgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wgAEQAUABsAJQAxADwASwBbAGsAegCGAI4AkgCaAKAAnwCUALIAvAC4ALYAogCgAKQApwCnAKoAqwCdAJsAmwCOAE8AQwBbAJgAoABXAD8ASQBqAHYAlQClAHkAdgCwAOQA7AD6AJEBTwLeASQBQAGKADsAewB5AfwBMAHsAMwA/gCjAPcA5gD3ACUBowE5AUUBSwH9AAYClwIFA+ICxQKTAlMCSAIPAoMCYQJbAhsCqAFYAbwAjQD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8EAA0AFgAcACMALQA3AEUAVABnAHYAgQCFAIAAegB9AIMAmgCrALgAxgDOAKUAnACdAKMApQCoAKoAmgCUAJQAkgB8AFMAOwA7AJUAvgBVACsASwCMAGsAWQBgAHkAeQByAMgA9ABwAagB2wEdAZUAVAB0AI0AcAEOAjkCIwJeAeMA4wC2AL8A4gDZAN8AEgH/APoACwHmAUECUAKIAiYDFwPZAnACPgLlAdAB8QH0AUoCPwKMAckAHwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8GAAsAGQAfACMALAA3AEUAWgBqAGwAbQBqAGoAcAB6AIcAlwCmALEAtwCgAJ0AmACaAJwAnwCiAJoAjQCNAIsAiwB6AEwAPwA0AEcAWwAoAB8AHQAuAFAAnADFACIBwQCEAH4AzwDwAFcBkAHkADsAUAB1AO0AhQHdAYcByAGUAQoBtgDfABcB4gAiAdwA2QDRANEAMgHFAYcBIwJGAu8CpALUAmkC3wH+AQYC9wFBAlMCLAIZAS0A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8KABAAFAAdACUALgA3AEEATwBSAFsAYQBiAGkAbwB9AI8AmQCkAKcAkgCSAI8AkACSAJUAmACWAIYAhQCFAIMAgAB1AFUAOwApACkAJQAgABsAJgBUAJMAzgAFAQ8BAAGAAE4AaACcAM0AnAAtACYAaADrAPwAFgFHAeYBjgFCAVEBOAHNAZYBnAGCAaUBjwEaAfQA/wBsAYUBBAI3Ai8CWQLnAewBowIlAg0CfgFpAasBkgHSAEAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8LABcAHgAlAC0ANQA/AEcATgBSAFcAXgBkAGwAcwB9AIwAmgCbAIkAhwCGAIcAiACLAI4AjAB+AH0AfQB8AHcAdQBlAD0AMgAoACAAIAAdABkAGABJAFMAgACrANsA9gB+AEcALgBDAEsAUwAmAEcATABxANcADgFSAZUBxgGxAdYB/QE2AiACOwLyAV8BlgFkAVoBJgE4AYIBrAECAqMBkgFOAoECCAJGAuQBJAHOAL0A2wABAUoA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BQAPABcAIQAqADMAOQA+AEMASQBSAFsAYwBqAG8AcwB5AIEAgQCCAHwAfgCAAH8AgQCFAIEAdgB2AHcAdQBxAHAAagBOAHYAjQBoACUAGAAWABAAEwAWABkARABgALsA4gChAFUAIwAZABYAJQCNAMEAtQDzAIYBrwG1AdIBegFJAU0BkAHQAakBEgLtASMCHALoAXcBLAFKAU4BkAGBAZMBxgECAuoBHAJcAuwBngGLAYcBGwHPAF0A////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BgARABwAJAAoAC4ANQA/AEkAUgBYAGEAZwBpAG4AdgB7AHYAeQBwAHUAeAB4AHoAfAB4AG8AbwBwAG8AbQBqAGgAWwBqAJoA0QBtAC4AGAAQAAsADAAQABwALwCNALEAigCdAFgAEQAPABMAOABxAJcA8gDuADkBpgHlAZkBGQHgAOcAjgE7AbQBbwK4At8CGwK8AbwBvAG3AXQBoQHaAZABhAGPAbUB8wEWApwBXQGIAakBSwH0ADcA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMACAAPABcAIQAqADYAPgBGAE0AVwBeAF8AYgBoAG4AbwBqAGwAaABsAHAAcQByAHIAbQBoAGgAagBqAGgAZABrAI8AcgDIABIB4wCTAEgAHQAQAAkADAAOABIAKAA9AG4AMgApAA8ADwARABAAFQAoAF4AzQB1AXMBPAFsAYYBQAG/AAwB9wCpAeIBOQKuAjQCGwL/AfoBJwIGAvcB+AG4AZ0BqgGqAdEB8wGQAekA4wAtAcUBxAEjAb0AWgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAgAEgAZACAAKwAyADkAPwBIAE8AVABVAFwAYgBpAGIAYABhAGAAYwBoAGgAawBpAGAAYQBjAGUAZABhAGIAcACQAJgAkAC8AAUB5ACAADcADwALAAkACgAMAA0AEwAUACMADAARAAsADgAjABwAFQAoAHkAnQCpAK0A+AAkAeoAtQARAVwBnAFjAYABygHpAYcBsQGFAcoBDAKOAboBAgLEAaoBtgHHAXABYAEDAZ0AGAEcAVEBIgFAAWYBsQCcAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8EAA0AFQAdACQAKQAyADoAQABHAEkATwBWAFwAYwBXAFgAWQBYAFsAXQBhAGEAXQBYAFoAXQBfAF0AWwBfAH8AfACfAKEAxAAZARgB0ABSAAoACQAHAAgADAAMAAwACAAIAAgACQAIAAwAGAAhACoAIwAxAEsALwBCAIAAJgHYAPQAGwFTAZUBdgEPATwBSgFIAVIBnwGXAR4BFAEjAZIBfQHvACcBnAEEAdwA7wCvAPYA2QDSAKsA4QAkAa4A0QDsAGMA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAIABEAFgAbACQALAAyADoAQAA/AEcATgBVAFsATQBPAFEATgBUAFQAWQBZAFEAUgBUAFcAWABXAFUAbQC/AJwAlQDEAIsAbwB2ALUAMgAIAAgABgAHAAoACQAJAAYABgAHAAgACAAZADAANABSAEUAVwA7AF4AWAA6AG4AcwCfAIUAsgC2ANEAOQHWAYgBRwETAXgBxgF0AekA3AAKAWABxwA8AZYBHQGqAMUAWwByAGUAjQBbAJwAhQBCAJwANgGHAE4A////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AwAJAA8AFQAcACUAKwAzADUANwBAAEcATgBTAEcARQBHAEYATQBLAFAATgBIAEsAUQBQAFEAUABVAJ8AzgCwALMApwDEALAAUgAxABEACAAIAAUABgAHAAcABwAEAAQABQAGAAkACgAUACoATwCoAJ0AtQC7ANEAqACJAJAA2gDPAMgAAAH5ADoBWAF8AZQBJgE5AU8BggFoAaIAfQDWAJYA9QA3AfMAtwCOAJIAQAAgABMAFwA1AB4ALgB5APsATwAtAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BQAKABIAFgAcACQAKgApADEAOQA+AEYARgA9ADsAPAA+AEEAQgBHAD8AQgBGAEgASQBKAEkAZgC2ANgA3QDUAM0AwwDYALgAiQApAAkABwAGAAQABgAFAAUAAwAFAAUABwAIAAgACAANACAAcwDvAHAAmwC8AOAABwHKAB0BHgE+AUEBTAGIAToB/gD5APoALwEvATwBXwEqAboAcQBSAG0AjACrAH4AIQAdACcALQAbAAsADAD/////OABmAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wIABQALABEAFAAcACEAHwAqADAAOAA+ADwANAAzADIANAA3ADkAOAA4AD0AQABBAEIAQQBJAGgAmgDYAPQA9ADsANsA2gDNAKAAXgAOAAYABgAEAAQABAAEAAMABQAGAAYABgAHAAcACAAMACIAWQCZAEkAPQBWAIkA7gBTAX8BvgGWAboB4gHaAU0BFQHvANcA4gAGAX8BiwFyAcYAagBFADQAOwA4AFkAfwB5AIoAUgAhAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BgAGAAwAFQAVABsAIwAoADQANQAyAC8AJwAoACoALQAtAC4AMwA4ADkAOgA3ADwATABrAJIAwADkAPsA+ADuAO0A4ACwAL0ASAAEAAQAAwAEAAQAAgABAAMABAAFAAUABgAGAAcABwAIAA4AIAAhABUAMgB6APUA9gBpARIC7wHbAW8B8AGrAXcBTQEEAQ4BwQAoAVcBTAE4AcoArwCdAGkANABXAK8AsACXAEwACgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8EAAgADQAXABkAIgApACoAKQAnABwAHgAiACMAJQAoAC4AMQAzADMAMAA5AFsAkwCpAKwA6gD7APwA+QD2AN8AkgCqAIkACQADAAMAAwAEAAQABAABAAMAAwAEAAUABQAFAAUABgAIAA4AEwAPAB4ALwBLAHwAOQFXAWIBJQFEAdQBTwIDAuQBcwFPAekAzwDPAMUA4AACAd4AqABwAEYAWACDAF8AWgArAAYA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAYACgANABIAGgAcAB4AFgASABgAGgAcAB8AJAAoACsAKwArACsAQwByAJ4AwwC0ANoA+QD9APoA6wC1ALkAdQBGABcABAAEAAMAAwADAAMAAgACAAIAAwAEAAQABQAFAAcACgAKAAsACQALAA4AJQAjAFsAfACvAIEA0gB8AfABpQG+AeYBxgGBASMBBAHqAKsA7QDtAIEAigCRAKgAnAB1AC0AKQASAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wMABAAHAAoACwALAAoACwAPABIAFgAZAB4AIQAjACQAIgApAE8AgwCTAIkAugDRAO4A+QD5AO0A2wDcAI4AYQAfAAcABQACAAIAAgADAAMAAQAEAAQABAAEAAQABAAOABIAGgAUABAAEwAPABMADQAeAC0AQQCIANkA6QBHAf0AYQEiAdABZQLRAXIBRwEVAdsALQHCAL0A7ABnARkBqABVAEkA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wUABQAEAAgACQAMAA8AEwAYABoAHAAaAB0AKAA6AEkAXAB/AKEAygDzAOcA9ADzAO0A5QC3ALMAUAAIAAYAAgACAAIAAgACAAIAAwAdAAYABAAGAAYACAASACYAMQArADEAJQAmADUAEgAhABcAJABXAJsAwgC0ANMA9QBwAb4B/wGXAY0BCwGyAHsBEQH2AFgB2wGGAd0AaAANAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQAEAAUACAALABAAEQAUABMAFAAcACoAPwBbAHsAoQC0AMMAzgDTAOsA7gDmAM8ArABzACkADgACAAEAAQACAAIAAQACAAMANgBcAEwAIwA9ADsAKQAmADYAMgBJACsAJgBGACoAMgAgABUAJABJAHYAYQCOANcA5AD2ABgB6ABUAUQBnAAAAdEBiAGNAf8BjgH2AGcA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CAAQACAAMAAwADgANABEAGAA3AF8AfAB2AJEAdgCkAK0AwADeAOQA4AC2AKIARgBZAD8ACgACAAIAAQACAAMABAAEAAgAMgAuAJMA1gC8ALEAnQBmAEwATQBGAGkAYAAwAFcAWQAmABkAHwBMAD4AOgBHAHIAcgCBAK8AxQDYAKIA5QDTATQCQgIbAmoB6gCsAEoA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wUABgAHAAcACAAQABcAOwBYAGEAPQBZAIsAoACVAKUAtQDWAKcAlgB5AKAAVwA9ABgAAQABAAIAAwACAAMABQAJAFEAjQB5ADEBWQFCAVgB0wBlAFcAdACZAGoAWgCBAEMAXgBDADMAJwAyAGQAPABBADwAPwBWAE0AUQBeACgBhwFyAfYBRQEtARAB5wBlAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8EAAUACQAPABcALQAfAEIATABOAFAAaQCEALoAvABkAJsAzwB9AHQAjwBDAAkAAgACAAMAAwAFAAsADQAtAMgA1QCyAOoAkQHPAUYBzwB3AIQAtgBzAJcAiABQAFwAXwBRAC4AOwB0AF8AdABwAGsAQQBiAGUATACIAD8BzADyALwAlACiAHIAJAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BwAHAP////8jAE8AdQClAGUAMgB5AOMABQH6AI4AHQANAAUAAgACAAQAKABJADEApABAAWYBUAFAASgBFwLxAVgB+ADyAOoAowC1AHQArgBhAG0AOgBFACUAOwA4AFoAcQBWAFAAXwAqABMAXwDlAJ8ANgA7AP///////y4A/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////zAASwBAAB0AOQDrALMBNQFwAAwAFAA6AAgABQAKAFYAvgCXAFMBhAHgAY4BuQFuAQcCaAL/AZsBJAHUANEAsACcAHAAgABbAD0ARAAMABAAMQA8AE4AUgA9AEoAFQD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQACAAIABgAngD9AP0AWwACABMAWQCBACQAJQBaALMA3ABXAawBAwK+AQcCUwJIArAB9QH8AZkBNwHYAKQAvwCFAEgAOwBUADwAIwAOABUAMQBmAC4AFQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AQACAAIAAwAGACAAQgBpABwAAQAjALoA6QCmAMQAKAFBATUBtgHJARQCYwKNAuACIwKXATIBFwExARkBOgEdAQMBnABNAF4ASwA8AC4ACAACABoAHgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8DAAIAAwAFAAYABgACAAUANQCiAPQAVwHMAR0CdgLXAfYBhgLPAssC4wICA5oCTQKiARwB+wCmAJYAmAC9AH4AZwCEAG8APwD/////AQASAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAAAAAQABAAIACQAcAEEAnwD0ALkB3AInA2MDiQKzArUDWwPjAnsCywLeAnIC4wF0AU0B9gCXAJwALgCFAIEA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAwAZACcANgBIAKUA5QCaAagCDwO4A/gC9wItA5sCNQK4AZkCHAPlAuIBeAHvAOYAAQFYAbIAKQAuAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8DAAYAFQAgAEQAbgCAAJEA8gByAVICKgN0A7YDuQIMApgBVQGWAR0CHgKsAXoBswC7AAIB5wBLAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8MAB4ALAA4AFQAbQCKALYARAHqATICxwJLAzoDLQJmASkB5QBWAa4BOQHJAHMAUQBdAGcAVwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8VACMAOwBZAHsAmAC6APQAKgF9ARMCfAIxAwoDaQKAAccA4wDwANAAdQA7ACsAGAD/////FAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8UACcAQQBkAI8AtQDEACoBeAFtAcEBsAKxA0QD6gHpAFEARgBEAB0ADQAHAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////DwAlADwAYgCBAI0AtwDxAAEBHAHiAUkC7QIYA0kCNwGAACcAEAAHAA4AEQD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////FAAmAEEAWwCKAJ0ArwDzAGoBtAG5AS0CMAKqARYBzgCEACQABQADAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////woAGwA4AFIAYgB+AJEA3QAUAZ8BVAFEAYIBEQEQASUBtgCCACcA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////GQAtAEUAUgBqAKkA1gBaAeoA1wAhAQ8B0wAmAQgB3wBxAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////FAAjADUAQQBmAKwA4gCXALYA1wDLAMcA4QDnANkARwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////EAAcACkAUgB1AIYAYAB+AIcAfACJAJMAhwCLAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BwAfADMARwBIADIAYQBSAFwAWgBlAEIA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xoAIAAZADMALQBDACYARgD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xcAIQD///////////////////////////////////////////////////////////////////////////////////////////////////////////////8=",peak:{e:245.65,n:2596.31,h:3947.46},max1k:{e:273.48,n:2697.66,h:3695.2},places:{taipeiBasin:{e:302.47,n:2771.42},linkou:{e:286.32,n:2773.58},lanyang:{e:325.9,n:2730.54},taichungBasin:{e:217.48,n:2671.67},bagua:{e:212.84,n:2644},chianan:{e:173.26,n:2572.17},pingtung:{e:203.75,n:2505.6},huadong:{e:281.7,n:2583.07},central:{e:265.29,n:2627.34},xueshan:{e:273.33,n:2697.13},coastal:{e:288.87,n:2577.55},yushan:{e:245.61,n:2596.33}}};var Rl=null;function Kg(i=Fl){let t=i.meta,e=typeof atob=="function"?atob(i.h):Buffer.from(i.h,"base64").toString("binary"),n=new Float32Array(t.nx*t.ny);for(let s=0;s<n.length;s++){let r=e.charCodeAt(2*s)|e.charCodeAt(2*s+1)<<8;n[s]=r===65535?NaN:r}return{meta:t,grid:n,nx:t.nx,ny:t.ny,e0:t.e0,n0:t.n0,peak:i.peak,max1k:i.max1k,places:i.places}}var Zi=()=>Rl||(Rl=Kg()),Vo=(i,t,e)=>t<0||e<0||t>=i.ny||e>=i.nx?NaN:i.grid[t*i.nx+e];function qi(i,t,e){let n=t-i.e0-.5,s=e-i.n0-.5,r=Math.floor(n),o=Math.floor(s),a=n-r,c=s-o,A=Vo(i,o,r),u=Vo(i,o,r+1),d=Vo(i,o+1,r),l=Vo(i,o+1,r+1),f=[[A,(1-a)*(1-c)],[u,a*(1-c)],[d,(1-a)*c],[l,a*c]],m=a<.5?c<.5?A:d:c<.5?u:l;if(Number.isNaN(m))return NaN;let _=0,p=0;for(let[h,E]of f)Number.isNaN(h)||(_+=h*E,p+=E);return p?_/p:NaN}function Xg(i,t){let e=[];for(let n=0;n<i.nx;n++){let s=i.e0+n+.5;e.push({e:s,z:qi(i,s,t)})}return e}function zo(i,t){let e=Xg(i,t),n=e.filter(A=>!Number.isNaN(A.z));if(!n.length)return null;let s=n.reduce((A,u)=>u.z>A.z?u:A),r=n[0],o=n[n.length-1],a=s.e-r.e,c=o.e-s.e;return{top:s,west:r,east:o,wKm:a,eKm:c,wSlope:(s.z-r.z)/Math.max(a,.5),eSlope:(s.z-o.z)/Math.max(c,.5)}}var Ul={type:"change"},MA={type:"start"},Ll={type:"end"},Yo=new In,Pl=new Ye,Zg=Math.cos(70*qa.DEG2RAD),we=new P,ke=2*Math.PI,te={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},_A=1e-6,Wo=class extends vs{constructor(t,e=null){super(t,e),this.state=te.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Wn.ROTATE,MIDDLE:Wn.DOLLY,RIGHT:Wn.PAN},this.touches={ONE:Jn.ROTATE,TWO:Jn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new We,this._lastTargetPosition=new P,this._quat=new We().setFromUnitVectors(t.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Oi,this._sphericalDelta=new Oi,this._scale=1,this._panOffset=new P,this._rotateStart=new Rt,this._rotateEnd=new Rt,this._rotateDelta=new Rt,this._panStart=new Rt,this._panEnd=new Rt,this._panDelta=new Rt,this._dollyStart=new Rt,this._dollyEnd=new Rt,this._dollyDelta=new Rt,this._dollyDirection=new P,this._mouse=new Rt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=jg.bind(this),this._onPointerDown=qg.bind(this),this._onPointerUp=$g.bind(this),this._onContextMenu=om.bind(this),this._onMouseWheel=nm.bind(this),this._onKeyDown=im.bind(this),this._onTouchStart=sm.bind(this),this._onTouchMove=rm.bind(this),this._onMouseDown=tm.bind(this),this._onMouseMove=em.bind(this),this._interceptControlDown=am.bind(this),this._interceptControlUp=Am.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=te.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ul),this.update(),this.state=te.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;we.copy(e).sub(this.target),we.applyQuaternion(this._quat),this._spherical.setFromVector3(we),this.autoRotate&&this.state===te.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=ke:n>Math.PI&&(n-=ke),s<-Math.PI?s+=ke:s>Math.PI&&(s-=ke),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(we.setFromSpherical(this._spherical),we.applyQuaternion(this._quatInverse),e.copy(this.target).add(we),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=we.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new P(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let A=new P(this._mouse.x,this._mouse.y,0);A.unproject(this.object),this.object.position.sub(A).add(a),this.object.updateMatrixWorld(),o=we.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Yo.origin.copy(this.object.position),Yo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Yo.direction))<Zg?this.object.lookAt(this.target):(Pl.setFromNormalAndCoplanarPoint(this.object.up,this.target),Yo.intersectPlane(Pl,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>_A||8*(1-this._lastQuaternion.dot(this.object.quaternion))>_A||this._lastTargetPosition.distanceToSquared(this.target)>_A?(this.dispatchEvent(Ul),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ke/60*this.autoRotateSpeed*t:ke/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){we.setFromMatrixColumn(e,0),we.multiplyScalar(-t),this._panOffset.add(we)}_panUp(t,e){this.screenSpacePanning===!0?we.setFromMatrixColumn(e,1):(we.setFromMatrixColumn(e,0),we.crossVectors(this.object.up,we)),we.multiplyScalar(t),this._panOffset.add(we)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;we.copy(s).sub(this.target);let r=we.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Rt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function qg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function jg(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function $g(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ll),this.state=te.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function tm(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Wn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=te.DOLLY;break;case Wn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=te.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=te.ROTATE}break;case Wn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=te.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=te.PAN}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(MA)}function em(i){switch(this.state){case te.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case te.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case te.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function nm(i){this.enabled===!1||this.enableZoom===!1||this.state!==te.NONE||(i.preventDefault(),this.dispatchEvent(MA),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Ll))}function im(i){this.enabled!==!1&&this._handleKeyDown(i)}function sm(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Jn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=te.TOUCH_ROTATE;break;case Jn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=te.TOUCH_PAN;break;default:this.state=te.NONE}break;case 2:switch(this.touches.TWO){case Jn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=te.TOUCH_DOLLY_PAN;break;case Jn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=te.TOUCH_DOLLY_ROTATE;break;default:this.state=te.NONE}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(MA)}function rm(i){switch(this._trackPointer(i),this.state){case te.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case te.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case te.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case te.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=te.NONE}}function om(i){this.enabled!==!1&&i.preventDefault()}function am(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Am(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var $0=Math.PI/180;function Nl(i,t,e){let[n,s,r,o]=t,a=new Float64Array(e*e);for(let c=0;c<e;c++)for(let A=0;A<e;A++)a[c*e+A]=i(n+(r-n)*A/(e-1),s+(o-s)*c/(e-1));return{n:e,box:t,z:a}}function xA(i,t){let{n:e,box:[n,s,r,o],z:a}=i,c=(r-n)/(e-1),A=(o-s)/(e-1),u=(y,w)=>a[w*e+y]-t,d=(y,w)=>u(y,w)>0,l=new Map,f=y=>{let w=l.get(y);if(w)return w;let M=y>>1,x=M%e,S=(M-x)/e,B,v,D,Q,N,G;y&1?(B=u(x,S),v=u(x,S+1),D=x,Q=S,N=x,G=S+1):(B=u(x,S),v=u(x+1,S),D=x,Q=S,N=x+1,G=S);let I=B/(B-v);return w=[n+(D+(N-D)*I)*c,s+(Q+(G-Q)*I)*A],l.set(y,w),w},m=[];for(let y=0;y<e-1;y++)for(let w=0;w<e-1;w++){let M=(d(w,y)?1:0)|(d(w+1,y)?2:0)|(d(w+1,y+1)?4:0)|(d(w,y+1)?8:0);if(M===0||M===15)continue;let x=2*(y*e+w),S=2*((y+1)*e+w),B=2*(y*e+w)+1,v=2*(y*e+w+1)+1,D=(Q,N)=>m.push([Q,N]);switch(M){case 1:case 14:D(B,x);break;case 2:case 13:D(x,v);break;case 3:case 12:D(B,v);break;case 4:case 11:D(v,S);break;case 6:case 9:D(x,S);break;case 7:case 8:D(B,S);break;case 5:case 10:{let Q=(u(w,y)+u(w+1,y)+u(w+1,y+1)+u(w,y+1))/4>0;M===5===Q?(D(B,S),D(x,v)):(D(B,x),D(v,S));break}default:break}}let _=new Map;m.forEach(([y,w],M)=>{for(let x of[y,w]){let S=_.get(x);S?S.push(M):_.set(x,[M])}});let p=new Uint8Array(m.length),h=[],E=(y,w)=>m[y][0]===w?m[y][1]:m[y][0];for(let y=0;y<m.length;y++){if(p[y])continue;p[y]=1;let w=[m[y][0],m[y][1]];for(let M of[1,0])for(;;){let x=M?w[w.length-1]:w[0],S=(_.get(x)||[]).find(v=>!p[v]);if(S==null)break;p[S]=1;let B=E(S,x);if(M?w.push(B):w.unshift(B),B===(M?w[0]:w[w.length-1]))break}h.push(w.map(f))}return h}var ji=[[-200,[24,62,118]],[-.01,[36,88,150]],[0,[150,196,136]],[150,[184,212,146]],[350,[222,214,156]],[600,[214,182,134]],[850,[190,150,116]],[1100,[236,228,218]]];function Gl(i){for(let t=1;t<ji.length;t++)if(i<=ji[t][0]){let[e,n]=ji[t-1],[s,r]=ji[t],o=Math.max(0,Math.min(1,(i-e)/(s-e)));return[0,1,2].map(a=>Math.round(n[a]+(r[a]-n[a])*o))}return ji[ji.length-1][1]}function Ol({M:i,n:t=160,ny:e=t,exag:n=1.5,color:s=Gl,sea:r=-80}={}){let[o,a,c,A]=i.box,u=n/1e3,d=(st,nt,Et)=>new P(st,Et*u,-nt),l=st=>[st.x,-st.z],f=new gn,m=Nl(i.h,i.box,t+1),_=new kn(c-o,A-a,t,e);_.rotateX(-Math.PI/2);let p=_.getAttribute("position"),h=new Float32Array(p.count*3);for(let st=0;st<p.count;st++){let nt=p.getX(st)+(o+c)/2,Et=-p.getZ(st)+(a+A)/2,gt=i.h(nt,Et);p.setXYZ(st,nt,Math.max(gt,r)*u,-Et);let Dt=gt<0?[70,110,150]:s(gt);h[3*st]=Dt[0]/255,h[3*st+1]=Dt[1]/255,h[3*st+2]=Dt[2]/255}_.setAttribute("color",new ue(h,3)),_.computeVertexNormals(),_.boundingSphere=new on(new P,Math.max(10,Math.hypot(c-o,A-a)/2+1));let E=new Me(_,new ws({vertexColors:!0}));f.add(E);let y=-.35,w=[],M=[],x=st=>{let nt=w.length/3;st.forEach(([Et,gt])=>{let Dt=Math.max(i.h(Et,gt),r)*u;w.push(Et,Dt,-gt,Et,y,-gt)});for(let Et=0;Et+1<st.length;Et++){let gt=nt+2*Et;M.push(gt,gt+1,gt+2,gt+1,gt+3,gt+2)}},S=80,B=(st,nt,Et,gt)=>Array.from({length:S+1},(Dt,Y)=>[st+(Et-st)*Y/S,nt+(gt-nt)*Y/S]);x(B(o,a,c,a)),x(B(c,a,c,A)),x(B(c,A,o,A)),x(B(o,A,o,a));let v=new ge;v.setAttribute("position",new ue(new Float32Array(w),3)),v.setIndex(M);let D=new Me(v,new an({color:7031343,side:Te}));f.add(D);let Q=new Me(new kn(c-o,A-a),new an({color:4165600,transparent:!0,opacity:.42,depthWrite:!1,side:Te}));Q.rotateX(-Math.PI/2),Q.renderOrder=2,f.add(Q);let N=new ge;N.setAttribute("position",new ue(new Float32Array(72),3));let G=new Me(N,new an({color:3108789,transparent:!0,opacity:.35,depthWrite:!1,side:Te}));f.add(G);function I(st){let nt=st*u;Q.position.y=nt;let Et=[[o,-a],[c,-a],[c,-A],[o,-A]],gt=N.getAttribute("position");for(let Dt=0;Dt<4;Dt++){let[Y,Z]=Et[Dt],[at,It]=Et[(Dt+1)%4],ut=Dt*6;[[Y,y,Z],[at,y,It],[at,nt,It],[Y,y,Z],[at,nt,It],[Y,nt,Z]].forEach((ie,Lt)=>gt.setXYZ(ut+Lt,ie[0],ie[1],ie[2]))}gt.needsUpdate=!0,N.computeBoundingSphere()}I(0);let U=.032,z=new an({color:16765806,side:Te,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),V=new an({color:16777215,side:Te,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),j=new gn;f.add(j);let K=new Map,et=st=>{let nt=K.get(st);if(!nt){let Et=[],gt=[],Dt=st*u+.012;for(let Y of xA(m,st))for(let Z=0;Z+1<Y.length;Z++){let[at,It]=Y[Z],[ut,Ut]=Y[Z+1],ie=ut-at,Lt=-(Ut-It),Wt=Math.hypot(ie,Lt)||1,Kt=-Lt/Wt*U/2,Gt=ie/Wt*U/2,Xt=Et.length/3;Et.push(at+Kt,Dt,-It+Gt,at-Kt,Dt,-It-Gt,ut+Kt,Dt,-Ut+Gt,ut-Kt,Dt,-Ut-Gt),gt.push(Xt,Xt+1,Xt+2,Xt+1,Xt+3,Xt+2)}nt=new ge,nt.setAttribute("position",new ue(new Float32Array(Et),3)),nt.setIndex(gt),nt.boundingSphere=new on(new P,10),K.set(st,nt)}return nt};function J(st,nt){j.clear();for(let Et of st){let gt=new Me(et(Et),Et===nt?V:z);gt.renderOrder=3,j.add(gt)}}return{group:f,mesh:E,grid:m,toWorld:d,fromWorld:l,setWater:I,setContours:J,k:u,show(st,nt){({water:[Q,G],lines:[j],skirt:[D]})[st].forEach(Et=>{Et.visible=nt})},heightAt:(st,nt)=>i.h(st,nt)}}var $i=[[0,[96,150,92]],[100,[132,176,110]],[400,[196,198,132]],[1e3,[204,164,110]],[2e3,[168,124,92]],[3e3,[150,120,104]],[3800,[232,228,222]]];function yA(i){if(Number.isNaN(i))return[20,52,96];for(let t=1;t<$i.length;t++)if(i<=$i[t][0]){let[e,n]=$i[t-1],[s,r]=$i[t],o=Math.max(0,Math.min(1,(i-e)/(s-e)));return[0,1,2].map(a=>Math.round(n[a]+(r[a]-n[a])*o))}return $i[$i.length-1][1]}function Hl(i,t,e,n,s=1,r=6){let o=Math.min((t-2*r)/n.nx,(e-2*r)/n.ny),a=(t-n.nx*o)/2,c=(e-n.ny*o)/2,A=(f,m)=>[a+(f-n.e0)*o,c+(n.n0+n.ny-m)*o],u=(f,m)=>[n.e0+(f-a)/o,n.n0+n.ny-(m-c)/o],d=i.createImageData(n.nx,n.ny);for(let f=0;f<n.ny;f++)for(let m=0;m<n.nx;m++){let _=n.grid[f*n.nx+m],p=((n.ny-1-f)*n.nx+m)*4,h=yA(_),E=n.grid[Math.min(n.ny-1,f+1)*n.nx+Math.max(0,m-1)],y=Number.isNaN(_)||Number.isNaN(E)?0:Math.max(-40,Math.min(40,(E-_)*-.08));d.data[p]=h[0]+y,d.data[p+1]=h[1]+y,d.data[p+2]=h[2]+y,d.data[p+3]=255}let l=document.createElement("canvas");return l.width=n.nx,l.height=n.ny,l.getContext("2d").putImageData(d,0,0),i.fillStyle="#14345f",i.fillRect(0,0,t,e),i.imageSmoothingEnabled=!0,i.drawImage(l,a,c,n.nx*o,n.ny*o),{toXY:A,toEN:u,scale:o}}var cm=5,Xe=10;function kl({cv:i,wrap:t,labelsEl:e,T:n,labels:s=[],labelClass:r="gg-tw3-lab",onPick:o=null}){let a=new Oo({canvas:i,antialias:!0});a.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),a.setClearColor(462879,1);let c=new ds,A=new De(34,1,.1,400);c.add(new xs(12569574,.85));let u=new Ms(16777215,1.6);u.position.set(-20,30,-14),c.add(u);let d=n.e0+n.nx/2,l=n.n0+n.ny/2,f={box:[-n.nx/2/Xe,-n.ny/2/Xe,n.nx/2/Xe,n.ny/2/Xe],h:(I,U)=>{let z=qi(n,d+I*Xe,l+U*Xe);return Number.isNaN(z)?-60:z}},m=Ol({M:f,n:n.nx,ny:n.ny,exag:cm/Xe,color:yA,sea:-60});m.show("lines",!1),c.add(m.group);let _=(I,U,z)=>m.toWorld((I-d)/Xe,(U-l)/Xe,z),p=(I,U,z=0)=>{let V=qi(n,I,U),j=_(I,U,Number.isNaN(V)?0:V);return j.y+=z,j},h=new Wo(A,i);h.enablePan=!0,h.enableDamping=!0,h.dampingFactor=.12,h.minDistance=6,h.maxDistance=80,h.maxPolarAngle=Math.PI/2-.05;let E=Tl(e,i,A),y=s.map(([I,U,z])=>({k:I,el:E.add(`gg-lab ${r}${I==="yushan"?" is-peak":""}`,I==="yushan"?`${U} <i>${z}</i> <b>3,952 m</b>`:`${U} <i>${z}</i>`)})),w=!0,M=new P;function x(){let I=[];for(let U of y){let z=U.k==="yushan"?n.peak:n.places[U.k];if(M.copy(p(z.e,z.n,.15)),E.place(U.el,M,-10),!w){U.el.style.opacity=0;continue}if(U.el.style.opacity==="0")continue;let V=U.el.getBoundingClientRect();I.some(j=>V.left<j.right+4&&V.right>j.left-4&&V.top<j.bottom+2&&V.bottom>j.top-2)?U.el.style.opacity=0:I.push(V)}}function S(){let I=t.clientWidth,U=t.clientHeight;!I||!U||(a.setSize(I,U,!1),A.aspect=I/U,A.updateProjectionMatrix())}function B(){a.render(c,A),x()}let v={south:[new P(6,24,42),new P(0,0,0)],west:[new P(-24,10,8),new P(0,0,-1)],east:[new P(24,9,8),new P(0,0,-1)],top:[new P(0,52,.5),new P(0,0,0)]};function D(I){let[U,z]=v[I];A.position.copy(U),h.target.copy(z);let V=t.clientWidth,j=t.clientHeight;V/j<1&&A.position.sub(z).multiplyScalar(1.35).add(z),A.lookAt(z),h.update()}let Q=new ys,N=new Rt,G=null;return i.addEventListener("pointerdown",I=>{G={x:I.clientX,y:I.clientY}}),i.addEventListener("pointerup",I=>{if(!G||Math.hypot(I.clientX-G.x,I.clientY-G.y)>6){G=null;return}if(G=null,!o)return;let U=i.getBoundingClientRect();N.set((I.clientX-U.left)/U.width*2-1,-((I.clientY-U.top)/U.height)*2+1),Q.setFromCamera(N,A);let z=Q.intersectObject(m.mesh)[0];if(z){let[V,j]=m.fromWorld(z.point);o(d+V*Xe,l+j*Xe)}}),D("south"),S(),{scene:c,camera:A,controls:h,terrain:m,renderer:a,toW:_,surface:p,look:D,render:B,resize:S,eC:d,nC:l,addView(I,U){v[I]=U},worldOf:(I,U)=>new P((I-d)/Xe,0,-(U-l)/Xe),showLabels(I){w=I}}}var vA=[[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]],Vl=null;function Jo(){return Vl||(Vl=lm(Zi()))}function lm(i){let{nx:t,ny:e,grid:n}=i,s=t*e,r=h=>!Number.isNaN(n[h]),o=new Float32Array(s).fill(NaN),a=new Uint8Array(s),c=[],A=[],u=(h,E)=>{c.push(h),A.push(E);let y=c.length-1;for(;y;){let w=y-1>>1;if(c[w]<=c[y])break;[c[w],c[y]]=[c[y],c[w]],[A[w],A[y]]=[A[y],A[w]],y=w}},d=()=>{let h=c[0],E=A[0],y=c.pop(),w=A.pop();if(c.length){c[0]=y,A[0]=w;let M=0;for(;;){let x=2*M+1,S=x+1,B=M;if(x<c.length&&c[x]<c[B]&&(B=x),S<c.length&&c[S]<c[B]&&(B=S),B===M)break;[c[B],c[M]]=[c[M],c[B]],[A[B],A[M]]=[A[M],A[B]],M=B}}return[h,E]},l=new Int32Array(s).fill(-1),f=[];for(let h=0;h<s;h++){if(!r(h))continue;let E=h%t,y=(h-E)/t;for(let[w,M]of vA){let x=E+w,S=y+M;if(x<0||S<0||x>=t||S>=e||!r(S*t+x)){a[h]=1,o[h]=n[h],u(n[h],h);break}}}let m=.01;for(;c.length;){let[h,E]=d();f.push(E);let y=E%t,w=(E-y)/t;for(let[M,x]of vA){let S=y+M,B=w+x;if(S<0||B<0||S>=t||B>=e)continue;let v=B*t+S;!r(v)||a[v]||(a[v]=1,o[v]=Math.max(n[v],h+m),l[v]=E,u(o[v],v))}}for(let h=0;h<s;h++){if(!r(h)||l[h]<0)continue;let E=h%t,y=(h-E)/t,w=-1,M=0;for(let[x,S]of vA){let B=E+x,v=y+S;if(B<0||v<0||B>=t||v>=e)continue;let D=v*t+B;if(!r(D))continue;let Q=(o[h]-o[D])/Math.hypot(x,S);Q>M&&(M=Q,w=D)}w>=0&&M>m*2&&(l[h]=w)}let _=new Float32Array(s),p=f.slice().sort((h,E)=>o[E]-o[h]);for(let h of p)_[h]+=1,l[h]>=0&&(_[l[h]]+=_[h]);return{T:i,dir:l,acc:_,filled:o,order:f}}var SA=(i,t)=>{let e=t%i.T.nx,n=(t-e)/i.T.nx;return[i.T.e0+e+.5,i.T.n0+n+.5]},bA=(i,t,e)=>{let n=Math.floor(t-i.T.e0),s=Math.floor(e-i.T.n0);return n<0||s<0||n>=i.T.nx||s>=i.T.ny?-1:s*i.T.nx+n};function hm(i,t,e){let n=zo(i.T,e)||zo(i.T,e+3)||zo(i.T,e-3);return n&&t>n.top.e?"east":"west"}function ts(i,t,e){let n=bA(i,t,e);if(n<0||Number.isNaN(i.T.grid[n]))return null;let s=[n],r=0;for(let c=0;c<5e3&&i.dir[n]>=0;c++){let A=i.dir[n],[u,d]=SA(i,n),[l,f]=SA(i,A);r+=Math.hypot(l-u,f-d),s.push(A),n=A}r+=.5;let o=s.map(c=>SA(i,c)),a=o[o.length-1];return{cells:s,pts:o,km:r,drop:i.T.grid[s[0]]-i.T.grid[n],outlet:a,side:hm(i,a[0],a[1])}}var zl=[["Jan","1\u6708"],["Feb","2\u6708"],["Mar","3\u6708"],["Apr","4\u6708"],["May","5\u6708"],["Jun","6\u6708"],["Jul","7\u6708"],["Aug","8\u6708"],["Sep","9\u6708"],["Oct","10\u6708"],["Nov","11\u6708"],["Dec","12\u6708"]];function Yl(i){let t=i.reduce((r,o)=>r+o,0),e=i.slice(4,10).reduce((r,o)=>r+o,0),n=i.indexOf(Math.max(...i)),s=i.indexOf(Math.min(...i));return{year:t,wet:e,wetShare:e/t,max:n,min:s,ratio:i[n]/i[s]}}function Wl(i){let t=c=>i.querySelector(c),e=JSON.parse(t('script[type="application/json"]').textContent),n=e.stations,s={key:e.start||n[0].key},r=Math.max(...n.flatMap(c=>c.mm));function o(){let c=n.find(d=>d.key===s.key),A=Yl(c.mm),u=d=>Math.round(d).toLocaleString("en-US");return i.querySelectorAll("[data-stn]").forEach(d=>d.setAttribute("aria-pressed",String(d.dataset.stn===s.key))),t(".gg-rb-bars").innerHTML=c.mm.map((d,l)=>`<div class="gg-rb-col${l>=4&&l<=9?" is-wet":""}${l===A.max?" is-max":""}${l===A.min?" is-min":""}">
      <span class="gg-rb-v">${u(d)}</span><i style="height:${(d/r*100).toFixed(1)}%"></i><span class="gg-rb-m">${zl[l][0]}<span class="zh">${zl[l][1]}</span></span></div>`).join(""),t(".gg-rb-out").innerHTML=`<span class="gg-tw-k">Whole year<span class="zh">\u5168\u5E74</span><b>${u(A.year)} mm</b></span>
      <span class="gg-tw-k">May to October<span class="zh">5 \u5230 10 \u6708</span><b>${Math.round(A.wetShare*100)}%</b></span>
      <span class="gg-tw-k">Wettest \xF7 driest month<span class="zh">\u6700\u591A\u6708 \xF7 \u6700\u5C11\u6708</span><b>\xD7 ${A.ratio.toFixed(A.ratio<10?1:0)}</b></span>
      <span class="gg-tw-note">${c.note_en}<span class="zh">${c.note_zh}</span></span>`,A}let a={state:s,stats:c=>Yl(n.find(A=>A.key===c).mm),pick(c){return s.key=c,o()}};return i.querySelectorAll("[data-stn]").forEach(c=>c.addEventListener("click",()=>a.pick(c.dataset.stn))),o(),i.__rain=a,a}function Jl(i){let t={i:0,tries:0,first:0,done:!1,solved:!1,log:[]};return{state:t,total:i.length,question:()=>i[t.i],answer(e){if(t.done||t.solved)return null;let n=i[t.i];t.tries++;let s=e===n.answer;if(s){t.solved=!0;let r=t.tries===1;return r&&t.first++,t.log.push({q:t.i,tries:t.tries,first:r}),{correct:s,first:r}}return{correct:s,first:!1}},next(){return t.solved?(t.solved=!1,t.tries=0,t.i>=i.length-1?(t.done=!0,!1):(t.i++,!0)):!1},reset(){t.i=0,t.tries=0,t.first=0,t.done=!1,t.solved=!1,t.log=[]}}}var um=(i,t)=>{let e=null,n=4;for(let s of i){let r=Math.hypot(s.e-t[0],s.n-t[1]);r<n&&(n=r,e=s)}return e};function Kl(i){let t=E=>i.querySelector(E),e=JSON.parse(t('script[type="application/json"]').textContent),n=Zi(),s=Jo(),r=Jl(e.questions),o=t(".gg-ft-k"),a=t(".gg-ft-score"),c=t(".gg-ft-msg"),A=t(".gg-ft-next"),u=t(".gg-ft-steps"),d=t(".gg-ck-opts");u.innerHTML=e.questions.map(()=>"<i></i>").join("");let l=!1;function f(E){let y=t(".gg-dp-map"),w=y.clientWidth,M=y.clientHeight,x=Math.min(window.devicePixelRatio||1,2);if(!w||!M)return;y.width=Math.round(w*x),y.height=Math.round(M*x);let S=y.getContext("2d");S.setTransform(x,0,0,x,0,0);let B=Hl(S,w,M,n),v=n.places[E.place]||E;if(l){let N=ts(s,v.e,v.n);S.strokeStyle="#fff",S.lineWidth=4.5,S.lineJoin="round",S.beginPath(),N.pts.forEach(([G,I],U)=>{let[z,V]=B.toXY(G,I);U?S.lineTo(z,V):S.moveTo(z,V)}),S.stroke(),S.strokeStyle="#3f8fe0",S.lineWidth=2.5,S.stroke()}let[D,Q]=B.toXY(v.e,v.n);S.fillStyle="#ff4d4d",S.strokeStyle="#fff",S.lineWidth=2,S.beginPath(),S.arc(D,Q,7,0,Math.PI*2),S.fill(),S.stroke()}function m(){let E=r.state,y=r.question();l=!1,o.textContent=`Question ${E.i+1} of ${r.total} \xB7 \u7B2C ${E.i+1} \u984C\uFF08\u5171 ${r.total} \u984C\uFF09`,a.textContent=`${E.first} / ${E.log.length}`,t(".gg-dp-name").innerHTML=`${y.name_en}<span class="zh">${y.name_zh}</span>`,d.innerHTML=[["west","The west coast","\u897F\u6D77\u5CB8"],["east","The east coast","\u6771\u6D77\u5CB8"]].map(([w,M,x])=>`<button type="button" class="gg-ft-opt gg-ck-opt" data-pick="${w}"><span class="gg-ft-lab">${M}<span class="zh">${x}</span></span></button>`).join(""),d.querySelectorAll("[data-pick]").forEach(w=>w.addEventListener("click",()=>_(w.dataset.pick))),c.className="gg-ft-msg",c.innerHTML=`${e.start_en}<span class="zh">${e.start_zh}</span>`,A.hidden=!0,[...u.children].forEach((w,M)=>{w.className=M<E.log.length?E.log[M].first?"is-first":"is-later":M===E.i?"is-now":""}),f(y)}function _(E){let y=r.question(),w=r.answer(E);if(!w)return null;let M=d.querySelector(`[data-pick="${E}"]`),x=[...d.querySelectorAll("[data-pick]")];if(w.correct){l=!0,f(y);let S=n.places[y.place]||y,B=ts(s,S.e,S.n),v=um(e.rivers,B.outlet);M.classList.add("is-right"),x.forEach(D=>{D.disabled=!0}),c.className="gg-ft-msg is-right",c.innerHTML=`<b>${w.first?"Right on the first try. \xB7 \u7B2C\u4E00\u6B21\u5C31\u7B54\u5C0D\u3002":"That is it. \xB7 \u7B54\u5C0D\u4E86\u3002"}</b> ${y.why_en} The drop travels about ${Math.round(B.km)} km${v?`, down the ${v.en}`:""}.<span class="zh">${y.why_zh}\u9019\u6EF4\u96E8\u5927\u7D04\u8D70\u4E86 ${Math.round(B.km)} \u516C\u91CC${v?`\uFF0C\u7D93\u904E${v.zh}`:""}\u3002</span>`,A.textContent=r.state.i>=r.total-1?"See your result \xB7 \u770B\u7D50\u679C":"Next question \xB7 \u4E0B\u4E00\u984C",A.hidden=!1,a.textContent=`${r.state.first} / ${r.state.log.length}`,[...u.children][r.state.i].className=w.first?"is-first":"is-later"}else M.classList.add("is-wrong"),M.disabled=!0,c.className="gg-ft-msg is-wrong",c.innerHTML=`<b>Not quite. Look for the highest ridge. \xB7 \u4E0D\u592A\u5C0D\uFF0C\u627E\u627E\u6700\u9AD8\u7684\u5C71\u810A\u3002</b> ${e.hint_en}<span class="zh">${e.hint_zh}</span>`;return w}function p(){if(r.next()){m();return}if(!r.state.done)return;let E=r.state.first;o.textContent="Finished \xB7 \u5B8C\u6210",d.innerHTML="",t(".gg-dp-name").innerHTML=`You got ${E} of ${r.total} right on the first try.<span class="zh">${r.total} \u984C\u88E1\uFF0C\u4F60\u6709 ${E} \u984C\u7B2C\u4E00\u6B21\u5C31\u7B54\u5C0D\u3002</span>`,c.className="gg-ft-msg",c.innerHTML=`${e.end_en}<span class="zh">${e.end_zh}</span>`,A.textContent="Play again \xB7 \u518D\u73A9\u4E00\u6B21",A.hidden=!1}A.addEventListener("click",()=>{r.state.done?(r.reset(),m()):p()}),new ResizeObserver(()=>{r.state.done||f(r.question())}).observe(t(".gg-dp-map")),m(),i.__drop=h();function h(){return{game:r,pick:_,next:p,reset(){r.reset(),m()}}}return i.__drop}var dm=60,Xl=700,fm=18,pm=[["yushan","Yushan","\u7389\u5C71"],["central","Central Mountain Range","\u4E2D\u592E\u5C71\u8108"],["taipeiBasin","Taipei Basin","\u81FA\u5317\u76C6\u5730"],["chianan","Chianan Plain","\u5609\u5357\u5E73\u539F"],["huadong","Huadong Longitudinal Valley","\u82B1\u6771\u7E31\u8C37"]];function Zl(i,t){let e=null,n=4;for(let s of i){let r=Math.hypot(s.e-t[0],s.n-t[1]);r<n&&(n=r,e=s)}return e}function gm(i){let t=E=>i.querySelector(E),e=t(".al-space-cv"),n=t(".al-space"),s=JSON.parse(t('script[type="application/json"]').textContent),r=Zi(),o=Jo(),a={pick:null,path:null,raining:!0,rivers:!0,labels:!0};function c(){let E=t(".gg-rn-out"),y=a.path,w=B=>Math.round(B).toLocaleString("en-US");if(!y)return E.innerHTML='<p class="gg-rn-where">Tap the land to drop a raindrop there.<span class="zh">\u9EDE\u5730\u5F62\uFF0C\u5728\u90A3\u88E1\u4E0B\u4E00\u6EF4\u96E8\u3002</span></p>',d.info();let M=Zl(s.rivers,y.outlet),x=y.drop/Math.max(y.km,.5),S=y.side==="west"?{en:"the west coast",zh:"\u897F\u6D77\u5CB8"}:{en:"the east coast",zh:"\u6771\u6D77\u5CB8"};return E.innerHTML=`<dl class="gg-sb-nums">
      <div><dt>Distance to the sea<span class="zh">\u6D41\u5230\u6D77\u7684\u8DDD\u96E2</span></dt><dd>${w(y.km)} <small>km</small></dd></div>
      <div><dt>Starting height<span class="zh">\u8D77\u9EDE\u6D77\u62D4</span></dt><dd>${w(qi(r,...a.pick))} <small>m</small></dd></div>
      <div class="gg-sb-wide"><dt>Average slope<span class="zh">\u5E73\u5747\u5761\u5EA6</span></dt><dd>${w(x)} <small>m/km</small></dd></div></dl>
      <p class="gg-rn-where">It reaches the sea on ${S.en}${M?`, through the <b>${M.en}</b>`:""}.<span class="zh">\u5B83\u5F9E${S.zh}\u5165\u6D77${M?`\uFF0C\u7D93\u904E<b>${M.zh}</b>`:""}\u3002</span></p>`,d.info()}let A=null;try{A=u()}catch{A=null}A||i.classList.add("al-nogl");function u(){let E;try{E=kl({cv:e,wrap:n,labelsEl:t(".al-labels"),T:r,labels:pm,onPick:(J,st)=>d.pickAt(J,st)})}catch{return null}let{nx:y}=r,w=J=>{let st=J%y,nt=(J-st)/y;return[r.e0+st+.5,r.n0+nt+.5]},M=[];for(let J=0;J<o.acc.length;J++){if(o.acc[J]<dm||o.dir[J]<0)continue;let st=E.surface(...w(J),.03),nt=E.surface(...w(o.dir[J]),.03);M.push(st.x,st.y,st.z,nt.x,nt.y,nt.z)}let x=new ge;x.setAttribute("position",new ue(new Float32Array(M),3));let S=new gs(x,new ri({color:9426175}));S.frustumCulled=!1,E.scene.add(S);let B=[];for(let J=0;J<r.grid.length;J++)Number.isNaN(r.grid[J])||B.push(J);let v=7,D=()=>(v=v*16807%2147483647)/2147483647,Q=Array.from({length:Xl},()=>({p:null,t:0})),N=J=>{let st=B[Math.floor(D()*B.length)],[nt,Et]=w(st);J.p=ts(o,nt,Et),J.t=D()*.3};Q.forEach(J=>{N(J),J.t=D()*(J.p?J.p.km:1)});let G=new ge;G.setAttribute("position",new ue(new Float32Array(Xl*3),3));let I=new Li(G,new oi({color:12576511,size:.16,transparent:!0,opacity:.95}));I.frustumCulled=!1,E.scene.add(I);let U=new P;function z(J){let st=G.getAttribute("position");Q.forEach((nt,Et)=>{if(!nt.p){N(nt);return}nt.t+=J*fm,nt.t>=nt.p.km&&N(nt);let gt=nt.p.pts,Dt=nt.t,Y=0;for(;Y+1<gt.length;){let Ut=Math.hypot(gt[Y+1][0]-gt[Y][0],gt[Y+1][1]-gt[Y][1]);if(Dt<=Ut)break;Dt-=Ut,Y++}let Z=gt[Y],at=gt[Math.min(Y+1,gt.length-1)],It=Math.hypot(at[0]-Z[0],at[1]-Z[1])||1,ut=Math.min(1,Dt/It);U.copy(E.surface(Z[0]+(at[0]-Z[0])*ut,Z[1]+(at[1]-Z[1])*ut,.08)),st.setXYZ(Et,U.x,U.y,U.z)}),st.needsUpdate=!0}let V=new ge;V.setAttribute("position",new ue(new Float32Array(3*600),3));let j=new Pi(V,new ri({color:16765806}));j.frustumCulled=!1,j.visible=!1,E.scene.add(j);let K=new Li(V,new oi({color:16765806,size:.22}));K.frustumCulled=!1,K.visible=!1,E.scene.add(K);function et(){let J=a.path;if(!J){j.visible=K.visible=!1;return}let st=V.getAttribute("position"),nt=Math.min(600,J.pts.length);for(let Et=0;Et<nt;Et++){let gt=E.surface(J.pts[Et][0],J.pts[Et][1],.1);st.setXYZ(Et,gt.x,gt.y,gt.z)}V.setDrawRange(0,nt),st.needsUpdate=!0,j.visible=K.visible=!0}return new ResizeObserver(()=>{E.resize(),E.render()}).observe(n),{tw:E,controls:E.controls,render:E.render,look:E.look,placeDrops:z,setPath:et,rivers:S,pts:I}}let d={state:a,ready:()=>!0,pickAt(E,y){let w=ts(o,E,y);return w?(a.pick=[E,y],a.path=w,A&&A.setPath(),c(),h(),w):null},setRain(E){a.raining=E,A&&(A.pts.visible=E),i.querySelectorAll("[data-rain]").forEach(y=>y.setAttribute("aria-pressed",String(E))),h()},view(E){A&&(A.look(E),h())},demo(E){let y=r.places;E==="west"?(d.pickAt(r.peak.e,r.peak.n),d.view("south")):E==="east"?(d.pickAt(y.coastal.e,y.coastal.n),d.view("east")):E==="rain"?(d.setRain(!0),d.view("south")):E==="rivers"&&(d.setRain(!1),d.view("top")),h()},info(){let E=a.path;return{pick:a.pick,km:E&&E.km,drop:E&&E.drop,side:E&&E.side,river:E&&(Zl(s.rivers,E.outlet)||{}).key,cells:bA(o,...a.pick||[0,0])}},goHome(){d.view("south")},render(){A&&A.render()}};i.querySelectorAll("[data-rain]").forEach(E=>E.addEventListener("click",()=>d.setRain(!a.raining))),i.querySelectorAll("[data-view]").forEach(E=>E.addEventListener("click",()=>d.view(E.dataset.view))),i.querySelectorAll("[data-t]").forEach(E=>E.addEventListener("change",()=>{let y=E.dataset.t;y==="labels"&&A?A.tw.showLabels(E.checked):y==="rivers"&&A?A.rivers.visible=E.checked:y==="sea"&&A&&A.tw.terrain.show("water",E.checked),h()})),A&&t(".al-home").addEventListener("click",()=>d.goHome());let l=0,f=!0,m=0,_=0;function p(E){l=0;let y=_?Math.min(.05,(E-_)/1e3):0;_=E;let w=A?A.controls.update():!1;A&&a.raining&&A.placeDrops(y),A&&A.render(),m=w||a.raining?0:m+1,f&&m<60?l=requestAnimationFrame(p):_=0}function h(){m=0,!l&&f&&(l=requestAnimationFrame(p))}return A&&(A.controls.addEventListener("start",h),A.controls.addEventListener("change",h)),new IntersectionObserver(E=>{f=E[0].isIntersecting,f&&h()}).observe(i),c(),h(),i.__lab=d,d}function ql(){document.querySelectorAll("[data-gg-rainbars]").forEach(i=>Wl(i)),document.querySelectorAll("[data-gg-drop]").forEach(i=>Kl(i))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ql):ql();Ql("[data-georain-lab]",gm,{demo:(i,t)=>i.demo(t)});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
