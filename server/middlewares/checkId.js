import { isValidObjectId } from "mongoose";

export default function checkId(req, res, next) {
    if(!isValidObjectId(req.params.id)) {
        res.status(404)
        throw new Error(`invalid object of: ${req.params.id}`)
    }
    next()
}