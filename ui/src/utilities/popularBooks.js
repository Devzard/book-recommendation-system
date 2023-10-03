import axios from 'axios'
import Config from "../../app.dev.config.json"

export default async function fetchBooks(top = 10) {
    let data = []
    await axios.get(Config.api.url + '/popular/' + top)
        .then(response => {
            data = response.data
        })
        .catch(error => {
            console.log(error)
        })

    return data
}