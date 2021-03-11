import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

export default function BackgroundColor() {
  return (
    <React.Fragment>
    <Box bgcolor="primary.main" color="primary.contrastText" p={2}>
      primary.main
    </Box>
    <Grid container spacing={1}>
      < Grid item xs={12} sm={4}>
        <Box bgcolor="primary.main" color="primary.contrastText" p={2}>
          primary.main
        </Box>
      </Grid>
    </Grid>
    </React.Fragment>
  );
}
