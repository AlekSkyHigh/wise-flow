# WiseFlow - Effortless Cashflow Tracking, Enhanced Financial Management

## Description

This project was developed as part of the JS Web Developer program at Software University. It is a full-stack financial tool designed to help users manage their finances efficiently. The application allows users to track their cashflow effortlessly and provides various features to enhance financial management.

The app is built using Angular and Tailwind CSS for the client-side, and it utilizes a custom RESTful-style server with Express.js, MongoDB, Mongoose, Bcrypt, and Jsonwebtoken for the server-side functionalities.

## Features

- **Add Flows:** Registered users can record their regular/one-time incomes and expenses, enabling them to dynamically keep track of their balance.

- **Profile:** Registered users have access to a detailed view of all the entries they have made since using the app. This includes dates, descriptions, and amounts of income/expense. Users can also delete specific entries.

- **Currency Converter:** Registered users can convert amounts of money to various world currencies in real-time, using the most recent exchange rates.

- **Percentage Calculator:** Registered users can perform three different percentage calculations and view their three most recent results.

- **TVM Calculator:** Users can calculate various financial values based on known inputs using the Time Value of Money (TVM) calculator.

## State Management and Progress Saving

The app implements efficient state management, ensuring that users can always pick up from where they left off. When users log out, their progress is saved securely on the server. Upon returning to the app and logging back in, users can seamlessly resume their work without losing any data.


## Security Updates

The project includes the following security enhancements:

- Guards: Different features are protected with guards to restrict access based on user authentication status.

- 404 Page: A custom 404 page is implemented to handle undefined routes.

- JWT Blacklist: A blacklist system stores every used JSON Web Token (JWT) after a user logs out, ensuring better security.

## Installation

To run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project's root directory in your terminal.
3. Install the dependencies of both client and server side, using the package manager of your choice:
4. Open your browser and go to `http://localhost:4200/` to access the application.

## License

[MIT License](link-to-your-license-file) <!-- TODO -->

## Contact

If you have any questions or inquiries, feel free to reach out to me at aleksandar.voynov.info@gmail.com

Happy budgeting and financial management!