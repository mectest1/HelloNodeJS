
function replyText(text){
	return (req, res) => res.end(text);
}

module.exports = replyText;