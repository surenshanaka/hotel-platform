import { useEffect, useState } from "react";
import { getRateHistory } from "@/lib/roomApi";

type RateHistoryItem = {
  old_rate: number;
  new_rate: number;
  reason: string;
  created_at: string;
};

export default function RateHistory({ roomId }: { roomId: number }) {
  const [history, setHistory] = useState<RateHistoryItem[]>([]);

  useEffect(() => {
    getRateHistory(roomId).then(setHistory);
  }, [roomId]);

  return (
    <div className="mt-6">
      <h4 className="font-semibold mb-2">Rate History</h4>

      <ul className="space-y-2">
        {history.map((h, idx) => (
          <li key={idx} className="border rounded p-2 text-sm">
            <div>
              {h.old_rate} → {h.new_rate}
            </div>
            <div className="text-gray-500">{h.reason}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
