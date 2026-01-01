import { useState } from "react";
import { adjustRoomRate } from "@/lib/roomApi";

interface AdjustRateModalProps {
  roomId: number;
  onClose: () => void;
}

export default function AdjustRateModal({ roomId, onClose }: AdjustRateModalProps) {
  const [rate, setRate] = useState("");
  const [reason, setReason] = useState("");

  const submit = async () => {
    await adjustRoomRate(roomId, Number(rate), reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Adjust Rate</h2>

        <input
          type="number"
          placeholder="New Rate"
          className="w-full border rounded p-2 mb-3"
          onChange={(e) => setRate(e.target.value)}
        />

        <input
          placeholder="Reason"
          className="w-full border rounded p-2 mb-4"
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={submit}
            className="flex-1 bg-blue-600 text-white py-2 rounded"
          >
            Save
          </button>
          <button onClick={onClose} className="flex-1 border py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
