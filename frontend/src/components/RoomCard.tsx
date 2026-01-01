type Props = {
  room: {
    id: number;
    base_price: number;
  };
  onAdjust: () => void;
};

export default function RoomCard({ room, onAdjust }: Props) {
  return (
    <div className="rounded-xl border p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold">Room #{room.id}</h3>

      <p className="mt-2 text-gray-600">
        Base Price:
        <span className="ml-2 font-bold text-black">
          ${room.base_price}
        </span>
      </p>

      <button
        onClick={onAdjust}
        className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Adjust Rate
      </button>
    </div>
  );
}
