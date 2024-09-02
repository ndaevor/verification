'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import axios from 'axios';
import { log } from 'console';

const Register = () => {
  // users state for saving registration details
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    aadhar: '',
    pan: '',
    bank: '',
    ifsc: '',
    gst: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    aadhar: '',
    pan: '',
    bank: '',
    ifsc: '',
    gst: '',
    pincode: '',
  });

  const [formSubmit, setFormSubmit] = useState(false);

  // State for loading
  const [loading, setLoading] = useState(false);

  // Variable for storing otps
  const [otp, setOtp] = useState('');

  // state for managing name
  const [isNameAdded, setIsNameAdded] = useState(false);

  // state for managing email verification
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // state for managing email verification
  const [isPhoneOtpSent, setIsPhoneOtpSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  // state for managing aadhar verification
  const [isAadharNumberSent, setIsAadharNumberSent] = useState(false);
  const [isAadharVerified, setIsAadharVerified] = useState(false);

  // state for managing PAN Number verification
  const [isPanNumberSent, setIsPanNumberSent] = useState(false);
  const [isPanVerified, setIsPanVerified] = useState(false);

  // state for managing bank Account verification
  const [isAccountNumberSent, setIsAccountNumberSent] = useState(false);
  const [isIfscSent, setIsIfscSent] = useState(false);
  const [isBankVerified, setIsBankVerified] = useState(false);
  const [isBankAdd, setIsBankAdd] = useState(false);

  // state for managing gst verification
  const [isGstNumberSent, setIsGstNumberSent] = useState(false);
  const [isGstVerified, setIsGstVerified] = useState(false);

  // state for managing pincode address Lookup
  const [isPincodeSent, setIsPincodeSent] = useState(false);
  const [isPincodeVerified, setIsPincodeVerified] = useState(false);

  type AddressType = {
    City: string;
    District: string;
    State: string;
    Post_Office: string;
  };

  const [address, setAddress] = useState<AddressType>({
    City: '',
    District: '',
    State: '',
    Post_Office: '',
  });

  const handleChange = (e: any, key: any) => {
    const value = e.target.value;

    setUser({ ...user, [key]: value });

    // Validation logic for each field
    let error = '';

    if (key === 'name' && value === '') {
      error = 'Name is required';
    } else if (key === 'email') {
      if (value === '') {
        error = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        error = 'Email is invalid';
      }
    } else if (key === 'phone') {
      if (value === '') {
        error = 'Phone Number is required';
      } else if (value.length !== 10 || !/^\d{10}$/.test(value)) {
        error = 'Phone number must be 10 digits';
      }
    } else if (key === 'aadhar') {
      if (value === '') {
        error = 'Aadhar Number is required';
      } else if (value.length !== 12 || !/^\d{12}$/.test(value)) {
        error = 'Aadhar number must be 12 digits';
      }
    } else if (key === 'pan') {
      if (value === '') {
        error = 'PAN Card Number is required';
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
        error = 'PAN number is invalid';
      }
    } else if (key === 'ifsc') {
      if (value === '') {
        error = 'IFSC Code is required';
      } else if (value.length !== 11 || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
        error = 'IFSC Code is invalid';
      }
    } else if (key === 'gst') {
      if (value === '') {
        error = 'GST Number is required';
      } else if (
        !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value)
      ) {
        error = 'GST Number is invalid';
      }
    } else if (key === 'pincode') {
      if (value === '') {
        error = 'PINCODE Number is required';
      } else if (value.length !== 6 || !/^\d{6}$/.test(value)) {
        error = 'PINCODE is invalid';
      }
    }

    // Update the error state
    setErrors({ ...errors, [key]: error });
  };

  // Add Name
  const addName = async () => {
    setLoading(true);
    setIsNameAdded(true);
    setLoading(false);
  };

  // Send email OTP
  const sendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8888/mail/send-otp', {
        email: user.email,
      });
      setLoading(false);
      setIsOtpSent(true);
      console.log(response.data);
      // console.log(response.data.message);
    } catch (error) {
      console.error('Error sending OTP', error);
    }
  };

  // Verify email OTP
  const verifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8888/mail/verify-otp',
        {
          email: user.email,
          otp,
        }
      );

      if (response.status === 200) {
        setIsEmailVerified(true);
        setLoading(false);
        setOtp('');
        console.log(response.data);
      }
    } catch (error) {
      setLoading(false);
      setOtp('');
      console.error('Invalid OTP', error);
      alert('INVALID OTP');
      setIsOtpSent(false);
    }
  };

  // Send phone OTP
  const sendPhoneOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8888/mobile/send-otp',
        {
          phone: '+91' + user.phone,
        }
      );
      setLoading(false);
      setIsPhoneOtpSent(true);
      console.log(response.data);
    } catch (error) {
      console.error('Error sending OTP', error);
    }
  };

  // Verify phone OTP
  const verifyPhoneOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8888/mobile/verify-otp',
        {
          phone: '+91' + user.phone,
          otp,
        }
      );

      if (response.status === 200) {
        setIsPhoneVerified(true);
        setLoading(false);
        setOtp('');
        console.log(response.data);
      }
    } catch (error) {
      setLoading(false);
      setOtp('');
      console.error('Invalid OTP', error);
      alert('INVALID OTP');
      setIsPhoneOtpSent(false);
    }
  };

  // Verify Aadhar Number
  const verifyAadhar = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8888/aadhar/verify-aadhar',
        {
          aadhar: user.aadhar,
        }
      );
      setLoading(false);
      const data = response.data.data;
      setIsAadharNumberSent(false);
      setIsAadharVerified(data);
      // console.log('HERE',data);

      {
        !data && alert('Aadhar Verification Failed');
      }
    } catch (error) {
      console.error('Error verifying Aadhar', error);
    }
  };

  // Verify Pan Number
  const verifyPan = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8888/pan/verify-pan',
        {
          pan: user.pan,
        }
      );
      setLoading(false);

      const res = response.data.result;
      if (res === 'null' || 'undefined') {
        console.log('IF', res);
        setIsPanVerified(false);
      } else {
        console.log('ELSE', res);
        const data = response.data.result.link_status;
        console.log('DATA', data);
        setIsPanVerified(data);
      }

      setIsPanNumberSent(false);
      {
        !isPanVerified && alert('PAN Number Verification Failed');
      }
    } catch (error) {
      console.error('Error verifying PAN Number', error);
    }
  };

  // Verify Bank Account Number

  //Add Bank account number
  const addBank = () => {
    setIsBankAdd(true);
  };

  // Verify Bank with account number and IFSC

  const verifyBank = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8888/bank/verify-bank',
        {
          bank: user.bank,
          ifsc: user.ifsc,
        }
      );
      const id = response.data.request_id;
      try {
        const result = await axios.get(
          `http://localhost:8888/bank/verify-bank?id=${id}`
        );
        const data = result.data[0].status;
        setLoading(false);

        if (data === 'completed') {
          setIsAccountNumberSent(false);
          setIsBankVerified(true);
        } else {
          alert('Bank Account Verification Failed');
        }
      } catch (error) {
        console.error('Error verifying Bank Account', error);
      }
    } catch (error) {
      console.error('Unable to retrieve ID from Bank', error);
    }
  };

  // Verify GST Number
  const verifyGst = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8888/gst/verify-gst',
        {
          gst: user.gst,
        }
      );
      const data = response.data.result.source_output.status;
      setLoading(false);

      if (data === 'id_found') {
        setIsGstNumberSent(false);
        setIsGstVerified(true);
      } else {
        alert('GST Account Verification Failed');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error verifying GST', error);
    }
  };

  // Get Address
  const getAddress = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8888/pincode/get-address?pincode=${user.pincode}`
      );
      const data = response.data[0].PostOffice[0];

      setLoading(false);
      setIsPincodeSent(false);
      setIsPincodeVerified(true);
      console.log(data);
      setAddress({
        City: data.Block,
        District: data.District,
        State: data.Circle,
        Post_Office: data.Name,
      });
      console.log(address);
    } catch (error) {
      setLoading(false);
      console.error('Invalid Pincode', error);
    }
  };

  // Handle Register Button
  const handleSubmit = async () => {
    const newErrors = {
      name: user.name === '' ? 'Name is required' : errors.name,
      email: user.email === '' ? 'Email is required' : errors.email,
      phone: user.phone === '' ? 'Phone number is required' : errors.phone,
      aadhar: user.aadhar === '' ? 'Aadhar number is required' : errors.aadhar,
      pan: user.pan === '' ? 'PAN number is required' : errors.pan,
      bank: user.bank === '' ? 'Bank account number is required' : errors.bank,
      ifsc: user.ifsc === '' ? 'IFSC Code is required' : errors.ifsc,
      gst: user.gst === '' ? 'GST number is required' : errors.gst,
      pincode: user.pincode === '' ? 'PINCODE is required' : errors.pincode,
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error !== '')) {
      setLoading(true);
      try {
        const response = await axios.post(
          'http://localhost:8888/form/submit-form',
          {
            name: user.name,
            email: user.email,
            phone: user.phone,
            aadhar: user.aadhar,
            pan: user.pan,
            bank: user.bank,
            ifsc: user.ifsc,
            gst: user.gst,
            pincode: user.pincode,
          }
        );
        setLoading(false);
        setFormSubmit(true);
        console.log('Form Submitted', user);

        // Clear form and errors only if submission is successful
        setUser({
          name: '',
          email: '',
          phone: '',
          aadhar: '',
          pan: '',
          bank: '',
          ifsc: '',
          gst: '',
          pincode: '',
        });
        setErrors({
          name: '',
          email: '',
          phone: '',
          aadhar: '',
          pan: '',
          bank: '',
          ifsc: '',
          gst: '',
          pincode: '',
        });

        // Reset verification states
        setIsNameAdded(false);
        setIsEmailVerified(false);
        setIsPhoneVerified(false);
        setIsAadharVerified(false);
        setIsPanVerified(false);
        setIsBankVerified(false);
        setIsBankAdd(false);
        setIsGstVerified(false);
        setIsPincodeVerified(false);
      } catch (error) {
        setLoading(false);
        console.error('Error Submitting Form', error);
      }
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.register}>
        <h1>Register</h1>
        <div className={styles.registerFields}>
          {/* Name Field of the User  */}
          <div>
            <label htmlFor="Name">Full Name</label>
            <div>
              <span>
                <input
                  type="text"
                  onChange={e => {
                    handleChange(e, 'name');
                  }}
                  value={user.name}
                  disabled={isNameAdded}
                  // style={{ width: '247px' }}
                />
                {errors.name && (
                  <p className={styles.errorMessage}>{errors.name}</p>
                )}
              </span>
              {!isNameAdded ? (
                <button
                  disabled={!user.name || loading}
                  className={
                    loading ? styles.loadingButton : styles.verifyButton
                  }
                  onClick={addName}
                >
                  &nbsp;ADD&nbsp;
                </button>
              ) : (
                <Image
                  className={styles.verifiedImage}
                  src={'/verified.jpg'}
                  alt="Verified"
                  width={20}
                  height={20}
                />
              )}
            </div>
          </div>
          {/* Email Field of the User  */}
          <div>
            <label htmlFor="Email">Email ID</label>
            <div>
              <span>
                <input
                  type="email"
                  onChange={e => {
                    handleChange(e, 'email');
                  }}
                  value={user.email}
                  disabled={isEmailVerified}
                  className={styles.emailPhoneInput}
                />
                {errors.email && (
                  <p className={styles.errorMessage}>{errors.email}</p>
                )}
              </span>

              {isEmailVerified && (
                <Image
                  className={styles.verifiedImage}
                  src={'/verified.jpg'}
                  alt="Verified"
                  width={20}
                  height={20}
                />
              )}
              {!isEmailVerified && (
                <div>
                  {!isOtpSent ? (
                    <button
                      disabled={!!errors.email || !user.email || loading}
                      className={
                        loading ? styles.loadingButton : styles.verifyButton
                      }
                      onClick={sendOtp}
                    >
                      SEND
                    </button>
                  ) : (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        className={styles.otpInput}
                      />
                      <button
                        disabled={loading}
                        className={
                          loading ? styles.loadingButton : styles.verifyButton
                        }
                        onClick={verifyOtp}
                      >
                        Verify
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Phone Number Field of the User  */}
          <div>
            <label htmlFor="Phone">Phone Number</label>
            <div>
              <span>
                <input
                  type="tel"
                  maxLength={10}
                  onChange={e => {
                    handleChange(e, 'phone');
                  }}
                  value={user.phone}
                  disabled={isPhoneVerified}
                />
                {errors.phone && (
                  <p className={styles.errorMessage}>{errors.phone}</p>
                )}
              </span>
              {isPhoneVerified && (
                <Image
                  className={styles.verifiedImage}
                  src={'/verified.jpg'}
                  alt="Verified"
                  width={20}
                  height={20}
                />
              )}

              {!isPhoneVerified && (
                <div>
                  {!isPhoneOtpSent ? (
                    <button
                      disabled={!!errors.phone || !user.phone || loading}
                      className={
                        loading ? styles.loadingButton : styles.verifyButton
                      }
                      onClick={sendPhoneOtp}
                    >
                      SEND
                    </button>
                  ) : (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        className={styles.otpInput}
                      />
                      <button
                        disabled={loading}
                        className={
                          loading ? styles.loadingButton : styles.verifyButton
                        }
                        onClick={verifyPhoneOtp}
                      >
                        Verify
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Aadhar Number Field of the User  */}
          <div>
            <label htmlFor="Aadhar">Aadhar Number</label>
            <div>
              <span>
                <input
                  type="tel"
                  maxLength={12}
                  onChange={e => {
                    handleChange(e, 'aadhar');
                  }}
                  value={user.aadhar}
                  disabled={isAadharVerified}
                />
                {errors.aadhar && (
                  <p className={styles.errorMessage}>{errors.aadhar}</p>
                )}
              </span>
              {isAadharVerified && (
                <Image
                  className={styles.verifiedImage}
                  src={'/verified.jpg'}
                  alt="Verified"
                  width={20}
                  height={20}
                />
              )}

              {!isAadharVerified && (
                <div>
                  {!isAadharNumberSent && (
                    <button
                      disabled={!!errors.aadhar || !user.aadhar || loading}
                      className={
                        loading ? styles.loadingButton : styles.verifyButton
                      }
                      onClick={verifyAadhar}
                    >
                      Verify
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Pan Number Field of the User  */}
          <div>
            <label htmlFor="Pan">Pan Number</label>
            <div>
              <span>
                <input
                  type="text"
                  onChange={e => {
                    handleChange(e, 'pan');
                  }}
                  value={user.pan}
                  disabled={isPanVerified}
                />
                {errors.pan && (
                  <p className={styles.errorMessage}>{errors.pan}</p>
                )}
              </span>
              {isPanVerified && (
                <Image
                  className={styles.verifiedImage}
                  src={'/verified.jpg'}
                  alt="Verified"
                  width={20}
                  height={20}
                />
              )}
              {!isPanVerified && (
                <div>
                  {!isPanNumberSent && (
                    <button
                      disabled={!!errors.pan || !user.pan || loading}
                      className={
                        loading ? styles.loadingButton : styles.verifyButton
                      }
                      onClick={verifyPan}
                    >
                      Verify
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Bank account Number Field of the User  */}
          <div>
            <label htmlFor="Bank">Bank Account</label>
            <div>
              <span>
                <input
                  type="text"
                  onChange={e => {
                    handleChange(e, 'bank');
                  }}
                  value={user.bank}
                  disabled={isBankAdd}
                />
                {errors.bank && (
                  <p className={styles.errorMessage}>{errors.bank}</p>
                )}
              </span>
              {isBankVerified && (
                <Image
                  className={styles.verifiedImage}
                  src={'/verified.jpg'}
                  alt="Verified"
                  width={20}
                  height={20}
                />
              )}
              {!isBankVerified && (
                <div>
                  {!isAccountNumberSent && (
                    <button
                      disabled={
                        !!errors.bank || !user.bank || loading || isBankAdd
                      }
                      className={
                        loading ? styles.loadingButton : styles.verifyButton
                      }
                      onClick={addBank}
                    >
                      &nbsp;ADD&nbsp;
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* IFSC Code Field of the User  */}
          <div>
            <label htmlFor="IFSC">IFSC Code</label>
            <div>
              <span>
                <input
                  type="text"
                  onChange={e => {
                    handleChange(e, 'ifsc');
                  }}
                  value={user.ifsc}
                  disabled={isBankVerified}
                />
                {errors.ifsc && (
                  <p className={styles.errorMessage}>{errors.ifsc}</p>
                )}
              </span>
              {isBankVerified && (
                <Image
                  className={styles.verifiedImage}
                  src={'/verified.jpg'}
                  alt="Verified"
                  width={20}
                  height={20}
                />
              )}
              {!isBankVerified && (
                <div>
                  {!isIfscSent && (
                    <button
                      disabled={!!errors.ifsc || !user.ifsc || loading}
                      className={
                        loading ? styles.loadingButton : styles.verifyButton
                      }
                      onClick={verifyBank}
                    >
                      Verify
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* GST Number Field of the User  */}
          <div>
            <label htmlFor="GST">GST Number</label>
            <div>
              <span>
                <input
                  type="text"
                  onChange={e => {
                    handleChange(e, 'gst');
                  }}
                  value={user.gst}
                  disabled={isGstVerified}
                />
                {errors.gst && (
                  <p className={styles.errorMessage}>{errors.gst}</p>
                )}
              </span>
              {isGstVerified && (
                <Image
                  className={styles.verifiedImage}
                  src={'/verified.jpg'}
                  alt="Verified"
                  width={20}
                  height={20}
                />
              )}

              {!isGstVerified && (
                <div>
                  {!isGstNumberSent && (
                    <button
                      disabled={!!errors.gst || !user.gst || loading}
                      className={
                        loading ? styles.loadingButton : styles.verifyButton
                      }
                      onClick={verifyGst}
                    >
                      Verify
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Pincode Lookup Field of the User  */}
          <div>
            <label htmlFor="Pincode">Pincode</label>
            <div>
              <span>
                <input
                  type="text"
                  onChange={e => {
                    handleChange(e, 'pincode');
                  }}
                  value={user.pincode}
                  disabled={isPincodeVerified}
                />
                {errors.gst && (
                  <p className={styles.errorMessage}>{errors.pincode}</p>
                )}
              </span>
              {isPincodeVerified && (
                <Image
                  className={styles.verifiedImage}
                  src={'/verified.jpg'}
                  alt="Verified"
                  width={20}
                  height={20}
                />
              )}
              {!isPincodeVerified && (
                <div>
                  {!isPincodeSent && (
                    <button
                      disabled={!!errors.pincode || !user.pincode || loading}
                      className={
                        loading ? styles.loadingButton : styles.verifyButton
                      }
                      onClick={getAddress}
                    >
                      &nbsp;GET&nbsp;
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          {address &&
            address.City &&
            address.District &&
            address.State &&
            address.Post_Office && (
              <div className={styles.addressLookup}>
                <div>
                  <p>ADDRESS LOOKUP DETAILS</p>
                  <ul>
                    <li>City: {address.City}</li>
                    <li>District: {address.District}</li>
                    <li>State: {address.State}</li>
                    <li> Post Office: {address.Post_Office}</li>
                  </ul>
                </div>
              </div>
            )}
        </div>
        <button className={styles.button} onClick={handleSubmit}>
          Register
        </button>
      </div>

      {formSubmit && (
        <div className={styles.success}>
          <p>User Registered Successfully</p>
        </div>
      )}
    </div>
  );
};

export default Register;
