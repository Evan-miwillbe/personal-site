#!/usr/bin/env bash
# drive.html v2 CDP 验证脚本
# 输出 10 张验收截图到 _verify/，命名 v2-NN-xxx.png
# 用法: bash scripts/verify-drive-v2.sh

set -e

ROOT="C:/Users/Tengm/Desktop/研究报告/个人网页设计调研/我的网站"
VERIFY="$ROOT/_verify"
URL="file:///${ROOT//\\//}/drive.html"

mkdir -p "$VERIFY"

echo "[1/14] open drive.html..."
agent-browser open "$URL"
agent-browser wait 2500

echo "[2/14] screenshot 入场 intro 界面"
agent-browser screenshot "$VERIFY/v2-01-intro.png"

echo "[3/14] 点击 入场 按钮..."
agent-browser click ".intro .start" 2>/dev/null || agent-browser keyboard type " "
agent-browser wait 1500

echo "[4/14] screenshot 出生第一帧 (远山+书院+蓝天三件套)"
agent-browser screenshot "$VERIFY/v2-02-spawn-first-frame.png"

echo "[5/14] 按 W 向前开 3s..."
agent-browser keyboard down w
agent-browser wait 3000
agent-browser keyboard up w
agent-browser wait 500

echo "[6/14] screenshot 已开向桥头"
agent-browser screenshot "$VERIFY/v2-03-driving-north.png"

echo "[7/14] 继续按 W 上桥 2.5s"
agent-browser keyboard down w
agent-browser wait 2500
agent-browser keyboard up w
agent-browser wait 800

echo "[8/14] screenshot 桥上视角"
agent-browser screenshot "$VERIFY/v2-04-on-bridge.png"

echo "[9/14] eval: 看场景内 mesh 统计 + 各种验收数据"
agent-browser eval "JSON.stringify({
  meshes: window.__drive ? window.__drive.scene.children.length : -1,
  bodies: window.__drive ? window.__drive.world.bodies.length : -1,
  carPos: window.__drive && window.__drive.chassisBody ? [
    window.__drive.chassisBody.position.x.toFixed(1),
    window.__drive.chassisBody.position.y.toFixed(1),
    window.__drive.chassisBody.position.z.toFixed(1)
  ] : null,
  fogNear: window.__drive ? window.__drive.scene.fog.near : -1,
  fogFar: window.__drive ? window.__drive.scene.fog.far : -1,
  hasMountains: !!window.buildDistantMountains,
  hasSkyDome: !!window.buildSkyDome,
  hasArchBridge: !!window.buildArchBridge,
  hasDistantHall: !!window.buildDistantHall
})" > "$VERIFY/v2-stats.json"
cat "$VERIFY/v2-stats.json"

echo "[10/14] 鼠标位置移到右上, hover 查看 cursor-ring 工作"
agent-browser eval "var e = new MouseEvent('mousemove', {clientX: window.innerWidth-100, clientY: 100}); document.dispatchEvent(e); window.dispatchEvent(e);"
agent-browser wait 200
agent-browser screenshot "$VERIFY/v2-05-cursor-ring.png"

echo "[11/14] 鼠标拖动旋转相机 yaw 看远景 (drag from center to left)"
agent-browser eval "
  var canvas = document.querySelector('canvas');
  var cx = window.innerWidth/2;
  var cy = window.innerHeight/2;
  canvas.dispatchEvent(new MouseEvent('mousedown', {clientX:cx, clientY:cy, button:0, bubbles:true}));
  document.dispatchEvent(new MouseEvent('mousemove', {clientX:cx-200, clientY:cy, button:0, bubbles:true}));
  document.dispatchEvent(new MouseEvent('mouseup', {clientX:cx-200, clientY:cy, button:0, bubbles:true}));
"
agent-browser wait 600

echo "[12/14] screenshot 旋转后视角 (东侧奖项坡)"
agent-browser screenshot "$VERIFY/v2-06-rotated-east.png"

echo "[13/14] 后退到看远景全景 - S 键长按"
agent-browser keyboard down s
agent-browser wait 3000
agent-browser keyboard up s
agent-browser wait 800
agent-browser screenshot "$VERIFY/v2-07-far-landscape.png"

echo "[14/14] 测试翻车 reset - 用 eval 强制翻车"
agent-browser eval "
  if (window.__drive && window.__drive.chassisBody) {
    window.__drive.chassisBody.quaternion.setFromEuler(Math.PI, 0, 0);
    window.__drive.chassisBody.angularVelocity.set(0,0,0);
  }
"
agent-browser wait 200
agent-browser screenshot "$VERIFY/v2-08-flipped.png"
agent-browser wait 1800
agent-browser screenshot "$VERIFY/v2-09-flip-recovered.png"

echo "完成. 截图列表:"
ls -la "$VERIFY/v2-"*.png 2>/dev/null || ls "$VERIFY" | grep ^v2-
