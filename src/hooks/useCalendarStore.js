import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

  const dispatch = useDispatch();
  
  const {  events, activeEvent } = useSelector( state => state.calendar );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveEvent( calendarEvent ) );
  }
  
  const startSavingEvent = async( calendarEvent ) => {
    //llegar  al backend

    //todo bien

    if( calendarEvent._id ) {
      //actalizando
      dispatch( onUpdateEvent({ ...calendarEvent }) );
    } else {
      const { data } = await calendarApi.post('/events', calendarEvent);

      dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );
    }
  }

  const startLoadingEvents = async() => {
    try {

      const { data } = await calendarApi.get('/events');

      const events = convertEventsToDateEvents( data.events );

      console.log(events)
      
    } catch (error) {
      console.log('Error cargando eventos');
    }
  }

  const startDeletingEvent = () => {
    dispatch( onDeleteEvent() );
  }
  
  return {
    // propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    // metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,

  }
}
