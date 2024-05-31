import axios from "axios";
import { getPost } from "../utilities";
import { useEffect, useState } from "react";

const MainDisplay = () => {
  const [day, setDay] = useState("today");
  const [isLoading, setIsLoading] = useState(false);
  const getApod = async (url: string) => {
    try {
      const response = await axios.get(url);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const url =
      "https://api.nasa.gov/planetary/apod?api_key=" +
      import.meta.env.VITE_API_KEY;
    //   getPost(url);
  }, [day]);

  return <>{isLoading ? <h1>...Loading</h1> : <h1>{day}</h1>}</>;
};
export default MainDisplay;
