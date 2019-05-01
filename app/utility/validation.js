const validate = (val, rules, connectedValue) => {
    let isValid = true;
    for (let rule in rules) {
      switch (rule) {
        case "ismobileNumber":
          isValid = isValid && phoneNumberValidator(val);
          break;
        case "maxLength":
          isValid = isValid && maxLengthValidator(val, rules[rule]);
          break;
        case "notEmpty":
          isValid = isValid && notEmptyValidator(val);
          break;
        default:
          isValid = true;
      }
    }
    
    return isValid;
  };
  const phoneNumberValidator = val => {
    return /\+?(88)?0?1[56789][0-9]{8}\b/.test(val);
  };
  
  const maxLengthValidator = (val, maxLength) => {
      return val.length <= maxLength;
  };
    
  const notEmptyValidator = val => {
    return val.trim() !== "";
  };
  
  export default validate;