
var speak = require('./../lib/speak').speak;

speak.defaults({
    url : 'http://88.190.216.170:30000/',
    log : true
});

speak({
    message : 'Nouveau dossier recu. Sujet : probleme avec la police',
});
