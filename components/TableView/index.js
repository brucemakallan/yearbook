import React from 'react';

import MUIDataTable from 'mui-datatables';
import { ThemeProvider } from '@material-ui/core/styles';

import { MUIDatatableTheme } from '../../styles/global-theme';

const fixedOptions = {
  filterType: 'multiselect',
  print: false,
  responsive: 'vertical',
  viewColumns: false,
  selectableRows: 'none',
  selectableRowsHeader: false,
  enableNestedDataAccess: '.',
  sortOrder: {
    name: 'createdAt',
    direction: 'desc',
  },
};

const TableView = ({
  title,
  data,
  columns,
  onRowClick,
  onCellClick,
  onRowsDelete,
  onTableChange,
}) => {
  const options = {
    ...fixedOptions,
    onRowClick,
    onRowsDelete,
    onCellClick,
    onTableChange,
  };

  return (
    <ThemeProvider theme={MUIDatatableTheme}>
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  );
};

export default TableView;
