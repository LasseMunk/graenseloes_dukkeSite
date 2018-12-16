var osc = require('osc-min'),
    dgram = require('dgram'),
    remote;

const spawn = require("child_process").spawn;


// listen for OSC messages and print them to the console
var udp = dgram.createSocket('udp4', function(msg, rinfo) {

  // save the remote address
  remote = rinfo.address;

  try {
   // console.log(osc.fromBuffer(msg));

    oscIn = osc.fromBuffer(msg);
    

    if(oscIn.address == '/motor_mom') {
      callPy(1, oscIn.args[0].value, oscIn.args[1].value);
       
    };

    if(oscIn.address == '/motor_dad') {
      callPy(2, oscIn.args[0].value, oscIn.args[1].value);
       // callPy(2, "left or right", steps-amount)
    }; 

  } catch (err) {
    console.log('Could not decode OSC message');
  }

});

udp.bind(9998);
console.log('Listening for OSC messages on port 9998');

function callPy(motor, direction, steps) {
console.log(oscIn.address + " " + motor + " " + direction + " " + steps);

  const pythonProcess = spawn('python', ["slut_starut_step.py", motor, direction, steps]);

}
