var Sequelize = require('sequelize');
var sequelize = new Sequelize('clientesdb', 'postgres', '1234',
    {
        dialect:'postgres', host: 'localhost', port:'5432', 
        define:{ timestamps:false, freezeTableName:true }
    }
);
sequelize.authenticate().then(function(){ console.log('Conectado...'); }).error(function(error){ console.log(error); });

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;