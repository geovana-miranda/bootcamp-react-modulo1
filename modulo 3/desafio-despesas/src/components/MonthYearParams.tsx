import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    })
  );

  interface IMonthYearParamsProps {
    months: string[];
    years: number[];
    month: string;
    year: number;
    monthOnChange: (value: string) => void;
    yearOnChange: (value: number) => void;
  }

export function MonthYearParams(props: IMonthYearParamsProps) {
    const {months, years, month, year, monthOnChange, yearOnChange} = props;

    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {

      if (typeof event.target.value === "string") {
        monthOnChange(event.target.value);
      } else if (typeof event.target.value === "number") {
        yearOnChange(event.target.value);
      } 
    };

    return (
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Mês
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="month"
              value={month}
              onChange={handleChange}
              displayEmpty
              className={classes.selectEmpty}
            >
              {months.map((month: string) => {
                return (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Ano
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="year"
              value={year}
              onChange={handleChange}
              displayEmpty
              className={classes.selectEmpty}
            >
              {years.map((year: number) => {
                return (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      );
}