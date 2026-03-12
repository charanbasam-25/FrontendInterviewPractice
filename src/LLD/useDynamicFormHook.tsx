import { useState, useEffect } from "react";

function useDynamicFormHook(initialFeilds) {
  const [feilds, setFeilds] = useState(initialFeilds);
  const handleChange(index, e){
    let updatedFeilds=[...feilds];

    updatedFeilds[index][e.name]=e.value;
    setFeilds(updatedFeilds)
  }

  const addFeilds=()=>{
    const newFeilds=[...feilds, {name:"", age:"",email:""}]
    setFeilds(newFeilds)
  }

  const removeFeilds=(index)=>{
    const updatedFeilds= feilds.filter((_,i)=>{
        return i!==index;
    })
    setFeilds(updatedFeilds)
  }
  const resetFrom=()=>{
    setFeilds(initialFeilds);
  }

  return {
    feilds,
    handleChange,
    addFeilds,
    removeFeilds,
    resetFrom
  }
}

export default useDynamicFormHook;
