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




# Teensy motor setup

Mor: pin 38 = step, pin 37 = direction
Far: pin 36 = step, pin 35 = direction

# Raspberry motor setup
motor 1:

23 - Direction 1
24 - Step 1

motor 2:
22 - Direction 2
27 - Step 2


# A4988 Controller board pins

https://www.youtube.com/watch?v=0qwrnUeSpYQ

Go to 40:00 in video for explanation

Tie RESET and SLEEP for always on

# Raspberry PI
Backup and restore SD card
https://computers.tutsplus.com/articles/how-to-clone-raspberry-pi-sd-cards-using-the-command-line-in-os-x--mac-59911


OSC to rpi control python script

https://www.raspberrypi.org/forums/viewtopic.php?t=176838

rpi BCM pinout
https://pinout.xyz/





# Control 5v relay from pi
https://openhomeautomation.net/control-a-relay-from-anywhere-using-the-raspberry-pi


# Video
width i firefox: 533px
height i firefox: 818px

# pre cache
Using firefox instead of chrome and loading plentey of 
<video> players solved the problem. 


https://developers.google.com/web/fundamentals/media/fast-playback-with-video-preload

https://community.risingstack.com/redis-node-js-introduction-to-caching/

http://dinbror.dk/blog/how-to-preload-entire-html5-video-before-play-solved/
