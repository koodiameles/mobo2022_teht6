import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Image, Text, FlatList}  from 'react-native';

export default function App() {
  
  const [keyword, setKeyword] = useState('');
  const [recipeList, setRecipeList] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      const json = await response.json();
      const recipes = json.meals;
      console.log("recipes", recipes)
      setRecipeList(recipes);
    }
    catch (err) {
      console.log("error")
    }
  }

  return (
    <>
      <View style={styles.containerHeader}>
        <Text style={styles.assignmentHeaderText}>TEHT 6 RESEPTIN HAKU</Text>
      </View>
      <View style={styles.container}>
        <TextInput style={styles.input} onChangeText={setKeyword} value={keyword}/>
        <View style={{display: 'flex', flexDirection: 'row', margin: 10}}>
          <View style={{flex: 1, marginHorizontal: 30}}>
            <Button color="green" onPress={() => fetchRecipes()} title="Find recipes" />
          </View>
        </View>
      </View>
      <View style={styles.container2}>
        <Text style={{color:"#6495ED", fontSize:24}}>RECIPES</Text>
        <FlatList 
          style={styles.list}
          data={recipeList}
          renderItem={({ item }) => 
            <View style={{display: 'flex', flexDirection: 'row', margin: 10}}>
              <Image
                style={styles.image}
                source={{uri: item.strMealThumb}}
              />
              <Text style={{color:"white", margin: 10, marginTop: 35}}>{item.strMeal}</Text>
            </View>
          }
        />
      </View>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'black',
  },
  containerHeader: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  container2: {
    flex: 2,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  input: {
    width:"80%", 
    borderColor: 'gray', 
    borderWidth: 1,
    margin: 5,
    color:"white",
  },
  assignmentHeaderText: {
    fontSize: 40,
    color:"#6495ED",
  },
  image: {
    height: 90,
    width: 90,
  }
});
 

