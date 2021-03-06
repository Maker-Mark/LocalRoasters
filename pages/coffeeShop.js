import React from "react";
import {Content,CardItem,Card,Body,Item, Button} from "native-base";
import { StyleSheet, Text, View, Image,Linking, Platform, location } from "react-native";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import {getCoffeeShopThunk} from "../store/utilities/coffeeShop";

class CoffeeShop extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      selectCoffeeShop: {},
      roast:'',
      roaster:''
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    try {
      //Just updates the state
      await this.props.getCoffeeShop();
      if (this._isMounted) {
        this.setState({
          selectCoffeeShop: this.props.coffeeShop,
          roast:this.props.coffeeShop.coffee.roast,
          roaster: this.props.coffeeShop.coffee.roaster
        });
      }

    } catch (err) {
      // console.log(err);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    let beanIcons = [];
    let {
      name,
      price,
      rating,
      coffee,
      location,
      sustainable,
      img
    } = this.state.selectCoffeeShop;
    let roast = this.state.roast
    let roaster = this.state.roaster
    for (let i = 0; i < 5; i++) {
      let image = i < rating ? require("./../images/coffee-grain-fill.png") : require("./../images/coffee-grain.png");
      beanIcons.push(
        <Image
          source={image}
          style={{ height: 30, width: 30, flexDirection: "row" }}
          key={i}
        />
      );
    }
    let imgUrl = "" + img;
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${this.props.coffeeShop.location.latitude},${this.props.coffeeShop.location.longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    return (
      <Content style={styles.content}>
        <Image source={{ uri: imgUrl }} style={styles.background} />
        <Item style={{ borderBottomWidth: 0 }}>
          <Text style={styles.Text1}>{name}</Text>
        </Item>
        <Item style={{ borderBottomWidth: 0, marginBottom: 10 }}>
          <Text style={styles.Text2}>${price} per cup</Text>
        </Item>
        <Item
          style={{
            borderBottomWidth: 0,
            marginBottom: 20,
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          {beanIcons}
          {sustainable && (
            <Ionicons name="ios-leaf" style={{ fontSize: 35, color: 'green', marginLeft: 90 }} />
          )}
        </Item>
        <Card style={styles.cardStyle}>
          <CardItem>
            <Body>
              <Text style={{fontSize:20}}>Roast: {roast} </Text>
              <Text style={{fontSize:20}}>Roaster: {roaster}</Text>
              {sustainable && <Text style={{fontSize:20}}>Sustainably Sourced: <Ionicons name="md-leaf" style={{ fontSize: 20, color: 'green', marginLeft: 90 }} /> </Text>}
              {sustainable && 
              <Text>Sustainably sourced beans mean you can sip your coffee knowing you support fair-trade, traceable, sustainable beans!</Text> 
               }
            </Body>
          </CardItem>
        </Card>
        <Button style={styles.directionArrow} onPress={() => Linking.openURL(url)}>
                  <Text style={{marginRight:'auto', marginLeft:'auto'}}>Directions </Text>
                  <Image source={require('./../images/map_arrow.png')} style={styles.mapArrow}/>
        </Button>
      </Content>
    );
  }
}

const mapState = state => {
  return {
    coffeeShop: state.coffeeShop,
    id: state.id
  };
};

const mapDispatch = dispatch => {
  return {
    getCoffeeShop: () => dispatch(getCoffeeShopThunk())
  };
};

export default connect(mapState, mapDispatch)(CoffeeShop);

const styles = StyleSheet.create({
  background: {
    height: 200,
    width: "100%"
  },
  midText: {
    marginTop: "50%",
    marginRight: "auto",
    marginLeft: "auto"
  },
  navButton: {
    backgroundColor: "#9A764E",
    borderRadius: 0
  },
  navText: {
    color: "white"
  },
  coffeeShopImage: {
    width: "80%",
    height: 200,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 30
  },
  Text1: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 30,
    marginTop: 10
  },
  Text2: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 20
  },
  title: {
    marginTop: 10,
    fontSize: 25,
    padding: 25,
    marginLeft: "auto",
    marginRight: "auto"
  },
  dollar: {
    width: "33%",
    flex: 1,
    justifyContent: "center"
  },
  inline: {
    flexDirection: "row"
  },
  signUpButton: {
    padding: 10,
    width: "50%",
    marginTop: 50,
    backgroundColor: "#6f4e37",
    alignSelf: "center",
    borderRadius: 20
  },
  buttonText: {
    marginRight: "auto",
    marginLeft: "auto",
    color: "white"
  },
  starsStyle: {
    padding: 10
  },
  cardStyle: {
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto"
  },
  mapArrow:{
    height: 25,
    width: 25,
    marginRight:'auto', 
    marginLeft:'auto',
    marginTop: '5%'
  },
  directionArrow:{
    width: '50%',
    backgroundColor: 'white',
    borderWidth:1,
    borderColor: 'brown',
    marginRight:'auto', 
    marginLeft:'auto',
    marginTop: '5%'
  }
});
