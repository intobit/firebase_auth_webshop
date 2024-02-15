# The Project Idea:

This project was build for Cloudtech course at university and was my first project with the Javascript Framework [React](https://react.dev/).
The idea was to create a small webshop where users can order a variety of products (currently only three available).
When the submit button on the shopping cart is clicked (submitting an empty order is not allowed)
the order is then sent to [Google Firebase](https://firebase.google.com/) realtime DB and can be immediately checked in the Order History.
Each user can only view their own orders.

## Authentication:

Authentication is managed by the [firebaseui-auth-container](https://firebase.google.com/docs/auth/web/firebaseui?hl=en).
With the useContext() function from AuthProvider.js, two private routes (/home and /previousorders) are protected and
accessible only after authentication. The /signin route is always accessible, even without
authentication. Upon login, the user's email is displayed on the sign out button (actually
a Link).

## How to run:

Create a [.env.local](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables) file
where you can store your [Firebase](https://firebase.google.com/) credentials.

Install the dependencies:

````
npm install
````

And run the app with:

````
npm start
````

The app will run at [localhost:3000](http://localhost:3000/).