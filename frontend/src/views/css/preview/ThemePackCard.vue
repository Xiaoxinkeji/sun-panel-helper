<template>
  <div class="widget-card" data-widget-id="theme-pack" @click="$emit('click')">
    <div class="deploy-badge" v-if="isDeployed">已部署</div>
    
    <div class="preview-section">
      <div class="preview-area">
        <div class="theme-grid">
          <div class="theme-mini ios-light">
            <div class="mini-card"></div>
            <div class="mini-card"></div>
            <div class="mini-card"></div>
          </div>
          <div class="theme-mini ios-dark">
            <div class="mini-card"></div>
            <div class="mini-card"></div>
            <div class="mini-card"></div>
          </div>
          <div class="theme-mini black-gold">
            <div class="mini-card"></div>
            <div class="mini-card"></div>
            <div class="mini-card"></div>
          </div>
          <div class="theme-mini sakura-pink">
            <div class="mini-card"></div>
            <div class="mini-card"></div>
            <div class="mini-card"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-section">
      <h3>🎨 主题包</h3>
      <p>一键切换Sun-Panel整体视觉风格，内置iOS亮色/暗色、黑金奢华、樱花粉等精美主题</p>
      <div class="tags">
        <span class="tag">主题</span>
        <span class="tag">美化</span>
        <span class="tag">风格</span>
        <span class="tag">iOS</span>
      </div>
      <div class="author">
        <span class="author-tag">作者：Sun-Panel-Helper</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemePackCard',
  props: {
    isDeployed: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.widget-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  height: 340px;
  display: flex;
  flex-direction: column;
}

.widget-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}

.preview-section {
  padding: 1.5rem;
  background: linear-gradient(145deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.preview-area {
  width: 100%;
  display: flex;
  justify-content: center;
}

.theme-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  width: 180px;
  animation: themeFloat 4s ease-in-out infinite;
}

.theme-mini {
  border-radius: 8px;
  padding: 6px;
  display: flex;
  gap: 3px;
  flex-direction: column;
  height: 50px;
}

.theme-mini.ios-light {
  background: rgba(255,255,255,0.9);
}

.theme-mini.ios-dark {
  background: rgba(28,28,30,0.95);
}

.theme-mini.black-gold {
  background: rgba(26,26,26,0.95);
}

.theme-mini.sakura-pink {
  background: rgba(255,240,245,0.9);
}

.ios-light .mini-card {
  background: #f5f5f7;
  border-radius: 4px;
  height: 10px;
  border: 0.5px solid rgba(0,0,0,0.06);
}

.ios-dark .mini-card {
  background: #2c2c2e;
  border-radius: 4px;
  height: 10px;
  border: 0.5px solid rgba(255,255,255,0.08);
}

.black-gold .mini-card {
  background: #2a2a2a;
  border-radius: 3px;
  height: 10px;
  border: 0.5px solid rgba(212,175,55,0.4);
}

.sakura-pink .mini-card {
  background: rgba(255,182,193,0.25);
  border-radius: 4px;
  height: 10px;
  border: 0.5px solid rgba(255,105,180,0.25);
}

.info-section {
  padding: 1rem;
  flex-shrink: 0;
  height: 180px;
  display: flex;
  flex-direction: column;
}

.info-section h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: #2c3e50;
}

.info-section p {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
  flex: 1;
  min-height: 40px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  min-height: 28px;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: #f3e8ff;
  border: 1px solid #e9d5ff;
  color: #9333ea;
  border-radius: 12px;
  font-size: 0.8rem;
  transition: all 0.3s;
}

.tag:nth-child(2) {
  background: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
}

.tag:nth-child(3) {
  background: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}

.tag:nth-child(4) {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: #909399;
}

.deploy-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #9333ea;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.author {
  margin-top: auto;
  padding-top: 0.75rem;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  border-top: 1px dashed #ebeef5;
  font-size: 0.8rem;
  color: #909399;
}

.author-tag {
  position: relative;
  padding-left: 16px;
  color: inherit;
}

.author-tag::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background: #9333ea;
  border-radius: 50%;
  opacity: 0.7;
}

@keyframes themeFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
</style>
