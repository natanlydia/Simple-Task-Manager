'use client';
import { Grid, Card, CardContent, Typography } from '@mui/material';


const stats = [
  { label: 'Total Tasks', value: 10 },
  { label: 'Completed Tasks', value: 6 },
];

export default function StatCards() {
  return (
    <Grid container spacing={2} mb={4}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card sx={{ backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h6">{stat.label}</Typography>
              <Typography variant="h4">{stat.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
