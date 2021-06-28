const router = require('express').Router();
const fs = require("fs");

/**
 * @swagger
 * /employee/getRecords:
 *   get:
 *     description: Get employee record
 *     responses: 
 *       200:
 *         description: Response body object
 *         schema: 
 *           type: object
 *           properties: 
 *             success: 
 *               type: boolean
 *               enum: [true, false] 
 *             data: 
 *               type: object
 *             noOfEmployees: 
 *               type: string
 *       500: 
 *         description: Response body object
 *         schema: 
 *           type: object
 *           properties: 
 *             success: 
 *               type: boolean
 *               enum: [false, true]
 *             message: 
 *               type: string
 */
router.get("/getRecords", async(req, res) => {

    try{

    const rawData = await fs.readFileSync('employee.json')
    let employeeData = JSON.parse(rawData)

    res.status(200).json({
        success: true,
        data:{
            employeeData
        },
        noOfEmployees: employeeData.data.length
    })

    } catch(err) {
        res.status(500).json({
            success: false,
            message: `Couldn't fetch data`
        })
    }
    

})
module.exports = router;