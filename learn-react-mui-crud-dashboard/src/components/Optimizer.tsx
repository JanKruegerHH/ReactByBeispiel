import * as React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import {getProposals, Proposal} from "../data/proposals";

const rows: Proposal[] = getProposals()

const columns: GridColDef[] = [
    {field: 'area', headerName: 'Area', width: 120, type: 'string'},
    {field: 'newlegs', headerName: 'New Legs', width: 140, type: 'number'},
    {field: 'wop', headerName: 'WOP', width: 140, type: 'number'},
    {field: 'incdec', headerName: 'Increase/Decrease', width: 160, type: 'number'},
    {field: 'initprop', headerName: 'Initial Proposal', width: 160, type: 'number'},
    {field: 'addprop', headerName: 'Additional Proposal', width: 200, type: 'number'},
    {field: 'lowerboundary', headerName: 'Lower Boundary', width: 180, editable: true, type: 'number'},
    {field: 'upperboundary', headerName: 'Upper Boundary', width: 180, editable: true, type: 'number'},
    {field: 'addpropincdec', headerName: 'Additional Proposal - Inc./Dec.', width: 270, type: 'number'},
];

export default function Optimizer() {
    return (
        <section>
            <Box sx={{flex: 1, height: 300, width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', padding: '10px'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        editMode={"row"}
                        processRowUpdate={(updatedRow, originalRow) => {
                            console.log('incdec: ' + updatedRow.incdec);
                            console.log('newlegs: ' + updatedRow.newlegs);
                            console.log('lowerboundary: ' + updatedRow.lowerboundary);
                        }
                        }
                        showToolbar={true}
                        hideFooterPagination={true}
                    />
                </div>
            </Box>
        </section>
    )
}
