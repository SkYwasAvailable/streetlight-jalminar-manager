import { BottomNav } from "@/components/BottomNav";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Utility Management
        </h1>
        
        <div className="grid gap-6">
          <CategoryCard
            title="Street Light"
            image="https://images.unsplash.com/photo-1542662565-7e4b66bae529?auto=format&fit=crop&w=800"
            link="/street-lights"
          />
          <CategoryCard
            title="Jalminar"
            image="https://images.unsplash.com/photo-1576461419288-41be1a568c6b?auto=format&fit=crop&w=800"
            link="/jalminars"
          />
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            className="w-full max-w-xs"
            onClick={() => console.log("Admin login clicked")}
          >
            Admin Login
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Index;