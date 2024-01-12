const endPoint = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const handleSendTokenToBackend = async (token: string) => {
  try {
    const response = await fetch(`${endPoint}/validateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      // additional options if needed
    });

    const data = await response.json();
    console.log("Data from backend:", data);
  } catch (error) {
    console.error("Error sending token to backend:", error);
  }
};
