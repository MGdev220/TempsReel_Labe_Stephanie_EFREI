<template>
  <div class="shader-container">
    <canvas ref="canvas" class="shader-canvas"></canvas>
    
    <div class="ui-overlay">
      <div class="header-controls">
        <button @click="togglePause" class="control-btn" :class="{ active: isPaused }">
          {{ isPaused ? '▶' : '⏸' }}
        </button>
        
        <div class="control-item">
          <label>Style</label>
          <select v-model="colorPalette" class="control-select">
            <option value="0">Synthwave</option>
            <option value="1">Vaporwave</option>
            <option value="2">Néon</option>
            <option value="3">Rétro</option>
            <option value="4">Stéréo</option>
            <option value="5">Vague Terrain</option>
          </select>
        </div>
        
        <div class="control-item">
          <label>Vitesse: {{ Number(animationSpeed).toFixed(1) }}x</label>
          <input 
            type="range" 
            v-model.number="animationSpeed" 
            min="0.1" 
            max="5.0" 
            step="0.1"
            class="control-slider"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { SceneManager } from '../webgl/scenemanager.js'

export default {
  name: 'ShaderBackground',
  data() {
    return {
      sceneManager: null,
      isPaused: false,
      colorPalette: 0,
      animationSpeed: 1.0
    }
  },
  
  // Les watchers envoient les changements
  watch: {
    isPaused(val) {
      if (this.sceneManager) this.sceneManager.setPause(val)
    },
    colorPalette(val) {
      if (this.sceneManager) this.sceneManager.updateUniform('u_colorPalette', parseFloat(val))
    },
    animationSpeed(val) {
      if (this.sceneManager) this.sceneManager.updateUniform('u_animationSpeed', Number(val))
    }
  },
  
  mounted() {
 
    this.sceneManager = new SceneManager(this.$refs.canvas)
    
    //  Listeners
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('click', this.handleClick)
    window.addEventListener('keydown', this.handleKeydown)
  },
  
  beforeUnmount() {
    if (this.sceneManager) this.sceneManager.dispose()
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('click', this.handleClick)
    window.removeEventListener('keydown', this.handleKeydown)
  },
  
  methods: {
    togglePause() {
      this.isPaused = !this.isPaused
    },
    
    handleResize() {
      if (this.sceneManager) this.sceneManager.resize()
    },
    
    handleMouseMove(e) {
      if (this.sceneManager) this.sceneManager.setMouse(e.clientX, e.clientY)
    },
    
    handleClick(e) {
      if (!this.sceneManager) return
      
      const isCurrentlyActive = this.sceneManager.uniforms.u_clickActive.value > 0.5
      this.sceneManager.setClick(e.clientX, e.clientY, !isCurrentlyActive)
    },

    handleKeydown(e) {
      if (e.key === 'q' || e.key === 'Q') {
        this.colorPalette = (this.colorPalette - 1 + 6) % 6
      }
      if (e.key === 'w' || e.key === 'W') {
        this.colorPalette = (this.colorPalette + 1) % 6
      }
      if (e.key === ' ') {
        e.preventDefault()
        this.togglePause()
      }
    }
  }
}
</script>

<style scoped>

.shader-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; }
.shader-canvas { display: block; width: 100%; height: 100%; }
.ui-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10; }
.header-controls { position: absolute; top: 0; left: 0; display: flex; align-items: center; gap: 15px; padding: 10px 20px; color: white; font-family: 'Courier New', monospace; pointer-events: auto; }
.control-btn { background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border: none; color: white; padding: 8px 12px; border-radius: 6px; cursor: pointer; min-width: 40px; height: 36px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); }
.control-btn.active { background: linear-gradient(45deg, #ff4757, #2ed573); }
.control-item { display: flex; align-items: center; gap: 10px; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(10px); padding: 6px 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); }
.control-item label { font-size: 0.85em; color: #ccc; white-space: nowrap; }
.control-select { padding: 6px 10px; border-radius: 6px; background: rgba(0, 0, 0, 0.7); color: white; border: 1px solid #444; }
.control-slider { width: 120px; height: 4px; background: #333; }
</style>