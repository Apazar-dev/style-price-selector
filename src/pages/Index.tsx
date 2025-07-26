
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import PricingModal from '@/components/PricingModal';

const Index = () => {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-turquoise-light to-turquoise-dark font-poppins">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6">
            Créez des vidéos qui performent
          </h1>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            De la stratégie au montage, nous vous accompagnons dans la création de contenus vidéo impactants
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={() => setIsPricingModalOpen(true)}
              className="bg-white text-turquoise-dark hover:bg-gray-100 px-8 py-4 text-lg rounded-full font-medium"
            >
              Nouvelle commande
            </Button>
          </div>
        </div>
      </div>

      <PricingModal 
        isOpen={isPricingModalOpen} 
        onClose={() => setIsPricingModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
