var mongoose = require('mongoose');

var hallAllocationSchema = mongoose.Schema({
    day1 : {
        type : String,
        require : true
    },

    department1 : {
        type : String,
        require : true
    },

    level1 : {
        type : String,
        require : true
    },
    
    time1 : {
        type : String,
        require : true
    },

    hall1 : {
        type : String,
        require : true
    },

    paper1 : {
        type : String,
        require : true
    },

    day2 : {
        type : String,
        require : true
    },

    department2 : {
        type : String,
        require : true
    },

    level2 : {
        type : String,
        require : true
    },
    
    time2 : {
        type : String,
        require : true
    },

    hall2 : {
        type : String,
        require : true
    },

    paper2 : {
        type : String,
        require : true
    },

    day3 : {
        type : String,
        require : true
    },

    department3 : {
        type : String,
        require : true
    },

    level3 : {
        type : String,
        require : true
    },
    
    time3 : {
        type : String,
        require : true
    },

    hall3 : {
        type : String,
        require : true
    },

    paper3 : {
        type : String,
        require : true
    },

    day4 : {
        type : String,
        require : true
    },

    department4 : {
        type : String,
        require : true
    },

    level4 : {
        type : String,
        require : true
    },
    
    time4 : {
        type : String,
        require : true
    },

    hall4 : {
        type : String,
        require : true
    },

    paper4 : {
        type : String,
        require : true
    } 

});

module.exports = HallAllocation = mongoose.model('HallAllocation',hallAllocationSchema);