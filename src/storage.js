export function readProgress(key) {
  try {
    const savedIndex = Number.parseInt(window.localStorage.getItem(key), 10)
    return Number.isNaN(savedIndex) ? 0 : savedIndex
  } catch {
    return 0
  }
}

export function writeProgress(key, index) {
  try {
    window.localStorage.setItem(key, String(index))
    return true
  } catch {
    return false
  }
}
