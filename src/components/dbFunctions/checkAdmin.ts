const endPoint = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  
  export const getArticles=(email: string)=>{
      const articles = fetch(`${endPoint}/findAdmin?email=${email}`).then(async (res)=>{
      const data: boolean = await res.json();
      return data;
    });
    return articles;
  }
  