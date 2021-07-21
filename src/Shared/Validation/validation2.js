// const isEmail = (email) => {
//     const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (email.match(regEx)) return true;
//     else return false;
//   };
  
  const isEmpty = (string) => {
    if (string/*.trim()*/ === '') return true;
    else return false;
  };

  exports.ValidateSignupData = (data) => {
    let errors = {};
    console.log("in validate",data);
    // console.log(data.email);
    // if (isEmpty(data.email)) {
    //   errors.email = '*This field should not be empty!';
    // } 
    // else if(!isEmail(data.email) ) {
    //     errors.email = 'Must be a valid email address.';
    //   }

    
    if(isEmpty(data.first_name)) errors.first_name = '*This field should not be empty!';
    if(isEmpty(data.last_name)) errors.last_name = '*This field should not be empty!';
    if(isEmpty(data.user_name)) errors.user_name = '*This field should not be empty!';
    if(isEmpty(data.dob)) errors.dob = '*This field should not be empty!';
    if(isEmpty(data.gender)) errors.gender = '*This field should not be empty!';
    if(isEmpty(data.postalCode)) errors.postalCode = '*This field should not be empty!';
    if(isEmpty(data.area)) errors.area = '*This field should not be empty!';
    if(isEmpty(data.addressline)) errors.addressline = '*This field should not be empty!';
    if(isEmpty(data.vacancy)) errors.vacancy = '*This field should not be empty!';
    if(isEmpty(data.rent) || data.rent === 0) errors.rent = '*This field should not be empty!';
    if(isEmpty(data.profession)) errors.profession = '*This field should not be empty!';
    if(isEmpty(data.description)) errors.description = '*This field should not be empty!';

    //if (isEmpty(data.password)) errors.password = 'Must not be empty.';

    //if(data.password.length < 8) errors.password = 'Password must be atleast 8 characters long.';
    
    // if (data.password !== data.confirmPassword)
    //   errors.confirmPassword = 'Passwords must match';

    //if (isEmpty(data.handle)) errors.handle = 'Must not be empty.';

    if(data.MobileNumber.length !== 10)
        errors.MobileNumber = 'Mobile Number should be 10 digits only.';
  
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };
  
  // exports.validateLoginData = (data) => {
  //   let errors = {};
  
  //   if (isEmpty(data.email)) errors.email = 'Must not be empty';
  //   if (isEmpty(data.password)) errors.password = 'Must not be empty';
  
  //   return {
  //     errors,
  //     valid: Object.keys(errors).length === 0 ? true : false
  //   };
  // };
