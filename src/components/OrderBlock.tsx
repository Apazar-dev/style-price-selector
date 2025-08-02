import React from 'react';
import { Calendar, Users, Video, Clock } from 'lucide-react';

interface Order {
  id: string;
  name: string;
  client: string;
  videoCount: number;
  format: 'scripté' | 'interview' | 'micro-trottoir' | 'personnalisé';
  startDate: Date;
  color: string;
}

interface OrderBlockProps {
  order: Order;
  isCompact?: boolean;
}

const OrderBlock = ({ order, isCompact = false }: OrderBlockProps) => {
  const formatLabels = {
    'scripté': 'Scripté',
    'interview': 'Interview',
    'micro-trottoir': 'Micro-trottoir',
    'personnalisé': 'Personnalisé'
  };

  const endDate = new Date(order.startDate);
  endDate.setDate(endDate.getDate() + 29);

  if (isCompact) {
    return (
      <div className={`${order.color} text-white text-xs p-1 rounded truncate`}>
        {order.name}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-gray-900 text-sm">{order.name}</h4>
        <div className={`w-3 h-3 rounded-full ${order.color}`}></div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Users className="h-3 w-3" />
          <span>{order.client}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Video className="h-3 w-3" />
          <span>{order.videoCount} vidéo{order.videoCount > 1 ? 's' : ''}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          <span>{formatLabels[order.format]}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3" />
          <span className="text-xs">
            {order.startDate.toLocaleDateString('fr-FR')} - {endDate.toLocaleDateString('fr-FR')}
          </span>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        Durée: 30 jours
      </div>
    </div>
  );
};

export default OrderBlock;