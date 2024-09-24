import { useEffect, useState } from 'react'
import { TbMoon, TbSun } from 'react-icons/tb'

type Theme = 'light' | 'dark'

export const useTheme = () => {
	const initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'

	const iconMap: Record<Theme, React.ReactNode> = {
		light: <TbSun size={18} />,
		dark: <TbMoon size={18} />
	}

	const labelMap: Record<Theme, string> = {
		light: 'Light',
		dark: 'Dark'
	}
	const handleLightTheme = () => setTheme('light')
	const handleDarkTheme = () => setTheme('dark')

	const functionsMap: Record<Theme, () => void> = {
		light: handleDarkTheme,
		dark: handleLightTheme
	}

	const [theme, setTheme] = useState<Theme>(initialTheme)

	useEffect(() => {
		setTheme(
			window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'
		)
	}, [])

	const handleToggleTheme = () => {
		functionsMap[theme]()
	}

	const icon = iconMap[theme]
	const label = labelMap[theme]

	return {
		theme,
		handleLightTheme,
		handleDarkTheme,
		handleToggleTheme,
		icon,
		label
	}
}
