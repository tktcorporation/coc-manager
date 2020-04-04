import { attackAlarm, refreshPost } from ".";

const main = async () => {
    await refreshPost();
    await attackAlarm();
    process.exit();
};

console.log(main());
