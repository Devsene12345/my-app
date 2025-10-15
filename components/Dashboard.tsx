import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  TreeDeciduous,
  Activity,
  TrendingUp,
  MapPin,
  Leaf,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const treeSpeciesData = [
  { name: "Mango", value: 145, color: "#22c55e" },
  { name: "Coconut", value: 98, color: "#3b82f6" },
  { name: "Jak", value: 76, color: "#f59e0b" },
  { name: "Mahogany", value: 54, color: "#8b5cf6" },
  { name: "Others", value: 87, color: "#ec4899" },
];

const healthData = [
  { month: "Jan", healthy: 320, moderate: 45, poor: 15 },
  { month: "Feb", healthy: 335, moderate: 38, poor: 12 },
  { month: "Mar", healthy: 348, moderate: 32, poor: 10 },
  { month: "Apr", healthy: 362, moderate: 28, poor: 8 },
  { month: "May", healthy: 378, moderate: 25, poor: 7 },
  { month: "Jun", healthy: 395, moderate: 20, poor: 5 },
];

const areaDistribution = [
  { area: "Central", trees: 185 },
  { area: "North", trees: 142 },
  { area: "South", trees: 98 },
  { area: "East", trees: 76 },
  { area: "West", trees: 54 },
];

export function Dashboard() {
  const stats = [
    {
      title: "Total Trees",
      value: "460",
      icon: TreeDeciduous,
      change: "+12%",
      color: "text-green-600",
    },
    {
      title: "Tree Species",
      value: "28",
      icon: Leaf,
      change: "+3",
      color: "text-blue-600",
    },
    {
      title: "Areas Covered",
      value: "15",
      icon: MapPin,
      change: "+2",
      color: "text-purple-600",
    },
    {
      title: "Health Issues",
      value: "5",
      icon: AlertTriangle,
      change: "-8%",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div>
        <h1>Urban Tree Dashboard</h1>
        <p className="text-muted-foreground">
          Badulla Area - Real-time monitoring and analytics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {stat.title}
                    </p>
                    <h2 className="mt-2">{stat.value}</h2>
                    <p className={`text-sm mt-1 ${stat.color}`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg bg-secondary ${stat.color}`}>
                    <Icon className="size-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tree Health Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tree Health Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="healthy"
                  stroke="#22c55e"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="moderate"
                  stroke="#f59e0b"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="poor"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Species Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Species Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={treeSpeciesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {treeSpeciesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Area Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Trees by Area Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={areaDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="trees" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "New tree added",
                location: "Central Park",
                time: "2 hours ago",
                type: "success",
              },
              {
                action: "Health check completed",
                location: "Main Street",
                time: "5 hours ago",
                type: "info",
              },
              {
                action: "Maintenance required",
                location: "East Avenue",
                time: "1 day ago",
                type: "warning",
              },
              {
                action: "Tree removed",
                location: "South Plaza",
                time: "2 days ago",
                type: "error",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 pb-4 border-b last:border-0"
              >
                <div
                  className={`size-2 rounded-full ${
                    activity.type === "success"
                      ? "bg-green-500"
                      : activity.type === "info"
                      ? "bg-blue-500"
                      : activity.type === "warning"
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                />
                <div className="flex-1">
                  <p>{activity.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.location}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
