import React from "react";
import { CalendarModel } from "./model";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { SxProps } from "@mui/material";

const Calendar: React.FC<CalendarModel> = ({
  setData,
  displayData,
  message,
}) => {
  const popperSx: SxProps = {
    backgroundColor: "#fff",
    "& .MuiPaper-root": {
      backgroundColor: "#fff",
    },
    "& .MuiCalendarPicker-root": {
      backgroundColor: "#fff",
    },
  };

  const inputSx: SxProps = {
    fontFamily: '"Balsamiq Sans", cursive;',
    border: "solid 1px #fff",
    width: "160px",
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "yellow",
    },
    "&:hover": {
      backgroundColor: "#274540",
    },
    "& .MuiInputBase-root": {
      color: "#fff",
    },
    "& .MuiSvgIcon-root": {
      color: "#fff",
      width: "20px",
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="callendar-wrapper">
        <div>{message}</div>
        <DatePicker
          value={displayData}
          onChange={(newValue) => {
            // @ts-ignore
            setData(newValue);
          }}
          InputProps={{ sx: inputSx }}
          renderInput={(params) => (
            <TextField
              label={message}
              sx={{ input: { color: "#fff" } }}
              {...params}
            />
          )}
          PopperProps={{
            sx: popperSx,
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default Calendar;
