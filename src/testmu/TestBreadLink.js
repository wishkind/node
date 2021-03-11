import React from 'react'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import { Breadcrumbs, Typography, Link } from '@material-ui/core'

function toTitleCase(str) {
  return str.replace(/\b\w+/g, function (s) {
    return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()
  })
}

export default function Tt() {
  let location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <React.Fragment>
    <Breadcrumbs aria-label='Breadcrumb'>
      <Link color='inherit' component={RouterLink} to='/'>
        Home
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join('/')}`

        return last ? (
          <Typography color='textPrimary' key={to}>
            {toTitleCase(value)}
          </Typography>
        ) : (
          <Link color='inherit' component={RouterLink} to='/' key={to}>
            {toTitleCase(value)}
          </Link>
        )
      })}
    </Breadcrumbs> 
   <div> <p> hello </p> </div>
  </React.Fragment>
  );
}
