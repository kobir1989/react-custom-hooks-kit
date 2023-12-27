import { useState } from 'react'

type GenericObject = Record<string, string | number | boolean>
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
    if (type === 'checked') {
      setFormInputs(prev => ({
        ...prev,
        [name]: checked
      }))
    } else if (type === 'radio') {
      if (checked) {
        setFormInputs(prev => ({
          ...prev,
          [name]: value
        }))
      }
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
