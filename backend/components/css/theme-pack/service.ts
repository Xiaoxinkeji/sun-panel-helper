import { deploy, undeploy, isDeployed } from './deploy'
import { presetThemes, getPresetTheme } from './presets'
import type { ThemePackParams, ThemePreset } from './types'

/**
 * 将十六进制颜色转换为RGBA
 */
function hexToRGBA(hex: string, alpha: number): string {
    // 如果已经是rgba或rgb格式，直接调整透明度
    if (hex.startsWith('rgba(') || hex.startsWith('rgb(')) {
        const match = hex.match(/[\d.]+/g)
        if (match && match.length >= 3) {
            return `rgba(${match[0]},${match[1]},${match[2]},${alpha})`
        }
    }

    // 移除#符号
    hex = hex.replace('#', '')

    // 支持3位缩写
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('')
    }

    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    return `rgba(${r},${g},${b},${alpha})`
}

/**
 * 直接生成CSS内容（不使用模板文件，避免formatter破坏占位符）
 */
function generateCSS(params: ThemePackParams): string {
    // 计算衍生值
    const cardBgRGBA = hexToRGBA(params.cardBg, params.cardOpacity)
    const cardShadowY = Math.round(params.cardShadow * 0.4)
    const cardShadowBlur = params.cardShadow
    const cardShadowAlpha = (params.cardShadow / 100).toFixed(2)
    const cardShadowHoverY = Math.round(params.cardShadow * 0.8)
    const cardShadowHoverBlur = Math.round(params.cardShadow * 1.5)
    const cardShadowHoverAlpha = (params.cardShadow / 60).toFixed(2)

    let css = `/* ===== Sun-Panel 主题包 ===== */
/* 由 Sun-Panel-Helper 主题引擎生成 */

/* --- 卡片样式 (详情图标模式) --- */
.icon-info-box .rounded-2xl {
  background: ${cardBgRGBA} !important;
  border-radius: ${params.cardRadius}px !important;
  border: ${params.cardBorderWidth}px solid ${params.cardBorder} !important;
  box-shadow: 0 ${cardShadowY}px ${cardShadowBlur}px rgba(0,0,0,${cardShadowAlpha}) !important;
  backdrop-filter: blur(${params.cardBlur}px) !important;
  -webkit-backdrop-filter: blur(${params.cardBlur}px) !important;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) !important;
}

.icon-info-box .rounded-2xl:hover {
  box-shadow: 0 ${cardShadowHoverY}px ${cardShadowHoverBlur}px rgba(0,0,0,${cardShadowHoverAlpha}) !important;
  transform: translateY(-2px);
}

/* --- 卡片样式 (小图标模式) --- */
.icon-small-box .rounded-2xl {
  background: ${cardBgRGBA} !important;
  border-radius: ${params.cardRadius}px !important;
  border: ${params.cardBorderWidth}px solid ${params.cardBorder} !important;
  box-shadow: 0 ${cardShadowY}px ${cardShadowBlur}px rgba(0,0,0,${cardShadowAlpha}) !important;
  backdrop-filter: blur(${params.cardBlur}px) !important;
  -webkit-backdrop-filter: blur(${params.cardBlur}px) !important;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) !important;
}

.icon-small-box .rounded-2xl:hover {
  box-shadow: 0 ${cardShadowHoverY}px ${cardShadowHoverBlur}px rgba(0,0,0,${cardShadowHoverAlpha}) !important;
  transform: translateY(-2px);
}

/* --- 文字颜色 --- */
.icon-info-box .rounded-2xl,
.icon-info-box .rounded-2xl * {
  color: ${params.textColor} !important;
}

.icon-info-box .rounded-2xl .font-bold,
.icon-info-box .rounded-2xl .text-sm:first-child {
  color: ${params.titleColor} !important;
}

.icon-small-box .rounded-2xl,
.icon-small-box .rounded-2xl * {
  color: ${params.textColor} !important;
}

/* --- 分组标题 --- */
.sun-main .text-slate-400,
.sun-main .text-slate-500 {
  color: ${params.groupTitleColor} !important;
}

/* --- 搜索框 --- */
.sun-main .n-input,
.sun-main input[type="text"] {
  background: ${params.searchBg} !important;
  border-radius: ${params.searchRadius}px !important;
  border-color: ${params.searchBorder} !important;
  color: ${params.searchColor} !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
}

/* --- Logo与时钟 --- */
.sun-main .text-4xl,
.sun-main .text-3xl,
.sun-main .font-bold.text-white {
  color: ${params.logoColor} !important;
}

.sun-main .text-lg,
.sun-main .text-sm.text-white {
  color: ${params.clockColor} !important;
}

/* --- 悬浮按钮 --- */
.fixed-element .n-button {
  background-color: ${params.floatBtnColor} !important;
  border: none !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
}

/* --- 系统监控卡片 --- */
.sun-main .n-progress .n-progress-graph-line-fill {
  border-radius: 999px !important;
}

/* --- 滚动条美化 --- */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.15);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.25);
}`

    // 如果启用暗色模式适配，追加暗色样式
    if (params.enableDarkMode) {
        const darkCardBgRGBA = hexToRGBA(params.darkCardBg, params.cardOpacity)
        css += `

/* --- 暗色模式适配 --- */
html.dark .icon-info-box .rounded-2xl,
html.dark .icon-small-box .rounded-2xl {
  background: ${darkCardBgRGBA} !important;
  border-color: rgba(255,255,255,0.08) !important;
}

html.dark .icon-info-box .rounded-2xl,
html.dark .icon-info-box .rounded-2xl *,
html.dark .icon-small-box .rounded-2xl,
html.dark .icon-small-box .rounded-2xl * {
  color: ${params.darkTextColor} !important;
}

html.dark .sun-main .text-slate-400,
html.dark .sun-main .text-slate-500 {
  color: #98989d !important;
}

html.dark .sun-main .n-input,
html.dark .sun-main input[type="text"] {
  background: rgba(44,44,46,0.8) !important;
  border-color: rgba(255,255,255,0.1) !important;
  color: ${params.darkTextColor} !important;
}

html.dark .fixed-element .n-button {
  background-color: rgba(255,255,255,0.15) !important;
}

html.dark ::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.15);
}

html.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,0.25);
}`
    }

    return css
}

/**
 * 部署主题包组件
 * @param params 组件参数
 */
export async function deployThemePack(params: ThemePackParams): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
        // 1. 生成CSS
        const css = generateCSS(params)

        // 2. 部署CSS
        await deploy(css)

        return { success: true, message: '主题包部署成功' }
    } catch (error) {
        console.error('部署主题包组件失败:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : '主题包部署失败'
        }
    }
}

/**
 * 取消部署主题包组件
 */
export async function undeployThemePack(): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
        await undeploy()
        return { success: true, message: '主题包取消部署成功' }
    } catch (error) {
        console.error('取消部署主题包组件失败:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : '主题包取消部署失败'
        }
    }
}

/**
 * 检查组件是否已部署
 */
export async function checkDeployed(): Promise<boolean> {
    return await isDeployed()
}

/**
 * 获取所有预设主题列表
 */
export function getPresetThemes(): ThemePreset[] {
    return presetThemes
}

/**
 * 根据ID获取预设主题参数
 */
export function getThemeById(id: string): ThemePreset | undefined {
    return getPresetTheme(id)
}
