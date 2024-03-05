// Mobile in in pixels
export const MOBILE_WIDTH: number = 800

// Order book rows
export const ORDERBOOK_LEVELS: number = 30

// BASE API URL
const url = import.meta.env.VITE_API_HOST
const port = import.meta.env.VITE_API_PORT
export const API_URL: string = `http://${url}:${port}`

// Check for ENV variables on boot, immediately throw error if not present
const checkEnv = (() => {
  if (!url || !port) {
    throw new Error("Missing required environment variables!")
  }
})()
