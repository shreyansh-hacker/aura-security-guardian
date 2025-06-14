
import { useState } from "react";

const MOCK_STATS = [
  { app: "Cool VPN", cpu: 23, battery: 18 },
  { app: "AmazingGame.apk", cpu: 44, battery: 26 },
  { app: "DocEditor Pro", cpu: 7, battery: 6 },
  { app: "System Update Helper", cpu: 17, battery: 11 },
  { app: "WhatsApp", cpu: 3, battery: 2 },
  { app: "WeatherNow", cpu: 5, battery: 3 },
];

function getColor(val: number) {
  if (val > 30) return "text-red-600 font-bold";
  if (val > 10) return "text-yellow-500 font-semibold";
  return "text-green-700 font-normal";
}

export default function BatteryMonitor() {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Battery / Performance Monitor</h3>
      <div className="border rounded-lg shadow-inner bg-gray-50 p-2">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="py-1">App</th>
              <th className="py-1">CPU (%)</th>
              <th className="py-1">Battery (%)</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_STATS.map((item, ix) => (
              <tr key={ix} className="border-b last:border-b-0">
                <td className="py-2 font-medium">{item.app}</td>
                <td className={getColor(item.cpu)}>{item.cpu}</td>
                <td className={getColor(item.battery)}>{item.battery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
