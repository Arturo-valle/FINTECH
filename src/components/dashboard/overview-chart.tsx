'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Oct', total: Math.floor(Math.random() * 6) + 1 },
  { name: 'Nov', total: Math.floor(Math.random() * 6) + 1 },
  { name: 'Dic', total: Math.floor(Math.random() * 6) + 1 },
  { name: 'Ene', total: Math.floor(Math.random() * 6) + 1 },
  { name: 'Feb', total: Math.floor(Math.random() * 6) + 1 },
  { name: 'Mar', total: Math.floor(Math.random() * 6) + 1 },
];

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          cursor={{ fill: 'hsl(var(--secondary))' }}
          contentStyle={{ 
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))'
          }}
        />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
