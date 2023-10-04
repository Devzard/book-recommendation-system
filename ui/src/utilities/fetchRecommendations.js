import axios from 'axios'
import Config from "../../app.dev.config.json"

export default async function recommendBoooks(book_name) {
    let data = []
    await axios.post(Config.api.url + '/recommend', {
        'name': book_name
    })
        .then(response => {
            data = response.data
        })
        .catch(error => {
            console.log(error)
        })

    return data
}