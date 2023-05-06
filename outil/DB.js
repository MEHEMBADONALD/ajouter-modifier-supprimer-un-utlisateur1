const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://bninwowondjoufack:Landry99@cluster0.tt3lwp5.mongodb.net/?retryWrites=true&w=majority')
mongoose.connect('mongodb://127.0.0.1:27017/connexion')
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err))