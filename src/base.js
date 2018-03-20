import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyB1IsvRg4GuHLshQFTJJVcI56ze7oR-DaA',
	authDomain: 'brainyactz-wallboard.firebaseapp.com',
	databaseURL: 'https://brainyactz-wallboard.firebaseio.com'
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
