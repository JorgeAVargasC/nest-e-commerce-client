// logger.ts

enum LogLevel {
	LOG = 'LOG',
	ERROR = 'ERROR',
	WARN = 'WARN',
	DEBUG = 'DEBUG',
	VERBOSE = 'VERBOSE'
}

const getTimestamp = () => {
	const now = new Date()
	return now.toLocaleString('es-ES', {
		dateStyle: 'short',
		timeStyle: 'short',
		hour12: true
	})
}

const colorMap: Record<LogLevel, string> = {
	[LogLevel.LOG]:
		'background: #0ba84a; color: white; font-weight: bold; border-radius: 4px; padding: 2px 4px;',
	[LogLevel.ERROR]:
		'background: #ff3b4b; color: white; font-weight: bold; border-radius: 4px; padding: 2px 4px;',
	[LogLevel.WARN]:
		'background: #ff6105; color: white; font-weight: bold; border-radius: 4px; padding: 2px 4px;',
	[LogLevel.DEBUG]:
		'background: #13a3b5; color: white; font-weight: bold; border-radius: 4px; padding: 2px 4px;',
	[LogLevel.VERBOSE]:
		'background: #992bff; color: white; font-weight: bold; border-radius: 4px; padding: 2px 4px;'
}

// Métodos para registrar mensajes
class Logger {
	private formatMessage(text: string, level: LogLevel) {
		const timestamp = getTimestamp()
		return `[${level}] - ${timestamp} | ${text}`
	}

	log(text: string) {
		const message = this.formatMessage(text, LogLevel.LOG)
		console.log(`%c${message}`, colorMap[LogLevel.LOG])
	}

	error(text: string) {
		const message = this.formatMessage(text, LogLevel.ERROR)
		console.log(`%c${message}`, colorMap[LogLevel.ERROR])
	}

	warn(text: string) {
		const message = this.formatMessage(text, LogLevel.WARN)
		console.log(`%c${message}`, colorMap[LogLevel.WARN])
	}

	debug(text: string) {
		const message = this.formatMessage(text, LogLevel.DEBUG)
		console.log(`%c${message}`, colorMap[LogLevel.DEBUG])
	}

	verbose(text: string) {
		const message = this.formatMessage(text, LogLevel.VERBOSE)
		console.log(`%c${message}`, colorMap[LogLevel.VERBOSE])
	}
}

export const logger = new Logger()

logger.log('Log Init')
logger.error('Error Init')
logger.warn('Warn Init')
logger.debug('Debug Init')
logger.verbose('Verbose Init')
