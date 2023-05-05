import axios from 'axios';
const AxiosCall = class {
    constructor (prompt, url,tokenApi) {
        this.prompt = prompt;
        this.url = url;
        this.tokenApi = tokenApi;
    }
    postChatgpt() {
        return axios.post(this.url,this.prompt, {headers: { Authorization: `Bearer ${this.tokenApi}` }});
    }
    getWeather() {
        return axios.post(this.url,this.prompt, {headers: { key:`${this.tokenApi}`, q:`${this.prompt.q}` }});
    }
    get() {
        return axios.get(this.url);
    }
}
export default AxiosCall;