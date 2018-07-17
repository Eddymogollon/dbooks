import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.css']
})
export class NewAddressComponent implements OnInit {

  constructor(private router: Router) { }

  countriesList = ['United States', 'United Kingdom', 'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla',
    'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
    'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia',
    'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria',
    'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo',
    'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti',
    'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands',
    'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany',
    'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana',
    'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel',
    'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon',
    'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia',
    'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat',
    'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua',
    'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
    'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa',
    'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia',
    'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan',
    'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor L\'Este',
    'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine',
    'United Arab Emirates', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen',
    'Zambia', 'Zimbabwe'];

  statesList = [
    { name: 'Alabama', abbrev: 'AL' }, { name: 'Alaska', abbrev: 'AK' }, { name: 'Arizona', abbrev: 'AZ' },
    { name: 'Arkansas', abbrev: 'AR' }, { name: 'California', abbrev: 'CA' }, { name: 'Colorado', abbrev: 'CO' },
    { name: 'Connecticut', abbrev: 'CT' }, { name: 'Delaware', abbrev: 'DE' }, { name: 'Florida', abbrev: 'FL' },
    { name: 'Georgia', abbrev: 'GA' }, { name: 'Hawaii', abbrev: 'HI' }, { name: 'Idaho', abbrev: 'ID' },
    { name: 'Illinois', abbrev: 'IL' }, { name: 'Indiana', abbrev: 'IN' }, { name: 'Iowa', abbrev: 'IA' },
    { name: 'Kansas', abbrev: 'KS' }, { name: 'Kentucky', abbrev: 'KY' }, { name: 'Louisiana', abbrev: 'LA' },
    { name: 'Maine', abbrev: 'ME' }, { name: 'Maryland', abbrev: 'MD' }, { name: 'Massachusetts', abbrev: 'MA' },
    { name: 'Michigan', abbrev: 'MI' }, { name: 'Minnesota', abbrev: 'MN' }, { name: 'Mississippi', abbrev: 'MS' },
    { name: 'Missouri', abbrev: 'MO' }, { name: 'Montana', abbrev: 'MT' }, { name: 'Nebraska', abbrev: 'NE' },
    { name: 'Nevada', abbrev: 'NV' }, { name: 'New Hampshire', abbrev: 'NH' }, { name: 'New Jersey', abbrev: 'NJ' },
    { name: 'New Mexico', abbrev: 'NM' }, { name: 'New York', abbrev: 'NY' },  { name: 'North Carolina', abbrev: 'NC' },
    { name: 'North Dakota', abbrev: 'ND' }, { name: 'Ohio', abbrev: 'OH' }, { name: 'Oklahoma', abbrev: 'OK' },
    { name: 'Oregon', abbrev: 'OR' }, { name: 'Pennsylvania', abbrev: 'PA' }, { name: 'Rhode Island', abbrev: 'RI' },
    { name: 'South Carolina', abbrev: 'SC' }, { name: 'South Dakota', abbrev: 'SD' }, { name: 'Tennessee', abbrev: 'TN' },
    { name: 'Texas', abbrev: 'TX' }, { name: 'Utah', abbrev: 'UT' }, { name: 'Vermont', abbrev: 'VT' },
    { name: 'Virginia', abbrev: 'VA' }, { name: 'Washington', abbrev: 'WA' }, { name: 'West Virginia', abbrev: 'WV' },
    { name: 'Wisconsin', abbrev: 'WI' }, { name: 'Wyoming', abbrev: 'WY' }
  ];

  isCountryUSA = null;

  ngOnInit() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        this.router.navigate(['/sign_in']);
      }
    });
  }

  onChangeCountry(event) {
    console.log(event);

    if (event !== 'United States') {
      this.isCountryUSA = null;
      console.log(this.isCountryUSA);
    } else {
      this.isCountryUSA = true;
    }
  }

  onChangeState(event) {
    console.log(event);
  }

  async onChangeAddress(form: NgForm, command) {

    const { country, fullName, streetAddress1,
      streetAddress2, city, state, zipCode, instruction } = form.value;
    let { phoneNumber } = form.value;
    const keyCode = (Math.floor(Math.random() * 100000)).toString();
    const user = firebase.auth().currentUser;
    const uid = user.uid;

    // add make default

    console.log(form.value);
    if (command === 'cancel') {
      console.log('User canceled');
      form.reset();
      return;
    }

    if (country === '' || fullName === '' || streetAddress1 === '' || city === '' || state === ''
       || zipCode === '' || phoneNumber === '') {
      alert('Missing at least one mandatory field. Please fill out all information before submitting.');
      return;
    }

    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (phoneRegex.test(phoneNumber)) {
        phoneNumber = phoneNumber.replace(phoneRegex, '($1) $2-$3');
    } else {
        alert('Phone number is invalid. Please try again.');
        return;
    }

    if (confirm(`Are you sure you want to add a new address?`)) {
      // firebase.database().ref(`/users/${user.uid}`).once('value').then((snapshot) => {
      let allAddresses = await firebase.database().ref(`/users/${user.uid}/addresses`).once('value');
      // firebase.database().ref(`/users/${uid}/newAddresses`).set(form.value);
      allAddresses = allAddresses ? allAddresses.val() : null;

      const formData = {
        country, fullName, streetAddress1, streetAddress2,
        city, state, zipCode, phoneNumber, instruction, keyCode
      };

      if (allAddresses === null) {
        // firebase.database().ref(`/users/${uid}/addresses`).set([(isDefault ? oldDefaultAddress : formData)]);
        firebase.database().ref(`/users/${uid}/addresses`).set({ [keyCode]: formData });
      } else {
        allAddresses[keyCode] = formData;
        firebase.database().ref(`/users/${uid}/addresses`).set(allAddresses);
      }

      alert('New address added');
      this.router.navigate(['/profile/address']);
    }

    form.reset();
  }

}
