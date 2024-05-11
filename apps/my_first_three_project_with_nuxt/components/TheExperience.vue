<script setup lang="ts">
import { Scene, PerspectiveCamera, Mesh, SphereGeometry, MeshBasicMaterial, WebGLRenderer } from "three"
import { useWindowSize } from "@vueuse/core"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { AmbientLight } from "three"

let renderer: WebGLRenderer
let controls: OrbitControls
const experience: Ref<HTMLCanvasElement | null> = ref(null)
const isLoading = ref(true)

const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)

const scene = new Scene()

const camera = new PerspectiveCamera(75, aspectRatio.value, 0.1, 1000)
camera.position.set(0, 0, 700)

scene.add(camera)

const gltfLoader = new GLTFLoader()

const anbientLight = new AmbientLight(0xffffff, 0.5)
scene.add(anbientLight)

gltfLoader.load("/models/the_house_lost_at_sea/scene.gltf", (gltf) => {
  scene.add(gltf.scene)
  console.log("gltf", gltf)
  isLoading.value = false // Set loading to false when the model is loaded
})

const sphere = new Mesh(new SphereGeometry(1, 32, 32), new MeshBasicMaterial({ color: 0x008080 }))

scene.add(sphere)

function updateCamera() {
  camera.aspect = aspectRatio.value
  camera.updateProjectionMatrix()
}

function updateRenderer() {
  renderer.setSize(width.value, height.value)
  renderer.render(scene, camera)
}

function setRenderer() {
  if (experience.value) {
    renderer = new WebGLRenderer({ canvas: experience.value })
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    updateRenderer()
  }
}

watch(aspectRatio, () => {
  updateCamera()
  updateRenderer()
})

onMounted(() => {
  setRenderer()
  loop()
})

const loop = () => {
  controls.update()
  sphere.position.x += 0.01
  updateRenderer()
  requestAnimationFrame(loop)
}
</script>
<template>
  <div class="scene">
    <canvas ref="experience"></canvas>
    <div class="scene-attribute">
      Scene Attribution: <a href="https://sketchfab.com/3d-models/the-house-lost-at-sea-1b3b3b3b3b3b4">Michel Donze</a>
    </div>
    <div v-if="isLoading" class="loading-overlay">Loading...</div>
  </div>
</template>
<style scoped>
.scene {
  position: relative;
  width: 100%; /* Ensure full width */
  height: 100vh; /* Ensure full viewport height */
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
}

.scene-attribute {
  color: white;
  position: absolute;
  bottom: 16px;
  right: 16px;
}

.scene-attribute a {
  color: white;
}
</style>
