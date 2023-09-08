const Machine = require("../models/machine");
const cron = require("node-cron");
const Slack = require("@slack/bolt");
const dotenv = require("dotenv");

dotenv.config();

const slackApp = new Slack.App({
  signingSecret: "55a52b16e490499b56a424db1f7076a0",
  token: process.env.SLACK_BOT_TOKEN,
});
// Handle incoming data from machines
exports.updateMachine = async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the machine already exists

    const startTime = performance.now();
    let machine = await Machine.findOne({ name });

    if (machine) {
      // Update the lastUpdateTime
      machine.lastUpdateTime = Date.now();
    } else {
      // Create a new machine entry
      machine = new Machine({ name });
    }

    const savedMachine = await machine.save();
    const endTime = performance.now();

    const executionTime = endTime - startTime; // Calculate execution time in milliseconds

    // console.log(`updateMachine took ${executionTime} ms`);
    return res.json({
      machine: savedMachine,
      message: "Machine data updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

cron.schedule("*/15 * * * * *", async () => {
  const startTime = performance.now(); // Record start time

  const machines = await Machine.find();

  machines.forEach(async (machine) => {
    const lastUpdateTime = new Date(machine.lastUpdateTime);
    // console.log(lastUpdateTime, "last updated time");
    const currentTime = new Date();
    // console.log(currentTime, "current time");

    const timeDifference = Math.abs((currentTime - lastUpdateTime) / 1000);
    // console.log(timeDifference, "timeDifference");

    if (timeDifference > 10) {
      console.log(`Machine ${machine.name} is not working`);
      await slackApp.client.chat.postMessage({
        signingSecret: "55a52b16e490499b56a424db1f7076a0",
        token: "xoxb-5872869788036-5870567588258-y7cJij4UQQMW7yGKaH4n6eR8",
        channel: "test",
        text: `Machine ${machine.name} is not working`,
      });
    }
  });
  const endTime = performance.now(); // Record end time
  const executionTime = endTime - startTime; // Calculate execution time in milliseconds
  console.log("working fine");

  //   console.log(`cron job took ${executionTime} ms`);
});
