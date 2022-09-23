import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

console.log(dayjs().to(dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ss')));
