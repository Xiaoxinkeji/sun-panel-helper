export interface ThemePackParams {
  /** 主题名称 */
  themeName: string
  /** 卡片背景色 */
  cardBg: string
  /** 卡片背景透明度 */
  cardOpacity: number
  /** 卡片圆角 */
  cardRadius: number
  /** 卡片阴影强度 */
  cardShadow: number
  /** 卡片边框颜色 */
  cardBorder: string
  /** 卡片边框宽度 */
  cardBorderWidth: number
  /** 卡片毛玻璃效果 */
  cardBlur: number
  /** 文字颜色 */
  textColor: string
  /** 标题颜色 */
  titleColor: string
  /** 分组标题颜色 */
  groupTitleColor: string
  /** 搜索框背景 */
  searchBg: string
  /** 搜索框文字色 */
  searchColor: string
  /** 搜索框圆角 */
  searchRadius: number
  /** 搜索框边框色 */
  searchBorder: string
  /** 悬浮按钮颜色 */
  floatBtnColor: string
  /** 时钟文字颜色 */
  clockColor: string
  /** Logo文字颜色 */
  logoColor: string
  /** 是否启用暗色模式适配 */
  enableDarkMode: boolean
  /** 暗色模式卡片背景 */
  darkCardBg: string
  /** 暗色模式文字颜色 */
  darkTextColor: string
}

export interface ThemePreset {
  id: string
  name: string
  description: string
  preview: string
  params: ThemePackParams
}
