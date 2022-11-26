import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import * as dotenv from "dotenv";

dotenv.config();


const PK = process.env.PRIVATE_KEY; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

const sendNotification = async() => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `Whitelisting Notification.`,
        body: `Congo!! upon getting whitelisted to Crypto Devs.`
      },
      payload: {
        title: `Time to get witelisted.`,
        body: `Use my Dapp to get notified.`,
        cta: '',
        img: ''
      },
      recipients: 'eip155:5:0x05F6aAC33d9D93D63c7016B5FAEc8469283c8fd2', // recipient address
      channel: 'eip155:5:0xF35598839C3937F18e9b6f2a792E028edA70D97D', // your channel address
      env: 'staging'
    });
    
    // apiResponse?.status === 204, if sent successfully!
    console.log('API response: ', apiResponse);
  } catch (err) {
    console.error('Error: ', err);
  }
}

sendNotification();