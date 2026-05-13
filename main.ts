input.onButtonPressed(Button.A, function () {
    lauf_flag = 1
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
	
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
    if (info == "kurve") {
        kurve_get = wert
        kurve_rad = Math.map(kurve_get, -45, 45, -255, 255)
        // basic.showNumber(kurve_rad)
        kurve_Left = kurve_rad
        kurve_Right = kurve_rad * -1
    }
    if (info == "gerade") {
        gerade_get = wert
        gerade_rad = Math.map(gerade_get, -45, 45, -255, 255)
        geradeLeft = gerade_rad
        geradeRight = gerade_rad
        leftOutput = (geradeLeft + kurve_Left) / 2
        rightOutput = (geradeRight + kurve_Right) / 2
        if (gerade_get == 0 && kurve_get == 0) {
            robotbit.MotorStopAll()
        } else {
            if (leftOutput < 0) {
                robotbit.MotorRun(motor_links, leftOutput)
            }
            if (rightOutput < 0) {
                robotbit.MotorRun(motor_rechts, rightOutput)
            }
        }
    }
})
input.onButtonPressed(Button.B, function () {
    lauf_flag = 0
})
let rightOutput = 0
let leftOutput = 0
let geradeRight = 0
let geradeLeft = 0
let gerade_rad = 0
let gerade_get = 0
let kurve_Right = 0
let kurve_Left = 0
let kurve_rad = 0
let kurve_get = 0
let lauf_flag = 0
radio.setGroup(26)
lauf_flag = 0
basic.showIcon(IconNames.Diamond)

let motor_links = robotbit.Motors.M1A
let motor_rechts = robotbit.Motors.M2B

robotbit.MotorStopAll()
robotbit.MotorRun(motor_rechts, 70)
robotbit.MotorRun(motor_links, 70)
