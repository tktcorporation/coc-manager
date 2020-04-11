import { attackAlarm } from ".";

const main = async () => {
    await attackAlarm();
};

main()
    .then(() => console.log("completed"))
    .catch((e) => console.log(e));
