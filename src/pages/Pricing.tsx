
import React, { useState } from 'react';
import PricingCard from '@/components/PricingCard';
import { Button } from '@/components/ui/button';

interface SelectedProduct {
  id: string;
  title: string;
  price: number;
  format: string;
}

const Pricing = () => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [productFormats, setProductFormats] = useState<{[key: string]: string}>({});

  const pricingPlans = [
    {
      id: 'basic',
      title: '3 vidéos',
      subtitle: 'Pour découvrir ce qu\'on sait faire sans se ruiner',
      price: 900,
      features: [
        { text: '1 format au choix', included: true },
        { text: 'Accompagnement stratégique', included: true },
        { text: 'Rédaction des scripts ou trames', included: true },
        { 
          text: 'Tournage possible dans 3 lieux :', 
          included: true,
          details: [
            'Dans nos studios à Paris',
            'Dans vos locaux (en France métropolitaine)',
            'En extérieur (en France métropolitaine)'
          ]
        },
        { text: 'Tournage de 30min', included: true },
        { text: 'Incarnation par vous ou par des acteurs (+200€)', included: false },
        { text: 'Montage de qualité', included: false },
        { text: '3 salves de révisions', included: true },
        { text: 'Garantie de vues', included: false },
        { text: 'Analyse des performances et reporting complet', included: false }
      ]
    },
    {
      id: 'standard',
      title: '6 vidéos',
      subtitle: '100k vues garanties et révisions illimitées',
      price: 1700,
      features: [
        { text: '1 format au choix', included: true },
        { text: 'Accompagnement stratégique', included: true },
        { text: 'Rédaction des scripts ou trames', included: true },
        { 
          text: 'Tournage possible dans 3 lieux :', 
          included: true,
          details: [
            'Dans nos studios à Paris',
            'Dans vos locaux (en France métropolitaine)',
            'En extérieur (en France métropolitaine)'
          ]
        },
        { text: 'Tournage de 1h', included: true },
        { text: 'Incarnation par vous ou par des acteurs (+200€)', included: false },
        { text: 'Montage de qualité', included: false },
        { text: 'Révisions illimitées', included: true },
        { text: '100k vues garanties', included: true },
        { text: 'Analyse des performances et reporting complet', included: false }
      ]
    },
    {
      id: 'premium',
      title: '10 vidéos',
      subtitle: '200k vues garanties et analyse poussée des résultats',
      price: 2300,
      originalPrice: 2500,
      isPopular: true,
      features: [
        { text: '1 format au choix', included: true },
        { text: 'Accompagnement stratégique', included: true },
        { text: 'Rédaction des scripts ou trames', included: true },
        { 
          text: 'Tournage possible dans 3 lieux :', 
          included: true,
          details: [
            'Dans nos studios à Paris',
            'Dans vos locaux (en France métropolitaine)',
            'En extérieur (en France métropolitaine)'
          ]
        },
        { text: 'Tournage de 2h', included: true },
        { text: 'Incarnation par vous ou par des acteurs (+200€)', included: true },
        { text: 'Montage de qualité', included: true },
        { text: 'Révisions illimitées', included: true },
        { text: '200k vues garanties', included: true },
        { text: 'Analyse des performances et reporting complet', included: true }
      ]
    }
  ];

  const handleFormatChange = (planId: string, format: string) => {
    setProductFormats(prev => ({
      ...prev,
      [planId]: format
    }));
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
  };

  const totalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);

  const addSecondProduct = () => {
    // Find the first unselected product
    const availableProduct = pricingPlans.find(plan => 
      !selectedProducts.some(selected => selected.id === plan.id)
    );
    
    if (availableProduct) {
      const format = productFormats[availableProduct.id] || 'micro-trottoir';
      const newProduct: SelectedProduct = {
        id: availableProduct.id,
        title: availableProduct.title,
        price: availableProduct.price,
        format: format
      };
      setSelectedProducts(prev => [...prev, newProduct]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-turquoise-dark mb-6">
            Nos Tarifs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez le pack qui correspond à vos besoins et créez des vidéos qui performent
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              title={plan.title}
              subtitle={plan.subtitle}
              price={plan.price}
              originalPrice={plan.originalPrice}
              features={plan.features}
              isPopular={plan.isPopular}
              onFormatChange={(format) => handleFormatChange(plan.id, format)}
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
              {selectedProducts.map((product) => (
                <div key={product.id} className="flex justify-between items-center py-3 border-b border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">{product.title}</h4>
                    <p className="text-sm text-gray-600">Format: {product.format}</p>
                  </div>
                  <span className="font-bold text-turquoise-dark">{product.price}€</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center py-4 border-t-2 border-turquoise-light">
              <span className="text-xl font-bold text-gray-900">Total:</span>
              <span className="text-3xl font-bold text-turquoise-dark">{totalPrice}€</span>
            </div>

            {selectedProducts.length < 3 && (
              <div className="text-center mt-6">
                <Button 
                  onClick={addSecondProduct}
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
    </div>
  );
};

export default Pricing;
