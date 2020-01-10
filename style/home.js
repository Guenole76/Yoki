import { StyleSheet} from 'react-native';

export const homeStyle = StyleSheet.create({
  productContainer : {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey'
    
  },
  scrollProductView : {
    width: '90%',
    alignSelf: 'center',
    borderWidth:1,
    borderColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  scanButtonView : {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center',
    height: 80,
    backgroundColor: 'lightseagreen',
    marginBottom: 30,
    borderColor: 'white',
    marginLeft:"10%",
    borderWidth:2,
    borderRadius: 20,
  },
  scanButton: {
    backgroundColor: 'lightseagreen',
    width: "90%",
    borderRadius: 20,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
    
  },
})