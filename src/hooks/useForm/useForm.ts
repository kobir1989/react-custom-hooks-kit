import { useState } from 'react'

type GenericObject = Record<string, string | number | boolean>
type ChangeEventType = React.ChangeEvent<HTMLInputElement>
type SubmitEventType = React.FormEvent<HTMLFormElement>

// structure  useForm Return value
interface UseFormReturnTypes {
  onChangeHandler(_e: ChangeEventType): void
  onSubmitHandler(_e: SubmitEventType): void
  initialInputValue: GenericObject
  errors: GenericObject
}

/**
 * @useForm - custom hook
 * @param initialInputValue
 * @param submitCallback
 * @returns { onChangeHandler - function}
 * @returns { onSubmitHandler - function}
 * @returns { initialInputValue - object}
 * @returns { errors - object}
 */

export const useForm = (
  initialInputValue: GenericObject,
  submitCallback: (_values: GenericObject) => void,
  inputValidator: (_values: GenericObject) => GenericObject
): UseFormReturnTypes => {
  const [inputValues, setInitialInputValue] =
    useState<GenericObject>(initialInputValue)
  const [errors, setErrors] = useState<GenericObject>({})

  // onChange Handler
  const onChangeHandler = (e: ChangeEventType): void => {
    const { value, name } = e.target
    setInitialInputValue(prev => ({
      ...prev,
      [name]: value
    }))
    // remove error message when user starts typing.
    if (value !== '') {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // onSubmit Handler
  const onSubmitHandler = (e: SubmitEventType): void => {
    e.preventDefault()
    // validate input (check if valdate object has any key value)
    const validate = inputValidator(inputValues)
    if (Object.values(validate).length > 0) {
      setErrors(validate)
      return
    }
    // invoke submit callback if there is no error.
    submitCallback(inputValues)

    // reset inputValues state after successfull submit
    setInitialInputValue(initialInputValue)
  }

  return {
    onChangeHandler,
    onSubmitHandler,
    initialInputValue,
    errors
  }
}
