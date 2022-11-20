const CryptoJS = require('crypto-js');
require('dotenv').config();
var axios = require('axios');
var FormData = require('form-data');

const createPayment = async ( info ) => {

    const params = [
        { name:'amount', value: info.amount },
        { name:'apiKey', value: process.env.FLOW_API_KEY },
        { name:'commerceOrder', value: info.commerceOrder },   
        { name:'currency', value: 'CLP'},
        { name:'email', value: info.email },
        { name:'subject', value: info.subject },
        { name:'urlConfirmation', value: `${process.env.FLOW_URL_CONFIRM}${process.env.FLOW_INTER_SECRET_KEY}` },
        { name:'urlReturn', value: process.env.FLOW_URL_RETURN }
    ]
     
    let out = '';
    
    params.forEach(element => { out += element.name + element.value } );
    var sign = CryptoJS.HmacSHA256(out, process.env.FLOW_SECRET_KEY ).toString();

    var data = new FormData();
    data.append('apiKey', process.env.FLOW_API_KEY );
    data.append('commerceOrder', info.commerceOrder );
    data.append('currency', 'CLP');
    data.append('amount', info.amount );
    data.append('email', info.email );
    data.append('subject', info.subject );
    data.append('urlConfirmation',  `${process.env.FLOW_URL_CONFIRM}${process.env.FLOW_INTER_SECRET_KEY}` );
    data.append('urlReturn', process.env.FLOW_URL_RETURN );
    data.append('s', sign);

      var config = {
        method: 'post',
        url: `${process.env.FLOW_URL}/payment/create`,
        headers: { 
            ...data.getHeaders()
        },
        data : data
      };
      
      const payment = await axios(config)
      .then(function (response) {
        console.log("🚀 ~ file: flow.js ~ line 49 ~ response.data", response.data)
        return response.data
      })
      .catch(function (error) {
        console.log(error);
        return -1;
      });

      return payment;
}
const getStatus = async ( token ) => {

  const params = [
      { name:'apiKey', value: process.env.FLOW_API_KEY },
      { name:'token', value: token} 
  ]
   
  let out = '';
  
  params.forEach( element => { out += element.name + element.value } );
  
  var sign = CryptoJS.HmacSHA256(out, process.env.FLOW_SECRET_KEY ).toString();

    var config = {
      method: 'get',
      url: `${process.env.FLOW_URL}/payment/getStatus?apiKey=${process.env.FLOW_API_KEY}&token=${token}&s=${sign}`,
    };
    
    const payment = await axios(config)
    .then(function (response) {
      console.log("🚀 ~ file: flow.js ~ line 49 ~ response.data", response.data)
      return response.data
    })
    .catch(function (error) {
      console.log(error);
      return -1;
    });

    return payment;
}
module.exports = { createPayment, getStatus }