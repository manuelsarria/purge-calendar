import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

  const dispatch = useDispatch();
  
  const {  events, activeEvent } = useSelector( state => state.calendar );

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
      dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
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

  }
}
