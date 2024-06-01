import Alert from "@mui/material/Alert";
import { Dispatch, SetStateAction } from "react";
interface Error {
  message: string;
  setError: Dispatch<SetStateAction<string | null>>;
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
