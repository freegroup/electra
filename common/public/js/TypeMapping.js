//
let mapping = {
    "draw2d.Connection": "Connection",
    "digital_signal_High": "digital_signal_Static_High",
    "digital_signal_Low": "digital_signal_Static_Low",
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


