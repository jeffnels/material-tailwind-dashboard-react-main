import React, { useState, useEffect } from 'react';
import avatar from '../images/avatar.png';
import { Toast } from 'flowbite-react';
import { useSpring, animated } from '@react-spring/web';

const KycButton = () => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    idNumber: '',
    idType: '',
    address: '',
    expiryDate: '',
    frontImage: null,
    backImage: null,
  });
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

  useEffect(() => {
    let timer;
    if (toastMessage) {
      timer = setTimeout(() => {
        setToastMessage('');
      }, 3000); // 3 seconds timeout
    }
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setFormData(prevState => ({
      ...prevState,
      address: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Example validation and submission handling
    if (!formData.firstName || !formData.lastName || !formData.address || !formData.idNumber) {
      setToastMessage('Please fill in all required fields.');
      setToastType('error');
      return;
    }

    // Simulate form submission success
    setToastMessage('Form submitted successfully!');
    setToastType('success');

    // Clear form inputs on successful submission
    setFormData({
      firstName: '',
      lastName: '',
      dob: '',
      idNumber: '',
      idType: '',
      address: '',
      expiryDate: '',
      frontImage: null,
      backImage: null,
    });
    setAddress('');
    setCountry('');
    setIsSecondModalOpen(false);
  };
const modalSpring = useSpring({
  opacity: isOpen ? 1 : 0,
  transform: isOpen ? 'translateY(0)' : 'translateY(-50%)',
  config: { tension: 200, friction: 15 },
});


  return (
    <div>
      <button
  className="bg-red-500 text-white px-4 py-2 rounded mb-6 transition duration-500 ease-in-out hover:bg-red-700 text-sm min-w-[150px]"
  onClick={() => setIsFirstModalOpen(true)}
>
  Verify Identity
</button>


      {isFirstModalOpen && (
         <animated.div style={modalSpring} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[0.2] z-50">
 <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-[0.2] z-50">
          <div className="bg-white flex items-center justify-between rounded-lg shadow-lg p-8 flex-col relative w-full max-w-md h-[300px]">
            <button
              className="absolute top-2 right-2 text-black hover:text-red-700 text-2xl"
              onClick={() => setIsFirstModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Verify Identity</h2>
            <img
              src={avatar}
              alt="Placeholder"
              className="w-20 mb-6"
            />
            <button
              className="bg-black text-white px-4 py-2 rounded w-full max-w-xs"
              onClick={() => {
                setIsFirstModalOpen(false);
                setIsSecondModalOpen(true);
              }}
            >
              Verify Identity
            </button>
          </div>
        </div>
         </animated.div>
       
      )}
    
      {isSecondModalOpen && (
        
         <animated.div style={modalSpring} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[0.2] z-50">
         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[0.2] z-50">
          <div className="bg-white rounded-md shadow-lg p-6 relative max-w-3xl w-full mx-4 ">
            <button
              className="absolute top-2 right-2 text-black hover:text-red-700 text-2xl"
              onClick={() => setIsSecondModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Identity Verification</h2>
            {toastMessage && (
              <div className={` z-10 fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${toastType === 'success' ? 'bg-green-500' : 'bg-red-700'}`}>
                <Toast color={toastType === 'error' ? 'failure' : 'success'} onClose={() => setToastMessage('')} style={{ backgroundColor: toastType === 'error' ? 'red' : 'green', color: 'white' }}>
                  {toastMessage}
                </Toast>
              </div>
            )}
            <div className="overflow-y-auto max-h-[85vh]">
              <form className="space-y-4 p-4 max-w-md mx-auto bg-white rounded-md shadow-md" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">ID Number</label>
                  <input
                    type="text"
                    name="idNumber"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={formData.idNumber}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Type of ID</label>
                  <select
                    name="idType"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={formData.idType}
                    onChange={handleChange}
                  >
                    <option value="passport">Passport</option>
                    <option value="drivers_license">Driver's License</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Country</label>
                  <select
                    name="country"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Select a country</option>
                    {/* List of countries */}
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Åland Islands">Åland Islands</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cote D'ivoire">Cote D'ivoire</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">French Southern Territories</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-bissau">Guinea-bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                    <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                    <option value="Korea, Republic of">Korea, Republic of</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macao">Macao</option>
                    <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                    <option value="Moldova, Republic of">Moldova, Republic of</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russian Federation">Russian Federation</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Helena">Saint Helena</option>
                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                    <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Timor-leste">Timor-leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Viet Nam">Viet Nam</option>
                    <option value="Virgin Islands, British">Virgin Islands, British</option>
                    <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={address}
                    onChange={handleAddressChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Expiry Date</label>
                  <input
                    type="date"
                    name="expiryDate"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={formData.expiryDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Upload Document Image (front)</label>
                  <input
                    type="file"
                    name="frontImage"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Upload Document Image (back)</label>
                  <input
                    type="file"
                    name="backImage"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2">
                  <button style={{backgroundColor: 'black'}}
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded w-full"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
         </animated.div>
       
      )}
    </div>
  );
};

export default KycButton;
