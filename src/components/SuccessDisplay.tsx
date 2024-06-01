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
        <div>
          <h1>...Loading</h1>
        </div>
      ) : (
        <div>
          <h1>{date}</h1>
          <h3>{title}</h3>
          <img src={hdurl || url} alt="Picture of the day" />
          <p>{explanation}</p>
        </div>
      )}
    </>
  );
};
export default SuccessDisplay;
