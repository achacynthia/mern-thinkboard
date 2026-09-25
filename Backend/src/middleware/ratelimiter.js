
import { ratelimit } from "../config/upstash.js";
const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit(req.ip);
        if (!success) {
            res.status(429).json({ message: "Too many requests, please try again later." });
            return;
        }

        next();

    } catch (error) {
        console.log("Rate limiter error:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }


}

export default rateLimiter;