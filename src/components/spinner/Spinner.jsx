import React from 'react';
import classes from './Spinner.module.css';

const Spinner = () => {
    return (
        <div className={classes.loader}>
            loading..
        </div>
    );
};

export default Spinner;