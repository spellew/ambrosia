import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Alert, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Avatar, Icon } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import HTML from 'react-native-render-html';

export default class Recipe extends Component {
  constructor() {
    super();

    this.state = {
      isDateTimePickerVisible: false,
      recipe: null,
    };
  }
  showDateTimePicker = (callback) => this.setState({ isDateTimePickerVisible: true }, callback && typeof callback === 'function' ? callback : null);
  hideDateTimePicker = (callback) => this.setState({ isDateTimePickerVisible: false }, callback && typeof callback === 'function' ? callback : null);
  handleDatePicked = (date) => {
    this.hideDateTimePicker(async () => {
      let key = date.toLocaleDateString().split('/');
      let year = key[2], month = key[0], day = key[1];
      key = [year, month, day].join('-');
      let meals = await AsyncStorage.getItem('meals');
      meals = meals ? JSON.parse(meals) : {};
      let list = meals[key];
      list = list ? list : [];
      list.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        recipe: this.state.recipe,
      });
      meals[key] = list;
      this.props.navigation.navigate('Plan', { meals: meals });
      AsyncStorage.setItem('meals', JSON.stringify(meals));
    });
  };
  render() {
    const backup = JSON.parse('{"id":21355,"type":"recipe","name":"Singapore Noodles with Chicken & Shrimp","wellnessKeys":["Fruits/Vegetables"],"servings":{"produces":null,"min":6,"max":0},"preparationTime":{"min":40,"max":0},"cookingTime":{"min":40,"max":0},"promotions":{"seasons":["Winter"],"years":["2017"]},"nutrition":{"servingSize":"2 cups; about 11 oz","information":"Each serving (2 cups; about 11 oz) contains 350 calories, 36 g carbohydrate, (3 g fiber), 26 g protein, 11 g fat,  (2 g saturated fat), 170 mg cholesterol, and 570 mg sodium.","sodium":570,"carbohydrates":36,"cholesterol":170,"saturatedFat":2,"fat":11,"calories":350,"protein":26},"ingredients":[{"group":"Main","type":"product","name":"Peacock Rice Vermicelli","quantity":{"value":"1","unitOfMeasure":"pkg","extendedUnits":"(7 oz)","text":"1 pkg (7 oz)"},"displayOrder":1,"sku":444614,"skuQuantity":1,"_links":[{"href":"/products/444614?api-version=2018-10-18","rel":"product","type":"GET"}]},{"group":"Main","type":"product","name":"Wegmans Organic Chicken Breast for Stir-Fry","quantity":{"value":"1","unitOfMeasure":"pkg","extendedUnits":"(about 1 lb)","text":"1 pkg (about 1 lb)"},"displayOrder":2,"sku":37910,"skuQuantity":1,"_links":[{"href":"/products/37910?api-version=2018-10-18","rel":"product","type":"GET"}]},{"group":"Main","type":"product","name":"31-40 count uncooked peeled & deveined shrimp","quantity":{"value":"1/2","unitOfMeasure":"lb","extendedUnits":null,"text":"1/2 lb"},"displayOrder":3,"sku":648949,"skuQuantity":1,"_links":[{"href":"/products/648949?api-version=2018-10-18","rel":"product","type":"GET"}]},{"group":"Main","type":"product","name":"Food You Feel Good About Canola Oil, divided","quantity":{"value":"3","unitOfMeasure":"Tbsp","extendedUnits":null,"text":"3 Tbsp"},"displayOrder":4,"sku":31146,"skuQuantity":1,"_links":[{"href":"/products/31146?api-version=2018-10-18","rel":"product","type":"GET"}]},{"group":"Main","type":"product","name":"Food You Feel Good About Large Eggs, lightly beaten","quantity":{"value":"2","unitOfMeasure":null,"extendedUnits":null,"text":"2"},"displayOrder":5,"sku":80133,"skuQuantity":1,"_links":[{"href":"/products/80133?api-version=2018-10-18","rel":"product","type":"GET"}]},{"group":"Main","type":"product","name":"fresh ginger","quantity":{"value":"1","unitOfMeasure":"Tbsp","extendedUnits":"peeled, minced","text":"1 Tbsp peeled, minced"},"displayOrder":6,"sku":92693,"skuQuantity":1,"_links":[{"href":"/products/92693?api-version=2018-10-18","rel":"product","type":"GET"}]},{"group":"Main","type":"product","name":"Food You Feel Good About Cleaned & Cut Peeled Garlic","quantity":{"value":"1","unitOfMeasure":"Tbsp","extendedUnits":"minced","text":"1 Tbsp minced"},"displayOrder":7,"sku":23792,"skuQuantity":1,"_links":[{"href":"/products/23792?api-version=2018-10-18","rel":"product","type":"GET"}]},{"group":"Main","type":"product","name":"Spanish onion, peeled, thinly sliced (about 3 cups)","quantity":{"value":"1","unitOfMeasure":null,"extendedUnits":null,"text":"1"},"displayOrder":8,"sku":92661,"skuQuantity":1,"_links":[{"href":"/products/92661?api-version=2018-10-18","rel":"product","type":"GET"}]},{"group":"Main","type":"product","name":"sweet red pepper, cored, seeded, thinly sliced (about 1 1/2 cups)","quantity":{"value":"1","unitOfMeasure":null,"extendedUnits":null,"text":"1"},"displayOrder":9,"sku":3204,"skuQuantity":1,"_links":[{"href":"/products/3204?api-version=2018-10-18","rel":"product","type":"GET"}]},{"group":"Main","type":"product","name":"hot madras curry powder","quantity":{"value":"1 1/2","unitOfMeasure":"Tbsp","extendedUnits":null,"text":"1 1/2 Tbsp"},"displayOrder":10,"sku":660632,"skuQuantity":1,"_links":[{"href":"/products/660632?api-version=2018-10-18","rel":"product","type":"GET"}]},{"group":"Main","type":"product","name":"Food You Feel Good About Cleaned & Cut Asian Slaw","quantity":{"value":"1/2 of a 12 oz","unitOfMeasure":"pkg","extendedUnits":null,"text":"1/2 of a 12 oz pkg"},"displayOrder":11,"sku":74003,"skuQuantity":1,"_links":[{"href":"/products/74003?api-version=2018-10-18","rel":"product","type":"GET"}]},{"group":"Main","type":"product","name":"Wegmans Organic Chicken Broth","quantity":{"value":"1/2","unitOfMeasure":"cup","extendedUnits":null,"text":"1/2 cup"},"displayOrder":12,"sku":29769,"skuQuantity":1,"_links":[{"href":"/products/29769?api-version=2018-10-18","rel":"product","type":"GET"}]},{"group":"Main","type":"product","name":"Asian Classics Soy Sauce","quantity":{"value":"1","unitOfMeasure":"Tbsp","extendedUnits":null,"text":"1 Tbsp"},"displayOrder":13,"sku":10822,"skuQuantity":1,"_links":[{"href":"/products/10822?api-version=2018-10-18","rel":"product","type":"GET"}]},{"group":"Main","type":"product","name":"Food You Feel Good About Cleaned & Cut Snow Peas, thinly sliced","quantity":{"value":"1/2 of an 8 oz","unitOfMeasure":"pkg","extendedUnits":null,"text":"1/2 of an 8 oz pkg"},"displayOrder":14,"sku":257,"skuQuantity":1,"_links":[{"href":"/products/257?api-version=2018-10-18","rel":"product","type":"GET"}]},{"group":"Main","type":"product","name":"green onions, green parts cut in 3-inch strips, white parts chopped, for garnish","quantity":{"value":"1/2","unitOfMeasure":"bunch","extendedUnits":null,"text":"1/2 bunch"},"displayOrder":15,"sku":92624,"skuQuantity":1,"_links":[{"href":"/products/92624?api-version=2018-10-18","rel":"product","type":"GET"}]},{"group":"Main","type":"product","name":"peppercorn chili oil","quantity":{"value":"1/2","unitOfMeasure":"Tbsp","extendedUnits":null,"text":"1/2 Tbsp"},"displayOrder":16,"sku":508974,"skuQuantity":1,"_links":[{"href":"/products/508974?api-version=2018-10-18","rel":"product","type":"GET"}]},{"group":"Main","type":"product","name":"ponzu sauce","quantity":{"value":"1","unitOfMeasure":"Tbsp","extendedUnits":null,"text":"1 Tbsp"},"displayOrder":17,"sku":160312,"skuQuantity":1,"_links":[{"href":"/products/160312?api-version=2018-10-18","rel":"product","type":"GET"}]},{"group":"Main","type":"product","name":"lime (about 1 Tbsp)","quantity":{"value":"Juice of 1/2","unitOfMeasure":null,"extendedUnits":null,"text":"Juice of 1/2"},"displayOrder":18,"sku":92646,"skuQuantity":1,"_links":[{"href":"/products/92646?api-version=2018-10-18","rel":"product","type":"GET"}]}],"instructions":{"testerTips":null,"chefTips":null,"equipment":null,"directions":"<OL><LI>Place rice noodles in large bowl; cover with water. Soak&nbsp;20 min. Drain; cover with paper towel.&nbsp;<BR>&nbsp;</LI><LI>Add chicken and shrimp to large pot of boiling, salted water; blanch&nbsp;2 min. Reduce heat to simmer; stir gently. Drain; set aside.&nbsp;<BR>&nbsp;&nbsp;</LI><LI>Add&nbsp;1&nbsp;Tbsp&nbsp;canola oil to&nbsp;stir-fry pan on HIGH; heat until oil faintly smokes.&nbsp;Add noodles; cook, stirring, about&nbsp;3 min.&nbsp;Remove noodles; set aside. <BR>&nbsp;</LI><LI>Add 1 Tbsp canola oil to pan on HIGH. Add egg; spread evenly on bottom of pan with spatula to form crepe. Cook 30 seconds. Fold over; remove from pan. Set aside. <BR>&nbsp;</LI><LI>Add remaining canola oil to pan; heat until oil faintly smokes. Add ginger, garlic, peppers, onions, and curry powder; cook, stirring, 30 sec. Add chicken, shrimp, Asian slaw, and noodles; cook, stirring, 30 sec. Add broth, soy sauce, snow peas, and green onion strips; cook, stirring, 30 sec. Add chili oil, ponzu, and lime juice; toss to combine. <BR>&nbsp;</LI><LI>Transfer to serving dish. Cut egg crepe in thin strips; add to noodle mixture. Garnish with chopped green onions. </LI></OL>","disclaimer":null,"prerequisites":[]},"_links":[{"href":"/meals/recipes?api-version=2018-10-18","rel":"recipes","type":"GET"},{"href":"https://www.wegmans.com/content/wegmans/en/meals-recipes/meals/main-course/singapore-noodles-with-chicken-shrimp.html","rel":"web","type":"GET"},{"href":"https://www.wegmans.com/content/dam/wegmans/recipes/2/21355.jpg","rel":"image","type":"GET"},{"href":"/products/135451?api-version=2018-10-18","rel":"short-on-time","type":"GET"}]}');
    const recipe = this.props.navigation.getParam('recipe', backup);
    const image_link = recipe ? recipe._links ? recipe._links.filter(link => link.rel === 'image')[0] : null : null;
    const image_href = recipe ? image_link ? image_link.href : null : null;
    const ingredients_info = recipe ? recipe.ingredients.map(ingredient => `${ingredient.name}${ingredient.quantity.text ? `- ${ingredient.quantity.text}` : ``}`).join(`\n`) : null;
    const nutrition_info = recipe ? Object.keys(recipe.nutrition).map(key => `${key}: ${recipe.nutrition[key]}`).join(`\n`) : null;
    return (
      recipe ? <View style={styles.container}>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={(date) => this.setState({ recipe: recipe }, () => this.handleDatePicked(date))}
          onCancel={this.hideDateTimePicker}
        />
        <View style={{ position: 'absolute', top: 0, right: 0, margin: 25, marginHorizontal: 30, zIndex: 1 }}>
          <Icon name="share" type="entypo" size={36} color="#000" />
        </View>
        <Avatar containerStyle={{ width: '100%', height: 250 }} avatarStyle={{ width: '100%', height: '100%' }} source={{ uri: image_href }} />
        <Header
          outerContainerStyles={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}
          centerComponent={<ScrollView horizontal showsHorizontalScrollIndicator={false}><Text numberOfLines={1} style={{ fontSize: 32, color: '#000', fontWeight: 'bold', paddingHorizontal: 10 }}>{recipe.name}</Text></ScrollView>}
        />
        <ScrollView style={{ flex: 1, paddingTop: 15 }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', width: '100%' }} showsVerticalScrollIndicator={false}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 30 }}>
              {recipe.wellnessKeys ? recipe.wellnessKeys.map(key => <View key={key} style={{ padding: 10, marginHorizontal: 8 }}><Text style={{fontWeight: 'bold'}}>{key}</Text></View>) : null}
              {recipe.promotions ? recipe.promotions.seasons ? recipe.promotions.seasons.map(season => <View key={season} style={{ padding: 10, marginHorizontal: 8 }}><Text style={{fontWeight: 'bold'}}>{season}</Text></View>) : null : null}
            </View>
          </ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 25, width: '70%' }}>
            <Icon name="local-grocery-store" type="material-icon" size={40} color="#000" onPress={() => Alert.alert("Ingredients", ingredients_info)} />
            <Icon name="nutrition" type="material-community" size={40} color="#000" onPress={() => Alert.alert("Nutrition Info", nutrition_info)} />
            <TouchableOpacity>
              <Icon name="heart-outlined" type="entypo" size={40} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.showDateTimePicker}>
              <Icon name="calendar" type="entypo" size={40} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'space-around', marginHorizontal: 10, marginBottom: 25 }}>
            <Text style={{ fontWeight: 'bold', margin: 8 }}>Preparation Time</Text>
            {recipe.preparationTime.min ? <Text>{`Minimum preparation time is ${recipe.preparationTime.min} minutes.`}</Text> : null}
            {recipe.preparationTime.max ? <Text>{`Maximum preparation time is ${recipe.preparationTime.max} minutes.`}</Text> : null}
          </View>
          {recipe.instructions ? recipe.instructions.chefTips ? <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold', margin: 8 }}>Chef Tips</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '85%' }}>
              <HTML containerStyle={{ width: '100%' }} html={recipe.instructions.chefTips} />
            </View>
          </View> : null : null}
          {recipe.instructions ? recipe.instructions.directions ? <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold', margin: 8 }}>Directions</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '85%' }}>
              <HTML containerStyle={{ width: '100%' }} html={recipe.instructions.directions} />
            </View>
          </View> : null : null}
          <View style={{ paddingBottom: 10 }} />
        </ScrollView>
      </View> : null
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});