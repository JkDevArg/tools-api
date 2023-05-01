const axios = require("axios");
const querystring = require('querystring');
const { CatchAsync, Response, ApiUrl, ValidateIP } = require('../utils');
require('dotenv').config()

// IP
const geoIp = CatchAsync(async (req, res) => {
    const ip = req.params.ip;
    const isIP = await ValidateIP.isIP(ip);
    if (!isIP) {
        return Response.jsonResponse(res, 400, { 'msg': 'Invalid IP' });
    }

    try {
        const apiUrl = ApiUrl.geoIpv1;
        const urlApi = `${apiUrl}/${ip}`;

        const resapi = await axios.get(urlApi);
        return Response.jsonResponse(res, resapi.status, resapi.data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

// IP V2
const geoIpv2 = CatchAsync(async (req, res) => {
    const ip = req.params.ip;
    const isIP = await ValidateIP.isIP(ip);
    if (!isIP) {
        return Response.jsonResponse(res, 400, { 'msg': 'Invalid IP' });
    }

    try {
        const apiUrl = ApiUrl.geoIpv2;
        const apikey = process.env.API_GEOIP_V2;
        const urlApi = `${apiUrl}/${ip}?access_key=${apikey}`;

        const resapi = await axios.get(urlApi);
        return Response.jsonResponse(res, resapi.status, resapi.data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

// phone
const phoneVerified = CatchAsync(async (req, res) => {
    const phone = req.params.phone;
    const apiUrl = ApiUrl.phoneValid;
    const urlApi = `${apiUrl}?${querystring.stringify({number: phone})}`;

    try {
        const config = { headers: { 'apikey': process.env.API_LAYER_KEY } };
        const resapi = await axios.get(urlApi, config);
        return Response.jsonResponse(res, resapi.status, resapi.data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

const emailVerified = CatchAsync(async (req, res) => {
    const email = req.query.email;
    const apiUrl = ApiUrl.validEmail;
    const urlApi = `${apiUrl}?${querystring.stringify({email: email})}`;
    console.log(urlApi)
    try {
        const config = { headers: { 'apikey': process.env.API_LAYER_KEY_VALID_EMAIL } };
        const resapi = await axios.get(urlApi, config);
        return Response.jsonResponse(res, resapi.status, resapi.data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

const MacLookup = CatchAsync(async (req, res) => {
    const mac = req.query.mac;
    const apiUrl = ApiUrl.MACLookUp;

    try {
      const resapi = await axios.post(apiUrl, { "macAddress": mac, "not-web-search" : true });
      return Response.jsonResponse(res, resapi.status, resapi.data);
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
});



module.exports = {
    geoIp,
    geoIpv2,
    phoneVerified,
    emailVerified,
    MacLookup,
}
