import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import ErrorDisplay from "./ErrorDisplay";
import SuccessDisplay from "./SuccessDisplay";
import DateDisplay from "./DateDisplay";
import GalleryDisplay from "./GalleryDisplay";
import { APOD } from "../types";

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
    getApod(url);
  }, []);

  return (
    <>
      <DateDisplay setDay={setDay} day={day} getApod={getApod} url={url} />
      <hr />
      <div className="my-4">
        {error ? (
          <>
            <ErrorDisplay message={error} setError={setError} />
            <div className=" flex justify-center items-center shadow-lg py-10">
              <h3 className="text-4xl font-normal">
                Try Again: Set A New Date{" "}
              </h3>
            </div>
          </>
        ) : (
          <SuccessDisplay isLoading={isLoading} {...data} />
        )}
      </div>

      <GalleryDisplay setData={setData} setDay={setDay} />
    </>
  );
};
export default MainDisplay;
