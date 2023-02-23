import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent } from "../store";

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
    } else {
      dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
    }
  } 
  
  return {
    // propiedades
    activeEvent,
    events,

    // metodos
    setActiveEvent,
    startSavingEvent,

  }
}
