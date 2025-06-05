'use client';

import { Container, Box, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import Task from './presentation/components/Task';
import StatCards from './presentation/components/Card';
import Add from './presentation/components/Add';
import type { FilterType } from './presentation/components/Task';

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read a book', completed: true },
  ]);

  const [filter, setFilter] = useState<FilterType>('all');

  const addTask = (title: string) => {
    setTasks([...tasks, { id: Date.now(), title, completed: false }]);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <Box sx={{ backgroundColor: '#e3f2fd', minHeight: '100vh', py: 4 }}>
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: '#fffde7',
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
        }}
      >
        
        <Paper
          elevation={3}
          sx={{
            backgroundColor: '#008080',
            color: 'white',
            p: 3,
            borderRadius: 2,
            mb: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4">Hello Jone</Typography>
          <Box sx={{ flexGrow: 1, textAlign: 'center', marginRight: '64px' }}></Box>
          {/* <Typography variant="h4" gutterBottom>
            Task Management
          </Typography> */}
          <Typography variant="h6">
            Schedule and organize your daily tasks
          </Typography>
        </Paper>

        <StatCards tasks={tasks} />
        <Add onAdd={addTask} />
        <Task
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          filter={filter}
          setFilter={setFilter}
        />
      </Container>
    </Box>
  );
}
