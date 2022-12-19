const express = require("express")
const router = express.Router()
const { db } = require('../firebase.js')

// route to pull up different dorm types (freshman, non-freshman, off-campus)
router.route('/:dormtype').get(async (req, res) => {
    const ref = db.collection(req.params.dormtype)
    const snapshot = await ref.get()
    let dorms = []

    // for each document add to array
    for (let doc of snapshot.docs) {
        dorms.push({id: doc.id, data: doc.data(), type: req.params.dormtype})
    }

    // send the array from the backend 
    res.status(200).send(dorms)
})

// route for specific dorm based off dormid
router.route('/:dormtype/:dormid').get(async (req, res) => {
    const ref = db.collection(req.params.dormtype).doc(req.params.dormid)
    const snapshot = await ref.get()

    if (!snapshot.exists) {
        return res.sendStatus(400)
    }
    else {
        res.status(200).send({
            id: snapshot.id,
            data: snapshot.data(),
        })
    }
})

// route to add review to dorm databases
router.route('/:dormtype/:dormid/dorm-review').post(async (req, res)=> {
    const review = req.body
    const ref = db.collection(req.params.dormtype).doc(req.params.dormid)
    const snapshot = await ref.get()
    if (!snapshot.exists) {
        return res.sendStatus(400)
    }
    else {
        let reviews = snapshot.data()['reviews']
        reviews.push(review)
        const response = await ref.set({reviews: reviews}, {merge: true})

        res.status(200).send(response)
    }
})

// route to add review to user databases
router.route('/:dormtype/:dormid/user-review').post(async (req, res) => {

    const ref = db.collection('users').doc(req.body.user)
    const review = req.body
    const snapshot = await ref.get()
    if (!snapshot.exists) {
        return res.sendStatus(400)
    }
    else {
        let reviews = snapshot.data()['reviews']
        reviews.push(review)
        const response = await ref.set({reviews: reviews}, {merge: true})
        return response
    }
})

// route to delete review from user database
router.route('/profile/:user/delete-review/dorm').delete(async (req, res) => {

    const ref = db.collection(req.body.dormtype).doc(req.body.dormid)
    const snapshot = await ref.get()

    if (!snapshot.exists) {
        return res.sendStatus(400)
    }
    else {
        let reviews = snapshot.data()['reviews']
        const finalReviews = reviews.filter((rev, revIndex) => rev['timestamp']  !== req.body.timestamp)
        const response = await ref.set({reviews: finalReviews}, {merge: true})
        return response
    }

})

// route to delete review from user database
router.route('/profile/:user/delete-review/user').delete(async (req, res) => {

    const ref = db.collection('users').doc(req.body.user)
    const snapshot = await ref.get()

    if (!snapshot.exists) {
        return res.sendStatus(400)
    }
    else {
        let reviews = snapshot.data()['reviews']
        const finalReviews = reviews.filter((rev, revIndex) => rev['timestamp'] !== req.body.timestamp)
        const response = await ref.set({reviews: finalReviews}, {merge: true})
        return response
    }
})

// route to get cleanliness, facilities, and location ratings for a given dorm
router.route('/:dormtype/:dormid/statistics').get(async (req, res) => {
    const ref = db.collection(req.params.dormtype).doc(req.params.dormid)
    const snapshot = await ref.get()

    if (!snapshot.exists) {
        return res.sendStatus(400)
    }
    else {
        const reviews = snapshot.data()['reviews']
        const statistics = {cleanliness: 0, facilities: 0, location: 0}
        
        for (let review of reviews) {
            statistics['cleanliness'] += parseInt(review['cleanliness'])
            statistics['facilities'] += parseInt(review['facilities'])
            statistics['location'] += parseInt(review['location'])
        }

        statistics['cleanliness'] /= reviews.length
        statistics['facilities'] /= reviews.length
        statistics['location'] /= reviews.length

        // update the cleanliness/facilities/location fields in the db!!
        const response = await ref.set({statistics: statistics}, {merge: true})

        res.status(200).send(statistics)
    }
})


module.exports = router