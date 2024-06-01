import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import ErrorDisplay from "./ErrorDisplay";
import SuccessDisplay from "./SuccessDisplay";
import DateDisplay from "./DateDisplay";
import GalleryDisplay from "./GalleryDisplay";
interface APOD {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}
const MainDisplay = () => {
  const [day, setDay] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<APOD | undefined>();
  const [error, setError] = useState<string | null>(null);
  const url =
    "https://api.nasa.gov/planetary/apod?api_key=" +
    import.meta.env.VITE_API_KEY +
    (day && "&date=" + day);
  const getApod = async (url: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        const err = error?.response?.data.msg;
        setError(err);
      }
    }
  };

  useEffect(() => {
    // getApod(url);
  }, []);

  return (
    <>
      <DateDisplay setDay={setDay} day={day} getApod={getApod} url={url} />
      <hr />
      {error ? (
        <>
          <ErrorDisplay message={error} setError={setError} />
          <div className="">
            <h3>Try Again: Set A New Date </h3>
          </div>
        </>
      ) : (
        <SuccessDisplay isLoading={isLoading} {...data} />
      )}

      <GalleryDisplay />
    </>
  );
};
export default MainDisplay;
