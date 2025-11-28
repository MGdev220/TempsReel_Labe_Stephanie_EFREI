export const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  // Le fix pour le plein écran 
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;