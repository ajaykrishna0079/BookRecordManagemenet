const express=require("express");
const { users } = require("../data/users.json");

const router=express.Router();
    /**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */

router.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      data: users,
    });
  });
  
  /**
   * Route: /users/:id
   * Method: GET
   * Description: Get single user by their id
   * Access: Public
   * Parameters: Id
   */
  router.get("/:id", (req, res) => {
    // const  id  = req.params.id;
    const { id } = req.params;
    console.log(req.params);
    const user = users.find((each) => each.id === id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Doesn't Exist !!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  });
  
  /**
   * Route: /users
   * Method: POST
   * Description: Creating a new user
   * Access: Public
   * Parameters: None
   */
  router.post("/", (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } =
      req.body;
  
    const user = users.find((each) => each.id === id);
  
    if (user) {
      return res.status(404).json({
        success: false,
        message: "User With The ID Exists",
      });
    }
  
    users.push({
      id,
      name,
      surname,
      email,
      subscriptionType,
      subscriptionDate,
    });
  
    return res.status(201).json({
      success: true,
      message: "User Added Succesfully",
      data: users,
    });
  });
  
  /**
   * Route: /users/:id
   * Method: PUT
   * Description: Updating a user by their id
   * Access: Public
   * Parameters: ID
   */
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
  
    const user = users.find((each) => each.id === id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Doesn't Exist !!",
      });
    }
    const updateUserData = users.map((each) => {
      if (each.id === id) {
        return {
          ...each,
          ...data,
        };
      }
      return each;
    });
    return res.status(200).json({
      success: true,
      message: "User Updated !!",
      data: updateUserData,
    });
  });
  
  
  /**
   * Route: /users/:id
   * Method: DELETE
   * Description: Deleting a user by their id
   * Access: Public
   * Parameters: ID
   */
  router.delete("/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Doesn't Exist !!",
      });
    }
    const index=users.indexOf(user);
    users.splice(index,1)
    return   res.status(404).json({success:true,message:"Deleted user..." , data:users})
  // need to build logic for delete here...
  })
  module.exports=router;