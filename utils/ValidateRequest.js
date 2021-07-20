const Validator = (body) => {
    let errors = []

    const urlRegexValidator = new RegExp('[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)', 'g')

    if(body.title === "" || body.title === " ") {
        errors.push("The field 'title' isn't should empty")
    }

    if(body.description === "" || body.description === " ") {
        errors.push("The field 'description' isn't should empty")
    }

    if(body.urlDirection === "" || body.urlDirection === " ") {
        errors.push("The field 'urlDirection' isn't should empty")
    }

    if(!urlRegexValidator.test(body.urlDirection)) {
        errors.push("The field 'urlDirection' isn't a valid URL")
    }

    if(errors) {
        return errors
    } else {
        return true
    }
}

module.exports = Validator