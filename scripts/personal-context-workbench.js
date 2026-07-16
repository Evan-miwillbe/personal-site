import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

const shell = document.querySelector('[data-context-workbench]');

if (shell) {
  const gate = shell.closest('[data-workbench-gate]');
  const viewport = shell.querySelector('[data-workbench-viewport]');
  const canvas = shell.querySelector('canvas');
  const status = shell.querySelector('[data-workbench-status]');
  const sceneWipe = shell.querySelector('[data-scene-wipe]');
  const sceneTitle = shell.querySelector('[data-scene-title]');
  const sceneTitleNumber = shell.querySelector('[data-scene-title-number]');
  const sceneTitleName = shell.querySelector('[data-scene-title-name]');
  const infoEyebrow = shell.querySelector('[data-workbench-info-eyebrow]');
  const infoTitle = shell.querySelector('[data-workbench-info-title]');
  const infoCopy = shell.querySelector('[data-workbench-info-copy]');
  const stepButtons = [...shell.querySelectorAll('[data-workbench-step]')];
  const enterButton = shell.querySelector('[data-enter-project]');
  const enterLabel = shell.querySelector('[data-enter-label]');
  const reopenButton = document.querySelector('[data-reopen-workbench]');
  const projectStart = document.querySelector('[data-project-start]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('workbench-gate-open');

  const backgroundElements = [...document.body.children].filter((element) => element !== gate && element.tagName !== 'SCRIPT');
  function setBackgroundInert(locked) {
    backgroundElements.forEach((element) => {
      if (locked) {
        element.dataset.workbenchPreviousAriaHidden = element.getAttribute('aria-hidden') || '';
        element.inert = true;
        element.setAttribute('aria-hidden', 'true');
        return;
      }
      element.inert = false;
      const previous = element.dataset.workbenchPreviousAriaHidden;
      if (previous) element.setAttribute('aria-hidden', previous);
      else element.removeAttribute('aria-hidden');
      delete element.dataset.workbenchPreviousAriaHidden;
    });
  }
  setBackgroundInert(true);

  const copy = [
    ['个人输入', '经历、项目、复盘、录音和 AI 协作记录，先保留它们原本的语境。'],
    ['沉淀为证据', '把散落材料放回时间线和项目中，区分事实、判断与后来补充。'],
    ['形成 Context', '把可复用的背景组织起来，让 AI 不必每次从空白 prompt 猜起。'],
    ['AI 预处理', 'AI 负责召回、归类、去噪和提示遗漏，不替人决定什么重要。'],
    ['人来判断', '公开边界、取舍、修改和下一步行动，最后仍由我负责。']
  ];
  const sceneNames = ['收集区', '证据柜', 'Context 核心', 'AI 处理台', '判断闸门'];

  const setStatus = (message) => {
    if (status) status.textContent = message;
  };

  const showFallback = (message) => {
    shell.classList.add('is-fallback');
    setStatus(message || '当前浏览器无法加载 3D，仍可直接进入项目介绍。');
  };

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: window.devicePixelRatio < 2,
      powerPreference: 'high-performance'
    });
  } catch (error) {
    showFallback();
  }

  if (renderer) {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = !reducedMotion;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x171411, 0.033);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
    // The opening is a separate establishing shot, not Scene 01. It looks down
    // across the complete workstation before the first wheel step moves into
    // the personal-input station.
    const overviewFocus = new THREE.Vector3(0, 0.72, 0);
    const cameraTarget = overviewFocus.clone();
    const desiredCameraTarget = cameraTarget.clone();
    let yaw = -0.72;
    let pitch = 2.05;
    let targetYaw = yaw;
    let targetPitch = pitch;
    let shotRadius = 8.8;
    let targetShotRadius = shotRadius;
    let selectedIndex = 0;
    let isOverview = true;
    let overviewMode = 'angled';
    let isVisible = true;
    let pointerDown = false;
    let dragDistance = 0;
    let previousX = 0;
    let previousY = 0;
    let dragStartX = 0;
    let dragStartY = 0;
    let entryReady = false;
    let wheelAccumulator = 0;
    let wheelLockedUntil = 0;
    let wheelGestureActive = false;
    let wheelGestureResetTimer = 0;

    const colors = {
      cream: 0xf3ecdc,
      paper: 0xd8cfba,
      paperDark: 0x978f7e,
      sage: 0x869b7e,
      sageDark: 0x4d6150,
      burgundy: 0x7f2020,
      wine: 0x3c1717,
      gold: 0xc9a35a,
      dark: 0x211d19,
      black: 0x100e0c
    };

    const materials = {
      platform: new THREE.MeshStandardMaterial({ color: colors.dark, roughness: 0.82, metalness: 0.12 }),
      edge: new THREE.MeshStandardMaterial({ color: colors.burgundy, roughness: 0.55, metalness: 0.28 }),
      paper: new THREE.MeshStandardMaterial({ color: colors.paper, roughness: 0.9 }),
      paperDark: new THREE.MeshStandardMaterial({ color: colors.paperDark, roughness: 0.85 }),
      sage: new THREE.MeshStandardMaterial({ color: colors.sage, roughness: 0.7 }),
      sageDark: new THREE.MeshStandardMaterial({ color: colors.sageDark, roughness: 0.65 }),
      burgundy: new THREE.MeshStandardMaterial({ color: colors.burgundy, roughness: 0.52, metalness: 0.2 }),
      gold: new THREE.MeshStandardMaterial({ color: colors.gold, roughness: 0.42, metalness: 0.55 }),
      black: new THREE.MeshStandardMaterial({ color: colors.black, roughness: 0.42, metalness: 0.35 }),
      screen: new THREE.MeshStandardMaterial({ color: 0x1b2721, emissive: 0x355942, emissiveIntensity: 0.85, roughness: 0.35 }),
      context: new THREE.MeshPhysicalMaterial({ color: 0xb8c7ad, emissive: 0x5b8a63, emissiveIntensity: 0.75, transmission: 0.42, thickness: 1.1, transparent: true, opacity: 0.92, roughness: 0.18 }),
      line: new THREE.LineBasicMaterial({ color: colors.gold, transparent: true, opacity: 0.34 }),
      hotspot: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
    };

    const workstation = new THREE.Group();
    scene.add(workstation);

    function mesh(geometry, material, position, rotation, parent = workstation) {
      const object = new THREE.Mesh(geometry, material);
      object.position.set(...position);
      if (rotation) object.rotation.set(...rotation);
      object.castShadow = !reducedMotion;
      object.receiveShadow = !reducedMotion;
      parent.add(object);
      return object;
    }

    // An original, compact desk assembled only from primitive geometry.
    mesh(new THREE.CylinderGeometry(4.75, 4.95, 0.34, 8), materials.platform, [0, -0.22, 0]);
    mesh(new THREE.TorusGeometry(4.84, 0.045, 8, 80), materials.edge, [0, -0.05, 0], [Math.PI / 2, 0, 0]);
    mesh(new THREE.BoxGeometry(7.6, 0.24, 4.35), materials.paperDark, [0, 0.1, 0]);
    mesh(new THREE.BoxGeometry(7.34, 0.12, 4.08), materials.platform, [0, 0.28, 0]);

    // Monitor and terminal: the visible day-to-day entry point.
    const monitor = new THREE.Group();
    monitor.position.set(0.2, 0.38, -1.2);
    workstation.add(monitor);
    mesh(new THREE.BoxGeometry(3.35, 1.9, 0.16), materials.black, [0, 1.55, 0], [0, 0, 0], monitor);
    const monitorMaterial = materials.screen.clone();
    const monitorScreen = mesh(new THREE.PlaneGeometry(3.05, 1.6), monitorMaterial, [0, 1.55, 0.086], [0, 0, 0], monitor);
    mesh(new THREE.BoxGeometry(0.16, 0.95, 0.18), materials.gold, [0, 0.54, 0], [0, 0, 0], monitor);
    mesh(new THREE.BoxGeometry(1.25, 0.09, 0.7), materials.black, [0, 0.05, 0.2], [0, 0, 0], monitor);
    for (let row = 0; row < 6; row += 1) {
      const width = [1.5, 2.1, 1.15, 2.45, 1.8, 0.95][row];
      mesh(new THREE.PlaneGeometry(width, 0.055), row === 3 ? materials.gold : materials.sage, [-0.48 + width / 5, 1.98 - row * 0.2, 0.092], [0, 0, 0], monitor);
    }

    // Keyboard, notebook and a physical judgment lever.
    mesh(new THREE.BoxGeometry(2.35, 0.12, 0.9), materials.black, [0.35, 0.48, 0.72], [-0.12, 0, 0]);
    for (let i = 0; i < 7; i += 1) {
      mesh(new THREE.BoxGeometry(0.18, 0.035, 0.52), materials.paperDark, [-0.5 + i * 0.28, 0.57, 0.72], [-0.12, 0, 0]);
    }
    mesh(new THREE.BoxGeometry(1.45, 0.12, 1.7), materials.paper, [-2.65, 0.47, 0.85], [0, -0.08, 0]);
    mesh(new THREE.BoxGeometry(0.06, 0.03, 1.42), materials.burgundy, [-2.65, 0.55, 0.85], [0, -0.08, 0]);

    const nodes = [];
    const hotspotMeshes = [];

    function addHotspot(index, position, radius = 0.7) {
      const hit = mesh(new THREE.SphereGeometry(radius, 12, 12), materials.hotspot, position);
      hit.userData.stepIndex = index;
      hotspotMeshes.push(hit);
      return hit;
    }

    // 01 input: a deliberately uneven stack of raw material.
    const inputNode = new THREE.Group();
    inputNode.position.set(-3.05, 0.35, -0.55);
    workstation.add(inputNode);
    const inputSheets = [];
    for (let i = 0; i < 5; i += 1) {
      const sheet = mesh(new THREE.BoxGeometry(0.9 + i * 0.07, 0.1, 0.68), i === 2 ? materials.sage : materials.paper, [0, 0.12 + i * 0.11, 0], [0, (i - 2) * 0.08, 0], inputNode);
      sheet.userData.baseRotationY = (i - 2) * 0.08;
      inputSheets.push(sheet);
    }
    mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.62, 16), materials.burgundy, [0.62, 0.3, 0.08], [0, 0, -0.32], inputNode);
    nodes.push(inputNode);
    addHotspot(0, [-3.05, 0.85, -0.55], 0.78);

    // 02 evidence: indexed drawers and a small timeline spine.
    const evidenceNode = new THREE.Group();
    evidenceNode.position.set(-1.65, 0.35, -1.45);
    workstation.add(evidenceNode);
    const evidenceDrawers = [];
    for (let i = 0; i < 3; i += 1) {
      const drawer = new THREE.Group();
      drawer.position.y = 0.22 + i * 0.37;
      evidenceNode.add(drawer);
      mesh(new THREE.BoxGeometry(0.88, 0.36, 0.74), materials.sageDark, [0, 0, 0], [0, 0, 0], drawer);
      mesh(new THREE.BoxGeometry(0.32, 0.05, 0.06), materials.gold, [0, 0.01, 0.4], [0, 0, 0], drawer);
      evidenceDrawers.push(drawer);
    }
    nodes.push(evidenceNode);
    addHotspot(1, [-1.65, 1.1, -1.45], 0.72);

    // 03 context: a translucent core surrounded by maintained rings.
    const contextNode = new THREE.Group();
    contextNode.position.set(0.15, 1.05, -0.15);
    workstation.add(contextNode);
    const contextCore = mesh(new THREE.IcosahedronGeometry(0.54, 2), materials.context, [0, 0, 0], [0, 0, 0], contextNode);
    const rings = [];
    [0.76, 0.9, 1.04].forEach((radius, index) => {
      const ring = mesh(new THREE.TorusGeometry(radius, 0.025, 8, 52), index === 1 ? materials.burgundy : materials.gold, [0, 0, 0], [Math.PI / 2 + index * 0.45, index * 0.55, 0], contextNode);
      rings.push(ring);
    });
    nodes.push(contextNode);
    addHotspot(2, [0.15, 1.05, -0.15], 1.05);

    // 04 AI preprocessing: small tools around a rotating spindle.
    const aiNode = new THREE.Group();
    aiNode.position.set(2.25, 0.4, -0.7);
    workstation.add(aiNode);
    mesh(new THREE.CylinderGeometry(0.62, 0.78, 0.22, 12), materials.black, [0, 0.12, 0], [0, 0, 0], aiNode);
    const spindle = mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.05, 12), materials.gold, [0, 0.7, 0], [0, 0, 0], aiNode);
    const toolRing = new THREE.Group();
    toolRing.position.y = 0.8;
    aiNode.add(toolRing);
    const aiTools = [];
    for (let i = 0; i < 4; i += 1) {
      const angle = i * Math.PI / 2;
      const tool = mesh(new THREE.BoxGeometry(0.28, 0.28, 0.28), i === 2 ? materials.burgundy : materials.sage, [Math.cos(angle) * 0.66, 0, Math.sin(angle) * 0.66], [0, angle, 0], toolRing);
      tool.userData.phase = i * Math.PI / 2;
      aiTools.push(tool);
    }
    nodes.push(aiNode);
    addHotspot(3, [2.25, 1.08, -0.7], 0.85);

    // 05 human judgment: a warm red checkpoint, physically separate from automation.
    const humanNode = new THREE.Group();
    humanNode.position.set(3.05, 0.38, 1.25);
    workstation.add(humanNode);
    mesh(new THREE.CylinderGeometry(0.62, 0.72, 0.2, 20), materials.black, [0, 0.1, 0], [0, 0, 0], humanNode);
    const judgmentLever = mesh(new THREE.CylinderGeometry(0.09, 0.12, 0.88, 12), materials.gold, [0, 0.57, 0], [0, 0, -0.48], humanNode);
    const checkpointMaterial = materials.burgundy.clone();
    checkpointMaterial.emissive = new THREE.Color(colors.wine);
    const checkpoint = mesh(new THREE.SphereGeometry(0.28, 20, 20), checkpointMaterial, [-0.21, 0.96, 0], [0, 0, 0], humanNode);
    nodes.push(humanNode);
    addHotspot(4, [3.05, 1.16, 1.25], 0.82);
    nodes.forEach((node) => {
      node.userData.baseY = node.position.y;
    });

    // A five-step path, with particles travelling through it instead of a decorative star field.
    const pathPoints = [
      new THREE.Vector3(-3.05, 1.05, -0.55),
      new THREE.Vector3(-1.65, 1.42, -1.45),
      new THREE.Vector3(0.15, 1.15, -0.15),
      new THREE.Vector3(2.25, 1.25, -0.7),
      new THREE.Vector3(3.05, 1.36, 1.25)
    ];
    const pathCurve = new THREE.CatmullRomCurve3(pathPoints, false, 'catmullrom', 0.42);
    const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathCurve.getPoints(110));
    const pathLine = new THREE.Line(pathGeometry, materials.line);
    workstation.add(pathLine);
    const sceneFocus = [
      new THREE.Vector3(-2.8, 0.78, 0.1),
      new THREE.Vector3(-1.65, 1.0, -1.42),
      new THREE.Vector3(0.15, 1.08, -0.15),
      new THREE.Vector3(2.25, 0.96, -0.68),
      new THREE.Vector3(3.0, 0.96, 1.2)
    ];
    const sceneYaw = [-0.72, 0.3, -0.08, -0.48, 0.68];
    const scenePitch = [0.13, 0.18, 0.28, 0.12, 0.08];
    const sceneRadius = [5.67, 4.6, 4.87, 5.13, 4.87];

    const travellingParticles = [];
    for (let i = 0; i < 12; i += 1) {
      const particleMaterial = new THREE.MeshBasicMaterial({ color: i % 4 === 0 ? colors.burgundy : colors.gold, transparent: true, opacity: 0.88 });
      const particle = mesh(new THREE.SphereGeometry(i % 4 === 0 ? 0.055 : 0.035, 10, 10), particleMaterial, [0, 0, 0]);
      particle.userData.offset = i / 12;
      travellingParticles.push(particle);
    }

    scene.add(new THREE.HemisphereLight(0xf5ead4, 0x241b18, 1.4));
    const keyLight = new THREE.DirectionalLight(0xffe9c7, 3.5);
    keyLight.position.set(-4, 8, 7);
    keyLight.castShadow = !reducedMotion;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);
    const redLight = new THREE.PointLight(colors.burgundy, 22, 8, 2);
    redLight.position.set(3.1, 2.3, 2);
    scene.add(redLight);
    const greenLight = new THREE.PointLight(0x6e9a72, 14, 7, 2);
    greenLight.position.set(-1.2, 2.5, -1.8);
    scene.add(greenLight);
    const modeLightColors = [0xffdfb4, 0xd9e4c9, 0xcce5d0, 0xcbdeda, 0xffd0c0].map((color) => new THREE.Color(color));
    const modeFogColors = [0x241713, 0x17231a, 0x16271b, 0x112421, 0x2b1113].map((color) => new THREE.Color(color));
    const modeFogDensity = [0.05, 0.058, 0.044, 0.056, 0.064];

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    function getIdleStatus() {
      if (isOverview && overviewMode === 'angled') return '45° 工作台全景 · 向下滚动转入平视全景';
      if (isOverview) return '平视工作台全景 · 再向下滚动进入 01 个人输入';
      if (entryReady) return '项目入口已点亮 · 继续向下滚动进入项目介绍';
      if (selectedIndex === 4) return '已到判断闸门 · 继续向下滚动，点亮项目入口';
      return `SCENE ${String(selectedIndex + 1).padStart(2, '0')} · 向下滚动进入下一工作区域`;
    }

    function setEntryReady(ready) {
      entryReady = Boolean(ready);
      enterButton?.classList.toggle('is-ready', entryReady);
      gate?.classList.toggle('is-entry-ready', entryReady);
      if (enterLabel) enterLabel.textContent = entryReady ? '继续下滑进入项目' : '进入项目介绍';
      if (entryReady) setStatus(getIdleStatus());
    }

    function playSceneTransition(index) {
      shell.dataset.scene = String(index + 1);
      if (sceneTitleNumber) sceneTitleNumber.textContent = String(index + 1).padStart(2, '0');
      if (sceneTitleName) sceneTitleName.textContent = sceneNames[index];
      [sceneWipe, sceneTitle].forEach((element) => {
        if (!element) return;
        element.classList.remove('is-active');
        void element.offsetWidth;
        element.classList.add('is-active');
      });
    }

    function advanceNarrative(direction) {
      if (direction > 0) {
        if (isOverview) {
          if (overviewMode === 'angled') showOverview('flat');
          else selectStep(0);
          return;
        }
        if (selectedIndex < 4) {
          selectStep(selectedIndex + 1);
          return;
        }
        if (!entryReady) {
          setEntryReady(true);
          return;
        }
        collapseWorkbench();
        return;
      }

      if (entryReady) {
        setEntryReady(false);
        setStatus(getIdleStatus());
        return;
      }
      if (selectedIndex > 0) selectStep(selectedIndex - 1);
      else if (!isOverview) showOverview('flat');
      else if (overviewMode === 'flat') showOverview('angled');
    }

    function showOverview(mode = 'angled') {
      isOverview = true;
      overviewMode = mode;
      setEntryReady(false);
      shell.dataset.scene = mode === 'angled' ? 'overview-angle' : 'overview-flat';
      if (infoEyebrow) infoEyebrow.textContent = mode === 'angled' ? 'SYSTEM OVERVIEW · 45° 斜俯全景' : 'SYSTEM OVERVIEW · 平视全景';
      infoTitle.textContent = mode === 'angled' ? '工作台全貌' : '完整工作台';
      infoCopy.textContent = mode === 'angled'
        ? '先从斜俯视角看清五个工作区域，再向下滚动回到平视工作台。'
        : '现在回到原先的平视全景，再向下滚动进入第一个场景。';
      stepButtons.forEach((button) => {
        button.classList.remove('is-active');
        button.setAttribute('aria-pressed', 'false');
      });
      targetYaw = -0.72;
      targetPitch = mode === 'angled' ? 2.05 : 0.13;
      targetShotRadius = mode === 'angled' ? 8.8 : 11.2;
      desiredCameraTarget.copy(overviewFocus);
      setStatus(getIdleStatus());
    }

    function selectStep(index, shouldFocus = true) {
      setEntryReady(false);
      isOverview = false;
      overviewMode = null;
      selectedIndex = index;
      if (infoEyebrow) infoEyebrow.textContent = `SCENE ${String(index + 1).padStart(2, '0')} · ${sceneNames[index]}`;
      infoTitle.textContent = copy[index][0];
      infoCopy.textContent = copy[index][1];
      stepButtons.forEach((button, buttonIndex) => {
        button.classList.toggle('is-active', buttonIndex === index);
        button.setAttribute('aria-pressed', buttonIndex === index ? 'true' : 'false');
      });
      if (shouldFocus) {
        targetYaw = sceneYaw[index];
        targetPitch = scenePitch[index];
        targetShotRadius = sceneRadius[index];
        desiredCameraTarget.copy(sceneFocus[index]);
        playSceneTransition(index);
      } else {
        shell.dataset.scene = String(index + 1);
      }
      setStatus(index === 4 ? '已到判断闸门 · 继续向下滚动，点亮项目入口' : `SCENE ${String(index + 1).padStart(2, '0')} · 向下滚动进入下一工作区域`);
    }

    function updatePointer(event) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    canvas.addEventListener('pointerdown', (event) => {
      pointerDown = true;
      dragDistance = 0;
      previousX = event.clientX;
      previousY = event.clientY;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    });

    canvas.addEventListener('pointermove', (event) => {
      updatePointer(event);
      if (pointerDown) {
        const dx = event.clientX - previousX;
        const dy = event.clientY - previousY;
        dragDistance += Math.abs(dx) + Math.abs(dy);
        const totalX = event.clientX - dragStartX;
        const totalY = event.clientY - dragStartY;
        if (viewport.clientWidth <= 680 && Math.abs(totalY) > Math.abs(totalX) * 1.2) {
          previousX = event.clientX;
          previousY = event.clientY;
          return;
        }
        // Direct-manipulation direction: the workstation follows the hand.
        // Dragging left rotates the workstation left instead of moving the camera left.
        targetYaw -= dx * 0.006;
        // A full vertical orbit, not only horizontal turntable movement.
        // The wider range lets the viewer move from a near eye-level view
        // to a clear top-down view of the whole information flow.
        const angledOverview = isOverview && overviewMode === 'angled';
        // 45° is only the opening pose, not a locked camera. Keep the full
        // vertical orbit available so dragging up/down still feels physical.
        const minPitch = -0.15;
        const maxPitch = angledOverview ? 2.65 : 0.85;
        targetPitch = THREE.MathUtils.clamp(targetPitch + dy * 0.009, minPitch, maxPitch);
        previousX = event.clientX;
        previousY = event.clientY;
        return;
      }
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(hotspotMeshes, false)[0];
      canvas.classList.toggle('is-hot', Boolean(hit));
      if (hit) setStatus(`点击查看：${copy[hit.object.userData.stepIndex][0]}`);
      else setStatus(getIdleStatus());
    });

    canvas.addEventListener('pointerup', (event) => {
      pointerDown = false;
      canvas.releasePointerCapture(event.pointerId);
      const totalX = event.clientX - dragStartX;
      const totalY = event.clientY - dragStartY;
      if (viewport.clientWidth <= 680 && Math.abs(totalY) > 64 && Math.abs(totalY) > Math.abs(totalX) * 1.25) {
        advanceNarrative(totalY < 0 ? 1 : -1);
        return;
      }
      if (dragDistance > 8) return;
      updatePointer(event);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(hotspotMeshes, false)[0];
      if (hit) selectStep(hit.object.userData.stepIndex);
    });

    canvas.addEventListener('pointerleave', () => {
      pointerDown = false;
      canvas.classList.remove('is-hot');
      setStatus(getIdleStatus());
    });

    stepButtons.forEach((button, index) => {
      button.addEventListener('click', () => selectStep(index));
    });

    gate?.addEventListener('wheel', (event) => {
      if (!document.body.classList.contains('workbench-gate-open')) return;
      event.preventDefault();
      window.clearTimeout(wheelGestureResetTimer);
      wheelGestureResetTimer = window.setTimeout(() => {
        wheelGestureActive = false;
        wheelAccumulator = 0;
      }, 220);
      const now = performance.now();
      if (now < wheelLockedUntil || wheelGestureActive) return;
      wheelAccumulator += event.deltaY;
      if (Math.abs(wheelAccumulator) < 46) return;
      const direction = wheelAccumulator > 0 ? 1 : -1;
      wheelAccumulator = 0;
      wheelGestureActive = true;
      wheelLockedUntil = now + (reducedMotion ? 180 : 620);
      advanceNarrative(direction);
    }, { passive: false });

    function placeCamera() {
      const radius = shotRadius + (viewport.clientWidth < 620 ? 0.82 : 0);
      camera.position.set(
        cameraTarget.x + Math.sin(yaw) * radius,
        cameraTarget.y + 1.2 + pitch * 3.6,
        cameraTarget.z + Math.cos(yaw) * radius
      );
      camera.lookAt(cameraTarget);
    }

    function resize() {
      const width = Math.max(1, viewport.clientWidth);
      const height = Math.max(1, viewport.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.fov = width < 620 ? 44 : 34;
      camera.updateProjectionMatrix();
      placeCamera();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(viewport);

    const visibilityObserver = new IntersectionObserver((entries) => {
      isVisible = entries[0]?.isIntersecting ?? true;
    }, { rootMargin: '120px' });
    visibilityObserver.observe(shell);

    let elapsed = 0;
    let previousTime = performance.now();
    function render(now) {
      requestAnimationFrame(render);
      const delta = Math.min((now - previousTime) / 1000, 0.05);
      previousTime = now;
      if (!isVisible || shell.classList.contains('is-collapsed')) return;
      elapsed += delta;
      if (!pointerDown && !reducedMotion) targetYaw += delta * 0.012;
      yaw += (targetYaw - yaw) * 0.055;
      pitch += (targetPitch - pitch) * 0.055;
      shotRadius += (targetShotRadius - shotRadius) * 0.06;
      cameraTarget.lerp(desiredCameraTarget, 0.055);
      placeCamera();

      const selectedScale = [1.48, 1.52, 1.55, 1.48, 1.55][selectedIndex];
      nodes.forEach((node, nodeIndex) => {
        const scale = isOverview ? 0.98 : (nodeIndex === selectedIndex ? selectedScale : 0.66);
        node.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.075);
        const yOffset = isOverview ? 0 : (nodeIndex === selectedIndex ? 0.18 : -0.16);
        node.position.y = THREE.MathUtils.lerp(node.position.y, node.userData.baseY + yOffset, 0.07);
      });

      const inputActive = !isOverview && selectedIndex === 0 ? 1 : 0;
      inputSheets.forEach((sheet, index) => {
        const spread = index - 2;
        sheet.position.x = THREE.MathUtils.lerp(sheet.position.x, spread * 0.13 * inputActive, 0.075);
        sheet.rotation.y = THREE.MathUtils.lerp(sheet.rotation.y, sheet.userData.baseRotationY + spread * 0.1 * inputActive, 0.075);
        sheet.rotation.z = THREE.MathUtils.lerp(sheet.rotation.z, spread * 0.075 * inputActive, 0.075);
      });

      evidenceDrawers.forEach((drawer, index) => {
        const openDistance = selectedIndex === 1 ? [0.08, 0.32, 0.18][index] : 0;
        drawer.position.z = THREE.MathUtils.lerp(drawer.position.z, openDistance, 0.085);
      });

      contextCore.rotation.x += delta * 0.18;
      contextCore.rotation.y += delta * 0.28;
      rings.forEach((ring, index) => {
        ring.rotation.z += delta * (selectedIndex === 2 ? 0.7 : 0.22) * (index % 2 ? -1 : 1);
        const ringScale = selectedIndex === 2 ? 1.22 + index * 0.06 : 1;
        ring.scale.lerp(new THREE.Vector3(ringScale, ringScale, ringScale), 0.055);
      });
      const coreScale = selectedIndex === 2 ? 1.3 : 1;
      contextCore.scale.lerp(new THREE.Vector3(coreScale, coreScale, coreScale), 0.06);
      contextCore.material.emissiveIntensity = THREE.MathUtils.lerp(contextCore.material.emissiveIntensity, selectedIndex === 2 ? 1.25 : 0.62, 0.05);

      toolRing.rotation.y += delta * (selectedIndex === 3 ? 1.75 : 0.38);
      const toolScale = selectedIndex === 3 ? 1.28 : 1;
      toolRing.scale.lerp(new THREE.Vector3(toolScale, toolScale, toolScale), 0.06);
      aiTools.forEach((tool) => {
        const targetY = selectedIndex === 3 ? Math.sin(elapsed * 2.8 + tool.userData.phase) * 0.13 : 0;
        tool.position.y = THREE.MathUtils.lerp(tool.position.y, targetY, 0.1);
      });
      spindle.rotation.y += delta * 0.18;

      judgmentLever.rotation.z = THREE.MathUtils.lerp(judgmentLever.rotation.z, selectedIndex === 4 ? -1.02 : -0.48, 0.075);
      const checkpointScale = selectedIndex === 4 ? 1.34 : 1;
      checkpoint.scale.lerp(new THREE.Vector3(checkpointScale, checkpointScale, checkpointScale), 0.07);
      checkpoint.material.emissive = checkpoint.material.emissive || new THREE.Color(colors.wine);
      checkpoint.material.emissiveIntensity = (selectedIndex === 4 ? 0.85 : 0.3) + Math.sin(elapsed * (selectedIndex === 4 ? 3.2 : 1.4)) * 0.14;

      monitorScreen.material.emissiveIntensity = THREE.MathUtils.lerp(monitorScreen.material.emissiveIntensity, selectedIndex === 3 ? 1.6 : 0.72, 0.05);
      pathLine.material.opacity = THREE.MathUtils.lerp(pathLine.material.opacity, selectedIndex === 4 ? 0.18 : selectedIndex === 3 ? 0.7 : 0.38, 0.04);
      keyLight.color.lerp(modeLightColors[selectedIndex], 0.025);
      scene.fog.color.lerp(modeFogColors[selectedIndex], 0.025);
      scene.fog.density = THREE.MathUtils.lerp(scene.fog.density, modeFogDensity[selectedIndex], 0.025);
      redLight.intensity = THREE.MathUtils.lerp(redLight.intensity, selectedIndex === 4 ? 34 : 16, 0.04);
      greenLight.intensity = THREE.MathUtils.lerp(greenLight.intensity, selectedIndex === 1 || selectedIndex === 2 ? 24 : 11, 0.04);

      const particleSpeed = [0.055, 0.07, 0.09, 0.18, 0.025][selectedIndex];
      travellingParticles.forEach((particle) => {
        const t = reducedMotion ? particle.userData.offset : (elapsed * particleSpeed + particle.userData.offset) % 1;
        // Keep the sample inside the open curve. Some Three.js builds can
        // resolve an exact endpoint to a point index past the final control.
        particle.position.copy(pathCurve.getPoint(THREE.MathUtils.clamp(t, 0.0001, 0.9999)));
      });
      renderer.render(scene, camera);
    }

    resize();
    showOverview('angled');
    requestAnimationFrame(render);
  }

  function collapseWorkbench() {
    shell.classList.add('is-collapsed');
    shell.setAttribute('aria-hidden', 'true');
    gate?.classList.add('is-dismissed');
    document.body.classList.remove('workbench-gate-open');
    setBackgroundInert(false);
    if (reopenButton) reopenButton.hidden = false;
    window.setTimeout(() => {
      projectStart?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }, reducedMotion ? 0 : 260);
  }

  function reopenWorkbench() {
    document.body.classList.add('workbench-gate-open');
    setBackgroundInert(true);
    gate?.classList.remove('is-dismissed');
    shell.classList.remove('is-collapsed');
    shell.setAttribute('aria-hidden', 'false');
    if (reopenButton) reopenButton.hidden = true;
    window.setTimeout(() => {
      shell.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }, 40);
  }

  enterButton?.addEventListener('click', collapseWorkbench);
  reopenButton?.addEventListener('click', reopenWorkbench);
}
