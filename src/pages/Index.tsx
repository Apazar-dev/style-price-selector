import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import PricingModal from '@/components/PricingModal';
const Index = () => {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  return <div className="min-h-screen bg-gradient-to-b from-turquoise-light to-turquoise-dark font-poppins">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          
          
          
          <div className="space-y-4">
            
          </div>
        </div>
      </div>

      <PricingModal isOpen={isPricingModalOpen} onClose={() => setIsPricingModalOpen(false)} />
    </div>;
};
export default Index;