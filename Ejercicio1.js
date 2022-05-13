const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(() => {
    console.log('La conexión se estableció correctamente');
})
.catch( err => {
    console.error('No se pudo establecer la conexión con la base de datos: ', err);
});

/* Creo el auto*/
class Cars extends Sequelize.Model {}
Cars.init({
    marca: Sequelize.STRING,
    modelo: Sequelize.STRING,
    anio: Sequelize.STRING
}, {sequelize, modelName: 'cars'});

sequelize.sync()
    .then(() => Cars.create({
        marca: 'Subaru',
        modelo: 'Impreza',
        anio: '1998'
    }))
    .then(jane => {
        console.log(jane.toJSON());
    });

sequelize.sync()
    .then(() => Cars.update({anio: '1999'}, {
        where: {
            modelo: 'Impreza'
        }
    }).then(() => {
        console.log("Done");
    }));
