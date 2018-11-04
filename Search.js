import React from 'react';
import { Dimensions, StyleSheet, View, ScrollView, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Header, FormInput, Text, Icon, Avatar } from 'react-native-elements';

import firebase from 'react-native-firebase';

export default class Search extends React.Component {
  constructor() {
    super();
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
  async componentDidMount() {
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
        const filtered = this.state.recipes.filter(recipe => recipe.name.includes(query));
        this.setState({ queried: await this.loadRecipes({ recipes: filtered, start: 0, end: this.state.end }), searching: false });
      });
    }, 550);
    this.setState({ searching: true, timeoutId: timeoutId });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.queryContainer}>
          <Header
            outerContainerStyles={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}
            leftComponent={<View style={{ paddingTop: 7 }}><Icon name="magnifying-glass" type="entypo" size={24} color="#000" containerStyle={{ height:'100%', alignItems: 'center', justifyContent: 'center' }} /></View>}
            centerComponent={<FormInput
              placeholder="Search for recipe."
              placeholderTextColor="#000"
              inputStyle={styles.query}
              containerStyle={{ height: '100%' }}
              onChangeText={this.handleQueryChange}
            />}
          />
        </View>
        <FlatList
          data={this.state.query ? this.state.queried : this.state.filtered}
          style={styles.flatContainer}
          contentContainerStyle={styles.flat}
          refreshControl={<RefreshControl refreshing={this.state.searching} />}
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
                        {recipe.wellnessKeys ? recipe.wellnessKeys.map(key => <View key={key} style={{ padding: 10, marginHorizontal: 8 }}><Text style={{fontWeight: 'bold'}}>{key}</Text></View>) : null}
                        {recipe.promotions ? recipe.promotions.seasons ? recipe.promotions.seasons.map(season => <View key={season} style={{ padding: 10, marginHorizontal: 8 }}><Text style={{fontWeight: 'bold'}}>{season}</Text></View>) : null : null}
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

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18
  }
});
