import { attackAlarm } from ".";

const main = async () => {
    await attackAlarm();
};

main()
    .then(() => {
        console.log("completed");
        process.exit();
    })
    .catch((e) => console.log(e));
