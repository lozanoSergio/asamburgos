import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
// core components
import tableStyle from "../../assets/jss/material-dashboard-react/components/tableStyle.jsx";

function CustomTable({ ...props }) {
  const {
    classes,
    tableHead,
    tableData,
    tableHeaderColor,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage
  } = props;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);
  return (
    <div>
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={
                        classes.tableCell + " " + classes.tableHeadCell
                      }
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((prop, key) => {
              return (
                <TableRow key={key}>
                  {prop.map((prop, key) => {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Anterior"
        }}
        nextIconButtonProps={{
          "aria-label": "Siguiente"
        }}
        labelRowsPerPage="Número de usuarios"
        labelDisplayedRows={({ from, to, count }) => `Mostrando ${from}-${to} de ${count}`}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any))
};

export default withStyles(tableStyle)(CustomTable);
