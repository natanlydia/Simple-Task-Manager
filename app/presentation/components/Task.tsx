'use client';

import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export type FilterType = 'all' | 'pending' | 'completed';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskProps {
  tasks: Task[];
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function Task({
  tasks,
  filter,
  setFilter,
  onToggle,
  onDelete,
}: TaskProps) {
  const filtered = tasks.filter((t) =>
    filter === 'all' ? true : filter === 'completed' ? t.completed : !t.completed
  );

  return (
    <>
      <Box display="flex" gap={2} mb={2}>
        <Button
          variant={filter === 'all' ? 'contained' : 'outlined'}
          onClick={() => setFilter('all')}
          color="inherit"
        >
          All
        </Button>
        <Button
          variant={filter === 'pending' ? 'contained' : 'outlined'}
          onClick={() => setFilter('pending')}
          sx={{ backgroundColor: '#ffeb3b', color: 'black' }}
        >
          Pending
        </Button>
        <Button
          variant={filter === 'completed' ? 'contained' : 'outlined'}
          onClick={() => setFilter('completed')}
          sx={{ backgroundColor: '#4caf50', color: 'white' }}
        >
          Completed
        </Button>
      </Box>

      <List>
        {filtered.map((task) => (
          <ListItem
            key={task.id}
            component="li"
            button
            sx={{
              bgcolor: task.completed ? '#c8e6c9' : '#fffde7',
              mb: 1,
              borderRadius: 1,
              cursor: 'pointer',
            }}
            onClick={() => onToggle(task.id)}
          >
            <ListItemText
              primary={
                <Typography
                  sx={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                >
                  {task.title}
                </Typography>
              }
            />
            <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: task.completed ? '#81c784' : '#fff176',
                  color: 'black',
                  minWidth: 'auto',
                  px: 1.5,
                  textTransform: 'none',
                }}
                disableElevation
              >
                {task.completed ? 'Done' : 'Pending'}
              </Button>
              <IconButton edge="end" onClick={() => onDelete(task.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
}
