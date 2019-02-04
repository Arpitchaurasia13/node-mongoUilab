var mongoose  = require('mongoose');



var crud ={
   title : "crudapp",
   statusCode :200
}

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://root:root123@ds151863.mlab.com:51863/cruddb',
                {useNewUrlParser: true})

   var myData = mongoose.Schema({
       name:{
           type:String,
           required: true
       },
       email:{
           type: String,
           required: true,
       }
   },{collection:'datacrud'});

   var model = mongoose.model('datacrud',myData);

crud.addData = function(req,res){
   var postBody = req.body;
   console.log(postBody);
   
   var data ={
       name:postBody.name,
       email:postBody.email
   }

   var saveData = new model(data);


   saveData.save(function(err,data1){
      
    if(err){
        res.send({
            statusCode:500,
            message:"data did not save"
        })
    }else{
        res.send({
            statusCode:200,
            message: 'data saved',
            data:data1
        })
    }
   })

}

crud.getData = function(req,res){
    model.find({},function(err,data1){
        if(err){
            res.send({
                statusCode:500,
                message:'data did not get '
            })
        }else{
            res.send({
                statusCode:200,
                message:'GET data from db ',
                data:data1
            })

        }
    });
}
crud.deleteData = function(req,res){

    var postBody = req.params.id;
    
    console.log(postBody);

    model.findByIdAndDelete(postBody,function(err,data1){
        if(err){
            res.send({
                statusCode:400,
                message:'data did not delete '
            })
        }else{
            res.send({
                statusCode:200,
                message:'data  is deleted Successfully ',
                data:data1
            })

        }
    });



}


crud.updateData = function(req,res){

    var postBody = req.body;
    console.log(postBody);
    var data = {
        name:postBody.name,
        email:postBody.email
    }
   
    var updateID=  req.params.id;

    model.findOneAndUpdate(updateID,data,function(err,data1){
        if(err){
            res.send({
                statusCode:500,
                message:'data did not update '
            })
        }else{
            res.send({
                statusCode:200,
                message:'data  is updated successfully',
                data:data1
            })

        }
    });



}






module.exports = crud;