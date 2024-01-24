const endPoint = process.env.REACT_APP_API_URL || "http://localhost:8000";
// export const handleTestEmbeddings = (document: string) => {
//   const token = localStorage.getItem("token");

//   // Perform a POST request to the 'testEmbedding' endpoint using the fetch API
//   const search = fetch(`${endPoint}/testEmbedding`, {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + token,
//     },
//     body: JSON.stringify({
//       keyword: document,
//     }),
//   }).then(async (res) => {
//     // Handle the response from the server
//     const data = await res.json();
//     return data;
//   });
//   return search;
// };
export const handleTestEmbeddings = async (document: string) => {
  try {
    const token = localStorage.getItem("token");

    // Perform a POST request to the 'testEmbedding' endpoint using the fetch API
    const search = await fetch(`${endPoint}/testEmbedding`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        keyword: document,
      }),
    });

    // Check if the response status is ok
    if (!search.ok) {
      // If the response is not ok, throw an error with the status text
      throw new Error(`Error: ${search.status} - ${search.statusText}`);
    }

    // Handle the response from the server
    const data = await search.json();
    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch or processing of the response
    console.error("An error occurred:", error);
    // You can choose to throw the error again or return a default value or handle it in another way
    throw error;
  }
};
