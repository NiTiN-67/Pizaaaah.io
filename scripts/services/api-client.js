//HTTP/ HTTPS Call
// import URL from '../utils/constants.js';
/*async function makeNetworkCall() {
  const promise = await fetch(
    "https://gist.githubusercontent.com/kshirsagarps/36fade16fa39202715656ef487aaf7b0/raw/2b682e589ef283f06be42d2799dfa54f57794a6e/Pizza.json"
  );
  const data = await promise.json();
  console.log("Data is ", data);
}
makeNetworkCall();*/

// function makeNetworkCall1() {
//     const promise = fetch("https://gist.githubusercontent.com/kshirsagarps/36fade16fa39202715656ef487aaf7b0/raw/2b682e589ef283f06be42d2799dfa54f57794a6e/Pizza.json");
//     console.log("Promise is ", promise);
//     promise.then(response => {
//         console.log("Response is ", response);
//         const promise2 = response.json();
//         promise2.then(data => console.log("Data is ", data))
//             .catch(e => console.log("JSON parse error ", e))
//     }).catch(err => {
//         console.log("Error is ", err);
//     })
// }
// makeNetworkCall1();
import URL from '../utils/constants.js';

async function makeNetworkCall(){
    try{
        const response = await fetch(URL);
        // console.log('Response is ', response);
        const object = await response.json();
        // console.log('Object is ', object);
        return object;
    }
    catch(err){
        console.log('Some Problem in API call ', err);
        throw err;
    }
}
export default makeNetworkCall;
