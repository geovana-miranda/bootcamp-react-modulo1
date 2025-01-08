import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IDespesas } from "../model/despesas";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  total: {
    display: "flex",
    justifyContent: "right",
    marginBottom: "1em",
    fontSize: "1.1em",
  }
});

interface ITableScreenProps {
  despesas: IDespesas[];
}

export function TableScreen(props: ITableScreenProps) {
  const { despesas } = props;
  const classes = useStyles();

  const totalDespesas = despesas
    .map((despesa) => despesa.valor)
    .reduce((acc, atual) => {
      return acc + atual;
    }, 0);

const formattedTotal = totalDespesas.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
})

  return (
    <>
      <div className={classes.total}>Total: <strong>{formattedTotal}</strong></div>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Despesas</TableCell>
              <TableCell align="right">Categorias</TableCell>
              <TableCell align="right">Dia</TableCell>
              <TableCell align="right">Valor&nbsp;(R$)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {despesas.map((despesa) => (
              <TableRow key={despesa.id}>
                <TableCell component="th" scope="row">
                  {despesa.descricao}
                </TableCell>
                <TableCell align="right">{despesa.categoria}</TableCell>
                <TableCell align="right">{despesa.dia}</TableCell>
                <TableCell align="right">{despesa.valor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
