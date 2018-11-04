import React, { Component } from 'react';

const Context = React.createContext();
export default Context.Consumer;

export class Provider extends Component {
  constructor() {
    super();

    this.state = {
      agendaReference: null,
      setAgendaReference: (agendaRef) => {
        console.log('agendaRef set', agendaRef);
        this.setState({ agendaReference: agendaRef });
      },
      showAgenda: () => {
        const agendaRef = this.state.agendaReference;
        console.log('agendaRef', agendaRef);
        // if (agendaRef.state.calendarScrollable) {
            agendaRef.setScrollPadPosition(agendaRef.initialScrollPadPosition(), true);
            agendaRef.setState({ calendarScrollable: false })
            agendaRef.calendar.scrollToDay(agendaRef.state.selectedDay.clone(), agendaRef.calendarOffset(), true);
        // } else {
        //     agendaRef.setScrollPadPosition(0, true);
        //     agendaRef.enableCalendarScrolling();
        // }
      },
      setSelectedDate: (date) => {
        this.state.agendaReference._chooseDayFromCalendar(date);
      },
      showIngredients: () => null,
      setShowIngredients: (showIngredients) => {
        this.setState({ showIngredients: showIngredients });
      },
      showNutrition: () => null,
      setShowNutrition: (showNutrition) => {
        this.setState({ showNutrition: showNutrition });
      },
      meals: { },
      setMeals: (meals) => {
        this.setState({ meals: meals });
      },
      getMeals: () => this.state.meals,
      favorites: [],
      setFavorites: (favorites) => {
        this.setState({ favorites: favorites });
      },
      getFavorites: () => this.state.favorites,
    }
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}