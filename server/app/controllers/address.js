
import Address from '../models/Address'
import { uniq } from 'lodash'

export default {
    get: (req, res) => {
        /*
            Filters for this endpoint must follow the following pattern
            filter=<FIELD_NAME>&value=<VALUE_TO_FILTER>

            As per the requirements the default filter is 
                geo.location_type=ROOFTOP
        */
        let query = {'geo.location_type': 'ROOFTOP'};
        if (req.query && req.query.filter) {
            query[req.query.filter] = req.query.value
        }
        Address.find(query, (err, addresses)=> {
            if(err) {
                res.status(500).send({ error: err });
            }
            res.json(addresses)

        })
    },
    types: (req, res) => {
        Address.find({}, 'geo.location_type', (err, docs)=> {
            if(err) {
                res.status(500).send({ error: err })
            }
            let types = []
            if (docs && docs.length > 0) {
                types = docs.map((doc) => {
                    return doc.geo.location_type
                })
            }

            res.json(uniq(types))

        })
    }
}