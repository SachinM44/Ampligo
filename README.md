

# Ampligo

Ampligo is a powerful platform that simplifies React application deployment. With just a single click, users can effortlessly deploy their React projects on the internet. This project is inspired by Vercel and is divided into three main phases:

1. **Upload Service:**
   - In this phase, Ampligo takes the user's source code from their GitHub repository as input.
   - The application stores the source code into an S3 bucket using Ampligo's system and simple-git.
   - The project ID is then pushed to a Redis queue for further processing.

2. **Deployment Service:**
   - The deployment service retrieves the project ID from the Redis queue.
   - It builds the React application by converting it into HTML, CSS, and JS files.
   - These files are then pushed back into an AWS S3 bucket, along with a copy of the React app.

3. **Request Handler Service:**
   - When a user accesses the deployed application, the nearest server routes the request.
   - The HTML, CSS, and JS files are retrieved from the S3 bucket and served to users worldwide.

## Getting Started

1. **Clone this repository:**
   ```
   git clone https://github.com/SachinM44/Ampligo.git
   ```

2. **Navigate to the project directory:**
   ```
   cd Ampligo
   ```

3. **Install dependencies (if any):**
   ```
   npm install
   ```

4. **Run the app:**
   ```
   npm start
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Demo

Show, don't just tell! Consider adding screenshots or GIFs to demonstrate Ampligo's features.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
