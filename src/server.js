const { PORT = 5000 } = process.env;
const app = require("./app");

app.listen(PORT, () => console.log(`Running on Port ${PORT}!`));
