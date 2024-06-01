import axios from "axios";
import { useEffect, useState } from "react";

interface APOD {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

const MainDisplay = () => {
  const [day, setDay] = useState("today");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const getApod = async (url: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const url =
      "https://api.nasa.gov/planetary/apod?api_key=" +
      import.meta.env.VITE_API_KEY;
    getApod(url);
  }, [day]);
  const { date, title, hdurl, url, explanation } = data;
  return (
    <>
      {isLoading ? (
        <h1>...Loading</h1>
      ) : (
        <div>
          <h1>{date}</h1>
          <h3>{title}</h3>
          <img src={url} alt="Picture of the day" />
          <p>{explanation}</p>
        </div>
      )}
    </>
  );
};
export default MainDisplay;
