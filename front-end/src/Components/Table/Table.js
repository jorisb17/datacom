import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    }
};

let id = 0;
function createData(time, temp) {
    id += 1;
    return { id, time, temp};
}

const data = [
    createData('0:00', 20),
    createData('0:20', 22),
    createData('0:25', 25),
    createData('0:40', 18),
    createData('0:54', 30),
    createData('1:40', 31),
    createData('1:50', 34)
];



function SimpleTable(props) {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Tijd</TableCell>
                        <TableCell align="left">Temperatuur</TableCell>
                        <TableCell align="left">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(n => (
                        <TableRow key={n.id}>
                            <TableCell component="th" scope="row">
                                {n.time}
                            </TableCell>
                            <TableCell align="left">{n.temp}</TableCell>
                            {n.temp > 30?
                                <TableCell align="left">Hoog</TableCell>
                                :
                                <TableCell align="left">Normaal</TableCell>
                            }

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default withStyles(styles)(SimpleTable);