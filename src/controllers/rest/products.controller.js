import util from 'node:util'
// import { productsManager as manager } from "../dao/productsManager.js"
import { productsManager as manager } from "../../dao/index.js"

export async function postController(req, res) {
    const pojo = req.body
    try {
        const entity = await manager.create(pojo)
        res['newProduct']()
        // res.status(201).json(pojo)
        res.status(201).json(entity.toObject())
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


export async function getController(req, res) {
    const {page = 1,limit = 10, sort, ...query} = req.query
    // const pojos = await manager.findAll({limit})
    const options = {page, limit}
    if (sort)
      options.sort = {price: sort}

    try {
        const {docs: payload, prevPage, nextPage,  ...rest} = await manager.paginate(query, options)
        const response = {
            status: 'success',
            payload,
            ...rest,
            prevLink: rest.hasPrevPage ? `/api/products?page=${rest.prevPage}&limit=${rest.limit}` : null,
            nextLink: rest.hasNextPage ? `/api/products?page=${rest.nextPage}&limit=${rest.limit}` : null,
        }
        res.status(200).json(response)
    } catch (error) {
    
    }
}

export async function getByIdController(req, res) {
    const id = req.params.id
    try {
        // const pojo = await manager.getById(id)
        const pojo = await manager.findById({_id: id}).lean()
        res.json(pojo)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}

export async function updateController(req, res) {
    const id = req.params.id
    const fields = req.body
    try {
        // const pojos = await manager.update(id,fields)
        // res.json(pojos)
        const actualizado = await manager.findByIdAndUpdate(id, {$set: fields}, { new: true})
        console.log({actualizado})
        if (!actualizado){
            res.status(404).json({message: 'usuario no encontrado'})
        }
        res.json({actualizado})
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}

export async function deleteController(req, res) {
    const id = req.params.id
    try {
        // const pojo = await manager.delete(id)
        const pojo = await manager.findByIdAndDelete(id)
        if (!pojo){
            res.status(404).json({message: 'usuario no encontrado'})
        }
        res['newProduct']()
        res.json(pojo)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}
