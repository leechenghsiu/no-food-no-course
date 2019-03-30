import React, { Component } from 'react';
import { ScrollView, View, Text, Button, Platform, StatusBar, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Tile } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Details extends Component {
  static navigationOptions = ({navigation}) => {
    const back = <Ionicons
      name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
      color="#FFFFFF"
      size={30}
      style={{padding: 10 }}
      onPress={() => navigation.goBack()}
    />

    return {
      headerTransparent: true,
      headerLeft: back
    }
  };

  state = {
    myOrder: {
      meal:[],
      total: 0
    }
  }

  handleSubmit = () => {
    this.props.navigation.navigate('Confirm',{ meal: this.state.myOrder.meal })
  }

  render() {
    const { name,
            image,
            description,
            meals
    } = this.props.navigation.state.params;

    const renderMeals = meals.map(meal=>{
      // 增加餐點
      const handleIncreaseMeal = meal => {
        //找到現有的餐點
        if(this.state.myOrder.meal.find(x => x.name === meal.name)){
          let oldStates = this.state.myOrder.meal;
          oldStates.find(x => x.name === meal.name).count += 1;
          this.setState({
            meal: {
              ...oldStates
            }
          },()=>console.log(this.state.myOrder.meal));
        } 
        //第一次出現餐點
        else {
          this.setState({
            myOrder: {
              meal: [
                ...this.state.myOrder.meal,
                { name: meal.name, price: meal.price, count: 1 }
              ]
            }
          },()=>console.log(this.state.myOrder.meal))
        }
      }

      // 減少餐點
      const handleDecreaseMeal = meal => {
        //找到現有的餐點
        if(this.state.myOrder.meal.find(x => x.name === meal.name)){
          let oldStates = this.state.myOrder.meal;
          if(oldStates.find(x => x.name === meal.name).count === 1){
            this.setState({
              meal: oldStates.splice(oldStates.findIndex(x => x.name === meal.name),1)
            },()=>console.log(this.state.myOrder.meal));
          } else {
            this.setState({
              meal: oldStates.find(x => x.name === meal.name).count -= 1
            },()=>console.log(this.state.myOrder.meal));
          }
        } 
        //第一次出現餐點
        else {
          return null;
        }
      }

      return(
        <View style={styles.meal} key={meal.name}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={[{ marginRight: 6, alignItems: 'flex-end', backgroundColor: 'rgb(141,216,227)', marginVertical: 8, height: 16 , borderRadius: 2},this.state.myOrder.meal.find(x => x.name === meal.name)?{display: 'flex'}:{backgroundColor: 'transparent'}]}>
              <Text style={styles.mealCount}>{this.state.myOrder.meal.find(x => x.name === meal.name)?this.state.myOrder.meal.find(x => x.name === meal.name).count:''}</Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealPrice}>{`$${meal.price}`}</Text>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
            <TouchableOpacity style={styles.addButton} onPress={()=>handleDecreaseMeal(meal)}>
              <Text style={styles.addButtonText}>−</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={()=>handleIncreaseMeal(meal)}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    })

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ backgroundColor: 'rgb(249,249,249)' }}>
          <StatusBar backgroundColor="transparent" barStyle="light-content" />
          <Tile
            imageSrc={{ uri: image }}
            featured
          />
          <View style={ styles.container }>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={[styles.name, {marginBottom: 20}]}>餐點</Text>
            {renderMeals}
          </View>
        </ScrollView>
        {this.state.myOrder.meal[0]
          ?<View style={styles.buttonBox}>
            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <View style={{ flex: 1}}></View>
              <Text style={styles.buttonText}>下一步</Text>
              <Text style={styles.buttonPrice}>$ 87</Text>
            </TouchableOpacity>
           </View>
          :null
        }
        
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  name: {
    marginLeft: 10,
    fontSize: 24
  },
  description: {
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 30,
    fontSize: 14,
    color: 'rgb(94,94,94)'
  },
  meal: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderColor: 'rgb(151,151,151)',
    paddingTop: 5
  },
  mealCount: {
    color: 'white',
    textAlign: 'center',
    width: 16
  },
  mealName: {
    marginVertical: 8,
    fontSize: 16,
    color: 'rgb(64,64,64)'
  },
  mealPrice: {
    fontSize: 16,
    color: 'rgb(64,64,64)'
  },
  addButton: {
    width: 30,
    height: 30,
    marginLeft: 20,
    borderWidth: 1.5,
    borderColor: 'rgb(151,151,151)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButtonText: {
    fontSize: 30,
    lineHeight: 30,
    textAlign: 'center',
    color: 'rgb(151,151,151)',
    fontWeight: '300'
  },
  buttonBox: {
    backgroundColor: 'rgb(141,216,227)',
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0,
    marginBottom: 34,

  },
  button: {
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    padding: 17,
    color: 'white'
  },
  buttonPrice: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 17,
    color: 'white'
  }
});


export default Details;
