import * as THREE from 'three'
import { vertexShader } from '../assets/shaders/vertex.js'
import { fragmentShader } from '../assets/shaders/fragment.js'

export class SceneManager {
  constructor(canvas) {
    this.canvas = canvas
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.isPaused = false

    this.init()
  }

  init() {
    this.scene = new THREE.Scene()
    
    
    this.camera = new THREE.Camera() 
    
    
    const geometry = new THREE.PlaneGeometry(2, 2)
    
    this.uniforms = {
      u_resolution: { value: new THREE.Vector2(this.width, this.height) },
      u_time: { value: 0.0 },
      u_timeDelta: { value: 0.016 },
      u_mouse: { value: new THREE.Vector2() },
      u_clickPos: { value: new THREE.Vector2() },
      u_clickActive: { value: 0.0 },
      u_colorPalette: { value: 0.0 },
      u_animationSpeed: { value: 1.0 }
    }

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    })

    this.scene.add(new THREE.Mesh(geometry, material))

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: "high-performance"
    })
    
    this.renderer.setSize(this.width, this.height, false)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    this.clock = new THREE.Clock()
    
    
    this.animate = this.animate.bind(this)
    requestAnimationFrame(this.animate)
  }

  // --- Méthodes de contrôle ---

  setPause(paused) {
    this.isPaused = paused
    
    if (paused) {
      this.clock.stop()
    } else {
      this.clock.start()
    }
  }

  setMouse(x, y) {
    this.uniforms.u_mouse.value.set(x, y)
  }

  setClick(x, y, active) {
    if (active) this.uniforms.u_clickPos.value.set(x, y)
    this.uniforms.u_clickActive.value = active ? 1.0 : 0.0
  }

  updateUniform(name, value) {
    if (this.uniforms[name]) {
      this.uniforms[name].value = value
    }
  }

  resize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.renderer.setSize(this.width, this.height, false)
    this.uniforms.u_resolution.value.set(this.width, this.height)
  }

  animate() {
    requestAnimationFrame(this.animate)

    const delta = this.clock.getDelta()

    //  On gère le temps ici
    if (!this.isPaused) {
      this.uniforms.u_time.value += delta
      this.uniforms.u_timeDelta.value = delta
    } else {
       
      this.uniforms.u_timeDelta.value = 0.0
    }

    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.renderer.dispose()
    this.renderer.forceContextLoss()
  }
}