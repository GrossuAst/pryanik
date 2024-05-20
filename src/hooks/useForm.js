import { useState, useCallback } from "react";

export function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
  
    const handleChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      setValues({...values, [name]: value});
      setErrors({...errors, [name]: target.validationMessage });
      setIsValid(target.closest("form").checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
          setValues(newValues);
          setErrors(newErrors);
          setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );
  
    return {values, handleChange, setValues, errors, setErrors, resetForm, isValid};
};