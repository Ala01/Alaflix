import { useState } from 'react';

function UseForm(valoresIniciais){

    const [values, setValues] = useState(valoresIniciais);
    
    function setValue(chave, valor) {
      setValues({
        ...values,
        [chave]: valor, 
      })
    }
  
    function handleChange(infosDoEvento) {
      setValue(
        infosDoEvento.target.getAttribute('name'),
        infosDoEvento.target.value
      );
    }
  
    function clearForm(){
      setValue(valoresIniciais);
    }
  
    return {
      handleChange,
      values,
      clearForm,
    };
}

export default UseForm;