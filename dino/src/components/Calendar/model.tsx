import { Dayjs } from "dayjs";

export interface CalendarModel {
    setData: React.Dispatch<React.SetStateAction<Dayjs | null>>;
    displayData: Dayjs | null;
    message: string;
}