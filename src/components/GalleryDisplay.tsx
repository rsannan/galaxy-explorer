import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import ErrorDisplay from "./ErrorDisplay";
import Loader from "./Loader";
import { APOD, GalleryDisplayProps } from "../types";
import { DownArrow } from "./Icons";

const GalleryDisplay = (props: GalleryDisplayProps) => {
  const { setData, setDay } = props;
  const [itemData, setItemData] = useState<APOD[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const url =
    "https://api.nasa.gov/planetary/apod?api_key=" +
    import.meta.env.VITE_API_KEY +
    "&count=10";
  const getApods = async (url: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setItemData(response.data);
      setIsLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        const err = error?.response?.data.msg;
        setError(err);
      }
    }
  };
  useEffect(() => {
    getApods(url);
  }, []);
  return (
    <div className="mt-10">
      <div className=" flex flex-col justify-center items-center space-y-2 font-light shadow-md">
        <h3>Have A Look At Other Interesting Apod's</h3>
        <p>Click Any Of The Images Below To Learn More</p>
        <DownArrow />
      </div>
      <hr />
      {error ? (
        <ErrorDisplay message={error} setError={setError} />
      ) : (
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex space-x-0.5 space-y-1 flex-wrap">
              {itemData.map((item) => {
                return (
                  <div
                    key={item.title}
                    className="flex flex-col grow justify-center items-center shadow-lg p-2  "
                    onClick={() => {
                      setData(item);
                      setDay("");
                    }}
                  >
                    <img
                      src={item.url || item.hdurl}
                      className="h-32 w-48 mt-2 transition hover:scale-110 hover:delay-200"
                      alt="Picture of Apod"
                    />
                    <p className="font-thin p-2">{item.title}</p>
                  </div>
                );
              })}
            </div>
          )}
          ;
        </div>
      )}
    </div>
  );
};
export default GalleryDisplay;
