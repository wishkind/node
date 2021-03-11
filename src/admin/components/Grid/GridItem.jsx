import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = {
  grid: {
    padding: '0 15px !important'
  }
}

const useStyles = makeStyles(styles)

const GridItem = (props) => {
  const classes = useStyles()
  const { children, ...rest } = props
  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  )
}

GridItem.propTypes = {
  children: PropTypes.node
}

export default GridItem
