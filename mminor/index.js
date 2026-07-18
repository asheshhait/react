
// ============================================================
// THEME
// ============================================================
let isDark = true;
document.getElementById('themeToggle').onclick = () => {
  isDark = !isDark;
  document.body.classList.toggle('light-mode', !isDark);
  document.getElementById('themeToggle').textContent = isDark ? '🌙' : '☀️';
  if (!isDark) {
    document.getElementById('drawCanvas').style.background = '#ffffff';
  }
};

// ============================================================
// TABS
// ============================================================
function switchTab(id) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  event.target.closest('.tab-btn').classList.add('active');
}

// ============================================================
// CANVAS SETUP
// ============================================================
const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');

let penColor = '#1a1a2e';
let penSize = 3;
let isDrawing = false;
let strokes = [];
let currentStroke = null;
let drawStartTime = null;
let totalPoints = 0;
let jsonVisible = false;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  redrawAll();
}

window.addEventListener('resize', resizeCanvas);

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  const src = e.touches ? e.touches[0] : e;
  return { x: src.clientX - rect.left, y: src.clientY - rect.top };
}

function startDraw(e) {
  e.preventDefault();
  isDrawing = true;
  if (!drawStartTime) drawStartTime = Date.now();
  const pos = getPos(e);
  currentStroke = {
    id: strokes.length,
    color: penColor, size: penSize,
    points: [{ x: pos.x, y: pos.y, t: Date.now() }],
    penDown: true
  };
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  canvas.classList.add('drawing');
  document.getElementById('drawStatus').textContent = 'Drawing...';
}

function moveDraw(e) {
  e.preventDefault();
  if (!isDrawing || !currentStroke) return;
  const pos = getPos(e);
  const now = Date.now();
  currentStroke.points.push({ x: pos.x, y: pos.y, t: now });

  ctx.lineWidth = penSize;
  ctx.strokeStyle = penColor;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.globalAlpha = 0.95;

  const pts = currentStroke.points;
  if (pts.length >= 3) {
    const i = pts.length - 2;
    ctx.beginPath();
    ctx.moveTo(pts[i-1].x, pts[i-1].y);
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, (pts[i].x+pts[i+1].x)/2, (pts[i].y+pts[i+1].y)/2);
    ctx.stroke();
  }
  updateStats();
}

function endDraw(e) {
  if (!isDrawing || !currentStroke) return;
  isDrawing = false;
  currentStroke.penUp = true;
  strokes.push(currentStroke);
  currentStroke = null;
  canvas.classList.remove('drawing');
  document.getElementById('drawStatus').textContent = `${strokes.length} stroke(s)`;
  updateStats();
  updateStrokeViz();
}

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', moveDraw);
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('mouseleave', endDraw);
canvas.addEventListener('touchstart', startDraw, { passive: false });
canvas.addEventListener('touchmove', moveDraw, { passive: false });
canvas.addEventListener('touchend', endDraw);

function updateStats() {
  totalPoints = strokes.reduce((a,s) => a + s.points.length, 0) + (currentStroke?.points.length || 0);
  document.getElementById('strokeCount').textContent = strokes.length;
  document.getElementById('pointCount').textContent = totalPoints;
  if (drawStartTime) {
    const secs = ((Date.now() - drawStartTime)/1000).toFixed(1);
    document.getElementById('drawTime').textContent = secs + 's';
  }
  // avg velocity
  let totalV = 0, vCount = 0;
  strokes.forEach(s => {
    for (let i = 1; i < s.points.length; i++) {
      const dt = s.points[i].t - s.points[i-1].t;
      if (dt > 0) {
        const dx = s.points[i].x - s.points[i-1].x;
        const dy = s.points[i].y - s.points[i-1].y;
        totalV += Math.sqrt(dx*dx+dy*dy) / dt * 1000;
        vCount++;
      }
    }
  });
  document.getElementById('avgVel').textContent = vCount ? Math.round(totalV/vCount) : 0;
}

function redrawAll() {
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0,0,rect.width,rect.height);
  strokes.forEach(s => {
    if (s.points.length < 2) return;
    ctx.beginPath();
    ctx.strokeStyle = s.color;
    ctx.lineWidth = s.size;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.moveTo(s.points[0].x, s.points[0].y);
    for (let i = 1; i < s.points.length; i++) {
      ctx.lineTo(s.points[i].x, s.points[i].y);
    }
    ctx.stroke();
  });
}

function setColor(el, c) {
  penColor = c;
  document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}
function setPenSize(v) {
  penSize = parseInt(v);
  document.getElementById('penSizeVal').textContent = v + 'px';
}

function undoStroke() {
  if (!strokes.length) return;
  strokes.pop();
  redrawAll();
  updateStats();
  updateStrokeViz();
  notify('Stroke undone', 'info');
}

function clearCanvas() {
  strokes = [];
  currentStroke = null;
  drawStartTime = null;
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0,0,rect.width,rect.height);
  updateStats();
  updateStrokeViz();
  document.getElementById('ocrResult').innerHTML = '<div class="result-placeholder"><span style="font-size:28px">✍️</span><span>Draw Bengali text above then run OCR</span></div>';
  document.getElementById('confFill').style.width = '0%';
  document.getElementById('confVal').textContent = '—';
  document.getElementById('confBadge').textContent = '—';
  document.getElementById('st-chars').textContent = '—';
  document.getElementById('st-words').textContent = '—';
  document.getElementById('st-time').textContent = '—';
  notify('Canvas cleared', 'info');
}

// ============================================================
// STROKE VISUALIZATION
// ============================================================
function updateStrokeViz() {
  const vc = document.getElementById('strokeVizCanvas');
  const vctx = vc.getContext('2d');
  const rect = vc.getBoundingClientRect();
  vc.width = rect.width * (window.devicePixelRatio||1);
  vc.height = rect.height * (window.devicePixelRatio||1);
  vctx.scale(window.devicePixelRatio||1, window.devicePixelRatio||1);
  vctx.clearRect(0,0,rect.width,rect.height);

  if (!strokes.length) return;

  strokes.forEach((s, si) => {
    if (s.points.length < 2) return;
    for (let i = 1; i < s.points.length; i++) {
      const dt = s.points[i].t - s.points[i-1].t;
      const dx = s.points[i].x - s.points[i-1].x;
      const dy = s.points[i].y - s.points[i-1].y;
      const v = dt > 0 ? Math.sqrt(dx*dx+dy*dy)/dt*1000 : 0;
      const norm = Math.min(v/500, 1);
      // Heatmap: blue=slow, red=fast
      const r = Math.round(norm * 220);
      const g = Math.round((1-Math.abs(norm-0.5)*2) * 180);
      const b = Math.round((1-norm) * 220);
      vctx.beginPath();
      vctx.strokeStyle = `rgb(${r},${g},${b})`;
      vctx.lineWidth = 2; vctx.lineCap = 'round';
      vctx.moveTo(s.points[i-1].x, s.points[i-1].y);
      vctx.lineTo(s.points[i].x, s.points[i].y);
      vctx.stroke();
    }
  });
}

// ============================================================
// SAMPLE STROKES — simulate Bengali letter "ক"
// ============================================================
function loadSampleStrokes() {
  

}

// ============================================================
// OCR — HANDWRITING (simulated with realistic output)
// ============================================================
const bengaliSamples = [
 
];

function runHandwritingOCR() {
 
}

// ============================================================
// JSON Export
// ============================================================
function exportStrokeJSON() {
  const data = {
    metadata: { version:'1.0', timestamp: new Date().toISOString(), engine:'BengaliOCR-v2' },
    strokes: strokes.map(s => ({
      id: s.id,
      color: s.color, size: s.size,
      penDown: s.penDown, penUp: s.penUp || false,
      points: s.points.map(p => ({ x: Math.round(p.x), y: Math.round(p.y), t: p.t }))
    }))
  };
  download('strokes.json', JSON.stringify(data, null, 2));
  notify('Stroke JSON exported!', 'success');
}

function toggleJSON() {
  jsonVisible = !jsonVisible;
  const jv = document.getElementById('jsonView');
  const jh = document.getElementById('jsonHidden');
  if (jsonVisible) {
    const data = { strokes: strokes.slice(0,3).map(s => ({ id:s.id, points: s.points.slice(0,5) })) };
    jv.textContent = JSON.stringify(data, null, 2) + (strokes.length > 3 ? '\n// ... more strokes' : '');
    jv.style.display = 'block';
    jh.style.display = 'none';
  } else {
    jv.style.display = 'none';
    jh.style.display = 'block';
  }
}

// ============================================================
// IMAGE UPLOAD OCR
// ============================================================
let uploadedImageData = null;
let imgOcrText = '';

function handleFileSelect(input) {
  if (!input.files[0]) return;
  loadImage(input.files[0]);
}
function dragOver(e) { e.preventDefault(); document.getElementById('dropZone').classList.add('drag-over'); }
function dragLeave() { document.getElementById('dropZone').classList.remove('drag-over'); }
function dropFile(e) {
  e.preventDefault();
  document.getElementById('dropZone').classList.remove('drag-over');
  if (e.dataTransfer.files[0]) loadImage(e.dataTransfer.files[0]);
}

function loadImage(file) {
  if (!file.type.match('image.*')) { notify('Please upload an image file', 'error'); return; }
  const reader = new FileReader();
  reader.onload = (ev) => {
    uploadedImageData = ev.target.result;
    document.getElementById('uploadedImg').src = uploadedImageData;
    document.getElementById('imgPreview').style.display = 'block';
    document.getElementById('runImgOCR').disabled = false;
    resetPrepSteps();
    notify('Image loaded! Click Run OCR', 'success');
  };
  reader.readAsDataURL(file);
}

function loadSampleImage() {
  // Generate a canvas-based sample Bengali text image
  const sc = document.createElement('canvas');
  sc.width = 600; sc.height = 200;
  const sctx = sc.getContext('2d');
  sctx.fillStyle = '#ffffff';
  sctx.fillRect(0,0,600,200);
  sctx.fillStyle = '#1a1a2e';
  sctx.font = 'bold 48px "Noto Sans Bengali"';
  sctx.fillText('বাংলা লিখন', 60, 120);
  const dataUrl = sc.toDataURL('image/png');
  uploadedImageData = dataUrl;
  document.getElementById('uploadedImg').src = dataUrl;
  document.getElementById('imgPreview').style.display = 'block';
  document.getElementById('runImgOCR').disabled = false;
  resetPrepSteps();
  notify('Sample Bengali image loaded!', 'success');
}

function resetPrepSteps() {
  ['gray','bin','noise','skew','detect','recog','post'].forEach(id => {
    const el = document.getElementById('step-' + id);
    el.className = 'step-badge pending';
    el.textContent = '⬜ ' + el.textContent.split(' ').slice(1).join(' ');
  });
}

const stepLabels = {
  gray: 'Grayscale', bin: 'Binarize', noise: 'Denoise',
  skew: 'Deskew', detect: 'Detect Text', recog: 'Recognize', post: 'Post-process'
};

function runImageOCR() {
  if (!uploadedImageData) { notify('Please upload an image first', 'error'); return; }
  const steps = ['gray','bin','noise','skew','detect','recog','post'];
  let idx = 0;
  const imgResult = document.getElementById('imgOcrResult');
  imgResult.innerHTML = '<div class="result-placeholder"><span style="font-size:24px">⏳</span><span>Starting preprocessing...</span></div>';
  imgResult.classList.add('loading');
  document.getElementById('detectionList').textContent = 'Processing...';

  function runStep() {
    if (idx >= steps.length) {
      // Done
      imgResult.classList.remove('loading');
      const pick = bengaliSamples[Math.floor(Math.random() * bengaliSamples.length)];
      imgOcrText = pick.text;
      imgResult.innerHTML = pick.text;
      imgResult.style.fontSize = '26px';
      const confPct = Math.round(pick.conf * 100);
      document.getElementById('imgConfFill').style.width = confPct + '%';
      document.getElementById('imgConfVal').textContent = confPct + '%';

      // Draw bboxes
      drawBBoxes();
      // Detection list
      document.getElementById('detectionList').innerHTML = `
        <div style="display:flex;flex-direction:column;gap:6px">
          ${pick.text.split(' ').map((w,i) => `<div style="display:flex;justify-content:space-between;font-size:12px;padding:4px 8px;background:var(--bg3);border-radius:4px">
            <span style="font-family:'Noto Sans Bengali'">${w}</span>
            <span style="color:var(--teal)">${(85+Math.random()*12).toFixed(1)}%</span>
          </div>`).join('')}
        </div>`;
      notify('Image OCR complete!', 'success');
      return;
    }
    const sid = steps[idx];
    const el = document.getElementById('step-' + sid);
    el.className = 'step-badge processing';
    el.textContent = '⟳ ' + stepLabels[sid];
    imgResult.innerHTML = `<div class="result-placeholder"><span style="font-size:20px">⚙️</span><span>${stepLabels[sid]}...</span></div>`;

    setTimeout(() => {
      el.className = 'step-badge done';
      el.textContent = '✓ ' + stepLabels[sid];
      idx++;
      runStep();
    }, 600);
  }
  runStep();
}

function drawBBoxes() {
  const img = document.getElementById('uploadedImg');
  const bc = document.getElementById('bboxCanvas');
  bc.width = img.offsetWidth;
  bc.height = img.offsetHeight;
  const bctx = bc.getContext('2d');
  bctx.clearRect(0,0,bc.width,bc.height);
  // Draw some demo bounding boxes
  const boxes = [
    { x:0.05, y:0.2, w:0.4, h:0.5 },
    { x:0.5, y:0.2, w:0.45, h:0.5 },
  ];
  boxes.forEach((b, i) => {
    bctx.strokeStyle = i === 0 ? '#e8562a' : '#2ec4b6';
    bctx.lineWidth = 2;
    bctx.strokeRect(b.x*bc.width, b.y*bc.height, b.w*bc.width, b.h*bc.height);
    bctx.fillStyle = i === 0 ? 'rgba(232,86,42,0.1)' : 'rgba(46,196,182,0.1)';
    bctx.fillRect(b.x*bc.width, b.y*bc.height, b.w*bc.width, b.h*bc.height);
  });
}

// ============================================================
// PIPELINE ANIMATION
// ============================================================
function animatePipeline(type) {
  const ids = type === 'offline'
    ? ['p1','p2','p3','p4','p5','p6']
    : ['q1','q2','q3','q4','q5','q6'];
  ids.forEach(id => {
    document.getElementById(id).className = 'pipe-step';
  });
  let i = 0;
  const iv = setInterval(() => {
    if (i > 0) document.getElementById(ids[i-1]).className = 'pipe-step done';
    if (i >= ids.length) { clearInterval(iv); notify('Pipeline simulation complete!', 'success'); return; }
    document.getElementById(ids[i]).className = 'pipe-step active';
    i++;
  }, 600);
}

// ============================================================
// EXPORT HELPERS
// ============================================================
function download(filename, content, type='text/plain') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type }));
  a.download = filename; a.click();
}
function exportTXT() {
  const t = document.getElementById('ocrResult').innerText.trim();
  if (!t || t.includes('Draw Bengali')) { notify('No OCR result to export', 'error'); return; }
  download('bengali_ocr.txt', t);
  notify('Text exported!', 'success');
}
function exportJSON2() {
  const t = document.getElementById('ocrResult').innerText.trim();
  download('ocr_result.json', JSON.stringify({ text: t, strokes: strokes.length, timestamp: new Date().toISOString() }, null, 2));
  notify('JSON exported!', 'success');
}
function exportPNG() {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'handwriting.png'; link.click();
  notify('PNG exported!', 'success');
}
function exportImgTXT() {
  if (!imgOcrText) { notify('No result yet', 'error'); return; }
  download('img_ocr.txt', imgOcrText);
  notify('Exported!', 'success');
}
function exportImgJSON() {
  if (!imgOcrText) { notify('No result yet', 'error'); return; }
  download('img_ocr.json', JSON.stringify({ text: imgOcrText, pipeline:'YOLOv11+CRNN', timestamp:new Date().toISOString() }, null, 2));
  notify('JSON exported!', 'success');
}
function exportImgPNG() {
  if (!uploadedImageData) { notify('No image loaded', 'error'); return; }
  const link = document.createElement('a');
  link.href = uploadedImageData;
  link.download = 'bengali_img.png'; link.click();
  notify('PNG exported!', 'success');
}

// ============================================================
// NOTIFICATION
// ============================================================
let notifTimer;
function notify(msg, type='info') {
  const el = document.getElementById('notif');
  el.textContent = (type==='success'?'✓ ':type==='error'?'✕ ':'ℹ ') + msg;
  el.className = 'notif show ' + type;
  clearTimeout(notifTimer);
  notifTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

// ============================================================
// INIT
// ============================================================
window.addEventListener('load', () => {
  resizeCanvas();
  notify('BengaliOCR Studio loaded — check the Dataset tab for guidance!', 'info');
});

