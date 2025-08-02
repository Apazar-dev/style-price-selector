import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OrderBlock from './OrderBlock';
interface Order {
  id: string;
  name: string;
  client: string;
  videoCount: number;
  format: 'scripté' | 'interview' | 'micro-trottoir' | 'personnalisé';
  startDate: Date;
  color: string;
}
const mockOrders: Order[] = [{
  id: '1',
  name: 'Campagne Produit A',
  client: 'TechCorp',
  videoCount: 5,
  format: 'scripté',
  startDate: new Date(2024, 7, 5),
  // 5 août 2024
  color: 'bg-red-500'
}, {
  id: '2',
  name: 'Interview CEO',
  client: 'StartupXYZ',
  videoCount: 3,
  format: 'interview',
  startDate: new Date(2024, 7, 15),
  // 15 août 2024
  color: 'bg-blue-500'
}, {
  id: '3',
  name: 'Enquête Client',
  client: 'RetailPlus',
  videoCount: 8,
  format: 'micro-trottoir',
  startDate: new Date(2024, 7, 25),
  // 25 août 2024
  color: 'bg-yellow-500'
}, {
  id: '4',
  name: 'Formation Interne',
  client: 'EducaGroup',
  videoCount: 4,
  format: 'scripté',
  startDate: new Date(2024, 8, 10),
  // 10 septembre 2024
  color: 'bg-red-500'
}, {
  id: '5',
  name: 'Projet Spécial',
  client: 'CreativeAgency',
  videoCount: 2,
  format: 'personnalisé',
  startDate: new Date(2024, 8, 1),
  // 1er septembre 2024
  color: 'bg-green-500'
}];
const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 7, 1)); // Août 2024
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Lundi = 0
  };
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };
  const isOrderActiveOnDay = (order: Order, day: number, month: number, year: number) => {
    const checkDate = new Date(year, month, day);
    const endDate = new Date(order.startDate);
    endDate.setDate(endDate.getDate() + 29); // 30 jours total

    return checkDate >= order.startDate && checkDate <= endDate;
  };
  const getOrdersForDay = (day: number) => {
    return mockOrders.filter(order => isOrderActiveOnDay(order, day, currentDate.getMonth(), currentDate.getFullYear()));
  };
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  return <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header avec navigation */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => navigateMonth('prev')} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Précédent
        </Button>
        
        <h2 className="text-2xl font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        <Button variant="outline" onClick={() => navigateMonth('next')} className="flex items-center gap-2">
          Suivant
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* En-têtes des jours */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>)}
      </div>

      {/* Grille du calendrier */}
      <div className="grid grid-cols-7 gap-1">
        {/* Cases vides pour les jours avant le début du mois */}
        {Array.from({
        length: firstDayOfMonth
      }, (_, i) => <div key={`empty-${i}`} className="h-24"></div>)}
        
        {/* Jours du mois */}
        {Array.from({
        length: daysInMonth
      }, (_, i) => {
        const day = i + 1;
        const ordersForDay = getOrdersForDay(day);
        const isExpanded = expandedDay === day;
        const displayedOrders = isExpanded ? ordersForDay : ordersForDay.slice(0, 2);
        
        return <div 
              key={day} 
              className={`border border-gray-200 p-1 relative transition-all duration-200 ${
                isExpanded ? 'h-auto min-h-32 z-10 bg-white shadow-lg' : 'h-24'
              }`}
            >
              <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
              <div className="space-y-1">
                {displayedOrders.map(order => <OrderBlock key={order.id} order={order} isCompact />)}
                {ordersForDay.length > 2 && !isExpanded && (
                  <button 
                    onClick={() => setExpandedDay(day)}
                    className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer underline"
                  >
                    +{ordersForDay.length - 2} autres
                  </button>
                )}
                {isExpanded && (
                  <button 
                    onClick={() => setExpandedDay(null)}
                    className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer underline"
                  >
                    Réduire
                  </button>
                )}
              </div>
            </div>;
      })}
      </div>

      {/* Légende */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Formats de vidéo</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">Scripté</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Interview</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-600">Micro-trottoir</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Personnalisé</span>
          </div>
        </div>
      </div>
    
    </div>;
};
export default CalendarView;