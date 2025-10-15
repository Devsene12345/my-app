import { useState } from "react";
import { Card, CardContent } from "./ui/card";
// Update the import path if Input is located elsewhere, for example:
import { Input } from "./ui/input";
// Or create the Input component at './ui/input.tsx' if it does not exist.
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Search, MapPin, Filter, Navigation } from "lucide-react";

const treeMarkers = [
  {
    id: 1,
    lat: 6.9897,
    lng: 81.0559,
    name: "Mango Tree",
    health: "Healthy",
    species: "Mango",
    area: "Central",
  },
  {
    id: 2,
    lat: 6.9912,
    lng: 81.0545,
    name: "Coconut Palm",
    health: "Healthy",
    species: "Coconut",
    area: "Central",
  },
  {
    id: 3,
    lat: 6.988,
    lng: 81.057,
    name: "Mahogany",
    health: "Moderate",
    species: "Mahogany",
    area: "North",
  },
  {
    id: 4,
    lat: 6.9865,
    lng: 81.0555,
    name: "Jak Tree",
    health: "Healthy",
    species: "Jak",
    area: "South",
  },
  {
    id: 5,
    lat: 6.992,
    lng: 81.053,
    name: "Neem Tree",
    health: "Poor",
    species: "Neem",
    area: "East",
  },
  {
    id: 6,
    lat: 6.9905,
    lng: 81.0585,
    name: "Tamarind",
    health: "Healthy",
    species: "Tamarind",
    area: "West",
  },
];

interface MapViewProps {
  onTreeSelect?: (treeId: number) => void;
}

export function MapView({ onTreeSelect }: MapViewProps) {
  const [selectedTree, setSelectedTree] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleTreeClick = (treeId: number) => {
    setSelectedTree(treeId);
    if (onTreeSelect) {
      onTreeSelect(treeId);
    }
  };

  const filteredTrees = treeMarkers.filter(
    (tree) =>
      tree.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tree.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tree.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-20 md:pb-6">
      <div>
        <h1>Tree Map</h1>
        <p className="text-muted-foreground">
          Interactive map of all registered trees in Badulla
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search trees, species, or areas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="size-4" />
          Filters
        </Button>
        <Button variant="outline" className="gap-2">
          <Navigation className="size-4" />
          My Location
        </Button>
      </div>

      {/* Map Container */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative w-full h-[500px] bg-gradient-to-br from-green-50 to-blue-50">
            {/* Mock Map with Grid */}
            <div className="absolute inset-0">
              <div className="w-full h-full relative">
                {/* Grid lines to simulate map */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  <defs>
                    <pattern
                      id="grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Tree Markers */}
                {filteredTrees.map((tree) => {
                  const x = ((tree.lng - 81.052) / 0.007) * 100;
                  const y = ((6.993 - tree.lat) / 0.0065) * 100;
                  const isSelected = selectedTree === tree.id;

                  return (
                    <div
                      key={tree.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110"
                      style={{ left: `${x}%`, top: `${y}%` }}
                      onClick={() => handleTreeClick(tree.id)}
                    >
                      <div className={`relative ${isSelected ? "z-10" : ""}`}>
                        <MapPin
                          className={`size-8 transition-all ${
                            tree.health === "Healthy"
                              ? "text-green-600"
                              : tree.health === "Moderate"
                              ? "text-orange-500"
                              : "text-red-500"
                          } ${isSelected ? "size-10" : ""}`}
                          fill="currentColor"
                        />
                        {isSelected && (
                          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg p-3 w-48 border border-border">
                            <h4 className="mb-1">{tree.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {tree.species}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge
                                variant={
                                  tree.health === "Healthy"
                                    ? "default"
                                    : tree.health === "Moderate"
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {tree.health}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {tree.area}
                              </span>
                            </div>
                            <Button
                              size="sm"
                              className="w-full mt-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onTreeSelect) onTreeSelect(tree.id);
                              }}
                            >
                              View Details
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 border border-border">
                  <h4 className="mb-3">Legend</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin
                        className="size-5 text-green-600"
                        fill="currentColor"
                      />
                      <span className="text-sm">Healthy Tree</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin
                        className="size-5 text-orange-500"
                        fill="currentColor"
                      />
                      <span className="text-sm">Moderate Health</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin
                        className="size-5 text-red-500"
                        fill="currentColor"
                      />
                      <span className="text-sm">Poor Health</span>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-border">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Total Trees:</span>{" "}
                    {filteredTrees.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Healthy Trees</p>
            <h3 className="text-green-600">
              {treeMarkers.filter((t) => t.health === "Healthy").length}
            </h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Moderate Health</p>
            <h3 className="text-orange-500">
              {treeMarkers.filter((t) => t.health === "Moderate").length}
            </h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Need Attention</p>
            <h3 className="text-red-500">
              {treeMarkers.filter((t) => t.health === "Poor").length}
            </h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Areas Covered</p>
            <h3>{new Set(treeMarkers.map((t) => t.area)).size}</h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
