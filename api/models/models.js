var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Project');

//Modele utilisé pour l'API
var ArticleSchema = new mongoose.Schema({
	_id: { type: String, index: true },
	titre: { type: String, required: true },
	content: { type: String, required: true },
	dateModif: { type: Date, default: Date.now },
	comments: [{ email: { type: String, required: true } ,body: String, date: { type: Date, default: Date.now }}]
});
exports.Article = mongoose.model('Article', ArticleSchema);
