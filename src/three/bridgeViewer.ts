import * as THREE from 'three'
export interface BridgeViewer {
  rotate: (angle: number) => void; zoom: (factor: number) => void
  elevation: (enabled: boolean) => void; fea: (enabled: boolean) => void
  reset: () => void; dispose: () => void
}
/** Illustrative geometry, not an analysis model or fabrication drawing. */
export function createBridgeViewer(host: HTMLElement, onOrbit: () => void, onFailure: () => void, onReset: () => void): BridgeViewer {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
  renderer.setClearColor(0x141a19, 0)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15
  const canvas = renderer.domElement
  canvas.tabIndex = 0
  canvas.setAttribute('role', 'img')
  canvas.setAttribute('aria-label', 'Interactive 3D steel bridge. Drag or use arrow keys to orbit, plus and minus to zoom, Home to reset. Perspective, elevation and load-path controls are below.')
  host.appendChild(canvas)
  const scene = new THREE.Scene(), perspective = new THREE.PerspectiveCamera(34, 1, .1, 150)
  const orthographic = new THREE.OrthographicCamera(-12, 12, 9, -9, .1, 150)
  let camera: THREE.PerspectiveCamera | THREE.OrthographicCamera = perspective
  const model = new THREE.Group(); scene.add(model)
  scene.add(new THREE.HemisphereLight(0xf4f6e9, 0x34473e, 3))
  const key = new THREE.DirectionalLight(0xfff4e2, 4); key.position.set(-8, 14, 8); scene.add(key)
  const rim = new THREE.DirectionalLight(0xb8d9d5, 3); rim.position.set(6, 8, -10); scene.add(rim)
  const groups = { truss: new THREE.Group(), deck: new THREE.Group(), bracing: new THREE.Group(), supports: new THREE.Group() }
  Object.values(groups).forEach(group => model.add(group))
  function createConcreteTexture() {
    const c = document.createElement('canvas'); c.width = 256; c.height = 256
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#a4aca9'; ctx.fillRect(0,0,256,256)
    for(let i=0; i<8000; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? '#959e9a' : '#b6beba'
      ctx.fillRect(Math.random()*256, Math.random()*256, Math.random()*2+1, Math.random()*2+1)
    }
    const tex = new THREE.CanvasTexture(c)
    tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping
    return tex
  }
  const concreteTex = createConcreteTexture()
  const trussSteel = new THREE.MeshStandardMaterial({ color: 0xc47b59, metalness: .6, roughness: .4 })
  const topChordSteel = new THREE.MeshStandardMaterial({ color: 0xc47b59, metalness: .6, roughness: .4 })
  const connectionSteel = new THREE.MeshStandardMaterial({ color: 0x222624, metalness: .7, roughness: .3 })
  const deckSteel = new THREE.MeshStandardMaterial({ color: 0xb57050, metalness: .6, roughness: .5 })
  const bracingSteel = new THREE.MeshStandardMaterial({ color: 0xd68965, metalness: .5, roughness: .4 })
  const railSteel = new THREE.MeshStandardMaterial({ color: 0x111312, metalness: .5, roughness: .5 })
  const road = new THREE.MeshStandardMaterial({ color: 0x333b38, roughness: .9 })
  const concrete = new THREE.MeshStandardMaterial({ map: concreteTex, roughness: 1 })
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x8caaa0, transparent: true, opacity: .19 })
  const unit = new THREE.BoxGeometry(1, 1, 1), edges = new THREE.EdgesGeometry(unit)
  const feaBoxGeom = new THREE.BoxGeometry(1, 1, 1, 4, 16, 4)
  const meshes: THREE.Mesh[] = []
  function box(group: THREE.Group, x: number, y: number, z: number, w: number, h: number, d: number, material: THREE.MeshStandardMaterial) {
    const mesh = new THREE.Mesh(unit, material)
    mesh.position.set(x,y,z); mesh.scale.set(w,h,d)
    mesh.userData.part = Object.entries(groups).find(([,value]) => value === group)?.[0]
    mesh.add(new THREE.LineSegments(edges, lineMaterial)); group.add(mesh); meshes.push(mesh)
    return mesh
  }
  function beam(group: THREE.Group, a: number[], b: number[], thickness: number, material: THREE.MeshStandardMaterial) {
    const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b), middle = start.clone().add(end).multiplyScalar(.5)
    const mesh = box(group,middle.x,middle.y,middle.z,thickness,start.distanceTo(end),thickness, material)
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),end.sub(start).normalize())
  }
  // Eight panels, polygonal arched upper chord and overhead X-bracing.
  const nodes = Array.from({length: 9}, (_,i) => ({ x: -8+i*2, y: 1.35 + 3.25*Math.sin(Math.PI*i/8) ** .6 }))
  for (const z of [-2,2]) {
    beam(groups.truss,[-8,1,z],[8,1,z],.22, trussSteel)
    for (let i=0; i<nodes.length; i++) {
      const n = nodes[i]!
      beam(groups.truss,[n.x,1,z],[n.x,n.y,z],.15, trussSteel)
      box(groups.truss,n.x,1,z,.34,.34,.12, connectionSteel); box(groups.truss,n.x,n.y,z,.34,.34,.12, connectionSteel)
      if (i<8) {
        const next=nodes[i+1]!
        beam(groups.truss,[n.x,n.y,z],[next.x,next.y,z],.23, topChordSteel)
        beam(groups.truss,[n.x,i<4?n.y:1,z],[next.x,i<4?1:next.y,z],.12, trussSteel)
      }
    }
    for (let x=-8; x<=8; x+=.5) beam(groups.deck,[x,1,z*1.12],[x,1.65,z*1.12],.035, railSteel)
    for (const y of [1.32,1.65]) beam(groups.deck,[-8,y,z*1.12],[8,y,z*1.12],.045, railSteel)
  }
  const roadMesh = box(groups.deck,0,.88,0,16.7,.2,4.65,road)
  roadMesh.userData.isRoad = true
  for(let x=-8; x<=8; x+=2) beam(groups.deck,[x,.65,-2.4],[x,.65,2.4],.17, deckSteel)
  for(const z of [-1,0,1]) beam(groups.deck,[-8,.68,z],[8,.68,z],.14, deckSteel)
  for(let i=1; i<8; i++) {
    const n=nodes[i]!
    beam(groups.bracing,[n.x,n.y,-2],[n.x,n.y,2],.13, bracingSteel)
    if(i<7) {
      const next=nodes[i+1]!
      beam(groups.bracing,[n.x,n.y,-2],[next.x,next.y,2],.075, bracingSteel)
      beam(groups.bracing,[n.x,n.y,2],[next.x,next.y,-2],.075, bracingSteel)
    }
  }
  for (const x of [-7.7,7.7]) {
    box(groups.supports,x,-.02,0,.85,1.25,4.85,concrete)
    box(groups.supports,x,-.7,0,1.6,.22,5.3,concrete)
    for(const z of [-2,2]) box(groups.supports,x,.68,z,.5,.2,.5, concrete)
  }
  const grid = new THREE.GridHelper(24,24,0x446158,0x2a3a34)
  grid.position.y=-.83; grid.material.transparent=true; grid.material.opacity=.3; scene.add(grid)
  const materials=new Map<string,THREE.MeshStandardMaterial>()
  const outlines=new Map<string,THREE.LineBasicMaterial>()
  meshes.forEach(mesh => {
    const source=mesh.material as THREE.MeshStandardMaterial, id=`${mesh.userData.part}-${source.uuid}`
    if(!materials.has(id)) materials.set(id,source.clone())
    mesh.material=materials.get(id)!
    mesh.userData.baseColor=source.color.clone()
    mesh.userData.baseRoughness=source.roughness
    mesh.userData.baseMetalness=source.metalness
    if(!outlines.has(id)) outlines.set(id,lineMaterial.clone())
    ;(mesh.children[0] as THREE.LineSegments).material=outlines.get(id)!
  })
  const feaWires: THREE.LineSegments[] = []
  let feaModeActive = false

  /**
   * True ANSYS/Abaqus 7-stop rainbow colormap: blue→cyan→green→yellow→orange→red
   */
  function feaColor(s: number): THREE.Color {
    s = THREE.MathUtils.clamp(s, 0, 1)
    const stops: [number,number,number,number][] = [
      [0.000,   0,   0, 255],
      [0.166,   0, 128, 255],
      [0.333,   0, 255, 255],
      [0.500,   0, 255,   0],
      [0.666, 255, 255,   0],
      [0.833, 255, 128,   0],
      [1.000, 255,   0,   0],
    ]
    let lo = stops[0]!, hi = stops[stops.length-1]!
    for (let i = 0; i < stops.length-1; i++) {
      if (s >= stops[i]![0] && s <= stops[i+1]![0]) { lo = stops[i]!; hi = stops[i+1]!; break }
    }
    const t = lo[0] === hi[0] ? 0 : (s - lo[0]) / (hi[0] - lo[0])
    return new THREE.Color(
      (lo[1] + (hi[1]-lo[1])*t) / 255,
      (lo[2] + (hi[2]-lo[2])*t) / 255,
      (lo[3] + (hi[3]-lo[3])*t) / 255,
    )
  }

  function vertexStress(wx: number, wy: number, wz: number, part: string): number {
    const normX = Math.abs(wx) / 8  // 0 = midspan, 1 = support

    let s = 0

    if (part === 'supports') {
      // Piers: RED at the top (where they meet the deck), GREEN/BLUE at the bottom
      // Using the exact pattern from image 1a and 2a
      const normH = THREE.MathUtils.clamp((wy + 0.85) / 1.6, 0, 1)
      s = 0.4 + 0.6 * normH
    } else {
      // Bridge span (deck, truss): RED at ends (supports), BLUE at midspan
      // The images clearly show the stress is highest at the supports
      s = Math.pow(normX, 1.4)
      
      // Add a slight vertical variation to give the mesh some 3D stress depth
      const normY = THREE.MathUtils.clamp((wy + 0.5) / 4.0, 0, 1)
      s += normY * 0.15
    }

    // Small spatial noise to mimic finite element mesh discretisation scatter
    s += Math.sin(wx*12.7) * Math.cos(wy*15.2) * Math.sin(wz*14.1) * 0.02

    return THREE.MathUtils.clamp(s, 0, 1)
  }

  function showFEA(enabled: boolean) {
    feaModeActive = enabled
    for (const w of feaWires) { w.parent?.remove(w); w.geometry.dispose(); (w.material as THREE.Material).dispose() }
    feaWires.length = 0
    for (const mesh of meshes) {
      const material = mesh.material as THREE.MeshStandardMaterial
      const part = mesh.userData.part as string
      const lineMesh = mesh.children[0] as THREE.LineSegments

      if (enabled) {
        // Build vertex-coloured high-res FEA geometry (cached per mesh)
        if (!mesh.userData.feaGeometry) {
          const geom = feaBoxGeom.clone()
          const pos = geom.attributes.position as THREE.BufferAttribute
          const colors = new Float32Array(pos.count * 3)
          mesh.updateMatrixWorld(true)
          for (let i = 0; i < pos.count; i++) {
            const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
            v.applyMatrix4(mesh.matrixWorld)
            const c = feaColor(vertexStress(v.x, v.y, v.z, part))
            colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b
          }
          geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))
          mesh.userData.feaGeometry = geom
        }
        // Swap back to MeshStandardMaterial to give 3D contrast and shading,
        // avoiding the over-saturated flat look.
        mesh.geometry = mesh.userData.feaGeometry
        material.vertexColors = true
        material.color.setHex(0xffffff)
        // Add a slight emissive boost so the colors still pop in shadows
        material.emissive.setHex(0x222222)
        material.roughness = 0.7
        material.metalness = 0.1
        material.needsUpdate = true
        lineMesh.visible = false
        // Faint black wireframe overlay
        const wireMat = new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35, depthTest: true })
        const wire = new THREE.LineSegments(new THREE.WireframeGeometry(mesh.userData.feaGeometry), wireMat)
        mesh.add(wire); feaWires.push(wire)
      } else {
        mesh.geometry = unit
        material.vertexColors = false
        material.color.copy(mesh.userData.baseColor as THREE.Color)
        material.emissive.setHex(0x000000)
        material.roughness = mesh.userData.baseRoughness as number
        material.metalness = mesh.userData.baseMetalness as number
        material.needsUpdate = true
        mesh.visible = true
        lineMesh.visible = true
        ;(lineMesh.material as THREE.LineBasicMaterial).color.setHex(0x8caaa0)
        ;(lineMesh.material as THREE.LineBasicMaterial).opacity = 0.19
      }
    }
    render()
  }
  let yaw=-.9, pitch=.43, distance=28, alive=true, visible=true, isElevation=false
  function render() {
    if(!alive || !visible) return
    if(isElevation) camera.position.set(0,1.8,30)
    else camera.position.set(Math.sin(yaw)*distance*Math.cos(pitch),1.8+Math.sin(pitch)*distance,Math.cos(yaw)*distance*Math.cos(pitch))
    camera.lookAt(0,1.8,0); renderer.render(scene,camera)
  }
  function orbit() {
    if(isElevation) { isElevation=false; camera=perspective; grid.visible=true; onOrbit() }
  }
  function resize() {
    const {width,height}=host.getBoundingClientRect()
    if(!width || !height) return
    perspective.aspect=width/height; perspective.updateProjectionMatrix()
    orthographic.left=-10.5; orthographic.right=10.5
    orthographic.top=10.5*height/width; orthographic.bottom=-orthographic.top
    orthographic.updateProjectionMatrix(); renderer.setSize(width,height,false); render()
  }
  const resizeObserver=new ResizeObserver(resize); resizeObserver.observe(host)
  const intersection=new IntersectionObserver(([entry]) => { visible=!!entry?.isIntersecting; if(visible) render() }); intersection.observe(host)
  let pointer: {lastX:number;lastY:number;id:number} | undefined
  function down(event: PointerEvent) {
    if(!event.isPrimary || event.button!==0) return
    canvas.focus({preventScroll:true})
    pointer={lastX:event.clientX,lastY:event.clientY,id:event.pointerId}
    canvas.setPointerCapture(event.pointerId)
  }
  function move(event: PointerEvent) {
    if(!pointer || event.pointerId!==pointer.id) return
    orbit()
    yaw-=(event.clientX-pointer.lastX)*.008
    pitch=THREE.MathUtils.clamp(pitch+(event.clientY-pointer.lastY)*.006,.08,1.25)
    pointer.lastX=event.clientX; pointer.lastY=event.clientY; render()
  }
  function up(event: PointerEvent) {
    if(!pointer || event.pointerId!==pointer.id) return
    pointer=undefined
    if(canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId)
  }
  function cancel() { pointer=undefined }
  const api: BridgeViewer = {
    rotate(angle) { orbit(); yaw+=angle; render() },
    zoom(factor) {
      if(isElevation) { orthographic.zoom=THREE.MathUtils.clamp(orthographic.zoom/factor,.7,1.6); orthographic.updateProjectionMatrix() }
      else distance=THREE.MathUtils.clamp(distance*factor,18,42)
      render()
    },
    elevation(enabled) { isElevation=enabled; camera=enabled?orthographic:perspective; grid.visible=!enabled && !feaModeActive; render() },
    fea: showFEA,
    reset() { yaw=-.9; pitch=.43; distance=28; orthographic.zoom=1; orthographic.updateProjectionMatrix(); isElevation=false; camera=perspective; if(!feaModeActive) grid.visible=true; render() },
    dispose() {
      if(!alive) return
      alive=false; resizeObserver.disconnect(); intersection.disconnect()
      canvas.removeEventListener('pointerdown',down); canvas.removeEventListener('pointermove',move); canvas.removeEventListener('pointerup',up); canvas.removeEventListener('pointercancel',cancel)
      canvas.removeEventListener('keydown',keydown); canvas.removeEventListener('webglcontextlost',lost)
      feaWires.forEach(w => { w.geometry.dispose(); (w.material as THREE.Material).dispose() })
      unit.dispose(); edges.dispose(); feaBoxGeom.dispose()
      trussSteel.dispose(); deckSteel.dispose(); bracingSteel.dispose(); railSteel.dispose(); road.dispose(); concrete.dispose(); lineMaterial.dispose()
      meshes.forEach(mesh => { if(mesh.userData.feaGeometry) mesh.userData.feaGeometry.dispose() })
      materials.forEach(material=>material.dispose()); outlines.forEach(material=>material.dispose())
      grid.geometry.dispose(); grid.material.dispose(); renderer.dispose(); canvas.remove()
    },
  }
  function keydown(event: KeyboardEvent) {
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','Home'].includes(event.key)) return
    event.preventDefault()
    if(event.key==='ArrowLeft') api.rotate(-.15)
    if(event.key==='ArrowRight') api.rotate(.15)
    if(event.key==='ArrowUp' || event.key==='ArrowDown') { orbit(); pitch=THREE.MathUtils.clamp(pitch+(event.key==='ArrowUp' ? .1 : -.1),.08,1.25); render() }
    if(event.key==='+' || event.key==='=') api.zoom(.9)
    if(event.key==='-') api.zoom(1.1)
    if(event.key==='Home') onReset()
  }
  function lost(event: Event) { event.preventDefault(); onFailure(); api.dispose() }
  canvas.addEventListener('pointerdown',down); canvas.addEventListener('pointermove',move); canvas.addEventListener('pointerup',up); canvas.addEventListener('pointercancel',cancel)
  canvas.addEventListener('keydown',keydown); canvas.addEventListener('webglcontextlost',lost)
  resize()
  return api
}
