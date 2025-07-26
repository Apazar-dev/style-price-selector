
import React, { useState } from 'react';
import PricingCard from '@/components/PricingCard';
import { Button } from '@/components/ui/button';
import { X, Edit2 } from 'lucide-react';

interface Feature {
  text: string;
  status: 'included' | 'excluded' | 'unavailable';
  details?: string[];
}

interface SelectedProduct {
  id: string;
  title: string;
  price: number;
  format: string;
}

const PricingContent = () => {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct | null>(null);
  const [productFormats, setProductFormats] = useState<{
    [key: string]: string;
  }>({});

  const pricingPlans = [{
    id: 'basic',
    title: '3 vidéos',
    subtitle: 'Pour découvrir ce qu\'on sait faire sans se ruiner',
    price: 900,
    features: [{
      text: '1 format au choix',
      status: 'included' as const
    }, {
      text: 'Accompagnement stratégique',
      status: 'included' as const
    }, {
      text: 'Rédaction des scripts ou trames',
      status: 'included' as const
    }, {
      text: 'Tournage possible dans 3 lieux :',
      status: 'included' as const,
      details: ['Dans nos studios à Paris', 'Dans vos locaux (en France métropolitaine)', 'En extérieur (en France métropolitaine)']
    }, {
      text: 'Tournage de 30min',
      status: 'included' as const
    }, {
      text: 'Incarnation par vous ou par des acteurs (+200€)',
      status: 'unavailable' as const
    }, {
      text: 'Montage de qualité',
      status: 'unavailable' as const
    }, {
      text: '3 salves de révisions',
      status: 'included' as const
    }, {
      text: 'Garantie de vues',
      status: 'excluded' as const
    }, {
      text: 'Analyse des performances et reporting complet',
      status: 'excluded' as const
    }]
  }, {
    id: 'standard',
    title: '6 vidéos',
    subtitle: '100k vues garanties et révisions illimitées',
    price: 1700,
    features: [{
      text: '1 format au choix',
      status: 'included' as const
    }, {
      text: 'Accompagnement stratégique',
      status: 'included' as const
    }, {
      text: 'Rédaction des scripts ou trames',
      status: 'included' as const
    }, {
      text: 'Tournage possible dans 3 lieux :',
      status: 'included' as const,
      details: ['Dans nos studios à Paris', 'Dans vos locaux (en France métropolitaine)', 'En extérieur (en France métropolitaine)']
    }, {
      text: 'Tournage de 1h',
      status: 'included' as const
    }, {
      text: 'Incarnation par vous ou par des acteurs (+200€)',
      status: 'unavailable' as const
    }, {
      text: 'Montage de qualité',
      status: 'unavailable' as const
    }, {
      text: 'Révisions illimitées',
      status: 'included' as const
    }, {
      text: '100k vues garanties',
      status: 'included' as const
    }, {
      text: 'Analyse des performances et reporting complet',
      status: 'excluded' as const
    }]
  }, {
    id: 'premium',
    title: '10 vidéos',
    subtitle: '200k vues garanties et analyse poussée des résultats',
    price: 2300,
    isPopular: true,
    features: [{
      text: '1 format au choix',
      status: 'included' as const
    }, {
      text: 'Accompagnement stratégique',
      status: 'included' as const
    }, {
      text: 'Rédaction des scripts ou trames',
      status: 'included' as const
    }, {
      text: 'Tournage possible dans 3 lieux :',
      status: 'included' as const,
      details: ['Dans nos studios à Paris', 'Dans vos locaux (en France métropolitaine)', 'En extérieur (en France métropolitaine)']
    }, {
      text: 'Tournage de 2h',
      status: 'included' as const
    }, {
      text: 'Incarnation par vous ou par des acteurs (+200€)',
      status: 'included' as const
    }, {
      text: 'Montage de qualité',
      status: 'included' as const
    }, {
      text: 'Révisions illimitées',
      status: 'included' as const
    }, {
      text: '200k vues garanties',
      status: 'included' as const
    }, {
      text: 'Analyse des performances et reporting complet',
      status: 'included' as const
    }]
  }];

  const handleFormatChange = (planId: string, format: string) => {
    setProductFormats(prev => ({
      ...prev,
      [planId]: format
    }));

    // Mettre à jour le format du produit s'il est sélectionné
    if (selectedProduct && selectedProduct.id === planId) {
      setSelectedProduct(prev => prev ? { ...prev, format } : null);
    }
  };

  const handleProductSelect = (plan: any) => {
    const format = productFormats[plan.id] || 'micro-trottoir';
    const isCurrentlySelected = selectedProduct?.id === plan.id;
    
    if (isCurrentlySelected) {
      // Désélectionner le produit actuel
      setSelectedProduct(null);
    } else {
      // Sélectionner le nouveau produit (remplace l'ancien s'il y en a un)
      const newProduct: SelectedProduct = {
        id: plan.id,
        title: plan.title,
        price: plan.price,
        format: format
      };
      setSelectedProduct(newProduct);
    }
  };

  const updateProductFormat = (newFormat: string) => {
    if (selectedProduct) {
      setSelectedProduct(prev => prev ? { ...prev, format: newFormat } : null);
      setProductFormats(prev => ({
        ...prev,
        [selectedProduct.id]: newFormat
      }));
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        
        
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {pricingPlans.map(plan => (
          <PricingCard
            key={plan.id}
            title={plan.title}
            subtitle={plan.subtitle}
            price={plan.price}
            originalPrice={plan.originalPrice}
            features={plan.features}
            isPopular={plan.isPopular}
            onFormatChange={format => handleFormatChange(plan.id, format)}
            selectedFormat={productFormats[plan.id] || 'micro-trottoir'}
            isSelected={selectedProduct?.id === plan.id}
            onSelect={() => handleProductSelect(plan)}
          />
        ))}
      </div>

      {selectedProduct && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-turquoise-dark mb-6 text-center">
            Votre sélection
          </h3>
          
          <div className="py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{selectedProduct.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-600">Format: {selectedProduct.format}</span>
                  <button
                    onClick={() => {
                      const newFormat = selectedProduct.format === 'micro-trottoir' 
                        ? 'scripte' 
                        : selectedProduct.format === 'scripte' 
                          ? 'interview' 
                          : 'micro-trottoir';
                      updateProductFormat(newFormat);
                    }}
                    className="text-turquoise-dark hover:text-turquoise-light transition-colors"
                    title="Modifier le format"
                  >
                    <Edit2 size={14} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-turquoise-dark">{selectedProduct.price}€</span>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Désélectionner"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center py-4 border-t-2 border-turquoise-light mt-4">
            <span className="text-xl font-bold text-gray-900">Prix:</span>
            <span className="text-3xl font-bold text-turquoise-dark">{selectedProduct.price}€</span>
          </div>

          <div className="text-center mt-8">
            <Button className="bg-turquoise-dark hover:bg-turquoise-light text-white px-12 py-4 text-lg rounded-full">
              Commencer mon projet
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingContent;
