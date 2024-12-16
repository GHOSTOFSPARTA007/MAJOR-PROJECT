const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title:{
    type:String,
    required:true,
    },
    description: String,
    image:{
       url: String,
       filename: String,
    },
    price:Number,
    location:String,
    country:String,
    
    reviews: [{
          type: Schema.Types.ObjectId,
          ref: "Review",
    },
   ],  
   owner:{
     type: Schema.Types.ObjectId,
     ref:"User",
   },
//    category:{
//      type:String,
//      enum:["mountains", "artic", "farms","deserts"]
//    }
});

listingSchema.post("findOneAndDelete", async (listing) =>{
     if(listing){
          await Review.deleteMany({_id: {$in: listing.reviews} });
     }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports =Listing;


// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// // URL validation regex pattern (basic validation for URL format)
// const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   image: {
//     type: String,
    
//     default:
//       "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//     set: (v) => {
//       // If v is not a string, treat it as invalid
//     //   if (typeof v !== 'string') {
//     //     return "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";
//     //   }
      
//       // If the value is an empty string or null, return the default URL
//       if (v.trim() === "") {
//         return "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";
//       }
      
//       // If the value is a valid URL, return it
//       if (urlRegex.test(v)) {
//         return v;
//       }
      
//       // Otherwise, throw an error if the URL is invalid
//       throw new Error("Invalid URL format");
//     },
//   },
//   price: Number,
//   location: String,
//   country: String,
// });

// // Create and export the model
// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;
