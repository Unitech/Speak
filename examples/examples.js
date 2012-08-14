
var speak = require('./../lib/speak').speak;

speak.defaults({
    url : 'http://localhost:30000/',
    log : true
});

speak({
    message : 'Nouveau dossier recu. Sujet : probleme avec la police',
});
