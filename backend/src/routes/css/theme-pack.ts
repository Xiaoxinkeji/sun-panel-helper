import { Router } from 'express'
import { deployThemePack, undeployThemePack, checkDeployed, getPresetThemes, getThemeById } from '../../../components/css/theme-pack/service'
import type { ThemePackParams } from '../../../components/css/theme-pack/types'

const router = Router()

// 获取所有预设主题
router.get('/themes', (req, res) => {
    try {
        const themes = getPresetThemes()
        res.json({ success: true, themes })
    } catch (error) {
        console.error('获取预设主题失败:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : '服务器错误'
        })
    }
})

// 获取指定预设主题
router.get('/themes/:id', (req, res) => {
    try {
        const theme = getThemeById(req.params.id)
        if (theme) {
            res.json({ success: true, theme })
        } else {
            res.status(404).json({ success: false, error: '主题不存在' })
        }
    } catch (error) {
        console.error('获取主题详情失败:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : '服务器错误'
        })
    }
})

// 部署主题包组件
router.post('/deploy', async (req, res) => {
    try {
        const params = req.body as ThemePackParams
        const result = await deployThemePack(params)

        if (result.success) {
            res.json(result)
        } else {
            res.status(400).json(result)
        }
    } catch (error) {
        console.error('部署主题包组件失败:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : '服务器错误'
        })
    }
})

// 取消部署主题包组件
router.post('/undeploy', async (req, res) => {
    try {
        const result = await undeployThemePack()

        if (result.success) {
            res.json(result)
        } else {
            res.status(400).json(result)
        }
    } catch (error) {
        console.error('取消部署主题包组件失败:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : '服务器错误'
        })
    }
})

// 检查组件是否已部署
router.get('/deployed', async (req, res) => {
    try {
        const deployed = await checkDeployed()
        res.json({ deployed })
    } catch (error) {
        console.error('检查组件部署状态失败:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : '服务器错误'
        })
    }
})

export default router
