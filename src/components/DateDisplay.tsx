import { DownArrow } from "./Icons";
import { DateDisplayProps } from "../types";

const DateDisplay = (props: DateDisplayProps) => {
  const { getApod, setDay, url, day } = props;
  return (
    <div className="my-6">
      <form className="flex flex-col items-center justify-center space-y-3">
        <label
          htmlFor="dateSelector"
          className="font-normal flex flex-col items-center justify-center space-y-3 text-2xl"
        >
          Take A Peak Into The Past
          <DownArrow />
        </label>
        <input
          className="shadow-md py-1 px-3"
          type="date"
          id="dateSelector"
          min="1995-06-20"
          name="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <div className=" flex space-x-6">
          <button
            className="btn btn-set"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              getApod(url);
            }}
          >
            Set Date
          </button>
          <button
            className="btn btn-clear"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              setDay("");
              getApod(
                "https://api.nasa.gov/planetary/apod?api_key=" +
                  import.meta.env.VITE_API_KEY
              );
              // maybe should default to todays Apod after clear
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};
export default DateDisplay;
