// All types used in application

interface APOD {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}
interface DateDisplayProps {
  getApod: (url: string) => Promise<void>;
  setDay: React.Dispatch<React.SetStateAction<string>>;
  url: string;
  day: string;
}
interface Error {
  message: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}
interface Success {
  isLoading: boolean;
  date?: string;
  explanation?: string;
  hdurl?: string;
  title?: string;
  url?: string;
}
interface GalleryDisplayProps {
  setData: React.Dispatch<React.SetStateAction<APOD | undefined>>;
  setDay: React.Dispatch<React.SetStateAction<string>>;
}
export type { APOD, DateDisplayProps, Error, Success, GalleryDisplayProps };
