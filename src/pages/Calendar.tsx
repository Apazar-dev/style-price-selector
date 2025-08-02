import React from 'react';
import CalendarView from '@/components/CalendarView';

const Calendar = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calendrier des Commandes
          </h1>
          <p className="text-lg text-gray-600">
            Planification et suivi de vos projets vidéo
          </p>
        </div>
        <CalendarView />
      </div>
    </div>
  );
};

export default Calendar;