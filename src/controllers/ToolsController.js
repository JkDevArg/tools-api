const axios = require("axios");
const querystring = require('querystring');
const { CatchAsync, Response, ApiUrl, ValidateIP, Dns } = require('../utils');
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

// Email verified
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

// Mac verified
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

// Gen Email
const generateEmail = CatchAsync(async (req, res) => {
    const apiUrl = ApiUrl.genEmail;
    const count = req.query.count ? `${req.query.count}` : 1;
    const urlApi = `${apiUrl}?action=genRandomMailbox&count=${count}`;

    try {
        const resapi = await axios.get(urlApi)
        return Response.jsonResponse(res, resapi.status, resapi.data, {'site' : 'https://www.1secmail.com/'});
      } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
      }
});

//Check Domain
const validateDomain = CatchAsync(async (req, res) => {
    const domain = req.query.domain;
    try {
        const dnsRecords = await Dns.resolveDomain(domain); // Resuelve el dominio para obtener los registros DNS

        if (dnsRecords.length > 0) {
            // El dominio existe
            return res.status(200).json({ message: `El dominio ${domain} existe.` });
        } else {
            // El dominio no existe
            return res.status(400).json({ message: `El dominio ${domain} no existe.` });
        }
    } catch (error) {
        return res.status(500).json({ message: `El dominio ${domain} no existe.` });
    }
});

module.exports = {
    geoIp,
    geoIpv2,
    phoneVerified,
    emailVerified,
    MacLookup,
    generateEmail,
    validateDomain,
}
