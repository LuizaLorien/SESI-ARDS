import React, { useState } from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../styles/Calendario.css';

let eventGuid = 0;

export const Eventos_Iniciais = [
  {
    id: CriarEventoId(),
    title: 'Reunião de Planejamento',
    start: '2024-07-31T14:00:00',
  },
  {
    id: CriarEventoId(),
    title: 'Reunião de Equipe',
    start: '2024-07-31T14:00:00',
  }
];

export function CriarEventoId() {
  return String(eventGuid++);
}

export default function DemostracaoApp() {
  const [semanasVisiveis, setSemanasVisiveis] = useState(true);
  const [eventosAtuais, setEventosAtuais] = useState([]);
  const [modalInfo, setModalInfo] = useState(null);

  function fimDeSemana() {
    setSemanasVisiveis(!semanasVisiveis);
  }

  function handleDateSelect(selectInfo) {
    setModalInfo({
      type: 'create',
      start: selectInfo.start,
      end: selectInfo.end,
      calendarApi: selectInfo.view.calendar
    });
  }

  function handleEventClick(clickInfo) {
    setModalInfo({
      type: 'confirm',
      event: clickInfo.event
    });
  }

  function handleEvents(events) {
    setEventosAtuais(events);
  }

  function handleModalClose() {
    setModalInfo(null);
  }

  function handleEventCreate(title, horarioInicial, horarioFinal) {
    let [startHour, startMinute] = horarioInicial.split(':').map(Number);
    let [endHour, endMinute] = horarioFinal.split(':').map(Number);

    let startDate = new Date(modalInfo.start);
    let endDate = new Date(modalInfo.end);

    startDate.setHours(startHour, startMinute);
    endDate.setHours(endHour, endMinute);

    modalInfo.calendarApi.unselect();

    modalInfo.calendarApi.addEvent({
      id: CriarEventoId(),
      title,
      start: startDate,
      end: endDate,
      allDay: false
    });

    handleModalClose();
  }

  function handleEventRemove() {
    modalInfo.event.remove();
    handleModalClose();
  }

  return (
    <div className='demo-app'>
      <Sidebar
        semanasVisiveis={semanasVisiveis}
        fimDeSemana={fimDeSemana}
        EventosAtuais={eventosAtuais}
      />
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={semanasVisiveis}
          initialEvents={Eventos_Iniciais}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />
      </div>
      {modalInfo && (
        <Modal
          info={modalInfo}
          onClose={handleModalClose}
          onCreate={handleEventCreate}
          onRemove={handleEventRemove}
        />
      )}
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText ? eventInfo.timeText : ''}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function Sidebar({ EventosAtuais }) {
  return (
    <div className='demo-app-sidebar'>
      <div className='demo-app-sidebar-section'>
      </div>
      <div className='demo-app-sidebar-section'>
        <h2>Reuniões Marcadas ({EventosAtuais.length})</h2>
        <ul>
          {EventosAtuais.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function SidebarEvent({ event }) {
  const horarioInicial = event.start ? new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '';
  const horarioFinal = event.end ? new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '';

  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <span>{horarioInicial && horarioFinal ? ` ${horarioInicial} - ${horarioFinal}` : ''} </span>
      <i>{' ' + event.title}</i>
    </li>
  );
}

function Modal({ info, onClose, onCreate, onRemove }) {
  const [title, setTitle] = useState('');
  const [horarioInicial, setHorarioInicial] = useState('10:00');
  const [horarioFinal, setHorarioFinal] = useState('12:00');

  function handleSubmit() {
    if (info.type === 'create') {
      if (!title) {
        alert('Título é obrigatório.');
        return;
      }
      if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(horarioInicial) || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(horarioFinal)) {
        alert('Formato de hora inválido. Por favor, use HH:MM no formato 24 horas.');
        return;
      }
      onCreate(title, horarioInicial, horarioFinal);
    } else if (info.type === 'confirm') {
      if (window.confirm(`Você tem certeza que quer remover esse evento? '${info.event.title}'`)) {
        onRemove();
      }
    }
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='modal-close' onClick={onClose}>&times;</button>
        {info.type === 'create' ? (
          <>
            <h2 className="h2Modal">Marcar Evento</h2>
            <input
              type='text'
              placeholder='Título do evento'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type='text'
              placeholder='Hora de início (HH:MM)'
              value={horarioInicial}
              onChange={(e) => setHorarioInicial(e.target.value)}
            />
            <input
              type='text'
              placeholder='Hora de término (HH:MM)'
              value={horarioFinal}
              onChange={(e) => setHorarioFinal(e.target.value)}
            />
            <button onClick={handleSubmit}>Salvar</button>
          </>
        ) : (
          <>
            <h2>Confirmar Remoção</h2>
            <p>Você tem certeza que deseja remover o evento: <strong>{info.event.title}</strong>?</p>
            <button onClick={handleSubmit}>Confirmar</button>
            <button onClick={onClose}>Cancelar</button>
          </>
        )}
      </div>
    </div>
  );
}
