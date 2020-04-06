import { attackAlarm } from ".";

const main = async () => {
    await attackAlarm();
    process.exit();
};

console.log(main());
