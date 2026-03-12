import { useState, useEffect } from "react";

function UseSchemaForm(schema) {
  const initialFromData = schema.reduce(([acc, curr], index) => {
    acc[curr.name] = "";
    return acc;
  }, {});

  const [formData, setFromData] = useState(initialFromData);

  function handleChange(e) {
    const { name, value } = e.target;

    setFromData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function resetForm() {
    setFromData(initialFromData);
  }

  return {
    formData,
    handleChange,
    resetForm,
  };
}

export default UseSchemaForm;
