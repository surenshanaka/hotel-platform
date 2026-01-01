"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, MapPin, ArrowRight, Hotel } from "lucide-react";
import { useAuthGuard } from "@/lib/authGuard";
import { apiFetch } from "@/lib/apiClient";
import LogoutButton from "@/components/LogoutButton";

interface Hotel {
  id: number;
  name: string;
  rooms?: Array<{
    id: number;
    price_per_night: number;
  }>;
}

export default function DashboardPage() {
  const isAllowed = useAuthGuard();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAllowed) {
      const fetchHotels = async () => {
        try {
          const data = await apiFetch<Hotel[]>("/hotels");
          setHotels(data);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("Failed to fetch hotels:", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchHotels();
    }
  }, [isAllowed]);

  if (isAllowed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-blue-100 text-lg">
                Manage your hotels and properties
              </p>
            </div>
            <div className="flex items-center gap-4">
              <LogoutButton />
              <div className="hidden md:flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl">
                <Hotel className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Hotels
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {hotels.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Rooms
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {hotels.reduce(
                    (sum, hotel) => sum + (hotel.rooms?.length || 0),
                    0
                  )}
                </p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Hotel className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Active Properties
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {hotels.length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Hotels List */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Hotels</h2>
            <p className="text-gray-600">
              Select a hotel to view details and manage rooms
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading hotels...</p>
            </div>
          ) : hotels.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No hotels found
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by adding your first hotel property.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <Link
                  key={hotel.id}
                  href={`/hotels/${hotel.id}`}
                  className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden"
                >
                  <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {hotel.name}
                    </h3>
                    <p className="text-blue-100 text-sm">
                      {hotel.rooms?.length || 0} rooms available
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>View Details</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
