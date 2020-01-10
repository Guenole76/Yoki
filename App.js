import React from 'react';
import {Button, Image, ScrollView,Alert,StyleSheet, Text, Modal, TouchableOpacity, View} from 'react-native';
import {homeStyle} from './style/home';
import {fontsStyle} from "./style/fonts";
import {globalStyle} from "./style/global";
import AppHeader from "./components/AppHeader";
import ScanButton from "./components/ScanButton";
import ProductItem from "./components/ProductItem";


export default class App extends React.Component {
  constructor(){
    super();

    this.state = {
      modalVisible: false,
      products : [
        {id: 1, name : 'Coca', date: new Date()},
        {id: 2, name : 'Orangina', date: new Date()},
        {id: 3, name : 'Nestea', date: new Date()},
        {id: 4, name : 'Bière sans alcool', date: new Date()}
      ]
  
      
    };


 

    this.title = "Yoki"
  }

 //modal scanner
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }


  //modal scanner
  handleScanPress = () => {
    this.setModalVisible(true)
    //alert('Je scan un produit')
    
  };






  handleProductPress = async (id) => {
    

    await this._handleBarCodeRead({type: 'EAN' , data :'8000500037560'})
  };



  async getProductFromApi(barcode) {
    try {
      let response = await fetch(
          'https://fr.openfoodfacts.org/api/v0/produit/' + barcode + '.json'
      );
      let responseJson = await response.json();
      return responseJson.product;
    } catch (error) {
      console.error(error);
    }
  }

   /*
  Appelée quand la caméra a détecté un code barre,
  testez vous même !
   */
  async _handleBarCodeRead ({ type, data }) {
    // On récupère le produit scanné
    let scannedProduct = await this.getProductFromApi(data);
 
    // On crée un nouvel obj. produit
    let newProduct = {id: 1, name: scannedProduct.product_name, date: new Date()};
 
    let _products = this.state.products; // récupération de la liste actuelle
 
    console.log(scannedProduct);
    console.log(newProduct);
 
    _products.push(newProduct); // ajout du nouveau produit
    this.setState({products : _products}); // on set les nouveau produits dans le state
    this.setState({modalScanVisible: true});
  };
 
  


  render() {
    return (
      <View style={globalStyle.container}>
        <AppHeader title={this.title}/>
        
        <ScanButton handlePress={this.handleScanPress}/>

        <ScrollView style={homeStyle.scrollProductView}>
          {
           this.state.products.map(
               (produit) => {
                 return (
                     <ProductItem product={produit} key={produit.id} onPressItem={this.handleProductPress}/>
                 
        
            
          
       
                 )
               }
           )
          }
        </ScrollView>


        <Modal  // Ajout de la modal pour les produits non fonctionnel la modal reste afficher et n'affiche plus les autres fonctions 
          animationType="slide"
          transparent={false}
          visible={this.state.product}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{flex: 1}}>
            <AppHeader title="Modal Produit    "/> 

            <TouchableOpacity 
              onPress={() => {
                this.setproducts(!this.state.product);
              }}
              style={{
                position: "absolute", 
                backgroundColor: "lightseagreen", 
                width: "100%",
                height: 70,
                left: 0, 
                bottom: 0,
                textAlign:"center",
                
                alignItems:"center",
                paddingTop: "5%",
                fontSize: 22
                }}>


                <Text>Quitter la modal produit</Text>
            </TouchableOpacity>
          </View>
        </Modal>


        <Modal  // Ajout de la modal dans le bouton scanner
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{flex: 1}}>
            <AppHeader title="Camera "/> 

            <TouchableOpacity 
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              style={{
                position: "absolute", 
                backgroundColor: "lightseagreen", 
                width: "100%",
                height: 70,
                left: 0, 
                bottom: 0,
                textAlign:"center",
                
                alignItems:"center",
                paddingTop: "5%",
                fontSize: 22
                
                }}>


                <Text>Quitter le mode modal</Text>
            </TouchableOpacity>
          </View>
        </Modal>

   

      </View>
    );
  }
}