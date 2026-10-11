import * as THREE from 'three'
import { feaPalette } from './feaPalette'
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
  const trussSteel = new THREE.MeshStandardMaterial({ color: 0x86a99a, metalness: .6, roughness: .4 })
  const topChordSteel = new THREE.MeshStandardMaterial({ color: 0x86a99a, metalness: .6, roughness: .4 })
  const connectionSteel = new THREE.MeshStandardMaterial({ color: 0x162d4a, metalness: .75, roughness: .35 })
  const deckSteel = new THREE.MeshStandardMaterial({ color: 0x7b9b8c, metalness: .6, roughness: .5 })
  const bracingSteel = new THREE.MeshStandardMaterial({ color: 0x93b6a5, metalness: .5, roughness: .4 })
  const railSteel = new THREE.MeshStandardMaterial({ color: 0x111312, metalness: .5, roughness: .5 })
  const road = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: .9 })
  const concrete = new THREE.MeshStandardMaterial({ map: concreteTex, roughness: 1 })
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x8caaa0, transparent: true, opacity: .19 })
  const unit = new THREE.BoxGeometry(1, 1, 1), edges = new THREE.EdgesGeometry(unit)
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
  // Compact, paired gussets sit outside the member faces instead of being
  // buried inside the chords. Chamfered shoulders suggest the web load path.
  const connectionGeometries: THREE.BufferGeometry[] = []
  const boltPositions: THREE.Vector3[] = []
  // Convex side-profile limits: end planes, lower chord underside, and the
  // actual outer edge of each sloping upper-chord segment (half-width .115).
  const profileLimits: [number, number, number][] = [[1,0,8],[-1,0,8],[0,-1,-.89]]
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i]!, b = nodes[i+1]!
    const slope = (b.y-a.y)/(b.x-a.x)
    profileLimits.push([-slope,1,a.y-slope*a.x + .115*Math.hypot(1,slope)])
  }
  function trimToProfile(points: THREE.Vector2[]) {
    for (const [a,b,c] of profileLimits) {
      const clipped: THREE.Vector2[] = []
      for (let i = 0; i < points.length; i++) {
        const start = points[i]!, finish = points[(i+1)%points.length]!
        const ds = a*start.x+b*start.y-c, df = a*finish.x+b*finish.y-c
        if (ds <= 0) clipped.push(start)
        if ((ds <= 0) !== (df <= 0)) clipped.push(start.clone().lerp(finish,ds/(ds-df)))
      }
      points = clipped
    }
    return points
  }
  function gusset(x: number, y: number, z: number, upper: boolean, end = false) {
    const direction = upper ? -1 : 1
    const profile = end
      ? [[-.26,-.16],[.26,-.16],[.26,.35],[.15,.51],[-.15,.51],[-.26,.35]]
      : [[-.36,-.13],[.36,-.13],[.36,.08],[.17,.32],[-.17,.32],[-.36,.08]]
    const trimmed = trimToProfile(profile.map(([px,py]) => new THREE.Vector2(x+px!*direction,y+py!*direction)))
    const shape = new THREE.Shape(trimmed.map(point => new THREE.Vector2(point.x-x,point.y-y)))
    shape.closePath()
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: .045, bevelEnabled: false, steps: 1 })
    geometry.translate(0,0,-.0225)
    const outlineGeometry = new THREE.EdgesGeometry(geometry)
    connectionGeometries.push(geometry, outlineGeometry)
    const bolts = end
      ? [[-Math.sign(x)*.06,.035],[-Math.sign(x)*.18,.035],[-Math.sign(x)*.06,.245],[-Math.sign(x)*.18,.245]]
      : [[-.24,-.035],[.24,-.035],[-.16,.10],[.16,.10],[-.075,.235],[.075,.235]]
    const center = trimmed.reduce((sum,point) => sum.add(point),new THREE.Vector2()).divideScalar(trimmed.length)
    const insideWithMargin = (point: THREE.Vector2) => trimmed.every((a,index) => {
      const b = trimmed[(index+1)%trimmed.length]!
      return ((b.x-a.x)*(point.y-a.y)-(b.y-a.y)*(point.x-a.x))/a.distanceTo(b) >= .048
    })
    const fittedBolts = bolts.map(([bx,by]) => {
      const point = new THREE.Vector2(x+bx!*direction,y+by!*direction)
      // Keep the full bolt head clear of every newly trimmed plate edge.
      for (let step = 0; step < 32 && !insideWithMargin(point); step++) point.lerp(center,.12)
      return point
    }).filter(insideWithMargin)
    for (const face of [-1,1]) {
      const plate = new THREE.Mesh(geometry, connectionSteel)
      plate.position.set(x,y,z + face * .1425)
      plate.userData.part = 'truss'
      plate.userData.isConnection = true
      plate.add(new THREE.LineSegments(outlineGeometry,lineMaterial))
      groups.truss.add(plate); meshes.push(plate)
      for (const point of fittedBolts) {
        boltPositions.push(new THREE.Vector3(point.x,point.y,z + face * .183))
      }
    }
  }
  for (const z of [-2,2]) {
    beam(groups.truss,[-8,1,z],[8,1,z],.22, trussSteel)
    for (let i=0; i<nodes.length; i++) {
      const n = nodes[i]!
      beam(groups.truss,[n.x,1,z],[n.x,n.y,z],.15, trussSteel)
      // End posts use one plate spanning the closely spaced chord junctions.
      if (i === 0 || i === 8) gusset(n.x,1,z,false,true)
      else { gusset(n.x,1,z,false); gusset(n.x,n.y,z,true) }
      if (i<8) {
        const next=nodes[i+1]!
        beam(groups.truss,[n.x,n.y,z],[next.x,next.y,z],.23, topChordSteel)
        beam(groups.truss,[n.x,i<4?n.y:1,z],[next.x,i<4?1:next.y,z],.12, trussSteel)
      }
    }
    for (let x=-8; x<=8; x+=.5) beam(groups.deck,[x,1,z*1.12],[x,1.65,z*1.12],.035, railSteel)
    for (const y of [1.32,1.65]) beam(groups.deck,[-8,y,z*1.12],[8,y,z*1.12],.045, railSteel)
  }
  // Restrained hex heads, with four at the trimmed ends; shared instancing.
  const boltGeometry = new THREE.CylinderGeometry(.028,.028,.026,6)
  boltGeometry.rotateX(Math.PI / 2)
  const boltMaterial = new THREE.MeshStandardMaterial({ color: 0x91a1b1, metalness: .65, roughness: .42 })
  const connectionBolts = new THREE.InstancedMesh<THREE.CylinderGeometry, THREE.Material>(boltGeometry,boltMaterial,boltPositions.length)
  const boltMatrix = new THREE.Matrix4()
  boltPositions.forEach((position,index) => connectionBolts.setMatrixAt(index,boltMatrix.makeTranslation(position)))
  connectionBolts.instanceMatrix.needsUpdate = true
  groups.truss.add(connectionBolts)
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
  // Reference legend colors are sRGB: decode once, then use the renderer's
  // output conversion without exposure, material lighting, or tone mapping.
  const feaMaterial = new THREE.ShaderMaterial({
    uniforms: { palette: { value: feaPalette.map(hex => new THREE.Color(hex)) } },
    vertexShader: `
      varying vec3 studyPosition;
      void main() {
        vec4 localPosition = vec4(position, 1.0);
        #ifdef USE_INSTANCING
          localPosition = instanceMatrix * localPosition;
        #endif
        studyPosition = (modelMatrix * localPosition).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * localPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 palette[12];
      varying vec3 studyPosition;
      void main() {
        // Illustrative symmetric contour field, not solved stress values.
        // Continuous spatial sampling keeps adjoining members consistent.
        float response = clamp(abs(studyPosition.x) / 8.0, 0.0, 1.0);
        int band = int(min(floor(response * 12.0), 11.0));
        gl_FragColor = vec4(palette[band], 1.0);
        #include <colorspace_fragment>
      }
    `,
    toneMapped: false,
    polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1,
  })
  const feaEdgeMaterial = new THREE.LineBasicMaterial({
    color: 0x15232c, transparent: true, opacity: .42, toneMapped: false,
  })
  const feaMeshMaterial = new THREE.LineBasicMaterial({
    color: 0x15232c, transparent: true, opacity: .16, toneMapped: false,
  })
  const feaGrids = new Map<THREE.Mesh, THREE.LineSegments>()
  // Rectangular surface cells sized in model units avoid dense diagonal clutter.
  function surfaceGrid(mesh: THREE.Mesh) {
    const divisions = [mesh.scale.x, mesh.scale.y, mesh.scale.z]
      .map(size => Math.max(1, Math.ceil(size / .65)))
    const points: number[] = []
    for (let axis = 0; axis < 3; axis++) {
      const u = (axis + 1) % 3, v = (axis + 2) % 3
      for (const side of [-.5, .5]) {
        for (const [along, across] of [[u,v], [v,u]]) {
          for (let i = 1; i < divisions[along!]!; i++) {
            const start = [0,0,0], end = [0,0,0]
            start[axis] = end[axis] = side
            start[along!] = end[along!] = i / divisions[along!]! - .5
            start[across!] = -.5; end[across!] = .5
            points.push(...start, ...end)
          }
        }
      }
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return new THREE.LineSegments(geometry, feaMeshMaterial)
  }
  function showFEA(enabled: boolean) {
    grid.visible = !isElevation
    connectionBolts.material = enabled ? feaMaterial : boltMaterial
    for (const mesh of meshes) {
      const outline = mesh.children[0] as THREE.LineSegments
      if (!mesh.userData.architecturalMaterial) {
        mesh.userData.architecturalMaterial = mesh.material
        mesh.userData.architecturalOutline = outline.material
      }
      mesh.material = enabled ? feaMaterial : mesh.userData.architecturalMaterial
      outline.material = enabled ? feaEdgeMaterial : mesh.userData.architecturalOutline
      if (enabled && !mesh.userData.isConnection && !feaGrids.has(mesh)) {
        const cells = surfaceGrid(mesh)
        mesh.add(cells); feaGrids.set(mesh, cells)
      }
      const cells = feaGrids.get(mesh)
      if (cells) cells.visible = enabled
    }
    canvas.setAttribute('aria-label', enabled
      ? 'Illustrative FEA contour view of the original bridge. Blue at midspan through cyan, green, yellow and red at the supports. Not computed analysis results.'
      : 'Interactive 3D steel bridge. Drag or use arrow keys to orbit, plus and minus to zoom, Home to reset.')
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
    elevation(enabled) { isElevation=enabled; camera=enabled?orthographic:perspective; grid.visible=!enabled; render() },
    fea: showFEA,
    reset() { yaw=-.9; pitch=.43; distance=28; orthographic.zoom=1; orthographic.updateProjectionMatrix(); isElevation=false; camera=perspective; grid.visible=true; render() },
    dispose() {
      if(!alive) return
      alive=false; resizeObserver.disconnect(); intersection.disconnect()
      canvas.removeEventListener('pointerdown',down); canvas.removeEventListener('pointermove',move); canvas.removeEventListener('pointerup',up); canvas.removeEventListener('pointercancel',cancel)
      canvas.removeEventListener('keydown',keydown); canvas.removeEventListener('webglcontextlost',lost)
      feaGrids.forEach(cells => cells.geometry.dispose())
      feaMaterial.dispose(); feaEdgeMaterial.dispose(); feaMeshMaterial.dispose()
      connectionGeometries.forEach(geometry => geometry.dispose())
      connectionBolts.dispose(); boltGeometry.dispose(); boltMaterial.dispose()
      unit.dispose(); edges.dispose(); concreteTex.dispose(); topChordSteel.dispose(); connectionSteel.dispose()
      trussSteel.dispose(); deckSteel.dispose(); bracingSteel.dispose(); railSteel.dispose(); road.dispose(); concrete.dispose(); lineMaterial.dispose()
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
