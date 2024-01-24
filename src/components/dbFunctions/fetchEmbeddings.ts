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
