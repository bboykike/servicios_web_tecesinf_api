import React, {useEffect} from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import esLocale from '@fullcalendar/core/locales/es';
import listPlugin from '@fullcalendar/list';

import styled from 'styled-components';
import {TextField, Button, NativeSelect} from '@material-ui/core';
import {Cookies} from 'react-cookie'
import {Formik} from 'formik';
import Api from '../../Helpers/Api';
import axios from 'axios';


export default class FullCalendario extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: [],
    serviciosSE:[]
  }
 
  componentDidMount() {
    Api.get(`ServiciosSEs`)
      .then(res => {
        const serviciosSE = res.data;
        console.log(serviciosSE)
        this.setState({ serviciosSE });
      })
  }

  
// {this.state.serviciosSE.map(servicio =>{servicio.Problema})}

  render() {
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
          locale="es"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={[{title: 'evento', date: '', color:'#000'}]} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
         
          />
        </div>
      </div>
    )
  }

 

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>        
        <div className='demo-app-sidebar-section'>
          <label>
            <input style={{display:"none"}}
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>Total de eventos ({this.state.currentEvents.length})</h2>
          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Ingrese un nuevo título para su evento')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`¿Estás seguro de que quieres eliminar el evento? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}
