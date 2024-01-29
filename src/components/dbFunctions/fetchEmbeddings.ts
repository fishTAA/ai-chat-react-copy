const endPoint = process.env.REACT_APP_API_URL || "http://localhost:8000";

interface Embeddings {
  _id: string;
  input: string;
  title: string;
  score: number;
  solution?: string;
}
export const FetchEmbeddingsCollection = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${endPoint}/embeddingCollection`, {
      headers: { Authorization: "Bearer " + token },
    });
    const result: Array<Embeddings> = await response.json();
    return result;
  } catch (error) {
    console.error("Error Fetching Categories:", error);
  }
};

export const FetchDeleteEmbedding = async (embeddingid: string) => {
  try {
    const token = localStorage.getItem("token");

    console.log("deleting", embeddingid);
    const res = await fetch(`${endPoint}/deleteEmbedding/${embeddingid}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
