'use client';

import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add'; // ✅ import icon

export default function Add({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (title.trim() === '') return alert('Title is required');
    onAdd(title);
    setTitle('');
  };

  return (
    <Box display="flex" gap={2} mb={3}>
      <TextField
        fullWidth
        label="Enter a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={handleAdd}
        startIcon={<AddIcon />} // ✅ this adds the plus icon
      >
        Add
      </Button>
    </Box>
  );
}
