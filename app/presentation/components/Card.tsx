'use client';

import { Stack, Card, CardContent, Typography } from '@mui/material';

const stats = [
  { label: 'Total Tasks',     value: 10, color: '#f5f5f5' }, // light-gray
  { label: 'Pending Tasks',   value: 4,  color: '#fff9c4' }, // light-yellow
  { label: 'Completed Tasks', value: 6,  color: '#c8e6c9' }, // light-green
];

export default function StatCards() {
  return (
    <Stack               /* acts like flex-box */
      direction={{ xs: 'column', sm: 'row' }}   /* column on mobile, row on ≥sm */
      spacing={2}        /* gap between cards */
      mb={4}
    >
      {stats.map((stat, idx) => (
        <Card
          key={idx}
          sx={{
            flex: 1,                          /* each card takes equal width */
            backgroundColor: stat.color,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: 120,                   
          }}
        >
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>
              {stat.label}
            </Typography>
            <Typography variant="h4" align="center">
              {stat.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
