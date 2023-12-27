import { useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericObject = Record<string, any>
type ChangeEventType = React.ChangeEvent<HTMLInputElement>
type SubmitEventType = React.FormEvent<HTMLFormElement>

// structure  useForm Return value
interface UseFormReturnTypes {
  onChangeHandler(_e: ChangeEventType): void
  onSubmitHandler(_e: SubmitEventType): void
  formInputs: GenericObject
  errors: GenericObject
}

/**
 * @useForm - custom hook
 * @param initialInputValue
 * @param submitCallback
 * @returns { onChangeHandler - function}
 * @returns { onSubmitHandler - function}
 * @returns { formInputs - object}
 * @returns { errors - object}
 */

export const useForm = (
  initialInputValue: GenericObject,
  submitCallback: (_values: GenericObject) => void,
  inputValidator: (_values: GenericObject) => GenericObject
): UseFormReturnTypes => {
  const [formInputs, setFormInputs] = useState<GenericObject>(initialInputValue)
  const [errors, setErrors] = useState<GenericObject>({})

  // onChange Handler
  const onChangeHandler = (e: ChangeEventType): void => {
    const { value, name, type, checked } = e.target
    if (type === 'checkbox') {
      setFormInputs(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      setFormInputs(prev => ({
        ...prev,
        [name]: value
      }))
    }

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
    const validate = inputValidator(formInputs)
    if (Object.values(validate).length > 0) {
      setErrors(validate)
      return
    }
    // invoke submit callback if there is no error.
    submitCallback(formInputs)

    // reset inputValues state after successfull submit
    setFormInputs(initialInputValue)
  }

  return {
    onChangeHandler,
    onSubmitHandler,
    formInputs,
    errors
  }
}
