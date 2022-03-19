import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { findDataForRegionGroupedByZone } from '../adapters/admin';

const columns = [
    { id: 'zone', label: 'zone', minWidth: 170 },
    { id: 'person', label: 'person', minWidth: 170 },
    { id: 'bullet', label: 'Bullet #', minWidth: 100 },
    { id: 'AK 47', label: 'AK 47', minWidth: 100 },
    { id: 'Brail', label: 'Brail', minWidth: 100 },
    { id: 'Dishka', label: 'Dishka', minWidth: 100 },
    { id: 'Abraraw', label: 'Abraraw', minWidth: 100 },
    { id: 'Guande', label: 'Guande', minWidth: 100 },
];


export default function TableForRegionData() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [loading, setLoading] = useState(true);
    const [regionDataGroupedByZone, setRegionDataGroupedByZone] = useState([]);


    useEffect(async () => {
        if (loading) {
            console.log("It should call the api")
            setLoading(false)
            await findDataForRegionGroupedByZone(setRegionDataGroupedByZone)
        }
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div class="shadow md:shadow-lg px-5 py-5">
            {
                regionDataGroupedByZone !== [] ? <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 600 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {regionDataGroupedByZone
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.zone}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[20, 50, 100]}
                        component="div"
                        count={regionDataGroupedByZone.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper> : <p>Loading</p>
            }
        </div>
    );
}