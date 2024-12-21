import { BottomNav } from "@/components/BottomNav";

const Reports = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Reports</h1>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500">No reports yet</p>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Reports;