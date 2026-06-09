const e=`#version 300 es
layout(location = 0) in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;var t=100,n=.5,r=.91,i=1.25,a=1200,o=400,s=e=>{let t=Math.min(1,Math.max(0,(e-o)/(a-o)));return i+(r-i)*t},c=.08,l=3,u=8,d=220,f={l:.38,c:1.85},p={l:-.42,c:2},m={l:-.4,c:1.4},h={l:.4,c:1.1},g=2,_=Math.PI*2,v=.32,y=.018,b=.006,x=.018,S=.013,C=.4,w=.01,T=-.2,E=.2,D=e=>Math.max(0,v-e)/v,O=e=>Math.min(1+E,Math.max(-E,e)),k=.06,A=1.3,j=.55,M=[{basePos:[.05,.15],baseRot:-20*Math.PI/180,speed:_/60,colorVar:`--color-mind-m-fg`},{basePos:[.95,.1],baseRot:220*Math.PI/180,speed:_/50,colorVar:`--color-mind-d-fg`},{basePos:[.05,.95],baseRot:160*Math.PI/180,speed:_/72,colorVar:`--color-mind-n-fg`},{basePos:[.55,-.1],baseRot:60*Math.PI/180,speed:_/68,colorVar:`--color-mind-i-fg`}],N=class{gl;canvas;triProgram;downProgram;upProgram;boostProgram;quadBuf;vao;levels=[];width=0;height=0;numBlurPasses=l;boostFbo=null;boostBuf=new Uint8Array;boostCanvas=null;boostCtx=null;bgColor=[0,0,0];isDark=!1;atmoReady=!1;boostRenderCount=0;textFill={cssVar:`--atmo-text-fill`,prev:null,token:0};pillFill={cssVar:`--atmo-pill-fill`,prev:null,token:0};colors=[[0,0,0],[0,0,0],[0,0,0],[0,0,0]];colorVars=M.map(e=>e.colorVar);driftPos=M.map(e=>[e.basePos[0],e.basePos[1]]);driftVel=M.map(()=>[0,0]);rotAngle=M.map(e=>e.baseRot);lastPhysicsTime=0;rafId=null;animTime=0;lastWallTime=null;lastRenderTime=0;docVisible=!0;inViewport=!0;reducedMotion=!1;resizeObserver=null;intersectionObserver=null;themeMql=null;themeListener=null;motionMql=null;motionListener=null;visibilityHandler=null;triUniforms={};downUniforms={};upUniforms={};boostUniforms={};destroyed=!1;constructor(t){this.canvas=t;let n=t.getContext(`webgl2`,{premultipliedAlpha:!1,alpha:!0,antialias:!1,depth:!1,stencil:!1});if(!n)throw Error(`WebGL2 not supported`);this.gl=n,this.triProgram=this.createProgram(e,`#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 outColor;

uniform vec2  u_resolution;
uniform float u_triScale;

uniform vec3  u_colorA;
uniform vec3  u_colorB;
uniform vec3  u_colorC;
uniform vec3  u_colorD;

uniform vec2  u_posA;
uniform vec2  u_posB;
uniform vec2  u_posC;
uniform vec2  u_posD;

uniform float u_rotA;
uniform float u_rotB;
uniform float u_rotC;
uniform float u_rotD;

const float SQRT3_OVER_2 = 0.86602540378;

float edge(vec2 p, vec2 a, vec2 b) {
  return (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
}

bool insideEquilateral(vec2 p, float r) {
  vec2 v0 = vec2(0.0, r);
  vec2 v1 = vec2(-r * SQRT3_OVER_2, -r * 0.5);
  vec2 v2 = vec2(r * SQRT3_OVER_2, -r * 0.5);
  float c0 = edge(p, v0, v1);
  float c1 = edge(p, v1, v2);
  float c2 = edge(p, v2, v0);
  return (c0 >= 0.0 && c1 >= 0.0 && c2 >= 0.0) || (c0 <= 0.0 && c1 <= 0.0 && c2 <= 0.0);
}

vec4 drawTri(vec2 pixelPos, vec2 centerPix, float rotation, float radius, vec3 color) {
  vec2 rel = pixelPos - centerPix;
  float c = cos(-rotation);
  float s = sin(-rotation);
  vec2 local = vec2(c * rel.x - s * rel.y, s * rel.x + c * rel.y);
  if (insideEquilateral(local, radius)) {
    return vec4(color, 0.55);  // matches the SVG triangle opacity
  }
  return vec4(0.0);
}

void main() {
  vec2 pixelPos = v_uv * u_resolution;
  float vmax = max(u_resolution.x, u_resolution.y);
  float radius = vmax * u_triScale * 0.5;

  float rotA = u_rotA;
  float rotB = u_rotB;
  float rotC = u_rotC;
  float rotD = u_rotD;

  vec4 a = drawTri(pixelPos, u_posA * u_resolution, rotA, radius, u_colorA);
  vec4 b = drawTri(pixelPos, u_posB * u_resolution, rotB, radius, u_colorB);
  vec4 c = drawTri(pixelPos, u_posC * u_resolution, rotC, radius, u_colorC);
  vec4 d = drawTri(pixelPos, u_posD * u_resolution, rotD, radius, u_colorD);

  // Lighten (per-channel max): overlapping triangles combine into a brighter
  // mixed hue instead of the top one hiding the rest. Unlike averaging it never
  // drifts toward gray/brown (the result is >= each input per channel), which is
  // what keeps the pastel palette's blends vivid. Order-independent, and a lone
  // triangle is unchanged (max against the absent triangles' zero is itself).
  // Alpha is the union coverage so overall density matches the old compositing.
  vec3 mixed = max(max(a.rgb, b.rgb), max(c.rgb, d.rgb));
  float alpha = 1.0 - (1.0 - a.a) * (1.0 - b.a) * (1.0 - c.a) * (1.0 - d.a);
  outColor = vec4(mixed, alpha);
}
`),this.downProgram=this.createProgram(e,`#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 outColor;

uniform sampler2D u_tex;
uniform vec2 u_halfTexel;  // 0.5 / inputResolution

void main() {
  vec4 sum = texture(u_tex, v_uv) * 4.0;
  sum += texture(u_tex, v_uv - u_halfTexel);
  sum += texture(u_tex, v_uv + u_halfTexel);
  sum += texture(u_tex, v_uv + vec2(u_halfTexel.x, -u_halfTexel.y));
  sum += texture(u_tex, v_uv - vec2(u_halfTexel.x, -u_halfTexel.y));
  outColor = sum / 8.0;
}
`),this.upProgram=this.createProgram(e,`#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 outColor;

uniform sampler2D u_tex;
uniform vec2 u_halfTexel;  // 0.5 / inputResolution (the smaller buffer)

void main() {
  vec4 sum = texture(u_tex, v_uv + vec2(-u_halfTexel.x * 2.0, 0.0));
  sum += texture(u_tex, v_uv + vec2(-u_halfTexel.x, u_halfTexel.y)) * 2.0;
  sum += texture(u_tex, v_uv + vec2(0.0, u_halfTexel.y * 2.0));
  sum += texture(u_tex, v_uv + vec2(u_halfTexel.x, u_halfTexel.y)) * 2.0;
  sum += texture(u_tex, v_uv + vec2(u_halfTexel.x * 2.0, 0.0));
  sum += texture(u_tex, v_uv + vec2(u_halfTexel.x, -u_halfTexel.y)) * 2.0;
  sum += texture(u_tex, v_uv + vec2(0.0, -u_halfTexel.y * 2.0));
  sum += texture(u_tex, v_uv + vec2(-u_halfTexel.x, -u_halfTexel.y)) * 2.0;
  outColor = sum / 12.0;
}
`),this.boostProgram=this.createProgram(e,`#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 outColor;

uniform sampler2D u_tex;
uniform vec3  u_bg;      // theme background, sRGB 0..1
uniform float u_lBoost;  // OKLab lightness delta
uniform float u_cScale;  // chroma multiplier

float s2l(float c) { return c <= 0.04045 ? c / 12.92 : pow((c + 0.055) / 1.055, 2.4); }
float l2s(float c) { c = clamp(c, 0.0, 1.0); return c <= 0.0031308 ? 12.92 * c : 1.055 * pow(c, 1.0 / 2.4) - 0.055; }
vec3 srgbToLinear(vec3 c) { return vec3(s2l(c.r), s2l(c.g), s2l(c.b)); }
vec3 linearToSrgb(vec3 c) { return vec3(l2s(c.r), l2s(c.g), l2s(c.b)); }

vec3 linearToOklab(vec3 c) {
  float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;
  float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;
  float s = 0.0883024619 * c.r + 0.2220049874 * c.g + 0.6896925507 * c.b;
  l = pow(max(l, 0.0), 1.0 / 3.0);
  m = pow(max(m, 0.0), 1.0 / 3.0);
  s = pow(max(s, 0.0), 1.0 / 3.0);
  return vec3(
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s
  );
}

vec3 oklabToLinear(vec3 lab) {
  float l_ = lab.x + 0.3963377774 * lab.y + 0.2158037573 * lab.z;
  float m_ = lab.x - 0.1055613458 * lab.y - 0.0638541728 * lab.z;
  float s_ = lab.x - 0.0894841775 * lab.y - 1.2914855480 * lab.z;
  l_ = l_ * l_ * l_;
  m_ = m_ * m_ * m_;
  s_ = s_ * s_ * s_;
  return vec3(
     4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_
  );
}

void main() {
  vec4 atmo = texture(u_tex, vec2(v_uv.x, 1.0 - v_uv.y));
  vec3 baseSrgb = mix(u_bg, atmo.rgb, atmo.a);
  vec3 lab = linearToOklab(srgbToLinear(baseSrgb));
  float C = length(lab.yz);
  float h = atan(lab.z, lab.y);
  float L = clamp(lab.x + u_lBoost, 0.0, 1.0);
  C *= u_cScale;
  lab = vec3(L, C * cos(h), C * sin(h));
  vec3 outSrgb = clamp(linearToSrgb(oklabToLinear(lab)), 0.0, 1.0);
  outColor = vec4(outSrgb, 1.0);
}
`),this.boostCanvas=document.createElement(`canvas`),this.boostCtx=this.boostCanvas.getContext(`2d`),this.cacheUniforms(),this.createQuad(),this.updateColors(),this.updateReducedMotion(),this.observeSize(),this.observeVisibility(),this.observeTheme(),this.observeReducedMotion()}start(){this.rafId===null&&(this.tick=this.tick.bind(this),this.rafId=requestAnimationFrame(this.tick))}destroy(){this.destroyed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.resizeObserver?.disconnect(),this.intersectionObserver?.disconnect(),this.themeMql&&this.themeListener&&this.themeMql.removeEventListener(`change`,this.themeListener),this.motionMql&&this.motionListener&&this.motionMql.removeEventListener(`change`,this.motionListener),this.visibilityHandler&&document.removeEventListener(`visibilitychange`,this.visibilityHandler);let e=this.gl;for(let t of this.levels)e.deleteFramebuffer(t.fbo),e.deleteTexture(t.tex);this.levels=[],this.boostFbo&&=(e.deleteFramebuffer(this.boostFbo.fbo),e.deleteTexture(this.boostFbo.tex),null),e.deleteBuffer(this.quadBuf),e.deleteVertexArray(this.vao),e.deleteProgram(this.triProgram),e.deleteProgram(this.downProgram),e.deleteProgram(this.upProgram),e.deleteProgram(this.boostProgram),typeof document<`u`&&(document.documentElement.classList.remove(`atmo-ready`),document.documentElement.style.removeProperty(`--atmo-text-fill`),document.documentElement.style.removeProperty(`--atmo-pill-fill`)),this.atmoReady=!1,this.textFill.prev=null,this.pillFill.prev=null}createProgram(e,t){let n=this.gl,r=this.compileShader(n.VERTEX_SHADER,e),i=this.compileShader(n.FRAGMENT_SHADER,t),a=n.createProgram();if(n.attachShader(a,r),n.attachShader(a,i),n.linkProgram(a),!n.getProgramParameter(a,n.LINK_STATUS)){let e=n.getProgramInfoLog(a);throw n.deleteProgram(a),Error(`Program link failed: ${e}`)}return n.deleteShader(r),n.deleteShader(i),a}compileShader(e,t){let n=this.gl,r=n.createShader(e);if(n.shaderSource(r,t),n.compileShader(r),!n.getShaderParameter(r,n.COMPILE_STATUS)){let e=n.getShaderInfoLog(r);throw n.deleteShader(r),Error(`Shader compile failed: ${e}`)}return r}cacheUniforms(){let e=this.gl;for(let t of[`u_resolution`,`u_triScale`,`u_colorA`,`u_colorB`,`u_colorC`,`u_colorD`,`u_posA`,`u_posB`,`u_posC`,`u_posD`,`u_rotA`,`u_rotB`,`u_rotC`,`u_rotD`])this.triUniforms[t]=e.getUniformLocation(this.triProgram,t);for(let t of[`u_tex`,`u_halfTexel`])this.downUniforms[t]=e.getUniformLocation(this.downProgram,t),this.upUniforms[t]=e.getUniformLocation(this.upProgram,t);for(let t of[`u_tex`,`u_bg`,`u_lBoost`,`u_cScale`])this.boostUniforms[t]=e.getUniformLocation(this.boostProgram,t)}createQuad(){let e=this.gl;this.vao=e.createVertexArray(),e.bindVertexArray(this.vao),this.quadBuf=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.quadBuf),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindVertexArray(null)}observeSize(){this.resizeObserver=new ResizeObserver(e=>{let t=e[0];if(!t)return;let r=Math.max(1,Math.floor(t.contentRect.width*n)),i=Math.max(1,Math.floor(t.contentRect.height*n));this.resize(r,i)}),this.resizeObserver.observe(this.canvas);let e=Math.max(1,Math.floor(this.canvas.clientWidth*n)),t=Math.max(1,Math.floor(this.canvas.clientHeight*n));e>1&&t>1&&this.resize(e,t)}observeVisibility(){this.visibilityHandler=()=>{this.docVisible=!document.hidden},document.addEventListener(`visibilitychange`,this.visibilityHandler),this.intersectionObserver=new IntersectionObserver(e=>{let t=e[0];t&&(this.inViewport=t.isIntersecting)},{root:null,threshold:0}),this.intersectionObserver.observe(this.canvas)}observeTheme(){this.themeMql=window.matchMedia(`(prefers-color-scheme: dark)`),this.isDark=this.themeMql.matches,this.themeListener=()=>{this.isDark=this.themeMql?.matches??!1,requestAnimationFrame(()=>this.updateColors())},this.themeMql.addEventListener(`change`,this.themeListener)}observeReducedMotion(){this.motionMql=window.matchMedia(`(prefers-reduced-motion: reduce)`),this.motionListener=()=>this.updateReducedMotion(),this.motionMql.addEventListener(`change`,this.motionListener)}updateReducedMotion(){this.reducedMotion=this.motionMql?.matches??!1}updateColors(){let e=getComputedStyle(document.documentElement),t=document.createElement(`canvas`);t.width=1,t.height=1;let n=t.getContext(`2d`,{willReadFrequently:!0});if(!n)return;let r=e=>{n.clearRect(0,0,1,1),n.fillStyle=e||`black`,n.fillRect(0,0,1,1);let t=n.getImageData(0,0,1,1).data;return[t[0]/255,t[1]/255,t[2]/255]},i=t=>(t.startsWith(`--`)?e.getPropertyValue(t).trim():t)||t;this.colors=this.colorVars.map(e=>r(i(e))),this.bgColor=r(e.getPropertyValue(`--color-bg`).trim())}setColorVars(e){this.colorVars=e&&e.length===4?[...e]:M.map(e=>e.colorVar),this.updateColors()}resize(e,t){e===this.width&&t===this.height||(this.width=e,this.height=t,this.canvas.width=e,this.canvas.height=t,this.rebuildLevels())}rebuildLevels(){let e=this.gl;for(let t of this.levels)e.deleteFramebuffer(t.fbo),e.deleteTexture(t.tex);this.levels=[];let t=Math.max(this.width,this.height)/n*c*n,r=Math.round(Math.log2(Math.max(2,t)));this.numBlurPasses=Math.max(l,Math.min(u,r));let i=this.width,a=this.height,o=this.numBlurPasses+1;for(let e=0;e<o;e++)this.levels.push(this.createFbo(i,a)),i=Math.max(1,i>>1),a=Math.max(1,a>>1);this.boostFbo&&(e.deleteFramebuffer(this.boostFbo.fbo),e.deleteTexture(this.boostFbo.tex));let s=d,f=Math.max(1,Math.round(d*this.height/this.width));this.boostFbo=this.createFbo(s,f),this.boostBuf=new Uint8Array(s*f*4),this.boostCanvas&&(this.boostCanvas.width=s,this.boostCanvas.height=f)}createFbo(e,t){let n=this.gl,r=n.createTexture();n.bindTexture(n.TEXTURE_2D,r),n.texImage2D(n.TEXTURE_2D,0,n.RGBA8,e,t,0,n.RGBA,n.UNSIGNED_BYTE,null),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE);let i=n.createFramebuffer();return n.bindFramebuffer(n.FRAMEBUFFER,i),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,r,0),{fbo:i,tex:r,w:e,h:t}}tick(e){if(!this.destroyed){if(this.rafId=requestAnimationFrame(this.tick),!this.docVisible||!this.inViewport||this.levels.length===0){this.lastWallTime=null;return}if(this.lastWallTime!==null){let t=Math.min((e-this.lastWallTime)/1e3,.5);this.animTime+=this.reducedMotion?t*.05:t}this.lastWallTime=e,e-this.lastRenderTime>=t&&(this.render(),this.publishBoost(),this.lastRenderTime=e)}}stepDrift(e){if(e<=0)return;let t=this.animTime;for(let n=0;n<M.length;n++){let r=this.driftPos[n],i=this.driftVel[n],a=D(r[0])-D(1-r[0]),o=-D(1-r[1]),s=y*a+b*Math.sin(t*x+n*1.7),c=y*o+b*Math.cos(t*S+n*2.3)-w;i[0]+=s*e,i[1]+=c*e;let l=Math.exp(-C*e);i[0]*=l,i[1]*=l,r[0]=O(r[0]+i[0]*e);let u=r[1]+i[1]*e;u<T?(u=T,i[1]<0&&(i[1]=0)):u>1+E&&(u=1+E,i[1]>0&&(i[1]=0)),r[1]=u;let d=M[n].speed*(j+A*Math.sin(t*k+n*2.1));this.rotAngle[n]=this.rotAngle[n]+d*e}}render(){let e=this.gl,t=Math.min(Math.max(this.animTime-this.lastPhysicsTime,0),.25);this.lastPhysicsTime=this.animTime,this.stepDrift(t),e.bindVertexArray(this.vao),e.disable(e.BLEND);let r=this.levels[0];e.bindFramebuffer(e.FRAMEBUFFER,r.fbo),e.viewport(0,0,r.w,r.h),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(this.triProgram);let i=this.triUniforms;e.uniform2f(i.u_resolution,r.w,r.h),e.uniform1f(i.u_triScale,s(this.width/n)),e.uniform3fv(i.u_colorA,this.colors[0]),e.uniform3fv(i.u_colorB,this.colors[1]),e.uniform3fv(i.u_colorC,this.colors[2]),e.uniform3fv(i.u_colorD,this.colors[3]);let a=[i.u_posA,i.u_posB,i.u_posC,i.u_posD],o=[i.u_rotA,i.u_rotB,i.u_rotC,i.u_rotD];for(let t=0;t<M.length;t++){let n=this.driftPos[t];e.uniform2f(a[t],n[0],n[1]),e.uniform1f(o[t],this.rotAngle[t])}e.drawArrays(e.TRIANGLE_STRIP,0,4),e.useProgram(this.downProgram),e.uniform1i(this.downUniforms.u_tex,0),e.activeTexture(e.TEXTURE0);for(let t=0;t<this.numBlurPasses;t++){let n=this.levels[t],r=this.levels[t+1];e.bindTexture(e.TEXTURE_2D,n.tex),e.bindFramebuffer(e.FRAMEBUFFER,r.fbo),e.viewport(0,0,r.w,r.h),e.uniform2f(this.downUniforms.u_halfTexel,.5/n.w,.5/n.h),e.drawArrays(e.TRIANGLE_STRIP,0,4)}e.useProgram(this.upProgram),e.uniform1i(this.upUniforms.u_tex,0);for(let t=this.numBlurPasses;t>1;t--){let n=this.levels[t],r=this.levels[t-1];e.bindTexture(e.TEXTURE_2D,n.tex),e.bindFramebuffer(e.FRAMEBUFFER,r.fbo),e.viewport(0,0,r.w,r.h),e.uniform2f(this.upUniforms.u_halfTexel,.5/n.w,.5/n.h),e.drawArrays(e.TRIANGLE_STRIP,0,4)}let c=this.levels[1];e.bindTexture(e.TEXTURE_2D,c.tex),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,this.width,this.height),e.uniform2f(this.upUniforms.u_halfTexel,.5/c.w,.5/c.h),e.drawArrays(e.TRIANGLE_STRIP,0,4)}publishBoost(){let e=this.boostFbo,t=this.levels[1];!e||!t||!this.boostCtx||!this.boostCanvas||this.boostRenderCount++%g===0&&(this.renderFill(t,e,this.isDark?f:p,this.textFill),this.renderFill(t,e,this.isDark?m:h,this.pillFill),this.atmoReady||=(document.documentElement.classList.add(`atmo-ready`),!0))}renderFill(e,t,n,r){let i=this.gl;i.useProgram(this.boostProgram),i.bindVertexArray(this.vao),i.disable(i.BLEND),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,e.tex),i.uniform1i(this.boostUniforms.u_tex,0),i.uniform3f(this.boostUniforms.u_bg,this.bgColor[0],this.bgColor[1],this.bgColor[2]),i.uniform1f(this.boostUniforms.u_lBoost,n.l),i.uniform1f(this.boostUniforms.u_cScale,n.c),i.bindFramebuffer(i.FRAMEBUFFER,t.fbo),i.viewport(0,0,t.w,t.h),i.drawArrays(i.TRIANGLE_STRIP,0,4),i.readPixels(0,0,t.w,t.h,i.RGBA,i.UNSIGNED_BYTE,this.boostBuf);let a=new ImageData(new Uint8ClampedArray(this.boostBuf),t.w,t.h);this.boostCtx.putImageData(a,0,0);let o=this.boostCanvas.toDataURL(`image/jpeg`,.82),s=r.prev,c=++r.token,l=()=>{if(c!==r.token)return;let e=s?`url("${o}"), url("${s}")`:`url("${o}")`;document.documentElement.style.setProperty(r.cssVar,e),r.prev=o},u=new Image;u.src=o,typeof u.decode==`function`?u.decode().then(l).catch(l):l()}};export{N as AtmosphereRenderer};