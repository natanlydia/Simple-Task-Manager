'use client';

import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

type DonutChartProps = {
  value: number;
  label: string;
  color: string;
};

const DonutChart = ({ value, label, color }: DonutChartProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    const startTime = performance.now();
    const duration = 1000;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressValue = Math.min(value, (elapsed / duration) * value);
      setProgress(Math.round(progressValue));

      if (elapsed < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return (
    <Card
      sx={{
        width: 200,
        height: 230,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        boxShadow: 2,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 130,
          height: 130,
        }}
      >
        <CircularProgress
          variant="determinate"
          value={100}
          size={130}
          thickness={6}
          sx={{ color: '#e0e0e0' }}
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          size={130}
          thickness={6}
          sx={{
            color,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          bottom={0}
          right={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h5" fontWeight="bold">
            {progress}%
          </Typography>
        </Box>
      </Box>
      <Typography variant="subtitle1" mt={2} fontWeight="bold">
        {label}
      </Typography>
    </Card>
  );
};

export default function Add({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (title.trim() === '') {
      alert('Title is required');
      return;
    }
    onAdd(title);
    setTitle('');
  };

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();

  const completed = 40;
  const pending = 60;

  return (
    <Box mb={4}>
     
      <Box display="flex" gap={4} mb={4} mt={2} flexWrap="wrap" alignItems="flex-start">
        
        <Card sx={{ width: 260, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" mb={1}>
              {currentMonth} {currentYear}
            </Typography>
            <Grid container spacing={1}>
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const isToday = day === currentDay;
                return (
                  <Grid item xs={2} key={day}>
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isToday ? 'orange' : '#f5f5f5',
                        color: isToday ? 'white' : 'black',
                        fontWeight: isToday ? 'bold' : 'normal',
                        fontSize: 14,
                      }}
                    >
                      {day}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>

        
        <Box display="flex" gap={3} flexWrap="wrap" alignItems="center">
          <DonutChart value={completed} label="Completed Tasks" color="#1976d2" />
          <DonutChart value={pending} label="Pending Tasks" color="#f9a825" />
        </Box>
      </Box>

      
      <Box display="flex" gap={4}>
        <TextField
          fullWidth
          label="Enter a new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="contained" onClick={handleAdd} startIcon={<AddIcon />}>
          Add
        </Button>
      </Box>
    </Box>
  );
}
