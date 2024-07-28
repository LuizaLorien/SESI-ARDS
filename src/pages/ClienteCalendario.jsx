import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../styles/ClienteCalendario.css'; 


export default function ClientPage() {
  const [eventosAtuais, setEventosAtuais] = useState([]);

  useEffect(() => {

    const carregarEventos = async () => {

      const eventos = [
 
        {
          id: '1',
          title: 'Reunião de Planejamento',
          start: '2024-07-30T10:00:00',
          end: '2024-07-30T11:00:00',
          extendedProps: { isAdmin: true }
        },
        {
          id: '2',
          title: 'Reunião de Equipe',
          start: '2024-07-31T14:00:00',
          end: '2024-07-31T15:00:00',
          extendedProps: { isAdmin: true }
        },
    
      ];

      setEventosAtuais(eventos.filter(evento => evento.extendedProps?.isAdmin));
    };

    carregarEventos();
  }, []);

  return (
    <div className='client-page'>
      <Sidebar eventos={eventosAtuais} />
      <div className='client-page-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          events={eventosAtuais}
          editable={false} 
          selectable={false} 
        />
      </div>
    </div>
  );
}

function Sidebar({ eventos }) {
  return (
    <div className='sidebar'>
      <h2>Reuniões Marcadas ({eventos.length})</h2>
      <ul>
        {eventos.map(evento => (
          <SidebarEvent key={evento.id} evento={evento} />
        ))}
      </ul>
    </div>
  );
}

function SidebarEvent({ evento }) {
  const horarioInicial = evento.start ? new Date(evento.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '';
  const horarioFinal = evento.end ? new Date(evento.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '';

  return (
    <li>
      <b>{new Date(evento.start).toLocaleDateString()}</b>
      <span>{horarioInicial && horarioFinal ? ` ${horarioInicial} - ${horarioFinal}` : ''} </span>
      <i>{' ' + evento.title}</i>
    </li>
  );
}
