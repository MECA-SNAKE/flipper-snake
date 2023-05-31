# Flipper - Snake Robot
Flipper is a fully 3D-printed snake robot controlled by a react native app

-- insert videos --

## Motivation 
Serpentine robots are a groundbreaking innovation in robotics, captivating researchers and engineers with their unique physical characteristics and versatile capabilities. These flexible and slithering machines excel at navigating complex and confined spaces, offering immense potential in various fields, including search and rescue operations, industrial inspections, exploration, medical applications, surveillance and security, and hazardous environments.

In search and rescue scenarios, robotic snakes play a crucial role. Unlike traditional robots, they excel at maneuvering through narrow and cluttered environments, such as collapsed buildings or debris. With their flexible bodies, they can easily navigate tight spaces, climb obstacles, and explore inaccessible areas. Equipped with cameras and sensors, these robots transmit real-time data, aiding rescuers in locating survivors and assessing surrounding conditions.

Our objective was to undertake a project that would have practical relevance in the real world. The field of robotics is continuously evolving, and we saw the development of a robotic snake as a chance to deepen our understanding of robotics and gain practical experience in designing and building complex systems. As a group of five computer scientists with backgrounds in communication systems and computer science, we possess a solid understanding of algorithms, programming languages, and system design, which are essential components in the development of a robotic system.

While we may not have had direct experience in building robotic systems, we embraced the opportunity to expand our expertise. We were committed to researching the specific technologies and methodologies required to develop a robotic snake, including mechanical engineering principles and electrical systems.

## Preparation for the project
To prepare ourselves for our first project in robotic, we looked on similar projects on the web to see how we could start it. It didn't take long to find some examples of snake robots and the 2 we've choosen are

* https://www.instructables.com/Bioinspired-Robotic-Snake/
* https://www.instructables.com/Snake-Robot-1/

Additionnally, we had the chance to talk about snake robot with a PhD Student of the Bio-Robotic Lab at EPFL. She gives us ideas and recommendations for a good project in less than a semester, such as keep only one degree of freedom for the motion and to look at sinusoidal function to understand how works the undulated motion of a snake.

## Conception

### Material

* 1 LiPo Battery 2S 7.4V
* 1 ESP8266 microcontroller
* 1 PCA9685 servo motor controller
* 1 LM2596 DC-to-DC converter
* 12 DS6225MG Servo motors
* 48 M3 inserts (SIZE ?)
* 48 M3 10mm screws 
* 1 Adapter cable ModelCraft 58604
* A lot of cables and electric sheath
* 28 small lego wheels
* 2 Lasers 650mn 5V
* 12 bearings (SIZE ?)


### Piece design

![Alt Text](docs/animation_complete v7.gif)


#### 1.Important features

We had a relatively simple concept for the design, but we encountered some challenges. Our goal was to create a joint that could provide a wide range of motion, ideally spanning at least 180 degrees. Additionally, we needed the servo to be securely held with minimal looseness.

To achieve this, we devised an interlocking piece system with a single axis of rotation. This design allowed for a maximum range of motion of approximately -30 to 230 degrees (setting the 90 degree as the middle). For the servo motor, we opted for a straightforward holder with four holes, allowing us to screw the servos in place. To ensure a secure fit, we used inserts to provide the necessary thread pitch. This approach ensured a firm grip and enhanced stability for the servo.

![Alt Text](docs/servo_hold.png)
#### 2. Movement propagation

Our next challenge was to transmit the movement from one piece to another along the servo's axis of rotation. To accomplish this, we picked one of the mounting heads of the servo. We duplicated its shape on our own piece so that when we assembled the two pieces together, we could attach the servo head from the top to the servo itself, completing the assembly.

We opted for a star-shaped head as it provided multiple points of contact with the next piece, making it easier to drive the movement. This approach proved to be highly successful. However, implementing the design required multiple attempts due to the complexity of the shape. After trials and errors, we finally achieved a well-fitting shape.
    
![Alt Text](docs/animation_star v1.gif)
To ensure a secure fit and prevent any dislocation, we implemented two additional features. Firstly, we created an extrusion beneath the surface of one piece, and corresponding to it, a hole in the second piece. This design allowed for a solid interlocking system between the two pieces.

Secondly, to minimize friction between the pieces, we incorporated a bearing. The extrusion was designed to fit snugly into the bearing, enabling smooth movement and reducing friction.

These modifications proved effective in achieving a well-fitting and stable assembly.
 
![Alt Text](docs/bearring_animation.gif)
#### 3. Allowing movement

Last but crucial point for the snake success is the addition of wheels. Indeed without this the snake would not go forward. It is due to the fact that the lateral friction created by the wheels forces the movement in one direction, and therefore allows it to move forward. It mimics what a real snake's scales does, increase friction in some direction. We really wanted to hide them as much as possible, to avoid people thinking they are driving the snake, instead of the undulated motion. The effort made to reduce their visibility result in a clean and elegant design.

![Alt Text](docs/design_wheels.png)
#### 4. Thinking ahead

The design is a cornerstone of the project. The smallest mistake could result in the failure of the entire project. We tried as much as possible to think about all possible problem that we could run into. One of them was cable management. In order to finish with a clean project we designed some hole in the piece that would let the cable run from tail to head. Unfortunately, we could not use them as the hole intended to accomplish this task were designed to small to fit the servo's end of the cable. 
    
### Electronics

The main job of our electronic components is to control our servos motors. To do that, we used a PCA9685 board which is designed to send PWM (Pulse-Wide Modulation) signals to move them. This board is then connected to our microcontroller that will contain all the code to move the servos. 

![Alt Text](docs/electronic.png)

### Cable Management
  
## Code
 
### Application

### Client-Server communication

### Controls

### Movements
  
    1. Inchworm
    2. Concertina
    3. Undulated
 
## Limitation

## Improvements

