import "dotenv/config";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();


// Allow up to 100 API requests per minute per client.
export const ratelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(100, "60 s"),
});