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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Menu,
} from '@mui/material';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const DonutChart = ({ value, label, color }: { value: number; label: string; color: string }) => {
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
      <Box sx={{ position: 'relative', width: 130, height: 130 }}>
        <CircularProgress variant="determinate" value={100} size={130} thickness={6} sx={{ color: '#e0e0e0' }} />
        <CircularProgress
          variant="determinate"
          value={progress}
          size={130}
          thickness={6}
          sx={{ color, position: 'absolute', top: 0, left: 0 }}
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
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [calendarClicked, setCalendarClicked] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [priority, setPriority] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAdd = () => {
    if (!title || !priority) {
      alert('Please enter task title and select priority.');
      return;
    }
    onAdd(`${title} (${priority})`);
    setTitle('');
    setDeadline('');
    setSelectedDate('');
    setPriority('');
    setShowForm(false);
    setCalendarClicked(false);
  };

  const handleDateClick = (day: number) => {
    const selected = new Date(year, month, day);
    setSelectedDate(selected.toISOString().split('T')[0]);
    setCalendarClicked(true);
    setShowForm(true);
  };

  const handleMonthChange = (offset: number) => {
    const newDate = new Date(year, month + offset);
    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (!title.trim()) {
      alert('Enter task title first.');
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (level: string) => {
    setPriority(level);
    setAnchorEl(null);
    setShowForm(true);
  };

  const completed = 40;
  const pending = 60;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

  return (
    <Box mb={4}>
      <Box display="flex" gap={4} mb={4} mt={2} flexWrap="wrap" alignItems="flex-start">
        <Card sx={{ width: 300, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <IconButton onClick={() => handleMonthChange(-1)}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6">
                {monthName} {year}
              </Typography>
              <IconButton onClick={() => handleMonthChange(1)}>
                <ArrowForwardIcon />
              </IconButton>
            </Box>
            <Grid container spacing={1} mt={1}>
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const isToday = day === currentDay && month === currentMonth && year === currentYear;
                return (
                  <Grid item xs={2} key={day}>
                    <Box
                      onClick={() => handleDateClick(day)}
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
                        cursor: 'pointer',
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

      <Box display="flex" gap={2} flexWrap="wrap" alignItems="center" width="100%" mb={2}>
        <TextField
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 240 }}
        />
        {!calendarClicked && (
          <>
            <Button
              variant="contained"
              onClick={handleMenuOpen}
              sx={{ height: '56px' }}
            >
              Task Importance
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={() => handleMenuClose('Major')}>Major Task</MenuItem>
              <MenuItem onClick={() => handleMenuClose('Secondary')}>Secondary Task</MenuItem>
              <MenuItem onClick={() => handleMenuClose('Tertiary')}>Tertiary Task</MenuItem>
            </Menu>
          </>
        )}
      </Box>

      {calendarClicked && (
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center" mb={2}>
          <TextField
      
            label="Date"
            InputLabelProps={{ shrink: true }}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <TextField
            
            label="Deadline"
            InputLabelProps={{ shrink: true }}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value.replace(/\./g, ''))}
            inputProps={{ step: 300 }}
          />
        </Box>
      )}

      {showForm && (
        <Box display="flex" flexDirection="column" gap={2}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              label="Priority"
            >
              <MenuItem value="Major">Major Task</MenuItem>
              <MenuItem value="Secondary">Secondary Task</MenuItem>
              <MenuItem value="Tertiary">Tertiary Task</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleAdd} startIcon={<AddIcon />}>
            Save Task
          </Button>
        </Box>
      )}
    </Box>
  );
}
