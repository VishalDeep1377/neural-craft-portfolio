/**
 * Fresnel Glow + Noise Distortion Shaders
 * Used by the Hero 3D scene icosahedron.
 */

export const fresnelVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uNoiseAmplitude;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  // Simplex-style noise helper
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    // Noise-based vertex displacement
    float noise = snoise(position * 1.2 + uTime * 0.22);
    vec3 displaced = position + normal * noise * uNoiseAmplitude;
    
    vPosition = displaced;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

export const fresnelFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorA;   // inner color (dark)
  uniform vec3 uColorB;   // rim color (accent)
  uniform float uFresnelPower;
  uniform float uOpacity;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    // Camera-space view vector
    vec3 viewDir = normalize(cameraPosition - vPosition);
    
    // Fresnel factor: more rim glow at edges
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), uFresnelPower);
    
    // Animated internal pulse
    float pulse = 0.5 + 0.5 * sin(uTime * 1.8 + vUv.x * 6.28);
    
    // Mix inner → rim color
    vec3 color = mix(uColorA, uColorB, fresnel + pulse * 0.12);
    
    // Edge glow alpha
    float alpha = clamp(fresnel * 1.8 + 0.08, 0.0, 1.0) * uOpacity;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

// Photo card plane — simple vertex pass-through + texture
export const photoVertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const photoFragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHover;
  uniform float uReveal;
  varying vec2 vUv;

  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    
    // Slight saturation boost at rest, warm on hover
    float sat = 0.95 + uHover * 0.15;
    float luminance = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
    vec3 grey = vec3(luminance);
    vec3 color = mix(grey, tex.rgb, sat);
    
    // Reveal wipe from bottom
    float alpha = step(1.0 - uReveal, vUv.y) * tex.a;
    
    // Scanline subtle
    float scanline = 0.97 + 0.03 * sin(vUv.y * 240.0);
    color *= scanline;
    
    gl_FragColor = vec4(color, alpha * uReveal);
  }
`;
