import React from 'react';
import TextField from '@mui/material/TextField';

function Filter({ inputValue, setInputValue }) {
  const handleFilter = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="my-10 text-center">
      <TextField
        value={inputValue}
        onChange={handleFilter}
        label="Filter by name"
        variant="outlined"
        style={{ width: 400 }}
      />
    </form>
  );
}

export default Filter;
