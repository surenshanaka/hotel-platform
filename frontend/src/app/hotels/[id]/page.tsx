"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Building2,
  ArrowLeft,
  Bed,
  DollarSign,
  MapPin,
  Hotel,
} from "lucide-react";
import { apiFetch } from "@/lib/apiClient";
import { useAuthGuard } from "@/lib/authGuard";
import AdjustRateModal from "@/components/AdjustRateModal";
import { Edit } from "lucide-react";

interface Room {
  id: number;
  price_per_night: number;
}

interface Hotel {
  id: number;
  name: string;
  rooms: Room[];
}

export default function HotelDetailsPage() {
  const isAllowed = useAuthGuard();
  const params = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRoomId, setActiveRoomId] = useState<number | null>(null);

  const fetchHotel = async () => {
    try {
      const data = await apiFetch<Hotel>(`/hotels/${params.id}`);
      setHotel(data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to fetch hotel:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAllowed) {
      fetchHotel();
    }
  }, [params.id, isAllowed]);

  if (isAllowed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              Access Denied
            </h2>
            <p className="text-red-600 mb-4">
              You don't have permission to access this page.
            </p>
            <Link
              href="/login"
              className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Hotel Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The hotel you're looking for doesn't exist.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const totalRooms = hotel.rooms?.length || 0;
  const avgPrice =
    totalRooms > 0
      ? hotel.rooms.reduce((sum, room) => sum + room.price_per_night, 0) /
        totalRooms
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">{hotel.name}</h1>
                  <div className="flex items-center gap-2 text-blue-100">
                    <MapPin className="w-4 h-4" />
                    <span>Hotel Details</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl">
              <Hotel className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Rooms
                </p>
                <p className="text-3xl font-bold text-gray-900">{totalRooms}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Bed className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Average Price
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  ${avgPrice.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Available Rooms
                </p>
                <p className="text-3xl font-bold text-gray-900">{totalRooms}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Hotel className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Rooms Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Rooms</h2>
            <p className="text-gray-600">
              View all available rooms and their pricing
            </p>
          </div>

          {totalRooms === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Bed className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No rooms available
              </h3>
              <p className="text-gray-600">
                This hotel doesn't have any rooms configured yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotel.rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden group"
                >
                  <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <Bed className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Room #{room.id}
                    </h3>
                    <p className="text-blue-100 text-sm">Available</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Price per night
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          ${room.price_per_night.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>Standard rate</span>
                    </div>
                    <button
                      onClick={() => setActiveRoomId(room.id)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                    >
                      <Edit className="w-4 h-4" />
                      Adjust Rate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Adjust Rate Modal */}
      {activeRoomId && (
        <AdjustRateModal
          roomId={activeRoomId}
          onClose={() => {
            setActiveRoomId(null);
            fetchHotel(); // Refresh hotel data
          }}
        />
      )}
    </div>
  );
}
