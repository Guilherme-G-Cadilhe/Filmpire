import React from 'react';

import { Typography, Button } from '@mui/material';

import useStylesHook from './Pagination.styles';

const Pagination = ({ currentPage, totalPages, setPage }) => {
  const classes = useStylesHook();
  const handlePrev = () => {
    setPage((prevPage) => {
      if (currentPage !== 1) return prevPage - 1;
      return prevPage;
    });
  };
  const handleNext = () => {
    setPage((prevPage) => {
      if (currentPage !== totalPages) return prevPage + 1;
      return prevPage;
    });
  };

  if (totalPages === 0) return null;
  return (
    <div className={classes.container}>
      <Button onClick={handlePrev} variant="contained" color="primary" type="button" className={classes.button}>Prev</Button>
      <Typography variant="h4" className={classes.pageNumber}>{currentPage}</Typography>
      <Button onClick={handleNext} variant="contained" color="primary" type="button" className={classes.button}>Next</Button>
    </div>
  );
};

export default Pagination;
