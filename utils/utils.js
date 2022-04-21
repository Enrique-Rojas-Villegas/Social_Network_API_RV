module.exports = {
    formatDate: (date) => {
        // The toLocaleDateString() method returns a string with a language 
        // sensitive representation of the date portion of the specified date 
        // in the user agent's timezone.
        return date.toLocaleDateString();
    },
};