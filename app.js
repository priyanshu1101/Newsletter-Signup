const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const client = require("@mailchimp/mailchimp_marketing");
const port=process.env.PORT; //So as to run on heroku
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))
const list={
    email_address: "",
    status: "",
    merge_fields:
        {
            FNAME: "",
            LNAME: ""
        }
};

client.setConfig({
  apiKey: "66ef8ed85b8af4cbb5b29178b12a272a-us8",
  server: "us8",
});


app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res)
{
    list.email_address=req.body.inputEmail;
    list.status="subscribed";
    list.merge_fields.FNAME=req.body.firstName;
    list.merge_fields.LNAME=req.body.secondName;
    var value;
    const run = async () => {
        // const response = await client.lists.getAllLists();

        // const response = await client.lists.getList("e513c2e832");
        try{
            const response = await client.lists.addListMember("e513c2e832", list);    
        }
        catch(e)
        {
            res.sendFile(__dirname+"/failure.html");
        }
        res.sendFile(__dirname+"/success.html");
    };
    run();
});

app.listen(port)
{
    console.log("Listening to port :"+port);
}

//Api key :66ef8ed85b8af4cbb5b29178b12a272a-us8
// Audience Id:e513c2e832
//server prefix : us8

