import { useState } from "react";
import { Toaster } from "./components/ui/sonner";
import { Dashboard } from "./components/Dashboard";
import { MapView } from "./components/MapView";
import { TreeInventory } from "./components/TreeInventory";
import { TreeDetails } from "./components/TreeDetails";
import { Analytics } from "./components/Analytics";
import { AddTreeForm } from "./components/AddTreeForm";
import { Measurements } from "./components/Measurements";
import { Sidebar } from "./components/Sidebar";
import { MobileNav } from "./components/MobileNav";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedTreeId, setSelectedTreeId] = useState<number | null>(null);

  const handleTreeSelect = (treeId: number) => {
    setSelectedTreeId(treeId);
    setActiveView("details");
  };

  const handleBackFromDetails = () => {
    setSelectedTreeId(null);
    setActiveView("inventory");
  };

  const handleBackFromAdd = () => {
    setActiveView("dashboard");
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
    setSelectedTreeId(null);
  };

  return (
    <>
      <div className="flex min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <Sidebar activeView={activeView} onViewChange={handleViewChange} />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-8">
            {activeView === "dashboard" && <Dashboard />}
            {activeView === "map" && (
              <MapView onTreeSelect={handleTreeSelect} />
            )}
            {activeView === "inventory" && (
              <TreeInventory onTreeSelect={handleTreeSelect} />
            )}
            {activeView === "measurements" && <Measurements />}
            {activeView === "analytics" && <Analytics />}
            {activeView === "add" && <AddTreeForm onBack={handleBackFromAdd} />}
            {activeView === "details" && selectedTreeId && (
              <TreeDetails
                treeId={selectedTreeId}
                onBack={handleBackFromDetails}
              />
            )}
            {activeView === "reports" && (
              <div className="space-y-6 pb-20 md:pb-6">
                <div>
                  <h1>Reports</h1>
                  <p className="text-muted-foreground">
                    Generate and export comprehensive tree management reports
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Monthly Summary",
                      description:
                        "Overview of tree activities and health metrics",
                    },
                    {
                      title: "Species Report",
                      description: "Detailed analysis by tree species",
                    },
                    {
                      title: "Area Coverage",
                      description:
                        "Geographic distribution and coverage analysis",
                    },
                    {
                      title: "Environmental Impact",
                      description:
                        "Carbon sequestration and ecosystem benefits",
                    },
                  ].map((report, index) => (
                    <div
                      key={index}
                      className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <h3 className="mb-2">{report.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {report.description}
                      </p>
                      <button className="text-sm text-primary hover:underline">
                        Generate Report →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeView === "settings" && (
              <div className="space-y-6 pb-20 md:pb-6">
                <div>
                  <h1>Settings</h1>
                  <p className="text-muted-foreground">
                    Configure your tree mapping system preferences
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-card border border-border rounded-lg">
                    <h3 className="mb-4">User Profile</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground">
                          Name
                        </label>
                        <p>Forest Officer</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">
                          Email
                        </label>
                        <p>officer@badulla.gov.lk</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">
                          Role
                        </label>
                        <p>Administrator</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-card border border-border rounded-lg">
                    <h3 className="mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Inspection Reminders</span>
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
                          On
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Health Alerts</span>
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
                          On
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Monthly Reports</span>
                        <button className="px-4 py-2 bg-muted text-foreground rounded-lg">
                          Off
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Mobile Navigation */}
        <MobileNav activeView={activeView} onViewChange={handleViewChange} />
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </>
  );
}
