
import { RadialBarChart, RadialBar, Legend } from "recharts";

export default function RiskChart({ score }: { score: number }) {
  // Score between 0-100
  const data = [
    {
      name: "Risk Score",
      value: score,
      fill: score > 80 ? "#16a34a" : score > 50 ? "#eab308" : "#dc2626",
    },
  ];

  return (
    <RadialBarChart
      width={80}
      height={80}
      cx={40}
      cy={40}
      innerRadius={25}
      outerRadius={38}
      barSize={13}
      data={data}
    >
      <RadialBar
        minPointSize={5}
        clockWise
        dataKey="value"
        cornerRadius={7}
      />
      <text
        x={40}
        y={44}
        textAnchor="middle"
        className="text-lg font-semibold"
        fill="#222"
      >
        {score}
      </text>
    </RadialBarChart>
  );
}
