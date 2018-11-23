def stepperOSC(path, tags, args, source):
    direction = (args[0])
    steps = int(args[1])
    motor = int(args[2])
    GPIOs=0
    GPIOd=0

    if motor == 1:
        GPIOs=27
        GPIOd=22
    elif motor == 2:
        GPIOs=24
        GPIOd=23

    if direction == 'left':
        gpio.output(GPIOd, True)
    elif direction == 'right':
        gpio.output(GPIOd, False)

    StepCounter = 0

    #waittime controls speed
    WaitTime = 0.005

    while StepCounter < steps:
        #turning the gpio on and off tells the easy driver to take one step
        gpio.output(GPIOs, True)
        gpio.output(GPIOs, False)
        StepCounter += 1