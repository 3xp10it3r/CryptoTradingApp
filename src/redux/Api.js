import axios from "axios";
export const requestCryptoData = () => {
  return axios.request({
    method: "get",
    url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=7d",
    // url:"https://my-json-server.typicode.com/atothey/demo/user"
  });
};
