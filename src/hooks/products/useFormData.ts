import { useState } from "react";

export const useFormData = (state: any) => {
  const [formData, setFormData] = useState(state);

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return { formData, setFormData, onChange };
};
