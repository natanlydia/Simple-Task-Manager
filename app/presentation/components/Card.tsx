'use client';

import {
  Stack,
  Card,
  CardContent,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';

const taskCategories = [
  {
    title: 'Major Tasks',
    baseColor: '#ef9a9a',
    colorVariants: ['#ef9a9a', '#f8b6b6', '#fde0e0'],
    tasks: [
      { name: 'Meeting at 8 AM', detail: 'Discuss project updates with the team' },
      { name: 'Class at 10 AM', detail: 'Math class in room 101' },
      { name: 'Appointment at 1 PM', detail: 'Doctor appointment at the clinic' },
    ],
  },
  {
    title: 'Secondary Tasks',
    baseColor: '#fff59d',
    colorVariants: ['#fff59d', '#fff9c4', '#fffde7'],
    tasks: ['Buy groceries', 'Car maintenance', 'Laundry'],
  },
  {
    title: 'Tertiary Tasks',
    baseColor: '#a5d6a7',
    colorVariants: ['#a5d6a7', '#c8e6c9', '#e8f5e9'],
    tasks: ["Baba's birthday", 'Dress shopping', 'Meet friends'],
  },
];

export default function StatCards() {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      mb={4}
    >
      {taskCategories.map((category, idx) => (
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
              const taskName = typeof task === 'string' ? task : task.name;
              const taskDetail = typeof task === 'string' ? null : task.detail;

              const taskBox = (
                <Box
                  key={i}
                  sx={{
                    backgroundColor: category.colorVariants[i] || category.baseColor,
                    borderRadius: 3,
                    px: 2,
                    py: 1,
                    mb: 1,
                    cursor: taskDetail ? 'pointer' : 'default',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.06)',
                      boxShadow: 5,
                    },
                  }}
                >
                  <Typography variant="body1" fontWeight="500">
                    {taskName}
                  </Typography>
                </Box>
              );

              if (category.title === 'Major Tasks' && taskDetail) {
                return (
                  <Tooltip key={i} title={taskDetail} arrow>
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
  );
}
