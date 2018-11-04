import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { Agenda } from 'react-native-calendars';
import Consumer from './Context';

class Plan extends Component {
  constructor() {
    super();

    AsyncStorage.getItem('meals')
      .then(meals => {
        if (meals) {
          meals = JSON.parse(meals);
          this.setState({ meals: meals });
          this.props.setMeals(meals);
        }
      });
    
    this.state = { 
      meals: {}
    };
  }
  handleAgendaRef = (agendaRef) => {
    this.props.setAgendaReference(agendaRef);
  }
  render() {
    const meals = this.props.navigation.getParam('meals', this.state.meals);
    const displayDate = this.props.navigation.getParam('displayDate', null);
    console.log('displayDate', displayDate);
    Object.keys(meals).forEach(day => {
      let calories = 0;
      console.log('day', day);
      meals[day].forEach((meal, i) => {
        const recipe = meal.recipe;
        calories += recipe.nutrition.calories;
        console.log('i', i);
        console.log('meals[day].length - 1', meals[day].length - 1);
        if (i === meals[day].length - 1 ) {
          recipe.dailyCalories = calories;
        } else {
          recipe.dailyCalories = null;
        }
      })
    });
    return (
      <View style={styles.container}>
        <Agenda
          ref={this.handleAgendaRef}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#5f3206',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#5a572e',
            dayTextColor: '#5a572e',
            textDisabledColor: '#d9e1e8',
            dotColor: '#5f3206',
            selectedDotColor: '#ffffff',
            arrowColor: '#5a572e',
            monthTextColor: '#5a572e',
            agendaKnobColor: '#5a572e',
            agendaDayTextColor: '#5a572e',
            agendaDayNumColor: '#5a572e',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textMonthFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
          items={meals}
          selected={displayDate}
          rowHasChanged={(r1, r2) => r1.id !== r2.id}
          renderItem={item => {
            const recipe = item.recipe;
            const image_link = recipe ? recipe._links ? recipe._links.filter(link => link.rel === 'image')[0] : null : null;
            const image_href = recipe ? image_link ? image_link.href : null : null;
            return (
              <View key={item.id} style={styles.recipe}>
                <TouchableOpacity style={{ width: '100%', height: 145, borderRadius: 6, overflow: 'hidden' }} onPress={() => this.props.navigation.navigate('Recipe', { recipe: recipe })}>
                  <Avatar containerStyle={{ width: '100%', height: '100%' }} avatarStyle={{ width: '100%', height: '100%' }} source={{ uri: image_href }} />
                </TouchableOpacity>
                <View style={{ width: '90%', backgroundColor: '#fff', overflow: 'hidden', paddingVertical: 15, justifyContent: 'flex-start' }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Recipe', { recipe: recipe })}>
                    <Text style={styles.text}>{recipe.name}</Text>
                  </TouchableOpacity>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {recipe.wellnessKeys ? recipe.wellnessKeys.map(key => <View key={key} style={{ padding: 10, marginHorizontal: 8 }}><Text style={{fontWeight: 'bold', color: '#9c7b1f'}}>{key}</Text></View>) : null}
                      {recipe.promotions ? recipe.promotions.seasons ? recipe.promotions.seasons.map(season => <View key={season} style={{ padding: 10, marginHorizontal: 8, color: '#9c7b1f' }}><Text style={{fontWeight: 'bold'}}>{season}</Text></View>) : null : null}
                    </View>
                  </ScrollView>
                  {recipe.dailyCalories ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ padding: 10, marginHorizontal: 8 }}><Text style={{fontWeight: 'bold', color: '#5a572e'}}>{`Daily Calorie Total: ${recipe.dailyCalories}`}</Text></View>
                  </View> : null}
                </View>
              </View>
            );
          }}
          renderEmptyData = {() => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Search')}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#5f3206' }}>Find some meals</Text>
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#5f3206' }}>to plan!</Text>
            </TouchableOpacity></View>}
          pastScrollRange={2}
          futureScrollRange={12}
        />
      </View>
    )
  }
}

export default (props) => <Consumer>
  {({ setAgendaReference, setMeals }) => <Plan {...props} setAgendaReference={setAgendaReference} setMeals={setMeals} />}
</Consumer>

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  queryContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  query: {
    color: '#000',
    fontSize: 18,
    padding: 0,
    margin: 0,
    height: '100%',
    textAlignVertical: 'center'
  },
  flatContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  flat: {
    paddingVertical: 20
  },
  // ingredient: {
  //   height: 40,
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  recipe: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    // borderWidth: 2,
    // borderColor: 'rgba(0, 0, 0, 0.25)',
    marginHorizontal: 35,
    marginVertical: 10,
    overflow: 'hidden',
  },
  text: {
    color: '#5a572e',
    fontWeight: 'bold',
    fontSize: 18
  }
});
