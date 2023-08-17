const CAN_CONSOLE = true
const cl = (...args) => {
    if (CAN_CONSOLE) {
        console.log(args)
        console.log('----------------------')
    }
}

export default cl