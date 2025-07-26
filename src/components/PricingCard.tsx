
import React from 'react';
import { Check, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Feature {
  text: string;
  included: boolean;
  details?: string[];
}

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  features: Feature[];
  isPopular?: boolean;
  onFormatChange: (format: string) => void;
  selectedFormat: string;
  isSelected: boolean;
  onSelect: () => void;
}

const PricingCard = ({ 
  title, 
  subtitle, 
  price, 
  originalPrice, 
  features, 
  isPopular = false,
  onFormatChange,
  selectedFormat,
  isSelected,
  onSelect
}: PricingCardProps) => {
  return (
    <div className={`relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
      isPopular 
        ? 'bg-turquoise-light text-white scale-105' 
        : 'bg-white hover:shadow-xl'
    } ${isSelected ? 'ring-4 ring-turquoise-light' : ''}`}>
      {isPopular && (
        <div className="absolute top-0 left-0 right-0 bg-turquoise-dark text-white text-center py-2 text-sm font-medium">
          Le plus populaire
        </div>
      )}
      
      <div className={`p-8 ${isPopular ? 'pt-16' : ''}`}>
        <div className="text-center mb-6">
          <h3 className={`text-lg font-semibold mb-2 ${
            isPopular ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h3>
          <p className={`text-sm mb-4 ${
            isPopular ? 'text-white opacity-90' : 'text-gray-600'
          }`}>
            {subtitle}
          </p>
          
          <div className="mb-4">
            <span className={`text-5xl font-bold ${
              isPopular ? 'text-white' : 'text-turquoise-dark'
            }`}>
              {price}€
            </span>
            {originalPrice && (
              <span className={`text-2xl line-through ml-2 ${
                isPopular ? 'text-white opacity-70' : 'text-gray-400'
              }`}>
                {originalPrice}€
              </span>
            )}
          </div>

          <div className="mb-6">
            <Select onValueChange={onFormatChange} value={selectedFormat}>
              <SelectTrigger className={`w-full ${
                isPopular 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white border-turquoise-light'
              }`}>
                <SelectValue placeholder="Choisir le format" />
              </SelectTrigger>
              <SelectContent className="bg-white border-turquoise-light">
                <SelectItem value="micro-trottoir">Micro trottoir</SelectItem>
                <SelectItem value="scripte">Scripté</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <button
            onClick={onSelect}
            className={`w-full py-3 px-6 rounded-full font-medium transition-all duration-300 ${
              isSelected
                ? isPopular 
                  ? 'bg-white text-turquoise-dark' 
                  : 'bg-turquoise-dark text-white'
                : isPopular 
                  ? 'bg-white text-turquoise-dark hover:bg-white/90' 
                  : 'bg-turquoise-light text-white hover:bg-turquoise-dark'
            }`}
          >
            {isSelected ? 'Sélectionné' : 'Sélectionner ce pack'}
          </button>
        </div>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className={`flex-shrink-0 mt-1 ${
                feature.included 
                  ? isPopular ? 'text-white' : 'text-green-500'
                  : 'text-gray-400'
              }`}>
                {feature.included ? <Check size={16} /> : <X size={16} />}
              </div>
              <div className={`ml-3 text-sm ${
                isPopular 
                  ? 'text-white' 
                  : feature.included ? 'text-gray-900' : 'text-gray-400'
              }`}>
                <p className={feature.included ? '' : 'line-through'}>{feature.text}</p>
                {feature.details && feature.included && (
                  <ul className={`mt-1 ml-4 list-disc space-y-1 ${
                    isPopular ? 'text-white opacity-90' : 'text-gray-600'
                  }`}>
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="text-xs">{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
