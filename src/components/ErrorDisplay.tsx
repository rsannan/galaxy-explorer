import Alert from "@mui/material/Alert";

interface Error {
  message: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}
const ErrorDisplay = (props: Error) => {
  const { message, setError } = props;
  return (
    <Alert variant="outlined" severity="error" onClose={() => setError(null)}>
      <h3>{message}</h3>
    </Alert>
  );
};
export default ErrorDisplay;
