const endPoint = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  
  export async function getEmail(email: string) {
    try {
      const response = await fetch(`${endPoint}/findAdmin?email=${email}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error checking admin:', error);
    }
  }

  // function getEmail(email: string) {
  //   return fetch(`${endPoint}/findAdmin?email=${email}`)
  //   .then(response => response.json())
  //   .then(result => {
  //     console.log("funcion then", result);
  //     return result;  // Return the result to the caller
  //   }).catch(error => {
  //     console.error('Error checking admin:', error);
  //     throw error;  // Rethrow the error for further handling if needed
  //   });
  // }