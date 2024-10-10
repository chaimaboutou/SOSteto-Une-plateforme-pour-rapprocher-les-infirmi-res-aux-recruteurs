const { Role } = require('../../model/schema')

exports.createRole =  async (req, res) => {
    try {
        const role = new Role(req.body)
        await role.save()
        res.status(201).send(role)
    }catch(error) {
        res.status(500).json({message : error.message})
    }
}


exports.getAllRoles =  async (req, res) => {
    try {
        const roles = await Role.find()
        res.status(200).send(roles);
    }catch(error) {
        res.status(500).json({message : error.message})
    }
}