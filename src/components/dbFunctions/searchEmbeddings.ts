const endPoint = process.env.REACT_APP_API_URL || "http://localhost:8000";
export const handleTestEmbeddings = (document: string) => {
  const token = localStorage.getItem("token");

  // Perform a POST request to the 'testEmbedding' endpoint using the fetch API
  const search = fetch(`${endPoint}/testEmbedding`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      keyword: document,
    }),
  }).then(async (res) => {
    // Handle the response from the server
    const data = await res.json();
    return data;
  });
  return search;
};
