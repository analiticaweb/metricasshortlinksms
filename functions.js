const axios = require("axios");

const shortLink = async (dataArray) => {
    // var flag = true
    var dataList = await dataArray.map((item) => {

        let dataEncode = Buffer.from(JSON.stringify({
            email: item.email,
            campaign: item.campaign,
            destiny: item.destiny
        })).toString('base64')

        return axios({
            method: "POST",
            url: 'https://api.rebrandly.com/v1/links',
            headers: {
                "Content-Type": "application/json",
                "apikey": "19b66fe3a79c45f7836597af4de17bfd",
                "workspace": "d4e97c7b2ce04116b5776010224c8357"
            },
            data: {
                destination: item.urlApiCRM + "?query=" + dataEncode,
                domain: { fullName: "rebrand.ly" }
            }
        }).then(function (response) {
            // if (flag) { console.log(response); flag = !flag }
            return ({ ...item, shortURL: response.data.shortUrl });
        })
            .catch(function (error) {
                // if (flag) { console.log(error); flag = !flag };
                return ({ ...item, shortURL: null });
            });
    })

    Promise.all(dataList).then(results => {
        console.log(results);
    })
}

module.exports = {
    shortLink
};
