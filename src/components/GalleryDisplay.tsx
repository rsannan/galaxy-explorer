import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import ErrorDisplay from "./ErrorDisplay";
import Loader from "./Loader";
interface APOD {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}
const GalleryDisplay = () => {
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
    <div>
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
                    className="flex flex-col grow justify-center items-center shadow-lg p-2"
                  >
                    <img
                      src={item.url || item.hdurl}
                      className="h-32 w-48 mt-2"
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
