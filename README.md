# react-custom-hooks-kit

![npm version](https://img.shields.io/badge/npm-v1.0.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Downloads](https://img.shields.io/npm/dt/react-custom-hooks-kit)
![GitHub stars](https://img.shields.io/github/stars/kobir1989/react-custom-hooks-kit)
![GitHub forks](https://img.shields.io/github/forks/kobir1989/react-custom-hooks-kit)
![GitHub issues](https://img.shields.io/github/issues/kobir1989/react-custom-hooks-kit)
![GitHub pull requests](https://img.shields.io/github/issues-pr/kobir1989/react-custom-hooks-kit)
![Maintenance](https://img.shields.io/maintenance/yes/2024)

### Modern, type-safe React hooks library. Simplify your development with reusable hooks designed to enhance productivity. Explore the documentation for easy-to-use guides and examples.

## Installation and Usage

### Install:

#### npm

```shell
npm install react-custom-hooks-kit
```
#### Yarn

```shell
yarn add react-custom-hooks-kit
```

<div id="table-of-contents"></div>

### Table of Contents

| No. | Hooks                                                   |
| --- | ------------------------------------------------------- |
|     |                                                         |
| 1   | **[useFetch](#usefetch)**                               |
| 2   | **[useLocalStorage](#useLocalStorage)**                 |
| 3   | **[useToggle](#useToggle)**                             |
| 4   | **[useForm](#useForm)**                                 |
| 5   | **[useScroll](#useScroll)**                             |
| 6   | **[useMediaQuery](#useMediaQuery)**                     |
| 7   | **[useMousePosition](#useMousePosition)**               |
| 8   | **[useWindowSize](#useWindowSize)**                     |
| 9   | **[useClickAway](#useClickAway)**                       |
| 10  | **[useCountDown](#useCountDown)**                       |
| 11  | **[useIntersectionObserver](#useIntersectionObserver)** |

1. ## useFetch
<div id="useFetch"></div>

`useFetch` custom React hook designed to efficiently fetch and cache data based on a provided URL. It manages state for loading, error handling, and data retrieval, ensuring a seamless data-fetching experience.

### PARAMETERS

| Name | Type   | Description                               |
| ---- | ------ | ----------------------------------------- |
| url  | string | The URL from which data is to be fetched. |

### RETURNS

| Name      | Type    | Description                                                   |
| --------- | ------- | ------------------------------------------------------------- |
| data      | T[]     | The response data fetched from the provided URL.              |
| error     | object  | Represents any error encountered during data fetching.        |
| isLoading | boolean | Loading State                                                 |
| isError   | boolean | Indicates whether an error occurred during the data fetching. |

### Example Code:

```javascript
import { useFetch } from 'react-custom-hooks-kit'

const Component = () => {
  const { data, isLoading, error, isError } = useFetch(
    'https://api.example.com/data'
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error occurred: {error?.message}</div>
  }

  return (
    <div>
      {data.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  )
}
```

2. ## useLocalStorage
<div id="useLocalStorage"></div>

`useLocalStorage` custom React hook that facilitates storing, retrieving, and synchronizing data with the browser's localStorage API.

### PARAMETERS

| Name         | Type   | Description                                                   |
| ------------ | ------ | ------------------------------------------------------------- |
| key          | string | The key under which the value will be stored in localStorage. |
| initialValue | T      | The initial value to be stored in localStorage.               |

### RETURNS

| Name          | Type     | Description                                                      |
| ------------- | -------- | ---------------------------------------------------------------- |
| savedValue    | T        | The current state of the value stored in local storage.          |
| setSavedValue | function | A function to set the state of the stored value in localStorage. |

### Example Code:

```javascript
import { useLocalStorage } from 'react-custom-hooks-kit'

const Component = () => {
  const [savedValue, setSavedValue] = useLocalStorage('myKey', 'defaultValue')

  const handleInputChange = e => {
    setSavedValue(e.target.value)
  }

  return (
    <div>
      <input type='text' value={savedValue} onChange={handleInputChange} />
    </div>
  )
}
```

3. ## useToggle
<div id="useToggle"></div>
`useToggle` custom React hook usefull for managing boolean state toggling. This hook simplifies the process of toggling between true and false values by providing an easy-to-use interface with a state value and a function for toggling the state.

### PARAMETERS

| Name         | Type    | Description                                                                                                   |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------- |
| initialValue | boolean | Default value set to false. Change this parameter to the desired boolean value if different from the default. |

### RETURNS

| Name     | Type     | Description                        |
| -------- | -------- | ---------------------------------- |
| isOn     | boolean  | Current state                      |
| onToggle | function | Function to toggle between states. |

### Example Code:

```javascript
import { useToggle } from 'react-custom-hooks-kit'

const ToggleButton = () => {
  const [isOn, toggle] = useToggle(false)

  return (
    <div>
      <button onClick={toggle}>{isOn ? 'ON' : 'OFF'}</button>
      <p>Toggle state: {isOn ? 'ON' : 'OFF'}</p>
    </div>
  )
}
```

4. ### useForm
<div id="useForm"></div>
`useForm` custom React hook usefull for effortlessly managing form state, handling input changes, and form submissions. This hook provides handlers for `onChange` and `onSubmit` events, enabling seamless form interactions. It includes features for input validation and error handling.

### PARAMETERS

| Name              | Type               | Description                                                                                               |
| ----------------- | ------------------ | --------------------------------------------------------------------------------------------------------- |
| initialInputValue | object             | initial state.                                                                                            |
| submitCallback    | function           | Callback function that receives the form input value for further processing or backend interaction.       |
| inputValidator    | validator function | Callback function to validate each input field and return an object containing validation error messages. |

### RETURNS

| Name            | Type     | Description                                                                                               |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| onChangeHandler | function | Function to handle input changes within the form.                                                         |
| onSubmitHandler | function | Function to handle form submissions.                                                                      |
| formInputs      | object   | Object containing form input values that correspond to their respective field names.                      |
| errors          | object   | Object containing validation error messages corresponding to the fields validated through inputValidator. |

### Example Code:

```javascript
import { useForm } from 'react-custom-hooks-kit'

const initialState = {
  email: '',
  password: ''
}

const validator = inputValue => {
  const error = {}
  if (inputValue.password && inputValue.password.length < 6) {
    error.password = 'Password should be more than 6 characters.'
  }
  // ... add other validations
  return error
}

const Form = () => {
  const sendFormData = inputValue => {
    console.log(inputValue)
    // ... process data further
  }

  const { onChangeHandler, onSubmitHandler, formInputs, errors } = useForm(
    initialState,
    sendFormData,
    validator
  )

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        value={formInputs.email}
        type='email'
        name='email'
        onChange={onChangeHandler}
      />
      <input
        value={formInputs.password}
        type='password'
        name='password'
        onChange={onChangeHandler}
      />
      <button type='submit'>Submit</button>
    </form>
  )
}
```

5. ## useScroll
<div id="useScroll"></div>
`useScroll` custom React hook usefull for track and manage the scroll position within application. `useScroll` monitors scroll events, providing real-time updates on the current scroll position. By utilizing useState and useEffect, it offers a simple and effective way to keep track of scrolling activities.

### RETURNS

| Name            | Type   | Description             |
| --------------- | ------ | ----------------------- |
| currentPosition | number | Current scroll position |

### Example Code:

```javascript
import { useScroll } from 'react-custom-hooks-kit'

const Component = () => {
  const { currentPosition } = useScroll()

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <h2 style={{ position: 'fixed', top: '0', left: '0' }}>
        Current Scroll: {currentPosition}
      </h2>
    </div>
  )
}
```

6. ## useMediaQuery
<div id="useMediaQuery"></div>
`useMediaQuery` custom React hook that dynamically responds to changes in the viewport based on specified media queries. This hook efficiently tracks viewport adjustments, providing a boolean value to reflect whether the current viewport matches the provided query.

### PARAMETERS

| Name  | Type   | Description                                                                |
| ----- | ------ | -------------------------------------------------------------------------- |
| query | string | A string representing the media query to be tested. Ex: 'max-width: 768px' |

### RETURNS

| Name    | Type    | Description                                                |
| ------- | ------- | ---------------------------------------------------------- |
| matches | boolean | Represents whether the current viewport matches the query. |

### Example Code:

```javascript
import { useMediaQuery } from 'react-custom-hooks-kit'

const Component = () => {
  const isMobile = useMediaQuery('(max-width: 568px)')
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')

  return (
    <div>
      <p>Is Mobile? {isMobile ? 'Yes' : 'No'}</p>
      <p>Is Tablet? {isTablet ? 'Yes' : 'No'}</p>
      <p>Is Desktop? {isDesktop ? 'Yes' : 'No'}</p>
    </div>
  )
}
```

7. ## useMousePosition
<div id="useMousePosition"></div>
`useMousePosition` custom React hook designed to provide real-time tracking of the mouse position within a specified HTML element. This hook returns the current mouse coordinates (x and y), allowing for dynamic interactions based on mouse movements.

### PARAMETERS

| Name | Type                          | Description                           |
| ---- | ----------------------------- | ------------------------------------- |
| ref  | MutableRefObject<HTMLElement> | Reference to the target HTML element. |

### RETURNS

| Name                 | Type                                           | Description                                                   |
| -------------------- | ---------------------------------------------- | ------------------------------------------------------------- |
| currentMousePosition | MousePosition object: { x: number, y: number } | Represents the current mouse coordinates (x and y positions). |

### Example Code:

```javascript
import { useMousePosition } from 'react-custom-hooks-kit'
import { useRef } from 'react'

const Component = () => {
  const elementRef = useRef(null)
  const mouse = useMousePosition(elementRef)

  return (
    <section
      ref={elementRef}
      style={{ width: '100%', height: '400px', backgroundColor: 'lightgray' }}
    >
      <p>
        X: {mouse.x}, Y: {mouse.y}
      </p>
    </section>
  )
}
```

8. ## useWindowSize
<div id="useWindowSize"></div>
`useWindowSize` custom React hook usefull for tracking and retrieving the dimensions of the browser window. This hook returns the current width and height of the window, enabling dynamic responsiveness to changes in the viewport size.

### RETURNS

| Name   | Type   | Description                                          |
| ------ | ------ | ---------------------------------------------------- |
| width  | number | Represents the current width of the browser window.  |
| height | number | Represents the current height of the browser window. |

### Example Code:

```javascript
import { useWindowSize } from 'react-custom-hooks-kit'

const WindowSizeComponent = () => {
  const { width, height } = useWindowSize()

  return (
    <div>
      <p>Window Width: {width}px</p>
      <p>Window Height: {height}px</p>
    </div>
  )
}
```

9. ## useClickAway
<div id="useClickAway"></div>
`useClickAway` custom React hook designed to detect clicks outside of a specified HTML element. This hook facilitates the monitoring of clicks beyond the targeted element, triggering a callback when such clicks occur. It provides functions to enable and disable click-away detection, allowing for dynamic control over the click detection behavior.

### PARAMETERS

| Name        | Type             | Description                                                               |
| ----------- | ---------------- | ------------------------------------------------------------------------- |
| ref         | MutableRefObject | Reference to the target HTML element.                                     |
| onClickAway | function         | Callback function triggered when a click is detected outside the element. |

### RETURNS

| Name    | Type     | Description                       |
| ------- | -------- | --------------------------------- |
| enable  | function | Enables the click-away listener.  |
| disable | function | Disables the click-away listener. |

### Example Code:

```javascript
import { useClickAway } from 'react-custom-hooks-kit'

const Component = () => {
  const clickRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleClickAway = () => {
    setIsOpen(false)
  }
  const { enable, disable } = useClickAway(clickRef, handleClickAway)

  return (
    <section ref={clickRef}>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && (
        <div>
          <div>
            <button onClick={enable}>Enable</button>
            <button onClick={disable}>Disable</button>
          </div>
          <h2>Modal</h2>
        </div>
      )}
    </section>
  )
}
```

10. ## useCountDown
<div id="useCountDown"></div>
`useCountDown` custom React hook designed to implement a countdown timer functionality. This hook initializes a countdown from a specified count value and updates the count at a defined delay interval. It returns the current count value.

### PARAMETERS

| Name  | Type   | Description                                        |
| ----- | ------ | -------------------------------------------------- |
| count | number | The initial count value for the countdown.         |
| delay | number | The delay (in milliseconds) between count updates. |

### RETURNS

| Name         | Type   | Description                                          |
| ------------ | ------ | ---------------------------------------------------- |
| currentCount | number | Represents the current count value of the countdown. |

### Example Code:

```javascript
import { useCountDown } from 'react-custom-hooks-kit'

const Component = () => {
  const countDown = useCountDown(10, 200) // Start countdown from 10 with a delay of 200 ms.

  return (
    <div>
      <p>Countdown: {countDown}</p>
    </div>
  )
}
```

11. ## useIntersectionObserver
<div id="useIntersectionObserver"></div>

`useIntersectionObserver` custom Hook that determines if a component is visible on your screen. It relies on the IntersectionObserver API, which is already available in your browser. This hook comes in handy for tasks such as loading images when they come into view, creating endless scrolling on pages, or triggering animations.

### PARAMETERS

| Name                    | Type                         | Description                                                     |
| ----------------------- | ---------------------------- | --------------------------------------------------------------- |
| ref                     | MutableRefObject             | Reference to the observed HTML element.                         |
| options                 | object                       | Intersection Observer configuration options.                    |
| options.threshold       | number (\*default 0.3)       | The ratio of intersection needed to trigger the callback.       |
| options.root            | HTMLElement (\*default null) | The element used as the viewport for checking intersection.     |
| options.rootMargin      | string (\*default "0%")      | Margin around the root element to adjust the intersection area. |
| options.stopOnceVisible | boolean (\*default false)    | Stops observing once the element becomes visible.               |

### RETURNS

| Name              | Type                              | Description                                                  |
| ----------------- | --------------------------------- | ------------------------------------------------------------ |
| intersectionEntry | IntersectionObserverEntry \| null | Represents the intersection details of the observed element. |

### Example Code:

```javascript

import { useIntersectionObserver } from react-custom-hooks-kit';
import React, { useRef } from 'react';

const IntersectionComponent = () => {
  const targetRef = useRef(null);
  const intersectionEntry = useIntersectionObserver(targetRef, {
    threshold: 0.5,
    root: null,
    rootMargin: '0%',
    stopOnceVisible: true
  });

  const isVisible = intersectionEntry?.isIntersecting;

  return (
    <div>
      <div
        ref={targetRef}
        style={{
          height: '200px',
          backgroundColor: isVisible ? 'yellow' : 'gray'
        }}
      >
        {isVisible ? 'Element visible!' : 'Scroll to see me!'}
      </div>
    </div>
  );
};


const Component = () => {
  return (
    <main>
      {Array.from({ length: 5 }).map((_, index) => (
        <IntersectionComponent key={index + 1} />
      ))}
    </main>
  )
}

```

**[⬆ Back to Top](#table-of-contents)**
