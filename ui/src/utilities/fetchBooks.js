import axios from 'axios'
import Config from "../../app.dev.config.json"

export default async function fetchBooks(searchText) {
    let data = []
    await axios.get(Config.api.url + '/search/' + searchText)
        .then(response => {
            data = response.data
        })
        .catch(error => {
            console.log(error)
        })

    return data
}