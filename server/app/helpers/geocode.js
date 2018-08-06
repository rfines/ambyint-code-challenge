
import Reader from '../files/reader'
import Address from '../models/Address'
import Promise from 'bluebird'

const client = require('@google/maps').createClient({
    key: 'AIzaSyAfxgBGZgaBNDlfm5S_2GON5GegfdUeqk0',
    Promise: Promise
  });
class Geocoder {
    constructor(path) {
        this.filePath = path        
    }
    doWork() {
        return this.fetchAddresses().then((models) => {
            return models
        }).catch(ex => console.error(ex))
    }
    fetchAddresses() {
        return new Promise((resolve, reject) => {
            const filereader = new Reader(this.filePath)
            filereader.read().then((addresses) => {
                this.processAddresses(addresses).then((addressModels) => {
                    resolve(addressModels)
                }).catch((ex) => {
                    reject(ex)
                })
            }).catch((ex) => {
                this.addresses = []
                reject(ex)
            })
        })
    }
    processAddresses(addresses) {
        return new Promise((resolve, reject) => {   
            if (addresses && addresses.length > 0) {
                addresses.forEach((add) => {
                    var temp = add
                    this.alreadyGeocoded(add).then((addrFromDb) => {
                        if (!addrFromDb && temp !== '') {
                            this.geocode(temp).then((model) => {
                                model.save((err, m) => { 
                                    if(err){
                                        reject(err)
                                    }        
                                    resolve(m)
                                })
                            }, (rejected) => reject(rejected))
                            .catch((ex) => {
                                reject(ex)
                            })
                        }else {
                            reject('empty line in file')
                        }

                    }).catch((ex) => {
                        reject(ex)
                    })
                })
            } else {
                resolve([])
            }
        })
    }
    geocode(add) {
        return new Promise((resolve, reject) => {    
            let payload = { address: add };
            client.geocode(payload).asPromise()
                .then((response) => {
                    if(response.json.results && response.json.results.length > 0){
                        let geocoded = response.json.results[0]
                        let a = {
                            address: add,
                            formattedAddress: geocoded.formatted_address,
                            geo: geocoded.geometry,
                            city: geocoded.address_components.filter((ac) => {
                                    return ac.types.indexOf('sublocality') >= 0
                                })[0],
                            state: geocoded.address_components.filter((ac) => {
                                    return ac.types.indexOf('administrative_area_level_1') >= 0
                                })[0],
                            postalCode: geocoded.address_components.filter((ac) => {
                                    return ac.types.indexOf('postal_code') >= 0
                                })[0],
                            placeId: geocoded.place_id
                        }
                        let model = new Address(a)
                        resolve(model)
                    } else {
                        // there were no matches but to prevent making continuous requests during development I decided to store empty addresses with the values passed in
                        let emptyA = {
                            address: add,
                            formattedAddress: add,
                            geo: {
                                location: {
                                    lat: 0,
                                    lng: 0
                                },
                                location_type: 'NON_EXISTENT'
                            },
                            placeId: Math.random() + Math.random()
                        }
                        let model = new Address(emptyA)
                        resolve(model)
                    }
                }).catch((ex) => {
                    reject(ex)
                })
        })
    }
    alreadyGeocoded(address) {
        let a = address
        return new Promise((resolve, reject) => {
            Address.findOne({ address: a }, (err, addr) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(addr, a)
                }
            })
        })
    }
}
export default Geocoder