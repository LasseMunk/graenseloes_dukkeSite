# graenseloes_dukkeSite

Huawei M5 8,4 inch
Screen resolution:   1600 x 2383


Setup:
Sound:
- vibrate in silent mode: off

Apps & Notification: Batch management: all off 


# Running Node
use node.js to run the server

CMD: 
nodemon server.js

In browser:

http://localhost:3000

or specify the ip-adress of the host computer


# Steppers
Our steppers handle 2A pr. coil max.
Our stepper driver handle 2A pr. coil max. 

https://www.pololu.com/product/2128

Stepper driver set for VREF 1.6v

Vref = 8 * Imax * Rcs
Vref = 8 * 2 * 0.100
Vref = 1.6v

This makes safe use of microstepping. 

If only fullstep mode, then one could set Vref for 2v to get more torque. 

Motor pins: 
1   BLACK   A
2   GREEN   A\
3   RED     B   
4   BLUE    B\    


# A4988 Controller board pins

https://www.youtube.com/watch?v=0qwrnUeSpYQ

Go to 40:00 in video for explanation

Tie RESET and SLEEP for always on

# Raspberry PI
OSC to rpi control python script

https://www.raspberrypi.org/forums/viewtopic.php?t=176838

