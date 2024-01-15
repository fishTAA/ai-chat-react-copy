const endPoint = process.env.REACT_APP_API_URL || "http://localhost:8000";
export interface Category {
  _id: string;
  value: number;
  label: string;
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
