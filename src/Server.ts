import { app } from "./App";

try {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
} catch (error) {
    process.exit(1);
}
