const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title:{
        type:String,
        required: true,

    },
    description:{
        type : String,
    },
    image:{
      url: String,
      filename: String,    
    },
    price:{
        type:Number,
    },
    contact:{
        type: Number,
        required: true
    },
    location:{
        type: String
    },
    country:{
        type: String
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    
});

// const listingSchema = new Schema ({
//     title : {
//         type : String,
//         required:true,
//     },
//     description : String,
//     image : {
//         url:String,
//         default:"https://unsplash.com/photos/a-house-in-the-middle-of-a-forest-covered-in-snow-sYPbrjBc8z8",
//         set: (v) => v === "" ? "https://unsplash.com/photos/a-house-in-the-middle-of-a-forest-covered-in-snow-sYPbrjBc8z8" : v ,
//     }, 
//     price : Number,
//     location : String,
//     country : String,

//     reviews : [
//         {
//             type : Schema.Types.ObjectId,
//             ref : "Review",
//         }
//     ],
//     owner : {
//         type : Schema.Types.ObjectId,
//         ref : "User",
//     },
    
  
// });

listingSchema.post("findOneAndDelete" , async (listing) =>{
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
    
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;