import React from 'react';
import Box  from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default  function SimpleBox()   {
    return (
            <Box component="span" m={1} color="text.primary" clone>
                <Button variant="contained" color="primary">
                   Secondary
                </Button>
            </Box>
    );
}
