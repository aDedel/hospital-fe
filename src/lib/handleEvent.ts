/**
 * Handle event
 */
export const handleEvent = <T>(
  event: Event,
  state: T,
  callback: (state: T, value: HTMLInputElement) => void,
) => {
  if (event.target instanceof HTMLInputElement) {
    callback(state, event.target)
  }
}
