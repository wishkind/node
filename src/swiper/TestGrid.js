import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const GridItem = (props) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'red',
        p: 1,
        borderRadius: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        ...sx,
      }}
      {...other}
    />
  );
};

GridItem.propTypes = {
  sx: PropTypes.object,
};

export default function Grid() {
  return (
    <div style={{ width: '100%', height: 220 }}>
      <Box
        sx={{
          display: 'grid',
          p: 1,
          color: 'green',
          bgcolor: 'primary.main',
          gridAutoRows: '40px',
          gap: '8px',
        }}
      >
       
        <GridItem sx={{ gridColumn: '1', gridRow: '1 / 3' }}>1 / 3</GridItem>
        <GridItem sx={{ gridColumn: '1', gridRow: '4 / 5' }}>4 / 5</GridItem>
      </Box>
    </div>
  );
}

