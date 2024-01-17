const endPoint = process.env.REACT_APP_API_URL || "http://localhost:8000";
export interface Category {
  _id: string;
  value: number;
  label: string;
}
 export interface Embedding {
  _id: string;
  input: string;
  title: string;
  score: number;
  categoies?: string[];
  solution?: string;
}
export const FetchCategories = async () => {
  try {
    const response = await fetch(`${endPoint}/getCategories`);
    const result: Array<Category> = await response.json();
    return result;
  } catch (error) {
    console.error("Error Fetching Categories:", error);
  }
};

export const FetchEmebeddingbyCategory = async (catid: string) => {
  try {
    console.log("catid", catid);
    const res = await fetch(`${endPoint}/fillterembeddings`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: catid,
      }),
    });
    const result: Array<Embedding> = await res.json();
    return result;
  } catch (error) {}
};
