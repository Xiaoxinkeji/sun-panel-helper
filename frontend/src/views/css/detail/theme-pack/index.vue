<template>
  <div class="theme-detail">
    <div class="detail-header">
      <div class="title-section">
        <h2>🎨 主题包</h2>
        <p class="description">一键切换Sun-Panel的整体视觉风格，选择你喜欢的主题后点击部署即可生效</p>
      </div>
      <div class="action-buttons">
        <el-button 
          :type="isDeployed ? 'success' : 'primary'"
          @click="handleDeploy"
          :loading="deploying"
        >
          {{ isDeployed ? '重新部署' : '部署' }}
        </el-button>
        <el-button 
          v-if="isDeployed"
          type="danger"
          @click="handleUndeploy"
          :loading="undeploying"
        >
          取消部署
        </el-button>
      </div>
    </div>

    <div class="detail-content">
      <!-- 主题画廊 -->
      <div class="gallery-section">
        <h3>选择主题</h3>
        <div class="theme-gallery">
          <div 
            v-for="theme in themes" 
            :key="theme.id"
            class="theme-card"
            :class="{ active: selectedTheme === theme.id }"
            @click="selectTheme(theme)"
          >
            <div class="theme-preview" :style="getPreviewStyle(theme)">
              <div class="preview-cards">
                <div class="p-card" :style="getCardStyle(theme)"></div>
                <div class="p-card" :style="getCardStyle(theme)"></div>
                <div class="p-card" :style="getCardStyle(theme)"></div>
                <div class="p-card" :style="getCardStyle(theme)"></div>
                <div class="p-card" :style="getCardStyle(theme)"></div>
                <div class="p-card" :style="getCardStyle(theme)"></div>
              </div>
            </div>
            <div class="theme-info">
              <span class="theme-emoji">{{ theme.preview }}</span>
              <span class="theme-name">{{ theme.name }}</span>
              <span class="theme-check" v-if="selectedTheme === theme.id">✓</span>
            </div>
            <p class="theme-desc">{{ theme.description }}</p>
          </div>
        </div>
      </div>

      <!-- 参数微调区域 -->
      <div class="params-section">
        <h3>参数微调</h3>
        <div class="params-scroll">
          <div class="param-group">
            <div class="param-group-title">卡片样式</div>
            <div class="param-item">
              <label>背景色</label>
              <el-color-picker v-model="params.cardBg" size="small" />
            </div>
            <div class="param-item">
              <label>透明度</label>
              <el-slider v-model="params.cardOpacity" :min="0" :max="1" :step="0.05" :show-tooltip="true" />
            </div>
            <div class="param-item">
              <label>圆角 (px)</label>
              <el-slider v-model="params.cardRadius" :min="0" :max="30" :step="1" />
            </div>
            <div class="param-item">
              <label>阴影强度</label>
              <el-slider v-model="params.cardShadow" :min="0" :max="30" :step="1" />
            </div>
            <div class="param-item">
              <label>毛玻璃</label>
              <el-slider v-model="params.cardBlur" :min="0" :max="30" :step="1" />
            </div>
            <div class="param-item">
              <label>边框色</label>
              <el-input v-model="params.cardBorder" size="small" />
            </div>
            <div class="param-item">
              <label>边框宽度</label>
              <el-slider v-model="params.cardBorderWidth" :min="0" :max="3" :step="0.5" />
            </div>
          </div>

          <div class="param-group">
            <div class="param-group-title">文字颜色</div>
            <div class="param-item">
              <label>正文</label>
              <el-color-picker v-model="params.textColor" size="small" />
            </div>
            <div class="param-item">
              <label>标题</label>
              <el-color-picker v-model="params.titleColor" size="small" />
            </div>
            <div class="param-item">
              <label>分组标题</label>
              <el-color-picker v-model="params.groupTitleColor" size="small" />
            </div>
            <div class="param-item">
              <label>Logo</label>
              <el-color-picker v-model="params.logoColor" size="small" />
            </div>
            <div class="param-item">
              <label>时钟</label>
              <el-color-picker v-model="params.clockColor" size="small" />
            </div>
          </div>

          <div class="param-group">
            <div class="param-group-title">搜索框</div>
            <div class="param-item">
              <label>背景</label>
              <el-input v-model="params.searchBg" size="small" />
            </div>
            <div class="param-item">
              <label>文字色</label>
              <el-color-picker v-model="params.searchColor" size="small" />
            </div>
            <div class="param-item">
              <label>圆角</label>
              <el-slider v-model="params.searchRadius" :min="0" :max="30" :step="1" />
            </div>
          </div>

          <div class="param-group">
            <div class="param-group-title">暗色模式</div>
            <div class="param-item">
              <label>启用适配</label>
              <el-switch v-model="params.enableDarkMode" />
            </div>
            <div class="param-item" v-if="params.enableDarkMode">
              <label>卡片背景</label>
              <el-color-picker v-model="params.darkCardBg" size="small" />
            </div>
            <div class="param-item" v-if="params.enableDarkMode">
              <label>文字颜色</label>
              <el-color-picker v-model="params.darkTextColor" size="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'

interface ThemePreset {
  id: string
  name: string
  description: string
  preview: string
  params: ThemePackParams
}

interface ThemePackParams {
  themeName: string
  cardBg: string
  cardOpacity: number
  cardRadius: number
  cardShadow: number
  cardBorder: string
  cardBorderWidth: number
  cardBlur: number
  textColor: string
  titleColor: string
  groupTitleColor: string
  searchBg: string
  searchColor: string
  searchRadius: number
  searchBorder: string
  floatBtnColor: string
  clockColor: string
  logoColor: string
  enableDarkMode: boolean
  darkCardBg: string
  darkTextColor: string
}

const isDeployed = ref(false)
const deploying = ref(false)
const undeploying = ref(false)
const selectedTheme = ref('ios-light')
const themes = ref<ThemePreset[]>([])

const params = reactive<ThemePackParams>({
  themeName: 'ios-light',
  cardBg: '#ffffff',
  cardOpacity: 0.85,
  cardRadius: 16,
  cardShadow: 8,
  cardBorder: 'rgba(0,0,0,0.06)',
  cardBorderWidth: 0.5,
  cardBlur: 12,
  textColor: '#1d1d1f',
  titleColor: '#1d1d1f',
  groupTitleColor: '#86868b',
  searchBg: 'rgba(255,255,255,0.72)',
  searchColor: '#1d1d1f',
  searchRadius: 12,
  searchBorder: 'rgba(0,0,0,0.08)',
  floatBtnColor: 'rgba(0,0,0,0.35)',
  clockColor: '#1d1d1f',
  logoColor: '#1d1d1f',
  enableDarkMode: true,
  darkCardBg: '#1c1c1e',
  darkTextColor: '#f5f5f7'
})

// 获取预设主题列表
onMounted(async () => {
  try {
    // 加载主题列表
    const themesRes = await fetch('/api/css/theme-pack/themes')
    const themesData = await themesRes.json()
    if (themesData.success) {
      themes.value = themesData.themes
    }

    // 检查部署状态
    const deployRes = await fetch('/api/css/theme-pack/deployed')
    const deployData = await deployRes.json()
    isDeployed.value = deployData.deployed
  } catch (error) {
    console.error('初始化失败:', error)
  }
})

// 选择主题
const selectTheme = (theme: ThemePreset) => {
  selectedTheme.value = theme.id
  Object.assign(params, theme.params)
}

// 获取预览背景样式
const getPreviewStyle = (theme: ThemePreset) => {
  const p = theme.params
  const isDark = ['ios-dark', 'black-gold', 'cyberpunk'].includes(theme.id)
  return {
    background: isDark ? '#1a1a1a' : (theme.id === 'sakura-pink' ? '#fff0f5' : '#f5f5f7')
  }
}

// 获取预览卡片样式
const getCardStyle = (theme: ThemePreset) => {
  const p = theme.params
  return {
    background: p.cardBg,
    borderRadius: p.cardRadius * 0.4 + 'px',
    border: `${p.cardBorderWidth}px solid ${p.cardBorder}`,
    opacity: p.cardOpacity
  }
}

// 部署
const handleDeploy = async () => {
  deploying.value = true
  try {
    const res = await fetch('/api/css/theme-pack/deploy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })
    const data = await res.json()
    if (data.success) {
      isDeployed.value = true
      ElMessage.success('主题部署成功！刷新Sun-Panel即可看到效果')
    } else {
      ElMessage.error(data.error || '部署失败')
    }
  } catch (error) {
    ElMessage.error('部署失败')
  } finally {
    deploying.value = false
  }
}

// 取消部署
const handleUndeploy = async () => {
  undeploying.value = true
  try {
    const res = await fetch('/api/css/theme-pack/undeploy', { method: 'POST' })
    const data = await res.json()
    if (data.success) {
      isDeployed.value = false
      ElMessage.success('已取消主题部署')
    } else {
      ElMessage.error(data.error || '取消部署失败')
    }
  } catch (error) {
    ElMessage.error('取消部署失败')
  } finally {
    undeploying.value = false
  }
}
</script>

<style scoped>
.theme-detail {
  padding: 20px;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: hidden;
  background: var(--bg-base);
}

.detail-header {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  flex-shrink: 0;
}

.detail-header .title-section {
  flex: 1;
  min-width: 300px;
}

.detail-header h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0 0 8px;
}

.description {
  color: #606266;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
}

.action-buttons {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.detail-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* 主题画廊 */
.gallery-section,
.params-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.gallery-section h3,
.params-section h3 {
  margin: 0;
  padding: 12px 16px;
  font-size: 1rem;
  color: #2c3e50;
  border-bottom: 1px solid #ebeef5;
  flex-shrink: 0;
}

.theme-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
  overflow-y: auto;
}

.theme-card {
  border: 2px solid #ebeef5;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.theme-card:hover {
  border-color: #c0c4cc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.theme-card.active {
  border-color: #9333ea;
  box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.2);
}

.theme-preview {
  height: 80px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  width: 100%;
}

.p-card {
  height: 22px;
}

.theme-info {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px 2px;
}

.theme-emoji {
  font-size: 1rem;
}

.theme-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #2c3e50;
  flex: 1;
}

.theme-check {
  width: 18px;
  height: 18px;
  background: #9333ea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: bold;
}

.theme-desc {
  padding: 2px 10px 10px;
  margin: 0;
  font-size: 0.75rem;
  color: #909399;
  line-height: 1.3;
}

/* 参数微调 */
.params-scroll {
  overflow-y: auto;
  padding: 12px 16px;
}

.param-group {
  margin-bottom: 16px;
}

.param-group-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #606266;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px dashed #ebeef5;
}

.param-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.param-item label {
  font-size: 0.8rem;
  color: #909399;
  width: 60px;
  flex-shrink: 0;
}

.param-item .el-slider {
  flex: 1;
}

.param-item .el-input {
  flex: 1;
}

@media (max-width: 1200px) {
  .detail-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .theme-detail {
    padding: 16px;
    height: auto;
  }
  .detail-header {
    flex-direction: column;
  }
  .action-buttons {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
