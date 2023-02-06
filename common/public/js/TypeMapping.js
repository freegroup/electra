//
let mapping = {
    "draw2d.Connection": "Connection",
    "arduino_Arduino": "webusb_Arduino",
    "hardware_Arduino": "webusb_Arduino",
    "hardware_arduino_Arduino": "webusb_Arduino",
    "documentation_Markdown": "widget_Markdown",
    "digital_timer_Delay": "digital_pulse_Delay",
    "digital_signal_High": "digital_signal_Static_High",
    "digital_signal_Low": "digital_signal_Static_Low",
    "digital_flipflop_JKFlipFlop": "digital_flipflop_JK_FlipFlop",
    "widget_PushButton": "digital_button_PushButton",
    "widget_Slider": "analog_source_Slider",
    "widget_Sparkline": "analog_sink_Sparkline",
    "signal_4_SignalSource": "digital_signal_4_SignalSource",
    "signal_4_SignalTarget": "digital_signal_4_SignalTarget",
    "signal_4_TriStateGate": "digital_signal_4_TriStateGate",
    "signal_8_SignalSource": "digital_signal_8_SignalSource",
    "signal_8_SignalTarget": "digital_signal_8_SignalTarget",
    "signal_8_TriStateGate": "digital_signal_8_TriStateGate",
    "signal_SignalSource": "digital_signal_SignalSource",
    "signal_SignalTarget": "digital_signal_SignalTarget",
    "signal_TriStateGate": "digital_signal_TriStateGate",
    "signal_VerticalBus": "digital_signal_VerticalBus"
}

export default  function(key){
    return mapping[key] || key
}


