//!Web3
const web3 = require('../web3/web3');


//!Contract value 
const { abi,address,network } = require('../../data/CourseMarketPlaceLocal.json');


//*loadContractData
const loadContractData = async () => {
    if (typeof window.ethereum !== 'undefined') {
        // MetaMask is installed
        if (window.ethereum.isConnected()) {
          // User is logged in to MetaMask
          console.log('User is logged in to MetaMask');
        } else {
          // User is not logged in to MetaMask
          console.log('User is not logged in to MetaMask');
        }
      } else {
        // MetaMask is not installed
        console.log('MetaMask is not installed');
      }


    const account_address = (await web3.eth.getAccounts())[0]
    const account_balance = web3.utils.fromWei(await web3.eth.getBalance(account_address),'ether')
    const contract = new web3.eth.Contract(JSON.parse(abi),address)   

    return {contract,network,account_balance,account_address,web3}
}
module.exports = {loadContractData}