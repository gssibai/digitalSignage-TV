
const apiUrl = process.env.API_URL;

interface Payload {
    screenName: string;
   // screenID: string;
}
export const createScreen = async function POST(payload: Payload){
const body = await fetch(apiUrl + 'Screen',{
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(payload),
})
const response = await body.json();
return response;
}