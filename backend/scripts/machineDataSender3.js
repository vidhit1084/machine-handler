const axios = require("axios");

const machineName = "testing";

const sendMachineName = async () => {
  try {
    const response = await axios.post("http://localhost:3000/machines/update", {
      name: machineName,
    });
    console.log(response.data.message);
  } catch (error) {
    console.error("error sending machine name:", error.message);
  }
};

setInterval(sendMachineName, 10000);
