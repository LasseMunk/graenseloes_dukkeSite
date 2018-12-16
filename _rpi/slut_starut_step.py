#Step 1: Import necessary libraries 

import sys
import RPi.GPIO as gpio #https://pypi.python.org/pypi/RPi.GPIO more info
import time

#read the direction and number of steps; if steps are 0 exit 
# expect string like /motor_mom 1
try: 
    motor = int(float(sys.argv[1]))
    direction = sys.argv[2]
    steps = int(float(sys.argv[3]))

    GPIOd=0
    GPIOs=0

except:
    motor = 0
    steps = 0

#use the broadcom layout for the gpio
gpio.setmode(gpio.BCM)

#motor 1:
# Direction: GPIO 23 
# Step: GPIO 24 

# motor 2:
# Direction: GPIO 22
# Step: GPIO 27


if motor == 1:
    GPIOd=23
    GPIOs=24
elif motor == 2:
    GPIOd=22
    GPIOs=27

# ---- setup gpio as outputs

gpio.setup(GPIOd, gpio.OUT)
gpio.setup(GPIOs, gpio.OUT)

# ---- set direction

if direction == 'left':
    gpio.output(GPIOd, True)
elif direction == 'right':
    gpio.output(GPIOd, False)


StepCounter = 0

#waittime controls speed
WaitTime = 0.01

while StepCounter < steps:
    #turning the gpio on and off tells the easy driver to take one step
    gpio.output(GPIOs, True)
    gpio.output(GPIOs, False)
    StepCounter += 1

    #Wait before taking the next step...this controls rotation speed
    time.sleep(WaitTime)

# release GPIO    
gpio.cleanup()