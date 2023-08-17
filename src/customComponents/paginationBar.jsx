import React from 'react';
import clsx from 'clsx'
// Mui Components
import  Typography from '@material-ui/core/Typography'
import  Grid from '@material-ui/core/Grid'
import {Pagination} from '@material-ui/lab';
import { usePagination } from '@material-ui/lab/Pagination';
import IconButton from "@material-ui/core/IconButton";
// utils methods
import cl from '../utils/cl'
// styles
import {useStyles} from './styles'

const PaginationBar = (props) => {

    const {
        count,
        totalEntries,
        totalVisibleEntries,
    } = props

    const classes = useStyles()
    const { items } = usePagination({
        count: count,
    });

    const renderPagination=()=>{
        return (
            <nav>
      <ul className={classes.paginationUl}>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = <span className={classes.ellipses}>...</span>;
          } else if (type === 'page') {
            children = (
               <IconButton
                className={clsx([selected ? classes.selectedPage:classes.unSelectedPage])}
                {...item}
              >
                {page}
              </IconButton>
            );
          } else {
            children = (
              <IconButton {...item} className={classes.paginationActions}>
                {type === "previous" ? "Previous" : "Next"}
              </IconButton>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </ul>
    </nav>
        )
    }

    return ( totalEntries>0?
        <Grid container className={classes.paginationWrapper} justify="space-between" spacing={1}>
            <Grid item sm={6} className={classes.paginationGridItem} >
                <Typography variant="body2" className={classes.paginationText}>Showing 1 to {totalVisibleEntries} of {totalEntries} entries</Typography>
            </Grid>
            <Grid item sm={6} className={classes.paginationGridItem}>
                {renderPagination()}
            </Grid>
            </Grid>
        : true
    )
}


export default PaginationBar