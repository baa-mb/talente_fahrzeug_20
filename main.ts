input.onButtonPressed(Button.A, function () {
    lauf_flag = 1
})
// if (info == "TB") {
// if (wert == 1) {
// control.raiseEvent(
// EventBusSource.MICROBIT_ID_BUTTON_B,
// EventBusValue.MICROBIT_BUTTON_EVT_CLICK
// )
// } else {
// control.raiseEvent(
// EventBusSource.MICROBIT_ID_BUTTON_A,
// EventBusValue.MICROBIT_BUTTON_EVT_CLICK
// )
// }
// }
radio.onReceivedValue(function (info, wert) {
    serial.writeLine("gerade: " + gerade_get + " kurve: " + kurve_get)
    if (info == "kurve") {
        kurve_get = wert
        kurve_rad = Math.round(Math.map(kurve_get, -45, 45, -255, 255))
        // basic.showNumber(kurve_rad)
        kurve_links = kurve_rad
        kurve_rechts = kurve_rad * -1
    } else if (info == "gerade") {
        gerade_get = wert
        gerade_rad = Math.round(Math.map(gerade_get, -45, 45, -255, 255))
        gerade_links = gerade_rad
        gerade_rechts = gerade_rad
        links_rad = gerade_links + kurve_links
        rechts_rad = gerade_rechts + kurve_rechts
        if (gerade_get == 0 && kurve_get == 0) {
            serial.writeLine("----------- stopp ----------------")
            robotbit.MotorStopAll()
        } else {
            // serial.writeValue("links_rad", links_rad)
            // serial.writeValue("rechts_rad", rechts_rad)
            robotbit.MotorRun(motor_links, links_rad)
            robotbit.MotorRun(motor_rechts, rechts_rad)
        }
    }
})
input.onButtonPressed(Button.B, function () {
    lauf_flag = 0
})

let gerade_get = 0, gerade_rad = 0, gerade_rechts = 0, gerade_links = 0
let kurve_get = 0, kurve_rad = 0, kurve_rechts = 0, kurve_links = 0
let links_rad = 0, rechts_rad = 0
let lauf_flag = 0
radio.setGroup(26)
lauf_flag = 0
basic.showIcon(IconNames.Diamond)
let motor_links = robotbit.Motors.M1A
let motor_rechts = robotbit.Motors.M2B
robotbit.MotorStopAll()
robotbit.MotorRun(motor_rechts, 120)
robotbit.MotorRun(motor_links, 120)
