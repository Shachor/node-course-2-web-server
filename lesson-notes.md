### Installing Git, Connecting to GitHub, Deploying to Heroku ###


# Installing Git on Windows




# Connecting to GitHub





# Deploying to Heroku
* Create a Heroku account
* Download and install the Heroku CLI app
    toolbelt.heroku.com
* Will probably have to restart any open CLI's
* Type in heroku --help to make sure you have it installed
    Git Bash might require the extension: heroku.cmd --help
* You will have to login to Heroku using: heroku login
    Provide your Heroku email and password
* To setup your ssh keys with Heroku just type: heroku keys:add
    Accept the upload
* Print all the keys on your account with: heroku keys
    You can remove keys from your account: heroku keys:remove [email]
* Test the connection with: ssh -v git@heroku.com
    Establish the connection, type yes

* You will need to setup the PORT variable in your app.listen()
    Use: const port = process.env.PORT || 3000;
    to setup either the Heroku PORT or port 3000 locally.

* Add the start script to package.json. "start": "node server.js"
