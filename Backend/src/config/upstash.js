import "dotenv/config";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();


// create a rate limiter  that allows a maximum of 10 requests per 20 seconds per user
export const ratelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(10, "60 s"),
});