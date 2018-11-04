import React from 'react';
import { Alert, AsyncStorage, Dimensions, StyleSheet, View, ScrollView, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Header, FormInput, Text, Icon, Avatar } from 'react-native-elements';
import Tts from 'react-native-tts';
import Voice from 'react-native-voice';
import Consumer from './Context';
import firebase from 'react-native-firebase';

class Search extends React.Component {
  constructor() {
    super();

    Voice.onSpeechStart = this.handleSpeechStart;
    Voice.onSpeechError = this.handleSpeechError;
    Voice.onSpeechResults = this.handleSpeechResults;

    this.state = {
      searching: true,
      timeoutId: null,
      query: '',
      recipes: [],
      filtered: [],
      queried: [],
      ingredients: [],
      end: 10,
    };
  }
  componentDidMount = async () => {
    await Tts.getInitStatus();
    console.log('TTS is ready');
    try {
    //   console.log(await this.getCookingTechniques());
    //   console.log(await this.getCookingTechniques({ id: 0 }));
    //   console.log(await this.getRecipes());
      const recipes = await this.getRecipes();
      // console.log(recipes);
      this.setState({ recipes: recipes }, async () => {
        this.setState({ filtered: await this.loadRecipes({ recipes: this.state.recipes, start: 0, end: this.state.end }), searching: false }, () => {
          // console.log('filtered', this.state.filtered);
        });
      });
      // console.log(await this.getRecipe({ id: 21355 }));
    //   const milkSearch = await this.searchIngredients({ query: 'milk' });
    //   console.log(milkSearch);
    //   console.log(await this.getProduct({ sku: milkSearch.results[0].sku }));
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  getRecipes = () => {
    return new Promise((resolve, reject) => {
      fetch(`https://api.wegmans.io/meals/recipes?api-version=2018-10-18`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Subscription-Key': '770b29ba2da74e6f804bf153aff48a04'
        }
      })
        .then(res => res.json())
        .then(recipes => resolve(recipes.recipes))
        .catch(err => reject(err));
    });
  }
  getRecipe = ({ id }) => {
    return new Promise((resolve, reject) => {
      fetch(`https://api.wegmans.io/meals/recipes/${id}?api-version=2018-10-18`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Subscription-Key': '770b29ba2da74e6f804bf153aff48a04'
        }
      })
        .then(res => res.json())
        .then(recipe => resolve(recipe))
        .catch(err => reject(err));
    });
  }
  loadRecipes = async ({ recipes, start, end }) => {
    return new Promise(async (resolve, reject) => {
      // console.log('start', start);
      // console.log('end', end);
      const slice = [];
      for (let i = start; i < end; i++) {
        if (recipes[i]) {
          const recipe = await this.getRecipe({ id: recipes[i].id });
          if (recipe) {
            slice.push(recipe);
          }
        }
      }
      // console.log('this.state.end', this.state.end);
      // console.log('slice', slice);
      // console.log('end - start', end - start);
      this.setState({ end: this.state.end + (end - start) }, () => resolve(slice));
    });
  }
  handleEndReached = async () => {
    if (this.state.end < this.state.recipes.length) {
      this.setState({ searching: true }, async () => {
        const slice = await this.loadRecipes({ recipes: this.state.recipes, start: this.state.end, end: this.state.end + 10 });
        let filtered = this.state.filtered.slice(0);
        // console.log('filtered [1]', filtered);
        // console.log('slice', slice);
        filtered = filtered.concat(slice);
        // console.log('filtered [2]', filtered);
        this.setState({ filtered: filtered }, () => {
          console.log('filtered', this.state.filtered);
          this.setState({ searching: false });
        });
      });
    }
  }
  handleQueryChange = (query) => {
    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }
    const timeoutId = setTimeout(() => {
      this.setState({ query: query }, async () => {
        const filtered = this.state.recipes.filter(recipe => recipe.name.toLowerCase().includes(query.toLowerCase()));
        this.setState({ queried: await this.loadRecipes({ recipes: filtered, start: 0, end: 10 }), searching: false, end: 10 });
      });
    }, 550);
    this.setState({ searching: true, timeoutId: timeoutId });
  }
  startListening = async () => {
    try {
      if (await Voice.isAvailable() && !(await Voice.isRecognizing())) {
        await Voice.start('en-US');
        this.setState({ searching: true });
        console.log('started');
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  }
  handleSpeechStart = () => this.setState({ searching: true });
  handleSpeechResults = async (evt) => {
    const query = evt.value[0].toLowerCase();
    console.log('query', query);
    console.log('Tts.speak', Tts.speak);
    if (query.includes("plan") || query.includes("cleaner") || query.includes("can") || query.includes("atlanta") || query.includes("find") || query.includes("funny") || query.includes("play") || (query.includes("plan") || query.includes("planning") || query.includes("planet") || query.includes("planing")) && (query.includes("meal") || query.includes("mail") || query.includes("mill") || query.includes("legal"))) {
      const date = new Date();
      let month = null;
      if (query.includes("january")) {
        month = "01";
      } else if (query.includes("february")) {
        month = "02";
      } else if (query.includes("march")) {
        month = "03";
      } else if (query.includes("april")) {
        month = "04";
      } else if (query.includes("may")) {
        month = "05";
      } else if (query.includes("june")) {
        month = "06";
      } else if (query.includes("july")) {
        month = "07";
      } else if (query.includes("august")) {
        month = "08";
      } else if (query.includes("september")) {
        month = "09";
      } else if (query.includes("october")) {
        month = "10";
      } else if (query.includes("november")) {
        month = "11";
      } else if (query.includes("december")) {
        month = "12";
      }
      let day = query.split(" ").filter(part => part.match(/\d/g))[0].slice(0, -2);
      day = day.length === 1 ? "0" + day : day;
      let year = Number(month) > date.getMonth() && Number(month) <= 12 ? date.getFullYear() : date.getFullYear() + 1;
      let order = query.split(" ");
      let option1 = order.slice(1, order.length - 4).join(" ");
      let option2 = order.slice(2, order.length - 4).join(" ");
      console.log('option1', option1);
      console.log('option2', option2);
      let meal = this.state.recipes.filter(recipe => recipe.name.toLowerCase().includes(option1));
      console.log('meal [1]', meal);
      meal = meal.length ? meal : this.state.recipes.filter(recipe => recipe.name.toLowerCase().includes(option2));
      console.log('meal [2]', meal);
      if (meal.length && year && month && day) {
        let key = `${year}-${month}-${day}`;
        console.log('key', key);
        meal = await this.getRecipe({ id: meal[Math.floor(Math.random() * meal.length)].id });
        console.log('meal', meal);
        let meals = await AsyncStorage.getItem('meals');
        meals = meals ? JSON.parse(meals) : {};
        console.log('meals [1]', meals);
        let list = meals[key];
        list = list ? list : [];
        console.log('list [1]', list);
        list.push({
          id: Date.now().toString(36) + Math.random().toString(36).slice(2),
          recipe: meal,
        });
        console.log('list [2]', list);
        meals[key] = list;
        console.log('meals [2]', meals);
        Tts.speak("Meal scheduled for " + ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][Number(month) - 1] + " " + day);
        this.props.showAgenda();
        this.props.setSelectedDate(key);
        this.props.navigation.navigate('Plan', { meals: meals, displayDate: key });
        AsyncStorage.setItem('meals', JSON.stringify(meals));
        this.props.setMeals(meals);
      } else {
        Tts.speak("I didn't quite get that. Please try again.");
      }
    } else if (query.includes("nutrition") && (query.includes("facts"))) {
      console.log('query', query);
      const split = query.split(" ");
      const option = (split.slice(split.indexOf("facts") + 2, split.length)).join(" ");
      let meals = this.state.recipes.filter(recipe => recipe.name.toLowerCase().includes(option));
      if (meals.length) {
        console.log('meals', meals);
        this.props.setMeals(meals);
        this.props.navigation.navigate('Recipe', { recipe: await this.getRecipe({ id: meals[Math.floor(Math.random() * meals.length)].id }) });
        setTimeout(() => {
          this.props.showNutrition();
        }, 500);
      } else {
        Tts.speak("I didn't quite get that. Please try again.");
      }
    } else if (query.includes("ingredients")) {
      console.log('query', query);
      const split = query.split(" ");
      const option = (split.slice(split.indexOf("facts") + 2, split.length)).join(" ");
      let meals = this.state.recipes.filter(recipe => recipe.name.toLowerCase().includes(option));
      if (meals.length) {
        console.log('meals', meals);
        this.props.setMeals(meals);
        this.props.navigation.navigate('Recipe', { recipe: await this.getRecipe({ id: meals[Math.floor(Math.random() * meals.length)].id }) });
        setTimeout(() => {
          this.props.showIngredients();
        }, 500);
      } else {
        Tts.speak("I didn't quite get that. Please try again.");
      }
    } else if (query.includes("daily") && query.includes("calorie") && query.includes("count")) {
      const date = new Date();
      console.log('query', query);
      const split = query.split(" ");
      console.log('split', split);
      const option = (split.slice(split.indexOf("count") + 2, split.length));
      let month = option[0];
      if (month === "january") {
        month = "01";
      } else if (month === "february") {
        month = "02";
      } else if (month === "march") {
        month = "03";
      } else if (month === "april") {
        month = "04";
      } else if (month === "may") {
        month = "05";
      } else if (month === "june") {
        month = "06";
      } else if (month === "july") {
        month = "07";
      } else if (month === "august") {
        month = "08";
      } else if (month === "september") {
        month = "09";
      } else if (month === "october") {
        month = "10";
      } else if (month === "november") {
        month = "11";
      } else if (month === "december") {
        month = "12";
      }
      let day = query.split(" ").filter(part => part.match(/\d/g))[0].slice(0, -2);
      day = day.length === 1 ? "0" + day : day;
      let year = Number(month) > date.getMonth() && Number(month) <= 12 ? date.getFullYear() : date.getFullYear() + 1;
      if (year && month && day) {
        const meals = this.props.getMeals();
        console.log('meals', meals);
        console.log('day', `${year}-${month}-${day}`);
        const daily = meals[`${year}-${month}-${day}`];
        console.log('daily', daily);
        if (daily && daily.length) {
          let calories = 0;
          daily.forEach((meal, i) => {
            const recipe = meal.recipe;
            calories += recipe.nutrition.calories;
            if (i === daily.length - 1 ) {
              Tts.speak("Daily calorie count for " + ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][Number(month) - 1] + " " + day + "is " + calories + " calories.");
            }
          });
        } else {
          Tts.speak("I'm sorry, there are no meals scheduled for that day.");
        }
      } else {
        Tts.speak("I didn't quite get that. Please try again.");
      }
    } else {
      this._inputRef.input.setNativeProps({ text: query });
      this.handleQueryChange(query);
    }
    this.setState({ searching: false });
  }
  handleSpeechError = (err) => { console.error("Error: ", err); Tts.speak("I didn't get that. Please try again"); };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.queryContainer}>
          <Header
            outerContainerStyles={{ backgroundColor: '#eccb7a', flex: 1, alignItems: 'center', justifyContent: 'center' }}
            leftComponent={<View style={{ paddingTop: 7 }}><Icon name="magnifying-glass" type="entypo" size={24} color="#fff" containerStyle={{ height:'100%', alignItems: 'center', justifyContent: 'center' }} /></View>}
            centerComponent={<FormInput ref={inputRef => this._inputRef = inputRef}
              placeholder="Search for recipe."
              placeholderTextColor="#fff"
              inputStyle={styles.query}
              containerStyle={{ width: window.width * 0.7, height: '100%', overflow: 'hidden' }}
              onChangeText={this.handleQueryChange}
            />}
            rightComponent={<TouchableOpacity onPress={this.startListening}>
              <View style={{ paddingTop: 7, paddingRight: 5 }}>
                <Icon name="microphone" type="font-awesome" size={24} color="#fff" containerStyle={{ height:'100%', alignItems: 'center', justifyContent: 'center' }} />
              </View>
            </TouchableOpacity>}
          />
        </View>
        <FlatList
          data={this.state.query ? this.state.queried : this.state.filtered}
          style={styles.flatContainer}
          contentContainerStyle={styles.flat}
          refreshControl={<RefreshControl refreshing={this.state.searching} colors={["#9c7b1f"]} />}
          keyExtractor={recipe => String(recipe.id)}
          renderItem={recipe => {
            recipe = recipe.item;
            const image_link = recipe ? recipe._links ? recipe._links.filter(link => link.rel === 'image')[0] : null : null;
            const image_href = recipe ? image_link ? image_link.href : null : null;        
            return (
              <View style={styles.recipe}>
                  <TouchableOpacity style={{ width: '100%', height: 145, borderRadius: 6, overflow: 'hidden' }} onPress={() => this.props.navigation.navigate('Recipe', { recipe: recipe })}>
                    <Avatar containerStyle={{ width: '100%', height: '100%' }} avatarStyle={{ width: '100%', height: '100%' }} source={{ uri: image_href }} />
                  </TouchableOpacity>
                  <View style={{ width: '90%', backgroundColor: '#fff', overflow: 'hidden', paddingVertical: 15, justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Recipe', { recipe: recipe })}>
                      <Text style={styles.text}>{recipe.name}</Text>
                    </TouchableOpacity>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {recipe.wellnessKeys ? recipe.wellnessKeys.map(key => <View key={key} style={{ padding: 10, marginHorizontal: 8 }}><Text style={{fontWeight: 'bold', color: '#9c7b1f' }}>{key}</Text></View>) : null}
                        {recipe.promotions ? recipe.promotions.seasons ? recipe.promotions.seasons.map(season => <View key={season} style={{ padding: 10, marginHorizontal: 8 }}><Text style={{fontWeight: 'bold', color: '#9c7b1f'}}>{season}</Text></View>) : null : null}
                      </View>
                    </ScrollView>
                  </View>
              </View>
            );
          }}
          // ListHeaderComponent={<View style={{ paddingTop: 20 }} />}
          // ListEmptyComponent={<View style={{ flex: 1 }}>{this.state.query && !this.state.searching ? <Text style={styles.text}>No recipes found</Text> : null}</View>}
          ListEmptyComponent={<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text style={styles.text}>{this.state.searching ? '' : 'No recipes found'}</Text></View>}
          // ListFooterComponent={<View style={{ paddingBottom: 20 }} />}
          onEndReached={this.handleEndReached}
          onEndReachedThreshold={1.5}
        />
      </View>
    );
  }
}

export default (props) => <Consumer>
  {({ showAgenda, setSelectedDate, showIngredients, showNutrition, setMeals, getMeals }) => <Search {...props} showAgenda={showAgenda} setSelectedDate={setSelectedDate} showIngredients={showIngredients} showNutrition={showNutrition} setMeals={setMeals} getMeals={getMeals} />}
</Consumer>

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  queryContainer: {
    width: '100%',
    flexDirection: 'row',
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
