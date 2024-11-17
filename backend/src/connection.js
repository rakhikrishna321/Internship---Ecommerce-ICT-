import mongoose from 'mongoose'; // Use import syntax

// Connect to MongoDB
mongoose.connect("mongodb+srv://rakhikrishnagk:rakhikrish@cluster0.pjlmd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log(err);
    });

export default mongoose; // Export mongoose if needed elsewhere
