import { useState } from 'react'

// Return type of the hook
type UseToggleReturnType = [boolean, () => void]

/**
 * @useToggle
 * @param initialValue -boolen
 * @returns {isOn} - boolean
 * @returns {onToggle} - function
 */
export const useToggle = (
  initialValue: boolean = false
): UseToggleReturnType => {
  const [isOn, setIsOn] = useState(initialValue)

  const onToggle = () => setIsOn(prev => !prev)

  return [isOn, onToggle]
}
