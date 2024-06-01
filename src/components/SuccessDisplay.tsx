import Loader from "./Loader";

interface Success {
  isLoading: boolean;
  date?: string;
  explanation?: string;
  hdurl?: string;
  title?: string;
  url?: string;
}

const SuccessDisplay = (props: Success) => {
  const { date, title, hdurl, url, explanation, isLoading } = props;
  return (
    <>
      {isLoading ? (
        <div className="my-32">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="font-light">Current Apod Date: {date}</h1>
          <h3 className="font-light">{title}</h3>
          <img src={hdurl || url} alt="Picture of the day" />
          <div className="shadow-md text-left font-light p-4 leading-8">
            <p>{explanation}</p>
          </div>
        </div>
      )}
    </>
  );
};
export default SuccessDisplay;
