import { useState } from "react";

function useInput(defaultVal = "") {
  const [value, setValue] = useState(defaultVal)
  function handleChange({ target }) {
    setValue(target.value)
  }
  return [value, handleChange, setValue]
}
export default useInput