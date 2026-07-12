---
title: "Ray Marching and Signed Distance Fields"
description: "Render infinite geometry on a fullscreen triangle   SDFs, sphere tracing, and the shader loop that replaced polygon soup."
date: "2025-05-24"
tags: ["Shaders", "WebGL", "Graphics"]
featured: true
published: true
thumbnail: "/blog/thumbnails/ray-marching.svg"
---

Polygon rasterization won the real-time race for decades. But in shader land, a fullscreen quad and a `for` loop can render **infinite** detail   no meshes, no UV unwrapping, no LOD chains.

## The setup

Cast a ray from the camera through each pixel. Step along the ray until you hit a surface. That's ray marching   but naive stepping is slow.

**Sphere tracing** uses signed distance functions (SDFs): at any point in space, the SDF returns the distance to the nearest surface. You can safely advance by that distance without overshooting.

```glsl
float map(vec3 p) {
  float sphere = length(p) - 1.0;
  float box = sdBox(p - vec3(2,0,0), vec3(0.5));
  return min(sphere, box);
}

float rayMarch(vec3 ro, vec3 rd) {
  float t = 0.0;
  for (int i = 0; i < 128; i++) {
    vec3 p = ro + rd * t;
    float d = map(p);
    if (d < 0.001) return t;
    t += d;
    if (t > 100.0) break;
  }
  return -1.0;
}
```

## Primitive SDFs

| Shape | SDF |
| --- | --- |
| Sphere | `length(p) - r` |
| Box | `length(max(abs(p)-b, 0))` |
| Torus | complex but closed-form |

**CSG operations** combine shapes with `min` (union), `max` (intersection), and smooth variants.

## Normals and lighting

No vertex normals exist   estimate via gradient:

```glsl
vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.001, 0);
  return normalize(vec3(
    map(p+e.xyy) - map(p-e.xyy),
    map(p+e.yxy) - map(p-e.yxy),
    map(p+e.yyx) - map(p+e.yyx)
  ));
}
```

Then standard Phong/Blinn lighting applies.

## Where it shines

- Demoscene and ShaderToy art
- Procedural planets and terrain
- UI effects and transitions
- Teaching 3D math without engine overhead

## The tradeoff

Ray marching is CPU/GPU **brute force**. Modern games hybridize   SDFs for volumetrics, meshes for characters. But understanding SDFs unlocks a different way to think about geometry entirely.
