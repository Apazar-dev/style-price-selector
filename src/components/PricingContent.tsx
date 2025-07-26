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
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [productFormats, setProductFormats] = useState<{
    [key: string]: string;
  }>({});
  const [selectionMode, setSelectionMode] = useState(false);

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
    originalPrice: 2500,
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

    // Mettre à jour le format du produit s'il est déjà sélectionné
    setSelectedProducts(prev => prev.map(product => 
      product.id === planId 
        ? { ...product, format }
        : product
    ));
  };

  const handleProductSelect = (plan: any) => {
    const format = productFormats[plan.id] || 'micro-trottoir';
    const productExists = selectedProducts.some(p => p.id === plan.id);
    
    if (productExists) {
      setSelectedProducts(prev => prev.filter(p => p.id !== plan.id));
    } else {
      const newProduct: SelectedProduct = {
        id: plan.id,
        title: plan.title,
        price: plan.price,
        format: format
      };
      setSelectedProducts(prev => [...prev, newProduct]);
    }

    // Désactiver le mode sélection après avoir sélectionné
    setSelectionMode(false);
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const updateProductFormat = (productId: string, newFormat: string) => {
    setSelectedProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, format: newFormat }
        : product
    ));
    setProductFormats(prev => ({
      ...prev,
      [productId]: newFormat
    }));
  };

  const totalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);

  const enableSelectionMode = () => {
    setSelectionMode(true);
  };

  const getAvailableProductsCount = () => {
    return pricingPlans.filter(plan => 
      !selectedProducts.some(selected => selected.id === plan.id)
    ).length;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        {selectionMode && (
          <div className="mb-6 p-4 bg-turquoise-light/10 rounded-lg border border-turquoise-light">
            <p className="text-turquoise-dark font-medium">
              Sélectionnez un produit supplémentaire en cliquant sur "Sélectionner ce pack"
            </p>
            <Button 
              onClick={() => setSelectionMode(false)} 
              variant="outline" 
              className="mt-2 text-sm"
            >
              Annuler
            </Button>
          </div>
        )}
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
            isSelected={selectedProducts.some(p => p.id === plan.id)}
            onSelect={() => handleProductSelect(plan)}
          />
        ))}
      </div>

      {selectedProducts.length > 0 && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-turquoise-dark mb-6 text-center">
            Votre sélection
          </h3>
          
          <div className="space-y-4 mb-6">
            {selectedProducts.map(product => (
              <div key={product.id} className="flex justify-between items-center py-3 border-b border-gray-200">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{product.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600">Format: {product.format}</span>
                    <button
                      onClick={() => {
                        const newFormat = product.format === 'micro-trottoir' 
                          ? 'scripte' 
                          : product.format === 'scripte' 
                            ? 'interview' 
                            : 'micro-trottoir';
                        updateProductFormat(product.id, newFormat);
                      }}
                      className="text-turquoise-dark hover:text-turquoise-light transition-colors"
                      title="Modifier le format"
                    >
                      <Edit2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-turquoise-dark">{product.price}€</span>
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Supprimer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center py-4 border-t-2 border-turquoise-light">
            <span className="text-xl font-bold text-gray-900">Total:</span>
            <span className="text-3xl font-bold text-turquoise-dark">{totalPrice}€</span>
          </div>

          {selectedProducts.length < 3 && getAvailableProductsCount() > 0 && (
            <div className="text-center mt-6">
              <Button 
                onClick={enableSelectionMode} 
                className="bg-turquoise-light hover:bg-turquoise-dark text-white px-6 py-3 rounded-full"
              >
                Sélectionner un produit supplémentaire
              </Button>
            </div>
          )}

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
