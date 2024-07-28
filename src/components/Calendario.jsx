import React, { useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './Calendario.css'

let eventGuid = 0

export const Eventos_Iniciais = [
  {
    id: CriarEventoId(),
    title: 'All-day event',
    start: '2024-07-08',
    allDay: true
  },
  {
    id: CriarEventoId(),
    title: 'Timed event',
    start: '2024-07-08T12:00:00',
    end: '2024-07-08T13:00:00',
    allDay: false
  }
]

export function CriarEventoId() {
  return String(eventGuid++)
}

export default function DemostracaoApp() {
  const [semanasVisiveis, setSemanasVisiveis] = useState(true)
  const [EventosAtuais, setEventosAtuais] = useState([])

  function fimDeSemana() {
    setSemanasVisiveis(!semanasVisiveis)
  }

  function handleDateSelect(selectInfo) {
    let title = prompt('Insira um título para o seu evento:')

    if (!title) {
      return
    }

    let horarioInicial = prompt('Insira a hora de início (HH:MM):', '10:00')
    let horarioFinal = prompt('Insira a hora de término (HH:MM):', '12:00')

    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(horarioInicial) || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(horarioFinal)) {
      alert('Formato de hora inválido. Por favor, use HH:MM no formato 24 horas.')
      return
    }

    let [startHour, startMinute] = horarioInicial.split(':').map(Number)
    let [endHour, endMinute] = horarioFinal.split(':').map(Number)

    let startDate = new Date(selectInfo.start)
    let endDate = new Date(selectInfo.end)

    startDate.setHours(startHour, startMinute)
    endDate.setHours(endHour, endMinute)

    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect()

    calendarApi.addEvent({
      id: CriarEventoId(),
      title,
      start: startDate,
      end: endDate,
      allDay: false
    })
  }

  function handleEventClick(clickInfo) {
    if (confirm(`Você tem certeza que quer remover esse evento? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  function handleEvents(events) {
    setEventosAtuais(events)
  }

  return (
    <div className='demo-app'>
      <Sidebar
        semanasVisiveis={semanasVisiveis}
        fimDeSemana={fimDeSemana}
        EventosAtuais={EventosAtuais}
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
    </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText ? eventInfo.timeText : ''}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function Sidebar({ semanasVisiveis, fimDeSemana, EventosAtuais }) {
  return (
    <div className='demo-app-sidebar'>
      <div className='demo-app-sidebar-section'>
        <label>
          <input
            type='checkbox'
            checked={semanasVisiveis}
            onChange={fimDeSemana}
          ></input>
          <strong>Mostrar Sábado e Domingo</strong>
        </label>
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
  )
}

function SidebarEvent({ event }) {
  const horarioInicial = event.start ? new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : ''
  const horarioFinal = event.end ? new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : ''

  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <span>{horarioInicial && horarioFinal ? ` ${horarioInicial} - ${horarioFinal}` : ''} </span>
      <i>{' ' + event.title}</i>
    </li>
  )
}
