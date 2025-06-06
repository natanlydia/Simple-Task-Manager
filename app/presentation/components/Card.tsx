'use client';

import React, { useState } from 'react';
import {
  Stack,
  Card,
  CardContent,
  Typography,
  Box,
  Tooltip,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

type Task = {
  name: string;
  detail?: string;
  datetime?: string; 
};

type Category = {
  title: string;
  baseColor: string;
  colorVariants: string[];
  tasks: Task[];
};

const initialTaskCategories: Category[] = [
  {
    title: 'Major Tasks',
    baseColor: '#ef9a9a',
    colorVariants: ['#ef9a9a', '#f8b6b6', '#fde0e0'],
    tasks: [
      { name: 'Meeting at 8 AM', detail: 'Discuss project updates with the team', datetime: '2025-06-06T08:00' },
      { name: 'Class at 10 AM', detail: 'Math class in room 101', datetime: '2025-06-06T10:00' },
      { name: 'Appointment at 1 PM', detail: 'Doctor appointment at the clinic', datetime: '2025-06-06T13:00' },
    ],
  },
  {
    title: 'Secondary Tasks',
    baseColor: '#fff59d',
    colorVariants: ['#fff59d', '#fff9c4', '#fffde7'],
    tasks: [
      { name: 'Buy groceries', datetime: '2025-06-06T15:00' },
      { name: 'Car maintenance', datetime: '2025-06-07T09:00' },
      { name: 'Laundry', datetime: '2025-06-07T11:00' },
    ],
  },
  {
    title: 'Tertiary Tasks',
    baseColor: '#a5d6a7',
    colorVariants: ['#a5d6a7', '#c8e6c9', '#e8f5e9'],
    tasks: [
      { name: "Baba's birthday", datetime: '2025-06-08T00:00' },
      { name: 'Dress shopping', datetime: '2025-06-09T14:00' },
      { name: 'Meet friends', datetime: '2025-06-09T18:00' },
    ],
  },
];

export default function StatCards() {
  const [categories, setCategories] = useState<Category[]>(initialTaskCategories);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDetail, setNewTaskDetail] = useState('');
  const [newTaskDateTime, setNewTaskDateTime] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Major Tasks');

 
  const addTask = () => {
    if (!newTaskName || !newTaskDateTime) {
      alert('Please enter task name and date/time');
      return;
    }

    setCategories((prevCategories) => {
      return prevCategories.map((cat) => {
        if (cat.title === newTaskPriority) {
          
          const updatedTasks = [
            ...cat.tasks,
            { name: newTaskName, detail: newTaskDetail || undefined, datetime: newTaskDateTime },
          ];
          
          updatedTasks.sort((a, b) => (a.datetime! > b.datetime! ? 1 : -1));
          return { ...cat, tasks: updatedTasks };
        }
        return cat;
      });
    });

    // Clear inputs
    setNewTaskName('');
    setNewTaskDetail('');
    setNewTaskDateTime('');
  };

  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        mb={4}
      >
        {categories.map((category, idx) => (
          <Card
            key={idx}
            sx={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: 4,
              boxShadow: 3,
              minHeight: 200,
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {category.title}
              </Typography>

              {category.tasks.map((task, i) => {
                const taskBox = (
                  <Box
                    key={i}
                    sx={{
                      backgroundColor: category.colorVariants[i] || category.baseColor,
                      borderRadius: 3,
                      px: 2,
                      py: 1,
                      mb: 1,
                      cursor: task.detail ? 'pointer' : 'default',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.06)',
                        boxShadow: 5,
                      },
                    }}
                  >
                    <Typography variant="body1" fontWeight="500">
                      {task.name} {' '}
                      <Typography component="span" variant="caption" color="text.secondary">
                        {task.datetime ? new Date(task.datetime).toLocaleString() : ''}
                      </Typography>
                    </Typography>
                  </Box>
                );

                if (category.title === 'Major Tasks' && task.detail) {
                  return (
                    <Tooltip key={i} title={task.detail} arrow>
                      {taskBox}
                    </Tooltip>
                  );
                }

                return taskBox;
              })}
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          very important Task
        </Typography>

        <TextField
          label="Task Name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          sx={{ mr: 2, mb: 2, width: 250 }}
        />
        <TextField
          label="Detail (optional)"
          value={newTaskDetail}
          onChange={(e) => setNewTaskDetail(e.target.value)}
          sx={{ mr: 2, mb: 2, width: 250 }}
        />
        <TextField
          label="Date & Time"
          type="datetime-local"
          value={newTaskDateTime}
          onChange={(e) => setNewTaskDateTime(e.target.value)}
          sx={{ mr: 2, mb: 2, width: 220 }}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl sx={{ mr: 2, mb: 2, width: 180 }}>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            value={newTaskPriority}
            label="Priority"
            onChange={(e) => setNewTaskPriority(e.target.value)}
          >
            <MenuItem value="Major Tasks">Major</MenuItem>
            <MenuItem value="Secondary Tasks">Secondary</MenuItem>
            <MenuItem value="Tertiary Tasks">Tertiary</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={addTask}>
          Add Task
        </Button>
      </Box>
    </>
  );
}
