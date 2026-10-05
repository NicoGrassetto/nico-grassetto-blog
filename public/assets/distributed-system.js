(() => {
  const stage = document.querySelector('.systems-stage');
  if (!stage || !window.THREE) return;

  const THREE = window.THREE;
  const canvas = stage.querySelector('canvas');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let renderer;

  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power', preserveDrawingBuffer: true });
  } catch {
    stage.dataset.state = 'fallback';
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-3.9, 3.9, 3.9, -3.9, 0.1, 24);
  camera.position.z = 10;
  const network = new THREE.Group();
  scene.add(network);

  const random = THREE.MathUtils.seededRandom;
  random(481);
  const neurons = [
    new THREE.Vector3(-0.32, 0.12, 0.18),
    new THREE.Vector3(-1.98, 1.13, -0.22),
    new THREE.Vector3(1.65, 1.42, 0.12),
    new THREE.Vector3(1.94, -0.73, -0.14),
    new THREE.Vector3(0.43, -1.96, 0.22),
    new THREE.Vector3(-1.85, -1.46, -0.08),
    new THREE.Vector3(-0.23, 2.13, -0.16)
  ];
  const connections = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 6], [6, 2], [3, 4], [4, 5]];
  const axons = [];
  const positions = [];
  const strengths = [];
  const phases = [];
  const distances = [];

  function addFiber(curve, width, phase, distance = 0) {
    const length = curve.getLength();
    const samples = Math.max(6, Math.ceil(length / 0.026));
    for (let sample = 0; sample <= samples; sample++) {
      const progress = sample / samples;
      const point = curve.getPoint(progress);
      const tangent = curve.getTangent(progress);
      const normal = new THREE.Vector3(-tangent.y, tangent.x, 0).normalize();
      for (let strand = 0; strand < 3; strand++) {
        const spread = (random() - 0.5) * width * (1 - progress * 0.55);
        positions.push(point.x + normal.x * spread, point.y + normal.y * spread, point.z + (random() - 0.5) * width);
        strengths.push(strand === 2 ? 0.78 + random() * 0.22 : 0.22 + random() * 0.4);
        phases.push(phase + random() * 0.3);
        distances.push(distance + progress * length);
      }
      if (random() < 0.24) {
        const spread = (random() - 0.5) * width * 7;
        positions.push(point.x + normal.x * spread, point.y + normal.y * spread, point.z);
        strengths.push(0.15 + random() * 0.25);
        phases.push(phase + random());
        distances.push(distance + progress * length);
      }
    }
  }

  for (const [index, center] of neurons.entries()) {
    const phase = index * 1.37;
    const radius = index === 0 ? 0.19 : 0.12 + random() * 0.035;
    for (let sample = 0; sample < 170; sample++) {
      const angle = random() * Math.PI * 2;
      const reach = Math.pow(random(), 0.7) * radius;
      positions.push(center.x + Math.cos(angle) * reach, center.y + Math.sin(angle) * reach * 0.8, center.z + (random() - 0.5) * radius);
      strengths.push(0.6 + random() * 0.4);
      phases.push(phase + random() * 0.18);
      distances.push(reach);
    }

    const branches = [];
    for (let branch = 0; branch < 7; branch++) {
      branches.push({
        start: center.clone(),
        angle: branch / 7 * Math.PI * 2 + index * 0.49 + random() * 0.35,
        length: (0.4 + random() * 0.4) * (index === 0 ? 1.2 : 0.92),
        width: 0.08,
        depth: 0,
        distance: 0
      });
    }
    while (branches.length) {
      const branch = branches.pop();
      const direction = new THREE.Vector3(Math.cos(branch.angle), Math.sin(branch.angle), (random() - 0.5) * 0.3);
      const normal = new THREE.Vector3(-direction.y, direction.x, 0);
      const end = branch.start.clone().addScaledVector(direction, branch.length);
      const bend = (random() - 0.5) * branch.length * 0.7;
      const curve = new THREE.CubicBezierCurve3(
        branch.start,
        branch.start.clone().addScaledVector(direction, branch.length * 0.32).addScaledVector(normal, bend),
        end.clone().addScaledVector(direction, -branch.length * 0.26),
        end
      );
      addFiber(curve, branch.width, phase, branch.distance);
      if (branch.depth < 2) {
        for (const side of [-1, 1]) {
          branches.push({
            start: end.clone(),
            angle: branch.angle + side * (0.3 + random() * 0.48),
            length: branch.length * (0.46 + random() * 0.12),
            width: branch.width * 0.54,
            depth: branch.depth + 1,
            distance: branch.distance + curve.getLength()
          });
        }
      }
    }
  }

  for (const [index, [first, second]] of connections.entries()) {
    const start = neurons[first];
    const end = neurons[second];
    const direction = end.clone().sub(start);
    const normal = new THREE.Vector3(-direction.y, direction.x, 0).normalize();
    const bend = (index % 2 ? 1 : -1) * (0.2 + random() * 0.32);
    const curve = new THREE.CubicBezierCurve3(
      start,
      start.clone().lerp(end, 0.32).addScaledVector(normal, bend),
      start.clone().lerp(end, 0.72).addScaledVector(normal, -bend * 0.4),
      end
    );
    axons.push(curve);
    addFiber(curve, 0.085, index * 0.91);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('strength', new THREE.Float32BufferAttribute(strengths, 1));
  geometry.setAttribute('phase', new THREE.Float32BufferAttribute(phases, 1));
  geometry.setAttribute('distance', new THREE.Float32BufferAttribute(distances, 1));
  geometry.computeBoundingSphere();
  const material = new THREE.ShaderMaterial({
    uniforms: {
      elapsed: { value: 0 },
      motionSpeed: { value: 0.9 },
      pointer: { value: new THREE.Vector2() },
      hoverPoint: { value: new THREE.Vector2() },
      hoverAmount: { value: 0 },
      hoverRadius: { value: 100 },
      viewport: { value: new THREE.Vector2(600, 600) },
      pixelPitch: { value: 3 },
      pixelRatio: { value: renderer.getPixelRatio() },
      density: { value: 1 }
    },
    vertexShader: `
      attribute float strength;
      attribute float phase;
      attribute float distance;
      uniform float elapsed;
      uniform float motionSpeed;
      uniform vec2 hoverPoint;
      uniform float hoverAmount;
      uniform float hoverRadius;
      uniform vec2 viewport;
      uniform float pixelPitch;
      uniform float pixelRatio;
      uniform float density;
      varying vec3 ink;
      varying float opacity;

      void main() {
        float time = elapsed * motionSpeed;
        float impulse = pow(max(0.0, sin(time * 1.8 - distance * 3.4 + phase)), 8.0);
        float shimmer = 0.88 + 0.12 * sin(time * 0.6 + phase * 3.0);
        float highlight = smoothstep(0.55, 1.0, strength) * (0.18 + impulse * 0.82);
        ink = mix(vec3(1.0, 0.42, 0.0), vec3(0.80), highlight);
        opacity = strength * (0.48 + impulse * 0.52) * shimmer;
        opacity *= max(step(fract(phase * 17.17), density), step(0.85, strength));

        vec3 deformed = position;
        deformed.x += sin(position.y * 1.25 + time * 0.55) * 0.045;
        deformed.y += sin(position.x * 1.1 - time * 0.48) * 0.035;
        vec4 projected = projectionMatrix * modelViewMatrix * vec4(deformed, 1.0);
        vec2 screen = (projected.xy / projected.w * 0.5 + 0.5) * viewport;
        vec2 offset = screen - hoverPoint;
        float reach = length(offset);
        float influence = (1.0 - smoothstep(0.0, hoverRadius, reach)) * hoverAmount;
        float ripple = sin(reach * 0.075 - time * 4.0);
        screen += offset / max(reach, 1.0) * ripple * influence * 7.0;
        ink = mix(ink, vec3(0.80), influence * (0.65 + ripple * 0.15));
        opacity = min(1.0, opacity + influence * strength * 0.55);
        screen = (floor(screen / pixelPitch) + 0.5) * pixelPitch;
        projected.xy = (screen / viewport * 2.0 - 1.0) * projected.w;
        gl_Position = projected;
        gl_PointSize = pixelPitch * pixelRatio * 0.76;
      }
    `,
    fragmentShader: `
      varying vec3 ink;
      varying float opacity;

      void main() {
        if (opacity < 0.04) discard;
        gl_FragColor = vec4(ink, opacity);
      }
    `,
    transparent: true,
    depthTest: false,
    depthWrite: false
  });
  network.add(new THREE.Points(geometry, material));

  const tracking = stage.querySelector('.neural-tracking');
  tracking.innerHTML = `
    <path class="neural-link"/><path class="neural-link"/><path class="neural-link"/>
    ${[0, 1, 2].map(index => `
      <g class="neural-target" data-target="${index}">
        <rect class="neural-target-frame"/>
        <path class="neural-target-cross"/>
        <path class="neural-target-corners"/>
        <text class="neural-coordinate"/><text class="neural-coordinate"/><text class="neural-coordinate"/>
      </g>
    `).join('')}
  `;
  const trackingLinks = [...tracking.querySelectorAll('.neural-link')];
  const trackingAnchors = [...neurons, ...axons.map((curve, index) => curve.getPoint(0.35 + index % 4 * 0.1))];
  const trackers = [...tracking.querySelectorAll('.neural-target')].map(group => ({
    group,
    frame: group.querySelector('.neural-target-frame'),
    corners: group.querySelector('.neural-target-corners'),
    cross: group.querySelector('.neural-target-cross'),
    coordinates: [...group.querySelectorAll('.neural-coordinate')],
    position: new THREE.Vector2(),
    opacity: 0,
    textTick: -1
  }));

  let visible = true;
  let contextLost = false;
  let previousTime = 0;
  let hovering = false;
  const targetPointer = new THREE.Vector2();
  const targetHover = new THREE.Vector2();

  function renderFrame(timestamp) {
    if (contextLost) return;
    if (previousTime && timestamp - previousTime < 1000 / 30) return;
    const delta = previousTime ? Math.min((timestamp - previousTime) / 1000, 0.1) : 0;
    previousTime = timestamp;
    if (!motionPreference.matches && visible && !document.hidden) {
      material.uniforms.elapsed.value += delta;
      material.uniforms.pointer.value.lerp(targetPointer, 0.08);
      const response = 1 - Math.exp(-delta * 10);
      material.uniforms.hoverPoint.value.lerp(targetHover, response);
      material.uniforms.hoverAmount.value = THREE.MathUtils.lerp(material.uniforms.hoverAmount.value, hovering ? 1 : 0, response);
    }
    const time = material.uniforms.elapsed.value * material.uniforms.motionSpeed.value;
    network.rotation.y = Math.sin(time * 0.32) * 0.16 + material.uniforms.pointer.value.x * 0.08;
    network.rotation.z = Math.sin(time * 0.22) * 0.025;
    network.position.y = Math.sin(time * 0.38) * 0.045 + material.uniforms.pointer.value.y * 0.08;
    network.updateMatrixWorld(true);

    const { x: width, y: height } = material.uniforms.viewport.value;
    const pitch = material.uniforms.pixelPitch.value;
    const targetLimit = height < 230 ? 1 : width < 500 ? 2 : 3;
    const placed = [];
    for (const [index, tracker] of trackers.entries()) {
      const period = 2.4 + index * 0.21;
      const timeline = time + index * 0.82 + 0.32;
      const cycle = Math.floor(timeline / period);
      const age = timeline % period;
      const appear = THREE.MathUtils.smoothstep(age, 0.02, 0.1);
      tracker.opacity = index < targetLimit ? appear * (1 - THREE.MathUtils.smoothstep(age, 1.03, 1.28)) * 0.86 : 0;
      if (tracker.opacity < 0.02) {
        tracker.group.style.opacity = '0';
        continue;
      }

      const anchorIndex = (cycle * 5 + index * 5) % trackingAnchors.length;
      const anchor = trackingAnchors[anchorIndex];
      const world = anchor.clone();
      world.x += Math.sin(anchor.y * 1.25 + time * 0.55) * 0.045;
      world.y += Math.sin(anchor.x * 1.1 - time * 0.48) * 0.035;
      world.applyMatrix4(network.matrixWorld);
      const projected = world.clone().project(camera);
      const offsetX = (projected.x * 0.5 + 0.5) * width - material.uniforms.hoverPoint.value.x;
      const offsetY = (projected.y * 0.5 + 0.5) * height - material.uniforms.hoverPoint.value.y;
      const reach = Math.hypot(offsetX, offsetY);
      const influence = (1 - THREE.MathUtils.smoothstep(reach, 0, material.uniforms.hoverRadius.value)) * material.uniforms.hoverAmount.value;
      const ripple = Math.sin(reach * 0.075 - time * 4) * influence * 7 / Math.max(reach, 1);
      projected.x += offsetX * ripple * 2 / width;
      projected.y += offsetY * ripple * 2 / height;
      world.copy(projected).unproject(camera);
      const screenX = (Math.floor((projected.x * 0.5 + 0.5) * width / pitch) + 0.5) * pitch;
      const screenY = height - (Math.floor((projected.y * 0.5 + 0.5) * height / pitch) + 0.5) * pitch;
      const size = (anchorIndex < neurons.length ? 38 : 28) + index * 3;
      const halfWidth = size * (1 + (1 - appear) * 0.18) / 2;
      const halfHeight = halfWidth * 0.78;
      let labelSide = screenX + halfWidth + 64 > width - 8 ? -1 : 1;
      let bounds;
      let fits = false;
      for (let attempt = 0; attempt < 2; attempt++) {
        bounds = {
          left: screenX - halfWidth - (labelSide < 0 ? 64 : 4),
          right: screenX + halfWidth + (labelSide > 0 ? 64 : 4),
          top: screenY - halfHeight - 5,
          bottom: screenY + Math.max(halfHeight, 26 - halfHeight) + 4
        };
        fits = bounds.left >= 6 && bounds.right <= width - 6 && bounds.top >= 6 && bounds.bottom <= height - 6;
        fits &&= !placed.some(other => bounds.left < other.right + 8 && bounds.right > other.left - 8 && bounds.top < other.bottom + 8 && bounds.bottom > other.top - 8);
        if (fits) break;
        labelSide *= -1;
      }
      if (!fits) {
        tracker.opacity = 0;
        tracker.group.style.opacity = '0';
        continue;
      }
      placed.push(bounds);
      tracker.position.set(screenX, screenY);
      tracker.group.style.opacity = tracker.opacity.toFixed(3);
      tracker.group.setAttribute('transform', `translate(${screenX.toFixed(2)} ${screenY.toFixed(2)})`);
      tracker.frame.setAttribute('x', -halfWidth);
      tracker.frame.setAttribute('y', -halfHeight);
      tracker.frame.setAttribute('width', halfWidth * 2);
      tracker.frame.setAttribute('height', halfHeight * 2);
      tracker.cross.setAttribute('d', `M${-halfWidth} ${-halfHeight}L${halfWidth} ${halfHeight}M${-halfWidth} ${halfHeight}L${halfWidth} ${-halfHeight}M-3 0H3M0 -3V3`);
      tracker.corners.setAttribute('d', `M${-halfWidth - 3} ${-halfHeight + 6}V${-halfHeight - 3}H${-halfWidth + 6}M${halfWidth - 6} ${-halfHeight - 3}H${halfWidth + 3}V${-halfHeight + 6}M${halfWidth + 3} ${halfHeight - 6}V${halfHeight + 3}H${halfWidth - 6}M${-halfWidth + 6} ${halfHeight + 3}H${-halfWidth - 3}V${halfHeight - 6}`);
      const textTick = Math.floor(material.uniforms.elapsed.value * 6);
      for (const [axis, label] of tracker.coordinates.entries()) {
        label.setAttribute('x', labelSide * (halfWidth + 7));
        label.setAttribute('y', -halfHeight + 4 + axis * 10);
        label.setAttribute('text-anchor', labelSide > 0 ? 'start' : 'end');
        if (tracker.textTick !== textTick) {
          const value = world.getComponent(axis);
          label.textContent = `${'XYZ'[axis]} ${value >= 0 ? '+' : ''}${value.toFixed(3)}`;
        }
      }
      tracker.textTick = textTick;
    }
    for (const [index, link] of trackingLinks.entries()) {
      const first = trackers[index === 2 ? 1 : 0];
      const second = trackers[index === 0 ? 1 : 2];
      link.style.opacity = (Math.min(first.opacity, second.opacity) * 0.38).toFixed(3);
      link.setAttribute('d', `M${first.position.x} ${first.position.y}L${second.position.x} ${second.position.y}`);
    }
    renderer.render(scene, camera);
  }

  function updateAnimation() {
    previousTime = 0;
    const running = !motionPreference.matches && visible && !document.hidden && !contextLost;
    if (!running) {
      hovering = false;
      material.uniforms.hoverAmount.value = 0;
      targetPointer.set(0, 0);
    }
    renderer.setAnimationLoop(running ? renderFrame : null);
    stage.dataset.animating = String(running);
    renderFrame(performance.now());
  }

  function resize() {
    const width = Math.max(1, Math.round(stage.clientWidth));
    const height = Math.max(1, Math.round(stage.clientHeight));
    const aspect = width / height;
    renderer.setSize(width, height, false);
    camera.left = -3.9 * Math.max(1, aspect);
    camera.right = -camera.left;
    camera.top = 3.9 * Math.max(1, 1 / aspect);
    camera.bottom = -camera.top;
    camera.updateProjectionMatrix();
    material.uniforms.viewport.value.set(width, height);
    material.uniforms.hoverRadius.value = Math.min(100, Math.min(width, height) * 0.26);
    material.uniforms.hoverAmount.value = 0;
    hovering = false;
    material.uniforms.pixelPitch.value = window.innerWidth <= 700 ? 2.3 : 3;
    material.uniforms.density.value = window.innerWidth <= 700 ? 0.78 : 1;
    tracking.setAttribute('viewBox', `0 0 ${width} ${height}`);
    previousTime = 0;
    renderFrame(performance.now());
    stage.dataset.state = contextLost ? 'fallback' : 'ready';
  }

  new ResizeObserver(resize).observe(stage);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updateAnimation();
  }).observe(stage);
  stage.addEventListener('pointermove', event => {
    if (motionPreference.matches || contextLost || event.pointerType === 'touch') return;
    const bounds = stage.getBoundingClientRect();
    targetPointer.set((event.clientX - bounds.left) / bounds.width - 0.5, 0.5 - (event.clientY - bounds.top) / bounds.height);
    const viewport = material.uniforms.viewport.value;
    targetHover.set((targetPointer.x + 0.5) * viewport.x, (targetPointer.y + 0.5) * viewport.y);
    if (!hovering) material.uniforms.hoverPoint.value.copy(targetHover);
    hovering = true;
  });
  for (const eventName of ['pointerleave', 'pointercancel']) {
    stage.addEventListener(eventName, () => {
      hovering = false;
      targetPointer.set(0, 0);
    });
  }
  document.addEventListener('visibilitychange', updateAnimation);
  motionPreference.addEventListener('change', updateAnimation);
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    contextLost = true;
    stage.dataset.state = 'fallback';
    updateAnimation();
  });
  canvas.addEventListener('webglcontextrestored', () => {
    contextLost = false;
    resize();
    updateAnimation();
  });

  resize();
  updateAnimation();
})();