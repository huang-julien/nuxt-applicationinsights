 import { getTrace } from "../utils/traces";

export default defineTracedEventHandler((event) => {
    return { 
        trace: getTrace(),
    }
})