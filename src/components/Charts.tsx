import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  LineChart, Line, Area, AreaChart,
} from "recharts";

const COLORS = ["hsl(213,94%,50%)", "hsl(145,63%,42%)", "hsl(38,92%,50%)", "hsl(270,60%,55%)", "hsl(0,72%,51%)"];

function fmt(v: number) {
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
  if (v >= 1000) return `₹${(v / 1000).toFixed(0)}K`;
  return `₹${v}`;
}

interface ExpensePieProps {
  data: { name: string; value: number }[];
}

export function ExpensePieChart({ data }: ExpensePieProps) {
  const filtered = data.filter(d => d.value > 0);
  if (filtered.length === 0) return <EmptyChart />;

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={filtered}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
        >
          {filtered.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} strokeWidth={0} />
          ))}
        </Pie>
        <Tooltip formatter={(v: number) => fmt(v)} contentStyle={tooltipStyle} />
        <Legend formatter={(val) => <span style={{ fontSize: 12, color: "hsl(220,14%,46%)" }}>{val}</span>} />
      </PieChart>
    </ResponsiveContainer>
  );
}

interface MonthlyBarProps {
  data: { month: string; income: number; expenses: number }[];
}

export function MonthlyBarChart({ data }: MonthlyBarProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} barGap={4} barSize={16}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,18%,92%)" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(220,14%,46%)" }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: "hsl(220,14%,46%)" }} axisLine={false} tickLine={false} width={60} />
        <Tooltip formatter={(v: number) => fmt(v)} contentStyle={tooltipStyle} />
        <Legend formatter={(val) => <span style={{ fontSize: 12, color: "hsl(220,14%,46%)" }}>{val === "income" ? "Income" : "Expenses"}</span>} />
        <Bar dataKey="income" fill="hsl(213,94%,50%)" radius={[4, 4, 0, 0]} name="income" />
        <Bar dataKey="expenses" fill="hsl(38,92%,50%)" radius={[4, 4, 0, 0]} name="expenses" />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface TrendLineProps {
  data: { month: string; value: number }[];
  label?: string;
  color?: string;
}

export function TrendLineChart({ data, label = "Savings", color = "hsl(145,63%,42%)" }: TrendLineProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.15} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,18%,92%)" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(220,14%,46%)" }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: "hsl(220,14%,46%)" }} axisLine={false} tickLine={false} width={60} />
        <Tooltip formatter={(v: number) => [fmt(v), label]} contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill="url(#grad)" dot={{ fill: color, r: 3 }} name={label} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const tooltipStyle = {
  background: "hsl(0,0%,100%)",
  border: "1px solid hsl(220,18%,88%)",
  borderRadius: 8,
  fontSize: 12,
  boxShadow: "0 4px 12px hsl(220,20%,10%/0.08)",
};

function EmptyChart() {
  return (
    <div className="h-[240px] flex items-center justify-center">
      <p className="text-sm text-muted-foreground">No data yet — fill in your details to see charts</p>
    </div>
  );
}
