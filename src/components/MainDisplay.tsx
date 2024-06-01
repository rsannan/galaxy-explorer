import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import ErrorDisplay from "./ErrorDisplay";
import SuccessDisplay from "./SuccessDisplay";
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
  const getApod = async (url: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);

        const err = error?.response?.data.msg;
        setError(err);
      }
    }
  };

  useEffect(() => {
    const url =
      "https://api.nasa.gov/planetary/apod?api_key=" +
      import.meta.env.VITE_API_KEY +
      (day && "&date=" + day);
    console.log(url);

    // getApod(url);
  }, [day]);

  return (
    <>
      <div>
        <form>
          <label htmlFor="dateSelector"> Choose A Custom Date</label>
          <input
            type="date"
            id="dateSelector"
            min="1995-06-20"
            name="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          <button
            role="button"
            onClick={() => {
              setDay("");
            }}
          >
            {" "}
            Clear
          </button>
        </form>
      </div>
      {error && <ErrorDisplay message={error} setError={setError} />}{" "}
      <SuccessDisplay isLoading={isLoading} {...data} />
    </>
  );
};
export default MainDisplay;
