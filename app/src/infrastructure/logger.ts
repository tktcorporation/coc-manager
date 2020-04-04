import { $log } from "ts-log-debug";
$log.level = process.env.NODE_ENV === "production" ? "error" : "debug";

export default $log;
export { $log };
